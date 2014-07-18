// If you change anything in this enum, make sure you run SyntaxGenerator again!

module TypeScript {
    export enum SyntaxKind {
        // Variable width tokens, trivia and lists.
        None,
        List,
        SeparatedList,
        TriviaList,

        // Trivia
        WhitespaceTrivia,
        NewLineTrivia,
        MultiLineCommentTrivia,
        SingleLineCommentTrivia,
        SkippedTokenTrivia,

        // Note: all variable width tokens must come before all fixed width tokens.

        ErrorToken,
        EndOfFileToken,

        // Tokens
        IdentifierName,

        // LiteralTokens
        RegularExpressionLiteral,
        NumericLiteral,
        StringLiteral,

        // All fixed width tokens follow.

        // Keywords
        BreakKeyword,
        CaseKeyword,
        CatchKeyword,
        ContinueKeyword,
        DebuggerKeyword,
        DefaultKeyword,
        DeleteKeyword,
        DoKeyword,
        ElseKeyword,
        FalseKeyword,
        FinallyKeyword,
        ForKeyword,
        FunctionKeyword,
        IfKeyword,
        InKeyword,
        InstanceOfKeyword,
        NewKeyword,
        NullKeyword,
        ReturnKeyword,
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

        // FutureReservedWords.
        ClassKeyword,
        ConstKeyword,
        EnumKeyword,
        ExportKeyword,
        ExtendsKeyword,
        ImportKeyword,
        SuperKeyword,

        // FutureReservedStrictWords.
        ImplementsKeyword,
        InterfaceKeyword,
        LetKeyword,
        PackageKeyword,
        PrivateKeyword,
        ProtectedKeyword,
        PublicKeyword,
        StaticKeyword,
        YieldKeyword,

        // TypeScript keywords.
        AnyKeyword,
        BooleanKeyword,
        ConstructorKeyword,
        DeclareKeyword,
        GetKeyword,
        ModuleKeyword,
        RequireKeyword,
        NumberKeyword,
        SetKeyword,
        StringKeyword,

        // Punctuators
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
        LessThanToken,
        GreaterThanToken,
        LessThanEqualsToken,
        GreaterThanEqualsToken,
        EqualsEqualsToken,
        EqualsGreaterThanToken,
        ExclamationEqualsToken,
        EqualsEqualsEqualsToken,
        ExclamationEqualsEqualsToken,
        PlusToken,
        MinusToken,
        AsteriskToken,
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
        EqualsToken,
        PlusEqualsToken,
        MinusEqualsToken,
        AsteriskEqualsToken,
        PercentEqualsToken,
        LessThanLessThanEqualsToken,
        GreaterThanGreaterThanEqualsToken,
        GreaterThanGreaterThanGreaterThanEqualsToken,
        AmpersandEqualsToken,
        BarEqualsToken,
        CaretEqualsToken,
        SlashToken,
        SlashEqualsToken,

        // SyntaxNodes
        SourceUnit,

        // Names
        QualifiedName,

        // Types
        ObjectType,
        FunctionType,
        ArrayType,
        ConstructorType,
        GenericType,
        TypeQuery,

        // Module elements.
        InterfaceDeclaration,
        FunctionDeclaration,
        ModuleDeclaration,
        ClassDeclaration,
        EnumDeclaration,
        ImportDeclaration,
        ExportAssignment,

        // ClassElements
        MemberFunctionDeclaration,
        MemberVariableDeclaration,
        ConstructorDeclaration,
        IndexMemberDeclaration,

        // ClassElement and PropertyAssignment
        GetAccessor,
        SetAccessor,

        // Type members.
        PropertySignature,
        CallSignature,
        ConstructSignature,
        IndexSignature,
        MethodSignature,

        // Statements
        Block,
        IfStatement,
        VariableStatement,
        ExpressionStatement,
        ReturnStatement,
        SwitchStatement,
        BreakStatement,
        ContinueStatement,
        ForStatement,
        ForInStatement,
        EmptyStatement,
        ThrowStatement,
        WhileStatement,
        TryStatement,
        LabeledStatement,
        DoStatement,
        DebuggerStatement,
        WithStatement,

