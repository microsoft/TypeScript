package ast

//go:generate go tool golang.org/x/tools/cmd/stringer -type=Kind -output=kind_stringer_generated.go

type Kind int16

const (
	KindUnknown Kind = iota
	KindEndOfFile
	KindSingleLineCommentTrivia
	KindMultiLineCommentTrivia
	KindNewLineTrivia
	KindWhitespaceTrivia
	KindConflictMarkerTrivia
	KindNonTextFileMarkerTrivia
	KindNumericLiteral
	KindBigIntLiteral
	KindStringLiteral
	KindJsxText
	KindJsxTextAllWhiteSpaces
	KindRegularExpressionLiteral
	KindNoSubstitutionTemplateLiteral
	// Pseudo-literals
	KindTemplateHead
	KindTemplateMiddle
	KindTemplateTail
	// Punctuation
	KindOpenBraceToken
	KindCloseBraceToken
	KindOpenParenToken
	KindCloseParenToken
	KindOpenBracketToken
	KindCloseBracketToken
	KindDotToken
	KindDotDotDotToken
	KindSemicolonToken
	KindCommaToken
	KindQuestionDotToken
	KindLessThanToken
	KindLessThanSlashToken
	KindGreaterThanToken
	KindLessThanEqualsToken
	KindGreaterThanEqualsToken
	KindEqualsEqualsToken
	KindExclamationEqualsToken
	KindEqualsEqualsEqualsToken
	KindExclamationEqualsEqualsToken
	KindEqualsGreaterThanToken
	KindPlusToken
	KindMinusToken
	KindAsteriskToken
	KindAsteriskAsteriskToken
	KindSlashToken
	KindPercentToken
	KindPlusPlusToken
	KindMinusMinusToken
	KindLessThanLessThanToken
	KindGreaterThanGreaterThanToken
	KindGreaterThanGreaterThanGreaterThanToken
	KindAmpersandToken
	KindBarToken
	KindCaretToken
	KindExclamationToken
	KindTildeToken
	KindAmpersandAmpersandToken
	KindBarBarToken
	KindQuestionToken
	KindColonToken
	KindAtToken
	KindQuestionQuestionToken
	/** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
	KindBacktickToken
	/** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
	KindHashToken
	// Assignments
	KindEqualsToken
	KindPlusEqualsToken
	KindMinusEqualsToken
	KindAsteriskEqualsToken
	KindAsteriskAsteriskEqualsToken
	KindSlashEqualsToken
	KindPercentEqualsToken
	KindLessThanLessThanEqualsToken
	KindGreaterThanGreaterThanEqualsToken
	KindGreaterThanGreaterThanGreaterThanEqualsToken
	KindAmpersandEqualsToken
	KindBarEqualsToken
	KindBarBarEqualsToken
	KindAmpersandAmpersandEqualsToken
	KindQuestionQuestionEqualsToken
	KindCaretEqualsToken
	// Identifiers and PrivateIdentifier
	KindIdentifier
	KindPrivateIdentifier
	KindJSDocCommentTextToken
	// Reserved words
	KindBreakKeyword
	KindCaseKeyword
	KindCatchKeyword
	KindClassKeyword
	KindConstKeyword
	KindContinueKeyword
	KindDebuggerKeyword
	KindDefaultKeyword
	KindDeleteKeyword
	KindDoKeyword
	KindElseKeyword
	KindEnumKeyword
	KindExportKeyword
	KindExtendsKeyword
	KindFalseKeyword
	KindFinallyKeyword
	KindForKeyword
	KindFunctionKeyword
	KindIfKeyword
	KindImportKeyword
	KindInKeyword
	KindInstanceOfKeyword
	KindNewKeyword
	KindNullKeyword
	KindReturnKeyword
	KindSuperKeyword
	KindSwitchKeyword
	KindThisKeyword
	KindThrowKeyword
	KindTrueKeyword
	KindTryKeyword
	KindTypeOfKeyword
	KindVarKeyword
	KindVoidKeyword
	KindWhileKeyword
	KindWithKeyword
	// Strict mode reserved words
	KindImplementsKeyword
	KindInterfaceKeyword
	KindLetKeyword
	KindPackageKeyword
	KindPrivateKeyword
	KindProtectedKeyword
	KindPublicKeyword
	KindStaticKeyword
	KindYieldKeyword
	// Contextual keywords
	KindAbstractKeyword
	KindAccessorKeyword
	KindAsKeyword
	KindAssertsKeyword
	KindAssertKeyword
	KindAnyKeyword
	KindAsyncKeyword
	KindAwaitKeyword
	KindBooleanKeyword
	KindConstructorKeyword
	KindDeclareKeyword
	KindGetKeyword
	KindImmediateKeyword
	KindInferKeyword
	KindIntrinsicKeyword
	KindIsKeyword
	KindKeyOfKeyword
	KindModuleKeyword
	KindNamespaceKeyword
	KindNeverKeyword
	KindOutKeyword
	KindReadonlyKeyword
	KindRequireKeyword
	KindNumberKeyword
	KindObjectKeyword
	KindSatisfiesKeyword
	KindSetKeyword
	KindStringKeyword
	KindSymbolKeyword
	KindTypeKeyword
	KindUndefinedKeyword
	KindUniqueKeyword
	KindUnknownKeyword
	KindUsingKeyword
	KindFromKeyword
	KindGlobalKeyword
	KindBigIntKeyword
	KindOverrideKeyword
	KindOfKeyword // LastKeyword and LastToken and LastContextualKeyword
	// Parse tree nodes
	// Names
	KindQualifiedName
	KindComputedPropertyName
	// Signature elements
	KindTypeParameter
	KindParameter
	KindDecorator
	// TypeMember
	KindPropertySignature
	KindPropertyDeclaration
	KindMethodSignature
	KindMethodDeclaration
	KindClassStaticBlockDeclaration
	KindConstructor
	KindGetAccessor
	KindSetAccessor
	KindCallSignature
	KindConstructSignature
	KindIndexSignature
	// Type
	KindTypePredicate
	KindTypeReference
	KindFunctionType
	KindConstructorType
	KindTypeQuery
	KindTypeLiteral
	KindArrayType
	KindTupleType
	KindOptionalType
	KindRestType
	KindUnionType
	KindIntersectionType
	KindConditionalType
	KindInferType
	KindParenthesizedType
	KindThisType
	KindTypeOperator
	KindIndexedAccessType
	KindMappedType
	KindLiteralType
	KindNamedTupleMember
	KindTemplateLiteralType
	KindTemplateLiteralTypeSpan
	KindImportType
	// Binding patterns
	KindObjectBindingPattern
	KindArrayBindingPattern
	KindBindingElement
	// Expression
	KindArrayLiteralExpression
	KindObjectLiteralExpression
	KindPropertyAccessExpression
	KindElementAccessExpression
	KindCallExpression
	KindNewExpression
	KindTaggedTemplateExpression
	KindTypeAssertionExpression
	KindParenthesizedExpression
	KindFunctionExpression
	KindArrowFunction
	KindDeleteExpression
	KindTypeOfExpression
	KindVoidExpression
	KindAwaitExpression
	KindPrefixUnaryExpression
	KindPostfixUnaryExpression
	KindBinaryExpression
	KindConditionalExpression
	KindTemplateExpression
	KindYieldExpression
	KindSpreadElement
	KindClassExpression
	KindOmittedExpression
	KindExpressionWithTypeArguments
	KindAsExpression
	KindNonNullExpression
	KindMetaProperty
	KindSyntheticExpression
	KindSatisfiesExpression
	// Misc
	KindTemplateSpan
	KindSemicolonClassElement
	// Element
	KindBlock
	KindEmptyStatement
	KindVariableStatement
	KindExpressionStatement
	KindIfStatement
	KindDoStatement
	KindWhileStatement
	KindForStatement
	KindForInStatement
	KindForOfStatement
	KindContinueStatement
	KindBreakStatement
	KindReturnStatement
	KindWithStatement
	KindSwitchStatement
	KindLabeledStatement
	KindThrowStatement
	KindTryStatement
	KindDebuggerStatement
	KindVariableDeclaration
	KindVariableDeclarationList
	KindFunctionDeclaration
	KindClassDeclaration
	KindInterfaceDeclaration
	KindTypeAliasDeclaration
	KindEnumDeclaration
	KindModuleDeclaration
	KindModuleBlock
	KindCaseBlock
	KindNamespaceExportDeclaration
	KindImportEqualsDeclaration
	KindImportDeclaration
	KindImportClause
	KindNamespaceImport
	KindNamedImports
	KindImportSpecifier
	KindExportAssignment
	KindExportDeclaration
	KindNamedExports
	KindNamespaceExport
	KindExportSpecifier
	KindMissingDeclaration
	// Module references
	KindExternalModuleReference
	// JSX
	KindJsxElement
	KindJsxSelfClosingElement
	KindJsxOpeningElement
	KindJsxClosingElement
	KindJsxFragment
	KindJsxOpeningFragment
	KindJsxClosingFragment
	KindJsxAttribute
	KindJsxAttributes
	KindJsxSpreadAttribute
	KindJsxExpression
	KindJsxNamespacedName
	// Clauses
	KindCaseClause
	KindDefaultClause
	KindHeritageClause
	KindCatchClause
	// Import attributes
	KindImportAttributes
	KindImportAttribute
	// Property assignments
	KindPropertyAssignment
	KindShorthandPropertyAssignment
	KindSpreadAssignment
	// Enum
	KindEnumMember
	// Top-level nodes
	KindSourceFile
	KindBundle
	// JSDoc nodes
	KindJSDocTypeExpression
	KindJSDocNameReference
	KindJSDocMemberName // C#p
	KindJSDocAllType    // The * type
	KindJSDocNullableType
	KindJSDocNonNullableType
	KindJSDocOptionalType
	KindJSDocVariadicType
	KindJSDoc
	KindJSDocText
	KindJSDocTypeLiteral
	KindJSDocSignature
	KindJSDocLink
	KindJSDocLinkCode
	KindJSDocLinkPlain
	KindJSDocTag
	KindJSDocAugmentsTag
	KindJSDocImplementsTag
	KindJSDocDeprecatedTag
	KindJSDocPublicTag
	KindJSDocPrivateTag
	KindJSDocProtectedTag
	KindJSDocReadonlyTag
	KindJSDocOverrideTag
	KindJSDocCallbackTag
	KindJSDocOverloadTag
	KindJSDocParameterTag
	KindJSDocReturnTag
	KindJSDocThisTag
	KindJSDocTypeTag
	KindJSDocTemplateTag
	KindJSDocTypedefTag
	KindJSDocSeeTag
	KindJSDocPropertyTag
	KindJSDocSatisfiesTag
	KindJSDocImportTag
	// Synthesized list
	KindSyntaxList
	// Reparsed JS nodes
	KindJSTypeAliasDeclaration
	KindJSExportAssignment
	KindCommonJSExport
	KindJSImportDeclaration
	// Transformation nodes
	KindNotEmittedStatement
	KindPartiallyEmittedExpression
	KindCommaListExpression
	KindSyntheticReferenceExpression
	// Enum value count
	KindCount
	// Markers
	KindFirstAssignment         = KindEqualsToken
	KindLastAssignment          = KindCaretEqualsToken
	KindFirstCompoundAssignment = KindPlusEqualsToken
	KindLastCompoundAssignment  = KindCaretEqualsToken
	KindFirstReservedWord       = KindBreakKeyword
	KindLastReservedWord        = KindWithKeyword
	KindFirstKeyword            = KindBreakKeyword
	KindLastKeyword             = KindOfKeyword
	KindFirstFutureReservedWord = KindImplementsKeyword
	KindLastFutureReservedWord  = KindYieldKeyword
	KindFirstTypeNode           = KindTypePredicate
	KindLastTypeNode            = KindImportType
	KindFirstPunctuation        = KindOpenBraceToken
	KindLastPunctuation         = KindCaretEqualsToken
	KindFirstToken              = KindUnknown
	KindLastToken               = KindLastKeyword
	KindFirstLiteralToken       = KindNumericLiteral
	KindLastLiteralToken        = KindNoSubstitutionTemplateLiteral
	KindFirstTemplateToken      = KindNoSubstitutionTemplateLiteral
	KindLastTemplateToken       = KindTemplateTail
	KindFirstBinaryOperator     = KindLessThanToken
	KindLastBinaryOperator      = KindCaretEqualsToken
	KindFirstStatement          = KindVariableStatement
	KindLastStatement           = KindDebuggerStatement
	KindFirstNode               = KindQualifiedName
	KindFirstJSDocNode          = KindJSDocTypeExpression
	KindLastJSDocNode           = KindJSDocImportTag
	KindFirstJSDocTagNode       = KindJSDocTag
	KindLastJSDocTagNode        = KindJSDocImportTag
	KindFirstContextualKeyword  = KindAbstractKeyword
	KindLastContextualKeyword   = KindOfKeyword
	KindComment                 = KindSingleLineCommentTrivia | KindMultiLineCommentTrivia
)
