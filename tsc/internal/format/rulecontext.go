package format

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsutil"
	"github.com/microsoft/typescript-go/internal/scanner"
)

///
/// Contexts
///

type (
	optionSelector                  = func(options *FormatCodeSettings) core.Tristate
	anyOptionSelector[T comparable] = func(options *FormatCodeSettings) T
)

func semicolonOption(options *FormatCodeSettings) SemicolonPreference { return options.Semicolons }
func insertSpaceAfterCommaDelimiterOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterCommaDelimiter
}

func insertSpaceAfterSemicolonInForStatementsOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterSemicolonInForStatements
}

func insertSpaceBeforeAndAfterBinaryOperatorsOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceBeforeAndAfterBinaryOperators
}

func insertSpaceAfterConstructorOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterConstructor
}

func insertSpaceAfterKeywordsInControlFlowStatementsOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterKeywordsInControlFlowStatements
}

func insertSpaceAfterFunctionKeywordForAnonymousFunctionsOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterFunctionKeywordForAnonymousFunctions
}

func insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesisOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis
}

func insertSpaceAfterOpeningAndBeforeClosingNonemptyBracketsOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets
}

func insertSpaceAfterOpeningAndBeforeClosingNonemptyBracesOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces
}

func insertSpaceAfterOpeningAndBeforeClosingEmptyBracesOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces
}

func insertSpaceAfterOpeningAndBeforeClosingTemplateStringBracesOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces
}

func insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBracesOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces
}

func insertSpaceAfterTypeAssertionOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceAfterTypeAssertion
}

func insertSpaceBeforeFunctionParenthesisOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceBeforeFunctionParenthesis
}

func placeOpenBraceOnNewLineForFunctionsOption(options *FormatCodeSettings) core.Tristate {
	return options.PlaceOpenBraceOnNewLineForFunctions
}

func placeOpenBraceOnNewLineForControlBlocksOption(options *FormatCodeSettings) core.Tristate {
	return options.PlaceOpenBraceOnNewLineForControlBlocks
}

func insertSpaceBeforeTypeAnnotationOption(options *FormatCodeSettings) core.Tristate {
	return options.InsertSpaceBeforeTypeAnnotation
}

func indentMultiLineObjectLiteralBeginningOnBlankLineOption(options *FormatCodeSettings) core.Tristate {
	return options.IndentMultiLineObjectLiteralBeginningOnBlankLine
}

func indentSwitchCaseOption(options *FormatCodeSettings) core.Tristate {
	return options.IndentSwitchCase
}

func optionEquals[T comparable](optionName anyOptionSelector[T], optionValue T) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return false
		}
		return optionName(context.Options) == optionValue
	}
}

func isOptionEnabled(optionName optionSelector) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return false
		}
		return optionName(context.Options).IsTrue()
	}
}

func isOptionDisabled(optionName optionSelector) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return true
		}
		return optionName(context.Options).IsFalse()
	}
}

func isOptionDisabledOrUndefined(optionName optionSelector) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return true
		}
		return optionName(context.Options).IsFalseOrUnknown()
	}
}

func isOptionDisabledOrUndefinedOrTokensOnSameLine(optionName optionSelector) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return true
		}
		return optionName(context.Options).IsFalseOrUnknown() || context.TokensAreOnSameLine()
	}
}

func isOptionEnabledOrUndefined(optionName optionSelector) contextPredicate {
	return func(context *formattingContext) bool {
		if context.Options == nil {
			return true
		}
		return optionName(context.Options).IsTrueOrUnknown()
	}
}

func isForContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindForStatement
}

func isNotForContext(context *formattingContext) bool {
	return !isForContext(context)
}

