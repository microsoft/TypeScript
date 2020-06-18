/* @internal */
namespace ts.formatting {
    export interface RuleSpec {
        readonly leftTokenRange: TokenRange;
        readonly rightTokenRange: TokenRange;
        readonly rule: Rule;
    }

    export function getAllRules(): RuleSpec[] {
        const allTokens: SyntaxKind[] = [];
        for (let token = SyntaxKind.FirstToken; token <= SyntaxKind.LastToken; token++) {
            if (token !== SyntaxKind.EndOfFileToken) {
                allTokens.push(token);
            }
        }
        function anyTokenExcept(...tokens: SyntaxKind[]): TokenRange {
            return { tokens: allTokens.filter(t => !tokens.some(t2 => t2 === t)), isSpecific: false };
        }

        const anyToken: TokenRange = { tokens: allTokens, isSpecific: false };
        const anyTokenIncludingMultilineComments = tokenRangeFrom([...allTokens, SyntaxKind.MultiLineCommentTrivia]);
        const anyTokenIncludingEOF = tokenRangeFrom([...allTokens, SyntaxKind.EndOfFileToken]);
        const keywords = tokenRangeFromRange(SyntaxKind.FirstKeyword, SyntaxKind.LastKeyword);
        const binaryOperators = tokenRangeFromRange(SyntaxKind.FirstBinaryOperator, SyntaxKind.LastBinaryOperator);
        const binaryKeywordOperators = [SyntaxKind.InKeyword, SyntaxKind.InstanceOfKeyword, SyntaxKind.OfKeyword, SyntaxKind.AsKeyword, SyntaxKind.IsKeyword];
        const unaryPrefixOperators = [SyntaxKind.PlusPlusToken, SyntaxKind.MinusMinusToken, SyntaxKind.TildeToken, SyntaxKind.ExclamationToken];
        const unaryPrefixExpressions = [
            SyntaxKind.NumericLiteral, SyntaxKind.BigIntLiteral, SyntaxKind.Identifier, SyntaxKind.OpenParenToken,
            SyntaxKind.OpenBracketToken, SyntaxKind.OpenBraceToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword];
        const unaryPreincrementExpressions = [SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword];
        const unaryPostincrementExpressions = [SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword];
        const unaryPredecrementExpressions = [SyntaxKind.Identifier, SyntaxKind.OpenParenToken, SyntaxKind.ThisKeyword, SyntaxKind.NewKeyword];
        const unaryPostdecrementExpressions = [SyntaxKind.Identifier, SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.NewKeyword];
        const comments = [SyntaxKind.SingleLineCommentTrivia, SyntaxKind.MultiLineCommentTrivia];
        const typeNames = [SyntaxKind.Identifier, ...typeKeywords];

        // Place a space before open brace in a function declaration
        // TypeScript: Function can have return types, which can be made of tons of different token kinds
        const functionOpenBraceLeftTokenRange = anyTokenIncludingMultilineComments;

        // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
        const typeScriptOpenBraceLeftTokenRange = tokenRangeFrom([SyntaxKind.Identifier, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.ClassKeyword, SyntaxKind.ExportKeyword, SyntaxKind.ImportKeyword]);

        // Place a space before open brace in a control flow construct
        const controlOpenBraceLeftTokenRange = tokenRangeFrom([SyntaxKind.CloseParenToken, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.DoKeyword, SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword, SyntaxKind.ElseKeyword]);

        // These rules are higher in priority than user-configurable
        const highPriorityCommonRules = [
            // Leave comments alone
            rule("IgnoreBeforeComment", anyToken, comments, anyContext, RuleAction.StopProcessingSpaceActions),
            rule("IgnoreAfterLineComment", SyntaxKind.SingleLineCommentTrivia, anyToken, anyContext, RuleAction.StopProcessingSpaceActions),

            rule("NotSpaceBeforeColon", anyToken, SyntaxKind.ColonToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], RuleAction.DeleteSpace),
            rule("SpaceAfterColon", SyntaxKind.ColonToken, anyToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.InsertSpace),
            rule("NoSpaceBeforeQuestionMark", anyToken, SyntaxKind.QuestionToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.DeleteSpace),
            // insert space after '?' only when it is used in conditional operator
            rule("SpaceAfterQuestionMarkInConditionalOperator", SyntaxKind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext, isConditionalOperatorContext], RuleAction.InsertSpace),

