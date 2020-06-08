namespace ts {
    // The following are deprecations for the public API. Deprecated exports are removed from the compiler itself
    // and compatible implementations are added here, along with an appropriate deprecation warning using
    // the `@deprecated` JSDoc tag as well as the `Debug.deprecateExport` API.
    //
    // Deprecations fall into one of three categories:
    //
    //   * "soft" - Soft deprecations are indicated with the `@deprecated` JSDoc Tag.
    //   * "warn" - Warning deprecations are indicated with the `@deprecated` JSDoc Tag and a diagnostic message (assuming a compatible host)
    //   * "error" - Error deprecations are indicated with the `@deprecated` JSDoc tag and will throw a `TypeError` when invoked.

    // DEPRECATION: Node factory top-level exports
    // DEPRECATION PLAN:
    //     - soft: 4.0
    //     - warn: 4.1
    //     - error: TBD
    // #region Node factory top-level exports

    // #region export const { ... } = factory;
    // NOTE: These exports are deprecated in favor of using a `NodeFactory` instance and exist here purely for backwards compatibility reasons.
    export const {
        /**
         * @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead.
         */
        createNodeArray,
        /**
         * @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead.
         */
        createNumericLiteral,
        /**
         * @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead.
         */
        createBigIntLiteral,
        /**
         * @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead.
         */
        createStringLiteral,
        /**
         * @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead.
         */
        createStringLiteralFromNode,
        /**
         * @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead.
         */
        createRegularExpressionLiteral,
        /**
         * @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead.
         */
        createLoopVariable,
        /**
         * @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead.
         */
        createUniqueName,
        /**
         * @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead.
         */
        createPrivateIdentifier,
        /**
         * @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead.
         */
        createSuper,
        /**
         * @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead.
         */
        createThis,
        /**
         * @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead.
         */
        createNull,
        /**
         * @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead.
         */
        createTrue,
        /**
         * @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead.
         */
        createFalse,
        /**
         * @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead.
         */
        createModifier,
        /**
         * @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead.
         */
        createModifiersFromModifierFlags,
        /**
         * @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead.
         */
        createQualifiedName,
        /**
         * @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead.
         */
        updateQualifiedName,
        /**
         * @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead.
         */
        createComputedPropertyName,
        /**
         * @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead.
         */
        updateComputedPropertyName,
        /**
         * @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead.
         */
        createTypeParameterDeclaration,
        /**
         * @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead.
         */
        updateTypeParameterDeclaration,
        /**
         * @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead.
         */
        createParameterDeclaration: createParameter,
        /**
         * @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead.
         */
        updateParameterDeclaration: updateParameter,
        /**
         * @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead.
         */
        createDecorator,
        /**
         * @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead.
         */
        updateDecorator,
        /**
         * @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead.
         */
        createPropertyDeclaration: createProperty,
        /**
         * @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead.
         */
        updatePropertyDeclaration: updateProperty,
        /**
         * @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead.
         */
        createMethodDeclaration: createMethod,
        /**
         * @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead.
         */
        updateMethodDeclaration: updateMethod,
        /**
         * @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead.
         */
        createConstructorDeclaration: createConstructor,
        /**
         * @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead.
         */
        updateConstructorDeclaration: updateConstructor,
        /**
         * @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead.
         */
        createGetAccessorDeclaration: createGetAccessor,
        /**
         * @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead.
         */
        updateGetAccessorDeclaration: updateGetAccessor,
        /**
         * @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead.
         */
        createSetAccessorDeclaration: createSetAccessor,
        /**
         * @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead.
         */
        updateSetAccessorDeclaration: updateSetAccessor,
        /**
         * @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead.
         */
        createCallSignature,
        /**
         * @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead.
         */
        updateCallSignature,
        /**
         * @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead.
         */
        createConstructSignature,
        /**
         * @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead.
         */
        updateConstructSignature,
        /**
         * @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead.
         */
        updateIndexSignature,
        /**
         * @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead.
         */
        createKeywordTypeNode,
        /**
         * @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead.
         */
        createTypePredicateNode: createTypePredicateNodeWithModifier,
        /**
         * @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead.
         */
        updateTypePredicateNode: updateTypePredicateNodeWithModifier,
        /**
         * @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead.
         */
        createTypeReferenceNode,
        /**
         * @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead.
         */
        updateTypeReferenceNode,
        /**
         * @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead.
         */
        createFunctionTypeNode,
        /**
         * @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead.
         */
        updateFunctionTypeNode,
        /**
         * @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead.
         */
        createConstructorTypeNode,
        /**
         * @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead.
         */
        updateConstructorTypeNode,
        /**
         * @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead.
         */
        createTypeQueryNode,
        /**
         * @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead.
         */
        updateTypeQueryNode,
        /**
         * @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead.
         */
        createTypeLiteralNode,
        /**
         * @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead.
         */
        updateTypeLiteralNode,
        /**
         * @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead.
         */
        createArrayTypeNode,
        /**
         * @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead.
         */
        updateArrayTypeNode,
        /**
         * @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead.
         */
        createTupleTypeNode,
        /**
         * @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead.
         */
        updateTupleTypeNode,
        /**
         * @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead.
         */
        createOptionalTypeNode,
        /**
         * @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead.
         */
        updateOptionalTypeNode,
        /**
         * @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead.
         */
        createRestTypeNode,
        /**
         * @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead.
         */
        updateRestTypeNode,
        /**
         * @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead.
         */
        createUnionTypeNode,
        /**
         * @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead.
         */
        updateUnionTypeNode,
        /**
         * @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead.
         */
        createIntersectionTypeNode,
        /**
         * @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead.
         */
        updateIntersectionTypeNode,
        /**
         * @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead.
         */
        createConditionalTypeNode,
        /**
         * @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead.
         */
        updateConditionalTypeNode,
        /**
         * @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead.
         */
        createInferTypeNode,
        /**
         * @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead.
         */
        updateInferTypeNode,
        /**
         * @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead.
         */
        createImportTypeNode,
        /**
         * @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead.
         */
        updateImportTypeNode,
        /**
         * @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead.
         */
        createParenthesizedType,
        /**
         * @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead.
         */
        updateParenthesizedType,
        /**
         * @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead.
         */
        createThisTypeNode,
        /**
         * @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead.
         */
        updateTypeOperatorNode,
        /**
         * @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead.
         */
        createIndexedAccessTypeNode,
        /**
         * @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead.
         */
        updateIndexedAccessTypeNode,
        /**
         * @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead.
         */
        createMappedTypeNode,
        /**
         * @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead.
         */
        updateMappedTypeNode,
        /**
         * @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead.
         */
        createLiteralTypeNode,
        /**
         * @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead.
         */
        updateLiteralTypeNode,
        /**
         * @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead.
         */
        createObjectBindingPattern,
        /**
         * @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead.
         */
        updateObjectBindingPattern,
        /**
         * @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead.
         */
        createArrayBindingPattern,
        /**
         * @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead.
         */
        updateArrayBindingPattern,
        /**
         * @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead.
         */
        createBindingElement,
        /**
         * @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead.
         */
        updateBindingElement,
        /**
         * @deprecated Use `factory.createArrayLiteral` or the factory supplied by your transformation context instead.
         */
        createArrayLiteral,
        /**
         * @deprecated Use `factory.updateArrayLiteral` or the factory supplied by your transformation context instead.
         */
        updateArrayLiteral,
        /**
         * @deprecated Use `factory.createObjectLiteral` or the factory supplied by your transformation context instead.
         */
        createObjectLiteral,
        /**
         * @deprecated Use `factory.updateObjectLiteral` or the factory supplied by your transformation context instead.
         */
        updateObjectLiteral,
        /**
         * @deprecated Use `factory.createPropertyAccess` or the factory supplied by your transformation context instead.
         */
        createPropertyAccess,
        /**
         * @deprecated Use `factory.updatePropertyAccess` or the factory supplied by your transformation context instead.
         */
        updatePropertyAccess,
        /**
         * @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead.
         */
        createPropertyAccessChain,
        /**
         * @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead.
         */
        updatePropertyAccessChain,
        /**
         * @deprecated Use `factory.createElementAccess` or the factory supplied by your transformation context instead.
         */
        createElementAccess,
        /**
         * @deprecated Use `factory.updateElementAccess` or the factory supplied by your transformation context instead.
         */
        updateElementAccess,
        /**
         * @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead.
         */
        createElementAccessChain,
        /**
         * @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead.
         */
        updateElementAccessChain,
        /**
         * @deprecated Use `factory.createCall` or the factory supplied by your transformation context instead.
         */
        createCall,
        /**
         * @deprecated Use `factory.updateCall` or the factory supplied by your transformation context instead.
         */
        updateCall,
        /**
         * @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead.
         */
        createCallChain,
        /**
         * @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead.
         */
        updateCallChain,
        /**
         * @deprecated Use `factory.createNew` or the factory supplied by your transformation context instead.
         */
        createNew,
        /**
         * @deprecated Use `factory.updateNew` or the factory supplied by your transformation context instead.
         */
        updateNew,
        /**
         * @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead.
         */
        createTypeAssertion,
        /**
         * @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead.
         */
        updateTypeAssertion,
        /**
         * @deprecated Use `factory.createParen` or the factory supplied by your transformation context instead.
         */
        createParen,
        /**
         * @deprecated Use `factory.updateParen` or the factory supplied by your transformation context instead.
         */
        updateParen,
        /**
         * @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead.
         */
        createFunctionExpression,
        /**
         * @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead.
         */
        updateFunctionExpression,
        /**
         * @deprecated Use `factory.createDelete` or the factory supplied by your transformation context instead.
         */
        createDelete,
        /**
         * @deprecated Use `factory.updateDelete` or the factory supplied by your transformation context instead.
         */
        updateDelete,
        /**
         * @deprecated Use `factory.createTypeOf` or the factory supplied by your transformation context instead.
         */
        createTypeOf,
        /**
         * @deprecated Use `factory.updateTypeOf` or the factory supplied by your transformation context instead.
         */
        updateTypeOf,
        /**
         * @deprecated Use `factory.createVoid` or the factory supplied by your transformation context instead.
         */
        createVoid,
        /**
         * @deprecated Use `factory.updateVoid` or the factory supplied by your transformation context instead.
         */
        updateVoid,
        /**
         * @deprecated Use `factory.createAwait` or the factory supplied by your transformation context instead.
         */
        createAwait,
        /**
         * @deprecated Use `factory.updateAwait` or the factory supplied by your transformation context instead.
         */
        updateAwait,
        /**
         * @deprecated Use `factory.createPrefix` or the factory supplied by your transformation context instead.
         */
        createPrefix,
        /**
         * @deprecated Use `factory.updatePrefix` or the factory supplied by your transformation context instead.
         */
        updatePrefix,
        /**
         * @deprecated Use `factory.createPostfix` or the factory supplied by your transformation context instead.
         */
        createPostfix,
        /**
         * @deprecated Use `factory.updatePostfix` or the factory supplied by your transformation context instead.
         */
        updatePostfix,
        /**
         * @deprecated Use `factory.createBinary` or the factory supplied by your transformation context instead.
         */
        createBinary,
        /**
         * @deprecated Use `factory.updateConditional` or the factory supplied by your transformation context instead.
         */
        updateConditional,
        /**
         * @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead.
         */
        createTemplateExpression,
        /**
         * @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead.
         */
        updateTemplateExpression,
        /**
         * @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead.
         */
        createTemplateHead,
        /**
         * @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead.
         */
        createTemplateMiddle,
        /**
         * @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead.
         */
        createTemplateTail,
        /**
         * @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead.
         */
        createNoSubstitutionTemplateLiteral,
        /**
         * @deprecated Use `factory.updateYield` or the factory supplied by your transformation context instead.
         */
        updateYield,
        /**
         * @deprecated Use `factory.createSpread` or the factory supplied by your transformation context instead.
         */
        createSpread,
        /**
         * @deprecated Use `factory.updateSpread` or the factory supplied by your transformation context instead.
         */
        updateSpread,
        /**
         * @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead.
         */
        createOmittedExpression,
        /**
         * @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead.
         */
        createAsExpression,
        /**
         * @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead.
         */
        updateAsExpression,
        /**
         * @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead.
         */
        createNonNullExpression,
        /**
         * @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead.
         */
        updateNonNullExpression,
        /**
         * @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead.
         */
        createNonNullChain,
        /**
         * @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead.
         */
        updateNonNullChain,
        /**
         * @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead.
         */
        createMetaProperty,
        /**
         * @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead.
         */
        updateMetaProperty,
        /**
         * @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead.
         */
        createTemplateSpan,
        /**
         * @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead.
         */
        updateTemplateSpan,
        /**
         * @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead.
         */
        createSemicolonClassElement,
        /**
         * @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead.
         */
        createBlock,
        /**
         * @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead.
         */
        updateBlock,
        /**
         * @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead.
         */
        createVariableStatement,
        /**
         * @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead.
         */
        updateVariableStatement,
        /**
         * @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead.
         */
        createEmptyStatement,
        /**
         * @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead.
         */
        createExpressionStatement,
        /**
         * @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead.
         */
        updateExpressionStatement,
        /** @deprecated Use `createExpressionStatement` instead. */
        /**
         * @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead.
         */
        createExpressionStatement: createStatement,
        /** @deprecated Use `updateExpressionStatement` instead. */
        /**
         * @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead.
         */
        updateExpressionStatement: updateStatement,
        /**
         * @deprecated Use `factory.createIf` or the factory supplied by your transformation context instead.
         */
        createIf,
        /**
         * @deprecated Use `factory.updateIf` or the factory supplied by your transformation context instead.
         */
        updateIf,
        /**
         * @deprecated Use `factory.createDo` or the factory supplied by your transformation context instead.
         */
        createDo,
        /**
         * @deprecated Use `factory.updateDo` or the factory supplied by your transformation context instead.
         */
        updateDo,
        /**
         * @deprecated Use `factory.createWhile` or the factory supplied by your transformation context instead.
         */
        createWhile,
        /**
         * @deprecated Use `factory.updateWhile` or the factory supplied by your transformation context instead.
         */
        updateWhile,
        /**
         * @deprecated Use `factory.createFor` or the factory supplied by your transformation context instead.
         */
        createFor,
        /**
         * @deprecated Use `factory.updateFor` or the factory supplied by your transformation context instead.
         */
        updateFor,
        /**
         * @deprecated Use `factory.createForIn` or the factory supplied by your transformation context instead.
         */
        createForIn,
        /**
         * @deprecated Use `factory.updateForIn` or the factory supplied by your transformation context instead.
         */
        updateForIn,
        /**
         * @deprecated Use `factory.createForOf` or the factory supplied by your transformation context instead.
         */
        createForOf,
        /**
         * @deprecated Use `factory.updateForOf` or the factory supplied by your transformation context instead.
         */
        updateForOf,
        /**
         * @deprecated Use `factory.createContinue` or the factory supplied by your transformation context instead.
         */
        createContinue,
        /**
         * @deprecated Use `factory.updateContinue` or the factory supplied by your transformation context instead.
         */
        updateContinue,
        /**
         * @deprecated Use `factory.createBreak` or the factory supplied by your transformation context instead.
         */
        createBreak,
        /**
         * @deprecated Use `factory.updateBreak` or the factory supplied by your transformation context instead.
         */
        updateBreak,
        /**
         * @deprecated Use `factory.createReturn` or the factory supplied by your transformation context instead.
         */
        createReturn,
        /**
         * @deprecated Use `factory.updateReturn` or the factory supplied by your transformation context instead.
         */
        updateReturn,
        /**
         * @deprecated Use `factory.createWith` or the factory supplied by your transformation context instead.
         */
        createWith,
        /**
         * @deprecated Use `factory.updateWith` or the factory supplied by your transformation context instead.
         */
        updateWith,
        /**
         * @deprecated Use `factory.createSwitch` or the factory supplied by your transformation context instead.
         */
        createSwitch,
        /**
         * @deprecated Use `factory.updateSwitch` or the factory supplied by your transformation context instead.
         */
        updateSwitch,
        /**
         * @deprecated Use `factory.createLabel` or the factory supplied by your transformation context instead.
         */
        createLabel,
        /**
         * @deprecated Use `factory.updateLabel` or the factory supplied by your transformation context instead.
         */
        updateLabel,
        /**
         * @deprecated Use `factory.createThrow` or the factory supplied by your transformation context instead.
         */
        createThrow,
        /**
         * @deprecated Use `factory.updateThrow` or the factory supplied by your transformation context instead.
         */
        updateThrow,
        /**
         * @deprecated Use `factory.createTry` or the factory supplied by your transformation context instead.
         */
        createTry,
        /**
         * @deprecated Use `factory.updateTry` or the factory supplied by your transformation context instead.
         */
        updateTry,
        /**
         * @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead.
         */
        createDebuggerStatement,
        /**
         * @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead.
         */
        createVariableDeclarationList,
        /**
         * @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead.
         */
        updateVariableDeclarationList,
        /**
         * @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead.
         */
        createFunctionDeclaration,
        /**
         * @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead.
         */
        updateFunctionDeclaration,
        /**
         * @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead.
         */
        createClassDeclaration,
        /**
         * @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead.
         */
        updateClassDeclaration,
        /**
         * @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead.
         */
        createInterfaceDeclaration,
        /**
         * @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead.
         */
        updateInterfaceDeclaration,
        /**
         * @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead.
         */
        createTypeAliasDeclaration,
        /**
         * @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead.
         */
        updateTypeAliasDeclaration,
        /**
         * @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead.
         */
        createEnumDeclaration,
        /**
         * @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead.
         */
        updateEnumDeclaration,
        /**
         * @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead.
         */
        createModuleDeclaration,
        /**
         * @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead.
         */
        updateModuleDeclaration,
        /**
         * @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead.
         */
        createModuleBlock,
        /**
         * @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead.
         */
        updateModuleBlock,
        /**
         * @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead.
         */
        createCaseBlock,
        /**
         * @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead.
         */
        updateCaseBlock,
        /**
         * @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead.
         */
        createNamespaceExportDeclaration,
        /**
         * @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead.
         */
        updateNamespaceExportDeclaration,
        /**
         * @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead.
         */
        createImportEqualsDeclaration,
        /**
         * @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead.
         */
        updateImportEqualsDeclaration,
        /**
         * @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead.
         */
        createImportDeclaration,
        /**
         * @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead.
         */
        updateImportDeclaration,
        /**
         * @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead.
         */
        createNamespaceImport,
        /**
         * @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead.
         */
        updateNamespaceImport,
        /**
         * @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead.
         */
        createNamedImports,
        /**
         * @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead.
         */
        updateNamedImports,
        /**
         * @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead.
         */
        createImportSpecifier,
        /**
         * @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead.
         */
        updateImportSpecifier,
        /**
         * @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead.
         */
        createExportAssignment,
        /**
         * @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead.
         */
        updateExportAssignment,
        /**
         * @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead.
         */
        createNamedExports,
        /**
         * @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead.
         */
        updateNamedExports,
        /**
         * @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead.
         */
        createExportSpecifier,
        /**
         * @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead.
         */
        updateExportSpecifier,
        /**
         * @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead.
         */
        createExternalModuleReference,
        /**
         * @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead.
         */
        updateExternalModuleReference,
        /**
         * @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead.
         */
        createJSDocTypeExpression,
        /**
         * @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead.
         */
        createJSDocTypeTag,
        /**
         * @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead.
         */
        createJSDocReturnTag,
        /**
         * @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead.
         */
        createJSDocThisTag,
        /**
         * @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead.
         */
        createJSDocComment,
        /**
         * @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead.
         */
        createJSDocParameterTag,
        /**
         * @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead.
         */
        createJSDocClassTag,
        /**
         * @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead.
         */
        createJSDocAugmentsTag,
        /**
         * @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead.
         */
        createJSDocEnumTag,
        /**
         * @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead.
         */
        createJSDocTemplateTag,
        /**
         * @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead.
         */
        createJSDocTypedefTag,
        /**
         * @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead.
         */
        createJSDocCallbackTag,
        /**
         * @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead.
         */
        createJSDocSignature,
        /**
         * @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead.
         */
        createJSDocPropertyTag,
        /**
         * @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead.
         */
        createJSDocTypeLiteral,
        /**
         * @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead.
         */
        createJSDocImplementsTag,
        /**
         * @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead.
         */
        createJSDocAuthorTag,
        /**
         * @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead.
         */
        createJSDocPublicTag,
        /**
         * @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead.
         */
        createJSDocPrivateTag,
        /**
         * @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead.
         */
        createJSDocProtectedTag,
        /**
         * @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead.
         */
        createJSDocReadonlyTag,
        /**
         * @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead.
         */
        createJSDocUnknownTag: createJSDocTag,
        /**
         * @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead.
         */
        createJsxElement,
        /**
         * @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead.
         */
        updateJsxElement,
        /**
         * @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead.
         */
        createJsxSelfClosingElement,
        /**
         * @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead.
         */
        updateJsxSelfClosingElement,
        /**
         * @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead.
         */
        createJsxOpeningElement,
        /**
         * @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead.
         */
        updateJsxOpeningElement,
        /**
         * @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead.
         */
        createJsxClosingElement,
        /**
         * @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead.
         */
        updateJsxClosingElement,
        /**
         * @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead.
         */
        createJsxFragment,
        /**
         * @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead.
         */
        createJsxText,
        /**
         * @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead.
         */
        updateJsxText,
        /**
         * @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead.
         */
        createJsxOpeningFragment,
        /**
         * @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead.
         */
        createJsxJsxClosingFragment,
        /**
         * @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead.
         */
        updateJsxFragment,
        /**
         * @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead.
         */
        createJsxAttribute,
        /**
         * @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead.
         */
        updateJsxAttribute,
        /**
         * @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead.
         */
        createJsxAttributes,
        /**
         * @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead.
         */
        updateJsxAttributes,
        /**
         * @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead.
         */
        createJsxSpreadAttribute,
        /**
         * @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead.
         */
        updateJsxSpreadAttribute,
        /**
         * @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead.
         */
        createJsxExpression,
        /**
         * @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead.
         */
        updateJsxExpression,
        /**
         * @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead.
         */
        createCaseClause,
        /**
         * @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead.
         */
        updateCaseClause,
        /**
         * @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead.
         */
        createDefaultClause,
        /**
         * @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead.
         */
        updateDefaultClause,
        /**
         * @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead.
         */
        createHeritageClause,
        /**
         * @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead.
         */
        updateHeritageClause,
        /**
         * @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead.
         */
        createCatchClause,
        /**
         * @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead.
         */
        updateCatchClause,
        /**
         * @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead.
         */
        createPropertyAssignment,
        /**
         * @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead.
         */
        updatePropertyAssignment,
        /**
         * @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead.
         */
        createShorthandPropertyAssignment,
        /**
         * @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead.
         */
        updateShorthandPropertyAssignment,
        /**
         * @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead.
         */
        createSpreadAssignment,
        /**
         * @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead.
         */
        updateSpreadAssignment,
        /**
         * @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead.
         */
        createEnumMember,
        /**
         * @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead.
         */
        updateEnumMember,
        /**
         * @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead.
         */
        updateSourceFile: updateSourceFileNode,
        /**
         * @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead.
         */
        createNotEmittedStatement,
        /**
         * @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead.
         */
        createPartiallyEmittedExpression,
        /**
         * @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead.
         */
        updatePartiallyEmittedExpression,
        /**
         * @deprecated Use `factory.createCommaList` or the factory supplied by your transformation context instead.
         */
        createCommaList,
        /**
         * @deprecated Use `factory.updateCommaList` or the factory supplied by your transformation context instead.
         */
        updateCommaList,
        /**
         * @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead.
         */
        createBundle,
        /**
         * @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead.
         */
        updateBundle,
        /**
         * @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead.
         */
        createImmediatelyInvokedFunctionExpression,
        /**
         * @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead.
         */
        createImmediatelyInvokedArrowFunction,
        /**
         * @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead.
         */
        createVoidZero,
        /**
         * @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead.
         */
        createExportDefault,
        /**
         * @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead.
         */
        createExternalModuleExport,
        /**
         * @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead.
         */
        createNamespaceExport,
        /**
         * @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead.
         */
        updateNamespaceExport,
    } = factory;
    // #endregion export const { ... } = factory;

    /**
     * @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead.
     */
    export function createToken<TKind extends SyntaxKind>(kind: TKind): Token<TKind> {
        return factory.createToken(kind);
    }

    /**
     * @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead.
     */
    export function createIdentifier(text: string) {
        return factory.createIdentifier(text, /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined);
    }

    /**
     * @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead.
     */
    export function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier {
        return factory.createTempVariable(recordTempVariable, /*reserveInNestedScopes*/ undefined);
    }

    /**
     * @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead.
     */
    export function getGeneratedNameForNode(node: Node | undefined): Identifier {
        return factory.getGeneratedNameForNode(node, /*flags*/ undefined);
    }

    /**
     * @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead.
     */
    export function createOptimisticUniqueName(text: string): Identifier {
        return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic);
    }

    /**
     * @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead.
     */
    export function createFileLevelUniqueName(text: string): Identifier {
        return factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
    }

    /**
     * @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead.
     */
    export function createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
        return factory.createIndexSignature(decorators, modifiers, parameters, type);
    }

    /**
     * @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead.
     */
    export function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode): TypePredicateNode {
        return factory.createTypePredicateNode(/*assertsModifier*/ undefined, parameterName, type);
    }

    /**
     * @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead.
     */
    export function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode): TypePredicateNode {
        return factory.updateTypePredicateNode(node, /*assertsModifier*/ undefined, parameterName, type);
    }

    /**
     * @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead.
     */
    export function createLiteral(value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
    /**
     * @deprecated Use `factory.createNumericLiteral` or `factory.createBigIntLiteral` or the factory supplied by your transformation context instead.
     */
    export function createLiteral(value: number | PseudoBigInt): NumericLiteral;
    /**
     * @deprecated Use `factory.createTrue` or `factory.createFalse` or the factory supplied by your transformation context instead.
     */
    export function createLiteral(value: boolean): BooleanLiteral;
    /**
     * @deprecated Use `factory.createStringLiteral`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead.
     */
    export function createLiteral(value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    export function createLiteral(value: string | number | PseudoBigInt | boolean | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): PrimaryExpression {
        if (typeof value === "number") {
            return factory.createNumericLiteral(value);
        }
        // eslint-disable-next-line no-in-operator
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
    }

    /**
     * @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead.
     */
    export function createMethodSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return factory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
    }

    /**
     * @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead.
     */
    export function updateMethodSignature(
        node: MethodSignature,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return factory.updateMethodSignature(node, node.modifiers, name, questionToken, typeParameters, parameters, type);
    }

    /**
     * @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead.
     */
    export function createTypeOperatorNode(type: TypeNode): TypeOperatorNode;
    /**
     * @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead.
     */
    export function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    export function createTypeOperatorNode(operatorOrType: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword | TypeNode, type?: TypeNode) {
        let operator: TypeOperatorNode["operator"];
        if (type) {
            operator = operatorOrType as TypeOperatorNode["operator"];
        }
        else {
            type = operatorOrType as TypeNode;
            operator = SyntaxKind.KeyOfKeyword;
        }
        return factory.createTypeOperatorNode(operator, type);
    }

    /** @deprecated */
    /**
     * @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead.
     */
    export function createTaggedTemplate(tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
    /**
     * @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead.
     */
    export function createTaggedTemplate(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    export function createTaggedTemplate(tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
        let typeArguments: readonly TypeNode[] | undefined;
        if (template) {
            typeArguments = typeArgumentsOrTemplate as readonly TypeNode[] | undefined;
        }
        else {
            template = typeArgumentsOrTemplate as TemplateLiteral;
        }
        return factory.createTaggedTemplate(tag, typeArguments, template);
    }

    /**
     * @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead.
     */
    export function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
    /**
     * @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead.
     */
    export function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    export function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
        let typeArguments: readonly TypeNode[] | undefined;
        if (template) {
            typeArguments = typeArgumentsOrTemplate as readonly TypeNode[] | undefined;
        }
        else {
            template = typeArgumentsOrTemplate as TemplateLiteral;
        }
        return factory.updateTaggedTemplate(node, tag, typeArguments, template);
    }

    /**
     * @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead.
     */
    export function updateBinary(node: BinaryExpression, left: Expression, right: Expression, operator: BinaryOperator | BinaryOperatorToken = node.operatorToken) {
        if (typeof operator === "number") {
            operator = operator === node.operatorToken.kind ? node.operatorToken : factory.createToken(operator);
        }
        return factory.updateBinary(node, left, operator, right);
    }

    /**
     * @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead.
     */
    export function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
    /**
     * @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead.
     */
    export function createConditional(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    export function createConditional(condition: Expression, questionTokenOrWhenTrue: QuestionToken | Expression, whenTrueOrWhenFalse: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
        return arguments.length === 5 ? factory.createConditional(condition, questionTokenOrWhenTrue as QuestionToken, whenTrueOrWhenFalse, colonToken, whenFalse!) :
            arguments.length === 3 ? factory.createConditional(condition, factory.createToken(SyntaxKind.QuestionToken), questionTokenOrWhenTrue as Expression, factory.createToken(SyntaxKind.ColonToken), whenTrueOrWhenFalse) :
            Debug.fail("Argument count mismatch");
    }

    /**
     * @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead.
     */
    export function createYield(expression?: Expression): YieldExpression;
    /**
     * @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead.
     */
    export function createYield(asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    export function createYield(asteriskTokenOrExpression?: AsteriskToken | Expression | undefined, expression?: Expression) {
        let asteriskToken: AsteriskToken | undefined;
        if (expression) {
            asteriskToken = asteriskTokenOrExpression as AsteriskToken;
        }
        else {
            expression = asteriskTokenOrExpression as Expression;
        }
        return factory.createYield(asteriskToken, expression);
    }

    /**
     * @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead.
     */
    export function createClassExpression(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return factory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }

    /**
     * @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead.
     */
    export function updateClassExpression(
        node: ClassExpression,
        modifiers: readonly Modifier[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return factory.updateClassExpression(node, /*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }

    /**
     * @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead.
     */
    export function createPropertySignature(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName | string,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer?: Expression
    ): PropertySignature {
        const node = factory.createPropertySignature(modifiers, name, questionToken, type);
        node.initializer = initializer;
        return node;
    }

    /**
     * @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead.
     */
    export function updatePropertySignature(
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
            updated.initializer = initializer;
        }
        return updated;
    }

    /**
     * @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead.
     */
    export function createExpressionWithTypeArguments(typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.createExpressionWithTypeArguments(expression, typeArguments);
    }

    /**
     * @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead.
     */
    export function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.updateExpressionWithTypeArguments(node, expression, typeArguments);
    }

    /**
     * @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead.
     */
    export function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
    /**
     * @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead.
     */
    export function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    export function createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: ConciseBody | EqualsGreaterThanToken | undefined, body?: ConciseBody) {
        return arguments.length === 6 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken | undefined, body!) :
            arguments.length === 5 ? factory.createArrowFunction(modifiers, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, equalsGreaterThanTokenOrBody as ConciseBody) :
            Debug.fail("Argument count mismatch");
    }

    /**
     * @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead.
     */
    export function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
    /**
     * @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead.
     */
    export function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    export function updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanTokenOrBody: EqualsGreaterThanToken | ConciseBody, body?: ConciseBody) {
        return arguments.length === 7 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, equalsGreaterThanTokenOrBody as EqualsGreaterThanToken, body!) :
            arguments.length === 6 ? factory.updateArrowFunction(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, equalsGreaterThanTokenOrBody as ConciseBody) :
            Debug.fail("Argument count mismatch");
    }

    /**
     * @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead.
     */
    export function createVariableDeclaration(name: string | BindingName, type?: TypeNode, initializer?: Expression): VariableDeclaration;
    /**
     * @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead.
     */
    export function createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    export function createVariableDeclaration(name: string | BindingName, exclamationTokenOrType?: ExclamationToken | TypeNode, typeOrInitializer?: TypeNode | Expression, initializer?: Expression) {
        return arguments.length === 4 ? factory.createVariableDeclaration(name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
            arguments.length >= 1 && arguments.length <= 3 ? factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
            Debug.fail("Argument count mismatch");
    }

    /**
     * @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead.
     */
    export function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    /**
     * @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead.
     */
    export function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    export function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationTokenOrType: ExclamationToken | TypeNode | undefined, typeOrInitializer: TypeNode | Expression | undefined, initializer?: Expression | undefined) {
        return arguments.length === 5 ? factory.updateVariableDeclaration(node, name, exclamationTokenOrType as ExclamationToken | undefined, typeOrInitializer as TypeNode | undefined, initializer) :
            arguments.length === 4 ? factory.updateVariableDeclaration(node, name, node.exclamationToken, exclamationTokenOrType as TypeNode | undefined, typeOrInitializer as Expression | undefined) :
            Debug.fail("Argument count mismatch");
    }

    /**
     * @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead.
     */
    export function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly = false): ImportClause {
        return factory.createImportClause(isTypeOnly, name, namedBindings);
    }

    /**
     * @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead.
     */
    export function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) {
        return factory.updateImportClause(node, isTypeOnly, name, namedBindings);
    }

    /**
     * @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead.
     */
    export function createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, isTypeOnly = false) {
        return factory.createExportDeclaration(decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier);
    }

    /**
     * @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead.
     */
    export function updateExportDeclaration(
        node: ExportDeclaration,
        decorators: readonly Decorator[] | undefined,
        modifiers: readonly Modifier[] | undefined,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier: Expression | undefined,
        isTypeOnly: boolean) {
        return factory.updateExportDeclaration(node, decorators, modifiers, isTypeOnly, exportClause, moduleSpecifier);
    }

    /**
     * @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead.
     */
    export function createJSDocParamTag(name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, comment?: string): JSDocParameterTag {
        return factory.createJSDocParameterTag(/*tagName*/ undefined, name, isBracketed, typeExpression, /*isNameFirst*/ false, comment);
    }

    /**
     * @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead.
     */
    export function createComma(left: Expression, right: Expression): Expression {
        return factory.createComma(left, right);
    }

    /**
     * @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead.
     */
    export function createLessThan(left: Expression, right: Expression): Expression {
        return factory.createLessThan(left, right);
    }

    /**
     * @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead.
     */
    export function createAssignment(left: Expression, right: Expression): BinaryExpression {
        return factory.createAssignment(left, right);
    }

    /**
     * @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead.
     */
    export function createStrictEquality(left: Expression, right: Expression): BinaryExpression {
        return factory.createStrictEquality(left, right);
    }

    /**
     * @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead.
     */
    export function createStrictInequality(left: Expression, right: Expression): BinaryExpression {
        return factory.createStrictInequality(left, right);
    }

    /**
     * @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead.
     */
    export function createAdd(left: Expression, right: Expression): BinaryExpression {
        return factory.createAdd(left, right);
    }

    /**
     * @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead.
     */
    export function createSubtract(left: Expression, right: Expression): BinaryExpression {
        return factory.createSubtract(left, right);
    }

    /**
     * @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead.
     */
    export function createLogicalAnd(left: Expression, right: Expression): BinaryExpression {
        return factory.createLogicalAnd(left, right);
    }

    /**
     * @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead.
     */
    export function createLogicalOr(left: Expression, right: Expression): BinaryExpression {
        return factory.createLogicalOr(left, right);
    }

    /**
     * @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead.
     */
    export function createPostfixIncrement(operand: Expression): PostfixUnaryExpression {
        return factory.createPostfixIncrement(operand);
    }

    /**
     * @deprecated Use `factory.{0}` or the factory supplied by your transformation context instead.
     */
    /**
     * @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead.
     */
    export function createLogicalNot(operand: Expression): PrefixUnaryExpression {
        return factory.createLogicalNot(operand);
    }

    Debug.deprecateExports(ts, [
        "createNodeArray",
        "createNumericLiteral",
        "createBigIntLiteral",
        "createStringLiteral",
        "createStringLiteralFromNode",
        "createRegularExpressionLiteral",
        "createLoopVariable",
        "createUniqueName",
        "createToken",
        "createSuper",
        "createThis",
        "createNull",
        "createTrue",
        "createFalse",
        "createModifier",
        "createModifiersFromModifierFlags",
        "createQualifiedName",
        "updateQualifiedName",
        "createComputedPropertyName",
        "updateComputedPropertyName",
        "createTypeParameterDeclaration",
        "updateTypeParameterDeclaration",
        "createDecorator",
        "updateDecorator",
        "createCallSignature",
        "updateCallSignature",
        "createConstructSignature",
        "updateConstructSignature",
        "updateIndexSignature",
        "createKeywordTypeNode",
        "createTypePredicateNode",
        "updateTypePredicateNode",
        "createTypeReferenceNode",
        "updateTypeReferenceNode",
        "createFunctionTypeNode",
        "updateFunctionTypeNode",
        "createConstructorTypeNode",
        "updateConstructorTypeNode",
        "createTypeQueryNode",
        "updateTypeQueryNode",
        "createTypeLiteralNode",
        "updateTypeLiteralNode",
        "createArrayTypeNode",
        "updateArrayTypeNode",
        "createTupleTypeNode",
        "updateTupleTypeNode",
        "createOptionalTypeNode",
        "updateOptionalTypeNode",
        "createRestTypeNode",
        "updateRestTypeNode",
        "createUnionTypeNode",
        "updateUnionTypeNode",
        "createIntersectionTypeNode",
        "updateIntersectionTypeNode",
        "createConditionalTypeNode",
        "updateConditionalTypeNode",
        "createInferTypeNode",
        "updateInferTypeNode",
        "createImportTypeNode",
        "updateImportTypeNode",
        "createParenthesizedType",
        "updateParenthesizedType",
        "createThisTypeNode",
        "updateTypeOperatorNode",
        "createIndexedAccessTypeNode",
        "updateIndexedAccessTypeNode",
        "createMappedTypeNode",
        "updateMappedTypeNode",
        "createLiteralTypeNode",
        "updateLiteralTypeNode",
        "createObjectBindingPattern",
        "updateObjectBindingPattern",
        "createArrayBindingPattern",
        "updateArrayBindingPattern",
        "createBindingElement",
        "updateBindingElement",
        "updateArrayLiteral",
        "createObjectLiteral",
        "updateObjectLiteral",
        "createPropertyAccess",
        "updatePropertyAccess",
        "createPropertyAccessChain",
        "updatePropertyAccessChain",
        "createElementAccess",
        "updateElementAccess",
        "createElementAccessChain",
        "updateElementAccessChain",
        "createCall",
        "updateCall",
        "createCallChain",
        "updateCallChain",
        "createNew",
        "updateNew",
        "createTypeAssertion",
        "updateTypeAssertion",
        "createParen",
        "updateParen",
        "createFunctionExpression",
        "updateFunctionExpression",
        "createArrowFunction",
        "updateArrowFunction",
        "createDelete",
        "updateDelete",
        "createTypeOf",
        "updateTypeOf",
        "createVoid",
        "updateVoid",
        "createAwait",
        "updateAwait",
        "createPrefix",
        "updatePrefix",
        "createPostfix",
        "updatePostfix",
        "createBinary",
        "updateBinary",
        "updateConditional",
        "createTemplateExpression",
        "updateTemplateExpression",
        "createTemplateHead",
        "createTemplateMiddle",
        "createTemplateTail",
        "createNoSubstitutionTemplateLiteral",
        "updateYield",
        "createSpread",
        "updateSpread",
        "createOmittedExpression",
        "createAsExpression",
        "updateAsExpression",
        "createNonNullExpression",
        "updateNonNullExpression",
        "createNonNullChain",
        "updateNonNullChain",
        "createMetaProperty",
        "updateMetaProperty",
        "createTemplateSpan",
        "updateTemplateSpan",
        "createSemicolonClassElement",
        "createBlock",
        "updateBlock",
        "createVariableStatement",
        "updateVariableStatement",
        "createEmptyStatement",
        "createExpressionStatement",
        "updateExpressionStatement",
        "createIf",
        "updateIf",
        "createDo",
        "updateDo",
        "createWhile",
        "updateWhile",
        "createFor",
        "updateFor",
        "createForIn",
        "updateForIn",
        "createForOf",
        "updateForOf",
        "createContinue",
        "updateContinue",
        "createBreak",
        "updateBreak",
        "createReturn",
        "updateReturn",
        "createWith",
        "updateWith",
        "createSwitch",
        "updateSwitch",
        "createLabel",
        "updateLabel",
        "createThrow",
        "updateThrow",
        "createTry",
        "updateTry",
        "createDebuggerStatement",
        "createVariableDeclaration",
        "updateVariableDeclaration",
        "createVariableDeclarationList",
        "updateVariableDeclarationList",
        "createFunctionDeclaration",
        "updateFunctionDeclaration",
        "createClassDeclaration",
        "updateClassDeclaration",
        "createInterfaceDeclaration",
        "updateInterfaceDeclaration",
        "createTypeAliasDeclaration",
        "updateTypeAliasDeclaration",
        "createEnumDeclaration",
        "updateEnumDeclaration",
        "createModuleDeclaration",
        "updateModuleDeclaration",
        "createModuleBlock",
        "updateModuleBlock",
        "createCaseBlock",
        "updateCaseBlock",
        "createNamespaceExportDeclaration",
        "updateNamespaceExportDeclaration",
        "createImportEqualsDeclaration",
        "updateImportEqualsDeclaration",
        "createImportDeclaration",
        "updateImportDeclaration",
        "createImportClause",
        "updateImportClause",
        "createNamespaceImport",
        "updateNamespaceImport",
        "createNamespaceExport",
        "updateNamespaceExport",
        "createNamedImports",
        "updateNamedImports",
        "createImportSpecifier",
        "updateImportSpecifier",
        "createExportAssignment",
        "updateExportAssignment",
        "createExportDeclaration",
        "updateExportDeclaration",
        "createNamedExports",
        "updateNamedExports",
        "createExportSpecifier",
        "updateExportSpecifier",
        "createExternalModuleReference",
        "updateExternalModuleReference",
        "createJSDocTypeExpression",
        "createJSDocTypeTag",
        "createJSDocReturnTag",
        "createJSDocThisTag",
        "createJSDocComment",
        "createJsxElement",
        "updateJsxElement",
        "createJsxSelfClosingElement",
        "updateJsxSelfClosingElement",
        "createJsxOpeningElement",
        "updateJsxOpeningElement",
        "createJsxClosingElement",
        "updateJsxClosingElement",
        "createJsxFragment",
        "createJsxText",
        "updateJsxText",
        "createJsxOpeningFragment",
        "createJsxJsxClosingFragment",
        "updateJsxFragment",
        "createJsxAttribute",
        "updateJsxAttribute",
        "createJsxAttributes",
        "updateJsxAttributes",
        "createJsxSpreadAttribute",
        "updateJsxSpreadAttribute",
        "createJsxExpression",
        "updateJsxExpression",
        "createCaseClause",
        "updateCaseClause",
        "createDefaultClause",
        "updateDefaultClause",
        "createHeritageClause",
        "updateHeritageClause",
        "createCatchClause",
        "updateCatchClause",
        "createPropertyAssignment",
        "updatePropertyAssignment",
        "createShorthandPropertyAssignment",
        "updateShorthandPropertyAssignment",
        "createSpreadAssignment",
        "updateSpreadAssignment",
        "createEnumMember",
        "updateEnumMember",
        "createNotEmittedStatement",
        "createPartiallyEmittedExpression",
        "updatePartiallyEmittedExpression",
        "createCommaList",
        "updateCommaList",
        "createBundle",
        "updateBundle",
        "createImmediatelyInvokedFunctionExpression",
        "createImmediatelyInvokedArrowFunction",
        "createVoidZero",
        "createExportDefault",
        "createExternalModuleExport",
        "createIdentifier",
        "createTempVariable",
        "getGeneratedNameForNode",
        "createPrivateIdentifier",
        "createIndexSignature",
        "createMethodSignature",
        "updateMethodSignature",
        "createTypeOperatorNode",
        "createTaggedTemplate",
        "updateTaggedTemplate",
        "createConditional",
        "createYield",
        "createClassExpression",
        "updateClassExpression",
        "createPropertySignature",
        "updatePropertySignature",
        "createExpressionWithTypeArguments",
        "updateExpressionWithTypeArguments",
        "createComma",
        "createLessThan",
        "createAssignment",
        "createStrictEquality",
        "createStrictInequality",
        "createAdd",
        "createSubtract",
        "createLogicalAnd",
        "createLogicalOr",
        "createPostfixIncrement",
        "createLogicalNot",
        "createArrayLiteral",
        "createJSDocParameterTag",
        "createJSDocClassTag",
        "createJSDocAugmentsTag",
        "createJSDocEnumTag",
        "createJSDocTemplateTag",
        "createJSDocTypedefTag",
        "createJSDocCallbackTag",
        "createJSDocSignature",
        "createJSDocPropertyTag",
        "createJSDocTypeLiteral",
        "createJSDocImplementsTag",
        "createJSDocAuthorTag",
        "createJSDocPublicTag",
        "createJSDocPrivateTag",
        "createJSDocProtectedTag",
        "createJSDocReadonlyTag",
    ], {
        message: "Use `factory.{0}` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExports(ts, [
        "createParameter",
        "updateParameter",
        "createProperty",
        "updateProperty",
        "createMethod",
        "updateMethod",
        "createConstructor",
        "updateConstructor",
        "createGetAccessor",
        "updateGetAccessor",
        "createSetAccessor",
        "updateSetAccessor",
    ], {
        message: "Use `factory.{0}Declaration` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createJSDocParamTag", {
        message: "Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createJSDocTag", {
        message: "Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createOptimisticUniqueName", {
        message: "Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createFileLevelUniqueName", {
        message: "Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createStatement", {
        message: "Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "updateStatement", {
        message: "Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "updateSourceFileNode", {
        message: "Use `factory.updateSourceFile` or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    Debug.deprecateExport(ts, "createLiteral", {
        message: "Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    /** @deprecated Use an appropriate `factory` method instead. */
    export function createNode(kind: SyntaxKind, pos = 0, end = 0): Node {
        return setTextRangePosEnd(
            kind === SyntaxKind.SourceFile ? parseBaseNodeFactory.createBaseSourceFileNode(kind) :
            kind === SyntaxKind.Identifier ? parseBaseNodeFactory.createBaseIdentifierNode(kind) :
            kind === SyntaxKind.PrivateIdentifier ? parseBaseNodeFactory.createBasePrivateIdentifierNode(kind) :
            !isNodeKind(kind) ? parseBaseNodeFactory.createBaseTokenNode(kind) :
            parseBaseNodeFactory.createBaseNode(kind),
            pos,
            end
        );
    }

    Debug.deprecateExport(ts, "createNode", {
        message: "Use an appropriate `factory` method instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    /**
     * Creates a shallow, memberwise clone of a node ~for mutation~ with its `pos`, `end`, and `parent` set.
     *
     * NOTE: It is unsafe to change any properties of a `Node` that relate to its AST children, as those changes won't be
     * captured with respect to transformations.
     *
     * @deprecated Use `factory.cloneNode` instead and use `setCommentRange` or `setSourceMapRange` and avoid setting `parent`.
     */
    export function getMutableClone<T extends Node>(node: T): T {
        const clone = factory.cloneNode(node);
        setTextRange(clone, node);
        setParent(clone, node.parent);
        return clone;
    }

    Debug.deprecateExport(ts, "getMutableClone", {
        message: "Use `factory.cloneNode` instead and use `setCommentRange` or `setSourceMapRange` and avoid setting `parent`.",
        since: "4.0",
        warnAfter: "4.1"
    });

    // #endregion Node Factory top-level exports

    // DEPRECATION: Renamed node tests
    // DEPRECATION PLAN:
    //     - soft: 4.0
    //     - warn: 4.1
    //     - error: TBD
    // #region Renamed node Tests
    /**
     * @deprecated Use `isTypeAssertionExpression` instead.
     */
    export function isTypeAssertion(node: Node): node is TypeAssertion {
        return node.kind === SyntaxKind.TypeAssertionExpression;
    }

    Debug.deprecateExport(ts, "isTypeAssertion", {
        message: "Use `isTypeAssertionExpression` instead.",
        since: "4.0",
        warnAfter: "4.1"
    });

    // #endregion Renamed node Tests
}