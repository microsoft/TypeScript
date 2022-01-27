/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare namespace ts {
    const versionMajorMinor = "4.6";
    /** The version of the TypeScript compiler release */
    const version: string;
    /**
     * Type of objects whose values are all of the same type.
     * The `in` and `for-in` operators can *not* be safely used,
     * since `Object.prototype` may be modified by outside code.
     */
    interface MapLike<T> {
        [index: string]: T;
    }
    interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
        " __sortedArrayBrand": any;
    }
    interface SortedArray<T> extends Array<T> {
        " __sortedArrayBrand": any;
    }
    /** Common read methods for ES6 Map/Set. */
    interface ReadonlyCollection<K> {
        readonly size: number;
        has(key: K): boolean;
        keys(): Iterator<K>;
    }
    /** Common write methods for ES6 Map/Set. */
    interface Collection<K> extends ReadonlyCollection<K> {
        delete(key: K): boolean;
        clear(): void;
    }
    /** ES6 Map interface, only read methods included. */
    interface ReadonlyESMap<K, V> extends ReadonlyCollection<K> {
        get(key: K): V | undefined;
        values(): Iterator<V>;
        entries(): Iterator<[K, V]>;
        forEach(action: (value: V, key: K) => void): void;
    }
    /**
     * ES6 Map interface, only read methods included.
     */
    interface ReadonlyMap<T> extends ReadonlyESMap<string, T> {
    }
    /** ES6 Map interface. */
    interface ESMap<K, V> extends ReadonlyESMap<K, V>, Collection<K> {
        set(key: K, value: V): this;
    }
    /**
     * ES6 Map interface.
     */
    interface Map<T> extends ESMap<string, T> {
    }
    /** ES6 Set interface, only read methods included. */
    interface ReadonlySet<T> extends ReadonlyCollection<T> {
        has(value: T): boolean;
        values(): Iterator<T>;
        entries(): Iterator<[T, T]>;
        forEach(action: (value: T, key: T) => void): void;
    }
    /** ES6 Set interface. */
    interface Set<T> extends ReadonlySet<T>, Collection<T> {
        add(value: T): this;
        delete(value: T): boolean;
    }
    /** ES6 Iterator type. */
    interface Iterator<T> {
        next(): {
            value: T;
            done?: false;
        } | {
            value: void;
            done: true;
        };
    }
    /** Array that is only intended to be pushed to, never read. */
    interface Push<T> {
        push(...values: T[]): void;
    }
}
declare namespace ts {
    export type Path = string & {
        __pathBrand: any;
    };
    export interface TextRange {
        pos: number;
        end: number;
    }
    export interface ReadonlyTextRange {
        readonly pos: number;
        readonly end: number;
    }
    export enum SyntaxKind {
        Unknown = 0,
        EndOfFileToken = 1,
        SingleLineCommentTrivia = 2,
        MultiLineCommentTrivia = 3,
        NewLineTrivia = 4,
        WhitespaceTrivia = 5,
        ShebangTrivia = 6,
        ConflictMarkerTrivia = 7,
        NumericLiteral = 8,
        BigIntLiteral = 9,
        StringLiteral = 10,
        JsxText = 11,
        JsxTextAllWhiteSpaces = 12,
        RegularExpressionLiteral = 13,
        NoSubstitutionTemplateLiteral = 14,
        TemplateHead = 15,
        TemplateMiddle = 16,
        TemplateTail = 17,
        OpenBraceToken = 18,
        CloseBraceToken = 19,
        OpenParenToken = 20,
        CloseParenToken = 21,
        OpenBracketToken = 22,
        CloseBracketToken = 23,
        DotToken = 24,
        DotDotDotToken = 25,
        SemicolonToken = 26,
        CommaToken = 27,
        QuestionDotToken = 28,
        LessThanToken = 29,
        LessThanSlashToken = 30,
        GreaterThanToken = 31,
        LessThanEqualsToken = 32,
        GreaterThanEqualsToken = 33,
        EqualsEqualsToken = 34,
        ExclamationEqualsToken = 35,
        EqualsEqualsEqualsToken = 36,
        ExclamationEqualsEqualsToken = 37,
        EqualsGreaterThanToken = 38,
        PlusToken = 39,
        MinusToken = 40,
        AsteriskToken = 41,
        AsteriskAsteriskToken = 42,
        SlashToken = 43,
        PercentToken = 44,
        PlusPlusToken = 45,
        MinusMinusToken = 46,
        LessThanLessThanToken = 47,
        GreaterThanGreaterThanToken = 48,
        GreaterThanGreaterThanGreaterThanToken = 49,
        AmpersandToken = 50,
        BarToken = 51,
        CaretToken = 52,
        ExclamationToken = 53,
        TildeToken = 54,
        AmpersandAmpersandToken = 55,
        BarBarToken = 56,
        QuestionToken = 57,
        ColonToken = 58,
        AtToken = 59,
        QuestionQuestionToken = 60,
        /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
        BacktickToken = 61,
        /** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
        HashToken = 62,
        EqualsToken = 63,
        PlusEqualsToken = 64,
        MinusEqualsToken = 65,
        AsteriskEqualsToken = 66,
        AsteriskAsteriskEqualsToken = 67,
        SlashEqualsToken = 68,
        PercentEqualsToken = 69,
        LessThanLessThanEqualsToken = 70,
        GreaterThanGreaterThanEqualsToken = 71,
        GreaterThanGreaterThanGreaterThanEqualsToken = 72,
        AmpersandEqualsToken = 73,
        BarEqualsToken = 74,
        BarBarEqualsToken = 75,
        AmpersandAmpersandEqualsToken = 76,
        QuestionQuestionEqualsToken = 77,
        CaretEqualsToken = 78,
        Identifier = 79,
        PrivateIdentifier = 80,
        BreakKeyword = 81,
        CaseKeyword = 82,
        CatchKeyword = 83,
        ClassKeyword = 84,
        ConstKeyword = 85,
        ContinueKeyword = 86,
        DebuggerKeyword = 87,
        DefaultKeyword = 88,
        DeleteKeyword = 89,
        DoKeyword = 90,
        ElseKeyword = 91,
        EnumKeyword = 92,
        ExportKeyword = 93,
        ExtendsKeyword = 94,
        FalseKeyword = 95,
        FinallyKeyword = 96,
        ForKeyword = 97,
        FunctionKeyword = 98,
        IfKeyword = 99,
        ImportKeyword = 100,
        InKeyword = 101,
        InstanceOfKeyword = 102,
        NewKeyword = 103,
        NullKeyword = 104,
        ReturnKeyword = 105,
        SuperKeyword = 106,
        SwitchKeyword = 107,
        ThisKeyword = 108,
        ThrowKeyword = 109,
        TrueKeyword = 110,
        TryKeyword = 111,
        TypeOfKeyword = 112,
        VarKeyword = 113,
        VoidKeyword = 114,
        WhileKeyword = 115,
        WithKeyword = 116,
        ImplementsKeyword = 117,
        InterfaceKeyword = 118,
        LetKeyword = 119,
        PackageKeyword = 120,
        PrivateKeyword = 121,
        ProtectedKeyword = 122,
        PublicKeyword = 123,
        StaticKeyword = 124,
        YieldKeyword = 125,
        AbstractKeyword = 126,
        AsKeyword = 127,
        AssertsKeyword = 128,
        AssertKeyword = 129,
        AnyKeyword = 130,
        AsyncKeyword = 131,
        AwaitKeyword = 132,
        BooleanKeyword = 133,
        ConstructorKeyword = 134,
        DeclareKeyword = 135,
        GetKeyword = 136,
        InferKeyword = 137,
        IntrinsicKeyword = 138,
        IsKeyword = 139,
        KeyOfKeyword = 140,
        ModuleKeyword = 141,
        NamespaceKeyword = 142,
        NeverKeyword = 143,
        ReadonlyKeyword = 144,
        RequireKeyword = 145,
        NumberKeyword = 146,
        ObjectKeyword = 147,
        SetKeyword = 148,
        StringKeyword = 149,
        SymbolKeyword = 150,
        TypeKeyword = 151,
        UndefinedKeyword = 152,
        UniqueKeyword = 153,
        UnknownKeyword = 154,
        FromKeyword = 155,
        GlobalKeyword = 156,
        BigIntKeyword = 157,
        OverrideKeyword = 158,
        OfKeyword = 159,
        QualifiedName = 160,
        ComputedPropertyName = 161,
        TypeParameter = 162,
        Parameter = 163,
        Decorator = 164,
        PropertySignature = 165,
        PropertyDeclaration = 166,
        MethodSignature = 167,
        MethodDeclaration = 168,
        ClassStaticBlockDeclaration = 169,
        Constructor = 170,
        GetAccessor = 171,
        SetAccessor = 172,
        CallSignature = 173,
        ConstructSignature = 174,
        IndexSignature = 175,
        TypePredicate = 176,
        TypeReference = 177,
        FunctionType = 178,
        ConstructorType = 179,
        TypeQuery = 180,
        TypeLiteral = 181,
        ArrayType = 182,
        TupleType = 183,
        OptionalType = 184,
        RestType = 185,
        UnionType = 186,
        IntersectionType = 187,
        ConditionalType = 188,
        InferType = 189,
        ParenthesizedType = 190,
        ThisType = 191,
        TypeOperator = 192,
        IndexedAccessType = 193,
        MappedType = 194,
        LiteralType = 195,
        NamedTupleMember = 196,
        TemplateLiteralType = 197,
        TemplateLiteralTypeSpan = 198,
        ImportType = 199,
        ObjectBindingPattern = 200,
        ArrayBindingPattern = 201,
        BindingElement = 202,
        ArrayLiteralExpression = 203,
        ObjectLiteralExpression = 204,
        PropertyAccessExpression = 205,
        ElementAccessExpression = 206,
        CallExpression = 207,
        NewExpression = 208,
        TaggedTemplateExpression = 209,
        TypeAssertionExpression = 210,
        ParenthesizedExpression = 211,
        FunctionExpression = 212,
        ArrowFunction = 213,
        DeleteExpression = 214,
        TypeOfExpression = 215,
        VoidExpression = 216,
        AwaitExpression = 217,
        PrefixUnaryExpression = 218,
        PostfixUnaryExpression = 219,
        BinaryExpression = 220,
        ConditionalExpression = 221,
        TemplateExpression = 222,
        YieldExpression = 223,
        SpreadElement = 224,
        ClassExpression = 225,
        OmittedExpression = 226,
        ExpressionWithTypeArguments = 227,
        AsExpression = 228,
        NonNullExpression = 229,
        MetaProperty = 230,
        SyntheticExpression = 231,
        TemplateSpan = 232,
        SemicolonClassElement = 233,
        Block = 234,
        EmptyStatement = 235,
        VariableStatement = 236,
        ExpressionStatement = 237,
        IfStatement = 238,
        DoStatement = 239,
        WhileStatement = 240,
        ForStatement = 241,
        ForInStatement = 242,
        ForOfStatement = 243,
        ContinueStatement = 244,
        BreakStatement = 245,
        ReturnStatement = 246,
        WithStatement = 247,
        SwitchStatement = 248,
        LabeledStatement = 249,
        ThrowStatement = 250,
        TryStatement = 251,
        DebuggerStatement = 252,
        VariableDeclaration = 253,
        VariableDeclarationList = 254,
        FunctionDeclaration = 255,
        ClassDeclaration = 256,
        InterfaceDeclaration = 257,
        TypeAliasDeclaration = 258,
        EnumDeclaration = 259,
        ModuleDeclaration = 260,
        ModuleBlock = 261,
        CaseBlock = 262,
        NamespaceExportDeclaration = 263,
        ImportEqualsDeclaration = 264,
        ImportDeclaration = 265,
        ImportClause = 266,
        NamespaceImport = 267,
        NamedImports = 268,
        ImportSpecifier = 269,
        ExportAssignment = 270,
        ExportDeclaration = 271,
        NamedExports = 272,
        NamespaceExport = 273,
        ExportSpecifier = 274,
        MissingDeclaration = 275,
        ExternalModuleReference = 276,
        JsxElement = 277,
        JsxSelfClosingElement = 278,
        JsxOpeningElement = 279,
        JsxClosingElement = 280,
        JsxFragment = 281,
        JsxOpeningFragment = 282,
        JsxClosingFragment = 283,
        JsxAttribute = 284,
        JsxAttributes = 285,
        JsxSpreadAttribute = 286,
        JsxExpression = 287,
        CaseClause = 288,
        DefaultClause = 289,
        HeritageClause = 290,
        CatchClause = 291,
        AssertClause = 292,
        AssertEntry = 293,
        PropertyAssignment = 294,
        ShorthandPropertyAssignment = 295,
        SpreadAssignment = 296,
        EnumMember = 297,
        UnparsedPrologue = 298,
        UnparsedPrepend = 299,
        UnparsedText = 300,
        UnparsedInternalText = 301,
        UnparsedSyntheticReference = 302,
        SourceFile = 303,
        Bundle = 304,
        UnparsedSource = 305,
        InputFiles = 306,
        JSDocTypeExpression = 307,
        JSDocNameReference = 308,
        JSDocMemberName = 309,
        JSDocAllType = 310,
        JSDocUnknownType = 311,
        JSDocNullableType = 312,
        JSDocNonNullableType = 313,
        JSDocOptionalType = 314,
        JSDocFunctionType = 315,
        JSDocVariadicType = 316,
        JSDocNamepathType = 317,
        JSDocComment = 318,
        JSDocText = 319,
        JSDocTypeLiteral = 320,
        JSDocSignature = 321,
        JSDocLink = 322,
        JSDocLinkCode = 323,
        JSDocLinkPlain = 324,
        JSDocTag = 325,
        JSDocAugmentsTag = 326,
        JSDocImplementsTag = 327,
        JSDocAuthorTag = 328,
        JSDocDeprecatedTag = 329,
        JSDocClassTag = 330,
        JSDocPublicTag = 331,
        JSDocPrivateTag = 332,
        JSDocProtectedTag = 333,
        JSDocReadonlyTag = 334,
        JSDocOverrideTag = 335,
        JSDocCallbackTag = 336,
        JSDocEnumTag = 337,
        JSDocParameterTag = 338,
        JSDocReturnTag = 339,
        JSDocThisTag = 340,
        JSDocTypeTag = 341,
        JSDocTemplateTag = 342,
        JSDocTypedefTag = 343,
        JSDocSeeTag = 344,
        JSDocPropertyTag = 345,
        SyntaxList = 346,
        NotEmittedStatement = 347,
        PartiallyEmittedExpression = 348,
        CommaListExpression = 349,
        MergeDeclarationMarker = 350,
        EndOfDeclarationMarker = 351,
        SyntheticReferenceExpression = 352,
        Count = 353,
        FirstAssignment = 63,
        LastAssignment = 78,
        FirstCompoundAssignment = 64,
        LastCompoundAssignment = 78,
        FirstReservedWord = 81,
        LastReservedWord = 116,
        FirstKeyword = 81,
        LastKeyword = 159,
        FirstFutureReservedWord = 117,
        LastFutureReservedWord = 125,
        FirstTypeNode = 176,
        LastTypeNode = 199,
        FirstPunctuation = 18,
        LastPunctuation = 78,
        FirstToken = 0,
        LastToken = 159,
        FirstTriviaToken = 2,
        LastTriviaToken = 7,
        FirstLiteralToken = 8,
        LastLiteralToken = 14,
        FirstTemplateToken = 14,
        LastTemplateToken = 17,
        FirstBinaryOperator = 29,
        LastBinaryOperator = 78,
        FirstStatement = 236,
        LastStatement = 252,
        FirstNode = 160,
        FirstJSDocNode = 307,
        LastJSDocNode = 345,
        FirstJSDocTagNode = 325,
        LastJSDocTagNode = 345,
    }
    export type TriviaSyntaxKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia | SyntaxKind.NewLineTrivia | SyntaxKind.WhitespaceTrivia | SyntaxKind.ShebangTrivia | SyntaxKind.ConflictMarkerTrivia;
    export type LiteralSyntaxKind = SyntaxKind.NumericLiteral | SyntaxKind.BigIntLiteral | SyntaxKind.StringLiteral | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.RegularExpressionLiteral | SyntaxKind.NoSubstitutionTemplateLiteral;
    export type PseudoLiteralSyntaxKind = SyntaxKind.TemplateHead | SyntaxKind.TemplateMiddle | SyntaxKind.TemplateTail;
    export type PunctuationSyntaxKind = SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.OpenParenToken | SyntaxKind.CloseParenToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.DotToken | SyntaxKind.DotDotDotToken | SyntaxKind.SemicolonToken | SyntaxKind.CommaToken | SyntaxKind.QuestionDotToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanSlashToken | SyntaxKind.GreaterThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.EqualsEqualsToken | SyntaxKind.ExclamationEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.EqualsGreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.AsteriskToken | SyntaxKind.AsteriskAsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken | SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken | SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken | SyntaxKind.ExclamationToken | SyntaxKind.TildeToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken | SyntaxKind.QuestionQuestionToken | SyntaxKind.QuestionToken | SyntaxKind.ColonToken | SyntaxKind.AtToken | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.EqualsToken | SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken;
    export type KeywordSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AnyKeyword | SyntaxKind.AsKeyword | SyntaxKind.AssertsKeyword | SyntaxKind.AssertKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.AwaitKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.BreakKeyword | SyntaxKind.CaseKeyword | SyntaxKind.CatchKeyword | SyntaxKind.ClassKeyword | SyntaxKind.ConstKeyword | SyntaxKind.ConstructorKeyword | SyntaxKind.ContinueKeyword | SyntaxKind.DebuggerKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.DeleteKeyword | SyntaxKind.DoKeyword | SyntaxKind.ElseKeyword | SyntaxKind.EnumKeyword | SyntaxKind.ExportKeyword | SyntaxKind.ExtendsKeyword | SyntaxKind.FalseKeyword | SyntaxKind.FinallyKeyword | SyntaxKind.ForKeyword | SyntaxKind.FromKeyword | SyntaxKind.FunctionKeyword | SyntaxKind.GetKeyword | SyntaxKind.GlobalKeyword | SyntaxKind.IfKeyword | SyntaxKind.ImplementsKeyword | SyntaxKind.ImportKeyword | SyntaxKind.InferKeyword | SyntaxKind.InKeyword | SyntaxKind.InstanceOfKeyword | SyntaxKind.InterfaceKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.IsKeyword | SyntaxKind.KeyOfKeyword | SyntaxKind.LetKeyword | SyntaxKind.ModuleKeyword | SyntaxKind.NamespaceKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NewKeyword | SyntaxKind.NullKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.OfKeyword | SyntaxKind.PackageKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.RequireKeyword | SyntaxKind.ReturnKeyword | SyntaxKind.SetKeyword | SyntaxKind.StaticKeyword | SyntaxKind.StringKeyword | SyntaxKind.SuperKeyword | SyntaxKind.SwitchKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.ThisKeyword | SyntaxKind.ThrowKeyword | SyntaxKind.TrueKeyword | SyntaxKind.TryKeyword | SyntaxKind.TypeKeyword | SyntaxKind.TypeOfKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.VarKeyword | SyntaxKind.VoidKeyword | SyntaxKind.WhileKeyword | SyntaxKind.WithKeyword | SyntaxKind.YieldKeyword;
    export type ModifierSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.ConstKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.ExportKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.StaticKeyword;
    export type KeywordTypeSyntaxKind = SyntaxKind.AnyKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.VoidKeyword;
    export type TokenSyntaxKind = SyntaxKind.Unknown | SyntaxKind.EndOfFileToken | TriviaSyntaxKind | LiteralSyntaxKind | PseudoLiteralSyntaxKind | PunctuationSyntaxKind | SyntaxKind.Identifier | KeywordSyntaxKind;
    export type JsxTokenSyntaxKind = SyntaxKind.LessThanSlashToken | SyntaxKind.EndOfFileToken | SyntaxKind.ConflictMarkerTrivia | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.OpenBraceToken | SyntaxKind.LessThanToken;
    export type JSDocSyntaxKind = SyntaxKind.EndOfFileToken | SyntaxKind.WhitespaceTrivia | SyntaxKind.AtToken | SyntaxKind.NewLineTrivia | SyntaxKind.AsteriskToken | SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.LessThanToken | SyntaxKind.GreaterThanToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.EqualsToken | SyntaxKind.CommaToken | SyntaxKind.DotToken | SyntaxKind.Identifier | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.Unknown | KeywordSyntaxKind;
    export enum NodeFlags {
        None = 0,
        Let = 1,
        Const = 2,
        NestedNamespace = 4,
        Synthesized = 8,
        Namespace = 16,
        OptionalChain = 32,
        ExportContext = 64,
        ContainsThis = 128,
        HasImplicitReturn = 256,
        HasExplicitReturn = 512,
        GlobalAugmentation = 1024,
        HasAsyncFunctions = 2048,
        DisallowInContext = 4096,
        YieldContext = 8192,
        DecoratorContext = 16384,
        AwaitContext = 32768,
        ThisNodeHasError = 65536,
        JavaScriptFile = 131072,
        ThisNodeOrAnySubNodesHasError = 262144,
        HasAggregatedChildData = 524288,
        JSDoc = 4194304,
        JsonFile = 33554432,
        BlockScoped = 3,
        ReachabilityCheckFlags = 768,
        ReachabilityAndEmitFlags = 2816,
        ContextFlags = 25358336,
        TypeExcludesFlags = 40960,
    }
    export enum ModifierFlags {
        None = 0,
        Export = 1,
        Ambient = 2,
        Public = 4,
        Private = 8,
        Protected = 16,
        Static = 32,
        Readonly = 64,
        Abstract = 128,
        Async = 256,
        Default = 512,
        Const = 2048,
        HasComputedJSDocModifiers = 4096,
        Deprecated = 8192,
        Override = 16384,
        HasComputedFlags = 536870912,
        AccessibilityModifier = 28,
        ParameterPropertyModifier = 16476,
        NonPublicAccessibilityModifier = 24,
        TypeScriptModifier = 18654,
        ExportDefault = 513,
        All = 27647
    }
    export enum JsxFlags {
        None = 0,
        /** An element from a named property of the JSX.IntrinsicElements interface */
        IntrinsicNamedElement = 1,
        /** An element inferred from the string index signature of the JSX.IntrinsicElements interface */
        IntrinsicIndexedElement = 2,
        IntrinsicElement = 3
    }
    export interface Node extends ReadonlyTextRange {
        readonly kind: SyntaxKind;
        readonly flags: NodeFlags;
        readonly decorators?: NodeArray<Decorator>;
        readonly modifiers?: ModifiersArray;
        readonly parent: Node;
    }
    export interface JSDocContainer {
    }
    export type HasJSDoc = ParameterDeclaration | CallSignatureDeclaration | ClassStaticBlockDeclaration | ConstructSignatureDeclaration | MethodSignature | PropertySignature | ArrowFunction | ParenthesizedExpression | SpreadAssignment | ShorthandPropertyAssignment | PropertyAssignment | FunctionExpression | EmptyStatement | DebuggerStatement | Block | VariableStatement | ExpressionStatement | IfStatement | DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement | BreakStatement | ContinueStatement | ReturnStatement | WithStatement | SwitchStatement | LabeledStatement | ThrowStatement | TryStatement | FunctionDeclaration | ConstructorDeclaration | MethodDeclaration | VariableDeclaration | PropertyDeclaration | AccessorDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumMember | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | NamespaceExportDeclaration | ExportAssignment | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | ExportDeclaration | NamedTupleMember | ExportSpecifier | EndOfFileToken;
    export type HasType = SignatureDeclaration | VariableDeclaration | ParameterDeclaration | PropertySignature | PropertyDeclaration | TypePredicateNode | ParenthesizedTypeNode | TypeOperatorNode | MappedTypeNode | AssertionExpression | TypeAliasDeclaration | JSDocTypeExpression | JSDocNonNullableType | JSDocNullableType | JSDocOptionalType | JSDocVariadicType;
    export type HasTypeArguments = CallExpression | NewExpression | TaggedTemplateExpression | JsxOpeningElement | JsxSelfClosingElement;
    export type HasInitializer = HasExpressionInitializer | ForStatement | ForInStatement | ForOfStatement | JsxAttribute;
    export type HasExpressionInitializer = VariableDeclaration | ParameterDeclaration | BindingElement | PropertySignature | PropertyDeclaration | PropertyAssignment | EnumMember;
    export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
        readonly hasTrailingComma: boolean;
    }
    export interface Token<TKind extends SyntaxKind> extends Node {
        readonly kind: TKind;
    }
    export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;
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
    export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
    }
    export type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
    export type AssertKeyword = KeywordToken<SyntaxKind.AssertKeyword>;
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
    export type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;
    export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;
    /** @deprecated Use `ReadonlyKeyword` instead. */
    export type ReadonlyToken = ReadonlyKeyword;
    export type Modifier = AbstractKeyword | AsyncKeyword | ConstKeyword | DeclareKeyword | DefaultKeyword | ExportKeyword | PrivateKeyword | ProtectedKeyword | PublicKeyword | OverrideKeyword | ReadonlyKeyword | StaticKeyword;
    export type AccessibilityModifier = PublicKeyword | PrivateKeyword | ProtectedKeyword;
    export type ParameterPropertyModifier = AccessibilityModifier | ReadonlyKeyword;
    export type ClassMemberModifier = AccessibilityModifier | ReadonlyKeyword | StaticKeyword;
    export type ModifiersArray = NodeArray<Modifier>;
    export enum GeneratedIdentifierFlags {
        None = 0,
        ReservedInNestedScopes = 8,
        Optimistic = 16,
        FileLevel = 32,
        AllowNameSubstitution = 64
    }
    export interface Identifier extends PrimaryExpression, Declaration {
        readonly kind: SyntaxKind.Identifier;
        /**
         * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
         * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
         */
        readonly escapedText: __String;
        readonly originalKeywordKind?: SyntaxKind;
        isInJSDocNamespace?: boolean;
    }
    export interface TransientIdentifier extends Identifier {
        resolvedSymbol: Symbol;
    }
    export interface QualifiedName extends Node {
        readonly kind: SyntaxKind.QualifiedName;
        readonly left: EntityName;
        readonly right: Identifier;
    }
    export type EntityName = Identifier | QualifiedName;
    export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier;
    export type MemberName = Identifier | PrivateIdentifier;
    export type DeclarationName = Identifier | PrivateIdentifier | StringLiteralLike | NumericLiteral | ComputedPropertyName | ElementAccessExpression | BindingPattern | EntityNameExpression;
    export interface Declaration extends Node {
        _declarationBrand: any;
    }
    export interface NamedDeclaration extends Declaration {
        readonly name?: DeclarationName;
    }
    export interface DeclarationStatement extends NamedDeclaration, Statement {
        readonly name?: Identifier | StringLiteral | NumericLiteral;
    }
    export interface ComputedPropertyName extends Node {
        readonly kind: SyntaxKind.ComputedPropertyName;
        readonly parent: Declaration;
        readonly expression: Expression;
    }
    export interface PrivateIdentifier extends PrimaryExpression {
        readonly kind: SyntaxKind.PrivateIdentifier;
        readonly escapedText: __String;
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
        expression?: Expression;
    }
    export interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
        readonly kind: SignatureDeclaration["kind"];
        readonly name?: PropertyName;
        readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
        readonly parameters: NodeArray<ParameterDeclaration>;
        readonly type?: TypeNode;
    }
    export type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
    export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.CallSignature;
    }
    export interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement {
        readonly kind: SyntaxKind.ConstructSignature;
    }
    export type BindingName = Identifier | BindingPattern;
    export interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.VariableDeclaration;
        readonly parent: VariableDeclarationList | CatchClause;
        readonly name: BindingName;
        readonly exclamationToken?: ExclamationToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    export interface VariableDeclarationList extends Node {
        readonly kind: SyntaxKind.VariableDeclarationList;
        readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
        readonly declarations: NodeArray<VariableDeclaration>;
    }
    export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.Parameter;
        readonly parent: SignatureDeclaration;
        readonly dotDotDotToken?: DotDotDotToken;
        readonly name: BindingName;
        readonly questionToken?: QuestionToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    export interface BindingElement extends NamedDeclaration {
        readonly kind: SyntaxKind.BindingElement;
        readonly parent: BindingPattern;
        readonly propertyName?: PropertyName;
        readonly dotDotDotToken?: DotDotDotToken;
        readonly name: BindingName;
        readonly initializer?: Expression;
    }
    export interface PropertySignature extends TypeElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertySignature;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;
        readonly type?: TypeNode;
        initializer?: Expression;
    }
    export interface PropertyDeclaration extends ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyDeclaration;
        readonly parent: ClassLikeDeclaration;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        readonly type?: TypeNode;
        readonly initializer?: Expression;
    }
    export interface ObjectLiteralElement extends NamedDeclaration {
        _objectLiteralBrand: any;
        readonly name?: PropertyName;
    }
    /** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
    export type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
    export interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.PropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        readonly initializer: Expression;
    }
    export interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.ShorthandPropertyAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly name: Identifier;
        readonly questionToken?: QuestionToken;
        readonly exclamationToken?: ExclamationToken;
        readonly equalsToken?: EqualsToken;
        readonly objectAssignmentInitializer?: Expression;
    }
    export interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SpreadAssignment;
        readonly parent: ObjectLiteralExpression;
        readonly expression: Expression;
    }
    export type VariableLikeDeclaration = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertyAssignment | PropertySignature | JsxAttribute | ShorthandPropertyAssignment | EnumMember | JSDocPropertyTag | JSDocParameterTag;
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
    }
    export type FunctionLikeDeclaration = FunctionDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration | FunctionExpression | ArrowFunction;
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
    export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.MethodDeclaration;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
    }
    export interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.Constructor;
        readonly parent: ClassLikeDeclaration;
        readonly body?: FunctionBody;
    }
    /** For when we encounter a semicolon in a class declaration. ES6 allows these as class elements. */
    export interface SemicolonClassElement extends ClassElement {
        readonly kind: SyntaxKind.SemicolonClassElement;
        readonly parent: ClassLikeDeclaration;
    }
    export interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.GetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
    }
    export interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer {
        readonly kind: SyntaxKind.SetAccessor;
        readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
        readonly name: PropertyName;
        readonly body?: FunctionBody;
    }
    export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
    export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement {
        readonly kind: SyntaxKind.IndexSignature;
        readonly parent: ObjectTypeDeclaration;
        readonly type: TypeNode;
    }
    export interface ClassStaticBlockDeclaration extends ClassElement, JSDocContainer {
        readonly kind: SyntaxKind.ClassStaticBlockDeclaration;
        readonly parent: ClassDeclaration | ClassExpression;
        readonly body: Block;
    }
    export interface TypeNode extends Node {
        _typeNodeBrand: any;
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
        readonly assertsModifier?: AssertsKeyword;
        readonly parameterName: Identifier | ThisTypeNode;
        readonly type?: TypeNode;
    }
    export interface TypeQueryNode extends TypeNode {
        readonly kind: SyntaxKind.TypeQuery;
        readonly exprName: EntityName;
    }
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
    export interface IndexedAccessTypeNode extends TypeNode {
        readonly kind: SyntaxKind.IndexedAccessType;
        readonly objectType: TypeNode;
        readonly indexType: TypeNode;
    }
    export interface MappedTypeNode extends TypeNode, Declaration {
        readonly kind: SyntaxKind.MappedType;
        readonly readonlyToken?: ReadonlyKeyword | PlusToken | MinusToken;
        readonly typeParameter: TypeParameterDeclaration;
        readonly nameType?: TypeNode;
        readonly questionToken?: QuestionToken | PlusToken | MinusToken;
        readonly type?: TypeNode;
        /** Used only to produce grammar errors */
        readonly members?: NodeArray<TypeElement>;
    }
    export interface LiteralTypeNode extends TypeNode {
        readonly kind: SyntaxKind.LiteralType;
        readonly literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
    }
    export interface StringLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.StringLiteral;
    }
    export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
    export type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral;
    export interface TemplateLiteralTypeNode extends TypeNode {
        kind: SyntaxKind.TemplateLiteralType;
        readonly head: TemplateHead;
        readonly templateSpans: NodeArray<TemplateLiteralTypeSpan>;
    }
    export interface TemplateLiteralTypeSpan extends TypeNode {
        readonly kind: SyntaxKind.TemplateLiteralTypeSpan;
        readonly parent: TemplateLiteralTypeNode;
        readonly type: TypeNode;
        readonly literal: TemplateMiddle | TemplateTail;
    }
    export interface Expression extends Node {
        _expressionBrand: any;
    }
    export interface OmittedExpression extends Expression {
        readonly kind: SyntaxKind.OmittedExpression;
    }
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
    export type PrefixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.TildeToken | SyntaxKind.ExclamationToken;
    export interface PrefixUnaryExpression extends UpdateExpression {
        readonly kind: SyntaxKind.PrefixUnaryExpression;
        readonly operator: PrefixUnaryOperator;
        readonly operand: UnaryExpression;
    }
    export type PostfixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken;
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
    export type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;
    export type MultiplicativeOperator = SyntaxKind.AsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken;
    export type MultiplicativeOperatorOrHigher = ExponentiationOperator | MultiplicativeOperator;
    export type AdditiveOperator = SyntaxKind.PlusToken | SyntaxKind.MinusToken;
    export type AdditiveOperatorOrHigher = MultiplicativeOperatorOrHigher | AdditiveOperator;
    export type ShiftOperator = SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
    export type ShiftOperatorOrHigher = AdditiveOperatorOrHigher | ShiftOperator;
    export type RelationalOperator = SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.InstanceOfKeyword | SyntaxKind.InKeyword;
    export type RelationalOperatorOrHigher = ShiftOperatorOrHigher | RelationalOperator;
    export type EqualityOperator = SyntaxKind.EqualsEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.ExclamationEqualsToken;
    export type EqualityOperatorOrHigher = RelationalOperatorOrHigher | EqualityOperator;
    export type BitwiseOperator = SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken;
    export type BitwiseOperatorOrHigher = EqualityOperatorOrHigher | BitwiseOperator;
    export type LogicalOperator = SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken;
    export type LogicalOperatorOrHigher = BitwiseOperatorOrHigher | LogicalOperator;
    export type CompoundAssignmentOperator = SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
    export type AssignmentOperator = SyntaxKind.EqualsToken | CompoundAssignmentOperator;
    export type AssignmentOperatorOrHigher = SyntaxKind.QuestionQuestionToken | LogicalOperatorOrHigher | AssignmentOperator;
    export type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
    export type LogicalOrCoalescingAssignmentOperator = SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
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
    export type DestructuringAssignment = ObjectDestructuringAssignment | ArrayDestructuringAssignment;
    export type BindingOrAssignmentElement = VariableDeclaration | ParameterDeclaration | ObjectBindingOrAssignmentElement | ArrayBindingOrAssignmentElement;
    export type ObjectBindingOrAssignmentElement = BindingElement | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment;
    export type ArrayBindingOrAssignmentElement = BindingElement | OmittedExpression | SpreadElement | ArrayLiteralExpression | ObjectLiteralExpression | AssignmentExpression<EqualsToken> | Identifier | PropertyAccessExpression | ElementAccessExpression;
    export type BindingOrAssignmentElementRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;
    export type BindingOrAssignmentElementTarget = BindingOrAssignmentPattern | Identifier | PropertyAccessExpression | ElementAccessExpression | OmittedExpression;
    export type ObjectBindingOrAssignmentPattern = ObjectBindingPattern | ObjectLiteralExpression;
    export type ArrayBindingOrAssignmentPattern = ArrayBindingPattern | ArrayLiteralExpression;
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
        readonly body: FunctionBody;
    }
    export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer {
        readonly kind: SyntaxKind.ArrowFunction;
        readonly equalsGreaterThanToken: EqualsGreaterThanToken;
        readonly body: ConciseBody;
        readonly name: never;
    }
    export interface LiteralLikeNode extends Node {
        text: string;
        isUnterminated?: boolean;
        hasExtendedUnicodeEscape?: boolean;
    }
    export interface TemplateLiteralLikeNode extends LiteralLikeNode {
        rawText?: string;
    }
    export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
        _literalExpressionBrand: any;
    }
    export interface RegularExpressionLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.RegularExpressionLiteral;
    }
    export interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
        readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
    }
    export enum TokenFlags {
        None = 0,
        Scientific = 16,
        Octal = 32,
        HexSpecifier = 64,
        BinarySpecifier = 128,
        OctalSpecifier = 256,
    }
    export interface NumericLiteral extends LiteralExpression, Declaration {
        readonly kind: SyntaxKind.NumericLiteral;
    }
    export interface BigIntLiteral extends LiteralExpression {
        readonly kind: SyntaxKind.BigIntLiteral;
    }
    export type LiteralToken = NumericLiteral | BigIntLiteral | StringLiteral | JsxText | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
    export interface TemplateHead extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateHead;
        readonly parent: TemplateExpression | TemplateLiteralTypeNode;
    }
    export interface TemplateMiddle extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateMiddle;
        readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    }
    export interface TemplateTail extends TemplateLiteralLikeNode {
        readonly kind: SyntaxKind.TemplateTail;
        readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    }
    export type PseudoLiteralToken = TemplateHead | TemplateMiddle | TemplateTail;
    export type TemplateLiteralToken = NoSubstitutionTemplateLiteral | PseudoLiteralToken;
    export interface TemplateExpression extends PrimaryExpression {
        readonly kind: SyntaxKind.TemplateExpression;
        readonly head: TemplateHead;
        readonly templateSpans: NodeArray<TemplateSpan>;
    }
    export type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
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
    export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike> {
        readonly kind: SyntaxKind.ObjectLiteralExpression;
    }
    export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
    export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
    export type AccessExpression = PropertyAccessExpression | ElementAccessExpression;
    export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration {
        readonly kind: SyntaxKind.PropertyAccessExpression;
        readonly expression: LeftHandSideExpression;
        readonly questionDotToken?: QuestionDotToken;
        readonly name: MemberName;
    }
    export interface PropertyAccessChain extends PropertyAccessExpression {
        _optionalChainBrand: any;
        readonly name: MemberName;
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
    export interface SuperElementAccessExpression extends ElementAccessExpression {
        readonly expression: SuperExpression;
    }
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
    export type OptionalChain = PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain;
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
    }
    export type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression | Decorator | JsxOpeningLikeElement;
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
    export type AssertionExpression = TypeAssertion | AsExpression;
    export interface NonNullExpression extends LeftHandSideExpression {
        readonly kind: SyntaxKind.NonNullExpression;
        readonly expression: Expression;
    }
    export interface NonNullChain extends NonNullExpression {
        _optionalChainBrand: any;
    }
    export interface MetaProperty extends PrimaryExpression {
        readonly kind: SyntaxKind.MetaProperty;
        readonly keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
        readonly name: Identifier;
    }
    export interface JsxElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxElement;
        readonly openingElement: JsxOpeningElement;
        readonly children: NodeArray<JsxChild>;
        readonly closingElement: JsxClosingElement;
    }
    export type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
    export type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
    export type JsxTagNameExpression = Identifier | ThisExpression | JsxTagNamePropertyAccess;
    export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
        readonly expression: JsxTagNameExpression;
    }
    export interface JsxAttributes extends ObjectLiteralExpressionBase<JsxAttributeLike> {
        readonly kind: SyntaxKind.JsxAttributes;
        readonly parent: JsxOpeningLikeElement;
    }
    export interface JsxOpeningElement extends Expression {
        readonly kind: SyntaxKind.JsxOpeningElement;
        readonly parent: JsxElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }
    export interface JsxSelfClosingElement extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxSelfClosingElement;
        readonly tagName: JsxTagNameExpression;
        readonly typeArguments?: NodeArray<TypeNode>;
        readonly attributes: JsxAttributes;
    }
    export interface JsxFragment extends PrimaryExpression {
        readonly kind: SyntaxKind.JsxFragment;
        readonly openingFragment: JsxOpeningFragment;
        readonly children: NodeArray<JsxChild>;
        readonly closingFragment: JsxClosingFragment;
    }
    export interface JsxOpeningFragment extends Expression {
        readonly kind: SyntaxKind.JsxOpeningFragment;
        readonly parent: JsxFragment;
    }
    export interface JsxClosingFragment extends Expression {
        readonly kind: SyntaxKind.JsxClosingFragment;
        readonly parent: JsxFragment;
    }
    export interface JsxAttribute extends ObjectLiteralElement {
        readonly kind: SyntaxKind.JsxAttribute;
        readonly parent: JsxAttributes;
        readonly name: Identifier;
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
        readonly parent: JsxElement | JsxFragment | JsxAttributeLike;
        readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
        readonly expression?: Expression;
    }
    export interface JsxText extends LiteralLikeNode {
        readonly kind: SyntaxKind.JsxText;
        readonly parent: JsxElement | JsxFragment;
        readonly containsOnlyTriviaWhiteSpaces: boolean;
    }
    export type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
    export interface Statement extends Node, JSDocContainer {
        _statementBrand: any;
    }
    export interface NotEmittedStatement extends Statement {
        readonly kind: SyntaxKind.NotEmittedStatement;
    }
    /**
     * A list of comma-separated expressions. This node is only created by transformations.
     */
    export interface CommaListExpression extends Expression {
        readonly kind: SyntaxKind.CommaListExpression;
        readonly elements: NodeArray<Expression>;
    }
    export interface EmptyStatement extends Statement {
        readonly kind: SyntaxKind.EmptyStatement;
    }
    export interface DebuggerStatement extends Statement {
        readonly kind: SyntaxKind.DebuggerStatement;
    }
    export interface MissingDeclaration extends DeclarationStatement {
        readonly kind: SyntaxKind.MissingDeclaration;
        readonly name?: Identifier;
    }
    export type BlockLike = SourceFile | Block | ModuleBlock | CaseOrDefaultClause;
    export interface Block extends Statement {
        readonly kind: SyntaxKind.Block;
        readonly statements: NodeArray<Statement>;
    }
    export interface VariableStatement extends Statement {
        readonly kind: SyntaxKind.VariableStatement;
        readonly declarationList: VariableDeclarationList;
    }
    export interface ExpressionStatement extends Statement {
        readonly kind: SyntaxKind.ExpressionStatement;
        readonly expression: Expression;
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
    export type ForInitializer = VariableDeclarationList | Expression;
    export interface ForStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForStatement;
        readonly initializer?: ForInitializer;
        readonly condition?: Expression;
        readonly incrementor?: Expression;
    }
    export type ForInOrOfStatement = ForInStatement | ForOfStatement;
    export interface ForInStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForInStatement;
        readonly initializer: ForInitializer;
        readonly expression: Expression;
    }
    export interface ForOfStatement extends IterationStatement {
        readonly kind: SyntaxKind.ForOfStatement;
        readonly awaitModifier?: AwaitKeyword;
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
    export type BreakOrContinueStatement = BreakStatement | ContinueStatement;
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
        possiblyExhaustive?: boolean;
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
    }
    export interface DefaultClause extends Node {
        readonly kind: SyntaxKind.DefaultClause;
        readonly parent: CaseBlock;
        readonly statements: NodeArray<Statement>;
    }
    export type CaseOrDefaultClause = CaseClause | DefaultClause;
    export interface LabeledStatement extends Statement {
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
    export type ObjectTypeDeclaration = ClassLikeDeclaration | InterfaceDeclaration | TypeLiteralNode;
    export type DeclarationWithTypeParameters = DeclarationWithTypeParameterChildren | JSDocTypedefTag | JSDocCallbackTag | JSDocSignature;
    export type DeclarationWithTypeParameterChildren = SignatureDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTemplateTag;
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
    export type ClassLikeDeclaration = ClassDeclaration | ClassExpression;
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
        readonly name: PropertyName;
        readonly initializer?: Expression;
    }
    export interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.EnumDeclaration;
        readonly name: Identifier;
        readonly members: NodeArray<EnumMember>;
    }
    export type ModuleName = Identifier | StringLiteral;
    export type ModuleBody = NamespaceBody | JSDocNamespaceBody;
    export interface ModuleDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ModuleDeclaration;
        readonly parent: ModuleBody | SourceFile;
        readonly name: ModuleName;
        readonly body?: ModuleBody | JSDocNamespaceDeclaration;
    }
    export type NamespaceBody = ModuleBlock | NamespaceDeclaration;
    export interface NamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body: NamespaceBody;
    }
    export type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
    export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
        readonly name: Identifier;
        readonly body?: JSDocNamespaceBody;
    }
    export interface ModuleBlock extends Node, Statement {
        readonly kind: SyntaxKind.ModuleBlock;
        readonly parent: ModuleDeclaration;
        readonly statements: NodeArray<Statement>;
    }
    export type ModuleReference = EntityName | ExternalModuleReference;
    /**
     * One of:
     * - import x = require("mod");
     * - import x = M.x;
     */
    export interface ImportEqualsDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ImportEqualsDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly name: Identifier;
        readonly isTypeOnly: boolean;
        readonly moduleReference: ModuleReference;
    }
    export interface ExternalModuleReference extends Node {
        readonly kind: SyntaxKind.ExternalModuleReference;
        readonly parent: ImportEqualsDeclaration;
        readonly expression: Expression;
    }
    export interface ImportDeclaration extends Statement {
        readonly kind: SyntaxKind.ImportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly importClause?: ImportClause;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier: Expression;
        readonly assertClause?: AssertClause;
    }
    export type NamedImportBindings = NamespaceImport | NamedImports;
    export type NamedExportBindings = NamespaceExport | NamedExports;
    export interface ImportClause extends NamedDeclaration {
        readonly kind: SyntaxKind.ImportClause;
        readonly parent: ImportDeclaration;
        readonly isTypeOnly: boolean;
        readonly name?: Identifier;
        readonly namedBindings?: NamedImportBindings;
    }
    export type AssertionKey = Identifier | StringLiteral;
    export interface AssertEntry extends Node {
        readonly kind: SyntaxKind.AssertEntry;
        readonly parent: AssertClause;
        readonly name: AssertionKey;
        readonly value: Expression;
    }
    export interface AssertClause extends Node {
        readonly kind: SyntaxKind.AssertClause;
        readonly parent: ImportDeclaration | ExportDeclaration;
        readonly elements: NodeArray<AssertEntry>;
        readonly multiLine?: boolean;
    }
    export interface NamespaceImport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceImport;
        readonly parent: ImportClause;
        readonly name: Identifier;
    }
    export interface NamespaceExport extends NamedDeclaration {
        readonly kind: SyntaxKind.NamespaceExport;
        readonly parent: ExportDeclaration;
        readonly name: Identifier;
    }
    export interface NamespaceExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.NamespaceExportDeclaration;
        readonly name: Identifier;
    }
    export interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
        readonly kind: SyntaxKind.ExportDeclaration;
        readonly parent: SourceFile | ModuleBlock;
        readonly isTypeOnly: boolean;
        /** Will not be assigned in the case of `export * from "foo";` */
        readonly exportClause?: NamedExportBindings;
        /** If this is not a StringLiteral it will be a grammar error. */
        readonly moduleSpecifier?: Expression;
        readonly assertClause?: AssertClause;
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
        readonly propertyName?: Identifier;
        readonly name: Identifier;
        readonly isTypeOnly: boolean;
    }
    export interface ExportSpecifier extends NamedDeclaration, JSDocContainer {
        readonly kind: SyntaxKind.ExportSpecifier;
        readonly parent: NamedExports;
        readonly isTypeOnly: boolean;
        readonly propertyName?: Identifier;
        readonly name: Identifier;
    }
    export type ImportOrExportSpecifier = ImportSpecifier | ExportSpecifier;
    export type TypeOnlyCompatibleAliasDeclaration = ImportClause | ImportEqualsDeclaration | NamespaceImport | ImportOrExportSpecifier;
    export type TypeOnlyAliasDeclaration = ImportClause & {
        readonly isTypeOnly: true;
        readonly name: Identifier;
    } | ImportEqualsDeclaration & {
        readonly isTypeOnly: true;
    } | NamespaceImport & {
        readonly parent: ImportClause & {
            readonly isTypeOnly: true;
        };
    } | ImportSpecifier & ({
        readonly isTypeOnly: true;
    } | {
        readonly parent: NamedImports & {
            readonly parent: ImportClause & {
                readonly isTypeOnly: true;
            };
        };
    }) | ExportSpecifier & ({
        readonly isTypeOnly: true;
    } | {
        readonly parent: NamedExports & {
            readonly parent: ExportDeclaration & {
                readonly isTypeOnly: true;
            };
        };
    });
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
    export interface JSDocTypeExpression extends TypeNode {
        readonly kind: SyntaxKind.JSDocTypeExpression;
        readonly type: TypeNode;
    }
    export interface JSDocNameReference extends Node {
        readonly kind: SyntaxKind.JSDocNameReference;
        readonly name: EntityName | JSDocMemberName;
    }
    /** Class#method reference in JSDoc */
    export interface JSDocMemberName extends Node {
        readonly kind: SyntaxKind.JSDocMemberName;
        readonly left: EntityName | JSDocMemberName;
        readonly right: Identifier;
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
    export type JSDocTypeReferencingNode = JSDocVariadicType | JSDocOptionalType | JSDocNullableType | JSDocNonNullableType;
    export interface JSDoc extends Node {
        readonly kind: SyntaxKind.JSDocComment;
        readonly parent: HasJSDoc;
        readonly tags?: NodeArray<JSDocTag>;
        readonly comment?: string | NodeArray<JSDocComment>;
    }
    export interface JSDocTag extends Node {
        readonly parent: JSDoc | JSDocTypeLiteral;
        readonly tagName: Identifier;
        readonly comment?: string | NodeArray<JSDocComment>;
    }
    export interface JSDocLink extends Node {
        readonly kind: SyntaxKind.JSDocLink;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    export interface JSDocLinkCode extends Node {
        readonly kind: SyntaxKind.JSDocLinkCode;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    export interface JSDocLinkPlain extends Node {
        readonly kind: SyntaxKind.JSDocLinkPlain;
        readonly name?: EntityName | JSDocMemberName;
        text: string;
    }
    export type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;
    export interface JSDocText extends Node {
        readonly kind: SyntaxKind.JSDocText;
        text: string;
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
        readonly class: ExpressionWithTypeArguments & {
            readonly expression: Identifier | PropertyAccessEntityNameExpression;
        };
    }
    export interface JSDocImplementsTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocImplementsTag;
        readonly class: ExpressionWithTypeArguments & {
            readonly expression: Identifier | PropertyAccessEntityNameExpression;
        };
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
    export interface JSDocOverrideTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocOverrideTag;
    }
    export interface JSDocEnumTag extends JSDocTag, Declaration {
        readonly kind: SyntaxKind.JSDocEnumTag;
        readonly parent: JSDoc;
        readonly typeExpression: JSDocTypeExpression;
    }
    export interface JSDocThisTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocThisTag;
        readonly typeExpression: JSDocTypeExpression;
    }
    export interface JSDocTemplateTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocTemplateTag;
        readonly constraint: JSDocTypeExpression | undefined;
        readonly typeParameters: NodeArray<TypeParameterDeclaration>;
    }
    export interface JSDocSeeTag extends JSDocTag {
        readonly kind: SyntaxKind.JSDocSeeTag;
        readonly name?: JSDocNameReference;
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
    export enum FlowFlags {
        Unreachable = 1,
        Start = 2,
        BranchLabel = 4,
        LoopLabel = 8,
        Assignment = 16,
        TrueCondition = 32,
        FalseCondition = 64,
        SwitchClause = 128,
        ArrayMutation = 256,
        Call = 512,
        ReduceLabel = 1024,
        Referenced = 2048,
        Shared = 4096,
        Label = 12,
        Condition = 96
    }
    export type FlowNode = FlowStart | FlowLabel | FlowAssignment | FlowCall | FlowCondition | FlowSwitchClause | FlowArrayMutation | FlowCall | FlowReduceLabel;
    export interface FlowNodeBase {
        flags: FlowFlags;
        id?: number;
    }
    export interface FlowStart extends FlowNodeBase {
        node?: FunctionExpression | ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration;
    }
    export interface FlowLabel extends FlowNodeBase {
        antecedents: FlowNode[] | undefined;
    }
    export interface FlowAssignment extends FlowNodeBase {
        node: Expression | VariableDeclaration | BindingElement;
        antecedent: FlowNode;
    }
    export interface FlowCall extends FlowNodeBase {
        node: CallExpression;
        antecedent: FlowNode;
    }
    export interface FlowCondition extends FlowNodeBase {
        node: Expression;
        antecedent: FlowNode;
    }
    export interface FlowSwitchClause extends FlowNodeBase {
        switchStatement: SwitchStatement;
        clauseStart: number;
        clauseEnd: number;
        antecedent: FlowNode;
    }
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
    export interface IncompleteType {
        flags: TypeFlags;
        type: Type;
    }
    export interface AmdDependency {
        path: string;
        name?: string;
    }
    export interface SourceFile extends Declaration {
        readonly kind: SyntaxKind.SourceFile;
        readonly statements: NodeArray<Statement>;
        readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
        fileName: string;
        text: string;
        amdDependencies: readonly AmdDependency[];
        moduleName?: string;
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly FileReference[];
        libReferenceDirectives: readonly FileReference[];
        languageVariant: LanguageVariant;
        isDeclarationFile: boolean;
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
        /**
         * When `module` is `Node12` or `NodeNext`, this field controls whether the
         * source file in question is an ESNext-output-format file, or a CommonJS-output-format
         * module. This is derived by the module resolver as it looks up the file, since
         * it is derived from either the file extension of the module, or the containing
         * `package.json` context, and affects both checking and emit.
         *
         * It is _public_ so that (pre)transformers can set this field,
         * since it switches the builtin `node` module transform. Generally speaking, if unset,
         * the field is treated as though it is `ModuleKind.CommonJS`.
         */
        impliedNodeFormat?: ModuleKind.ESNext | ModuleKind.CommonJS;
    }
    export interface Bundle extends Node {
        readonly kind: SyntaxKind.Bundle;
        readonly prepends: readonly (InputFiles | UnparsedSource)[];
        readonly sourceFiles: readonly SourceFile[];
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
    }
    export interface UnparsedSource extends Node {
        readonly kind: SyntaxKind.UnparsedSource;
        fileName: string;
        text: string;
        readonly prologues: readonly UnparsedPrologue[];
        helpers: readonly UnscopedEmitHelper[] | undefined;
        referencedFiles: readonly FileReference[];
        typeReferenceDirectives: readonly string[] | undefined;
        libReferenceDirectives: readonly FileReference[];
        hasNoDefaultLib?: boolean;
        sourceMapPath?: string;
        sourceMapText?: string;
        readonly syntheticReferences?: readonly UnparsedSyntheticReference[];
        readonly texts: readonly UnparsedSourceText[];
    }
    export type UnparsedSourceText = UnparsedPrepend | UnparsedTextLike;
    export type UnparsedNode = UnparsedPrologue | UnparsedSourceText | UnparsedSyntheticReference;
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
    export type JsonObjectExpression = ObjectLiteralExpression | ArrayLiteralExpression | JsonMinusNumericLiteral | NumericLiteral | StringLiteral | BooleanLiteral | NullLiteral;
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
    export type ResolvedConfigFileName = string & {
        _isResolvedConfigFileName: never;
    };
    export type WriteFileCallback = (fileName: string, data: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: readonly SourceFile[]) => void;
    export class OperationCanceledException {
    }
    export interface CancellationToken {
        isCancellationRequested(): boolean;
        /** @throws OperationCanceledException if isCancellationRequested is true */
        throwIfCancellationRequested(): void;
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
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /** The first time this is called, it will return global diagnostics (no location). */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        /**
         * Gets a type checker that can be used to semantically analyze source files in the program.
         */
        getTypeChecker(): TypeChecker;
        getNodeCount(): number;
        getIdentifierCount(): number;
        getSymbolCount(): number;
        getTypeCount(): number;
        getInstantiationCount(): number;
        getRelationCacheSizes(): {
            assignable: number;
            identity: number;
            subtype: number;
            strictSubtype: number;
        };
        isSourceFileFromExternalLibrary(file: SourceFile): boolean;
        isSourceFileDefaultLibrary(file: SourceFile): boolean;
        getProjectReferences(): readonly ProjectReference[] | undefined;
        getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
    }
    export interface ResolvedProjectReference {
        commandLine: ParsedCommandLine;
        sourceFile: SourceFile;
        references?: readonly (ResolvedProjectReference | undefined)[];
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
    /** Return code used by getEmitOutput function to indicate status of the function */
    export enum ExitStatus {
        Success = 0,
        DiagnosticsPresent_OutputsSkipped = 1,
        DiagnosticsPresent_OutputsGenerated = 2,
        InvalidProject_OutputsSkipped = 3,
        ProjectReferenceCycle_OutputsSkipped = 4,
        /** @deprecated Use ProjectReferenceCycle_OutputsSkipped instead. */
        ProjectReferenceCycle_OutputsSkupped = 4
    }
    export interface EmitResult {
        emitSkipped: boolean;
        /** Contains declaration emit diagnostics */
        diagnostics: readonly Diagnostic[];
        emittedFiles?: string[];
    }
    export interface TypeChecker {
        getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
        getDeclaredTypeOfSymbol(symbol: Symbol): Type;
        getPropertiesOfType(type: Type): Symbol[];
        getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
        getPrivateIdentifierPropertyOfType(leftType: Type, name: string, location: Node): Symbol | undefined;
        getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
        getIndexInfosOfType(type: Type): readonly IndexInfo[];
        getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
        getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
        getBaseTypes(type: InterfaceType): BaseType[];
        getBaseTypeOfLiteralType(type: Type): Type;
        getWidenedType(type: Type): Type;
        getReturnTypeOfSignature(signature: Signature): Type;
        getNullableType(type: Type, flags: TypeFlags): Type;
        getNonNullableType(type: Type): Type;
        getTypeArguments(type: TypeReference): readonly Type[];
        /** Note that the resulting nodes cannot be checked. */
        typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeNode | undefined;
        /** Note that the resulting nodes cannot be checked. */
        signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): SignatureDeclaration & {
            typeArguments?: NodeArray<TypeNode>;
        } | undefined;
        /** Note that the resulting nodes cannot be checked. */
        indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): IndexSignatureDeclaration | undefined;
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
        getShorthandAssignmentValueSymbol(location: Node | undefined): Symbol | undefined;
        getExportSpecifierLocalTargetSymbol(location: ExportSpecifier | Identifier): Symbol | undefined;
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
        getFullyQualifiedName(symbol: Symbol): string;
        getAugmentedPropertiesOfType(type: Type): Symbol[];
        getRootSymbols(symbol: Symbol): readonly Symbol[];
        getSymbolOfExpando(node: Node, allowDeclaration: boolean): Symbol | undefined;
        getContextualType(node: Expression): Type | undefined;
        /**
         * returns unknownSignature in the case of an error.
         * returns undefined if the node is not valid.
         * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
         */
        getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
        getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;
        isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
        isUndefinedSymbol(symbol: Symbol): boolean;
        isArgumentsSymbol(symbol: Symbol): boolean;
        isUnknownSymbol(symbol: Symbol): boolean;
        getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
        isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName | ImportTypeNode, propertyName: string): boolean;
        /** Follow all aliases to get the original symbol. */
        getAliasedSymbol(symbol: Symbol): Symbol;
        /** Follow a *single* alias to get the immediately aliased symbol. */
        getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined;
        getExportsOfModule(moduleSymbol: Symbol): Symbol[];
        getJsxIntrinsicTagNamesAt(location: Node): Symbol[];
        isOptionalParameter(node: ParameterDeclaration): boolean;
        getAmbientModules(): Symbol[];
        tryGetMemberInModuleExports(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
        getApparentType(type: Type): Type;
        getBaseConstraintOfType(type: Type): Type | undefined;
        getDefaultFromTypeParameter(type: Type): Type | undefined;
        getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined;
        /**
         * Depending on the operation performed, it may be appropriate to throw away the checker
         * if the cancellation token is triggered. Typically, if it is used for error checking
         * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
         */
        runWithCancellationToken<T>(token: CancellationToken, cb: (checker: TypeChecker) => T): T;
    }
    export enum NodeBuilderFlags {
        None = 0,
        NoTruncation = 1,
        WriteArrayAsGenericType = 2,
        GenerateNamesForShadowedTypeParams = 4,
        UseStructuralFallback = 8,
        ForbidIndexedAccessSymbolReferences = 16,
        WriteTypeArgumentsOfSignature = 32,
        UseFullyQualifiedType = 64,
        UseOnlyExternalAliasing = 128,
        SuppressAnyReturnType = 256,
        WriteTypeParametersInQualifiedName = 512,
        MultilineObjectLiterals = 1024,
        WriteClassExpressionAsTypeLiteral = 2048,
        UseTypeOfFunction = 4096,
        OmitParameterModifiers = 8192,
        UseAliasDefinedOutsideCurrentScope = 16384,
        UseSingleQuotesForStringLiteralType = 268435456,
        NoTypeReduction = 536870912,
        NoUndefinedOptionalParameterType = 1073741824,
        AllowThisInObjectLiteral = 32768,
        AllowQualifiedNameInPlaceOfIdentifier = 65536,
        /** @deprecated AllowQualifedNameInPlaceOfIdentifier. Use AllowQualifiedNameInPlaceOfIdentifier instead. */
        AllowQualifedNameInPlaceOfIdentifier = 65536,
        AllowAnonymousIdentifier = 131072,
        AllowEmptyUnionOrIntersection = 262144,
        AllowEmptyTuple = 524288,
        AllowUniqueESSymbolType = 1048576,
        AllowEmptyIndexInfoType = 2097152,
        AllowNodeModulesRelativePaths = 67108864,
        IgnoreErrors = 70221824,
        InObjectTypeLiteral = 4194304,
        InTypeAlias = 8388608,
        InInitialEntityName = 16777216
    }
    export enum TypeFormatFlags {
        None = 0,
        NoTruncation = 1,
        WriteArrayAsGenericType = 2,
        UseStructuralFallback = 8,
        WriteTypeArgumentsOfSignature = 32,
        UseFullyQualifiedType = 64,
        SuppressAnyReturnType = 256,
        MultilineObjectLiterals = 1024,
        WriteClassExpressionAsTypeLiteral = 2048,
        UseTypeOfFunction = 4096,
        OmitParameterModifiers = 8192,
        UseAliasDefinedOutsideCurrentScope = 16384,
        UseSingleQuotesForStringLiteralType = 268435456,
        NoTypeReduction = 536870912,
        AllowUniqueESSymbolType = 1048576,
        AddUndefined = 131072,
        WriteArrowStyleSignature = 262144,
        InArrayType = 524288,
        InElementType = 2097152,
        InFirstTypeArgument = 4194304,
        InTypeAlias = 8388608,
        /** @deprecated */ WriteOwnNameForAnyLike = 0,
        NodeBuilderFlagsMask = 814775659
    }
    export enum SymbolFormatFlags {
        None = 0,
        WriteTypeParametersOrArguments = 1,
        UseOnlyExternalAliasing = 2,
        AllowAnyNodeKind = 4,
        UseAliasDefinedOutsideCurrentScope = 8,
    }
    export enum TypePredicateKind {
        This = 0,
        Identifier = 1,
        AssertsThis = 2,
        AssertsIdentifier = 3
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
    export enum SymbolFlags {
        None = 0,
        FunctionScopedVariable = 1,
        BlockScopedVariable = 2,
        Property = 4,
        EnumMember = 8,
        Function = 16,
        Class = 32,
        Interface = 64,
        ConstEnum = 128,
        RegularEnum = 256,
        ValueModule = 512,
        NamespaceModule = 1024,
        TypeLiteral = 2048,
        ObjectLiteral = 4096,
        Method = 8192,
        Constructor = 16384,
        GetAccessor = 32768,
        SetAccessor = 65536,
        Signature = 131072,
        TypeParameter = 262144,
        TypeAlias = 524288,
        ExportValue = 1048576,
        Alias = 2097152,
        Prototype = 4194304,
        ExportStar = 8388608,
        Optional = 16777216,
        Transient = 33554432,
        Assignment = 67108864,
        ModuleExports = 134217728,
        Enum = 384,
        Variable = 3,
        Value = 111551,
        Type = 788968,
        Namespace = 1920,
        Module = 1536,
        Accessor = 98304,
        FunctionScopedVariableExcludes = 111550,
        BlockScopedVariableExcludes = 111551,
        ParameterExcludes = 111551,
        PropertyExcludes = 0,
        EnumMemberExcludes = 900095,
        FunctionExcludes = 110991,
        ClassExcludes = 899503,
        InterfaceExcludes = 788872,
        RegularEnumExcludes = 899327,
        ConstEnumExcludes = 899967,
        ValueModuleExcludes = 110735,
        NamespaceModuleExcludes = 0,
        MethodExcludes = 103359,
        GetAccessorExcludes = 46015,
        SetAccessorExcludes = 78783,
        TypeParameterExcludes = 526824,
        TypeAliasExcludes = 788968,
        AliasExcludes = 2097152,
        ModuleMember = 2623475,
        ExportHasLocal = 944,
        BlockScoped = 418,
        PropertyOrAccessor = 98308,
        ClassMember = 106500,
    }
    export interface Symbol {
        flags: SymbolFlags;
        escapedName: __String;
        declarations?: Declaration[];
        valueDeclaration?: Declaration;
        members?: SymbolTable;
        exports?: SymbolTable;
        globalExports?: SymbolTable;
    }
    export enum InternalSymbolName {
        Call = "__call",
        Constructor = "__constructor",
        New = "__new",
        Index = "__index",
        ExportStar = "__export",
        Global = "__global",
        Missing = "__missing",
        Type = "__type",
        Object = "__object",
        JSXAttributes = "__jsxAttributes",
        Class = "__class",
        Function = "__function",
        Computed = "__computed",
        Resolving = "__resolving__",
        ExportEquals = "export=",
        Default = "default",
        This = "this"
    }
    /**
     * This represents a string whose leading underscore have been escaped by adding extra leading underscores.
     * The shape of this brand is rather unique compared to others we've used.
     * Instead of just an intersection of a string and an object, it is that union-ed
     * with an intersection of void and an object. This makes it wholly incompatible
     * with a normal string (which is good, it cannot be misused on assignment or on usage),
     * while still being comparable with a normal string via === (also good) and castable from a string.
     */
    export type __String = (string & {
        __escapedIdentifier: void;
    }) | (void & {
        __escapedIdentifier: void;
    }) | InternalSymbolName;
    /** ReadonlyMap where keys are `__String`s. */
    export interface ReadonlyUnderscoreEscapedMap<T> extends ReadonlyESMap<__String, T> {
    }
    /** Map where keys are `__String`s. */
    export interface UnderscoreEscapedMap<T> extends ESMap<__String, T>, ReadonlyUnderscoreEscapedMap<T> {
    }
    /** SymbolTable based on ES6 Map interface. */
    export type SymbolTable = UnderscoreEscapedMap<Symbol>;
    export enum TypeFlags {
        Any = 1,
        Unknown = 2,
        String = 4,
        Number = 8,
        Boolean = 16,
        Enum = 32,
        BigInt = 64,
        StringLiteral = 128,
        NumberLiteral = 256,
        BooleanLiteral = 512,
        EnumLiteral = 1024,
        BigIntLiteral = 2048,
        ESSymbol = 4096,
        UniqueESSymbol = 8192,
        Void = 16384,
        Undefined = 32768,
        Null = 65536,
        Never = 131072,
        TypeParameter = 262144,
        Object = 524288,
        Union = 1048576,
        Intersection = 2097152,
        Index = 4194304,
        IndexedAccess = 8388608,
        Conditional = 16777216,
        Substitution = 33554432,
        NonPrimitive = 67108864,
        TemplateLiteral = 134217728,
        StringMapping = 268435456,
        Literal = 2944,
        Unit = 109440,
        StringOrNumberLiteral = 384,
        PossiblyFalsy = 117724,
        StringLike = 402653316,
        NumberLike = 296,
        BigIntLike = 2112,
        BooleanLike = 528,
        EnumLike = 1056,
        ESSymbolLike = 12288,
        VoidLike = 49152,
        UnionOrIntersection = 3145728,
        StructuredType = 3670016,
        TypeVariable = 8650752,
        InstantiableNonPrimitive = 58982400,
        InstantiablePrimitive = 406847488,
        Instantiable = 465829888,
        StructuredOrInstantiable = 469499904,
        Narrowable = 536624127,
    }
    export type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;
    export interface Type {
        flags: TypeFlags;
        symbol: Symbol;
        pattern?: DestructuringPattern;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: readonly Type[];
    }
    export interface LiteralType extends Type {
        value: string | number | PseudoBigInt;
        freshType: LiteralType;
        regularType: LiteralType;
    }
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
    export interface EnumType extends Type {
    }
    export enum ObjectFlags {
        Class = 1,
        Interface = 2,
        Reference = 4,
        Tuple = 8,
        Anonymous = 16,
        Mapped = 32,
        Instantiated = 64,
        ObjectLiteral = 128,
        EvolvingArray = 256,
        ObjectLiteralPatternWithComputedProperties = 512,
        ReverseMapped = 1024,
        JsxAttributes = 2048,
        MarkerType = 4096,
        JSLiteral = 8192,
        FreshLiteral = 16384,
        ArrayLiteral = 32768,
        ClassOrInterface = 3,
        ContainsSpread = 4194304,
        ObjectRestType = 8388608,
    }
    export interface ObjectType extends Type {
        objectFlags: ObjectFlags;
    }
    /** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
    export interface InterfaceType extends ObjectType {
        typeParameters: TypeParameter[] | undefined;
        outerTypeParameters: TypeParameter[] | undefined;
        localTypeParameters: TypeParameter[] | undefined;
        thisType: TypeParameter | undefined;
    }
    export type BaseType = ObjectType | IntersectionType | TypeVariable;
    export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
        declaredProperties: Symbol[];
        declaredCallSignatures: Signature[];
        declaredConstructSignatures: Signature[];
        declaredIndexInfos: IndexInfo[];
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
        target: GenericType;
        node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    }
    export interface DeferredTypeReference extends TypeReference {
    }
    export interface GenericType extends InterfaceType, TypeReference {
    }
    export enum ElementFlags {
        Required = 1,
        Optional = 2,
        Rest = 4,
        Variadic = 8,
        Fixed = 3,
        Variable = 12,
        NonRequired = 14,
        NonRest = 11
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
        types: Type[];
    }
    export interface UnionType extends UnionOrIntersectionType {
    }
    export interface IntersectionType extends UnionOrIntersectionType {
    }
    export type StructuredType = ObjectType | UnionType | IntersectionType;
    export interface EvolvingArrayType extends ObjectType {
        elementType: Type;
        finalArrayType?: Type;
    }
    export interface InstantiableType extends Type {
    }
    export interface TypeParameter extends InstantiableType {
    }
    export interface IndexedAccessType extends InstantiableType {
        objectType: Type;
        indexType: Type;
        constraint?: Type;
        simplifiedForReading?: Type;
        simplifiedForWriting?: Type;
    }
    export type TypeVariable = TypeParameter | IndexedAccessType;
    export interface IndexType extends InstantiableType {
        type: InstantiableType | UnionOrIntersectionType;
    }
    export interface ConditionalRoot {
        node: ConditionalTypeNode;
        checkType: Type;
        extendsType: Type;
        isDistributive: boolean;
        inferTypeParameters?: TypeParameter[];
        outerTypeParameters?: TypeParameter[];
        instantiations?: Map<Type>;
        aliasSymbol?: Symbol;
        aliasTypeArguments?: Type[];
    }
    export interface ConditionalType extends InstantiableType {
        root: ConditionalRoot;
        checkType: Type;
        extendsType: Type;
        resolvedTrueType?: Type;
        resolvedFalseType?: Type;
    }
    export interface TemplateLiteralType extends InstantiableType {
        texts: readonly string[];
        types: readonly Type[];
    }
    export interface StringMappingType extends InstantiableType {
        symbol: Symbol;
        type: Type;
    }
    export interface SubstitutionType extends InstantiableType {
        objectFlags: ObjectFlags;
        baseType: Type;
        substitute: Type;
    }
    export enum SignatureKind {
        Call = 0,
        Construct = 1
    }
    export interface Signature {
        declaration?: SignatureDeclaration | JSDocSignature;
        typeParameters?: readonly TypeParameter[];
        parameters: readonly Symbol[];
    }
    export enum IndexKind {
        String = 0,
        Number = 1
    }
    export interface IndexInfo {
        keyType: Type;
        type: Type;
        isReadonly: boolean;
        declaration?: IndexSignatureDeclaration;
    }
    export enum InferencePriority {
        NakedTypeVariable = 1,
        SpeculativeTuple = 2,
        SubstituteSource = 4,
        HomomorphicMappedType = 8,
        PartialHomomorphicMappedType = 16,
        MappedTypeConstraint = 32,
        ContravariantConditional = 64,
        ReturnType = 128,
        LiteralKeyof = 256,
        NoConstraints = 512,
        AlwaysStrict = 1024,
        MaxValue = 2048,
        PriorityImpliesCombination = 416,
        Circularity = -1
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
        reportsDeprecated?: {};
        source?: string;
        relatedInformation?: DiagnosticRelatedInformation[];
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
    export enum DiagnosticCategory {
        Warning = 0,
        Error = 1,
        Suggestion = 2,
        Message = 3
    }
    export enum ModuleResolutionKind {
        Classic = 1,
        NodeJs = 2,
        Node12 = 3,
        NodeNext = 99
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
        FixedPollingInterval = 0,
        PriorityPollingInterval = 1,
        DynamicPriorityPolling = 2,
        FixedChunkSizePolling = 3,
        UseFsEvents = 4,
        UseFsEventsOnParentDirectory = 5
    }
    export enum WatchDirectoryKind {
        UseFsEvents = 0,
        FixedPollingInterval = 1,
        DynamicPriorityPolling = 2,
        FixedChunkSizePolling = 3
    }
    export enum PollingWatchKind {
        FixedInterval = 0,
        PriorityInterval = 1,
        DynamicPriority = 2,
        FixedChunkSize = 3
    }
    export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined;
    export interface CompilerOptions {
        allowJs?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUmdGlobalAccess?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        declaration?: boolean;
        declarationMap?: boolean;
        emitDeclarationOnly?: boolean;
        declarationDir?: string;
        disableSizeLimit?: boolean;
        disableSourceOfProjectReferenceRedirect?: boolean;
        disableSolutionSearching?: boolean;
        disableReferencedProjectLoad?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        exactOptionalPropertyTypes?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        importHelpers?: boolean;
        importsNotUsedAsValues?: ImportsNotUsedAsValues;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit;
        keyofStringsOnly?: boolean;
        lib?: string[];
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind;
        moduleResolution?: ModuleResolutionKind;
        newLine?: NewLineKind;
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noStrictGenericChecks?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        noPropertyAccessFromIndexSignature?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        noUncheckedIndexedAccess?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        preserveConstEnums?: boolean;
        noImplicitOverride?: boolean;
        preserveSymlinks?: boolean;
        preserveValueImports?: boolean;
        project?: string;
        reactNamespace?: string;
        jsxFactory?: string;
        jsxFragmentFactory?: string;
        jsxImportSource?: string;
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
        strictFunctionTypes?: boolean;
        strictBindCallApply?: boolean;
        strictNullChecks?: boolean;
        strictPropertyInitialization?: boolean;
        stripInternal?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        target?: ScriptTarget;
        traceResolution?: boolean;
        useUnknownInCatchVariables?: boolean;
        resolveJsonModule?: boolean;
        types?: string[];
        /** Paths used to compute primary types search locations */
        typeRoots?: string[];
        esModuleInterop?: boolean;
        useDefineForClassFields?: boolean;
        [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
    }
    export interface WatchOptions {
        watchFile?: WatchFileKind;
        watchDirectory?: WatchDirectoryKind;
        fallbackPolling?: PollingWatchKind;
        synchronousWatchDirectory?: boolean;
        excludeDirectories?: string[];
        excludeFiles?: string[];
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
        disableFilenameBasedTypeAcquisition?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }
    export enum ModuleKind {
        None = 0,
        CommonJS = 1,
        AMD = 2,
        UMD = 3,
        System = 4,
        ES2015 = 5,
        ES2020 = 6,
        ES2022 = 7,
        ESNext = 99,
        Node12 = 100,
        NodeNext = 199
    }
    export enum JsxEmit {
        None = 0,
        Preserve = 1,
        React = 2,
        ReactNative = 3,
        ReactJSX = 4,
        ReactJSXDev = 5
    }
    export enum ImportsNotUsedAsValues {
        Remove = 0,
        Preserve = 1,
        Error = 2
    }
    export enum NewLineKind {
        CarriageReturnLineFeed = 0,
        LineFeed = 1
    }
    export interface LineAndCharacter {
        /** 0-based. */
        line: number;
        character: number;
    }
    export enum ScriptKind {
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
    export enum ScriptTarget {
        ES3 = 0,
        ES5 = 1,
        ES2015 = 2,
        ES2016 = 3,
        ES2017 = 4,
        ES2018 = 5,
        ES2019 = 6,
        ES2020 = 7,
        ES2021 = 8,
        ES2022 = 9,
        ESNext = 99,
        JSON = 100,
        Latest = 99
    }
    export enum LanguageVariant {
        Standard = 0,
        JSX = 1
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
    }
    export enum WatchDirectoryFlags {
        None = 0,
        Recursive = 1
    }
    export interface CreateProgramOptions {
        rootNames: readonly string[];
        options: CompilerOptions;
        projectReferences?: readonly ProjectReference[];
        host?: CompilerHost;
        oldProgram?: Program;
        configFileParsingDiagnostics?: readonly Diagnostic[];
    }
    export interface ModuleResolutionHost {
        fileExists(fileName: string): boolean;
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
        useCaseSensitiveFileNames?: boolean | (() => boolean);
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
    export enum Extension {
        Ts = ".ts",
        Tsx = ".tsx",
        Dts = ".d.ts",
        Js = ".js",
        Jsx = ".jsx",
        Json = ".json",
        TsBuildInfo = ".tsbuildinfo",
        Mjs = ".mjs",
        Mts = ".mts",
        Dmts = ".d.mts",
        Cjs = ".cjs",
        Cts = ".cts",
        Dcts = ".d.cts"
    }
    export interface ResolvedModuleWithFailedLookupLocations {
        readonly resolvedModule: ResolvedModuleFull | undefined;
    }
    export interface ResolvedTypeReferenceDirective {
        primary: boolean;
        resolvedFileName: string | undefined;
        packageId?: PackageId;
        /** True if `resolvedFileName` comes from `node_modules`. */
        isExternalLibraryImport?: boolean;
    }
    export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
        readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
        readonly failedLookupLocations: string[];
    }
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
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        /**
         * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
         */
        getModuleResolutionCache?(): ModuleResolutionCache | undefined;
        /**
         * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
         */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions): (ResolvedTypeReferenceDirective | undefined)[];
        getEnvironmentVariable?(name: string): string | undefined;
        createHash?(data: string): string;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    }
    export interface SourceMapRange extends TextRange {
        source?: SourceMapSource;
    }
    export interface SourceMapSource {
        fileName: string;
        text: string;
        skipTrivia?: (pos: number) => number;
    }
    export enum EmitFlags {
        None = 0,
        SingleLine = 1,
        AdviseOnEmitNode = 2,
        NoSubstitution = 4,
        CapturesThis = 8,
        NoLeadingSourceMap = 16,
        NoTrailingSourceMap = 32,
        NoSourceMap = 48,
        NoNestedSourceMaps = 64,
        NoTokenLeadingSourceMaps = 128,
        NoTokenTrailingSourceMaps = 256,
        NoTokenSourceMaps = 384,
        NoLeadingComments = 512,
        NoTrailingComments = 1024,
        NoComments = 1536,
        NoNestedComments = 2048,
        HelperName = 4096,
        ExportName = 8192,
        LocalName = 16384,
        InternalName = 32768,
        Indented = 65536,
        NoIndentation = 131072,
        AsyncFunctionBody = 262144,
        ReuseTempVariableScope = 524288,
        CustomPrologue = 1048576,
        NoHoisting = 2097152,
        HasEndOfDeclarationMarker = 4194304,
        Iterator = 8388608,
        NoAsciiEscaping = 16777216,
    }
    export interface EmitHelperBase {
        readonly name: string;
        readonly scoped: boolean;
        readonly text: string | ((node: EmitHelperUniqueNameCallback) => string);
        readonly priority?: number;
        readonly dependencies?: EmitHelper[];
    }
    export interface ScopedEmitHelper extends EmitHelperBase {
        readonly scoped: true;
    }
    export interface UnscopedEmitHelper extends EmitHelperBase {
        readonly scoped: false;
        readonly text: string;
    }
    export type EmitHelper = ScopedEmitHelper | UnscopedEmitHelper;
    export type EmitHelperUniqueNameCallback = (name: string) => string;
    export enum EmitHint {
        SourceFile = 0,
        Expression = 1,
        IdentifierName = 2,
        MappedTypeParameter = 3,
        Unspecified = 4,
        EmbeddedStatement = 5,
        JsxAttributeValue = 6
    }
    export enum OuterExpressionKinds {
        Parentheses = 1,
        TypeAssertions = 2,
        NonNullAssertions = 4,
        PartiallyEmittedExpressions = 8,
        Assertions = 6,
        All = 15,
        ExcludeJSDocTypeAssertion = 16
    }
    export type TypeOfTag = "undefined" | "number" | "bigint" | "boolean" | "string" | "symbol" | "object" | "function";
    export interface NodeFactory {
        createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
        createNumericLiteral(value: string | number, numericLiteralFlags?: TokenFlags): NumericLiteral;
        createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral;
        createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
        createStringLiteralFromNode(sourceNode: PropertyNameLiteral, isSingleQuote?: boolean): StringLiteral;
        createRegularExpressionLiteral(text: string): RegularExpressionLiteral;
        createIdentifier(text: string): Identifier;
        /**
         * Create a unique temporary variable.
         * @param recordTempVariable An optional callback used to record the temporary variable name. This
         * should usually be a reference to `hoistVariableDeclaration` from a `TransformationContext`, but
         * can be `undefined` if you plan to record the temporary variable manually.
         * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
         * during emit so that the variable can be referenced in a nested function body. This is an alternative to
         * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
         */
        createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): Identifier;
        /**
         * Create a unique temporary variable for use in a loop.
         * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
         * during emit so that the variable can be referenced in a nested function body. This is an alternative to
         * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
         */
        createLoopVariable(reservedInNestedScopes?: boolean): Identifier;
        /** Create a unique name based on the supplied text. */
        createUniqueName(text: string, flags?: GeneratedIdentifierFlags): Identifier;
        /** Create a unique name generated for a node. */
        getGeneratedNameForNode(node: Node | undefined, flags?: GeneratedIdentifierFlags): Identifier;
        createPrivateIdentifier(text: string): PrivateIdentifier;
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
        createSuper(): SuperExpression;
        createThis(): ThisExpression;
        createNull(): NullLiteral;
        createTrue(): TrueLiteral;
        createFalse(): FalseLiteral;
        createModifier<T extends ModifierSyntaxKind>(kind: T): ModifierToken<T>;
        createModifiersFromModifierFlags(flags: ModifierFlags): Modifier[] | undefined;
        createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
        updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName;
        createComputedPropertyName(expression: Expression): ComputedPropertyName;
        updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;
        createTypeParameterDeclaration(name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
        updateTypeParameterDeclaration(node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
        createParameterDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
        updateParameterDeclaration(node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
        createDecorator(expression: Expression): Decorator;
        updateDecorator(node: Decorator, expression: Expression): Decorator;
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
        updateIndexSignature(node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
        createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
        updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
        createClassStaticBlockDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, body: Block): ClassStaticBlockDeclaration;
        createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind>;
        createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode;
        updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode;
        createTypeReferenceNode(typeName: string | EntityName, typeArguments?: readonly TypeNode[]): TypeReferenceNode;
        updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
        createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode;
        updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): FunctionTypeNode;
        createConstructorTypeNode(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        /** @deprecated */
        createConstructorTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
        updateConstructorTypeNode(node: ConstructorTypeNode, modifiers: readonly Modifier[] | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
        /** @deprecated */
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
        createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
        updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
        createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode;
        updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]): LiteralTypeNode;
        createTemplateLiteralType(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
        updateTemplateLiteralType(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
        createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern;
        updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern;
        createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
        createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
        updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;
        createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression;
        updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression;
        createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
        updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression;
        createPropertyAccessExpression(expression: Expression, name: string | MemberName): PropertyAccessExpression;
        updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: MemberName): PropertyAccessExpression;
        createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | MemberName): PropertyAccessChain;
        updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: MemberName): PropertyAccessChain;
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
        createYieldExpression(asteriskToken: AsteriskToken, expression: Expression): YieldExpression;
        createYieldExpression(asteriskToken: undefined, expression: Expression | undefined): YieldExpression;
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
        createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
        createSemicolonClassElement(): SemicolonClassElement;
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
        createImportEqualsDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        updateImportEqualsDeclaration(node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
        createImportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause): ImportDeclaration;
        updateImportDeclaration(node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined): ImportDeclaration;
        createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
        createAssertClause(elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
        updateAssertClause(node: AssertClause, elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
        createAssertEntry(name: AssertionKey, value: Expression): AssertEntry;
        updateAssertEntry(node: AssertEntry, name: AssertionKey, value: Expression): AssertEntry;
        createNamespaceImport(name: Identifier): NamespaceImport;
        updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport;
        createNamespaceExport(name: Identifier): NamespaceExport;
        updateNamespaceExport(node: NamespaceExport, name: Identifier): NamespaceExport;
        createNamedImports(elements: readonly ImportSpecifier[]): NamedImports;
        updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports;
        createImportSpecifier(isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        updateImportSpecifier(node: ImportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ImportSpecifier;
        createExportAssignment(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
        updateExportAssignment(node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression): ExportAssignment;
        createExportDeclaration(decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, assertClause?: AssertClause): ExportDeclaration;
        updateExportDeclaration(node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, assertClause: AssertClause | undefined): ExportDeclaration;
        createNamedExports(elements: readonly ExportSpecifier[]): NamedExports;
        updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports;
        createExportSpecifier(isTypeOnly: boolean, propertyName: string | Identifier | undefined, name: string | Identifier): ExportSpecifier;
        updateExportSpecifier(node: ExportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier): ExportSpecifier;
        createExternalModuleReference(expression: Expression): ExternalModuleReference;
        updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference;
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
        createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference;
        updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference;
        createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
        updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
        createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
        updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
        createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
        updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
        createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
        updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
        createJSDocTypeLiteral(jsDocPropertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral;
        updateJSDocTypeLiteral(node: JSDocTypeLiteral, jsDocPropertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean | undefined): JSDocTypeLiteral;
        createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature;
        updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature;
        createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag;
        updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | NodeArray<JSDocComment> | undefined): JSDocTemplateTag;
        createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | JSDocTypeLiteral, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag;
        updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypedefTag;
        createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag;
        updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocParameterTag;
        createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag;
        updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocPropertyTag;
        createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag;
        updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypeTag;
        createJSDocSeeTag(tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
        updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
        createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag;
        updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReturnTag;
        createJSDocThisTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag;
        updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocThisTag;
        createJSDocEnumTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocEnumTag;
        updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocEnumTag;
        createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag;
        updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocCallbackTag;
        createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag;
        updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocAugmentsTag;
        createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag;
        updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocImplementsTag;
        createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocAuthorTag;
        updateJSDocAuthorTag(node: JSDocAuthorTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocAuthorTag;
        createJSDocClassTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocClassTag;
        updateJSDocClassTag(node: JSDocClassTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocClassTag;
        createJSDocPublicTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag;
        updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPublicTag;
        createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag;
        updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPrivateTag;
        createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag;
        updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocProtectedTag;
        createJSDocReadonlyTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocReadonlyTag;
        updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReadonlyTag;
        createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag;
        updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined): JSDocUnknownTag;
        createJSDocDeprecatedTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
        updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
        createJSDocOverrideTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
        updateJSDocOverrideTag(node: JSDocOverrideTag, tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
        createJSDocText(text: string): JSDocText;
        updateJSDocText(node: JSDocText, text: string): JSDocText;
        createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc;
        updateJSDocComment(node: JSDoc, comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined): JSDoc;
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
        createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
        updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause;
        createDefaultClause(statements: readonly Statement[]): DefaultClause;
        updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause;
        createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause;
        createCatchClause(variableDeclaration: string | BindingName | VariableDeclaration | undefined, block: Block): CatchClause;
        updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause;
        createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;
        updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment;
        createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment;
        updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment;
        createSpreadAssignment(expression: Expression): SpreadAssignment;
        updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment;
        createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember;
        updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember;
        createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
        updateSourceFile(node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean, referencedFiles?: readonly FileReference[], typeReferences?: readonly FileReference[], hasNoDefaultLib?: boolean, libReferences?: readonly FileReference[]): SourceFile;
        createNotEmittedStatement(original: Node): NotEmittedStatement;
        createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression;
        updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression;
        createCommaListExpression(elements: readonly Expression[]): CommaListExpression;
        updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression;
        createBundle(sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;
        updateBundle(node: Bundle, sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[]): Bundle;
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
        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): CallExpression;
        createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
        createVoidZero(): VoidExpression;
        createExportDefault(expression: Expression): ExportAssignment;
        createExternalModuleExport(exportName: Identifier): ExportDeclaration;
        restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds?: OuterExpressionKinds): Expression;
    }
    export interface CoreTransformationContext {
        readonly factory: NodeFactory;
        /** Gets the compiler options supplied to the transformer. */
        getCompilerOptions(): CompilerOptions;
        /** Starts a new lexical environment. */
        startLexicalEnvironment(): void;
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
    }
    export interface TransformationContext extends CoreTransformationContext {
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
        <T extends Node>(nodes: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T;
        <T extends Node>(nodes: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined;
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
        onEmitNode?(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
        /**
         * A hook used to check if an emit notification is required for a node.
         * @param node The node to emit.
         */
        isEmitNotificationEnabled?(node: Node): boolean;
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
    }
    export interface PrinterOptions {
        removeComments?: boolean;
        newLine?: NewLineKind;
        omitTrailingSemicolon?: boolean;
        noEmitHelpers?: boolean;
    }
    export interface GetEffectiveTypeRootsHost {
        directoryExists?(directoryName: string): boolean;
        getCurrentDirectory?(): string;
    }
    export interface TextSpan {
        start: number;
        length: number;
    }
    export interface TextChangeRange {
        span: TextSpan;
        newLength: number;
    }
    export interface SyntaxList extends Node {
        kind: SyntaxKind.SyntaxList;
        _children: Node[];
    }
    export enum ListFormat {
        None = 0,
        SingleLine = 0,
        MultiLine = 1,
        PreserveLines = 2,
        LinesMask = 3,
        NotDelimited = 0,
        BarDelimited = 4,
        AmpersandDelimited = 8,
        CommaDelimited = 16,
        AsteriskDelimited = 32,
        DelimitersMask = 60,
        AllowTrailingComma = 64,
        Indented = 128,
        SpaceBetweenBraces = 256,
        SpaceBetweenSiblings = 512,
        Braces = 1024,
        Parenthesis = 2048,
        AngleBrackets = 4096,
        SquareBrackets = 8192,
        BracketsMask = 15360,
        OptionalIfUndefined = 16384,
        OptionalIfEmpty = 32768,
        Optional = 49152,
        PreferNewLine = 65536,
        NoTrailingNewLine = 131072,
        NoInterveningComments = 262144,
        NoSpaceIfEmpty = 524288,
        SingleElement = 1048576,
        SpaceAfterList = 2097152,
        Modifiers = 262656,
        HeritageClauses = 512,
        SingleLineTypeLiteralMembers = 768,
        MultiLineTypeLiteralMembers = 32897,
        SingleLineTupleTypeElements = 528,
        MultiLineTupleTypeElements = 657,
        UnionTypeConstituents = 516,
        IntersectionTypeConstituents = 520,
        ObjectBindingPatternElements = 525136,
        ArrayBindingPatternElements = 524880,
        ObjectLiteralExpressionProperties = 526226,
        ImportClauseEntries = 526226,
        ArrayLiteralExpressionElements = 8914,
        CommaListElements = 528,
        CallExpressionArguments = 2576,
        NewExpressionArguments = 18960,
        TemplateExpressionSpans = 262144,
        SingleLineBlockStatements = 768,
        MultiLineBlockStatements = 129,
        VariableDeclarationList = 528,
        SingleLineFunctionBodyStatements = 768,
        MultiLineFunctionBodyStatements = 1,
        ClassHeritageClauses = 0,
        ClassMembers = 129,
        InterfaceMembers = 129,
        EnumMembers = 145,
        CaseBlockClauses = 129,
        NamedImportsOrExportsElements = 525136,
        JsxElementOrFragmentChildren = 262144,
        JsxElementAttributes = 262656,
        CaseOrDefaultClauseStatements = 163969,
        HeritageClauseTypes = 528,
        SourceFileStatements = 131073,
        Decorators = 2146305,
        TypeArguments = 53776,
        TypeParameters = 53776,
        Parameters = 2576,
        IndexSignatureParameters = 8848,
        JSDocComment = 33
    }
    export interface UserPreferences {
        readonly disableSuggestions?: boolean;
        readonly quotePreference?: "auto" | "double" | "single";
        readonly includeCompletionsForModuleExports?: boolean;
        readonly includeCompletionsForImportStatements?: boolean;
        readonly includeCompletionsWithSnippetText?: boolean;
        readonly includeAutomaticOptionalChainCompletions?: boolean;
        readonly includeCompletionsWithInsertText?: boolean;
        readonly includeCompletionsWithClassMemberSnippets?: boolean;
        readonly allowIncompleteCompletions?: boolean;
        readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
        /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
        readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
        readonly allowTextChangesInNewFiles?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
        readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
        readonly provideRefactorNotApplicableReason?: boolean;
        readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
    }
    /** Represents a bigint literal value without requiring bigint support */
    export interface PseudoBigInt {
        negative: boolean;
        base10Value: string;
    }
    export {};
}
declare function setTimeout(handler: (...args: any[]) => void, timeout: number): any;
declare function clearTimeout(handle: any): void;
declare namespace ts {
    export enum FileWatcherEventKind {
        Created = 0,
        Changed = 1,
        Deleted = 2
    }
    export type FileWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind) => void;
    export type DirectoryWatcherCallback = (fileName: string) => void;
    export interface System {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;
        write(s: string): void;
        writeOutputIsTTY?(): boolean;
        getWidthOfTerminal?(): number;
        readFile(path: string, encoding?: string): string | undefined;
        getFileSize?(path: string): number;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        /**
         * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
         * use native OS file watching
         */
        watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
        watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
        resolvePath(path: string): string;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getExecutingFilePath(): string;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        getModifiedTime?(path: string): Date | undefined;
        setModifiedTime?(path: string, time: Date): void;
        deleteFile?(path: string): void;
        /**
         * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
         */
        createHash?(data: string): string;
        /** This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`. */
        createSHA256Hash?(data: string): string;
        getMemoryUsage?(): number;
        exit(exitCode?: number): void;
        realpath?(path: string): string;
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        clearTimeout?(timeoutId: any): void;
        clearScreen?(): void;
        base64decode?(input: string): string;
        base64encode?(input: string): string;
    }
    export interface FileWatcher {
        close(): void;
    }
    export function getNodeMajorVersion(): number | undefined;
    export let sys: System;
    export {};
}
declare namespace ts {
    type ErrorCallback = (message: DiagnosticMessage, length: number) => void;
    interface Scanner {
        getStartPos(): number;
        getToken(): SyntaxKind;
        getTextPos(): number;
        getTokenPos(): number;
        getTokenText(): string;
        getTokenValue(): string;
        hasUnicodeEscape(): boolean;
        hasExtendedUnicodeEscape(): boolean;
        hasPrecedingLineBreak(): boolean;
        isIdentifier(): boolean;
        isReservedWord(): boolean;
        isUnterminated(): boolean;
        reScanGreaterToken(): SyntaxKind;
        reScanSlashToken(): SyntaxKind;
        reScanAsteriskEqualsToken(): SyntaxKind;
        reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind;
        reScanTemplateHeadOrNoSubstitutionTemplate(): SyntaxKind;
        scanJsxIdentifier(): SyntaxKind;
        scanJsxAttributeValue(): SyntaxKind;
        reScanJsxAttributeValue(): SyntaxKind;
        reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind;
        reScanLessThanToken(): SyntaxKind;
        reScanHashToken(): SyntaxKind;
        reScanQuestionToken(): SyntaxKind;
        reScanInvalidIdentifier(): SyntaxKind;
        scanJsxToken(): JsxTokenSyntaxKind;
        scanJsDocToken(): JSDocSyntaxKind;
        scan(): SyntaxKind;
        getText(): string;
        setText(text: string | undefined, start?: number, length?: number): void;
        setOnError(onError: ErrorCallback | undefined): void;
        setScriptTarget(scriptTarget: ScriptTarget): void;
        setLanguageVariant(variant: LanguageVariant): void;
        setTextPos(textPos: number): void;
        lookAhead<T>(callback: () => T): T;
        scanRange<T>(start: number, length: number, callback: () => T): T;
        tryScan<T>(callback: () => T): T;
    }
    function tokenToString(t: SyntaxKind): string | undefined;
    function getPositionOfLineAndCharacter(sourceFile: SourceFileLike, line: number, character: number): number;
    function getLineAndCharacterOfPosition(sourceFile: SourceFileLike, position: number): LineAndCharacter;
    function isWhiteSpaceLike(ch: number): boolean;
    /** Does not include line breaks. For that, see isWhiteSpaceLike. */
    function isWhiteSpaceSingleLine(ch: number): boolean;
    function isLineBreak(ch: number): boolean;
    function couldStartTrivia(text: string, pos: number): boolean;
    function forEachLeadingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
    function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
    function forEachTrailingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
    function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
    function reduceEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U | undefined;
    function reduceEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U) => U, state: T, initial: U): U | undefined;
    function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    function getTrailingCommentRanges(text: string, pos: number): CommentRange[] | undefined;
    /** Optionally, get the shebang */
    function getShebang(text: string): string | undefined;
    function isIdentifierStart(ch: number, languageVersion: ScriptTarget | undefined): boolean;
    function isIdentifierPart(ch: number, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean;
    function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, languageVariant?: LanguageVariant, textInitial?: string, onError?: ErrorCallback, start?: number, length?: number): Scanner;
}
declare namespace ts {
    function isExternalModuleNameRelative(moduleName: string): boolean;
    function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): SortedReadonlyArray<T>;
    function getDefaultLibFileName(options: CompilerOptions): string;
    function textSpanEnd(span: TextSpan): number;
    function textSpanIsEmpty(span: TextSpan): boolean;
    function textSpanContainsPosition(span: TextSpan, position: number): boolean;
    function textSpanContainsTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlapsWith(span: TextSpan, other: TextSpan): boolean;
    function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan | undefined;
    function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan): boolean;
    function textSpanIntersectsWith(span: TextSpan, start: number, length: number): boolean;
    function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number): boolean;
    function textSpanIntersectsWithPosition(span: TextSpan, position: number): boolean;
    function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan | undefined;
    function createTextSpan(start: number, length: number): TextSpan;
    function createTextSpanFromBounds(start: number, end: number): TextSpan;
    function textChangeRangeNewSpan(range: TextChangeRange): TextSpan;
    function textChangeRangeIsUnchanged(range: TextChangeRange): boolean;
    function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange;
    let unchangedTextChangeRange: TextChangeRange;
    /**
     * Called to merge all the changes that occurred across several versions of a script snapshot
     * into a single change.  i.e. if a user keeps making successive edits to a script we will
     * have a text change from V1 to V2, V2 to V3, ..., Vn.
     *
     * This function will then merge those changes into a single change range valid between V1 and
     * Vn.
     */
    function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly TextChangeRange[]): TextChangeRange;
    function getTypeParameterOwner(d: Declaration): Declaration | undefined;
    type ParameterPropertyDeclaration = ParameterDeclaration & {
        parent: ConstructorDeclaration;
        name: Identifier;
    };
    function isParameterPropertyDeclaration(node: Node, parent: Node): node is ParameterPropertyDeclaration;
    function isEmptyBindingPattern(node: BindingName): node is BindingPattern;
    function isEmptyBindingElement(node: BindingElement): boolean;
    function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration;
    function getCombinedModifierFlags(node: Declaration): ModifierFlags;
    function getCombinedNodeFlags(node: Node): NodeFlags;
    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    function validateLocaleAndSetLanguage(locale: string, sys: {
        getExecutingFilePath(): string;
        resolvePath(path: string): string;
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string | undefined;
    }, errors?: Push<Diagnostic>): void;
    function getOriginalNode(node: Node): Node;
    function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
    function getOriginalNode(node: Node | undefined): Node | undefined;
    function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node | undefined) => node is T): T | undefined;
    /**
     * Iterates through the parent chain of a node and performs the callback on each parent until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
     * At that point findAncestor returns undefined.
     */
    function findAncestor<T extends Node>(node: Node | undefined, callback: (element: Node) => element is T): T | undefined;
    function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined;
    /**
     * Gets a value indicating whether a node originated in the parse tree.
     *
     * @param node The node to test.
     */
    function isParseTreeNode(node: Node): boolean;
    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    function getParseTreeNode(node: Node | undefined): Node | undefined;
    /**
     * Gets the original parse tree node for a node.
     *
     * @param node The original node.
     * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
     * @returns The original parse tree node if found; otherwise, undefined.
     */
    function getParseTreeNode<T extends Node>(node: T | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
    /** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
    function escapeLeadingUnderscores(identifier: string): __String;
    /**
     * Remove extra underscore from escaped identifier text content.
     *
     * @param identifier The escaped identifier text.
     * @returns The unescaped identifier text.
     */
    function unescapeLeadingUnderscores(identifier: __String): string;
    function idText(identifierOrPrivateName: Identifier | PrivateIdentifier): string;
    function symbolName(symbol: Symbol): string;
    function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | PrivateIdentifier | undefined;
    function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined;
    /**
     * Gets the JSDoc parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc param tag whose name matches the provided
     * parameter, whether a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the param
     * tag on the containing function expression would be first.
     *
     * For binding patterns, parameter tags are matched by position.
     */
    function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[];
    /**
     * Gets the JSDoc type parameter tags for the node if present.
     *
     * @remarks Returns any JSDoc template tag whose names match the provided
     * parameter, whether a template tag on a containing function
     * expression, or a template tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are returned first, so in the previous example, the template
     * tag on the containing function expression would be first.
     */
    function getJSDocTypeParameterTags(param: TypeParameterDeclaration): readonly JSDocTemplateTag[];
    /**
     * Return true if the node has JSDoc parameter tags.
     *
     * @remarks Includes parameter tags that are not directly on the node,
     * for example on a variable declaration whose initializer is a function expression.
     */
    function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean;
    /** Gets the JSDoc augments tag for the node if present */
    function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag | undefined;
    /** Gets the JSDoc implements tags for the node if present */
    function getJSDocImplementsTags(node: Node): readonly JSDocImplementsTag[];
    /** Gets the JSDoc class tag for the node if present */
    function getJSDocClassTag(node: Node): JSDocClassTag | undefined;
    /** Gets the JSDoc public tag for the node if present */
    function getJSDocPublicTag(node: Node): JSDocPublicTag | undefined;
    /** Gets the JSDoc private tag for the node if present */
    function getJSDocPrivateTag(node: Node): JSDocPrivateTag | undefined;
    /** Gets the JSDoc protected tag for the node if present */
    function getJSDocProtectedTag(node: Node): JSDocProtectedTag | undefined;
    /** Gets the JSDoc protected tag for the node if present */
    function getJSDocReadonlyTag(node: Node): JSDocReadonlyTag | undefined;
    function getJSDocOverrideTagNoCache(node: Node): JSDocOverrideTag | undefined;
    /** Gets the JSDoc deprecated tag for the node if present */
    function getJSDocDeprecatedTag(node: Node): JSDocDeprecatedTag | undefined;
    /** Gets the JSDoc enum tag for the node if present */
    function getJSDocEnumTag(node: Node): JSDocEnumTag | undefined;
    /** Gets the JSDoc this tag for the node if present */
    function getJSDocThisTag(node: Node): JSDocThisTag | undefined;
    /** Gets the JSDoc return tag for the node if present */
    function getJSDocReturnTag(node: Node): JSDocReturnTag | undefined;
    /** Gets the JSDoc template tag for the node if present */
    function getJSDocTemplateTag(node: Node): JSDocTemplateTag | undefined;
    /** Gets the JSDoc type tag for the node if present and valid */
    function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined;
    /**
     * Gets the type node for the node if provided via JSDoc.
     *
     * @remarks The search includes any JSDoc param tag that relates
     * to the provided parameter, for example a type tag on the
     * parameter itself, or a param tag on a containing function
     * expression, or a param tag on a variable declaration whose
     * initializer is the containing function. The tags closest to the
     * node are examined first, so in the previous example, the type
     * tag directly on the node would be returned.
     */
    function getJSDocType(node: Node): TypeNode | undefined;
    /**
     * Gets the return type node for the node if provided via JSDoc return tag or type tag.
     *
     * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
     * gets the type from inside the braces, after the fat arrow, etc.
     */
    function getJSDocReturnType(node: Node): TypeNode | undefined;
    /** Get all JSDoc tags related to a node, including those on parent nodes. */
    function getJSDocTags(node: Node): readonly JSDocTag[];
    /** Gets all JSDoc tags that match a specified predicate */
    function getAllJSDocTags<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T): readonly T[];
    /** Gets all JSDoc tags of a specified kind */
    function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): readonly JSDocTag[];
    /** Gets the text of a jsdoc comment, flattening links to their text. */
    function getTextOfJSDocComment(comment?: string | NodeArray<JSDocComment>): string | undefined;
    /**
     * Gets the effective type parameters. If the node was parsed in a
     * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
     */
    function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[];
    function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined;
    function isMemberName(node: Node): node is MemberName;
    function isPropertyAccessChain(node: Node): node is PropertyAccessChain;
    function isElementAccessChain(node: Node): node is ElementAccessChain;
    function isCallChain(node: Node): node is CallChain;
    function isOptionalChain(node: Node): node is PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain;
    function isNullishCoalesce(node: Node): boolean;
    function isConstTypeReference(node: Node): boolean;
    function skipPartiallyEmittedExpressions(node: Expression): Expression;
    function skipPartiallyEmittedExpressions(node: Node): Node;
    function isNonNullChain(node: Node): node is NonNullChain;
    function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement;
    function isNamedExportBindings(node: Node): node is NamedExportBindings;
    function isUnparsedTextLike(node: Node): node is UnparsedTextLike;
    function isUnparsedNode(node: Node): node is UnparsedNode;
    function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag;
    /**
     * True if kind is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    function isTokenKind(kind: SyntaxKind): boolean;
    /**
     * True if node is of some token syntax kind.
     * For example, this is true for an IfKeyword but not for an IfStatement.
     * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
     */
    function isToken(n: Node): boolean;
    function isLiteralExpression(node: Node): node is LiteralExpression;
    function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken;
    function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail;
    function isImportOrExportSpecifier(node: Node): node is ImportSpecifier | ExportSpecifier;
    function isTypeOnlyImportOrExportDeclaration(node: Node): node is TypeOnlyAliasDeclaration;
    function isAssertionKey(node: Node): node is AssertionKey;
    function isStringTextContainingNode(node: Node): node is StringLiteral | TemplateLiteralToken;
    function isModifier(node: Node): node is Modifier;
    function isEntityName(node: Node): node is EntityName;
    function isPropertyName(node: Node): node is PropertyName;
    function isBindingName(node: Node): node is BindingName;
    function isFunctionLike(node: Node | undefined): node is SignatureDeclaration;
    function isClassElement(node: Node): node is ClassElement;
    function isClassLike(node: Node): node is ClassLikeDeclaration;
    function isAccessor(node: Node): node is AccessorDeclaration;
    function isTypeElement(node: Node): node is TypeElement;
    function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement;
    function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike;
    /**
     * Node test that determines whether a node is a valid type node.
     * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
     * of a TypeNode.
     */
    function isTypeNode(node: Node): node is TypeNode;
    function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode;
    function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName;
    function isCallLikeExpression(node: Node): node is CallLikeExpression;
    function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression;
    function isTemplateLiteral(node: Node): node is TemplateLiteral;
    function isAssertionExpression(node: Node): node is AssertionExpression;
    function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
    function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement | LabeledStatement;
    function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement;
    function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause;
    /** True if node is of a kind that may contain comment text. */
    function isJSDocCommentContainingNode(node: Node): boolean;
    function isSetAccessor(node: Node): node is SetAccessorDeclaration;
    function isGetAccessor(node: Node): node is GetAccessorDeclaration;
    /** True if has initializer node attached to it. */
    function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer;
    function isObjectLiteralElement(node: Node): node is ObjectLiteralElement;
    function isStringLiteralLike(node: Node): node is StringLiteralLike;
    function isJSDocLinkLike(node: Node): node is JSDocLink | JSDocLinkCode | JSDocLinkPlain;
}
declare namespace ts {
    const factory: NodeFactory;
    function createUnparsedSourceFile(text: string): UnparsedSource;
    function createUnparsedSourceFile(inputFile: InputFiles, type: "js" | "dts", stripInternal?: boolean): UnparsedSource;
    function createUnparsedSourceFile(text: string, mapPath: string | undefined, map: string | undefined): UnparsedSource;
    function createInputFiles(javascriptText: string, declarationText: string): InputFiles;
    function createInputFiles(readFileText: (path: string) => string | undefined, javascriptPath: string, javascriptMapPath: string | undefined, declarationPath: string, declarationMapPath: string | undefined, buildInfoPath: string | undefined): InputFiles;
    function createInputFiles(javascriptText: string, declarationText: string, javascriptMapPath: string | undefined, javascriptMapText: string | undefined, declarationMapPath: string | undefined, declarationMapText: string | undefined): InputFiles;
    /**
     * Create an external source map source file reference
     */
    function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource;
    function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T;
}
declare namespace ts {
    /**
     * Clears any `EmitNode` entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    function disposeEmitNodes(sourceFile: SourceFile | undefined): void;
    /**
     * Sets flags that control emit behavior of a node.
     */
    function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags): T;
    /**
     * Gets a custom text range to use when emitting source maps.
     */
    function getSourceMapRange(node: Node): SourceMapRange;
    /**
     * Sets a custom text range to use when emitting source maps.
     */
    function setSourceMapRange<T extends Node>(node: T, range: SourceMapRange | undefined): T;
    /**
     * Gets the TextRange to use for source maps for a token of a node.
     */
    function getTokenSourceMapRange(node: Node, token: SyntaxKind): SourceMapRange | undefined;
    /**
     * Sets the TextRange to use for source maps for a token of a node.
     */
    function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: SourceMapRange | undefined): T;
    /**
     * Gets a custom text range to use when emitting comments.
     */
    function getCommentRange(node: Node): TextRange;
    /**
     * Sets a custom text range to use when emitting comments.
     */
    function setCommentRange<T extends Node>(node: T, range: TextRange): T;
    function getSyntheticLeadingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticLeadingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined): T;
    function addSyntheticLeadingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function getSyntheticTrailingComments(node: Node): SynthesizedComment[] | undefined;
    function setSyntheticTrailingComments<T extends Node>(node: T, comments: SynthesizedComment[] | undefined): T;
    function addSyntheticTrailingComment<T extends Node>(node: T, kind: SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia, text: string, hasTrailingNewLine?: boolean): T;
    function moveSyntheticComments<T extends Node>(node: T, original: Node): T;
    /**
     * Gets the constant value to emit for an expression representing an enum.
     */
    function getConstantValue(node: AccessExpression): string | number | undefined;
    /**
     * Sets the constant value to emit for an expression.
     */
    function setConstantValue(node: AccessExpression, value: string | number): AccessExpression;
    /**
     * Adds an EmitHelper to a node.
     */
    function addEmitHelper<T extends Node>(node: T, helper: EmitHelper): T;
    /**
     * Add EmitHelpers to a node.
     */
    function addEmitHelpers<T extends Node>(node: T, helpers: EmitHelper[] | undefined): T;
    /**
     * Removes an EmitHelper from a node.
     */
    function removeEmitHelper(node: Node, helper: EmitHelper): boolean;
    /**
     * Gets the EmitHelpers of a node.
     */
    function getEmitHelpers(node: Node): EmitHelper[] | undefined;
    /**
     * Moves matching emit helpers from a source node to a target node.
     */
    function moveEmitHelpers(source: Node, target: Node, predicate: (helper: EmitHelper) => boolean): void;
}
declare namespace ts {
    function isNumericLiteral(node: Node): node is NumericLiteral;
    function isBigIntLiteral(node: Node): node is BigIntLiteral;
    function isStringLiteral(node: Node): node is StringLiteral;
    function isJsxText(node: Node): node is JsxText;
    function isRegularExpressionLiteral(node: Node): node is RegularExpressionLiteral;
    function isNoSubstitutionTemplateLiteral(node: Node): node is NoSubstitutionTemplateLiteral;
    function isTemplateHead(node: Node): node is TemplateHead;
    function isTemplateMiddle(node: Node): node is TemplateMiddle;
    function isTemplateTail(node: Node): node is TemplateTail;
    function isDotDotDotToken(node: Node): node is DotDotDotToken;
    function isPlusToken(node: Node): node is PlusToken;
    function isMinusToken(node: Node): node is MinusToken;
    function isAsteriskToken(node: Node): node is AsteriskToken;
    function isIdentifier(node: Node): node is Identifier;
    function isPrivateIdentifier(node: Node): node is PrivateIdentifier;
    function isQualifiedName(node: Node): node is QualifiedName;
    function isComputedPropertyName(node: Node): node is ComputedPropertyName;
    function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration;
    function isParameter(node: Node): node is ParameterDeclaration;
    function isDecorator(node: Node): node is Decorator;
    function isPropertySignature(node: Node): node is PropertySignature;
    function isPropertyDeclaration(node: Node): node is PropertyDeclaration;
    function isMethodSignature(node: Node): node is MethodSignature;
    function isMethodDeclaration(node: Node): node is MethodDeclaration;
    function isClassStaticBlockDeclaration(node: Node): node is ClassStaticBlockDeclaration;
    function isConstructorDeclaration(node: Node): node is ConstructorDeclaration;
    function isGetAccessorDeclaration(node: Node): node is GetAccessorDeclaration;
    function isSetAccessorDeclaration(node: Node): node is SetAccessorDeclaration;
    function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration;
    function isConstructSignatureDeclaration(node: Node): node is ConstructSignatureDeclaration;
    function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration;
    function isTypePredicateNode(node: Node): node is TypePredicateNode;
    function isTypeReferenceNode(node: Node): node is TypeReferenceNode;
    function isFunctionTypeNode(node: Node): node is FunctionTypeNode;
    function isConstructorTypeNode(node: Node): node is ConstructorTypeNode;
    function isTypeQueryNode(node: Node): node is TypeQueryNode;
    function isTypeLiteralNode(node: Node): node is TypeLiteralNode;
    function isArrayTypeNode(node: Node): node is ArrayTypeNode;
    function isTupleTypeNode(node: Node): node is TupleTypeNode;
    function isNamedTupleMember(node: Node): node is NamedTupleMember;
    function isOptionalTypeNode(node: Node): node is OptionalTypeNode;
    function isRestTypeNode(node: Node): node is RestTypeNode;
    function isUnionTypeNode(node: Node): node is UnionTypeNode;
    function isIntersectionTypeNode(node: Node): node is IntersectionTypeNode;
    function isConditionalTypeNode(node: Node): node is ConditionalTypeNode;
    function isInferTypeNode(node: Node): node is InferTypeNode;
    function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode;
    function isThisTypeNode(node: Node): node is ThisTypeNode;
    function isTypeOperatorNode(node: Node): node is TypeOperatorNode;
    function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode;
    function isMappedTypeNode(node: Node): node is MappedTypeNode;
    function isLiteralTypeNode(node: Node): node is LiteralTypeNode;
    function isImportTypeNode(node: Node): node is ImportTypeNode;
    function isTemplateLiteralTypeSpan(node: Node): node is TemplateLiteralTypeSpan;
    function isTemplateLiteralTypeNode(node: Node): node is TemplateLiteralTypeNode;
    function isObjectBindingPattern(node: Node): node is ObjectBindingPattern;
    function isArrayBindingPattern(node: Node): node is ArrayBindingPattern;
    function isBindingElement(node: Node): node is BindingElement;
    function isArrayLiteralExpression(node: Node): node is ArrayLiteralExpression;
    function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression;
    function isPropertyAccessExpression(node: Node): node is PropertyAccessExpression;
    function isElementAccessExpression(node: Node): node is ElementAccessExpression;
    function isCallExpression(node: Node): node is CallExpression;
    function isNewExpression(node: Node): node is NewExpression;
    function isTaggedTemplateExpression(node: Node): node is TaggedTemplateExpression;
    function isTypeAssertionExpression(node: Node): node is TypeAssertion;
    function isParenthesizedExpression(node: Node): node is ParenthesizedExpression;
    function isFunctionExpression(node: Node): node is FunctionExpression;
    function isArrowFunction(node: Node): node is ArrowFunction;
    function isDeleteExpression(node: Node): node is DeleteExpression;
    function isTypeOfExpression(node: Node): node is TypeOfExpression;
    function isVoidExpression(node: Node): node is VoidExpression;
    function isAwaitExpression(node: Node): node is AwaitExpression;
    function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression;
    function isPostfixUnaryExpression(node: Node): node is PostfixUnaryExpression;
    function isBinaryExpression(node: Node): node is BinaryExpression;
    function isConditionalExpression(node: Node): node is ConditionalExpression;
    function isTemplateExpression(node: Node): node is TemplateExpression;
    function isYieldExpression(node: Node): node is YieldExpression;
    function isSpreadElement(node: Node): node is SpreadElement;
    function isClassExpression(node: Node): node is ClassExpression;
    function isOmittedExpression(node: Node): node is OmittedExpression;
    function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments;
    function isAsExpression(node: Node): node is AsExpression;
    function isNonNullExpression(node: Node): node is NonNullExpression;
    function isMetaProperty(node: Node): node is MetaProperty;
    function isSyntheticExpression(node: Node): node is SyntheticExpression;
    function isPartiallyEmittedExpression(node: Node): node is PartiallyEmittedExpression;
    function isCommaListExpression(node: Node): node is CommaListExpression;
    function isTemplateSpan(node: Node): node is TemplateSpan;
    function isSemicolonClassElement(node: Node): node is SemicolonClassElement;
    function isBlock(node: Node): node is Block;
    function isVariableStatement(node: Node): node is VariableStatement;
    function isEmptyStatement(node: Node): node is EmptyStatement;
    function isExpressionStatement(node: Node): node is ExpressionStatement;
    function isIfStatement(node: Node): node is IfStatement;
    function isDoStatement(node: Node): node is DoStatement;
    function isWhileStatement(node: Node): node is WhileStatement;
    function isForStatement(node: Node): node is ForStatement;
    function isForInStatement(node: Node): node is ForInStatement;
    function isForOfStatement(node: Node): node is ForOfStatement;
    function isContinueStatement(node: Node): node is ContinueStatement;
    function isBreakStatement(node: Node): node is BreakStatement;
    function isReturnStatement(node: Node): node is ReturnStatement;
    function isWithStatement(node: Node): node is WithStatement;
    function isSwitchStatement(node: Node): node is SwitchStatement;
    function isLabeledStatement(node: Node): node is LabeledStatement;
    function isThrowStatement(node: Node): node is ThrowStatement;
    function isTryStatement(node: Node): node is TryStatement;
    function isDebuggerStatement(node: Node): node is DebuggerStatement;
    function isVariableDeclaration(node: Node): node is VariableDeclaration;
    function isVariableDeclarationList(node: Node): node is VariableDeclarationList;
    function isFunctionDeclaration(node: Node): node is FunctionDeclaration;
    function isClassDeclaration(node: Node): node is ClassDeclaration;
    function isInterfaceDeclaration(node: Node): node is InterfaceDeclaration;
    function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration;
    function isEnumDeclaration(node: Node): node is EnumDeclaration;
    function isModuleDeclaration(node: Node): node is ModuleDeclaration;
    function isModuleBlock(node: Node): node is ModuleBlock;
    function isCaseBlock(node: Node): node is CaseBlock;
    function isNamespaceExportDeclaration(node: Node): node is NamespaceExportDeclaration;
    function isImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration;
    function isImportDeclaration(node: Node): node is ImportDeclaration;
    function isImportClause(node: Node): node is ImportClause;
    function isAssertClause(node: Node): node is AssertClause;
    function isAssertEntry(node: Node): node is AssertEntry;
    function isNamespaceImport(node: Node): node is NamespaceImport;
    function isNamespaceExport(node: Node): node is NamespaceExport;
    function isNamedImports(node: Node): node is NamedImports;
    function isImportSpecifier(node: Node): node is ImportSpecifier;
    function isExportAssignment(node: Node): node is ExportAssignment;
    function isExportDeclaration(node: Node): node is ExportDeclaration;
    function isNamedExports(node: Node): node is NamedExports;
    function isExportSpecifier(node: Node): node is ExportSpecifier;
    function isMissingDeclaration(node: Node): node is MissingDeclaration;
    function isNotEmittedStatement(node: Node): node is NotEmittedStatement;
    function isExternalModuleReference(node: Node): node is ExternalModuleReference;
    function isJsxElement(node: Node): node is JsxElement;
    function isJsxSelfClosingElement(node: Node): node is JsxSelfClosingElement;
    function isJsxOpeningElement(node: Node): node is JsxOpeningElement;
    function isJsxClosingElement(node: Node): node is JsxClosingElement;
    function isJsxFragment(node: Node): node is JsxFragment;
    function isJsxOpeningFragment(node: Node): node is JsxOpeningFragment;
    function isJsxClosingFragment(node: Node): node is JsxClosingFragment;
    function isJsxAttribute(node: Node): node is JsxAttribute;
    function isJsxAttributes(node: Node): node is JsxAttributes;
    function isJsxSpreadAttribute(node: Node): node is JsxSpreadAttribute;
    function isJsxExpression(node: Node): node is JsxExpression;
    function isCaseClause(node: Node): node is CaseClause;
    function isDefaultClause(node: Node): node is DefaultClause;
    function isHeritageClause(node: Node): node is HeritageClause;
    function isCatchClause(node: Node): node is CatchClause;
    function isPropertyAssignment(node: Node): node is PropertyAssignment;
    function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment;
    function isSpreadAssignment(node: Node): node is SpreadAssignment;
    function isEnumMember(node: Node): node is EnumMember;
    function isUnparsedPrepend(node: Node): node is UnparsedPrepend;
    function isSourceFile(node: Node): node is SourceFile;
    function isBundle(node: Node): node is Bundle;
    function isUnparsedSource(node: Node): node is UnparsedSource;
    function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression;
    function isJSDocNameReference(node: Node): node is JSDocNameReference;
    function isJSDocMemberName(node: Node): node is JSDocMemberName;
    function isJSDocLink(node: Node): node is JSDocLink;
    function isJSDocLinkCode(node: Node): node is JSDocLinkCode;
    function isJSDocLinkPlain(node: Node): node is JSDocLinkPlain;
    function isJSDocAllType(node: Node): node is JSDocAllType;
    function isJSDocUnknownType(node: Node): node is JSDocUnknownType;
    function isJSDocNullableType(node: Node): node is JSDocNullableType;
    function isJSDocNonNullableType(node: Node): node is JSDocNonNullableType;
    function isJSDocOptionalType(node: Node): node is JSDocOptionalType;
    function isJSDocFunctionType(node: Node): node is JSDocFunctionType;
    function isJSDocVariadicType(node: Node): node is JSDocVariadicType;
    function isJSDocNamepathType(node: Node): node is JSDocNamepathType;
    function isJSDoc(node: Node): node is JSDoc;
    function isJSDocTypeLiteral(node: Node): node is JSDocTypeLiteral;
    function isJSDocSignature(node: Node): node is JSDocSignature;
    function isJSDocAugmentsTag(node: Node): node is JSDocAugmentsTag;
    function isJSDocAuthorTag(node: Node): node is JSDocAuthorTag;
    function isJSDocClassTag(node: Node): node is JSDocClassTag;
    function isJSDocCallbackTag(node: Node): node is JSDocCallbackTag;
    function isJSDocPublicTag(node: Node): node is JSDocPublicTag;
    function isJSDocPrivateTag(node: Node): node is JSDocPrivateTag;
    function isJSDocProtectedTag(node: Node): node is JSDocProtectedTag;
    function isJSDocReadonlyTag(node: Node): node is JSDocReadonlyTag;
    function isJSDocOverrideTag(node: Node): node is JSDocOverrideTag;
    function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag;
    function isJSDocSeeTag(node: Node): node is JSDocSeeTag;
    function isJSDocEnumTag(node: Node): node is JSDocEnumTag;
    function isJSDocParameterTag(node: Node): node is JSDocParameterTag;
    function isJSDocReturnTag(node: Node): node is JSDocReturnTag;
    function isJSDocThisTag(node: Node): node is JSDocThisTag;
    function isJSDocTypeTag(node: Node): node is JSDocTypeTag;
    function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag;
    function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag;
    function isJSDocUnknownTag(node: Node): node is JSDocUnknownTag;
    function isJSDocPropertyTag(node: Node): node is JSDocPropertyTag;
    function isJSDocImplementsTag(node: Node): node is JSDocImplementsTag;
}
declare namespace ts {
    function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T;
}
declare namespace ts {
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
    export function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
    export function createSourceFile(fileName: string, sourceText: string, languageVersion: ScriptTarget, setParentNodes?: boolean, scriptKind?: ScriptKind): SourceFile;
    export function parseIsolatedEntityName(text: string, languageVersion: ScriptTarget): EntityName | undefined;
    /**
     * Parse json text into SyntaxTree and return node and parse errors if any
     * @param fileName
     * @param sourceText
     */
    export function parseJsonText(fileName: string, sourceText: string): JsonSourceFile;
    export function isExternalModule(file: SourceFile): boolean;
    export function updateSourceFile(sourceFile: SourceFile, newText: string, textChangeRange: TextChangeRange, aggressiveChecks?: boolean): SourceFile;
    export {};
}
declare namespace ts {
    export function parseCommandLine(commandLine: readonly string[], readFile?: (path: string) => string | undefined): ParsedCommandLine;
    export type DiagnosticReporter = (diagnostic: Diagnostic) => void;
    /**
     * Reports config file diagnostics
     */
    export interface ConfigFileDiagnosticsReporter {
        /**
         * Reports unrecoverable error when parsing config file
         */
        onUnRecoverableConfigFileDiagnostic: DiagnosticReporter;
    }
    /**
     * Interface extending ParseConfigHost to support ParseConfigFile that reads config file and reports errors
     */
    export interface ParseConfigFileHost extends ParseConfigHost, ConfigFileDiagnosticsReporter {
        getCurrentDirectory(): string;
    }
    /**
     * Reads the config file, reports errors if any and exits if the config file cannot be found
     */
    export function getParsedCommandLineOfConfigFile(configFileName: string, optionsToExtend: CompilerOptions | undefined, host: ParseConfigFileHost, extendedConfigCache?: Map<ExtendedConfigCacheEntry>, watchOptionsToExtend?: WatchOptions, extraFileExtensions?: readonly FileExtensionInfo[]): ParsedCommandLine | undefined;
    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    export function readConfigFile(fileName: string, readFile: (path: string) => string | undefined): {
        config?: any;
        error?: Diagnostic;
    };
    /**
     * Parse the text of the tsconfig.json file
     * @param fileName The path to the config file
     * @param jsonText The text of the config file
     */
    export function parseConfigFileTextToJson(fileName: string, jsonText: string): {
        config?: any;
        error?: Diagnostic;
    };
    /**
     * Read tsconfig.json file
     * @param fileName The path to the config file
     */
    export function readJsonConfigFile(fileName: string, readFile: (path: string) => string | undefined): TsConfigSourceFile;
    /**
     * Convert the json syntax tree into the json value
     */
    export function convertToObject(sourceFile: JsonSourceFile, errors: Push<Diagnostic>): any;
    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param json The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    export function parseJsonConfigFileContent(json: any, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine;
    /**
     * Parse the contents of a config file (tsconfig.json).
     * @param jsonNode The contents of the config file to parse
     * @param host Instance of ParseConfigHost used to enumerate files in folder.
     * @param basePath A root directory to resolve relative path entries in the config
     *    file to. e.g. outDir
     */
    export function parseJsonSourceFileConfigFileContent(sourceFile: TsConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine;
    export interface ParsedTsconfig {
        raw: any;
        options?: CompilerOptions;
        watchOptions?: WatchOptions;
        typeAcquisition?: TypeAcquisition;
        /**
         * Note that the case of the config path has not yet been normalized, as no files have been imported into the project yet
         */
        extendedConfigPath?: string;
    }
    export interface ExtendedConfigCacheEntry {
        extendedResult: TsConfigSourceFile;
        extendedConfig: ParsedTsconfig | undefined;
    }
    export function convertCompilerOptionsFromJson(jsonOptions: any, basePath: string, configFileName?: string): {
        options: CompilerOptions;
        errors: Diagnostic[];
    };
    export function convertTypeAcquisitionFromJson(jsonOptions: any, basePath: string, configFileName?: string): {
        options: TypeAcquisition;
        errors: Diagnostic[];
    };
    export {};
}
declare namespace ts {
    export function getEffectiveTypeRoots(options: CompilerOptions, host: GetEffectiveTypeRootsHost): string[] | undefined;
    /**
     * @param {string | undefined} containingFile - file that contains type reference directive, can be undefined if containing file is unknown.
     * This is possible in case if resolution is performed for directives specified via 'types' parameter. In this case initial path for secondary lookups
     * is assumed to be the same as root directory of the project.
     */
    export function resolveTypeReferenceDirective(typeReferenceDirectiveName: string, containingFile: string | undefined, options: CompilerOptions, host: ModuleResolutionHost, redirectedReference?: ResolvedProjectReference, cache?: TypeReferenceDirectiveResolutionCache): ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
    /**
     * Given a set of options, returns the set of type directive names
     *   that should be included for this program automatically.
     * This list could either come from the config file,
     *   or from enumerating the types root + initial secondary types lookup location.
     * More type directives might appear in the program later as a result of loading actual source files;
     *   this list is only the set of defaults that are implicitly included.
     */
    export function getAutomaticTypeDirectiveNames(options: CompilerOptions, host: ModuleResolutionHost): string[];
    export interface TypeReferenceDirectiveResolutionCache extends PerDirectoryResolutionCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>, PackageJsonInfoCache {
    }
    export interface ModeAwareCache<T> {
        get(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): T | undefined;
        set(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, value: T): this;
        delete(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): this;
        has(key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined): boolean;
        forEach(cb: (elem: T, key: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined) => void): void;
        size(): number;
    }
    /**
     * Cached resolutions per containing directory.
     * This assumes that any module id will have the same resolution for sibling files located in the same folder.
     */
    export interface PerDirectoryResolutionCache<T> {
        getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): ModeAwareCache<T>;
        clear(): void;
        /**
         *  Updates with the current compilerOptions the cache will operate with.
         *  This updates the redirects map as well if needed so module resolutions are cached if they can across the projects
         */
        update(options: CompilerOptions): void;
    }
    export interface ModuleResolutionCache extends PerDirectoryResolutionCache<ResolvedModuleWithFailedLookupLocations>, NonRelativeModuleNameResolutionCache, PackageJsonInfoCache {
        getPackageJsonInfoCache(): PackageJsonInfoCache;
    }
    /**
     * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
     * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
     */
    export interface NonRelativeModuleNameResolutionCache extends PackageJsonInfoCache {
        getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ModuleKind.CommonJS | ModuleKind.ESNext | undefined, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
    }
    export interface PackageJsonInfoCache {
        clear(): void;
    }
    export interface PerModuleNameCache {
        get(directory: string): ResolvedModuleWithFailedLookupLocations | undefined;
        set(directory: string, result: ResolvedModuleWithFailedLookupLocations): void;
    }
    export function createModuleResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string, options?: CompilerOptions): ModuleResolutionCache;
    export function createTypeReferenceDirectiveResolutionCache(currentDirectory: string, getCanonicalFileName: (s: string) => string, options?: CompilerOptions, packageJsonInfoCache?: PackageJsonInfoCache): TypeReferenceDirectiveResolutionCache;
    export function resolveModuleNameFromCache(moduleName: string, containingFile: string, cache: ModuleResolutionCache, mode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined;
    export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations;
    export function nodeModuleNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
    export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations;
    export {};
}
declare namespace ts {
    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    function visitNode<T extends Node>(node: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T;
    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined;
    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;
    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;
    /**
     * Starts a new lexical environment and visits a statement list, ending the lexical environment
     * and merging hoisted declarations upon completion.
     */
    function visitLexicalEnvironment(statements: NodeArray<Statement>, visitor: Visitor, context: TransformationContext, start?: number, ensureUseStrict?: boolean, nodesVisitor?: NodesVisitor): NodeArray<Statement>;
    /**
     * Starts a new lexical environment and visits a parameter list, suspending the lexical
     * environment upon completion.
     */
    function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration>;
    function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration> | undefined;
    /**
     * Resumes a suspended lexical environment and visits a function body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext): FunctionBody;
    /**
     * Resumes a suspended lexical environment and visits a function body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext): FunctionBody | undefined;
    /**
     * Resumes a suspended lexical environment and visits a concise body, ending the lexical
     * environment and merging hoisted declarations upon completion.
     */
    function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext): ConciseBody;
    /**
     * Visits an iteration body, adding any block-scoped variables required by the transformation.
     */
    function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext): Statement;
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext): T;
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;
}
declare namespace ts {
    function getTsBuildInfoEmitOutputFilePath(options: CompilerOptions): string | undefined;
    function getOutputFileNames(commandLine: ParsedCommandLine, inputFileName: string, ignoreCase: boolean): readonly string[];
    function createPrinter(printerOptions?: PrinterOptions, handlers?: PrintHandlers): Printer;
}
declare namespace ts {
    export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName?: string): string | undefined;
    export function resolveTripleslashReference(moduleName: string, containingFile: string): string;
    export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost;
    export function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    export interface FormatDiagnosticsHost {
        getCurrentDirectory(): string;
        getCanonicalFileName(fileName: string): string;
        getNewLine(): string;
    }
    export function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
    export function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string;
    export function formatDiagnosticsWithColorAndContext(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
    export function flattenDiagnosticMessageText(diag: string | DiagnosticMessageChain | undefined, newLine: string, indent?: number): string;
    export function getConfigFileParsingDiagnostics(configFileParseResult: ParsedCommandLine): readonly Diagnostic[];
    /**
     * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
     * `options` parameter.
     *
     * @param fileName The normalized absolute path to check the format of (it need not exist on disk)
     * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
     * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
     * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
     * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
     */
    export function getImpliedNodeFormatForFile(fileName: Path, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ModuleKind.ESNext | ModuleKind.CommonJS | undefined;
    /**
     * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
     * that represent a compilation unit.
     *
     * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
     * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
     *
     * @param createProgramOptions - The options for creating a program.
     * @returns A 'Program' object.
     */
    export function createProgram(createProgramOptions: CreateProgramOptions): Program;
    /**
     * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
     * that represent a compilation unit.
     *
     * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
     * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
     *
     * @param rootNames - A set of root files.
     * @param options - The compiler options which should be used.
     * @param host - The host interacts with the underlying file system.
     * @param oldProgram - Reuses an old program structure.
     * @param configFileParsingDiagnostics - error during config file parsing
     * @returns A 'Program' object.
     */
    export function createProgram(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[]): Program;
    /** @deprecated */ export interface ResolveProjectReferencePathHost {
        fileExists(fileName: string): boolean;
    }
    /**
     * Returns the target config filename of a project reference.
     * Note: The file might not exist.
     */
    export function resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName;
    /** @deprecated */ export function resolveProjectReferencePath(host: ResolveProjectReferencePathHost, ref: ProjectReference): ResolvedConfigFileName;
    export {};
}
declare namespace ts {
    interface EmitOutput {
        outputFiles: OutputFile[];
        emitSkipped: boolean;
    }
    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
}
declare namespace ts {
    type AffectedFileResult<T> = {
        result: T;
        affected: SourceFile | Program;
    } | undefined;
    interface BuilderProgramHost {
        /**
         * return true if file names are treated with case sensitivity
         */
        useCaseSensitiveFileNames(): boolean;
        /**
         * If provided this would be used this hash instead of actual file shape text for detecting changes
         */
        createHash?: (data: string) => string;
        /**
         * When emit or emitNextAffectedFile are called without writeFile,
         * this callback if present would be used to write files
         */
        writeFile?: WriteFileCallback;
    }
    /**
     * Builder to manage the program state changes
     */
    interface BuilderProgram {
        /**
         * Returns current program
         */
        getProgram(): Program;
        /**
         * Get compiler options of the program
         */
        getCompilerOptions(): CompilerOptions;
        /**
         * Get the source file in the program with file name
         */
        getSourceFile(fileName: string): SourceFile | undefined;
        /**
         * Get a list of files in the program
         */
        getSourceFiles(): readonly SourceFile[];
        /**
         * Get the diagnostics for compiler options
         */
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics that dont belong to any file
         */
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the diagnostics from config file parsing
         */
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        /**
         * Get the syntax diagnostics, for all source files if source file is not supplied
         */
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Get the declaration diagnostics, for all source files if source file is not supplied
         */
        getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
        /**
         * Get all the dependencies of the file
         */
        getAllDependencies(sourceFile: SourceFile): readonly string[];
        /**
         * Gets the semantic diagnostics from the program corresponding to this state of file (if provided) or whole program
         * The semantic diagnostics are cached and managed here
         * Note that it is assumed that when asked about semantic diagnostics through this API,
         * the file has been taken out of affected files so it is safe to use cache or get from program and cache the diagnostics
         * In case of SemanticDiagnosticsBuilderProgram if the source file is not provided,
         * it will iterate through all the affected files, to ensure that cache stays valid and yet provide a way to get all semantic diagnostics
         */
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        /**
         * Emits the JavaScript and declaration files.
         * When targetSource file is specified, emits the files corresponding to that source file,
         * otherwise for the whole program.
         * In case of EmitAndSemanticDiagnosticsBuilderProgram, when targetSourceFile is specified,
         * it is assumed that that file is handled from affected file list. If targetSourceFile is not specified,
         * it will only emit all the affected files instead of whole program
         *
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
        /**
         * Get the current directory of the program
         */
        getCurrentDirectory(): string;
    }
    /**
     * The builder that caches the semantic diagnostics for the program and handles the changed files and affected files
     */
    interface SemanticDiagnosticsBuilderProgram extends BuilderProgram {
        /**
         * Gets the semantic diagnostics from the program for the next affected file and caches it
         * Returns undefined if the iteration is complete
         */
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
    }
    /**
     * The builder that can handle the changes in program and iterate through changed file to emit the files
     * The semantic diagnostics are cached per file and managed by clearing for the changed/affected files
     */
    interface EmitAndSemanticDiagnosticsBuilderProgram extends SemanticDiagnosticsBuilderProgram {
        /**
         * Emits the next affected file's emit result (EmitResult and sourceFiles emitted) or returns undefined if iteration is complete
         * The first of writeFile if provided, writeFile of BuilderProgramHost if provided, writeFile of compiler host
         * in that order would be used to write the files
         */
        emitNextAffectedFile(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): AffectedFileResult<EmitResult>;
    }
    /**
     * Create the builder to manage semantic diagnostics and cache them
     */
    function createSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): SemanticDiagnosticsBuilderProgram;
    function createSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: SemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): SemanticDiagnosticsBuilderProgram;
    /**
     * Create the builder that can handle the changes in program and iterate through changed files
     * to emit the those files and manage semantic diagnostics cache as well
     */
    function createEmitAndSemanticDiagnosticsBuilderProgram(newProgram: Program, host: BuilderProgramHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): EmitAndSemanticDiagnosticsBuilderProgram;
    function createEmitAndSemanticDiagnosticsBuilderProgram(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: EmitAndSemanticDiagnosticsBuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): EmitAndSemanticDiagnosticsBuilderProgram;
    /**
     * Creates a builder thats just abstraction over program and can be used with watch
     */
    function createAbstractBuilder(newProgram: Program, host: BuilderProgramHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[]): BuilderProgram;
    function createAbstractBuilder(rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderProgram;
}
declare namespace ts {
    interface ReadBuildProgramHost {
        useCaseSensitiveFileNames(): boolean;
        getCurrentDirectory(): string;
        readFile(fileName: string): string | undefined;
    }
    function readBuilderProgram(compilerOptions: CompilerOptions, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram | undefined;
    function createIncrementalCompilerHost(options: CompilerOptions, system?: System): CompilerHost;
    interface IncrementalProgramOptions<T extends BuilderProgram> {
        rootNames: readonly string[];
        options: CompilerOptions;
        configFileParsingDiagnostics?: readonly Diagnostic[];
        projectReferences?: readonly ProjectReference[];
        host?: CompilerHost;
        createProgram?: CreateProgram<T>;
    }
    function createIncrementalProgram<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>({ rootNames, options, configFileParsingDiagnostics, projectReferences, host, createProgram }: IncrementalProgramOptions<T>): T;
    type WatchStatusReporter = (diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number) => void;
    /** Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program */
    type CreateProgram<T extends BuilderProgram> = (rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[] | undefined) => T;
    /** Host that has watch functionality used in --watch mode */
    interface WatchHost {
        /** If provided, called with Diagnostic message that informs about change in watch status */
        onWatchStatusChange?(diagnostic: Diagnostic, newLine: string, options: CompilerOptions, errorCount?: number): void;
        /** Used to watch changes in source files, missing files needed to update the program or config file */
        watchFile(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: CompilerOptions): FileWatcher;
        /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
        watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: CompilerOptions): FileWatcher;
        /** If provided, will be used to set delayed compilation, so that multiple changes in short span are compiled together */
        setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
        /** If provided, will be used to reset existing delayed compilation */
        clearTimeout?(timeoutId: any): void;
    }
    interface ProgramHost<T extends BuilderProgram> {
        /**
         * Used to create the program when need for program creation or recreation detected
         */
        createProgram: CreateProgram<T>;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: CompilerOptions): string;
        getDefaultLibLocation?(): string;
        createHash?(data: string): string;
        /**
         * Use to check file presence for source files and
         * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
         */
        fileExists(path: string): boolean;
        /**
         * Use to read file text for source files and
         * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
         */
        readFile(path: string, encoding?: string): string | undefined;
        /** If provided, used for module resolution as well as to handle directory structure */
        directoryExists?(path: string): boolean;
        /** If provided, used in resolutions as well as handling directory structure */
        getDirectories?(path: string): string[];
        /** If provided, used to cache and handle directory structure modifications */
        readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        /** Symbol links resolution */
        realpath?(path: string): string;
        /** If provided would be used to write log about compilation */
        trace?(s: string): void;
        /** If provided is used to get the environment variable */
        getEnvironmentVariable?(name: string): string | undefined;
        /** If provided, used to resolve the module names, otherwise typescript's default module resolution */
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        /** If provided, used to resolve type reference directives, otherwise typescript's default resolution */
        resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions): (ResolvedTypeReferenceDirective | undefined)[];
    }
    interface WatchCompilerHost<T extends BuilderProgram> extends ProgramHost<T>, WatchHost {
        /** Instead of using output d.ts file from project reference, use its source file */
        useSourceOfProjectReferenceRedirect?(): boolean;
        /** If provided, use this method to get parsed command lines for referenced projects */
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        /** If provided, callback to invoke after every new program creation */
        afterProgramCreate?(program: T): void;
    }
    /**
     * Host to create watch with root files and options
     */
    interface WatchCompilerHostOfFilesAndCompilerOptions<T extends BuilderProgram> extends WatchCompilerHost<T> {
        /** root files to use to generate program */
        rootFiles: string[];
        /** Compiler options */
        options: CompilerOptions;
        watchOptions?: WatchOptions;
        /** Project References */
        projectReferences?: readonly ProjectReference[];
    }
    /**
     * Host to create watch with config file
     */
    interface WatchCompilerHostOfConfigFile<T extends BuilderProgram> extends WatchCompilerHost<T>, ConfigFileDiagnosticsReporter {
        /** Name of the config file to compile */
        configFileName: string;
        /** Options to extend */
        optionsToExtend?: CompilerOptions;
        watchOptionsToExtend?: WatchOptions;
        extraFileExtensions?: readonly FileExtensionInfo[];
        /**
         * Used to generate source file names from the config file and its include, exclude, files rules
         * and also to cache the directory stucture
         */
        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    }
    interface Watch<T> {
        /** Synchronize with host and get updated program */
        getProgram(): T;
        /** Closes the watch */
        close(): void;
    }
    /**
     * Creates the watch what generates program using the config file
     */
    interface WatchOfConfigFile<T> extends Watch<T> {
    }
    /**
     * Creates the watch that generates program using the root files and compiler options
     */
    interface WatchOfFilesAndCompilerOptions<T> extends Watch<T> {
        /** Updates the root files in the program, only if this is not config file compilation */
        updateRootFileNames(fileNames: string[]): void;
    }
    /**
     * Create the watch compiler host for either configFile or fileNames and its options
     */
    function createWatchCompilerHost<T extends BuilderProgram>(configFileName: string, optionsToExtend: CompilerOptions | undefined, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, watchOptionsToExtend?: WatchOptions, extraFileExtensions?: readonly FileExtensionInfo[]): WatchCompilerHostOfConfigFile<T>;
    function createWatchCompilerHost<T extends BuilderProgram>(rootFiles: string[], options: CompilerOptions, system: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter, projectReferences?: readonly ProjectReference[], watchOptions?: WatchOptions): WatchCompilerHostOfFilesAndCompilerOptions<T>;
    /**
     * Creates the watch from the host for root files and compiler options
     */
    function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfFilesAndCompilerOptions<T>): WatchOfFilesAndCompilerOptions<T>;
    /**
     * Creates the watch from the host for config file
     */
    function createWatchProgram<T extends BuilderProgram>(host: WatchCompilerHostOfConfigFile<T>): WatchOfConfigFile<T>;
}
declare namespace ts {
    interface BuildOptions {
        dry?: boolean;
        force?: boolean;
        verbose?: boolean;
        incremental?: boolean;
        assumeChangesOnlyAffectDirectDependencies?: boolean;
        traceResolution?: boolean;
        [option: string]: CompilerOptionsValue | undefined;
    }
    type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;
    interface ReportFileInError {
        fileName: string;
        line: number;
    }
    interface SolutionBuilderHostBase<T extends BuilderProgram> extends ProgramHost<T> {
        createDirectory?(path: string): void;
        /**
         * Should provide create directory and writeFile if done of invalidatedProjects is not invoked with
         * writeFileCallback
         */
        writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
        getCustomTransformers?: (project: string) => CustomTransformers | undefined;
        getModifiedTime(fileName: string): Date | undefined;
        setModifiedTime(fileName: string, date: Date): void;
        deleteFile(fileName: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
        reportDiagnostic: DiagnosticReporter;
        reportSolutionBuilderStatus: DiagnosticReporter;
        afterProgramEmitAndDiagnostics?(program: T): void;
    }
    interface SolutionBuilderHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T> {
        reportErrorSummary?: ReportEmitErrorSummary;
    }
    interface SolutionBuilderWithWatchHost<T extends BuilderProgram> extends SolutionBuilderHostBase<T>, WatchHost {
    }
    interface SolutionBuilder<T extends BuilderProgram> {
        build(project?: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
        clean(project?: string): ExitStatus;
        buildReferences(project: string, cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, getCustomTransformers?: (project: string) => CustomTransformers): ExitStatus;
        cleanReferences(project?: string): ExitStatus;
        getNextInvalidatedProject(cancellationToken?: CancellationToken): InvalidatedProject<T> | undefined;
    }
    /**
     * Create a function that reports watch status by writing to the system and handles the formating of the diagnostic
     */
    function createBuilderStatusReporter(system: System, pretty?: boolean): DiagnosticReporter;
    function createSolutionBuilderHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system?: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary): SolutionBuilderHost<T>;
    function createSolutionBuilderWithWatchHost<T extends BuilderProgram = EmitAndSemanticDiagnosticsBuilderProgram>(system?: System, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportWatchStatus?: WatchStatusReporter): SolutionBuilderWithWatchHost<T>;
    function createSolutionBuilder<T extends BuilderProgram>(host: SolutionBuilderHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions): SolutionBuilder<T>;
    function createSolutionBuilderWithWatch<T extends BuilderProgram>(host: SolutionBuilderWithWatchHost<T>, rootNames: readonly string[], defaultOptions: BuildOptions, baseWatchOptions?: WatchOptions): SolutionBuilder<T>;
    enum InvalidatedProjectKind {
        Build = 0,
        UpdateBundle = 1,
        UpdateOutputFileStamps = 2
    }
    interface InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind;
        readonly project: ResolvedConfigFileName;
        /**
         *  To dispose this project and ensure that all the necessary actions are taken and state is updated accordingly
         */
        done(cancellationToken?: CancellationToken, writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): ExitStatus;
        getCompilerOptions(): CompilerOptions;
        getCurrentDirectory(): string;
    }
    interface UpdateOutputFileStampsProject extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateOutputFileStamps;
        updateOutputFileStatmps(): void;
    }
    interface BuildInvalidedProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.Build;
        getBuilderProgram(): T | undefined;
        getProgram(): Program | undefined;
        getSourceFile(fileName: string): SourceFile | undefined;
        getSourceFiles(): readonly SourceFile[];
        getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
        getConfigFileParsingDiagnostics(): readonly Diagnostic[];
        getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getAllDependencies(sourceFile: SourceFile): readonly string[];
        getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
        getSemanticDiagnosticsOfNextAffectedFile(cancellationToken?: CancellationToken, ignoreSourceFile?: (sourceFile: SourceFile) => boolean): AffectedFileResult<readonly Diagnostic[]>;
        emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult | undefined;
    }
    interface UpdateBundleProject<T extends BuilderProgram> extends InvalidatedProjectBase {
        readonly kind: InvalidatedProjectKind.UpdateBundle;
        emit(writeFile?: WriteFileCallback, customTransformers?: CustomTransformers): EmitResult | BuildInvalidedProject<T> | undefined;
    }
    type InvalidatedProject<T extends BuilderProgram> = UpdateOutputFileStampsProject | BuildInvalidedProject<T> | UpdateBundleProject<T>;
}
declare namespace ts.server {
    type ActionSet = "action::set";
    type ActionInvalidate = "action::invalidate";
    type ActionPackageInstalled = "action::packageInstalled";
    type EventTypesRegistry = "event::typesRegistry";
    type EventBeginInstallTypes = "event::beginInstallTypes";
    type EventEndInstallTypes = "event::endInstallTypes";
    type EventInitializationFailed = "event::initializationFailed";
}
declare namespace ts.server {
    interface TypingInstallerResponse {
        readonly kind: ActionSet | ActionInvalidate | EventTypesRegistry | ActionPackageInstalled | EventBeginInstallTypes | EventEndInstallTypes | EventInitializationFailed;
    }
    interface TypingInstallerRequestWithProjectName {
        readonly projectName: string;
    }
    interface DiscoverTypings extends TypingInstallerRequestWithProjectName {
        readonly fileNames: string[];
        readonly projectRootPath: Path;
        readonly compilerOptions: CompilerOptions;
        readonly watchOptions?: WatchOptions;
        readonly typeAcquisition: TypeAcquisition;
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly cachePath?: string;
        readonly kind: "discover";
    }
    interface CloseProject extends TypingInstallerRequestWithProjectName {
        readonly kind: "closeProject";
    }
    interface TypesRegistryRequest {
        readonly kind: "typesRegistry";
    }
    interface InstallPackageRequest extends TypingInstallerRequestWithProjectName {
        readonly kind: "installPackage";
        readonly fileName: Path;
        readonly packageName: string;
        readonly projectRootPath: Path;
    }
    interface PackageInstalledResponse extends ProjectResponse {
        readonly kind: ActionPackageInstalled;
        readonly success: boolean;
        readonly message: string;
    }
    interface InitializationFailedResponse extends TypingInstallerResponse {
        readonly kind: EventInitializationFailed;
        readonly message: string;
        readonly stack?: string;
    }
    interface ProjectResponse extends TypingInstallerResponse {
        readonly projectName: string;
    }
    interface InvalidateCachedTypings extends ProjectResponse {
        readonly kind: ActionInvalidate;
    }
    interface InstallTypes extends ProjectResponse {
        readonly kind: EventBeginInstallTypes | EventEndInstallTypes;
        readonly eventId: number;
        readonly typingsInstallerVersion: string;
        readonly packagesToInstall: readonly string[];
    }
    interface BeginInstallTypes extends InstallTypes {
        readonly kind: EventBeginInstallTypes;
    }
    interface EndInstallTypes extends InstallTypes {
        readonly kind: EventEndInstallTypes;
        readonly installSuccess: boolean;
    }
    interface SetTypings extends ProjectResponse {
        readonly typeAcquisition: TypeAcquisition;
        readonly compilerOptions: CompilerOptions;
        readonly typings: string[];
        readonly unresolvedImports: SortedReadonlyArray<string>;
        readonly kind: ActionSet;
    }
}
declare namespace ts {
    interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): Node[];
        getStart(sourceFile?: SourceFile, includeJsDocComment?: boolean): number;
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFileLike): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node | undefined;
        getLastToken(sourceFile?: SourceFile): Node | undefined;
        forEachChild<T>(cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;
    }
    interface Identifier {
        readonly text: string;
    }
    interface PrivateIdentifier {
        readonly text: string;
    }
    interface Symbol {
        readonly name: string;
        getFlags(): SymbolFlags;
        getEscapedName(): __String;
        getName(): string;
        getDeclarations(): Declaration[] | undefined;
        getDocumentationComment(typeChecker: TypeChecker | undefined): SymbolDisplayPart[];
        getJsDocTags(checker?: TypeChecker): JSDocTagInfo[];
    }
    interface Type {
        getFlags(): TypeFlags;
        getSymbol(): Symbol | undefined;
        getProperties(): Symbol[];
        getProperty(propertyName: string): Symbol | undefined;
        getApparentProperties(): Symbol[];
        getCallSignatures(): readonly Signature[];
        getConstructSignatures(): readonly Signature[];
        getStringIndexType(): Type | undefined;
        getNumberIndexType(): Type | undefined;
        getBaseTypes(): BaseType[] | undefined;
        getNonNullableType(): Type;
        getConstraint(): Type | undefined;
        getDefault(): Type | undefined;
        isUnion(): this is UnionType;
        isIntersection(): this is IntersectionType;
        isUnionOrIntersection(): this is UnionOrIntersectionType;
        isLiteral(): this is LiteralType;
        isStringLiteral(): this is StringLiteralType;
        isNumberLiteral(): this is NumberLiteralType;
        isTypeParameter(): this is TypeParameter;
        isClassOrInterface(): this is InterfaceType;
        isClass(): this is InterfaceType;
        isIndexType(): this is IndexType;
    }
    interface TypeReference {
        typeArguments?: readonly Type[];
    }
    interface Signature {
        getDeclaration(): SignatureDeclaration;
        getTypeParameters(): TypeParameter[] | undefined;
        getParameters(): Symbol[];
        getTypeParameterAtPosition(pos: number): Type;
        getReturnType(): Type;
        getDocumentationComment(typeChecker: TypeChecker | undefined): SymbolDisplayPart[];
        getJsDocTags(): JSDocTagInfo[];
    }
    interface SourceFile {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
        getLineEndOfPosition(pos: number): number;
        getLineStarts(): readonly number[];
        getPositionOfLineAndCharacter(line: number, character: number): number;
        update(newText: string, textChangeRange: TextChangeRange): SourceFile;
    }
    interface SourceFileLike {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
    interface SourceMapSource {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
    /**
     * Represents an immutable snapshot of a script at a specified time.Once acquired, the
     * snapshot is observably immutable. i.e. the same calls with the same parameters will return
     * the same values.
     */
    interface IScriptSnapshot {
        /** Gets a portion of the script snapshot specified by [start, end). */
        getText(start: number, end: number): string;
        /** Gets the length of this script snapshot. */
        getLength(): number;
        /**
         * Gets the TextChangeRange that describe how the text changed between this text and
         * an older version.  This information is used by the incremental parser to determine
         * what sections of the script need to be re-parsed.  'undefined' can be returned if the
         * change range cannot be determined.  However, in that case, incremental parsing will
         * not happen and the entire document will be re - parsed.
         */
        getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined;
        /** Releases all resources held by this script snapshot */
        dispose?(): void;
    }
    namespace ScriptSnapshot {
        function fromString(text: string): IScriptSnapshot;
    }
    interface PreProcessedFileInfo {
        referencedFiles: FileReference[];
        typeReferenceDirectives: FileReference[];
        libReferenceDirectives: FileReference[];
        importedFiles: FileReference[];
        ambientExternalModules?: string[];
        isLibFile: boolean;
    }
    interface HostCancellationToken {
        isCancellationRequested(): boolean;
    }
    interface InstallPackageOptions {
        fileName: Path;
        packageName: string;
    }
    interface PerformanceEvent {
        kind: "UpdateGraph" | "CreatePackageJsonAutoImportProvider";
        durationMs: number;
    }
    enum LanguageServiceMode {
        Semantic = 0,
        PartialSemantic = 1,
        Syntactic = 2
    }
    interface IncompleteCompletionsCache {
        get(): CompletionInfo | undefined;
        set(response: CompletionInfo): void;
        clear(): void;
    }
    interface LanguageServiceHost extends GetEffectiveTypeRootsHost {
        getCompilationSettings(): CompilerOptions;
        getNewLine?(): string;
        getProjectVersion?(): string;
        getScriptFileNames(): string[];
        getScriptKind?(fileName: string): ScriptKind;
        getScriptVersion(fileName: string): string;
        getScriptSnapshot(fileName: string): IScriptSnapshot | undefined;
        getProjectReferences?(): readonly ProjectReference[] | undefined;
        getLocalizedDiagnosticMessages?(): any;
        getCancellationToken?(): HostCancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(options: CompilerOptions): string;
        log?(s: string): void;
        trace?(s: string): void;
        error?(s: string): void;
        useCaseSensitiveFileNames?(): boolean;
        readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
        readFile?(path: string, encoding?: string): string | undefined;
        realpath?(path: string): string;
        fileExists?(path: string): boolean;
        getTypeRootsVersion?(): number;
        resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
        getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: string, containingFile: string, resolutionMode?: ModuleKind.CommonJS | ModuleKind.ESNext): ResolvedModuleWithFailedLookupLocations | undefined;
        resolveTypeReferenceDirectives?(typeDirectiveNames: string[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions): (ResolvedTypeReferenceDirective | undefined)[];
        getDirectories?(directoryName: string): string[];
        /**
         * Gets a set of custom transformers to use during emit.
         */
        getCustomTransformers?(): CustomTransformers | undefined;
        isKnownTypesPackageName?(name: string): boolean;
        installPackage?(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
        writeFile?(fileName: string, content: string): void;
        getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    }
    type WithMetadata<T> = T & {
        metadata?: unknown;
    };
    enum SemanticClassificationFormat {
        Original = "original",
        TwentyTwenty = "2020"
    }
    interface LanguageService {
        /** This is used as a part of restarting the language service. */
        cleanupSemanticCache(): void;
        /**
         * Gets errors indicating invalid syntax in a file.
         *
         * In English, "this cdeo have, erorrs" is syntactically invalid because it has typos,
         * grammatical errors, and misplaced punctuation. Likewise, examples of syntax
         * errors in TypeScript are missing parentheses in an `if` statement, mismatched
         * curly braces, and using a reserved keyword as a variable name.
         *
         * These diagnostics are inexpensive to compute and don't require knowledge of
         * other files. Note that a non-empty result increases the likelihood of false positives
         * from `getSemanticDiagnostics`.
         *
         * While these represent the majority of syntax-related diagnostics, there are some
         * that require the type system, which will be present in `getSemanticDiagnostics`.
         *
         * @param fileName A path to the file you want syntactic diagnostics for
         */
        getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[];
        /**
         * Gets warnings or errors indicating type system issues in a given file.
         * Requesting semantic diagnostics may start up the type system and
         * run deferred work, so the first call may take longer than subsequent calls.
         *
         * Unlike the other get*Diagnostics functions, these diagnostics can potentially not
         * include a reference to a source file. Specifically, the first time this is called,
         * it will return global diagnostics with no associated location.
         *
         * To contrast the differences between semantic and syntactic diagnostics, consider the
         * sentence: "The sun is green." is syntactically correct; those are real English words with
         * correct sentence structure. However, it is semantically invalid, because it is not true.
         *
         * @param fileName A path to the file you want semantic diagnostics for
         */
        getSemanticDiagnostics(fileName: string): Diagnostic[];
        /**
         * Gets suggestion diagnostics for a specific file. These diagnostics tend to
         * proactively suggest refactors, as opposed to diagnostics that indicate
         * potentially incorrect runtime behavior.
         *
         * @param fileName A path to the file you want semantic diagnostics for
         */
        getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[];
        /**
         * Gets global diagnostics related to the program configuration and compiler options.
         */
        getCompilerOptionsDiagnostics(): Diagnostic[];
        /** @deprecated Use getEncodedSyntacticClassifications instead. */
        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSyntacticClassifications(fileName: string, span: TextSpan, format: SemanticClassificationFormat): ClassifiedSpan[] | ClassifiedSpan2020[];
        /** @deprecated Use getEncodedSemanticClassifications instead. */
        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(fileName: string, span: TextSpan, format: SemanticClassificationFormat): ClassifiedSpan[] | ClassifiedSpan2020[];
        /** Encoded as triples of [start, length, ClassificationType]. */
        getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications;
        /**
         * Gets semantic highlights information for a particular file. Has two formats, an older
         * version used by VS and a format used by VS Code.
         *
         * @param fileName The path to the file
         * @param position A text span to return results within
         * @param format Which format to use, defaults to "original"
         * @returns a number array encoded as triples of [start, length, ClassificationType, ...].
         */
        getEncodedSemanticClassifications(fileName: string, span: TextSpan, format?: SemanticClassificationFormat): Classifications;
        /**
         * Gets completion entries at a particular position in a file.
         *
         * @param fileName The path to the file
         * @param position A zero-based index of the character where you want the entries
         * @param options An object describing how the request was triggered and what kinds
         * of code actions can be returned with the completions.
         * @param formattingSettings settings needed for calling formatting functions.
         */
        getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined, formattingSettings?: FormatCodeSettings): WithMetadata<CompletionInfo> | undefined;
        /**
         * Gets the extended details for a completion entry retrieved from `getCompletionsAtPosition`.
         *
         * @param fileName The path to the file
         * @param position A zero based index of the character where you want the entries
         * @param entryName The `name` from an existing completion which came from `getCompletionsAtPosition`
         * @param formatOptions How should code samples in the completions be formatted, can be undefined for backwards compatibility
         * @param source `source` property from the completion entry
         * @param preferences User settings, can be undefined for backwards compatibility
         * @param data `data` property from the completion entry
         */
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, formatOptions: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences | undefined, data: CompletionEntryData | undefined): CompletionEntryDetails | undefined;
        getCompletionEntrySymbol(fileName: string, position: number, name: string, source: string | undefined): Symbol | undefined;
        /**
         * Gets semantic information about the identifier at a particular position in a
         * file. Quick info is what you typically see when you hover in an editor.
         *
         * @param fileName The path to the file
         * @param position A zero-based index of the character where you want the quick info
         */
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo | undefined;
        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan | undefined;
        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan | undefined;
        getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems | undefined;
        getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): readonly RenameLocation[] | undefined;
        getSmartSelectionRange(fileName: string, position: number): SelectionRange;
        getDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan | undefined;
        getTypeDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
        getImplementationAtPosition(fileName: string, position: number): readonly ImplementationLocation[] | undefined;
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] | undefined;
        findReferences(fileName: string, position: number): ReferencedSymbol[] | undefined;
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] | undefined;
        getFileReferences(fileName: string): ReferenceEntry[];
        /** @deprecated */
        getOccurrencesAtPosition(fileName: string, position: number): readonly ReferenceEntry[] | undefined;
        getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: boolean): NavigateToItem[];
        getNavigationBarItems(fileName: string): NavigationBarItem[];
        getNavigationTree(fileName: string): NavigationTree;
        prepareCallHierarchy(fileName: string, position: number): CallHierarchyItem | CallHierarchyItem[] | undefined;
        provideCallHierarchyIncomingCalls(fileName: string, position: number): CallHierarchyIncomingCall[];
        provideCallHierarchyOutgoingCalls(fileName: string, position: number): CallHierarchyOutgoingCall[];
        provideInlayHints(fileName: string, span: TextSpan, preferences: UserPreferences | undefined): InlayHint[];
        getOutliningSpans(fileName: string): OutliningSpan[];
        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions | EditorSettings): number;
        getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
        getDocCommentTemplateAtPosition(fileName: string, position: number, options?: DocCommentTemplateOptions): TextInsertion | undefined;
        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean;
        /**
         * This will return a defined result if the position is after the `>` of the opening tag, or somewhere in the text, of a JSXElement with no closing tag.
         * Editors should call this after `>` is typed.
         */
        getJsxClosingTagAtPosition(fileName: string, position: number): JsxClosingTagInfo | undefined;
        getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined;
        toLineColumnOffset?(fileName: string, position: number): LineAndCharacter;
        getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: readonly number[], formatOptions: FormatCodeSettings, preferences: UserPreferences): readonly CodeFixAction[];
        getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): CombinedCodeActions;
        applyCodeActionCommand(action: CodeActionCommand, formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult>;
        applyCodeActionCommand(action: CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult[]>;
        applyCodeActionCommand(action: CodeActionCommand | CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand): Promise<ApplyCodeActionCommandResult>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand[]): Promise<ApplyCodeActionCommandResult[]>;
        /** @deprecated `fileName` will be ignored */
        applyCodeActionCommand(fileName: string, action: CodeActionCommand | CodeActionCommand[]): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences | undefined, triggerReason?: RefactorTriggerReason, kind?: string): ApplicableRefactorInfo[];
        getEditsForRefactor(fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences | undefined): RefactorEditInfo | undefined;
        organizeImports(args: OrganizeImportsArgs, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
        getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
        getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean): EmitOutput;
        getProgram(): Program | undefined;
        toggleLineComment(fileName: string, textRange: TextRange): TextChange[];
        toggleMultilineComment(fileName: string, textRange: TextRange): TextChange[];
        commentSelection(fileName: string, textRange: TextRange): TextChange[];
        uncommentSelection(fileName: string, textRange: TextRange): TextChange[];
        dispose(): void;
    }
    interface JsxClosingTagInfo {
        readonly newText: string;
    }
    interface CombinedCodeFixScope {
        type: "file";
        fileName: string;
    }
    interface OrganizeImportsArgs extends CombinedCodeFixScope {
        skipDestructiveCodeActions?: boolean;
    }
    type CompletionsTriggerCharacter = "." | '"' | "'" | "`" | "/" | "@" | "<" | "#" | " ";
    enum CompletionTriggerKind {
        /** Completion was triggered by typing an identifier, manual invocation (e.g Ctrl+Space) or via API. */
        Invoked = 1,
        /** Completion was triggered by a trigger character. */
        TriggerCharacter = 2,
        /** Completion was re-triggered as the current completion list is incomplete. */
        TriggerForIncompleteCompletions = 3
    }
    interface GetCompletionsAtPositionOptions extends UserPreferences {
        /**
         * If the editor is asking for completions because a certain character was typed
         * (as opposed to when the user explicitly requested them) this should be set.
         */
        triggerCharacter?: CompletionsTriggerCharacter;
        triggerKind?: CompletionTriggerKind;
        /** @deprecated Use includeCompletionsForModuleExports */
        includeExternalModuleExports?: boolean;
        /** @deprecated Use includeCompletionsWithInsertText */
        includeInsertTextCompletions?: boolean;
    }
    interface InlayHintsOptions extends UserPreferences {
        readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
        readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
        readonly includeInlayFunctionParameterTypeHints?: boolean;
        readonly includeInlayVariableTypeHints?: boolean;
        readonly includeInlayPropertyDeclarationTypeHints?: boolean;
        readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
        readonly includeInlayEnumMemberValueHints?: boolean;
    }
    type SignatureHelpTriggerCharacter = "," | "(" | "<";
    type SignatureHelpRetriggerCharacter = SignatureHelpTriggerCharacter | ")";
    interface SignatureHelpItemsOptions {
        triggerReason?: SignatureHelpTriggerReason;
    }
    type SignatureHelpTriggerReason = SignatureHelpInvokedReason | SignatureHelpCharacterTypedReason | SignatureHelpRetriggeredReason;
    /**
     * Signals that the user manually requested signature help.
     * The language service will unconditionally attempt to provide a result.
     */
    interface SignatureHelpInvokedReason {
        kind: "invoked";
        triggerCharacter?: undefined;
    }
    /**
     * Signals that the signature help request came from a user typing a character.
     * Depending on the character and the syntactic context, the request may or may not be served a result.
     */
    interface SignatureHelpCharacterTypedReason {
        kind: "characterTyped";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter: SignatureHelpTriggerCharacter;
    }
    /**
     * Signals that this signature help request came from typing a character or moving the cursor.
     * This should only occur if a signature help session was already active and the editor needs to see if it should adjust.
     * The language service will unconditionally attempt to provide a result.
     * `triggerCharacter` can be `undefined` for a retrigger caused by a cursor move.
     */
    interface SignatureHelpRetriggeredReason {
        kind: "retrigger";
        /**
         * Character that was responsible for triggering signature help.
         */
        triggerCharacter?: SignatureHelpRetriggerCharacter;
    }
    interface ApplyCodeActionCommandResult {
        successMessage: string;
    }
    interface Classifications {
        spans: number[];
        endOfLineState: EndOfLineState;
    }
    interface ClassifiedSpan {
        textSpan: TextSpan;
        classificationType: ClassificationTypeNames;
    }
    interface ClassifiedSpan2020 {
        textSpan: TextSpan;
        classificationType: number;
    }
    /**
     * Navigation bar interface designed for visual studio's dual-column layout.
     * This does not form a proper tree.
     * The navbar is returned as a list of top-level items, each of which has a list of child items.
     * Child items always have an empty array for their `childItems`.
     */
    interface NavigationBarItem {
        text: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        spans: TextSpan[];
        childItems: NavigationBarItem[];
        indent: number;
        bolded: boolean;
        grayed: boolean;
    }
    /**
     * Node in a tree of nested declarations in a file.
     * The top node is always a script or module node.
     */
    interface NavigationTree {
        /** Name of the declaration, or a short description, e.g. "<class>". */
        text: string;
        kind: ScriptElementKind;
        /** ScriptElementKindModifier separated by commas, e.g. "public,abstract" */
        kindModifiers: string;
        /**
         * Spans of the nodes that generated this declaration.
         * There will be more than one if this is the result of merging.
         */
        spans: TextSpan[];
        nameSpan: TextSpan | undefined;
        /** Present if non-empty */
        childItems?: NavigationTree[];
    }
    interface CallHierarchyItem {
        name: string;
        kind: ScriptElementKind;
        kindModifiers?: string;
        file: string;
        span: TextSpan;
        selectionSpan: TextSpan;
        containerName?: string;
    }
    interface CallHierarchyIncomingCall {
        from: CallHierarchyItem;
        fromSpans: TextSpan[];
    }
    interface CallHierarchyOutgoingCall {
        to: CallHierarchyItem;
        fromSpans: TextSpan[];
    }
    enum InlayHintKind {
        Type = "Type",
        Parameter = "Parameter",
        Enum = "Enum"
    }
    interface InlayHint {
        text: string;
        position: number;
        kind: InlayHintKind;
        whitespaceBefore?: boolean;
        whitespaceAfter?: boolean;
    }
    interface TodoCommentDescriptor {
        text: string;
        priority: number;
    }
    interface TodoComment {
        descriptor: TodoCommentDescriptor;
        message: string;
        position: number;
    }
    interface TextChange {
        span: TextSpan;
        newText: string;
    }
    interface FileTextChanges {
        fileName: string;
        textChanges: readonly TextChange[];
        isNewFile?: boolean;
    }
    interface CodeAction {
        /** Description of the code action to display in the UI of the editor */
        description: string;
        /** Text changes to apply to each file as part of the code action */
        changes: FileTextChanges[];
        /**
         * If the user accepts the code fix, the editor should send the action back in a `applyAction` request.
         * This allows the language service to have side effects (e.g. installing dependencies) upon a code fix.
         */
        commands?: CodeActionCommand[];
    }
    interface CodeFixAction extends CodeAction {
        /** Short name to identify the fix, for use by telemetry. */
        fixName: string;
        /**
         * If present, one may call 'getCombinedCodeFix' with this fixId.
         * This may be omitted to indicate that the code fix can't be applied in a group.
         */
        fixId?: {};
        fixAllDescription?: string;
    }
    interface CombinedCodeActions {
        changes: readonly FileTextChanges[];
        commands?: readonly CodeActionCommand[];
    }
    type CodeActionCommand = InstallPackageAction;
    interface InstallPackageAction {
    }
    /**
     * A set of one or more available refactoring actions, grouped under a parent refactoring.
     */
    interface ApplicableRefactorInfo {
        /**
         * The programmatic name of the refactoring
         */
        name: string;
        /**
         * A description of this refactoring category to show to the user.
         * If the refactoring gets inlined (see below), this text will not be visible.
         */
        description: string;
        /**
         * Inlineable refactorings can have their actions hoisted out to the top level
         * of a context menu. Non-inlineanable refactorings should always be shown inside
         * their parent grouping.
         *
         * If not specified, this value is assumed to be 'true'
         */
        inlineable?: boolean;
        actions: RefactorActionInfo[];
    }
    /**
     * Represents a single refactoring action - for example, the "Extract Method..." refactor might
     * offer several actions, each corresponding to a surround class or closure to extract into.
     */
    interface RefactorActionInfo {
        /**
         * The programmatic name of the refactoring action
         */
        name: string;
        /**
         * A description of this refactoring action to show to the user.
         * If the parent refactoring is inlined away, this will be the only text shown,
         * so this description should make sense by itself if the parent is inlineable=true
         */
        description: string;
        /**
         * A message to show to the user if the refactoring cannot be applied in
         * the current context.
         */
        notApplicableReason?: string;
        /**
         * The hierarchical dotted name of the refactor action.
         */
        kind?: string;
    }
    /**
     * A set of edits to make in response to a refactor action, plus an optional
     * location where renaming should be invoked from
     */
    interface RefactorEditInfo {
        edits: FileTextChanges[];
        renameFilename?: string;
        renameLocation?: number;
        commands?: CodeActionCommand[];
    }
    type RefactorTriggerReason = "implicit" | "invoked";
    interface TextInsertion {
        newText: string;
        /** The position in newText the caret should point to after the insertion. */
        caretOffset: number;
    }
    interface DocumentSpan {
        textSpan: TextSpan;
        fileName: string;
        /**
         * If the span represents a location that was remapped (e.g. via a .d.ts.map file),
         * then the original filename and span will be specified here
         */
        originalTextSpan?: TextSpan;
        originalFileName?: string;
        /**
         * If DocumentSpan.textSpan is the span for name of the declaration,
         * then this is the span for relevant declaration
         */
        contextSpan?: TextSpan;
        originalContextSpan?: TextSpan;
    }
    interface RenameLocation extends DocumentSpan {
        readonly prefixText?: string;
        readonly suffixText?: string;
    }
    interface ReferenceEntry extends DocumentSpan {
        isWriteAccess: boolean;
        isDefinition: boolean;
        isInString?: true;
    }
    interface ImplementationLocation extends DocumentSpan {
        kind: ScriptElementKind;
        displayParts: SymbolDisplayPart[];
    }
    enum HighlightSpanKind {
        none = "none",
        definition = "definition",
        reference = "reference",
        writtenReference = "writtenReference"
    }
    interface HighlightSpan {
        fileName?: string;
        isInString?: true;
        textSpan: TextSpan;
        contextSpan?: TextSpan;
        kind: HighlightSpanKind;
    }
    interface NavigateToItem {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        matchKind: "exact" | "prefix" | "substring" | "camelCase";
        isCaseSensitive: boolean;
        fileName: string;
        textSpan: TextSpan;
        containerName: string;
        containerKind: ScriptElementKind;
    }
    enum IndentStyle {
        None = 0,
        Block = 1,
        Smart = 2
    }
    enum SemicolonPreference {
        Ignore = "ignore",
        Insert = "insert",
        Remove = "remove"
    }
    interface EditorOptions {
        BaseIndentSize?: number;
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
        IndentStyle: IndentStyle;
    }
    interface EditorSettings {
        baseIndentSize?: number;
        indentSize?: number;
        tabSize?: number;
        newLineCharacter?: string;
        convertTabsToSpaces?: boolean;
        indentStyle?: IndentStyle;
        trimTrailingWhitespace?: boolean;
    }
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterConstructor?: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        InsertSpaceAfterTypeAssertion?: boolean;
        InsertSpaceBeforeFunctionParenthesis?: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        insertSpaceBeforeTypeAnnotation?: boolean;
    }
    interface FormatCodeSettings extends EditorSettings {
        readonly insertSpaceAfterCommaDelimiter?: boolean;
        readonly insertSpaceAfterSemicolonInForStatements?: boolean;
        readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
        readonly insertSpaceAfterConstructor?: boolean;
        readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
        readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
        readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        readonly insertSpaceAfterTypeAssertion?: boolean;
        readonly insertSpaceBeforeFunctionParenthesis?: boolean;
        readonly placeOpenBraceOnNewLineForFunctions?: boolean;
        readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
        readonly insertSpaceBeforeTypeAnnotation?: boolean;
        readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
        readonly semicolons?: SemicolonPreference;
    }
    function getDefaultFormatCodeSettings(newLineCharacter?: string): FormatCodeSettings;
    interface DefinitionInfo extends DocumentSpan {
        kind: ScriptElementKind;
        name: string;
        containerKind: ScriptElementKind;
        containerName: string;
        unverified?: boolean;
    }
    interface DefinitionInfoAndBoundSpan {
        definitions?: readonly DefinitionInfo[];
        textSpan: TextSpan;
    }
    interface ReferencedSymbolDefinitionInfo extends DefinitionInfo {
        displayParts: SymbolDisplayPart[];
    }
    interface ReferencedSymbol {
        definition: ReferencedSymbolDefinitionInfo;
        references: ReferenceEntry[];
    }
    enum SymbolDisplayPartKind {
        aliasName = 0,
        className = 1,
        enumName = 2,
        fieldName = 3,
        interfaceName = 4,
        keyword = 5,
        lineBreak = 6,
        numericLiteral = 7,
        stringLiteral = 8,
        localName = 9,
        methodName = 10,
        moduleName = 11,
        operator = 12,
        parameterName = 13,
        propertyName = 14,
        punctuation = 15,
        space = 16,
        text = 17,
        typeParameterName = 18,
        enumMemberName = 19,
        functionName = 20,
        regularExpressionLiteral = 21,
        link = 22,
        linkName = 23,
        linkText = 24
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface JSDocLinkDisplayPart extends SymbolDisplayPart {
        target: DocumentSpan;
    }
    interface JSDocTagInfo {
        name: string;
        text?: SymbolDisplayPart[];
    }
    interface QuickInfo {
        kind: ScriptElementKind;
        kindModifiers: string;
        textSpan: TextSpan;
        displayParts?: SymbolDisplayPart[];
        documentation?: SymbolDisplayPart[];
        tags?: JSDocTagInfo[];
    }
    type RenameInfo = RenameInfoSuccess | RenameInfoFailure;
    interface RenameInfoSuccess {
        canRename: true;
        /**
         * File or directory to rename.
         * If set, `getEditsForFileRename` should be called instead of `findRenameLocations`.
         */
        fileToRename?: string;
        displayName: string;
        fullDisplayName: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        triggerSpan: TextSpan;
    }
    interface RenameInfoFailure {
        canRename: false;
        localizedErrorMessage: string;
    }
    interface RenameInfoOptions {
        readonly allowRenameOfImportPath?: boolean;
    }
    interface DocCommentTemplateOptions {
        readonly generateReturnInDocTemplate?: boolean;
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
        isRest?: boolean;
    }
    interface SelectionRange {
        textSpan: TextSpan;
        parent?: SelectionRange;
    }
    /**
     * Represents a single signature to show in signature help.
     * The id is used for subsequent calls into the language service to ask questions about the
     * signature help item in the context of any documents that have been updated.  i.e. after
     * an edit has happened, while signature help is still active, the host can ask important
     * questions like 'what parameter is the user currently contained within?'.
     */
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
        tags: JSDocTagInfo[];
    }
    /**
     * Represents a set of signature help items, and the preferred item that should be selected.
     */
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    interface CompletionInfo {
        /** Not true for all global completions. This will be true if the enclosing scope matches a few syntax kinds. See `isSnippetScope`. */
        isGlobalCompletion: boolean;
        isMemberCompletion: boolean;
        /**
         * In the absence of `CompletionEntry["replacementSpan"], the editor may choose whether to use
         * this span or its default one. If `CompletionEntry["replacementSpan"]` is defined, that span
         * must be used to commit that completion entry.
         */
        optionalReplacementSpan?: TextSpan;
        /**
         * true when the current location also allows for a new identifier
         */
        isNewIdentifierLocation: boolean;
        /**
         * Indicates to client to continue requesting completions on subsequent keystrokes.
         */
        isIncomplete?: true;
        entries: CompletionEntry[];
    }
    interface CompletionEntryDataAutoImport {
        /**
         * The name of the property or export in the module's symbol table. Differs from the completion name
         * in the case of InternalSymbolName.ExportEquals and InternalSymbolName.Default.
         */
        exportName: string;
        moduleSpecifier?: string;
        /** The file name declaring the export's module symbol, if it was an external module */
        fileName?: string;
        /** The module name (with quotes stripped) of the export's module symbol, if it was an ambient module */
        ambientModuleName?: string;
        /** True if the export was found in the package.json AutoImportProvider */
        isPackageJsonImport?: true;
    }
    interface CompletionEntryDataUnresolved extends CompletionEntryDataAutoImport {
        /** The key in the `ExportMapCache` where the completion entry's `SymbolExportInfo[]` is found */
        exportMapKey: string;
    }
    interface CompletionEntryDataResolved extends CompletionEntryDataAutoImport {
        moduleSpecifier: string;
    }
    type CompletionEntryData = CompletionEntryDataUnresolved | CompletionEntryDataResolved;
    interface CompletionEntry {
        name: string;
        kind: ScriptElementKind;
        kindModifiers?: string;
        sortText: string;
        insertText?: string;
        isSnippet?: true;
        /**
         * An optional span that indicates the text to be replaced by this completion item.
         * If present, this span should be used instead of the default one.
         * It will be set if the required span differs from the one generated by the default replacement behavior.
         */
        replacementSpan?: TextSpan;
        hasAction?: true;
        source?: string;
        sourceDisplay?: SymbolDisplayPart[];
        isRecommended?: true;
        isFromUncheckedFile?: true;
        isPackageJsonImport?: true;
        isImportStatementCompletion?: true;
        /**
         * A property to be sent back to TS Server in the CompletionDetailsRequest, along with `name`,
         * that allows TS Server to look up the symbol represented by the completion item, disambiguating
         * items with the same name. Currently only defined for auto-import completions, but the type is
         * `unknown` in the protocol, so it can be changed as needed to support other kinds of completions.
         * The presence of this property should generally not be used to assume that this completion entry
         * is an auto-import.
         */
        data?: CompletionEntryData;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation?: SymbolDisplayPart[];
        tags?: JSDocTagInfo[];
        codeActions?: CodeAction[];
        /** @deprecated Use `sourceDisplay` instead. */
        source?: SymbolDisplayPart[];
        sourceDisplay?: SymbolDisplayPart[];
    }
    interface OutliningSpan {
        /** The span of the document to actually collapse. */
        textSpan: TextSpan;
        /** The span of the document to display when the user hovers over the collapsed span. */
        hintSpan: TextSpan;
        /** The text to display in the editor for the collapsed region. */
        bannerText: string;
        /**
         * Whether or not this region should be automatically collapsed when
         * the 'Collapse to Definitions' command is invoked.
         */
        autoCollapse: boolean;
        /**
         * Classification of the contents of the span
         */
        kind: OutliningSpanKind;
    }
    enum OutliningSpanKind {
        /** Single or multi-line comments */
        Comment = "comment",
        /** Sections marked by '// #region' and '// #endregion' comments */
        Region = "region",
        /** Declarations and expressions */
        Code = "code",
        /** Contiguous blocks of import declarations */
        Imports = "imports"
    }
    enum OutputFileType {
        JavaScript = 0,
        SourceMap = 1,
        Declaration = 2
    }
    enum EndOfLineState {
        None = 0,
        InMultiLineCommentTrivia = 1,
        InSingleQuoteStringLiteral = 2,
        InDoubleQuoteStringLiteral = 3,
        InTemplateHeadOrNoSubstitutionTemplate = 4,
        InTemplateMiddleOrTail = 5,
        InTemplateSubstitutionPosition = 6
    }
    enum TokenClass {
        Punctuation = 0,
        Keyword = 1,
        Operator = 2,
        Comment = 3,
        Whitespace = 4,
        Identifier = 5,
        NumberLiteral = 6,
        BigIntLiteral = 7,
        StringLiteral = 8,
        RegExpLiteral = 9
    }
    interface ClassificationResult {
        finalLexState: EndOfLineState;
        entries: ClassificationInfo[];
    }
    interface ClassificationInfo {
        length: number;
        classification: TokenClass;
    }
    interface Classifier {
        /**
         * Gives lexical classifications of tokens on a line without any syntactic context.
         * For instance, a token consisting of the text 'string' can be either an identifier
         * named 'string' or the keyword 'string', however, because this classifier is not aware,
         * it relies on certain heuristics to give acceptable results. For classifications where
         * speed trumps accuracy, this function is preferable; however, for true accuracy, the
         * syntactic classifier is ideal. In fact, in certain editing scenarios, combining the
         * lexical, syntactic, and semantic classifiers may issue the best user experience.
         *
         * @param text                      The text of a line to classify.
         * @param lexState                  The state of the lexical classifier at the end of the previous line.
         * @param syntacticClassifierAbsent Whether the client is *not* using a syntactic classifier.
         *                                  If there is no syntactic classifier (syntacticClassifierAbsent=true),
         *                                  certain heuristics may be used in its place; however, if there is a
         *                                  syntactic classifier (syntacticClassifierAbsent=false), certain
         *                                  classifications which may be incorrectly categorized will be given
         *                                  back as Identifiers in order to allow the syntactic classifier to
         *                                  subsume the classification.
         * @deprecated Use getLexicalClassifications instead.
         */
        getClassificationsForLine(text: string, lexState: EndOfLineState, syntacticClassifierAbsent: boolean): ClassificationResult;
        getEncodedLexicalClassifications(text: string, endOfLineState: EndOfLineState, syntacticClassifierAbsent: boolean): Classifications;
    }
    enum ScriptElementKind {
        unknown = "",
        warning = "warning",
        /** predefined type (void) or keyword (class) */
        keyword = "keyword",
        /** top level script node */
        scriptElement = "script",
        /** module foo {} */
        moduleElement = "module",
        /** class X {} */
        classElement = "class",
        /** var x = class X {} */
        localClassElement = "local class",
        /** interface Y {} */
        interfaceElement = "interface",
        /** type T = ... */
        typeElement = "type",
        /** enum E */
        enumElement = "enum",
        enumMemberElement = "enum member",
        /**
         * Inside module and script only
         * const v = ..
         */
        variableElement = "var",
        /** Inside function */
        localVariableElement = "local var",
        /**
         * Inside module and script only
         * function f() { }
         */
        functionElement = "function",
        /** Inside function */
        localFunctionElement = "local function",
        /** class X { [public|private]* foo() {} } */
        memberFunctionElement = "method",
        /** class X { [public|private]* [get|set] foo:number; } */
        memberGetAccessorElement = "getter",
        memberSetAccessorElement = "setter",
        /**
         * class X { [public|private]* foo:number; }
         * interface Y { foo:number; }
         */
        memberVariableElement = "property",
        /**
         * class X { constructor() { } }
         * class X { static { } }
         */
        constructorImplementationElement = "constructor",
        /** interface Y { ():number; } */
        callSignatureElement = "call",
        /** interface Y { []:number; } */
        indexSignatureElement = "index",
        /** interface Y { new():Y; } */
        constructSignatureElement = "construct",
        /** function foo(*Y*: string) */
        parameterElement = "parameter",
        typeParameterElement = "type parameter",
        primitiveType = "primitive type",
        label = "label",
        alias = "alias",
        constElement = "const",
        letElement = "let",
        directory = "directory",
        externalModuleName = "external module name",
        /**
         * <JsxTagName attribute1 attribute2={0} />
         * @deprecated
         */
        jsxAttribute = "JSX attribute",
        /** String literal */
        string = "string",
        /** Jsdoc @link: in `{@link C link text}`, the before and after text "{@link " and "}" */
        link = "link",
        /** Jsdoc @link: in `{@link C link text}`, the entity name "C" */
        linkName = "link name",
        /** Jsdoc @link: in `{@link C link text}`, the link text "link text" */
        linkText = "link text"
    }
    enum ScriptElementKindModifier {
        none = "",
        publicMemberModifier = "public",
        privateMemberModifier = "private",
        protectedMemberModifier = "protected",
        exportedModifier = "export",
        ambientModifier = "declare",
        staticModifier = "static",
        abstractModifier = "abstract",
        optionalModifier = "optional",
        deprecatedModifier = "deprecated",
        dtsModifier = ".d.ts",
        tsModifier = ".ts",
        tsxModifier = ".tsx",
        jsModifier = ".js",
        jsxModifier = ".jsx",
        jsonModifier = ".json",
        dmtsModifier = ".d.mts",
        mtsModifier = ".mts",
        mjsModifier = ".mjs",
        dctsModifier = ".d.cts",
        ctsModifier = ".cts",
        cjsModifier = ".cjs"
    }
    enum ClassificationTypeNames {
        comment = "comment",
        identifier = "identifier",
        keyword = "keyword",
        numericLiteral = "number",
        bigintLiteral = "bigint",
        operator = "operator",
        stringLiteral = "string",
        whiteSpace = "whitespace",
        text = "text",
        punctuation = "punctuation",
        className = "class name",
        enumName = "enum name",
        interfaceName = "interface name",
        moduleName = "module name",
        typeParameterName = "type parameter name",
        typeAliasName = "type alias name",
        parameterName = "parameter name",
        docCommentTagName = "doc comment tag name",
        jsxOpenTagName = "jsx open tag name",
        jsxCloseTagName = "jsx close tag name",
        jsxSelfClosingTagName = "jsx self closing tag name",
        jsxAttribute = "jsx attribute",
        jsxText = "jsx text",
        jsxAttributeStringLiteralValue = "jsx attribute string literal value"
    }
    enum ClassificationType {
        comment = 1,
        identifier = 2,
        keyword = 3,
        numericLiteral = 4,
        operator = 5,
        stringLiteral = 6,
        regularExpressionLiteral = 7,
        whiteSpace = 8,
        text = 9,
        punctuation = 10,
        className = 11,
        enumName = 12,
        interfaceName = 13,
        moduleName = 14,
        typeParameterName = 15,
        typeAliasName = 16,
        parameterName = 17,
        docCommentTagName = 18,
        jsxOpenTagName = 19,
        jsxCloseTagName = 20,
        jsxSelfClosingTagName = 21,
        jsxAttribute = 22,
        jsxText = 23,
        jsxAttributeStringLiteralValue = 24,
        bigintLiteral = 25
    }
    interface InlayHintsContext {
        file: SourceFile;
        program: Program;
        cancellationToken: CancellationToken;
        host: LanguageServiceHost;
        span: TextSpan;
        preferences: InlayHintsOptions;
    }
}
declare namespace ts {
    /** The classifier is used for syntactic highlighting in editors via the TSServer */
    function createClassifier(): Classifier;
}
declare namespace ts {
    interface DocumentHighlights {
        fileName: string;
        highlightSpans: HighlightSpan[];
    }
}
declare namespace ts {
    /**
     * The document registry represents a store of SourceFile objects that can be shared between
     * multiple LanguageService instances. A LanguageService instance holds on the SourceFile (AST)
     * of files in the context.
     * SourceFile objects account for most of the memory usage by the language service. Sharing
     * the same DocumentRegistry instance between different instances of LanguageService allow
     * for more efficient memory utilization since all projects will share at least the library
     * file (lib.d.ts).
     *
     * A more advanced use of the document registry is to serialize sourceFile objects to disk
     * and re-hydrate them when needed.
     *
     * To create a default DocumentRegistry, use createDocumentRegistry to create one, and pass it
     * to all subsequent createLanguageService calls.
     */
    interface DocumentRegistry {
        /**
         * Request a stored SourceFile with a given fileName and compilationSettings.
         * The first call to acquire will call createLanguageServiceSourceFile to generate
         * the SourceFile if was not found in the registry.
         *
         * @param fileName The name of the file requested
         * @param compilationSettings Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings.
         * @param scriptSnapshot Text of the file. Only used if the file was not found
         * in the registry and a new one was created.
         * @param version Current version of the file. Only used if the file was not found
         * in the registry and a new one was created.
         */
        acquireDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
        acquireDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
        /**
         * Request an updated version of an already existing SourceFile with a given fileName
         * and compilationSettings. The update will in-turn call updateLanguageServiceSourceFile
         * to get an updated SourceFile.
         *
         * @param fileName The name of the file requested
         * @param compilationSettings Some compilation settings like target affects the
         * shape of a the resulting SourceFile. This allows the DocumentRegistry to store
         * multiple copies of the same file for different compilation settings.
         * @param scriptSnapshot Text of the file.
         * @param version Current version of the file.
         */
        updateDocument(fileName: string, compilationSettings: CompilerOptions, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
        updateDocumentWithKey(fileName: string, path: Path, compilationSettings: CompilerOptions, key: DocumentRegistryBucketKey, scriptSnapshot: IScriptSnapshot, version: string, scriptKind?: ScriptKind): SourceFile;
        getKeyForCompilationSettings(settings: CompilerOptions): DocumentRegistryBucketKey;
        /**
         * Informs the DocumentRegistry that a file is not needed any longer.
         *
         * Note: It is not allowed to call release on a SourceFile that was not acquired from
         * this registry originally.
         *
         * @param fileName The name of the file to be released
         * @param compilationSettings The compilation settings used to acquire the file
         */
        /**@deprecated pass scriptKind for correctness */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions): void;
        /**
         * Informs the DocumentRegistry that a file is not needed any longer.
         *
         * Note: It is not allowed to call release on a SourceFile that was not acquired from
         * this registry originally.
         *
         * @param fileName The name of the file to be released
         * @param compilationSettings The compilation settings used to acquire the file
         * @param scriptKind The script kind of the file to be released
         */
        releaseDocument(fileName: string, compilationSettings: CompilerOptions, scriptKind: ScriptKind): void;
        /**
         * @deprecated pass scriptKind for correctness */
        releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey): void;
        releaseDocumentWithKey(path: Path, key: DocumentRegistryBucketKey, scriptKind: ScriptKind): void;
        reportStats(): string;
    }
    type DocumentRegistryBucketKey = string & {
        __bucketKey: any;
    };
    function createDocumentRegistry(useCaseSensitiveFileNames?: boolean, currentDirectory?: string): DocumentRegistry;
}
declare namespace ts {
    function preProcessFile(sourceText: string, readImportFiles?: boolean, detectJavaScriptImports?: boolean): PreProcessedFileInfo;
}
declare namespace ts {
    interface TranspileOptions {
        compilerOptions?: CompilerOptions;
        fileName?: string;
        reportDiagnostics?: boolean;
        moduleName?: string;
        renamedDependencies?: MapLike<string>;
        transformers?: CustomTransformers;
    }
    interface TranspileOutput {
        outputText: string;
        diagnostics?: Diagnostic[];
        sourceMapText?: string;
    }
    function transpileModule(input: string, transpileOptions: TranspileOptions): TranspileOutput;
    function transpile(input: string, compilerOptions?: CompilerOptions, fileName?: string, diagnostics?: Diagnostic[], moduleName?: string): string;
}
declare namespace ts {
    /** The version of the language service API */
    const servicesVersion = "0.8";
    function toEditorSettings(options: EditorOptions | EditorSettings): EditorSettings;
    function displayPartsToString(displayParts: SymbolDisplayPart[] | undefined): string;
    function getDefaultCompilerOptions(): CompilerOptions;
    function getSupportedCodeFixes(): string[];
    function createLanguageServiceSourceFile(fileName: string, scriptSnapshot: IScriptSnapshot, scriptTarget: ScriptTarget, version: string, setNodeParents: boolean, scriptKind?: ScriptKind): SourceFile;
    function updateLanguageServiceSourceFile(sourceFile: SourceFile, scriptSnapshot: IScriptSnapshot, version: string, textChangeRange: TextChangeRange | undefined, aggressiveChecks?: boolean): SourceFile;
    function createLanguageService(host: LanguageServiceHost, documentRegistry?: DocumentRegistry, syntaxOnlyOrLanguageServiceMode?: boolean | LanguageServiceMode): LanguageService;
    /**
     * Get the path of the default library files (lib.d.ts) as distributed with the typescript
     * node package.
     * The functionality is not supported if the ts module is consumed outside of a node module.
     */
    function getDefaultLibFilePath(options: CompilerOptions): string;
}
declare namespace ts {
    /**
     * Transform one or more nodes using the supplied transformers.
     * @param source A single `Node` or an array of `Node` objects.
     * @param transformers An array of `TransformerFactory` callbacks used to process the transformation.
     * @param compilerOptions Optional compiler options.
     */
    function transform<T extends Node>(source: T | T[], transformers: TransformerFactory<T>[], compilerOptions?: CompilerOptions): TransformationResult<T>;
}
declare namespace ts {
    /** @deprecated Use `factory.createNodeArray` or the factory supplied by your transformation context instead. */
    const createNodeArray: <T extends Node>(elements?: readonly T[] | undefined, hasTrailingComma?: boolean | undefined) => NodeArray<T>;
    /** @deprecated Use `factory.createNumericLiteral` or the factory supplied by your transformation context instead. */
    const createNumericLiteral: (value: string | number, numericLiteralFlags?: TokenFlags | undefined) => NumericLiteral;
    /** @deprecated Use `factory.createBigIntLiteral` or the factory supplied by your transformation context instead. */
    const createBigIntLiteral: (value: string | PseudoBigInt) => BigIntLiteral;
    /** @deprecated Use `factory.createStringLiteral` or the factory supplied by your transformation context instead. */
    const createStringLiteral: {
        (text: string, isSingleQuote?: boolean | undefined): StringLiteral;
        (text: string, isSingleQuote?: boolean | undefined, hasExtendedUnicodeEscape?: boolean | undefined): StringLiteral;
    };
    /** @deprecated Use `factory.createStringLiteralFromNode` or the factory supplied by your transformation context instead. */
    const createStringLiteralFromNode: (sourceNode: PropertyNameLiteral, isSingleQuote?: boolean | undefined) => StringLiteral;
    /** @deprecated Use `factory.createRegularExpressionLiteral` or the factory supplied by your transformation context instead. */
    const createRegularExpressionLiteral: (text: string) => RegularExpressionLiteral;
    /** @deprecated Use `factory.createLoopVariable` or the factory supplied by your transformation context instead. */
    const createLoopVariable: (reservedInNestedScopes?: boolean | undefined) => Identifier;
    /** @deprecated Use `factory.createUniqueName` or the factory supplied by your transformation context instead. */
    const createUniqueName: (text: string, flags?: GeneratedIdentifierFlags | undefined) => Identifier;
    /** @deprecated Use `factory.createPrivateIdentifier` or the factory supplied by your transformation context instead. */
    const createPrivateIdentifier: (text: string) => PrivateIdentifier;
    /** @deprecated Use `factory.createSuper` or the factory supplied by your transformation context instead. */
    const createSuper: () => SuperExpression;
    /** @deprecated Use `factory.createThis` or the factory supplied by your transformation context instead. */
    const createThis: () => ThisExpression;
    /** @deprecated Use `factory.createNull` or the factory supplied by your transformation context instead. */
    const createNull: () => NullLiteral;
    /** @deprecated Use `factory.createTrue` or the factory supplied by your transformation context instead. */
    const createTrue: () => TrueLiteral;
    /** @deprecated Use `factory.createFalse` or the factory supplied by your transformation context instead. */
    const createFalse: () => FalseLiteral;
    /** @deprecated Use `factory.createModifier` or the factory supplied by your transformation context instead. */
    const createModifier: <T extends ModifierSyntaxKind>(kind: T) => ModifierToken<T>;
    /** @deprecated Use `factory.createModifiersFromModifierFlags` or the factory supplied by your transformation context instead. */
    const createModifiersFromModifierFlags: (flags: ModifierFlags) => Modifier[] | undefined;
    /** @deprecated Use `factory.createQualifiedName` or the factory supplied by your transformation context instead. */
    const createQualifiedName: (left: EntityName, right: string | Identifier) => QualifiedName;
    /** @deprecated Use `factory.updateQualifiedName` or the factory supplied by your transformation context instead. */
    const updateQualifiedName: (node: QualifiedName, left: EntityName, right: Identifier) => QualifiedName;
    /** @deprecated Use `factory.createComputedPropertyName` or the factory supplied by your transformation context instead. */
    const createComputedPropertyName: (expression: Expression) => ComputedPropertyName;
    /** @deprecated Use `factory.updateComputedPropertyName` or the factory supplied by your transformation context instead. */
    const updateComputedPropertyName: (node: ComputedPropertyName, expression: Expression) => ComputedPropertyName;
    /** @deprecated Use `factory.createTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeParameterDeclaration: (name: string | Identifier, constraint?: TypeNode | undefined, defaultType?: TypeNode | undefined) => TypeParameterDeclaration;
    /** @deprecated Use `factory.updateTypeParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeParameterDeclaration: (node: TypeParameterDeclaration, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined) => TypeParameterDeclaration;
    /** @deprecated Use `factory.createParameterDeclaration` or the factory supplied by your transformation context instead. */
    const createParameter: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken | undefined, type?: TypeNode | undefined, initializer?: Expression | undefined) => ParameterDeclaration;
    /** @deprecated Use `factory.updateParameterDeclaration` or the factory supplied by your transformation context instead. */
    const updateParameter: (node: ParameterDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => ParameterDeclaration;
    /** @deprecated Use `factory.createDecorator` or the factory supplied by your transformation context instead. */
    const createDecorator: (expression: Expression) => Decorator;
    /** @deprecated Use `factory.updateDecorator` or the factory supplied by your transformation context instead. */
    const updateDecorator: (node: Decorator, expression: Expression) => Decorator;
    /** @deprecated Use `factory.createPropertyDeclaration` or the factory supplied by your transformation context instead. */
    const createProperty: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => PropertyDeclaration;
    /** @deprecated Use `factory.updatePropertyDeclaration` or the factory supplied by your transformation context instead. */
    const updateProperty: (node: PropertyDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => PropertyDeclaration;
    /** @deprecated Use `factory.createMethodDeclaration` or the factory supplied by your transformation context instead. */
    const createMethod: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => MethodDeclaration;
    /** @deprecated Use `factory.updateMethodDeclaration` or the factory supplied by your transformation context instead. */
    const updateMethod: (node: MethodDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => MethodDeclaration;
    /** @deprecated Use `factory.createConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const createConstructor: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined) => ConstructorDeclaration;
    /** @deprecated Use `factory.updateConstructorDeclaration` or the factory supplied by your transformation context instead. */
    const updateConstructor: (node: ConstructorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined) => ConstructorDeclaration;
    /** @deprecated Use `factory.createGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createGetAccessor: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => GetAccessorDeclaration;
    /** @deprecated Use `factory.updateGetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateGetAccessor: (node: GetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => GetAccessorDeclaration;
    /** @deprecated Use `factory.createSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const createSetAccessor: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined) => SetAccessorDeclaration;
    /** @deprecated Use `factory.updateSetAccessorDeclaration` or the factory supplied by your transformation context instead. */
    const updateSetAccessor: (node: SetAccessorDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined) => SetAccessorDeclaration;
    /** @deprecated Use `factory.createCallSignature` or the factory supplied by your transformation context instead. */
    const createCallSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined) => CallSignatureDeclaration;
    /** @deprecated Use `factory.updateCallSignature` or the factory supplied by your transformation context instead. */
    const updateCallSignature: (node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) => CallSignatureDeclaration;
    /** @deprecated Use `factory.createConstructSignature` or the factory supplied by your transformation context instead. */
    const createConstructSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined) => ConstructSignatureDeclaration;
    /** @deprecated Use `factory.updateConstructSignature` or the factory supplied by your transformation context instead. */
    const updateConstructSignature: (node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined) => ConstructSignatureDeclaration;
    /** @deprecated Use `factory.updateIndexSignature` or the factory supplied by your transformation context instead. */
    const updateIndexSignature: (node: IndexSignatureDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => IndexSignatureDeclaration;
    /** @deprecated Use `factory.createKeywordTypeNode` or the factory supplied by your transformation context instead. */
    const createKeywordTypeNode: <TKind extends KeywordTypeSyntaxKind>(kind: TKind) => KeywordTypeNode<TKind>;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNodeWithModifier: (assertsModifier: AssertsKeyword | undefined, parameterName: string | Identifier | ThisTypeNode, type: TypeNode | undefined) => TypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNodeWithModifier: (node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined) => TypePredicateNode;
    /** @deprecated Use `factory.createTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const createTypeReferenceNode: (typeName: string | EntityName, typeArguments?: readonly TypeNode[] | undefined) => TypeReferenceNode;
    /** @deprecated Use `factory.updateTypeReferenceNode` or the factory supplied by your transformation context instead. */
    const updateTypeReferenceNode: (node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) => TypeReferenceNode;
    /** @deprecated Use `factory.createFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const createFunctionTypeNode: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => FunctionTypeNode;
    /** @deprecated Use `factory.updateFunctionTypeNode` or the factory supplied by your transformation context instead. */
    const updateFunctionTypeNode: (node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) => FunctionTypeNode;
    /** @deprecated Use `factory.createConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const createConstructorTypeNode: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.updateConstructorTypeNode` or the factory supplied by your transformation context instead. */
    const updateConstructorTypeNode: (node: ConstructorTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode) => ConstructorTypeNode;
    /** @deprecated Use `factory.createTypeQueryNode` or the factory supplied by your transformation context instead. */
    const createTypeQueryNode: (exprName: EntityName) => TypeQueryNode;
    /** @deprecated Use `factory.updateTypeQueryNode` or the factory supplied by your transformation context instead. */
    const updateTypeQueryNode: (node: TypeQueryNode, exprName: EntityName) => TypeQueryNode;
    /** @deprecated Use `factory.createTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const createTypeLiteralNode: (members: readonly TypeElement[] | undefined) => TypeLiteralNode;
    /** @deprecated Use `factory.updateTypeLiteralNode` or the factory supplied by your transformation context instead. */
    const updateTypeLiteralNode: (node: TypeLiteralNode, members: NodeArray<TypeElement>) => TypeLiteralNode;
    /** @deprecated Use `factory.createArrayTypeNode` or the factory supplied by your transformation context instead. */
    const createArrayTypeNode: (elementType: TypeNode) => ArrayTypeNode;
    /** @deprecated Use `factory.updateArrayTypeNode` or the factory supplied by your transformation context instead. */
    const updateArrayTypeNode: (node: ArrayTypeNode, elementType: TypeNode) => ArrayTypeNode;
    /** @deprecated Use `factory.createTupleTypeNode` or the factory supplied by your transformation context instead. */
    const createTupleTypeNode: (elements: readonly (TypeNode | NamedTupleMember)[]) => TupleTypeNode;
    /** @deprecated Use `factory.updateTupleTypeNode` or the factory supplied by your transformation context instead. */
    const updateTupleTypeNode: (node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]) => TupleTypeNode;
    /** @deprecated Use `factory.createOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const createOptionalTypeNode: (type: TypeNode) => OptionalTypeNode;
    /** @deprecated Use `factory.updateOptionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateOptionalTypeNode: (node: OptionalTypeNode, type: TypeNode) => OptionalTypeNode;
    /** @deprecated Use `factory.createRestTypeNode` or the factory supplied by your transformation context instead. */
    const createRestTypeNode: (type: TypeNode) => RestTypeNode;
    /** @deprecated Use `factory.updateRestTypeNode` or the factory supplied by your transformation context instead. */
    const updateRestTypeNode: (node: RestTypeNode, type: TypeNode) => RestTypeNode;
    /** @deprecated Use `factory.createUnionTypeNode` or the factory supplied by your transformation context instead. */
    const createUnionTypeNode: (types: readonly TypeNode[]) => UnionTypeNode;
    /** @deprecated Use `factory.updateUnionTypeNode` or the factory supplied by your transformation context instead. */
    const updateUnionTypeNode: (node: UnionTypeNode, types: NodeArray<TypeNode>) => UnionTypeNode;
    /** @deprecated Use `factory.createIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const createIntersectionTypeNode: (types: readonly TypeNode[]) => IntersectionTypeNode;
    /** @deprecated Use `factory.updateIntersectionTypeNode` or the factory supplied by your transformation context instead. */
    const updateIntersectionTypeNode: (node: IntersectionTypeNode, types: NodeArray<TypeNode>) => IntersectionTypeNode;
    /** @deprecated Use `factory.createConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const createConditionalTypeNode: (checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) => ConditionalTypeNode;
    /** @deprecated Use `factory.updateConditionalTypeNode` or the factory supplied by your transformation context instead. */
    const updateConditionalTypeNode: (node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode) => ConditionalTypeNode;
    /** @deprecated Use `factory.createInferTypeNode` or the factory supplied by your transformation context instead. */
    const createInferTypeNode: (typeParameter: TypeParameterDeclaration) => InferTypeNode;
    /** @deprecated Use `factory.updateInferTypeNode` or the factory supplied by your transformation context instead. */
    const updateInferTypeNode: (node: InferTypeNode, typeParameter: TypeParameterDeclaration) => InferTypeNode;
    /** @deprecated Use `factory.createImportTypeNode` or the factory supplied by your transformation context instead. */
    const createImportTypeNode: (argument: TypeNode, qualifier?: EntityName | undefined, typeArguments?: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined) => ImportTypeNode;
    /** @deprecated Use `factory.updateImportTypeNode` or the factory supplied by your transformation context instead. */
    const updateImportTypeNode: (node: ImportTypeNode, argument: TypeNode, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean | undefined) => ImportTypeNode;
    /** @deprecated Use `factory.createParenthesizedType` or the factory supplied by your transformation context instead. */
    const createParenthesizedType: (type: TypeNode) => ParenthesizedTypeNode;
    /** @deprecated Use `factory.updateParenthesizedType` or the factory supplied by your transformation context instead. */
    const updateParenthesizedType: (node: ParenthesizedTypeNode, type: TypeNode) => ParenthesizedTypeNode;
    /** @deprecated Use `factory.createThisTypeNode` or the factory supplied by your transformation context instead. */
    const createThisTypeNode: () => ThisTypeNode;
    /** @deprecated Use `factory.updateTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const updateTypeOperatorNode: (node: TypeOperatorNode, type: TypeNode) => TypeOperatorNode;
    /** @deprecated Use `factory.createIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const createIndexedAccessTypeNode: (objectType: TypeNode, indexType: TypeNode) => IndexedAccessTypeNode;
    /** @deprecated Use `factory.updateIndexedAccessTypeNode` or the factory supplied by your transformation context instead. */
    const updateIndexedAccessTypeNode: (node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode) => IndexedAccessTypeNode;
    /** @deprecated Use `factory.createMappedTypeNode` or the factory supplied by your transformation context instead. */
    const createMappedTypeNode: (readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined) => MappedTypeNode;
    /** @deprecated Use `factory.updateMappedTypeNode` or the factory supplied by your transformation context instead. */
    const updateMappedTypeNode: (node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined) => MappedTypeNode;
    /** @deprecated Use `factory.createLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const createLiteralTypeNode: (literal: LiteralExpression | BooleanLiteral | PrefixUnaryExpression | NullLiteral) => LiteralTypeNode;
    /** @deprecated Use `factory.updateLiteralTypeNode` or the factory supplied by your transformation context instead. */
    const updateLiteralTypeNode: (node: LiteralTypeNode, literal: LiteralExpression | BooleanLiteral | PrefixUnaryExpression | NullLiteral) => LiteralTypeNode;
    /** @deprecated Use `factory.createObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const createObjectBindingPattern: (elements: readonly BindingElement[]) => ObjectBindingPattern;
    /** @deprecated Use `factory.updateObjectBindingPattern` or the factory supplied by your transformation context instead. */
    const updateObjectBindingPattern: (node: ObjectBindingPattern, elements: readonly BindingElement[]) => ObjectBindingPattern;
    /** @deprecated Use `factory.createArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const createArrayBindingPattern: (elements: readonly ArrayBindingElement[]) => ArrayBindingPattern;
    /** @deprecated Use `factory.updateArrayBindingPattern` or the factory supplied by your transformation context instead. */
    const updateArrayBindingPattern: (node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]) => ArrayBindingPattern;
    /** @deprecated Use `factory.createBindingElement` or the factory supplied by your transformation context instead. */
    const createBindingElement: (dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression | undefined) => BindingElement;
    /** @deprecated Use `factory.updateBindingElement` or the factory supplied by your transformation context instead. */
    const updateBindingElement: (node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) => BindingElement;
    /** @deprecated Use `factory.createArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const createArrayLiteral: (elements?: readonly Expression[] | undefined, multiLine?: boolean | undefined) => ArrayLiteralExpression;
    /** @deprecated Use `factory.updateArrayLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateArrayLiteral: (node: ArrayLiteralExpression, elements: readonly Expression[]) => ArrayLiteralExpression;
    /** @deprecated Use `factory.createObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const createObjectLiteral: (properties?: readonly ObjectLiteralElementLike[] | undefined, multiLine?: boolean | undefined) => ObjectLiteralExpression;
    /** @deprecated Use `factory.updateObjectLiteralExpression` or the factory supplied by your transformation context instead. */
    const updateObjectLiteral: (node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]) => ObjectLiteralExpression;
    /** @deprecated Use `factory.createPropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const createPropertyAccess: (expression: Expression, name: string | MemberName) => PropertyAccessExpression;
    /** @deprecated Use `factory.updatePropertyAccessExpression` or the factory supplied by your transformation context instead. */
    const updatePropertyAccess: (node: PropertyAccessExpression, expression: Expression, name: MemberName) => PropertyAccessExpression;
    /** @deprecated Use `factory.createPropertyAccessChain` or the factory supplied by your transformation context instead. */
    const createPropertyAccessChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | MemberName) => PropertyAccessChain;
    /** @deprecated Use `factory.updatePropertyAccessChain` or the factory supplied by your transformation context instead. */
    const updatePropertyAccessChain: (node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: MemberName) => PropertyAccessChain;
    /** @deprecated Use `factory.createElementAccessExpression` or the factory supplied by your transformation context instead. */
    const createElementAccess: (expression: Expression, index: number | Expression) => ElementAccessExpression;
    /** @deprecated Use `factory.updateElementAccessExpression` or the factory supplied by your transformation context instead. */
    const updateElementAccess: (node: ElementAccessExpression, expression: Expression, argumentExpression: Expression) => ElementAccessExpression;
    /** @deprecated Use `factory.createElementAccessChain` or the factory supplied by your transformation context instead. */
    const createElementAccessChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression) => ElementAccessChain;
    /** @deprecated Use `factory.updateElementAccessChain` or the factory supplied by your transformation context instead. */
    const updateElementAccessChain: (node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression) => ElementAccessChain;
    /** @deprecated Use `factory.createCallExpression` or the factory supplied by your transformation context instead. */
    const createCall: (expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => CallExpression;
    /** @deprecated Use `factory.updateCallExpression` or the factory supplied by your transformation context instead. */
    const updateCall: (node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) => CallExpression;
    /** @deprecated Use `factory.createCallChain` or the factory supplied by your transformation context instead. */
    const createCallChain: (expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => CallChain;
    /** @deprecated Use `factory.updateCallChain` or the factory supplied by your transformation context instead. */
    const updateCallChain: (node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]) => CallChain;
    /** @deprecated Use `factory.createNewExpression` or the factory supplied by your transformation context instead. */
    const createNew: (expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => NewExpression;
    /** @deprecated Use `factory.updateNewExpression` or the factory supplied by your transformation context instead. */
    const updateNew: (node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined) => NewExpression;
    /** @deprecated Use `factory.createTypeAssertion` or the factory supplied by your transformation context instead. */
    const createTypeAssertion: (type: TypeNode, expression: Expression) => TypeAssertion;
    /** @deprecated Use `factory.updateTypeAssertion` or the factory supplied by your transformation context instead. */
    const updateTypeAssertion: (node: TypeAssertion, type: TypeNode, expression: Expression) => TypeAssertion;
    /** @deprecated Use `factory.createParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const createParen: (expression: Expression) => ParenthesizedExpression;
    /** @deprecated Use `factory.updateParenthesizedExpression` or the factory supplied by your transformation context instead. */
    const updateParen: (node: ParenthesizedExpression, expression: Expression) => ParenthesizedExpression;
    /** @deprecated Use `factory.createFunctionExpression` or the factory supplied by your transformation context instead. */
    const createFunctionExpression: (modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block) => FunctionExpression;
    /** @deprecated Use `factory.updateFunctionExpression` or the factory supplied by your transformation context instead. */
    const updateFunctionExpression: (node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block) => FunctionExpression;
    /** @deprecated Use `factory.createDeleteExpression` or the factory supplied by your transformation context instead. */
    const createDelete: (expression: Expression) => DeleteExpression;
    /** @deprecated Use `factory.updateDeleteExpression` or the factory supplied by your transformation context instead. */
    const updateDelete: (node: DeleteExpression, expression: Expression) => DeleteExpression;
    /** @deprecated Use `factory.createTypeOfExpression` or the factory supplied by your transformation context instead. */
    const createTypeOf: (expression: Expression) => TypeOfExpression;
    /** @deprecated Use `factory.updateTypeOfExpression` or the factory supplied by your transformation context instead. */
    const updateTypeOf: (node: TypeOfExpression, expression: Expression) => TypeOfExpression;
    /** @deprecated Use `factory.createVoidExpression` or the factory supplied by your transformation context instead. */
    const createVoid: (expression: Expression) => VoidExpression;
    /** @deprecated Use `factory.updateVoidExpression` or the factory supplied by your transformation context instead. */
    const updateVoid: (node: VoidExpression, expression: Expression) => VoidExpression;
    /** @deprecated Use `factory.createAwaitExpression` or the factory supplied by your transformation context instead. */
    const createAwait: (expression: Expression) => AwaitExpression;
    /** @deprecated Use `factory.updateAwaitExpression` or the factory supplied by your transformation context instead. */
    const updateAwait: (node: AwaitExpression, expression: Expression) => AwaitExpression;
    /** @deprecated Use `factory.createPrefixExpression` or the factory supplied by your transformation context instead. */
    const createPrefix: (operator: PrefixUnaryOperator, operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use `factory.updatePrefixExpression` or the factory supplied by your transformation context instead. */
    const updatePrefix: (node: PrefixUnaryExpression, operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use `factory.createPostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const createPostfix: (operand: Expression, operator: PostfixUnaryOperator) => PostfixUnaryExpression;
    /** @deprecated Use `factory.updatePostfixUnaryExpression` or the factory supplied by your transformation context instead. */
    const updatePostfix: (node: PostfixUnaryExpression, operand: Expression) => PostfixUnaryExpression;
    /** @deprecated Use `factory.createBinaryExpression` or the factory supplied by your transformation context instead. */
    const createBinary: (left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.updateConditionalExpression` or the factory supplied by your transformation context instead. */
    const updateConditional: (node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression) => ConditionalExpression;
    /** @deprecated Use `factory.createTemplateExpression` or the factory supplied by your transformation context instead. */
    const createTemplateExpression: (head: TemplateHead, templateSpans: readonly TemplateSpan[]) => TemplateExpression;
    /** @deprecated Use `factory.updateTemplateExpression` or the factory supplied by your transformation context instead. */
    const updateTemplateExpression: (node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]) => TemplateExpression;
    /** @deprecated Use `factory.createTemplateHead` or the factory supplied by your transformation context instead. */
    const createTemplateHead: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateHead;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateHead;
    };
    /** @deprecated Use `factory.createTemplateMiddle` or the factory supplied by your transformation context instead. */
    const createTemplateMiddle: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateMiddle;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateMiddle;
    };
    /** @deprecated Use `factory.createTemplateTail` or the factory supplied by your transformation context instead. */
    const createTemplateTail: {
        (text: string, rawText?: string | undefined, templateFlags?: TokenFlags | undefined): TemplateTail;
        (text: string | undefined, rawText: string, templateFlags?: TokenFlags | undefined): TemplateTail;
    };
    /** @deprecated Use `factory.createNoSubstitutionTemplateLiteral` or the factory supplied by your transformation context instead. */
    const createNoSubstitutionTemplateLiteral: {
        (text: string, rawText?: string | undefined): NoSubstitutionTemplateLiteral;
        (text: string | undefined, rawText: string): NoSubstitutionTemplateLiteral;
    };
    /** @deprecated Use `factory.updateYieldExpression` or the factory supplied by your transformation context instead. */
    const updateYield: (node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined) => YieldExpression;
    /** @deprecated Use `factory.createSpreadExpression` or the factory supplied by your transformation context instead. */
    const createSpread: (expression: Expression) => SpreadElement;
    /** @deprecated Use `factory.updateSpreadExpression` or the factory supplied by your transformation context instead. */
    const updateSpread: (node: SpreadElement, expression: Expression) => SpreadElement;
    /** @deprecated Use `factory.createOmittedExpression` or the factory supplied by your transformation context instead. */
    const createOmittedExpression: () => OmittedExpression;
    /** @deprecated Use `factory.createAsExpression` or the factory supplied by your transformation context instead. */
    const createAsExpression: (expression: Expression, type: TypeNode) => AsExpression;
    /** @deprecated Use `factory.updateAsExpression` or the factory supplied by your transformation context instead. */
    const updateAsExpression: (node: AsExpression, expression: Expression, type: TypeNode) => AsExpression;
    /** @deprecated Use `factory.createNonNullExpression` or the factory supplied by your transformation context instead. */
    const createNonNullExpression: (expression: Expression) => NonNullExpression;
    /** @deprecated Use `factory.updateNonNullExpression` or the factory supplied by your transformation context instead. */
    const updateNonNullExpression: (node: NonNullExpression, expression: Expression) => NonNullExpression;
    /** @deprecated Use `factory.createNonNullChain` or the factory supplied by your transformation context instead. */
    const createNonNullChain: (expression: Expression) => NonNullChain;
    /** @deprecated Use `factory.updateNonNullChain` or the factory supplied by your transformation context instead. */
    const updateNonNullChain: (node: NonNullChain, expression: Expression) => NonNullChain;
    /** @deprecated Use `factory.createMetaProperty` or the factory supplied by your transformation context instead. */
    const createMetaProperty: (keywordToken: SyntaxKind.ImportKeyword | SyntaxKind.NewKeyword, name: Identifier) => MetaProperty;
    /** @deprecated Use `factory.updateMetaProperty` or the factory supplied by your transformation context instead. */
    const updateMetaProperty: (node: MetaProperty, name: Identifier) => MetaProperty;
    /** @deprecated Use `factory.createTemplateSpan` or the factory supplied by your transformation context instead. */
    const createTemplateSpan: (expression: Expression, literal: TemplateMiddle | TemplateTail) => TemplateSpan;
    /** @deprecated Use `factory.updateTemplateSpan` or the factory supplied by your transformation context instead. */
    const updateTemplateSpan: (node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail) => TemplateSpan;
    /** @deprecated Use `factory.createSemicolonClassElement` or the factory supplied by your transformation context instead. */
    const createSemicolonClassElement: () => SemicolonClassElement;
    /** @deprecated Use `factory.createBlock` or the factory supplied by your transformation context instead. */
    const createBlock: (statements: readonly Statement[], multiLine?: boolean | undefined) => Block;
    /** @deprecated Use `factory.updateBlock` or the factory supplied by your transformation context instead. */
    const updateBlock: (node: Block, statements: readonly Statement[]) => Block;
    /** @deprecated Use `factory.createVariableStatement` or the factory supplied by your transformation context instead. */
    const createVariableStatement: (modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]) => VariableStatement;
    /** @deprecated Use `factory.updateVariableStatement` or the factory supplied by your transformation context instead. */
    const updateVariableStatement: (node: VariableStatement, modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList) => VariableStatement;
    /** @deprecated Use `factory.createEmptyStatement` or the factory supplied by your transformation context instead. */
    const createEmptyStatement: () => EmptyStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createExpressionStatement: (expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateExpressionStatement: (node: ExpressionStatement, expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.createExpressionStatement` or the factory supplied by your transformation context instead. */
    const createStatement: (expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.updateExpressionStatement` or the factory supplied by your transformation context instead. */
    const updateStatement: (node: ExpressionStatement, expression: Expression) => ExpressionStatement;
    /** @deprecated Use `factory.createIfStatement` or the factory supplied by your transformation context instead. */
    const createIf: (expression: Expression, thenStatement: Statement, elseStatement?: Statement | undefined) => IfStatement;
    /** @deprecated Use `factory.updateIfStatement` or the factory supplied by your transformation context instead. */
    const updateIf: (node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined) => IfStatement;
    /** @deprecated Use `factory.createDoStatement` or the factory supplied by your transformation context instead. */
    const createDo: (statement: Statement, expression: Expression) => DoStatement;
    /** @deprecated Use `factory.updateDoStatement` or the factory supplied by your transformation context instead. */
    const updateDo: (node: DoStatement, statement: Statement, expression: Expression) => DoStatement;
    /** @deprecated Use `factory.createWhileStatement` or the factory supplied by your transformation context instead. */
    const createWhile: (expression: Expression, statement: Statement) => WhileStatement;
    /** @deprecated Use `factory.updateWhileStatement` or the factory supplied by your transformation context instead. */
    const updateWhile: (node: WhileStatement, expression: Expression, statement: Statement) => WhileStatement;
    /** @deprecated Use `factory.createForStatement` or the factory supplied by your transformation context instead. */
    const createFor: (initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) => ForStatement;
    /** @deprecated Use `factory.updateForStatement` or the factory supplied by your transformation context instead. */
    const updateFor: (node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement) => ForStatement;
    /** @deprecated Use `factory.createForInStatement` or the factory supplied by your transformation context instead. */
    const createForIn: (initializer: ForInitializer, expression: Expression, statement: Statement) => ForInStatement;
    /** @deprecated Use `factory.updateForInStatement` or the factory supplied by your transformation context instead. */
    const updateForIn: (node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement) => ForInStatement;
    /** @deprecated Use `factory.createForOfStatement` or the factory supplied by your transformation context instead. */
    const createForOf: (awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) => ForOfStatement;
    /** @deprecated Use `factory.updateForOfStatement` or the factory supplied by your transformation context instead. */
    const updateForOf: (node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement) => ForOfStatement;
    /** @deprecated Use `factory.createContinueStatement` or the factory supplied by your transformation context instead. */
    const createContinue: (label?: string | Identifier | undefined) => ContinueStatement;
    /** @deprecated Use `factory.updateContinueStatement` or the factory supplied by your transformation context instead. */
    const updateContinue: (node: ContinueStatement, label: Identifier | undefined) => ContinueStatement;
    /** @deprecated Use `factory.createBreakStatement` or the factory supplied by your transformation context instead. */
    const createBreak: (label?: string | Identifier | undefined) => BreakStatement;
    /** @deprecated Use `factory.updateBreakStatement` or the factory supplied by your transformation context instead. */
    const updateBreak: (node: BreakStatement, label: Identifier | undefined) => BreakStatement;
    /** @deprecated Use `factory.createReturnStatement` or the factory supplied by your transformation context instead. */
    const createReturn: (expression?: Expression | undefined) => ReturnStatement;
    /** @deprecated Use `factory.updateReturnStatement` or the factory supplied by your transformation context instead. */
    const updateReturn: (node: ReturnStatement, expression: Expression | undefined) => ReturnStatement;
    /** @deprecated Use `factory.createWithStatement` or the factory supplied by your transformation context instead. */
    const createWith: (expression: Expression, statement: Statement) => WithStatement;
    /** @deprecated Use `factory.updateWithStatement` or the factory supplied by your transformation context instead. */
    const updateWith: (node: WithStatement, expression: Expression, statement: Statement) => WithStatement;
    /** @deprecated Use `factory.createSwitchStatement` or the factory supplied by your transformation context instead. */
    const createSwitch: (expression: Expression, caseBlock: CaseBlock) => SwitchStatement;
    /** @deprecated Use `factory.updateSwitchStatement` or the factory supplied by your transformation context instead. */
    const updateSwitch: (node: SwitchStatement, expression: Expression, caseBlock: CaseBlock) => SwitchStatement;
    /** @deprecated Use `factory.createLabelStatement` or the factory supplied by your transformation context instead. */
    const createLabel: (label: string | Identifier, statement: Statement) => LabeledStatement;
    /** @deprecated Use `factory.updateLabelStatement` or the factory supplied by your transformation context instead. */
    const updateLabel: (node: LabeledStatement, label: Identifier, statement: Statement) => LabeledStatement;
    /** @deprecated Use `factory.createThrowStatement` or the factory supplied by your transformation context instead. */
    const createThrow: (expression: Expression) => ThrowStatement;
    /** @deprecated Use `factory.updateThrowStatement` or the factory supplied by your transformation context instead. */
    const updateThrow: (node: ThrowStatement, expression: Expression) => ThrowStatement;
    /** @deprecated Use `factory.createTryStatement` or the factory supplied by your transformation context instead. */
    const createTry: (tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) => TryStatement;
    /** @deprecated Use `factory.updateTryStatement` or the factory supplied by your transformation context instead. */
    const updateTry: (node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined) => TryStatement;
    /** @deprecated Use `factory.createDebuggerStatement` or the factory supplied by your transformation context instead. */
    const createDebuggerStatement: () => DebuggerStatement;
    /** @deprecated Use `factory.createVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const createVariableDeclarationList: (declarations: readonly VariableDeclaration[], flags?: NodeFlags | undefined) => VariableDeclarationList;
    /** @deprecated Use `factory.updateVariableDeclarationList` or the factory supplied by your transformation context instead. */
    const updateVariableDeclarationList: (node: VariableDeclarationList, declarations: readonly VariableDeclaration[]) => VariableDeclarationList;
    /** @deprecated Use `factory.createFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const createFunctionDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => FunctionDeclaration;
    /** @deprecated Use `factory.updateFunctionDeclaration` or the factory supplied by your transformation context instead. */
    const updateFunctionDeclaration: (node: FunctionDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined) => FunctionDeclaration;
    /** @deprecated Use `factory.createClassDeclaration` or the factory supplied by your transformation context instead. */
    const createClassDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassDeclaration;
    /** @deprecated Use `factory.updateClassDeclaration` or the factory supplied by your transformation context instead. */
    const updateClassDeclaration: (node: ClassDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassDeclaration;
    /** @deprecated Use `factory.createInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const createInterfaceDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]) => InterfaceDeclaration;
    /** @deprecated Use `factory.updateInterfaceDeclaration` or the factory supplied by your transformation context instead. */
    const updateInterfaceDeclaration: (node: InterfaceDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]) => InterfaceDeclaration;
    /** @deprecated Use `factory.createTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const createTypeAliasDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode) => TypeAliasDeclaration;
    /** @deprecated Use `factory.updateTypeAliasDeclaration` or the factory supplied by your transformation context instead. */
    const updateTypeAliasDeclaration: (node: TypeAliasDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode) => TypeAliasDeclaration;
    /** @deprecated Use `factory.createEnumDeclaration` or the factory supplied by your transformation context instead. */
    const createEnumDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: string | Identifier, members: readonly EnumMember[]) => EnumDeclaration;
    /** @deprecated Use `factory.updateEnumDeclaration` or the factory supplied by your transformation context instead. */
    const updateEnumDeclaration: (node: EnumDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: Identifier, members: readonly EnumMember[]) => EnumDeclaration;
    /** @deprecated Use `factory.createModuleDeclaration` or the factory supplied by your transformation context instead. */
    const createModuleDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags | undefined) => ModuleDeclaration;
    /** @deprecated Use `factory.updateModuleDeclaration` or the factory supplied by your transformation context instead. */
    const updateModuleDeclaration: (node: ModuleDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, name: ModuleName, body: ModuleBody | undefined) => ModuleDeclaration;
    /** @deprecated Use `factory.createModuleBlock` or the factory supplied by your transformation context instead. */
    const createModuleBlock: (statements: readonly Statement[]) => ModuleBlock;
    /** @deprecated Use `factory.updateModuleBlock` or the factory supplied by your transformation context instead. */
    const updateModuleBlock: (node: ModuleBlock, statements: readonly Statement[]) => ModuleBlock;
    /** @deprecated Use `factory.createCaseBlock` or the factory supplied by your transformation context instead. */
    const createCaseBlock: (clauses: readonly CaseOrDefaultClause[]) => CaseBlock;
    /** @deprecated Use `factory.updateCaseBlock` or the factory supplied by your transformation context instead. */
    const updateCaseBlock: (node: CaseBlock, clauses: readonly CaseOrDefaultClause[]) => CaseBlock;
    /** @deprecated Use `factory.createNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const createNamespaceExportDeclaration: (name: string | Identifier) => NamespaceExportDeclaration;
    /** @deprecated Use `factory.updateNamespaceExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateNamespaceExportDeclaration: (node: NamespaceExportDeclaration, name: Identifier) => NamespaceExportDeclaration;
    /** @deprecated Use `factory.createImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const createImportEqualsDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference) => ImportEqualsDeclaration;
    /** @deprecated Use `factory.updateImportEqualsDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportEqualsDeclaration: (node: ImportEqualsDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference) => ImportEqualsDeclaration;
    /** @deprecated Use `factory.createImportDeclaration` or the factory supplied by your transformation context instead. */
    const createImportDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause?: AssertClause | undefined) => ImportDeclaration;
    /** @deprecated Use `factory.updateImportDeclaration` or the factory supplied by your transformation context instead. */
    const updateImportDeclaration: (node: ImportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, assertClause: AssertClause | undefined) => ImportDeclaration;
    /** @deprecated Use `factory.createNamespaceImport` or the factory supplied by your transformation context instead. */
    const createNamespaceImport: (name: Identifier) => NamespaceImport;
    /** @deprecated Use `factory.updateNamespaceImport` or the factory supplied by your transformation context instead. */
    const updateNamespaceImport: (node: NamespaceImport, name: Identifier) => NamespaceImport;
    /** @deprecated Use `factory.createNamedImports` or the factory supplied by your transformation context instead. */
    const createNamedImports: (elements: readonly ImportSpecifier[]) => NamedImports;
    /** @deprecated Use `factory.updateNamedImports` or the factory supplied by your transformation context instead. */
    const updateNamedImports: (node: NamedImports, elements: readonly ImportSpecifier[]) => NamedImports;
    /** @deprecated Use `factory.createImportSpecifier` or the factory supplied by your transformation context instead. */
    const createImportSpecifier: (isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ImportSpecifier;
    /** @deprecated Use `factory.updateImportSpecifier` or the factory supplied by your transformation context instead. */
    const updateImportSpecifier: (node: ImportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ImportSpecifier;
    /** @deprecated Use `factory.createExportAssignment` or the factory supplied by your transformation context instead. */
    const createExportAssignment: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, isExportEquals: boolean | undefined, expression: Expression) => ExportAssignment;
    /** @deprecated Use `factory.updateExportAssignment` or the factory supplied by your transformation context instead. */
    const updateExportAssignment: (node: ExportAssignment, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, expression: Expression) => ExportAssignment;
    /** @deprecated Use `factory.createNamedExports` or the factory supplied by your transformation context instead. */
    const createNamedExports: (elements: readonly ExportSpecifier[]) => NamedExports;
    /** @deprecated Use `factory.updateNamedExports` or the factory supplied by your transformation context instead. */
    const updateNamedExports: (node: NamedExports, elements: readonly ExportSpecifier[]) => NamedExports;
    /** @deprecated Use `factory.createExportSpecifier` or the factory supplied by your transformation context instead. */
    const createExportSpecifier: (isTypeOnly: boolean, propertyName: string | Identifier | undefined, name: string | Identifier) => ExportSpecifier;
    /** @deprecated Use `factory.updateExportSpecifier` or the factory supplied by your transformation context instead. */
    const updateExportSpecifier: (node: ExportSpecifier, isTypeOnly: boolean, propertyName: Identifier | undefined, name: Identifier) => ExportSpecifier;
    /** @deprecated Use `factory.createExternalModuleReference` or the factory supplied by your transformation context instead. */
    const createExternalModuleReference: (expression: Expression) => ExternalModuleReference;
    /** @deprecated Use `factory.updateExternalModuleReference` or the factory supplied by your transformation context instead. */
    const updateExternalModuleReference: (node: ExternalModuleReference, expression: Expression) => ExternalModuleReference;
    /** @deprecated Use `factory.createJSDocTypeExpression` or the factory supplied by your transformation context instead. */
    const createJSDocTypeExpression: (type: TypeNode) => JSDocTypeExpression;
    /** @deprecated Use `factory.createJSDocTypeTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypeTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTypeTag;
    /** @deprecated Use `factory.createJSDocReturnTag` or the factory supplied by your transformation context instead. */
    const createJSDocReturnTag: (tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocReturnTag;
    /** @deprecated Use `factory.createJSDocThisTag` or the factory supplied by your transformation context instead. */
    const createJSDocThisTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocThisTag;
    /** @deprecated Use `factory.createJSDocComment` or the factory supplied by your transformation context instead. */
    const createJSDocComment: (comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined) => JSDoc;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParameterTag: (tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, isNameFirst?: boolean | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocParameterTag;
    /** @deprecated Use `factory.createJSDocClassTag` or the factory supplied by your transformation context instead. */
    const createJSDocClassTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocClassTag;
    /** @deprecated Use `factory.createJSDocAugmentsTag` or the factory supplied by your transformation context instead. */
    const createJSDocAugmentsTag: (tagName: Identifier | undefined, className: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    }, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocAugmentsTag;
    /** @deprecated Use `factory.createJSDocEnumTag` or the factory supplied by your transformation context instead. */
    const createJSDocEnumTag: (tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocEnumTag;
    /** @deprecated Use `factory.createJSDocTemplateTag` or the factory supplied by your transformation context instead. */
    const createJSDocTemplateTag: (tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTemplateTag;
    /** @deprecated Use `factory.createJSDocTypedefTag` or the factory supplied by your transformation context instead. */
    const createJSDocTypedefTag: (tagName: Identifier | undefined, typeExpression?: JSDocTypeLiteral | JSDocTypeExpression | undefined, fullName?: Identifier | JSDocNamespaceDeclaration | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocTypedefTag;
    /** @deprecated Use `factory.createJSDocCallbackTag` or the factory supplied by your transformation context instead. */
    const createJSDocCallbackTag: (tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocCallbackTag;
    /** @deprecated Use `factory.createJSDocSignature` or the factory supplied by your transformation context instead. */
    const createJSDocSignature: (typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag | undefined) => JSDocSignature;
    /** @deprecated Use `factory.createJSDocPropertyTag` or the factory supplied by your transformation context instead. */
    const createJSDocPropertyTag: (tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, isNameFirst?: boolean | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPropertyTag;
    /** @deprecated Use `factory.createJSDocTypeLiteral` or the factory supplied by your transformation context instead. */
    const createJSDocTypeLiteral: (jsDocPropertyTags?: readonly JSDocPropertyLikeTag[] | undefined, isArrayType?: boolean | undefined) => JSDocTypeLiteral;
    /** @deprecated Use `factory.createJSDocImplementsTag` or the factory supplied by your transformation context instead. */
    const createJSDocImplementsTag: (tagName: Identifier | undefined, className: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    }, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocImplementsTag;
    /** @deprecated Use `factory.createJSDocAuthorTag` or the factory supplied by your transformation context instead. */
    const createJSDocAuthorTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocAuthorTag;
    /** @deprecated Use `factory.createJSDocPublicTag` or the factory supplied by your transformation context instead. */
    const createJSDocPublicTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPublicTag;
    /** @deprecated Use `factory.createJSDocPrivateTag` or the factory supplied by your transformation context instead. */
    const createJSDocPrivateTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocPrivateTag;
    /** @deprecated Use `factory.createJSDocProtectedTag` or the factory supplied by your transformation context instead. */
    const createJSDocProtectedTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocProtectedTag;
    /** @deprecated Use `factory.createJSDocReadonlyTag` or the factory supplied by your transformation context instead. */
    const createJSDocReadonlyTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocReadonlyTag;
    /** @deprecated Use `factory.createJSDocUnknownTag` or the factory supplied by your transformation context instead. */
    const createJSDocTag: (tagName: Identifier, comment?: string | NodeArray<JSDocComment> | undefined) => JSDocUnknownTag;
    /** @deprecated Use `factory.createJsxElement` or the factory supplied by your transformation context instead. */
    const createJsxElement: (openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) => JsxElement;
    /** @deprecated Use `factory.updateJsxElement` or the factory supplied by your transformation context instead. */
    const updateJsxElement: (node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement) => JsxElement;
    /** @deprecated Use `factory.createJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxSelfClosingElement: (tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxSelfClosingElement;
    /** @deprecated Use `factory.updateJsxSelfClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxSelfClosingElement: (node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxSelfClosingElement;
    /** @deprecated Use `factory.createJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const createJsxOpeningElement: (tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxOpeningElement;
    /** @deprecated Use `factory.updateJsxOpeningElement` or the factory supplied by your transformation context instead. */
    const updateJsxOpeningElement: (node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes) => JsxOpeningElement;
    /** @deprecated Use `factory.createJsxClosingElement` or the factory supplied by your transformation context instead. */
    const createJsxClosingElement: (tagName: JsxTagNameExpression) => JsxClosingElement;
    /** @deprecated Use `factory.updateJsxClosingElement` or the factory supplied by your transformation context instead. */
    const updateJsxClosingElement: (node: JsxClosingElement, tagName: JsxTagNameExpression) => JsxClosingElement;
    /** @deprecated Use `factory.createJsxFragment` or the factory supplied by your transformation context instead. */
    const createJsxFragment: (openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) => JsxFragment;
    /** @deprecated Use `factory.createJsxText` or the factory supplied by your transformation context instead. */
    const createJsxText: (text: string, containsOnlyTriviaWhiteSpaces?: boolean | undefined) => JsxText;
    /** @deprecated Use `factory.updateJsxText` or the factory supplied by your transformation context instead. */
    const updateJsxText: (node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean | undefined) => JsxText;
    /** @deprecated Use `factory.createJsxOpeningFragment` or the factory supplied by your transformation context instead. */
    const createJsxOpeningFragment: () => JsxOpeningFragment;
    /** @deprecated Use `factory.createJsxJsxClosingFragment` or the factory supplied by your transformation context instead. */
    const createJsxJsxClosingFragment: () => JsxClosingFragment;
    /** @deprecated Use `factory.updateJsxFragment` or the factory supplied by your transformation context instead. */
    const updateJsxFragment: (node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment) => JsxFragment;
    /** @deprecated Use `factory.createJsxAttribute` or the factory supplied by your transformation context instead. */
    const createJsxAttribute: (name: Identifier, initializer: StringLiteral | JsxExpression | undefined) => JsxAttribute;
    /** @deprecated Use `factory.updateJsxAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxAttribute: (node: JsxAttribute, name: Identifier, initializer: StringLiteral | JsxExpression | undefined) => JsxAttribute;
    /** @deprecated Use `factory.createJsxAttributes` or the factory supplied by your transformation context instead. */
    const createJsxAttributes: (properties: readonly JsxAttributeLike[]) => JsxAttributes;
    /** @deprecated Use `factory.updateJsxAttributes` or the factory supplied by your transformation context instead. */
    const updateJsxAttributes: (node: JsxAttributes, properties: readonly JsxAttributeLike[]) => JsxAttributes;
    /** @deprecated Use `factory.createJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const createJsxSpreadAttribute: (expression: Expression) => JsxSpreadAttribute;
    /** @deprecated Use `factory.updateJsxSpreadAttribute` or the factory supplied by your transformation context instead. */
    const updateJsxSpreadAttribute: (node: JsxSpreadAttribute, expression: Expression) => JsxSpreadAttribute;
    /** @deprecated Use `factory.createJsxExpression` or the factory supplied by your transformation context instead. */
    const createJsxExpression: (dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined) => JsxExpression;
    /** @deprecated Use `factory.updateJsxExpression` or the factory supplied by your transformation context instead. */
    const updateJsxExpression: (node: JsxExpression, expression: Expression | undefined) => JsxExpression;
    /** @deprecated Use `factory.createCaseClause` or the factory supplied by your transformation context instead. */
    const createCaseClause: (expression: Expression, statements: readonly Statement[]) => CaseClause;
    /** @deprecated Use `factory.updateCaseClause` or the factory supplied by your transformation context instead. */
    const updateCaseClause: (node: CaseClause, expression: Expression, statements: readonly Statement[]) => CaseClause;
    /** @deprecated Use `factory.createDefaultClause` or the factory supplied by your transformation context instead. */
    const createDefaultClause: (statements: readonly Statement[]) => DefaultClause;
    /** @deprecated Use `factory.updateDefaultClause` or the factory supplied by your transformation context instead. */
    const updateDefaultClause: (node: DefaultClause, statements: readonly Statement[]) => DefaultClause;
    /** @deprecated Use `factory.createHeritageClause` or the factory supplied by your transformation context instead. */
    const createHeritageClause: (token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword, types: readonly ExpressionWithTypeArguments[]) => HeritageClause;
    /** @deprecated Use `factory.updateHeritageClause` or the factory supplied by your transformation context instead. */
    const updateHeritageClause: (node: HeritageClause, types: readonly ExpressionWithTypeArguments[]) => HeritageClause;
    /** @deprecated Use `factory.createCatchClause` or the factory supplied by your transformation context instead. */
    const createCatchClause: (variableDeclaration: string | VariableDeclaration | BindingName | undefined, block: Block) => CatchClause;
    /** @deprecated Use `factory.updateCatchClause` or the factory supplied by your transformation context instead. */
    const updateCatchClause: (node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block) => CatchClause;
    /** @deprecated Use `factory.createPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createPropertyAssignment: (name: string | PropertyName, initializer: Expression) => PropertyAssignment;
    /** @deprecated Use `factory.updatePropertyAssignment` or the factory supplied by your transformation context instead. */
    const updatePropertyAssignment: (node: PropertyAssignment, name: PropertyName, initializer: Expression) => PropertyAssignment;
    /** @deprecated Use `factory.createShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const createShorthandPropertyAssignment: (name: string | Identifier, objectAssignmentInitializer?: Expression | undefined) => ShorthandPropertyAssignment;
    /** @deprecated Use `factory.updateShorthandPropertyAssignment` or the factory supplied by your transformation context instead. */
    const updateShorthandPropertyAssignment: (node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined) => ShorthandPropertyAssignment;
    /** @deprecated Use `factory.createSpreadAssignment` or the factory supplied by your transformation context instead. */
    const createSpreadAssignment: (expression: Expression) => SpreadAssignment;
    /** @deprecated Use `factory.updateSpreadAssignment` or the factory supplied by your transformation context instead. */
    const updateSpreadAssignment: (node: SpreadAssignment, expression: Expression) => SpreadAssignment;
    /** @deprecated Use `factory.createEnumMember` or the factory supplied by your transformation context instead. */
    const createEnumMember: (name: string | PropertyName, initializer?: Expression | undefined) => EnumMember;
    /** @deprecated Use `factory.updateEnumMember` or the factory supplied by your transformation context instead. */
    const updateEnumMember: (node: EnumMember, name: PropertyName, initializer: Expression | undefined) => EnumMember;
    /** @deprecated Use `factory.updateSourceFile` or the factory supplied by your transformation context instead. */
    const updateSourceFileNode: (node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean | undefined, referencedFiles?: readonly FileReference[] | undefined, typeReferences?: readonly FileReference[] | undefined, hasNoDefaultLib?: boolean | undefined, libReferences?: readonly FileReference[] | undefined) => SourceFile;
    /** @deprecated Use `factory.createNotEmittedStatement` or the factory supplied by your transformation context instead. */
    const createNotEmittedStatement: (original: Node) => NotEmittedStatement;
    /** @deprecated Use `factory.createPartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const createPartiallyEmittedExpression: (expression: Expression, original?: Node | undefined) => PartiallyEmittedExpression;
    /** @deprecated Use `factory.updatePartiallyEmittedExpression` or the factory supplied by your transformation context instead. */
    const updatePartiallyEmittedExpression: (node: PartiallyEmittedExpression, expression: Expression) => PartiallyEmittedExpression;
    /** @deprecated Use `factory.createCommaListExpression` or the factory supplied by your transformation context instead. */
    const createCommaList: (elements: readonly Expression[]) => CommaListExpression;
    /** @deprecated Use `factory.updateCommaListExpression` or the factory supplied by your transformation context instead. */
    const updateCommaList: (node: CommaListExpression, elements: readonly Expression[]) => CommaListExpression;
    /** @deprecated Use `factory.createBundle` or the factory supplied by your transformation context instead. */
    const createBundle: (sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[] | undefined) => Bundle;
    /** @deprecated Use `factory.updateBundle` or the factory supplied by your transformation context instead. */
    const updateBundle: (node: Bundle, sourceFiles: readonly SourceFile[], prepends?: readonly (UnparsedSource | InputFiles)[] | undefined) => Bundle;
    /** @deprecated Use `factory.createImmediatelyInvokedFunctionExpression` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedFunctionExpression: {
        (statements: readonly Statement[]): CallExpression;
        (statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    };
    /** @deprecated Use `factory.createImmediatelyInvokedArrowFunction` or the factory supplied by your transformation context instead. */
    const createImmediatelyInvokedArrowFunction: {
        (statements: readonly Statement[]): CallExpression;
        (statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    };
    /** @deprecated Use `factory.createVoidZero` or the factory supplied by your transformation context instead. */
    const createVoidZero: () => VoidExpression;
    /** @deprecated Use `factory.createExportDefault` or the factory supplied by your transformation context instead. */
    const createExportDefault: (expression: Expression) => ExportAssignment;
    /** @deprecated Use `factory.createExternalModuleExport` or the factory supplied by your transformation context instead. */
    const createExternalModuleExport: (exportName: Identifier) => ExportDeclaration;
    /** @deprecated Use `factory.createNamespaceExport` or the factory supplied by your transformation context instead. */
    const createNamespaceExport: (name: Identifier) => NamespaceExport;
    /** @deprecated Use `factory.updateNamespaceExport` or the factory supplied by your transformation context instead. */
    const updateNamespaceExport: (node: NamespaceExport, name: Identifier) => NamespaceExport;
    /** @deprecated Use `factory.createToken` or the factory supplied by your transformation context instead. */
    const createToken: <TKind extends SyntaxKind>(kind: TKind) => Token<TKind>;
    /** @deprecated Use `factory.createIdentifier` or the factory supplied by your transformation context instead. */
    const createIdentifier: (text: string) => Identifier;
    /** @deprecated Use `factory.createTempVariable` or the factory supplied by your transformation context instead. */
    const createTempVariable: (recordTempVariable: ((node: Identifier) => void) | undefined) => Identifier;
    /** @deprecated Use `factory.getGeneratedNameForNode` or the factory supplied by your transformation context instead. */
    const getGeneratedNameForNode: (node: Node | undefined) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic)` or the factory supplied by your transformation context instead. */
    const createOptimisticUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createUniqueName(text, GeneratedIdentifierFlags.Optimistic | GeneratedIdentifierFlags.FileLevel)` or the factory supplied by your transformation context instead. */
    const createFileLevelUniqueName: (text: string) => Identifier;
    /** @deprecated Use `factory.createIndexSignature` or the factory supplied by your transformation context instead. */
    const createIndexSignature: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode) => IndexSignatureDeclaration;
    /** @deprecated Use `factory.createTypePredicateNode` or the factory supplied by your transformation context instead. */
    const createTypePredicateNode: (parameterName: Identifier | ThisTypeNode | string, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.updateTypePredicateNode` or the factory supplied by your transformation context instead. */
    const updateTypePredicateNode: (node: TypePredicateNode, parameterName: Identifier | ThisTypeNode, type: TypeNode) => TypePredicateNode;
    /** @deprecated Use `factory.createStringLiteral`, `factory.createStringLiteralFromNode`, `factory.createNumericLiteral`, `factory.createBigIntLiteral`, `factory.createTrue`, `factory.createFalse`, or the factory supplied by your transformation context instead. */
    const createLiteral: {
        (value: string | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | Identifier): StringLiteral;
        (value: number | PseudoBigInt): NumericLiteral;
        (value: boolean): BooleanLiteral;
        (value: string | number | PseudoBigInt | boolean): PrimaryExpression;
    };
    /** @deprecated Use `factory.createMethodSignature` or the factory supplied by your transformation context instead. */
    const createMethodSignature: (typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.updateMethodSignature` or the factory supplied by your transformation context instead. */
    const updateMethodSignature: (node: MethodSignature, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, name: PropertyName, questionToken: QuestionToken | undefined) => MethodSignature;
    /** @deprecated Use `factory.createTypeOperatorNode` or the factory supplied by your transformation context instead. */
    const createTypeOperatorNode: {
        (type: TypeNode): TypeOperatorNode;
        (operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    };
    /** @deprecated Use `factory.createTaggedTemplate` or the factory supplied by your transformation context instead. */
    const createTaggedTemplate: {
        (tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateTaggedTemplate` or the factory supplied by your transformation context instead. */
    const updateTaggedTemplate: {
        (node: TaggedTemplateExpression, tag: Expression, template: TemplateLiteral): TaggedTemplateExpression;
        (node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    };
    /** @deprecated Use `factory.updateBinary` or the factory supplied by your transformation context instead. */
    const updateBinary: (node: BinaryExpression, left: Expression, right: Expression, operator?: BinaryOperator | BinaryOperatorToken) => BinaryExpression;
    /** @deprecated Use `factory.createConditional` or the factory supplied by your transformation context instead. */
    const createConditional: {
        (condition: Expression, whenTrue: Expression, whenFalse: Expression): ConditionalExpression;
        (condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    };
    /** @deprecated Use `factory.createYield` or the factory supplied by your transformation context instead. */
    const createYield: {
        (expression?: Expression | undefined): YieldExpression;
        (asteriskToken: AsteriskToken | undefined, expression: Expression): YieldExpression;
    };
    /** @deprecated Use `factory.createClassExpression` or the factory supplied by your transformation context instead. */
    const createClassExpression: (modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.updateClassExpression` or the factory supplied by your transformation context instead. */
    const updateClassExpression: (node: ClassExpression, modifiers: readonly Modifier[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]) => ClassExpression;
    /** @deprecated Use `factory.createPropertySignature` or the factory supplied by your transformation context instead. */
    const createPropertySignature: (modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer?: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.updatePropertySignature` or the factory supplied by your transformation context instead. */
    const updatePropertySignature: (node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined) => PropertySignature;
    /** @deprecated Use `factory.createExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const createExpressionWithTypeArguments: (typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.updateExpressionWithTypeArguments` or the factory supplied by your transformation context instead. */
    const updateExpressionWithTypeArguments: (node: ExpressionWithTypeArguments, typeArguments: readonly TypeNode[] | undefined, expression: Expression) => ExpressionWithTypeArguments;
    /** @deprecated Use `factory.createArrowFunction` or the factory supplied by your transformation context instead. */
    const createArrowFunction: {
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody): ArrowFunction;
        (modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.updateArrowFunction` or the factory supplied by your transformation context instead. */
    const updateArrowFunction: {
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody): ArrowFunction;
        (node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: ConciseBody): ArrowFunction;
    };
    /** @deprecated Use `factory.createVariableDeclaration` or the factory supplied by your transformation context instead. */
    const createVariableDeclaration: {
        (name: string | BindingName, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;
        (name: string | BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.updateVariableDeclaration` or the factory supplied by your transformation context instead. */
    const updateVariableDeclaration: {
        (node: VariableDeclaration, name: BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
        (node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    };
    /** @deprecated Use `factory.createImportClause` or the factory supplied by your transformation context instead. */
    const createImportClause: (name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly?: any) => ImportClause;
    /** @deprecated Use `factory.updateImportClause` or the factory supplied by your transformation context instead. */
    const updateImportClause: (node: ImportClause, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined, isTypeOnly: boolean) => ImportClause;
    /** @deprecated Use `factory.createExportDeclaration` or the factory supplied by your transformation context instead. */
    const createExportDeclaration: (decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression | undefined, isTypeOnly?: any) => ExportDeclaration;
    /** @deprecated Use `factory.updateExportDeclaration` or the factory supplied by your transformation context instead. */
    const updateExportDeclaration: (node: ExportDeclaration, decorators: readonly Decorator[] | undefined, modifiers: readonly Modifier[] | undefined, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, isTypeOnly: boolean) => ExportDeclaration;
    /** @deprecated Use `factory.createJSDocParameterTag` or the factory supplied by your transformation context instead. */
    const createJSDocParamTag: (name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression | undefined, comment?: string | undefined) => JSDocParameterTag;
    /** @deprecated Use `factory.createComma` or the factory supplied by your transformation context instead. */
    const createComma: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createLessThan` or the factory supplied by your transformation context instead. */
    const createLessThan: (left: Expression, right: Expression) => Expression;
    /** @deprecated Use `factory.createAssignment` or the factory supplied by your transformation context instead. */
    const createAssignment: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictEquality` or the factory supplied by your transformation context instead. */
    const createStrictEquality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createStrictInequality` or the factory supplied by your transformation context instead. */
    const createStrictInequality: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createAdd` or the factory supplied by your transformation context instead. */
    const createAdd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createSubtract` or the factory supplied by your transformation context instead. */
    const createSubtract: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalAnd` or the factory supplied by your transformation context instead. */
    const createLogicalAnd: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createLogicalOr` or the factory supplied by your transformation context instead. */
    const createLogicalOr: (left: Expression, right: Expression) => BinaryExpression;
    /** @deprecated Use `factory.createPostfixIncrement` or the factory supplied by your transformation context instead. */
    const createPostfixIncrement: (operand: Expression) => PostfixUnaryExpression;
    /** @deprecated Use `factory.createLogicalNot` or the factory supplied by your transformation context instead. */
    const createLogicalNot: (operand: Expression) => PrefixUnaryExpression;
    /** @deprecated Use an appropriate `factory` method instead. */
    const createNode: (kind: SyntaxKind, pos?: any, end?: any) => Node;
    /**
     * Creates a shallow, memberwise clone of a node ~for mutation~ with its `pos`, `end`, and `parent` set.
     *
     * NOTE: It is unsafe to change any properties of a `Node` that relate to its AST children, as those changes won't be
     * captured with respect to transformations.
     *
     * @deprecated Use an appropriate `factory.update...` method instead, use `setCommentRange` or `setSourceMapRange`, and avoid setting `parent`.
     */
    const getMutableClone: <T extends Node>(node: T) => T;
    /** @deprecated Use `isTypeAssertionExpression` instead. */
    const isTypeAssertion: (node: Node) => node is TypeAssertion;
    /**
     * @deprecated Use `ts.ReadonlyESMap<K, V>` instead.
     */
    interface ReadonlyMap<T> extends ReadonlyESMap<string, T> {
    }
    /**
     * @deprecated Use `ts.ESMap<K, V>` instead.
     */
    interface Map<T> extends ESMap<string, T> {
    }
    /**
     * @deprecated Use `isMemberName` instead.
     */
    const isIdentifierOrPrivateIdentifier: (node: Node) => node is MemberName;
}

export = ts;