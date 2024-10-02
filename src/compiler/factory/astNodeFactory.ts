import {
    AstArrayBindingElement,
    AstArrayBindingPattern,
    AstArrayLiteralExpression,
    AstArrayTypeNode,
    AstArrowFunction,
    AstAsExpression,
    AstAssertClause,
    AstAssertEntry,
    AstAssertionKey,
    AstAssertsKeyword,
    AstAsteriskToken,
    AstAwaitExpression,
    AstAwaitKeyword,
    AstBaseJSDocTag,
    AstBigIntLiteral,
    AstBinaryExpression,
    AstBinaryOperatorToken,
    AstBindingElement,
    AstBindingName,
    AstBlock,
    AstBooleanLiteral,
    AstBreakStatement,
    AstBundle,
    AstCallChain,
    AstCallExpression,
    AstCallSignatureDeclaration,
    AstCaseBlock,
    AstCaseClause,
    AstCaseOrDefaultClause,
    AstCatchClause,
    AstClassDeclaration,
    AstClassElement,
    AstClassExpression,
    AstClassStaticBlockDeclaration,
    AstColonToken,
    AstCommaListExpression,
    AstComputedPropertyName,
    AstConciseBody,
    AstConditionalExpression,
    AstConditionalTypeNode,
    AstConstructorDeclaration,
    AstConstructorTypeNode,
    AstConstructSignatureDeclaration,
    AstContinueStatement,
    AstDebuggerStatement,
    AstDeclarationName,
    AstDecorator,
    AstDefaultClause,
    AstDeleteExpression,
    AstDoStatement,
    AstDotDotDotToken,
    AstElementAccessChain,
    AstElementAccessExpression,
    AstEmptyStatement,
    AstEndOfFileToken,
    AstEntityName,
    AstEnumDeclaration,
    AstEnumMember,
    AstEqualsGreaterThanToken,
    AstExclamationToken,
    AstExportAssignment,
    AstExportDeclaration,
    AstExportSpecifier,
    AstExpression,
    AstExpressionStatement,
    AstExpressionWithTypeArguments,
    AstExternalModuleReference,
    AstFalseLiteral,
    AstForInitializer,
    AstForInStatement,
    AstForOfStatement,
    AstForStatement,
    AstFunctionDeclaration,
    AstFunctionExpression,
    AstFunctionTypeNode,
    AstGetAccessorDeclaration,
    AstHeritageClause,
    AstIdentifier,
    AstIfStatement,
    AstImportAttribute,
    AstImportAttributeName,
    AstImportAttributes,
    AstImportClause,
    AstImportDeclaration,
    AstImportEqualsDeclaration,
    AstImportSpecifier,
    AstImportTypeAssertionContainer,
    AstImportTypeNode,
    AstIndexedAccessTypeNode,
    AstIndexSignatureDeclaration,
    AstInferTypeNode,
    AstInterfaceDeclaration,
    AstIntersectionTypeNode,
    AstJSDoc,
    AstJSDocAllType,
    AstJSDocAugmentsTag,
    AstJSDocAuthorTag,
    AstJSDocCallbackTag,
    AstJSDocClassTag,
    AstJSDocComment,
    AstJSDocDeprecatedTag,
    AstJSDocEnumTag,
    AstJSDocFunctionType,
    AstJSDocImplementsTag,
    AstJSDocImportTag,
    AstJSDocLink,
    AstJSDocLinkCode,
    AstJSDocLinkPlain,
    AstJSDocMemberName,
    AstJSDocNamepathType,
    AstJSDocNameReference,
    AstJSDocNamespaceBody,
    AstJSDocNamespaceDeclaration,
    AstJSDocNonNullableType,
    AstJSDocNullableType,
    AstJSDocOptionalType,
    AstJSDocOverloadTag,
    AstJSDocOverrideTag,
    AstJSDocParameterTag,
    AstJSDocPrivateTag,
    AstJSDocPropertyLikeTag,
    AstJSDocPropertyTag,
    AstJSDocProtectedTag,
    AstJSDocPublicTag,
    AstJSDocReadonlyTag,
    AstJSDocReturnTag,
    AstJSDocSatisfiesTag,
    AstJSDocSeeTag,
    AstJSDocSignature,
    AstJSDocTag,
    AstJSDocTemplateTag,
    AstJSDocText,
    AstJSDocThisTag,
    AstJSDocThrowsTag,
    AstJSDocTypedefTag,
    AstJSDocTypeExpression,
    AstJSDocTypeLiteral,
    AstJSDocTypeTag,
    AstJSDocUnknownTag,
    AstJSDocUnknownType,
    AstJSDocVariadicType,
    AstJsxAttribute,
    AstJsxAttributeLike,
    AstJsxAttributeName,
    AstJsxAttributes,
    AstJsxAttributeValue,
    AstJsxChild,
    AstJsxClosingElement,
    AstJsxClosingFragment,
    AstJsxElement,
    AstJsxExpression,
    AstJsxFragment,
    AstJsxNamespacedName,
    AstJsxOpeningElement,
    AstJsxOpeningFragment,
    AstJsxSelfClosingElement,
    AstJsxSpreadAttribute,
    AstJsxTagNameExpression,
    AstJsxText,
    AstKeywordToken,
    AstKeywordTypeNode,
    AstLabeledStatement,
    AstLeftHandSideExpression,
    AstLiteralToken,
    AstLiteralTypeNode,
    AstMappedTypeNode,
    AstMemberName,
    AstMetaProperty,
    AstMethodDeclaration,
    AstMethodSignature,
    AstMinusToken,
    AstMissingDeclaration,
    AstModifier,
    AstModifierLike,
    AstModifierToken,
    AstModuleBlock,
    AstModuleBody,
    AstModuleDeclaration,
    AstModuleExportName,
    AstModuleName,
    AstModuleReference,
    AstNamedExportBindings,
    AstNamedExports,
    AstNamedImportBindings,
    AstNamedImports,
    AstNamedTupleMember,
    AstNamespaceExport,
    AstNamespaceExportDeclaration,
    AstNamespaceImport,
    AstNewExpression,
    AstNode,
    AstNodeArray,
    AstNonNullChain,
    AstNonNullExpression,
    AstNoSubstitutionTemplateLiteral,
    AstNotEmittedStatement,
    AstNotEmittedTypeElement,
    AstNullLiteral,
    AstNumericLiteral,
    AstObjectBindingPattern,
    AstObjectLiteralElementLike,
    AstObjectLiteralExpression,
    AstOmittedExpression,
    AstOptionalTypeNode,
    AstOuterExpression,
    AstParameterDeclaration,
    AstParenthesizedExpression,
    AstParenthesizedTypeNode,
    AstParenthesizerRules,
    AstPartiallyEmittedExpression,
    AstPlusToken,
    AstPostfixUnaryExpression,
    AstPrefixUnaryExpression,
    AstPrivateIdentifier,
    AstPropertyAccessChain,
    AstPropertyAccessExpression,
    AstPropertyAssignment,
    AstPropertyDeclaration,
    AstPropertyName,
    AstPropertySignature,
    AstPunctuationToken,
    AstQualifiedName,
    AstQuestionDotToken,
    AstQuestionToken,
    AstReadonlyKeyword,
    AstRegularExpressionLiteral,
    AstRestTypeNode,
    AstReturnStatement,
    AstSatisfiesExpression,
    AstSemicolonClassElement,
    AstSetAccessorDeclaration,
    AstShorthandPropertyAssignment,
    AstSourceFile,
    AstSpreadAssignment,
    AstSpreadElement,
    AstStatement,
    AstStringLiteral,
    AstSuperExpression,
    AstSwitchStatement,
    AstSyntaxList,
    AstSyntheticExpression,
    AstSyntheticReferenceExpression,
    AstTaggedTemplateExpression,
    AstTemplateExpression,
    AstTemplateHead,
    AstTemplateLiteral,
    AstTemplateLiteralToken,
    AstTemplateLiteralTypeNode,
    AstTemplateLiteralTypeSpan,
    AstTemplateMiddle,
    AstTemplateSpan,
    AstTemplateTail,
    AstThisExpression,
    AstThisTypeNode,
    AstThrowStatement,
    AstToken,
    AstTrueLiteral,
    AstTryStatement,
    AstTupleTypeNode,
    AstTypeAliasDeclaration,
    AstTypeAssertion,
    AstTypeElement,
    AstTypeLiteralNode,
    AstTypeNode,
    AstTypeOfExpression,
    AstTypeOperatorNode,
    AstTypeParameterDeclaration,
    AstTypePredicateNode,
    AstTypeQueryNode,
    AstTypeReferenceNode,
    AstUnionTypeNode,
    AstVariableDeclaration,
    AstVariableDeclarationList,
    AstVariableStatement,
    AstVoidExpression,
    AstWhileStatement,
    AstWithStatement,
    AstYieldExpression,
    BinaryOperator,
    cast,
    CharacterCodes,
    createAstParenthesizerRules,
    createScanner,
    Debug,
    EmitFlags,
    escapeLeadingUnderscores,
    FileReference,
    getCommentRange,
    getIdentifierAutoGenerate,
    getIdentifierTypeArguments,
    getSourceMapRange,
    getSyntheticLeadingComments,
    getSyntheticTrailingComments,
    identity,
    astIsBinaryExpression,
    astIsCallChain,
    astIsCommaListExpression,
    astIsCommaToken,
    astIsElementAccessChain,
    astIsExclamationToken,
    astIsIdentifier,
    astIsNonNullChain,
    astIsNotEmittedStatement,
    astIsOmittedExpression,
    astIsParenthesizedExpression,
    astIsPrivateIdentifier,
    astIsPropertyAccessChain,
    astIsQuestionToken,
    astIsVariableDeclaration,
    isParseTreeNode,
    KeywordSyntaxKind,
    KeywordTypeSyntaxKind,
    LanguageVariant,
    lastOrUndefined,
    LiteralToken,
    memoize,
    mergeEmitNode,
    MetaProperty,
    ModifierFlags,
    ModifierSyntaxKind,
    Node,
    NodeFactoryFlags,
    NodeFlags,
    nodeIsSynthesized,
    nullAstParenthesizerRules,
    OuterExpressionKinds,
    PostfixUnaryOperator,
    PrefixUnaryOperator,
    PseudoBigInt,
    pseudoBigIntToString,
    PunctuationSyntaxKind,
    RedirectInfo,
    sameFlatMap,
    Scanner,
    ScriptTarget,
    setEmitFlags,
    setIdentifierAutoGenerate,
    setIdentifierTypeArguments,
    setTextRange,
    some,
    SourceFile,
    startsWith,
    SyntaxKind,
    TokenFlags,
    TokenSyntaxKind,
    TransformFlags,
    Type,
    astIsOuterExpression,
    astNodeIsSynthesized,
    astSetComment,
    astGetComment,
    AstHasComment,
} from "../_namespaces/ts.js";

/** @internal */
export interface AstGeneratedNamePart {
    /** an additional prefix to insert before the text sourced from `node` */
    prefix?: string;
    node: AstIdentifier | AstPrivateIdentifier;
    /** an additional suffix to insert after the text sourced from `node` */
    suffix?: string;
}

/** @internal */
export interface AstPropertyDescriptorAttributes {
    enumerable?: boolean | AstExpression;
    configurable?: boolean | AstExpression;
    writable?: boolean | AstExpression;
    value?: AstExpression;
    get?: AstExpression;
    set?: AstExpression;
}

/** @internal */
export interface AstCallBinding {
    target: AstLeftHandSideExpression;
    thisArg: AstExpression;
}

/** @internal */
export type AstVisitResult<T extends AstNode | undefined> = T | AstNodeArrayLike<AstNode>;

/** @internal */
export type AstNodeArrayLike<T extends AstNode> = readonly T[] | AstNodeArray<T>;

/** @internal */
export interface AstNodeFactory {
    /** @internal */ readonly parenthesizer: AstParenthesizerRules;
    // /** @internal */ readonly converters: NodeConverters;
    /** @internal */ readonly flags: NodeFactoryFlags;

    createNodeArray<T extends AstNode>(elements?: readonly T[], hasTrailingComma?: boolean): AstNodeArray<T>;

    //
    // Literals
    //

