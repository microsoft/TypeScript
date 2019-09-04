namespace ts {
    // NOTE: These exports are deprecated in favor of using a `NodeFactory` instance, and have been moved to services for backwards compatibility reasons.
    export const {
        createNumericLiteral,
        createBigIntLiteral,
        createStringLiteral,
        createStringLiteralFromNode,
        createRegularExpressionLiteral,
        createIdentifier,
        /** @internal */ updateIdentifier,
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
        createIndexSignature,
        updateIndexSignature,
        /*@internal*/ createSignatureDeclaration,
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
        createJSDocParamTag,
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
        createExternalModuleExport,
        /*@internal*/ recreateOuterExpressions
    } = syntheticNodeFactory;

    /* @internal */ export function createLiteral(value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier, isSingleQuote: boolean): StringLiteral; // tslint:disable-line unified-signatures
    /** If a node is passed, creates a string literal whose source text is read from a source node during emit. */
    export function createLiteral(value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
    export function createLiteral(value: number | PseudoBigInt): NumericLiteral;
    export function createLiteral(value: boolean): BooleanLiteral;
    export function createLiteral(value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    export function createLiteral(value: string | number | PseudoBigInt | boolean | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier, isSingleQuote?: boolean): PrimaryExpression {
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
            const res = createStringLiteral(value);
            if (isSingleQuote) res.singleQuote = true;
            return res;
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
        return syntheticNodeFactory.createMethodSignature(/*modifiers*/ undefined, name, questionToken, typeParameters, parameters, type);
    }

    export function updateMethodSignature(
        node: MethodSignature,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined
    ) {
        return syntheticNodeFactory.updateMethodSignature(node, node.modifiers, name, questionToken, typeParameters, parameters, type);
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
        return syntheticNodeFactory.createTypeOperatorNode(operator, type);
    }

    /** @deprecated */
    export function createTaggedTemplate(tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
    export function createTaggedTemplate(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    /** @internal */
    export function createTaggedTemplate(tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral): TaggedTemplateExpression;
    export function createTaggedTemplate(tag: Expression, typeArgumentsOrTemplate: readonly TypeNode[] | TemplateLiteral | undefined, template?: TemplateLiteral) {
        let typeArguments: readonly TypeNode[] | undefined;
        if (template) {
            typeArguments = typeArgumentsOrTemplate as readonly TypeNode[] | undefined;
        }
        else {
            template = typeArgumentsOrTemplate as TemplateLiteral;
        }
        return syntheticNodeFactory.createTaggedTemplate(tag, typeArguments, template);
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
        return syntheticNodeFactory.updateTaggedTemplate(node, tag, typeArguments, template);
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
        return syntheticNodeFactory.createConditional(condition, questionToken, whenTrue, colonToken!, whenFalse);
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
        return syntheticNodeFactory.createYield(asteriskToken, expression);
    }

    export function createClassExpression(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return syntheticNodeFactory.createClassExpression(/*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }

    export function updateClassExpression(
        node: ClassExpression,
        modifiers: readonly Modifier[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[]
    ) {
        return syntheticNodeFactory.updateClassExpression(node, /*decorators*/ undefined, modifiers, name, typeParameters, heritageClauses, members);
    }

    export function createPropertySignature(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName | string,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer?: Expression
    ): PropertySignature {
        const node = syntheticNodeFactory.createPropertySignature(modifiers, name, questionToken, type);
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
}

/* @internal */
namespace ts {
    const syntheticParenthesizerRules = syntheticNodeFactory.getParenthesizerRules();

    export const {
        parenthesizeConditionOfConditionalExpression: parenthesizeForConditionalHead,
        parenthesizeBranchOfConditionalExpression: parenthesizeSubexpressionOfConditionalExpression,
        parenthesizeExpressionOfExportDefault: parenthesizeDefaultExpression,
        parenthesizeExpressionOfNew: parenthesizeForNew,
        parenthesizeLeftSideOfAccess: parenthesizeForAccess,
        parenthesizeOperandOfPrefixUnary: parenthesizePrefixOperand,
        parenthesizeOperandOfPostfixUnary: parenthesizePostfixOperand,
        parenthesizeExpressionsOfCommaDelimitedList: parenthesizeListElements,
        parenthesizeExpressionForDisallowedComma: parenthesizeExpressionForList,
        parenthesizeExpressionOfExpressionStatement: parenthesizeExpressionForExpressionStatement,
        parenthesizeConciseBodyOfArrowFunction: parenthesizeConciseBody,
        parenthesizeMemberOfConditionalType: parenthesizeConditionalTypeMember,
        parenthesizeMemberOfElementType: parenthesizeElementTypeMember,
        parenthesizeElementTypeOfArrayType: parenthesizeArrayTypeMember,
        parenthesizeConstituentTypesOfUnionOrIntersectionType: parenthesizeElementTypeMembers,
        parenthesizeTypeArguments: parenthesizeTypeParameters,
    } = syntheticParenthesizerRules;

    /**
     * Wraps the operand to a BinaryExpression in parentheses if they are needed to preserve the intended
     * order of operations.
     *
     * @param binaryOperator The operator for the BinaryExpression.
     * @param operand The operand for the BinaryExpression.
     * @param isLeftSideOfBinary A value indicating whether the operand is the left side of the
     *                           BinaryExpression.
     */
    export function parenthesizeBinaryOperand(binaryOperator: SyntaxKind, operand: Expression, isLeftSideOfBinary: boolean, leftOperand?: Expression) {
        return isLeftSideOfBinary ? syntheticParenthesizerRules.parenthesizeLeftSideOfBinary(binaryOperator, operand) :
            syntheticParenthesizerRules.parenthesizeRightSideOfBinary(binaryOperator, leftOperand, operand);
    }
}