namespace ts {
    // branded string type used to store absolute, normalized and canonicalized paths
    // arbitrary file name can be converted to Path via toPath function
    export type Path = string & { __pathBrand: any };

    /* @internal */
    export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

    export interface TextRange {
        pos: number;
        end: number;
    }

    export interface ReadonlyTextRange {
        readonly pos: number;
        readonly end: number;
    }

    // token > SyntaxKind.Identifier => token is a keyword
    // Also, If you add a new SyntaxKind be sure to keep the `Markers` section at the bottom in sync
    export const enum SyntaxKind {
        Unknown,
        EndOfFileToken,
        SingleLineCommentTrivia,
        MultiLineCommentTrivia,
        NewLineTrivia,
        WhitespaceTrivia,
        // We detect and preserve #! on the first line
        ShebangTrivia,
        // We detect and provide better error recovery when we encounter a git merge marker.  This
        // allows us to edit files with git-conflict markers in them in a much more pleasant manner.
        ConflictMarkerTrivia,
        // Literals
        NumericLiteral,
        BigIntLiteral,
        StringLiteral,
        JsxText,
        JsxTextAllWhiteSpaces,
        RegularExpressionLiteral,
        NoSubstitutionTemplateLiteral,
        // Pseudo-literals
        TemplateHead,
        TemplateMiddle,
        TemplateTail,
        // Punctuation
        OpenBraceToken,
        CloseBraceToken,
        OpenParenToken,
        CloseParenToken,
        OpenBracketToken,
        CloseBracketToken,
        DotToken,
        DotDotDotToken,
        SemicolonToken,
        CommaToken,
        QuestionDotToken,
        LessThanToken,
        LessThanSlashToken,
        GreaterThanToken,
        LessThanEqualsToken,
        GreaterThanEqualsToken,
        EqualsEqualsToken,
        ExclamationEqualsToken,
        EqualsEqualsEqualsToken,
        ExclamationEqualsEqualsToken,
        EqualsGreaterThanToken,
        PlusToken,
        MinusToken,
        AsteriskToken,
        AsteriskAsteriskToken,
        SlashToken,
        PercentToken,
        PlusPlusToken,
        MinusMinusToken,
        LessThanLessThanToken,
        GreaterThanGreaterThanToken,
        GreaterThanGreaterThanGreaterThanToken,
        AmpersandToken,
        BarToken,
        CaretToken,
        ExclamationToken,
        TildeToken,
        AmpersandAmpersandToken,
        BarBarToken,
        QuestionToken,
        ColonToken,
        AtToken,
        QuestionQuestionToken,
        /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
        BacktickToken,
        // Assignments
        EqualsToken,
        PlusEqualsToken,
        MinusEqualsToken,
        AsteriskEqualsToken,
        AsteriskAsteriskEqualsToken,
        SlashEqualsToken,
        PercentEqualsToken,
        LessThanLessThanEqualsToken,
        GreaterThanGreaterThanEqualsToken,
        GreaterThanGreaterThanGreaterThanEqualsToken,
        AmpersandEqualsToken,
        BarEqualsToken,
        BarBarEqualsToken,
        AmpersandAmpersandEqualsToken,
        QuestionQuestionEqualsToken,
        CaretEqualsToken,
        // Identifiers and PrivateIdentifiers
        Identifier,
        PrivateIdentifier,
        // Reserved words
        BreakKeyword,
        CaseKeyword,
        CatchKeyword,
        ClassKeyword,
        ConstKeyword,
        ContinueKeyword,
        DebuggerKeyword,
        DefaultKeyword,
        DeleteKeyword,
        DoKeyword,
        ElseKeyword,
        EnumKeyword,
        ExportKeyword,
        ExtendsKeyword,
        FalseKeyword,
        FinallyKeyword,
        ForKeyword,
        FunctionKeyword,
        IfKeyword,
        ImportKeyword,
        InKeyword,
        InstanceOfKeyword,
        NewKeyword,
        NullKeyword,
        ReturnKeyword,
        SuperKeyword,
        SwitchKeyword,
        ThisKeyword,
        ThrowKeyword,
        TrueKeyword,
        TryKeyword,
        TypeOfKeyword,
        VarKeyword,
        VoidKeyword,
        WhileKeyword,
        WithKeyword,
        // Strict mode reserved words
        ImplementsKeyword,
        InterfaceKeyword,
        LetKeyword,
        PackageKeyword,
        PrivateKeyword,
        ProtectedKeyword,
        PublicKeyword,
        StaticKeyword,
        YieldKeyword,
        // Contextual keywords
        AbstractKeyword,
        AsKeyword,
        AssertsKeyword,
        AnyKeyword,
        AsyncKeyword,
        AwaitKeyword,
        BooleanKeyword,
        ConstructorKeyword,
        DeclareKeyword,
        GetKeyword,
        InferKeyword,
        IsKeyword,
        KeyOfKeyword,
        ModuleKeyword,
        NamespaceKeyword,
        NeverKeyword,
        ReadonlyKeyword,
        RequireKeyword,
        NumberKeyword,
        ObjectKeyword,
        SetKeyword,
        StringKeyword,
        SymbolKeyword,
        TypeKeyword,
        UndefinedKeyword,
        UniqueKeyword,
        UnknownKeyword,
        FromKeyword,
        GlobalKeyword,
        BigIntKeyword,
        OfKeyword, // LastKeyword and LastToken and LastContextualKeyword

        // Parse tree nodes

        // Names
        QualifiedName,
        ComputedPropertyName,
        // Signature elements
        TypeParameter,
        Parameter,
        Decorator,
        // TypeMember
        PropertySignature,
        PropertyDeclaration,
        MethodSignature,
        MethodDeclaration,
        Constructor,
        GetAccessor,
        SetAccessor,
        CallSignature,
        ConstructSignature,
        IndexSignature,
        // Type
        TypePredicate,
        TypeReference,
        FunctionType,
        ConstructorType,
        TypeQuery,
        TypeLiteral,
        ArrayType,
        TupleType,
        OptionalType,
        RestType,
        UnionType,
        IntersectionType,
        ConditionalType,
        InferType,
        ParenthesizedType,
        ThisType,
        TypeOperator,
        IndexedAccessType,
        MappedType,
        LiteralType,
        NamedTupleMember,
        ImportType,
        // Binding patterns
        ObjectBindingPattern,
        ArrayBindingPattern,
        BindingElement,
        // Expression
        ArrayLiteralExpression,
        ObjectLiteralExpression,
        PropertyAccessExpression,
        ElementAccessExpression,
        CallExpression,
        NewExpression,
        TaggedTemplateExpression,
        TypeAssertionExpression,
        ParenthesizedExpression,
        FunctionExpression,
        ArrowFunction,
        DeleteExpression,
        TypeOfExpression,
        VoidExpression,
        AwaitExpression,
        PrefixUnaryExpression,
        PostfixUnaryExpression,
        BinaryExpression,
        ConditionalExpression,
        TemplateExpression,
        YieldExpression,
        SpreadElement,
        ClassExpression,
        OmittedExpression,
        ExpressionWithTypeArguments,
        AsExpression,
        NonNullExpression,
        MetaProperty,
        SyntheticExpression,

        // Misc
        TemplateSpan,
        SemicolonClassElement,
        // Element
        Block,
        EmptyStatement,
        VariableStatement,
        ExpressionStatement,
        IfStatement,
        DoStatement,
        WhileStatement,
        ForStatement,
        ForInStatement,
        ForOfStatement,
        ContinueStatement,
        BreakStatement,
        ReturnStatement,
        WithStatement,
        SwitchStatement,
        LabeledStatement,
        ThrowStatement,
        TryStatement,
        DebuggerStatement,
        VariableDeclaration,
        VariableDeclarationList,
        FunctionDeclaration,
        ClassDeclaration,
        InterfaceDeclaration,
        TypeAliasDeclaration,
        EnumDeclaration,
        ModuleDeclaration,
        ModuleBlock,
        CaseBlock,
        NamespaceExportDeclaration,
        ImportEqualsDeclaration,
        ImportDeclaration,
        ImportClause,
        NamespaceImport,
        NamedImports,
        ImportSpecifier,
        ExportAssignment,
        ExportDeclaration,
        NamedExports,
        NamespaceExport,
        ExportSpecifier,
        MissingDeclaration,

        // Module references
        ExternalModuleReference,

        // JSX
        JsxElement,
        JsxSelfClosingElement,
        JsxOpeningElement,
        JsxClosingElement,
        JsxFragment,
        JsxOpeningFragment,
        JsxClosingFragment,
        JsxAttribute,
        JsxAttributes,
        JsxSpreadAttribute,
        JsxExpression,

        // Clauses
        CaseClause,
        DefaultClause,
        HeritageClause,
        CatchClause,

        // Property assignments
        PropertyAssignment,
        ShorthandPropertyAssignment,
        SpreadAssignment,

        // Enum
        EnumMember,
        // Unparsed
        UnparsedPrologue,
        UnparsedPrepend,
        UnparsedText,
        UnparsedInternalText,
        UnparsedSyntheticReference,

        // Top-level nodes
        SourceFile,
        Bundle,
        UnparsedSource,
        InputFiles,

        // JSDoc nodes
        JSDocTypeExpression,
        // The * type
        JSDocAllType,
        // The ? type
        JSDocUnknownType,
        JSDocNullableType,
        JSDocNonNullableType,
        JSDocOptionalType,
        JSDocFunctionType,
        JSDocVariadicType,
        // https://jsdoc.app/about-namepaths.html
        JSDocNamepathType,
        JSDocComment,
        JSDocTypeLiteral,
        JSDocSignature,
        JSDocTag,
        JSDocAugmentsTag,
        JSDocImplementsTag,
        JSDocAuthorTag,
        JSDocDeprecatedTag,
        JSDocClassTag,
        JSDocPublicTag,
        JSDocPrivateTag,
        JSDocProtectedTag,
        JSDocReadonlyTag,
        JSDocCallbackTag,
        JSDocEnumTag,
        JSDocParameterTag,
        JSDocReturnTag,
        JSDocThisTag,
        JSDocTypeTag,
        JSDocTemplateTag,
        JSDocTypedefTag,
        JSDocPropertyTag,

        // Synthesized list
        SyntaxList,

        // Transformation nodes
        NotEmittedStatement,
        PartiallyEmittedExpression,
        CommaListExpression,
        MergeDeclarationMarker,
        EndOfDeclarationMarker,
        SyntheticReferenceExpression,

        // Enum value count
        Count,

        // Markers
        FirstAssignment = EqualsToken,
        LastAssignment = CaretEqualsToken,
        FirstCompoundAssignment = PlusEqualsToken,
        LastCompoundAssignment = CaretEqualsToken,
        FirstReservedWord = BreakKeyword,
        LastReservedWord = WithKeyword,
        FirstKeyword = BreakKeyword,
        LastKeyword = OfKeyword,
        FirstFutureReservedWord = ImplementsKeyword,
        LastFutureReservedWord = YieldKeyword,
        FirstTypeNode = TypePredicate,
        LastTypeNode = ImportType,
        FirstPunctuation = OpenBraceToken,
        LastPunctuation = CaretEqualsToken,
        FirstToken = Unknown,
        LastToken = LastKeyword,
        FirstTriviaToken = SingleLineCommentTrivia,
        LastTriviaToken = ConflictMarkerTrivia,
        FirstLiteralToken = NumericLiteral,
        LastLiteralToken = NoSubstitutionTemplateLiteral,
        FirstTemplateToken = NoSubstitutionTemplateLiteral,
        LastTemplateToken = TemplateTail,
        FirstBinaryOperator = LessThanToken,
        LastBinaryOperator = CaretEqualsToken,
        FirstStatement = VariableStatement,
        LastStatement = DebuggerStatement,
        FirstNode = QualifiedName,
        FirstJSDocNode = JSDocTypeExpression,
        LastJSDocNode = JSDocPropertyTag,
        FirstJSDocTagNode = JSDocTag,
        LastJSDocTagNode = JSDocPropertyTag,
        /* @internal */ FirstContextualKeyword = AbstractKeyword,
        /* @internal */ LastContextualKeyword = OfKeyword,
    }

    export type TriviaSyntaxKind =
        | SyntaxKind.SingleLineCommentTrivia
        | SyntaxKind.MultiLineCommentTrivia
        | SyntaxKind.NewLineTrivia
        | SyntaxKind.WhitespaceTrivia
        | SyntaxKind.ShebangTrivia
        | SyntaxKind.ConflictMarkerTrivia
        ;

    export type LiteralSyntaxKind =
        | SyntaxKind.NumericLiteral
        | SyntaxKind.BigIntLiteral
        | SyntaxKind.StringLiteral
        | SyntaxKind.JsxText
        | SyntaxKind.JsxTextAllWhiteSpaces
        | SyntaxKind.RegularExpressionLiteral
        | SyntaxKind.NoSubstitutionTemplateLiteral
        ;

    export type PseudoLiteralSyntaxKind =
        | SyntaxKind.TemplateHead
        | SyntaxKind.TemplateMiddle
        | SyntaxKind.TemplateTail
        ;

    export type PunctuationSyntaxKind =
        | SyntaxKind.OpenBraceToken
        | SyntaxKind.CloseBraceToken
        | SyntaxKind.OpenParenToken
        | SyntaxKind.CloseParenToken
        | SyntaxKind.OpenBracketToken
        | SyntaxKind.CloseBracketToken
        | SyntaxKind.DotToken
        | SyntaxKind.DotDotDotToken
        | SyntaxKind.SemicolonToken
        | SyntaxKind.CommaToken
        | SyntaxKind.QuestionDotToken
        | SyntaxKind.LessThanToken
        | SyntaxKind.LessThanSlashToken
        | SyntaxKind.GreaterThanToken
        | SyntaxKind.LessThanEqualsToken
        | SyntaxKind.GreaterThanEqualsToken
        | SyntaxKind.EqualsEqualsToken
        | SyntaxKind.ExclamationEqualsToken
        | SyntaxKind.EqualsEqualsEqualsToken
        | SyntaxKind.ExclamationEqualsEqualsToken
        | SyntaxKind.EqualsGreaterThanToken
        | SyntaxKind.PlusToken
        | SyntaxKind.MinusToken
        | SyntaxKind.AsteriskToken
        | SyntaxKind.AsteriskAsteriskToken
        | SyntaxKind.SlashToken
        | SyntaxKind.PercentToken
        | SyntaxKind.PlusPlusToken
        | SyntaxKind.MinusMinusToken
        | SyntaxKind.LessThanLessThanToken
        | SyntaxKind.GreaterThanGreaterThanToken
        | SyntaxKind.GreaterThanGreaterThanGreaterThanToken
        | SyntaxKind.AmpersandToken
        | SyntaxKind.BarToken
        | SyntaxKind.CaretToken
        | SyntaxKind.ExclamationToken
        | SyntaxKind.TildeToken
        | SyntaxKind.AmpersandAmpersandToken
        | SyntaxKind.BarBarToken
        | SyntaxKind.QuestionQuestionToken
        | SyntaxKind.QuestionToken
        | SyntaxKind.ColonToken
        | SyntaxKind.AtToken
        | SyntaxKind.BacktickToken
        | SyntaxKind.EqualsToken
        | SyntaxKind.PlusEqualsToken
        | SyntaxKind.MinusEqualsToken
        | SyntaxKind.AsteriskEqualsToken
        | SyntaxKind.AsteriskAsteriskEqualsToken
        | SyntaxKind.SlashEqualsToken
        | SyntaxKind.PercentEqualsToken
        | SyntaxKind.LessThanLessThanEqualsToken
        | SyntaxKind.GreaterThanGreaterThanEqualsToken
        | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
        | SyntaxKind.AmpersandEqualsToken
        | SyntaxKind.BarEqualsToken
        | SyntaxKind.CaretEqualsToken
        ;

    export type KeywordSyntaxKind =
        | SyntaxKind.AbstractKeyword
        | SyntaxKind.AnyKeyword
        | SyntaxKind.AsKeyword
        | SyntaxKind.AssertsKeyword
        | SyntaxKind.AsyncKeyword
        | SyntaxKind.AwaitKeyword
        | SyntaxKind.BigIntKeyword
        | SyntaxKind.BooleanKeyword
        | SyntaxKind.BreakKeyword
        | SyntaxKind.CaseKeyword
        | SyntaxKind.CatchKeyword
        | SyntaxKind.ClassKeyword
        | SyntaxKind.ConstKeyword
        | SyntaxKind.ConstructorKeyword
        | SyntaxKind.ContinueKeyword
        | SyntaxKind.DebuggerKeyword
        | SyntaxKind.DeclareKeyword
        | SyntaxKind.DefaultKeyword
        | SyntaxKind.DeleteKeyword
        | SyntaxKind.DoKeyword
        | SyntaxKind.ElseKeyword
        | SyntaxKind.EnumKeyword
        | SyntaxKind.ExportKeyword
        | SyntaxKind.ExtendsKeyword
        | SyntaxKind.FalseKeyword
        | SyntaxKind.FinallyKeyword
        | SyntaxKind.ForKeyword
        | SyntaxKind.FromKeyword
        | SyntaxKind.FunctionKeyword
        | SyntaxKind.GetKeyword
        | SyntaxKind.GlobalKeyword
        | SyntaxKind.IfKeyword
        | SyntaxKind.ImplementsKeyword
        | SyntaxKind.ImportKeyword
        | SyntaxKind.InferKeyword
        | SyntaxKind.InKeyword
        | SyntaxKind.InstanceOfKeyword
        | SyntaxKind.InterfaceKeyword
        | SyntaxKind.IsKeyword
        | SyntaxKind.KeyOfKeyword
        | SyntaxKind.LetKeyword
        | SyntaxKind.ModuleKeyword
        | SyntaxKind.NamespaceKeyword
        | SyntaxKind.NeverKeyword
        | SyntaxKind.NewKeyword
        | SyntaxKind.NullKeyword
        | SyntaxKind.NumberKeyword
        | SyntaxKind.ObjectKeyword
        | SyntaxKind.OfKeyword
        | SyntaxKind.PackageKeyword
        | SyntaxKind.PrivateKeyword
        | SyntaxKind.ProtectedKeyword
        | SyntaxKind.PublicKeyword
        | SyntaxKind.ReadonlyKeyword
        | SyntaxKind.RequireKeyword
        | SyntaxKind.ReturnKeyword
        | SyntaxKind.SetKeyword
        | SyntaxKind.StaticKeyword
        | SyntaxKind.StringKeyword
        | SyntaxKind.SuperKeyword
        | SyntaxKind.SwitchKeyword
        | SyntaxKind.SymbolKeyword
        | SyntaxKind.ThisKeyword
        | SyntaxKind.ThrowKeyword
        | SyntaxKind.TrueKeyword
        | SyntaxKind.TryKeyword
        | SyntaxKind.TypeKeyword
        | SyntaxKind.TypeOfKeyword
        | SyntaxKind.UndefinedKeyword
        | SyntaxKind.UniqueKeyword
        | SyntaxKind.UnknownKeyword
        | SyntaxKind.VarKeyword
        | SyntaxKind.VoidKeyword
        | SyntaxKind.WhileKeyword
        | SyntaxKind.WithKeyword
        | SyntaxKind.YieldKeyword
        ;

    export type ModifierSyntaxKind =
        | SyntaxKind.AbstractKeyword
        | SyntaxKind.AsyncKeyword
        | SyntaxKind.ConstKeyword
        | SyntaxKind.DeclareKeyword
        | SyntaxKind.DefaultKeyword
        | SyntaxKind.ExportKeyword
        | SyntaxKind.PrivateKeyword
        | SyntaxKind.ProtectedKeyword
        | SyntaxKind.PublicKeyword
        | SyntaxKind.ReadonlyKeyword
        | SyntaxKind.StaticKeyword
        ;

    export type KeywordTypeSyntaxKind =
        | SyntaxKind.AnyKeyword
        | SyntaxKind.BigIntKeyword
        | SyntaxKind.BooleanKeyword
        | SyntaxKind.NeverKeyword
        | SyntaxKind.NumberKeyword
        | SyntaxKind.ObjectKeyword
        | SyntaxKind.StringKeyword
        | SyntaxKind.SymbolKeyword
        | SyntaxKind.UndefinedKeyword
        | SyntaxKind.UnknownKeyword
        | SyntaxKind.VoidKeyword
        ;

    /* @internal */
    export type TypeNodeSyntaxKind =
        | KeywordTypeSyntaxKind
        | SyntaxKind.TypePredicate
        | SyntaxKind.TypeReference
        | SyntaxKind.FunctionType
        | SyntaxKind.ConstructorType
        | SyntaxKind.TypeQuery
        | SyntaxKind.TypeLiteral
        | SyntaxKind.ArrayType
        | SyntaxKind.TupleType
        | SyntaxKind.NamedTupleMember
        | SyntaxKind.OptionalType
        | SyntaxKind.RestType
        | SyntaxKind.UnionType
        | SyntaxKind.IntersectionType
        | SyntaxKind.ConditionalType
        | SyntaxKind.InferType
        | SyntaxKind.ParenthesizedType
        | SyntaxKind.ThisType
        | SyntaxKind.TypeOperator
        | SyntaxKind.IndexedAccessType
        | SyntaxKind.MappedType
        | SyntaxKind.LiteralType
        | SyntaxKind.ImportType
        | SyntaxKind.ExpressionWithTypeArguments
        | SyntaxKind.JSDocTypeExpression
        | SyntaxKind.JSDocAllType
        | SyntaxKind.JSDocUnknownType
        | SyntaxKind.JSDocNonNullableType
        | SyntaxKind.JSDocNullableType
        | SyntaxKind.JSDocOptionalType
        | SyntaxKind.JSDocFunctionType
        | SyntaxKind.JSDocVariadicType
        | SyntaxKind.JSDocNamepathType
        | SyntaxKind.JSDocSignature
        | SyntaxKind.JSDocTypeLiteral
        ;

    export type TokenSyntaxKind =
        | SyntaxKind.Unknown
        | SyntaxKind.EndOfFileToken
        | TriviaSyntaxKind
        | LiteralSyntaxKind
        | PseudoLiteralSyntaxKind
        | PunctuationSyntaxKind
        | SyntaxKind.Identifier
        | KeywordSyntaxKind
        ;

    export type JsxTokenSyntaxKind =
        | SyntaxKind.LessThanSlashToken
        | SyntaxKind.EndOfFileToken
        | SyntaxKind.ConflictMarkerTrivia
        | SyntaxKind.JsxText
        | SyntaxKind.JsxTextAllWhiteSpaces
        | SyntaxKind.OpenBraceToken
        | SyntaxKind.LessThanToken
        ;

    export type JSDocSyntaxKind =
        | SyntaxKind.EndOfFileToken
        | SyntaxKind.WhitespaceTrivia
        | SyntaxKind.AtToken
        | SyntaxKind.NewLineTrivia
        | SyntaxKind.AsteriskToken
        | SyntaxKind.OpenBraceToken
        | SyntaxKind.CloseBraceToken
        | SyntaxKind.LessThanToken
        | SyntaxKind.GreaterThanToken
        | SyntaxKind.OpenBracketToken
        | SyntaxKind.CloseBracketToken
        | SyntaxKind.EqualsToken
        | SyntaxKind.CommaToken
        | SyntaxKind.DotToken
        | SyntaxKind.Identifier
        | SyntaxKind.BacktickToken
        | SyntaxKind.Unknown
        | KeywordSyntaxKind
        ;

    export const enum NodeFlags {
        None               = 0,
        Let                = 1 << 0,  // Variable declaration
        Const              = 1 << 1,  // Variable declaration
        NestedNamespace    = 1 << 2,  // Namespace declaration
        Synthesized        = 1 << 3,  // Node was synthesized during transformation
        Namespace          = 1 << 4,  // Namespace declaration
        OptionalChain      = 1 << 5,  // Chained MemberExpression rooted to a pseudo-OptionalExpression
        ExportContext      = 1 << 6,  // Export context (initialized by binding)
        ContainsThis       = 1 << 7,  // Interface contains references to "this"
        HasImplicitReturn  = 1 << 8,  // If function implicitly returns on one of codepaths (initialized by binding)
        HasExplicitReturn  = 1 << 9,  // If function has explicit reachable return on one of codepaths (initialized by binding)
        GlobalAugmentation = 1 << 10,  // Set if module declaration is an augmentation for the global scope
        HasAsyncFunctions  = 1 << 11, // If the file has async functions (initialized by binding)
        DisallowInContext  = 1 << 12, // If node was parsed in a context where 'in-expressions' are not allowed
        YieldContext       = 1 << 13, // If node was parsed in the 'yield' context created when parsing a generator
        DecoratorContext   = 1 << 14, // If node was parsed as part of a decorator
        AwaitContext       = 1 << 15, // If node was parsed in the 'await' context created when parsing an async function
        ThisNodeHasError   = 1 << 16, // If the parser encountered an error when parsing the code that created this node
        JavaScriptFile     = 1 << 17, // If node was parsed in a JavaScript
        ThisNodeOrAnySubNodesHasError = 1 << 18, // If this node or any of its children had an error
        HasAggregatedChildData = 1 << 19, // If we've computed data from children and cached it in this node

        // These flags will be set when the parser encounters a dynamic import expression or 'import.meta' to avoid
        // walking the tree if the flags are not set. However, these flags are just a approximation
        // (hence why it's named "PossiblyContainsDynamicImport") because once set, the flags never get cleared.
        // During editing, if a dynamic import is removed, incremental parsing will *NOT* clear this flag.
        // This means that the tree will always be traversed during module resolution, or when looking for external module indicators.
        // However, the removal operation should not occur often and in the case of the
        // removal, it is likely that users will add the import anyway.
        // The advantage of this approach is its simplicity. For the case of batch compilation,
        // we guarantee that users won't have to pay the price of walking the tree if a dynamic import isn't used.
        /* @internal */ PossiblyContainsDynamicImport = 1 << 20,
        /* @internal */ PossiblyContainsImportMeta    = 1 << 21,

        JSDoc                                         = 1 << 22, // If node was parsed inside jsdoc
        /* @internal */ Ambient                       = 1 << 23, // If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
        /* @internal */ InWithStatement               = 1 << 24, // If any ancestor of node was the `statement` of a WithStatement (not the `expression`)
        JsonFile                                      = 1 << 25, // If node was parsed in a Json
        /* @internal */ TypeCached                    = 1 << 26, // If a type was cached for node at any point
        /* @internal */ Deprecated                    = 1 << 27, // If has '@deprecated' JSDoc tag

        BlockScoped = Let | Const,

        ReachabilityCheckFlags = HasImplicitReturn | HasExplicitReturn,
        ReachabilityAndEmitFlags = ReachabilityCheckFlags | HasAsyncFunctions,

        // Parsing context flags
        ContextFlags = DisallowInContext | YieldContext | DecoratorContext | AwaitContext | JavaScriptFile | InWithStatement | Ambient,

        // Exclude these flags when parsing a Type
        TypeExcludesFlags = YieldContext | AwaitContext,

        // Represents all flags that are potentially set once and
        // never cleared on SourceFiles which get re-used in between incremental parses.
        // See the comment above on `PossiblyContainsDynamicImport` and `PossiblyContainsImportMeta`.
        /* @internal */ PermanentlySetIncrementalFlags = PossiblyContainsDynamicImport | PossiblyContainsImportMeta,
    }

    export const enum ModifierFlags {
        None =               0,
        Export =             1 << 0,  // Declarations
        Ambient =            1 << 1,  // Declarations
        Public =             1 << 2,  // Property/Method
        Private =            1 << 3,  // Property/Method
        Protected =          1 << 4,  // Property/Method
        Static =             1 << 5,  // Property/Method
        Readonly =           1 << 6,  // Property/Method
        Abstract =           1 << 7,  // Class/Method/ConstructSignature
        Async =              1 << 8,  // Property/Method/Function
        Default =            1 << 9,  // Function/Class (export default declaration)
        Const =              1 << 11, // Const enum
        HasComputedJSDocModifiers = 1 << 12, // Indicates the computed modifier flags include modifiers from JSDoc.

        Deprecated =         1 << 13, // Deprecated tag.
        HasComputedFlags =   1 << 29, // Modifier flags have been computed

        AccessibilityModifier = Public | Private | Protected,
        // Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
        ParameterPropertyModifier = AccessibilityModifier | Readonly,
        NonPublicAccessibilityModifier = Private | Protected,

        TypeScriptModifier = Ambient | Public | Private | Protected | Readonly | Abstract | Const,
        ExportDefault = Export | Default,
        All = Export | Ambient | Public | Private | Protected | Static | Readonly | Abstract | Async | Default | Const | Deprecated
    }

    export const enum JsxFlags {
        None = 0,
        /** An element from a named property of the JSX.IntrinsicElements interface */
        IntrinsicNamedElement = 1 << 0,
        /** An element inferred from the string index signature of the JSX.IntrinsicElements interface */
        IntrinsicIndexedElement = 1 << 1,

        IntrinsicElement = IntrinsicNamedElement | IntrinsicIndexedElement,
    }

    /* @internal */
    export const enum RelationComparisonResult {
        Succeeded           = 1 << 0, // Should be truthy
        Failed              = 1 << 1,
        Reported            = 1 << 2,

        ReportsUnmeasurable = 1 << 3,
        ReportsUnreliable   = 1 << 4,
        ReportsMask         = ReportsUnmeasurable | ReportsUnreliable
    }

    /* @internal */
    export type NodeId = number;

    export interface Node extends ReadonlyTextRange {
        readonly kind: SyntaxKind;
        readonly flags: NodeFlags;
        /* @internal */ modifierFlagsCache: ModifierFlags;
        /* @internal */ readonly transformFlags: TransformFlags; // Flags for transforms
        readonly decorators?: NodeArray<Decorator>;           // Array of decorators (in document order)
        readonly modifiers?: ModifiersArray;                  // Array of modifiers
        /* @internal */ id?: NodeId;                          // Unique id (used to look up NodeLinks)
        readonly parent: Node;                                // Parent node (initialized by binding)
        /* @internal */ original?: Node;                      // The original node if this is an updated node.
        /* @internal */ symbol: Symbol;                       // Symbol declared by node (initialized by binding)
        /* @internal */ locals?: SymbolTable;                 // Locals associated with node (initialized by binding)
        /* @internal */ nextContainer?: Node;                 // Next container in declaration order (initialized by binding)
        /* @internal */ localSymbol?: Symbol;                 // Local symbol declared by node (initialized by binding only for exported nodes)
        /* @internal */ flowNode?: FlowNode;                  // Associated FlowNode (initialized by binding)
        /* @internal */ emitNode?: EmitNode;                  // Associated EmitNode (initialized by transforms)
        /* @internal */ contextualType?: Type;                // Used to temporarily assign a contextual type during overload resolution
        /* @internal */ inferenceContext?: InferenceContext;  // Inference context for contextual type
    }

    export interface JSDocContainer {
        /* @internal */ jsDoc?: JSDoc[];                      // JSDoc that directly precedes this node
        /* @internal */ jsDocCache?: readonly JSDocTag[];     // Cache for getJSDocTags
    }

    export type HasJSDoc =
        | ParameterDeclaration
        | CallSignatureDeclaration
        | ConstructSignatureDeclaration
        | MethodSignature
        | PropertySignature
        | ArrowFunction
        | ParenthesizedExpression
        | SpreadAssignment
        | ShorthandPropertyAssignment
        | PropertyAssignment
        | FunctionExpression
        | LabeledStatement
        | ExpressionStatement
        | VariableStatement
        | FunctionDeclaration
        | ConstructorDeclaration
        | MethodDeclaration
        | PropertyDeclaration
        | AccessorDeclaration
        | ClassLikeDeclaration
        | InterfaceDeclaration
        | TypeAliasDeclaration
        | EnumMember
        | EnumDeclaration
        | ModuleDeclaration
        | ImportEqualsDeclaration
        | ImportDeclaration
        | NamespaceExportDeclaration
        | ExportAssignment
        | IndexSignatureDeclaration
        | FunctionTypeNode
        | ConstructorTypeNode
        | JSDocFunctionType
        | ExportDeclaration
        | NamedTupleMember
        | EndOfFileToken
        ;

    export type HasType =
        | SignatureDeclaration
        | VariableDeclaration
        | ParameterDeclaration
        | PropertySignature
        | PropertyDeclaration
        | TypePredicateNode
        | ParenthesizedTypeNode
        | TypeOperatorNode
        | MappedTypeNode
        | AssertionExpression
        | TypeAliasDeclaration
        | JSDocTypeExpression
        | JSDocNonNullableType
        | JSDocNullableType
        | JSDocOptionalType
        | JSDocVariadicType
        ;

    export type HasTypeArguments =
        | CallExpression
        | NewExpression
        | TaggedTemplateExpression
        | JsxOpeningElement
        | JsxSelfClosingElement;

    export type HasInitializer =
        | HasExpressionInitializer
        | ForStatement
        | ForInStatement
        | ForOfStatement
        | JsxAttribute
        ;

    export type HasExpressionInitializer =
        | VariableDeclaration
        | ParameterDeclaration
        | BindingElement
        | PropertySignature
        | PropertyDeclaration
        | PropertyAssignment
        | EnumMember
        ;

    // NOTE: Changing this list requires changes to `canHaveModifiers` in factory/utilities.ts and `updateModifiers` in factory/nodeFactory.ts
    /* @internal */
    export type HasModifiers =
        | ParameterDeclaration
        | PropertySignature
        | PropertyDeclaration
        | MethodSignature
        | MethodDeclaration
        | ConstructorDeclaration
        | GetAccessorDeclaration
        | SetAccessorDeclaration
        | IndexSignatureDeclaration
        | FunctionExpression
        | ArrowFunction
        | ClassExpression
        | VariableStatement
        | FunctionDeclaration
        | ClassDeclaration
        | InterfaceDeclaration
        | TypeAliasDeclaration
        | EnumDeclaration
        | ModuleDeclaration
        | ImportEqualsDeclaration
        | ImportDeclaration
        | ExportAssignment
        | ExportDeclaration
        ;

    /* @internal */
    export type MutableNodeArray<T extends Node> = NodeArray<T> & T[];

