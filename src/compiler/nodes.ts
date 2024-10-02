/* eslint-disable @typescript-eslint/naming-convention */
import {
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AstTokenData,
    AwaitExpression,
    BigIntLiteral,
    BinaryExpression,
    BindingElement,
    Block,
    BreakStatement,
    Bundle,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CatchClause,
    ClassDeclaration,
    ClassExpression,
    ClassStaticBlockDeclaration,
    CommaListExpression,
    ComputedPropertyName,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    ContinueStatement,
    DebuggerStatement,
    Decorator,
    DefaultClause,
    DeleteExpression,
    DoStatement,
    ElementAccessExpression,
    EmptyStatement,
    EndOfFileToken,
    EnumDeclaration,
    EnumMember,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    FalseLiteral,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GetAccessorDeclaration,
    HasAsteriskToken,
    HasBody,
    HasComment,
    HasElements,
    HasEndFlowNode,
    HasExclamationToken,
    HasExpression,
    HasInitializer,
    HasIsTypeOnly,
    HasJSDoc,
    HasLocals,
    HasMembers,
    HasName,
    HasParameters,
    HasQuestionDotToken,
    HasQuestionToken,
    HasStatement,
    HasStatements,
    HasSymbol,
    HasTagName,
    HasText,
    HasType,
    HasTypeParameters,
    HasTypes,
    HeritageClause,
    Identifier,
    IfStatement,
    ImportAttribute,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportExpression,
    ImportSpecifier,
    ImportTypeAssertionContainer,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    InternalHasTypeArguments,
    IntersectionTypeNode,
    IsFunctionLike,
    JSDoc,
    JSDocAllType,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassTag,
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
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
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
    JsxAttributes,
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
    JsxText,
    LabeledStatement,
    LiteralTypeNode,
    MappedTypeNode,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MissingDeclaration,
    ModuleBlock,
    ModuleDeclaration,
    NamedExports,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NonNullExpression,
    NoSubstitutionTemplateLiteral,
    NotEmittedStatement,
    NotEmittedTypeElement,
    NullLiteral,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    OmittedExpression,
    OptionalTypeNode,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    RegularExpressionLiteral,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    SemicolonClassElement,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    StringLiteral,
    SuperExpression,
    SwitchStatement,
    SyntaxKind,
    SyntaxList,
    SyntheticExpression,
    SyntheticReferenceExpression,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateHead, TemplateLiteralTypeNode, TemplateLiteralTypeSpan, TemplateMiddle, TemplateSpan, TemplateTail,
    ThisExpression,
    ThisTypeNode,
    ThrowStatement,
    Token,
    TrueLiteral,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertionExpression,
    TypeLiteralNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression
} from "./_namespaces/ts.js";

{
    type _ = [
        __Expect<IsFunctionLike, Extract<Nodes, { _signatureDeclarationBrand: any }>>,
        __Expect<Extract<Nodes, { _signatureDeclarationBrand: any }>, IsFunctionLike>,
    ];
}

{
    type _ = [
        __Expect<HasLocals, Extract<Nodes, { _localsContainerBrand: any }>>,
        __Expect<Extract<Nodes, { _localsContainerBrand: any }>, HasLocals>,
    ];
}

{
    type _ = [
        __Expect<HasName, Extract<Nodes, { name: any }>>,
        __Expect<Extract<Nodes, { name: any }>, HasName>,
    ];
}

{
    type _ = [
        __Expect<HasJSDoc, Extract<Nodes, { jsDoc: any }>>,
        __Expect<Extract<Nodes, { jsDoc: any }>, HasJSDoc>,
    ];
}

{
    type _ = [
        __Expect<HasExpression, Extract<Nodes, { expression: any }>>,
        __Expect<Extract<Nodes, { expression: any }>, HasExpression>,
    ];
}

{
    type _ = [
        __Expect<HasInitializer, Extract<Nodes, { initializer: any }>>,
        __Expect<Extract<Nodes, { initializer: any }>, HasInitializer>,
    ];
    type __ = Exclude<Extract<Nodes, { initializer: any }>, HasInitializer>;
}

{
    type _ = [
        __Expect<HasText, Extract<Nodes, { text: any, escapedText?: never }>>,
        __Expect<Extract<Nodes, { text: any, escapedText?: never }>, HasText>,
    ];
    type __ = Exclude<Extract<Nodes, { text: any, escapedText?: never }>, HasText>;
}

{
    type _ = [
        __Expect<HasSymbol, Exclude<Extract<Nodes, { symbol: any }>, { symbol: never }>>,
        __Expect<Exclude<Extract<Nodes, { symbol: any }>, { symbol: never }>, HasSymbol>,
    ];
    type __ = Exclude<Exclude<Extract<Nodes, { symbol: any }>, { symbol: never }>, HasSymbol>;
}

{
    type _ = [
        __Expect<HasType, Extract<Nodes, { type: Node | undefined }>>,
        __Expect<Extract<Nodes, { type: Node | undefined }>, HasType>,
    ];
    type __ = Exclude<Extract<Nodes, { type: Node | undefined }>, HasType>;
}

{
    type _ = [
        __Expect<HasLocals, Extract<Nodes, { locals: any }>>,
        __Expect<Extract<Nodes, { locals: any }>, HasLocals>,
    ];
    type __ = Exclude<Extract<Nodes, { locals: any }>, HasLocals>;
}

{
    type _ = [
        __Expect<HasTypeParameters, Extract<Nodes, { typeParameters: any }>>,
        __Expect<Extract<Nodes, { typeParameters: any }>, HasTypeParameters>,
    ];
    type __ = Exclude<Extract<Nodes, { typeParameters: any }>, HasTypeParameters>;
}

