import {
    AccessorDeclaration,
    addRange,
    addRelatedInfo,
    append,
    ArrayBindingElement,
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AssertionLevel,
    AsteriskToken,
    attachFileToDiagnostics,
    AwaitExpression,
    BaseNodeFactory,
    BigIntLiteral,
    BinaryExpression,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    BindingPattern,
    Block,
    BooleanLiteral,
    BreakOrContinueStatement,
    BreakStatement,
    CallExpression,
    CallSignatureDeclaration,
    canHaveJSDoc,
    canHaveModifiers,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    CatchClause,
    CharacterCodes,
    ClassDeclaration,
    ClassElement,
    ClassExpression,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    CommaListExpression,
    CommentDirective,
    commentPragmas,
    CommentRange,
    ComputedPropertyName,
    concatenate,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    containsParseError,
    ContinueStatement,
    convertToJson,
    createDetachedDiagnostic,
    createNodeFactory,
    createScanner,
    createTextChangeRange,
    createTextSpanFromBounds,
    Debug,
    Decorator,
    DefaultClause,
    DeleteExpression,
    Diagnostic,
    DiagnosticArguments,
    DiagnosticMessage,
    Diagnostics,
    DiagnosticWithDetachedLocation,
    DoStatement,
    DotDotDotToken,
    ElementAccessExpression,
    emptyArray,
    emptyMap,
    EndOfFileToken,
    ensureScriptKind,
    EntityName,
    EnumDeclaration,
    EnumMember,
    ExclamationToken,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    Extension,
    ExternalModuleReference,
    fileExtensionIs,
    findIndex,
    firstOrUndefined,
    forEach,
    ForEachChildNodes,
    ForInOrOfStatement,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionOrConstructorTypeNode,
    FunctionTypeNode,
    GetAccessorDeclaration,
    getAnyExtensionFromPath,
    getBaseFileName,
    getBinaryOperatorPrecedence,
    getFullWidth,
    getJSDocCommentRanges,
    getLanguageVariant,
    getLastChild,
    getLeadingCommentRanges,
    getSpellingSuggestion,
    getTextOfNodeFromSourceText,
    HasJSDoc,
    hasJSDocNodes,
    HasModifiers,
    HeritageClause,
    Identifier,
    identity,
    idText,
    IfStatement,
    ImportAttribute,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportOrExportSpecifier,
    ImportSpecifier,
    ImportTypeAssertionContainer,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    IntersectionTypeNode,
    isArray,
    isAssignmentOperator,
    isAsyncModifier,
    isClassMemberModifier,
    isExportAssignment,
    isExportDeclaration,
    isExportModifier,
    isExpressionWithTypeArguments,
    isExternalModuleReference,
    isFunctionTypeNode,
    isIdentifier as isIdentifierNode,
    isIdentifierText,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isJSDocFunctionType,
    isJSDocNullableType,
    isJSDocReturnTag,
    isJSDocTypeTag,
    isJsxNamespacedName,
    isJsxOpeningElement,
    isJsxOpeningFragment,
    isKeyword,
    isKeywordOrPunctuation,
    isLeftHandSideExpression,
    isLiteralKind,
    isMetaProperty,
    isModifierKind,
    isNonNullExpression,
    isPrivateIdentifier,
    isSetAccessorDeclaration,
    isStringOrNumericLiteralLike,
    isTaggedTemplateExpression,
    isTemplateLiteralKind,
    isTypeReferenceNode,
    IterationStatement,
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
    JSDocNameReference,
    JSDocNamespaceDeclaration,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocParsingMode,
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
    JSDocSyntaxKind,
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
    JsonMinusNumericLiteral,
    JsonObjectExpressionStatement,
    JsonSourceFile,
    JsxAttribute,
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
    JsxOpeningLikeElement,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    JsxTagNameExpression,
    JsxText,
    JsxTokenSyntaxKind,
    LabeledStatement,
    LanguageVariant,
    lastOrUndefined,
    LeftHandSideExpression,
    LiteralExpression,
    LiteralLikeNode,
    LiteralTypeNode,
    map,
    mapDefined,
    MappedTypeNode,
    MemberExpression,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MinusToken,
    MissingDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    modifiersToFlags,
    ModuleBlock,
    ModuleDeclaration,
    ModuleExportName,
    ModuleKind,
    Mutable,
    NamedExportBindings,
    NamedExports,
    NamedImports,
    NamedImportsOrExports,
    NamedTupleMember,
    NamespaceDeclaration,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NodeFactory,
    NodeFactoryFlags,
    NodeFlags,
    nodeIsMissing,
    nodeIsPresent,
    NonNullExpression,
    noop,
    normalizePath,
    NoSubstitutionTemplateLiteral,
    NullLiteral,
    NumericLiteral,
    objectAllocator,
    ObjectBindingPattern,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    OperatorPrecedence,
    OptionalTypeNode,
    PackageJsonInfo,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    PlusToken,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PragmaContext,
    PragmaDefinition,
    PragmaKindFlags,
    PragmaMap,
    PragmaPseudoMap,
    PragmaPseudoMapEntry,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PrimaryExpression,
    PrivateIdentifier,
    PropertyAccessEntityNameExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    PunctuationOrKeywordSyntaxKind,
    PunctuationSyntaxKind,
    QualifiedName,
    QuestionDotToken,
    QuestionToken,
    ReadonlyKeyword,
    ReadonlyPragmaMap,
    ResolutionMode,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    ScriptKind,
    ScriptTarget,
    SetAccessorDeclaration,
    setParent,
    setParentRecursive,
    setTextRange,
    setTextRangePos,
    setTextRangePosEnd,
    setTextRangePosWidth,
    ShorthandPropertyAssignment,
    skipTrivia,
    some,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    startsWith,
    Statement,
    StringLiteral,
    supportedDeclarationExtensions,
    SwitchStatement,
    SyntaxKind,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead,
    TemplateLiteralToken,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateMiddle,
    TemplateSpan,
    TemplateTail,
    TextChangeRange,
    textChangeRangeIsUnchanged,
    textChangeRangeNewSpan,
    TextRange,
    textSpanEnd,
    textToKeywordObj,
    ThisExpression,
    ThisTypeNode,
    ThrowStatement,
    toArray,
    Token,
    TokenFlags,
    tokenIsIdentifierOrKeyword,
    tokenIsIdentifierOrKeywordOrGreaterThan,
    tokenToString,
    tracing,
    transferSourceFileChildren,
    TransformFlags,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnaryExpression,
    unescapeLeadingUnderscores,
    UnionOrIntersectionTypeNode,
    UnionTypeNode,
    unsetNodeChildren,
    UpdateExpression,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "./_namespaces/ts.js";
import * as performance from "./_namespaces/ts.performance.js";

const enum SignatureFlags {
    None = 0,
    Yield = 1 << 0,
    Await = 1 << 1,
    Type = 1 << 2,
    IgnoreMissingOpenBrace = 1 << 4,
    JSDoc = 1 << 5,
}

const enum SpeculationKind {
    TryParse,
    Lookahead,
    Reparse,
}

let NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
let TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
let IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Node;
let PrivateIdentifierConstructor: new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => Node;
let SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => Node;

/**
 * NOTE: You should not use this, it is only exported to support `createNode` in `~/src/deprecatedCompat/deprecations.ts`.
 *
 * @internal
 * @knipignore
 */
export const parseBaseNodeFactory: BaseNodeFactory = {
    createBaseSourceFileNode: kind => new (SourceFileConstructor || (SourceFileConstructor = objectAllocator.getSourceFileConstructor()))(kind, -1, -1),
    createBaseIdentifierNode: kind => new (IdentifierConstructor || (IdentifierConstructor = objectAllocator.getIdentifierConstructor()))(kind, -1, -1),
    createBasePrivateIdentifierNode: kind => new (PrivateIdentifierConstructor || (PrivateIdentifierConstructor = objectAllocator.getPrivateIdentifierConstructor()))(kind, -1, -1),
    createBaseTokenNode: kind => new (TokenConstructor || (TokenConstructor = objectAllocator.getTokenConstructor()))(kind, -1, -1),
    createBaseNode: kind => new (NodeConstructor || (NodeConstructor = objectAllocator.getNodeConstructor()))(kind, -1, -1),
};

/** @internal */
export const parseNodeFactory: NodeFactory = createNodeFactory(NodeFactoryFlags.NoParenthesizerRules, parseBaseNodeFactory);

function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {
    return node && cbNode(node);
}

function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((node: NodeArray<Node>) => T | undefined) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {
    if (nodes) {
        if (cbNodes) {
            return cbNodes(nodes);
        }
        for (const node of nodes) {
            const result = cbNode(node);
            if (result) {
                return result;
            }
        }
    }
}

/** @internal */
export function isJSDocLikeText(text: string, start: number): boolean {
    return text.charCodeAt(start + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 3) !== CharacterCodes.slash;
}

/** @internal */
export function isFileProbablyExternalModule(sourceFile: SourceFile): Node | undefined {
    // Try to use the first top-level import/export when available, then
    // fall back to looking for an 'import.meta' somewhere in the tree if necessary.
    return forEach(sourceFile.statements, isAnExternalModuleIndicatorNode) ||
        getImportMetaIfNecessary(sourceFile);
}

function isAnExternalModuleIndicatorNode(node: Node) {
    return canHaveModifiers(node) && hasModifierOfKind(node, SyntaxKind.ExportKeyword)
            || isImportEqualsDeclaration(node) && isExternalModuleReference(node.moduleReference)
            || isImportDeclaration(node)
            || isExportAssignment(node)
            || isExportDeclaration(node) ? node : undefined;
}

function getImportMetaIfNecessary(sourceFile: SourceFile) {
    return sourceFile.flags & NodeFlags.PossiblyContainsImportMeta ?
        walkTreeForImportMeta(sourceFile) :
        undefined;
}

function walkTreeForImportMeta(node: Node): Node | undefined {
    return isImportMeta(node) ? node : forEachChild(node, walkTreeForImportMeta);
}

/** Do not use hasModifier inside the parser; it relies on parent pointers. Use this instead. */
function hasModifierOfKind(node: HasModifiers, kind: SyntaxKind) {
    return some(node.modifiers, m => m.kind === kind);
}

function isImportMeta(node: Node): boolean {
    return isMetaProperty(node) && node.keywordToken === SyntaxKind.ImportKeyword && node.name.escapedText === "meta";
}

type ForEachChildFunction<TNode> = <T>(node: TNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined) => T | undefined;
type ForEachChildTable = { [TNode in ForEachChildNodes as TNode["kind"]]: ForEachChildFunction<TNode>; };
const forEachChildTable: ForEachChildTable = {
    [SyntaxKind.QualifiedName]: function forEachChildInQualifiedName<T>(node: QualifiedName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.TypeParameter]: function forEachChildInTypeParameter<T>(node: TypeParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.constraint) ||
            visitNode(cbNode, node.default) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ShorthandPropertyAssignment]: function forEachChildInShorthandPropertyAssignment<T>(node: ShorthandPropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.equalsToken) ||
            visitNode(cbNode, node.objectAssignmentInitializer);
    },
    [SyntaxKind.SpreadAssignment]: function forEachChildInSpreadAssignment<T>(node: SpreadAssignment, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: PropertyDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: PropertySignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: PropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.BindingElement]: function forEachChildInBindingElement<T>(node: BindingElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.propertyName) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.IndexSignature]: function forEachChildInIndexSignature<T>(node: IndexSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.ConstructorType]: function forEachChildInConstructorType<T>(node: ConstructorTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.FunctionType]: function forEachChildInFunctionType<T>(node: FunctionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.CallSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.ConstructSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.MethodDeclaration]: function forEachChildInMethodDeclaration<T>(node: MethodDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.MethodSignature]: function forEachChildInMethodSignature<T>(node: MethodSignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.Constructor]: function forEachChildInConstructor<T>(node: ConstructorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.GetAccessor]: function forEachChildInGetAccessor<T>(node: GetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.SetAccessor]: function forEachChildInSetAccessor<T>(node: SetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ArrowFunction]: function forEachChildInArrowFunction<T>(node: ArrowFunction, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.equalsGreaterThanToken) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ClassStaticBlockDeclaration]: function forEachChildInClassStaticBlockDeclaration<T>(node: ClassStaticBlockDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.TypeReference]: function forEachChildInTypeReference<T>(node: TypeReferenceNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.TypePredicate]: function forEachChildInTypePredicate<T>(node: TypePredicateNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertsModifier) ||
            visitNode(cbNode, node.parameterName) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.TypeQuery]: function forEachChildInTypeQuery<T>(node: TypeQueryNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.exprName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: TypeLiteralNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: ArrayTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.elementType);
    },
    [SyntaxKind.TupleType]: function forEachChildInTupleType<T>(node: TupleTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.UnionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.IntersectionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.ConditionalType]: function forEachChildInConditionalType<T>(node: ConditionalTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.checkType) ||
            visitNode(cbNode, node.extendsType) ||
            visitNode(cbNode, node.trueType) ||
            visitNode(cbNode, node.falseType);
    },
    [SyntaxKind.InferType]: function forEachChildInInferType<T>(node: InferTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeParameter);
    },
    [SyntaxKind.ImportType]: function forEachChildInImportType<T>(node: ImportTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.argument) ||
            visitNode(cbNode, node.attributes) ||
            visitNode(cbNode, node.qualifier) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.ImportTypeAssertionContainer]: function forEachChildInImportTypeAssertionContainer<T>(node: ImportTypeAssertionContainer, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertClause);
    },
    [SyntaxKind.ParenthesizedType]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.TypeOperator]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.IndexedAccessType]: function forEachChildInIndexedAccessType<T>(node: IndexedAccessTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.objectType) ||
            visitNode(cbNode, node.indexType);
    },
    [SyntaxKind.MappedType]: function forEachChildInMappedType<T>(node: MappedTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.readonlyToken) ||
            visitNode(cbNode, node.typeParameter) ||
            visitNode(cbNode, node.nameType) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.LiteralType]: function forEachChildInLiteralType<T>(node: LiteralTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.literal);
    },
    [SyntaxKind.NamedTupleMember]: function forEachChildInNamedTupleMember<T>(node: NamedTupleMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.ObjectBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: ArrayLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.ObjectLiteralExpression]: function forEachChildInObjectLiteralExpression<T>(node: ObjectLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: PropertyAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: ElementAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.argumentExpression);
    },
    [SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.NewExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.TaggedTemplateExpression]: function forEachChildInTaggedTemplateExpression<T>(node: TaggedTemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tag) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNode(cbNode, node.template);
    },
    [SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: TypeAssertion, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: ParenthesizedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.DeleteExpression]: function forEachChildInDeleteExpression<T>(node: DeleteExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TypeOfExpression]: function forEachChildInTypeOfExpression<T>(node: TypeOfExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.VoidExpression]: function forEachChildInVoidExpression<T>(node: VoidExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.YieldExpression]: function forEachChildInYieldExpression<T>(node: YieldExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.AwaitExpression]: function forEachChildInAwaitExpression<T>(node: AwaitExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.AsExpression]: function forEachChildInAsExpression<T>(node: AsExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.NonNullExpression]: function forEachChildInNonNullExpression<T>(node: NonNullExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.SatisfiesExpression]: function forEachChildInSatisfiesExpression<T>(node: SatisfiesExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) || visitNode(cbNode, node.type);
    },
    [SyntaxKind.MetaProperty]: function forEachChildInMetaProperty<T>(node: MetaProperty, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: ConditionalExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.whenTrue) ||
            visitNode(cbNode, node.colonToken) ||
            visitNode(cbNode, node.whenFalse);
    },
    [SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: SpreadElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.Block]: forEachChildInBlock,
    [SyntaxKind.ModuleBlock]: forEachChildInBlock,
    [SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: SourceFile, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements) ||
            visitNode(cbNode, node.endOfFileToken);
    },
    [SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: VariableStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.declarationList);
    },
    [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations);
    },
    [SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: ExpressionStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: IfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.thenStatement) ||
            visitNode(cbNode, node.elseStatement);
    },
    [SyntaxKind.DoStatement]: function forEachChildInDoStatement<T>(node: DoStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.statement) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: WhileStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: ForStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.incrementor) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForInStatement]: function forEachChildInForInStatement<T>(node: ForInStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForOfStatement]: function forEachChildInForOfStatement<T>(node: ForOfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.awaitModifier) ||
            visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.WithStatement]: function forEachChildInWithStatement<T>(node: WithStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.caseBlock);
    },
    [SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: CaseBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.clauses);
    },
    [SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: CaseClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.statements);
    },
    [SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: DefaultClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    },
    [SyntaxKind.LabeledStatement]: function forEachChildInLabeledStatement<T>(node: LabeledStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.label) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ThrowStatement]: function forEachChildInThrowStatement<T>(node: ThrowStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TryStatement]: function forEachChildInTryStatement<T>(node: TryStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tryBlock) ||
            visitNode(cbNode, node.catchClause) ||
            visitNode(cbNode, node.finallyBlock);
    },
    [SyntaxKind.CatchClause]: function forEachChildInCatchClause<T>(node: CatchClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.variableDeclaration) ||
            visitNode(cbNode, node.block);
    },
    [SyntaxKind.Decorator]: function forEachChildInDecorator<T>(node: Decorator, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ClassDeclaration]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.ClassExpression]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.InterfaceDeclaration]: function forEachChildInInterfaceDeclaration<T>(node: InterfaceDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.TypeAliasDeclaration]: function forEachChildInTypeAliasDeclaration<T>(node: TypeAliasDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.EnumDeclaration]: function forEachChildInEnumDeclaration<T>(node: EnumDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.EnumMember]: function forEachChildInEnumMember<T>(node: EnumMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.ModuleDeclaration]: function forEachChildInModuleDeclaration<T>(node: ModuleDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ImportEqualsDeclaration]: function forEachChildInImportEqualsDeclaration<T>(node: ImportEqualsDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.moduleReference);
    },
    [SyntaxKind.ImportDeclaration]: function forEachChildInImportDeclaration<T>(node: ImportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.importClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.attributes);
    },
    [SyntaxKind.ImportClause]: function forEachChildInImportClause<T>(node: ImportClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.namedBindings);
    },
    [SyntaxKind.ImportAttributes]: function forEachChildInImportAttributes<T>(node: ImportAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.ImportAttribute]: function forEachChildInImportAttribute<T>(node: ImportAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.value);
    },
    [SyntaxKind.NamespaceExportDeclaration]: function forEachChildInNamespaceExportDeclaration<T>(node: NamespaceExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamespaceImport]: function forEachChildInNamespaceImport<T>(node: NamespaceImport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamespaceExport]: function forEachChildInNamespaceExport<T>(node: NamespaceExport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamedImports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.NamedExports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.ExportDeclaration]: function forEachChildInExportDeclaration<T>(node: ExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.exportClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.attributes);
    },
    [SyntaxKind.ImportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportAssignment]: function forEachChildInExportAssignment<T>(node: ExportAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TemplateExpression]: function forEachChildInTemplateExpression<T>(node: TemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [SyntaxKind.TemplateSpan]: function forEachChildInTemplateSpan<T>(node: TemplateSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.literal);
    },
    [SyntaxKind.TemplateLiteralType]: function forEachChildInTemplateLiteralType<T>(node: TemplateLiteralTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [SyntaxKind.TemplateLiteralTypeSpan]: function forEachChildInTemplateLiteralTypeSpan<T>(node: TemplateLiteralTypeSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.literal);
    },
    [SyntaxKind.ComputedPropertyName]: function forEachChildInComputedPropertyName<T>(node: ComputedPropertyName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.HeritageClause]: function forEachChildInHeritageClause<T>(node: HeritageClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    },
    [SyntaxKind.ExpressionWithTypeArguments]: function forEachChildInExpressionWithTypeArguments<T>(node: ExpressionWithTypeArguments, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.ExternalModuleReference]: function forEachChildInExternalModuleReference<T>(node: ExternalModuleReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: MissingDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers);
    },
    [SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: CommaListExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.JsxElement]: function forEachChildInJsxElement<T>(node: JsxElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingElement) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingElement);
    },
    [SyntaxKind.JsxFragment]: function forEachChildInJsxFragment<T>(node: JsxFragment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingFragment) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingFragment);
    },
    [SyntaxKind.JsxSelfClosingElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxOpeningElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxAttributes]: function forEachChildInJsxAttributes<T>(node: JsxAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [SyntaxKind.JsxAttribute]: function forEachChildInJsxAttribute<T>(node: JsxAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.JsxSpreadAttribute]: function forEachChildInJsxSpreadAttribute<T>(node: JsxSpreadAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.JsxExpression]: function forEachChildInJsxExpression<T>(node: JsxExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.JsxClosingElement]: function forEachChildInJsxClosingElement<T>(node: JsxClosingElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    },
    [SyntaxKind.JsxNamespacedName]: function forEachChildInJsxNamespacedName<T>(node: JsxNamespacedName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.namespace) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.OptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.RestType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNonNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocOptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocFunctionType]: function forEachChildInJSDocFunctionType<T>(node: JSDocFunctionType, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(node: JSDoc, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
            || visitNodes(cbNode, cbNodes, node.tags);
    },
    [SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: JSDocSeeTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.name) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: JSDocNameReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: JSDocMemberName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: JSDocAuthorTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: JSDocImplementsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: JSDocAugmentsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: JSDocTemplateTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.constraint) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: JSDocTypedefTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.typeExpression &&
                    node.typeExpression.kind === SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.typeExpression) ||
                    visitNode(cbNode, node.fullName) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
                : visitNode(cbNode, node.fullName) ||
                    visitNode(cbNode, node.typeExpression) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment)));
    },
    [SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: JSDocCallbackTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.fullName) ||
            visitNode(cbNode, node.typeExpression) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocReturnTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocTypeTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThisTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocEnumTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSatisfiesTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThrowsTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocOverloadTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: JSDocSignature, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return forEach(node.typeParameters, cbNode) ||
            forEach(node.parameters, cbNode) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: JSDocTypeLiteral, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return forEach(node.jsDocPropertyTags, cbNode);
    },
    [SyntaxKind.JSDocTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocClassTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPublicTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPrivateTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocProtectedTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocReadonlyTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocDeprecatedTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocOverrideTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocImportTag]: forEachChildInJSDocImportTag,
    [SyntaxKind.PartiallyEmittedExpression]: forEachChildInPartiallyEmittedExpression,
};

// shared

function forEachChildInCallOrConstructSignature<T>(node: CallSignatureDeclaration | ConstructSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.parameters) ||
        visitNode(cbNode, node.type);
}

function forEachChildInUnionOrIntersectionType<T>(node: UnionTypeNode | IntersectionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.types);
}

function forEachChildInParenthesizedTypeOrTypeOperator<T>(node: ParenthesizedTypeNode | TypeOperatorNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInObjectOrArrayBindingPattern<T>(node: BindingPattern, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInCallOrNewExpression<T>(node: CallExpression | NewExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.expression) ||
        // TODO: should we separate these branches out?
        visitNode(cbNode, (node as CallExpression).questionDotToken) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNodes(cbNode, cbNodes, node.arguments);
}

function forEachChildInBlock<T>(node: Block | ModuleBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.statements);
}

function forEachChildInContinueOrBreakStatement<T>(node: ContinueStatement | BreakStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.label);
}

function forEachChildInClassDeclarationOrExpression<T>(node: ClassDeclaration | ClassExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.modifiers) ||
        visitNode(cbNode, node.name) ||
        visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.heritageClauses) ||
        visitNodes(cbNode, cbNodes, node.members);
}

function forEachChildInNamedImportsOrExports<T>(node: NamedImports | NamedExports, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInImportOrExportSpecifier<T>(node: ImportSpecifier | ExportSpecifier, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.propertyName) ||
        visitNode(cbNode, node.name);
}

function forEachChildInJsxOpeningOrSelfClosingElement<T>(node: JsxOpeningLikeElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNode(cbNode, node.attributes);
}

function forEachChildInOptionalRestOrJSDocParameterModifier<T>(node: OptionalTypeNode | RestTypeNode | JSDocTypeExpression | JSDocNullableType | JSDocNonNullableType | JSDocOptionalType | JSDocVariadicType, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInJSDocParameterOrPropertyTag<T>(node: JSDocParameterTag | JSDocPropertyTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        (node.isNameFirst
            ? visitNode(cbNode, node.name) || visitNode(cbNode, node.typeExpression)
            : visitNode(cbNode, node.typeExpression) || visitNode(cbNode, node.name)) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocTypeLikeTag<T>(node: JSDocReturnTag | JSDocTypeTag | JSDocThisTag | JSDocEnumTag | JSDocThrowsTag | JSDocOverloadTag | JSDocSatisfiesTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNode(cbNode, node.typeExpression) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocLinkCodeOrPlain<T>(node: JSDocLink | JSDocLinkCode | JSDocLinkPlain, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.name);
}

function forEachChildInJSDocTag<T>(node: JSDocUnknownTag | JSDocClassTag | JSDocPublicTag | JSDocPrivateTag | JSDocProtectedTag | JSDocReadonlyTag | JSDocDeprecatedTag | JSDocOverrideTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocImportTag<T>(node: JSDocImportTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || visitNode(cbNode, node.importClause)
        || visitNode(cbNode, node.moduleSpecifier)
        || visitNode(cbNode, node.attributes)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInPartiallyEmittedExpression<T>(node: PartiallyEmittedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.expression);
}

/**
 * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
 * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
 * embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
 * a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
 *
 * @param node a given node to visit its children
 * @param cbNode a callback to be invoked for all child nodes
 * @param cbNodes a callback to be invoked for embedded array
 *
 * @remarks `forEachChild` must visit the children of a node in the order
 * that they appear in the source code. The language service depends on this property to locate nodes by position.
 */
export function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    if (node === undefined || node.kind <= SyntaxKind.LastToken) {
        return;
    }
    const fn = (forEachChildTable as Record<SyntaxKind, ForEachChildFunction<any>>)[node.kind];
    return fn === undefined ? undefined : fn(node, cbNode, cbNodes);
}

/**
 * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
 * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; additionally,
 * unlike `forEachChild`, embedded arrays are flattened and the 'cbNode' callback is invoked for each element.
 *  If a callback returns a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
 *
 * @param node a given node to visit its children
 * @param cbNode a callback to be invoked for all child nodes
 * @param cbNodes a callback to be invoked for embedded array
 *
 * @remarks Unlike `forEachChild`, `forEachChildRecursively` handles recursively invoking the traversal on each child node found,
 * and while doing so, handles traversing the structure without relying on the callstack to encode the tree structure.
 *
 * @internal
 */
export function forEachChildRecursively<T>(rootNode: Node, cbNode: (node: Node, parent: Node) => T | "skip" | undefined, cbNodes?: (nodes: NodeArray<Node>, parent: Node) => T | "skip" | undefined): T | undefined {
    const queue: (Node | NodeArray<Node>)[] = gatherPossibleChildren(rootNode);
    const parents: Node[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const current = queue.pop()!;
        const parent = parents.pop()!;
        if (isArray(current)) {
            if (cbNodes) {
                const res = cbNodes(current, parent);
                if (res) {
                    if (res === "skip") continue;
                    return res;
                }
            }
            for (let i = current.length - 1; i >= 0; --i) {
                queue.push(current[i]);
                parents.push(parent);
            }
        }
        else {
            const res = cbNode(current, parent);
            if (res) {
                if (res === "skip") continue;
                return res;
            }
            if (current.kind >= SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(current)) {
                    queue.push(child);
                    parents.push(current);
                }
            }
        }
    }
}

function gatherPossibleChildren(node: Node) {
    const children: (Node | NodeArray<Node>)[] = [];
    forEachChild(node, addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addWorkItem(n: Node | NodeArray<Node>) {
        children.unshift(n);
    }
}

export interface CreateSourceFileOptions {
    languageVersion: ScriptTarget;
    /**
     * Controls the format the file is detected as - this can be derived from only the path
     * and files on disk, but needs to be done with a module resolution cache in scope to be performant.
     * This is usually `undefined` for compilations that do not have `moduleResolution` values of `node16` or `nodenext`.
     */
    impliedNodeFormat?: ResolutionMode;
    /**
     * Controls how module-y-ness is set for the given file. Usually the result of calling
     * `getSetExternalModuleIndicator` on a valid `CompilerOptions` object. If not present, the default
     * check specified by `isFileProbablyExternalModule` will be used to set the field.
     */
    setExternalModuleIndicator?: (file: SourceFile) => void;
    /** @internal */ packageJsonLocations?: readonly string[];
    /** @internal */ packageJsonScope?: PackageJsonInfo;
    jsDocParsingMode?: JSDocParsingMode;
}

function setExternalModuleIndicator(sourceFile: SourceFile) {
    sourceFile.externalModuleIndicator = isFileProbablyExternalModule(sourceFile);
}

export function createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes = false, scriptKind?: ScriptKind): SourceFile {
    tracing?.push(tracing.Phase.Parse, "createSourceFile", { path: fileName }, /*separateBeginAndEnd*/ true);
    performance.mark("beforeParse");
    let result: SourceFile;

    const {
        languageVersion,
        setExternalModuleIndicator: overrideSetExternalModuleIndicator,
        impliedNodeFormat: format,
        jsDocParsingMode,
    } = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions : ({ languageVersion: languageVersionOrOptions } as CreateSourceFileOptions);
    if (languageVersion === ScriptTarget.JSON) {
        result = Parser.parseSourceFile(fileName, sourceText, languageVersion, /*syntaxCursor*/ undefined, setParentNodes, ScriptKind.JSON, noop, jsDocParsingMode);
    }
    else {
        const setIndicator = format === undefined ? overrideSetExternalModuleIndicator : (file: SourceFile) => {
            file.impliedNodeFormat = format;
            return (overrideSetExternalModuleIndicator || setExternalModuleIndicator)(file);
        };
        result = Parser.parseSourceFile(fileName, sourceText, languageVersion, /*syntaxCursor*/ undefined, setParentNodes, scriptKind, setIndicator, jsDocParsingMode);
    }

    performance.mark("afterParse");
    performance.measure("Parse", "beforeParse", "afterParse");
    tracing?.pop();
    return result;
}

export function parseIsolatedEntityName(text: string, languageVersion: ScriptTarget): EntityName | undefined {
    return Parser.parseIsolatedEntityName(text, languageVersion);
}

/**
 * Parse json text into SyntaxTree and return node and parse errors if any
 * @param fileName
 * @param sourceText
 */
export function parseJsonText(fileName: string, sourceText: string): JsonSourceFile {
    return Parser.parseJsonText(fileName, sourceText);
}

// See also `isExternalOrCommonJsModule` in utilities.ts
export function isExternalModule(file: SourceFile): boolean {
    return file.externalModuleIndicator !== undefined;
}

// Produces a new SourceFile for the 'newText' provided. The 'textChangeRange' parameter
// indicates what changed between the 'text' that this SourceFile has and the 'newText'.
// The SourceFile will be created with the compiler attempting to reuse as many nodes from
// this file as possible.
//
// Note: this function mutates nodes from this SourceFile. That means any existing nodes
// from this SourceFile that are being held onto may change as a result (including
// becoming detached from any SourceFile).  It is recommended that this SourceFile not
// be used once 'update' is called on it.
export function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks = false): SourceFile {
    const newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
    // Because new source file node is created, it may not have the flag PossiblyContainDynamicImport. This is the case if there is no new edit to add dynamic import.
    // We will manually port the flag to the new source file.
    (newSourceFile as Mutable<SourceFile>).flags |= sourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags;
    return newSourceFile;
}

/** @internal */
export interface JsDocWithDiagnostics {
    jsDoc: JSDoc;
    diagnostics: Diagnostic[];
}

/** @internal */
export function parseIsolatedJSDocComment(content: string, start?: number, length?: number): JsDocWithDiagnostics | undefined {
    const result = Parser.JSDocParser.parseIsolatedJSDocComment(content, start, length);
    if (result && result.jsDoc) {
        // because the jsDocComment was parsed out of the source file, it might
        // not be covered by the fixupParentReferences.
        Parser.fixupParentReferences(result.jsDoc);
    }

    return result;
}

/** @internal */
// Exposed only for testing.
export function parseJSDocTypeExpressionForTests(content: string, start?: number, length?: number): {
    jsDocTypeExpression: JSDocTypeExpression;
    diagnostics: Diagnostic[];
} | undefined {
    return Parser.JSDocParser.parseJSDocTypeExpressionForTests(content, start, length);
}

// Implement the parser as a singleton module.  We do this for perf reasons because creating
// parser instances can actually be expensive enough to impact us on projects with many source
// files.
namespace Parser {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */

    // Share a single scanner across all calls to parse a source file.  This helps speed things
    // up by avoiding the cost of creating/compiling scanners over and over again.
    var scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true);

    var disallowInAndDecoratorContext = NodeFlags.DisallowInContext | NodeFlags.DecoratorContext;

    // capture constructors in 'initializeState' to avoid null checks
    var NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    var TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node;
    var IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;
    var PrivateIdentifierConstructor: new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier;
    var SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;

    function countNode(node: Node) {
        nodeCount++;
        return node;
    }

    // Rather than using `createBaseNodeFactory` here, we establish a `BaseNodeFactory` that closes over the
    // constructors above, which are reset each time `initializeState` is called.
    var baseNodeFactory: BaseNodeFactory = {
        createBaseSourceFileNode: kind => countNode(new SourceFileConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseIdentifierNode: kind => countNode(new IdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBasePrivateIdentifierNode: kind => countNode(new PrivateIdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseTokenNode: kind => countNode(new TokenConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseNode: kind => countNode(new NodeConstructor(kind, /*pos*/ 0, /*end*/ 0)),
    };

    var factory = createNodeFactory(NodeFactoryFlags.NoParenthesizerRules | NodeFactoryFlags.NoNodeConverters | NodeFactoryFlags.NoOriginalNode, baseNodeFactory);

    var {
        createNodeArray: factoryCreateNodeArray,
        createNumericLiteral: factoryCreateNumericLiteral,
        createStringLiteral: factoryCreateStringLiteral,
        createLiteralLikeNode: factoryCreateLiteralLikeNode,
        createIdentifier: factoryCreateIdentifier,
        createPrivateIdentifier: factoryCreatePrivateIdentifier,
        createToken: factoryCreateToken,
        createArrayLiteralExpression: factoryCreateArrayLiteralExpression,
        createObjectLiteralExpression: factoryCreateObjectLiteralExpression,
        createPropertyAccessExpression: factoryCreatePropertyAccessExpression,
        createPropertyAccessChain: factoryCreatePropertyAccessChain,
        createElementAccessExpression: factoryCreateElementAccessExpression,
        createElementAccessChain: factoryCreateElementAccessChain,
        createCallExpression: factoryCreateCallExpression,
        createCallChain: factoryCreateCallChain,
        createNewExpression: factoryCreateNewExpression,
        createParenthesizedExpression: factoryCreateParenthesizedExpression,
        createBlock: factoryCreateBlock,
        createVariableStatement: factoryCreateVariableStatement,
        createExpressionStatement: factoryCreateExpressionStatement,
        createIfStatement: factoryCreateIfStatement,
        createWhileStatement: factoryCreateWhileStatement,
        createForStatement: factoryCreateForStatement,
        createForOfStatement: factoryCreateForOfStatement,
        createVariableDeclaration: factoryCreateVariableDeclaration,
        createVariableDeclarationList: factoryCreateVariableDeclarationList,
    } = factory;

    var fileName: string;
    var sourceFlags: NodeFlags;
    var sourceText: string;
    var languageVersion: ScriptTarget;
    var scriptKind: ScriptKind;
    var languageVariant: LanguageVariant;
    var parseDiagnostics: DiagnosticWithDetachedLocation[];
    var jsDocDiagnostics: DiagnosticWithDetachedLocation[];
    var syntaxCursor: IncrementalParser.SyntaxCursor | undefined;

    var currentToken: SyntaxKind;
    var nodeCount: number;
    var identifiers: Map<string, string>;
    var identifierCount: number;

    // TODO(jakebailey): This type is a lie; this value actually contains the result
    // of ORing a bunch of `1 << ParsingContext.XYZ`.
    var parsingContext: ParsingContext;

    var notParenthesizedArrow: Set<number> | undefined;

    // Flags that dictate what parsing context we're in.  For example:
    // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
    // that some tokens that would be considered identifiers may be considered keywords.
    //
    // When adding more parser context flags, consider which is the more common case that the
    // flag will be in.  This should be the 'false' state for that flag.  The reason for this is
    // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
    // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for
    // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
    // all nodes would need extra state on them to store this info.
    //
    // Note: 'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
    // grammar specification.
    //
    // An important thing about these context concepts.  By default they are effectively inherited
    // while parsing through every grammar production.  i.e. if you don't change them, then when
    // you parse a sub-production, it will have the same context values as the parent production.
    // This is great most of the time.  After all, consider all the 'expression' grammar productions
    // and how nearly all of them pass along the 'in' and 'yield' context values:
    //
    // EqualityExpression[In, Yield] :
    //      RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
    //
    // Where you have to be careful is then understanding what the points are in the grammar
    // where the values are *not* passed along.  For example:
    //
    // SingleNameBinding[Yield,GeneratorParameter]
    //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
    //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
    //
    // Here this is saying that if the GeneratorParameter context flag is set, that we should
    // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
    // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
    // production.  Conversely, if the GeneratorParameter context flag is not set, then we
    // should leave the 'yield' context flag alone.
    //
    // Getting this all correct is tricky and requires careful reading of the grammar to
    // understand when these values should be changed versus when they should be inherited.
    //
    // Note: it should not be necessary to save/restore these flags during speculative/lookahead
    // parsing.  These context flags are naturally stored and restored through normal recursive
    // descent parsing and unwinding.
    var contextFlags: NodeFlags;

    // Indicates whether we are currently parsing top-level statements.
    var topLevel = true;

    // Whether or not we've had a parse error since creating the last AST node.  If we have
    // encountered an error, it will be stored on the next AST node we create.  Parse errors
    // can be broken down into three categories:
    //
    // 1) An error that occurred during scanning.  For example, an unterminated literal, or a
    //    character that was completely not understood.
    //
    // 2) A token was expected, but was not present.  This type of error is commonly produced
    //    by the 'parseExpected' function.
    //
    // 3) A token was present that no parsing function was able to consume.  This type of error
    //    only occurs in the 'abortParsingListOrMoveToNextToken' function when the parser
    //    decides to skip the token.
    //
    // In all of these cases, we want to mark the next node as having had an error before it.
    // With this mark, we can know in incremental settings if this node can be reused, or if
    // we have to reparse it.  If we don't keep this information around, we may just reuse the
    // node.  in that event we would then not produce the same errors as we did before, causing
    // significant confusion problems.
    //
    // Note: it is necessary that this value be saved/restored during speculative/lookahead
    // parsing.  During lookahead parsing, we will often create a node.  That node will have
    // this value attached, and then this value will be set back to 'false'.  If we decide to
    // rewind, we must get back to the same value we had prior to the lookahead.
    //
    // Note: any errors at the end of the file that do not precede a regular node, should get
    // attached to the EOF token.
    var parseErrorBeforeNextFinishedNode = false;
    /* eslint-enable no-var */

    export function parseSourceFile(
        fileName: string,
        sourceText: string,
        languageVersion: ScriptTarget,
        syntaxCursor: IncrementalParser.SyntaxCursor | undefined,
        setParentNodes = false,
        scriptKind?: ScriptKind,
        setExternalModuleIndicatorOverride?: (file: SourceFile) => void,
        jsDocParsingMode = JSDocParsingMode.ParseAll,
    ): SourceFile {
        scriptKind = ensureScriptKind(fileName, scriptKind);
        if (scriptKind === ScriptKind.JSON) {
            const result = parseJsonText(fileName, sourceText, languageVersion, syntaxCursor, setParentNodes);
            convertToJson(result, result.statements[0]?.expression, result.parseDiagnostics, /*returnValue*/ false, /*jsonConversionNotifier*/ undefined);
            result.referencedFiles = emptyArray;
            result.typeReferenceDirectives = emptyArray;
            result.libReferenceDirectives = emptyArray;
            result.amdDependencies = emptyArray;
            result.hasNoDefaultLib = false;
            result.pragmas = emptyMap as ReadonlyPragmaMap;
            return result;
        }

        initializeState(fileName, sourceText, languageVersion, syntaxCursor, scriptKind, jsDocParsingMode);

        const result = parseSourceFileWorker(languageVersion, setParentNodes, scriptKind, setExternalModuleIndicatorOverride || setExternalModuleIndicator, jsDocParsingMode);

        clearState();

        return result;
    }

    export function parseIsolatedEntityName(content: string, languageVersion: ScriptTarget): EntityName | undefined {
        // Choice of `isDeclarationFile` should be arbitrary
        initializeState("", content, languageVersion, /*syntaxCursor*/ undefined, ScriptKind.JS, JSDocParsingMode.ParseAll);
        // Prime the scanner.
        nextToken();
        const entityName = parseEntityName(/*allowReservedWords*/ true);
        const isValid = token() === SyntaxKind.EndOfFileToken && !parseDiagnostics.length;
        clearState();
        return isValid ? entityName : undefined;
    }

    export function parseJsonText(fileName: string, sourceText: string, languageVersion: ScriptTarget = ScriptTarget.ES2015, syntaxCursor?: IncrementalParser.SyntaxCursor, setParentNodes = false): JsonSourceFile {
        initializeState(fileName, sourceText, languageVersion, syntaxCursor, ScriptKind.JSON, JSDocParsingMode.ParseAll);
        sourceFlags = contextFlags;

        // Prime the scanner.
        nextToken();
        const pos = getNodePos();
        let statements, endOfFileToken;
        if (token() === SyntaxKind.EndOfFileToken) {
            statements = createNodeArray([], pos, pos);
            endOfFileToken = parseTokenNode<EndOfFileToken>();
        }
        else {
            // Loop and synthesize an ArrayLiteralExpression if there are more than
            // one top-level expressions to ensure all input text is consumed.
            let expressions: Expression[] | Expression | undefined;
            while (token() !== SyntaxKind.EndOfFileToken) {
                let expression;
                switch (token()) {
                    case SyntaxKind.OpenBracketToken:
                        expression = parseArrayLiteralExpression();
                        break;
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                        expression = parseTokenNode<BooleanLiteral | NullLiteral>();
                        break;
                    case SyntaxKind.MinusToken:
                        if (lookAhead(() => nextToken() === SyntaxKind.NumericLiteral && nextToken() !== SyntaxKind.ColonToken)) {
                            expression = parsePrefixUnaryExpression() as JsonMinusNumericLiteral;
                        }
                        else {
                            expression = parseObjectLiteralExpression();
                        }
                        break;
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                        if (lookAhead(() => nextToken() !== SyntaxKind.ColonToken)) {
                            expression = parseLiteralNode() as StringLiteral | NumericLiteral;
                            break;
                        }
                        // falls through
                    default:
                        expression = parseObjectLiteralExpression();
                        break;
                }

                // Error recovery: collect multiple top-level expressions
                if (expressions && isArray(expressions)) {
                    expressions.push(expression);
                }
                else if (expressions) {
                    expressions = [expressions, expression];
                }
                else {
                    expressions = expression;
                    if (token() !== SyntaxKind.EndOfFileToken) {
                        parseErrorAtCurrentToken(Diagnostics.Unexpected_token);
                    }
                }
            }

            const expression = isArray(expressions) ? finishNode(factoryCreateArrayLiteralExpression(expressions), pos) : Debug.checkDefined(expressions);
            const statement = factoryCreateExpressionStatement(expression) as JsonObjectExpressionStatement;
            finishNode(statement, pos);
            statements = createNodeArray([statement], pos);
            endOfFileToken = parseExpectedToken(SyntaxKind.EndOfFileToken, Diagnostics.Unexpected_token) as EndOfFileToken;
        }

        // Set source file so that errors will be reported with this file name
        const sourceFile = createSourceFile(fileName, ScriptTarget.ES2015, ScriptKind.JSON, /*isDeclarationFile*/ false, statements, endOfFileToken, sourceFlags, noop);

        if (setParentNodes) {
            fixupParentReferences(sourceFile);
        }

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        const result = sourceFile as JsonSourceFile;
        clearState();
        return result;
    }

    function initializeState(_fileName: string, _sourceText: string, _languageVersion: ScriptTarget, _syntaxCursor: IncrementalParser.SyntaxCursor | undefined, _scriptKind: ScriptKind, _jsDocParsingMode: JSDocParsingMode) {
        NodeConstructor = objectAllocator.getNodeConstructor();
        TokenConstructor = objectAllocator.getTokenConstructor();
        IdentifierConstructor = objectAllocator.getIdentifierConstructor();
        PrivateIdentifierConstructor = objectAllocator.getPrivateIdentifierConstructor();
        SourceFileConstructor = objectAllocator.getSourceFileConstructor();

        fileName = normalizePath(_fileName);
        sourceText = _sourceText;
        languageVersion = _languageVersion;
        syntaxCursor = _syntaxCursor;
        scriptKind = _scriptKind;
        languageVariant = getLanguageVariant(_scriptKind);

        parseDiagnostics = [];
        parsingContext = 0;
        identifiers = new Map<string, string>();
        identifierCount = 0;
        nodeCount = 0;
        sourceFlags = 0;
        topLevel = true;

        switch (scriptKind) {
            case ScriptKind.JS:
            case ScriptKind.JSX:
                contextFlags = NodeFlags.JavaScriptFile;
                break;
            case ScriptKind.JSON:
                contextFlags = NodeFlags.JavaScriptFile | NodeFlags.JsonFile;
                break;
            default:
                contextFlags = NodeFlags.None;
                break;
        }
        parseErrorBeforeNextFinishedNode = false;

        // Initialize and prime the scanner before parsing the source elements.
        scanner.setText(sourceText);
        scanner.setOnError(scanError);
        scanner.setScriptTarget(languageVersion);
        scanner.setLanguageVariant(languageVariant);
        scanner.setScriptKind(scriptKind);
        scanner.setJSDocParsingMode(_jsDocParsingMode);
    }

    function clearState() {
        // Clear out the text the scanner is pointing at, so it doesn't keep anything alive unnecessarily.
        scanner.clearCommentDirectives();
        scanner.setText("");
        scanner.setOnError(undefined);
        scanner.setScriptKind(ScriptKind.Unknown);
        scanner.setJSDocParsingMode(JSDocParsingMode.ParseAll);

        // Clear any data.  We don't want to accidentally hold onto it for too long.
        sourceText = undefined!;
        languageVersion = undefined!;
        syntaxCursor = undefined;
        scriptKind = undefined!;
        languageVariant = undefined!;
        sourceFlags = 0;
        parseDiagnostics = undefined!;
        jsDocDiagnostics = undefined!;
        parsingContext = 0;
        identifiers = undefined!;
        notParenthesizedArrow = undefined;
        topLevel = true;
    }

    function parseSourceFileWorker(languageVersion: ScriptTarget, setParentNodes: boolean, scriptKind: ScriptKind, setExternalModuleIndicator: (file: SourceFile) => void, jsDocParsingMode: JSDocParsingMode): SourceFile {
        const isDeclarationFile = isDeclarationFileName(fileName);
        if (isDeclarationFile) {
            contextFlags |= NodeFlags.Ambient;
        }

        sourceFlags = contextFlags;

        // Prime the scanner.
        nextToken();

        const statements = parseList(ParsingContext.SourceElements, parseStatement);
        Debug.assert(token() === SyntaxKind.EndOfFileToken);
        const endHasJSDoc = hasPrecedingJSDocComment();
        const endOfFileToken = withJSDoc(parseTokenNode<EndOfFileToken>(), endHasJSDoc);

        const sourceFile = createSourceFile(fileName, languageVersion, scriptKind, isDeclarationFile, statements, endOfFileToken, sourceFlags, setExternalModuleIndicator);

        // A member of ReadonlyArray<T> isn't assignable to a member of T[] (and prevents a direct cast) - but this is where we set up those members so they can be readonly in the future
        processCommentPragmas(sourceFile as {} as PragmaContext, sourceText);
        processPragmasIntoFields(sourceFile as {} as PragmaContext, reportPragmaDiagnostic);

        sourceFile.commentDirectives = scanner.getCommentDirectives();
        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
        sourceFile.jsDocParsingMode = jsDocParsingMode;
        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        if (setParentNodes) {
            fixupParentReferences(sourceFile);
        }

        return sourceFile;

        function reportPragmaDiagnostic(pos: number, end: number, diagnostic: DiagnosticMessage) {
            parseDiagnostics.push(createDetachedDiagnostic(fileName, sourceText, pos, end, diagnostic));
        }
    }

    let hasDeprecatedTag = false;
    function withJSDoc<T extends HasJSDoc>(node: T, hasJSDoc: boolean): T {
        if (!hasJSDoc) {
            return node;
        }

        Debug.assert(!node.jsDoc); // Should only be called once per node
        const jsDoc = mapDefined(getJSDocCommentRanges(node, sourceText), comment => JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos));
        if (jsDoc.length) node.jsDoc = jsDoc;
        if (hasDeprecatedTag) {
            hasDeprecatedTag = false;
            (node as Mutable<T>).flags |= NodeFlags.Deprecated;
        }
        return node;
    }

    function reparseTopLevelAwait(sourceFile: SourceFile) {
        const savedSyntaxCursor = syntaxCursor;
        const baseSyntaxCursor = IncrementalParser.createSyntaxCursor(sourceFile);
        syntaxCursor = { currentNode };

        const statements: Statement[] = [];
        const savedParseDiagnostics = parseDiagnostics;

        parseDiagnostics = [];

        let pos = 0;
        let start = findNextStatementWithAwait(sourceFile.statements, 0);
        while (start !== -1) {
            // append all statements between pos and start
            const prevStatement = sourceFile.statements[pos];
            const nextStatement = sourceFile.statements[start];
            addRange(statements, sourceFile.statements, pos, start);
            pos = findNextStatementWithoutAwait(sourceFile.statements, start);

            // append all diagnostics associated with the copied range
            const diagnosticStart = findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= prevStatement.pos);
            const diagnosticEnd = diagnosticStart >= 0 ? findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= nextStatement.pos, diagnosticStart) : -1;
            if (diagnosticStart >= 0) {
                addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart, diagnosticEnd >= 0 ? diagnosticEnd : undefined);
            }

            // reparse all statements between start and pos. We skip existing diagnostics for the same range and allow the parser to generate new ones.
            speculationHelper(() => {
                const savedContextFlags = contextFlags;
                contextFlags |= NodeFlags.AwaitContext;
                scanner.resetTokenState(nextStatement.pos);
                nextToken();

                while (token() !== SyntaxKind.EndOfFileToken) {
                    const startPos = scanner.getTokenFullStart();
                    const statement = parseListElement(ParsingContext.SourceElements, parseStatement);
                    statements.push(statement);
                    if (startPos === scanner.getTokenFullStart()) {
                        nextToken();
                    }

                    if (pos >= 0) {
                        const nonAwaitStatement = sourceFile.statements[pos];
                        if (statement.end === nonAwaitStatement.pos) {
                            // done reparsing this section
                            break;
                        }
                        if (statement.end > nonAwaitStatement.pos) {
                            // we ate into the next statement, so we must reparse it.
                            pos = findNextStatementWithoutAwait(sourceFile.statements, pos + 1);
                        }
                    }
                }

                contextFlags = savedContextFlags;
            }, SpeculationKind.Reparse);

            // find the next statement containing an `await`
            start = pos >= 0 ? findNextStatementWithAwait(sourceFile.statements, pos) : -1;
        }

        // append all statements between pos and the end of the list
        if (pos >= 0) {
            const prevStatement = sourceFile.statements[pos];
            addRange(statements, sourceFile.statements, pos);

            // append all diagnostics associated with the copied range
            const diagnosticStart = findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= prevStatement.pos);
            if (diagnosticStart >= 0) {
                addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart);
            }
        }

        syntaxCursor = savedSyntaxCursor;
        return factory.updateSourceFile(sourceFile, setTextRange(factoryCreateNodeArray(statements), sourceFile.statements));

        function containsPossibleTopLevelAwait(node: Node) {
            return !(node.flags & NodeFlags.AwaitContext)
                && !!(node.transformFlags & TransformFlags.ContainsPossibleTopLevelAwait);
        }

        function findNextStatementWithAwait(statements: NodeArray<Statement>, start: number) {
            for (let i = start; i < statements.length; i++) {
                if (containsPossibleTopLevelAwait(statements[i])) {
                    return i;
                }
            }
            return -1;
        }

        function findNextStatementWithoutAwait(statements: NodeArray<Statement>, start: number) {
            for (let i = start; i < statements.length; i++) {
                if (!containsPossibleTopLevelAwait(statements[i])) {
                    return i;
                }
            }
            return -1;
        }

        function currentNode(position: number) {
            const node = baseSyntaxCursor.currentNode(position);
            if (topLevel && node && containsPossibleTopLevelAwait(node)) {
                markAsIntersectingIncrementalChange(node);
            }
            return node;
        }
    }

    export function fixupParentReferences(rootNode: Node) {
        // normally parent references are set during binding. However, for clients that only need
        // a syntax tree, and no semantic features, then the binding process is an unnecessary
        // overhead.  This functions allows us to set all the parents, without all the expense of
        // binding.
        setParentRecursive(rootNode, /*incremental*/ true);
    }

    function createSourceFile(
        fileName: string,
        languageVersion: ScriptTarget,
        scriptKind: ScriptKind,
        isDeclarationFile: boolean,
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken,
        flags: NodeFlags,
        setExternalModuleIndicator: (sourceFile: SourceFile) => void,
    ): SourceFile {
        // code from createNode is inlined here so createNode won't have to deal with special case of creating source files
        // this is quite rare comparing to other nodes and createNode should be as fast as possible
        let sourceFile = factory.createSourceFile(statements, endOfFileToken, flags);
        setTextRangePosWidth(sourceFile, 0, sourceText.length);
        setFields(sourceFile);

        // If we parsed this as an external module, it may contain top-level await
        if (!isDeclarationFile && isExternalModule(sourceFile) && sourceFile.transformFlags & TransformFlags.ContainsPossibleTopLevelAwait) {
            const oldSourceFile = sourceFile;
            sourceFile = reparseTopLevelAwait(sourceFile);
            if (oldSourceFile !== sourceFile) setFields(sourceFile);
        }

        return sourceFile;

        function setFields(sourceFile: SourceFile) {
            sourceFile.text = sourceText;
            sourceFile.bindDiagnostics = [];
            sourceFile.bindSuggestionDiagnostics = undefined;
            sourceFile.languageVersion = languageVersion;
            sourceFile.fileName = fileName;
            sourceFile.languageVariant = getLanguageVariant(scriptKind);
            sourceFile.isDeclarationFile = isDeclarationFile;
            sourceFile.scriptKind = scriptKind;

            setExternalModuleIndicator(sourceFile);
            sourceFile.setExternalModuleIndicator = setExternalModuleIndicator;
        }
    }

    function setContextFlag(val: boolean, flag: NodeFlags) {
        if (val) {
            contextFlags |= flag;
        }
        else {
            contextFlags &= ~flag;
        }
    }

    function setDisallowInContext(val: boolean) {
        setContextFlag(val, NodeFlags.DisallowInContext);
    }

    function setYieldContext(val: boolean) {
        setContextFlag(val, NodeFlags.YieldContext);
    }

    function setDecoratorContext(val: boolean) {
        setContextFlag(val, NodeFlags.DecoratorContext);
    }

    function setAwaitContext(val: boolean) {
        setContextFlag(val, NodeFlags.AwaitContext);
    }

    function doOutsideOfContext<T>(context: NodeFlags, func: () => T): T {
        // contextFlagsToClear will contain only the context flags that are
        // currently set that we need to temporarily clear
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToClear = context & contextFlags;
        if (contextFlagsToClear) {
            // clear the requested context flags
            setContextFlag(/*val*/ false, contextFlagsToClear);
            const result = func();
            // restore the context flags we just cleared
            setContextFlag(/*val*/ true, contextFlagsToClear);
            return result;
        }

        // no need to do anything special as we are not in any of the requested contexts
        return func();
    }

    function doInsideOfContext<T>(context: NodeFlags, func: () => T): T {
        // contextFlagsToSet will contain only the context flags that
        // are not currently set that we need to temporarily enable.
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToSet = context & ~contextFlags;
        if (contextFlagsToSet) {
            // set the requested context flags
            setContextFlag(/*val*/ true, contextFlagsToSet);
            const result = func();
            // reset the context flags we just set
            setContextFlag(/*val*/ false, contextFlagsToSet);
            return result;
        }

        // no need to do anything special as we are already in all of the requested contexts
        return func();
    }

    function allowInAnd<T>(func: () => T): T {
        return doOutsideOfContext(NodeFlags.DisallowInContext, func);
    }

    function disallowInAnd<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.DisallowInContext, func);
    }

    function allowConditionalTypesAnd<T>(func: () => T): T {
        return doOutsideOfContext(NodeFlags.DisallowConditionalTypesContext, func);
    }

    function disallowConditionalTypesAnd<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.DisallowConditionalTypesContext, func);
    }

    function doInYieldContext<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.YieldContext, func);
    }

    function doInDecoratorContext<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.DecoratorContext, func);
    }

    function doInAwaitContext<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.AwaitContext, func);
    }

    function doOutsideOfAwaitContext<T>(func: () => T): T {
        return doOutsideOfContext(NodeFlags.AwaitContext, func);
    }

    function doInYieldAndAwaitContext<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.YieldContext | NodeFlags.AwaitContext, func);
    }

    function doOutsideOfYieldAndAwaitContext<T>(func: () => T): T {
        return doOutsideOfContext(NodeFlags.YieldContext | NodeFlags.AwaitContext, func);
    }

    function inContext(flags: NodeFlags) {
        return (contextFlags & flags) !== 0;
    }

    function inYieldContext() {
        return inContext(NodeFlags.YieldContext);
    }

    function inDisallowInContext() {
        return inContext(NodeFlags.DisallowInContext);
    }

    function inDisallowConditionalTypesContext() {
        return inContext(NodeFlags.DisallowConditionalTypesContext);
    }

    function inDecoratorContext() {
        return inContext(NodeFlags.DecoratorContext);
    }

    function inAwaitContext() {
        return inContext(NodeFlags.AwaitContext);
    }

    function parseErrorAtCurrentToken(message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAt(scanner.getTokenStart(), scanner.getTokenEnd(), message, ...args);
    }

    function parseErrorAtPosition(start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        // Don't report another error if it would just be at the same position as the last error.
        const lastError = lastOrUndefined(parseDiagnostics);
        let result: DiagnosticWithDetachedLocation | undefined;
        if (!lastError || start !== lastError.start) {
            result = createDetachedDiagnostic(fileName, sourceText, start, length, message, ...args);
            parseDiagnostics.push(result);
        }

        // Mark that we've encountered an error.  We'll set an appropriate bit on the next
        // node we finish so that it can't be reused incrementally.
        parseErrorBeforeNextFinishedNode = true;
        return result;
    }

    function parseErrorAt(start: number, end: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAtPosition(start, end - start, message, ...args);
    }

    function parseErrorAtRange(range: TextRange, message: DiagnosticMessage, ...args: DiagnosticArguments): void {
        parseErrorAt(range.pos, range.end, message, ...args);
    }

    function scanError(message: DiagnosticMessage, length: number, arg0?: any): void {
        parseErrorAtPosition(scanner.getTokenEnd(), length, message, arg0);
    }

    function getNodePos(): number {
        return scanner.getTokenFullStart();
    }

    function hasPrecedingJSDocComment() {
        return scanner.hasPrecedingJSDocComment();
    }

    // Use this function to access the current token instead of reading the currentToken
    // variable. Since function results aren't narrowed in control flow analysis, this ensures
    // that the type checker doesn't make wrong assumptions about the type of the current
    // token (e.g. a call to nextToken() changes the current token but the checker doesn't
    // reason about this side effect).  Mainstream VMs inline simple functions like this, so
    // there is no performance penalty.
    function token(): SyntaxKind {
        return currentToken;
    }

    function nextTokenWithoutCheck() {
        return currentToken = scanner.scan();
    }

    function nextTokenAnd<T>(func: () => T): T {
        nextToken();
        return func();
    }

    function nextToken(): SyntaxKind {
        // if the keyword had an escape
        if (isKeyword(currentToken) && (scanner.hasUnicodeEscape() || scanner.hasExtendedUnicodeEscape())) {
            // issue a parse error for the escape
            parseErrorAt(scanner.getTokenStart(), scanner.getTokenEnd(), Diagnostics.Keywords_cannot_contain_escape_characters);
        }
        return nextTokenWithoutCheck();
    }

    function nextTokenJSDoc(): JSDocSyntaxKind {
        return currentToken = scanner.scanJsDocToken();
    }

    function nextJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken {
        return currentToken = scanner.scanJSDocCommentTextToken(inBackticks);
    }

    function reScanGreaterToken(): SyntaxKind {
        return currentToken = scanner.reScanGreaterToken();
    }

    function reScanSlashToken(): SyntaxKind {
        return currentToken = scanner.reScanSlashToken();
    }

    function reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind {
        return currentToken = scanner.reScanTemplateToken(isTaggedTemplate);
    }

    function reScanLessThanToken(): SyntaxKind {
        return currentToken = scanner.reScanLessThanToken();
    }

    function reScanHashToken(): SyntaxKind {
        return currentToken = scanner.reScanHashToken();
    }

    function scanJsxIdentifier(): SyntaxKind {
        return currentToken = scanner.scanJsxIdentifier();
    }

    function scanJsxText(): SyntaxKind {
        return currentToken = scanner.scanJsxToken();
    }

    function scanJsxAttributeValue(): SyntaxKind {
        return currentToken = scanner.scanJsxAttributeValue();
    }

    function speculationHelper<T>(callback: () => T, speculationKind: SpeculationKind): T {
        // Keep track of the state we'll need to rollback to if lookahead fails (or if the
        // caller asked us to always reset our state).
        const saveToken = currentToken;
        const saveParseDiagnosticsLength = parseDiagnostics.length;
        const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

        // Note: it is not actually necessary to save/restore the context flags here.  That's
        // because the saving/restoring of these flags happens naturally through the recursive
        // descent nature of our parser.  However, we still store this here just so we can
        // assert that invariant holds.
        const saveContextFlags = contextFlags;

        // If we're only looking ahead, then tell the scanner to only lookahead as well.
        // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the
        // same.
        const result = speculationKind !== SpeculationKind.TryParse
            ? scanner.lookAhead(callback)
            : scanner.tryScan(callback);

        Debug.assert(saveContextFlags === contextFlags);

        // If our callback returned something 'falsy' or we're just looking ahead,
        // then unconditionally restore us to where we were.
        if (!result || speculationKind !== SpeculationKind.TryParse) {
            currentToken = saveToken;
            if (speculationKind !== SpeculationKind.Reparse) {
                parseDiagnostics.length = saveParseDiagnosticsLength;
            }
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
        }

        return result;
    }

    /** Invokes the provided callback then unconditionally restores the parser to the state it
     * was in immediately prior to invoking the callback.  The result of invoking the callback
     * is returned from this function.
     */
    function lookAhead<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.Lookahead);
    }

    /** Invokes the provided callback.  If the callback returns something falsy, then it restores
     * the parser to the state it was in immediately prior to invoking the callback.  If the
     * callback returns something truthy, then the parser state is not rolled back.  The result
     * of invoking the callback is returned from this function.
     */
    function tryParse<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.TryParse);
    }

    function isBindingIdentifier(): boolean {
        if (token() === SyntaxKind.Identifier) {
            return true;
        }

        // `let await`/`let yield` in [Yield] or [Await] are allowed here and disallowed in the binder.
        return token() > SyntaxKind.LastReservedWord;
    }

    // Ignore strict mode flag because we will report an error in type checker instead.
    function isIdentifier(): boolean {
        if (token() === SyntaxKind.Identifier) {
            return true;
        }

        // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
        // considered a keyword and is not an identifier.
        if (token() === SyntaxKind.YieldKeyword && inYieldContext()) {
            return false;
        }

        // If we have a 'await' keyword, and we're in the [Await] context, then 'await' is
        // considered a keyword and is not an identifier.
        if (token() === SyntaxKind.AwaitKeyword && inAwaitContext()) {
            return false;
        }

        return token() > SyntaxKind.LastReservedWord;
    }

    function parseExpected(kind: PunctuationOrKeywordSyntaxKind, diagnosticMessage?: DiagnosticMessage, shouldAdvance = true): boolean {
        if (token() === kind) {
            if (shouldAdvance) {
                nextToken();
            }
            return true;
        }

        // Report specific message if provided with one.  Otherwise, report generic fallback message.
        if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage);
        }
        else {
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
        }
        return false;
    }

    const viableKeywordSuggestions = Object.keys(textToKeywordObj).filter(keyword => keyword.length > 2);

    /**
     * Provides a better error message than the generic "';' expected" if possible for
     * known common variants of a missing semicolon, such as from a mispelled names.
     *
     * @param node Node preceding the expected semicolon location.
     */
    function parseErrorForMissingSemicolonAfter(node: Expression | PropertyName): void {
        // Tagged template literals are sometimes used in places where only simple strings are allowed, i.e.:
        //   module `M1` {
        //   ^^^^^^^^^^^ This block is parsed as a template literal like module`M1`.
        if (isTaggedTemplateExpression(node)) {
            parseErrorAt(skipTrivia(sourceText, node.template.pos), node.template.end, Diagnostics.Module_declaration_names_may_only_use_or_quoted_strings);
            return;
        }

        // Otherwise, if this isn't a well-known keyword-like identifier, give the generic fallback message.
        const expressionText = isIdentifierNode(node) ? idText(node) : undefined;
        if (!expressionText || !isIdentifierText(expressionText, languageVersion)) {
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.SemicolonToken));
            return;
        }

        const pos = skipTrivia(sourceText, node.pos);

        // Some known keywords are likely signs of syntax being used improperly.
        switch (expressionText) {
            case "const":
            case "let":
            case "var":
                parseErrorAt(pos, node.end, Diagnostics.Variable_declaration_not_allowed_at_this_location);
                return;

            case "declare":
                // If a declared node failed to parse, it would have emitted a diagnostic already.
                return;

            case "interface":
                parseErrorForInvalidName(Diagnostics.Interface_name_cannot_be_0, Diagnostics.Interface_must_be_given_a_name, SyntaxKind.OpenBraceToken);
                return;

            case "is":
                parseErrorAt(pos, scanner.getTokenStart(), Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
                return;

            case "module":
            case "namespace":
                parseErrorForInvalidName(Diagnostics.Namespace_name_cannot_be_0, Diagnostics.Namespace_must_be_given_a_name, SyntaxKind.OpenBraceToken);
                return;

            case "type":
                parseErrorForInvalidName(Diagnostics.Type_alias_name_cannot_be_0, Diagnostics.Type_alias_must_be_given_a_name, SyntaxKind.EqualsToken);
                return;
        }

        // The user alternatively might have misspelled or forgotten to add a space after a common keyword.
        const suggestion = getSpellingSuggestion(expressionText, viableKeywordSuggestions, identity) ?? getSpaceSuggestion(expressionText);
        if (suggestion) {
            parseErrorAt(pos, node.end, Diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion);
            return;
        }

        // Unknown tokens are handled with their own errors in the scanner
        if (token() === SyntaxKind.Unknown) {
            return;
        }

        // Otherwise, we know this some kind of unknown word, not just a missing expected semicolon.
        parseErrorAt(pos, node.end, Diagnostics.Unexpected_keyword_or_identifier);
    }

    /**
     * Reports a diagnostic error for the current token being an invalid name.
     *
     * @param blankDiagnostic Diagnostic to report for the case of the name being blank (matched tokenIfBlankName).
     * @param nameDiagnostic Diagnostic to report for all other cases.
     * @param tokenIfBlankName Current token if the name was invalid for being blank (not provided / skipped).
     */
    function parseErrorForInvalidName(nameDiagnostic: DiagnosticMessage, blankDiagnostic: DiagnosticMessage, tokenIfBlankName: SyntaxKind) {
        if (token() === tokenIfBlankName) {
            parseErrorAtCurrentToken(blankDiagnostic);
        }
        else {
            parseErrorAtCurrentToken(nameDiagnostic, scanner.getTokenValue());
        }
    }

    function getSpaceSuggestion(expressionText: string) {
        for (const keyword of viableKeywordSuggestions) {
            if (expressionText.length > keyword.length + 2 && startsWith(expressionText, keyword)) {
                return `${keyword} ${expressionText.slice(keyword.length)}`;
            }
        }

        return undefined;
    }

    function parseSemicolonAfterPropertyName(name: PropertyName, type: TypeNode | undefined, initializer: Expression | undefined) {
        if (token() === SyntaxKind.AtToken && !scanner.hasPrecedingLineBreak()) {
            parseErrorAtCurrentToken(Diagnostics.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations);
            return;
        }

        if (token() === SyntaxKind.OpenParenToken) {
            parseErrorAtCurrentToken(Diagnostics.Cannot_start_a_function_call_in_a_type_annotation);
            nextToken();
            return;
        }

        if (type && !canParseSemicolon()) {
            if (initializer) {
                parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.SemicolonToken));
            }
            else {
                parseErrorAtCurrentToken(Diagnostics.Expected_for_property_initializer);
            }
            return;
        }

        if (tryParseSemicolon()) {
            return;
        }

        if (initializer) {
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.SemicolonToken));
            return;
        }

        parseErrorForMissingSemicolonAfter(name);
    }

    function parseExpectedJSDoc(kind: JSDocSyntaxKind) {
        if (token() === kind) {
            nextTokenJSDoc();
            return true;
        }
        Debug.assert(isKeywordOrPunctuation(kind));
        parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
        return false;
    }

    function parseExpectedMatchingBrackets(openKind: PunctuationSyntaxKind, closeKind: PunctuationSyntaxKind, openParsed: boolean, openPosition: number) {
        if (token() === closeKind) {
            nextToken();
            return;
        }
        const lastError = parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(closeKind));
        if (!openParsed) {
            return;
        }
        if (lastError) {
            addRelatedInfo(
                lastError,
                createDetachedDiagnostic(fileName, sourceText, openPosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, tokenToString(openKind), tokenToString(closeKind)),
            );
        }
    }

    function parseOptional(t: SyntaxKind): boolean {
        if (token() === t) {
            nextToken();
            return true;
        }
        return false;
    }

    function parseOptionalToken<TKind extends SyntaxKind>(t: TKind): Token<TKind>;
    function parseOptionalToken(t: SyntaxKind): Node | undefined {
        if (token() === t) {
            return parseTokenNode();
        }
        return undefined;
    }

    function parseOptionalTokenJSDoc<TKind extends JSDocSyntaxKind>(t: TKind): Token<TKind>;
    function parseOptionalTokenJSDoc(t: JSDocSyntaxKind): Node | undefined {
        if (token() === t) {
            return parseTokenNodeJSDoc();
        }
        return undefined;
    }

    function parseExpectedToken<TKind extends SyntaxKind>(t: TKind, diagnosticMessage?: DiagnosticMessage, arg0?: string): Token<TKind>;
    function parseExpectedToken(t: SyntaxKind, diagnosticMessage?: DiagnosticMessage, arg0?: string): Node {
        return parseOptionalToken(t) ||
            createMissingNode(t, /*reportAtCurrentPosition*/ false, diagnosticMessage || Diagnostics._0_expected, arg0 || tokenToString(t)!);
    }

    function parseExpectedTokenJSDoc<TKind extends JSDocSyntaxKind>(t: TKind): Token<TKind>;
    function parseExpectedTokenJSDoc(t: JSDocSyntaxKind): Node {
        const optional = parseOptionalTokenJSDoc(t);
        if (optional) return optional;
        Debug.assert(isKeywordOrPunctuation(t));
        return createMissingNode(t, /*reportAtCurrentPosition*/ false, Diagnostics._0_expected, tokenToString(t));
    }

    function parseTokenNode<T extends Node>(): T {
        const pos = getNodePos();
        const kind = token();
        nextToken();
        return finishNode(factoryCreateToken(kind), pos) as T;
    }

    function parseTokenNodeJSDoc<T extends Node>(): T {
        const pos = getNodePos();
        const kind = token();
        nextTokenJSDoc();
        return finishNode(factoryCreateToken(kind), pos) as T;
    }

    function canParseSemicolon() {
        // If there's a real semicolon, then we can always parse it out.
        if (token() === SyntaxKind.SemicolonToken) {
            return true;
        }

        // We can parse out an optional semicolon in ASI cases in the following cases.
        return token() === SyntaxKind.CloseBraceToken || token() === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
    }

    function tryParseSemicolon() {
        if (!canParseSemicolon()) {
            return false;
        }

        if (token() === SyntaxKind.SemicolonToken) {
            // consume the semicolon if it was explicitly provided.
            nextToken();
        }

        return true;
    }

    function parseSemicolon(): boolean {
        return tryParseSemicolon() || parseExpected(SyntaxKind.SemicolonToken);
    }

    function createNodeArray<T extends Node>(elements: T[], pos: number, end?: number, hasTrailingComma?: boolean): NodeArray<T> {
        const array = factoryCreateNodeArray(elements, hasTrailingComma);
        setTextRangePosEnd(array, pos, end ?? scanner.getTokenFullStart());
        return array;
    }

    function finishNode<T extends Node>(node: T, pos: number, end?: number): T {
        setTextRangePosEnd(node, pos, end ?? scanner.getTokenFullStart());
        if (contextFlags) {
            (node as Mutable<T>).flags |= contextFlags;
        }

        // Keep track on the node if we encountered an error while parsing it.  If we did, then
        // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
        // flag so that we don't mark any subsequent nodes.
        if (parseErrorBeforeNextFinishedNode) {
            parseErrorBeforeNextFinishedNode = false;
            (node as Mutable<T>).flags |= NodeFlags.ThisNodeHasError;
        }

        return node;
    }

    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: false, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T {
        if (reportAtCurrentPosition) {
            parseErrorAtPosition(scanner.getTokenFullStart(), 0, diagnosticMessage!, ...args);
        }
        else if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage, ...args);
        }

        const pos = getNodePos();
        const result = kind === SyntaxKind.Identifier ? factoryCreateIdentifier("", /*originalKeywordKind*/ undefined) :
            isTemplateLiteralKind(kind) ? factory.createTemplateLiteralLikeNode(kind, "", "", /*templateFlags*/ undefined) :
            kind === SyntaxKind.NumericLiteral ? factoryCreateNumericLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === SyntaxKind.StringLiteral ? factoryCreateStringLiteral("", /*isSingleQuote*/ undefined) :
            kind === SyntaxKind.MissingDeclaration ? factory.createMissingDeclaration() :
            factoryCreateToken(kind);
        return finishNode(result, pos) as T;
    }

    function internIdentifier(text: string): string {
        let identifier = identifiers.get(text);
        if (identifier === undefined) {
            identifiers.set(text, identifier = text);
        }
        return identifier;
    }

    // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
    // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
    // each identifier in order to reduce memory consumption.
    function createIdentifier(isIdentifier: boolean, diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage): Identifier {
        if (isIdentifier) {
            identifierCount++;
            const pos = scanner.hasPrecedingJSDocLeadingAsterisks() ? scanner.getTokenStart() : getNodePos();
            // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker
            const originalKeywordKind = token();
            const text = internIdentifier(scanner.getTokenValue());
            const hasExtendedUnicodeEscape = scanner.hasExtendedUnicodeEscape();
            nextTokenWithoutCheck();
            return finishNode(factoryCreateIdentifier(text, originalKeywordKind, hasExtendedUnicodeEscape), pos);
        }

        if (token() === SyntaxKind.PrivateIdentifier) {
            parseErrorAtCurrentToken(privateIdentifierDiagnosticMessage || Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
            return createIdentifier(/*isIdentifier*/ true);
        }

        if (token() === SyntaxKind.Unknown && scanner.tryScan(() => scanner.reScanInvalidIdentifier() === SyntaxKind.Identifier)) {
            // Scanner has already recorded an 'Invalid character' error, so no need to add another from the parser.
            return createIdentifier(/*isIdentifier*/ true);
        }

        identifierCount++;
        // Only for end of file because the error gets reported incorrectly on embedded script tags.
        const reportAtCurrentPosition = token() === SyntaxKind.EndOfFileToken;

        const isReservedWord = scanner.isReservedWord();
        const msgArg = scanner.getTokenText();

        const defaultMessage = isReservedWord ?
            Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here :
            Diagnostics.Identifier_expected;

        return createMissingNode<Identifier>(SyntaxKind.Identifier, reportAtCurrentPosition, diagnosticMessage || defaultMessage, msgArg);
    }

    function parseBindingIdentifier(privateIdentifierDiagnosticMessage?: DiagnosticMessage) {
        return createIdentifier(isBindingIdentifier(), /*diagnosticMessage*/ undefined, privateIdentifierDiagnosticMessage);
    }

    function parseIdentifier(diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage): Identifier {
        return createIdentifier(isIdentifier(), diagnosticMessage, privateIdentifierDiagnosticMessage);
    }

    function parseIdentifierName(diagnosticMessage?: DiagnosticMessage): Identifier {
        return createIdentifier(tokenIsIdentifierOrKeyword(token()), diagnosticMessage);
    }

    function parseIdentifierNameErrorOnUnicodeEscapeSequence(): Identifier {
        if (scanner.hasUnicodeEscape() || scanner.hasExtendedUnicodeEscape()) {
            parseErrorAtCurrentToken(Diagnostics.Unicode_escape_sequence_cannot_appear_here);
        }
        return createIdentifier(tokenIsIdentifierOrKeyword(token()));
    }

    function isLiteralPropertyName(): boolean {
        return tokenIsIdentifierOrKeyword(token()) ||
            token() === SyntaxKind.StringLiteral ||
            token() === SyntaxKind.NumericLiteral ||
            token() === SyntaxKind.BigIntLiteral;
    }

    function isImportAttributeName(): boolean {
        return tokenIsIdentifierOrKeyword(token()) || token() === SyntaxKind.StringLiteral;
    }

    function parsePropertyNameWorker(allowComputedPropertyNames: boolean): PropertyName {
        if (token() === SyntaxKind.StringLiteral || token() === SyntaxKind.NumericLiteral || token() === SyntaxKind.BigIntLiteral) {
            const node = parseLiteralNode() as StringLiteral | NumericLiteral | BigIntLiteral;
            node.text = internIdentifier(node.text);
            return node;
        }
        if (allowComputedPropertyNames && token() === SyntaxKind.OpenBracketToken) {
            return parseComputedPropertyName();
        }
        if (token() === SyntaxKind.PrivateIdentifier) {
            return parsePrivateIdentifier();
        }
        return parseIdentifierName();
    }

    function parsePropertyName(): PropertyName {
        return parsePropertyNameWorker(/*allowComputedPropertyNames*/ true);
    }

    function parseComputedPropertyName(): ComputedPropertyName {
        // PropertyName [Yield]:
        //      LiteralPropertyName
        //      ComputedPropertyName[?Yield]
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBracketToken);
        // We parse any expression (including a comma expression). But the grammar
        // says that only an assignment expression is allowed, so the grammar checker
        // will error if it sees a comma expression.
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseBracketToken);
        return finishNode(factory.createComputedPropertyName(expression), pos);
    }

    function parsePrivateIdentifier(): PrivateIdentifier {
        const pos = getNodePos();
        const node = factoryCreatePrivateIdentifier(internIdentifier(scanner.getTokenValue()));
        nextToken();
        return finishNode(node, pos);
    }

    function parseContextualModifier(t: SyntaxKind): boolean {
        return token() === t && tryParse(nextTokenCanFollowModifier);
    }

    function nextTokenIsOnSameLineAndCanFollowModifier() {
        nextToken();
        if (scanner.hasPrecedingLineBreak()) {
            return false;
        }
        return canFollowModifier();
    }

    function nextTokenCanFollowModifier() {
        switch (token()) {
            case SyntaxKind.ConstKeyword:
                // 'const' is only a modifier if followed by 'enum'.
                return nextToken() === SyntaxKind.EnumKeyword;
            case SyntaxKind.ExportKeyword:
                nextToken();
                if (token() === SyntaxKind.DefaultKeyword) {
                    return lookAhead(nextTokenCanFollowDefaultKeyword);
                }
                if (token() === SyntaxKind.TypeKeyword) {
                    return lookAhead(nextTokenCanFollowExportModifier);
                }
                return canFollowExportModifier();
            case SyntaxKind.DefaultKeyword:
                return nextTokenCanFollowDefaultKeyword();
            case SyntaxKind.StaticKeyword:
                nextToken();
                return canFollowModifier();
            case SyntaxKind.GetKeyword:
            case SyntaxKind.SetKeyword:
                nextToken();
                return canFollowGetOrSetKeyword();
            default:
                return nextTokenIsOnSameLineAndCanFollowModifier();
        }
    }

    function canFollowExportModifier(): boolean {
        return token() === SyntaxKind.AtToken
            || token() !== SyntaxKind.AsteriskToken
                && token() !== SyntaxKind.AsKeyword
                && token() !== SyntaxKind.OpenBraceToken
                && canFollowModifier();
    }

    function nextTokenCanFollowExportModifier(): boolean {
        nextToken();
        return canFollowExportModifier();
    }

    function parseAnyContextualModifier(): boolean {
        return isModifierKind(token()) && tryParse(nextTokenCanFollowModifier);
    }

    function canFollowModifier(): boolean {
        return token() === SyntaxKind.OpenBracketToken
            || token() === SyntaxKind.OpenBraceToken
            || token() === SyntaxKind.AsteriskToken
            || token() === SyntaxKind.DotDotDotToken
            || isLiteralPropertyName();
    }

    function canFollowGetOrSetKeyword(): boolean {
        return token() === SyntaxKind.OpenBracketToken
            || isLiteralPropertyName();
    }

    function nextTokenCanFollowDefaultKeyword(): boolean {
        nextToken();
        return token() === SyntaxKind.ClassKeyword
            || token() === SyntaxKind.FunctionKeyword
            || token() === SyntaxKind.InterfaceKeyword
            || token() === SyntaxKind.AtToken
            || (token() === SyntaxKind.AbstractKeyword && lookAhead(nextTokenIsClassKeywordOnSameLine))
            || (token() === SyntaxKind.AsyncKeyword && lookAhead(nextTokenIsFunctionKeywordOnSameLine));
    }

    // True if positioned at the start of a list element
    function isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
        const node = currentNode(parsingContext);
        if (node) {
            return true;
        }

        switch (parsingContext) {
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
                // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                // The problem is that ';' can show up in far too many contexts, and if we see one
                // and assume it's a statement, then we may bail out inappropriately from whatever
                // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                // we really don't want to assume the class is over and we're on a statement in the
                // outer module.  We just want to consume and move on.
                return !(token() === SyntaxKind.SemicolonToken && inErrorRecovery) && isStartOfStatement();
            case ParsingContext.SwitchClauses:
                return token() === SyntaxKind.CaseKeyword || token() === SyntaxKind.DefaultKeyword;
            case ParsingContext.TypeMembers:
                return lookAhead(isTypeMemberStart);
            case ParsingContext.ClassMembers:
                // We allow semicolons as class elements (as specified by ES6) as long as we're
                // not in error recovery.  If we're in error recovery, we don't want an errant
                // semicolon to be treated as a class member (since they're almost always used
                // for statements.
                return lookAhead(isClassMemberStart) || (token() === SyntaxKind.SemicolonToken && !inErrorRecovery);
            case ParsingContext.EnumMembers:
                // Include open bracket computed properties. This technically also lets in indexers,
                // which would be a candidate for improved error reporting.
                return token() === SyntaxKind.OpenBracketToken || isLiteralPropertyName();
            case ParsingContext.ObjectLiteralMembers:
                switch (token()) {
                    case SyntaxKind.OpenBracketToken:
                    case SyntaxKind.AsteriskToken:
                    case SyntaxKind.DotDotDotToken:
                    case SyntaxKind.DotToken: // Not an object literal member, but don't want to close the object (see `tests/cases/fourslash/completionsDotInObjectLiteral.ts`)
                        return true;
                    default:
                        return isLiteralPropertyName();
                }
            case ParsingContext.RestProperties:
                return isLiteralPropertyName();
            case ParsingContext.ObjectBindingElements:
                return token() === SyntaxKind.OpenBracketToken || token() === SyntaxKind.DotDotDotToken || isLiteralPropertyName();
            case ParsingContext.ImportAttributes:
                return isImportAttributeName();
            case ParsingContext.HeritageClauseElement:
                // If we see `{ ... }` then only consume it as an expression if it is followed by `,` or `{`
                // That way we won't consume the body of a class in its heritage clause.
                if (token() === SyntaxKind.OpenBraceToken) {
                    return lookAhead(isValidHeritageClauseObjectLiteral);
                }

                if (!inErrorRecovery) {
                    return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
                }
                else {
                    // If we're in error recovery we tighten up what we're willing to match.
                    // That way we don't treat something like "this" as a valid heritage clause
                    // element during recovery.
                    return isIdentifier() && !isHeritageClauseExtendsOrImplementsKeyword();
                }
            case ParsingContext.VariableDeclarations:
                return isBindingIdentifierOrPrivateIdentifierOrPattern();
            case ParsingContext.ArrayBindingElements:
                return token() === SyntaxKind.CommaToken || token() === SyntaxKind.DotDotDotToken || isBindingIdentifierOrPrivateIdentifierOrPattern();
            case ParsingContext.TypeParameters:
                return token() === SyntaxKind.InKeyword || token() === SyntaxKind.ConstKeyword || isIdentifier();
            case ParsingContext.ArrayLiteralMembers:
                switch (token()) {
                    case SyntaxKind.CommaToken:
                    case SyntaxKind.DotToken: // Not an array literal member, but don't want to close the array (see `tests/cases/fourslash/completionsDotInArrayLiteralInObjectLiteral.ts`)
                        return true;
                }
                // falls through
            case ParsingContext.ArgumentExpressions:
                return token() === SyntaxKind.DotDotDotToken || isStartOfExpression();
            case ParsingContext.Parameters:
                return isStartOfParameter(/*isJSDocParameter*/ false);
            case ParsingContext.JSDocParameters:
                return isStartOfParameter(/*isJSDocParameter*/ true);
            case ParsingContext.TypeArguments:
            case ParsingContext.TupleElementTypes:
                return token() === SyntaxKind.CommaToken || isStartOfType();
            case ParsingContext.HeritageClauses:
                return isHeritageClause();
            case ParsingContext.ImportOrExportSpecifiers:
                // bail out if the next token is [FromKeyword StringLiteral].
                // That means we're in something like `import { from "mod"`. Stop here can give better error message.
                if (token() === SyntaxKind.FromKeyword && lookAhead(nextTokenIsStringLiteral)) {
                    return false;
                }
                if (token() === SyntaxKind.StringLiteral) {
                    return true; // For "arbitrary module namespace identifiers"
                }
                return tokenIsIdentifierOrKeyword(token());
            case ParsingContext.JsxAttributes:
                return tokenIsIdentifierOrKeyword(token()) || token() === SyntaxKind.OpenBraceToken;
            case ParsingContext.JsxChildren:
                return true;
            case ParsingContext.JSDocComment:
                return true;
            case ParsingContext.Count:
                return Debug.fail("ParsingContext.Count used as a context"); // Not a real context, only a marker.
            default:
                Debug.assertNever(parsingContext, "Non-exhaustive case in 'isListElement'.");
        }
    }

    function isValidHeritageClauseObjectLiteral() {
        Debug.assert(token() === SyntaxKind.OpenBraceToken);
        if (nextToken() === SyntaxKind.CloseBraceToken) {
            // if we see "extends {}" then only treat the {} as what we're extending (and not
            // the class body) if we have:
            //
            //      extends {} {
            //      extends {},
            //      extends {} extends
            //      extends {} implements

            const next = nextToken();
            return next === SyntaxKind.CommaToken || next === SyntaxKind.OpenBraceToken || next === SyntaxKind.ExtendsKeyword || next === SyntaxKind.ImplementsKeyword;
        }

        return true;
    }

    function nextTokenIsIdentifier() {
        nextToken();
        return isIdentifier();
    }

    function nextTokenIsIdentifierOrKeyword() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token());
    }

    function nextTokenIsIdentifierOrKeywordOrGreaterThan() {
        nextToken();
        return tokenIsIdentifierOrKeywordOrGreaterThan(token());
    }

    function isHeritageClauseExtendsOrImplementsKeyword(): boolean {
        if (
            token() === SyntaxKind.ImplementsKeyword ||
            token() === SyntaxKind.ExtendsKeyword
        ) {
            return lookAhead(nextTokenIsStartOfExpression);
        }

        return false;
    }

    function nextTokenIsStartOfExpression() {
        nextToken();
        return isStartOfExpression();
    }

    function nextTokenIsStartOfType() {
        nextToken();
        return isStartOfType();
    }

    // True if positioned at a list terminator
    function isListTerminator(kind: ParsingContext): boolean {
        if (token() === SyntaxKind.EndOfFileToken) {
            // Being at the end of the file ends all lists.
            return true;
        }

        switch (kind) {
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauses:
            case ParsingContext.TypeMembers:
            case ParsingContext.ClassMembers:
            case ParsingContext.EnumMembers:
            case ParsingContext.ObjectLiteralMembers:
            case ParsingContext.ObjectBindingElements:
            case ParsingContext.ImportOrExportSpecifiers:
            case ParsingContext.ImportAttributes:
                return token() === SyntaxKind.CloseBraceToken;
            case ParsingContext.SwitchClauseStatements:
                return token() === SyntaxKind.CloseBraceToken || token() === SyntaxKind.CaseKeyword || token() === SyntaxKind.DefaultKeyword;
            case ParsingContext.HeritageClauseElement:
                return token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.ExtendsKeyword || token() === SyntaxKind.ImplementsKeyword;
            case ParsingContext.VariableDeclarations:
                return isVariableDeclaratorListTerminator();
            case ParsingContext.TypeParameters:
                // Tokens other than '>' are here for better error recovery
                return token() === SyntaxKind.GreaterThanToken || token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.ExtendsKeyword || token() === SyntaxKind.ImplementsKeyword;
            case ParsingContext.ArgumentExpressions:
                // Tokens other than ')' are here for better error recovery
                return token() === SyntaxKind.CloseParenToken || token() === SyntaxKind.SemicolonToken;
            case ParsingContext.ArrayLiteralMembers:
            case ParsingContext.TupleElementTypes:
            case ParsingContext.ArrayBindingElements:
                return token() === SyntaxKind.CloseBracketToken;
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
            case ParsingContext.RestProperties:
                // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                return token() === SyntaxKind.CloseParenToken || token() === SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
            case ParsingContext.TypeArguments:
                // All other tokens should cause the type-argument to terminate except comma token
                return token() !== SyntaxKind.CommaToken;
            case ParsingContext.HeritageClauses:
                return token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.CloseBraceToken;
            case ParsingContext.JsxAttributes:
                return token() === SyntaxKind.GreaterThanToken || token() === SyntaxKind.SlashToken;
            case ParsingContext.JsxChildren:
                return token() === SyntaxKind.LessThanToken && lookAhead(nextTokenIsSlash);
            default:
                return false;
        }
    }

    function isVariableDeclaratorListTerminator(): boolean {
        // If we can consume a semicolon (either explicitly, or with ASI), then consider us done
        // with parsing the list of variable declarators.
        if (canParseSemicolon()) {
            return true;
        }

        // in the case where we're parsing the variable declarator of a 'for-in' statement, we
        // are done if we see an 'in' keyword in front of us. Same with for-of
        if (isInOrOfKeyword(token())) {
            return true;
        }

        // ERROR RECOVERY TWEAK:
        // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
        // arrow function here and it's going to be very unlikely that we'll resynchronize and get
        // another variable declaration.
        if (token() === SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        // Keep trying to parse out variable declarators.
        return false;
    }

    // True if positioned at element or terminator of the current list or any enclosing list
    function isInSomeParsingContext(): boolean {
        // We should be in at least one parsing context, be it SourceElements while parsing
        // a SourceFile, or JSDocComment when lazily parsing JSDoc.
        Debug.assert(parsingContext, "Missing parsing context");
        for (let kind = 0; kind < ParsingContext.Count; kind++) {
            if (parsingContext & (1 << kind)) {
                if (isListElement(kind, /*inErrorRecovery*/ true) || isListTerminator(kind)) {
                    return true;
                }
            }
        }

        return false;
    }

    // Parses a list of elements
    function parseList<T extends Node>(kind: ParsingContext, parseElement: () => T): NodeArray<T> {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list = [];
        const listPos = getNodePos();

        while (!isListTerminator(kind)) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                list.push(parseListElement(kind, parseElement));

                continue;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        return createNodeArray(list, listPos);
    }

    function parseListElement<T extends Node | undefined>(parsingContext: ParsingContext, parseElement: () => T): T {
        const node = currentNode(parsingContext);
        if (node) {
            return consumeNode(node) as T;
        }

        return parseElement();
    }

    function currentNode(parsingContext: ParsingContext, pos?: number): Node | undefined {
        // If we don't have a cursor or the parsing context isn't reusable, there's nothing to reuse.
        //
        // If there is an outstanding parse error that we've encountered, but not attached to
        // some node, then we cannot get a node from the old source tree.  This is because we
        // want to mark the next node we encounter as being unusable.
        //
        // Note: This may be too conservative.  Perhaps we could reuse the node and set the bit
        // on it (or its leftmost child) as having the error.  For now though, being conservative
        // is nice and likely won't ever affect perf.
        if (!syntaxCursor || !isReusableParsingContext(parsingContext) || parseErrorBeforeNextFinishedNode) {
            return undefined;
        }

        const node = syntaxCursor.currentNode(pos ?? scanner.getTokenFullStart());

        // Can't reuse a missing node.
        // Can't reuse a node that intersected the change range.
        // Can't reuse a node that contains a parse error.  This is necessary so that we
        // produce the same set of errors again.
        if (nodeIsMissing(node) || intersectsIncrementalChange(node) || containsParseError(node)) {
            return undefined;
        }

        // We can only reuse a node if it was parsed under the same strict mode that we're
        // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
        // the user added 'using strict' at the top of the file, then we can't use that node
        // again as the presence of strict mode may cause us to parse the tokens in the file
        // differently.
        //
        // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
        // are unaffected by strict mode.  It's just the parser will decide what to do with it
        // differently depending on what mode it is in.
        //
        // This also applies to all our other context flags as well.
        const nodeContextFlags = node.flags & NodeFlags.ContextFlags;
        if (nodeContextFlags !== contextFlags) {
            return undefined;
        }

        // Ok, we have a node that looks like it could be reused.  Now verify that it is valid
        // in the current list parsing context that we're currently at.
        if (!canReuseNode(node, parsingContext)) {
            return undefined;
        }

        if (canHaveJSDoc(node) && node.jsDoc?.jsDocCache) {
            // jsDocCache may include tags from parent nodes, which might have been modified.
            node.jsDoc.jsDocCache = undefined;
        }

        return node;
    }

    function consumeNode(node: Node) {
        // Move the scanner so it is after the node we just consumed.
        scanner.resetTokenState(node.end);
        nextToken();
        return node;
    }

    function isReusableParsingContext(parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            case ParsingContext.ClassMembers:
            case ParsingContext.SwitchClauses:
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
            case ParsingContext.EnumMembers:
            case ParsingContext.TypeMembers:
            case ParsingContext.VariableDeclarations:
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
                return true;
        }
        return false;
    }

    function canReuseNode(node: Node, parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            case ParsingContext.ClassMembers:
                return isReusableClassMember(node);

            case ParsingContext.SwitchClauses:
                return isReusableSwitchClause(node);

            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
                return isReusableStatement(node);

            case ParsingContext.EnumMembers:
                return isReusableEnumMember(node);

            case ParsingContext.TypeMembers:
                return isReusableTypeMember(node);

            case ParsingContext.VariableDeclarations:
                return isReusableVariableDeclaration(node);

            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
                return isReusableParameter(node);

                // Any other lists we do not care about reusing nodes in.  But feel free to add if
                // you can do so safely.  Danger areas involve nodes that may involve speculative
                // parsing.  If speculative parsing is involved with the node, then the range the
                // parser reached while looking ahead might be in the edited range (see the example
                // in canReuseVariableDeclaratorNode for a good case of this).

                // case ParsingContext.HeritageClauses:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // heritage clauses.

                // case ParsingContext.TypeParameters:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // type parameters.  Note that that's because type *parameters* only occur in
                // unambiguous *type* contexts.  While type *arguments* occur in very ambiguous
                // *expression* contexts.

                // case ParsingContext.TupleElementTypes:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // tuple types.

                // Technically, type argument list types are probably safe to reuse.  While
                // speculative parsing is involved with them (since type argument lists are only
                // produced from speculative parsing a < as a type argument list), we only have
                // the types because speculative parsing succeeded.  Thus, the lookahead never
                // went past the end of the list and rewound.
                // case ParsingContext.TypeArguments:

                // Note: these are almost certainly not safe to ever reuse.  Expressions commonly
                // need a large amount of lookahead, and we should not reuse them as they may
                // have actually intersected the edit.
                // case ParsingContext.ArgumentExpressions:

                // This is not safe to reuse for the same reason as the 'AssignmentExpression'
                // cases.  i.e. a property assignment may end with an expression, and thus might
                // have lookahead far beyond it's old node.
                // case ParsingContext.ObjectLiteralMembers:

                // This is probably not safe to reuse.  There can be speculative parsing with
                // type names in a heritage clause.  There can be generic names in the type
                // name list, and there can be left hand side expressions (which can have type
                // arguments.)
                // case ParsingContext.HeritageClauseElement:

                // Perhaps safe to reuse, but it's unlikely we'd see more than a dozen attributes
                // on any given element. Same for children.
                // case ParsingContext.JsxAttributes:
                // case ParsingContext.JsxChildren:
        }

        return false;
    }

    function isReusableClassMember(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.Constructor:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.SemicolonClassElement:
                    return true;
                case SyntaxKind.MethodDeclaration:
                    // Method declarations are not necessarily reusable.  An object-literal
                    // may have a method calls "constructor(...)" and we must reparse that
                    // into an actual .ConstructorDeclaration.
                    const methodDeclaration = node as MethodDeclaration;
                    const nameIsConstructor = methodDeclaration.name.kind === SyntaxKind.Identifier &&
                        methodDeclaration.name.escapedText === "constructor";

                    return !nameIsConstructor;
            }
        }

        return false;
    }

    function isReusableSwitchClause(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    return true;
            }
        }

        return false;
    }

    function isReusableStatement(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.Block:
                case SyntaxKind.IfStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.ThrowStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.EmptyStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.DebuggerStatement:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                    return true;
            }
        }

        return false;
    }

    function isReusableEnumMember(node: Node) {
        return node.kind === SyntaxKind.EnumMember;
    }

    function isReusableTypeMember(node: Node) {
        if (node) {
            switch (node.kind) {
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.CallSignature:
                    return true;
            }
        }

        return false;
    }

    function isReusableVariableDeclaration(node: Node) {
        if (node.kind !== SyntaxKind.VariableDeclaration) {
            return false;
        }

        // Very subtle incremental parsing bug.  Consider the following code:
        //
        //      let v = new List < A, B
        //
        // This is actually legal code.  It's a list of variable declarators "v = new List<A"
        // on one side and "B" on the other. If you then change that to:
        //
        //      let v = new List < A, B >()
        //
        // then we have a problem.  "v = new List<A" doesn't intersect the change range, so we
        // start reparsing at "B" and we completely fail to handle this properly.
        //
        // In order to prevent this, we do not allow a variable declarator to be reused if it
        // has an initializer.
        const variableDeclarator = node as VariableDeclaration;
        return variableDeclarator.initializer === undefined;
    }

    function isReusableParameter(node: Node) {
        if (node.kind !== SyntaxKind.Parameter) {
            return false;
        }

        // See the comment in isReusableVariableDeclaration for why we do this.
        const parameter = node as ParameterDeclaration;
        return parameter.initializer === undefined;
    }

    // Returns true if we should abort parsing.
    function abortParsingListOrMoveToNextToken(kind: ParsingContext) {
        parsingContextErrors(kind);
        if (isInSomeParsingContext()) {
            return true;
        }

        nextToken();
        return false;
    }

    function parsingContextErrors(context: ParsingContext) {
        switch (context) {
            case ParsingContext.SourceElements:
                return token() === SyntaxKind.DefaultKeyword
                    ? parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.ExportKeyword))
                    : parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.BlockStatements:
                return parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.SwitchClauses:
                return parseErrorAtCurrentToken(Diagnostics.case_or_default_expected);
            case ParsingContext.SwitchClauseStatements:
                return parseErrorAtCurrentToken(Diagnostics.Statement_expected);
            case ParsingContext.RestProperties: // fallthrough
            case ParsingContext.TypeMembers:
                return parseErrorAtCurrentToken(Diagnostics.Property_or_signature_expected);
            case ParsingContext.ClassMembers:
                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected);
            case ParsingContext.EnumMembers:
                return parseErrorAtCurrentToken(Diagnostics.Enum_member_expected);
            case ParsingContext.HeritageClauseElement:
                return parseErrorAtCurrentToken(Diagnostics.Expression_expected);
            case ParsingContext.VariableDeclarations:
                return isKeyword(token())
                    ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_variable_declaration_name, tokenToString(token())!)
                    : parseErrorAtCurrentToken(Diagnostics.Variable_declaration_expected);
            case ParsingContext.ObjectBindingElements:
                return parseErrorAtCurrentToken(Diagnostics.Property_destructuring_pattern_expected);
            case ParsingContext.ArrayBindingElements:
                return parseErrorAtCurrentToken(Diagnostics.Array_element_destructuring_pattern_expected);
            case ParsingContext.ArgumentExpressions:
                return parseErrorAtCurrentToken(Diagnostics.Argument_expression_expected);
            case ParsingContext.ObjectLiteralMembers:
                return parseErrorAtCurrentToken(Diagnostics.Property_assignment_expected);
            case ParsingContext.ArrayLiteralMembers:
                return parseErrorAtCurrentToken(Diagnostics.Expression_or_comma_expected);
            case ParsingContext.JSDocParameters:
                return parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
            case ParsingContext.Parameters:
                return isKeyword(token())
                    ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_parameter_name, tokenToString(token())!)
                    : parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
            case ParsingContext.TypeParameters:
                return parseErrorAtCurrentToken(Diagnostics.Type_parameter_declaration_expected);
            case ParsingContext.TypeArguments:
                return parseErrorAtCurrentToken(Diagnostics.Type_argument_expected);
            case ParsingContext.TupleElementTypes:
                return parseErrorAtCurrentToken(Diagnostics.Type_expected);
            case ParsingContext.HeritageClauses:
                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_expected);
            case ParsingContext.ImportOrExportSpecifiers:
                if (token() === SyntaxKind.FromKeyword) {
                    return parseErrorAtCurrentToken(Diagnostics._0_expected, "}");
                }
                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
            case ParsingContext.JsxAttributes:
                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
            case ParsingContext.JsxChildren:
                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
            case ParsingContext.ImportAttributes:
                return parseErrorAtCurrentToken(Diagnostics.Identifier_or_string_literal_expected);
            case ParsingContext.JSDocComment:
                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
            case ParsingContext.Count:
                return Debug.fail("ParsingContext.Count used as a context"); // Not a real context, only a marker.
            default:
                Debug.assertNever(context);
        }
    }

    // Parses a comma-delimited list of elements
    function parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<T>;
    function parseDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<NonNullable<T>> | undefined;
    function parseDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<NonNullable<T>> | undefined {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list: NonNullable<T>[] = [];
        const listPos = getNodePos();

        let commaStart = -1; // Meaning the previous token was not a comma
        while (true) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                const startPos = scanner.getTokenFullStart();
                const result = parseListElement(kind, parseElement);
                if (!result) {
                    parsingContext = saveParsingContext;
                    return undefined;
                }
                list.push(result);
                commaStart = scanner.getTokenStart();

                if (parseOptional(SyntaxKind.CommaToken)) {
                    // No need to check for a zero length node since we know we parsed a comma
                    continue;
                }

                commaStart = -1; // Back to the state where the last token was not a comma
                if (isListTerminator(kind)) {
                    break;
                }

                // We didn't get a comma, and the list wasn't terminated, explicitly parse
                // out a comma so we give a good error message.
                parseExpected(SyntaxKind.CommaToken, getExpectedCommaDiagnostic(kind));

                // If the token was a semicolon, and the caller allows that, then skip it and
                // continue.  This ensures we get back on track and don't result in tons of
                // parse errors.  For example, this can happen when people do things like use
                // a semicolon to delimit object literal members.   Note: we'll have already
                // reported an error when we called parseExpected above.
                if (considerSemicolonAsDelimiter && token() === SyntaxKind.SemicolonToken && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                }
                if (startPos === scanner.getTokenFullStart()) {
                    // What we're parsing isn't actually remotely recognizable as a element and we've consumed no tokens whatsoever
                    // Consume a token to advance the parser in some way and avoid an infinite loop
                    // This can happen when we're speculatively parsing parenthesized expressions which we think may be arrow functions,
                    // or when a modifier keyword which is disallowed as a parameter name (ie, `static` in strict mode) is supplied
                    nextToken();
                }
                continue;
            }

            if (isListTerminator(kind)) {
                break;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        // Recording the trailing comma is deliberately done after the previous
        // loop, and not just if we see a list terminator. This is because the list
        // may have ended incorrectly, but it is still important to know if there
        // was a trailing comma.
        // Check if the last token was a comma.
        // Always preserve a trailing comma by marking it on the NodeArray
        return createNodeArray(list, listPos, /*end*/ undefined, commaStart >= 0);
    }

    function getExpectedCommaDiagnostic(kind: ParsingContext) {
        return kind === ParsingContext.EnumMembers ? Diagnostics.An_enum_member_name_must_be_followed_by_a_or : undefined;
    }

    interface MissingList<T extends Node> extends NodeArray<T> {
        isMissingList: true;
    }

    function createMissingList<T extends Node>(): MissingList<T> {
        const list = createNodeArray<T>([], getNodePos()) as MissingList<T>;
        list.isMissingList = true;
        return list;
    }

    function isMissingList(arr: NodeArray<Node>): boolean {
        return !!(arr as MissingList<Node>).isMissingList;
    }

    function parseBracketedList<T extends Node>(kind: ParsingContext, parseElement: () => T, open: PunctuationSyntaxKind, close: PunctuationSyntaxKind): NodeArray<T> {
        if (parseExpected(open)) {
            const result = parseDelimitedList(kind, parseElement);
            parseExpected(close);
            return result;
        }

        return createMissingList<T>();
    }

    function parseEntityName(allowReservedWords: boolean, diagnosticMessage?: DiagnosticMessage): EntityName {
        const pos = getNodePos();
        let entity: EntityName = allowReservedWords ? parseIdentifierName(diagnosticMessage) : parseIdentifier(diagnosticMessage);
        while (parseOptional(SyntaxKind.DotToken)) {
            if (token() === SyntaxKind.LessThanToken) {
                // The entity is part of a JSDoc-style generic. We will use the gap between `typeName` and
                // `typeArguments` to report it as a grammar error in the checker.
                break;
            }
            entity = finishNode(
                factory.createQualifiedName(
                    entity,
                    parseRightSideOfDot(allowReservedWords, /*allowPrivateIdentifiers*/ false, /*allowUnicodeEscapeSequenceInIdentifierName*/ true) as Identifier,
                ),
                pos,
            );
        }
        return entity;
    }

    function createQualifiedName(entity: EntityName, name: Identifier): QualifiedName {
        return finishNode(factory.createQualifiedName(entity, name), entity.pos);
    }

    function parseRightSideOfDot(allowIdentifierNames: boolean, allowPrivateIdentifiers: boolean, allowUnicodeEscapeSequenceInIdentifierName: boolean): Identifier | PrivateIdentifier {
        // Technically a keyword is valid here as all identifiers and keywords are identifier names.
        // However, often we'll encounter this in error situations when the identifier or keyword
        // is actually starting another valid construct.
        //
        // So, we check for the following specific case:
        //
        //      name.
        //      identifierOrKeyword identifierNameOrKeyword
        //
        // Note: the newlines are important here.  For example, if that above code
        // were rewritten into:
        //
        //      name.identifierOrKeyword
        //      identifierNameOrKeyword
        //
        // Then we would consider it valid.  That's because ASI would take effect and
        // the code would be implicitly: "name.identifierOrKeyword; identifierNameOrKeyword".
        // In the first case though, ASI will not take effect because there is not a
        // line terminator after the identifier or keyword.
        if (scanner.hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(token())) {
            const matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

            if (matchesPattern) {
                // Report that we need an identifier.  However, report it right after the dot,
                // and not on the next token.  This is because the next token might actually
                // be an identifier and the error would be quite confusing.
                return createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.Identifier_expected);
            }
        }

        if (token() === SyntaxKind.PrivateIdentifier) {
            const node = parsePrivateIdentifier();
            return allowPrivateIdentifiers ? node : createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.Identifier_expected);
        }

        if (allowIdentifierNames) {
            return allowUnicodeEscapeSequenceInIdentifierName ? parseIdentifierName() : parseIdentifierNameErrorOnUnicodeEscapeSequence();
        }

        return parseIdentifier();
    }

    function parseTemplateSpans(isTaggedTemplate: boolean) {
        const pos = getNodePos();
        const list = [];
        let node: TemplateSpan;
        do {
            node = parseTemplateSpan(isTaggedTemplate);
            list.push(node);
        }
        while (node.literal.kind === SyntaxKind.TemplateMiddle);
        return createNodeArray(list, pos);
    }

    function parseTemplateExpression(isTaggedTemplate: boolean): TemplateExpression {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateExpression(
                parseTemplateHead(isTaggedTemplate),
                parseTemplateSpans(isTaggedTemplate),
            ),
            pos,
        );
    }

    function parseTemplateType(): TemplateLiteralTypeNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateLiteralType(
                parseTemplateHead(/*isTaggedTemplate*/ false),
                parseTemplateTypeSpans(),
            ),
            pos,
        );
    }

    function parseTemplateTypeSpans() {
        const pos = getNodePos();
        const list = [];
        let node: TemplateLiteralTypeSpan;
        do {
            node = parseTemplateTypeSpan();
            list.push(node);
        }
        while (node.literal.kind === SyntaxKind.TemplateMiddle);
        return createNodeArray(list, pos);
    }

    function parseTemplateTypeSpan(): TemplateLiteralTypeSpan {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateLiteralTypeSpan(
                parseType(),
                parseLiteralOfTemplateSpan(/*isTaggedTemplate*/ false),
            ),
            pos,
        );
    }

    function parseLiteralOfTemplateSpan(isTaggedTemplate: boolean) {
        if (token() === SyntaxKind.CloseBraceToken) {
            reScanTemplateToken(isTaggedTemplate);
            return parseTemplateMiddleOrTemplateTail();
        }
        else {
            // TODO(rbuckton): Do we need to call `parseExpectedToken` or can we just call `createMissingNode` directly?
            return parseExpectedToken(SyntaxKind.TemplateTail, Diagnostics._0_expected, tokenToString(SyntaxKind.CloseBraceToken)) as TemplateTail;
        }
    }

    function parseTemplateSpan(isTaggedTemplate: boolean): TemplateSpan {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateSpan(
                allowInAnd(parseExpression),
                parseLiteralOfTemplateSpan(isTaggedTemplate),
            ),
            pos,
        );
    }

    function parseLiteralNode(): LiteralExpression {
        return parseLiteralLikeNode(token()) as LiteralExpression;
    }

    function parseTemplateHead(isTaggedTemplate: boolean): TemplateHead {
        if (!isTaggedTemplate && scanner.getTokenFlags() & TokenFlags.IsInvalid) {
            reScanTemplateToken(/*isTaggedTemplate*/ false);
        }
        const fragment = parseLiteralLikeNode(token());
        Debug.assert(fragment.kind === SyntaxKind.TemplateHead, "Template head has wrong token kind");
        return fragment as TemplateHead;
    }

    function parseTemplateMiddleOrTemplateTail(): TemplateMiddle | TemplateTail {
        const fragment = parseLiteralLikeNode(token());
        Debug.assert(fragment.kind === SyntaxKind.TemplateMiddle || fragment.kind === SyntaxKind.TemplateTail, "Template fragment has wrong token kind");
        return fragment as TemplateMiddle | TemplateTail;
    }

    function getTemplateLiteralRawText(kind: TemplateLiteralToken["kind"]) {
        const isLast = kind === SyntaxKind.NoSubstitutionTemplateLiteral || kind === SyntaxKind.TemplateTail;
        const tokenText = scanner.getTokenText();
        return tokenText.substring(1, tokenText.length - (scanner.isUnterminated() ? 0 : isLast ? 1 : 2));
    }

    function parseLiteralLikeNode(kind: SyntaxKind): LiteralLikeNode {
        const pos = getNodePos();
        const node = isTemplateLiteralKind(kind) ? factory.createTemplateLiteralLikeNode(kind, scanner.getTokenValue(), getTemplateLiteralRawText(kind), scanner.getTokenFlags() & TokenFlags.TemplateLiteralLikeFlags) :
            // Note that theoretically the following condition would hold true literals like 009,
            // which is not octal. But because of how the scanner separates the tokens, we would
            // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
            // We also do not need to check for negatives because any prefix operator would be part of a
            // parent unary expression.
            kind === SyntaxKind.NumericLiteral ? factoryCreateNumericLiteral(scanner.getTokenValue(), scanner.getNumericLiteralFlags()) :
            kind === SyntaxKind.StringLiteral ? factoryCreateStringLiteral(scanner.getTokenValue(), /*isSingleQuote*/ undefined, scanner.hasExtendedUnicodeEscape()) :
            isLiteralKind(kind) ? factoryCreateLiteralLikeNode(kind, scanner.getTokenValue()) :
            Debug.fail();

        if (scanner.hasExtendedUnicodeEscape()) {
            node.hasExtendedUnicodeEscape = true;
        }

        if (scanner.isUnterminated()) {
            node.isUnterminated = true;
        }

        nextToken();
        return finishNode(node, pos);
    }

    // TYPES

    function parseEntityNameOfTypeReference() {
        return parseEntityName(/*allowReservedWords*/ true, Diagnostics.Type_expected);
    }

    function parseTypeArgumentsOfTypeReference() {
        if (!scanner.hasPrecedingLineBreak() && reScanLessThanToken() === SyntaxKind.LessThanToken) {
            return parseBracketedList(ParsingContext.TypeArguments, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
        }
    }

    function parseTypeReference(): TypeReferenceNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTypeReferenceNode(
                parseEntityNameOfTypeReference(),
                parseTypeArgumentsOfTypeReference(),
            ),
            pos,
        );
    }

    // If true, we should abort parsing an error function.
    function typeHasArrowFunctionBlockingParseError(node: TypeNode): boolean {
        switch (node.kind) {
            case SyntaxKind.TypeReference:
                return nodeIsMissing((node as TypeReferenceNode).typeName);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType: {
                const { parameters, type } = node as FunctionOrConstructorTypeNode;
                return isMissingList(parameters) || typeHasArrowFunctionBlockingParseError(type);
            }
            case SyntaxKind.ParenthesizedType:
                return typeHasArrowFunctionBlockingParseError((node as ParenthesizedTypeNode).type);
            default:
                return false;
        }
    }

    function parseThisTypePredicate(lhs: ThisTypeNode): TypePredicateNode {
        nextToken();
        return finishNode(factory.createTypePredicateNode(/*assertsModifier*/ undefined, lhs, parseType()), lhs.pos);
    }

    function parseThisTypeNode(): ThisTypeNode {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createThisTypeNode(), pos);
    }

    function parseJSDocAllType(): JSDocAllType | JSDocOptionalType {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createJSDocAllType(), pos);
    }

    function parseJSDocNonNullableType(): TypeNode {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createJSDocNonNullableType(parseNonArrayType(), /*postfix*/ false), pos);
    }

    function parseJSDocUnknownOrNullableType(): JSDocUnknownType | JSDocNullableType {
        const pos = getNodePos();
        // skip the ?
        nextToken();

        // Need to lookahead to decide if this is a nullable or unknown type.

        // Here are cases where we'll pick the unknown type:
        //
        //      Foo(?,
        //      { a: ? }
        //      Foo(?)
        //      Foo<?>
        //      Foo(?=
        //      (?|
        if (
            token() === SyntaxKind.CommaToken ||
            token() === SyntaxKind.CloseBraceToken ||
            token() === SyntaxKind.CloseParenToken ||
            token() === SyntaxKind.GreaterThanToken ||
            token() === SyntaxKind.EqualsToken ||
            token() === SyntaxKind.BarToken
        ) {
            return finishNode(factory.createJSDocUnknownType(), pos);
        }
        else {
            return finishNode(factory.createJSDocNullableType(parseType(), /*postfix*/ false), pos);
        }
    }

    function parseJSDocFunctionType(): JSDocFunctionType | TypeReferenceNode {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        if (tryParse(nextTokenIsOpenParen)) {
            const parameters = parseParameters(SignatureFlags.Type | SignatureFlags.JSDoc);
            const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
            return withJSDoc(finishNode(factory.createJSDocFunctionType(parameters, type), pos), hasJSDoc);
        }
        return finishNode(factory.createTypeReferenceNode(parseIdentifierName(), /*typeArguments*/ undefined), pos);
    }

    function parseJSDocParameter(): ParameterDeclaration {
        const pos = getNodePos();
        let name: Identifier | undefined;
        if (token() === SyntaxKind.ThisKeyword || token() === SyntaxKind.NewKeyword) {
            name = parseIdentifierName();
            parseExpected(SyntaxKind.ColonToken);
        }
        return finishNode(
            factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                // TODO(rbuckton): JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
                name!,
                /*questionToken*/ undefined,
                parseJSDocType(),
                /*initializer*/ undefined,
            ),
            pos,
        );
    }

    function parseJSDocType(): TypeNode {
        scanner.setSkipJsDocLeadingAsterisks(true);
        const pos = getNodePos();
        if (parseOptional(SyntaxKind.ModuleKeyword)) {
            // TODO(rbuckton): We never set the type for a JSDocNamepathType. What should we put here?
            const moduleTag = factory.createJSDocNamepathType(/*type*/ undefined!);
            terminate:
            while (true) {
                switch (token()) {
                    case SyntaxKind.CloseBraceToken:
                    case SyntaxKind.EndOfFileToken:
                    case SyntaxKind.CommaToken:
                    case SyntaxKind.WhitespaceTrivia:
                        break terminate;
                    default:
                        nextTokenJSDoc();
                }
            }

            scanner.setSkipJsDocLeadingAsterisks(false);
            return finishNode(moduleTag, pos);
        }

        const hasDotDotDot = parseOptional(SyntaxKind.DotDotDotToken);
        let type = parseTypeOrTypePredicate();
        scanner.setSkipJsDocLeadingAsterisks(false);
        if (hasDotDotDot) {
            type = finishNode(factory.createJSDocVariadicType(type), pos);
        }
        if (token() === SyntaxKind.EqualsToken) {
            nextToken();
            return finishNode(factory.createJSDocOptionalType(type), pos);
        }
        return type;
    }

    function parseTypeQuery(): TypeQueryNode {
        const pos = getNodePos();
        parseExpected(SyntaxKind.TypeOfKeyword);
        const entityName = parseEntityName(/*allowReservedWords*/ true);
        // Make sure we perform ASI to prevent parsing the next line's type arguments as part of an instantiation expression.
        const typeArguments = !scanner.hasPrecedingLineBreak() ? tryParseTypeArguments() : undefined;
        return finishNode(factory.createTypeQueryNode(entityName, typeArguments), pos);
    }

    function parseTypeParameter(): TypeParameterDeclaration {
        const pos = getNodePos();
        const modifiers = parseModifiers(/*allowDecorators*/ false, /*permitConstAsModifier*/ true);
        const name = parseIdentifier();
        let constraint: TypeNode | undefined;
        let expression: Expression | undefined;
        if (parseOptional(SyntaxKind.ExtendsKeyword)) {
            // It's not uncommon for people to write improper constraints to a generic.  If the
            // user writes a constraint that is an expression and not an actual type, then parse
            // it out as an expression (so we can recover well), but report that a type is needed
            // instead.
            if (isStartOfType() || !isStartOfExpression()) {
                constraint = parseType();
            }
            else {
                // It was not a type, and it looked like an expression.  Parse out an expression
                // here so we recover well.  Note: it is important that we call parseUnaryExpression
                // and not parseExpression here.  If the user has:
                //
                //      <T extends "">
                //
                // We do *not* want to consume the `>` as we're consuming the expression for "".
                expression = parseUnaryExpressionOrHigher();
            }
        }

        const defaultType = parseOptional(SyntaxKind.EqualsToken) ? parseType() : undefined;
        const node = factory.createTypeParameterDeclaration(modifiers, name, constraint, defaultType);
        node.expression = expression;
        return finishNode(node, pos);
    }

    function parseTypeParameters(): NodeArray<TypeParameterDeclaration> | undefined {
        if (token() === SyntaxKind.LessThanToken) {
            return parseBracketedList(ParsingContext.TypeParameters, parseTypeParameter, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken);
        }
    }

    function isStartOfParameter(isJSDocParameter: boolean): boolean {
        return token() === SyntaxKind.DotDotDotToken ||
            isBindingIdentifierOrPrivateIdentifierOrPattern() ||
            isModifierKind(token()) ||
            token() === SyntaxKind.AtToken ||
            isStartOfType(/*inStartOfParameter*/ !isJSDocParameter);
    }

    function parseNameOfParameter(modifiers: NodeArray<ModifierLike> | undefined) {
        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]
        const name = parseIdentifierOrPattern(Diagnostics.Private_identifiers_cannot_be_used_as_parameters);
        if (getFullWidth(name) === 0 && !some(modifiers) && isModifierKind(token())) {
            // in cases like
            // 'use strict'
            // function foo(static)
            // isParameter('static') === true, because of isModifier('static')
            // however 'static' is not a legal identifier in a strict mode.
            // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
            // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
            // to avoid this we'll advance cursor to the next token.
            nextToken();
        }
        return name;
    }

    function isParameterNameStart() {
        // Be permissive about await and yield by calling isBindingIdentifier instead of isIdentifier; disallowing
        // them during a speculative parse leads to many more follow-on errors than allowing the function to parse then later
        // complaining about the use of the keywords.
        return isBindingIdentifier() || token() === SyntaxKind.OpenBracketToken || token() === SyntaxKind.OpenBraceToken;
    }

    function parseParameter(inOuterAwaitContext: boolean): ParameterDeclaration {
        return parseParameterWorker(inOuterAwaitContext);
    }

    function parseParameterForSpeculation(inOuterAwaitContext: boolean): ParameterDeclaration | undefined {
        return parseParameterWorker(inOuterAwaitContext, /*allowAmbiguity*/ false);
    }

    function parseParameterWorker(inOuterAwaitContext: boolean): ParameterDeclaration;
    function parseParameterWorker(inOuterAwaitContext: boolean, allowAmbiguity: false): ParameterDeclaration | undefined;
    function parseParameterWorker(inOuterAwaitContext: boolean, allowAmbiguity = true): ParameterDeclaration | undefined {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]

        // Decorators are parsed in the outer [Await] context, the rest of the parameter is parsed in the function's [Await] context.
        const modifiers = inOuterAwaitContext ?
            doInAwaitContext(() => parseModifiers(/*allowDecorators*/ true)) :
            doOutsideOfAwaitContext(() => parseModifiers(/*allowDecorators*/ true));

        if (token() === SyntaxKind.ThisKeyword) {
            const node = factory.createParameterDeclaration(
                modifiers,
                /*dotDotDotToken*/ undefined,
                createIdentifier(/*isIdentifier*/ true),
                /*questionToken*/ undefined,
                parseTypeAnnotation(),
                /*initializer*/ undefined,
            );

            const modifier = firstOrUndefined(modifiers);
            if (modifier) {
                parseErrorAtRange(modifier, Diagnostics.Neither_decorators_nor_modifiers_may_be_applied_to_this_parameters);
            }

            return withJSDoc(finishNode(node, pos), hasJSDoc);
        }

        const savedTopLevel = topLevel;
        topLevel = false;

        const dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);

        if (!allowAmbiguity && !isParameterNameStart()) {
            return undefined;
        }

        const node = withJSDoc(
            finishNode(
                factory.createParameterDeclaration(
                    modifiers,
                    dotDotDotToken,
                    parseNameOfParameter(modifiers),
                    parseOptionalToken(SyntaxKind.QuestionToken),
                    parseTypeAnnotation(),
                    parseInitializer(),
                ),
                pos,
            ),
            hasJSDoc,
        );
        topLevel = savedTopLevel;
        return node;
    }

    function parseReturnType(returnToken: SyntaxKind.EqualsGreaterThanToken, isType: boolean): TypeNode;
    function parseReturnType(returnToken: SyntaxKind.ColonToken | SyntaxKind.EqualsGreaterThanToken, isType: boolean): TypeNode | undefined;
    function parseReturnType(returnToken: SyntaxKind.ColonToken | SyntaxKind.EqualsGreaterThanToken, isType: boolean) {
        if (shouldParseReturnType(returnToken, isType)) {
            return allowConditionalTypesAnd(parseTypeOrTypePredicate);
        }
    }

    function shouldParseReturnType(returnToken: SyntaxKind.ColonToken | SyntaxKind.EqualsGreaterThanToken, isType: boolean): boolean {
        if (returnToken === SyntaxKind.EqualsGreaterThanToken) {
            parseExpected(returnToken);
            return true;
        }
        else if (parseOptional(SyntaxKind.ColonToken)) {
            return true;
        }
        else if (isType && token() === SyntaxKind.EqualsGreaterThanToken) {
            // This is easy to get backward, especially in type contexts, so parse the type anyway
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.ColonToken));
            nextToken();
            return true;
        }
        return false;
    }

    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: true): NodeArray<ParameterDeclaration>;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: false): NodeArray<ParameterDeclaration> | undefined;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: boolean): NodeArray<ParameterDeclaration> | undefined {
        // FormalParameters [Yield,Await]: (modified)
        //      [empty]
        //      FormalParameterList[?Yield,Await]
        //
        // FormalParameter[Yield,Await]: (modified)
        //      BindingElement[?Yield,Await]
        //
        // BindingElement [Yield,Await]: (modified)
        //      SingleNameBinding[?Yield,?Await]
        //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        //
        // SingleNameBinding [Yield,Await]:
        //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        const savedYieldContext = inYieldContext();
        const savedAwaitContext = inAwaitContext();

        setYieldContext(!!(flags & SignatureFlags.Yield));
        setAwaitContext(!!(flags & SignatureFlags.Await));

        const parameters = flags & SignatureFlags.JSDoc ?
            parseDelimitedList(ParsingContext.JSDocParameters, parseJSDocParameter) :
            parseDelimitedList(ParsingContext.Parameters, () => allowAmbiguity ? parseParameter(savedAwaitContext) : parseParameterForSpeculation(savedAwaitContext));

        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return parameters;
    }

    function parseParameters(flags: SignatureFlags): NodeArray<ParameterDeclaration> {
        // FormalParameters [Yield,Await]: (modified)
        //      [empty]
        //      FormalParameterList[?Yield,Await]
        //
        // FormalParameter[Yield,Await]: (modified)
        //      BindingElement[?Yield,Await]
        //
        // BindingElement [Yield,Await]: (modified)
        //      SingleNameBinding[?Yield,?Await]
        //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        //
        // SingleNameBinding [Yield,Await]:
        //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        if (!parseExpected(SyntaxKind.OpenParenToken)) {
            return createMissingList<ParameterDeclaration>();
        }

        const parameters = parseParametersWorker(flags, /*allowAmbiguity*/ true);
        parseExpected(SyntaxKind.CloseParenToken);
        return parameters;
    }

    function parseTypeMemberSemicolon() {
        // We allow type members to be separated by commas or (possibly ASI) semicolons.
        // First check if it was a comma.  If so, we're done with the member.
        if (parseOptional(SyntaxKind.CommaToken)) {
            return;
        }

        // Didn't have a comma.  We must have a (possible ASI) semicolon.
        parseSemicolon();
    }

    function parseSignatureMember(kind: SyntaxKind.CallSignature | SyntaxKind.ConstructSignature): CallSignatureDeclaration | ConstructSignatureDeclaration {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        if (kind === SyntaxKind.ConstructSignature) {
            parseExpected(SyntaxKind.NewKeyword);
        }

        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.Type);
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ true);
        parseTypeMemberSemicolon();
        const node = kind === SyntaxKind.CallSignature
            ? factory.createCallSignature(typeParameters, parameters, type)
            : factory.createConstructSignature(typeParameters, parameters, type);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isIndexSignature(): boolean {
        return token() === SyntaxKind.OpenBracketToken && lookAhead(isUnambiguouslyIndexSignature);
    }

    function isUnambiguouslyIndexSignature() {
        // The only allowed sequence is:
        //
        //   [id:
        //
        // However, for error recovery, we also check the following cases:
        //
        //   [...
        //   [id,
        //   [id?,
        //   [id?:
        //   [id?]
        //   [public id
        //   [private id
        //   [protected id
        //   []
        //
        nextToken();
        if (token() === SyntaxKind.DotDotDotToken || token() === SyntaxKind.CloseBracketToken) {
            return true;
        }

        if (isModifierKind(token())) {
            nextToken();
            if (isIdentifier()) {
                return true;
            }
        }
        else if (!isIdentifier()) {
            return false;
        }
        else {
            // Skip the identifier
            nextToken();
        }

        // A colon signifies a well formed indexer
        // A comma should be a badly formed indexer because comma expressions are not allowed
        // in computed properties.
        if (token() === SyntaxKind.ColonToken || token() === SyntaxKind.CommaToken) {
            return true;
        }

        // Question mark could be an indexer with an optional property,
        // or it could be a conditional expression in a computed property.
        if (token() !== SyntaxKind.QuestionToken) {
            return false;
        }

        // If any of the following tokens are after the question mark, it cannot
        // be a conditional expression, so treat it as an indexer.
        nextToken();
        return token() === SyntaxKind.ColonToken || token() === SyntaxKind.CommaToken || token() === SyntaxKind.CloseBracketToken;
    }

    function parseIndexSignatureDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): IndexSignatureDeclaration {
        const parameters = parseBracketedList<ParameterDeclaration>(ParsingContext.Parameters, () => parseParameter(/*inOuterAwaitContext*/ false), SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken);
        const type = parseTypeAnnotation();
        parseTypeMemberSemicolon();
        const node = factory.createIndexSignature(modifiers, parameters, type);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyOrMethodSignature(pos: number, hasJSDoc: boolean, modifiers: NodeArray<Modifier> | undefined): PropertySignature | MethodSignature {
        const name = parsePropertyName();
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        let node: PropertySignature | MethodSignature;
        if (token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken) {
            // Method signatures don't exist in expression contexts.  So they have neither
            // [Yield] nor [Await]
            const typeParameters = parseTypeParameters();
            const parameters = parseParameters(SignatureFlags.Type);
            const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ true);
            node = factory.createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type);
        }
        else {
            const type = parseTypeAnnotation();
            node = factory.createPropertySignature(modifiers, name, questionToken, type);
            // Although type literal properties cannot not have initializers, we attempt
            // to parse an initializer so we can report in the checker that an interface
            // property or type literal property cannot have an initializer.
            if (token() === SyntaxKind.EqualsToken) (node as Mutable<PropertySignature>).initializer = parseInitializer();
        }
        parseTypeMemberSemicolon();
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isTypeMemberStart(): boolean {
        // Return true if we have the start of a signature member
        if (
            token() === SyntaxKind.OpenParenToken ||
            token() === SyntaxKind.LessThanToken ||
            token() === SyntaxKind.GetKeyword ||
            token() === SyntaxKind.SetKeyword
        ) {
            return true;
        }
        let idToken = false;
        // Eat up all modifiers, but hold on to the last one in case it is actually an identifier
        while (isModifierKind(token())) {
            idToken = true;
            nextToken();
        }
        // Index signatures and computed property names are type members
        if (token() === SyntaxKind.OpenBracketToken) {
            return true;
        }
        // Try to get the first property-like token following all modifiers
        if (isLiteralPropertyName()) {
            idToken = true;
            nextToken();
        }
        // If we were able to get any potential identifier, check that it is
        // the start of a member declaration
        if (idToken) {
            return token() === SyntaxKind.OpenParenToken ||
                token() === SyntaxKind.LessThanToken ||
                token() === SyntaxKind.QuestionToken ||
                token() === SyntaxKind.ColonToken ||
                token() === SyntaxKind.CommaToken ||
                canParseSemicolon();
        }
        return false;
    }

    function parseTypeMember(): TypeElement {
        if (token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken) {
            return parseSignatureMember(SyntaxKind.CallSignature);
        }
        if (token() === SyntaxKind.NewKeyword && lookAhead(nextTokenIsOpenParenOrLessThan)) {
            return parseSignatureMember(SyntaxKind.ConstructSignature);
        }
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ false);
        if (parseContextualModifier(SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.GetAccessor, SignatureFlags.Type);
        }

        if (parseContextualModifier(SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.SetAccessor, SignatureFlags.Type);
        }

        if (isIndexSignature()) {
            return parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers);
        }
        return parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers);
    }

    function nextTokenIsOpenParenOrLessThan() {
        nextToken();
        return token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken;
    }

    function nextTokenIsDot() {
        return nextToken() === SyntaxKind.DotToken;
    }

    function nextTokenIsOpenParenOrLessThanOrDot() {
        switch (nextToken()) {
            case SyntaxKind.OpenParenToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.DotToken:
                return true;
        }
        return false;
    }

    function parseTypeLiteral(): TypeLiteralNode {
        const pos = getNodePos();
        return finishNode(factory.createTypeLiteralNode(parseObjectTypeMembers()), pos);
    }

    function parseObjectTypeMembers(): NodeArray<TypeElement> {
        let members: NodeArray<TypeElement>;
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            members = parseList(ParsingContext.TypeMembers, parseTypeMember);
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<TypeElement>();
        }

        return members;
    }

    function isStartOfMappedType() {
        nextToken();
        if (token() === SyntaxKind.PlusToken || token() === SyntaxKind.MinusToken) {
            return nextToken() === SyntaxKind.ReadonlyKeyword;
        }
        if (token() === SyntaxKind.ReadonlyKeyword) {
            nextToken();
        }
        return token() === SyntaxKind.OpenBracketToken && nextTokenIsIdentifier() && nextToken() === SyntaxKind.InKeyword;
    }

    function parseMappedTypeParameter() {
        const pos = getNodePos();
        const name = parseIdentifierName();
        parseExpected(SyntaxKind.InKeyword);
        const type = parseType();
        return finishNode(factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, type, /*defaultType*/ undefined), pos);
    }

    function parseMappedType() {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBraceToken);
        let readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined;
        if (token() === SyntaxKind.ReadonlyKeyword || token() === SyntaxKind.PlusToken || token() === SyntaxKind.MinusToken) {
            readonlyToken = parseTokenNode<ReadonlyKeyword | PlusToken | MinusToken>();
            if (readonlyToken.kind !== SyntaxKind.ReadonlyKeyword) {
                parseExpected(SyntaxKind.ReadonlyKeyword);
            }
        }
        parseExpected(SyntaxKind.OpenBracketToken);
        const typeParameter = parseMappedTypeParameter();
        const nameType = parseOptional(SyntaxKind.AsKeyword) ? parseType() : undefined;
        parseExpected(SyntaxKind.CloseBracketToken);
        let questionToken: QuestionToken | PlusToken | MinusToken | undefined;
        if (token() === SyntaxKind.QuestionToken || token() === SyntaxKind.PlusToken || token() === SyntaxKind.MinusToken) {
            questionToken = parseTokenNode<QuestionToken | PlusToken | MinusToken>();
            if (questionToken.kind !== SyntaxKind.QuestionToken) {
                parseExpected(SyntaxKind.QuestionToken);
            }
        }
        const type = parseTypeAnnotation();
        parseSemicolon();
        const members = parseList(ParsingContext.TypeMembers, parseTypeMember);
        parseExpected(SyntaxKind.CloseBraceToken);
        return finishNode(factory.createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), pos);
    }

    function parseTupleElementType() {
        const pos = getNodePos();
        if (parseOptional(SyntaxKind.DotDotDotToken)) {
            return finishNode(factory.createRestTypeNode(parseType()), pos);
        }
        const type = parseType();
        if (isJSDocNullableType(type) && type.pos === type.type.pos) {
            const node = factory.createOptionalTypeNode(type.type);
            setTextRange(node, type);
            (node as Mutable<Node>).flags = type.flags;
            return node;
        }
        return type;
    }

    function isNextTokenColonOrQuestionColon() {
        return nextToken() === SyntaxKind.ColonToken || (token() === SyntaxKind.QuestionToken && nextToken() === SyntaxKind.ColonToken);
    }

    function isTupleElementName() {
        if (token() === SyntaxKind.DotDotDotToken) {
            return tokenIsIdentifierOrKeyword(nextToken()) && isNextTokenColonOrQuestionColon();
        }
        return tokenIsIdentifierOrKeyword(token()) && isNextTokenColonOrQuestionColon();
    }

    function parseTupleElementNameOrTupleElementType() {
        if (lookAhead(isTupleElementName)) {
            const pos = getNodePos();
            const hasJSDoc = hasPrecedingJSDocComment();
            const dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
            const name = parseIdentifierName();
            const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
            parseExpected(SyntaxKind.ColonToken);
            const type = parseTupleElementType();
            const node = factory.createNamedTupleMember(dotDotDotToken, name, questionToken, type);
            return withJSDoc(finishNode(node, pos), hasJSDoc);
        }
        return parseTupleElementType();
    }

    function parseTupleType(): TupleTypeNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTupleTypeNode(
                parseBracketedList(ParsingContext.TupleElementTypes, parseTupleElementNameOrTupleElementType, SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken),
            ),
            pos,
        );
    }

    function parseParenthesizedType(): TypeNode {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenParenToken);
        const type = parseType();
        parseExpected(SyntaxKind.CloseParenToken);
        return finishNode(factory.createParenthesizedType(type), pos);
    }

    function parseModifiersForConstructorType(): NodeArray<Modifier> | undefined {
        let modifiers: NodeArray<Modifier> | undefined;
        if (token() === SyntaxKind.AbstractKeyword) {
            const pos = getNodePos();
            nextToken();
            const modifier = finishNode(factoryCreateToken(SyntaxKind.AbstractKeyword), pos);
            modifiers = createNodeArray<Modifier>([modifier], pos);
        }
        return modifiers;
    }

    function parseFunctionOrConstructorType(): TypeNode {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiersForConstructorType();
        const isConstructorType = parseOptional(SyntaxKind.NewKeyword);
        Debug.assert(!modifiers || isConstructorType, "Per isStartOfFunctionOrConstructorType, a function type cannot have modifiers.");
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.Type);
        const type = parseReturnType(SyntaxKind.EqualsGreaterThanToken, /*isType*/ false);
        const node = isConstructorType
            ? factory.createConstructorTypeNode(modifiers, typeParameters, parameters, type)
            : factory.createFunctionTypeNode(typeParameters, parameters, type);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseKeywordAndNoDot(): TypeNode | undefined {
        const node = parseTokenNode<TypeNode>();
        return token() === SyntaxKind.DotToken ? undefined : node;
    }

    function parseLiteralTypeNode(negative?: boolean): LiteralTypeNode {
        const pos = getNodePos();
        if (negative) {
            nextToken();
        }
        let expression: BooleanLiteral | NullLiteral | LiteralExpression | PrefixUnaryExpression = token() === SyntaxKind.TrueKeyword || token() === SyntaxKind.FalseKeyword || token() === SyntaxKind.NullKeyword ?
            parseTokenNode<BooleanLiteral | NullLiteral>() :
            parseLiteralLikeNode(token()) as LiteralExpression;
        if (negative) {
            expression = finishNode(factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, expression), pos);
        }
        return finishNode(factory.createLiteralTypeNode(expression), pos);
    }

    function isStartOfTypeOfImportType() {
        nextToken();
        return token() === SyntaxKind.ImportKeyword;
    }

    function parseImportType(): ImportTypeNode {
        sourceFlags |= NodeFlags.PossiblyContainsDynamicImport;
        const pos = getNodePos();
        const isTypeOf = parseOptional(SyntaxKind.TypeOfKeyword);
        parseExpected(SyntaxKind.ImportKeyword);
        parseExpected(SyntaxKind.OpenParenToken);
        const type = parseType();
        let attributes: ImportAttributes | undefined;
        if (parseOptional(SyntaxKind.CommaToken)) {
            const openBracePosition = scanner.getTokenStart();
            parseExpected(SyntaxKind.OpenBraceToken);
            const currentToken = token();
            if (currentToken === SyntaxKind.WithKeyword || currentToken === SyntaxKind.AssertKeyword) {
                nextToken();
            }
            else {
                parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.WithKeyword));
            }
            parseExpected(SyntaxKind.ColonToken);
            attributes = parseImportAttributes(currentToken as SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword, /*skipKeyword*/ true);
            if (!parseExpected(SyntaxKind.CloseBraceToken)) {
                const lastError = lastOrUndefined(parseDiagnostics);
                if (lastError && lastError.code === Diagnostics._0_expected.code) {
                    addRelatedInfo(
                        lastError,
                        createDetachedDiagnostic(fileName, sourceText, openBracePosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}"),
                    );
                }
            }
        }
        parseExpected(SyntaxKind.CloseParenToken);
        const qualifier = parseOptional(SyntaxKind.DotToken) ? parseEntityNameOfTypeReference() : undefined;
        const typeArguments = parseTypeArgumentsOfTypeReference();
        return finishNode(factory.createImportTypeNode(type, attributes, qualifier, typeArguments, isTypeOf), pos);
    }

    function nextTokenIsNumericOrBigIntLiteral() {
        nextToken();
        return token() === SyntaxKind.NumericLiteral || token() === SyntaxKind.BigIntLiteral;
    }

    function parseNonArrayType(): TypeNode {
        switch (token()) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.UndefinedKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.ObjectKeyword:
                // If these are followed by a dot, then parse these out as a dotted type reference instead.
                return tryParse(parseKeywordAndNoDot) || parseTypeReference();
            case SyntaxKind.AsteriskEqualsToken:
                // If there is '*=', treat it as * followed by postfix =
                scanner.reScanAsteriskEqualsToken();
                // falls through
            case SyntaxKind.AsteriskToken:
                return parseJSDocAllType();
            case SyntaxKind.QuestionQuestionToken:
                // If there is '??', treat it as prefix-'?' in JSDoc type.
                scanner.reScanQuestionToken();
                // falls through
            case SyntaxKind.QuestionToken:
                return parseJSDocUnknownOrNullableType();
            case SyntaxKind.FunctionKeyword:
                return parseJSDocFunctionType();
            case SyntaxKind.ExclamationToken:
                return parseJSDocNonNullableType();
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
                return parseLiteralTypeNode();
            case SyntaxKind.MinusToken:
                return lookAhead(nextTokenIsNumericOrBigIntLiteral) ? parseLiteralTypeNode(/*negative*/ true) : parseTypeReference();
            case SyntaxKind.VoidKeyword:
                return parseTokenNode<TypeNode>();
            case SyntaxKind.ThisKeyword: {
                const thisKeyword = parseThisTypeNode();
                if (token() === SyntaxKind.IsKeyword && !scanner.hasPrecedingLineBreak()) {
                    return parseThisTypePredicate(thisKeyword);
                }
                else {
                    return thisKeyword;
                }
            }
            case SyntaxKind.TypeOfKeyword:
                return lookAhead(isStartOfTypeOfImportType) ? parseImportType() : parseTypeQuery();
            case SyntaxKind.OpenBraceToken:
                return lookAhead(isStartOfMappedType) ? parseMappedType() : parseTypeLiteral();
            case SyntaxKind.OpenBracketToken:
                return parseTupleType();
            case SyntaxKind.OpenParenToken:
                return parseParenthesizedType();
            case SyntaxKind.ImportKeyword:
                return parseImportType();
            case SyntaxKind.AssertsKeyword:
                return lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine) ? parseAssertsTypePredicate() : parseTypeReference();
            case SyntaxKind.TemplateHead:
                return parseTemplateType();
            default:
                return parseTypeReference();
        }
    }

    function isStartOfType(inStartOfParameter?: boolean): boolean {
        switch (token()) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BigIntKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.UniqueKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.UndefinedKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.TypeOfKeyword:
            case SyntaxKind.NeverKeyword:
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.OpenBracketToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.BarToken:
            case SyntaxKind.AmpersandToken:
            case SyntaxKind.NewKeyword:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.QuestionToken:
            case SyntaxKind.ExclamationToken:
            case SyntaxKind.DotDotDotToken:
            case SyntaxKind.InferKeyword:
            case SyntaxKind.ImportKeyword:
            case SyntaxKind.AssertsKeyword:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateHead:
                return true;
            case SyntaxKind.FunctionKeyword:
                return !inStartOfParameter;
            case SyntaxKind.MinusToken:
                return !inStartOfParameter && lookAhead(nextTokenIsNumericOrBigIntLiteral);
            case SyntaxKind.OpenParenToken:
                // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
                // or something that starts a type. We don't want to consider things like '(1)' a type.
                return !inStartOfParameter && lookAhead(isStartOfParenthesizedOrFunctionType);
            default:
                return isIdentifier();
        }
    }

    function isStartOfParenthesizedOrFunctionType() {
        nextToken();
        return token() === SyntaxKind.CloseParenToken || isStartOfParameter(/*isJSDocParameter*/ false) || isStartOfType();
    }

    function parsePostfixTypeOrHigher(): TypeNode {
        const pos = getNodePos();
        let type = parseNonArrayType();
        while (!scanner.hasPrecedingLineBreak()) {
            switch (token()) {
                case SyntaxKind.ExclamationToken:
                    nextToken();
                    type = finishNode(factory.createJSDocNonNullableType(type, /*postfix*/ true), pos);
                    break;
                case SyntaxKind.QuestionToken:
                    // If next token is start of a type we have a conditional type
                    if (lookAhead(nextTokenIsStartOfType)) {
                        return type;
                    }
                    nextToken();
                    type = finishNode(factory.createJSDocNullableType(type, /*postfix*/ true), pos);
                    break;
                case SyntaxKind.OpenBracketToken:
                    parseExpected(SyntaxKind.OpenBracketToken);
                    if (isStartOfType()) {
                        const indexType = parseType();
                        parseExpected(SyntaxKind.CloseBracketToken);
                        type = finishNode(factory.createIndexedAccessTypeNode(type, indexType), pos);
                    }
                    else {
                        parseExpected(SyntaxKind.CloseBracketToken);
                        type = finishNode(factory.createArrayTypeNode(type), pos);
                    }
                    break;
                default:
                    return type;
            }
        }
        return type;
    }

    function parseTypeOperator(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword) {
        const pos = getNodePos();
        parseExpected(operator);
        return finishNode(factory.createTypeOperatorNode(operator, parseTypeOperatorOrHigher()), pos);
    }

    function tryParseConstraintOfInferType() {
        if (parseOptional(SyntaxKind.ExtendsKeyword)) {
            const constraint = disallowConditionalTypesAnd(parseType);
            if (inDisallowConditionalTypesContext() || token() !== SyntaxKind.QuestionToken) {
                return constraint;
            }
        }
    }

    function parseTypeParameterOfInferType(): TypeParameterDeclaration {
        const pos = getNodePos();
        const name = parseIdentifier();
        const constraint = tryParse(tryParseConstraintOfInferType);
        const node = factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, constraint);
        return finishNode(node, pos);
    }

    function parseInferType(): InferTypeNode {
        const pos = getNodePos();
        parseExpected(SyntaxKind.InferKeyword);
        return finishNode(factory.createInferTypeNode(parseTypeParameterOfInferType()), pos);
    }

    function parseTypeOperatorOrHigher(): TypeNode {
        const operator = token();
        switch (operator) {
            case SyntaxKind.KeyOfKeyword:
            case SyntaxKind.UniqueKeyword:
            case SyntaxKind.ReadonlyKeyword:
                return parseTypeOperator(operator);
            case SyntaxKind.InferKeyword:
                return parseInferType();
        }
        return allowConditionalTypesAnd(parsePostfixTypeOrHigher);
    }

    function parseFunctionOrConstructorTypeToError(
        isInUnionType: boolean,
    ): TypeNode | undefined {
        // the function type and constructor type shorthand notation
        // are not allowed directly in unions and intersections, but we'll
        // try to parse them gracefully and issue a helpful message.
        if (isStartOfFunctionTypeOrConstructorType()) {
            const type = parseFunctionOrConstructorType();
            let diagnostic: DiagnosticMessage;
            if (isFunctionTypeNode(type)) {
                diagnostic = isInUnionType
                    ? Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type
                    : Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
            }
            else {
                diagnostic = isInUnionType
                    ? Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type
                    : Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
            }
            parseErrorAtRange(type, diagnostic);
            return type;
        }
        return undefined;
    }

    function parseUnionOrIntersectionType(
        operator: SyntaxKind.BarToken | SyntaxKind.AmpersandToken,
        parseConstituentType: () => TypeNode,
        createTypeNode: (types: NodeArray<TypeNode>) => UnionOrIntersectionTypeNode,
    ): TypeNode {
        const pos = getNodePos();
        const isUnionType = operator === SyntaxKind.BarToken;
        const hasLeadingOperator = parseOptional(operator);
        let type = hasLeadingOperator && parseFunctionOrConstructorTypeToError(isUnionType)
            || parseConstituentType();
        if (token() === operator || hasLeadingOperator) {
            const types = [type];
            while (parseOptional(operator)) {
                types.push(parseFunctionOrConstructorTypeToError(isUnionType) || parseConstituentType());
            }
            type = finishNode(createTypeNode(createNodeArray(types, pos)), pos);
        }
        return type;
    }

    function parseIntersectionTypeOrHigher(): TypeNode {
        return parseUnionOrIntersectionType(SyntaxKind.AmpersandToken, parseTypeOperatorOrHigher, factory.createIntersectionTypeNode);
    }

    function parseUnionTypeOrHigher(): TypeNode {
        return parseUnionOrIntersectionType(SyntaxKind.BarToken, parseIntersectionTypeOrHigher, factory.createUnionTypeNode);
    }

    function nextTokenIsNewKeyword(): boolean {
        nextToken();
        return token() === SyntaxKind.NewKeyword;
    }

    function isStartOfFunctionTypeOrConstructorType(): boolean {
        if (token() === SyntaxKind.LessThanToken) {
            return true;
        }
        if (token() === SyntaxKind.OpenParenToken && lookAhead(isUnambiguouslyStartOfFunctionType)) {
            return true;
        }
        return token() === SyntaxKind.NewKeyword ||
            token() === SyntaxKind.AbstractKeyword && lookAhead(nextTokenIsNewKeyword);
    }

    function skipParameterStart(): boolean {
        if (isModifierKind(token())) {
            // Skip modifiers
            parseModifiers(/*allowDecorators*/ false);
        }
        if (isIdentifier() || token() === SyntaxKind.ThisKeyword) {
            nextToken();
            return true;
        }
        if (token() === SyntaxKind.OpenBracketToken || token() === SyntaxKind.OpenBraceToken) {
            // Return true if we can parse an array or object binding pattern with no errors
            const previousErrorCount = parseDiagnostics.length;
            parseIdentifierOrPattern();
            return previousErrorCount === parseDiagnostics.length;
        }
        return false;
    }

    function isUnambiguouslyStartOfFunctionType() {
        nextToken();
        if (token() === SyntaxKind.CloseParenToken || token() === SyntaxKind.DotDotDotToken) {
            // ( )
            // ( ...
            return true;
        }
        if (skipParameterStart()) {
            // We successfully skipped modifiers (if any) and an identifier or binding pattern,
            // now see if we have something that indicates a parameter declaration
            if (
                token() === SyntaxKind.ColonToken || token() === SyntaxKind.CommaToken ||
                token() === SyntaxKind.QuestionToken || token() === SyntaxKind.EqualsToken
            ) {
                // ( xxx :
                // ( xxx ,
                // ( xxx ?
                // ( xxx =
                return true;
            }
            if (token() === SyntaxKind.CloseParenToken) {
                nextToken();
                if (token() === SyntaxKind.EqualsGreaterThanToken) {
                    // ( xxx ) =>
                    return true;
                }
            }
        }
        return false;
    }

    function parseTypeOrTypePredicate(): TypeNode {
        const pos = getNodePos();
        const typePredicateVariable = isIdentifier() && tryParse(parseTypePredicatePrefix);
        const type = parseType();
        if (typePredicateVariable) {
            return finishNode(factory.createTypePredicateNode(/*assertsModifier*/ undefined, typePredicateVariable, type), pos);
        }
        else {
            return type;
        }
    }

    function parseTypePredicatePrefix() {
        const id = parseIdentifier();
        if (token() === SyntaxKind.IsKeyword && !scanner.hasPrecedingLineBreak()) {
            nextToken();
            return id;
        }
    }

    function parseAssertsTypePredicate(): TypeNode {
        const pos = getNodePos();
        const assertsModifier = parseExpectedToken(SyntaxKind.AssertsKeyword);
        const parameterName = token() === SyntaxKind.ThisKeyword ? parseThisTypeNode() : parseIdentifier();
        const type = parseOptional(SyntaxKind.IsKeyword) ? parseType() : undefined;
        return finishNode(factory.createTypePredicateNode(assertsModifier, parameterName, type), pos);
    }

    function parseType(): TypeNode {
        if (contextFlags & NodeFlags.TypeExcludesFlags) {
            return doOutsideOfContext(NodeFlags.TypeExcludesFlags, parseType);
        }
        if (isStartOfFunctionTypeOrConstructorType()) {
            return parseFunctionOrConstructorType();
        }
        const pos = getNodePos();
        const type = parseUnionTypeOrHigher();
        if (!inDisallowConditionalTypesContext() && !scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.ExtendsKeyword)) {
            // The type following 'extends' is not permitted to be another conditional type
            const extendsType = disallowConditionalTypesAnd(parseType);
            parseExpected(SyntaxKind.QuestionToken);
            const trueType = allowConditionalTypesAnd(parseType);
            parseExpected(SyntaxKind.ColonToken);
            const falseType = allowConditionalTypesAnd(parseType);
            return finishNode(factory.createConditionalTypeNode(type, extendsType, trueType, falseType), pos);
        }
        return type;
    }

    function parseTypeAnnotation(): TypeNode | undefined {
        return parseOptional(SyntaxKind.ColonToken) ? parseType() : undefined;
    }

    // EXPRESSIONS
    function isStartOfLeftHandSideExpression(): boolean {
        switch (token()) {
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.TemplateHead:
            case SyntaxKind.OpenParenToken:
            case SyntaxKind.OpenBracketToken:
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.NewKeyword:
            case SyntaxKind.SlashToken:
            case SyntaxKind.SlashEqualsToken:
            case SyntaxKind.Identifier:
                return true;
            case SyntaxKind.ImportKeyword:
                return lookAhead(nextTokenIsOpenParenOrLessThanOrDot);
            default:
                return isIdentifier();
        }
    }

    function isStartOfExpression(): boolean {
        if (isStartOfLeftHandSideExpression()) {
            return true;
        }

        switch (token()) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
            case SyntaxKind.DeleteKeyword:
            case SyntaxKind.TypeOfKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.PlusPlusToken:
            case SyntaxKind.MinusMinusToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.AwaitKeyword:
            case SyntaxKind.YieldKeyword:
            case SyntaxKind.PrivateIdentifier:
            case SyntaxKind.AtToken:
                // Yield/await always starts an expression.  Either it is an identifier (in which case
                // it is definitely an expression).  Or it's a keyword (either because we're in
                // a generator or async function, or in strict mode (or both)) and it started a yield or await expression.
                return true;
            default:
                // Error tolerance.  If we see the start of some binary operator, we consider
                // that the start of an expression.  That way we'll parse out a missing identifier,
                // give a good message about an identifier being missing, and then consume the
                // rest of the binary expression.
                if (isBinaryOperator()) {
                    return true;
                }

                return isIdentifier();
        }
    }

    function isStartOfExpressionStatement(): boolean {
        // As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
        return token() !== SyntaxKind.OpenBraceToken &&
            token() !== SyntaxKind.FunctionKeyword &&
            token() !== SyntaxKind.ClassKeyword &&
            token() !== SyntaxKind.AtToken &&
            isStartOfExpression();
    }

    function parseExpression(): Expression {
        // Expression[in]:
        //      AssignmentExpression[in]
        //      Expression[in] , AssignmentExpression[in]

        // clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
        const saveDecoratorContext = inDecoratorContext();
        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ false);
        }

        const pos = getNodePos();
        let expr = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        let operatorToken: BinaryOperatorToken;
        while ((operatorToken = parseOptionalToken(SyntaxKind.CommaToken))) {
            expr = makeBinaryExpression(expr, operatorToken, parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true), pos);
        }

        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ true);
        }
        return expr;
    }

    function parseInitializer(): Expression | undefined {
        return parseOptional(SyntaxKind.EqualsToken) ? parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true) : undefined;
    }

    function parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction: boolean): Expression {
        //  AssignmentExpression[in,yield]:
        //      1) ConditionalExpression[?in,?yield]
        //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
        //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
        //      4) ArrowFunctionExpression[?in,?yield]
        //      5) AsyncArrowFunctionExpression[in,yield,await]
        //      6) [+Yield] YieldExpression[?In]
        //
        // Note: for ease of implementation we treat productions '2' and '3' as the same thing.
        // (i.e. they're both BinaryExpressions with an assignment operator in it).

        // First, do the simple check if we have a YieldExpression (production '6').
        if (isYieldExpression()) {
            return parseYieldExpression();
        }

        // Then, check if we have an arrow function (production '4' and '5') that starts with a parenthesized
        // parameter list or is an async arrow function.
        // AsyncArrowFunctionExpression:
        //      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
        //      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
        // Production (1) of AsyncArrowFunctionExpression is parsed in "tryParseAsyncSimpleArrowFunctionExpression".
        // And production (2) is parsed in "tryParseParenthesizedArrowFunctionExpression".
        //
        // If we do successfully parse arrow-function, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
        // not a LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done
        // with AssignmentExpression if we see one.
        const arrowExpression = tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) || tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction);
        if (arrowExpression) {
            return arrowExpression;
        }

        // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
        // start with a LogicalOrExpression, while the assignment productions can only start with
        // LeftHandSideExpressions.
        //
        // So, first, we try to just parse out a BinaryExpression.  If we get something that is a
        // LeftHandSide or higher, then we can try to parse out the assignment expression part.
        // Otherwise, we try to parse out the conditional expression bit.  We want to allow any
        // binary expression here, so we pass in the 'lowest' precedence here so that it matches
        // and consumes anything.
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const expr = parseBinaryExpressionOrHigher(OperatorPrecedence.Lowest);

        // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
        // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
        // identifier and the current token is an arrow.
        if (expr.kind === SyntaxKind.Identifier && token() === SyntaxKind.EqualsGreaterThanToken) {
            return parseSimpleArrowFunctionExpression(pos, expr as Identifier, allowReturnTypeInArrowFunction, hasJSDoc, /*asyncModifier*/ undefined);
        }

        // Now see if we might be in cases '2' or '3'.
        // If the expression was a LHS expression, and we have an assignment operator, then
        // we're in '2' or '3'. Consume the assignment and return.
        //
        // Note: we call reScanGreaterToken so that we get an appropriately merged token
        // for cases like `> > =` becoming `>>=`
        if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
            return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction), pos);
        }

        // It wasn't an assignment or a lambda.  This is a conditional expression:
        return parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction);
    }

    function isYieldExpression(): boolean {
        if (token() === SyntaxKind.YieldKeyword) {
            // If we have a 'yield' keyword, and this is a context where yield expressions are
            // allowed, then definitely parse out a yield expression.
            if (inYieldContext()) {
                return true;
            }

            // We're in a context where 'yield expr' is not allowed.  However, if we can
            // definitely tell that the user was trying to parse a 'yield expr' and not
            // just a normal expr that start with a 'yield' identifier, then parse out
            // a 'yield expr'.  We can then report an error later that they are only
            // allowed in generator expressions.
            //
            // for example, if we see 'yield(foo)', then we'll have to treat that as an
            // invocation expression of something called 'yield'.  However, if we have
            // 'yield foo' then that is not legal as a normal expression, so we can
            // definitely recognize this as a yield expression.
            //
            // for now we just check if the next token is an identifier.  More heuristics
            // can be added here later as necessary.  We just need to make sure that we
            // don't accidentally consume something legal.
            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
        }

        return false;
    }

    function nextTokenIsIdentifierOnSameLine() {
        nextToken();
        return !scanner.hasPrecedingLineBreak() && isIdentifier();
    }

    function parseYieldExpression(): YieldExpression {
        const pos = getNodePos();

        // YieldExpression[In] :
        //      yield
        //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        nextToken();

        if (
            !scanner.hasPrecedingLineBreak() &&
            (token() === SyntaxKind.AsteriskToken || isStartOfExpression())
        ) {
            return finishNode(
                factory.createYieldExpression(
                    parseOptionalToken(SyntaxKind.AsteriskToken),
                    parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true),
                ),
                pos,
            );
        }
        else {
            // if the next token is not on the same line as yield.  or we don't have an '*' or
            // the start of an expression, then this is just a simple "yield" expression.
            return finishNode(factory.createYieldExpression(/*asteriskToken*/ undefined, /*expression*/ undefined), pos);
        }
    }

    function parseSimpleArrowFunctionExpression(pos: number, identifier: Identifier, allowReturnTypeInArrowFunction: boolean, hasJSDoc: boolean, asyncModifier?: NodeArray<Modifier> | undefined): ArrowFunction {
        Debug.assert(token() === SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
        const parameter = factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            identifier,
            /*questionToken*/ undefined,
            /*type*/ undefined,
            /*initializer*/ undefined,
        );
        finishNode(parameter, identifier.pos);

        const parameters = createNodeArray<ParameterDeclaration>([parameter], parameter.pos, parameter.end);
        const equalsGreaterThanToken = parseExpectedToken(SyntaxKind.EqualsGreaterThanToken);
        const body = parseArrowFunctionExpressionBody(/*isAsync*/ !!asyncModifier, allowReturnTypeInArrowFunction);
        const node = factory.createArrowFunction(asyncModifier, /*typeParameters*/ undefined, parameters, /*type*/ undefined, equalsGreaterThanToken, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): Expression | undefined {
        const triState = isParenthesizedArrowFunctionExpression();
        if (triState === Tristate.False) {
            // It's definitely not a parenthesized arrow function expression.
            return undefined;
        }

        // If we definitely have an arrow function, then we can just parse one, not requiring a
        // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
        // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
        // expression instead.
        return triState === Tristate.True ?
            parseParenthesizedArrowFunctionExpression(/*allowAmbiguity*/ true, /*allowReturnTypeInArrowFunction*/ true) :
            tryParse(() => parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction));
    }

    //  True        -> We definitely expect a parenthesized arrow function here.
    //  False       -> There *cannot* be a parenthesized arrow function here.
    //  Unknown     -> There *might* be a parenthesized arrow function here.
    //                 Speculatively look ahead to be sure, and rollback if not.
    function isParenthesizedArrowFunctionExpression(): Tristate {
        if (token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken || token() === SyntaxKind.AsyncKeyword) {
            return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
        }

        if (token() === SyntaxKind.EqualsGreaterThanToken) {
            // ERROR RECOVERY TWEAK:
            // If we see a standalone => try to parse it as an arrow function expression as that's
            // likely what the user intended to write.
            return Tristate.True;
        }
        // Definitely not a parenthesized arrow function.
        return Tristate.False;
    }

    function isParenthesizedArrowFunctionExpressionWorker() {
        if (token() === SyntaxKind.AsyncKeyword) {
            nextToken();
            if (scanner.hasPrecedingLineBreak()) {
                return Tristate.False;
            }
            if (token() !== SyntaxKind.OpenParenToken && token() !== SyntaxKind.LessThanToken) {
                return Tristate.False;
            }
        }

        const first = token();
        const second = nextToken();

        if (first === SyntaxKind.OpenParenToken) {
            if (second === SyntaxKind.CloseParenToken) {
                // Simple cases: "() =>", "(): ", and "() {".
                // This is an arrow function with no parameters.
                // The last one is not actually an arrow function,
                // but this is probably what the user intended.
                const third = nextToken();
                switch (third) {
                    case SyntaxKind.EqualsGreaterThanToken:
                    case SyntaxKind.ColonToken:
                    case SyntaxKind.OpenBraceToken:
                        return Tristate.True;
                    default:
                        return Tristate.False;
                }
            }

            // If encounter "([" or "({", this could be the start of a binding pattern.
            // Examples:
            //      ([ x ]) => { }
            //      ({ x }) => { }
            //      ([ x ])
            //      ({ x })
            if (second === SyntaxKind.OpenBracketToken || second === SyntaxKind.OpenBraceToken) {
                return Tristate.Unknown;
            }

            // Simple case: "(..."
            // This is an arrow function with a rest parameter.
            if (second === SyntaxKind.DotDotDotToken) {
                return Tristate.True;
            }

            // Check for "(xxx yyy", where xxx is a modifier and yyy is an identifier. This
            // isn't actually allowed, but we want to treat it as a lambda so we can provide
            // a good error message.
            if (isModifierKind(second) && second !== SyntaxKind.AsyncKeyword && lookAhead(nextTokenIsIdentifier)) {
                if (nextToken() === SyntaxKind.AsKeyword) {
                    // https://github.com/microsoft/TypeScript/issues/44466
                    return Tristate.False;
                }
                return Tristate.True;
            }

            // If we had "(" followed by something that's not an identifier,
            // then this definitely doesn't look like a lambda.  "this" is not
            // valid, but we want to parse it and then give a semantic error.
            if (!isIdentifier() && second !== SyntaxKind.ThisKeyword) {
                return Tristate.False;
            }

            switch (nextToken()) {
                case SyntaxKind.ColonToken:
                    // If we have something like "(a:", then we must have a
                    // type-annotated parameter in an arrow function expression.
                    return Tristate.True;
                case SyntaxKind.QuestionToken:
                    nextToken();
                    // If we have "(a?:" or "(a?," or "(a?=" or "(a?)" then it is definitely a lambda.
                    if (token() === SyntaxKind.ColonToken || token() === SyntaxKind.CommaToken || token() === SyntaxKind.EqualsToken || token() === SyntaxKind.CloseParenToken) {
                        return Tristate.True;
                    }
                    // Otherwise it is definitely not a lambda.
                    return Tristate.False;
                case SyntaxKind.CommaToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.CloseParenToken:
                    // If we have "(a," or "(a=" or "(a)" this *could* be an arrow function
                    return Tristate.Unknown;
            }
            // It is definitely not an arrow function
            return Tristate.False;
        }
        else {
            Debug.assert(first === SyntaxKind.LessThanToken);

            // If we have "<" not followed by an identifier,
            // then this definitely is not an arrow function.
            if (!isIdentifier() && token() !== SyntaxKind.ConstKeyword) {
                return Tristate.False;
            }

            // JSX overrides
            if (languageVariant === LanguageVariant.JSX) {
                const isArrowFunctionInJsx = lookAhead(() => {
                    parseOptional(SyntaxKind.ConstKeyword);
                    const third = nextToken();
                    if (third === SyntaxKind.ExtendsKeyword) {
                        const fourth = nextToken();
                        switch (fourth) {
                            case SyntaxKind.EqualsToken:
                            case SyntaxKind.GreaterThanToken:
                            case SyntaxKind.SlashToken:
                                return false;
                            default:
                                return true;
                        }
                    }
                    else if (third === SyntaxKind.CommaToken || third === SyntaxKind.EqualsToken) {
                        return true;
                    }
                    return false;
                });

                if (isArrowFunctionInJsx) {
                    return Tristate.True;
                }

                return Tristate.False;
            }

            // This *could* be a parenthesized arrow function.
            return Tristate.Unknown;
        }
    }

    function parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): ArrowFunction | undefined {
        const tokenPos = scanner.getTokenStart();
        if (notParenthesizedArrow?.has(tokenPos)) {
            return undefined;
        }

        const result = parseParenthesizedArrowFunctionExpression(/*allowAmbiguity*/ false, allowReturnTypeInArrowFunction);
        if (!result) {
            (notParenthesizedArrow || (notParenthesizedArrow = new Set())).add(tokenPos);
        }

        return result;
    }

    function tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): ArrowFunction | undefined {
        // We do a check here so that we won't be doing unnecessarily call to "lookAhead"
        if (token() === SyntaxKind.AsyncKeyword) {
            if (lookAhead(isUnParenthesizedAsyncArrowFunctionWorker) === Tristate.True) {
                const pos = getNodePos();
                const hasJSDoc = hasPrecedingJSDocComment();
                const asyncModifier = parseModifiersForArrowFunction();
                const expr = parseBinaryExpressionOrHigher(OperatorPrecedence.Lowest);
                return parseSimpleArrowFunctionExpression(pos, expr as Identifier, allowReturnTypeInArrowFunction, hasJSDoc, asyncModifier);
            }
        }
        return undefined;
    }

    function isUnParenthesizedAsyncArrowFunctionWorker(): Tristate {
        // AsyncArrowFunctionExpression:
        //      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
        //      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
        if (token() === SyntaxKind.AsyncKeyword) {
            nextToken();
            // If the "async" is followed by "=>" token then it is not a beginning of an async arrow-function
            // but instead a simple arrow-function which will be parsed inside "parseAssignmentExpressionOrHigher"
            if (scanner.hasPrecedingLineBreak() || token() === SyntaxKind.EqualsGreaterThanToken) {
                return Tristate.False;
            }
            // Check for un-parenthesized AsyncArrowFunction
            const expr = parseBinaryExpressionOrHigher(OperatorPrecedence.Lowest);
            if (!scanner.hasPrecedingLineBreak() && expr.kind === SyntaxKind.Identifier && token() === SyntaxKind.EqualsGreaterThanToken) {
                return Tristate.True;
            }
        }

        return Tristate.False;
    }

    function parseParenthesizedArrowFunctionExpression(allowAmbiguity: boolean, allowReturnTypeInArrowFunction: boolean): ArrowFunction | undefined {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiersForArrowFunction();
        const isAsync = some(modifiers, isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        // Arrow functions are never generators.
        //
        // If we're speculatively parsing a signature for a parenthesized arrow function, then
        // we have to have a complete parameter list.  Otherwise we might see something like
        // a => (b => c)
        // And think that "(b =>" was actually a parenthesized arrow function with a missing
        // close paren.
        const typeParameters = parseTypeParameters();

        let parameters: NodeArray<ParameterDeclaration>;
        if (!parseExpected(SyntaxKind.OpenParenToken)) {
            if (!allowAmbiguity) {
                return undefined;
            }
            parameters = createMissingList<ParameterDeclaration>();
        }
        else {
            if (!allowAmbiguity) {
                const maybeParameters = parseParametersWorker(isAsync, allowAmbiguity);
                if (!maybeParameters) {
                    return undefined;
                }
                parameters = maybeParameters;
            }
            else {
                parameters = parseParametersWorker(isAsync, allowAmbiguity);
            }
            if (!parseExpected(SyntaxKind.CloseParenToken) && !allowAmbiguity) {
                return undefined;
            }
        }

        const hasReturnColon = token() === SyntaxKind.ColonToken;
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        if (type && !allowAmbiguity && typeHasArrowFunctionBlockingParseError(type)) {
            return undefined;
        }

        // Parsing a signature isn't enough.
        // Parenthesized arrow signatures often look like other valid expressions.
        // For instance:
        //  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
        //  - "(x,y)" is a comma expression parsed as a signature with two parameters.
        //  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
        //  - "a ? (b): function() {}" will too, since function() is a valid JSDoc function type.
        //  - "a ? (b): (function() {})" as well, but inside of a parenthesized type with an arbitrary amount of nesting.
        //
        // So we need just a bit of lookahead to ensure that it can only be a signature.

        let unwrappedType = type;
        while (unwrappedType?.kind === SyntaxKind.ParenthesizedType) {
            unwrappedType = (unwrappedType as ParenthesizedTypeNode).type; // Skip parens if need be
        }

        const hasJSDocFunctionType = unwrappedType && isJSDocFunctionType(unwrappedType);
        if (!allowAmbiguity && token() !== SyntaxKind.EqualsGreaterThanToken && (hasJSDocFunctionType || token() !== SyntaxKind.OpenBraceToken)) {
            // Returning undefined here will cause our caller to rewind to where we started from.
            return undefined;
        }

        // If we have an arrow, then try to parse the body. Even if not, try to parse if we
        // have an opening brace, just in case we're in an error state.
        const lastToken = token();
        const equalsGreaterThanToken = parseExpectedToken(SyntaxKind.EqualsGreaterThanToken);
        const body = (lastToken === SyntaxKind.EqualsGreaterThanToken || lastToken === SyntaxKind.OpenBraceToken)
            ? parseArrowFunctionExpressionBody(some(modifiers, isAsyncModifier), allowReturnTypeInArrowFunction)
            : parseIdentifier();

        // Given:
        //     x ? y => ({ y }) : z => ({ z })
        // We try to parse the body of the first arrow function by looking at:
        //     ({ y }) : z => ({ z })
        // This is a valid arrow function with "z" as the return type.
        //
        // But, if we're in the true side of a conditional expression, this colon
        // terminates the expression, so we cannot allow a return type if we aren't
        // certain whether or not the preceding text was parsed as a parameter list.
        //
        // For example,
        //     a() ? (b: number, c?: string): void => d() : e
        // is determined by isParenthesizedArrowFunctionExpression to unambiguously
        // be an arrow expression, so we allow a return type.
        if (!allowReturnTypeInArrowFunction && hasReturnColon) {
            // However, if the arrow function we were able to parse is followed by another colon
            // as in:
            //     a ? (x): string => x : null
            // Then allow the arrow function, and treat the second colon as terminating
            // the conditional expression. It's okay to do this because this code would
            // be a syntax error in JavaScript (as the second colon shouldn't be there).
            if (token() !== SyntaxKind.ColonToken) {
                return undefined;
            }
        }

        const node = factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseArrowFunctionExpressionBody(isAsync: boolean, allowReturnTypeInArrowFunction: boolean): Block | Expression {
        if (token() === SyntaxKind.OpenBraceToken) {
            return parseFunctionBlock(isAsync ? SignatureFlags.Await : SignatureFlags.None);
        }

        if (
            token() !== SyntaxKind.SemicolonToken &&
            token() !== SyntaxKind.FunctionKeyword &&
            token() !== SyntaxKind.ClassKeyword &&
            isStartOfStatement() &&
            !isStartOfExpressionStatement()
        ) {
            // Check if we got a plain statement (i.e. no expression-statements, no function/class expressions/declarations)
            //
            // Here we try to recover from a potential error situation in the case where the
            // user meant to supply a block. For example, if the user wrote:
            //
            //  a =>
            //      let v = 0;
            //  }
            //
            // they may be missing an open brace.  Check to see if that's the case so we can
            // try to recover better.  If we don't do this, then the next close curly we see may end
            // up preemptively closing the containing construct.
            //
            // Note: even when 'IgnoreMissingOpenBrace' is passed, parseBody will still error.
            return parseFunctionBlock(SignatureFlags.IgnoreMissingOpenBrace | (isAsync ? SignatureFlags.Await : SignatureFlags.None));
        }

        const savedTopLevel = topLevel;
        topLevel = false;
        const node = isAsync
            ? doInAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction))
            : doOutsideOfAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction));
        topLevel = savedTopLevel;
        return node;
    }

    function parseConditionalExpressionRest(leftOperand: Expression, pos: number, allowReturnTypeInArrowFunction: boolean): Expression {
        // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        if (!questionToken) {
            return leftOperand;
        }

        // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
        // we do not that for the 'whenFalse' part.
        let colonToken;
        return finishNode(
            factory.createConditionalExpression(
                leftOperand,
                questionToken,
                doOutsideOfContext(disallowInAndDecoratorContext, () => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ false)),
                colonToken = parseExpectedToken(SyntaxKind.ColonToken),
                nodeIsPresent(colonToken)
                    ? parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction)
                    : createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false, Diagnostics._0_expected, tokenToString(SyntaxKind.ColonToken)),
            ),
            pos,
        );
    }

    function parseBinaryExpressionOrHigher(precedence: OperatorPrecedence): Expression {
        const pos = getNodePos();
        const leftOperand = parseUnaryExpressionOrHigher();
        return parseBinaryExpressionRest(precedence, leftOperand, pos);
    }

    function isInOrOfKeyword(t: SyntaxKind) {
        return t === SyntaxKind.InKeyword || t === SyntaxKind.OfKeyword;
    }

    function parseBinaryExpressionRest(precedence: OperatorPrecedence, leftOperand: Expression, pos: number): Expression {
        while (true) {
            // We either have a binary operator here, or we're finished.  We call
            // reScanGreaterToken so that we merge token sequences like > and = into >=

            reScanGreaterToken();
            const newPrecedence = getBinaryOperatorPrecedence(token());

            // Check the precedence to see if we should "take" this operator
            // - For left associative operator (all operator but **), consume the operator,
            //   recursively call the function below, and parse binaryExpression as a rightOperand
            //   of the caller if the new precedence of the operator is greater then or equal to the current precedence.
            //   For example:
            //      a - b - c;
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a * b - c
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a - b * c;
            //            ^token; leftOperand = b. Return b * c to the caller as a rightOperand
            // - For right associative operator (**), consume the operator, recursively call the function
            //   and parse binaryExpression as a rightOperand of the caller if the new precedence of
            //   the operator is strictly grater than the current precedence
            //   For example:
            //      a ** b ** c;
            //             ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a - b ** c;
            //            ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a ** b - c
            //             ^token; leftOperand = b. Return b to the caller as a rightOperand
            const consumeCurrentOperator = token() === SyntaxKind.AsteriskAsteriskToken ?
                newPrecedence >= precedence :
                newPrecedence > precedence;

            if (!consumeCurrentOperator) {
                break;
            }

            if (token() === SyntaxKind.InKeyword && inDisallowInContext()) {
                break;
            }

            if (token() === SyntaxKind.AsKeyword || token() === SyntaxKind.SatisfiesKeyword) {
                // Make sure we *do* perform ASI for constructs like this:
                //    var x = foo
                //    as (Bar)
                // This should be parsed as an initialized variable, followed
                // by a function call to 'as' with the argument 'Bar'
                if (scanner.hasPrecedingLineBreak()) {
                    break;
                }
                else {
                    const keywordKind = token();
                    nextToken();
                    leftOperand = keywordKind === SyntaxKind.SatisfiesKeyword ? makeSatisfiesExpression(leftOperand, parseType()) :
                        makeAsExpression(leftOperand, parseType());
                }
            }
            else {
                leftOperand = makeBinaryExpression(leftOperand, parseTokenNode(), parseBinaryExpressionOrHigher(newPrecedence), pos);
            }
        }

        return leftOperand;
    }

    function isBinaryOperator() {
        if (inDisallowInContext() && token() === SyntaxKind.InKeyword) {
            return false;
        }

        return getBinaryOperatorPrecedence(token()) > 0;
    }

    function makeSatisfiesExpression(left: Expression, right: TypeNode): SatisfiesExpression {
        return finishNode(factory.createSatisfiesExpression(left, right), left.pos);
    }

    function makeBinaryExpression(left: Expression, operatorToken: BinaryOperatorToken, right: Expression, pos: number): BinaryExpression {
        return finishNode(factory.createBinaryExpression(left, operatorToken, right), pos);
    }

    function makeAsExpression(left: Expression, right: TypeNode): AsExpression {
        return finishNode(factory.createAsExpression(left, right), left.pos);
    }

    function parsePrefixUnaryExpression() {
        const pos = getNodePos();
        return finishNode(factory.createPrefixUnaryExpression(token() as PrefixUnaryOperator, nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseDeleteExpression() {
        const pos = getNodePos();
        return finishNode(factory.createDeleteExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseTypeOfExpression() {
        const pos = getNodePos();
        return finishNode(factory.createTypeOfExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseVoidExpression() {
        const pos = getNodePos();
        return finishNode(factory.createVoidExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function isAwaitExpression(): boolean {
        if (token() === SyntaxKind.AwaitKeyword) {
            if (inAwaitContext()) {
                return true;
            }

            // here we are using similar heuristics as 'isYieldExpression'
            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
        }

        return false;
    }

    function parseAwaitExpression() {
        const pos = getNodePos();
        return finishNode(factory.createAwaitExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    /**
     * Parse ES7 exponential expression and await expression
     *
     * ES7 ExponentiationExpression:
     *      1) UnaryExpression[?Yield]
     *      2) UpdateExpression[?Yield] ** ExponentiationExpression[?Yield]
     */
    function parseUnaryExpressionOrHigher(): UnaryExpression | BinaryExpression {
        /**
         * ES7 UpdateExpression:
         *      1) LeftHandSideExpression[?Yield]
         *      2) LeftHandSideExpression[?Yield][no LineTerminator here]++
         *      3) LeftHandSideExpression[?Yield][no LineTerminator here]--
         *      4) ++UnaryExpression[?Yield]
         *      5) --UnaryExpression[?Yield]
         */
        if (isUpdateExpression()) {
            const pos = getNodePos();
            const updateExpression = parseUpdateExpression();
            return token() === SyntaxKind.AsteriskAsteriskToken ?
                parseBinaryExpressionRest(getBinaryOperatorPrecedence(token()), updateExpression, pos) as BinaryExpression :
                updateExpression;
        }

        /**
         * ES7 UnaryExpression:
         *      1) UpdateExpression[?yield]
         *      2) delete UpdateExpression[?yield]
         *      3) void UpdateExpression[?yield]
         *      4) typeof UpdateExpression[?yield]
         *      5) + UpdateExpression[?yield]
         *      6) - UpdateExpression[?yield]
         *      7) ~ UpdateExpression[?yield]
         *      8) ! UpdateExpression[?yield]
         */
        const unaryOperator = token();
        const simpleUnaryExpression = parseSimpleUnaryExpression();
        if (token() === SyntaxKind.AsteriskAsteriskToken) {
            const pos = skipTrivia(sourceText, simpleUnaryExpression.pos);
            const { end } = simpleUnaryExpression;
            if (simpleUnaryExpression.kind === SyntaxKind.TypeAssertionExpression) {
                parseErrorAt(pos, end, Diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses);
            }
            else {
                Debug.assert(isKeywordOrPunctuation(unaryOperator));
                parseErrorAt(pos, end, Diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, tokenToString(unaryOperator));
            }
        }
        return simpleUnaryExpression;
    }

    /**
     * Parse ES7 simple-unary expression or higher:
     *
     * ES7 UnaryExpression:
     *      1) UpdateExpression[?yield]
     *      2) delete UnaryExpression[?yield]
     *      3) void UnaryExpression[?yield]
     *      4) typeof UnaryExpression[?yield]
     *      5) + UnaryExpression[?yield]
     *      6) - UnaryExpression[?yield]
     *      7) ~ UnaryExpression[?yield]
     *      8) ! UnaryExpression[?yield]
     *      9) [+Await] await UnaryExpression[?yield]
     */
    function parseSimpleUnaryExpression(): UnaryExpression {
        switch (token()) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
                return parsePrefixUnaryExpression();
            case SyntaxKind.DeleteKeyword:
                return parseDeleteExpression();
            case SyntaxKind.TypeOfKeyword:
                return parseTypeOfExpression();
            case SyntaxKind.VoidKeyword:
                return parseVoidExpression();
            case SyntaxKind.LessThanToken:
                // Just like in parseUpdateExpression, we need to avoid parsing type assertions when
                // in JSX and we see an expression like "+ <foo> bar".
                if (languageVariant === LanguageVariant.JSX) {
                    return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true, /*topInvalidNodePosition*/ undefined, /*openingTag*/ undefined, /*mustBeUnary*/ true);
                }
                // This is modified UnaryExpression grammar in TypeScript
                //  UnaryExpression (modified):
                //      < type > UnaryExpression
                return parseTypeAssertion();
            case SyntaxKind.AwaitKeyword:
                if (isAwaitExpression()) {
                    return parseAwaitExpression();
                }
                // falls through
            default:
                return parseUpdateExpression();
        }
    }

    /**
     * Check if the current token can possibly be an ES7 increment expression.
     *
     * ES7 UpdateExpression:
     *      LeftHandSideExpression[?Yield]
     *      LeftHandSideExpression[?Yield][no LineTerminator here]++
     *      LeftHandSideExpression[?Yield][no LineTerminator here]--
     *      ++LeftHandSideExpression[?Yield]
     *      --LeftHandSideExpression[?Yield]
     */
    function isUpdateExpression(): boolean {
        // This function is called inside parseUnaryExpression to decide
        // whether to call parseSimpleUnaryExpression or call parseUpdateExpression directly
        switch (token()) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
            case SyntaxKind.DeleteKeyword:
            case SyntaxKind.TypeOfKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.AwaitKeyword:
                return false;
            case SyntaxKind.LessThanToken:
                // If we are not in JSX context, we are parsing TypeAssertion which is an UnaryExpression
                if (languageVariant !== LanguageVariant.JSX) {
                    return false;
                }
                // We are in JSX context and the token is part of JSXElement.
                // falls through
            default:
                return true;
        }
    }

    /**
     * Parse ES7 UpdateExpression. UpdateExpression is used instead of ES6's PostFixExpression.
     *
     * ES7 UpdateExpression[yield]:
     *      1) LeftHandSideExpression[?yield]
     *      2) LeftHandSideExpression[?yield] [[no LineTerminator here]]++
     *      3) LeftHandSideExpression[?yield] [[no LineTerminator here]]--
     *      4) ++LeftHandSideExpression[?yield]
     *      5) --LeftHandSideExpression[?yield]
     * In TypeScript (2), (3) are parsed as PostfixUnaryExpression. (4), (5) are parsed as PrefixUnaryExpression
     */
    function parseUpdateExpression(): UpdateExpression {
        if (token() === SyntaxKind.PlusPlusToken || token() === SyntaxKind.MinusMinusToken) {
            const pos = getNodePos();
            return finishNode(factory.createPrefixUnaryExpression(token() as PrefixUnaryOperator, nextTokenAnd(parseLeftHandSideExpressionOrHigher)), pos);
        }
        else if (languageVariant === LanguageVariant.JSX && token() === SyntaxKind.LessThanToken && lookAhead(nextTokenIsIdentifierOrKeywordOrGreaterThan)) {
            // JSXElement is part of primaryExpression
            return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true);
        }

        const expression = parseLeftHandSideExpressionOrHigher();

        Debug.assert(isLeftHandSideExpression(expression));
        if ((token() === SyntaxKind.PlusPlusToken || token() === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
            const operator = token() as PostfixUnaryOperator;
            nextToken();
            return finishNode(factory.createPostfixUnaryExpression(expression, operator), expression.pos);
        }

        return expression;
    }

    function parseLeftHandSideExpressionOrHigher(): LeftHandSideExpression {
        // Original Ecma:
        // LeftHandSideExpression: See 11.2
        //      NewExpression
        //      CallExpression
        //
        // Our simplification:
        //
        // LeftHandSideExpression: See 11.2
        //      MemberExpression
        //      CallExpression
        //
        // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
        // MemberExpression to make our lives easier.
        //
        // to best understand the below code, it's important to see how CallExpression expands
        // out into its own productions:
        //
        // CallExpression:
        //      MemberExpression Arguments
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //      import (AssignmentExpression)
        //      super Arguments
        //      super.IdentifierName
        //
        // Because of the recursion in these calls, we need to bottom out first. There are three
        // bottom out states we can run into: 1) We see 'super' which must start either of
        // the last two CallExpression productions. 2) We see 'import' which must start import call.
        // 3)we have a MemberExpression which either completes the LeftHandSideExpression,
        // or starts the beginning of the first four CallExpression productions.
        const pos = getNodePos();
        let expression: MemberExpression;
        if (token() === SyntaxKind.ImportKeyword) {
            if (lookAhead(nextTokenIsOpenParenOrLessThan)) {
                // We don't want to eagerly consume all import keyword as import call expression so we look ahead to find "("
                // For example:
                //      var foo3 = require("subfolder
                //      import * as foo1 from "module-from-node
                // We want this import to be a statement rather than import call expression
                sourceFlags |= NodeFlags.PossiblyContainsDynamicImport;
                expression = parseTokenNode<PrimaryExpression>();
            }
            else if (lookAhead(nextTokenIsDot)) {
                // This is an 'import.*' metaproperty (i.e. 'import.meta')
                nextToken(); // advance past the 'import'
                nextToken(); // advance past the dot
                expression = finishNode(factory.createMetaProperty(SyntaxKind.ImportKeyword, parseIdentifierName()), pos);
                sourceFlags |= NodeFlags.PossiblyContainsImportMeta;
            }
            else {
                expression = parseMemberExpressionOrHigher();
            }
        }
        else {
            expression = token() === SyntaxKind.SuperKeyword ? parseSuperExpression() : parseMemberExpressionOrHigher();
        }

        // Now, we *may* be complete.  However, we might have consumed the start of a
        // CallExpression or OptionalExpression.  As such, we need to consume the rest
        // of it here to be complete.
        return parseCallExpressionRest(pos, expression);
    }

    function parseMemberExpressionOrHigher(): MemberExpression {
        // Note: to make our lives simpler, we decompose the NewExpression productions and
        // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
        // like so:
        //
        //   PrimaryExpression : See 11.1
        //      this
        //      Identifier
        //      Literal
        //      ArrayLiteral
        //      ObjectLiteral
        //      (Expression)
        //      FunctionExpression
        //      new MemberExpression Arguments?
        //
        //   MemberExpression : See 11.2
        //      PrimaryExpression
        //      MemberExpression[Expression]
        //      MemberExpression.IdentifierName
        //
        //   CallExpression : See 11.2
        //      MemberExpression
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //
        // Technically this is ambiguous.  i.e. CallExpression defines:
        //
        //   CallExpression:
        //      CallExpression Arguments
        //
        // If you see: "new Foo()"
        //
        // Then that could be treated as a single ObjectCreationExpression, or it could be
        // treated as the invocation of "new Foo".  We disambiguate that in code (to match
        // the original grammar) by making sure that if we see an ObjectCreationExpression
        // we always consume arguments if they are there. So we treat "new Foo()" as an
        // object creation only, and not at all as an invocation.  Another way to think
        // about this is that for every "new" that we see, we will consume an argument list if
        // it is there as part of the *associated* object creation node.  Any additional
        // argument lists we see, will become invocation expressions.
        //
        // Because there are no other places in the grammar now that refer to FunctionExpression
        // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
        // production.
        //
        // Because CallExpression and MemberExpression are left recursive, we need to bottom out
        // of the recursion immediately.  So we parse out a primary expression to start with.
        const pos = getNodePos();
        const expression = parsePrimaryExpression();
        return parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);
    }

    function parseSuperExpression(): MemberExpression {
        const pos = getNodePos();
        let expression = parseTokenNode<MemberExpression>();
        if (token() === SyntaxKind.LessThanToken) {
            const startPos = getNodePos();
            const typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (typeArguments !== undefined) {
                parseErrorAt(startPos, getNodePos(), Diagnostics.super_may_not_use_type_arguments);
                if (!isTemplateStartOfTaggedTemplate()) {
                    expression = factory.createExpressionWithTypeArguments(expression, typeArguments);
                }
            }
        }

        if (token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.DotToken || token() === SyntaxKind.OpenBracketToken) {
            return expression;
        }

        // If we have seen "super" it must be followed by '(' or '.'.
        // If it wasn't then just try to parse out a '.' and report an error.
        parseExpectedToken(SyntaxKind.DotToken, Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
        // private names will never work with `super` (`super.#foo`), but that's a semantic error, not syntactic
        return finishNode(factoryCreatePropertyAccessExpression(expression, parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ true, /*allowUnicodeEscapeSequenceInIdentifierName*/ true)), pos);
    }

    function parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext: boolean, topInvalidNodePosition?: number, openingTag?: JsxOpeningElement | JsxOpeningFragment, mustBeUnary = false): JsxElement | JsxSelfClosingElement | JsxFragment {
        const pos = getNodePos();
        const opening = parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext);
        let result: JsxElement | JsxSelfClosingElement | JsxFragment;
        if (opening.kind === SyntaxKind.JsxOpeningElement) {
            let children = parseJsxChildren(opening);
            let closingElement: JsxClosingElement;

            const lastChild: JsxChild | undefined = children[children.length - 1];
            if (
                lastChild?.kind === SyntaxKind.JsxElement
                && !tagNamesAreEquivalent(lastChild.openingElement.tagName, lastChild.closingElement.tagName)
                && tagNamesAreEquivalent(opening.tagName, lastChild.closingElement.tagName)
            ) {
                // when an unclosed JsxOpeningElement incorrectly parses its parent's JsxClosingElement,
                // restructure (<div>(...<span>...</div>)) --> (<div>(...<span>...</>)</div>)
                // (no need to error; the parent will error)
                const end = lastChild.children.end;
                const newLast = finishNode(
                    factory.createJsxElement(
                        lastChild.openingElement,
                        lastChild.children,
                        finishNode(factory.createJsxClosingElement(finishNode(factoryCreateIdentifier(""), end, end)), end, end),
                    ),
                    lastChild.openingElement.pos,
                    end,
                );

                children = createNodeArray([...children.slice(0, children.length - 1), newLast], children.pos, end);
                closingElement = lastChild.closingElement;
            }
            else {
                closingElement = parseJsxClosingElement(opening, inExpressionContext);
                if (!tagNamesAreEquivalent(opening.tagName, closingElement.tagName)) {
                    if (openingTag && isJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.tagName, openingTag.tagName)) {
                        // opening incorrectly matched with its parent's closing -- put error on opening
                        parseErrorAtRange(opening.tagName, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, getTextOfNodeFromSourceText(sourceText, opening.tagName));
                    }
                    else {
                        // other opening/closing mismatches -- put error on closing
                        parseErrorAtRange(closingElement.tagName, Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, getTextOfNodeFromSourceText(sourceText, opening.tagName));
                    }
                }
            }
            result = finishNode(factory.createJsxElement(opening, children, closingElement), pos);
        }
        else if (opening.kind === SyntaxKind.JsxOpeningFragment) {
            result = finishNode(factory.createJsxFragment(opening, parseJsxChildren(opening), parseJsxClosingFragment(inExpressionContext)), pos);
        }
        else {
            Debug.assert(opening.kind === SyntaxKind.JsxSelfClosingElement);
            // Nothing else to do for self-closing elements
            result = opening;
        }

        // If the user writes the invalid code '<div></div><div></div>' in an expression context (i.e. not wrapped in
        // an enclosing tag), we'll naively try to parse   ^ this as a 'less than' operator and the remainder of the tag
        // as garbage, which will cause the formatter to badly mangle the JSX. Perform a speculative parse of a JSX
        // element if we see a < token so that we can wrap it in a synthetic binary expression so the formatter
        // does less damage and we can report a better error.
        // Since JSX elements are invalid < operands anyway, this lookahead parse will only occur in error scenarios
        // of one sort or another.
        // If we are in a unary context, we can't do this recovery; the binary expression we return here is not
        // a valid UnaryExpression and will cause problems later.
        if (!mustBeUnary && inExpressionContext && token() === SyntaxKind.LessThanToken) {
            const topBadPos = typeof topInvalidNodePosition === "undefined" ? result.pos : topInvalidNodePosition;
            const invalidElement = tryParse(() => parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true, topBadPos));
            if (invalidElement) {
                const operatorToken = createMissingNode(SyntaxKind.CommaToken, /*reportAtCurrentPosition*/ false);
                setTextRangePosWidth(operatorToken, invalidElement.pos, 0);
                parseErrorAt(skipTrivia(sourceText, topBadPos), invalidElement.end, Diagnostics.JSX_expressions_must_have_one_parent_element);
                return finishNode(factory.createBinaryExpression(result, operatorToken as Token<SyntaxKind.CommaToken>, invalidElement), pos) as Node as JsxElement;
            }
        }

        return result;
    }

    function parseJsxText(): JsxText {
        const pos = getNodePos();
        const node = factory.createJsxText(scanner.getTokenValue(), currentToken === SyntaxKind.JsxTextAllWhiteSpaces);
        currentToken = scanner.scanJsxToken();
        return finishNode(node, pos);
    }

    function parseJsxChild(openingTag: JsxOpeningElement | JsxOpeningFragment, token: JsxTokenSyntaxKind): JsxChild | undefined {
        switch (token) {
            case SyntaxKind.EndOfFileToken:
                // If we hit EOF, issue the error at the tag that lacks the closing element
                // rather than at the end of the file (which is useless)
                if (isJsxOpeningFragment(openingTag)) {
                    parseErrorAtRange(openingTag, Diagnostics.JSX_fragment_has_no_corresponding_closing_tag);
                }
                else {
                    // We want the error span to cover only 'Foo.Bar' in < Foo.Bar >
                    // or to cover only 'Foo' in < Foo >
                    const tag = openingTag.tagName;
                    const start = Math.min(skipTrivia(sourceText, tag.pos), tag.end);
                    parseErrorAt(start, tag.end, Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, getTextOfNodeFromSourceText(sourceText, openingTag.tagName));
                }
                return undefined;
            case SyntaxKind.LessThanSlashToken:
            case SyntaxKind.ConflictMarkerTrivia:
                return undefined;
            case SyntaxKind.JsxText:
            case SyntaxKind.JsxTextAllWhiteSpaces:
                return parseJsxText();
            case SyntaxKind.OpenBraceToken:
                return parseJsxExpression(/*inExpressionContext*/ false);
            case SyntaxKind.LessThanToken:
                return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ false, /*topInvalidNodePosition*/ undefined, openingTag);
            default:
                return Debug.assertNever(token);
        }
    }

    function parseJsxChildren(openingTag: JsxOpeningElement | JsxOpeningFragment): NodeArray<JsxChild> {
        const list = [];
        const listPos = getNodePos();
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << ParsingContext.JsxChildren;

        while (true) {
            const child = parseJsxChild(openingTag, currentToken = scanner.reScanJsxToken());
            if (!child) break;
            list.push(child);
            if (
                isJsxOpeningElement(openingTag)
                && child?.kind === SyntaxKind.JsxElement
                && !tagNamesAreEquivalent(child.openingElement.tagName, child.closingElement.tagName)
                && tagNamesAreEquivalent(openingTag.tagName, child.closingElement.tagName)
            ) {
                // stop after parsing a mismatched child like <div>...(<span></div>) in order to reattach the </div> higher
                break;
            }
        }

        parsingContext = saveParsingContext;
        return createNodeArray(list, listPos);
    }

    function parseJsxAttributes(): JsxAttributes {
        const pos = getNodePos();
        return finishNode(factory.createJsxAttributes(parseList(ParsingContext.JsxAttributes, parseJsxAttribute)), pos);
    }

    function parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext: boolean): JsxOpeningElement | JsxSelfClosingElement | JsxOpeningFragment {
        const pos = getNodePos();

        parseExpected(SyntaxKind.LessThanToken);

        if (token() === SyntaxKind.GreaterThanToken) {
            // See below for explanation of scanJsxText
            scanJsxText();
            return finishNode(factory.createJsxOpeningFragment(), pos);
        }
        const tagName = parseJsxElementName();
        const typeArguments = (contextFlags & NodeFlags.JavaScriptFile) === 0 ? tryParseTypeArguments() : undefined;
        const attributes = parseJsxAttributes();

        let node: JsxOpeningLikeElement;

        if (token() === SyntaxKind.GreaterThanToken) {
            // Closing tag, so scan the immediately-following text with the JSX scanning instead
            // of regular scanning to avoid treating illegal characters (e.g. '#') as immediate
            // scanning errors
            scanJsxText();
            node = factory.createJsxOpeningElement(tagName, typeArguments, attributes);
        }
        else {
            parseExpected(SyntaxKind.SlashToken);
            if (parseExpected(SyntaxKind.GreaterThanToken, /*diagnosticMessage*/ undefined, /*shouldAdvance*/ false)) {
                // manually advance the scanner in order to look for jsx text inside jsx
                if (inExpressionContext) {
                    nextToken();
                }
                else {
                    scanJsxText();
                }
            }
            node = factory.createJsxSelfClosingElement(tagName, typeArguments, attributes);
        }

        return finishNode(node, pos);
    }

    function parseJsxElementName(): JsxTagNameExpression {
        const pos = getNodePos();
        // JsxElement can have name in the form of
        //      propertyAccessExpression
        //      primaryExpression in the form of an identifier and "this" keyword
        // We can't just simply use parseLeftHandSideExpressionOrHigher because then we will start consider class,function etc as a keyword
        // We only want to consider "this" as a primaryExpression
        const initialExpression = parseJsxTagName();
        if (isJsxNamespacedName(initialExpression)) {
            return initialExpression; // `a:b.c` is invalid syntax, don't even look for the `.` if we parse `a:b`, and let `parseAttribute` report "unexpected :" instead.
        }
        let expression: PropertyAccessExpression | Identifier | ThisExpression = initialExpression;
        while (parseOptional(SyntaxKind.DotToken)) {
            expression = finishNode(factoryCreatePropertyAccessExpression(expression, parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ false, /*allowUnicodeEscapeSequenceInIdentifierName*/ false)), pos);
        }
        return expression as JsxTagNameExpression;
    }

    function parseJsxTagName(): Identifier | JsxNamespacedName | ThisExpression {
        const pos = getNodePos();
        scanJsxIdentifier();

        const isThis = token() === SyntaxKind.ThisKeyword;
        const tagName = parseIdentifierNameErrorOnUnicodeEscapeSequence();
        if (parseOptional(SyntaxKind.ColonToken)) {
            scanJsxIdentifier();
            return finishNode(factory.createJsxNamespacedName(tagName, parseIdentifierNameErrorOnUnicodeEscapeSequence()), pos);
        }
        return isThis ? finishNode(factory.createToken(SyntaxKind.ThisKeyword), pos) : tagName;
    }

    function parseJsxExpression(inExpressionContext: boolean): JsxExpression | undefined {
        const pos = getNodePos();
        if (!parseExpected(SyntaxKind.OpenBraceToken)) {
            return undefined;
        }

        let dotDotDotToken: DotDotDotToken | undefined;
        let expression: Expression | undefined;
        if (token() !== SyntaxKind.CloseBraceToken) {
            if (!inExpressionContext) {
                dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
            }
            // Only an AssignmentExpression is valid here per the JSX spec,
            // but we can unambiguously parse a comma sequence and provide
            // a better error message in grammar checking.
            expression = parseExpression();
        }
        if (inExpressionContext) {
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            if (parseExpected(SyntaxKind.CloseBraceToken, /*diagnosticMessage*/ undefined, /*shouldAdvance*/ false)) {
                scanJsxText();
            }
        }

        return finishNode(factory.createJsxExpression(dotDotDotToken, expression), pos);
    }

    function parseJsxAttribute(): JsxAttribute | JsxSpreadAttribute {
        if (token() === SyntaxKind.OpenBraceToken) {
            return parseJsxSpreadAttribute();
        }

        const pos = getNodePos();
        return finishNode(factory.createJsxAttribute(parseJsxAttributeName(), parseJsxAttributeValue()), pos);
    }

    function parseJsxAttributeValue(): JsxAttributeValue | undefined {
        if (token() === SyntaxKind.EqualsToken) {
            if (scanJsxAttributeValue() === SyntaxKind.StringLiteral) {
                return parseLiteralNode() as StringLiteral;
            }
            if (token() === SyntaxKind.OpenBraceToken) {
                return parseJsxExpression(/*inExpressionContext*/ true);
            }
            if (token() === SyntaxKind.LessThanToken) {
                return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true);
            }
            parseErrorAtCurrentToken(Diagnostics.or_JSX_element_expected);
        }
        return undefined;
    }

    function parseJsxAttributeName() {
        const pos = getNodePos();
        scanJsxIdentifier();

        const attrName = parseIdentifierNameErrorOnUnicodeEscapeSequence();
        if (parseOptional(SyntaxKind.ColonToken)) {
            scanJsxIdentifier();
            return finishNode(factory.createJsxNamespacedName(attrName, parseIdentifierNameErrorOnUnicodeEscapeSequence()), pos);
        }
        return attrName;
    }

    function parseJsxSpreadAttribute(): JsxSpreadAttribute {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBraceToken);
        parseExpected(SyntaxKind.DotDotDotToken);
        const expression = parseExpression();
        parseExpected(SyntaxKind.CloseBraceToken);
        return finishNode(factory.createJsxSpreadAttribute(expression), pos);
    }

    function parseJsxClosingElement(open: JsxOpeningElement, inExpressionContext: boolean): JsxClosingElement {
        const pos = getNodePos();
        parseExpected(SyntaxKind.LessThanSlashToken);
        const tagName = parseJsxElementName();
        if (parseExpected(SyntaxKind.GreaterThanToken, /*diagnosticMessage*/ undefined, /*shouldAdvance*/ false)) {
            // manually advance the scanner in order to look for jsx text inside jsx
            if (inExpressionContext || !tagNamesAreEquivalent(open.tagName, tagName)) {
                nextToken();
            }
            else {
                scanJsxText();
            }
        }
        return finishNode(factory.createJsxClosingElement(tagName), pos);
    }

    function parseJsxClosingFragment(inExpressionContext: boolean): JsxClosingFragment {
        const pos = getNodePos();
        parseExpected(SyntaxKind.LessThanSlashToken);
        if (parseExpected(SyntaxKind.GreaterThanToken, Diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment, /*shouldAdvance*/ false)) {
            // manually advance the scanner in order to look for jsx text inside jsx
            if (inExpressionContext) {
                nextToken();
            }
            else {
                scanJsxText();
            }
        }
        return finishNode(factory.createJsxJsxClosingFragment(), pos);
    }

    function parseTypeAssertion(): TypeAssertion {
        Debug.assert(languageVariant !== LanguageVariant.JSX, "Type assertions should never be parsed in JSX; they should be parsed as comparisons or JSX elements/fragments.");
        const pos = getNodePos();
        parseExpected(SyntaxKind.LessThanToken);
        const type = parseType();
        parseExpected(SyntaxKind.GreaterThanToken);
        const expression = parseSimpleUnaryExpression();
        return finishNode(factory.createTypeAssertion(type, expression), pos);
    }

    function nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token())
            || token() === SyntaxKind.OpenBracketToken
            || isTemplateStartOfTaggedTemplate();
    }

    function isStartOfOptionalPropertyOrElementAccessChain() {
        return token() === SyntaxKind.QuestionDotToken
            && lookAhead(nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate);
    }

    function tryReparseOptionalChain(node: Expression) {
        if (node.flags & NodeFlags.OptionalChain) {
            return true;
        }
        // check for an optional chain in a non-null expression
        if (isNonNullExpression(node)) {
            let expr = node.expression;
            while (isNonNullExpression(expr) && !(expr.flags & NodeFlags.OptionalChain)) {
                expr = expr.expression;
            }
            if (expr.flags & NodeFlags.OptionalChain) {
                // this is part of an optional chain. Walk down from `node` to `expression` and set the flag.
                while (isNonNullExpression(node)) {
                    (node as Mutable<NonNullExpression>).flags |= NodeFlags.OptionalChain;
                    node = node.expression;
                }
                return true;
            }
        }
        return false;
    }

    function parsePropertyAccessExpressionRest(pos: number, expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined) {
        const name = parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ true, /*allowUnicodeEscapeSequenceInIdentifierName*/ true);
        const isOptionalChain = questionDotToken || tryReparseOptionalChain(expression);
        const propertyAccess = isOptionalChain ?
            factoryCreatePropertyAccessChain(expression, questionDotToken, name) :
            factoryCreatePropertyAccessExpression(expression, name);
        if (isOptionalChain && isPrivateIdentifier(propertyAccess.name)) {
            parseErrorAtRange(propertyAccess.name, Diagnostics.An_optional_chain_cannot_contain_private_identifiers);
        }
        if (isExpressionWithTypeArguments(expression) && expression.typeArguments) {
            const pos = expression.typeArguments.pos - 1;
            const end = skipTrivia(sourceText, expression.typeArguments.end) + 1;
            parseErrorAt(pos, end, Diagnostics.An_instantiation_expression_cannot_be_followed_by_a_property_access);
        }
        return finishNode(propertyAccess, pos);
    }

    function parseElementAccessExpressionRest(pos: number, expression: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined) {
        let argumentExpression: Expression;
        if (token() === SyntaxKind.CloseBracketToken) {
            argumentExpression = createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.An_element_access_expression_should_take_an_argument);
        }
        else {
            const argument = allowInAnd(parseExpression);
            if (isStringOrNumericLiteralLike(argument)) {
                argument.text = internIdentifier(argument.text);
            }
            argumentExpression = argument;
        }

        parseExpected(SyntaxKind.CloseBracketToken);

        const indexedAccess = questionDotToken || tryReparseOptionalChain(expression) ?
            factoryCreateElementAccessChain(expression, questionDotToken, argumentExpression) :
            factoryCreateElementAccessExpression(expression, argumentExpression);
        return finishNode(indexedAccess, pos);
    }

    function parseMemberExpressionRest(pos: number, expression: LeftHandSideExpression, allowOptionalChain: boolean): MemberExpression {
        while (true) {
            let questionDotToken: QuestionDotToken | undefined;
            let isPropertyAccess = false;
            if (allowOptionalChain && isStartOfOptionalPropertyOrElementAccessChain()) {
                questionDotToken = parseExpectedToken(SyntaxKind.QuestionDotToken);
                isPropertyAccess = tokenIsIdentifierOrKeyword(token());
            }
            else {
                isPropertyAccess = parseOptional(SyntaxKind.DotToken);
            }

            if (isPropertyAccess) {
                expression = parsePropertyAccessExpressionRest(pos, expression, questionDotToken);
                continue;
            }

            // when in the [Decorator] context, we do not parse ElementAccess as it could be part of a ComputedPropertyName
            if ((questionDotToken || !inDecoratorContext()) && parseOptional(SyntaxKind.OpenBracketToken)) {
                expression = parseElementAccessExpressionRest(pos, expression, questionDotToken);
                continue;
            }

            if (isTemplateStartOfTaggedTemplate()) {
                // Absorb type arguments into TemplateExpression when preceding expression is ExpressionWithTypeArguments
                expression = !questionDotToken && expression.kind === SyntaxKind.ExpressionWithTypeArguments ?
                    parseTaggedTemplateRest(pos, (expression as ExpressionWithTypeArguments).expression, questionDotToken, (expression as ExpressionWithTypeArguments).typeArguments) :
                    parseTaggedTemplateRest(pos, expression, questionDotToken, /*typeArguments*/ undefined);
                continue;
            }

            if (!questionDotToken) {
                if (token() === SyntaxKind.ExclamationToken && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                    expression = finishNode(factory.createNonNullExpression(expression), pos);
                    continue;
                }
                const typeArguments = tryParse(parseTypeArgumentsInExpression);
                if (typeArguments) {
                    expression = finishNode(factory.createExpressionWithTypeArguments(expression, typeArguments), pos);
                    continue;
                }
            }

            return expression as MemberExpression;
        }
    }

    function isTemplateStartOfTaggedTemplate() {
        return token() === SyntaxKind.NoSubstitutionTemplateLiteral || token() === SyntaxKind.TemplateHead;
    }

    function parseTaggedTemplateRest(pos: number, tag: LeftHandSideExpression, questionDotToken: QuestionDotToken | undefined, typeArguments: NodeArray<TypeNode> | undefined) {
        const tagExpression = factory.createTaggedTemplateExpression(
            tag,
            typeArguments,
            token() === SyntaxKind.NoSubstitutionTemplateLiteral ?
                (reScanTemplateToken(/*isTaggedTemplate*/ true), parseLiteralNode() as NoSubstitutionTemplateLiteral) :
                parseTemplateExpression(/*isTaggedTemplate*/ true),
        );
        if (questionDotToken || tag.flags & NodeFlags.OptionalChain) {
            (tagExpression as Mutable<Node>).flags |= NodeFlags.OptionalChain;
        }
        tagExpression.questionDotToken = questionDotToken;
        return finishNode(tagExpression, pos);
    }

    function parseCallExpressionRest(pos: number, expression: LeftHandSideExpression): LeftHandSideExpression {
        while (true) {
            expression = parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);
            let typeArguments: NodeArray<TypeNode> | undefined;
            const questionDotToken = parseOptionalToken(SyntaxKind.QuestionDotToken);
            if (questionDotToken) {
                typeArguments = tryParse(parseTypeArgumentsInExpression);
                if (isTemplateStartOfTaggedTemplate()) {
                    expression = parseTaggedTemplateRest(pos, expression, questionDotToken, typeArguments);
                    continue;
                }
            }
            if (typeArguments || token() === SyntaxKind.OpenParenToken) {
                // Absorb type arguments into CallExpression when preceding expression is ExpressionWithTypeArguments
                if (!questionDotToken && expression.kind === SyntaxKind.ExpressionWithTypeArguments) {
                    typeArguments = (expression as ExpressionWithTypeArguments).typeArguments;
                    expression = (expression as ExpressionWithTypeArguments).expression;
                }
                const argumentList = parseArgumentList();
                const callExpr = questionDotToken || tryReparseOptionalChain(expression) ?
                    factoryCreateCallChain(expression, questionDotToken, typeArguments, argumentList) :
                    factoryCreateCallExpression(expression, typeArguments, argumentList);
                expression = finishNode(callExpr, pos);
                continue;
            }
            if (questionDotToken) {
                // We parsed `?.` but then failed to parse anything, so report a missing identifier here.
                const name = createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false, Diagnostics.Identifier_expected);
                expression = finishNode(factoryCreatePropertyAccessChain(expression, questionDotToken, name), pos);
            }
            break;
        }
        return expression;
    }

    function parseArgumentList() {
        parseExpected(SyntaxKind.OpenParenToken);
        const result = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        return result;
    }

    function parseTypeArgumentsInExpression() {
        if ((contextFlags & NodeFlags.JavaScriptFile) !== 0) {
            // TypeArguments must not be parsed in JavaScript files to avoid ambiguity with binary operators.
            return undefined;
        }

        if (reScanLessThanToken() !== SyntaxKind.LessThanToken) {
            return undefined;
        }
        nextToken();

        const typeArguments = parseDelimitedList(ParsingContext.TypeArguments, parseType);
        if (reScanGreaterToken() !== SyntaxKind.GreaterThanToken) {
            // If it doesn't have the closing `>` then it's definitely not an type argument list.
            return undefined;
        }
        nextToken();

        // We successfully parsed a type argument list. The next token determines whether we want to
        // treat it as such. If the type argument list is followed by `(` or a template literal, as in
        // `f<number>(42)`, we favor the type argument interpretation even though JavaScript would view
        // it as a relational expression.
        return typeArguments && canFollowTypeArgumentsInExpression() ? typeArguments : undefined;
    }

    function canFollowTypeArgumentsInExpression(): boolean {
        switch (token()) {
            // These tokens can follow a type argument list in a call expression.
            case SyntaxKind.OpenParenToken: // foo<x>(
            case SyntaxKind.NoSubstitutionTemplateLiteral: // foo<T> `...`
            case SyntaxKind.TemplateHead: // foo<T> `...${100}...`
                return true;
            // A type argument list followed by `<` never makes sense, and a type argument list followed
            // by `>` is ambiguous with a (re-scanned) `>>` operator, so we disqualify both. Also, in
            // this context, `+` and `-` are unary operators, not binary operators.
            case SyntaxKind.LessThanToken:
            case SyntaxKind.GreaterThanToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return false;
        }
        // We favor the type argument list interpretation when it is immediately followed by
        // a line break, a binary operator, or something that can't start an expression.
        return scanner.hasPrecedingLineBreak() || isBinaryOperator() || !isStartOfExpression();
    }

    function parsePrimaryExpression(): PrimaryExpression {
        switch (token()) {
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                if (scanner.getTokenFlags() & TokenFlags.IsInvalid) {
                    reScanTemplateToken(/*isTaggedTemplate*/ false);
                }
            // falls through
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.StringLiteral:
                return parseLiteralNode();
            case SyntaxKind.ThisKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return parseTokenNode<PrimaryExpression>();
            case SyntaxKind.OpenParenToken:
                return parseParenthesizedExpression();
            case SyntaxKind.OpenBracketToken:
                return parseArrayLiteralExpression();
            case SyntaxKind.OpenBraceToken:
                return parseObjectLiteralExpression();
            case SyntaxKind.AsyncKeyword:
                // Async arrow functions are parsed earlier in parseAssignmentExpressionOrHigher.
                // If we encounter `async [no LineTerminator here] function` then this is an async
                // function; otherwise, its an identifier.
                if (!lookAhead(nextTokenIsFunctionKeywordOnSameLine)) {
                    break;
                }

                return parseFunctionExpression();
            case SyntaxKind.AtToken:
                return parseDecoratedExpression();
            case SyntaxKind.ClassKeyword:
                return parseClassExpression();
            case SyntaxKind.FunctionKeyword:
                return parseFunctionExpression();
            case SyntaxKind.NewKeyword:
                return parseNewExpressionOrNewDotTarget();
            case SyntaxKind.SlashToken:
            case SyntaxKind.SlashEqualsToken:
                if (reScanSlashToken() === SyntaxKind.RegularExpressionLiteral) {
                    return parseLiteralNode();
                }
                break;
            case SyntaxKind.TemplateHead:
                return parseTemplateExpression(/*isTaggedTemplate*/ false);
            case SyntaxKind.PrivateIdentifier:
                return parsePrivateIdentifier();
        }

        return parseIdentifier(Diagnostics.Expression_expected);
    }

    function parseParenthesizedExpression(): ParenthesizedExpression {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        return withJSDoc(finishNode(factoryCreateParenthesizedExpression(expression), pos), hasJSDoc);
    }

    function parseSpreadElement(): Expression {
        const pos = getNodePos();
        parseExpected(SyntaxKind.DotDotDotToken);
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        return finishNode(factory.createSpreadElement(expression), pos);
    }

    function parseArgumentOrArrayLiteralElement(): Expression {
        return token() === SyntaxKind.DotDotDotToken ? parseSpreadElement() :
            token() === SyntaxKind.CommaToken ? finishNode(factory.createOmittedExpression(), getNodePos()) :
            parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
    }

    function parseArgumentExpression(): Expression {
        return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
    }

    function parseArrayLiteralExpression(): ArrayLiteralExpression {
        const pos = getNodePos();
        const openBracketPosition = scanner.getTokenStart();
        const openBracketParsed = parseExpected(SyntaxKind.OpenBracketToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArgumentOrArrayLiteralElement);
        parseExpectedMatchingBrackets(SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken, openBracketParsed, openBracketPosition);
        return finishNode(factoryCreateArrayLiteralExpression(elements, multiLine), pos);
    }

    function parseObjectLiteralElement(): ObjectLiteralElementLike {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        if (parseOptionalToken(SyntaxKind.DotDotDotToken)) {
            const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
            return withJSDoc(finishNode(factory.createSpreadAssignment(expression), pos), hasJSDoc);
        }

        const modifiers = parseModifiers(/*allowDecorators*/ true);
        if (parseContextualModifier(SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.GetAccessor, SignatureFlags.None);
        }
        if (parseContextualModifier(SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.SetAccessor, SignatureFlags.None);
        }

        const asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        const tokenIsIdentifier = isIdentifier();
        const name = parsePropertyName();

        // Disallowing of optional property assignments and definite assignment assertion happens in the grammar checker.
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        const exclamationToken = parseOptionalToken(SyntaxKind.ExclamationToken);

        if (asteriskToken || token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken) {
            return parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, exclamationToken);
        }

        // check if it is short-hand property assignment or normal property assignment
        // NOTE: if token is EqualsToken it is interpreted as CoverInitializedName production
        // CoverInitializedName[Yield] :
        //     IdentifierReference[?Yield] Initializer[In, ?Yield]
        // this is necessary because ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern
        let node: Mutable<ShorthandPropertyAssignment | PropertyAssignment>;
        const isShorthandPropertyAssignment = tokenIsIdentifier && (token() !== SyntaxKind.ColonToken);
        if (isShorthandPropertyAssignment) {
            const equalsToken = parseOptionalToken(SyntaxKind.EqualsToken);
            const objectAssignmentInitializer = equalsToken ? allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true)) : undefined;
            node = factory.createShorthandPropertyAssignment(name as Identifier, objectAssignmentInitializer);
            // Save equals token for error reporting.
            // TODO(rbuckton): Consider manufacturing this when we need to report an error as it is otherwise not useful.
            node.equalsToken = equalsToken;
        }
        else {
            parseExpected(SyntaxKind.ColonToken);
            const initializer = allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
            node = factory.createPropertyAssignment(name, initializer);
        }
        // Decorators, Modifiers, questionToken, and exclamationToken are not supported by property assignments and are reported in the grammar checker
        node.modifiers = modifiers;
        node.questionToken = questionToken;
        node.exclamationToken = exclamationToken;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseObjectLiteralExpression(): ObjectLiteralExpression {
        const pos = getNodePos();
        const openBracePosition = scanner.getTokenStart();
        const openBraceParsed = parseExpected(SyntaxKind.OpenBraceToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseObjectLiteralElement, /*considerSemicolonAsDelimiter*/ true);
        parseExpectedMatchingBrackets(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition);
        return finishNode(factoryCreateObjectLiteralExpression(properties, multiLine), pos);
    }

    function parseFunctionExpression(): FunctionExpression {
        // GeneratorExpression:
        //      function* BindingIdentifier [Yield][opt](FormalParameters[Yield]){ GeneratorBody }
        //
        // FunctionExpression:
        //      function BindingIdentifier[opt](FormalParameters){ FunctionBody }
        const savedDecoratorContext = inDecoratorContext();
        setDecoratorContext(/*val*/ false);

        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ false);
        parseExpected(SyntaxKind.FunctionKeyword);
        const asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = some(modifiers, isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        const name = isGenerator && isAsync ? doInYieldAndAwaitContext(parseOptionalBindingIdentifier) :
            isGenerator ? doInYieldContext(parseOptionalBindingIdentifier) :
            isAsync ? doInAwaitContext(parseOptionalBindingIdentifier) :
            parseOptionalBindingIdentifier();

        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlock(isGenerator | isAsync);

        setDecoratorContext(savedDecoratorContext);

        const node = factory.createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseOptionalBindingIdentifier(): Identifier | undefined {
        return isBindingIdentifier() ? parseBindingIdentifier() : undefined;
    }

    function parseNewExpressionOrNewDotTarget(): NewExpression | MetaProperty {
        const pos = getNodePos();
        parseExpected(SyntaxKind.NewKeyword);
        if (parseOptional(SyntaxKind.DotToken)) {
            const name = parseIdentifierName();
            return finishNode(factory.createMetaProperty(SyntaxKind.NewKeyword, name), pos);
        }
        const expressionPos = getNodePos();
        let expression: LeftHandSideExpression = parseMemberExpressionRest(expressionPos, parsePrimaryExpression(), /*allowOptionalChain*/ false);
        let typeArguments: NodeArray<TypeNode> | undefined;
        // Absorb type arguments into NewExpression when preceding expression is ExpressionWithTypeArguments
        if (expression.kind === SyntaxKind.ExpressionWithTypeArguments) {
            typeArguments = (expression as ExpressionWithTypeArguments).typeArguments;
            expression = (expression as ExpressionWithTypeArguments).expression;
        }
        if (token() === SyntaxKind.QuestionDotToken) {
            parseErrorAtCurrentToken(Diagnostics.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0, getTextOfNodeFromSourceText(sourceText, expression));
        }
        const argumentList = token() === SyntaxKind.OpenParenToken ? parseArgumentList() : undefined;
        return finishNode(factoryCreateNewExpression(expression, typeArguments, argumentList), pos);
    }

    // STATEMENTS
    function parseBlock(ignoreMissingOpenBrace: boolean, diagnosticMessage?: DiagnosticMessage): Block {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const openBracePosition = scanner.getTokenStart();
        const openBraceParsed = parseExpected(SyntaxKind.OpenBraceToken, diagnosticMessage);
        if (openBraceParsed || ignoreMissingOpenBrace) {
            const multiLine = scanner.hasPrecedingLineBreak();
            const statements = parseList(ParsingContext.BlockStatements, parseStatement);
            parseExpectedMatchingBrackets(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition);
            const result = withJSDoc(finishNode(factoryCreateBlock(statements, multiLine), pos), hasJSDoc);
            if (token() === SyntaxKind.EqualsToken) {
                parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_whole_assignment_in_parentheses);
                nextToken();
            }

            return result;
        }
        else {
            const statements = createMissingList<Statement>();
            return withJSDoc(finishNode(factoryCreateBlock(statements, /*multiLine*/ undefined), pos), hasJSDoc);
        }
    }

    function parseFunctionBlock(flags: SignatureFlags, diagnosticMessage?: DiagnosticMessage): Block {
        const savedYieldContext = inYieldContext();
        setYieldContext(!!(flags & SignatureFlags.Yield));

        const savedAwaitContext = inAwaitContext();
        setAwaitContext(!!(flags & SignatureFlags.Await));

        const savedTopLevel = topLevel;
        topLevel = false;

        // We may be in a [Decorator] context when parsing a function expression or
        // arrow function. The body of the function is not in [Decorator] context.
        const saveDecoratorContext = inDecoratorContext();
        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ false);
        }

        const block = parseBlock(!!(flags & SignatureFlags.IgnoreMissingOpenBrace), diagnosticMessage);

        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ true);
        }

        topLevel = savedTopLevel;
        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return block;
    }

    function parseEmptyStatement(): Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createEmptyStatement(), pos), hasJSDoc);
    }

    function parseIfStatement(): IfStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.IfKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const thenStatement = parseStatement();
        const elseStatement = parseOptional(SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
        return withJSDoc(finishNode(factoryCreateIfStatement(expression, thenStatement, elseStatement), pos), hasJSDoc);
    }

    function parseDoStatement(): DoStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.DoKeyword);
        const statement = parseStatement();
        parseExpected(SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);

        // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
        // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
        // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
        //  do;while(0)x will have a semicolon inserted before x.
        parseOptional(SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createDoStatement(statement, expression), pos), hasJSDoc);
    }

    function parseWhileStatement(): WhileStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const statement = parseStatement();
        return withJSDoc(finishNode(factoryCreateWhileStatement(expression, statement), pos), hasJSDoc);
    }

    function parseForOrForInOrForOfStatement(): Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ForKeyword);
        const awaitToken = parseOptionalToken(SyntaxKind.AwaitKeyword);
        parseExpected(SyntaxKind.OpenParenToken);

        let initializer!: VariableDeclarationList | Expression;
        if (token() !== SyntaxKind.SemicolonToken) {
            if (
                token() === SyntaxKind.VarKeyword || token() === SyntaxKind.LetKeyword || token() === SyntaxKind.ConstKeyword ||
                token() === SyntaxKind.UsingKeyword && lookAhead(nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf) ||
                // this one is meant to allow of
                token() === SyntaxKind.AwaitKeyword && lookAhead(nextTokenIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine)
            ) {
                initializer = parseVariableDeclarationList(/*inForStatementInitializer*/ true);
            }
            else {
                initializer = disallowInAnd(parseExpression);
            }
        }

        let node: IterationStatement;
        if (awaitToken ? parseExpected(SyntaxKind.OfKeyword) : parseOptional(SyntaxKind.OfKeyword)) {
            const expression = allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
            parseExpected(SyntaxKind.CloseParenToken);
            node = factoryCreateForOfStatement(awaitToken, initializer, expression, parseStatement());
        }
        else if (parseOptional(SyntaxKind.InKeyword)) {
            const expression = allowInAnd(parseExpression);
            parseExpected(SyntaxKind.CloseParenToken);
            node = factory.createForInStatement(initializer, expression, parseStatement());
        }
        else {
            parseExpected(SyntaxKind.SemicolonToken);
            const condition = token() !== SyntaxKind.SemicolonToken && token() !== SyntaxKind.CloseParenToken
                ? allowInAnd(parseExpression)
                : undefined;
            parseExpected(SyntaxKind.SemicolonToken);
            const incrementor = token() !== SyntaxKind.CloseParenToken
                ? allowInAnd(parseExpression)
                : undefined;
            parseExpected(SyntaxKind.CloseParenToken);
            node = factoryCreateForStatement(initializer, condition, incrementor, parseStatement());
        }

        return withJSDoc(finishNode(node, pos) as ForStatement | ForInOrOfStatement, hasJSDoc);
    }

    function parseBreakOrContinueStatement(kind: SyntaxKind): BreakOrContinueStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
        const label = canParseSemicolon() ? undefined : parseIdentifier();

        parseSemicolon();
        const node = kind === SyntaxKind.BreakStatement
            ? factory.createBreakStatement(label)
            : factory.createContinueStatement(label);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseReturnStatement(): ReturnStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ReturnKeyword);
        const expression = canParseSemicolon() ? undefined : allowInAnd(parseExpression);
        parseSemicolon();
        return withJSDoc(finishNode(factory.createReturnStatement(expression), pos), hasJSDoc);
    }

    function parseWithStatement(): WithStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.WithKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const statement = doInsideOfContext(NodeFlags.InWithStatement, parseStatement);
        return withJSDoc(finishNode(factory.createWithStatement(expression, statement), pos), hasJSDoc);
    }

    function parseCaseClause(): CaseClause {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.CaseKeyword);
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.ColonToken);
        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return withJSDoc(finishNode(factory.createCaseClause(expression, statements), pos), hasJSDoc);
    }

    function parseDefaultClause(): DefaultClause {
        const pos = getNodePos();
        parseExpected(SyntaxKind.DefaultKeyword);
        parseExpected(SyntaxKind.ColonToken);
        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return finishNode(factory.createDefaultClause(statements), pos);
    }

    function parseCaseOrDefaultClause(): CaseOrDefaultClause {
        return token() === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
    }

    function parseCaseBlock(): CaseBlock {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBraceToken);
        const clauses = parseList(ParsingContext.SwitchClauses, parseCaseOrDefaultClause);
        parseExpected(SyntaxKind.CloseBraceToken);
        return finishNode(factory.createCaseBlock(clauses), pos);
    }

    function parseSwitchStatement(): SwitchStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.SwitchKeyword);
        parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        const caseBlock = parseCaseBlock();
        return withJSDoc(finishNode(factory.createSwitchStatement(expression, caseBlock), pos), hasJSDoc);
    }

    function parseThrowStatement(): ThrowStatement {
        // ThrowStatement[Yield] :
        //      throw [no LineTerminator here]Expression[In, ?Yield];

        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ThrowKeyword);

        // Because of automatic semicolon insertion, we need to report error if this
        // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
        // directly as that might consume an expression on the following line.
        // Instead, we create a "missing" identifier, but don't report an error. The actual error
        // will be reported in the grammar walker.
        let expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
        if (expression === undefined) {
            identifierCount++;
            expression = finishNode(factoryCreateIdentifier(""), getNodePos());
        }
        if (!tryParseSemicolon()) {
            parseErrorForMissingSemicolonAfter(expression);
        }
        return withJSDoc(finishNode(factory.createThrowStatement(expression), pos), hasJSDoc);
    }

    // TODO: Review for error recovery
    function parseTryStatement(): TryStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(SyntaxKind.TryKeyword);
        const tryBlock = parseBlock(/*ignoreMissingOpenBrace*/ false);
        const catchClause = token() === SyntaxKind.CatchKeyword ? parseCatchClause() : undefined;

        // If we don't have a catch clause, then we must have a finally clause.  Try to parse
        // one out no matter what.
        let finallyBlock: Block | undefined;
        if (!catchClause || token() === SyntaxKind.FinallyKeyword) {
            parseExpected(SyntaxKind.FinallyKeyword, Diagnostics.catch_or_finally_expected);
            finallyBlock = parseBlock(/*ignoreMissingOpenBrace*/ false);
        }

        return withJSDoc(finishNode(factory.createTryStatement(tryBlock, catchClause, finallyBlock), pos), hasJSDoc);
    }

    function parseCatchClause(): CatchClause {
        const pos = getNodePos();
        parseExpected(SyntaxKind.CatchKeyword);

        let variableDeclaration;
        if (parseOptional(SyntaxKind.OpenParenToken)) {
            variableDeclaration = parseVariableDeclaration();
            parseExpected(SyntaxKind.CloseParenToken);
        }
        else {
            // Keep shape of node to avoid degrading performance.
            variableDeclaration = undefined;
        }

        const block = parseBlock(/*ignoreMissingOpenBrace*/ false);
        return finishNode(factory.createCatchClause(variableDeclaration, block), pos);
    }

    function parseDebuggerStatement(): Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.DebuggerKeyword);
        parseSemicolon();
        return withJSDoc(finishNode(factory.createDebuggerStatement(), pos), hasJSDoc);
    }

    function parseExpressionOrLabeledStatement(): ExpressionStatement | LabeledStatement {
        // Avoiding having to do the lookahead for a labeled statement by just trying to parse
        // out an expression, seeing if it is identifier and then seeing if it is followed by
        // a colon.
        const pos = getNodePos();
        let hasJSDoc = hasPrecedingJSDocComment();
        let node: ExpressionStatement | LabeledStatement;
        const hasParen = token() === SyntaxKind.OpenParenToken;
        const expression = allowInAnd(parseExpression);
        if (isIdentifierNode(expression) && parseOptional(SyntaxKind.ColonToken)) {
            node = factory.createLabeledStatement(expression, parseStatement());
        }
        else {
            if (!tryParseSemicolon()) {
                parseErrorForMissingSemicolonAfter(expression);
            }
            node = factoryCreateExpressionStatement(expression);
            if (hasParen) {
                // do not parse the same jsdoc twice
                hasJSDoc = false;
            }
        }
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function nextTokenIsIdentifierOrKeywordOnSameLine() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token()) && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsClassKeywordOnSameLine() {
        nextToken();
        return token() === SyntaxKind.ClassKeyword && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsFunctionKeywordOnSameLine() {
        nextToken();
        return token() === SyntaxKind.FunctionKeyword && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine() {
        nextToken();
        return (tokenIsIdentifierOrKeyword(token()) || token() === SyntaxKind.NumericLiteral || token() === SyntaxKind.BigIntLiteral || token() === SyntaxKind.StringLiteral) && !scanner.hasPrecedingLineBreak();
    }

    function isDeclaration(): boolean {
        while (true) {
            switch (token()) {
                case SyntaxKind.VarKeyword:
                case SyntaxKind.LetKeyword:
                case SyntaxKind.ConstKeyword:
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.EnumKeyword:
                    return true;
                case SyntaxKind.UsingKeyword:
                    return isUsingDeclaration();
                case SyntaxKind.AwaitKeyword:
                    return isAwaitUsingDeclaration();

                // 'declare', 'module', 'namespace', 'interface'* and 'type' are all legal JavaScript identifiers;
                // however, an identifier cannot be followed by another identifier on the same line. This is what we
                // count on to parse out the respective declarations. For instance, we exploit this to say that
                //
                //    namespace n
                //
                // can be none other than the beginning of a namespace declaration, but need to respect that JavaScript sees
                //
                //    namespace
                //    n
                //
                // as the identifier 'namespace' on one line followed by the identifier 'n' on another.
                // We need to look one token ahead to see if it permissible to try parsing a declaration.
                //
                // *Note*: 'interface' is actually a strict mode reserved word. So while
                //
                //   "use strict"
                //   interface
                //   I {}
                //
                // could be legal, it would add complexity for very little gain.
                case SyntaxKind.InterfaceKeyword:
                case SyntaxKind.TypeKeyword:
                    return nextTokenIsIdentifierOnSameLine();
                case SyntaxKind.ModuleKeyword:
                case SyntaxKind.NamespaceKeyword:
                    return nextTokenIsIdentifierOrStringLiteralOnSameLine();
                case SyntaxKind.AbstractKeyword:
                case SyntaxKind.AccessorKeyword:
                case SyntaxKind.AsyncKeyword:
                case SyntaxKind.DeclareKeyword:
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.ReadonlyKeyword:
                    const previousToken = token();
                    nextToken();
                    // ASI takes effect for this modifier.
                    if (scanner.hasPrecedingLineBreak()) {
                        return false;
                    }
                    if (previousToken === SyntaxKind.DeclareKeyword && token() === SyntaxKind.TypeKeyword) {
                        // If we see 'declare type', then commit to parsing a type alias. parseTypeAliasDeclaration will
                        // report Line_break_not_permitted_here if needed.
                        return true;
                    }
                    continue;

                case SyntaxKind.GlobalKeyword:
                    nextToken();
                    return token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.Identifier || token() === SyntaxKind.ExportKeyword;

                case SyntaxKind.ImportKeyword:
                    nextToken();
                    return token() === SyntaxKind.StringLiteral || token() === SyntaxKind.AsteriskToken ||
                        token() === SyntaxKind.OpenBraceToken || tokenIsIdentifierOrKeyword(token());
                case SyntaxKind.ExportKeyword:
                    let currentToken = nextToken();
                    if (currentToken === SyntaxKind.TypeKeyword) {
                        currentToken = lookAhead(nextToken);
                    }
                    if (
                        currentToken === SyntaxKind.EqualsToken || currentToken === SyntaxKind.AsteriskToken ||
                        currentToken === SyntaxKind.OpenBraceToken || currentToken === SyntaxKind.DefaultKeyword ||
                        currentToken === SyntaxKind.AsKeyword || currentToken === SyntaxKind.AtToken
                    ) {
                        return true;
                    }
                    continue;

                case SyntaxKind.StaticKeyword:
                    nextToken();
                    continue;

                default:
                    return false;
            }
        }
    }

    function isStartOfDeclaration(): boolean {
        return lookAhead(isDeclaration);
    }

    function isStartOfStatement(): boolean {
        switch (token()) {
            case SyntaxKind.AtToken:
            case SyntaxKind.SemicolonToken:
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.VarKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.UsingKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.IfKeyword:
            case SyntaxKind.DoKeyword:
            case SyntaxKind.WhileKeyword:
            case SyntaxKind.ForKeyword:
            case SyntaxKind.ContinueKeyword:
            case SyntaxKind.BreakKeyword:
            case SyntaxKind.ReturnKeyword:
            case SyntaxKind.WithKeyword:
            case SyntaxKind.SwitchKeyword:
            case SyntaxKind.ThrowKeyword:
            case SyntaxKind.TryKeyword:
            case SyntaxKind.DebuggerKeyword:
            // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
            // however, we say they are here so that we may gracefully parse them and error later.
            // falls through
            case SyntaxKind.CatchKeyword:
            case SyntaxKind.FinallyKeyword:
                return true;

            case SyntaxKind.ImportKeyword:
                return isStartOfDeclaration() || lookAhead(nextTokenIsOpenParenOrLessThanOrDot);

            case SyntaxKind.ConstKeyword:
            case SyntaxKind.ExportKeyword:
                return isStartOfDeclaration();

            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.ModuleKeyword:
            case SyntaxKind.NamespaceKeyword:
            case SyntaxKind.TypeKeyword:
            case SyntaxKind.GlobalKeyword:
                // When these don't start a declaration, they're an identifier in an expression statement
                return true;

            case SyntaxKind.AccessorKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.ReadonlyKeyword:
                // When these don't start a declaration, they may be the start of a class member if an identifier
                // immediately follows. Otherwise they're an identifier in an expression statement.
                return isStartOfDeclaration() || !lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

            default:
                return isStartOfExpression();
        }
    }

    function nextTokenIsBindingIdentifierOrStartOfDestructuring() {
        nextToken();
        return isBindingIdentifier() || token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.OpenBracketToken;
    }

    function isLetDeclaration() {
        // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
        // or [.
        return lookAhead(nextTokenIsBindingIdentifierOrStartOfDestructuring);
    }

    function nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLineDisallowOf() {
        return nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(/*disallowOf*/ true);
    }

    function nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(disallowOf?: boolean) {
        nextToken();
        if (disallowOf && token() === SyntaxKind.OfKeyword) return false;
        return (isBindingIdentifier() || token() === SyntaxKind.OpenBraceToken) && !scanner.hasPrecedingLineBreak();
    }

    function isUsingDeclaration() {
        // 'using' always starts a lexical declaration if followed by an identifier. We also eagerly parse
        // |ObjectBindingPattern| so that we can report a grammar error during check. We don't parse out
        // |ArrayBindingPattern| since it potentially conflicts with element access (i.e., `using[x]`).
        return lookAhead(nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine);
    }

    function nextTokenIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine(disallowOf?: boolean) {
        if (nextToken() === SyntaxKind.UsingKeyword) {
            return nextTokenIsBindingIdentifierOrStartOfDestructuringOnSameLine(disallowOf);
        }
        return false;
    }

    function isAwaitUsingDeclaration() {
        // 'await using' always starts a lexical declaration if followed by an identifier. We also eagerly parse
        // |ObjectBindingPattern| so that we can report a grammar error during check. We don't parse out
        // |ArrayBindingPattern| since it potentially conflicts with element access (i.e., `await using[x]`).
        return lookAhead(nextTokenIsUsingKeywordThenBindingIdentifierOrStartOfObjectDestructuringOnSameLine);
    }

    function parseStatement(): Statement {
        switch (token()) {
            case SyntaxKind.SemicolonToken:
                return parseEmptyStatement();
            case SyntaxKind.OpenBraceToken:
                return parseBlock(/*ignoreMissingOpenBrace*/ false);
            case SyntaxKind.VarKeyword:
                return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
            case SyntaxKind.LetKeyword:
                if (isLetDeclaration()) {
                    return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
                }
                break;
            case SyntaxKind.AwaitKeyword:
                if (isAwaitUsingDeclaration()) {
                    return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
                }
                break;
            case SyntaxKind.UsingKeyword:
                if (isUsingDeclaration()) {
                    return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
                }
                break;
            case SyntaxKind.FunctionKeyword:
                return parseFunctionDeclaration(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
            case SyntaxKind.ClassKeyword:
                return parseClassDeclaration(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined);
            case SyntaxKind.IfKeyword:
                return parseIfStatement();
            case SyntaxKind.DoKeyword:
                return parseDoStatement();
            case SyntaxKind.WhileKeyword:
                return parseWhileStatement();
            case SyntaxKind.ForKeyword:
                return parseForOrForInOrForOfStatement();
            case SyntaxKind.ContinueKeyword:
                return parseBreakOrContinueStatement(SyntaxKind.ContinueStatement);
            case SyntaxKind.BreakKeyword:
                return parseBreakOrContinueStatement(SyntaxKind.BreakStatement);
            case SyntaxKind.ReturnKeyword:
                return parseReturnStatement();
            case SyntaxKind.WithKeyword:
                return parseWithStatement();
            case SyntaxKind.SwitchKeyword:
                return parseSwitchStatement();
            case SyntaxKind.ThrowKeyword:
                return parseThrowStatement();
            case SyntaxKind.TryKeyword:
            // Include 'catch' and 'finally' for error recovery.
            // falls through
            case SyntaxKind.CatchKeyword:
            case SyntaxKind.FinallyKeyword:
                return parseTryStatement();
            case SyntaxKind.DebuggerKeyword:
                return parseDebuggerStatement();
            case SyntaxKind.AtToken:
                return parseDeclaration();
            case SyntaxKind.AsyncKeyword:
            case SyntaxKind.InterfaceKeyword:
            case SyntaxKind.TypeKeyword:
            case SyntaxKind.ModuleKeyword:
            case SyntaxKind.NamespaceKeyword:
            case SyntaxKind.DeclareKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.EnumKeyword:
            case SyntaxKind.ExportKeyword:
            case SyntaxKind.ImportKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.AbstractKeyword:
            case SyntaxKind.AccessorKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.ReadonlyKeyword:
            case SyntaxKind.GlobalKeyword:
                if (isStartOfDeclaration()) {
                    return parseDeclaration();
                }
                break;
        }
        return parseExpressionOrLabeledStatement();
    }

    function isDeclareModifier(modifier: ModifierLike) {
        return modifier.kind === SyntaxKind.DeclareKeyword;
    }

    function parseDeclaration(): Statement {
        // `parseListElement` attempted to get the reused node at this position,
        // but the ambient context flag was not yet set, so the node appeared
        // not reusable in that context.
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ true);
        const isAmbient = some(modifiers, isDeclareModifier);
        if (isAmbient) {
            const node = tryReuseAmbientDeclaration(pos);
            if (node) {
                return node;
            }

            for (const m of modifiers!) {
                (m as Mutable<Node>).flags |= NodeFlags.Ambient;
            }
            return doInsideOfContext(NodeFlags.Ambient, () => parseDeclarationWorker(pos, hasJSDoc, modifiers));
        }
        else {
            return parseDeclarationWorker(pos, hasJSDoc, modifiers);
        }
    }

    function tryReuseAmbientDeclaration(pos: number): Statement | undefined {
        return doInsideOfContext(NodeFlags.Ambient, () => {
            // TODO(jakebailey): this is totally wrong; `parsingContext` is the result of ORing a bunch of `1 << ParsingContext.XYZ`.
            // The enum should really be a bunch of flags.
            const node = currentNode(parsingContext, pos);
            if (node) {
                return consumeNode(node) as Statement;
            }
        });
    }

    function parseDeclarationWorker(pos: number, hasJSDoc: boolean, modifiersIn: NodeArray<ModifierLike> | undefined): Statement {
        switch (token()) {
            case SyntaxKind.VarKeyword:
            case SyntaxKind.LetKeyword:
            case SyntaxKind.ConstKeyword:
            case SyntaxKind.UsingKeyword:
            case SyntaxKind.AwaitKeyword:
                return parseVariableStatement(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.FunctionKeyword:
                return parseFunctionDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.ClassKeyword:
                return parseClassDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.InterfaceKeyword:
                return parseInterfaceDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.TypeKeyword:
                return parseTypeAliasDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.EnumKeyword:
                return parseEnumDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.GlobalKeyword:
            case SyntaxKind.ModuleKeyword:
            case SyntaxKind.NamespaceKeyword:
                return parseModuleDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.ImportKeyword:
                return parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifiersIn);
            case SyntaxKind.ExportKeyword:
                nextToken();
                switch (token()) {
                    case SyntaxKind.DefaultKeyword:
                    case SyntaxKind.EqualsToken:
                        return parseExportAssignment(pos, hasJSDoc, modifiersIn);
                    case SyntaxKind.AsKeyword:
                        return parseNamespaceExportDeclaration(pos, hasJSDoc, modifiersIn);
                    default:
                        return parseExportDeclaration(pos, hasJSDoc, modifiersIn);
                }
            default:
                if (modifiersIn) {
                    // We reached this point because we encountered decorators and/or modifiers and assumed a declaration
                    // would follow. For recovery and error reporting purposes, return an incomplete declaration.
                    const missing = createMissingNode<MissingDeclaration>(SyntaxKind.MissingDeclaration, /*reportAtCurrentPosition*/ true, Diagnostics.Declaration_expected);
                    setTextRangePos(missing, pos);
                    (missing as Mutable<MissingDeclaration>).modifiers = modifiersIn;
                    return missing;
                }
                return undefined!; // TODO: GH#18217
        }
    }

    function nextTokenIsStringLiteral() {
        return nextToken() === SyntaxKind.StringLiteral;
    }

    function nextTokenIsFromKeywordOrEqualsToken() {
        nextToken();
        return token() === SyntaxKind.FromKeyword || token() === SyntaxKind.EqualsToken;
    }

    function nextTokenIsIdentifierOrStringLiteralOnSameLine() {
        nextToken();
        return !scanner.hasPrecedingLineBreak() && (isIdentifier() || token() === SyntaxKind.StringLiteral);
    }

    function parseFunctionBlockOrSemicolon(flags: SignatureFlags, diagnosticMessage?: DiagnosticMessage): Block | undefined {
        if (token() !== SyntaxKind.OpenBraceToken) {
            if (flags & SignatureFlags.Type) {
                parseTypeMemberSemicolon();
                return;
            }
            if (canParseSemicolon()) {
                parseSemicolon();
                return;
            }
        }
        return parseFunctionBlock(flags, diagnosticMessage);
    }

    // DECLARATIONS

    function parseArrayBindingElement(): ArrayBindingElement {
        const pos = getNodePos();
        if (token() === SyntaxKind.CommaToken) {
            return finishNode(factory.createOmittedExpression(), pos);
        }
        const dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
        const name = parseIdentifierOrPattern();
        const initializer = parseInitializer();
        return finishNode(factory.createBindingElement(dotDotDotToken, /*propertyName*/ undefined, name, initializer), pos);
    }

    function parseObjectBindingElement(): BindingElement {
        const pos = getNodePos();
        const dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);
        const tokenIsIdentifier = isBindingIdentifier();
        let propertyName: PropertyName | undefined = parsePropertyName();
        let name: BindingName;
        if (tokenIsIdentifier && token() !== SyntaxKind.ColonToken) {
            name = propertyName as Identifier;
            propertyName = undefined;
        }
        else {
            parseExpected(SyntaxKind.ColonToken);
            name = parseIdentifierOrPattern();
        }
        const initializer = parseInitializer();
        return finishNode(factory.createBindingElement(dotDotDotToken, propertyName, name, initializer), pos);
    }

    function parseObjectBindingPattern(): ObjectBindingPattern {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBraceToken);
        const elements = allowInAnd(() => parseDelimitedList(ParsingContext.ObjectBindingElements, parseObjectBindingElement));
        parseExpected(SyntaxKind.CloseBraceToken);
        return finishNode(factory.createObjectBindingPattern(elements), pos);
    }

    function parseArrayBindingPattern(): ArrayBindingPattern {
        const pos = getNodePos();
        parseExpected(SyntaxKind.OpenBracketToken);
        const elements = allowInAnd(() => parseDelimitedList(ParsingContext.ArrayBindingElements, parseArrayBindingElement));
        parseExpected(SyntaxKind.CloseBracketToken);
        return finishNode(factory.createArrayBindingPattern(elements), pos);
    }

    function isBindingIdentifierOrPrivateIdentifierOrPattern() {
        return token() === SyntaxKind.OpenBraceToken
            || token() === SyntaxKind.OpenBracketToken
            || token() === SyntaxKind.PrivateIdentifier
            || isBindingIdentifier();
    }

    function parseIdentifierOrPattern(privateIdentifierDiagnosticMessage?: DiagnosticMessage): Identifier | BindingPattern {
        if (token() === SyntaxKind.OpenBracketToken) {
            return parseArrayBindingPattern();
        }
        if (token() === SyntaxKind.OpenBraceToken) {
            return parseObjectBindingPattern();
        }
        return parseBindingIdentifier(privateIdentifierDiagnosticMessage);
    }

    function parseVariableDeclarationAllowExclamation() {
        return parseVariableDeclaration(/*allowExclamation*/ true);
    }

    function parseVariableDeclaration(allowExclamation?: boolean): VariableDeclaration {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const name = parseIdentifierOrPattern(Diagnostics.Private_identifiers_are_not_allowed_in_variable_declarations);
        let exclamationToken: ExclamationToken | undefined;
        if (
            allowExclamation && name.kind === SyntaxKind.Identifier &&
            token() === SyntaxKind.ExclamationToken && !scanner.hasPrecedingLineBreak()
        ) {
            exclamationToken = parseTokenNode<Token<SyntaxKind.ExclamationToken>>();
        }
        const type = parseTypeAnnotation();
        const initializer = isInOrOfKeyword(token()) ? undefined : parseInitializer();
        const node = factoryCreateVariableDeclaration(name, exclamationToken, type, initializer);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseVariableDeclarationList(inForStatementInitializer: boolean): VariableDeclarationList {
        const pos = getNodePos();

        let flags: NodeFlags = 0;
        switch (token()) {
            case SyntaxKind.VarKeyword:
                break;
            case SyntaxKind.LetKeyword:
                flags |= NodeFlags.Let;
                break;
            case SyntaxKind.ConstKeyword:
                flags |= NodeFlags.Const;
                break;
            case SyntaxKind.UsingKeyword:
                flags |= NodeFlags.Using;
                break;
            case SyntaxKind.AwaitKeyword:
                Debug.assert(isAwaitUsingDeclaration());
                flags |= NodeFlags.AwaitUsing;
                nextToken();
                break;
            default:
                Debug.fail();
        }

        nextToken();

        // The user may have written the following:
        //
        //    for (let of X) { }
        //
        // In this case, we want to parse an empty declaration list, and then parse 'of'
        // as a keyword. The reason this is not automatic is that 'of' is a valid identifier.
        // So we need to look ahead to determine if 'of' should be treated as a keyword in
        // this context.
        // The checker will then give an error that there is an empty declaration list.
        let declarations: readonly VariableDeclaration[];
        if (token() === SyntaxKind.OfKeyword && lookAhead(canFollowContextualOfKeyword)) {
            declarations = createMissingList<VariableDeclaration>();
        }
        else {
            const savedDisallowIn = inDisallowInContext();
            setDisallowInContext(inForStatementInitializer);

            declarations = parseDelimitedList(
                ParsingContext.VariableDeclarations,
                inForStatementInitializer ? parseVariableDeclaration : parseVariableDeclarationAllowExclamation,
            );

            setDisallowInContext(savedDisallowIn);
        }

        return finishNode(factoryCreateVariableDeclarationList(declarations, flags), pos);
    }

    function canFollowContextualOfKeyword(): boolean {
        return nextTokenIsIdentifier() && nextToken() === SyntaxKind.CloseParenToken;
    }

    function parseVariableStatement(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): VariableStatement {
        const declarationList = parseVariableDeclarationList(/*inForStatementInitializer*/ false);
        parseSemicolon();
        const node = factoryCreateVariableStatement(modifiers, declarationList);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseFunctionDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): FunctionDeclaration {
        const savedAwaitContext = inAwaitContext();
        const modifierFlags = modifiersToFlags(modifiers);
        parseExpected(SyntaxKind.FunctionKeyword);
        const asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        // We don't parse the name here in await context, instead we will report a grammar error in the checker.
        const name = modifierFlags & ModifierFlags.Default ? parseOptionalBindingIdentifier() : parseBindingIdentifier();
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = modifierFlags & ModifierFlags.Async ? SignatureFlags.Await : SignatureFlags.None;
        const typeParameters = parseTypeParameters();
        if (modifierFlags & ModifierFlags.Export) setAwaitContext(/*value*/ true);
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, Diagnostics.or_expected);
        setAwaitContext(savedAwaitContext);
        const node = factory.createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseConstructorName() {
        if (token() === SyntaxKind.ConstructorKeyword) {
            return parseExpected(SyntaxKind.ConstructorKeyword);
        }
        if (token() === SyntaxKind.StringLiteral && lookAhead(nextToken) === SyntaxKind.OpenParenToken) {
            return tryParse(() => {
                const literalNode = parseLiteralNode();
                return literalNode.text === "constructor" ? literalNode : undefined;
            });
        }
    }

    function tryParseConstructorDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ConstructorDeclaration | undefined {
        return tryParse(() => {
            if (parseConstructorName()) {
                const typeParameters = parseTypeParameters();
                const parameters = parseParameters(SignatureFlags.None);
                const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
                const body = parseFunctionBlockOrSemicolon(SignatureFlags.None, Diagnostics.or_expected);
                const node = factory.createConstructorDeclaration(modifiers, parameters, body);

                // Attach invalid nodes if they exist so that we can report them in the grammar checker.
                (node as Mutable<ConstructorDeclaration>).typeParameters = typeParameters;
                (node as Mutable<ConstructorDeclaration>).type = type;
                return withJSDoc(finishNode(node, pos), hasJSDoc);
            }
        });
    }

    function parseMethodDeclaration(
        pos: number,
        hasJSDoc: boolean,
        modifiers: NodeArray<ModifierLike> | undefined,
        asteriskToken: AsteriskToken | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
        exclamationToken: ExclamationToken | undefined,
        diagnosticMessage?: DiagnosticMessage,
    ): MethodDeclaration {
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = some(modifiers, isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, diagnosticMessage);
        const node = factory.createMethodDeclaration(
            modifiers,
            asteriskToken,
            name,
            questionToken,
            typeParameters,
            parameters,
            type,
            body,
        );

        // An exclamation token on a method is invalid syntax and will be handled by the grammar checker
        (node as Mutable<MethodDeclaration>).exclamationToken = exclamationToken;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyDeclaration(
        pos: number,
        hasJSDoc: boolean,
        modifiers: NodeArray<ModifierLike> | undefined,
        name: PropertyName,
        questionToken: QuestionToken | undefined,
    ): PropertyDeclaration {
        const exclamationToken = !questionToken && !scanner.hasPrecedingLineBreak() ? parseOptionalToken(SyntaxKind.ExclamationToken) : undefined;
        const type = parseTypeAnnotation();
        const initializer = doOutsideOfContext(NodeFlags.YieldContext | NodeFlags.AwaitContext | NodeFlags.DisallowInContext, parseInitializer);
        parseSemicolonAfterPropertyName(name, type, initializer);
        const node = factory.createPropertyDeclaration(
            modifiers,
            name,
            questionToken || exclamationToken,
            type,
            initializer,
        );
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyOrMethodDeclaration(
        pos: number,
        hasJSDoc: boolean,
        modifiers: NodeArray<ModifierLike> | undefined,
    ): PropertyDeclaration | MethodDeclaration {
        const asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        const name = parsePropertyName();
        // Note: this is not legal as per the grammar.  But we allow it in the parser and
        // report an error in the grammar checker.
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        if (asteriskToken || token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.LessThanToken) {
            return parseMethodDeclaration(pos, hasJSDoc, modifiers, asteriskToken, name, questionToken, /*exclamationToken*/ undefined, Diagnostics.or_expected);
        }
        return parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, questionToken);
    }

    function parseAccessorDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, kind: AccessorDeclaration["kind"], flags: SignatureFlags): AccessorDeclaration {
        const name = parsePropertyName();
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.None);
        const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(flags);
        const node = kind === SyntaxKind.GetAccessor
            ? factory.createGetAccessorDeclaration(modifiers, name, parameters, type, body)
            : factory.createSetAccessorDeclaration(modifiers, name, parameters, body);
        // Keep track of `typeParameters` (for both) and `type` (for setters) if they were parsed those indicate grammar errors
        (node as Mutable<AccessorDeclaration>).typeParameters = typeParameters;
        if (isSetAccessorDeclaration(node)) (node as Mutable<SetAccessorDeclaration>).type = type;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isClassMemberStart(): boolean {
        let idToken: SyntaxKind | undefined;

        if (token() === SyntaxKind.AtToken) {
            return true;
        }

        // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
        while (isModifierKind(token())) {
            idToken = token();
            // If the idToken is a class modifier (protected, private, public, and static), it is
            // certain that we are starting to parse class member. This allows better error recovery
            // Example:
            //      public foo() ...     // true
            //      public @dec blah ... // true; we will then report an error later
            //      export public ...    // true; we will then report an error later
            if (isClassMemberModifier(idToken)) {
                return true;
            }

            nextToken();
        }

        if (token() === SyntaxKind.AsteriskToken) {
            return true;
        }

        // Try to get the first property-like token following all modifiers.
        // This can either be an identifier or the 'get' or 'set' keywords.
        if (isLiteralPropertyName()) {
            idToken = token();
            nextToken();
        }

        // Index signatures and computed properties are class members; we can parse.
        if (token() === SyntaxKind.OpenBracketToken) {
            return true;
        }

        // If we were able to get any potential identifier...
        if (idToken !== undefined) {
            // If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
            if (!isKeyword(idToken) || idToken === SyntaxKind.SetKeyword || idToken === SyntaxKind.GetKeyword) {
                return true;
            }

            // If it *is* a keyword, but not an accessor, check a little farther along
            // to see if it should actually be parsed as a class member.
            switch (token()) {
                case SyntaxKind.OpenParenToken: // Method declaration
                case SyntaxKind.LessThanToken: // Generic Method declaration
                case SyntaxKind.ExclamationToken: // Non-null assertion on property name
                case SyntaxKind.ColonToken: // Type Annotation for declaration
                case SyntaxKind.EqualsToken: // Initializer for declaration
                case SyntaxKind.QuestionToken: // Not valid, but permitted so that it gets caught later on.
                    return true;
                default:
                    // Covers
                    //  - Semicolons     (declaration termination)
                    //  - Closing braces (end-of-class, must be declaration)
                    //  - End-of-files   (not valid, but permitted so that it gets caught later on)
                    //  - Line-breaks    (enabling *automatic semicolon insertion*)
                    return canParseSemicolon();
            }
        }

        return false;
    }

    function parseClassStaticBlockDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ClassStaticBlockDeclaration {
        parseExpectedToken(SyntaxKind.StaticKeyword);
        const body = parseClassStaticBlockBody();
        const node = withJSDoc(finishNode(factory.createClassStaticBlockDeclaration(body), pos), hasJSDoc);
        (node as Mutable<ClassStaticBlockDeclaration>).modifiers = modifiers;
        return node;
    }

    function parseClassStaticBlockBody() {
        const savedYieldContext = inYieldContext();
        const savedAwaitContext = inAwaitContext();

        setYieldContext(false);
        setAwaitContext(true);

        const body = parseBlock(/*ignoreMissingOpenBrace*/ false);

        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return body;
    }

    function parseDecoratorExpression() {
        if (inAwaitContext() && token() === SyntaxKind.AwaitKeyword) {
            // `@await` is is disallowed in an [Await] context, but can cause parsing to go off the rails
            // This simply parses the missing identifier and moves on.
            const pos = getNodePos();
            const awaitExpression = parseIdentifier(Diagnostics.Expression_expected);
            nextToken();
            const memberExpression = parseMemberExpressionRest(pos, awaitExpression, /*allowOptionalChain*/ true);
            return parseCallExpressionRest(pos, memberExpression);
        }
        return parseLeftHandSideExpressionOrHigher();
    }

    function tryParseDecorator(): Decorator | undefined {
        const pos = getNodePos();
        if (!parseOptional(SyntaxKind.AtToken)) {
            return undefined;
        }
        const expression = doInDecoratorContext(parseDecoratorExpression);
        return finishNode(factory.createDecorator(expression), pos);
    }

    function tryParseModifier(hasSeenStaticModifier: boolean, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): Modifier | undefined {
        const pos = getNodePos();
        const kind = token();

        if (token() === SyntaxKind.ConstKeyword && permitConstAsModifier) {
            // We need to ensure that any subsequent modifiers appear on the same line
            // so that when 'const' is a standalone declaration, we don't issue an error.
            if (!tryParse(nextTokenIsOnSameLineAndCanFollowModifier)) {
                return undefined;
            }
        }
        else if (stopOnStartOfClassStaticBlock && token() === SyntaxKind.StaticKeyword && lookAhead(nextTokenIsOpenBrace)) {
            return undefined;
        }
        else if (hasSeenStaticModifier && token() === SyntaxKind.StaticKeyword) {
            return undefined;
        }
        else {
            if (!parseAnyContextualModifier()) {
                return undefined;
            }
        }

        return finishNode(factoryCreateToken(kind as Modifier["kind"]), pos);
    }

    /*
     * There are situations in which a modifier like 'const' will appear unexpectedly, such as on a class member.
     * In those situations, if we are entirely sure that 'const' is not valid on its own (such as when ASI takes effect
     * and turns it into a standalone declaration), then it is better to parse it and report an error later.
     *
     * In such situations, 'permitConstAsModifier' should be set to true.
     */
    function parseModifiers(allowDecorators: false, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<Modifier> | undefined;
    function parseModifiers(allowDecorators: true, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<ModifierLike> | undefined;
    function parseModifiers(allowDecorators: boolean, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<ModifierLike> | undefined {
        const pos = getNodePos();
        let list: ModifierLike[] | undefined;
        let decorator, modifier, hasSeenStaticModifier = false, hasLeadingModifier = false, hasTrailingDecorator = false;

        // Decorators should be contiguous in a list of modifiers but can potentially appear in two places (i.e., `[...leadingDecorators, ...leadingModifiers, ...trailingDecorators, ...trailingModifiers]`).
        // The leading modifiers *should* only contain `export` and `default` when trailingDecorators are present, but we'll handle errors for any other leading modifiers in the checker.
        // It is illegal to have both leadingDecorators and trailingDecorators, but we will report that as a grammar check in the checker.

        // parse leading decorators
        if (allowDecorators && token() === SyntaxKind.AtToken) {
            while (decorator = tryParseDecorator()) {
                list = append(list, decorator);
            }
        }

        // parse leading modifiers
        while (modifier = tryParseModifier(hasSeenStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock)) {
            if (modifier.kind === SyntaxKind.StaticKeyword) hasSeenStaticModifier = true;
            list = append(list, modifier);
            hasLeadingModifier = true;
        }

        // parse trailing decorators, but only if we parsed any leading modifiers
        if (hasLeadingModifier && allowDecorators && token() === SyntaxKind.AtToken) {
            while (decorator = tryParseDecorator()) {
                list = append(list, decorator);
                hasTrailingDecorator = true;
            }
        }

        // parse trailing modifiers, but only if we parsed any trailing decorators
        if (hasTrailingDecorator) {
            while (modifier = tryParseModifier(hasSeenStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock)) {
                if (modifier.kind === SyntaxKind.StaticKeyword) hasSeenStaticModifier = true;
                list = append(list, modifier);
            }
        }

        return list && createNodeArray(list, pos);
    }

    function parseModifiersForArrowFunction(): NodeArray<Modifier> | undefined {
        let modifiers: NodeArray<Modifier> | undefined;
        if (token() === SyntaxKind.AsyncKeyword) {
            const pos = getNodePos();
            nextToken();
            const modifier = finishNode(factoryCreateToken(SyntaxKind.AsyncKeyword), pos);
            modifiers = createNodeArray<Modifier>([modifier], pos);
        }
        return modifiers;
    }

    function parseClassElement(): ClassElement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        if (token() === SyntaxKind.SemicolonToken) {
            nextToken();
            return withJSDoc(finishNode(factory.createSemicolonClassElement(), pos), hasJSDoc);
        }

        const modifiers = parseModifiers(/*allowDecorators*/ true, /*permitConstAsModifier*/ true, /*stopOnStartOfClassStaticBlock*/ true);
        if (token() === SyntaxKind.StaticKeyword && lookAhead(nextTokenIsOpenBrace)) {
            return parseClassStaticBlockDeclaration(pos, hasJSDoc, modifiers);
        }

        if (parseContextualModifier(SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.GetAccessor, SignatureFlags.None);
        }

        if (parseContextualModifier(SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, modifiers, SyntaxKind.SetAccessor, SignatureFlags.None);
        }

        if (token() === SyntaxKind.ConstructorKeyword || token() === SyntaxKind.StringLiteral) {
            const constructorDeclaration = tryParseConstructorDeclaration(pos, hasJSDoc, modifiers);
            if (constructorDeclaration) {
                return constructorDeclaration;
            }
        }

        if (isIndexSignature()) {
            return parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers);
        }

        // It is very important that we check this *after* checking indexers because
        // the [ token can start an index signature or a computed property name
        if (
            tokenIsIdentifierOrKeyword(token()) ||
            token() === SyntaxKind.StringLiteral ||
            token() === SyntaxKind.NumericLiteral ||
            token() === SyntaxKind.BigIntLiteral ||
            token() === SyntaxKind.AsteriskToken ||
            token() === SyntaxKind.OpenBracketToken
        ) {
            const isAmbient = some(modifiers, isDeclareModifier);
            if (isAmbient) {
                for (const m of modifiers!) {
                    (m as Mutable<Node>).flags |= NodeFlags.Ambient;
                }
                return doInsideOfContext(NodeFlags.Ambient, () => parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers));
            }
            else {
                return parsePropertyOrMethodDeclaration(pos, hasJSDoc, modifiers);
            }
        }

        if (modifiers) {
            // treat this as a property declaration with a missing name.
            const name = createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.Declaration_expected);
            return parsePropertyDeclaration(pos, hasJSDoc, modifiers, name, /*questionToken*/ undefined);
        }

        // 'isClassMemberStart' should have hinted not to attempt parsing.
        return Debug.fail("Should not have attempted to parse class member declaration.");
    }

    function parseDecoratedExpression(): PrimaryExpression {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ true);
        if (token() === SyntaxKind.ClassKeyword) {
            return parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, SyntaxKind.ClassExpression) as ClassExpression;
        }

        const missing = createMissingNode<MissingDeclaration>(SyntaxKind.MissingDeclaration, /*reportAtCurrentPosition*/ true, Diagnostics.Expression_expected);
        setTextRangePos(missing, pos);
        (missing as Mutable<MissingDeclaration>).modifiers = modifiers;
        return missing;
    }

    function parseClassExpression(): ClassExpression {
        return parseClassDeclarationOrExpression(getNodePos(), hasPrecedingJSDocComment(), /*modifiers*/ undefined, SyntaxKind.ClassExpression) as ClassExpression;
    }

    function parseClassDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ClassDeclaration {
        return parseClassDeclarationOrExpression(pos, hasJSDoc, modifiers, SyntaxKind.ClassDeclaration) as ClassDeclaration;
    }

    function parseClassDeclarationOrExpression(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, kind: ClassLikeDeclaration["kind"]): ClassLikeDeclaration {
        const savedAwaitContext = inAwaitContext();
        parseExpected(SyntaxKind.ClassKeyword);

        // We don't parse the name here in await context, instead we will report a grammar error in the checker.
        const name = parseNameOfClassDeclarationOrExpression();
        const typeParameters = parseTypeParameters();
        if (some(modifiers, isExportModifier)) setAwaitContext(/*value*/ true);
        const heritageClauses = parseHeritageClauses();

        let members;
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            // ClassTail[Yield,Await] : (Modified) See 14.5
            //      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
            members = parseClassMembers();
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<ClassElement>();
        }
        setAwaitContext(savedAwaitContext);
        const node = kind === SyntaxKind.ClassDeclaration
            ? factory.createClassDeclaration(modifiers, name, typeParameters, heritageClauses, members)
            : factory.createClassExpression(modifiers, name, typeParameters, heritageClauses, members);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseNameOfClassDeclarationOrExpression(): Identifier | undefined {
        // implements is a future reserved word so
        // 'class implements' might mean either
        // - class expression with omitted name, 'implements' starts heritage clause
        // - class with name 'implements'
        // 'isImplementsClause' helps to disambiguate between these two cases
        return isBindingIdentifier() && !isImplementsClause()
            ? createIdentifier(isBindingIdentifier())
            : undefined;
    }

    function isImplementsClause() {
        return token() === SyntaxKind.ImplementsKeyword && lookAhead(nextTokenIsIdentifierOrKeyword);
    }

    function parseHeritageClauses(): NodeArray<HeritageClause> | undefined {
        // ClassTail[Yield,Await] : (Modified) See 14.5
        //      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }

        if (isHeritageClause()) {
            return parseList(ParsingContext.HeritageClauses, parseHeritageClause);
        }

        return undefined;
    }

    function parseHeritageClause(): HeritageClause {
        const pos = getNodePos();
        const tok = token();
        Debug.assert(tok === SyntaxKind.ExtendsKeyword || tok === SyntaxKind.ImplementsKeyword); // isListElement() should ensure this.
        nextToken();
        const types = parseDelimitedList(ParsingContext.HeritageClauseElement, parseExpressionWithTypeArguments);
        return finishNode(factory.createHeritageClause(tok, types), pos);
    }

    function parseExpressionWithTypeArguments(): ExpressionWithTypeArguments {
        const pos = getNodePos();
        const expression = parseLeftHandSideExpressionOrHigher();
        if (expression.kind === SyntaxKind.ExpressionWithTypeArguments) {
            return expression as ExpressionWithTypeArguments;
        }
        const typeArguments = tryParseTypeArguments();
        return finishNode(factory.createExpressionWithTypeArguments(expression, typeArguments), pos);
    }

    function tryParseTypeArguments(): NodeArray<TypeNode> | undefined {
        return token() === SyntaxKind.LessThanToken ?
            parseBracketedList(ParsingContext.TypeArguments, parseType, SyntaxKind.LessThanToken, SyntaxKind.GreaterThanToken) : undefined;
    }

    function isHeritageClause(): boolean {
        return token() === SyntaxKind.ExtendsKeyword || token() === SyntaxKind.ImplementsKeyword;
    }

    function parseClassMembers(): NodeArray<ClassElement> {
        return parseList(ParsingContext.ClassMembers, parseClassElement);
    }

    function parseInterfaceDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): InterfaceDeclaration {
        parseExpected(SyntaxKind.InterfaceKeyword);
        const name = parseIdentifier();
        const typeParameters = parseTypeParameters();
        const heritageClauses = parseHeritageClauses();
        const members = parseObjectTypeMembers();
        const node = factory.createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseTypeAliasDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): TypeAliasDeclaration {
        parseExpected(SyntaxKind.TypeKeyword);
        if (scanner.hasPrecedingLineBreak()) {
            parseErrorAtCurrentToken(Diagnostics.Line_break_not_permitted_here);
        }
        const name = parseIdentifier();
        const typeParameters = parseTypeParameters();
        parseExpected(SyntaxKind.EqualsToken);
        const type = token() === SyntaxKind.IntrinsicKeyword && tryParse(parseKeywordAndNoDot) || parseType();
        parseSemicolon();
        const node = factory.createTypeAliasDeclaration(modifiers, name, typeParameters, type);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    // In an ambient declaration, the grammar only allows integer literals as initializers.
    // In a non-ambient declaration, the grammar allows uninitialized members only in a
    // ConstantEnumMemberSection, which starts at the beginning of an enum declaration
    // or any time an integer literal initializer is encountered.
    function parseEnumMember(): EnumMember {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const name = parsePropertyName();
        const initializer = allowInAnd(parseInitializer);
        return withJSDoc(finishNode(factory.createEnumMember(name, initializer), pos), hasJSDoc);
    }

    function parseEnumDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): EnumDeclaration {
        parseExpected(SyntaxKind.EnumKeyword);
        const name = parseIdentifier();
        let members;
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            members = doOutsideOfYieldAndAwaitContext(() => parseDelimitedList(ParsingContext.EnumMembers, parseEnumMember));
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<EnumMember>();
        }
        const node = factory.createEnumDeclaration(modifiers, name, members);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseModuleBlock(): ModuleBlock {
        const pos = getNodePos();
        let statements;
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            statements = parseList(ParsingContext.BlockStatements, parseStatement);
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            statements = createMissingList<Statement>();
        }
        return finishNode(factory.createModuleBlock(statements), pos);
    }

    function parseModuleOrNamespaceDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, flags: NodeFlags): ModuleDeclaration {
        // If we are parsing a dotted namespace name, we want to
        // propagate the 'Namespace' flag across the names if set.
        const namespaceFlag = flags & NodeFlags.Namespace;
        const name = flags & NodeFlags.NestedNamespace ? parseIdentifierName() : parseIdentifier();
        const body = parseOptional(SyntaxKind.DotToken)
            ? parseModuleOrNamespaceDeclaration(getNodePos(), /*hasJSDoc*/ false, /*modifiers*/ undefined, NodeFlags.NestedNamespace | namespaceFlag) as NamespaceDeclaration
            : parseModuleBlock();
        const node = factory.createModuleDeclaration(modifiers, name, body, flags);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseAmbientExternalModuleDeclaration(pos: number, hasJSDoc: boolean, modifiersIn: NodeArray<ModifierLike> | undefined): ModuleDeclaration {
        let flags: NodeFlags = 0;
        let name;
        if (token() === SyntaxKind.GlobalKeyword) {
            // parse 'global' as name of global scope augmentation
            name = parseIdentifier();
            flags |= NodeFlags.GlobalAugmentation;
        }
        else {
            name = parseLiteralNode() as StringLiteral;
            name.text = internIdentifier(name.text);
        }
        let body: ModuleBlock | undefined;
        if (token() === SyntaxKind.OpenBraceToken) {
            body = parseModuleBlock();
        }
        else {
            parseSemicolon();
        }
        const node = factory.createModuleDeclaration(modifiersIn, name, body, flags);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseModuleDeclaration(pos: number, hasJSDoc: boolean, modifiersIn: NodeArray<ModifierLike> | undefined): ModuleDeclaration {
        let flags: NodeFlags = 0;
        if (token() === SyntaxKind.GlobalKeyword) {
            // global augmentation
            return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiersIn);
        }
        else if (parseOptional(SyntaxKind.NamespaceKeyword)) {
            flags |= NodeFlags.Namespace;
        }
        else {
            parseExpected(SyntaxKind.ModuleKeyword);
            if (token() === SyntaxKind.StringLiteral) {
                return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, modifiersIn);
            }
        }
        return parseModuleOrNamespaceDeclaration(pos, hasJSDoc, modifiersIn, flags);
    }

    function isExternalModuleReference() {
        return token() === SyntaxKind.RequireKeyword &&
            lookAhead(nextTokenIsOpenParen);
    }

    function nextTokenIsOpenParen() {
        return nextToken() === SyntaxKind.OpenParenToken;
    }

    function nextTokenIsOpenBrace() {
        return nextToken() === SyntaxKind.OpenBraceToken;
    }

    function nextTokenIsSlash() {
        return nextToken() === SyntaxKind.SlashToken;
    }

    function parseNamespaceExportDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): NamespaceExportDeclaration {
        parseExpected(SyntaxKind.AsKeyword);
        parseExpected(SyntaxKind.NamespaceKeyword);
        const name = parseIdentifier();
        parseSemicolon();
        const node = factory.createNamespaceExportDeclaration(name);
        // NamespaceExportDeclaration nodes cannot have decorators or modifiers, so we attach them here so we can report them in the grammar checker
        (node as Mutable<NamespaceExportDeclaration>).modifiers = modifiers;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseImportDeclarationOrImportEqualsDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ImportEqualsDeclaration | ImportDeclaration {
        parseExpected(SyntaxKind.ImportKeyword);

        const afterImportPos = scanner.getTokenFullStart();

        // We don't parse the identifier here in await context, instead we will report a grammar error in the checker.
        let identifier: Identifier | undefined;
        if (isIdentifier()) {
            identifier = parseIdentifier();
        }

        let isTypeOnly = false;
        if (
            identifier?.escapedText === "type" &&
            (token() !== SyntaxKind.FromKeyword || isIdentifier() && lookAhead(nextTokenIsFromKeywordOrEqualsToken)) &&
            (isIdentifier() || tokenAfterImportDefinitelyProducesImportDeclaration())
        ) {
            isTypeOnly = true;
            identifier = isIdentifier() ? parseIdentifier() : undefined;
        }

        if (identifier && !tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration()) {
            return parseImportEqualsDeclaration(pos, hasJSDoc, modifiers, identifier, isTypeOnly);
        }

        const importClause = tryParseImportClause(identifier, afterImportPos, isTypeOnly);
        const moduleSpecifier = parseModuleSpecifier();
        const attributes = tryParseImportAttributes();

        parseSemicolon();
        const node = factory.createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function tryParseImportClause(identifier: Identifier | undefined, pos: number, isTypeOnly: boolean, skipJsDocLeadingAsterisks = false) {
        // ImportDeclaration:
        //  import ImportClause from ModuleSpecifier ;
        //  import ModuleSpecifier;
        let importClause: ImportClause | undefined;
        if (
            identifier || // import id
            token() === SyntaxKind.AsteriskToken || // import *
            token() === SyntaxKind.OpenBraceToken // import {
        ) {
            importClause = parseImportClause(identifier, pos, isTypeOnly, skipJsDocLeadingAsterisks);
            parseExpected(SyntaxKind.FromKeyword);
        }
        return importClause;
    }

    function tryParseImportAttributes() {
        const currentToken = token();
        if ((currentToken === SyntaxKind.WithKeyword || currentToken === SyntaxKind.AssertKeyword) && !scanner.hasPrecedingLineBreak()) {
            return parseImportAttributes(currentToken);
        }
    }

    function parseImportAttribute() {
        const pos = getNodePos();
        const name = tokenIsIdentifierOrKeyword(token()) ? parseIdentifierName() : parseLiteralLikeNode(SyntaxKind.StringLiteral) as StringLiteral;
        parseExpected(SyntaxKind.ColonToken);
        const value = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        return finishNode(factory.createImportAttribute(name, value), pos);
    }

    function parseImportAttributes(token: SyntaxKind.AssertKeyword | SyntaxKind.WithKeyword, skipKeyword?: true) {
        const pos = getNodePos();
        if (!skipKeyword) {
            parseExpected(token);
        }
        const openBracePosition = scanner.getTokenStart();
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            const multiLine = scanner.hasPrecedingLineBreak();
            const elements = parseDelimitedList(ParsingContext.ImportAttributes, parseImportAttribute, /*considerSemicolonAsDelimiter*/ true);
            if (!parseExpected(SyntaxKind.CloseBraceToken)) {
                const lastError = lastOrUndefined(parseDiagnostics);
                if (lastError && lastError.code === Diagnostics._0_expected.code) {
                    addRelatedInfo(
                        lastError,
                        createDetachedDiagnostic(fileName, sourceText, openBracePosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}"),
                    );
                }
            }
            return finishNode(factory.createImportAttributes(elements, multiLine, token), pos);
        }
        else {
            const elements = createNodeArray([], getNodePos(), /*end*/ undefined, /*hasTrailingComma*/ false);
            return finishNode(factory.createImportAttributes(elements, /*multiLine*/ false, token), pos);
        }
    }

    function tokenAfterImportDefinitelyProducesImportDeclaration() {
        return token() === SyntaxKind.AsteriskToken || token() === SyntaxKind.OpenBraceToken;
    }

    function tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() {
        // In `import id ___`, the current token decides whether to produce
        // an ImportDeclaration or ImportEqualsDeclaration.
        return token() === SyntaxKind.CommaToken || token() === SyntaxKind.FromKeyword;
    }

    function parseImportEqualsDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, identifier: Identifier, isTypeOnly: boolean): ImportEqualsDeclaration {
        parseExpected(SyntaxKind.EqualsToken);
        const moduleReference = parseModuleReference();
        parseSemicolon();
        const node = factory.createImportEqualsDeclaration(modifiers, isTypeOnly, identifier, moduleReference);
        const finished = withJSDoc(finishNode(node, pos), hasJSDoc);
        return finished;
    }

    function parseImportClause(identifier: Identifier | undefined, pos: number, isTypeOnly: boolean, skipJsDocLeadingAsterisks: boolean) {
        // ImportClause:
        //  ImportedDefaultBinding
        //  NameSpaceImport
        //  NamedImports
        //  ImportedDefaultBinding, NameSpaceImport
        //  ImportedDefaultBinding, NamedImports

        // If there was no default import or if there is comma token after default import
        // parse namespace or named imports
        let namedBindings: NamespaceImport | NamedImports | undefined;
        if (
            !identifier ||
            parseOptional(SyntaxKind.CommaToken)
        ) {
            if (skipJsDocLeadingAsterisks) scanner.setSkipJsDocLeadingAsterisks(true);
            namedBindings = token() === SyntaxKind.AsteriskToken ? parseNamespaceImport() : parseNamedImportsOrExports(SyntaxKind.NamedImports);
            if (skipJsDocLeadingAsterisks) scanner.setSkipJsDocLeadingAsterisks(false);
        }

        return finishNode(factory.createImportClause(isTypeOnly, identifier, namedBindings), pos);
    }

    function parseModuleReference() {
        return isExternalModuleReference()
            ? parseExternalModuleReference()
            : parseEntityName(/*allowReservedWords*/ false);
    }

    function parseExternalModuleReference() {
        const pos = getNodePos();
        parseExpected(SyntaxKind.RequireKeyword);
        parseExpected(SyntaxKind.OpenParenToken);
        const expression = parseModuleSpecifier();
        parseExpected(SyntaxKind.CloseParenToken);
        return finishNode(factory.createExternalModuleReference(expression), pos);
    }

    function parseModuleSpecifier(): Expression {
        if (token() === SyntaxKind.StringLiteral) {
            const result = parseLiteralNode();
            result.text = internIdentifier(result.text);
            return result;
        }
        else {
            // We allow arbitrary expressions here, even though the grammar only allows string
            // literals.  We check to ensure that it is only a string literal later in the grammar
            // check pass.
            return parseExpression();
        }
    }

    function parseNamespaceImport(): NamespaceImport {
        // NameSpaceImport:
        //  * as ImportedBinding
        const pos = getNodePos();
        parseExpected(SyntaxKind.AsteriskToken);
        parseExpected(SyntaxKind.AsKeyword);
        const name = parseIdentifier();
        return finishNode(factory.createNamespaceImport(name), pos);
    }

    function canParseModuleExportName(): boolean {
        return tokenIsIdentifierOrKeyword(token()) || token() === SyntaxKind.StringLiteral;
    }

    function parseModuleExportName(parseName: () => Identifier): ModuleExportName {
        return token() === SyntaxKind.StringLiteral ? parseLiteralNode() as StringLiteral : parseName();
    }

    function parseNamedImportsOrExports(kind: SyntaxKind.NamedImports): NamedImports;
    function parseNamedImportsOrExports(kind: SyntaxKind.NamedExports): NamedExports;
    function parseNamedImportsOrExports(kind: SyntaxKind): NamedImportsOrExports {
        const pos = getNodePos();

        // NamedImports:
        //  { }
        //  { ImportsList }
        //  { ImportsList, }

        // ImportsList:
        //  ImportSpecifier
        //  ImportsList, ImportSpecifier
        const node = kind === SyntaxKind.NamedImports
            ? factory.createNamedImports(parseBracketedList(ParsingContext.ImportOrExportSpecifiers, parseImportSpecifier, SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken))
            : factory.createNamedExports(parseBracketedList(ParsingContext.ImportOrExportSpecifiers, parseExportSpecifier, SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken));
        return finishNode(node, pos);
    }

    function parseExportSpecifier() {
        const hasJSDoc = hasPrecedingJSDocComment();
        return withJSDoc(parseImportOrExportSpecifier(SyntaxKind.ExportSpecifier) as ExportSpecifier, hasJSDoc);
    }

    function parseImportSpecifier() {
        return parseImportOrExportSpecifier(SyntaxKind.ImportSpecifier) as ImportSpecifier;
    }

    function parseImportOrExportSpecifier(kind: SyntaxKind): ImportOrExportSpecifier {
        const pos = getNodePos();
        // ImportSpecifier:
        //   BindingIdentifier
        //   ModuleExportName as BindingIdentifier
        // ExportSpecifier:
        //   ModuleExportName
        //   ModuleExportName as ModuleExportName
        let checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier();
        let checkIdentifierStart = scanner.getTokenStart();
        let checkIdentifierEnd = scanner.getTokenEnd();
        let isTypeOnly = false;
        let propertyName: ModuleExportName | undefined;
        let canParseAsKeyword = true;
        let name = parseModuleExportName(parseIdentifierName);
        if (name.kind === SyntaxKind.Identifier && name.escapedText === "type") {
            // If the first token of an import specifier is 'type', there are a lot of possibilities,
            // especially if we see 'as' afterwards:
            //
            // import { type } from "mod";          - isTypeOnly: false,   name: type
            // import { type as } from "mod";       - isTypeOnly: true,    name: as
            // import { type as as } from "mod";    - isTypeOnly: false,   name: as,    propertyName: type
            // import { type as as as } from "mod"; - isTypeOnly: true,    name: as,    propertyName: as
            if (token() === SyntaxKind.AsKeyword) {
                // { type as ...? }
                const firstAs = parseIdentifierName();
                if (token() === SyntaxKind.AsKeyword) {
                    // { type as as ...? }
                    const secondAs = parseIdentifierName();
                    if (canParseModuleExportName()) {
                        // { type as as something }
                        // { type as as "something" }
                        isTypeOnly = true;
                        propertyName = firstAs;
                        name = parseModuleExportName(parseNameWithKeywordCheck);
                        canParseAsKeyword = false;
                    }
                    else {
                        // { type as as }
                        propertyName = name;
                        name = secondAs;
                        canParseAsKeyword = false;
                    }
                }
                else if (canParseModuleExportName()) {
                    // { type as something }
                    // { type as "something" }
                    propertyName = name;
                    canParseAsKeyword = false;
                    name = parseModuleExportName(parseNameWithKeywordCheck);
                }
                else {
                    // { type as }
                    isTypeOnly = true;
                    name = firstAs;
                }
            }
            else if (canParseModuleExportName()) {
                // { type something ...? }
                // { type "something" ...? }
                isTypeOnly = true;
                name = parseModuleExportName(parseNameWithKeywordCheck);
            }
        }

        if (canParseAsKeyword && token() === SyntaxKind.AsKeyword) {
            propertyName = name;
            parseExpected(SyntaxKind.AsKeyword);
            name = parseModuleExportName(parseNameWithKeywordCheck);
        }
        if (kind === SyntaxKind.ImportSpecifier) {
            if (name.kind !== SyntaxKind.Identifier) {
                // ImportSpecifier casts "name" to Identifier below, so make sure it's an identifier
                parseErrorAt(skipTrivia(sourceText, name.pos), name.end, Diagnostics.Identifier_expected);
                name = setTextRangePosEnd(createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false), name.pos, name.pos);
            }
            else if (checkIdentifierIsKeyword) {
                parseErrorAt(checkIdentifierStart, checkIdentifierEnd, Diagnostics.Identifier_expected);
            }
        }
        const node = kind === SyntaxKind.ImportSpecifier
            ? factory.createImportSpecifier(isTypeOnly, propertyName, name as Identifier)
            : factory.createExportSpecifier(isTypeOnly, propertyName, name);
        return finishNode(node, pos);

        function parseNameWithKeywordCheck() {
            checkIdentifierIsKeyword = isKeyword(token()) && !isIdentifier();
            checkIdentifierStart = scanner.getTokenStart();
            checkIdentifierEnd = scanner.getTokenEnd();
            return parseIdentifierName();
        }
    }

    function parseNamespaceExport(pos: number): NamespaceExport {
        return finishNode(factory.createNamespaceExport(parseModuleExportName(parseIdentifierName)), pos);
    }

    function parseExportDeclaration(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ExportDeclaration {
        const savedAwaitContext = inAwaitContext();
        setAwaitContext(/*value*/ true);
        let exportClause: NamedExportBindings | undefined;
        let moduleSpecifier: Expression | undefined;
        let attributes: ImportAttributes | undefined;
        const isTypeOnly = parseOptional(SyntaxKind.TypeKeyword);
        const namespaceExportPos = getNodePos();
        if (parseOptional(SyntaxKind.AsteriskToken)) {
            if (parseOptional(SyntaxKind.AsKeyword)) {
                exportClause = parseNamespaceExport(namespaceExportPos);
            }
            parseExpected(SyntaxKind.FromKeyword);
            moduleSpecifier = parseModuleSpecifier();
        }
        else {
            exportClause = parseNamedImportsOrExports(SyntaxKind.NamedExports);
            // It is not uncommon to accidentally omit the 'from' keyword. Additionally, in editing scenarios,
            // the 'from' keyword can be parsed as a named export when the export clause is unterminated (i.e. `export { from "moduleName";`)
            // If we don't have a 'from' keyword, see if we have a string literal such that ASI won't take effect.
            if (token() === SyntaxKind.FromKeyword || (token() === SyntaxKind.StringLiteral && !scanner.hasPrecedingLineBreak())) {
                parseExpected(SyntaxKind.FromKeyword);
                moduleSpecifier = parseModuleSpecifier();
            }
        }
        const currentToken = token();
        if (moduleSpecifier && (currentToken === SyntaxKind.WithKeyword || currentToken === SyntaxKind.AssertKeyword) && !scanner.hasPrecedingLineBreak()) {
            attributes = parseImportAttributes(currentToken);
        }
        parseSemicolon();
        setAwaitContext(savedAwaitContext);
        const node = factory.createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, attributes);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseExportAssignment(pos: number, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): ExportAssignment {
        const savedAwaitContext = inAwaitContext();
        setAwaitContext(/*value*/ true);
        let isExportEquals: boolean | undefined;
        if (parseOptional(SyntaxKind.EqualsToken)) {
            isExportEquals = true;
        }
        else {
            parseExpected(SyntaxKind.DefaultKeyword);
        }
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        parseSemicolon();
        setAwaitContext(savedAwaitContext);
        const node = factory.createExportAssignment(modifiers, isExportEquals, expression);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    // dprint-ignore
    const enum ParsingContext {
        SourceElements,            // Elements in source file
        BlockStatements,           // Statements in block
        SwitchClauses,             // Clauses in switch statement
        SwitchClauseStatements,    // Statements in switch clause
        TypeMembers,               // Members in interface or type literal
        ClassMembers,              // Members in class declaration
        EnumMembers,               // Members in enum declaration
        HeritageClauseElement,     // Elements in a heritage clause
        VariableDeclarations,      // Variable declarations in variable statement
        ObjectBindingElements,     // Binding elements in object binding list
        ArrayBindingElements,      // Binding elements in array binding list
        ArgumentExpressions,       // Expressions in argument list
        ObjectLiteralMembers,      // Members in object literal
        JsxAttributes,             // Attributes in jsx element
        JsxChildren,               // Things between opening and closing JSX tags
        ArrayLiteralMembers,       // Members in array literal
        Parameters,                // Parameters in parameter list
        JSDocParameters,           // JSDoc parameters in parameter list of JSDoc function type
        RestProperties,            // Property names in a rest type list
        TypeParameters,            // Type parameters in type parameter list
        TypeArguments,             // Type arguments in type argument list
        TupleElementTypes,         // Element types in tuple element type list
        HeritageClauses,           // Heritage clauses for a class or interface declaration.
        ImportOrExportSpecifiers,  // Named import clause's import specifier list,
        ImportAttributes,          // Import attributes
        JSDocComment,              // Parsing via JSDocParser
        Count,                     // Number of parsing contexts
    }

    const enum Tristate {
        False,
        True,
        Unknown,
    }

    export namespace JSDocParser {
        export function parseJSDocTypeExpressionForTests(content: string, start: number | undefined, length: number | undefined): { jsDocTypeExpression: JSDocTypeExpression; diagnostics: Diagnostic[]; } | undefined {
            initializeState("file.js", content, ScriptTarget.Latest, /*syntaxCursor*/ undefined, ScriptKind.JS, JSDocParsingMode.ParseAll);
            scanner.setText(content, start, length);
            currentToken = scanner.scan();
            const jsDocTypeExpression = parseJSDocTypeExpression();

            const sourceFile = createSourceFile("file.js", ScriptTarget.Latest, ScriptKind.JS, /*isDeclarationFile*/ false, [], factoryCreateToken(SyntaxKind.EndOfFileToken), NodeFlags.None, noop);
            const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
            if (jsDocDiagnostics) {
                sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
            }

            clearState();

            return jsDocTypeExpression ? { jsDocTypeExpression, diagnostics } : undefined;
        }

        // Parses out a JSDoc type expression.
        export function parseJSDocTypeExpression(mayOmitBraces?: boolean): JSDocTypeExpression {
            const pos = getNodePos();
            const hasBrace = (mayOmitBraces ? parseOptional : parseExpected)(SyntaxKind.OpenBraceToken);
            const type = doInsideOfContext(NodeFlags.JSDoc, parseJSDocType);
            if (!mayOmitBraces || hasBrace) {
                parseExpectedJSDoc(SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocTypeExpression(type);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        export function parseJSDocNameReference(): JSDocNameReference {
            const pos = getNodePos();
            const hasBrace = parseOptional(SyntaxKind.OpenBraceToken);
            const p2 = getNodePos();
            let entityName: EntityName | JSDocMemberName = parseEntityName(/*allowReservedWords*/ false);
            while (token() === SyntaxKind.PrivateIdentifier) {
                reScanHashToken(); // rescan #id as # id
                nextTokenJSDoc(); // then skip the #
                entityName = finishNode(factory.createJSDocMemberName(entityName, parseIdentifier()), p2);
            }
            if (hasBrace) {
                parseExpectedJSDoc(SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocNameReference(entityName);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        export function parseIsolatedJSDocComment(content: string, start: number | undefined, length: number | undefined): { jsDoc: JSDoc; diagnostics: Diagnostic[]; } | undefined {
            initializeState("", content, ScriptTarget.Latest, /*syntaxCursor*/ undefined, ScriptKind.JS, JSDocParsingMode.ParseAll);
            const jsDoc = doInsideOfContext(NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));

            const sourceFile = { languageVariant: LanguageVariant.Standard, text: content } as SourceFile;
            const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
            clearState();

            return jsDoc ? { jsDoc, diagnostics } : undefined;
        }

        export function parseJSDocComment(parent: HasJSDoc, start: number, length: number): JSDoc | undefined {
            const saveToken = currentToken;
            const saveParseDiagnosticsLength = parseDiagnostics.length;
            const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

            const comment = doInsideOfContext(NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));
            setParent(comment, parent);

            if (contextFlags & NodeFlags.JavaScriptFile) {
                if (!jsDocDiagnostics) {
                    jsDocDiagnostics = [];
                }
                addRange(jsDocDiagnostics, parseDiagnostics, saveParseDiagnosticsLength);
            }
            currentToken = saveToken;
            parseDiagnostics.length = saveParseDiagnosticsLength;
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            return comment;
        }

        const enum JSDocState {
            BeginningOfLine,
            SawAsterisk,
            SavingComments,
            SavingBackticks, // NOTE: Only used when parsing tag comments
        }

        const enum PropertyLikeParse {
            Property = 1 << 0,
            Parameter = 1 << 1,
            CallbackParameter = 1 << 2,
        }

        function parseJSDocCommentWorker(start = 0, length: number | undefined): JSDoc | undefined {
            const content = sourceText;
            const end = length === undefined ? content.length : start + length;
            length = end - start;

            Debug.assert(start >= 0);
            Debug.assert(start <= end);
            Debug.assert(end <= content.length);

            // Check for /** (JSDoc opening part)
            if (!isJSDocLikeText(content, start)) {
                return undefined;
            }

            let tags: JSDocTag[];
            let tagsPos: number;
            let tagsEnd: number;
            let linkEnd: number;
            let commentsPos: number | undefined;
            let comments: string[] = [];
            const parts: JSDocComment[] = [];

            const saveParsingContext = parsingContext;
            parsingContext |= 1 << ParsingContext.JSDocComment;

            // + 3 for leading /**, - 5 in total for /** */
            const result = scanner.scanRange(start + 3, length - 5, doJSDocScan);
            parsingContext = saveParsingContext;
            return result;

            function doJSDocScan() {
                // Initially we can parse out a tag.  We also have seen a starting asterisk.
                // This is so that /** * @type */ doesn't parse.
                let state = JSDocState.SawAsterisk;
                let margin: number | undefined;
                // + 4 for leading '/** '
                // + 1 because the last index of \n is always one index before the first character in the line and coincidentally, if there is no \n before start, it is -1, which is also one index before the first character
                let indent = start - (content.lastIndexOf("\n", start) + 1) + 4;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }

                nextTokenJSDoc();
                while (parseOptionalJsdoc(SyntaxKind.WhitespaceTrivia));
                if (parseOptionalJsdoc(SyntaxKind.NewLineTrivia)) {
                    state = JSDocState.BeginningOfLine;
                    indent = 0;
                }
                loop:
                while (true) {
                    switch (token()) {
                        case SyntaxKind.AtToken:
                            removeTrailingWhitespace(comments);
                            if (!commentsPos) commentsPos = getNodePos();
                            addTag(parseTag(indent));
                            // NOTE: According to usejsdoc.org, a tag goes to end of line, except the last tag.
                            // Real-world comments may break this rule, so "BeginningOfLine" will not be a real line beginning
                            // for malformed examples like `/** @param {string} x @returns {number} the length */`
                            state = JSDocState.BeginningOfLine;
                            margin = undefined;
                            break;
                        case SyntaxKind.NewLineTrivia:
                            comments.push(scanner.getTokenText());
                            state = JSDocState.BeginningOfLine;
                            indent = 0;
                            break;
                        case SyntaxKind.AsteriskToken:
                            const asterisk = scanner.getTokenText();
                            if (state === JSDocState.SawAsterisk) {
                                // If we've already seen an asterisk, then we can no longer parse a tag on this line
                                state = JSDocState.SavingComments;
                                pushComment(asterisk);
                            }
                            else {
                                Debug.assert(state === JSDocState.BeginningOfLine);
                                // Ignore the first asterisk on a line
                                state = JSDocState.SawAsterisk;
                                indent += asterisk.length;
                            }
                            break;
                        case SyntaxKind.WhitespaceTrivia:
                            Debug.assert(state !== JSDocState.SavingComments, "whitespace shouldn't come from the scanner while saving top-level comment text");
                            // only collect whitespace if we're already saving comments or have just crossed the comment indent margin
                            const whitespace = scanner.getTokenText();
                            if (margin !== undefined && indent + whitespace.length > margin) {
                                comments.push(whitespace.slice(margin - indent));
                            }
                            indent += whitespace.length;
                            break;
                        case SyntaxKind.EndOfFileToken:
                            break loop;
                        case SyntaxKind.JSDocCommentTextToken:
                            state = JSDocState.SavingComments;
                            pushComment(scanner.getTokenValue());
                            break;
                        case SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getTokenFullStart();
                            const linkStart = scanner.getTokenEnd() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                if (!linkEnd) {
                                    removeLeadingNewlines(comments);
                                }
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? start, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTokenEnd();
                                break;
                            }
                            // fallthrough if it's not a {@link sequence
                        default:
                            // Anything else is doc comment text. We just save it. Because it
                            // wasn't a tag, we can no longer parse a tag on this line until we hit the next
                            // line break.
                            state = JSDocState.SavingComments;
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    if (state === JSDocState.SavingComments) {
                        nextJSDocCommentTextToken(/*inBackticks*/ false);
                    }
                    else {
                        nextTokenJSDoc();
                    }
                }
                const trimmedComments = comments.join("").trimEnd();
                if (parts.length && trimmedComments.length) {
                    parts.push(finishNode(factory.createJSDocText(trimmedComments), linkEnd ?? start, commentsPos));
                }
                if (parts.length && tags) Debug.assertIsDefined(commentsPos, "having parsed tags implies that the end of the comment span should be set");
                const tagsArray = tags && createNodeArray(tags, tagsPos, tagsEnd);
                return finishNode(factory.createJSDocComment(parts.length ? createNodeArray(parts, start, commentsPos) : trimmedComments.length ? trimmedComments : undefined, tagsArray), start, end);
            }

            function removeLeadingNewlines(comments: string[]) {
                while (comments.length && (comments[0] === "\n" || comments[0] === "\r")) {
                    comments.shift();
                }
            }

            function removeTrailingWhitespace(comments: string[]) {
                while (comments.length) {
                    const trimmed = comments[comments.length - 1].trimEnd();
                    if (trimmed === "") {
                        comments.pop();
                    }
                    else if (trimmed.length < comments[comments.length - 1].length) {
                        comments[comments.length - 1] = trimmed;
                        break;
                    }
                    else {
                        break;
                    }
                }
            }

            function isNextNonwhitespaceTokenEndOfFile(): boolean {
                // We must use infinite lookahead, as there could be any number of newlines :(
                while (true) {
                    nextTokenJSDoc();
                    if (token() === SyntaxKind.EndOfFileToken) {
                        return true;
                    }
                    if (!(token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia)) {
                        return false;
                    }
                }
            }

            function skipWhitespace(): void {
                if (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }
                while (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    nextTokenJSDoc();
                }
            }

            function skipWhitespaceOrAsterisk(): string {
                if (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return ""; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }

                let precedingLineBreak = scanner.hasPrecedingLineBreak();
                let seenLineBreak = false;
                let indentText = "";
                while ((precedingLineBreak && token() === SyntaxKind.AsteriskToken) || token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    indentText += scanner.getTokenText();
                    if (token() === SyntaxKind.NewLineTrivia) {
                        precedingLineBreak = true;
                        seenLineBreak = true;
                        indentText = "";
                    }
                    else if (token() === SyntaxKind.AsteriskToken) {
                        precedingLineBreak = false;
                    }
                    nextTokenJSDoc();
                }
                return seenLineBreak ? indentText : "";
            }

            function parseTag(margin: number) {
                Debug.assert(token() === SyntaxKind.AtToken);
                const start = scanner.getTokenStart();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName(/*message*/ undefined);
                const indentText = skipWhitespaceOrAsterisk();

                let tag: JSDocTag | undefined;
                switch (tagName.escapedText) {
                    case "author":
                        tag = parseAuthorTag(start, tagName, margin, indentText);
                        break;
                    case "implements":
                        tag = parseImplementsTag(start, tagName, margin, indentText);
                        break;
                    case "augments":
                    case "extends":
                        tag = parseAugmentsTag(start, tagName, margin, indentText);
                        break;
                    case "class":
                    case "constructor":
                        tag = parseSimpleTag(start, factory.createJSDocClassTag, tagName, margin, indentText);
                        break;
                    case "public":
                        tag = parseSimpleTag(start, factory.createJSDocPublicTag, tagName, margin, indentText);
                        break;
                    case "private":
                        tag = parseSimpleTag(start, factory.createJSDocPrivateTag, tagName, margin, indentText);
                        break;
                    case "protected":
                        tag = parseSimpleTag(start, factory.createJSDocProtectedTag, tagName, margin, indentText);
                        break;
                    case "readonly":
                        tag = parseSimpleTag(start, factory.createJSDocReadonlyTag, tagName, margin, indentText);
                        break;
                    case "override":
                        tag = parseSimpleTag(start, factory.createJSDocOverrideTag, tagName, margin, indentText);
                        break;
                    case "deprecated":
                        hasDeprecatedTag = true;
                        tag = parseSimpleTag(start, factory.createJSDocDeprecatedTag, tagName, margin, indentText);
                        break;
                    case "this":
                        tag = parseThisTag(start, tagName, margin, indentText);
                        break;
                    case "enum":
                        tag = parseEnumTag(start, tagName, margin, indentText);
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        return parseParameterOrPropertyTag(start, tagName, PropertyLikeParse.Parameter, margin);
                    case "return":
                    case "returns":
                        tag = parseReturnTag(start, tagName, margin, indentText);
                        break;
                    case "template":
                        tag = parseTemplateTag(start, tagName, margin, indentText);
                        break;
                    case "type":
                        tag = parseTypeTag(start, tagName, margin, indentText);
                        break;
                    case "typedef":
                        tag = parseTypedefTag(start, tagName, margin, indentText);
                        break;
                    case "callback":
                        tag = parseCallbackTag(start, tagName, margin, indentText);
                        break;
                    case "overload":
                        tag = parseOverloadTag(start, tagName, margin, indentText);
                        break;
                    case "satisfies":
                        tag = parseSatisfiesTag(start, tagName, margin, indentText);
                        break;
                    case "see":
                        tag = parseSeeTag(start, tagName, margin, indentText);
                        break;
                    case "exception":
                    case "throws":
                        tag = parseThrowsTag(start, tagName, margin, indentText);
                        break;
                    case "import":
                        tag = parseImportTag(start, tagName, margin, indentText);
                        break;
                    default:
                        tag = parseUnknownTag(start, tagName, margin, indentText);
                        break;
                }
                return tag;
            }

            function parseTrailingTagComments(pos: number, end: number, margin: number, indentText: string) {
                // some tags, like typedef and callback, have already parsed their comments earlier
                if (!indentText) {
                    margin += end - pos;
                }
                return parseTagComments(margin, indentText.slice(margin));
            }

            function parseTagComments(indent: number, initialMargin?: string): string | NodeArray<JSDocComment> | undefined {
                const commentsPos = getNodePos();
                let comments: string[] = [];
                const parts: JSDocComment[] = [];
                let linkEnd;
                let state = JSDocState.BeginningOfLine;
                let margin: number | undefined;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }
                if (initialMargin !== undefined) {
                    // jump straight to saving comments if there is some initial indentation
                    if (initialMargin !== "") {
                        pushComment(initialMargin);
                    }
                    state = JSDocState.SawAsterisk;
                }
                let tok = token() as JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken;
                loop:
                while (true) {
                    switch (tok) {
                        case SyntaxKind.NewLineTrivia:
                            state = JSDocState.BeginningOfLine;
                            // don't use pushComment here because we want to keep the margin unchanged
                            comments.push(scanner.getTokenText());
                            indent = 0;
                            break;
                        case SyntaxKind.AtToken:
                            scanner.resetTokenState(scanner.getTokenEnd() - 1);
                            break loop;
                        case SyntaxKind.EndOfFileToken:
                            // Done
                            break loop;
                        case SyntaxKind.WhitespaceTrivia:
                            Debug.assert(state !== JSDocState.SavingComments && state !== JSDocState.SavingBackticks, "whitespace shouldn't come from the scanner while saving comment text");
                            const whitespace = scanner.getTokenText();
                            // if the whitespace crosses the margin, take only the whitespace that passes the margin
                            if (margin !== undefined && indent + whitespace.length > margin) {
                                comments.push(whitespace.slice(margin - indent));
                                state = JSDocState.SavingComments;
                            }
                            indent += whitespace.length;
                            break;
                        case SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getTokenFullStart();
                            const linkStart = scanner.getTokenEnd() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? commentsPos, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTokenEnd();
                            }
                            else {
                                pushComment(scanner.getTokenText());
                            }
                            break;
                        case SyntaxKind.BacktickToken:
                            if (state === JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments;
                            }
                            else {
                                state = JSDocState.SavingBackticks;
                            }
                            pushComment(scanner.getTokenText());
                            break;
                        case SyntaxKind.JSDocCommentTextToken:
                            if (state !== JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments; // leading identifiers start recording as well
                            }
                            pushComment(scanner.getTokenValue());
                            break;
                        case SyntaxKind.AsteriskToken:
                            if (state === JSDocState.BeginningOfLine) {
                                // leading asterisks start recording on the *next* (non-whitespace) token
                                state = JSDocState.SawAsterisk;
                                indent += 1;
                                break;
                            }
                            // record the * as a comment
                            // falls through
                        default:
                            if (state !== JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments; // leading identifiers start recording as well
                            }
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    if (state === JSDocState.SavingComments || state === JSDocState.SavingBackticks) {
                        tok = nextJSDocCommentTextToken(state === JSDocState.SavingBackticks);
                    }
                    else {
                        tok = nextTokenJSDoc();
                    }
                }

                removeLeadingNewlines(comments);
                const trimmedComments = comments.join("").trimEnd();
                if (parts.length) {
                    if (trimmedComments.length) {
                        parts.push(finishNode(factory.createJSDocText(trimmedComments), linkEnd ?? commentsPos));
                    }
                    return createNodeArray(parts, commentsPos, scanner.getTokenEnd());
                }
                else if (trimmedComments.length) {
                    return trimmedComments;
                }
            }

            function parseJSDocLink(start: number) {
                const linkType = tryParse(parseJSDocLinkPrefix);
                if (!linkType) {
                    return undefined;
                }
                nextTokenJSDoc(); // start at token after link, then skip any whitespace
                skipWhitespace();
                const name = parseJSDocLinkName();
                const text = [];
                while (token() !== SyntaxKind.CloseBraceToken && token() !== SyntaxKind.NewLineTrivia && token() !== SyntaxKind.EndOfFileToken) {
                    text.push(scanner.getTokenText());
                    nextTokenJSDoc();
                }
                const create = linkType === "link" ? factory.createJSDocLink
                    : linkType === "linkcode" ? factory.createJSDocLinkCode
                    : factory.createJSDocLinkPlain;
                return finishNode(create(name, text.join("")), start, scanner.getTokenEnd());
            }

            function parseJSDocLinkName() {
                if (tokenIsIdentifierOrKeyword(token())) {
                    const pos = getNodePos();

                    let name: EntityName | JSDocMemberName = parseIdentifierName();
                    while (parseOptional(SyntaxKind.DotToken)) {
                        name = finishNode(factory.createQualifiedName(name, token() === SyntaxKind.PrivateIdentifier ? createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false) : parseIdentifierName()), pos);
                    }
                    while (token() === SyntaxKind.PrivateIdentifier) {
                        reScanHashToken();
                        nextTokenJSDoc();
                        name = finishNode(factory.createJSDocMemberName(name, parseIdentifier()), pos);
                    }
                    return name;
                }
                return undefined;
            }

            function parseJSDocLinkPrefix() {
                skipWhitespaceOrAsterisk();
                if (
                    token() === SyntaxKind.OpenBraceToken
                    && nextTokenJSDoc() === SyntaxKind.AtToken
                    && tokenIsIdentifierOrKeyword(nextTokenJSDoc())
                ) {
                    const kind = scanner.getTokenValue();
                    if (isJSDocLinkTag(kind)) return kind;
                }
            }

            function isJSDocLinkTag(kind: string) {
                return kind === "link" || kind === "linkcode" || kind === "linkplain";
            }

            function parseUnknownTag(start: number, tagName: Identifier, indent: number, indentText: string) {
                return finishNode(factory.createJSDocUnknownTag(tagName, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function addTag(tag: JSDocTag | undefined): void {
                if (!tag) {
                    return;
                }
                if (!tags) {
                    tags = [tag];
                    tagsPos = tag.pos;
                }
                else {
                    tags.push(tag);
                }
                tagsEnd = tag.end;
            }

            function tryParseTypeExpression(): JSDocTypeExpression | undefined {
                skipWhitespaceOrAsterisk();
                return token() === SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
            }

            function parseBracketNameInPropertyAndParamTag(): { name: EntityName; isBracketed: boolean; } {
                // Looking for something like '[foo]', 'foo', '[foo.bar]' or 'foo.bar'
                const isBracketed = parseOptionalJsdoc(SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }
                // a markdown-quoted name: `arg` is not legal jsdoc, but occurs in the wild
                const isBackquoted = parseOptionalJsdoc(SyntaxKind.BacktickToken);
                const name = parseJSDocEntityName();
                if (isBackquoted) {
                    parseExpectedTokenJSDoc(SyntaxKind.BacktickToken);
                }
                if (isBracketed) {
                    skipWhitespace();
                    // May have an optional default, e.g. '[foo = 42]'
                    if (parseOptionalToken(SyntaxKind.EqualsToken)) {
                        parseExpression();
                    }

                    parseExpected(SyntaxKind.CloseBracketToken);
                }

                return { name, isBracketed };
            }

            function isObjectOrObjectArrayTypeReference(node: TypeNode): boolean {
                switch (node.kind) {
                    case SyntaxKind.ObjectKeyword:
                        return true;
                    case SyntaxKind.ArrayType:
                        return isObjectOrObjectArrayTypeReference((node as ArrayTypeNode).elementType);
                    default:
                        return isTypeReferenceNode(node) && isIdentifierNode(node.typeName) && node.typeName.escapedText === "Object" && !node.typeArguments;
                }
            }

            function parseParameterOrPropertyTag(start: number, tagName: Identifier, target: PropertyLikeParse, indent: number): JSDocParameterTag | JSDocPropertyTag {
                let typeExpression = tryParseTypeExpression();
                let isNameFirst = !typeExpression;
                skipWhitespaceOrAsterisk();

                const { name, isBracketed } = parseBracketNameInPropertyAndParamTag();
                const indentText = skipWhitespaceOrAsterisk();

                if (isNameFirst && !lookAhead(parseJSDocLinkPrefix)) {
                    typeExpression = tryParseTypeExpression();
                }

                const comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);

                const nestedTypeLiteral = parseNestedTypeLiteral(typeExpression, name, target, indent);
                if (nestedTypeLiteral) {
                    typeExpression = nestedTypeLiteral;
                    isNameFirst = true;
                }
                const result = target === PropertyLikeParse.Property
                    ? factory.createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment)
                    : factory.createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment);
                return finishNode(result, start);
            }

            function parseNestedTypeLiteral(typeExpression: JSDocTypeExpression | undefined, name: EntityName, target: PropertyLikeParse, indent: number) {
                if (typeExpression && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    const pos = getNodePos();
                    let child: JSDocPropertyLikeTag | JSDocTypeTag | JSDocTemplateTag | JSDocThisTag | false;
                    let children: JSDocPropertyLikeTag[] | undefined;
                    while (child = tryParse(() => parseChildParameterOrPropertyTag(target, indent, name))) {
                        if (child.kind === SyntaxKind.JSDocParameterTag || child.kind === SyntaxKind.JSDocPropertyTag) {
                            children = append(children, child);
                        }
                        else if (child.kind === SyntaxKind.JSDocTemplateTag) {
                            parseErrorAtRange(child.tagName, Diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag);
                        }
                    }
                    if (children) {
                        const literal = finishNode(factory.createJSDocTypeLiteral(children, typeExpression.type.kind === SyntaxKind.ArrayType), pos);
                        return finishNode(factory.createJSDocTypeExpression(literal), pos);
                    }
                }
            }

            function parseReturnTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocReturnTag {
                if (some(tags, isJSDocReturnTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenStart(), Diagnostics._0_tag_already_specified, unescapeLeadingUnderscores(tagName.escapedText));
                }

                const typeExpression = tryParseTypeExpression();
                return finishNode(factory.createJSDocReturnTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseTypeTag(start: number, tagName: Identifier, indent?: number, indentText?: string): JSDocTypeTag {
                if (some(tags, isJSDocTypeTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenStart(), Diagnostics._0_tag_already_specified, unescapeLeadingUnderscores(tagName.escapedText));
                }

                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocTypeTag(tagName, typeExpression, comments), start);
            }

            function parseSeeTag(start: number, tagName: Identifier, indent?: number, indentText?: string): JSDocSeeTag {
                const isMarkdownOrJSDocLink = token() === SyntaxKind.OpenBracketToken
                    || lookAhead(() => nextTokenJSDoc() === SyntaxKind.AtToken && tokenIsIdentifierOrKeyword(nextTokenJSDoc()) && isJSDocLinkTag(scanner.getTokenValue()));
                const nameExpression = isMarkdownOrJSDocLink ? undefined : parseJSDocNameReference();
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocSeeTag(tagName, nameExpression, comments), start);
            }

            function parseThrowsTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocThrowsTag {
                const typeExpression = tryParseTypeExpression();
                const comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                return finishNode(factory.createJSDocThrowsTag(tagName, typeExpression, comment), start);
            }

            function parseAuthorTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocAuthorTag {
                const commentStart = getNodePos();
                const textOnly = parseAuthorNameAndEmail();
                let commentEnd = scanner.getTokenFullStart();
                const comments = parseTrailingTagComments(start, commentEnd, indent, indentText);
                if (!comments) {
                    commentEnd = scanner.getTokenFullStart();
                }
                const allParts = typeof comments !== "string"
                    ? createNodeArray(concatenate([finishNode(textOnly, commentStart, commentEnd)], comments) as JSDocComment[], commentStart) // cast away readonly
                    : textOnly.text + comments;
                return finishNode(factory.createJSDocAuthorTag(tagName, allParts), start);
            }

            function parseAuthorNameAndEmail(): JSDocText {
                const comments: string[] = [];
                let inEmail = false;
                let token = scanner.getToken();
                while (token !== SyntaxKind.EndOfFileToken && token !== SyntaxKind.NewLineTrivia) {
                    if (token === SyntaxKind.LessThanToken) {
                        inEmail = true;
                    }
                    else if (token === SyntaxKind.AtToken && !inEmail) {
                        break;
                    }
                    else if (token === SyntaxKind.GreaterThanToken && inEmail) {
                        comments.push(scanner.getTokenText());
                        scanner.resetTokenState(scanner.getTokenEnd());
                        break;
                    }
                    comments.push(scanner.getTokenText());
                    token = nextTokenJSDoc();
                }

                return factory.createJSDocText(comments.join(""));
            }

            function parseImplementsTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocImplementsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocImplementsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseAugmentsTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocAugmentsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocAugmentsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseSatisfiesTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocSatisfiesTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ false);
                const comments = margin !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), margin, indentText) : undefined;
                return finishNode(factory.createJSDocSatisfiesTag(tagName, typeExpression, comments), start);
            }

            function parseImportTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocImportTag {
                const afterImportTagPos = scanner.getTokenFullStart();

                let identifier: Identifier | undefined;
                if (isIdentifier()) {
                    identifier = parseIdentifier();
                }

                const importClause = tryParseImportClause(identifier, afterImportTagPos, /*isTypeOnly*/ true, /*skipJsDocLeadingAsterisks*/ true);
                const moduleSpecifier = parseModuleSpecifier();
                const attributes = tryParseImportAttributes();

                const comments = margin !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), margin, indentText) : undefined;
                return finishNode(factory.createJSDocImportTag(tagName, importClause, moduleSpecifier, attributes, comments), start);
            }

            function parseExpressionWithTypeArgumentsForAugments(): ExpressionWithTypeArguments & { expression: Identifier | PropertyAccessEntityNameExpression; } {
                const usedBrace = parseOptional(SyntaxKind.OpenBraceToken);
                const pos = getNodePos();
                const expression = parsePropertyAccessEntityNameExpression();
                scanner.setSkipJsDocLeadingAsterisks(true);
                const typeArguments = tryParseTypeArguments();
                scanner.setSkipJsDocLeadingAsterisks(false);
                const node = factory.createExpressionWithTypeArguments(expression, typeArguments) as ExpressionWithTypeArguments & { expression: Identifier | PropertyAccessEntityNameExpression; };
                const res = finishNode(node, pos);
                if (usedBrace) {
                    skipWhitespace();
                    parseExpected(SyntaxKind.CloseBraceToken);
                }
                return res;
            }

            function parsePropertyAccessEntityNameExpression() {
                const pos = getNodePos();
                let node: Identifier | PropertyAccessEntityNameExpression = parseJSDocIdentifierName();
                while (parseOptional(SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    node = finishNode(factoryCreatePropertyAccessExpression(node, name), pos) as PropertyAccessEntityNameExpression;
                }
                return node;
            }

            function parseSimpleTag(start: number, createTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>) => JSDocTag, tagName: Identifier, margin: number, indentText: string): JSDocTag {
                return finishNode(createTag(tagName, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseThisTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocThisTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                skipWhitespace();
                return finishNode(factory.createJSDocThisTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseEnumTag(start: number, tagName: Identifier, margin: number, indentText: string): JSDocEnumTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                skipWhitespace();
                return finishNode(factory.createJSDocEnumTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseTypedefTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocTypedefTag {
                let typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined = tryParseTypeExpression();
                skipWhitespaceOrAsterisk();

                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);

                let end: number | undefined;
                if (!typeExpression || isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    let child: JSDocTypeTag | JSDocPropertyTag | JSDocTemplateTag | false;
                    let childTypeTag: JSDocTypeTag | undefined;
                    let jsDocPropertyTags: JSDocPropertyTag[] | undefined;
                    let hasChildren = false;
                    while (child = tryParse(() => parseChildPropertyTag(indent))) {
                        if (child.kind === SyntaxKind.JSDocTemplateTag) {
                            break;
                        }
                        hasChildren = true;
                        if (child.kind === SyntaxKind.JSDocTypeTag) {
                            if (childTypeTag) {
                                const lastError = parseErrorAtCurrentToken(Diagnostics.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags);
                                if (lastError) {
                                    addRelatedInfo(lastError, createDetachedDiagnostic(fileName, sourceText, 0, 0, Diagnostics.The_tag_was_first_specified_here));
                                }
                                break;
                            }
                            else {
                                childTypeTag = child;
                            }
                        }
                        else {
                            jsDocPropertyTags = append(jsDocPropertyTags, child);
                        }
                    }
                    if (hasChildren) {
                        const isArrayType = typeExpression && typeExpression.type.kind === SyntaxKind.ArrayType;
                        const jsdocTypeLiteral = factory.createJSDocTypeLiteral(jsDocPropertyTags, isArrayType);
                        typeExpression = childTypeTag && childTypeTag.typeExpression && !isObjectOrObjectArrayTypeReference(childTypeTag.typeExpression.type) ?
                            childTypeTag.typeExpression :
                            finishNode(jsdocTypeLiteral, start);
                        end = typeExpression.end;
                    }
                }

                // Only include the characters between the name end and the next token if a comment was actually parsed out - otherwise it's just whitespace
                end = end || comment !== undefined ?
                    getNodePos() :
                    (fullName ?? typeExpression ?? tagName).end;

                if (!comment) {
                    comment = parseTrailingTagComments(start, end, indent, indentText);
                }

                const typedefTag = factory.createJSDocTypedefTag(tagName, typeExpression, fullName, comment);
                return finishNode(typedefTag, start, end);
            }

            function parseJSDocTypeNameWithNamespace(nested?: boolean) {
                const start = scanner.getTokenStart();
                if (!tokenIsIdentifierOrKeyword(token())) {
                    return undefined;
                }
                const typeNameOrNamespaceName = parseJSDocIdentifierName();
                if (parseOptional(SyntaxKind.DotToken)) {
                    const body = parseJSDocTypeNameWithNamespace(/*nested*/ true);
                    const jsDocNamespaceNode = factory.createModuleDeclaration(
                        /*modifiers*/ undefined,
                        typeNameOrNamespaceName,
                        body,
                        nested ? NodeFlags.NestedNamespace : undefined,
                    ) as JSDocNamespaceDeclaration;
                    return finishNode(jsDocNamespaceNode, start);
                }

                if (nested) {
                    (typeNameOrNamespaceName as Mutable<Identifier>).flags |= NodeFlags.IdentifierIsInJSDocNamespace;
                }
                return typeNameOrNamespaceName;
            }

            function parseCallbackTagParameters(indent: number) {
                const pos = getNodePos();
                let child: JSDocParameterTag | JSDocTemplateTag | false;
                let parameters;
                while (child = tryParse(() => parseChildParameterOrPropertyTag(PropertyLikeParse.CallbackParameter, indent) as JSDocParameterTag | JSDocTemplateTag)) {
                    if (child.kind === SyntaxKind.JSDocTemplateTag) {
                        parseErrorAtRange(child.tagName, Diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag);
                        break;
                    }
                    parameters = append(parameters, child);
                }
                return createNodeArray(parameters || [], pos);
            }

            function parseJSDocSignature(start: number, indent: number): JSDocSignature {
                const parameters = parseCallbackTagParameters(indent);
                const returnTag = tryParse(() => {
                    if (parseOptionalJsdoc(SyntaxKind.AtToken)) {
                        const tag = parseTag(indent);
                        if (tag && tag.kind === SyntaxKind.JSDocReturnTag) {
                            return tag as JSDocReturnTag;
                        }
                    }
                });
                return finishNode(factory.createJSDocSignature(/*typeParameters*/ undefined, parameters, returnTag), start);
            }

            function parseCallbackTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocCallbackTag {
                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);
                const typeExpression = parseJSDocSignature(start, indent);
                if (!comment) {
                    comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                }
                const end = comment !== undefined ? getNodePos() : typeExpression.end;
                return finishNode(factory.createJSDocCallbackTag(tagName, typeExpression, fullName, comment), start, end);
            }

            function parseOverloadTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocOverloadTag {
                skipWhitespace();
                let comment = parseTagComments(indent);
                const typeExpression = parseJSDocSignature(start, indent);
                if (!comment) {
                    comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                }
                const end = comment !== undefined ? getNodePos() : typeExpression.end;
                return finishNode(factory.createJSDocOverloadTag(tagName, typeExpression, comment), start, end);
            }

            function escapedTextsEqual(a: EntityName, b: EntityName): boolean {
                while (!isIdentifierNode(a) || !isIdentifierNode(b)) {
                    if (!isIdentifierNode(a) && !isIdentifierNode(b) && a.right.escapedText === b.right.escapedText) {
                        a = a.left;
                        b = b.left;
                    }
                    else {
                        return false;
                    }
                }
                return a.escapedText === b.escapedText;
            }

            function parseChildPropertyTag(indent: number) {
                return parseChildParameterOrPropertyTag(PropertyLikeParse.Property, indent) as JSDocTypeTag | JSDocPropertyTag | JSDocTemplateTag | false;
            }

            function parseChildParameterOrPropertyTag(target: PropertyLikeParse, indent: number, name?: EntityName): JSDocTypeTag | JSDocPropertyTag | JSDocParameterTag | JSDocTemplateTag | JSDocThisTag | false {
                let canParseTag = true;
                let seenAsterisk = false;
                while (true) {
                    switch (nextTokenJSDoc()) {
                        case SyntaxKind.AtToken:
                            if (canParseTag) {
                                const child = tryParseChildTag(target, indent);
                                if (
                                    child && (child.kind === SyntaxKind.JSDocParameterTag || child.kind === SyntaxKind.JSDocPropertyTag) &&
                                    name && (isIdentifierNode(child.name) || !escapedTextsEqual(name, child.name.left))
                                ) {
                                    return false;
                                }
                                return child;
                            }
                            seenAsterisk = false;
                            break;
                        case SyntaxKind.NewLineTrivia:
                            canParseTag = true;
                            seenAsterisk = false;
                            break;
                        case SyntaxKind.AsteriskToken:
                            if (seenAsterisk) {
                                canParseTag = false;
                            }
                            seenAsterisk = true;
                            break;
                        case SyntaxKind.Identifier:
                            canParseTag = false;
                            break;
                        case SyntaxKind.EndOfFileToken:
                            return false;
                    }
                }
            }

            function tryParseChildTag(target: PropertyLikeParse, indent: number): JSDocTypeTag | JSDocPropertyTag | JSDocParameterTag | JSDocTemplateTag | JSDocThisTag | false {
                Debug.assert(token() === SyntaxKind.AtToken);
                const start = scanner.getTokenFullStart();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName();
                const indentText = skipWhitespaceOrAsterisk();
                let t: PropertyLikeParse;
                switch (tagName.escapedText) {
                    case "type":
                        return target === PropertyLikeParse.Property && parseTypeTag(start, tagName);
                    case "prop":
                    case "property":
                        t = PropertyLikeParse.Property;
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        t = PropertyLikeParse.Parameter | PropertyLikeParse.CallbackParameter;
                        break;
                    case "template":
                        return parseTemplateTag(start, tagName, indent, indentText);
                    case "this":
                        return parseThisTag(start, tagName, indent, indentText);
                    default:
                        return false;
                }
                if (!(target & t)) {
                    return false;
                }
                return parseParameterOrPropertyTag(start, tagName, target, indent);
            }

            function parseTemplateTagTypeParameter() {
                const typeParameterPos = getNodePos();
                const isBracketed = parseOptionalJsdoc(SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }

                const modifiers = parseModifiers(/*allowDecorators*/ false, /*permitConstAsModifier*/ true);
                const name = parseJSDocIdentifierName(Diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces);
                let defaultType: TypeNode | undefined;
                if (isBracketed) {
                    skipWhitespace();
                    parseExpected(SyntaxKind.EqualsToken);
                    defaultType = doInsideOfContext(NodeFlags.JSDoc, parseJSDocType);
                    parseExpected(SyntaxKind.CloseBracketToken);
                }

                if (nodeIsMissing(name)) {
                    return undefined;
                }
                return finishNode(factory.createTypeParameterDeclaration(modifiers, name, /*constraint*/ undefined, defaultType), typeParameterPos);
            }

            function parseTemplateTagTypeParameters() {
                const pos = getNodePos();
                const typeParameters = [];
                do {
                    skipWhitespace();
                    const node = parseTemplateTagTypeParameter();
                    if (node !== undefined) {
                        typeParameters.push(node);
                    }
                    skipWhitespaceOrAsterisk();
                }
                while (parseOptionalJsdoc(SyntaxKind.CommaToken));
                return createNodeArray(typeParameters, pos);
            }

            function parseTemplateTag(start: number, tagName: Identifier, indent: number, indentText: string): JSDocTemplateTag {
                // The template tag looks like one of the following:
                //   @template T,U,V
                //   @template {Constraint} T
                //
                // According to the [closure docs](https://github.com/google/closure-compiler/wiki/Generic-Types#multiple-bounded-template-types):
                //   > Multiple bounded generics cannot be declared on the same line. For the sake of clarity, if multiple templates share the same
                //   > type bound they must be declared on separate lines.
                //
                // TODO: Determine whether we should enforce this in the checker.
                // TODO: Consider moving the `constraint` to the first type parameter as we could then remove `getEffectiveConstraintOfTypeParameter`.
                // TODO: Consider only parsing a single type parameter if there is a constraint.
                const constraint = token() === SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
                const typeParameters = parseTemplateTagTypeParameters();
                return finishNode(factory.createJSDocTemplateTag(tagName, constraint, typeParameters, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseOptionalJsdoc(t: JSDocSyntaxKind): boolean {
                if (token() === t) {
                    nextTokenJSDoc();
                    return true;
                }
                return false;
            }

            function parseJSDocEntityName(): EntityName {
                let entity: EntityName = parseJSDocIdentifierName();
                if (parseOptional(SyntaxKind.OpenBracketToken)) {
                    parseExpected(SyntaxKind.CloseBracketToken);
                    // Note that y[] is accepted as an entity name, but the postfix brackets are not saved for checking.
                    // Technically usejsdoc.org requires them for specifying a property of a type equivalent to Array<{ x: ...}>
                    // but it's not worth it to enforce that restriction.
                }
                while (parseOptional(SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    if (parseOptional(SyntaxKind.OpenBracketToken)) {
                        parseExpected(SyntaxKind.CloseBracketToken);
                    }
                    entity = createQualifiedName(entity, name);
                }
                return entity;
            }

            function parseJSDocIdentifierName(message?: DiagnosticMessage): Identifier {
                if (!tokenIsIdentifierOrKeyword(token())) {
                    return createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ !message, message || Diagnostics.Identifier_expected);
                }

                identifierCount++;
                const start = scanner.getTokenStart();
                const end = scanner.getTokenEnd();
                const originalKeywordKind = token();
                const text = internIdentifier(scanner.getTokenValue());
                const result = finishNode(factoryCreateIdentifier(text, originalKeywordKind), start, end);
                nextTokenJSDoc();
                return result;
            }
        }
    }
}

const incrementallyParsedFiles = new WeakSet<SourceFile>();

function markAsIncrementallyParsed(sourceFile: SourceFile) {
    if (incrementallyParsedFiles.has(sourceFile)) {
        Debug.fail("Source file has already been incrementally parsed");
    }
    incrementallyParsedFiles.add(sourceFile);
}

const intersectingChangeSet = new WeakSet<Node | NodeArray<Node>>();

function intersectsIncrementalChange(node: Node | NodeArray<Node>): boolean {
    return intersectingChangeSet.has(node);
}

function markAsIntersectingIncrementalChange(node: Node | NodeArray<Node>) {
    intersectingChangeSet.add(node);
}

namespace IncrementalParser {
    export function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks: boolean): SourceFile {
        aggressiveChecks = aggressiveChecks || Debug.shouldAssert(AssertionLevel.Aggressive);

        checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
        if (textChangeRangeIsUnchanged(textChangeRange)) {
            // if the text didn't change, then we can just return our current source file as-is.
            return sourceFile;
        }

        if (sourceFile.statements.length === 0) {
            // If we don't have any statements in the current source file, then there's no real
            // way to incrementally parse.  So just do a full parse instead.
            return Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, /*syntaxCursor*/ undefined, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator, sourceFile.jsDocParsingMode);
        }

        // Make sure we're not trying to incrementally update a source file more than once.  Once
        // we do an update the original source file is considered unusable from that point onwards.
        //
        // This is because we do incremental parsing in-place.  i.e. we take nodes from the old
        // tree and give them new positions and parents.  From that point on, trusting the old
        // tree at all is not possible as far too much of it may violate invariants.
        markAsIncrementallyParsed(sourceFile);
        Parser.fixupParentReferences(sourceFile);
        const oldText = sourceFile.text;
        const syntaxCursor = createSyntaxCursor(sourceFile);

        // Make the actual change larger so that we know to reparse anything whose lookahead
        // might have intersected the change.
        const changeRange = extendToAffectedRange(sourceFile, textChangeRange);
        checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);

        // Ensure that extending the affected range only moved the start of the change range
        // earlier in the file.
        Debug.assert(changeRange.span.start <= textChangeRange.span.start);
        Debug.assert(textSpanEnd(changeRange.span) === textSpanEnd(textChangeRange.span));
        Debug.assert(textSpanEnd(textChangeRangeNewSpan(changeRange)) === textSpanEnd(textChangeRangeNewSpan(textChangeRange)));

        // The is the amount the nodes after the edit range need to be adjusted.  It can be
        // positive (if the edit added characters), negative (if the edit deleted characters)
        // or zero (if this was a pure overwrite with nothing added/removed).
        const delta = textChangeRangeNewSpan(changeRange).length - changeRange.span.length;

        // If we added or removed characters during the edit, then we need to go and adjust all
        // the nodes after the edit.  Those nodes may move forward (if we inserted chars) or they
        // may move backward (if we deleted chars).
        //
        // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
        // to reuse are already at the appropriate position in the new text.  That way when we
        // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
        // it very easy to determine if we can reuse a node.  If the node's position is at where
        // we are in the text, then we can reuse it.  Otherwise we can't.  If the node's position
        // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
        // us, then we'll need to skip it or crumble it as appropriate
        //
        // We will also adjust the positions of nodes that intersect the change range as well.
        // By doing this, we ensure that all the positions in the old tree are consistent, not
        // just the positions of nodes entirely before/after the change range.  By being
        // consistent, we can then easily map from positions to nodes in the old tree easily.
        //
        // Also, mark any syntax elements that intersect the changed span.  We know, up front,
        // that we cannot reuse these elements.
        updateTokenPositionsAndMarkElements(sourceFile, changeRange.span.start, textSpanEnd(changeRange.span), textSpanEnd(textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);

        // Now that we've set up our internal incremental state just proceed and parse the
        // source file in the normal fashion.  When possible the parser will retrieve and
        // reuse nodes from the old tree.
        //
        // Note: passing in 'true' for setNodeParents is very important.  When incrementally
        // parsing, we will be reusing nodes from the old tree, and placing it into new
        // parents.  If we don't set the parents now, we'll end up with an observably
        // inconsistent tree.  Setting the parents on the new tree should be very fast.  We
        // will immediately bail out of walking any subtrees when we can see that their parents
        // are already correct.
        const result = Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator, sourceFile.jsDocParsingMode);
        result.commentDirectives = getNewCommentDirectives(
            sourceFile.commentDirectives,
            result.commentDirectives,
            changeRange.span.start,
            textSpanEnd(changeRange.span),
            delta,
            oldText,
            newText,
            aggressiveChecks,
        );
        result.impliedNodeFormat = sourceFile.impliedNodeFormat;
        transferSourceFileChildren(sourceFile, result);
        return result;
    }

    function getNewCommentDirectives(
        oldDirectives: CommentDirective[] | undefined,
        newDirectives: CommentDirective[] | undefined,
        changeStart: number,
        changeRangeOldEnd: number,
        delta: number,
        oldText: string,
        newText: string,
        aggressiveChecks: boolean,
    ): CommentDirective[] | undefined {
        if (!oldDirectives) return newDirectives;
        let commentDirectives: CommentDirective[] | undefined;
        let addedNewlyScannedDirectives = false;
        for (const directive of oldDirectives) {
            const { range, type } = directive;
            // Range before the change
            if (range.end < changeStart) {
                commentDirectives = append(commentDirectives, directive);
            }
            else if (range.pos > changeRangeOldEnd) {
                addNewlyScannedDirectives();
                // Node is entirely past the change range.  We need to move both its pos and
                // end, forward or backward appropriately.
                const updatedDirective: CommentDirective = {
                    range: { pos: range.pos + delta, end: range.end + delta },
                    type,
                };
                commentDirectives = append(commentDirectives, updatedDirective);
                if (aggressiveChecks) {
                    Debug.assert(oldText.substring(range.pos, range.end) === newText.substring(updatedDirective.range.pos, updatedDirective.range.end));
                }
            }
            // Ignore ranges that fall in change range
        }
        addNewlyScannedDirectives();
        return commentDirectives;

        function addNewlyScannedDirectives() {
            if (addedNewlyScannedDirectives) return;
            addedNewlyScannedDirectives = true;
            if (!commentDirectives) {
                commentDirectives = newDirectives;
            }
            else if (newDirectives) {
                commentDirectives.push(...newDirectives);
            }
        }
    }

    function moveElementEntirelyPastChangeRange(element: Node, origSourceFile: SourceFile, isArray: false, delta: number, oldText: string, newText: string, aggressiveChecks: boolean): void;
    function moveElementEntirelyPastChangeRange(element: NodeArray<Node>, origSourceFile: SourceFile, isArray: true, delta: number, oldText: string, newText: string, aggressiveChecks: boolean): void;
    function moveElementEntirelyPastChangeRange(element: Node | NodeArray<Node>, origSourceFile: SourceFile, isArray: boolean, delta: number, oldText: string, newText: string, aggressiveChecks: boolean) {
        if (isArray) {
            visitArray(element as NodeArray<Node>);
        }
        else {
            visitNode(element as Node);
        }
        return;

        function visitNode(node: Node) {
            let text = "";
            if (aggressiveChecks && shouldCheckNode(node)) {
                text = oldText.substring(node.pos, node.end);
            }

            // Ditch any existing LS children we may have created.  This way we can avoid
            // moving them forward.
            unsetNodeChildren(node, origSourceFile);

            setTextRangePosEnd(node, node.pos + delta, node.end + delta);

            if (aggressiveChecks && shouldCheckNode(node)) {
                Debug.assert(text === newText.substring(node.pos, node.end));
            }

            forEachChild(node, visitNode as (node: Node) => void, visitArray as (nodes: NodeArray<Node>) => void);
            if (hasJSDocNodes(node)) {
                for (const jsDocComment of node.jsDoc!) {
                    visitNode(jsDocComment);
                }
            }
            checkNodePositions(node, aggressiveChecks);
        }

        function visitArray(array: NodeArray<Node>) {
            setTextRangePosEnd(array, array.pos + delta, array.end + delta);

            for (const node of array) {
                visitNode(node);
            }
        }
    }

    function shouldCheckNode(node: Node) {
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.Identifier:
                return true;
        }

        return false;
    }

    function adjustIntersectingElement(element: Node | NodeArray<Node>, changeStart: number, changeRangeOldEnd: number, changeRangeNewEnd: number, delta: number) {
        Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
        Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
        Debug.assert(element.pos <= element.end);

        // We have an element that intersects the change range in some way.  It may have its
        // start, or its end (or both) in the changed range.  We want to adjust any part
        // that intersects such that the final tree is in a consistent state.  i.e. all
        // children have spans within the span of their parent, and all siblings are ordered
        // properly.

        // We may need to update both the 'pos' and the 'end' of the element.

        // If the 'pos' is before the start of the change, then we don't need to touch it.
        // If it isn't, then the 'pos' must be inside the change.  How we update it will
        // depend if delta is positive or negative. If delta is positive then we have
        // something like:
        //
        //  -------------------AAA-----------------
        //  -------------------BBBCCCCCCC-----------------
        //
        // In this case, we consider any node that started in the change range to still be
        // starting at the same position.
        //
        // however, if the delta is negative, then we instead have something like this:
        //
        //  -------------------XXXYYYYYYY-----------------
        //  -------------------ZZZ-----------------
        //
        // In this case, any element that started in the 'X' range will keep its position.
        // However any element that started after that will have their pos adjusted to be
        // at the end of the new range.  i.e. any node that started in the 'Y' range will
        // be adjusted to have their start at the end of the 'Z' range.
        //
        // The element will keep its position if possible.  Or Move backward to the new-end
        // if it's in the 'Y' range.
        const pos = Math.min(element.pos, changeRangeNewEnd);

        // If the 'end' is after the change range, then we always adjust it by the delta
        // amount.  However, if the end is in the change range, then how we adjust it
        // will depend on if delta is positive or negative.  If delta is positive then we
        // have something like:
        //
        //  -------------------AAA-----------------
        //  -------------------BBBCCCCCCC-----------------
        //
        // In this case, we consider any node that ended inside the change range to keep its
        // end position.
        //
        // however, if the delta is negative, then we instead have something like this:
        //
        //  -------------------XXXYYYYYYY-----------------
        //  -------------------ZZZ-----------------
        //
        // In this case, any element that ended in the 'X' range will keep its position.
        // However any element that ended after that will have their pos adjusted to be
        // at the end of the new range.  i.e. any node that ended in the 'Y' range will
        // be adjusted to have their end at the end of the 'Z' range.
        const end = element.end >= changeRangeOldEnd ?
            // Element ends after the change range.  Always adjust the end pos.
            element.end + delta :
            // Element ends in the change range.  The element will keep its position if
            // possible. Or Move backward to the new-end if it's in the 'Y' range.
            Math.min(element.end, changeRangeNewEnd);

        Debug.assert(pos <= end);
        if ((element as any).parent) {
            const parent = (element as any).parent as Node;
            Debug.assertGreaterThanOrEqual(pos, parent.pos);
            Debug.assertLessThanOrEqual(end, parent.end);
        }

        setTextRangePosEnd(element, pos, end);
    }

    function checkNodePositions(node: Node, aggressiveChecks: boolean) {
        if (aggressiveChecks) {
            let pos = node.pos;
            const visitNode = (child: Node) => {
                Debug.assert(child.pos >= pos);
                pos = child.end;
            };
            if (hasJSDocNodes(node)) {
                for (const jsDocComment of node.jsDoc!) {
                    visitNode(jsDocComment);
                }
            }
            forEachChild(node, visitNode);
            Debug.assert(pos <= node.end);
        }
    }

    function updateTokenPositionsAndMarkElements(
        sourceFile: SourceFile,
        changeStart: number,
        changeRangeOldEnd: number,
        changeRangeNewEnd: number,
        delta: number,
        oldText: string,
        newText: string,
        aggressiveChecks: boolean,
    ): void {
        visitNode(sourceFile);
        return;

        function visitNode(child: Node) {
            Debug.assert(child.pos <= child.end);
            if (child.pos > changeRangeOldEnd) {
                // Node is entirely past the change range.  We need to move both its pos and
                // end, forward or backward appropriately.
                moveElementEntirelyPastChangeRange(child, sourceFile, /*isArray*/ false, delta, oldText, newText, aggressiveChecks);
                return;
            }

            // Check if the element intersects the change range.  If it does, then it is not
            // reusable.  Also, we'll need to recurse to see what constituent portions we may
            // be able to use.
            const fullEnd = child.end;
            if (fullEnd >= changeStart) {
                markAsIntersectingIncrementalChange(child);
                unsetNodeChildren(child, sourceFile);

                // Adjust the pos or end (or both) of the intersecting element accordingly.
                adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                forEachChild(child, visitNode as (node: Node) => void, visitArray as (nodes: NodeArray<Node>) => void);
                if (hasJSDocNodes(child)) {
                    for (const jsDocComment of child.jsDoc!) {
                        visitNode(jsDocComment);
                    }
                }
                checkNodePositions(child, aggressiveChecks);
                return;
            }

            // Otherwise, the node is entirely before the change range.  No need to do anything with it.
            Debug.assert(fullEnd < changeStart);
        }

        function visitArray(array: NodeArray<Node>) {
            Debug.assert(array.pos <= array.end);
            if (array.pos > changeRangeOldEnd) {
                // Array is entirely after the change range.  We need to move it, and move any of
                // its children.
                moveElementEntirelyPastChangeRange(array, sourceFile, /*isArray*/ true, delta, oldText, newText, aggressiveChecks);
                return;
            }

            // Check if the element intersects the change range.  If it does, then it is not
            // reusable.  Also, we'll need to recurse to see what constituent portions we may
            // be able to use.
            const fullEnd = array.end;
            if (fullEnd >= changeStart) {
                markAsIntersectingIncrementalChange(array);

                // Adjust the pos or end (or both) of the intersecting array accordingly.
                adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                for (const node of array) {
                    visitNode(node);
                }
                return;
            }

            // Otherwise, the array is entirely before the change range.  No need to do anything with it.
            Debug.assert(fullEnd < changeStart);
        }
    }

    function extendToAffectedRange(sourceFile: SourceFile, changeRange: TextChangeRange): TextChangeRange {
        // Consider the following code:
        //      void foo() { /; }
        //
        // If the text changes with an insertion of / just before the semicolon then we end up with:
        //      void foo() { //; }
        //
        // If we were to just use the changeRange a is, then we would not rescan the { token
        // (as it does not intersect the actual original change range).  Because an edit may
        // change the token touching it, we actually need to look back *at least* one token so
        // that the prior token sees that change.
        const maxLookahead = 1;

        let start = changeRange.span.start;

        // the first iteration aligns us with the change start. subsequent iteration move us to
        // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
        // start of the tree.
        for (let i = 0; start > 0 && i <= maxLookahead; i++) {
            const nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
            Debug.assert(nearestNode.pos <= start);
            const position = nearestNode.pos;

            start = Math.max(0, position - 1);
        }

        const finalSpan = createTextSpanFromBounds(start, textSpanEnd(changeRange.span));
        const finalLength = changeRange.newLength + (changeRange.span.start - start);

        return createTextChangeRange(finalSpan, finalLength);
    }

    function findNearestNodeStartingBeforeOrAtPosition(sourceFile: SourceFile, position: number): Node {
        let bestResult: Node = sourceFile;
        let lastNodeEntirelyBeforePosition: Node | undefined;

        forEachChild(sourceFile, visit);

        if (lastNodeEntirelyBeforePosition) {
            const lastChildOfLastEntireNodeBeforePosition = getLastDescendant(lastNodeEntirelyBeforePosition);
            if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
                bestResult = lastChildOfLastEntireNodeBeforePosition;
            }
        }

        return bestResult;

        function getLastDescendant(node: Node): Node {
            while (true) {
                const lastChild = getLastChild(node);
                if (lastChild) {
                    node = lastChild;
                }
                else {
                    return node;
                }
            }
        }

        function visit(child: Node) {
            if (nodeIsMissing(child)) {
                // Missing nodes are effectively invisible to us.  We never even consider them
                // When trying to find the nearest node before us.
                return;
            }

            // If the child intersects this position, then this node is currently the nearest
            // node that starts before the position.
            if (child.pos <= position) {
                if (child.pos >= bestResult.pos) {
                    // This node starts before the position, and is closer to the position than
                    // the previous best node we found.  It is now the new best node.
                    bestResult = child;
                }

                // Now, the node may overlap the position, or it may end entirely before the
                // position.  If it overlaps with the position, then either it, or one of its
                // children must be the nearest node before the position.  So we can just
                // recurse into this child to see if we can find something better.
                if (position < child.end) {
                    // The nearest node is either this child, or one of the children inside
                    // of it.  We've already marked this child as the best so far.  Recurse
                    // in case one of the children is better.
                    forEachChild(child, visit);

                    // Once we look at the children of this node, then there's no need to
                    // continue any further.
                    return true;
                }
                else {
                    Debug.assert(child.end <= position);
                    // The child ends entirely before this position.  Say you have the following
                    // (where $ is the position)
                    //
                    //      <complex expr 1> ? <complex expr 2> $ : <...> <...>
                    //
                    // We would want to find the nearest preceding node in "complex expr 2".
                    // To support that, we keep track of this node, and once we're done searching
                    // for a best node, we recurse down this node to see if we can find a good
                    // result in it.
                    //
                    // This approach allows us to quickly skip over nodes that are entirely
                    // before the position, while still allowing us to find any nodes in the
                    // last one that might be what we want.
                    lastNodeEntirelyBeforePosition = child;
                }
            }
            else {
                Debug.assert(child.pos > position);
                // We're now at a node that is entirely past the position we're searching for.
                // This node (and all following nodes) could never contribute to the result,
                // so just skip them by returning 'true' here.
                return true;
            }
        }
    }

    function checkChangeRange(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks: boolean) {
        const oldText = sourceFile.text;
        if (textChangeRange) {
            Debug.assert((oldText.length - textChangeRange.span.length + textChangeRange.newLength) === newText.length);

            if (aggressiveChecks || Debug.shouldAssert(AssertionLevel.VeryAggressive)) {
                const oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
                const newTextPrefix = newText.substr(0, textChangeRange.span.start);
                Debug.assert(oldTextPrefix === newTextPrefix);

                const oldTextSuffix = oldText.substring(textSpanEnd(textChangeRange.span), oldText.length);
                const newTextSuffix = newText.substring(textSpanEnd(textChangeRangeNewSpan(textChangeRange)), newText.length);
                Debug.assert(oldTextSuffix === newTextSuffix);
            }
        }
    }

    // Allows finding nodes in the source file at a certain position in an efficient manner.
    // The implementation takes advantage of the calling pattern it knows the parser will
    // make in order to optimize finding nodes as quickly as possible.
    export interface SyntaxCursor {
        currentNode(position: number): Node;
    }

    export function createSyntaxCursor(sourceFile: SourceFile): SyntaxCursor {
        let currentArray: NodeArray<Node> = sourceFile.statements;
        let currentArrayIndex = 0;

        Debug.assert(currentArrayIndex < currentArray.length);
        let current = currentArray[currentArrayIndex];
        let lastQueriedPosition = InvalidPosition.Value;

        return {
            currentNode(position: number) {
                // Only compute the current node if the position is different than the last time
                // we were asked.  The parser commonly asks for the node at the same position
                // twice.  Once to know if can read an appropriate list element at a certain point,
                // and then to actually read and consume the node.
                if (position !== lastQueriedPosition) {
                    // Much of the time the parser will need the very next node in the array that
                    // we just returned a node from.So just simply check for that case and move
                    // forward in the array instead of searching for the node again.
                    if (current && current.end === position && currentArrayIndex < (currentArray.length - 1)) {
                        currentArrayIndex++;
                        current = currentArray[currentArrayIndex];
                    }

                    // If we don't have a node, or the node we have isn't in the right position,
                    // then try to find a viable node at the position requested.
                    if (!current || current.pos !== position) {
                        findHighestListElementThatStartsAtPosition(position);
                    }
                }

                // Cache this query so that we don't do any extra work if the parser calls back
                // into us.  Note: this is very common as the parser will make pairs of calls like
                // 'isListElement -> parseListElement'.  If we were unable to find a node when
                // called with 'isListElement', we don't want to redo the work when parseListElement
                // is called immediately after.
                lastQueriedPosition = position;

                // Either we don'd have a node, or we have a node at the position being asked for.
                Debug.assert(!current || current.pos === position);
                return current;
            },
        };

        // Finds the highest element in the tree we can find that starts at the provided position.
        // The element must be a direct child of some node list in the tree.  This way after we
        // return it, we can easily return its next sibling in the list.
        function findHighestListElementThatStartsAtPosition(position: number) {
            // Clear out any cached state about the last node we found.
            currentArray = undefined!;
            currentArrayIndex = InvalidPosition.Value;
            current = undefined!;

            // Recurse into the source file to find the highest node at this position.
            forEachChild(sourceFile, visitNode, visitArray);
            return;

            function visitNode(node: Node) {
                if (position >= node.pos && position < node.end) {
                    // Position was within this node.  Keep searching deeper to find the node.
                    forEachChild(node, visitNode, visitArray);

                    // don't proceed any further in the search.
                    return true;
                }

                // position wasn't in this node, have to keep searching.
                return false;
            }

            function visitArray(array: NodeArray<Node>) {
                if (position >= array.pos && position < array.end) {
                    // position was in this array.  Search through this array to see if we find a
                    // viable element.
                    for (let i = 0; i < array.length; i++) {
                        const child = array[i];
                        if (child) {
                            if (child.pos === position) {
                                // Found the right node.  We're done.
                                currentArray = array;
                                currentArrayIndex = i;
                                current = child;
                                return true;
                            }
                            else {
                                if (child.pos < position && position < child.end) {
                                    // Position in somewhere within this child.  Search in it and
                                    // stop searching in this array.
                                    forEachChild(child, visitNode, visitArray);
                                    return true;
                                }
                            }
                        }
                    }
                }

                // position wasn't in this array, have to keep searching.
                return false;
            }
        }
    }

    const enum InvalidPosition {
        Value = -1,
    }
}

/** @internal */
export function isDeclarationFileName(fileName: string): boolean {
    return getDeclarationFileExtension(fileName) !== undefined;
}

/** @internal */
export function getDeclarationFileExtension(fileName: string): string | undefined {
    const standardExtension = getAnyExtensionFromPath(fileName, supportedDeclarationExtensions, /*ignoreCase*/ false);
    if (standardExtension) {
        return standardExtension;
    }
    if (fileExtensionIs(fileName, Extension.Ts)) {
        const baseName = getBaseFileName(fileName);
        const index = baseName.lastIndexOf(".d.");
        if (index >= 0) {
            return baseName.substring(index);
        }
    }
    return undefined;
}

function parseResolutionMode(mode: string | undefined, pos: number, end: number, reportDiagnostic: PragmaDiagnosticReporter): ResolutionMode {
    if (!mode) {
        return undefined;
    }
    if (mode === "import") {
        return ModuleKind.ESNext;
    }
    if (mode === "require") {
        return ModuleKind.CommonJS;
    }
    reportDiagnostic(pos, end - pos, Diagnostics.resolution_mode_should_be_either_require_or_import);
    return undefined;
}

/** @internal */
export function processCommentPragmas(context: PragmaContext, sourceText: string): void {
    const pragmas: PragmaPseudoMapEntry[] = [];

    for (const range of getLeadingCommentRanges(sourceText, 0) || emptyArray) {
        const comment = sourceText.substring(range.pos, range.end);
        extractPragmas(pragmas, range, comment);
    }

    context.pragmas = new Map() as PragmaMap;
    for (const pragma of pragmas) {
        if (context.pragmas.has(pragma.name)) {
            const currentValue = context.pragmas.get(pragma.name);
            if (currentValue instanceof Array) {
                currentValue.push(pragma.args);
            }
            else {
                context.pragmas.set(pragma.name, [currentValue, pragma.args]);
            }
            continue;
        }
        context.pragmas.set(pragma.name, pragma.args);
    }
}

/** @internal */
export type PragmaDiagnosticReporter = (pos: number, length: number, message: DiagnosticMessage) => void;

/** @internal */
export function processPragmasIntoFields(context: PragmaContext, reportDiagnostic: PragmaDiagnosticReporter): void {
    context.checkJsDirective = undefined;
    context.referencedFiles = [];
    context.typeReferenceDirectives = [];
    context.libReferenceDirectives = [];
    context.amdDependencies = [];
    context.hasNoDefaultLib = false;
    context.pragmas!.forEach((entryOrList, key) => { // TODO: GH#18217
        // TODO: The below should be strongly type-guarded and not need casts/explicit annotations, since entryOrList is related to
        // key and key is constrained to a union; but it's not (see GH#21483 for at least partial fix) :(
        switch (key) {
            case "reference": {
                const referencedFiles = context.referencedFiles;
                const typeReferenceDirectives = context.typeReferenceDirectives;
                const libReferenceDirectives = context.libReferenceDirectives;
                forEach(toArray(entryOrList) as PragmaPseudoMap["reference"][], arg => {
                    const { types, lib, path, ["resolution-mode"]: res, preserve: _preserve } = arg.arguments;
                    const preserve = _preserve === "true" ? true : undefined;
                    if (arg.arguments["no-default-lib"] === "true") {
                        context.hasNoDefaultLib = true;
                    }
                    else if (types) {
                        const parsed = parseResolutionMode(res, types.pos, types.end, reportDiagnostic);
                        typeReferenceDirectives.push({ pos: types.pos, end: types.end, fileName: types.value, ...(parsed ? { resolutionMode: parsed } : {}), ...(preserve ? { preserve } : {}) });
                    }
                    else if (lib) {
                        libReferenceDirectives.push({ pos: lib.pos, end: lib.end, fileName: lib.value, ...(preserve ? { preserve } : {}) });
                    }
                    else if (path) {
                        referencedFiles.push({ pos: path.pos, end: path.end, fileName: path.value, ...(preserve ? { preserve } : {}) });
                    }
                    else {
                        reportDiagnostic(arg.range.pos, arg.range.end - arg.range.pos, Diagnostics.Invalid_reference_directive_syntax);
                    }
                });
                break;
            }
            case "amd-dependency": {
                context.amdDependencies = map(
                    toArray(entryOrList) as PragmaPseudoMap["amd-dependency"][],
                    x => ({ name: x.arguments.name, path: x.arguments.path }),
                );
                break;
            }
            case "amd-module": {
                if (entryOrList instanceof Array) {
                    for (const entry of entryOrList) {
                        if (context.moduleName) {
                            // TODO: It's probably fine to issue this diagnostic on all instances of the pragma
                            reportDiagnostic(entry.range.pos, entry.range.end - entry.range.pos, Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments);
                        }
                        context.moduleName = (entry as PragmaPseudoMap["amd-module"]).arguments.name;
                    }
                }
                else {
                    context.moduleName = (entryOrList as PragmaPseudoMap["amd-module"]).arguments.name;
                }
                break;
            }
            case "ts-nocheck":
            case "ts-check": {
                // _last_ of either nocheck or check in a file is the "winner"
                forEach(toArray(entryOrList), entry => {
                    if (!context.checkJsDirective || entry.range.pos > context.checkJsDirective.pos) {
                        context.checkJsDirective = {
                            enabled: key === "ts-check",
                            end: entry.range.end,
                            pos: entry.range.pos,
                        };
                    }
                });
                break;
            }
            case "jsx":
            case "jsxfrag":
            case "jsximportsource":
            case "jsxruntime":
                return; // Accessed directly
            default:
                Debug.fail("Unhandled pragma kind"); // Can this be made into an assertNever in the future?
        }
    });
}

const namedArgRegExCache = new Map<string, RegExp>();
function getNamedArgRegEx(name: string): RegExp {
    if (namedArgRegExCache.has(name)) {
        return namedArgRegExCache.get(name)!;
    }
    const result = new RegExp(`(\\s${name}\\s*=\\s*)(?:(?:'([^']*)')|(?:"([^"]*)"))`, "im");
    namedArgRegExCache.set(name, result);
    return result;
}

const tripleSlashXMLCommentStartRegEx = /^\/\/\/\s*<(\S+)\s.*?\/>/m;
const singleLinePragmaRegEx = /^\/\/\/?\s*@([^\s:]+)((?:[^\S\r\n]|:).*)?$/m;
function extractPragmas(pragmas: PragmaPseudoMapEntry[], range: CommentRange, text: string) {
    const tripleSlash = range.kind === SyntaxKind.SingleLineCommentTrivia && tripleSlashXMLCommentStartRegEx.exec(text);
    if (tripleSlash) {
        const name = tripleSlash[1].toLowerCase() as keyof PragmaPseudoMap; // Technically unsafe cast, but we do it so the below check to make it safe typechecks
        const pragma = commentPragmas[name] as PragmaDefinition;
        if (!pragma || !(pragma.kind! & PragmaKindFlags.TripleSlashXML)) {
            return;
        }
        if (pragma.args) {
            const argument: { [index: string]: string | { value: string; pos: number; end: number; }; } = {};
            for (const arg of pragma.args) {
                const matcher = getNamedArgRegEx(arg.name);
                const matchResult = matcher.exec(text);
                if (!matchResult && !arg.optional) {
                    return; // Missing required argument, don't parse
                }
                else if (matchResult) {
                    const value = matchResult[2] || matchResult[3];
                    if (arg.captureSpan) {
                        const startPos = range.pos + matchResult.index + matchResult[1].length + 1;
                        argument[arg.name] = {
                            value,
                            pos: startPos,
                            end: startPos + value.length,
                        };
                    }
                    else {
                        argument[arg.name] = value;
                    }
                }
            }
            pragmas.push({ name, args: { arguments: argument, range } } as PragmaPseudoMapEntry);
        }
        else {
            pragmas.push({ name, args: { arguments: {}, range } } as PragmaPseudoMapEntry);
        }
        return;
    }

    const singleLine = range.kind === SyntaxKind.SingleLineCommentTrivia && singleLinePragmaRegEx.exec(text);
    if (singleLine) {
        return addPragmaForMatch(pragmas, range, PragmaKindFlags.SingleLine, singleLine);
    }

    if (range.kind === SyntaxKind.MultiLineCommentTrivia) {
        const multiLinePragmaRegEx = /@(\S+)(\s+(?:\S.*)?)?$/gm; // Defined inline since it uses the "g" flag, which keeps a persistent index (for iterating)
        let multiLineMatch: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
        while (multiLineMatch = multiLinePragmaRegEx.exec(text)) {
            addPragmaForMatch(pragmas, range, PragmaKindFlags.MultiLine, multiLineMatch);
        }
    }
}

function addPragmaForMatch(pragmas: PragmaPseudoMapEntry[], range: CommentRange, kind: PragmaKindFlags, match: RegExpExecArray) {
    if (!match) return;
    const name = match[1].toLowerCase() as keyof PragmaPseudoMap; // Technically unsafe cast, but we do it so they below check to make it safe typechecks
    const pragma = commentPragmas[name] as PragmaDefinition;
    if (!pragma || !(pragma.kind! & kind)) {
        return;
    }
    const args = match[2]; // Split on spaces and match up positionally with definition
    const argument = getNamedPragmaArguments(pragma, args);
    if (argument === "fail") return; // Missing required argument, fail to parse it
    pragmas.push({ name, args: { arguments: argument, range } } as PragmaPseudoMapEntry);
    return;
}

function getNamedPragmaArguments(pragma: PragmaDefinition, text: string | undefined): { [index: string]: string; } | "fail" {
    if (!text) return {};
    if (!pragma.args) return {};
    const args = text.trim().split(/\s+/);
    const argMap: { [index: string]: string; } = {};
    for (let i = 0; i < pragma.args.length; i++) {
        const argument = pragma.args[i];
        if (!args[i] && !argument.optional) {
            return "fail";
        }
        if (argument.captureSpan) {
            return Debug.fail("Capture spans not yet implemented for non-xml pragmas");
        }
        argMap[argument.name] = args[i];
    }
    return argMap;
}

/** @internal */
export function tagNamesAreEquivalent(lhs: JsxTagNameExpression, rhs: JsxTagNameExpression): boolean {
    if (lhs.kind !== rhs.kind) {
        return false;
    }

    if (lhs.kind === SyntaxKind.Identifier) {
        return lhs.escapedText === (rhs as Identifier).escapedText;
    }

    if (lhs.kind === SyntaxKind.ThisKeyword) {
        return true;
    }

    if (lhs.kind === SyntaxKind.JsxNamespacedName) {
        return lhs.namespace.escapedText === (rhs as JsxNamespacedName).namespace.escapedText &&
            lhs.name.escapedText === (rhs as JsxNamespacedName).name.escapedText;
    }

    // If we are at this statement then we must have PropertyAccessExpression and because tag name in Jsx element can only
    // take forms of JsxTagNameExpression which includes an identifier, "this" expression, or another propertyAccessExpression
    // it is safe to case the expression property as such. See parseJsxElementName for how we parse tag name in Jsx element
    return (lhs as PropertyAccessExpression).name.escapedText === (rhs as PropertyAccessExpression).name.escapedText &&
        tagNamesAreEquivalent((lhs as PropertyAccessExpression).expression as JsxTagNameExpression, (rhs as PropertyAccessExpression).expression as JsxTagNameExpression);
}
