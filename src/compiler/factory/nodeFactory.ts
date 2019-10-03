namespace ts {
    let nextAutoGenerateId = 0;

    /* @internal */
    export function createNodeFactory(flags: NodeFactoryFlags, baseFactory: BaseNodeFactory, treeStateObserver?: TreeStateObserver): NodeFactory {
        // TODO(rbuckton): This exists to avoid collectiong transform flags when parsing a declaration file or JSDoc comment.
        //                 This is so that we can avoid executing code for those cases to improve performance. We should measure
        //                 this and determine if it worthwhile to keep this optimization.
        let skipTransformationFlags = false;

        // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
        const lazyParenthesizer = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullParenthesizerRules : createParenthesizerRules(factory));
        const lazyConverters = memoize(() => flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : createNodeConverters(factory));
        const lazyFactory = memoize(() => createLazyFactoryMembers(factory, asExpression));

        // Add tree state observers to base methods.
        const createNode = observeResult(baseFactory.createBaseNode, treeStateObserver && treeStateObserver.onCreateNode);
        const createTokenNode = observeResult(baseFactory.createBaseTokenNode, treeStateObserver && treeStateObserver.onCreateNode);
        const createIdentifierNode = observeResult(baseFactory.createBaseIdentifierNode, treeStateObserver && treeStateObserver.onCreateNode);
        const createSourceFileNode = observeResult(baseFactory.createBaseSourceFileNode, treeStateObserver && treeStateObserver.onCreateNode);
        const setChild = observeArguments(setChildWorker, treeStateObserver && treeStateObserver.onSetChild);
        const setChildren = observeArguments(setChildrenWorker, treeStateObserver && treeStateObserver.onSetChildren);
        const finish = observeResult(finishWorker, treeStateObserver && treeStateObserver.onFinishNode);
        const finishJSDoc = observeResult(identity, treeStateObserver && treeStateObserver.onFinishNode);
        const update = observeArguments(updateWorker, treeStateObserver && treeStateObserver.onUpdateNode);
        const reuse = observeResult(reuseWorker, treeStateObserver && treeStateObserver.onReuseNode);

        const factory: NodeFactory = {
            get parenthesizer() { return lazyParenthesizer(); },
            get converters() { return lazyConverters(); },
            setSkipTransformationFlags: value => {
                const oldValue = skipTransformationFlags;
                skipTransformationFlags = value;
                return oldValue;
            },
            trackExtraneousChildNode: setChild,
            trackExtraneousChildNodes: setChildren,
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
            createOptimisticUniqueName,
            createFileLevelUniqueName,
            getGeneratedNameForNode,
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
            createObjectBindingPattern,
            updateObjectBindingPattern,
            createArrayBindingPattern,
            updateArrayBindingPattern,
            createBindingElement,
            updateBindingElement,
            createArrayLiteral: createArrayLiteralExpression,
            updateArrayLiteral: updateArrayLiteralExpression,
            createObjectLiteral: createObjectLiteralExpression,
            updateObjectLiteral: updateObjectLiteralExpression,
            createPropertyAccess: (expression, name) => {
                const node = createPropertyAccessExpression(expression, name);
                if (flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess) {
                    setEmitFlags(node, EmitFlags.NoIndentation);
                }
                return node;
            },
            updatePropertyAccess: updatePropertyAccessExpression,
            createElementAccess: createElementAccessExpression,
            updateElementAccess: updateElementAccessExpression,
            createCall: createCallExpression,
            updateCall: updateCallExpression,
            createNew: createNewExpression,
            updateNew: updateNewExpression,
            createTaggedTemplate: createTaggedTemplateExpression,
            updateTaggedTemplate: updateTaggedTemplateExpression,
            createTypeAssertion,
            updateTypeAssertion,
            createParen: createParenthesizedExpression,
            updateParen: updateParenthesizedExpression,
            createFunctionExpression,
            updateFunctionExpression,
            // createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction,
            // createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction,
            createArrowFunction: overloadList(
                makeOverload(createArrowFunction, { minLength: 6 }),
                makeOverload(createArrowFunctionWithoutTokens, { length: 5 })
            ),
            // updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction,
            // updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction,
            updateArrowFunction: overloadList(
                makeOverload(updateArrowFunction, { length: 7 }),
                makeOverload(updateArrowFunctionWithoutTokens, { length: 6 })
            ),
            createDelete: createDeleteExpression,
            updateDelete: updateDeleteExpression,
            createTypeOf: createTypeOfExpression,
            updateTypeOf: updateTypeOfExpression,
            createVoid: createVoidExpression,
            updateVoid: updateVoidExpression,
            createAwait: createAwaitExpression,
            updateAwait: updateAwaitExpression,
            createPrefix: createPrefixUnaryExpression,
            updatePrefix: updatePrefixUnaryExpression,
            createPostfix: createPostfixUnaryExpression,
            updatePostfix: updatePostfixUnaryExpression,
            createBinary: createBinaryExpression,
            updateBinary: updateBinaryExpression,
            createConditional: overloadList(
                makeOverload(createConditionalExpression, { length: 5 }),
                makeOverload(createConditionalExpressionWithoutTokens, { length: 3 })
            ),
            updateConditional: overloadList(
                makeOverload(updateConditionalExpression, { length: 6 }),
                makeOverload(updateConditionalExpressionWithoutTokens, { length: 4 })
            ),
            createTemplateExpression,
            updateTemplateExpression,
            createTemplateHead,
            createTemplateMiddle,
            createTemplateTail,
            createNoSubstitutionTemplateLiteral,
            createTemplateLiteralLikeNode,
            createYield: createYieldExpression,
            updateYield: updateYieldExpression,
            createSpread: createSpreadElement,
            updateSpread: updateSpreadElement,
            createClassExpression,
            updateClassExpression,
            createOmittedExpression,
            createExpressionWithTypeArguments,
            updateExpressionWithTypeArguments,
            createAsExpression,
            updateAsExpression,
            createNonNullExpression,
            updateNonNullExpression,
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
            createIf: createIfStatement,
            updateIf: updateIfStatement,
            createDo: createDoStatement,
            updateDo: updateDoStatement,
            createWhile: createWhileStatement,
            updateWhile: updateWhileStatement,
            createFor: createForStatement,
            updateFor: updateForStatement,
            createForIn: createForInStatement,
            updateForIn: updateForInStatement,
            createForOf: createForOfStatement,
            updateForOf: updateForOfStatement,
            createContinue: createContinueStatement,
            updateContinue: updateContinueStatement,
            createBreak: createBreakStatement,
            updateBreak: updateBreakStatement,
            createReturn: createReturnStatement,
            updateReturn: updateReturnStatement,
            createWith: createWithStatement,
            updateWith: updateWithStatement,
            createSwitch: createSwitchStatement,
            updateSwitch: updateSwitchStatement,
            createLabel: createLabeledStatement,
            updateLabel: updateLabeledStatement,
            createThrow: createThrowStatement,
            updateThrow: updateThrowStatement,
            createTry: createTryStatement,
            updateTry: updateTryStatement,
            createDebuggerStatement,
            // createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration,
            // createVariableDeclaration(name: string | BindingName, type?: TypeNode, initializer?: Expression): VariableDeclaration,
            createVariableDeclaration: overloadList(
                makeOverload(createVariableDeclaration, { length: 4 }),
                makeOverload(createVariableDeclarationWithoutTokens, { minLength: 1, maxLength: 3 })
            ),
            // updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration,
            // updateVariableDeclaration(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration,
            updateVariableDeclaration: overloadList(
                makeOverload(updateVariableDeclaration, { length: 5 }),
                makeOverload(updateVariableDeclarationWithoutTokens, { length: 4 })
            ),
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
            createNamespaceImport,
            updateNamespaceImport,
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
            createJSDocAllType,
            createJSDocUnknownType,
            createJSDocNonNullableType,
            createJSDocNullableType,
            createJSDocOptionalType,
            createJSDocFunctionType,
            createJSDocVariadicType,
            createJSDocNamepathType,
            createJSDocTypeLiteral,
            createJSDocTypeExpression,
            createJSDocSignature,
            createJSDocTemplateTag,
            createJSDocTypeTag,
            createJSDocTypedefTag,
            createJSDocReturnTag,
            createJSDocThisTag,
            createJSDocParameterTag,
            createJSDocPropertyTag,
            createJSDocAuthorTag,
            createJSDocAugmentsTag,
            createJSDocCallbackTag,
            createJSDocClassTag,
            createJSDocEnumTag,
            createJSDocUnknownTag: createJSDocUnknownTag,
            createJSDocComment,
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
            createNotEmittedStatement,
            createEndOfDeclarationMarker,
            createMergeDeclarationMarker,
            createPartiallyEmittedExpression,
            updatePartiallyEmittedExpression,
            createCommaList: createCommaListExpression,
            updateCommaList: updateCommaListExpression,
            createBundle,
            updateBundle,

            // Lazily load factory methods for common operator factories and utilities
            get createSignatureDeclaration() { return lazyFactory().createSignatureDeclaration; },
            get createComma() { return lazyFactory().createComma; },
            get createAssignment() { return lazyFactory().createAssignment; },
            get createLogicalOr() { return lazyFactory().createLogicalOr; },
            get createLogicalAnd() { return lazyFactory().createLogicalAnd; },
            get createBitwiseOr() { return lazyFactory().createBitwiseOr; },
            get createBitwiseXor() { return lazyFactory().createBitwiseXor; },
            get createBitwiseAnd() { return lazyFactory().createBitwiseAnd; },
            get createStrictEquality() { return lazyFactory().createStrictEquality; },
            get createStrictInequality() { return lazyFactory().createStrictInequality; },
            get createEquality() { return lazyFactory().createEquality; },
            get createInequality() { return lazyFactory().createInequality; },
            get createLessThan() { return lazyFactory().createLessThan; },
            get createLessThanEquals() { return lazyFactory().createLessThanEquals; },
            get createGreaterThan() { return lazyFactory().createGreaterThan; },
            get createGreaterThanEquals() { return lazyFactory().createGreaterThanEquals; },
            get createLeftShift() { return lazyFactory().createLeftShift; },
            get createRightShift() { return lazyFactory().createRightShift; },
            get createUnsignedRightShift() { return lazyFactory().createUnsignedRightShift; },
            get createAdd() { return lazyFactory().createAdd; },
            get createSubtract() { return lazyFactory().createSubtract; },
            get createMultiply() { return lazyFactory().createMultiply; },
            get createDivide() { return lazyFactory().createDivide; },
            get createModulo() { return lazyFactory().createModulo; },
            get createExponent() { return lazyFactory().createExponent; },
            get createPrefixPlus() { return lazyFactory().createPrefixPlus; },
            get createPrefixMinus() { return lazyFactory().createPrefixMinus; },
            get createPrefixIncrement() { return lazyFactory().createPrefixIncrement; },
            get createPrefixDecrement() { return lazyFactory().createPrefixDecrement; },
            get createBitwiseNot() { return lazyFactory().createBitwiseNot; },
            get createLogicalNot() { return lazyFactory().createLogicalNot; },
            get createPostfixIncrement() { return lazyFactory().createPostfixIncrement; },
            get createPostfixDecrement() { return lazyFactory().createPostfixDecrement; },
            get createImmediatelyInvokedFunctionExpression() { return lazyFactory().createImmediatelyInvokedFunctionExpression; },
            get createImmediatelyInvokedArrowFunction() { return lazyFactory().createImmediatelyInvokedArrowFunction; },
            get createVoidZero() { return lazyFactory().createVoidZero; },
            get createExportDefault() { return lazyFactory().createExportDefault; },
            get createExternalModuleExport() { return lazyFactory().createExternalModuleExport; },
            get createTypeCheck() { return lazyFactory().createTypeCheck; },
            get createMethodCall() { return lazyFactory().createMethodCall; },
            get createGlobalMethodCall() { return lazyFactory().createGlobalMethodCall; },
            get createFunctionBindCall() { return lazyFactory().createFunctionBindCall; },
            get createFunctionCallCall() { return lazyFactory().createFunctionCallCall; },
            get createFunctionApplyCall() { return lazyFactory().createFunctionApplyCall; },
            get createArraySliceCall() { return lazyFactory().createArraySliceCall; },
            get createArrayConcatCall() { return lazyFactory().createArrayConcatCall; },
            get createObjectDefinePropertyCall() { return lazyFactory().createObjectDefinePropertyCall; },
            get createPropertyDescriptor() { return lazyFactory().createPropertyDescriptor; },
            get createCallBinding() { return lazyFactory().createCallBinding; },
            get inlineExpressions() { return lazyFactory().inlineExpressions; },
            get getInternalName() { return lazyFactory().getInternalName; },
            get getLocalName() { return lazyFactory().getLocalName; },
            get getExportName() { return lazyFactory().getExportName; },
            get getDeclarationName() { return lazyFactory().getDeclarationName; },
            get getNamespaceMemberName() { return lazyFactory().getNamespaceMemberName; },
            get getExternalModuleOrNamespaceExportName() { return lazyFactory().getExternalModuleOrNamespaceExportName; },
            get restoreOuterExpressions() { return lazyFactory().recreateOuterExpressions; },
            get restoreEnclosingLabel() { return lazyFactory().restoreEnclosingLabel; },
            get createUseStrictPrologue() { return lazyFactory().createUseStrictPrologue; },
            get copyPrologue() { return lazyFactory().copyPrologue; },
            get copyStandardPrologue() { return lazyFactory().copyStandardPrologue; },
            get copyCustomPrologue() { return lazyFactory().copyCustomPrologue; },
            get ensureUseStrict() { return lazyFactory().ensureUseStrict; },
            get liftToBlock() { return lazyFactory().liftToBlock; },
        };

        return factory;

        // @api
        function createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T> {
            if (elements === undefined || elements === emptyArray) {
                elements = [];
            }
            else if (isNodeArray(elements)) {
                if (!skipTransformationFlags) {
                    // Ensure the transform flags have been aggregated for this NodeArray
                    if (elements.transformFlags === undefined) {
                        aggregateChildrenFlags(elements);
                    }
                }
                return elements;
            }

            // Since the element list of a node array is typically created by starting with an empty array and
            // repeatedly calling push(), the list may not have the optimal memory layout. We invoke slice() for
            // small arrays (1 to 4 elements) to give the VM a chance to allocate an optimal representation.
            const length = elements.length;
            const array = <NodeArray<T>>(length >= 1 && length <= 4 ? elements.slice() : elements);
            array.pos = -1;
            array.end = -1;
            if (hasTrailingComma) {
                array.hasTrailingComma = hasTrailingComma;
            }
            if (!skipTransformationFlags) {
                aggregateChildrenFlags(array);
            }
            return array;
        }

        function createBaseNode<T extends Node>(kind: T["kind"]): T {
            return createNode(kind) as T;
        }

        function createBaseDeclaration<T extends Declaration | VariableStatement | ImportDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined
        ) {
            const node = createBaseNode(kind);
            setChildren(node, node.decorators = asNodeArray(decorators));
            setChildren(node, node.modifiers = asNodeArray(modifiers));
            return node;
        }

        function createBaseNamedDeclaration<T extends NamedDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined
        ) {
            const node = createBaseDeclaration(
                kind,
                decorators,
                modifiers
            );
            setChild(node, node.name = asName(name));
            return node;
        }

        function createBaseGenericNamedDeclaration<T extends NamedDeclaration & { typeParameters?: NodeArray<TypeParameterDeclaration> }>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined
        ) {
            const node = createBaseNamedDeclaration(
                kind,
                decorators,
                modifiers,
                name
            );
            setChildren(node, node.typeParameters = asNodeArray(typeParameters));
            if (!skipTransformationFlags) {
                if (typeParameters) {
                    markTypeScript(node);
                }
            }
            return node;
        }

        function createBaseSignatureDeclaration<T extends SignatureDeclarationBase>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[] | undefined,
            type: TypeNode | undefined
        ) {
            const node = createBaseGenericNamedDeclaration(
                kind,
                decorators,
                modifiers,
                name,
                typeParameters
            );
            setChildren(node, node.parameters = createNodeArray(parameters));
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                if (type) markTypeScript(node);
            }
            return node;
        }

        function updateBaseSignatureDeclaration<T extends SignatureDeclarationBase>(updated: T, original: T) {
            if (original.typeArguments) updated.typeArguments = original.typeArguments;
            return update(updated, original);
        }

        function createBaseFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[] | undefined,
            type: TypeNode | undefined,
            body: T["body"]
        ) {
            const node = createBaseSignatureDeclaration(
                kind,
                decorators,
                modifiers,
                name,
                typeParameters,
                parameters,
                type
            );
            setChild(node, node.body = body);
            if (!skipTransformationFlags) {
                if (!body) markTypeScript(node);
            }
            return node;
        }

        function updateBaseFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(updated: T, original: T) {
            if (original.exclamationToken) updated.exclamationToken = original.exclamationToken;
            if (original.typeArguments) updated.typeArguments = original.typeArguments;
            return updateBaseSignatureDeclaration(updated, original);
        }

        function createBaseInterfaceOrClassLikeDeclaration<T extends InterfaceDeclaration | ClassLikeDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined
        ) {
            const node = createBaseGenericNamedDeclaration(
                kind,
                decorators,
                modifiers,
                name,
                typeParameters
            );
            setChildren(node, node.heritageClauses = asNodeArray(heritageClauses));
            return node;
        }

        function createBaseClassLikeDeclaration<T extends ClassLikeDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            const node = createBaseInterfaceOrClassLikeDeclaration(
                kind,
                decorators,
                modifiers,
                name,
                typeParameters,
                heritageClauses
            );
            setChildren(node, node.members = createNodeArray(members));
            return node;
        }

        function createBaseBindingLikeDeclaration<T extends PropertyDeclaration | VariableDeclaration | ParameterDeclaration | BindingElement>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | T["name"] | undefined,
            initializer: Expression | undefined
        ) {
            const node = createBaseNamedDeclaration(
                kind,
                decorators,
                modifiers,
                name
            );
            setChild(node, node.initializer = initializer);
            return node;
        }

        function createBaseVariableLikeDeclaration<T extends PropertyDeclaration | VariableDeclaration | ParameterDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | T["name"] | undefined,
            type: TypeNode | undefined,
            initializer: Expression | undefined
        ) {
            const node = createBaseBindingLikeDeclaration(
                kind,
                decorators,
                modifiers,
                name,
                initializer
            );
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                if (type) markTypeScript(node);
            }
            return node;
        }

        //
        // Literals
        //

        function createBaseLiteral<T extends LiteralToken>(
            kind: T["kind"],
            text: string
        ) {
            const node = createTokenNode(kind) as T;
            node.text = text;
            node.hasExtendedUnicodeEscape = undefined;
            node.isUnterminated = undefined;
            return node;
        }

        // @api
        function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): NumericLiteral {
            const node = createBaseLiteral<NumericLiteral>(SyntaxKind.NumericLiteral, typeof value === "number" ? value + "" : value);
            node.numericLiteralFlags = numericLiteralFlags;
            if (!skipTransformationFlags) {
                if (numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier) markES2015(node);
            }
            return finish(node);
        }

        // @api
        function createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral {
            const node = createBaseLiteral<BigIntLiteral>(SyntaxKind.BigIntLiteral, typeof value === "string" ? value : pseudoBigIntToString(value) + "n");
            if (!skipTransformationFlags) {
                markESNext(node);
            }
            return finish(node);
        }

        function createBaseStringLiteral(text: string, isSingleQuote?: boolean) {
            const node = createBaseLiteral<StringLiteral>(SyntaxKind.StringLiteral, text);
            node.singleQuote = isSingleQuote;
            return node;
        }

        // @api
        function createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral {
            const node = createBaseStringLiteral(text, isSingleQuote);
            node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
            if (!skipTransformationFlags) {
                if (hasExtendedUnicodeEscape) markES2015(node);
            }
            return finish(node);
        }

        // @api
        function createStringLiteralFromNode(sourceNode: PropertyNameLiteral): StringLiteral {
            const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), /*isSingleQuote*/ undefined);
            node.textSourceNode = sourceNode;
            return finish(node);
        }

        // @api
        function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
            const node = createBaseLiteral<RegularExpressionLiteral>(SyntaxKind.RegularExpressionLiteral, text);
            return finish(node);
        }

        // @api
        function createLiteralLikeNode(kind: LiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): LiteralToken {
            switch (kind) {
                case SyntaxKind.NumericLiteral: return createNumericLiteral(text, /*numericLiteralFlags*/ 0);
                case SyntaxKind.BigIntLiteral: return createBigIntLiteral(text);
                case SyntaxKind.StringLiteral: return createStringLiteral(text, /*isSingleQuote*/ undefined);
                case SyntaxKind.JsxText: return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ false);
                case SyntaxKind.JsxTextAllWhiteSpaces: return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ true);
                case SyntaxKind.RegularExpressionLiteral: return createRegularExpressionLiteral(text);
                case SyntaxKind.NoSubstitutionTemplateLiteral: return createTemplateLiteralLikeNode(kind, text, /*rawText*/ undefined) as NoSubstitutionTemplateLiteral;
            }
        }

        //
        // Identifiers
        //

        function createBaseIdentifier(text: string, originalKeywordKind: SyntaxKind | undefined): Identifier {
            if (originalKeywordKind === undefined && text) {
                originalKeywordKind = stringToToken(text);
            }
            if (originalKeywordKind === SyntaxKind.Identifier) {
                originalKeywordKind = undefined;
            }
            const node = createIdentifierNode(SyntaxKind.Identifier) as Identifier;
            node.originalKeywordKind = originalKeywordKind;
            node.escapedText = escapeLeadingUnderscores(text);
            return node;
        }

        function createBaseGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags) {
            const node = createBaseIdentifier(text, /*originalKeywordKind*/ undefined) as GeneratedIdentifier;
            node.autoGenerateFlags = autoGenerateFlags;
            node.autoGenerateId = nextAutoGenerateId;
            nextAutoGenerateId++;
            return node;
        }

        // @api
        function createIdentifier(text: string, typeArguments?: readonly (TypeNode | TypeParameterDeclaration)[], originalKeywordKind?: SyntaxKind): Identifier {
            const node = createBaseIdentifier(text, originalKeywordKind);
            if (typeArguments) {
                // NOTE: we do not use `setChildren` here because typeArguments in an identifier do not contribute to transformations
                node.typeArguments = createNodeArray(typeArguments);
                if (treeStateObserver && treeStateObserver.onSetChildren) {
                    treeStateObserver.onSetChildren(node, node.typeArguments);
                }
            }
            return finish(node);
        }

        // @api
        function updateIdentifier(node: Identifier, typeArguments?: NodeArray<TypeNode | TypeParameterDeclaration> | undefined): Identifier {
            return node.typeArguments !== typeArguments
                ? update(createIdentifier(idText(node), typeArguments), node)
                : reuse(node);
        }

        // @api
        function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): GeneratedIdentifier {
            let flags = GeneratedIdentifierFlags.Auto;
            if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
            const name = finish(createBaseGeneratedIdentifier("", flags));
            if (recordTempVariable) {
                recordTempVariable(name);
            }
            return name;
        }

        /** Create a unique temporary variable for use in a loop. */
        // @api
        function createLoopVariable(): Identifier {
            return finish(createBaseGeneratedIdentifier("", GeneratedIdentifierFlags.Loop));
        }

        /** Create a unique name based on the supplied text. */
        // @api
        function createUniqueName(text: string): Identifier {
            return finish(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique));
        }

        // @api
        function createOptimisticUniqueName(text: string): Identifier {
            return finish(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic));
        }

        /** Create a unique name based on the supplied text. This does not consider names injected by the transformer. */
        // @api
        function createFileLevelUniqueName(text: string): Identifier {
            return finish(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel));
        }

        /** Create a unique name generated for a node. */
        // @api
        function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0): Identifier {
            const name = createBaseGeneratedIdentifier(node && isIdentifier(node) ? idText(node) : "", GeneratedIdentifierFlags.Node | flags);
            name.original = node;
            return finish(name);
        }

        //
        // Punctuation
        //

        // @api
        function createToken<TKind extends SyntaxKind>(token: TKind) {
            Debug.assert(token >= SyntaxKind.FirstToken && token <= SyntaxKind.LastToken, "Invalid token");
            Debug.assert(token <= SyntaxKind.FirstTemplateToken || token >= SyntaxKind.LastTemplateToken, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
            Debug.assert(token <= SyntaxKind.FirstLiteralToken || token >= SyntaxKind.LastLiteralToken, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
            Debug.assert(token !== SyntaxKind.Identifier, "Invalid token. Use 'createIdentifier' to create identifiers");
            const node = createTokenNode(token) as Token<TKind>;
            if (!skipTransformationFlags) {
                switch (token) {
                    case SyntaxKind.AsyncKeyword:
                        // 'async' modifier is ES2017 (async functions) or ES2018 (async generators)
                        markES2017(node);
                        markES2018(node);
                        break;

                    case SyntaxKind.PublicKeyword:
                    case SyntaxKind.PrivateKeyword:
                    case SyntaxKind.ProtectedKeyword:
                    case SyntaxKind.ReadonlyKeyword:
                    case SyntaxKind.AbstractKeyword:
                    case SyntaxKind.DeclareKeyword:
                    case SyntaxKind.ConstKeyword:
                    case SyntaxKind.AnyKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BigIntKeyword:
                    case SyntaxKind.NeverKeyword:
                    case SyntaxKind.ObjectKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.SymbolKeyword:
                    case SyntaxKind.VoidKeyword:
                    case SyntaxKind.UnknownKeyword:
                    case SyntaxKind.UndefinedKeyword: // `undefined` is an Identifier in the expression case.
                        markTypeScript(node);
                        break;
                    case SyntaxKind.StaticKeyword:
                    case SyntaxKind.SuperKeyword:
                        markES2015(node);
                        break;
                    case SyntaxKind.ThisKeyword:
                        // 'this' indicates a lexical 'this'
                        markLexicalThis(node);
                        break;
                }
            }
            return finish(node);
        }

        //
        // Reserved words
        //

        // @api
        function createSuper() {
            return createToken(SyntaxKind.SuperKeyword) as SuperExpression;
        }

        // @api
        function createThis() {
            return createToken(SyntaxKind.ThisKeyword) as ThisExpression;
        }

        // @api
        function createNull() {
            return createToken(SyntaxKind.NullKeyword) as NullLiteral;
        }

        // @api
        function createTrue() {
            return createToken(SyntaxKind.TrueKeyword) as TrueLiteral;
        }

        // @api
        function createFalse() {
            return createToken(SyntaxKind.FalseKeyword) as FalseLiteral;
        }

        //
        // Modifiers
        //

        // @api
        function createModifier<T extends Modifier["kind"]>(kind: T): Token<T> {
            return createToken(kind);
        }

        // @api
        function createModifiersFromModifierFlags(flags: ModifierFlags) {
            const result: Modifier[] = [];
            if (flags & ModifierFlags.Export) { result.push(createModifier(SyntaxKind.ExportKeyword)); }
            if (flags & ModifierFlags.Ambient) { result.push(createModifier(SyntaxKind.DeclareKeyword)); }
            if (flags & ModifierFlags.Default) { result.push(createModifier(SyntaxKind.DefaultKeyword)); }
            if (flags & ModifierFlags.Const) { result.push(createModifier(SyntaxKind.ConstKeyword)); }
            if (flags & ModifierFlags.Public) { result.push(createModifier(SyntaxKind.PublicKeyword)); }
            if (flags & ModifierFlags.Private) { result.push(createModifier(SyntaxKind.PrivateKeyword)); }
            if (flags & ModifierFlags.Protected) { result.push(createModifier(SyntaxKind.ProtectedKeyword)); }
            if (flags & ModifierFlags.Abstract) { result.push(createModifier(SyntaxKind.AbstractKeyword)); }
            if (flags & ModifierFlags.Static) { result.push(createModifier(SyntaxKind.StaticKeyword)); }
            if (flags & ModifierFlags.Readonly) { result.push(createModifier(SyntaxKind.ReadonlyKeyword)); }
            if (flags & ModifierFlags.Async) { result.push(createModifier(SyntaxKind.AsyncKeyword)); }
            return result;
        }

        //
        // Names
        //

        // @api
        function createQualifiedName(left: EntityName, right: string | Identifier) {
            const node = createBaseNode<QualifiedName>(SyntaxKind.QualifiedName);
            setChild(node, node.left = left);
            setChild(node, node.right = asName(right));
            return finish(node);
        }

        // @api
        function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier) {
            return node.left !== left
                || node.right !== right
                ? update(createQualifiedName(left, right), node)
                : reuse(node);
        }

        // @api
        function createComputedPropertyName(expression: Expression) {
            const node = createBaseNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionOfComputedPropertyName(expression));
            if (!skipTransformationFlags) {
                markES2015(node);
                markComputedPropertyName(node);
            }
            return finish(node);
        }

        // @api
        function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
            return node.expression !== expression
                ? update(createComputedPropertyName(expression), node)
                : reuse(node);
        }

        //
        // Signature elements
        //

        // @api
        function createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode) {
            const node = createBaseNamedDeclaration<TypeParameterDeclaration>(
                SyntaxKind.TypeParameter,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name
            );
            setChild(node, node.constraint = constraint);
            setChild(node, node.default = defaultType);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined) {
            return node.name !== name
                || node.constraint !== constraint
                || node.default !== defaultType
                ? update(createTypeParameterDeclaration(name, constraint, defaultType), node)
                : reuse(node);
        }

        // @api
        function createParameterDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            dotDotDotToken: DotDotDotToken | undefined,
            name: string | BindingName,
            questionToken?: QuestionToken,
            type?: TypeNode,
            initializer?: Expression
        ) {
            const node = createBaseVariableLikeDeclaration<ParameterDeclaration>(
                SyntaxKind.Parameter,
                decorators,
                modifiers,
                name,
                type,
                initializer && lazyParenthesizer().parenthesizeExpressionForDisallowedComma(initializer)
            );
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            setChild(node, node.questionToken = questionToken);
            if (!skipTransformationFlags) {
                if (isThisIdentifier(node.name)) {
                    markTypeScriptOnly(node);
                }
                else {
                    if (questionToken) markTypeScript(node);
                    if (hasModifier(node, ModifierFlags.ParameterPropertyModifier)) markTypeScriptClassSyntax(node);
                    if (initializer || dotDotDotToken) markES2015(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateParameterDeclaration(
            node: ParameterDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            dotDotDotToken: DotDotDotToken | undefined,
            name: string | BindingName,
            questionToken: QuestionToken | undefined,
            type: TypeNode | undefined,
            initializer: Expression | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.questionToken !== questionToken
                || node.type !== type
                || node.initializer !== initializer
                ? update(createParameterDeclaration(decorators, modifiers, dotDotDotToken, name, questionToken, type, initializer), node)
                : reuse(node);
        }

        // @api
        function createDecorator(expression: Expression) {
            const node = createBaseNode<Decorator>(SyntaxKind.Decorator);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            if (!skipTransformationFlags) {
                markTypeScript(node);
                markTypeScriptClassSyntax(node);
            }
            return finish(node);
        }

        // @api
        function updateDecorator(node: Decorator, expression: Expression) {
            return node.expression !== expression
                ? update(createDecorator(expression), node)
                : reuse(node);
        }

        //
        // Type Elements
        //

        // @api
        function createPropertySignature(
            modifiers: readonly Modifier[] | undefined,
            name: PropertyName | string,
            questionToken: QuestionToken | undefined,
            type: TypeNode | undefined
        ): PropertySignature {
            const node = createBaseNamedDeclaration<PropertySignature>(
                SyntaxKind.PropertySignature,
                /*decorators*/ undefined,
                modifiers,
                name
            );
            setChild(node, node.type = type);
            setChild(node, node.questionToken = questionToken);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updatePropertySignature(
            node: PropertySignature,
            modifiers: readonly Modifier[] | undefined,
            name: PropertyName,
            questionToken: QuestionToken | undefined,
            type: TypeNode | undefined
        ) {
            return node.modifiers !== modifiers
                || node.name !== name
                || node.questionToken !== questionToken
                || node.type !== type
                ? update(createPropertySignature(modifiers, name, questionToken, type), node)
                : reuse(node);
        }

        // @api
        function createPropertyDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
            type: TypeNode | undefined,
            initializer: Expression | undefined
        ) {
            const node = createBaseVariableLikeDeclaration<PropertyDeclaration>(
                SyntaxKind.PropertyDeclaration,
                decorators,
                modifiers,
                name,
                type,
                initializer
            );
            setChild(node, node.questionToken = questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.QuestionToken ? questionOrExclamationToken : undefined);
            setChild(node, node.exclamationToken = questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.ExclamationToken ? questionOrExclamationToken : undefined);
            if (!skipTransformationFlags) {
                if (isComputedPropertyName(node.name) || (hasStaticModifier(node) && node.initializer)) markTypeScriptClassSyntax(node);
                markClassFields(node);
            }
            return finish(node);
        }

        // @api
        function updatePropertyDeclaration(
            node: PropertyDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
            type: TypeNode | undefined,
            initializer: Expression | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.questionToken !== (questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.QuestionToken ? questionOrExclamationToken : undefined)
                || node.exclamationToken !== (questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.ExclamationToken ? questionOrExclamationToken : undefined)
                || node.type !== type
                || node.initializer !== initializer
                ? update(createPropertyDeclaration(decorators, modifiers, name, questionOrExclamationToken, type, initializer), node)
                : reuse(node);
        }

        // @api
        function createMethodSignature(
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            questionToken: QuestionToken | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ) {
            const node = createBaseSignatureDeclaration<MethodSignature>(
                SyntaxKind.MethodSignature,
                /*decorators*/ undefined,
                modifiers,
                name,
                typeParameters,
                parameters,
                type
            );
            setChild(node, node.questionToken = questionToken);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateMethodSignature(
            node: MethodSignature,
            modifiers: readonly Modifier[] | undefined,
            name: PropertyName,
            questionToken: QuestionToken | undefined,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return node.modifiers !== modifiers
                || node.name !== name
                || node.questionToken !== questionToken
                || node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateBaseSignatureDeclaration(createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type), node)
                : reuse(node);
        }

        // @api
        function createMethodDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: string | PropertyName,
            questionToken: QuestionToken | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            const node = createBaseFunctionLikeDeclaration<MethodDeclaration>(
                SyntaxKind.MethodDeclaration,
                decorators,
                modifiers,
                name,
                typeParameters,
                parameters,
                type,
                body
            );
            setChild(node, node.asteriskToken = asteriskToken);
            setChild(node, node.questionToken = questionToken);
            if (!skipTransformationFlags) {
                if (hasModifier(node, ModifierFlags.Async)) {
                    if (asteriskToken) {
                        markES2018(node);
                    }
                    else {
                        markES2017(node);
                    }
                }
                else if (asteriskToken) {
                    markGenerator(node);
                }
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateMethodDeclaration(
            node: MethodDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: PropertyName,
            questionToken: QuestionToken | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.asteriskToken !== asteriskToken
                || node.name !== name
                || node.questionToken !== questionToken
                || node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createMethodDeclaration(decorators, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body), node)
                : reuse(node);
        }

        // @api
        function createConstructorDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            parameters: readonly ParameterDeclaration[],
            body: Block | undefined
        ) {
            const node = createBaseFunctionLikeDeclaration<ConstructorDeclaration>(
                SyntaxKind.Constructor,
                decorators,
                modifiers,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            );
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateConstructorDeclaration(
            node: ConstructorDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            parameters: readonly ParameterDeclaration[],
            body: Block | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.parameters !== parameters
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createConstructorDeclaration(decorators, modifiers, parameters, body), node)
                : reuse(node);
        }

        // @api
        function createGetAccessorDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            const node = createBaseFunctionLikeDeclaration<GetAccessorDeclaration>(
                SyntaxKind.GetAccessor,
                decorators,
                modifiers,
                name,
                /*typeParameters*/ undefined,
                parameters,
                type,
                body
            );
            return finish(node);
        }

        // @api
        function updateGetAccessorDeclaration(
            node: GetAccessorDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: PropertyName,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.parameters !== parameters
                || node.type !== type
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createGetAccessorDeclaration(decorators, modifiers, name, parameters, type, body), node)
                : reuse(node);
        }

        // @api
        function createSetAccessorDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            parameters: readonly ParameterDeclaration[],
            body: Block | undefined
        ) {
            const node = createBaseFunctionLikeDeclaration<SetAccessorDeclaration>(
                SyntaxKind.SetAccessor,
                decorators,
                modifiers,
                name,
                /*typeParameters*/ undefined,
                parameters,
                /*type*/ undefined,
                body
            );
            return finish(node);
        }

        // @api
        function updateSetAccessorDeclaration(
            node: SetAccessorDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: PropertyName,
            parameters: readonly ParameterDeclaration[],
            body: Block | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.parameters !== parameters
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createSetAccessorDeclaration(decorators, modifiers, name, parameters, body), node)
                : reuse(node);
        }

        // @api
        function createCallSignature(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): CallSignatureDeclaration {
            const node = createBaseSignatureDeclaration<CallSignatureDeclaration>(
                SyntaxKind.CallSignature,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*name*/ undefined,
                typeParameters,
                parameters,
                type
            );
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateCallSignature(
            node: CallSignatureDeclaration,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node)
                : reuse(node);
        }

        // @api
        function createConstructSignature(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): ConstructSignatureDeclaration {
            const node = createBaseSignatureDeclaration<ConstructSignatureDeclaration>(
                SyntaxKind.ConstructSignature,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*name*/ undefined,
                typeParameters,
                parameters,
                type
            );
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateConstructSignature(
            node: ConstructSignatureDeclaration,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node)
                : reuse(node);
        }

        // @api
        function createIndexSignature(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): IndexSignatureDeclaration {
            const node = createBaseSignatureDeclaration<IndexSignatureDeclaration>(
                SyntaxKind.IndexSignature,
                decorators,
                modifiers,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                type
            );
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateIndexSignature(
            node: IndexSignatureDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode
        ) {
            return node.parameters !== parameters
                || node.type !== type
                || node.decorators !== decorators
                || node.modifiers !== modifiers
                ? updateBaseSignatureDeclaration(createIndexSignature(decorators, modifiers, parameters, type), node)
                : reuse(node);
        }

        //
        // Types
        //

        // @api
        function createKeywordTypeNode(kind: KeywordTypeNode["kind"]) {
            return createToken(kind) as KeywordTypeNode;
        }

        // @api
        function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode) {
            const node = createBaseNode<TypePredicateNode>(SyntaxKind.TypePredicate);
            setChild(node, node.parameterName = asName(parameterName));
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) {
            return node.parameterName !== parameterName
                || node.type !== type
                ? update(createTypePredicateNode(parameterName, type), node)
                : reuse(node);
        }

        // @api
        function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
            const node = createBaseNode<TypeReferenceNode>(SyntaxKind.TypeReference);
            setChild(node, node.typeName = asName(typeName));
            setChildren(node, node.typeArguments = typeArguments && lazyParenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments)));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) {
            return node.typeName !== typeName
                || node.typeArguments !== typeArguments
                ? update(createTypeReferenceNode(typeName, typeArguments), node)
                : reuse(node);
        }

        // @api
        function createFunctionTypeNode(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): FunctionTypeNode {
            const node = createBaseSignatureDeclaration<FunctionTypeNode>(
                SyntaxKind.FunctionType,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*name*/ undefined,
                typeParameters,
                parameters,
                type
            );
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateFunctionTypeNode(
            node: FunctionTypeNode,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateBaseSignatureDeclaration(createFunctionTypeNode(typeParameters, parameters, type), node)
                : reuse(node);
        }

        // @api
        function createConstructorTypeNode(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): ConstructorTypeNode {
            const node = createBaseSignatureDeclaration<ConstructorTypeNode>(
                SyntaxKind.ConstructorType,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*name*/ undefined,
                typeParameters,
                parameters,
                type
            );
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateConstructorTypeNode(
            node: ConstructorTypeNode,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateBaseSignatureDeclaration(createConstructorTypeNode(typeParameters, parameters, type), node)
                : reuse(node);
        }

        // @api
        function createTypeQueryNode(exprName: EntityName) {
            const node = createBaseNode<TypeQueryNode>(SyntaxKind.TypeQuery);
            setChild(node, node.exprName = exprName);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName) {
            return node.exprName !== exprName
                ? update(createTypeQueryNode(exprName), node)
                : reuse(node);
        }

        // @api
        function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
            const node = createBaseNode<TypeLiteralNode>(SyntaxKind.TypeLiteral);
            setChildren(node, node.members = createNodeArray(members));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>) {
            return node.members !== members
                ? update(createTypeLiteralNode(members), node)
                : reuse(node);
        }

        // @api
        function createArrayTypeNode(elementType: TypeNode) {
            const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
            setChild(node, node.elementType = lazyParenthesizer().parenthesizeElementTypeOfArrayType(elementType));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
            return node.elementType !== elementType
                ? update(createArrayTypeNode(elementType), node)
                : reuse(node);
        }

        // @api
        function createTupleTypeNode(elementTypes: readonly TypeNode[]) {
            const node = createBaseNode<TupleTypeNode>(SyntaxKind.TupleType);
            setChildren(node, node.elementTypes = createNodeArray(elementTypes));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTupleTypeNode(node: TupleTypeNode, elementTypes: readonly TypeNode[]) {
            return node.elementTypes !== elementTypes
                ? update(createTupleTypeNode(elementTypes), node)
                : reuse(node);
        }

        // @api
        function createOptionalTypeNode(type: TypeNode) {
            const node = createBaseNode<OptionalTypeNode>(SyntaxKind.OptionalType);
            setChild(node, node.type = lazyParenthesizer().parenthesizeElementTypeOfArrayType(type));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
            return node.type !== type
                ? update(createOptionalTypeNode(type), node)
                : reuse(node);
        }

        // @api
        function createRestTypeNode(type: TypeNode) {
            const node = createBaseNode<RestTypeNode>(SyntaxKind.RestType);
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
            return node.type !== type
                ? update(createRestTypeNode(type), node)
                : reuse(node);
        }

        function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: readonly TypeNode[]) {
            const node = createBaseNode<UnionTypeNode | IntersectionTypeNode>(kind);
            setChildren(node, node.types = lazyParenthesizer().parenthesizeConstituentTypesOfUnionOrIntersectionType(createNodeArray(types)));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        function updateUnionOrIntersectionTypeNode<T extends UnionOrIntersectionTypeNode>(node: T, types: NodeArray<TypeNode>): T {
            return node.types !== types
                ? update(<T>createUnionOrIntersectionTypeNode(node.kind, types), node)
                : reuse(node);
        }

        // @api
        function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
            return <UnionTypeNode>createUnionOrIntersectionTypeNode(SyntaxKind.UnionType, types);
        }

        // @api
        function updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>) {
            return updateUnionOrIntersectionTypeNode(node, types);
        }

        // @api
        function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
            return <IntersectionTypeNode>createUnionOrIntersectionTypeNode(SyntaxKind.IntersectionType, types);
        }

        // @api
        function updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>) {
            return updateUnionOrIntersectionTypeNode(node, types);
        }

        // @api
        function createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
            const node = createBaseNode<ConditionalTypeNode>(SyntaxKind.ConditionalType);
            setChild(node, node.checkType = lazyParenthesizer().parenthesizeMemberOfConditionalType(checkType));
            setChild(node, node.extendsType = lazyParenthesizer().parenthesizeMemberOfConditionalType(extendsType));
            setChild(node, node.trueType = trueType);
            setChild(node, node.falseType = falseType);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
            return node.checkType !== checkType
                || node.extendsType !== extendsType
                || node.trueType !== trueType
                || node.falseType !== falseType
                ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
                : reuse(node);
        }

        // @api
        function createInferTypeNode(typeParameter: TypeParameterDeclaration) {
            const node = createBaseNode<InferTypeNode>(SyntaxKind.InferType);
            setChild(node, node.typeParameter = typeParameter);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration) {
            return node.typeParameter !== typeParameter
                ? update(createInferTypeNode(typeParameter), node)
                : reuse(node);
        }

        // @api
        function createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            const node = createBaseNode<ImportTypeNode>(SyntaxKind.ImportType);
            setChild(node, node.argument = argument);
            setChild(node, node.qualifier = qualifier);
            setChildren(node, node.typeArguments = typeArguments && lazyParenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments)));
            node.isTypeOf = isTypeOf;
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            return node.argument !== argument
                || node.qualifier !== qualifier
                || node.typeArguments !== typeArguments
                || node.isTypeOf !== isTypeOf
                ? update(createImportTypeNode(argument, qualifier, typeArguments, isTypeOf), node)
                : reuse(node);
        }

        // @api
        function createParenthesizedType(type: TypeNode) {
            const node = createBaseNode<ParenthesizedTypeNode>(SyntaxKind.ParenthesizedType);
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode) {
            return node.type !== type
                ? update(createParenthesizedType(type), node)
                : reuse(node);
        }

        // @api
        function createThisTypeNode() {
            const node = createBaseNode<ThisTypeNode>(SyntaxKind.ThisType);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
            const node = createBaseNode<TypeOperatorNode>(SyntaxKind.TypeOperator);
            node.operator = operator;
            setChild(node, node.type = lazyParenthesizer().parenthesizeMemberOfElementType(type));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode) {
            return node.type !== type
                ? update(createTypeOperatorNode(node.operator, type), node)
                : reuse(node);
        }

        // @api
        function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode) {
            const node = createBaseNode<IndexedAccessTypeNode>(SyntaxKind.IndexedAccessType);
            setChild(node, node.objectType = lazyParenthesizer().parenthesizeMemberOfElementType(objectType));
            setChild(node, node.indexType = indexType);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) {
            return node.objectType !== objectType
                || node.indexType !== indexType
                ? update(createIndexedAccessTypeNode(objectType, indexType), node)
                : reuse(node);
        }

        // @api
        function createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            const node = createBaseNode<MappedTypeNode>(SyntaxKind.MappedType);
            setChild(node, node.readonlyToken = readonlyToken);
            setChild(node, node.typeParameter = typeParameter);
            setChild(node, node.questionToken = questionToken);
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            return node.readonlyToken !== readonlyToken
                || node.typeParameter !== typeParameter
                || node.questionToken !== questionToken
                || node.type !== type
                ? update(createMappedTypeNode(readonlyToken, typeParameter, questionToken, type), node)
                : reuse(node);
        }

        // @api
        function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
            const node = createBaseNode<LiteralTypeNode>(SyntaxKind.LiteralType);
            setChild(node, node.literal = literal);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]) {
            return node.literal !== literal
                ? update(createLiteralTypeNode(literal), node)
                : reuse(node);
        }

        //
        // Binding Patterns
        //

        // @api
        function createObjectBindingPattern(elements: readonly BindingElement[]) {
            const node = createBaseNode<ObjectBindingPattern>(SyntaxKind.ObjectBindingPattern);
            setChildren(node, node.elements = createNodeArray(elements));
            if (!skipTransformationFlags) {
                markES2015(node);
                markBindingPattern(node);
                if (node.transformFlags & TransformFlags.ContainsRestOrSpread) {
                    markES2018(node);
                    markObjectRestOrSpread(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]) {
            return node.elements !== elements
                ? update(createObjectBindingPattern(elements), node)
                : reuse(node);
        }

        // @api
        function createArrayBindingPattern(elements: readonly ArrayBindingElement[]) {
            const node = createBaseNode<ArrayBindingPattern>(SyntaxKind.ArrayBindingPattern);
            setChildren(node, node.elements = createNodeArray(elements));
            if (!skipTransformationFlags) {
                markES2015(node);
                markBindingPattern(node);
            }
            return finish(node);
        }

        // @api
        function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) {
            return node.elements !== elements
                ? update(createArrayBindingPattern(elements), node)
                : reuse(node);
        }

        // @api
        function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression) {
            const node = createBaseBindingLikeDeclaration<BindingElement>(
                SyntaxKind.BindingElement,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                initializer
            );
            setChild(node, node.propertyName = asName(propertyName));
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            if (!skipTransformationFlags) {
                if (dotDotDotToken) markRestOrSpread(node);
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) {
            return node.propertyName !== propertyName
                || node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.initializer !== initializer
                ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
                : reuse(node);
        }

        //
        // Expression
        //

        // @api
        function createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean) {
            const node = createBaseNode<ArrayLiteralExpression>(SyntaxKind.ArrayLiteralExpression);
            setChildren(node, node.elements = lazyParenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(elements)));
            if (multiLine) node.multiLine = true;
            return finish(node);
        }

        // @api
        function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? update(createArrayLiteralExpression(elements, node.multiLine), node)
                : reuse(node);
        }

        // @api
        function createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean) {
            const node = createBaseNode<ObjectLiteralExpression>(SyntaxKind.ObjectLiteralExpression);
            setChildren(node, node.properties = createNodeArray(properties));
            if (multiLine) node.multiLine = true;
            return finish(node);
        }

        // @api
        function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) {
            return node.properties !== properties
                ? update(createObjectLiteralExpression(properties, node.multiLine), node)
                : reuse(node);
        }

        // @api
        function createPropertyAccessExpression(expression: Expression, name: string | Identifier) {
            const node = createBaseNode<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChild(node, node.name = asName(name));
            if (!skipTransformationFlags) {
                // super method calls require a lexical 'this'
                // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
                if (expression.kind === SyntaxKind.SuperKeyword) {
                    markES2017(node);
                    markES2018(node);
                }
            }
            return finish(node);
        }

        // @api
        function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: Identifier) {
            return node.expression !== expression
                || node.name !== name
                ? update(createPropertyAccessExpression(expression, name), node)
                : reuse(node);
        }

        // @api
        function createElementAccessExpression(expression: Expression, index: number | Expression) {
            const node = createBaseNode<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChild(node, node.argumentExpression = asExpression(index));
            if (!skipTransformationFlags) {
                // super method calls require a lexical 'this'
                // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
                if (expression.kind === SyntaxKind.SuperKeyword) {
                    markES2017(node);
                    markES2018(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) {
            return node.expression !== expression
                || node.argumentExpression !== argumentExpression
                ? update(createElementAccessExpression(expression, argumentExpression), node)
                : reuse(node);
        }

        // @api
        function createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createBaseNode<CallExpression>(SyntaxKind.CallExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChildren(node, node.arguments = lazyParenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
            if (!skipTransformationFlags) {
                if (typeArguments) {
                    markTypeScript(node);
                }
                if (expression.kind === SyntaxKind.ImportKeyword) {
                    markDynamicImport(node);
                }
                if (isSuperProperty(expression)) {
                    markLexicalThis(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? update(createCallExpression(expression, typeArguments, argumentsArray), node)
                : reuse(node);
        }

        // @api
        function createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createBaseNode<NewExpression>(SyntaxKind.NewExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionOfNew(expression));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChildren(node, node.arguments = argumentsArray ? lazyParenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)) : undefined);
            if (!skipTransformationFlags) {
                if (typeArguments) {
                    markTypeScript(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? update(createNewExpression(expression, typeArguments, argumentsArray), node)
                : reuse(node);
        }

        // @api
        function createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            const node = createBaseNode<TaggedTemplateExpression>(SyntaxKind.TaggedTemplateExpression);
            setChild(node, node.tag = lazyParenthesizer().parenthesizeLeftSideOfAccess(tag));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.template = template);
            if (!skipTransformationFlags) {
                markES2015(node);
                if (typeArguments) {
                    markTypeScript(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            return node.tag !== tag
                || node.typeArguments !== typeArguments
                || node.template !== template
                ? update(createTaggedTemplateExpression(tag, typeArguments, template), node)
                : reuse(node);
        }

        // @api
        function createTypeAssertion(type: TypeNode, expression: Expression) {
            const node = createBaseNode<TypeAssertion>(SyntaxKind.TypeAssertionExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression) {
            return node.type !== type
                || node.expression !== expression
                ? update(createTypeAssertion(type, expression), node)
                : reuse(node);
        }

        // @api
        function createParenthesizedExpression(expression: Expression) {
            const node = createBaseNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
            setChild(node, node.expression = expression);
            return finish(node);
        }

        // @api
        function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createParenthesizedExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createFunctionExpression(
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[] | undefined,
            type: TypeNode | undefined,
            body: Block
        ) {
            const node = createBaseFunctionLikeDeclaration<FunctionExpression>(
                SyntaxKind.FunctionExpression,
                /*decorators*/ undefined,
                modifiers,
                name,
                typeParameters,
                parameters,
                type,
                body
            );
            setChild(node, node.asteriskToken = asteriskToken);
            if (!skipTransformationFlags) {
                if (typeParameters) {
                    markTypeScript(node);
                }
                if (hasModifier(node, ModifierFlags.Async)) {
                    if (asteriskToken) {
                        markES2018(node);
                    }
                    else {
                        markES2017(node);
                    }
                }
                else if (asteriskToken) {
                    markGenerator(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateFunctionExpression(
            node: FunctionExpression,
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block
        ) {
            return node.name !== name
                || node.modifiers !== modifiers
                || node.asteriskToken !== asteriskToken
                || node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
                : reuse(node);
        }

        // @api
        function createArrowFunction(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken | undefined,
            body: ConciseBody
        ) {
            const node = createBaseFunctionLikeDeclaration<ArrowFunction>(
                SyntaxKind.ArrowFunction,
                /*decorators*/ undefined,
                modifiers,
                /*name*/ undefined,
                typeParameters,
                parameters,
                type,
                lazyParenthesizer().parenthesizeConciseBodyOfArrowFunction(body)
            );
            setChild(node, node.equalsGreaterThanToken = equalsGreaterThanToken || createToken(SyntaxKind.EqualsGreaterThanToken));
            if (!skipTransformationFlags) {
                if (hasModifier(node, ModifierFlags.Async)) markES2017(node);
                markES2015(node);
            }
            return finish(node);
        }

        function createArrowFunctionWithoutTokens(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ) {
            return createArrowFunction(modifiers, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, body);
        }

        function updateArrowFunctionWithoutTokens(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ): ArrowFunction {
            return updateArrowFunction(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, body);
        }

        // @api
        function updateArrowFunction(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken,
            body: ConciseBody
        ): ArrowFunction {
            return node.modifiers !== modifiers
                || node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                || node.equalsGreaterThanToken !== equalsGreaterThanToken
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body), node)
                : reuse(node);
        }

        // @api
        function createDeleteExpression(expression: Expression) {
            const node = createBaseNode<DeleteExpression>(SyntaxKind.DeleteExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finish(node);
        }

        // @api
        function updateDeleteExpression(node: DeleteExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createDeleteExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createTypeOfExpression(expression: Expression) {
            const node = createBaseNode<TypeOfExpression>(SyntaxKind.TypeOfExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finish(node);
        }

        // @api
        function updateTypeOfExpression(node: TypeOfExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createTypeOfExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createVoidExpression(expression: Expression) {
            const node = createBaseNode<VoidExpression>(SyntaxKind.VoidExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finish(node);
        }

        // @api
        function updateVoidExpression(node: VoidExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createVoidExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createAwaitExpression(expression: Expression) {
            const node = createBaseNode<AwaitExpression>(SyntaxKind.AwaitExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            if (!skipTransformationFlags) {
                markES2017(node);
                markES2018(node);
            }
            return finish(node);
        }

        // @api
        function updateAwaitExpression(node: AwaitExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createAwaitExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression) {
            const node = createBaseNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
            node.operator = operator;
            setChild(node, node.operand = lazyParenthesizer().parenthesizeOperandOfPrefixUnary(operand));
            return finish(node);
        }

        // @api
        function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? update(createPrefixUnaryExpression(node.operator, operand), node)
                : reuse(node);
        }

        // @api
        function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator) {
            const node = createBaseNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
            node.operator = operator;
            setChild(node, node.operand = lazyParenthesizer().parenthesizeOperandOfPostfixUnary(operand));
            return finish(node);
        }

        // @api
        function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? update(createPostfixUnaryExpression(operand, node.operator), node)
                : reuse(node);
        }

        // @api
        function createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) {
            const node = createBaseNode<BinaryExpression>(SyntaxKind.BinaryExpression);
            const operatorToken = asToken(operator);
            const operatorKind = operatorToken.kind;
            setChild(node, node.left = lazyParenthesizer().parenthesizeLeftSideOfBinary(operatorKind, left));
            setChild(node, node.operatorToken = operatorToken);
            setChild(node, node.right = lazyParenthesizer().parenthesizeRightSideOfBinary(operatorKind, node.left, right));
            if (!skipTransformationFlags) {
                if (operatorKind === SyntaxKind.EqualsToken) {
                    if (node.left.kind === SyntaxKind.ObjectLiteralExpression) {
                        markES2015(node);
                        markES2018(node);
                        markDestructuringAssignment(node);
                    }
                    else if (node.left.kind === SyntaxKind.ArrayLiteralExpression) {
                        markES2015(node);
                        markDestructuringAssignment(node);
                    }
                }
                else if (operatorKind === SyntaxKind.AsteriskAsteriskToken || operatorKind === SyntaxKind.AsteriskAsteriskEqualsToken) {
                    markES2016(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateBinaryExpression(node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) {
            return node.left !== left
                || node.right !== right
                ? update(createBinaryExpression(left, operator || node.operatorToken, right), node)
                : reuse(node);
        }

        // @api
        function createConditionalExpression(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression) {
            const node = createBaseNode<ConditionalExpression>(SyntaxKind.ConditionalExpression);
            setChild(node, node.condition = lazyParenthesizer().parenthesizeConditionOfConditionalExpression(condition));
            setChild(node, node.questionToken = questionToken);
            setChild(node, node.whenTrue = lazyParenthesizer().parenthesizeBranchOfConditionalExpression(whenTrue));
            setChild(node, node.colonToken = colonToken);
            setChild(node, node.whenFalse = lazyParenthesizer().parenthesizeBranchOfConditionalExpression(whenFalse));
            return finish(node);
        }

        function createConditionalExpressionWithoutTokens(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
            return createConditionalExpression(condition, createToken(SyntaxKind.QuestionToken), whenTrue, createToken(SyntaxKind.ColonToken), whenFalse);
        }

        // @api
        function updateConditionalExpression(
            node: ConditionalExpression,
            condition: Expression,
            questionToken: Token<SyntaxKind.QuestionToken>,
            whenTrue: Expression,
            colonToken: Token<SyntaxKind.ColonToken>,
            whenFalse: Expression
        ): ConditionalExpression {
            return node.condition !== condition
                || node.questionToken !== questionToken
                || node.whenTrue !== whenTrue
                || node.colonToken !== colonToken
                || node.whenFalse !== whenFalse
                ? update(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node)
                : reuse(node);
        }

        function updateConditionalExpressionWithoutTokens(
            node: ConditionalExpression,
            condition: Expression,
            whenTrue: Expression,
            whenFalse: Expression
        ): ConditionalExpression {
            return updateConditionalExpression(node, condition, node.questionToken, whenTrue, node.colonToken, whenFalse);
        }

        // @api
        function createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
            const node = createBaseNode<TemplateExpression>(SyntaxKind.TemplateExpression);
            setChild(node, node.head = head);
            setChildren(node, node.templateSpans = createNodeArray(templateSpans));
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
            return node.head !== head
                || node.templateSpans !== templateSpans
                ? update(createTemplateExpression(head, templateSpans), node)
                : reuse(node);
        }

        function createTemplateLiteralLikeNodeChecked(kind: TemplateLiteralToken["kind"], text: string | undefined, rawText: string | undefined) {
            // tslint:disable-next-line:no-unnecessary-initializer
            let cooked: string | object | undefined = undefined;
            if (rawText !== undefined && rawText !== text) {
                cooked = getCookedText(kind, rawText);
                if (typeof cooked === "object") {
                    return Debug.fail("Invalid raw text");
                }
            }
            if (text === undefined) {
                if (cooked === undefined) {
                    return Debug.fail("Arguments 'text' and 'rawText' may not both be undefined.");
                }
                text = cooked;
            }
            else if (cooked !== undefined) {
                Debug.assert(text === cooked, "Expected argument 'text' to be the normalized (i.e. 'cooked') version of argument 'rawText'.");
            }
            return createTemplateLiteralLikeNode(kind, text, rawText);
        }

        // @api
        function createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string | undefined) {
            const node = createTokenNode(kind) as TemplateLiteralLikeNode;
            node.text = text;
            node.rawText = rawText;
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function createTemplateHead(text: string | undefined, rawText?: string) {
            return <TemplateHead>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateHead, text, rawText);
        }

        // @api
        function createTemplateMiddle(text: string | undefined, rawText?: string) {
            return <TemplateMiddle>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateMiddle, text, rawText);
        }

        // @api
        function createTemplateTail(text: string | undefined, rawText?: string) {
            return <TemplateTail>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateTail, text, rawText);
        }

        // @api
        function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string) {
            return <NoSubstitutionTemplateLiteral>createTemplateLiteralLikeNodeChecked(SyntaxKind.NoSubstitutionTemplateLiteral, text, rawText);
        }

        // @api
        function createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
            Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
            const node = createBaseNode<YieldExpression>(SyntaxKind.YieldExpression);
            setChild(node, node.expression = expression);
            setChild(node, node.asteriskToken = asteriskToken);
            if (!skipTransformationFlags) {
                markES2015(node);
                markES2018(node);
                markYield(node);
            }
            return finish(node);
        }

        // @api
        function updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression) {
            return node.expression !== expression
                || node.asteriskToken !== asteriskToken
                ? update(createYieldExpression(asteriskToken, expression), node)
                : reuse(node);
        }

        // @api
        function createSpreadElement(expression: Expression) {
            const node = createBaseNode<SpreadElement>(SyntaxKind.SpreadElement);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            if (!skipTransformationFlags) {
                markES2015(node);
                markRestOrSpread(node);
            }
            return finish(node);
        }

        // @api
        function updateSpreadElement(node: SpreadElement, expression: Expression) {
            return node.expression !== expression
                ? update(createSpreadElement(expression), node)
                : reuse(node);
        }

        // @api
        function createClassExpression(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            const node = createBaseClassLikeDeclaration<ClassExpression>(
                SyntaxKind.ClassExpression,
                decorators,
                modifiers,
                name,
                typeParameters,
                heritageClauses,
                members
            );
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateClassExpression(
            node: ClassExpression,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.heritageClauses !== heritageClauses
                || node.members !== members
                ? update(createClassExpression(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuse(node);
        }

        // @api
        function createOmittedExpression() {
            return finish(createBaseNode<OmittedExpression>(SyntaxKind.OmittedExpression));
        }

        // @api
        function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            const node = createBaseNode<ExpressionWithTypeArguments>(SyntaxKind.ExpressionWithTypeArguments);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChildren(node, node.typeArguments = typeArguments && lazyParenthesizer().parenthesizeTypeArguments(typeArguments));
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                ? update(createExpressionWithTypeArguments(expression, typeArguments), node)
                : reuse(node);
        }

        // @api
        function createAsExpression(expression: Expression, type: TypeNode) {
            const node = createBaseNode<AsExpression>(SyntaxKind.AsExpression);
            setChild(node, node.expression = expression);
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode) {
            return node.expression !== expression
                || node.type !== type
                ? update(createAsExpression(expression, type), node)
                : reuse(node);
        }

        // @api
        function createNonNullExpression(expression: Expression) {
            const node = createBaseNode<NonNullExpression>(SyntaxKind.NonNullExpression);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeLeftSideOfAccess(expression));
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateNonNullExpression(node: NonNullExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createNonNullExpression(expression), node)
                : reuse(node);
        }

        // @api
        function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier) {
            const node = createBaseNode<MetaProperty>(SyntaxKind.MetaProperty);
            node.keywordToken = keywordToken;
            setChild(node, node.name = name);
            if (!skipTransformationFlags) {
                switch (keywordToken) {
                    case SyntaxKind.NewKeyword:
                        markES2015(node);
                        break;
                    case SyntaxKind.ImportKeyword:
                        markESNext(node);
                        break;
                    default:
                        return Debug.assertNever(keywordToken);
                }
            }
            return finish(node);
        }

        // @api
        function updateMetaProperty(node: MetaProperty, name: Identifier) {
            return node.name !== name
                ? update(createMetaProperty(node.keywordToken, name), node)
                : reuse(node);
        }

        //
        // Misc
        //

        // @api
        function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail) {
            const node = createBaseNode<TemplateSpan>(SyntaxKind.TemplateSpan);
            setChild(node, node.expression = expression);
            setChild(node, node.literal = literal);
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) {
            return node.expression !== expression
                || node.literal !== literal
                ? update(createTemplateSpan(expression, literal), node)
                : reuse(node);
        }

        // @api
        function createSemicolonClassElement() {
            const node = createBaseNode<SemicolonClassElement>(SyntaxKind.SemicolonClassElement);
            markES2015(node);
            return finish(node);
        }

        //
        // Element
        //

        // @api
        function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
            const node = createBaseNode<Block>(SyntaxKind.Block);
            setChildren(node, node.statements = createNodeArray(statements));
            if (multiLine) node.multiLine = multiLine;
            return finish(node);
        }

        // @api
        function updateBlock(node: Block, statements: readonly Statement[]) {
            return node.statements !== statements
                ? update(createBlock(statements, node.multiLine), node)
                : reuse(node);
        }

        // @api
        function createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) {
            const node = createBaseDeclaration<VariableStatement>(SyntaxKind.VariableStatement, /*decorators*/ undefined, modifiers);
            setChild(node, node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList);
            if (!skipTransformationFlags) {
                if (hasModifier(node, ModifierFlags.Ambient)) {
                    markTypeScriptOnly(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateVariableStatement(node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList) {
            return node.modifiers !== modifiers
                || node.declarationList !== declarationList
                ? update(createVariableStatement(modifiers, declarationList), node)
                : reuse(node);
        }

        // @api
        function createEmptyStatement() {
            return finish(createBaseNode<EmptyStatement>(SyntaxKind.EmptyStatement));
        }

        // @api
        function createExpressionStatement(expression: Expression): ExpressionStatement {
            const node = createBaseNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionOfExpressionStatement(expression));
            return finish(node);
        }

        // @api
        function updateExpressionStatement(node: ExpressionStatement, expression: Expression) {
            return node.expression !== expression
                ? update(createExpressionStatement(expression), node)
                : reuse(node);
        }

        // @api
        function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement) {
            const node = createBaseNode<IfStatement>(SyntaxKind.IfStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.thenStatement = asEmbeddedStatement(thenStatement));
            setChild(node, node.elseStatement = asEmbeddedStatement(elseStatement));
            return finish(node);
        }

        // @api
        function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) {
            return node.expression !== expression
                || node.thenStatement !== thenStatement
                || node.elseStatement !== elseStatement
                ? update(createIfStatement(expression, thenStatement, elseStatement), node)
                : reuse(node);
        }

        // @api
        function createDoStatement(statement: Statement, expression: Expression) {
            const node = createBaseNode<DoStatement>(SyntaxKind.DoStatement);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            setChild(node, node.expression = expression);
            return finish(node);
        }

        // @api
        function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression) {
            return node.statement !== statement
                || node.expression !== expression
                ? update(createDoStatement(statement, expression), node)
                : reuse(node);
        }

        // @api
        function createWhileStatement(expression: Expression, statement: Statement) {
            const node = createBaseNode<WhileStatement>(SyntaxKind.WhileStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finish(node);
        }

        // @api
        function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? update(createWhileStatement(expression, statement), node)
                : reuse(node);
        }

        // @api
        function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            const node = createBaseNode<ForStatement>(SyntaxKind.ForStatement);
            setChild(node, node.initializer = initializer);
            setChild(node, node.condition = condition);
            setChild(node, node.incrementor = incrementor);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finish(node);
        }

        // @api
        function updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            return node.initializer !== initializer
                || node.condition !== condition
                || node.incrementor !== incrementor
                || node.statement !== statement
                ? update(createForStatement(initializer, condition, incrementor, statement), node)
                : reuse(node);
        }

        // @api
        function createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createBaseNode<ForInStatement>(SyntaxKind.ForInStatement);
            setChild(node, node.initializer = initializer);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finish(node);
        }

        // @api
        function updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? update(createForInStatement(initializer, expression, statement), node)
                : reuse(node);
        }

        // @api
        function createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createBaseNode<ForOfStatement>(SyntaxKind.ForOfStatement);
            setChild(node, node.awaitModifier = awaitModifier);
            setChild(node, node.initializer = initializer);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            if (!skipTransformationFlags) {
                if (awaitModifier) markES2018(node);
                markES2015(node);
            }
            return finish(node);
        }

        // @api
        function updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.awaitModifier !== awaitModifier
                || node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node)
                : reuse(node);
        }

        // @api
        function createContinueStatement(label?: string | Identifier): ContinueStatement {
            const node = createBaseNode<ContinueStatement>(SyntaxKind.ContinueStatement);
            setChild(node, node.label = asName(label));
            if (!skipTransformationFlags) {
                markHoistedDeclarationOrCompletion(node);
            }
            return finish(node);
        }

        // @api
        function updateContinueStatement(node: ContinueStatement, label: Identifier | undefined) {
            return node.label !== label
                ? update(createContinueStatement(label), node)
                : reuse(node);
        }

        // @api
        function createBreakStatement(label?: string | Identifier): BreakStatement {
            const node = createBaseNode<BreakStatement>(SyntaxKind.BreakStatement);
            setChild(node, node.label = asName(label));
            if (!skipTransformationFlags) {
                markHoistedDeclarationOrCompletion(node);
            }
            return finish(node);
        }

        // @api
        function updateBreakStatement(node: BreakStatement, label: Identifier | undefined) {
            return node.label !== label
                ? update(createBreakStatement(label), node)
                : reuse(node);
        }

        // @api
        function createReturnStatement(expression?: Expression): ReturnStatement {
            const node = createBaseNode<ReturnStatement>(SyntaxKind.ReturnStatement);
            setChild(node, node.expression = expression);
            if (!skipTransformationFlags) {
                // return in an ES2018 async generator must be awaited
                markES2018(node);
                markHoistedDeclarationOrCompletion(node);
            }
            return finish(node);
        }

        // @api
        function updateReturnStatement(node: ReturnStatement, expression: Expression | undefined) {
            return node.expression !== expression
                ? update(createReturnStatement(expression), node)
                : reuse(node);
        }

        // @api
        function createWithStatement(expression: Expression, statement: Statement) {
            const node = createBaseNode<WithStatement>(SyntaxKind.WithStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finish(node);
        }

        // @api
        function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? update(createWithStatement(expression, statement), node)
                : reuse(node);
        }

        // @api
        function createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement {
            const node = createBaseNode<SwitchStatement>(SyntaxKind.SwitchStatement);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            setChild(node, node.caseBlock = caseBlock);
            return finish(node);
        }

        // @api
        function updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) {
            return node.expression !== expression
                || node.caseBlock !== caseBlock
                ? update(createSwitchStatement(expression, caseBlock), node)
                : reuse(node);
        }

        // @api
        function createLabeledStatement(label: string | Identifier, statement: Statement) {
            const node = createBaseNode<LabeledStatement>(SyntaxKind.LabeledStatement);
            setChild(node, node.label = asName(label));
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finish(node);
        }

        // @api
        function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement) {
            return node.label !== label
                || node.statement !== statement
                ? update(createLabeledStatement(label, statement), node)
                : reuse(node);
        }

        // @api
        function createThrowStatement(expression: Expression) {
            const node = createBaseNode<ThrowStatement>(SyntaxKind.ThrowStatement);
            setChild(node, node.expression = expression);
            return finish(node);
        }

        // @api
        function updateThrowStatement(node: ThrowStatement, expression: Expression) {
            return node.expression !== expression
                ? update(createThrowStatement(expression), node)
                : reuse(node);
        }

        // @api
        function createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            const node = createBaseNode<TryStatement>(SyntaxKind.TryStatement);
            setChild(node, node.tryBlock = tryBlock);
            setChild(node, node.catchClause = catchClause);
            setChild(node, node.finallyBlock = finallyBlock);
            return finish(node);
        }

        // @api
        function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            return node.tryBlock !== tryBlock
                || node.catchClause !== catchClause
                || node.finallyBlock !== finallyBlock
                ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node)
                : reuse(node);
        }

        // @api
        function createDebuggerStatement() {
            return finish(createBaseNode<DebuggerStatement>(SyntaxKind.DebuggerStatement));
        }

        // @api
        function createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) {
            const node = createBaseVariableLikeDeclaration<VariableDeclaration>(
                SyntaxKind.VariableDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                type,
                initializer && lazyParenthesizer().parenthesizeExpressionForDisallowedComma(initializer)
            );
            setChild(node, node.exclamationToken = exclamationToken);
            return finish(node);
        }

        function createVariableDeclarationWithoutTokens(name: string | BindingName, type?: TypeNode, initializer?: Expression) {
            return createVariableDeclaration(name, /*exclamationToken*/ undefined, type, initializer);
        }

        // @api
        function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) {
            return node.name !== name
                || node.type !== type
                || node.exclamationToken !== exclamationToken
                || node.initializer !== initializer
                ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node)
                : reuse(node);
        }

        function updateVariableDeclarationWithoutTokens(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined) {
            return updateVariableDeclaration(node, name, node.exclamationToken, type, initializer);
        }

        // @api
        function createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags = NodeFlags.None) {
            const node = createBaseNode<VariableDeclarationList>(SyntaxKind.VariableDeclarationList);
            node.flags |= flags & NodeFlags.BlockScoped;
            setChildren(node, node.declarations = createNodeArray(declarations));
            if (!skipTransformationFlags) {
                markHoistedDeclarationOrCompletion(node);
                if (flags & NodeFlags.BlockScoped) {
                    markES2015(node);
                    markBlockScopedBinding(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) {
            return node.declarations !== declarations
                ? update(createVariableDeclarationList(declarations, node.flags), node)
                : reuse(node);
        }

        // @api
        function createFunctionDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            const node = createBaseFunctionLikeDeclaration<FunctionDeclaration>(
                SyntaxKind.FunctionDeclaration,
                decorators,
                modifiers,
                name,
                typeParameters,
                parameters,
                type,
                body
            );
            setChild(node, node.asteriskToken = asteriskToken);
            if (!skipTransformationFlags) {
                if (!body || hasModifier(node, ModifierFlags.Ambient)) {
                    markTypeScriptOnly(node);
                }
                else {
                    markHoistedDeclarationOrCompletion(node);
                    if (hasModifier(node, ModifierFlags.Async)) {
                        if (asteriskToken) {
                            markES2018(node);
                        }
                        else {
                            markES2017(node);
                        }
                    }
                    else if (asteriskToken) {
                        markGenerator(node);
                    }
                }
            }
            return finish(node);
        }

        // @api
        function updateFunctionDeclaration(
            node: FunctionDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: Block | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.asteriskToken !== asteriskToken
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                || node.body !== body
                ? updateBaseFunctionLikeDeclaration(createFunctionDeclaration(decorators, modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
                : reuse(node);
        }

        // @api
        function createClassDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            const node = createBaseClassLikeDeclaration<ClassDeclaration>(
                SyntaxKind.ClassDeclaration,
                decorators,
                modifiers,
                name,
                typeParameters,
                heritageClauses,
                members
            );
            if (!skipTransformationFlags) {
                if (hasModifier(node, ModifierFlags.Ambient)) {
                    markTypeScriptOnly(node);
                }
                else {
                    markES2015(node);
                    if (node.transformFlags & TransformFlags.ContainsTypeScriptClassSyntax) {
                        markTypeScript(node);
                    }
                }
            }
            return finish(node);
        }

        // @api
        function updateClassDeclaration(
            node: ClassDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.heritageClauses !== heritageClauses
                || node.members !== members
                ? update(createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuse(node);
        }

        // @api
        function createInterfaceDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly TypeElement[]
        ) {
            const node = createBaseInterfaceOrClassLikeDeclaration<InterfaceDeclaration>(
                SyntaxKind.InterfaceDeclaration,
                decorators,
                modifiers,
                name,
                typeParameters,
                heritageClauses
            );
            setChildren(node, node.members = createNodeArray(members));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateInterfaceDeclaration(
            node: InterfaceDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly TypeElement[]
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.heritageClauses !== heritageClauses
                || node.members !== members
                ? update(createInterfaceDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuse(node);
        }

        // @api
        function createTypeAliasDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            type: TypeNode
        ) {
            const node = createBaseGenericNamedDeclaration<TypeAliasDeclaration>(
                SyntaxKind.TypeAliasDeclaration,
                decorators,
                modifiers,
                name,
                typeParameters
            );
            setChild(node, node.type = type);
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateTypeAliasDeclaration(
            node: TypeAliasDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            type: TypeNode
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.type !== type
                ? update(createTypeAliasDeclaration(decorators, modifiers, name, typeParameters, type), node)
                : reuse(node);
        }

        // @api
        function createEnumDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            members: readonly EnumMember[]
        ) {
            const node = createBaseNamedDeclaration<EnumDeclaration>(
                SyntaxKind.EnumDeclaration,
                decorators,
                modifiers,
                name
            );
            setChildren(node, node.members = createNodeArray(members));
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateEnumDeclaration(
            node: EnumDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier,
            members: readonly EnumMember[]) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.members !== members
                ? update(createEnumDeclaration(decorators, modifiers, name, members), node)
                : reuse(node);
        }

        // @api
        function createModuleDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: ModuleName,
            body: ModuleBody | undefined,
            flags = NodeFlags.None
        ) {
            const node = createBaseDeclaration<ModuleDeclaration>(
                SyntaxKind.ModuleDeclaration,
                decorators,
                modifiers
            );
            node.flags |= flags & (NodeFlags.Namespace | NodeFlags.NestedNamespace | NodeFlags.GlobalAugmentation);
            setChild(node, node.name = name);
            setChild(node, node.body = body);
            if (!skipTransformationFlags) {
                if (hasModifier(node, ModifierFlags.Ambient)) {
                    markTypeScriptOnly(node);
                }
                else {
                    markTypeScript(node);
                }
            }
            return finish(node);
        }

        // @api
        function updateModuleDeclaration(
            node: ModuleDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: ModuleName,
            body: ModuleBody | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.body !== body
                ? update(createModuleDeclaration(decorators, modifiers, name, body, node.flags), node)
                : reuse(node);
        }

        // @api
        function createModuleBlock(statements: readonly Statement[]) {
            const node = createBaseNode<ModuleBlock>(SyntaxKind.ModuleBlock);
            setChildren(node, node.statements = createNodeArray(statements));
            return finish(node);
        }

        // @api
        function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]) {
            return node.statements !== statements
                ? update(createModuleBlock(statements), node)
                : reuse(node);
        }

        // @api
        function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
            const node = createBaseNode<CaseBlock>(SyntaxKind.CaseBlock);
            setChildren(node, node.clauses = createNodeArray(clauses));
            return finish(node);
        }

        // @api
        function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) {
            return node.clauses !== clauses
                ? update(createCaseBlock(clauses), node)
                : reuse(node);
        }

        // @api
        function createNamespaceExportDeclaration(name: string | Identifier) {
            const node = createBaseNode<NamespaceExportDeclaration>(SyntaxKind.NamespaceExportDeclaration);
            setChild(node, node.name = asName(name));
            if (!skipTransformationFlags) {
                markTypeScriptOnly(node);
            }
            return finish(node);
        }

        // @api
        function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier) {
            return node.name !== name
                ? update(createNamespaceExportDeclaration(name), node)
                : reuse(node);
        }

        // @api
        function createImportEqualsDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            moduleReference: ModuleReference
        ) {
            const node = createBaseNamedDeclaration<ImportEqualsDeclaration>(
                SyntaxKind.ImportEqualsDeclaration,
                decorators,
                modifiers,
                name
            );
            setChild(node, node.moduleReference = moduleReference);
            if (!skipTransformationFlags) {
                if (moduleReference.kind !== SyntaxKind.ExternalModuleReference) markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateImportEqualsDeclaration(
            node: ImportEqualsDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: Identifier,
            moduleReference: ModuleReference
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.moduleReference !== moduleReference
                ? update(createImportEqualsDeclaration(decorators, modifiers, name, moduleReference), node)
                : reuse(node);
        }

        // @api
        function createImportDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            importClause: ImportClause | undefined,
            moduleSpecifier: Expression
        ): ImportDeclaration {
            const node = createBaseDeclaration<ImportDeclaration>(
                SyntaxKind.ImportDeclaration,
                decorators,
                modifiers
            );
            setChild(node, node.importClause = importClause);
            setChild(node, node.moduleSpecifier = moduleSpecifier);
            return finish(node);
        }

        // @api
        function updateImportDeclaration(
            node: ImportDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            importClause: ImportClause | undefined,
            moduleSpecifier: Expression
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.importClause !== importClause
                || node.moduleSpecifier !== moduleSpecifier
                ? update(createImportDeclaration(decorators, modifiers, importClause, moduleSpecifier), node)
                : reuse(node);
        }

        // @api
        function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
            const node = createBaseNode<ImportClause>(SyntaxKind.ImportClause);
            setChild(node, node.name = name);
            setChild(node, node.namedBindings = namedBindings);
            return finish(node);
        }

        // @api
        function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined) {
            return node.name !== name
                || node.namedBindings !== namedBindings
                ? update(createImportClause(name, namedBindings), node)
                : reuse(node);
        }

        // @api
        function createNamespaceImport(name: Identifier): NamespaceImport {
            const node = createBaseNode<NamespaceImport>(SyntaxKind.NamespaceImport);
            setChild(node, node.name = name);
            return finish(node);
        }

        // @api
        function updateNamespaceImport(node: NamespaceImport, name: Identifier) {
            return node.name !== name
                ? update(createNamespaceImport(name), node)
                : reuse(node);
        }

        // @api
        function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
            const node = createBaseNode<NamedImports>(SyntaxKind.NamedImports);
            setChildren(node, node.elements = createNodeArray(elements));
            return finish(node);
        }

        // @api
        function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]) {
            return node.elements !== elements
                ? update(createNamedImports(elements), node)
                : reuse(node);
        }

        // @api
        function createImportSpecifier(propertyName: Identifier | undefined, name: Identifier) {
            const node = createBaseNode<ImportSpecifier>(SyntaxKind.ImportSpecifier);
            setChild(node, node.propertyName = propertyName);
            setChild(node, node.name = name);
            return finish(node);
        }

        // @api
        function updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? update(createImportSpecifier(propertyName, name), node)
                : reuse(node);
        }

        // @api
        function createExportAssignment(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            isExportEquals: boolean | undefined,
            expression: Expression
        ) {
            const node = createBaseDeclaration<ExportAssignment>(
                SyntaxKind.ExportAssignment,
                decorators,
                modifiers
            );
            node.isExportEquals = isExportEquals;
            setChild(node, node.expression = isExportEquals
                ? lazyParenthesizer().parenthesizeRightSideOfBinary(SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
                : lazyParenthesizer().parenthesizeExpressionOfExportDefault(expression));
            return finish(node);
        }

        // @api
        function updateExportAssignment(
            node: ExportAssignment,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            expression: Expression
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.expression !== expression
                ? update(createExportAssignment(decorators, modifiers, node.isExportEquals, expression), node)
                : reuse(node);
        }

        // @api
        function createExportDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            exportClause: NamedExports | undefined,
            moduleSpecifier?: Expression
        ) {
            const node = createBaseDeclaration<ExportDeclaration>(
                SyntaxKind.ExportDeclaration,
                decorators,
                modifiers
            );
            setChild(node, node.exportClause = exportClause);
            setChild(node, node.moduleSpecifier = moduleSpecifier);
            return finish(node);
        }

        // @api
        function updateExportDeclaration(
            node: ExportDeclaration,
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            exportClause: NamedExports | undefined,
            moduleSpecifier: Expression | undefined
        ) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.exportClause !== exportClause
                || node.moduleSpecifier !== moduleSpecifier
                ? update(createExportDeclaration(decorators, modifiers, exportClause, moduleSpecifier), node)
                : reuse(node);
        }

        // @api
        function createNamedExports(elements: readonly ExportSpecifier[]) {
            const node = createBaseNode<NamedExports>(SyntaxKind.NamedExports);
            setChildren(node, node.elements = createNodeArray(elements));
            return finish(node);
        }

        // @api
        function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]) {
            return node.elements !== elements
                ? update(createNamedExports(elements), node)
                : reuse(node);
        }

        // @api
        function createExportSpecifier(propertyName: string | Identifier | undefined, name: string | Identifier) {
            const node = createBaseNode<ExportSpecifier>(SyntaxKind.ExportSpecifier);
            setChild(node, node.propertyName = asName(propertyName));
            setChild(node, node.name = asName(name));
            return finish(node);
        }

        // @api
        function updateExportSpecifier(node: ExportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? update(createExportSpecifier(propertyName, name), node)
                : reuse(node);
        }

        // @api
        function createMissingDeclaration() {
            const node = createBaseDeclaration<MissingDeclaration>(
                SyntaxKind.MissingDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined
            );
            return finish(node);
        }

        //
        // Module references
        //

        // @api
        function createExternalModuleReference(expression: Expression) {
            const node = createBaseNode<ExternalModuleReference>(SyntaxKind.ExternalModuleReference);
            setChild(node, node.expression = expression);
            return finish(node);
        }

        // @api
        function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression) {
            return node.expression !== expression
                ? update(createExternalModuleReference(expression), node)
                : reuse(node);
        }

        //
        // JSDoc
        //

        // @api
        function createJSDocAllType() {
            const node = createBaseNode<JSDocAllType>(SyntaxKind.JSDocAllType);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocUnknownType() {
            const node = createBaseNode<JSDocUnknownType>(SyntaxKind.JSDocUnknownType);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocNonNullableType(type: TypeNode) {
            const node = createBaseNode<JSDocNonNullableType>(SyntaxKind.JSDocNonNullableType);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocNullableType(type: TypeNode) {
            const node = createBaseNode<JSDocNullableType>(SyntaxKind.JSDocNullableType);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocOptionalType(type: TypeNode) {
            const node = createBaseNode<JSDocOptionalType>(SyntaxKind.JSDocOptionalType);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
            const node = createBaseSignatureDeclaration<JSDocFunctionType>(
                SyntaxKind.JSDocFunctionType,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                type
            );
            return finishJSDoc(node);
        }

        // @api
        function createJSDocVariadicType(type: TypeNode) {
            const node = createBaseNode<JSDocVariadicType>(SyntaxKind.JSDocVariadicType);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocNamepathType(type: TypeNode) {
            const node = createBaseNode<JSDocNamepathType>(SyntaxKind.JSDocNamepathType);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral {
            const node = createBaseNode<JSDocTypeLiteral>(SyntaxKind.JSDocTypeLiteral);
            setChildren(node, node.jsDocPropertyTags = asNodeArray(propertyTags));
            node.isArrayType = isArrayType;
            return finishJSDoc(node);
        }

        // @api
        function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
            const node = createBaseNode<JSDocTypeExpression>(SyntaxKind.JSDocTypeExpression);
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
            const node = createBaseNode<JSDocSignature>(SyntaxKind.JSDocSignature);
            setChildren(node, node.typeParameters = asNodeArray(typeParameters));
            setChildren(node, node.parameters = createNodeArray(parameters));
            setChild(node, node.type = type);
            return finishJSDoc(node);
        }

        // @api
        function createBaseJSDocTag<T extends JSDocTag>(kind: T["kind"], tagName: Identifier, comment: string | undefined) {
            const node = createBaseNode<T>(kind);
            setChild(node, node.tagName = tagName);
            node.comment = comment;
            return node;
        }

        // @api
        function createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[]): JSDocTemplateTag {
            const node = createBaseJSDocTag<JSDocTemplateTag>(SyntaxKind.JSDocTemplateTag, tagName || createIdentifier("template"), /*comment*/ undefined);
            setChild(node, node.constraint = constraint);
            setChildren(node, node.typeParameters = createNodeArray(typeParameters));
            return finishJSDoc(node);
        }

        // @api
        function createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string): JSDocTypeTag {
            const node = createBaseJSDocTag<JSDocTypeTag>(SyntaxKind.JSDocTypeTag, tagName || createIdentifier("type"), comment);
            setChild(node, node.typeExpression = typeExpression);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocTypedefTag {
            const node = createBaseJSDocTag<JSDocTypedefTag>(SyntaxKind.JSDocTypedefTag, tagName || createIdentifier("typedef"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.fullName = fullName);
            setChild(node, node.name = getJSDocTypeAliasName(fullName));
            return finishJSDoc(node);
        }

        // @api
        function createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocReturnTag {
            const node = createBaseJSDocTag<JSDocReturnTag>(SyntaxKind.JSDocReturnTag, tagName || createIdentifier("returns"), comment);
            setChild(node, node.typeExpression = typeExpression);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocThisTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocThisTag {
            const node = createBaseJSDocTag<JSDocThisTag>(SyntaxKind.JSDocThisTag, tagName || createIdentifier("this"), /*comment*/ undefined);
            setChild(node, node.typeExpression = typeExpression);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocParameterTag {
            const node = createBaseJSDocTag<JSDocParameterTag>(SyntaxKind.JSDocParameterTag, tagName || createIdentifier("param"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.name = name);
            node.isNameFirst = !!isNameFirst;
            node.isBracketed = isBracketed;
            return finishJSDoc(node);
        }

        // @api
        function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocPropertyTag {
            const node = createBaseJSDocTag<JSDocPropertyTag>(SyntaxKind.JSDocPropertyTag, tagName || createIdentifier("prop"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.name = name);
            node.isNameFirst = !!isNameFirst;
            node.isBracketed = isBracketed;
            return finishJSDoc(node);
        }

        // @api
        function createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string): JSDocAuthorTag {
            const node = createBaseJSDocTag<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag, tagName || createIdentifier("author"), comment);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"]): JSDocAugmentsTag {
            const node = createBaseJSDocTag<JSDocAugmentsTag>(SyntaxKind.JSDocAugmentsTag, tagName || createIdentifier("augments"), /*comment*/ undefined);
            setChild(node, node.class = className);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocCallbackTag {
            const node = createBaseJSDocTag<JSDocCallbackTag>(SyntaxKind.JSDocCallbackTag, tagName || createIdentifier("callback"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.fullName = fullName);
            node.name = getJSDocTypeAliasName(fullName);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocClassTag(tagName: Identifier | undefined): JSDocClassTag {
            const node = createBaseJSDocTag<JSDocClassTag>(SyntaxKind.JSDocClassTag, tagName || createIdentifier("class"), /*comment*/ undefined);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocEnumTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocEnumTag {
            const node = createBaseJSDocTag<JSDocEnumTag>(SyntaxKind.JSDocEnumTag, tagName || createIdentifier("enum"), /*comment*/ undefined);
            setChild(node, node.typeExpression = typeExpression);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocUnknownTag(tagName: Identifier): JSDocUnknownTag {
            const node = createBaseJSDocTag<JSDocUnknownTag>(SyntaxKind.JSDocTag, tagName, /*comment*/ undefined);
            return finishJSDoc(node);
        }

        // @api
        function createJSDocComment(comment?: string | undefined, tags?: NodeArray<JSDocTag> | undefined) {
            const node = createBaseNode<JSDoc>(SyntaxKind.JSDocComment);
            node.comment = comment;
            setChildren(node, node.tags = tags);
            return finishJSDoc(node);
        }

        //
        // JSX
        //

        // @api
        function createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
            const node = createBaseNode<JsxElement>(SyntaxKind.JsxElement);
            setChild(node, node.openingElement = openingElement);
            setChildren(node, node.children = createNodeArray(children));
            setChild(node, node.closingElement = closingElement);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
            return node.openingElement !== openingElement
                || node.children !== children
                || node.closingElement !== closingElement
                ? update(createJsxElement(openingElement, children, closingElement), node)
                : reuse(node);
        }

        // @api
        function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createBaseNode<JsxSelfClosingElement>(SyntaxKind.JsxSelfClosingElement);
            setChild(node, node.tagName = tagName);
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.attributes = attributes);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
                : reuse(node);
        }

        // @api
        function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createBaseNode<JsxOpeningElement>(SyntaxKind.JsxOpeningElement);
            setChild(node, node.tagName = tagName);
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.attributes = attributes);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node)
                : reuse(node);
        }

        // @api
        function createJsxClosingElement(tagName: JsxTagNameExpression) {
            const node = createBaseNode<JsxClosingElement>(SyntaxKind.JsxClosingElement);
            setChild(node, node.tagName = tagName);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression) {
            return node.tagName !== tagName
                ? update(createJsxClosingElement(tagName), node)
                : reuse(node);
        }

        // @api
        function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            const node = createBaseNode<JsxFragment>(SyntaxKind.JsxFragment);
            setChild(node, node.openingFragment = openingFragment);
            setChildren(node, node.children = createNodeArray(children));
            setChild(node, node.closingFragment = closingFragment);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            return node.openingFragment !== openingFragment
                || node.children !== children
                || node.closingFragment !== closingFragment
                ? update(createJsxFragment(openingFragment, children, closingFragment), node)
                : reuse(node);
        }

        // @api
        function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            const node = createBaseNode<JsxText>(SyntaxKind.JsxText);
            node.text = text;
            node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            return node.text !== text
                || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
                ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
                : reuse(node);
        }

        // @api
        function createJsxOpeningFragment() {
            const node = createBaseNode<JsxOpeningFragment>(SyntaxKind.JsxOpeningFragment);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function createJsxJsxClosingFragment() {
            const node = createBaseNode<JsxClosingFragment>(SyntaxKind.JsxClosingFragment);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            const node = createBaseNode<JsxAttribute>(SyntaxKind.JsxAttribute);
            setChild(node, node.name = name);
            setChild(node, node.initializer = initializer);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? update(createJsxAttribute(name, initializer), node)
                : reuse(node);
        }

        // @api
        function createJsxAttributes(properties: readonly JsxAttributeLike[]) {
            const node = createBaseNode<JsxAttributes>(SyntaxKind.JsxAttributes);
            setChildren(node, node.properties = createNodeArray(properties));
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]) {
            return node.properties !== properties
                ? update(createJsxAttributes(properties), node)
                : reuse(node);
        }

        // @api
        function createJsxSpreadAttribute(expression: Expression) {
            const node = createBaseNode<JsxSpreadAttribute>(SyntaxKind.JsxSpreadAttribute);
            setChild(node, node.expression = expression);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression) {
            return node.expression !== expression
                ? update(createJsxSpreadAttribute(expression), node)
                : reuse(node);
        }

        // @api
        function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) {
            const node = createBaseNode<JsxExpression>(SyntaxKind.JsxExpression);
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            setChild(node, node.expression = expression);
            if (!skipTransformationFlags) {
                markJsx(node);
            }
            return finish(node);
        }

        // @api
        function updateJsxExpression(node: JsxExpression, expression: Expression | undefined) {
            return node.expression !== expression
                ? update(createJsxExpression(node.dotDotDotToken, expression), node)
                : reuse(node);
        }

        //
        // Clauses
        //

        // @api
        function createCaseClause(expression: Expression, statements: readonly Statement[]) {
            const node = createBaseNode<CaseClause>(SyntaxKind.CaseClause);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            setChildren(node, node.statements = createNodeArray(statements));
            return finish(node);
        }

        // @api
        function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]) {
            return node.expression !== expression
                || node.statements !== statements
                ? update(createCaseClause(expression, statements), node)
                : reuse(node);
        }

        // @api
        function createDefaultClause(statements: readonly Statement[]) {
            const node = createBaseNode<DefaultClause>(SyntaxKind.DefaultClause);
            setChildren(node, node.statements = createNodeArray(statements));
            return finish(node);
        }

        // @api
        function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]) {
            return node.statements !== statements
                ? update(createDefaultClause(statements), node)
                : reuse(node);
        }

        // @api
        function createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]) {
            const node = createBaseNode<HeritageClause>(SyntaxKind.HeritageClause);
            node.token = token;
            setChildren(node, node.types = createNodeArray(types));
            if (!skipTransformationFlags) {
                switch (token) {
                    case SyntaxKind.ExtendsKeyword:
                        markES2015(node);
                        break;
                    case SyntaxKind.ImplementsKeyword:
                        markTypeScript(node);
                        break;
                    default:
                        return Debug.assertNever(token);
                }
            }
            return finish(node);
        }

        // @api
        function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) {
            return node.types !== types
                ? update(createHeritageClause(node.token, types), node)
                : reuse(node);
        }

        // @api
        function createCatchClause(variableDeclaration: string | VariableDeclaration | undefined, block: Block) {
            const node = createBaseNode<CatchClause>(SyntaxKind.CatchClause);
            variableDeclaration = !isString(variableDeclaration) ? variableDeclaration : createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            );
            setChild(node, node.variableDeclaration = variableDeclaration);
            setChild(node, node.block = block);
            if (!skipTransformationFlags) {
                if (!variableDeclaration) markES2019(node);
            }
            return finish(node);
        }

        // @api
        function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) {
            return node.variableDeclaration !== variableDeclaration
                || node.block !== block
                ? update(createCatchClause(variableDeclaration, block), node)
                : reuse(node);
        }

        //
        // Property assignments
        //

        // @api
        function createPropertyAssignment(name: string | PropertyName, initializer: Expression) {
            const node = createBaseNode<PropertyAssignment>(SyntaxKind.PropertyAssignment);
            setChild(node, node.name = asName(name));
            setChild(node, node.questionToken = undefined);
            setChild(node, node.initializer = lazyParenthesizer().parenthesizeExpressionForDisallowedComma(initializer));
            return finish(node);
        }

        function finishUpdatePropertyAssignment(updated: PropertyAssignment, original: PropertyAssignment) {
            if (original.decorators) updated.decorators = original.decorators;
            if (original.modifiers) updated.modifiers = original.modifiers;
            if (original.questionToken) updated.questionToken = original.questionToken;
            if (original.exclamationToken) updated.exclamationToken = original.exclamationToken;
            return update(updated, original);
        }

        // @api
        function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression) {
            return node.name !== name
                || node.initializer !== initializer
                ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node)
                : reuse(node);
        }

        // @api
        function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression) {
            const node = createBaseNamedDeclaration<ShorthandPropertyAssignment>(
                SyntaxKind.ShorthandPropertyAssignment,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name
            );
            setChild(node, node.objectAssignmentInitializer = objectAssignmentInitializer !== undefined
                ? lazyParenthesizer().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer)
                : undefined);
            if (!skipTransformationFlags) {
                markES2015(node);
            }
            return finish(node);
        }

        function finishUpdateShorthandPropertyAssignment(updated: ShorthandPropertyAssignment, original: ShorthandPropertyAssignment) {
            if (original.decorators) updated.decorators = original.decorators;
            if (original.modifiers) updated.modifiers = original.modifiers;
            if (original.equalsToken) updated.equalsToken = original.equalsToken;
            if (original.questionToken) updated.questionToken = original.questionToken;
            if (original.exclamationToken) updated.exclamationToken = original.exclamationToken;
            return update(updated, original);
        }

        // @api
        function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) {
            return node.name !== name
                || node.objectAssignmentInitializer !== objectAssignmentInitializer
                ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node)
                : reuse(node);
        }

        // @api
        function createSpreadAssignment(expression: Expression) {
            const node = createBaseNode<SpreadAssignment>(SyntaxKind.SpreadAssignment);
            setChild(node, node.expression = lazyParenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            if (!skipTransformationFlags) {
                markES2018(node);
                markObjectRestOrSpread(node);
            }
            return finish(node);
        }

        // @api
        function updateSpreadAssignment(node: SpreadAssignment, expression: Expression) {
            return node.expression !== expression
                ? update(createSpreadAssignment(expression), node)
                : reuse(node);
        }

        //
        // Enum
        //

        // @api
        function createEnumMember(name: string | PropertyName, initializer?: Expression) {
            const node = createBaseNode<EnumMember>(SyntaxKind.EnumMember);
            setChild(node, node.name = asName(name));
            setChild(node, node.initializer = initializer && lazyParenthesizer().parenthesizeExpressionForDisallowedComma(initializer));
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? update(createEnumMember(name, initializer), node)
                : reuse(node);
        }

        //
        // Top-level nodes
        //

        // @api
        function createSourceFile(
            statements: readonly Statement[],
            endOfFileToken: EndOfFileToken,
        ) {
            const node = createSourceFileNode(SyntaxKind.SourceFile) as SourceFile;
            setChildren(node, node.statements = createNodeArray(statements));
            setChild(node, node.endOfFileToken = endOfFileToken);
            node.fileName = "";
            node.text = "";
            node.languageVersion = 0;
            node.languageVariant = 0;
            node.scriptKind = 0;
            node.isDeclarationFile = false;
            node.hasNoDefaultLib = false;
            return finish(node);
        }

        function cloneSourceFileWithChanges(
            source: SourceFile,
            statements: readonly Statement[],
            isDeclarationFile: boolean,
            referencedFiles: readonly FileReference[],
            typeReferences: readonly FileReference[],
            hasNoDefaultLib: boolean,
            libReferences: readonly FileReference[]
        ) {
            const node = createBaseNode<SourceFile>(SyntaxKind.SourceFile);
            for (const p in source) {
                if (p === "emitNode" || hasProperty(node, p) || !hasProperty(source, p)) continue;
                (node as any)[p] = (source as any)[p];
            }
            node.flags |= source.flags;
            setChildren(node, node.statements = createNodeArray(statements));
            setChild(node, node.endOfFileToken);
            node.isDeclarationFile = isDeclarationFile;
            node.referencedFiles = referencedFiles;
            node.typeReferenceDirectives = typeReferences;
            node.hasNoDefaultLib = hasNoDefaultLib;
            node.libReferenceDirectives = libReferences;
            return finish(node);
        }

        // @api
        function updateSourceFile(
            node: SourceFile,
            statements: readonly Statement[],
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
                : reuse(node);
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
        function createNotEmittedStatement(original: Node) {
            const node = createBaseNode<NotEmittedStatement>(SyntaxKind.NotEmittedStatement);
            node.original = original;
            setTextRange(node, original);
            return finish(node);
        }

        /**
         * Creates a synthetic element to act as a placeholder for the end of an emitted declaration in
         * order to properly emit exports.
         */
        // @api
        function createEndOfDeclarationMarker(original: Node) {
            const node = createBaseNode<EndOfDeclarationMarker>(SyntaxKind.EndOfDeclarationMarker);
            node.emitNode = {} as EmitNode;
            node.original = original;
            return finish(node);
        }

        /**
         * Creates a synthetic element to act as a placeholder for the beginning of a merged declaration in
         * order to properly emit exports.
         */
        // @api
        function createMergeDeclarationMarker(original: Node) {
            const node = createBaseNode<MergeDeclarationMarker>(SyntaxKind.MergeDeclarationMarker);
            node.emitNode = {} as EmitNode;
            node.original = original;
            return finish(node);
        }

        /**
         * Creates a synthetic expression to act as a placeholder for a not-emitted expression in
         * order to preserve comments or sourcemap positions.
         *
         * @param expression The inner expression to emit.
         * @param original The original outer expression.
         */
        // @api
        function createPartiallyEmittedExpression(expression: Expression, original?: Node) {
            const node = createBaseNode<PartiallyEmittedExpression>(SyntaxKind.PartiallyEmittedExpression);
            setChild(node, node.expression = expression);
            node.original = original;
            setTextRange(node, original);
            if (!skipTransformationFlags) {
                markTypeScript(node);
            }
            return finish(node);
        }

        // @api
        function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression) {
            return node.expression !== expression
                ? update(createPartiallyEmittedExpression(expression, node.original), node)
                : reuse(node);
        }

        function flattenCommaElements(node: Expression): Expression | readonly Expression[] {
            if (nodeIsSynthesized(node) && !isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
                if (node.kind === SyntaxKind.CommaListExpression) {
                    return (<CommaListExpression>node).elements;
                }
                if (isBinaryExpression(node) && node.operatorToken.kind === SyntaxKind.CommaToken) {
                    return [node.left, node.right];
                }
            }
            return node;
        }

        // @api
        function createCommaListExpression(elements: readonly Expression[]) {
            const node = createBaseNode<CommaListExpression>(SyntaxKind.CommaListExpression);
            setChildren(node, node.elements = createNodeArray(sameFlatMap(elements, flattenCommaElements)));
            return finish(node);
        }

        // @api
        function updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? update(createCommaListExpression(elements), node)
                : reuse(node);
        }

        // @api
        function createBundle(sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            const node = createBaseNode<Bundle>(SyntaxKind.Bundle);
            node.prepends = prepends;
            node.sourceFiles = sourceFiles;
            return finish(node);
        }

        // @api
        function updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            return node.sourceFiles !== sourceFiles
                || node.prepends !== prepends
                ? update(createBundle(sourceFiles, prepends), node)
                : reuse(node);
        }

        function asNodeArray<T extends Node>(array: readonly T[]): NodeArray<T>;
        function asNodeArray<T extends Node>(array: readonly T[] | undefined): NodeArray<T> | undefined;
        function asNodeArray<T extends Node>(array: readonly T[] | undefined): NodeArray<T> | undefined {
            return array ? createNodeArray(array) : undefined;
        }

        function asName<T extends Identifier | BindingName | PropertyName | NoSubstitutionTemplateLiteral | EntityName | ThisTypeNode | undefined>(name: string | T): T | Identifier {
            return typeof name === "string" ? createIdentifier(name) :
                name;
        }

        function asExpression<T extends Expression | undefined>(value: string | number | boolean | T): T | StringLiteral | NumericLiteral | BooleanLiteral {
            return typeof value === "string" ? createStringLiteral(value) :
                typeof value === "number" ? createNumericLiteral(value) :
                typeof value === "boolean" ? value ? createTrue() : createFalse() :
                value;
        }

        function asToken<TKind extends SyntaxKind>(value: TKind | Token<TKind>): Token<TKind> {
            return typeof value === "number" ? createToken(value) : value;
        }

        function asEmbeddedStatement<T extends Node>(statement: T): T | EmptyStatement;
        function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined;
        function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined {
            return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginalNode(createEmptyStatement(), statement), statement) : statement;
        }

        function setChildWorker(parent: Node, child: Node | undefined): void {
            if (!skipTransformationFlags) {
                if (child) {
                    parent.transformFlags |= propagateChildFlags(child);
                }
            }
        }

        function setChildrenWorker(parent: Node, children: NodeArray<Node> | undefined): void {
            if (!skipTransformationFlags) {
                if (children) {
                    parent.transformFlags |= propagateChildrenFlags(children);
                }
            }
        }

        function finishWorker<T extends Node>(node: T) {
            if (!skipTransformationFlags) {
                node.transformFlags |= TransformFlags.HasComputedFlags;
            }
            return node;
        }

        function updateWorker<T extends Node>(updated: T, original: T) {
            return updateNode(updated, original);
        }

        function reuseWorker<T extends Node>(node: T) {
            return node;
        }
    }

    function createLazyFactoryMembers(
        factory: NodeFactory,
        asExpression: <T extends Expression | undefined>(value: string | number | boolean | T) => T | StringLiteral | NumericLiteral | BooleanLiteral,
    ) {
        // lazy initializaton of common operator factories
        let lazyBinaryFactories: ((left: Expression, right: Expression) => BinaryExpression)[] | undefined;
        let lazyPrefixUnaryFactories: ((operand: Expression) => PrefixUnaryExpression)[] | undefined;
        let lazyPostfixUnaryFactories: ((operand: Expression) => PostfixUnaryExpression)[] | undefined;

        return {
            get createComma() { return getBinaryFactory(SyntaxKind.CommaToken); },
            get createAssignment() { return getBinaryFactory(SyntaxKind.EqualsToken) as NodeFactory["createAssignment"]; },
            get createLogicalOr() { return getBinaryFactory(SyntaxKind.BarBarToken); },
            get createLogicalAnd() { return getBinaryFactory(SyntaxKind.AmpersandAmpersandToken); },
            get createBitwiseOr() { return getBinaryFactory(SyntaxKind.BarToken); },
            get createBitwiseXor() { return getBinaryFactory(SyntaxKind.CaretToken); },
            get createBitwiseAnd() { return getBinaryFactory(SyntaxKind.AmpersandToken); },
            get createStrictEquality() { return getBinaryFactory(SyntaxKind.EqualsEqualsEqualsToken); },
            get createStrictInequality() { return getBinaryFactory(SyntaxKind.ExclamationEqualsEqualsToken); },
            get createEquality() { return getBinaryFactory(SyntaxKind.EqualsEqualsToken); },
            get createInequality() { return getBinaryFactory(SyntaxKind.ExclamationEqualsToken); },
            get createLessThan() { return getBinaryFactory(SyntaxKind.LessThanToken); },
            get createLessThanEquals() { return getBinaryFactory(SyntaxKind.LessThanEqualsToken); },
            get createGreaterThan() { return getBinaryFactory(SyntaxKind.GreaterThanToken); },
            get createGreaterThanEquals() { return getBinaryFactory(SyntaxKind.GreaterThanEqualsToken); },
            get createLeftShift() { return getBinaryFactory(SyntaxKind.LessThanLessThanToken); },
            get createRightShift() { return getBinaryFactory(SyntaxKind.GreaterThanGreaterThanToken); },
            get createUnsignedRightShift() { return getBinaryFactory(SyntaxKind.GreaterThanGreaterThanGreaterThanToken); },
            get createAdd() { return getBinaryFactory(SyntaxKind.PlusToken); },
            get createSubtract() { return getBinaryFactory(SyntaxKind.MinusToken); },
            get createMultiply() { return getBinaryFactory(SyntaxKind.AsteriskToken); },
            get createDivide() { return getBinaryFactory(SyntaxKind.SlashToken); },
            get createModulo() { return getBinaryFactory(SyntaxKind.PercentToken); },
            get createExponent() { return getBinaryFactory(SyntaxKind.AsteriskAsteriskToken); },
            get createPrefixPlus() { return getPrefixUnaryFactory(SyntaxKind.PlusToken); },
            get createPrefixMinus() { return getPrefixUnaryFactory(SyntaxKind.MinusToken); },
            get createPrefixIncrement() { return getPrefixUnaryFactory(SyntaxKind.PlusPlusToken); },
            get createPrefixDecrement() { return getPrefixUnaryFactory(SyntaxKind.MinusMinusToken); },
            get createBitwiseNot() { return getPrefixUnaryFactory(SyntaxKind.TildeToken); },
            get createLogicalNot() { return getPrefixUnaryFactory(SyntaxKind.ExclamationToken); },
            get createPostfixIncrement() { return getPostfixUnaryFactory(SyntaxKind.PlusPlusToken); },
            get createPostfixDecrement() { return getPostfixUnaryFactory(SyntaxKind.MinusMinusToken); },

            createSignatureDeclaration,
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
            createPropertyDescriptor,
            createCallBinding,
            inlineExpressions,
            getInternalName,
            getLocalName,
            getExportName,
            getDeclarationName,
            getNamespaceMemberName,
            getExternalModuleOrNamespaceExportName,
            recreateOuterExpressions,
            restoreEnclosingLabel,
            createUseStrictPrologue,
            copyPrologue,
            copyStandardPrologue,
            copyCustomPrologue,
            ensureUseStrict,
            liftToBlock,
        };

        function getBinaryFactory(operator: BinaryOperator) {
            const factories = lazyBinaryFactories || [];
            return factories[operator] || (factories[operator] = (left, right) => factory.createBinary(left, operator, right));
        }

        function getPrefixUnaryFactory(operator: PrefixUnaryOperator) {
            const factories = lazyPrefixUnaryFactories || [];
            return factories[operator] || (factories[operator] = operand => factory.createPrefix(operator, operand));
        }

        function getPostfixUnaryFactory(operator: PostfixUnaryOperator) {
            const factories = lazyPostfixUnaryFactories || [];
            return factories[operator] || (factories[operator] = operand => factory.createPostfix(operand, operator));
        }

        // Route signature creation to the appropriate factory method. Used by the NodeBuilder in the checker.
        function createSignatureDeclaration<T extends SignatureDeclaration>(kind: T["kind"], typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): T;
        function createSignatureDeclaration(kind: SignatureDeclaration["kind"], typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): SignatureDeclaration {
            switch (kind) {
                case SyntaxKind.CallSignature:
                    return factory.createCallSignature(typeParameters, parameters, type);
                case SyntaxKind.ConstructSignature:
                    return factory.createConstructSignature(typeParameters, parameters, type);
                case SyntaxKind.MethodSignature:
                    // NOTE: This creates an *invalid* method signature since `name` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createMethodSignature(/*modifiers*/ undefined, /*name*/ undefined!, /*questionToken*/ undefined, typeParameters, parameters, type);
                case SyntaxKind.MethodDeclaration:
                    // NOTE: This creates an *invalid* method declaration since `name` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createMethodDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined!, /*questionToken*/ undefined, typeParameters, parameters, type, /*body*/ undefined);
                case SyntaxKind.Constructor:
                    return factory.createConstructorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, parameters, /*body*/ undefined);
                case SyntaxKind.GetAccessor:
                    // NOTE: This creates an *invalid* get accessor since `name` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createGetAccessorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*name*/ undefined!, parameters, type, /*body*/ undefined);
                case SyntaxKind.SetAccessor:
                    // NOTE: This creates an *invalid* set accessor since `name` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createSetAccessorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*name*/ undefined!, parameters, /*body*/ undefined);
                case SyntaxKind.IndexSignature:
                    return factory.createIndexSignature(/*decorators*/ undefined, /*modifiers*/ undefined, parameters, type);
                case SyntaxKind.JSDocFunctionType:
                    return factory.createJSDocFunctionType(parameters, type);
                case SyntaxKind.FunctionType:
                    return factory.createFunctionTypeNode(typeParameters, parameters, type);
                case SyntaxKind.ConstructorType:
                    return factory.createConstructorTypeNode(typeParameters, parameters, type);
                case SyntaxKind.FunctionDeclaration:
                    return factory.createFunctionDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined, typeParameters, parameters, type, /*body*/ undefined);
                case SyntaxKind.FunctionExpression:
                    // NOTE: This creates an *invalid* function expression since `body` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createFunctionExpression(/*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined, typeParameters, parameters, type, /*body*/ undefined!);
                case SyntaxKind.ArrowFunction:
                    // NOTE: This creates an *invalid* arrow function since `body` is `undefined`, but this is preserved to support existing behavior.
                    return factory.createArrowFunction(/*modifiers*/ undefined, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, /*body*/ undefined!);
                default:
                    return Debug.assertNever(kind);
            }
        }

        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
            return factory.createCall(
                factory.createFunctionExpression(
                    /*modifiers*/ undefined,
                    /*asteriskToken*/ undefined,
                    /*name*/ undefined,
                    /*typeParameters*/ undefined,
                    /*parameters*/ param ? [param] : [],
                    /*type*/ undefined,
                    factory.createBlock(statements, /*multiLine*/ true)
                ),
                /*typeArguments*/ undefined,
                /*argumentsArray*/ paramValue ? [paramValue] : []
            );
        }

        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): CallExpression;
        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
            return factory.createCall(
                factory.createArrowFunction(
                    /*modifiers*/ undefined,
                    /*typeParameters*/ undefined,
                    /*parameters*/ param ? [param] : [],
                    /*type*/ undefined,
                    /*equalsGreaterThanToken*/ undefined,
                    factory.createBlock(statements, /*multiLine*/ true)
                ),
                /*typeArguments*/ undefined,
                /*argumentsArray*/ paramValue ? [paramValue] : []
            );
        }

        function createVoidZero() {
            return factory.createVoid(factory.createNumericLiteral("0"));
        }

        function createExportDefault(expression: Expression) {
            return factory.createExportAssignment(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isExportEquals*/ false,
                expression);
        }

        function createExternalModuleExport(exportName: Identifier) {
            return factory.createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                factory.createNamedExports([
                    factory.createExportSpecifier(/*propertyName*/ undefined, exportName)
                ])
            );
        }

        //
        // Utilities
        //

        function createTypeCheck(value: Expression, tag: TypeOfTag) {
            return tag === "undefined"
                ? factory.createStrictEquality(value, createVoidZero())
                : factory.createStrictEquality(factory.createTypeOf(value), factory.createStringLiteral(tag));
        }

        function createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]) {
            return factory.createCall(
                factory.createPropertyAccess(object, methodName),
                /*typeArguments*/ undefined,
                argumentsList
            );
        }

        function createFunctionBindCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]) {
            return createMethodCall(target, "bind", [thisArg, ...argumentsList]);
        }

        function createFunctionCallCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]) {
            return createMethodCall(target, "call", [thisArg, ...argumentsList]);
        }

        function createFunctionApplyCall(target: Expression, thisArg: Expression, argumentsExpression: Expression) {
            return createMethodCall(target, "apply", [thisArg, argumentsExpression]);
        }

        function createGlobalMethodCall(globalObjectName: string, methodName: string, argumentsList: readonly Expression[]) {
            return createMethodCall(factory.createIdentifier(globalObjectName), methodName, argumentsList);
        }

        function createArraySliceCall(array: Expression, start?: number | Expression) {
            return createMethodCall(array, "slice", start === undefined ? [] : [asExpression(start)]);
        }

        function createArrayConcatCall(array: Expression, argumentsList: readonly Expression[]) {
            return createMethodCall(array, "concat", argumentsList);
        }

        function createObjectDefinePropertyCall(target: Expression, propertyName: string | Expression, attributes: Expression) {
            return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
        }

        function tryAddPropertyAssignment(properties: Push<PropertyAssignment>, propertyName: string, expression: Expression | undefined) {
            if (expression) {
                properties.push(factory.createPropertyAssignment(propertyName, expression));
                return true;
            }
            return false;
        }

        function createPropertyDescriptor(attributes: PropertyDescriptorAttributes, singleLine?: boolean) {
            const properties: PropertyAssignment[] = [];
            tryAddPropertyAssignment(properties, "enumerable", asExpression(attributes.enumerable));
            tryAddPropertyAssignment(properties, "configurable", asExpression(attributes.configurable));

            let isData = tryAddPropertyAssignment(properties, "writable", asExpression(attributes.writable));
            isData = tryAddPropertyAssignment(properties, "value", attributes.value) || isData;

            let isAccessor = tryAddPropertyAssignment(properties, "get", attributes.get);
            isAccessor = tryAddPropertyAssignment(properties, "set", attributes.set) || isAccessor;

            Debug.assert(!(isData && isAccessor), "A PropertyDescriptor may not be both an accessor descriptor and a data descriptor.");
            return factory.createObjectLiteral(properties, !singleLine);
        }

        function updateOuterExpression(outerExpression: OuterExpression, expression: Expression) {
            switch (outerExpression.kind) {
                case SyntaxKind.ParenthesizedExpression: return factory.updateParen(outerExpression, expression);
                case SyntaxKind.TypeAssertionExpression: return factory.updateTypeAssertion(outerExpression, outerExpression.type, expression);
                case SyntaxKind.AsExpression: return factory.updateAsExpression(outerExpression, expression, outerExpression.type);
                case SyntaxKind.NonNullExpression: return factory.updateNonNullExpression(outerExpression, expression);
                case SyntaxKind.PartiallyEmittedExpression: return factory.updatePartiallyEmittedExpression(outerExpression, expression);
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
        function isIgnorableParen(node: Expression) {
            return node.kind === SyntaxKind.ParenthesizedExpression
                && nodeIsSynthesized(node)
                && nodeIsSynthesized(getSourceMapRange(node))
                && nodeIsSynthesized(getCommentRange(node))
                && !some(getSyntheticLeadingComments(node))
                && !some(getSyntheticTrailingComments(node));
        }

        function recreateOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds = OuterExpressionKinds.All): Expression {
            if (outerExpression && isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
                return updateOuterExpression(
                    outerExpression,
                    recreateOuterExpressions(outerExpression.expression, innerExpression)
                );
            }
            return innerExpression;
        }

        function restoreEnclosingLabel(node: Statement, outermostLabeledStatement: LabeledStatement | undefined, afterRestoreLabelCallback?: (node: LabeledStatement) => void): Statement {
            if (!outermostLabeledStatement) {
                return node;
            }
            const updated = factory.updateLabel(
                outermostLabeledStatement,
                outermostLabeledStatement.label,
                outermostLabeledStatement.statement.kind === SyntaxKind.LabeledStatement
                    ? restoreEnclosingLabel(node, <LabeledStatement>outermostLabeledStatement.statement)
                    : node
            );
            if (afterRestoreLabelCallback) {
                afterRestoreLabelCallback(outermostLabeledStatement);
            }
            return updated;
        }

        function shouldBeCapturedInTempVariable(node: Expression, cacheIdentifiers: boolean): boolean {
            const target = skipParentheses(node);
            switch (target.kind) {
                case SyntaxKind.Identifier:
                    return cacheIdentifiers;
                case SyntaxKind.ThisKeyword:
                case SyntaxKind.NumericLiteral:
                case SyntaxKind.BigIntLiteral:
                case SyntaxKind.StringLiteral:
                    return false;
                case SyntaxKind.ArrayLiteralExpression:
                    const elements = (<ArrayLiteralExpression>target).elements;
                    if (elements.length === 0) {
                        return false;
                    }
                    return true;
                case SyntaxKind.ObjectLiteralExpression:
                    return (<ObjectLiteralExpression>target).properties.length > 0;
                default:
                    return true;
            }
        }

        function createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers = false): CallBinding {
            const callee = skipOuterExpressions(expression, OuterExpressionKinds.All);
            let thisArg: Expression;
            let target: LeftHandSideExpression;
            if (isSuperProperty(callee)) {
                thisArg = factory.createThis();
                target = callee;
            }
            else if (callee.kind === SyntaxKind.SuperKeyword) {
                thisArg = factory.createThis();
                target = languageVersion !== undefined && languageVersion < ScriptTarget.ES2015
                    ? setTextRange(factory.createIdentifier("_super"), callee)
                    : <PrimaryExpression>callee;
            }
            else if (getEmitFlags(callee) & EmitFlags.HelperName) {
                thisArg = createVoidZero();
                target = factory.parenthesizer.parenthesizeLeftSideOfAccess(callee);
            }
            else if (isPropertyAccessExpression(callee)) {
                if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                    // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                    thisArg = factory.createTempVariable(recordTempVariable);
                    target = factory.createPropertyAccess(
                        setTextRange(
                            factory.createAssignment(
                                thisArg,
                                callee.expression
                            ),
                            callee.expression
                        ),
                        callee.name
                    );
                    setTextRange(target, callee);
                }
                else {
                    thisArg = callee.expression;
                    target = callee;
                }
            }
            else if (isElementAccessExpression(callee)) {
                if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                    // for `a[b]()` target is `(_a = a)[b]` and thisArg is `_a`
                    thisArg = factory.createTempVariable(recordTempVariable);
                    target = factory.createElementAccess(
                        setTextRange(
                            factory.createAssignment(
                                thisArg,
                                callee.expression
                            ),
                            callee.expression
                        ),
                        callee.argumentExpression
                    );
                    setTextRange(target, callee);
                }
                else {
                    thisArg = callee.expression;
                    target = callee;
                }
            }
            else {
                // for `a()` target is `a` and thisArg is `void 0`
                thisArg = createVoidZero();
                target = factory.parenthesizer.parenthesizeLeftSideOfAccess(expression);
            }

            return { target, thisArg };
        }

        function inlineExpressions(expressions: readonly Expression[]) {
            // Avoid deeply nested comma expressions as traversing them during emit can result in "Maximum call
            // stack size exceeded" errors.
            return expressions.length > 10
                ? factory.createCommaList(expressions)
                : reduceLeft(expressions, factory.createComma)!;
        }

        function getName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags: EmitFlags = 0) {
            const nodeName = getNameOfDeclaration(node);
            if (nodeName && isIdentifier(nodeName) && !isGeneratedIdentifier(nodeName)) {
                const name = getMutableClone(nodeName);
                emitFlags |= getEmitFlags(nodeName);
                if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
                if (!allowComments) emitFlags |= EmitFlags.NoComments;
                if (emitFlags) setEmitFlags(name, emitFlags);
                return name;
            }
            return factory.getGeneratedNameForNode(node);
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
        function getInternalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
            return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName | EmitFlags.InternalName);
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
        function getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
            return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName);
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
        function getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier {
            return getName(node, allowComments, allowSourceMaps, EmitFlags.ExportName);
        }

        /**
         * Gets the name of a declaration for use in declarations.
         *
         * @param node The declaration.
         * @param allowComments A value indicating whether comments may be emitted for the name.
         * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
         */
        function getDeclarationName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean) {
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
        function getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression {
            const qualifiedName = factory.createPropertyAccess(ns, nodeIsSynthesized(name) ? name : getSynthesizedClone(name));
            setTextRange(qualifiedName, name);
            let emitFlags: EmitFlags = 0;
            if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
            if (!allowComments) emitFlags |= EmitFlags.NoComments;
            if (emitFlags) setEmitFlags(qualifiedName, emitFlags);
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
        function getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression {
            if (ns && hasModifier(node, ModifierFlags.Export)) {
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
        function copyPrologue(source: readonly Statement[], target: Push<Statement>, ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number {
            const offset = copyStandardPrologue(source, target, ensureUseStrict);
            return copyCustomPrologue(source, target, offset, visitor);
        }

        function isUseStrictPrologue(node: ExpressionStatement): boolean {
            return isStringLiteral(node.expression) && node.expression.text === "use strict";
        }

        function createUseStrictPrologue() {
            return startOnNewLine(factory.createExpressionStatement(factory.createStringLiteral("use strict"))) as PrologueDirective;
        }

        /**
         * Copies only the standard (string-expression) prologue-directives into the target statement-array.
         * @param source origin statements array
         * @param target result statements array
         * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
         */
        function copyStandardPrologue(source: readonly Statement[], target: Push<Statement>, ensureUseStrict?: boolean): number {
            Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
            let foundUseStrict = false;
            let statementOffset = 0;
            const numStatements = source.length;
            while (statementOffset < numStatements) {
                const statement = source[statementOffset];
                if (isPrologueDirective(statement)) {
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
        function copyCustomPrologue(source: readonly Statement[], target: Push<Statement>, statementOffset: number, visitor?: (node: Node) => VisitResult<Node>): number;
        function copyCustomPrologue(source: readonly Statement[], target: Push<Statement>, statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>): number | undefined;
        function copyCustomPrologue(source: readonly Statement[], target: Push<Statement>, statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>): number | undefined {
            const numStatements = source.length;
            while (statementOffset !== undefined && statementOffset < numStatements) {
                const statement = source[statementOffset];
                if (getEmitFlags(statement) & EmitFlags.CustomPrologue) {
                    append(target, visitor ? visitNode(statement, visitor, isStatement) : statement);
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
        function ensureUseStrict(statements: NodeArray<Statement>): NodeArray<Statement> {
            const foundUseStrict = findUseStrictPrologue(statements);

            if (!foundUseStrict) {
                return setTextRange(factory.createNodeArray<Statement>([createUseStrictPrologue(), ...statements]), statements);
            }

            return statements;
        }

        /**
         * Lifts a NodeArray containing only Statement nodes to a block.
         *
         * @param nodes The NodeArray.
         */
        function liftToBlock(nodes: readonly Node[]): Statement {
            Debug.assert(every(nodes, isStatementOrBlock), "Cannot lift nodes to a Block.");
            return <Statement>singleOrUndefined(nodes) || factory.createBlock(<readonly Statement[]>nodes);
        }
    }

    // Language-edition and feature specific node markers
    const markBindingPattern = createFlagMarker(TransformFlags.ContainsBindingPattern);
    const markBlockScopedBinding = createFlagMarker(TransformFlags.ContainsBlockScopedBinding);
    const markRestOrSpread = createFlagMarker(TransformFlags.ContainsRestOrSpread);
    const markObjectRestOrSpread = createFlagMarker(TransformFlags.ContainsObjectRestOrSpread);
    const markDestructuringAssignment = createFlagMarker(TransformFlags.ContainsDestructuringAssignment);
    const markComputedPropertyName = createFlagMarker(TransformFlags.ContainsComputedPropertyName);
    const markLexicalThis = createFlagMarker(TransformFlags.ContainsLexicalThis);
    const markDynamicImport = createFlagMarker(TransformFlags.ContainsDynamicImport);
    const markGenerator = createFlagMarker(TransformFlags.ContainsGenerator);
    const markYield = createFlagMarker(TransformFlags.ContainsYield);
    const markHoistedDeclarationOrCompletion = createFlagMarker(TransformFlags.ContainsHoistedDeclarationOrCompletion);
    const markClassFields = createFlagMarker(TransformFlags.ContainsClassFields);
    const markES2015 = createFlagMarker(TransformFlags.ContainsES2015);
    const markES2016 = createFlagMarker(TransformFlags.ContainsES2016);
    const markES2017 = createFlagMarker(TransformFlags.ContainsES2017);
    const markES2018 = createFlagMarker(TransformFlags.ContainsES2018);
    const markES2019 = createFlagMarker(TransformFlags.ContainsES2019);
    const markESNext = createFlagMarker(TransformFlags.ContainsESNext);
    const markTypeScript = createFlagMarker(TransformFlags.ContainsTypeScript);
    const markTypeScriptOnly = createFlagMarker(TransformFlags.ContainsTypeScript, /*excludeSubtree*/ true);
    const markTypeScriptClassSyntax = createFlagMarker(TransformFlags.ContainsTypeScriptClassSyntax);
    const markJsx = createFlagMarker(TransformFlags.ContainsJsx);

    function createFlagMarker(transformFlags: TransformFlags, excludeSubtree?: boolean) {
        return excludeSubtree ? (node: Node) => { node.transformFlags = transformFlags; } :
            (node: Node) => { node.transformFlags |= transformFlags; };
    }

    function observeArguments<T>(action: <U extends T>(arg1: U, arg2: U) => U, observer: ((arg1: T, arg2: T) => void) | undefined): <U extends T>(arg1: U, arg2: U) => U;
    function observeArguments<T, U, R>(action: (arg1: T, arg2: U | undefined) => R, observer: ((arg1: T, arg2: U) => void) | undefined): (arg1: T, arg2: U | undefined) => R;
    function observeArguments<T, U, R>(action: (arg1: T, arg2: U) => R, observer: ((arg1: T, arg2: U) => void) | undefined): (arg1: T, arg2: U) => R {
        return !observer ? action : (arg1, arg2) => {
            if (arg2 !== undefined) {
                observer(arg1, arg2);
            }
            return action(arg1, arg2);
        };
    }

    function observeResult<T>(action: <U extends T>(arg: U) => U, observer: ((result: T) => void) | undefined): <U extends T>(arg: U) => U;
    function observeResult<T, R>(action: (arg: T) => R, observer: ((result: R) => void) | undefined): (arg: T) => R;
    function observeResult<T, R>(action: (arg: T) => R, observer: ((result: R) => void) | undefined): (arg: T) => R {
        return !observer ? action : arg => {
            const result = action(arg);
            observer(result);
            return result;
        };
    }

    let rawTextScanner: Scanner | undefined;
    const invalidValueSentinel: object = { };

    function getCookedText(kind: TemplateLiteralToken["kind"], rawText: string) {
        if (!rawTextScanner) {
            rawTextScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, LanguageVariant.Standard);
        }
        switch (kind) {
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                rawTextScanner.setText("`" + rawText + "`");
                break;
            case SyntaxKind.TemplateHead:
                // tslint:disable-next-line no-invalid-template-strings
                rawTextScanner.setText("`" + rawText + "${");
                break;
            case SyntaxKind.TemplateMiddle:
                // tslint:disable-next-line no-invalid-template-strings
                rawTextScanner.setText("}" + rawText + "${");
                break;
            case SyntaxKind.TemplateTail:
                rawTextScanner.setText("}" + rawText + "`");
                break;
        }

        let token = rawTextScanner.scan();
        if (token === SyntaxKind.CloseBracketToken) {
            token = rawTextScanner.reScanTemplateToken();
        }

        if (rawTextScanner.isUnterminated()) {
            rawTextScanner.setText(undefined);
            return invalidValueSentinel;
        }

        let tokenValue: string | undefined;
        switch (token) {
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateHead:
            case SyntaxKind.TemplateMiddle:
            case SyntaxKind.TemplateTail:
                tokenValue = rawTextScanner.getTokenValue();
                break;
        }

        if (tokenValue === undefined || rawTextScanner.scan() !== SyntaxKind.EndOfFileToken) {
            rawTextScanner.setText(undefined);
            return invalidValueSentinel;
        }

        rawTextScanner.setText(undefined);
        return tokenValue;
    }

    function propagatePropertyNameFlags(node: PropertyName, transformFlags: TransformFlags) {
        return transformFlags | (node.transformFlags & TransformFlags.PropertyNamePropagatingFlags);
    }

    function propagateChildFlags(child: Node): TransformFlags {
        const childFlags = child.transformFlags & ~TransformFlags.HasComputedFlags & ~getTransformFlagsSubtreeExclusions(child.kind);
        return isNamedDeclaration(child) && isPropertyName(child.name) ? propagatePropertyNameFlags(child.name, childFlags) : childFlags;
    }

    function propagateChildrenFlags(children: NodeArray<Node>): TransformFlags {
        return children.transformFlags & ~TransformFlags.HasComputedFlags;
    }

    function aggregateChildrenFlags(children: NodeArray<Node>) {
        let subtreeFlags = TransformFlags.None;
        for (const child of children) {
            subtreeFlags |= propagateChildFlags(child);
        }
        children.transformFlags = subtreeFlags | TransformFlags.HasComputedFlags;
    }

    /**
     * Gets the transform flags to exclude when unioning the transform flags of a subtree.
     */
    export function getTransformFlagsSubtreeExclusions(kind: SyntaxKind) {
        if (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode) {
            return TransformFlags.TypeExcludes;
        }

        switch (kind) {
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.ArrayLiteralExpression:
                return TransformFlags.ArrayLiteralOrCallOrNewExcludes;
            case SyntaxKind.ModuleDeclaration:
                return TransformFlags.ModuleExcludes;
            case SyntaxKind.Parameter:
                return TransformFlags.ParameterExcludes;
            case SyntaxKind.ArrowFunction:
                return TransformFlags.ArrowFunctionExcludes;
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
                return TransformFlags.FunctionExcludes;
            case SyntaxKind.VariableDeclarationList:
                return TransformFlags.VariableDeclarationListExcludes;
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return TransformFlags.ClassExcludes;
            case SyntaxKind.Constructor:
                return TransformFlags.ConstructorExcludes;
            case SyntaxKind.PropertyDeclaration:
                return TransformFlags.PropertyExcludes;
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return TransformFlags.MethodOrAccessorExcludes;
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
                return TransformFlags.TypeExcludes;
            case SyntaxKind.ObjectLiteralExpression:
                return TransformFlags.ObjectLiteralExcludes;
            case SyntaxKind.CatchClause:
                return TransformFlags.CatchClauseExcludes;
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return TransformFlags.BindingPatternExcludes;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.PartiallyEmittedExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.SuperKeyword:
                return TransformFlags.OuterExpressionExcludes;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return TransformFlags.PropertyAccessExcludes;
            default:
                return TransformFlags.NodeExcludes;
        }
    }

    export const factory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess, createBaseNodeFactory(), {
        onCreateNode: node => node.flags |= NodeFlags.Synthesized
    });

    /* @internal */
    export function createSynthesizedNode(kind: SyntaxKind): Node {
        const node = createNode(kind, -1, -1);
        node.flags |= NodeFlags.Synthesized;
        return node;
    }

    /**
     * Creates a shallow, memberwise clone of a node with no source map location.
     */
    /* @internal */
    export function getSynthesizedClone<T extends Node>(node: T): T {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).

        if (node === undefined) {
            return node;
        }

        const clone = <T>createSynthesizedNode(node.kind);
        clone.flags |= node.flags;
        setOriginalNode(clone, node);

        for (const key in node) {
            if (clone.hasOwnProperty(key) || !node.hasOwnProperty(key)) {
                continue;
            }

            (<any>clone)[key] = (<any>node)[key];
        }

        return clone;
    }

    /**
     * Creates a shallow, memberwise clone of a node for mutation.
     */
    export function getMutableClone<T extends Node>(node: T): T {
        const clone = getSynthesizedClone(node);
        clone.pos = node.pos;
        clone.end = node.end;
        clone.parent = node.parent;
        return clone;
    }

    /* @internal */
    export function updateNode<T extends Node>(updated: T, original: T): T {
        if (updated !== original) {
            setOriginalNode(updated, original);
            setTextRange(updated, original);
        }
        return updated;
    }

    function createUnparsedSource() {
        const node = createNode(SyntaxKind.UnparsedSource) as UnparsedSource;
        node.prologues = emptyArray;
        node.referencedFiles = emptyArray;
        node.libReferenceDirectives = emptyArray;
        node.getLineAndCharacterOfPosition = pos => getLineAndCharacterOfPosition(node, pos);
        return node;
    }

    export function createUnparsedSourceFile(text: string): UnparsedSource;
    export function createUnparsedSourceFile(inputFile: InputFiles, type: "js" | "dts", stripInternal?: boolean): UnparsedSource;
    export function createUnparsedSourceFile(text: string, mapPath: string | undefined, map: string | undefined): UnparsedSource;
    export function createUnparsedSourceFile(textOrInputFiles: string | InputFiles, mapPathOrType?: string, mapTextOrStripInternal?: string | boolean): UnparsedSource {
        const node = createUnparsedSource();
        let stripInternal: boolean | undefined;
        let bundleFileInfo: BundleFileInfo | undefined;
        if (!isString(textOrInputFiles)) {
            Debug.assert(mapPathOrType === "js" || mapPathOrType === "dts");
            node.fileName = (mapPathOrType === "js" ? textOrInputFiles.javascriptPath : textOrInputFiles.declarationPath) || "";
            node.sourceMapPath = mapPathOrType === "js" ? textOrInputFiles.javascriptMapPath : textOrInputFiles.declarationMapPath;
            Object.defineProperties(node, {
                text: { get() { return mapPathOrType === "js" ? textOrInputFiles.javascriptText : textOrInputFiles.declarationText; } },
                sourceMapText: { get() { return mapPathOrType === "js" ? textOrInputFiles.javascriptMapText : textOrInputFiles.declarationMapText; } },
            });


            if (textOrInputFiles.buildInfo && textOrInputFiles.buildInfo.bundle) {
                node.oldFileOfCurrentEmit = textOrInputFiles.oldFileOfCurrentEmit;
                Debug.assert(mapTextOrStripInternal === undefined || typeof mapTextOrStripInternal === "boolean");
                stripInternal = mapTextOrStripInternal as boolean | undefined;
                bundleFileInfo = mapPathOrType === "js" ? textOrInputFiles.buildInfo.bundle.js : textOrInputFiles.buildInfo.bundle.dts;
                if (node.oldFileOfCurrentEmit) {
                    parseOldFileOfCurrentEmit(node, Debug.assertDefined(bundleFileInfo));
                    return node;
                }
            }
        }
        else {
            node.fileName = "";
            node.text = textOrInputFiles;
            node.sourceMapPath = mapPathOrType;
            node.sourceMapText = mapTextOrStripInternal as string;
        }
        Debug.assert(!node.oldFileOfCurrentEmit);
        parseUnparsedSourceFile(node, bundleFileInfo, stripInternal);
        return node;
    }

    function parseUnparsedSourceFile(node: UnparsedSource, bundleFileInfo: BundleFileInfo | undefined, stripInternal: boolean | undefined) {
        let prologues: UnparsedPrologue[] | undefined;
        let helpers: UnscopedEmitHelper[] | undefined;
        let referencedFiles: FileReference[] | undefined;
        let typeReferenceDirectives: string[] | undefined;
        let libReferenceDirectives: FileReference[] | undefined;
        let texts: UnparsedSourceText[] | undefined;

        for (const section of bundleFileInfo ? bundleFileInfo.sections : emptyArray) {
            switch (section.kind) {
                case BundleFileSectionKind.Prologue:
                    (prologues || (prologues = [])).push(createUnparsedNode(section, node) as UnparsedPrologue);
                    break;
                case BundleFileSectionKind.EmitHelpers:
                    (helpers || (helpers = [])).push(getAllUnscopedEmitHelpers().get(section.data)!);
                    break;
                case BundleFileSectionKind.NoDefaultLib:
                    node.hasNoDefaultLib = true;
                    break;
                case BundleFileSectionKind.Reference:
                    (referencedFiles || (referencedFiles = [])).push({ pos: -1, end: -1, fileName: section.data });
                    break;
                case BundleFileSectionKind.Type:
                    (typeReferenceDirectives || (typeReferenceDirectives = [])).push(section.data);
                    break;
                case BundleFileSectionKind.Lib:
                    (libReferenceDirectives || (libReferenceDirectives = [])).push({ pos: -1, end: -1, fileName: section.data });
                    break;
                case BundleFileSectionKind.Prepend:
                    const prependNode = createUnparsedNode(section, node) as UnparsedPrepend;
                    let prependTexts: UnparsedTextLike[] | undefined;
                    for (const text of section.texts) {
                        if (!stripInternal || text.kind !== BundleFileSectionKind.Internal) {
                            (prependTexts || (prependTexts = [])).push(createUnparsedNode(text, node) as UnparsedTextLike);
                        }
                    }
                    prependNode.texts = prependTexts || emptyArray;
                    (texts || (texts = [])).push(prependNode);
                    break;
                case BundleFileSectionKind.Internal:
                    if (stripInternal) break;
                // falls through
                case BundleFileSectionKind.Text:
                    (texts || (texts = [])).push(createUnparsedNode(section, node) as UnparsedTextLike);
                    break;
                default:
                    Debug.assertNever(section);
            }
        }

        node.prologues = prologues || emptyArray;
        node.helpers = helpers;
        node.referencedFiles = referencedFiles || emptyArray;
        node.typeReferenceDirectives = typeReferenceDirectives;
        node.libReferenceDirectives = libReferenceDirectives || emptyArray;
        node.texts = texts || [<UnparsedTextLike>createUnparsedNode({ kind: BundleFileSectionKind.Text, pos: 0, end: node.text.length }, node)];
    }

    function parseOldFileOfCurrentEmit(node: UnparsedSource, bundleFileInfo: BundleFileInfo) {
        Debug.assert(!!node.oldFileOfCurrentEmit);
        let texts: UnparsedTextLike[] | undefined;
        let syntheticReferences: UnparsedSyntheticReference[] | undefined;
        for (const section of bundleFileInfo.sections) {
            switch (section.kind) {
                case BundleFileSectionKind.Internal:
                case BundleFileSectionKind.Text:
                    (texts || (texts = [])).push(createUnparsedNode(section, node) as UnparsedTextLike);
                    break;

                case BundleFileSectionKind.NoDefaultLib:
                case BundleFileSectionKind.Reference:
                case BundleFileSectionKind.Type:
                case BundleFileSectionKind.Lib:
                    (syntheticReferences || (syntheticReferences = [])).push(createUnparsedSyntheticReference(section, node));
                    break;

                // Ignore
                case BundleFileSectionKind.Prologue:
                case BundleFileSectionKind.EmitHelpers:
                case BundleFileSectionKind.Prepend:
                    break;

                default:
                    Debug.assertNever(section);
            }
        }
        node.texts = texts || emptyArray;
        node.helpers = map(bundleFileInfo.sources && bundleFileInfo.sources.helpers, name => getAllUnscopedEmitHelpers().get(name)!);
        node.syntheticReferences = syntheticReferences;
        return node;
    }

    function mapBundleFileSectionKindToSyntaxKind(kind: BundleFileSectionKind): SyntaxKind {
        switch (kind) {
            case BundleFileSectionKind.Prologue: return SyntaxKind.UnparsedPrologue;
            case BundleFileSectionKind.Prepend: return SyntaxKind.UnparsedPrepend;
            case BundleFileSectionKind.Internal: return SyntaxKind.UnparsedInternalText;
            case BundleFileSectionKind.Text: return SyntaxKind.UnparsedText;

            case BundleFileSectionKind.EmitHelpers:
            case BundleFileSectionKind.NoDefaultLib:
            case BundleFileSectionKind.Reference:
            case BundleFileSectionKind.Type:
            case BundleFileSectionKind.Lib:
                return Debug.fail(`BundleFileSectionKind: ${kind} not yet mapped to SyntaxKind`);

            default:
                return Debug.assertNever(kind);
        }
    }

    function createUnparsedNode(section: BundleFileSection, parent: UnparsedSource): UnparsedNode {
        const node = createNode(mapBundleFileSectionKindToSyntaxKind(section.kind), section.pos, section.end) as UnparsedNode;
        node.parent = parent;
        node.data = section.data;
        return node;
    }

    function createUnparsedSyntheticReference(section: BundleFileHasNoDefaultLib | BundleFileReference, parent: UnparsedSource) {
        const node = createNode(SyntaxKind.UnparsedSyntheticReference, section.pos, section.end) as UnparsedSyntheticReference;
        node.parent = parent;
        node.data = section.data;
        node.section = section;
        return node;
    }

    export function createInputFiles(
        javascriptText: string,
        declarationText: string
    ): InputFiles;
    export function createInputFiles(
        readFileText: (path: string) => string | undefined,
        javascriptPath: string,
        javascriptMapPath: string | undefined,
        declarationPath: string,
        declarationMapPath: string | undefined,
        buildInfoPath: string | undefined
    ): InputFiles;
    export function createInputFiles(
        javascriptText: string,
        declarationText: string,
        javascriptMapPath: string | undefined,
        javascriptMapText: string | undefined,
        declarationMapPath: string | undefined,
        declarationMapText: string | undefined
    ): InputFiles;
    /*@internal*/
    export function createInputFiles(
        javascriptText: string,
        declarationText: string,
        javascriptMapPath: string | undefined,
        javascriptMapText: string | undefined,
        declarationMapPath: string | undefined,
        declarationMapText: string | undefined,
        javascriptPath: string | undefined,
        declarationPath: string | undefined,
        buildInfoPath?: string | undefined,
        buildInfo?: BuildInfo,
        oldFileOfCurrentEmit?: boolean
    ): InputFiles;
    export function createInputFiles(
        javascriptTextOrReadFileText: string | ((path: string) => string | undefined),
        declarationTextOrJavascriptPath: string,
        javascriptMapPath?: string,
        javascriptMapTextOrDeclarationPath?: string,
        declarationMapPath?: string,
        declarationMapTextOrBuildInfoPath?: string,
        javascriptPath?: string | undefined,
        declarationPath?: string | undefined,
        buildInfoPath?: string | undefined,
        buildInfo?: BuildInfo,
        oldFileOfCurrentEmit?: boolean
    ): InputFiles {
        const node = createNode(SyntaxKind.InputFiles) as InputFiles;
        if (!isString(javascriptTextOrReadFileText)) {
            const cache = createMap<string | false>();
            const textGetter = (path: string | undefined) => {
                if (path === undefined) return undefined;
                let value = cache.get(path);
                if (value === undefined) {
                    value = javascriptTextOrReadFileText(path);
                    cache.set(path, value !== undefined ? value : false);
                }
                return value !== false ? value as string : undefined;
            };
            const definedTextGetter = (path: string) => {
                const result = textGetter(path);
                return result !== undefined ? result : `/* Input file ${path} was missing */\r\n`;
            };
            let buildInfo: BuildInfo | false;
            const getAndCacheBuildInfo = (getText: () => string | undefined) => {
                if (buildInfo === undefined) {
                    const result = getText();
                    buildInfo = result !== undefined ? getBuildInfo(result) : false;
                }
                return buildInfo || undefined;
            };
            node.javascriptPath = declarationTextOrJavascriptPath;
            node.javascriptMapPath = javascriptMapPath;
            node.declarationPath = Debug.assertDefined(javascriptMapTextOrDeclarationPath);
            node.declarationMapPath = declarationMapPath;
            node.buildInfoPath = declarationMapTextOrBuildInfoPath;
            Object.defineProperties(node, {
                javascriptText: { get() { return definedTextGetter(declarationTextOrJavascriptPath); } },
                javascriptMapText: { get() { return textGetter(javascriptMapPath); } }, // TODO:: if there is inline sourceMap in jsFile, use that
                declarationText: { get() { return definedTextGetter(Debug.assertDefined(javascriptMapTextOrDeclarationPath)); } },
                declarationMapText: { get() { return textGetter(declarationMapPath); } }, // TODO:: if there is inline sourceMap in dtsFile, use that
                buildInfo: { get() { return getAndCacheBuildInfo(() => textGetter(declarationMapTextOrBuildInfoPath)); } }
            });
        }
        else {
            node.javascriptText = javascriptTextOrReadFileText;
            node.javascriptMapPath = javascriptMapPath;
            node.javascriptMapText = javascriptMapTextOrDeclarationPath;
            node.declarationText = declarationTextOrJavascriptPath;
            node.declarationMapPath = declarationMapPath;
            node.declarationMapText = declarationMapTextOrBuildInfoPath;
            node.javascriptPath = javascriptPath;
            node.declarationPath = declarationPath,
            node.buildInfoPath = buildInfoPath;
            node.buildInfo = buildInfo;
            node.oldFileOfCurrentEmit = oldFileOfCurrentEmit;
        }
        return node;
    }

    // tslint:disable-next-line variable-name
    let SourceMapSource: new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;

    /**
     * Create an external source map source file reference
     */
    export function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource {
        return new (SourceMapSource || (SourceMapSource = objectAllocator.getSourceMapSourceConstructor()))(fileName, text, skipTrivia);
    }

    // Utilities

    export function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T {
        node.original = original;
        if (original) {
            const emitNode = original.emitNode;
            if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
        }
        return node;
    }

    function mergeEmitNode(sourceEmitNode: EmitNode, destEmitNode: EmitNode | undefined) {
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
        } = sourceEmitNode;
        if (!destEmitNode) destEmitNode = {} as EmitNode;
        // We are using `.slice()` here in case `destEmitNode.leadingComments` is pushed to later.
        if (leadingComments) destEmitNode.leadingComments = addRange(leadingComments.slice(), destEmitNode.leadingComments);
        if (trailingComments) destEmitNode.trailingComments = addRange(trailingComments.slice(), destEmitNode.trailingComments);
        if (flags) destEmitNode.flags = flags;
        if (commentRange) destEmitNode.commentRange = commentRange;
        if (sourceMapRange) destEmitNode.sourceMapRange = sourceMapRange;
        if (tokenSourceMapRanges) destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges!);
        if (constantValue !== undefined) destEmitNode.constantValue = constantValue;
        if (helpers) {
            for (const helper of helpers) {
                destEmitNode.helpers = appendIfUnique(destEmitNode.helpers, helper);
            }
        }
        if (startsOnNewLine !== undefined) destEmitNode.startsOnNewLine = startsOnNewLine;
        return destEmitNode;
    }

    function mergeTokenSourceMapRanges(sourceRanges: (TextRange | undefined)[], destRanges: (TextRange | undefined)[]) {
        if (!destRanges) destRanges = [];
        for (const key in sourceRanges) {
            destRanges[key] = sourceRanges[key];
        }
        return destRanges;
    }
}

