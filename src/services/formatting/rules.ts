///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    // Place a space before open brace in a function declaration
    // TypeScript: Function can have return types, which can be made of tons of different token kinds
    const FunctionOpenBraceLeftTokenRange = TokenRange.AnyIncludingMultilineComments;

    // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
    const TypeScriptOpenBraceLeftTokenRange = TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.ClassKeyword, SyntaxKind.ExportKeyword, SyntaxKind.ImportKeyword]);

    // Place a space before open brace in a control flow construct
    const ControlOpenBraceLeftTokenRange = TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.DoKeyword, SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword, SyntaxKind.ElseKeyword]);

    // These rules are higher in priority than user-configurable
    const HighPriorityCommonRules = [
        ///
        /// Common Rules
        ///

        // Leave comments alone
        new Rule("IgnoreBeforeComment", TokenRange.Any, TokenRange.Comments, AnyContext, RuleAction.Ignore),
        new Rule("IgnoreAfterLineComment", SyntaxKind.SingleLineCommentTrivia, TokenRange.Any, AnyContext, RuleAction.Ignore),

        new Rule("NoSpaceBeforeColon", TokenRange.Any, SyntaxKind.ColonToken, [IsNonJsxSameLineTokenContext, IsNotBinaryOpContext], RuleAction.Delete),
        new Rule("SpaceAfterColon", SyntaxKind.ColonToken, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsNotBinaryOpContext], RuleAction.Space),
        new Rule("NoSpaceBeforeQuestionMark", TokenRange.Any, SyntaxKind.QuestionToken, [IsNonJsxSameLineTokenContext, IsNotBinaryOpContext], RuleAction.Delete),
        // insert space after '?' only when it is used in conditional operator
        new Rule("SpaceAfterQuestionMarkInConditionalOperator", SyntaxKind.QuestionToken, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsConditionalOperatorContext], RuleAction.Space),

        // in other cases there should be no space between '?' and next token
        new Rule("NoSpaceAfterQuestionMark", SyntaxKind.QuestionToken, TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Delete),

        new Rule("NoSpaceBeforeDot", TokenRange.Any, SyntaxKind.DotToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterDot", SyntaxKind.DotToken, TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // Special handling of unary operators.
        // Prefix operators generally shouldn't have a space between
        // them and their target unary expression.
        new Rule("NoSpaceAfterUnaryPrefixOperator", TokenRange.UnaryPrefixOperators, TokenRange.UnaryPrefixExpressions, [IsNonJsxSameLineTokenContext, IsNotBinaryOpContext], RuleAction.Delete),
        new Rule("NoSpaceAfterUnaryPreincrementOperator", SyntaxKind.PlusPlusToken, TokenRange.UnaryPreincrementExpressions, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterUnaryPredecrementOperator", SyntaxKind.MinusMinusToken, TokenRange.UnaryPredecrementExpressions, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeUnaryPostincrementOperator", TokenRange.UnaryPostincrementExpressions, SyntaxKind.PlusPlusToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeUnaryPostdecrementOperator", TokenRange.UnaryPostdecrementExpressions, SyntaxKind.MinusMinusToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // More unary operator special-casing.
        // DevDiv 181814:  Be careful when removing leading whitespace
        // around unary operators.  Examples:
        //      1 - -2  --X-->  1--2
        //      a + ++b --X-->  a+++b
        new Rule("SpaceAfterPostincrementWhenFollowedByAdd", SyntaxKind.PlusPlusToken, SyntaxKind.PlusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterAddWhenFollowedByUnaryPlus", SyntaxKind.PlusToken, SyntaxKind.PlusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterAddWhenFollowedByPreincrement", SyntaxKind.PlusToken, SyntaxKind.PlusPlusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterPostdecrementWhenFollowedBySubtract", SyntaxKind.MinusMinusToken, SyntaxKind.MinusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", SyntaxKind.MinusToken, SyntaxKind.MinusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterSubtractWhenFollowedByPredecrement", SyntaxKind.MinusToken, SyntaxKind.MinusMinusToken, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),

        new Rule("NoSpaceAfterCloseBrace", SyntaxKind.CloseBraceToken, TokenRange.FromTokens([SyntaxKind.CloseBracketToken, SyntaxKind.CommaToken, SyntaxKind.SemicolonToken]), [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        // For functions and control block place } on a new line [multi-line rule]
        new Rule("NewLineBeforeCloseBraceInBlockContext", TokenRange.AnyIncludingMultilineComments, SyntaxKind.CloseBraceToken, [IsMultilineBlockContext], RuleAction.NewLine),

        // Space/new line after }.
        new Rule("SpaceAfterCloseBrace", SyntaxKind.CloseBraceToken, TokenRange.FromRange(SyntaxKind.FirstToken, SyntaxKind.LastToken, [SyntaxKind.CloseParenToken]), [IsNonJsxSameLineTokenContext, IsAfterCodeBlockContext], RuleAction.Space),
        // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
        // Also should not apply to })
        new Rule("SpaceBetweenCloseBraceAndElse", SyntaxKind.CloseBraceToken, SyntaxKind.ElseKeyword, [IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBetweenCloseBraceAndWhile", SyntaxKind.CloseBraceToken, SyntaxKind.WhileKeyword, [IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [IsNonJsxSameLineTokenContext, IsObjectContext], RuleAction.Delete),

        new Rule("NoSpaceBetweenFunctionKeywordAndStar", SyntaxKind.FunctionKeyword, SyntaxKind.AsteriskToken, [IsFunctionDeclarationOrFunctionExpressionContext], RuleAction.Delete),
        new Rule("SpaceAfterStarInGeneratorDeclaration", SyntaxKind.AsteriskToken, TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.OpenParenToken]), [IsFunctionDeclarationOrFunctionExpressionContext], RuleAction.Space),

        new Rule("SpaceAfterFunctionInFuncDecl", SyntaxKind.FunctionKeyword, TokenRange.Any, [IsFunctionDeclContext], RuleAction.Space),
        // Insert new line after { and before } in multi-line contexts.
        new Rule("NewLineAfterOpenBraceInBlockContext", SyntaxKind.OpenBraceToken, TokenRange.Any, [IsMultilineBlockContext], RuleAction.NewLine),

        // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
        // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
        //      get x() {}
        //      set x(val) {}
        new Rule("SpaceAfterGetSetInMember", TokenRange.FromTokens([SyntaxKind.GetKeyword, SyntaxKind.SetKeyword]), SyntaxKind.Identifier, [IsFunctionDeclContext], RuleAction.Space),

        new Rule("NoSpaceBetweenYieldKeywordAndStar", SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken, [IsNonJsxSameLineTokenContext, IsYieldOrYieldStarWithOperand], RuleAction.Delete),
        new Rule("SpaceBetweenYieldOrYieldStarAndOperand", TokenRange.FromTokens([SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken]), TokenRange.Any, [IsNonJsxSameLineTokenContext, IsYieldOrYieldStarWithOperand], RuleAction.Space),

        new Rule("NoSpaceBetweenReturnAndSemicolon", SyntaxKind.ReturnKeyword, SyntaxKind.SemicolonToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("SpaceAfterCertainKeywords", TokenRange.FromTokens([SyntaxKind.VarKeyword, SyntaxKind.ThrowKeyword, SyntaxKind.NewKeyword, SyntaxKind.DeleteKeyword, SyntaxKind.ReturnKeyword, SyntaxKind.TypeOfKeyword, SyntaxKind.AwaitKeyword]), TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceAfterLetConstInVariableDeclaration", TokenRange.FromTokens([SyntaxKind.LetKeyword, SyntaxKind.ConstKeyword]), TokenRange.Any, [IsNonJsxSameLineTokenContext, IsStartOfVariableDeclarationList], RuleAction.Space),
        new Rule("NoSpaceBeforeOpenParenInFuncCall", TokenRange.Any, SyntaxKind.OpenParenToken, [IsNonJsxSameLineTokenContext, IsFunctionCallOrNewContext, IsPreviousTokenNotComma], RuleAction.Delete),

        // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
        new Rule("SpaceBeforeBinaryKeywordOperator", TokenRange.Any, TokenRange.BinaryKeywordOperators, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterBinaryKeywordOperator", TokenRange.BinaryKeywordOperators, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),

        new Rule("SpaceAfterVoidOperator", SyntaxKind.VoidKeyword, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsVoidOpContext], RuleAction.Space),

        // Async-await
        new Rule("SpaceBetweenAsyncAndOpenParen", SyntaxKind.AsyncKeyword, SyntaxKind.OpenParenToken, [IsArrowFunctionContext, IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBetweenAsyncAndFunctionKeyword", SyntaxKind.AsyncKeyword, SyntaxKind.FunctionKeyword, [IsNonJsxSameLineTokenContext], RuleAction.Space),

        // template string
        new Rule("NoSpaceBetweenTagAndTemplateString", SyntaxKind.Identifier, TokenRange.FromTokens([SyntaxKind.NoSubstitutionTemplateLiteral, SyntaxKind.TemplateHead]), [IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // JSX opening elements
        new Rule("SpaceBeforeJsxAttribute", TokenRange.Any, SyntaxKind.Identifier, [IsNextTokenParentJsxAttribute, IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBeforeSlashInJsxOpeningElement", TokenRange.Any, SyntaxKind.SlashToken, [IsJsxSelfClosingElementContext, IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", SyntaxKind.SlashToken, SyntaxKind.GreaterThanToken, [IsJsxSelfClosingElementContext, IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeEqualInJsxAttribute", TokenRange.Any, SyntaxKind.EqualsToken, [IsJsxAttributeContext, IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterEqualInJsxAttribute", SyntaxKind.EqualsToken, TokenRange.Any, [IsJsxAttributeContext, IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // TypeScript-specific rules
        // Use of module as a function call. e.g.: import m2 = module("m2");
        new Rule("NoSpaceAfterModuleImport", TokenRange.FromTokens([SyntaxKind.ModuleKeyword, SyntaxKind.RequireKeyword]), SyntaxKind.OpenParenToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        // Add a space around certain TypeScript keywords
        new Rule(
            "SpaceAfterCertainTypeScriptKeywords",
            TokenRange.FromTokens([
                SyntaxKind.AbstractKeyword,
                SyntaxKind.ClassKeyword,
                SyntaxKind.DeclareKeyword,
                SyntaxKind.DefaultKeyword,
                SyntaxKind.EnumKeyword,
                SyntaxKind.ExportKeyword,
                SyntaxKind.ExtendsKeyword,
                SyntaxKind.GetKeyword,
                SyntaxKind.ImplementsKeyword,
                SyntaxKind.ImportKeyword,
                SyntaxKind.InterfaceKeyword,
                SyntaxKind.ModuleKeyword,
                SyntaxKind.NamespaceKeyword,
                SyntaxKind.PrivateKeyword,
                SyntaxKind.PublicKeyword,
                SyntaxKind.ProtectedKeyword,
                SyntaxKind.ReadonlyKeyword,
                SyntaxKind.SetKeyword,
                SyntaxKind.StaticKeyword,
                SyntaxKind.TypeKeyword,
                SyntaxKind.FromKeyword,
                SyntaxKind.KeyOfKeyword,
            ]),
            TokenRange.Any,
            [IsNonJsxSameLineTokenContext],
            RuleAction.Space),
        new Rule(
            "SpaceBeforeCertainTypeScriptKeywords",
            TokenRange.Any,
            TokenRange.FromTokens([
                SyntaxKind.ExtendsKeyword,
                SyntaxKind.ImplementsKeyword,
                SyntaxKind.FromKeyword,
            ]),
            [IsNonJsxSameLineTokenContext],
            RuleAction.Space),
        // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
        new Rule("SpaceAfterModuleName", SyntaxKind.StringLiteral, SyntaxKind.OpenBraceToken, [IsModuleDeclContext], RuleAction.Space),

        // Lambda expressions
        new Rule("SpaceBeforeArrow", TokenRange.Any, SyntaxKind.EqualsGreaterThanToken, [IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceAfterArrow", SyntaxKind.EqualsGreaterThanToken, TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Space),

        // Optional parameters and let args
        new Rule("NoSpaceAfterEllipsis", SyntaxKind.DotDotDotToken, SyntaxKind.Identifier, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterOptionalParameters", SyntaxKind.QuestionToken, TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.CommaToken]), [IsNonJsxSameLineTokenContext, IsNotBinaryOpContext], RuleAction.Delete),

        // Remove spaces in empty interface literals. e.g.: x: {}
        new Rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [IsNonJsxSameLineTokenContext, IsObjectTypeContext], RuleAction.Delete),

        // generics and type assertions
        new Rule("NoSpaceBeforeOpenAngularBracket", TokenRange.TypeNames, SyntaxKind.LessThanToken, [IsNonJsxSameLineTokenContext, IsTypeArgumentOrParameterOrAssertionContext], RuleAction.Delete),
        new Rule("NoSpaceBetweenCloseParenAndAngularBracket", SyntaxKind.CloseParenToken, SyntaxKind.LessThanToken, [IsNonJsxSameLineTokenContext, IsTypeArgumentOrParameterOrAssertionContext], RuleAction.Delete),
        new Rule("NoSpaceAfterOpenAngularBracket", SyntaxKind.LessThanToken, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsTypeArgumentOrParameterOrAssertionContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeCloseAngularBracket", TokenRange.Any, SyntaxKind.GreaterThanToken, [IsNonJsxSameLineTokenContext, IsTypeArgumentOrParameterOrAssertionContext], RuleAction.Delete),
        new Rule("NoSpaceAfterCloseAngularBracket",
            SyntaxKind.GreaterThanToken,
            TokenRange.FromTokens([SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.GreaterThanToken, SyntaxKind.CommaToken]),
            [IsNonJsxSameLineTokenContext, IsTypeArgumentOrParameterOrAssertionContext],
            RuleAction.Delete),

        // decorators
        new Rule("SpaceBeforeAt", TokenRange.Any, SyntaxKind.AtToken, [IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceAfterAt", SyntaxKind.AtToken, TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        // Insert space after @ in decorator
        new Rule("SpaceAfterDecorator",
            TokenRange.Any,
            TokenRange.FromTokens([
                SyntaxKind.AbstractKeyword,
                SyntaxKind.Identifier,
                SyntaxKind.ExportKeyword,
                SyntaxKind.DefaultKeyword,
                SyntaxKind.ClassKeyword,
                SyntaxKind.StaticKeyword,
                SyntaxKind.PublicKeyword,
                SyntaxKind.PrivateKeyword,
                SyntaxKind.ProtectedKeyword,
                SyntaxKind.GetKeyword,
                SyntaxKind.SetKeyword,
                SyntaxKind.OpenBracketToken,
                SyntaxKind.AsteriskToken,
            ]),
            [IsEndOfDecoratorContextOnSameLine],
            RuleAction.Space),

        new Rule("NoSpaceBeforeNonNullAssertionOperator", TokenRange.Any, SyntaxKind.ExclamationToken, [IsNonJsxSameLineTokenContext, IsNonNullAssertionContext], RuleAction.Delete),
        new Rule("NoSpaceAfterNewKeywordOnConstructorSignature", SyntaxKind.NewKeyword, SyntaxKind.OpenParenToken, [IsNonJsxSameLineTokenContext, IsConstructorSignatureContext], RuleAction.Delete),
    ];

    // These rules are applied after high priority
    const UserConfigurableRules = [
        // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
        new Rule("SpaceAfterConstructor", SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken, [IsOptionEnabled("insertSpaceAfterConstructor"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceAfterConstructor", SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken, [IsOptionDisabledOrUndefined("insertSpaceAfterConstructor"), IsNonJsxSameLineTokenContext], RuleAction.Delete),

        new Rule("SpaceAfterComma", SyntaxKind.CommaToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterCommaDelimiter"), IsNonJsxSameLineTokenContext, IsNonJsxElementContext, IsNextTokenNotCloseBracket], RuleAction.Space),
        new Rule("NoSpaceAfterComma", SyntaxKind.CommaToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterCommaDelimiter"), IsNonJsxSameLineTokenContext, IsNonJsxElementContext], RuleAction.Delete),

        // Insert space after function keyword for anonymous functions
        new Rule("SpaceAfterAnonymousFunctionKeyword", SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken, [IsOptionEnabled("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), IsFunctionDeclContext], RuleAction.Space),
        new Rule("NoSpaceAfterAnonymousFunctionKeyword", SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken, [IsOptionDisabledOrUndefined("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), IsFunctionDeclContext], RuleAction.Delete),

        // Insert space after keywords in control flow statements
        new Rule("SpaceAfterKeywordInControl", TokenRange.Keywords, SyntaxKind.OpenParenToken, [IsOptionEnabled("insertSpaceAfterKeywordsInControlFlowStatements"), IsControlDeclContext], RuleAction.Space),
        new Rule("NoSpaceAfterKeywordInControl", TokenRange.Keywords, SyntaxKind.OpenParenToken, [IsOptionDisabledOrUndefined("insertSpaceAfterKeywordsInControlFlowStatements"), IsControlDeclContext], RuleAction.Delete),

        // Insert space after opening and before closing nonempty parenthesis
        new Rule("SpaceAfterOpenParen", SyntaxKind.OpenParenToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBeforeCloseParen", TokenRange.Any, SyntaxKind.CloseParenToken, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBetweenOpenParens", SyntaxKind.OpenParenToken, SyntaxKind.OpenParenToken, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceBetweenParens", SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterOpenParen", SyntaxKind.OpenParenToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeCloseParen", TokenRange.Any, SyntaxKind.CloseParenToken, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // Insert space after opening and before closing nonempty brackets
        new Rule("SpaceAfterOpenBracket", SyntaxKind.OpenBracketToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBeforeCloseBracket", TokenRange.Any, SyntaxKind.CloseBracketToken, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceBetweenBrackets", SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterOpenBracket", SyntaxKind.OpenBracketToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeCloseBracket", TokenRange.Any, SyntaxKind.CloseBracketToken, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
        new Rule("SpaceAfterOpenBrace", SyntaxKind.OpenBraceToken, TokenRange.Any, [IsOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), IsBraceWrappedContext], RuleAction.Space),
        new Rule("SpaceBeforeCloseBrace", TokenRange.Any, SyntaxKind.CloseBraceToken, [IsOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), IsBraceWrappedContext], RuleAction.Space),
        new Rule("NoSpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [IsNonJsxSameLineTokenContext, IsObjectContext], RuleAction.Delete),
        new Rule("NoSpaceAfterOpenBrace", SyntaxKind.OpenBraceToken, TokenRange.Any, [IsOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeCloseBrace", TokenRange.Any, SyntaxKind.CloseBraceToken, [IsOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // Insert space after opening and before closing template string braces
        new Rule("SpaceAfterTemplateHeadAndMiddle", TokenRange.FromTokens([SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle]), TokenRange.Any, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("SpaceBeforeTemplateMiddleAndTail", TokenRange.Any, TokenRange.FromTokens([SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail]), [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), IsNonJsxSameLineTokenContext], RuleAction.Space),
        new Rule("NoSpaceAfterTemplateHeadAndMiddle", TokenRange.FromTokens([SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle]), TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeTemplateMiddleAndTail", TokenRange.Any, TokenRange.FromTokens([SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail]), [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), IsNonJsxSameLineTokenContext], RuleAction.Delete),

        // No space after { and before } in JSX expression
        new Rule("SpaceAfterOpenBraceInJsxExpression", SyntaxKind.OpenBraceToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), IsNonJsxSameLineTokenContext, IsJsxExpressionContext], RuleAction.Space),
        new Rule("SpaceBeforeCloseBraceInJsxExpression", TokenRange.Any, SyntaxKind.CloseBraceToken, [IsOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), IsNonJsxSameLineTokenContext, IsJsxExpressionContext], RuleAction.Space),
        new Rule("NoSpaceAfterOpenBraceInJsxExpression", SyntaxKind.OpenBraceToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), IsNonJsxSameLineTokenContext, IsJsxExpressionContext], RuleAction.Delete),
        new Rule("NoSpaceBeforeCloseBraceInJsxExpression", TokenRange.Any, SyntaxKind.CloseBraceToken, [IsOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), IsNonJsxSameLineTokenContext, IsJsxExpressionContext], RuleAction.Delete),

        // Insert space after semicolon in for statement
        new Rule("SpaceAfterSemicolonInFor", SyntaxKind.SemicolonToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterSemicolonInForStatements"), IsNonJsxSameLineTokenContext, IsForContext], RuleAction.Space),
        new Rule("NoSpaceAfterSemicolonInFor", SyntaxKind.SemicolonToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterSemicolonInForStatements"), IsNonJsxSameLineTokenContext, IsForContext], RuleAction.Delete),

        // Insert space before and after binary operators
        new Rule("SpaceBeforeBinaryOperator", TokenRange.Any, TokenRange.BinaryOperators, [IsOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("SpaceAfterBinaryOperator", TokenRange.BinaryOperators, TokenRange.Any, [IsOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Space),
        new Rule("NoSpaceBeforeBinaryOperator", TokenRange.Any, TokenRange.BinaryOperators, [IsOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Delete),
        new Rule("NoSpaceAfterBinaryOperator", TokenRange.BinaryOperators, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), IsNonJsxSameLineTokenContext, IsBinaryOpContext], RuleAction.Delete),

        new Rule("SpaceBeforeOpenParenInFuncDecl", TokenRange.Any, SyntaxKind.OpenParenToken, [IsOptionEnabled("insertSpaceBeforeFunctionParenthesis"), IsNonJsxSameLineTokenContext, IsFunctionDeclContext], RuleAction.Space),
        new Rule("NoSpaceBeforeOpenParenInFuncDecl", TokenRange.Any, SyntaxKind.OpenParenToken, [IsOptionDisabledOrUndefined("insertSpaceBeforeFunctionParenthesis"), IsNonJsxSameLineTokenContext, IsFunctionDeclContext], RuleAction.Delete),

        // Open Brace braces after control block
        new Rule("NewLineBeforeOpenBraceInControl", ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [IsOptionEnabled("placeOpenBraceOnNewLineForControlBlocks"), IsControlDeclContext, IsBeforeMultilineBlockContext], RuleAction.NewLine, RuleFlags.CanDeleteNewLines),

        // Open Brace braces after function
        // TypeScript: Function can have return types, which can be made of tons of different token kinds
        new Rule("NewLineBeforeOpenBraceInFunction", FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [IsOptionEnabled("placeOpenBraceOnNewLineForFunctions"), IsFunctionDeclContext, IsBeforeMultilineBlockContext], RuleAction.NewLine, RuleFlags.CanDeleteNewLines),
        // Open Brace braces after TypeScript module/class/interface
        new Rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [IsOptionEnabled("placeOpenBraceOnNewLineForFunctions"), IsTypeScriptDeclWithBlockContext, IsBeforeMultilineBlockContext], RuleAction.NewLine, RuleFlags.CanDeleteNewLines),

        new Rule("SpaceAfterTypeAssertion", SyntaxKind.GreaterThanToken, TokenRange.Any, [IsOptionEnabled("insertSpaceAfterTypeAssertion"), IsNonJsxSameLineTokenContext, IsTypeAssertionContext], RuleAction.Space),
        new Rule("NoSpaceAfterTypeAssertion", SyntaxKind.GreaterThanToken, TokenRange.Any, [IsOptionDisabledOrUndefined("insertSpaceAfterTypeAssertion"), IsNonJsxSameLineTokenContext, IsTypeAssertionContext], RuleAction.Delete),
    ];

    // These rules are lower in priority than user-configurable
    const LowPriorityCommonRules = [
        // Space after keyword but not before ; or : or ?
        new Rule("NoSpaceBeforeSemicolon", TokenRange.Any, SyntaxKind.SemicolonToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),

        new Rule("SpaceBeforeOpenBraceInControl", ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForControlBlocks"), IsControlDeclContext, IsNotFormatOnEnter, IsSameLineTokenOrBeforeBlockContext], RuleAction.Space, RuleFlags.CanDeleteNewLines),
        new Rule("SpaceBeforeOpenBraceInFunction", FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), IsFunctionDeclContext, IsBeforeBlockContext, IsNotFormatOnEnter, IsSameLineTokenOrBeforeBlockContext], RuleAction.Space, RuleFlags.CanDeleteNewLines),
        new Rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), IsTypeScriptDeclWithBlockContext, IsNotFormatOnEnter, IsSameLineTokenOrBeforeBlockContext], RuleAction.Space, RuleFlags.CanDeleteNewLines),

        new Rule("NoSpaceBeforeComma", TokenRange.Any, SyntaxKind.CommaToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        // No space before and after indexer
        new Rule("NoSpaceBeforeOpenBracket", TokenRange.AnyExcept(SyntaxKind.AsyncKeyword), SyntaxKind.OpenBracketToken, [IsNonJsxSameLineTokenContext], RuleAction.Delete),
        new Rule("NoSpaceAfterCloseBracket", SyntaxKind.CloseBracketToken, TokenRange.Any, [IsNonJsxSameLineTokenContext, IsNotBeforeBlockInFunctionDeclarationContext], RuleAction.Delete),
        new Rule("SpaceAfterSemicolon", SyntaxKind.SemicolonToken, TokenRange.Any, [IsNonJsxSameLineTokenContext], RuleAction.Space),

        // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
        // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
        new Rule(
            "SpaceBetweenStatements",
            TokenRange.FromTokens([
                SyntaxKind.CloseParenToken,
                SyntaxKind.DoKeyword,
                SyntaxKind.ElseKeyword,
                SyntaxKind.CaseKeyword,
            ]),
            TokenRange.Any,
            [IsNonJsxSameLineTokenContext, IsNonJsxElementContext, IsNotForContext],
            RuleAction.Space),
        // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
        new Rule("SpaceAfterTryFinally", TokenRange.FromTokens([SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword]), SyntaxKind.OpenBraceToken, [IsNonJsxSameLineTokenContext], RuleAction.Space),
    ];

    export const allRules = [
        ...HighPriorityCommonRules,
        ...UserConfigurableRules,
        ...LowPriorityCommonRules,
    ];

    ///
    /// Contexts
    ///

    function IsOptionEnabled(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => context.options && context.options.hasOwnProperty(optionName) && !!context.options[optionName];
    }

    function IsOptionDisabled(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => context.options && context.options.hasOwnProperty(optionName) && !context.options[optionName];
    }

    function IsOptionDisabledOrUndefined(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !context.options[optionName];
    }

    function isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !context.options[optionName] || context.TokensAreOnSameLine();
    }

    function IsOptionEnabledOrUndefined(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !!context.options[optionName];
    }

    function IsForContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ForStatement;
    }

    function IsNotForContext(context: FormattingContext): boolean {
        return !IsForContext(context);
    }

    function IsBinaryOpContext(context: FormattingContext): boolean {

        switch (context.contextNode.kind) {
            case SyntaxKind.BinaryExpression:
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.AsExpression:
            case SyntaxKind.ExportSpecifier:
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.TypePredicate:
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
                return true;

            // equals in binding elements: function foo([[x, y] = [1, 2]])
            case SyntaxKind.BindingElement:
            // equals in type X = ...
            case SyntaxKind.TypeAliasDeclaration:
            // equal in import a = module('a');
            case SyntaxKind.ImportEqualsDeclaration:
            // equal in let a = 0;
            case SyntaxKind.VariableDeclaration:
            // equal in p = 0;
            case SyntaxKind.Parameter:
            case SyntaxKind.EnumMember:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return context.currentTokenSpan.kind === SyntaxKind.EqualsToken || context.nextTokenSpan.kind === SyntaxKind.EqualsToken;
            // "in" keyword in for (let x in []) { }
            case SyntaxKind.ForInStatement:
            // "in" keyword in [P in keyof T]: T[P]
            case SyntaxKind.TypeParameter:
                return context.currentTokenSpan.kind === SyntaxKind.InKeyword || context.nextTokenSpan.kind === SyntaxKind.InKeyword;
            // Technically, "of" is not a binary operator, but format it the same way as "in"
            case SyntaxKind.ForOfStatement:
                return context.currentTokenSpan.kind === SyntaxKind.OfKeyword || context.nextTokenSpan.kind === SyntaxKind.OfKeyword;
        }
        return false;
    }

    function IsNotBinaryOpContext(context: FormattingContext): boolean {
        return !IsBinaryOpContext(context);
    }

    function IsConditionalOperatorContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ConditionalExpression;
    }

    function IsSameLineTokenOrBeforeBlockContext(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() || IsBeforeBlockContext(context);
    }

    function IsBraceWrappedContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ObjectBindingPattern || IsSingleLineBlockContext(context);
    }

    // This check is done before an open brace in a control construct, a function, or a typescript block declaration
    function IsBeforeMultilineBlockContext(context: FormattingContext): boolean {
        return IsBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
    }

    function IsMultilineBlockContext(context: FormattingContext): boolean {
        return IsBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
    }

    function IsSingleLineBlockContext(context: FormattingContext): boolean {
        return IsBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
    }

    function IsBlockContext(context: FormattingContext): boolean {
        return NodeIsBlockContext(context.contextNode);
    }

    function IsBeforeBlockContext(context: FormattingContext): boolean {
        return NodeIsBlockContext(context.nextTokenParent);
    }

    // IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
    function NodeIsBlockContext(node: Node): boolean {
        if (NodeIsTypeScriptDeclWithBlockContext(node)) {
            // This means we are in a context that looks like a block to the user, but in the grammar is actually not a node (it's a class, module, enum, object type literal, etc).
            return true;
        }

        switch (node.kind) {
            case SyntaxKind.Block:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ModuleBlock:
                return true;
        }

        return false;
    }

    function IsFunctionDeclContext(context: FormattingContext): boolean {
        switch (context.contextNode.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            // case SyntaxKind.MemberFunctionDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            // case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Constructor:
            case SyntaxKind.ArrowFunction:
            // case SyntaxKind.ConstructorDeclaration:
            // case SyntaxKind.SimpleArrowFunctionExpression:
            // case SyntaxKind.ParenthesizedArrowFunctionExpression:
            case SyntaxKind.InterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
                return true;
        }

        return false;
    }

    function IsFunctionDeclarationOrFunctionExpressionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.FunctionDeclaration || context.contextNode.kind === SyntaxKind.FunctionExpression;
    }

    function IsTypeScriptDeclWithBlockContext(context: FormattingContext): boolean {
        return NodeIsTypeScriptDeclWithBlockContext(context.contextNode);
    }

    function NodeIsTypeScriptDeclWithBlockContext(node: Node): boolean {
        switch (node.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.NamedExports:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.NamedImports:
                return true;
        }

        return false;
    }

    function IsAfterCodeBlockContext(context: FormattingContext): boolean {
        switch (context.currentTokenParent.kind) {
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.CatchClause:
            case SyntaxKind.ModuleBlock:
            case SyntaxKind.SwitchStatement:
                return true;
            case SyntaxKind.Block: {
                const blockParent = context.currentTokenParent.parent;
                // In a codefix scenario, we can't rely on parents being set. So just always return true.
                if (!blockParent || blockParent.kind !== SyntaxKind.ArrowFunction && blockParent.kind !== SyntaxKind.FunctionExpression) {
                    return true;
                }
            }
        }
        return false;
    }

    function IsControlDeclContext(context: FormattingContext): boolean {
        switch (context.contextNode.kind) {
            case SyntaxKind.IfStatement:
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.TryStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WithStatement:
            // TODO
            // case SyntaxKind.ElseClause:
            case SyntaxKind.CatchClause:
                return true;

            default:
                return false;
        }
    }

    function IsObjectContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ObjectLiteralExpression;
    }

    function IsFunctionCallContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.CallExpression;
    }

    function IsNewContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.NewExpression;
    }

    function IsFunctionCallOrNewContext(context: FormattingContext): boolean {
        return IsFunctionCallContext(context) || IsNewContext(context);
    }

    function IsPreviousTokenNotComma(context: FormattingContext): boolean {
        return context.currentTokenSpan.kind !== SyntaxKind.CommaToken;
    }

    function IsNextTokenNotCloseBracket(context: FormattingContext): boolean {
        return context.nextTokenSpan.kind !== SyntaxKind.CloseBracketToken;
    }

    function IsArrowFunctionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ArrowFunction;
    }

    function IsNonJsxSameLineTokenContext(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() && context.contextNode.kind !== SyntaxKind.JsxText;
    }

    function IsNonJsxElementContext(context: FormattingContext): boolean {
        return context.contextNode.kind !== SyntaxKind.JsxElement;
    }

    function IsJsxExpressionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxExpression;
    }

    function IsNextTokenParentJsxAttribute(context: FormattingContext): boolean {
        return context.nextTokenParent.kind === SyntaxKind.JsxAttribute;
    }

    function IsJsxAttributeContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxAttribute;
    }

    function IsJsxSelfClosingElementContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxSelfClosingElement;
    }

    function IsNotBeforeBlockInFunctionDeclarationContext(context: FormattingContext): boolean {
        return !IsFunctionDeclContext(context) && !IsBeforeBlockContext(context);
    }

    function IsEndOfDecoratorContextOnSameLine(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() &&
            context.contextNode.decorators &&
            NodeIsInDecoratorContext(context.currentTokenParent) &&
            !NodeIsInDecoratorContext(context.nextTokenParent);
    }

    function NodeIsInDecoratorContext(node: Node): boolean {
        while (isExpressionNode(node)) {
            node = node.parent;
        }
        return node.kind === SyntaxKind.Decorator;
    }

    function IsStartOfVariableDeclarationList(context: FormattingContext): boolean {
        return context.currentTokenParent.kind === SyntaxKind.VariableDeclarationList &&
            context.currentTokenParent.getStart(context.sourceFile) === context.currentTokenSpan.pos;
    }

    function IsNotFormatOnEnter(context: FormattingContext): boolean {
        return context.formattingRequestKind !== FormattingRequestKind.FormatOnEnter;
    }

    function IsModuleDeclContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ModuleDeclaration;
    }

    function IsObjectTypeContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.TypeLiteral; // && context.contextNode.parent.kind !== SyntaxKind.InterfaceDeclaration;
    }

    function IsConstructorSignatureContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ConstructSignature;
    }

    function IsTypeArgumentOrParameterOrAssertion(token: TextRangeWithKind, parent: Node): boolean {
        if (token.kind !== SyntaxKind.LessThanToken && token.kind !== SyntaxKind.GreaterThanToken) {
            return false;
        }
        switch (parent.kind) {
            case SyntaxKind.TypeReference:
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            case SyntaxKind.ExpressionWithTypeArguments:
                return true;
            default:
                return false;

        }
    }

    function IsTypeArgumentOrParameterOrAssertionContext(context: FormattingContext): boolean {
        return IsTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
            IsTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
    }

    function IsTypeAssertionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.TypeAssertionExpression;
    }

    function IsVoidOpContext(context: FormattingContext): boolean {
        return context.currentTokenSpan.kind === SyntaxKind.VoidKeyword && context.currentTokenParent.kind === SyntaxKind.VoidExpression;
    }

    function IsYieldOrYieldStarWithOperand(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.YieldExpression && (<YieldExpression>context.contextNode).expression !== undefined;
    }

    function IsNonNullAssertionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.NonNullExpression;
    }
}
