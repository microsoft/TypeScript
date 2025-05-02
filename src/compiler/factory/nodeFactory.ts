import {
    __String,
    AccessorDeclaration,
    addRange,
    append,
    appendIfUnique,
    ArrayBindingElement,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertClause,
    AssertEntry,
    AssertionKey,
    AssertsKeyword,
    AssignmentPattern,
    AsteriskToken,
    AwaitExpression,
    AwaitKeyword,
    BaseNodeFactory,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    BindingPattern,
    Block,
    BooleanLiteral,
    BreakStatement,
    Bundle,
    CallBinding,
    CallChain,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    cast,
    CatchClause,
    CharacterCodes,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassStaticBlockDeclaration,
    ColonToken,
    CommaListExpression,
    ComputedPropertyName,
    ConciseBody,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    containsObjectRestOrSpread,
    ContinueStatement,
    createBaseNodeFactory,
    createNodeConverters,
    createParenthesizerRules,
    createScanner,
    Debug,
    DebuggerStatement,
    Declaration,
    DeclarationName,
    Decorator,
    DefaultClause,
    DeleteExpression,
    DoStatement,
    DotDotDotToken,
    ElementAccessChain,
    ElementAccessExpression,
    EmitFlags,
    EmitNode,
    emptyArray,
    EmptyStatement,
    EndOfFileToken,
    EntityName,
    EnumDeclaration,
    EnumMember,
    EqualsGreaterThanToken,
    escapeLeadingUnderscores,
    every,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    FalseLiteral,
    FileReference,
    findUseStrictPrologue,
    forEach,
    ForInitializer,
    ForInStatement,
    formatGeneratedName,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    GeneratedPrivateIdentifier,
    GetAccessorDeclaration,
    getCommentRange,
    getEmitFlags,
    getIdentifierTypeArguments,
    getJSDocTypeAliasName,
    getNameOfDeclaration,
    getNodeId,
    getNonAssignedNameOfDeclaration,
    getSourceMapRange,
    getSyntheticLeadingComments,
    getSyntheticTrailingComments,
    getTextOfIdentifierOrLiteral,
    HasDecorators,
    hasInvalidEscape,
    HasModifiers,
    hasProperty,
    hasSyntacticModifier,
    HeritageClause,
    Identifier,
    identity,
    idText,
    IfStatement,
    ImmediatelyInvokedArrowFunction,
    ImmediatelyInvokedFunctionExpression,
    ImportAttribute,
    ImportAttributeName,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportSpecifier,
    ImportTypeAssertionContainer,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    InternalEmitFlags,
    IntersectionTypeNode,
    isArray,
    isArrayLiteralExpression,
    isArrowFunction,
    isBinaryExpression,
    isCallChain,
    isClassDeclaration,
    isClassExpression,
    isCommaListExpression,
    isCommaToken,
    isComputedPropertyName,
    isConstructorDeclaration,
    isConstructorTypeNode,
    isCustomPrologue,
    isElementAccessChain,
    isElementAccessExpression,
    isEnumDeclaration,
    isExclamationToken,
    isExportAssignment,
    isExportDeclaration,
    isExternalModuleReference,
    isFunctionDeclaration,
    isFunctionExpression,
    isGeneratedIdentifier,
    isGeneratedPrivateIdentifier,
    isGetAccessorDeclaration,
    isHoistedFunction,
    isHoistedVariableStatement,
    isIdentifier,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isImportKeyword,
    isIndexSignatureDeclaration,
    isInterfaceDeclaration,
    isLabeledStatement,
    isLocalName,
    isLogicalOrCoalescingAssignmentOperator,
    isMemberName,
    isMethodDeclaration,
    isMethodSignature,
    isModuleDeclaration,
    isNamedDeclaration,
    isNodeArray,
    isNodeKind,
    isNonNullChain,
    isNotEmittedStatement,
    isObjectLiteralExpression,
    isOmittedExpression,
    isOuterExpression,
    isParameter,
    isParenthesizedExpression,
    isParseTreeNode,
    isPrivateIdentifier,
    isPrologueDirective,
    isPropertyAccessChain,
    isPropertyAccessExpression,
    isPropertyDeclaration,
    isPropertyName,
    isPropertySignature,
    isQuestionToken,
    isSetAccessorDeclaration,
    isSourceFile,
    isStatement,
    isStatementOrBlock,
    isStringLiteral,
    isSuperKeyword,
    isSuperProperty,
    isThisIdentifier,
    isTypeAliasDeclaration,
    isTypeParameterDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    JSDoc,
    JSDocAllType,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassTag,
    JSDocComment,
    JSDocDeprecatedTag,
    JSDocEnumTag,
    JSDocFunctionType,
    JSDocImplementsTag,
    JSDocImportTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocMemberName,
    JSDocNamepathType,
    JSDocNameReference,
    JSDocNamespaceDeclaration,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyLikeTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocText,
    JSDocThisTag,
    JSDocThrowsTag,
    JSDocType,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocUnknownType,
    JSDocVariadicType,
    JsxAttribute,
    JsxAttributeLike,
    JsxAttributeName,
    JsxAttributes,
    JsxAttributeValue,
    JsxChild,
    JsxClosingElement,
    JsxClosingFragment,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningElement,
    JsxOpeningFragment,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxTagNameExpression,
    JsxText,
    KeywordSyntaxKind,
    KeywordToken,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LabeledStatement,
    LanguageVariant,
    lastOrUndefined,
    LeftHandSideExpression,
    LiteralToken,
    LiteralTypeNode,
    MappedTypeNode,
    MemberName,
    memoize,
    memoizeOne,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MinusToken,
    MissingDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    modifiersToFlags,
    ModifierSyntaxKind,
    ModifierToken,
    ModuleBlock,
    ModuleBody,
    ModuleDeclaration,
    ModuleExportName,
    ModuleName,
    ModuleReference,
    Mutable,
    MutableNodeArray,
    NamedExportBindings,
    NamedExports,
    NamedImportBindings,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NodeFactory,
    NodeFlags,
    nodeIsSynthesized,
    NonNullChain,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NotEmittedStatement,
    NotEmittedTypeElement,
    NullLiteral,
    nullNodeConverters,
    nullParenthesizerRules,
    NumericLiteral,
    objectAllocator,
    ObjectBindingPattern,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    OmittedExpression,
    OptionalTypeNode,
    OuterExpression,
    OuterExpressionKinds,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    Path,
    PlusToken,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PrimaryExpression,
    PrivateIdentifier,
    PrologueDirective,
    PropertyAccessChain,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyDescriptorAttributes,
    PropertyName,
    PropertyNameLiteral,
    PropertySignature,
    PseudoBigInt,
    pseudoBigIntToString,
    PunctuationSyntaxKind,
    PunctuationToken,
    QualifiedName,
    QuestionDotToken,
    QuestionToken,
    ReadonlyKeyword,
    RedirectInfo,
    reduceLeft,
    RegularExpressionLiteral,
    RestTypeNode,
    ReturnStatement,
    returnTrue,
    sameFlatMap,
    SatisfiesExpression,
    Scanner,
    ScriptTarget,
    SemicolonClassElement,
    SetAccessorDeclaration,
    setEmitFlags,
    setIdentifierAutoGenerate,
    setIdentifierTypeArguments,
    setParent,
    setTextRange,
    ShorthandPropertyAssignment,
    SignatureDeclarationBase,
    singleOrUndefined,
    skipOuterExpressions,
    skipParentheses,
    some,
    SourceFile,
    SourceMapSource,
    SpreadAssignment,
    SpreadElement,
    startOnNewLine,
    startsWith,
    Statement,
    StringLiteral,
    stringToToken,
    SuperExpression,
    SwitchStatement,
    SyntaxKind,
    SyntaxList,
    SyntheticExpression,
    SyntheticReferenceExpression,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead,
    TemplateLiteral,
    TemplateLiteralLikeNode,
    TemplateLiteralToken,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateMiddle,
    TemplateSpan,
    TemplateTail,
    TextRange,
    ThisExpression,
    ThisTypeNode,
    ThrowStatement,
    Token,
    TokenFlags,
    TransformFlags,
    TrueLiteral,
    TryStatement,
    TupleTypeNode,
    Type,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeOfExpression,
    TypeOfTag,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionOrIntersectionTypeNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    visitNode,
    VisitResult,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "../_namespaces/ts.js";

let nextAutoGenerateId = 0;

/** @internal */
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

const nodeFactoryPatchers: ((factory: NodeFactory) => void)[] = [];

/** @internal @knipignore */
export function addNodeFactoryPatcher(fn: (factory: NodeFactory) => void): void {
    nodeFactoryPatchers.push(fn);
}

/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 * @param baseFactory A `BaseNodeFactory` used to create the base `Node` objects.
 *
 * @internal
 */
export function createNodeFactory(flags: NodeFactoryFlags, baseFactory: BaseNodeFactory): NodeFactory {
    const setOriginal = flags & NodeFactoryFlags.NoOriginalNode ? identity : setOriginalNode;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullParenthesizerRules : createParenthesizerRules(factory));
    const converters = memoize(() => flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : createNodeConverters(factory));

    // lazy initializaton of common operator factories
    const getBinaryCreateFunction = memoizeOne((operator: BinaryOperator) => (left: Expression, right: Expression) => createBinaryExpression(left, operator, right));
    const getPrefixUnaryCreateFunction = memoizeOne((operator: PrefixUnaryOperator) => (operand: Expression) => createPrefixUnaryExpression(operator, operand));
    const getPostfixUnaryCreateFunction = memoizeOne((operator: PostfixUnaryOperator) => (operand: Expression) => createPostfixUnaryExpression(operand, operator));
    const getJSDocPrimaryTypeCreateFunction = memoizeOne(<T extends JSDocType>(kind: T["kind"]) => () => createJSDocPrimaryTypeWorker(kind));
    const getJSDocUnaryTypeCreateFunction = memoizeOne(<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"]) => (type: T["type"]) => createJSDocUnaryTypeWorker<T>(kind, type));
    const getJSDocUnaryTypeUpdateFunction = memoizeOne(<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"]) => (node: T, type: T["type"]) => updateJSDocUnaryTypeWorker<T>(kind, node, type));
    const getJSDocPrePostfixUnaryTypeCreateFunction = memoizeOne(<T extends JSDocType & { readonly type: TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"]) => (type: T["type"], postfix?: boolean) => createJSDocPrePostfixUnaryTypeWorker<T>(kind, type, postfix));
    const getJSDocPrePostfixUnaryTypeUpdateFunction = memoizeOne(<T extends JSDocType & { readonly type: TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"]) => (node: T, type: T["type"]) => updateJSDocPrePostfixUnaryTypeWorker<T>(kind, node, type));
    const getJSDocSimpleTagCreateFunction = memoizeOne(<T extends JSDocTag>(kind: T["kind"]) => (tagName: Identifier | undefined, comment?: NodeArray<JSDocComment>) => createJSDocSimpleTagWorker(kind, tagName, comment));
    const getJSDocSimpleTagUpdateFunction = memoizeOne(<T extends JSDocTag>(kind: T["kind"]) => (node: T, tagName: Identifier | undefined, comment?: NodeArray<JSDocComment>) => updateJSDocSimpleTagWorker(kind, node, tagName, comment));
    const getJSDocTypeLikeTagCreateFunction = memoizeOne(<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"]) => (tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: NodeArray<JSDocComment>) => createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment));
    const getJSDocTypeLikeTagUpdateFunction = memoizeOne(<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"]) => (node: T, tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: NodeArray<JSDocComment>) => updateJSDocTypeLikeTagWorker(kind, node, tagName, typeExpression, comment));

    const factory: NodeFactory = {
        get parenthesizer() {
            return parenthesizerRules();
        },
        get converters() {
            return converters();
        },
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
            (expression, name) => setEmitFlags(createPropertyAccessExpression(expression, name), EmitFlags.NoIndentation) :
            createPropertyAccessExpression,
        updatePropertyAccessExpression,
        createPropertyAccessChain: flags & NodeFactoryFlags.NoIndentationOnFreshPropertyAccess ?
            (expression, questionDotToken, name: string) => setEmitFlags(createPropertyAccessChain(expression, questionDotToken, name), EmitFlags.NoIndentation) :
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
        // lazily load factory members for JSDoc types with similar structure
        get createJSDocAllType() {
            return getJSDocPrimaryTypeCreateFunction<JSDocAllType>(SyntaxKind.JSDocAllType);
        },
        get createJSDocUnknownType() {
            return getJSDocPrimaryTypeCreateFunction<JSDocUnknownType>(SyntaxKind.JSDocUnknownType);
        },
        get createJSDocNonNullableType() {
            return getJSDocPrePostfixUnaryTypeCreateFunction<JSDocNonNullableType>(SyntaxKind.JSDocNonNullableType);
        },
        get updateJSDocNonNullableType() {
            return getJSDocPrePostfixUnaryTypeUpdateFunction<JSDocNonNullableType>(SyntaxKind.JSDocNonNullableType);
        },
        get createJSDocNullableType() {
            return getJSDocPrePostfixUnaryTypeCreateFunction<JSDocNullableType>(SyntaxKind.JSDocNullableType);
        },
        get updateJSDocNullableType() {
            return getJSDocPrePostfixUnaryTypeUpdateFunction<JSDocNullableType>(SyntaxKind.JSDocNullableType);
        },
        get createJSDocOptionalType() {
            return getJSDocUnaryTypeCreateFunction<JSDocOptionalType>(SyntaxKind.JSDocOptionalType);
        },
        get updateJSDocOptionalType() {
            return getJSDocUnaryTypeUpdateFunction<JSDocOptionalType>(SyntaxKind.JSDocOptionalType);
        },
        get createJSDocVariadicType() {
            return getJSDocUnaryTypeCreateFunction<JSDocVariadicType>(SyntaxKind.JSDocVariadicType);
        },
        get updateJSDocVariadicType() {
            return getJSDocUnaryTypeUpdateFunction<JSDocVariadicType>(SyntaxKind.JSDocVariadicType);
        },
        get createJSDocNamepathType() {
            return getJSDocUnaryTypeCreateFunction<JSDocNamepathType>(SyntaxKind.JSDocNamepathType);
        },
        get updateJSDocNamepathType() {
            return getJSDocUnaryTypeUpdateFunction<JSDocNamepathType>(SyntaxKind.JSDocNamepathType);
        },
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
        // lazily load factory members for JSDoc tags with similar structure
        get createJSDocTypeTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocTypeTag>(SyntaxKind.JSDocTypeTag);
        },
        get updateJSDocTypeTag() {
            return getJSDocTypeLikeTagUpdateFunction<JSDocTypeTag>(SyntaxKind.JSDocTypeTag);
        },
        get createJSDocReturnTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocReturnTag>(SyntaxKind.JSDocReturnTag);
        },
        get updateJSDocReturnTag() {
            return getJSDocTypeLikeTagUpdateFunction<JSDocReturnTag>(SyntaxKind.JSDocReturnTag);
        },
        get createJSDocThisTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocThisTag>(SyntaxKind.JSDocThisTag);
        },
        get updateJSDocThisTag() {
            return getJSDocTypeLikeTagUpdateFunction<JSDocThisTag>(SyntaxKind.JSDocThisTag);
        },
        get createJSDocAuthorTag() {
            return getJSDocSimpleTagCreateFunction<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag);
        },
        get updateJSDocAuthorTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag);
        },
        get createJSDocClassTag() {
            return getJSDocSimpleTagCreateFunction<JSDocClassTag>(SyntaxKind.JSDocClassTag);
        },
        get updateJSDocClassTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocClassTag>(SyntaxKind.JSDocClassTag);
        },
        get createJSDocPublicTag() {
            return getJSDocSimpleTagCreateFunction<JSDocPublicTag>(SyntaxKind.JSDocPublicTag);
        },
        get updateJSDocPublicTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocPublicTag>(SyntaxKind.JSDocPublicTag);
        },
        get createJSDocPrivateTag() {
            return getJSDocSimpleTagCreateFunction<JSDocPrivateTag>(SyntaxKind.JSDocPrivateTag);
        },
        get updateJSDocPrivateTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocPrivateTag>(SyntaxKind.JSDocPrivateTag);
        },
        get createJSDocProtectedTag() {
            return getJSDocSimpleTagCreateFunction<JSDocProtectedTag>(SyntaxKind.JSDocProtectedTag);
        },
        get updateJSDocProtectedTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocProtectedTag>(SyntaxKind.JSDocProtectedTag);
        },
        get createJSDocReadonlyTag() {
            return getJSDocSimpleTagCreateFunction<JSDocReadonlyTag>(SyntaxKind.JSDocReadonlyTag);
        },
        get updateJSDocReadonlyTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocReadonlyTag>(SyntaxKind.JSDocReadonlyTag);
        },
        get createJSDocOverrideTag() {
            return getJSDocSimpleTagCreateFunction<JSDocOverrideTag>(SyntaxKind.JSDocOverrideTag);
        },
        get updateJSDocOverrideTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocOverrideTag>(SyntaxKind.JSDocOverrideTag);
        },
        get createJSDocDeprecatedTag() {
            return getJSDocSimpleTagCreateFunction<JSDocDeprecatedTag>(SyntaxKind.JSDocDeprecatedTag);
        },
        get updateJSDocDeprecatedTag() {
            return getJSDocSimpleTagUpdateFunction<JSDocDeprecatedTag>(SyntaxKind.JSDocDeprecatedTag);
        },
        get createJSDocThrowsTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocThrowsTag>(SyntaxKind.JSDocThrowsTag);
        },
        get updateJSDocThrowsTag() {
            return getJSDocTypeLikeTagUpdateFunction<JSDocThrowsTag>(SyntaxKind.JSDocThrowsTag);
        },
        get createJSDocSatisfiesTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocSatisfiesTag>(SyntaxKind.JSDocSatisfiesTag);
        },
        get updateJSDocSatisfiesTag() {
            return getJSDocTypeLikeTagUpdateFunction<JSDocSatisfiesTag>(SyntaxKind.JSDocSatisfiesTag);
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

        // Lazily load factory methods for common operator factories and utilities
        get createComma() {
            return getBinaryCreateFunction(SyntaxKind.CommaToken);
        },
        get createAssignment() {
            return getBinaryCreateFunction(SyntaxKind.EqualsToken) as NodeFactory["createAssignment"];
        },
        get createLogicalOr() {
            return getBinaryCreateFunction(SyntaxKind.BarBarToken);
        },
        get createLogicalAnd() {
            return getBinaryCreateFunction(SyntaxKind.AmpersandAmpersandToken);
        },
        get createBitwiseOr() {
            return getBinaryCreateFunction(SyntaxKind.BarToken);
        },
        get createBitwiseXor() {
            return getBinaryCreateFunction(SyntaxKind.CaretToken);
        },
        get createBitwiseAnd() {
            return getBinaryCreateFunction(SyntaxKind.AmpersandToken);
        },
        get createStrictEquality() {
            return getBinaryCreateFunction(SyntaxKind.EqualsEqualsEqualsToken);
        },
        get createStrictInequality() {
            return getBinaryCreateFunction(SyntaxKind.ExclamationEqualsEqualsToken);
        },
        get createEquality() {
            return getBinaryCreateFunction(SyntaxKind.EqualsEqualsToken);
        },
        get createInequality() {
            return getBinaryCreateFunction(SyntaxKind.ExclamationEqualsToken);
        },
        get createLessThan() {
            return getBinaryCreateFunction(SyntaxKind.LessThanToken);
        },
        get createLessThanEquals() {
            return getBinaryCreateFunction(SyntaxKind.LessThanEqualsToken);
        },
        get createGreaterThan() {
            return getBinaryCreateFunction(SyntaxKind.GreaterThanToken);
        },
        get createGreaterThanEquals() {
            return getBinaryCreateFunction(SyntaxKind.GreaterThanEqualsToken);
        },
        get createLeftShift() {
            return getBinaryCreateFunction(SyntaxKind.LessThanLessThanToken);
        },
        get createRightShift() {
            return getBinaryCreateFunction(SyntaxKind.GreaterThanGreaterThanToken);
        },
        get createUnsignedRightShift() {
            return getBinaryCreateFunction(SyntaxKind.GreaterThanGreaterThanGreaterThanToken);
        },
        get createAdd() {
            return getBinaryCreateFunction(SyntaxKind.PlusToken);
        },
        get createSubtract() {
            return getBinaryCreateFunction(SyntaxKind.MinusToken);
        },
        get createMultiply() {
            return getBinaryCreateFunction(SyntaxKind.AsteriskToken);
        },
        get createDivide() {
            return getBinaryCreateFunction(SyntaxKind.SlashToken);
        },
        get createModulo() {
            return getBinaryCreateFunction(SyntaxKind.PercentToken);
        },
        get createExponent() {
            return getBinaryCreateFunction(SyntaxKind.AsteriskAsteriskToken);
        },
        get createPrefixPlus() {
            return getPrefixUnaryCreateFunction(SyntaxKind.PlusToken);
        },
        get createPrefixMinus() {
            return getPrefixUnaryCreateFunction(SyntaxKind.MinusToken);
        },
        get createPrefixIncrement() {
            return getPrefixUnaryCreateFunction(SyntaxKind.PlusPlusToken);
        },
        get createPrefixDecrement() {
            return getPrefixUnaryCreateFunction(SyntaxKind.MinusMinusToken);
        },
        get createBitwiseNot() {
            return getPrefixUnaryCreateFunction(SyntaxKind.TildeToken);
        },
        get createLogicalNot() {
            return getPrefixUnaryCreateFunction(SyntaxKind.ExclamationToken);
        },
        get createPostfixIncrement() {
            return getPostfixUnaryCreateFunction(SyntaxKind.PlusPlusToken);
        },
        get createPostfixDecrement() {
            return getPostfixUnaryCreateFunction(SyntaxKind.MinusMinusToken);
        },

        // Compound nodes
        createImmediatelyInvokedFunctionExpression,
        createImmediatelyInvokedArrowFunction,
        createVoidZero,
        createExportDefault,
        createExternalModuleExport,
        createTypeCheck,
        createIsNotTypeCheck,
        createMethodCall,
        createGlobalMethodCall,
        createFunctionBindCall,
        createFunctionCallCall,
        createFunctionApplyCall,
        createArraySliceCall,
        createArrayConcatCall,
        createObjectDefinePropertyCall,
        createObjectGetOwnPropertyDescriptorCall,
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
        replaceModifiers,
        replaceDecoratorsAndModifiers,
        replacePropertyName,
    };

    forEach(nodeFactoryPatchers, fn => fn(factory));

    return factory;

    // @api
    function createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T> {
        if (elements === undefined || elements === emptyArray) {
            elements = [];
        }
        else if (isNodeArray(elements)) {
            if (hasTrailingComma === undefined || elements.hasTrailingComma === hasTrailingComma) {
                // Ensure the transform flags have been aggregated for this NodeArray
                if (elements.transformFlags === undefined) {
                    aggregateChildrenFlags(elements as MutableNodeArray<T>);
                }
                Debug.attachNodeArrayDebugInfo(elements);
                return elements;
            }

            // This *was* a `NodeArray`, but the `hasTrailingComma` option differs. Recreate the
            // array with the same elements, text range, and transform flags but with the updated
            // value for `hasTrailingComma`
            const array = elements.slice() as MutableNodeArray<T>;
            array.pos = elements.pos;
            array.end = elements.end;
            array.hasTrailingComma = hasTrailingComma;
            array.transformFlags = elements.transformFlags;
            Debug.attachNodeArrayDebugInfo(array);
            return array;
        }

        // Since the element list of a node array is typically created by starting with an empty array and
        // repeatedly calling push(), the list may not have the optimal memory layout. We invoke slice() for
        // small arrays (1 to 4 elements) to give the VM a chance to allocate an optimal representation.
        const length = elements.length;
        const array = (length >= 1 && length <= 4 ? elements.slice() : elements) as MutableNodeArray<T>;
        array.pos = -1;
        array.end = -1;
        array.hasTrailingComma = !!hasTrailingComma;
        array.transformFlags = TransformFlags.None;
        aggregateChildrenFlags(array);
        Debug.attachNodeArrayDebugInfo(array);
        return array;
    }

    function createBaseNode<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseNode(kind) as Mutable<T>;
    }

    function createBaseDeclaration<T extends Declaration>(kind: T["kind"]) {
        const node = createBaseNode(kind);
        node.symbol = undefined!; // initialized by binder
        node.localSymbol = undefined; // initialized by binder
        return node;
    }

    function finishUpdateBaseSignatureDeclaration<T extends SignatureDeclarationBase>(updated: Mutable<T>, original: T) {
        if (updated !== original) {
            // copy children used for quick info
            updated.typeArguments = original.typeArguments;
        }
        return update(updated, original);
    }

    //
    // Literals
    //

    // @api
    function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): NumericLiteral {
        const text = typeof value === "number" ? value + "" : value;
        Debug.assert(text.charCodeAt(0) !== CharacterCodes.minus, "Negative numbers should be created in combination with createPrefixUnaryExpression");
        const node = createBaseDeclaration<NumericLiteral>(SyntaxKind.NumericLiteral);
        node.text = text;
        node.numericLiteralFlags = numericLiteralFlags;
        if (numericLiteralFlags & TokenFlags.BinaryOrOctalSpecifier) node.transformFlags |= TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral {
        const node = createBaseToken<BigIntLiteral>(SyntaxKind.BigIntLiteral);
        node.text = typeof value === "string" ? value : pseudoBigIntToString(value) + "n";
        node.transformFlags |= TransformFlags.ContainsES2020;
        return node;
    }

    function createBaseStringLiteral(text: string, isSingleQuote?: boolean) {
        const node = createBaseDeclaration<StringLiteral>(SyntaxKind.StringLiteral);
        node.text = text;
        node.singleQuote = isSingleQuote;
        return node;
    }

    // @api
    function createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral {
        const node = createBaseStringLiteral(text, isSingleQuote);
        node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
        if (hasExtendedUnicodeEscape) node.transformFlags |= TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function createStringLiteralFromNode(sourceNode: PropertyNameLiteral | PrivateIdentifier): StringLiteral {
        const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), /*isSingleQuote*/ undefined);
        node.textSourceNode = sourceNode;
        return node;
    }

    // @api
    function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
        const node = createBaseToken<RegularExpressionLiteral>(SyntaxKind.RegularExpressionLiteral);
        node.text = text;
        return node;
    }

    // @api
    function createLiteralLikeNode(kind: LiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): LiteralToken {
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
                return createTemplateLiteralLikeNode(kind, text, /*rawText*/ undefined, /*templateFlags*/ 0) as NoSubstitutionTemplateLiteral;
        }
    }

    //
    // Identifiers
    //

    function createBaseIdentifier(escapedText: __String) {
        const node = baseFactory.createBaseIdentifierNode(SyntaxKind.Identifier) as Mutable<Identifier>;
        node.escapedText = escapedText;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.symbol = undefined!; // initialized by checker
        return node;
    }

    function createBaseGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags, prefix: string | GeneratedNamePart | undefined, suffix: string | undefined) {
        const node = createBaseIdentifier(escapeLeadingUnderscores(text)) as Mutable<GeneratedIdentifier>;
        setIdentifierAutoGenerate(node, {
            flags: autoGenerateFlags,
            id: nextAutoGenerateId,
            prefix,
            suffix,
        });
        nextAutoGenerateId++;
        return node;
    }

    // @api
    function createIdentifier(text: string, originalKeywordKind?: SyntaxKind, hasExtendedUnicodeEscape?: boolean): Identifier {
        if (originalKeywordKind === undefined && text) {
            originalKeywordKind = stringToToken(text);
        }
        if (originalKeywordKind === SyntaxKind.Identifier) {
            originalKeywordKind = undefined;
        }

        const node = createBaseIdentifier(escapeLeadingUnderscores(text));
        if (hasExtendedUnicodeEscape) node.flags |= NodeFlags.IdentifierHasExtendedUnicodeEscape;

        // NOTE: we do not include transform flags of typeArguments in an identifier as they do not contribute to transformations
        if (node.escapedText === "await") {
            node.transformFlags |= TransformFlags.ContainsPossibleTopLevelAwait;
        }
        if (node.flags & NodeFlags.IdentifierHasExtendedUnicodeEscape) {
            node.transformFlags |= TransformFlags.ContainsES2015;
        }

        return node;
    }

    // @api
    function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean, prefix?: string | GeneratedNamePart, suffix?: string): GeneratedIdentifier {
        let flags = GeneratedIdentifierFlags.Auto;
        if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
        const name = createBaseGeneratedIdentifier("", flags, prefix, suffix);
        if (recordTempVariable) {
            recordTempVariable(name);
        }
        return name;
    }

    /** Create a unique temporary variable for use in a loop. */
    // @api
    function createLoopVariable(reservedInNestedScopes?: boolean): Identifier {
        let flags = GeneratedIdentifierFlags.Loop;
        if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
        return createBaseGeneratedIdentifier("", flags, /*prefix*/ undefined, /*suffix*/ undefined);
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniqueName(text: string, flags: GeneratedIdentifierFlags = GeneratedIdentifierFlags.None, prefix?: string | GeneratedNamePart, suffix?: string): Identifier {
        Debug.assert(!(flags & GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        Debug.assert((flags & (GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)) !== GeneratedIdentifierFlags.FileLevel, "GeneratedIdentifierFlags.FileLevel cannot be set without also setting GeneratedIdentifierFlags.Optimistic");
        return createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | flags, prefix, suffix);
    }

    /** Create a unique name generated for a node. */
    // @api
    function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0, prefix?: string | GeneratedNamePart, suffix?: string): Identifier {
        Debug.assert(!(flags & GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        const text = !node ? "" :
            isMemberName(node) ? formatGeneratedName(/*privateName*/ false, prefix, node, suffix, idText) :
            `generated@${getNodeId(node)}`;
        if (prefix || suffix) flags |= GeneratedIdentifierFlags.Optimistic;
        const name = createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    function createBasePrivateIdentifier(escapedText: __String) {
        const node = baseFactory.createBasePrivateIdentifierNode(SyntaxKind.PrivateIdentifier) as Mutable<PrivateIdentifier>;
        node.escapedText = escapedText;
        node.transformFlags |= TransformFlags.ContainsClassFields;
        return node;
    }

    // @api
    function createPrivateIdentifier(text: string): PrivateIdentifier {
        if (!startsWith(text, "#")) Debug.fail("First character of private identifier must be #: " + text);
        return createBasePrivateIdentifier(escapeLeadingUnderscores(text));
    }

    function createBaseGeneratedPrivateIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags, prefix: string | GeneratedNamePart | undefined, suffix: string | undefined) {
        const node = createBasePrivateIdentifier(escapeLeadingUnderscores(text));
        setIdentifierAutoGenerate(node, {
            flags: autoGenerateFlags,
            id: nextAutoGenerateId,
            prefix,
            suffix,
        });
        nextAutoGenerateId++;
        return node;
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniquePrivateName(text?: string, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier {
        if (text && !startsWith(text, "#")) Debug.fail("First character of private identifier must be #: " + text);
        const autoGenerateFlags = GeneratedIdentifierFlags.ReservedInNestedScopes |
            (text ? GeneratedIdentifierFlags.Unique : GeneratedIdentifierFlags.Auto);
        return createBaseGeneratedPrivateIdentifier(text ?? "", autoGenerateFlags, prefix, suffix);
    }

    // @api
    function getGeneratedPrivateNameForNode(node: Node, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier {
        const text = isMemberName(node) ? formatGeneratedName(/*privateName*/ true, prefix, node, suffix, idText) :
            `#generated@${getNodeId(node)}`;
        const flags = prefix || suffix ? GeneratedIdentifierFlags.Optimistic : GeneratedIdentifierFlags.None;
        const name = createBaseGeneratedPrivateIdentifier(text, GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    //
    // Punctuation
    //

    function createBaseToken<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseTokenNode(kind) as Mutable<T>;
    }

    // @api
    function createToken(token: SyntaxKind.SuperKeyword): SuperExpression;
    function createToken(token: SyntaxKind.ThisKeyword): ThisExpression;
    function createToken(token: SyntaxKind.NullKeyword): NullLiteral;
    function createToken(token: SyntaxKind.TrueKeyword): TrueLiteral;
    function createToken(token: SyntaxKind.FalseKeyword): FalseLiteral;
    function createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    function createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;
    function createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>;
    function createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>;
    function createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>;
    function createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>;
    function createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;
    function createToken<TKind extends SyntaxKind>(token: TKind) {
        Debug.assert(token >= SyntaxKind.FirstToken && token <= SyntaxKind.LastToken, "Invalid token");
        Debug.assert(token <= SyntaxKind.FirstTemplateToken || token >= SyntaxKind.LastTemplateToken, "Invalid token. Use 'createTemplateLiteralLikeNode' to create template literals.");
        Debug.assert(token <= SyntaxKind.FirstLiteralToken || token >= SyntaxKind.LastLiteralToken, "Invalid token. Use 'createLiteralLikeNode' to create literals.");
        Debug.assert(token !== SyntaxKind.Identifier, "Invalid token. Use 'createIdentifier' to create identifiers");
        const node = createBaseToken<Token<TKind>>(token);
        let transformFlags = TransformFlags.None;
        switch (token) {
            case SyntaxKind.AsyncKeyword:
                // 'async' modifier is ES2017 (async functions) or ES2018 (async generators)
                transformFlags = TransformFlags.ContainsES2017 |
                    TransformFlags.ContainsES2018;
                break;

            case SyntaxKind.UsingKeyword:
                transformFlags = TransformFlags.ContainsESNext;
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
            case SyntaxKind.InKeyword:
            case SyntaxKind.OutKeyword:
            case SyntaxKind.OverrideKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.UndefinedKeyword: // `undefined` is an Identifier in the expression case.
                transformFlags = TransformFlags.ContainsTypeScript;
                break;
            case SyntaxKind.SuperKeyword:
                transformFlags = TransformFlags.ContainsES2015 | TransformFlags.ContainsLexicalSuper;
                (node as Mutable<Token<SyntaxKind.SuperKeyword>> as Mutable<SuperExpression>).flowNode = undefined; // initialized by binder (FlowContainer)
                break;
            case SyntaxKind.StaticKeyword:
                transformFlags = TransformFlags.ContainsES2015;
                break;
            case SyntaxKind.AccessorKeyword:
                transformFlags = TransformFlags.ContainsClassFields;
                break;
            case SyntaxKind.ThisKeyword:
                // 'this' indicates a lexical 'this'
                transformFlags = TransformFlags.ContainsLexicalThis;
                (node as Mutable<Token<SyntaxKind.ThisKeyword>> as Mutable<ThisExpression>).flowNode = undefined; // initialized by binder (FlowContainer)
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
        const result: Modifier[] = [];
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
    function createQualifiedName(left: EntityName, right: string | Identifier) {
        const node = createBaseNode<QualifiedName>(SyntaxKind.QualifiedName);
        node.left = left;
        node.right = asName(right);
        node.transformFlags |= propagateChildFlags(node.left) |
            propagateIdentifierNameFlags(node.right);

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier) {
        return node.left !== left
                || node.right !== right
            ? update(createQualifiedName(left, right), node)
            : node;
    }

    // @api
    function createComputedPropertyName(expression: Expression) {
        const node = createBaseNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
        node.expression = parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsComputedPropertyName;
        return node;
    }

    // @api
    function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
        return node.expression !== expression
            ? update(createComputedPropertyName(expression), node)
            : node;
    }

    //
    // Signature elements
    //

    // @api
    function createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
        const node = createBaseDeclaration<TypeParameterDeclaration>(SyntaxKind.TypeParameter);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.constraint = constraint;
        node.default = defaultType;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.expression = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.constraint !== constraint
                || node.default !== defaultType
            ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node)
            : node;
    }

    // @api
    function createParameterDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        name: string | BindingName,
        questionToken?: QuestionToken,
        type?: TypeNode,
        initializer?: Expression,
    ) {
        const node = createBaseDeclaration<ParameterDeclaration>(SyntaxKind.Parameter);
        node.modifiers = asNodeArray(modifiers);
        node.dotDotDotToken = dotDotDotToken;
        node.name = asName(name);
        node.questionToken = questionToken;
        node.type = type;
        node.initializer = asInitializer(initializer);

        if (isThisIdentifier(node.name)) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.dotDotDotToken) |
                propagateNameFlags(node.name) |
                propagateChildFlags(node.questionToken) |
                propagateChildFlags(node.initializer) |
                (node.questionToken ?? node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                (node.dotDotDotToken ?? node.initializer ? TransformFlags.ContainsES2015 : TransformFlags.None) |
                (modifiersToFlags(node.modifiers) & ModifierFlags.ParameterPropertyModifier ? TransformFlags.ContainsTypeScriptClassSyntax : TransformFlags.None);
        }

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateParameterDeclaration(
        node: ParameterDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        name: string | BindingName,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined,
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
    function createDecorator(expression: Expression) {
        const node = createBaseNode<Decorator>(SyntaxKind.Decorator);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsTypeScript |
            TransformFlags.ContainsTypeScriptClassSyntax |
            TransformFlags.ContainsDecorators;
        return node;
    }

    // @api
    function updateDecorator(node: Decorator, expression: Expression) {
        return node.expression !== expression
            ? update(createDecorator(expression), node)
            : node;
    }

    //
    // Type Elements
    //

    // @api
    function createPropertySignature(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName | string,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
    ): PropertySignature {
        const node = createBaseDeclaration<PropertySignature>(SyntaxKind.PropertySignature);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.type = type;
        node.questionToken = questionToken;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.initializer = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updatePropertySignature(
        node: PropertySignature,
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.questionToken !== questionToken
                || node.type !== type
            ? finishUpdatePropertySignature(createPropertySignature(modifiers, name, questionToken, type), node)
            : node;
    }

    function finishUpdatePropertySignature(updated: Mutable<PropertySignature>, original: PropertySignature) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.initializer = original.initializer;
        }
        return update(updated, original);
    }

    // @api
    function createPropertyDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined,
    ) {
        const node = createBaseDeclaration<PropertyDeclaration>(SyntaxKind.PropertyDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.questionToken = questionOrExclamationToken && isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.exclamationToken = questionOrExclamationToken && isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined;
        node.type = type;
        node.initializer = asInitializer(initializer);

        const isAmbient = node.flags & NodeFlags.Ambient || modifiersToFlags(node.modifiers) & ModifierFlags.Ambient;

        node.transformFlags = propagateChildrenFlags(node.modifiers) |
            propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer) |
            (isAmbient || node.questionToken || node.exclamationToken || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            (isComputedPropertyName(node.name) || modifiersToFlags(node.modifiers) & ModifierFlags.Static && node.initializer ? TransformFlags.ContainsTypeScriptClassSyntax : TransformFlags.None) |
            TransformFlags.ContainsClassFields;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updatePropertyDeclaration(
        node: PropertyDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.questionToken !== (questionOrExclamationToken !== undefined && isQuestionToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
                || node.exclamationToken !== (questionOrExclamationToken !== undefined && isExclamationToken(questionOrExclamationToken) ? questionOrExclamationToken : undefined)
                || node.type !== type
                || node.initializer !== initializer
            ? update(createPropertyDeclaration(modifiers, name, questionOrExclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createMethodSignature(
        modifiers: readonly Modifier[] | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ) {
        const node = createBaseDeclaration<MethodSignature>(SyntaxKind.MethodSignature);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.questionToken = questionToken;
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateMethodSignature(
        node: MethodSignature,
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
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
        modifiers: readonly ModifierLike[] | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ) {
        const node = createBaseDeclaration<MethodDeclaration>(SyntaxKind.MethodDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.asteriskToken = asteriskToken;
        node.name = asName(name);
        node.questionToken = questionToken;
        node.exclamationToken = undefined; // initialized by parser for grammar errors
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;

        if (!node.body) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            const isAsync = modifiersToFlags(node.modifiers) & ModifierFlags.Async;
            const isGenerator = !!node.asteriskToken;
            const isAsyncGenerator = isAsync && isGenerator;

            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.asteriskToken) |
                propagateNameFlags(node.name) |
                propagateChildFlags(node.questionToken) |
                propagateChildrenFlags(node.typeParameters) |
                propagateChildrenFlags(node.parameters) |
                propagateChildFlags(node.type) |
                (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                    isAsync ? TransformFlags.ContainsES2017 :
                    isGenerator ? TransformFlags.ContainsGenerator :
                    TransformFlags.None) |
                (node.questionToken || node.typeParameters || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsES2015;
        }

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateMethodDeclaration(
        node: MethodDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
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

    function finishUpdateMethodDeclaration(updated: Mutable<MethodDeclaration>, original: MethodDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.exclamationToken = original.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createClassStaticBlockDeclaration(
        body: Block,
    ): ClassStaticBlockDeclaration {
        const node = createBaseDeclaration<ClassStaticBlockDeclaration>(SyntaxKind.ClassStaticBlockDeclaration);
        node.body = body;
        node.transformFlags = propagateChildFlags(body) | TransformFlags.ContainsClassFields;

        node.modifiers = undefined; // initialized by parser for grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateClassStaticBlockDeclaration(
        node: ClassStaticBlockDeclaration,
        body: Block,
    ): ClassStaticBlockDeclaration {
        return node.body !== body
            ? finishUpdateClassStaticBlockDeclaration(createClassStaticBlockDeclaration(body), node)
            : node;
    }

    function finishUpdateClassStaticBlockDeclaration(updated: Mutable<ClassStaticBlockDeclaration>, original: ClassStaticBlockDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.modifiers = original.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createConstructorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ) {
        const node = createBaseDeclaration<ConstructorDeclaration>(SyntaxKind.Constructor);
        node.modifiers = asNodeArray(modifiers);
        node.parameters = createNodeArray(parameters);
        node.body = body;

        if (!node.body) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateChildrenFlags(node.parameters) |
                (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                TransformFlags.ContainsES2015;
        }

        node.typeParameters = undefined; // initialized by parser for grammar errors
        node.type = undefined; // initialized by parser for grammar errors
        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateConstructorDeclaration(
        node: ConstructorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.parameters !== parameters
                || node.body !== body
            ? finishUpdateConstructorDeclaration(createConstructorDeclaration(modifiers, parameters, body), node)
            : node;
    }

    function finishUpdateConstructorDeclaration(updated: Mutable<ConstructorDeclaration>, original: ConstructorDeclaration) {
        if (updated !== original) {
            updated.typeParameters = original.typeParameters;
            updated.type = original.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createGetAccessorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ) {
        const node = createBaseDeclaration<GetAccessorDeclaration>(SyntaxKind.GetAccessor);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;

        if (!node.body) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateNameFlags(node.name) |
                propagateChildrenFlags(node.parameters) |
                propagateChildFlags(node.type) |
                (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
        }

        node.typeArguments = undefined; // used in quick info
        node.typeParameters = undefined; // initialized by parser for grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateGetAccessorDeclaration(
        node: GetAccessorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: PropertyName,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.parameters !== parameters
                || node.type !== type
                || node.body !== body
            ? finishUpdateGetAccessorDeclaration(createGetAccessorDeclaration(modifiers, name, parameters, type, body), node)
            : node;
    }

    function finishUpdateGetAccessorDeclaration(updated: Mutable<GetAccessorDeclaration>, original: GetAccessorDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.typeParameters = original.typeParameters;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createSetAccessorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ) {
        const node = createBaseDeclaration<SetAccessorDeclaration>(SyntaxKind.SetAccessor);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.parameters = createNodeArray(parameters);
        node.body = body;

        if (!node.body) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateNameFlags(node.name) |
                propagateChildrenFlags(node.parameters) |
                (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);
        }

        node.typeArguments = undefined; // used in quick info
        node.typeParameters = undefined; // initialized by parser for grammar errors
        node.type = undefined; // initialized by parser for grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateSetAccessorDeclaration(
        node: SetAccessorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: PropertyName,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.parameters !== parameters
                || node.body !== body
            ? finishUpdateSetAccessorDeclaration(createSetAccessorDeclaration(modifiers, name, parameters, body), node)
            : node;
    }

    function finishUpdateSetAccessorDeclaration(updated: Mutable<SetAccessorDeclaration>, original: SetAccessorDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.typeParameters = original.typeParameters;
            updated.type = original.type;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createCallSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): CallSignatureDeclaration {
        const node = createBaseDeclaration<CallSignatureDeclaration>(SyntaxKind.CallSignature);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateCallSignature(
        node: CallSignatureDeclaration,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
    ) {
        return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createCallSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createConstructSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): ConstructSignatureDeclaration {
        const node = createBaseDeclaration<ConstructSignatureDeclaration>(SyntaxKind.ConstructSignature);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateConstructSignature(
        node: ConstructSignatureDeclaration,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
    ) {
        return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
            ? finishUpdateBaseSignatureDeclaration(createConstructSignature(typeParameters, parameters, type), node)
            : node;
    }

    // @api
    function createIndexSignature(
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): IndexSignatureDeclaration {
        const node = createBaseDeclaration<IndexSignatureDeclaration>(SyntaxKind.IndexSignature);
        node.modifiers = asNodeArray(modifiers);
        node.parameters = asNodeArray(parameters);
        node.type = type!; // TODO(rbuckton): We mark this as required in IndexSignatureDeclaration, but it looks like the parser allows it to be elided.
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateIndexSignature(
        node: IndexSignatureDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ) {
        return node.parameters !== parameters
                || node.type !== type
                || node.modifiers !== modifiers
            ? finishUpdateBaseSignatureDeclaration(createIndexSignature(modifiers, parameters, type), node)
            : node;
    }

    // @api
    function createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail) {
        const node = createBaseNode<TemplateLiteralTypeSpan>(SyntaxKind.TemplateLiteralTypeSpan);
        node.type = type;
        node.literal = literal;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail) {
        return node.type !== type
                || node.literal !== literal
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
    function createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined) {
        const node = createBaseNode<TypePredicateNode>(SyntaxKind.TypePredicate);
        node.assertsModifier = assertsModifier;
        node.parameterName = asName(parameterName);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined) {
        return node.assertsModifier !== assertsModifier
                || node.parameterName !== parameterName
                || node.type !== type
            ? update(createTypePredicateNode(assertsModifier, parameterName, type), node)
            : node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
        const node = createBaseNode<TypeReferenceNode>(SyntaxKind.TypeReference);
        node.typeName = asName(typeName);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) {
        return node.typeName !== typeName
                || node.typeArguments !== typeArguments
            ? update(createTypeReferenceNode(typeName, typeArguments), node)
            : node;
    }

    // @api
    function createFunctionTypeNode(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): FunctionTypeNode {
        const node = createBaseDeclaration<FunctionTypeNode>(SyntaxKind.FunctionType);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.modifiers = undefined; // initialized by parser for grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateFunctionTypeNode(
        node: FunctionTypeNode,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode,
    ) {
        return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
            ? finishUpdateFunctionTypeNode(createFunctionTypeNode(typeParameters, parameters, type), node)
            : node;
    }

    function finishUpdateFunctionTypeNode(updated: Mutable<FunctionTypeNode>, original: FunctionTypeNode) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.modifiers = original.modifiers;
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createConstructorTypeNode(...args: Parameters<typeof createConstructorTypeNode1 | typeof createConstructorTypeNode2>) {
        return args.length === 4 ? createConstructorTypeNode1(...args) :
            args.length === 3 ? createConstructorTypeNode2(...args) :
            Debug.fail("Incorrect number of arguments specified.");
    }

    function createConstructorTypeNode1(
        modifiers: readonly Modifier[] | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): ConstructorTypeNode {
        const node = createBaseDeclaration<ConstructorTypeNode>(SyntaxKind.ConstructorType);
        node.modifiers = asNodeArray(modifiers);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    /** @deprecated */
    function createConstructorTypeNode2(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): ConstructorTypeNode {
        return createConstructorTypeNode1(/*modifiers*/ undefined, typeParameters, parameters, type);
    }

    // @api
    function updateConstructorTypeNode(...args: Parameters<typeof updateConstructorTypeNode1 | typeof updateConstructorTypeNode2>) {
        return args.length === 5 ? updateConstructorTypeNode1(...args) :
            args.length === 4 ? updateConstructorTypeNode2(...args) :
            Debug.fail("Incorrect number of arguments specified.");
    }

    function updateConstructorTypeNode1(
        node: ConstructorTypeNode,
        modifiers: readonly Modifier[] | undefined,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode,
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
        node: ConstructorTypeNode,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode,
    ) {
        return updateConstructorTypeNode1(node, node.modifiers, typeParameters, parameters, type);
    }

    // @api
    function createTypeQueryNode(exprName: EntityName, typeArguments?: readonly TypeNode[]) {
        const node = createBaseNode<TypeQueryNode>(SyntaxKind.TypeQuery);
        node.exprName = exprName;
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName, typeArguments?: readonly TypeNode[]) {
        return node.exprName !== exprName
                || node.typeArguments !== typeArguments
            ? update(createTypeQueryNode(exprName, typeArguments), node)
            : node;
    }

    // @api
    function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
        const node = createBaseDeclaration<TypeLiteralNode>(SyntaxKind.TypeLiteral);
        node.members = createNodeArray(members);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>) {
        return node.members !== members
            ? update(createTypeLiteralNode(members), node)
            : node;
    }

    // @api
    function createArrayTypeNode(elementType: TypeNode) {
        const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
        node.elementType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
        return node.elementType !== elementType
            ? update(createArrayTypeNode(elementType), node)
            : node;
    }

    // @api
    function createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]) {
        const node = createBaseNode<TupleTypeNode>(SyntaxKind.TupleType);
        node.elements = createNodeArray(parenthesizerRules().parenthesizeElementTypesOfTupleType(elements));
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]) {
        return node.elements !== elements
            ? update(createTupleTypeNode(elements), node)
            : node;
    }

    // @api
    function createNamedTupleMember(dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode) {
        const node = createBaseDeclaration<NamedTupleMember>(SyntaxKind.NamedTupleMember);
        node.dotDotDotToken = dotDotDotToken;
        node.name = name;
        node.questionToken = questionToken;
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode) {
        return node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.questionToken !== questionToken
                || node.type !== type
            ? update(createNamedTupleMember(dotDotDotToken, name, questionToken, type), node)
            : node;
    }

    // @api
    function createOptionalTypeNode(type: TypeNode) {
        const node = createBaseNode<OptionalTypeNode>(SyntaxKind.OptionalType);
        node.type = parenthesizerRules().parenthesizeTypeOfOptionalType(type);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
        return node.type !== type
            ? update(createOptionalTypeNode(type), node)
            : node;
    }

    // @api
    function createRestTypeNode(type: TypeNode) {
        const node = createBaseNode<RestTypeNode>(SyntaxKind.RestType);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
        return node.type !== type
            ? update(createRestTypeNode(type), node)
            : node;
    }

    function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: readonly TypeNode[], parenthesize: (nodes: readonly TypeNode[]) => readonly TypeNode[]) {
        const node = createBaseNode<UnionTypeNode | IntersectionTypeNode>(kind);
        node.types = factory.createNodeArray(parenthesize(types));
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    function updateUnionOrIntersectionTypeNode<T extends UnionOrIntersectionTypeNode>(node: T, types: NodeArray<TypeNode>, parenthesize: (nodes: readonly TypeNode[]) => readonly TypeNode[]): T {
        return node.types !== types
            ? update(createUnionOrIntersectionTypeNode(node.kind, types, parenthesize) as T, node)
            : node;
    }

    // @api
    function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
        return createUnionOrIntersectionTypeNode(SyntaxKind.UnionType, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType) as UnionTypeNode;
    }

    // @api
    function updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>) {
        return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType);
    }

    // @api
    function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
        return createUnionOrIntersectionTypeNode(SyntaxKind.IntersectionType, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType) as IntersectionTypeNode;
    }

    // @api
    function updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>) {
        return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
    }

    // @api
    function createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
        const node = createBaseNode<ConditionalTypeNode>(SyntaxKind.ConditionalType);
        node.checkType = parenthesizerRules().parenthesizeCheckTypeOfConditionalType(checkType);
        node.extendsType = parenthesizerRules().parenthesizeExtendsTypeOfConditionalType(extendsType);
        node.trueType = trueType;
        node.falseType = falseType;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) {
        return node.checkType !== checkType
                || node.extendsType !== extendsType
                || node.trueType !== trueType
                || node.falseType !== falseType
            ? update(createConditionalTypeNode(checkType, extendsType, trueType, falseType), node)
            : node;
    }

    // @api
    function createInferTypeNode(typeParameter: TypeParameterDeclaration) {
        const node = createBaseNode<InferTypeNode>(SyntaxKind.InferType);
        node.typeParameter = typeParameter;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration) {
        return node.typeParameter !== typeParameter
            ? update(createInferTypeNode(typeParameter), node)
            : node;
    }

    // @api
    function createTemplateLiteralType(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]) {
        const node = createBaseNode<TemplateLiteralTypeNode>(SyntaxKind.TemplateLiteralType);
        node.head = head;
        node.templateSpans = createNodeArray(templateSpans);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTemplateLiteralType(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]) {
        return node.head !== head
                || node.templateSpans !== templateSpans
            ? update(createTemplateLiteralType(head, templateSpans), node)
            : node;
    }

    // @api
    function createImportTypeNode(
        argument: TypeNode,
        attributes?: ImportAttributes,
        qualifier?: EntityName,
        typeArguments?: readonly TypeNode[],
        isTypeOf = false,
    ): ImportTypeNode {
        const node = createBaseNode<ImportTypeNode>(SyntaxKind.ImportType);
        node.argument = argument;
        node.attributes = attributes;
        if (node.assertions && node.assertions.assertClause && node.attributes) {
            (node.assertions as Mutable<ImportTypeAssertionContainer>).assertClause = node.attributes;
        }
        node.qualifier = qualifier;
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.isTypeOf = isTypeOf;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateImportTypeNode(
        node: ImportTypeNode,
        argument: TypeNode,
        attributes: ImportAttributes | undefined,
        qualifier: EntityName | undefined,
        typeArguments: readonly TypeNode[] | undefined,
        isTypeOf: boolean = node.isTypeOf,
    ): ImportTypeNode {
        return node.argument !== argument
                || node.attributes !== attributes
                || node.qualifier !== qualifier
                || node.typeArguments !== typeArguments
                || node.isTypeOf !== isTypeOf
            ? update(createImportTypeNode(argument, attributes, qualifier, typeArguments, isTypeOf), node)
            : node;
    }

    // @api
    function createParenthesizedType(type: TypeNode) {
        const node = createBaseNode<ParenthesizedTypeNode>(SyntaxKind.ParenthesizedType);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode) {
        return node.type !== type
            ? update(createParenthesizedType(type), node)
            : node;
    }

    // @api
    function createThisTypeNode() {
        const node = createBaseNode<ThisTypeNode>(SyntaxKind.ThisType);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
        const node = createBaseNode<TypeOperatorNode>(SyntaxKind.TypeOperator);
        node.operator = operator;
        node.type = operator === SyntaxKind.ReadonlyKeyword ?
            parenthesizerRules().parenthesizeOperandOfReadonlyTypeOperator(type) :
            parenthesizerRules().parenthesizeOperandOfTypeOperator(type);
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode) {
        return node.type !== type
            ? update(createTypeOperatorNode(node.operator, type), node)
            : node;
    }

    // @api
    function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode) {
        const node = createBaseNode<IndexedAccessTypeNode>(SyntaxKind.IndexedAccessType);
        node.objectType = parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(objectType);
        node.indexType = indexType;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) {
        return node.objectType !== objectType
                || node.indexType !== indexType
            ? update(createIndexedAccessTypeNode(objectType, indexType), node)
            : node;
    }

    // @api
    function createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
        const node = createBaseDeclaration<MappedTypeNode>(SyntaxKind.MappedType);
        node.readonlyToken = readonlyToken;
        node.typeParameter = typeParameter;
        node.nameType = nameType;
        node.questionToken = questionToken;
        node.type = type;
        node.members = members && createNodeArray(members);
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
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
    function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
        const node = createBaseNode<LiteralTypeNode>(SyntaxKind.LiteralType);
        node.literal = literal;
        node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]) {
        return node.literal !== literal
            ? update(createLiteralTypeNode(literal), node)
            : node;
    }

    //
    // Binding Patterns
    //

    // @api
    function createObjectBindingPattern(elements: readonly BindingElement[]) {
        const node = createBaseNode<ObjectBindingPattern>(SyntaxKind.ObjectBindingPattern);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
        if (node.transformFlags & TransformFlags.ContainsRestOrSpread) {
            node.transformFlags |= TransformFlags.ContainsES2018 |
                TransformFlags.ContainsObjectRestOrSpread;
        }
        return node;
    }

    // @api
    function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]) {
        return node.elements !== elements
            ? update(createObjectBindingPattern(elements), node)
            : node;
    }

    // @api
    function createArrayBindingPattern(elements: readonly ArrayBindingElement[]) {
        const node = createBaseNode<ArrayBindingPattern>(SyntaxKind.ArrayBindingPattern);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsBindingPattern;
        return node;
    }

    // @api
    function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) {
        return node.elements !== elements
            ? update(createArrayBindingPattern(elements), node)
            : node;
    }

    // @api
    function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression) {
        const node = createBaseDeclaration<BindingElement>(SyntaxKind.BindingElement);
        node.dotDotDotToken = dotDotDotToken;
        node.propertyName = asName(propertyName);
        node.name = asName(name);
        node.initializer = asInitializer(initializer);
        node.transformFlags |= propagateChildFlags(node.dotDotDotToken) |
            propagateNameFlags(node.propertyName) |
            propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer) |
            (node.dotDotDotToken ? TransformFlags.ContainsRestOrSpread : TransformFlags.None) |
            TransformFlags.ContainsES2015;

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) {
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

    // @api
    function createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean) {
        const node = createBaseNode<ArrayLiteralExpression>(SyntaxKind.ArrayLiteralExpression);
        // Ensure we add a trailing comma for something like `[NumericLiteral(1), NumericLiteral(2), OmittedExpresion]` so that
        // we end up with `[1, 2, ,]` instead of `[1, 2, ]` otherwise the `OmittedExpression` will just end up being treated like
        // a trailing comma.
        const lastElement = elements && lastOrUndefined(elements);
        const elementsArray = createNodeArray(elements, lastElement && isOmittedExpression(lastElement) ? true : undefined);
        node.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.elements);
        return node;
    }

    // @api
    function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]) {
        return node.elements !== elements
            ? update(createArrayLiteralExpression(elements, node.multiLine), node)
            : node;
    }

    // @api
    function createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean) {
        const node = createBaseDeclaration<ObjectLiteralExpression>(SyntaxKind.ObjectLiteralExpression);
        node.properties = createNodeArray(properties);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.properties);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) {
        return node.properties !== properties
            ? update(createObjectLiteralExpression(properties, node.multiLine), node)
            : node;
    }

    function createBasePropertyAccessExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, name: MemberName) {
        const node = createBaseDeclaration<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
        node.expression = expression;
        node.questionDotToken = questionDotToken;
        node.name = name;
        node.transformFlags = propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            (isIdentifier(node.name) ?
                propagateIdentifierNameFlags(node.name) :
                propagateChildFlags(node.name) | TransformFlags.ContainsPrivateIdentifierInExpression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createPropertyAccessExpression(expression: Expression, name: string | Identifier | PrivateIdentifier) {
        const node = createBasePropertyAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),
            /*questionDotToken*/ undefined,
            asName(name),
        );
        if (isSuperKeyword(expression)) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            node.transformFlags |= TransformFlags.ContainsES2017 |
                TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: Identifier | PrivateIdentifier) {
        if (isPropertyAccessChain(node)) {
            return updatePropertyAccessChain(node, expression, node.questionDotToken, cast(name, isIdentifier));
        }
        return node.expression !== expression
                || node.name !== name
            ? update(createPropertyAccessExpression(expression, name), node)
            : node;
    }

    // @api
    function createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | Identifier | PrivateIdentifier) {
        const node = createBasePropertyAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true),
            questionDotToken,
            asName(name),
        ) as Mutable<PropertyAccessChain>;
        node.flags |= NodeFlags.OptionalChain;
        node.transformFlags |= TransformFlags.ContainsES2020;
        return node;
    }

    // @api
    function updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: Identifier | PrivateIdentifier) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a PropertyAccessExpression using updatePropertyAccessChain. Use updatePropertyAccess instead.");
        // Because we are updating an existing PropertyAccessChain we want to inherit its emitFlags
        // instead of using the default from createPropertyAccess
        return node.expression !== expression
                || node.questionDotToken !== questionDotToken
                || node.name !== name
            ? update(createPropertyAccessChain(expression, questionDotToken, name), node)
            : node;
    }

    function createBaseElementAccessExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression) {
        const node = createBaseDeclaration<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
        node.expression = expression;
        node.questionDotToken = questionDotToken;
        node.argumentExpression = argumentExpression;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            propagateChildFlags(node.argumentExpression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createElementAccessExpression(expression: Expression, index: number | Expression) {
        const node = createBaseElementAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),
            /*questionDotToken*/ undefined,
            asExpression(index),
        );
        if (isSuperKeyword(expression)) {
            // super method calls require a lexical 'this'
            // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
            node.transformFlags |= TransformFlags.ContainsES2017 |
                TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) {
        if (isElementAccessChain(node)) {
            return updateElementAccessChain(node, expression, node.questionDotToken, argumentExpression);
        }
        return node.expression !== expression
                || node.argumentExpression !== argumentExpression
            ? update(createElementAccessExpression(expression, argumentExpression), node)
            : node;
    }

    // @api
    function createElementAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression) {
        const node = createBaseElementAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true),
            questionDotToken,
            asExpression(index),
        ) as Mutable<ElementAccessChain>;
        node.flags |= NodeFlags.OptionalChain;
        node.transformFlags |= TransformFlags.ContainsES2020;
        return node;
    }

    // @api
    function updateElementAccessChain(node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a ElementAccessExpression using updateElementAccessChain. Use updateElementAccess instead.");
        // Because we are updating an existing ElementAccessChain we want to inherit its emitFlags
        // instead of using the default from createElementAccess
        return node.expression !== expression
                || node.questionDotToken !== questionDotToken
                || node.argumentExpression !== argumentExpression
            ? update(createElementAccessChain(expression, questionDotToken, argumentExpression), node)
            : node;
    }

    function createBaseCallExpression(expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, typeArguments: NodeArray<TypeNode> | undefined, argumentsArray: NodeArray<Expression>) {
        const node = createBaseDeclaration<CallExpression>(SyntaxKind.CallExpression);
        node.expression = expression;
        node.questionDotToken = questionDotToken;
        node.typeArguments = typeArguments;
        node.arguments = argumentsArray;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.questionDotToken) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments);
        if (node.typeArguments) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        if (isSuperProperty(node.expression)) {
            node.transformFlags |= TransformFlags.ContainsLexicalThis;
        }
        return node;
    }

    // @api
    function createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
        const node = createBaseCallExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),
            /*questionDotToken*/ undefined,
            asNodeArray(typeArguments),
            parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)),
        );
        if (isImportKeyword(node.expression)) {
            node.transformFlags |= TransformFlags.ContainsDynamicImport;
        }
        return node;
    }

    // @api
    function updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) {
        if (isCallChain(node)) {
            return updateCallChain(node, expression, node.questionDotToken, typeArguments, argumentsArray);
        }
        return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
            ? update(createCallExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createCallChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
        const node = createBaseCallExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true),
            questionDotToken,
            asNodeArray(typeArguments),
            parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)),
        ) as Mutable<CallChain>;
        node.flags |= NodeFlags.OptionalChain;
        node.transformFlags |= TransformFlags.ContainsES2020;
        return node;
    }

    // @api
    function updateCallChain(node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a CallExpression using updateCallChain. Use updateCall instead.");
        return node.expression !== expression
                || node.questionDotToken !== questionDotToken
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
            ? update(createCallChain(expression, questionDotToken, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
        const node = createBaseDeclaration<NewExpression>(SyntaxKind.NewExpression);
        node.expression = parenthesizerRules().parenthesizeExpressionOfNew(expression);
        node.typeArguments = asNodeArray(typeArguments);
        node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : undefined;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments) |
            TransformFlags.ContainsES2020;
        if (node.typeArguments) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) {
        return node.expression !== expression
                || node.typeArguments !== typeArguments
                || node.arguments !== argumentsArray
            ? update(createNewExpression(expression, typeArguments, argumentsArray), node)
            : node;
    }

    // @api
    function createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
        const node = createBaseNode<TaggedTemplateExpression>(SyntaxKind.TaggedTemplateExpression);
        node.tag = parenthesizerRules().parenthesizeLeftSideOfAccess(tag, /*optionalChain*/ false);
        node.typeArguments = asNodeArray(typeArguments);
        node.template = template;
        node.transformFlags |= propagateChildFlags(node.tag) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.template) |
            TransformFlags.ContainsES2015;
        if (node.typeArguments) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        if (hasInvalidEscape(node.template)) {
            node.transformFlags |= TransformFlags.ContainsES2018;
        }
        return node;
    }

    // @api
    function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral) {
        return node.tag !== tag
                || node.typeArguments !== typeArguments
                || node.template !== template
            ? update(createTaggedTemplateExpression(tag, typeArguments, template), node)
            : node;
    }

    // @api
    function createTypeAssertion(type: TypeNode, expression: Expression) {
        const node = createBaseNode<TypeAssertion>(SyntaxKind.TypeAssertionExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.type = type;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression) {
        return node.type !== type
                || node.expression !== expression
            ? update(createTypeAssertion(type, expression), node)
            : node;
    }

    // @api
    function createParenthesizedExpression(expression: Expression) {
        const node = createBaseNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        node.transformFlags = propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createParenthesizedExpression(expression), node)
            : node;
    }

    // @api
    function createFunctionExpression(
        modifiers: readonly Modifier[] | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[] | undefined,
        type: TypeNode | undefined,
        body: Block,
    ) {
        const node = createBaseDeclaration<FunctionExpression>(SyntaxKind.FunctionExpression);
        node.modifiers = asNodeArray(modifiers);
        node.asteriskToken = asteriskToken;
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;

        const isAsync = modifiersToFlags(node.modifiers) & ModifierFlags.Async;
        const isGenerator = !!node.asteriskToken;
        const isAsyncGenerator = isAsync && isGenerator;

        node.transformFlags = propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.asteriskToken) |
            propagateNameFlags(node.name) |
            propagateChildrenFlags(node.typeParameters) |
            propagateChildrenFlags(node.parameters) |
            propagateChildFlags(node.type) |
            (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
            (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                isAsync ? TransformFlags.ContainsES2017 :
                isGenerator ? TransformFlags.ContainsGenerator :
                TransformFlags.None) |
            (node.typeParameters || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
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
        body: Block,
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
        modifiers: readonly Modifier[] | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        equalsGreaterThanToken: EqualsGreaterThanToken | undefined,
        body: ConciseBody,
    ) {
        const node = createBaseDeclaration<ArrowFunction>(SyntaxKind.ArrowFunction);
        node.modifiers = asNodeArray(modifiers);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.equalsGreaterThanToken = equalsGreaterThanToken ?? createToken(SyntaxKind.EqualsGreaterThanToken);
        node.body = parenthesizerRules().parenthesizeConciseBodyOfArrowFunction(body);

        const isAsync = modifiersToFlags(node.modifiers) & ModifierFlags.Async;

        node.transformFlags = propagateChildrenFlags(node.modifiers) |
            propagateChildrenFlags(node.typeParameters) |
            propagateChildrenFlags(node.parameters) |
            propagateChildFlags(node.type) |
            propagateChildFlags(node.equalsGreaterThanToken) |
            (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
            (node.typeParameters || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            (isAsync ? TransformFlags.ContainsES2017 | TransformFlags.ContainsLexicalThis : TransformFlags.None) |
            TransformFlags.ContainsES2015;

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateArrowFunction(
        node: ArrowFunction,
        modifiers: readonly Modifier[] | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        equalsGreaterThanToken: EqualsGreaterThanToken,
        body: ConciseBody,
    ): ArrowFunction {
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
    function createDeleteExpression(expression: Expression) {
        const node = createBaseNode<DeleteExpression>(SyntaxKind.DeleteExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateDeleteExpression(node: DeleteExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createDeleteExpression(expression), node)
            : node;
    }

    // @api
    function createTypeOfExpression(expression: Expression) {
        const node = createBaseNode<TypeOfExpression>(SyntaxKind.TypeOfExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateTypeOfExpression(node: TypeOfExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createTypeOfExpression(expression), node)
            : node;
    }

    // @api
    function createVoidExpression(expression: Expression) {
        const node = createBaseNode<VoidExpression>(SyntaxKind.VoidExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        return node;
    }

    // @api
    function updateVoidExpression(node: VoidExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createVoidExpression(expression), node)
            : node;
    }

    // @api
    function createAwaitExpression(expression: Expression) {
        const node = createBaseNode<AwaitExpression>(SyntaxKind.AwaitExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsES2017 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsAwait;
        return node;
    }

    // @api
    function updateAwaitExpression(node: AwaitExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createAwaitExpression(expression), node)
            : node;
    }

    // @api
    function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression) {
        const node = createBaseNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
        node.operator = operator;
        node.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (
            (operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken) &&
            isIdentifier(node.operand) &&
            !isGeneratedIdentifier(node.operand) &&
            !isLocalName(node.operand)
        ) {
            node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return node;
    }

    // @api
    function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression) {
        return node.operand !== operand
            ? update(createPrefixUnaryExpression(node.operator, operand), node)
            : node;
    }

    // @api
    function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator) {
        const node = createBaseNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
        node.operator = operator;
        node.operand = parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (
            isIdentifier(node.operand) &&
            !isGeneratedIdentifier(node.operand) &&
            !isLocalName(node.operand)
        ) {
            node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return node;
    }

    // @api
    function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression) {
        return node.operand !== operand
            ? update(createPostfixUnaryExpression(operand, node.operator), node)
            : node;
    }

    // @api
    function createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) {
        const node = createBaseDeclaration<BinaryExpression>(SyntaxKind.BinaryExpression);
        const operatorToken = asToken(operator);
        const operatorKind = operatorToken.kind;
        node.left = parenthesizerRules().parenthesizeLeftSideOfBinary(operatorKind, left);
        node.operatorToken = operatorToken;
        node.right = parenthesizerRules().parenthesizeRightSideOfBinary(operatorKind, node.left, right);
        node.transformFlags |= propagateChildFlags(node.left) |
            propagateChildFlags(node.operatorToken) |
            propagateChildFlags(node.right);
        if (operatorKind === SyntaxKind.QuestionQuestionToken) {
            node.transformFlags |= TransformFlags.ContainsES2020;
        }
        else if (operatorKind === SyntaxKind.EqualsToken) {
            if (isObjectLiteralExpression(node.left)) {
                node.transformFlags |= TransformFlags.ContainsES2015 |
                    TransformFlags.ContainsES2018 |
                    TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(node.left);
            }
            else if (isArrayLiteralExpression(node.left)) {
                node.transformFlags |= TransformFlags.ContainsES2015 |
                    TransformFlags.ContainsDestructuringAssignment |
                    propagateAssignmentPatternFlags(node.left);
            }
        }
        else if (operatorKind === SyntaxKind.AsteriskAsteriskToken || operatorKind === SyntaxKind.AsteriskAsteriskEqualsToken) {
            node.transformFlags |= TransformFlags.ContainsES2016;
        }
        else if (isLogicalOrCoalescingAssignmentOperator(operatorKind)) {
            node.transformFlags |= TransformFlags.ContainsES2021;
        }
        if (operatorKind === SyntaxKind.InKeyword && isPrivateIdentifier(node.left)) {
            node.transformFlags |= TransformFlags.ContainsPrivateIdentifierInExpression;
        }

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function propagateAssignmentPatternFlags(node: AssignmentPattern): TransformFlags {
        return containsObjectRestOrSpread(node) ? TransformFlags.ContainsObjectRestOrSpread : TransformFlags.None;
    }

    // @api
    function updateBinaryExpression(node: BinaryExpression, left: Expression, operator: BinaryOperatorToken, right: Expression) {
        return node.left !== left
                || node.operatorToken !== operator
                || node.right !== right
            ? update(createBinaryExpression(left, operator, right), node)
            : node;
    }

    // @api
    function createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression) {
        const node = createBaseNode<ConditionalExpression>(SyntaxKind.ConditionalExpression);
        node.condition = parenthesizerRules().parenthesizeConditionOfConditionalExpression(condition);
        node.questionToken = questionToken ?? createToken(SyntaxKind.QuestionToken);
        node.whenTrue = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenTrue);
        node.colonToken = colonToken ?? createToken(SyntaxKind.ColonToken);
        node.whenFalse = parenthesizerRules().parenthesizeBranchOfConditionalExpression(whenFalse);
        node.transformFlags |= propagateChildFlags(node.condition) |
            propagateChildFlags(node.questionToken) |
            propagateChildFlags(node.whenTrue) |
            propagateChildFlags(node.colonToken) |
            propagateChildFlags(node.whenFalse);
        node.flowNodeWhenFalse = undefined;
        node.flowNodeWhenTrue = undefined;
        return node;
    }

    // @api
    function updateConditionalExpression(
        node: ConditionalExpression,
        condition: Expression,
        questionToken: Token<SyntaxKind.QuestionToken>,
        whenTrue: Expression,
        colonToken: Token<SyntaxKind.ColonToken>,
        whenFalse: Expression,
    ): ConditionalExpression {
        return node.condition !== condition
                || node.questionToken !== questionToken
                || node.whenTrue !== whenTrue
                || node.colonToken !== colonToken
                || node.whenFalse !== whenFalse
            ? update(createConditionalExpression(condition, questionToken, whenTrue, colonToken, whenFalse), node)
            : node;
    }

    // @api
    function createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
        const node = createBaseNode<TemplateExpression>(SyntaxKind.TemplateExpression);
        node.head = head;
        node.templateSpans = createNodeArray(templateSpans);
        node.transformFlags |= propagateChildFlags(node.head) |
            propagateChildrenFlags(node.templateSpans) |
            TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) {
        return node.head !== head
                || node.templateSpans !== templateSpans
            ? update(createTemplateExpression(head, templateSpans), node)
            : node;
    }

    function checkTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string | undefined, rawText: string | undefined, templateFlags = TokenFlags.None) {
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

    function getTransformFlagsOfTemplateLiteralLike(templateFlags: TokenFlags) {
        let transformFlags = TransformFlags.ContainsES2015;
        if (templateFlags) {
            transformFlags |= TransformFlags.ContainsES2018;
        }
        return transformFlags;
    }

    // NOTE: `createTemplateLiteralLikeToken` and `createTemplateLiteralLikeDeclaration` are identical except for
    //       the underlying nodes they create. To avoid polymorphism due to two different node shapes, these
    //       functions are intentionally duplicated.
    function createTemplateLiteralLikeToken(kind: TemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined) {
        const node = createBaseToken<TemplateLiteralLikeNode>(kind);
        node.text = text;
        node.rawText = rawText;
        node.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
        return node;
    }

    function createTemplateLiteralLikeDeclaration(kind: SyntaxKind.NoSubstitutionTemplateLiteral, text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined) {
        const node = createBaseDeclaration<NoSubstitutionTemplateLiteral>(kind);
        node.text = text;
        node.rawText = rawText;
        node.templateFlags = templateFlags! & TokenFlags.TemplateLiteralLikeFlags;
        node.transformFlags = getTransformFlagsOfTemplateLiteralLike(node.templateFlags);
        return node;
    }

    // @api
    function createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined) {
        if (kind === SyntaxKind.NoSubstitutionTemplateLiteral) {
            return createTemplateLiteralLikeDeclaration(kind, text, rawText, templateFlags);
        }
        return createTemplateLiteralLikeToken(kind, text, rawText, templateFlags);
    }

    // @api
    function createTemplateHead(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags) as TemplateHead;
    }

    // @api
    function createTemplateMiddle(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateLiteralLikeNode(SyntaxKind.TemplateMiddle, text, rawText, templateFlags) as TemplateMiddle;
    }

    // @api
    function createTemplateTail(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateLiteralLikeNode(SyntaxKind.TemplateTail, text, rawText, templateFlags) as TemplateTail;
    }

    // @api
    function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        text = checkTemplateLiteralLikeNode(SyntaxKind.TemplateHead, text, rawText, templateFlags);
        return createTemplateLiteralLikeDeclaration(SyntaxKind.NoSubstitutionTemplateLiteral, text, rawText, templateFlags) as NoSubstitutionTemplateLiteral;
    }

    // @api
    function createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
        Debug.assert(!asteriskToken || !!expression, "A `YieldExpression` with an asteriskToken must have an expression.");
        const node = createBaseNode<YieldExpression>(SyntaxKind.YieldExpression);
        node.expression = expression && parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.asteriskToken = asteriskToken;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.asteriskToken) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsYield;
        return node;
    }

    // @api
    function updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression) {
        return node.expression !== expression
                || node.asteriskToken !== asteriskToken
            ? update(createYieldExpression(asteriskToken, expression), node)
            : node;
    }

    // @api
    function createSpreadElement(expression: Expression) {
        const node = createBaseNode<SpreadElement>(SyntaxKind.SpreadElement);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsES2015 |
            TransformFlags.ContainsRestOrSpread;
        return node;
    }

    // @api
    function updateSpreadElement(node: SpreadElement, expression: Expression) {
        return node.expression !== expression
            ? update(createSpreadElement(expression), node)
            : node;
    }

    // @api
    function createClassExpression(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ) {
        const node = createBaseDeclaration<ClassExpression>(SyntaxKind.ClassExpression);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.heritageClauses = asNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateNameFlags(node.name) |
            propagateChildrenFlags(node.typeParameters) |
            propagateChildrenFlags(node.heritageClauses) |
            propagateChildrenFlags(node.members) |
            (node.typeParameters ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
            TransformFlags.ContainsES2015;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateClassExpression(
        node: ClassExpression,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
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
        return createBaseNode<OmittedExpression>(SyntaxKind.OmittedExpression);
    }

    // @api
    function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
        const node = createBaseNode<ExpressionWithTypeArguments>(SyntaxKind.ExpressionWithTypeArguments);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) |
            TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
        return node.expression !== expression
                || node.typeArguments !== typeArguments
            ? update(createExpressionWithTypeArguments(expression, typeArguments), node)
            : node;
    }

    // @api
    function createAsExpression(expression: Expression, type: TypeNode) {
        const node = createBaseNode<AsExpression>(SyntaxKind.AsExpression);
        node.expression = expression;
        node.type = type;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode) {
        return node.expression !== expression
                || node.type !== type
            ? update(createAsExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullExpression(expression: Expression) {
        const node = createBaseNode<NonNullExpression>(SyntaxKind.NonNullExpression);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateNonNullExpression(node: NonNullExpression, expression: Expression) {
        if (isNonNullChain(node)) {
            return updateNonNullChain(node, expression);
        }
        return node.expression !== expression
            ? update(createNonNullExpression(expression), node)
            : node;
    }

    // @api
    function createSatisfiesExpression(expression: Expression, type: TypeNode) {
        const node = createBaseNode<SatisfiesExpression>(SyntaxKind.SatisfiesExpression);
        node.expression = expression;
        node.type = type;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.type) |
            TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateSatisfiesExpression(node: SatisfiesExpression, expression: Expression, type: TypeNode) {
        return node.expression !== expression
                || node.type !== type
            ? update(createSatisfiesExpression(expression, type), node)
            : node;
    }

    // @api
    function createNonNullChain(expression: Expression) {
        const node = createBaseNode<NonNullChain>(SyntaxKind.NonNullExpression);
        node.flags |= NodeFlags.OptionalChain;
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ true);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function updateNonNullChain(node: NonNullChain, expression: Expression) {
        Debug.assert(!!(node.flags & NodeFlags.OptionalChain), "Cannot update a NonNullExpression using updateNonNullChain. Use updateNonNullExpression instead.");
        return node.expression !== expression
            ? update(createNonNullChain(expression), node)
            : node;
    }

    // @api
    function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier) {
        const node = createBaseNode<MetaProperty>(SyntaxKind.MetaProperty);
        node.keywordToken = keywordToken;
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.name);
        switch (keywordToken) {
            case SyntaxKind.NewKeyword:
                node.transformFlags |= TransformFlags.ContainsES2015;
                break;
            case SyntaxKind.ImportKeyword:
                node.transformFlags |= TransformFlags.ContainsES2020;
                break;
            default:
                return Debug.assertNever(keywordToken);
        }

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateMetaProperty(node: MetaProperty, name: Identifier) {
        return node.name !== name
            ? update(createMetaProperty(node.keywordToken, name), node)
            : node;
    }

    //
    // Misc
    //

    // @api
    function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail) {
        const node = createBaseNode<TemplateSpan>(SyntaxKind.TemplateSpan);
        node.expression = expression;
        node.literal = literal;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.literal) |
            TransformFlags.ContainsES2015;
        return node;
    }

    // @api
    function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) {
        return node.expression !== expression
                || node.literal !== literal
            ? update(createTemplateSpan(expression, literal), node)
            : node;
    }

    // @api
    function createSemicolonClassElement() {
        const node = createBaseNode<SemicolonClassElement>(SyntaxKind.SemicolonClassElement);
        node.transformFlags |= TransformFlags.ContainsES2015;
        return node;
    }

    //
    // Element
    //

    // @api
    function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
        const node = createBaseNode<Block>(SyntaxKind.Block);
        node.statements = createNodeArray(statements);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateBlock(node: Block, statements: readonly Statement[]) {
        return node.statements !== statements
            ? update(createBlock(statements, node.multiLine), node)
            : node;
    }

    // @api
    function createVariableStatement(modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) {
        const node = createBaseNode<VariableStatement>(SyntaxKind.VariableStatement);
        node.modifiers = asNodeArray(modifiers);
        node.declarationList = isArray(declarationList) ? createVariableDeclarationList(declarationList) : declarationList;
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.declarationList);
        if (modifiersToFlags(node.modifiers) & ModifierFlags.Ambient) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateVariableStatement(node: VariableStatement, modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList) {
        return node.modifiers !== modifiers
                || node.declarationList !== declarationList
            ? update(createVariableStatement(modifiers, declarationList), node)
            : node;
    }

    // @api
    function createEmptyStatement() {
        const node = createBaseNode<EmptyStatement>(SyntaxKind.EmptyStatement);
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function createExpressionStatement(expression: Expression): ExpressionStatement {
        const node = createBaseNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
        node.expression = parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
        node.transformFlags |= propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateExpressionStatement(node: ExpressionStatement, expression: Expression) {
        return node.expression !== expression
            ? update(createExpressionStatement(expression), node)
            : node;
    }

    // @api
    function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement) {
        const node = createBaseNode<IfStatement>(SyntaxKind.IfStatement);
        node.expression = expression;
        node.thenStatement = asEmbeddedStatement(thenStatement);
        node.elseStatement = asEmbeddedStatement(elseStatement);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.thenStatement) |
            propagateChildFlags(node.elseStatement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) {
        return node.expression !== expression
                || node.thenStatement !== thenStatement
                || node.elseStatement !== elseStatement
            ? update(createIfStatement(expression, thenStatement, elseStatement), node)
            : node;
    }

    // @api
    function createDoStatement(statement: Statement, expression: Expression) {
        const node = createBaseNode<DoStatement>(SyntaxKind.DoStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.statement) |
            propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression) {
        return node.statement !== statement
                || node.expression !== expression
            ? update(createDoStatement(statement, expression), node)
            : node;
    }

    // @api
    function createWhileStatement(expression: Expression, statement: Statement) {
        const node = createBaseNode<WhileStatement>(SyntaxKind.WhileStatement);
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement) {
        return node.expression !== expression
                || node.statement !== statement
            ? update(createWhileStatement(expression, statement), node)
            : node;
    }

    // @api
    function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
        const node = createBaseNode<ForStatement>(SyntaxKind.ForStatement);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = incrementor;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.initializer) |
            propagateChildFlags(node.condition) |
            propagateChildFlags(node.incrementor) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) {
        return node.initializer !== initializer
                || node.condition !== condition
                || node.incrementor !== incrementor
                || node.statement !== statement
            ? update(createForStatement(initializer, condition, incrementor, statement), node)
            : node;
    }

    // @api
    function createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement) {
        const node = createBaseNode<ForInStatement>(SyntaxKind.ForInStatement);
        node.initializer = initializer;
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.initializer) |
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) {
        return node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
            ? update(createForInStatement(initializer, expression, statement), node)
            : node;
    }

    // @api
    function createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
        const node = createBaseNode<ForOfStatement>(SyntaxKind.ForOfStatement);
        node.awaitModifier = awaitModifier;
        node.initializer = initializer;
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.awaitModifier) |
            propagateChildFlags(node.initializer) |
            propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement) |
            TransformFlags.ContainsES2015;
        if (awaitModifier) node.transformFlags |= TransformFlags.ContainsES2018;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) {
        return node.awaitModifier !== awaitModifier
                || node.initializer !== initializer
                || node.expression !== expression
                || node.statement !== statement
            ? update(createForOfStatement(awaitModifier, initializer, expression, statement), node)
            : node;
    }

    // @api
    function createContinueStatement(label?: string | Identifier): ContinueStatement {
        const node = createBaseNode<ContinueStatement>(SyntaxKind.ContinueStatement);
        node.label = asName(label);
        node.transformFlags |= propagateChildFlags(node.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateContinueStatement(node: ContinueStatement, label: Identifier | undefined) {
        return node.label !== label
            ? update(createContinueStatement(label), node)
            : node;
    }

    // @api
    function createBreakStatement(label?: string | Identifier): BreakStatement {
        const node = createBaseNode<BreakStatement>(SyntaxKind.BreakStatement);
        node.label = asName(label);
        node.transformFlags |= propagateChildFlags(node.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateBreakStatement(node: BreakStatement, label: Identifier | undefined) {
        return node.label !== label
            ? update(createBreakStatement(label), node)
            : node;
    }

    // @api
    function createReturnStatement(expression?: Expression): ReturnStatement {
        const node = createBaseNode<ReturnStatement>(SyntaxKind.ReturnStatement);
        node.expression = expression;
        // return in an ES2018 async generator must be awaited
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateReturnStatement(node: ReturnStatement, expression: Expression | undefined) {
        return node.expression !== expression
            ? update(createReturnStatement(expression), node)
            : node;
    }

    // @api
    function createWithStatement(expression: Expression, statement: Statement) {
        const node = createBaseNode<WithStatement>(SyntaxKind.WithStatement);
        node.expression = expression;
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement) {
        return node.expression !== expression
                || node.statement !== statement
            ? update(createWithStatement(expression, statement), node)
            : node;
    }

    // @api
    function createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement {
        const node = createBaseNode<SwitchStatement>(SyntaxKind.SwitchStatement);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.caseBlock = caseBlock;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.caseBlock);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.possiblyExhaustive = false; // initialized by binder
        return node;
    }

    // @api
    function updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) {
        return node.expression !== expression
                || node.caseBlock !== caseBlock
            ? update(createSwitchStatement(expression, caseBlock), node)
            : node;
    }

    // @api
    function createLabeledStatement(label: string | Identifier, statement: Statement) {
        const node = createBaseNode<LabeledStatement>(SyntaxKind.LabeledStatement);
        node.label = asName(label);
        node.statement = asEmbeddedStatement(statement);
        node.transformFlags |= propagateChildFlags(node.label) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement) {
        return node.label !== label
                || node.statement !== statement
            ? update(createLabeledStatement(label, statement), node)
            : node;
    }

    // @api
    function createThrowStatement(expression: Expression) {
        const node = createBaseNode<ThrowStatement>(SyntaxKind.ThrowStatement);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateThrowStatement(node: ThrowStatement, expression: Expression) {
        return node.expression !== expression
            ? update(createThrowStatement(expression), node)
            : node;
    }

    // @api
    function createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
        const node = createBaseNode<TryStatement>(SyntaxKind.TryStatement);
        node.tryBlock = tryBlock;
        node.catchClause = catchClause;
        node.finallyBlock = finallyBlock;
        node.transformFlags |= propagateChildFlags(node.tryBlock) |
            propagateChildFlags(node.catchClause) |
            propagateChildFlags(node.finallyBlock);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) {
        return node.tryBlock !== tryBlock
                || node.catchClause !== catchClause
                || node.finallyBlock !== finallyBlock
            ? update(createTryStatement(tryBlock, catchClause, finallyBlock), node)
            : node;
    }

    // @api
    function createDebuggerStatement() {
        const node = createBaseNode<DebuggerStatement>(SyntaxKind.DebuggerStatement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) {
        const node = createBaseDeclaration<VariableDeclaration>(SyntaxKind.VariableDeclaration);
        node.name = asName(name);
        node.exclamationToken = exclamationToken;
        node.type = type;
        node.initializer = asInitializer(initializer);
        node.transformFlags |= propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer) |
            (node.exclamationToken ?? node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) {
        return node.name !== name
                || node.type !== type
                || node.exclamationToken !== exclamationToken
                || node.initializer !== initializer
            ? update(createVariableDeclaration(name, exclamationToken, type, initializer), node)
            : node;
    }

    // @api
    function createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags = NodeFlags.None) {
        const node = createBaseNode<VariableDeclarationList>(SyntaxKind.VariableDeclarationList);
        node.flags |= flags & NodeFlags.BlockScoped;
        node.declarations = createNodeArray(declarations);
        node.transformFlags |= propagateChildrenFlags(node.declarations) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;
        if (flags & NodeFlags.BlockScoped) {
            node.transformFlags |= TransformFlags.ContainsES2015 |
                TransformFlags.ContainsBlockScopedBinding;
        }
        if (flags & NodeFlags.Using) {
            node.transformFlags |= TransformFlags.ContainsESNext;
        }
        return node;
    }

    // @api
    function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) {
        return node.declarations !== declarations
            ? update(createVariableDeclarationList(declarations, node.flags), node)
            : node;
    }

    // @api
    function createFunctionDeclaration(
        modifiers: readonly Modifier[] | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ) {
        const node = createBaseDeclaration<FunctionDeclaration>(SyntaxKind.FunctionDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.asteriskToken = asteriskToken;
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;

        if (!node.body || modifiersToFlags(node.modifiers) & ModifierFlags.Ambient) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            const isAsync = modifiersToFlags(node.modifiers) & ModifierFlags.Async;
            const isGenerator = !!node.asteriskToken;
            const isAsyncGenerator = isAsync && isGenerator;

            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.asteriskToken) |
                propagateNameFlags(node.name) |
                propagateChildrenFlags(node.typeParameters) |
                propagateChildrenFlags(node.parameters) |
                propagateChildFlags(node.type) |
                (propagateChildFlags(node.body) & ~TransformFlags.ContainsPossibleTopLevelAwait) |
                (isAsyncGenerator ? TransformFlags.ContainsES2018 :
                    isAsync ? TransformFlags.ContainsES2017 :
                    isGenerator ? TransformFlags.ContainsGenerator :
                    TransformFlags.None) |
                (node.typeParameters || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsHoistedDeclarationOrCompletion;
        }

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function updateFunctionDeclaration(
        node: FunctionDeclaration,
        modifiers: readonly Modifier[] | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
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

    function finishUpdateFunctionDeclaration(updated: Mutable<FunctionDeclaration>, original: FunctionDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            if (updated.modifiers === original.modifiers) {
                updated.modifiers = original.modifiers;
            }
        }
        return finishUpdateBaseSignatureDeclaration(updated, original);
    }

    // @api
    function createClassDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ) {
        const node = createBaseDeclaration<ClassDeclaration>(SyntaxKind.ClassDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.heritageClauses = asNodeArray(heritageClauses);
        node.members = createNodeArray(members);

        if (modifiersToFlags(node.modifiers) & ModifierFlags.Ambient) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |= propagateChildrenFlags(node.modifiers) |
                propagateNameFlags(node.name) |
                propagateChildrenFlags(node.typeParameters) |
                propagateChildrenFlags(node.heritageClauses) |
                propagateChildrenFlags(node.members) |
                (node.typeParameters ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsES2015;
            if (node.transformFlags & TransformFlags.ContainsTypeScriptClassSyntax) {
                node.transformFlags |= TransformFlags.ContainsTypeScript;
            }
        }

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateClassDeclaration(
        node: ClassDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
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
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly TypeElement[],
    ) {
        const node = createBaseDeclaration<InterfaceDeclaration>(SyntaxKind.InterfaceDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.heritageClauses = asNodeArray(heritageClauses);
        node.members = createNodeArray(members);
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateInterfaceDeclaration(
        node: InterfaceDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly TypeElement[],
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.heritageClauses !== heritageClauses
                || node.members !== members
            ? update(createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members), node)
            : node;
    }

    // @api
    function createTypeAliasDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        type: TypeNode,
    ) {
        const node = createBaseDeclaration<TypeAliasDeclaration>(SyntaxKind.TypeAliasDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.typeParameters = asNodeArray(typeParameters);
        node.type = type;
        node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateTypeAliasDeclaration(
        node: TypeAliasDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        type: TypeNode,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.typeParameters !== typeParameters
                || node.type !== type
            ? update(createTypeAliasDeclaration(modifiers, name, typeParameters, type), node)
            : node;
    }

    // @api
    function createEnumDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        members: readonly EnumMember[],
    ) {
        const node = createBaseDeclaration<EnumDeclaration>(SyntaxKind.EnumDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.members = createNodeArray(members);
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.name) |
            propagateChildrenFlags(node.members) |
            TransformFlags.ContainsTypeScript;
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Enum declarations cannot contain `await`

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateEnumDeclaration(
        node: EnumDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        members: readonly EnumMember[],
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.members !== members
            ? update(createEnumDeclaration(modifiers, name, members), node)
            : node;
    }

    // @api
    function createModuleDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: ModuleName,
        body: ModuleBody | undefined,
        flags = NodeFlags.None,
    ) {
        const node = createBaseDeclaration<ModuleDeclaration>(SyntaxKind.ModuleDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.flags |= flags & (NodeFlags.Namespace | NodeFlags.NestedNamespace | NodeFlags.GlobalAugmentation);
        node.name = name;
        node.body = body;
        if (modifiersToFlags(node.modifiers) & ModifierFlags.Ambient) {
            node.transformFlags = TransformFlags.ContainsTypeScript;
        }
        else {
            node.transformFlags |= propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.name) |
                propagateChildFlags(node.body) |
                TransformFlags.ContainsTypeScript;
        }
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Module declarations cannot contain `await`.

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateModuleDeclaration(
        node: ModuleDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: ModuleName,
        body: ModuleBody | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.body !== body
            ? update(createModuleDeclaration(modifiers, name, body, node.flags), node)
            : node;
    }

    // @api
    function createModuleBlock(statements: readonly Statement[]) {
        const node = createBaseNode<ModuleBlock>(SyntaxKind.ModuleBlock);
        node.statements = createNodeArray(statements);
        node.transformFlags |= propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]) {
        return node.statements !== statements
            ? update(createModuleBlock(statements), node)
            : node;
    }

    // @api
    function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
        const node = createBaseNode<CaseBlock>(SyntaxKind.CaseBlock);
        node.clauses = createNodeArray(clauses);
        node.transformFlags |= propagateChildrenFlags(node.clauses);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) {
        return node.clauses !== clauses
            ? update(createCaseBlock(clauses), node)
            : node;
    }

    // @api
    function createNamespaceExportDeclaration(name: string | Identifier) {
        const node = createBaseDeclaration<NamespaceExportDeclaration>(SyntaxKind.NamespaceExportDeclaration);
        node.name = asName(name);
        node.transformFlags |= propagateIdentifierNameFlags(node.name) |
            TransformFlags.ContainsTypeScript;

        node.modifiers = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier) {
        return node.name !== name
            ? finishUpdateNamespaceExportDeclaration(createNamespaceExportDeclaration(name), node)
            : node;
    }

    function finishUpdateNamespaceExportDeclaration(updated: Mutable<NamespaceExportDeclaration>, original: NamespaceExportDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.modifiers = original.modifiers;
        }
        return update(updated, original);
    }

    // @api
    function createImportEqualsDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        isTypeOnly: boolean,
        name: string | Identifier,
        moduleReference: ModuleReference,
    ) {
        const node = createBaseDeclaration<ImportEqualsDeclaration>(SyntaxKind.ImportEqualsDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.isTypeOnly = isTypeOnly;
        node.moduleReference = moduleReference;
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateIdentifierNameFlags(node.name) |
            propagateChildFlags(node.moduleReference);

        if (!isExternalModuleReference(node.moduleReference)) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }

        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // Import= declaration is always parsed in an Await context

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateImportEqualsDeclaration(
        node: ImportEqualsDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        isTypeOnly: boolean,
        name: Identifier,
        moduleReference: ModuleReference,
    ) {
        return node.modifiers !== modifiers
                || node.isTypeOnly !== isTypeOnly
                || node.name !== name
                || node.moduleReference !== moduleReference
            ? update(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node)
            : node;
    }

    // @api
    function createImportDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        importClause: ImportClause | undefined,
        moduleSpecifier: Expression,
        attributes: ImportAttributes | undefined,
    ): ImportDeclaration {
        const node = createBaseNode<ImportDeclaration>(SyntaxKind.ImportDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.importClause = importClause;
        node.moduleSpecifier = moduleSpecifier;
        node.attributes = node.assertClause = attributes;
        node.transformFlags |= propagateChildFlags(node.importClause) |
            propagateChildFlags(node.moduleSpecifier);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateImportDeclaration(
        node: ImportDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        importClause: ImportClause | undefined,
        moduleSpecifier: Expression,
        attributes: ImportAttributes | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.importClause !== importClause
                || node.moduleSpecifier !== moduleSpecifier
                || node.attributes !== attributes
            ? update(createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes), node)
            : node;
    }

    // @api
    function createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
        const node = createBaseDeclaration<ImportClause>(SyntaxKind.ImportClause);
        node.isTypeOnly = isTypeOnly;
        node.name = name;
        node.namedBindings = namedBindings;
        node.transformFlags |= propagateChildFlags(node.name) |
            propagateChildFlags(node.namedBindings);
        if (isTypeOnly) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined) {
        return node.isTypeOnly !== isTypeOnly
                || node.name !== name
                || node.namedBindings !== namedBindings
            ? update(createImportClause(isTypeOnly, name, namedBindings), node)
            : node;
    }

    // @api
    function createAssertClause(elements: readonly AssertEntry[], multiLine?: boolean): AssertClause {
        const node = createBaseNode<AssertClause>(SyntaxKind.AssertClause);
        node.elements = createNodeArray(elements);
        node.multiLine = multiLine;
        node.token = SyntaxKind.AssertKeyword;
        node.transformFlags |= TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateAssertClause(node: AssertClause, elements: readonly AssertEntry[], multiLine?: boolean): AssertClause {
        return node.elements !== elements
                || node.multiLine !== multiLine
            ? update(createAssertClause(elements, multiLine), node)
            : node;
    }

    // @api
    function createAssertEntry(name: AssertionKey, value: Expression): AssertEntry {
        const node = createBaseNode<AssertEntry>(SyntaxKind.AssertEntry);
        node.name = name;
        node.value = value;
        node.transformFlags |= TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateAssertEntry(node: AssertEntry, name: AssertionKey, value: Expression): AssertEntry {
        return node.name !== name
                || node.value !== value
            ? update(createAssertEntry(name, value), node)
            : node;
    }

    // @api
    function createImportTypeAssertionContainer(clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer {
        const node = createBaseNode<ImportTypeAssertionContainer>(SyntaxKind.ImportTypeAssertionContainer);
        node.assertClause = clause;
        node.multiLine = multiLine;
        return node;
    }

    // @api
    function updateImportTypeAssertionContainer(node: ImportTypeAssertionContainer, clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer {
        return node.assertClause !== clause
                || node.multiLine !== multiLine
            ? update(createImportTypeAssertionContainer(clause, multiLine), node)
            : node;
    }

    // @api
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean): ImportAttributes;
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean, token?: ImportAttributes["token"]): ImportAttributes;
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean, token?: ImportAttributes["token"]): ImportAttributes {
        const node = createBaseNode<ImportAttributes>(SyntaxKind.ImportAttributes);
        node.token = token ?? SyntaxKind.WithKeyword;
        node.elements = createNodeArray(elements);
        node.multiLine = multiLine;
        node.transformFlags |= TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateImportAttributes(node: ImportAttributes, elements: readonly ImportAttribute[], multiLine?: boolean): ImportAttributes {
        return node.elements !== elements
                || node.multiLine !== multiLine
            ? update(createImportAttributes(elements, multiLine, node.token), node)
            : node;
    }

    // @api
    function createImportAttribute(name: ImportAttributeName, value: Expression): ImportAttribute {
        const node = createBaseNode<ImportAttribute>(SyntaxKind.ImportAttribute);
        node.name = name;
        node.value = value;
        node.transformFlags |= TransformFlags.ContainsESNext;
        return node;
    }

    // @api
    function updateImportAttribute(node: ImportAttribute, name: ImportAttributeName, value: Expression): ImportAttribute {
        return node.name !== name
                || node.value !== value
            ? update(createImportAttribute(name, value), node)
            : node;
    }

    // @api
    function createNamespaceImport(name: Identifier): NamespaceImport {
        const node = createBaseDeclaration<NamespaceImport>(SyntaxKind.NamespaceImport);
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.name);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamespaceImport(node: NamespaceImport, name: Identifier) {
        return node.name !== name
            ? update(createNamespaceImport(name), node)
            : node;
    }

    // @api
    function createNamespaceExport(name: ModuleExportName): NamespaceExport {
        const node = createBaseDeclaration<NamespaceExport>(SyntaxKind.NamespaceExport);
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.name) |
            TransformFlags.ContainsES2020;
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamespaceExport(node: NamespaceExport, name: ModuleExportName) {
        return node.name !== name
            ? update(createNamespaceExport(name), node)
            : node;
    }

    // @api
    function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
        const node = createBaseNode<NamedImports>(SyntaxKind.NamedImports);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]) {
        return node.elements !== elements
            ? update(createNamedImports(elements), node)
            : node;
    }

    // @api
    function createImportSpecifier(isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier) {
        const node = createBaseDeclaration<ImportSpecifier>(SyntaxKind.ImportSpecifier);
        node.isTypeOnly = isTypeOnly;
        node.propertyName = propertyName;
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.propertyName) |
            propagateChildFlags(node.name);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateImportSpecifier(node: ImportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier) {
        return node.isTypeOnly !== isTypeOnly
                || node.propertyName !== propertyName
                || node.name !== name
            ? update(createImportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createExportAssignment(
        modifiers: readonly ModifierLike[] | undefined,
        isExportEquals: boolean | undefined,
        expression: Expression,
    ) {
        const node = createBaseDeclaration<ExportAssignment>(SyntaxKind.ExportAssignment);
        node.modifiers = asNodeArray(modifiers);
        node.isExportEquals = isExportEquals;
        node.expression = isExportEquals
            ? parenthesizerRules().parenthesizeRightSideOfBinary(SyntaxKind.EqualsToken, /*leftSide*/ undefined, expression)
            : parenthesizerRules().parenthesizeExpressionOfExportDefault(expression);
        node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.expression);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateExportAssignment(
        node: ExportAssignment,
        modifiers: readonly ModifierLike[] | undefined,
        expression: Expression,
    ) {
        return node.modifiers !== modifiers
                || node.expression !== expression
            ? update(createExportAssignment(modifiers, node.isExportEquals, expression), node)
            : node;
    }

    // @api
    function createExportDeclaration(
        modifiers: readonly Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier?: Expression,
        attributes?: ImportAttributes,
    ) {
        const node = createBaseDeclaration<ExportDeclaration>(SyntaxKind.ExportDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.isTypeOnly = isTypeOnly;
        node.exportClause = exportClause;
        node.moduleSpecifier = moduleSpecifier;
        node.attributes = node.assertClause = attributes;
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.exportClause) |
            propagateChildFlags(node.moduleSpecifier);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateExportDeclaration(
        node: ExportDeclaration,
        modifiers: readonly Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier: Expression | undefined,
        attributes: ImportAttributes | undefined,
    ) {
        return node.modifiers !== modifiers
                || node.isTypeOnly !== isTypeOnly
                || node.exportClause !== exportClause
                || node.moduleSpecifier !== moduleSpecifier
                || node.attributes !== attributes
            ? finishUpdateExportDeclaration(createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes), node)
            : node;
    }

    function finishUpdateExportDeclaration(updated: Mutable<ExportDeclaration>, original: ExportDeclaration) {
        if (updated !== original) {
            // copy children used only for error reporting
            if (updated.modifiers === original.modifiers) {
                updated.modifiers = original.modifiers;
            }
        }
        return update(updated, original);
    }

    // @api
    function createNamedExports(elements: readonly ExportSpecifier[]) {
        const node = createBaseNode<NamedExports>(SyntaxKind.NamedExports);
        node.elements = createNodeArray(elements);
        node.transformFlags |= propagateChildrenFlags(node.elements);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]) {
        return node.elements !== elements
            ? update(createNamedExports(elements), node)
            : node;
    }

    // @api
    function createExportSpecifier(isTypeOnly: boolean, propertyName: string | ModuleExportName | undefined, name: string | ModuleExportName) {
        const node = createBaseNode<ExportSpecifier>(SyntaxKind.ExportSpecifier);
        node.isTypeOnly = isTypeOnly;
        node.propertyName = asName(propertyName);
        node.name = asName(name);
        node.transformFlags |= propagateChildFlags(node.propertyName) |
            propagateChildFlags(node.name);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateExportSpecifier(node: ExportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: ModuleExportName) {
        return node.isTypeOnly !== isTypeOnly
                || node.propertyName !== propertyName
                || node.name !== name
            ? update(createExportSpecifier(isTypeOnly, propertyName, name), node)
            : node;
    }

    // @api
    function createMissingDeclaration(): MissingDeclaration {
        const node = createBaseDeclaration<MissingDeclaration>(SyntaxKind.MissingDeclaration);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    //
    // Module references
    //

    // @api
    function createExternalModuleReference(expression: Expression) {
        const node = createBaseNode<ExternalModuleReference>(SyntaxKind.ExternalModuleReference);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.expression);
        node.transformFlags &= ~TransformFlags.ContainsPossibleTopLevelAwait; // always parsed in an Await context
        return node;
    }

    // @api
    function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression) {
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
    function createJSDocPrimaryTypeWorker<T extends JSDocType>(kind: T["kind"]) {
        return createBaseNode(kind);
    }

    // @api
    // createJSDocNullableType
    // createJSDocNonNullableType
    function createJSDocPrePostfixUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"], type: T["type"], postfix = false): T {
        const node = createJSDocUnaryTypeWorker(
            kind,
            postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type,
        ) as Mutable<T>;
        node.postfix = postfix;
        return node;
    }

    // @api
    // createJSDocOptionalType
    // createJSDocVariadicType
    // createJSDocNamepathType
    function createJSDocUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"], type: T["type"]): T {
        const node = createBaseNode<T>(kind);
        node.type = type;
        return node;
    }

    // @api
    // updateJSDocNonNullableType
    // updateJSDocNullableType
    function updateJSDocPrePostfixUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"], node: T, type: T["type"]): T {
        return node.type !== type
            ? update(createJSDocPrePostfixUnaryTypeWorker(kind, type, node.postfix), node)
            : node;
    }

    // @api
    // updateJSDocOptionalType
    // updateJSDocVariadicType
    // updateJSDocNamepathType
    function updateJSDocUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"], node: T, type: T["type"]): T {
        return node.type !== type
            ? update(createJSDocUnaryTypeWorker(kind, type), node)
            : node;
    }

    // @api
    function createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
        const node = createBaseDeclaration<JSDocFunctionType>(SyntaxKind.JSDocFunctionType);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = propagateChildrenFlags(node.parameters) |
            (node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function updateJSDocFunctionType(node: JSDocFunctionType, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
        return node.parameters !== parameters
                || node.type !== type
            ? update(createJSDocFunctionType(parameters, type), node)
            : node;
    }

    // @api
    function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType = false): JSDocTypeLiteral {
        const node = createBaseDeclaration<JSDocTypeLiteral>(SyntaxKind.JSDocTypeLiteral);
        node.jsDocPropertyTags = asNodeArray(propertyTags);
        node.isArrayType = isArrayType;
        return node;
    }

    // @api
    function updateJSDocTypeLiteral(node: JSDocTypeLiteral, propertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean): JSDocTypeLiteral {
        return node.jsDocPropertyTags !== propertyTags
                || node.isArrayType !== isArrayType
            ? update(createJSDocTypeLiteral(propertyTags, isArrayType), node)
            : node;
    }

    // @api
    function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
        const node = createBaseNode<JSDocTypeExpression>(SyntaxKind.JSDocTypeExpression);
        node.type = type;
        return node;
    }

    // @api
    function updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression {
        return node.type !== type
            ? update(createJSDocTypeExpression(type), node)
            : node;
    }

    // @api
    function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
        const node = createBaseDeclaration<JSDocSignature>(SyntaxKind.JSDocSignature);
        node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature {
        return node.typeParameters !== typeParameters
                || node.parameters !== parameters
                || node.type !== type
            ? update(createJSDocSignature(typeParameters, parameters, type), node)
            : node;
    }

    function getDefaultTagName(node: JSDocTag) {
        const defaultTagName = getDefaultTagNameForKind(node.kind);
        return node.tagName.escapedText === escapeLeadingUnderscores(defaultTagName)
            ? node.tagName
            : createIdentifier(defaultTagName);
    }

    // @api
    function createBaseJSDocTag<T extends JSDocTag>(kind: T["kind"], tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined) {
        const node = createBaseNode<T>(kind);
        node.tagName = tagName;
        node.comment = comment;
        return node;
    }

    function createBaseJSDocTagDeclaration<T extends JSDocTag & Declaration>(kind: T["kind"], tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined) {
        const node = createBaseDeclaration<T>(kind);
        node.tagName = tagName;
        node.comment = comment;
        return node;
    }

    // @api
    function createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag {
        const node = createBaseJSDocTag<JSDocTemplateTag>(SyntaxKind.JSDocTemplateTag, tagName ?? createIdentifier("template"), comment);
        node.constraint = constraint;
        node.typeParameters = createNodeArray(typeParameters);
        return node;
    }

    // @api
    function updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier = getDefaultTagName(node), constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | NodeArray<JSDocComment> | undefined): JSDocTemplateTag {
        return node.tagName !== tagName
                || node.constraint !== constraint
                || node.typeParameters !== typeParameters
                || node.comment !== comment
            ? update(createJSDocTemplateTag(tagName, constraint, typeParameters, comment), node)
            : node;
    }

    // @api
    function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag {
        const node = createBaseJSDocTagDeclaration<JSDocTypedefTag>(SyntaxKind.JSDocTypedefTag, tagName ?? createIdentifier("typedef"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = getJSDocTypeAliasName(fullName);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier = getDefaultTagName(node), typeExpression: JSDocTypeExpression | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypedefTag {
        return node.tagName !== tagName
                || node.typeExpression !== typeExpression
                || node.fullName !== fullName
                || node.comment !== comment
            ? update(createJSDocTypedefTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag {
        const node = createBaseJSDocTagDeclaration<JSDocParameterTag>(SyntaxKind.JSDocParameterTag, tagName ?? createIdentifier("param"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier = getDefaultTagName(node), name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocParameterTag {
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
    function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag {
        const node = createBaseJSDocTagDeclaration<JSDocPropertyTag>(SyntaxKind.JSDocPropertyTag, tagName ?? createIdentifier("prop"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier = getDefaultTagName(node), name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocPropertyTag {
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
    function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag {
        const node = createBaseJSDocTagDeclaration<JSDocCallbackTag>(SyntaxKind.JSDocCallbackTag, tagName ?? createIdentifier("callback"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = getJSDocTypeAliasName(fullName);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier = getDefaultTagName(node), typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocCallbackTag {
        return node.tagName !== tagName
                || node.typeExpression !== typeExpression
                || node.fullName !== fullName
                || node.comment !== comment
            ? update(createJSDocCallbackTag(tagName, typeExpression, fullName, comment), node)
            : node;
    }

    // @api
    function createJSDocOverloadTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag {
        const node = createBaseJSDocTag<JSDocOverloadTag>(SyntaxKind.JSDocOverloadTag, tagName ?? createIdentifier("overload"), comment);
        node.typeExpression = typeExpression;
        return node;
    }

    // @api
    function updateJSDocOverloadTag(node: JSDocOverloadTag, tagName: Identifier = getDefaultTagName(node), typeExpression: JSDocSignature, comment: string | NodeArray<JSDocComment> | undefined): JSDocOverloadTag {
        return node.tagName !== tagName
                || node.typeExpression !== typeExpression
                || node.comment !== comment
            ? update(createJSDocOverloadTag(tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag {
        const node = createBaseJSDocTag<JSDocAugmentsTag>(SyntaxKind.JSDocAugmentsTag, tagName ?? createIdentifier("augments"), comment);
        node.class = className;
        return node;
    }

    // @api
    function updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier = getDefaultTagName(node), className: JSDocAugmentsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocAugmentsTag {
        return node.tagName !== tagName
                || node.class !== className
                || node.comment !== comment
            ? update(createJSDocAugmentsTag(tagName, className, comment), node)
            : node;
    }

    // @api
    function createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag {
        const node = createBaseJSDocTag<JSDocImplementsTag>(SyntaxKind.JSDocImplementsTag, tagName ?? createIdentifier("implements"), comment);
        node.class = className;
        return node;
    }

    // @api
    function createJSDocSeeTag(tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
        const node = createBaseJSDocTag<JSDocSeeTag>(SyntaxKind.JSDocSeeTag, tagName ?? createIdentifier("see"), comment);
        node.name = name;
        return node;
    }

    // @api
    function updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
        return node.tagName !== tagName
                || node.name !== name
                || node.comment !== comment
            ? update(createJSDocSeeTag(tagName, name, comment), node)
            : node;
    }

    // @api
    function createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference {
        const node = createBaseNode<JSDocNameReference>(SyntaxKind.JSDocNameReference);
        node.name = name;
        return node;
    }

    // @api
    function updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference {
        return node.name !== name
            ? update(createJSDocNameReference(name), node)
            : node;
    }

    // @api
    function createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier) {
        const node = createBaseNode<JSDocMemberName>(SyntaxKind.JSDocMemberName);
        node.left = left;
        node.right = right;
        node.transformFlags |= propagateChildFlags(node.left) |
            propagateChildFlags(node.right);
        return node;
    }

    // @api
    function updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier) {
        return node.left !== left
                || node.right !== right
            ? update(createJSDocMemberName(left, right), node)
            : node;
    }

    // @api
    function createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
        const node = createBaseNode<JSDocLink>(SyntaxKind.JSDocLink);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
        return node.name !== name
            ? update(createJSDocLink(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
        const node = createBaseNode<JSDocLinkCode>(SyntaxKind.JSDocLinkCode);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
        return node.name !== name
            ? update(createJSDocLinkCode(name, text), node)
            : node;
    }

    // @api
    function createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
        const node = createBaseNode<JSDocLinkPlain>(SyntaxKind.JSDocLinkPlain);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
        return node.name !== name
            ? update(createJSDocLinkPlain(name, text), node)
            : node;
    }

    // @api
    function updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier = getDefaultTagName(node), className: JSDocImplementsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocImplementsTag {
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
    function createJSDocSimpleTagWorker<T extends JSDocTag>(kind: T["kind"], tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>) {
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
    function updateJSDocSimpleTagWorker<T extends JSDocTag>(kind: T["kind"], node: T, tagName: Identifier = getDefaultTagName(node), comment: string | NodeArray<JSDocComment> | undefined) {
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
    // createJSDocSatisfiesTag
    function createJSDocTypeLikeTagWorker<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"], tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>) {
        const node = createBaseJSDocTag<T>(kind, tagName ?? createIdentifier(getDefaultTagNameForKind(kind)), comment);
        node.typeExpression = typeExpression;
        return node;
    }

    // @api
    // updateJSDocTypeTag
    // updateJSDocReturnTag
    // updateJSDocThisTag
    // updateJSDocEnumTag
    // updateJSDocSatisfiesTag
    function updateJSDocTypeLikeTagWorker<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"], node: T, tagName: Identifier = getDefaultTagName(node), typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined) {
        return node.tagName !== tagName
                || node.typeExpression !== typeExpression
                || node.comment !== comment
            ? update(createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag {
        const node = createBaseJSDocTag<JSDocUnknownTag>(SyntaxKind.JSDocTag, tagName, comment);
        return node;
    }

    // @api
    function updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined): JSDocUnknownTag {
        return node.tagName !== tagName
                || node.comment !== comment
            ? update(createJSDocUnknownTag(tagName, comment), node)
            : node;
    }

    // @api
    function createJSDocEnumTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>) {
        const node = createBaseJSDocTagDeclaration<JSDocEnumTag>(SyntaxKind.JSDocEnumTag, tagName ?? createIdentifier(getDefaultTagNameForKind(SyntaxKind.JSDocEnumTag)), comment);
        node.typeExpression = typeExpression;

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier = getDefaultTagName(node), typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined) {
        return node.tagName !== tagName
                || node.typeExpression !== typeExpression
                || node.comment !== comment
            ? update(createJSDocEnumTag(tagName, typeExpression, comment), node)
            : node;
    }

    // @api
    function createJSDocImportTag(tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes?: ImportAttributes, comment?: string | NodeArray<JSDocComment>): JSDocImportTag {
        const node = createBaseJSDocTag<JSDocImportTag>(SyntaxKind.JSDocImportTag, tagName ?? createIdentifier("import"), comment);
        node.importClause = importClause;
        node.moduleSpecifier = moduleSpecifier;
        node.attributes = attributes;
        node.comment = comment;
        return node;
    }

    function updateJSDocImportTag(node: JSDocImportTag, tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocImportTag {
        return node.tagName !== tagName
                || node.comment !== comment
                || node.importClause !== importClause
                || node.moduleSpecifier !== moduleSpecifier
                || node.attributes !== attributes
            ? update(createJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, comment), node)
            : node;
    }

    // @api
    function createJSDocText(text: string): JSDocText {
        const node = createBaseNode<JSDocText>(SyntaxKind.JSDocText);
        node.text = text;
        return node;
    }

    // @api
    function updateJSDocText(node: JSDocText, text: string): JSDocText {
        return node.text !== text
            ? update(createJSDocText(text), node)
            : node;
    }

    // @api
    function createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined) {
        const node = createBaseNode<JSDoc>(SyntaxKind.JSDoc);
        node.comment = comment;
        node.tags = asNodeArray(tags);
        return node;
    }

    // @api
    function updateJSDocComment(node: JSDoc, comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined) {
        return node.comment !== comment
                || node.tags !== tags
            ? update(createJSDocComment(comment, tags), node)
            : node;
    }

    //
    // JSX
    //

    // @api
    function createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
        const node = createBaseNode<JsxElement>(SyntaxKind.JsxElement);
        node.openingElement = openingElement;
        node.children = createNodeArray(children);
        node.closingElement = closingElement;
        node.transformFlags |= propagateChildFlags(node.openingElement) |
            propagateChildrenFlags(node.children) |
            propagateChildFlags(node.closingElement) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) {
        return node.openingElement !== openingElement
                || node.children !== children
                || node.closingElement !== closingElement
            ? update(createJsxElement(openingElement, children, closingElement), node)
            : node;
    }

    // @api
    function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
        const node = createBaseNode<JsxSelfClosingElement>(SyntaxKind.JsxSelfClosingElement);
        node.tagName = tagName;
        node.typeArguments = asNodeArray(typeArguments);
        node.attributes = attributes;
        node.transformFlags |= propagateChildFlags(node.tagName) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.attributes) |
            TransformFlags.ContainsJsx;
        if (node.typeArguments) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
        return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
            ? update(createJsxSelfClosingElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
        const node = createBaseNode<JsxOpeningElement>(SyntaxKind.JsxOpeningElement);
        node.tagName = tagName;
        node.typeArguments = asNodeArray(typeArguments);
        node.attributes = attributes;
        node.transformFlags |= propagateChildFlags(node.tagName) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildFlags(node.attributes) |
            TransformFlags.ContainsJsx;
        if (typeArguments) {
            node.transformFlags |= TransformFlags.ContainsTypeScript;
        }
        return node;
    }

    // @api
    function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) {
        return node.tagName !== tagName
                || node.typeArguments !== typeArguments
                || node.attributes !== attributes
            ? update(createJsxOpeningElement(tagName, typeArguments, attributes), node)
            : node;
    }

    // @api
    function createJsxClosingElement(tagName: JsxTagNameExpression) {
        const node = createBaseNode<JsxClosingElement>(SyntaxKind.JsxClosingElement);
        node.tagName = tagName;
        node.transformFlags |= propagateChildFlags(node.tagName) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression) {
        return node.tagName !== tagName
            ? update(createJsxClosingElement(tagName), node)
            : node;
    }

    // @api
    function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
        const node = createBaseNode<JsxFragment>(SyntaxKind.JsxFragment);
        node.openingFragment = openingFragment;
        node.children = createNodeArray(children);
        node.closingFragment = closingFragment;
        node.transformFlags |= propagateChildFlags(node.openingFragment) |
            propagateChildrenFlags(node.children) |
            propagateChildFlags(node.closingFragment) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) {
        return node.openingFragment !== openingFragment
                || node.children !== children
                || node.closingFragment !== closingFragment
            ? update(createJsxFragment(openingFragment, children, closingFragment), node)
            : node;
    }

    // @api
    function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        const node = createBaseNode<JsxText>(SyntaxKind.JsxText);
        node.text = text;
        node.containsOnlyTriviaWhiteSpaces = !!containsOnlyTriviaWhiteSpaces;
        node.transformFlags |= TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean) {
        return node.text !== text
                || node.containsOnlyTriviaWhiteSpaces !== containsOnlyTriviaWhiteSpaces
            ? update(createJsxText(text, containsOnlyTriviaWhiteSpaces), node)
            : node;
    }

    // @api
    function createJsxOpeningFragment() {
        const node = createBaseNode<JsxOpeningFragment>(SyntaxKind.JsxOpeningFragment);
        node.transformFlags |= TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function createJsxJsxClosingFragment() {
        const node = createBaseNode<JsxClosingFragment>(SyntaxKind.JsxClosingFragment);
        node.transformFlags |= TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function createJsxAttribute(name: JsxAttributeName, initializer: JsxAttributeValue | undefined) {
        const node = createBaseDeclaration<JsxAttribute>(SyntaxKind.JsxAttribute);
        node.name = name;
        node.initializer = initializer;
        node.transformFlags |= propagateChildFlags(node.name) |
            propagateChildFlags(node.initializer) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxAttribute(node: JsxAttribute, name: JsxAttributeName, initializer: JsxAttributeValue | undefined) {
        return node.name !== name
                || node.initializer !== initializer
            ? update(createJsxAttribute(name, initializer), node)
            : node;
    }

    // @api
    function createJsxAttributes(properties: readonly JsxAttributeLike[]) {
        const node = createBaseDeclaration<JsxAttributes>(SyntaxKind.JsxAttributes);
        node.properties = createNodeArray(properties);
        node.transformFlags |= propagateChildrenFlags(node.properties) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]) {
        return node.properties !== properties
            ? update(createJsxAttributes(properties), node)
            : node;
    }

    // @api
    function createJsxSpreadAttribute(expression: Expression) {
        const node = createBaseNode<JsxSpreadAttribute>(SyntaxKind.JsxSpreadAttribute);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression) {
        return node.expression !== expression
            ? update(createJsxSpreadAttribute(expression), node)
            : node;
    }

    // @api
    function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) {
        const node = createBaseNode<JsxExpression>(SyntaxKind.JsxExpression);
        node.dotDotDotToken = dotDotDotToken;
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.dotDotDotToken) |
            propagateChildFlags(node.expression) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxExpression(node: JsxExpression, expression: Expression | undefined) {
        return node.expression !== expression
            ? update(createJsxExpression(node.dotDotDotToken, expression), node)
            : node;
    }

    // @api
    function createJsxNamespacedName(namespace: Identifier, name: Identifier) {
        const node = createBaseNode<JsxNamespacedName>(SyntaxKind.JsxNamespacedName);
        node.namespace = namespace;
        node.name = name;
        node.transformFlags |= propagateChildFlags(node.namespace) |
            propagateChildFlags(node.name) |
            TransformFlags.ContainsJsx;
        return node;
    }

    // @api
    function updateJsxNamespacedName(node: JsxNamespacedName, namespace: Identifier, name: Identifier) {
        return node.namespace !== namespace
                || node.name !== name
            ? update(createJsxNamespacedName(namespace, name), node)
            : node;
    }

    //
    // Clauses
    //

    // @api
    function createCaseClause(expression: Expression, statements: readonly Statement[]) {
        const node = createBaseNode<CaseClause>(SyntaxKind.CaseClause);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statements = createNodeArray(statements);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]) {
        return node.expression !== expression
                || node.statements !== statements
            ? update(createCaseClause(expression, statements), node)
            : node;
    }

    // @api
    function createDefaultClause(statements: readonly Statement[]) {
        const node = createBaseNode<DefaultClause>(SyntaxKind.DefaultClause);
        node.statements = createNodeArray(statements);
        node.transformFlags = propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]) {
        return node.statements !== statements
            ? update(createDefaultClause(statements), node)
            : node;
    }

    // @api
    function createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]) {
        const node = createBaseNode<HeritageClause>(SyntaxKind.HeritageClause);
        node.token = token;
        node.types = createNodeArray(types);
        node.transformFlags |= propagateChildrenFlags(node.types);
        switch (token) {
            case SyntaxKind.ExtendsKeyword:
                node.transformFlags |= TransformFlags.ContainsES2015;
                break;
            case SyntaxKind.ImplementsKeyword:
                node.transformFlags |= TransformFlags.ContainsTypeScript;
                break;
            default:
                return Debug.assertNever(token);
        }
        return node;
    }

    // @api
    function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) {
        return node.types !== types
            ? update(createHeritageClause(node.token, types), node)
            : node;
    }

    // @api
    function createCatchClause(variableDeclaration: string | BindingName | VariableDeclaration | undefined, block: Block) {
        const node = createBaseNode<CatchClause>(SyntaxKind.CatchClause);
        node.variableDeclaration = asVariableDeclaration(variableDeclaration);
        node.block = block;

        node.transformFlags |= propagateChildFlags(node.variableDeclaration) |
            propagateChildFlags(node.block) |
            (!variableDeclaration ? TransformFlags.ContainsES2019 : TransformFlags.None);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) {
        return node.variableDeclaration !== variableDeclaration
                || node.block !== block
            ? update(createCatchClause(variableDeclaration, block), node)
            : node;
    }

    //
    // Property assignments
    //

    // @api
    function createPropertyAssignment(name: string | PropertyName, initializer: Expression) {
        const node = createBaseDeclaration<PropertyAssignment>(SyntaxKind.PropertyAssignment);
        node.name = asName(name);
        node.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        node.transformFlags |= propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer);

        node.modifiers = undefined; // initialized by parser to report grammar errors
        node.questionToken = undefined; // initialized by parser to report grammar errors
        node.exclamationToken = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression) {
        return node.name !== name
                || node.initializer !== initializer
            ? finishUpdatePropertyAssignment(createPropertyAssignment(name, initializer), node)
            : node;
    }

    function finishUpdatePropertyAssignment(updated: Mutable<PropertyAssignment>, original: PropertyAssignment) {
        // copy children used only for error reporting
        if (updated !== original) {
            // copy children used only for error reporting
            updated.modifiers = original.modifiers;
            updated.questionToken = original.questionToken;
            updated.exclamationToken = original.exclamationToken;
        }
        return update(updated, original);
    }

    // @api
    function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression) {
        const node = createBaseDeclaration<ShorthandPropertyAssignment>(SyntaxKind.ShorthandPropertyAssignment);
        node.name = asName(name);
        node.objectAssignmentInitializer = objectAssignmentInitializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(objectAssignmentInitializer);
        node.transformFlags |= propagateIdentifierNameFlags(node.name) |
            propagateChildFlags(node.objectAssignmentInitializer) |
            TransformFlags.ContainsES2015;

        node.equalsToken = undefined; // initialized by parser to report grammar errors
        node.modifiers = undefined; // initialized by parser to report grammar errors
        node.questionToken = undefined; // initialized by parser to report grammar errors
        node.exclamationToken = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) {
        return node.name !== name
                || node.objectAssignmentInitializer !== objectAssignmentInitializer
            ? finishUpdateShorthandPropertyAssignment(createShorthandPropertyAssignment(name, objectAssignmentInitializer), node)
            : node;
    }

    function finishUpdateShorthandPropertyAssignment(updated: Mutable<ShorthandPropertyAssignment>, original: ShorthandPropertyAssignment) {
        if (updated !== original) {
            // copy children used only for error reporting
            updated.modifiers = original.modifiers;
            updated.questionToken = original.questionToken;
            updated.exclamationToken = original.exclamationToken;
            updated.equalsToken = original.equalsToken;
        }
        return update(updated, original);
    }

    // @api
    function createSpreadAssignment(expression: Expression) {
        const node = createBaseDeclaration<SpreadAssignment>(SyntaxKind.SpreadAssignment);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsES2018 |
            TransformFlags.ContainsObjectRestOrSpread;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateSpreadAssignment(node: SpreadAssignment, expression: Expression) {
        return node.expression !== expression
            ? update(createSpreadAssignment(expression), node)
            : node;
    }

    //
    // Enum
    //

    // @api
    function createEnumMember(name: string | PropertyName, initializer?: Expression) {
        const node = createBaseDeclaration<EnumMember>(SyntaxKind.EnumMember);
        node.name = asName(name);
        node.initializer = initializer && parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        node.transformFlags |= propagateChildFlags(node.name) |
            propagateChildFlags(node.initializer) |
            TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined) {
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
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken,
        flags: NodeFlags,
    ) {
        const node = baseFactory.createBaseSourceFileNode(SyntaxKind.SourceFile) as Mutable<SourceFile>;
        node.statements = createNodeArray(statements);
        node.endOfFileToken = endOfFileToken;
        node.flags |= flags;
        node.text = "";
        node.fileName = "";
        node.path = "" as Path;
        node.resolvedPath = "" as Path;
        node.originalFileName = "";
        node.languageVersion = ScriptTarget.ES5;
        node.languageVariant = 0;
        node.scriptKind = 0;
        node.isDeclarationFile = false;
        node.hasNoDefaultLib = false;

        node.transformFlags |= propagateChildrenFlags(node.statements) |
            propagateChildFlags(node.endOfFileToken);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;

        node.nodeCount = 0;
        node.identifierCount = 0;
        node.symbolCount = 0;
        node.parseDiagnostics = undefined!;
        node.bindDiagnostics = undefined!;
        node.bindSuggestionDiagnostics = undefined;
        node.lineMap = undefined!;
        node.externalModuleIndicator = undefined;
        node.setExternalModuleIndicator = undefined;
        node.pragmas = undefined!;
        node.checkJsDirective = undefined;
        node.referencedFiles = undefined!;
        node.typeReferenceDirectives = undefined!;
        node.libReferenceDirectives = undefined!;
        node.amdDependencies = undefined!;
        node.commentDirectives = undefined;
        node.identifiers = undefined!;
        node.packageJsonLocations = undefined;
        node.packageJsonScope = undefined;
        node.imports = undefined!;
        node.moduleAugmentations = undefined!;
        node.ambientModuleNames = undefined!;
        node.classifiableNames = undefined;
        node.impliedNodeFormat = undefined;
        return node;
    }

    function createRedirectedSourceFile(redirectInfo: RedirectInfo) {
        const node: SourceFile = Object.create(redirectInfo.redirectTarget);
        Object.defineProperties(node, {
            id: {
                get(this: SourceFile) {
                    return this.redirectInfo!.redirectTarget.id;
                },
                set(this: SourceFile, value: SourceFile["id"]) {
                    this.redirectInfo!.redirectTarget.id = value;
                },
            },
            symbol: {
                get(this: SourceFile) {
                    return this.redirectInfo!.redirectTarget.symbol;
                },
                set(this: SourceFile, value: SourceFile["symbol"]) {
                    this.redirectInfo!.redirectTarget.symbol = value;
                },
            },
        });
        node.redirectInfo = redirectInfo;
        return node;
    }

    function cloneRedirectedSourceFile(source: SourceFile) {
        const node = createRedirectedSourceFile(source.redirectInfo!) as Mutable<SourceFile>;
        node.flags |= source.flags & ~NodeFlags.Synthesized;
        node.fileName = source.fileName;
        node.path = source.path;
        node.resolvedPath = source.resolvedPath;
        node.originalFileName = source.originalFileName;
        node.packageJsonLocations = source.packageJsonLocations;
        node.packageJsonScope = source.packageJsonScope;
        node.emitNode = undefined;
        return node;
    }

    function cloneSourceFileWorker(source: SourceFile) {
        // TODO: This mechanism for cloning results in megamorphic property reads and writes. In future perf-related
        //       work, we should consider switching explicit property assignments instead of using `for..in`.
        const node = baseFactory.createBaseSourceFileNode(SyntaxKind.SourceFile) as Mutable<SourceFile>;
        node.flags |= source.flags & ~NodeFlags.Synthesized;
        for (const p in source) {
            if (hasProperty(node, p) || !hasProperty(source, p)) {
                continue;
            }
            if (p === "emitNode") {
                node.emitNode = undefined;
                continue;
            }
            (node as any)[p] = (source as any)[p];
        }
        return node;
    }

    function cloneSourceFile(source: SourceFile) {
        const node = source.redirectInfo ? cloneRedirectedSourceFile(source) : cloneSourceFileWorker(source);
        setOriginal(node, source);
        return node;
    }

    function cloneSourceFileWithChanges(
        source: SourceFile,
        statements: readonly Statement[],
        isDeclarationFile: boolean,
        referencedFiles: readonly FileReference[],
        typeReferences: readonly FileReference[],
        hasNoDefaultLib: boolean,
        libReferences: readonly FileReference[],
    ) {
        const node = cloneSourceFile(source);
        node.statements = createNodeArray(statements);
        node.isDeclarationFile = isDeclarationFile;
        node.referencedFiles = referencedFiles;
        node.typeReferenceDirectives = typeReferences;
        node.hasNoDefaultLib = hasNoDefaultLib;
        node.libReferenceDirectives = libReferences;
        node.transformFlags = propagateChildrenFlags(node.statements) |
            propagateChildFlags(node.endOfFileToken);
        return node;
    }

    // @api
    function updateSourceFile(
        node: SourceFile,
        statements: readonly Statement[],
        isDeclarationFile = node.isDeclarationFile,
        referencedFiles = node.referencedFiles,
        typeReferenceDirectives = node.typeReferenceDirectives,
        hasNoDefaultLib = node.hasNoDefaultLib,
        libReferenceDirectives = node.libReferenceDirectives,
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
    function createBundle(sourceFiles: readonly SourceFile[]) {
        const node = createBaseNode<Bundle>(SyntaxKind.Bundle);
        node.sourceFiles = sourceFiles;
        node.syntheticFileReferences = undefined;
        node.syntheticTypeReferences = undefined;
        node.syntheticLibReferences = undefined;
        node.hasNoDefaultLib = undefined;
        return node;
    }

    // @api
    function updateBundle(node: Bundle, sourceFiles: readonly SourceFile[]) {
        return node.sourceFiles !== sourceFiles
            ? update(createBundle(sourceFiles), node)
            : node;
    }

    //
    // Synthetic Nodes (used by checker)
    //

    // @api
    function createSyntheticExpression(type: Type, isSpread = false, tupleNameSource?: ParameterDeclaration | NamedTupleMember) {
        const node = createBaseNode<SyntheticExpression>(SyntaxKind.SyntheticExpression);
        node.type = type;
        node.isSpread = isSpread;
        node.tupleNameSource = tupleNameSource;
        return node;
    }

    // @api
    function createSyntaxList(children: readonly Node[]) {
        const node = createBaseNode<SyntaxList>(SyntaxKind.SyntaxList);
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
    function createNotEmittedStatement(original: Node) {
        const node = createBaseNode<NotEmittedStatement>(SyntaxKind.NotEmittedStatement);
        node.original = original;
        setTextRange(node, original);
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
    function createPartiallyEmittedExpression(expression: Expression, original?: Node) {
        const node = createBaseNode<PartiallyEmittedExpression>(SyntaxKind.PartiallyEmittedExpression);
        node.expression = expression;
        node.original = original;
        node.transformFlags |= propagateChildFlags(node.expression) |
            TransformFlags.ContainsTypeScript;
        setTextRange(node, original);
        return node;
    }

    // @api
    function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression) {
        return node.expression !== expression
            ? update(createPartiallyEmittedExpression(expression, node.original), node)
            : node;
    }

    // @api
    function createNotEmittedTypeElement() {
        return createBaseNode<NotEmittedTypeElement>(SyntaxKind.NotEmittedTypeElement);
    }

    function flattenCommaElements(node: Expression): Expression | readonly Expression[] {
        if (nodeIsSynthesized(node) && !isParseTreeNode(node) && !node.original && !node.emitNode && !node.id) {
            if (isCommaListExpression(node)) {
                return node.elements;
            }
            if (isBinaryExpression(node) && isCommaToken(node.operatorToken)) {
                return [node.left, node.right];
            }
        }
        return node;
    }

    // @api
    function createCommaListExpression(elements: readonly Expression[]) {
        const node = createBaseNode<CommaListExpression>(SyntaxKind.CommaListExpression);
        node.elements = createNodeArray(sameFlatMap(elements, flattenCommaElements));
        node.transformFlags |= propagateChildrenFlags(node.elements);
        return node;
    }

    // @api
    function updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]) {
        return node.elements !== elements
            ? update(createCommaListExpression(elements), node)
            : node;
    }

    // @api
    function createSyntheticReferenceExpression(expression: Expression, thisArg: Expression) {
        const node = createBaseNode<SyntheticReferenceExpression>(SyntaxKind.SyntheticReferenceExpression);
        node.expression = expression;
        node.thisArg = thisArg;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.thisArg);
        return node;
    }

    // @api
    function updateSyntheticReferenceExpression(node: SyntheticReferenceExpression, expression: Expression, thisArg: Expression) {
        return node.expression !== expression
                || node.thisArg !== thisArg
            ? update(createSyntheticReferenceExpression(expression, thisArg), node)
            : node;
    }

    function cloneGeneratedIdentifier(node: GeneratedIdentifier): GeneratedIdentifier {
        const clone = createBaseIdentifier(node.escapedText) as Mutable<GeneratedIdentifier>;
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);
        setIdentifierAutoGenerate(clone, { ...node.emitNode.autoGenerate });
        return clone;
    }

    function cloneIdentifier(node: Identifier): Identifier {
        const clone = createBaseIdentifier(node.escapedText);
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.jsDoc = node.jsDoc;
        clone.flowNode = node.flowNode;
        clone.symbol = node.symbol;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);

        // clone type arguments for emitter/typeWriter
        const typeArguments = getIdentifierTypeArguments(node);
        if (typeArguments) setIdentifierTypeArguments(clone, typeArguments);
        return clone;
    }

    function cloneGeneratedPrivateIdentifier(node: GeneratedPrivateIdentifier): GeneratedPrivateIdentifier {
        const clone = createBasePrivateIdentifier(node.escapedText) as Mutable<GeneratedPrivateIdentifier>;
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);
        setIdentifierAutoGenerate(clone, { ...node.emitNode.autoGenerate });
        return clone;
    }

    function clonePrivateIdentifier(node: PrivateIdentifier): PrivateIdentifier {
        const clone = createBasePrivateIdentifier(node.escapedText);
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);
        return clone;
    }

    // @api
    function cloneNode<T extends Node | undefined>(node: T): T;
    function cloneNode<T extends Node>(node: T) {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        if (node === undefined) {
            return node;
        }
        if (isSourceFile(node)) {
            return cloneSourceFile(node) as T & SourceFile;
        }
        if (isGeneratedIdentifier(node)) {
            return cloneGeneratedIdentifier(node) as T & GeneratedIdentifier;
        }
        if (isIdentifier(node)) {
            return cloneIdentifier(node) as T & Identifier;
        }
        if (isGeneratedPrivateIdentifier(node)) {
            return cloneGeneratedPrivateIdentifier(node) as T & GeneratedPrivateIdentifier;
        }
        if (isPrivateIdentifier(node)) {
            return clonePrivateIdentifier(node) as T & PrivateIdentifier;
        }

        const clone = !isNodeKind(node.kind) ? baseFactory.createBaseTokenNode(node.kind) as T :
            baseFactory.createBaseNode(node.kind) as T;

        (clone as Mutable<T>).flags |= node.flags & ~NodeFlags.Synthesized;
        (clone as Mutable<T>).transformFlags = node.transformFlags;
        setOriginal(clone, node);

        for (const key in node) {
            if (hasProperty(clone, key) || !hasProperty(node, key)) {
                continue;
            }

            clone[key] = node[key];
        }

        return clone;
    }

    // compound nodes
    function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): ImmediatelyInvokedFunctionExpression;
    function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): ImmediatelyInvokedFunctionExpression;
    function createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
        return createCallExpression(
            createFunctionExpression(
                /*modifiers*/ undefined,
                /*asteriskToken*/ undefined,
                /*name*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ param ? [param] : [],
                /*type*/ undefined,
                createBlock(statements, /*multiLine*/ true),
            ),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ paramValue ? [paramValue] : [],
        );
    }

    function createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): ImmediatelyInvokedArrowFunction;
    function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): ImmediatelyInvokedArrowFunction;
    function createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param?: ParameterDeclaration, paramValue?: Expression) {
        return createCallExpression(
            createArrowFunction(
                /*modifiers*/ undefined,
                /*typeParameters*/ undefined,
                /*parameters*/ param ? [param] : [],
                /*type*/ undefined,
                /*equalsGreaterThanToken*/ undefined,
                createBlock(statements, /*multiLine*/ true),
            ),
            /*typeArguments*/ undefined,
            /*argumentsArray*/ paramValue ? [paramValue] : [],
        );
    }

    function createVoidZero() {
        return createVoidExpression(createNumericLiteral("0"));
    }

    function createExportDefault(expression: Expression) {
        return createExportAssignment(
            /*modifiers*/ undefined,
            /*isExportEquals*/ false,
            expression,
        );
    }

    function createExternalModuleExport(exportName: Identifier) {
        return createExportDeclaration(
            /*modifiers*/ undefined,
            /*isTypeOnly*/ false,
            createNamedExports([
                createExportSpecifier(/*isTypeOnly*/ false, /*propertyName*/ undefined, exportName),
            ]),
        );
    }

    //
    // Utilities
    //

    function createTypeCheck(value: Expression, tag: TypeOfTag) {
        return tag === "null" ? factory.createStrictEquality(value, createNull()) :
            tag === "undefined" ? factory.createStrictEquality(value, createVoidZero()) :
            factory.createStrictEquality(createTypeOfExpression(value), createStringLiteral(tag));
    }

    function createIsNotTypeCheck(value: Expression, tag: TypeOfTag) {
        return tag === "null" ? factory.createStrictInequality(value, createNull()) :
            tag === "undefined" ? factory.createStrictInequality(value, createVoidZero()) :
            factory.createStrictInequality(createTypeOfExpression(value), createStringLiteral(tag));
    }

    function createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]) {
        // Preserve the optionality of `object`.
        if (isCallChain(object)) {
            return createCallChain(
                createPropertyAccessChain(object, /*questionDotToken*/ undefined, methodName),
                /*questionDotToken*/ undefined,
                /*typeArguments*/ undefined,
                argumentsList,
            );
        }
        return createCallExpression(
            createPropertyAccessExpression(object, methodName),
            /*typeArguments*/ undefined,
            argumentsList,
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

    function createArraySliceCall(array: Expression, start?: number | Expression) {
        return createMethodCall(array, "slice", start === undefined ? [] : [asExpression(start)]);
    }

    function createArrayConcatCall(array: Expression, argumentsList: readonly Expression[]) {
        return createMethodCall(array, "concat", argumentsList);
    }

    function createObjectDefinePropertyCall(target: Expression, propertyName: string | Expression, attributes: Expression) {
        return createGlobalMethodCall("Object", "defineProperty", [target, asExpression(propertyName), attributes]);
    }

    function createObjectGetOwnPropertyDescriptorCall(target: Expression, propertyName: string | Expression) {
        return createGlobalMethodCall("Object", "getOwnPropertyDescriptor", [target, asExpression(propertyName)]);
    }

    function createReflectGetCall(target: Expression, propertyKey: Expression, receiver?: Expression): CallExpression {
        return createGlobalMethodCall("Reflect", "get", receiver ? [target, propertyKey, receiver] : [target, propertyKey]);
    }

    function createReflectSetCall(target: Expression, propertyKey: Expression, value: Expression, receiver?: Expression): CallExpression {
        return createGlobalMethodCall("Reflect", "set", receiver ? [target, propertyKey, value, receiver] : [target, propertyKey, value]);
    }

    function tryAddPropertyAssignment(properties: PropertyAssignment[], propertyName: string, expression: Expression | undefined) {
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
            case SyntaxKind.ParenthesizedExpression:
                return updateParenthesizedExpression(outerExpression, expression);
            case SyntaxKind.TypeAssertionExpression:
                return updateTypeAssertion(outerExpression, outerExpression.type, expression);
            case SyntaxKind.AsExpression:
                return updateAsExpression(outerExpression, expression, outerExpression.type);
            case SyntaxKind.SatisfiesExpression:
                return updateSatisfiesExpression(outerExpression, expression, outerExpression.type);
            case SyntaxKind.NonNullExpression:
                return updateNonNullExpression(outerExpression, expression);
            case SyntaxKind.ExpressionWithTypeArguments:
                return updateExpressionWithTypeArguments(outerExpression, expression, outerExpression.typeArguments);
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
    function isIgnorableParen(node: Expression) {
        return isParenthesizedExpression(node)
            && nodeIsSynthesized(node)
            && nodeIsSynthesized(getSourceMapRange(node))
            && nodeIsSynthesized(getCommentRange(node))
            && !some(getSyntheticLeadingComments(node))
            && !some(getSyntheticTrailingComments(node));
    }

    function restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds = OuterExpressionKinds.All): Expression {
        if (outerExpression && isOuterExpression(outerExpression, kinds) && !isIgnorableParen(outerExpression)) {
            return updateOuterExpression(
                outerExpression,
                restoreOuterExpressions(outerExpression.expression, innerExpression),
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
            isLabeledStatement(outermostLabeledStatement.statement)
                ? restoreEnclosingLabel(node, outermostLabeledStatement.statement)
                : node,
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
                const elements = (target as ArrayLiteralExpression).elements;
                if (elements.length === 0) {
                    return false;
                }
                return true;
            case SyntaxKind.ObjectLiteralExpression:
                return (target as ObjectLiteralExpression).properties.length > 0;
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
        else if (isSuperKeyword(callee)) {
            thisArg = createThis();
            target = languageVersion !== undefined && languageVersion < ScriptTarget.ES2015
                ? setTextRange(createIdentifier("_super"), callee)
                : callee as PrimaryExpression;
        }
        else if (getEmitFlags(callee) & EmitFlags.HelperName) {
            thisArg = createVoidZero();
            target = parenthesizerRules().parenthesizeLeftSideOfAccess(callee, /*optionalChain*/ false);
        }
        else if (isPropertyAccessExpression(callee)) {
            if (shouldBeCapturedInTempVariable(callee.expression, cacheIdentifiers)) {
                // for `a.b()` target is `(_a = a).b` and thisArg is `_a`
                thisArg = createTempVariable(recordTempVariable);
                target = createPropertyAccessExpression(
                    setTextRange(
                        factory.createAssignment(
                            thisArg,
                            callee.expression,
                        ),
                        callee.expression,
                    ),
                    callee.name,
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
                        factory.createAssignment(
                            thisArg,
                            callee.expression,
                        ),
                        callee.expression,
                    ),
                    callee.argumentExpression,
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
            target = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        }

        return { target, thisArg };
    }

    function createAssignmentTargetWrapper(paramName: Identifier, expression: Expression): PropertyAccessExpression {
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
                            /*initializer*/ undefined,
                        )],
                        createBlock([
                            createExpressionStatement(expression),
                        ]),
                    ),
                ]),
            ),
            "value",
        );
    }

    function inlineExpressions(expressions: readonly Expression[]) {
        // Avoid deeply nested comma expressions as traversing them during emit can result in "Maximum call
        // stack size exceeded" errors.
        return expressions.length > 10
            ? createCommaListExpression(expressions)
            : reduceLeft(expressions, factory.createComma)!;
    }

    function getName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags: EmitFlags = 0, ignoreAssignedName?: boolean) {
        const nodeName = ignoreAssignedName ? node && getNonAssignedNameOfDeclaration(node) : getNameOfDeclaration(node);
        if (nodeName && isIdentifier(nodeName) && !isGeneratedIdentifier(nodeName)) {
            // TODO(rbuckton): Does this need to be parented?
            const name = setParent(setTextRange(cloneNode(nodeName), nodeName), nodeName.parent);
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
     * @param ignoreAssignedName Indicates that the assigned name of a declaration shouldn't be considered.
     */
    function getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean, ignoreAssignedName?: boolean) {
        return getName(node, allowComments, allowSourceMaps, EmitFlags.LocalName, ignoreAssignedName);
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
    function getDeclarationName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean) {
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
        const qualifiedName = createPropertyAccessExpression(ns, nodeIsSynthesized(name) ? name : cloneNode(name));
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
        if (ns && hasSyntacticModifier(node, ModifierFlags.Export)) {
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
    function copyPrologue(source: readonly Statement[], target: Statement[], ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number {
        const offset = copyStandardPrologue(source, target, 0, ensureUseStrict);
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
     * @param statementOffset The offset at which to begin the copy.
     * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
     * @returns Count of how many directive statements were copied.
     */
    function copyStandardPrologue(source: readonly Statement[], target: Statement[], statementOffset = 0, ensureUseStrict?: boolean): number {
        Debug.assert(target.length === 0, "Prologue directives should be at the first statement in the target statements array");
        let foundUseStrict = false;
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
    function copyCustomPrologue(source: readonly Statement[], target: Statement[], statementOffset: number, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Statement) => boolean): number;
    function copyCustomPrologue(source: readonly Statement[], target: Statement[], statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Statement) => boolean): number | undefined;
    function copyCustomPrologue(source: readonly Statement[], target: Statement[], statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>, filter: (node: Statement) => boolean = returnTrue): number | undefined {
        const numStatements = source.length;
        while (statementOffset !== undefined && statementOffset < numStatements) {
            const statement = source[statementOffset];
            if (getEmitFlags(statement) & EmitFlags.CustomPrologue && filter(statement)) {
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
        return singleOrUndefined(nodes) as Statement || createBlock(nodes as readonly Statement[]);
    }

    function findSpanEnd<T>(array: readonly T[], test: (value: T) => boolean, start: number) {
        let i = start;
        while (i < array.length && test(array[i])) {
            i++;
        }
        return i;
    }

    function mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: readonly Statement[] | undefined): NodeArray<Statement>;
    function mergeLexicalEnvironment(statements: Statement[], declarations: readonly Statement[] | undefined): Statement[];
    function mergeLexicalEnvironment(statements: Statement[] | NodeArray<Statement>, declarations: readonly Statement[] | undefined) {
        if (!some(declarations)) {
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
        const leftStandardPrologueEnd = findSpanEnd(statements, isPrologueDirective, 0);
        const leftHoistedFunctionsEnd = findSpanEnd(statements, isHoistedFunction, leftStandardPrologueEnd);
        const leftHoistedVariablesEnd = findSpanEnd(statements, isHoistedVariableStatement, leftHoistedFunctionsEnd);

        // find standard prologues on right in the following order: standard directives, hoisted functions, hoisted variables, other custom
        const rightStandardPrologueEnd = findSpanEnd(declarations, isPrologueDirective, 0);
        const rightHoistedFunctionsEnd = findSpanEnd(declarations, isHoistedFunction, rightStandardPrologueEnd);
        const rightHoistedVariablesEnd = findSpanEnd(declarations, isHoistedVariableStatement, rightHoistedFunctionsEnd);
        const rightCustomPrologueEnd = findSpanEnd(declarations, isCustomPrologue, rightHoistedVariablesEnd);
        Debug.assert(rightCustomPrologueEnd === declarations.length, "Expected declarations to be valid standard or custom prologues");

        // splice prologues from the right into the left. We do this in reverse order
        // so that we don't need to recompute the index on the left when we insert items.
        const left = isNodeArray(statements) ? statements.slice() : statements;

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
                const leftPrologues = new Map<string, boolean>();
                for (let i = 0; i < leftStandardPrologueEnd; i++) {
                    const leftPrologue = statements[i] as PrologueDirective;
                    leftPrologues.set(leftPrologue.expression.text, true);
                }
                for (let i = rightStandardPrologueEnd - 1; i >= 0; i--) {
                    const rightPrologue = declarations[i] as PrologueDirective;
                    if (!leftPrologues.has(rightPrologue.expression.text)) {
                        left.unshift(rightPrologue);
                    }
                }
            }
        }

        if (isNodeArray(statements)) {
            return setTextRange(createNodeArray(left, statements.hasTrailingComma), statements);
        }

        return statements;
    }

    function replaceModifiers<T extends HasModifiers>(node: T, modifiers: readonly Modifier[] | ModifierFlags): T;
    function replaceModifiers(node: HasModifiers, modifiers: readonly Modifier[] | ModifierFlags) {
        let modifierArray;
        if (typeof modifiers === "number") {
            modifierArray = createModifiersFromModifierFlags(modifiers);
        }
        else {
            modifierArray = modifiers;
        }
        return isTypeParameterDeclaration(node) ? updateTypeParameterDeclaration(node, modifierArray, node.name, node.constraint, node.default) :
            isParameter(node) ? updateParameterDeclaration(node, modifierArray, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) :
            isConstructorTypeNode(node) ? updateConstructorTypeNode1(node, modifierArray, node.typeParameters, node.parameters, node.type) :
            isPropertySignature(node) ? updatePropertySignature(node, modifierArray, node.name, node.questionToken, node.type) :
            isPropertyDeclaration(node) ? updatePropertyDeclaration(node, modifierArray, node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer) :
            isMethodSignature(node) ? updateMethodSignature(node, modifierArray, node.name, node.questionToken, node.typeParameters, node.parameters, node.type) :
            isMethodDeclaration(node) ? updateMethodDeclaration(node, modifierArray, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) :
            isConstructorDeclaration(node) ? updateConstructorDeclaration(node, modifierArray, node.parameters, node.body) :
            isGetAccessorDeclaration(node) ? updateGetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.type, node.body) :
            isSetAccessorDeclaration(node) ? updateSetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.body) :
            isIndexSignatureDeclaration(node) ? updateIndexSignature(node, modifierArray, node.parameters, node.type) :
            isFunctionExpression(node) ? updateFunctionExpression(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) :
            isArrowFunction(node) ? updateArrowFunction(node, modifierArray, node.typeParameters, node.parameters, node.type, node.equalsGreaterThanToken, node.body) :
            isClassExpression(node) ? updateClassExpression(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            isVariableStatement(node) ? updateVariableStatement(node, modifierArray, node.declarationList) :
            isFunctionDeclaration(node) ? updateFunctionDeclaration(node, modifierArray, node.asteriskToken, node.name, node.typeParameters, node.parameters, node.type, node.body) :
            isClassDeclaration(node) ? updateClassDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            isInterfaceDeclaration(node) ? updateInterfaceDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            isTypeAliasDeclaration(node) ? updateTypeAliasDeclaration(node, modifierArray, node.name, node.typeParameters, node.type) :
            isEnumDeclaration(node) ? updateEnumDeclaration(node, modifierArray, node.name, node.members) :
            isModuleDeclaration(node) ? updateModuleDeclaration(node, modifierArray, node.name, node.body) :
            isImportEqualsDeclaration(node) ? updateImportEqualsDeclaration(node, modifierArray, node.isTypeOnly, node.name, node.moduleReference) :
            isImportDeclaration(node) ? updateImportDeclaration(node, modifierArray, node.importClause, node.moduleSpecifier, node.attributes) :
            isExportAssignment(node) ? updateExportAssignment(node, modifierArray, node.expression) :
            isExportDeclaration(node) ? updateExportDeclaration(node, modifierArray, node.isTypeOnly, node.exportClause, node.moduleSpecifier, node.attributes) :
            Debug.assertNever(node);
    }

    function replaceDecoratorsAndModifiers<T extends HasModifiers & HasDecorators>(node: T, modifiers: readonly ModifierLike[]): T;
    function replaceDecoratorsAndModifiers(node: HasModifiers & HasDecorators, modifierArray: readonly ModifierLike[]) {
        return isParameter(node) ? updateParameterDeclaration(node, modifierArray, node.dotDotDotToken, node.name, node.questionToken, node.type, node.initializer) :
            isPropertyDeclaration(node) ? updatePropertyDeclaration(node, modifierArray, node.name, node.questionToken ?? node.exclamationToken, node.type, node.initializer) :
            isMethodDeclaration(node) ? updateMethodDeclaration(node, modifierArray, node.asteriskToken, node.name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body) :
            isGetAccessorDeclaration(node) ? updateGetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.type, node.body) :
            isSetAccessorDeclaration(node) ? updateSetAccessorDeclaration(node, modifierArray, node.name, node.parameters, node.body) :
            isClassExpression(node) ? updateClassExpression(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            isClassDeclaration(node) ? updateClassDeclaration(node, modifierArray, node.name, node.typeParameters, node.heritageClauses, node.members) :
            Debug.assertNever(node);
    }

    function replacePropertyName<T extends AccessorDeclaration | MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature | PropertyAssignment>(node: T, name: T["name"]): T;
    function replacePropertyName(node: AccessorDeclaration | MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature | PropertyAssignment, name: PropertyName) {
        switch (node.kind) {
            case SyntaxKind.GetAccessor:
                return updateGetAccessorDeclaration(node, node.modifiers, name, node.parameters, node.type, node.body);
            case SyntaxKind.SetAccessor:
                return updateSetAccessorDeclaration(node, node.modifiers, name, node.parameters, node.body);
            case SyntaxKind.MethodDeclaration:
                return updateMethodDeclaration(node, node.modifiers, node.asteriskToken, name, node.questionToken, node.typeParameters, node.parameters, node.type, node.body);
            case SyntaxKind.MethodSignature:
                return updateMethodSignature(node, node.modifiers, name, node.questionToken, node.typeParameters, node.parameters, node.type);
            case SyntaxKind.PropertyDeclaration:
                return updatePropertyDeclaration(node, node.modifiers, name, node.questionToken ?? node.exclamationToken, node.type, node.initializer);
            case SyntaxKind.PropertySignature:
                return updatePropertySignature(node, node.modifiers, name, node.questionToken, node.type);
            case SyntaxKind.PropertyAssignment:
                return updatePropertyAssignment(node, name, node.initializer);
        }
    }

    function asNodeArray<T extends Node>(array: readonly T[]): NodeArray<T>;
    function asNodeArray<T extends Node>(array: readonly T[] | undefined): NodeArray<T> | undefined;
    function asNodeArray<T extends Node>(array: readonly T[] | undefined): NodeArray<T> | undefined {
        return array ? createNodeArray(array) : undefined;
    }

    function asName<T extends DeclarationName | Identifier | BindingName | PropertyName | NoSubstitutionTemplateLiteral | EntityName | ThisTypeNode | undefined>(name: string | T): T | Identifier {
        return typeof name === "string" ? createIdentifier(name) :
            name;
    }

    function asExpression<T extends Expression | undefined>(value: string | number | boolean | T): T | StringLiteral | NumericLiteral | BooleanLiteral {
        return typeof value === "string" ? createStringLiteral(value) :
            typeof value === "number" ? createNumericLiteral(value) :
            typeof value === "boolean" ? value ? createTrue() : createFalse() :
            value;
    }

    function asInitializer(node: Expression | undefined) {
        return node && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
    }

    function asToken<TKind extends SyntaxKind>(value: TKind | Token<TKind>): Token<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    function asEmbeddedStatement<T extends Node>(statement: T): T | EmptyStatement;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined {
        return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginal(createEmptyStatement(), statement), statement) : statement;
    }

    function asVariableDeclaration(variableDeclaration: string | BindingName | VariableDeclaration | undefined) {
        if (typeof variableDeclaration === "string" || variableDeclaration && !isVariableDeclaration(variableDeclaration)) {
            return createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
            );
        }
        return variableDeclaration;
    }

    function update<T extends Node>(updated: Mutable<T>, original: T): T {
        if (updated !== original) {
            setOriginal(updated, original);
            setTextRange(updated, original);
        }
        return updated;
    }
}

