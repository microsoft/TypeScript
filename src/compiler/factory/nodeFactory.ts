import {
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
    AsteriskToken,
    AwaitExpression,
    AwaitKeyword,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    Block,
    BreakStatement,
    Bundle,
    CallBinding,
    CallChain,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    CatchClause,
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
    ContinueStatement,
    createNodeConverters,
    createParenthesizerRules,
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
    EmptyStatement,
    EndOfFileToken,
    EntityName,
    EnumDeclaration,
    EnumMember,
    EqualsGreaterThanToken,
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
    getNameOfDeclaration,
    getNodeId,
    getNonAssignedNameOfDeclaration,
    getSourceMapRange,
    getSyntheticLeadingComments,
    getSyntheticTrailingComments,
    getTextOfIdentifierOrLiteral,
    HasDecorators,
    HasModifiers,
    hasSyntacticModifier,
    HeritageClause,
    Identifier,
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
    isArrowFunction,
    isCallChain,
    isClassDeclaration,
    isClassExpression,
    isConstructorDeclaration,
    isConstructorTypeNode,
    isCustomPrologue,
    isElementAccessExpression,
    isEnumDeclaration,
    isExportAssignment,
    isExportDeclaration,
    isFunctionDeclaration,
    isFunctionExpression,
    isGeneratedIdentifier,
    isGetAccessorDeclaration,
    isHoistedFunction,
    isHoistedVariableStatement,
    isIdentifier,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isIndexSignatureDeclaration,
    isInterfaceDeclaration,
    isLabeledStatement,
    isMemberName,
    isMethodDeclaration,
    isMethodSignature,
    isModuleDeclaration,
    isNodeArray,
    isOuterExpression,
    isParameter,
    isParenthesizedExpression,
    isPrologueDirective,
    isPropertyAccessExpression,
    isPropertyDeclaration,
    isPropertySignature,
    isSetAccessorDeclaration,
    isStatement,
    isStatementOrBlock,
    isStringLiteral,
    isSuperKeyword,
    isSuperProperty,
    isTypeAliasDeclaration,
    isTypeParameterDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    JSDoc,
    JSDocAllType,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassReference,
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
    LeftHandSideExpression,
    LiteralExpression,
    LiteralToken,
    LiteralTypeNode,
    MappedTypeNode,
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
    ModifierSyntaxKind,
    ModifierToken,
    ModuleBlock,
    ModuleBody,
    ModuleDeclaration,
    ModuleExportName,
    ModuleName,
    ModuleReference,
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
    ObjectLiteralElement,
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
    SatisfiesExpression,
    ScriptTarget,
    SemicolonClassElement,
    SetAccessorDeclaration,
    setEmitFlags,
    setIdentifierAutoGenerate,
    setParent,
    setTextRange,
    ShorthandPropertyAssignment,
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
    TokenSyntaxKind,
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
import * as ast from "../_namespaces/ts.ast.js";

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
    // Mark nodes as synthetic
    Synthesized = 1 << 4,
}

const nodeFactoryPatchers: ((factory: NodeFactory) => void)[] = [];

/** @internal @knipignore */
export function addNodeFactoryPatcher(fn: (factory: NodeFactory) => void) {
    nodeFactoryPatchers.push(fn);
}

/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 *
 * @internal
 */