func isBinaryOpContext(context *formattingContext) bool {
	switch context.contextNode.Kind {
	case ast.KindBinaryExpression:
		return context.contextNode.AsBinaryExpression().OperatorToken.Kind != ast.KindCommaToken
	case ast.KindConditionalExpression,
		ast.KindConditionalType,
		ast.KindAsExpression,
		ast.KindExportSpecifier,
		ast.KindImportSpecifier,
		ast.KindTypePredicate,
		ast.KindUnionType,
		ast.KindIntersectionType,
		ast.KindSatisfiesExpression:
		return true

	// equals in binding elements func foo([[x, y] = [1, 2]])
	case ast.KindBindingElement:
		// equals in type X = ...
		fallthrough
	case ast.KindTypeAliasDeclaration:
		// equal in import a = module('a');
		fallthrough
	case ast.KindImportEqualsDeclaration:
		// equal in export = 1
		fallthrough
	case ast.KindExportAssignment:
		// equal in let a = 0
		fallthrough
	case ast.KindVariableDeclaration:
		// equal in p = 0
		fallthrough
	case ast.KindParameter,
		ast.KindEnumMember,
		ast.KindPropertyDeclaration,
		ast.KindPropertySignature:
		return context.currentTokenSpan.Kind == ast.KindEqualsToken || context.nextTokenSpan.Kind == ast.KindEqualsToken
	// "in" keyword in for (let x in []) { }
	case ast.KindForInStatement:
		// "in" keyword in [P in keyof T] T[P]
		fallthrough
	case ast.KindTypeParameter:
		return context.currentTokenSpan.Kind == ast.KindInKeyword || context.nextTokenSpan.Kind == ast.KindInKeyword || context.currentTokenSpan.Kind == ast.KindEqualsToken || context.nextTokenSpan.Kind == ast.KindEqualsToken
	// Technically, "of" is not a binary operator, but format it the same way as "in"
	case ast.KindForOfStatement:
		return context.currentTokenSpan.Kind == ast.KindOfKeyword || context.nextTokenSpan.Kind == ast.KindOfKeyword
	}
	return false
}

func isNotBinaryOpContext(context *formattingContext) bool {
	return !isBinaryOpContext(context)
}

func isNotTypeAnnotationContext(context *formattingContext) bool {
	return !isTypeAnnotationContext(context)
}

func isTypeAnnotationContext(context *formattingContext) bool {
	contextKind := context.contextNode.Kind
	return contextKind == ast.KindPropertyDeclaration ||
		contextKind == ast.KindPropertySignature ||
		contextKind == ast.KindParameter ||
		contextKind == ast.KindVariableDeclaration ||
		ast.IsFunctionLikeKind(contextKind)
}

func isOptionalPropertyContext(context *formattingContext) bool {
	return ast.IsPropertyDeclaration(context.contextNode) && context.contextNode.AsPropertyDeclaration().PostfixToken != nil && context.contextNode.AsPropertyDeclaration().PostfixToken.Kind == ast.KindQuestionToken
}

func isNonOptionalPropertyContext(context *formattingContext) bool {
	return !isOptionalPropertyContext(context)
}

func isConditionalOperatorContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindConditionalExpression ||
		context.contextNode.Kind == ast.KindConditionalType
}

func isSameLineTokenOrBeforeBlockContext(context *formattingContext) bool {
	return context.TokensAreOnSameLine() || isBeforeBlockContext(context)
}

func isBraceWrappedContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindObjectBindingPattern ||
		context.contextNode.Kind == ast.KindMappedType ||
		isSingleLineBlockContext(context)
}

// This check is done before an open brace in a control construct, a function, or a typescript block declaration
func isBeforeMultilineBlockContext(context *formattingContext) bool {
	return isBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine())
}

func isMultilineBlockContext(context *formattingContext) bool {
	return isBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine())
}

func isSingleLineBlockContext(context *formattingContext) bool {
	return isBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine())
}

func isBlockContext(context *formattingContext) bool {
	return nodeIsBlockContext(context.contextNode)
}

func isBeforeBlockContext(context *formattingContext) bool {
	return nodeIsBlockContext(context.nextTokenParent)
}

// IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
func nodeIsBlockContext(node *ast.Node) bool {
	if nodeIsTypeScriptDeclWithBlockContext(node) {
		// This means we are in a context that looks like a block to the user, but in the grammar is actually not a node (it's a class, module, enum, object type literal, etc).
		return true
	}

	switch node.Kind {
	case ast.KindBlock,
		ast.KindCaseBlock,
		ast.KindObjectLiteralExpression,
		ast.KindModuleBlock:
		return true
	}

	return false
}

