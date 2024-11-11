// Package printer exports a Printer for pretty-printing TS ASTs and writer interfaces and implementations for using them
// Intended ultimate usage:
//
//		func nodeToInlineStr(node *Node) {
//	   // Reuse singleton single-line writer (TODO: thread safety?)
//		  printer := printer.New({ writer: printer.SingleLineTextWriter, stripComments: true })
//		  printer.printNode(node)
//		  return printer.getText()
//		}
//
// // or
//
//		func nodeToStr(node *Node, options CompilerOptions) {
//	   // create new writer shared for the entire printing operation
//		  printer := printer.New({ writer: printer.NewTextWriter(options.newLine) })
//		  printer.printNode(node)
//		  return printer.getText()
//		}
package printer

import "github.com/microsoft/typescript-go/internal/compiler"

// Prints a node into a string - creates its' own text writer to facilitate this - prefer emitter.PrintNode where an emitter is available
func PrintNode(node *compiler.Node) string {
	writer := NewTextWriter("\n")
	// printNode(node, writer)
	return writer.getText()
}

// func printNode(node *compiler.Node, writer EmitTextWriter) {
// 	// TODO: Port emitter.ts's emit code more faithfully
// 	switch node.Kind {
// 	case compiler.SyntaxKindUnknown, compiler.SyntaxKindEndOfFile, compiler.SyntaxKindConflictMarkerTrivia, compiler.SyntaxKindNonTextFileMarkerTrivia:
// 		panic("non-printing node kind")
// 	case compiler.SyntaxKindNumericLiteral:
// 	case compiler.SyntaxKindBigintLiteral:
// 	case compiler.SyntaxKindStringLiteral:
// 	case compiler.SyntaxKindJsxText:
// 	case compiler.SyntaxKindJsxTextAllWhiteSpaces:
// 	case compiler.SyntaxKindRegularExpressionLiteral:
// 	case compiler.SyntaxKindNoSubstitutionTemplateLiteral:
// 	case compiler.SyntaxKindTemplateHead:
// 	case compiler.SyntaxKindTemplateMiddle:
// 	case compiler.SyntaxKindTemplateTail:
// 	case compiler.SyntaxKindOpenBraceToken:
// 	case compiler.SyntaxKindCloseBraceToken:
// 	case compiler.SyntaxKindOpenParenToken:
// 	case compiler.SyntaxKindCloseParenToken:
// 	case compiler.SyntaxKindOpenBracketToken:
// 	case compiler.SyntaxKindCloseBracketToken:
// 	case compiler.SyntaxKindDotToken:
// 	case compiler.SyntaxKindDotDotDotToken:
// 	case compiler.SyntaxKindSemicolonToken:
// 	case compiler.SyntaxKindCommaToken:
// 	case compiler.SyntaxKindQuestionDotToken:
// 	case compiler.SyntaxKindLessThanToken:
// 	case compiler.SyntaxKindLessThanSlashToken:
// 	case compiler.SyntaxKindGreaterThanToken:
// 	case compiler.SyntaxKindLessThanEqualsToken:
// 	case compiler.SyntaxKindGreaterThanEqualsToken:
// 	case compiler.SyntaxKindEqualsEqualsToken:
// 	case compiler.SyntaxKindExclamationEqualsToken:
// 	case compiler.SyntaxKindEqualsEqualsEqualsToken:
// 	case compiler.SyntaxKindExclamationEqualsEqualsToken:
// 	case compiler.SyntaxKindEqualsGreaterThanToken:
// 	case compiler.SyntaxKindPlusToken:
// 	case compiler.SyntaxKindMinusToken:
// 	case compiler.SyntaxKindAsteriskToken:
// 	case compiler.SyntaxKindAsteriskAsteriskToken:
// 	case compiler.SyntaxKindSlashToken:
// 	case compiler.SyntaxKindPercentToken:
// 	case compiler.SyntaxKindPlusPlusToken:
// 	case compiler.SyntaxKindMinusMinusToken:
// 	case compiler.SyntaxKindLessThanLessThanToken:
// 	case compiler.SyntaxKindGreaterThanGreaterThanToken:
// 	case compiler.SyntaxKindGreaterThanGreaterThanGreaterThanToken:
// 	case compiler.SyntaxKindAmpersandToken:
// 	case compiler.SyntaxKindBarToken:
// 	case compiler.SyntaxKindCaretToken:
// 	case compiler.SyntaxKindExclamationToken:
// 	case compiler.SyntaxKindTildeToken:
// 	case compiler.SyntaxKindAmpersandAmpersandToken:
// 	case compiler.SyntaxKindBarBarToken:
// 	case compiler.SyntaxKindQuestionToken:
// 	case compiler.SyntaxKindColonToken:
// 	case compiler.SyntaxKindAtToken:
// 	case compiler.SyntaxKindQuestionQuestionToken:
// 	/** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
// 	case compiler.SyntaxKindBacktickToken:
// 	/** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
// 	case compiler.SyntaxKindHashToken:
// 	// Assignments
// 	case compiler.SyntaxKindEqualsToken:
// 	case compiler.SyntaxKindPlusEqualsToken:
// 	case compiler.SyntaxKindMinusEqualsToken:
// 	case compiler.SyntaxKindAsteriskEqualsToken:
// 	case compiler.SyntaxKindAsteriskAsteriskEqualsToken:
// 	case compiler.SyntaxKindSlashEqualsToken:
// 	case compiler.SyntaxKindPercentEqualsToken:
// 	case compiler.SyntaxKindLessThanLessThanEqualsToken:
// 	case compiler.SyntaxKindGreaterThanGreaterThanEqualsToken:
// 	case compiler.SyntaxKindGreaterThanGreaterThanGreaterThanEqualsToken:
// 	case compiler.SyntaxKindAmpersandEqualsToken:
// 	case compiler.SyntaxKindBarEqualsToken:
// 	case compiler.SyntaxKindBarBarEqualsToken:
// 	case compiler.SyntaxKindAmpersandAmpersandEqualsToken:
// 	case compiler.SyntaxKindQuestionQuestionEqualsToken:
// 	case compiler.SyntaxKindCaretEqualsToken:
// 	// Identifiers and PrivateIdentifier
// 	case compiler.SyntaxKindIdentifier:
// 	case compiler.SyntaxKindPrivateIdentifier:
// 	case compiler.SyntaxKindJSDocCommentTextToken:
// 	// Reserved words
// 	case compiler.SyntaxKindBreakKeyword:
// 	case compiler.SyntaxKindCaseKeyword:
// 	case compiler.SyntaxKindCatchKeyword:
// 	case compiler.SyntaxKindClassKeyword:
// 	case compiler.SyntaxKindConstKeyword:
// 	case compiler.SyntaxKindContinueKeyword:
// 	case compiler.SyntaxKindDebuggerKeyword:
// 	case compiler.SyntaxKindDefaultKeyword:
// 	case compiler.SyntaxKindDeleteKeyword:
// 	case compiler.SyntaxKindDoKeyword:
// 	case compiler.SyntaxKindElseKeyword:
// 	case compiler.SyntaxKindEnumKeyword:
// 	case compiler.SyntaxKindExportKeyword:
// 	case compiler.SyntaxKindExtendsKeyword:
// 	case compiler.SyntaxKindFalseKeyword:
// 	case compiler.SyntaxKindFinallyKeyword:
// 	case compiler.SyntaxKindForKeyword:
// 	case compiler.SyntaxKindFunctionKeyword:
// 	case compiler.SyntaxKindIfKeyword:
// 	case compiler.SyntaxKindImportKeyword:
// 	case compiler.SyntaxKindInKeyword:
// 	case compiler.SyntaxKindInstanceOfKeyword:
// 	case compiler.SyntaxKindNewKeyword:
// 	case compiler.SyntaxKindNullKeyword:
// 	case compiler.SyntaxKindReturnKeyword:
// 	case compiler.SyntaxKindSuperKeyword:
// 	case compiler.SyntaxKindSwitchKeyword:
// 	case compiler.SyntaxKindThisKeyword:
// 	case compiler.SyntaxKindThrowKeyword:
// 	case compiler.SyntaxKindTrueKeyword:
// 	case compiler.SyntaxKindTryKeyword:
// 	case compiler.SyntaxKindTypeOfKeyword:
// 	case compiler.SyntaxKindVarKeyword:
// 	case compiler.SyntaxKindVoidKeyword:
// 	case compiler.SyntaxKindWhileKeyword:
// 	case compiler.SyntaxKindWithKeyword:
// 	case compiler.SyntaxKindImplementsKeyword:
// 	case compiler.SyntaxKindInterfaceKeyword:
// 	case compiler.SyntaxKindLetKeyword:
// 	case compiler.SyntaxKindPackageKeyword:
// 	case compiler.SyntaxKindPrivateKeyword:
// 	case compiler.SyntaxKindProtectedKeyword:
// 	case compiler.SyntaxKindPublicKeyword:
// 	case compiler.SyntaxKindStaticKeyword:
// 	case compiler.SyntaxKindYieldKeyword:
// 	case compiler.SyntaxKindAbstractKeyword:
// 	case compiler.SyntaxKindAccessorKeyword:
// 	case compiler.SyntaxKindAsKeyword:
// 	case compiler.SyntaxKindAssertsKeyword:
// 	case compiler.SyntaxKindAssertKeyword:
// 	case compiler.SyntaxKindAnyKeyword:
// 	case compiler.SyntaxKindAsyncKeyword:
// 	case compiler.SyntaxKindAwaitKeyword:
// 	case compiler.SyntaxKindBooleanKeyword:
// 	case compiler.SyntaxKindConstructorKeyword:
// 	case compiler.SyntaxKindDeclareKeyword:
// 	case compiler.SyntaxKindGetKeyword:
// 	case compiler.SyntaxKindImmediateKeyword:
// 	case compiler.SyntaxKindInferKeyword:
// 	case compiler.SyntaxKindIntrinsicKeyword:
// 	case compiler.SyntaxKindIsKeyword:
// 	case compiler.SyntaxKindKeyOfKeyword:
// 	case compiler.SyntaxKindModuleKeyword:
// 	case compiler.SyntaxKindNamespaceKeyword:
// 	case compiler.SyntaxKindNeverKeyword:
// 	case compiler.SyntaxKindOutKeyword:
// 	case compiler.SyntaxKindReadonlyKeyword:
// 	case compiler.SyntaxKindRequireKeyword:
// 	case compiler.SyntaxKindNumberKeyword:
// 	case compiler.SyntaxKindObjectKeyword:
// 	case compiler.SyntaxKindSatisfiesKeyword:
// 	case compiler.SyntaxKindSetKeyword:
// 	case compiler.SyntaxKindStringKeyword:
// 	case compiler.SyntaxKindSymbolKeyword:
// 	case compiler.SyntaxKindTypeKeyword:
// 	case compiler.SyntaxKindUndefinedKeyword:
// 	case compiler.SyntaxKindUniqueKeyword:
// 	case compiler.SyntaxKindUnknownKeyword:
// 	case compiler.SyntaxKindUsingKeyword:
// 	case compiler.SyntaxKindFromKeyword:
// 	case compiler.SyntaxKindGlobalKeyword:
// 	case compiler.SyntaxKindBigIntKeyword:
// 	case compiler.SyntaxKindOverrideKeyword:
// 	case compiler.SyntaxKindOfKeyword: // LastKeyword and LastToken and LastContextualKeyword
// 	case compiler.SyntaxKindQualifiedName:
// 	case compiler.SyntaxKindComputedPropertyName:
// 	case compiler.SyntaxKindModifierList:
// 	case compiler.SyntaxKindTypeParameterList:
// 	case compiler.SyntaxKindTypeArgumentList:
// 	case compiler.SyntaxKindTypeParameter:
// 	case compiler.SyntaxKindParameter:
// 	case compiler.SyntaxKindDecorator:
// 	case compiler.SyntaxKindPropertySignature:
// 	case compiler.SyntaxKindPropertyDeclaration:
// 	case compiler.SyntaxKindMethodSignature:
// 	case compiler.SyntaxKindMethodDeclaration:
// 	case compiler.SyntaxKindClassStaticBlockDeclaration:
// 	case compiler.SyntaxKindConstructor:
// 	case compiler.SyntaxKindGetAccessor:
// 	case compiler.SyntaxKindSetAccessor:
// 	case compiler.SyntaxKindCallSignature:
// 	case compiler.SyntaxKindConstructSignature:
// 	case compiler.SyntaxKindIndexSignature:
// 	case compiler.SyntaxKindTypePredicate:
// 	case compiler.SyntaxKindTypeReference:
// 	case compiler.SyntaxKindFunctionType:
// 	case compiler.SyntaxKindConstructorType:
// 	case compiler.SyntaxKindTypeQuery:
// 	case compiler.SyntaxKindTypeLiteral:
// 	case compiler.SyntaxKindArrayType:
// 	case compiler.SyntaxKindTupleType:
// 	case compiler.SyntaxKindOptionalType:
// 	case compiler.SyntaxKindRestType:
// 	case compiler.SyntaxKindUnionType:
// 	case compiler.SyntaxKindIntersectionType:
// 	case compiler.SyntaxKindConditionalType:
// 	case compiler.SyntaxKindInferType:
// 	case compiler.SyntaxKindParenthesizedType:
// 	case compiler.SyntaxKindThisType:
// 	case compiler.SyntaxKindTypeOperator:
// 	case compiler.SyntaxKindIndexedAccessType:
// 	case compiler.SyntaxKindMappedType:
// 	case compiler.SyntaxKindLiteralType:
// 	case compiler.SyntaxKindNamedTupleMember:
// 	case compiler.SyntaxKindTemplateLiteralType:
// 	case compiler.SyntaxKindTemplateLiteralTypeSpan:
// 	case compiler.SyntaxKindImportType:
// 	case compiler.SyntaxKindObjectBindingPattern:
// 	case compiler.SyntaxKindArrayBindingPattern:
// 	case compiler.SyntaxKindBindingElement:
// 	case compiler.SyntaxKindArrayLiteralExpression:
// 	case compiler.SyntaxKindObjectLiteralExpression:
// 	case compiler.SyntaxKindPropertyAccessExpression:
// 	case compiler.SyntaxKindElementAccessExpression:
// 	case compiler.SyntaxKindCallExpression:
// 	case compiler.SyntaxKindNewExpression:
// 	case compiler.SyntaxKindTaggedTemplateExpression:
// 	case compiler.SyntaxKindTypeAssertionExpression:
// 	case compiler.SyntaxKindParenthesizedExpression:
// 	case compiler.SyntaxKindFunctionExpression:
// 	case compiler.SyntaxKindArrowFunction:
// 	case compiler.SyntaxKindDeleteExpression:
// 	case compiler.SyntaxKindTypeOfExpression:
// 	case compiler.SyntaxKindVoidExpression:
// 	case compiler.SyntaxKindAwaitExpression:
// 	case compiler.SyntaxKindPrefixUnaryExpression:
// 	case compiler.SyntaxKindPostfixUnaryExpression:
// 	case compiler.SyntaxKindBinaryExpression:
// 	case compiler.SyntaxKindConditionalExpression:
// 	case compiler.SyntaxKindTemplateExpression:
// 	case compiler.SyntaxKindYieldExpression:
// 	case compiler.SyntaxKindSpreadElement:
// 	case compiler.SyntaxKindClassExpression:
// 	case compiler.SyntaxKindOmittedExpression:
// 	case compiler.SyntaxKindExpressionWithTypeArguments:
// 	case compiler.SyntaxKindAsExpression:
// 	case compiler.SyntaxKindNonNullExpression:
// 	case compiler.SyntaxKindMetaProperty:
// 	case compiler.SyntaxKindSyntheticExpression:
// 	case compiler.SyntaxKindSatisfiesExpression:
// 	case compiler.SyntaxKindTemplateSpan:
// 	case compiler.SyntaxKindSemicolonClassElement:
// 	case compiler.SyntaxKindBlock:
// 	case compiler.SyntaxKindEmptyStatement:
// 	case compiler.SyntaxKindVariableStatement:
// 	case compiler.SyntaxKindExpressionStatement:
// 	case compiler.SyntaxKindIfStatement:
// 	case compiler.SyntaxKindDoStatement:
// 	case compiler.SyntaxKindWhileStatement:
// 	case compiler.SyntaxKindForStatement:
// 	case compiler.SyntaxKindForInStatement:
// 	case compiler.SyntaxKindForOfStatement:
// 	case compiler.SyntaxKindContinueStatement:
// 	case compiler.SyntaxKindBreakStatement:
// 	case compiler.SyntaxKindReturnStatement:
// 	case compiler.SyntaxKindWithStatement:
// 	case compiler.SyntaxKindSwitchStatement:
// 	case compiler.SyntaxKindLabeledStatement:
// 	case compiler.SyntaxKindThrowStatement:
// 	case compiler.SyntaxKindTryStatement:
// 	case compiler.SyntaxKindDebuggerStatement:
// 	case compiler.SyntaxKindVariableDeclaration:
// 	case compiler.SyntaxKindVariableDeclarationList:
// 	case compiler.SyntaxKindFunctionDeclaration:
// 	case compiler.SyntaxKindClassDeclaration:
// 	case compiler.SyntaxKindInterfaceDeclaration:
// 	case compiler.SyntaxKindTypeAliasDeclaration:
// 	case compiler.SyntaxKindEnumDeclaration:
// 	case compiler.SyntaxKindModuleDeclaration:
// 	case compiler.SyntaxKindModuleBlock:
// 	case compiler.SyntaxKindCaseBlock:
// 	case compiler.SyntaxKindNamespaceExportDeclaration:
// 	case compiler.SyntaxKindImportEqualsDeclaration:
// 	case compiler.SyntaxKindImportDeclaration:
// 	case compiler.SyntaxKindImportClause:
// 	case compiler.SyntaxKindNamespaceImport:
// 	case compiler.SyntaxKindNamedImports:
// 	case compiler.SyntaxKindImportSpecifier:
// 	case compiler.SyntaxKindExportAssignment:
// 	case compiler.SyntaxKindExportDeclaration:
// 	case compiler.SyntaxKindNamedExports:
// 	case compiler.SyntaxKindNamespaceExport:
// 	case compiler.SyntaxKindExportSpecifier:
// 	case compiler.SyntaxKindMissingDeclaration:
// 	case compiler.SyntaxKindExternalModuleReference:
// 	case compiler.SyntaxKindJsxElement:
// 	case compiler.SyntaxKindJsxSelfClosingElement:
// 	case compiler.SyntaxKindJsxOpeningElement:
// 	case compiler.SyntaxKindJsxClosingElement:
// 	case compiler.SyntaxKindJsxFragment:
// 	case compiler.SyntaxKindJsxOpeningFragment:
// 	case compiler.SyntaxKindJsxClosingFragment:
// 	case compiler.SyntaxKindJsxAttribute:
// 	case compiler.SyntaxKindJsxAttributes:
// 	case compiler.SyntaxKindJsxSpreadAttribute:
// 	case compiler.SyntaxKindJsxExpression:
// 	case compiler.SyntaxKindJsxNamespacedName:
// 	case compiler.SyntaxKindCaseClause:
// 	case compiler.SyntaxKindDefaultClause:
// 	case compiler.SyntaxKindHeritageClause:
// 	case compiler.SyntaxKindCatchClause:
// 	case compiler.SyntaxKindImportAttributes:
// 	case compiler.SyntaxKindImportAttribute:
// 	case compiler.SyntaxKindPropertyAssignment:
// 	case compiler.SyntaxKindShorthandPropertyAssignment:
// 	case compiler.SyntaxKindSpreadAssignment:
// 	case compiler.SyntaxKindEnumMember:
// 	case compiler.SyntaxKindSourceFile:
// 		// for i, statement := range node.AsSourceFile().Statements {
// 		// 	if i != 0 {
// 		// 		writer.writeLine()
// 		// 	}
// 		// 	printNode(statement, writer)
// 		// }
// 	case compiler.SyntaxKindBundle:
// 	case compiler.SyntaxKindJSDocTypeExpression:
// 	case compiler.SyntaxKindJSDocNameReference:
// 	case compiler.SyntaxKindJSDocMemberName: // C#p
// 	case compiler.SyntaxKindJSDocAllType: // The * type
// 	case compiler.SyntaxKindJSDocUnknownType: // The ? type
// 	case compiler.SyntaxKindJSDocNullableType:
// 	case compiler.SyntaxKindJSDocNonNullableType:
// 	case compiler.SyntaxKindJSDocOptionalType:
// 	case compiler.SyntaxKindJSDocFunctionType:
// 	case compiler.SyntaxKindJSDocVariadicType:
// 	case compiler.SyntaxKindJSDocNamepathType: // https://jsdoc.app/about-namepaths.html
// 	case compiler.SyntaxKindJSDoc:
// 	case compiler.SyntaxKindJSDocText:
// 	case compiler.SyntaxKindJSDocTypeLiteral:
// 	case compiler.SyntaxKindJSDocSignature:
// 	case compiler.SyntaxKindJSDocLink:
// 	case compiler.SyntaxKindJSDocLinkCode:
// 	case compiler.SyntaxKindJSDocLinkPlain:
// 	case compiler.SyntaxKindJSDocTag:
// 	case compiler.SyntaxKindJSDocAugmentsTag:
// 	case compiler.SyntaxKindJSDocImplementsTag:
// 	case compiler.SyntaxKindJSDocAuthorTag:
// 	case compiler.SyntaxKindJSDocDeprecatedTag:
// 	case compiler.SyntaxKindJSDocImmediateTag:
// 	case compiler.SyntaxKindJSDocClassTag:
// 	case compiler.SyntaxKindJSDocPublicTag:
// 	case compiler.SyntaxKindJSDocPrivateTag:
// 	case compiler.SyntaxKindJSDocProtectedTag:
// 	case compiler.SyntaxKindJSDocReadonlyTag:
// 	case compiler.SyntaxKindJSDocOverrideTag:
// 	case compiler.SyntaxKindJSDocCallbackTag:
// 	case compiler.SyntaxKindJSDocOverloadTag:
// 	case compiler.SyntaxKindJSDocEnumTag:
// 	case compiler.SyntaxKindJSDocParameterTag:
// 	case compiler.SyntaxKindJSDocReturnTag:
// 	case compiler.SyntaxKindJSDocThisTag:
// 	case compiler.SyntaxKindJSDocTypeTag:
// 	case compiler.SyntaxKindJSDocTemplateTag:
// 	case compiler.SyntaxKindJSDocTypedefTag:
// 	case compiler.SyntaxKindJSDocSeeTag:
// 	case compiler.SyntaxKindJSDocPropertyTag:
// 	case compiler.SyntaxKindJSDocThrowsTag:
// 	case compiler.SyntaxKindJSDocSatisfiesTag:
// 	case compiler.SyntaxKindJSDocImportTag:
// 	case compiler.SyntaxKindSyntaxList:
// 	case compiler.SyntaxKindNotEmittedStatement:
// 	case compiler.SyntaxKindPartiallyEmittedExpression:
// 	case compiler.SyntaxKindCommaListExpression:
// 	case compiler.SyntaxKindSyntheticReferenceExpression:
// 	default:
// 		panic("Node kind not implemented in printer")
// 	}
// }
