package format

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
)

func getAllRules() []ruleSpec {
	allTokens := make([]ast.Kind, 0, ast.KindLastToken-ast.KindFirstToken+1)
	for token := ast.KindFirstToken; token <= ast.KindLastToken; token++ {
		if token != ast.KindEndOfFile {
			allTokens = append(allTokens, token)
		}
	}

	anyTokenExcept := func(tokens ...ast.Kind) tokenRange {
		newTokens := make([]ast.Kind, 0, ast.KindLastToken-ast.KindFirstToken+1)
		for token := ast.KindFirstToken; token <= ast.KindLastToken; token++ {
			if slices.Contains(tokens, token) {
				continue
			}
			newTokens = append(newTokens, token)
		}
		return tokenRange{
			isSpecific: false,
			tokens:     newTokens,
		}
	}

	anyToken := tokenRange{
		isSpecific: false,
		tokens:     allTokens,
	}

	anyTokenIncludingMultilineComments := tokenRangeFromEx(allTokens, ast.KindMultiLineCommentTrivia)
	anyTokenIncludingEOF := tokenRangeFromEx(allTokens, ast.KindEndOfFile)
	keywords := tokenRangeFromRange(ast.KindFirstKeyword, ast.KindLastKeyword)
	binaryOperators := tokenRangeFromRange(ast.KindFirstBinaryOperator, ast.KindLastBinaryOperator)
	binaryKeywordOperators := []ast.Kind{
		ast.KindInKeyword,
		ast.KindInstanceOfKeyword,
		ast.KindOfKeyword,
		ast.KindAsKeyword,
		ast.KindIsKeyword,
		ast.KindSatisfiesKeyword,
	}
	unaryPrefixOperators := []ast.Kind{ast.KindPlusPlusToken, ast.KindMinusToken, ast.KindTildeToken, ast.KindExclamationToken}
	unaryPrefixExpressions := []ast.Kind{
		ast.KindNumericLiteral,
		ast.KindBigIntLiteral,
		ast.KindIdentifier,
		ast.KindOpenParenToken,
		ast.KindOpenBracketToken,
		ast.KindOpenBraceToken,
		ast.KindThisKeyword,
		ast.KindNewKeyword,
	}
	unaryPreincrementExpressions := []ast.Kind{ast.KindIdentifier, ast.KindOpenParenToken, ast.KindThisKeyword, ast.KindNewKeyword}
	unaryPostincrementExpressions := []ast.Kind{ast.KindIdentifier, ast.KindCloseParenToken, ast.KindCloseBracketToken, ast.KindNewKeyword}
	unaryPredecrementExpressions := []ast.Kind{ast.KindIdentifier, ast.KindOpenParenToken, ast.KindThisKeyword, ast.KindNewKeyword}
	unaryPostdecrementExpressions := []ast.Kind{ast.KindIdentifier, ast.KindCloseParenToken, ast.KindCloseBracketToken, ast.KindNewKeyword}
	comments := []ast.Kind{ast.KindSingleLineCommentTrivia, ast.KindMultiLineCommentTrivia}
	typeKeywords := []ast.Kind{
		ast.KindAnyKeyword,
		ast.KindAssertsKeyword,
		ast.KindBigIntKeyword,
		ast.KindBooleanKeyword,
		ast.KindFalseKeyword,
		ast.KindInferKeyword,
		ast.KindKeyOfKeyword,
		ast.KindNeverKeyword,
		ast.KindNullKeyword,
		ast.KindNumberKeyword,
		ast.KindObjectKeyword,
		ast.KindReadonlyKeyword,
		ast.KindStringKeyword,
		ast.KindSymbolKeyword,
		ast.KindTypeOfKeyword,
		ast.KindTrueKeyword,
		ast.KindVoidKeyword,
		ast.KindUndefinedKeyword,
		ast.KindUniqueKeyword,
		ast.KindUnknownKeyword,
	}
	typeNames := append([]ast.Kind{ast.KindIdentifier}, typeKeywords...)

	// Place a space before open brace in a function declaration
	// TypeScript: Function can have return types, which can be made of tons of different token kinds
	functionOpenBraceLeftTokenRange := anyTokenIncludingMultilineComments

	// Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
	typeScriptOpenBraceLeftTokenRange := tokenRangeFrom(ast.KindIdentifier, ast.KindGreaterThanToken, ast.KindMultiLineCommentTrivia, ast.KindClassKeyword, ast.KindExportKeyword, ast.KindImportKeyword)

	// Place a space before open brace in a control flow construct
	controlOpenBraceLeftTokenRange := tokenRangeFrom(ast.KindCloseParenToken, ast.KindMultiLineCommentTrivia, ast.KindDoKeyword, ast.KindTryKeyword, ast.KindFinallyKeyword, ast.KindElseKeyword, ast.KindCatchKeyword)

	// These rules are higher in priority than user-configurable
	highPriorityCommonRules := []ruleSpec{
		// Leave comments alone
		rule("IgnoreBeforeComment", anyToken, comments, anyContext, ruleActionStopProcessingSpaceActions),
		rule("IgnoreAfterLineComment", ast.KindSingleLineCommentTrivia, anyToken, anyContext, ruleActionStopProcessingSpaceActions),

		rule("NotSpaceBeforeColon", anyToken, ast.KindColonToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext}, ruleActionDeleteSpace),
		rule("SpaceAfterColon", ast.KindColonToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNextTokenParentNotJsxNamespacedName}, ruleActionInsertSpace),
		rule("NoSpaceBeforeQuestionMark", anyToken, ast.KindQuestionToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotBinaryOpContext, isNotTypeAnnotationContext}, ruleActionDeleteSpace),
		// insert space after '?' only when it is used in conditional operator
		rule("SpaceAfterQuestionMarkInConditionalOperator", ast.KindQuestionToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isConditionalOperatorContext}, ruleActionInsertSpace),

		// in other cases there should be no space between '?' and next token
		rule("NoSpaceAfterQuestionMark", ast.KindQuestionToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isNonOptionalPropertyContext}, ruleActionDeleteSpace),

		rule("NoSpaceBeforeDot", anyToken, []ast.Kind{ast.KindDotToken, ast.KindQuestionDotToken}, []contextPredicate{isNonJsxSameLineTokenContext, isNotPropertyAccessOnIntegerLiteral}, ruleActionDeleteSpace),
		rule("NoSpaceAfterDot", []ast.Kind{ast.KindDotToken, ast.KindQuestionDotToken}, anyToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		rule("NoSpaceBetweenImportParenInImportType", ast.KindImportKeyword, ast.KindOpenParenToken, []contextPredicate{isNonJsxSameLineTokenContext, isImportTypeContext}, ruleActionDeleteSpace),

		// Special handling of unary operators.
		// Prefix operators generally shouldn't have a space between
		// them and their target unary expression.
		rule("NoSpaceAfterUnaryPrefixOperator", unaryPrefixOperators, unaryPrefixExpressions, []contextPredicate{isNonJsxSameLineTokenContext, isNotBinaryOpContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterUnaryPreincrementOperator", ast.KindPlusPlusToken, unaryPreincrementExpressions, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterUnaryPredecrementOperator", ast.KindMinusMinusToken, unaryPredecrementExpressions, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeUnaryPostincrementOperator", unaryPostincrementExpressions, ast.KindPlusPlusToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotStatementConditionContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeUnaryPostdecrementOperator", unaryPostdecrementExpressions, ast.KindMinusMinusToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotStatementConditionContext}, ruleActionDeleteSpace),

		// More unary operator special-casing.
		// DevDiv 181814: Be careful when removing leading whitespace
		// around unary operators.  Examples:
		//      1 - -2  --X--> 1--2
		//      a + ++b --X--> a+++b
		rule("SpaceAfterPostincrementWhenFollowedByAdd", ast.KindPlusPlusToken, ast.KindPlusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterAddWhenFollowedByUnaryPlus", ast.KindPlusToken, ast.KindPlusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterAddWhenFollowedByPreincrement", ast.KindPlusToken, ast.KindPlusPlusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterPostdecrementWhenFollowedBySubtract", ast.KindMinusMinusToken, ast.KindMinusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterSubtractWhenFollowedByUnaryMinus", ast.KindMinusToken, ast.KindMinusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterSubtractWhenFollowedByPredecrement", ast.KindMinusToken, ast.KindMinusMinusToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),

		rule("NoSpaceAfterCloseBrace", ast.KindCloseBraceToken, []ast.Kind{ast.KindCommaToken, ast.KindSemicolonToken}, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		// For functions and control block place } on a new line []ast.Kind{multi-line rule}
		rule("NewLineBeforeCloseBraceInBlockContext", anyTokenIncludingMultilineComments, ast.KindCloseBraceToken, []contextPredicate{isMultilineBlockContext}, ruleActionInsertNewLine),

		// Space/new line after }.
		rule("SpaceAfterCloseBrace", ast.KindCloseBraceToken, anyTokenExcept(ast.KindCloseParenToken), []contextPredicate{isNonJsxSameLineTokenContext, isAfterCodeBlockContext}, ruleActionInsertSpace),
		// Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
		// Also should not apply to })
		rule("SpaceBetweenCloseBraceAndElse", ast.KindCloseBraceToken, ast.KindElseKeyword, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBetweenCloseBraceAndWhile", ast.KindCloseBraceToken, ast.KindWhileKeyword, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceBetweenEmptyBraceBrackets", ast.KindOpenBraceToken, ast.KindCloseBraceToken, []contextPredicate{isNonJsxSameLineTokenContext, isObjectContext}, ruleActionDeleteSpace),

		// Add a space after control dec context if the next character is an open bracket ex: 'if (false)[]ast.Kind{a, b} = []ast.Kind{1, 2};' -> 'if (false) []ast.Kind{a, b} = []ast.Kind{1, 2};'
		rule("SpaceAfterConditionalClosingParen", ast.KindCloseParenToken, ast.KindOpenBracketToken, []contextPredicate{isControlDeclContext}, ruleActionInsertSpace),

		rule("NoSpaceBetweenFunctionKeywordAndStar", ast.KindFunctionKeyword, ast.KindAsteriskToken, []contextPredicate{isFunctionDeclarationOrFunctionExpressionContext}, ruleActionDeleteSpace),
		rule("SpaceAfterStarInGeneratorDeclaration", ast.KindAsteriskToken, ast.KindIdentifier, []contextPredicate{isFunctionDeclarationOrFunctionExpressionContext}, ruleActionInsertSpace),

		rule("SpaceAfterFunctionInFuncDecl", ast.KindFunctionKeyword, anyToken, []contextPredicate{isFunctionDeclContext}, ruleActionInsertSpace),
		// Insert new line after { and before } in multi-line contexts.
		rule("NewLineAfterOpenBraceInBlockContext", ast.KindOpenBraceToken, anyToken, []contextPredicate{isMultilineBlockContext}, ruleActionInsertNewLine),

		// For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
		// Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
		//      get x() {}
		//      set x(val) {}
		rule("SpaceAfterGetSetInMember", []ast.Kind{ast.KindGetKeyword, ast.KindSetKeyword}, ast.KindIdentifier, []contextPredicate{isFunctionDeclContext}, ruleActionInsertSpace),

		rule("NoSpaceBetweenYieldKeywordAndStar", ast.KindYieldKeyword, ast.KindAsteriskToken, []contextPredicate{isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand}, ruleActionDeleteSpace),
		rule("SpaceBetweenYieldOrYieldStarAndOperand", []ast.Kind{ast.KindYieldKeyword, ast.KindAsteriskToken}, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isYieldOrYieldStarWithOperand}, ruleActionInsertSpace),

		rule("NoSpaceBetweenReturnAndSemicolon", ast.KindReturnKeyword, ast.KindSemicolonToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("SpaceAfterCertainKeywords", []ast.Kind{ast.KindVarKeyword, ast.KindThrowKeyword, ast.KindNewKeyword, ast.KindDeleteKeyword, ast.KindReturnKeyword, ast.KindTypeOfKeyword, ast.KindAwaitKeyword}, anyToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceAfterLetConstInVariableDeclaration", []ast.Kind{ast.KindLetKeyword, ast.KindConstKeyword}, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isStartOfVariableDeclarationList}, ruleActionInsertSpace),
		rule("NoSpaceBeforeOpenParenInFuncCall", anyToken, ast.KindOpenParenToken, []contextPredicate{isNonJsxSameLineTokenContext, isFunctionCallOrNewContext, isPreviousTokenNotComma}, ruleActionDeleteSpace),

		// Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
		rule("SpaceBeforeBinaryKeywordOperator", anyToken, binaryKeywordOperators, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterBinaryKeywordOperator", binaryKeywordOperators, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),

		rule("SpaceAfterVoidOperator", ast.KindVoidKeyword, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isVoidOpContext}, ruleActionInsertSpace),

		// Async-await
		rule("SpaceBetweenAsyncAndOpenParen", ast.KindAsyncKeyword, ast.KindOpenParenToken, []contextPredicate{isArrowFunctionContext, isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBetweenAsyncAndFunctionKeyword", ast.KindAsyncKeyword, []ast.Kind{ast.KindFunctionKeyword, ast.KindIdentifier}, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),

		// Template string
		rule("NoSpaceBetweenTagAndTemplateString", []ast.Kind{ast.KindIdentifier, ast.KindCloseParenToken}, []ast.Kind{ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateHead}, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// JSX opening elements
		rule("SpaceBeforeJsxAttribute", anyToken, ast.KindIdentifier, []contextPredicate{isNextTokenParentJsxAttribute, isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBeforeSlashInJsxOpeningElement", anyToken, ast.KindSlashToken, []contextPredicate{isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceBeforeGreaterThanTokenInJsxOpeningElement", ast.KindSlashToken, ast.KindGreaterThanToken, []contextPredicate{isJsxSelfClosingElementContext, isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeEqualInJsxAttribute", anyToken, ast.KindEqualsToken, []contextPredicate{isJsxAttributeContext, isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterEqualInJsxAttribute", ast.KindEqualsToken, anyToken, []contextPredicate{isJsxAttributeContext, isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeJsxNamespaceColon", ast.KindIdentifier, ast.KindColonToken, []contextPredicate{isNextTokenParentJsxNamespacedName}, ruleActionDeleteSpace),
		rule("NoSpaceAfterJsxNamespaceColon", ast.KindColonToken, ast.KindIdentifier, []contextPredicate{isNextTokenParentJsxNamespacedName}, ruleActionDeleteSpace),

		// TypeScript-specific rules
		// Use of module as a function call. e.g.: import m2 = module("m2");
		rule("NoSpaceAfterModuleImport", []ast.Kind{ast.KindModuleKeyword, ast.KindRequireKeyword}, ast.KindOpenParenToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		// Add a space around certain TypeScript keywords
		rule(
			"SpaceAfterCertainTypeScriptKeywords",
			[]ast.Kind{
				ast.KindAbstractKeyword,
				ast.KindAccessorKeyword,
				ast.KindClassKeyword,
				ast.KindDeclareKeyword,
				ast.KindDefaultKeyword,
				ast.KindEnumKeyword,
				ast.KindExportKeyword,
				ast.KindExtendsKeyword,
				ast.KindGetKeyword,
				ast.KindImplementsKeyword,
				ast.KindImportKeyword,
				ast.KindInterfaceKeyword,
				ast.KindModuleKeyword,
				ast.KindNamespaceKeyword,
				ast.KindPrivateKeyword,
				ast.KindPublicKeyword,
				ast.KindProtectedKeyword,
				ast.KindReadonlyKeyword,
				ast.KindSetKeyword,
				ast.KindStaticKeyword,
				ast.KindTypeKeyword,
				ast.KindFromKeyword,
				ast.KindKeyOfKeyword,
				ast.KindInferKeyword,
			},
			anyToken,
			[]contextPredicate{isNonJsxSameLineTokenContext},
			ruleActionInsertSpace,
		),
		rule(
			"SpaceBeforeCertainTypeScriptKeywords",
			anyToken,
			[]ast.Kind{ast.KindExtendsKeyword, ast.KindImplementsKeyword, ast.KindFromKeyword},
			[]contextPredicate{isNonJsxSameLineTokenContext},
			ruleActionInsertSpace,
		),
		// Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
		rule("SpaceAfterModuleName", ast.KindStringLiteral, ast.KindOpenBraceToken, []contextPredicate{isModuleDeclContext}, ruleActionInsertSpace),

		// Lambda expressions
		rule("SpaceBeforeArrow", anyToken, ast.KindEqualsGreaterThanToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceAfterArrow", ast.KindEqualsGreaterThanToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),

		// Optional parameters and let args
		rule("NoSpaceAfterEllipsis", ast.KindDotDotDotToken, ast.KindIdentifier, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterOptionalParameters", ast.KindQuestionToken, []ast.Kind{ast.KindCloseParenToken, ast.KindCommaToken}, []contextPredicate{isNonJsxSameLineTokenContext, isNotBinaryOpContext}, ruleActionDeleteSpace),

		// Remove spaces in empty interface literals. e.g.: x: {}
		rule("NoSpaceBetweenEmptyInterfaceBraceBrackets", ast.KindOpenBraceToken, ast.KindCloseBraceToken, []contextPredicate{isNonJsxSameLineTokenContext, isObjectTypeContext}, ruleActionDeleteSpace),

		// generics and type assertions
		rule("NoSpaceBeforeOpenAngularBracket", typeNames, ast.KindLessThanToken, []contextPredicate{isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext}, ruleActionDeleteSpace),
		rule("NoSpaceBetweenCloseParenAndAngularBracket", ast.KindCloseParenToken, ast.KindLessThanToken, []contextPredicate{isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterOpenAngularBracket", ast.KindLessThanToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeCloseAngularBracket", anyToken, ast.KindGreaterThanToken, []contextPredicate{isNonJsxSameLineTokenContext, isTypeArgumentOrParameterOrAssertionContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterCloseAngularBracket", ast.KindGreaterThanToken, []ast.Kind{ast.KindOpenParenToken, ast.KindOpenBracketToken, ast.KindGreaterThanToken, ast.KindCommaToken}, []contextPredicate{
			isNonJsxSameLineTokenContext,
			isTypeArgumentOrParameterOrAssertionContext,
			isNotFunctionDeclContext, /*To prevent an interference with the SpaceBeforeOpenParenInFuncDecl rule*/
			isNonTypeAssertionContext,
		}, ruleActionDeleteSpace),

		// decorators
		rule("SpaceBeforeAt", []ast.Kind{ast.KindCloseParenToken, ast.KindIdentifier}, ast.KindAtToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterAt", ast.KindAtToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		// Insert space after @ in decorator
		rule(
			"SpaceAfterDecorator",
			anyToken,
			[]ast.Kind{
				ast.KindAbstractKeyword,
				ast.KindIdentifier,
				ast.KindExportKeyword,
				ast.KindDefaultKeyword,
				ast.KindClassKeyword,
				ast.KindStaticKeyword,
				ast.KindPublicKeyword,
				ast.KindPrivateKeyword,
				ast.KindProtectedKeyword,
				ast.KindGetKeyword,
				ast.KindSetKeyword,
				ast.KindOpenBracketToken,
				ast.KindAsteriskToken,
			},
			[]contextPredicate{isEndOfDecoratorContextOnSameLine},
			ruleActionInsertSpace,
		),

		rule("NoSpaceBeforeNonNullAssertionOperator", anyToken, ast.KindExclamationToken, []contextPredicate{isNonJsxSameLineTokenContext, isNonNullAssertionContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterNewKeywordOnConstructorSignature", ast.KindNewKeyword, ast.KindOpenParenToken, []contextPredicate{isNonJsxSameLineTokenContext, isConstructorSignatureContext}, ruleActionDeleteSpace),
		rule("SpaceLessThanAndNonJSXTypeAnnotation", ast.KindLessThanToken, ast.KindLessThanToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
	}

	// These rules are applied after high priority
	userConfigurableRules := []ruleSpec{
		// Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
		rule("SpaceAfterConstructor", ast.KindConstructorKeyword, ast.KindOpenParenToken, []contextPredicate{isOptionEnabled(insertSpaceAfterConstructorOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterConstructor", ast.KindConstructorKeyword, ast.KindOpenParenToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterConstructorOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		rule("SpaceAfterComma", ast.KindCommaToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterCommaDelimiterOption), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNextTokenNotCloseBracket, isNextTokenNotCloseParen}, ruleActionInsertSpace),
		rule("NoSpaceAfterComma", ast.KindCommaToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterCommaDelimiterOption), isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext}, ruleActionDeleteSpace),

		// Insert space after function keyword for anonymous functions
		rule("SpaceAfterAnonymousFunctionKeyword", []ast.Kind{ast.KindFunctionKeyword, ast.KindAsteriskToken}, ast.KindOpenParenToken, []contextPredicate{isOptionEnabled(insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption), isFunctionDeclContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterAnonymousFunctionKeyword", []ast.Kind{ast.KindFunctionKeyword, ast.KindAsteriskToken}, ast.KindOpenParenToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption), isFunctionDeclContext}, ruleActionDeleteSpace),

		// Insert space after keywords in control flow statements
		rule("SpaceAfterKeywordInControl", keywords, ast.KindOpenParenToken, []contextPredicate{isOptionEnabled(insertSpaceAfterKeywordsInControlFlowStatementsOption), isControlDeclContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterKeywordInControl", keywords, ast.KindOpenParenToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterKeywordsInControlFlowStatementsOption), isControlDeclContext}, ruleActionDeleteSpace),

		// Insert space after opening and before closing nonempty parenthesis
		rule("SpaceAfterOpenParen", ast.KindOpenParenToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBeforeCloseParen", anyToken, ast.KindCloseParenToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBetweenOpenParens", ast.KindOpenParenToken, ast.KindOpenParenToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceBetweenParens", ast.KindOpenParenToken, ast.KindCloseParenToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterOpenParen", ast.KindOpenParenToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeCloseParen", anyToken, ast.KindCloseParenToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// Insert space after opening and before closing nonempty brackets
		rule("SpaceAfterOpenBracket", ast.KindOpenBracketToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("SpaceBeforeCloseBracket", anyToken, ast.KindCloseBracketToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceBetweenBrackets", ast.KindOpenBracketToken, ast.KindCloseBracketToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterOpenBracket", ast.KindOpenBracketToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeCloseBracket", anyToken, ast.KindCloseBracketToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
		rule("SpaceAfterOpenBrace", ast.KindOpenBraceToken, anyToken, []contextPredicate{isOptionEnabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isBraceWrappedContext}, ruleActionInsertSpace),
		rule("SpaceBeforeCloseBrace", anyToken, ast.KindCloseBraceToken, []contextPredicate{isOptionEnabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isBraceWrappedContext}, ruleActionInsertSpace),
		rule("NoSpaceBetweenEmptyBraceBrackets", ast.KindOpenBraceToken, ast.KindCloseBraceToken, []contextPredicate{isNonJsxSameLineTokenContext, isObjectContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterOpenBrace", ast.KindOpenBraceToken, anyToken, []contextPredicate{isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeCloseBrace", anyToken, ast.KindCloseBraceToken, []contextPredicate{isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// Insert a space after opening and before closing empty brace brackets
		rule("SpaceBetweenEmptyBraceBrackets", ast.KindOpenBraceToken, ast.KindCloseBraceToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption)}, ruleActionInsertSpace),
		rule("NoSpaceBetweenEmptyBraceBrackets", ast.KindOpenBraceToken, ast.KindCloseBraceToken, []contextPredicate{isOptionDisabled(insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// Insert space after opening and before closing template string braces
		rule("SpaceAfterTemplateHeadAndMiddle", []ast.Kind{ast.KindTemplateHead, ast.KindTemplateMiddle}, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxTextContext}, ruleActionInsertSpace, ruleFlagsCanDeleteNewLines),
		rule("SpaceBeforeTemplateMiddleAndTail", anyToken, []ast.Kind{ast.KindTemplateMiddle, ast.KindTemplateTail}, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterTemplateHeadAndMiddle", []ast.Kind{ast.KindTemplateHead, ast.KindTemplateMiddle}, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxTextContext}, ruleActionDeleteSpace, ruleFlagsCanDeleteNewLines),
		rule("NoSpaceBeforeTemplateMiddleAndTail", anyToken, []ast.Kind{ast.KindTemplateMiddle, ast.KindTemplateTail}, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption), isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// No space after { and before } in JSX expression
		rule("SpaceAfterOpenBraceInJsxExpression", ast.KindOpenBraceToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext}, ruleActionInsertSpace),
		rule("SpaceBeforeCloseBraceInJsxExpression", anyToken, ast.KindCloseBraceToken, []contextPredicate{isOptionEnabled(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterOpenBraceInJsxExpression", ast.KindOpenBraceToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext}, ruleActionDeleteSpace),
		rule("NoSpaceBeforeCloseBraceInJsxExpression", anyToken, ast.KindCloseBraceToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption), isNonJsxSameLineTokenContext, isJsxExpressionContext}, ruleActionDeleteSpace),

		// Insert space after semicolon in for statement
		rule("SpaceAfterSemicolonInFor", ast.KindSemicolonToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterSemicolonInForStatementsOption), isNonJsxSameLineTokenContext, isForContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterSemicolonInFor", ast.KindSemicolonToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterSemicolonInForStatementsOption), isNonJsxSameLineTokenContext, isForContext}, ruleActionDeleteSpace),

		// Insert space before and after binary operators
		rule("SpaceBeforeBinaryOperator", anyToken, binaryOperators, []contextPredicate{isOptionEnabled(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("SpaceAfterBinaryOperator", binaryOperators, anyToken, []contextPredicate{isOptionEnabled(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionInsertSpace),
		rule("NoSpaceBeforeBinaryOperator", anyToken, binaryOperators, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterBinaryOperator", binaryOperators, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceBeforeAndAfterBinaryOperatorsOption), isNonJsxSameLineTokenContext, isBinaryOpContext}, ruleActionDeleteSpace),

		rule("SpaceBeforeOpenParenInFuncDecl", anyToken, ast.KindOpenParenToken, []contextPredicate{isOptionEnabled(insertSpaceBeforeFunctionParenthesisOption), isNonJsxSameLineTokenContext, isFunctionDeclContext}, ruleActionInsertSpace),
		rule("NoSpaceBeforeOpenParenInFuncDecl", anyToken, ast.KindOpenParenToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceBeforeFunctionParenthesisOption), isNonJsxSameLineTokenContext, isFunctionDeclContext}, ruleActionDeleteSpace),

		// Open Brace braces after control block
		rule("NewLineBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionEnabled(placeOpenBraceOnNewLineForControlBlocksOption), isControlDeclContext, isBeforeMultilineBlockContext}, ruleActionInsertNewLine, ruleFlagsCanDeleteNewLines),

		// Open Brace braces after function
		// TypeScript: Function can have return types, which can be made of tons of different token kinds
		rule("NewLineBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionEnabled(placeOpenBraceOnNewLineForFunctionsOption), isFunctionDeclContext, isBeforeMultilineBlockContext}, ruleActionInsertNewLine, ruleFlagsCanDeleteNewLines),
		// Open Brace braces after TypeScript module/class/interface
		rule("NewLineBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionEnabled(placeOpenBraceOnNewLineForFunctionsOption), isTypeScriptDeclWithBlockContext, isBeforeMultilineBlockContext}, ruleActionInsertNewLine, ruleFlagsCanDeleteNewLines),

		rule("SpaceAfterTypeAssertion", ast.KindGreaterThanToken, anyToken, []contextPredicate{isOptionEnabled(insertSpaceAfterTypeAssertionOption), isNonJsxSameLineTokenContext, isTypeAssertionContext}, ruleActionInsertSpace),
		rule("NoSpaceAfterTypeAssertion", ast.KindGreaterThanToken, anyToken, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceAfterTypeAssertionOption), isNonJsxSameLineTokenContext, isTypeAssertionContext}, ruleActionDeleteSpace),

		rule("SpaceBeforeTypeAnnotation", anyToken, []ast.Kind{ast.KindQuestionToken, ast.KindColonToken}, []contextPredicate{isOptionEnabled(insertSpaceBeforeTypeAnnotationOption), isNonJsxSameLineTokenContext, isTypeAnnotationContext}, ruleActionInsertSpace),
		rule("NoSpaceBeforeTypeAnnotation", anyToken, []ast.Kind{ast.KindQuestionToken, ast.KindColonToken}, []contextPredicate{isOptionDisabledOrUndefined(insertSpaceBeforeTypeAnnotationOption), isNonJsxSameLineTokenContext, isTypeAnnotationContext}, ruleActionDeleteSpace),

		rule("NoOptionalSemicolon", ast.KindSemicolonToken, anyTokenIncludingEOF, []contextPredicate{optionEquals(semicolonOption, SemicolonPreferenceRemove), isSemicolonDeletionContext}, ruleActionDeleteToken),
		rule("OptionalSemicolon", anyToken, anyTokenIncludingEOF, []contextPredicate{optionEquals(semicolonOption, SemicolonPreferenceInsert), isSemicolonInsertionContext}, ruleActionInsertTrailingSemicolon),
	}

	// These rules are lower in priority than user-configurable. Rules earlier in this list have priority over rules later in the list.
	lowPriorityCommonRules := []ruleSpec{
		// Space after keyword but not before ; or : or ?
		rule("NoSpaceBeforeSemicolon", anyToken, ast.KindSemicolonToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		rule("SpaceBeforeOpenBraceInControl", controlOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForControlBlocksOption), isControlDeclContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext}, ruleActionInsertSpace, ruleFlagsCanDeleteNewLines),
		rule("SpaceBeforeOpenBraceInFunction", functionOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForFunctionsOption), isFunctionDeclContext, isBeforeBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext}, ruleActionInsertSpace, ruleFlagsCanDeleteNewLines),
		rule("SpaceBeforeOpenBraceInTypeScriptDeclWithBlock", typeScriptOpenBraceLeftTokenRange, ast.KindOpenBraceToken, []contextPredicate{isOptionDisabledOrUndefinedOrTokensOnSameLine(placeOpenBraceOnNewLineForFunctionsOption), isTypeScriptDeclWithBlockContext, isNotFormatOnEnter, isSameLineTokenOrBeforeBlockContext}, ruleActionInsertSpace, ruleFlagsCanDeleteNewLines),

		rule("NoSpaceBeforeComma", anyToken, ast.KindCommaToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// No space before and after indexer `x[]ast.Kind{}`
		rule("NoSpaceBeforeOpenBracket", anyTokenExcept(ast.KindAsyncKeyword, ast.KindCaseKeyword), ast.KindOpenBracketToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),
		rule("NoSpaceAfterCloseBracket", ast.KindCloseBracketToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext, isNotBeforeBlockInFunctionDeclarationContext}, ruleActionDeleteSpace),
		rule("SpaceAfterSemicolon", ast.KindSemicolonToken, anyToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),

		// Remove extra space between for and await
		rule("SpaceBetweenForAndAwaitKeyword", ast.KindForKeyword, ast.KindAwaitKeyword, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),

		// Remove extra spaces between ... and type name in tuple spread
		rule("SpaceBetweenDotDotDotAndTypeName", ast.KindDotDotDotToken, typeNames, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionDeleteSpace),

		// Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
		// So, we have a rule to add a space for []ast.Kind{),Any}, []ast.Kind{do,Any}, []ast.Kind{else,Any}, and []ast.Kind{case,Any}
		rule(
			"SpaceBetweenStatements",
			[]ast.Kind{ast.KindCloseParenToken, ast.KindDoKeyword, ast.KindElseKeyword, ast.KindCaseKeyword},
			anyToken,
			[]contextPredicate{isNonJsxSameLineTokenContext, isNonJsxElementOrFragmentContext, isNotForContext},
			ruleActionInsertSpace,
		),
		// This low-pri rule takes care of "try {", "catch {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
		rule("SpaceAfterTryCatchFinally", []ast.Kind{ast.KindTryKeyword, ast.KindCatchKeyword, ast.KindFinallyKeyword}, ast.KindOpenBraceToken, []contextPredicate{isNonJsxSameLineTokenContext}, ruleActionInsertSpace),
	}

	result := make([]ruleSpec, 0, len(highPriorityCommonRules)+len(userConfigurableRules)+len(lowPriorityCommonRules))
	result = append(result, highPriorityCommonRules...)
	result = append(result, userConfigurableRules...)
	result = append(result, lowPriorityCommonRules...)
	return result
}

func tokenRangeFrom(tokens ...ast.Kind) tokenRange {
	return tokenRange{
		isSpecific: true,
		tokens:     tokens,
	}
}

func tokenRangeFromEx(prefix []ast.Kind, tokens ...ast.Kind) tokenRange {
	tokens = append(prefix, tokens...)
	return tokenRange{
		isSpecific: true,
		tokens:     tokens,
	}
}

func tokenRangeFromRange(start ast.Kind, end ast.Kind) tokenRange {
	tokens := make([]ast.Kind, 0, end-start+1)
	for token := start; token <= end; token++ {
		tokens = append(tokens, token)
	}

	return tokenRangeFrom(tokens...)
}