func isFunctionDeclContext(context *formattingContext) bool {
	switch context.contextNode.Kind {
	case ast.KindFunctionDeclaration,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature:
		// case ast.KindMemberFunctionDeclaration:
		fallthrough
	case ast.KindGetAccessor,
		ast.KindSetAccessor:
		// case ast.KindMethodSignature:
		fallthrough
	case ast.KindCallSignature,
		ast.KindFunctionExpression,
		ast.KindConstructor,
		ast.KindArrowFunction:
		// case ast.KindConstructorDeclaration:
		// case ast.KindSimpleArrowFunctionExpression:
		// case ast.KindParenthesizedArrowFunctionExpression:
		fallthrough
	case ast.KindInterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
		return true
	}

	return false
}

func isNotFunctionDeclContext(context *formattingContext) bool {
	return !isFunctionDeclContext(context)
}

func isFunctionDeclarationOrFunctionExpressionContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindFunctionDeclaration || context.contextNode.Kind == ast.KindFunctionExpression
}

func isTypeScriptDeclWithBlockContext(context *formattingContext) bool {
	return nodeIsTypeScriptDeclWithBlockContext(context.contextNode)
}

func nodeIsTypeScriptDeclWithBlockContext(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindEnumDeclaration,
		ast.KindTypeLiteral,
		ast.KindModuleDeclaration,
		ast.KindExportDeclaration,
		ast.KindNamedExports,
		ast.KindImportDeclaration,
		ast.KindNamedImports:
		return true
	}

	return false
}

func isAfterCodeBlockContext(context *formattingContext) bool {
	switch context.currentTokenParent.Kind {
	case ast.KindClassDeclaration,
		ast.KindModuleDeclaration,
		ast.KindEnumDeclaration,
		ast.KindCatchClause,
		ast.KindModuleBlock,
		ast.KindSwitchStatement:
		return true
	case ast.KindBlock:
		blockParent := context.currentTokenParent.Parent
		// In a codefix scenario, we can't rely on parents being set. So just always return true.
		if blockParent == nil || blockParent.Kind != ast.KindArrowFunction && blockParent.Kind != ast.KindFunctionExpression {
			return true
		}
	}
	return false
}

func isControlDeclContext(context *formattingContext) bool {
	switch context.contextNode.Kind {
	case ast.KindIfStatement,
		ast.KindSwitchStatement,
		ast.KindForStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindWhileStatement,
		ast.KindTryStatement,
		ast.KindDoStatement,
		ast.KindWithStatement:
		// TODO
		// case ast.KindElseClause:
		fallthrough
	case ast.KindCatchClause:
		return true

	default:
		return false
	}
}

func isObjectContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindObjectLiteralExpression
}

func isFunctionCallContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindCallExpression
}

func isNewContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindNewExpression
}

func isFunctionCallOrNewContext(context *formattingContext) bool {
	return isFunctionCallContext(context) || isNewContext(context)
}

func isPreviousTokenNotComma(context *formattingContext) bool {
	return context.currentTokenSpan.Kind != ast.KindCommaToken
}

func isNextTokenNotCloseBracket(context *formattingContext) bool {
	return context.nextTokenSpan.Kind != ast.KindCloseBracketToken
}

func isNextTokenNotCloseParen(context *formattingContext) bool {
	return context.nextTokenSpan.Kind != ast.KindCloseParenToken
}

func isArrowFunctionContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindArrowFunction
}

func isImportTypeContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindImportType
}

func isNonJsxSameLineTokenContext(context *formattingContext) bool {
	return context.TokensAreOnSameLine() && context.contextNode.Kind != ast.KindJsxText
}

func isNonJsxTextContext(context *formattingContext) bool {
	return context.contextNode.Kind != ast.KindJsxText
}

func isNonJsxElementOrFragmentContext(context *formattingContext) bool {
	return context.contextNode.Kind != ast.KindJsxElement && context.contextNode.Kind != ast.KindJsxFragment
}

func isJsxExpressionContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindJsxExpression || context.contextNode.Kind == ast.KindJsxSpreadAttribute
}

func isNextTokenParentJsxAttribute(context *formattingContext) bool {
	return context.nextTokenParent.Kind == ast.KindJsxAttribute || (context.nextTokenParent.Kind == ast.KindJsxNamespacedName && context.nextTokenParent.Parent.Kind == ast.KindJsxAttribute)
}

func isJsxAttributeContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindJsxAttribute
}

func isNextTokenParentNotJsxNamespacedName(context *formattingContext) bool {
	return context.nextTokenParent.Kind != ast.KindJsxNamespacedName
}

func isNextTokenParentJsxNamespacedName(context *formattingContext) bool {
	return context.nextTokenParent.Kind == ast.KindJsxNamespacedName
}

func isJsxSelfClosingElementContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindJsxSelfClosingElement
}

func isNotBeforeBlockInFunctionDeclarationContext(context *formattingContext) bool {
	return !isFunctionDeclContext(context) && !isBeforeBlockContext(context)
}

func isEndOfDecoratorContextOnSameLine(context *formattingContext) bool {
	return context.TokensAreOnSameLine() &&
		ast.HasDecorators(context.contextNode) &&
		nodeIsInDecoratorContext(context.currentTokenParent) &&
		!nodeIsInDecoratorContext(context.nextTokenParent)
}

func nodeIsInDecoratorContext(node *ast.Node) bool {
	for node != nil && ast.IsExpression(node) {
		node = node.Parent
	}
	return node != nil && node.Kind == ast.KindDecorator
}

func isStartOfVariableDeclarationList(context *formattingContext) bool {
	return context.currentTokenParent.Kind == ast.KindVariableDeclarationList &&
		scanner.GetTokenPosOfNode(context.currentTokenParent, context.SourceFile, false) == context.currentTokenSpan.Loc.Pos()
}

func isNotFormatOnEnter(context *formattingContext) bool {
	return context.FormattingRequestKind != FormatRequestKindFormatOnEnter
}

func isModuleDeclContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindModuleDeclaration
}

func isObjectTypeContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindTypeLiteral // && context.contextNode.parent.Kind != ast.KindInterfaceDeclaration;
}

func isConstructorSignatureContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindConstructSignature
}

func isTypeArgumentOrParameterOrAssertion(token TextRangeWithKind, parent *ast.Node) bool {
	if token.Kind != ast.KindLessThanToken && token.Kind != ast.KindGreaterThanToken {
		return false
	}
	switch parent.Kind {
	case ast.KindTypeReference,
		ast.KindTypeAssertionExpression,
		ast.KindTypeAliasDeclaration,
		ast.KindClassDeclaration,
		ast.KindClassExpression,
		ast.KindInterfaceDeclaration,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindArrowFunction,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindCallSignature,
		ast.KindConstructSignature,
		ast.KindCallExpression,
		ast.KindNewExpression,
		ast.KindExpressionWithTypeArguments:
		return true
	default:
		return false
	}
}

func isTypeArgumentOrParameterOrAssertionContext(context *formattingContext) bool {
	return isTypeArgumentOrParameterOrAssertion(context.currentTokenSpan, context.currentTokenParent) ||
		isTypeArgumentOrParameterOrAssertion(context.nextTokenSpan, context.nextTokenParent)
}

func isTypeAssertionContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindTypeAssertionExpression
}

func isNonTypeAssertionContext(context *formattingContext) bool {
	return !isTypeAssertionContext(context)
}

func isVoidOpContext(context *formattingContext) bool {
	return context.currentTokenSpan.Kind == ast.KindVoidKeyword && context.currentTokenParent.Kind == ast.KindVoidExpression
}

func isYieldOrYieldStarWithOperand(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindYieldExpression && context.contextNode.AsYieldExpression().Expression != nil
}

func isNonNullAssertionContext(context *formattingContext) bool {
	return context.contextNode.Kind == ast.KindNonNullExpression
}

