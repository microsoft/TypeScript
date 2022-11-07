namespace ts {
let nextAutoGenerateId = 0;

/* @internal */
export const enum NodeFactoryFlags {
    None = 0,
    // Disables the parenthesizer rules for the factory.
    NoParenthesizerRules = 1 << 0,
    // Disables the node converters for the factory.
    NoNodeConverters = 1 << 1,
    // Ensures new `PropertyAccessExpression` nodes are created with the `NoIndentation` emit flag set.
    NoIndentationOnFreshPropertyAccess = 1 << 2,
    // Do not set an `original` pointer when updating a node.
    NoOriginalNode = 1 << 3,
}

const nodeFactoryPatchers: ((factory: ts.NodeFactory) => void)[] = [];

/* @internal */
export function addNodeFactoryPatcher(fn: (factory: ts.NodeFactory) => void) {
    nodeFactoryPatchers.push(fn);
}

/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 * @param baseFactory A `BaseNodeFactory` used to create the base `Node` objects.
 */
/* @internal */
export function createNodeFactory(flags: NodeFactoryFlags, baseFactory: ts.BaseNodeFactory): ts.NodeFactory {
    const update = flags & NodeFactoryFlags.NoOriginalNode ? updateWithoutOriginal : updateWithOriginal;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = ts.memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? ts.nullParenthesizerRules : ts.createParenthesizerRules(factory));
    const converters = ts.memoize(() => flags & NodeFactoryFlags.NoNodeConverters ? ts.nullNodeConverters : ts.createNodeConverters(factory));

    // lazy initializaton of common operator factories
    const getBinaryCreateFunction = ts.memoizeOne((operator: ts.BinaryOperator) => (left: ts.Expression, right: ts.Expression) => createBinaryExpression(left, operator, right));
    const getPrefixUnaryCreateFunction = ts.memoizeOne((operator: ts.PrefixUnaryOperator) => (operand: ts.Expression) => createPrefixUnaryExpression(operator, operand));
    const getPostfixUnaryCreateFunction = ts.memoizeOne((operator: ts.PostfixUnaryOperator) => (operand: ts.Expression) => createPostfixUnaryExpression(operand, operator));
    const getJSDocPrimaryTypeCreateFunction = ts.memoizeOne(<T extends ts.JSDocType>(kind: T["kind"]) => () => createJSDocPrimaryTypeWorker(kind));
    const getJSDocUnaryTypeCreateFunction = ts.memoizeOne(<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; }>(kind: T["kind"]) => (type: T["type"]) => createJSDocUnaryTypeWorker<T>(kind, type));
    const getJSDocUnaryTypeUpdateFunction = ts.memoizeOne(<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; }>(kind: T["kind"]) => (node: T, type: T["type"]) => updateJSDocUnaryTypeWorker<T>(kind, node, type));
    const getJSDocPrePostfixUnaryTypeCreateFunction = ts.memoizeOne(<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"]) => (type: T["type"], postfix?: boolean) => createJSDocPrePostfixUnaryTypeWorker<T>(kind, type, postfix));
    const getJSDocPrePostfixUnaryTypeUpdateFunction = ts.memoizeOne(<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"]) => (node: T, type: T["type"]) => updateJSDocPrePostfixUnaryTypeWorker<T>(kind, node, type));
    const getJSDocSimpleTagCreateFunction = ts.memoizeOne(<T extends ts.JSDocTag>(kind: T["kind"]) => (tagName: ts.Identifier | undefined, comment?: ts.NodeArray<ts.JSDocComment>) => createJSDocSimpleTagWorker(kind, tagName, comment));
    const getJSDocSimpleTagUpdateFunction = ts.memoizeOne(<T extends ts.JSDocTag>(kind: T["kind"]) => (node: T, tagName: ts.Identifier | undefined, comment?: ts.NodeArray<ts.JSDocComment>) => updateJSDocSimpleTagWorker(kind, node, tagName, comment));
    const getJSDocTypeLikeTagCreateFunction = ts.memoizeOne(<T extends ts.JSDocTag & { typeExpression?: ts.JSDocTypeExpression }>(kind: T["kind"]) => (tagName: ts.Identifier | undefined, typeExpression?: ts.JSDocTypeExpression, comment?: ts.NodeArray<ts.JSDocComment>) => createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment));
    const getJSDocTypeLikeTagUpdateFunction = ts.memoizeOne(<T extends ts.JSDocTag & { typeExpression?: ts.JSDocTypeExpression }>(kind: T["kind"]) => (node: T, tagName: ts.Identifier | undefined, typeExpression?: ts.JSDocTypeExpression, comment?: ts.NodeArray<ts.JSDocComment>) => updateJSDocTypeLikeTagWorker(kind, node, tagName, typeExpression, comment));

    const factory: ts.NodeFactory = {
        get parenthesizer() { return parenthesizerRules(); },
        get converters() { return converters(); },
        baseFactory,
        flags,
        createNodeArray,
        createNumericLiteral,
        createBigIntLiteral,
        createStringLiteral,
        createStringLiteralFromNode,
        createRegularExpressionLiteral,
        createLiteralLikeNode,
        createIdentifier,
        updateIdentifier,
        createTempVariable,
        createLoopVariable,
        createUniqueName,
        getGeneratedNameForNode,
        createPrivateIdentifier,
        createUniquePrivateName,
        getGeneratedPrivateNameForNode,
        createToken,
        createSuper,
        createThis,
        createNull,
        createTrue,
        createFalse,
        createModifier,
        createModifiersFromModifierFlags,
        createQualifiedName,
        updateQualifiedName,
        createComputedPropertyName,
        updateComputedPropertyName,
        createTypeParameterDeclaration,
        updateTypeParameterDeclaration,
        createParameterDeclaration,
        updateParameterDeclaration,
        createDecorator,
        updateDecorator,
        createPropertySignature,
        updatePropertySignature,
        createPropertyDeclaration,
        updatePropertyDeclaration,
        createMethodSignature,
        updateMethodSignature,
        createMethodDeclaration,
        updateMethodDeclaration,
        createConstructorDeclaration,
        updateConstructorDeclaration,
        createGetAccessorDeclaration,
        updateGetAccessorDeclaration,
        createSetAccessorDeclaration,
        updateSetAccessorDeclaration,
        createCallSignature,
        updateCallSignature,
        createConstructSignature,
        updateConstructSignature,
        createIndexSignature,
        updateIndexSignature,
        createClassStaticBlockDeclaration,
        updateClassStaticBlockDeclaration,
        createTemplateLiteralTypeSpan,
        updateTemplateLiteralTypeSpan,
        createKeywordTypeNode,
        createTypePredicateNode,
        updateTypePredicateNode,
        createTypeReferenceNode,
        updateTypeReferenceNode,
        createFunctionTypeNode,
        updateFunctionTypeNode,
        createConstructorTypeNode,
        updateConstructorTypeNode,
        createTypeQueryNode,
        updateTypeQueryNode,
        createTypeLiteralNode,
        updateTypeLiteralNode,
        createArrayTypeNode,
        updateArrayTypeNode,
        createTupleTypeNode,
        updateTupleTypeNode,
        createNamedTupleMember,
        updateNamedTupleMember,
        createOptionalTypeNode,
        updateOptionalTypeNode,
        createRestTypeNode,
        updateRestTypeNode,
        createUnionTypeNode,
        updateUnionTypeNode,
        createIntersectionTypeNode,
        updateIntersectionTypeNode,
        createConditionalTypeNode,
        updateConditionalTypeNode,
        createInferTypeNode,
        updateInferTypeNode,
        createImportTypeNode,
        updateImportTypeNode,
        createParenthesizedType,
        updateParenthesizedType,
        createThisTypeNode,
        createTypeOperatorNode,
        updateTypeOperatorNode,
        createIndexedAccessTypeNode,
        updateIndexedAccessTypeNode,
        createMappedTypeNode,
        updateMappedTypeNode,
        createLiteralTypeNode,
        updateLiteralTypeNode,
        createTemplateLiteralType,
        updateTemplateLiteralType,
        createObjectBindingPattern,
        updateObjectBindingPattern,
        createArrayBindingPattern,
        updateArrayBindingPattern,
        createBindingElement,
        updateBindingElement,
        createArrayLiteralExpression,
        updateArrayLiteralExpression,
        createObjectLiteralExpression,
        updateObjectLiteralExpression,
        createPropertyAccessExpression: flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess ?
            (expression: ts.Expression, name: string | ts.MemberName) => ts.setEmitFlags(createPropertyAccessExpression(expression, name), ts.EmitFlags.NoIndentation) :
            createPropertyAccessExpression,
        updatePropertyAccessExpression,
        createPropertyAccessChain: flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess ?
        (expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, name: string | ts.MemberName) => ts.setEmitFlags(createPropertyAccessChain(expression, questionDotToken, name), ts.EmitFlags.NoIndentation) :
            createPropertyAccessChain,
        updatePropertyAccessChain,
        createElementAccessExpression,
        updateElementAccessExpression,
        createElementAccessChain,
        updateElementAccessChain,
        createCallExpression,
        updateCallExpression,
        createCallChain,
        updateCallChain,
        createNewExpression,
        updateNewExpression,
        createTaggedTemplateExpression,
        updateTaggedTemplateExpression,
        createTypeAssertion,
        updateTypeAssertion,
        createParenthesizedExpression,
        updateParenthesizedExpression,
        createFunctionExpression,
        updateFunctionExpression,
        createArrowFunction,
        updateArrowFunction,
        createDeleteExpression,
        updateDeleteExpression,
        createTypeOfExpression,
        updateTypeOfExpression,
        createVoidExpression,
        updateVoidExpression,
        createAwaitExpression,
        updateAwaitExpression,
        createPrefixUnaryExpression,
        updatePrefixUnaryExpression,
        createPostfixUnaryExpression,
        updatePostfixUnaryExpression,
        createBinaryExpression,
        updateBinaryExpression,
        createConditionalExpression,
        updateConditionalExpression,
        createTemplateExpression,
        updateTemplateExpression,
        createTemplateHead,
        createTemplateMiddle,
        createTemplateTail,
        createNoSubstitutionTemplateLiteral,
        createTemplateLiteralLikeNode,
        createYieldExpression,
        updateYieldExpression,
        createSpreadElement,
        updateSpreadElement,
        createClassExpression,
        updateClassExpression,
        createOmittedExpression,
        createExpressionWithTypeArguments,
        updateExpressionWithTypeArguments,
        createAsExpression,
        updateAsExpression,
        createNonNullExpression,
        updateNonNullExpression,
        createSatisfiesExpression,
        updateSatisfiesExpression,
        createNonNullChain,
        updateNonNullChain,
        createMetaProperty,
        updateMetaProperty,
        createTemplateSpan,
        updateTemplateSpan,
        createSemicolonClassElement,
        createBlock,
        updateBlock,
        createVariableStatement,
        updateVariableStatement,
        createEmptyStatement,
        createExpressionStatement,
        updateExpressionStatement,
        createIfStatement,
        updateIfStatement,
        createDoStatement,
        updateDoStatement,
        createWhileStatement,
        updateWhileStatement,
        createForStatement,
        updateForStatement,
        createForInStatement,
        updateForInStatement,
        createForOfStatement,
        updateForOfStatement,
        createContinueStatement,
        updateContinueStatement,
        createBreakStatement,
        updateBreakStatement,
        createReturnStatement,
        updateReturnStatement,
        createWithStatement,
        updateWithStatement,
        createSwitchStatement,
        updateSwitchStatement,
        createLabeledStatement,
        updateLabeledStatement,
        createThrowStatement,
        updateThrowStatement,
        createTryStatement,
        updateTryStatement,
        createDebuggerStatement,
        createVariableDeclaration,
        updateVariableDeclaration,
        createVariableDeclarationList,
        updateVariableDeclarationList,
        createFunctionDeclaration,
        updateFunctionDeclaration,
        createClassDeclaration,
        updateClassDeclaration,
        createInterfaceDeclaration,
        updateInterfaceDeclaration,
        createTypeAliasDeclaration,
        updateTypeAliasDeclaration,
        createEnumDeclaration,
        updateEnumDeclaration,
        createModuleDeclaration,
        updateModuleDeclaration,
        createModuleBlock,
        updateModuleBlock,
        createCaseBlock,
        updateCaseBlock,
        createNamespaceExportDeclaration,
        updateNamespaceExportDeclaration,
        createImportEqualsDeclaration,
        updateImportEqualsDeclaration,
        createImportDeclaration,
        updateImportDeclaration,
        createImportClause,
        updateImportClause,
        createAssertClause,
        updateAssertClause,
        createAssertEntry,
        updateAssertEntry,
        createImportTypeAssertionContainer,
        updateImportTypeAssertionContainer,
        createNamespaceImport,
        updateNamespaceImport,
        createNamespaceExport,
        updateNamespaceExport,
        createNamedImports,
        updateNamedImports,
        createImportSpecifier,
        updateImportSpecifier,
        createExportAssignment,
        updateExportAssignment,
        createExportDeclaration,
        updateExportDeclaration,
        createNamedExports,
        updateNamedExports,
        createExportSpecifier,
        updateExportSpecifier,
        createMissingDeclaration,
        createExternalModuleReference,
        updateExternalModuleReference,
        // lazily load factory members for JSDoc types with similar structure
        get createJSDocAllType() { return getJSDocPrimaryTypeCreateFunction<ts.JSDocAllType>(ts.SyntaxKind.JSDocAllType); },
        get createJSDocUnknownType() { return getJSDocPrimaryTypeCreateFunction<ts.JSDocUnknownType>(ts.SyntaxKind.JSDocUnknownType); },
        get createJSDocNonNullableType() { return getJSDocPrePostfixUnaryTypeCreateFunction<ts.JSDocNonNullableType>(ts.SyntaxKind.JSDocNonNullableType); },
        get updateJSDocNonNullableType() { return getJSDocPrePostfixUnaryTypeUpdateFunction<ts.JSDocNonNullableType>(ts.SyntaxKind.JSDocNonNullableType); },
        get createJSDocNullableType() { return getJSDocPrePostfixUnaryTypeCreateFunction<ts.JSDocNullableType>(ts.SyntaxKind.JSDocNullableType); },
        get updateJSDocNullableType() { return getJSDocPrePostfixUnaryTypeUpdateFunction<ts.JSDocNullableType>(ts.SyntaxKind.JSDocNullableType); },
        get createJSDocOptionalType() { return getJSDocUnaryTypeCreateFunction<ts.JSDocOptionalType>(ts.SyntaxKind.JSDocOptionalType); },
        get updateJSDocOptionalType() { return getJSDocUnaryTypeUpdateFunction<ts.JSDocOptionalType>(ts.SyntaxKind.JSDocOptionalType); },
        get createJSDocVariadicType() { return getJSDocUnaryTypeCreateFunction<ts.JSDocVariadicType>(ts.SyntaxKind.JSDocVariadicType); },
        get updateJSDocVariadicType() { return getJSDocUnaryTypeUpdateFunction<ts.JSDocVariadicType>(ts.SyntaxKind.JSDocVariadicType); },
        get createJSDocNamepathType() { return getJSDocUnaryTypeCreateFunction<ts.JSDocNamepathType>(ts.SyntaxKind.JSDocNamepathType); },
        get updateJSDocNamepathType() { return getJSDocUnaryTypeUpdateFunction<ts.JSDocNamepathType>(ts.SyntaxKind.JSDocNamepathType); },
        createJSDocFunctionType,
        updateJSDocFunctionType,
        createJSDocTypeLiteral,
        updateJSDocTypeLiteral,
        createJSDocTypeExpression,
        updateJSDocTypeExpression,
        createJSDocSignature,
        updateJSDocSignature,
        createJSDocTemplateTag,
        updateJSDocTemplateTag,
        createJSDocTypedefTag,
        updateJSDocTypedefTag,
        createJSDocParameterTag,
        updateJSDocParameterTag,
        createJSDocPropertyTag,
        updateJSDocPropertyTag,
        createJSDocCallbackTag,
        updateJSDocCallbackTag,
        createJSDocAugmentsTag,
        updateJSDocAugmentsTag,
        createJSDocImplementsTag,
        updateJSDocImplementsTag,
        createJSDocSeeTag,
        updateJSDocSeeTag,
        createJSDocNameReference,
        updateJSDocNameReference,
        createJSDocMemberName,
        updateJSDocMemberName,
        createJSDocLink,
        updateJSDocLink,
        createJSDocLinkCode,
        updateJSDocLinkCode,
        createJSDocLinkPlain,
        updateJSDocLinkPlain,
        // lazily load factory members for JSDoc tags with similar structure
        get createJSDocTypeTag() { return getJSDocTypeLikeTagCreateFunction<ts.JSDocTypeTag>(ts.SyntaxKind.JSDocTypeTag); },
        get updateJSDocTypeTag() { return getJSDocTypeLikeTagUpdateFunction<ts.JSDocTypeTag>(ts.SyntaxKind.JSDocTypeTag); },
        get createJSDocReturnTag() { return getJSDocTypeLikeTagCreateFunction<ts.JSDocReturnTag>(ts.SyntaxKind.JSDocReturnTag); },
        get updateJSDocReturnTag() { return getJSDocTypeLikeTagUpdateFunction<ts.JSDocReturnTag>(ts.SyntaxKind.JSDocReturnTag); },
        get createJSDocThisTag() { return getJSDocTypeLikeTagCreateFunction<ts.JSDocThisTag>(ts.SyntaxKind.JSDocThisTag); },
        get updateJSDocThisTag() { return getJSDocTypeLikeTagUpdateFunction<ts.JSDocThisTag>(ts.SyntaxKind.JSDocThisTag); },
        get createJSDocEnumTag() { return getJSDocTypeLikeTagCreateFunction<ts.JSDocEnumTag>(ts.SyntaxKind.JSDocEnumTag); },
        get updateJSDocEnumTag() { return getJSDocTypeLikeTagUpdateFunction<ts.JSDocEnumTag>(ts.SyntaxKind.JSDocEnumTag); },
        get createJSDocAuthorTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocAuthorTag>(ts.SyntaxKind.JSDocAuthorTag); },
        get updateJSDocAuthorTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocAuthorTag>(ts.SyntaxKind.JSDocAuthorTag); },
        get createJSDocClassTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocClassTag>(ts.SyntaxKind.JSDocClassTag); },
        get updateJSDocClassTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocClassTag>(ts.SyntaxKind.JSDocClassTag); },
        get createJSDocPublicTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocPublicTag>(ts.SyntaxKind.JSDocPublicTag); },
        get updateJSDocPublicTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocPublicTag>(ts.SyntaxKind.JSDocPublicTag); },
        get createJSDocPrivateTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocPrivateTag>(ts.SyntaxKind.JSDocPrivateTag); },
        get updateJSDocPrivateTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocPrivateTag>(ts.SyntaxKind.JSDocPrivateTag); },
        get createJSDocProtectedTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocProtectedTag>(ts.SyntaxKind.JSDocProtectedTag); },
        get updateJSDocProtectedTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocProtectedTag>(ts.SyntaxKind.JSDocProtectedTag); },
        get createJSDocReadonlyTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocReadonlyTag>(ts.SyntaxKind.JSDocReadonlyTag); },
        get updateJSDocReadonlyTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocReadonlyTag>(ts.SyntaxKind.JSDocReadonlyTag); },
        get createJSDocOverrideTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocOverrideTag>(ts.SyntaxKind.JSDocOverrideTag); },
        get updateJSDocOverrideTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocOverrideTag>(ts.SyntaxKind.JSDocOverrideTag); },
        get createJSDocDeprecatedTag() { return getJSDocSimpleTagCreateFunction<ts.JSDocDeprecatedTag>(ts.SyntaxKind.JSDocDeprecatedTag); },
        get updateJSDocDeprecatedTag() { return getJSDocSimpleTagUpdateFunction<ts.JSDocDeprecatedTag>(ts.SyntaxKind.JSDocDeprecatedTag); },
        createJSDocUnknownTag,
        updateJSDocUnknownTag,
        createJSDocText,
        updateJSDocText,
        createJSDocComment,
        updateJSDocComment,
        createJsxElement,
        updateJsxElement,
        createJsxSelfClosingElement,
        updateJsxSelfClosingElement,
        createJsxOpeningElement,
        updateJsxOpeningElement,
        createJsxClosingElement,
        updateJsxClosingElement,
        createJsxFragment,
        createJsxText,
        updateJsxText,
        createJsxOpeningFragment,
        createJsxJsxClosingFragment,
        updateJsxFragment,
        createJsxAttribute,
        updateJsxAttribute,
        createJsxAttributes,
        updateJsxAttributes,
        createJsxSpreadAttribute,
        updateJsxSpreadAttribute,
        createJsxExpression,
        updateJsxExpression,
        createCaseClause,
        updateCaseClause,
        createDefaultClause,
        updateDefaultClause,
        createHeritageClause,
        updateHeritageClause,
        createCatchClause,
        updateCatchClause,
        createPropertyAssignment,
        updatePropertyAssignment,
        createShorthandPropertyAssignment,
        updateShorthandPropertyAssignment,
        createSpreadAssignment,
        updateSpreadAssignment,
        createEnumMember,
        updateEnumMember,
        createSourceFile,
        updateSourceFile,
        createBundle,
        updateBundle,
        createUnparsedSource,
        createUnparsedPrologue,
        createUnparsedPrepend,
        createUnparsedTextLike,
        createUnparsedSyntheticReference,
        createInputFiles,
        createSyntheticExpression,
        createSyntaxList,
        createNotEmittedStatement,
        createPartiallyEmittedExpression,
        updatePartiallyEmittedExpression,
        createCommaListExpression,
        updateCommaListExpression,
        createEndOfDeclarationMarker,
        createMergeDeclarationMarker,
        createSyntheticReferenceExpression,
        updateSyntheticReferenceExpression,
        cloneNode,

        // Lazily load factory methods for common operator factories and utilities
        get createComma() { return getBinaryCreateFunction(ts.SyntaxKind.CommaToken); },
        get createAssignment() { return getBinaryCreateFunction(ts.SyntaxKind.EqualsToken) as ts.NodeFactory["createAssignment"]; },
        get createLogicalOr() { return getBinaryCreateFunction(ts.SyntaxKind.BarBarToken); },
        get createLogicalAnd() { return getBinaryCreateFunction(ts.SyntaxKind.AmpersandAmpersandToken); },
        get createBitwiseOr() { return getBinaryCreateFunction(ts.SyntaxKind.BarToken); },
        get createBitwiseXor() { return getBinaryCreateFunction(ts.SyntaxKind.CaretToken); },
        get createBitwiseAnd() { return getBinaryCreateFunction(ts.SyntaxKind.AmpersandToken); },
        get createStrictEquality() { return getBinaryCreateFunction(ts.SyntaxKind.EqualsEqualsEqualsToken); },
        get createStrictInequality() { return getBinaryCreateFunction(ts.SyntaxKind.ExclamationEqualsEqualsToken); },
        get createEquality() { return getBinaryCreateFunction(ts.SyntaxKind.EqualsEqualsToken); },
        get createInequality() { return getBinaryCreateFunction(ts.SyntaxKind.ExclamationEqualsToken); },
        get createLessThan() { return getBinaryCreateFunction(ts.SyntaxKind.LessThanToken); },
        get createLessThanEquals() { return getBinaryCreateFunction(ts.SyntaxKind.LessThanEqualsToken); },
        get createGreaterThan() { return getBinaryCreateFunction(ts.SyntaxKind.GreaterThanToken); },
        get createGreaterThanEquals() { return getBinaryCreateFunction(ts.SyntaxKind.GreaterThanEqualsToken); },
        get createLeftShift() { return getBinaryCreateFunction(ts.SyntaxKind.LessThanLessThanToken); },
        get createRightShift() { return getBinaryCreateFunction(ts.SyntaxKind.GreaterThanGreaterThanToken); },
        get createUnsignedRightShift() { return getBinaryCreateFunction(ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken); },
        get createAdd() { return getBinaryCreateFunction(ts.SyntaxKind.PlusToken); },
        get createSubtract() { return getBinaryCreateFunction(ts.SyntaxKind.MinusToken); },
        get createMultiply() { return getBinaryCreateFunction(ts.SyntaxKind.AsteriskToken); },
        get createDivide() { return getBinaryCreateFunction(ts.SyntaxKind.SlashToken); },
        get createModulo() { return getBinaryCreateFunction(ts.SyntaxKind.PercentToken); },
        get createExponent() { return getBinaryCreateFunction(ts.SyntaxKind.AsteriskAsteriskToken); },
        get createPrefixPlus() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.PlusToken); },
        get createPrefixMinus() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.MinusToken); },
        get createPrefixIncrement() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.PlusPlusToken); },
        get createPrefixDecrement() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.MinusMinusToken); },
        get createBitwiseNot() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.TildeToken); },
        get createLogicalNot() { return getPrefixUnaryCreateFunction(ts.SyntaxKind.ExclamationToken); },
        get createPostfixIncrement() { return getPostfixUnaryCreateFunction(ts.SyntaxKind.PlusPlusToken); },
        get createPostfixDecrement() { return getPostfixUnaryCreateFunction(ts.SyntaxKind.MinusMinusToken); },

        // Compound nodes
        createImmediatelyInvokedFunctionExpression,
        createImmediatelyInvokedArrowFunction,
        createVoidZero,
        createExportDefault,
        createExternalModuleExport,
        createTypeCheck,
        createMethodCall,
        createGlobalMethodCall,
        createFunctionBindCall,
        createFunctionCallCall,
        createFunctionApplyCall,
        createArraySliceCall,
        createArrayConcatCall,
        createObjectDefinePropertyCall,
        createReflectGetCall,
        createReflectSetCall,
        createPropertyDescriptor,
        createCallBinding,
        createAssignmentTargetWrapper,

        // Utilities
        inlineExpressions,
        getInternalName,
        getLocalName,
        getExportName,
        getDeclarationName,
        getNamespaceMemberName,
        getExternalModuleOrNamespaceExportName,
        restoreOuterExpressions,
        restoreEnclosingLabel,
        createUseStrictPrologue,
        copyPrologue,
        copyStandardPrologue,
        copyCustomPrologue,
        ensureUseStrict,
        liftToBlock,
        mergeLexicalEnvironment,
        updateModifiers,
    } as any;

    ts.forEach(nodeFactoryPatchers, fn => fn(factory));

    return factory;

    // @api
    function createNodeArray<T extends ts.Node>(elements?: readonly T[], hasTrailingComma?: boolean): ts.NodeArray<T> {
        if (elements === undefined || elements === ts.emptyArray) {
            elements = [];
        }
        else if (ts.isNodeArray(elements)) {
            if (hasTrailingComma === undefined || elements.hasTrailingComma === hasTrailingComma) {
                // Ensure the transform flags have been aggregated for this NodeArray
                if (elements.transformFlags === undefined) {
                    aggregateChildrenFlags(elements as ts.MutableNodeArray<T>);
                }
                ts.Debug.attachNodeArrayDebugInfo(elements);
                return elements;
            }

            // This *was* a `NodeArray`, but the `hasTrailingComma` option differs. Recreate the
            // array with the same elements, text range, and transform flags but with the updated
            // value for `hasTrailingComma`
            const array = elements.slice() as ts.MutableNodeArray<T>;
            array.pos = elements.pos;
            array.end = elements.end;
            array.hasTrailingComma = hasTrailingComma;
            array.transformFlags = elements.transformFlags;
            ts.Debug.attachNodeArrayDebugInfo(array);
            return array;
        }

        // Since the element list of a node array is typically created by starting with an empty array and
        // repeatedly calling push(), the list may not have the optimal memory layout. We invoke slice() for
        // small arrays (1 to 4 elements) to give the VM a chance to allocate an optimal representation.
        const length = elements.length;
        const array = (length >= 1 && length <= 4 ? elements.slice() : elements) as ts.MutableNodeArray<T>;
        ts.setTextRangePosEnd(array, -1, -1);
        array.hasTrailingComma = !!hasTrailingComma;
        aggregateChildrenFlags(array);
        ts.Debug.attachNodeArrayDebugInfo(array);
        return array;
    }

    function createBaseNode<T extends ts.Node>(kind: T["kind"]) {
        return baseFactory.createBaseNode(kind) as ts.Mutable<T>;
    }

    function createBaseDeclaration<T extends ts.Declaration | ts.VariableStatement | ts.ImportDeclaration>(
        kind: T["kind"],
    ) {
        const node = createBaseNode(kind);
        // NOTE: The following properties are commonly set by the binder and are added here to
        // ensure declarations have a stable shape.
        node.symbol = undefined!; // initialized by binder
        node.localSymbol = undefined; // initialized by binder
        node.locals = undefined; // initialized by binder
        node.nextContainer = undefined; // initialized by binder
        return node;
    }

    function createBaseNamedDeclaration<T extends ts.NamedDeclaration>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | ts.PrivateIdentifier | ts.StringLiteralLike | ts.NumericLiteral | ts.ComputedPropertyName | ts.BindingPattern | string | undefined
    ) {
        const node = createBaseDeclaration(kind);
        name = asName(name);
        node.name = name;
        if (ts.canHaveModifiers(node)) {
            (node as ts.Mutable<ts.HasModifiers>).modifiers = asNodeArray(modifiers);
            (node as ts.Mutable<ts.HasModifiers>).transformFlags |= propagateChildrenFlags(node.modifiers);
            // node.decorators = filter(node.modifiers, isDecorator);
        }

        // The PropertyName of a member is allowed to be `await`.
        // We don't need to exclude `await` for type signatures since types
        // don't propagate child flags.
        if (name) {
            switch (node.kind) {
                case ts.SyntaxKind.MethodDeclaration:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.PropertyAssignment:
                    if (ts.isIdentifier(name)) {
                        node.transformFlags |= propagateIdentifierNameFlags(name);
                        break;
                    }
                    // fall through
                default:
                    node.transformFlags |= propagateChildFlags(name);
                    break;
            }
        }
        return node;
    }

    function createBaseGenericNamedDeclaration<T extends ts.NamedDeclaration & { typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration> }>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | ts.PrivateIdentifier | ts.StringLiteralLike | ts.NumericLiteral | ts.ComputedPropertyName | ts.BindingPattern | string | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined
    ) {
        const node = createBaseNamedDeclaration(
            kind,
            modifiers,
            name
        );
        node.typeParameters = asNodeArray(typeParameters);
        node.transformFlags |= propagateChildrenFlags(node.typeParameters);
        if (typeParameters) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    function createBaseSignatureDeclaration<T extends ts.SignatureDeclarationBase>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | ts.PrivateIdentifier | ts.StringLiteralLike | ts.NumericLiteral | ts.ComputedPropertyName | ts.BindingPattern | string | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[] | undefined,
        type: ts.TypeNode | undefined
    ) {
        const node = createBaseGenericNamedDeclaration(
            kind,
            modifiers,
            name,
            typeParameters
        );
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.transformFlags |=
            propagateChildrenFlags(node.parameters) |
            propagateChildFlags(node.type);
        if (type) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;

        // The following properties are used for quick info
        node.typeArguments = undefined;
        return node;
    }

    function finishUpdateBaseSignatureDeclaration<T extends ts.SignatureDeclarationBase>(updated: ts.Mutable<T>, original: T) {
        if (updated !== original) {
            // copy children used for quick info
            updated.typeArguments = original.typeArguments;
        }
        return update(updated, original);
    }

    function createBaseFunctionLikeDeclaration<T extends ts.FunctionLikeDeclaration>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | ts.PrivateIdentifier | ts.StringLiteralLike | ts.NumericLiteral | ts.ComputedPropertyName | ts.BindingPattern | string | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[] | undefined,
        type: ts.TypeNode | undefined,
        body: T["body"]
    ) {
        const node = createBaseSignatureDeclaration(
            kind,
            modifiers,
            name,
            typeParameters,
            parameters,
            type
        );
        node.body = body;
        node.transformFlags |= propagateChildFlags(node.body) & ~ts.TransformFlags.ContainsPossibleTopLevelAwait;
        if (!body) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    function createBaseInterfaceOrClassLikeDeclaration<T extends ts.InterfaceDeclaration | ts.ClassLikeDeclaration>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined
    ) {
        const node = createBaseGenericNamedDeclaration(
            kind,
            modifiers,
            name,
            typeParameters
        );
        node.heritageClauses = asNodeArray(heritageClauses);
        node.transformFlags |= propagateChildrenFlags(node.heritageClauses);
        return node;
    }

    function createBaseClassLikeDeclaration<T extends ts.ClassLikeDeclaration>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.ClassElement[]
    ) {
        const node = createBaseInterfaceOrClassLikeDeclaration(
            kind,
            modifiers,
            name,
            typeParameters,
            heritageClauses
        );
        node.members = createNodeArray(members);
        node.transformFlags |= propagateChildrenFlags(node.members);
        return node;
    }

    function createBaseBindingLikeDeclaration<T extends ts.PropertyDeclaration | ts.VariableDeclaration | ts.ParameterDeclaration | ts.BindingElement>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | T["name"] | undefined,
        initializer: ts.Expression | undefined
    ) {
        const node = createBaseNamedDeclaration(
            kind,
            modifiers,
            name
        );
        node.initializer = initializer;
        node.transformFlags |= propagateChildFlags(node.initializer);
        return node;
    }

    function createBaseVariableLikeDeclaration<T extends ts.PropertyDeclaration | ts.VariableDeclaration | ts.ParameterDeclaration>(
        kind: T["kind"],
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | T["name"] | undefined,
        type: ts.TypeNode | undefined,
        initializer: ts.Expression | undefined
    ) {
        const node = createBaseBindingLikeDeclaration(
            kind,
            modifiers,
            name,
            initializer
        );
        node.type = type;
        node.transformFlags |= propagateChildFlags(type);
        if (type) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    //
    // Literals
    //

    function createBaseLiteral<T extends ts.LiteralToken>(
        kind: T["kind"],
        text: string
    ) {
        const node = createBaseToken(kind);
        node.text = text;
        return node;
    }

    // @api
    function createNumericLiteral(value: string | number, numericLiteralFlags: ts.TokenFlags = ts.TokenFlags.None): ts.NumericLiteral {
        const node = createBaseLiteral<ts.NumericLiteral>(ts.SyntaxKind.NumericLiteral, typeof value === "number" ? value + "" : value);
        node.numericLiteralFlags = numericLiteralFlags;
        if (numericLiteralFlags & ts.TokenFlags.BinaryOrOctalSpecifier) node.transformFlags |= ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function createBigIntLiteral(value: string | ts.PseudoBigInt): ts.BigIntLiteral {
        const node = createBaseLiteral<ts.BigIntLiteral>(ts.SyntaxKind.BigIntLiteral, typeof value === "string" ? value : ts.pseudoBigIntToString(value) + "n");
        node.transformFlags |= ts.TransformFlags.ContainsESNext;
        return node;
    }

    function createBaseStringLiteral(text: string, isSingleQuote?: boolean) {
        const node = createBaseLiteral<ts.StringLiteral>(ts.SyntaxKind.StringLiteral, text);
        node.singleQuote = isSingleQuote;
        return node;
    }

    // @api
    function createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): ts.StringLiteral {
        const node = createBaseStringLiteral(text, isSingleQuote);
        node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
        if (hasExtendedUnicodeEscape) node.transformFlags |= ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function createStringLiteralFromNode(sourceNode: ts.PropertyNameLiteral | ts.PrivateIdentifier): ts.StringLiteral {
        const node = createBaseStringLiteral(ts.getTextOfIdentifierOrLiteral(sourceNode), /*isSingleQuote*/ undefined);
        node.textSourceNode = sourceNode;
        return node;
    }

    // @api
    function createRegularExpressionLiteral(text: string): ts.RegularExpressionLiteral {
        const node = createBaseLiteral<ts.RegularExpressionLiteral>(ts.SyntaxKind.RegularExpressionLiteral, text);
        return node;
    }

    // @api
    function createLiteralLikeNode(kind: ts.LiteralToken["kind"] | ts.SyntaxKind.JsxTextAllWhiteSpaces, text: string): ts.LiteralToken {
        switch (kind) {
            case ts.SyntaxKind.NumericLiteral: return createNumericLiteral(text, /*numericLiteralFlags*/ 0);
            case ts.SyntaxKind.BigIntLiteral: return createBigIntLiteral(text);
            case ts.SyntaxKind.StringLiteral: return createStringLiteral(text, /*isSingleQuote*/ undefined);
            case ts.SyntaxKind.JsxText: return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ false);
            case ts.SyntaxKind.JsxTextAllWhiteSpaces: return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ true);
            case ts.SyntaxKind.RegularExpressionLiteral: return createRegularExpressionLiteral(text);
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral: return createTemplateLiteralLikeNode(kind, text, /*rawText*/ undefined, /*templateFlags*/ 0) as ts.NoSubstitutionTemplateLiteral;
        }
    }

    //
    // Identifiers
    //

    function createBaseIdentifier(text: string, originalKeywordKind: ts.SyntaxKind | undefined) {
        if (originalKeywordKind === undefined && text) {
            originalKeywordKind = ts.stringToToken(text);
        }
        if (originalKeywordKind === ts.SyntaxKind.Identifier) {
            originalKeywordKind = undefined;
        }
        const node = baseFactory.createBaseIdentifierNode(ts.SyntaxKind.Identifier) as ts.Mutable<ts.Identifier>;
        node.originalKeywordKind = originalKeywordKind;
        node.escapedText = ts.escapeLeadingUnderscores(text);
        return node;
    }

    function createBaseGeneratedIdentifier(text: string, autoGenerateFlags: ts.GeneratedIdentifierFlags, prefix: string | ts.GeneratedNamePart | undefined, suffix: string | undefined) {
        const node = createBaseIdentifier(text, /*originalKeywordKind*/ undefined) as ts.Mutable<ts.GeneratedIdentifier>;
        node.autoGenerateFlags = autoGenerateFlags;
        node.autoGenerateId = nextAutoGenerateId;
        node.autoGeneratePrefix = prefix;
        node.autoGenerateSuffix = suffix;
        nextAutoGenerateId++;
        return node;
    }

    // @api
    function createIdentifier(text: string, typeArguments?: readonly (ts.TypeNode | ts.TypeParameterDeclaration)[], originalKeywordKind?: ts.SyntaxKind, hasExtendedUnicodeEscape?: boolean): ts.Identifier {
        const node = createBaseIdentifier(text, originalKeywordKind);
        if (typeArguments) {
            // NOTE: we do not use `setChildren` here because typeArguments in an identifier do not contribute to transformations
            node.typeArguments = createNodeArray(typeArguments);
        }
        if (node.originalKeywordKind === ts.SyntaxKind.AwaitKeyword) {
            node.transformFlags |= ts.TransformFlags.ContainsPossibleTopLevelAwait;
        }
        if (hasExtendedUnicodeEscape) {
            node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
            node.transformFlags |= ts.TransformFlags.ContainsES2015;
        }
        return node;
    }

    // @api
    function updateIdentifier(node: ts.Identifier, typeArguments?: ts.NodeArray<ts.TypeNode | ts.TypeParameterDeclaration> | undefined): ts.Identifier {
        return node.typeArguments !== typeArguments
            ? update(createIdentifier(ts.idText(node), typeArguments), node)
            : node;
    }

    // @api
    function createTempVariable(recordTempVariable: ((node: ts.Identifier) => void) | undefined, reservedInNestedScopes?: boolean, prefix?: string | ts.GeneratedNamePart, suffix?: string): ts.GeneratedIdentifier {
        let flags = ts.GeneratedIdentifierFlags.Auto;
        if (reservedInNestedScopes) flags |= ts.GeneratedIdentifierFlags.ReservedInNestedScopes;
        const name = createBaseGeneratedIdentifier("", flags, prefix, suffix);
        if (recordTempVariable) {
            recordTempVariable(name);
        }
        return name;
    }

    /** Create a unique temporary variable for use in a loop. */
    // @api
    function createLoopVariable(reservedInNestedScopes?: boolean): ts.Identifier {
        let flags = ts.GeneratedIdentifierFlags.Loop;
        if (reservedInNestedScopes) flags |= ts.GeneratedIdentifierFlags.ReservedInNestedScopes;
        return createBaseGeneratedIdentifier("", flags, /*prefix*/ undefined, /*suffix*/ undefined);
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniqueName(text: string, flags: ts.GeneratedIdentifierFlags = ts.GeneratedIdentifierFlags.None, prefix?: string | ts.GeneratedNamePart, suffix?: string): ts.Identifier {
        ts.Debug.assert(!(flags & ts.GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        ts.Debug.assert((flags & (ts.GeneratedIdentifierFlags.Optimistic | ts.GeneratedIdentifierFlags.FileLevel)) !== ts.GeneratedIdentifierFlags.FileLevel, "GeneratedIdentifierFlags.FileLevel cannot be set without also setting GeneratedIdentifierFlags.Optimistic");
        return createBaseGeneratedIdentifier(text, ts.GeneratedIdentifierFlags.Unique | flags, prefix, suffix);
    }

    /** Create a unique name generated for a node. */
    // @api
    function getGeneratedNameForNode(node: ts.Node | undefined, flags: ts.GeneratedIdentifierFlags = 0, prefix?: string | ts.GeneratedNamePart, suffix?: string): ts.Identifier {
        ts.Debug.assert(!(flags & ts.GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        const text = !node ? "" :
            ts.isMemberName(node) ? ts.formatGeneratedName(/*privateName*/ false, prefix, node, suffix, ts.idText) :
            `generated@${ts.getNodeId(node)}`;
        if (prefix || suffix) flags |= ts.GeneratedIdentifierFlags.Optimistic;
        const name = createBaseGeneratedIdentifier(text, ts.GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    function createBasePrivateIdentifier(text: string) {
        const node = baseFactory.createBasePrivateIdentifierNode(ts.SyntaxKind.PrivateIdentifier) as ts.Mutable<ts.PrivateIdentifier>;
        node.escapedText = ts.escapeLeadingUnderscores(text);
        node.transformFlags |= ts.TransformFlags.ContainsClassFields;
        return node;
    }

    // @api
    function createPrivateIdentifier(text: string): ts.PrivateIdentifier {
        if (!ts.startsWith(text, "#")) ts.Debug.fail("First character of private identifier must be #: " + text);
        return createBasePrivateIdentifier(text);
    }

    function createBaseGeneratedPrivateIdentifier(text: string, autoGenerateFlags: ts.GeneratedIdentifierFlags, prefix: string | ts.GeneratedNamePart | undefined, suffix: string | undefined) {
        const node = createBasePrivateIdentifier(text);
        node.autoGenerateFlags = autoGenerateFlags;
        node.autoGenerateId = nextAutoGenerateId;
        node.autoGeneratePrefix = prefix;
        node.autoGenerateSuffix = suffix;
        nextAutoGenerateId++;
        return node;
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniquePrivateName(text?: string, prefix?: string | ts.GeneratedNamePart, suffix?: string): ts.PrivateIdentifier {
        if (text && !ts.startsWith(text, "#")) ts.Debug.fail("First character of private identifier must be #: " + text);
        const autoGenerateFlags = ts.GeneratedIdentifierFlags.ReservedInNestedScopes |
            (text ? ts.GeneratedIdentifierFlags.Unique : ts.GeneratedIdentifierFlags.Auto);
        return createBaseGeneratedPrivateIdentifier(text ?? "", autoGenerateFlags, prefix, suffix);
    }

    // @api
    function getGeneratedPrivateNameForNode(node: ts.Node, prefix?: string | ts.GeneratedNamePart, suffix?: string): ts.PrivateIdentifier {
        const text = ts.isMemberName(node) ? ts.formatGeneratedName(/*privateName*/ true, prefix, node, suffix, ts.idText) :
            `#generated@${ts.getNodeId(node)}`;
        const flags = prefix || suffix ? ts.GeneratedIdentifierFlags.Optimistic : ts.GeneratedIdentifierFlags.None;
        const name = createBaseGeneratedPrivateIdentifier(text, ts.GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    //
    // Punctuation
    //

    function createBaseToken<T extends ts.Node>(kind: T["kind"]) {
        return baseFactory.createBaseTokenNode(kind) as ts.Mutable<T>;
    }

    // @api
    function createToken(token: ts.SyntaxKind.SuperKeyword): ts.SuperExpression;
    function createToken(token: ts.SyntaxKind.ThisKeyword): ts.ThisExpression;
    function createToken(token: ts.SyntaxKind.NullKeyword): ts.NullLiteral;
    function createToken(token: ts.SyntaxKind.TrueKeyword): ts.TrueLiteral;
    function createToken(token: ts.SyntaxKind.FalseKeyword): ts.FalseLiteral;
    function createToken<TKind extends ts.PunctuationSyntaxKind>(token: TKind): ts.PunctuationToken<TKind>;
    function createToken<TKind extends ts.KeywordTypeSyntaxKind>(token: TKind): ts.KeywordTypeNode<TKind>;
    function createToken<TKind extends ts.ModifierSyntaxKind>(token: TKind): ts.ModifierToken<TKind>;
    function createToken<TKind extends ts.KeywordSyntaxKind>(token: TKind): ts.KeywordToken<TKind>;
    function createToken<TKind extends ts.SyntaxKind.Unknown | ts.SyntaxKind.EndOfFileToken>(token: TKind): ts.Token<TKind>;
    function createToken<TKind extends ts.SyntaxKind>(token: TKind): ts.Token<TKind>;
    function createToken<TKind extends ts.SyntaxKind>(token: TKind) {
        ts.Debug.assert(token >= ts.SyntaxKind.FirstToken && token <= ts.SyntaxKind.LastToken, "Invalid token");
        ts.Debug.assert(token <= ts.SyntaxKind.FirstTemplateToken || token >= ts.SyntaxKind.LastTemplateToken, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
        ts.Debug.assert(token <= ts.SyntaxKind.FirstLiteralToken || token >= ts.SyntaxKind.LastLiteralToken, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
        ts.Debug.assert(token !== ts.SyntaxKind.Identifier, "Invalid token. Use 'createIdentifier' to create identifiers");
        const node = createBaseToken<ts.Token<TKind>>(token);
        let transformFlags = ts.TransformFlags.None;
        switch (token) {
            case ts.SyntaxKind.AsyncKeyword:
                // 'async' modifier is ES2017 (async functions) or ES2018 (async generators)
                transformFlags =
                    ts.TransformFlags.ContainsES2017 |
                    ts.TransformFlags.ContainsES2018;
                break;

            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
            case ts.SyntaxKind.AbstractKeyword:
            case ts.SyntaxKind.DeclareKeyword:
            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.NumberKeyword:
            case ts.SyntaxKind.BigIntKeyword:
            case ts.SyntaxKind.NeverKeyword:
            case ts.SyntaxKind.ObjectKeyword:
            case ts.SyntaxKind.InKeyword:
            case ts.SyntaxKind.OutKeyword:
            case ts.SyntaxKind.OverrideKeyword:
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.BooleanKeyword:
            case ts.SyntaxKind.SymbolKeyword:
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.UndefinedKeyword: // `undefined` is an Identifier in the expression case.
                transformFlags = ts.TransformFlags.ContainsTypeScript;
                break;
            case ts.SyntaxKind.SuperKeyword:
                transformFlags = ts.TransformFlags.ContainsES2015 | ts.TransformFlags.ContainsLexicalSuper;
                break;
            case ts.SyntaxKind.StaticKeyword:
                transformFlags = ts.TransformFlags.ContainsES2015;
                break;
            case ts.SyntaxKind.AccessorKeyword:
                transformFlags = ts.TransformFlags.ContainsClassFields;
                break;
            case ts.SyntaxKind.ThisKeyword:
                // 'this' indicates a lexical 'this'
                transformFlags = ts.TransformFlags.ContainsLexicalThis;
                break;
        }
        if (transformFlags) {
            node.transformFlags |= transformFlags;
        }
        return node;
    }

    //
    // Reserved words
    //

    // @api
    function createSuper() {
        return createToken(ts.SyntaxKind.SuperKeyword);
    }

    // @api
    function createThis() {
        return createToken(ts.SyntaxKind.ThisKeyword);
    }

    // @api
    function createNull() {
        return createToken(ts.SyntaxKind.NullKeyword);
    }

    // @api
    function createTrue() {
        return createToken(ts.SyntaxKind.TrueKeyword);
    }

    // @api
    function createFalse() {
        return createToken(ts.SyntaxKind.FalseKeyword);
    }

    //
    // Modifiers
    //

    // @api
    function createModifier<T extends ts.ModifierSyntaxKind>(kind: T) {
        return createToken(kind);
    }

    // @api
    function createModifiersFromModifierFlags(flags: ts.ModifierFlags) {
        const result: ts.Modifier[] = [];
        if (flags & ts.ModifierFlags.Export) result.push(createModifier(ts.SyntaxKind.ExportKeyword));
        if (flags & ts.ModifierFlags.Ambient) result.push(createModifier(ts.SyntaxKind.DeclareKeyword));
        if (flags & ts.ModifierFlags.Default) result.push(createModifier(ts.SyntaxKind.DefaultKeyword));
        if (flags & ts.ModifierFlags.Const) result.push(createModifier(ts.SyntaxKind.ConstKeyword));
        if (flags & ts.ModifierFlags.Public) result.push(createModifier(ts.SyntaxKind.PublicKeyword));
        if (flags & ts.ModifierFlags.Private) result.push(createModifier(ts.SyntaxKind.PrivateKeyword));
        if (flags & ts.ModifierFlags.Protected) result.push(createModifier(ts.SyntaxKind.ProtectedKeyword));
        if (flags & ts.ModifierFlags.Abstract) result.push(createModifier(ts.SyntaxKind.AbstractKeyword));
        if (flags & ts.ModifierFlags.Static) result.push(createModifier(ts.SyntaxKind.StaticKeyword));
        if (flags & ts.ModifierFlags.Override) result.push(createModifier(ts.SyntaxKind.OverrideKeyword));
        if (flags & ts.ModifierFlags.Readonly) result.push(createModifier(ts.SyntaxKind.ReadonlyKeyword));
        if (flags & ts.ModifierFlags.Accessor) result.push(createModifier(ts.SyntaxKind.AccessorKeyword));
        if (flags & ts.ModifierFlags.Async) result.push(createModifier(ts.SyntaxKind.AsyncKeyword));
        if (flags & ts.ModifierFlags.In) result.push(createModifier(ts.SyntaxKind.InKeyword));
        if (flags & ts.ModifierFlags.Out) result.push(createModifier(ts.SyntaxKind.OutKeyword));
        return result.length ? result : undefined;
    }

    //
    // Names
    //

    // @api
    function createQualifiedName(left: ts.EntityName, right: string | ts.Identifier) {
        const node = createBaseNode<ts.QualifiedName>(ts.SyntaxKind.QualifiedName);
        node.left = left;
        node.right = asName(right);
        node.transformFlags |=
            propagateChildFlags(node.left) |
            propagateIdentifierNameFlags(node.right);
        return node;
    }

    // @api
    function updateQualifiedName(node: ts.QualifiedName, left: ts.EntityName, right: ts.Identifier) {
        return node.left !== left
            || node.right !== right
            ? update(createQualifiedName(left, right), node)
            : node;
    }

    // @api
    function createComputedPropertyName(expression: ts.Expression) {
        const node = createBaseNode<ts.ComputedPropertyName>(ts.SyntaxKind.ComputedPropertyName);
        node.expression = parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsES2015 |
            ts.TransformFlags.ContainsComputedPropertyName;
        return node;
    }

    // @api
    function updateComputedPropertyName(node: ts.ComputedPropertyName, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createComputedPropertyName(expression), node)
            : node;
    }

    //
    // Signature elements
    //

    // @api
    function createTypeParameterDeclaration(modifiers: readonly ts.Modifier[] | undefined, name: string | ts.Identifier, constraint?: ts.TypeNode, defaultType?: ts.TypeNode): ts.TypeParameterDeclaration {
        const node = createBaseNamedDeclaration<ts.TypeParameterDeclaration>(
            ts.SyntaxKind.TypeParameter,
            modifiers,
            name
        );
        node.constraint = constraint;
        node.default = defaultType;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeParameterDeclaration(node: ts.TypeParameterDeclaration, modifiers: readonly ts.Modifier[] | undefined, name: ts.Identifier, constraint: ts.TypeNode | undefined, defaultType: ts.TypeNode | undefined): ts.TypeParameterDeclaration {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.constraint !== constraint
            || node.default !== defaultType
            ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node)
            : node;
    }

    // @api
    function createParameterDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        dotDotDotToken: ts.DotDotDotToken | undefined,
        name: string | ts.BindingName,
        questionToken?: ts.QuestionToken,
        type?: ts.TypeNode,
        initializer?: ts.Expression
    ) {
        const node = createBaseVariableLikeDeclaration<ts.ParameterDeclaration>(
            ts.SyntaxKind.Parameter,
            modifiers,
            name,
            type,
            initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer)
        );
        node.dotDotDotToken = dotDotDotToken;
        node.questionToken = questionToken;
        if (ts.isThisIdentifier(node.name)) {
            node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |=
                propagateChildFlags(node.dotDotDotToken) |
                propagateChildFlags(node.questionToken);
            if (questionToken) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
            if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.ParameterPropertyModifier) node.transformFlags |= ts.TransformFlags.ContainsTypeScriptClassSyntax;
            if (initializer || dotDotDotToken) node.transformFlags |= ts.TransformFlags.ContainsES2015;
        }
        return node;
    }

    // @api
    function updateParameterDeclaration(
        node: ts.ParameterDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        dotDotDotToken: ts.DotDotDotToken | undefined,
        name: string | ts.BindingName,
        questionToken: ts.QuestionToken | undefined,
        type: ts.TypeNode | undefined,
        initializer: ts.Expression | undefined
    ) {
        return node.modifiers !== modifiers
            || node.dotDotDotToken !== dotDotDotToken
            || node.name !== name
            || node.questionToken !== questionToken
            || node.type !== type
            || node.initializer !== initializer
            ? update(createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer), node)
            : node;
    }

    // @api
    function createDecorator(expression: ts.Expression) {
        const node = createBaseNode<ts.Decorator>(ts.SyntaxKind.Decorator);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsTypeScript |
            ts.TransformFlags.ContainsTypeScriptClassSyntax |
            ts.TransformFlags.ContainsDecorators;
        return node;
    }

    // @api
    function updateDecorator(node: ts.Decorator, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createDecorator(expression), node)
            : node;
    }

    //
    // Type Elements
    //

    // @api
    function createPropertySignature(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.PropertyName | string,
        questionToken: ts.QuestionToken | undefined,
        type: ts.TypeNode | undefined
    ): ts.PropertySignature {
        const node = createBaseNamedDeclaration<ts.PropertySignature>(
            ts.SyntaxKind.PropertySignature,
            modifiers,
            name
        );
        node.type = type;
        node.questionToken = questionToken;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;

        // The following properties are used only to report grammar errors
        node.initializer = undefined;
        return node;
    }

    // @api
    function updatePropertySignature(
        node: ts.PropertySignature,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        type: ts.TypeNode | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.questionToken !== questionToken
            || node.type !== type
            ? finishUpdatePropertySignature(createPropertySignature(modifiers, name, questionToken, type), node)
            : node;
    }

    function finishUpdatePropertySignature(updated: ts.Mutable<ts.PropertySignature>, original: ts.PropertySignature) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.initializer = original.initializer;
        }
        return update(updated, original);
    }

    // @api
    function createPropertyDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.PropertyName,
        questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined,
        type: ts.TypeNode | undefined,
        initializer: ts.Expression | undefined
    ) {
        const node = createBaseVariableLikeDeclaration<ts.PropertyDeclaration>(
            ts.SyntaxKind.PropertyDeclaration,
            modifiers,
            name,
            type,
            initializer
        );
        node.questionToken = questionOrExclamationToken && ts.isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.exclamationToken = questionOrExclamationToken && ts.isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.transformFlags |=
            propagateChildFlags(node.questionToken) |
            propagateChildFlags(node.exclamationToken) |
            ts.TransformFlags.ContainsClassFields;
        if (ts.isComputedPropertyName(node.name) || (ts.hasStaticModifier(node) && node.initializer)) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScriptClassSyntax;
        }
        if (questionOrExclamationToken || ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Ambient) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updatePropertyDeclaration(
        node: ts.PropertyDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.PropertyName,
        questionOrExclamationToken: ts.QuestionToken | ts.ExclamationToken | undefined,
        type: ts.TypeNode | undefined,
        initializer: ts.Expression | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.questionToken !== (questionOrExclamationToken !== undefined && ts.isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
            || node.exclamationToken !== (questionOrExclamationToken !== undefined && ts.isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
            || node.type !== type
            || node.initializer !== initializer
            ? update(createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createMethodSignature(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ) {
        const node = createBaseSignatureDeclaration<ts.MethodSignature>(
            ts.SyntaxKind.MethodSignature,
            modifiers,
            name,
            typeParameters,
            parameters,
            type
        );
        node.questionToken = questionToken;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateMethodSignature(
        node: ts.MethodSignature,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.questionToken !== questionToken
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createMethodDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: string | ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.MethodDeclaration>(
            ts.SyntaxKind.MethodDeclaration,
            modifiers,
            name,
            typeParameters,
            parameters,
            type,
            body
        );
        node.asteriskToken = asteriskToken;
        node.questionToken = questionToken;
        node.transformFlags |=
            propagateChildFlags(node.asteriskToken) |
            propagateChildFlags(node.questionToken) |
            ts.TransformFlags.ContainsES2015;
        if (questionToken) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Async) {
            if (asteriskToken) {
                node.transformFlags |= ts.TransformFlags.ContainsES2018;
            }
            else {
                node.transformFlags |= ts.TransformFlags.ContainsES2017;
            }
        }
        else if (asteriskToken) {
            node.transformFlags |= ts.TransformFlags.ContainsGenerator;
        }

        // The following properties are used only to report grammar errors
        node.exclamationToken = undefined;
        return node;
    }

    // @api
    function updateMethodDeclaration(
        node: ts.MethodDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        return node.modifiers !== modifiers
            || node.asteriskToken !== asteriskToken
            || node.name !== name
            || node.questionToken !== questionToken
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            || node.body !== body
            ? finishUpdateMethodDeclaration(createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body), node)
            : node;
    }

    function finishUpdateMethodDeclaration(updated: ts.Mutable<ts.MethodDeclaration>, original: ts.MethodDeclaration) {
        if (updated !== original) {
            updated.exclamationToken = original.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createClassStaticBlockDeclaration(
        body: ts.Block
    ): ts.ClassStaticBlockDeclaration {
        const node = createBaseGenericNamedDeclaration<ts.ClassStaticBlockDeclaration>(
            ts.SyntaxKind.ClassStaticBlockDeclaration,
            /*modifiers*/ undefined,
            /*name*/ undefined,
            /*typeParameters*/ undefined
        );
        node.body = body;
        node.transformFlags = propagateChildFlags(body) | ts.TransformFlags.ContainsClassFields;

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        node.modifiers = undefined;
        return node;
    }

    // @api
    function updateClassStaticBlockDeclaration(
        node: ts.ClassStaticBlockDeclaration,
        body: ts.Block
    ): ts.ClassStaticBlockDeclaration {
        return node.body !== body
            ? finishUpdateClassStaticBlockDeclaration(createClassStaticBlockDeclaration(body), node)
            : node;
    }

    function finishUpdateClassStaticBlockDeclaration(updated: ts.Mutable<ts.ClassStaticBlockDeclaration>, original: ts.ClassStaticBlockDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
            updated.modifiers = original.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createConstructorDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        body: ts.Block | undefined
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.ConstructorDeclaration>(
            ts.SyntaxKind.Constructor,
            modifiers,
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            parameters,
            /*type*/ undefined,
            body
        );
        node.transformFlags |= ts.TransformFlags.ContainsES2015;

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        node.typeParameters = undefined;
        node.type = undefined;
        return node;
    }

    // @api
    function updateConstructorDeclaration(
        node: ts.ConstructorDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        body: ts.Block | undefined
    ) {
        return node.modifiers !== modifiers
            || node.parameters !== parameters
            || node.body !== body
            ? finishUpdateConstructorDeclaration(createConstructorDeclaration(modifiers, parameters, body), node)
            : node;
    }

    function finishUpdateConstructorDeclaration(updated: ts.Mutable<ts.ConstructorDeclaration>, original: ts.ConstructorDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
            updated.typeParameters = original.typeParameters;
            updated.type = original.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createGetAccessorDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.PropertyName,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.GetAccessorDeclaration>(
            ts.SyntaxKind.GetAccessor,
            modifiers,
            name,
            /*typeParameters*/ undefined,
            parameters,
            type,
            body
        );

        // The following properties are used only to report grammar errors
        node.typeParameters = undefined;
        return node;
    }

    // @api
    function updateGetAccessorDeclaration(
        node: ts.GetAccessorDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.PropertyName,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.parameters !== parameters
            || node.type !== type
            || node.body !== body
            ? finishUpdateGetAccessorDeclaration(createGetAccessorDeclaration(modifiers, name, parameters, type, body), node)
            : node;
    }

    function finishUpdateGetAccessorDeclaration(updated: ts.Mutable<ts.GetAccessorDeclaration>, original: ts.GetAccessorDeclaration) {
        if (updated !== original) {
            updated.typeParameters = original.typeParameters;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createSetAccessorDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.PropertyName,
        parameters: readonly ts.ParameterDeclaration[],
        body: ts.Block | undefined
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.SetAccessorDeclaration>(
            ts.SyntaxKind.SetAccessor,
            modifiers,
            name,
            /*typeParameters*/ undefined,
            parameters,
            /*type*/ undefined,
            body
        );

        // The following properties are used only to report grammar errors
        node.typeParameters = undefined;
        node.type = undefined;
        return node;
    }

    // @api
    function updateSetAccessorDeclaration(
        node: ts.SetAccessorDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.PropertyName,
        parameters: readonly ts.ParameterDeclaration[],
        body: ts.Block | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.parameters !== parameters
            || node.body !== body
            ? finishUpdateSetAccessorDeclaration(createSetAccessorDeclaration(modifiers, name, parameters, body), node)
            : node;
    }

    function finishUpdateSetAccessorDeclaration(updated: ts.Mutable<ts.SetAccessorDeclaration>, original: ts.SetAccessorDeclaration) {
        if (updated !== original) {
            updated.typeParameters = original.typeParameters;
            updated.type = original.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createCallSignature(
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.CallSignatureDeclaration {
        const node = createBaseSignatureDeclaration<ts.CallSignatureDeclaration>(
            ts.SyntaxKind.CallSignature,
            /*modifiers*/ undefined,
            /*name*/ undefined,
            typeParameters,
            parameters,
            type
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateCallSignature(
        node: ts.CallSignatureDeclaration,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createConstructSignature(
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.ConstructSignatureDeclaration {
        const node = createBaseSignatureDeclaration<ts.ConstructSignatureDeclaration>(
            ts.SyntaxKind.ConstructSignature,
            /*modifiers*/ undefined,
            /*name*/ undefined,
            typeParameters,
            parameters,
            type
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateConstructSignature(
        node: ts.ConstructSignatureDeclaration,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createIndexSignature(
        modifiers: readonly ts.Modifier[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.IndexSignatureDeclaration {
        const node = createBaseSignatureDeclaration<ts.IndexSignatureDeclaration>(
            ts.SyntaxKind.IndexSignature,
            modifiers,
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            parameters,
            type
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateIndexSignature(
        node: ts.IndexSignatureDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode
    ) {
        return node.parameters !== parameters
            || node.type !== type
            || node.modifiers !== modifiers
            ? finishUpdateBaseSignatureDeclaration(createIndexSignature(modifiers, parameters, type), node)
            : node;
    }

    // @api
    function createTemplateLiteralTypeSpan(type: ts.TypeNode, literal: ts.TemplateMiddle | ts.TemplateTail) {
        const node = createBaseNode<ts.TemplateLiteralTypeSpan>(ts.SyntaxKind.TemplateLiteralTypeSpan);
        node.type = type;
        node.literal = literal;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTemplateLiteralTypeSpan(node: ts.TemplateLiteralTypeSpan, type: ts.TypeNode, literal: ts.TemplateMiddle | ts.TemplateTail) {
        return node.type !== type
            || node.literal !== literal
            ? update(createTemplateLiteralTypeSpan(type, literal), node)
            : node;
    }

    //
    // Types
    //

    // @api
    function createKeywordTypeNode<TKind extends ts.KeywordTypeSyntaxKind>(kind: TKind) {
        return createToken(kind);
    }

    // @api
    function createTypePredicateNode(assertsModifier: ts.AssertsKeyword | undefined, parameterName: ts.Identifier | ts.ThisTypeNode | string, type: ts.TypeNode | undefined) {
        const node = createBaseNode<ts.TypePredicateNode>(ts.SyntaxKind.TypePredicate);
        node.assertsModifier = assertsModifier;
        node.parameterName = asName(parameterName);
        node.type = type;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypePredicateNode(node: ts.TypePredicateNode, assertsModifier: ts.AssertsKeyword | undefined, parameterName: ts.Identifier | ts.ThisTypeNode, type: ts.TypeNode | undefined) {
        return node.assertsModifier !== assertsModifier
            || node.parameterName !== parameterName
            || node.type !== type
            ? update(createTypePredicateNode(assertsModifier, parameterName, type), node)
            : node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | ts.EntityName, typeArguments: readonly ts.TypeNode[] | undefined) {
        const node = createBaseNode<ts.TypeReferenceNode>(ts.SyntaxKind.TypeReference);
        node.typeName = asName(typeName);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeReferenceNode(node: ts.TypeReferenceNode, typeName: ts.EntityName, typeArguments: ts.NodeArray<ts.TypeNode> | undefined) {
        return node.typeName !== typeName
            || node.typeArguments !== typeArguments
            ? update(createTypeReferenceNode(typeName, typeArguments), node)
            : node;
    }

    // @api
    function createFunctionTypeNode(
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.FunctionTypeNode {
        const node = createBaseSignatureDeclaration<ts.FunctionTypeNode>(
            ts.SyntaxKind.FunctionType,
            /*modifiers*/ undefined,
            /*name*/ undefined,
            typeParameters,
            parameters,
            type
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;

        // The following properties are used only to report grammar errors
        node.modifiers = undefined;
        return node;
    }

    // @api
    function updateFunctionTypeNode(
        node: ts.FunctionTypeNode,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? finishUpdateFunctionTypeNode(createFunctionTypeNode(typeParameters, parameters, type), node)
            : node;
    }

    function finishUpdateFunctionTypeNode(updated: ts.Mutable<ts.FunctionTypeNode>, original: ts.FunctionTypeNode) {
        if (updated !== original) {
            updated.modifiers = original.modifiers;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createConstructorTypeNode(...args: Parameters<typeof createConstructorTypeNode1 | typeof createConstructorTypeNode2>) {
        return args.length === 4 ? createConstructorTypeNode1(...args) :
            args.length === 3 ? createConstructorTypeNode2(...args) :
            ts.Debug.fail("Incorrect number of arguments specified.");
    }

    function createConstructorTypeNode1(
        modifiers: readonly ts.Modifier[] | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.ConstructorTypeNode {
        const node = createBaseSignatureDeclaration<ts.ConstructorTypeNode>(
            ts.SyntaxKind.ConstructorType,
            modifiers,
            /*name*/ undefined,
            typeParameters,
            parameters,
            type
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    /** @deprecated */
    function createConstructorTypeNode2(
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined
    ): ts.ConstructorTypeNode {
        return createConstructorTypeNode1(/*modifiers*/ undefined, typeParameters, parameters, type);
    }

    // @api
    function updateConstructorTypeNode(...args: Parameters<typeof updateConstructorTypeNode1 | typeof updateConstructorTypeNode2>) {
        return args.length === 5 ? updateConstructorTypeNode1(...args) :
            args.length === 4 ? updateConstructorTypeNode2(...args) :
            ts.Debug.fail("Incorrect number of arguments specified.");
    }

    function updateConstructorTypeNode1(
        node: ts.ConstructorTypeNode,
        modifiers: readonly ts.Modifier[] | undefined,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return node.modifiers !== modifiers
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createConstructorTypeNode(modifiers, typeParameters, parameters, type), node)
            : node;
    }

    /** @deprecated */
    function updateConstructorTypeNode2(
        node: ts.ConstructorTypeNode,
        typeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined,
        parameters: ts.NodeArray<ts.ParameterDeclaration>,
        type: ts.TypeNode | undefined
    ) {
        return updateConstructorTypeNode1(node, node.modifiers, typeParameters, parameters, type);
    }

    // @api
    function createTypeQueryNode(exprName: ts.EntityName, typeArguments?: readonly ts.TypeNode[]) {
        const node = createBaseNode<ts.TypeQueryNode>(ts.SyntaxKind.TypeQuery);
        node.exprName = exprName;
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeQueryNode(node: ts.TypeQueryNode, exprName: ts.EntityName, typeArguments?: readonly ts.TypeNode[]) {
        return node.exprName !== exprName
            || node.typeArguments !== typeArguments
            ? update(createTypeQueryNode(exprName, typeArguments), node)
            : node;
    }

    // @api
    function createTypeLiteralNode(members: readonly ts.TypeElement[] | undefined) {
        const node = createBaseNode<ts.TypeLiteralNode>(ts.SyntaxKind.TypeLiteral);
        node.members = createNodeArray(members);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeLiteralNode(node: ts.TypeLiteralNode, members: ts.NodeArray<ts.TypeElement>) {
        return node.members !== members
            ? update(createTypeLiteralNode(members), node)
            : node;
    }

    // @api
    function createArrayTypeNode(elementType: ts.TypeNode) {
        const node = createBaseNode<ts.ArrayTypeNode>(ts.SyntaxKind.ArrayType);
        node.elementType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateArrayTypeNode(node: ts.ArrayTypeNode, elementType: ts.TypeNode): ts.ArrayTypeNode {
        return node.elementType !== elementType
            ? update(createArrayTypeNode(elementType), node)
            : node;
    }

    // @api
    function createTupleTypeNode(elements: readonly (ts.TypeNode | ts.NamedTupleMember)[]) {
        const node = createBaseNode<ts.TupleTypeNode>(ts.SyntaxKind.TupleType);
        node.elements = createNodeArray(parenthesizerRules().parenthesizeElementTypesOfTupleType(elements));
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTupleTypeNode(node: ts.TupleTypeNode, elements: readonly (ts.TypeNode | ts.NamedTupleMember)[]) {
        return node.elements !== elements
            ? update(createTupleTypeNode(elements), node)
            : node;
    }

    // @api
    function createNamedTupleMember(dotDotDotToken: ts.DotDotDotToken | undefined, name: ts.Identifier, questionToken: ts.QuestionToken | undefined, type: ts.TypeNode) {
        const node = createBaseNode<ts.NamedTupleMember>(ts.SyntaxKind.NamedTupleMember);
        node.dotDotDotToken = dotDotDotToken;
        node.name = name;
        node.questionToken = questionToken;
        node.type = type;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateNamedTupleMember(node: ts.NamedTupleMember, dotDotDotToken: ts.DotDotDotToken | undefined, name: ts.Identifier, questionToken: ts.QuestionToken | undefined, type: ts.TypeNode) {
        return node.dotDotDotToken !== dotDotDotToken
            || node.name !== name
            || node.questionToken !== questionToken
            || node.type !== type
            ? update(createNamedTupleMember(dotDotDotToken, name, questionToken, type), node)
            : node;
    }

    // @api
    function createOptionalTypeNode(type: ts.TypeNode) {
        const node = createBaseNode<ts.OptionalTypeNode>(ts.SyntaxKind.OptionalType);
        node.type = parenthesizerRules().parenthesizeTypeOfOptionalType(type);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateOptionalTypeNode(node: ts.OptionalTypeNode, type: ts.TypeNode): ts.OptionalTypeNode {
        return node.type !== type
            ? update(createOptionalTypeNode(type), node)
            : node;
    }

    // @api
    function createRestTypeNode(type: ts.TypeNode) {
        const node = createBaseNode<ts.RestTypeNode>(ts.SyntaxKind.RestType);
        node.type = type;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateRestTypeNode(node: ts.RestTypeNode, type: ts.TypeNode): ts.RestTypeNode {
        return node.type !== type
            ? update(createRestTypeNode(type), node)
            : node;
    }

    function createUnionOrIntersectionTypeNode(kind: ts.SyntaxKind.UnionType | ts.SyntaxKind.IntersectionType, types: readonly ts.TypeNode[], parenthesize: (nodes: readonly ts.TypeNode[]) => readonly ts.TypeNode[]) {
        const node = createBaseNode<ts.UnionTypeNode | ts.IntersectionTypeNode>(kind);
        node.types = factory.createNodeArray(parenthesize(types));
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    function updateUnionOrIntersectionTypeNode<T extends ts.UnionOrIntersectionTypeNode>(node: T, types: ts.NodeArray<ts.TypeNode>, parenthesize: (nodes: readonly ts.TypeNode[]) => readonly ts.TypeNode[]): T {
        return node.types !== types
            ? update(createUnionOrIntersectionTypeNode(node.kind, types, parenthesize) as T, node)
            : node;
    }

    // @api
    function createUnionTypeNode(types: readonly ts.TypeNode[]): ts.UnionTypeNode {
        return createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType) as ts.UnionTypeNode;
    }

    // @api
    function updateUnionTypeNode(node: ts.UnionTypeNode, types: ts.NodeArray<ts.TypeNode>) {
        return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType);
    }

    // @api
    function createIntersectionTypeNode(types: readonly ts.TypeNode[]): ts.IntersectionTypeNode {
        return createUnionOrIntersectionTypeNode(ts.SyntaxKind.IntersectionType, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType) as ts.IntersectionTypeNode;
    }

    // @api
    function updateIntersectionTypeNode(node: ts.IntersectionTypeNode, types: ts.NodeArray<ts.TypeNode>) {
        return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
    }

    // @api
    function createConditionalTypeNode(checkType: ts.TypeNode, extendsType: ts.TypeNode, trueType: ts.TypeNode, falseType: ts.TypeNode) {
        const node = createBaseNode<ts.ConditionalTypeNode>(ts.SyntaxKind.ConditionalType);
        node.checkType = parenthesizerRules().parenthesizeCheckTypeOfConditionalType(checkType);
        node.extendsType = parenthesizerRules().parenthesizeExtendsTypeOfConditionalType(extendsType);
        node.trueType = trueType;
        node.falseType = falseType;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateConditionalTypeNode(node: ts.ConditionalTypeNode, checkType: ts.TypeNode, extendsType: ts.TypeNode, trueType: ts.TypeNode, falseType: ts.TypeNode) {
        return node.checkType !== checkType
            || node.extendsType !== extendsType
            || node.trueType !== trueType
            || node.falseType !== falseType
            ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
            : node;
    }

    // @api
    function createInferTypeNode(typeParameter: ts.TypeParameterDeclaration) {
        const node = createBaseNode<ts.InferTypeNode>(ts.SyntaxKind.InferType);
        node.typeParameter = typeParameter;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateInferTypeNode(node: ts.InferTypeNode, typeParameter: ts.TypeParameterDeclaration) {
        return node.typeParameter !== typeParameter
            ? update(createInferTypeNode(typeParameter), node)
            : node;
    }

    // @api
    function createTemplateLiteralType(head: ts.TemplateHead, templateSpans: readonly ts.TemplateLiteralTypeSpan[]) {
        const node = createBaseNode<ts.TemplateLiteralTypeNode>(ts.SyntaxKind.TemplateLiteralType);
        node.head = head;
        node.templateSpans = createNodeArray(templateSpans);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTemplateLiteralType(node: ts.TemplateLiteralTypeNode, head: ts.TemplateHead, templateSpans: readonly ts.TemplateLiteralTypeSpan[]) {
        return node.head !== head
            || node.templateSpans !== templateSpans
            ? update(createTemplateLiteralType(head, templateSpans), node)
            : node;
    }

    // @api
    function createImportTypeNode(
        argument: ts.TypeNode,
        assertions?: ts.ImportTypeAssertionContainer,
        qualifier?: ts.EntityName,
        typeArguments?: readonly ts.TypeNode[],
        isTypeOf = false
    ): ts.ImportTypeNode {
        const node = createBaseNode<ts.ImportTypeNode>(ts.SyntaxKind.ImportType);
        node.argument = argument;
        node.assertions = assertions;
        node.qualifier = qualifier;
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.isTypeOf = isTypeOf;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateImportTypeNode(
        node: ts.ImportTypeNode,
        argument: ts.TypeNode,
        assertions: ts.ImportTypeAssertionContainer | undefined,
        qualifier: ts.EntityName | undefined,
        typeArguments: readonly ts.TypeNode[] | undefined,
        isTypeOf: boolean = node.isTypeOf
    ): ts.ImportTypeNode {
        return node.argument !== argument
            || node.assertions !== assertions
            || node.qualifier !== qualifier
            || node.typeArguments !== typeArguments
            || node.isTypeOf !== isTypeOf
            ? update(createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf), node)
            : node;
    }

    // @api
    function createParenthesizedType(type: ts.TypeNode) {
        const node = createBaseNode<ts.ParenthesizedTypeNode>(ts.SyntaxKind.ParenthesizedType);
        node.type = type;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateParenthesizedType(node: ts.ParenthesizedTypeNode, type: ts.TypeNode) {
        return node.type !== type
            ? update(createParenthesizedType(type), node)
            : node;
    }

    // @api
    function createThisTypeNode() {
        const node = createBaseNode<ts.ThisTypeNode>(ts.SyntaxKind.ThisType);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function createTypeOperatorNode(operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword, type: ts.TypeNode): ts.TypeOperatorNode {
        const node = createBaseNode<ts.TypeOperatorNode>(ts.SyntaxKind.TypeOperator);
        node.operator = operator;
        node.type = operator === ts.SyntaxKind.ReadonlyKeyword ?
            parenthesizerRules().parenthesizeOperandOfReadonlyTypeOperator(type) :
            parenthesizerRules().parenthesizeOperandOfTypeOperator(type);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeOperatorNode(node: ts.TypeOperatorNode, type: ts.TypeNode) {
        return node.type !== type
            ? update(createTypeOperatorNode(node.operator, type), node)
            : node;
    }

    // @api
    function createIndexedAccessTypeNode(objectType: ts.TypeNode, indexType: ts.TypeNode) {
        const node = createBaseNode<ts.IndexedAccessTypeNode>(ts.SyntaxKind.IndexedAccessType);
        node.objectType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(objectType);
        node.indexType = indexType;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateIndexedAccessTypeNode(node: ts.IndexedAccessTypeNode, objectType: ts.TypeNode, indexType: ts.TypeNode) {
        return node.objectType !== objectType
            || node.indexType !== indexType
            ? update(createIndexedAccessTypeNode(objectType, indexType), node)
            : node;
    }

    // @api
    function createMappedTypeNode(readonlyToken: ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken | undefined, typeParameter: ts.TypeParameterDeclaration, nameType: ts.TypeNode | undefined, questionToken: ts.QuestionToken | ts.PlusToken | ts.MinusToken | undefined, type: ts.TypeNode | undefined, members: readonly ts.TypeElement[] | undefined): ts.MappedTypeNode {
        const node = createBaseNode<ts.MappedTypeNode>(ts.SyntaxKind.MappedType);
        node.readonlyToken = readonlyToken;
        node.typeParameter = typeParameter;
        node.nameType = nameType;
        node.questionToken = questionToken;
        node.type = type;
        node.members = members && createNodeArray(members);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateMappedTypeNode(node: ts.MappedTypeNode, readonlyToken: ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken | undefined, typeParameter: ts.TypeParameterDeclaration, nameType: ts.TypeNode | undefined, questionToken: ts.QuestionToken | ts.PlusToken | ts.MinusToken | undefined, type: ts.TypeNode | undefined, members: readonly ts.TypeElement[] | undefined): ts.MappedTypeNode {
        return node.readonlyToken !== readonlyToken
            || node.typeParameter !== typeParameter
            || node.nameType !== nameType
            || node.questionToken !== questionToken
            || node.type !== type
            || node.members !== members
            ? update(createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), node)
            : node;
    }

    // @api
    function createLiteralTypeNode(literal: ts.LiteralTypeNode["literal"]) {
        const node = createBaseNode<ts.LiteralTypeNode>(ts.SyntaxKind.LiteralType);
        node.literal = literal;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateLiteralTypeNode(node: ts.LiteralTypeNode, literal: ts.LiteralTypeNode["literal"]) {
        return node.literal !== literal
            ? update(createLiteralTypeNode(literal), node)
            : node;
    }

    //
    // Binding Patterns
    //

    // @api
    function createObjectBindingPattern(elements: readonly ts.BindingElement[]) {
        const node = createBaseNode<ts.ObjectBindingPattern>(ts.SyntaxKind.ObjectBindingPattern);
        node.elements = createNodeArray(elements);
        node.transformFlags |=
            propagateChildrenFlags(node.elements) |
            ts.TransformFlags.ContainsES2015 |
            ts.TransformFlags.ContainsBindingPattern;
        if (node.transformFlags & ts.TransformFlags.ContainsRestOrSpread) {
            node.transformFlags |=
                ts.TransformFlags.ContainsES2018 |
                ts.TransformFlags.ContainsObjectRestOrSpread;
        }
        return node;
    }

    // @api
    function updateObjectBindingPattern(node: ts.ObjectBindingPattern, elements: readonly ts.BindingElement[]) {
        return node.elements !== elements
            ? update(createObjectBindingPattern(elements), node)
            : node;
    }

    // @api
    function createArrayBindingPattern(elements: readonly ts.ArrayBindingElement[]) {
        const node = createBaseNode<ts.ArrayBindingPattern>(ts.SyntaxKind.ArrayBindingPattern);
        node.elements = createNodeArray(elements);
        node.transformFlags |=
            propagateChildrenFlags(node.elements) |
            ts.TransformFlags.ContainsES2015 |
            ts.TransformFlags.ContainsBindingPattern;
        return node;
    }

    // @api
    function updateArrayBindingPattern(node: ts.ArrayBindingPattern, elements: readonly ts.ArrayBindingElement[]) {
        return node.elements !== elements
            ? update(createArrayBindingPattern(elements), node)
            : node;
    }

    // @api
    function createBindingElement(dotDotDotToken: ts.DotDotDotToken | undefined, propertyName: string | ts.PropertyName | undefined, name: string | ts.BindingName, initializer?: ts.Expression) {
        const node = createBaseBindingLikeDeclaration<ts.BindingElement>(
            ts.SyntaxKind.BindingElement,
            /*modifiers*/ undefined,
            name,
            initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer)
        );
        node.propertyName = asName(propertyName);
        node.dotDotDotToken = dotDotDotToken;
        node.transformFlags |=
            propagateChildFlags(node.dotDotDotToken) |
            ts.TransformFlags.ContainsES2015;
        if (node.propertyName) {
            node.transformFlags |= ts.isIdentifier(node.propertyName) ?
                propagateIdentifierNameFlags(node.propertyName) :
                propagateChildFlags(node.propertyName);
        }
        if (dotDotDotToken) node.transformFlags |= ts.TransformFlags.ContainsRestOrSpread;
        return node;
    }

    // @api
    function updateBindingElement(node: ts.BindingElement, dotDotDotToken: ts.DotDotDotToken | undefined, propertyName: ts.PropertyName | undefined, name: ts.BindingName, initializer: ts.Expression | undefined) {
        return node.propertyName !== propertyName
            || node.dotDotDotToken !== dotDotDotToken
            || node.name !== name
            || node.initializer !== initializer
            ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
            : node;
    }

    //
    // Expression
    //

    function createBaseExpression<T extends ts.Expression>(kind: T["kind"]) {
        const node = createBaseNode(kind);
        // the following properties are commonly set by the checker/binder
        return node;
    }

    // @api
    function createArrayLiteralExpression(elements?: readonly ts.Expression[], multiLine?: boolean) {
        const node = createBaseExpression<ts.ArrayLiteralExpression>(ts.SyntaxKind.ArrayLiteralExpression);
        // Ensure we add a trailing comma for something like `[NumericLiteral(1), NumericLiteral(2), OmittedExpresion]` so that
        // we end up with `[1, 2, ,]` instead of `[1, 2, ]` otherwise the `OmittedExpression` will just end up being treated like
        // a trailing comma.
        const lastElement = elements && ts.lastOrUndefined(elements);
        const elementsArray = createNodeArray(elements, lastElement && ts.isOmittedExpression(lastElement) ? true : undefined);
        node.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.elements);
        return node;
    }

    // @api
    function updateArrayLiteralExpression(node: ts.ArrayLiteralExpression, elements: readonly ts.Expression[]) {
        return node.elements !== elements
            ? update(createArrayLiteralExpression(elements, node.multiLine), node)
            : node;
    }

    // @api
    function createObjectLiteralExpression(properties?: readonly ts.ObjectLiteralElementLike[], multiLine?: boolean) {
        const node = createBaseExpression<ts.ObjectLiteralExpression>(ts.SyntaxKind.ObjectLiteralExpression);
        node.properties = createNodeArray(properties);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.properties);
        return node;
    }

    // @api
    function updateObjectLiteralExpression(node: ts.ObjectLiteralExpression, properties: readonly ts.ObjectLiteralElementLike[]) {
        return node.properties !== properties
            ? update(createObjectLiteralExpression(properties, node.multiLine), node)
            : node;
    }

    // @api
    function createPropertyAccessExpression(expression: ts.Expression, name: string | ts.Identifier | ts.PrivateIdentifier) {
        const node = createBaseExpression<ts.PropertyAccessExpression>(ts.SyntaxKind.PropertyAccessExpression);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.name = asName(name);
        node.transformFlags =
            propagateChildFlags(node.expression) |
            (ts.isIdentifier(node.name) ?
                propagateIdentifierNameFlags(node.name) :
                propagateChildFlags(node.name) | ts.TransformFlags.ContainsPrivateIdentifierInExpression);
        if (ts.isSuperKeyword(expression)) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            node.transformFlags |=
                ts.TransformFlags.ContainsES2017 |
                ts.TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updatePropertyAccessExpression(node: ts.PropertyAccessExpression, expression: ts.Expression, name: ts.Identifier | ts.PrivateIdentifier) {
        if (ts.isPropertyAccessChain(node)) {
            return updatePropertyAccessChain(node, expression, node.questionDotToken, ts.cast(name, ts.isIdentifier));
        }
        return node.expression !== expression
            || node.name !== name
            ? update(createPropertyAccessExpression(expression, name), node)
            : node;
    }

    // @api
    function createPropertyAccessChain(expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, name: string | ts.Identifier | ts.PrivateIdentifier) {
        const node = createBaseExpression<ts.PropertyAccessChain>(ts.SyntaxKind.PropertyAccessExpression);
        node.flags |= ts.NodeFlags.OptionalChain;
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.questionDotToken = questionDotToken;
        node.name = asName(name);
        node.transformFlags |=
            ts.TransformFlags.ContainsES2020 |
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            (ts.isIdentifier(node.name) ?
                propagateIdentifierNameFlags(node.name) :
                propagateChildFlags(node.name) | ts.TransformFlags.ContainsPrivateIdentifierInExpression);
        return node;
    }

    // @api
    function updatePropertyAccessChain(node: ts.PropertyAccessChain, expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, name: ts.Identifier | ts.PrivateIdentifier) {
        ts.Debug.assert(!!(node.flags & ts.NodeFlags.OptionalChain), "Cannot update a PropertyAccessExpression using updatePropertyAccessChain. Use updatePropertyAccess instead.");
        // Because we are updating an existing PropertyAccessChain we want to inherit its emitFlags
        // instead of using the default from createPropertyAccess
        return node.expression !== expression
            || node.questionDotToken !== questionDotToken
            || node.name !== name
            ? update(createPropertyAccessChain(expression, questionDotToken, name), node)
            : node;
    }

    // @api
    function createElementAccessExpression(expression: ts.Expression, index: number | ts.Expression) {
        const node = createBaseExpression<ts.ElementAccessExpression>(ts.SyntaxKind.ElementAccessExpression);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.argumentExpression = asExpression(index);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.argumentExpression);
        if (ts.isSuperKeyword(expression)) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            node.transformFlags |=
                ts.TransformFlags.ContainsES2017 |
                ts.TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updateElementAccessExpression(node: ts.ElementAccessExpression, expression: ts.Expression, argumentExpression: ts.Expression) {
        if (ts.isElementAccessChain(node)) {
            return updateElementAccessChain(node, expression, node.questionDotToken, argumentExpression);
        }
        return node.expression !== expression
            || node.argumentExpression !== argumentExpression
            ? update(createElementAccessExpression(expression, argumentExpression), node)
            : node;
    }

    // @api
    function createElementAccessChain(expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, index: number | ts.Expression) {
        const node = createBaseExpression<ts.ElementAccessChain>(ts.SyntaxKind.ElementAccessExpression);
        node.flags |= ts.NodeFlags.OptionalChain;
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.questionDotToken = questionDotToken;
        node.argumentExpression = asExpression(index);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            propagateChildFlags(node.argumentExpression) |
            ts.TransformFlags.ContainsES2020;
        return node;
    }

    // @api
    function updateElementAccessChain(node: ts.ElementAccessChain, expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, argumentExpression: ts.Expression) {
        ts.Debug.assert(!!(node.flags & ts.NodeFlags.OptionalChain), "Cannot update a ElementAccessExpression using updateElementAccessChain. Use updateElementAccess instead.");
        // Because we are updating an existing ElementAccessChain we want to inherit its emitFlags
        // instead of using the default from createElementAccess
        return node.expression !== expression
            || node.questionDotToken !== questionDotToken
            || node.argumentExpression !== argumentExpression
            ? update(createElementAccessChain(expression, questionDotToken, argumentExpression), node)
            : node;
    }

    // @api
    function createCallExpression(expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[] | undefined) {
        const node = createBaseExpression<ts.CallExpression>(ts.SyntaxKind.CallExpression);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.typeArguments = asNodeArray(typeArguments);
        node.arguments = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray));
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments);
        if (node.typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        if (ts.isImportKeyword(node.expression)) {
            node.transformFlags |= ts.TransformFlags.ContainsDynamicImport;
        }
        else if (ts.isSuperProperty(node.expression)) {
            node.transformFlags |= ts.TransformFlags.ContainsLexicalThis;
        }
        return node;
    }

    // @api
    function updateCallExpression(node: ts.CallExpression, expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[]) {
        if (ts.isCallChain(node)) {
            return updateCallChain(node, expression, node.questionDotToken, typeArguments, argumentsArray);
        }
        return node.expression !== expression
            || node.typeArguments !== typeArguments
            || node.arguments !== argumentsArray
            ? update(createCallExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createCallChain(expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[] | undefined) {
        const node = createBaseExpression<ts.CallChain>(ts.SyntaxKind.CallExpression);
        node.flags |= ts.NodeFlags.OptionalChain;
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.questionDotToken = questionDotToken;
        node.typeArguments = asNodeArray(typeArguments);
        node.arguments = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray));
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments) |
            ts.TransformFlags.ContainsES2020;
        if (node.typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        if (ts.isSuperProperty(node.expression)) {
            node.transformFlags |= ts.TransformFlags.ContainsLexicalThis;
        }
        return node;
    }

    // @api
    function updateCallChain(node: ts.CallChain, expression: ts.Expression, questionDotToken: ts.QuestionDotToken | undefined, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[]) {
        ts.Debug.assert(!!(node.flags & ts.NodeFlags.OptionalChain), "Cannot update a CallExpression using updateCallChain. Use updateCall instead.");
        return node.expression !== expression
            || node.questionDotToken !== questionDotToken
            || node.typeArguments !== typeArguments
            || node.arguments !== argumentsArray
            ? update(createCallChain(expression, questionDotToken, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createNewExpression(expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[] | undefined) {
        const node = createBaseExpression<ts.NewExpression>(ts.SyntaxKind.NewExpression);
        node.expression = parenthesizerRules().parenthesizeExpressionOfNew(expression);
        node.typeArguments = asNodeArray(typeArguments);
        node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : undefined;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments) |
            ts.TransformFlags.ContainsES2020;
        if (node.typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateNewExpression(node: ts.NewExpression, expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, argumentsArray: readonly ts.Expression[] | undefined) {
        return node.expression !== expression
            || node.typeArguments !== typeArguments
            || node.arguments !== argumentsArray
            ? update(createNewExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createTaggedTemplateExpression(tag: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, template: ts.TemplateLiteral) {
        const node = createBaseExpression<ts.TaggedTemplateExpression>(ts.SyntaxKind.TaggedTemplateExpression);
        node.tag = parenthesizerRules().parenthesizeLeftSideOfAccess(tag, /*optionalChain*/ false);
        node.typeArguments = asNodeArray(typeArguments);
        node.template = template;
        node.transformFlags |=
            propagateChildFlags(node.tag) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.template) |
            ts.TransformFlags.ContainsES2015;
        if (node.typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        if (ts.hasInvalidEscape(node.template)) {
            node.transformFlags |= ts.TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updateTaggedTemplateExpression(node: ts.TaggedTemplateExpression, tag: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined, template: ts.TemplateLiteral) {
        return node.tag !== tag
            || node.typeArguments !== typeArguments
            || node.template !== template
            ? update(createTaggedTemplateExpression(tag, typeArguments, template), node)
            : node;
    }

    // @api
    function createTypeAssertion(type: ts.TypeNode, expression: ts.Expression) {
        const node = createBaseExpression<ts.TypeAssertion>(ts.SyntaxKind.TypeAssertionExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.type = type;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeAssertion(node: ts.TypeAssertion, type: ts.TypeNode, expression: ts.Expression) {
        return node.type !== type
            || node.expression !== expression
            ? update(createTypeAssertion(type, expression), node)
            : node;
    }

    // @api
    function createParenthesizedExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.ParenthesizedExpression>(ts.SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        node.transformFlags = propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateParenthesizedExpression(node: ts.ParenthesizedExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createParenthesizedExpression(expression), node)
            : node;
    }

    // @api
    function createFunctionExpression(
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[] | undefined,
        type: ts.TypeNode | undefined,
        body: ts.Block
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.FunctionExpression>(
            ts.SyntaxKind.FunctionExpression,
            modifiers,
            name,
            typeParameters,
            parameters,
            type,
            body
        );
        node.asteriskToken = asteriskToken;
        node.transformFlags |= propagateChildFlags(node.asteriskToken);
        if (node.typeParameters) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Async) {
            if (node.asteriskToken) {
                node.transformFlags |= ts.TransformFlags.ContainsES2018;
            }
            else {
                node.transformFlags |= ts.TransformFlags.ContainsES2017;
            }
        }
        else if (node.asteriskToken) {
            node.transformFlags |= ts.TransformFlags.ContainsGenerator;
        }
        return node;
    }

    // @api
    function updateFunctionExpression(
        node: ts.FunctionExpression,
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block
    ) {
        return node.name !== name
            || node.modifiers !== modifiers
            || node.asteriskToken !== asteriskToken
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            || node.body !== body
            ? finishUpdateBaseSignatureDeclaration(createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
            : node;
    }

    // @api
    function createArrowFunction(
        modifiers: readonly ts.ModifierLike[] | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        equalsGreaterThanToken: ts.EqualsGreaterThanToken | undefined,
        body: ts.ConciseBody
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.ArrowFunction>(
            ts.SyntaxKind.ArrowFunction,
            modifiers,
            /*name*/ undefined,
            typeParameters,
            parameters,
            type,
            parenthesizerRules().parenthesizeConciseBodyOfArrowFunction(body)
        );
        node.equalsGreaterThanToken = equalsGreaterThanToken ?? createToken(ts.SyntaxKind.EqualsGreaterThanToken);
        node.transformFlags |=
            propagateChildFlags(node.equalsGreaterThanToken) |
            ts.TransformFlags.ContainsES2015;
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Async) {
            node.transformFlags |= ts.TransformFlags.ContainsES2017 | ts.TransformFlags.ContainsLexicalThis;
        }
        return node;
    }

    // @api
    function updateArrowFunction(
        node: ts.ArrowFunction,
        modifiers: readonly ts.ModifierLike[] | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        equalsGreaterThanToken: ts.EqualsGreaterThanToken,
        body: ts.ConciseBody
    ): ts.ArrowFunction {
        return node.modifiers !== modifiers
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            || node.equalsGreaterThanToken !== equalsGreaterThanToken
            || node.body !== body
            ? finishUpdateBaseSignatureDeclaration(createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body), node)
            : node;
    }

    // @api
    function createDeleteExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.DeleteExpression>(ts.SyntaxKind.DeleteExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateDeleteExpression(node: ts.DeleteExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createDeleteExpression(expression), node)
            : node;
    }

    // @api
    function createTypeOfExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.TypeOfExpression>(ts.SyntaxKind.TypeOfExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateTypeOfExpression(node: ts.TypeOfExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createTypeOfExpression(expression), node)
            : node;
    }

    // @api
    function createVoidExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.VoidExpression>(ts.SyntaxKind.VoidExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateVoidExpression(node: ts.VoidExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createVoidExpression(expression), node)
            : node;
    }

    // @api
    function createAwaitExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.AwaitExpression>(ts.SyntaxKind.AwaitExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsES2017 |
            ts.TransformFlags.ContainsES2018 |
            ts.TransformFlags.ContainsAwait;
        return node;
    }

    // @api
    function updateAwaitExpression(node: ts.AwaitExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createAwaitExpression(expression), node)
            : node;
    }

    // @api
    function createPrefixUnaryExpression(operator: ts.PrefixUnaryOperator, operand: ts.Expression) {
        const node = createBaseExpression<ts.PrefixUnaryExpression>(ts.SyntaxKind.PrefixUnaryExpression);
        node.operator = operator;
        node.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if ((operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken) &&
            ts.isIdentifier(node.operand) &&
            !ts.isGeneratedIdentifier(node.operand) &&
            !ts.isLocalName(node.operand)) {
            node.transformFlags |= ts.TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return node;
    }

    // @api
    function updatePrefixUnaryExpression(node: ts.PrefixUnaryExpression, operand: ts.Expression) {
        return node.operand !== operand
            ? update(createPrefixUnaryExpression(node.operator, operand), node)
            : node;
    }

    // @api
    function createPostfixUnaryExpression(operand: ts.Expression, operator: ts.PostfixUnaryOperator) {
        const node = createBaseExpression<ts.PostfixUnaryExpression>(ts.SyntaxKind.PostfixUnaryExpression);
        node.operator = operator;
        node.operand = parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (ts.isIdentifier(node.operand) &&
            !ts.isGeneratedIdentifier(node.operand) &&
            !ts.isLocalName(node.operand)) {
            node.transformFlags |= ts.TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return node;
    }

    // @api
    function updatePostfixUnaryExpression(node: ts.PostfixUnaryExpression, operand: ts.Expression) {
        return node.operand !== operand
            ? update(createPostfixUnaryExpression(operand, node.operator), node)
            : node;
    }

    // @api
    function createBinaryExpression(left: ts.Expression, operator: ts.BinaryOperator | ts.BinaryOperatorToken, right: ts.Expression) {
        const node = createBaseExpression<ts.BinaryExpression>(ts.SyntaxKind.BinaryExpression);
        const operatorToken = asToken(operator);
        const operatorKind = operatorToken.kind;
        node.left = parenthesizerRules().parenthesizeLeftSideOfBinary(operatorKind, left);
        node.operatorToken = operatorToken;
        node.right = parenthesizerRules().parenthesizeRightSideOfBinary(operatorKind, node.left, right);
        node.transformFlags |=
            propagateChildFlags(node.left) |
            propagateChildFlags(node.operatorToken) |
            propagateChildFlags(node.right);
        if (operatorKind === ts.SyntaxKind.QuestionQuestionToken) {
            node.transformFlags |= ts.TransformFlags.ContainsES2020;
        }
        else if (operatorKind === ts.SyntaxKind.EqualsToken) {
            if (ts.isObjectLiteralExpression(node.left)) {
                node.transformFlags |=
                    ts.TransformFlags.ContainsES2015 |
                    ts.TransformFlags.ContainsES2018 |
                    ts.TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(node.left);
            }
            else if (ts.isArrayLiteralExpression(node.left)) {
                node.transformFlags |=
                    ts.TransformFlags.ContainsES2015 |
                    ts.TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(node.left);
            }
        }
        else if (operatorKind === ts.SyntaxKind.AsteriskAsteriskToken || operatorKind === ts.SyntaxKind.AsteriskAsteriskEqualsToken) {
            node.transformFlags |= ts.TransformFlags.ContainsES2016;
        }
        else if (ts.isLogicalOrCoalescingAssignmentOperator(operatorKind)) {
            node.transformFlags |= ts.TransformFlags.ContainsES2021;
        }
        if (operatorKind === ts.SyntaxKind.InKeyword && ts.isPrivateIdentifier(node.left)) {
            node.transformFlags |= ts.TransformFlags.ContainsPrivateIdentifierInExpression;
        }
        return node;
    }

    function propagateAssignmentPatternFlags(node: ts.AssignmentPattern): ts.TransformFlags {
        if (node.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) return ts.TransformFlags.ContainsObjectRestOrSpread;
        if (node.transformFlags & ts.TransformFlags.ContainsES2018) {
            // check for nested spread assignments, otherwise '{ x: { a, ...b } = foo } = c'
            // will not be correctly interpreted by the ES2018 transformer
            for (const element of ts.getElementsOfBindingOrAssignmentPattern(node)) {
                const target = ts.getTargetOfBindingOrAssignmentElement(element);
                if (target && ts.isAssignmentPattern(target)) {
                    if (target.transformFlags & ts.TransformFlags.ContainsObjectRestOrSpread) {
                        return ts.TransformFlags.ContainsObjectRestOrSpread;
                    }
                    if (target.transformFlags & ts.TransformFlags.ContainsES2018) {
                        const flags = propagateAssignmentPatternFlags(target);
                        if (flags) return flags;
                    }
                }
            }
        }
        return ts.TransformFlags.None;
    }

    // @api
    function updateBinaryExpression(node: ts.BinaryExpression, left: ts.Expression, operator: ts.BinaryOperatorToken, right: ts.Expression) {
        return node.left !== left
            || node.operatorToken !== operator
            || node.right !== right
            ? update(createBinaryExpression(left, operator, right), node)
            : node;
    }

    // @api
    function createConditionalExpression(condition: ts.Expression, questionToken: ts.QuestionToken | undefined, whenTrue: ts.Expression, colonToken: ts.ColonToken | undefined, whenFalse: ts.Expression) {
        const node = createBaseExpression<ts.ConditionalExpression>(ts.SyntaxKind.ConditionalExpression);
        node.condition = parenthesizerRules().parenthesizeConditionOfConditionalExpression(condition);
        node.questionToken = questionToken ?? createToken(ts.SyntaxKind.QuestionToken);
        node.whenTrue = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenTrue);
        node.colonToken = colonToken ?? createToken(ts.SyntaxKind.ColonToken);
        node.whenFalse = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenFalse);
        node.transformFlags |=
            propagateChildFlags(node.condition) |
            propagateChildFlags(node.questionToken) |
            propagateChildFlags(node.whenTrue) |
            propagateChildFlags(node.colonToken) |
            propagateChildFlags(node.whenFalse);
        return node;
    }

    // @api
    function updateConditionalExpression(
        node: ts.ConditionalExpression,
        condition: ts.Expression,
        questionToken: ts.Token<ts.SyntaxKind.QuestionToken>,
        whenTrue: ts.Expression,
        colonToken: ts.Token<ts.SyntaxKind.ColonToken>,
        whenFalse: ts.Expression
    ): ts.ConditionalExpression {
        return node.condition !== condition
            || node.questionToken !== questionToken
            || node.whenTrue !== whenTrue
            || node.colonToken !== colonToken
            || node.whenFalse !== whenFalse
            ? update(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node)
            : node;
    }

    // @api
    function createTemplateExpression(head: ts.TemplateHead, templateSpans: readonly ts.TemplateSpan[]) {
        const node = createBaseExpression<ts.TemplateExpression>(ts.SyntaxKind.TemplateExpression);
        node.head = head;
        node.templateSpans = createNodeArray(templateSpans);
        node.transformFlags |=
            propagateChildFlags(node.head) |
            propagateChildrenFlags(node.templateSpans) |
            ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateTemplateExpression(node: ts.TemplateExpression, head: ts.TemplateHead, templateSpans: readonly ts.TemplateSpan[]) {
        return node.head !== head
            || node.templateSpans !== templateSpans
            ? update(createTemplateExpression(head, templateSpans), node)
            : node;
    }

    function createTemplateLiteralLikeNodeChecked(kind: ts.TemplateLiteralToken["kind"], text: string | undefined, rawText: string | undefined, templateFlags = ts.TokenFlags.None) {
        ts.Debug.assert(!(templateFlags & ~ts.TokenFlags.TemplateLiteralLikeFlags), "Unsupported template flags.");
        // NOTE: without the assignment to `undefined`, we don't narrow the initial type of `cooked`.
        // eslint-disable-next-line no-undef-init
        let cooked: string | object | undefined = undefined;
        if (rawText !== undefined && rawText !== text) {
            cooked = getCookedText(kind, rawText);
            if (typeof cooked === "object") {
                return ts.Debug.fail("Invalid raw text");
            }
        }
        if (text === undefined) {
            if (cooked === undefined) {
                return ts.Debug.fail("Arguments 'text' and 'rawText' may not both be undefined.");
            }
            text = cooked;
        }
        else if (cooked !== undefined) {
            ts.Debug.assert(text === cooked, "Expected argument 'text' to be the normalized (i.e. 'cooked') version of argument 'rawText'.");
        }
        return createTemplateLiteralLikeNode(kind, text, rawText, templateFlags);
    }

    // @api
    function createTemplateLiteralLikeNode(kind: ts.TemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: ts.TokenFlags | undefined) {
        const node = createBaseToken<ts.TemplateLiteralLikeNode>(kind);
        node.text = text;
        node.rawText = rawText;
        node.templateFlags = templateFlags! & ts.TokenFlags.TemplateLiteralLikeFlags;
        node.transformFlags |= ts.TransformFlags.ContainsES2015;
        if (node.templateFlags) {
            node.transformFlags |= ts.TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function createTemplateHead(text: string | undefined, rawText?: string, templateFlags?: ts.TokenFlags) {
        return createTemplateLiteralLikeNodeChecked(ts.SyntaxKind.TemplateHead, text, rawText, templateFlags) as ts.TemplateHead;
    }

    // @api
    function createTemplateMiddle(text: string | undefined, rawText?: string, templateFlags?: ts.TokenFlags) {
        return createTemplateLiteralLikeNodeChecked(ts.SyntaxKind.TemplateMiddle, text, rawText, templateFlags) as ts.TemplateMiddle;
    }

    // @api
    function createTemplateTail(text: string | undefined, rawText?: string, templateFlags?: ts.TokenFlags) {
        return createTemplateLiteralLikeNodeChecked(ts.SyntaxKind.TemplateTail, text, rawText, templateFlags) as ts.TemplateTail;
    }

    // @api
    function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string, templateFlags?: ts.TokenFlags) {
        return createTemplateLiteralLikeNodeChecked(ts.SyntaxKind.NoSubstitutionTemplateLiteral, text, rawText, templateFlags) as ts.NoSubstitutionTemplateLiteral;
    }

    // @api
    function createYieldExpression(asteriskToken: ts.AsteriskToken | undefined, expression: ts.Expression | undefined): ts.YieldExpression {
        ts.Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
        const node = createBaseExpression<ts.YieldExpression>(ts.SyntaxKind.YieldExpression);
        node.expression = expression && parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.asteriskToken = asteriskToken;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.asteriskToken) |
            ts.TransformFlags.ContainsES2015 |
            ts.TransformFlags.ContainsES2018 |
            ts.TransformFlags.ContainsYield;
        return node;
    }

    // @api
    function updateYieldExpression(node: ts.YieldExpression, asteriskToken: ts.AsteriskToken | undefined, expression: ts.Expression) {
        return node.expression !== expression
            || node.asteriskToken !== asteriskToken
            ? update(createYieldExpression(asteriskToken, expression), node)
            : node;
    }

    // @api
    function createSpreadElement(expression: ts.Expression) {
        const node = createBaseExpression<ts.SpreadElement>(ts.SyntaxKind.SpreadElement);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsES2015 |
            ts.TransformFlags.ContainsRestOrSpread;
        return node;
    }

    // @api
    function updateSpreadElement(node: ts.SpreadElement, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createSpreadElement(expression), node)
            : node;
    }

    // @api
    function createClassExpression(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.ClassElement[]
    ) {
        const node = createBaseClassLikeDeclaration<ts.ClassExpression>(
            ts.SyntaxKind.ClassExpression,
            modifiers,
            name,
            typeParameters,
            heritageClauses,
            members
        );
        node.transformFlags |= ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateClassExpression(
        node: ts.ClassExpression,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.ClassElement[]
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.typeParameters !== typeParameters
            || node.heritageClauses !== heritageClauses
            || node.members !== members
            ? update(createClassExpression(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createOmittedExpression() {
        return createBaseExpression<ts.OmittedExpression>(ts.SyntaxKind.OmittedExpression);
    }

    // @api
    function createExpressionWithTypeArguments(expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined) {
        const node = createBaseNode<ts.ExpressionWithTypeArguments>(ts.SyntaxKind.ExpressionWithTypeArguments);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) |
            ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateExpressionWithTypeArguments(node: ts.ExpressionWithTypeArguments, expression: ts.Expression, typeArguments: readonly ts.TypeNode[] | undefined) {
        return node.expression !== expression
            || node.typeArguments !== typeArguments
            ? update(createExpressionWithTypeArguments(expression, typeArguments), node)
            : node;
    }

    // @api
    function createAsExpression(expression: ts.Expression, type: ts.TypeNode) {
        const node = createBaseExpression<ts.AsExpression>(ts.SyntaxKind.AsExpression);
        node.expression = expression;
        node.type = type;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateAsExpression(node: ts.AsExpression, expression: ts.Expression, type: ts.TypeNode) {
        return node.expression !== expression
            || node.type !== type
            ? update(createAsExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullExpression(expression: ts.Expression) {
        const node = createBaseExpression<ts.NonNullExpression>(ts.SyntaxKind.NonNullExpression);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateNonNullExpression(node: ts.NonNullExpression, expression: ts.Expression) {
        if (ts.isNonNullChain(node)) {
            return updateNonNullChain(node, expression);
        }
        return node.expression !== expression
            ? update(createNonNullExpression(expression), node)
            : node;
    }

    // @api
    function createSatisfiesExpression(expression: ts.Expression, type: ts.TypeNode) {
        const node = createBaseExpression<ts.SatisfiesExpression>(ts.SyntaxKind.SatisfiesExpression);
        node.expression = expression;
        node.type = type;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateSatisfiesExpression(node: ts.SatisfiesExpression, expression: ts.Expression, type: ts.TypeNode) {
        return node.expression !== expression
            || node.type !== type
            ? update(createSatisfiesExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullChain(expression: ts.Expression) {
        const node = createBaseExpression<ts.NonNullChain>(ts.SyntaxKind.NonNullExpression);
        node.flags |= ts.NodeFlags.OptionalChain;
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateNonNullChain(node: ts.NonNullChain, expression: ts.Expression) {
        ts.Debug.assert(!!(node.flags & ts.NodeFlags.OptionalChain), "Cannot update a NonNullExpression using updateNonNullChain. Use updateNonNullExpression instead.");
        return node.expression !== expression
            ? update(createNonNullChain(expression), node)
            : node;
    }

    // @api
    function createMetaProperty(keywordToken: ts.MetaProperty["keywordToken"], name: ts.Identifier) {
        const node = createBaseExpression<ts.MetaProperty>(ts.SyntaxKind.MetaProperty);
        node.keywordToken = keywordToken;
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.name);
        switch (keywordToken) {
            case ts.SyntaxKind.NewKeyword:
                node.transformFlags |= ts.TransformFlags.ContainsES2015;
                break;
            case ts.SyntaxKind.ImportKeyword:
                node.transformFlags |= ts.TransformFlags.ContainsESNext;
                break;
            default:
                return ts.Debug.assertNever(keywordToken);
        }
        return node;
    }

    // @api
    function updateMetaProperty(node: ts.MetaProperty, name: ts.Identifier) {
        return node.name !== name
            ? update(createMetaProperty(node.keywordToken, name), node)
            : node;
    }

    //
    // Misc
    //

    // @api
    function createTemplateSpan(expression: ts.Expression, literal: ts.TemplateMiddle | ts.TemplateTail) {
        const node = createBaseNode<ts.TemplateSpan>(ts.SyntaxKind.TemplateSpan);
        node.expression = expression;
        node.literal = literal;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.literal) |
            ts.TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateTemplateSpan(node: ts.TemplateSpan, expression: ts.Expression, literal: ts.TemplateMiddle | ts.TemplateTail) {
        return node.expression !== expression
            || node.literal !== literal
            ? update(createTemplateSpan(expression, literal), node)
            : node;
    }

    // @api
    function createSemicolonClassElement() {
        const node = createBaseNode<ts.SemicolonClassElement>(ts.SyntaxKind.SemicolonClassElement);
        node.transformFlags |= ts.TransformFlags.ContainsES2015;
        return node;
    }

    //
    // Element
    //

    // @api
    function createBlock(statements: readonly ts.Statement[], multiLine?: boolean): ts.Block {
        const node = createBaseNode<ts.Block>(ts.SyntaxKind.Block);
        node.statements = createNodeArray(statements);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function updateBlock(node: ts.Block, statements: readonly ts.Statement[]) {
        return node.statements !== statements
            ? update(createBlock(statements, node.multiLine), node)
            : node;
    }

    // @api
    function createVariableStatement(modifiers: readonly ts.Modifier[] | undefined, declarationList: ts.VariableDeclarationList | readonly ts.VariableDeclaration[]) {
        const node = createBaseDeclaration<ts.VariableStatement>(ts.SyntaxKind.VariableStatement);
        node.modifiers = asNodeArray(modifiers);
        node.declarationList = ts.isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
        node.transformFlags |=
            propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.declarationList);
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Ambient) {
            node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateVariableStatement(node: ts.VariableStatement, modifiers: readonly ts.Modifier[] | undefined, declarationList: ts.VariableDeclarationList) {
        return node.modifiers !== modifiers
            || node.declarationList !== declarationList
            ? update(createVariableStatement(modifiers, declarationList), node)
            : node;
    }

    // @api
    function createEmptyStatement() {
        return createBaseNode<ts.EmptyStatement>(ts.SyntaxKind.EmptyStatement);
    }

    // @api
    function createExpressionStatement(expression: ts.Expression): ts.ExpressionStatement {
        const node = createBaseNode<ts.ExpressionStatement>(ts.SyntaxKind.ExpressionStatement);
        node.expression = parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateExpressionStatement(node: ts.ExpressionStatement, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createExpressionStatement(expression), node)
            : node;
    }

    // @api
    function createIfStatement(expression: ts.Expression, thenStatement: ts.Statement, elseStatement?: ts.Statement) {
        const node = createBaseNode<ts.IfStatement>(ts.SyntaxKind.IfStatement);
        node.expression = expression;
        node.thenStatement = asEmbeddedStatement(thenStatement);
        node.elseStatement = asEmbeddedStatement(elseStatement);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.thenStatement) |
            propagateChildFlags(node.elseStatement);
        return node;
    }

    // @api
    function updateIfStatement(node: ts.IfStatement, expression: ts.Expression, thenStatement: ts.Statement, elseStatement: ts.Statement | undefined) {
        return node.expression !== expression
            || node.thenStatement !== thenStatement
            || node.elseStatement !== elseStatement
            ? update(createIfStatement(expression, thenStatement, elseStatement), node)
            : node;
    }

    // @api
    function createDoStatement(statement: ts.Statement, expression: ts.Expression) {
        const node = createBaseNode<ts.DoStatement>(ts.SyntaxKind.DoStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        node.transformFlags |=
            propagateChildFlags(node.statement) |
            propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateDoStatement(node: ts.DoStatement, statement: ts.Statement, expression: ts.Expression) {
        return node.statement !== statement
            || node.expression !== expression
            ? update(createDoStatement(statement, expression), node)
            : node;
    }

    // @api
    function createWhileStatement(expression: ts.Expression, statement: ts.Statement) {
        const node = createBaseNode<ts.WhileStatement>(ts.SyntaxKind.WhileStatement);
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);
        return node;
    }

    // @api
    function updateWhileStatement(node: ts.WhileStatement, expression: ts.Expression, statement: ts.Statement) {
        return node.expression !== expression
            || node.statement !== statement
            ? update(createWhileStatement(expression, statement), node)
            : node;
    }

    // @api
    function createForStatement(initializer: ts.ForInitializer | undefined, condition: ts.Expression | undefined, incrementor: ts.Expression | undefined, statement: ts.Statement) {
        const node = createBaseNode<ts.ForStatement>(ts.SyntaxKind.ForStatement);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = incrementor;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.initializer) |
            propagateChildFlags(node.condition) |
            propagateChildFlags(node.incrementor) |
            propagateChildFlags(node.statement);
        return node;
    }

    // @api
    function updateForStatement(node: ts.ForStatement, initializer: ts.ForInitializer | undefined, condition: ts.Expression | undefined, incrementor: ts.Expression | undefined, statement: ts.Statement) {
        return node.initializer !== initializer
            || node.condition !== condition
            || node.incrementor !== incrementor
            || node.statement !== statement
            ? update(createForStatement(initializer, condition, incrementor, statement), node)
            : node;
    }

    // @api
    function createForInStatement(initializer: ts.ForInitializer, expression: ts.Expression, statement: ts.Statement) {
        const node = createBaseNode<ts.ForInStatement>(ts.SyntaxKind.ForInStatement);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.initializer) |
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);
        return node;
    }

    // @api
    function updateForInStatement(node: ts.ForInStatement, initializer: ts.ForInitializer, expression: ts.Expression, statement: ts.Statement) {
        return node.initializer !== initializer
            || node.expression !== expression
            || node.statement !== statement
            ? update(createForInStatement(initializer, expression, statement), node)
            : node;
    }

    // @api
    function createForOfStatement(awaitModifier: ts.AwaitKeyword | undefined, initializer: ts.ForInitializer, expression: ts.Expression, statement: ts.Statement) {
        const node = createBaseNode<ts.ForOfStatement>(ts.SyntaxKind.ForOfStatement);
        node.awaitModifier = awaitModifier;
        node.initializer = initializer;
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.awaitModifier) |
            propagateChildFlags(node.initializer) |
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement) |
            ts.TransformFlags.ContainsES2015;
        if (awaitModifier) node.transformFlags |= ts.TransformFlags.ContainsES2018;
        return node;
    }

    // @api
    function updateForOfStatement(node: ts.ForOfStatement, awaitModifier: ts.AwaitKeyword | undefined, initializer: ts.ForInitializer, expression: ts.Expression, statement: ts.Statement) {
        return node.awaitModifier !== awaitModifier
            || node.initializer !== initializer
            || node.expression !== expression
            || node.statement !== statement
            ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node)
            : node;
    }

    // @api
    function createContinueStatement(label?: string | ts.Identifier): ts.ContinueStatement {
        const node = createBaseNode<ts.ContinueStatement>(ts.SyntaxKind.ContinueStatement);
        node.label = asName(label);
        node.transformFlags |=
            propagateChildFlags(node.label) |
            ts.TransformFlags.ContainsHoistedDeclarationOrCompletion;
        return node;
    }

    // @api
    function updateContinueStatement(node: ts.ContinueStatement, label: ts.Identifier | undefined) {
        return node.label !== label
            ? update(createContinueStatement(label), node)
            : node;
    }

    // @api
    function createBreakStatement(label?: string | ts.Identifier): ts.BreakStatement {
        const node = createBaseNode<ts.BreakStatement>(ts.SyntaxKind.BreakStatement);
        node.label = asName(label);
        node.transformFlags |=
            propagateChildFlags(node.label) |
            ts.TransformFlags.ContainsHoistedDeclarationOrCompletion;
        return node;
    }

    // @api
    function updateBreakStatement(node: ts.BreakStatement, label: ts.Identifier | undefined) {
        return node.label !== label
            ? update(createBreakStatement(label), node)
            : node;
    }

    // @api
    function createReturnStatement(expression?: ts.Expression): ts.ReturnStatement {
        const node = createBaseNode<ts.ReturnStatement>(ts.SyntaxKind.ReturnStatement);
        node.expression = expression;
        // return in an ES2018 async generator must be awaited
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsES2018 |
            ts.TransformFlags.ContainsHoistedDeclarationOrCompletion;
        return node;
    }

    // @api
    function updateReturnStatement(node: ts.ReturnStatement, expression: ts.Expression | undefined) {
        return node.expression !== expression
            ? update(createReturnStatement(expression), node)
            : node;
    }

    // @api
    function createWithStatement(expression: ts.Expression, statement: ts.Statement) {
        const node = createBaseNode<ts.WithStatement>(ts.SyntaxKind.WithStatement);
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);
        return node;
    }

    // @api
    function updateWithStatement(node: ts.WithStatement, expression: ts.Expression, statement: ts.Statement) {
        return node.expression !== expression
            || node.statement !== statement
            ? update(createWithStatement(expression, statement), node)
            : node;
    }

    // @api
    function createSwitchStatement(expression: ts.Expression, caseBlock: ts.CaseBlock): ts.SwitchStatement {
        const node = createBaseNode<ts.SwitchStatement>(ts.SyntaxKind.SwitchStatement);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.caseBlock = caseBlock;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.caseBlock);
        return node;
    }

    // @api
    function updateSwitchStatement(node: ts.SwitchStatement, expression: ts.Expression, caseBlock: ts.CaseBlock) {
        return node.expression !== expression
            || node.caseBlock !== caseBlock
            ? update(createSwitchStatement(expression, caseBlock), node)
            : node;
    }

    // @api
    function createLabeledStatement(label: string | ts.Identifier, statement: ts.Statement) {
        const node = createBaseNode<ts.LabeledStatement>(ts.SyntaxKind.LabeledStatement);
        node.label = asName(label);
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |=
            propagateChildFlags(node.label) |
            propagateChildFlags(node.statement);
        return node;
    }

    // @api
    function updateLabeledStatement(node: ts.LabeledStatement, label: ts.Identifier, statement: ts.Statement) {
        return node.label !== label
            || node.statement !== statement
            ? update(createLabeledStatement(label, statement), node)
            : node;
    }

    // @api
    function createThrowStatement(expression: ts.Expression) {
        const node = createBaseNode<ts.ThrowStatement>(ts.SyntaxKind.ThrowStatement);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateThrowStatement(node: ts.ThrowStatement, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createThrowStatement(expression), node)
            : node;
    }

    // @api
    function createTryStatement(tryBlock: ts.Block, catchClause: ts.CatchClause | undefined, finallyBlock: ts.Block | undefined) {
        const node = createBaseNode<ts.TryStatement>(ts.SyntaxKind.TryStatement);
        node.tryBlock = tryBlock;
        node.catchClause = catchClause;
        node.finallyBlock = finallyBlock;
        node.transformFlags |=
            propagateChildFlags(node.tryBlock) |
            propagateChildFlags(node.catchClause) |
            propagateChildFlags(node.finallyBlock);
        return node;
    }

    // @api
    function updateTryStatement(node: ts.TryStatement, tryBlock: ts.Block, catchClause: ts.CatchClause | undefined, finallyBlock: ts.Block | undefined) {
        return node.tryBlock !== tryBlock
            || node.catchClause !== catchClause
            || node.finallyBlock !== finallyBlock
            ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node)
            : node;
    }

    // @api
    function createDebuggerStatement() {
        return createBaseNode<ts.DebuggerStatement>(ts.SyntaxKind.DebuggerStatement);
    }

    // @api
    function createVariableDeclaration(name: string | ts.BindingName, exclamationToken: ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined) {
        const node = createBaseVariableLikeDeclaration<ts.VariableDeclaration>(
            ts.SyntaxKind.VariableDeclaration,
            /*modifiers*/ undefined,
            name,
            type,
            initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer)
        );
        node.exclamationToken = exclamationToken;
        node.transformFlags |= propagateChildFlags(node.exclamationToken);
        if (exclamationToken) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateVariableDeclaration(node: ts.VariableDeclaration, name: ts.BindingName, exclamationToken: ts.ExclamationToken | undefined, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined) {
        return node.name !== name
            || node.type !== type
            || node.exclamationToken !== exclamationToken
            || node.initializer !== initializer
            ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createVariableDeclarationList(declarations: readonly ts.VariableDeclaration[], flags = ts.NodeFlags.None) {
        const node = createBaseNode<ts.VariableDeclarationList>(ts.SyntaxKind.VariableDeclarationList);
        node.flags |= flags & ts.NodeFlags.BlockScoped;
        node.declarations = createNodeArray(declarations);
        node.transformFlags |=
            propagateChildrenFlags(node.declarations) |
            ts.TransformFlags.ContainsHoistedDeclarationOrCompletion;
        if (flags & ts.NodeFlags.BlockScoped) {
            node.transformFlags |=
                ts.TransformFlags.ContainsES2015 |
                ts.TransformFlags.ContainsBlockScopedBinding;
        }
        return node;
    }

    // @api
    function updateVariableDeclarationList(node: ts.VariableDeclarationList, declarations: readonly ts.VariableDeclaration[]) {
        return node.declarations !== declarations
            ? update(createVariableDeclarationList(declarations, node.flags), node)
            : node;
    }

    // @api
    function createFunctionDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        const node = createBaseFunctionLikeDeclaration<ts.FunctionDeclaration>(
            ts.SyntaxKind.FunctionDeclaration,
            modifiers,
            name,
            typeParameters,
            parameters,
            type,
            body
        );
        node.asteriskToken = asteriskToken;
        if (!node.body || ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Ambient) {
            node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |=
                propagateChildFlags(node.asteriskToken) |
                ts.TransformFlags.ContainsHoistedDeclarationOrCompletion;
            if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Async) {
                if (node.asteriskToken) {
                    node.transformFlags |= ts.TransformFlags.ContainsES2018;
                }
                else {
                    node.transformFlags |= ts.TransformFlags.ContainsES2017;
                }
            }
            else if (node.asteriskToken) {
                node.transformFlags |= ts.TransformFlags.ContainsGenerator;
            }
        }

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateFunctionDeclaration(
        node: ts.FunctionDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        parameters: readonly ts.ParameterDeclaration[],
        type: ts.TypeNode | undefined,
        body: ts.Block | undefined
    ) {
        return node.modifiers !== modifiers
            || node.asteriskToken !== asteriskToken
            || node.name !== name
            || node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            || node.body !== body
            ? finishUpdateFunctionDeclaration(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
            : node;
    }

    function finishUpdateFunctionDeclaration(updated: ts.Mutable<ts.FunctionDeclaration>, original: ts.FunctionDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.illegalDecorators = original.illegalDecorators;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createClassDeclaration(
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: string | ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.ClassElement[]
    ) {
        const node = createBaseClassLikeDeclaration<ts.ClassDeclaration>(
            ts.SyntaxKind.ClassDeclaration,
            modifiers,
            name,
            typeParameters,
            heritageClauses,
            members
        );
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Ambient) {
            node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |= ts.TransformFlags.ContainsES2015;
            if (node.transformFlags & ts.TransformFlags.ContainsTypeScriptClassSyntax) {
                node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
            }
        }
        return node;
    }

    // @api
    function updateClassDeclaration(
        node: ts.ClassDeclaration,
        modifiers: readonly ts.ModifierLike[] | undefined,
        name: ts.Identifier | undefined,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.ClassElement[]
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.typeParameters !== typeParameters
            || node.heritageClauses !== heritageClauses
            || node.members !== members
            ? update(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createInterfaceDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        name: string | ts.Identifier,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.TypeElement[]
    ) {
        const node = createBaseInterfaceOrClassLikeDeclaration<ts.InterfaceDeclaration>(
            ts.SyntaxKind.InterfaceDeclaration,
            modifiers,
            name,
            typeParameters,
            heritageClauses
        );
        node.members = createNodeArray(members);
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateInterfaceDeclaration(
        node: ts.InterfaceDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        name: ts.Identifier,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly ts.HeritageClause[] | undefined,
        members: readonly ts.TypeElement[]
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.typeParameters !== typeParameters
            || node.heritageClauses !== heritageClauses
            || node.members !== members
            ? finishUpdateInterfaceDeclaration(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    function finishUpdateInterfaceDeclaration(updated: ts.Mutable<ts.InterfaceDeclaration>, original: ts.InterfaceDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createTypeAliasDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        name: string | ts.Identifier,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        type: ts.TypeNode
    ) {
        const node = createBaseGenericNamedDeclaration<ts.TypeAliasDeclaration>(
            ts.SyntaxKind.TypeAliasDeclaration,
            modifiers,
            name,
            typeParameters
        );
        node.type = type;
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateTypeAliasDeclaration(
        node: ts.TypeAliasDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        name: ts.Identifier,
        typeParameters: readonly ts.TypeParameterDeclaration[] | undefined,
        type: ts.TypeNode
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.typeParameters !== typeParameters
            || node.type !== type
            ? finishUpdateTypeAliasDeclaration(createTypeAliasDeclaration(modifiers, name, typeParameters, type), node)
            : node;
    }

    function finishUpdateTypeAliasDeclaration(updated: ts.Mutable<ts.TypeAliasDeclaration>, original: ts.TypeAliasDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createEnumDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        name: string | ts.Identifier,
        members: readonly ts.EnumMember[]
    ) {
        const node = createBaseNamedDeclaration<ts.EnumDeclaration>(
            ts.SyntaxKind.EnumDeclaration,
            modifiers,
            name
        );
        node.members = createNodeArray(members);
        node.transformFlags |=
            propagateChildrenFlags(node.members) |
            ts.TransformFlags.ContainsTypeScript;
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // Enum declarations cannot contain `await`

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateEnumDeclaration(
        node: ts.EnumDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        name: ts.Identifier,
        members: readonly ts.EnumMember[]) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.members !== members
            ? finishUpdateEnumDeclaration(createEnumDeclaration(modifiers, name, members), node)
            : node;
    }

    function finishUpdateEnumDeclaration(updated: ts.Mutable<ts.EnumDeclaration>, original: ts.EnumDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createModuleDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        name: ts.ModuleName,
        body: ts.ModuleBody | undefined,
        flags = ts.NodeFlags.None
    ) {
        const node = createBaseDeclaration<ts.ModuleDeclaration>(ts.SyntaxKind.ModuleDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.flags |= flags & (ts.NodeFlags.Namespace | ts.NodeFlags.NestedNamespace | ts.NodeFlags.GlobalAugmentation);
        node.name = name;
        node.body = body;
        if (ts.modifiersToFlags(node.modifiers) & ts.ModifierFlags.Ambient) {
            node.transformFlags = ts.TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |=
                propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.name) |
                propagateChildFlags(node.body) |
                ts.TransformFlags.ContainsTypeScript;
        }
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // Module declarations cannot contain `await`.

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateModuleDeclaration(
        node: ts.ModuleDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        name: ts.ModuleName,
        body: ts.ModuleBody | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.body !== body
            ? finishUpdateModuleDeclaration(createModuleDeclaration(modifiers, name, body, node.flags), node)
            : node;
    }

    function finishUpdateModuleDeclaration(updated: ts.Mutable<ts.ModuleDeclaration>, original: ts.ModuleDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createModuleBlock(statements: readonly ts.Statement[]) {
        const node = createBaseNode<ts.ModuleBlock>(ts.SyntaxKind.ModuleBlock);
        node.statements = createNodeArray(statements);
        node.transformFlags |= propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function updateModuleBlock(node: ts.ModuleBlock, statements: readonly ts.Statement[]) {
        return node.statements !== statements
            ? update(createModuleBlock(statements), node)
            : node;
    }

    // @api
    function createCaseBlock(clauses: readonly ts.CaseOrDefaultClause[]): ts.CaseBlock {
        const node = createBaseNode<ts.CaseBlock>(ts.SyntaxKind.CaseBlock);
        node.clauses = createNodeArray(clauses);
        node.transformFlags |= propagateChildrenFlags(node.clauses);
        return node;
    }

    // @api
    function updateCaseBlock(node: ts.CaseBlock, clauses: readonly ts.CaseOrDefaultClause[]) {
        return node.clauses !== clauses
            ? update(createCaseBlock(clauses), node)
            : node;
    }

    // @api
    function createNamespaceExportDeclaration(name: string | ts.Identifier) {
        const node = createBaseNamedDeclaration<ts.NamespaceExportDeclaration>(
            ts.SyntaxKind.NamespaceExportDeclaration,
            /*modifiers*/ undefined,
            name
        );
        node.transformFlags = ts.TransformFlags.ContainsTypeScript;

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        node.modifiers = undefined;
        return node;
    }

    // @api
    function updateNamespaceExportDeclaration(node: ts.NamespaceExportDeclaration, name: ts.Identifier) {
        return node.name !== name
            ? finishUpdateNamespaceExportDeclaration(createNamespaceExportDeclaration(name), node)
            : node;
    }

    function finishUpdateNamespaceExportDeclaration(updated: ts.Mutable<ts.NamespaceExportDeclaration>, original: ts.NamespaceExportDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
            updated.modifiers = original.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createImportEqualsDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        isTypeOnly: boolean,
        name: string | ts.Identifier,
        moduleReference: ts.ModuleReference
    ) {
        const node = createBaseNamedDeclaration<ts.ImportEqualsDeclaration>(
            ts.SyntaxKind.ImportEqualsDeclaration,
            modifiers,
            name
        );
        node.isTypeOnly = isTypeOnly;
        node.moduleReference = moduleReference;
        node.transformFlags |= propagateChildFlags(node.moduleReference);
        if (!ts.isExternalModuleReference(node.moduleReference)) node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // Import= declaration is always parsed in an Await context

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateImportEqualsDeclaration(
        node: ts.ImportEqualsDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        isTypeOnly: boolean,
        name: ts.Identifier,
        moduleReference: ts.ModuleReference
    ) {
        return node.modifiers !== modifiers
            || node.isTypeOnly !== isTypeOnly
            || node.name !== name
            || node.moduleReference !== moduleReference
            ? finishUpdateImportEqualsDeclaration(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node)
            : node;
    }

    function finishUpdateImportEqualsDeclaration(updated: ts.Mutable<ts.ImportEqualsDeclaration>, original: ts.ImportEqualsDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createImportDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        importClause: ts.ImportClause | undefined,
        moduleSpecifier: ts.Expression,
        assertClause: ts.AssertClause | undefined
    ): ts.ImportDeclaration {
        const node = createBaseDeclaration<ts.ImportDeclaration>(ts.SyntaxKind.ImportDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.importClause = importClause;
        node.moduleSpecifier = moduleSpecifier;
        node.assertClause = assertClause;
        node.transformFlags |=
            propagateChildFlags(node.importClause) |
            propagateChildFlags(node.moduleSpecifier);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateImportDeclaration(
        node: ts.ImportDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        importClause: ts.ImportClause | undefined,
        moduleSpecifier: ts.Expression,
        assertClause: ts.AssertClause | undefined
    ) {
        return node.modifiers !== modifiers
            || node.importClause !== importClause
            || node.moduleSpecifier !== moduleSpecifier
            || node.assertClause !== assertClause
            ? finishUpdateImportDeclaration(createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause), node)
            : node;
    }

    function finishUpdateImportDeclaration(updated: ts.Mutable<ts.ImportDeclaration>, original: ts.ImportDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createImportClause(isTypeOnly: boolean, name: ts.Identifier | undefined, namedBindings: ts.NamedImportBindings | undefined): ts.ImportClause {
        const node = createBaseNode<ts.ImportClause>(ts.SyntaxKind.ImportClause);
        node.isTypeOnly = isTypeOnly;
        node.name = name;
        node.namedBindings = namedBindings;
        node.transformFlags |=
            propagateChildFlags(node.name) |
            propagateChildFlags(node.namedBindings);
        if (isTypeOnly) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateImportClause(node: ts.ImportClause, isTypeOnly: boolean, name: ts.Identifier | undefined, namedBindings: ts.NamedImportBindings | undefined) {
        return node.isTypeOnly !== isTypeOnly
            || node.name !== name
            || node.namedBindings !== namedBindings
            ? update(createImportClause(isTypeOnly, name, namedBindings), node)
            : node;
    }

    // @api
    function createAssertClause(elements: readonly ts.AssertEntry[], multiLine?: boolean): ts.AssertClause {
        const node = createBaseNode<ts.AssertClause>(ts.SyntaxKind.AssertClause);
        node.elements = createNodeArray(elements);
        node.multiLine = multiLine;
        node.transformFlags |= ts.TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateAssertClause(node: ts.AssertClause, elements: readonly ts.AssertEntry[], multiLine?: boolean): ts.AssertClause {
        return node.elements !== elements
            || node.multiLine !== multiLine
            ? update(createAssertClause(elements, multiLine), node)
            : node;
    }

    // @api
    function createAssertEntry(name: ts.AssertionKey, value: ts.Expression): ts.AssertEntry {
        const node = createBaseNode<ts.AssertEntry>(ts.SyntaxKind.AssertEntry);
        node.name = name;
        node.value = value;
        node.transformFlags |= ts.TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateAssertEntry(node: ts.AssertEntry, name: ts.AssertionKey, value: ts.Expression): ts.AssertEntry {
        return node.name !== name
            || node.value !== value
            ? update(createAssertEntry(name, value), node)
            : node;
    }

    // @api
    function createImportTypeAssertionContainer(clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
        const node = createBaseNode<ts.ImportTypeAssertionContainer>(ts.SyntaxKind.ImportTypeAssertionContainer);
        node.assertClause = clause;
        node.multiLine = multiLine;
        return node;
    }

    // @api
    function updateImportTypeAssertionContainer(node: ts.ImportTypeAssertionContainer, clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
        return node.assertClause !== clause
            || node.multiLine !== multiLine
            ? update(createImportTypeAssertionContainer(clause, multiLine), node)
            : node;
    }

    // @api
    function createNamespaceImport(name: ts.Identifier): ts.NamespaceImport {
        const node = createBaseNode<ts.NamespaceImport>(ts.SyntaxKind.NamespaceImport);
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.name);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamespaceImport(node: ts.NamespaceImport, name: ts.Identifier) {
        return node.name !== name
            ? update(createNamespaceImport(name), node)
            : node;
    }

    // @api
    function createNamespaceExport(name: ts.Identifier): ts.NamespaceExport {
        const node = createBaseNode<ts.NamespaceExport>(ts.SyntaxKind.NamespaceExport);
        node.name = name;
        node.transformFlags |=
            propagateChildFlags(node.name) |
            ts.TransformFlags.ContainsESNext;
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamespaceExport(node: ts.NamespaceExport, name: ts.Identifier) {
        return node.name !== name
            ? update(createNamespaceExport(name), node)
            : node;
    }

    // @api
    function createNamedImports(elements: readonly ts.ImportSpecifier[]): ts.NamedImports {
        const node = createBaseNode<ts.NamedImports>(ts.SyntaxKind.NamedImports);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamedImports(node: ts.NamedImports, elements: readonly ts.ImportSpecifier[]) {
        return node.elements !== elements
            ? update(createNamedImports(elements), node)
            : node;
    }

    // @api
    function createImportSpecifier(isTypeOnly: boolean, propertyName: ts.Identifier | undefined, name: ts.Identifier) {
        const node = createBaseNode<ts.ImportSpecifier>(ts.SyntaxKind.ImportSpecifier);
        node.isTypeOnly = isTypeOnly;
        node.propertyName = propertyName;
        node.name = name;
        node.transformFlags |=
            propagateChildFlags(node.propertyName) |
            propagateChildFlags(node.name);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateImportSpecifier(node: ts.ImportSpecifier, isTypeOnly: boolean, propertyName: ts.Identifier | undefined, name: ts.Identifier) {
        return node.isTypeOnly !== isTypeOnly
            || node.propertyName !== propertyName
            || node.name !== name
            ? update(createImportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createExportAssignment(
        modifiers: readonly ts.Modifier[] | undefined,
        isExportEquals: boolean | undefined,
        expression: ts.Expression
    ) {
        const node = createBaseDeclaration<ts.ExportAssignment>(ts.SyntaxKind.ExportAssignment);
        node.modifiers = asNodeArray(modifiers);
        node.isExportEquals = isExportEquals;
        node.expression = isExportEquals
            ? parenthesizerRules().parenthesizeRightSideOfBinary(ts.SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
            : parenthesizerRules().parenthesizeExpressionOfExportDefault(expression);
        node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.expression);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateExportAssignment(
        node: ts.ExportAssignment,
        modifiers: readonly ts.Modifier[] | undefined,
        expression: ts.Expression
    ) {
        return node.modifiers !== modifiers
            || node.expression !== expression
            ? finishUpdateExportAssignment(createExportAssignment(modifiers, node.isExportEquals, expression), node)
            : node;
    }

    function finishUpdateExportAssignment(updated: ts.Mutable<ts.ExportAssignment>, original: ts.ExportAssignment) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createExportDeclaration(
        modifiers: readonly ts.Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: ts.NamedExportBindings | undefined,
        moduleSpecifier?: ts.Expression,
        assertClause?: ts.AssertClause
    ) {
        const node = createBaseDeclaration<ts.ExportDeclaration>(ts.SyntaxKind.ExportDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.isTypeOnly = isTypeOnly;
        node.exportClause = exportClause;
        node.moduleSpecifier = moduleSpecifier;
        node.assertClause = assertClause;
        node.transformFlags |=
            propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.exportClause) |
            propagateChildFlags(node.moduleSpecifier);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        return node;
    }

    // @api
    function updateExportDeclaration(
        node: ts.ExportDeclaration,
        modifiers: readonly ts.Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: ts.NamedExportBindings | undefined,
        moduleSpecifier: ts.Expression | undefined,
        assertClause: ts.AssertClause | undefined
    ) {
        return node.modifiers !== modifiers
            || node.isTypeOnly !== isTypeOnly
            || node.exportClause !== exportClause
            || node.moduleSpecifier !== moduleSpecifier
            || node.assertClause !== assertClause
            ? finishUpdateExportDeclaration(createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause), node)
            : node;
    }

    function finishUpdateExportDeclaration(updated: ts.Mutable<ts.ExportDeclaration>, original: ts.ExportDeclaration) {
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
        }
        return update(updated, original);
    }

    // @api
    function createNamedExports(elements: readonly ts.ExportSpecifier[]) {
        const node = createBaseNode<ts.NamedExports>(ts.SyntaxKind.NamedExports);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamedExports(node: ts.NamedExports, elements: readonly ts.ExportSpecifier[]) {
        return node.elements !== elements
            ? update(createNamedExports(elements), node)
            : node;
    }

    // @api
    function createExportSpecifier(isTypeOnly: boolean, propertyName: string | ts.Identifier | undefined, name: string | ts.Identifier) {
        const node = createBaseNode<ts.ExportSpecifier>(ts.SyntaxKind.ExportSpecifier);
        node.isTypeOnly = isTypeOnly;
        node.propertyName = asName(propertyName);
        node.name = asName(name);
        node.transformFlags |=
            propagateChildFlags(node.propertyName) |
            propagateChildFlags(node.name);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateExportSpecifier(node: ts.ExportSpecifier, isTypeOnly: boolean, propertyName: ts.Identifier | undefined, name: ts.Identifier) {
        return node.isTypeOnly !== isTypeOnly
            || node.propertyName !== propertyName
            || node.name !== name
            ? update(createExportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createMissingDeclaration(): ts.MissingDeclaration {
        const node = createBaseDeclaration<ts.MissingDeclaration>(ts.SyntaxKind.MissingDeclaration);
        return node;
    }

    //
    // Module references
    //

    // @api
    function createExternalModuleReference(expression: ts.Expression) {
        const node = createBaseNode<ts.ExternalModuleReference>(ts.SyntaxKind.ExternalModuleReference);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.expression);
        node.transformFlags &= ~ts.TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateExternalModuleReference(node: ts.ExternalModuleReference, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createExternalModuleReference(expression), node)
            : node;
    }

    //
    // JSDoc
    //

    // @api
    // createJSDocAllType
    // createJSDocUnknownType
    function createJSDocPrimaryTypeWorker<T extends ts.JSDocType>(kind: T["kind"]) {
        return createBaseNode(kind);
    }

    // @api
    // createJSDocNullableType
    // createJSDocNonNullableType
    function createJSDocPrePostfixUnaryTypeWorker<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; readonly postfix: boolean }>(kind: T["kind"], type: T["type"], postfix = false): T {
        const node = createJSDocUnaryTypeWorker(
            kind,
            postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type
        ) as ts.Mutable<T>;
        node.postfix = postfix;
        return node;
    }

    // @api
    // createJSDocOptionalType
    // createJSDocVariadicType
    // createJSDocNamepathType
    function createJSDocUnaryTypeWorker<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; }>(kind: T["kind"], type: T["type"]): T {
        const node = createBaseNode<T>(kind);
        node.type = type;
        return node;
    }

    // @api
    // updateJSDocNonNullableType
    // updateJSDocNullableType
    function updateJSDocPrePostfixUnaryTypeWorker<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"], node: T, type: T["type"]): T {
        return node.type !== type
        ? update(createJSDocPrePostfixUnaryTypeWorker(kind, type, node.postfix), node)
        : node;
    }

    // @api
    // updateJSDocOptionalType
    // updateJSDocVariadicType
    // updateJSDocNamepathType
    function updateJSDocUnaryTypeWorker<T extends ts.JSDocType & { readonly type: ts.TypeNode | undefined; }>(kind: T["kind"], node: T, type: T["type"]): T {
        return node.type !== type
            ? update(createJSDocUnaryTypeWorker(kind, type), node)
            : node;
    }

    // @api
    function createJSDocFunctionType(parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined): ts.JSDocFunctionType {
        const node = createBaseSignatureDeclaration<ts.JSDocFunctionType>(
            ts.SyntaxKind.JSDocFunctionType,
            /*modifiers*/ undefined,
            /*name*/ undefined,
            /*typeParameters*/ undefined,
            parameters,
            type
        );
        return node;
    }

    // @api
    function updateJSDocFunctionType(node: ts.JSDocFunctionType, parameters: readonly ts.ParameterDeclaration[], type: ts.TypeNode | undefined): ts.JSDocFunctionType {
        return node.parameters !== parameters
            || node.type !== type
            ? update(createJSDocFunctionType(parameters, type), node)
            : node;
    }

    // @api
    function createJSDocTypeLiteral(propertyTags?: readonly ts.JSDocPropertyLikeTag[], isArrayType = false): ts.JSDocTypeLiteral {
        const node = createBaseNode<ts.JSDocTypeLiteral>(ts.SyntaxKind.JSDocTypeLiteral);
        node.jsDocPropertyTags = asNodeArray(propertyTags);
        node.isArrayType = isArrayType;
        return node;
    }

    // @api
    function updateJSDocTypeLiteral(node: ts.JSDocTypeLiteral, propertyTags: readonly ts.JSDocPropertyLikeTag[] | undefined, isArrayType: boolean): ts.JSDocTypeLiteral {
        return node.jsDocPropertyTags !== propertyTags
            || node.isArrayType !== isArrayType
            ? update(createJSDocTypeLiteral(propertyTags, isArrayType), node)
            : node;
    }

    // @api
    function createJSDocTypeExpression(type: ts.TypeNode): ts.JSDocTypeExpression {
        const node = createBaseNode<ts.JSDocTypeExpression>(ts.SyntaxKind.JSDocTypeExpression);
        node.type = type;
        return node;
    }

    // @api
    function updateJSDocTypeExpression(node: ts.JSDocTypeExpression, type: ts.TypeNode): ts.JSDocTypeExpression {
        return node.type !== type
            ? update(createJSDocTypeExpression(type), node)
            : node;
    }

    // @api
    function createJSDocSignature(typeParameters: readonly ts.JSDocTemplateTag[] | undefined, parameters: readonly ts.JSDocParameterTag[], type?: ts.JSDocReturnTag): ts.JSDocSignature {
        const node = createBaseNode<ts.JSDocSignature>(ts.SyntaxKind.JSDocSignature);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        return node;
    }

    // @api
    function updateJSDocSignature(node: ts.JSDocSignature, typeParameters: readonly ts.JSDocTemplateTag[] | undefined, parameters: readonly ts.JSDocParameterTag[], type: ts.JSDocReturnTag | undefined): ts.JSDocSignature {
        return node.typeParameters !== typeParameters
            || node.parameters !== parameters
            || node.type !== type
            ? update(createJSDocSignature(typeParameters, parameters, type), node)
            : node;
    }

    function getDefaultTagName(node: ts.JSDocTag) {
        const defaultTagName = getDefaultTagNameForKind(node.kind);
        return node.tagName.escapedText === ts.escapeLeadingUnderscores(defaultTagName)
            ? node.tagName
            : createIdentifier(defaultTagName);
    }

    // @api
    function createBaseJSDocTag<T extends ts.JSDocTag>(kind: T["kind"], tagName: ts.Identifier, comment: string | ts.NodeArray<ts.JSDocComment> | undefined) {
        const node = createBaseNode<T>(kind);
        node.tagName = tagName;
        node.comment = comment;
        return node;
    }

    // @api
    function createJSDocTemplateTag(tagName: ts.Identifier | undefined, constraint: ts.JSDocTypeExpression | undefined, typeParameters: readonly ts.TypeParameterDeclaration[], comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocTemplateTag {
        const node = createBaseJSDocTag<ts.JSDocTemplateTag>(ts.SyntaxKind.JSDocTemplateTag, tagName ?? createIdentifier("template"), comment);
        node.constraint = constraint;
        node.typeParameters = createNodeArray(typeParameters);
        return node;
    }

    // @api
    function updateJSDocTemplateTag(node: ts.JSDocTemplateTag, tagName: ts.Identifier = getDefaultTagName(node), constraint: ts.JSDocTypeExpression | undefined, typeParameters: readonly ts.TypeParameterDeclaration[], comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocTemplateTag {
        return node.tagName !== tagName
            || node.constraint !== constraint
            || node.typeParameters !== typeParameters
            || node.comment !== comment
            ? update(createJSDocTemplateTag(tagName, constraint, typeParameters, comment), node)
            : node;
    }

    // @api
    function createJSDocTypedefTag(tagName: ts.Identifier | undefined, typeExpression?: ts.JSDocTypeExpression, fullName?: ts.Identifier | ts.JSDocNamespaceDeclaration, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocTypedefTag {
        const node = createBaseJSDocTag<ts.JSDocTypedefTag>(ts.SyntaxKind.JSDocTypedefTag, tagName ?? createIdentifier("typedef"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = ts.getJSDocTypeAliasName(fullName);
        return node;
    }

    // @api
    function updateJSDocTypedefTag(node: ts.JSDocTypedefTag, tagName: ts.Identifier = getDefaultTagName(node), typeExpression: ts.JSDocTypeExpression | undefined, fullName: ts.Identifier | ts.JSDocNamespaceDeclaration | undefined, comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocTypedefTag {
        return node.tagName !== tagName
            || node.typeExpression !== typeExpression
            || node.fullName !== fullName
            || node.comment !== comment
            ? update(createJSDocTypedefTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocParameterTag(tagName: ts.Identifier | undefined, name: ts.EntityName, isBracketed: boolean, typeExpression?: ts.JSDocTypeExpression, isNameFirst?: boolean, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocParameterTag {
        const node = createBaseJSDocTag<ts.JSDocParameterTag>(ts.SyntaxKind.JSDocParameterTag, tagName ?? createIdentifier("param"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function updateJSDocParameterTag(node: ts.JSDocParameterTag, tagName: ts.Identifier = getDefaultTagName(node), name: ts.EntityName, isBracketed: boolean, typeExpression: ts.JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocParameterTag {
        return node.tagName !== tagName
            || node.name !== name
            || node.isBracketed !== isBracketed
            || node.typeExpression !== typeExpression
            || node.isNameFirst !== isNameFirst
            || node.comment !== comment
            ? update(createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node)
            : node;
    }

    // @api
    function createJSDocPropertyTag(tagName: ts.Identifier | undefined, name: ts.EntityName, isBracketed: boolean, typeExpression?: ts.JSDocTypeExpression, isNameFirst?: boolean, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocPropertyTag {
        const node = createBaseJSDocTag<ts.JSDocPropertyTag>(ts.SyntaxKind.JSDocPropertyTag, tagName ?? createIdentifier("prop"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function updateJSDocPropertyTag(node: ts.JSDocPropertyTag, tagName: ts.Identifier = getDefaultTagName(node), name: ts.EntityName, isBracketed: boolean, typeExpression: ts.JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocPropertyTag {
        return node.tagName !== tagName
            || node.name !== name
            || node.isBracketed !== isBracketed
            || node.typeExpression !== typeExpression
            || node.isNameFirst !== isNameFirst
            || node.comment !== comment
            ? update(createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node)
            : node;
    }

    // @api
    function createJSDocCallbackTag(tagName: ts.Identifier | undefined, typeExpression: ts.JSDocSignature, fullName?: ts.Identifier | ts.JSDocNamespaceDeclaration, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocCallbackTag {
        const node = createBaseJSDocTag<ts.JSDocCallbackTag>(ts.SyntaxKind.JSDocCallbackTag, tagName ?? createIdentifier("callback"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = ts.getJSDocTypeAliasName(fullName);
        return node;
    }

    // @api
    function updateJSDocCallbackTag(node: ts.JSDocCallbackTag, tagName: ts.Identifier = getDefaultTagName(node), typeExpression: ts.JSDocSignature, fullName: ts.Identifier | ts.JSDocNamespaceDeclaration | undefined, comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocCallbackTag {
        return node.tagName !== tagName
            || node.typeExpression !== typeExpression
            || node.fullName !== fullName
            || node.comment !== comment
            ? update(createJSDocCallbackTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocAugmentsTag(tagName: ts.Identifier | undefined, className: ts.JSDocAugmentsTag["class"], comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocAugmentsTag {
        const node = createBaseJSDocTag<ts.JSDocAugmentsTag>(ts.SyntaxKind.JSDocAugmentsTag, tagName ?? createIdentifier("augments"), comment);
        node.class = className;
        return node;
    }

    // @api
    function updateJSDocAugmentsTag(node: ts.JSDocAugmentsTag, tagName: ts.Identifier = getDefaultTagName(node), className: ts.JSDocAugmentsTag["class"], comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocAugmentsTag {
        return node.tagName !== tagName
            || node.class !== className
            || node.comment !== comment
            ? update(createJSDocAugmentsTag(tagName, className, comment), node)
            : node;
    }

    // @api
    function createJSDocImplementsTag(tagName: ts.Identifier | undefined, className: ts.JSDocImplementsTag["class"], comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocImplementsTag {
        const node = createBaseJSDocTag<ts.JSDocImplementsTag>(ts.SyntaxKind.JSDocImplementsTag, tagName ?? createIdentifier("implements"), comment);
        node.class = className;
        return node;
    }

    // @api
    function createJSDocSeeTag(tagName: ts.Identifier | undefined, name: ts.JSDocNameReference | undefined, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocSeeTag {
        const node = createBaseJSDocTag<ts.JSDocSeeTag>(ts.SyntaxKind.JSDocSeeTag, tagName ?? createIdentifier("see"), comment);
        node.name = name;
        return node;
    }

    // @api
    function updateJSDocSeeTag(node: ts.JSDocSeeTag, tagName: ts.Identifier | undefined, name: ts.JSDocNameReference | undefined, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocSeeTag {
        return node.tagName !== tagName
            || node.name !== name
            || node.comment !== comment
            ? update(createJSDocSeeTag(tagName, name, comment), node)
            : node;
    }

    // @api
    function createJSDocNameReference(name: ts.EntityName | ts.JSDocMemberName): ts.JSDocNameReference {
        const node = createBaseNode<ts.JSDocNameReference>(ts.SyntaxKind.JSDocNameReference);
        node.name = name;
        return node;
    }

    // @api
    function updateJSDocNameReference(node: ts.JSDocNameReference, name: ts.EntityName | ts.JSDocMemberName): ts.JSDocNameReference {
        return node.name !== name
            ? update(createJSDocNameReference(name), node)
            : node;
    }

    // @api
    function createJSDocMemberName(left: ts.EntityName | ts.JSDocMemberName, right: ts.Identifier) {
        const node = createBaseNode<ts.JSDocMemberName>(ts.SyntaxKind.JSDocMemberName);
        node.left = left;
        node.right = right;
        node.transformFlags |=
            propagateChildFlags(node.left) |
            propagateChildFlags(node.right);
        return node;
    }

    // @api
    function updateJSDocMemberName(node: ts.JSDocMemberName, left: ts.EntityName | ts.JSDocMemberName, right: ts.Identifier) {
        return node.left !== left
            || node.right !== right
            ? update(createJSDocMemberName(left, right), node)
            : node;
    }

    // @api
    function createJSDocLink(name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLink {
        const node = createBaseNode<ts.JSDocLink>(ts.SyntaxKind.JSDocLink);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLink(node: ts.JSDocLink, name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLink {
        return node.name !== name
            ? update(createJSDocLink(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkCode(name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLinkCode {
        const node = createBaseNode<ts.JSDocLinkCode>(ts.SyntaxKind.JSDocLinkCode);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLinkCode(node: ts.JSDocLinkCode, name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLinkCode {
        return node.name !== name
            ? update(createJSDocLinkCode(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkPlain(name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLinkPlain {
        const node = createBaseNode<ts.JSDocLinkPlain>(ts.SyntaxKind.JSDocLinkPlain);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLinkPlain(node: ts.JSDocLinkPlain, name: ts.EntityName | ts.JSDocMemberName | undefined, text: string): ts.JSDocLinkPlain {
        return node.name !== name
            ? update(createJSDocLinkPlain(name, text), node)
            : node;
    }

    // @api
    function updateJSDocImplementsTag(node: ts.JSDocImplementsTag, tagName: ts.Identifier = getDefaultTagName(node), className: ts.JSDocImplementsTag["class"], comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocImplementsTag {
        return node.tagName !== tagName
            || node.class !== className
            || node.comment !== comment
            ? update(createJSDocImplementsTag(tagName, className, comment), node)
            : node;
    }

    // @api
    // createJSDocAuthorTag
    // createJSDocClassTag
    // createJSDocPublicTag
    // createJSDocPrivateTag
    // createJSDocProtectedTag
    // createJSDocReadonlyTag
    // createJSDocDeprecatedTag
    function createJSDocSimpleTagWorker<T extends ts.JSDocTag>(kind: T["kind"], tagName: ts.Identifier | undefined, comment?: string | ts.NodeArray<ts.JSDocComment>) {
        const node = createBaseJSDocTag<T>(kind, tagName ?? createIdentifier(getDefaultTagNameForKind(kind)), comment);
        return node;
    }

    // @api
    // updateJSDocAuthorTag
    // updateJSDocClassTag
    // updateJSDocPublicTag
    // updateJSDocPrivateTag
    // updateJSDocProtectedTag
    // updateJSDocReadonlyTag
    // updateJSDocDeprecatedTag
    function updateJSDocSimpleTagWorker<T extends ts.JSDocTag>(kind: T["kind"], node: T, tagName: ts.Identifier = getDefaultTagName(node), comment: string | ts.NodeArray<ts.JSDocComment> | undefined) {
        return node.tagName !== tagName
            || node.comment !== comment
            ? update(createJSDocSimpleTagWorker(kind, tagName, comment), node) :
            node;
    }

    // @api
    // createJSDocTypeTag
    // createJSDocReturnTag
    // createJSDocThisTag
    // createJSDocEnumTag
    function createJSDocTypeLikeTagWorker<T extends ts.JSDocTag & { typeExpression?: ts.JSDocTypeExpression }>(kind: T["kind"], tagName: ts.Identifier | undefined, typeExpression?: ts.JSDocTypeExpression, comment?: string | ts.NodeArray<ts.JSDocComment>) {
        const node = createBaseJSDocTag<T>(kind, tagName ?? createIdentifier(getDefaultTagNameForKind(kind)), comment);
        node.typeExpression = typeExpression;
        return node;
    }

    // @api
    // updateJSDocTypeTag
    // updateJSDocReturnTag
    // updateJSDocThisTag
    // updateJSDocEnumTag
    function updateJSDocTypeLikeTagWorker<T extends ts.JSDocTag & { typeExpression?: ts.JSDocTypeExpression }>(kind: T["kind"], node: T, tagName: ts.Identifier = getDefaultTagName(node), typeExpression: ts.JSDocTypeExpression | undefined, comment: string | ts.NodeArray<ts.JSDocComment> | undefined) {
        return node.tagName !== tagName
            || node.typeExpression !== typeExpression
            || node.comment !== comment
            ? update(createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocUnknownTag(tagName: ts.Identifier, comment?: string | ts.NodeArray<ts.JSDocComment>): ts.JSDocUnknownTag {
        const node = createBaseJSDocTag<ts.JSDocUnknownTag>(ts.SyntaxKind.JSDocTag, tagName, comment);
        return node;
    }

    // @api
    function updateJSDocUnknownTag(node: ts.JSDocUnknownTag, tagName: ts.Identifier, comment: string | ts.NodeArray<ts.JSDocComment> | undefined): ts.JSDocUnknownTag {
        return node.tagName !== tagName
            || node.comment !== comment
            ? update(createJSDocUnknownTag(tagName, comment), node)
            : node;
    }

    // @api
    function createJSDocText(text: string): ts.JSDocText {
        const node = createBaseNode<ts.JSDocText>(ts.SyntaxKind.JSDocText);
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocText(node: ts.JSDocText, text: string): ts.JSDocText {
        return node.text !== text
            ? update(createJSDocText(text), node)
            : node;
    }

    // @api
    function createJSDocComment(comment?: string | ts.NodeArray<ts.JSDocComment> | undefined, tags?: readonly ts.JSDocTag[] | undefined) {
        const node = createBaseNode<ts.JSDoc>(ts.SyntaxKind.JSDoc);
        node.comment = comment;
        node.tags = asNodeArray(tags);
        return node;
    }

    // @api
    function updateJSDocComment(node: ts.JSDoc, comment: string | ts.NodeArray<ts.JSDocComment> | undefined, tags: readonly ts.JSDocTag[] | undefined) {
        return node.comment !== comment
            || node.tags !== tags
            ? update(createJSDocComment(comment, tags), node)
            : node;
    }

    //
    // JSX
    //

    // @api
    function createJsxElement(openingElement: ts.JsxOpeningElement, children: readonly ts.JsxChild[], closingElement: ts.JsxClosingElement) {
        const node = createBaseNode<ts.JsxElement>(ts.SyntaxKind.JsxElement);
        node.openingElement = openingElement;
        node.children = createNodeArray(children);
        node.closingElement = closingElement;
        node.transformFlags |=
            propagateChildFlags(node.openingElement) |
            propagateChildrenFlags(node.children) |
            propagateChildFlags(node.closingElement) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxElement(node: ts.JsxElement, openingElement: ts.JsxOpeningElement, children: readonly ts.JsxChild[], closingElement: ts.JsxClosingElement) {
        return node.openingElement !== openingElement
            || node.children !== children
            || node.closingElement !== closingElement
            ? update(createJsxElement(openingElement, children, closingElement), node)
            : node;
    }

    // @api
    function createJsxSelfClosingElement(tagName: ts.JsxTagNameExpression, typeArguments: readonly ts.TypeNode[] | undefined, attributes: ts.JsxAttributes) {
        const node = createBaseNode<ts.JsxSelfClosingElement>(ts.SyntaxKind.JsxSelfClosingElement);
        node.tagName = tagName;
        node.typeArguments = asNodeArray(typeArguments);
        node.attributes = attributes;
        node.transformFlags |=
            propagateChildFlags(node.tagName) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.attributes) |
            ts.TransformFlags.ContainsJsx;
        if (node.typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateJsxSelfClosingElement(node: ts.JsxSelfClosingElement, tagName: ts.JsxTagNameExpression, typeArguments: readonly ts.TypeNode[] | undefined, attributes: ts.JsxAttributes) {
        return node.tagName !== tagName
            || node.typeArguments !== typeArguments
            || node.attributes !== attributes
            ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxOpeningElement(tagName: ts.JsxTagNameExpression, typeArguments: readonly ts.TypeNode[] | undefined, attributes: ts.JsxAttributes) {
        const node = createBaseNode<ts.JsxOpeningElement>(ts.SyntaxKind.JsxOpeningElement);
        node.tagName = tagName;
        node.typeArguments = asNodeArray(typeArguments);
        node.attributes = attributes;
        node.transformFlags |=
            propagateChildFlags(node.tagName) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.attributes) |
            ts.TransformFlags.ContainsJsx;
        if (typeArguments) {
            node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateJsxOpeningElement(node: ts.JsxOpeningElement, tagName: ts.JsxTagNameExpression, typeArguments: readonly ts.TypeNode[] | undefined, attributes: ts.JsxAttributes) {
        return node.tagName !== tagName
            || node.typeArguments !== typeArguments
            || node.attributes !== attributes
            ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxClosingElement(tagName: ts.JsxTagNameExpression) {
        const node = createBaseNode<ts.JsxClosingElement>(ts.SyntaxKind.JsxClosingElement);
        node.tagName = tagName;
        node.transformFlags |=
            propagateChildFlags(node.tagName) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxClosingElement(node: ts.JsxClosingElement, tagName: ts.JsxTagNameExpression) {
        return node.tagName !== tagName
            ? update(createJsxClosingElement(tagName), node)
            : node;
    }

    // @api
    function createJsxFragment(openingFragment: ts.JsxOpeningFragment, children: readonly ts.JsxChild[], closingFragment: ts.JsxClosingFragment) {
        const node = createBaseNode<ts.JsxFragment>(ts.SyntaxKind.JsxFragment);
        node.openingFragment = openingFragment;
        node.children = createNodeArray(children);
        node.closingFragment = closingFragment;
        node.transformFlags |=
            propagateChildFlags(node.openingFragment) |
            propagateChildrenFlags(node.children) |
            propagateChildFlags(node.closingFragment) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxFragment(node: ts.JsxFragment, openingFragment: ts.JsxOpeningFragment, children: readonly ts.JsxChild[], closingFragment: ts.JsxClosingFragment) {
        return node.openingFragment !== openingFragment
            || node.children !== children
            || node.closingFragment !== closingFragment
            ? update(createJsxFragment(openingFragment, children, closingFragment), node)
            : node;
    }

    // @api
    function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        const node = createBaseNode<ts.JsxText>(ts.SyntaxKind.JsxText);
        node.text = text;
        node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
        node.transformFlags |= ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxText(node: ts.JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        return node.text !== text
            || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
            ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
            : node;
    }

    // @api
    function createJsxOpeningFragment() {
        const node = createBaseNode<ts.JsxOpeningFragment>(ts.SyntaxKind.JsxOpeningFragment);
        node.transformFlags |= ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function createJsxJsxClosingFragment() {
        const node = createBaseNode<ts.JsxClosingFragment>(ts.SyntaxKind.JsxClosingFragment);
        node.transformFlags |= ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function createJsxAttribute(name: ts.Identifier, initializer: ts.JsxAttributeValue | undefined) {
        const node = createBaseNode<ts.JsxAttribute>(ts.SyntaxKind.JsxAttribute);
        node.name = name;
        node.initializer = initializer;
        node.transformFlags |=
            propagateChildFlags(node.name) |
            propagateChildFlags(node.initializer) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxAttribute(node: ts.JsxAttribute, name: ts.Identifier, initializer: ts.JsxAttributeValue | undefined) {
        return node.name !== name
            || node.initializer !== initializer
            ? update(createJsxAttribute(name, initializer), node)
            : node;
    }

    // @api
    function createJsxAttributes(properties: readonly ts.JsxAttributeLike[]) {
        const node = createBaseNode<ts.JsxAttributes>(ts.SyntaxKind.JsxAttributes);
        node.properties = createNodeArray(properties);
        node.transformFlags |=
            propagateChildrenFlags(node.properties) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxAttributes(node: ts.JsxAttributes, properties: readonly ts.JsxAttributeLike[]) {
        return node.properties !== properties
            ? update(createJsxAttributes(properties), node)
            : node;
    }

    // @api
    function createJsxSpreadAttribute(expression: ts.Expression) {
        const node = createBaseNode<ts.JsxSpreadAttribute>(ts.SyntaxKind.JsxSpreadAttribute);
        node.expression = expression;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxSpreadAttribute(node: ts.JsxSpreadAttribute, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createJsxSpreadAttribute(expression), node)
            : node;
    }

    // @api
    function createJsxExpression(dotDotDotToken: ts.DotDotDotToken | undefined, expression: ts.Expression | undefined) {
        const node = createBaseNode<ts.JsxExpression>(ts.SyntaxKind.JsxExpression);
        node.dotDotDotToken = dotDotDotToken;
        node.expression = expression;
        node.transformFlags |=
            propagateChildFlags(node.dotDotDotToken) |
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxExpression(node: ts.JsxExpression, expression: ts.Expression | undefined) {
        return node.expression !== expression
            ? update(createJsxExpression(node.dotDotDotToken, expression), node)
            : node;
    }

    //
    // Clauses
    //

    // @api
    function createCaseClause(expression: ts.Expression, statements: readonly ts.Statement[]) {
        const node = createBaseNode<ts.CaseClause>(ts.SyntaxKind.CaseClause);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statements = createNodeArray(statements);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function updateCaseClause(node: ts.CaseClause, expression: ts.Expression, statements: readonly ts.Statement[]) {
        return node.expression !== expression
            || node.statements !== statements
            ? update(createCaseClause(expression, statements), node)
            : node;
    }

    // @api
    function createDefaultClause(statements: readonly ts.Statement[]) {
        const node = createBaseNode<ts.DefaultClause>(ts.SyntaxKind.DefaultClause);
        node.statements = createNodeArray(statements);
        node.transformFlags = propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function updateDefaultClause(node: ts.DefaultClause, statements: readonly ts.Statement[]) {
        return node.statements !== statements
            ? update(createDefaultClause(statements), node)
            : node;
    }

    // @api
    function createHeritageClause(token: ts.HeritageClause["token"], types: readonly ts.ExpressionWithTypeArguments[]) {
        const node = createBaseNode<ts.HeritageClause>(ts.SyntaxKind.HeritageClause);
        node.token = token;
        node.types = createNodeArray(types);
        node.transformFlags |= propagateChildrenFlags(node.types);
        switch (token) {
            case ts.SyntaxKind.ExtendsKeyword:
                node.transformFlags |= ts.TransformFlags.ContainsES2015;
                break;
            case ts.SyntaxKind.ImplementsKeyword:
                node.transformFlags |= ts.TransformFlags.ContainsTypeScript;
                break;
            default:
                return ts.Debug.assertNever(token);
        }
        return node;
    }

    // @api
    function updateHeritageClause(node: ts.HeritageClause, types: readonly ts.ExpressionWithTypeArguments[]) {
        return node.types !== types
            ? update(createHeritageClause(node.token, types), node)
            : node;
    }

    // @api
    function createCatchClause(variableDeclaration: string | ts.BindingName | ts.VariableDeclaration | undefined, block: ts.Block) {
        const node = createBaseNode<ts.CatchClause>(ts.SyntaxKind.CatchClause);
        if (typeof variableDeclaration === "string" || variableDeclaration && !ts.isVariableDeclaration(variableDeclaration)) {
            variableDeclaration = createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
        }
        node.variableDeclaration = variableDeclaration;
        node.block = block;
        node.transformFlags |=
            propagateChildFlags(node.variableDeclaration) |
            propagateChildFlags(node.block);
        if (!variableDeclaration) node.transformFlags |= ts.TransformFlags.ContainsES2019;
        return node;
    }

    // @api
    function updateCatchClause(node: ts.CatchClause, variableDeclaration: ts.VariableDeclaration | undefined, block: ts.Block) {
        return node.variableDeclaration !== variableDeclaration
            || node.block !== block
            ? update(createCatchClause(variableDeclaration, block), node)
            : node;
    }

    //
    // Property assignments
    //

    // @api
    function createPropertyAssignment(name: string | ts.PropertyName, initializer: ts.Expression) {
        const node = createBaseNamedDeclaration<ts.PropertyAssignment>(
            ts.SyntaxKind.PropertyAssignment,
            /*modifiers*/ undefined,
            name
        );
        node.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        node.transformFlags |=
            propagateChildFlags(node.name) |
            propagateChildFlags(node.initializer);

        // The following properties are used only to report grammar errors
        node.illegalDecorators = undefined;
        node.modifiers = undefined;
        node.questionToken = undefined;
        node.exclamationToken = undefined;
        return node;
    }

    // @api
    function updatePropertyAssignment(node: ts.PropertyAssignment, name: ts.PropertyName, initializer: ts.Expression) {
        return node.name !== name
            || node.initializer !== initializer
            ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node)
            : node;
    }

    function finishUpdatePropertyAssignment(updated: ts.Mutable<ts.PropertyAssignment>, original: ts.PropertyAssignment) {
        // copy children used only for error reporting
        if (updated !== original) {
            updated.illegalDecorators = original.illegalDecorators;
            updated.modifiers = original.modifiers;
            updated.questionToken = original.questionToken;
            updated.exclamationToken = original.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createShorthandPropertyAssignment(name: string | ts.Identifier, objectAssignmentInitializer?: ts.Expression) {
        const node = createBaseNamedDeclaration<ts.ShorthandPropertyAssignment>(
            ts.SyntaxKind.ShorthandPropertyAssignment,
            /*modifiers*/ undefined,
            name
        );
        node.objectAssignmentInitializer = objectAssignmentInitializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer);
        node.transformFlags |=
            propagateChildFlags(node.objectAssignmentInitializer) |
            ts.TransformFlags.ContainsES2015;

        // The following properties are used only to report grammar errors
        node.equalsToken = undefined;
        node.illegalDecorators = undefined;
        node.modifiers = undefined;
        node.questionToken = undefined;
        node.exclamationToken = undefined;
        return node;
    }

    // @api
    function updateShorthandPropertyAssignment(node: ts.ShorthandPropertyAssignment, name: ts.Identifier, objectAssignmentInitializer: ts.Expression | undefined) {
        return node.name !== name
            || node.objectAssignmentInitializer !== objectAssignmentInitializer
            ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node)
            : node;
    }

    function finishUpdateShorthandPropertyAssignment(updated: ts.Mutable<ts.ShorthandPropertyAssignment>, original: ts.ShorthandPropertyAssignment) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.equalsToken = original.equalsToken;
            updated.illegalDecorators = original.illegalDecorators;
            updated.modifiers = original.modifiers;
            updated.questionToken = original.questionToken;
            updated.exclamationToken = original.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createSpreadAssignment(expression: ts.Expression) {
        const node = createBaseNode<ts.SpreadAssignment>(ts.SyntaxKind.SpreadAssignment);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsES2018 |
            ts.TransformFlags.ContainsObjectRestOrSpread;
        return node;
    }

    // @api
    function updateSpreadAssignment(node: ts.SpreadAssignment, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createSpreadAssignment(expression), node)
            : node;
    }

    //
    // Enum
    //

    // @api
    function createEnumMember(name: string | ts.PropertyName, initializer?: ts.Expression) {
        const node = createBaseNode<ts.EnumMember>(ts.SyntaxKind.EnumMember);
        node.name = asName(name);
        node.initializer = initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        node.transformFlags |=
            propagateChildFlags(node.name) |
            propagateChildFlags(node.initializer) |
            ts.TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateEnumMember(node: ts.EnumMember, name: ts.PropertyName, initializer: ts.Expression | undefined) {
        return node.name !== name
            || node.initializer !== initializer
            ? update(createEnumMember(name, initializer), node)
            : node;
    }

    //
    // Top-level nodes
    //

    // @api
    function createSourceFile(
        statements: readonly ts.Statement[],
        endOfFileToken: ts.EndOfFileToken,
        flags: ts.NodeFlags
    ) {
        const node = baseFactory.createBaseSourceFileNode(ts.SyntaxKind.SourceFile) as ts.Mutable<ts.SourceFile>;
        node.statements = createNodeArray(statements);
        node.endOfFileToken = endOfFileToken;
        node.flags |= flags;
        node.fileName = "";
        node.text = "";
        node.languageVersion = 0;
        node.languageVariant = 0;
        node.scriptKind = 0;
        node.isDeclarationFile = false;
        node.hasNoDefaultLib = false;
        node.transformFlags |=
            propagateChildrenFlags(node.statements) |
            propagateChildFlags(node.endOfFileToken);
        return node;
    }

    function cloneSourceFileWithChanges(
        source: ts.SourceFile,
        statements: readonly ts.Statement[],
        isDeclarationFile: boolean,
        referencedFiles: readonly ts.FileReference[],
        typeReferences: readonly ts.FileReference[],
        hasNoDefaultLib: boolean,
        libReferences: readonly ts.FileReference[]
    ) {
        const node = (source.redirectInfo ? Object.create(source.redirectInfo.redirectTarget) : baseFactory.createBaseSourceFileNode(ts.SyntaxKind.SourceFile)) as ts.Mutable<ts.SourceFile>;
        for (const p in source) {
            if (p === "emitNode" || ts.hasProperty(node, p) || !ts.hasProperty(source, p)) continue;
            (node as any)[p] = (source as any)[p];
        }
        node.flags |= source.flags;
        node.statements = createNodeArray(statements);
        node.endOfFileToken = source.endOfFileToken;
        node.isDeclarationFile = isDeclarationFile;
        node.referencedFiles = referencedFiles;
        node.typeReferenceDirectives = typeReferences;
        node.hasNoDefaultLib = hasNoDefaultLib;
        node.libReferenceDirectives = libReferences;
        node.transformFlags =
            propagateChildrenFlags(node.statements) |
            propagateChildFlags(node.endOfFileToken);
        node.impliedNodeFormat = source.impliedNodeFormat;
        return node;
    }

    // @api
    function updateSourceFile(
        node: ts.SourceFile,
        statements: readonly ts.Statement[],
        isDeclarationFile = node.isDeclarationFile,
        referencedFiles = node.referencedFiles,
        typeReferenceDirectives = node.typeReferenceDirectives,
        hasNoDefaultLib = node.hasNoDefaultLib,
        libReferenceDirectives = node.libReferenceDirectives
    ) {
        return node.statements !== statements
            || node.isDeclarationFile !== isDeclarationFile
            || node.referencedFiles !== referencedFiles
            || node.typeReferenceDirectives !== typeReferenceDirectives
            || node.hasNoDefaultLib !== hasNoDefaultLib
            || node.libReferenceDirectives !== libReferenceDirectives
            ? update(cloneSourceFileWithChanges(node, statements, isDeclarationFile, referencedFiles, typeReferenceDirectives, hasNoDefaultLib, libReferenceDirectives), node)
            : node;
    }

    // @api
    function createBundle(sourceFiles: readonly ts.SourceFile[], prepends: readonly (ts.UnparsedSource | ts.InputFiles)[] = ts.emptyArray) {
        const node = createBaseNode<ts.Bundle>(ts.SyntaxKind.Bundle);
        node.prepends = prepends;
        node.sourceFiles = sourceFiles;
        return node;
    }

    // @api
    function updateBundle(node: ts.Bundle, sourceFiles: readonly ts.SourceFile[], prepends: readonly (ts.UnparsedSource | ts.InputFiles)[] = ts.emptyArray) {
        return node.sourceFiles !== sourceFiles
            || node.prepends !== prepends
            ? update(createBundle(sourceFiles, prepends), node)
            : node;
    }

    // @api
    function createUnparsedSource(prologues: readonly ts.UnparsedPrologue[], syntheticReferences: readonly ts.UnparsedSyntheticReference[] | undefined, texts: readonly ts.UnparsedSourceText[]) {
        const node = createBaseNode<ts.UnparsedSource>(ts.SyntaxKind.UnparsedSource);
        node.prologues = prologues;
        node.syntheticReferences = syntheticReferences;
        node.texts = texts;
        node.fileName = "";
        node.text = "";
        node.referencedFiles = ts.emptyArray;
        node.libReferenceDirectives = ts.emptyArray;
        node.getLineAndCharacterOfPosition = pos => ts.getLineAndCharacterOfPosition(node, pos);
        return node;
    }

    function createBaseUnparsedNode<T extends ts.UnparsedNode>(kind: T["kind"], data?: string) {
        const node = createBaseNode(kind);
        node.data = data;
        return node;
    }

    // @api
    function createUnparsedPrologue(data?: string): ts.UnparsedPrologue {
        return createBaseUnparsedNode(ts.SyntaxKind.UnparsedPrologue, data);
    }

    // @api
    function createUnparsedPrepend(data: string | undefined, texts: readonly ts.UnparsedTextLike[]): ts.UnparsedPrepend {
        const node = createBaseUnparsedNode<ts.UnparsedPrepend>(ts.SyntaxKind.UnparsedPrepend, data);
        node.texts = texts;
        return node;
    }

    // @api
    function createUnparsedTextLike(data: string | undefined, internal: boolean): ts.UnparsedTextLike {
        return createBaseUnparsedNode(internal ? ts.SyntaxKind.UnparsedInternalText : ts.SyntaxKind.UnparsedText, data);
    }

    // @api
    function createUnparsedSyntheticReference(section: ts.BundleFileHasNoDefaultLib | ts.BundleFileReference): ts.UnparsedSyntheticReference {
        const node = createBaseNode<ts.UnparsedSyntheticReference>(ts.SyntaxKind.UnparsedSyntheticReference);
        node.data = section.data;
        node.section = section;
        return node;
    }

    // @api
    function createInputFiles(): ts.InputFiles {
        const node = createBaseNode<ts.InputFiles>(ts.SyntaxKind.InputFiles);
        node.javascriptText = "";
        node.declarationText = "";
        return node;
    }

    //
    // Synthetic Nodes (used by checker)
    //

    // @api
    function createSyntheticExpression(type: ts.Type, isSpread = false, tupleNameSource?: ts.ParameterDeclaration | ts.NamedTupleMember) {
        const node = createBaseNode<ts.SyntheticExpression>(ts.SyntaxKind.SyntheticExpression);
        node.type = type;
        node.isSpread = isSpread;
        node.tupleNameSource = tupleNameSource;
        return node;
    }

    // @api
    function createSyntaxList(children: ts.Node[]) {
        const node = createBaseNode<ts.SyntaxList>(ts.SyntaxKind.SyntaxList);
        node._children = children;
        return node;
    }

    //
    // Transformation nodes
    //

    /**
     * Creates a synthetic statement to act as a placeholder for a not-emitted statement in
     * order to preserve comments.
     *
     * @param original The original statement.
     */
    // @api
    function createNotEmittedStatement(original: ts.Node) {
        const node = createBaseNode<ts.NotEmittedStatement>(ts.SyntaxKind.NotEmittedStatement);
        node.original = original;
        ts.setTextRange(node, original);
        return node;
    }

    /**
     * Creates a synthetic expression to act as a placeholder for a not-emitted expression in
     * order to preserve comments or sourcemap positions.
     *
     * @param expression The inner expression to emit.
     * @param original The original outer expression.
     */
    // @api
    function createPartiallyEmittedExpression(expression: ts.Expression, original?: ts.Node) {
        const node = createBaseNode<ts.PartiallyEmittedExpression>(ts.SyntaxKind.PartiallyEmittedExpression);
        node.expression = expression;
        node.original = original;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            ts.TransformFlags.ContainsTypeScript;
        ts.setTextRange(node, original);
        return node;
    }

    // @api
    function updatePartiallyEmittedExpression(node: ts.PartiallyEmittedExpression, expression: ts.Expression) {
        return node.expression !== expression
            ? update(createPartiallyEmittedExpression(expression, node.original), node)
            : node;
    }

    function flattenCommaElements(node: ts.Expression): ts.Expression | readonly ts.Expression[] {
        if (ts.nodeIsSynthesized(node) && !ts.isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
            if (ts.isCommaListExpression(node)) {
                return node.elements;
            }
            if (ts.isBinaryExpression(node) && ts.isCommaToken(node.operatorToken)) {
                return [node.left, node.right];
            }
        }
        return node;
    }

    // @api
    function createCommaListExpression(elements: readonly ts.Expression[]) {
        const node = createBaseNode<ts.CommaListExpression>(ts.SyntaxKind.CommaListExpression);
        node.elements = createNodeArray(ts.sameFlatMap(elements, flattenCommaElements));
        node.transformFlags |= propagateChildrenFlags(node.elements);
        return node;
    }

    // @api
    function updateCommaListExpression(node: ts.CommaListExpression, elements: readonly ts.Expression[]) {
        return node.elements !== elements
            ? update(createCommaListExpression(elements), node)
            : node;
    }

    /**
     * Creates a synthetic element to act as a placeholder for the end of an emitted declaration in
     * order to properly emit exports.
     */
    // @api
    function createEndOfDeclarationMarker(original: ts.Node) {
        const node = createBaseNode<ts.EndOfDeclarationMarker>(ts.SyntaxKind.EndOfDeclarationMarker);
        node.emitNode = {} as ts.EmitNode;
        node.original = original;
        return node;
    }

    /**
     * Creates a synthetic element to act as a placeholder for the beginning of a merged declaration in
     * order to properly emit exports.
     */
    // @api
    function createMergeDeclarationMarker(original: ts.Node) {
        const node = createBaseNode<ts.MergeDeclarationMarker>(ts.SyntaxKind.MergeDeclarationMarker);
        node.emitNode = {} as ts.EmitNode;
        node.original = original;
        return node;
    }

    // @api
    function createSyntheticReferenceExpression(expression: ts.Expression, thisArg: ts.Expression) {
        const node = createBaseNode<ts.SyntheticReferenceExpression>(ts.SyntaxKind.SyntheticReferenceExpression);
        node.expression = expression;
        node.thisArg = thisArg;
        node.transformFlags |=
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.thisArg);
        return node;
    }

    // @api
    function updateSyntheticReferenceExpression(node: ts.SyntheticReferenceExpression, expression: ts.Expression, thisArg: ts.Expression) {
        return node.expression !== expression
            || node.thisArg !== thisArg
            ? update(createSyntheticReferenceExpression(expression, thisArg), node)
            : node;
    }

    // @api
    function cloneNode<T extends ts.Node | undefined>(node: T): T;
    function cloneNode<T extends ts.Node>(node: T) {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        if (node === undefined) {
            return node;
        }

        const clone =
            ts.isSourceFile(node) ? baseFactory.createBaseSourceFileNode(ts.SyntaxKind.SourceFile) as T :
            ts.isIdentifier(node) ? baseFactory.createBaseIdentifierNode(ts.SyntaxKind.Identifier) as T :
            ts.isPrivateIdentifier(node) ? baseFactory.createBasePrivateIdentifierNode(ts.SyntaxKind.PrivateIdentifier) as T :
            !ts.isNodeKind(node.kind) ? baseFactory.createBaseTokenNode(node.kind) as T :
            baseFactory.createBaseNode(node.kind) as T;

        (clone as ts.Mutable<T>).flags |= (node.flags & ~ts.NodeFlags.Synthesized);
        (clone as ts.Mutable<T>).transformFlags = node.transformFlags;
        setOriginalNode(clone, node);

        for (const key in node) {
            if (ts.hasProperty(clone, key) || !ts.hasProperty(node, key)) {
                continue;
            }

            clone[key] = node[key];
        }

        return clone;
    }

    // compound nodes
    function createImmediatelyInvokedFunctionExpression(statements: readonly ts.Statement[]): ts.CallExpression;
    function createImmediatelyInvokedFunctionExpression(statements: readonly ts.Statement[], param: ts.ParameterDeclaration, paramValue: ts.Expression): ts.CallExpression;
    function createImmediatelyInvokedFunctionExpression(statements: readonly ts.Statement[], param?: ts.ParameterDeclaration, paramValue?: ts.Expression) {
        return createCallExpression(
            createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ param ? [param] : [],
                /*type*/ undefined,
                createBlock(statements, /*multiLine*/ true)
            ),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ paramValue ? [paramValue] : []
        );
    }

    function createImmediatelyInvokedArrowFunction(statements: readonly ts.Statement[]): ts.CallExpression;
    function createImmediatelyInvokedArrowFunction(statements: readonly ts.Statement[], param: ts.ParameterDeclaration, paramValue: ts.Expression): ts.CallExpression;
    function createImmediatelyInvokedArrowFunction(statements: readonly ts.Statement[], param?: ts.ParameterDeclaration, paramValue?: ts.Expression) {
        return createCallExpression(
            createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ param ? [param] : [],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                createBlock(statements, /*multiLine*/ true)
            ),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ paramValue ? [paramValue] : []
        );
    }

    function createVoidZero() {
        return createVoidExpression(createNumericLiteral("0"));
    }

    function createExportDefault(expression: ts.Expression) {
        return createExportAssignment(
            /*modifiers*/ undefined,
            /*isExportEquals*/ false,
            expression);
    }

    function createExternalModuleExport(exportName: ts.Identifier) {
        return createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            createNamedExports([
                createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, exportName)
            ])
        );
    }

    //
    // Utilities
    //

    function createTypeCheck(value: ts.Expression, tag: ts.TypeOfTag) {
        return tag === "undefined"
            ? factory.createStrictEquality(value, createVoidZero())
            : factory.createStrictEquality(createTypeOfExpression(value), createStringLiteral(tag));
    }

    function createMethodCall(object: ts.Expression, methodName: string | ts.Identifier, argumentsList: readonly ts.Expression[]) {
        // Preserve the optionality of `object`.
        if (ts.isCallChain(object)) {
            return createCallChain(
                createPropertyAccessChain(object, /*questionDotToken*/ undefined, methodName),
                /*questionDotToken*/ undefined,
                /*typeArguments*/ undefined,
                argumentsList
            );
        }
        return createCallExpression(
            createPropertyAccessExpression(object, methodName),
            /*typeArguments*/ undefined,
            argumentsList
        );
    }

    function createFunctionBindCall(target: ts.Expression, thisArg: ts.Expression, argumentsList: readonly ts.Expression[]) {
        return createMethodCall(target, "bind", [thisArg, ...argumentsList]);
    }

    function createFunctionCallCall(target: ts.Expression, thisArg: ts.Expression, argumentsList: readonly ts.Expression[]) {
        return createMethodCall(target, "call", [thisArg, ...argumentsList]);
    }

    function createFunctionApplyCall(target: ts.Expression, thisArg: ts.Expression, argumentsExpression: ts.Expression) {
        return createMethodCall(target, "apply", [thisArg, argumentsExpression]);
    }

    function createGlobalMethodCall(globalObjectName: string, methodName: string, argumentsList: readonly ts.Expression[]) {
        return createMethodCall(createIdentifier(globalObjectName), methodName, argumentsList);
    }

    function createArraySliceCall(array: ts.Expression, start?: number | ts.Expression) {
        return createMethodCall(array, "slice", start === undefined ? [] : [asExpression(start)]);
    }

    function createArrayConcatCall(array: ts.Expression, argumentsList: readonly ts.Expression[]) {
        return createMethodCall(array, "concat", argumentsList);
    }

    function createObjectDefinePropertyCall(target: ts.Expression, propertyName: string | ts.Expression, attributes: ts.Expression) {
        return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
    }

    function createReflectGetCall(target: ts.Expression, propertyKey: ts.Expression, receiver?: ts.Expression): ts.CallExpression {
        return createGlobalMethodCall("Reflect", "get", receiver ? [target, propertyKey, receiver] : [target, propertyKey]);
    }

    function createReflectSetCall(target: ts.Expression, propertyKey: ts.Expression, value: ts.Expression, receiver?: ts.Expression): ts.CallExpression {
        return createGlobalMethodCall("Reflect", "set", receiver ? [target, propertyKey, value, receiver] : [target, propertyKey, value]);
    }

    function tryAddPropertyAssignment(properties: ts.Push<ts.PropertyAssignment>, propertyName: string, expression: ts.Expression | undefined) {
        if (expression) {
            properties.push(createPropertyAssignment(propertyName, expression));
            return true;
        }
        return false;
    }

    function createPropertyDescriptor(attributes: ts.PropertyDescriptorAttributes, singleLine?: boolean) {
        const properties: ts.PropertyAssignment[] = [];
        tryAddPropertyAssignment(properties, "enumerable", asExpression(attributes.enumerable));
        tryAddPropertyAssignment(properties, "configurable", asExpression(attributes.configurable));

        let isData = tryAddPropertyAssignment(properties, "writable", asExpression(attributes.writable));
        isData = tryAddPropertyAssignment(properties, "value", attributes.value) || isData;

        let isAccessor = tryAddPropertyAssignment(properties, "get", attributes.get);
        isAccessor = tryAddPropertyAssignment(properties, "set", attributes.set) || isAccessor;

        ts.Debug.assert(!(isData && isAccessor), "A PropertyDescriptor may not be both an accessor descriptor and a data descriptor.");
        return createObjectLiteralExpression(properties, !singleLine);
    }

    function updateOuterExpression(outerExpression: ts.OuterExpression, expression: ts.Expression) {
        switch (outerExpression.kind) {
            case ts.SyntaxKind.ParenthesizedExpression: return updateParenthesizedExpression(outerExpression, expression);
            case ts.SyntaxKind.TypeAssertionExpression: return updateTypeAssertion(outerExpression, outerExpression.type, expression);
            case ts.SyntaxKind.AsExpression: return updateAsExpression(outerExpression, expression, outerExpression.type);
            case ts.SyntaxKind.SatisfiesExpression: return updateSatisfiesExpression(outerExpression, expression, outerExpression.type);
            case ts.SyntaxKind.NonNullExpression: return updateNonNullExpression(outerExpression, expression);
            case ts.SyntaxKind.PartiallyEmittedExpression: return updatePartiallyEmittedExpression(outerExpression, expression);
        }
    }

    /**
     * Determines whether a node is a parenthesized expression that can be ignored when recreating outer expressions.
     *
     * A parenthesized expression can be ignored when all of the following are true:
     *
     * - It's `pos` and `end` are not -1
     * - It does not have a custom source map range
     * - It does not have a custom comment range
     * - It does not have synthetic leading or trailing comments
     *
     * If an outermost parenthesized expression is ignored, but the containing expression requires a parentheses around
     * the expression to maintain precedence, a new parenthesized expression should be created automatically when
     * the containing expression is created/updated.
     */
    function isIgnorableParen(node: ts.Expression) {
        return ts.isParenthesizedExpression(node)
            && ts.nodeIsSynthesized(node)
            && ts.nodeIsSynthesized(ts.getSourceMapRange(node))
            && ts.nodeIsSynthesized(ts.getCommentRange(node))
            && !ts.some(ts.getSyntheticLeadingComments(node))
            && !ts.some(ts.getSyntheticTrailingComments(node));
    }

    function restoreOuterExpressions(outerExpression: ts.Expression | undefined, innerExpression: ts.Expression, kinds = ts.OuterExpressionKinds.All): ts.Expression {
        if (outerExpression && ts.isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
            return updateOuterExpression(
                outerExpression,
                restoreOuterExpressions(outerExpression.expression, innerExpression)
            );
        }
        return innerExpression;
    }

    function restoreEnclosingLabel(node: ts.Statement, outermostLabeledStatement: ts.LabeledStatement | undefined, afterRestoreLabelCallback?: (node: ts.LabeledStatement) => void): ts.Statement {
        if (!outermostLabeledStatement) {
            return node;
        }
        const updated = updateLabeledStatement(
            outermostLabeledStatement,
            outermostLabeledStatement.label,
            ts.isLabeledStatement(outermostLabeledStatement.statement)
                ? restoreEnclosingLabel(node, outermostLabeledStatement.statement)
                : node
        );
        if (afterRestoreLabelCallback) {
            afterRestoreLabelCallback(outermostLabeledStatement);
        }
        return updated;
    }

    function shouldBeCapturedInTempVariable(node: ts.Expression, cacheIdentifiers: boolean): boolean {
        const target = ts.skipParentheses(node);
        switch (target.kind) {
            case ts.SyntaxKind.Identifier:
                return cacheIdentifiers;
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.StringLiteral:
                return false;
            case ts.SyntaxKind.ArrayLiteralExpression:
                const elements = (target as ts.ArrayLiteralExpression).elements;
                if (elements.length === 0) {
                    return false;
                }
                return true;
            case ts.SyntaxKind.ObjectLiteralExpression:
                return (target as ts.ObjectLiteralExpression).properties.length > 0;
            default:
                return true;
        }
    }

    function createCallBinding(expression: ts.Expression, recordTempVariable: (temp: ts.Identifier) => void, languageVersion?: ts.ScriptTarget, cacheIdentifiers = false): ts.CallBinding {
        const callee = ts.skipOuterExpressions(expression, ts.OuterExpressionKinds.All);
        let thisArg: ts.Expression;
        let target: ts.LeftHandSideExpression;
        if (ts.isSuperProperty(callee)) {
            thisArg = createThis();
            target = callee;
        }
        else if (ts.isSuperKeyword(callee)) {
            thisArg = createThis();
            target = languageVersion !== undefined && languageVersion < ts.ScriptTarget.ES2015
                ? ts.setTextRange(createIdentifier("_super"), callee)
                : callee as ts.PrimaryExpression;
        }
        else if (ts.getEmitFlags(callee) & ts.EmitFlags.HelperName) {
            thisArg = createVoidZero();
            target = parenthesizerRules().parenthesizeLeftSideOfAccess(callee, /*optionalChain*/ false);
        }
        else if (ts.isPropertyAccessExpression(callee)) {
            if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                thisArg = createTempVariable(recordTempVariable);
                target = createPropertyAccessExpression(
                    ts.setTextRange(
                        factory.createAssignment(
                            thisArg,
                            callee.expression
                        ),
                        callee.expression
                    ),
                    callee.name
                );
                ts.setTextRange(target, callee);
            }
            else {
                thisArg = callee.expression;
                target = callee;
            }
        }
        else if (ts.isElementAccessExpression(callee)) {
            if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                // for `a[b]()` target is `(_a = a)[b]` and thisArg is `_a`
                thisArg = createTempVariable(recordTempVariable);
                target = createElementAccessExpression(
                    ts.setTextRange(
                        factory.createAssignment(
                            thisArg,
                            callee.expression
                        ),
                        callee.expression
                    ),
                    callee.argumentExpression
                );
                ts.setTextRange(target, callee);
            }
            else {
                thisArg = callee.expression;
                target = callee;
            }
        }
        else {
            // for `a()` target is `a` and thisArg is `void 0`
            thisArg = createVoidZero();
            target = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        }

        return { target, thisArg };
    }

    function createAssignmentTargetWrapper(paramName: ts.Identifier, expression: ts.Expression): ts.LeftHandSideExpression {
        return createPropertyAccessExpression(
            // Explicit parens required because of v8 regression (https://bugs.chromium.org/p/v8/issues/detail?id=9560)
            createParenthesizedExpression(
                createObjectLiteralExpression([
                    createSetAccessorDeclaration(
                        /*modifiers*/ undefined,
                        "value",
                        [createParameterDeclaration(
                            /*modifiers*/ undefined,
                            /*dotDotDotToken*/ undefined,
                            paramName,
                            /*questionToken*/ undefined,
                            /*type*/ undefined,
                            /*initializer*/ undefined
                        )],
                        createBlock([
                            createExpressionStatement(expression)
                        ])
                    )
                ])
            ),
            "value"
        );
    }

    function inlineExpressions(expressions: readonly ts.Expression[]) {
        // Avoid deeply nested comma expressions as traversing them during emit can result in "Maximum call
        // stack size exceeded" errors.
        return expressions.length > 10
            ? createCommaListExpression(expressions)
            : ts.reduceLeft(expressions, factory.createComma)!;
    }

    function getName(node: ts.Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags: ts.EmitFlags = 0) {
        const nodeName = ts.getNameOfDeclaration(node);
        if (nodeName && ts.isIdentifier(nodeName) && !ts.isGeneratedIdentifier(nodeName)) {
            // TODO(rbuckton): Does this need to be parented?
            const name = ts.setParent(ts.setTextRange(cloneNode(nodeName), nodeName), nodeName.parent);
            emitFlags |= ts.getEmitFlags(nodeName);
            if (!allowSourceMaps) emitFlags |= ts.EmitFlags.NoSourceMap;
            if (!allowComments) emitFlags |= ts.EmitFlags.NoComments;
            if (emitFlags) ts.setEmitFlags(name, emitFlags);
            return name;
        }
        return getGeneratedNameForNode(node);
    }

    /**
     * Gets the internal name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the body of an ES5 class function body. An internal name will *never*
     * be prefixed with an module or namespace export modifier like "exports." when emitted as an
     * expression. An internal name will also *never* be renamed due to a collision with a block
     * scoped variable.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getInternalName(node: ts.Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps, ts.EmitFlags.LocalName | ts.EmitFlags.InternalName);
    }

    /**
     * Gets the local name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). A
     * local name will *never* be prefixed with an module or namespace export modifier like
     * "exports." when emitted as an expression.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getLocalName(node: ts.Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps, ts.EmitFlags.LocalName);
    }

    /**
     * Gets the export name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
     * export name will *always* be prefixed with an module or namespace export modifier like
     * `"exports."` when emitted as an expression if the name points to an exported symbol.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getExportName(node: ts.Declaration, allowComments?: boolean, allowSourceMaps?: boolean): ts.Identifier {
        return getName(node, allowComments, allowSourceMaps, ts.EmitFlags.ExportName);
    }

    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getDeclarationName(node: ts.Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps);
    }

    /**
     * Gets a namespace-qualified name for use in expressions.
     *
     * @param ns The namespace identifier.
     * @param name The name.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getNamespaceMemberName(ns: ts.Identifier, name: ts.Identifier, allowComments?: boolean, allowSourceMaps?: boolean): ts.PropertyAccessExpression {
        const qualifiedName = createPropertyAccessExpression(ns, ts.nodeIsSynthesized(name) ? name : cloneNode(name));
        ts.setTextRange(qualifiedName, name);
        let emitFlags: ts.EmitFlags = 0;
        if (!allowSourceMaps) emitFlags |= ts.EmitFlags.NoSourceMap;
        if (!allowComments) emitFlags |= ts.EmitFlags.NoComments;
        if (emitFlags) ts.setEmitFlags(qualifiedName, emitFlags);
        return qualifiedName;
    }

    /**
     * Gets the exported name of a declaration for use in expressions.
     *
     * An exported name will *always* be prefixed with an module or namespace export modifier like
     * "exports." if the name points to an exported symbol.
     *
     * @param ns The namespace identifier.
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getExternalModuleOrNamespaceExportName(ns: ts.Identifier | undefined, node: ts.Declaration, allowComments?: boolean, allowSourceMaps?: boolean): ts.Identifier | ts.PropertyAccessExpression {
        if (ns && ts.hasSyntacticModifier(node, ts.ModifierFlags.Export)) {
            return getNamespaceMemberName(ns, getName(node), allowComments, allowSourceMaps);
        }
        return getExportName(node, allowComments, allowSourceMaps);
    }

    /**
     * Copies any necessary standard and custom prologue-directives into target array.
     * @param source origin statements array
     * @param target result statements array
     * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
     * @param visitor Optional callback used to visit any custom prologue directives.
     */
    function copyPrologue(source: readonly ts.Statement[], target: ts.Push<ts.Statement>, ensureUseStrict?: boolean, visitor?: (node: ts.Node) => ts.VisitResult<ts.Node>): number {
        const offset = copyStandardPrologue(source, target, 0, ensureUseStrict);
        return copyCustomPrologue(source, target, offset, visitor);
    }

    function isUseStrictPrologue(node: ts.ExpressionStatement): boolean {
        return ts.isStringLiteral(node.expression) && node.expression.text === "use strict";
    }

    function createUseStrictPrologue() {
        return ts.startOnNewLine(createExpressionStatement(createStringLiteral("use strict"))) as ts.PrologueDirective;
    }

    /**
     * Copies only the standard (string-expression) prologue-directives into the target statement-array.
     * @param source origin statements array
     * @param target result statements array
     * @param statementOffset The offset at which to begin the copy.
     * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
     * @returns Count of how many directive statements were copied.
     */
    function copyStandardPrologue(source: readonly ts.Statement[], target: ts.Push<ts.Statement>, statementOffset = 0, ensureUseStrict?: boolean): number {
        ts.Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
        let foundUseStrict = false;
        const numStatements = source.length;
        while (statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (ts.isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement)) {
                    foundUseStrict = true;
                }
                target.push(statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        if (ensureUseStrict && !foundUseStrict) {
            target.push(createUseStrictPrologue());
        }
        return statementOffset;
    }

    /**
     * Copies only the custom prologue-directives into target statement-array.
     * @param source origin statements array
     * @param target result statements array
     * @param statementOffset The offset at which to begin the copy.
     * @param visitor Optional callback used to visit any custom prologue directives.
     */
    function copyCustomPrologue(source: readonly ts.Statement[], target: ts.Push<ts.Statement>, statementOffset: number, visitor?: (node: ts.Node) => ts.VisitResult<ts.Node>, filter?: (node: ts.Node) => boolean): number;
    function copyCustomPrologue(source: readonly ts.Statement[], target: ts.Push<ts.Statement>, statementOffset: number | undefined, visitor?: (node: ts.Node) => ts.VisitResult<ts.Node>, filter?: (node: ts.Node) => boolean): number | undefined;
    function copyCustomPrologue(source: readonly ts.Statement[], target: ts.Push<ts.Statement>, statementOffset: number | undefined, visitor?: (node: ts.Node) => ts.VisitResult<ts.Node>, filter: (node: ts.Node) => boolean = ts.returnTrue): number | undefined {
        const numStatements = source.length;
        while (statementOffset !== undefined && statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (ts.getEmitFlags(statement) & ts.EmitFlags.CustomPrologue && filter(statement)) {
                ts.append(target, visitor ? ts.visitNode(statement, visitor, ts.isStatement) : statement);
            }
            else {
                break;
            }
            statementOffset++;
        }
        return statementOffset;
    }

    /**
     * Ensures "use strict" directive is added
     *
     * @param statements An array of statements
     */
    function ensureUseStrict(statements: ts.NodeArray<ts.Statement>): ts.NodeArray<ts.Statement> {
        const foundUseStrict = ts.findUseStrictPrologue(statements);

        if (!foundUseStrict) {
            return ts.setTextRange(createNodeArray<ts.Statement>([createUseStrictPrologue(), ...statements]), statements);
        }

        return statements;
    }

    /**
     * Lifts a NodeArray containing only Statement nodes to a block.
     *
     * @param nodes The NodeArray.
     */
    function liftToBlock(nodes: readonly ts.Node[]): ts.Statement {
        ts.Debug.assert(ts.every(nodes, ts.isStatementOrBlock), "Cannot lift nodes to a Block.");
        return ts.singleOrUndefined(nodes) as ts.Statement || createBlock(nodes as readonly ts.Statement[]);
    }

    function findSpanEnd<T>(array: readonly T[], test: (value: T) => boolean, start: number) {
        let i = start;
        while (i < array.length && test(array[i])) {
            i++;
        }
        return i;
    }

    function mergeLexicalEnvironment(statements: ts.NodeArray<ts.Statement>, declarations: readonly ts.Statement[] | undefined): ts.NodeArray<ts.Statement>;
    function mergeLexicalEnvironment(statements: ts.Statement[], declarations: readonly ts.Statement[] | undefined): ts.Statement[];
    function mergeLexicalEnvironment(statements: ts.Statement[] | ts.NodeArray<ts.Statement>, declarations: readonly ts.Statement[] | undefined) {
        if (!ts.some(declarations)) {
            return statements;
        }

        // When we merge new lexical statements into an existing statement list, we merge them in the following manner:
        //
        // Given:
        //
        // | Left                               | Right                               |
        // |------------------------------------|-------------------------------------|
        // | [standard prologues (left)]        | [standard prologues (right)]        |
        // | [hoisted functions (left)]         | [hoisted functions (right)]         |
        // | [hoisted variables (left)]         | [hoisted variables (right)]         |
        // | [lexical init statements (left)]   | [lexical init statements (right)]   |
        // | [other statements (left)]          |                                     |
        //
        // The resulting statement list will be:
        //
        // | Result                              |
        // |-------------------------------------|
        // | [standard prologues (right)]        |
        // | [standard prologues (left)]         |
        // | [hoisted functions (right)]         |
        // | [hoisted functions (left)]          |
        // | [hoisted variables (right)]         |
        // | [hoisted variables (left)]          |
        // | [lexical init statements (right)]   |
        // | [lexical init statements (left)]    |
        // | [other statements (left)]           |
        //
        // NOTE: It is expected that new lexical init statements must be evaluated before existing lexical init statements,
        // as the prior transformation may depend on the evaluation of the lexical init statements to be in the correct state.

        // find standard prologues on left in the following order: standard directives, hoisted functions, hoisted variables, other custom
        const leftStandardPrologueEnd = findSpanEnd(statements, ts.isPrologueDirective, 0);
        const leftHoistedFunctionsEnd = findSpanEnd(statements, ts.isHoistedFunction, leftStandardPrologueEnd);
        const leftHoistedVariablesEnd = findSpanEnd(statements, ts.isHoistedVariableStatement, leftHoistedFunctionsEnd);

        // find standard prologues on right in the following order: standard directives, hoisted functions, hoisted variables, other custom
        const rightStandardPrologueEnd = findSpanEnd(declarations, ts.isPrologueDirective, 0);
        const rightHoistedFunctionsEnd = findSpanEnd(declarations, ts.isHoistedFunction, rightStandardPrologueEnd);
        const rightHoistedVariablesEnd = findSpanEnd(declarations, ts.isHoistedVariableStatement, rightHoistedFunctionsEnd);
        const rightCustomPrologueEnd = findSpanEnd(declarations, ts.isCustomPrologue, rightHoistedVariablesEnd);
        ts.Debug.assert(rightCustomPrologueEnd === declarations.length, "Expected declarations to be valid standard or custom prologues");

        // splice prologues from the right into the left. We do this in reverse order
        // so that we don't need to recompute the index on the left when we insert items.
        const left = ts.isNodeArray(statements) ? statements.slice() : statements;

        // splice other custom prologues from right into left
        if (rightCustomPrologueEnd > rightHoistedVariablesEnd) {
            left.splice(leftHoistedVariablesEnd, 0, ...declarations.slice(rightHoistedVariablesEnd, rightCustomPrologueEnd));
        }

        // splice hoisted variables from right into left
        if (rightHoistedVariablesEnd > rightHoistedFunctionsEnd) {
            left.splice(leftHoistedFunctionsEnd, 0, ...declarations.slice(rightHoistedFunctionsEnd, rightHoistedVariablesEnd));
        }

        // splice hoisted functions from right into left
        if (rightHoistedFunctionsEnd > rightStandardPrologueEnd) {
            left.splice(leftStandardPrologueEnd, 0, ...declarations.slice(rightStandardPrologueEnd, rightHoistedFunctionsEnd));
        }

        // splice standard prologues from right into left (that are not already in left)
        if (rightStandardPrologueEnd > 0) {
            if (leftStandardPrologueEnd === 0) {
                left.splice(0, 0, ...declarations.slice(0, rightStandardPrologueEnd));
            }
            else {
                const leftPrologues = new ts.Map<string, boolean>();
                for (let i = 0; i < leftStandardPrologueEnd; i++) {
                    const leftPrologue = statements[i] as ts.PrologueDirective;
                    leftPrologues.set(leftPrologue.expression.text, true);
                }
                for (let i = rightStandardPrologueEnd - 1; i >= 0; i--) {
                    const rightPrologue = declarations[i] as ts.PrologueDirective;
                    if (!leftPrologues.has(rightPrologue.expression.text)) {
                        left.unshift(rightPrologue);
                    }
                }
            }
        }

        if (ts.isNodeArray(statements)) {
            return ts.setTextRange(createNodeArray(left, statements.hasTrailingComma), statements);
        }

        return statements;
    }

    function updateModifiers<T extends ts.HasModifiers>(node: T, modifiers: readonly ts.Modifier[] | ts.ModifierFlags): T;
    function updateModifiers(node: ts.HasModifiers, modifiers: readonly ts.Modifier[] | ts.ModifierFlags) {
        let modifierArray;
        if (typeof modifiers === "number") {
            modifierArray = createModifiersFromModifierFlags(modifiers);
        }
        else {
            modifierArray = modifiers;
        }
        return ts.isTypeParameterDeclaration(node) ? updateTypeParameterDeclaration(node, modifierArray, node.name, node.constraint, node.default) :
            ts.isParameter(node) ? updateParameterDeclaration(node, modifierArray, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) :
            ts.isConstructorTypeNode(node) ? updateConstructorTypeNode1(node, modifierArray, node.typeParameters, node.parameters, node.type) :
            ts.isPropertySignature(node) ? updatePropertySignature(node, modifierArray, node.name, node.questionToken, node.type) :
            ts.isPropertyDeclaration(node) ? updatePropertyDeclaration(node, modifierArray, node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer) :
            ts.isMethodSignature(node) ? updateMethodSignature(node, modifierArray, node.name, node.questionToken, node.typeParameters, node.parameters, node.type) :
            ts.isMethodDeclaration(node) ? updateMethodDeclaration(node, modifierArray, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) :
            ts.isConstructorDeclaration(node) ? updateConstructorDeclaration(node, modifierArray, node.parameters, node.body) :
            ts.isGetAccessorDeclaration(node) ? updateGetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.type, node.body) :
            ts.isSetAccessorDeclaration(node) ? updateSetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.body) :
            ts.isIndexSignatureDeclaration(node) ? updateIndexSignature(node, modifierArray, node.parameters, node.type) :
            ts.isFunctionExpression(node) ? updateFunctionExpression(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) :
            ts.isArrowFunction(node) ? updateArrowFunction(node, modifierArray, node.typeParameters, node.parameters, node.type, node.equalsGreaterThanToken, node.body) :
            ts.isClassExpression(node) ? updateClassExpression(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            ts.isVariableStatement(node) ? updateVariableStatement(node, modifierArray, node.declarationList) :
            ts.isFunctionDeclaration(node) ? updateFunctionDeclaration(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) :
            ts.isClassDeclaration(node) ? updateClassDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            ts.isInterfaceDeclaration(node) ? updateInterfaceDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            ts.isTypeAliasDeclaration(node) ? updateTypeAliasDeclaration(node, modifierArray, node.name, node.typeParameters, node.type) :
            ts.isEnumDeclaration(node) ? updateEnumDeclaration(node, modifierArray, node.name, node.members) :
            ts.isModuleDeclaration(node) ? updateModuleDeclaration(node, modifierArray, node.name, node.body) :
            ts.isImportEqualsDeclaration(node) ? updateImportEqualsDeclaration(node, modifierArray, node.isTypeOnly, node.name, node.moduleReference) :
            ts.isImportDeclaration(node) ? updateImportDeclaration(node, modifierArray, node.importClause, node.moduleSpecifier, node.assertClause) :
            ts.isExportAssignment(node) ? updateExportAssignment(node, modifierArray, node.expression) :
            ts.isExportDeclaration(node) ? updateExportDeclaration(node, modifierArray, node.isTypeOnly, node.exportClause, node.moduleSpecifier, node.assertClause) :
            ts.Debug.assertNever(node);
    }

    function asNodeArray<T extends ts.Node>(array: readonly T[]): ts.NodeArray<T>;
    function asNodeArray<T extends ts.Node>(array: readonly T[] | undefined): ts.NodeArray<T> | undefined;
    function asNodeArray<T extends ts.Node>(array: readonly T[] | undefined): ts.NodeArray<T> | undefined {
        return array ? createNodeArray(array) : undefined;
    }

    function asName<T extends ts.DeclarationName | ts.Identifier | ts.BindingName | ts.PropertyName | ts.NoSubstitutionTemplateLiteral | ts.EntityName | ts.ThisTypeNode | undefined>(name: string | T): T | ts.Identifier {
        return typeof name === "string" ? createIdentifier(name) :
            name;
    }

    function asExpression<T extends ts.Expression | undefined>(value: string | number | boolean | T): T | ts.StringLiteral | ts.NumericLiteral | ts.BooleanLiteral {
        return typeof value === "string" ? createStringLiteral(value) :
            typeof value === "number" ? createNumericLiteral(value) :
            typeof value === "boolean" ? value ? createTrue() : createFalse() :
            value;
    }

    function asToken<TKind extends ts.SyntaxKind>(value: TKind | ts.Token<TKind>): ts.Token<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    function asEmbeddedStatement<T extends ts.Node>(statement: T): T | ts.EmptyStatement;
    function asEmbeddedStatement<T extends ts.Node>(statement: T | undefined): T | ts.EmptyStatement | undefined;
    function asEmbeddedStatement<T extends ts.Node>(statement: T | undefined): T | ts.EmptyStatement | undefined {
        return statement && ts.isNotEmittedStatement(statement) ? ts.setTextRange(setOriginalNode(createEmptyStatement(), statement), statement) : statement;
    }
}

function updateWithoutOriginal<T extends ts.Node>(updated: ts.Mutable<T>, original: T): T {
    if (updated !== original) {
        ts.setTextRange(updated, original);
    }
    return updated;
}

function updateWithOriginal<T extends ts.Node>(updated: ts.Mutable<T>, original: T): T {
    if (updated !== original) {
        setOriginalNode(updated, original);
        ts.setTextRange(updated, original);
    }
    return updated;
}

function getDefaultTagNameForKind(kind: ts.JSDocTag["kind"]): string {
    switch (kind) {
        case ts.SyntaxKind.JSDocTypeTag: return "type";
        case ts.SyntaxKind.JSDocReturnTag: return "returns";
        case ts.SyntaxKind.JSDocThisTag: return "this";
        case ts.SyntaxKind.JSDocEnumTag: return "enum";
        case ts.SyntaxKind.JSDocAuthorTag: return "author";
        case ts.SyntaxKind.JSDocClassTag: return "class";
        case ts.SyntaxKind.JSDocPublicTag: return "public";
        case ts.SyntaxKind.JSDocPrivateTag: return "private";
        case ts.SyntaxKind.JSDocProtectedTag: return "protected";
        case ts.SyntaxKind.JSDocReadonlyTag: return "readonly";
        case ts.SyntaxKind.JSDocOverrideTag: return "override";
        case ts.SyntaxKind.JSDocTemplateTag: return "template";
        case ts.SyntaxKind.JSDocTypedefTag: return "typedef";
        case ts.SyntaxKind.JSDocParameterTag: return "param";
        case ts.SyntaxKind.JSDocPropertyTag: return "prop";
        case ts.SyntaxKind.JSDocCallbackTag: return "callback";
        case ts.SyntaxKind.JSDocAugmentsTag: return "augments";
        case ts.SyntaxKind.JSDocImplementsTag: return "implements";
        default:
            return ts.Debug.fail(`Unsupported kind: ${ts.Debug.formatSyntaxKind(kind)}`);
    }
}

let rawTextScanner: ts.Scanner | undefined;
const invalidValueSentinel: object = { };

function getCookedText(kind: ts.TemplateLiteralToken["kind"], rawText: string) {
    if (!rawTextScanner) {
        rawTextScanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ false, ts.LanguageVariant.Standard);
    }
    switch (kind) {
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            rawTextScanner.setText("`" + rawText + "`");
            break;
        case ts.SyntaxKind.TemplateHead:
            rawTextScanner.setText("`" + rawText + "${");
            break;
        case ts.SyntaxKind.TemplateMiddle:
            rawTextScanner.setText("}" + rawText + "${");
            break;
        case ts.SyntaxKind.TemplateTail:
            rawTextScanner.setText("}" + rawText + "`");
            break;
    }

    let token = rawTextScanner.scan();
    if (token === ts.SyntaxKind.CloseBraceToken) {
        token = rawTextScanner.reScanTemplateToken(/*isTaggedTemplate*/ false);
    }

    if (rawTextScanner.isUnterminated()) {
        rawTextScanner.setText(undefined);
        return invalidValueSentinel;
    }

    let tokenValue: string | undefined;
    switch (token) {
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        case ts.SyntaxKind.TemplateHead:
        case ts.SyntaxKind.TemplateMiddle:
        case ts.SyntaxKind.TemplateTail:
            tokenValue = rawTextScanner.getTokenValue();
            break;
    }

    if (tokenValue === undefined || rawTextScanner.scan() !== ts.SyntaxKind.EndOfFileToken) {
        rawTextScanner.setText(undefined);
        return invalidValueSentinel;
    }

    rawTextScanner.setText(undefined);
    return tokenValue;
}

function propagateIdentifierNameFlags(node: ts.Identifier) {
    // An IdentifierName is allowed to be `await`
    return propagateChildFlags(node) & ~ts.TransformFlags.ContainsPossibleTopLevelAwait;
}

function propagatePropertyNameFlagsOfChild(node: ts.PropertyName, transformFlags: ts.TransformFlags) {
    return transformFlags | (node.transformFlags & ts.TransformFlags.PropertyNamePropagatingFlags);
}

function propagateChildFlags(child: ts.Node | undefined): ts.TransformFlags {
    if (!child) return ts.TransformFlags.None;
    const childFlags = child.transformFlags & ~getTransformFlagsSubtreeExclusions(child.kind);
    return ts.isNamedDeclaration(child) && ts.isPropertyName(child.name) ? propagatePropertyNameFlagsOfChild(child.name, childFlags) : childFlags;
}

function propagateChildrenFlags(children: ts.NodeArray<ts.Node> | undefined): ts.TransformFlags {
    return children ? children.transformFlags : ts.TransformFlags.None;
}

function aggregateChildrenFlags(children: ts.MutableNodeArray<ts.Node>) {
    let subtreeFlags = ts.TransformFlags.None;
    for (const child of children) {
        subtreeFlags |= propagateChildFlags(child);
    }
    children.transformFlags = subtreeFlags;
}

/**
 * Gets the transform flags to exclude when unioning the transform flags of a subtree.
 */
/* @internal */
export function getTransformFlagsSubtreeExclusions(kind: ts.SyntaxKind) {
    if (kind >= ts.SyntaxKind.FirstTypeNode && kind <= ts.SyntaxKind.LastTypeNode) {
        return ts.TransformFlags.TypeExcludes;
    }

    switch (kind) {
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.ArrayLiteralExpression:
            return ts.TransformFlags.ArrayLiteralOrCallOrNewExcludes;
        case ts.SyntaxKind.ModuleDeclaration:
            return ts.TransformFlags.ModuleExcludes;
        case ts.SyntaxKind.Parameter:
            return ts.TransformFlags.ParameterExcludes;
        case ts.SyntaxKind.ArrowFunction:
            return ts.TransformFlags.ArrowFunctionExcludes;
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.FunctionDeclaration:
            return ts.TransformFlags.FunctionExcludes;
        case ts.SyntaxKind.VariableDeclarationList:
            return ts.TransformFlags.VariableDeclarationListExcludes;
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
            return ts.TransformFlags.ClassExcludes;
        case ts.SyntaxKind.Constructor:
            return ts.TransformFlags.ConstructorExcludes;
        case ts.SyntaxKind.PropertyDeclaration:
            return ts.TransformFlags.PropertyExcludes;
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
            return ts.TransformFlags.MethodOrAccessorExcludes;
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BigIntKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.StringKeyword:
        case ts.SyntaxKind.ObjectKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.SymbolKeyword:
        case ts.SyntaxKind.VoidKeyword:
        case ts.SyntaxKind.TypeParameter:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
            return ts.TransformFlags.TypeExcludes;
        case ts.SyntaxKind.ObjectLiteralExpression:
            return ts.TransformFlags.ObjectLiteralExcludes;
        case ts.SyntaxKind.CatchClause:
            return ts.TransformFlags.CatchClauseExcludes;
        case ts.SyntaxKind.ObjectBindingPattern:
        case ts.SyntaxKind.ArrayBindingPattern:
            return ts.TransformFlags.BindingPatternExcludes;
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.SatisfiesExpression:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.PartiallyEmittedExpression:
        case ts.SyntaxKind.ParenthesizedExpression:
        case ts.SyntaxKind.SuperKeyword:
            return ts.TransformFlags.OuterExpressionExcludes;
        case ts.SyntaxKind.PropertyAccessExpression:
        case ts.SyntaxKind.ElementAccessExpression:
            return ts.TransformFlags.PropertyAccessExcludes;
        default:
            return ts.TransformFlags.NodeExcludes;
    }
}

const baseFactory = ts.createBaseNodeFactory();

function makeSynthetic(node: ts.Node) {
    (node as ts.Mutable<ts.Node>).flags |= ts.NodeFlags.Synthesized;
    return node;
}

const syntheticFactory: ts.BaseNodeFactory = {
    createBaseSourceFileNode: kind => makeSynthetic(baseFactory.createBaseSourceFileNode(kind)),
    createBaseIdentifierNode: kind => makeSynthetic(baseFactory.createBaseIdentifierNode(kind)),
    createBasePrivateIdentifierNode: kind => makeSynthetic(baseFactory.createBasePrivateIdentifierNode(kind)),
    createBaseTokenNode: kind => makeSynthetic(baseFactory.createBaseTokenNode(kind)),
    createBaseNode: kind => makeSynthetic(baseFactory.createBaseNode(kind)),
};

export const factory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess, syntheticFactory);

export function createUnparsedSourceFile(text: string): ts.UnparsedSource;
export function createUnparsedSourceFile(inputFile: ts.InputFiles, type: "js" | "dts", stripInternal?: boolean): ts.UnparsedSource;
export function createUnparsedSourceFile(text: string, mapPath: string | undefined, map: string | undefined): ts.UnparsedSource;
export function createUnparsedSourceFile(textOrInputFiles: string | ts.InputFiles, mapPathOrType?: string, mapTextOrStripInternal?: string | boolean): ts.UnparsedSource {
    let stripInternal: boolean | undefined;
    let bundleFileInfo: ts.BundleFileInfo | undefined;
    let fileName: string;
    let text: string | undefined;
    let length: number | (() => number);
    let sourceMapPath: string | undefined;
    let sourceMapText: string | undefined;
    let getText: (() => string) | undefined;
    let getSourceMapText: (() => string | undefined) | undefined;
    let oldFileOfCurrentEmit: boolean | undefined;

    if (!ts.isString(textOrInputFiles)) {
        ts.Debug.assert(mapPathOrType === "js" || mapPathOrType === "dts");
        fileName = (mapPathOrType === "js" ? textOrInputFiles.javascriptPath : textOrInputFiles.declarationPath) || "";
        sourceMapPath = mapPathOrType === "js" ? textOrInputFiles.javascriptMapPath : textOrInputFiles.declarationMapPath;
        getText = () => mapPathOrType === "js" ? textOrInputFiles.javascriptText : textOrInputFiles.declarationText;
        getSourceMapText = () => mapPathOrType === "js" ? textOrInputFiles.javascriptMapText : textOrInputFiles.declarationMapText;
        length = () => getText!().length;
        if (textOrInputFiles.buildInfo && textOrInputFiles.buildInfo.bundle) {
            ts.Debug.assert(mapTextOrStripInternal === undefined || typeof mapTextOrStripInternal === "boolean");
            stripInternal = mapTextOrStripInternal;
            bundleFileInfo = mapPathOrType === "js" ? textOrInputFiles.buildInfo.bundle.js : textOrInputFiles.buildInfo.bundle.dts;
            oldFileOfCurrentEmit = textOrInputFiles.oldFileOfCurrentEmit;
        }
    }
    else {
        fileName = "";
        text = textOrInputFiles;
        length = textOrInputFiles.length;
        sourceMapPath = mapPathOrType;
        sourceMapText = mapTextOrStripInternal as string;
    }
    const node = oldFileOfCurrentEmit ?
        parseOldFileOfCurrentEmit(ts.Debug.checkDefined(bundleFileInfo)) :
        parseUnparsedSourceFile(bundleFileInfo, stripInternal, length);
    node.fileName = fileName;
    node.sourceMapPath = sourceMapPath;
    node.oldFileOfCurrentEmit = oldFileOfCurrentEmit;
    if (getText && getSourceMapText) {
        Object.defineProperty(node, "text", { get: getText });
        Object.defineProperty(node, "sourceMapText", { get: getSourceMapText });
    }
    else {
        ts.Debug.assert(!oldFileOfCurrentEmit);
        node.text = text ?? "";
        node.sourceMapText = sourceMapText;
    }

    return node;
}

function parseUnparsedSourceFile(bundleFileInfo: ts.BundleFileInfo | undefined, stripInternal: boolean | undefined, length: number | (() => number)) {
    let prologues: ts.UnparsedPrologue[] | undefined;
    let helpers: ts.UnscopedEmitHelper[] | undefined;
    let referencedFiles: ts.FileReference[] | undefined;
    let typeReferenceDirectives: ts.FileReference[] | undefined;
    let libReferenceDirectives: ts.FileReference[] | undefined;
    let prependChildren: ts.UnparsedTextLike[] | undefined;
    let texts: ts.UnparsedSourceText[] | undefined;
    let hasNoDefaultLib: boolean | undefined;

    for (const section of bundleFileInfo ? bundleFileInfo.sections : ts.emptyArray) {
        switch (section.kind) {
            case ts.BundleFileSectionKind.Prologue:
                prologues = ts.append(prologues, ts.setTextRange(factory.createUnparsedPrologue(section.data), section));
                break;
            case ts.BundleFileSectionKind.EmitHelpers:
                helpers = ts.append(helpers, ts.getAllUnscopedEmitHelpers().get(section.data)!);
                break;
            case ts.BundleFileSectionKind.NoDefaultLib:
                hasNoDefaultLib = true;
                break;
            case ts.BundleFileSectionKind.Reference:
                referencedFiles = ts.append(referencedFiles, { pos: -1, end: -1, fileName: section.data });
                break;
            case ts.BundleFileSectionKind.Type:
                typeReferenceDirectives = ts.append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data });
                break;
            case ts.BundleFileSectionKind.TypeResolutionModeImport:
                typeReferenceDirectives = ts.append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data, resolutionMode: ts.ModuleKind.ESNext });
                break;
            case ts.BundleFileSectionKind.TypeResolutionModeRequire:
                typeReferenceDirectives = ts.append(typeReferenceDirectives, { pos: -1, end: -1, fileName: section.data, resolutionMode: ts.ModuleKind.CommonJS });
                break;
            case ts.BundleFileSectionKind.Lib:
                libReferenceDirectives = ts.append(libReferenceDirectives, { pos: -1, end: -1, fileName: section.data });
                break;
            case ts.BundleFileSectionKind.Prepend:
                let prependTexts: ts.UnparsedTextLike[] | undefined;
                for (const text of section.texts) {
                    if (!stripInternal || text.kind !== ts.BundleFileSectionKind.Internal) {
                        prependTexts = ts.append(prependTexts, ts.setTextRange(factory.createUnparsedTextLike(text.data, text.kind === ts.BundleFileSectionKind.Internal), text));
                    }
                }
                prependChildren = ts.addRange(prependChildren, prependTexts);
                texts = ts.append(texts, factory.createUnparsedPrepend(section.data, prependTexts ?? ts.emptyArray));
                break;
            case ts.BundleFileSectionKind.Internal:
                if (stripInternal) {
                    if (!texts) texts = [];
                    break;
                }
                // falls through

            case ts.BundleFileSectionKind.Text:
                texts = ts.append(texts, ts.setTextRange(factory.createUnparsedTextLike(section.data, section.kind === ts.BundleFileSectionKind.Internal), section));
                break;
            default:
                ts.Debug.assertNever(section);
        }
    }

    if (!texts) {
        const textNode = factory.createUnparsedTextLike(/*data*/ undefined, /*internal*/ false);
        ts.setTextRangePosWidth(textNode, 0, typeof length === "function" ? length() : length);
        texts = [textNode];
    }

    const node = ts.parseNodeFactory.createUnparsedSource(prologues ?? ts.emptyArray, /*syntheticReferences*/ undefined, texts);
    ts.setEachParent(prologues, node);
    ts.setEachParent(texts, node);
    ts.setEachParent(prependChildren, node);
    node.hasNoDefaultLib = hasNoDefaultLib;
    node.helpers = helpers;
    node.referencedFiles = referencedFiles || ts.emptyArray;
    node.typeReferenceDirectives = typeReferenceDirectives;
    node.libReferenceDirectives = libReferenceDirectives || ts.emptyArray;
    return node;
}

function parseOldFileOfCurrentEmit(bundleFileInfo: ts.BundleFileInfo) {
    let texts: ts.UnparsedTextLike[] | undefined;
    let syntheticReferences: ts.UnparsedSyntheticReference[] | undefined;
    for (const section of bundleFileInfo.sections) {
        switch (section.kind) {
            case ts.BundleFileSectionKind.Internal:
            case ts.BundleFileSectionKind.Text:
                texts = ts.append(texts, ts.setTextRange(factory.createUnparsedTextLike(section.data, section.kind === ts.BundleFileSectionKind.Internal), section));
                break;

            case ts.BundleFileSectionKind.NoDefaultLib:
            case ts.BundleFileSectionKind.Reference:
            case ts.BundleFileSectionKind.Type:
            case ts.BundleFileSectionKind.TypeResolutionModeImport:
            case ts.BundleFileSectionKind.TypeResolutionModeRequire:
            case ts.BundleFileSectionKind.Lib:
                syntheticReferences = ts.append(syntheticReferences, ts.setTextRange(factory.createUnparsedSyntheticReference(section), section));
                break;

            // Ignore
            case ts.BundleFileSectionKind.Prologue:
            case ts.BundleFileSectionKind.EmitHelpers:
            case ts.BundleFileSectionKind.Prepend:
                break;

            default:
                ts.Debug.assertNever(section);
        }
    }

    const node = factory.createUnparsedSource(ts.emptyArray, syntheticReferences, texts ?? ts.emptyArray);
    ts.setEachParent(syntheticReferences, node);
    ts.setEachParent(texts, node);
    node.helpers = ts.map(bundleFileInfo.sources && bundleFileInfo.sources.helpers, name => ts.getAllUnscopedEmitHelpers().get(name)!);
    return node;
}

// TODO(rbuckton): Move part of this to factory
export function createInputFiles(
    javascriptText: string,
    declarationText: string
): ts.InputFiles;
export function createInputFiles(
    javascriptText: string,
    declarationText: string,
    javascriptMapPath: string | undefined,
    javascriptMapText: string | undefined,
    declarationMapPath: string | undefined,
    declarationMapText: string | undefined
): ts.InputFiles;
export function createInputFiles(
    readFileText: (path: string) => string | undefined,
    javascriptPath: string,
    javascriptMapPath: string | undefined,
    declarationPath: string,
    declarationMapPath: string | undefined,
    buildInfoPath: string | undefined
): ts.InputFiles;
export function createInputFiles(
    javascriptTextOrReadFileText: string | ((path: string) => string | undefined),
    declarationTextOrJavascriptPath: string,
    javascriptMapPath?: string,
    javascriptMapTextOrDeclarationPath?: string,
    declarationMapPath?: string,
    declarationMapTextOrBuildInfoPath?: string,
): ts.InputFiles {
    return !ts.isString(javascriptTextOrReadFileText) ?
        createInputFilesWithFilePaths(
            javascriptTextOrReadFileText,
            declarationTextOrJavascriptPath,
            javascriptMapPath,
            javascriptMapTextOrDeclarationPath!,
            declarationMapPath,
            declarationMapTextOrBuildInfoPath,
        ) :
        createInputFilesWithFileTexts(
            /*javascriptPath*/ undefined,
            javascriptTextOrReadFileText,
            javascriptMapPath,
            javascriptMapTextOrDeclarationPath,
            /*declarationPath*/ undefined,
            declarationTextOrJavascriptPath,
            declarationMapPath,
            declarationMapTextOrBuildInfoPath,
        );
}
/*@internal*/
export function createInputFilesWithFilePaths(
    readFileText: (path: string) => string | undefined,
    javascriptPath: string,
    javascriptMapPath: string | undefined,
    declarationPath: string,
    declarationMapPath: string | undefined,
    buildInfoPath: string | undefined,
    host?: ts.CompilerHost,
    options?: ts.CompilerOptions,
): ts.InputFiles {
    const node = ts.parseNodeFactory.createInputFiles();
    node.javascriptPath = javascriptPath;
    node.javascriptMapPath = javascriptMapPath;
    node.declarationPath = declarationPath;
    node.declarationMapPath = declarationMapPath;
    node.buildInfoPath = buildInfoPath;
    const cache = new ts.Map<string, string | false>();
    const textGetter = (path: string | undefined) => {
        if (path === undefined) return undefined;
        let value = cache.get(path);
        if (value === undefined) {
            value = readFileText(path);
            cache.set(path, value !== undefined ? value : false);
        }
        return value !== false ? value as string : undefined;
    };
    const definedTextGetter = (path: string) => {
        const result = textGetter(path);
        return result !== undefined ? result : `/* Input file ${path} was missing */\r\n`;
    };
    let buildInfo: ts.BuildInfo | false;
    const getAndCacheBuildInfo = () => {
        if (buildInfo === undefined && buildInfoPath) {
            if (host?.getBuildInfo) {
                buildInfo = host.getBuildInfo(buildInfoPath, options!.configFilePath) ?? false;
            }
            else {
                const result = textGetter(buildInfoPath);
                buildInfo = result !== undefined ? ts.getBuildInfo(buildInfoPath, result) ?? false : false;
            }
        }
        return buildInfo || undefined;
    };
    Object.defineProperties(node, {
        javascriptText: { get: () => definedTextGetter(javascriptPath) },
        javascriptMapText: { get: () => textGetter(javascriptMapPath) }, // TODO:: if there is inline sourceMap in jsFile, use that
        declarationText: { get: () => definedTextGetter(ts.Debug.checkDefined(declarationPath)) },
        declarationMapText: { get: () => textGetter(declarationMapPath) }, // TODO:: if there is inline sourceMap in dtsFile, use that
        buildInfo: { get: getAndCacheBuildInfo },
    });
    return node;
}
/*@internal*/
export function createInputFilesWithFileTexts(
    javascriptPath: string | undefined,
    javascriptText: string,
    javascriptMapPath: string | undefined,
    javascriptMapText: string | undefined,
    declarationPath: string | undefined,
    declarationText: string,
    declarationMapPath: string | undefined,
    declarationMapText: string | undefined,
    buildInfoPath?: string,
    buildInfo?: ts.BuildInfo,
    oldFileOfCurrentEmit?: boolean,
): ts.InputFiles {
    const node = ts.parseNodeFactory.createInputFiles();
    node.javascriptPath = javascriptPath;
    node.javascriptText = javascriptText;
    node.javascriptMapPath = javascriptMapPath;
    node.javascriptMapText = javascriptMapText;
    node.declarationPath = declarationPath;
    node.declarationText = declarationText;
    node.declarationMapPath = declarationMapPath;
    node.declarationMapText = declarationMapText;
    node.buildInfoPath = buildInfoPath;
    node.buildInfo = buildInfo;
    node.oldFileOfCurrentEmit = oldFileOfCurrentEmit;
    return node;
}

let SourceMapSource: new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => ts.SourceMapSource;

/**
 * Create an external source map source file reference
 */
export function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): ts.SourceMapSource {
    return new (SourceMapSource || (SourceMapSource = ts.objectAllocator.getSourceMapSourceConstructor()))(fileName, text, skipTrivia);
}

// Utilities

export function setOriginalNode<T extends ts.Node>(node: T, original: ts.Node | undefined): T {
    node.original = original;
    if (original) {
        const emitNode = original.emitNode;
        if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
    }
    return node;
}

function mergeEmitNode(sourceEmitNode: ts.EmitNode, destEmitNode: ts.EmitNode | undefined) {
    const {
        flags,
        leadingComments,
        trailingComments,
        commentRange,
        sourceMapRange,
        tokenSourceMapRanges,
        constantValue,
        helpers,
        startsOnNewLine,
        snippetElement,
    } = sourceEmitNode;
    if (!destEmitNode) destEmitNode = {} as ts.EmitNode;
    // We are using `.slice()` here in case `destEmitNode.leadingComments` is pushed to later.
    if (leadingComments) destEmitNode.leadingComments = ts.addRange(leadingComments.slice(), destEmitNode.leadingComments);
    if (trailingComments) destEmitNode.trailingComments = ts.addRange(trailingComments.slice(), destEmitNode.trailingComments);
    if (flags) destEmitNode.flags = flags & ~ts.EmitFlags.Immutable;
    if (commentRange) destEmitNode.commentRange = commentRange;
    if (sourceMapRange) destEmitNode.sourceMapRange = sourceMapRange;
    if (tokenSourceMapRanges) destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges!);
    if (constantValue !== undefined) destEmitNode.constantValue = constantValue;
    if (helpers) {
        for (const helper of helpers) {
            destEmitNode.helpers = ts.appendIfUnique(destEmitNode.helpers, helper);
        }
    }
    if (startsOnNewLine !== undefined) destEmitNode.startsOnNewLine = startsOnNewLine;
    if (snippetElement !== undefined) destEmitNode.snippetElement = snippetElement;
    return destEmitNode;
}

function mergeTokenSourceMapRanges(sourceRanges: (ts.TextRange | undefined)[], destRanges: (ts.TextRange | undefined)[]) {
    if (!destRanges) destRanges = [];
    for (const key in sourceRanges) {
        destRanges[key] = sourceRanges[key];
    }
    return destRanges;
}
}