{
    type _ = [
        __Expect<HasParameters, Extract<Nodes, { parameters: any }>>,
        __Expect<Extract<Nodes, { parameters: any }>, HasParameters>,
    ];
    type __ = Exclude<Extract<Nodes, { parameters: any }>, HasParameters>;
}

{
    type _ = [
        __Expect<HasBody, Extract<Nodes, { body: any }>>,
        __Expect<Extract<Nodes, { body: any }>, HasBody>,
    ];
    type __ = Exclude<Extract<Nodes, { body: any }>, HasBody>;
}

{
    type _ = [
        __Expect<HasQuestionToken, Extract<Nodes, { questionToken: any }>>,
        __Expect<Extract<Nodes, { questionToken: any }>, HasQuestionToken>,
    ];
    type __ = Exclude<Extract<Nodes, { questionToken: any }>, HasQuestionToken>;
}

{
    type _ = [
        __Expect<HasEndFlowNode, Extract<Nodes, { endFlowNode: any }>>,
        __Expect<Extract<Nodes, { endFlowNode: any }>, HasEndFlowNode>,
    ];
    type __ = Exclude<Extract<Nodes, { endFlowNode: any }>, HasEndFlowNode>;
}

{
    type _ = [
        __Expect<InternalHasTypeArguments, Extract<Nodes, { typeArguments: any }>>,
        __Expect<Extract<Nodes, { typeArguments: any }>, InternalHasTypeArguments>,
    ];
    type __ = Exclude<Extract<Nodes, { typeArguments: any }>, InternalHasTypeArguments>;
}

{
    type _ = [
        __Expect<HasElements, Extract<Nodes, { elements: any }>>,
        __Expect<Extract<Nodes, { elements: any }>, HasElements>,
    ];
    type __ = Exclude<Extract<Nodes, { elements: any }>, HasElements>;
}

{
    type _ = [
        __Expect<HasMembers, Extract<Nodes, { members: any }>>,
        __Expect<Extract<Nodes, { members: any }>, HasMembers>,
    ];
    type __ = Exclude<Extract<Nodes, { members: any }>, HasMembers>;
}

{
    type _ = [
        __Expect<HasStatement, Extract<Nodes, { statement: any }>>,
        __Expect<Extract<Nodes, { statement: any }>, HasStatement>,
    ];
    type __ = Exclude<Extract<Nodes, { statement: any }>, HasStatement>;
}

{
    type _ = [
        __Expect<HasStatements, Extract<Nodes, { statements: any }>>,
        __Expect<Extract<Nodes, { statements: any }>, HasStatements>,
    ];
    type __ = Exclude<Extract<Nodes, { statements: any }>, HasStatements>;
}

{
    type _ = [
        __Expect<HasExclamationToken, Extract<Nodes, { exclamationToken: any }>>,
        __Expect<Extract<Nodes, { exclamationToken: any }>, HasExclamationToken>,
    ];
    type __ = Exclude<Extract<Nodes, { exclamationToken: any }>, HasExclamationToken>;
}

{
    type _ = [
        __Expect<HasAsteriskToken, Extract<Nodes, { asteriskToken: any }>>,
        __Expect<Extract<Nodes, { asteriskToken: any }>, HasAsteriskToken>,
    ];
    type __ = Exclude<Extract<Nodes, { asteriskToken: any }>, HasAsteriskToken>;
}

{
    type _ = [
        __Expect<HasQuestionDotToken, Extract<Nodes, { questionDotToken: any }>>,
        __Expect<Extract<Nodes, { questionDotToken: any }>, HasQuestionDotToken>,
    ];
    type __ = Exclude<Extract<Nodes, { questionDotToken: any }>, HasQuestionDotToken>;
}

{
    type _ = [
        __Expect<HasComment, Extract<Nodes, { comment: any }>>,
        __Expect<Extract<Nodes, { comment: any }>, HasComment>,
    ];
    type __ = Exclude<Extract<Nodes, { comment: any }>, HasComment>;
}

{
    type _ = [
        __Expect<HasTypes, Extract<Nodes, { types: any }>>,
        __Expect<Extract<Nodes, { types: any }>, HasTypes>,
    ];
    type __ = Exclude<Extract<Nodes, { types: any }>, HasTypes>;
}

{
    type _ = [
        __Expect<HasTagName, Extract<Nodes, { tagName: any }>>,
        __Expect<Extract<Nodes, { tagName: any }>, HasTagName>,
    ];
    type __ = Exclude<Extract<Nodes, { tagName: any }>, HasTagName>;
}

{
    type _ = [
        __Expect<HasIsTypeOnly, Extract<Nodes, { isTypeOnly: any }>>,
        __Expect<Extract<Nodes, { isTypeOnly: any }>, HasIsTypeOnly>,
    ];
    type __ = Exclude<Extract<Nodes, { isTypeOnly: any }>, HasIsTypeOnly>;
}

// Registry

/**
 * A mapping of all `SyntaxKind` values to their associated `Node` subtypes.
 */