func isNotStatementConditionContext(context *formattingContext) bool {
	return !isStatementConditionContext(context)
}

func isStatementConditionContext(context *formattingContext) bool {
	switch context.contextNode.Kind {
	case ast.KindIfStatement,
		ast.KindForStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindDoStatement,
		ast.KindWhileStatement:
		return true

	default:
		return false
	}
}

func isSemicolonDeletionContext(context *formattingContext) bool {
	nextTokenKind := context.nextTokenSpan.Kind
	nextTokenStart := context.nextTokenSpan.Loc.Pos()
	if ast.IsTrivia(nextTokenKind) {
		var nextRealToken *ast.Node
		if context.nextTokenParent == context.currentTokenParent {
			// !!! TODO: very different from strada, but strada's logic here is wonky - find the first ancestor without a parent? that's just the source file.
			nextRealToken = astnav.FindNextToken(context.nextTokenParent, context.SourceFile.AsNode(), context.SourceFile)
		} else {
			nextRealToken = lsutil.GetFirstToken(context.nextTokenParent, context.SourceFile)
		}

		if nextRealToken == nil {
			return true
		}
		nextTokenKind = nextRealToken.Kind
		nextTokenStart = scanner.GetTokenPosOfNode(nextRealToken, context.SourceFile, false)
	}

	startLine, _ := scanner.GetECMALineAndCharacterOfPosition(context.SourceFile, context.currentTokenSpan.Loc.Pos())
	endLine, _ := scanner.GetECMALineAndCharacterOfPosition(context.SourceFile, nextTokenStart)
	if startLine == endLine {
		return nextTokenKind == ast.KindCloseBraceToken || nextTokenKind == ast.KindEndOfFile
	}

	if nextTokenKind == ast.KindSemicolonToken &&
		context.currentTokenSpan.Kind == ast.KindSemicolonToken {
		return true
	}

	if nextTokenKind == ast.KindSemicolonClassElement ||
		nextTokenKind == ast.KindSemicolonToken {
		return false
	}

	if context.contextNode.Kind == ast.KindInterfaceDeclaration ||
		context.contextNode.Kind == ast.KindTypeAliasDeclaration {
		// Can't remove semicolon after `foo`; it would parse as a method declaration:
		//
		// interface I {
		//   foo;
		//   () void
		// }
		return context.currentTokenParent.Kind != ast.KindPropertySignature ||
			context.currentTokenParent.Type() != nil ||
			nextTokenKind != ast.KindOpenParenToken
	}

	if ast.IsPropertyDeclaration(context.currentTokenParent) {
		return context.currentTokenParent.Initializer() == nil
	}

	return context.currentTokenParent.Kind != ast.KindForStatement &&
		context.currentTokenParent.Kind != ast.KindEmptyStatement &&
		context.currentTokenParent.Kind != ast.KindSemicolonClassElement &&
		nextTokenKind != ast.KindOpenBracketToken &&
		nextTokenKind != ast.KindOpenParenToken &&
		nextTokenKind != ast.KindPlusToken &&
		nextTokenKind != ast.KindMinusToken &&
		nextTokenKind != ast.KindSlashToken &&
		nextTokenKind != ast.KindRegularExpressionLiteral &&
		nextTokenKind != ast.KindCommaToken &&
		nextTokenKind != ast.KindTemplateExpression &&
		nextTokenKind != ast.KindTemplateHead &&
		nextTokenKind != ast.KindNoSubstitutionTemplateLiteral &&
		nextTokenKind != ast.KindDotToken
}

func isSemicolonInsertionContext(context *formattingContext) bool {
	return lsutil.PositionIsASICandidate(context.currentTokenSpan.Loc.End(), context.currentTokenParent, context.SourceFile)
}

func isNotPropertyAccessOnIntegerLiteral(context *formattingContext) bool {
	return !ast.IsPropertyAccessExpression(context.contextNode) ||
		!ast.IsNumericLiteral(context.contextNode.Expression()) ||
		strings.Contains(context.contextNode.Expression().Text(), ".")
}