    export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
        hasTrailingComma?: boolean;
        /* @internal */ transformFlags: TransformFlags;   // Flags for transforms, possibly undefined
    }

    // TODO(rbuckton): Constraint 'TKind' to 'TokenSyntaxKind'
    export interface Token<TKind extends SyntaxKind> extends Node {
        readonly kind: TKind;
    }

    export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;

    // Punctuation
    export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {
    }

    export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
    export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
    export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
    export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
    export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
    export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
    export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
    export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
    export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
    export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;
    export type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;

    // Keywords
    export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
    }

    export type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
    export type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;

    /** @deprecated Use `AwaitKeyword` instead. */
    export type AwaitKeywordToken = AwaitKeyword;

    /** @deprecated Use `AssertsKeyword` instead. */
    export type AssertsToken = AssertsKeyword;

    export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {
    }

    export type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;
    export type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;
    export type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;
    export type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;
    export type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;
    export type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;
    export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
    export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
    export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
    export type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;
    export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;

    /** @deprecated Use `ReadonlyKeyword` instead. */
    export type ReadonlyToken = ReadonlyKeyword;

    export type Modifier =
        | AbstractKeyword
        | AsyncKeyword
        | ConstKeyword
        | DeclareKeyword
        | DefaultKeyword
        | ExportKeyword
        | PrivateKeyword
        | ProtectedKeyword
        | PublicKeyword
        | ReadonlyKeyword
        | StaticKeyword
        ;

    export type AccessibilityModifier =
        | PublicKeyword
        | PrivateKeyword
        | ProtectedKeyword
        ;

    export type ParameterPropertyModifier =
        | AccessibilityModifier
        | ReadonlyKeyword
        ;

    export type ClassMemberModifier =
        | AccessibilityModifier
        | ReadonlyKeyword
        | StaticKeyword
        ;

    export type ModifiersArray = NodeArray<Modifier>;

    export const enum GeneratedIdentifierFlags {
        // Kinds
        None = 0,                           // Not automatically generated.
        /*@internal*/ Auto = 1,             // Automatically generated identifier.
        /*@internal*/ Loop = 2,             // Automatically generated identifier with a preference for '_i'.
        /*@internal*/ Unique = 3,           // Unique name based on the 'text' property.
        /*@internal*/ Node = 4,             // Unique name based on the node in the 'original' property.
        /*@internal*/ KindMask = 7,         // Mask to extract the kind of identifier from its flags.

        // Flags
        ReservedInNestedScopes = 1 << 3,    // Reserve the generated name in nested scopes
        Optimistic = 1 << 4,                // First instance won't use '_#' if there's no conflict
        FileLevel = 1 << 5,                 // Use only the file identifiers list and not generated names to search for conflicts
    }

    export interface Identifier extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.Identifier;
        /**
         * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
         * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
         */
        readonly escapedText: __String;
        readonly originalKeywordKind?: SyntaxKind;                // Original syntaxKind which get set so that we can report an error later
        /*@internal*/ readonly autoGenerateFlags?: GeneratedIdentifierFlags; // Specifies whether to auto-generate the text for an identifier.
        /*@internal*/ readonly autoGenerateId?: number;           // Ensures unique generated identifiers get unique names, but clones get the same name.
        isInJSDocNamespace?: boolean;                             // if the node is a member in a JSDoc namespace
        /*@internal*/ typeArguments?: NodeArray<TypeNode | TypeParameterDeclaration>; // Only defined on synthesized nodes. Though not syntactically valid, used in emitting diagnostics, quickinfo, and signature help.
        /*@internal*/ jsdocDotPos?: number;                       // Identifier occurs in JSDoc-style generic: Id.<T>
    }

    // Transient identifier node (marked by id === -1)
    export interface TransientIdentifier extends Identifier {
        resolvedSymbol: Symbol;
    }

    /*@internal*/
    export interface GeneratedIdentifier extends Identifier {
        autoGenerateFlags: GeneratedIdentifierFlags;
    }

    export interface QualifiedName extends Node {
        readonly kind: SyntaxKind.QualifiedName;
        readonly left: EntityName;
        readonly right: Identifier;
        /*@internal*/ jsdocDotPos?: number;                      // QualifiedName occurs in JSDoc-style generic: Id1.Id2.<T>
    }

    export type EntityName = Identifier | QualifiedName;

    export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier;

    export type DeclarationName =
        | Identifier
        | PrivateIdentifier
        | StringLiteralLike
        | NumericLiteral
        | ComputedPropertyName
        | ElementAccessExpression
        | BindingPattern
        | EntityNameExpression;

    export interface Declaration extends Node {
        _declarationBrand: any;
    }

    export interface NamedDeclaration extends Declaration {
        readonly name?: DeclarationName;
    }

    /* @internal */
    export interface DynamicNamedDeclaration extends NamedDeclaration {
        readonly name: ComputedPropertyName;
    }

    /* @internal */
    export interface DynamicNamedBinaryExpression extends BinaryExpression {
        readonly left: ElementAccessExpression;
    }

    /* @internal */
    // A declaration that supports late-binding (used in checker)
    export interface LateBoundDeclaration extends DynamicNamedDeclaration {
        readonly name: LateBoundName;
    }

    /* @internal */
    export interface LateBoundBinaryExpressionDeclaration extends DynamicNamedBinaryExpression {
        readonly left: LateBoundElementAccessExpression;
    }

    /* @internal */
    export interface LateBoundElementAccessExpression extends ElementAccessExpression {
        readonly argumentExpression: EntityNameExpression;
    }

    export interface DeclarationStatement extends NamedDeclaration, Statement {
        readonly name?: Identifier | StringLiteral | NumericLiteral;
    }

    export interface ComputedPropertyName extends Node {
        readonly kind: SyntaxKind.ComputedPropertyName;
        readonly parent: Declaration;
        readonly expression: Expression;
    }

    export interface PrivateIdentifier extends Node {
        readonly kind: SyntaxKind.PrivateIdentifier;
        // escaping not strictly necessary
        // avoids gotchas in transforms and utils
        readonly escapedText: __String;
    }


    /* @internal */
    // A name that supports late-binding (used in checker)
    export interface LateBoundName extends ComputedPropertyName {
        readonly expression: EntityNameExpression;
    }

    export interface Decorator extends Node {
        readonly kind: SyntaxKind.Decorator;
        readonly parent: NamedDeclaration;
        readonly expression: LeftHandSideExpression;
    }

    export interface TypeParameterDeclaration extends NamedDeclaration {
        readonly kind: SyntaxKind.TypeParameter;
        readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
        readonly name: Identifier;
        /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
        readonly constraint?: TypeNode;
        readonly default?: TypeNode;

        // For error recovery purposes.
        expression?: Expression;
    }

    export interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
        readonly kind: SignatureDeclaration["kind"];
        readonly name?: PropertyName;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly parameters: NodeArray<ParameterDeclaration>;
        readonly type?: TypeNode;
        /* @internal */ typeArguments?: NodeArray<TypeNode>; // Used for quick info, replaces typeParameters for instantiated signatures
    }

    export type SignatureDeclaration =
        | CallSignatureDeclaration
        | ConstructSignatureDeclaration
        | MethodSignature
        | IndexSignatureDeclaration
        | FunctionTypeNode
        | ConstructorTypeNode
        | JSDocFunctionType
        | FunctionDeclaration
        | MethodDeclaration
        | ConstructorDeclaration
        | AccessorDeclaration
        | FunctionExpression
        | ArrowFunction;

    export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.CallSignature;
    }

    export interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.ConstructSignature;
    }

    export type BindingName = Identifier | BindingPattern;

    export interface VariableDeclaration extends NamedDeclaration {
        readonly kind: SyntaxKind.VariableDeclaration;
        readonly parent: VariableDeclarationList | CatchClause;
        readonly name: BindingName;                    // Declared variable name
        readonly exclamationToken?: ExclamationToken;  // Optional definite assignment assertion
        readonly type?: TypeNode;                      // Optional type annotation
        readonly initializer?: Expression;             // Optional initializer
    }

    /* @internal */
    export type InitializedVariableDeclaration = VariableDeclaration & { readonly initializer: Expression };

    export interface VariableDeclarationList extends Node {
        readonly kind: SyntaxKind.VariableDeclarationList;
        readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
        readonly declarations: NodeArray<VariableDeclaration>;
    }

    export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.Parameter;
        readonly parent: SignatureDeclaration;
        readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
        readonly name: BindingName;                  // Declared parameter name.
        readonly questionToken?: QuestionToken;      // Present on optional parameter
        readonly type?: TypeNode;                    // Optional type annotation
        readonly initializer?: Expression;           // Optional initializer
    }

    export interface BindingElement extends NamedDeclaration {
        readonly kind: SyntaxKind.BindingElement;
        readonly parent: BindingPattern;
        readonly propertyName?: PropertyName;        // Binding property name (in object binding pattern)
        readonly dotDotDotToken?: DotDotDotToken;    // Present on rest element (in object binding pattern)
        readonly name: BindingName;                  // Declared binding element name
        readonly initializer?: Expression;           // Optional initializer
    }

    /*@internal*/
    export type BindingElementGrandparent = BindingElement["parent"]["parent"];

    export interface PropertySignature extends TypeElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertySignature;
        readonly name: PropertyName;                 // Declared property name
        readonly questionToken?: QuestionToken;      // Present on optional property
        readonly type?: TypeNode;                    // Optional type annotation
        initializer?: Expression;                    // Present for use with reporting a grammar error
    }

    export interface PropertyDeclaration extends ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyDeclaration;
        readonly parent: ClassLikeDeclaration;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;      // Present for use with reporting a grammar error
        readonly exclamationToken?: ExclamationToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;           // Optional initializer
    }

    /*@internal*/
    export interface PrivateIdentifierPropertyDeclaration extends PropertyDeclaration {
        name: PrivateIdentifier;
    }

    /* @internal */
    export type InitializedPropertyDeclaration = PropertyDeclaration & { readonly initializer: Expression };

    export interface ObjectLiteralElement extends NamedDeclaration {
        _objectLiteralBrand: any;
        readonly name?: PropertyName;
    }

    /** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
    export type ObjectLiteralElementLike
        = PropertyAssignment
        | ShorthandPropertyAssignment
        | SpreadAssignment
        | MethodDeclaration
        | AccessorDeclaration
        ;

    export interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken; // Present for use with reporting a grammar error
        readonly exclamationToken?: ExclamationToken; // Present for use with reporting a grammar error
        readonly initializer: Expression;
    }

    export interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.ShorthandPropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: Identifier;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
        // it is a grammar error to appear in actual object initializer:
        readonly equalsToken?: EqualsToken;
        readonly objectAssignmentInitializer?: Expression;
    }

    export interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SpreadAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly expression: Expression;
    }

    export type VariableLikeDeclaration =
        | VariableDeclaration
        | ParameterDeclaration
        | BindingElement
        | PropertyDeclaration
        | PropertyAssignment
        | PropertySignature
        | JsxAttribute
        | ShorthandPropertyAssignment
        | EnumMember
        | JSDocPropertyTag
        | JSDocParameterTag;

    export interface PropertyLikeDeclaration extends NamedDeclaration {
        readonly name: PropertyName;
    }

    export interface ObjectBindingPattern extends Node {
        readonly kind: SyntaxKind.ObjectBindingPattern;
        readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
        readonly elements: NodeArray<BindingElement>;
    }

    export interface ArrayBindingPattern extends Node {
        readonly kind: SyntaxKind.ArrayBindingPattern;
        readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
        readonly elements: NodeArray<ArrayBindingElement>;
    }

    export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;

    export type ArrayBindingElement = BindingElement | OmittedExpression;

    /**
     * Several node kinds share function-like features such as a signature,
     * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
     * Examples:
     * - FunctionDeclaration
     * - MethodDeclaration
     * - AccessorDeclaration
     */
    export interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
        _functionLikeDeclarationBrand: any;

        readonly asteriskToken?: AsteriskToken;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        readonly body?: Block | Expression;
        /* @internal */ endFlowNode?: FlowNode;
        /* @internal */ returnFlowNode?: FlowNode;
    }

    export type FunctionLikeDeclaration =
        | FunctionDeclaration
        | MethodDeclaration
        | GetAccessorDeclaration
        | SetAccessorDeclaration
        | ConstructorDeclaration
        | FunctionExpression
        | ArrowFunction;
    /** @deprecated Use SignatureDeclaration */
    export type FunctionLike = SignatureDeclaration;

    export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement {
        readonly kind: SyntaxKind.FunctionDeclaration;
        readonly name?: Identifier;
        readonly body?: FunctionBody;
    }

    export interface MethodSignature extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.MethodSignature;
        readonly parent: ObjectTypeDeclaration;
        readonly name: PropertyName;
    }

    // Note that a MethodDeclaration is considered both a ClassElement and an ObjectLiteralElement.
    // Both the grammars for ClassDeclaration and ObjectLiteralExpression allow for MethodDeclarations
    // as child elements, and so a MethodDeclaration satisfies both interfaces.  This avoids the
    // alternative where we would need separate kinds/types for ClassMethodDeclaration and
    // ObjectLiteralMethodDeclaration, which would look identical.
    //
    // Because of this, it may be necessary to determine what sort of MethodDeclaration you have
    // at later stages of the compiler pipeline.  In that case, you can either check the parent kind
    // of the method, or use helpers like isObjectLiteralMethodDeclaration
    export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.MethodDeclaration;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
        /* @internal*/ exclamationToken?: ExclamationToken; // Present for use with reporting a grammar error
    }

    export interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.Constructor;
        readonly parent: ClassLikeDeclaration;
        readonly body?: FunctionBody;
        /* @internal */ typeParameters?: NodeArray<TypeParameterDeclaration>; // Present for use with reporting a grammar error
        /* @internal */ type?: TypeNode; // Present for use with reporting a grammar error
    }

    /** For when we encounter a semicolon in a class declaration. ES6 allows these as class elements. */
    export interface SemicolonClassElement extends ClassElement {
        readonly kind: SyntaxKind.SemicolonClassElement;
        readonly parent: ClassLikeDeclaration;
    }

    // See the comment on MethodDeclaration for the intuition behind GetAccessorDeclaration being a
    // ClassElement and an ObjectLiteralElement.
    export interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.GetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
        /* @internal */ typeParameters?: NodeArray<TypeParameterDeclaration>; // Present for use with reporting a grammar error
    }

    // See the comment on MethodDeclaration for the intuition behind SetAccessorDeclaration being a
    // ClassElement and an ObjectLiteralElement.
    export interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
        /* @internal */ typeParameters?: NodeArray<TypeParameterDeclaration>; // Present for use with reporting a grammar error
        /* @internal */ type?: TypeNode; // Present for use with reporting a grammar error
    }

    export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;

    export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement {
        readonly kind: SyntaxKind.IndexSignature;
        readonly parent: ObjectTypeDeclaration;
        readonly type: TypeNode;
    }

    export interface TypeNode extends Node {
        _typeNodeBrand: any;
    }

    /* @internal */
    export interface TypeNode extends Node {
        readonly kind: TypeNodeSyntaxKind;
    }

    export interface KeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode {
        readonly kind: TKind;
    }

    export interface ImportTypeNode extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.ImportType;
        readonly isTypeOf: boolean;
        readonly argument: TypeNode;
        readonly qualifier?: EntityName;
    }

    /* @internal */
    export type LiteralImportTypeNode = ImportTypeNode & { readonly argument: LiteralTypeNode & { readonly literal: StringLiteral } };

    export interface ThisTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ThisType;
    }

    export type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode;

    export interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
        readonly kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
        readonly type: TypeNode;
    }

    export interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase {
        readonly kind: SyntaxKind.FunctionType;
    }

    export interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase {
        readonly kind: SyntaxKind.ConstructorType;
    }

    export interface NodeWithTypeArguments extends TypeNode {
        readonly typeArguments?: NodeArray<TypeNode>;
    }

    export type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;

    export interface TypeReferenceNode extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.TypeReference;
        readonly typeName: EntityName;
    }

    export interface TypePredicateNode extends TypeNode {
        readonly kind: SyntaxKind.TypePredicate;
        readonly parent: SignatureDeclaration | JSDocTypeExpression;
        readonly assertsModifier?: AssertsToken;
        readonly parameterName: Identifier | ThisTypeNode;
        readonly type?: TypeNode;
    }

    export interface TypeQueryNode extends TypeNode {
        readonly kind: SyntaxKind.TypeQuery;
        readonly exprName: EntityName;
    }

    // A TypeLiteral is the declaration node for an anonymous symbol.
    export interface TypeLiteralNode extends TypeNode, Declaration {
        readonly kind: SyntaxKind.TypeLiteral;
        readonly members: NodeArray<TypeElement>;
    }

    export interface ArrayTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ArrayType;
        readonly elementType: TypeNode;
    }

    export interface TupleTypeNode extends TypeNode {
        readonly kind: SyntaxKind.TupleType;
        readonly elements: NodeArray<TypeNode | NamedTupleMember>;
    }

    export interface NamedTupleMember extends TypeNode, JSDocContainer, Declaration {
        readonly kind: SyntaxKind.NamedTupleMember;
        readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        readonly name: Identifier;
        readonly questionToken?: Token<SyntaxKind.QuestionToken>;
        readonly type: TypeNode;
    }

    export interface OptionalTypeNode extends TypeNode {
        readonly kind: SyntaxKind.OptionalType;
        readonly type: TypeNode;
    }

    export interface RestTypeNode extends TypeNode {
        readonly kind: SyntaxKind.RestType;
        readonly type: TypeNode;
    }

    export type UnionOrIntersectionTypeNode = UnionTypeNode | IntersectionTypeNode;

    export interface UnionTypeNode extends TypeNode {
        readonly kind: SyntaxKind.UnionType;
        readonly types: NodeArray<TypeNode>;
    }

    export interface IntersectionTypeNode extends TypeNode {
        readonly kind: SyntaxKind.IntersectionType;
        readonly types: NodeArray<TypeNode>;
    }

    export interface ConditionalTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ConditionalType;
        readonly checkType: TypeNode;
        readonly extendsType: TypeNode;
        readonly trueType: TypeNode;
        readonly falseType: TypeNode;
    }

    export interface InferTypeNode extends TypeNode {
        readonly kind: SyntaxKind.InferType;
        readonly typeParameter: TypeParameterDeclaration;
    }

    export interface ParenthesizedTypeNode extends TypeNode {
        readonly kind: SyntaxKind.ParenthesizedType;
        readonly type: TypeNode;
    }

    export interface TypeOperatorNode extends TypeNode {
        readonly kind: SyntaxKind.TypeOperator;
        readonly operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
        readonly type: TypeNode;
    }

    /* @internal */
    export interface UniqueTypeOperatorNode extends TypeOperatorNode {
        readonly operator: SyntaxKind.UniqueKeyword;
    }

    export interface IndexedAccessTypeNode extends TypeNode {
        readonly kind: SyntaxKind.IndexedAccessType;
        readonly objectType: TypeNode;
        readonly indexType: TypeNode;
    }

    export interface MappedTypeNode extends TypeNode, Declaration {
        readonly kind: SyntaxKind.MappedType;
        readonly readonlyToken?: ReadonlyToken | PlusToken | MinusToken;
        readonly typeParameter: TypeParameterDeclaration;
        readonly questionToken?: QuestionToken | PlusToken | MinusToken;
        readonly type?: TypeNode;
    }

    export interface LiteralTypeNode extends TypeNode {
        readonly kind: SyntaxKind.LiteralType;
        readonly literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
    }

    export interface StringLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.StringLiteral;
        /* @internal */ readonly textSourceNode?: Identifier | StringLiteralLike | NumericLiteral; // Allows a StringLiteral to get its text from another node (used by transforms).
        /** Note: this is only set when synthesizing a node, not during parsing. */
        /* @internal */ readonly singleQuote?: boolean;
    }

    export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
    export type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral;

    // Note: 'brands' in our syntax nodes serve to give us a small amount of nominal typing.
    // Consider 'Expression'.  Without the brand, 'Expression' is actually no different
    // (structurally) than 'Node'.  Because of this you can pass any Node to a function that
    // takes an Expression without any error.  By using the 'brands' we ensure that the type
    // checker actually thinks you have something of the right type.  Note: the brands are
    // never actually given values.  At runtime they have zero cost.

    export interface Expression extends Node {
        _expressionBrand: any;
    }

    export interface OmittedExpression extends Expression {
        readonly kind: SyntaxKind.OmittedExpression;
    }

    // Represents an expression that is elided as part of a transformation to emit comments on a
    // not-emitted node. The 'expression' property of a PartiallyEmittedExpression should be emitted.
    export interface PartiallyEmittedExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.PartiallyEmittedExpression;
        readonly expression: Expression;
    }

    export interface UnaryExpression extends Expression {
        _unaryExpressionBrand: any;
    }

    /** Deprecated, please use UpdateExpression */
    export type IncrementExpression = UpdateExpression;
    export interface UpdateExpression extends UnaryExpression {
        _updateExpressionBrand: any;
    }

    // see: https://tc39.github.io/ecma262/#prod-UpdateExpression
    // see: https://tc39.github.io/ecma262/#prod-UnaryExpression
    export type PrefixUnaryOperator
        = SyntaxKind.PlusPlusToken
        | SyntaxKind.MinusMinusToken
        | SyntaxKind.PlusToken
        | SyntaxKind.MinusToken
        | SyntaxKind.TildeToken
        | SyntaxKind.ExclamationToken;

    export interface PrefixUnaryExpression extends UpdateExpression {
        readonly kind: SyntaxKind.PrefixUnaryExpression;
        readonly operator: PrefixUnaryOperator;
        readonly operand: UnaryExpression;
    }

    // see: https://tc39.github.io/ecma262/#prod-UpdateExpression
    export type PostfixUnaryOperator
        = SyntaxKind.PlusPlusToken
        | SyntaxKind.MinusMinusToken
        ;

    export interface PostfixUnaryExpression extends UpdateExpression {
        readonly kind: SyntaxKind.PostfixUnaryExpression;
        readonly operand: LeftHandSideExpression;
        readonly operator: PostfixUnaryOperator;
    }

    export interface LeftHandSideExpression extends UpdateExpression {
        _leftHandSideExpressionBrand: any;
    }

    export interface MemberExpression extends LeftHandSideExpression {
        _memberExpressionBrand: any;
    }

    export interface PrimaryExpression extends MemberExpression {
        _primaryExpressionBrand: any;
    }

    export interface NullLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.NullKeyword;
    }

    export interface TrueLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.TrueKeyword;
    }

    export interface FalseLiteral extends PrimaryExpression {
        readonly kind: SyntaxKind.FalseKeyword;
    }

    export type BooleanLiteral = TrueLiteral | FalseLiteral;

    export interface ThisExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ThisKeyword;
    }

    export interface SuperExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.SuperKeyword;
    }

    export interface ImportExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ImportKeyword;
    }

    export interface DeleteExpression extends UnaryExpression {
        readonly kind: SyntaxKind.DeleteExpression;
        readonly expression: UnaryExpression;
    }

    export interface TypeOfExpression extends UnaryExpression {
        readonly kind: SyntaxKind.TypeOfExpression;
        readonly expression: UnaryExpression;
    }

    export interface VoidExpression extends UnaryExpression {
        readonly kind: SyntaxKind.VoidExpression;
        readonly expression: UnaryExpression;
    }

    export interface AwaitExpression extends UnaryExpression {
        readonly kind: SyntaxKind.AwaitExpression;
        readonly expression: UnaryExpression;
    }

    export interface YieldExpression extends Expression {
        readonly kind: SyntaxKind.YieldExpression;
        readonly asteriskToken?: AsteriskToken;
        readonly expression?: Expression;
    }

    export interface SyntheticExpression extends Expression {
        readonly kind: SyntaxKind.SyntheticExpression;
        readonly isSpread: boolean;
        readonly type: Type;
        readonly tupleNameSource?: ParameterDeclaration | NamedTupleMember;
    }

    // see: https://tc39.github.io/ecma262/#prod-ExponentiationExpression
    export type ExponentiationOperator =
        | SyntaxKind.AsteriskAsteriskToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-MultiplicativeOperator
    export type MultiplicativeOperator =
        | SyntaxKind.AsteriskToken
        | SyntaxKind.SlashToken
        | SyntaxKind.PercentToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-MultiplicativeExpression
    export type MultiplicativeOperatorOrHigher =
        | ExponentiationOperator
        | MultiplicativeOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-AdditiveExpression
    export type AdditiveOperator =
        | SyntaxKind.PlusToken
        | SyntaxKind.MinusToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-AdditiveExpression
    export type AdditiveOperatorOrHigher =
        | MultiplicativeOperatorOrHigher
        | AdditiveOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-ShiftExpression
    export type ShiftOperator =
        | SyntaxKind.LessThanLessThanToken
        | SyntaxKind.GreaterThanGreaterThanToken
        | SyntaxKind.GreaterThanGreaterThanGreaterThanToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-ShiftExpression
    export type ShiftOperatorOrHigher =
        | AdditiveOperatorOrHigher
        | ShiftOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-RelationalExpression
    export type RelationalOperator =
        | SyntaxKind.LessThanToken
        | SyntaxKind.LessThanEqualsToken
        | SyntaxKind.GreaterThanToken
        | SyntaxKind.GreaterThanEqualsToken
        | SyntaxKind.InstanceOfKeyword
        | SyntaxKind.InKeyword
        ;

    // see: https://tc39.github.io/ecma262/#prod-RelationalExpression
    export type RelationalOperatorOrHigher =
        | ShiftOperatorOrHigher
        | RelationalOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-EqualityExpression
    export type EqualityOperator =
        | SyntaxKind.EqualsEqualsToken
        | SyntaxKind.EqualsEqualsEqualsToken
        | SyntaxKind.ExclamationEqualsEqualsToken
        | SyntaxKind.ExclamationEqualsToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-EqualityExpression
    export type EqualityOperatorOrHigher =
        | RelationalOperatorOrHigher
        | EqualityOperator;

    // see: https://tc39.github.io/ecma262/#prod-BitwiseANDExpression
    // see: https://tc39.github.io/ecma262/#prod-BitwiseXORExpression
    // see: https://tc39.github.io/ecma262/#prod-BitwiseORExpression
    export type BitwiseOperator =
        | SyntaxKind.AmpersandToken
        | SyntaxKind.BarToken
        | SyntaxKind.CaretToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-BitwiseANDExpression
    // see: https://tc39.github.io/ecma262/#prod-BitwiseXORExpression
    // see: https://tc39.github.io/ecma262/#prod-BitwiseORExpression
    export type BitwiseOperatorOrHigher =
        | EqualityOperatorOrHigher
        | BitwiseOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-LogicalANDExpression
    // see: https://tc39.github.io/ecma262/#prod-LogicalORExpression
    export type LogicalOperator =
        | SyntaxKind.AmpersandAmpersandToken
        | SyntaxKind.BarBarToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-LogicalANDExpression
    // see: https://tc39.github.io/ecma262/#prod-LogicalORExpression
    export type LogicalOperatorOrHigher =
        | BitwiseOperatorOrHigher
        | LogicalOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-AssignmentOperator
    export type CompoundAssignmentOperator =
        | SyntaxKind.PlusEqualsToken
        | SyntaxKind.MinusEqualsToken
        | SyntaxKind.AsteriskAsteriskEqualsToken
        | SyntaxKind.AsteriskEqualsToken
        | SyntaxKind.SlashEqualsToken
        | SyntaxKind.PercentEqualsToken
        | SyntaxKind.AmpersandEqualsToken
        | SyntaxKind.BarEqualsToken
        | SyntaxKind.CaretEqualsToken
        | SyntaxKind.LessThanLessThanEqualsToken
        | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
        | SyntaxKind.GreaterThanGreaterThanEqualsToken
        | SyntaxKind.BarBarEqualsToken
        | SyntaxKind.AmpersandAmpersandEqualsToken
        | SyntaxKind.QuestionQuestionEqualsToken
        ;

    // see: https://tc39.github.io/ecma262/#prod-AssignmentExpression
    export type AssignmentOperator =
        | SyntaxKind.EqualsToken
        | CompoundAssignmentOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-AssignmentExpression
    export type AssignmentOperatorOrHigher =
        | SyntaxKind.QuestionQuestionToken
        | LogicalOperatorOrHigher
        | AssignmentOperator
        ;

    // see: https://tc39.github.io/ecma262/#prod-Expression
    export type BinaryOperator =
        | AssignmentOperatorOrHigher
        | SyntaxKind.CommaToken
        ;

    export type LogicalOrCoalescingAssignmentOperator
        = SyntaxKind.AmpersandAmpersandEqualsToken
        | SyntaxKind.BarBarEqualsToken
        | SyntaxKind.QuestionQuestionEqualsToken
        ;

    export type BinaryOperatorToken = Token<BinaryOperator>;

    export interface BinaryExpression extends Expression, Declaration {
        readonly kind: SyntaxKind.BinaryExpression;
        readonly left: Expression;
        readonly operatorToken: BinaryOperatorToken;
        readonly right: Expression;
    }

    export type AssignmentOperatorToken = Token<AssignmentOperator>;

    export interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
        readonly left: LeftHandSideExpression;
        readonly operatorToken: TOperator;
    }

    export interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        readonly left: ObjectLiteralExpression;
    }

    export interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
        readonly left: ArrayLiteralExpression;
    }

    export type DestructuringAssignment =
        | ObjectDestructuringAssignment
        | ArrayDestructuringAssignment
        ;

    export type BindingOrAssignmentElement =
        | VariableDeclaration
        | ParameterDeclaration
        | ObjectBindingOrAssignmentElement
        | ArrayBindingOrAssignmentElement
        ;

    export type ObjectBindingOrAssignmentElement =
        | BindingElement
        | PropertyAssignment // AssignmentProperty
        | ShorthandPropertyAssignment // AssignmentProperty
        | SpreadAssignment // AssignmentRestProperty
        ;

    export type ArrayBindingOrAssignmentElement =
        | BindingElement
        | OmittedExpression // Elision
        | SpreadElement // AssignmentRestElement
        | ArrayLiteralExpression // ArrayAssignmentPattern
        | ObjectLiteralExpression // ObjectAssignmentPattern
        | AssignmentExpression<EqualsToken> // AssignmentElement
        | Identifier // DestructuringAssignmentTarget
        | PropertyAccessExpression // DestructuringAssignmentTarget
        | ElementAccessExpression // DestructuringAssignmentTarget
        ;

    export type BindingOrAssignmentElementRestIndicator =
        | DotDotDotToken // from BindingElement
        | SpreadElement // AssignmentRestElement
        | SpreadAssignment // AssignmentRestProperty
        ;

    export type BindingOrAssignmentElementTarget =
        | BindingOrAssignmentPattern
        | Identifier
        | PropertyAccessExpression
        | ElementAccessExpression
        | OmittedExpression;

    export type ObjectBindingOrAssignmentPattern =
        | ObjectBindingPattern
        | ObjectLiteralExpression // ObjectAssignmentPattern
        ;

    export type ArrayBindingOrAssignmentPattern =
        | ArrayBindingPattern
        | ArrayLiteralExpression // ArrayAssignmentPattern
        ;

    export type AssignmentPattern = ObjectLiteralExpression | ArrayLiteralExpression;

    export type BindingOrAssignmentPattern = ObjectBindingOrAssignmentPattern | ArrayBindingOrAssignmentPattern;

    export interface ConditionalExpression extends Expression {
        readonly kind: SyntaxKind.ConditionalExpression;
        readonly condition: Expression;
        readonly questionToken: QuestionToken;
        readonly whenTrue: Expression;
        readonly colonToken: ColonToken;
        readonly whenFalse: Expression;
    }

    export type FunctionBody = Block;
    export type ConciseBody = FunctionBody | Expression;

    export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer {
        readonly kind: SyntaxKind.FunctionExpression;
        readonly name?: Identifier;
        readonly body: FunctionBody;  // Required, whereas the member inherited from FunctionDeclaration is optional
    }

    export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer {
        readonly kind: SyntaxKind.ArrowFunction;
        readonly equalsGreaterThanToken: EqualsGreaterThanToken;
        readonly body: ConciseBody;
        readonly name: never;
    }

    // The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
    // or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
    // For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
    export interface LiteralLikeNode extends Node {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }

    export interface TemplateLiteralLikeNode extends LiteralLikeNode {
        rawText?: string;
        /* @internal */
        templateFlags?: TokenFlags;
    }

    // The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
    // or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
    // For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
    export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
        _literalExpressionBrand: any;
    }

    export interface RegularExpressionLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.RegularExpressionLiteral;
    }

    export interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
        readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
        /* @internal */
        templateFlags?: TokenFlags;
    }

    export const enum TokenFlags {
        None = 0,
        /* @internal */
        PrecedingLineBreak = 1 << 0,
        /* @internal */
        PrecedingJSDocComment = 1 << 1,
        /* @internal */
        Unterminated = 1 << 2,
        /* @internal */
        ExtendedUnicodeEscape = 1 << 3,
        Scientific = 1 << 4,        // e.g. `10e2`
        Octal = 1 << 5,             // e.g. `0777`
        HexSpecifier = 1 << 6,      // e.g. `0x00000000`
        BinarySpecifier = 1 << 7,   // e.g. `0b0110010000000000`
        OctalSpecifier = 1 << 8,    // e.g. `0o777`
        /* @internal */
        ContainsSeparator = 1 << 9, // e.g. `0b1100_0101`
        /* @internal */
        UnicodeEscape = 1 << 10,
        /* @internal */
        ContainsInvalidEscape = 1 << 11,    // e.g. `\uhello`
        /* @internal */
        BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
        /* @internal */
        NumericLiteralFlags = Scientific | Octal | HexSpecifier | BinaryOrOctalSpecifier | ContainsSeparator,
        /* @internal */
        TemplateLiteralLikeFlags = ContainsInvalidEscape,
    }

    export interface NumericLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.NumericLiteral;
        /* @internal */
        readonly numericLiteralFlags: TokenFlags;
    }

    export interface BigIntLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.BigIntLiteral;
    }

    export type LiteralToken =
        | NumericLiteral
        | BigIntLiteral
        | StringLiteral
        | JsxText
        | RegularExpressionLiteral
        | NoSubstitutionTemplateLiteral
        ;

    export interface TemplateHead extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateHead;
        readonly parent: TemplateExpression;
        /* @internal */
        templateFlags?: TokenFlags;
    }

    export interface TemplateMiddle extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateMiddle;
        readonly parent: TemplateSpan;
        /* @internal */
        templateFlags?: TokenFlags;
    }

    export interface TemplateTail extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateTail;
        readonly parent: TemplateSpan;
        /* @internal */
        templateFlags?: TokenFlags;
    }

    export type PseudoLiteralToken =
        | TemplateHead
        | TemplateMiddle
        | TemplateTail
        ;

    export type TemplateLiteralToken =
        | NoSubstitutionTemplateLiteral
        | PseudoLiteralToken
        ;

    export interface TemplateExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.TemplateExpression;
        readonly head: TemplateHead;
        readonly templateSpans: NodeArray<TemplateSpan>;
    }

    export type TemplateLiteral =
        | TemplateExpression
        | NoSubstitutionTemplateLiteral
        ;

    // Each of these corresponds to a substitution expression and a template literal, in that order.
    // The template literal must have kind TemplateMiddleLiteral or TemplateTailLiteral.
    export interface TemplateSpan extends Node {
        readonly kind: SyntaxKind.TemplateSpan;
        readonly parent: TemplateExpression;
        readonly expression: Expression;
        readonly literal: TemplateMiddle | TemplateTail;
    }

    export interface ParenthesizedExpression extends PrimaryExpression, JSDocContainer {
        readonly kind: SyntaxKind.ParenthesizedExpression;
        readonly expression: Expression;
    }

    export interface ArrayLiteralExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.ArrayLiteralExpression;
        readonly elements: NodeArray<Expression>;
        /* @internal */
        multiLine?: boolean;
    }

    export interface SpreadElement extends Expression {
        readonly kind: SyntaxKind.SpreadElement;
        readonly parent: ArrayLiteralExpression | CallExpression | NewExpression;
        readonly expression: Expression;
    }

    /**
     * This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
     * ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
     * JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
     * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
     */
    export interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
        readonly properties: NodeArray<T>;
    }

    // An ObjectLiteralExpression is the declaration node for an anonymous symbol.
    export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike> {
        readonly kind: SyntaxKind.ObjectLiteralExpression;
        /* @internal */
        multiLine?: boolean;
    }

    export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
    export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
    export type AccessExpression = PropertyAccessExpression | ElementAccessExpression;

    export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration {
        readonly kind: SyntaxKind.PropertyAccessExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly name: Identifier | PrivateIdentifier;
    }

    /*@internal*/
    export interface PrivateIdentifierPropertyAccessExpression extends PropertyAccessExpression {
        readonly name: PrivateIdentifier;
    }

    export interface PropertyAccessChain extends PropertyAccessExpression {
        _optionalChainBrand: any;
        readonly name: Identifier | PrivateIdentifier;
    }

    /* @internal */
    export interface PropertyAccessChainRoot extends PropertyAccessChain {
        readonly questionDotToken: QuestionDotToken;
    }

    export interface SuperPropertyAccessExpression extends PropertyAccessExpression {
        readonly expression: SuperExpression;
    }

    /** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
    export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
        _propertyAccessExpressionLikeQualifiedNameBrand?: any;
        readonly expression: EntityNameExpression;
        readonly name: Identifier;
    }

    export interface ElementAccessExpression extends MemberExpression {
        readonly kind: SyntaxKind.ElementAccessExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly argumentExpression: Expression;
    }

    export interface ElementAccessChain extends ElementAccessExpression {
        _optionalChainBrand: any;
    }

    /* @internal */
    export interface ElementAccessChainRoot extends ElementAccessChain {
        readonly questionDotToken: QuestionDotToken;
    }

    export interface SuperElementAccessExpression extends ElementAccessExpression {
        readonly expression: SuperExpression;
    }

    // see: https://tc39.github.io/ecma262/#prod-SuperProperty
    export type SuperProperty = SuperPropertyAccessExpression | SuperElementAccessExpression;

    export interface CallExpression extends LeftHandSideExpression, Declaration {
        readonly kind: SyntaxKind.CallExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly arguments: NodeArray<Expression>;
    }

    export interface CallChain extends CallExpression {
        _optionalChainBrand: any;
    }

    /* @internal */
    export interface CallChainRoot extends CallChain {
        readonly questionDotToken: QuestionDotToken;
    }

    export type OptionalChain =
        | PropertyAccessChain
        | ElementAccessChain
        | CallChain
        | NonNullChain
        ;

    /* @internal */
    export type OptionalChainRoot =
        | PropertyAccessChainRoot
        | ElementAccessChainRoot
        | CallChainRoot
        ;

    /** @internal */
    export interface WellKnownSymbolExpression extends PropertyAccessExpression {
        readonly expression: Identifier & { readonly escapedText: __String & "Symbol" };
        readonly name: Identifier;
    }

    /** @internal */
    export type BindableObjectDefinePropertyCall = CallExpression & {
        readonly arguments: readonly [BindableStaticNameExpression, StringLiteralLike | NumericLiteral, ObjectLiteralExpression] & Readonly<TextRange>;
    };

    /** @internal */
    export type BindableStaticNameExpression =
        | EntityNameExpression
        | BindableStaticElementAccessExpression
        ;

    /** @internal */
    export type LiteralLikeElementAccessExpression = ElementAccessExpression & Declaration & {
        readonly argumentExpression: StringLiteralLike | NumericLiteral | WellKnownSymbolExpression;
    };

    /** @internal */
    export type BindableStaticElementAccessExpression = LiteralLikeElementAccessExpression & {
        readonly expression: BindableStaticNameExpression;
    };

    /** @internal */
    export type BindableElementAccessExpression = ElementAccessExpression & {
        readonly expression: BindableStaticNameExpression;
    };

    /** @internal */
    export type BindableStaticAccessExpression =
        | PropertyAccessEntityNameExpression
        | BindableStaticElementAccessExpression
        ;

    /** @internal */
    export type BindableAccessExpression =
        | PropertyAccessEntityNameExpression
        | BindableElementAccessExpression
        ;

    /** @internal */
    export interface BindableStaticPropertyAssignmentExpression extends BinaryExpression {
        readonly left: BindableStaticAccessExpression;
    }

    /** @internal */
    export interface BindablePropertyAssignmentExpression extends BinaryExpression {
        readonly left: BindableAccessExpression;
    }

    // see: https://tc39.github.io/ecma262/#prod-SuperCall
    export interface SuperCall extends CallExpression {
        readonly expression: SuperExpression;
    }

    export interface ImportCall extends CallExpression {
        readonly expression: ImportExpression;
    }

    export interface ExpressionWithTypeArguments extends NodeWithTypeArguments {
        readonly kind: SyntaxKind.ExpressionWithTypeArguments;
        readonly parent: HeritageClause | JSDocAugmentsTag | JSDocImplementsTag;
        readonly expression: LeftHandSideExpression;
    }

    export interface NewExpression extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.NewExpression;
        readonly expression: LeftHandSideExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly arguments?: NodeArray<Expression>;
    }

    export interface TaggedTemplateExpression extends MemberExpression {
        readonly kind: SyntaxKind.TaggedTemplateExpression;
        readonly tag: LeftHandSideExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly template: TemplateLiteral;
        /*@internal*/ questionDotToken?: QuestionDotToken; // NOTE: Invalid syntax, only used to report a grammar error.
    }

    export type CallLikeExpression =
        | CallExpression
        | NewExpression
        | TaggedTemplateExpression
        | Decorator
        | JsxOpeningLikeElement
        ;

    export interface AsExpression extends Expression {
        readonly kind: SyntaxKind.AsExpression;
        readonly expression: Expression;
        readonly type: TypeNode;
    }

    export interface TypeAssertion extends UnaryExpression {
        readonly kind: SyntaxKind.TypeAssertionExpression;
        readonly type: TypeNode;
        readonly expression: UnaryExpression;
    }

    export type AssertionExpression =
        | TypeAssertion
        | AsExpression
        ;

    export interface NonNullExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.NonNullExpression;
        readonly expression: Expression;
    }

    export interface NonNullChain extends NonNullExpression {
        _optionalChainBrand: any;
    }

    // NOTE: MetaProperty is really a MemberExpression, but we consider it a PrimaryExpression
    //       for the same reasons we treat NewExpression as a PrimaryExpression.
    export interface MetaProperty extends PrimaryExpression {
        readonly kind: SyntaxKind.MetaProperty;
        readonly keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
        readonly name: Identifier;
    }

    /* @internal */
    export interface ImportMetaProperty extends MetaProperty {
        readonly keywordToken: SyntaxKind.ImportKeyword;
        readonly name: Identifier & { readonly escapedText: __String & "meta" };
    }

    /// A JSX expression of the form <TagName attrs>...</TagName>
    export interface JsxElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxElement;
        readonly openingElement: JsxOpeningElement;
        readonly children: NodeArray<JsxChild>;
        readonly closingElement: JsxClosingElement;
    }

    /// Either the opening tag in a <Tag>...</Tag> pair or the lone <Tag /> in a self-closing form
    export type JsxOpeningLikeElement =
        | JsxSelfClosingElement
        | JsxOpeningElement
        ;

    export type JsxAttributeLike =
        | JsxAttribute
        | JsxSpreadAttribute
        ;

    export type JsxTagNameExpression =
        | Identifier
        | ThisExpression
        | JsxTagNamePropertyAccess
        ;

    export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
        readonly expression: JsxTagNameExpression;
    }

    export interface JsxAttributes extends ObjectLiteralExpressionBase<JsxAttributeLike> {
        readonly kind: SyntaxKind.JsxAttributes;
        readonly parent: JsxOpeningLikeElement;
    }

    /// The opening element of a <Tag>...</Tag> JsxElement
    export interface JsxOpeningElement extends Expression {
        readonly kind: SyntaxKind.JsxOpeningElement;
        readonly parent: JsxElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }

    /// A JSX expression of the form <TagName attrs />
    export interface JsxSelfClosingElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxSelfClosingElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }

    /// A JSX expression of the form <>...</>
    export interface JsxFragment extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxFragment;
        readonly openingFragment: JsxOpeningFragment;
        readonly children: NodeArray<JsxChild>;
        readonly closingFragment: JsxClosingFragment;
    }

    /// The opening element of a <>...</> JsxFragment
    export interface JsxOpeningFragment extends Expression {
        readonly kind: SyntaxKind.JsxOpeningFragment;
        readonly parent: JsxFragment;
    }

    /// The closing element of a <>...</> JsxFragment
    export interface JsxClosingFragment extends Expression {
        readonly kind: SyntaxKind.JsxClosingFragment;
        readonly parent: JsxFragment;
    }

    export interface JsxAttribute extends ObjectLiteralElement {
        readonly kind: SyntaxKind.JsxAttribute;
        readonly parent: JsxAttributes;
        readonly name: Identifier;
        /// JSX attribute initializers are optional; <X y /> is sugar for <X y={true} />
        readonly initializer?: StringLiteral | JsxExpression;
    }

    export interface JsxSpreadAttribute extends ObjectLiteralElement {
        readonly kind: SyntaxKind.JsxSpreadAttribute;
        readonly parent: JsxAttributes;
        readonly expression: Expression;
    }

    export interface JsxClosingElement extends Node {
        readonly kind: SyntaxKind.JsxClosingElement;
        readonly parent: JsxElement;
        readonly tagName: JsxTagNameExpression;
    }

    export interface JsxExpression extends Expression {
        readonly kind: SyntaxKind.JsxExpression;
        readonly parent: JsxElement | JsxAttributeLike;
        readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        readonly expression?: Expression;
    }

    export interface JsxText extends LiteralLikeNode {
        readonly kind: SyntaxKind.JsxText;
        readonly parent: JsxElement;
        readonly containsOnlyTriviaWhiteSpaces: boolean;
    }

    export type JsxChild =
        | JsxText
        | JsxExpression
        | JsxElement
        | JsxSelfClosingElement
        | JsxFragment
        ;

    export interface Statement extends Node {
        _statementBrand: any;
    }

    // Represents a statement that is elided as part of a transformation to emit comments on a
    // not-emitted node.
    export interface NotEmittedStatement extends Statement {
        readonly kind: SyntaxKind.NotEmittedStatement;
    }

    /**
     * Marks the end of transformed declaration to properly emit exports.
     */
    /* @internal */
    export interface EndOfDeclarationMarker extends Statement {
        readonly kind: SyntaxKind.EndOfDeclarationMarker;
    }

    /**
     * A list of comma-separated expressions. This node is only created by transformations.
     */
    export interface CommaListExpression extends Expression {
        readonly kind: SyntaxKind.CommaListExpression;
        readonly elements: NodeArray<Expression>;
    }

    /**
     * Marks the beginning of a merged transformed declaration.
     */
    /* @internal */
    export interface MergeDeclarationMarker extends Statement {
        readonly kind: SyntaxKind.MergeDeclarationMarker;
    }

    /* @internal */
    export interface SyntheticReferenceExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.SyntheticReferenceExpression;
        readonly expression: Expression;
        readonly thisArg: Expression;
    }

    export interface EmptyStatement extends Statement {
        readonly kind: SyntaxKind.EmptyStatement;
    }

    export interface DebuggerStatement extends Statement {
        readonly kind: SyntaxKind.DebuggerStatement;
    }

    export interface MissingDeclaration extends DeclarationStatement {
        /*@internal*/ decorators?: NodeArray<Decorator>; // Present for use with reporting a grammar error
        /*@internal*/ modifiers?: ModifiersArray; // Present for use with reporting a grammar error
        readonly kind: SyntaxKind.MissingDeclaration;
        readonly name?: Identifier;
    }

    export type BlockLike =
        | SourceFile
        | Block
        | ModuleBlock
        | CaseOrDefaultClause
        ;

    export interface Block extends Statement {
        readonly kind: SyntaxKind.Block;
        readonly statements: NodeArray<Statement>;
        /*@internal*/ multiLine?: boolean;
    }

    export interface VariableStatement extends Statement, JSDocContainer {
        /* @internal*/ decorators?: NodeArray<Decorator>; // Present for use with reporting a grammar error
        readonly kind: SyntaxKind.VariableStatement;
        readonly declarationList: VariableDeclarationList;
    }

    export interface ExpressionStatement extends Statement, JSDocContainer {
        readonly kind: SyntaxKind.ExpressionStatement;
        readonly expression: Expression;
    }

    /* @internal */
    export interface PrologueDirective extends ExpressionStatement {
        readonly expression: StringLiteral;
    }

    export interface IfStatement extends Statement {
        readonly kind: SyntaxKind.IfStatement;
        readonly expression: Expression;
        readonly thenStatement: Statement;
        readonly elseStatement?: Statement;
    }

    export interface IterationStatement extends Statement {
        readonly statement: Statement;
    }

    export interface DoStatement extends IterationStatement {
        readonly kind: SyntaxKind.DoStatement;
        readonly expression: Expression;
    }

    export interface WhileStatement extends IterationStatement {
        readonly kind: SyntaxKind.WhileStatement;
        readonly expression: Expression;
    }

    export type ForInitializer =
        | VariableDeclarationList
        | Expression
        ;

    export interface ForStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForStatement;
        readonly initializer?: ForInitializer;
        readonly condition?: Expression;
        readonly incrementor?: Expression;
    }

    export type ForInOrOfStatement =
        | ForInStatement
        | ForOfStatement
        ;

    export interface ForInStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForInStatement;
        readonly initializer: ForInitializer;
        readonly expression: Expression;
    }

    export interface ForOfStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForOfStatement;
        readonly awaitModifier?: AwaitKeywordToken;
        readonly initializer: ForInitializer;
        readonly expression: Expression;
    }

    export interface BreakStatement extends Statement {
        readonly kind: SyntaxKind.BreakStatement;
        readonly label?: Identifier;
    }

    export interface ContinueStatement extends Statement {
        readonly kind: SyntaxKind.ContinueStatement;
        readonly label?: Identifier;
    }

    export type BreakOrContinueStatement =
        | BreakStatement
        | ContinueStatement
        ;

    export interface ReturnStatement extends Statement {
        readonly kind: SyntaxKind.ReturnStatement;
        readonly expression?: Expression;
    }

    export interface WithStatement extends Statement {
        readonly kind: SyntaxKind.WithStatement;
        readonly expression: Expression;
        readonly statement: Statement;
    }

    export interface SwitchStatement extends Statement {
        readonly kind: SyntaxKind.SwitchStatement;
        readonly expression: Expression;
        readonly caseBlock: CaseBlock;
        possiblyExhaustive?: boolean; // initialized by binding
    }

    export interface CaseBlock extends Node {
        readonly kind: SyntaxKind.CaseBlock;
        readonly parent: SwitchStatement;
        readonly clauses: NodeArray<CaseOrDefaultClause>;
    }

    export interface CaseClause extends Node {
        readonly kind: SyntaxKind.CaseClause;
        readonly parent: CaseBlock;
        readonly expression: Expression;
        readonly statements: NodeArray<Statement>;
        /* @internal */ fallthroughFlowNode?: FlowNode;
    }

    export interface DefaultClause extends Node {
        readonly kind: SyntaxKind.DefaultClause;
        readonly parent: CaseBlock;
        readonly statements: NodeArray<Statement>;
        /* @internal */ fallthroughFlowNode?: FlowNode;
    }

    export type CaseOrDefaultClause =
        | CaseClause
        | DefaultClause
        ;

    export interface LabeledStatement extends Statement, JSDocContainer {
        readonly kind: SyntaxKind.LabeledStatement;
        readonly label: Identifier;
        readonly statement: Statement;
    }

    export interface ThrowStatement extends Statement {
        readonly kind: SyntaxKind.ThrowStatement;
        readonly expression: Expression;
    }

    export interface TryStatement extends Statement {
        readonly kind: SyntaxKind.TryStatement;
        readonly tryBlock: Block;
        readonly catchClause?: CatchClause;
        readonly finallyBlock?: Block;
    }

    export interface CatchClause extends Node {
        readonly kind: SyntaxKind.CatchClause;
        readonly parent: TryStatement;
        readonly variableDeclaration?: VariableDeclaration;
        readonly block: Block;
    }

    export type ObjectTypeDeclaration =
        | ClassLikeDeclaration
        | InterfaceDeclaration
        | TypeLiteralNode
        ;

    export type DeclarationWithTypeParameters =
        | DeclarationWithTypeParameterChildren
        | JSDocTypedefTag
        | JSDocCallbackTag
        | JSDocSignature
        ;

    export type DeclarationWithTypeParameterChildren =
        | SignatureDeclaration
        | ClassLikeDeclaration
        | InterfaceDeclaration
        | TypeAliasDeclaration
        | JSDocTemplateTag
        ;

    export interface ClassLikeDeclarationBase extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression;
        readonly name?: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly heritageClauses?: NodeArray<HeritageClause>;
        readonly members: NodeArray<ClassElement>;
    }

    export interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
        readonly kind: SyntaxKind.ClassDeclaration;
        /** May be undefined in `export default class { ... }`. */
        readonly name?: Identifier;
    }

    export interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
        readonly kind: SyntaxKind.ClassExpression;
    }

    export type ClassLikeDeclaration =
        | ClassDeclaration
        | ClassExpression
        ;

    export interface ClassElement extends NamedDeclaration {
        _classElementBrand: any;
        readonly name?: PropertyName;
    }

    export interface TypeElement extends NamedDeclaration {
        _typeElementBrand: any;
        readonly name?: PropertyName;
        readonly questionToken?: QuestionToken;
    }

    export interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.InterfaceDeclaration;
        readonly name: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly heritageClauses?: NodeArray<HeritageClause>;
        readonly members: NodeArray<TypeElement>;
    }

    export interface HeritageClause extends Node {
        readonly kind: SyntaxKind.HeritageClause;
        readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
        readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
        readonly types: NodeArray<ExpressionWithTypeArguments>;
    }

    export interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.TypeAliasDeclaration;
        readonly name: Identifier;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly type: TypeNode;
    }

    export interface EnumMember extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.EnumMember;
        readonly parent: EnumDeclaration;
        // This does include ComputedPropertyName, but the parser will give an error
        // if it parses a ComputedPropertyName in an EnumMember
        readonly name: PropertyName;
        readonly initializer?: Expression;
    }

    export interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.EnumDeclaration;
        readonly name: Identifier;
        readonly members: NodeArray<EnumMember>;
    }

    export type ModuleName =
        | Identifier
        | StringLiteral
        ;

    export type ModuleBody =
        | NamespaceBody
        | JSDocNamespaceBody
        ;

    /* @internal */
    export interface AmbientModuleDeclaration extends ModuleDeclaration {
        readonly body?: ModuleBlock;
    }

    export interface ModuleDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ModuleDeclaration;
        readonly parent: ModuleBody | SourceFile;
        readonly name: ModuleName;
        readonly body?: ModuleBody | JSDocNamespaceDeclaration;
    }

    export type NamespaceBody =
        | ModuleBlock
        | NamespaceDeclaration
        ;

    export interface NamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body: NamespaceBody;
    }

    export type JSDocNamespaceBody =
        | Identifier
        | JSDocNamespaceDeclaration
        ;

    export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body?: JSDocNamespaceBody;
    }

    export interface ModuleBlock extends Node, Statement {
        readonly kind: SyntaxKind.ModuleBlock;
        readonly parent: ModuleDeclaration;
        readonly statements: NodeArray<Statement>;
    }

    export type ModuleReference =
        | EntityName
        | ExternalModuleReference
        ;

    /**
     * One of:
     * - import x = require("mod");
     * - import x = M.x;
     */
    export interface ImportEqualsDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ImportEqualsDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly name: Identifier;

        // 'EntityName' for an internal module reference, 'ExternalModuleReference' for an external
        // module reference.
        readonly moduleReference: ModuleReference;
    }

    export interface ExternalModuleReference extends Node {
        readonly kind: SyntaxKind.ExternalModuleReference;
        readonly parent: ImportEqualsDeclaration;
        readonly expression: Expression;
    }

    // In case of:
    // import "mod"  => importClause = undefined, moduleSpecifier = "mod"
    // In rest of the cases, module specifier is string literal corresponding to module
    // ImportClause information is shown at its declaration below.
    export interface ImportDeclaration extends Statement, JSDocContainer {
        readonly kind: SyntaxKind.ImportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly importClause?: ImportClause;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier: Expression;
    }

    export type NamedImportBindings =
        | NamespaceImport
        | NamedImports
        ;

    export type NamedExportBindings =
        | NamespaceExport
        | NamedExports
        ;

    // In case of:
    // import d from "mod" => name = d, namedBinding = undefined
    // import * as ns from "mod" => name = undefined, namedBinding: NamespaceImport = { name: ns }
    // import d, * as ns from "mod" => name = d, namedBinding: NamespaceImport = { name: ns }
    // import { a, b as x } from "mod" => name = undefined, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
    // import d, { a, b as x } from "mod" => name = d, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
    export interface ImportClause extends NamedDeclaration {
        readonly kind: SyntaxKind.ImportClause;
        readonly parent: ImportDeclaration;
        readonly isTypeOnly: boolean;
        readonly name?: Identifier; // Default binding
        readonly namedBindings?: NamedImportBindings;
    }

    export interface NamespaceImport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceImport;
        readonly parent: ImportClause;
        readonly name: Identifier;
    }

    export interface NamespaceExport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceExport;
        readonly parent: ExportDeclaration;
        readonly name: Identifier
    }

    export interface NamespaceExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.NamespaceExportDeclaration;
        readonly name: Identifier;
        /* @internal */ decorators?: NodeArray<Decorator>; // Present for use with reporting a grammar error
        /* @internal */ modifiers?: ModifiersArray; // Present for use with reporting a grammar error
    }

    export interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ExportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly isTypeOnly: boolean;
        /** Will not be assigned in the case of `export * from "foo";` */
        readonly exportClause?: NamedExportBindings;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier?: Expression;
    }

    export interface NamedImports extends Node {
        readonly kind: SyntaxKind.NamedImports;
        readonly parent: ImportClause;
        readonly elements: NodeArray<ImportSpecifier>;
    }

    export interface NamedExports extends Node {
        readonly kind: SyntaxKind.NamedExports;
        readonly parent: ExportDeclaration;
        readonly elements: NodeArray<ExportSpecifier>;
    }

    export type NamedImportsOrExports = NamedImports | NamedExports;

    export interface ImportSpecifier extends NamedDeclaration {
        readonly kind: SyntaxKind.ImportSpecifier;
        readonly parent: NamedImports;
        readonly propertyName?: Identifier;  // Name preceding "as" keyword (or undefined when "as" is absent)
        readonly name: Identifier;           // Declared name
    }

    export interface ExportSpecifier extends NamedDeclaration {
        readonly kind: SyntaxKind.ExportSpecifier;
        readonly parent: NamedExports;
        readonly propertyName?: Identifier;  // Name preceding "as" keyword (or undefined when "as" is absent)
        readonly name: Identifier;           // Declared name
    }

    export type ImportOrExportSpecifier =
        | ImportSpecifier
        | ExportSpecifier
        ;

    export type TypeOnlyCompatibleAliasDeclaration =
        | ImportClause
        | NamespaceImport
        | ImportOrExportSpecifier
        ;

    /**
     * This is either an `export =` or an `export default` declaration.
     * Unless `isExportEquals` is set, this node was parsed as an `export default`.
     */
    export interface ExportAssignment extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ExportAssignment;
        readonly parent: SourceFile;
        readonly isExportEquals?: boolean;
        readonly expression: Expression;
    }

    export interface FileReference extends TextRange {
        fileName: string;
    }

    export interface CheckJsDirective extends TextRange {
        enabled: boolean;
    }

    export type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;

    export interface CommentRange extends TextRange {
        hasTrailingNewLine?: boolean;
        kind: CommentKind;
    }

    export interface SynthesizedComment extends CommentRange {
        text: string;
        pos: -1;
        end: -1;
        hasLeadingNewline?: boolean;
    }

    // represents a top level: { type } expression in a JSDoc comment.
    export interface JSDocTypeExpression extends TypeNode {
        readonly kind: SyntaxKind.JSDocTypeExpression;
        readonly type: TypeNode;
    }

    export interface JSDocType extends TypeNode {
        _jsDocTypeBrand: any;
    }

    export interface JSDocAllType extends JSDocType {
        readonly kind: SyntaxKind.JSDocAllType;
    }

    export interface JSDocUnknownType extends JSDocType {
        readonly kind: SyntaxKind.JSDocUnknownType;
    }

    export interface JSDocNonNullableType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNonNullableType;
        readonly type: TypeNode;
    }

    export interface JSDocNullableType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNullableType;
        readonly type: TypeNode;
    }

    export interface JSDocOptionalType extends JSDocType {
        readonly kind: SyntaxKind.JSDocOptionalType;
        readonly type: TypeNode;
    }

    export interface JSDocFunctionType extends JSDocType, SignatureDeclarationBase {
        readonly kind: SyntaxKind.JSDocFunctionType;
    }

    export interface JSDocVariadicType extends JSDocType {
        readonly kind: SyntaxKind.JSDocVariadicType;
        readonly type: TypeNode;
    }

    export interface JSDocNamepathType extends JSDocType {
        readonly kind: SyntaxKind.JSDocNamepathType;
        readonly type: TypeNode;
    }

    export type JSDocTypeReferencingNode =
        | JSDocVariadicType
        | JSDocOptionalType
        | JSDocNullableType
        | JSDocNonNullableType
        ;

    export interface JSDoc extends Node {
        readonly kind: SyntaxKind.JSDocComment;
        readonly parent: HasJSDoc;
        readonly tags?: NodeArray<JSDocTag>;
        readonly comment?: string;
    }

    export interface JSDocTag extends Node {
        readonly parent: JSDoc | JSDocTypeLiteral;
        readonly tagName: Identifier;
        readonly comment?: string;
    }

    export interface JSDocUnknownTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTag;
    }

    /**
     * Note that `@extends` is a synonym of `@augments`.
     * Both tags are represented by this interface.
     */
    export interface JSDocAugmentsTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocAugmentsTag;
        readonly class: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression };
    }

    export interface JSDocImplementsTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocImplementsTag;
        readonly class: ExpressionWithTypeArguments & { readonly expression: Identifier | PropertyAccessEntityNameExpression };
    }

    export interface JSDocAuthorTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocAuthorTag;
    }

    export interface JSDocDeprecatedTag extends JSDocTag {
        kind: SyntaxKind.JSDocDeprecatedTag;
    }

    export interface JSDocClassTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocClassTag;
    }

    export interface JSDocPublicTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocPublicTag;
    }

    export interface JSDocPrivateTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocPrivateTag;
    }

    export interface JSDocProtectedTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocProtectedTag;
    }

    export interface JSDocReadonlyTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocReadonlyTag;
    }

    export interface JSDocEnumTag extends JSDocTag, Declaration {
        readonly kind: SyntaxKind.JSDocEnumTag;
        readonly parent: JSDoc;
        readonly typeExpression?: JSDocTypeExpression;
    }

    export interface JSDocThisTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocThisTag;
        readonly typeExpression?: JSDocTypeExpression;
    }

    export interface JSDocTemplateTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTemplateTag;
        readonly constraint: JSDocTypeExpression | undefined;
        readonly typeParameters: NodeArray<TypeParameterDeclaration>;
    }

    export interface JSDocReturnTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocReturnTag;
        readonly typeExpression?: JSDocTypeExpression;
    }

    export interface JSDocTypeTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTypeTag;
        readonly typeExpression: JSDocTypeExpression;
    }

    export interface JSDocTypedefTag extends JSDocTag, NamedDeclaration {
        readonly kind: SyntaxKind.JSDocTypedefTag;
        readonly parent: JSDoc;
        readonly fullName?: JSDocNamespaceDeclaration | Identifier;
        readonly name?: Identifier;
        readonly typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
    }

    export interface JSDocCallbackTag extends JSDocTag, NamedDeclaration {
        readonly kind: SyntaxKind.JSDocCallbackTag;
        readonly parent: JSDoc;
        readonly fullName?: JSDocNamespaceDeclaration | Identifier;
        readonly name?: Identifier;
        readonly typeExpression: JSDocSignature;
    }

    export interface JSDocSignature extends JSDocType, Declaration {
        readonly kind: SyntaxKind.JSDocSignature;
        readonly typeParameters?: readonly JSDocTemplateTag[];
        readonly parameters: readonly JSDocParameterTag[];
        readonly type: JSDocReturnTag | undefined;
    }

    export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
        readonly parent: JSDoc;
        readonly name: EntityName;
        readonly typeExpression?: JSDocTypeExpression;
        /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
        readonly isNameFirst: boolean;
        readonly isBracketed: boolean;
    }

    export interface JSDocPropertyTag extends JSDocPropertyLikeTag {
        readonly kind: SyntaxKind.JSDocPropertyTag;
    }

    export interface JSDocParameterTag extends JSDocPropertyLikeTag {
        readonly kind: SyntaxKind.JSDocParameterTag;
    }

    export interface JSDocTypeLiteral extends JSDocType {
        readonly kind: SyntaxKind.JSDocTypeLiteral;
        readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
        /** If true, then this type literal represents an *array* of its type. */
        readonly isArrayType: boolean;
    }

    // NOTE: Ensure this is up-to-date with src/debug/debug.ts
    export const enum FlowFlags {
        Unreachable    = 1 << 0,  // Unreachable code
        Start          = 1 << 1,  // Start of flow graph
        BranchLabel    = 1 << 2,  // Non-looping junction
        LoopLabel      = 1 << 3,  // Looping junction
        Assignment     = 1 << 4,  // Assignment
        TrueCondition  = 1 << 5,  // Condition known to be true
        FalseCondition = 1 << 6,  // Condition known to be false
        SwitchClause   = 1 << 7,  // Switch statement clause
        ArrayMutation  = 1 << 8,  // Potential array mutation
        Call           = 1 << 9,  // Potential assertion call
        ReduceLabel    = 1 << 10, // Temporarily reduce antecedents of label
        Referenced     = 1 << 11, // Referenced as antecedent once
        Shared         = 1 << 12, // Referenced as antecedent more than once

        Label = BranchLabel | LoopLabel,
        Condition = TrueCondition | FalseCondition,
    }

    export type FlowNode =
        | FlowStart
        | FlowLabel
        | FlowAssignment
        | FlowCall
        | FlowCondition
        | FlowSwitchClause
        | FlowArrayMutation
        | FlowCall
        | FlowReduceLabel;

    export interface FlowNodeBase {
        flags: FlowFlags;
        id?: number;     // Node id used by flow type cache in checker
    }

    // FlowStart represents the start of a control flow. For a function expression or arrow
    // function, the node property references the function (which in turn has a flowNode
    // property for the containing control flow).
    export interface FlowStart extends FlowNodeBase {
        node?: FunctionExpression | ArrowFunction | MethodDeclaration;
    }

    // FlowLabel represents a junction with multiple possible preceding control flows.
    export interface FlowLabel extends FlowNodeBase {
        antecedents: FlowNode[] | undefined;
    }

    // FlowAssignment represents a node that assigns a value to a narrowable reference,
    // i.e. an identifier or a dotted name that starts with an identifier or 'this'.
    export interface FlowAssignment extends FlowNodeBase {
        node: Expression | VariableDeclaration | BindingElement;
        antecedent: FlowNode;
    }

    export interface FlowCall extends FlowNodeBase {
        node: CallExpression;
        antecedent: FlowNode;
    }

    // FlowCondition represents a condition that is known to be true or false at the
    // node's location in the control flow.
    export interface FlowCondition extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }

    export interface FlowSwitchClause extends FlowNodeBase {
        switchStatement: SwitchStatement;
        clauseStart: number;   // Start index of case/default clause range
        clauseEnd: number;     // End index of case/default clause range
        antecedent: FlowNode;
    }

    // FlowArrayMutation represents a node potentially mutates an array, i.e. an
    // operation of the form 'x.push(value)', 'x.unshift(value)' or 'x[n] = value'.
    export interface FlowArrayMutation extends FlowNodeBase {
        node: CallExpression | BinaryExpression;
        antecedent: FlowNode;
    }

    export interface FlowReduceLabel extends FlowNodeBase {
        target: FlowLabel;
        antecedents: FlowNode[];
        antecedent: FlowNode;
    }

    export type FlowType = Type | IncompleteType;

    // Incomplete types occur during control flow analysis of loops. An IncompleteType
    // is distinguished from a regular type by a flags value of zero. Incomplete type
    // objects are internal to the getFlowTypeOfReference function and never escape it.
    export interface IncompleteType {
        flags: TypeFlags;  // No flags set
        type: Type;        // The type marked incomplete
    }

    export interface AmdDependency {
        path: string;
        name?: string;
    }

    /* @internal */
    /**
     * Subset of properties from SourceFile that are used in multiple utility functions
     */
    export interface SourceFileLike {
        readonly text: string;
        lineMap?: readonly number[];
        /* @internal */
        getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
    }


    /* @internal */
    export interface RedirectInfo {
        /** Source file this redirects to. */
        readonly redirectTarget: SourceFile;
        /**
         * Source file for the duplicate package. This will not be used by the Program,
         * but we need to keep this around so we can watch for changes in underlying.
         */
        readonly unredirected: SourceFile;
    }

    // Source files are declarations when they are external modules.
    export interface SourceFile extends Declaration {
        readonly kind: SyntaxKind.SourceFile;
        readonly statements: NodeArray<Statement>;
        readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;

        fileName: string;
        /* @internal */ path: Path;
        text: string;
        /** Resolved path can be different from path property,
         * when file is included through project reference is mapped to its output instead of source
         * in that case resolvedPath = path to output file
         * path = input file's path
         */
        /* @internal */ resolvedPath: Path;
        /** Original file name that can be different from fileName,
         * when file is included through project reference is mapped to its output instead of source
         * in that case originalFileName = name of input file
         * fileName = output file's name
         */
        /* @internal */ originalFileName: string;

        /**
         * If two source files are for the same version of the same package, one will redirect to the other.
         * (See `createRedirectSourceFile` in program.ts.)
         * The redirect will have this set. The redirected-to source file will be in `redirectTargetsMap`.
         */
        /* @internal */ redirectInfo?: RedirectInfo;

        amdDependencies: readonly AmdDependency[];
        moduleName?: string;
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly FileReference[];
        libReferenceDirectives: readonly FileReference[];
        languageVariant: LanguageVariant;
        isDeclarationFile: boolean;

        // this map is used by transpiler to supply alternative names for dependencies (i.e. in case of bundling)
        /* @internal */
        renamedDependencies?: ReadonlyMap<string, string>;

        /**
         * lib.d.ts should have a reference comment like
         *
         *  /// <reference no-default-lib="true"/>
         *
         * If any other file has this comment, it signals not to include lib.d.ts
         * because this containing file is intended to act as a default library.
         */
        hasNoDefaultLib: boolean;

        languageVersion: ScriptTarget;
        /* @internal */ scriptKind: ScriptKind;

        /**
         * The first "most obvious" node that makes a file an external module.
         * This is intended to be the first top-level import/export,
         * but could be arbitrarily nested (e.g. `import.meta`).
         */
        /* @internal */ externalModuleIndicator?: Node;
        // The first node that causes this file to be a CommonJS module
        /* @internal */ commonJsModuleIndicator?: Node;
        // JS identifier-declarations that are intended to merge with globals
        /* @internal */ jsGlobalAugmentations?: SymbolTable;

        /* @internal */ identifiers: Map<string, string>; // Map from a string to an interned string
        /* @internal */ nodeCount: number;
        /* @internal */ identifierCount: number;
        /* @internal */ symbolCount: number;

        // File-level diagnostics reported by the parser (includes diagnostics about /// references
        // as well as code diagnostics).
        /* @internal */ parseDiagnostics: DiagnosticWithLocation[];

        // File-level diagnostics reported by the binder.
        /* @internal */ bindDiagnostics: DiagnosticWithLocation[];
        /* @internal */ bindSuggestionDiagnostics?: DiagnosticWithLocation[];

        // File-level JSDoc diagnostics reported by the JSDoc parser
        /* @internal */ jsDocDiagnostics?: DiagnosticWithLocation[];

        // Stores additional file-level diagnostics reported by the program
        /* @internal */ additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[];

        // Stores a line map for the file.
        // This field should never be used directly to obtain line map, use getLineMap function instead.
        /* @internal */ lineMap: readonly number[];
        /* @internal */ classifiableNames?: ReadonlySet<__String>;
        // Comments containing @ts-* directives, in order.
        /* @internal */ commentDirectives?: CommentDirective[];
        // Stores a mapping 'external module reference text' -> 'resolved file name' | undefined
        // It is used to resolve module names in the checker.
        // Content of this field should never be used directly - use getResolvedModuleFileName/setResolvedModuleFileName functions instead
        /* @internal */ resolvedModules?: Map<string, ResolvedModuleFull | undefined>;
        /* @internal */ resolvedTypeReferenceDirectiveNames: Map<string, ResolvedTypeReferenceDirective | undefined>;
        /* @internal */ imports: readonly StringLiteralLike[];
        // Identifier only if `declare global`
        /* @internal */ moduleAugmentations: readonly (StringLiteral | Identifier)[];
        /* @internal */ patternAmbientModules?: PatternAmbientModule[];
        /* @internal */ ambientModuleNames: readonly string[];
        /* @internal */ checkJsDirective?: CheckJsDirective;
        /* @internal */ version: string;
        /* @internal */ pragmas: ReadonlyPragmaMap;
        /* @internal */ localJsxNamespace?: __String;
        /* @internal */ localJsxFragmentNamespace?: __String;
        /* @internal */ localJsxFactory?: EntityName;
        /* @internal */ localJsxFragmentFactory?: EntityName;

        /* @internal */ exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
    }

    /* @internal */
    export interface CommentDirective {
        range: TextRange;
        type: CommentDirectiveType,
    }

    /* @internal */
    export const enum CommentDirectiveType {
        ExpectError,
        Ignore,
    }

    /*@internal*/
    export type ExportedModulesFromDeclarationEmit = readonly Symbol[];

    export interface Bundle extends Node {
        readonly kind: SyntaxKind.Bundle;
        readonly prepends: readonly (InputFiles | UnparsedSource)[];
        readonly sourceFiles: readonly SourceFile[];
        /* @internal */ syntheticFileReferences?: readonly FileReference[];
        /* @internal */ syntheticTypeReferences?: readonly FileReference[];
        /* @internal */ syntheticLibReferences?: readonly FileReference[];
        /* @internal */ hasNoDefaultLib?: boolean;
    }

    export interface InputFiles extends Node {
        readonly kind: SyntaxKind.InputFiles;
        javascriptPath?: string;
        javascriptText: string;
        javascriptMapPath?: string;
        javascriptMapText?: string;
        declarationPath?: string;
        declarationText: string;
        declarationMapPath?: string;
        declarationMapText?: string;
        /*@internal*/ buildInfoPath?: string;
        /*@internal*/ buildInfo?: BuildInfo;
        /*@internal*/ oldFileOfCurrentEmit?: boolean;
    }

    export interface UnparsedSource extends Node {
        readonly kind: SyntaxKind.UnparsedSource;
        fileName: string;
        text: string;
        readonly prologues: readonly UnparsedPrologue[];
        helpers: readonly UnscopedEmitHelper[] | undefined;

        // References and noDefaultLibAre Dts only
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly string[] | undefined;
        libReferenceDirectives: readonly FileReference[];
        hasNoDefaultLib?: boolean;

        sourceMapPath?: string;
        sourceMapText?: string;
        readonly syntheticReferences?: readonly UnparsedSyntheticReference[];
        readonly texts: readonly UnparsedSourceText[];
        /*@internal*/ oldFileOfCurrentEmit?: boolean;
        /*@internal*/ parsedSourceMap?: RawSourceMap | false | undefined;
        // Adding this to satisfy services, fix later
        /*@internal*/
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }

    export type UnparsedSourceText =
        | UnparsedPrepend
        | UnparsedTextLike
        ;

    export type UnparsedNode =
        | UnparsedPrologue
        | UnparsedSourceText
        | UnparsedSyntheticReference
        ;

    export interface UnparsedSection extends Node {
        readonly kind: SyntaxKind;
        readonly parent: UnparsedSource;
        readonly data?: string;
    }

    export interface UnparsedPrologue extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedPrologue;
        readonly parent: UnparsedSource;
        readonly data: string;
    }

    export interface UnparsedPrepend extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedPrepend;
        readonly parent: UnparsedSource;
        readonly data: string;
        readonly texts: readonly UnparsedTextLike[];
    }

    export interface UnparsedTextLike extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedText | SyntaxKind.UnparsedInternalText;
        readonly parent: UnparsedSource;
    }

    export interface UnparsedSyntheticReference extends UnparsedSection {
        readonly kind: SyntaxKind.UnparsedSyntheticReference;
        readonly parent: UnparsedSource;
        /*@internal*/ readonly section: BundleFileHasNoDefaultLib | BundleFileReference;
    }

    export interface JsonSourceFile extends SourceFile {
        readonly statements: NodeArray<JsonObjectExpressionStatement>;
    }

    export interface TsConfigSourceFile extends JsonSourceFile {
        extendedSourceFiles?: string[];
    }

    export interface JsonMinusNumericLiteral extends PrefixUnaryExpression {
        readonly kind: SyntaxKind.PrefixUnaryExpression;
        readonly operator: SyntaxKind.MinusToken;
        readonly operand: NumericLiteral;
    }

    export type JsonObjectExpression =
        | ObjectLiteralExpression
        | ArrayLiteralExpression
        | JsonMinusNumericLiteral
        | NumericLiteral
        | StringLiteral
        | BooleanLiteral
        | NullLiteral
        ;

    export interface JsonObjectExpressionStatement extends ExpressionStatement {
        readonly expression: JsonObjectExpression;
    }

    export interface ScriptReferenceHost {
        getCompilerOptions(): CompilerOptions;
        getSourceFile(fileName: string): SourceFile | undefined;
        getSourceFileByPath(path: Path): SourceFile | undefined;
        getCurrentDirectory(): string;
    }

    export interface ParseConfigHost {
        useCaseSensitiveFileNames: boolean;

        readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];

        /**
         * Gets a value indicating whether the specified path exists and is a file.
         * @param path The path to test.
         */
        fileExists(path: string): boolean;

        readFile(path: string): string | undefined;
        trace?(s: string): void;
    }

    /**
     * Branded string for keeping track of when we've turned an ambiguous path
     * specified like "./blah" to an absolute path to an actual
     * tsconfig file, e.g. "/root/blah/tsconfig.json"
     */
    export type ResolvedConfigFileName = string & { _isResolvedConfigFileName: never };

    export type WriteFileCallback = (
        fileName: string,
        data: string,
        writeByteOrderMark: boolean,
        onError?: (message: string) => void,
        sourceFiles?: readonly SourceFile[],
    ) => void;

    export class OperationCanceledException { }

    export interface CancellationToken {
        isCancellationRequested(): boolean;

        /** @throws OperationCanceledException if isCancellationRequested is true */
        throwIfCancellationRequested(): void;
    }

    /*@internal*/
    export enum RefFileKind {
        Import,
        ReferenceFile,
        TypeReferenceDirective
    }

    /*@internal*/
    export interface RefFile {
        referencedFileName: string;
        kind: RefFileKind;
        index: number;
        file: Path;
    }

    export interface Program extends ScriptReferenceHost {
        getCurrentDirectory(): string;
        /**
         * Get a list of root file names that were passed to a 'createProgram'
         */
        getRootFileNames(): readonly string[];

        /**
         * Get a list of files in the program
         */
        getSourceFiles(): readonly SourceFile[];

        /**
         * Get a list of file names that were passed to 'createProgram' or referenced in a
         * program source file but could not be located.
         */
        /* @internal */
        getMissingFilePaths(): readonly Path[];
        /* @internal */
        getRefFileMap(): MultiMap<Path, RefFile> | undefined;
        /* @internal */
        getFilesByNameMap(): Map<string, SourceFile | false | undefined>;

        /**
         * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
         * the JavaScript and declaration files will be produced for all the files in this program.
         * If targetSourceFile is specified, then only the JavaScript and declaration for that
         * specific file will be generated.
         *
         * If writeFile is not specified then the writeFile callback from the compiler host will be
         * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
         * will be invoked when writing the JavaScript and declaration files.
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        /*@internal*/
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers, forceDtsEmit?: boolean): EmitResult; // eslint-disable-line @typescript-eslint/unified-signatures

        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /** The first time this is called, it will return global diagnostics (no location). */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        /* @internal */ getSuggestionDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];

        /* @internal */ getBindAndCheckDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /* @internal */ getProgramDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];

        /**
         * Gets a type checker that can be used to semantically analyze source files in the program.
         */
        getTypeChecker(): TypeChecker;

        /* @internal */ getCommonSourceDirectory(): string;

        // For testing purposes only.  Should not be used by any other consumers (including the
        // language service).
        /* @internal */ getDiagnosticsProducingTypeChecker(): TypeChecker;
        /* @internal */ dropDiagnosticsProducingTypeChecker(): void;

        /* @internal */ getClassifiableNames(): Set<__String>;

        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        getInstantiationCount(): number;
        getRelationCacheSizes(): { assignable: number, identity: number, subtype: number, strictSubtype: number };

        /* @internal */ getFileProcessingDiagnostics(): DiagnosticCollection;
        /* @internal */ getResolvedTypeReferenceDirectives(): Map<string, ResolvedTypeReferenceDirective | undefined>;
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        isSourceFileDefaultLibrary(file: SourceFile): boolean;

        // For testing purposes only.
        /* @internal */ structureIsReused?: StructureIsReused;

        /* @internal */ getSourceFileFromReference(referencingFile: SourceFile | UnparsedSource, ref: FileReference): SourceFile | undefined;
        /* @internal */ getLibFileFromReference(ref: FileReference): SourceFile | undefined;

        /** Given a source file, get the name of the package it was imported from. */
        /* @internal */ sourceFileToPackageName: Map<string, string>;
        /** Set of all source files that some other source file redirects to. */
        /* @internal */ redirectTargetsMap: MultiMap<string, string>;
        /** Is the file emitted file */
        /* @internal */ isEmittedFile(file: string): boolean;

        /* @internal */ getResolvedModuleWithFailedLookupLocationsFromCache(moduleName: string, containingFile: string): ResolvedModuleWithFailedLookupLocations | undefined;

        getProjectReferences(): readonly ProjectReference[] | undefined;
        getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
        /*@internal*/ getProjectReferenceRedirect(fileName: string): string | undefined;
        /*@internal*/ getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined;
        /*@internal*/ forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference | undefined, resolvedProjectReferencePath: Path) => T | undefined): T | undefined;
        /*@internal*/ getResolvedProjectReferenceByPath(projectReferencePath: Path): ResolvedProjectReference | undefined;
        /*@internal*/ isSourceOfProjectReferenceRedirect(fileName: string): boolean;
        /*@internal*/ getProgramBuildInfo?(): ProgramBuildInfo | undefined;
        /*@internal*/ emitBuildInfo(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult;
        /*@internal*/ getProbableSymlinks(): ReadonlyMap<string, string>;
        /**
         * This implementation handles file exists to be true if file is source of project reference redirect when program is created using useSourceOfProjectReferenceRedirect
         */
        /*@internal*/ fileExists(fileName: string): boolean;
    }

    /*@internal*/
    export interface Program extends TypeCheckerHost, ModuleSpecifierResolutionHost {
    }

    /* @internal */
    export type RedirectTargetsMap = ReadonlyMap<string, readonly string[]>;

    export interface ResolvedProjectReference {
        commandLine: ParsedCommandLine;
        sourceFile: SourceFile;
        references?: readonly (ResolvedProjectReference | undefined)[];
    }

    /* @internal */
    export const enum StructureIsReused {
        Not         = 0,
        SafeModules = 1 << 0,
        Completely  = 1 << 1,
    }

    export type CustomTransformerFactory = (context: TransformationContext) => CustomTransformer;

    export interface CustomTransformer {
        transformSourceFile(node: SourceFile): SourceFile;
        transformBundle(node: Bundle): Bundle;
    }

    export interface CustomTransformers {
        /** Custom transformers to evaluate before built-in .js transformations. */
        before?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
        /** Custom transformers to evaluate after built-in .js transformations. */
        after?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
        /** Custom transformers to evaluate after built-in .d.ts transformations. */
        afterDeclarations?: (TransformerFactory<Bundle | SourceFile> | CustomTransformerFactory)[];
    }

    /*@internal*/
    export interface EmitTransformers {
        scriptTransformers: readonly TransformerFactory<SourceFile | Bundle>[];
        declarationTransformers: readonly TransformerFactory<SourceFile | Bundle>[];
    }

    export interface SourceMapSpan {
        /** Line number in the .js file. */
        emittedLine: number;
        /** Column number in the .js file. */
        emittedColumn: number;
        /** Line number in the .ts file. */
        sourceLine: number;
        /** Column number in the .ts file. */
        sourceColumn: number;
        /** Optional name (index into names array) associated with this span. */
        nameIndex?: number;
        /** .ts file (index into sources array) associated with this span */
        sourceIndex: number;
    }

    /* @internal */
    export interface SourceMapEmitResult {
        inputSourceFileNames: readonly string[];      // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
        sourceMap: RawSourceMap;
    }

    /** Return code used by getEmitOutput function to indicate status of the function */
    export enum ExitStatus {
        // Compiler ran successfully.  Either this was a simple do-nothing compilation (for example,
        // when -version or -help was provided, or this was a normal compilation, no diagnostics
        // were produced, and all outputs were generated successfully.
        Success = 0,

        // Diagnostics were produced and because of them no code was generated.
        DiagnosticsPresent_OutputsSkipped = 1,

        // Diagnostics were produced and outputs were generated in spite of them.
        DiagnosticsPresent_OutputsGenerated = 2,

        // When build skipped because passed in project is invalid
        InvalidProject_OutputsSkipped = 3,

        // When build is skipped because project references form cycle
        ProjectReferenceCycle_OutputsSkipped = 4,

        /** @deprecated Use ProjectReferenceCycle_OutputsSkipped instead. */
        ProjectReferenceCycle_OutputsSkupped = 4,
    }

    export interface EmitResult {
        emitSkipped: boolean;
        /** Contains declaration emit diagnostics */
        diagnostics: readonly Diagnostic[];
        emittedFiles?: string[]; // Array of files the compiler wrote to disk
        /* @internal */ sourceMaps?: SourceMapEmitResult[];  // Array of sourceMapData if compiler emitted sourcemaps
        /* @internal */ exportedModulesFromDeclarationEmit?: ExportedModulesFromDeclarationEmit;
    }

    /* @internal */
    export interface TypeCheckerHost extends ModuleSpecifierResolutionHost {
        getCompilerOptions(): CompilerOptions;

        getSourceFiles(): readonly SourceFile[];
        getSourceFile(fileName: string): SourceFile | undefined;
        getResolvedTypeReferenceDirectives(): ReadonlyMap<string, ResolvedTypeReferenceDirective | undefined>;
        getProjectReferenceRedirect(fileName: string): string | undefined;
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;

        readonly redirectTargetsMap: RedirectTargetsMap;
    }

    export interface TypeChecker {
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
        getPrivateIdentifierPropertyOfType(leftType: Type, name: string, location: Node): Symbol | undefined;
        /* @internal */ getTypeOfPropertyOfType(type: Type, propertyName: string): Type | undefined;
        getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
        getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
        getBaseTypes(type: InterfaceType): BaseType[];
        getBaseTypeOfLiteralType(type: Type): Type;
        getWidenedType(type: Type): Type;
        /* @internal */
        getPromisedTypeOfPromise(promise: Type, errorNode?: Node): Type | undefined;
        /* @internal */
        getAwaitedType(type: Type): Type | undefined;
        getReturnTypeOfSignature(signature: Signature): Type;
        /**
         * Gets the type of a parameter at a given position in a signature.
         * Returns `any` if the index is not valid.
         */
        /* @internal */ getParameterType(signature: Signature, parameterIndex: number): Type;
        getNullableType(type: Type, flags: TypeFlags): Type;
        getNonNullableType(type: Type): Type;
        /* @internal */ getNonOptionalType(type: Type): Type;
        /* @internal */ isNullableType(type: Type): boolean;
        getTypeArguments(type: TypeReference): readonly Type[];

        // TODO: GH#18217 `xToDeclaration` calls are frequently asserted as defined.
        /** Note that the resulting nodes cannot be checked. */
        typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeNode | undefined;
        /* @internal */ typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, tracker?: SymbolTracker): TypeNode | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        /** Note that the resulting nodes cannot be checked. */
        signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): SignatureDeclaration & {typeArguments?: NodeArray<TypeNode>} | undefined;
        /* @internal */ signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, tracker?: SymbolTracker): SignatureDeclaration & {typeArguments?: NodeArray<TypeNode>} | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        /** Note that the resulting nodes cannot be checked. */
        indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, kind: IndexKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): IndexSignatureDeclaration | undefined;
        /* @internal */ indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, kind: IndexKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, tracker?: SymbolTracker): IndexSignatureDeclaration | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        /** Note that the resulting nodes cannot be checked. */
        symbolToEntityName(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): EntityName | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToExpression(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): Expression | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToTypeParameterDeclarations(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): NodeArray<TypeParameterDeclaration> | undefined;
        /** Note that the resulting nodes cannot be checked. */
        symbolToParameterDeclaration(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): ParameterDeclaration | undefined;
        /** Note that the resulting nodes cannot be checked. */
        typeParameterToDeclaration(parameter: TypeParameter, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeParameterDeclaration | undefined;

        getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
        getSymbolAtLocation(node: Node): Symbol | undefined;
        getSymbolsOfParameterPropertyDeclaration(parameter: ParameterDeclaration, parameterName: string): Symbol[];
        /**
         * The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
         * This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.
         */
        getShorthandAssignmentValueSymbol(location: Node): Symbol | undefined;
        getExportSpecifierLocalTargetSymbol(location: ExportSpecifier): Symbol | undefined;
        /**
         * If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
         * Otherwise returns its input.
         * For example, at `export type T = number;`:
         *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
         *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
         *     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.
         */
        getExportSymbolOfSymbol(symbol: Symbol): Symbol;
        getPropertySymbolOfDestructuringAssignment(location: Identifier): Symbol | undefined;
        getTypeOfAssignmentPattern(pattern: AssignmentPattern): Type;
        getTypeAtLocation(node: Node): Type;
        getTypeFromTypeNode(node: TypeNode): Type;

        signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
        typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
        symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): string;
        typePredicateToString(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;

        /* @internal */ writeSignature(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind, writer?: EmitTextWriter): string;
        /* @internal */ writeType(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter): string;
        /* @internal */ writeSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, writer?: EmitTextWriter): string;
        /* @internal */ writeTypePredicate(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter): string;

        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];

        getRootSymbols(symbol: Symbol): readonly Symbol[];
        getContextualType(node: Expression): Type | undefined;
        /* @internal */ getContextualType(node: Expression, contextFlags?: ContextFlags): Type | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        /* @internal */ getContextualTypeForObjectLiteralElement(element: ObjectLiteralElementLike): Type | undefined;
        /* @internal */ getContextualTypeForArgumentAtIndex(call: CallLikeExpression, argIndex: number): Type | undefined;
        /* @internal */ getContextualTypeForJsxAttribute(attribute: JsxAttribute | JsxSpreadAttribute): Type | undefined;
        /* @internal */ isContextSensitive(node: Expression | MethodDeclaration | ObjectLiteralElementLike | JsxAttributeLike): boolean;

        /**
         * returns unknownSignature in the case of an error.
         * returns undefined if the node is not valid.
         * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
         */
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
        /* @internal */ getResolvedSignatureForSignatureHelp(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
        /* @internal */ getExpandedParameters(sig: Signature): readonly (readonly Symbol[])[];
        /* @internal */ hasEffectiveRestParameter(sig: Signature): boolean;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;
        isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        isUnknownSymbol(symbol: Symbol): boolean;
        /* @internal */ getMergedSymbol(symbol: Symbol): Symbol;

        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName | ImportTypeNode, propertyName: string): boolean;
        /** Exclude accesses to private properties or methods with a `this` parameter that `type` doesn't satisfy. */
        /* @internal */ isValidPropertyAccessForCompletions(node: PropertyAccessExpression | ImportTypeNode | QualifiedName, type: Type, property: Symbol): boolean;
        /** Follow all aliases to get the original symbol. */
        getAliasedSymbol(symbol: Symbol): Symbol;
        /** Follow a *single* alias to get the immediately aliased symbol. */
        /* @internal */ getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined;
        getExportsOfModule(moduleSymbol: Symbol): Symbol[];
        /** Unlike `getExportsOfModule`, this includes properties of an `export =` value. */
        /* @internal */ getExportsAndPropertiesOfModule(moduleSymbol: Symbol): Symbol[];
        getJsxIntrinsicTagNamesAt(location: Node): Symbol[];
        isOptionalParameter(node: ParameterDeclaration): boolean;
        getAmbientModules(): Symbol[];

        tryGetMemberInModuleExports(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
        /**
         * Unlike `tryGetMemberInModuleExports`, this includes properties of an `export =` value.
         * Does *not* return properties of primitive types.
         */
        /* @internal */ tryGetMemberInModuleExportsAndProperties(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
        getApparentType(type: Type): Type;
        /* @internal */ getSuggestedSymbolForNonexistentProperty(name: Identifier | PrivateIdentifier | string, containingType: Type): Symbol | undefined;
        /* @internal */ getSuggestedSymbolForNonexistentJSXAttribute(name: Identifier | string, containingType: Type): Symbol | undefined;
        /* @internal */ getSuggestionForNonexistentProperty(name: Identifier | PrivateIdentifier | string, containingType: Type): string | undefined;
        /* @internal */ getSuggestedSymbolForNonexistentSymbol(location: Node, name: string, meaning: SymbolFlags): Symbol | undefined;
        /* @internal */ getSuggestionForNonexistentSymbol(location: Node, name: string, meaning: SymbolFlags): string | undefined;
        /* @internal */ getSuggestedSymbolForNonexistentModule(node: Identifier, target: Symbol): Symbol | undefined;
        /* @internal */ getSuggestionForNonexistentExport(node: Identifier, target: Symbol): string | undefined;
        getBaseConstraintOfType(type: Type): Type | undefined;
        getDefaultFromTypeParameter(type: Type): Type | undefined;

        /* @internal */ getAnyType(): Type;
        /* @internal */ getStringType(): Type;
        /* @internal */ getNumberType(): Type;
        /* @internal */ getBooleanType(): Type;
        /* @internal */ getFalseType(fresh?: boolean): Type;
        /* @internal */ getTrueType(fresh?: boolean): Type;
        /* @internal */ getVoidType(): Type;
        /* @internal */ getUndefinedType(): Type;
        /* @internal */ getNullType(): Type;
        /* @internal */ getESSymbolType(): Type;
        /* @internal */ getNeverType(): Type;
        /* @internal */ getOptionalType(): Type;
        /* @internal */ getUnionType(types: Type[], subtypeReduction?: UnionReduction): Type;
        /* @internal */ createArrayType(elementType: Type): Type;
        /* @internal */ getElementTypeOfArrayType(arrayType: Type): Type | undefined;
        /* @internal */ createPromiseType(type: Type): Type;

        /* @internal */ isTypeAssignableTo(source: Type, target: Type): boolean;
        /* @internal */ createAnonymousType(symbol: Symbol | undefined, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], stringIndexInfo: IndexInfo | undefined, numberIndexInfo: IndexInfo | undefined): Type;
        /* @internal */ createSignature(
            declaration: SignatureDeclaration,
            typeParameters: readonly TypeParameter[] | undefined,
            thisParameter: Symbol | undefined,
            parameters: readonly Symbol[],
            resolvedReturnType: Type,
            typePredicate: TypePredicate | undefined,
            minArgumentCount: number,
            flags: SignatureFlags
        ): Signature;
        /* @internal */ createSymbol(flags: SymbolFlags, name: __String): TransientSymbol;
        /* @internal */ createIndexInfo(type: Type, isReadonly: boolean, declaration?: SignatureDeclaration): IndexInfo;
        /* @internal */ isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
        /* @internal */ tryFindAmbientModuleWithoutAugmentations(moduleName: string): Symbol | undefined;

        /* @internal */ getSymbolWalker(accept?: (symbol: Symbol) => boolean): SymbolWalker;

        // Should not be called directly.  Should only be accessed through the Program instance.
        /* @internal */ getDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): Diagnostic[];
        /* @internal */ getGlobalDiagnostics(): Diagnostic[];
        /* @internal */ getEmitResolver(sourceFile?: SourceFile, cancellationToken?: CancellationToken): EmitResolver;

        /* @internal */ getNodeCount(): number;
        /* @internal */ getIdentifierCount(): number;
        /* @internal */ getSymbolCount(): number;
        /* @internal */ getTypeCount(): number;
        /* @internal */ getInstantiationCount(): number;
        /* @internal */ getRelationCacheSizes(): { assignable: number, identity: number, subtype: number, strictSubtype: number };

        /* @internal */ isArrayType(type: Type): boolean;
        /* @internal */ isTupleType(type: Type): boolean;
        /* @internal */ isArrayLikeType(type: Type): boolean;

        /**
         * True if `contextualType` should not be considered for completions because
         * e.g. it specifies `kind: "a"` and obj has `kind: "b"`.
         */
        /* @internal */ isTypeInvalidDueToUnionDiscriminant(contextualType: Type, obj: ObjectLiteralExpression | JsxAttributes): boolean;
        /**
         * For a union, will include a property if it's defined in *any* of the member types.
         * So for `{ a } | { b }`, this will include both `a` and `b`.
         * Does not include properties of primitive types.
         */
        /* @internal */ getAllPossiblePropertiesOfTypes(type: readonly Type[]): Symbol[];
        /* @internal */ resolveName(name: string, location: Node | undefined, meaning: SymbolFlags, excludeGlobals: boolean): Symbol | undefined;
        /* @internal */ getJsxNamespace(location?: Node): string;

        /**
         * Note that this will return undefined in the following case:
         *     // a.ts
         *     export namespace N { export class C { } }
         *     // b.ts
         *     <<enclosingDeclaration>>
         * Where `C` is the symbol we're looking for.
         * This should be called in a loop climbing parents of the symbol, so we'll get `N`.
         */
        /* @internal */ getAccessibleSymbolChain(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, useOnlyExternalAliasing: boolean): Symbol[] | undefined;
        /* @internal */ getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined;
        /* @internal */ resolveExternalModuleName(moduleSpecifier: Expression): Symbol | undefined;
        /**
         * An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
         * and an external module with no 'export =' declaration resolves to the module itself.
         */
        /* @internal */ resolveExternalModuleSymbol(symbol: Symbol): Symbol;
        /** @param node A location where we might consider accessing `this`. Not necessarily a ThisExpression. */
        /* @internal */ tryGetThisTypeAt(node: Node, includeGlobalThis?: boolean): Type | undefined;
        /* @internal */ getTypeArgumentConstraint(node: TypeNode): Type | undefined;

        /**
         * Does *not* get *all* suggestion diagnostics, just the ones that were convenient to report in the checker.
         * Others are added in computeSuggestionDiagnostics.
         */
        /* @internal */ getSuggestionDiagnostics(file: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];

        /**
         * Depending on the operation performed, it may be appropriate to throw away the checker
         * if the cancellation token is triggered. Typically, if it is used for error checking
         * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
         */
        runWithCancellationToken<T>(token: CancellationToken, cb: (checker: TypeChecker) => T): T;

        /* @internal */ getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol: Symbol): readonly TypeParameter[] | undefined;
        /* @internal */ isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    }

    /* @internal */
    export const enum UnionReduction {
        None = 0,
        Literal,
        Subtype
    }

    /* @internal */
    export const enum ContextFlags {
        None           = 0,
        Signature      = 1 << 0, // Obtaining contextual signature
        NoConstraints  = 1 << 1, // Don't obtain type variable constraints
        Completions    = 1 << 2, // Ignore inference to current node and parent nodes out to the containing call for completions
        SkipBindingPatterns = 1 << 3, // Ignore contextual types applied by binding patterns
    }

    // NOTE: If modifying this enum, must modify `TypeFormatFlags` too!
    export const enum NodeBuilderFlags {
        None                                    = 0,
        // Options
        NoTruncation                            = 1 << 0,   // Don't truncate result
        WriteArrayAsGenericType                 = 1 << 1,   // Write Array<T> instead T[]
        GenerateNamesForShadowedTypeParams      = 1 << 2,   // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
        UseStructuralFallback                   = 1 << 3,   // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
        ForbidIndexedAccessSymbolReferences     = 1 << 4,   // Forbid references like `I["a"]["b"]` - print `typeof I.a<x>.b<y>` instead
        WriteTypeArgumentsOfSignature           = 1 << 5,   // Write the type arguments instead of type parameters of the signature
        UseFullyQualifiedType                   = 1 << 6,   // Write out the fully qualified type name (eg. Module.Type, instead of Type)
        UseOnlyExternalAliasing                 = 1 << 7,   // Only use external aliases for a symbol
        SuppressAnyReturnType                   = 1 << 8,   // If the return type is any-like and can be elided, don't offer a return type.
        WriteTypeParametersInQualifiedName      = 1 << 9,
        MultilineObjectLiterals                 = 1 << 10,  // Always write object literals across multiple lines
        WriteClassExpressionAsTypeLiteral       = 1 << 11,  // Write class {} as { new(): {} } - used for mixin declaration emit
        UseTypeOfFunction                       = 1 << 12,  // Build using typeof instead of function type literal
        OmitParameterModifiers                  = 1 << 13,  // Omit modifiers on parameters
        UseAliasDefinedOutsideCurrentScope      = 1 << 14,  // Allow non-visible aliases
        UseSingleQuotesForStringLiteralType     = 1 << 28,  // Use single quotes for string literal type
        NoTypeReduction                         = 1 << 29,  // Don't call getReducedType

        // Error handling
        AllowThisInObjectLiteral                = 1 << 15,
        AllowQualifedNameInPlaceOfIdentifier    = 1 << 16,
        AllowAnonymousIdentifier                = 1 << 17,
        AllowEmptyUnionOrIntersection           = 1 << 18,
        AllowEmptyTuple                         = 1 << 19,
        AllowUniqueESSymbolType                 = 1 << 20,
        AllowEmptyIndexInfoType                 = 1 << 21,

        // Errors (cont.)
        AllowNodeModulesRelativePaths           = 1 << 26,
        /* @internal */ DoNotIncludeSymbolChain = 1 << 27,    // Skip looking up and printing an accessible symbol chain

        IgnoreErrors = AllowThisInObjectLiteral | AllowQualifedNameInPlaceOfIdentifier | AllowAnonymousIdentifier | AllowEmptyUnionOrIntersection | AllowEmptyTuple | AllowEmptyIndexInfoType | AllowNodeModulesRelativePaths,

        // State
        InObjectTypeLiteral                     = 1 << 22,
        InTypeAlias                             = 1 << 23,    // Writing type in type alias declaration
        InInitialEntityName                     = 1 << 24,    // Set when writing the LHS of an entity name or entity name expression
        InReverseMappedType                     = 1 << 25,
    }

    // Ensure the shared flags between this and `NodeBuilderFlags` stay in alignment
    export const enum TypeFormatFlags {
        None                                    = 0,
        NoTruncation                            = 1 << 0,  // Don't truncate typeToString result
        WriteArrayAsGenericType                 = 1 << 1,  // Write Array<T> instead T[]
        // hole because there's a hole in node builder flags
        UseStructuralFallback                   = 1 << 3,   // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
        // hole because there's a hole in node builder flags
        WriteTypeArgumentsOfSignature           = 1 << 5,  // Write the type arguments instead of type parameters of the signature
        UseFullyQualifiedType                   = 1 << 6,  // Write out the fully qualified type name (eg. Module.Type, instead of Type)
        // hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
        SuppressAnyReturnType                   = 1 << 8,  // If the return type is any-like, don't offer a return type.
        // hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
        MultilineObjectLiterals                 = 1 << 10, // Always print object literals across multiple lines (only used to map into node builder flags)
        WriteClassExpressionAsTypeLiteral       = 1 << 11, // Write a type literal instead of (Anonymous class)
        UseTypeOfFunction                       = 1 << 12, // Write typeof instead of function type literal
        OmitParameterModifiers                  = 1 << 13, // Omit modifiers on parameters

        UseAliasDefinedOutsideCurrentScope      = 1 << 14, // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
        UseSingleQuotesForStringLiteralType     = 1 << 28, // Use single quotes for string literal type
        NoTypeReduction                         = 1 << 29, // Don't call getReducedType

        // Error Handling
        AllowUniqueESSymbolType                 = 1 << 20, // This is bit 20 to align with the same bit in `NodeBuilderFlags`

        // TypeFormatFlags exclusive
        AddUndefined                            = 1 << 17, // Add undefined to types of initialized, non-optional parameters
        WriteArrowStyleSignature                = 1 << 18, // Write arrow style signature

        // State
        InArrayType                             = 1 << 19, // Writing an array element type
        InElementType                           = 1 << 21, // Writing an array or union element type
        InFirstTypeArgument                     = 1 << 22, // Writing first type argument of the instantiated type
        InTypeAlias                             = 1 << 23, // Writing type in type alias declaration

        /** @deprecated */ WriteOwnNameForAnyLike  = 0,  // Does nothing

        NodeBuilderFlagsMask = NoTruncation | WriteArrayAsGenericType | UseStructuralFallback | WriteTypeArgumentsOfSignature |
            UseFullyQualifiedType | SuppressAnyReturnType | MultilineObjectLiterals | WriteClassExpressionAsTypeLiteral |
            UseTypeOfFunction | OmitParameterModifiers | UseAliasDefinedOutsideCurrentScope | AllowUniqueESSymbolType | InTypeAlias |
            UseSingleQuotesForStringLiteralType | NoTypeReduction,
    }

    export const enum SymbolFormatFlags {
        None = 0x00000000,

        // Write symbols's type argument if it is instantiated symbol
        // eg. class C<T> { p: T }   <-- Show p as C<T>.p here
        //     var a: C<number>;
        //     var p = a.p; <--- Here p is property of C<number> so show it as C<number>.p instead of just C.p
        WriteTypeParametersOrArguments = 0x00000001,

        // Use only external alias information to get the symbol name in the given context
        // eg.  module m { export class c { } } import x = m.c;
        // When this flag is specified m.c will be used to refer to the class instead of alias symbol x
        UseOnlyExternalAliasing = 0x00000002,

        // Build symbol name using any nodes needed, instead of just components of an entity name
        AllowAnyNodeKind = 0x00000004,

        // Prefer aliases which are not directly visible
        UseAliasDefinedOutsideCurrentScope = 0x00000008,

        // Skip building an accessible symbol chain
        /* @internal */ DoNotIncludeSymbolChain = 0x00000010,
    }

    /* @internal */
    export interface SymbolWalker {
        /** Note: Return values are not ordered. */
        walkType(root: Type): { visitedTypes: readonly Type[], visitedSymbols: readonly Symbol[] };
        /** Note: Return values are not ordered. */
        walkSymbol(root: Symbol): { visitedTypes: readonly Type[], visitedSymbols: readonly Symbol[] };
    }

    // This was previously deprecated in our public API, but is still used internally
    /* @internal */
    interface SymbolWriter extends SymbolTracker {
        writeKeyword(text: string): void;
        writeOperator(text: string): void;
        writePunctuation(text: string): void;
        writeSpace(text: string): void;
        writeStringLiteral(text: string): void;
        writeParameter(text: string): void;
        writeProperty(text: string): void;
        writeSymbol(text: string, symbol: Symbol): void;
        writeLine(force?: boolean): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        clear(): void;
    }

    /* @internal */
    export const enum SymbolAccessibility {
        Accessible,
        NotAccessible,
        CannotBeNamed
    }

    /* @internal */
    export const enum SyntheticSymbolKind {
        UnionOrIntersection,
        Spread
    }

    export const enum TypePredicateKind {
        This,
        Identifier,
        AssertsThis,
        AssertsIdentifier
    }

    export interface TypePredicateBase {
        kind: TypePredicateKind;
        type: Type | undefined;
    }

    export interface ThisTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.This;
        parameterName: undefined;
        parameterIndex: undefined;
        type: Type;
    }

    export interface IdentifierTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.Identifier;
        parameterName: string;
        parameterIndex: number;
        type: Type;
    }

    export interface AssertsThisTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.AssertsThis;
        parameterName: undefined;
        parameterIndex: undefined;
        type: Type | undefined;
    }

    export interface AssertsIdentifierTypePredicate extends TypePredicateBase {
        kind: TypePredicateKind.AssertsIdentifier;
        parameterName: string;
        parameterIndex: number;
        type: Type | undefined;
    }

    export type TypePredicate = ThisTypePredicate | IdentifierTypePredicate | AssertsThisTypePredicate | AssertsIdentifierTypePredicate;

    /* @internal */
    export type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;

    /* @internal */
    export type AnyImportOrRequire = AnyImportSyntax | RequireVariableDeclaration;


    /* @internal */
    export type AnyImportOrReExport = AnyImportSyntax | ExportDeclaration;

    /* @internal */
    export interface ValidImportTypeNode extends ImportTypeNode {
        argument: LiteralTypeNode & { literal: StringLiteral };
    }

    /* @internal */
    export type AnyValidImportOrReExport =
        | (ImportDeclaration | ExportDeclaration) & { moduleSpecifier: StringLiteral }
        | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteral } }
        | RequireOrImportCall
        | ValidImportTypeNode;

    /* @internal */
    export type RequireOrImportCall = CallExpression & { expression: Identifier, arguments: [StringLiteralLike] };

    /* @internal */
    export interface RequireVariableDeclaration extends VariableDeclaration {

        initializer: RequireOrImportCall;
    }

    /* @internal */
    export type LateVisibilityPaintedStatement =
        | AnyImportSyntax
        | VariableStatement
        | ClassDeclaration
        | FunctionDeclaration
        | ModuleDeclaration
        | TypeAliasDeclaration
        | InterfaceDeclaration
        | EnumDeclaration;

    /* @internal */
    export interface SymbolVisibilityResult {
        accessibility: SymbolAccessibility;
        aliasesToMakeVisible?: LateVisibilityPaintedStatement[]; // aliases that need to have this symbol visible
        errorSymbolName?: string; // Optional symbol name that results in error
        errorNode?: Node; // optional node that results in error
    }

    /* @internal */
    export interface SymbolAccessibilityResult extends SymbolVisibilityResult {
        errorModuleName?: string; // If the symbol is not visible from module, module's name
    }

    /* @internal */
    export interface AllAccessorDeclarations {
        firstAccessor: AccessorDeclaration;
        secondAccessor: AccessorDeclaration | undefined;
        getAccessor: GetAccessorDeclaration | undefined;
        setAccessor: SetAccessorDeclaration | undefined;
    }

    /** Indicates how to serialize the name for a TypeReferenceNode when emitting decorator metadata */
    /* @internal */
    export enum TypeReferenceSerializationKind {
        // The TypeReferenceNode could not be resolved.
        // The type name should be emitted using a safe fallback.
        Unknown,

        // The TypeReferenceNode resolves to a type with a constructor
        // function that can be reached at runtime (e.g. a `class`
        // declaration or a `var` declaration for the static side
        // of a type, such as the global `Promise` type in lib.d.ts).
        TypeWithConstructSignatureAndValue,

        // The TypeReferenceNode resolves to a Void-like, Nullable, or Never type.
        VoidNullableOrNeverType,

        // The TypeReferenceNode resolves to a Number-like type.
        NumberLikeType,

        // The TypeReferenceNode resolves to a BigInt-like type.
        BigIntLikeType,

        // The TypeReferenceNode resolves to a String-like type.
        StringLikeType,

        // The TypeReferenceNode resolves to a Boolean-like type.
        BooleanType,

        // The TypeReferenceNode resolves to an Array-like type.
        ArrayLikeType,

        // The TypeReferenceNode resolves to the ESSymbol type.
        ESSymbolType,

        // The TypeReferenceNode resolved to the global Promise constructor symbol.
        Promise,

        // The TypeReferenceNode resolves to a Function type or a type with call signatures.
        TypeWithCallSignature,

        // The TypeReferenceNode resolves to any other type.
        ObjectType,
    }

    /* @internal */
    export interface EmitResolver {
        hasGlobalName(name: string): boolean;
        getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile | ModuleDeclaration | EnumDeclaration | undefined;
        getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
        getReferencedDeclarationWithCollidingName(node: Identifier): Declaration | undefined;
        isDeclarationWithCollidingName(node: Declaration): boolean;
        isValueAliasDeclaration(node: Node): boolean;
        isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
        isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
        getNodeCheckFlags(node: Node): NodeCheckFlags;
        isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
        isLateBound(node: Declaration): node is LateBoundDeclaration;
        collectLinkedAliases(node: Identifier, setVisibility?: boolean): Node[] | undefined;
        isImplementationOfOverload(node: FunctionLike): boolean | undefined;
        isRequiredInitializedParameter(node: ParameterDeclaration): boolean;
        isOptionalUninitializedParameterProperty(node: ParameterDeclaration): boolean;
        isExpandoFunctionDeclaration(node: FunctionDeclaration): boolean;
        getPropertiesOfContainerFunction(node: Declaration): Symbol[];
        createTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration | PropertyAccessExpression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker, addUndefined?: boolean): TypeNode | undefined;
        createReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
        createTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
        createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
        isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags | undefined, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
        isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
        // Returns the constant value this property access resolves to, or 'undefined' for a non-constant
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
        getReferencedValueDeclaration(reference: Identifier): Declaration | undefined;
        getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
        isOptionalParameter(node: ParameterDeclaration): boolean;
        moduleExportsSomeValue(moduleReferenceExpression: Expression): boolean;
        isArgumentsLocalBinding(node: Identifier): boolean;
        getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): SourceFile | undefined;
        getTypeReferenceDirectivesForEntityName(name: EntityNameOrEntityNameExpression): string[] | undefined;
        getTypeReferenceDirectivesForSymbol(symbol: Symbol, meaning?: SymbolFlags): string[] | undefined;
        isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
        getJsxFactoryEntity(location?: Node): EntityName | undefined;
        getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
        getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
        getSymbolOfExternalModuleSpecifier(node: StringLiteralLike): Symbol | undefined;
        isBindingCapturedByNode(node: Node, decl: VariableDeclaration | BindingElement): boolean;
        getDeclarationStatementsForSourceFile(node: SourceFile, flags: NodeBuilderFlags, tracker: SymbolTracker, bundled?: boolean): Statement[] | undefined;
        isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
    }

    export const enum SymbolFlags {
        None                    = 0,
        FunctionScopedVariable  = 1 << 0,   // Variable (var) or parameter
        BlockScopedVariable     = 1 << 1,   // A block-scoped variable (let or const)
        Property                = 1 << 2,   // Property or enum member
        EnumMember              = 1 << 3,   // Enum member
        Function                = 1 << 4,   // Function
        Class                   = 1 << 5,   // Class
        Interface               = 1 << 6,   // Interface
        ConstEnum               = 1 << 7,   // Const enum
        RegularEnum             = 1 << 8,   // Enum
        ValueModule             = 1 << 9,   // Instantiated module
        NamespaceModule         = 1 << 10,  // Uninstantiated module
        TypeLiteral             = 1 << 11,  // Type Literal or mapped type
        ObjectLiteral           = 1 << 12,  // Object Literal
        Method                  = 1 << 13,  // Method
        Constructor             = 1 << 14,  // Constructor
        GetAccessor             = 1 << 15,  // Get accessor
        SetAccessor             = 1 << 16,  // Set accessor
        Signature               = 1 << 17,  // Call, construct, or index signature
        TypeParameter           = 1 << 18,  // Type parameter
        TypeAlias               = 1 << 19,  // Type alias
        ExportValue             = 1 << 20,  // Exported value marker (see comment in declareModuleMember in binder)
        Alias                   = 1 << 21,  // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
        Prototype               = 1 << 22,  // Prototype property (no source representation)
        ExportStar              = 1 << 23,  // Export * declaration
        Optional                = 1 << 24,  // Optional property
        Transient               = 1 << 25,  // Transient symbol (created during type check)
        Assignment              = 1 << 26,  // Assignment treated as declaration (eg `this.prop = 1`)
        ModuleExports           = 1 << 27,  // Symbol for CommonJS `module` of `module.exports`
        Deprecated              = 1 << 28,  // Symbol has Deprecated declaration tag (eg `@deprecated`)
        /* @internal */
        All = FunctionScopedVariable | BlockScopedVariable | Property | EnumMember | Function | Class | Interface | ConstEnum | RegularEnum | ValueModule | NamespaceModule | TypeLiteral
            | ObjectLiteral | Method | Constructor | GetAccessor | SetAccessor | Signature | TypeParameter | TypeAlias | ExportValue | Alias | Prototype | ExportStar | Optional | Transient | Deprecated,

        Enum = RegularEnum | ConstEnum,
        Variable = FunctionScopedVariable | BlockScopedVariable,
        Value = Variable | Property | EnumMember | ObjectLiteral | Function | Class | Enum | ValueModule | Method | GetAccessor | SetAccessor,
        Type = Class | Interface | Enum | EnumMember | TypeLiteral | TypeParameter | TypeAlias,
        Namespace = ValueModule | NamespaceModule | Enum,
        Module = ValueModule | NamespaceModule,
        Accessor = GetAccessor | SetAccessor,

        // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
        // same name, or any other value that is not a variable, e.g. ValueModule or Class
        FunctionScopedVariableExcludes = Value & ~FunctionScopedVariable,

        // Block-scoped declarations are not allowed to be re-declared
        // they can not merge with anything in the value space
        BlockScopedVariableExcludes = Value,

        ParameterExcludes = Value,
        PropertyExcludes = None,
        EnumMemberExcludes = Value | Type,
        FunctionExcludes = Value & ~(Function | ValueModule | Class),
        ClassExcludes = (Value | Type) & ~(ValueModule | Interface | Function), // class-interface mergability done in checker.ts
        InterfaceExcludes = Type & ~(Interface | Class),
        RegularEnumExcludes = (Value | Type) & ~(RegularEnum | ValueModule), // regular enums merge only with regular enums and modules
        ConstEnumExcludes = (Value | Type) & ~ConstEnum, // const enums merge only with const enums
        ValueModuleExcludes = Value & ~(Function | Class | RegularEnum | ValueModule),
        NamespaceModuleExcludes = 0,
        MethodExcludes = Value & ~Method,
        GetAccessorExcludes = Value & ~SetAccessor,
        SetAccessorExcludes = Value & ~GetAccessor,
        TypeParameterExcludes = Type & ~TypeParameter,
        TypeAliasExcludes = Type,
        AliasExcludes = Alias,

        ModuleMember = Variable | Function | Class | Interface | Enum | Module | TypeAlias | Alias,

        ExportHasLocal = Function | Class | Enum | ValueModule,

        BlockScoped = BlockScopedVariable | Class | Enum,

        PropertyOrAccessor = Property | Accessor,

        ClassMember = Method | Accessor | Property,

        /* @internal */
        ExportSupportsDefaultModifier = Class | Function | Interface,

        /* @internal */
        ExportDoesNotSupportDefaultModifier = ~ExportSupportsDefaultModifier,

        /* @internal */
        // The set of things we consider semantically classifiable.  Used to speed up the LS during
        // classification.
        Classifiable = Class | Enum | TypeAlias | Interface | TypeParameter | Module | Alias,

        /* @internal */
        LateBindingContainer = Class | Interface | TypeLiteral | ObjectLiteral | Function,
    }

    /* @internal */
    export type SymbolId = number;

    export interface Symbol {
        flags: SymbolFlags;                     // Symbol flags
        escapedName: __String;                  // Name of symbol
        declarations: Declaration[];            // Declarations associated with this symbol
        valueDeclaration: Declaration;          // First value declaration of the symbol
        members?: SymbolTable;                  // Class, interface or object literal instance members
        exports?: SymbolTable;                  // Module exports
        globalExports?: SymbolTable;            // Conditional global UMD exports
        /* @internal */ id?: SymbolId;          // Unique id (used to look up SymbolLinks)
        /* @internal */ mergeId?: number;       // Merge id (used to look up merged symbol)
        /* @internal */ parent?: Symbol;        // Parent symbol
        /* @internal */ exportSymbol?: Symbol;  // Exported symbol associated with this symbol
        /* @internal */ constEnumOnlyModule?: boolean; // True if module contains only const enums or other modules with only const enums
        /* @internal */ isReferenced?: SymbolFlags; // True if the symbol is referenced elsewhere. Keeps track of the meaning of a reference in case a symbol is both a type parameter and parameter.
        /* @internal */ isReplaceableByMethod?: boolean; // Can this Javascript class property be replaced by a method symbol?
        /* @internal */ isAssigned?: boolean;   // True if the symbol is a parameter with assignments
        /* @internal */ assignmentDeclarationMembers?: Map<number, Declaration>; // detected late-bound assignment declarations associated with the symbol
    }

    /* @internal */
    export interface SymbolLinks {
        immediateTarget?: Symbol;                   // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
        target?: Symbol;                            // Resolved (non-alias) target of an alias
        type?: Type;                                // Type of value symbol
        nameType?: Type;                            // Type associated with a late-bound symbol
        uniqueESSymbolType?: Type;                  // UniqueESSymbol type for a symbol
        declaredType?: Type;                        // Type of class, interface, enum, type alias, or type parameter
        typeParameters?: TypeParameter[];           // Type parameters of type alias (undefined if non-generic)
        outerTypeParameters?: TypeParameter[];      // Outer type parameters of anonymous object type
        instantiations?: Map<string, Type>;         // Instantiations of generic type alias (undefined if non-generic)
        inferredClassSymbol?: Map<SymbolId, TransientSymbol>; // Symbol of an inferred ES5 constructor function
        mapper?: TypeMapper;                        // Type mapper for instantiation alias
        referenced?: boolean;                       // True if alias symbol has been referenced as a value that can be emitted
        constEnumReferenced?: boolean;              // True if alias symbol resolves to a const enum and is referenced as a value ('referenced' will be false)
        containingType?: UnionOrIntersectionType;   // Containing union or intersection type for synthetic property
        leftSpread?: Symbol;                        // Left source for synthetic spread property
        rightSpread?: Symbol;                       // Right source for synthetic spread property
        syntheticOrigin?: Symbol;                   // For a property on a mapped or spread type, points back to the original property
        isDiscriminantProperty?: boolean;           // True if discriminant synthetic property
        resolvedExports?: SymbolTable;              // Resolved exports of module or combined early- and late-bound static members of a class.
        resolvedMembers?: SymbolTable;              // Combined early- and late-bound members of a symbol
        exportsChecked?: boolean;                   // True if exports of external module have been checked
        typeParametersChecked?: boolean;            // True if type parameters of merged class and interface declarations have been checked.
        isDeclarationWithCollidingName?: boolean;   // True if symbol is block scoped redeclaration
        bindingElement?: BindingElement;            // Binding element associated with property symbol
        exportsSomeValue?: boolean;                 // True if module exports some value (not just types)
        enumKind?: EnumKind;                        // Enum declaration classification
        originatingImport?: ImportDeclaration | ImportCall; // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
        lateSymbol?: Symbol;                        // Late-bound symbol for a computed property
        specifierCache?: Map<string, string>;       // For symbols corresponding to external modules, a cache of incoming path -> module specifier name mappings
        extendedContainers?: Symbol[];              // Containers (other than the parent) which this symbol is aliased in
        extendedContainersByFile?: Map<NodeId, Symbol[]>; // Containers (other than the parent) which this symbol is aliased in
        variances?: VarianceFlags[];                // Alias symbol type argument variance cache
        deferralConstituents?: Type[];              // Calculated list of constituents for a deferred type
        deferralParent?: Type;                      // Source union/intersection of a deferred type
        cjsExportMerged?: Symbol;                   // Version of the symbol with all non export= exports merged with the export= target
        typeOnlyDeclaration?: TypeOnlyCompatibleAliasDeclaration | false; // First resolved alias declaration that makes the symbol only usable in type constructs
        isConstructorDeclaredProperty?: boolean;    // Property declared through 'this.x = ...' assignment in constructor
        tupleLabelDeclaration?: NamedTupleMember | ParameterDeclaration; // Declaration associated with the tuple's label
    }

    /* @internal */
    export const enum EnumKind {
        Numeric,                            // Numeric enum (each member has a TypeFlags.Enum type)
        Literal                             // Literal enum (each member has a TypeFlags.EnumLiteral type)
    }

    /* @internal */
    export const enum CheckFlags {
        Instantiated      = 1 << 0,         // Instantiated symbol
        SyntheticProperty = 1 << 1,         // Property in union or intersection type
        SyntheticMethod   = 1 << 2,         // Method in union or intersection type
        Readonly          = 1 << 3,         // Readonly transient symbol
        ReadPartial       = 1 << 4,         // Synthetic property present in some but not all constituents
        WritePartial      = 1 << 5,         // Synthetic property present in some but only satisfied by an index signature in others
        HasNonUniformType = 1 << 6,         // Synthetic property with non-uniform type in constituents
        HasLiteralType    = 1 << 7,         // Synthetic property with at least one literal type in constituents
        ContainsPublic    = 1 << 8,         // Synthetic property with public constituent(s)
        ContainsProtected = 1 << 9,         // Synthetic property with protected constituent(s)
        ContainsPrivate   = 1 << 10,        // Synthetic property with private constituent(s)
        ContainsStatic    = 1 << 11,        // Synthetic property with static constituent(s)
        Late              = 1 << 12,        // Late-bound symbol for a computed property with a dynamic name
        ReverseMapped     = 1 << 13,        // Property of reverse-inferred homomorphic mapped type
        OptionalParameter = 1 << 14,        // Optional parameter
        RestParameter     = 1 << 15,        // Rest parameter
        DeferredType      = 1 << 16,        // Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
        HasNeverType      = 1 << 17,        // Synthetic property with at least one never type in constituents
        Mapped            = 1 << 18,        // Property of mapped type
        StripOptional     = 1 << 19,        // Strip optionality in mapped property
        Synthetic = SyntheticProperty | SyntheticMethod,
        Discriminant = HasNonUniformType | HasLiteralType,
        Partial = ReadPartial | WritePartial
    }

    /* @internal */
    export interface TransientSymbol extends Symbol, SymbolLinks {
        checkFlags: CheckFlags;
    }

    /* @internal */
    export interface MappedSymbol extends TransientSymbol {
        mappedType: MappedType;
        mapper: TypeMapper;
    }

    /* @internal */
    export interface ReverseMappedSymbol extends TransientSymbol {
        propertyType: Type;
        mappedType: MappedType;
        constraintType: IndexType;
    }

    export const enum InternalSymbolName {
        Call = "__call", // Call signatures
        Constructor = "__constructor", // Constructor implementations
        New = "__new", // Constructor signatures
        Index = "__index", // Index signatures
        ExportStar = "__export", // Module export * declarations
        Global = "__global", // Global self-reference
        Missing = "__missing", // Indicates missing symbol
        Type = "__type", // Anonymous type literal symbol
        Object = "__object", // Anonymous object literal declaration
        JSXAttributes = "__jsxAttributes", // Anonymous JSX attributes object literal declaration
        Class = "__class", // Unnamed class expression
        Function = "__function", // Unnamed function expression
        Computed = "__computed", // Computed property name declaration with dynamic name
        Resolving = "__resolving__", // Indicator symbol used to mark partially resolved type aliases
        ExportEquals = "export=", // Export assignment symbol
        Default = "default", // Default export symbol (technically not wholly internal, but included here for usability)
        This = "this",
    }

    /**
     * This represents a string whose leading underscore have been escaped by adding extra leading underscores.
     * The shape of this brand is rather unique compared to others we've used.
     * Instead of just an intersection of a string and an object, it is that union-ed
     * with an intersection of void and an object. This makes it wholly incompatible
     * with a normal string (which is good, it cannot be misused on assignment or on usage),
     * while still being comparable with a normal string via === (also good) and castable from a string.
     */
    export type __String = (string & { __escapedIdentifier: void }) | (void & { __escapedIdentifier: void }) | InternalSymbolName; // eslint-disable-line @typescript-eslint/naming-convention

    /** ReadonlyMap where keys are `__String`s. */
    export type ReadonlyUnderscoreEscapedMap<T> = ReadonlyMap<__String, T>;

    /** Map where keys are `__String`s. */
    export type UnderscoreEscapedMap<T> = Map<__String, T>;

    /** SymbolTable based on ES6 Map interface. */
    export type SymbolTable = UnderscoreEscapedMap<Symbol>;

    /** Used to track a `declare module "foo*"`-like declaration. */
    /* @internal */
    export interface PatternAmbientModule {
        pattern: Pattern;
        symbol: Symbol;
    }

    /* @internal */
    export const enum NodeCheckFlags {
        TypeChecked                         = 0x00000001,  // Node has been type checked
        LexicalThis                         = 0x00000002,  // Lexical 'this' reference
        CaptureThis                         = 0x00000004,  // Lexical 'this' used in body
        CaptureNewTarget                    = 0x00000008,  // Lexical 'new.target' used in body
        SuperInstance                       = 0x00000100,  // Instance 'super' reference
        SuperStatic                         = 0x00000200,  // Static 'super' reference
        ContextChecked                      = 0x00000400,  // Contextual types have been assigned
        AsyncMethodWithSuper                = 0x00000800,  // An async method that reads a value from a member of 'super'.
        AsyncMethodWithSuperBinding         = 0x00001000,  // An async method that assigns a value to a member of 'super'.
        CaptureArguments                    = 0x00002000,  // Lexical 'arguments' used in body
        EnumValuesComputed                  = 0x00004000,  // Values for enum members have been computed, and any errors have been reported for them.
        LexicalModuleMergesWithClass        = 0x00008000,  // Instantiated lexical module declaration is merged with a previous class declaration.
        LoopWithCapturedBlockScopedBinding  = 0x00010000,  // Loop that contains block scoped variable captured in closure
        ContainsCapturedBlockScopeBinding   = 0x00020000,  // Part of a loop that contains block scoped variable captured in closure
        CapturedBlockScopedBinding          = 0x00040000,  // Block-scoped binding that is captured in some function
        BlockScopedBindingInLoop            = 0x00080000,  // Block-scoped binding with declaration nested inside iteration statement
        ClassWithBodyScopedClassBinding     = 0x00100000,  // Decorated class that contains a binding to itself inside of the class body.
        BodyScopedClassBinding              = 0x00200000,  // Binding to a decorated class inside of the class's body.
        NeedsLoopOutParameter               = 0x00400000,  // Block scoped binding whose value should be explicitly copied outside of the converted loop
        AssignmentsMarked                   = 0x00800000,  // Parameter assignments have been marked
        ClassWithConstructorReference       = 0x01000000,  // Class that contains a binding to its constructor inside of the class body.
        ConstructorReferenceInClass         = 0x02000000,  // Binding to a class constructor inside of the class's body.
        ContainsClassWithPrivateIdentifiers = 0x04000000,  // Marked on all block-scoped containers containing a class with private identifiers.
    }

    /* @internal */
    export interface NodeLinks {
        flags: NodeCheckFlags;              // Set of flags specific to Node
        resolvedType?: Type;                // Cached type of type node
        resolvedEnumType?: Type;            // Cached constraint type from enum jsdoc tag
        resolvedSignature?: Signature;      // Cached signature of signature node or call expression
        resolvedSymbol?: Symbol;            // Cached name resolution result
        resolvedIndexInfo?: IndexInfo;      // Cached indexing info resolution result
        effectsSignature?: Signature;       // Signature with possible control flow effects
        enumMemberValue?: string | number;  // Constant value of enum member
        isVisible?: boolean;                // Is this node visible
        containsArgumentsReference?: boolean; // Whether a function-like declaration contains an 'arguments' reference
        hasReportedStatementInAmbientContext?: boolean; // Cache boolean if we report statements in ambient context
        jsxFlags: JsxFlags;                 // flags for knowing what kind of element/attributes we're dealing with
        resolvedJsxElementAttributesType?: Type; // resolved element attributes type of a JSX openinglike element
        resolvedJsxElementAllAttributesType?: Type; // resolved all element attributes type of a JSX openinglike element
        resolvedJSDocType?: Type;           // Resolved type of a JSDoc type reference
        switchTypes?: Type[];               // Cached array of switch case expression types
        jsxNamespace?: Symbol | false;      // Resolved jsx namespace symbol for this node
        contextFreeType?: Type;             // Cached context-free type used by the first pass of inference; used when a function's return is partially contextually sensitive
        deferredNodes?: Map<NodeId, Node>;  // Set of nodes whose checking has been deferred
        capturedBlockScopeBindings?: Symbol[]; // Block-scoped bindings captured beneath this part of an IterationStatement
        outerTypeParameters?: TypeParameter[]; // Outer type parameters of anonymous object type
        instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
        isExhaustive?: boolean;             // Is node an exhaustive switch statement
        skipDirectInference?: true;         // Flag set by the API `getContextualType` call on a node when `Completions` is passed to force the checker to skip making inferences to a node's type
        declarationRequiresScopeChange?: boolean; // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
    }

    export const enum TypeFlags {
        Any             = 1 << 0,
        Unknown         = 1 << 1,
        String          = 1 << 2,
        Number          = 1 << 3,
        Boolean         = 1 << 4,
        Enum            = 1 << 5,
        BigInt          = 1 << 6,
        StringLiteral   = 1 << 7,
        NumberLiteral   = 1 << 8,
        BooleanLiteral  = 1 << 9,
        EnumLiteral     = 1 << 10,  // Always combined with StringLiteral, NumberLiteral, or Union
        BigIntLiteral   = 1 << 11,
        ESSymbol        = 1 << 12,  // Type of symbol primitive introduced in ES6
        UniqueESSymbol  = 1 << 13,  // unique symbol
        Void            = 1 << 14,
        Undefined       = 1 << 15,
        Null            = 1 << 16,
        Never           = 1 << 17,  // Never type
        TypeParameter   = 1 << 18,  // Type parameter
        Object          = 1 << 19,  // Object type
        Union           = 1 << 20,  // Union (T | U)
        Intersection    = 1 << 21,  // Intersection (T & U)
        Index           = 1 << 22,  // keyof T
        IndexedAccess   = 1 << 23,  // T[K]
        Conditional     = 1 << 24,  // T extends U ? X : Y
        Substitution    = 1 << 25,  // Type parameter substitution
        NonPrimitive    = 1 << 26,  // intrinsic object type

        /* @internal */
        AnyOrUnknown = Any | Unknown,
        /* @internal */
        Nullable = Undefined | Null,
        Literal = StringLiteral | NumberLiteral | BigIntLiteral | BooleanLiteral,
        Unit = Literal | UniqueESSymbol | Nullable,
        StringOrNumberLiteral = StringLiteral | NumberLiteral,
        /* @internal */
        StringOrNumberLiteralOrUnique = StringLiteral | NumberLiteral | UniqueESSymbol,
        /* @internal */
        DefinitelyFalsy = StringLiteral | NumberLiteral | BigIntLiteral | BooleanLiteral | Void | Undefined | Null,
        PossiblyFalsy = DefinitelyFalsy | String | Number | BigInt | Boolean,
        /* @internal */
        Intrinsic = Any | Unknown | String | Number | BigInt | Boolean | BooleanLiteral | ESSymbol | Void | Undefined | Null | Never | NonPrimitive,
        /* @internal */
        Primitive = String | Number | BigInt | Boolean | Enum | EnumLiteral | ESSymbol | Void | Undefined | Null | Literal | UniqueESSymbol,
        StringLike = String | StringLiteral,
        NumberLike = Number | NumberLiteral | Enum,
        BigIntLike = BigInt | BigIntLiteral,
        BooleanLike = Boolean | BooleanLiteral,
        EnumLike = Enum | EnumLiteral,
        ESSymbolLike = ESSymbol | UniqueESSymbol,
        VoidLike = Void | Undefined,
        /* @internal */
        DisjointDomains = NonPrimitive | StringLike | NumberLike | BigIntLike | BooleanLike | ESSymbolLike | VoidLike | Null,
        UnionOrIntersection = Union | Intersection,
        StructuredType = Object | Union | Intersection,
        TypeVariable = TypeParameter | IndexedAccess,
        InstantiableNonPrimitive = TypeVariable | Conditional | Substitution,
        InstantiablePrimitive = Index,
        Instantiable = InstantiableNonPrimitive | InstantiablePrimitive,
        StructuredOrInstantiable = StructuredType | Instantiable,
        /* @internal */
        ObjectFlagsType = Any | Nullable | Never | Object | Union | Intersection,
        /* @internal */
        Simplifiable = IndexedAccess | Conditional,
        /* @internal */
        Substructure = Object | Union | Intersection | Index | IndexedAccess | Conditional | Substitution,
        // 'Narrowable' types are types where narrowing actually narrows.
        // This *should* be every type other than null, undefined, void, and never
        Narrowable = Any | Unknown | StructuredOrInstantiable | StringLike | NumberLike | BigIntLike | BooleanLike | ESSymbol | UniqueESSymbol | NonPrimitive,
        NotUnionOrUnit = Any | Unknown | ESSymbol | Object | NonPrimitive,
        /* @internal */
        NotPrimitiveUnion = Any | Unknown | Enum | Void | Never | StructuredOrInstantiable,
        // The following flags are aggregated during union and intersection type construction
        /* @internal */
        IncludesMask = Any | Unknown | Primitive | Never | Object | Union | Intersection | NonPrimitive,
        // The following flags are used for different purposes during union and intersection type construction
        /* @internal */
        IncludesStructuredOrInstantiable = TypeParameter,
        /* @internal */
        IncludesNonWideningType = Index,
        /* @internal */
        IncludesWildcard = IndexedAccess,
        /* @internal */
        IncludesEmptyObject = Conditional,
    }

    export type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;

    /* @internal */
    export type TypeId = number;

    // Properties common to all types
    export interface Type {
        flags: TypeFlags;                // Flags
        /* @internal */ id: TypeId;      // Unique ID
        /* @internal */ checker: TypeChecker;
        symbol: Symbol;                  // Symbol associated with type (if any)
        pattern?: DestructuringPattern;  // Destructuring pattern represented by type (if any)
        aliasSymbol?: Symbol;            // Alias associated with type
        aliasTypeArguments?: readonly Type[]; // Alias type arguments (if any)
        /* @internal */ aliasTypeArgumentsContainsMarker?: boolean; // Alias type arguments (if any)
        /* @internal */
        permissiveInstantiation?: Type;  // Instantiation with type parameters mapped to wildcard type
        /* @internal */
        restrictiveInstantiation?: Type; // Instantiation with type parameters mapped to unconstrained form
        /* @internal */
        immediateBaseConstraint?: Type;  // Immediate base constraint cache
        /* @internal */
        widened?: Type; // Cached widened form of the type
    }

    /* @internal */
    // Intrinsic types (TypeFlags.Intrinsic)
    export interface IntrinsicType extends Type {
        intrinsicName: string;        // Name of intrinsic type
        objectFlags: ObjectFlags;
    }

    /* @internal */
    export interface NullableType extends IntrinsicType {
        objectFlags: ObjectFlags;
    }

    /* @internal */
    export interface FreshableIntrinsicType extends IntrinsicType {
        freshType: IntrinsicType;     // Fresh version of type
        regularType: IntrinsicType;   // Regular version of type
    }

    /* @internal */
    export type FreshableType = LiteralType | FreshableIntrinsicType;

    // String literal types (TypeFlags.StringLiteral)
    // Numeric literal types (TypeFlags.NumberLiteral)
    // BigInt literal types (TypeFlags.BigIntLiteral)
    export interface LiteralType extends Type {
        value: string | number | PseudoBigInt; // Value of literal
        freshType: LiteralType;                // Fresh version of type
        regularType: LiteralType;              // Regular version of type
    }

    // Unique symbol types (TypeFlags.UniqueESSymbol)
    export interface UniqueESSymbolType extends Type {
        symbol: Symbol;
        escapedName: __String;
    }

    export interface StringLiteralType extends LiteralType {
        value: string;
    }

    export interface NumberLiteralType extends LiteralType {
        value: number;
    }

    export interface BigIntLiteralType extends LiteralType {
        value: PseudoBigInt;
    }

    // Enum types (TypeFlags.Enum)
    export interface EnumType extends Type {
    }

    export const enum ObjectFlags {
        Class            = 1 << 0,  // Class
        Interface        = 1 << 1,  // Interface
        Reference        = 1 << 2,  // Generic type reference
        Tuple            = 1 << 3,  // Synthesized generic tuple type
        Anonymous        = 1 << 4,  // Anonymous
        Mapped           = 1 << 5,  // Mapped
        Instantiated     = 1 << 6,  // Instantiated anonymous or mapped type
        ObjectLiteral    = 1 << 7,  // Originates in an object literal
        EvolvingArray    = 1 << 8,  // Evolving array type
        ObjectLiteralPatternWithComputedProperties = 1 << 9,  // Object literal pattern with computed properties
        ContainsSpread   = 1 << 10, // Object literal contains spread operation
        ReverseMapped    = 1 << 11, // Object contains a property from a reverse-mapped type
        JsxAttributes    = 1 << 12, // Jsx attributes type
        MarkerType       = 1 << 13, // Marker type used for variance probing
        JSLiteral        = 1 << 14, // Object type declared in JS - disables errors on read/write of nonexisting members
        FreshLiteral     = 1 << 15, // Fresh object literal
        ArrayLiteral     = 1 << 16, // Originates in an array literal
        ObjectRestType   = 1 << 17, // Originates in object rest declaration
        /* @internal */
        PrimitiveUnion   = 1 << 18, // Union of only primitive types
        /* @internal */
        ContainsWideningType = 1 << 19, // Type is or contains undefined or null widening type
        /* @internal */
        ContainsObjectOrArrayLiteral = 1 << 20, // Type is or contains object literal type
        /* @internal */
        NonInferrableType = 1 << 21, // Type is or contains anyFunctionType or silentNeverType
        /* @internal */
        IsGenericObjectTypeComputed = 1 << 22, // IsGenericObjectType flag has been computed
        /* @internal */
        IsGenericObjectType = 1 << 23, // Union or intersection contains generic object type
        /* @internal */
        IsGenericIndexTypeComputed = 1 << 24, // IsGenericIndexType flag has been computed
        /* @internal */
        IsGenericIndexType = 1 << 25, // Union or intersection contains generic index type
        /* @internal */
        CouldContainTypeVariablesComputed = 1 << 26, // CouldContainTypeVariables flag has been computed
        /* @internal */
        CouldContainTypeVariables = 1 << 27, // Type could contain a type variable
        /* @internal */
        ContainsIntersections = 1 << 28, // Union contains intersections
        /* @internal */
        IsNeverIntersectionComputed = 1 << 28, // IsNeverLike flag has been computed
        /* @internal */
        IsNeverIntersection = 1 << 29, // Intersection reduces to never
        ClassOrInterface = Class | Interface,
        /* @internal */
        RequiresWidening = ContainsWideningType | ContainsObjectOrArrayLiteral,
        /* @internal */
        PropagatingFlags = ContainsWideningType | ContainsObjectOrArrayLiteral | NonInferrableType
    }

    /* @internal */
    export type ObjectFlagsType = NullableType | ObjectType | UnionType | IntersectionType;

    // Object types (TypeFlags.ObjectType)
    export interface ObjectType extends Type {
        objectFlags: ObjectFlags;
        /* @internal */ members?: SymbolTable;             // Properties by name
        /* @internal */ properties?: Symbol[];             // Properties
        /* @internal */ callSignatures?: readonly Signature[];      // Call signatures of type
        /* @internal */ constructSignatures?: readonly Signature[]; // Construct signatures of type
        /* @internal */ stringIndexInfo?: IndexInfo;      // String indexing info
        /* @internal */ numberIndexInfo?: IndexInfo;      // Numeric indexing info
    }

    /** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
    export interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[] | undefined;      // Type parameters (undefined if non-generic)
        outerTypeParameters: TypeParameter[] | undefined; // Outer type parameters (undefined if none)
        localTypeParameters: TypeParameter[] | undefined; // Local type parameters (undefined if none)
        thisType: TypeParameter | undefined;              // The "this" type (undefined if none)
        /* @internal */
        resolvedBaseConstructorType?: Type;               // Resolved base constructor type of class
        /* @internal */
        resolvedBaseTypes: BaseType[];                    // Resolved base types
    }

    // Object type or intersection of object types
    export type BaseType = ObjectType | IntersectionType | TypeVariable; // Also `any` and `object`

    export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
        declaredProperties: Symbol[];                   // Declared members
        declaredCallSignatures: Signature[];            // Declared call signatures
        declaredConstructSignatures: Signature[];       // Declared construct signatures
        declaredStringIndexInfo?: IndexInfo; // Declared string indexing info
        declaredNumberIndexInfo?: IndexInfo; // Declared numeric indexing info
    }

    /**
     * Type references (ObjectFlags.Reference). When a class or interface has type parameters or
     * a "this" type, references to the class or interface are made using type references. The
     * typeArguments property specifies the types to substitute for the type parameters of the
     * class or interface and optionally includes an extra element that specifies the type to
     * substitute for "this" in the resulting instantiation. When no extra argument is present,
     * the type reference itself is substituted for "this". The typeArguments property is undefined
     * if the class or interface has no type parameters and the reference isn't specifying an
     * explicit "this" argument.
     */
    export interface TypeReference extends ObjectType {
        target: GenericType;    // Type reference target
        node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
        /* @internal */
        mapper?: TypeMapper;
        /* @internal */
        resolvedTypeArguments?: readonly Type[];  // Resolved type reference type arguments
        /* @internal */
        literalType?: TypeReference;  // Clone of type with ObjectFlags.ArrayLiteral set
    }

    export interface DeferredTypeReference extends TypeReference {
        /* @internal */
        node: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
        /* @internal */
        mapper?: TypeMapper;
    }

    /* @internal */
    export const enum VarianceFlags {
        Invariant     =      0,  // Neither covariant nor contravariant
        Covariant     = 1 << 0,  // Covariant
        Contravariant = 1 << 1,  // Contravariant
        Bivariant     = Covariant | Contravariant,  // Both covariant and contravariant
        Independent   = 1 << 2,  // Unwitnessed type parameter
        VarianceMask  = Invariant | Covariant | Contravariant | Independent, // Mask containing all measured variances without the unmeasurable flag
        Unmeasurable  = 1 << 3,  // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
        Unreliable    = 1 << 4,  // Variance result is unreliable - checking may produce false negatives, but not false positives
        AllowsStructuralFallback = Unmeasurable | Unreliable,
    }

    // Generic class and interface types
    export interface GenericType extends InterfaceType, TypeReference {
        /* @internal */
        instantiations: Map<string, TypeReference>;  // Generic instantiation cache
        /* @internal */
        variances?: VarianceFlags[];  // Variance of each type parameter
    }

    export const enum ElementFlags {
        Required  = 1 << 0,  // T
        Optional  = 1 << 1,  // T?
        Rest      = 1 << 2,  // ...T[]
        Variadic  = 1 << 3,  // ...T
        Variable  = Rest | Variadic,
    }

    export interface TupleType extends GenericType {
        elementFlags: readonly ElementFlags[];
        minLength: number;
        fixedLength: number;
        hasRestElement: boolean;
        combinedFlags: ElementFlags;
        readonly: boolean;
        labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration)[];
    }

    export interface TupleTypeReference extends TypeReference {
        target: TupleType;
    }

    export interface UnionOrIntersectionType extends Type {
        types: Type[];                    // Constituent types
        /* @internal */
        objectFlags: ObjectFlags;
        /* @internal */
        propertyCache: SymbolTable;       // Cache of resolved properties
        /* @internal */
        resolvedProperties: Symbol[];
        /* @internal */
        resolvedIndexType: IndexType;
        /* @internal */
        resolvedStringIndexType: IndexType;
        /* @internal */
        resolvedBaseConstraint: Type;
    }

    export interface UnionType extends UnionOrIntersectionType {
        /* @internal */
        resolvedReducedType: Type;
        /* @internal */
        regularType: UnionType;
    }

    export interface IntersectionType extends UnionOrIntersectionType {
        /* @internal */
        resolvedApparentType: Type;
    }

    export type StructuredType = ObjectType | UnionType | IntersectionType;

    /* @internal */
    // An instantiated anonymous type has a target and a mapper
    export interface AnonymousType extends ObjectType {
        target?: AnonymousType;  // Instantiation target
        mapper?: TypeMapper;     // Instantiation mapper
    }

    /* @internal */
    export interface MappedType extends AnonymousType {
        declaration: MappedTypeNode;
        typeParameter?: TypeParameter;
        constraintType?: Type;
        templateType?: Type;
        modifiersType?: Type;
        resolvedApparentType?: Type;
    }

    export interface EvolvingArrayType extends ObjectType {
        elementType: Type;      // Element expressions of evolving array type
        finalArrayType?: Type;  // Final array type of evolving array type
    }

    /* @internal */
    export interface ReverseMappedType extends ObjectType {
        source: Type;
        mappedType: MappedType;
        constraintType: IndexType;
    }

    /* @internal */
    // Resolved object, union, or intersection type
    export interface ResolvedType extends ObjectType, UnionOrIntersectionType {
        members: SymbolTable;             // Properties by name
        properties: Symbol[];             // Properties
        callSignatures: readonly Signature[];      // Call signatures of type
        constructSignatures: readonly Signature[]; // Construct signatures of type
    }

    /* @internal */
    // Object literals are initially marked fresh. Freshness disappears following an assignment,
    // before a type assertion, or when an object literal's type is widened. The regular
    // version of a fresh type is identical except for the TypeFlags.FreshObjectLiteral flag.
    export interface FreshObjectLiteralType extends ResolvedType {
        regularType: ResolvedType;  // Regular version of fresh type
    }

    /* @internal */
    export interface IterationTypes {
        readonly yieldType: Type;
        readonly returnType: Type;
        readonly nextType: Type;
    }

    // Just a place to cache element types of iterables and iterators
    /* @internal */
    export interface IterableOrIteratorType extends ObjectType, UnionType {
        iterationTypesOfGeneratorReturnType?: IterationTypes;
        iterationTypesOfAsyncGeneratorReturnType?: IterationTypes;
        iterationTypesOfIterable?: IterationTypes;
        iterationTypesOfIterator?: IterationTypes;
        iterationTypesOfAsyncIterable?: IterationTypes;
        iterationTypesOfAsyncIterator?: IterationTypes;
        iterationTypesOfIteratorResult?: IterationTypes;
    }

    /* @internal */
    export interface PromiseOrAwaitableType extends ObjectType, UnionType {
        promiseTypeOfPromiseConstructor?: Type;
        promisedTypeOfPromise?: Type;
        awaitedTypeOfType?: Type;
    }

    /* @internal */
    export interface SyntheticDefaultModuleType extends Type {
        syntheticType?: Type;
    }

    export interface InstantiableType extends Type {
        /* @internal */
        resolvedBaseConstraint?: Type;
        /* @internal */
        resolvedIndexType?: IndexType;
        /* @internal */
        resolvedStringIndexType?: IndexType;
    }

    // Type parameters (TypeFlags.TypeParameter)
    export interface TypeParameter extends InstantiableType {
        /** Retrieve using getConstraintFromTypeParameter */
        /* @internal */
        constraint?: Type;        // Constraint
        /* @internal */
        default?: Type;
        /* @internal */
        target?: TypeParameter;  // Instantiation target
        /* @internal */
        mapper?: TypeMapper;     // Instantiation mapper
        /* @internal */
        isThisType?: boolean;
        /* @internal */
        resolvedDefaultType?: Type;
    }

    // Indexed access types (TypeFlags.IndexedAccess)
    // Possible forms are T[xxx], xxx[T], or xxx[keyof T], where T is a type variable
    export interface IndexedAccessType extends InstantiableType {
        objectType: Type;
        indexType: Type;
        constraint?: Type;
        simplifiedForReading?: Type;
        simplifiedForWriting?: Type;
    }

    export type TypeVariable = TypeParameter | IndexedAccessType;

    // keyof T types (TypeFlags.Index)
    export interface IndexType extends InstantiableType {
        type: InstantiableType | UnionOrIntersectionType;
        /* @internal */
        stringsOnly: boolean;
    }

    export interface ConditionalRoot {
        node: ConditionalTypeNode;
        checkType: Type;
        extendsType: Type;
        trueType: Type;
        falseType: Type;
        isDistributive: boolean;
        inferTypeParameters?: TypeParameter[];
        outerTypeParameters?: TypeParameter[];
        instantiations?: Map<string, Type>;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: Type[];
    }

    // T extends U ? X : Y (TypeFlags.Conditional)
    export interface ConditionalType extends InstantiableType {
        root: ConditionalRoot;
        checkType: Type;
        extendsType: Type;
        resolvedTrueType: Type;
        resolvedFalseType: Type;
        /* @internal */
        resolvedInferredTrueType?: Type; // The `trueType` instantiated with the `combinedMapper`, if present
        /* @internal */
        resolvedDefaultConstraint?: Type;
        /* @internal */
        mapper?: TypeMapper;
        /* @internal */
        combinedMapper?: TypeMapper;
    }

    // Type parameter substitution (TypeFlags.Substitution)
    // Substitution types are created for type parameters or indexed access types that occur in the
    // true branch of a conditional type. For example, in 'T extends string ? Foo<T> : Bar<T>', the
    // reference to T in Foo<T> is resolved as a substitution type that substitutes 'string & T' for T.
    // Thus, if Foo has a 'string' constraint on its type parameter, T will satisfy it. Substitution
    // types disappear upon instantiation (just like type parameters).
    export interface SubstitutionType extends InstantiableType {
        baseType: Type;     // Target type
        substitute: Type;   // Type to substitute for type parameter
    }

    /* @internal */
    export const enum JsxReferenceKind {
        Component,
        Function,
        Mixed
    }

    export const enum SignatureKind {
        Call,
        Construct,
    }

    /* @internal */
    export const enum SignatureFlags {
        None = 0,
        HasRestParameter = 1 << 0,          // Indicates last parameter is rest parameter
        HasLiteralTypes = 1 << 1,           // Indicates signature is specialized
        IsInnerCallChain = 1 << 2,          // Indicates signature comes from a CallChain nested in an outer OptionalChain
        IsOuterCallChain = 1 << 3,          // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
        IsUntypedSignatureInJSFile = 1 << 4, // Indicates signature is from a js file and has no types

        // We do not propagate `IsInnerCallChain` to instantiated signatures, as that would result in us
        // attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
        // instantiating the return type.
        PropagatingFlags = HasRestParameter | HasLiteralTypes,

        CallChainFlags = IsInnerCallChain | IsOuterCallChain,
    }

    export interface Signature {
        /* @internal */ flags: SignatureFlags;
        /* @internal */ checker?: TypeChecker;
        declaration?: SignatureDeclaration | JSDocSignature; // Originating declaration
        typeParameters?: readonly TypeParameter[];   // Type parameters (undefined if non-generic)
        parameters: readonly Symbol[];               // Parameters
        /* @internal */
        thisParameter?: Symbol;             // symbol of this-type parameter
        /* @internal */
        // See comment in `instantiateSignature` for why these are set lazily.
        resolvedReturnType?: Type;          // Lazily set by `getReturnTypeOfSignature`.
        /* @internal */
        // Lazily set by `getTypePredicateOfSignature`.
        // `undefined` indicates a type predicate that has not yet been computed.
        // Uses a special `noTypePredicate` sentinel value to indicate that there is no type predicate. This looks like a TypePredicate at runtime to avoid polymorphism.
        resolvedTypePredicate?: TypePredicate;
        /* @internal */
        minArgumentCount: number;           // Number of non-optional parameters
        /* @internal */
        target?: Signature;                 // Instantiation target
        /* @internal */
        mapper?: TypeMapper;                // Instantiation mapper
        /* @internal */
        unionSignatures?: Signature[];      // Underlying signatures of a union signature
        /* @internal */
        erasedSignatureCache?: Signature;   // Erased version of signature (deferred)
        /* @internal */
        canonicalSignatureCache?: Signature; // Canonical version of signature (deferred)
        /* @internal */
        optionalCallSignatureCache?: { inner?: Signature, outer?: Signature }; // Optional chained call version of signature (deferred)
        /* @internal */
        isolatedSignatureType?: ObjectType; // A manufactured type that just contains the signature for purposes of signature comparison
        /* @internal */
        instantiations?: Map<string, Signature>;    // Generic signature instantiation cache
    }

    export const enum IndexKind {
        String,
        Number,
    }

    export interface IndexInfo {
        type: Type;
        isReadonly: boolean;
        declaration?: IndexSignatureDeclaration;
    }

    /* @internal */
    export const enum TypeMapKind {
        Simple,
        Array,
        Function,
        Composite,
        Merged,
    }

    /* @internal */
    export type TypeMapper =
        | { kind: TypeMapKind.Simple, source: Type, target: Type }
        | { kind: TypeMapKind.Array, sources: readonly Type[], targets: readonly Type[] | undefined }
        | { kind: TypeMapKind.Function, func: (t: Type) => Type }
        | { kind: TypeMapKind.Composite | TypeMapKind.Merged, mapper1: TypeMapper, mapper2: TypeMapper };

    export const enum InferencePriority {
        NakedTypeVariable            = 1 << 0,  // Naked type variable in union or intersection type
        HomomorphicMappedType        = 1 << 1,  // Reverse inference for homomorphic mapped type
        PartialHomomorphicMappedType = 1 << 2,  // Partial reverse inference for homomorphic mapped type
        MappedTypeConstraint         = 1 << 3,  // Reverse inference for mapped type
        ContravariantConditional     = 1 << 4,  // Conditional type in contravariant position
        ReturnType                   = 1 << 5,  // Inference made from return type of generic function
        LiteralKeyof                 = 1 << 6,  // Inference made from a string literal to a keyof T
        NoConstraints                = 1 << 7,  // Don't infer from constraints of instantiable types
        AlwaysStrict                 = 1 << 8,  // Always use strict rules for contravariant inferences
        MaxValue                     = 1 << 9,  // Seed for inference priority tracking

        PriorityImpliesCombination = ReturnType | MappedTypeConstraint | LiteralKeyof,  // These priorities imply that the resulting type should be a combination of all candidates
        Circularity = -1,  // Inference circularity (value less than all other priorities)
    }

    /* @internal */
    export interface InferenceInfo {
        typeParameter: TypeParameter;            // Type parameter for which inferences are being made
        candidates: Type[] | undefined;          // Candidates in covariant positions (or undefined)
        contraCandidates: Type[] | undefined;    // Candidates in contravariant positions (or undefined)
        inferredType?: Type;                     // Cache for resolved inferred type
        priority?: InferencePriority;            // Priority of current inference set
        topLevel: boolean;                       // True if all inferences are to top level occurrences
        isFixed: boolean;                        // True if inferences are fixed
        impliedArity?: number;
    }

    /* @internal */
    export const enum InferenceFlags {
        None            =      0,  // No special inference behaviors
        NoDefault       = 1 << 0,  // Infer unknownType for no inferences (otherwise anyType or emptyObjectType)
        AnyDefault      = 1 << 1,  // Infer anyType for no inferences (otherwise emptyObjectType)
        SkippedGenericFunction = 1 << 2, // A generic function was skipped during inference
    }

    /**
     * Ternary values are defined such that
     * x & y is False if either x or y is False.
     * x & y is Maybe if either x or y is Maybe, but neither x or y is False.
     * x & y is True if both x and y are True.
     * x | y is False if both x and y are False.
     * x | y is Maybe if either x or y is Maybe, but neither x or y is True.
     * x | y is True if either x or y is True.
     */
    /* @internal */
    export const enum Ternary {
        False = 0,
        Maybe = 1,
        True = -1
    }

    /* @internal */
    export type TypeComparer = (s: Type, t: Type, reportErrors?: boolean) => Ternary;

    /* @internal */
    export interface InferenceContext {
        inferences: InferenceInfo[];                  // Inferences made for each type parameter
        signature?: Signature;                        // Generic signature for which inferences are made (if any)
        flags: InferenceFlags;                        // Inference flags
        compareTypes: TypeComparer;                   // Type comparer function
        mapper: TypeMapper;                           // Mapper that fixes inferences
        nonFixingMapper: TypeMapper;                  // Mapper that doesn't fix inferences
        returnMapper?: TypeMapper;                    // Type mapper for inferences from return types (if any)
        inferredTypeParameters?: readonly TypeParameter[]; // Inferred type parameters for function result
    }

    /* @internal */
    export interface WideningContext {
        parent?: WideningContext;       // Parent context
        propertyName?: __String;        // Name of property in parent
        siblings?: Type[];              // Types of siblings
        resolvedProperties?: Symbol[];  // Properties occurring in sibling object literals
    }

    /* @internal */
    export const enum AssignmentDeclarationKind {
        None,
        /// exports.name = expr
        ExportsProperty,
        /// module.exports = expr
        ModuleExports,
        /// className.prototype.name = expr
        PrototypeProperty,
        /// this.name = expr
        ThisProperty,
        // F.name = expr
        Property,
        // F.prototype = { ... }
        Prototype,
        // Object.defineProperty(x, 'name', { value: any, writable?: boolean (false by default) });
        // Object.defineProperty(x, 'name', { get: Function, set: Function });
        // Object.defineProperty(x, 'name', { get: Function });
        // Object.defineProperty(x, 'name', { set: Function });
        ObjectDefinePropertyValue,
        // Object.defineProperty(exports || module.exports, 'name', ...);
        ObjectDefinePropertyExports,
        // Object.defineProperty(Foo.prototype, 'name', ...);
        ObjectDefinePrototypeProperty,
    }

    /** @deprecated Use FileExtensionInfo instead. */
    export type JsFileExtensionInfo = FileExtensionInfo;

    export interface FileExtensionInfo {
        extension: string;
        isMixedContent: boolean;
        scriptKind?: ScriptKind;
    }

    export interface DiagnosticMessage {
        key: string;
        category: DiagnosticCategory;
        code: number;
        message: string;
        reportsUnnecessary?: {};
        reportsDeprecated?: {};
        /* @internal */
        elidedInCompatabilityPyramid?: boolean;
    }

    /**
     * A linked list of formatted diagnostic messages to be used as part of a multiline message.
     * It is built from the bottom up, leaving the head to be the "main" diagnostic.
     * While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
     * the difference is that messages are all preformatted in DMC.
     */
    export interface DiagnosticMessageChain {
        messageText: string;
        category: DiagnosticCategory;
        code: number;
        next?: DiagnosticMessageChain[];
    }

    export interface Diagnostic extends DiagnosticRelatedInformation {
        /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
        reportsUnnecessary?: {};

        reportsDeprecated?: {}
        source?: string;
        relatedInformation?: DiagnosticRelatedInformation[];
        /* @internal */ skippedOn?: keyof CompilerOptions;
    }

    export interface DiagnosticRelatedInformation {
        category: DiagnosticCategory;
        code: number;
        file: SourceFile | undefined;
        start: number | undefined;
        length: number | undefined;
        messageText: string | DiagnosticMessageChain;
    }

    export interface DiagnosticWithLocation extends Diagnostic {
        file: SourceFile;
        start: number;
        length: number;
    }

    /* @internal*/
    export interface DiagnosticWithDetachedLocation extends Diagnostic {
        file: undefined;
        fileName: string;
        start: number;
        length: number;
    }

    export enum DiagnosticCategory {
        Warning,
        Error,
        Suggestion,
        Message
    }
    /* @internal */
    export function diagnosticCategoryName(d: { category: DiagnosticCategory }, lowerCase = true): string {
        const name = DiagnosticCategory[d.category];
        return lowerCase ? name.toLowerCase() : name;
    }

    export enum ModuleResolutionKind {
        Classic  = 1,
        NodeJs   = 2
    }

    export interface PluginImport {
        name: string;
    }

    export interface ProjectReference {
        /** A normalized path on disk */
        path: string;
        /** The path as the user originally wrote it */
        originalPath?: string;
        /** True if the output of this reference should be prepended to the output of this project. Only valid for --outFile compilations */
        prepend?: boolean;
        /** True if it is intended that this reference form a circularity */
        circular?: boolean;
    }

    export enum WatchFileKind {
        FixedPollingInterval,
        PriorityPollingInterval,
        DynamicPriorityPolling,
        UseFsEvents,
        UseFsEventsOnParentDirectory,
    }

    export enum WatchDirectoryKind {
        UseFsEvents,
        FixedPollingInterval,
        DynamicPriorityPolling,
    }

    export enum PollingWatchKind {
        FixedInterval,
        PriorityInterval,
        DynamicPriority,
    }

    export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined;

    export interface CompilerOptions {
        /*@internal*/ all?: boolean;
        allowJs?: boolean;
        /*@internal*/ allowNonTsExtensions?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUmdGlobalAccess?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;  // Always combine with strict property
        baseUrl?: string;
        /** An error if set - this should only go through the -b pipeline and not actually be observed */
        /*@internal*/
        build?: boolean;
        charset?: string;
        checkJs?: boolean;
        /* @internal */ configFilePath?: string;
        /** configFile is set as non enumerable property so as to avoid checking of json source files */
        /* @internal */ readonly configFile?: TsConfigSourceFile;
        declaration?: boolean;
        declarationMap?: boolean;
        emitDeclarationOnly?: boolean;
        declarationDir?: string;
        /* @internal */ diagnostics?: boolean;
        /* @internal */ extendedDiagnostics?: boolean;
        disableSizeLimit?: boolean;
        disableSourceOfProjectReferenceRedirect?: boolean;
        disableSolutionSearching?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        /*@internal*/generateCpuProfile?: string;
        /*@internal*/help?: boolean;
        importHelpers?: boolean;
        importsNotUsedAsValues?: ImportsNotUsedAsValues;
        /*@internal*/init?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit;
        keyofStringsOnly?: boolean;
        lib?: string[];
        /*@internal*/listEmittedFiles?: boolean;
        /*@internal*/listFiles?: boolean;
        /*@internal*/listFilesOnly?: boolean;
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind;
        moduleResolution?: ModuleResolutionKind;
        newLine?: NewLineKind;
        noEmit?: boolean;
        /*@internal*/noEmitForJsFiles?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;  // Always combine with strict property
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;  // Always combine with strict property
        noStrictGenericChecks?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        /*@internal*/ plugins?: PluginImport[];
        preserveConstEnums?: boolean;
        preserveSymlinks?: boolean;
        /* @internal */ preserveWatchOutput?: boolean;
        project?: string;
        /* @internal */ pretty?: boolean;
        reactNamespace?: string;
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        composite?: boolean;
        incremental?: boolean;
        tsBuildInfoFile?: string;
        removeComments?: boolean;
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        skipDefaultLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictFunctionTypes?: boolean;  // Always combine with strict property
        strictBindCallApply?: boolean;  // Always combine with strict property
        strictNullChecks?: boolean;  // Always combine with strict property
        strictPropertyInitialization?: boolean;  // Always combine with strict property
        stripInternal?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        /* @internal */ suppressOutputPathCheck?: boolean;
        target?: ScriptTarget; // TODO: GH#18217 frequently asserted as defined
        traceResolution?: boolean;
        resolveJsonModule?: boolean;
        types?: string[];
        /** Paths used to compute primary types search locations */
        typeRoots?: string[];
        /*@internal*/ version?: boolean;
        /*@internal*/ watch?: boolean;
        esModuleInterop?: boolean;
        /* @internal */ showConfig?: boolean;
        useDefineForClassFields?: boolean;

        [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
    }

    export interface WatchOptions {
        watchFile?: WatchFileKind;
        watchDirectory?: WatchDirectoryKind;
        fallbackPolling?: PollingWatchKind;
        synchronousWatchDirectory?: boolean;

        [option: string]: CompilerOptionsValue | undefined;
    }

    export interface TypeAcquisition {
        /**
         * @deprecated typingOptions.enableAutoDiscovery
         * Use typeAcquisition.enable instead.
         */
        enableAutoDiscovery?: boolean;
        enable?: boolean;
        include?: string[];
        exclude?: string[];
        [option: string]: string[] | boolean | undefined;
    }

    export enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
        UMD = 3,
        System = 4,

        // NOTE: ES module kinds should be contiguous to more easily check whether a module kind is *any* ES module kind.
        //       Non-ES module kinds should not come between ES2015 (the earliest ES module kind) and ESNext (the last ES
        //       module kind).
        ES2015 = 5,
        ES2020 = 6,
        ESNext = 99
    }

    export const enum JsxEmit {
        None = 0,
        Preserve = 1,
        React = 2,
        ReactNative = 3
    }

    export const enum ImportsNotUsedAsValues {
        Remove,
        Preserve,
        Error
    }

    export const enum NewLineKind {
        CarriageReturnLineFeed = 0,
        LineFeed = 1
    }

    export interface LineAndCharacter {
        /** 0-based. */
        line: number;
        /*
         * 0-based. This value denotes the character position in line and is different from the 'column' because of tab characters.
         */
        character: number;
    }

    export const enum ScriptKind {
        Unknown = 0,
        JS = 1,
        JSX = 2,
        TS = 3,
        TSX = 4,
        External = 5,
        JSON = 6,
        /**
         * Used on extensions that doesn't define the ScriptKind but the content defines it.
         * Deferred extensions are going to be included in all project contexts.
         */
        Deferred = 7
    }

    export const enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES2015 = 2,
        ES2016 = 3,
        ES2017 = 4,
        ES2018 = 5,
        ES2019 = 6,
        ES2020 = 7,
        ESNext = 99,
        JSON = 100,
        Latest = ESNext,
    }

    export const enum LanguageVariant {
        Standard,
        JSX
    }

    /** Either a parsed command line or a parsed tsconfig.json */
    export interface ParsedCommandLine {
        options: CompilerOptions;
        typeAcquisition?: TypeAcquisition;
        fileNames: string[];
        projectReferences?: readonly ProjectReference[];
        watchOptions?: WatchOptions;
        raw?: any;
        errors: Diagnostic[];
        wildcardDirectories?: MapLike<WatchDirectoryFlags>;
        compileOnSave?: boolean;
        /* @internal */ configFileSpecs?: ConfigFileSpecs;
    }

    export const enum WatchDirectoryFlags {
        None = 0,
        Recursive = 1 << 0,
    }

    /* @internal */
    export interface ConfigFileSpecs {
        filesSpecs: readonly string[] | undefined;
        /**
         * Present to report errors (user specified specs), validatedIncludeSpecs are used for file name matching
         */
        includeSpecs?: readonly string[];
        /**
         * Present to report errors (user specified specs), validatedExcludeSpecs are used for file name matching
         */
        excludeSpecs?: readonly string[];
        validatedIncludeSpecs?: readonly string[];
        validatedExcludeSpecs?: readonly string[];
        wildcardDirectories: MapLike<WatchDirectoryFlags>;
    }

    export interface ExpandResult {
        fileNames: string[];
        wildcardDirectories: MapLike<WatchDirectoryFlags>;
        /* @internal */ spec: ConfigFileSpecs;
    }

    /* @internal */
    export type RequireResult<T = {}> =
        | { module: T, modulePath?: string, error: undefined }
        | { module: undefined, modulePath?: undefined, error: { stack?: string, message?: string } };

    export interface CreateProgramOptions {
        rootNames: readonly string[];
        options: CompilerOptions;
        projectReferences?: readonly ProjectReference[];
        host?: CompilerHost;
        oldProgram?: Program;
        configFileParsingDiagnostics?: readonly Diagnostic[];
    }

    /* @internal */
    export interface CommandLineOptionBase {
        name: string;
        type: "string" | "number" | "boolean" | "object" | "list" | Map<string, number | string>;    // a value of a primitive type, or an object literal mapping named values to actual values
        isFilePath?: boolean;                                   // True if option value is a path or fileName
        shortName?: string;                                     // A short mnemonic for convenience - for instance, 'h' can be used in place of 'help'
        description?: DiagnosticMessage;                        // The message describing what the command line switch does
        paramType?: DiagnosticMessage;                          // The name to be used for a non-boolean option's parameter
        isTSConfigOnly?: boolean;                               // True if option can only be specified via tsconfig.json file
        isCommandLineOnly?: boolean;
        showInSimplifiedHelpView?: boolean;
        category?: DiagnosticMessage;
        strictFlag?: true;                                      // true if the option is one of the flag under strict
        affectsSourceFile?: true;                               // true if we should recreate SourceFiles after this option changes
        affectsModuleResolution?: true;                         // currently same effect as `affectsSourceFile`
        affectsBindDiagnostics?: true;                          // true if this affects binding (currently same effect as `affectsSourceFile`)
        affectsSemanticDiagnostics?: true;                      // true if option affects semantic diagnostics
        affectsEmit?: true;                                     // true if the options affects emit
        transpileOptionValue?: boolean | undefined;             // If set this means that the option should be set to this value when transpiling
    }

    /* @internal */
    export interface CommandLineOptionOfPrimitiveType extends CommandLineOptionBase {
        type: "string" | "number" | "boolean";
    }

    /* @internal */
    export interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
        type: Map<string, number | string>;  // an object literal mapping named values to actual values
    }

    /* @internal */
    export interface DidYouMeanOptionsDiagnostics {
        optionDeclarations: CommandLineOption[];
        unknownOptionDiagnostic: DiagnosticMessage,
        unknownDidYouMeanDiagnostic: DiagnosticMessage,
    }

    /* @internal */
    export interface TsConfigOnlyOption extends CommandLineOptionBase {
        type: "object";
        elementOptions?: Map<string, CommandLineOption>;
        extraKeyDiagnostics?: DidYouMeanOptionsDiagnostics;
    }

    /* @internal */
    export interface CommandLineOptionOfListType extends CommandLineOptionBase {
        type: "list";
        element: CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType | TsConfigOnlyOption;
    }

    /* @internal */
    export type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfPrimitiveType | TsConfigOnlyOption | CommandLineOptionOfListType;

    /* @internal */
    export const enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 0x7F,

        lineFeed = 0x0A,              // \n
        carriageReturn = 0x0D,        // \r
        lineSeparator = 0x2028,
        paragraphSeparator = 0x2029,
        nextLine = 0x0085,

        // Unicode 3.0 space characters
        space = 0x0020,   // " "
        nonBreakingSpace = 0x00A0,   //
        enQuad = 0x2000,
        emQuad = 0x2001,
        enSpace = 0x2002,
        emSpace = 0x2003,
        threePerEmSpace = 0x2004,
        fourPerEmSpace = 0x2005,
        sixPerEmSpace = 0x2006,
        figureSpace = 0x2007,
        punctuationSpace = 0x2008,
        thinSpace = 0x2009,
        hairSpace = 0x200A,
        zeroWidthSpace = 0x200B,
        narrowNoBreakSpace = 0x202F,
        ideographicSpace = 0x3000,
        mathematicalSpace = 0x205F,
        ogham = 0x1680,

        _ = 0x5F,
        $ = 0x24,

        _0 = 0x30,
        _1 = 0x31,
        _2 = 0x32,
        _3 = 0x33,
        _4 = 0x34,
        _5 = 0x35,
        _6 = 0x36,
        _7 = 0x37,
        _8 = 0x38,
        _9 = 0x39,

        a = 0x61,
        b = 0x62,
        c = 0x63,
        d = 0x64,
        e = 0x65,
        f = 0x66,
        g = 0x67,
        h = 0x68,
        i = 0x69,
        j = 0x6A,
        k = 0x6B,
        l = 0x6C,
        m = 0x6D,
        n = 0x6E,
        o = 0x6F,
        p = 0x70,
        q = 0x71,
        r = 0x72,
        s = 0x73,
        t = 0x74,
        u = 0x75,
        v = 0x76,
        w = 0x77,
        x = 0x78,
        y = 0x79,
        z = 0x7A,

        A = 0x41,
        B = 0x42,
        C = 0x43,
        D = 0x44,
        E = 0x45,
        F = 0x46,
        G = 0x47,
        H = 0x48,
        I = 0x49,
        J = 0x4A,
        K = 0x4B,
        L = 0x4C,
        M = 0x4D,
        N = 0x4E,
        O = 0x4F,
        P = 0x50,
        Q = 0x51,
        R = 0x52,
        S = 0x53,
        T = 0x54,
        U = 0x55,
        V = 0x56,
        W = 0x57,
        X = 0x58,
        Y = 0x59,
        Z = 0x5a,

        ampersand = 0x26,             // &
        asterisk = 0x2A,              // *
        at = 0x40,                    // @
        backslash = 0x5C,             // \
        backtick = 0x60,              // `
        bar = 0x7C,                   // |
        caret = 0x5E,                 // ^
        closeBrace = 0x7D,            // }
        closeBracket = 0x5D,          // ]
        closeParen = 0x29,            // )
        colon = 0x3A,                 // :
        comma = 0x2C,                 // ,
        dot = 0x2E,                   // .
        doubleQuote = 0x22,           // "
        equals = 0x3D,                // =
        exclamation = 0x21,           // !
        greaterThan = 0x3E,           // >
        hash = 0x23,                  // #
        lessThan = 0x3C,              // <
        minus = 0x2D,                 // -
        openBrace = 0x7B,             // {
        openBracket = 0x5B,           // [
        openParen = 0x28,             // (
        percent = 0x25,               // %
        plus = 0x2B,                  // +
        question = 0x3F,              // ?
        semicolon = 0x3B,             // ;
        singleQuote = 0x27,           // '
        slash = 0x2F,                 // /
        tilde = 0x7E,                 // ~

        backspace = 0x08,             // \b
        formFeed = 0x0C,              // \f
        byteOrderMark = 0xFEFF,
        tab = 0x09,                   // \t
        verticalTab = 0x0B,           // \v
    }

    export interface ModuleResolutionHost {
        // TODO: GH#18217 Optional methods frequently used as non-optional

        fileExists(fileName: string): boolean;
        // readFile function is used to read arbitrary text files on disk, i.e. when resolution procedure needs the content of 'package.json'
        // to determine location of bundled typings for node module
        readFile(fileName: string): string | undefined;
        trace?(s: string): void;
        directoryExists?(directoryName: string): boolean;
        /**
         * Resolve a symbolic link.
         * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
         */
        realpath?(path: string): string;
        getCurrentDirectory?(): string;
        getDirectories?(path: string): string[];
    }

    /**
     * Represents the result of module resolution.
     * Module resolution will pick up tsx/jsx/js files even if '--jsx' and '--allowJs' are turned off.
     * The Program will then filter results based on these flags.
     *
     * Prefer to return a `ResolvedModuleFull` so that the file type does not have to be inferred.
     */
    export interface ResolvedModule {
        /** Path of the file the module was resolved to. */
        resolvedFileName: string;
        /** True if `resolvedFileName` comes from `node_modules`. */
        isExternalLibraryImport?: boolean;
    }

    /**
     * ResolvedModule with an explicitly provided `extension` property.
     * Prefer this over `ResolvedModule`.
     * If changing this, remember to change `moduleResolutionIsEqualTo`.
     */
    export interface ResolvedModuleFull extends ResolvedModule {
        /* @internal */
        readonly originalPath?: string;
        /**
         * Extension of resolvedFileName. This must match what's at the end of resolvedFileName.
         * This is optional for backwards-compatibility, but will be added if not provided.
         */
        extension: Extension;
        packageId?: PackageId;
    }

    /**
     * Unique identifier with a package name and version.
     * If changing this, remember to change `packageIdIsEqual`.
     */
    export interface PackageId {
        /**
         * Name of the package.
         * Should not include `@types`.
         * If accessing a non-index file, this should include its name e.g. "foo/bar".
         */
        name: string;
        /**
         * Name of a submodule within this package.
         * May be "".
         */
        subModuleName: string;
        /** Version of the package, e.g. "1.2.3" */
        version: string;
    }

    export const enum Extension {
        Ts = ".ts",
        Tsx = ".tsx",
        Dts = ".d.ts",
        Js = ".js",
        Jsx = ".jsx",
        Json = ".json",
        TsBuildInfo = ".tsbuildinfo"
    }

    export interface ResolvedModuleWithFailedLookupLocations {
        readonly resolvedModule: ResolvedModuleFull | undefined;
        /* @internal */
        readonly failedLookupLocations: string[];
    }

    export interface ResolvedTypeReferenceDirective {
        // True if the type declaration file was found in a primary lookup location
        primary: boolean;
        // The location of the .d.ts file we located, or undefined if resolution failed
        resolvedFileName: string | undefined;
        packageId?: PackageId;
        /** True if `resolvedFileName` comes from `node_modules`. */
        isExternalLibraryImport?: boolean;
    }

    export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
        readonly failedLookupLocations: string[];
    }

    /* @internal */
    export type HasInvalidatedResolution = (sourceFile: Path) => boolean;
    /* @internal */
    export type HasChangedAutomaticTypeDirectiveNames = () => boolean;

    export interface CompilerHost extends ModuleResolutionHost {
        getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
        getSourceFileByPath?(fileName: string, path: Path, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
        getCancellationToken?(): CancellationToken;
        getDefaultLibFileName(options: CompilerOptions): string;
        getDefaultLibLocation?(): string;
        writeFile: WriteFileCallback;
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[];

        /*
         * CompilerHost must either implement resolveModuleNames (in case if it wants to be completely in charge of
         * module name resolution) or provide implementation for methods from ModuleResolutionHost (in this case compiler
         * will apply built-in module resolution logic and use members of ModuleResolutionHost to ask host specific questions).
         * If resolveModuleNames is implemented then implementation for members from ModuleResolutionHost can be just
         * 'throw new Error("NotImplemented")'
         */
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions): (ResolvedModule | undefined)[];
        /**
         * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
         */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions): (ResolvedTypeReferenceDirective | undefined)[];
        getEnvironmentVariable?(name: string): string | undefined;
        /* @internal */ onReleaseOldSourceFile?(oldSourceFile: SourceFile, oldOptions: CompilerOptions, hasSourceFileByPath: boolean): void;
        /* @internal */ hasInvalidatedResolution?: HasInvalidatedResolution;
        /* @internal */ hasChangedAutomaticTypeDirectiveNames?: HasChangedAutomaticTypeDirectiveNames;
        createHash?(data: string): string;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        /* @internal */ useSourceOfProjectReferenceRedirect?(): boolean;

        // TODO: later handle this in better way in builder host instead once the api for tsbuild finalizes and doesn't use compilerHost as base
        /*@internal*/createDirectory?(directory: string): void;
        /*@internal*/getSymlinks?(): ReadonlyMap<string, string>;
    }

    /** true if --out otherwise source file name */
    /*@internal*/
    export type SourceOfProjectReferenceRedirect = string | true;

    /*@internal*/
    export interface ResolvedProjectReferenceCallbacks {
        getSourceOfProjectReferenceRedirect(fileName: string): SourceOfProjectReferenceRedirect | undefined;
        forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference | undefined, resolvedProjectReferencePath: Path) => T | undefined): T | undefined;
    }

    /* @internal */
    export const enum TransformFlags {
        None = 0,

        // Facts
        // - Flags used to indicate that a node or subtree contains syntax that requires transformation.
        ContainsTypeScript = 1 << 0,
        ContainsJsx = 1 << 1,
        ContainsESNext = 1 << 2,
        ContainsES2020 = 1 << 3,
        ContainsES2019 = 1 << 4,
        ContainsES2018 = 1 << 5,
        ContainsES2017 = 1 << 6,
        ContainsES2016 = 1 << 7,
        ContainsES2015 = 1 << 8,
        ContainsGenerator = 1 << 9,
        ContainsDestructuringAssignment = 1 << 10,

        // Markers
        // - Flags used to indicate that a subtree contains a specific transformation.
        ContainsTypeScriptClassSyntax = 1 << 11, // Decorators, Property Initializers, Parameter Property Initializers
        ContainsLexicalThis = 1 << 12,
        ContainsRestOrSpread = 1 << 13,
        ContainsObjectRestOrSpread = 1 << 14,
        ContainsComputedPropertyName = 1 << 15,
        ContainsBlockScopedBinding = 1 << 16,
        ContainsBindingPattern = 1 << 17,
        ContainsYield = 1 << 18,
        ContainsAwait = 1 << 19,
        ContainsHoistedDeclarationOrCompletion = 1 << 20,
        ContainsDynamicImport = 1 << 21,
        ContainsClassFields = 1 << 22,
        ContainsPossibleTopLevelAwait = 1 << 23,

        // Please leave this as 1 << 29.
        // It is the maximum bit we can set before we outgrow the size of a v8 small integer (SMI) on an x86 system.
        // It is a good reminder of how much room we have left
        HasComputedFlags = 1 << 29, // Transform flags have been computed.

        // Assertions
        // - Bitmasks that are used to assert facts about the syntax of a node and its subtree.
        AssertTypeScript = ContainsTypeScript,
        AssertJsx = ContainsJsx,
        AssertESNext = ContainsESNext,
        AssertES2020 = ContainsES2020,
        AssertES2019 = ContainsES2019,
        AssertES2018 = ContainsES2018,
        AssertES2017 = ContainsES2017,
        AssertES2016 = ContainsES2016,
        AssertES2015 = ContainsES2015,
        AssertGenerator = ContainsGenerator,
        AssertDestructuringAssignment = ContainsDestructuringAssignment,

        // Scope Exclusions
        // - Bitmasks that exclude flags from propagating out of a specific context
        //   into the subtree flags of their container.
        OuterExpressionExcludes = HasComputedFlags,
        PropertyAccessExcludes = OuterExpressionExcludes,
        NodeExcludes = PropertyAccessExcludes,
        ArrowFunctionExcludes = NodeExcludes | ContainsTypeScriptClassSyntax | ContainsBlockScopedBinding | ContainsYield | ContainsAwait | ContainsHoistedDeclarationOrCompletion | ContainsBindingPattern | ContainsObjectRestOrSpread | ContainsPossibleTopLevelAwait,
        FunctionExcludes = NodeExcludes | ContainsTypeScriptClassSyntax | ContainsLexicalThis | ContainsBlockScopedBinding | ContainsYield | ContainsAwait | ContainsHoistedDeclarationOrCompletion | ContainsBindingPattern | ContainsObjectRestOrSpread | ContainsPossibleTopLevelAwait,
        ConstructorExcludes = NodeExcludes | ContainsLexicalThis | ContainsBlockScopedBinding | ContainsYield | ContainsAwait | ContainsHoistedDeclarationOrCompletion | ContainsBindingPattern | ContainsObjectRestOrSpread | ContainsPossibleTopLevelAwait,
        MethodOrAccessorExcludes = NodeExcludes | ContainsLexicalThis | ContainsBlockScopedBinding | ContainsYield | ContainsAwait | ContainsHoistedDeclarationOrCompletion | ContainsBindingPattern | ContainsObjectRestOrSpread,
        PropertyExcludes = NodeExcludes | ContainsLexicalThis,
        ClassExcludes = NodeExcludes | ContainsTypeScriptClassSyntax | ContainsComputedPropertyName,
        ModuleExcludes = NodeExcludes | ContainsTypeScriptClassSyntax | ContainsLexicalThis | ContainsBlockScopedBinding | ContainsHoistedDeclarationOrCompletion | ContainsPossibleTopLevelAwait,
        TypeExcludes = ~ContainsTypeScript,
        ObjectLiteralExcludes = NodeExcludes | ContainsTypeScriptClassSyntax | ContainsComputedPropertyName | ContainsObjectRestOrSpread,
        ArrayLiteralOrCallOrNewExcludes = NodeExcludes | ContainsRestOrSpread,
        VariableDeclarationListExcludes = NodeExcludes | ContainsBindingPattern | ContainsObjectRestOrSpread,
        ParameterExcludes = NodeExcludes,
        CatchClauseExcludes = NodeExcludes | ContainsObjectRestOrSpread,
        BindingPatternExcludes = NodeExcludes | ContainsRestOrSpread,

        // Propagating flags
        // - Bitmasks for flags that should propagate from a child
        PropertyNamePropagatingFlags = ContainsLexicalThis,

        // Masks
        // - Additional bitmasks
    }

    export interface SourceMapRange extends TextRange {
        source?: SourceMapSource;
    }

    export interface SourceMapSource {
        fileName: string;
        text: string;
        /* @internal */ lineMap: readonly number[];
        skipTrivia?: (pos: number) => number;
    }

    /* @internal */
    export interface EmitNode {
        annotatedNodes?: Node[];                 // Tracks Parse-tree nodes with EmitNodes for eventual cleanup.
        flags: EmitFlags;                        // Flags that customize emit
        leadingComments?: SynthesizedComment[];  // Synthesized leading comments
        trailingComments?: SynthesizedComment[]; // Synthesized trailing comments
        commentRange?: TextRange;                // The text range to use when emitting leading or trailing comments
        sourceMapRange?: SourceMapRange;         // The text range to use when emitting leading or trailing source mappings
        tokenSourceMapRanges?: (SourceMapRange | undefined)[]; // The text range to use when emitting source mappings for tokens
        constantValue?: string | number;         // The constant value of an expression
        externalHelpersModuleName?: Identifier;  // The local name for an imported helpers module
        externalHelpers?: boolean;
        helpers?: EmitHelper[];                  // Emit helpers for the node
        startsOnNewLine?: boolean;               // If the node should begin on a new line
    }

    export const enum EmitFlags {
        None = 0,
        SingleLine = 1 << 0,                    // The contents of this node should be emitted on a single line.
        AdviseOnEmitNode = 1 << 1,              // The printer should invoke the onEmitNode callback when printing this node.
        NoSubstitution = 1 << 2,                // Disables further substitution of an expression.
        CapturesThis = 1 << 3,                  // The function captures a lexical `this`
        NoLeadingSourceMap = 1 << 4,            // Do not emit a leading source map location for this node.
        NoTrailingSourceMap = 1 << 5,           // Do not emit a trailing source map location for this node.
        NoSourceMap = NoLeadingSourceMap | NoTrailingSourceMap, // Do not emit a source map location for this node.
        NoNestedSourceMaps = 1 << 6,            // Do not emit source map locations for children of this node.
        NoTokenLeadingSourceMaps = 1 << 7,      // Do not emit leading source map location for token nodes.
        NoTokenTrailingSourceMaps = 1 << 8,     // Do not emit trailing source map location for token nodes.
        NoTokenSourceMaps = NoTokenLeadingSourceMaps | NoTokenTrailingSourceMaps, // Do not emit source map locations for tokens of this node.
        NoLeadingComments = 1 << 9,             // Do not emit leading comments for this node.
        NoTrailingComments = 1 << 10,           // Do not emit trailing comments for this node.
        NoComments = NoLeadingComments | NoTrailingComments, // Do not emit comments for this node.
        NoNestedComments = 1 << 11,
        HelperName = 1 << 12,                   // The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
        ExportName = 1 << 13,                   // Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
        LocalName = 1 << 14,                    // Ensure an export prefix is not added for an identifier that points to an exported declaration.
        InternalName = 1 << 15,                 // The name is internal to an ES5 class body function.
        Indented = 1 << 16,                     // Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
        NoIndentation = 1 << 17,                // Do not indent the node.
        AsyncFunctionBody = 1 << 18,
        ReuseTempVariableScope = 1 << 19,       // Reuse the existing temp variable scope during emit.
        CustomPrologue = 1 << 20,               // Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
        NoHoisting = 1 << 21,                   // Do not hoist this declaration in --module system
        HasEndOfDeclarationMarker = 1 << 22,    // Declaration has an associated NotEmittedStatement to mark the end of the declaration
        Iterator = 1 << 23,                     // The expression to a `yield*` should be treated as an Iterator when down-leveling, not an Iterable.
        NoAsciiEscaping = 1 << 24,              // When synthesizing nodes that lack an original node or textSourceNode, we want to write the text on the node with ASCII escaping substitutions.
        /*@internal*/ TypeScriptClassWrapper = 1 << 25, // The node is an IIFE class wrapper created by the ts transform.
        /*@internal*/ NeverApplyImportHelper = 1 << 26, // Indicates the node should never be wrapped with an import star helper (because, for example, it imports tslib itself)
        /*@internal*/ IgnoreSourceNewlines = 1 << 27,   // Overrides `printerOptions.preserveSourceNewlines` to print this node (and all descendants) with default whitespace.
    }

    export interface EmitHelper {
        readonly name: string;                                          // A unique name for this helper.
        readonly scoped: boolean;                                       // Indicates whether the helper MUST be emitted in the current scope.
        readonly text: string | ((node: EmitHelperUniqueNameCallback) => string);  // ES3-compatible raw script text, or a function yielding such a string
        readonly priority?: number;                                     // Helpers with a higher priority are emitted earlier than other helpers on the node.
        readonly dependencies?: EmitHelper[]
    }

    export interface UnscopedEmitHelper extends EmitHelper {
        readonly scoped: false;                                         // Indicates whether the helper MUST be emitted in the current scope.
        /* @internal */
        readonly importName?: string;                                   // The name of the helper to use when importing via `--importHelpers`.
        readonly text: string;                                          // ES3-compatible raw script text, or a function yielding such a string
    }

    /* @internal */
    export type UniqueNameHandler = (baseName: string, checkFn?: (name: string) => boolean, optimistic?: boolean) => string;

    export type EmitHelperUniqueNameCallback = (name: string) => string;

    /**
     * Used by the checker, this enum keeps track of external emit helpers that should be type
     * checked.
     */
    /* @internal */
    export const enum ExternalEmitHelpers {
        Extends = 1 << 0,               // __extends (used by the ES2015 class transformation)
        Assign = 1 << 1,                // __assign (used by Jsx and ESNext object spread transformations)
        Rest = 1 << 2,                  // __rest (used by ESNext object rest transformation)
        Decorate = 1 << 3,              // __decorate (used by TypeScript decorators transformation)
        Metadata = 1 << 4,              // __metadata (used by TypeScript decorators transformation)
        Param = 1 << 5,                 // __param (used by TypeScript decorators transformation)
        Awaiter = 1 << 6,               // __awaiter (used by ES2017 async functions transformation)
        Generator = 1 << 7,             // __generator (used by ES2015 generator transformation)
        Values = 1 << 8,                // __values (used by ES2015 for..of and yield* transformations)
        Read = 1 << 9,                  // __read (used by ES2015 iterator destructuring transformation)
        Spread = 1 << 10,               // __spread (used by ES2015 array spread and argument list spread transformations)
        SpreadArrays = 1 << 11,         // __spreadArrays (used by ES2015 array spread and argument list spread transformations)
        Await = 1 << 12,                // __await (used by ES2017 async generator transformation)
        AsyncGenerator = 1 << 13,       // __asyncGenerator (used by ES2017 async generator transformation)
        AsyncDelegator = 1 << 14,       // __asyncDelegator (used by ES2017 async generator yield* transformation)
        AsyncValues = 1 << 15,          // __asyncValues (used by ES2017 for..await..of transformation)
        ExportStar = 1 << 16,           // __exportStar (used by CommonJS/AMD/UMD module transformation)
        MakeTemplateObject = 1 << 17,   // __makeTemplateObject (used for constructing template string array objects)
        ClassPrivateFieldGet = 1 << 18, // __classPrivateFieldGet (used by the class private field transformation)
        ClassPrivateFieldSet = 1 << 19, // __classPrivateFieldSet (used by the class private field transformation)
        CreateBinding = 1 << 20,        // __createBinding (use by the module transform for (re)exports and namespace imports)
        FirstEmitHelper = Extends,
        LastEmitHelper = CreateBinding,

        // Helpers included by ES2015 for..of
        ForOfIncludes = Values,

        // Helpers included by ES2017 for..await..of
        ForAwaitOfIncludes = AsyncValues,

        // Helpers included by ES2017 async generators
        AsyncGeneratorIncludes = Await | AsyncGenerator,

        // Helpers included by yield* in ES2017 async generators
        AsyncDelegatorIncludes = Await | AsyncDelegator | AsyncValues,

        // Helpers included by ES2015 spread
        SpreadIncludes = Read | Spread,

    }

    export const enum EmitHint {
        SourceFile,          // Emitting a SourceFile
        Expression,          // Emitting an Expression
        IdentifierName,      // Emitting an IdentifierName
        MappedTypeParameter, // Emitting a TypeParameterDeclaration inside of a MappedTypeNode
        Unspecified,         // Emitting an otherwise unspecified node
        EmbeddedStatement,   // Emitting an embedded statement
        JsxAttributeValue,   // Emitting a JSX attribute value
    }

    /* @internal */
    export interface SourceFileMayBeEmittedHost {
        getCompilerOptions(): CompilerOptions;
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined;
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    }

    /* @internal */
    export interface EmitHost extends ScriptReferenceHost, ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
        getSourceFiles(): readonly SourceFile[];
        useCaseSensitiveFileNames(): boolean;
        getCurrentDirectory(): string;

        getLibFileFromReference(ref: FileReference): SourceFile | undefined;

        getCommonSourceDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;

        isEmitBlocked(emitFileName: string): boolean;

        getPrependNodes(): readonly (InputFiles | UnparsedSource)[];

        writeFile: WriteFileCallback;
        getProgramBuildInfo(): ProgramBuildInfo | undefined;
        getSourceFileFromReference: Program["getSourceFileFromReference"];
        readonly redirectTargetsMap: RedirectTargetsMap;
    }

    /* @internal */
    export interface PropertyDescriptorAttributes {
        enumerable?: boolean | Expression;
        configurable?: boolean | Expression;
        writable?: boolean | Expression;
        value?: Expression;
        get?: Expression;
        set?: Expression;
    }

    export const enum OuterExpressionKinds {
        Parentheses = 1 << 0,
        TypeAssertions = 1 << 1,
        NonNullAssertions = 1 << 2,
        PartiallyEmittedExpressions = 1 << 3,

        Assertions = TypeAssertions | NonNullAssertions,
        All = Parentheses | Assertions | PartiallyEmittedExpressions
    }

    /* @internal */
    export type OuterExpression =
        | ParenthesizedExpression
        | TypeAssertion
        | AsExpression
        | NonNullExpression
        | PartiallyEmittedExpression;

    export type TypeOfTag = "undefined" | "number" | "bigint" | "boolean" | "string" | "symbol" | "object" | "function";

    /* @internal */
    export interface CallBinding {
        target: LeftHandSideExpression;
        thisArg: Expression;
    }

    /* @internal */
    export interface ParenthesizerRules {
        parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression): Expression;
        parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression;
        parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression;
        parenthesizeConditionOfConditionalExpression(condition: Expression): Expression;
        parenthesizeBranchOfConditionalExpression(branch: Expression): Expression;
        parenthesizeExpressionOfExportDefault(expression: Expression): Expression;
        parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression;
        parenthesizeLeftSideOfAccess(expression: Expression): LeftHandSideExpression;
        parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression;
        parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression;
        parenthesizeExpressionsOfCommaDelimitedList(elements: readonly Expression[]): NodeArray<Expression>;
        parenthesizeExpressionForDisallowedComma(expression: Expression): Expression;
        parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression;
        parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
        parenthesizeMemberOfConditionalType(member: TypeNode): TypeNode;
        parenthesizeMemberOfElementType(member: TypeNode): TypeNode;
        parenthesizeElementTypeOfArrayType(member: TypeNode): TypeNode;
        parenthesizeConstituentTypesOfUnionOrIntersectionType(members: readonly TypeNode[]): NodeArray<TypeNode>;
        parenthesizeTypeArguments(typeParameters: readonly TypeNode[] | undefined): NodeArray<TypeNode> | undefined;
    }

    /* @internal */
    export interface NodeConverters {
        convertToFunctionBlock(node: ConciseBody, multiLine?: boolean): Block;
        convertToFunctionExpression(node: FunctionDeclaration): FunctionExpression;
        convertToArrayAssignmentElement(element: ArrayBindingOrAssignmentElement): Expression;
        convertToObjectAssignmentElement(element: ObjectBindingOrAssignmentElement): ObjectLiteralElementLike;
        convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern;
        convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern): ObjectLiteralExpression;
        convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern): ArrayLiteralExpression;
        convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression;
    }

    export interface NodeFactory {
        /* @internal */ readonly parenthesizer: ParenthesizerRules;
        /* @internal */ readonly converters: NodeConverters;
        createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;

        //
        // Literals
        //

        createNumericLiteral(value: string | number, numericLiteralFlags?: TokenFlags): NumericLiteral;
        createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral;
        createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
        /* @internal*/ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral; // eslint-disable-line @typescript-eslint/unified-signatures
        createStringLiteralFromNode(sourceNode: PropertyNameLiteral, isSingleQuote?: boolean): StringLiteral;
        createRegularExpressionLiteral(text: string): RegularExpressionLiteral;

        //
        // Identifiers
        //

        createIdentifier(text: string): Identifier;
        /* @internal */ createIdentifier(text: string, typeArguments?: readonly (TypeNode | TypeParameterDeclaration)[], originalKeywordKind?: SyntaxKind): Identifier; // eslint-disable-line @typescript-eslint/unified-signatures
        /* @internal */ updateIdentifier(node: Identifier, typeArguments: NodeArray<TypeNode | TypeParameterDeclaration> | undefined): Identifier;

        /** Create a unique temporary variable. */
        createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined): Identifier;
        /* @internal */ createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): Identifier; // eslint-disable-line @typescript-eslint/unified-signatures

        /** Create a unique temporary variable for use in a loop. */
        createLoopVariable(): Identifier;

        /** Create a unique name based on the supplied text. */
        createUniqueName(text: string, flags?: GeneratedIdentifierFlags): Identifier;

        /** Create a unique name generated for a node. */
        getGeneratedNameForNode(node: Node | undefined): Identifier;
        /* @internal */ getGeneratedNameForNode(node: Node | undefined, flags?: GeneratedIdentifierFlags): Identifier; // eslint-disable-line @typescript-eslint/unified-signatures

        createPrivateIdentifier(text: string): PrivateIdentifier

        //
        // Punctuation
        //

        createToken(token: SyntaxKind.SuperKeyword): SuperExpression;
        createToken(token: SyntaxKind.ThisKeyword): ThisExpression;
        createToken(token: SyntaxKind.NullKeyword): NullLiteral;
        createToken(token: SyntaxKind.TrueKeyword): TrueLiteral;
        createToken(token: SyntaxKind.FalseKeyword): FalseLiteral;
        createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>;
        createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>;
        createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>;
        createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>;
        createToken<TKind extends SyntaxKind.Unknown | SyntaxKind.EndOfFileToken>(token: TKind): Token<TKind>;
        /*@internal*/ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;

        //
        // Reserved words
        //

        createSuper(): SuperExpression;
        createThis(): ThisExpression;
        createNull(): NullLiteral;
        createTrue(): TrueLiteral;
        createFalse(): FalseLiteral;

        //
        // Modifiers
        //

        createModifier<T extends ModifierSyntaxKind>(kind: T): ModifierToken<T>;
        createModifiersFromModifierFlags(flags: ModifierFlags): Modifier[];

        //
        // Names
        //

        createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
        updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName;
        createComputedPropertyName(expression: Expression): ComputedPropertyName;
        updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;

        //
        // Signature elements
        //

        createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        createDecorator(expression: Expression): Decorator;
        updateDecorator(node: Decorator, expression: Expression): Decorator;

        //
        // Type Elements
        //

        createPropertySignature(modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
        updatePropertySignature(node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
        createPropertyDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        updatePropertyDeclaration(node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
        createMethodSignature(modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): MethodSignature;
        updateMethodSignature(node: MethodSignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): MethodSignature;
        createMethodDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        updateMethodDeclaration(node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): MethodDeclaration;
        createConstructorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        updateConstructorDeclaration(node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
        createGetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        updateGetAccessorDeclaration(node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): GetAccessorDeclaration;
        createSetAccessorDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        updateSetAccessorDeclaration(node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
        createCallSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration;
        updateCallSignature(node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): CallSignatureDeclaration;
        createConstructSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration;
        updateConstructSignature(node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): ConstructSignatureDeclaration;
        createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        /* @internal */ createIndexSignature(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): IndexSignatureDeclaration; // eslint-disable-line @typescript-eslint/unified-signatures
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;

        //
        // Types
        //

        createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind>;
        createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode;
        updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode;
        createTypeReferenceNode(typeName: string | EntityName, typeArguments?: readonly TypeNode[]): TypeReferenceNode;
        updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
        createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode;
        updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): FunctionTypeNode;
        createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        updateConstructorTypeNode(node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
        createTypeQueryNode(exprName: EntityName): TypeQueryNode;
        updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName): TypeQueryNode;
        createTypeLiteralNode(members: readonly TypeElement[] | undefined): TypeLiteralNode;
        updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>): TypeLiteralNode;
        createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;
        updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode;
        createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
        updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
        createNamedTupleMember(dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
        updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
        createOptionalTypeNode(type: TypeNode): OptionalTypeNode;
        updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode;
        createRestTypeNode(type: TypeNode): RestTypeNode;
        updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode;
        createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
        updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>): UnionTypeNode;
        createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode;
        updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>): IntersectionTypeNode;
        createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
        updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
        createInferTypeNode(typeParameter: TypeParameterDeclaration): InferTypeNode;
        updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration): InferTypeNode;
        createImportTypeNode(argument: TypeNode, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
        updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
        createParenthesizedType(type: TypeNode): ParenthesizedTypeNode;
        updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode;
        createThisTypeNode(): ThisTypeNode;
        createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
        updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode;
        createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
        updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
        createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode;
        updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined): MappedTypeNode;
        createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode;
        updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]): LiteralTypeNode;

        //
        // Binding Patterns
        //

        createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern;
        updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern;
        createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
        updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;

        //
        // Expression
        //

        createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression;
        updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression;
        createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
        updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression;
        createPropertyAccessExpression(expression: Expression, name: string | Identifier | PrivateIdentifier): PropertyAccessExpression;
        updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: Identifier | PrivateIdentifier): PropertyAccessExpression;
        createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | Identifier | PrivateIdentifier): PropertyAccessChain;
        updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: Identifier | PrivateIdentifier): PropertyAccessChain;
        createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression;
        updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression): ElementAccessExpression;
        createElementAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression): ElementAccessChain;
        updateElementAccessChain(node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessChain;
        createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallExpression;
        updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallExpression;
        createCallChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallChain;
        updateCallChain(node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallChain;
        createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
        updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
        createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
        updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
        createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion;
        updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression): TypeAssertion;
        createParenthesizedExpression(expression: Expression): ParenthesizedExpression;
        updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression;
        createFunctionExpression(modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block): FunctionExpression;
        updateFunctionExpression(node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block): FunctionExpression;
        createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        createDeleteExpression(expression: Expression): DeleteExpression;
        updateDeleteExpression(node: DeleteExpression, expression: Expression): DeleteExpression;
        createTypeOfExpression(expression: Expression): TypeOfExpression;
        updateTypeOfExpression(node: TypeOfExpression, expression: Expression): TypeOfExpression;
        createVoidExpression(expression: Expression): VoidExpression;
        updateVoidExpression(node: VoidExpression, expression: Expression): VoidExpression;
        createAwaitExpression(expression: Expression): AwaitExpression;
        updateAwaitExpression(node: AwaitExpression, expression: Expression): AwaitExpression;
        createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression;
        updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression): PrefixUnaryExpression;
        createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
        updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression): PostfixUnaryExpression;
        createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
        updateBinaryExpression(node: BinaryExpression, left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
        createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
        updateConditionalExpression(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
        createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
        updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
        createTemplateHead(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateHead;
        createTemplateHead(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateHead;
        createTemplateMiddle(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateMiddle;
        createTemplateMiddle(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateMiddle;
        createTemplateTail(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateTail;
        createTemplateTail(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateTail;
        createNoSubstitutionTemplateLiteral(text: string, rawText?: string): NoSubstitutionTemplateLiteral;
        createNoSubstitutionTemplateLiteral(text: string | undefined, rawText: string): NoSubstitutionTemplateLiteral;
        /* @internal */ createLiteralLikeNode(kind: LiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): LiteralToken;
        /* @internal */ createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string, templateFlags: TokenFlags | undefined): TemplateLiteralLikeNode;
        createYieldExpression(asteriskToken: AsteriskToken, expression: Expression): YieldExpression;
        createYieldExpression(asteriskToken: undefined, expression: Expression | undefined): YieldExpression;
        /* @internal */ createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression; // eslint-disable-line @typescript-eslint/unified-signatures
        updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression;
        createSpreadElement(expression: Expression): SpreadElement;
        updateSpreadElement(node: SpreadElement, expression: Expression): SpreadElement;
        createClassExpression(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        updateClassExpression(node: ClassExpression, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
        createOmittedExpression(): OmittedExpression;
        createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
        updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
        createAsExpression(expression: Expression, type: TypeNode): AsExpression;
        updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression;
        createNonNullExpression(expression: Expression): NonNullExpression;
        updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression;
        createNonNullChain(expression: Expression): NonNullChain;
        updateNonNullChain(node: NonNullChain, expression: Expression): NonNullChain;
        createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier): MetaProperty;
        updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty;

        //
        // Misc
        //

        createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        createSemicolonClassElement(): SemicolonClassElement;

        //
        // Element
        //

        createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
        updateBlock(node: Block, statements: readonly Statement[]): Block;
        createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
        updateVariableStatement(node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList): VariableStatement;
        createEmptyStatement(): EmptyStatement;
        createExpressionStatement(expression: Expression): ExpressionStatement;
        updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement;
        createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
        updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement;
        createDoStatement(statement: Statement, expression: Expression): DoStatement;
        updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement;
        createWhileStatement(expression: Expression, statement: Statement): WhileStatement;
        updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement;
        createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
        updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
        createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
        updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
        createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
        updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
        createContinueStatement(label?: string | Identifier): ContinueStatement;
        updateContinueStatement(node: ContinueStatement, label: Identifier | undefined): ContinueStatement;
        createBreakStatement(label?: string | Identifier): BreakStatement;
        updateBreakStatement(node: BreakStatement, label: Identifier | undefined): BreakStatement;
        createReturnStatement(expression?: Expression): ReturnStatement;
        updateReturnStatement(node: ReturnStatement, expression: Expression | undefined): ReturnStatement;
        createWithStatement(expression: Expression, statement: Statement): WithStatement;
        updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement;
        createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement;
        updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement;
        createLabeledStatement(label: string | Identifier, statement: Statement): LabeledStatement;
        updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement;
        createThrowStatement(expression: Expression): ThrowStatement;
        updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement;
        createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
        updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
        createDebuggerStatement(): DebuggerStatement;
        createVariableDeclaration(name: string | BindingName, exclamationToken?: ExclamationToken, type?: TypeNode, initializer?: Expression): VariableDeclaration;
        updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
        updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]): VariableDeclarationList;
        createFunctionDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        updateFunctionDeclaration(node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
        createClassDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        updateClassDeclaration(node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
        createInterfaceDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        updateInterfaceDeclaration(node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
        createTypeAliasDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        updateTypeAliasDeclaration(node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
        createEnumDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
        updateEnumDeclaration(node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
        createModuleDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
        updateModuleDeclaration(node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
        createModuleBlock(statements: readonly Statement[]): ModuleBlock;
        updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]): ModuleBlock;
        createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock;
        updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]): CaseBlock;
        createNamespaceExportDeclaration(name: string | Identifier): NamespaceExportDeclaration;
        updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration;
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression): ImportDeclaration;
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression): ImportDeclaration;
        createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        createNamespaceImport(name: Identifier): NamespaceImport;
        updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport;
        createNamespaceExport(name: Identifier): NamespaceExport;
        updateNamespaceExport(node: NamespaceExport, name: Identifier): NamespaceExport;
        createNamedImports(elements: readonly ImportSpecifier[]): NamedImports;
        updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports;
        createImportSpecifier(propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        updateImportSpecifier(node: ImportSpecifier, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression): ExportDeclaration;
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined): ExportDeclaration;
        createNamedExports(elements: readonly ExportSpecifier[]): NamedExports;
        updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports;
        createExportSpecifier(propertyName: string | Identifier | undefined, name: string | Identifier): ExportSpecifier;
        updateExportSpecifier(node: ExportSpecifier, propertyName: Identifier | undefined, name: Identifier): ExportSpecifier;
        /* @internal*/ createMissingDeclaration(): MissingDeclaration;

        //
        // Module references
        //

        createExternalModuleReference(expression: Expression): ExternalModuleReference;
        updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference;

        //
        // JSDoc
        //

        createJSDocAllType(): JSDocAllType;
        createJSDocUnknownType(): JSDocUnknownType;
        createJSDocNonNullableType(type: TypeNode): JSDocNonNullableType;
        updateJSDocNonNullableType(node: JSDocNonNullableType, type: TypeNode): JSDocNonNullableType;
        createJSDocNullableType(type: TypeNode): JSDocNullableType;
        updateJSDocNullableType(node: JSDocNullableType, type: TypeNode): JSDocNullableType;
        createJSDocOptionalType(type: TypeNode): JSDocOptionalType;
        updateJSDocOptionalType(node: JSDocOptionalType, type: TypeNode): JSDocOptionalType;
        createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
        updateJSDocFunctionType(node: JSDocFunctionType, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
        createJSDocVariadicType(type: TypeNode): JSDocVariadicType;
        updateJSDocVariadicType(node: JSDocVariadicType, type: TypeNode): JSDocVariadicType;
        createJSDocNamepathType(type: TypeNode): JSDocNamepathType;
        updateJSDocNamepathType(node: JSDocNamepathType, type: TypeNode): JSDocNamepathType;
        createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression;
        updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression;
        createJSDocTypeLiteral(jsDocPropertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral;
        updateJSDocTypeLiteral(node: JSDocTypeLiteral, jsDocPropertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean | undefined): JSDocTypeLiteral;
        createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature;
        updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature;
        createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string): JSDocTemplateTag;
        updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | undefined): JSDocTemplateTag;
        createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | JSDocTypeLiteral, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocTypedefTag;
        updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | undefined): JSDocTypedefTag;
        createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocParameterTag;
        updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | undefined): JSDocParameterTag;
        createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string): JSDocPropertyTag;
        updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | undefined): JSDocPropertyTag;
        createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string): JSDocTypeTag;
        updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | undefined): JSDocTypeTag;
        createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocReturnTag;
        updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | undefined): JSDocReturnTag;
        createJSDocThisTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocThisTag;
        updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | undefined): JSDocThisTag;
        createJSDocEnumTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string): JSDocEnumTag;
        updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | undefined): JSDocEnumTag;
        createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string): JSDocCallbackTag;
        updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | undefined): JSDocCallbackTag;
        createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string): JSDocAugmentsTag;
        updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment: string | undefined): JSDocAugmentsTag;
        createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string): JSDocImplementsTag;
        updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment: string | undefined): JSDocImplementsTag;
        createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string): JSDocAuthorTag;
        updateJSDocAuthorTag(node: JSDocAuthorTag, tagName: Identifier | undefined, comment: string | undefined): JSDocAuthorTag;
        createJSDocClassTag(tagName: Identifier | undefined, comment?: string): JSDocClassTag;
        updateJSDocClassTag(node: JSDocClassTag, tagName: Identifier | undefined, comment: string | undefined): JSDocClassTag;
        createJSDocPublicTag(tagName: Identifier | undefined, comment?: string): JSDocPublicTag;
        updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier | undefined, comment: string | undefined): JSDocPublicTag;
        createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string): JSDocPrivateTag;
        updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier | undefined, comment: string | undefined): JSDocPrivateTag;
        createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string): JSDocProtectedTag;
        updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier | undefined, comment: string | undefined): JSDocProtectedTag;
        createJSDocReadonlyTag(tagName: Identifier | undefined, comment?: string): JSDocReadonlyTag;
        updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier | undefined, comment: string | undefined): JSDocReadonlyTag;
        createJSDocUnknownTag(tagName: Identifier, comment?: string): JSDocUnknownTag;
        updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | undefined): JSDocUnknownTag;
        createJSDocDeprecatedTag(tagName: Identifier, comment?: string): JSDocDeprecatedTag;
        updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier, comment?: string): JSDocDeprecatedTag;
        createJSDocComment(comment?: string | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc;
        updateJSDocComment(node: JSDoc, comment: string | undefined, tags: readonly JSDocTag[] | undefined): JSDoc;

        //
        // JSX
        //

        createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
        updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
        createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
        updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
        createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
        updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
        createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement;
        updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement;
        createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
        createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
        updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
        createJsxOpeningFragment(): JsxOpeningFragment;
        createJsxJsxClosingFragment(): JsxClosingFragment;
        updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
        createJsxAttribute(name: Identifier, initializer: StringLiteral | JsxExpression | undefined): JsxAttribute;
        updateJsxAttribute(node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression | undefined): JsxAttribute;
        createJsxAttributes(properties: readonly JsxAttributeLike[]): JsxAttributes;
        updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]): JsxAttributes;
        createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute;
        updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute;
        createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined): JsxExpression;
        updateJsxExpression(node: JsxExpression, expression: Expression | undefined): JsxExpression;

        //
        // Clauses
        //

        createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
        updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause;
        createDefaultClause(statements: readonly Statement[]): DefaultClause;
        updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause;
        createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        createCatchClause(variableDeclaration: string | VariableDeclaration | undefined, block: Block): CatchClause;
        updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause;

        //
        // Property assignments
        //

        createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;
        updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment;
        createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment;
        updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment;
        createSpreadAssignment(expression: Expression): SpreadAssignment;
        updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment;

        //
        // Enum
        //

        createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember;
        updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember;

        //
        // Top-level nodes
        //

        createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
        updateSourceFile(node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean, referencedFiles?: readonly FileReference[], typeReferences?: readonly FileReference[], hasNoDefaultLib?: boolean, libReferences?: readonly FileReference[]): SourceFile;

        /* @internal */ createUnparsedSource(prologues: readonly UnparsedPrologue[], syntheticReferences: readonly UnparsedSyntheticReference[] | undefined, texts: readonly UnparsedSourceText[]): UnparsedSource;
        /* @internal */ createUnparsedPrologue(data?: string): UnparsedPrologue;
        /* @internal */ createUnparsedPrepend(data: string | undefined, texts: readonly UnparsedSourceText[]): UnparsedPrepend;
        /* @internal */ createUnparsedTextLike(data: string | undefined, internal: boolean): UnparsedTextLike;
        /* @internal */ createUnparsedSyntheticReference(section: BundleFileHasNoDefaultLib | BundleFileReference): UnparsedSyntheticReference;
        /* @internal */ createInputFiles(): InputFiles;

        //
        // Synthetic Nodes
        //
        /* @internal */ createSyntheticExpression(type: Type, isSpread?: boolean, tupleNameSource?: ParameterDeclaration | NamedTupleMember): SyntheticExpression;
        /* @internal */ createSyntaxList(children: Node[]): SyntaxList;

        //
        // Transformation nodes
        //

        createNotEmittedStatement(original: Node): NotEmittedStatement;
        /* @internal */ createEndOfDeclarationMarker(original: Node): EndOfDeclarationMarker;
        /* @internal */ createMergeDeclarationMarker(original: Node): MergeDeclarationMarker;
        createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression;
        updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression;
        /* @internal */ createSyntheticReferenceExpression(expression: Expression, thisArg: Expression): SyntheticReferenceExpression;
        /* @internal */ updateSyntheticReferenceExpression(node: SyntheticReferenceExpression, expression: Expression, thisArg: Expression): SyntheticReferenceExpression;
        createCommaListExpression(elements: readonly Expression[]): CommaListExpression;
        updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression;
        createBundle(sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;
        updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;

        //
        // Common operators
        //

        createComma(left: Expression, right: Expression): BinaryExpression;
        createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
        createAssignment(left: Expression, right: Expression): AssignmentExpression<EqualsToken>;
        createLogicalOr(left: Expression, right: Expression): BinaryExpression;
        createLogicalAnd(left: Expression, right: Expression): BinaryExpression;
        createBitwiseOr(left: Expression, right: Expression): BinaryExpression;
        createBitwiseXor(left: Expression, right: Expression): BinaryExpression;
        createBitwiseAnd(left: Expression, right: Expression): BinaryExpression;
        createStrictEquality(left: Expression, right: Expression): BinaryExpression;
        createStrictInequality(left: Expression, right: Expression): BinaryExpression;
        createEquality(left: Expression, right: Expression): BinaryExpression;
        createInequality(left: Expression, right: Expression): BinaryExpression;
        createLessThan(left: Expression, right: Expression): BinaryExpression;
        createLessThanEquals(left: Expression, right: Expression): BinaryExpression;
        createGreaterThan(left: Expression, right: Expression): BinaryExpression;
        createGreaterThanEquals(left: Expression, right: Expression): BinaryExpression;
        createLeftShift(left: Expression, right: Expression): BinaryExpression;
        createRightShift(left: Expression, right: Expression): BinaryExpression;
        createUnsignedRightShift(left: Expression, right: Expression): BinaryExpression;
        createAdd(left: Expression, right: Expression): BinaryExpression;
        createSubtract(left: Expression, right: Expression): BinaryExpression;
        createMultiply(left: Expression, right: Expression): BinaryExpression;
        createDivide(left: Expression, right: Expression): BinaryExpression;
        createModulo(left: Expression, right: Expression): BinaryExpression;
        createExponent(left: Expression, right: Expression): BinaryExpression;
        createPrefixPlus(operand: Expression): PrefixUnaryExpression;
        createPrefixMinus(operand: Expression): PrefixUnaryExpression;
        createPrefixIncrement(operand: Expression): PrefixUnaryExpression;
        createPrefixDecrement(operand: Expression): PrefixUnaryExpression;
        createBitwiseNot(operand: Expression): PrefixUnaryExpression;
        createLogicalNot(operand: Expression): PrefixUnaryExpression;
        createPostfixIncrement(operand: Expression): PostfixUnaryExpression;
        createPostfixDecrement(operand: Expression): PostfixUnaryExpression;

        //
        // Compound Nodes
        //

        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;


        createVoidZero(): VoidExpression;
        createExportDefault(expression: Expression): ExportAssignment;
        createExternalModuleExport(exportName: Identifier): ExportDeclaration;

        /* @internal */ createTypeCheck(value: Expression, tag: TypeOfTag): Expression;
        /* @internal */ createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]): CallExpression;
        /* @internal */ createGlobalMethodCall(globalObjectName: string, globalMethodName: string, argumentsList: readonly Expression[]): CallExpression;
        /* @internal */ createFunctionBindCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]): CallExpression;
        /* @internal */ createFunctionCallCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]): CallExpression;
        /* @internal */ createFunctionApplyCall(target: Expression, thisArg: Expression, argumentsExpression: Expression): CallExpression;
        /* @internal */ createObjectDefinePropertyCall(target: Expression, propertyName: string | Expression, attributes: Expression): CallExpression;
        /* @internal */ createPropertyDescriptor(attributes: PropertyDescriptorAttributes, singleLine?: boolean): ObjectLiteralExpression;
        /* @internal */ createArraySliceCall(array: Expression, start?: number | Expression): CallExpression;
        /* @internal */ createArrayConcatCall(array: Expression, values: readonly Expression[]): CallExpression;
        /* @internal */ createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers?: boolean): CallBinding;
        /* @internal */ inlineExpressions(expressions: readonly Expression[]): Expression;
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
        /* @internal */ getInternalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
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
        /* @internal */ getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
        /**
         * Gets the export name of a declaration. This is primarily used for declarations that can be
         * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
         * export name will *always* be prefixed with a module or namespace export modifier like
         * `"exports."` when emitted as an expression if the name points to an exported symbol.
         *
         * @param node The declaration.
         * @param allowComments A value indicating whether comments may be emitted for the name.
         * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
         */
        /* @internal */ getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
        /**
         * Gets the name of a declaration for use in declarations.
         *
         * @param node The declaration.
         * @param allowComments A value indicating whether comments may be emitted for the name.
         * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
         */
        /* @internal */ getDeclarationName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
        /**
         * Gets a namespace-qualified name for use in expressions.
         *
         * @param ns The namespace identifier.
         * @param name The name.
         * @param allowComments A value indicating whether comments may be emitted for the name.
         * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
         */
        /* @internal */ getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression;
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
        /* @internal */ getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression;

        //
        // Utilities
        //

        restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds?: OuterExpressionKinds): Expression;
        /* @internal */ restoreEnclosingLabel(node: Statement, outermostLabeledStatement: LabeledStatement | undefined, afterRestoreLabelCallback?: (node: LabeledStatement) => void): Statement;
        /* @internal */ createUseStrictPrologue(): PrologueDirective;
        /**
         * Copies any necessary standard and custom prologue-directives into target array.
         * @param source origin statements array
         * @param target result statements array
         * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
         * @param visitor Optional callback used to visit any custom prologue directives.
         */
        /* @internal */ copyPrologue(source: readonly Statement[], target: Push<Statement>, ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node>): number;
        /**
         * Copies only the standard (string-expression) prologue-directives into the target statement-array.
         * @param source origin statements array
         * @param target result statements array
         * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
         */
        /* @internal */ copyStandardPrologue(source: readonly Statement[], target: Push<Statement>, ensureUseStrict?: boolean): number;
        /**
         * Copies only the custom prologue-directives into target statement-array.
         * @param source origin statements array
         * @param target result statements array
         * @param statementOffset The offset at which to begin the copy.
         * @param visitor Optional callback used to visit any custom prologue directives.
         */
        /* @internal */ copyCustomPrologue(source: readonly Statement[], target: Push<Statement>, statementOffset: number, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Node) => boolean): number;
        /* @internal */ copyCustomPrologue(source: readonly Statement[], target: Push<Statement>, statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node>, filter?: (node: Node) => boolean): number | undefined;
        /* @internal */ ensureUseStrict(statements: NodeArray<Statement>): NodeArray<Statement>;
        /* @internal */ liftToBlock(nodes: readonly Node[]): Statement;
        /**
         * Merges generated lexical declarations into a new statement list.
         */
        /* @internal */ mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: readonly Statement[] | undefined): NodeArray<Statement>;
        /**
         * Appends generated lexical declarations to an array of statements.
         */
        /* @internal */ mergeLexicalEnvironment(statements: Statement[], declarations: readonly Statement[] | undefined): Statement[];
        /**
         * Creates a shallow, memberwise clone of a node.
         * - The result will have its `original` pointer set to `node`.
         * - The result will have its `pos` and `end` set to `-1`.
         * - *DO NOT USE THIS* if a more appropriate function is available.
         */
        /* @internal */ cloneNode<T extends Node | undefined>(node: T): T;
        /* @internal */ updateModifiers<T extends HasModifiers>(node: T, modifiers: readonly Modifier[] | ModifierFlags): T;
    }

    /* @internal */
    export const enum LexicalEnvironmentFlags {
        None = 0,
        InParameters = 1 << 0, // currently visiting a parameter list
        VariablesHoistedInParameters = 1 << 1 // a temp variable was hoisted while visiting a parameter list
    }

    export interface CoreTransformationContext {
        readonly factory: NodeFactory;

        /** Gets the compiler options supplied to the transformer. */
        getCompilerOptions(): CompilerOptions;

        /** Starts a new lexical environment. */
        startLexicalEnvironment(): void;

        /* @internal */ setLexicalEnvironmentFlags(flags: LexicalEnvironmentFlags, value: boolean): void;
        /* @internal */ getLexicalEnvironmentFlags(): LexicalEnvironmentFlags;

        /** Suspends the current lexical environment, usually after visiting a parameter list. */
        suspendLexicalEnvironment(): void;

        /** Resumes a suspended lexical environment, usually before visiting a function body. */
        resumeLexicalEnvironment(): void;

        /** Ends a lexical environment, returning any declarations. */
        endLexicalEnvironment(): Statement[] | undefined;

        /** Hoists a function declaration to the containing scope. */
        hoistFunctionDeclaration(node: FunctionDeclaration): void;

        /** Hoists a variable declaration to the containing scope. */
        hoistVariableDeclaration(node: Identifier): void;

        /** Adds an initialization statement to the top of the lexical environment. */
        /* @internal */
        addInitializationStatement(node: Statement): void;
    }

    export interface TransformationContext extends CoreTransformationContext {
        /*@internal*/ getEmitResolver(): EmitResolver;
        /*@internal*/ getEmitHost(): EmitHost;
        /*@internal*/ getEmitHelperFactory(): EmitHelperFactory;

        /** Records a request for a non-scoped emit helper in the current context. */
        requestEmitHelper(helper: EmitHelper): void;

        /** Gets and resets the requested non-scoped emit helpers. */
        readEmitHelpers(): EmitHelper[] | undefined;

        /** Enables expression substitutions in the pretty printer for the provided SyntaxKind. */
        enableSubstitution(kind: SyntaxKind): void;

        /** Determines whether expression substitutions are enabled for the provided node. */
        isSubstitutionEnabled(node: Node): boolean;

        /**
         * Hook used by transformers to substitute expressions just before they
         * are emitted by the pretty printer.
         *
         * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
         * before returning the `NodeTransformer` callback.
         */
        onSubstituteNode: (hint: EmitHint, node: Node) => Node;

        /**
         * Enables before/after emit notifications in the pretty printer for the provided
         * SyntaxKind.
         */
        enableEmitNotification(kind: SyntaxKind): void;

        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        isEmitNotificationEnabled(node: Node): boolean;

        /**
         * Hook used to allow transformers to capture state before or after
         * the printer emits a node.
         *
         * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
         * before returning the `NodeTransformer` callback.
         */
        onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;

        /* @internal */ addDiagnostic(diag: DiagnosticWithLocation): void;
    }

    export interface TransformationResult<T extends Node> {
        /** Gets the transformed source files. */
        transformed: T[];

        /** Gets diagnostics for the transformation. */
        diagnostics?: DiagnosticWithLocation[];

        /**
         * Gets a substitute for a node, if one is available; otherwise, returns the original node.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to substitute.
         */
        substituteNode(hint: EmitHint, node: Node): Node;

        /**
         * Emits a node with possible notification.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node.
         */
        emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;

        /**
         * Indicates if a given node needs an emit notification
         *
         * @param node The node to emit.
         */
        isEmitNotificationEnabled?(node: Node): boolean;

        /**
         * Clean up EmitNode entries on any parse-tree nodes.
         */
        dispose(): void;
    }

    /**
     * A function that is used to initialize and return a `Transformer` callback, which in turn
     * will be used to transform one or more nodes.
     */
    export type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;

    /**
     * A function that transforms a node.
     */
    export type Transformer<T extends Node> = (node: T) => T;

    /**
     * A function that accepts and possibly transforms a node.
     */
    export type Visitor = (node: Node) => VisitResult<Node>;

    export interface NodeVisitor {
        <T extends Node>(nodes: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T;
        <T extends Node>(nodes: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined;
    }

    export interface NodesVisitor {
        <T extends Node>(nodes: NodeArray<T>, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;
        <T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;
    }

    export type VisitResult<T extends Node> = T | T[] | undefined;

    export interface Printer {
        /**
         * Print a node and its subtree as-is, without any emit transformations.
         * @param hint A value indicating the purpose of a node. This is primarily used to
         * distinguish between an `Identifier` used in an expression position, versus an
         * `Identifier` used as an `IdentifierName` as part of a declaration. For most nodes you
         * should just pass `Unspecified`.
         * @param node The node to print. The node and its subtree are printed as-is, without any
         * emit transformations.
         * @param sourceFile A source file that provides context for the node. The source text of
         * the file is used to emit the original source content for literals and identifiers, while
         * the identifiers of the source file are used when generating unique names to avoid
         * collisions.
         */
        printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string;
        /**
         * Prints a list of nodes using the given format flags
         */
        printList<T extends Node>(format: ListFormat, list: NodeArray<T>, sourceFile: SourceFile): string;
        /**
         * Prints a source file as-is, without any emit transformations.
         */
        printFile(sourceFile: SourceFile): string;
        /**
         * Prints a bundle of source files as-is, without any emit transformations.
         */
        printBundle(bundle: Bundle): string;
        /*@internal*/ writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
        /*@internal*/ writeList<T extends Node>(format: ListFormat, list: NodeArray<T> | undefined, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
        /*@internal*/ writeFile(sourceFile: SourceFile, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
        /*@internal*/ writeBundle(bundle: Bundle, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
        /*@internal*/ bundleFileInfo?: BundleFileInfo;
    }

    /*@internal*/
    export const enum BundleFileSectionKind {
        Prologue = "prologue",
        EmitHelpers = "emitHelpers",
        NoDefaultLib = "no-default-lib",
        Reference = "reference",
        Type = "type",
        Lib = "lib",
        Prepend = "prepend",
        Text = "text",
        Internal = "internal",
        // comments?
    }

    /*@internal*/
    export interface BundleFileSectionBase extends TextRange {
        kind: BundleFileSectionKind;
        data?: string;
    }

    /*@internal*/
    export interface BundleFilePrologue extends BundleFileSectionBase {
        kind: BundleFileSectionKind.Prologue;
        data: string;
    }

    /*@internal*/
    export interface BundleFileEmitHelpers extends BundleFileSectionBase {
        kind: BundleFileSectionKind.EmitHelpers;
        data: string;
    }

    /*@internal*/
    export interface BundleFileHasNoDefaultLib extends BundleFileSectionBase {
        kind: BundleFileSectionKind.NoDefaultLib;
    }

    /*@internal*/
    export interface BundleFileReference extends BundleFileSectionBase {
        kind: BundleFileSectionKind.Reference | BundleFileSectionKind.Type | BundleFileSectionKind.Lib;
        data: string;
    }

    /*@internal*/
    export interface BundleFilePrepend extends BundleFileSectionBase {
        kind: BundleFileSectionKind.Prepend;
        data: string;
        texts: BundleFileTextLike[];
    }

    /*@internal*/
    export type BundleFileTextLikeKind = BundleFileSectionKind.Text | BundleFileSectionKind.Internal;

    /*@internal*/
    export interface BundleFileTextLike extends BundleFileSectionBase {
        kind: BundleFileTextLikeKind;
    }

    /*@internal*/
    export type BundleFileSection =
        BundleFilePrologue
        | BundleFileEmitHelpers
        | BundleFileHasNoDefaultLib
        | BundleFileReference
        | BundleFilePrepend
        | BundleFileTextLike;

    /*@internal*/
    export interface SourceFilePrologueDirectiveExpression extends TextRange {
        text: string;
    }

    /*@internal*/
    export interface SourceFilePrologueDirective extends TextRange {
        expression: SourceFilePrologueDirectiveExpression;
    }

    /*@internal*/
    export interface SourceFilePrologueInfo {
        file: number;
        text: string;
        directives: SourceFilePrologueDirective[];
    }

    /*@internal*/
    export interface SourceFileInfo {
        // List of helpers in own source files emitted if no prepend is present
        helpers?: string[];
        prologues?: SourceFilePrologueInfo[];
    }

    /*@internal*/
    export interface BundleFileInfo {
        sections: BundleFileSection[];
        sources?: SourceFileInfo;
    }

    /*@internal*/
    export interface BundleBuildInfo {
        js?: BundleFileInfo;
        dts?: BundleFileInfo;
        commonSourceDirectory: string;
        sourceFiles: readonly string[];
    }

    /* @internal */
    export interface BuildInfo {
        bundle?: BundleBuildInfo;
        program?: ProgramBuildInfo;
        version: string;
    }

    export interface PrintHandlers {
        /**
         * A hook used by the Printer when generating unique names to avoid collisions with
         * globally defined names that exist outside of the current source file.
         */
        hasGlobalName?(name: string): boolean;
        /**
         * A hook used by the Printer to provide notifications prior to emitting a node. A
         * compatible implementation **must** invoke `emitCallback` with the provided `hint` and
         * `node` values.
         * @param hint A hint indicating the intended purpose of the node.
         * @param node The node to emit.
         * @param emitCallback A callback that, when invoked, will emit the node.
         * @example
         * ```ts
         * var printer = createPrinter(printerOptions, {
         *   onEmitNode(hint, node, emitCallback) {
         *     // set up or track state prior to emitting the node...
         *     emitCallback(hint, node);
         *     // restore state after emitting the node...
         *   }
         * });
         * ```
         */
        onEmitNode?(hint: EmitHint, node: Node | undefined, emitCallback: (hint: EmitHint, node: Node | undefined) => void): void;

        /**
         * A hook used to check if an emit notification is required for a node.
         * @param node The node to emit.
         */
        isEmitNotificationEnabled?(node: Node | undefined): boolean;
        /**
         * A hook used by the Printer to perform just-in-time substitution of a node. This is
         * primarily used by node transformations that need to substitute one node for another,
         * such as replacing `myExportedVar` with `exports.myExportedVar`.
         * @param hint A hint indicating the intended purpose of the node.
         * @param node The node to emit.
         * @example
         * ```ts
         * var printer = createPrinter(printerOptions, {
         *   substituteNode(hint, node) {
         *     // perform substitution if necessary...
         *     return node;
         *   }
         * });
         * ```
         */
        substituteNode?(hint: EmitHint, node: Node): Node;
        /*@internal*/ onEmitSourceMapOfNode?: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
        /*@internal*/ onEmitSourceMapOfToken?: (node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, pos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, pos: number) => number) => number;
        /*@internal*/ onEmitSourceMapOfPosition?: (pos: number) => void;
        /*@internal*/ onSetSourceFile?: (node: SourceFile) => void;
        /*@internal*/ onBeforeEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
        /*@internal*/ onAfterEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
        /*@internal*/ onBeforeEmitToken?: (node: Node) => void;
        /*@internal*/ onAfterEmitToken?: (node: Node) => void;
    }

    export interface PrinterOptions {
        removeComments?: boolean;
        newLine?: NewLineKind;
        omitTrailingSemicolon?: boolean;
        noEmitHelpers?: boolean;
        /*@internal*/ module?: CompilerOptions["module"];
        /*@internal*/ target?: CompilerOptions["target"];
        /*@internal*/ sourceMap?: boolean;
        /*@internal*/ inlineSourceMap?: boolean;
        /*@internal*/ inlineSources?: boolean;
        /*@internal*/ extendedDiagnostics?: boolean;
        /*@internal*/ onlyPrintJsDocStyle?: boolean;
        /*@internal*/ neverAsciiEscape?: boolean;
        /*@internal*/ writeBundleFileInfo?: boolean;
        /*@internal*/ recordInternalSection?: boolean;
        /*@internal*/ stripInternal?: boolean;
        /*@internal*/ preserveSourceNewlines?: boolean;
        /*@internal*/ relativeToBuildInfo?: (path: string) => string;
    }

    /* @internal */
    export interface RawSourceMap {
        version: 3;
        file: string;
        sourceRoot?: string | null;
        sources: string[];
        sourcesContent?: (string | null)[] | null;
        mappings: string;
        names?: string[] | null;
    }

    /**
     * Generates a source map.
     */
    /* @internal */
    export interface SourceMapGenerator {
        getSources(): readonly string[];
        /**
         * Adds a source to the source map.
         */
        addSource(fileName: string): number;
        /**
         * Set the content for a source.
         */
        setSourceContent(sourceIndex: number, content: string | null): void;
        /**
         * Adds a name.
         */
        addName(name: string): number;
        /**
         * Adds a mapping without source information.
         */
        addMapping(generatedLine: number, generatedCharacter: number): void;
        /**
         * Adds a mapping with source information.
         */
        addMapping(generatedLine: number, generatedCharacter: number, sourceIndex: number, sourceLine: number, sourceCharacter: number, nameIndex?: number): void;
        /**
         * Appends a source map.
         */
        appendSourceMap(generatedLine: number, generatedCharacter: number, sourceMap: RawSourceMap, sourceMapPath: string, start?: LineAndCharacter, end?: LineAndCharacter): void;
        /**
         * Gets the source map as a `RawSourceMap` object.
         */
        toJSON(): RawSourceMap;
        /**
         * Gets the string representation of the source map.
         */
        toString(): string;
    }

    /* @internal */
    export interface DocumentPositionMapperHost {
        getSourceFileLike(fileName: string): SourceFileLike | undefined;
        getCanonicalFileName(path: string): string;
        log(text: string): void;
    }

    /**
     * Maps positions between source and generated files.
     */
    /* @internal */
    export interface DocumentPositionMapper {
        getSourcePosition(input: DocumentPosition): DocumentPosition;
        getGeneratedPosition(input: DocumentPosition): DocumentPosition;
    }

    /* @internal */
    export interface DocumentPosition {
        fileName: string;
        pos: number;
    }

    /* @internal */
    export interface EmitTextWriter extends SymbolWriter {
        write(s: string): void;
        writeTrailingSemicolon(text: string): void;
        writeComment(text: string): void;
        getText(): string;
        rawWrite(s: string): void;
        writeLiteral(s: string): void;
        getTextPos(): number;
        getLine(): number;
        getColumn(): number;
        getIndent(): number;
        isAtStartOfLine(): boolean;
        hasTrailingComment(): boolean;
        hasTrailingWhitespace(): boolean;
        getTextPosWithWriteLine?(): number;
    }

    export interface GetEffectiveTypeRootsHost {
        directoryExists?(directoryName: string): boolean;
        getCurrentDirectory?(): string;
    }

    /*@internal*/
    export interface ModuleSpecifierResolutionHost {
        useCaseSensitiveFileNames?(): boolean;
        fileExists(path: string): boolean;
        getCurrentDirectory(): string;
        readFile?(path: string): string | undefined;
        getProbableSymlinks?(files: readonly SourceFile[]): ReadonlyMap<string, string>;
        getGlobalTypingsCacheLocation?(): string | undefined;

        getSourceFiles(): readonly SourceFile[];
        readonly redirectTargetsMap: RedirectTargetsMap;
        getProjectReferenceRedirect(fileName: string): string | undefined;
        isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    }

    // Note: this used to be deprecated in our public API, but is still used internally
    /* @internal */
    export interface SymbolTracker {
        // Called when the symbol writer encounters a symbol to write.  Currently only used by the
        // declaration emitter to help determine if it should patch up the final declaration file
        // with import statements it previously saw (but chose not to emit).
        trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): void;
        reportInaccessibleThisError?(): void;
        reportPrivateInBaseOfClassExpression?(propertyName: string): void;
        reportInaccessibleUniqueSymbolError?(): void;
        reportCyclicStructureError?(): void;
        reportLikelyUnsafeImportRequiredError?(specifier: string): void;
        moduleResolverHost?: ModuleSpecifierResolutionHost & { getCommonSourceDirectory(): string };
        trackReferencedAmbientModule?(decl: ModuleDeclaration, symbol: Symbol): void;
        trackExternalModuleSymbolOfImportTypeNode?(symbol: Symbol): void;
        reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
    }

    export interface TextSpan {
        start: number;
        length: number;
    }

    export interface TextChangeRange {
        span: TextSpan;
        newLength: number;
    }

    /* @internal */
    export interface DiagnosticCollection {
        // Adds a diagnostic to this diagnostic collection.
        add(diagnostic: Diagnostic): void;

        // Returns the first existing diagnostic that is equivalent to the given one (sans related information)
        lookup(diagnostic: Diagnostic): Diagnostic | undefined;

        // Gets all the diagnostics that aren't associated with a file.
        getGlobalDiagnostics(): Diagnostic[];

        // If fileName is provided, gets all the diagnostics associated with that file name.
        // Otherwise, returns all the diagnostics (global and file associated) in this collection.
        getDiagnostics(): Diagnostic[];
        getDiagnostics(fileName: string): DiagnosticWithLocation[];

        reattachFileDiagnostics(newFile: SourceFile): void;
    }

    // SyntaxKind.SyntaxList
    export interface SyntaxList extends Node {
        kind: SyntaxKind.SyntaxList;
        _children: Node[];
    }

    export const enum ListFormat {
        None = 0,

        // Line separators
        SingleLine = 0,                 // Prints the list on a single line (default).
        MultiLine = 1 << 0,             // Prints the list on multiple lines.
        PreserveLines = 1 << 1,         // Prints the list using line preservation if possible.
        LinesMask = SingleLine | MultiLine | PreserveLines,

        // Delimiters
        NotDelimited = 0,               // There is no delimiter between list items (default).
        BarDelimited = 1 << 2,          // Each list item is space-and-bar (" |") delimited.
        AmpersandDelimited = 1 << 3,    // Each list item is space-and-ampersand (" &") delimited.
        CommaDelimited = 1 << 4,        // Each list item is comma (",") delimited.
        AsteriskDelimited = 1 << 5,     // Each list item is asterisk ("\n *") delimited, used with JSDoc.
        DelimitersMask = BarDelimited | AmpersandDelimited | CommaDelimited | AsteriskDelimited,

        AllowTrailingComma = 1 << 6,    // Write a trailing comma (",") if present.

        // Whitespace
        Indented = 1 << 7,              // The list should be indented.
        SpaceBetweenBraces = 1 << 8,    // Inserts a space after the opening brace and before the closing brace.
        SpaceBetweenSiblings = 1 << 9,  // Inserts a space between each sibling node.

        // Brackets/Braces
        Braces = 1 << 10,                // The list is surrounded by "{" and "}".
        Parenthesis = 1 << 11,          // The list is surrounded by "(" and ")".
        AngleBrackets = 1 << 12,        // The list is surrounded by "<" and ">".
        SquareBrackets = 1 << 13,       // The list is surrounded by "[" and "]".
        BracketsMask = Braces | Parenthesis | AngleBrackets | SquareBrackets,

        OptionalIfUndefined = 1 << 14,  // Do not emit brackets if the list is undefined.
        OptionalIfEmpty = 1 << 15,      // Do not emit brackets if the list is empty.
        Optional = OptionalIfUndefined | OptionalIfEmpty,

        // Other
        PreferNewLine = 1 << 16,        // Prefer adding a LineTerminator between synthesized nodes.
        NoTrailingNewLine = 1 << 17,    // Do not emit a trailing NewLine for a MultiLine list.
        NoInterveningComments = 1 << 18, // Do not emit comments between each node

        NoSpaceIfEmpty = 1 << 19,       // If the literal is empty, do not add spaces between braces.
        SingleElement = 1 << 20,
        SpaceAfterList = 1 << 21,       // Add space after list

        // Precomputed Formats
        Modifiers = SingleLine | SpaceBetweenSiblings | NoInterveningComments,
        HeritageClauses = SingleLine | SpaceBetweenSiblings,
        SingleLineTypeLiteralMembers = SingleLine | SpaceBetweenBraces | SpaceBetweenSiblings,
        MultiLineTypeLiteralMembers = MultiLine | Indented | OptionalIfEmpty,

        SingleLineTupleTypeElements = CommaDelimited | SpaceBetweenSiblings | SingleLine,
        MultiLineTupleTypeElements = CommaDelimited | Indented | SpaceBetweenSiblings | MultiLine,
        UnionTypeConstituents = BarDelimited | SpaceBetweenSiblings | SingleLine,
        IntersectionTypeConstituents = AmpersandDelimited | SpaceBetweenSiblings | SingleLine,
        ObjectBindingPatternElements = SingleLine | AllowTrailingComma | SpaceBetweenBraces | CommaDelimited | SpaceBetweenSiblings | NoSpaceIfEmpty,
        ArrayBindingPatternElements = SingleLine | AllowTrailingComma | CommaDelimited | SpaceBetweenSiblings | NoSpaceIfEmpty,
        ObjectLiteralExpressionProperties = PreserveLines | CommaDelimited | SpaceBetweenSiblings | SpaceBetweenBraces | Indented | Braces | NoSpaceIfEmpty,
        ArrayLiteralExpressionElements = PreserveLines | CommaDelimited | SpaceBetweenSiblings | AllowTrailingComma | Indented | SquareBrackets,
        CommaListElements = CommaDelimited | SpaceBetweenSiblings | SingleLine,
        CallExpressionArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis,
        NewExpressionArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis | OptionalIfUndefined,
        TemplateExpressionSpans = SingleLine | NoInterveningComments,
        SingleLineBlockStatements = SpaceBetweenBraces | SpaceBetweenSiblings | SingleLine,
        MultiLineBlockStatements = Indented | MultiLine,
        VariableDeclarationList = CommaDelimited | SpaceBetweenSiblings | SingleLine,
        SingleLineFunctionBodyStatements = SingleLine | SpaceBetweenSiblings | SpaceBetweenBraces,
        MultiLineFunctionBodyStatements = MultiLine,
        ClassHeritageClauses = SingleLine,
        ClassMembers = Indented | MultiLine,
        InterfaceMembers = Indented | MultiLine,
        EnumMembers = CommaDelimited | Indented | MultiLine,
        CaseBlockClauses = Indented | MultiLine,
        NamedImportsOrExportsElements = CommaDelimited | SpaceBetweenSiblings | AllowTrailingComma | SingleLine | SpaceBetweenBraces | NoSpaceIfEmpty,
        JsxElementOrFragmentChildren = SingleLine | NoInterveningComments,
        JsxElementAttributes = SingleLine | SpaceBetweenSiblings | NoInterveningComments,
        CaseOrDefaultClauseStatements = Indented | MultiLine | NoTrailingNewLine | OptionalIfEmpty,
        HeritageClauseTypes = CommaDelimited | SpaceBetweenSiblings | SingleLine,
        SourceFileStatements = MultiLine | NoTrailingNewLine,
        Decorators = MultiLine | Optional | SpaceAfterList,
        TypeArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | AngleBrackets | Optional,
        TypeParameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | AngleBrackets | Optional,
        Parameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis,
        IndexSignatureParameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | Indented | SquareBrackets,
        JSDocComment = MultiLine | AsteriskDelimited,
    }

    /* @internal */
    export const enum PragmaKindFlags {
        None            =      0,
        /**
         * Triple slash comment of the form
         * /// <pragma-name argname="value" />
         */
        TripleSlashXML  = 1 << 0,
        /**
         * Single line comment of the form
         * // @pragma-name argval1 argval2
         * or
         * /// @pragma-name argval1 argval2
         */
        SingleLine      = 1 << 1,
        /**
         * Multiline non-jsdoc pragma of the form
         * /* @pragma-name argval1 argval2 * /
         */
        MultiLine       = 1 << 2,
        All = TripleSlashXML | SingleLine | MultiLine,
        Default = All,
    }

    /* @internal */
    interface PragmaArgumentSpecification<TName extends string> {
        name: TName; // Determines the name of the key in the resulting parsed type, type parameter to cause literal type inference
        optional?: boolean;
        captureSpan?: boolean;
    }

    /* @internal */
    export interface PragmaDefinition<T1 extends string = string, T2 extends string = string, T3 extends string = string, T4 extends string = string> {
        args?:
            | readonly [PragmaArgumentSpecification<T1>]
            | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>]
            | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>]
            | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>, PragmaArgumentSpecification<T4>];
        // If not present, defaults to PragmaKindFlags.Default
        kind?: PragmaKindFlags;
    }

    // While not strictly a type, this is here because `PragmaMap` needs to be here to be used with `SourceFile`, and we don't
    //  fancy effectively defining it twice, once in value-space and once in type-space
    /* @internal */
    export const commentPragmas = {
        "reference": {
            args: [
                { name: "types", optional: true, captureSpan: true },
                { name: "lib", optional: true, captureSpan: true },
                { name: "path", optional: true, captureSpan: true },
                { name: "no-default-lib", optional: true }
            ],
            kind: PragmaKindFlags.TripleSlashXML
        },
        "amd-dependency": {
            args: [{ name: "path" }, { name: "name", optional: true }],
            kind: PragmaKindFlags.TripleSlashXML
        },
        "amd-module": {
            args: [{ name: "name" }],
            kind: PragmaKindFlags.TripleSlashXML
        },
        "ts-check": {
            kind: PragmaKindFlags.SingleLine
        },
        "ts-nocheck": {
            kind: PragmaKindFlags.SingleLine
        },
        "jsx": {
            args: [{ name: "factory" }],
            kind: PragmaKindFlags.MultiLine
        },
        "jsxfrag": {
            args: [{ name: "factory" }],
            kind: PragmaKindFlags.MultiLine
        },
    } as const;

    /* @internal */
    type PragmaArgTypeMaybeCapture<TDesc> = TDesc extends {captureSpan: true} ? {value: string, pos: number, end: number} : string;

    /* @internal */
    type PragmaArgTypeOptional<TDesc, TName extends string> =
        TDesc extends {optional: true}
            ? {[K in TName]?: PragmaArgTypeMaybeCapture<TDesc>}
            : {[K in TName]: PragmaArgTypeMaybeCapture<TDesc>};

    /* @internal */
    type UnionToIntersection<U> =
            (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

    /* @internal */
    type ArgumentDefinitionToFieldUnion<T extends readonly PragmaArgumentSpecification<any>[]> = {
        [K in keyof T]: PragmaArgTypeOptional<T[K], T[K] extends {name: infer TName} ? TName extends string ? TName : never : never>
    }[Extract<keyof T, number>]; // The mapped type maps over only the tuple members, but this reindex gets _all_ members - by extracting only `number` keys, we get only the tuple members

    /**
     * Maps a pragma definition into the desired shape for its arguments object
     */
    /* @internal */
    type PragmaArgumentType<KPrag extends keyof ConcretePragmaSpecs> =
        ConcretePragmaSpecs[KPrag] extends { args: readonly PragmaArgumentSpecification<any>[] }
            ? UnionToIntersection<ArgumentDefinitionToFieldUnion<ConcretePragmaSpecs[KPrag]["args"]>>
            : never;

    /* @internal */
    type ConcretePragmaSpecs = typeof commentPragmas;

    /* @internal */
    export type PragmaPseudoMap = {[K in keyof ConcretePragmaSpecs]: {arguments: PragmaArgumentType<K>, range: CommentRange}};

    /* @internal */
    export type PragmaPseudoMapEntry = {[K in keyof PragmaPseudoMap]: {name: K, args: PragmaPseudoMap[K]}}[keyof PragmaPseudoMap];

    /* @internal */
    export interface ReadonlyPragmaMap extends ReadonlyMap<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]> {
        get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
        forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey) => void): void;
    }

    /**
     * A strongly-typed es6 map of pragma entries, the values of which are either a single argument
     * value (if only one was found), or an array of multiple argument values if the pragma is present
     * in multiple places
     */
    /* @internal */
    export interface PragmaMap extends Map<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]>, ReadonlyPragmaMap {
        set<TKey extends keyof PragmaPseudoMap>(key: TKey, value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][]): this;
        get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
        forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey) => void): void;
    }

    /* @internal */
    export interface CommentDirectivesMap {
        getUnusedExpectations(): CommentDirective[];
        markUsed(matchedLine: number): boolean;
    }

    export interface UserPreferences {
        readonly disableSuggestions?: boolean;
        readonly quotePreference?: "auto" | "double" | "single";
        readonly includeCompletionsForModuleExports?: boolean;
        readonly includeAutomaticOptionalChainCompletions?: boolean;
        readonly includeCompletionsWithInsertText?: boolean;
        readonly importModuleSpecifierPreference?: "auto" | "relative" | "non-relative";
        /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
        readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
        readonly allowTextChangesInNewFiles?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
        readonly includePackageJsonAutoImports?: "exclude-dev" | "all" | "none";
        readonly provideRefactorNotApplicableReason?: boolean;
    }

    /** Represents a bigint literal value without requiring bigint support */
    export interface PseudoBigInt {
        negative: boolean;
        base10Value: string;
    }
}
