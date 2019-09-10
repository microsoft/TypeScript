namespace ts {
    // NOTE: These exports are deprecated in favor of using a `NodeFactory` instance and exist here purely for backwards compatibility reasons.
    export const {
        createNumericLiteral,
        createBigIntLiteral,
        createStringLiteral,
        createStringLiteralFromNode,
        createRegularExpressionLiteral,
        createLoopVariable,
        createUniqueName,
        createOptimisticUniqueName,
        createFileLevelUniqueName,
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
        createParameterDeclaration: createParameter,
        updateParameterDeclaration: updateParameter,
        createDecorator,
        updateDecorator,
        createPropertyDeclaration: createProperty,
        updatePropertyDeclaration: updateProperty,
        createMethodDeclaration: createMethod,
        updateMethodDeclaration: updateMethod,
        createConstructorDeclaration: createConstructor,
        updateConstructorDeclaration: updateConstructor,
        createGetAccessorDeclaration: createGetAccessor,
        updateGetAccessorDeclaration: updateGetAccessor,
        createSetAccessorDeclaration: createSetAccessor,
        updateSetAccessorDeclaration: updateSetAccessor,
        createCallSignature,
        updateCallSignature,
        createConstructSignature,
        updateConstructSignature,
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
        createPropertyAccess,
        updatePropertyAccess,
        createElementAccess,
        updateElementAccess,
        createCall,
        updateCall,
        createNew,
        updateNew,
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
        updateConditional,
        createTemplateExpression,
        updateTemplateExpression,
        createTemplateHead,
        createTemplateMiddle,
        createTemplateTail,
        createNoSubstitutionTemplateLiteral,
        updateYield,
        createSpread,
        updateSpread,
        createOmittedExpression,
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
        /** @deprecated Use `createExpressionStatement` instead. */
        createExpressionStatement: createStatement,
        /** @deprecated Use `updateExpressionStatement` instead. */
        updateExpressionStatement: updateStatement,
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
        createJSDocTypeExpression,
        createJSDocTypeTag,
        createJSDocReturnTag,
        createJSDocThisTag,
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
        updateSourceFile: updateSourceFileNode,
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
        createExternalModuleExport
    } = factory;

    export function createIdentifier(text: string) {
        return factory.createIdentifier(text, /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined);
    }

    export function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier {
        return factory.createTempVariable(recordTempVariable, /*reserveInNestedScopes*/ undefined);
    }

    export function getGeneratedNameForNode(node: Node | undefined): Identifier {
        return factory.getGeneratedNameForNode(node, /*flags*/ undefined);
    }

    export function createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration {
        return factory.createIndexSignature(decorators, modifiers, parameters, type);
    }

    /** If a node is passed, creates a string literal whose source text is read from a source node during emit. */
    export function createLiteral(value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
    export function createLiteral(value: number | PseudoBigInt): NumericLiteral;
    export function createLiteral(value: boolean): BooleanLiteral;
    export function createLiteral(value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    export function createLiteral(value: string | number | PseudoBigInt | boolean | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): PrimaryExpression {
        if (typeof value === "number") {
            return createNumericLiteral(value + "");
        }
        if (typeof value === "object" && "base10Value" in value) { // PseudoBigInt
            return createBigIntLiteral(pseudoBigIntToString(value) + "n");
        }
        if (typeof value === "boolean") {
            return value ? createTrue() : createFalse();
        }
        if (isString(value)) {
            return createStringLiteral(value, /*isSingleQuote*/ undefined);
        }
        return createStringLiteralFromNode(value);
    }

    export function createMethodSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return factory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
    }

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

    export function createTypeOperatorNode(type: TypeNode): TypeOperatorNode;
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
    export function createTaggedTemplate(tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
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

    /** @deprecated */
    export function updateTaggedTemplate(node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
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

    export function createConditional(condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
    export function createConditional(condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    export function createConditional(condition: Expression, questionTokenOrWhenTrue: QuestionToken | Expression, whenTrueOrWhenFalse: Expression, colonToken?: ColonToken, whenFalse?: Expression) {
        let questionToken: QuestionToken;
        let whenTrue: Expression;
        if (!whenFalse) {
            questionToken = createToken(SyntaxKind.QuestionToken);
            whenTrue = questionTokenOrWhenTrue as Expression;
            colonToken = createToken(SyntaxKind.ColonToken);
            whenFalse = whenTrueOrWhenFalse;
        }
        else {
            questionToken = questionTokenOrWhenTrue as QuestionToken;
            whenTrue = whenTrueOrWhenFalse;
        }
        return factory.createConditional(condition, questionToken, whenTrue, colonToken!, whenFalse);
    }

    export function createYield(expression?: Expression): YieldExpression;
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

    export function createClassExpression(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return factory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }

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

    export function updatePropertySignature(
        node: PropertySignature,
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined
    ) {
        return node.modifiers !== modifiers
            || node.name !== name
            || node.questionToken !== questionToken
            || node.type !== type
            || node.initializer !== initializer
            ? updateNode(createPropertySignature(modifiers, name, questionToken, type, initializer), node)
            : node;
    }

    export function createExpressionWithTypeArguments(typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.createExpressionWithTypeArguments(expression, typeArguments);
    }

    export function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) {
        return factory.updateExpressionWithTypeArguments(node, expression, typeArguments);
    }
}