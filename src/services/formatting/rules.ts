///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class Rules {
        public getRuleName(rule: Rule) {
            const o: ts.MapLike<any> = <any>this;
            for (const name in o) {
                if (o[name] === rule) {
                    return name;
                }
            }
            throw new Error("Unknown rule");
        }

        [name: string]: any;

        public IgnoreBeforeComment: Rule;
        public IgnoreAfterLineComment: Rule;

        // Space after keyword but not before ; or : or ?
        public NoSpaceBeforeSemicolon: Rule;
        public NoSpaceBeforeColon: Rule;
        public NoSpaceBeforeQuestionMark: Rule;
        public SpaceAfterColon: Rule;
        // insert space after '?' only when it is used in conditional operator
        public SpaceAfterQuestionMarkInConditionalOperator: Rule;
        // in other cases there should be no space between '?' and next token
        public NoSpaceAfterQuestionMark: Rule;

        public SpaceAfterSemicolon: Rule;

        // Space/new line after }.
        public SpaceAfterCloseBrace: Rule;

        // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
        // Also should not apply to })
        public SpaceBetweenCloseBraceAndElse: Rule;
        public SpaceBetweenCloseBraceAndWhile: Rule;
        public NoSpaceAfterCloseBrace: Rule;

        // No space for dot
        public NoSpaceBeforeDot: Rule;
        public NoSpaceAfterDot: Rule;

        // No space before and after indexer
        public NoSpaceBeforeOpenBracket: Rule;
        public NoSpaceAfterCloseBracket: Rule;

        // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
        public SpaceAfterOpenBrace: Rule;
        public SpaceBeforeCloseBrace: Rule;
        public NoSpaceAfterOpenBrace: Rule;
        public NoSpaceBeforeCloseBrace: Rule;
        public NoSpaceBetweenEmptyBraceBrackets: Rule;

        // Insert new line after { and before } in multi-line contexts.
        public NewLineAfterOpenBraceInBlockContext: Rule;

        // For functions and control block place } on a new line    [multi-line rule]
        public NewLineBeforeCloseBraceInBlockContext: Rule;

        // Special handling of unary operators.
        // Prefix operators generally shouldn't have a space between
        // them and their target unary expression.
        public NoSpaceAfterUnaryPrefixOperator: Rule;
        public NoSpaceAfterUnaryPreincrementOperator: Rule;
        public NoSpaceAfterUnaryPredecrementOperator: Rule;
        public NoSpaceBeforeUnaryPostincrementOperator: Rule;
        public NoSpaceBeforeUnaryPostdecrementOperator: Rule;

        // More unary operator special-casing.
        // DevDiv 181814:  Be careful when removing leading whitespace
        // around unary operators.  Examples:
        //      1 - -2  --X-->  1--2
        //      a + ++b --X-->  a+++b
        public SpaceAfterPostincrementWhenFollowedByAdd: Rule;
        public SpaceAfterAddWhenFollowedByUnaryPlus: Rule;
        public SpaceAfterAddWhenFollowedByPreincrement: Rule;
        public SpaceAfterPostdecrementWhenFollowedBySubtract: Rule;
        public SpaceAfterSubtractWhenFollowedByUnaryMinus: Rule;
        public SpaceAfterSubtractWhenFollowedByPredecrement: Rule;

        public NoSpaceBeforeComma: Rule;

        public SpaceAfterCertainKeywords: Rule;
        public SpaceAfterLetConstInVariableDeclaration: Rule;
        public NoSpaceBeforeOpenParenInFuncCall: Rule;
        public SpaceAfterFunctionInFuncDecl: Rule;
        public NoSpaceBeforeOpenParenInFuncDecl: Rule;
        public SpaceAfterVoidOperator: Rule;

        public NoSpaceBetweenReturnAndSemicolon: Rule;

        // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
        // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
        public SpaceBetweenStatements: Rule;

        // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
        public SpaceAfterTryFinally: Rule;

        // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
        // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
        //      get x() {}
        //      set x(val) {}
        public SpaceAfterGetSetInMember: Rule;

        // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
        public SpaceBeforeBinaryKeywordOperator: Rule;
        public SpaceAfterBinaryKeywordOperator: Rule;

        // TypeScript-specific rules

        // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
        public NoSpaceAfterConstructor: Rule;

        // Use of module as a function call. e.g.: import m2 = module("m2");
        public NoSpaceAfterModuleImport: Rule;

        // Add a space around certain TypeScript keywords
        public SpaceAfterCertainTypeScriptKeywords: Rule;
        public SpaceBeforeCertainTypeScriptKeywords: Rule;

        // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
        public SpaceAfterModuleName: Rule;

        // Lambda expressions
        public SpaceBeforeArrow: Rule;
        public SpaceAfterArrow: Rule;

        // Optional parameters and let args
        public NoSpaceAfterEllipsis: Rule;
        public NoSpaceAfterOptionalParameters: Rule;

        // generics
        public NoSpaceBeforeOpenAngularBracket: Rule;
        public NoSpaceBetweenCloseParenAndAngularBracket: Rule;
        public NoSpaceAfterOpenAngularBracket: Rule;
        public NoSpaceBeforeCloseAngularBracket: Rule;
        public NoSpaceAfterCloseAngularBracket: Rule;

        // Remove spaces in empty interface literals. e.g.: x: {}
        public NoSpaceBetweenEmptyInterfaceBraceBrackets: Rule;

        // These rules are higher in priority than user-configurable rules.
        public HighPriorityCommonRules: Rule[];

        // These rules are lower in priority than user-configurable rules.
        public LowPriorityCommonRules: Rule[];

        ///
        /// Rules controlled by user options
        ///

        // Insert space after comma delimiter
        public SpaceAfterComma: Rule;
        public NoSpaceAfterComma: Rule;

        // Insert space before and after binary operators
        public SpaceBeforeBinaryOperator: Rule;
        public SpaceAfterBinaryOperator: Rule;
        public NoSpaceBeforeBinaryOperator: Rule;
        public NoSpaceAfterBinaryOperator: Rule;

        // Insert space after keywords in control flow statements
        public SpaceAfterKeywordInControl: Rule;
        public NoSpaceAfterKeywordInControl: Rule;

        // Open Brace braces after function
        // TypeScript: Function can have return types, which can be made of tons of different token kinds
        public FunctionOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInFunction: Rule;
        public NewLineBeforeOpenBraceInFunction: Rule;

        // Open Brace braces after TypeScript module/class/interface
        public TypeScriptOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        public NewLineBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;

        // Open Brace braces after control block
        public ControlOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInControl: Rule;
        public NewLineBeforeOpenBraceInControl: Rule;

        // Insert space after semicolon in for statement
        public SpaceAfterSemicolonInFor: Rule;
        public NoSpaceAfterSemicolonInFor: Rule;

        // Insert space after opening and before closing nonempty parenthesis
        public SpaceAfterOpenParen: Rule;
        public SpaceBeforeCloseParen: Rule;
        public NoSpaceBetweenParens: Rule;
        public NoSpaceAfterOpenParen: Rule;
        public NoSpaceBeforeCloseParen: Rule;

        // Insert space after opening and before closing nonempty brackets
        public SpaceAfterOpenBracket: Rule;
        public SpaceBeforeCloseBracket: Rule;
        public NoSpaceBetweenBrackets: Rule;
        public NoSpaceAfterOpenBracket: Rule;
        public NoSpaceBeforeCloseBracket: Rule;

        // Insert space after function keyword for anonymous functions
        public SpaceAfterAnonymousFunctionKeyword: Rule;
        public NoSpaceAfterAnonymousFunctionKeyword: Rule;

        // Insert space after @ in decorator
        public SpaceBeforeAt: Rule;
        public NoSpaceAfterAt: Rule;
        public SpaceAfterDecorator: Rule;

        // Generator: function*
        public NoSpaceBetweenFunctionKeywordAndStar: Rule;
        public SpaceAfterStarInGeneratorDeclaration: Rule;
        public NoSpaceBetweenYieldKeywordAndStar: Rule;
        public SpaceBetweenYieldOrYieldStarAndOperand: Rule;

        // Async functions
        public SpaceBetweenAsyncAndOpenParen: Rule;
        public SpaceBetweenAsyncAndFunctionKeyword: Rule;

        // Template strings
        public NoSpaceBetweenTagAndTemplateString: Rule;
        public NoSpaceAfterTemplateHeadAndMiddle: Rule;
        public SpaceAfterTemplateHeadAndMiddle: Rule;
        public NoSpaceBeforeTemplateMiddleAndTail: Rule;
        public SpaceBeforeTemplateMiddleAndTail: Rule;

        // No space after { and before } in JSX expression
        public NoSpaceAfterOpenBraceInJsxExpression: Rule;
        public SpaceAfterOpenBraceInJsxExpression: Rule;
        public NoSpaceBeforeCloseBraceInJsxExpression: Rule;
        public SpaceBeforeCloseBraceInJsxExpression: Rule;

        // JSX opening elements
        public SpaceBeforeJsxAttribute: Rule;
        public SpaceBeforeSlashInJsxOpeningElement: Rule;
        public NoSpaceBeforeGreaterThanTokenInJsxOpeningElement: Rule;
        public NoSpaceBeforeEqualInJsxAttribute: Rule;
        public NoSpaceAfterEqualInJsxAttribute: Rule;

        // No space after type assertions
        public NoSpaceAfterTypeAssertion: Rule;
        public SpaceAfterTypeAssertion: Rule;

        constructor() {
            ///
            /// Common Rules
            ///

            // Leave comments alone
            this.IgnoreBeforeComment = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.Comments), RuleOperation.create1(RuleAction.Ignore));
            this.IgnoreAfterLineComment = new Rule(RuleDescriptor.create3(SyntaxKind.SingleLineCommentTrivia, Shared.TokenRange.Any), RuleOperation.create1(RuleAction.Ignore));

            // Space after keyword but not before ; or : or ?
            this.NoSpaceBeforeSemicolon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.SemicolonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeColon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.ColonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceBeforeQuestionMark = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.QuestionToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.SpaceAfterColon = new Rule(RuleDescriptor.create3(SyntaxKind.ColonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Space));
            this.SpaceAfterQuestionMarkInConditionalOperator = new Rule(RuleDescriptor.create3(SyntaxKind.QuestionToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsConditionalOperatorContext), RuleAction.Space));
            this.NoSpaceAfterQuestionMark = new Rule(RuleDescriptor.create3(SyntaxKind.QuestionToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.SpaceAfterSemicolon = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            // Space after }.
            this.SpaceAfterCloseBrace = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsAfterCodeBlockContext), RuleAction.Space));

            // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
            this.SpaceBetweenCloseBraceAndElse = new Rule(RuleDescriptor.create1(SyntaxKind.CloseBraceToken, SyntaxKind.ElseKeyword), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBetweenCloseBraceAndWhile = new Rule(RuleDescriptor.create1(SyntaxKind.CloseBraceToken, SyntaxKind.WhileKeyword), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceAfterCloseBrace = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBraceToken, Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.CommaToken, SyntaxKind.SemicolonToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // No space for dot
            this.NoSpaceBeforeDot = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.DotToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterDot = new Rule(RuleDescriptor.create3(SyntaxKind.DotToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // No space before and after indexer
            this.NoSpaceBeforeOpenBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterCloseBracket = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBracketToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBeforeBlockInFunctionDeclarationContext), RuleAction.Delete));

            // Place a space before open brace in a function declaration
            this.FunctionOpenBraceLeftTokenRange = Shared.TokenRange.AnyIncludingMultilineComments;
            this.SpaceBeforeOpenBraceInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsBeforeBlockContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
            this.TypeScriptOpenBraceLeftTokenRange = Shared.TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.ClassKeyword, SyntaxKind.ExportKeyword, SyntaxKind.ImportKeyword]);
            this.SpaceBeforeOpenBraceInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Place a space before open brace in a control flow construct
            this.ControlOpenBraceLeftTokenRange = Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.DoKeyword, SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword, SyntaxKind.ElseKeyword]);
            this.SpaceBeforeOpenBraceInControl = new Rule(RuleDescriptor.create2(this.ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
            this.SpaceAfterOpenBrace = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.SpaceBeforeCloseBrace = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.NoSpaceAfterOpenBrace = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseBrace = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Delete));
            this.NoSpaceBetweenEmptyBraceBrackets = new Rule(RuleDescriptor.create1(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsObjectContext), RuleAction.Delete));

            // Insert new line after { and before } in multi-line contexts.
            this.NewLineAfterOpenBraceInBlockContext = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // For functions and control block place } on a new line    [multi-line rule]
            this.NewLineBeforeCloseBraceInBlockContext = new Rule(RuleDescriptor.create2(Shared.TokenRange.AnyIncludingMultilineComments, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // Special handling of unary operators.
            // Prefix operators generally shouldn't have a space between
            // them and their target unary expression.
            this.NoSpaceAfterUnaryPrefixOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.UnaryPrefixOperators, Shared.TokenRange.UnaryPrefixExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPreincrementOperator = new Rule(RuleDescriptor.create3(SyntaxKind.PlusPlusToken, Shared.TokenRange.UnaryPreincrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPredecrementOperator = new Rule(RuleDescriptor.create3(SyntaxKind.MinusMinusToken, Shared.TokenRange.UnaryPredecrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostincrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostincrementExpressions, SyntaxKind.PlusPlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostdecrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostdecrementExpressions, SyntaxKind.MinusMinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // More unary operator special-casing.
            // DevDiv 181814:  Be careful when removing leading whitespace
            // around unary operators.  Examples:
            //      1 - -2  --X-->  1--2
            //      a + ++b --X-->  a+++b
            this.SpaceAfterPostincrementWhenFollowedByAdd = new Rule(RuleDescriptor.create1(SyntaxKind.PlusPlusToken, SyntaxKind.PlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByUnaryPlus = new Rule(RuleDescriptor.create1(SyntaxKind.PlusToken, SyntaxKind.PlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByPreincrement = new Rule(RuleDescriptor.create1(SyntaxKind.PlusToken, SyntaxKind.PlusPlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterPostdecrementWhenFollowedBySubtract = new Rule(RuleDescriptor.create1(SyntaxKind.MinusMinusToken, SyntaxKind.MinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByUnaryMinus = new Rule(RuleDescriptor.create1(SyntaxKind.MinusToken, SyntaxKind.MinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByPredecrement = new Rule(RuleDescriptor.create1(SyntaxKind.MinusToken, SyntaxKind.MinusMinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            this.NoSpaceBeforeComma = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CommaToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            this.SpaceAfterCertainKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.VarKeyword, SyntaxKind.ThrowKeyword, SyntaxKind.NewKeyword, SyntaxKind.DeleteKeyword, SyntaxKind.ReturnKeyword, SyntaxKind.TypeOfKeyword, SyntaxKind.AwaitKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceAfterLetConstInVariableDeclaration = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.LetKeyword, SyntaxKind.ConstKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsStartOfVariableDeclarationList), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncCall = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsFunctionCallOrNewContext, Rules.IsPreviousTokenNotComma), RuleAction.Delete));
            this.SpaceAfterFunctionInFuncDecl = new Rule(RuleDescriptor.create3(SyntaxKind.FunctionKeyword, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncDecl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsFunctionDeclContext), RuleAction.Delete));
            this.SpaceAfterVoidOperator = new Rule(RuleDescriptor.create3(SyntaxKind.VoidKeyword, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsVoidOpContext), RuleAction.Space));

            this.NoSpaceBetweenReturnAndSemicolon = new Rule(RuleDescriptor.create1(SyntaxKind.ReturnKeyword, SyntaxKind.SemicolonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
            // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
            this.SpaceBetweenStatements = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.DoKeyword, SyntaxKind.ElseKeyword, SyntaxKind.CaseKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNonJsxElementContext, Rules.IsNotForContext), RuleAction.Space));

            // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
            this.SpaceAfterTryFinally = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword]), SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            //      get x() {}
            //      set x(val) {}
            this.SpaceAfterGetSetInMember = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.GetKeyword, SyntaxKind.SetKeyword]), SyntaxKind.Identifier), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));

            // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
            this.SpaceBeforeBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryKeywordOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryKeywordOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            // TypeScript-specific higher priority rules

            // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
            this.NoSpaceAfterConstructor = new Rule(RuleDescriptor.create1(SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // Use of module as a function call. e.g.: import m2 = module("m2");
            this.NoSpaceAfterModuleImport = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.ModuleKeyword, SyntaxKind.RequireKeyword]), SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // Add a space around certain TypeScript keywords
            this.SpaceAfterCertainTypeScriptKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.AbstractKeyword, SyntaxKind.ClassKeyword, SyntaxKind.DeclareKeyword, SyntaxKind.DefaultKeyword, SyntaxKind.EnumKeyword, SyntaxKind.ExportKeyword, SyntaxKind.ExtendsKeyword, SyntaxKind.GetKeyword, SyntaxKind.ImplementsKeyword, SyntaxKind.ImportKeyword, SyntaxKind.InterfaceKeyword, SyntaxKind.ModuleKeyword, SyntaxKind.NamespaceKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.PublicKeyword, SyntaxKind.ProtectedKeyword, SyntaxKind.SetKeyword, SyntaxKind.StaticKeyword, SyntaxKind.TypeKeyword, SyntaxKind.FromKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCertainTypeScriptKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.FromTokens([SyntaxKind.ExtendsKeyword, SyntaxKind.ImplementsKeyword, SyntaxKind.FromKeyword])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
            this.SpaceAfterModuleName = new Rule(RuleDescriptor.create1(SyntaxKind.StringLiteral, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsModuleDeclContext), RuleAction.Space));

            // Lambda expressions
            this.SpaceBeforeArrow = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.EqualsGreaterThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceAfterArrow = new Rule(RuleDescriptor.create3(SyntaxKind.EqualsGreaterThanToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            // Optional parameters and let args
            this.NoSpaceAfterEllipsis = new Rule(RuleDescriptor.create1(SyntaxKind.DotDotDotToken, SyntaxKind.Identifier), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOptionalParameters = new Rule(RuleDescriptor.create3(SyntaxKind.QuestionToken, Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.CommaToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));

            // generics and type assertions
            this.NoSpaceBeforeOpenAngularBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.TypeNames, SyntaxKind.LessThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeArgumentOrParameterOrAssertionContext), RuleAction.Delete));
            this.NoSpaceBetweenCloseParenAndAngularBracket = new Rule(RuleDescriptor.create1(SyntaxKind.CloseParenToken, SyntaxKind.LessThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeArgumentOrParameterOrAssertionContext), RuleAction.Delete));
            this.NoSpaceAfterOpenAngularBracket = new Rule(RuleDescriptor.create3(SyntaxKind.LessThanToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeArgumentOrParameterOrAssertionContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseAngularBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.GreaterThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeArgumentOrParameterOrAssertionContext), RuleAction.Delete));
            this.NoSpaceAfterCloseAngularBracket = new Rule(RuleDescriptor.create3(SyntaxKind.GreaterThanToken, Shared.TokenRange.FromTokens([SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.GreaterThanToken, SyntaxKind.CommaToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeArgumentOrParameterOrAssertionContext), RuleAction.Delete));

            // Remove spaces in empty interface literals. e.g.: x: {}
            this.NoSpaceBetweenEmptyInterfaceBraceBrackets = new Rule(RuleDescriptor.create1(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsObjectTypeContext), RuleAction.Delete));

            // decorators
            this.SpaceBeforeAt = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.AtToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceAfterAt = new Rule(RuleDescriptor.create3(SyntaxKind.AtToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.SpaceAfterDecorator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.FromTokens([SyntaxKind.AbstractKeyword, SyntaxKind.Identifier, SyntaxKind.ExportKeyword, SyntaxKind.DefaultKeyword, SyntaxKind.ClassKeyword, SyntaxKind.StaticKeyword, SyntaxKind.PublicKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.ProtectedKeyword, SyntaxKind.GetKeyword, SyntaxKind.SetKeyword, SyntaxKind.OpenBracketToken, SyntaxKind.AsteriskToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsEndOfDecoratorContextOnSameLine), RuleAction.Space));

            this.NoSpaceBetweenFunctionKeywordAndStar = new Rule(RuleDescriptor.create1(SyntaxKind.FunctionKeyword, SyntaxKind.AsteriskToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclarationOrFunctionExpressionContext), RuleAction.Delete));
            this.SpaceAfterStarInGeneratorDeclaration = new Rule(RuleDescriptor.create3(SyntaxKind.AsteriskToken, Shared.TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.OpenParenToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclarationOrFunctionExpressionContext), RuleAction.Space));
            this.NoSpaceBetweenYieldKeywordAndStar = new Rule(RuleDescriptor.create1(SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsYieldOrYieldStarWithOperand), RuleAction.Delete));
            this.SpaceBetweenYieldOrYieldStarAndOperand = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.YieldKeyword, SyntaxKind.AsteriskToken]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsYieldOrYieldStarWithOperand), RuleAction.Space));

            // Async-await
            this.SpaceBetweenAsyncAndOpenParen = new Rule(RuleDescriptor.create1(SyntaxKind.AsyncKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsArrowFunctionContext, Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBetweenAsyncAndFunctionKeyword = new Rule(RuleDescriptor.create1(SyntaxKind.AsyncKeyword, SyntaxKind.FunctionKeyword), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            // template string
            this.NoSpaceBetweenTagAndTemplateString = new Rule(RuleDescriptor.create3(SyntaxKind.Identifier, Shared.TokenRange.FromTokens([SyntaxKind.NoSubstitutionTemplateLiteral, SyntaxKind.TemplateHead])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // jsx opening element
            this.SpaceBeforeJsxAttribute = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.Identifier), RuleOperation.create2(new RuleOperationContext(Rules.IsNextTokenParentJsxAttribute, Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeSlashInJsxOpeningElement = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.SlashToken), RuleOperation.create2(new RuleOperationContext(Rules.IsJsxSelfClosingElementContext, Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBeforeGreaterThanTokenInJsxOpeningElement = new Rule(RuleDescriptor.create1(SyntaxKind.SlashToken, SyntaxKind.GreaterThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsJsxSelfClosingElementContext, Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeEqualInJsxAttribute = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.EqualsToken), RuleOperation.create2(new RuleOperationContext(Rules.IsJsxAttributeContext, Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterEqualInJsxAttribute = new Rule(RuleDescriptor.create3(SyntaxKind.EqualsToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsJsxAttributeContext, Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // These rules are higher in priority than user-configurable rules.
            this.HighPriorityCommonRules = [
                this.IgnoreBeforeComment, this.IgnoreAfterLineComment,
                this.NoSpaceBeforeColon, this.SpaceAfterColon, this.NoSpaceBeforeQuestionMark, this.SpaceAfterQuestionMarkInConditionalOperator,
                this.NoSpaceAfterQuestionMark,
                this.NoSpaceBeforeDot, this.NoSpaceAfterDot,
                this.NoSpaceAfterUnaryPrefixOperator,
                this.NoSpaceAfterUnaryPreincrementOperator, this.NoSpaceAfterUnaryPredecrementOperator,
                this.NoSpaceBeforeUnaryPostincrementOperator, this.NoSpaceBeforeUnaryPostdecrementOperator,
                this.SpaceAfterPostincrementWhenFollowedByAdd,
                this.SpaceAfterAddWhenFollowedByUnaryPlus, this.SpaceAfterAddWhenFollowedByPreincrement,
                this.SpaceAfterPostdecrementWhenFollowedBySubtract,
                this.SpaceAfterSubtractWhenFollowedByUnaryMinus, this.SpaceAfterSubtractWhenFollowedByPredecrement,
                this.NoSpaceAfterCloseBrace,
                this.NewLineBeforeCloseBraceInBlockContext,
                this.SpaceAfterCloseBrace, this.SpaceBetweenCloseBraceAndElse, this.SpaceBetweenCloseBraceAndWhile, this.NoSpaceBetweenEmptyBraceBrackets,
                this.NoSpaceBetweenFunctionKeywordAndStar, this.SpaceAfterStarInGeneratorDeclaration,
                this.SpaceAfterFunctionInFuncDecl, this.NewLineAfterOpenBraceInBlockContext, this.SpaceAfterGetSetInMember,
                this.NoSpaceBetweenYieldKeywordAndStar, this.SpaceBetweenYieldOrYieldStarAndOperand,
                this.NoSpaceBetweenReturnAndSemicolon,
                this.SpaceAfterCertainKeywords,
                this.SpaceAfterLetConstInVariableDeclaration,
                this.NoSpaceBeforeOpenParenInFuncCall,
                this.SpaceBeforeBinaryKeywordOperator, this.SpaceAfterBinaryKeywordOperator,
                this.SpaceAfterVoidOperator,
                this.SpaceBetweenAsyncAndOpenParen, this.SpaceBetweenAsyncAndFunctionKeyword,
                this.NoSpaceBetweenTagAndTemplateString,
                this.SpaceBeforeJsxAttribute, this.SpaceBeforeSlashInJsxOpeningElement, this.NoSpaceBeforeGreaterThanTokenInJsxOpeningElement,
                this.NoSpaceBeforeEqualInJsxAttribute, this.NoSpaceAfterEqualInJsxAttribute,

                // TypeScript-specific rules
                this.NoSpaceAfterConstructor, this.NoSpaceAfterModuleImport,
                this.SpaceAfterCertainTypeScriptKeywords, this.SpaceBeforeCertainTypeScriptKeywords,
                this.SpaceAfterModuleName,
                this.SpaceBeforeArrow, this.SpaceAfterArrow,
                this.NoSpaceAfterEllipsis,
                this.NoSpaceAfterOptionalParameters,
                this.NoSpaceBetweenEmptyInterfaceBraceBrackets,
                this.NoSpaceBeforeOpenAngularBracket,
                this.NoSpaceBetweenCloseParenAndAngularBracket,
                this.NoSpaceAfterOpenAngularBracket,
                this.NoSpaceBeforeCloseAngularBracket,
                this.NoSpaceAfterCloseAngularBracket,
                this.SpaceBeforeAt,
                this.NoSpaceAfterAt,
                this.SpaceAfterDecorator,
            ];

            // These rules are lower in priority than user-configurable rules.
            this.LowPriorityCommonRules = [
                this.NoSpaceBeforeSemicolon,
                this.SpaceBeforeOpenBraceInControl, this.SpaceBeforeOpenBraceInFunction, this.SpaceBeforeOpenBraceInTypeScriptDeclWithBlock,
                this.NoSpaceBeforeComma,
                this.NoSpaceBeforeOpenBracket,
                this.NoSpaceAfterCloseBracket,
                this.SpaceAfterSemicolon,
                this.NoSpaceBeforeOpenParenInFuncDecl,
                this.SpaceBetweenStatements, this.SpaceAfterTryFinally
            ];

            ///
            /// Rules controlled by user options
            ///

            // Insert space after comma delimiter
            this.SpaceAfterComma = new Rule(RuleDescriptor.create3(SyntaxKind.CommaToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNonJsxElementContext, Rules.IsNextTokenNotCloseBracket), RuleAction.Space));
            this.NoSpaceAfterComma = new Rule(RuleDescriptor.create3(SyntaxKind.CommaToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsNonJsxElementContext), RuleAction.Delete));

            // Insert space before and after binary operators
            this.SpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.NoSpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));

            // Insert space after keywords in control flow statements
            this.SpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Space));
            this.NoSpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Delete));

            // Open Brace braces after function
            // TypeScript: Function can have return types, which can be made of tons of different token kinds
            this.NewLineBeforeOpenBraceInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open Brace braces after TypeScript module/class/interface
            this.NewLineBeforeOpenBraceInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open Brace braces after control block
            this.NewLineBeforeOpenBraceInControl = new Rule(RuleDescriptor.create2(this.ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Insert space after semicolon in for statement
            this.SpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsForContext), RuleAction.Space));
            this.NoSpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsForContext), RuleAction.Delete));

            // Insert space after opening and before closing nonempty parenthesis
            this.SpaceAfterOpenParen = new Rule(RuleDescriptor.create3(SyntaxKind.OpenParenToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBetweenParens = new Rule(RuleDescriptor.create1(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenParen = new Rule(RuleDescriptor.create3(SyntaxKind.OpenParenToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // Insert space after opening and before closing nonempty brackets
            this.SpaceAfterOpenBracket = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBracketToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCloseBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBetweenBrackets = new Rule(RuleDescriptor.create1(SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenBracket = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBracketToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));

            // Insert space after opening and before closing template string braces
            this.NoSpaceAfterTemplateHeadAndMiddle = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.SpaceAfterTemplateHeadAndMiddle = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.TemplateHead, SyntaxKind.TemplateMiddle]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBeforeTemplateMiddleAndTail = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.FromTokens([SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Delete));
            this.SpaceBeforeTemplateMiddleAndTail = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.FromTokens([SyntaxKind.TemplateMiddle, SyntaxKind.TemplateTail])), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext), RuleAction.Space));

            // No space after { and before } in JSX expression
            this.NoSpaceAfterOpenBraceInJsxExpression = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsJsxExpressionContext), RuleAction.Delete));
            this.SpaceAfterOpenBraceInJsxExpression = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsJsxExpressionContext), RuleAction.Space));
            this.NoSpaceBeforeCloseBraceInJsxExpression = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsJsxExpressionContext), RuleAction.Delete));
            this.SpaceBeforeCloseBraceInJsxExpression = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsJsxExpressionContext), RuleAction.Space));

            // Insert space after function keyword for anonymous functions
            this.SpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Delete));

            // No space after type assertion
            this.NoSpaceAfterTypeAssertion = new Rule(RuleDescriptor.create3(SyntaxKind.GreaterThanToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeAssertionContext), RuleAction.Delete));
            this.SpaceAfterTypeAssertion = new Rule(RuleDescriptor.create3(SyntaxKind.GreaterThanToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsNonJsxSameLineTokenContext, Rules.IsTypeAssertionContext), RuleAction.Space));

        }

        ///
        /// Contexts
        ///

        static IsForContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ForStatement;
        }

        static IsNotForContext(context: FormattingContext): boolean {
            return !Rules.IsForContext(context);
        }

        static IsBinaryOpContext(context: FormattingContext): boolean {

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
                    return context.currentTokenSpan.kind === SyntaxKind.InKeyword || context.nextTokenSpan.kind === SyntaxKind.InKeyword;
                // Technically, "of" is not a binary operator, but format it the same way as "in"
                case SyntaxKind.ForOfStatement:
                    return context.currentTokenSpan.kind === SyntaxKind.OfKeyword || context.nextTokenSpan.kind === SyntaxKind.OfKeyword;
            }
            return false;
        }

        static IsNotBinaryOpContext(context: FormattingContext): boolean {
            return !Rules.IsBinaryOpContext(context);
        }

        static IsConditionalOperatorContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ConditionalExpression;
        }

        static IsSameLineTokenOrBeforeMultilineBlockContext(context: FormattingContext): boolean {
            //// This check is mainly used inside SpaceBeforeOpenBraceInControl and SpaceBeforeOpenBraceInFunction.
            ////
            //// Ex:
            //// if (1)     { ....
            ////      * ) and { are on the same line so apply the rule. Here we don't care whether it's same or multi block context
            ////
            //// Ex:
            //// if (1)
            //// { ... }
            ////      * ) and { are on different lines. We only need to format if the block is multiline context. So in this case we don't format.
            ////
            //// Ex:
            //// if (1)
            //// { ...
            //// }
            ////      * ) and { are on different lines. We only need to format if the block is multiline context. So in this case we format.

            return context.TokensAreOnSameLine() || Rules.IsBeforeMultilineBlockContext(context);
        }

        // This check is done before an open brace in a control construct, a function, or a typescript block declaration
        static IsBeforeMultilineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
        }

        static IsMultilineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }

        static IsSingleLineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }

        static IsBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsBlockContext(context.contextNode);
        }

        static IsBeforeBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsBlockContext(context.nextTokenParent);
        }

        // IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
        static NodeIsBlockContext(node: Node): boolean {
            if (Rules.NodeIsTypeScriptDeclWithBlockContext(node)) {
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

        static IsFunctionDeclContext(context: FormattingContext): boolean {
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

        static IsFunctionDeclarationOrFunctionExpressionContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.FunctionDeclaration || context.contextNode.kind === SyntaxKind.FunctionExpression;
        }

        static IsTypeScriptDeclWithBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsTypeScriptDeclWithBlockContext(context.contextNode);
        }

        static NodeIsTypeScriptDeclWithBlockContext(node: Node): boolean {
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

        static IsAfterCodeBlockContext(context: FormattingContext): boolean {
            switch (context.currentTokenParent.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.Block:
                case SyntaxKind.CatchClause:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.SwitchStatement:
                    return true;
            }
            return false;
        }

        static IsControlDeclContext(context: FormattingContext): boolean {
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

        static IsObjectContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ObjectLiteralExpression;
        }

        static IsFunctionCallContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.CallExpression;
        }

        static IsNewContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.NewExpression;
        }

        static IsFunctionCallOrNewContext(context: FormattingContext): boolean {
            return Rules.IsFunctionCallContext(context) || Rules.IsNewContext(context);
        }

        static IsPreviousTokenNotComma(context: FormattingContext): boolean {
            return context.currentTokenSpan.kind !== SyntaxKind.CommaToken;
        }

        static IsNextTokenNotCloseBracket(context: FormattingContext): boolean {
            return context.nextTokenSpan.kind !== SyntaxKind.CloseBracketToken;
        }

        static IsArrowFunctionContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ArrowFunction;
        }

        static IsNonJsxSameLineTokenContext(context: FormattingContext): boolean {
            return context.TokensAreOnSameLine() && context.contextNode.kind !== SyntaxKind.JsxText;
        }

        static IsNonJsxElementContext(context: FormattingContext): boolean {
            return context.contextNode.kind !== SyntaxKind.JsxElement;
        }

        static IsJsxExpressionContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.JsxExpression;
        }

        static IsNextTokenParentJsxAttribute(context: FormattingContext): boolean {
            return context.nextTokenParent.kind === SyntaxKind.JsxAttribute;
        }

        static IsJsxAttributeContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.JsxAttribute;
        }

        static IsJsxSelfClosingElementContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.JsxSelfClosingElement;
        }

        static IsNotBeforeBlockInFunctionDeclarationContext(context: FormattingContext): boolean {
            return !Rules.IsFunctionDeclContext(context) && !Rules.IsBeforeBlockContext(context);
        }

        static IsEndOfDecoratorContextOnSameLine(context: FormattingContext): boolean {
            return context.TokensAreOnSameLine() &&
                context.contextNode.decorators &&
                Rules.NodeIsInDecoratorContext(context.currentTokenParent) &&
                !Rules.NodeIsInDecoratorContext(context.nextTokenParent);
        }

        static NodeIsInDecoratorContext(node: Node): boolean {
            while (isPartOfExpression(node)) {
                node = node.parent;
            }
            return node.kind === SyntaxKind.Decorator;
        }

        static IsStartOfVariableDeclarationList(context: FormattingContext): boolean {
            return context.currentTokenParent.kind === SyntaxKind.VariableDeclarationList &&
                context.currentTokenParent.getStart(context.sourceFile) === context.currentTokenSpan.pos;
        }

        static IsNotFormatOnEnter(context: FormattingContext): boolean {
            return context.formattingRequestKind !== FormattingRequestKind.FormatOnEnter;
        }

        static IsModuleDeclContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ModuleDeclaration;
        }

        static IsObjectTypeContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.TypeLiteral; // && context.contextNode.parent.kind !== SyntaxKind.InterfaceDeclaration;
        }

        static IsTypeArgumentOrParameterOrAssertion(token: TextRangeWithKind, parent: Node): boolean {
            if (token.kind !== SyntaxKind.LessThanToken && token.kind !== SyntaxKind.GreaterThanToken) {
                return false;
            }
            switch (parent.kind) {
                case SyntaxKind.TypeReference:
                case SyntaxKind.TypeAssertionExpression:
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

        static IsTypeArgumentOrParameterOrAssertionContext(context: FormattingContext): boolean {
            return Rules.IsTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
                Rules.IsTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
        }

        static IsTypeAssertionContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.TypeAssertionExpression;
        }

        static IsVoidOpContext(context: FormattingContext): boolean {
            return context.currentTokenSpan.kind === SyntaxKind.VoidKeyword && context.currentTokenParent.kind === SyntaxKind.VoidExpression;
        }

        static IsYieldOrYieldStarWithOperand(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.YieldExpression && (<YieldExpression>context.contextNode).expression !== undefined;
        }
    }
}