function getDefaultTagNameForKind(kind: JSDocTag["kind"]): string {
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

function getCookedText(kind: TemplateLiteralToken["kind"], rawText: string) {
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

function propagateNameFlags(node: PropertyName | BindingPattern | NoSubstitutionTemplateLiteral | undefined) {
    return node && isIdentifier(node) ? propagateIdentifierNameFlags(node) : propagateChildFlags(node);
}

function propagateIdentifierNameFlags(node: Identifier) {
    // An IdentifierName is allowed to be `await`
    return propagateChildFlags(node) & ~TransformFlags.ContainsPossibleTopLevelAwait;
}

function propagatePropertyNameFlagsOfChild(node: PropertyName, transformFlags: TransformFlags) {
    return transformFlags | (node.transformFlags & TransformFlags.PropertyNamePropagatingFlags);
}

function propagateChildFlags(child: Node | undefined): TransformFlags {
    if (!child) return TransformFlags.None;
    const childFlags = child.transformFlags & ~getTransformFlagsSubtreeExclusions(child.kind);
    return isNamedDeclaration(child) && isPropertyName(child.name) ? propagatePropertyNameFlagsOfChild(child.name, childFlags) : childFlags;
}

function propagateChildrenFlags(children: NodeArray<Node> | undefined): TransformFlags {
    return children ? children.transformFlags : TransformFlags.None;
}

function aggregateChildrenFlags(children: MutableNodeArray<Node>) {
    let subtreeFlags = TransformFlags.None;
    for (const child of children) {
        subtreeFlags |= propagateChildFlags(child);
    }
    children.transformFlags = subtreeFlags;
}

/**
 * Gets the transform flags to exclude when unioning the transform flags of a subtree.
 */
function getTransformFlagsSubtreeExclusions(kind: SyntaxKind) {
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
        case SyntaxKind.SatisfiesExpression:
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

const baseFactory = createBaseNodeFactory();

function makeSynthetic(node: Node) {
    (node as Mutable<Node>).flags |= NodeFlags.Synthesized;
    return node;
}

const syntheticFactory: BaseNodeFactory = {
    createBaseSourceFileNode: kind => makeSynthetic(baseFactory.createBaseSourceFileNode(kind)),
    createBaseIdentifierNode: kind => makeSynthetic(baseFactory.createBaseIdentifierNode(kind)),
    createBasePrivateIdentifierNode: kind => makeSynthetic(baseFactory.createBasePrivateIdentifierNode(kind)),
    createBaseTokenNode: kind => makeSynthetic(baseFactory.createBaseTokenNode(kind)),
    createBaseNode: kind => makeSynthetic(baseFactory.createBaseNode(kind)),
};

export const factory: NodeFactory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess, syntheticFactory);

let SourceMapSource: new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;

/**
 * Create an external source map source file reference
 */
export function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource {
    return new (SourceMapSource || (SourceMapSource = objectAllocator.getSourceMapSourceConstructor()))(fileName, text, skipTrivia);
}

// Utilities

export function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T {
    if (node.original !== original) {
        node.original = original;
        if (original) {
            const emitNode = original.emitNode;
            if (emitNode) node.emitNode = mergeEmitNode(emitNode, node.emitNode);
        }
    }
    return node;
}

function mergeEmitNode(sourceEmitNode: EmitNode, destEmitNode: EmitNode | undefined) {
    const {
        flags,
        internalFlags,
        leadingComments,
        trailingComments,
        commentRange,
        sourceMapRange,
        tokenSourceMapRanges,
        constantValue,
        helpers,
        startsOnNewLine,
        snippetElement,
        classThis,
        assignedName,
    } = sourceEmitNode;
    if (!destEmitNode) destEmitNode = {} as EmitNode;

    // NOTE: We should have one or more lines here for each property in EmitNode, even if the line
    // consists only of a comment indicating the property does not merge

    // `flags` overwrites the destination
    if (flags) {
        destEmitNode.flags = flags;
    }

    // `internalFlags` overwrites the destination. We do not copy over the immutability of the source.
    if (internalFlags) {
        destEmitNode.internalFlags = internalFlags & ~InternalEmitFlags.Immutable;
    }

    // `annotatedNodes` are not merged as they should only present on the parse tree node of a `SourceFile`.

    // `leadingComments` are concatenated with any existing leading comments on the destination
    if (leadingComments) {
        // We use `.slice()` in case `destEmitNode.leadingComments` is pushed to later
        destEmitNode.leadingComments = addRange(leadingComments.slice(), destEmitNode.leadingComments);
    }

    // `trailingComments` are concatenated with any existing trailing comments on the destination
    if (trailingComments) {
        // We use `.slice()` in case `destEmitNode.trailingComments` is pushed to later
        destEmitNode.trailingComments = addRange(trailingComments.slice(), destEmitNode.trailingComments);
    }

    // `commentRange` overwrites the destination
    if (commentRange) {
        destEmitNode.commentRange = commentRange;
    }

    // `sourceMapRange` overwrites the destination
    if (sourceMapRange) {
        destEmitNode.sourceMapRange = sourceMapRange;
    }

    // `tokenSourceMapRanges` are merged with the destination
    if (tokenSourceMapRanges) {
        destEmitNode.tokenSourceMapRanges = mergeTokenSourceMapRanges(tokenSourceMapRanges, destEmitNode.tokenSourceMapRanges!);
    }

    // `constantValue` overwrites the destination
    if (constantValue !== undefined) {
        destEmitNode.constantValue = constantValue;
    }

    // `externalHelpersModuleName` is not merged
    // `externalHelpers` is not merged

    // `helpers` are merged into the destination
    if (helpers) {
        for (const helper of helpers) {
            destEmitNode.helpers = appendIfUnique(destEmitNode.helpers, helper);
        }
    }

    // `startsOnNewLine` overwrites the destination
    if (startsOnNewLine !== undefined) {
        destEmitNode.startsOnNewLine = startsOnNewLine;
    }

    // `snippetElement` overwrites the destination
    if (snippetElement !== undefined) {
        destEmitNode.snippetElement = snippetElement;
    }

    // `typeNode` is not merged as it only applies to comment emit for a variable declaration.
    // TODO: `typeNode` should overwrite the destination

    // `classThis` overwrites the destination
    if (classThis) {
        destEmitNode.classThis = classThis;
    }

    // `assignedName` overwrites the destination
    if (assignedName) {
        destEmitNode.assignedName = assignedName;
    }

    // `identifierTypeArguments` are not merged as they only apply to an Identifier in quick info
    // `autoGenerate` is not merged as it only applies to a specific generated Identifier/PrivateIdentifier
    // `generatedImportReference` is not merged as it only applies to an Identifier

    return destEmitNode;
}

function mergeTokenSourceMapRanges(sourceRanges: (TextRange | undefined)[], destRanges: (TextRange | undefined)[]) {
    if (!destRanges) destRanges = [];
    for (const key in sourceRanges) {
        destRanges[key] = sourceRanges[key];
    }
    return destRanges;
}
