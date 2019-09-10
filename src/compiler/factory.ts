namespace ts {
    let nextAutoGenerateId = 0;

    /* @internal */
    export function createNodeFactory(
        createNode: (kind: SyntaxKind) => Node,
        createParenthesizerRules: (factory: NodeFactory) => ParenthesizerRules,
        createNodeConverters: (factory: NodeFactory) => NodeConverters,
        treeStateObserver: TreeStateObserver
    ): NodeFactory {
        let needsNoIndentationOnPropertyAccess: boolean | undefined;
        const parenthesizer = memoize(() => createParenthesizerRules(factory));
        const getConverters = memoize(() => createNodeConverters(factory));

        const setChild = treeStateObserver === nullTreeStateObserver
            || treeStateObserver.onSetChild === noop2
            || treeStateObserver.onSetChild === noop ? setChildWithoutTreeState : setChildWithTreeState;
        const setChildren = treeStateObserver === nullTreeStateObserver
            || treeStateObserver.onSetChildren === noop2
            || treeStateObserver.onSetChildren === noop ? setChildrenWithoutTreeState : setChildrenWithTreeState;
        const finishNode = treeStateObserver === nullTreeStateObserver
            || treeStateObserver.onFinishNode === noop ? finishNodeWithoutTreeState : finishNodeWithTreeState;
        const updateNode = treeStateObserver === nullTreeStateObserver
            || treeStateObserver.onUpdateNode === noop2
            || treeStateObserver.onUpdateNode === noop ? ts.updateNode : updateNodeWithTreeState; // tslint:disable-line no-unnecessary-qualifier
        const reuseNode = treeStateObserver === nullTreeStateObserver
            || treeStateObserver.onReuseNode === noop ? identity : reuseNodeWithTreeState;

        const factory: NodeFactory = {
            getParenthesizerRules: parenthesizer,
            getConverters,
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
            createSuper: createSuperExpression,
            createThis: createThisExpression,
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
            createSignatureDeclaration,
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
                if (needsNoIndentationOnPropertyAccess === undefined) {
                    needsNoIndentationOnPropertyAccess = !!(node.flags & NodeFlags.Synthesized);
                }
                if (needsNoIndentationOnPropertyAccess) {
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
            createJSDocTag: tagName => createJSDocTag(SyntaxKind.JSDocTag, tagName),
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
            createImmediatelyInvokedFunctionExpression,
            createImmediatelyInvokedArrowFunction,
            createComma,
            createLessThan,
            createAssignment,
            createStrictEquality,
            createStrictInequality,
            createAdd,
            createSubtract,
            createPostfixIncrement,
            createLogicalAnd,
            createLogicalOr,
            createLogicalNot,
            createVoidZero,
            createExportDefault,
            createExternalModuleExport,
            createTypeCheck,
            createMethodCall,
            createGlobalMethodCall,
            createFunctionBindCall,
            createFunctionCallCall,
            createFunctionApplyCall,
            createArraySliceCall: createArraySlice,
            createArrayConcatCall: createArrayConcat,
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
            liftToBlock
        };

        return factory;

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
            return node;
        }

        function updateBaseSignatureDeclaration<T extends SignatureDeclarationBase>(updated: T, original: T) {
            if (original.typeArguments) updated.typeArguments = original.typeArguments;
            return updateNode(updated, original);
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
            return node;
        }

        //
        // Literals
        //

        function createBaseLiteral<T extends LiteralToken>(
            kind: T["kind"],
            text: string
        ) {
            const node = createBaseNode<T>(kind);
            node.text = text;
            node.hasExtendedUnicodeEscape = undefined;
            node.isUnterminated = undefined;
            return node;
        }

        // @api
        function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): NumericLiteral {
            const node = createBaseLiteral<NumericLiteral>(SyntaxKind.NumericLiteral, typeof value === "number" ? value + "" : value);
            node.numericLiteralFlags = numericLiteralFlags;
            return finishNode(node);
        }

        // @api
        function createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral {
            const node = createBaseLiteral<BigIntLiteral>(SyntaxKind.BigIntLiteral, typeof value === "string" ? value : pseudoBigIntToString(value) + "n");
            return finishNode(node);
        }

        function createBaseStringLiteral(text: string, isSingleQuote?: boolean) {
            const node = createBaseLiteral<StringLiteral>(SyntaxKind.StringLiteral, text);
            node.singleQuote = isSingleQuote;
            return node;
        }

        // @api
        function createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral {
            const node = createBaseStringLiteral(text, isSingleQuote);
            return finishNode(node);
        }

        // @api
        function createStringLiteralFromNode(sourceNode: PropertyNameLiteral): StringLiteral {
            const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), /*isSingleQuote*/ undefined);
            node.textSourceNode = sourceNode;
            return finishNode(node);
        }

        // @api
        function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
            const node = createBaseLiteral<RegularExpressionLiteral>(SyntaxKind.RegularExpressionLiteral, text);
            return finishNode(node);
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

        function createBaseIdentifier(text: string, typeArguments?: readonly (TypeNode | TypeParameterDeclaration)[], originalKeywordKind?: SyntaxKind): Identifier {
            if (originalKeywordKind === undefined && text) {
                originalKeywordKind = stringToToken(text);
            }
            if (originalKeywordKind === SyntaxKind.Identifier) {
                originalKeywordKind = undefined;
            }
            const node = createBaseNode<Identifier>(SyntaxKind.Identifier);
            node.originalKeywordKind = originalKeywordKind;
            node.escapedText = escapeLeadingUnderscores(text);
            if (typeArguments) {
                node.typeArguments = createNodeArray(typeArguments);
            }
            return node;
        }

        function createBaseGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags) {
            const node = createBaseIdentifier(text) as GeneratedIdentifier;
            node.autoGenerateFlags = autoGenerateFlags;
            node.autoGenerateId = nextAutoGenerateId;
            nextAutoGenerateId++;
            return node;
        }

        // @api
        function createIdentifier(text: string, typeArguments?: readonly (TypeNode | TypeParameterDeclaration)[], originalKeywordKind?: SyntaxKind): Identifier {
            const node = createBaseIdentifier(text, typeArguments, originalKeywordKind);
            return finishNode(node);
        }

        // @api
        function updateIdentifier(node: Identifier, typeArguments?: NodeArray<TypeNode | TypeParameterDeclaration> | undefined): Identifier {
            return node.typeArguments !== typeArguments
                ? updateNode(createIdentifier(idText(node), typeArguments), node)
                : reuseNode(node);
        }

        // @api
        function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): GeneratedIdentifier {
            let flags = GeneratedIdentifierFlags.Auto;
            if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
            const name = finishNode(createBaseGeneratedIdentifier("", flags));
            if (recordTempVariable) {
                recordTempVariable(name);
            }
            return name;
        }

        /** Create a unique temporary variable for use in a loop. */
        // @api
        function createLoopVariable(): Identifier {
            return finishNode(createBaseGeneratedIdentifier("", GeneratedIdentifierFlags.Loop));
        }

        /** Create a unique name based on the supplied text. */
        // @api
        function createUniqueName(text: string): Identifier {
            return finishNode(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique));
        }

        // @api
        function createOptimisticUniqueName(text: string): Identifier {
            return finishNode(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic));
        }

        /** Create a unique name based on the supplied text. This does not consider names injected by the transformer. */
        // @api
        function createFileLevelUniqueName(text: string): Identifier {
            return finishNode(createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel));
        }

        /** Create a unique name generated for a node. */
        // @api
        function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0): Identifier {
            const name = createBaseGeneratedIdentifier(node && isIdentifier(node) ? idText(node) : "", GeneratedIdentifierFlags.Node | flags);
            name.original = node;
            return finishNode(name);
        }

        //
        // Punctuation
        //

        function createBaseToken<TKind extends SyntaxKind>(token: TKind) {
            return createBaseNode<Token<TKind>>(token);
        }

        // @api
        function createToken<TKind extends SyntaxKind>(token: TKind) {
            return finishNode(createBaseToken(token));
        }

        //
        // Reserved words
        //

        // @api
        function createSuperExpression() {
            return finishNode(createBaseToken(SyntaxKind.SuperKeyword)) as SuperExpression;
        }

        // @api
        function createThisExpression() {
            return finishNode(createBaseToken(SyntaxKind.ThisKeyword)) as ThisExpression;
        }

        // @api
        function createNull() {
            return finishNode(createBaseToken(SyntaxKind.NullKeyword)) as NullLiteral;
        }

        // @api
        function createTrue() {
            return finishNode(createBaseToken(SyntaxKind.TrueKeyword)) as TrueLiteral;
        }

        // @api
        function createFalse() {
            return finishNode(createBaseToken(SyntaxKind.FalseKeyword)) as FalseLiteral;
        }

        //
        // Modifiers
        //

        // @api
        function createModifier<T extends Modifier["kind"]>(kind: T): Token<T> {
            return finishNode(createBaseToken(kind));
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
            return finishNode(node);
        }

        // @api
        function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier) {
            return node.left !== left
                || node.right !== right
                ? updateNode(createQualifiedName(left, right), node)
                : reuseNode(node);
        }

        // @api
        function createComputedPropertyName(expression: Expression) {
            const node = createBaseNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionOfComputedPropertyName(expression));
            return finishNode(node);
        }

        // @api
        function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createComputedPropertyName(expression), node)
                : reuseNode(node);
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
            return finishNode(node);
        }

        // @api
        function updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined) {
            return node.name !== name
                || node.constraint !== constraint
                || node.default !== defaultType
                ? updateNode(createTypeParameterDeclaration(name, constraint, defaultType), node)
                : reuseNode(node);
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
                initializer && parenthesizer().parenthesizeExpressionForDisallowedComma(initializer)
            );
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            setChild(node, node.questionToken = questionToken);
            return finishNode(node);
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
                ? updateNode(createParameterDeclaration(decorators, modifiers, dotDotDotToken, name, questionToken, type, initializer), node)
                : reuseNode(node);
        }

        // @api
        function createDecorator(expression: Expression) {
            const node = createBaseNode<Decorator>(SyntaxKind.Decorator);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            return finishNode(node);
        }

        // @api
        function updateDecorator(node: Decorator, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createDecorator(expression), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createPropertySignature(modifiers, name, questionToken, type), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createPropertyDeclaration(decorators, modifiers, name, questionOrExclamationToken, type, initializer), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
        }

        // Route signature creation to the appropriate factory method. Used by the NodeBuilder in the checker.
        // @api
        function createSignatureDeclaration<T extends SignatureDeclaration>(kind: T["kind"], typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): T;
        function createSignatureDeclaration(kind: SignatureDeclaration["kind"], typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): SignatureDeclaration {
            switch (kind) {
                case SyntaxKind.CallSignature:
                    return createCallSignature(typeParameters, parameters, type);
                case SyntaxKind.ConstructSignature:
                    return createConstructSignature(typeParameters, parameters, type);
                case SyntaxKind.MethodSignature:
                    // NOTE: This creates an *invalid* method signature since `name` is `undefined`, but this is preserved to support existing behavior.
                    return createMethodSignature(/*modifiers*/ undefined, /*name*/ undefined!, /*questionToken*/ undefined, typeParameters, parameters, type);
                case SyntaxKind.MethodDeclaration:
                    // NOTE: This creates an *invalid* method declaration since `name` is `undefined`, but this is preserved to support existing behavior.
                    return createMethodDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined!, /*questionToken*/ undefined, typeParameters, parameters, type, /*body*/ undefined);
                case SyntaxKind.Constructor:
                    return createConstructorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, parameters, /*body*/ undefined);
                case SyntaxKind.GetAccessor:
                    // NOTE: This creates an *invalid* get accessor since `name` is `undefined`, but this is preserved to support existing behavior.
                    return createGetAccessorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*name*/ undefined!, parameters, type, /*body*/ undefined);
                case SyntaxKind.SetAccessor:
                    // NOTE: This creates an *invalid* set accessor since `name` is `undefined`, but this is preserved to support existing behavior.
                    return createSetAccessorDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*name*/ undefined!, parameters, /*body*/ undefined);
                case SyntaxKind.IndexSignature:
                    return createIndexSignature(/*decorators*/ undefined, /*modifiers*/ undefined, parameters, type);
                case SyntaxKind.JSDocFunctionType:
                    return createJSDocFunctionType(parameters, type);
                case SyntaxKind.FunctionType:
                    return createFunctionTypeNode(typeParameters, parameters, type);
                case SyntaxKind.ConstructorType:
                    return createConstructorTypeNode(typeParameters, parameters, type);
                case SyntaxKind.FunctionDeclaration:
                    return createFunctionDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined, typeParameters, parameters, type, /*body*/ undefined);
                case SyntaxKind.FunctionExpression:
                    // NOTE: This creates an *invalid* function expression since `body` is `undefined`, but this is preserved to support existing behavior.
                    return createFunctionExpression(/*modifiers*/ undefined, /*asteriskToken*/ undefined, /*name*/ undefined, typeParameters, parameters, type, /*body*/ undefined!);
                case SyntaxKind.ArrowFunction:
                    // NOTE: This creates an *invalid* arrow function since `body` is `undefined`, but this is preserved to support existing behavior.
                    return createArrowFunction(/*modifiers*/ undefined, typeParameters, parameters, type, /*equalsGreaterThanToken*/ undefined, /*body*/ undefined!);
                default:
                    return Debug.assertNever(kind);
            }
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
            return finishNode(node);
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
                : reuseNode(node);
        }

        //
        // Types
        //

        // @api
        function createKeywordTypeNode(kind: KeywordTypeNode["kind"]) {
            return finishNode(createBaseToken(kind)) as KeywordTypeNode;
        }

        // @api
        function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode) {
            const node = createBaseNode<TypePredicateNode>(SyntaxKind.TypePredicate);
            setChild(node, node.parameterName = asName(parameterName));
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) {
            return node.parameterName !== parameterName
                || node.type !== type
                ? updateNode(createTypePredicateNode(parameterName, type), node)
                : reuseNode(node);
        }

        // @api
        function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
            const node = createBaseNode<TypeReferenceNode>(SyntaxKind.TypeReference);
            setChild(node, node.typeName = asName(typeName));
            setChildren(node, node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments)));
            return finishNode(node);
        }

        // @api
        function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) {
            return node.typeName !== typeName
                || node.typeArguments !== typeArguments
                ? updateNode(createTypeReferenceNode(typeName, typeArguments), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
        }

        // @api
        function createTypeQueryNode(exprName: EntityName) {
            const node = createBaseNode<TypeQueryNode>(SyntaxKind.TypeQuery);
            setChild(node, node.exprName = exprName);
            return finishNode(node);
        }

        // @api
        function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName) {
            return node.exprName !== exprName
                ? updateNode(createTypeQueryNode(exprName), node)
                : reuseNode(node);
        }

        // @api
        function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
            const node = createBaseNode<TypeLiteralNode>(SyntaxKind.TypeLiteral);
            setChildren(node, node.members = createNodeArray(members));
            return finishNode(node);
        }

        // @api
        function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>) {
            return node.members !== members
                ? updateNode(createTypeLiteralNode(members), node)
                : reuseNode(node);
        }

        // @api
        function createArrayTypeNode(elementType: TypeNode) {
            const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
            setChild(node, node.elementType = parenthesizer().parenthesizeElementTypeOfArrayType(elementType));
            return finishNode(node);
        }

        // @api
        function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
            return node.elementType !== elementType
                ? updateNode(createArrayTypeNode(elementType), node)
                : reuseNode(node);
        }

        // @api
        function createTupleTypeNode(elementTypes: readonly TypeNode[]) {
            const node = createBaseNode<TupleTypeNode>(SyntaxKind.TupleType);
            setChildren(node, node.elementTypes = createNodeArray(elementTypes));
            return finishNode(node);
        }

        // @api
        function updateTupleTypeNode(node: TupleTypeNode, elementTypes: readonly TypeNode[]) {
            return node.elementTypes !== elementTypes
                ? updateNode(createTupleTypeNode(elementTypes), node)
                : reuseNode(node);
        }

        // @api
        function createOptionalTypeNode(type: TypeNode) {
            const node = createBaseNode<OptionalTypeNode>(SyntaxKind.OptionalType);
            setChild(node, node.type = parenthesizer().parenthesizeElementTypeOfArrayType(type));
            return finishNode(node);
        }

        // @api
        function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
            return node.type !== type
                ? updateNode(createOptionalTypeNode(type), node)
                : reuseNode(node);
        }

        // @api
        function createRestTypeNode(type: TypeNode) {
            const node = createBaseNode<RestTypeNode>(SyntaxKind.RestType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
            return node.type !== type
                ? updateNode(createRestTypeNode(type), node)
                : reuseNode(node);
        }

        function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: readonly TypeNode[]) {
            const node = createBaseNode<UnionTypeNode | IntersectionTypeNode>(kind);
            setChildren(node, node.types = parenthesizer().parenthesizeConstituentTypesOfUnionOrIntersectionType(createNodeArray(types)));
            return finishNode(node);
        }

        function updateUnionOrIntersectionTypeNode<T extends UnionOrIntersectionTypeNode>(node: T, types: NodeArray<TypeNode>): T {
            return node.types !== types
                ? updateNode(<T>createUnionOrIntersectionTypeNode(node.kind, types), node)
                : reuseNode(node);
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
            setChild(node, node.checkType = parenthesizer().parenthesizeMemberOfConditionalType(checkType));
            setChild(node, node.extendsType = parenthesizer().parenthesizeMemberOfConditionalType(extendsType));
            setChild(node, node.trueType = trueType);
            setChild(node, node.falseType = falseType);
            return finishNode(node);
        }

        // @api
        function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
            return node.checkType !== checkType
                || node.extendsType !== extendsType
                || node.trueType !== trueType
                || node.falseType !== falseType
                ? updateNode(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
                : reuseNode(node);
        }

        // @api
        function createInferTypeNode(typeParameter: TypeParameterDeclaration) {
            const node = createBaseNode<InferTypeNode>(SyntaxKind.InferType);
            setChild(node, node.typeParameter = typeParameter);
            return finishNode(node);
        }

        // @api
        function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration) {
            return node.typeParameter !== typeParameter
                ? updateNode(createInferTypeNode(typeParameter), node)
                : reuseNode(node);
        }

        // @api
        function createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            const node = createBaseNode<ImportTypeNode>(SyntaxKind.ImportType);
            setChild(node, node.argument = argument);
            setChild(node, node.qualifier = qualifier);
            setChildren(node, node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments)));
            node.isTypeOf = isTypeOf;
            return finishNode(node);
        }

        // @api
        function updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            return node.argument !== argument
                || node.qualifier !== qualifier
                || node.typeArguments !== typeArguments
                || node.isTypeOf !== isTypeOf
                ? updateNode(createImportTypeNode(argument, qualifier, typeArguments, isTypeOf), node)
                : reuseNode(node);
        }

        // @api
        function createParenthesizedType(type: TypeNode) {
            const node = createBaseNode<ParenthesizedTypeNode>(SyntaxKind.ParenthesizedType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode) {
            return node.type !== type
                ? updateNode(createParenthesizedType(type), node)
                : reuseNode(node);
        }

        // @api
        function createThisTypeNode() {
            return finishNode(createBaseNode<ThisTypeNode>(SyntaxKind.ThisType));
        }

        // @api
        function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
            const node = createBaseNode<TypeOperatorNode>(SyntaxKind.TypeOperator);
            node.operator = operator;
            setChild(node, node.type = parenthesizer().parenthesizeMemberOfElementType(type));
            return finishNode(node);
        }

        // @api
        function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode) {
            return node.type !== type
                ? updateNode(createTypeOperatorNode(node.operator, type), node)
                : reuseNode(node);
        }

        // @api
        function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode) {
            const node = createBaseNode<IndexedAccessTypeNode>(SyntaxKind.IndexedAccessType);
            setChild(node, node.objectType = parenthesizer().parenthesizeMemberOfElementType(objectType));
            setChild(node, node.indexType = indexType);
            return finishNode(node);
        }

        // @api
        function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) {
            return node.objectType !== objectType
                || node.indexType !== indexType
                ? updateNode(createIndexedAccessTypeNode(objectType, indexType), node)
                : reuseNode(node);
        }

        // @api
        function createMappedTypeNode(readonlyToken: ReadonlyToken | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            const node = createBaseNode<MappedTypeNode>(SyntaxKind.MappedType);
            setChild(node, node.readonlyToken = readonlyToken);
            setChild(node, node.typeParameter = typeParameter);
            setChild(node, node.questionToken = questionToken);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyToken | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            return node.readonlyToken !== readonlyToken
                || node.typeParameter !== typeParameter
                || node.questionToken !== questionToken
                || node.type !== type
                ? updateNode(createMappedTypeNode(readonlyToken, typeParameter, questionToken, type), node)
                : reuseNode(node);
        }

        // @api
        function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
            const node = createBaseNode<LiteralTypeNode>(SyntaxKind.LiteralType);
            setChild(node, node.literal = literal);
            return finishNode(node);
        }

        // @api
        function updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]) {
            return node.literal !== literal
                ? updateNode(createLiteralTypeNode(literal), node)
                : reuseNode(node);
        }

        //
        // Binding Patterns
        //

        // @api
        function createObjectBindingPattern(elements: readonly BindingElement[]) {
            const node = createBaseNode<ObjectBindingPattern>(SyntaxKind.ObjectBindingPattern);
            setChildren(node, node.elements = createNodeArray(elements));
            return finishNode(node);
        }

        // @api
        function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]) {
            return node.elements !== elements
                ? updateNode(createObjectBindingPattern(elements), node)
                : reuseNode(node);
        }

        // @api
        function createArrayBindingPattern(elements: readonly ArrayBindingElement[]) {
            const node = createBaseNode<ArrayBindingPattern>(SyntaxKind.ArrayBindingPattern);
            setChildren(node, node.elements = createNodeArray(elements));
            return finishNode(node);
        }

        // @api
        function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) {
            return node.elements !== elements
                ? updateNode(createArrayBindingPattern(elements), node)
                : reuseNode(node);
        }

        // @api
        function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression) {
            const node = createBaseNamedDeclaration<BindingElement>(
                SyntaxKind.BindingElement,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name
            );
            setChild(node, node.propertyName = asName(propertyName));
            setChild(node, node.initializer = initializer);
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            return finishNode(node);
        }

        // @api
        function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) {
            return node.propertyName !== propertyName
                || node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.initializer !== initializer
                ? updateNode(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
                : reuseNode(node);
        }

        //
        // Expression
        //

        // @api
        function createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean) {
            const node = createBaseNode<ArrayLiteralExpression>(SyntaxKind.ArrayLiteralExpression);
            setChildren(node, node.elements = parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(elements)));
            if (multiLine) node.multiLine = true;
            return finishNode(node);
        }

        // @api
        function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? updateNode(createArrayLiteralExpression(elements, node.multiLine), node)
                : reuseNode(node);
        }

        // @api
        function createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean) {
            const node = createBaseNode<ObjectLiteralExpression>(SyntaxKind.ObjectLiteralExpression);
            setChildren(node, node.properties = createNodeArray(properties));
            if (multiLine) node.multiLine = true;
            return finishNode(node);
        }

        // @api
        function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) {
            return node.properties !== properties
                ? updateNode(createObjectLiteralExpression(properties, node.multiLine), node)
                : reuseNode(node);
        }

        // @api
        function createPropertyAccessExpression(expression: Expression, name: string | Identifier) {
            const node = createBaseNode<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChild(node, node.name = asName(name));
            return finishNode(node);
        }

        // @api
        function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: Identifier) {
            return node.expression !== expression
                || node.name !== name
                ? updateNode(createPropertyAccessExpression(expression, name), node)
                : reuseNode(node);
        }

        // @api
        function createElementAccessExpression(expression: Expression, index: number | Expression) {
            const node = createBaseNode<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChild(node, node.argumentExpression = asExpression(index));
            return finishNode(node);
        }

        // @api
        function updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) {
            return node.expression !== expression
                || node.argumentExpression !== argumentExpression
                ? updateNode(createElementAccessExpression(expression, argumentExpression), node)
                : reuseNode(node);
        }

        // @api
        function createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createBaseNode<CallExpression>(SyntaxKind.CallExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChildren(node, node.arguments = parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
            return finishNode(node);
        }

        // @api
        function updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? updateNode(createCallExpression(expression, typeArguments, argumentsArray), node)
                : reuseNode(node);
        }

        // @api
        function createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createBaseNode<NewExpression>(SyntaxKind.NewExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionOfNew(expression));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChildren(node, node.arguments = argumentsArray ? parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)) : undefined);
            return finishNode(node);
        }

        // @api
        function updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? updateNode(createNewExpression(expression, typeArguments, argumentsArray), node)
                : reuseNode(node);
        }

        // @api
        function createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            const node = createBaseNode<TaggedTemplateExpression>(SyntaxKind.TaggedTemplateExpression);
            setChild(node, node.tag = parenthesizer().parenthesizeLeftSideOfAccess(tag));
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.template = template);
            return finishNode(node);
        }

        // @api
        function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            return node.tag !== tag
                || node.typeArguments !== typeArguments
                || node.template !== template
                ? updateNode(createTaggedTemplateExpression(tag, typeArguments, template), node)
                : reuseNode(node);
        }

        // @api
        function createTypeAssertion(type: TypeNode, expression: Expression) {
            const node = createBaseNode<TypeAssertion>(SyntaxKind.TypeAssertionExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression) {
            return node.type !== type
                || node.expression !== expression
                ? updateNode(createTypeAssertion(type, expression), node)
                : reuseNode(node);
        }

        // @api
        function createParenthesizedExpression(expression: Expression) {
            const node = createBaseNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createParenthesizedExpression(expression), node)
                : reuseNode(node);
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
                body);
            setChild(node, node.asteriskToken = asteriskToken);
            return finishNode(node);
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
                : reuseNode(node);
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
                parenthesizer().parenthesizeConciseBodyOfArrowFunction(body)
            );
            setChild(node, node.equalsGreaterThanToken = equalsGreaterThanToken || createToken(SyntaxKind.EqualsGreaterThanToken));
            return finishNode(node);
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
                : reuseNode(node);
        }

        // @api
        function createDeleteExpression(expression: Expression) {
            const node = createBaseNode<DeleteExpression>(SyntaxKind.DeleteExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finishNode(node);
        }

        // @api
        function updateDeleteExpression(node: DeleteExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createDeleteExpression(expression), node)
                : reuseNode(node);
        }

        // @api
        function createTypeOfExpression(expression: Expression) {
            const node = createBaseNode<TypeOfExpression>(SyntaxKind.TypeOfExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finishNode(node);
        }

        // @api
        function updateTypeOfExpression(node: TypeOfExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createTypeOfExpression(expression), node)
                : reuseNode(node);
        }

        // @api
        function createVoidExpression(expression: Expression) {
            const node = createBaseNode<VoidExpression>(SyntaxKind.VoidExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finishNode(node);
        }

        // @api
        function updateVoidExpression(node: VoidExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createVoidExpression(expression), node)
                : reuseNode(node);
        }

        // @api
        function createAwaitExpression(expression: Expression) {
            const node = createBaseNode<AwaitExpression>(SyntaxKind.AwaitExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression));
            return finishNode(node);
        }

        // @api
        function updateAwaitExpression(node: AwaitExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createAwaitExpression(expression), node)
                : reuseNode(node);
        }

        // @api
        function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression) {
            const node = createBaseNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
            node.operator = operator;
            setChild(node, node.operand = parenthesizer().parenthesizeOperandOfPrefixUnary(operand));
            return finishNode(node);
        }

        // @api
        function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? updateNode(createPrefixUnaryExpression(node.operator, operand), node)
                : reuseNode(node);
        }

        // @api
        function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator) {
            const node = createBaseNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
            node.operator = operator;
            setChild(node, node.operand = parenthesizer().parenthesizeOperandOfPostfixUnary(operand));
            return finishNode(node);
        }

        // @api
        function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? updateNode(createPostfixUnaryExpression(operand, node.operator), node)
                : reuseNode(node);
        }

        // @api
        function createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) {
            const node = createBaseNode<BinaryExpression>(SyntaxKind.BinaryExpression);
            const operatorToken = asToken(operator);
            const operatorKind = operatorToken.kind;
            setChild(node, node.left = parenthesizer().parenthesizeLeftSideOfBinary(operatorKind, left));
            setChild(node, node.operatorToken = operatorToken);
            setChild(node, node.right = parenthesizer().parenthesizeRightSideOfBinary(operatorKind, node.left, right));
            return finishNode(node);
        }

        // @api
        function updateBinaryExpression(node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) {
            return node.left !== left
                || node.right !== right
                ? updateNode(createBinaryExpression(left, operator || node.operatorToken, right), node)
                : reuseNode(node);
        }

        // @api
        function createConditionalExpression(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression) {
            const node = createBaseNode<ConditionalExpression>(SyntaxKind.ConditionalExpression);
            setChild(node, node.condition = parenthesizer().parenthesizeConditionOfConditionalExpression(condition));
            setChild(node, node.questionToken = questionToken);
            setChild(node, node.whenTrue = parenthesizer().parenthesizeBranchOfConditionalExpression(whenTrue));
            setChild(node, node.colonToken = colonToken);
            setChild(node, node.whenFalse = parenthesizer().parenthesizeBranchOfConditionalExpression(whenFalse));
            return finishNode(node);
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
                ? updateNode(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node)
                : reuseNode(node);
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
            return finishNode(node);
        }

        // @api
        function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
            return node.head !== head
                || node.templateSpans !== templateSpans
                ? updateNode(createTemplateExpression(head, templateSpans), node)
                : reuseNode(node);
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
            const node = createBaseNode<TemplateLiteralLikeNode>(kind);
            node.text = text;
            node.rawText = rawText;
            return finishNode(node);
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
            return finishNode(node);
        }

        // @api
        function updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression) {
            return node.expression !== expression
                || node.asteriskToken !== asteriskToken
                ? updateNode(createYieldExpression(asteriskToken, expression), node)
                : reuseNode(node);
        }

        // @api
        function createSpreadElement(expression: Expression) {
            const node = createBaseNode<SpreadElement>(SyntaxKind.SpreadElement);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            return finishNode(node);
        }

        // @api
        function updateSpreadElement(node: SpreadElement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createSpreadElement(expression), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createClassExpression(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuseNode(node);
        }

        // @api
        function createOmittedExpression() {
            return finishNode(createBaseNode<OmittedExpression>(SyntaxKind.OmittedExpression));
        }

        // @api
        function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            const node = createBaseNode<ExpressionWithTypeArguments>(SyntaxKind.ExpressionWithTypeArguments);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            setChildren(node, node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(typeArguments));
            return finishNode(node);
        }

        // @api
        function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                ? updateNode(createExpressionWithTypeArguments(expression, typeArguments), node)
                : reuseNode(node);
        }

        // @api
        function createAsExpression(expression: Expression, type: TypeNode) {
            const node = createBaseNode<AsExpression>(SyntaxKind.AsExpression);
            setChild(node, node.expression = expression);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode) {
            return node.expression !== expression
                || node.type !== type
                ? updateNode(createAsExpression(expression, type), node)
                : reuseNode(node);
        }

        // @api
        function createNonNullExpression(expression: Expression) {
            const node = createBaseNode<NonNullExpression>(SyntaxKind.NonNullExpression);
            setChild(node, node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression));
            return finishNode(node);
        }

        // @api
        function updateNonNullExpression(node: NonNullExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createNonNullExpression(expression), node)
                : reuseNode(node);
        }

        // @api
        function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier) {
            const node = createBaseNode<MetaProperty>(SyntaxKind.MetaProperty);
            node.keywordToken = keywordToken;
            setChild(node, node.name = name);
            return finishNode(node);
        }

        // @api
        function updateMetaProperty(node: MetaProperty, name: Identifier) {
            return node.name !== name
                ? updateNode(createMetaProperty(node.keywordToken, name), node)
                : reuseNode(node);
        }

        //
        // Misc
        //

        // @api
        function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail) {
            const node = createBaseNode<TemplateSpan>(SyntaxKind.TemplateSpan);
            setChild(node, node.expression = expression);
            setChild(node, node.literal = literal);
            return finishNode(node);
        }

        // @api
        function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) {
            return node.expression !== expression
                || node.literal !== literal
                ? updateNode(createTemplateSpan(expression, literal), node)
                : reuseNode(node);
        }

        // @api
        function createSemicolonClassElement() {
            return finishNode(createBaseNode<SemicolonClassElement>(SyntaxKind.SemicolonClassElement));
        }

        //
        // Element
        //

        // @api
        function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
            const node = createBaseNode<Block>(SyntaxKind.Block);
            setChildren(node, node.statements = createNodeArray(statements));
            if (multiLine) node.multiLine = multiLine;
            return finishNode(node);
        }

        // @api
        function updateBlock(node: Block, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createBlock(statements, node.multiLine), node)
                : reuseNode(node);
        }

        // @api
        function createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) {
            const node = createBaseDeclaration<VariableStatement>(SyntaxKind.VariableStatement, /*decorators*/ undefined, modifiers);
            setChild(node, node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList);
            return finishNode(node);
        }

        // @api
        function updateVariableStatement(node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList) {
            return node.modifiers !== modifiers
                || node.declarationList !== declarationList
                ? updateNode(createVariableStatement(modifiers, declarationList), node)
                : reuseNode(node);
        }

        // @api
        function createEmptyStatement() {
            return finishNode(createBaseNode<EmptyStatement>(SyntaxKind.EmptyStatement));
        }

        // @api
        function createExpressionStatement(expression: Expression): ExpressionStatement {
            const node = createBaseNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionOfExpressionStatement(expression));
            return finishNode(node);
        }

        // @api
        function updateExpressionStatement(node: ExpressionStatement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createExpressionStatement(expression), node)
                : reuseNode(node);
        }

        // @api
        function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement) {
            const node = createBaseNode<IfStatement>(SyntaxKind.IfStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.thenStatement = asEmbeddedStatement(thenStatement));
            setChild(node, node.elseStatement = asEmbeddedStatement(elseStatement));
            return finishNode(node);
        }

        // @api
        function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) {
            return node.expression !== expression
                || node.thenStatement !== thenStatement
                || node.elseStatement !== elseStatement
                ? updateNode(createIfStatement(expression, thenStatement, elseStatement), node)
                : reuseNode(node);
        }

        // @api
        function createDoStatement(statement: Statement, expression: Expression) {
            const node = createBaseNode<DoStatement>(SyntaxKind.DoStatement);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression) {
            return node.statement !== statement
                || node.expression !== expression
                ? updateNode(createDoStatement(statement, expression), node)
                : reuseNode(node);
        }

        // @api
        function createWhileStatement(expression: Expression, statement: Statement) {
            const node = createBaseNode<WhileStatement>(SyntaxKind.WhileStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? updateNode(createWhileStatement(expression, statement), node)
                : reuseNode(node);
        }

        // @api
        function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            const node = createBaseNode<ForStatement>(SyntaxKind.ForStatement);
            setChild(node, node.initializer = initializer);
            setChild(node, node.condition = condition);
            setChild(node, node.incrementor = incrementor);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            return node.initializer !== initializer
                || node.condition !== condition
                || node.incrementor !== incrementor
                || node.statement !== statement
                ? updateNode(createForStatement(initializer, condition, incrementor, statement), node)
                : reuseNode(node);
        }

        // @api
        function createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createBaseNode<ForInStatement>(SyntaxKind.ForInStatement);
            setChild(node, node.initializer = initializer);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? updateNode(createForInStatement(initializer, expression, statement), node)
                : reuseNode(node);
        }

        // @api
        function createForOfStatement(awaitModifier: AwaitKeywordToken | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createBaseNode<ForOfStatement>(SyntaxKind.ForOfStatement);
            setChild(node, node.awaitModifier = awaitModifier);
            setChild(node, node.initializer = initializer);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeywordToken | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.awaitModifier !== awaitModifier
                || node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? updateNode(createForOfStatement(awaitModifier, initializer, expression, statement), node)
                : reuseNode(node);
        }

        // @api
        function createContinueStatement(label?: string | Identifier): ContinueStatement {
            const node = createBaseNode<ContinueStatement>(SyntaxKind.ContinueStatement);
            setChild(node, node.label = asName(label));
            return finishNode(node);
        }

        // @api
        function updateContinueStatement(node: ContinueStatement, label: Identifier | undefined) {
            return node.label !== label
                ? updateNode(createContinueStatement(label), node)
                : reuseNode(node);
        }

        // @api
        function createBreakStatement(label?: string | Identifier): BreakStatement {
            const node = createBaseNode<BreakStatement>(SyntaxKind.BreakStatement);
            setChild(node, node.label = asName(label));
            return finishNode(node);
        }

        // @api
        function updateBreakStatement(node: BreakStatement, label: Identifier | undefined) {
            return node.label !== label
                ? updateNode(createBreakStatement(label), node)
                : reuseNode(node);
        }

        // @api
        function createReturnStatement(expression?: Expression): ReturnStatement {
            const node = createBaseNode<ReturnStatement>(SyntaxKind.ReturnStatement);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateReturnStatement(node: ReturnStatement, expression: Expression | undefined) {
            return node.expression !== expression
                ? updateNode(createReturnStatement(expression), node)
                : reuseNode(node);
        }

        // @api
        function createWithStatement(expression: Expression, statement: Statement) {
            const node = createBaseNode<WithStatement>(SyntaxKind.WithStatement);
            setChild(node, node.expression = expression);
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? updateNode(createWithStatement(expression, statement), node)
                : reuseNode(node);
        }

        // @api
        function createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement {
            const node = createBaseNode<SwitchStatement>(SyntaxKind.SwitchStatement);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            setChild(node, node.caseBlock = caseBlock);
            return finishNode(node);
        }

        // @api
        function updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) {
            return node.expression !== expression
                || node.caseBlock !== caseBlock
                ? updateNode(createSwitchStatement(expression, caseBlock), node)
                : reuseNode(node);
        }

        // @api
        function createLabeledStatement(label: string | Identifier, statement: Statement) {
            const node = createBaseNode<LabeledStatement>(SyntaxKind.LabeledStatement);
            setChild(node, node.label = asName(label));
            setChild(node, node.statement = asEmbeddedStatement(statement));
            return finishNode(node);
        }

        // @api
        function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement) {
            return node.label !== label
                || node.statement !== statement
                ? updateNode(createLabeledStatement(label, statement), node)
                : reuseNode(node);
        }

        // @api
        function createThrowStatement(expression: Expression) {
            const node = createBaseNode<ThrowStatement>(SyntaxKind.ThrowStatement);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateThrowStatement(node: ThrowStatement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createThrowStatement(expression), node)
                : reuseNode(node);
        }

        // @api
        function createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            const node = createBaseNode<TryStatement>(SyntaxKind.TryStatement);
            setChild(node, node.tryBlock = tryBlock);
            setChild(node, node.catchClause = catchClause);
            setChild(node, node.finallyBlock = finallyBlock);
            return finishNode(node);
        }

        // @api
        function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            return node.tryBlock !== tryBlock
                || node.catchClause !== catchClause
                || node.finallyBlock !== finallyBlock
                ? updateNode(createTryStatement(tryBlock, catchClause, finallyBlock), node)
                : reuseNode(node);
        }

        // @api
        function createDebuggerStatement() {
            return finishNode(createBaseNode<DebuggerStatement>(SyntaxKind.DebuggerStatement));
        }

        // @api
        function createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) {
            const node = createBaseVariableLikeDeclaration<VariableDeclaration>(
                SyntaxKind.VariableDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name,
                type,
                initializer && parenthesizer().parenthesizeExpressionForDisallowedComma(initializer)
            );
            setChild(node, node.exclamationToken = exclamationToken);
            return finishNode(node);
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
                ? updateNode(createVariableDeclaration(name, exclamationToken, type, initializer), node)
                : reuseNode(node);
        }

        function updateVariableDeclarationWithoutTokens(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined) {
            return updateVariableDeclaration(node, name, node.exclamationToken, type, initializer);
        }

        // @api
        function createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags = NodeFlags.None) {
            const node = createBaseNode<VariableDeclarationList>(SyntaxKind.VariableDeclarationList);
            node.flags |= flags & NodeFlags.BlockScoped;
            setChildren(node, node.declarations = createNodeArray(declarations));
            return finishNode(node);
        }

        // @api
        function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) {
            return node.declarations !== declarations
                ? updateNode(createVariableDeclarationList(declarations, node.flags), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createClassDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createInterfaceDeclaration(decorators, modifiers, name, typeParameters, heritageClauses, members), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createTypeAliasDeclaration(decorators, modifiers, name, typeParameters, type), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createEnumDeclaration(decorators, modifiers, name, members), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createModuleDeclaration(decorators, modifiers, name, body, node.flags), node)
                : reuseNode(node);
        }

        // @api
        function createModuleBlock(statements: readonly Statement[]) {
            const node = createBaseNode<ModuleBlock>(SyntaxKind.ModuleBlock);
            setChildren(node, node.statements = createNodeArray(statements));
            return finishNode(node);
        }

        // @api
        function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createModuleBlock(statements), node)
                : reuseNode(node);
        }

        // @api
        function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
            const node = createBaseNode<CaseBlock>(SyntaxKind.CaseBlock);
            setChildren(node, node.clauses = createNodeArray(clauses));
            return finishNode(node);
        }

        // @api
        function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) {
            return node.clauses !== clauses
                ? updateNode(createCaseBlock(clauses), node)
                : reuseNode(node);
        }

        // @api
        function createNamespaceExportDeclaration(name: string | Identifier) {
            const node = createBaseNode<NamespaceExportDeclaration>(SyntaxKind.NamespaceExportDeclaration);
            setChild(node, node.name = asName(name));
            return finishNode(node);
        }

        // @api
        function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier) {
            return node.name !== name
                ? updateNode(createNamespaceExportDeclaration(name), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createImportEqualsDeclaration(decorators, modifiers, name, moduleReference), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createImportDeclaration(decorators, modifiers, importClause, moduleSpecifier), node)
                : reuseNode(node);
        }

        // @api
        function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
            const node = createBaseNode<ImportClause>(SyntaxKind.ImportClause);
            setChild(node, node.name = name);
            setChild(node, node.namedBindings = namedBindings);
            return finishNode(node);
        }

        // @api
        function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined) {
            return node.name !== name
                || node.namedBindings !== namedBindings
                ? updateNode(createImportClause(name, namedBindings), node)
                : reuseNode(node);
        }

        // @api
        function createNamespaceImport(name: Identifier): NamespaceImport {
            const node = createBaseNode<NamespaceImport>(SyntaxKind.NamespaceImport);
            setChild(node, node.name = name);
            return finishNode(node);
        }

        // @api
        function updateNamespaceImport(node: NamespaceImport, name: Identifier) {
            return node.name !== name
                ? updateNode(createNamespaceImport(name), node)
                : reuseNode(node);
        }

        // @api
        function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
            const node = createBaseNode<NamedImports>(SyntaxKind.NamedImports);
            setChildren(node, node.elements = createNodeArray(elements));
            return finishNode(node);
        }

        // @api
        function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]) {
            return node.elements !== elements
                ? updateNode(createNamedImports(elements), node)
                : reuseNode(node);
        }

        // @api
        function createImportSpecifier(propertyName: Identifier | undefined, name: Identifier) {
            const node = createBaseNode<ImportSpecifier>(SyntaxKind.ImportSpecifier);
            setChild(node, node.propertyName = propertyName);
            setChild(node, node.name = name);
            return finishNode(node);
        }

        // @api
        function updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? updateNode(createImportSpecifier(propertyName, name), node)
                : reuseNode(node);
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
                ? parenthesizer().parenthesizeRightSideOfBinary(SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
                : parenthesizer().parenthesizeExpressionOfExportDefault(expression));
            return finishNode(node);
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
                ? updateNode(createExportAssignment(decorators, modifiers, node.isExportEquals, expression), node)
                : reuseNode(node);
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
            return finishNode(node);
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
                ? updateNode(createExportDeclaration(decorators, modifiers, exportClause, moduleSpecifier), node)
                : reuseNode(node);
        }

        // @api
        function createNamedExports(elements: readonly ExportSpecifier[]) {
            const node = createBaseNode<NamedExports>(SyntaxKind.NamedExports);
            setChildren(node, node.elements = createNodeArray(elements));
            return finishNode(node);
        }

        // @api
        function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]) {
            return node.elements !== elements
                ? updateNode(createNamedExports(elements), node)
                : reuseNode(node);
        }

        // @api
        function createExportSpecifier(propertyName: string | Identifier | undefined, name: string | Identifier) {
            const node = createBaseNode<ExportSpecifier>(SyntaxKind.ExportSpecifier);
            setChild(node, node.propertyName = asName(propertyName));
            setChild(node, node.name = asName(name));
            return finishNode(node);
        }

        // @api
        function updateExportSpecifier(node: ExportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? updateNode(createExportSpecifier(propertyName, name), node)
                : reuseNode(node);
        }

        // @api
        function createMissingDeclaration() {
            const node = createBaseDeclaration<MissingDeclaration>(
                SyntaxKind.MissingDeclaration,
                /*decorators*/ undefined,
                /*modifiers*/ undefined
            );
            return finishNode(node);
        }

        //
        // Module references
        //

        // @api
        function createExternalModuleReference(expression: Expression) {
            const node = createBaseNode<ExternalModuleReference>(SyntaxKind.ExternalModuleReference);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createExternalModuleReference(expression), node)
                : reuseNode(node);
        }

        //
        // JSDoc
        //

        // @api
        function createJSDocAllType() {
            return finishNode(createBaseNode<JSDocAllType>(SyntaxKind.JSDocAllType));
        }

        // @api
        function createJSDocUnknownType() {
            return finishNode(createBaseNode<JSDocUnknownType>(SyntaxKind.JSDocUnknownType));
        }

        // @api
        function createJSDocNonNullableType(type: TypeNode) {
            const node = createBaseNode<JSDocNonNullableType>(SyntaxKind.JSDocNonNullableType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function createJSDocNullableType(type: TypeNode) {
            const node = createBaseNode<JSDocNullableType>(SyntaxKind.JSDocNullableType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function createJSDocOptionalType(type: TypeNode) {
            const node = createBaseNode<JSDocOptionalType>(SyntaxKind.JSDocOptionalType);
            setChild(node, node.type = type);
            return finishNode(node);
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
            return finishNode(node);
        }

        // @api
        function createJSDocVariadicType(type: TypeNode) {
            const node = createBaseNode<JSDocVariadicType>(SyntaxKind.JSDocVariadicType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function createJSDocNamepathType(type: TypeNode) {
            const node = createBaseNode<JSDocNamepathType>(SyntaxKind.JSDocNamepathType);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral {
            const node = createBaseNode<JSDocTypeLiteral>(SyntaxKind.JSDocTypeLiteral);
            setChildren(node, node.jsDocPropertyTags = asNodeArray(propertyTags));
            node.isArrayType = isArrayType;
            return finishNode(node);
        }

        // @api
        function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
            const node = createBaseNode<JSDocTypeExpression>(SyntaxKind.JSDocTypeExpression);
            setChild(node, node.type = type);
            return finishNode(node);
        }

        // @api
        function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
            const node = createBaseNode<JSDocSignature>(SyntaxKind.JSDocSignature);
            setChildren(node, node.typeParameters = asNodeArray(typeParameters));
            setChildren(node, node.parameters = createNodeArray(parameters));
            setChild(node, node.type = type);
            return finishNode(node);
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
            return finishNode(node);
        }

        // @api
        function createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string): JSDocTypeTag {
            const node = createBaseJSDocTag<JSDocTypeTag>(SyntaxKind.JSDocTypeTag, tagName || createIdentifier("type"), comment);
            setChild(node, node.typeExpression = typeExpression);
            return finishNode(node);
        }

        // @api
        function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocTypedefTag {
            const node = createBaseJSDocTag<JSDocTypedefTag>(SyntaxKind.JSDocTypedefTag, tagName || createIdentifier("typedef"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.fullName = fullName);
            setChild(node, node.name = getJSDocTypeAliasName(fullName));
            return finishNode(node);
        }

        // @api
        function createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocReturnTag {
            const node = createBaseJSDocTag<JSDocReturnTag>(SyntaxKind.JSDocReturnTag, tagName || createIdentifier("returns"), comment);
            setChild(node, node.typeExpression = typeExpression);
            return finishNode(node);
        }

        // @api
        function createJSDocThisTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocThisTag {
            const node = createBaseJSDocTag<JSDocThisTag>(SyntaxKind.JSDocThisTag, tagName || createIdentifier("this"), /*comment*/ undefined);
            setChild(node, node.typeExpression = typeExpression);
            return finishNode(node);
        }

        // @api
        function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocParameterTag {
            const node = createBaseJSDocTag<JSDocParameterTag>(SyntaxKind.JSDocParameterTag, tagName || createIdentifier("param"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.name = name);
            node.isNameFirst = !!isNameFirst;
            node.isBracketed = isBracketed;
            return finishNode(node);
        }

        // @api
        function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocPropertyTag {
            const node = createBaseJSDocTag<JSDocPropertyTag>(SyntaxKind.JSDocPropertyTag, tagName || createIdentifier("prop"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.name = name);
            node.isNameFirst = !!isNameFirst;
            node.isBracketed = isBracketed;
            return finishNode(node);
        }

        // @api
        function createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string): JSDocAuthorTag {
            const node = createBaseJSDocTag<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag, tagName || createIdentifier("author"), comment);
            return finishNode(node);
        }

        // @api
        function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"]): JSDocAugmentsTag {
            const node = createBaseJSDocTag<JSDocAugmentsTag>(SyntaxKind.JSDocAugmentsTag, tagName || createIdentifier("augments"), /*comment*/ undefined);
            setChild(node, node.class = className);
            return finishNode(node);
        }

        // @api
        function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocCallbackTag {
            const node = createBaseJSDocTag<JSDocCallbackTag>(SyntaxKind.JSDocCallbackTag, tagName || createIdentifier("callback"), comment);
            setChild(node, node.typeExpression = typeExpression);
            setChild(node, node.fullName = fullName);
            node.name = getJSDocTypeAliasName(fullName);
            return finishNode(node);
        }

        // @api
        function createJSDocClassTag(tagName: Identifier | undefined): JSDocClassTag {
            const node = createBaseJSDocTag<JSDocClassTag>(SyntaxKind.JSDocClassTag, tagName || createIdentifier("class"), /*comment*/ undefined);
            return finishNode(node);
        }

        // @api
        function createJSDocEnumTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocEnumTag {
            const node = createBaseJSDocTag<JSDocEnumTag>(SyntaxKind.JSDocEnumTag, tagName || createIdentifier("enum"), /*comment*/ undefined);
            setChild(node, node.typeExpression = typeExpression);
            return finishNode(node);
        }

        // @api
        function createJSDocTag<T extends JSDocTag>(kind: T["kind"], tagName: Identifier): T {
            const node = createBaseJSDocTag(kind, tagName, /*comment*/ undefined);
            return finishNode(node);
        }

        // @api
        function createJSDocComment(comment?: string | undefined, tags?: NodeArray<JSDocTag> | undefined) {
            const node = createBaseNode<JSDoc>(SyntaxKind.JSDocComment);
            node.comment = comment;
            setChildren(node, node.tags = tags);
            return finishNode(node);
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
            return finishNode(node);
        }

        // @api
        function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
            return node.openingElement !== openingElement
                || node.children !== children
                || node.closingElement !== closingElement
                ? updateNode(createJsxElement(openingElement, children, closingElement), node)
                : reuseNode(node);
        }

        // @api
        function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createBaseNode<JsxSelfClosingElement>(SyntaxKind.JsxSelfClosingElement);
            setChild(node, node.tagName = tagName);
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.attributes = attributes);
            return finishNode(node);
        }

        // @api
        function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? updateNode(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
                : reuseNode(node);
        }

        // @api
        function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createBaseNode<JsxOpeningElement>(SyntaxKind.JsxOpeningElement);
            setChild(node, node.tagName = tagName);
            setChildren(node, node.typeArguments = asNodeArray(typeArguments));
            setChild(node, node.attributes = attributes);
            return finishNode(node);
        }

        // @api
        function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? updateNode(createJsxOpeningElement(tagName, typeArguments, attributes), node)
                : reuseNode(node);
        }

        // @api
        function createJsxClosingElement(tagName: JsxTagNameExpression) {
            const node = createBaseNode<JsxClosingElement>(SyntaxKind.JsxClosingElement);
            setChild(node, node.tagName = tagName);
            return finishNode(node);
        }

        // @api
        function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression) {
            return node.tagName !== tagName
                ? updateNode(createJsxClosingElement(tagName), node)
                : reuseNode(node);
        }

        // @api
        function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            const node = createBaseNode<JsxFragment>(SyntaxKind.JsxFragment);
            setChild(node, node.openingFragment = openingFragment);
            setChildren(node, node.children = createNodeArray(children));
            setChild(node, node.closingFragment = closingFragment);
            return finishNode(node);
        }

        // @api
        function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            return node.openingFragment !== openingFragment
                || node.children !== children
                || node.closingFragment !== closingFragment
                ? updateNode(createJsxFragment(openingFragment, children, closingFragment), node)
                : reuseNode(node);
        }

        // @api
        function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            const node = createBaseNode<JsxText>(SyntaxKind.JsxText);
            node.text = text;
            node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
            return finishNode(node);
        }

        // @api
        function updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            return node.text !== text
                || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
                ? updateNode(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
                : reuseNode(node);
        }

        // @api
        function createJsxOpeningFragment() {
            return finishNode(createBaseNode<JsxOpeningFragment>(SyntaxKind.JsxOpeningFragment));
        }

        // @api
        function createJsxJsxClosingFragment() {
            return finishNode(createBaseNode<JsxClosingFragment>(SyntaxKind.JsxClosingFragment));
        }

        // @api
        function createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            const node = createBaseNode<JsxAttribute>(SyntaxKind.JsxAttribute);
            setChild(node, node.name = name);
            setChild(node, node.initializer = initializer);
            return finishNode(node);
        }

        // @api
        function updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? updateNode(createJsxAttribute(name, initializer), node)
                : reuseNode(node);
        }

        // @api
        function createJsxAttributes(properties: readonly JsxAttributeLike[]) {
            const node = createBaseNode<JsxAttributes>(SyntaxKind.JsxAttributes);
            setChildren(node, node.properties = createNodeArray(properties));
            return finishNode(node);
        }

        // @api
        function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]) {
            return node.properties !== properties
                ? updateNode(createJsxAttributes(properties), node)
                : reuseNode(node);
        }

        // @api
        function createJsxSpreadAttribute(expression: Expression) {
            const node = createBaseNode<JsxSpreadAttribute>(SyntaxKind.JsxSpreadAttribute);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createJsxSpreadAttribute(expression), node)
                : reuseNode(node);
        }

        // @api
        function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) {
            const node = createBaseNode<JsxExpression>(SyntaxKind.JsxExpression);
            setChild(node, node.dotDotDotToken = dotDotDotToken);
            setChild(node, node.expression = expression);
            return finishNode(node);
        }

        // @api
        function updateJsxExpression(node: JsxExpression, expression: Expression | undefined) {
            return node.expression !== expression
                ? updateNode(createJsxExpression(node.dotDotDotToken, expression), node)
                : reuseNode(node);
        }

        //
        // Clauses
        //

        // @api
        function createCaseClause(expression: Expression, statements: readonly Statement[]) {
            const node = createBaseNode<CaseClause>(SyntaxKind.CaseClause);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            setChildren(node, node.statements = createNodeArray(statements));
            return finishNode(node);
        }

        // @api
        function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]) {
            return node.expression !== expression
                || node.statements !== statements
                ? updateNode(createCaseClause(expression, statements), node)
                : reuseNode(node);
        }

        // @api
        function createDefaultClause(statements: readonly Statement[]) {
            const node = createBaseNode<DefaultClause>(SyntaxKind.DefaultClause);
            setChildren(node, node.statements = createNodeArray(statements));
            return finishNode(node);
        }

        // @api
        function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createDefaultClause(statements), node)
                : reuseNode(node);
        }

        // @api
        function createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]) {
            const node = createBaseNode<HeritageClause>(SyntaxKind.HeritageClause);
            node.token = token;
            setChildren(node, node.types = createNodeArray(types));
            return finishNode(node);
        }

        // @api
        function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) {
            return node.types !== types
                ? updateNode(createHeritageClause(node.token, types), node)
                : reuseNode(node);
        }

        // @api
        function createCatchClause(variableDeclaration: string | VariableDeclaration | undefined, block: Block) {
            const node = createBaseNode<CatchClause>(SyntaxKind.CatchClause);
            setChild(node, node.variableDeclaration = !isString(variableDeclaration) ? variableDeclaration : createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined
            ));
            setChild(node, node.block = block);
            return finishNode(node);
        }

        // @api
        function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) {
            return node.variableDeclaration !== variableDeclaration
                || node.block !== block
                ? updateNode(createCatchClause(variableDeclaration, block), node)
                : reuseNode(node);
        }

        //
        // Property assignments
        //

        // @api
        function createPropertyAssignment(name: string | PropertyName, initializer: Expression) {
            const node = createBaseNode<PropertyAssignment>(SyntaxKind.PropertyAssignment);
            setChild(node, node.name = asName(name));
            setChild(node, node.questionToken = undefined);
            setChild(node, node.initializer = parenthesizer().parenthesizeExpressionForDisallowedComma(initializer));
            return finishNode(node);
        }

        function finishUpdatePropertyAssignment(updated: PropertyAssignment, original: PropertyAssignment) {
            if (original.decorators) updated.decorators = original.decorators;
            if (original.modifiers) updated.modifiers = original.modifiers;
            if (original.questionToken) updated.questionToken = original.questionToken;
            if (original.exclamationToken) updated.exclamationToken = original.exclamationToken;
            return updateNode(updated, original);
        }

        // @api
        function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression) {
            return node.name !== name
                || node.initializer !== initializer
                ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node)
                : reuseNode(node);
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
                ? parenthesizer().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer)
                : undefined);
            return finishNode(node);
        }

        function finishUpdateShorthandPropertyAssignment(updated: ShorthandPropertyAssignment, original: ShorthandPropertyAssignment) {
            if (original.decorators) updated.decorators = original.decorators;
            if (original.modifiers) updated.modifiers = original.modifiers;
            if (original.equalsToken) updated.equalsToken = original.equalsToken;
            if (original.questionToken) updated.questionToken = original.questionToken;
            if (original.exclamationToken) updated.exclamationToken = original.exclamationToken;
            return updateNode(updated, original);
        }

        // @api
        function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) {
            return node.name !== name
                || node.objectAssignmentInitializer !== objectAssignmentInitializer
                ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node)
                : reuseNode(node);
        }

        // @api
        function createSpreadAssignment(expression: Expression) {
            const node = createBaseNode<SpreadAssignment>(SyntaxKind.SpreadAssignment);
            setChild(node, node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression));
            return finishNode(node);
        }

        // @api
        function updateSpreadAssignment(node: SpreadAssignment, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createSpreadAssignment(expression), node)
                : reuseNode(node);
        }


        //
        // Enum
        //

        // @api
        function createEnumMember(name: string | PropertyName, initializer?: Expression) {
            const node = createBaseNode<EnumMember>(SyntaxKind.EnumMember);
            setChild(node, node.name = asName(name));
            setChild(node, node.initializer = initializer && parenthesizer().parenthesizeExpressionForDisallowedComma(initializer));
            return finishNode(node);
        }

        // @api
        function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? updateNode(createEnumMember(name, initializer), node)
                : reuseNode(node);
        }

        //
        // Top-level nodes
        //

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
            return finishNode(node);
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
                ? updateNode(cloneSourceFileWithChanges(node, statements, isDeclarationFile, referencedFiles, typeReferenceDirectives, hasNoDefaultLib, libReferenceDirectives), node)
                : reuseNode(node);
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
            return finishNode(node);
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
            return finishNode(node);
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
            return finishNode(node);
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
            return finishNode(node);
        }

        // @api
        function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createPartiallyEmittedExpression(expression, node.original), node)
                : reuseNode(node);
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
            return finishNode(node);
        }

        // @api
        function updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? updateNode(createCommaListExpression(elements), node)
                : reuseNode(node);
        }

        // @api
        function createBundle(sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            const node = createBaseNode<Bundle>(SyntaxKind.Bundle);
            node.prepends = prepends;
            node.sourceFiles = sourceFiles;
            return finishNode(node);
        }

        // @api
        function updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            return node.sourceFiles !== sourceFiles
                || node.prepends !== prepends
                ? updateNode(createBundle(sourceFiles, prepends), node)
                : reuseNode(node);
        }

        //
        // Compound Nodes
        //

        // TODO(rbuckton): Consider removing these from NodeFactory and putting them somewhere else.

        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
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

        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): CallExpression;
        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
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


        function createComma(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.CommaToken, right);
        }

        function createLessThan(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.LessThanToken, right);
        }

        function createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
        function createAssignment(left: Expression, right: Expression): BinaryExpression;
        function createAssignment(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.EqualsToken, right);
        }

        function createStrictEquality(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.EqualsEqualsEqualsToken, right);
        }

        function createStrictInequality(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
        }

        function createAdd(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.PlusToken, right);
        }

        function createSubtract(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.MinusToken, right);
        }

        function createPostfixIncrement(operand: Expression) {
            return createPostfixUnaryExpression(operand, SyntaxKind.PlusPlusToken);
        }

        function createLogicalAnd(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.AmpersandAmpersandToken, right);
        }

        function createLogicalOr(left: Expression, right: Expression) {
            return createBinaryExpression(left, SyntaxKind.BarBarToken, right);
        }

        function createLogicalNot(operand: Expression) {
            return createPrefixUnaryExpression(SyntaxKind.ExclamationToken, operand);
        }

        function createVoidZero() {
            return createVoidExpression(createNumericLiteral("0"));
        }

        function createExportDefault(expression: Expression) {
            return createExportAssignment(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                /*isExportEquals*/ false,
                expression);
        }

        function createExternalModuleExport(exportName: Identifier) {
            return createExportDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                createNamedExports([
                    createExportSpecifier(/*propertyName*/ undefined, exportName)
                ])
            );
        }

        //
        // Utilities
        //

        function createTypeCheck(value: Expression, tag: TypeOfTag) {
            return tag === "undefined"
                ? createStrictEquality(value, createVoidZero())
                : createStrictEquality(createTypeOfExpression(value), createStringLiteral(tag));
        }

        function createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]) {
            return createCallExpression(
                createPropertyAccessExpression(object, asName(methodName)),
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
            return createMethodCall(createIdentifier(globalObjectName), methodName, argumentsList);
        }

        function createArraySlice(array: Expression, start?: number | Expression) {
            return createMethodCall(array, "slice", start === undefined ? [] : [asExpression(start)]);
        }

        function createArrayConcat(array: Expression, argumentsList: readonly Expression[]) {
            return createMethodCall(array, "concat", argumentsList);
        }

        function createObjectDefinePropertyCall(target: Expression, propertyName: string | Expression, attributes: Expression) {
            return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
        }

        function tryAddPropertyAssignment(properties: Push<PropertyAssignment>, propertyName: string, expression: Expression | undefined) {
            if (expression) {
                properties.push(createPropertyAssignment(propertyName, expression));
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
            return createObjectLiteralExpression(properties, !singleLine);
        }

        function updateOuterExpression(outerExpression: OuterExpression, expression: Expression) {
            switch (outerExpression.kind) {
                case SyntaxKind.ParenthesizedExpression: return updateParenthesizedExpression(outerExpression, expression);
                case SyntaxKind.TypeAssertionExpression: return updateTypeAssertion(outerExpression, outerExpression.type, expression);
                case SyntaxKind.AsExpression: return updateAsExpression(outerExpression, expression, outerExpression.type);
                case SyntaxKind.NonNullExpression: return updateNonNullExpression(outerExpression, expression);
                case SyntaxKind.PartiallyEmittedExpression: return updatePartiallyEmittedExpression(outerExpression, expression);
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
            const updated = updateLabeledStatement(
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
                thisArg = createThisExpression();
                target = callee;
            }
            else if (callee.kind === SyntaxKind.SuperKeyword) {
                thisArg = createThisExpression();
                target = languageVersion !== undefined && languageVersion < ScriptTarget.ES2015
                    ? setTextRange(createIdentifier("_super"), callee)
                    : <PrimaryExpression>callee;
            }
            else if (getEmitFlags(callee) & EmitFlags.HelperName) {
                thisArg = createVoidZero();
                target = parenthesizer().parenthesizeLeftSideOfAccess(callee);
            }
            else if (isPropertyAccessExpression(callee)) {
                if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                    // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                    thisArg = createTempVariable(recordTempVariable);
                    target = createPropertyAccessExpression(
                        setTextRange(
                            createAssignment(
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
                    thisArg = createTempVariable(recordTempVariable);
                    target = createElementAccessExpression(
                        setTextRange(
                            createAssignment(
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
                target = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            }

            return { target, thisArg };
        }

        function inlineExpressions(expressions: readonly Expression[]) {
            // Avoid deeply nested comma expressions as traversing them during emit can result in "Maximum call
            // stack size exceeded" errors.
            return expressions.length > 10
                ? createCommaListExpression(expressions)
                : reduceLeft(expressions, createComma)!;
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
            const qualifiedName = createPropertyAccessExpression(ns, nodeIsSynthesized(name) ? name : getSynthesizedClone(name));
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
            return startOnNewLine(createExpressionStatement(createStringLiteral("use strict"))) as PrologueDirective;
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
                return setTextRange(createNodeArray<Statement>([createUseStrictPrologue(), ...statements]), statements);
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
            return <Statement>singleOrUndefined(nodes) || createBlock(<readonly Statement[]>nodes);
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

        // tslint:disable-next-line no-empty
        function setChildWithoutTreeState(_parent: Node, _child: Node | undefined): void {
        }

        function setChildWithTreeState(parent: Node, child: Node | undefined): void {
            if (child) {
                treeStateObserver.onSetChild(parent, child);
                setChildWithoutTreeState(parent, child);
            }
        }

        // tslint:disable-next-line no-empty
        function setChildrenWithoutTreeState(_parent: Node, _children: NodeArray<Node> | undefined): void {
        }

        function setChildrenWithTreeState(parent: Node, children: NodeArray<Node> | undefined): void {
            if (children) {
                treeStateObserver.onSetChildren(parent, children);
                setChildrenWithoutTreeState(parent, children);
            }
        }

        function finishNodeWithoutTreeState<T extends Node>(node: T) {
            return node;
        }

        function finishNodeWithTreeState<T extends Node>(node: T) {
            treeStateObserver.onFinishNode(node);
            return finishNodeWithoutTreeState(node);
        }

        function updateNodeWithTreeState<T extends Node>(updated: T, original: T) {
            treeStateObserver.onUpdateNode(updated, original);
            return ts.updateNode(updated, original); // tslint:disable-line no-unnecessary-qualifier
        }

        function reuseNodeWithTreeState<T extends Node>(node: T) {
            treeStateObserver.onReuseNode(node);
            return node;
        }
    }

    // similar to `ts.noop`, but used to avoid deoptimizations in v8 due to argument length mismatches
    function noop2(_a: unknown, _b: unknown) { } // tslint:disable-line no-empty

    /* @internal */
    export const nullTreeStateObserver: TreeStateObserver = {
        onSetChild: noop2,
        onSetChildren: noop2,
        onFinishNode: noop,
        onUpdateNode: noop2,
        onReuseNode: noop
    };

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
    export function createNodeArray<T extends Node>(elements?: T[], hasTrailingComma?: boolean): MutableNodeArray<T>;
    export function createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
    /**
     * Make `elements` into a `NodeArray<T>`. If `elements` is `undefined`, returns an empty `NodeArray<T>`.
     */
    export function createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T> {
        if (!elements || elements === emptyArray) {
            elements = [];
        }
        else if (isNodeArray(elements)) {
            return elements;
        }

        const array = <NodeArray<T>>elements;
        array.pos = -1;
        array.end = -1;
        array.hasTrailingComma = hasTrailingComma;
        return array;
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

    /* @internal */
    export function updateNode<T extends Node>(updated: T, original: T): T {
        if (updated !== original) {
            setOriginalNode(updated, original);
            setTextRange(updated, original);
            aggregateTransformFlags(updated);
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

    export function isUnprocessedSourceFile(node: SourceFile) {
        return !node.preprocessInfo || node === node.preprocessInfo.unprocessed;
    }

    export function isProcessedSourceFile(node: SourceFile) {
        return !!node.preprocessInfo && node !== node.preprocessInfo.unprocessed;
    }

    /**
     * If the source file has been preprocessed due to a plugin, gets the unprocessed
     * source file. Otherwise, returns the source file.
     */
    export function getUnprocessedSourceFile(node: SourceFile) {
        return node.preprocessInfo ? node.preprocessInfo.unprocessed : node;
    }

    /**
     * If the source file has been preprocessed due to a plugin, gets the processed
     * source file. Otherwise, returns the source file.
     */
    export function getProcessedSourceFile(node: SourceFile) {
        return node.preprocessInfo ? node.preprocessInfo.processed : node;
    }

    /**
     * Clears any EmitNode entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    export function disposeEmitNodes(sourceFile: SourceFile | undefined) {
        // During transformation we may need to annotate a parse tree node with transient
        // transformation properties. As parse tree nodes live longer than transformation
        // nodes, we need to make sure we reclaim any memory allocated for custom ranges
        // from these nodes to ensure we do not hold onto entire subtrees just for position
        // information. We also need to reset these nodes to a pre-transformation state
        // for incremental parsing scenarios so that we do not impact later emit.
        sourceFile = getSourceFileOfNode(getParseTreeNode(sourceFile));
        const emitNode = sourceFile && sourceFile.emitNode;
        const annotatedNodes = emitNode && emitNode.annotatedNodes;
        if (annotatedNodes) {
            for (const node of annotatedNodes) {
                node.emitNode = undefined;
            }
        }
    }

    /**
     * Associates a node with the current transformation, initializing
     * various transient transformation properties.
     */
    /* @internal */
    export function getOrCreateEmitNode(node: Node): EmitNode {
        if (!node.emitNode) {
            if (isParseTreeNode(node)) {
                // To avoid holding onto transformation artifacts, we keep track of any
                // parse tree node we are annotating. This allows us to clean them up after
                // all transformations have completed.
                if (node.kind === SyntaxKind.SourceFile) {
                    return node.emitNode = { annotatedNodes: [node] } as EmitNode;
                }

                const sourceFile = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node))) || Debug.fail("Could not determine parsed source file.");
                getOrCreateEmitNode(sourceFile).annotatedNodes!.push(node);
            }

            node.emitNode = {} as EmitNode;
        }

        return node.emitNode;
    }

    /**
     * Sets `EmitFlags.NoComments` on a node and removes any leading and trailing synthetic comments.
     * @internal
     */
    export function removeAllComments<T extends Node>(node: T): T {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.flags |= EmitFlags.NoComments;
        emitNode.leadingComments = undefined;
        emitNode.trailingComments = undefined;
        return node;
    }

    export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
        if (location) {
            range.pos = location.pos;
            range.end = location.end;
        }
        return range;
    }

    /**
     * Sets flags that control emit behavior of a node.
     */
    export function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        getOrCreateEmitNode(node).flags = emitFlags;
        return node;
    }

    /**
     * Sets flags that control emit behavior of a node.
     */
    /* @internal */
    export function addEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.flags = emitNode.flags | emitFlags;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting source maps.
     */
    export function getSourceMapRange(node: Node): SourceMapRange {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.sourceMapRange) || node;
    }

    /**
     * Sets a custom text range to use when emitting source maps.
     */
    export function setSourceMapRange<T extends Node>(node: T, range: SourceMapRange | undefined) {
        getOrCreateEmitNode(node).sourceMapRange = range;
        return node;
    }

    /**
     * Gets the TextRange to use for source maps for a token of a node.
     */
    export function getTokenSourceMapRange(node: Node, token: SyntaxKind): SourceMapRange | undefined {
        const emitNode = node.emitNode;
        const tokenSourceMapRanges = emitNode && emitNode.tokenSourceMapRanges;
        return tokenSourceMapRanges && tokenSourceMapRanges[token];
    }

    /**
     * Sets the TextRange to use for source maps for a token of a node.
     */
    export function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: SourceMapRange | undefined) {
        const emitNode = getOrCreateEmitNode(node);
        const tokenSourceMapRanges = emitNode.tokenSourceMapRanges || (emitNode.tokenSourceMapRanges = []);
        tokenSourceMapRanges[token] = range;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     */
    /*@internal*/
    export function getStartsOnNewLine(node: Node) {
        const emitNode = node.emitNode;
        return emitNode && emitNode.startsOnNewLine;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    /*@internal*/
    export function setStartsOnNewLine<T extends Node>(node: T, newLine: boolean) {
        getOrCreateEmitNode(node).startsOnNewLine = newLine;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     */
    export function getCommentRange(node: Node) {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.commentRange) || node;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    export function setCommentRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).commentRange = range;
        return node;
    }

    export function getSyntheticLeadingComments(node: Node): SynthesizedComment[] | undefined {
        const emitNode = node.emitNode;
        return emitNode && emitNode.leadingComments;
    }

    export function setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined) {
        getOrCreateEmitNode(node).leadingComments = comments;
        return node;
    }

    export function addSyntheticLeadingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean) {
        return setSyntheticLeadingComments(node, append<SynthesizedComment>(getSyntheticLeadingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
    }

    export function getSyntheticTrailingComments(node: Node): SynthesizedComment[] | undefined {
        const emitNode = node.emitNode;
        return emitNode && emitNode.trailingComments;
    }

    export function setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined) {
        getOrCreateEmitNode(node).trailingComments = comments;
        return node;
    }

    export function addSyntheticTrailingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean) {
        return setSyntheticTrailingComments(node, append<SynthesizedComment>(getSyntheticTrailingComments(node), { kind, pos: -1, end: -1, hasTrailingNewLine, text }));
    }

    export function moveSyntheticComments<T extends Node>(node: T, original: Node): T {
        setSyntheticLeadingComments(node, getSyntheticLeadingComments(original));
        setSyntheticTrailingComments(node, getSyntheticTrailingComments(original));
        const emit = getOrCreateEmitNode(original);
        emit.leadingComments = undefined;
        emit.trailingComments = undefined;
        return node;
    }

    /**
     * Gets the constant value to emit for an expression.
     */
    export function getConstantValue(node: PropertyAccessExpression | ElementAccessExpression): string | number | undefined {
        const emitNode = node.emitNode;
        return emitNode && emitNode.constantValue;
    }

    /**
     * Sets the constant value to emit for an expression.
     */
    export function setConstantValue(node: PropertyAccessExpression | ElementAccessExpression, value: string | number) {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.constantValue = value;
        return node;
    }

    /**
     * Adds an EmitHelper to a node.
     */
    export function addEmitHelper<T extends Node>(node: T, helper: EmitHelper): T {
        const emitNode = getOrCreateEmitNode(node);
        emitNode.helpers = append(emitNode.helpers, helper);
        return node;
    }

    /**
     * Add EmitHelpers to a node.
     */
    export function addEmitHelpers<T extends Node>(node: T, helpers: EmitHelper[] | undefined): T {
        if (some(helpers)) {
            const emitNode = getOrCreateEmitNode(node);
            for (const helper of helpers) {
                emitNode.helpers = appendIfUnique(emitNode.helpers, helper);
            }
        }
        return node;
    }

    /**
     * Removes an EmitHelper from a node.
     */
    export function removeEmitHelper(node: Node, helper: EmitHelper): boolean {
        const emitNode = node.emitNode;
        if (emitNode) {
            const helpers = emitNode.helpers;
            if (helpers) {
                return orderedRemoveItem(helpers, helper);
            }
        }
        return false;
    }

    /**
     * Gets the EmitHelpers of a node.
     */
    export function getEmitHelpers(node: Node): EmitHelper[] | undefined {
        const emitNode = node.emitNode;
        return emitNode && emitNode.helpers;
    }

    /**
     * Moves matching emit helpers from a source node to a target node.
     */
    export function moveEmitHelpers(source: Node, target: Node, predicate: (helper: EmitHelper) => boolean) {
        const sourceEmitNode = source.emitNode;
        const sourceEmitHelpers = sourceEmitNode && sourceEmitNode.helpers;
        if (!some(sourceEmitHelpers)) return;

        const targetEmitNode = getOrCreateEmitNode(target);
        let helpersRemoved = 0;
        for (let i = 0; i < sourceEmitHelpers.length; i++) {
            const helper = sourceEmitHelpers[i];
            if (predicate(helper)) {
                helpersRemoved++;
                targetEmitNode.helpers = appendIfUnique(targetEmitNode.helpers, helper);
            }
            else if (helpersRemoved > 0) {
                sourceEmitHelpers[i - helpersRemoved] = helper;
            }
        }

        if (helpersRemoved > 0) {
            sourceEmitHelpers.length -= helpersRemoved;
        }
    }

    /* @internal */
    export function compareEmitHelpers(x: EmitHelper, y: EmitHelper) {
        if (x === y) return Comparison.EqualTo;
        if (x.priority === y.priority) return Comparison.EqualTo;
        if (x.priority === undefined) return Comparison.GreaterThan;
        if (y.priority === undefined) return Comparison.LessThan;
        return compareValues(x.priority, y.priority);
    }

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

/* @internal */
namespace ts {

    export const factory = createNodeFactory(createSynthesizedNode, createParenthesizerRules, createNodeConverters, nullTreeStateObserver);
    export const nodeConverters = factory.getConverters();

    export function createNodeConverters(factory: NodeFactory): NodeConverters {
        return {
            convertToFunctionBlock,
            convertToFunctionExpression,
            convertToArrayAssignmentElement,
            convertToObjectAssignmentElement,
            convertToAssignmentPattern,
            convertToObjectAssignmentPattern,
            convertToArrayAssignmentPattern,
            convertToAssignmentElementTarget,
        };

        function convertToFunctionBlock(node: ConciseBody, multiLine?: boolean): Block {
            if (isBlock(node)) return node;
            const returnStatement = factory.createReturn(node);
            setTextRange(returnStatement, node);
            const body = factory.createBlock([returnStatement], multiLine);
            setTextRange(body, node);
            aggregateTransformFlags(body);
            return body;
        }

        function convertToFunctionExpression(node: FunctionDeclaration) {
            if (!node.body) return Debug.fail(`Cannot convert a FunctionDeclaration without a body`);
            const updated = factory.createFunctionExpression(
                node.modifiers,
                node.asteriskToken,
                node.name,
                node.typeParameters,
                node.parameters,
                node.type,
                node.body
            );
            setOriginalNode(updated, node);
            setTextRange(updated, node);
            if (getStartsOnNewLine(node)) {
                setStartsOnNewLine(updated, /*newLine*/ true);
            }
            aggregateTransformFlags(updated);
            return updated;
        }

        function convertToArrayAssignmentElement(element: ArrayBindingOrAssignmentElement) {
            if (isBindingElement(element)) {
                if (element.dotDotDotToken) {
                    Debug.assertNode(element.name, isIdentifier);
                    return setOriginalNode(setTextRange(factory.createSpread(<Identifier>element.name), element), element);
                }
                const expression = convertToAssignmentElementTarget(element.name);
                return element.initializer
                    ? setOriginalNode(
                        setTextRange(
                            factory.createAssignment(expression, element.initializer),
                            element
                        ),
                        element
                    )
                    : expression;
            }
            return cast(element, isExpression);
        }

        function convertToObjectAssignmentElement(element: ObjectBindingOrAssignmentElement) {
            if (isBindingElement(element)) {
                if (element.dotDotDotToken) {
                    Debug.assertNode(element.name, isIdentifier);
                    return setOriginalNode(setTextRange(factory.createSpreadAssignment(<Identifier>element.name), element), element);
                }
                if (element.propertyName) {
                    const expression = convertToAssignmentElementTarget(element.name);
                    return setOriginalNode(setTextRange(factory.createPropertyAssignment(element.propertyName, element.initializer ? factory.createAssignment(expression, element.initializer) : expression), element), element);
                }
                Debug.assertNode(element.name, isIdentifier);
                return setOriginalNode(setTextRange(factory.createShorthandPropertyAssignment(<Identifier>element.name, element.initializer), element), element);
            }

            return cast(element, isObjectLiteralElementLike);
        }

        function convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern {
            switch (node.kind) {
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ArrayLiteralExpression:
                    return convertToArrayAssignmentPattern(node);

                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.ObjectLiteralExpression:
                    return convertToObjectAssignmentPattern(node);
            }
        }

        function convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern) {
            if (isObjectBindingPattern(node)) {
                return setOriginalNode(
                    setTextRange(
                        factory.createObjectLiteral(map(node.elements, convertToObjectAssignmentElement)),
                        node
                    ),
                    node
                );
            }
            return cast(node, isObjectLiteralExpression);
        }

        function convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern) {
            if (isArrayBindingPattern(node)) {
                return setOriginalNode(
                    setTextRange(
                        factory.createArrayLiteral(map(node.elements, convertToArrayAssignmentElement)),
                        node
                    ),
                    node
                );
            }
            return cast(node, isArrayLiteralExpression);
        }

        function convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression {
            if (isBindingPattern(node)) {
                return convertToAssignmentPattern(node);
            }

            return cast(node, isExpression);
        }
    }

    const nullNodeConverters: NodeConverters = {
        convertToFunctionBlock: notImplemented,
        convertToFunctionExpression: notImplemented,
        convertToArrayAssignmentElement: notImplemented,
        convertToObjectAssignmentElement: notImplemented,
        convertToAssignmentPattern: notImplemented,
        convertToObjectAssignmentPattern: notImplemented,
        convertToArrayAssignmentPattern: notImplemented,
        convertToAssignmentElementTarget: notImplemented,
    };

    export function getNullNodeConverters(_factory: NodeFactory) {
        return nullNodeConverters;
    }

    // Compound nodes

    export function createMemberAccessForPropertyName(factory: NodeFactory, target: Expression, memberName: PropertyName, location?: TextRange): MemberExpression {
        if (isComputedPropertyName(memberName)) {
             return setTextRange(factory.createElementAccess(target, memberName.expression), location);
        }
        else {
            const expression = setTextRange(
                isIdentifier(memberName)
                    ? factory.createPropertyAccess(target, memberName)
                    : factory.createElementAccess(target, memberName),
                memberName
            );
            getOrCreateEmitNode(expression).flags |= EmitFlags.NoNestedSourceMaps;
            return expression;
        }
    }

    function createReactNamespace(reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment) {
        // To ensure the emit resolver can properly resolve the namespace, we need to
        // treat this identifier as if it were a source tree node by clearing the `Synthesized`
        // flag and setting a parent node.
        const react = parseNodeFactory.createIdentifier(reactNamespace || "React");
        // Set the parent that is in parse tree
        // this makes sure that parent chain is intact for checker to traverse complete scope tree
        react.parent = getParseTreeNode(parent)!;
        return react;
    }

    function createJsxFactoryExpressionFromEntityName(factory: NodeFactory, jsxFactory: EntityName, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
        if (isQualifiedName(jsxFactory)) {
            const left = createJsxFactoryExpressionFromEntityName(factory, jsxFactory.left, parent);
            const right = factory.createIdentifier(idText(jsxFactory.right));
            right.escapedText = jsxFactory.right.escapedText;
            return factory.createPropertyAccess(left, right);
        }
        else {
            return createReactNamespace(idText(jsxFactory), parent);
        }
    }

    function createJsxFactoryExpression(factory: NodeFactory, jsxFactoryEntity: EntityName | undefined, reactNamespace: string, parent: JsxOpeningLikeElement | JsxOpeningFragment): Expression {
        return jsxFactoryEntity ?
            createJsxFactoryExpressionFromEntityName(factory, jsxFactoryEntity, parent) :
            factory.createPropertyAccess(
                createReactNamespace(reactNamespace, parent),
                "createElement"
            );
    }

    export function createExpressionForJsxElement(factory: NodeFactory, jsxFactoryEntity: EntityName | undefined, reactNamespace: string, tagName: Expression, props: Expression | undefined, children: readonly Expression[] | undefined, parentElement: JsxOpeningLikeElement, location: TextRange): LeftHandSideExpression {
        const argumentsList = [tagName];
        if (props) {
            argumentsList.push(props);
        }

        if (children && children.length > 0) {
            if (!props) {
                argumentsList.push(factory.createNull());
            }

            if (children.length > 1) {
                for (const child of children) {
                    startOnNewLine(child);
                    argumentsList.push(child);
                }
            }
            else {
                argumentsList.push(children[0]);
            }
        }

        return setTextRange(
            factory.createCall(
                createJsxFactoryExpression(factory, jsxFactoryEntity, reactNamespace, parentElement),
                /*typeArguments*/ undefined,
                argumentsList
            ),
            location
        );
    }

    export function createExpressionForJsxFragment(factory: NodeFactory, jsxFactoryEntity: EntityName | undefined, reactNamespace: string, children: readonly Expression[], parentElement: JsxOpeningFragment, location: TextRange): LeftHandSideExpression {
        const tagName = factory.createPropertyAccess(
            createReactNamespace(reactNamespace, parentElement),
            "Fragment"
        );

        const argumentsList = [<Expression>tagName];
        argumentsList.push(factory.createNull());

        if (children && children.length > 0) {
            if (children.length > 1) {
                for (const child of children) {
                    startOnNewLine(child);
                    argumentsList.push(child);
                }
            }
            else {
                argumentsList.push(children[0]);
            }
        }

        return setTextRange(
            factory.createCall(
                createJsxFactoryExpression(factory, jsxFactoryEntity, reactNamespace, parentElement),
                /*typeArguments*/ undefined,
                argumentsList
            ),
            location
        );
    }

    // Utilities

    export function createForOfBindingStatement(factory: NodeFactory, node: ForInitializer, boundValue: Expression): Statement {
        if (isVariableDeclarationList(node)) {
            const firstDeclaration = first(node.declarations);
            const updatedDeclaration = factory.updateVariableDeclaration(
                firstDeclaration,
                firstDeclaration.name,
                /*typeNode*/ undefined,
                boundValue
            );
            return setTextRange(
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.updateVariableDeclarationList(node, [updatedDeclaration])
                ),
                /*location*/ node
            );
        }
        else {
            const updatedExpression = setTextRange(factory.createAssignment(node, boundValue), /*location*/ node);
            return setTextRange(factory.createExpressionStatement(updatedExpression), /*location*/ node);
        }
    }

    export function insertLeadingStatement(factory: NodeFactory, dest: Statement, source: Statement) {
        if (isBlock(dest)) {
            return factory.updateBlock(dest, setTextRange(factory.createNodeArray([source, ...dest.statements]), dest.statements));
        }
        else {
            return factory.createBlock(factory.createNodeArray([dest, source]), /*multiLine*/ true);
        }
    }

    export function createExpressionFromEntityName(factory: NodeFactory, node: EntityName | Expression): Expression {
        if (isQualifiedName(node)) {
            const left = createExpressionFromEntityName(factory, node.left);
            const right = getMutableClone(node.right);
            return setTextRange(factory.createPropertyAccess(left, right), node);
        }
        else {
            return getMutableClone(node);
        }
    }

    export function createExpressionForPropertyName(factory: NodeFactory, memberName: PropertyName): Expression {
        if (isIdentifier(memberName)) {
            return factory.createStringLiteralFromNode(memberName);
        }
        else if (isComputedPropertyName(memberName)) {
            return getMutableClone(memberName.expression);
        }
        else {
            return getMutableClone(memberName);
        }
    }

    function createExpressionForAccessorDeclaration(factory: NodeFactory, properties: NodeArray<Declaration>, property: AccessorDeclaration, receiver: Expression, multiLine: boolean) {
        const { firstAccessor, getAccessor, setAccessor } = getAllAccessorDeclarations(properties, property);
        if (property === firstAccessor) {
            return aggregateTransformFlags(
                setTextRange(
                    factory.createObjectDefinePropertyCall(
                        receiver,
                        createExpressionForPropertyName(factory, property.name),
                        factory.createPropertyDescriptor({
                            enumerable: true,
                            configurable: true,
                            get: getAccessor && setTextRange(
                                setOriginalNode(
                                    factory.createFunctionExpression(
                                        getAccessor.modifiers,
                                        /*asteriskToken*/ undefined,
                                        /*name*/ undefined,
                                        /*typeParameters*/ undefined,
                                        getAccessor.parameters,
                                        /*type*/ undefined,
                                        getAccessor.body! // TODO: GH#18217
                                    ),
                                    getAccessor
                                ),
                                getAccessor
                            ),
                            set: setAccessor && setTextRange(
                                setOriginalNode(
                                    factory.createFunctionExpression(
                                        setAccessor.modifiers,
                                        /*asteriskToken*/ undefined,
                                        /*name*/ undefined,
                                        /*typeParameters*/ undefined,
                                        setAccessor.parameters,
                                        /*type*/ undefined,
                                        setAccessor.body! // TODO: GH#18217
                                    ),
                                    setAccessor
                                ),
                                setAccessor
                            )
                        }, !multiLine)
                    ),
                    firstAccessor
                )
            );
        }

        return undefined;
    }

    function createExpressionForPropertyAssignment(factory: NodeFactory, property: PropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    factory.createAssignment(
                        createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                        property.initializer
                    ),
                    property
                ),
                property
            )
        );
    }

    function createExpressionForShorthandPropertyAssignment(factory: NodeFactory, property: ShorthandPropertyAssignment, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    factory.createAssignment(
                        createMemberAccessForPropertyName(factory, receiver, property.name, /*location*/ property.name),
                        getSynthesizedClone(property.name)
                    ),
                    /*location*/ property
                ),
                /*original*/ property
            )
        );
    }

    function createExpressionForMethodDeclaration(factory: NodeFactory, method: MethodDeclaration, receiver: Expression) {
        return aggregateTransformFlags(
            setOriginalNode(
                setTextRange(
                    factory.createAssignment(
                        createMemberAccessForPropertyName(factory, receiver, method.name, /*location*/ method.name),
                        setOriginalNode(
                            setTextRange(
                                factory.createFunctionExpression(
                                    method.modifiers,
                                    method.asteriskToken,
                                    /*name*/ undefined,
                                    /*typeParameters*/ undefined,
                                    method.parameters,
                                    /*type*/ undefined,
                                    method.body! // TODO: GH#18217
                                ),
                                /*location*/ method
                            ),
                            /*original*/ method
                        )
                    ),
                    /*location*/ method
                ),
                /*original*/ method
            )
        );
    }

    export function createExpressionForObjectLiteralElementLike(factory: NodeFactory, node: ObjectLiteralExpression, property: ObjectLiteralElementLike, receiver: Expression): Expression | undefined {
        switch (property.kind) {
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
                return createExpressionForAccessorDeclaration(factory, node.properties, property, receiver, !!node.multiLine);
            case SyntaxKind.PropertyAssignment:
                return createExpressionForPropertyAssignment(factory, property, receiver);
            case SyntaxKind.ShorthandPropertyAssignment:
                return createExpressionForShorthandPropertyAssignment(factory, property, receiver);
            case SyntaxKind.MethodDeclaration:
                return createExpressionForMethodDeclaration(factory, property, receiver);
        }
    }

    /**
     * Gets whether an identifier should only be referred to by its internal name.
     */
    export function isInternalName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.InternalName) !== 0;
    }

    /**
     * Gets whether an identifier should only be referred to by its local name.
     */
    export function isLocalName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.LocalName) !== 0;
    }

    /**
     * Gets whether an identifier should only be referred to by its export representation if the
     * name points to an exported symbol.
     */
    export function isExportName(node: Identifier) {
        return (getEmitFlags(node) & EmitFlags.ExportName) !== 0;
    }

    function isUseStrictPrologue(node: ExpressionStatement): boolean {
        return isStringLiteral(node.expression) && node.expression.text === "use strict";
    }

    export function findUseStrictPrologue(statements: readonly Statement[]): Statement | undefined {
        for (const statement of statements) {
            if (isPrologueDirective(statement)) {
                if (isUseStrictPrologue(statement)) {
                    return statement;
                }
            }
            else {
                break;
            }
        }
        return undefined;
    }

    export function startsWithUseStrict(statements: readonly Statement[]) {
        const firstStatement = firstOrUndefined(statements);
        return firstStatement !== undefined
            && isPrologueDirective(firstStatement)
            && isUseStrictPrologue(firstStatement);
    }

    export function isCommaSequence(node: Expression): node is BinaryExpression & {operatorToken: Token<SyntaxKind.CommaToken>} | CommaListExpression {
        return node.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node).operatorToken.kind === SyntaxKind.CommaToken ||
            node.kind === SyntaxKind.CommaListExpression;
    }

    export type OuterExpression = ParenthesizedExpression | TypeAssertion | AsExpression | NonNullExpression | PartiallyEmittedExpression;

    export function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
        switch (node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return (kinds & OuterExpressionKinds.Parentheses) !== 0;
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.NonNullExpression:
                return (kinds & OuterExpressionKinds.Assertions) !== 0;
            case SyntaxKind.PartiallyEmittedExpression:
                return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
        }
        return false;
    }

    export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
    export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
    export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
        let previousNode: Node;
        do {
            previousNode = node;
            if (kinds & OuterExpressionKinds.Parentheses) {
                node = skipParentheses(node);
            }

            if (kinds & OuterExpressionKinds.Assertions) {
                node = skipAssertions(node);
            }

            if (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) {
                node = skipPartiallyEmittedExpressions(node);
            }
        }
        while (previousNode !== node);

        return node;
    }

    export function skipAssertions(node: Expression): Expression;
    export function skipAssertions(node: Node): Node;
    export function skipAssertions(node: Node): Node {
        while (isAssertionExpression(node) || node.kind === SyntaxKind.NonNullExpression) {
            node = (<AssertionExpression | NonNullExpression>node).expression;
        }

        return node;
    }

    export function startOnNewLine<T extends Node>(node: T): T {
        return setStartsOnNewLine(node, /*newLine*/ true);
    }

    export function getExternalHelpersModuleName(node: SourceFile) {
        const parseNode = getOriginalNode(node, isSourceFile);
        const emitNode = parseNode && parseNode.emitNode;
        return emitNode && emitNode.externalHelpersModuleName;
    }

    export function hasRecordedExternalHelpers(sourceFile: SourceFile) {
        const parseNode = getOriginalNode(sourceFile, isSourceFile);
        const emitNode = parseNode && parseNode.emitNode;
        return !!emitNode && (!!emitNode.externalHelpersModuleName || !!emitNode.externalHelpers);
    }

    export function createExternalHelpersImportDeclarationIfNeeded(nodeFactory: NodeFactory, helperFactory: EmitHelperFactory, sourceFile: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStar?: boolean, hasImportDefault?: boolean) {
        if (compilerOptions.importHelpers && isEffectiveExternalModule(sourceFile, compilerOptions)) {
            let namedBindings: NamedImportBindings | undefined;
            const moduleKind = getEmitModuleKind(compilerOptions);
            if (moduleKind >= ModuleKind.ES2015 && moduleKind <= ModuleKind.ESNext) {
                // use named imports
                const helpers = getEmitHelpers(sourceFile);
                if (helpers) {
                    const helperNames: string[] = [];
                    for (const helper of helpers) {
                        if (!helper.scoped) {
                            const importName = (helper as UnscopedEmitHelper).importName;
                            if (importName) {
                                pushIfUnique(helperNames, importName);
                            }
                        }
                    }
                    if (some(helperNames)) {
                        helperNames.sort(compareStringsCaseSensitive);
                        // Alias the imports if the names are used somewhere in the file.
                        // NOTE: We don't need to care about global import collisions as this is a module.
                        namedBindings = nodeFactory.createNamedImports(
                            map(helperNames, name => isFileLevelUniqueName(sourceFile, name)
                                ? nodeFactory.createImportSpecifier(/*propertyName*/ undefined, nodeFactory.createIdentifier(name))
                                : nodeFactory.createImportSpecifier(nodeFactory.createIdentifier(name), helperFactory.getUnscopedHelperName(name))
                            )
                        );
                        const parseNode = getOriginalNode(sourceFile, isSourceFile);
                        const emitNode = getOrCreateEmitNode(parseNode);
                        emitNode.externalHelpers = true;
                    }
                }
            }
            else {
                // use a namespace import
                const externalHelpersModuleName = getOrCreateExternalHelpersModuleNameIfNeeded(nodeFactory, sourceFile, compilerOptions, hasExportStarsToExportValues, hasImportStar || hasImportDefault);
                if (externalHelpersModuleName) {
                    namedBindings = nodeFactory.createNamespaceImport(externalHelpersModuleName);
                }
            }
            if (namedBindings) {
                const externalHelpersImportDeclaration = nodeFactory.createImportDeclaration(
                    /*decorators*/ undefined,
                    /*modifiers*/ undefined,
                    nodeFactory.createImportClause(/*name*/ undefined, namedBindings),
                    nodeFactory.createStringLiteral(externalHelpersModuleNameText)
                );
                addEmitFlags(externalHelpersImportDeclaration, EmitFlags.NeverApplyImportHelper);
                return externalHelpersImportDeclaration;
            }
        }
    }

    export function getOrCreateExternalHelpersModuleNameIfNeeded(factory: NodeFactory, node: SourceFile, compilerOptions: CompilerOptions, hasExportStarsToExportValues?: boolean, hasImportStarOrImportDefault?: boolean) {
        if (compilerOptions.importHelpers && isEffectiveExternalModule(node, compilerOptions)) {
            const externalHelpersModuleName = getExternalHelpersModuleName(node);
            if (externalHelpersModuleName) {
                return externalHelpersModuleName;
            }

            const moduleKind = getEmitModuleKind(compilerOptions);
            let create = (hasExportStarsToExportValues || (compilerOptions.esModuleInterop && hasImportStarOrImportDefault))
                && moduleKind !== ModuleKind.System
                && moduleKind !== ModuleKind.ES2015
                && moduleKind !== ModuleKind.ESNext;
            if (!create) {
                const helpers = getEmitHelpers(node);
                if (helpers) {
                    for (const helper of helpers) {
                        if (!helper.scoped) {
                            create = true;
                            break;
                        }
                    }
                }
            }

            if (create) {
                const parseNode = getOriginalNode(node, isSourceFile);
                const emitNode = getOrCreateEmitNode(parseNode);
                return emitNode.externalHelpersModuleName || (emitNode.externalHelpersModuleName = factory.createUniqueName(externalHelpersModuleNameText));
            }
        }
    }

    /**
     * Get the name of that target module from an import or export declaration
     */
    export function getLocalNameForExternalImport(factory: NodeFactory, node: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile): Identifier | undefined {
        const namespaceDeclaration = getNamespaceDeclarationNode(node);
        if (namespaceDeclaration && !isDefaultImport(node)) {
            const name = namespaceDeclaration.name;
            return isGeneratedIdentifier(name) ? name : factory.createIdentifier(getSourceTextOfNodeFromSourceFile(sourceFile, name) || idText(name));
        }
        if (node.kind === SyntaxKind.ImportDeclaration && node.importClause) {
            return factory.getGeneratedNameForNode(node);
        }
        if (node.kind === SyntaxKind.ExportDeclaration && node.moduleSpecifier) {
            return factory.getGeneratedNameForNode(node);
        }
        return undefined;
    }

    /**
     * Get the name of a target module from an import/export declaration as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     *  3- The containing SourceFile has an entry in renamedDependencies for the import as requested by some module loaders (e.g. System).
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function getExternalModuleNameLiteral(factory: NodeFactory, importNode: ImportDeclaration | ExportDeclaration | ImportEqualsDeclaration, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        const moduleName = getExternalModuleName(importNode)!; // TODO: GH#18217
        if (moduleName.kind === SyntaxKind.StringLiteral) {
            return tryGetModuleNameFromDeclaration(importNode, host, factory, resolver, compilerOptions)
                || tryRenameExternalModule(factory, <StringLiteral>moduleName, sourceFile)
                || getSynthesizedClone(<StringLiteral>moduleName);
        }

        return undefined;
    }

    /**
     * Some bundlers (SystemJS builder) sometimes want to rename dependencies.
     * Here we check if alternative name was provided for a given moduleName and return it if possible.
     */
    function tryRenameExternalModule(factory: NodeFactory, moduleName: LiteralExpression, sourceFile: SourceFile) {
        const rename = sourceFile.renamedDependencies && sourceFile.renamedDependencies.get(moduleName.text);
        return rename && factory.createStringLiteral(rename);
    }

    /**
     * Get the name of a module as should be written in the emitted output.
     * The emitted output name can be different from the input if:
     *  1. The module has a /// <amd-module name="<new name>" />
     *  2. --out or --outFile is used, making the name relative to the rootDir
     * Otherwise, a new StringLiteral node representing the module name will be returned.
     */
    export function tryGetModuleNameFromFile(factory: NodeFactory, file: SourceFile | undefined, host: EmitHost, options: CompilerOptions): StringLiteral | undefined {
        if (!file) {
            return undefined;
        }
        if (file.moduleName) {
            return factory.createStringLiteral(file.moduleName);
        }
        if (!file.isDeclarationFile && (options.out || options.outFile)) {
            return factory.createStringLiteral(getExternalModuleNameFromPath(host, file.fileName));
        }
        return undefined;
    }

    function tryGetModuleNameFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration, host: EmitHost, factory: NodeFactory, resolver: EmitResolver, compilerOptions: CompilerOptions) {
        return tryGetModuleNameFromFile(factory, resolver.getExternalModuleFileFromDeclaration(declaration), host, compilerOptions);
    }

    /**
     * Gets the initializer of an BindingOrAssignmentElement.
     */
    export function getInitializerOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): Expression | undefined {
        if (isDeclarationBindingElement(bindingElement)) {
            // `1` in `let { a = 1 } = ...`
            // `1` in `let { a: b = 1 } = ...`
            // `1` in `let { a: {b} = 1 } = ...`
            // `1` in `let { a: [b] = 1 } = ...`
            // `1` in `let [a = 1] = ...`
            // `1` in `let [{a} = 1] = ...`
            // `1` in `let [[a] = 1] = ...`
            return bindingElement.initializer;
        }

        if (isPropertyAssignment(bindingElement)) {
            // `1` in `({ a: b = 1 } = ...)`
            // `1` in `({ a: {b} = 1 } = ...)`
            // `1` in `({ a: [b] = 1 } = ...)`
            const initializer = bindingElement.initializer;
            return isAssignmentExpression(initializer, /*excludeCompoundAssignment*/ true)
                ? initializer.right
                : undefined;
        }

        if (isShorthandPropertyAssignment(bindingElement)) {
            // `1` in `({ a = 1 } = ...)`
            return bindingElement.objectAssignmentInitializer;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `1` in `[a = 1] = ...`
            // `1` in `[{a} = 1] = ...`
            // `1` in `[[a] = 1] = ...`
            return bindingElement.right;
        }

        if (isSpreadElement(bindingElement)) {
            // Recovery consistent with existing emit.
            return getInitializerOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
        }
    }

    /**
     * Gets the name of an BindingOrAssignmentElement.
     */
    export function getTargetOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementTarget | undefined {
        if (isDeclarationBindingElement(bindingElement)) {
            // `a` in `let { a } = ...`
            // `a` in `let { a = 1 } = ...`
            // `b` in `let { a: b } = ...`
            // `b` in `let { a: b = 1 } = ...`
            // `a` in `let { ...a } = ...`
            // `{b}` in `let { a: {b} } = ...`
            // `{b}` in `let { a: {b} = 1 } = ...`
            // `[b]` in `let { a: [b] } = ...`
            // `[b]` in `let { a: [b] = 1 } = ...`
            // `a` in `let [a] = ...`
            // `a` in `let [a = 1] = ...`
            // `a` in `let [...a] = ...`
            // `{a}` in `let [{a}] = ...`
            // `{a}` in `let [{a} = 1] = ...`
            // `[a]` in `let [[a]] = ...`
            // `[a]` in `let [[a] = 1] = ...`
            return bindingElement.name;
        }

        if (isObjectLiteralElementLike(bindingElement)) {
            switch (bindingElement.kind) {
                case SyntaxKind.PropertyAssignment:
                    // `b` in `({ a: b } = ...)`
                    // `b` in `({ a: b = 1 } = ...)`
                    // `{b}` in `({ a: {b} } = ...)`
                    // `{b}` in `({ a: {b} = 1 } = ...)`
                    // `[b]` in `({ a: [b] } = ...)`
                    // `[b]` in `({ a: [b] = 1 } = ...)`
                    // `b.c` in `({ a: b.c } = ...)`
                    // `b.c` in `({ a: b.c = 1 } = ...)`
                    // `b[0]` in `({ a: b[0] } = ...)`
                    // `b[0]` in `({ a: b[0] = 1 } = ...)`
                    return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.initializer);

                case SyntaxKind.ShorthandPropertyAssignment:
                    // `a` in `({ a } = ...)`
                    // `a` in `({ a = 1 } = ...)`
                    return bindingElement.name;

                case SyntaxKind.SpreadAssignment:
                    // `a` in `({ ...a } = ...)`
                    return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
            }

            // no target
            return undefined;
        }

        if (isAssignmentExpression(bindingElement, /*excludeCompoundAssignment*/ true)) {
            // `a` in `[a = 1] = ...`
            // `{a}` in `[{a} = 1] = ...`
            // `[a]` in `[[a] = 1] = ...`
            // `a.b` in `[a.b = 1] = ...`
            // `a[0]` in `[a[0] = 1] = ...`
            return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.left);
        }

        if (isSpreadElement(bindingElement)) {
            // `a` in `[...a] = ...`
            return getTargetOfBindingOrAssignmentElement(<BindingOrAssignmentElement>bindingElement.expression);
        }

        // `a` in `[a] = ...`
        // `{a}` in `[{a}] = ...`
        // `[a]` in `[[a]] = ...`
        // `a.b` in `[a.b] = ...`
        // `a[0]` in `[a[0]] = ...`
        return bindingElement;
    }

    /**
     * Determines whether an BindingOrAssignmentElement is a rest element.
     */
    export function getRestIndicatorOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): BindingOrAssignmentElementRestIndicator | undefined {
        switch (bindingElement.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
                // `...` in `let [...a] = ...`
                return bindingElement.dotDotDotToken;

            case SyntaxKind.SpreadElement:
            case SyntaxKind.SpreadAssignment:
                // `...` in `[...a] = ...`
                return bindingElement;
        }

        return undefined;
    }

    /**
     * Gets the property name of a BindingOrAssignmentElement
     */
    export function getPropertyNameOfBindingOrAssignmentElement(bindingElement: BindingOrAssignmentElement): PropertyName | undefined {
        switch (bindingElement.kind) {
            case SyntaxKind.BindingElement:
                // `a` in `let { a: b } = ...`
                // `[a]` in `let { [a]: b } = ...`
                // `"a"` in `let { "a": b } = ...`
                // `1` in `let { 1: b } = ...`
                if (bindingElement.propertyName) {
                    const propertyName = bindingElement.propertyName;
                    return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                        ? propertyName.expression
                        : propertyName;
                }

                break;

            case SyntaxKind.PropertyAssignment:
                // `a` in `({ a: b } = ...)`
                // `[a]` in `({ [a]: b } = ...)`
                // `"a"` in `({ "a": b } = ...)`
                // `1` in `({ 1: b } = ...)`
                if (bindingElement.name) {
                    const propertyName = bindingElement.name;
                    return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression)
                        ? propertyName.expression
                        : propertyName;
                }

                break;

            case SyntaxKind.SpreadAssignment:
                // `a` in `({ ...a } = ...)`
                return bindingElement.name;
        }

        const target = getTargetOfBindingOrAssignmentElement(bindingElement);
        if (target && isPropertyName(target)) {
            return isComputedPropertyName(target) && isStringOrNumericLiteral(target.expression)
                ? target.expression
                : target;
        }

        Debug.fail("Invalid property name for binding element.");
    }

    function isStringOrNumericLiteral(node: Node): node is StringLiteral | NumericLiteral {
        const kind = node.kind;
        return kind === SyntaxKind.StringLiteral
            || kind === SyntaxKind.NumericLiteral;
    }

    /**
     * Gets the elements of a BindingOrAssignmentPattern
     */
    export function getElementsOfBindingOrAssignmentPattern(name: BindingOrAssignmentPattern): readonly BindingOrAssignmentElement[] {
        switch (name.kind) {
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
            case SyntaxKind.ArrayLiteralExpression:
                // `a` in `{a}`
                // `a` in `[a]`
                return <readonly BindingOrAssignmentElement[]>name.elements;

            case SyntaxKind.ObjectLiteralExpression:
                // `a` in `{a}`
                return <readonly BindingOrAssignmentElement[]>name.properties;
        }
    }
}