            // in other cases there should be no space between '?' and next token
            rule("NoSpaceAfterQuestionMark", SyntaxKind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            rule("NoSpaceBeforeDot", anyToken, [SyntaxKind.DotToken, SyntaxKind.QuestionDotToken], [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterDot", [SyntaxKind.DotToken, SyntaxKind.QuestionDotToken], anyToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            rule("NoSpaceBetweenImportParenInImportType", SyntaxKind.ImportKeyword, SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isImportTypeContext], RuleAction.DeleteSpace),

            // Special handling of unary operators.
            // Prefix operators generally shouldn't have a space between
            // them and their target unary expression.
            rule("NoSpaceAfterUnaryPrefixOperator", unaryPrefixOperators, unaryPrefixExpressions, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterUnaryPreincrementOperator", SyntaxKind.PlusPlusToken, unaryPreincrementExpressions, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterUnaryPredecrementOperator", SyntaxKind.MinusMinusToken, unaryPredecrementExpressions, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeUnaryPostincrementOperator", unaryPostincrementExpressions, SyntaxKind.PlusPlusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeUnaryPostdecrementOperator", unaryPostdecrementExpressions, SyntaxKind.MinusMinusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], RuleAction.DeleteSpace),

            // More unary operator special-casing.
            // DevDiv 181814: Be careful when removing leading whitespace
            // around unary operators.  Examples:
            //      1 - -2  --X--> 1--2
            //      a + ++b --X--> a+++b
            rule("SpaceAfterPostincrementWhenFollowedByAdd", SyntaxKind.PlusPlusToken, SyntaxKind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterAddWhenFollowedByUnaryPlus", SyntaxKind.PlusToken, SyntaxKind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterAddWhenFollowedByPreincrement", SyntaxKind.PlusToken, SyntaxKind.PlusPlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterPostdecrementWhenFollowedBySubtract", SyntaxKind.MinusMinusToken, SyntaxKind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", SyntaxKind.MinusToken, SyntaxKind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterSubtractWhenFollowedByPredecrement", SyntaxKind.MinusToken, SyntaxKind.MinusMinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),

            rule("NoSpaceAfterCloseBrace", SyntaxKind.CloseBraceToken, [SyntaxKind.CommaToken, SyntaxKind.SemicolonToken], [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            // For functions and control block place } on a new line [multi-line rule]
            rule("NewLineBeforeCloseBraceInBlockContext", anyTokenIncludingMultilineComments, SyntaxKind.CloseBraceToken, [isMultilineBlockContext], RuleAction.InsertNewLine),

            // Space/new line after }.
            rule("SpaceAfterCloseBrace", SyntaxKind.CloseBraceToken, anyTokenExcept(SyntaxKind.CloseParenToken), [isNonJsxSameLineTokenContext, isAfterCodeBlockContext], RuleAction.InsertSpace),
            // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
            // Also should not apply to })
            rule("SpaceBetweenCloseBraceAndElse", SyntaxKind.CloseBraceToken, SyntaxKind.ElseKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBetweenCloseBraceAndWhile", SyntaxKind.CloseBraceToken, SyntaxKind.WhileKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], RuleAction.DeleteSpace),

            // Add a space after control dec context if the next character is an open bracket ex: 'if (false)[a, b] = [1, 2];' -> 'if (false) [a, b] = [1, 2];'
            rule("SpaceAfterConditionalClosingParen", SyntaxKind.CloseParenToken, SyntaxKind.OpenBracketToken, [isControlDeclContext], RuleAction.InsertSpace),

            rule("NoSpaceBetweenFunctionKeywordAndStar", SyntaxKind.FunctionKeyword, SyntaxKind.AsteriskToken, [isFunctionDeclarationOrFunctionExpressionContext], RuleAction.DeleteSpace),
            rule("SpaceAfterStarInGeneratorDeclaration", SyntaxKind.AsteriskToken, SyntaxKind.Identifier, [isFunctionDeclarationOrFunctionExpressionContext], RuleAction.InsertSpace),

            rule("SpaceAfterFunctionInFuncDecl", SyntaxKind.FunctionKeyword, anyToken, [isFunctionDeclContext], RuleAction.InsertSpace),
            // Insert new line after { and before } in multi-line contexts.
            rule("NewLineAfterOpenBraceInBlockContext", SyntaxKind.OpenBraceToken, anyToken, [isMultilineBlockContext], RuleAction.InsertNewLine),

            // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
            // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
            //      get x() {}
            //      set x(val) {}
            rule("SpaceAfterGetSetInMember", [SyntaxKind.GetKeyword, SyntaxKind.SetKeyword], SyntaxKind.Identifier, [isFunctionDeclContext], RuleAction.InsertSpace),

            rule("NoSpaceBetweenYieldKeywordAndStar", SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], RuleAction.DeleteSpace),
            rule("SpaceBetweenYieldOrYieldStarAndOperand", [SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken], anyToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], RuleAction.InsertSpace),

            rule("NoSpaceBetweenReturnAndSemicolon", SyntaxKind.ReturnKeyword, SyntaxKind.SemicolonToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("SpaceAfterCertainKeywords", [SyntaxKind.VarKeyword, SyntaxKind.ThrowKeyword, SyntaxKind.NewKeyword, SyntaxKind.DeleteKeyword, SyntaxKind.ReturnKeyword, SyntaxKind.TypeOfKeyword, SyntaxKind.AwaitKeyword], anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceAfterLetConstInVariableDeclaration", [SyntaxKind.LetKeyword, SyntaxKind.ConstKeyword], anyToken, [isNonJsxSameLineTokenContext, isStartOfVariableDeclarationList], RuleAction.InsertSpace),
            rule("NoSpaceBeforeOpenParenInFuncCall", anyToken, SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isFunctionCallOrNewContext, isPreviousTokenNotComma], RuleAction.DeleteSpace),

            // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
            rule("SpaceBeforeBinaryKeywordOperator", anyToken, binaryKeywordOperators, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterBinaryKeywordOperator", binaryKeywordOperators, anyToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),

            rule("SpaceAfterVoidOperator", SyntaxKind.VoidKeyword, anyToken, [isNonJsxSameLineTokenContext, isVoidOpContext], RuleAction.InsertSpace),

            // Async-await
            rule("SpaceBetweenAsyncAndOpenParen", SyntaxKind.AsyncKeyword, SyntaxKind.OpenParenToken, [isArrowFunctionContext, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBetweenAsyncAndFunctionKeyword", SyntaxKind.AsyncKeyword, [SyntaxKind.FunctionKeyword, SyntaxKind.Identifier], [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

            // Template string
            rule("NoSpaceBetweenTagAndTemplateString", [SyntaxKind.Identifier, SyntaxKind.CloseParenToken], [SyntaxKind.NoSubstitutionTemplateLiteral, SyntaxKind.TemplateHead], [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // JSX opening elements
            rule("SpaceBeforeJsxAttribute", anyToken, SyntaxKind.Identifier, [isNextTokenParentJsxAttribute, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBeforeSlashInJsxOpeningElement", anyToken, SyntaxKind.SlashToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", SyntaxKind.SlashToken, SyntaxKind.GreaterThanToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeEqualInJsxAttribute", anyToken, SyntaxKind.EqualsToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterEqualInJsxAttribute", SyntaxKind.EqualsToken, anyToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // TypeScript-specific rules
            // Use of module as a function call. e.g.: import m2 = module("m2");
            rule("NoSpaceAfterModuleImport", [SyntaxKind.ModuleKeyword, SyntaxKind.RequireKeyword], SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            // Add a space around certain TypeScript keywords
            rule(
                "SpaceAfterCertainTypeScriptKeywords",
                [
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
                    SyntaxKind.InferKeyword,
                ],
                anyToken,
                [isNonJsxSameLineTokenContext],
                RuleAction.InsertSpace),
            rule(
                "SpaceBeforeCertainTypeScriptKeywords",
                anyToken,
                [SyntaxKind.ExtendsKeyword, SyntaxKind.ImplementsKeyword, SyntaxKind.FromKeyword],
                [isNonJsxSameLineTokenContext],
                RuleAction.InsertSpace),
            // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
            rule("SpaceAfterModuleName", SyntaxKind.StringLiteral, SyntaxKind.OpenBraceToken, [isModuleDeclContext], RuleAction.InsertSpace),

            // Lambda expressions
            rule("SpaceBeforeArrow", anyToken, SyntaxKind.EqualsGreaterThanToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceAfterArrow", SyntaxKind.EqualsGreaterThanToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

            // Optional parameters and let args
            rule("NoSpaceAfterEllipsis", SyntaxKind.DotDotDotToken, SyntaxKind.Identifier, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterOptionalParameters", SyntaxKind.QuestionToken, [SyntaxKind.CloseParenToken, SyntaxKind.CommaToken], [isNonJsxSameLineTokenContext, isNotBinaryOpContext], RuleAction.DeleteSpace),

            // Remove spaces in empty interface literals. e.g.: x: {}
            rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectTypeContext], RuleAction.DeleteSpace),

            // generics and type assertions
            rule("NoSpaceBeforeOpenAngularBracket", typeNames, SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
            rule("NoSpaceBetweenCloseParenAndAngularBracket", SyntaxKind.CloseParenToken, SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterOpenAngularBracket", SyntaxKind.LessThanToken, anyToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeCloseAngularBracket", anyToken, SyntaxKind.GreaterThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterCloseAngularBracket",
                SyntaxKind.GreaterThanToken,
                [SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.GreaterThanToken, SyntaxKind.CommaToken],
                [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext, isNotFunctionDeclContext /*To prevent an interference with the SpaceBeforeOpenParenInFuncDecl rule*/],
                RuleAction.DeleteSpace),

            // decorators
            rule("SpaceBeforeAt", [SyntaxKind.CloseParenToken, SyntaxKind.Identifier], SyntaxKind.AtToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterAt", SyntaxKind.AtToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            // Insert space after @ in decorator
            rule("SpaceAfterDecorator",
                anyToken,
                [
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
                ],
                [isEndOfDecoratorContextOnSameLine],
                RuleAction.InsertSpace),

            rule("NoSpaceBeforeNonNullAssertionOperator", anyToken, SyntaxKind.ExclamationToken, [isNonJsxSameLineTokenContext, isNonNullAssertionContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterNewKeywordOnConstructorSignature", SyntaxKind.NewKeyword, SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isConstructorSignatureContext], RuleAction.DeleteSpace),
            rule("SpaceLessThanAndNonJSXTypeAnnotation", SyntaxKind.LessThanToken, SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
        ];

        // These rules are applied after high priority
        const userConfigurableRules = [
            // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
            rule("SpaceAfterConstructor", SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterConstructor", SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            rule("SpaceAfterComma", SyntaxKind.CommaToken, anyToken, [isOptionEnabled("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNextTokenNotCloseBracket, isNextTokenNotCloseParen], RuleAction.InsertSpace),
            rule("NoSpaceAfterComma", SyntaxKind.CommaToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext], RuleAction.DeleteSpace),

            // Insert space after function keyword for anonymous functions
            rule("SpaceAfterAnonymousFunctionKeyword", [SyntaxKind.FunctionKeyword, SyntaxKind.AsteriskToken], SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterAnonymousFunctionKeyword", [SyntaxKind.FunctionKeyword, SyntaxKind.AsteriskToken], SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], RuleAction.DeleteSpace),

            // Insert space after keywords in control flow statements
            rule("SpaceAfterKeywordInControl", keywords, SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterKeywordInControl", keywords, SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], RuleAction.DeleteSpace),

            // Insert space after opening and before closing nonempty parenthesis
            rule("SpaceAfterOpenParen", SyntaxKind.OpenParenToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBeforeCloseParen", anyToken, SyntaxKind.CloseParenToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBetweenOpenParens", SyntaxKind.OpenParenToken, SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceBetweenParens", SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterOpenParen", SyntaxKind.OpenParenToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeCloseParen", anyToken, SyntaxKind.CloseParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // Insert space after opening and before closing nonempty brackets
            rule("SpaceAfterOpenBracket", SyntaxKind.OpenBracketToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("SpaceBeforeCloseBracket", anyToken, SyntaxKind.CloseBracketToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceBetweenBrackets", SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterOpenBracket", SyntaxKind.OpenBracketToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeCloseBracket", anyToken, SyntaxKind.CloseBracketToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
            rule("SpaceAfterOpenBrace", SyntaxKind.OpenBraceToken, anyToken, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], RuleAction.InsertSpace),
            rule("SpaceBeforeCloseBrace", anyToken, SyntaxKind.CloseBraceToken, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], RuleAction.InsertSpace),
            rule("NoSpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterOpenBrace", SyntaxKind.OpenBraceToken, anyToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeCloseBrace", anyToken, SyntaxKind.CloseBraceToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // Insert a space after opening and before closing empty brace brackets
            rule("SpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces")], RuleAction.InsertSpace),
            rule("NoSpaceBetweenEmptyBraceBrackets", SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // Insert space after opening and before closing template string braces
            rule("SpaceAfterTemplateHeadAndMiddle", [SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle], anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
            rule("SpaceBeforeTemplateMiddleAndTail", anyToken, [SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail], [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterTemplateHeadAndMiddle", [SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle], anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], RuleAction.DeleteSpace, RuleFlags.CanDeleteNewLines),
            rule("NoSpaceBeforeTemplateMiddleAndTail", anyToken, [SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail], [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // No space after { and before } in JSX expression
            rule("SpaceAfterOpenBraceInJsxExpression", SyntaxKind.OpenBraceToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.InsertSpace),
            rule("SpaceBeforeCloseBraceInJsxExpression", anyToken, SyntaxKind.CloseBraceToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterOpenBraceInJsxExpression", SyntaxKind.OpenBraceToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.DeleteSpace),
            rule("NoSpaceBeforeCloseBraceInJsxExpression", anyToken, SyntaxKind.CloseBraceToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], RuleAction.DeleteSpace),

            // Insert space after semicolon in for statement
            rule("SpaceAfterSemicolonInFor", SyntaxKind.SemicolonToken, anyToken, [isOptionEnabled("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterSemicolonInFor", SyntaxKind.SemicolonToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], RuleAction.DeleteSpace),

            // Insert space before and after binary operators
            rule("SpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("SpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.InsertSpace),
            rule("NoSpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], RuleAction.DeleteSpace),

            rule("SpaceBeforeOpenParenInFuncDecl", anyToken, SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], RuleAction.InsertSpace),
            rule("NoSpaceBeforeOpenParenInFuncDecl", anyToken, SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], RuleAction.DeleteSpace),

            // Open Brace braces after control block
            rule("NewLineBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),

            // Open Brace braces after function
            // TypeScript: Function can have return types, which can be made of tons of different token kinds
            rule("NewLineBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),
            // Open Brace braces after TypeScript module/class/interface
            rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isBeforeMultilineBlockContext], RuleAction.InsertNewLine, RuleFlags.CanDeleteNewLines),

            rule("SpaceAfterTypeAssertion", SyntaxKind.GreaterThanToken, anyToken, [isOptionEnabled("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], RuleAction.InsertSpace),
            rule("NoSpaceAfterTypeAssertion", SyntaxKind.GreaterThanToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], RuleAction.DeleteSpace),

            rule("SpaceBeforeTypeAnnotation", anyToken, SyntaxKind.ColonToken, [isOptionEnabled("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], RuleAction.InsertSpace),
            rule("NoSpaceBeforeTypeAnnotation", anyToken, SyntaxKind.ColonToken, [isOptionDisabledOrUndefined("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], RuleAction.DeleteSpace),
            rule("NoOptionalSemicolon", SyntaxKind.SemicolonToken, anyTokenIncludingEOF, [optionEquals("semicolons", SemicolonPreference.Remove), isSemicolonDeletionContext], RuleAction.DeleteToken),
            rule("OptionalSemicolon", anyToken, anyTokenIncludingEOF, [optionEquals("semicolons", SemicolonPreference.Insert), isSemicolonInsertionContext], RuleAction.InsertTrailingSemicolon),
        ];

        // These rules are lower in priority than user-configurable. Rules earlier in this list have priority over rules later in the list.
        const lowPriorityCommonRules = [
            // Space after keyword but not before ; or : or ?
            rule("NoSpaceBeforeSemicolon", anyToken, SyntaxKind.SemicolonToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            rule("SpaceBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
            rule("SpaceBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),
            rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], RuleAction.InsertSpace, RuleFlags.CanDeleteNewLines),

            rule("NoSpaceBeforeComma", anyToken, SyntaxKind.CommaToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),

            // No space before and after indexer `x[]`
            rule("NoSpaceBeforeOpenBracket", anyTokenExcept(SyntaxKind.AsyncKeyword, SyntaxKind.CaseKeyword), SyntaxKind.OpenBracketToken, [isNonJsxSameLineTokenContext], RuleAction.DeleteSpace),
            rule("NoSpaceAfterCloseBracket", SyntaxKind.CloseBracketToken, anyToken, [isNonJsxSameLineTokenContext, isNotBeforeBlockInFunctionDeclarationContext], RuleAction.DeleteSpace),
            rule("SpaceAfterSemicolon", SyntaxKind.SemicolonToken, anyToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

            // Remove extra space between for and await
            rule("SpaceBetweenForAndAwaitKeyword", SyntaxKind.ForKeyword, SyntaxKind.AwaitKeyword, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),

            // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
            // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
            rule(
                "SpaceBetweenStatements",
                [SyntaxKind.CloseParenToken, SyntaxKind.DoKeyword, SyntaxKind.ElseKeyword, SyntaxKind.CaseKeyword],
                anyToken,
                [isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNotForContext],
                RuleAction.InsertSpace),
            // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
            rule("SpaceAfterTryFinally", [SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword], SyntaxKind.OpenBraceToken, [isNonJsxSameLineTokenContext], RuleAction.InsertSpace),
        ];

        return [
            ...highPriorityCommonRules,
            ...userConfigurableRules,
            ...lowPriorityCommonRules,
        ];
    }

    /**
     * A rule takes a two tokens (left/right) and a particular context
     * for which you're meant to look at them. You then declare what should the
     * whitespace annotation be between these tokens via the action param.
     *
     * @param debugName Name to print
     * @param left The left side of the comparison
     * @param right The right side of the comparison
     * @param context A set of filters to narrow down the space in which this formatter rule applies
     * @param action a declaration of the expected whitespace
     * @param flags whether the rule deletes a line or not, defaults to no-op
     */
    function rule(
        debugName: string,
        left: SyntaxKind | readonly SyntaxKind[] | TokenRange,
        right: SyntaxKind | readonly SyntaxKind[] | TokenRange,
        context: readonly ContextPredicate[],
        action: RuleAction,
        flags: RuleFlags = RuleFlags.None,
    ): RuleSpec {
        return { leftTokenRange: toTokenRange(left), rightTokenRange: toTokenRange(right), rule: { debugName, context, action, flags } };
    }

    function tokenRangeFrom(tokens: readonly SyntaxKind[]): TokenRange {
        return { tokens, isSpecific: true };
    }

    function toTokenRange(arg: SyntaxKind | readonly SyntaxKind[] | TokenRange): TokenRange {
        return typeof arg === "number" ? tokenRangeFrom([arg]) : isArray(arg) ? tokenRangeFrom(arg) : arg;
    }

    function tokenRangeFromRange(from: SyntaxKind, to: SyntaxKind, except: readonly SyntaxKind[] = []): TokenRange {
        const tokens: SyntaxKind[] = [];
        for (let token = from; token <= to; token++) {
            if (!contains(except, token)) {
                tokens.push(token);
            }
        }
        return tokenRangeFrom(tokens);
    }

    ///
    /// Contexts
    ///

    function optionEquals<K extends keyof FormatCodeSettings>(optionName: K, optionValue: FormatCodeSettings[K]): (context: FormattingContext) => boolean {
        return (context) => context.options && context.options[optionName] === optionValue;
    }

    function isOptionEnabled(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => context.options && context.options.hasOwnProperty(optionName) && !!context.options[optionName];
    }

    function isOptionDisabled(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => context.options && context.options.hasOwnProperty(optionName) && !context.options[optionName];
    }

    function isOptionDisabledOrUndefined(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !context.options[optionName];
    }

    function isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !context.options[optionName] || context.TokensAreOnSameLine();
    }

    function isOptionEnabledOrUndefined(optionName: keyof FormatCodeSettings): (context: FormattingContext) => boolean {
        return (context) => !context.options || !context.options.hasOwnProperty(optionName) || !!context.options[optionName];
    }

    function isForContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ForStatement;
    }

    function isNotForContext(context: FormattingContext): boolean {
        return !isForContext(context);
    }

    function isBinaryOpContext(context: FormattingContext): boolean {
        switch (context.contextNode.kind) {
            case SyntaxKind.BinaryExpression:
                return (<BinaryExpression>context.contextNode).operatorToken.kind !== SyntaxKind.CommaToken;
            case SyntaxKind.ConditionalExpression:
            case SyntaxKind.ConditionalType:
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
            // falls through
            case SyntaxKind.TypeAliasDeclaration:
            // equal in import a = module('a');
            // falls through
            case SyntaxKind.ImportEqualsDeclaration:
            // equal in let a = 0
            // falls through
            case SyntaxKind.VariableDeclaration:
            // equal in p = 0
            // falls through
            case SyntaxKind.Parameter:
            case SyntaxKind.EnumMember:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return context.currentTokenSpan.kind === SyntaxKind.EqualsToken || context.nextTokenSpan.kind === SyntaxKind.EqualsToken;
            // "in" keyword in for (let x in []) { }
            case SyntaxKind.ForInStatement:
            // "in" keyword in [P in keyof T]: T[P]
            // falls through
            case SyntaxKind.TypeParameter:
                return context.currentTokenSpan.kind === SyntaxKind.InKeyword || context.nextTokenSpan.kind === SyntaxKind.InKeyword || context.currentTokenSpan.kind === SyntaxKind.EqualsToken || context.nextTokenSpan.kind === SyntaxKind.EqualsToken;
            // Technically, "of" is not a binary operator, but format it the same way as "in"
            case SyntaxKind.ForOfStatement:
                return context.currentTokenSpan.kind === SyntaxKind.OfKeyword || context.nextTokenSpan.kind === SyntaxKind.OfKeyword;
        }
        return false;
    }

    function isNotBinaryOpContext(context: FormattingContext): boolean {
        return !isBinaryOpContext(context);
    }

    function isNotTypeAnnotationContext(context: FormattingContext): boolean {
        return !isTypeAnnotationContext(context);
    }

    function isTypeAnnotationContext(context: FormattingContext): boolean {
        const contextKind = context.contextNode.kind;
        return contextKind === SyntaxKind.PropertyDeclaration ||
            contextKind === SyntaxKind.PropertySignature ||
            contextKind === SyntaxKind.Parameter ||
            contextKind === SyntaxKind.VariableDeclaration ||
            isFunctionLikeKind(contextKind);
    }

    function isConditionalOperatorContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ConditionalExpression ||
                context.contextNode.kind === SyntaxKind.ConditionalType;
    }

    function isSameLineTokenOrBeforeBlockContext(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() || isBeforeBlockContext(context);
    }

    function isBraceWrappedContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ObjectBindingPattern ||
            context.contextNode.kind === SyntaxKind.MappedType ||
            isSingleLineBlockContext(context);
    }

    // This check is done before an open brace in a control construct, a function, or a typescript block declaration
    function isBeforeMultilineBlockContext(context: FormattingContext): boolean {
        return isBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
    }

    function isMultilineBlockContext(context: FormattingContext): boolean {
        return isBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
    }

    function isSingleLineBlockContext(context: FormattingContext): boolean {
        return isBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
    }

    function isBlockContext(context: FormattingContext): boolean {
        return nodeIsBlockContext(context.contextNode);
    }

    function isBeforeBlockContext(context: FormattingContext): boolean {
        return nodeIsBlockContext(context.nextTokenParent);
    }

    // IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
    function nodeIsBlockContext(node: Node): boolean {
        if (nodeIsTypeScriptDeclWithBlockContext(node)) {
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

    function isFunctionDeclContext(context: FormattingContext): boolean {
        switch (context.contextNode.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            // case SyntaxKind.MemberFunctionDeclaration:
            // falls through
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            // case SyntaxKind.MethodSignature:
            // falls through
            case SyntaxKind.CallSignature:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.Constructor:
            case SyntaxKind.ArrowFunction:
            // case SyntaxKind.ConstructorDeclaration:
            // case SyntaxKind.SimpleArrowFunctionExpression:
            // case SyntaxKind.ParenthesizedArrowFunctionExpression:
            // falls through
            case SyntaxKind.InterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
                return true;
        }

        return false;
    }

    function isNotFunctionDeclContext(context: FormattingContext): boolean {
        return !isFunctionDeclContext(context);
    }

    function isFunctionDeclarationOrFunctionExpressionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.FunctionDeclaration || context.contextNode.kind === SyntaxKind.FunctionExpression;
    }

    function isTypeScriptDeclWithBlockContext(context: FormattingContext): boolean {
        return nodeIsTypeScriptDeclWithBlockContext(context.contextNode);
    }

    function nodeIsTypeScriptDeclWithBlockContext(node: Node): boolean {
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

    function isAfterCodeBlockContext(context: FormattingContext): boolean {
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

    function isControlDeclContext(context: FormattingContext): boolean {
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
            // falls through
            case SyntaxKind.CatchClause:
                return true;

            default:
                return false;
        }
    }

    function isObjectContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ObjectLiteralExpression;
    }

    function isFunctionCallContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.CallExpression;
    }

    function isNewContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.NewExpression;
    }

    function isFunctionCallOrNewContext(context: FormattingContext): boolean {
        return isFunctionCallContext(context) || isNewContext(context);
    }

    function isPreviousTokenNotComma(context: FormattingContext): boolean {
        return context.currentTokenSpan.kind !== SyntaxKind.CommaToken;
    }

    function isNextTokenNotCloseBracket(context: FormattingContext): boolean {
        return context.nextTokenSpan.kind !== SyntaxKind.CloseBracketToken;
    }

    function isNextTokenNotCloseParen(context: FormattingContext): boolean {
        return context.nextTokenSpan.kind !== SyntaxKind.CloseParenToken;
    }

    function isArrowFunctionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ArrowFunction;
    }

    function isImportTypeContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ImportType;
    }

    function isNonJsxSameLineTokenContext(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() && context.contextNode.kind !== SyntaxKind.JsxText;
    }

    function isNonJsxTextContext(context: FormattingContext): boolean {
        return context.contextNode.kind !== SyntaxKind.JsxText;
    }

    function isNonJsxElementOrFragmentContext(context: FormattingContext): boolean {
        return context.contextNode.kind !== SyntaxKind.JsxElement && context.contextNode.kind !== SyntaxKind.JsxFragment;
    }

    function isJsxExpressionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxExpression || context.contextNode.kind === SyntaxKind.JsxSpreadAttribute;
    }

    function isNextTokenParentJsxAttribute(context: FormattingContext): boolean {
        return context.nextTokenParent.kind === SyntaxKind.JsxAttribute;
    }

    function isJsxAttributeContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxAttribute;
    }

    function isJsxSelfClosingElementContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.JsxSelfClosingElement;
    }

    function isNotBeforeBlockInFunctionDeclarationContext(context: FormattingContext): boolean {
        return !isFunctionDeclContext(context) && !isBeforeBlockContext(context);
    }

    function isEndOfDecoratorContextOnSameLine(context: FormattingContext): boolean {
        return context.TokensAreOnSameLine() &&
            !!context.contextNode.decorators &&
            nodeIsInDecoratorContext(context.currentTokenParent) &&
            !nodeIsInDecoratorContext(context.nextTokenParent);
    }

    function nodeIsInDecoratorContext(node: Node): boolean {
        while (isExpressionNode(node)) {
            node = node.parent;
        }
        return node.kind === SyntaxKind.Decorator;
    }

    function isStartOfVariableDeclarationList(context: FormattingContext): boolean {
        return context.currentTokenParent.kind === SyntaxKind.VariableDeclarationList &&
            context.currentTokenParent.getStart(context.sourceFile) === context.currentTokenSpan.pos;
    }

    function isNotFormatOnEnter(context: FormattingContext): boolean {
        return context.formattingRequestKind !== FormattingRequestKind.FormatOnEnter;
    }

    function isModuleDeclContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ModuleDeclaration;
    }

    function isObjectTypeContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.TypeLiteral; // && context.contextNode.parent.kind !== SyntaxKind.InterfaceDeclaration;
    }

    function isConstructorSignatureContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.ConstructSignature;
    }

    function isTypeArgumentOrParameterOrAssertion(token: TextRangeWithKind, parent: Node): boolean {
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

    function isTypeArgumentOrParameterOrAssertionContext(context: FormattingContext): boolean {
        return isTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
            isTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
    }

    function isTypeAssertionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.TypeAssertionExpression;
    }

    function isVoidOpContext(context: FormattingContext): boolean {
        return context.currentTokenSpan.kind === SyntaxKind.VoidKeyword && context.currentTokenParent.kind === SyntaxKind.VoidExpression;
    }

    function isYieldOrYieldStarWithOperand(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.YieldExpression && (<YieldExpression>context.contextNode).expression !== undefined;
    }

    function isNonNullAssertionContext(context: FormattingContext): boolean {
        return context.contextNode.kind === SyntaxKind.NonNullExpression;
    }

    function isNotStatementConditionContext(context: FormattingContext): boolean {
        return !isStatementConditionContext(context);
    }

    function isStatementConditionContext(context: FormattingContext): boolean {
        switch (context.contextNode.kind) {
            case SyntaxKind.IfStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
                return true;

            default:
                return false;
        }
    }

    function isSemicolonDeletionContext(context: FormattingContext): boolean {
        let nextTokenKind = context.nextTokenSpan.kind;
        let nextTokenStart = context.nextTokenSpan.pos;
        if (isTrivia(nextTokenKind)) {
            const nextRealToken = context.nextTokenParent === context.currentTokenParent
                ? findNextToken(
                    context.currentTokenParent,
                    findAncestor(context.currentTokenParent, a => !a.parent)!,
                    context.sourceFile)
                : context.nextTokenParent.getFirstToken(context.sourceFile);
            if (!nextRealToken) {
                return true;
            }
            nextTokenKind = nextRealToken.kind;
            nextTokenStart = nextRealToken.getStart(context.sourceFile);
        }

        const startLine = context.sourceFile.getLineAndCharacterOfPosition(context.currentTokenSpan.pos).line;
        const endLine = context.sourceFile.getLineAndCharacterOfPosition(nextTokenStart).line;
        if (startLine === endLine) {
            return nextTokenKind === SyntaxKind.CloseBraceToken
                || nextTokenKind === SyntaxKind.EndOfFileToken;
        }

        if (nextTokenKind === SyntaxKind.SemicolonClassElement ||
            nextTokenKind === SyntaxKind.SemicolonToken
        ) {
            return false;
        }

        if (context.contextNode.kind === SyntaxKind.InterfaceDeclaration ||
            context.contextNode.kind === SyntaxKind.TypeAliasDeclaration
        ) {
            // Can’t remove semicolon after `foo`; it would parse as a method declaration:
            //
            // interface I {
            //   foo;
            //   (): void
            // }
            return !isPropertySignature(context.currentTokenParent)
                || !!context.currentTokenParent.type
                || nextTokenKind !== SyntaxKind.OpenParenToken;
        }

        if (isPropertyDeclaration(context.currentTokenParent)) {
            return !context.currentTokenParent.initializer;
        }

        return context.currentTokenParent.kind !== SyntaxKind.ForStatement
            && context.currentTokenParent.kind !== SyntaxKind.EmptyStatement
            && context.currentTokenParent.kind !== SyntaxKind.SemicolonClassElement
            && nextTokenKind !== SyntaxKind.OpenBracketToken
            && nextTokenKind !== SyntaxKind.OpenParenToken
            && nextTokenKind !== SyntaxKind.PlusToken
            && nextTokenKind !== SyntaxKind.MinusToken
            && nextTokenKind !== SyntaxKind.SlashToken
            && nextTokenKind !== SyntaxKind.RegularExpressionLiteral
            && nextTokenKind !== SyntaxKind.CommaToken
            && nextTokenKind !== SyntaxKind.TemplateExpression
            && nextTokenKind !== SyntaxKind.TemplateHead
            && nextTokenKind !== SyntaxKind.NoSubstitutionTemplateLiteral
            && nextTokenKind !== SyntaxKind.DotToken;
    }

    function isSemicolonInsertionContext(context: FormattingContext): boolean {
        return positionIsASICandidate(context.currentTokenSpan.end, context.currentTokenParent, context.sourceFile);
    }
}