        // Expressions
        PlusExpression,
        NegateExpression,
        BitwiseNotExpression,
        LogicalNotExpression,
        PreIncrementExpression,
        PreDecrementExpression,
        DeleteExpression,
        TypeOfExpression,
        VoidExpression,
        CommaExpression,
        AssignmentExpression,
        AddAssignmentExpression,
        SubtractAssignmentExpression,
        MultiplyAssignmentExpression,
        DivideAssignmentExpression,
        ModuloAssignmentExpression,
        AndAssignmentExpression,
        ExclusiveOrAssignmentExpression,
        OrAssignmentExpression,
        LeftShiftAssignmentExpression,
        SignedRightShiftAssignmentExpression,
        UnsignedRightShiftAssignmentExpression,
        ConditionalExpression,
        LogicalOrExpression,
        LogicalAndExpression,
        BitwiseOrExpression,
        BitwiseExclusiveOrExpression,
        BitwiseAndExpression,
        EqualsWithTypeConversionExpression,
        NotEqualsWithTypeConversionExpression,
        EqualsExpression,
        NotEqualsExpression,
        LessThanExpression,
        GreaterThanExpression,
        LessThanOrEqualExpression,
        GreaterThanOrEqualExpression,
        InstanceOfExpression,
        InExpression,
        LeftShiftExpression,
        SignedRightShiftExpression,
        UnsignedRightShiftExpression,
        MultiplyExpression,
        DivideExpression,
        ModuloExpression,
        AddExpression,
        SubtractExpression,
        PostIncrementExpression,
        PostDecrementExpression,
        MemberAccessExpression,
        InvocationExpression,
        ArrayLiteralExpression,
        ObjectLiteralExpression,
        ObjectCreationExpression,
        ParenthesizedExpression,
        ParenthesizedArrowFunctionExpression,
        SimpleArrowFunctionExpression,
        CastExpression,
        ElementAccessExpression,
        FunctionExpression,
        OmittedExpression,

        // Variable declarations
        VariableDeclaration,
        VariableDeclarator,

        // Lists
        ArgumentList,
        ParameterList,
        TypeArgumentList,
        TypeParameterList,

        // Clauses
        ExtendsHeritageClause,
        ImplementsHeritageClause,
        EqualsValueClause,
        CaseSwitchClause,
        DefaultSwitchClause,
        ElseClause,
        CatchClause,
        FinallyClause,

        // Generics
        TypeParameter,
        Constraint,

        // Property Assignment
        SimplePropertyAssignment,
        // GetAccessorPropertyAssignment,
        // SetAccessorPropertyAssignment,
        FunctionPropertyAssignment,

        // Misc.
        Parameter,
        EnumElement,
        TypeAnnotation,
        ExternalModuleReference,
        ModuleNameModuleReference,

        FirstStandardKeyword = BreakKeyword,
        LastStandardKeyword = WithKeyword,

        FirstFutureReservedKeyword = ClassKeyword,
        LastFutureReservedKeyword = SuperKeyword,

        FirstFutureReservedStrictKeyword = ImplementsKeyword,
        LastFutureReservedStrictKeyword = YieldKeyword,

        FirstTypeScriptKeyword = AnyKeyword,
        LastTypeScriptKeyword = StringKeyword,

        FirstKeyword = FirstStandardKeyword,
        LastKeyword = LastTypeScriptKeyword,

        FirstToken = ErrorToken,
        LastToken = SlashEqualsToken,

        FirstPunctuation = OpenBraceToken,
        LastPunctuation = SlashEqualsToken,

        FirstFixedWidth = FirstKeyword,
        LastFixedWidth = LastPunctuation,

        FirstTrivia = WhitespaceTrivia,
        LastTrivia = SkippedTokenTrivia,

        FirstNode = SourceUnit,
        LastNode = ModuleNameModuleReference,
    }
}