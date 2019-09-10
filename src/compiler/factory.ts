namespace ts {
    let nextAutoGenerateId = 0;

    /* @internal */
    export function createNodeFactory(
        createNode: (kind: SyntaxKind) => Node,
        createParenthesizerRules: (factory: NodeFactory) => ParenthesizerRules,
        createNodeConverters: (factory: NodeFactory) => NodeConverters
    ): NodeFactory {
        let actualCreatePropertyAccess = createPropertyAccessUnspecific;
        const parenthesizer = memoize(() => createParenthesizerRules(factory));
        const getConverters = memoize(() => createNodeConverters(factory));

        const factory: NodeFactory = {
            getParenthesizerRules: parenthesizer,
            getConverters,
            createNode,
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
            createUnionOrIntersectionTypeNode,
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
            createArrayLiteral,
            updateArrayLiteral,
            createObjectLiteral,
            updateObjectLiteral,
            createPropertyAccess: (expression, name) => actualCreatePropertyAccess(expression, name),
            updatePropertyAccess,
            createElementAccess,
            updateElementAccess,
            createCall,
            updateCall,
            createNew,
            updateNew,
            createTaggedTemplate,
            updateTaggedTemplate,
            createTypeAssertion,
            updateTypeAssertion,
            createParen,
            updateParen,
            createFunctionExpression,
            updateFunctionExpression,
            createArrowFunction,
            updateArrowFunction,
            createDelete,
            updateDelete,
            createTypeOf,
            updateTypeOf,
            createVoid,
            updateVoid,
            createAwait,
            updateAwait,
            createPrefix,
            updatePrefix,
            createPostfix,
            updatePostfix,
            createBinary,
            updateBinary,
            createConditional,
            updateConditional,
            createTemplateExpression,
            updateTemplateExpression,
            createTemplateHead,
            createTemplateMiddle,
            createTemplateTail,
            createNoSubstitutionTemplateLiteral,
            createTemplateLiteralLikeNode,
            createYield,
            updateYield,
            createSpread,
            updateSpread,
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
            createIf,
            updateIf,
            createDo,
            updateDo,
            createWhile,
            updateWhile,
            createFor,
            updateFor,
            createForIn,
            updateForIn,
            createForOf,
            updateForOf,
            createContinue,
            updateContinue,
            createBreak,
            updateBreak,
            createReturn,
            updateReturn,
            createWith,
            updateWith,
            createSwitch,
            updateSwitch,
            createLabel,
            updateLabel,
            createThrow,
            updateThrow,
            createTry,
            updateTry,
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
            createCommaList,
            updateCommaList,
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

        function createBaseDeclaration<T extends Declaration | VariableStatement | ImportDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined
        ): T {
            const node = createNode(kind) as T;
            node.decorators = asNodeArray(decorators);
            node.modifiers = asNodeArray(modifiers);
            return node;
        }

        function createBaseNamedDeclaration<T extends NamedDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined
        ): T {
            const node = createBaseDeclaration(kind, decorators, modifiers);
            node.name = asName(name);
            return node;
        }

        function createBaseSignatureLikeDeclaration<T extends FunctionLike>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): T {
            const node = createBaseNamedDeclaration(kind, decorators, modifiers, name);
            node.typeParameters = asNodeArray(typeParameters);
            node.parameters = createNodeArray(parameters);
            node.type = type;
            return node;
        }

        function createBaseSignatureDeclaration<T extends SignatureDeclaration>(
            kind: T["kind"],
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): T {
            return createBaseSignatureLikeDeclaration(kind, /*decorators*/ undefined, /*modifiers*/ undefined, /*name*/ undefined, typeParameters, parameters, type);
        }

        function createBaseFunctionLikeDeclaration<T extends FunctionLikeDeclaration>(
            kind: T["kind"],
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: DeclarationName | string | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: T["body"]
        ): T {
            const node = createBaseSignatureLikeDeclaration(kind, decorators, modifiers, name, typeParameters, parameters, type);
            node.body = body;
            return node;
        }

        //
        // Literals
        //

        function createBaseLiteral<T extends LiteralToken>(
            kind: T["kind"],
            text: string
        ) {
            const node = createNode(kind) as T;
            node.text = text;
            node.hasExtendedUnicodeEscape = undefined;
            node.isUnterminated = undefined;
            return node;
        }

        function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): NumericLiteral {
            const node = createBaseLiteral<NumericLiteral>(SyntaxKind.NumericLiteral, typeof value === "number" ? value + "" : value);
            node.numericLiteralFlags = numericLiteralFlags;
            return node;
        }

        function createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral {
            return createBaseLiteral<BigIntLiteral>(SyntaxKind.BigIntLiteral, typeof value === "string" ? value : pseudoBigIntToString(value) + "n");
        }

        function createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral {
            const node = createBaseLiteral<StringLiteral>(SyntaxKind.StringLiteral, text);
            node.singleQuote = isSingleQuote;
            return node;
        }

        function createStringLiteralFromNode(sourceNode: PropertyNameLiteral): StringLiteral {
            const node = createStringLiteral(getTextOfIdentifierOrLiteral(sourceNode));
            node.textSourceNode = sourceNode;
            return node;
        }

        function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
            return createBaseLiteral<RegularExpressionLiteral>(SyntaxKind.RegularExpressionLiteral, text);
        }

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

        function createIdentifier(text: string, typeArguments?: readonly (TypeNode | TypeParameterDeclaration)[], originalKeywordKind?: SyntaxKind): Identifier {
            if (originalKeywordKind === undefined && text) {
                originalKeywordKind = stringToToken(text);
            }
            if (originalKeywordKind === SyntaxKind.Identifier) {
                originalKeywordKind = undefined;
            }
            const node = createNode(SyntaxKind.Identifier) as Identifier;
            node.originalKeywordKind = originalKeywordKind;
            node.escapedText = escapeLeadingUnderscores(text);
            node.typeArguments = asNodeArray(typeArguments);
            node.autoGenerateFlags = undefined;
            node.autoGenerateId = undefined;
            return node;
        }

        function updateIdentifier(node: Identifier, typeArguments?: NodeArray<TypeNode | TypeParameterDeclaration> | undefined): Identifier {
            return node.typeArguments !== typeArguments
                ? updateNode(createIdentifier(idText(node), typeArguments), node)
                : node;
        }

        function createGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags) {
            const name = createIdentifier(text) as GeneratedIdentifier;
            name.autoGenerateFlags = autoGenerateFlags;
            name.autoGenerateId = nextAutoGenerateId;
            nextAutoGenerateId++;
            return name;
        }

        function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): GeneratedIdentifier {
            let flags = GeneratedIdentifierFlags.Auto;
            if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
            const name = createGeneratedIdentifier("", flags);
            if (recordTempVariable) {
                recordTempVariable(name);
            }
            return name;
        }

        /** Create a unique temporary variable for use in a loop. */
        function createLoopVariable(): Identifier {
            return createGeneratedIdentifier("", GeneratedIdentifierFlags.Loop);
        }

        /** Create a unique name based on the supplied text. */
        function createUniqueName(text: string): Identifier {
            return createGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique);
        }

        function createOptimisticUniqueName(text: string): Identifier {
            return createGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic);
        }

        /** Create a unique name based on the supplied text. This does not consider names injected by the transformer. */
        function createFileLevelUniqueName(text: string): Identifier {
            return createGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel);
        }

        /** Create a unique name generated for a node. */
        function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0): Identifier {
            const name = createGeneratedIdentifier(node && isIdentifier(node) ? idText(node) : "", GeneratedIdentifierFlags.Node | flags);
            name.original = node;
            return name;
        }

        //
        // Punctuation
        //

        function createToken<TKind extends SyntaxKind>(token: TKind) {
            return createNode(token) as Token<TKind>;
        }

        function createQuestionToken() {
            return createToken(SyntaxKind.QuestionToken);
        }

        function createColonToken() {
            return createToken(SyntaxKind.ColonToken);
        }

        //
        // Reserved words
        //

        function createSuper() {
            return createToken(SyntaxKind.SuperKeyword) as SuperExpression;
        }

        function createThis() {
            return createToken(SyntaxKind.ThisKeyword) as ThisExpression;
        }

        function createNull() {
            return createToken(SyntaxKind.NullKeyword) as NullLiteral;
        }

        function createTrue() {
            return createToken(SyntaxKind.TrueKeyword) as TrueLiteral;
        }

        function createFalse() {
            return createToken(SyntaxKind.FalseKeyword) as FalseLiteral;
        }

        //
        // Modifiers
        //

        function createModifier<T extends Modifier["kind"]>(kind: T): Token<T> {
            return createToken(kind);
        }

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

        function createQualifiedName(left: EntityName, right: string | Identifier) {
            const node = createNode(SyntaxKind.QualifiedName) as QualifiedName;
            node.left = left;
            node.right = asName(right);
            return node;
        }

        function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier) {
            return node.left !== left
                || node.right !== right
                ? updateNode(createQualifiedName(left, right), node)
                : node;
        }

        function createComputedPropertyName(expression: Expression) {
            const node = createNode(SyntaxKind.ComputedPropertyName) as ComputedPropertyName;
            node.expression = parenthesizer().parenthesizeExpressionOfComputedPropertyName(expression);
            return node;
        }

        function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createComputedPropertyName(expression), node)
                : node;
        }

        //
        // Signature elements
        //

        function createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode) {
            const node = createBaseNamedDeclaration<TypeParameterDeclaration>(
                SyntaxKind.TypeParameter,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name
            );
            node.constraint = constraint;
            node.default = defaultType;
            return node;
        }

        function updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined) {
            return node.name !== name
                || node.constraint !== constraint
                || node.default !== defaultType
                ? updateNode(createTypeParameterDeclaration(name, constraint, defaultType), node)
                : node;
        }

        function createParameterDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            dotDotDotToken: DotDotDotToken | undefined,
            name: string | BindingName,
            questionToken?: QuestionToken,
            type?: TypeNode,
            initializer?: Expression
        ) {
            const node = createBaseNamedDeclaration<ParameterDeclaration>(
                SyntaxKind.Parameter,
                decorators,
                modifiers,
                name
            );
            node.type = type;
            node.initializer = initializer && parenthesizer().parenthesizeExpressionForDisallowedComma(initializer);
            node.dotDotDotToken = dotDotDotToken;
            node.questionToken = questionToken;
            return node;
        }

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
                : node;
        }

        function createDecorator(expression: Expression) {
            const node = createNode(SyntaxKind.Decorator) as Decorator;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            return node;
        }

        function updateDecorator(node: Decorator, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createDecorator(expression), node)
                : node;
        }

        //
        // Type Elements
        //

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
            node.type = type;
            node.questionToken = questionToken;
            return node;
        }

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
                : node;
        }

        function createPropertyDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
            type: TypeNode | undefined,
            initializer: Expression | undefined
        ) {
            const node = createBaseNamedDeclaration<PropertyDeclaration>(
                SyntaxKind.PropertyDeclaration,
                decorators,
                modifiers,
                name
            );
            node.type = type;
            node.initializer = initializer;
            node.questionToken = questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.QuestionToken ? questionOrExclamationToken : undefined;
            node.exclamationToken = questionOrExclamationToken !== undefined && questionOrExclamationToken.kind === SyntaxKind.ExclamationToken ? questionOrExclamationToken : undefined;
            return node;
        }

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
                : node;
        }

        function createMethodSignature(
            modifiers: readonly Modifier[] | undefined,
            name: string | PropertyName,
            questionToken: QuestionToken | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ) {
            const node = createBaseSignatureLikeDeclaration<MethodSignature>(
                SyntaxKind.MethodSignature,
                /*decorators*/ undefined,
                modifiers,
                name,
                typeParameters,
                parameters,
                type
            );
            node.questionToken = questionToken;
            return node;
        }

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
                ? updateNode(createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type), node)
                : node;
        }

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
            node.asteriskToken = asteriskToken;
            node.questionToken = questionToken;
            return node;
        }

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
                ? updateNode(createMethodDeclaration(decorators, modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body), node)
                : node;
        }

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
            return node;
        }

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
                ? updateNode(createConstructorDeclaration(decorators, modifiers, parameters, body), node)
                : node;
        }

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
            return node;
        }

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
                ? updateNode(createGetAccessorDeclaration(decorators, modifiers, name, parameters, type, body), node)
                : node;
        }

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
            return node;
        }

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
                ? updateNode(createSetAccessorDeclaration(decorators, modifiers, name, parameters, body), node)
                : node;
        }

        function createCallSignature(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): CallSignatureDeclaration {
            return createBaseSignatureDeclaration(SyntaxKind.CallSignature, typeParameters, parameters, type);
        }

        function updateCallSignature(
            node: CallSignatureDeclaration,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return updateSignatureDeclaration(node, typeParameters, parameters, type);
        }

        function createConstructSignature(
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): ConstructSignatureDeclaration {
            return createBaseSignatureDeclaration(SyntaxKind.ConstructSignature, typeParameters, parameters, type);
        }

        function updateConstructSignature(
            node: ConstructSignatureDeclaration,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ) {
            return updateSignatureDeclaration(node, typeParameters, parameters, type);
        }

        function createSignatureDeclaration<T extends SignatureDeclaration>(
            kind: T["kind"],
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            typeArguments?: readonly TypeNode[] | undefined
        ): T {
            const node = createBaseSignatureDeclaration(kind, typeParameters, parameters, type);
            if (typeArguments) {
                node.typeArguments = createNodeArray(typeArguments);
            }
            return node;
        }

        function updateSignatureDeclaration<T extends SignatureDeclaration>(
            node: T,
            typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
            parameters: NodeArray<ParameterDeclaration>,
            type: TypeNode | undefined
        ): T {
            return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
                ? updateNode(createSignatureDeclaration(node.kind, typeParameters, parameters, type), node)
                : node;
        }

        function createIndexSignature(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined
        ): IndexSignatureDeclaration {
            return createBaseSignatureLikeDeclaration(
                SyntaxKind.IndexSignature,
                decorators,
                modifiers,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                parameters,
                type
            );
        }

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
                ? updateNode(createIndexSignature(decorators, modifiers, parameters, type), node)
                : node;
        }

        //
        // Types
        //

        function createKeywordTypeNode(kind: KeywordTypeNode["kind"]) {
            return createNode(kind) as KeywordTypeNode;
        }

        function createTypePredicateNode(parameterName: Identifier | ThisTypeNode | string, type: TypeNode) {
            const node = createNode(SyntaxKind.TypePredicate) as TypePredicateNode;
            node.parameterName = asName(parameterName);
            node.type = type;
            return node;
        }

        function updateTypePredicateNode(node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) {
            return node.parameterName !== parameterName
                || node.type !== type
                ? updateNode(createTypePredicateNode(parameterName, type), node)
                : node;
        }

        function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
            const node = createNode(SyntaxKind.TypeReference) as TypeReferenceNode;
            node.typeName = asName(typeName);
            node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments));
            return node;
        }

        function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) {
            return node.typeName !== typeName
                || node.typeArguments !== typeArguments
                ? updateNode(createTypeReferenceNode(typeName, typeArguments), node)
                : node;
        }

        function createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): FunctionTypeNode {
            return createSignatureDeclaration(SyntaxKind.FunctionType, typeParameters, parameters, type);
        }

        function updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) {
            return updateSignatureDeclaration(node, typeParameters, parameters, type);
        }

        function createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructorTypeNode {
            return createSignatureDeclaration(SyntaxKind.ConstructorType, typeParameters, parameters, type);
        }

        function updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) {
            return updateSignatureDeclaration(node, typeParameters, parameters, type);
        }

        function createTypeQueryNode(exprName: EntityName) {
            const node = createNode(SyntaxKind.TypeQuery) as TypeQueryNode;
            node.exprName = exprName;
            return node;
        }

        function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName) {
            return node.exprName !== exprName
                ? updateNode(createTypeQueryNode(exprName), node)
                : node;
        }

        function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
            const node = createNode(SyntaxKind.TypeLiteral) as TypeLiteralNode;
            node.members = createNodeArray(members);
            return node;
        }

        function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>) {
            return node.members !== members
                ? updateNode(createTypeLiteralNode(members), node)
                : node;
        }

        function createArrayTypeNode(elementType: TypeNode) {
            const node = createNode(SyntaxKind.ArrayType) as ArrayTypeNode;
            node.elementType = parenthesizer().parenthesizeElementTypeOfArrayType(elementType);
            return node;
        }

        function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
            return node.elementType !== elementType
                ? updateNode(createArrayTypeNode(elementType), node)
                : node;
        }

        function createTupleTypeNode(elementTypes: readonly TypeNode[]) {
            const node = createNode(SyntaxKind.TupleType) as TupleTypeNode;
            node.elementTypes = createNodeArray(elementTypes);
            return node;
        }

        function updateTupleTypeNode(node: TupleTypeNode, elementTypes: readonly TypeNode[]) {
            return node.elementTypes !== elementTypes
                ? updateNode(createTupleTypeNode(elementTypes), node)
                : node;
        }

        function createOptionalTypeNode(type: TypeNode) {
            const node = createNode(SyntaxKind.OptionalType) as OptionalTypeNode;
            node.type = parenthesizer().parenthesizeElementTypeOfArrayType(type);
            return node;
        }

        function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
            return node.type !== type
                ? updateNode(createOptionalTypeNode(type), node)
                : node;
        }

        function createRestTypeNode(type: TypeNode) {
            const node = createNode(SyntaxKind.RestType) as RestTypeNode;
            node.type = type;
            return node;
        }

        function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
            return node.type !== type
                ? updateNode(createRestTypeNode(type), node)
                : node;
        }

        function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
            return <UnionTypeNode>createUnionOrIntersectionTypeNode(SyntaxKind.UnionType, types);
        }

        function updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>) {
            return updateUnionOrIntersectionTypeNode(node, types);
        }

        function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
            return <IntersectionTypeNode>createUnionOrIntersectionTypeNode(SyntaxKind.IntersectionType, types);
        }

        function updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>) {
            return updateUnionOrIntersectionTypeNode(node, types);
        }

        function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: readonly TypeNode[]) {
            const node = createNode(kind) as UnionTypeNode | IntersectionTypeNode;
            node.types = parenthesizer().parenthesizeConstituentTypesOfUnionOrIntersectionType(createNodeArray(types));
            return node;
        }

        function updateUnionOrIntersectionTypeNode<T extends UnionOrIntersectionTypeNode>(node: T, types: NodeArray<TypeNode>): T {
            return node.types !== types
                ? updateNode(<T>createUnionOrIntersectionTypeNode(node.kind, types), node)
                : node;
        }

        function createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
            const node = createNode(SyntaxKind.ConditionalType) as ConditionalTypeNode;
            node.checkType = parenthesizer().parenthesizeMemberOfConditionalType(checkType);
            node.extendsType = parenthesizer().parenthesizeMemberOfConditionalType(extendsType);
            node.trueType = trueType;
            node.falseType = falseType;
            return node;
        }

        function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
            return node.checkType !== checkType
                || node.extendsType !== extendsType
                || node.trueType !== trueType
                || node.falseType !== falseType
                ? updateNode(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
                : node;
        }

        function createInferTypeNode(typeParameter: TypeParameterDeclaration) {
            const node = createNode(SyntaxKind.InferType) as InferTypeNode;
            node.typeParameter = typeParameter;
            return node;
        }

        function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration) {
            return node.typeParameter !== typeParameter
                ? updateNode(createInferTypeNode(typeParameter), node)
                : node;
        }

        function createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            const node = createNode(SyntaxKind.ImportType) as ImportTypeNode;
            node.argument = argument;
            node.qualifier = qualifier;
            node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(createNodeArray(typeArguments));
            node.isTypeOf = isTypeOf;
            return node;
        }

        function updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean) {
            return node.argument !== argument
                || node.qualifier !== qualifier
                || node.typeArguments !== typeArguments
                || node.isTypeOf !== isTypeOf
                ? updateNode(createImportTypeNode(argument, qualifier, typeArguments, isTypeOf), node)
                : node;
        }

        function createParenthesizedType(type: TypeNode) {
            const node = createNode(SyntaxKind.ParenthesizedType) as ParenthesizedTypeNode;
            node.type = type;
            return node;
        }

        function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode) {
            return node.type !== type
                ? updateNode(createParenthesizedType(type), node)
                : node;
        }

        function createThisTypeNode() {
            return createNode(SyntaxKind.ThisType) as ThisTypeNode;
        }

        function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
            const node = createNode(SyntaxKind.TypeOperator) as TypeOperatorNode;
            node.operator = operator;
            node.type = parenthesizer().parenthesizeMemberOfElementType(type);
            return node;
        }

        function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode) {
            return node.type !== type
                ? updateNode(createTypeOperatorNode(node.operator, type), node)
                : node;
        }

        function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode) {
            const node = createNode(SyntaxKind.IndexedAccessType) as IndexedAccessTypeNode;
            node.objectType = parenthesizer().parenthesizeMemberOfElementType(objectType);
            node.indexType = indexType;
            return node;
        }

        function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) {
            return node.objectType !== objectType
                || node.indexType !== indexType
                ? updateNode(createIndexedAccessTypeNode(objectType, indexType), node)
                : node;
        }

        function createMappedTypeNode(readonlyToken: ReadonlyToken | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            const node = createNode(SyntaxKind.MappedType) as MappedTypeNode;
            node.readonlyToken = readonlyToken;
            node.typeParameter = typeParameter;
            node.questionToken = questionToken;
            node.type = type;
            return node;
        }

        function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyToken | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode {
            return node.readonlyToken !== readonlyToken
                || node.typeParameter !== typeParameter
                || node.questionToken !== questionToken
                || node.type !== type
                ? updateNode(createMappedTypeNode(readonlyToken, typeParameter, questionToken, type), node)
                : node;
        }

        function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
            const node = createNode(SyntaxKind.LiteralType) as LiteralTypeNode;
            node.literal = literal;
            return node;
        }

        function updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]) {
            return node.literal !== literal
                ? updateNode(createLiteralTypeNode(literal), node)
                : node;
        }

        //
        // Binding Patterns
        //

        function createObjectBindingPattern(elements: readonly BindingElement[]) {
            const node = createNode(SyntaxKind.ObjectBindingPattern) as ObjectBindingPattern;
            node.elements = createNodeArray(elements);
            return node;
        }

        function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]) {
            return node.elements !== elements
                ? updateNode(createObjectBindingPattern(elements), node)
                : node;
        }

        function createArrayBindingPattern(elements: readonly ArrayBindingElement[]) {
            const node = createNode(SyntaxKind.ArrayBindingPattern) as ArrayBindingPattern;
            node.elements = createNodeArray(elements);
            return node;
        }

        function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) {
            return node.elements !== elements
                ? updateNode(createArrayBindingPattern(elements), node)
                : node;
        }

        function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression) {
            const node = createBaseNamedDeclaration<BindingElement>(
                SyntaxKind.BindingElement,
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                name
            );
            node.propertyName = asName(propertyName);
            node.initializer = initializer;
            node.dotDotDotToken = dotDotDotToken;
            return node;
        }

        function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) {
            return node.propertyName !== propertyName
                || node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.initializer !== initializer
                ? updateNode(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
                : node;
        }

        //
        // Expression
        //

        function createArrayLiteral(elements?: readonly Expression[], multiLine?: boolean) {
            const node = createNode(SyntaxKind.ArrayLiteralExpression) as ArrayLiteralExpression;
            node.elements = parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(elements));
            if (multiLine) node.multiLine = true;
            return node;
        }

        function updateArrayLiteral(node: ArrayLiteralExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? updateNode(createArrayLiteral(elements, node.multiLine), node)
                : node;
        }

        function createObjectLiteral(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean) {
            const node = createNode(SyntaxKind.ObjectLiteralExpression) as ObjectLiteralExpression;
            node.properties = createNodeArray(properties);
            if (multiLine) node.multiLine = true;
            return node;
        }

        function updateObjectLiteral(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) {
            return node.properties !== properties
                ? updateNode(createObjectLiteral(properties, node.multiLine), node)
                : node;
        }

        function createPropertyAccess(expression: Expression, name: string | Identifier) {
            const node = createNode(SyntaxKind.PropertyAccessExpression) as PropertyAccessExpression;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            node.name = asName(name);
            return node;
        }

        function createPropertyAccessSynthesized(expression: Expression, name: string | Identifier) {
            return setEmitFlags(createPropertyAccess(expression, name), EmitFlags.NoIndentation);
        }

        // This function lazily chooses which `createPropertyAccess` implementation to use for future calls. This helps to avoid
        // the overhead of the `if` check when its not needed.
        function createPropertyAccessUnspecific(expression: Expression, name: string | Identifier) {
            const node = createPropertyAccess(expression, name);
            if (node.flags & NodeFlags.Synthesized) {
                setEmitFlags(node, EmitFlags.NoIndentation);
                actualCreatePropertyAccess = createPropertyAccessSynthesized;
            }
            else {
                actualCreatePropertyAccess = createPropertyAccess;
            }
            return node;
        }

        function updatePropertyAccess(node: PropertyAccessExpression, expression: Expression, name: Identifier) {
            return node.expression !== expression
                || node.name !== name
                ? updateNode(createPropertyAccess(expression, name), node)
                : node;
        }

        function createElementAccess(expression: Expression, index: number | Expression) {
            const node = createNode(SyntaxKind.ElementAccessExpression) as ElementAccessExpression;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            node.argumentExpression = asExpression(index);
            return node;
        }

        function updateElementAccess(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) {
            return node.expression !== expression
                || node.argumentExpression !== argumentExpression
                ? updateNode(createElementAccess(expression, argumentExpression), node)
                : node;
        }

        function createCall(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createNode(SyntaxKind.CallExpression) as CallExpression;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            node.typeArguments = asNodeArray(typeArguments);
            node.arguments = parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray));
            return node;
        }

        function updateCall(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? updateNode(createCall(expression, typeArguments, argumentsArray), node)
                : node;
        }

        function createNew(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            const node = createNode(SyntaxKind.NewExpression) as NewExpression;
            node.expression = parenthesizer().parenthesizeExpressionOfNew(expression);
            node.typeArguments = asNodeArray(typeArguments);
            node.arguments = argumentsArray ? parenthesizer().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)) : undefined;
            return node;
        }

        function updateNew(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
                ? updateNode(createNew(expression, typeArguments, argumentsArray), node)
                : node;
        }

        function createTaggedTemplate(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            const node = createNode(SyntaxKind.TaggedTemplateExpression) as TaggedTemplateExpression;
            node.tag = parenthesizer().parenthesizeLeftSideOfAccess(tag);
            node.typeArguments = asNodeArray(typeArguments);
            node.template = template;
            return node;
        }

        function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
            return node.tag !== tag
                || node.typeArguments !== typeArguments
                || node.template !== template
                ? updateNode(createTaggedTemplate(tag, typeArguments, template), node)
                : node;
        }

        function createTypeAssertion(type: TypeNode, expression: Expression) {
            const node = createNode(SyntaxKind.TypeAssertionExpression) as TypeAssertion;
            node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression);
            node.type = type;
            return node;
        }

        function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression) {
            return node.type !== type
                || node.expression !== expression
                ? updateNode(createTypeAssertion(type, expression), node)
                : node;
        }

        function createParen(expression: Expression) {
            const node = createNode(SyntaxKind.ParenthesizedExpression) as ParenthesizedExpression;
            node.expression = expression;
            return node;
        }

        function updateParen(node: ParenthesizedExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createParen(expression), node)
                : node;
        }

        function createFunctionExpression(
            modifiers: readonly Modifier[] | undefined,
            asteriskToken: AsteriskToken | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[] | undefined,
            type: TypeNode | undefined,
            body: Block
        ) {
            const node = createNode(SyntaxKind.FunctionExpression) as FunctionExpression;
            node.modifiers = asNodeArray(modifiers);
            node.asteriskToken = asteriskToken;
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.parameters = createNodeArray(parameters);
            node.type = type;
            node.body = body;
            return node;
        }

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
                ? updateNode(createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
                : node;
        }

        function createArrowFunctionWithoutTokens(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ) {
            return createArrowFunctionWithTokens(modifiers, typeParameters, parameters, type, createToken(SyntaxKind.EqualsGreaterThanToken), body);
        }

        function createArrowFunctionWithTokens(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken | undefined,
            body: ConciseBody
        ) {
            const node = createNode(SyntaxKind.ArrowFunction) as ArrowFunction;
            node.modifiers = asNodeArray(modifiers);
            node.typeParameters = asNodeArray(typeParameters);
            node.parameters = createNodeArray(parameters);
            node.type = type;
            node.equalsGreaterThanToken = equalsGreaterThanToken || createToken(SyntaxKind.EqualsGreaterThanToken);
            node.body = parenthesizer().parenthesizeConciseBodyOfArrowFunction(body);
            return node;
        }

        function createArrowFunction(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ): ArrowFunction;
        function createArrowFunction(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken,
            body: ConciseBody
        ): ArrowFunction;
        function createArrowFunction(
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken | ConciseBody,
            body?: ConciseBody
        ) {
            return arguments.length === 6 ? createArrowFunctionWithTokens(modifiers, typeParameters, parameters, type, equalsGreaterThanToken as EqualsGreaterThanToken, body!) :
                arguments.length === 5 ? createArrowFunctionWithoutTokens(modifiers, typeParameters, parameters, type, body!) :
                Debug.fail("Incorrect argument count");
        }

        function updateArrowFunctionWithoutTokens(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ): ArrowFunction {
            return updateArrowFunctionWithTokens(node, modifiers, typeParameters, parameters, type, node.equalsGreaterThanToken, body);
        }

        function updateArrowFunctionWithTokens(
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
                ? updateNode(createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body), node)
                : node;
        }

        function updateArrowFunction(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            body: ConciseBody
        ): ArrowFunction;
        function updateArrowFunction(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken,
            body: ConciseBody
        ): ArrowFunction;
        function updateArrowFunction(
            node: ArrowFunction,
            modifiers: readonly Modifier[] | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            parameters: readonly ParameterDeclaration[],
            type: TypeNode | undefined,
            equalsGreaterThanToken: EqualsGreaterThanToken | ConciseBody,
            body?: ConciseBody
        ): ArrowFunction {
            return arguments.length === 7 ? updateArrowFunctionWithTokens(node, modifiers, typeParameters, parameters, type, equalsGreaterThanToken as EqualsGreaterThanToken, body!) :
                arguments.length === 6 ? updateArrowFunctionWithoutTokens(node, modifiers, typeParameters, parameters, type, body!) :
                Debug.fail("Incorrect argument count");
        }

        function createDelete(expression: Expression) {
            const node = createNode(SyntaxKind.DeleteExpression) as DeleteExpression;
            node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression);
            return node;
        }

        function updateDelete(node: DeleteExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createDelete(expression), node)
                : node;
        }

        function createTypeOf(expression: Expression) {
            const node = createNode(SyntaxKind.TypeOfExpression) as TypeOfExpression;
            node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression);
            return node;
        }

        function updateTypeOf(node: TypeOfExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createTypeOf(expression), node)
                : node;
        }

        function createVoid(expression: Expression) {
            const node = createNode(SyntaxKind.VoidExpression) as VoidExpression;
            node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression);
            return node;
        }

        function updateVoid(node: VoidExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createVoid(expression), node)
                : node;
        }

        function createAwait(expression: Expression) {
            const node = createNode(SyntaxKind.AwaitExpression) as AwaitExpression;
            node.expression = parenthesizer().parenthesizeOperandOfPrefixUnary(expression);
            return node;
        }

        function updateAwait(node: AwaitExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createAwait(expression), node)
                : node;
        }

        function createPrefix(operator: PrefixUnaryOperator, operand: Expression) {
            const node = createNode(SyntaxKind.PrefixUnaryExpression) as PrefixUnaryExpression;
            node.operator = operator;
            node.operand = parenthesizer().parenthesizeOperandOfPrefixUnary(operand);
            return node;
        }

        function updatePrefix(node: PrefixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? updateNode(createPrefix(node.operator, operand), node)
                : node;
        }

        function createPostfix(operand: Expression, operator: PostfixUnaryOperator) {
            const node = createNode(SyntaxKind.PostfixUnaryExpression) as PostfixUnaryExpression;
            node.operand = parenthesizer().parenthesizeOperandOfPostfixUnary(operand);
            node.operator = operator;
            return node;
        }

        function updatePostfix(node: PostfixUnaryExpression, operand: Expression) {
            return node.operand !== operand
                ? updateNode(createPostfix(operand, node.operator), node)
                : node;
        }

        function createBinary(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) {
            const node = createNode(SyntaxKind.BinaryExpression) as BinaryExpression;
            const operatorToken = asToken(operator);
            const operatorKind = operatorToken.kind;
            node.left = parenthesizer().parenthesizeLeftSideOfBinary(operatorKind, left);
            node.operatorToken = operatorToken;
            node.right = parenthesizer().parenthesizeRightSideOfBinary(operatorKind, node.left, right);
            return node;
        }

        function updateBinary(node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) {
            return node.left !== left
                || node.right !== right
                ? updateNode(createBinary(left, operator || node.operatorToken, right), node)
                : node;
        }

        function createConditionalWithoutTokens(condition: Expression, whenTrue: Expression, whenFalse: Expression) {
            return createConditionalWithTokens(condition, createQuestionToken(), whenTrue, createColonToken(), whenFalse);
        }

        function createConditionalWithTokens(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression) {
            const node = createNode(SyntaxKind.ConditionalExpression) as ConditionalExpression;
            node.condition = parenthesizer().parenthesizeConditionOfConditionalExpression(condition);
            node.questionToken = questionToken;
            node.whenTrue = parenthesizer().parenthesizeBranchOfConditionalExpression(whenTrue);
            node.colonToken = colonToken;
            node.whenFalse = parenthesizer().parenthesizeBranchOfConditionalExpression(whenFalse);
            return node;
        }

        function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        function createConditional(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
        function createConditional(condition: Expression, questionToken: QuestionToken | Expression, whenTrue: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
            return arguments.length === 3 ? createConditionalWithoutTokens(condition, questionToken as Expression, whenTrue) :
                arguments.length === 5 ? createConditionalWithTokens(condition, questionToken as QuestionToken, whenTrue, colonToken!, whenFalse!) :
                Debug.fail("Incorrect argument count");
        }

        function updateConditionalWithoutTokens(
            node: ConditionalExpression,
            condition: Expression,
            whenTrue: Expression,
            whenFalse: Expression
        ): ConditionalExpression {
            return updateConditionalWithTokens(node, condition, node.questionToken, whenTrue, node.colonToken, whenFalse);
        }

        function updateConditionalWithTokens(
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
                ? updateNode(createConditionalWithTokens(condition, questionToken, whenTrue, colonToken, whenFalse), node)
                : node;
        }

        function updateConditional(node: ConditionalExpression, condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        function updateConditional(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
        function updateConditional(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken | Expression, whenTrue: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
            return arguments.length === 4 ? updateConditionalWithoutTokens(node, condition, questionToken as Expression, whenTrue) :
                arguments.length === 6 ? updateConditionalWithTokens(node, condition, questionToken as QuestionToken, whenTrue, colonToken!, whenFalse!) :
                Debug.fail("Incorrect argument count");
        }

        function createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
            const node = createNode(SyntaxKind.TemplateExpression) as TemplateExpression;
            node.head = head;
            node.templateSpans = createNodeArray(templateSpans);
            return node;
        }

        function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
            return node.head !== head
                || node.templateSpans !== templateSpans
                ? updateNode(createTemplateExpression(head, templateSpans), node)
                : node;
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

        function createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string | undefined) {
            const node = createNode(kind) as TemplateLiteralLikeNode;
            node.text = text;
            node.rawText = rawText;
            return node;
        }

        function createTemplateHead(text: string | undefined, rawText?: string) {
            return <TemplateHead>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateHead, text, rawText);
        }

        function createTemplateMiddle(text: string | undefined, rawText?: string) {
            return <TemplateMiddle>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateMiddle, text, rawText);
        }

        function createTemplateTail(text: string | undefined, rawText?: string) {
            return <TemplateTail>createTemplateLiteralLikeNodeChecked(SyntaxKind.TemplateTail, text, rawText);
        }

        function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string) {
            return <NoSubstitutionTemplateLiteral>createTemplateLiteralLikeNodeChecked(SyntaxKind.NoSubstitutionTemplateLiteral, text, rawText);
        }

        function createYield(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
            Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
            const node = createNode(SyntaxKind.YieldExpression) as YieldExpression;
            node.expression = expression;
            node.asteriskToken = asteriskToken;
            return node;
        }

        function updateYield(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression) {
            return node.expression !== expression
                || node.asteriskToken !== asteriskToken
                ? updateNode(createYield(asteriskToken, expression), node)
                : node;
        }

        function createSpread(expression: Expression) {
            const node = createNode(SyntaxKind.SpreadElement) as SpreadElement;
            node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression);
            return node;
        }

        function updateSpread(node: SpreadElement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createSpread(expression), node)
                : node;
        }

        function createClassExpression(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            const node: ClassExpression = createBaseDeclaration(SyntaxKind.ClassExpression, asNodeArray(decorators), asNodeArray(modifiers));
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.heritageClauses = asNodeArray(heritageClauses);
            node.members = createNodeArray(members);
            return node;
        }

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
                : node;
        }

        function createOmittedExpression() {
            return createNode(SyntaxKind.OmittedExpression) as OmittedExpression;
        }

        function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            const node = createNode(SyntaxKind.ExpressionWithTypeArguments) as ExpressionWithTypeArguments;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            node.typeArguments = typeArguments && parenthesizer().parenthesizeTypeArguments(typeArguments);
            return node;
        }

        function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
            return node.expression !== expression
                || node.typeArguments !== typeArguments
                ? updateNode(createExpressionWithTypeArguments(expression, typeArguments), node)
                : node;
        }

        function createAsExpression(expression: Expression, type: TypeNode) {
            const node = createNode(SyntaxKind.AsExpression) as AsExpression;
            node.expression = expression;
            node.type = type;
            return node;
        }

        function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode) {
            return node.expression !== expression
                || node.type !== type
                ? updateNode(createAsExpression(expression, type), node)
                : node;
        }

        function createNonNullExpression(expression: Expression) {
            const node = createNode(SyntaxKind.NonNullExpression) as NonNullExpression;
            node.expression = parenthesizer().parenthesizeLeftSideOfAccess(expression);
            return node;
        }

        function updateNonNullExpression(node: NonNullExpression, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createNonNullExpression(expression), node)
                : node;
        }

        function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier) {
            const node = createNode(SyntaxKind.MetaProperty) as MetaProperty;
            node.keywordToken = keywordToken;
            node.name = name;
            return node;
        }

        function updateMetaProperty(node: MetaProperty, name: Identifier) {
            return node.name !== name
                ? updateNode(createMetaProperty(node.keywordToken, name), node)
                : node;
        }

        //
        // Misc
        //

        function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail) {
            const node = createNode(SyntaxKind.TemplateSpan) as TemplateSpan;
            node.expression = expression;
            node.literal = literal;
            return node;
        }

        function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) {
            return node.expression !== expression
                || node.literal !== literal
                ? updateNode(createTemplateSpan(expression, literal), node)
                : node;
        }

        function createSemicolonClassElement() {
            return createNode(SyntaxKind.SemicolonClassElement) as SemicolonClassElement;
        }

        //
        // Element
        //

        function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
            const node = createNode(SyntaxKind.Block) as Block;
            node.statements = createNodeArray(statements);
            if (multiLine) node.multiLine = multiLine;
            return node;
        }

        function updateBlock(node: Block, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createBlock(statements, node.multiLine), node)
                : node;
        }

        function createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) {
            const node: VariableStatement = createBaseDeclaration(SyntaxKind.VariableStatement, /*decorators*/ undefined, modifiers);
            node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
            return node;
        }

        function updateVariableStatement(node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList) {
            return node.modifiers !== modifiers
                || node.declarationList !== declarationList
                ? updateNode(createVariableStatement(modifiers, declarationList), node)
                : node;
        }

        function createEmptyStatement() {
            return createNode(SyntaxKind.EmptyStatement) as EmptyStatement;
        }

        function createExpressionStatement(expression: Expression): ExpressionStatement {
            const node = createNode(SyntaxKind.ExpressionStatement) as ExpressionStatement;
            node.expression = parenthesizer().parenthesizeExpressionOfExpressionStatement(expression);
            return node;
        }

        function updateExpressionStatement(node: ExpressionStatement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createExpressionStatement(expression), node)
                : node;
        }

        function createIf(expression: Expression, thenStatement: Statement, elseStatement?: Statement) {
            const node = createNode(SyntaxKind.IfStatement) as IfStatement;
            node.expression = expression;
            node.thenStatement = asEmbeddedStatement(thenStatement);
            node.elseStatement = asEmbeddedStatement(elseStatement);
            return node;
        }

        function updateIf(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) {
            return node.expression !== expression
                || node.thenStatement !== thenStatement
                || node.elseStatement !== elseStatement
                ? updateNode(createIf(expression, thenStatement, elseStatement), node)
                : node;
        }

        function createDo(statement: Statement, expression: Expression) {
            const node = createNode(SyntaxKind.DoStatement) as DoStatement;
            node.statement = asEmbeddedStatement(statement);
            node.expression = expression;
            return node;
        }

        function updateDo(node: DoStatement, statement: Statement, expression: Expression) {
            return node.statement !== statement
                || node.expression !== expression
                ? updateNode(createDo(statement, expression), node)
                : node;
        }

        function createWhile(expression: Expression, statement: Statement) {
            const node = createNode(SyntaxKind.WhileStatement) as WhileStatement;
            node.expression = expression;
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateWhile(node: WhileStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? updateNode(createWhile(expression, statement), node)
                : node;
        }

        function createFor(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            const node = createNode(SyntaxKind.ForStatement) as ForStatement;
            node.initializer = initializer;
            node.condition = condition;
            node.incrementor = incrementor;
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateFor(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
            return node.initializer !== initializer
                || node.condition !== condition
                || node.incrementor !== incrementor
                || node.statement !== statement
                ? updateNode(createFor(initializer, condition, incrementor, statement), node)
                : node;
        }

        function createForIn(initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createNode(SyntaxKind.ForInStatement) as ForInStatement;
            node.initializer = initializer;
            node.expression = expression;
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateForIn(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? updateNode(createForIn(initializer, expression, statement), node)
                : node;
        }

        function createForOf(awaitModifier: AwaitKeywordToken | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            const node = createNode(SyntaxKind.ForOfStatement) as ForOfStatement;
            node.awaitModifier = awaitModifier;
            node.initializer = initializer;
            node.expression = expression;
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateForOf(node: ForOfStatement, awaitModifier: AwaitKeywordToken | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
            return node.awaitModifier !== awaitModifier
                || node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
                ? updateNode(createForOf(awaitModifier, initializer, expression, statement), node)
                : node;
        }

        function createContinue(label?: string | Identifier): ContinueStatement {
            const node = createNode(SyntaxKind.ContinueStatement) as ContinueStatement;
            node.label = asName(label);
            return node;
        }

        function updateContinue(node: ContinueStatement, label: Identifier | undefined) {
            return node.label !== label
                ? updateNode(createContinue(label), node)
                : node;
        }

        function createBreak(label?: string | Identifier): BreakStatement {
            const node = createNode(SyntaxKind.BreakStatement) as BreakStatement;
            node.label = asName(label);
            return node;
        }

        function updateBreak(node: BreakStatement, label: Identifier | undefined) {
            return node.label !== label
                ? updateNode(createBreak(label), node)
                : node;
        }

        function createReturn(expression?: Expression): ReturnStatement {
            const node = createNode(SyntaxKind.ReturnStatement) as ReturnStatement;
            node.expression = expression;
            return node;
        }

        function updateReturn(node: ReturnStatement, expression: Expression | undefined) {
            return node.expression !== expression
                ? updateNode(createReturn(expression), node)
                : node;
        }

        function createWith(expression: Expression, statement: Statement) {
            const node = createNode(SyntaxKind.WithStatement) as WithStatement;
            node.expression = expression;
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateWith(node: WithStatement, expression: Expression, statement: Statement) {
            return node.expression !== expression
                || node.statement !== statement
                ? updateNode(createWith(expression, statement), node)
                : node;
        }

        function createSwitch(expression: Expression, caseBlock: CaseBlock): SwitchStatement {
            const node = createNode(SyntaxKind.SwitchStatement) as SwitchStatement;
            node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression);
            node.caseBlock = caseBlock;
            return node;
        }

        function updateSwitch(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) {
            return node.expression !== expression
                || node.caseBlock !== caseBlock
                ? updateNode(createSwitch(expression, caseBlock), node)
                : node;
        }

        function createLabel(label: string | Identifier, statement: Statement) {
            const node = createNode(SyntaxKind.LabeledStatement) as LabeledStatement;
            node.label = asName(label);
            node.statement = asEmbeddedStatement(statement);
            return node;
        }

        function updateLabel(node: LabeledStatement, label: Identifier, statement: Statement) {
            return node.label !== label
                || node.statement !== statement
                ? updateNode(createLabel(label, statement), node)
                : node;
        }

        function createThrow(expression: Expression) {
            const node = createNode(SyntaxKind.ThrowStatement) as ThrowStatement;
            node.expression = expression;
            return node;
        }

        function updateThrow(node: ThrowStatement, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createThrow(expression), node)
                : node;
        }

        function createTry(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            const node = createNode(SyntaxKind.TryStatement) as TryStatement;
            node.tryBlock = tryBlock;
            node.catchClause = catchClause;
            node.finallyBlock = finallyBlock;
            return node;
        }

        function updateTry(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
            return node.tryBlock !== tryBlock
                || node.catchClause !== catchClause
                || node.finallyBlock !== finallyBlock
                ? updateNode(createTry(tryBlock, catchClause, finallyBlock), node)
                : node;
        }

        function createDebuggerStatement() {
            return createNode(SyntaxKind.DebuggerStatement) as DebuggerStatement;
        }

        function createVariableDeclaration(name: string | BindingName, type?: TypeNode, initializer?: Expression) {
            const node = createNode(SyntaxKind.VariableDeclaration) as VariableDeclaration;
            node.name = asName(name);
            node.type = type;
            node.initializer = initializer !== undefined ? parenthesizer().parenthesizeExpressionForDisallowedComma(initializer) : undefined;
            return node;
        }

        function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined) {
            return node.name !== name
                || node.type !== type
                || node.initializer !== initializer
                ? updateNode(createVariableDeclaration(name, type, initializer), node)
                : node;
        }

        function createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags = NodeFlags.None) {
            const node = createNode(SyntaxKind.VariableDeclarationList) as VariableDeclarationList;
            node.flags |= flags & NodeFlags.BlockScoped;
            node.declarations = createNodeArray(declarations);
            return node;
        }

        function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) {
            return node.declarations !== declarations
                ? updateNode(createVariableDeclarationList(declarations, node.flags), node)
                : node;
        }

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
            const node: FunctionDeclaration = createBaseDeclaration(SyntaxKind.FunctionDeclaration, decorators, modifiers);
            node.asteriskToken = asteriskToken;
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.parameters = createNodeArray(parameters);
            node.type = type;
            node.body = body;
            return node;
        }

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
                ? updateNode(createFunctionDeclaration(decorators, modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
                : node;
        }

        function createClassDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier | undefined,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly ClassElement[]
        ) {
            const node: ClassDeclaration = createBaseDeclaration(SyntaxKind.ClassDeclaration, decorators, modifiers);
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.heritageClauses = asNodeArray(heritageClauses);
            node.members = createNodeArray(members);
            return node;
        }

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
                : node;
        }

        function createInterfaceDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            heritageClauses: readonly HeritageClause[] | undefined,
            members: readonly TypeElement[]
        ) {
            const node: InterfaceDeclaration = createBaseDeclaration(SyntaxKind.InterfaceDeclaration, decorators, modifiers);
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.heritageClauses = asNodeArray(heritageClauses);
            node.members = createNodeArray(members);
            return node;
        }

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
                : node;
        }

        function createTypeAliasDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            typeParameters: readonly TypeParameterDeclaration[] | undefined,
            type: TypeNode
        ) {
            const node: TypeAliasDeclaration = createBaseDeclaration(SyntaxKind.TypeAliasDeclaration, decorators, modifiers);
            node.name = asName(name);
            node.typeParameters = asNodeArray(typeParameters);
            node.type = type;
            return node;
        }

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
                : node;
        }

        function createEnumDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            name: string | Identifier,
            members: readonly EnumMember[]
        ) {
            const node: EnumDeclaration = createBaseDeclaration(SyntaxKind.EnumDeclaration, decorators, modifiers);
            node.name = asName(name);
            node.members = createNodeArray(members);
            return node;
        }

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
                : node;
        }

        function createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags = NodeFlags.None) {
            const node: ModuleDeclaration = createBaseDeclaration(SyntaxKind.ModuleDeclaration, decorators, modifiers);
            node.flags |= flags & (NodeFlags.Namespace | NodeFlags.NestedNamespace | NodeFlags.GlobalAugmentation);
            node.name = name;
            node.body = body;
            return node;
        }

        function updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.body !== body
                ? updateNode(createModuleDeclaration(decorators, modifiers, name, body, node.flags), node)
                : node;
        }

        function createModuleBlock(statements: readonly Statement[]) {
            const node = createNode(SyntaxKind.ModuleBlock) as ModuleBlock;
            node.statements = createNodeArray(statements);
            return node;
        }

        function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createModuleBlock(statements), node)
                : node;
        }

        function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
            const node = createNode(SyntaxKind.CaseBlock) as CaseBlock;
            node.clauses = createNodeArray(clauses);
            return node;
        }

        function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) {
            return node.clauses !== clauses
                ? updateNode(createCaseBlock(clauses), node)
                : node;
        }

        function createNamespaceExportDeclaration(name: string | Identifier) {
            const node = createNode(SyntaxKind.NamespaceExportDeclaration) as NamespaceExportDeclaration;
            node.name = asName(name);
            return node;
        }

        function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier) {
            return node.name !== name
                ? updateNode(createNamespaceExportDeclaration(name), node)
                : node;
        }

        function createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, moduleReference: ModuleReference) {
            const node: ImportEqualsDeclaration = createBaseDeclaration(SyntaxKind.ImportEqualsDeclaration, decorators, modifiers);
            node.name = asName(name);
            node.moduleReference = moduleReference;
            return node;
        }

        function updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, moduleReference: ModuleReference) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.name !== name
                || node.moduleReference !== moduleReference
                ? updateNode(createImportEqualsDeclaration(decorators, modifiers, name, moduleReference), node)
                : node;
        }

        function createImportDeclaration(
            decorators: readonly Decorator[] | undefined,
            modifiers: readonly Modifier[] | undefined,
            importClause: ImportClause | undefined,
            moduleSpecifier: Expression
        ): ImportDeclaration {
            const node: ImportDeclaration = createBaseDeclaration(SyntaxKind.ImportDeclaration, decorators, modifiers);
            node.importClause = importClause;
            node.moduleSpecifier = moduleSpecifier;
            return node;
        }

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
                : node;
        }

        function createImportClause(name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
            const node = createNode(SyntaxKind.ImportClause) as ImportClause;
            node.name = name;
            node.namedBindings = namedBindings;
            return node;
        }

        function updateImportClause(node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined) {
            return node.name !== name
                || node.namedBindings !== namedBindings
                ? updateNode(createImportClause(name, namedBindings), node)
                : node;
        }

        function createNamespaceImport(name: Identifier): NamespaceImport {
            const node = createNode(SyntaxKind.NamespaceImport) as NamespaceImport;
            node.name = name;
            return node;
        }

        function updateNamespaceImport(node: NamespaceImport, name: Identifier) {
            return node.name !== name
                ? updateNode(createNamespaceImport(name), node)
                : node;
        }

        function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
            const node = createNode(SyntaxKind.NamedImports) as NamedImports;
            node.elements = createNodeArray(elements);
            return node;
        }

        function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]) {
            return node.elements !== elements
                ? updateNode(createNamedImports(elements), node)
                : node;
        }

        function createImportSpecifier(propertyName: Identifier | undefined, name: Identifier) {
            const node = createNode(SyntaxKind.ImportSpecifier) as ImportSpecifier;
            node.propertyName = propertyName;
            node.name = name;
            return node;
        }

        function updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? updateNode(createImportSpecifier(propertyName, name), node)
                : node;
        }

        function createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression) {
            const node = createBaseDeclaration<ExportAssignment>(
                SyntaxKind.ExportAssignment, asNodeArray(decorators), asNodeArray(modifiers));
            node.isExportEquals = isExportEquals;
            node.expression = isExportEquals
                ? parenthesizer().parenthesizeRightSideOfBinary(SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
                : parenthesizer().parenthesizeExpressionOfExportDefault(expression);
            return node;
        }

        function updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression) {
            return node.decorators !== decorators
                || node.modifiers !== modifiers
                || node.expression !== expression
                ? updateNode(createExportAssignment(decorators, modifiers, node.isExportEquals, expression), node)
                : node;
        }

        function createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExports | undefined, moduleSpecifier?: Expression) {
            const node = createBaseDeclaration<ExportDeclaration>(
                SyntaxKind.ExportDeclaration, asNodeArray(decorators), asNodeArray(modifiers));
            node.exportClause = exportClause;
            node.moduleSpecifier = moduleSpecifier;
            return node;
        }

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
                : node;
        }

        function createNamedExports(elements: readonly ExportSpecifier[]) {
            const node = createNode(SyntaxKind.NamedExports) as NamedExports;
            node.elements = createNodeArray(elements);
            return node;
        }

        function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]) {
            return node.elements !== elements
                ? updateNode(createNamedExports(elements), node)
                : node;
        }

        function createExportSpecifier(propertyName: string | Identifier | undefined, name: string | Identifier) {
            const node = createNode(SyntaxKind.ExportSpecifier) as ExportSpecifier;
            node.propertyName = asName(propertyName);
            node.name = asName(name);
            return node;
        }

        function updateExportSpecifier(node: ExportSpecifier, propertyName: Identifier | undefined, name: Identifier) {
            return node.propertyName !== propertyName
                || node.name !== name
                ? updateNode(createExportSpecifier(propertyName, name), node)
                : node;
        }

        //
        // Module references
        //

        function createExternalModuleReference(expression: Expression) {
            const node = createNode(SyntaxKind.ExternalModuleReference) as ExternalModuleReference;
            node.expression = expression;
            return node;
        }

        function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createExternalModuleReference(expression), node)
                : node;
        }

        //
        // JSDoc
        //

        function createJSDocAllType() {
            const node = createNode(SyntaxKind.JSDocAllType) as JSDocAllType;
            return node;
        }

        function createJSDocUnknownType() {
            const node = createNode(SyntaxKind.JSDocUnknownType) as JSDocUnknownType;
            return node;
        }

        function createJSDocNonNullableType(type: TypeNode) {
            const node = createNode(SyntaxKind.JSDocNonNullableType) as JSDocNonNullableType;
            node.type = type;
            return node;
        }

        function createJSDocNullableType(type: TypeNode) {
            const node = createNode(SyntaxKind.JSDocNullableType) as JSDocNullableType;
            node.type = type;
            return node;
        }

        function createJSDocOptionalType(type: TypeNode) {
            const node = createNode(SyntaxKind.JSDocOptionalType) as JSDocOptionalType;
            node.type = type;
            return node;
        }

        function createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
            return createBaseSignatureDeclaration(SyntaxKind.JSDocFunctionType, /*typeParameters*/ undefined, parameters, type);
        }

        function createJSDocVariadicType(type: TypeNode) {
            const node = createNode(SyntaxKind.JSDocVariadicType) as JSDocVariadicType;
            node.type = type;
            return node;
        }

        function createJSDocNamepathType(type: TypeNode) {
            const node = createNode(SyntaxKind.JSDocNamepathType) as JSDocNamepathType;
            node.type = type;
            return node;
        }

        function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral {
            const node = createNode(SyntaxKind.JSDocTypeLiteral) as JSDocTypeLiteral;
            node.jsDocPropertyTags = propertyTags;
            node.isArrayType = isArrayType;
            return node;
        }

        function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
            const node = createNode(SyntaxKind.JSDocTypeExpression) as JSDocTypeExpression;
            node.type = type;
            return node;
        }

        function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
            const node = createNode(SyntaxKind.JSDocSignature) as JSDocSignature;
            node.typeParameters = asNodeArray(typeParameters);
            node.parameters = createNodeArray(parameters);
            node.type = type;
            return node;
        }

        function createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[]): JSDocTemplateTag {
            const tag = createJSDocTag<JSDocTemplateTag>(SyntaxKind.JSDocTemplateTag, tagName || createIdentifier("template"));
            tag.constraint = constraint;
            tag.typeParameters = createNodeArray(typeParameters);
            return tag;
        }

        function createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string): JSDocTypeTag {
            const tag = createJSDocTag<JSDocTypeTag>(SyntaxKind.JSDocTypeTag, tagName || createIdentifier("type"));
            tag.typeExpression = typeExpression;
            tag.comment = comment;
            return tag;
        }

        function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocTypedefTag {
            const tag = createJSDocTag<JSDocTypedefTag>(SyntaxKind.JSDocTypedefTag, tagName || createIdentifier("typedef"));
            tag.typeExpression = typeExpression;
            tag.fullName = fullName;
            tag.name = getJSDocTypeAliasName(fullName);
            tag.comment = comment;
            return tag;
        }

        function createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocReturnTag {
            const tag = createJSDocTag<JSDocReturnTag>(SyntaxKind.JSDocReturnTag, tagName || createIdentifier("returns"));
            tag.typeExpression = typeExpression;
            tag.comment = comment;
            return tag;
        }

        function createJSDocThisTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocThisTag {
            const tag = createJSDocTag<JSDocThisTag>(SyntaxKind.JSDocThisTag, tagName || createIdentifier("this"));
            tag.typeExpression = typeExpression;
            return tag;
        }

        function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocParameterTag {
            const tag = createJSDocTag<JSDocParameterTag>(SyntaxKind.JSDocParameterTag, tagName || createIdentifier("param"));
            tag.typeExpression = typeExpression;
            tag.name = name;
            tag.isNameFirst = !!isNameFirst;
            tag.isBracketed = isBracketed;
            tag.comment = comment;
            return tag;
        }

        function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocPropertyTag {
            const tag = createJSDocTag<JSDocPropertyTag>(SyntaxKind.JSDocPropertyTag, tagName || createIdentifier("prop"));
            tag.typeExpression = typeExpression;
            tag.name = name;
            tag.isNameFirst = !!isNameFirst;
            tag.isBracketed = isBracketed;
            tag.comment = comment;
            return tag;
        }

        function createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string): JSDocAuthorTag {
            const tag = createJSDocTag<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag, tagName || createIdentifier("author"));
            tag.comment = comment;
            return tag;
        }

        function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"]): JSDocAugmentsTag {
            const tag = createJSDocTag<JSDocAugmentsTag>(SyntaxKind.JSDocAugmentsTag, tagName || createIdentifier("augments"));
            tag.class = className;
            return tag;
        }

        function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocCallbackTag {
            const tag = createJSDocTag<JSDocCallbackTag>(SyntaxKind.JSDocCallbackTag, tagName || createIdentifier("callback"));
            tag.typeExpression = typeExpression;
            tag.fullName = fullName;
            tag.name = getJSDocTypeAliasName(fullName);
            tag.comment = comment;
            return tag;
        }

        function createJSDocClassTag(tagName: Identifier | undefined): JSDocClassTag {
            const tag = createJSDocTag<JSDocClassTag>(SyntaxKind.JSDocClassTag, tagName || createIdentifier("class"));
            return tag;
        }

        function createJSDocEnumTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression): JSDocEnumTag {
            const tag = createJSDocTag<JSDocEnumTag>(SyntaxKind.JSDocEnumTag, tagName || createIdentifier("enum"));
            tag.typeExpression = typeExpression;
            return tag;
        }

        function createJSDocComment(comment?: string | undefined, tags?: NodeArray<JSDocTag> | undefined) {
            const node = createNode(SyntaxKind.JSDocComment) as JSDoc;
            node.comment = comment;
            node.tags = tags;
            return node;
        }

        function createJSDocTag<T extends JSDocTag>(kind: T["kind"], tagName: Identifier): T {
            const node = createNode(kind) as T;
            node.tagName = tagName;
            return node;
        }

        //
        // JSX
        //

        function createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
            const node = createNode(SyntaxKind.JsxElement) as JsxElement;
            node.openingElement = openingElement;
            node.children = createNodeArray(children);
            node.closingElement = closingElement;
            return node;
        }

        function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
            return node.openingElement !== openingElement
                || node.children !== children
                || node.closingElement !== closingElement
                ? updateNode(createJsxElement(openingElement, children, closingElement), node)
                : node;
        }

        function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createNode(SyntaxKind.JsxSelfClosingElement) as JsxSelfClosingElement;
            node.tagName = tagName;
            node.typeArguments = asNodeArray(typeArguments);
            node.attributes = attributes;
            return node;
        }

        function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? updateNode(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
                : node;
        }

        function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            const node = createNode(SyntaxKind.JsxOpeningElement) as JsxOpeningElement;
            node.tagName = tagName;
            node.typeArguments = asNodeArray(typeArguments);
            node.attributes = attributes;
            return node;
        }

        function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
            return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
                ? updateNode(createJsxOpeningElement(tagName, typeArguments, attributes), node)
                : node;
        }

        function createJsxClosingElement(tagName: JsxTagNameExpression) {
            const node = createNode(SyntaxKind.JsxClosingElement) as JsxClosingElement;
            node.tagName = tagName;
            return node;
        }

        function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression) {
            return node.tagName !== tagName
                ? updateNode(createJsxClosingElement(tagName), node)
                : node;
        }

        function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            const node = createNode(SyntaxKind.JsxFragment) as JsxFragment;
            node.openingFragment = openingFragment;
            node.children = createNodeArray(children);
            node.closingFragment = closingFragment;
            return node;
        }

        function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            const node = createNode(SyntaxKind.JsxText) as JsxText;
            node.text = text;
            node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
            return node;
        }

        function updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
            return node.text !== text
                || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
                ? updateNode(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
                : node;
        }

        function createJsxOpeningFragment() {
            return createNode(SyntaxKind.JsxOpeningFragment) as JsxOpeningFragment;
        }

        function createJsxJsxClosingFragment() {
            return createNode(SyntaxKind.JsxClosingFragment) as JsxClosingFragment;
        }

        function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
            return node.openingFragment !== openingFragment
                || node.children !== children
                || node.closingFragment !== closingFragment
                ? updateNode(createJsxFragment(openingFragment, children, closingFragment), node)
                : node;
        }

        function createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            const node = createNode(SyntaxKind.JsxAttribute) as JsxAttribute;
            node.name = name;
            node.initializer = initializer;
            return node;
        }

        function updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? updateNode(createJsxAttribute(name, initializer), node)
                : node;
        }

        function createJsxAttributes(properties: readonly JsxAttributeLike[]) {
            const node = createNode(SyntaxKind.JsxAttributes) as JsxAttributes;
            node.properties = createNodeArray(properties);
            return node;
        }

        function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]) {
            return node.properties !== properties
                ? updateNode(createJsxAttributes(properties), node)
                : node;
        }

        function createJsxSpreadAttribute(expression: Expression) {
            const node = createNode(SyntaxKind.JsxSpreadAttribute) as JsxSpreadAttribute;
            node.expression = expression;
            return node;
        }

        function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createJsxSpreadAttribute(expression), node)
                : node;
        }

        function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) {
            const node = createNode(SyntaxKind.JsxExpression) as JsxExpression;
            node.dotDotDotToken = dotDotDotToken;
            node.expression = expression;
            return node;
        }

        function updateJsxExpression(node: JsxExpression, expression: Expression | undefined) {
            return node.expression !== expression
                ? updateNode(createJsxExpression(node.dotDotDotToken, expression), node)
                : node;
        }

        //
        // Clauses
        //

        function createCaseClause(expression: Expression, statements: readonly Statement[]) {
            const node = createNode(SyntaxKind.CaseClause) as CaseClause;
            node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression);
            node.statements = createNodeArray(statements);
            return node;
        }

        function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]) {
            return node.expression !== expression
                || node.statements !== statements
                ? updateNode(createCaseClause(expression, statements), node)
                : node;
        }

        function createDefaultClause(statements: readonly Statement[]) {
            const node = createNode(SyntaxKind.DefaultClause) as DefaultClause;
            node.statements = createNodeArray(statements);
            return node;
        }

        function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]) {
            return node.statements !== statements
                ? updateNode(createDefaultClause(statements), node)
                : node;
        }

        function createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]) {
            const node = createNode(SyntaxKind.HeritageClause) as HeritageClause;
            node.token = token;
            node.types = createNodeArray(types);
            return node;
        }

        function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) {
            return node.types !== types
                ? updateNode(createHeritageClause(node.token, types), node)
                : node;
        }

        function createCatchClause(variableDeclaration: string | VariableDeclaration | undefined, block: Block) {
            const node = createNode(SyntaxKind.CatchClause) as CatchClause;
            node.variableDeclaration = isString(variableDeclaration) ? createVariableDeclaration(variableDeclaration) : variableDeclaration;
            node.block = block;
            return node;
        }

        function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) {
            return node.variableDeclaration !== variableDeclaration
                || node.block !== block
                ? updateNode(createCatchClause(variableDeclaration, block), node)
                : node;
        }


        //
        // Property assignments
        //

        function createPropertyAssignment(name: string | PropertyName, initializer: Expression) {
            const node = createNode(SyntaxKind.PropertyAssignment) as PropertyAssignment;
            node.name = asName(name);
            node.questionToken = undefined;
            node.initializer = parenthesizer().parenthesizeExpressionForDisallowedComma(initializer);
            return node;
        }

        function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression) {
            return node.name !== name
                || node.initializer !== initializer
                ? updateNode(createPropertyAssignment(name, initializer), node)
                : node;
        }

        function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression) {
            return createShorthandPropertyAssignmentInternal(/*decorators*/ undefined, /*modifiers*/ undefined, name, /*equalsToken*/ undefined, objectAssignmentInitializer);
        }

        function createShorthandPropertyAssignmentInternal(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, equalsToken: EqualsToken | undefined, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment {
            const node: ShorthandPropertyAssignment = createBaseDeclaration(SyntaxKind.ShorthandPropertyAssignment, decorators, modifiers);
            node.name = asName(name);
            node.equalsToken = equalsToken;
            node.objectAssignmentInitializer = objectAssignmentInitializer !== undefined ? parenthesizer().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer) : undefined;
            return node;
        }

        function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) {
            return node.name !== name
                || node.objectAssignmentInitializer !== objectAssignmentInitializer
                ? updateNode(createShorthandPropertyAssignmentInternal(node.decorators, node.modifiers, name, node.equalsToken, objectAssignmentInitializer), node)
                : node;
        }

        function createSpreadAssignment(expression: Expression) {
            const node = createNode(SyntaxKind.SpreadAssignment) as SpreadAssignment;
            node.expression = parenthesizer().parenthesizeExpressionForDisallowedComma(expression);
            return node;
        }

        function updateSpreadAssignment(node: SpreadAssignment, expression: Expression) {
            return node.expression !== expression
                ? updateNode(createSpreadAssignment(expression), node)
                : node;
        }


        //
        // Enum
        //

        function createEnumMember(name: string | PropertyName, initializer?: Expression) {
            const node = createNode(SyntaxKind.EnumMember) as EnumMember;
            node.name = asName(name);
            node.initializer = initializer && parenthesizer().parenthesizeExpressionForDisallowedComma(initializer);
            return node;
        }

        function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined) {
            return node.name !== name
                || node.initializer !== initializer
                ? updateNode(createEnumMember(name, initializer), node)
                : node;
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
            const node = createNode(SyntaxKind.SourceFile) as SourceFile;
            node.flags |= source.flags;
            node.statements = createNodeArray(statements);
            node.endOfFileToken = source.endOfFileToken;
            node.fileName = source.fileName;
            node.path = source.path;
            node.text = source.text;
            node.isDeclarationFile = isDeclarationFile;
            node.referencedFiles = referencedFiles;
            node.typeReferenceDirectives = typeReferences;
            node.hasNoDefaultLib = hasNoDefaultLib;
            node.libReferenceDirectives = libReferences;
            if (source.amdDependencies !== undefined) node.amdDependencies = source.amdDependencies;
            if (source.moduleName !== undefined) node.moduleName = source.moduleName;
            if (source.languageVariant !== undefined) node.languageVariant = source.languageVariant;
            if (source.renamedDependencies !== undefined) node.renamedDependencies = source.renamedDependencies;
            if (source.languageVersion !== undefined) node.languageVersion = source.languageVersion;
            if (source.scriptKind !== undefined) node.scriptKind = source.scriptKind;
            if (source.externalModuleIndicator !== undefined) node.externalModuleIndicator = source.externalModuleIndicator;
            if (source.commonJsModuleIndicator !== undefined) node.commonJsModuleIndicator = source.commonJsModuleIndicator;
            if (source.identifiers !== undefined) node.identifiers = source.identifiers;
            if (source.nodeCount !== undefined) node.nodeCount = source.nodeCount;
            if (source.identifierCount !== undefined) node.identifierCount = source.identifierCount;
            if (source.symbolCount !== undefined) node.symbolCount = source.symbolCount;
            if (source.parseDiagnostics !== undefined) node.parseDiagnostics = source.parseDiagnostics;
            if (source.bindDiagnostics !== undefined) node.bindDiagnostics = source.bindDiagnostics;
            if (source.bindSuggestionDiagnostics !== undefined) node.bindSuggestionDiagnostics = source.bindSuggestionDiagnostics;
            if (source.lineMap !== undefined) node.lineMap = source.lineMap;
            if (source.classifiableNames !== undefined) node.classifiableNames = source.classifiableNames;
            if (source.resolvedModules !== undefined) node.resolvedModules = source.resolvedModules;
            if (source.resolvedTypeReferenceDirectiveNames !== undefined) node.resolvedTypeReferenceDirectiveNames = source.resolvedTypeReferenceDirectiveNames;
            if (source.imports !== undefined) node.imports = source.imports;
            if (source.moduleAugmentations !== undefined) node.moduleAugmentations = source.moduleAugmentations;
            if (source.pragmas !== undefined) node.pragmas = source.pragmas;
            if (source.localJsxFactory !== undefined) node.localJsxFactory = source.localJsxFactory;
            if (source.localJsxNamespace !== undefined) node.localJsxNamespace = source.localJsxNamespace;
            return node;
        }

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
                : node;
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
        function createNotEmittedStatement(original: Node) {
            const node = createNode(SyntaxKind.NotEmittedStatement) as NotEmittedStatement;
            node.original = original;
            setTextRange(node, original);
            return node;
        }

        /**
         * Creates a synthetic element to act as a placeholder for the end of an emitted declaration in
         * order to properly emit exports.
         */
        /* @internal */
        function createEndOfDeclarationMarker(original: Node) {
            const node = createNode(SyntaxKind.EndOfDeclarationMarker) as EndOfDeclarationMarker;
            node.emitNode = {} as EmitNode;
            node.original = original;
            return node;
        }

        /**
         * Creates a synthetic element to act as a placeholder for the beginning of a merged declaration in
         * order to properly emit exports.
         */
        /* @internal */
        function createMergeDeclarationMarker(original: Node) {
            const node = createNode(SyntaxKind.MergeDeclarationMarker) as MergeDeclarationMarker;
            node.emitNode = {} as EmitNode;
            node.original = original;
            return node;
        }

        /**
         * Creates a synthetic expression to act as a placeholder for a not-emitted expression in
         * order to preserve comments or sourcemap positions.
         *
         * @param expression The inner expression to emit.
         * @param original The original outer expression.
         */
        function createPartiallyEmittedExpression(expression: Expression, original?: Node) {
            const node = createNode(SyntaxKind.PartiallyEmittedExpression) as PartiallyEmittedExpression;
            node.expression = expression;
            node.original = original;
            setTextRange(node, original);
            return node;
        }

        function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression) {
            if (node.expression !== expression) {
                return updateNode(createPartiallyEmittedExpression(expression, node.original), node);
            }
            return node;
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

        function createCommaList(elements: readonly Expression[]) {
            const node = createNode(SyntaxKind.CommaListExpression) as CommaListExpression;
            node.elements = createNodeArray(sameFlatMap(elements, flattenCommaElements));
            return node;
        }

        function updateCommaList(node: CommaListExpression, elements: readonly Expression[]) {
            return node.elements !== elements
                ? updateNode(createCommaList(elements), node)
                : node;
        }

        function createBundle(sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            const node = createNode(SyntaxKind.Bundle) as Bundle;
            node.prepends = prepends;
            node.sourceFiles = sourceFiles;
            return node;
        }

        function updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends: readonly (UnparsedSource | InputFiles)[] = emptyArray) {
            if (node.sourceFiles !== sourceFiles || node.prepends !== prepends) {
                return createBundle(sourceFiles, prepends);
            }
            return node;
        }

        //
        // Compound Nodes
        //

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


        function createComma(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.CommaToken, right);
        }

        function createLessThan(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.LessThanToken, right);
        }

        function createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
        function createAssignment(left: Expression, right: Expression): BinaryExpression;
        function createAssignment(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.EqualsToken, right);
        }

        function createStrictEquality(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.EqualsEqualsEqualsToken, right);
        }

        function createStrictInequality(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.ExclamationEqualsEqualsToken, right);
        }

        function createAdd(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.PlusToken, right);
        }

        function createSubtract(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.MinusToken, right);
        }

        function createPostfixIncrement(operand: Expression) {
            return factory.createPostfix(operand, SyntaxKind.PlusPlusToken);
        }

        function createLogicalAnd(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.AmpersandAmpersandToken, right);
        }

        function createLogicalOr(left: Expression, right: Expression) {
            return factory.createBinary(left, SyntaxKind.BarBarToken, right);
        }

        function createLogicalNot(operand: Expression) {
            return factory.createPrefix(SyntaxKind.ExclamationToken, operand);
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
                ? createStrictEquality(value, createVoidZero())
                : createStrictEquality(createTypeOf(value), createStringLiteral(tag));
        }

        function createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]) {
            return createCall(
                createPropertyAccess(object, asName(methodName)),
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
            return createObjectLiteral(properties, !singleLine);
        }

        function updateOuterExpression(outerExpression: OuterExpression, expression: Expression) {
            switch (outerExpression.kind) {
                case SyntaxKind.ParenthesizedExpression: return updateParen(outerExpression, expression);
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
            const updated = updateLabel(
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
                thisArg = createThis();
                target = callee;
            }
            else if (callee.kind === SyntaxKind.SuperKeyword) {
                thisArg = createThis();
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
                    target = createPropertyAccess(
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
                    target = createElementAccess(
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
                ? createCommaList(expressions)
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
            const qualifiedName = createPropertyAccess(ns, nodeIsSynthesized(name) ? name : getSynthesizedClone(name));
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
    }

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

    /**
     * Clears any EmitNode entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    export function disposeEmitNodes(sourceFile: SourceFile) {
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

                const sourceFile = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node)));
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
        if (helpers) destEmitNode.helpers = addRange(destEmitNode.helpers, helpers);
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
    export const syntheticNodeFactory = createNodeFactory(createSynthesizedNode, createParenthesizerRules, createNodeConverters);
    export const syntheticNodeConverters = syntheticNodeFactory.getConverters();

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
        react.parent = getParseTreeNode(parent);
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
