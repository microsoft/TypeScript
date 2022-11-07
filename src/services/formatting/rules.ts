import * as ts from "../_namespaces/ts";

/** @internal */
export interface RuleSpec {
    readonly leftTokenRange: ts.formatting.TokenRange;
    readonly rightTokenRange: ts.formatting.TokenRange;
    readonly rule: ts.formatting.Rule;
}

/** @internal */
export function getAllRules(): RuleSpec[] {
    const allTokens: ts.SyntaxKind[] = [];
    for (let token = ts.SyntaxKind.FirstToken; token <= ts.SyntaxKind.LastToken; token++) {
        if (token !== ts.SyntaxKind.EndOfFileToken) {
            allTokens.push(token);
        }
    }
    function anyTokenExcept(...tokens: ts.SyntaxKind[]): ts.formatting.TokenRange {
        return { tokens: allTokens.filter(t => !tokens.some(t2 => t2 === t)), isSpecific: false };
    }

    const anyToken: ts.formatting.TokenRange = { tokens: allTokens, isSpecific: false };
    const anyTokenIncludingMultilineComments = tokenRangeFrom([...allTokens, ts.SyntaxKind.MultiLineCommentTrivia]);
    const anyTokenIncludingEOF = tokenRangeFrom([...allTokens, ts.SyntaxKind.EndOfFileToken]);
    const keywords = tokenRangeFromRange(ts.SyntaxKind.FirstKeyword, ts.SyntaxKind.LastKeyword);
    const binaryOperators = tokenRangeFromRange(ts.SyntaxKind.FirstBinaryOperator, ts.SyntaxKind.LastBinaryOperator);
    const binaryKeywordOperators = [ts.SyntaxKind.InKeyword, ts.SyntaxKind.InstanceOfKeyword, ts.SyntaxKind.OfKeyword, ts.SyntaxKind.AsKeyword, ts.SyntaxKind.IsKeyword];
    const unaryPrefixOperators = [ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.MinusMinusToken, ts.SyntaxKind.TildeToken, ts.SyntaxKind.ExclamationToken];
    const unaryPrefixExpressions = [
        ts.SyntaxKind.NumericLiteral, ts.SyntaxKind.BigIntLiteral, ts.SyntaxKind.Identifier, ts.SyntaxKind.OpenParenToken,
        ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.ThisKeyword, ts.SyntaxKind.NewKeyword];
    const unaryPreincrementExpressions = [ts.SyntaxKind.Identifier, ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.ThisKeyword, ts.SyntaxKind.NewKeyword];
    const unaryPostincrementExpressions = [ts.SyntaxKind.Identifier, ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.CloseBracketToken, ts.SyntaxKind.NewKeyword];
    const unaryPredecrementExpressions = [ts.SyntaxKind.Identifier, ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.ThisKeyword, ts.SyntaxKind.NewKeyword];
    const unaryPostdecrementExpressions = [ts.SyntaxKind.Identifier, ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.CloseBracketToken, ts.SyntaxKind.NewKeyword];
    const comments = [ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.MultiLineCommentTrivia];
    const typeNames = [ts.SyntaxKind.Identifier, ...ts.typeKeywords];

    // Place a space before open brace in a function declaration
    // TypeScript: Function can have return types, which can be made of tons of different token kinds
    const functionOpenBraceLeftTokenRange = anyTokenIncludingMultilineComments;

    // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
    const typeScriptOpenBraceLeftTokenRange = tokenRangeFrom([ts.SyntaxKind.Identifier, ts.SyntaxKind.MultiLineCommentTrivia, ts.SyntaxKind.ClassKeyword, ts.SyntaxKind.ExportKeyword, ts.SyntaxKind.ImportKeyword]);

    // Place a space before open brace in a control flow construct
    const controlOpenBraceLeftTokenRange = tokenRangeFrom([ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.MultiLineCommentTrivia, ts.SyntaxKind.DoKeyword, ts.SyntaxKind.TryKeyword, ts.SyntaxKind.FinallyKeyword, ts.SyntaxKind.ElseKeyword]);

    // These rules are higher in priority than user-configurable
    const highPriorityCommonRules = [
        // Leave comments alone
        rule("IgnoreBeforeComment", anyToken, comments, ts.formatting.anyContext, ts.formatting.RuleAction.StopProcessingSpaceActions),
        rule("IgnoreAfterLineComment", ts.SyntaxKind.SingleLineCommentTrivia, anyToken, ts.formatting.anyContext, ts.formatting.RuleAction.StopProcessingSpaceActions),

        rule("NotSpaceBeforeColon", anyToken, ts.SyntaxKind.ColonToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceAfterColon", ts.SyntaxKind.ColonToken, anyToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeQuestionMark", anyToken, ts.SyntaxKind.QuestionToken, [isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext], ts.formatting.RuleAction.DeleteSpace),
        // insert space after '?' only when it is used in conditional operator
        rule("SpaceAfterQuestionMarkInConditionalOperator", ts.SyntaxKind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext, isConditionalOperatorContext], ts.formatting.RuleAction.InsertSpace),

        // in other cases there should be no space between '?' and next token
        rule("NoSpaceAfterQuestionMark", ts.SyntaxKind.QuestionToken, anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        rule("NoSpaceBeforeDot", anyToken, [ts.SyntaxKind.DotToken, ts.SyntaxKind.QuestionDotToken], [isNonJsxSameLineTokenContext, isNotPropertyAccessOnIntegerLiteral], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterDot", [ts.SyntaxKind.DotToken, ts.SyntaxKind.QuestionDotToken], anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        rule("NoSpaceBetweenImportParenInImportType", ts.SyntaxKind.ImportKeyword, ts.SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isImportTypeContext], ts.formatting.RuleAction.DeleteSpace),

        // Special handling of unary operators.
        // Prefix operators generally shouldn't have a space between
        // them and their target unary expression.
        rule("NoSpaceAfterUnaryPrefixOperator", unaryPrefixOperators, unaryPrefixExpressions, [isNonJsxSameLineTokenContext, isNotBinaryOpContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterUnaryPreincrementOperator", ts.SyntaxKind.PlusPlusToken, unaryPreincrementExpressions, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterUnaryPredecrementOperator", ts.SyntaxKind.MinusMinusToken, unaryPredecrementExpressions, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeUnaryPostincrementOperator", unaryPostincrementExpressions, ts.SyntaxKind.PlusPlusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeUnaryPostdecrementOperator", unaryPostdecrementExpressions, ts.SyntaxKind.MinusMinusToken, [isNonJsxSameLineTokenContext, isNotStatementConditionContext], ts.formatting.RuleAction.DeleteSpace),

        // More unary operator special-casing.
        // DevDiv 181814: Be careful when removing leading whitespace
        // around unary operators.  Examples:
        //      1 - -2  --X--> 1--2
        //      a + ++b --X--> a+++b
        rule("SpaceAfterPostincrementWhenFollowedByAdd", ts.SyntaxKind.PlusPlusToken, ts.SyntaxKind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterAddWhenFollowedByUnaryPlus", ts.SyntaxKind.PlusToken, ts.SyntaxKind.PlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterAddWhenFollowedByPreincrement", ts.SyntaxKind.PlusToken, ts.SyntaxKind.PlusPlusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterPostdecrementWhenFollowedBySubtract", ts.SyntaxKind.MinusMinusToken, ts.SyntaxKind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", ts.SyntaxKind.MinusToken, ts.SyntaxKind.MinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterSubtractWhenFollowedByPredecrement", ts.SyntaxKind.MinusToken, ts.SyntaxKind.MinusMinusToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),

        rule("NoSpaceAfterCloseBrace", ts.SyntaxKind.CloseBraceToken, [ts.SyntaxKind.CommaToken, ts.SyntaxKind.SemicolonToken], [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        // For functions and control block place } on a new line [multi-line rule]
        rule("NewLineBeforeCloseBraceInBlockContext", anyTokenIncludingMultilineComments, ts.SyntaxKind.CloseBraceToken, [isMultilineBlockContext], ts.formatting.RuleAction.InsertNewLine),

        // Space/new line after }.
        rule("SpaceAfterCloseBrace", ts.SyntaxKind.CloseBraceToken, anyTokenExcept(ts.SyntaxKind.CloseParenToken), [isNonJsxSameLineTokenContext, isAfterCodeBlockContext], ts.formatting.RuleAction.InsertSpace),
        // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
        // Also should not apply to })
        rule("SpaceBetweenCloseBraceAndElse", ts.SyntaxKind.CloseBraceToken, ts.SyntaxKind.ElseKeyword, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBetweenCloseBraceAndWhile", ts.SyntaxKind.CloseBraceToken, ts.SyntaxKind.WhileKeyword, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBetweenEmptyBraceBrackets", ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], ts.formatting.RuleAction.DeleteSpace),

        // Add a space after control dec context if the next character is an open bracket ex: 'if (false)[a, b] = [1, 2];' -> 'if (false) [a, b] = [1, 2];'
        rule("SpaceAfterConditionalClosingParen", ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.OpenBracketToken, [isControlDeclContext], ts.formatting.RuleAction.InsertSpace),

        rule("NoSpaceBetweenFunctionKeywordAndStar", ts.SyntaxKind.FunctionKeyword, ts.SyntaxKind.AsteriskToken, [isFunctionDeclarationOrFunctionExpressionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceAfterStarInGeneratorDeclaration", ts.SyntaxKind.AsteriskToken, ts.SyntaxKind.Identifier, [isFunctionDeclarationOrFunctionExpressionContext], ts.formatting.RuleAction.InsertSpace),

        rule("SpaceAfterFunctionInFuncDecl", ts.SyntaxKind.FunctionKeyword, anyToken, [isFunctionDeclContext], ts.formatting.RuleAction.InsertSpace),
        // Insert new line after { and before } in multi-line contexts.
        rule("NewLineAfterOpenBraceInBlockContext", ts.SyntaxKind.OpenBraceToken, anyToken, [isMultilineBlockContext], ts.formatting.RuleAction.InsertNewLine),

        // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
        // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
        //      get x() {}
        //      set x(val) {}
        rule("SpaceAfterGetSetInMember", [ts.SyntaxKind.GetKeyword, ts.SyntaxKind.SetKeyword], ts.SyntaxKind.Identifier, [isFunctionDeclContext], ts.formatting.RuleAction.InsertSpace),

        rule("NoSpaceBetweenYieldKeywordAndStar", ts.SyntaxKind.YieldKeyword, ts.SyntaxKind.AsteriskToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceBetweenYieldOrYieldStarAndOperand", [ts.SyntaxKind.YieldKeyword, ts.SyntaxKind.AsteriskToken], anyToken, [isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand], ts.formatting.RuleAction.InsertSpace),

        rule("NoSpaceBetweenReturnAndSemicolon", ts.SyntaxKind.ReturnKeyword, ts.SyntaxKind.SemicolonToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceAfterCertainKeywords", [ts.SyntaxKind.VarKeyword, ts.SyntaxKind.ThrowKeyword, ts.SyntaxKind.NewKeyword, ts.SyntaxKind.DeleteKeyword, ts.SyntaxKind.ReturnKeyword, ts.SyntaxKind.TypeOfKeyword, ts.SyntaxKind.AwaitKeyword], anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterLetConstInVariableDeclaration", [ts.SyntaxKind.LetKeyword, ts.SyntaxKind.ConstKeyword], anyToken, [isNonJsxSameLineTokenContext, isStartOfVariableDeclarationList], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeOpenParenInFuncCall", anyToken, ts.SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isFunctionCallOrNewContext, isPreviousTokenNotComma], ts.formatting.RuleAction.DeleteSpace),

        // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
        rule("SpaceBeforeBinaryKeywordOperator", anyToken, binaryKeywordOperators, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterBinaryKeywordOperator", binaryKeywordOperators, anyToken, [isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),

        rule("SpaceAfterVoidOperator", ts.SyntaxKind.VoidKeyword, anyToken, [isNonJsxSameLineTokenContext, isVoidOpContext], ts.formatting.RuleAction.InsertSpace),

        // Async-await
        rule("SpaceBetweenAsyncAndOpenParen", ts.SyntaxKind.AsyncKeyword, ts.SyntaxKind.OpenParenToken, [isArrowFunctionContext, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBetweenAsyncAndFunctionKeyword", ts.SyntaxKind.AsyncKeyword, [ts.SyntaxKind.FunctionKeyword, ts.SyntaxKind.Identifier], [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),

        // Template string
        rule("NoSpaceBetweenTagAndTemplateString", [ts.SyntaxKind.Identifier, ts.SyntaxKind.CloseParenToken], [ts.SyntaxKind.NoSubstitutionTemplateLiteral, ts.SyntaxKind.TemplateHead], [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // JSX opening elements
        rule("SpaceBeforeJsxAttribute", anyToken, ts.SyntaxKind.Identifier, [isNextTokenParentJsxAttribute, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBeforeSlashInJsxOpeningElement", anyToken, ts.SyntaxKind.SlashToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", ts.SyntaxKind.SlashToken, ts.SyntaxKind.GreaterThanToken, [isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeEqualInJsxAttribute", anyToken, ts.SyntaxKind.EqualsToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterEqualInJsxAttribute", ts.SyntaxKind.EqualsToken, anyToken, [isJsxAttributeContext, isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // TypeScript-specific rules
        // Use of module as a function call. e.g.: import m2 = module("m2");
        rule("NoSpaceAfterModuleImport", [ts.SyntaxKind.ModuleKeyword, ts.SyntaxKind.RequireKeyword], ts.SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        // Add a space around certain TypeScript keywords
        rule(
            "SpaceAfterCertainTypeScriptKeywords",
            [
                ts.SyntaxKind.AbstractKeyword,
                ts.SyntaxKind.AccessorKeyword,
                ts.SyntaxKind.ClassKeyword,
                ts.SyntaxKind.DeclareKeyword,
                ts.SyntaxKind.DefaultKeyword,
                ts.SyntaxKind.EnumKeyword,
                ts.SyntaxKind.ExportKeyword,
                ts.SyntaxKind.ExtendsKeyword,
                ts.SyntaxKind.GetKeyword,
                ts.SyntaxKind.ImplementsKeyword,
                ts.SyntaxKind.ImportKeyword,
                ts.SyntaxKind.InterfaceKeyword,
                ts.SyntaxKind.ModuleKeyword,
                ts.SyntaxKind.NamespaceKeyword,
                ts.SyntaxKind.PrivateKeyword,
                ts.SyntaxKind.PublicKeyword,
                ts.SyntaxKind.ProtectedKeyword,
                ts.SyntaxKind.ReadonlyKeyword,
                ts.SyntaxKind.SetKeyword,
                ts.SyntaxKind.StaticKeyword,
                ts.SyntaxKind.TypeKeyword,
                ts.SyntaxKind.FromKeyword,
                ts.SyntaxKind.KeyOfKeyword,
                ts.SyntaxKind.InferKeyword,
            ],
            anyToken,
            [isNonJsxSameLineTokenContext],
            ts.formatting.RuleAction.InsertSpace),
        rule(
            "SpaceBeforeCertainTypeScriptKeywords",
            anyToken,
            [ts.SyntaxKind.ExtendsKeyword, ts.SyntaxKind.ImplementsKeyword, ts.SyntaxKind.FromKeyword],
            [isNonJsxSameLineTokenContext],
            ts.formatting.RuleAction.InsertSpace),
        // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
        rule("SpaceAfterModuleName", ts.SyntaxKind.StringLiteral, ts.SyntaxKind.OpenBraceToken, [isModuleDeclContext], ts.formatting.RuleAction.InsertSpace),

        // Lambda expressions
        rule("SpaceBeforeArrow", anyToken, ts.SyntaxKind.EqualsGreaterThanToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterArrow", ts.SyntaxKind.EqualsGreaterThanToken, anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),

        // Optional parameters and let args
        rule("NoSpaceAfterEllipsis", ts.SyntaxKind.DotDotDotToken, ts.SyntaxKind.Identifier, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterOptionalParameters", ts.SyntaxKind.QuestionToken, [ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.CommaToken], [isNonJsxSameLineTokenContext, isNotBinaryOpContext], ts.formatting.RuleAction.DeleteSpace),

        // Remove spaces in empty interface literals. e.g.: x: {}
        rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectTypeContext], ts.formatting.RuleAction.DeleteSpace),

        // generics and type assertions
        rule("NoSpaceBeforeOpenAngularBracket", typeNames, ts.SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBetweenCloseParenAndAngularBracket", ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterOpenAngularBracket", ts.SyntaxKind.LessThanToken, anyToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeCloseAngularBracket", anyToken, ts.SyntaxKind.GreaterThanToken, [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterCloseAngularBracket",
            ts.SyntaxKind.GreaterThanToken,
            [ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.GreaterThanToken, ts.SyntaxKind.CommaToken],
            [isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext, isNotFunctionDeclContext /*To prevent an interference with the SpaceBeforeOpenParenInFuncDecl rule*/],
            ts.formatting.RuleAction.DeleteSpace),

        // decorators
        rule("SpaceBeforeAt", [ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.Identifier], ts.SyntaxKind.AtToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterAt", ts.SyntaxKind.AtToken, anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        // Insert space after @ in decorator
        rule("SpaceAfterDecorator",
            anyToken,
            [
                ts.SyntaxKind.AbstractKeyword,
                ts.SyntaxKind.Identifier,
                ts.SyntaxKind.ExportKeyword,
                ts.SyntaxKind.DefaultKeyword,
                ts.SyntaxKind.ClassKeyword,
                ts.SyntaxKind.StaticKeyword,
                ts.SyntaxKind.PublicKeyword,
                ts.SyntaxKind.PrivateKeyword,
                ts.SyntaxKind.ProtectedKeyword,
                ts.SyntaxKind.GetKeyword,
                ts.SyntaxKind.SetKeyword,
                ts.SyntaxKind.OpenBracketToken,
                ts.SyntaxKind.AsteriskToken,
            ],
            [isEndOfDecoratorContextOnSameLine],
            ts.formatting.RuleAction.InsertSpace),

        rule("NoSpaceBeforeNonNullAssertionOperator", anyToken, ts.SyntaxKind.ExclamationToken, [isNonJsxSameLineTokenContext, isNonNullAssertionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterNewKeywordOnConstructorSignature", ts.SyntaxKind.NewKeyword, ts.SyntaxKind.OpenParenToken, [isNonJsxSameLineTokenContext, isConstructorSignatureContext], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceLessThanAndNonJSXTypeAnnotation", ts.SyntaxKind.LessThanToken, ts.SyntaxKind.LessThanToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
    ];

    // These rules are applied after high priority
    const userConfigurableRules = [
        // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
        rule("SpaceAfterConstructor", ts.SyntaxKind.ConstructorKeyword, ts.SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterConstructor", ts.SyntaxKind.ConstructorKeyword, ts.SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterConstructor"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        rule("SpaceAfterComma", ts.SyntaxKind.CommaToken, anyToken, [isOptionEnabled("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNextTokenNotCloseBracket, isNextTokenNotCloseParen], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterComma", ts.SyntaxKind.CommaToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterCommaDelimiter"), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after function keyword for anonymous functions
        rule("SpaceAfterAnonymousFunctionKeyword", [ts.SyntaxKind.FunctionKeyword, ts.SyntaxKind.AsteriskToken], ts.SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterAnonymousFunctionKeyword", [ts.SyntaxKind.FunctionKeyword, ts.SyntaxKind.AsteriskToken], ts.SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterFunctionKeywordForAnonymousFunctions"), isFunctionDeclContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after keywords in control flow statements
        rule("SpaceAfterKeywordInControl", keywords, ts.SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterKeywordInControl", keywords, ts.SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterKeywordsInControlFlowStatements"), isControlDeclContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after opening and before closing nonempty parenthesis
        rule("SpaceAfterOpenParen", ts.SyntaxKind.OpenParenToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBeforeCloseParen", anyToken, ts.SyntaxKind.CloseParenToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBetweenOpenParens", ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBetweenParens", ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.CloseParenToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterOpenParen", ts.SyntaxKind.OpenParenToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeCloseParen", anyToken, ts.SyntaxKind.CloseParenToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after opening and before closing nonempty brackets
        rule("SpaceAfterOpenBracket", ts.SyntaxKind.OpenBracketToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBeforeCloseBracket", anyToken, ts.SyntaxKind.CloseBracketToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBetweenBrackets", ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.CloseBracketToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterOpenBracket", ts.SyntaxKind.OpenBracketToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeCloseBracket", anyToken, ts.SyntaxKind.CloseBracketToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
        rule("SpaceAfterOpenBrace", ts.SyntaxKind.OpenBraceToken, anyToken, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBeforeCloseBrace", anyToken, ts.SyntaxKind.CloseBraceToken, [isOptionEnabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isBraceWrappedContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBetweenEmptyBraceBrackets", ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, [isNonJsxSameLineTokenContext, isObjectContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterOpenBrace", ts.SyntaxKind.OpenBraceToken, anyToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeCloseBrace", anyToken, ts.SyntaxKind.CloseBraceToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert a space after opening and before closing empty brace brackets
        rule("SpaceBetweenEmptyBraceBrackets", ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces")], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBetweenEmptyBraceBrackets", ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, [isOptionDisabled("insertSpaceAfterOpeningAndBeforeClosingEmptyBraces"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after opening and before closing template string braces
        rule("SpaceAfterTemplateHeadAndMiddle", [ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle], anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], ts.formatting.RuleAction.InsertSpace, ts.formatting.RuleFlags.CanDeleteNewLines),
        rule("SpaceBeforeTemplateMiddleAndTail", anyToken, [ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail], [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterTemplateHeadAndMiddle", [ts.SyntaxKind.TemplateHead, ts.SyntaxKind.TemplateMiddle], anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxTextContext], ts.formatting.RuleAction.DeleteSpace, ts.formatting.RuleFlags.CanDeleteNewLines),
        rule("NoSpaceBeforeTemplateMiddleAndTail", anyToken, [ts.SyntaxKind.TemplateMiddle, ts.SyntaxKind.TemplateTail], [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"), isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // No space after { and before } in JSX expression
        rule("SpaceAfterOpenBraceInJsxExpression", ts.SyntaxKind.OpenBraceToken, anyToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceBeforeCloseBraceInJsxExpression", anyToken, ts.SyntaxKind.CloseBraceToken, [isOptionEnabled("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterOpenBraceInJsxExpression", ts.SyntaxKind.OpenBraceToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceBeforeCloseBraceInJsxExpression", anyToken, ts.SyntaxKind.CloseBraceToken, [isOptionDisabledOrUndefined("insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"), isNonJsxSameLineTokenContext, isJsxExpressionContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space after semicolon in for statement
        rule("SpaceAfterSemicolonInFor", ts.SyntaxKind.SemicolonToken, anyToken, [isOptionEnabled("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterSemicolonInFor", ts.SyntaxKind.SemicolonToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterSemicolonInForStatements"), isNonJsxSameLineTokenContext, isForContext], ts.formatting.RuleAction.DeleteSpace),

        // Insert space before and after binary operators
        rule("SpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("SpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionEnabled("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeBinaryOperator", anyToken, binaryOperators, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterBinaryOperator", binaryOperators, anyToken, [isOptionDisabledOrUndefined("insertSpaceBeforeAndAfterBinaryOperators"), isNonJsxSameLineTokenContext, isBinaryOpContext], ts.formatting.RuleAction.DeleteSpace),

        rule("SpaceBeforeOpenParenInFuncDecl", anyToken, ts.SyntaxKind.OpenParenToken, [isOptionEnabled("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeOpenParenInFuncDecl", anyToken, ts.SyntaxKind.OpenParenToken, [isOptionDisabledOrUndefined("insertSpaceBeforeFunctionParenthesis"), isNonJsxSameLineTokenContext, isFunctionDeclContext], ts.formatting.RuleAction.DeleteSpace),

        // Open Brace braces after control block
        rule("NewLineBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isBeforeMultilineBlockContext], ts.formatting.RuleAction.InsertNewLine, ts.formatting.RuleFlags.CanDeleteNewLines),

        // Open Brace braces after function
        // TypeScript: Function can have return types, which can be made of tons of different token kinds
        rule("NewLineBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeMultilineBlockContext], ts.formatting.RuleAction.InsertNewLine, ts.formatting.RuleFlags.CanDeleteNewLines),
        // Open Brace braces after TypeScript module/class/interface
        rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionEnabled("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isBeforeMultilineBlockContext], ts.formatting.RuleAction.InsertNewLine, ts.formatting.RuleFlags.CanDeleteNewLines),

        rule("SpaceAfterTypeAssertion", ts.SyntaxKind.GreaterThanToken, anyToken, [isOptionEnabled("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceAfterTypeAssertion", ts.SyntaxKind.GreaterThanToken, anyToken, [isOptionDisabledOrUndefined("insertSpaceAfterTypeAssertion"), isNonJsxSameLineTokenContext, isTypeAssertionContext], ts.formatting.RuleAction.DeleteSpace),

        rule("SpaceBeforeTypeAnnotation", anyToken, [ts.SyntaxKind.QuestionToken, ts.SyntaxKind.ColonToken], [isOptionEnabled("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], ts.formatting.RuleAction.InsertSpace),
        rule("NoSpaceBeforeTypeAnnotation", anyToken, [ts.SyntaxKind.QuestionToken, ts.SyntaxKind.ColonToken], [isOptionDisabledOrUndefined("insertSpaceBeforeTypeAnnotation"), isNonJsxSameLineTokenContext, isTypeAnnotationContext], ts.formatting.RuleAction.DeleteSpace),

        rule("NoOptionalSemicolon", ts.SyntaxKind.SemicolonToken, anyTokenIncludingEOF, [optionEquals("semicolons", ts.SemicolonPreference.Remove), isSemicolonDeletionContext], ts.formatting.RuleAction.DeleteToken),
        rule("OptionalSemicolon", anyToken, anyTokenIncludingEOF, [optionEquals("semicolons", ts.SemicolonPreference.Insert), isSemicolonInsertionContext], ts.formatting.RuleAction.InsertTrailingSemicolon),
    ];

    // These rules are lower in priority than user-configurable. Rules earlier in this list have priority over rules later in the list.
    const lowPriorityCommonRules = [
        // Space after keyword but not before ; or : or ?
        rule("NoSpaceBeforeSemicolon", anyToken, ts.SyntaxKind.SemicolonToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        rule("SpaceBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForControlBlocks"), isControlDeclContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], ts.formatting.RuleAction.InsertSpace, ts.formatting.RuleFlags.CanDeleteNewLines),
        rule("SpaceBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isFunctionDeclContext, isBeforeBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], ts.formatting.RuleAction.InsertSpace, ts.formatting.RuleFlags.CanDeleteNewLines),
        rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, ts.SyntaxKind.OpenBraceToken, [isOptionDisabledOrUndefinedOrTokensOnSameLine("placeOpenBraceOnNewLineForFunctions"), isTypeScriptDeclWithBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext], ts.formatting.RuleAction.InsertSpace, ts.formatting.RuleFlags.CanDeleteNewLines),

        rule("NoSpaceBeforeComma", anyToken, ts.SyntaxKind.CommaToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),

        // No space before and after indexer `x[]`
        rule("NoSpaceBeforeOpenBracket", anyTokenExcept(ts.SyntaxKind.AsyncKeyword, ts.SyntaxKind.CaseKeyword), ts.SyntaxKind.OpenBracketToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.DeleteSpace),
        rule("NoSpaceAfterCloseBracket", ts.SyntaxKind.CloseBracketToken, anyToken, [isNonJsxSameLineTokenContext, isNotBeforeBlockInFunctionDeclarationContext], ts.formatting.RuleAction.DeleteSpace),
        rule("SpaceAfterSemicolon", ts.SyntaxKind.SemicolonToken, anyToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),

        // Remove extra space between for and await
        rule("SpaceBetweenForAndAwaitKeyword", ts.SyntaxKind.ForKeyword, ts.SyntaxKind.AwaitKeyword, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),

        // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
        // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
        rule(
            "SpaceBetweenStatements",
            [ts.SyntaxKind.CloseParenToken, ts.SyntaxKind.DoKeyword, ts.SyntaxKind.ElseKeyword, ts.SyntaxKind.CaseKeyword],
            anyToken,
            [isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNotForContext],
            ts.formatting.RuleAction.InsertSpace),
        // This low-pri rule takes care of "try {", "catch {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
        rule("SpaceAfterTryCatchFinally", [ts.SyntaxKind.TryKeyword, ts.SyntaxKind.CatchKeyword, ts.SyntaxKind.FinallyKeyword], ts.SyntaxKind.OpenBraceToken, [isNonJsxSameLineTokenContext], ts.formatting.RuleAction.InsertSpace),
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
    left: ts.SyntaxKind | readonly ts.SyntaxKind[] | ts.formatting.TokenRange,
    right: ts.SyntaxKind | readonly ts.SyntaxKind[] | ts.formatting.TokenRange,
    context: readonly ts.formatting.ContextPredicate[],
    action: ts.formatting.RuleAction,
    flags: ts.formatting.RuleFlags = ts.formatting.RuleFlags.None,
): RuleSpec {
    return { leftTokenRange: toTokenRange(left), rightTokenRange: toTokenRange(right), rule: { debugName, context, action, flags } };
}

function tokenRangeFrom(tokens: readonly ts.SyntaxKind[]): ts.formatting.TokenRange {
    return { tokens, isSpecific: true };
}

function toTokenRange(arg: ts.SyntaxKind | readonly ts.SyntaxKind[] | ts.formatting.TokenRange): ts.formatting.TokenRange {
    return typeof arg === "number" ? tokenRangeFrom([arg]) : ts.isArray(arg) ? tokenRangeFrom(arg) : arg;
}

function tokenRangeFromRange(from: ts.SyntaxKind, to: ts.SyntaxKind, except: readonly ts.SyntaxKind[] = []): ts.formatting.TokenRange {
    const tokens: ts.SyntaxKind[] = [];
    for (let token = from; token <= to; token++) {
        if (!ts.contains(except, token)) {
            tokens.push(token);
        }
    }
    return tokenRangeFrom(tokens);
}

///
/// Contexts
///

function optionEquals<K extends keyof ts.FormatCodeSettings>(optionName: K, optionValue: ts.FormatCodeSettings[K]): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => context.options && context.options[optionName] === optionValue;
}

function isOptionEnabled(optionName: keyof ts.FormatCodeSettings): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => context.options && ts.hasProperty(context.options, optionName) && !!context.options[optionName];
}

function isOptionDisabled(optionName: keyof ts.FormatCodeSettings): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => context.options && ts.hasProperty(context.options, optionName) && !context.options[optionName];
}

function isOptionDisabledOrUndefined(optionName: keyof ts.FormatCodeSettings): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => !context.options || !ts.hasProperty(context.options, optionName) || !context.options[optionName];
}

function isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName: keyof ts.FormatCodeSettings): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => !context.options || !ts.hasProperty(context.options, optionName) || !context.options[optionName] || context.TokensAreOnSameLine();
}

function isOptionEnabledOrUndefined(optionName: keyof ts.FormatCodeSettings): (context: ts.formatting.FormattingContext) => boolean {
    return (context) => !context.options || !ts.hasProperty(context.options, optionName) || !!context.options[optionName];
}

function isForContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ForStatement;
}

function isNotForContext(context: ts.formatting.FormattingContext): boolean {
    return !isForContext(context);
}

function isBinaryOpContext(context: ts.formatting.FormattingContext): boolean {
    switch (context.contextNode.kind) {
        case ts.SyntaxKind.BinaryExpression:
            return (context.contextNode as ts.BinaryExpression).operatorToken.kind !== ts.SyntaxKind.CommaToken;
        case ts.SyntaxKind.ConditionalExpression:
        case ts.SyntaxKind.ConditionalType:
        case ts.SyntaxKind.AsExpression:
        case ts.SyntaxKind.ExportSpecifier:
        case ts.SyntaxKind.ImportSpecifier:
        case ts.SyntaxKind.TypePredicate:
        case ts.SyntaxKind.UnionType:
        case ts.SyntaxKind.IntersectionType:
        case ts.SyntaxKind.SatisfiesExpression:
            return true;

        // equals in binding elements: function foo([[x, y] = [1, 2]])
        case ts.SyntaxKind.BindingElement:
        // equals in type X = ...
        // falls through
        case ts.SyntaxKind.TypeAliasDeclaration:
        // equal in import a = module('a');
        // falls through
        case ts.SyntaxKind.ImportEqualsDeclaration:
        // equal in export = 1
        // falls through
        case ts.SyntaxKind.ExportAssignment:
        // equal in let a = 0
        // falls through
        case ts.SyntaxKind.VariableDeclaration:
        // equal in p = 0
        // falls through
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
            return context.currentTokenSpan.kind === ts.SyntaxKind.EqualsToken || context.nextTokenSpan.kind === ts.SyntaxKind.EqualsToken;
        // "in" keyword in for (let x in []) { }
        case ts.SyntaxKind.ForInStatement:
        // "in" keyword in [P in keyof T]: T[P]
        // falls through
        case ts.SyntaxKind.TypeParameter:
            return context.currentTokenSpan.kind === ts.SyntaxKind.InKeyword || context.nextTokenSpan.kind === ts.SyntaxKind.InKeyword || context.currentTokenSpan.kind === ts.SyntaxKind.EqualsToken || context.nextTokenSpan.kind === ts.SyntaxKind.EqualsToken;
        // Technically, "of" is not a binary operator, but format it the same way as "in"
        case ts.SyntaxKind.ForOfStatement:
            return context.currentTokenSpan.kind === ts.SyntaxKind.OfKeyword || context.nextTokenSpan.kind === ts.SyntaxKind.OfKeyword;
    }
    return false;
}

function isNotBinaryOpContext(context: ts.formatting.FormattingContext): boolean {
    return !isBinaryOpContext(context);
}

function isNotTypeAnnotationContext(context: ts.formatting.FormattingContext): boolean {
    return !isTypeAnnotationContext(context);
}

function isTypeAnnotationContext(context: ts.formatting.FormattingContext): boolean {
    const contextKind = context.contextNode.kind;
    return contextKind === ts.SyntaxKind.PropertyDeclaration ||
        contextKind === ts.SyntaxKind.PropertySignature ||
        contextKind === ts.SyntaxKind.Parameter ||
        contextKind === ts.SyntaxKind.VariableDeclaration ||
        ts.isFunctionLikeKind(contextKind);
}

function isConditionalOperatorContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ConditionalExpression ||
            context.contextNode.kind === ts.SyntaxKind.ConditionalType;
}

function isSameLineTokenOrBeforeBlockContext(context: ts.formatting.FormattingContext): boolean {
    return context.TokensAreOnSameLine() || isBeforeBlockContext(context);
}

function isBraceWrappedContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ObjectBindingPattern ||
        context.contextNode.kind === ts.SyntaxKind.MappedType ||
        isSingleLineBlockContext(context);
}

// This check is done before an open brace in a control construct, a function, or a typescript block declaration
function isBeforeMultilineBlockContext(context: ts.formatting.FormattingContext): boolean {
    return isBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
}

function isMultilineBlockContext(context: ts.formatting.FormattingContext): boolean {
    return isBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
}

function isSingleLineBlockContext(context: ts.formatting.FormattingContext): boolean {
    return isBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
}

function isBlockContext(context: ts.formatting.FormattingContext): boolean {
    return nodeIsBlockContext(context.contextNode);
}

function isBeforeBlockContext(context: ts.formatting.FormattingContext): boolean {
    return nodeIsBlockContext(context.nextTokenParent);
}

// IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
function nodeIsBlockContext(node: ts.Node): boolean {
    if (nodeIsTypeScriptDeclWithBlockContext(node)) {
        // This means we are in a context that looks like a block to the user, but in the grammar is actually not a node (it's a class, module, enum, object type literal, etc).
        return true;
    }

    switch (node.kind) {
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.ObjectLiteralExpression:
        case ts.SyntaxKind.ModuleBlock:
            return true;
    }

    return false;
}

function isFunctionDeclContext(context: ts.formatting.FormattingContext): boolean {
    switch (context.contextNode.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        // case SyntaxKind.MemberFunctionDeclaration:
        // falls through
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        // case SyntaxKind.MethodSignature:
        // falls through
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.ArrowFunction:
        // case SyntaxKind.ConstructorDeclaration:
        // case SyntaxKind.SimpleArrowFunctionExpression:
        // case SyntaxKind.ParenthesizedArrowFunctionExpression:
        // falls through
        case ts.SyntaxKind.InterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
            return true;
    }

    return false;
}

function isNotFunctionDeclContext(context: ts.formatting.FormattingContext): boolean {
    return !isFunctionDeclContext(context);
}

function isFunctionDeclarationOrFunctionExpressionContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.FunctionDeclaration || context.contextNode.kind === ts.SyntaxKind.FunctionExpression;
}

function isTypeScriptDeclWithBlockContext(context: ts.formatting.FormattingContext): boolean {
    return nodeIsTypeScriptDeclWithBlockContext(context.contextNode);
}

function nodeIsTypeScriptDeclWithBlockContext(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ExportDeclaration:
        case ts.SyntaxKind.NamedExports:
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.NamedImports:
            return true;
    }

    return false;
}

function isAfterCodeBlockContext(context: ts.formatting.FormattingContext): boolean {
    switch (context.currentTokenParent.kind) {
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.CatchClause:
        case ts.SyntaxKind.ModuleBlock:
        case ts.SyntaxKind.SwitchStatement:
            return true;
        case ts.SyntaxKind.Block: {
            const blockParent = context.currentTokenParent.parent;
            // In a codefix scenario, we can't rely on parents being set. So just always return true.
            if (!blockParent || blockParent.kind !== ts.SyntaxKind.ArrowFunction && blockParent.kind !== ts.SyntaxKind.FunctionExpression) {
                return true;
            }
        }
    }
    return false;
}

function isControlDeclContext(context: ts.formatting.FormattingContext): boolean {
    switch (context.contextNode.kind) {
        case ts.SyntaxKind.IfStatement:
        case ts.SyntaxKind.SwitchStatement:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.WhileStatement:
        case ts.SyntaxKind.TryStatement:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.WithStatement:
        // TODO
        // case SyntaxKind.ElseClause:
        // falls through
        case ts.SyntaxKind.CatchClause:
            return true;

        default:
            return false;
    }
}

function isObjectContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ObjectLiteralExpression;
}

function isFunctionCallContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.CallExpression;
}

function isNewContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.NewExpression;
}

function isFunctionCallOrNewContext(context: ts.formatting.FormattingContext): boolean {
    return isFunctionCallContext(context) || isNewContext(context);
}

function isPreviousTokenNotComma(context: ts.formatting.FormattingContext): boolean {
    return context.currentTokenSpan.kind !== ts.SyntaxKind.CommaToken;
}

function isNextTokenNotCloseBracket(context: ts.formatting.FormattingContext): boolean {
    return context.nextTokenSpan.kind !== ts.SyntaxKind.CloseBracketToken;
}

function isNextTokenNotCloseParen(context: ts.formatting.FormattingContext): boolean {
    return context.nextTokenSpan.kind !== ts.SyntaxKind.CloseParenToken;
}

function isArrowFunctionContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ArrowFunction;
}

function isImportTypeContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ImportType;
}

function isNonJsxSameLineTokenContext(context: ts.formatting.FormattingContext): boolean {
    return context.TokensAreOnSameLine() && context.contextNode.kind !== ts.SyntaxKind.JsxText;
}

function isNonJsxTextContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind !== ts.SyntaxKind.JsxText;
}

function isNonJsxElementOrFragmentContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind !== ts.SyntaxKind.JsxElement && context.contextNode.kind !== ts.SyntaxKind.JsxFragment;
}

function isJsxExpressionContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.JsxExpression || context.contextNode.kind === ts.SyntaxKind.JsxSpreadAttribute;
}

function isNextTokenParentJsxAttribute(context: ts.formatting.FormattingContext): boolean {
    return context.nextTokenParent.kind === ts.SyntaxKind.JsxAttribute;
}

function isJsxAttributeContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.JsxAttribute;
}

function isJsxSelfClosingElementContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.JsxSelfClosingElement;
}

function isNotBeforeBlockInFunctionDeclarationContext(context: ts.formatting.FormattingContext): boolean {
    return !isFunctionDeclContext(context) && !isBeforeBlockContext(context);
}

function isEndOfDecoratorContextOnSameLine(context: ts.formatting.FormattingContext): boolean {
    return context.TokensAreOnSameLine() &&
        ts.hasDecorators(context.contextNode) &&
        nodeIsInDecoratorContext(context.currentTokenParent) &&
        !nodeIsInDecoratorContext(context.nextTokenParent);
}

function nodeIsInDecoratorContext(node: ts.Node): boolean {
    while (node && ts.isExpression(node)) {
        node = node.parent;
    }
    return node && node.kind === ts.SyntaxKind.Decorator;
}

function isStartOfVariableDeclarationList(context: ts.formatting.FormattingContext): boolean {
    return context.currentTokenParent.kind === ts.SyntaxKind.VariableDeclarationList &&
        context.currentTokenParent.getStart(context.sourceFile) === context.currentTokenSpan.pos;
}

function isNotFormatOnEnter(context: ts.formatting.FormattingContext): boolean {
    return context.formattingRequestKind !== ts.formatting.FormattingRequestKind.FormatOnEnter;
}

function isModuleDeclContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ModuleDeclaration;
}

function isObjectTypeContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.TypeLiteral; // && context.contextNode.parent.kind !== SyntaxKind.InterfaceDeclaration;
}

function isConstructorSignatureContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.ConstructSignature;
}

function isTypeArgumentOrParameterOrAssertion(token: ts.formatting.TextRangeWithKind, parent: ts.Node): boolean {
    if (token.kind !== ts.SyntaxKind.LessThanToken && token.kind !== ts.SyntaxKind.GreaterThanToken) {
        return false;
    }
    switch (parent.kind) {
        case ts.SyntaxKind.TypeReference:
        case ts.SyntaxKind.TypeAssertionExpression:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.CallExpression:
        case ts.SyntaxKind.NewExpression:
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return true;
        default:
            return false;

    }
}

function isTypeArgumentOrParameterOrAssertionContext(context: ts.formatting.FormattingContext): boolean {
    return isTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
        isTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent);
}

function isTypeAssertionContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.TypeAssertionExpression;
}

function isVoidOpContext(context: ts.formatting.FormattingContext): boolean {
    return context.currentTokenSpan.kind === ts.SyntaxKind.VoidKeyword && context.currentTokenParent.kind === ts.SyntaxKind.VoidExpression;
}

function isYieldOrYieldStarWithOperand(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.YieldExpression && (context.contextNode as ts.YieldExpression).expression !== undefined;
}

function isNonNullAssertionContext(context: ts.formatting.FormattingContext): boolean {
    return context.contextNode.kind === ts.SyntaxKind.NonNullExpression;
}

function isNotStatementConditionContext(context: ts.formatting.FormattingContext): boolean {
    return !isStatementConditionContext(context);
}

function isStatementConditionContext(context: ts.formatting.FormattingContext): boolean {
    switch (context.contextNode.kind) {
        case ts.SyntaxKind.IfStatement:
        case ts.SyntaxKind.ForStatement:
        case ts.SyntaxKind.ForInStatement:
        case ts.SyntaxKind.ForOfStatement:
        case ts.SyntaxKind.DoStatement:
        case ts.SyntaxKind.WhileStatement:
            return true;

        default:
            return false;
    }
}

function isSemicolonDeletionContext(context: ts.formatting.FormattingContext): boolean {
    let nextTokenKind = context.nextTokenSpan.kind;
    let nextTokenStart = context.nextTokenSpan.pos;
    if (ts.isTrivia(nextTokenKind)) {
        const nextRealToken = context.nextTokenParent === context.currentTokenParent
            ? ts.findNextToken(
                context.currentTokenParent,
                ts.findAncestor(context.currentTokenParent, a => !a.parent)!,
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
        return nextTokenKind === ts.SyntaxKind.CloseBraceToken
            || nextTokenKind === ts.SyntaxKind.EndOfFileToken;
    }

    if (nextTokenKind === ts.SyntaxKind.SemicolonClassElement ||
        nextTokenKind === ts.SyntaxKind.SemicolonToken
    ) {
        return false;
    }

    if (context.contextNode.kind === ts.SyntaxKind.InterfaceDeclaration ||
        context.contextNode.kind === ts.SyntaxKind.TypeAliasDeclaration
    ) {
        // Can’t remove semicolon after `foo`; it would parse as a method declaration:
        //
        // interface I {
        //   foo;
        //   (): void
        // }
        return !ts.isPropertySignature(context.currentTokenParent)
            || !!context.currentTokenParent.type
            || nextTokenKind !== ts.SyntaxKind.OpenParenToken;
    }

    if (ts.isPropertyDeclaration(context.currentTokenParent)) {
        return !context.currentTokenParent.initializer;
    }

    return context.currentTokenParent.kind !== ts.SyntaxKind.ForStatement
        && context.currentTokenParent.kind !== ts.SyntaxKind.EmptyStatement
        && context.currentTokenParent.kind !== ts.SyntaxKind.SemicolonClassElement
        && nextTokenKind !== ts.SyntaxKind.OpenBracketToken
        && nextTokenKind !== ts.SyntaxKind.OpenParenToken
        && nextTokenKind !== ts.SyntaxKind.PlusToken
        && nextTokenKind !== ts.SyntaxKind.MinusToken
        && nextTokenKind !== ts.SyntaxKind.SlashToken
        && nextTokenKind !== ts.SyntaxKind.RegularExpressionLiteral
        && nextTokenKind !== ts.SyntaxKind.CommaToken
        && nextTokenKind !== ts.SyntaxKind.TemplateExpression
        && nextTokenKind !== ts.SyntaxKind.TemplateHead
        && nextTokenKind !== ts.SyntaxKind.NoSubstitutionTemplateLiteral
        && nextTokenKind !== ts.SyntaxKind.DotToken;
}

function isSemicolonInsertionContext(context: ts.formatting.FormattingContext): boolean {
    return ts.positionIsASICandidate(context.currentTokenSpan.end, context.currentTokenParent, context.sourceFile);
}

function isNotPropertyAccessOnIntegerLiteral(context: ts.formatting.FormattingContext): boolean {
    return !ts.isPropertyAccessExpression(context.contextNode)
        || !ts.isNumericLiteral(context.contextNode.expression)
        || context.contextNode.expression.getText().indexOf(".") !== -1;
}