    createNumericLiteral(value: string | number, numericLiteralFlags?: TokenFlags): AstNumericLiteral;
    createBigIntLiteral(value: string | PseudoBigInt): AstBigIntLiteral;
    createStringLiteral(text: string, isSingleQuote?: boolean): AstStringLiteral;
    /** @internal */ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): AstStringLiteral; // eslint-disable-line @typescript-eslint/unified-signatures
    createRegularExpressionLiteral(text: string): AstRegularExpressionLiteral;

    //
    // Identifiers
    //

    createIdentifier(text: string): AstIdentifier;
    /** @internal */ createIdentifier(text: string, hasExtendedUnicodeEscape?: boolean): AstIdentifier; // eslint-disable-line @typescript-eslint/unified-signatures

    createPrivateIdentifier(text: string): AstPrivateIdentifier;

    //
    // Punctuation
    //

    createToken(token: SyntaxKind.SuperKeyword): AstSuperExpression;
    createToken(token: SyntaxKind.ThisKeyword): AstThisExpression;
    createToken(token: SyntaxKind.NullKeyword): AstNullLiteral;
    createToken(token: SyntaxKind.TrueKeyword): AstTrueLiteral;
    createToken(token: SyntaxKind.FalseKeyword): AstFalseLiteral;
    createToken(token: SyntaxKind.EndOfFileToken): AstEndOfFileToken;
    createToken(token: SyntaxKind.Unknown): AstToken<SyntaxKind.Unknown>;
    createToken<TKind extends PunctuationSyntaxKind>(token: TKind): AstPunctuationToken<TKind>;
    createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): AstKeywordTypeNode<TKind>;
    createToken<TKind extends ModifierSyntaxKind>(token: TKind): AstModifierToken<TKind>;
    createToken<TKind extends KeywordSyntaxKind>(token: TKind): AstKeywordToken<TKind>;
    /** @internal */ createToken<TKind extends TokenSyntaxKind>(token: TKind): AstToken<TKind>;

    //
    // Reserved words
    //

    createSuper(): AstSuperExpression;
    createThis(): AstThisExpression;
    createNull(): AstNullLiteral;
    createTrue(): AstTrueLiteral;
    createFalse(): AstFalseLiteral;

    //
    // Modifiers
    //

    createModifier<T extends ModifierSyntaxKind>(kind: T): AstModifierToken<T>;
    createModifiersFromModifierFlags(flags: ModifierFlags): AstModifier[] | undefined;

    //
    // Names
    //

    createQualifiedName(left: AstEntityName, right: string | AstIdentifier): AstQualifiedName;
    updateQualifiedName(node: AstQualifiedName, left: AstEntityName, right: AstIdentifier): AstQualifiedName;
    createComputedPropertyName(expression: AstExpression): AstComputedPropertyName;
    updateComputedPropertyName(node: AstComputedPropertyName, expression: AstExpression): AstComputedPropertyName;

    //
    // Signature elements
    //

    createTypeParameterDeclaration(modifiers: AstNodeArrayLike<AstModifier> | undefined, name: string | AstIdentifier, constraint?: AstTypeNode, defaultType?: AstTypeNode): AstTypeParameterDeclaration;
    updateTypeParameterDeclaration(node: AstTypeParameterDeclaration, modifiers: AstNodeArrayLike<AstModifier> | undefined, name: AstIdentifier, constraint: AstTypeNode | undefined, defaultType: AstTypeNode | undefined): AstTypeParameterDeclaration;
    createParameterDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, dotDotDotToken: AstDotDotDotToken | undefined, name: string | AstBindingName, questionToken?: AstQuestionToken, type?: AstTypeNode, initializer?: AstExpression): AstParameterDeclaration;
    updateParameterDeclaration(node: AstParameterDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, dotDotDotToken: AstDotDotDotToken | undefined, name: string | AstBindingName, questionToken: AstQuestionToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined): AstParameterDeclaration;
    createDecorator(expression: AstExpression): AstDecorator;
    updateDecorator(node: AstDecorator, expression: AstExpression): AstDecorator;

    //
    // Type Elements
    //

    createPropertySignature(modifiers: AstNodeArrayLike<AstModifier> | undefined, name: AstPropertyName | string, questionToken: AstQuestionToken | undefined, type: AstTypeNode | undefined): AstPropertySignature;
    updatePropertySignature(node: AstPropertySignature, modifiers: AstNodeArrayLike<AstModifier> | undefined, name: AstPropertyName, questionToken: AstQuestionToken | undefined, type: AstTypeNode | undefined): AstPropertySignature;
    createPropertyDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstPropertyName, questionOrExclamationToken: AstQuestionToken | AstExclamationToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined): AstPropertyDeclaration;
    updatePropertyDeclaration(node: AstPropertyDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstPropertyName, questionOrExclamationToken: AstQuestionToken | AstExclamationToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined): AstPropertyDeclaration;
    createMethodSignature(modifiers: AstNodeArrayLike<AstModifier> | undefined, name: string | AstPropertyName, questionToken: AstQuestionToken | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstMethodSignature;
    updateMethodSignature(node: AstMethodSignature, modifiers: AstNodeArrayLike<AstModifier> | undefined, name: AstPropertyName, questionToken: AstQuestionToken | undefined, typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArray<AstParameterDeclaration>, type: AstTypeNode | undefined): AstMethodSignature;
    createMethodDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, asteriskToken: AstAsteriskToken | undefined, name: string | AstPropertyName, questionToken: AstQuestionToken | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstMethodDeclaration;
    updateMethodDeclaration(node: AstMethodDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, asteriskToken: AstAsteriskToken | undefined, name: AstPropertyName, questionToken: AstQuestionToken | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstMethodDeclaration;
    createConstructorDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, body: AstBlock | undefined): AstConstructorDeclaration;
    updateConstructorDeclaration(node: AstConstructorDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, body: AstBlock | undefined): AstConstructorDeclaration;
    createGetAccessorDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstPropertyName, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstGetAccessorDeclaration;
    updateGetAccessorDeclaration(node: AstGetAccessorDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstPropertyName, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstGetAccessorDeclaration;
    createSetAccessorDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstPropertyName, parameters: AstNodeArrayLike<AstParameterDeclaration>, body: AstBlock | undefined): AstSetAccessorDeclaration;
    updateSetAccessorDeclaration(node: AstSetAccessorDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstPropertyName, parameters: AstNodeArrayLike<AstParameterDeclaration>, body: AstBlock | undefined): AstSetAccessorDeclaration;
    createCallSignature(typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstCallSignatureDeclaration;
    updateCallSignature(node: AstCallSignatureDeclaration, typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArray<AstParameterDeclaration>, type: AstTypeNode | undefined): AstCallSignatureDeclaration;
    createConstructSignature(typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstConstructSignatureDeclaration;
    updateConstructSignature(node: AstConstructSignatureDeclaration, typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArray<AstParameterDeclaration>, type: AstTypeNode | undefined): AstConstructSignatureDeclaration;
    createIndexSignature(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode): AstIndexSignatureDeclaration;
    /** @internal */ createIndexSignature(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstIndexSignatureDeclaration; // eslint-disable-line @typescript-eslint/unified-signatures
    updateIndexSignature(node: AstIndexSignatureDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode): AstIndexSignatureDeclaration;
    createTemplateLiteralTypeSpan(type: AstTypeNode, literal: AstTemplateMiddle | AstTemplateTail): AstTemplateLiteralTypeSpan;
    updateTemplateLiteralTypeSpan(node: AstTemplateLiteralTypeSpan, type: AstTypeNode, literal: AstTemplateMiddle | AstTemplateTail): AstTemplateLiteralTypeSpan;
    createClassStaticBlockDeclaration(body: AstBlock): AstClassStaticBlockDeclaration;
    updateClassStaticBlockDeclaration(node: AstClassStaticBlockDeclaration, body: AstBlock): AstClassStaticBlockDeclaration;

    //
    // Types
    //

    createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): AstKeywordTypeNode<TKind>;
    createTypePredicateNode(assertsModifier: AstAssertsKeyword | undefined, parameterName: AstIdentifier | AstThisTypeNode | string, type: AstTypeNode | undefined): AstTypePredicateNode;
    updateTypePredicateNode(node: AstTypePredicateNode, assertsModifier: AstAssertsKeyword | undefined, parameterName: AstIdentifier | AstThisTypeNode, type: AstTypeNode | undefined): AstTypePredicateNode;
    createTypeReferenceNode(typeName: string | AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>): AstTypeReferenceNode;
    updateTypeReferenceNode(node: AstTypeReferenceNode, typeName: AstEntityName, typeArguments: AstNodeArray<AstTypeNode> | undefined): AstTypeReferenceNode;
    createFunctionTypeNode(typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode): AstFunctionTypeNode;
    updateFunctionTypeNode(node: AstFunctionTypeNode, typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArray<AstParameterDeclaration>, type: AstTypeNode): AstFunctionTypeNode;
    createConstructorTypeNode(modifiers: AstNodeArrayLike<AstModifier> | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode): AstConstructorTypeNode;
    updateConstructorTypeNode(node: AstConstructorTypeNode, modifiers: AstNodeArrayLike<AstModifier> | undefined, typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArray<AstParameterDeclaration>, type: AstTypeNode): AstConstructorTypeNode;
    createTypeQueryNode(exprName: AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>): AstTypeQueryNode;
    updateTypeQueryNode(node: AstTypeQueryNode, exprName: AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>): AstTypeQueryNode;
    createTypeLiteralNode(members: AstNodeArrayLike<AstTypeElement> | undefined): AstTypeLiteralNode;
    updateTypeLiteralNode(node: AstTypeLiteralNode, members: AstNodeArray<AstTypeElement>): AstTypeLiteralNode;
    createArrayTypeNode(elementType: AstTypeNode): AstArrayTypeNode;
    updateArrayTypeNode(node: AstArrayTypeNode, elementType: AstTypeNode): AstArrayTypeNode;
    createTupleTypeNode(elements: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>): AstTupleTypeNode;
    updateTupleTypeNode(node: AstTupleTypeNode, elements: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>): AstTupleTypeNode;
    createNamedTupleMember(dotDotDotToken: AstDotDotDotToken | undefined, name: AstIdentifier, questionToken: AstQuestionToken | undefined, type: AstTypeNode): AstNamedTupleMember;
    updateNamedTupleMember(node: AstNamedTupleMember, dotDotDotToken: AstDotDotDotToken | undefined, name: AstIdentifier, questionToken: AstQuestionToken | undefined, type: AstTypeNode): AstNamedTupleMember;
    createOptionalTypeNode(type: AstTypeNode): AstOptionalTypeNode;
    updateOptionalTypeNode(node: AstOptionalTypeNode, type: AstTypeNode): AstOptionalTypeNode;
    createRestTypeNode(type: AstTypeNode): AstRestTypeNode;
    updateRestTypeNode(node: AstRestTypeNode, type: AstTypeNode): AstRestTypeNode;
    createUnionTypeNode(types: AstNodeArrayLike<AstTypeNode>): AstUnionTypeNode;
    updateUnionTypeNode(node: AstUnionTypeNode, types: AstNodeArray<AstTypeNode>): AstUnionTypeNode;
    createIntersectionTypeNode(types: AstNodeArrayLike<AstTypeNode>): AstIntersectionTypeNode;
    updateIntersectionTypeNode(node: AstIntersectionTypeNode, types: AstNodeArray<AstTypeNode>): AstIntersectionTypeNode;
    createConditionalTypeNode(checkType: AstTypeNode, extendsType: AstTypeNode, trueType: AstTypeNode, falseType: AstTypeNode): AstConditionalTypeNode;
    updateConditionalTypeNode(node: AstConditionalTypeNode, checkType: AstTypeNode, extendsType: AstTypeNode, trueType: AstTypeNode, falseType: AstTypeNode): AstConditionalTypeNode;
    createInferTypeNode(typeParameter: AstTypeParameterDeclaration): AstInferTypeNode;
    updateInferTypeNode(node: AstInferTypeNode, typeParameter: AstTypeParameterDeclaration): AstInferTypeNode;
    createImportTypeNode(argument: AstTypeNode, attributes?: AstImportAttributes, qualifier?: AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>, isTypeOf?: boolean): AstImportTypeNode;
    updateImportTypeNode(node: AstImportTypeNode, argument: AstTypeNode, attributes: AstImportAttributes | undefined, qualifier: AstEntityName | undefined, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, isTypeOf?: boolean): AstImportTypeNode;
    createParenthesizedType(type: AstTypeNode): AstParenthesizedTypeNode;
    updateParenthesizedType(node: AstParenthesizedTypeNode, type: AstTypeNode): AstParenthesizedTypeNode;
    createThisTypeNode(): AstThisTypeNode;
    createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: AstTypeNode): AstTypeOperatorNode;
    updateTypeOperatorNode(node: AstTypeOperatorNode, type: AstTypeNode): AstTypeOperatorNode;
    createIndexedAccessTypeNode(objectType: AstTypeNode, indexType: AstTypeNode): AstIndexedAccessTypeNode;
    updateIndexedAccessTypeNode(node: AstIndexedAccessTypeNode, objectType: AstTypeNode, indexType: AstTypeNode): AstIndexedAccessTypeNode;
    createMappedTypeNode(readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined, typeParameter: AstTypeParameterDeclaration, nameType: AstTypeNode | undefined, questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined, type: AstTypeNode | undefined, members: AstNodeArray<AstTypeElement> | undefined): AstMappedTypeNode;
    updateMappedTypeNode(node: AstMappedTypeNode, readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined, typeParameter: AstTypeParameterDeclaration, nameType: AstTypeNode | undefined, questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined, type: AstTypeNode | undefined, members: AstNodeArray<AstTypeElement> | undefined): AstMappedTypeNode;
    createLiteralTypeNode(literal: AstLiteralTypeNode["data"]["literal"]): AstLiteralTypeNode;
    updateLiteralTypeNode(node: AstLiteralTypeNode, literal: AstLiteralTypeNode["data"]["literal"]): AstLiteralTypeNode;
    createTemplateLiteralType(head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateLiteralTypeSpan>): AstTemplateLiteralTypeNode;
    updateTemplateLiteralType(node: AstTemplateLiteralTypeNode, head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateLiteralTypeSpan>): AstTemplateLiteralTypeNode;

    //
    // Binding Patterns
    //

    createObjectBindingPattern(elements: AstNodeArrayLike<AstBindingElement>): AstObjectBindingPattern;
    updateObjectBindingPattern(node: AstObjectBindingPattern, elements: AstNodeArrayLike<AstBindingElement>): AstObjectBindingPattern;
    createArrayBindingPattern(elements: AstNodeArrayLike<AstArrayBindingElement>): AstArrayBindingPattern;
    updateArrayBindingPattern(node: AstArrayBindingPattern, elements: AstNodeArrayLike<AstArrayBindingElement>): AstArrayBindingPattern;
    createBindingElement(dotDotDotToken: AstDotDotDotToken | undefined, propertyName: string | AstPropertyName | undefined, name: string | AstBindingName, initializer?: AstExpression): AstBindingElement;
    updateBindingElement(node: AstBindingElement, dotDotDotToken: AstDotDotDotToken | undefined, propertyName: AstPropertyName | undefined, name: AstBindingName, initializer: AstExpression | undefined): AstBindingElement;

    //
    // Expression
    //

    createArrayLiteralExpression(elements?: AstNodeArrayLike<AstExpression>, multiLine?: boolean): AstArrayLiteralExpression;
    updateArrayLiteralExpression(node: AstArrayLiteralExpression, elements: AstNodeArrayLike<AstExpression>): AstArrayLiteralExpression;
    createObjectLiteralExpression(properties?: AstNodeArrayLike<AstObjectLiteralElementLike>, multiLine?: boolean): AstObjectLiteralExpression;
    updateObjectLiteralExpression(node: AstObjectLiteralExpression, properties: AstNodeArrayLike<AstObjectLiteralElementLike>): AstObjectLiteralExpression;
    createPropertyAccessExpression(expression: AstExpression, name: string | AstMemberName): AstPropertyAccessExpression;
    updatePropertyAccessExpression(node: AstPropertyAccessExpression, expression: AstExpression, name: AstMemberName): AstPropertyAccessExpression;
    createPropertyAccessChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, name: string | AstMemberName): AstPropertyAccessChain;
    updatePropertyAccessChain(node: AstPropertyAccessChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, name: AstMemberName): AstPropertyAccessChain;
    createElementAccessExpression(expression: AstExpression, index: number | AstExpression): AstElementAccessExpression;
    updateElementAccessExpression(node: AstElementAccessExpression, expression: AstExpression, argumentExpression: AstExpression): AstElementAccessExpression;
    createElementAccessChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, index: number | AstExpression): AstElementAccessChain;
    updateElementAccessChain(node: AstElementAccessChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, argumentExpression: AstExpression): AstElementAccessChain;
    createCallExpression(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined): AstCallExpression;
    updateCallExpression(node: AstCallExpression, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression>): AstCallExpression;
    createCallChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined): AstCallChain;
    updateCallChain(node: AstCallChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression>): AstCallChain;
    createNewExpression(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined): AstNewExpression;
    updateNewExpression(node: AstNewExpression, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined): AstNewExpression;
    createTaggedTemplateExpression(tag: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, template: AstTemplateLiteral): AstTaggedTemplateExpression;
    updateTaggedTemplateExpression(node: AstTaggedTemplateExpression, tag: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, template: AstTemplateLiteral): AstTaggedTemplateExpression;
    createTypeAssertion(type: AstTypeNode, expression: AstExpression): AstTypeAssertion;
    updateTypeAssertion(node: AstTypeAssertion, type: AstTypeNode, expression: AstExpression): AstTypeAssertion;
    createParenthesizedExpression(expression: AstExpression): AstParenthesizedExpression;
    updateParenthesizedExpression(node: AstParenthesizedExpression, expression: AstExpression): AstParenthesizedExpression;
    createFunctionExpression(modifiers: AstNodeArrayLike<AstModifier> | undefined, asteriskToken: AstAsteriskToken | undefined, name: string | AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration> | undefined, type: AstTypeNode | undefined, body: AstBlock): AstFunctionExpression;
    updateFunctionExpression(node: AstFunctionExpression, modifiers: AstNodeArrayLike<AstModifier> | undefined, asteriskToken: AstAsteriskToken | undefined, name: AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock): AstFunctionExpression;
    createArrowFunction(modifiers: AstNodeArrayLike<AstModifier> | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, equalsGreaterThanToken: AstEqualsGreaterThanToken | undefined, body: AstConciseBody): AstArrowFunction;
    updateArrowFunction(node: AstArrowFunction, modifiers: AstNodeArrayLike<AstModifier> | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, equalsGreaterThanToken: AstEqualsGreaterThanToken, body: AstConciseBody): AstArrowFunction;
    createDeleteExpression(expression: AstExpression): AstDeleteExpression;
    updateDeleteExpression(node: AstDeleteExpression, expression: AstExpression): AstDeleteExpression;
    createTypeOfExpression(expression: AstExpression): AstTypeOfExpression;
    updateTypeOfExpression(node: AstTypeOfExpression, expression: AstExpression): AstTypeOfExpression;
    createVoidExpression(expression: AstExpression): AstVoidExpression;
    updateVoidExpression(node: AstVoidExpression, expression: AstExpression): AstVoidExpression;
    createAwaitExpression(expression: AstExpression): AstAwaitExpression;
    updateAwaitExpression(node: AstAwaitExpression, expression: AstExpression): AstAwaitExpression;
    createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: AstExpression): AstPrefixUnaryExpression;
    updatePrefixUnaryExpression(node: AstPrefixUnaryExpression, operand: AstExpression): AstPrefixUnaryExpression;
    createPostfixUnaryExpression(operand: AstExpression, operator: PostfixUnaryOperator): AstPostfixUnaryExpression;
    updatePostfixUnaryExpression(node: AstPostfixUnaryExpression, operand: AstExpression): AstPostfixUnaryExpression;
    createBinaryExpression(left: AstExpression, operator: BinaryOperator | AstBinaryOperatorToken, right: AstExpression): AstBinaryExpression;
    updateBinaryExpression(node: AstBinaryExpression, left: AstExpression, operator: BinaryOperator | AstBinaryOperatorToken, right: AstExpression): AstBinaryExpression;
    createConditionalExpression(condition: AstExpression, questionToken: AstQuestionToken | undefined, whenTrue: AstExpression, colonToken: AstColonToken | undefined, whenFalse: AstExpression): AstConditionalExpression;
    updateConditionalExpression(node: AstConditionalExpression, condition: AstExpression, questionToken: AstQuestionToken, whenTrue: AstExpression, colonToken: AstColonToken, whenFalse: AstExpression): AstConditionalExpression;
    createTemplateExpression(head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateSpan>): AstTemplateExpression;
    updateTemplateExpression(node: AstTemplateExpression, head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateSpan>): AstTemplateExpression;
    createTemplateHead(text: string, rawText?: string, templateFlags?: TokenFlags): AstTemplateHead;
    createTemplateHead(text: string | undefined, rawText: string, templateFlags?: TokenFlags): AstTemplateHead;
    createTemplateMiddle(text: string, rawText?: string, templateFlags?: TokenFlags): AstTemplateMiddle;
    createTemplateMiddle(text: string | undefined, rawText: string, templateFlags?: TokenFlags): AstTemplateMiddle;
    createTemplateTail(text: string, rawText?: string, templateFlags?: TokenFlags): AstTemplateTail;
    createTemplateTail(text: string | undefined, rawText: string, templateFlags?: TokenFlags): AstTemplateTail;
    createNoSubstitutionTemplateLiteral(text: string, rawText?: string): AstNoSubstitutionTemplateLiteral;
    createNoSubstitutionTemplateLiteral(text: string | undefined, rawText: string): AstNoSubstitutionTemplateLiteral;
    /** @internal */ createLiteralLikeNode(kind: AstLiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): AstLiteralToken;
    /** @internal */ createTemplateLiteralLikeNode(kind: AstTemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined): AstTemplateLiteralToken;
    createYieldExpression(asteriskToken: AstAsteriskToken, expression: AstExpression): AstYieldExpression;
    createYieldExpression(asteriskToken: undefined, expression: AstExpression | undefined): AstYieldExpression;
    /** @internal */ createYieldExpression(asteriskToken: AstAsteriskToken | undefined, expression: AstExpression | undefined): AstYieldExpression; // eslint-disable-line @typescript-eslint/unified-signatures
    updateYieldExpression(node: AstYieldExpression, asteriskToken: AstAsteriskToken | undefined, expression: AstExpression | undefined): AstYieldExpression;
    createSpreadElement(expression: AstExpression): AstSpreadElement;
    updateSpreadElement(node: AstSpreadElement, expression: AstExpression): AstSpreadElement;
    createClassExpression(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstClassElement>): AstClassExpression;
    updateClassExpression(node: AstClassExpression, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstClassElement>): AstClassExpression;
    createOmittedExpression(): AstOmittedExpression;
    createExpressionWithTypeArguments(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined): AstExpressionWithTypeArguments;
    updateExpressionWithTypeArguments(node: AstExpressionWithTypeArguments, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined): AstExpressionWithTypeArguments;
    createAsExpression(expression: AstExpression, type: AstTypeNode): AstAsExpression;
    updateAsExpression(node: AstAsExpression, expression: AstExpression, type: AstTypeNode): AstAsExpression;
    createNonNullExpression(expression: AstExpression): AstNonNullExpression;
    updateNonNullExpression(node: AstNonNullExpression, expression: AstExpression): AstNonNullExpression;
    createNonNullChain(expression: AstExpression): AstNonNullChain;
    updateNonNullChain(node: AstNonNullChain, expression: AstExpression): AstNonNullChain;
    createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: AstIdentifier): AstMetaProperty;
    updateMetaProperty(node: AstMetaProperty, name: AstIdentifier): AstMetaProperty;
    createSatisfiesExpression(expression: AstExpression, type: AstTypeNode): AstSatisfiesExpression;
    updateSatisfiesExpression(node: AstSatisfiesExpression, expression: AstExpression, type: AstTypeNode): AstSatisfiesExpression;

    //
    // Misc
    //

    createTemplateSpan(expression: AstExpression, literal: AstTemplateMiddle | AstTemplateTail): AstTemplateSpan;
    updateTemplateSpan(node: AstTemplateSpan, expression: AstExpression, literal: AstTemplateMiddle | AstTemplateTail): AstTemplateSpan;
    createSemicolonClassElement(): AstSemicolonClassElement;

    //
    // Element
    //

    createBlock(statements: AstNodeArrayLike<AstStatement>, multiLine?: boolean): AstBlock;
    updateBlock(node: AstBlock, statements: AstNodeArrayLike<AstStatement>): AstBlock;
    createVariableStatement(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, declarationList: AstVariableDeclarationList | AstNodeArrayLike<AstVariableDeclaration>): AstVariableStatement;
    updateVariableStatement(node: AstVariableStatement, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, declarationList: AstVariableDeclarationList): AstVariableStatement;
    createEmptyStatement(): AstEmptyStatement;
    createExpressionStatement(expression: AstExpression): AstExpressionStatement;
    updateExpressionStatement(node: AstExpressionStatement, expression: AstExpression): AstExpressionStatement;
    createIfStatement(expression: AstExpression, thenStatement: AstStatement, elseStatement?: AstStatement): AstIfStatement;
    updateIfStatement(node: AstIfStatement, expression: AstExpression, thenStatement: AstStatement, elseStatement: AstStatement | undefined): AstIfStatement;
    createDoStatement(statement: AstStatement, expression: AstExpression): AstDoStatement;
    updateDoStatement(node: AstDoStatement, statement: AstStatement, expression: AstExpression): AstDoStatement;
    createWhileStatement(expression: AstExpression, statement: AstStatement): AstWhileStatement;
    updateWhileStatement(node: AstWhileStatement, expression: AstExpression, statement: AstStatement): AstWhileStatement;
    createForStatement(initializer: AstForInitializer | undefined, condition: AstExpression | undefined, incrementor: AstExpression | undefined, statement: AstStatement): AstForStatement;
    updateForStatement(node: AstForStatement, initializer: AstForInitializer | undefined, condition: AstExpression | undefined, incrementor: AstExpression | undefined, statement: AstStatement): AstForStatement;
    createForInStatement(initializer: AstForInitializer, expression: AstExpression, statement: AstStatement): AstForInStatement;
    updateForInStatement(node: AstForInStatement, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement): AstForInStatement;
    createForOfStatement(awaitModifier: AstAwaitKeyword | undefined, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement): AstForOfStatement;
    updateForOfStatement(node: AstForOfStatement, awaitModifier: AstAwaitKeyword | undefined, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement): AstForOfStatement;
    createContinueStatement(label?: string | AstIdentifier): AstContinueStatement;
    updateContinueStatement(node: AstContinueStatement, label: AstIdentifier | undefined): AstContinueStatement;
    createBreakStatement(label?: string | AstIdentifier): AstBreakStatement;
    updateBreakStatement(node: AstBreakStatement, label: AstIdentifier | undefined): AstBreakStatement;
    createReturnStatement(expression?: AstExpression): AstReturnStatement;
    updateReturnStatement(node: AstReturnStatement, expression: AstExpression | undefined): AstReturnStatement;
    createWithStatement(expression: AstExpression, statement: AstStatement): AstWithStatement;
    updateWithStatement(node: AstWithStatement, expression: AstExpression, statement: AstStatement): AstWithStatement;
    createSwitchStatement(expression: AstExpression, caseBlock: AstCaseBlock): AstSwitchStatement;
    updateSwitchStatement(node: AstSwitchStatement, expression: AstExpression, caseBlock: AstCaseBlock): AstSwitchStatement;
    createLabeledStatement(label: string | AstIdentifier, statement: AstStatement): AstLabeledStatement;
    updateLabeledStatement(node: AstLabeledStatement, label: AstIdentifier, statement: AstStatement): AstLabeledStatement;
    createThrowStatement(expression: AstExpression): AstThrowStatement;
    updateThrowStatement(node: AstThrowStatement, expression: AstExpression): AstThrowStatement;
    createTryStatement(tryBlock: AstBlock, catchClause: AstCatchClause | undefined, finallyBlock: AstBlock | undefined): AstTryStatement;
    updateTryStatement(node: AstTryStatement, tryBlock: AstBlock, catchClause: AstCatchClause | undefined, finallyBlock: AstBlock | undefined): AstTryStatement;
    createDebuggerStatement(): AstDebuggerStatement;
    createVariableDeclaration(name: string | AstBindingName, exclamationToken?: AstExclamationToken, type?: AstTypeNode, initializer?: AstExpression): AstVariableDeclaration;
    updateVariableDeclaration(node: AstVariableDeclaration, name: AstBindingName, exclamationToken: AstExclamationToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined): AstVariableDeclaration;
    createVariableDeclarationList(declarations: AstNodeArrayLike<AstVariableDeclaration>, flags?: NodeFlags): AstVariableDeclarationList;
    updateVariableDeclarationList(node: AstVariableDeclarationList, declarations: AstNodeArrayLike<AstVariableDeclaration>): AstVariableDeclarationList;
    createFunctionDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, asteriskToken: AstAsteriskToken | undefined, name: string | AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstFunctionDeclaration;
    updateFunctionDeclaration(node: AstFunctionDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, asteriskToken: AstAsteriskToken | undefined, name: AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined, body: AstBlock | undefined): AstFunctionDeclaration;
    createClassDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstClassElement>): AstClassDeclaration;
    updateClassDeclaration(node: AstClassDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstIdentifier | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstClassElement>): AstClassDeclaration;
    createInterfaceDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstIdentifier, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstTypeElement>): AstInterfaceDeclaration;
    updateInterfaceDeclaration(node: AstInterfaceDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstIdentifier, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined, members: AstNodeArrayLike<AstTypeElement>): AstInterfaceDeclaration;
    createTypeAliasDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstIdentifier, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, type: AstTypeNode): AstTypeAliasDeclaration;
    updateTypeAliasDeclaration(node: AstTypeAliasDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstIdentifier, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined, type: AstTypeNode): AstTypeAliasDeclaration;
    createEnumDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: string | AstIdentifier, members: AstNodeArrayLike<AstEnumMember>): AstEnumDeclaration;
    updateEnumDeclaration(node: AstEnumDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstIdentifier, members: AstNodeArrayLike<AstEnumMember>): AstEnumDeclaration;
    createModuleDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstModuleName, body: AstModuleBody | undefined, flags?: NodeFlags): AstModuleDeclaration;
    updateModuleDeclaration(node: AstModuleDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, name: AstModuleName, body: AstModuleBody | undefined): AstModuleDeclaration;
    createModuleBlock(statements: AstNodeArrayLike<AstStatement>): AstModuleBlock;
    updateModuleBlock(node: AstModuleBlock, statements: AstNodeArrayLike<AstStatement>): AstModuleBlock;
    createCaseBlock(clauses: AstNodeArrayLike<AstCaseOrDefaultClause>): AstCaseBlock;
    updateCaseBlock(node: AstCaseBlock, clauses: AstNodeArrayLike<AstCaseOrDefaultClause>): AstCaseBlock;
    createNamespaceExportDeclaration(name: string | AstIdentifier): AstNamespaceExportDeclaration;
    updateNamespaceExportDeclaration(node: AstNamespaceExportDeclaration, name: AstIdentifier): AstNamespaceExportDeclaration;
    createImportEqualsDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, isTypeOnly: boolean, name: string | AstIdentifier, moduleReference: AstModuleReference): AstImportEqualsDeclaration;
    updateImportEqualsDeclaration(node: AstImportEqualsDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, isTypeOnly: boolean, name: AstIdentifier, moduleReference: AstModuleReference): AstImportEqualsDeclaration;
    createImportDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes?: AstImportAttributes): AstImportDeclaration;
    updateImportDeclaration(node: AstImportDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes: AstImportAttributes | undefined): AstImportDeclaration;
    createImportClause(isTypeOnly: boolean, name: AstIdentifier | undefined, namedBindings: AstNamedImportBindings | undefined): AstImportClause;
    updateImportClause(node: AstImportClause, isTypeOnly: boolean, name: AstIdentifier | undefined, namedBindings: AstNamedImportBindings | undefined): AstImportClause;
    /** @deprecated */ createAssertClause(elements: AstNodeArray<AstAssertEntry>, multiLine?: boolean): AstAssertClause;
    /** @deprecated */ updateAssertClause(node: AstAssertClause, elements: AstNodeArray<AstAssertEntry>, multiLine?: boolean): AstAssertClause;
    /** @deprecated */ createAssertEntry(name: AstAssertionKey, value: AstExpression): AstImportAttribute;
    /** @deprecated */ updateAssertEntry(node: AstImportAttribute, name: AstAssertionKey, value: AstExpression): AstImportAttribute;
    /** @deprecated */ createImportTypeAssertionContainer(clause: AstAssertClause, multiLine?: boolean): AstImportTypeAssertionContainer;
    /** @deprecated */ updateImportTypeAssertionContainer(node: AstImportTypeAssertionContainer, clause: AstAssertClause, multiLine?: boolean): AstImportTypeAssertionContainer;
    createImportAttributes(elements: AstNodeArray<AstImportAttribute>, multiLine?: boolean): AstImportAttributes;
    /** @internal */ createImportAttributes(elements: AstNodeArray<AstImportAttribute>, multiLine?: boolean, token?: AstImportAttributes["data"]["token"]): AstImportAttributes; // eslint-disable-line @typescript-eslint/unified-signatures
    updateImportAttributes(node: AstImportAttributes, elements: AstNodeArray<AstImportAttribute>, multiLine?: boolean): AstImportAttributes;
    createImportAttribute(name: AstImportAttributeName, value: AstExpression): AstImportAttribute;
    updateImportAttribute(node: AstImportAttribute, name: AstImportAttributeName, value: AstExpression): AstImportAttribute;
    createNamespaceImport(name: AstIdentifier): AstNamespaceImport;
    updateNamespaceImport(node: AstNamespaceImport, name: AstIdentifier): AstNamespaceImport;
    createNamespaceExport(name: AstModuleExportName): AstNamespaceExport;
    updateNamespaceExport(node: AstNamespaceExport, name: AstModuleExportName): AstNamespaceExport;
    createNamedImports(elements: AstNodeArrayLike<AstImportSpecifier>): AstNamedImports;
    updateNamedImports(node: AstNamedImports, elements: AstNodeArrayLike<AstImportSpecifier>): AstNamedImports;
    createImportSpecifier(isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstIdentifier): AstImportSpecifier;
    updateImportSpecifier(node: AstImportSpecifier, isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstIdentifier): AstImportSpecifier;
    createExportAssignment(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, isExportEquals: boolean | undefined, expression: AstExpression): AstExportAssignment;
    updateExportAssignment(node: AstExportAssignment, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, expression: AstExpression): AstExportAssignment;
    createExportDeclaration(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, isTypeOnly: boolean, exportClause: AstNamedExportBindings | undefined, moduleSpecifier?: AstExpression, attributes?: AstImportAttributes): AstExportDeclaration;
    updateExportDeclaration(node: AstExportDeclaration, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, isTypeOnly: boolean, exportClause: AstNamedExportBindings | undefined, moduleSpecifier: AstExpression | undefined, attributes: AstImportAttributes | undefined): AstExportDeclaration;
    createNamedExports(elements: AstNodeArrayLike<AstExportSpecifier>): AstNamedExports;
    updateNamedExports(node: AstNamedExports, elements: AstNodeArrayLike<AstExportSpecifier>): AstNamedExports;
    createExportSpecifier(isTypeOnly: boolean, propertyName: string | AstModuleExportName | undefined, name: string | AstModuleExportName): AstExportSpecifier;
    updateExportSpecifier(node: AstExportSpecifier, isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstModuleExportName): AstExportSpecifier;
    /** @internal */ createMissingDeclaration(): AstMissingDeclaration;

    //
    // Module references
    //

    createExternalModuleReference(expression: AstExpression): AstExternalModuleReference;
    updateExternalModuleReference(node: AstExternalModuleReference, expression: AstExpression): AstExternalModuleReference;

    //
    // JSDoc
    //

    createJSDocAllType(): AstJSDocAllType;
    createJSDocUnknownType(): AstJSDocUnknownType;
    createJSDocNonNullableType(type: AstTypeNode, postfix?: boolean): AstJSDocNonNullableType;
    updateJSDocNonNullableType(node: AstJSDocNonNullableType, type: AstTypeNode): AstJSDocNonNullableType;
    createJSDocNullableType(type: AstTypeNode, postfix?: boolean): AstJSDocNullableType;
    updateJSDocNullableType(node: AstJSDocNullableType, type: AstTypeNode): AstJSDocNullableType;
    createJSDocOptionalType(type: AstTypeNode): AstJSDocOptionalType;
    updateJSDocOptionalType(node: AstJSDocOptionalType, type: AstTypeNode): AstJSDocOptionalType;
    createJSDocFunctionType(parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstJSDocFunctionType;
    updateJSDocFunctionType(node: AstJSDocFunctionType, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstJSDocFunctionType;
    createJSDocVariadicType(type: AstTypeNode): AstJSDocVariadicType;
    updateJSDocVariadicType(node: AstJSDocVariadicType, type: AstTypeNode): AstJSDocVariadicType;
    createJSDocNamepathType(type: AstTypeNode): AstJSDocNamepathType;
    updateJSDocNamepathType(node: AstJSDocNamepathType, type: AstTypeNode): AstJSDocNamepathType;
    createJSDocTypeExpression(type: AstTypeNode): AstJSDocTypeExpression;
    updateJSDocTypeExpression(node: AstJSDocTypeExpression, type: AstTypeNode): AstJSDocTypeExpression;
    createJSDocNameReference(name: AstEntityName | AstJSDocMemberName): AstJSDocNameReference;
    updateJSDocNameReference(node: AstJSDocNameReference, name: AstEntityName | AstJSDocMemberName): AstJSDocNameReference;
    createJSDocMemberName(left: AstEntityName | AstJSDocMemberName, right: AstIdentifier): AstJSDocMemberName;
    updateJSDocMemberName(node: AstJSDocMemberName, left: AstEntityName | AstJSDocMemberName, right: AstIdentifier): AstJSDocMemberName;
    createJSDocLink(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLink;
    updateJSDocLink(node: AstJSDocLink, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLink;
    createJSDocLinkCode(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkCode;
    updateJSDocLinkCode(node: AstJSDocLinkCode, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkCode;
    createJSDocLinkPlain(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkPlain;
    updateJSDocLinkPlain(node: AstJSDocLinkPlain, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkPlain;
    createJSDocTypeLiteral(jsDocPropertyTags?: AstNodeArrayLike<AstJSDocPropertyLikeTag>, isArrayType?: boolean): AstJSDocTypeLiteral;
    updateJSDocTypeLiteral(node: AstJSDocTypeLiteral, jsDocPropertyTags: AstNodeArrayLike<AstJSDocPropertyLikeTag> | undefined, isArrayType: boolean | undefined): AstJSDocTypeLiteral;
    createJSDocSignature(typeParameters: AstNodeArrayLike<AstJSDocTemplateTag> | undefined, parameters: AstNodeArrayLike<AstJSDocParameterTag>, type?: AstJSDocReturnTag): AstJSDocSignature;
    updateJSDocSignature(node: AstJSDocSignature, typeParameters: AstNodeArrayLike<AstJSDocTemplateTag> | undefined, parameters: AstNodeArrayLike<AstJSDocParameterTag>, type: AstJSDocReturnTag | undefined): AstJSDocSignature;
    createJSDocTemplateTag(tagName: AstIdentifier | undefined, constraint: AstJSDocTypeExpression | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration>, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocTemplateTag;
    updateJSDocTemplateTag(node: AstJSDocTemplateTag, tagName: AstIdentifier | undefined, constraint: AstJSDocTypeExpression | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration>, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocTemplateTag;
    createJSDocTypedefTag(tagName: AstIdentifier | undefined, typeExpression?: AstJSDocTypeExpression | AstJSDocTypeLiteral, fullName?: AstIdentifier | AstJSDocNamespaceDeclaration, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocTypedefTag;
    updateJSDocTypedefTag(node: AstJSDocTypedefTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression | AstJSDocTypeLiteral | undefined, fullName: AstIdentifier | AstJSDocNamespaceDeclaration | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocTypedefTag;
    createJSDocParameterTag(tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression?: AstJSDocTypeExpression, isNameFirst?: boolean, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocParameterTag;
    updateJSDocParameterTag(node: AstJSDocParameterTag, tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression: AstJSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocParameterTag;
    createJSDocPropertyTag(tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression?: AstJSDocTypeExpression, isNameFirst?: boolean, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocPropertyTag;
    updateJSDocPropertyTag(node: AstJSDocPropertyTag, tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression: AstJSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocPropertyTag;
    createJSDocTypeTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocTypeTag;
    updateJSDocTypeTag(node: AstJSDocTypeTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocTypeTag;
    createJSDocSeeTag(tagName: AstIdentifier | undefined, nameExpression: AstJSDocNameReference | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocSeeTag;
    updateJSDocSeeTag(node: AstJSDocSeeTag, tagName: AstIdentifier | undefined, nameExpression: AstJSDocNameReference | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocSeeTag;
    createJSDocReturnTag(tagName: AstIdentifier | undefined, typeExpression?: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocReturnTag;
    updateJSDocReturnTag(node: AstJSDocReturnTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocReturnTag;
    createJSDocThisTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocThisTag;
    updateJSDocThisTag(node: AstJSDocThisTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocThisTag;
    createJSDocEnumTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocEnumTag;
    updateJSDocEnumTag(node: AstJSDocEnumTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocEnumTag;
    createJSDocCallbackTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, fullName?: AstIdentifier | AstJSDocNamespaceDeclaration, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocCallbackTag;
    updateJSDocCallbackTag(node: AstJSDocCallbackTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, fullName: AstIdentifier | AstJSDocNamespaceDeclaration | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocCallbackTag;
    createJSDocOverloadTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocOverloadTag;
    updateJSDocOverloadTag(node: AstJSDocOverloadTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocOverloadTag;
    createJSDocAugmentsTag(tagName: AstIdentifier | undefined, className: AstJSDocAugmentsTag["data"]["class"], comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocAugmentsTag;
    updateJSDocAugmentsTag(node: AstJSDocAugmentsTag, tagName: AstIdentifier | undefined, className: AstJSDocAugmentsTag["data"]["class"], comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocAugmentsTag;
    createJSDocImplementsTag(tagName: AstIdentifier | undefined, className: AstJSDocImplementsTag["data"]["class"], comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocImplementsTag;
    updateJSDocImplementsTag(node: AstJSDocImplementsTag, tagName: AstIdentifier | undefined, className: AstJSDocImplementsTag["data"]["class"], comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocImplementsTag;
    createJSDocAuthorTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocAuthorTag;
    updateJSDocAuthorTag(node: AstJSDocAuthorTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocAuthorTag;
    createJSDocClassTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocClassTag;
    updateJSDocClassTag(node: AstJSDocClassTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocClassTag;
    createJSDocPublicTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocPublicTag;
    updateJSDocPublicTag(node: AstJSDocPublicTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocPublicTag;
    createJSDocPrivateTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocPrivateTag;
    updateJSDocPrivateTag(node: AstJSDocPrivateTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocPrivateTag;
    createJSDocProtectedTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocProtectedTag;
    updateJSDocProtectedTag(node: AstJSDocProtectedTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocProtectedTag;
    createJSDocReadonlyTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocReadonlyTag;
    updateJSDocReadonlyTag(node: AstJSDocReadonlyTag, tagName: AstIdentifier | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocReadonlyTag;
    createJSDocUnknownTag(tagName: AstIdentifier, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocUnknownTag;
    updateJSDocUnknownTag(node: AstJSDocUnknownTag, tagName: AstIdentifier, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocUnknownTag;
    createJSDocDeprecatedTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocDeprecatedTag;
    updateJSDocDeprecatedTag(node: AstJSDocDeprecatedTag, tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocDeprecatedTag;
    createJSDocOverrideTag(tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocOverrideTag;
    updateJSDocOverrideTag(node: AstJSDocOverrideTag, tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocOverrideTag;
    createJSDocThrowsTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocThrowsTag;
    updateJSDocThrowsTag(node: AstJSDocThrowsTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression | undefined, comment?: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocThrowsTag;
    createJSDocSatisfiesTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocSatisfiesTag;
    updateJSDocSatisfiesTag(node: AstJSDocSatisfiesTag, tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocSatisfiesTag;
    createJSDocImportTag(tagName: AstIdentifier | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes?: AstImportAttributes, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocImportTag;
    updateJSDocImportTag(node: AstJSDocImportTag, tagName: AstIdentifier | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes: AstImportAttributes | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocImportTag;
    createJSDocText(text: string): AstJSDocText;
    updateJSDocText(node: AstJSDocText, text: string): AstJSDocText;
    createJSDocComment(comment?: string | AstNodeArray<AstJSDocComment> | undefined, tags?: AstNodeArrayLike<AstBaseJSDocTag> | undefined): AstJSDoc;
    updateJSDocComment(node: AstJSDoc, comment: string | AstNodeArray<AstJSDocComment> | undefined, tags: AstNodeArrayLike<AstBaseJSDocTag> | undefined): AstJSDoc;

    //
    // JSX
    //

    createJsxElement(openingElement: AstJsxOpeningElement, children: AstNodeArrayLike<AstJsxChild>, closingElement: AstJsxClosingElement): AstJsxElement;
    updateJsxElement(node: AstJsxElement, openingElement: AstJsxOpeningElement, children: AstNodeArrayLike<AstJsxChild>, closingElement: AstJsxClosingElement): AstJsxElement;
    createJsxSelfClosingElement(tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes): AstJsxSelfClosingElement;
    updateJsxSelfClosingElement(node: AstJsxSelfClosingElement, tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes): AstJsxSelfClosingElement;
    createJsxOpeningElement(tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes): AstJsxOpeningElement;
    updateJsxOpeningElement(node: AstJsxOpeningElement, tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes): AstJsxOpeningElement;
    createJsxClosingElement(tagName: AstJsxTagNameExpression): AstJsxClosingElement;
    updateJsxClosingElement(node: AstJsxClosingElement, tagName: AstJsxTagNameExpression): AstJsxClosingElement;
    createJsxFragment(openingFragment: AstJsxOpeningFragment, children: AstNodeArrayLike<AstJsxChild>, closingFragment: AstJsxClosingFragment): AstJsxFragment;
    createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean): AstJsxText;
    updateJsxText(node: AstJsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean): AstJsxText;
    createJsxOpeningFragment(): AstJsxOpeningFragment;
    createJsxClosingFragment(): AstJsxClosingFragment;
    updateJsxFragment(node: AstJsxFragment, openingFragment: AstJsxOpeningFragment, children: AstNodeArrayLike<AstJsxChild>, closingFragment: AstJsxClosingFragment): AstJsxFragment;
    createJsxAttribute(name: AstJsxAttributeName, initializer: AstJsxAttributeValue | undefined): AstJsxAttribute;
    updateJsxAttribute(node: AstJsxAttribute, name: AstJsxAttributeName, initializer: AstJsxAttributeValue | undefined): AstJsxAttribute;
    createJsxAttributes(properties: AstNodeArrayLike<AstJsxAttributeLike>): AstJsxAttributes;
    updateJsxAttributes(node: AstJsxAttributes, properties: AstNodeArrayLike<AstJsxAttributeLike>): AstJsxAttributes;
    createJsxSpreadAttribute(expression: AstExpression): AstJsxSpreadAttribute;
    updateJsxSpreadAttribute(node: AstJsxSpreadAttribute, expression: AstExpression): AstJsxSpreadAttribute;
    createJsxExpression(dotDotDotToken: AstDotDotDotToken | undefined, expression: AstExpression | undefined): AstJsxExpression;
    updateJsxExpression(node: AstJsxExpression, expression: AstExpression | undefined): AstJsxExpression;
    createJsxNamespacedName(namespace: AstIdentifier, name: AstIdentifier): AstJsxNamespacedName;
    updateJsxNamespacedName(node: AstJsxNamespacedName, namespace: AstIdentifier, name: AstIdentifier): AstJsxNamespacedName;

    //
    // Clauses
    //

    createCaseClause(expression: AstExpression, statements: AstNodeArrayLike<AstStatement>): AstCaseClause;
    updateCaseClause(node: AstCaseClause, expression: AstExpression, statements: AstNodeArrayLike<AstStatement>): AstCaseClause;
    createDefaultClause(statements: AstNodeArrayLike<AstStatement>): AstDefaultClause;
    updateDefaultClause(node: AstDefaultClause, statements: AstNodeArrayLike<AstStatement>): AstDefaultClause;
    createHeritageClause(token: AstHeritageClause["data"]["token"], types: AstNodeArrayLike<AstExpressionWithTypeArguments>): AstHeritageClause;
    updateHeritageClause(node: AstHeritageClause, types: AstNodeArrayLike<AstExpressionWithTypeArguments>): AstHeritageClause;
    createCatchClause(variableDeclaration: string | AstBindingName | AstVariableDeclaration | undefined, block: AstBlock): AstCatchClause;
    updateCatchClause(node: AstCatchClause, variableDeclaration: AstVariableDeclaration | undefined, block: AstBlock): AstCatchClause;

    //
    // Property assignments
    //

    createPropertyAssignment(name: string | AstPropertyName, initializer: AstExpression): AstPropertyAssignment;
    updatePropertyAssignment(node: AstPropertyAssignment, name: AstPropertyName, initializer: AstExpression): AstPropertyAssignment;
    createShorthandPropertyAssignment(name: string | AstIdentifier, objectAssignmentInitializer?: AstExpression): AstShorthandPropertyAssignment;
    updateShorthandPropertyAssignment(node: AstShorthandPropertyAssignment, name: AstIdentifier, objectAssignmentInitializer: AstExpression | undefined): AstShorthandPropertyAssignment;
    createSpreadAssignment(expression: AstExpression): AstSpreadAssignment;
    updateSpreadAssignment(node: AstSpreadAssignment, expression: AstExpression): AstSpreadAssignment;

    //
    // Enum
    //

    createEnumMember(name: string | AstPropertyName, initializer?: AstExpression): AstEnumMember;
    updateEnumMember(node: AstEnumMember, name: AstPropertyName, initializer: AstExpression | undefined): AstEnumMember;

    //
    // Top-level nodes
    //

    createSourceFile(statements: AstNodeArrayLike<AstStatement>, endOfFileToken: AstEndOfFileToken, flags: NodeFlags): AstSourceFile;
    updateSourceFile(node: AstSourceFile, statements: AstNodeArrayLike<AstStatement>, isDeclarationFile?: boolean, referencedFiles?: readonly FileReference[], typeReferences?: readonly FileReference[], hasNoDefaultLib?: boolean, libReferences?: readonly FileReference[]): AstSourceFile;

    /** @internal */ createRedirectedSourceFile(redirectInfo: RedirectInfo): AstSourceFile;

    //
    // Synthetic Nodes
    //
    /** @internal */ createSyntheticExpression(type: Type, isSpread?: boolean, tupleNameSource?: AstParameterDeclaration | AstNamedTupleMember): AstSyntheticExpression;
    /** @internal */ createSyntaxList(children: readonly Node[]): AstSyntaxList;

    //
    // Transformation nodes
    //

    createNotEmittedStatement(original: AstNode): AstNotEmittedStatement;
    createNotEmittedTypeElement(): AstNotEmittedTypeElement;
    createPartiallyEmittedExpression(expression: AstExpression, original?: AstNode): AstPartiallyEmittedExpression;
    updatePartiallyEmittedExpression(node: AstPartiallyEmittedExpression, expression: AstExpression): AstPartiallyEmittedExpression;
    /** @internal */ createSyntheticReferenceExpression(expression: AstExpression, thisArg: AstExpression): AstSyntheticReferenceExpression;
    /** @internal */ updateSyntheticReferenceExpression(node: AstSyntheticReferenceExpression, expression: AstExpression, thisArg: AstExpression): AstSyntheticReferenceExpression;
    createCommaListExpression(elements: AstNodeArrayLike<AstExpression>): AstCommaListExpression;
    updateCommaListExpression(node: AstCommaListExpression, elements: AstNodeArrayLike<AstExpression>): AstCommaListExpression;
    createBundle(sourceFiles: readonly SourceFile[]): AstBundle;
    updateBundle(node: AstBundle, sourceFiles: readonly SourceFile[]): AstBundle;

    cloneNode<T extends AstNode>(node: T): T;
    restoreOuterExpressions(outerExpression: AstExpression | undefined, innerExpression: AstExpression, kinds?: OuterExpressionKinds): AstExpression;

    // //
    // // Common operators
    // //

    // createComma(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createAssignment(left: AstObjectLiteralExpression | AstArrayLiteralExpression, right: AstExpression): AstDestructuringAssignment;
    // createAssignment(left: AstExpression, right: AstExpression): AssignmentExpression<EqualsToken>;
    // createLogicalOr(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createLogicalAnd(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createBitwiseOr(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createBitwiseXor(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createBitwiseAnd(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createStrictEquality(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createStrictInequality(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createEquality(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createInequality(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createLessThan(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createLessThanEquals(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createGreaterThan(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createGreaterThanEquals(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createLeftShift(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createRightShift(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createUnsignedRightShift(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createAdd(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createSubtract(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createMultiply(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createDivide(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createModulo(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createExponent(left: AstExpression, right: AstExpression): AstBinaryExpression;
    // createPrefixPlus(operand: AstExpression): AstPrefixUnaryExpression;
    // createPrefixMinus(operand: AstExpression): AstPrefixUnaryExpression;
    // createPrefixIncrement(operand: AstExpression): AstPrefixUnaryExpression;
    // createPrefixDecrement(operand: AstExpression): AstPrefixUnaryExpression;
    // createBitwiseNot(operand: AstExpression): AstPrefixUnaryExpression;
    // createLogicalNot(operand: AstExpression): AstPrefixUnaryExpression;
    // createPostfixIncrement(operand: AstExpression): AstPostfixUnaryExpression;
    // createPostfixDecrement(operand: AstExpression): AstPostfixUnaryExpression;

    // //
    // // Compound Nodes
    // //

    // createImmediatelyInvokedFunctionExpression(statements: AstNodeArrayLike<AstStatement>): AstCallExpression;
    // createImmediatelyInvokedFunctionExpression(statements: AstNodeArrayLike<AstStatement>, param: AstParameterDeclaration, paramValue: AstExpression): AstCallExpression;
    // createImmediatelyInvokedArrowFunction(statements: AstNodeArrayLike<AstStatement>): AstImmediatelyInvokedArrowFunction;
    // createImmediatelyInvokedArrowFunction(statements: AstNodeArrayLike<AstStatement>, param: AstParameterDeclaration, paramValue: AstExpression): AstImmediatelyInvokedArrowFunction;

    // createVoidZero(): AstVoidExpression;
    // createExportDefault(expression: AstExpression): AstExportAssignment;
    // createExternalModuleExport(exportName: AstIdentifier): AstExportDeclaration;

    // /** @internal */ createTypeCheck(value: AstExpression, tag: TypeOfTag): AstExpression;
    // /** @internal */ createIsNotTypeCheck(value: AstExpression, tag: TypeOfTag): AstExpression;
    // /** @internal */ createMethodCall(object: AstExpression, methodName: string | AstIdentifier, argumentsList: AstNodeArrayLike<AstExpression>): AstCallExpression;
    // /** @internal */ createGlobalMethodCall(globalObjectName: string, globalMethodName: string, argumentsList: AstNodeArrayLike<AstExpression>): AstCallExpression;
    // /** @internal */ createFunctionBindCall(target: AstExpression, thisArg: AstExpression, argumentsList: AstNodeArrayLike<AstExpression>): AstCallExpression;
    // /** @internal */ createFunctionCallCall(target: AstExpression, thisArg: AstExpression, argumentsList: AstNodeArrayLike<AstExpression>): AstCallExpression;
    // /** @internal */ createFunctionApplyCall(target: AstExpression, thisArg: AstExpression, argumentsExpression: AstExpression): AstCallExpression;
    // /** @internal */ createObjectDefinePropertyCall(target: AstExpression, propertyName: string | AstExpression, attributes: AstExpression): AstCallExpression;
    // /** @internal */ createObjectGetOwnPropertyDescriptorCall(target: AstExpression, propertyName: string | AstExpression): AstCallExpression;
    // /** @internal */ createReflectGetCall(target: AstExpression, propertyKey: AstExpression, receiver?: AstExpression): AstCallExpression;
    // /** @internal */ createReflectSetCall(target: AstExpression, propertyKey: AstExpression, value: AstExpression, receiver?: AstExpression): AstCallExpression;
    // /** @internal */ createPropertyDescriptor(attributes: AstPropertyDescriptorAttributes, singleLine?: boolean): AstObjectLiteralExpression;
    // /** @internal */ createArraySliceCall(array: AstExpression, start?: number | AstExpression): AstCallExpression;
    // /** @internal */ createArrayConcatCall(array: AstExpression, values: AstNodeArrayLike<AstExpression>): AstCallExpression;
    // /** @internal */ createCallBinding(expression: AstExpression, recordTempVariable: (temp: AstIdentifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers?: boolean): AstCallBinding;
    // /**
    //  * Wraps an expression that cannot be an assignment target in an expression that can be.
    //  *
    //  * Given a `paramName` of `_a`:
    //  * ```
    //  * Reflect.set(obj, "x", _a)
    //  * ```
    //  * Becomes
    //  * ```ts
    //  * ({ set value(_a) { Reflect.set(obj, "x", _a); } }).value
    //  * ```
    //  *
    //  * @param paramName
    //  * @param expression
    //  *
    //  * @internal
    //  */
    // createAssignmentTargetWrapper(paramName: AstIdentifier, expression: AstExpression): AstPropertyAccessExpression;
    // /** @internal */ inlineExpressions(expressions: AstNodeArrayLike<AstExpression>): AstExpression;
    // /**
    //  * Gets the internal name of a declaration. This is primarily used for declarations that can be
    //  * referred to by name in the body of an ES5 class function body. An internal name will *never*
    //  * be prefixed with an module or namespace export modifier like "exports." when emitted as an
    //  * expression. An internal name will also *never* be renamed due to a collision with a block
    //  * scoped variable.
    //  *
    //  * @param node The declaration.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  *
    //  * @internal
    //  */
    // getInternalName(node: AstDeclaration, allowComments?: boolean, allowSourceMaps?: boolean): AstIdentifier;
    // /**
    //  * Gets the local name of a declaration. This is primarily used for declarations that can be
    //  * referred to by name in the declaration's immediate scope (classes, enums, namespaces). A
    //  * local name will *never* be prefixed with an module or namespace export modifier like
    //  * "exports." when emitted as an expression.
    //  *
    //  * @param node The declaration.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  * @param ignoreAssignedName Indicates that the assigned name of a declaration shouldn't be considered.
    //  *
    //  * @internal
    //  */
    // getLocalName(node: AstDeclaration, allowComments?: boolean, allowSourceMaps?: boolean, ignoreAssignedName?: boolean): AstIdentifier;
    // /**
    //  * Gets the export name of a declaration. This is primarily used for declarations that can be
    //  * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
    //  * export name will *always* be prefixed with a module or namespace export modifier like
    //  * `"exports."` when emitted as an expression if the name points to an exported symbol.
    //  *
    //  * @param node The declaration.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  *
    //  * @internal
    //  */
    // getExportName(node: AstDeclaration, allowComments?: boolean, allowSourceMaps?: boolean): AstIdentifier;
    // /**
    //  * Gets the name of a declaration for use in declarations.
    //  *
    //  * @param node The declaration.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  *
    //  * @internal
    //  */
    // getDeclarationName(node: AstDeclaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean): AstIdentifier;
    // /**
    //  * Gets a namespace-qualified name for use in expressions.
    //  *
    //  * @param ns The namespace identifier.
    //  * @param name The name.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  *
    //  * @internal
    //  */
    // getNamespaceMemberName(ns: AstIdentifier, name: AstIdentifier, allowComments?: boolean, allowSourceMaps?: boolean): AstPropertyAccessExpression;
    // /**
    //  * Gets the exported name of a declaration for use in expressions.
    //  *
    //  * An exported name will *always* be prefixed with an module or namespace export modifier like
    //  * "exports." if the name points to an exported symbol.
    //  *
    //  * @param ns The namespace identifier.
    //  * @param node The declaration.
    //  * @param allowComments A value indicating whether comments may be emitted for the name.
    //  * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
    //  *
    //  * @internal
    //  */
    // getExternalModuleOrNamespaceExportName(ns: AstIdentifier | undefined, node: AstDeclaration, allowComments?: boolean, allowSourceMaps?: boolean): AstIdentifier | AstPropertyAccessExpression;

    // //
    // // Utilities
    // //

    // restoreOuterExpressions(outerExpression: AstExpression | undefined, innerExpression: AstExpression, kinds?: OuterExpressionKinds): AstExpression;
    // /** @internal */ restoreEnclosingLabel(node: AstStatement, outermostLabeledStatement: AstLabeledStatement | undefined, afterRestoreLabelCallback?: (node: AstLabeledStatement) => void): AstStatement;
    // /** @internal */ createUseStrictPrologue(): AstPrologueDirective;
    // /**
    //  * Copies any necessary standard and custom prologue-directives into target array.
    //  * @param source origin statements array
    //  * @param target result statements array
    //  * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
    //  * @param visitor Optional callback used to visit any custom prologue directives.
    //  *
    //  * @internal
    //  */
    // copyPrologue(source: AstNodeArrayLike<AstStatement>, target: AstStatement[], ensureUseStrict?: boolean, visitor?: (node: AstNode) => AstVisitResult<AstNode | undefined>): number;
    // /**
    //  * Copies only the standard (string-expression) prologue-directives into the target statement-array.
    //  * @param source origin statements array
    //  * @param target result statements array
    //  * @param statementOffset The offset at which to begin the copy.
    //  * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
    //  *
    //  * @internal
    //  */
    // copyStandardPrologue(source: AstNodeArrayLike<AstStatement>, target: AstStatement[], statementOffset: number | undefined, ensureUseStrict?: boolean): number;
    // /**
    //  * Copies only the custom prologue-directives into target statement-array.
    //  * @param source origin statements array
    //  * @param target result statements array
    //  * @param statementOffset The offset at which to begin the copy.
    //  * @param visitor Optional callback used to visit any custom prologue directives.
    //  *
    //  * @internal
    //  */
    // copyCustomPrologue(source: AstNodeArrayLike<AstStatement>, target: AstStatement[], statementOffset: number, visitor?: (node: AstNode) => AstVisitResult<AstNode | undefined>, filter?: (node: AstStatement) => boolean): number;
    // /** @internal */ copyCustomPrologue(source: AstNodeArrayLike<AstStatement>, target: AstStatement[], statementOffset: number | undefined, visitor?: (node: AstNode) => AstVisitResult<AstNode | undefined>, filter?: (node: AstStatement) => boolean): number | undefined;
    // /** @internal */ ensureUseStrict(statements: AstNodeArray<AstStatement>): AstNodeArray<AstStatement>;
    // /** @internal */ liftToBlock(nodes: AstNodeArrayLike<AstNode>): AstStatement;
    // /**
    //  * Merges generated lexical declarations into a new statement list.
    //  *
    //  * @internal
    //  */
    // mergeLexicalEnvironment(statements: AstNodeArray<AstStatement>, declarations: AstNodeArrayLike<AstStatement> | undefined): AstNodeArray<AstStatement>;
    // /**
    //  * Appends generated lexical declarations to an array of statements.
    //  *
    //  * @internal
    //  */
    // mergeLexicalEnvironment(statements: AstStatement[], declarations: AstNodeArrayLike<AstStatement> | undefined): AstStatement[];
    // /**
    //  * Creates a shallow, memberwise clone of a node.
    //  * - The result will have its `original` pointer set to `node`.
    //  * - The result will have its `pos` and `end` set to `-1`.
    //  * - *DO NOT USE THIS* if a more appropriate function is available.
    //  *
    //  * @internal
    //  */
    // cloneNode<T extends AstNode | undefined>(node: T): T;
    // /**
    //  * Updates a node that may contain modifiers, replacing only the modifiers of the node.
    //  */
    // replaceModifiers<T extends AstHasModifiers>(node: T, modifiers: AstNodeArrayLike<AstModifier> | ModifierFlags | undefined): T;
    // /**
    //  * Updates a node that may contain decorators or modifiers, replacing only the decorators and modifiers of the node.
    //  */
    // replaceDecoratorsAndModifiers<T extends AstHasModifiers & AstHasDecorators>(node: T, modifiers: AstNodeArrayLike<AstModifierLike> | undefined): T;
    // /**
    //  * Updates a node that contains a property name, replacing only the name of the node.
    //  */
    // replacePropertyName<T extends AstAccessorDeclaration | AstMethodDeclaration | AstMethodSignature | AstPropertyDeclaration | AstPropertySignature | AstPropertyAssignment>(node: T, name: T["data"]["name"]): T;
}

/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 *
 * @internal
 */
export function createAstNodeFactory(flags: NodeFactoryFlags, onFinishNode?: (node: AstNode) => void): AstNodeFactory {
    const setOriginal = flags & NodeFactoryFlags.NoOriginalNode ? identity : setOriginalNode;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullAstParenthesizerRules : createAstParenthesizerRules(factory));
    // const converters = memoize(() => flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : Debug.fail("not implemented"));

    // // lazy initializaton of common operator factories
    // const getBinaryCreateFunction = memoizeOne((operator: BinaryOperator) => (left: Expression, right: Expression) => createBinaryExpression(left, operator, right));
    // const getPrefixUnaryCreateFunction = memoizeOne((operator: PrefixUnaryOperator) => (operand: Expression) => createPrefixUnaryExpression(operator, operand));
    // const getPostfixUnaryCreateFunction = memoizeOne((operator: PostfixUnaryOperator) => (operand: Expression) => createPostfixUnaryExpression(operand, operator));

    const factory: AstNodeFactory = {
        get parenthesizer() {
            return parenthesizerRules();
        },
        // get converters() {
        //     return converters();
        // },
        flags,
        createNodeArray,
        createNumericLiteral,
        createBigIntLiteral,
        createStringLiteral,
        createRegularExpressionLiteral,
        createLiteralLikeNode,
        createIdentifier,
        createPrivateIdentifier,
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
        createPropertyAccessExpression,
        updatePropertyAccessExpression,
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
        createImportAttributes,
        updateImportAttributes,
        createImportAttribute,
        updateImportAttribute,
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
        createJSDocAllType,
        createJSDocUnknownType,
        createJSDocNonNullableType,
        updateJSDocNonNullableType,
        createJSDocNullableType,
        updateJSDocNullableType,
        createJSDocOptionalType,
        updateJSDocOptionalType,
        createJSDocVariadicType,
        updateJSDocVariadicType,
        createJSDocNamepathType,
        updateJSDocNamepathType,
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
        createJSDocOverloadTag,
        updateJSDocOverloadTag,
        createJSDocAugmentsTag,
        updateJSDocAugmentsTag,
        createJSDocImplementsTag,
        updateJSDocImplementsTag,
        createJSDocSeeTag,
        updateJSDocSeeTag,
        createJSDocImportTag,
        updateJSDocImportTag,
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
        createJSDocTypeTag(tagName, typeExpression, comment) {
            return createJSDocTypeLikeTag(AstNode.JSDocTypeTag, tagName, typeExpression, comment);
        },
        updateJSDocTypeTag(node, tagName, typeExpression, comment) {
            return updateJSDocTypeLikeTag(AstNode.JSDocTypeTag, node, tagName, typeExpression, comment);
        },
        createJSDocReturnTag(tagName, typeExpression, comment) {
            return createJSDocTypeLikeTag(AstNode.JSDocReturnTag, tagName, typeExpression, comment);
        },
        updateJSDocReturnTag(node, tagName, typeExpression, comment) {
            return updateJSDocTypeLikeTag(AstNode.JSDocReturnTag, node, tagName, typeExpression, comment);
        },
        createJSDocThisTag(tagName, typeExpression, comment) {
            return createJSDocTypeLikeTag(AstNode.JSDocThisTag, tagName, typeExpression, comment);
        },
        updateJSDocThisTag(node, tagName, typeExpression, comment) {
            return updateJSDocTypeLikeTag(AstNode.JSDocThisTag, node, tagName, typeExpression, comment);
        },
        createJSDocThrowsTag(tagName, typeExpression, comment) {
            return createJSDocTypeLikeTag(AstNode.JSDocThrowsTag, tagName, typeExpression, comment);
        },
        updateJSDocThrowsTag(node, tagName, typeExpression, comment) {
            return updateJSDocTypeLikeTag(AstNode.JSDocThrowsTag, node, tagName, typeExpression, comment);
        },
        createJSDocSatisfiesTag(tagName, typeExpression, comment) {
            return createJSDocTypeLikeTag(AstNode.JSDocSatisfiesTag, tagName, typeExpression, comment);
        },
        updateJSDocSatisfiesTag(node, tagName, typeExpression, comment) {
            return updateJSDocTypeLikeTag(AstNode.JSDocSatisfiesTag, node, tagName, typeExpression, comment);
        },
        createJSDocAuthorTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocAuthorTag, tagName, comment);
        },
        updateJSDocAuthorTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocAuthorTag, node, tagName, comment);
        },
        createJSDocClassTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocClassTag, tagName, comment);
        },
        updateJSDocClassTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocClassTag, node, tagName, comment);
        },
        createJSDocPublicTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocPublicTag, tagName, comment);
        },
        updateJSDocPublicTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocPublicTag, node, tagName, comment);
        },
        createJSDocPrivateTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocPrivateTag, tagName, comment);
        },
        updateJSDocPrivateTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocPrivateTag, node, tagName, comment);
        },
        createJSDocProtectedTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocProtectedTag, tagName, comment);
        },
        updateJSDocProtectedTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocProtectedTag, node, tagName, comment);
        },
        createJSDocReadonlyTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocReadonlyTag, tagName, comment);
        },
        updateJSDocReadonlyTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocReadonlyTag, node, tagName, comment);
        },
        createJSDocOverrideTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocOverrideTag, tagName, comment);
        },
        updateJSDocOverrideTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocOverrideTag, node, tagName, comment);
        },
        createJSDocDeprecatedTag(tagName, comment) {
            return createJSDocSimpleTag(AstNode.JSDocDeprecatedTag, tagName, comment);
        },
        updateJSDocDeprecatedTag(node, tagName, comment) {
            return updateJSDocSimpleTag(AstNode.JSDocDeprecatedTag, node, tagName, comment);
        },

        createJSDocEnumTag,
        updateJSDocEnumTag,
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
        createJsxClosingFragment,
        updateJsxFragment,
        createJsxAttribute,
        updateJsxAttribute,
        createJsxAttributes,
        updateJsxAttributes,
        createJsxSpreadAttribute,
        updateJsxSpreadAttribute,
        createJsxExpression,
        updateJsxExpression,
        createJsxNamespacedName,
        updateJsxNamespacedName,
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
        createRedirectedSourceFile,
        createBundle,
        updateBundle,
        createSyntheticExpression,
        createSyntaxList,
        createNotEmittedStatement,
        createNotEmittedTypeElement,
        createPartiallyEmittedExpression,
        updatePartiallyEmittedExpression,
        createCommaListExpression,
        updateCommaListExpression,
        createSyntheticReferenceExpression,
        updateSyntheticReferenceExpression,
        cloneNode,
        restoreOuterExpressions,
    };

    return factory;

    // @api
    function createNodeArray<T extends AstNode>(elements?: AstNodeArrayLike<T>, hasTrailingComma?: boolean): AstNodeArray<T> {
        if (elements instanceof AstNodeArray) {
            return elements;
        }

        return new AstNodeArray(elements ?? [], hasTrailingComma);
    }

    function finishUpdateBaseSignatureDeclaration<T extends AstNode & { readonly data: { typeArguments: unknown; }; }>(updated: T, original: T) {
        if (updated !== original) {
            // copy children used for quick info
            updated.data.typeArguments = original.data.typeArguments;
        }
        return update(updated, original);
    }

    //
    // Literals
    //

    // @api
    function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): AstNumericLiteral {
        const text = typeof value === "number" ? value + "" : value;
        Debug.assert(text.charCodeAt(0) !== CharacterCodes.minus, "Negative numbers should be created in combination with createPrefixUnaryExpression");
        const node = AstNode.NumericLiteral();
        node.data.text = text;
        node.data.numericLiteralFlags = numericLiteralFlags;
        return finish(node);
    }

    // @api
    function createBigIntLiteral(value: string | PseudoBigInt): AstBigIntLiteral {
        const node = AstNode.BigIntLiteral();
        node.data.text = typeof value === "string" ? value : pseudoBigIntToString(value) + "n";
        return finish(node);
    }

    function createBaseStringLiteral(text: string, isSingleQuote?: boolean) {
        const node = AstNode.StringLiteral();
        node.data.text = text;
        node.data.singleQuote = isSingleQuote;
        return finish(node);
    }

    // @api
    function createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape = false): AstStringLiteral {
        const node = createBaseStringLiteral(text, isSingleQuote);
        node.data.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
        return finish(node);
    }

    // @api
    function createRegularExpressionLiteral(text: string): AstRegularExpressionLiteral {
        const node = AstNode.RegularExpressionLiteral();
        node.data.text = text;
        return finish(node);
    }

    // @api
    function createLiteralLikeNode(kind: LiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): AstLiteralToken {
        switch (kind) {
            case SyntaxKind.NumericLiteral:
                return createNumericLiteral(text, /*numericLiteralFlags*/ 0);
            case SyntaxKind.BigIntLiteral:
                return createBigIntLiteral(text);
            case SyntaxKind.StringLiteral:
                return createStringLiteral(text, /*isSingleQuote*/ undefined);
            case SyntaxKind.JsxText:
                return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ false);
            case SyntaxKind.JsxTextAllWhiteSpaces:
                return createJsxText(text, /*containsOnlyTriviaWhiteSpaces*/ true);
            case SyntaxKind.RegularExpressionLiteral:
                return createRegularExpressionLiteral(text);
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return createTemplateLiteralLikeNode(kind, text, /*rawText*/ undefined, /*templateFlags*/ 0) as AstNoSubstitutionTemplateLiteral;
        }
    }

    //
    // Identifiers
    //

    // @api
    function createIdentifier(text: string, hasExtendedUnicodeEscape?: boolean): AstIdentifier {
        const node = AstNode.Identifier();
        node.data.escapedText = escapeLeadingUnderscores(text);
        if (hasExtendedUnicodeEscape) node.flags |= NodeFlags.IdentifierHasExtendedUnicodeEscape;
        return finish(node);
    }

    // @api
    function createPrivateIdentifier(text: string): AstPrivateIdentifier {
        if (!startsWith(text, "#")) Debug.fail("First character of private identifier must be #: " + text);
        const node = AstNode.PrivateIdentifier();
        node.data.escapedText = escapeLeadingUnderscores(text);
        return finish(node);
    }

    //
    // Punctuation
    //

    // @api
    function createToken(token: SyntaxKind.SuperKeyword): AstSuperExpression;
    function createToken(token: SyntaxKind.ThisKeyword): AstThisExpression;
    function createToken(token: SyntaxKind.NullKeyword): AstNullLiteral;
    function createToken(token: SyntaxKind.TrueKeyword): AstTrueLiteral;
    function createToken(token: SyntaxKind.FalseKeyword): AstFalseLiteral;
    function createToken(token: SyntaxKind.EndOfFileToken): AstEndOfFileToken;
    function createToken(token: SyntaxKind.Unknown): AstToken<SyntaxKind.Unknown>;
    function createToken<TKind extends PunctuationSyntaxKind>(token: TKind): AstPunctuationToken<TKind>;
    function createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): AstKeywordTypeNode<TKind>;
    function createToken<TKind extends ModifierSyntaxKind>(token: TKind): AstModifierToken<TKind>;
    function createToken<TKind extends KeywordSyntaxKind>(token: TKind): AstKeywordToken<TKind>;
    function createToken<TKind extends TokenSyntaxKind>(token: TKind): AstToken<TKind>;
    function createToken<TKind extends TokenSyntaxKind>(token: TKind) {
        Debug.assert(token >= SyntaxKind.FirstToken && token <= SyntaxKind.LastToken, "Invalid token");
        Debug.assert(token <= SyntaxKind.FirstTemplateToken || token >= SyntaxKind.LastTemplateToken, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
        Debug.assert(token <= SyntaxKind.FirstLiteralToken || token >= SyntaxKind.LastLiteralToken, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
        Debug.assert(token !== SyntaxKind.Identifier, "Invalid token. Use 'createIdentifier' to create identifiers");
        return finish(AstNode.Token(token));
    }

    //
    // Reserved words
    //

    // @api
    function createSuper() {
        return createToken(SyntaxKind.SuperKeyword);
    }

    // @api
    function createThis() {
        return createToken(SyntaxKind.ThisKeyword);
    }

    // @api
    function createNull() {
        return createToken(SyntaxKind.NullKeyword);
    }

    // @api
    function createTrue() {
        return createToken(SyntaxKind.TrueKeyword);
    }

    // @api
    function createFalse() {
        return createToken(SyntaxKind.FalseKeyword);
    }

    //
    // Modifiers
    //

    // @api
    function createModifier<T extends ModifierSyntaxKind>(kind: T) {
        return createToken(kind);
    }

    // @api
    function createModifiersFromModifierFlags(flags: ModifierFlags) {
        const result: AstModifier[] = [];
        if (flags & ModifierFlags.Export) result.push(createModifier(SyntaxKind.ExportKeyword));
        if (flags & ModifierFlags.Ambient) result.push(createModifier(SyntaxKind.DeclareKeyword));
        if (flags & ModifierFlags.Default) result.push(createModifier(SyntaxKind.DefaultKeyword));
        if (flags & ModifierFlags.Const) result.push(createModifier(SyntaxKind.ConstKeyword));
        if (flags & ModifierFlags.Public) result.push(createModifier(SyntaxKind.PublicKeyword));
        if (flags & ModifierFlags.Private) result.push(createModifier(SyntaxKind.PrivateKeyword));
        if (flags & ModifierFlags.Protected) result.push(createModifier(SyntaxKind.ProtectedKeyword));
        if (flags & ModifierFlags.Abstract) result.push(createModifier(SyntaxKind.AbstractKeyword));
        if (flags & ModifierFlags.Static) result.push(createModifier(SyntaxKind.StaticKeyword));
        if (flags & ModifierFlags.Override) result.push(createModifier(SyntaxKind.OverrideKeyword));
        if (flags & ModifierFlags.Readonly) result.push(createModifier(SyntaxKind.ReadonlyKeyword));
        if (flags & ModifierFlags.Accessor) result.push(createModifier(SyntaxKind.AccessorKeyword));
        if (flags & ModifierFlags.Async) result.push(createModifier(SyntaxKind.AsyncKeyword));
        if (flags & ModifierFlags.In) result.push(createModifier(SyntaxKind.InKeyword));
        if (flags & ModifierFlags.Out) result.push(createModifier(SyntaxKind.OutKeyword));
        return result.length ? result : undefined;
    }

    //
    // Names
    //

    // @api
    function createQualifiedName(left: AstEntityName, right: string | AstIdentifier) {
        const node = AstNode.QualifiedName();
        node.data.left = left;
        node.data.right = asName(right);
        return finish(node);
    }

    // @api
    function updateQualifiedName(node: AstQualifiedName, left: AstEntityName, right: AstIdentifier) {
        return node.data.left !== left
                || node.data.right !== right
            ? update(createQualifiedName(left, right), node)
            : node;
    }

    // @api
    function createComputedPropertyName(expression: AstExpression) {
        const node = AstNode.ComputedPropertyName();
        node.data.expression = parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
        return finish(node);
    }

    // @api
    function updateComputedPropertyName(node: AstComputedPropertyName, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createComputedPropertyName(expression), node)
            : node;
    }

    //
    // Signature elements
    //

    // @api
    function createTypeParameterDeclaration(modifiers: AstNodeArrayLike<AstModifier> | undefined, name: string | AstIdentifier, constraint?: AstTypeNode, defaultType?: AstTypeNode): AstTypeParameterDeclaration {
        const node = AstNode.TypeParameterDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.constraint = constraint;
        node.data.default = defaultType;
        return finish(node);
    }

    // @api
    function updateTypeParameterDeclaration(node: AstTypeParameterDeclaration, modifiers: AstNodeArrayLike<AstModifier> | undefined, name: AstIdentifier, constraint: AstTypeNode | undefined, defaultType: AstTypeNode | undefined): AstTypeParameterDeclaration {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || node.data.constraint !== constraint
                || node.data.default !== defaultType
            ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node)
            : node;
    }

    // @api
    function createParameterDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        dotDotDotToken: AstDotDotDotToken | undefined,
        name: string | AstBindingName,
        questionToken?: AstQuestionToken,
        type?: AstTypeNode,
        initializer?: AstExpression,
    ) {
        const node = AstNode.ParameterDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.dotDotDotToken = dotDotDotToken;
        node.data.name = asName(name);
        node.data.questionToken = questionToken;
        node.data.type = type;
        node.data.initializer = asInitializer(initializer);
        return finish(node);
    }

    // @api
    function updateParameterDeclaration(
        node: AstParameterDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        dotDotDotToken: AstDotDotDotToken | undefined,
        name: string | AstBindingName,
        questionToken: AstQuestionToken | undefined,
        type: AstTypeNode | undefined,
        initializer: AstExpression | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.dotDotDotToken !== dotDotDotToken
                || node.data.name !== name
                || node.data.questionToken !== questionToken
                || node.data.type !== type
                || node.data.initializer !== initializer
            ? update(createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, type, initializer), node)
            : node;
    }

    // @api
    function createDecorator(expression: AstExpression) {
        const node = AstNode.Decorator();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        return finish(node);
    }

    // @api
    function updateDecorator(node: AstDecorator, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createDecorator(expression), node)
            : node;
    }

    //
    // Type Elements
    //

    // @api
    function createPropertySignature(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        name: AstPropertyName | string,
        questionToken: AstQuestionToken | undefined,
        type: AstTypeNode | undefined,
    ): AstPropertySignature {
        const node = AstNode.PropertySignature();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.type = type;
        node.data.questionToken = questionToken;
        return finish(node);
    }

    // @api
    function updatePropertySignature(
        node: AstPropertySignature,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        name: AstPropertyName,
        questionToken: AstQuestionToken | undefined,
        type: AstTypeNode | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || node.data.questionToken !== questionToken
                || node.data.type !== type
            ? finishUpdatePropertySignature(createPropertySignature(modifiers, name, questionToken, type), node)
            : node;
    }

    function finishUpdatePropertySignature(updated: AstPropertySignature, original: AstPropertySignature) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.initializer = original.data.initializer;
        }
        return update(updated, original);
    }

    // @api
    function createPropertyDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstPropertyName,
        questionOrExclamationToken: AstQuestionToken | AstExclamationToken | undefined,
        type: AstTypeNode | undefined,
        initializer: AstExpression | undefined,
    ) {
        const node = AstNode.PropertyDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.questionToken = questionOrExclamationToken && astIsQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.data.exclamationToken = questionOrExclamationToken && astIsExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.data.type = type;
        node.data.initializer = asInitializer(initializer);
        return finish(node);
    }

    // @api
    function updatePropertyDeclaration(
        node: AstPropertyDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstPropertyName,
        questionOrExclamationToken: AstQuestionToken | AstExclamationToken | undefined,
        type: AstTypeNode | undefined,
        initializer: AstExpression | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || node.data.questionToken !== (questionOrExclamationToken !== undefined && astIsQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
                || node.data.exclamationToken !== (questionOrExclamationToken !== undefined && astIsExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
                || node.data.type !== type
                || node.data.initializer !== initializer
            ? update(createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createMethodSignature(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        name: string | AstPropertyName,
        questionToken: AstQuestionToken | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ) {
        const node = AstNode.MethodSignature();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.questionToken = questionToken;
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateMethodSignature(
        node: AstMethodSignature,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        name: AstPropertyName,
        questionToken: AstQuestionToken | undefined,
        typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArray<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || node.data.questionToken !== questionToken
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? finishUpdateBaseSignatureDeclaration(createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createMethodDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: string | AstPropertyName,
        questionToken: AstQuestionToken | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        const node = AstNode.MethodDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.asteriskToken = asteriskToken;
        node.data.name = asName(name);
        node.data.questionToken = questionToken;
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateMethodDeclaration(
        node: AstMethodDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: AstPropertyName,
        questionToken: AstQuestionToken | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.asteriskToken !== asteriskToken
                || node.data.name !== name
                || node.data.questionToken !== questionToken
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || node.data.body !== body
            ? finishUpdateMethodDeclaration(createMethodDeclaration(modifiers, asteriskToken, name, questionToken, typeParameters, parameters, type, body), node)
            : node;
    }

    function finishUpdateMethodDeclaration(updated: AstMethodDeclaration, original: AstMethodDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.exclamationToken = original.data.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createClassStaticBlockDeclaration(
        body: AstBlock,
    ): AstClassStaticBlockDeclaration {
        const node = AstNode.ClassStaticBlockDeclaration();
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateClassStaticBlockDeclaration(
        node: AstClassStaticBlockDeclaration,
        body: AstBlock,
    ): AstClassStaticBlockDeclaration {
        return node.data.body !== body
            ? finishUpdateClassStaticBlockDeclaration(createClassStaticBlockDeclaration(body), node)
            : node;
    }

    function finishUpdateClassStaticBlockDeclaration(updated: AstClassStaticBlockDeclaration, original: AstClassStaticBlockDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.modifiers = original.data.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createConstructorDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        body: AstBlock | undefined,
    ) {
        const node = AstNode.ConstructorDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.parameters = createNodeArray(parameters);
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateConstructorDeclaration(
        node: AstConstructorDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        body: AstBlock | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.body !== body
            ? finishUpdateConstructorDeclaration(createConstructorDeclaration(modifiers, parameters, body), node)
            : node;
    }

    function finishUpdateConstructorDeclaration(updated: AstConstructorDeclaration, original: AstConstructorDeclaration) {
        if (updated !== original) {
            updated.data.typeParameters = original.data.typeParameters;
            updated.data.type = original.data.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createGetAccessorDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstPropertyName,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        const node = AstNode.GetAccessorDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateGetAccessorDeclaration(
        node: AstGetAccessorDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstPropertyName,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || node.data.body !== body
            ? finishUpdateGetAccessorDeclaration(createGetAccessorDeclaration(modifiers, name, parameters, type, body), node)
            : node;
    }

    function finishUpdateGetAccessorDeclaration(updated: AstGetAccessorDeclaration, original: AstGetAccessorDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.typeParameters = original.data.typeParameters;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createSetAccessorDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstPropertyName,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        body: AstBlock | undefined,
    ) {
        const node = AstNode.SetAccessorDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.parameters = createNodeArray(parameters);
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateSetAccessorDeclaration(
        node: AstSetAccessorDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstPropertyName,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        body: AstBlock | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.body !== body
            ? finishUpdateSetAccessorDeclaration(createSetAccessorDeclaration(modifiers, name, parameters, body), node)
            : node;
    }

    function finishUpdateSetAccessorDeclaration(updated: AstSetAccessorDeclaration, original: AstSetAccessorDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.typeParameters = original.data.typeParameters;
            updated.data.type = original.data.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createCallSignature(
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ): AstCallSignatureDeclaration {
        const node = AstNode.CallSignatureDeclaration();
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateCallSignature(
        node: AstCallSignatureDeclaration,
        typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArray<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ) {
        return !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? finishUpdateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createConstructSignature(
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ): AstConstructSignatureDeclaration {
        const node = AstNode.ConstructSignatureDeclaration();
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateConstructSignature(
        node: AstConstructSignatureDeclaration,
        typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArray<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ) {
        return !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? finishUpdateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createIndexSignature(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
    ): AstIndexSignatureDeclaration {
        const node = AstNode.IndexSignatureDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type!; // TODO(rbuckton): We mark this as required in IndexSignatureDeclaration, but it looks like the parser allows it to be elided.
        return finish(node);
    }

    // @api
    function updateIndexSignature(
        node: AstIndexSignatureDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode,
    ) {
        return !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || !sameNodeArray(node.data.modifiers, modifiers)
            ? finishUpdateBaseSignatureDeclaration(createIndexSignature(modifiers, parameters, type), node)
            : node;
    }

    // @api
    function createTemplateLiteralTypeSpan(type: AstTypeNode, literal: AstTemplateMiddle | AstTemplateTail) {
        const node = AstNode.TemplateLiteralTypeSpan();
        node.data.type = type;
        node.data.literal = literal;
        return finish(node);
    }

    // @api
    function updateTemplateLiteralTypeSpan(node: AstTemplateLiteralTypeSpan, type: AstTypeNode, literal: AstTemplateMiddle | AstTemplateTail) {
        return node.data.type !== type
                || node.data.literal !== literal
            ? update(createTemplateLiteralTypeSpan(type, literal), node)
            : node;
    }

    //
    // Types
    //

    // @api
    function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind) {
        return createToken(kind);
    }

    // @api
    function createTypePredicateNode(assertsModifier: AstAssertsKeyword | undefined, parameterName: AstIdentifier | AstThisTypeNode | string, type: AstTypeNode | undefined) {
        const node = AstNode.TypePredicateNode();
        node.data.assertsModifier = assertsModifier;
        node.data.parameterName = asName(parameterName);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateTypePredicateNode(node: AstTypePredicateNode, assertsModifier: AstAssertsKeyword | undefined, parameterName: AstIdentifier | AstThisTypeNode, type: AstTypeNode | undefined) {
        return node.data.assertsModifier !== assertsModifier
                || node.data.parameterName !== parameterName
                || node.data.type !== type
            ? update(createTypePredicateNode(assertsModifier, parameterName, type), node)
            : node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | AstEntityName, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined) {
        const node = AstNode.TypeReferenceNode();
        node.data.typeName = asName(typeName);
        node.data.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
        return finish(node);
    }

    // @api
    function updateTypeReferenceNode(node: AstTypeReferenceNode, typeName: AstEntityName, typeArguments: AstNodeArray<AstTypeNode> | undefined) {
        return node.data.typeName !== typeName
                || !sameNodeArray(node.data.typeArguments, typeArguments)
            ? update(createTypeReferenceNode(typeName, typeArguments), node)
            : node;
    }

    // @api
    function createFunctionTypeNode(
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode,
    ): AstFunctionTypeNode {
        const node = AstNode.FunctionTypeNode();
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateFunctionTypeNode(
        node: AstFunctionTypeNode,
        typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArray<AstParameterDeclaration>,
        type: AstTypeNode,
    ) {
        return !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? finishUpdateFunctionTypeNode(createFunctionTypeNode(typeParameters, parameters, type), node)
            : node;
    }

    function finishUpdateFunctionTypeNode(updated: AstFunctionTypeNode, original: AstFunctionTypeNode) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.modifiers = original.data.modifiers;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createConstructorTypeNode(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode,
    ): AstConstructorTypeNode {
        const node = AstNode.ConstructorTypeNode();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateConstructorTypeNode(
        node: AstConstructorTypeNode,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        typeParameters: AstNodeArray<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArray<AstParameterDeclaration>,
        type: AstTypeNode,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? finishUpdateBaseSignatureDeclaration(createConstructorTypeNode(modifiers, typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createTypeQueryNode(exprName: AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>) {
        const node = AstNode.TypeQueryNode();
        node.data.exprName = exprName;
        node.data.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        return finish(node);
    }

    // @api
    function updateTypeQueryNode(node: AstTypeQueryNode, exprName: AstEntityName, typeArguments?: AstNodeArrayLike<AstTypeNode>) {
        return node.data.exprName !== exprName
                || !sameNodeArray(node.data.typeArguments, typeArguments)
            ? update(createTypeQueryNode(exprName, typeArguments), node)
            : node;
    }

    // @api
    function createTypeLiteralNode(members: AstNodeArrayLike<AstTypeElement> | undefined) {
        const node = AstNode.TypeLiteralNode();
        node.data.members = createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateTypeLiteralNode(node: AstTypeLiteralNode, members: AstNodeArray<AstTypeElement>) {
        return !sameNodeArray(node.data.members, members)
            ? update(createTypeLiteralNode(members), node)
            : node;
    }

    // @api
    function createArrayTypeNode(elementType: AstTypeNode) {
        const node = AstNode.ArrayTypeNode();
        node.data.elementType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        return finish(node);
    }

    // @api
    function updateArrayTypeNode(node: AstArrayTypeNode, elementType: AstTypeNode): AstArrayTypeNode {
        return node.data.elementType !== elementType
            ? update(createArrayTypeNode(elementType), node)
            : node;
    }

    // @api
    function createTupleTypeNode(elements: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>) {
        const node = AstNode.TupleTypeNode();
        node.data.elements = createNodeArray(parenthesizerRules().parenthesizeElementTypesOfTupleType(elements));
        return finish(node);
    }

    // @api
    function updateTupleTypeNode(node: AstTupleTypeNode, elements: AstNodeArrayLike<AstTypeNode | AstNamedTupleMember>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createTupleTypeNode(elements), node)
            : node;
    }

    // @api
    function createNamedTupleMember(dotDotDotToken: AstDotDotDotToken | undefined, name: AstIdentifier, questionToken: AstQuestionToken | undefined, type: AstTypeNode) {
        const node = AstNode.NamedTupleMember();
        node.data.dotDotDotToken = dotDotDotToken;
        node.data.name = name;
        node.data.questionToken = questionToken;
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateNamedTupleMember(node: AstNamedTupleMember, dotDotDotToken: AstDotDotDotToken | undefined, name: AstIdentifier, questionToken: AstQuestionToken | undefined, type: AstTypeNode) {
        return node.data.dotDotDotToken !== dotDotDotToken
                || node.data.name !== name
                || node.data.questionToken !== questionToken
                || node.data.type !== type
            ? update(createNamedTupleMember(dotDotDotToken, name, questionToken, type), node)
            : node;
    }

    // @api
    function createOptionalTypeNode(type: AstTypeNode) {
        const node = AstNode.OptionalTypeNode();
        node.data.type = parenthesizerRules().parenthesizeTypeOfOptionalType(type);
        return finish(node);
    }

    // @api
    function updateOptionalTypeNode(node: AstOptionalTypeNode, type: AstTypeNode): AstOptionalTypeNode {
        return node.data.type !== type
            ? update(createOptionalTypeNode(type), node)
            : node;
    }

    // @api
    function createRestTypeNode(type: AstTypeNode) {
        const node = AstNode.RestTypeNode();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateRestTypeNode(node: AstRestTypeNode, type: AstTypeNode): AstRestTypeNode {
        return node.data.type !== type
            ? update(createRestTypeNode(type), node)
            : node;
    }

    // @api
    function createUnionTypeNode(types: AstNodeArrayLike<AstTypeNode>): AstUnionTypeNode {
        const node = AstNode.UnionTypeNode();
        node.data.types = createNodeArray(parenthesizerRules().parenthesizeConstituentTypesOfUnionType(types));
        return finish(node);
    }

    // @api
    function updateUnionTypeNode(node: AstUnionTypeNode, types: AstNodeArray<AstTypeNode>) {
        return !sameNodeArray(node.data.types, types)
            ? update(createUnionTypeNode(types), node)
            : node;
    }

    // @api
    function createIntersectionTypeNode(types: AstNodeArrayLike<AstTypeNode>): AstIntersectionTypeNode {
        const node = AstNode.IntersectionTypeNode();
        node.data.types = createNodeArray(parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType(types));
        return finish(node);
    }

    // @api
    function updateIntersectionTypeNode(node: AstIntersectionTypeNode, types: AstNodeArray<AstTypeNode>) {
        return !sameNodeArray(node.data.types, types)
            ? update(createIntersectionTypeNode(types), node)
            : node;
    }

    // @api
    function createConditionalTypeNode(checkType: AstTypeNode, extendsType: AstTypeNode, trueType: AstTypeNode, falseType: AstTypeNode) {
        const node = AstNode.ConditionalTypeNode();
        node.data.checkType = parenthesizerRules().parenthesizeCheckTypeOfConditionalType(checkType);
        node.data.extendsType = parenthesizerRules().parenthesizeExtendsTypeOfConditionalType(extendsType);
        node.data.trueType = trueType;
        node.data.falseType = falseType;
        return finish(node);
    }

    // @api
    function updateConditionalTypeNode(node: AstConditionalTypeNode, checkType: AstTypeNode, extendsType: AstTypeNode, trueType: AstTypeNode, falseType: AstTypeNode) {
        return node.data.checkType !== checkType
                || node.data.extendsType !== extendsType
                || node.data.trueType !== trueType
                || node.data.falseType !== falseType
            ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
            : node;
    }

    // @api
    function createInferTypeNode(typeParameter: AstTypeParameterDeclaration) {
        const node = AstNode.InferTypeNode();
        node.data.typeParameter = typeParameter;
        return finish(node);
    }

    // @api
    function updateInferTypeNode(node: AstInferTypeNode, typeParameter: AstTypeParameterDeclaration) {
        return node.data.typeParameter !== typeParameter
            ? update(createInferTypeNode(typeParameter), node)
            : node;
    }

    // @api
    function createTemplateLiteralType(head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateLiteralTypeSpan>) {
        const node = AstNode.TemplateLiteralTypeNode();
        node.data.head = head;
        node.data.templateSpans = createNodeArray(templateSpans);
        return finish(node);
    }

    // @api
    function updateTemplateLiteralType(node: AstTemplateLiteralTypeNode, head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateLiteralTypeSpan>) {
        return node.data.head !== head
                || !sameNodeArray(node.data.templateSpans, templateSpans)
            ? update(createTemplateLiteralType(head, templateSpans), node)
            : node;
    }

    // @api
    function createImportTypeNode(
        argument: AstTypeNode,
        attributes?: AstImportAttributes,
        qualifier?: AstEntityName,
        typeArguments?: AstNodeArrayLike<AstTypeNode>,
        isTypeOf = false,
    ): AstImportTypeNode {
        const node = AstNode.ImportTypeNode();
        node.data.argument = argument;
        node.data.attributes = attributes;

        // TODO: remove this? 'assertions' is never defined here
        if (node.data.assertions && node.data.assertions.data.assertClause && node.data.attributes) {
            node.data.assertions.data.assertClause = node.data.attributes;
        }

        node.data.qualifier = qualifier;
        node.data.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.data.isTypeOf = isTypeOf;
        return finish(node);
    }

    // @api
    function updateImportTypeNode(
        node: AstImportTypeNode,
        argument: AstTypeNode,
        attributes: AstImportAttributes | undefined,
        qualifier: AstEntityName | undefined,
        typeArguments: AstNodeArrayLike<AstTypeNode> | undefined,
        isTypeOf: boolean = node.data.isTypeOf,
    ): AstImportTypeNode {
        return node.data.argument !== argument
                || node.data.attributes !== attributes
                || node.data.qualifier !== qualifier
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || node.data.isTypeOf !== isTypeOf
            ? update(createImportTypeNode(argument, attributes, qualifier, typeArguments, isTypeOf), node)
            : node;
    }

    // @api
    function createParenthesizedType(type: AstTypeNode) {
        const node = AstNode.ParenthesizedTypeNode();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateParenthesizedType(node: AstParenthesizedTypeNode, type: AstTypeNode) {
        return node.data.type !== type
            ? update(createParenthesizedType(type), node)
            : node;
    }

    // @api
    function createThisTypeNode() {
        const node = AstNode.ThisTypeNode();
        return finish(node);
    }

    // @api
    function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: AstTypeNode): AstTypeOperatorNode {
        const node = AstNode.TypeOperatorNode();
        node.data.operator = operator;
        node.data.type = operator === SyntaxKind.ReadonlyKeyword ?
            parenthesizerRules().parenthesizeOperandOfReadonlyTypeOperator(type) :
            parenthesizerRules().parenthesizeOperandOfTypeOperator(type);
        return finish(node);
    }

    // @api
    function updateTypeOperatorNode(node: AstTypeOperatorNode, type: AstTypeNode) {
        return node.data.type !== type
            ? update(createTypeOperatorNode(node.data.operator, type), node)
            : node;
    }

    // @api
    function createIndexedAccessTypeNode(objectType: AstTypeNode, indexType: AstTypeNode) {
        const node = AstNode.IndexedAccessTypeNode();
        node.data.objectType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(objectType);
        node.data.indexType = indexType;
        return finish(node);
    }

    // @api
    function updateIndexedAccessTypeNode(node: AstIndexedAccessTypeNode, objectType: AstTypeNode, indexType: AstTypeNode) {
        return node.data.objectType !== objectType
                || node.data.indexType !== indexType
            ? update(createIndexedAccessTypeNode(objectType, indexType), node)
            : node;
    }

    // @api
    function createMappedTypeNode(readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined, typeParameter: AstTypeParameterDeclaration, nameType: AstTypeNode | undefined, questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined, type: AstTypeNode | undefined, members: AstNodeArrayLike<AstTypeElement> | undefined): AstMappedTypeNode {
        const node = AstNode.MappedTypeNode();
        node.data.readonlyToken = readonlyToken;
        node.data.typeParameter = typeParameter;
        node.data.nameType = nameType;
        node.data.questionToken = questionToken;
        node.data.type = type;
        node.data.members = members && createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateMappedTypeNode(node: AstMappedTypeNode, readonlyToken: AstReadonlyKeyword | AstPlusToken | AstMinusToken | undefined, typeParameter: AstTypeParameterDeclaration, nameType: AstTypeNode | undefined, questionToken: AstQuestionToken | AstPlusToken | AstMinusToken | undefined, type: AstTypeNode | undefined, members: AstNodeArrayLike<AstTypeElement> | undefined): AstMappedTypeNode {
        return node.data.readonlyToken !== readonlyToken
                || node.data.typeParameter !== typeParameter
                || node.data.nameType !== nameType
                || node.data.questionToken !== questionToken
                || node.data.type !== type
                || !sameNodeArray(node.data.members, members)
            ? update(createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), node)
            : node;
    }

    // @api
    function createLiteralTypeNode(literal: AstLiteralTypeNode["data"]["literal"]) {
        const node = AstNode.LiteralTypeNode();
        node.data.literal = literal;
        return finish(node);
    }

    // @api
    function updateLiteralTypeNode(node: AstLiteralTypeNode, literal: AstLiteralTypeNode["data"]["literal"]) {
        return node.data.literal !== literal
            ? update(createLiteralTypeNode(literal), node)
            : node;
    }

    //
    // Binding Patterns
    //

    // @api
    function createObjectBindingPattern(elements: AstNodeArrayLike<AstBindingElement>) {
        const node = AstNode.ObjectBindingPattern();
        node.data.elements = createNodeArray(elements);
        return finish(node);
    }

    // @api
    function updateObjectBindingPattern(node: AstObjectBindingPattern, elements: AstNodeArrayLike<AstBindingElement>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createObjectBindingPattern(elements), node)
            : node;
    }

    // @api
    function createArrayBindingPattern(elements: AstNodeArrayLike<AstArrayBindingElement>) {
        const node = AstNode.ArrayBindingPattern();
        node.data.elements = createNodeArray(elements);
        return finish(node);
    }

    // @api
    function updateArrayBindingPattern(node: AstArrayBindingPattern, elements: AstNodeArrayLike<AstArrayBindingElement>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createArrayBindingPattern(elements), node)
            : node;
    }

    // @api
    function createBindingElement(dotDotDotToken: AstDotDotDotToken | undefined, propertyName: string | AstPropertyName | undefined, name: string | AstBindingName, initializer?: AstExpression) {
        const node = AstNode.BindingElement();
        node.data.dotDotDotToken = dotDotDotToken;
        node.data.propertyName = asName(propertyName);
        node.data.name = asName(name);
        node.data.initializer = asInitializer(initializer);
        return finish(node);
    }

    // @api
    function updateBindingElement(node: AstBindingElement, dotDotDotToken: AstDotDotDotToken | undefined, propertyName: AstPropertyName | undefined, name: AstBindingName, initializer: AstExpression | undefined) {
        return node.data.propertyName !== propertyName
                || node.data.dotDotDotToken !== dotDotDotToken
                || node.data.name !== name
                || node.data.initializer !== initializer
            ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
            : node;
    }

    //
    // Expression
    //

    // @api
    function createArrayLiteralExpression(elements?: AstNodeArrayLike<AstExpression>, multiLine?: boolean) {
        const node = AstNode.ArrayLiteralExpression();
        // Ensure we add a trailing comma for something like `[NumericLiteral(1), NumericLiteral(2), OmittedExpresion]` so that
        // we end up with `[1, 2, ,]` instead of `[1, 2, ]` otherwise the `OmittedExpression` will just end up being treated like
        // a trailing comma.
        const lastElement = elements && lastOrUndefined(arrayItems(elements));
        const elementsArray = createNodeArray(elements, lastElement && astIsOmittedExpression(lastElement) ? true : undefined);
        node.data.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
        node.data.multiLine = multiLine;
        return finish(node);
    }

    // @api
    function updateArrayLiteralExpression(node: AstArrayLiteralExpression, elements: AstNodeArrayLike<AstExpression>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createArrayLiteralExpression(elements, node.data.multiLine), node)
            : node;
    }

    // @api
    function createObjectLiteralExpression(properties?: AstNodeArrayLike<AstObjectLiteralElementLike>, multiLine?: boolean) {
        const node = AstNode.ObjectLiteralExpression();
        node.data.properties = createNodeArray(properties);
        node.data.multiLine = multiLine;
        return finish(node);
    }

    // @api
    function updateObjectLiteralExpression(node: AstObjectLiteralExpression, properties: AstNodeArrayLike<AstObjectLiteralElementLike>) {
        return !sameNodeArray(node.data.properties, properties)
            ? update(createObjectLiteralExpression(properties, node.data.multiLine), node)
            : node;
    }

    function createPropertyAccessExpressionWorker(expression: AstExpression, name: string | AstIdentifier | AstPrivateIdentifier) {
        const node = AstNode.PropertyAccessExpression();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.data.name = asName(name);
        return finish(node);
    }

    // @api
    function createPropertyAccessExpression(expression: AstExpression, name: string | AstIdentifier | AstPrivateIdentifier) {
        const node = createPropertyAccessExpressionWorker(expression, name);
        if (flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess) {
            setEmitFlags(node, EmitFlags.NoIndentation);
        }
        return node;
    }

    // @api
    function updatePropertyAccessExpression(node: AstPropertyAccessExpression, expression: AstExpression, name: AstIdentifier | AstPrivateIdentifier) {
        if (astIsPropertyAccessChain(node)) {
            return updatePropertyAccessChain(node, expression, node.data.questionDotToken, cast(name, astIsIdentifier));
        }
        return node.data.expression !== expression
                || node.data.name !== name
            ? update(createPropertyAccessExpressionWorker(expression, name), node)
            : node;
    }

    function createPropertyAccessChainWorker(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, name: string | AstIdentifier | AstPrivateIdentifier) {
        const node = AstNode.PropertyAccessChain();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.data.questionDotToken = questionDotToken;
        node.data.name = asName(name);
        return finish(node);
    }

    // @api
    function createPropertyAccessChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, name: string | AstIdentifier | AstPrivateIdentifier) {
        const node = createPropertyAccessChainWorker(expression, questionDotToken, name);
        if (flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess) {
            setEmitFlags(node, EmitFlags.NoIndentation);
        }
        return node;
    }

    // @api
    function updatePropertyAccessChain(node: AstPropertyAccessChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, name: AstIdentifier | AstPrivateIdentifier) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a PropertyAccessExpression using updatePropertyAccessChain. Use updatePropertyAccess instead.");
        // Because we are updating an existing PropertyAccessChain we want to inherit its emitFlags
        // instead of using the default from createPropertyAccess
        return node.data.expression !== expression
                || node.data.questionDotToken !== questionDotToken
                || node.data.name !== name
            ? update(createPropertyAccessChainWorker(expression, questionDotToken, name), node)
            : node;
    }

    // @api
    function createElementAccessExpression(expression: AstExpression, index: number | AstExpression) {
        const node = AstNode.ElementAccessExpression();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.data.argumentExpression = asExpression(index);
        return finish(node);
    }

    // @api
    function updateElementAccessExpression(node: AstElementAccessExpression, expression: AstExpression, argumentExpression: AstExpression) {
        if (astIsElementAccessChain(node)) {
            return updateElementAccessChain(node, expression, node.data.questionDotToken, argumentExpression);
        }
        return node.data.expression !== expression
                || node.data.argumentExpression !== argumentExpression
            ? update(createElementAccessExpression(expression, argumentExpression), node)
            : node;
    }

    // @api
    function createElementAccessChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, index: number | AstExpression) {
        const node = AstNode.ElementAccessChain();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.data.questionDotToken = questionDotToken;
        node.data.argumentExpression = asExpression(index);
        return finish(node);
    }

    // @api
    function updateElementAccessChain(node: AstElementAccessChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, argumentExpression: AstExpression) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a ElementAccessExpression using updateElementAccessChain. Use updateElementAccess instead.");
        // Because we are updating an existing ElementAccessChain we want to inherit its emitFlags
        // instead of using the default from createElementAccess
        return node.data.expression !== expression
                || node.data.questionDotToken !== questionDotToken
                || node.data.argumentExpression !== argumentExpression
            ? update(createElementAccessChain(expression, questionDotToken, argumentExpression), node)
            : node;
    }
    // @api
    function createCallExpression(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined) {
        const node = AstNode.CallExpression();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.arguments = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray));
        return finish(node);
    }

    // @api
    function updateCallExpression(node: AstCallExpression, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression>) {
        if (astIsCallChain(node)) {
            return updateCallChain(node, expression, node.data.questionDotToken, typeArguments, argumentsArray);
        }
        return node.data.expression !== expression
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || !sameNodeArray(node.data.arguments, argumentsArray)
            ? update(createCallExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createCallChain(expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined) {
        const node = AstNode.CallChain();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.data.questionDotToken = questionDotToken;
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.arguments = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray));
        return finish(node);
    }

    // @api
    function updateCallChain(node: AstCallChain, expression: AstExpression, questionDotToken: AstQuestionDotToken | undefined, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression>) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a CallExpression using updateCallChain. Use updateCall instead.");
        return node.data.expression !== expression
                || node.data.questionDotToken !== questionDotToken
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || !sameNodeArray(node.data.arguments, argumentsArray)
            ? update(createCallChain(expression, questionDotToken, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createNewExpression(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined) {
        const node = AstNode.NewExpression();
        node.data.expression = parenthesizerRules().parenthesizeExpressionOfNew(expression);
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : undefined;
        return finish(node);
    }

    // @api
    function updateNewExpression(node: AstNewExpression, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, argumentsArray: AstNodeArrayLike<AstExpression> | undefined) {
        return node.data.expression !== expression
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || !sameNodeArray(node.data.arguments, argumentsArray)
            ? update(createNewExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createTaggedTemplateExpression(tag: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, template: AstTemplateLiteral) {
        const node = AstNode.TaggedTemplateExpression();
        node.data.tag = parenthesizerRules().parenthesizeLeftSideOfAccess(tag, /*optionalChain*/ false);
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.template = template;
        return finish(node);
    }

    // @api
    function updateTaggedTemplateExpression(node: AstTaggedTemplateExpression, tag: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, template: AstTemplateLiteral) {
        return node.data.tag !== tag
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || node.data.template !== template
            ? update(createTaggedTemplateExpression(tag, typeArguments, template), node)
            : node;
    }

    // @api
    function createTypeAssertion(type: AstTypeNode, expression: AstExpression) {
        const node = AstNode.TypeAssertion();
        node.data.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateTypeAssertion(node: AstTypeAssertion, type: AstTypeNode, expression: AstExpression) {
        return node.data.type !== type
                || node.data.expression !== expression
            ? update(createTypeAssertion(type, expression), node)
            : node;
    }

    // @api
    function createParenthesizedExpression(expression: AstExpression) {
        const node = AstNode.ParenthesizedExpression();
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateParenthesizedExpression(node: AstParenthesizedExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createParenthesizedExpression(expression), node)
            : node;
    }

    // @api
    function createFunctionExpression(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: string | AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration> | undefined,
        type: AstTypeNode | undefined,
        body: AstBlock,
    ) {
        const node = AstNode.FunctionExpression();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.asteriskToken = asteriskToken;
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateFunctionExpression(
        node: AstFunctionExpression,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock,
    ) {
        return node.data.name !== name
                || !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.asteriskToken !== asteriskToken
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || node.data.body !== body
            ? finishUpdateBaseSignatureDeclaration(createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
            : node;
    }

    // @api
    function createArrowFunction(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        equalsGreaterThanToken: AstEqualsGreaterThanToken | undefined,
        body: AstConciseBody,
    ) {
        const node = AstNode.ArrowFunction();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        node.data.equalsGreaterThanToken = equalsGreaterThanToken ?? createToken(SyntaxKind.EqualsGreaterThanToken);
        node.data.body = parenthesizerRules().parenthesizeConciseBodyOfArrowFunction(body);
        return finish(node);
    }

    // @api
    function updateArrowFunction(
        node: AstArrowFunction,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        equalsGreaterThanToken: AstEqualsGreaterThanToken,
        body: AstConciseBody,
    ): AstArrowFunction {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || node.data.equalsGreaterThanToken !== equalsGreaterThanToken
                || node.data.body !== body
            ? finishUpdateBaseSignatureDeclaration(createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body), node)
            : node;
    }

    // @api
    function createDeleteExpression(expression: AstExpression) {
        const node = AstNode.DeleteExpression();
        node.data.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        return finish(node);
    }

    // @api
    function updateDeleteExpression(node: AstDeleteExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createDeleteExpression(expression), node)
            : node;
    }

    // @api
    function createTypeOfExpression(expression: AstExpression) {
        const node = AstNode.TypeOfExpression();
        node.data.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        return finish(node);
    }

    // @api
    function updateTypeOfExpression(node: AstTypeOfExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createTypeOfExpression(expression), node)
            : node;
    }

    // @api
    function createVoidExpression(expression: AstExpression) {
        const node = AstNode.VoidExpression();
        node.data.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        return finish(node);
    }

    // @api
    function updateVoidExpression(node: AstVoidExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createVoidExpression(expression), node)
            : node;
    }

    // @api
    function createAwaitExpression(expression: AstExpression) {
        const node = AstNode.AwaitExpression();
        node.data.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        return finish(node);
    }

    // @api
    function updateAwaitExpression(node: AstAwaitExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createAwaitExpression(expression), node)
            : node;
    }

    // @api
    function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: AstExpression) {
        const node = AstNode.PrefixUnaryExpression();
        node.data.operator = operator;
        node.data.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
        return finish(node);
    }

    // @api
    function updatePrefixUnaryExpression(node: AstPrefixUnaryExpression, operand: AstExpression) {
        return node.data.operand !== operand
            ? update(createPrefixUnaryExpression(node.data.operator, operand), node)
            : node;
    }

    // @api
    function createPostfixUnaryExpression(operand: AstExpression, operator: PostfixUnaryOperator) {
        const node = AstNode.PostfixUnaryExpression();
        node.data.operator = operator;
        node.data.operand = parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
        return finish(node);
    }

    // @api
    function updatePostfixUnaryExpression(node: AstPostfixUnaryExpression, operand: AstExpression) {
        return node.data.operand !== operand
            ? update(createPostfixUnaryExpression(operand, node.data.operator), node)
            : node;
    }

    // @api
    function createBinaryExpression(left: AstExpression, operator: BinaryOperator | AstBinaryOperatorToken, right: AstExpression) {
        const node = AstNode.BinaryExpression();
        const operatorToken = asToken(operator);
        const operatorKind = operatorToken.kind;
        node.data.left = parenthesizerRules().parenthesizeLeftSideOfBinary(operatorKind, left);
        node.data.operatorToken = operatorToken;
        node.data.right = parenthesizerRules().parenthesizeRightSideOfBinary(operatorKind, node.data.left, right);
        void node.transformFlags; // precompute to avoid deep call stack for excessively nested binary expresions
        return finish(node);
    }

    // @api
    function updateBinaryExpression(node: AstBinaryExpression, left: AstExpression, operator: AstBinaryOperatorToken, right: AstExpression) {
        return node.data.left !== left
                || node.data.operatorToken !== operator
                || node.data.right !== right
            ? update(createBinaryExpression(left, operator, right), node)
            : node;
    }

    // @api
    function createConditionalExpression(condition: AstExpression, questionToken: AstQuestionToken | undefined, whenTrue: AstExpression, colonToken: AstColonToken | undefined, whenFalse: AstExpression) {
        const node = AstNode.ConditionalExpression();
        node.data.condition = parenthesizerRules().parenthesizeConditionOfConditionalExpression(condition);
        node.data.questionToken = questionToken ?? createToken(SyntaxKind.QuestionToken);
        node.data.whenTrue = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenTrue);
        node.data.colonToken = colonToken ?? createToken(SyntaxKind.ColonToken);
        node.data.whenFalse = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenFalse);
        return finish(node);
    }

    // @api
    function updateConditionalExpression(
        node: AstConditionalExpression,
        condition: AstExpression,
        questionToken: AstQuestionToken,
        whenTrue: AstExpression,
        colonToken: AstColonToken,
        whenFalse: AstExpression,
    ): AstConditionalExpression {
        return node.data.condition !== condition
                || node.data.questionToken !== questionToken
                || node.data.whenTrue !== whenTrue
                || node.data.colonToken !== colonToken
                || node.data.whenFalse !== whenFalse
            ? update(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node)
            : node;
    }

    // @api
    function createTemplateExpression(head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateSpan>) {
        const node = AstNode.TemplateExpression();
        node.data.head = head;
        node.data.templateSpans = createNodeArray(templateSpans);
        return finish(node);
    }

    // @api
    function updateTemplateExpression(node: AstTemplateExpression, head: AstTemplateHead, templateSpans: AstNodeArrayLike<AstTemplateSpan>) {
        return node.data.head !== head
                || !sameNodeArray(node.data.templateSpans, templateSpans)
            ? update(createTemplateExpression(head, templateSpans), node)
            : node;
    }

    function checkTemplateLiteralLikeNode(kind: AstTemplateLiteralToken["kind"], text: string | undefined, rawText: string | undefined, templateFlags = TokenFlags.None) {
        Debug.assert(!(templateFlags & ~TokenFlags.TemplateLiteralLikeFlags), "Unsupported template flags.");
        // NOTE: without the assignment to `undefined`, we don't narrow the initial type of `cooked`.
        // eslint-disable-next-line no-undef-init
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
        return text;
    }

    // @api
    function createTemplateLiteralLikeNode(kind: AstTemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined) {
        switch (kind) {
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return createNoSubstitutionTemplateLiteralUnchecked(text, rawText, templateFlags);
            case SyntaxKind.TemplateHead:
                return createTemplateHeadUnchecked(text, rawText, templateFlags);
            case SyntaxKind.TemplateMiddle:
                return createTemplateMiddleUnchecked(text, rawText, templateFlags);
            case SyntaxKind.TemplateTail:
                return createTemplateTailUnchecked(text, rawText, templateFlags);
            default:
                Debug.assertNever(kind);
        }
    }

    // @api
    function createTemplateHead(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateHeadUnchecked(text, rawText, templateFlags);
    }

    function createTemplateHeadUnchecked(text: string, rawText?: string, templateFlags?: TokenFlags) {
        const node = AstNode.TemplateHead();
        node.data.text = text;
        node.data.rawText = rawText;
        node.data.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        return finish(node);
    }

    // @api
    function createTemplateMiddle(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateMiddleUnchecked(text, rawText, templateFlags);
    }

    function createTemplateMiddleUnchecked(text: string, rawText?: string, templateFlags?: TokenFlags) {
        const node = AstNode.TemplateMiddle();
        node.data.text = text;
        node.data.rawText = rawText;
        node.data.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        return finish(node);
    }

    // @api
    function createTemplateTail(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateTailUnchecked(text, rawText, templateFlags);
    }

    function createTemplateTailUnchecked(text: string, rawText?: string, templateFlags?: TokenFlags) {
        const node = AstNode.TemplateTail();
        node.data.text = text;
        node.data.rawText = rawText;
        node.data.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        return finish(node);
    }

    // @api
    function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createNoSubstitutionTemplateLiteralUnchecked(text, rawText, templateFlags);
    }

    function createNoSubstitutionTemplateLiteralUnchecked(text: string, rawText?: string, templateFlags?: TokenFlags) {
        const node = AstNode.NoSubstitutionTemplateLiteral();
        node.data.text = text;
        node.data.rawText = rawText;
        node.data.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        return finish(node);
    }

    // @api
    function createYieldExpression(asteriskToken: AstAsteriskToken | undefined, expression: AstExpression | undefined): AstYieldExpression {
        Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
        const node = AstNode.YieldExpression();
        node.data.expression = expression && parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.data.asteriskToken = asteriskToken;
        return finish(node);
    }

    // @api
    function updateYieldExpression(node: AstYieldExpression, asteriskToken: AstAsteriskToken | undefined, expression: AstExpression) {
        return node.data.expression !== expression
                || node.data.asteriskToken !== asteriskToken
            ? update(createYieldExpression(asteriskToken, expression), node)
            : node;
    }

    // @api
    function createSpreadElement(expression: AstExpression) {
        const node = AstNode.SpreadElement();
        node.data.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        return finish(node);
    }

    // @api
    function updateSpreadElement(node: AstSpreadElement, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createSpreadElement(expression), node)
            : node;
    }

    // @api
    function createClassExpression(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstClassElement>,
    ) {
        const node = AstNode.ClassExpression();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.heritageClauses = asNodeArray(heritageClauses);
        node.data.members = createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateClassExpression(
        node: AstClassExpression,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstClassElement>,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.heritageClauses, heritageClauses)
                || !sameNodeArray(node.data.members, members)
            ? update(createClassExpression(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createOmittedExpression() {
        return finish(AstNode.OmittedExpression());
    }

    // @api
    function createExpressionWithTypeArguments(expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined) {
        const node = AstNode.ExpressionWithTypeArguments();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.data.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        return finish(node);
    }

    // @api
    function updateExpressionWithTypeArguments(node: AstExpressionWithTypeArguments, expression: AstExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined) {
        return node.data.expression !== expression
                || !sameNodeArray(node.data.typeArguments, typeArguments)
            ? update(createExpressionWithTypeArguments(expression, typeArguments), node)
            : node;
    }

    // @api
    function createAsExpression(expression: AstExpression, type: AstTypeNode) {
        const node = AstNode.AsExpression();
        node.data.expression = expression;
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateAsExpression(node: AstAsExpression, expression: AstExpression, type: AstTypeNode) {
        return node.data.expression !== expression
                || node.data.type !== type
            ? update(createAsExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullExpression(expression: AstExpression) {
        const node = AstNode.NonNullExpression();
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        return finish(node);
    }

    // @api
    function updateNonNullExpression(node: AstNonNullExpression, expression: AstExpression) {
        if (astIsNonNullChain(node)) {
            return updateNonNullChain(node, expression);
        }
        return node.data.expression !== expression
            ? update(createNonNullExpression(expression), node)
            : node;
    }

    // @api
    function createSatisfiesExpression(expression: AstExpression, type: AstTypeNode) {
        const node = AstNode.SatisfiesExpression();
        node.data.expression = expression;
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateSatisfiesExpression(node: AstSatisfiesExpression, expression: AstExpression, type: AstTypeNode) {
        return node.data.expression !== expression
                || node.data.type !== type
            ? update(createSatisfiesExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullChain(expression: AstExpression) {
        const node = AstNode.NonNullChain();
        node.flags |= NodeFlags.OptionalChain;
        node.data.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        return finish(node);
    }

    // @api
    function updateNonNullChain(node: AstNonNullChain, expression: AstExpression) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a NonNullExpression using updateNonNullChain. Use updateNonNullExpression instead.");
        return node.data.expression !== expression
            ? update(createNonNullChain(expression), node)
            : node;
    }

    // @api
    function createMetaProperty(keywordToken: AstMetaProperty["data"]["keywordToken"], name: AstIdentifier) {
        const node = AstNode.MetaProperty();
        node.data.keywordToken = keywordToken;
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateMetaProperty(node: AstMetaProperty, name: AstIdentifier) {
        return node.data.name !== name
            ? update(createMetaProperty(node.data.keywordToken, name), node)
            : node;
    }

    //
    // Misc
    //

    // @api
    function createTemplateSpan(expression: AstExpression, literal: AstTemplateMiddle | AstTemplateTail) {
        const node = AstNode.TemplateSpan();
        node.data.expression = expression;
        node.data.literal = literal;
        return finish(node);
    }

    // @api
    function updateTemplateSpan(node: AstTemplateSpan, expression: AstExpression, literal: AstTemplateMiddle | AstTemplateTail) {
        return node.data.expression !== expression
                || node.data.literal !== literal
            ? update(createTemplateSpan(expression, literal), node)
            : node;
    }

    // @api
    function createSemicolonClassElement() {
        const node = AstNode.SemicolonClassElement();
        return finish(node);
    }

    //
    // Element
    //

    // @api
    function createBlock(statements: AstNodeArrayLike<AstStatement>, multiLine?: boolean): AstBlock {
        const node = AstNode.Block();
        node.data.statements = createNodeArray(statements);
        node.data.multiLine = multiLine;
        return finish(node);
    }

    // @api
    function updateBlock(node: AstBlock, statements: AstNodeArrayLike<AstStatement>) {
        return !sameNodeArray(node.data.statements, statements)
            ? update(createBlock(statements, node.data.multiLine), node)
            : node;
    }

    // @api
    function createVariableStatement(modifiers: AstNodeArrayLike<AstModifierLike> | undefined, declarationList: AstVariableDeclarationList | AstNodeArrayLike<AstVariableDeclaration>) {
        const node = AstNode.VariableStatement();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.declarationList = declarationList instanceof AstNode ? declarationList : createVariableDeclarationList(declarationList);
        return finish(node);
    }

    // @api
    function updateVariableStatement(node: AstVariableStatement, modifiers: AstNodeArrayLike<AstModifierLike> | undefined, declarationList: AstVariableDeclarationList) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.declarationList !== declarationList
            ? update(createVariableStatement(modifiers, declarationList), node)
            : node;
    }

    // @api
    function createEmptyStatement() {
        const node = AstNode.EmptyStatement();
        return finish(node);
    }

    // @api
    function createExpressionStatement(expression: AstExpression): AstExpressionStatement {
        const node = AstNode.ExpressionStatement();
        node.data.expression = parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
        return finish(node);
    }

    // @api
    function updateExpressionStatement(node: AstExpressionStatement, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createExpressionStatement(expression), node)
            : node;
    }

    // @api
    function createIfStatement(expression: AstExpression, thenStatement: AstStatement, elseStatement?: AstStatement) {
        const node = AstNode.IfStatement();
        node.data.expression = expression;
        node.data.thenStatement = asEmbeddedStatement(thenStatement);
        node.data.elseStatement = asEmbeddedStatement(elseStatement);
        return finish(node);
    }

    // @api
    function updateIfStatement(node: AstIfStatement, expression: AstExpression, thenStatement: AstStatement, elseStatement: AstStatement | undefined) {
        return node.data.expression !== expression
                || node.data.thenStatement !== thenStatement
                || node.data.elseStatement !== elseStatement
            ? update(createIfStatement(expression, thenStatement, elseStatement), node)
            : node;
    }

    // @api
    function createDoStatement(statement: AstStatement, expression: AstExpression) {
        const node = AstNode.DoStatement();
        node.data.statement = asEmbeddedStatement(statement);
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateDoStatement(node: AstDoStatement, statement: AstStatement, expression: AstExpression) {
        return node.data.statement !== statement
                || node.data.expression !== expression
            ? update(createDoStatement(statement, expression), node)
            : node;
    }

    // @api
    function createWhileStatement(expression: AstExpression, statement: AstStatement) {
        const node = AstNode.WhileStatement();
        node.data.expression = expression;
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateWhileStatement(node: AstWhileStatement, expression: AstExpression, statement: AstStatement) {
        return node.data.expression !== expression
                || node.data.statement !== statement
            ? update(createWhileStatement(expression, statement), node)
            : node;
    }

    // @api
    function createForStatement(initializer: AstForInitializer | undefined, condition: AstExpression | undefined, incrementor: AstExpression | undefined, statement: AstStatement) {
        const node = AstNode.ForStatement();
        node.data.initializer = initializer;
        node.data.condition = condition;
        node.data.incrementor = incrementor;
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateForStatement(node: AstForStatement, initializer: AstForInitializer | undefined, condition: AstExpression | undefined, incrementor: AstExpression | undefined, statement: AstStatement) {
        return node.data.initializer !== initializer
                || node.data.condition !== condition
                || node.data.incrementor !== incrementor
                || node.data.statement !== statement
            ? update(createForStatement(initializer, condition, incrementor, statement), node)
            : node;
    }

    // @api
    function createForInStatement(initializer: AstForInitializer, expression: AstExpression, statement: AstStatement) {
        const node = AstNode.ForInStatement();
        node.data.initializer = initializer;
        node.data.expression = expression;
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateForInStatement(node: AstForInStatement, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement) {
        return node.data.initializer !== initializer
                || node.data.expression !== expression
                || node.data.statement !== statement
            ? update(createForInStatement(initializer, expression, statement), node)
            : node;
    }

    // @api
    function createForOfStatement(awaitModifier: AstAwaitKeyword | undefined, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement) {
        const node = AstNode.ForOfStatement();
        node.data.awaitModifier = awaitModifier;
        node.data.initializer = initializer;
        node.data.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateForOfStatement(node: AstForOfStatement, awaitModifier: AstAwaitKeyword | undefined, initializer: AstForInitializer, expression: AstExpression, statement: AstStatement) {
        return node.data.awaitModifier !== awaitModifier
                || node.data.initializer !== initializer
                || node.data.expression !== expression
                || node.data.statement !== statement
            ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node)
            : node;
    }

    // @api
    function createContinueStatement(label?: string | AstIdentifier): AstContinueStatement {
        const node = AstNode.ContinueStatement();
        node.data.label = asName(label);
        return finish(node);
    }

    // @api
    function updateContinueStatement(node: AstContinueStatement, label: AstIdentifier | undefined) {
        return node.data.label !== label
            ? update(createContinueStatement(label), node)
            : node;
    }

    // @api
    function createBreakStatement(label?: string | AstIdentifier): AstBreakStatement {
        const node = AstNode.BreakStatement();
        node.data.label = asName(label);
        return finish(node);
    }

    // @api
    function updateBreakStatement(node: AstBreakStatement, label: AstIdentifier | undefined) {
        return node.data.label !== label
            ? update(createBreakStatement(label), node)
            : node;
    }

    // @api
    function createReturnStatement(expression?: AstExpression): AstReturnStatement {
        const node = AstNode.ReturnStatement();
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateReturnStatement(node: AstReturnStatement, expression: AstExpression | undefined) {
        return node.data.expression !== expression
            ? update(createReturnStatement(expression), node)
            : node;
    }

    // @api
    function createWithStatement(expression: AstExpression, statement: AstStatement) {
        const node = AstNode.WithStatement();
        node.data.expression = expression;
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateWithStatement(node: AstWithStatement, expression: AstExpression, statement: AstStatement) {
        return node.data.expression !== expression
                || node.data.statement !== statement
            ? update(createWithStatement(expression, statement), node)
            : node;
    }

    // @api
    function createSwitchStatement(expression: AstExpression, caseBlock: AstCaseBlock): AstSwitchStatement {
        const node = AstNode.SwitchStatement();
        node.data.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.data.caseBlock = caseBlock;
        node.data.possiblyExhaustive = false; // initialized by binder
        return finish(node);
    }

    // @api
    function updateSwitchStatement(node: AstSwitchStatement, expression: AstExpression, caseBlock: AstCaseBlock) {
        return node.data.expression !== expression
                || node.data.caseBlock !== caseBlock
            ? update(createSwitchStatement(expression, caseBlock), node)
            : node;
    }

    // @api
    function createLabeledStatement(label: string | AstIdentifier, statement: AstStatement) {
        const node = AstNode.LabeledStatement();
        node.data.label = asName(label);
        node.data.statement = asEmbeddedStatement(statement);
        return finish(node);
    }

    // @api
    function updateLabeledStatement(node: AstLabeledStatement, label: AstIdentifier, statement: AstStatement) {
        return node.data.label !== label
                || node.data.statement !== statement
            ? update(createLabeledStatement(label, statement), node)
            : node;
    }

    // @api
    function createThrowStatement(expression: AstExpression) {
        const node = AstNode.ThrowStatement();
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateThrowStatement(node: AstThrowStatement, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createThrowStatement(expression), node)
            : node;
    }

    // @api
    function createTryStatement(tryBlock: AstBlock, catchClause: AstCatchClause | undefined, finallyBlock: AstBlock | undefined) {
        const node = AstNode.TryStatement();
        node.data.tryBlock = tryBlock;
        node.data.catchClause = catchClause;
        node.data.finallyBlock = finallyBlock;
        return finish(node);
    }

    // @api
    function updateTryStatement(node: AstTryStatement, tryBlock: AstBlock, catchClause: AstCatchClause | undefined, finallyBlock: AstBlock | undefined) {
        return node.data.tryBlock !== tryBlock
                || node.data.catchClause !== catchClause
                || node.data.finallyBlock !== finallyBlock
            ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node)
            : node;
    }

    // @api
    function createDebuggerStatement() {
        const node = AstNode.DebuggerStatement();
        return finish(node);
    }

    // @api
    function createVariableDeclaration(name: string | AstBindingName, exclamationToken: AstExclamationToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined) {
        const node = AstNode.VariableDeclaration();
        node.data.name = asName(name);
        node.data.exclamationToken = exclamationToken;
        node.data.type = type;
        node.data.initializer = asInitializer(initializer);
        return finish(node);
    }

    // @api
    function updateVariableDeclaration(node: AstVariableDeclaration, name: AstBindingName, exclamationToken: AstExclamationToken | undefined, type: AstTypeNode | undefined, initializer: AstExpression | undefined) {
        return node.data.name !== name
                || node.data.type !== type
                || node.data.exclamationToken !== exclamationToken
                || node.data.initializer !== initializer
            ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createVariableDeclarationList(declarations: AstNodeArrayLike<AstVariableDeclaration>, flags = NodeFlags.None) {
        const node = AstNode.VariableDeclarationList();
        node.flags |= flags & NodeFlags.BlockScoped;
        node.data.declarations = createNodeArray(declarations);
        return finish(node);
    }

    // @api
    function updateVariableDeclarationList(node: AstVariableDeclarationList, declarations: AstNodeArrayLike<AstVariableDeclaration>) {
        return !sameNodeArray(node.data.declarations, declarations)
            ? update(createVariableDeclarationList(declarations, node.flags), node)
            : node;
    }

    // @api
    function createFunctionDeclaration(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: string | AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        const node = AstNode.FunctionDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.asteriskToken = asteriskToken;
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateFunctionDeclaration(
        node: AstFunctionDeclaration,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        asteriskToken: AstAsteriskToken | undefined,
        name: AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        parameters: AstNodeArrayLike<AstParameterDeclaration>,
        type: AstTypeNode | undefined,
        body: AstBlock | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.asteriskToken !== asteriskToken
                || node.data.name !== name
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
                || node.data.body !== body
            ? finishUpdateBaseSignatureDeclaration(createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body), node)
            : node;
    }

    // @api
    function createClassDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstClassElement>,
    ) {
        const node = AstNode.ClassDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.heritageClauses = asNodeArray(heritageClauses);
        node.data.members = createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateClassDeclaration(
        node: AstClassDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstIdentifier | undefined,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstClassElement>,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.heritageClauses, heritageClauses)
                || !sameNodeArray(node.data.members, members)
            ? update(createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createInterfaceDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstIdentifier,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstTypeElement>,
    ) {
        const node = AstNode.InterfaceDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.heritageClauses = asNodeArray(heritageClauses);
        node.data.members = createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateInterfaceDeclaration(
        node: AstInterfaceDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstIdentifier,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        heritageClauses: AstNodeArrayLike<AstHeritageClause> | undefined,
        members: AstNodeArrayLike<AstTypeElement>,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.heritageClauses, heritageClauses)
                || !sameNodeArray(node.data.members, members)
            ? update(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createTypeAliasDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstIdentifier,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        type: AstTypeNode,
    ) {
        const node = AstNode.TypeAliasDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateTypeAliasDeclaration(
        node: AstTypeAliasDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstIdentifier,
        typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration> | undefined,
        type: AstTypeNode,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || node.data.type !== type
            ? update(createTypeAliasDeclaration(modifiers, name, typeParameters, type), node)
            : node;
    }

    // @api
    function createEnumDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: string | AstIdentifier,
        members: AstNodeArrayLike<AstEnumMember>,
    ) {
        const node = AstNode.EnumDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.members = createNodeArray(members);
        return finish(node);
    }

    // @api
    function updateEnumDeclaration(
        node: AstEnumDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstIdentifier,
        members: AstNodeArrayLike<AstEnumMember>,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || !sameNodeArray(node.data.members, members)
            ? update(createEnumDeclaration(modifiers, name, members), node)
            : node;
    }

    // @api
    function createModuleDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstModuleName,
        body: AstModuleBody | undefined,
        flags = NodeFlags.None,
    ) {
        const node = AstNode.ModuleDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.flags |= flags & (NodeFlags.Namespace | NodeFlags.NestedNamespace | NodeFlags.GlobalAugmentation);
        node.data.name = name;
        node.data.body = body;
        return finish(node);
    }

    // @api
    function updateModuleDeclaration(
        node: AstModuleDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        name: AstModuleName,
        body: AstModuleBody | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.name !== name
                || node.data.body !== body
            ? update(createModuleDeclaration(modifiers, name, body, node.flags), node)
            : node;
    }

    // @api
    function createModuleBlock(statements: AstNodeArrayLike<AstStatement>) {
        const node = AstNode.ModuleBlock();
        node.data.statements = createNodeArray(statements);
        return finish(node);
    }

    // @api
    function updateModuleBlock(node: AstModuleBlock, statements: AstNodeArrayLike<AstStatement>) {
        return !sameNodeArray(node.data.statements, statements)
            ? update(createModuleBlock(statements), node)
            : node;
    }

    // @api
    function createCaseBlock(clauses: AstNodeArrayLike<AstCaseOrDefaultClause>): AstCaseBlock {
        const node = AstNode.CaseBlock();
        node.data.clauses = createNodeArray(clauses);
        return finish(node);
    }

    // @api
    function updateCaseBlock(node: AstCaseBlock, clauses: AstNodeArrayLike<AstCaseOrDefaultClause>) {
        return !sameNodeArray(node.data.clauses, clauses)
            ? update(createCaseBlock(clauses), node)
            : node;
    }

    // @api
    function createNamespaceExportDeclaration(name: string | AstIdentifier) {
        const node = AstNode.NamespaceExportDeclaration();
        node.data.name = asName(name);
        return finish(node);
    }

    // @api
    function updateNamespaceExportDeclaration(node: AstNamespaceExportDeclaration, name: AstIdentifier) {
        return node.data.name !== name
            ? finishUpdateNamespaceExportDeclaration(createNamespaceExportDeclaration(name), node)
            : node;
    }

    function finishUpdateNamespaceExportDeclaration(updated: AstNamespaceExportDeclaration, original: AstNamespaceExportDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.modifiers = original.data.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createImportEqualsDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        isTypeOnly: boolean,
        name: string | AstIdentifier,
        moduleReference: AstModuleReference,
    ) {
        const node = AstNode.ImportEqualsDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.name = asName(name);
        node.data.isTypeOnly = isTypeOnly;
        node.data.moduleReference = moduleReference;
        return finish(node);
    }

    // @api
    function updateImportEqualsDeclaration(
        node: AstImportEqualsDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        isTypeOnly: boolean,
        name: AstIdentifier,
        moduleReference: AstModuleReference,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.isTypeOnly !== isTypeOnly
                || node.data.name !== name
                || node.data.moduleReference !== moduleReference
            ? update(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node)
            : node;
    }

    // @api
    function createImportDeclaration(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        importClause: AstImportClause | undefined,
        moduleSpecifier: AstExpression,
        attributes: AstImportAttributes | undefined,
    ): AstImportDeclaration {
        const node = AstNode.ImportDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.importClause = importClause;
        node.data.moduleSpecifier = moduleSpecifier;
        node.data.attributes = attributes;
        return finish(node);
    }

    // @api
    function updateImportDeclaration(
        node: AstImportDeclaration,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        importClause: AstImportClause | undefined,
        moduleSpecifier: AstExpression,
        attributes: AstImportAttributes | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.importClause !== importClause
                || node.data.moduleSpecifier !== moduleSpecifier
                || node.data.attributes !== attributes
            ? update(createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes), node)
            : node;
    }

    // @api
    function createImportClause(isTypeOnly: boolean, name: AstIdentifier | undefined, namedBindings: AstNamedImportBindings | undefined): AstImportClause {
        const node = AstNode.ImportClause();
        node.data.isTypeOnly = isTypeOnly;
        node.data.name = name;
        node.data.namedBindings = namedBindings;
        // node.transformFlags |= propagateChildFlags(node.name) |
        //     propagateChildFlags(node.namedBindings);
        // if (isTypeOnly) {
        //     node.transformFlags |= TransformFlags.ContainsTypeScript;
        // }
        // node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return finish(node);
    }

    // @api
    function updateImportClause(node: AstImportClause, isTypeOnly: boolean, name: AstIdentifier | undefined, namedBindings: AstNamedImportBindings | undefined) {
        return node.data.isTypeOnly !== isTypeOnly
                || node.data.name !== name
                || node.data.namedBindings !== namedBindings
            ? update(createImportClause(isTypeOnly, name, namedBindings), node)
            : node;
    }

    // @api
    function createAssertClause(elements: AstNodeArrayLike<AstAssertEntry>, multiLine?: boolean): AstAssertClause {
        const node = AstNode.ImportAttributes();
        node.data.elements = createNodeArray(elements);
        node.data.multiLine = multiLine;
        node.data.token = SyntaxKind.AssertKeyword;
        return finish(node);
    }

    // @api
    function updateAssertClause(node: AstAssertClause, elements: AstNodeArrayLike<AstAssertEntry>, multiLine?: boolean): AstAssertClause {
        return !sameNodeArray(node.data.elements, elements)
                || node.data.multiLine !== multiLine
            ? update(createAssertClause(elements, multiLine), node)
            : node;
    }

    // @api
    function createAssertEntry(name: AstAssertionKey, value: AstExpression): AstImportAttribute {
        const node = AstNode.ImportAttribute();
        node.data.name = name;
        node.data.value = value;
        return finish(node);
    }

    // @api
    function updateAssertEntry(node: AstImportAttribute, name: AstAssertionKey, value: AstExpression): AstImportAttribute {
        return node.data.name !== name
                || node.data.value !== value
            ? update(createAssertEntry(name, value), node)
            : node;
    }

    // @api
    function createImportTypeAssertionContainer(clause: AstAssertClause, multiLine = false): AstImportTypeAssertionContainer {
        const node = AstNode.ImportTypeAssertionContainer();
        node.data.assertClause = clause;
        node.data.multiLine = multiLine;
        return finish(node);
    }

    // @api
    function updateImportTypeAssertionContainer(node: AstImportTypeAssertionContainer, clause: AstAssertClause, multiLine?: boolean): AstImportTypeAssertionContainer {
        return node.data.assertClause !== clause
                || node.data.multiLine !== multiLine
            ? update(createImportTypeAssertionContainer(clause, multiLine), node)
            : node;
    }

    // @api
    function createImportAttributes(elements: AstNodeArrayLike<AstImportAttribute>, multiLine?: boolean): AstImportAttributes;
    function createImportAttributes(elements: AstNodeArrayLike<AstImportAttribute>, multiLine?: boolean, token?: AstImportAttributes["data"]["token"]): AstImportAttributes;
    function createImportAttributes(elements: AstNodeArrayLike<AstImportAttribute>, multiLine?: boolean, token?: AstImportAttributes["data"]["token"]): AstImportAttributes {
        const node = AstNode.ImportAttributes();
        node.data.token = token ?? SyntaxKind.WithKeyword;
        node.data.elements = createNodeArray(elements);
        node.data.multiLine = multiLine;
        return finish(node);
    }

    // @api
    function updateImportAttributes(node: AstImportAttributes, elements: AstNodeArrayLike<AstImportAttribute>, multiLine?: boolean): AstImportAttributes {
        return !sameNodeArray(node.data.elements, elements)
                || node.data.multiLine !== multiLine
            ? update(createImportAttributes(elements, multiLine, node.data.token), node)
            : node;
    }

    // @api
    function createImportAttribute(name: AstImportAttributeName, value: AstExpression): AstImportAttribute {
        const node = AstNode.ImportAttribute();
        node.data.name = name;
        node.data.value = value;
        return finish(node);
    }

    // @api
    function updateImportAttribute(node: AstImportAttribute, name: AstImportAttributeName, value: AstExpression): AstImportAttribute {
        return node.data.name !== name
                || node.data.value !== value
            ? update(createImportAttribute(name, value), node)
            : node;
    }

    // @api
    function createNamespaceImport(name: AstIdentifier): AstNamespaceImport {
        const node = AstNode.NamespaceImport();
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateNamespaceImport(node: AstNamespaceImport, name: AstIdentifier) {
        return node.data.name !== name
            ? update(createNamespaceImport(name), node)
            : node;
    }

    // @api
    function createNamespaceExport(name: AstModuleExportName): AstNamespaceExport {
        const node = AstNode.NamespaceExport();
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateNamespaceExport(node: AstNamespaceExport, name: AstModuleExportName) {
        return node.data.name !== name
            ? update(createNamespaceExport(name), node)
            : node;
    }

    // @api
    function createNamedImports(elements: AstNodeArrayLike<AstImportSpecifier>): AstNamedImports {
        const node = AstNode.NamedImports();
        node.data.elements = createNodeArray(elements);
        return finish(node);
    }

    // @api
    function updateNamedImports(node: AstNamedImports, elements: AstNodeArrayLike<AstImportSpecifier>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createNamedImports(elements), node)
            : node;
    }

    // @api
    function createImportSpecifier(isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstIdentifier) {
        const node = AstNode.ImportSpecifier();
        node.data.isTypeOnly = isTypeOnly;
        node.data.propertyName = propertyName;
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateImportSpecifier(node: AstImportSpecifier, isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstIdentifier) {
        return node.data.isTypeOnly !== isTypeOnly
                || node.data.propertyName !== propertyName
                || node.data.name !== name
            ? update(createImportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createExportAssignment(
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        isExportEquals: boolean | undefined,
        expression: AstExpression,
    ) {
        const node = AstNode.ExportAssignment();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.isExportEquals = isExportEquals;
        node.data.expression = isExportEquals
            ? parenthesizerRules().parenthesizeRightSideOfBinary(SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
            : parenthesizerRules().parenthesizeExpressionOfExportDefault(expression);
        return finish(node);
    }

    // @api
    function updateExportAssignment(
        node: AstExportAssignment,
        modifiers: AstNodeArrayLike<AstModifierLike> | undefined,
        expression: AstExpression,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.expression !== expression
            ? update(createExportAssignment(modifiers, node.data.isExportEquals, expression), node)
            : node;
    }

    // @api
    function createExportDeclaration(
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        isTypeOnly: boolean,
        exportClause: AstNamedExportBindings | undefined,
        moduleSpecifier?: AstExpression,
        attributes?: AstImportAttributes,
    ) {
        const node = AstNode.ExportDeclaration();
        node.data.modifiers = asNodeArray(modifiers);
        node.data.isTypeOnly = isTypeOnly;
        node.data.exportClause = exportClause;
        node.data.moduleSpecifier = moduleSpecifier;
        node.data.attributes = attributes;
        return finish(node);
    }

    // @api
    function updateExportDeclaration(
        node: AstExportDeclaration,
        modifiers: AstNodeArrayLike<AstModifier> | undefined,
        isTypeOnly: boolean,
        exportClause: AstNamedExportBindings | undefined,
        moduleSpecifier: AstExpression | undefined,
        attributes: AstImportAttributes | undefined,
    ) {
        return !sameNodeArray(node.data.modifiers, modifiers)
                || node.data.isTypeOnly !== isTypeOnly
                || node.data.exportClause !== exportClause
                || node.data.moduleSpecifier !== moduleSpecifier
                || node.data.attributes !== attributes
            ? update(createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes), node)
            : node;
    }

    // @api
    function createNamedExports(elements: AstNodeArrayLike<AstExportSpecifier>) {
        const node = AstNode.NamedExports();
        node.data.elements = createNodeArray(elements);
        return finish(node);
    }

    // @api
    function updateNamedExports(node: AstNamedExports, elements: AstNodeArrayLike<AstExportSpecifier>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createNamedExports(elements), node)
            : node;
    }

    // @api
    function createExportSpecifier(isTypeOnly: boolean, propertyName: string | AstModuleExportName | undefined, name: string | AstModuleExportName) {
        const node = AstNode.ExportSpecifier();
        node.data.isTypeOnly = isTypeOnly;
        node.data.propertyName = asName(propertyName);
        node.data.name = asName(name);
        return finish(node);
    }

    // @api
    function updateExportSpecifier(node: AstExportSpecifier, isTypeOnly: boolean, propertyName: AstModuleExportName | undefined, name: AstModuleExportName) {
        return node.data.isTypeOnly !== isTypeOnly
                || node.data.propertyName !== propertyName
                || node.data.name !== name
            ? update(createExportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createMissingDeclaration(): AstMissingDeclaration {
        const node = AstNode.MissingDeclaration();
        return finish(node);
    }

    //
    // Module references
    //

    // @api
    function createExternalModuleReference(expression: AstExpression) {
        const node = AstNode.ExternalModuleReference();
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateExternalModuleReference(node: AstExternalModuleReference, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createExternalModuleReference(expression), node)
            : node;
    }

    //
    // JSDoc
    //

    // @api
    function createJSDocAllType() {
        return finish(AstNode.JSDocAllType());
    }

    // @api
    function createJSDocUnknownType() {
        return finish(AstNode.JSDocUnknownType());
    }

    // @api
    function createJSDocNonNullableType(type: AstTypeNode, postfix = false): AstJSDocNonNullableType {
        const node = AstNode.JSDocNonNullableType();
        node.data.type = postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type;
        node.data.postfix = postfix;
        return finish(node);
    }

    // @api
    function updateJSDocNonNullableType(node: AstJSDocNonNullableType, type: AstTypeNode): AstJSDocNonNullableType {
        return node.data.type !== type
            ? update(createJSDocNonNullableType(type, node.data.postfix), node)
            : node;
    }

    // @api
    function createJSDocNullableType(type: AstTypeNode, postfix = false): AstJSDocNullableType {
        const node = AstNode.JSDocNullableType();
        node.data.type = postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type;
        node.data.postfix = postfix;
        return finish(node);
    }

    // @api
    function updateJSDocNullableType(node: AstJSDocNullableType, type: AstTypeNode): AstJSDocNullableType {
        return node.data.type !== type
            ? update(createJSDocNullableType(type, node.data.postfix), node)
            : node;
    }

    // @api
    function createJSDocOptionalType(type: AstTypeNode): AstJSDocOptionalType {
        const node = AstNode.JSDocOptionalType();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocOptionalType(node: AstJSDocOptionalType, type: AstTypeNode): AstJSDocOptionalType {
        return node.data.type !== type
            ? update(createJSDocOptionalType(type), node)
            : node;
    }

    // @api
    function createJSDocVariadicType(type: AstTypeNode): AstJSDocVariadicType {
        const node = AstNode.JSDocVariadicType();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocVariadicType(node: AstJSDocVariadicType, type: AstTypeNode): AstJSDocVariadicType {
        return node.data.type !== type
            ? update(createJSDocVariadicType(type), node)
            : node;
    }

    // @api
    function createJSDocNamepathType(type: AstTypeNode): AstJSDocNamepathType {
        const node = AstNode.JSDocNamepathType();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocNamepathType(node: AstJSDocNamepathType, type: AstTypeNode): AstJSDocNamepathType {
        return node.data.type !== type
            ? update(createJSDocNamepathType(type), node)
            : node;
    }

    // @api
    function createJSDocFunctionType(parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstJSDocFunctionType {
        const node = AstNode.JSDocFunctionType();
        node.data.parameters = asNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocFunctionType(node: AstJSDocFunctionType, parameters: AstNodeArrayLike<AstParameterDeclaration>, type: AstTypeNode | undefined): AstJSDocFunctionType {
        return !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? update(createJSDocFunctionType(parameters, type), node)
            : node;
    }

    // @api
    function createJSDocTypeLiteral(propertyTags?: AstNodeArrayLike<AstJSDocPropertyLikeTag>, isArrayType = false): AstJSDocTypeLiteral {
        const node = AstNode.JSDocTypeLiteral();
        node.data.jsDocPropertyTags = asNodeArray(propertyTags);
        node.data.isArrayType = isArrayType;
        return finish(node);
    }

    // @api
    function updateJSDocTypeLiteral(node: AstJSDocTypeLiteral, propertyTags: AstNodeArrayLike<AstJSDocPropertyLikeTag> | undefined, isArrayType: boolean): AstJSDocTypeLiteral {
        return !sameNodeArray(node.data.jsDocPropertyTags, propertyTags)
                || node.data.isArrayType !== isArrayType
            ? update(createJSDocTypeLiteral(propertyTags, isArrayType), node)
            : node;
    }

    // @api
    function createJSDocTypeExpression(type: AstTypeNode): AstJSDocTypeExpression {
        const node = AstNode.JSDocTypeExpression();
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocTypeExpression(node: AstJSDocTypeExpression, type: AstTypeNode): AstJSDocTypeExpression {
        return node.data.type !== type
            ? update(createJSDocTypeExpression(type), node)
            : node;
    }

    // @api
    function createJSDocSignature(typeParameters: AstNodeArrayLike<AstJSDocTemplateTag> | undefined, parameters: AstNodeArrayLike<AstJSDocParameterTag>, type?: AstJSDocReturnTag): AstJSDocSignature {
        const node = AstNode.JSDocSignature();
        node.data.typeParameters = asNodeArray(typeParameters);
        node.data.parameters = createNodeArray(parameters);
        node.data.type = type;
        return finish(node);
    }

    // @api
    function updateJSDocSignature(node: AstJSDocSignature, typeParameters: AstNodeArrayLike<AstJSDocTemplateTag> | undefined, parameters: AstNodeArrayLike<AstJSDocParameterTag>, type: AstJSDocReturnTag | undefined): AstJSDocSignature {
        return !sameNodeArray(node.data.typeParameters, typeParameters)
                || !sameNodeArray(node.data.parameters, parameters)
                || node.data.type !== type
            ? update(createJSDocSignature(typeParameters, parameters, type), node)
            : node;
    }

    function getDefaultTagName(node: AstJSDocTag) {
        const defaultTagName = getDefaultTagNameForKind(node.kind);
        return node.data.tagName.data.escapedText === escapeLeadingUnderscores(defaultTagName)
            ? node.data.tagName
            : createIdentifier(defaultTagName);
    }

    // @api
    function createJSDocTemplateTag(tagName: AstIdentifier | undefined, constraint: AstJSDocTypeExpression | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration>, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocTemplateTag {
        const node = AstNode.JSDocTemplateTag();
        node.data.tagName = tagName ?? createIdentifier("template");
        astSetComment(node, comment);
        node.data.constraint = constraint;
        node.data.typeParameters = createNodeArray(typeParameters);
        return finish(node);
    }

    // @api
    function updateJSDocTemplateTag(node: AstJSDocTemplateTag, tagName: AstIdentifier = getDefaultTagName(node), constraint: AstJSDocTypeExpression | undefined, typeParameters: AstNodeArrayLike<AstTypeParameterDeclaration>, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocTemplateTag {
        return node.data.tagName !== tagName
                || node.data.constraint !== constraint
                || !sameNodeArray(node.data.typeParameters, typeParameters)
                || astGetComment(node) !== comment
            ? update(createJSDocTemplateTag(tagName, constraint, typeParameters, comment), node)
            : node;
    }

    // @api
    function createJSDocTypedefTag(tagName: AstIdentifier | undefined, typeExpression?: AstJSDocTypeExpression, fullName?: AstIdentifier | AstJSDocNamespaceDeclaration, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocTypedefTag {
        const node = AstNode.JSDocTypedefTag();
        node.data.tagName = tagName ?? createIdentifier("typedef");
        astSetComment(node, comment);
        node.data.typeExpression = typeExpression;
        node.data.fullName = fullName;
        node.data.name = getJSDocTypeAliasName(fullName);
        return finish(node);
    }

    // @api
    function updateJSDocTypedefTag(node: AstJSDocTypedefTag, tagName: AstIdentifier = getDefaultTagName(node), typeExpression: AstJSDocTypeExpression | undefined, fullName: AstIdentifier | AstJSDocNamespaceDeclaration | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocTypedefTag {
        return node.data.tagName !== tagName
                || node.data.typeExpression !== typeExpression
                || node.data.fullName !== fullName
                || astGetComment(node) !== comment
            ? update(createJSDocTypedefTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocParameterTag(tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression?: AstJSDocTypeExpression, isNameFirst?: boolean, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocParameterTag {
        const node = AstNode.JSDocParameterTag();
        node.data.tagName = tagName ?? createIdentifier("param");
        astSetComment(node, comment);
        node.data.typeExpression = typeExpression;
        node.data.name = name;
        node.data.isNameFirst = !!isNameFirst;
        node.data.isBracketed = isBracketed;
        return finish(node);
    }

    // @api
    function updateJSDocParameterTag(node: AstJSDocParameterTag, tagName: AstIdentifier = getDefaultTagName(node), name: AstEntityName, isBracketed: boolean, typeExpression: AstJSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocParameterTag {
        return node.data.tagName !== tagName
                || node.data.name !== name
                || node.data.isBracketed !== isBracketed
                || node.data.typeExpression !== typeExpression
                || node.data.isNameFirst !== isNameFirst
                || astGetComment(node) !== comment
            ? update(createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node)
            : node;
    }

    // @api
    function createJSDocPropertyTag(tagName: AstIdentifier | undefined, name: AstEntityName, isBracketed: boolean, typeExpression?: AstJSDocTypeExpression, isNameFirst?: boolean, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocPropertyTag {
        const node = AstNode.JSDocPropertyTag();
        node.data.tagName = tagName ?? createIdentifier("prop");
        astSetComment(node, comment);
        node.data.typeExpression = typeExpression;
        node.data.name = name;
        node.data.isNameFirst = !!isNameFirst;
        node.data.isBracketed = isBracketed;
        return finish(node);
    }

    // @api
    function updateJSDocPropertyTag(node: AstJSDocPropertyTag, tagName: AstIdentifier = getDefaultTagName(node), name: AstEntityName, isBracketed: boolean, typeExpression: AstJSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocPropertyTag {
        return node.data.tagName !== tagName
                || node.data.name !== name
                || node.data.isBracketed !== isBracketed
                || node.data.typeExpression !== typeExpression
                || node.data.isNameFirst !== isNameFirst
                || astGetComment(node) !== comment
            ? update(createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment), node)
            : node;
    }

    // @api
    function createJSDocCallbackTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, fullName?: AstIdentifier | AstJSDocNamespaceDeclaration, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocCallbackTag {
        const node = AstNode.JSDocCallbackTag();
        node.data.tagName = tagName ?? createIdentifier("callback");
        astSetComment(node, comment);
        node.data.typeExpression = typeExpression;
        node.data.fullName = fullName;
        node.data.name = getJSDocTypeAliasName(fullName);

        // node.locals = undefined; // initialized by binder (LocalsContainer)
        // node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return finish(node);
    }

    // @api
    function updateJSDocCallbackTag(node: AstJSDocCallbackTag, tagName: AstIdentifier = getDefaultTagName(node), typeExpression: AstJSDocSignature, fullName: AstIdentifier | AstJSDocNamespaceDeclaration | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocCallbackTag {
        return node.data.tagName !== tagName
                || node.data.typeExpression !== typeExpression
                || node.data.fullName !== fullName
                || astGetComment(node) !== comment
            ? update(createJSDocCallbackTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocOverloadTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocSignature, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocOverloadTag {
        const node = AstNode.JSDocOverloadTag();
        node.data.tagName = tagName ?? createIdentifier("overload");
        astSetComment(node, comment);
        node.data.typeExpression = typeExpression;
        return finish(node);
    }

    // @api
    function updateJSDocOverloadTag(node: AstJSDocOverloadTag, tagName: AstIdentifier = getDefaultTagName(node), typeExpression: AstJSDocSignature, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocOverloadTag {
        return node.data.tagName !== tagName
                || node.data.typeExpression !== typeExpression
                || astGetComment(node) !== comment
            ? update(createJSDocOverloadTag(tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocAugmentsTag(tagName: AstIdentifier | undefined, className: AstJSDocAugmentsTag["data"]["class"], comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocAugmentsTag {
        const node = AstNode.JSDocAugmentsTag();
        node.data.tagName = tagName ?? createIdentifier("augments");
        astSetComment(node, comment);
        node.data.class = className;
        return finish(node);
    }

    // @api
    function updateJSDocAugmentsTag(node: AstJSDocAugmentsTag, tagName: AstIdentifier = getDefaultTagName(node), className: AstJSDocAugmentsTag["data"]["class"], comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocAugmentsTag {
        return node.data.tagName !== tagName
                || node.data.class !== className
                || astGetComment(node) !== comment
            ? update(createJSDocAugmentsTag(tagName, className, comment), node)
            : node;
    }

    // @api
    function createJSDocImplementsTag(tagName: AstIdentifier | undefined, className: AstJSDocImplementsTag["data"]["class"], comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocImplementsTag {
        const node = AstNode.JSDocImplementsTag();
        node.data.tagName = tagName ?? createIdentifier("implements");
        astSetComment(node, comment);
        node.data.class = className;
        return finish(node);
    }

    // @api
    function createJSDocSeeTag(tagName: AstIdentifier | undefined, name: AstJSDocNameReference | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocSeeTag {
        const node = AstNode.JSDocSeeTag();
        node.data.tagName = tagName ?? createIdentifier("see");
        astSetComment(node, comment);
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateJSDocSeeTag(node: AstJSDocSeeTag, tagName: AstIdentifier | undefined, name: AstJSDocNameReference | undefined, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocSeeTag {
        return node.data.tagName !== tagName
                || node.data.name !== name
                || astGetComment(node) !== comment
            ? update(createJSDocSeeTag(tagName, name, comment), node)
            : node;
    }

    // @api
    function createJSDocNameReference(name: AstEntityName | AstJSDocMemberName): AstJSDocNameReference {
        const node = AstNode.JSDocNameReference();
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateJSDocNameReference(node: AstJSDocNameReference, name: AstEntityName | AstJSDocMemberName): AstJSDocNameReference {
        return node.data.name !== name
            ? update(createJSDocNameReference(name), node)
            : node;
    }

    // @api
    function createJSDocMemberName(left: AstEntityName | AstJSDocMemberName, right: AstIdentifier) {
        const node = AstNode.JSDocMemberName();
        node.data.left = left;
        node.data.right = right;
        return finish(node);
    }

    // @api
    function updateJSDocMemberName(node: AstJSDocMemberName, left: AstEntityName | AstJSDocMemberName, right: AstIdentifier) {
        return node.data.left !== left
                || node.data.right !== right
            ? update(createJSDocMemberName(left, right), node)
            : node;
    }

    // @api
    function createJSDocLink(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLink {
        const node = AstNode.JSDocLink();
        node.data.name = name;
        node.data.text = text;
        return finish(node);
    }

    // @api
    function updateJSDocLink(node: AstJSDocLink, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLink {
        return node.data.name !== name
            ? update(createJSDocLink(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkCode(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkCode {
        const node = AstNode.JSDocLinkCode();
        node.data.name = name;
        node.data.text = text;
        return finish(node);
    }

    // @api
    function updateJSDocLinkCode(node: AstJSDocLinkCode, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkCode {
        return node.data.name !== name
            ? update(createJSDocLinkCode(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkPlain(name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkPlain {
        const node = AstNode.JSDocLinkPlain();
        node.data.name = name;
        node.data.text = text;
        return finish(node);
    }

    // @api
    function updateJSDocLinkPlain(node: AstJSDocLinkPlain, name: AstEntityName | AstJSDocMemberName | undefined, text: string): AstJSDocLinkPlain {
        return node.data.name !== name
            ? update(createJSDocLinkPlain(name, text), node)
            : node;
    }

    // @api
    function updateJSDocImplementsTag(node: AstJSDocImplementsTag, tagName: AstIdentifier = getDefaultTagName(node), className: AstJSDocImplementsTag["data"]["class"], comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocImplementsTag {
        return node.data.tagName !== tagName
                || node.data.class !== className
                || astGetComment(node) !== comment
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
    function createJSDocSimpleTag<T extends AstJSDocTag>(makeTag: () => T, tagName: AstIdentifier | undefined, comment?: string | AstNodeArray<AstJSDocComment>) {
        const node = makeTag();
        node.data.tagName = tagName ?? createIdentifier(getDefaultTagNameForKind(node.kind));
        astSetComment(node as AstHasComment, comment);
        return finish(node);
    }

    // @api
    // updateJSDocAuthorTag
    // updateJSDocClassTag
    // updateJSDocPublicTag
    // updateJSDocPrivateTag
    // updateJSDocProtectedTag
    // updateJSDocReadonlyTag
    // updateJSDocDeprecatedTag
    function updateJSDocSimpleTag<T extends AstJSDocTag>(makeTag: () => T, node: T, tagName: AstIdentifier = getDefaultTagName(node), comment: string | AstNodeArray<AstJSDocComment> | undefined) {
        return node.data.tagName !== tagName
                || astGetComment(node) !== comment
            ? update(createJSDocSimpleTag(makeTag, tagName, comment), node) :
            node;
    }

    // @api
    // createJSDocTypeTag
    // createJSDocReturnTag
    // createJSDocThisTag
    // createJSDocEnumTag
    // createJSDocSatisfiesTag
    function createJSDocTypeLikeTag<T extends AstJSDocTag & { readonly data: { typeExpression?: AstJSDocTypeExpression; }; }>(makeTag: () => T, tagName: AstIdentifier | undefined, typeExpression?: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>) {
        const node = createJSDocSimpleTag<T>(makeTag, tagName, comment);
        node.data.typeExpression = typeExpression;
        return finish(node);
    }

    // @api
    // updateJSDocTypeTag
    // updateJSDocReturnTag
    // updateJSDocThisTag
    // updateJSDocEnumTag
    // updateJSDocSatisfiesTag
    function updateJSDocTypeLikeTag<T extends AstJSDocTag & { readonly data: { typeExpression?: AstJSDocTypeExpression; }; }>(makeTag: () => T, node: T, tagName: AstIdentifier = getDefaultTagName(node), typeExpression: AstJSDocTypeExpression | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined) {
        return node.data.tagName !== tagName
                || node.data.typeExpression !== typeExpression
                || astGetComment(node) !== comment
            ? update(createJSDocTypeLikeTag(makeTag, tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocUnknownTag(tagName: AstIdentifier, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocUnknownTag {
        const node = createJSDocSimpleTag(AstNode.JSDocUnknownTag, tagName, comment);
        return finish(node);
    }

    // @api
    function updateJSDocUnknownTag(node: AstJSDocUnknownTag, tagName: AstIdentifier, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocUnknownTag {
        return node.data.tagName !== tagName
                || astGetComment(node) !== comment
            ? update(createJSDocUnknownTag(tagName, comment), node)
            : node;
    }

    // @api
    function createJSDocEnumTag(tagName: AstIdentifier | undefined, typeExpression: AstJSDocTypeExpression, comment?: string | AstNodeArray<AstJSDocComment>) {
        const node = createJSDocSimpleTag(AstNode.JSDocEnumTag, tagName ?? createIdentifier(getDefaultTagNameForKind(SyntaxKind.JSDocEnumTag)), comment);
        node.data.typeExpression = typeExpression;
        return finish(node);
    }

    // @api
    function updateJSDocEnumTag(node: AstJSDocEnumTag, tagName: AstIdentifier = getDefaultTagName(node), typeExpression: AstJSDocTypeExpression, comment: string | AstNodeArray<AstJSDocComment> | undefined) {
        return node.data.tagName !== tagName
                || node.data.typeExpression !== typeExpression
                || astGetComment(node) !== comment
            ? update(createJSDocEnumTag(tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocImportTag(tagName: AstIdentifier | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes?: AstImportAttributes, comment?: string | AstNodeArray<AstJSDocComment>): AstJSDocImportTag {
        const node = AstNode.JSDocImportTag();
        node.data.tagName = tagName ?? createIdentifier("import");
        astSetComment(node, comment);
        node.data.importClause = importClause;
        node.data.moduleSpecifier = moduleSpecifier;
        node.data.attributes = attributes;
        astSetComment(node, comment);
        return finish(node);
    }

    function updateJSDocImportTag(node: AstJSDocImportTag, tagName: AstIdentifier | undefined, importClause: AstImportClause | undefined, moduleSpecifier: AstExpression, attributes: AstImportAttributes | undefined, comment: string | AstNodeArray<AstJSDocComment> | undefined): AstJSDocImportTag {
        return node.data.tagName !== tagName
                || astGetComment(node) !== comment
                || node.data.importClause !== importClause
                || node.data.moduleSpecifier !== moduleSpecifier
                || node.data.attributes !== attributes
            ? update(createJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, comment), node)
            : node;
    }

    // @api
    function createJSDocText(text: string): AstJSDocText {
        const node = AstNode.JSDocText();
        node.data.text = text;
        return finish(node);
    }

    // @api
    function updateJSDocText(node: AstJSDocText, text: string): AstJSDocText {
        return node.data.text !== text
            ? update(createJSDocText(text), node)
            : node;
    }

    // @api
    function createJSDocComment(comment?: string | AstNodeArray<AstJSDocComment> | undefined, tags?: AstNodeArrayLike<AstBaseJSDocTag> | undefined) {
        const node = AstNode.JSDocNode();
        astSetComment(node, comment);
        node.data.tags = asNodeArray(tags);
        return finish(node);
    }

    // @api
    function updateJSDocComment(node: AstJSDoc, comment: string | AstNodeArray<AstJSDocComment> | undefined, tags: AstNodeArrayLike<AstJSDocTag> | undefined) {
        return astGetComment(node) !== comment
                || !sameNodeArray(node.data.tags, tags)
            ? update(createJSDocComment(comment, tags), node)
            : node;
    }

    //
    // JSX
    //

    // @api
    function createJsxElement(openingElement: AstJsxOpeningElement, children: AstNodeArrayLike<AstJsxChild>, closingElement: AstJsxClosingElement) {
        const node = AstNode.JsxElement();
        node.data.openingElement = openingElement;
        node.data.children = createNodeArray(children);
        node.data.closingElement = closingElement;
        return finish(node);
    }

    // @api
    function updateJsxElement(node: AstJsxElement, openingElement: AstJsxOpeningElement, children: AstNodeArrayLike<AstJsxChild>, closingElement: AstJsxClosingElement) {
        return node.data.openingElement !== openingElement
                || node.data.children !== children
                || node.data.closingElement !== closingElement
            ? update(createJsxElement(openingElement, children, closingElement), node)
            : node;
    }

    // @api
    function createJsxSelfClosingElement(tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes) {
        const node = AstNode.JsxSelfClosingElement();
        node.data.tagName = tagName;
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.attributes = attributes;
        return finish(node);
    }

    // @api
    function updateJsxSelfClosingElement(node: AstJsxSelfClosingElement, tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes) {
        return node.data.tagName !== tagName
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || node.data.attributes !== attributes
            ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxOpeningElement(tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes) {
        const node = AstNode.JsxOpeningElement();
        node.data.tagName = tagName;
        node.data.typeArguments = asNodeArray(typeArguments);
        node.data.attributes = attributes;
        return finish(node);
    }

    // @api
    function updateJsxOpeningElement(node: AstJsxOpeningElement, tagName: AstJsxTagNameExpression, typeArguments: AstNodeArrayLike<AstTypeNode> | undefined, attributes: AstJsxAttributes) {
        return node.data.tagName !== tagName
                || !sameNodeArray(node.data.typeArguments, typeArguments)
                || node.data.attributes !== attributes
            ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxClosingElement(tagName: AstJsxTagNameExpression) {
        const node = AstNode.JsxClosingElement();
        node.data.tagName = tagName;
        return finish(node);
    }

    // @api
    function updateJsxClosingElement(node: AstJsxClosingElement, tagName: AstJsxTagNameExpression) {
        return node.data.tagName !== tagName
            ? update(createJsxClosingElement(tagName), node)
            : node;
    }

    // @api
    function createJsxFragment(openingFragment: AstJsxOpeningFragment, children: AstNodeArrayLike<AstJsxChild>, closingFragment: AstJsxClosingFragment) {
        const node = AstNode.JsxFragment();
        node.data.openingFragment = openingFragment;
        node.data.children = createNodeArray(children);
        node.data.closingFragment = closingFragment;
        return finish(node);
    }

    // @api
    function updateJsxFragment(node: AstJsxFragment, openingFragment: AstJsxOpeningFragment, children: AstNodeArrayLike<AstJsxChild>, closingFragment: AstJsxClosingFragment) {
        return node.data.openingFragment !== openingFragment
                || node.data.children !== children
                || node.data.closingFragment !== closingFragment
            ? update(createJsxFragment(openingFragment, children, closingFragment), node)
            : node;
    }

    // @api
    function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        const node = AstNode.JsxText();
        node.data.text = text;
        node.data.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
        return finish(node);
    }

    // @api
    function updateJsxText(node: AstJsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        return node.data.text !== text
                || node.data.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
            ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
            : node;
    }

    // @api
    function createJsxOpeningFragment() {
        const node = AstNode.JsxOpeningFragment();
        return finish(node);
    }

    // @api
    function createJsxClosingFragment() {
        const node = AstNode.JsxClosingFragment();
        return finish(node);
    }

    // @api
    function createJsxAttribute(name: AstJsxAttributeName, initializer: AstJsxAttributeValue | undefined) {
        const node = AstNode.JsxAttribute();
        node.data.name = name;
        node.data.initializer = initializer;
        return finish(node);
    }

    // @api
    function updateJsxAttribute(node: AstJsxAttribute, name: AstJsxAttributeName, initializer: AstJsxAttributeValue | undefined) {
        return node.data.name !== name
                || node.data.initializer !== initializer
            ? update(createJsxAttribute(name, initializer), node)
            : node;
    }

    // @api
    function createJsxAttributes(properties: AstNodeArrayLike<AstJsxAttributeLike>) {
        const node = AstNode.JsxAttributes();
        node.data.properties = createNodeArray(properties);
        return finish(node);
    }

    // @api
    function updateJsxAttributes(node: AstJsxAttributes, properties: AstNodeArrayLike<AstJsxAttributeLike>) {
        return !sameNodeArray(node.data.properties, properties)
            ? update(createJsxAttributes(properties), node)
            : node;
    }

    // @api
    function createJsxSpreadAttribute(expression: AstExpression) {
        const node = AstNode.JsxSpreadAttribute();
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateJsxSpreadAttribute(node: AstJsxSpreadAttribute, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createJsxSpreadAttribute(expression), node)
            : node;
    }

    // @api
    function createJsxExpression(dotDotDotToken: AstDotDotDotToken | undefined, expression: AstExpression | undefined) {
        const node = AstNode.JsxExpression();
        node.data.dotDotDotToken = dotDotDotToken;
        node.data.expression = expression;
        return finish(node);
    }

    // @api
    function updateJsxExpression(node: AstJsxExpression, expression: AstExpression | undefined) {
        return node.data.expression !== expression
            ? update(createJsxExpression(node.data.dotDotDotToken, expression), node)
            : node;
    }

    // @api
    function createJsxNamespacedName(namespace: AstIdentifier, name: AstIdentifier) {
        const node = AstNode.JsxNamespacedName();
        node.data.namespace = namespace;
        node.data.name = name;
        return finish(node);
    }

    // @api
    function updateJsxNamespacedName(node: AstJsxNamespacedName, namespace: AstIdentifier, name: AstIdentifier) {
        return node.data.namespace !== namespace
                || node.data.name !== name
            ? update(createJsxNamespacedName(namespace, name), node)
            : node;
    }

    //
    // Clauses
    //

    // @api
    function createCaseClause(expression: AstExpression, statements: AstNodeArrayLike<AstStatement>) {
        const node = AstNode.CaseClause();
        node.data.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.data.statements = createNodeArray(statements);
        return finish(node);
    }

    // @api
    function updateCaseClause(node: AstCaseClause, expression: AstExpression, statements: AstNodeArrayLike<AstStatement>) {
        return node.data.expression !== expression
                || !sameNodeArray(node.data.statements, statements)
            ? update(createCaseClause(expression, statements), node)
            : node;
    }

    // @api
    function createDefaultClause(statements: AstNodeArrayLike<AstStatement>) {
        const node = AstNode.DefaultClause();
        node.data.statements = createNodeArray(statements);
        return finish(node);
    }

    // @api
    function updateDefaultClause(node: AstDefaultClause, statements: AstNodeArrayLike<AstStatement>) {
        return !sameNodeArray(node.data.statements, statements)
            ? update(createDefaultClause(statements), node)
            : node;
    }

    // @api
    function createHeritageClause(token: AstHeritageClause["data"]["token"], types: AstNodeArrayLike<AstExpressionWithTypeArguments>) {
        const node = AstNode.HeritageClause();
        node.data.token = token;
        node.data.types = createNodeArray(types);
        return finish(node);
    }

    // @api
    function updateHeritageClause(node: AstHeritageClause, types: AstNodeArrayLike<AstExpressionWithTypeArguments>) {
        return !sameNodeArray(node.data.types, types)
            ? update(createHeritageClause(node.data.token, types), node)
            : node;
    }

    // @api
    function createCatchClause(variableDeclaration: string | AstBindingName | AstVariableDeclaration | undefined, block: AstBlock) {
        const node = AstNode.CatchClause();
        node.data.variableDeclaration = asVariableDeclaration(variableDeclaration);
        node.data.block = block;
        return finish(node);
    }

    // @api
    function updateCatchClause(node: AstCatchClause, variableDeclaration: AstVariableDeclaration | undefined, block: AstBlock) {
        return node.data.variableDeclaration !== variableDeclaration
                || node.data.block !== block
            ? update(createCatchClause(variableDeclaration, block), node)
            : node;
    }

    //
    // Property assignments
    //

    // @api
    function createPropertyAssignment(name: string | AstPropertyName, initializer: AstExpression) {
        const node = AstNode.PropertyAssignment();
        node.data.name = asName(name);
        node.data.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        return finish(node);
    }

    // @api
    function updatePropertyAssignment(node: AstPropertyAssignment, name: AstPropertyName, initializer: AstExpression) {
        return node.data.name !== name
                || node.data.initializer !== initializer
            ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node)
            : node;
    }

    function finishUpdatePropertyAssignment(updated: AstPropertyAssignment, original: AstPropertyAssignment) {
        // copy children used only for error reporting
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.modifiers = original.data.modifiers;
            updated.data.questionToken = original.data.questionToken;
            updated.data.exclamationToken = original.data.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createShorthandPropertyAssignment(name: string | AstIdentifier, objectAssignmentInitializer?: AstExpression) {
        const node = AstNode.ShorthandPropertyAssignment();
        node.data.name = asName(name);
        node.data.objectAssignmentInitializer = objectAssignmentInitializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer);
        return finish(node);
    }

    // @api
    function updateShorthandPropertyAssignment(node: AstShorthandPropertyAssignment, name: AstIdentifier, objectAssignmentInitializer: AstExpression | undefined) {
        return node.data.name !== name
                || node.data.objectAssignmentInitializer !== objectAssignmentInitializer
            ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node)
            : node;
    }

    function finishUpdateShorthandPropertyAssignment(updated: AstShorthandPropertyAssignment, original: AstShorthandPropertyAssignment) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.data.modifiers = original.data.modifiers;
            updated.data.questionToken = original.data.questionToken;
            updated.data.exclamationToken = original.data.exclamationToken;
            updated.data.equalsToken = original.data.equalsToken;
        }
        return update(updated, original);
    }

    // @api
    function createSpreadAssignment(expression: AstExpression) {
        const node = AstNode.SpreadAssignment();
        node.data.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        return finish(node);
    }

    // @api
    function updateSpreadAssignment(node: AstSpreadAssignment, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createSpreadAssignment(expression), node)
            : node;
    }

    //
    // Enum
    //

    // @api
    function createEnumMember(name: string | AstPropertyName, initializer?: AstExpression) {
        const node = AstNode.EnumMember();
        node.data.name = asName(name);
        node.data.initializer = initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        return finish(node);
    }

    // @api
    function updateEnumMember(node: AstEnumMember, name: AstPropertyName, initializer: AstExpression | undefined) {
        return node.data.name !== name
                || node.data.initializer !== initializer
            ? update(createEnumMember(name, initializer), node)
            : node;
    }

    //
    // Top-level nodes
    //

    // @api
    function createSourceFile(
        statements: AstNodeArrayLike<AstStatement>,
        endOfFileToken: AstEndOfFileToken,
        flags: NodeFlags,
    ) {
        const node = AstNode.SourceFile();
        node.data.statements = createNodeArray(statements);
        node.data.endOfFileToken = endOfFileToken;
        node.flags |= flags;
        return finish(node);
    }

    function createRedirectedSourceFile(redirectInfo: RedirectInfo) {
        Debug.assert(redirectInfo.redirectTarget instanceof SourceFile);
        const source = redirectInfo.redirectTarget.ast;
        const node = source.shadow() as AstSourceFile;
        node.data.redirectInfo = redirectInfo;
        node.flags &= ~NodeFlags.Synthesized;
        return finish(node);
    }

    function cloneSourceFileWithChanges(
        source: AstSourceFile,
        statements: AstNodeArrayLike<AstStatement>,
        isDeclarationFile: boolean,
        referencedFiles: readonly FileReference[],
        typeReferences: readonly FileReference[],
        hasNoDefaultLib: boolean,
        libReferences: readonly FileReference[],
    ) {
        const node = cloneNodeWorker(source);
        node.data.statements = createNodeArray(statements);
        node.data.isDeclarationFile = isDeclarationFile;
        node.data.referencedFiles = referencedFiles;
        node.data.typeReferenceDirectives = typeReferences;
        node.data.hasNoDefaultLib = hasNoDefaultLib;
        node.data.libReferenceDirectives = libReferences;
        node.extra.transformFlags = -1 as TransformFlags;
        return finish(node);
    }

    // @api
    function updateSourceFile(
        node: AstSourceFile,
        statements: AstNodeArrayLike<AstStatement>,
        isDeclarationFile = node.data.isDeclarationFile,
        referencedFiles = node.data.referencedFiles,
        typeReferenceDirectives = node.data.typeReferenceDirectives,
        hasNoDefaultLib = node.data.hasNoDefaultLib,
        libReferenceDirectives = node.data.libReferenceDirectives,
    ) {
        return !sameNodeArray(node.data.statements, statements)
                || node.data.isDeclarationFile !== isDeclarationFile
                || node.data.referencedFiles !== referencedFiles
                || node.data.typeReferenceDirectives !== typeReferenceDirectives
                || node.data.hasNoDefaultLib !== hasNoDefaultLib
                || node.data.libReferenceDirectives !== libReferenceDirectives
            ? update(cloneSourceFileWithChanges(node, statements, isDeclarationFile, referencedFiles, typeReferenceDirectives, hasNoDefaultLib, libReferenceDirectives), node)
            : node;
    }

    // @api
    function createBundle(sourceFiles: readonly SourceFile[]) {
        const node = AstNode.Bundle();
        node.data.sourceFiles = sourceFiles;
        return finish(node);
    }

    // @api
    function updateBundle(node: AstBundle, sourceFiles: readonly SourceFile[]) {
        return node.data.sourceFiles !== sourceFiles
            ? update(createBundle(sourceFiles), node)
            : node;
    }

    //
    // Synthetic Nodes (used by checker)
    //

    // @api
    function createSyntheticExpression(type: Type, isSpread = false, tupleNameSource?: AstParameterDeclaration | AstNamedTupleMember) {
        const node = AstNode.SyntheticExpression();
        node.data.type = type;
        node.data.isSpread = isSpread;
        node.data.tupleNameSource = tupleNameSource;
        return finish(node);
    }

    // @api
    function createSyntaxList(children: readonly Node[]) {
        const node = AstNode.SyntaxList();
        node.data._children = children;
        return finish(node);
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
    function createNotEmittedStatement(original: AstNode) {
        const node = AstNode.NotEmittedStatement();
        node.original = original;
        setTextRange(node, original);
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
    function createPartiallyEmittedExpression(expression: AstExpression, original?: AstNode) {
        const node = AstNode.PartiallyEmittedExpression();
        node.data.expression = expression;
        node.original = original;
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     TransformFlags.ContainsTypeScript;
        setTextRange(node, original);
        return finish(node);
    }

    // @api
    function updatePartiallyEmittedExpression(node: AstPartiallyEmittedExpression, expression: AstExpression) {
        return node.data.expression !== expression
            ? update(createPartiallyEmittedExpression(expression, node.original), node)
            : node;
    }

    // @api
    function createNotEmittedTypeElement() {
        return finish(AstNode.NotEmittedTypeElement());
    }

    function flattenCommaElements(node: AstExpression): AstExpression | readonly AstExpression[] {
        if (astNodeIsSynthesized(node) && !isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
            if (astIsCommaListExpression(node)) {
                return node.data.elements.items;
            }
            if (astIsBinaryExpression(node) && astIsCommaToken(node.data.operatorToken)) {
                return [node.data.left, node.data.right];
            }
        }
        return node;
    }

    // @api
    function createCommaListExpression(elements: AstNodeArrayLike<AstExpression>) {
        const node = AstNode.CommaListExpression();
        elements = asNodeArray(elements);
        const result = sameFlatMap(elements.items, flattenCommaElements);
        if (result !== elements.items) {
            elements = createNodeArray(result);
        }
        node.data.elements = createNodeArray(elements);
        return finish(node);
    }

    // @api
    function updateCommaListExpression(node: AstCommaListExpression, elements: AstNodeArrayLike<AstExpression>) {
        return !sameNodeArray(node.data.elements, elements)
            ? update(createCommaListExpression(elements), node)
            : node;
    }

    // @api
    function createSyntheticReferenceExpression(expression: AstExpression, thisArg: AstExpression) {
        const node = AstNode.SyntheticReferenceExpression();
        node.data.expression = expression;
        node.data.thisArg = thisArg;
        return finish(node);
    }

    // @api
    function updateSyntheticReferenceExpression(node: AstSyntheticReferenceExpression, expression: AstExpression, thisArg: AstExpression) {
        return node.data.expression !== expression
                || node.data.thisArg !== thisArg
            ? update(createSyntheticReferenceExpression(expression, thisArg), node)
            : node;
    }

    function cloneNodeWorker<T extends AstNode>(node: T): T {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).

        const clone = node.clone();
        clone.flags &= ~NodeFlags.Synthesized;
        clone.transformFlags = node.transformFlags;
        clone.emitNode = undefined;
        setOriginal(clone, node);

        if (astIsIdentifier(node)) {
            Debug.assert(astIsIdentifier(clone));

            const typeArguments = getIdentifierTypeArguments(node);
            if (typeArguments) setIdentifierTypeArguments(clone, typeArguments);

            const autoGenerate = getIdentifierAutoGenerate(node);
            if (autoGenerate) setIdentifierAutoGenerate(clone, { ...autoGenerate });
        }
        else if (astIsPrivateIdentifier(node)) {
            Debug.assert(astIsPrivateIdentifier(clone));

            const autoGenerate = getIdentifierAutoGenerate(node);
            if (autoGenerate) setIdentifierAutoGenerate(clone, { ...autoGenerate });
        }

        return clone as T;
    }

    function cloneNode<T extends AstNode>(node: T): T {
        return finish(cloneNodeWorker(node));
    }

    function updateOuterExpression(outerExpression: AstOuterExpression, expression: AstExpression) {
        switch (outerExpression.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return updateParenthesizedExpression(outerExpression, expression);
            case SyntaxKind.TypeAssertionExpression:
                return updateTypeAssertion(outerExpression, outerExpression.data.type, expression);
            case SyntaxKind.AsExpression:
                return updateAsExpression(outerExpression, expression, outerExpression.data.type);
            case SyntaxKind.SatisfiesExpression:
                return updateSatisfiesExpression(outerExpression, expression, outerExpression.data.type);
            case SyntaxKind.NonNullExpression:
                return updateNonNullExpression(outerExpression, expression);
            case SyntaxKind.ExpressionWithTypeArguments:
                return updateExpressionWithTypeArguments(outerExpression, expression, outerExpression.data.typeArguments);
            case SyntaxKind.PartiallyEmittedExpression:
                return updatePartiallyEmittedExpression(outerExpression, expression);
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
    function isIgnorableParen(node: AstExpression) {
        return astIsParenthesizedExpression(node)
            && astNodeIsSynthesized(node)
            && nodeIsSynthesized(getSourceMapRange(node))
            && nodeIsSynthesized(getCommentRange(node))
            && !some(getSyntheticLeadingComments(node))
            && !some(getSyntheticTrailingComments(node));
    }

    function restoreOuterExpressions(outerExpression: AstExpression | undefined, innerExpression: AstExpression, kinds = OuterExpressionKinds.All): AstExpression {
        if (outerExpression && astIsOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
            return updateOuterExpression(
                outerExpression,
                restoreOuterExpressions(outerExpression.data.expression, innerExpression),
            );
        }
        return innerExpression;
    }

    function asNodeArray<T extends AstNode>(array: AstNodeArrayLike<T>): AstNodeArray<T>;
    function asNodeArray<T extends AstNode>(array: AstNodeArrayLike<T> | undefined): AstNodeArray<T> | undefined;
    function asNodeArray<T extends AstNode>(array: AstNodeArrayLike<T> | undefined): AstNodeArray<T> | undefined {
        return array ? createNodeArray(array) : undefined;
    }

    function asName<T extends AstDeclarationName | AstBindingName | AstPropertyName | AstNoSubstitutionTemplateLiteral | AstEntityName | AstThisTypeNode | undefined>(name: string | T): T | AstIdentifier {
        return typeof name === "string" ? createIdentifier(name) :
            name;
    }

    function asExpression<T extends AstExpression | undefined>(value: string | number | boolean | T): T | AstStringLiteral | AstNumericLiteral | AstBooleanLiteral {
        return typeof value === "string" ? createStringLiteral(value) :
            typeof value === "number" ? createNumericLiteral(value) :
            typeof value === "boolean" ? value ? createTrue() : createFalse() :
            value;
    }

    function asInitializer(node: AstExpression | undefined) {
        return node && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
    }

    function asToken<TKind extends TokenSyntaxKind>(value: TKind | AstToken<TKind>): AstToken<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    function asEmbeddedStatement<T extends AstNode>(statement: T): T | AstEmptyStatement;
    function asEmbeddedStatement<T extends AstNode>(statement: T | undefined): T | AstEmptyStatement | undefined;
    function asEmbeddedStatement<T extends AstNode>(statement: T | undefined): T | AstEmptyStatement | undefined {
        return statement && astIsNotEmittedStatement(statement) ? setTextRange(setOriginal(createEmptyStatement(), statement), statement) : statement;
    }

    function asVariableDeclaration(variableDeclaration: string | AstBindingName | AstVariableDeclaration | undefined) {
        if (typeof variableDeclaration === "string" || variableDeclaration && !astIsVariableDeclaration(variableDeclaration)) {
            return createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
            );
        }
        return variableDeclaration;
    }

    function update<T extends AstNode>(updated: T, original: T): T {
        if (updated !== original) {
            setOriginal(updated, original);
            setTextRange(updated, original);
        }
        return updated;
    }

    function finish<T extends AstNode>(node: T): T {
        if (flags & NodeFactoryFlags.Synthesized) {
            node.flags |= NodeFlags.Synthesized;
        }
        else {
            node.flags &= ~NodeFlags.Synthesized;
        }
        // void node.transformFlags; // precompute transform flags
        onFinishNode?.(node);
        return node;
    }
}

function getDefaultTagNameForKind(kind: AstJSDocTag["kind"]): string {
    switch (kind) {
        case SyntaxKind.JSDocTypeTag:
            return "type";
        case SyntaxKind.JSDocReturnTag:
            return "returns";
        case SyntaxKind.JSDocThisTag:
            return "this";
        case SyntaxKind.JSDocEnumTag:
            return "enum";
        case SyntaxKind.JSDocAuthorTag:
            return "author";
        case SyntaxKind.JSDocClassTag:
            return "class";
        case SyntaxKind.JSDocPublicTag:
            return "public";
        case SyntaxKind.JSDocPrivateTag:
            return "private";
        case SyntaxKind.JSDocProtectedTag:
            return "protected";
        case SyntaxKind.JSDocReadonlyTag:
            return "readonly";
        case SyntaxKind.JSDocOverrideTag:
            return "override";
        case SyntaxKind.JSDocTemplateTag:
            return "template";
        case SyntaxKind.JSDocTypedefTag:
            return "typedef";
        case SyntaxKind.JSDocParameterTag:
            return "param";
        case SyntaxKind.JSDocPropertyTag:
            return "prop";
        case SyntaxKind.JSDocCallbackTag:
            return "callback";
        case SyntaxKind.JSDocOverloadTag:
            return "overload";
        case SyntaxKind.JSDocAugmentsTag:
            return "augments";
        case SyntaxKind.JSDocImplementsTag:
            return "implements";
        case SyntaxKind.JSDocImportTag:
            return "import";
        default:
            return Debug.fail(`Unsupported kind: ${Debug.formatSyntaxKind(kind)}`);
    }
}

let rawTextScanner: Scanner | undefined;
const invalidValueSentinel: object = {};

function getCookedText(kind: AstTemplateLiteralToken["kind"], rawText: string) {
    if (!rawTextScanner) {
        rawTextScanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ false, LanguageVariant.Standard);
    }
    switch (kind) {
        case SyntaxKind.NoSubstitutionTemplateLiteral:
            rawTextScanner.setText("`" + rawText + "`");
            break;
        case SyntaxKind.TemplateHead:
            rawTextScanner.setText("`" + rawText + "${");
            break;
        case SyntaxKind.TemplateMiddle:
            rawTextScanner.setText("}" + rawText + "${");
            break;
        case SyntaxKind.TemplateTail:
            rawTextScanner.setText("}" + rawText + "`");
            break;
    }

    let token = rawTextScanner.scan();
    if (token === SyntaxKind.CloseBraceToken) {
        token = rawTextScanner.reScanTemplateToken(/*isTaggedTemplate*/ false);
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

function setOriginalNode<T extends AstNode>(node: T, original: AstNode | undefined): T {
    if (node.original !== original) {
        node.original = original;
        if (original) {
            const emitNode = original.emitNode;
            if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
        }
    }
    return node;
}

function arrayItems<T extends AstNode>(array: AstNodeArrayLike<T>) {
    return array instanceof AstNodeArray ? array.items : array;
}

function sameNodeArray<T extends AstNode>(left: (readonly T[]) | AstNodeArray<T> | undefined, right: (readonly T[]) | AstNodeArray<T> | undefined) {
    if (left === right) return true;
    if (left === undefined || right === undefined) return false;
    if (left instanceof AstNodeArray) return left.items === right;
    if (right instanceof AstNodeArray) return right.items === left;
    return false;
}

// copied from utilities.ts
function getJSDocTypeAliasName(fullName: AstJSDocNamespaceBody | undefined) {
    if (fullName) {
        let rightNode = fullName;
        while (true) {
            if (astIsIdentifier(rightNode) || !rightNode.data.body) {
                return astIsIdentifier(rightNode) ? rightNode : rightNode.data.name;
            }
            rightNode = rightNode.data.body;
        }
    }
}