export function createNodeFactory(flags: NodeFactoryFlags, onFinishNode?: (node: Node) => void): NodeFactory {
    const astFactory = ast.createAstNodeFactory(flags, onFinishNode && (ast => onFinishNode(ast.node)));

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullParenthesizerRules : createParenthesizerRules(factory));
    const converters = memoize(() => flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : createNodeConverters(factory));

    // lazy initializaton of common operator factories
    const getBinaryCreateFunction = memoizeOne((operator: BinaryOperator) => (left: Expression, right: Expression) => createBinaryExpression(left, operator, right));
    const getPrefixUnaryCreateFunction = memoizeOne((operator: PrefixUnaryOperator) => (operand: Expression) => createPrefixUnaryExpression(operator, operand));
    const getPostfixUnaryCreateFunction = memoizeOne((operator: PostfixUnaryOperator) => (operand: Expression) => createPostfixUnaryExpression(operand, operator));

    const factory: NodeFactory = {
        get parenthesizer() {
            return parenthesizerRules();
        },
        get converters() {
            return converters();
        },
        astFactory,
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
        // lazily load factory members for JSDoc types with similar structure
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
        createJSDocTypeTag,
        updateJSDocTypeTag,
        createJSDocReturnTag,
        updateJSDocReturnTag,
        createJSDocThisTag,
        updateJSDocThisTag,
        createJSDocAuthorTag,
        updateJSDocAuthorTag,
        createJSDocClassTag,
        updateJSDocClassTag,
        createJSDocPublicTag,
        updateJSDocPublicTag,
        createJSDocPrivateTag,
        updateJSDocPrivateTag,
        createJSDocProtectedTag,
        updateJSDocProtectedTag,
        createJSDocReadonlyTag,
        updateJSDocReadonlyTag,
        createJSDocOverrideTag,
        updateJSDocOverrideTag,
        createJSDocDeprecatedTag,
        updateJSDocDeprecatedTag,
        createJSDocThrowsTag,
        updateJSDocThrowsTag,
        createJSDocSatisfiesTag,
        updateJSDocSatisfiesTag,
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
        /** @deprecated */ createJsxJsxClosingFragment: createJsxClosingFragment,
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
        if (elements instanceof ast.NodeArray) {
            return elements;
        }

        return new ast.AstNodeArray(elements?.map(element => (element as Node as ast.Node).ast) ?? [], hasTrailingComma).nodes as readonly Node[] as NodeArray<T>;
    }

    //
    // Literals
    //

    // @api
    function createNumericLiteral(value: string | number, numericLiteralFlags: TokenFlags = TokenFlags.None): NumericLiteral {
        return astFactory.createNumericLiteral(value, numericLiteralFlags).node;
    }

    // @api
    function createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral {
        return astFactory.createBigIntLiteral(value).node;
    }

    // @api
    function createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral {
        return astFactory.createStringLiteral(text, isSingleQuote, hasExtendedUnicodeEscape).node;
    }

    // @api
    function createStringLiteralFromNode(sourceNode: PropertyNameLiteral | PrivateIdentifier): StringLiteral {
        const node = astFactory.createStringLiteral(getTextOfIdentifierOrLiteral(sourceNode), /*isSingleQuote*/ undefined).node;
        node.textSourceNode = sourceNode as ast.PropertyNameLiteral | ast.PrivateIdentifier;
        return node;
    }

    // @api
    function createRegularExpressionLiteral(text: string): RegularExpressionLiteral {
        return astFactory.createRegularExpressionLiteral(text).node;
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

    // @api
    function createIdentifier(text: string, _originalKeywordKind?: SyntaxKind, hasExtendedUnicodeEscape?: boolean): Identifier {
        return astFactory.createIdentifier(text, hasExtendedUnicodeEscape).node;
    }

    function createGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags, prefix: string | GeneratedNamePart | undefined, suffix: string | undefined) {
        const astNode = astFactory.createIdentifier(text);
        setIdentifierAutoGenerate(astNode, {
            flags: autoGenerateFlags,
            id: nextAutoGenerateId,
            prefix,
            suffix,
        });
        nextAutoGenerateId++;
        return astNode.node as GeneratedIdentifier;
    }

    // @api
    function createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean, prefix?: string | GeneratedNamePart, suffix?: string): GeneratedIdentifier {
        let flags = GeneratedIdentifierFlags.Auto;
        if (reservedInNestedScopes) flags |= GeneratedIdentifierFlags.ReservedInNestedScopes;
        const name = createGeneratedIdentifier("", flags, prefix, suffix);
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
        return createGeneratedIdentifier("", flags, /*prefix*/ undefined, /*suffix*/ undefined);
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniqueName(text: string, flags: GeneratedIdentifierFlags = GeneratedIdentifierFlags.None, prefix?: string | GeneratedNamePart, suffix?: string): Identifier {
        Debug.assert(!(flags & GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        Debug.assert((flags & (GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)) !== GeneratedIdentifierFlags.FileLevel, "GeneratedIdentifierFlags.FileLevel cannot be set without also setting GeneratedIdentifierFlags.Optimistic");
        return createGeneratedIdentifier(text, GeneratedIdentifierFlags.Unique | flags, prefix, suffix);
    }

    /** Create a unique name generated for a node. */
    // @api
    function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0, prefix?: string | GeneratedNamePart, suffix?: string): Identifier {
        Debug.assert(!(flags & GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        const text = !node ? "" :
            isMemberName(node) ? formatGeneratedName(/*privateName*/ false, prefix, node, suffix, idText) :
            `generated@${getNodeId(node)}`;
        if (prefix || suffix) flags |= GeneratedIdentifierFlags.Optimistic;
        const name = createGeneratedIdentifier(text, GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    // @api
    function createPrivateIdentifier(text: string): PrivateIdentifier {
        return astFactory.createPrivateIdentifier(text).node;
    }

    function createGeneratedPrivateIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags, prefix: string | GeneratedNamePart | undefined, suffix: string | undefined) {
        const astNode = astFactory.createPrivateIdentifier(text);
        setIdentifierAutoGenerate(astNode, {
            flags: autoGenerateFlags,
            id: nextAutoGenerateId,
            prefix,
            suffix,
        });
        nextAutoGenerateId++;
        return astNode.node as GeneratedPrivateIdentifier;
    }

    /** Create a unique name based on the supplied text. */
    // @api
    function createUniquePrivateName(text?: string, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier {
        if (text && !startsWith(text, "#")) Debug.fail("First character of private identifier must be #: " + text);
        const autoGenerateFlags = GeneratedIdentifierFlags.ReservedInNestedScopes |
            (text ? GeneratedIdentifierFlags.Unique : GeneratedIdentifierFlags.Auto);
        return createGeneratedPrivateIdentifier(text ?? "", autoGenerateFlags, prefix, suffix);
    }

    // @api
    function getGeneratedPrivateNameForNode(node: Node, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier {
        const text = isMemberName(node) ? formatGeneratedName(/*privateName*/ true, prefix, node, suffix, idText) :
            `#generated@${getNodeId(node)}`;
        const flags = prefix || suffix ? GeneratedIdentifierFlags.Optimistic : GeneratedIdentifierFlags.None;
        const name = createGeneratedPrivateIdentifier(text, GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    //
    // Punctuation
    //

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
    function createToken<TKind extends TokenSyntaxKind>(token: TKind): Token<TKind>;
    function createToken<TKind extends TokenSyntaxKind>(token: TKind): Token<TKind> {
        return astFactory.createToken(token).node;
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
    function createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName {
        return astFactory.createQualifiedName(asNode(left).ast, typeof right === "string" ? right : asNode(right).ast).node;
    }

    // @api
    function updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName {
        return astFactory.updateQualifiedName(asNode(node).ast, asNode(left).ast, asNode(right).ast).node;
    }

    // @api
    function createComputedPropertyName(expression: Expression): ComputedPropertyName {
        return astFactory.createComputedPropertyName(asNode(expression).ast).node;
    }

    // @api
    function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName {
        return astFactory.updateComputedPropertyName(asNode(node).ast, asNode(expression).ast).node;
    }

    //
    // Signature elements
    //

    // @api
    function createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
        return astFactory.createTypeParameterDeclaration(asNodeArray(modifiers)?.ast, asName(name).ast, asNode(constraint)?.ast, asNode(defaultType)?.ast).node;
    }

    // @api
    function updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
        return astFactory.updateTypeParameterDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNode(constraint)?.ast, asNode(defaultType)?.ast).node;
    }

    // @api
    function createParameterDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        name: string | BindingName,
        questionToken?: QuestionToken,
        type?: TypeNode,
        initializer?: Expression,
    ): ParameterDeclaration {
        // NOTE: JSDoc parameters don't have names and we currently passed `undefined!`
        return astFactory.createParameterDeclaration(asNodeArray(modifiers)?.ast, asNode(dotDotDotToken)?.ast, asName(name)?.ast, asNode(questionToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
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
    ): ParameterDeclaration {
        return astFactory.updateParameterDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(dotDotDotToken)?.ast, asName(name)?.ast, asNode(questionToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
    }

    // @api
    function createDecorator(expression: Expression): Decorator {
        return astFactory.createDecorator(asNode(expression).ast).node;
    }

    // @api
    function updateDecorator(node: Decorator, expression: Expression): Decorator {
        return astFactory.updateDecorator((node as ast.Decorator).ast, asNode(expression).ast).node;
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
        return astFactory.createPropertySignature(asNodeArray(modifiers)?.ast, asName(name).ast, asNode(questionToken)?.ast, asNode(type)?.ast).node;
    }

    // @api
    function updatePropertySignature(
        node: PropertySignature,
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        type: TypeNode | undefined,
    ): PropertySignature {
        return astFactory.updatePropertySignature(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNode(questionToken)?.ast, asNode(type)?.ast).node;
    }

    // @api
    function createPropertyDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined,
    ): PropertyDeclaration {
        return astFactory.createPropertyDeclaration(asNodeArray(modifiers)?.ast, asName(name).ast, asNode(questionOrExclamationToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
    }

    // @api
    function updatePropertyDeclaration(
        node: PropertyDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        questionOrExclamationToken: QuestionToken | ExclamationToken | undefined,
        type: TypeNode | undefined,
        initializer: Expression | undefined,
    ): PropertyDeclaration {
        return astFactory.updatePropertyDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asName(name).ast, asNode(questionOrExclamationToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
    }

    // @api
    function createMethodSignature(
        modifiers: readonly Modifier[] | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): MethodSignature {
        return astFactory.createMethodSignature(asNodeArray(modifiers)?.ast, asName(name).ast, asNode(questionToken)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
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
    ): MethodSignature {
        return astFactory.updateMethodSignature(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNode(questionToken)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
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
    ): MethodDeclaration {
        return astFactory.createMethodDeclaration(asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asName(name).ast, asNode(questionToken)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
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
    ): MethodDeclaration {
        return astFactory.updateMethodDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asNode(name).ast, asNode(questionToken)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
    }

    // @api
    function createClassStaticBlockDeclaration(
        body: Block,
    ): ClassStaticBlockDeclaration {
        return astFactory.createClassStaticBlockDeclaration(asNode(body).ast).node;
    }

    // @api
    function updateClassStaticBlockDeclaration(
        node: ClassStaticBlockDeclaration,
        body: Block,
    ): ClassStaticBlockDeclaration {
        return astFactory.updateClassStaticBlockDeclaration(asNode(node).ast, asNode(body).ast).node;
    }

    // @api
    function createConstructorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ): ConstructorDeclaration {
        return astFactory.createConstructorDeclaration(asNodeArray(modifiers)?.ast, asNodeArray(parameters).ast, asNode(body)?.ast).node;
    }

    // @api
    function updateConstructorDeclaration(
        node: ConstructorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ): ConstructorDeclaration {
        return astFactory.updateConstructorDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNodeArray(parameters).ast, asNode(body)?.ast).node;
    }

    // @api
    function createGetAccessorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ): GetAccessorDeclaration {
        return astFactory.createGetAccessorDeclaration(asNodeArray(modifiers)?.ast, asName(name)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
    }

    // @api
    function updateGetAccessorDeclaration(
        node: GetAccessorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: PropertyName,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined,
    ): GetAccessorDeclaration {
        return astFactory.updateGetAccessorDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
    }

    // @api
    function createSetAccessorDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | PropertyName,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ): SetAccessorDeclaration {
        return astFactory.createSetAccessorDeclaration(asNodeArray(modifiers)?.ast, asName(name)?.ast, asNodeArray(parameters).ast, asNode(body)?.ast).node;
    }

    // @api
    function updateSetAccessorDeclaration(
        node: SetAccessorDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: PropertyName,
        parameters: readonly ParameterDeclaration[],
        body: Block | undefined,
    ): SetAccessorDeclaration {
        return astFactory.updateSetAccessorDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNodeArray(parameters).ast, asNode(body)?.ast).node;
    }

    // @api
    function createCallSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): CallSignatureDeclaration {
        return astFactory.createCallSignature(asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function updateCallSignature(
        node: CallSignatureDeclaration,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
    ): CallSignatureDeclaration {
        return astFactory.updateCallSignature(asNode(node).ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function createConstructSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): ConstructSignatureDeclaration {
        return astFactory.createConstructSignature(asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function updateConstructSignature(
        node: ConstructSignatureDeclaration,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode | undefined,
    ): ConstructSignatureDeclaration {
        return astFactory.updateConstructSignature(asNode(node).ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function createIndexSignature(
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): IndexSignatureDeclaration {
        return astFactory.createIndexSignature(asNodeArray(modifiers)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node
    }

    // @api
    function updateIndexSignature(
        node: IndexSignatureDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): IndexSignatureDeclaration {
        return astFactory.updateIndexSignature(asNode(node).ast, asNodeArray(modifiers)?.ast, asNodeArray(parameters).ast, asNode(type).ast).node;
    }

    // @api
    function createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan {
        return astFactory.createTemplateLiteralTypeSpan(asNode(type).ast, asNode(literal).ast).node;
    }

    // @api
    function updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan {
        return astFactory.updateTemplateLiteralTypeSpan(asNode(node).ast, asNode(type).ast, asNode(literal).ast).node;
    }

    //
    // Types
    //

    // @api
    function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind) {
        return createToken(kind);
    }

    // @api
    function createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode {
        return astFactory.createTypePredicateNode(asNode(assertsModifier)?.ast, asName(parameterName).ast, asNode(type)?.ast).node;
    }

    // @api
    function updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode {
        return astFactory.updateTypePredicateNode(asNode(node).ast, asNode(assertsModifier)?.ast, asName(parameterName).ast, asNode(type)?.ast).node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined): TypeReferenceNode {
        return astFactory.createTypeReferenceNode(asName(typeName).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode {
        return astFactory.updateTypeReferenceNode(asNode(node).ast, asNode(typeName).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function createFunctionTypeNode(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): FunctionTypeNode {
        return astFactory.createFunctionTypeNode(asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type).ast).node;
    }

    // @api
    function updateFunctionTypeNode(
        node: FunctionTypeNode,
        typeParameters: NodeArray<TypeParameterDeclaration> | undefined,
        parameters: NodeArray<ParameterDeclaration>,
        type: TypeNode,
    ): FunctionTypeNode {
        return astFactory.updateFunctionTypeNode(asNode(node).ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type).ast).node;
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
        return astFactory.createConstructorTypeNode(asNodeArray(modifiers)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type).ast).node;
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
    ): ConstructorTypeNode {
        return astFactory.updateConstructorTypeNode(asNode(node).ast, asNodeArray(modifiers)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type).ast).node;
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
    function createTypeQueryNode(exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode {
        return astFactory.createTypeQueryNode(asNode(exprName).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode {
        return astFactory.updateTypeQueryNode(asNode(node).ast, asNode(exprName).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function createTypeLiteralNode(members: readonly TypeElement[] | undefined): TypeLiteralNode {
        return astFactory.createTypeLiteralNode(asNodeArray(members)?.ast).node;
    }

    // @api
    function updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>): TypeLiteralNode {
        return astFactory.updateTypeLiteralNode(asNode(node).ast, asNodeArray(members).ast).node;
    }

    // @api
    function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode {
        return astFactory.createArrayTypeNode(asNode(elementType).ast).node;
    }

    // @api
    function updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode {
        return astFactory.updateArrayTypeNode(asNode(node).ast, asNode(elementType).ast).node;
    }

    // @api
    function createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode {
        return astFactory.createTupleTypeNode(asNodeArray(elements).ast).node;
    }

    // @api
    function updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode {
        return astFactory.updateTupleTypeNode(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createNamedTupleMember(dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember {
        return astFactory.createNamedTupleMember(asNode(dotDotDotToken)?.ast, asNode(name).ast, asNode(questionToken)?.ast, asNode(type).ast).node;
    }

    // @api
    function updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember {
        return astFactory.updateNamedTupleMember(asNode(node).ast, asNode(dotDotDotToken)?.ast, asNode(name).ast, asNode(questionToken)?.ast, asNode(type).ast).node;
    }

    // @api
    function createOptionalTypeNode(type: TypeNode): OptionalTypeNode {
        return astFactory.createOptionalTypeNode(asNode(type).ast).node;
    }

    // @api
    function updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode {
        return astFactory.updateOptionalTypeNode(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createRestTypeNode(type: TypeNode): RestTypeNode {
        return astFactory.createRestTypeNode(asNode(type).ast).node;
    }

    // @api
    function updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode {
        return astFactory.updateRestTypeNode(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
        return astFactory.createUnionTypeNode(asNodeArray(types).ast).node;
    }

    // @api
    function updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>): UnionTypeNode {
        return astFactory.updateUnionTypeNode(asNode(node).ast, asNodeArray(types).ast).node;
    }

    // @api
    function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
        return astFactory.createIntersectionTypeNode(asNodeArray(types).ast).node;
    }

    // @api
    function updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>): IntersectionTypeNode {
        return astFactory.updateIntersectionTypeNode(asNode(node).ast, asNodeArray(types).ast).node;
    }

    // @api
    function createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode {
        return astFactory.createConditionalTypeNode(asNode(checkType).ast, asNode(extendsType).ast, asNode(trueType).ast, asNode(falseType).ast).node;
    }

    // @api
    function updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode {
        return astFactory.updateConditionalTypeNode(asNode(node).ast, asNode(checkType).ast, asNode(extendsType).ast, asNode(trueType).ast, asNode(falseType).ast).node;
    }

    // @api
    function createInferTypeNode(typeParameter: TypeParameterDeclaration): InferTypeNode {
        return astFactory.createInferTypeNode(asNode(typeParameter).ast).node;
    }

    // @api
    function updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration): InferTypeNode {
        return astFactory.updateInferTypeNode(asNode(node).ast, asNode(typeParameter).ast).node;
    }

    // @api
    function createTemplateLiteralType(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode {
        return astFactory.createTemplateLiteralType(asNode(head).ast, asNodeArray(templateSpans).ast).node;
    }

    // @api
    function updateTemplateLiteralType(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode {
        return astFactory.updateTemplateLiteralType(asNode(node).ast, asNode(head).ast, asNodeArray(templateSpans).ast).node;
    }

    // @api
    function createImportTypeNode(
        argument: TypeNode,
        attributes?: ImportAttributes,
        qualifier?: EntityName,
        typeArguments?: readonly TypeNode[],
        isTypeOf = false,
    ): ImportTypeNode {
        return astFactory.createImportTypeNode(asNode(argument).ast, asNode(attributes)?.ast, asNode(qualifier)?.ast, asNodeArray(typeArguments)?.ast, isTypeOf).node;
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
        return astFactory.updateImportTypeNode(asNode(node).ast, asNode(argument).ast, asNode(attributes)?.ast, asNode(qualifier)?.ast, asNodeArray(typeArguments)?.ast, isTypeOf).node;
    }

    // @api
    function createParenthesizedType(type: TypeNode): ParenthesizedTypeNode {
        return astFactory.createParenthesizedType(asNode(type).ast).node;
    }

    // @api
    function updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode {
        return astFactory.updateParenthesizedType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createThisTypeNode() {
        return astFactory.createThisTypeNode().node;
    }

    // @api
    function createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode {
        return astFactory.createTypeOperatorNode(operator, asNode(type).ast).node;
    }

    // @api
    function updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode {
        return astFactory.updateTypeOperatorNode(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode {
        return astFactory.createIndexedAccessTypeNode(asNode(objectType).ast, asNode(indexType).ast).node;
    }

    // @api
    function updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode {
        return astFactory.updateIndexedAccessTypeNode(asNode(node).ast, asNode(objectType).ast, asNode(indexType).ast).node;
    }

    // @api
    function createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
        return astFactory.createMappedTypeNode(asNode(readonlyToken)?.ast, asNode(typeParameter).ast, asNode(nameType)?.ast, asNode(questionToken)?.ast, asNode(type)?.ast, asNodeArray(members)?.ast).node;
    }

    // @api
    function updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: readonly TypeElement[] | undefined): MappedTypeNode {
        return astFactory.updateMappedTypeNode(asNode(node).ast, asNode(readonlyToken)?.ast, asNode(typeParameter).ast, asNode(nameType)?.ast, asNode(questionToken)?.ast, asNode(type)?.ast, asNodeArray(members)?.ast).node;
    }

    // @api
    function createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode {
        return astFactory.createLiteralTypeNode(asNode(literal).ast).node;
    }

    // @api
    function updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]): LiteralTypeNode {
        return astFactory.updateLiteralTypeNode(asNode(node).ast, asNode(literal).ast).node;
    }

    //
    // Binding Patterns
    //

    // @api
    function createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern {
        return astFactory.createObjectBindingPattern(asNodeArray(elements).ast).node;
    }

    // @api
    function updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern {
        return astFactory.updateObjectBindingPattern(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern {
        return astFactory.createArrayBindingPattern(asNodeArray(elements).ast).node;
    }

    // @api
    function updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern {
        return astFactory.updateArrayBindingPattern(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement {
        return astFactory.createBindingElement(asNode(dotDotDotToken)?.ast, asName(propertyName)?.ast, asName(name).ast, asNode(initializer)?.ast).node;
    }

    // @api
    function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement {
        return astFactory.updateBindingElement(asNode(node).ast, asNode(dotDotDotToken)?.ast, asNode(propertyName)?.ast, asNode(name).ast, asNode(initializer)?.ast).node;
    }

    //
    // Expression
    //

    // @api
    function createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression {
        return astFactory.createArrayLiteralExpression(asNodeArray(elements)?.ast, multiLine).node;
    }

    // @api
    function updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression {
        return astFactory.updateArrayLiteralExpression(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression {
        return astFactory.createObjectLiteralExpression(asNodeArray(properties)?.ast, multiLine).node;
    }

    // @api
    function updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression {
        return astFactory.updateObjectLiteralExpression(asNode(node).ast, asNodeArray(properties).ast).node;
    }

    // @api
    function createPropertyAccessExpression(expression: Expression, name: string | Identifier | PrivateIdentifier): PropertyAccessExpression {
        return astFactory.createPropertyAccessExpression(asNode(expression).ast, asName(name).ast).node;
    }

    // @api
    function updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: Identifier | PrivateIdentifier): PropertyAccessExpression {
        return astFactory.updatePropertyAccessExpression(asNode(node).ast, asNode(expression).ast, asNode(name).ast).node;
    }

    // @api
    function createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | Identifier | PrivateIdentifier): PropertyAccessChain {
        return astFactory.createPropertyAccessChain(asNode(expression).ast, asNode(questionDotToken)?.ast, asName(name).ast).node;
    }

    // @api
    function updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: Identifier | PrivateIdentifier): PropertyAccessChain {
        return astFactory.updatePropertyAccessChain(asNode(node).ast, asNode(expression).ast, asNode(questionDotToken)?.ast, asNode(name).ast).node;
    }

    // @api
    function createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression {
        return astFactory.createElementAccessExpression(asNode(expression).ast, asExpression(index).ast).node;
    }

    // @api
    function updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression): ElementAccessExpression {
        return astFactory.updateElementAccessExpression(asNode(node).ast, asNode(expression).ast, asNode(argumentExpression).ast).node;
    }

    // @api
    function createElementAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression): ElementAccessChain {
        return astFactory.createElementAccessChain(asNode(expression).ast, asNode(questionDotToken)?.ast, asExpression(index).ast).node;
    }

    // @api
    function updateElementAccessChain(node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessChain {
        return astFactory.updateElementAccessChain(asNode(node).ast, asNode(expression).ast, asNode(questionDotToken)?.ast, asNode(argumentExpression).ast).node;
    }

    // @api
    function createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallExpression {
        return astFactory.createCallExpression(asNode(expression).ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray)?.ast).node;
    }

    // @api
    function updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallExpression {
        return astFactory.updateCallExpression(asNode(node).ast, asNode(expression).ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray).ast).node;
    }

    // @api
    function createCallChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallChain {
        return astFactory.createCallChain(asNode(expression).ast, asNode(questionDotToken)?.ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray)?.ast).node;
    }

    // @api
    function updateCallChain(node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallChain {
        return astFactory.updateCallChain(asNode(node).ast, asNode(expression).ast, asNode(questionDotToken)?.ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray).ast).node;
    }

    // @api
    function createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression {
        return astFactory.createNewExpression(asNode(expression).ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray)?.ast).node;
    }

    // @api
    function updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression {
        return astFactory.updateNewExpression(asNode(node).ast, asNode(expression).ast, asNodeArray(typeArguments)?.ast, asNodeArray(argumentsArray)?.ast).node;
    }

    // @api
    function createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression {
        return astFactory.createTaggedTemplateExpression(asNode(tag).ast, asNodeArray(typeArguments)?.ast, asNode(template).ast).node;
    }

    // @api
    function updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression {
        return astFactory.updateTaggedTemplateExpression(asNode(node).ast, asNode(tag).ast, asNodeArray(typeArguments)?.ast, asNode(template).ast).node;
    }

    // @api
    function createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion {
        return astFactory.createTypeAssertion(asNode(type).ast, asNode(expression).ast).node;
    }

    // @api
    function updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression): TypeAssertion {
        return astFactory.updateTypeAssertion(asNode(node).ast, asNode(type).ast, asNode(expression).ast).node;
    }

    // @api
    function createParenthesizedExpression(expression: Expression): ParenthesizedExpression {
        return astFactory.createParenthesizedExpression(asNode(expression).ast).node;
    }

    // @api
    function updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression {
        return astFactory.updateParenthesizedExpression(asNode(node).ast, asNode(expression).ast).node;
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
    ): FunctionExpression {
        return astFactory.createFunctionExpression(asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asName(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters)?.ast, asNode(type)?.ast, asNode(body).ast).node;
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
    ): FunctionExpression {
        return astFactory.updateFunctionExpression(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asNode(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body).ast).node;
    }

    // @api
    function createArrowFunction(
        modifiers: readonly Modifier[] | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        equalsGreaterThanToken: EqualsGreaterThanToken | undefined,
        body: ConciseBody,
    ): ArrowFunction {
        return astFactory.createArrowFunction(asNodeArray(modifiers)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(equalsGreaterThanToken)?.ast, asNode(body).ast).node;
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
        return astFactory.updateArrowFunction(asNode(node).ast, asNodeArray(modifiers)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(equalsGreaterThanToken).ast, asNode(body).ast).node;
    }

    // @api
    function createDeleteExpression(expression: Expression): DeleteExpression {
        return astFactory.createDeleteExpression(asNode(expression).ast).node;
    }

    // @api
    function updateDeleteExpression(node: DeleteExpression, expression: Expression): DeleteExpression {
        return astFactory.updateDeleteExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createTypeOfExpression(expression: Expression): TypeOfExpression {
        return astFactory.createTypeOfExpression(asNode(expression).ast).node;
    }

    // @api
    function updateTypeOfExpression(node: TypeOfExpression, expression: Expression): TypeOfExpression {
        return astFactory.updateTypeOfExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createVoidExpression(expression: Expression): VoidExpression {
        return astFactory.createVoidExpression(asNode(expression).ast).node;
    }

    // @api
    function updateVoidExpression(node: VoidExpression, expression: Expression): VoidExpression {
        return astFactory.updateVoidExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createAwaitExpression(expression: Expression): AwaitExpression {
        return astFactory.createAwaitExpression(asNode(expression).ast).node;
    }

    // @api
    function updateAwaitExpression(node: AwaitExpression, expression: Expression): AwaitExpression {
        return astFactory.updateAwaitExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression {
        return astFactory.createPrefixUnaryExpression(operator, asNode(operand).ast).node;
    }

    // @api
    function updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression): PrefixUnaryExpression {
        return astFactory.updatePrefixUnaryExpression(asNode(node).ast, asNode(operand).ast).node;
    }

    // @api
    function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression {
        return astFactory.createPostfixUnaryExpression(asNode(operand).ast, operator).node;
    }

    // @api
    function updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression): PostfixUnaryExpression {
        return astFactory.updatePostfixUnaryExpression(asNode(node).ast, asNode(operand).ast).node;
    }

    // @api
    function createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression {
        return astFactory.createBinaryExpression(asNode(left).ast, asToken(operator).ast, asNode(right).ast).node;
    }

    // @api
    function updateBinaryExpression(node: BinaryExpression, left: Expression, operator: BinaryOperatorToken, right: Expression): BinaryExpression {
        return astFactory.updateBinaryExpression(asNode(node).ast, asNode(left).ast, asNode(operator).ast, asNode(right).ast).node;
    }

    // @api
    function createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression {
        return astFactory.createConditionalExpression(asNode(condition).ast, asNode(questionToken)?.ast, asNode(whenTrue).ast, asNode(colonToken)?.ast, asNode(whenFalse).ast).node;
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
        return astFactory.updateConditionalExpression(asNode(node).ast, asNode(condition).ast, asNode(questionToken).ast, asNode(whenTrue).ast, asNode(colonToken).ast, asNode(whenFalse).ast).node;
    }

    // @api
    function createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression {
        return astFactory.createTemplateExpression(asNode(head).ast, asNodeArray(templateSpans).ast).node;
    }

    // @api
    function updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression {
        return astFactory.updateTemplateExpression(asNode(node).ast, asNode(head).ast, asNodeArray(templateSpans).ast).node;
    }

    // @api
    function createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string | undefined, templateFlags: TokenFlags | undefined): TemplateLiteralToken {
        return astFactory.createTemplateLiteralLikeNode(kind, text, rawText, templateFlags).node;
    }

    // @api
    function createTemplateHead(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        return astFactory.createTemplateHead(text, rawText!, templateFlags).node;
    }

    // @api
    function createTemplateMiddle(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        return astFactory.createTemplateMiddle(text, rawText!, templateFlags).node;
    }

    // @api
    function createTemplateTail(text: string | undefined, rawText?: string, templateFlags?: TokenFlags) {
        return astFactory.createTemplateTail(text, rawText!, templateFlags).node;
    }

    // @api
    function createNoSubstitutionTemplateLiteral(text: string | undefined, rawText?: string) {
        return astFactory.createNoSubstitutionTemplateLiteral(text, rawText!).node;
    }

    // @api
    function createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
        return astFactory.createYieldExpression(asNode(asteriskToken)?.ast, asNode(expression)?.ast).node;
    }

    // @api
    function updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression {
        return astFactory.updateYieldExpression(asNode(node).ast, asNode(asteriskToken)?.ast, asNode(expression)?.ast).node;
    }

    // @api
    function createSpreadElement(expression: Expression): SpreadElement {
        return astFactory.createSpreadElement(asNode(expression).ast).node;
    }

    // @api
    function updateSpreadElement(node: SpreadElement, expression: Expression): SpreadElement {
        return astFactory.updateSpreadElement(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createClassExpression(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ): ClassExpression {
        return astFactory.createClassExpression(asNodeArray(modifiers)?.ast, asName(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function updateClassExpression(
        node: ClassExpression,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ): ClassExpression {
        return astFactory.updateClassExpression(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function createOmittedExpression(): OmittedExpression {
        return astFactory.createOmittedExpression().node;
    }

    // @api
    function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments {
        return astFactory.createExpressionWithTypeArguments(asNode(expression).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments {
        return astFactory.updateExpressionWithTypeArguments(asNode(node).ast, asNode(expression).ast, asNodeArray(typeArguments)?.ast).node;
    }

    // @api
    function createAsExpression(expression: Expression, type: TypeNode): AsExpression {
        return astFactory.createAsExpression(asNode(expression).ast, asNode(type).ast).node;
    }

    // @api
    function updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression {
        return astFactory.updateAsExpression(asNode(node).ast, asNode(expression).ast, asNode(type).ast).node;
    }

    // @api
    function createNonNullExpression(expression: Expression): NonNullExpression {
        return astFactory.createNonNullExpression(asNode(expression).ast).node;
    }

    // @api
    function updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression {
        return astFactory.updateNonNullExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createSatisfiesExpression(expression: Expression, type: TypeNode): SatisfiesExpression {
        return astFactory.createSatisfiesExpression(asNode(expression).ast, asNode(type).ast).node;
    }

    // @api
    function updateSatisfiesExpression(node: SatisfiesExpression, expression: Expression, type: TypeNode): SatisfiesExpression {
        return astFactory.updateSatisfiesExpression(asNode(node).ast, asNode(expression).ast, asNode(type).ast).node;
    }

    // @api
    function createNonNullChain(expression: Expression): NonNullChain {
        return astFactory.createNonNullChain(asNode(expression).ast).node;
    }

    // @api
    function updateNonNullChain(node: NonNullChain, expression: Expression): NonNullChain {
        return astFactory.updateNonNullChain(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier): MetaProperty {
        return astFactory.createMetaProperty(keywordToken, asNode(name).ast).node;
    }

    // @api
    function updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty {
        return astFactory.updateMetaProperty(asNode(node).ast, asNode(name).ast).node;
    }

    //
    // Misc
    //

    // @api
    function createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan {
        return astFactory.createTemplateSpan(asNode(expression).ast, asNode(literal).ast).node;
    }

    // @api
    function updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan {
        return astFactory.updateTemplateSpan(asNode(node).ast, asNode(expression).ast, asNode(literal).ast).node;
    }

    // @api
    function createSemicolonClassElement(): SemicolonClassElement {
        return astFactory.createSemicolonClassElement().node;
    }

    //
    // Element
    //

    // @api
    function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
        return astFactory.createBlock(asNodeArray(statements).ast, multiLine).node;
    }

    // @api
    function updateBlock(node: Block, statements: readonly Statement[]): Block {
        return astFactory.updateBlock(asNode(node).ast, asNodeArray(statements).ast).node;
    }

    // @api
    function createVariableStatement(modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement {
        return astFactory.createVariableStatement(asNodeArray(modifiers)?.ast, isArray(declarationList) ? asNodeArray(declarationList).ast : asNode(declarationList).ast).node;
    }

    // @api
    function updateVariableStatement(node: VariableStatement, modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList): VariableStatement {
        return astFactory.updateVariableStatement(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(declarationList).ast).node;
    }

    // @api
    function createEmptyStatement(): EmptyStatement {
        return astFactory.createEmptyStatement().node;
    }

    // @api
    function createExpressionStatement(expression: Expression): ExpressionStatement {
        return astFactory.createExpressionStatement(asNode(expression).ast).node;
    }

    // @api
    function updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement {
        return astFactory.updateExpressionStatement(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement {
        return astFactory.createIfStatement(asNode(expression).ast, asNode(thenStatement).ast, asNode(elseStatement)?.ast).node;
    }

    // @api
    function updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement {
        return astFactory.updateIfStatement(asNode(node).ast, asNode(expression).ast, asNode(thenStatement).ast, asNode(elseStatement)?.ast).node;
    }

    // @api
    function createDoStatement(statement: Statement, expression: Expression): DoStatement {
        return astFactory.createDoStatement(asNode(statement).ast, asNode(expression).ast).node;
    }

    // @api
    function updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement {
        return astFactory.updateDoStatement(asNode(node).ast, asNode(statement).ast, asNode(expression).ast).node;
    }

    // @api
    function createWhileStatement(expression: Expression, statement: Statement): WhileStatement {
        return astFactory.createWhileStatement(asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement {
        return astFactory.updateWhileStatement(asNode(node).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
        return astFactory.createForStatement(asNode(initializer)?.ast, asNode(condition)?.ast, asNode(incrementor)?.ast, asNode(statement).ast).node;
    }

    // @api
    function updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
        return astFactory.updateForStatement(asNode(node).ast, asNode(initializer)?.ast, asNode(condition)?.ast, asNode(incrementor)?.ast, asNode(statement).ast).node;
    }

    // @api
    function createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement {
        return astFactory.createForInStatement(asNode(initializer).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement {
        return astFactory.updateForInStatement(asNode(node).ast, asNode(initializer).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement {
        return astFactory.createForOfStatement(asNode(awaitModifier)?.ast, asNode(initializer).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement {
        return astFactory.updateForOfStatement(asNode(node).ast, asNode(awaitModifier)?.ast, asNode(initializer).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function createContinueStatement(label?: string | Identifier): ContinueStatement {
        return astFactory.createContinueStatement(asName(label)?.ast).node;
    }

    // @api
    function updateContinueStatement(node: ContinueStatement, label: Identifier | undefined): ContinueStatement {
        return astFactory.updateContinueStatement(asNode(node).ast, asNode(label)?.ast).node;
    }

    // @api
    function createBreakStatement(label?: string | Identifier): BreakStatement {
        return astFactory.createBreakStatement(asName(label)?.ast).node;
    }

    // @api
    function updateBreakStatement(node: BreakStatement, label: Identifier | undefined): BreakStatement {
        return astFactory.updateBreakStatement(asNode(node).ast, asNode(label)?.ast).node;
    }

    // @api
    function createReturnStatement(expression?: Expression): ReturnStatement {
        return astFactory.createReturnStatement(asNode(expression)?.ast).node;
    }

    // @api
    function updateReturnStatement(node: ReturnStatement, expression: Expression | undefined): ReturnStatement {
        return astFactory.updateReturnStatement(asNode(node).ast, asNode(expression)?.ast).node;
    }

    // @api
    function createWithStatement(expression: Expression, statement: Statement): WithStatement {
        return astFactory.createWithStatement(asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement {
        return astFactory.updateWithStatement(asNode(node).ast, asNode(expression).ast, asNode(statement).ast).node;
    }

    // @api
    function createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement {
        return astFactory.createSwitchStatement(asNode(expression).ast, asNode(caseBlock).ast).node;
    }

    // @api
    function updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement {
        return astFactory.updateSwitchStatement(asNode(node).ast, asNode(expression).ast, asNode(caseBlock).ast).node;
    }

    // @api
    function createLabeledStatement(label: string | Identifier, statement: Statement): LabeledStatement {
        return astFactory.createLabeledStatement(asName(label).ast, asNode(statement).ast).node;
    }

    // @api
    function updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement {
        return astFactory.updateLabeledStatement(asNode(node).ast, asNode(label).ast, asNode(statement).ast).node;
    }

    // @api
    function createThrowStatement(expression: Expression): ThrowStatement {
        return astFactory.createThrowStatement(asNode(expression).ast).node;
    }

    // @api
    function updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement {
        return astFactory.updateThrowStatement(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement {
        return astFactory.createTryStatement(asNode(tryBlock).ast, asNode(catchClause)?.ast, asNode(finallyBlock)?.ast).node;
    }

    // @api
    function updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement {
        return astFactory.updateTryStatement(asNode(node).ast, asNode(tryBlock).ast, asNode(catchClause)?.ast, asNode(finallyBlock)?.ast).node;
    }

    // @api
    function createDebuggerStatement(): DebuggerStatement {
        return astFactory.createDebuggerStatement().node;
    }

    // @api
    function createVariableDeclaration(name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration {
        return astFactory.createVariableDeclaration(asName(name).ast, asNode(exclamationToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
    }

    // @api
    function updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration {
        return astFactory.updateVariableDeclaration(asNode(node).ast, asNode(name).ast, asNode(exclamationToken)?.ast, asNode(type)?.ast, asNode(initializer)?.ast).node;
    }

    // @api
    function createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags = NodeFlags.None): VariableDeclarationList {
        return astFactory.createVariableDeclarationList(asNodeArray(declarations).ast, flags).node;
    }

    // @api
    function updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]): VariableDeclarationList {
        return astFactory.updateVariableDeclarationList(asNode(node).ast, asNodeArray(declarations).ast).node;
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
    ): FunctionDeclaration {
        return astFactory.createFunctionDeclaration(asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asName(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
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
    ): FunctionDeclaration {
        return astFactory.updateFunctionDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(asteriskToken)?.ast, asNode(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast, asNode(body)?.ast).node;
    }

    // @api
    function createClassDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ): ClassDeclaration {
        return astFactory.createClassDeclaration(asNodeArray(modifiers)?.ast, asName(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function updateClassDeclaration(
        node: ClassDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly ClassElement[],
    ): ClassDeclaration {
        return astFactory.updateClassDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name)?.ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function createInterfaceDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly TypeElement[],
    ): InterfaceDeclaration {
        return astFactory.createInterfaceDeclaration(asNodeArray(modifiers)?.ast, asName(name).ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function updateInterfaceDeclaration(
        node: InterfaceDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        heritageClauses: readonly HeritageClause[] | undefined,
        members: readonly TypeElement[],
    ): InterfaceDeclaration {
        return astFactory.updateInterfaceDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNodeArray(typeParameters)?.ast, asNodeArray(heritageClauses)?.ast, asNodeArray(members).ast).node;
    }

    // @api
    function createTypeAliasDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        type: TypeNode,
    ): TypeAliasDeclaration {
        return astFactory.createTypeAliasDeclaration(asNodeArray(modifiers)?.ast, asName(name).ast, asNodeArray(typeParameters)?.ast, asNode(type).ast).node;
    }

    // @api
    function updateTypeAliasDeclaration(
        node: TypeAliasDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        type: TypeNode,
    ): TypeAliasDeclaration {
        return astFactory.updateTypeAliasDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNodeArray(typeParameters)?.ast, asNode(type).ast).node;
    }

    // @api
    function createEnumDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: string | Identifier,
        members: readonly EnumMember[],
    ): EnumDeclaration {
        return astFactory.createEnumDeclaration(asNodeArray(modifiers)?.ast, asName(name).ast, asNodeArray(members).ast).node;
    }

    // @api
    function updateEnumDeclaration(
        node: EnumDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: Identifier,
        members: readonly EnumMember[],
    ): EnumDeclaration {
        return astFactory.updateEnumDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNodeArray(members).ast).node;
    }

    // @api
    function createModuleDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        name: ModuleName,
        body: ModuleBody | undefined,
        flags = NodeFlags.None,
    ): ModuleDeclaration {
        return astFactory.createModuleDeclaration(asNodeArray(modifiers)?.ast, asNode(name).ast, asNode(body)?.ast, flags).node;
    }

    // @api
    function updateModuleDeclaration(
        node: ModuleDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        name: ModuleName,
        body: ModuleBody | undefined,
    ): ModuleDeclaration {
        return astFactory.updateModuleDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(name).ast, asNode(body)?.ast).node;
    }

    // @api
    function createModuleBlock(statements: readonly Statement[]): ModuleBlock {
        return astFactory.createModuleBlock(asNodeArray(statements).ast).node;
    }

    // @api
    function updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]) {
        return astFactory.updateModuleBlock(asNode(node).ast, asNodeArray(statements).ast).node;
    }

    // @api
    function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
        return astFactory.createCaseBlock(asNodeArray(clauses).ast).node;
    }

    // @api
    function updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]): CaseBlock {
        return astFactory.updateCaseBlock(asNode(node).ast, asNodeArray(clauses).ast).node;
    }

    // @api
    function createNamespaceExportDeclaration(name: string | Identifier): NamespaceExportDeclaration {
        return astFactory.createNamespaceExportDeclaration(asName(name).ast).node;
    }

    // @api
    function updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration {
        return astFactory.updateNamespaceExportDeclaration(asNode(node).ast, asNode(name).ast).node;
    }

    // @api
    function createImportEqualsDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        isTypeOnly: boolean,
        name: string | Identifier,
        moduleReference: ModuleReference,
    ): ImportEqualsDeclaration {
        return astFactory.createImportEqualsDeclaration(asNodeArray(modifiers)?.ast, isTypeOnly, asName(name).ast, asNode(moduleReference).ast).node;
    }

    // @api
    function updateImportEqualsDeclaration(
        node: ImportEqualsDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        isTypeOnly: boolean,
        name: Identifier,
        moduleReference: ModuleReference,
    ): ImportEqualsDeclaration {
        return astFactory.updateImportEqualsDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, isTypeOnly, asNode(name).ast, asNode(moduleReference).ast).node;
    }

    // @api
    function createImportDeclaration(
        modifiers: readonly ModifierLike[] | undefined,
        importClause: ImportClause | undefined,
        moduleSpecifier: Expression,
        attributes: ImportAttributes | undefined,
    ): ImportDeclaration {
        return astFactory.createImportDeclaration(asNodeArray(modifiers)?.ast, asNode(importClause)?.ast, asNode(moduleSpecifier).ast, asNode(attributes)?.ast).node;
    }

    // @api
    function updateImportDeclaration(
        node: ImportDeclaration,
        modifiers: readonly ModifierLike[] | undefined,
        importClause: ImportClause | undefined,
        moduleSpecifier: Expression,
        attributes: ImportAttributes | undefined,
    ): ImportDeclaration {
        return astFactory.updateImportDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(importClause)?.ast, asNode(moduleSpecifier).ast, asNode(attributes)?.ast).node;
    }

    // @api
    function createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
        return astFactory.createImportClause(isTypeOnly, asNode(name)?.ast, asNode(namedBindings)?.ast).node;
    }

    // @api
    function updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause {
        return astFactory.updateImportClause(asNode(node).ast, isTypeOnly, asNode(name)?.ast, asNode(namedBindings)?.ast).node;
    }

    // @api
    function createAssertClause(elements: readonly AssertEntry[], multiLine?: boolean): AssertClause {
        return astFactory.createAssertClause(asNodeArray(elements).ast, multiLine).node;
    }

    // @api
    function updateAssertClause(node: AssertClause, elements: readonly AssertEntry[], multiLine?: boolean): AssertClause {
        return astFactory.updateAssertClause(asNode(node).ast, asNodeArray(elements).ast, multiLine).node;
    }

    // @api
    function createAssertEntry(name: AssertionKey, value: Expression) {
        return astFactory.createAssertEntry(asNode(name).ast, asNode(value).ast).node;
    }

    // @api
    function updateAssertEntry(node: AssertEntry, name: AssertionKey, value: Expression) {
        return astFactory.updateAssertEntry(asNode(node).ast, asNode(name).ast, asNode(value).ast).node;
    }

    // @api
    function createImportTypeAssertionContainer(clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer {
        return astFactory.createImportTypeAssertionContainer(asNode(clause).ast, multiLine).node;
    }

    // @api
    function updateImportTypeAssertionContainer(node: ImportTypeAssertionContainer, clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer {
        return astFactory.updateImportTypeAssertionContainer(asNode(node).ast, asNode(clause).ast, multiLine).node;
    }

    // @api
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean): ImportAttributes;
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean, token?: ImportAttributes["token"]): ImportAttributes;
    function createImportAttributes(elements: readonly ImportAttribute[], multiLine?: boolean, token?: ImportAttributes["token"]) {
        return astFactory.createImportAttributes(asNodeArray(elements).ast, multiLine, token).node;
    }

    // @api
    function updateImportAttributes(node: ImportAttributes, elements: readonly ImportAttribute[], multiLine?: boolean): ImportAttributes {
        return astFactory.updateImportAttributes(asNode(node).ast, asNodeArray(elements).ast, multiLine).node;
    }

    // @api
    function createImportAttribute(name: ImportAttributeName, value: Expression) {
        return astFactory.createImportAttribute(asNode(name).ast, asNode(value).ast).node;
    }

    // @api
    function updateImportAttribute(node: ImportAttribute, name: ImportAttributeName, value: Expression) {
        return astFactory.updateImportAttribute(asNode(node).ast, asNode(name).ast, asNode(value).ast).node;
    }

    // @api
    function createNamespaceImport(name: Identifier): NamespaceImport {
        return astFactory.createNamespaceImport(asNode(name).ast).node;
    }

    // @api
    function updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport {
        return astFactory.updateNamespaceImport(asNode(node).ast, asNode(name).ast).node;
    }

    // @api
    function createNamespaceExport(name: ModuleExportName): NamespaceExport {
        return astFactory.createNamespaceExport(asNode(name).ast).node;
    }

    // @api
    function updateNamespaceExport(node: NamespaceExport, name: ModuleExportName): NamespaceExport {
        return astFactory.updateNamespaceExport(asNode(node).ast, asNode(name).ast).node;
    }

    // @api
    function createNamedImports(elements: readonly ImportSpecifier[]): NamedImports {
        return astFactory.createNamedImports(asNodeArray(elements).ast).node;
    }

    // @api
    function updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports {
        return astFactory.updateNamedImports(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createImportSpecifier(isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier): ImportSpecifier {
        return astFactory.createImportSpecifier(isTypeOnly, asNode(propertyName)?.ast, asNode(name).ast).node;
    }

    // @api
    function updateImportSpecifier(node: ImportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier): ImportSpecifier {
        return astFactory.updateImportSpecifier(asNode(node).ast, isTypeOnly, asNode(propertyName)?.ast, asNode(name).ast).node;
    }

    // @api
    function createExportAssignment(
        modifiers: readonly ModifierLike[] | undefined,
        isExportEquals: boolean | undefined,
        expression: Expression,
    ): ExportAssignment {
        return astFactory.createExportAssignment(asNodeArray(modifiers)?.ast, isExportEquals, asNode(expression).ast).node;
    }

    // @api
    function updateExportAssignment(
        node: ExportAssignment,
        modifiers: readonly ModifierLike[] | undefined,
        expression: Expression,
    ): ExportAssignment {
        return astFactory.updateExportAssignment(asNode(node).ast, asNodeArray(modifiers)?.ast, asNode(expression).ast).node;
    }

    // @api
    function createExportDeclaration(
        modifiers: readonly Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier?: Expression,
        attributes?: ImportAttributes,
    ): ExportDeclaration {
        return astFactory.createExportDeclaration(asNodeArray(modifiers)?.ast, isTypeOnly, asNode(exportClause)?.ast, asNode(moduleSpecifier)?.ast, asNode(attributes)?.ast).node;
    }

    // @api
    function updateExportDeclaration(
        node: ExportDeclaration,
        modifiers: readonly Modifier[] | undefined,
        isTypeOnly: boolean,
        exportClause: NamedExportBindings | undefined,
        moduleSpecifier: Expression | undefined,
        attributes: ImportAttributes | undefined,
    ): ExportDeclaration {
        return astFactory.updateExportDeclaration(asNode(node).ast, asNodeArray(modifiers)?.ast, isTypeOnly, asNode(exportClause)?.ast, asNode(moduleSpecifier)?.ast, asNode(attributes)?.ast).node;
    }

    // @api
    function createNamedExports(elements: readonly ExportSpecifier[]): NamedExports {
        return astFactory.createNamedExports(asNodeArray(elements).ast).node;
    }

    // @api
    function updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports {
        return astFactory.updateNamedExports(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createExportSpecifier(isTypeOnly: boolean, propertyName: string | ModuleExportName | undefined, name: string | ModuleExportName): ExportSpecifier {
        return astFactory.createExportSpecifier(isTypeOnly, asName(propertyName)?.ast, asName(name).ast).node;
    }

    // @api
    function updateExportSpecifier(node: ExportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: ModuleExportName): ExportSpecifier {
        return astFactory.updateExportSpecifier(asNode(node).ast, isTypeOnly, asNode(propertyName)?.ast, asNode(name).ast).node;
    }

    // @api
    function createMissingDeclaration(): MissingDeclaration {
        return astFactory.createMissingDeclaration().node;
    }

    //
    // Module references
    //

    // @api
    function createExternalModuleReference(expression: Expression): ExternalModuleReference {
        return astFactory.createExternalModuleReference(asNode(expression).ast).node;
    }

    // @api
    function updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference {
        return astFactory.updateExternalModuleReference(asNode(node).ast, asNode(expression).ast).node;
    }

    //
    // JSDoc
    //

    // @api
    function createJSDocAllType(): JSDocAllType {
        return astFactory.createJSDocAllType().node;
    }

    // @api
    function createJSDocUnknownType(): JSDocUnknownType {
        return astFactory.createJSDocUnknownType().node;
    }

    // @api
    function createJSDocNonNullableType(type: TypeNode, postfix = false): JSDocNonNullableType {
        return astFactory.createJSDocNonNullableType(asNode(type).ast, postfix).node;
    }

    // @api
    function updateJSDocNonNullableType(node: JSDocNonNullableType, type: TypeNode): JSDocNonNullableType {
        return astFactory.updateJSDocNonNullableType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocNullableType(type: TypeNode, postfix = false): JSDocNullableType {
        return astFactory.createJSDocNullableType(asNode(type).ast, postfix).node;
    }

    // @api
    function updateJSDocNullableType(node: JSDocNullableType, type: TypeNode): JSDocNullableType {
        return astFactory.updateJSDocNullableType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocOptionalType(type: TypeNode): JSDocOptionalType {
        return astFactory.createJSDocOptionalType(asNode(type).ast).node;
    }

    // @api
    function updateJSDocOptionalType(node: JSDocOptionalType, type: TypeNode): JSDocOptionalType {
        return astFactory.updateJSDocOptionalType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocVariadicType(type: TypeNode): JSDocVariadicType {
        return astFactory.createJSDocVariadicType(asNode(type).ast).node;
    }

    // @api
    function updateJSDocVariadicType(node: JSDocVariadicType, type: TypeNode): JSDocVariadicType {
        return astFactory.updateJSDocVariadicType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocNamepathType(type: TypeNode): JSDocNamepathType {
        // NOTE: 'type' can be undefined when this is called by parser.
        return astFactory.createJSDocNamepathType(asNode(type)?.ast).node;
    }

    // @api
    function updateJSDocNamepathType(node: JSDocNamepathType, type: TypeNode): JSDocNamepathType {
        return astFactory.updateJSDocNamepathType(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
        return astFactory.createJSDocFunctionType(asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function updateJSDocFunctionType(node: JSDocFunctionType, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType {
        return astFactory.updateJSDocFunctionType(asNode(node).ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType = false): JSDocTypeLiteral {
        return astFactory.createJSDocTypeLiteral(asNodeArray(propertyTags)?.ast, isArrayType).node;
    }

    // @api
    function updateJSDocTypeLiteral(node: JSDocTypeLiteral, propertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean): JSDocTypeLiteral {
        return astFactory.updateJSDocTypeLiteral(asNode(node).ast, asNodeArray(propertyTags)?.ast, isArrayType).node;
    }

    // @api
    function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
        return astFactory.createJSDocTypeExpression(asNode(type).ast).node;
    }

    // @api
    function updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression {
        return astFactory.updateJSDocTypeExpression(asNode(node).ast, asNode(type).ast).node;
    }

    // @api
    function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
        return astFactory.createJSDocSignature(asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature {
        return astFactory.updateJSDocSignature(asNode(node).ast, asNodeArray(typeParameters)?.ast, asNodeArray(parameters).ast, asNode(type)?.ast).node;
    }

    // @api
    function createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag {
        return astFactory.createJSDocTemplateTag(asNode(tagName)?.ast, asNode(constraint)?.ast, asNodeArray(typeParameters).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | NodeArray<JSDocComment> | undefined): JSDocTemplateTag {
        return astFactory.updateJSDocTemplateTag(asNode(node).ast, asNode(tagName)?.ast, asNode(constraint)?.ast, asNodeArray(typeParameters).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag {
        return astFactory.createJSDocTypedefTag(asNode(tagName)?.ast, asNode(typeExpression)?.ast, asNode(fullName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypedefTag {
        return astFactory.updateJSDocTypedefTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression)?.ast, asNode(fullName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag {
        return astFactory.createJSDocParameterTag(asNode(tagName)?.ast, asNode(name).ast, isBracketed, asNode(typeExpression)?.ast, isNameFirst, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocParameterTag {
        return astFactory.updateJSDocParameterTag(asNode(node).ast, asNode(tagName)?.ast, asNode(name).ast, isBracketed, asNode(typeExpression)?.ast, isNameFirst, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag {
        return astFactory.createJSDocPropertyTag(asNode(tagName)?.ast, asNode(name).ast, isBracketed, asNode(typeExpression)?.ast, isNameFirst, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocPropertyTag {
        return astFactory.updateJSDocPropertyTag(asNode(node).ast, asNode(tagName)?.ast, asNode(name).ast, isBracketed, asNode(typeExpression)?.ast, isNameFirst, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag {
        return astFactory.createJSDocCallbackTag(asNode(tagName)?.ast, asNode(typeExpression).ast, asNode(fullName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocCallbackTag {
        return astFactory.updateJSDocCallbackTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression).ast, asNode(fullName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocOverloadTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag {
        return astFactory.createJSDocOverloadTag(asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocOverloadTag(node: JSDocOverloadTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, comment: string | NodeArray<JSDocComment> | undefined): JSDocOverloadTag {
        return astFactory.updateJSDocOverloadTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocClassReference, comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag {
        return astFactory.createJSDocAugmentsTag(asNode(tagName)?.ast, asNode(className).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier | undefined, className: JSDocClassReference, comment: string | NodeArray<JSDocComment> | undefined): JSDocAugmentsTag {
        return astFactory.updateJSDocAugmentsTag(asNode(node).ast, asNode(tagName)?.ast, asNode(className).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocClassReference, comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag {
        return astFactory.createJSDocImplementsTag(asNode(tagName)?.ast, asNode(className).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocSeeTag(tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
        return astFactory.createJSDocSeeTag(asNode(tagName)?.ast, asNode(name)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
        return astFactory.updateJSDocSeeTag(asNode(node).ast, asNode(tagName)?.ast, asNode(name)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference {
        return astFactory.createJSDocNameReference(asNode(name).ast).node;
    }

    // @api
    function updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference {
        return astFactory.updateJSDocNameReference(asNode(node).ast, asNode(name).ast).node;
    }

    // @api
    function createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName {
        return astFactory.createJSDocMemberName(asNode(left).ast, asNode(right).ast).node;
    }

    // @api
    function updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName {
        return astFactory.updateJSDocMemberName(asNode(node).ast, asNode(left).ast, asNode(right).ast).node;
    }

    // @api
    function createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
        return astFactory.createJSDocLink(asNode(name)?.ast, text).node;
    }

    // @api
    function updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
        return astFactory.updateJSDocLink(asNode(node).ast, asNode(name)?.ast, text).node;
    }

    // @api
    function createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
        return astFactory.createJSDocLinkCode(asNode(name)?.ast, text).node;
    }

    // @api
    function updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
        return astFactory.updateJSDocLinkCode(asNode(node).ast, asNode(name)?.ast, text).node;
    }

    // @api
    function createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
        return astFactory.createJSDocLinkPlain(asNode(name)?.ast, text).node;
    }

    // @api
    function updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
        return astFactory.updateJSDocLinkPlain(asNode(node).ast, asNode(name)?.ast, text).node;
    }

    // @api
    function updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier | undefined, className: JSDocClassReference, comment: string | NodeArray<JSDocComment> | undefined): JSDocImplementsTag {
        return astFactory.updateJSDocImplementsTag(asNode(node).ast, asNode(tagName)?.ast, asNode(className).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocAuthorTag {
        return astFactory.createJSDocAuthorTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocAuthorTag(node: JSDocAuthorTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocAuthorTag {
        return astFactory.updateJSDocAuthorTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocClassTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocClassTag {
        return astFactory.createJSDocClassTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocClassTag(node: JSDocClassTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocClassTag {
        return astFactory.updateJSDocClassTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocPublicTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag {
        return astFactory.createJSDocPublicTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPublicTag {
        return astFactory.updateJSDocPublicTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag {
        return astFactory.createJSDocPrivateTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPrivateTag {
        return astFactory.updateJSDocPrivateTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag {
        return astFactory.createJSDocProtectedTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocProtectedTag {
        return astFactory.updateJSDocProtectedTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocReadonlyTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocReadonlyTag {
        return astFactory.createJSDocReadonlyTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReadonlyTag {
        return astFactory.updateJSDocReadonlyTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocOverrideTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag {
        return astFactory.createJSDocOverrideTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocOverrideTag(node: JSDocOverrideTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocOverrideTag {
        return astFactory.updateJSDocOverrideTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocDeprecatedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag {
        return astFactory.createJSDocDeprecatedTag(asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag {
        return astFactory.updateJSDocDeprecatedTag(asNode(node).ast, asNode(tagName)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag {
        return astFactory.createJSDocUnknownTag(asNode(tagName).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined): JSDocUnknownTag {
        return astFactory.updateJSDocUnknownTag(asNode(node).ast, asNode(tagName).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocImportTag(tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes?: ImportAttributes, comment?: string | NodeArray<JSDocComment>): JSDocImportTag {
        return astFactory.createJSDocImportTag(asNode(tagName)?.ast, asNode(importClause)?.ast, asNode(moduleSpecifier).ast, asNode(attributes)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    function updateJSDocImportTag(node: JSDocImportTag, tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocImportTag {
        return astFactory.updateJSDocImportTag(asNode(node).ast, asNode(tagName)?.ast, asNode(importClause)?.ast, asNode(moduleSpecifier).ast, asNode(attributes)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocText(text: string): JSDocText {
        return astFactory.createJSDocText(text).node;
    }

    // @api
    function updateJSDocText(node: JSDocText, text: string): JSDocText {
        return astFactory.updateJSDocText(asNode(node).ast, text).node;
    }

    // @api
    function createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc {
        return astFactory.createJSDocComment(typeof comment === "string" ? comment : asNodeArray(comment)?.ast, asNodeArray(tags)?.ast).node;
    }

    // @api
    function updateJSDocComment(node: JSDoc, comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined): JSDoc {
        return astFactory.updateJSDocComment(asNode(node).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast, asNodeArray(tags)?.ast).node;
    }

    // @api
    function createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag {
        return astFactory.createJSDocTypeTag(asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypeTag {
        return astFactory.updateJSDocTypeTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag {
        return astFactory.createJSDocReturnTag(asNode(tagName)?.ast, asNode(typeExpression)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReturnTag {
        return astFactory.updateJSDocReturnTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocThisTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag {
        return astFactory.createJSDocThisTag(asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocThisTag {
        return astFactory.updateJSDocThisTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocThrowsTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment>): JSDocThrowsTag {
        return astFactory.createJSDocThrowsTag(asNode(tagName)?.ast, asNode(typeExpression)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocThrowsTag(node: JSDocThrowsTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocThrowsTag {
        return astFactory.updateJSDocThrowsTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression)?.ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocEnumTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>) {
        return astFactory.createJSDocEnumTag(asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined) {
        return astFactory.updateJSDocEnumTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function createJSDocSatisfiesTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>) {
        return astFactory.createJSDocSatisfiesTag(asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }

    // @api
    function updateJSDocSatisfiesTag(node: JSDocSatisfiesTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined) {
        return astFactory.updateJSDocSatisfiesTag(asNode(node).ast, asNode(tagName)?.ast, asNode(typeExpression).ast, typeof comment === "string" ? comment : asNodeArray(comment)?.ast).node;
    }


    //
    // JSX
    //

    // @api
    function createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement {
        return astFactory.createJsxElement(asNode(openingElement).ast, asNodeArray(children).ast, asNode(closingElement).ast).node;
    }

    // @api
    function updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement {
        return astFactory.updateJsxElement(asNode(node).ast, asNode(openingElement).ast, asNodeArray(children).ast, asNode(closingElement).ast).node;
    }

    // @api
    function createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement {
        return astFactory.createJsxSelfClosingElement(asNode(tagName).ast, asNodeArray(typeArguments)?.ast, asNode(attributes).ast).node;
    }

    // @api
    function updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement {
        return astFactory.updateJsxSelfClosingElement(asNode(node).ast, asNode(tagName).ast, asNodeArray(typeArguments)?.ast, asNode(attributes).ast).node;
    }

    // @api
    function createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement {
        return astFactory.createJsxOpeningElement(asNode(tagName).ast, asNodeArray(typeArguments)?.ast, asNode(attributes).ast).node;
    }

    // @api
    function updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement {
        return astFactory.updateJsxOpeningElement(asNode(node).ast, asNode(tagName).ast, asNodeArray(typeArguments)?.ast, asNode(attributes).ast).node;
    }

    // @api
    function createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement {
        return astFactory.createJsxClosingElement(asNode(tagName).ast).node;
    }

    // @api
    function updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement {
        return astFactory.updateJsxClosingElement(asNode(node).ast, asNode(tagName).ast).node;
    }

    // @api
    function createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment {
        return astFactory.createJsxFragment(asNode(openingFragment).ast, asNodeArray(children).ast, asNode(closingFragment).ast).node;
    }

    // @api
    function updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment {
        return astFactory.updateJsxFragment(asNode(node).ast, asNode(openingFragment).ast, asNodeArray(children).ast, asNode(closingFragment).ast).node;
    }

    // @api
    function createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText {
        return astFactory.createJsxText(text, containsOnlyTriviaWhiteSpaces).node;
    }

    // @api
    function updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText {
        return astFactory.updateJsxText(asNode(node).ast, text, containsOnlyTriviaWhiteSpaces).node;
    }

    // @api
    function createJsxOpeningFragment(): JsxOpeningFragment {
        return astFactory.createJsxOpeningFragment().node;
    }

    // @api
    function createJsxClosingFragment(): JsxClosingFragment {
        return astFactory.createJsxClosingFragment().node;
    }

    // @api
    function createJsxAttribute(name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute {
        return astFactory.createJsxAttribute(asNode(name).ast, asNode(initializer)?.ast).node;
    }

    // @api
    function updateJsxAttribute(node: JsxAttribute, name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute {
        return astFactory.updateJsxAttribute(asNode(node).ast, asNode(name).ast, asNode(initializer)?.ast).node;
    }

    // @api
    function createJsxAttributes(properties: readonly JsxAttributeLike[]): JsxAttributes {
        return astFactory.createJsxAttributes(asNodeArray(properties).ast).node;
    }

    // @api
    function updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]): JsxAttributes {
        return astFactory.updateJsxAttributes(asNode(node).ast, asNodeArray(properties).ast).node;
    }

    // @api
    function createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute {
        return astFactory.createJsxSpreadAttribute(asNode(expression).ast).node;
    }

    // @api
    function updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute {
        return astFactory.updateJsxSpreadAttribute(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined): JsxExpression {
        return astFactory.createJsxExpression(asNode(dotDotDotToken)?.ast, asNode(expression)?.ast).node;
    }

    // @api
    function updateJsxExpression(node: JsxExpression, expression: Expression | undefined): JsxExpression {
        return astFactory.updateJsxExpression(asNode(node).ast, asNode(expression)?.ast).node;
    }

    // @api
    function createJsxNamespacedName(namespace: Identifier, name: Identifier): JsxNamespacedName {
        return astFactory.createJsxNamespacedName(asNode(namespace).ast, asNode(name).ast).node;
    }

    // @api
    function updateJsxNamespacedName(node: JsxNamespacedName, namespace: Identifier, name: Identifier): JsxNamespacedName {
        return astFactory.updateJsxNamespacedName(asNode(node).ast, asNode(namespace).ast, asNode(name).ast).node;
    }

    //
    // Clauses
    //

    // @api
    function createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause {
        return astFactory.createCaseClause(asNode(expression).ast, asNodeArray(statements).ast).node;
    }

    // @api
    function updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause {
        return astFactory.updateCaseClause(asNode(node).ast, asNode(expression).ast, asNodeArray(statements).ast).node;
    }

    // @api
    function createDefaultClause(statements: readonly Statement[]): DefaultClause {
        return astFactory.createDefaultClause(asNodeArray(statements).ast).node;
    }

    // @api
    function updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause {
        return astFactory.updateDefaultClause(asNode(node).ast, asNodeArray(statements).ast).node;
    }

    // @api
    function createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]): HeritageClause {
        return astFactory.createHeritageClause(token, asNodeArray(types).ast).node;
    }

    // @api
    function updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause {
        return astFactory.updateHeritageClause(asNode(node).ast, asNodeArray(types).ast).node;
    }

    // @api
    function createCatchClause(variableDeclaration: string | BindingName | VariableDeclaration | undefined, block: Block): CatchClause {
        return astFactory.createCatchClause(asVariableDeclaration(variableDeclaration)?.ast, asNode(block).ast).node;
    }

    // @api
    function updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause {
        return astFactory.updateCatchClause(asNode(node).ast, asNode(variableDeclaration)?.ast, asNode(block).ast).node;
    }

    //
    // Property assignments
    //

    // @api
    function createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment {
        return astFactory.createPropertyAssignment(asName(name)?.ast, asNode(initializer).ast).node;
    }

    // @api
    function updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment {
        return astFactory.updatePropertyAssignment(asNode(node).ast, asNode(name).ast, asNode(initializer).ast).node;
    }

    // @api
    function createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment {
        return astFactory.createShorthandPropertyAssignment(asName(name).ast, asNode(objectAssignmentInitializer)?.ast).node;
    }

    // @api
    function updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment {
        return astFactory.updateShorthandPropertyAssignment(asNode(node).ast, asNode(name).ast, asNode(objectAssignmentInitializer)?.ast).node;
    }

    // @api
    function createSpreadAssignment(expression: Expression): SpreadAssignment {
        return astFactory.createSpreadAssignment(asNode(expression).ast).node;
    }

    // @api
    function updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment {
        return astFactory.updateSpreadAssignment(asNode(node).ast, asNode(expression).ast).node;
    }

    //
    // Enum
    //

    // @api
    function createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember {
        return astFactory.createEnumMember(asName(name).ast, asNode(initializer)?.ast).node;
    }

    // @api
    function updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember {
        return astFactory.updateEnumMember(asNode(node).ast, asNode(name).ast, asNode(initializer)?.ast).node;
    }

    //
    // Top-level nodes
    //

    // @api
    function createSourceFile(
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken,
        flags: NodeFlags,
    ): SourceFile {
        return astFactory.createSourceFile(asNodeArray(statements).ast, asNode(endOfFileToken).ast, flags).node;
    }

    // @api
    function createRedirectedSourceFile(redirectInfo: RedirectInfo): SourceFile {
        return astFactory.createRedirectedSourceFile(redirectInfo).node;
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
    ): SourceFile {
        return astFactory.updateSourceFile(
            asNode(node).ast,
            asNodeArray(statements).ast,
            isDeclarationFile,
            referencedFiles,
            typeReferenceDirectives,
            hasNoDefaultLib,
            libReferenceDirectives,
        ).node;
    }

    // @api
    function createBundle(sourceFiles: readonly SourceFile[]): Bundle {
        return astFactory.createBundle(sourceFiles as readonly ast.SourceFile[]).node;
    }

    // @api
    function updateBundle(node: Bundle, sourceFiles: readonly SourceFile[]): Bundle {
        return astFactory.updateBundle(asNode(node).ast, sourceFiles as readonly ast.SourceFile[]).node;
    }

    //
    // Synthetic Nodes (used by checker)
    //

    // @api
    function createSyntheticExpression(type: Type, isSpread = false, tupleNameSource?: ParameterDeclaration | NamedTupleMember): SyntheticExpression {
        return astFactory.createSyntheticExpression(type, isSpread, asNode(tupleNameSource)?.ast).node;
    }

    // @api
    function createSyntaxList(children: readonly Node[]): SyntaxList {
        return astFactory.createSyntaxList(children as readonly ast.Node[]).node;
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
    function createNotEmittedStatement(original: Node): NotEmittedStatement {
        return astFactory.createNotEmittedStatement(asNode(original).ast).node;
    }

    /**
     * Creates a synthetic expression to act as a placeholder for a not-emitted expression in
     * order to preserve comments or sourcemap positions.
     *
     * @param expression The inner expression to emit.
     * @param original The original outer expression.
     */
    // @api
    function createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression {
        return astFactory.createPartiallyEmittedExpression(asNode(expression).ast, asNode(original)?.ast).node;
    }

    // @api
    function updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression {
        return astFactory.updatePartiallyEmittedExpression(asNode(node).ast, asNode(expression).ast).node;
    }

    // @api
    function createNotEmittedTypeElement(): NotEmittedTypeElement {
        return astFactory.createNotEmittedTypeElement().node;
    }

    // @api
    function createCommaListExpression(elements: readonly Expression[]): CommaListExpression {
        return astFactory.createCommaListExpression(asNodeArray(elements).ast).node;
    }

    // @api
    function updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression {
        return astFactory.updateCommaListExpression(asNode(node).ast, asNodeArray(elements).ast).node;
    }

    // @api
    function createSyntheticReferenceExpression(expression: Expression, thisArg: Expression): SyntheticReferenceExpression {
        return astFactory.createSyntheticReferenceExpression(asNode(expression).ast, asNode(thisArg).ast).node;
    }

    // @api
    function updateSyntheticReferenceExpression(node: SyntheticReferenceExpression, expression: Expression, thisArg: Expression): SyntheticReferenceExpression {
        return astFactory.updateSyntheticReferenceExpression(asNode(node).ast, asNode(expression).ast, asNode(thisArg).ast).node;
    }

    // @api
    function cloneNode<T extends Node | undefined>(node: T): T;
    function cloneNode(node: Node | undefined) {
        return node && astFactory.cloneNode(asNode(node).ast).node as Node | undefined;
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

    type ToNode<T extends Node> =
        Expression extends T ? ast.Expression :
        Statement extends T ? ast.Statement :
        TypeNode extends T ? ast.TypeNode :
        TypeElement extends T ? ast.TypeElement :
        ClassElement extends T ? ast.ClassElement :
        ObjectLiteralElement extends T ? ast.ObjectLiteralElement :
        PropertyAccessChain extends T ? ast.PropertyAccessChain :
        ElementAccessChain extends T ? ast.ElementAccessChain :
        CallChain extends T ? ast.CallChain :
        NonNullChain extends T ? ast.NonNullChain :
        ModuleBody extends T ? ast.ModuleBody :
        LiteralExpression extends T ? ast.LiteralExpression :
        JSDocNamespaceDeclaration extends T ? ast.JSDocNamespaceDeclaration :
        JSDocPropertyLikeTag extends T ? ast.JSDocPropertyLikeTag :
        JSDocClassReference extends T ? ast.JSDocClassReference :
        JsxNamespacedName extends T ? ast.JsxNamespacedName :
        ast.NodeType[T["kind"]];

    function asNode<T extends Node>(node: T): ToNode<T>;
    function asNode<T extends Node>(node: T | undefined): ToNode<T> | undefined;
    function asNode(node: Node | undefined): ast.Node | undefined {
        return node as ast.Node | undefined;
    }

    function asNodeArray<T extends Node>(array: readonly T[]): ast.NodeArray<ToNode<T>>;
    function asNodeArray<T extends Node>(array: readonly T[] | undefined): ast.NodeArray<ToNode<T>> | undefined;
    function asNodeArray(array: readonly Node[] | undefined): ast.NodeArray<ast.Node> | undefined {
        return array ? createNodeArray(array) as ast.NodeArray<ast.Node> : undefined;
    }

    function asName<T extends DeclarationName | Identifier | BindingName | PropertyName | NoSubstitutionTemplateLiteral | EntityName | ThisTypeNode>(name: string | T): ToNode<T> | ast.Identifier;
    function asName<T extends DeclarationName | Identifier | BindingName | PropertyName | NoSubstitutionTemplateLiteral | EntityName | ThisTypeNode>(name: string | T | undefined): ToNode<T> | ast.Identifier | undefined;
    function asName(name: string | DeclarationName | Identifier | BindingName | PropertyName | NoSubstitutionTemplateLiteral | EntityName | ThisTypeNode | undefined) {
        return typeof name === "string" ? createIdentifier(name) as ast.Identifier :
            name as Node as ast.Node as ToNode<Node>;
    }

    function asExpression<T extends Expression>(value: string | number | boolean | T): ToNode<T> | ast.StringLiteral | ast.NumericLiteral | ast.BooleanLiteral;
    function asExpression<T extends Expression>(value: string | number | boolean | T | undefined): ToNode<T> | ast.StringLiteral | ast.NumericLiteral | ast.BooleanLiteral | undefined;
    function asExpression(value: string | number | boolean | Expression | undefined): ast.Expression | undefined | ast.StringLiteral | ast.NumericLiteral | ast.BooleanLiteral | undefined {
        return typeof value === "string" ? createStringLiteral(value) as ast.StringLiteral :
            typeof value === "number" ? createNumericLiteral(value) as ast.NumericLiteral :
            typeof value === "boolean" ? value ? createTrue() as ast.TrueLiteral : createFalse() as ast.FalseLiteral :
            value as ast.Expression;
    }

    function asToken<TKind extends TokenSyntaxKind>(value: TKind | Token<TKind>): ast.Token<TKind> {
        return (typeof value === "number" ? createToken(value) : value) as ast.Token<TKind>;
    }

    function asVariableDeclaration(variableDeclaration: string | BindingName | VariableDeclaration | undefined) {
        if (typeof variableDeclaration === "string" || variableDeclaration && !isVariableDeclaration(variableDeclaration)) {
            return createVariableDeclaration(
                variableDeclaration,
                /*exclamationToken*/ undefined,
                /*type*/ undefined,
                /*initializer*/ undefined,
            ) as ast.VariableDeclaration;
        }
        return variableDeclaration as ast.BindingName | ast.VariableDeclaration | undefined;
    }
}

/**
 * Gets the transform flags to exclude when unioning the transform flags of a subtree.
 * @internal
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

export const factory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess | NodeFactoryFlags.Synthesized);

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

/** @internal */
export function mergeEmitNode(sourceEmitNode: EmitNode, destEmitNode: EmitNode | undefined) {
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