export interface NodeMap {
    [SyntaxKind.Unknown]: Token<SyntaxKind.Unknown, AstTokenData>;
    [SyntaxKind.EndOfFileToken]: EndOfFileToken;
    [SyntaxKind.SingleLineCommentTrivia]: Token<SyntaxKind.SingleLineCommentTrivia, AstTokenData>;
    [SyntaxKind.MultiLineCommentTrivia]: Token<SyntaxKind.MultiLineCommentTrivia, AstTokenData>;
    [SyntaxKind.NewLineTrivia]: Token<SyntaxKind.NewLineTrivia, AstTokenData>;
    [SyntaxKind.WhitespaceTrivia]: Token<SyntaxKind.WhitespaceTrivia, AstTokenData>;
    [SyntaxKind.ShebangTrivia]: Token<SyntaxKind.ShebangTrivia, AstTokenData>;
    [SyntaxKind.ConflictMarkerTrivia]: Token<SyntaxKind.ConflictMarkerTrivia, AstTokenData>;
    [SyntaxKind.NonTextFileMarkerTrivia]: never;
    [SyntaxKind.NumericLiteral]: NumericLiteral;
    [SyntaxKind.BigIntLiteral]: BigIntLiteral;
    [SyntaxKind.StringLiteral]: StringLiteral;
    [SyntaxKind.JsxText]: JsxText;
    [SyntaxKind.JsxTextAllWhiteSpaces]: never;
    [SyntaxKind.RegularExpressionLiteral]: RegularExpressionLiteral;
    [SyntaxKind.NoSubstitutionTemplateLiteral]: NoSubstitutionTemplateLiteral;
    [SyntaxKind.TemplateHead]: TemplateHead;
    [SyntaxKind.TemplateMiddle]: TemplateMiddle;
    [SyntaxKind.TemplateTail]: TemplateTail;
    [SyntaxKind.OpenBraceToken]: Token<SyntaxKind.OpenBraceToken, AstTokenData>;
    [SyntaxKind.CloseBraceToken]: Token<SyntaxKind.CloseBraceToken, AstTokenData>;
    [SyntaxKind.OpenParenToken]: Token<SyntaxKind.OpenParenToken, AstTokenData>;
    [SyntaxKind.CloseParenToken]: Token<SyntaxKind.CloseParenToken, AstTokenData>;
    [SyntaxKind.OpenBracketToken]: Token<SyntaxKind.OpenBracketToken, AstTokenData>;
    [SyntaxKind.CloseBracketToken]: Token<SyntaxKind.CloseBracketToken, AstTokenData>;
    [SyntaxKind.DotToken]: Token<SyntaxKind.DotToken, AstTokenData>;
    [SyntaxKind.DotDotDotToken]: Token<SyntaxKind.DotDotDotToken, AstTokenData>;
    [SyntaxKind.SemicolonToken]: Token<SyntaxKind.SemicolonToken, AstTokenData>;
    [SyntaxKind.CommaToken]: Token<SyntaxKind.CommaToken, AstTokenData>;
    [SyntaxKind.QuestionDotToken]: Token<SyntaxKind.QuestionDotToken, AstTokenData>;
    [SyntaxKind.LessThanToken]: Token<SyntaxKind.LessThanToken, AstTokenData>;
    [SyntaxKind.LessThanSlashToken]: Token<SyntaxKind.LessThanSlashToken, AstTokenData>;
    [SyntaxKind.GreaterThanToken]: Token<SyntaxKind.GreaterThanToken, AstTokenData>;
    [SyntaxKind.LessThanEqualsToken]: Token<SyntaxKind.LessThanEqualsToken, AstTokenData>;
    [SyntaxKind.GreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanEqualsToken, AstTokenData>;
    [SyntaxKind.EqualsEqualsToken]: Token<SyntaxKind.EqualsEqualsToken, AstTokenData>;
    [SyntaxKind.ExclamationEqualsToken]: Token<SyntaxKind.ExclamationEqualsToken, AstTokenData>;
    [SyntaxKind.EqualsEqualsEqualsToken]: Token<SyntaxKind.EqualsEqualsEqualsToken, AstTokenData>;
    [SyntaxKind.ExclamationEqualsEqualsToken]: Token<SyntaxKind.ExclamationEqualsEqualsToken, AstTokenData>;
    [SyntaxKind.EqualsGreaterThanToken]: Token<SyntaxKind.EqualsGreaterThanToken, AstTokenData>;
    [SyntaxKind.PlusToken]: Token<SyntaxKind.PlusToken, AstTokenData>;
    [SyntaxKind.MinusToken]: Token<SyntaxKind.MinusToken, AstTokenData>;
    [SyntaxKind.AsteriskToken]: Token<SyntaxKind.AsteriskToken, AstTokenData>;
    [SyntaxKind.AsteriskAsteriskToken]: Token<SyntaxKind.AsteriskAsteriskToken, AstTokenData>;
    [SyntaxKind.SlashToken]: Token<SyntaxKind.SlashToken, AstTokenData>;
    [SyntaxKind.PercentToken]: Token<SyntaxKind.PercentToken, AstTokenData>;
    [SyntaxKind.PlusPlusToken]: Token<SyntaxKind.PlusPlusToken, AstTokenData>;
    [SyntaxKind.MinusMinusToken]: Token<SyntaxKind.MinusMinusToken, AstTokenData>;
    [SyntaxKind.LessThanLessThanToken]: Token<SyntaxKind.LessThanLessThanToken, AstTokenData>;
    [SyntaxKind.GreaterThanGreaterThanToken]: Token<SyntaxKind.GreaterThanGreaterThanToken, AstTokenData>;
    [SyntaxKind.GreaterThanGreaterThanGreaterThanToken]: Token<SyntaxKind.GreaterThanGreaterThanGreaterThanToken, AstTokenData>;
    [SyntaxKind.AmpersandToken]: Token<SyntaxKind.AmpersandToken, AstTokenData>;
    [SyntaxKind.BarToken]: Token<SyntaxKind.BarToken, AstTokenData>;
    [SyntaxKind.CaretToken]: Token<SyntaxKind.CaretToken, AstTokenData>;
    [SyntaxKind.ExclamationToken]: Token<SyntaxKind.ExclamationToken, AstTokenData>;
    [SyntaxKind.TildeToken]: Token<SyntaxKind.TildeToken, AstTokenData>;
    [SyntaxKind.AmpersandAmpersandToken]: Token<SyntaxKind.AmpersandAmpersandToken, AstTokenData>;
    [SyntaxKind.BarBarToken]: Token<SyntaxKind.BarBarToken, AstTokenData>;
    [SyntaxKind.QuestionToken]: Token<SyntaxKind.QuestionToken, AstTokenData>;
    [SyntaxKind.ColonToken]: Token<SyntaxKind.ColonToken, AstTokenData>;
    [SyntaxKind.AtToken]: Token<SyntaxKind.AtToken, AstTokenData>;
    [SyntaxKind.QuestionQuestionToken]: Token<SyntaxKind.QuestionQuestionToken, AstTokenData>;
    [SyntaxKind.BacktickToken]: Token<SyntaxKind.BacktickToken, AstTokenData>;
    [SyntaxKind.HashToken]: Token<SyntaxKind.HashToken, AstTokenData>;
    [SyntaxKind.EqualsToken]: Token<SyntaxKind.EqualsToken, AstTokenData>;
    [SyntaxKind.PlusEqualsToken]: Token<SyntaxKind.PlusEqualsToken, AstTokenData>;
    [SyntaxKind.MinusEqualsToken]: Token<SyntaxKind.MinusEqualsToken, AstTokenData>;
    [SyntaxKind.AsteriskEqualsToken]: Token<SyntaxKind.AsteriskEqualsToken, AstTokenData>;
    [SyntaxKind.AsteriskAsteriskEqualsToken]: Token<SyntaxKind.AsteriskAsteriskEqualsToken, AstTokenData>;
    [SyntaxKind.SlashEqualsToken]: Token<SyntaxKind.SlashEqualsToken, AstTokenData>;
    [SyntaxKind.PercentEqualsToken]: Token<SyntaxKind.PercentEqualsToken, AstTokenData>;
    [SyntaxKind.LessThanLessThanEqualsToken]: Token<SyntaxKind.LessThanLessThanEqualsToken, AstTokenData>;
    [SyntaxKind.GreaterThanGreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanGreaterThanEqualsToken, AstTokenData>;
    [SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken]: Token<SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken, AstTokenData>;
    [SyntaxKind.AmpersandEqualsToken]: Token<SyntaxKind.AmpersandEqualsToken, AstTokenData>;
    [SyntaxKind.BarEqualsToken]: Token<SyntaxKind.BarEqualsToken, AstTokenData>;
    [SyntaxKind.BarBarEqualsToken]: Token<SyntaxKind.BarBarEqualsToken, AstTokenData>;
    [SyntaxKind.AmpersandAmpersandEqualsToken]: Token<SyntaxKind.AmpersandAmpersandEqualsToken, AstTokenData>;
    [SyntaxKind.QuestionQuestionEqualsToken]: Token<SyntaxKind.QuestionQuestionEqualsToken, AstTokenData>;
    [SyntaxKind.CaretEqualsToken]: Token<SyntaxKind.CaretEqualsToken, AstTokenData>;
    [SyntaxKind.Identifier]: Identifier;
    [SyntaxKind.PrivateIdentifier]: PrivateIdentifier;
    /** @internal */
    [SyntaxKind.JSDocCommentTextToken]: never;
    [SyntaxKind.BreakKeyword]: Token<SyntaxKind.BreakKeyword, AstTokenData>;
    [SyntaxKind.CaseKeyword]: Token<SyntaxKind.CaseKeyword, AstTokenData>;
    [SyntaxKind.CatchKeyword]: Token<SyntaxKind.CatchKeyword, AstTokenData>;
    [SyntaxKind.ClassKeyword]: Token<SyntaxKind.ClassKeyword, AstTokenData>;
    [SyntaxKind.ConstKeyword]: Token<SyntaxKind.ConstKeyword, AstTokenData>;
    [SyntaxKind.ContinueKeyword]: Token<SyntaxKind.ContinueKeyword, AstTokenData>;
    [SyntaxKind.DebuggerKeyword]: Token<SyntaxKind.DebuggerKeyword, AstTokenData>;
    [SyntaxKind.DefaultKeyword]: Token<SyntaxKind.DefaultKeyword, AstTokenData>;
    [SyntaxKind.DeleteKeyword]: Token<SyntaxKind.DeleteKeyword, AstTokenData>;
    [SyntaxKind.DoKeyword]: Token<SyntaxKind.DoKeyword, AstTokenData>;
    [SyntaxKind.ElseKeyword]: Token<SyntaxKind.ElseKeyword, AstTokenData>;
    [SyntaxKind.EnumKeyword]: Token<SyntaxKind.EnumKeyword, AstTokenData>;
    [SyntaxKind.ExportKeyword]: Token<SyntaxKind.ExportKeyword, AstTokenData>;
    [SyntaxKind.ExtendsKeyword]: Token<SyntaxKind.ExtendsKeyword, AstTokenData>;
    [SyntaxKind.FalseKeyword]: FalseLiteral;
    [SyntaxKind.FinallyKeyword]: Token<SyntaxKind.FinallyKeyword, AstTokenData>;
    [SyntaxKind.ForKeyword]: Token<SyntaxKind.ForKeyword, AstTokenData>;
    [SyntaxKind.FunctionKeyword]: Token<SyntaxKind.FunctionKeyword, AstTokenData>;
    [SyntaxKind.IfKeyword]: Token<SyntaxKind.IfKeyword, AstTokenData>;
    [SyntaxKind.ImportKeyword]: ImportExpression;
    [SyntaxKind.InKeyword]: Token<SyntaxKind.InKeyword, AstTokenData>;
    [SyntaxKind.InstanceOfKeyword]: Token<SyntaxKind.InstanceOfKeyword, AstTokenData>;
    [SyntaxKind.NewKeyword]: Token<SyntaxKind.NewKeyword, AstTokenData>;
    [SyntaxKind.NullKeyword]: NullLiteral;
    [SyntaxKind.ReturnKeyword]: Token<SyntaxKind.ReturnKeyword, AstTokenData>;
    [SyntaxKind.SuperKeyword]: SuperExpression;
    [SyntaxKind.SwitchKeyword]: Token<SyntaxKind.SwitchKeyword, AstTokenData>;
    [SyntaxKind.ThisKeyword]: ThisExpression;
    [SyntaxKind.ThrowKeyword]: Token<SyntaxKind.ThrowKeyword, AstTokenData>;
    [SyntaxKind.TrueKeyword]: TrueLiteral;
    [SyntaxKind.TryKeyword]: Token<SyntaxKind.TryKeyword, AstTokenData>;
    [SyntaxKind.TypeOfKeyword]: Token<SyntaxKind.TypeOfKeyword, AstTokenData>;
    [SyntaxKind.VarKeyword]: Token<SyntaxKind.VarKeyword, AstTokenData>;
    [SyntaxKind.VoidKeyword]: Token<SyntaxKind.VoidKeyword, AstTokenData>;
    [SyntaxKind.WhileKeyword]: Token<SyntaxKind.WhileKeyword, AstTokenData>;
    [SyntaxKind.WithKeyword]: Token<SyntaxKind.WithKeyword, AstTokenData>;
    [SyntaxKind.ImplementsKeyword]: Token<SyntaxKind.ImplementsKeyword, AstTokenData>;
    [SyntaxKind.InterfaceKeyword]: Token<SyntaxKind.InterfaceKeyword, AstTokenData>;
    [SyntaxKind.LetKeyword]: Token<SyntaxKind.LetKeyword, AstTokenData>;
    [SyntaxKind.PackageKeyword]: Token<SyntaxKind.PackageKeyword, AstTokenData>;
    [SyntaxKind.PrivateKeyword]: Token<SyntaxKind.PrivateKeyword, AstTokenData>;
    [SyntaxKind.ProtectedKeyword]: Token<SyntaxKind.ProtectedKeyword, AstTokenData>;
    [SyntaxKind.PublicKeyword]: Token<SyntaxKind.PublicKeyword, AstTokenData>;
    [SyntaxKind.StaticKeyword]: Token<SyntaxKind.StaticKeyword, AstTokenData>;
    [SyntaxKind.YieldKeyword]: Token<SyntaxKind.YieldKeyword, AstTokenData>;
    [SyntaxKind.AbstractKeyword]: Token<SyntaxKind.AbstractKeyword, AstTokenData>;
    [SyntaxKind.AccessorKeyword]: Token<SyntaxKind.AccessorKeyword, AstTokenData>;
    [SyntaxKind.AsKeyword]: Token<SyntaxKind.AsKeyword, AstTokenData>;
    [SyntaxKind.AssertsKeyword]: Token<SyntaxKind.AssertsKeyword, AstTokenData>;
    [SyntaxKind.AssertKeyword]: Token<SyntaxKind.AssertKeyword, AstTokenData>;
    [SyntaxKind.AnyKeyword]: Token<SyntaxKind.AnyKeyword, AstTokenData>;
    [SyntaxKind.AsyncKeyword]: Token<SyntaxKind.AsyncKeyword, AstTokenData>;
    [SyntaxKind.AwaitKeyword]: Token<SyntaxKind.AwaitKeyword, AstTokenData>;
    [SyntaxKind.BooleanKeyword]: Token<SyntaxKind.BooleanKeyword, AstTokenData>;
    [SyntaxKind.ConstructorKeyword]: Token<SyntaxKind.ConstructorKeyword, AstTokenData>;
    [SyntaxKind.DeclareKeyword]: Token<SyntaxKind.DeclareKeyword, AstTokenData>;
    [SyntaxKind.GetKeyword]: Token<SyntaxKind.GetKeyword, AstTokenData>;
    [SyntaxKind.InferKeyword]: Token<SyntaxKind.InferKeyword, AstTokenData>;
    [SyntaxKind.IntrinsicKeyword]: Token<SyntaxKind.IntrinsicKeyword, AstTokenData>;
    [SyntaxKind.IsKeyword]: Token<SyntaxKind.IsKeyword, AstTokenData>;
    [SyntaxKind.KeyOfKeyword]: Token<SyntaxKind.KeyOfKeyword, AstTokenData>;
    [SyntaxKind.ModuleKeyword]: Token<SyntaxKind.ModuleKeyword, AstTokenData>;
    [SyntaxKind.NamespaceKeyword]: Token<SyntaxKind.NamespaceKeyword, AstTokenData>;
    [SyntaxKind.NeverKeyword]: Token<SyntaxKind.NeverKeyword, AstTokenData>;
    [SyntaxKind.OutKeyword]: Token<SyntaxKind.OutKeyword, AstTokenData>;
    [SyntaxKind.ReadonlyKeyword]: Token<SyntaxKind.ReadonlyKeyword, AstTokenData>;
    [SyntaxKind.RequireKeyword]: Token<SyntaxKind.RequireKeyword, AstTokenData>;
    [SyntaxKind.NumberKeyword]: Token<SyntaxKind.NumberKeyword, AstTokenData>;
    [SyntaxKind.ObjectKeyword]: Token<SyntaxKind.ObjectKeyword, AstTokenData>;
    [SyntaxKind.SatisfiesKeyword]: Token<SyntaxKind.SatisfiesKeyword, AstTokenData>;
    [SyntaxKind.SetKeyword]: Token<SyntaxKind.SetKeyword, AstTokenData>;
    [SyntaxKind.StringKeyword]: Token<SyntaxKind.StringKeyword, AstTokenData>;
    [SyntaxKind.SymbolKeyword]: Token<SyntaxKind.SymbolKeyword, AstTokenData>;
    [SyntaxKind.TypeKeyword]: Token<SyntaxKind.TypeKeyword, AstTokenData>;
    [SyntaxKind.UndefinedKeyword]: Token<SyntaxKind.UndefinedKeyword, AstTokenData>;
    [SyntaxKind.UniqueKeyword]: Token<SyntaxKind.UniqueKeyword, AstTokenData>;
    [SyntaxKind.UnknownKeyword]: Token<SyntaxKind.UnknownKeyword, AstTokenData>;
    [SyntaxKind.UsingKeyword]: Token<SyntaxKind.UsingKeyword, AstTokenData>;
    [SyntaxKind.FromKeyword]: Token<SyntaxKind.FromKeyword, AstTokenData>;
    [SyntaxKind.GlobalKeyword]: Token<SyntaxKind.GlobalKeyword, AstTokenData>;
    [SyntaxKind.BigIntKeyword]: Token<SyntaxKind.BigIntKeyword, AstTokenData>;
    [SyntaxKind.OverrideKeyword]: Token<SyntaxKind.OverrideKeyword, AstTokenData>;
    [SyntaxKind.OfKeyword]: Token<SyntaxKind.OfKeyword, AstTokenData>;
    [SyntaxKind.QualifiedName]: QualifiedName;
    [SyntaxKind.ComputedPropertyName]: ComputedPropertyName;
    [SyntaxKind.Decorator]: Decorator;
    [SyntaxKind.TypeParameter]: TypeParameterDeclaration;
    [SyntaxKind.CallSignature]: CallSignatureDeclaration;
    [SyntaxKind.ConstructSignature]: ConstructSignatureDeclaration;
    [SyntaxKind.VariableDeclaration]: VariableDeclaration;
    [SyntaxKind.VariableDeclarationList]: VariableDeclarationList;
    [SyntaxKind.Parameter]: ParameterDeclaration;
    [SyntaxKind.BindingElement]: BindingElement;
    [SyntaxKind.PropertySignature]: PropertySignature;
    [SyntaxKind.PropertyDeclaration]: PropertyDeclaration;
    [SyntaxKind.PropertyAssignment]: PropertyAssignment;
    [SyntaxKind.ShorthandPropertyAssignment]: ShorthandPropertyAssignment;
    [SyntaxKind.SpreadAssignment]: SpreadAssignment;
    [SyntaxKind.ObjectBindingPattern]: ObjectBindingPattern;
    [SyntaxKind.ArrayBindingPattern]: ArrayBindingPattern;
    [SyntaxKind.FunctionDeclaration]: FunctionDeclaration;
    [SyntaxKind.MethodSignature]: MethodSignature;
    [SyntaxKind.MethodDeclaration]: MethodDeclaration;
    [SyntaxKind.Constructor]: ConstructorDeclaration;
    [SyntaxKind.SemicolonClassElement]: SemicolonClassElement;
    [SyntaxKind.GetAccessor]: GetAccessorDeclaration;
    [SyntaxKind.SetAccessor]: SetAccessorDeclaration;
    [SyntaxKind.IndexSignature]: IndexSignatureDeclaration;
    [SyntaxKind.ClassStaticBlockDeclaration]: ClassStaticBlockDeclaration;
    [SyntaxKind.ImportTypeAssertionContainer]: ImportTypeAssertionContainer;
    [SyntaxKind.ImportType]: ImportTypeNode;
    [SyntaxKind.ThisType]: ThisTypeNode;
    [SyntaxKind.FunctionType]: FunctionTypeNode;
    [SyntaxKind.ConstructorType]: ConstructorTypeNode;
    [SyntaxKind.TypeReference]: TypeReferenceNode;
    [SyntaxKind.TypePredicate]: TypePredicateNode;
    [SyntaxKind.TypeQuery]: TypeQueryNode;
    [SyntaxKind.TypeLiteral]: TypeLiteralNode;
    [SyntaxKind.ArrayType]: ArrayTypeNode;
    [SyntaxKind.TupleType]: TupleTypeNode;
    [SyntaxKind.NamedTupleMember]: NamedTupleMember;
    [SyntaxKind.OptionalType]: OptionalTypeNode;
    [SyntaxKind.RestType]: RestTypeNode;
    [SyntaxKind.UnionType]: UnionTypeNode;
    [SyntaxKind.IntersectionType]: IntersectionTypeNode;
    [SyntaxKind.ConditionalType]: ConditionalTypeNode;
    [SyntaxKind.InferType]: InferTypeNode;
    [SyntaxKind.ParenthesizedType]: ParenthesizedTypeNode;
    [SyntaxKind.TypeOperator]: TypeOperatorNode;
    [SyntaxKind.IndexedAccessType]: IndexedAccessTypeNode;
    [SyntaxKind.MappedType]: MappedTypeNode;
    [SyntaxKind.LiteralType]: LiteralTypeNode;
    [SyntaxKind.TemplateLiteralType]: TemplateLiteralTypeNode;
    [SyntaxKind.TemplateLiteralTypeSpan]: TemplateLiteralTypeSpan;
    [SyntaxKind.OmittedExpression]: OmittedExpression;
    [SyntaxKind.PrefixUnaryExpression]: PrefixUnaryExpression;
    [SyntaxKind.PostfixUnaryExpression]: PostfixUnaryExpression;
    [SyntaxKind.DeleteExpression]: DeleteExpression;
    [SyntaxKind.TypeOfExpression]: TypeOfExpression;
    [SyntaxKind.VoidExpression]: VoidExpression;
    [SyntaxKind.AwaitExpression]: AwaitExpression;
    [SyntaxKind.YieldExpression]: YieldExpression;
    [SyntaxKind.BinaryExpression]: BinaryExpression;
    [SyntaxKind.ConditionalExpression]: ConditionalExpression;
    [SyntaxKind.FunctionExpression]: FunctionExpression;
    [SyntaxKind.ArrowFunction]: ArrowFunction;
    [SyntaxKind.TemplateExpression]: TemplateExpression;
    [SyntaxKind.TemplateSpan]: TemplateSpan;
    [SyntaxKind.ParenthesizedExpression]: ParenthesizedExpression;
    [SyntaxKind.ArrayLiteralExpression]: ArrayLiteralExpression;
    [SyntaxKind.SpreadElement]: SpreadElement;
    [SyntaxKind.ObjectLiteralExpression]: ObjectLiteralExpression;
    [SyntaxKind.PropertyAccessExpression]: PropertyAccessExpression;
    [SyntaxKind.ElementAccessExpression]: ElementAccessExpression;
    [SyntaxKind.CallExpression]: CallExpression;
    [SyntaxKind.ExpressionWithTypeArguments]: ExpressionWithTypeArguments;
    [SyntaxKind.NewExpression]: NewExpression;
    [SyntaxKind.TaggedTemplateExpression]: TaggedTemplateExpression;
    [SyntaxKind.AsExpression]: AsExpression;
    [SyntaxKind.TypeAssertionExpression]: TypeAssertionExpression;
    [SyntaxKind.SyntheticExpression]: SyntheticExpression;
    [SyntaxKind.SatisfiesExpression]: SatisfiesExpression;
    [SyntaxKind.NonNullExpression]: NonNullExpression;
    [SyntaxKind.MetaProperty]: MetaProperty;
    [SyntaxKind.JsxElement]: JsxElement;
    [SyntaxKind.JsxAttributes]: JsxAttributes;
    [SyntaxKind.JsxNamespacedName]: JsxNamespacedName;
    [SyntaxKind.JsxOpeningElement]: JsxOpeningElement;
    [SyntaxKind.JsxSelfClosingElement]: JsxSelfClosingElement;
    [SyntaxKind.JsxFragment]: JsxFragment;
    [SyntaxKind.JsxOpeningFragment]: JsxOpeningFragment;
    [SyntaxKind.JsxClosingFragment]: JsxClosingFragment;
    [SyntaxKind.JsxAttribute]: JsxAttribute;
    [SyntaxKind.JsxSpreadAttribute]: JsxSpreadAttribute;
    [SyntaxKind.JsxClosingElement]: JsxClosingElement;
    [SyntaxKind.JsxExpression]: JsxExpression;
    [SyntaxKind.EmptyStatement]: EmptyStatement;
    [SyntaxKind.DebuggerStatement]: DebuggerStatement;
    [SyntaxKind.MissingDeclaration]: MissingDeclaration;
    [SyntaxKind.Block]: Block;
    [SyntaxKind.VariableStatement]: VariableStatement;
    [SyntaxKind.ExpressionStatement]: ExpressionStatement;
    [SyntaxKind.IfStatement]: IfStatement;
    [SyntaxKind.DoStatement]: DoStatement;
    [SyntaxKind.WhileStatement]: WhileStatement;
    [SyntaxKind.ForStatement]: ForStatement;
    [SyntaxKind.ForInStatement]: ForInStatement;
    [SyntaxKind.ForOfStatement]: ForOfStatement;
    [SyntaxKind.BreakStatement]: BreakStatement;
    [SyntaxKind.ContinueStatement]: ContinueStatement;
    [SyntaxKind.ReturnStatement]: ReturnStatement;
    [SyntaxKind.WithStatement]: WithStatement;
    [SyntaxKind.SwitchStatement]: SwitchStatement;
    [SyntaxKind.CaseBlock]: CaseBlock;
    [SyntaxKind.CaseClause]: CaseClause;
    [SyntaxKind.DefaultClause]: DefaultClause;
    [SyntaxKind.LabeledStatement]: LabeledStatement;
    [SyntaxKind.ThrowStatement]: ThrowStatement;
    [SyntaxKind.TryStatement]: TryStatement;
    [SyntaxKind.CatchClause]: CatchClause;
    [SyntaxKind.ClassDeclaration]: ClassDeclaration;
    [SyntaxKind.ClassExpression]: ClassExpression;
    [SyntaxKind.InterfaceDeclaration]: InterfaceDeclaration;
    [SyntaxKind.HeritageClause]: HeritageClause;
    [SyntaxKind.TypeAliasDeclaration]: TypeAliasDeclaration;
    [SyntaxKind.EnumMember]: EnumMember;
    [SyntaxKind.EnumDeclaration]: EnumDeclaration;
    [SyntaxKind.ModuleDeclaration]: ModuleDeclaration;
    [SyntaxKind.ModuleBlock]: ModuleBlock;
    [SyntaxKind.ImportEqualsDeclaration]: ImportEqualsDeclaration;
    [SyntaxKind.ExternalModuleReference]: ExternalModuleReference;
    [SyntaxKind.ImportDeclaration]: ImportDeclaration;
    [SyntaxKind.ImportClause]: ImportClause;
    [SyntaxKind.ImportAttribute]: ImportAttribute;
    [SyntaxKind.ImportAttributes]: ImportAttributes;
    [SyntaxKind.NamespaceImport]: NamespaceImport;
    [SyntaxKind.NamespaceExport]: NamespaceExport;
    [SyntaxKind.NamespaceExportDeclaration]: NamespaceExportDeclaration;
    [SyntaxKind.ExportDeclaration]: ExportDeclaration;
    [SyntaxKind.NamedImports]: NamedImports;
    [SyntaxKind.NamedExports]: NamedExports;
    [SyntaxKind.ImportSpecifier]: ImportSpecifier;
    [SyntaxKind.ExportSpecifier]: ExportSpecifier;
    [SyntaxKind.ExportAssignment]: ExportAssignment;
    [SyntaxKind.JSDocTypeExpression]: JSDocTypeExpression;
    [SyntaxKind.JSDocNameReference]: JSDocNameReference;
    [SyntaxKind.JSDocMemberName]: JSDocMemberName;
    [SyntaxKind.JSDocAllType]: JSDocAllType;
    [SyntaxKind.JSDocUnknownType]: JSDocUnknownType;
    [SyntaxKind.JSDocNonNullableType]: JSDocNonNullableType;
    [SyntaxKind.JSDocNullableType]: JSDocNullableType;
    [SyntaxKind.JSDocOptionalType]: JSDocOptionalType;
    [SyntaxKind.JSDocFunctionType]: JSDocFunctionType;
    [SyntaxKind.JSDocVariadicType]: JSDocVariadicType;
    [SyntaxKind.JSDocNamepathType]: JSDocNamepathType;
    [SyntaxKind.JSDoc]: JSDoc;
    [SyntaxKind.JSDocLink]: JSDocLink;
    [SyntaxKind.JSDocLinkCode]: JSDocLinkCode;
    [SyntaxKind.JSDocLinkPlain]: JSDocLinkPlain;
    [SyntaxKind.JSDocText]: JSDocText;
    [SyntaxKind.JSDocTag]: JSDocUnknownTag;
    [SyntaxKind.JSDocAugmentsTag]: JSDocAugmentsTag;
    [SyntaxKind.JSDocImplementsTag]: JSDocImplementsTag;
    [SyntaxKind.JSDocAuthorTag]: JSDocAuthorTag;
    [SyntaxKind.JSDocDeprecatedTag]: JSDocDeprecatedTag;
    [SyntaxKind.JSDocClassTag]: JSDocClassTag;
    [SyntaxKind.JSDocPublicTag]: JSDocPublicTag;
    [SyntaxKind.JSDocPrivateTag]: JSDocPrivateTag;
    [SyntaxKind.JSDocProtectedTag]: JSDocProtectedTag;
    [SyntaxKind.JSDocReadonlyTag]: JSDocReadonlyTag;
    [SyntaxKind.JSDocOverrideTag]: JSDocOverrideTag;
    [SyntaxKind.JSDocEnumTag]: JSDocEnumTag;
    [SyntaxKind.JSDocThisTag]: JSDocThisTag;
    [SyntaxKind.JSDocTemplateTag]: JSDocTemplateTag;
    [SyntaxKind.JSDocSeeTag]: JSDocSeeTag;
    [SyntaxKind.JSDocReturnTag]: JSDocReturnTag;
    [SyntaxKind.JSDocTypeTag]: JSDocTypeTag;
    [SyntaxKind.JSDocTypedefTag]: JSDocTypedefTag;
    [SyntaxKind.JSDocCallbackTag]: JSDocCallbackTag;
    [SyntaxKind.JSDocOverloadTag]: JSDocOverloadTag;
    [SyntaxKind.JSDocThrowsTag]: JSDocThrowsTag;
    [SyntaxKind.JSDocSignature]: JSDocSignature;
    [SyntaxKind.JSDocPropertyTag]: JSDocPropertyTag;
    [SyntaxKind.JSDocParameterTag]: JSDocParameterTag;
    [SyntaxKind.JSDocTypeLiteral]: JSDocTypeLiteral;
    [SyntaxKind.JSDocSatisfiesTag]: JSDocSatisfiesTag;
    [SyntaxKind.JSDocImportTag]: JSDocImportTag;
    [SyntaxKind.SourceFile]: SourceFile;
    [SyntaxKind.Bundle]: Bundle;
    [SyntaxKind.SyntaxList]: SyntaxList;
    [SyntaxKind.NotEmittedStatement]: NotEmittedStatement;
    [SyntaxKind.NotEmittedTypeElement]: NotEmittedTypeElement;
    [SyntaxKind.PartiallyEmittedExpression]: PartiallyEmittedExpression;
    [SyntaxKind.CommaListExpression]: CommaListExpression;
    /** @internal */
    [SyntaxKind.SyntheticReferenceExpression]: SyntheticReferenceExpression;
    [SyntaxKind.Count]: never;
    [SyntaxKind.NonTextFileMarkerTrivia]: never;
}

/**
 * The set of all `Node` subtypes.
 */
export type Nodes = NodeMap[keyof NodeMap];

type __Expect<T, _ extends T> = never;
