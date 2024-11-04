package compiler

import "slices"

//go:generate go run golang.org/x/tools/cmd/stringer -type=LanguageVariant,ModuleResolutionKind,ScriptKind,ScriptTarget,SignatureKind,SyntaxKind,Tristate -output=stringer_generated.go

type SyntaxKind int16

const (
	SyntaxKindUnknown SyntaxKind = iota
	SyntaxKindEndOfFile
	SyntaxKindConflictMarkerTrivia
	SyntaxKindNonTextFileMarkerTrivia
	SyntaxKindNumericLiteral
	SyntaxKindBigIntLiteral
	SyntaxKindStringLiteral
	SyntaxKindJsxText
	SyntaxKindJsxTextAllWhiteSpaces
	SyntaxKindRegularExpressionLiteral
	SyntaxKindNoSubstitutionTemplateLiteral
	// Pseudo-literals
	SyntaxKindTemplateHead
	SyntaxKindTemplateMiddle
	SyntaxKindTemplateTail
	// Punctuation
	SyntaxKindOpenBraceToken
	SyntaxKindCloseBraceToken
	SyntaxKindOpenParenToken
	SyntaxKindCloseParenToken
	SyntaxKindOpenBracketToken
	SyntaxKindCloseBracketToken
	SyntaxKindDotToken
	SyntaxKindDotDotDotToken
	SyntaxKindSemicolonToken
	SyntaxKindCommaToken
	SyntaxKindQuestionDotToken
	SyntaxKindLessThanToken
	SyntaxKindLessThanSlashToken
	SyntaxKindGreaterThanToken
	SyntaxKindLessThanEqualsToken
	SyntaxKindGreaterThanEqualsToken
	SyntaxKindEqualsEqualsToken
	SyntaxKindExclamationEqualsToken
	SyntaxKindEqualsEqualsEqualsToken
	SyntaxKindExclamationEqualsEqualsToken
	SyntaxKindEqualsGreaterThanToken
	SyntaxKindPlusToken
	SyntaxKindMinusToken
	SyntaxKindAsteriskToken
	SyntaxKindAsteriskAsteriskToken
	SyntaxKindSlashToken
	SyntaxKindPercentToken
	SyntaxKindPlusPlusToken
	SyntaxKindMinusMinusToken
	SyntaxKindLessThanLessThanToken
	SyntaxKindGreaterThanGreaterThanToken
	SyntaxKindGreaterThanGreaterThanGreaterThanToken
	SyntaxKindAmpersandToken
	SyntaxKindBarToken
	SyntaxKindCaretToken
	SyntaxKindExclamationToken
	SyntaxKindTildeToken
	SyntaxKindAmpersandAmpersandToken
	SyntaxKindBarBarToken
	SyntaxKindQuestionToken
	SyntaxKindColonToken
	SyntaxKindAtToken
	SyntaxKindQuestionQuestionToken
	/** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
	SyntaxKindBacktickToken
	/** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
	SyntaxKindHashToken
	// Assignments
	SyntaxKindEqualsToken
	SyntaxKindPlusEqualsToken
	SyntaxKindMinusEqualsToken
	SyntaxKindAsteriskEqualsToken
	SyntaxKindAsteriskAsteriskEqualsToken
	SyntaxKindSlashEqualsToken
	SyntaxKindPercentEqualsToken
	SyntaxKindLessThanLessThanEqualsToken
	SyntaxKindGreaterThanGreaterThanEqualsToken
	SyntaxKindGreaterThanGreaterThanGreaterThanEqualsToken
	SyntaxKindAmpersandEqualsToken
	SyntaxKindBarEqualsToken
	SyntaxKindBarBarEqualsToken
	SyntaxKindAmpersandAmpersandEqualsToken
	SyntaxKindQuestionQuestionEqualsToken
	SyntaxKindCaretEqualsToken
	// Identifiers and PrivateIdentifier
	SyntaxKindIdentifier
	SyntaxKindPrivateIdentifier
	SyntaxKindJSDocCommentTextToken
	// Reserved words
	SyntaxKindBreakKeyword
	SyntaxKindCaseKeyword
	SyntaxKindCatchKeyword
	SyntaxKindClassKeyword
	SyntaxKindConstKeyword
	SyntaxKindContinueKeyword
	SyntaxKindDebuggerKeyword
	SyntaxKindDefaultKeyword
	SyntaxKindDeleteKeyword
	SyntaxKindDoKeyword
	SyntaxKindElseKeyword
	SyntaxKindEnumKeyword
	SyntaxKindExportKeyword
	SyntaxKindExtendsKeyword
	SyntaxKindFalseKeyword
	SyntaxKindFinallyKeyword
	SyntaxKindForKeyword
	SyntaxKindFunctionKeyword
	SyntaxKindIfKeyword
	SyntaxKindImportKeyword
	SyntaxKindInKeyword
	SyntaxKindInstanceOfKeyword
	SyntaxKindNewKeyword
	SyntaxKindNullKeyword
	SyntaxKindReturnKeyword
	SyntaxKindSuperKeyword
	SyntaxKindSwitchKeyword
	SyntaxKindThisKeyword
	SyntaxKindThrowKeyword
	SyntaxKindTrueKeyword
	SyntaxKindTryKeyword
	SyntaxKindTypeOfKeyword
	SyntaxKindVarKeyword
	SyntaxKindVoidKeyword
	SyntaxKindWhileKeyword
	SyntaxKindWithKeyword
	// Strict mode reserved words
	SyntaxKindImplementsKeyword
	SyntaxKindInterfaceKeyword
	SyntaxKindLetKeyword
	SyntaxKindPackageKeyword
	SyntaxKindPrivateKeyword
	SyntaxKindProtectedKeyword
	SyntaxKindPublicKeyword
	SyntaxKindStaticKeyword
	SyntaxKindYieldKeyword
	// Contextual keywords
	SyntaxKindAbstractKeyword
	SyntaxKindAccessorKeyword
	SyntaxKindAsKeyword
	SyntaxKindAssertsKeyword
	SyntaxKindAssertKeyword
	SyntaxKindAnyKeyword
	SyntaxKindAsyncKeyword
	SyntaxKindAwaitKeyword
	SyntaxKindBooleanKeyword
	SyntaxKindConstructorKeyword
	SyntaxKindDeclareKeyword
	SyntaxKindGetKeyword
	SyntaxKindImmediateKeyword
	SyntaxKindInferKeyword
	SyntaxKindIntrinsicKeyword
	SyntaxKindIsKeyword
	SyntaxKindKeyOfKeyword
	SyntaxKindModuleKeyword
	SyntaxKindNamespaceKeyword
	SyntaxKindNeverKeyword
	SyntaxKindOutKeyword
	SyntaxKindReadonlyKeyword
	SyntaxKindRequireKeyword
	SyntaxKindNumberKeyword
	SyntaxKindObjectKeyword
	SyntaxKindSatisfiesKeyword
	SyntaxKindSetKeyword
	SyntaxKindStringKeyword
	SyntaxKindSymbolKeyword
	SyntaxKindTypeKeyword
	SyntaxKindUndefinedKeyword
	SyntaxKindUniqueKeyword
	SyntaxKindUnknownKeyword
	SyntaxKindUsingKeyword
	SyntaxKindFromKeyword
	SyntaxKindGlobalKeyword
	SyntaxKindBigIntKeyword
	SyntaxKindOverrideKeyword
	SyntaxKindOfKeyword // LastKeyword and LastToken and LastContextualKeyword
	// Parse tree nodes
	// Names
	SyntaxKindQualifiedName
	SyntaxKindComputedPropertyName
	// Lists
	SyntaxKindModifierList
	SyntaxKindTypeParameterList
	SyntaxKindTypeArgumentList
	// Signature elements
	SyntaxKindTypeParameter
	SyntaxKindParameter
	SyntaxKindDecorator
	// TypeMember
	SyntaxKindPropertySignature
	SyntaxKindPropertyDeclaration
	SyntaxKindMethodSignature
	SyntaxKindMethodDeclaration
	SyntaxKindClassStaticBlockDeclaration
	SyntaxKindConstructor
	SyntaxKindGetAccessor
	SyntaxKindSetAccessor
	SyntaxKindCallSignature
	SyntaxKindConstructSignature
	SyntaxKindIndexSignature
	// Type
	SyntaxKindTypePredicate
	SyntaxKindTypeReference
	SyntaxKindFunctionType
	SyntaxKindConstructorType
	SyntaxKindTypeQuery
	SyntaxKindTypeLiteral
	SyntaxKindArrayType
	SyntaxKindTupleType
	SyntaxKindOptionalType
	SyntaxKindRestType
	SyntaxKindUnionType
	SyntaxKindIntersectionType
	SyntaxKindConditionalType
	SyntaxKindInferType
	SyntaxKindParenthesizedType
	SyntaxKindThisType
	SyntaxKindTypeOperator
	SyntaxKindIndexedAccessType
	SyntaxKindMappedType
	SyntaxKindLiteralType
	SyntaxKindNamedTupleMember
	SyntaxKindTemplateLiteralType
	SyntaxKindTemplateLiteralTypeSpan
	SyntaxKindImportType
	// Binding patterns
	SyntaxKindObjectBindingPattern
	SyntaxKindArrayBindingPattern
	SyntaxKindBindingElement
	// Expression
	SyntaxKindArrayLiteralExpression
	SyntaxKindObjectLiteralExpression
	SyntaxKindPropertyAccessExpression
	SyntaxKindElementAccessExpression
	SyntaxKindCallExpression
	SyntaxKindNewExpression
	SyntaxKindTaggedTemplateExpression
	SyntaxKindTypeAssertionExpression
	SyntaxKindParenthesizedExpression
	SyntaxKindFunctionExpression
	SyntaxKindArrowFunction
	SyntaxKindDeleteExpression
	SyntaxKindTypeOfExpression
	SyntaxKindVoidExpression
	SyntaxKindAwaitExpression
	SyntaxKindPrefixUnaryExpression
	SyntaxKindPostfixUnaryExpression
	SyntaxKindBinaryExpression
	SyntaxKindConditionalExpression
	SyntaxKindTemplateExpression
	SyntaxKindYieldExpression
	SyntaxKindSpreadElement
	SyntaxKindClassExpression
	SyntaxKindOmittedExpression
	SyntaxKindExpressionWithTypeArguments
	SyntaxKindAsExpression
	SyntaxKindNonNullExpression
	SyntaxKindMetaProperty
	SyntaxKindSyntheticExpression
	SyntaxKindSatisfiesExpression
	// Misc
	SyntaxKindTemplateSpan
	SyntaxKindSemicolonClassElement
	// Element
	SyntaxKindBlock
	SyntaxKindEmptyStatement
	SyntaxKindVariableStatement
	SyntaxKindExpressionStatement
	SyntaxKindIfStatement
	SyntaxKindDoStatement
	SyntaxKindWhileStatement
	SyntaxKindForStatement
	SyntaxKindForInStatement
	SyntaxKindForOfStatement
	SyntaxKindContinueStatement
	SyntaxKindBreakStatement
	SyntaxKindReturnStatement
	SyntaxKindWithStatement
	SyntaxKindSwitchStatement
	SyntaxKindLabeledStatement
	SyntaxKindThrowStatement
	SyntaxKindTryStatement
	SyntaxKindDebuggerStatement
	SyntaxKindVariableDeclaration
	SyntaxKindVariableDeclarationList
	SyntaxKindFunctionDeclaration
	SyntaxKindClassDeclaration
	SyntaxKindInterfaceDeclaration
	SyntaxKindTypeAliasDeclaration
	SyntaxKindEnumDeclaration
	SyntaxKindModuleDeclaration
	SyntaxKindModuleBlock
	SyntaxKindCaseBlock
	SyntaxKindNamespaceExportDeclaration
	SyntaxKindImportEqualsDeclaration
	SyntaxKindImportDeclaration
	SyntaxKindImportClause
	SyntaxKindNamespaceImport
	SyntaxKindNamedImports
	SyntaxKindImportSpecifier
	SyntaxKindExportAssignment
	SyntaxKindExportDeclaration
	SyntaxKindNamedExports
	SyntaxKindNamespaceExport
	SyntaxKindExportSpecifier
	SyntaxKindMissingDeclaration
	// Module references
	SyntaxKindExternalModuleReference
	// JSX
	SyntaxKindJsxElement
	SyntaxKindJsxSelfClosingElement
	SyntaxKindJsxOpeningElement
	SyntaxKindJsxClosingElement
	SyntaxKindJsxFragment
	SyntaxKindJsxOpeningFragment
	SyntaxKindJsxClosingFragment
	SyntaxKindJsxAttribute
	SyntaxKindJsxAttributes
	SyntaxKindJsxSpreadAttribute
	SyntaxKindJsxExpression
	SyntaxKindJsxNamespacedName
	// Clauses
	SyntaxKindCaseClause
	SyntaxKindDefaultClause
	SyntaxKindHeritageClause
	SyntaxKindCatchClause
	// Import attributes
	SyntaxKindImportAttributes
	SyntaxKindImportAttribute
	// Property assignments
	SyntaxKindPropertyAssignment
	SyntaxKindShorthandPropertyAssignment
	SyntaxKindSpreadAssignment
	// Enum
	SyntaxKindEnumMember
	// Top-level nodes
	SyntaxKindSourceFile
	SyntaxKindBundle
	// JSDoc nodes
	SyntaxKindJSDocTypeExpression
	SyntaxKindJSDocNameReference
	SyntaxKindJSDocMemberName  // C#p
	SyntaxKindJSDocAllType     // The * type
	SyntaxKindJSDocUnknownType // The ? type
	SyntaxKindJSDocNullableType
	SyntaxKindJSDocNonNullableType
	SyntaxKindJSDocOptionalType
	SyntaxKindJSDocFunctionType
	SyntaxKindJSDocVariadicType
	SyntaxKindJSDocNamepathType // https://jsdoc.app/about-namepaths.html
	SyntaxKindJSDoc
	SyntaxKindJSDocText
	SyntaxKindJSDocTypeLiteral
	SyntaxKindJSDocSignature
	SyntaxKindJSDocLink
	SyntaxKindJSDocLinkCode
	SyntaxKindJSDocLinkPlain
	SyntaxKindJSDocTag
	SyntaxKindJSDocAugmentsTag
	SyntaxKindJSDocImplementsTag
	SyntaxKindJSDocAuthorTag
	SyntaxKindJSDocDeprecatedTag
	SyntaxKindJSDocImmediateTag
	SyntaxKindJSDocClassTag
	SyntaxKindJSDocPublicTag
	SyntaxKindJSDocPrivateTag
	SyntaxKindJSDocProtectedTag
	SyntaxKindJSDocReadonlyTag
	SyntaxKindJSDocOverrideTag
	SyntaxKindJSDocCallbackTag
	SyntaxKindJSDocOverloadTag
	SyntaxKindJSDocEnumTag
	SyntaxKindJSDocParameterTag
	SyntaxKindJSDocReturnTag
	SyntaxKindJSDocThisTag
	SyntaxKindJSDocTypeTag
	SyntaxKindJSDocTemplateTag
	SyntaxKindJSDocTypedefTag
	SyntaxKindJSDocSeeTag
	SyntaxKindJSDocPropertyTag
	SyntaxKindJSDocThrowsTag
	SyntaxKindJSDocSatisfiesTag
	SyntaxKindJSDocImportTag
	// Synthesized list
	SyntaxKindSyntaxList
	// Transformation nodes
	SyntaxKindNotEmittedStatement
	SyntaxKindPartiallyEmittedExpression
	SyntaxKindCommaListExpression
	SyntaxKindSyntheticReferenceExpression
	// Enum value count
	SyntaxKindCount
	// Markers
	SyntaxKindFirstAssignment         = SyntaxKindEqualsToken
	SyntaxKindLastAssignment          = SyntaxKindCaretEqualsToken
	SyntaxKindFirstCompoundAssignment = SyntaxKindPlusEqualsToken
	SyntaxKindLastCompoundAssignment  = SyntaxKindCaretEqualsToken
	SyntaxKindFirstReservedWord       = SyntaxKindBreakKeyword
	SyntaxKindLastReservedWord        = SyntaxKindWithKeyword
	SyntaxKindFirstKeyword            = SyntaxKindBreakKeyword
	SyntaxKindLastKeyword             = SyntaxKindOfKeyword
	SyntaxKindFirstFutureReservedWord = SyntaxKindImplementsKeyword
	SyntaxKindLastFutureReservedWord  = SyntaxKindYieldKeyword
	SyntaxKindFirstTypeNode           = SyntaxKindTypePredicate
	SyntaxKindLastTypeNode            = SyntaxKindImportType
	SyntaxKindFirstPunctuation        = SyntaxKindOpenBraceToken
	SyntaxKindLastPunctuation         = SyntaxKindCaretEqualsToken
	SyntaxKindFirstToken              = SyntaxKindUnknown
	SyntaxKindLastToken               = SyntaxKindLastKeyword
	SyntaxKindFirstLiteralToken       = SyntaxKindNumericLiteral
	SyntaxKindLastLiteralToken        = SyntaxKindNoSubstitutionTemplateLiteral
	SyntaxKindFirstTemplateToken      = SyntaxKindNoSubstitutionTemplateLiteral
	SyntaxKindLastTemplateToken       = SyntaxKindTemplateTail
	SyntaxKindFirstBinaryOperator     = SyntaxKindLessThanToken
	SyntaxKindLastBinaryOperator      = SyntaxKindCaretEqualsToken
	SyntaxKindFirstStatement          = SyntaxKindVariableStatement
	SyntaxKindLastStatement           = SyntaxKindDebuggerStatement
	SyntaxKindFirstNode               = SyntaxKindQualifiedName
	SyntaxKindFirstJSDocNode          = SyntaxKindJSDocTypeExpression
	SyntaxKindLastJSDocNode           = SyntaxKindJSDocImportTag
	SyntaxKindFirstJSDocTagNode       = SyntaxKindJSDocTag
	SyntaxKindLastJSDocTagNode        = SyntaxKindJSDocImportTag
	SyntaxKindFirstContextualKeyword  = SyntaxKindAbstractKeyword
	SyntaxKindLastContextualKeyword   = SyntaxKindOfKeyword
)

type NodeFlags uint32

const (
	NodeFlagsNone                            NodeFlags = 0
	NodeFlagsLet                             NodeFlags = 1 << 0  // Variable declaration
	NodeFlagsConst                           NodeFlags = 1 << 1  // Variable declaration
	NodeFlagsUsing                           NodeFlags = 1 << 2  // Variable declaration
	NodeFlagsNestedNamespace                 NodeFlags = 1 << 3  // Namespace declaration
	NodeFlagsSynthesized                     NodeFlags = 1 << 4  // Node was synthesized during transformation
	NodeFlagsNamespace                       NodeFlags = 1 << 5  // Namespace declaration
	NodeFlagsOptionalChain                   NodeFlags = 1 << 6  // Chained MemberExpression rooted to a pseudo-OptionalExpression
	NodeFlagsExportContext                   NodeFlags = 1 << 7  // Export context (initialized by binding)
	NodeFlagsContainsThis                    NodeFlags = 1 << 8  // Interface contains references to "this"
	NodeFlagsHasImplicitReturn               NodeFlags = 1 << 9  // If function implicitly returns on one of codepaths (initialized by binding)
	NodeFlagsHasExplicitReturn               NodeFlags = 1 << 10 // If function has explicit reachable return on one of codepaths (initialized by binding)
	NodeFlagsGlobalAugmentation              NodeFlags = 1 << 11 // Set if module declaration is an augmentation for the global scope
	NodeFlagsHasAsyncFunctions               NodeFlags = 1 << 12 // If the file has async functions (initialized by binding)
	NodeFlagsDisallowInContext               NodeFlags = 1 << 13 // If node was parsed in a context where 'in-expressions' are not allowed
	NodeFlagsYieldContext                    NodeFlags = 1 << 14 // If node was parsed in the 'yield' context created when parsing a generator
	NodeFlagsDecoratorContext                NodeFlags = 1 << 15 // If node was parsed as part of a decorator
	NodeFlagsAwaitContext                    NodeFlags = 1 << 16 // If node was parsed in the 'await' context created when parsing an async function
	NodeFlagsDisallowConditionalTypesContext NodeFlags = 1 << 17 // If node was parsed in a context where conditional types are not allowed
	NodeFlagsThisNodeHasError                NodeFlags = 1 << 18 // If the parser encountered an error when parsing the code that created this node
	NodeFlagsJavaScriptFile                  NodeFlags = 1 << 19 // If node was parsed in a JavaScript
	NodeFlagsThisNodeOrAnySubNodesHasError   NodeFlags = 1 << 20 // If this node or any of its children had an error
	NodeFlagsHasAggregatedChildData          NodeFlags = 1 << 21 // If we've computed data from children and cached it in this node

	// These flags will be set when the parser encounters a dynamic import expression or 'import.meta' to avoid
	// walking the tree if the flags are not set. However, these flags are just a approximation
	// (hence why it's named "PossiblyContainsDynamicImport") because once set, the flags never get cleared.
	// During editing, if a dynamic import is removed, incremental parsing will *NOT* clear this flag.
	// This means that the tree will always be traversed during module resolution, or when looking for external module indicators.
	// However, the removal operation should not occur often and in the case of the
	// removal, it is likely that users will add the import anyway.
	// The advantage of this approach is its simplicity. For the case of batch compilation,
	// we guarantee that users won't have to pay the price of walking the tree if a dynamic import isn't used.
	NodeFlagsPossiblyContainsDynamicImport NodeFlags = 1 << 22
	NodeFlagsPossiblyContainsImportMeta    NodeFlags = 1 << 23

	NodeFlagsJSDoc           NodeFlags = 1 << 24 // If node was parsed inside jsdoc
	NodeFlagsAmbient         NodeFlags = 1 << 25 // If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
	NodeFlagsInWithStatement NodeFlags = 1 << 26 // If any ancestor of node was the `statement` of a WithStatement (not the `expression`)
	NodeFlagsJsonFile        NodeFlags = 1 << 27 // If node was parsed in a Json
	NodeFlagsTypeCached      NodeFlags = 1 << 28 // If a type was cached for node at any point
	NodeFlagsDeprecated      NodeFlags = 1 << 29 // If has '@deprecated' JSDoc tag

	NodeFlagsBlockScoped = NodeFlagsLet | NodeFlagsConst | NodeFlagsUsing
	NodeFlagsConstant    = NodeFlagsConst | NodeFlagsUsing
	NodeFlagsAwaitUsing  = NodeFlagsConst | NodeFlagsUsing // Variable declaration (NOTE: on a single node these flags would otherwise be mutually exclusive)

	NodeFlagsReachabilityCheckFlags   = NodeFlagsHasImplicitReturn | NodeFlagsHasExplicitReturn
	NodeFlagsReachabilityAndEmitFlags = NodeFlagsReachabilityCheckFlags | NodeFlagsHasAsyncFunctions

	// Parsing context flags
	NodeFlagsContextFlags NodeFlags = NodeFlagsDisallowInContext | NodeFlagsDisallowConditionalTypesContext | NodeFlagsYieldContext | NodeFlagsDecoratorContext | NodeFlagsAwaitContext | NodeFlagsJavaScriptFile | NodeFlagsInWithStatement | NodeFlagsAmbient

	// Exclude these flags when parsing a Type
	NodeFlagsTypeExcludesFlags NodeFlags = NodeFlagsYieldContext | NodeFlagsAwaitContext

	// Represents all flags that are potentially set once and
	// never cleared on SourceFiles which get re-used in between incremental parses.
	// See the comment above on `PossiblyContainsDynamicImport` and `PossiblyContainsImportMeta`.
	NodeFlagsPermanentlySetIncrementalFlags NodeFlags = NodeFlagsPossiblyContainsDynamicImport | NodeFlagsPossiblyContainsImportMeta

	// The following flags repurpose other NodeFlags as different meanings for Identifier nodes
	NodeFlagsIdentifierHasExtendedUnicodeEscape NodeFlags = NodeFlagsContainsThis      // Indicates whether the identifier contains an extended unicode escape sequence
	NodeFlagsIdentifierIsInJSDocNamespace       NodeFlags = NodeFlagsHasAsyncFunctions // Indicates whether the identifier is part of a JSDoc namespace
)

type ModifierFlags uint32

const (
	ModifierFlagsNone ModifierFlags = 0
	// Syntactic/JSDoc modifiers
	ModifierFlagsPublic    ModifierFlags = 1 << 0 // Property/Method
	ModifierFlagsPrivate   ModifierFlags = 1 << 1 // Property/Method
	ModifierFlagsProtected ModifierFlags = 1 << 2 // Property/Method
	ModifierFlagsReadonly  ModifierFlags = 1 << 3 // Property/Method
	ModifierFlagsOverride  ModifierFlags = 1 << 4 // Override method
	// Syntactic-only modifiers
	ModifierFlagsExport    ModifierFlags = 1 << 5  // Declarations
	ModifierFlagsAbstract  ModifierFlags = 1 << 6  // Class/Method/ConstructSignature
	ModifierFlagsAmbient   ModifierFlags = 1 << 7  // Declarations
	ModifierFlagsStatic    ModifierFlags = 1 << 8  // Property/Method
	ModifierFlagsAccessor  ModifierFlags = 1 << 9  // Property
	ModifierFlagsAsync     ModifierFlags = 1 << 10 // Property/Method/Function
	ModifierFlagsDefault   ModifierFlags = 1 << 11 // Function/Class (export default declaration)
	ModifierFlagsConst     ModifierFlags = 1 << 12 // Const enum
	ModifierFlagsIn        ModifierFlags = 1 << 13 // Contravariance modifier
	ModifierFlagsOut       ModifierFlags = 1 << 14 // Covariance modifier
	ModifierFlagsDecorator ModifierFlags = 1 << 15 // Contains a decorator.
	ModifierFlagsImmediate ModifierFlags = 1 << 16 // Parameter
	// JSDoc-only modifiers
	ModifierFlagsDeprecated     ModifierFlags = 1 << 17 // Deprecated tag.
	ModifierFlagsJSDocImmediate ModifierFlags = 1 << 18 // Parameter
	// Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
	ModifierFlagsJSDocPublic               ModifierFlags = 1 << 23 // if this value changes, `selectEffectiveModifierFlags` must change accordingly
	ModifierFlagsJSDocPrivate              ModifierFlags = 1 << 24
	ModifierFlagsJSDocProtected            ModifierFlags = 1 << 25
	ModifierFlagsJSDocReadonly             ModifierFlags = 1 << 26
	ModifierFlagsJSDocOverride             ModifierFlags = 1 << 27
	ModifierFlagsHasComputedJSDocModifiers ModifierFlags = 1 << 28 // Indicates the computed modifier flags include modifiers from JSDoc.
	ModifierFlagsHasComputedFlags          ModifierFlags = 1 << 29 // Modifier flags have been computed

	ModifierFlagsSyntacticOrJSDocModifiers = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsOverride
	ModifierFlagsSyntacticOnlyModifiers    = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsAbstract | ModifierFlagsStatic | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsDecorator | ModifierFlagsImmediate
	ModifierFlagsSyntacticModifiers        = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers
	ModifierFlagsJSDocCacheOnlyModifiers   = ModifierFlagsJSDocPublic | ModifierFlagsJSDocPrivate | ModifierFlagsJSDocProtected | ModifierFlagsJSDocReadonly | ModifierFlagsJSDocOverride
	ModifierFlagsJSDocOnlyModifiers        = ModifierFlagsDeprecated | ModifierFlagsJSDocImmediate
	ModifierFlagsNonCacheOnlyModifiers     = ModifierFlagsSyntacticOrJSDocModifiers | ModifierFlagsSyntacticOnlyModifiers | ModifierFlagsJSDocOnlyModifiers

	ModifierFlagsAccessibilityModifier = ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected
	// Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
	ModifierFlagsParameterPropertyModifier      = ModifierFlagsAccessibilityModifier | ModifierFlagsReadonly | ModifierFlagsOverride
	ModifierFlagsNonPublicAccessibilityModifier = ModifierFlagsPrivate | ModifierFlagsProtected

	ModifierFlagsTypeScriptModifier = ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsConst | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsImmediate
	ModifierFlagsExportDefault      = ModifierFlagsExport | ModifierFlagsDefault
	ModifierFlagsAll                = ModifierFlagsExport | ModifierFlagsAmbient | ModifierFlagsPublic | ModifierFlagsPrivate | ModifierFlagsProtected | ModifierFlagsStatic | ModifierFlagsReadonly | ModifierFlagsAbstract | ModifierFlagsAccessor | ModifierFlagsAsync | ModifierFlagsDefault | ModifierFlagsConst | ModifierFlagsDeprecated | ModifierFlagsOverride | ModifierFlagsIn | ModifierFlagsOut | ModifierFlagsImmediate | ModifierFlagsDecorator
	ModifierFlagsModifier           = ModifierFlagsAll & ^ModifierFlagsDecorator
)

// ParseFlags

type ParseFlags uint32

const (
	ParseFlagsNone                   ParseFlags = 0
	ParseFlagsYield                  ParseFlags = 1 << 0
	ParseFlagsAwait                  ParseFlags = 1 << 1
	ParseFlagsType                   ParseFlags = 1 << 2
	ParseFlagsIgnoreMissingOpenBrace ParseFlags = 1 << 4
	ParseFlagsJSDoc                  ParseFlags = 1 << 5
)

// SymbolFlags

type SymbolFlags uint32

const (
	SymbolFlagsNone                   SymbolFlags = 0
	SymbolFlagsFunctionScopedVariable SymbolFlags = 1 << 0  // Variable (var) or parameter
	SymbolFlagsBlockScopedVariable    SymbolFlags = 1 << 1  // A block-scoped variable (let or const)
	SymbolFlagsProperty               SymbolFlags = 1 << 2  // Property or enum member
	SymbolFlagsEnumMember             SymbolFlags = 1 << 3  // Enum member
	SymbolFlagsFunction               SymbolFlags = 1 << 4  // Function
	SymbolFlagsClass                  SymbolFlags = 1 << 5  // Class
	SymbolFlagsInterface              SymbolFlags = 1 << 6  // Interface
	SymbolFlagsConstEnum              SymbolFlags = 1 << 7  // Const enum
	SymbolFlagsRegularEnum            SymbolFlags = 1 << 8  // Enum
	SymbolFlagsValueModule            SymbolFlags = 1 << 9  // Instantiated module
	SymbolFlagsNamespaceModule        SymbolFlags = 1 << 10 // Uninstantiated module
	SymbolFlagsTypeLiteral            SymbolFlags = 1 << 11 // Type Literal or mapped type
	SymbolFlagsObjectLiteral          SymbolFlags = 1 << 12 // Object Literal
	SymbolFlagsMethod                 SymbolFlags = 1 << 13 // Method
	SymbolFlagsConstructor            SymbolFlags = 1 << 14 // Constructor
	SymbolFlagsGetAccessor            SymbolFlags = 1 << 15 // Get accessor
	SymbolFlagsSetAccessor            SymbolFlags = 1 << 16 // Set accessor
	SymbolFlagsSignature              SymbolFlags = 1 << 17 // Call, construct, or index signature
	SymbolFlagsTypeParameter          SymbolFlags = 1 << 18 // Type parameter
	SymbolFlagsTypeAlias              SymbolFlags = 1 << 19 // Type alias
	SymbolFlagsExportValue            SymbolFlags = 1 << 20 // Exported value marker (see comment in declareModuleMember in binder)
	SymbolFlagsAlias                  SymbolFlags = 1 << 21 // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
	SymbolFlagsPrototype              SymbolFlags = 1 << 22 // Prototype property (no source representation)
	SymbolFlagsExportStar             SymbolFlags = 1 << 23 // Export * declaration
	SymbolFlagsOptional               SymbolFlags = 1 << 24 // Optional property
	SymbolFlagsTransient              SymbolFlags = 1 << 25 // Transient symbol (created during type check)
	SymbolFlagsAssignment             SymbolFlags = 1 << 26 // Assignment treated as declaration (eg `this.prop = 1`)
	SymbolFlagsModuleExports          SymbolFlags = 1 << 27 // Symbol for CommonJS `module` of `module.exports`
	SymbolFlagsAll                    SymbolFlags = 0xFFFFFFFF

	SymbolFlagsEnum      = SymbolFlagsRegularEnum | SymbolFlagsConstEnum
	SymbolFlagsVariable  = SymbolFlagsFunctionScopedVariable | SymbolFlagsBlockScopedVariable
	SymbolFlagsValue     = SymbolFlagsVariable | SymbolFlagsProperty | SymbolFlagsEnumMember | SymbolFlagsObjectLiteral | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule | SymbolFlagsMethod | SymbolFlagsGetAccessor | SymbolFlagsSetAccessor
	SymbolFlagsType      = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsEnumMember | SymbolFlagsTypeLiteral | SymbolFlagsTypeParameter | SymbolFlagsTypeAlias
	SymbolFlagsNamespace = SymbolFlagsValueModule | SymbolFlagsNamespaceModule | SymbolFlagsEnum
	SymbolFlagsModule    = SymbolFlagsValueModule | SymbolFlagsNamespaceModule
	SymbolFlagsAccessor  = SymbolFlagsGetAccessor | SymbolFlagsSetAccessor

	// Variables can be redeclared, but can not redeclare a block-scoped declaration with the
	// same name, or any other value that is not a variable, e.g. ValueModule or Class
	SymbolFlagsFunctionScopedVariableExcludes = SymbolFlagsValue & ^SymbolFlagsFunctionScopedVariable

	// Block-scoped declarations are not allowed to be re-declared
	// they can not merge with anything in the value space
	SymbolFlagsBlockScopedVariableExcludes = SymbolFlagsValue

	SymbolFlagsParameterExcludes                   = SymbolFlagsValue
	SymbolFlagsPropertyExcludes                    = SymbolFlagsNone
	SymbolFlagsEnumMemberExcludes                  = SymbolFlagsValue | SymbolFlagsType
	SymbolFlagsFunctionExcludes                    = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsValueModule | SymbolFlagsClass)
	SymbolFlagsClassExcludes                       = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsValueModule | SymbolFlagsInterface | SymbolFlagsFunction) // class-interface mergability done in checker.ts
	SymbolFlagsInterfaceExcludes                   = SymbolFlagsType & ^(SymbolFlagsInterface | SymbolFlagsClass)
	SymbolFlagsRegularEnumExcludes                 = (SymbolFlagsValue | SymbolFlagsType) & ^(SymbolFlagsRegularEnum | SymbolFlagsValueModule) // regular enums merge only with regular enums and modules
	SymbolFlagsConstEnumExcludes                   = (SymbolFlagsValue | SymbolFlagsType) & ^SymbolFlagsConstEnum                              // const enums merge only with const enums
	SymbolFlagsValueModuleExcludes                 = SymbolFlagsValue & ^(SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsRegularEnum | SymbolFlagsValueModule)
	SymbolFlagsNamespaceModuleExcludes             = SymbolFlagsNone
	SymbolFlagsMethodExcludes                      = SymbolFlagsValue & ^SymbolFlagsMethod
	SymbolFlagsGetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsSetAccessor
	SymbolFlagsSetAccessorExcludes                 = SymbolFlagsValue & ^SymbolFlagsGetAccessor
	SymbolFlagsAccessorExcludes                    = SymbolFlagsValue & ^SymbolFlagsAccessor
	SymbolFlagsTypeParameterExcludes               = SymbolFlagsType & ^SymbolFlagsTypeParameter
	SymbolFlagsTypeAliasExcludes                   = SymbolFlagsType
	SymbolFlagsAliasExcludes                       = SymbolFlagsAlias
	SymbolFlagsModuleMember                        = SymbolFlagsVariable | SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsEnum | SymbolFlagsModule | SymbolFlagsTypeAlias | SymbolFlagsAlias
	SymbolFlagsExportHasLocal                      = SymbolFlagsFunction | SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsValueModule
	SymbolFlagsBlockScoped                         = SymbolFlagsBlockScopedVariable | SymbolFlagsClass | SymbolFlagsEnum
	SymbolFlagsPropertyOrAccessor                  = SymbolFlagsProperty | SymbolFlagsAccessor
	SymbolFlagsClassMember                         = SymbolFlagsMethod | SymbolFlagsAccessor | SymbolFlagsProperty
	SymbolFlagsExportSupportsDefaultModifier       = SymbolFlagsClass | SymbolFlagsFunction | SymbolFlagsInterface
	SymbolFlagsExportDoesNotSupportDefaultModifier = ^SymbolFlagsExportSupportsDefaultModifier
	// The set of things we consider semantically classifiable.  Used to speed up the LS during
	// classification.
	SymbolFlagsClassifiable         = SymbolFlagsClass | SymbolFlagsEnum | SymbolFlagsTypeAlias | SymbolFlagsInterface | SymbolFlagsTypeParameter | SymbolFlagsModule | SymbolFlagsAlias
	SymbolFlagsLateBindingContainer = SymbolFlagsClass | SymbolFlagsInterface | SymbolFlagsTypeLiteral | SymbolFlagsObjectLiteral | SymbolFlagsFunction
)

// CheckFlags

type CheckFlags = uint32

const (
	CheckFlagsNone              CheckFlags = 0
	CheckFlagsInstantiated      CheckFlags = 1 << 0  // Instantiated symbol
	CheckFlagsSyntheticProperty CheckFlags = 1 << 1  // Property in union or intersection type
	CheckFlagsSyntheticMethod   CheckFlags = 1 << 2  // Method in union or intersection type
	CheckFlagsReadonly          CheckFlags = 1 << 3  // Readonly transient symbol
	CheckFlagsReadPartial       CheckFlags = 1 << 4  // Synthetic property present in some but not all constituents
	CheckFlagsWritePartial      CheckFlags = 1 << 5  // Synthetic property present in some but only satisfied by an index signature in others
	CheckFlagsHasNonUniformType CheckFlags = 1 << 6  // Synthetic property with non-uniform type in constituents
	CheckFlagsHasLiteralType    CheckFlags = 1 << 7  // Synthetic property with at least one literal type in constituents
	CheckFlagsContainsPublic    CheckFlags = 1 << 8  // Synthetic property with public constituent(s)
	CheckFlagsContainsProtected CheckFlags = 1 << 9  // Synthetic property with protected constituent(s)
	CheckFlagsContainsPrivate   CheckFlags = 1 << 10 // Synthetic property with private constituent(s)
	CheckFlagsContainsStatic    CheckFlags = 1 << 11 // Synthetic property with static constituent(s)
	CheckFlagsLate              CheckFlags = 1 << 12 // Late-bound symbol for a computed property with a dynamic name
	CheckFlagsReverseMapped     CheckFlags = 1 << 13 // Property of reverse-inferred homomorphic mapped type
	CheckFlagsOptionalParameter CheckFlags = 1 << 14 // Optional parameter
	CheckFlagsRestParameter     CheckFlags = 1 << 15 // Rest parameter
	CheckFlagsDeferredType      CheckFlags = 1 << 16 // Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
	CheckFlagsHasNeverType      CheckFlags = 1 << 17 // Synthetic property with at least one never type in constituents
	CheckFlagsMapped            CheckFlags = 1 << 18 // Property of mapped type
	CheckFlagsStripOptional     CheckFlags = 1 << 19 // Strip optionality in mapped property
	CheckFlagsUnresolved        CheckFlags = 1 << 20 // Unresolved type alias symbol
	CheckFlagsSynthetic                    = CheckFlagsSyntheticProperty | CheckFlagsSyntheticMethod
	CheckFlagsDiscriminant                 = CheckFlagsHasNonUniformType | CheckFlagsHasLiteralType
	CheckFlagsPartial                      = CheckFlagsReadPartial | CheckFlagsWritePartial
)

type SignatureKind int32

const (
	SignatureKindCall SignatureKind = iota
	SignatureKindConstruct
)

type ScriptKind int32

const (
	ScriptKindUnknown ScriptKind = iota
	ScriptKindJS
	ScriptKindJSX
	ScriptKindTS
	ScriptKindTSX
	ScriptKindExternal
	ScriptKindJSON
	/**
	 * Used on extensions that doesn't define the ScriptKind but the content defines it.
	 * Deferred extensions are going to be included in all project contexts.
	 */
	ScriptKindDeferred
)

type ScriptTarget int32

const (
	ScriptTargetNone   ScriptTarget = 0
	ScriptTargetES3    ScriptTarget = 0 // Deprecated
	ScriptTargetES5    ScriptTarget = 1
	ScriptTargetES2015 ScriptTarget = 2
	ScriptTargetES2016 ScriptTarget = 3
	ScriptTargetES2017 ScriptTarget = 4
	ScriptTargetES2018 ScriptTarget = 5
	ScriptTargetES2019 ScriptTarget = 6
	ScriptTargetES2020 ScriptTarget = 7
	ScriptTargetES2021 ScriptTarget = 8
	ScriptTargetES2022 ScriptTarget = 9
	ScriptTargetES2023 ScriptTarget = 10
	ScriptTargetESNext ScriptTarget = 99
	ScriptTargetJSON   ScriptTarget = 100
	ScriptTargetLatest ScriptTarget = ScriptTargetESNext
)

type LanguageVariant int32

const (
	LanguageVariantStandard LanguageVariant = iota
	LanguageVariantJSX
)

type TypeFormatFlags uint32

const (
	TypeFormatFlagsNone                               TypeFormatFlags = 0
	TypeFormatFlagsNoTruncation                       TypeFormatFlags = 1 << 0 // Don't truncate typeToString result
	TypeFormatFlagsWriteArrayAsGenericType            TypeFormatFlags = 1 << 1 // Write Array<T> instead T[]
	TypeFormatFlagsGenerateNamesForShadowedTypeParams TypeFormatFlags = 1 << 2 // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
	TypeFormatFlagsUseStructuralFallback              TypeFormatFlags = 1 << 3 // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
	// hole because there's a hole in node builder flags
	TypeFormatFlagsWriteTypeArgumentsOfSignature TypeFormatFlags = 1 << 5 // Write the type arguments instead of type parameters of the signature
	TypeFormatFlagsUseFullyQualifiedType         TypeFormatFlags = 1 << 6 // Write out the fully qualified type name (eg. Module.Type, instead of Type)
	// hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
	TypeFormatFlagsSuppressAnyReturnType TypeFormatFlags = 1 << 8 // If the return type is any-like, don't offer a return type.
	// hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
	TypeFormatFlagsMultilineObjectLiterals             TypeFormatFlags = 1 << 10 // Always print object literals across multiple lines (only used to map into node builder flags)
	TypeFormatFlagsWriteClassExpressionAsTypeLiteral   TypeFormatFlags = 1 << 11 // Write a type literal instead of (Anonymous class)
	TypeFormatFlagsUseTypeOfFunction                   TypeFormatFlags = 1 << 12 // Write typeof instead of function type literal
	TypeFormatFlagsOmitParameterModifiers              TypeFormatFlags = 1 << 13 // Omit modifiers on parameters
	TypeFormatFlagsUseAliasDefinedOutsideCurrentScope  TypeFormatFlags = 1 << 14 // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
	TypeFormatFlagsUseSingleQuotesForStringLiteralType TypeFormatFlags = 1 << 28 // Use single quotes for string literal type
	TypeFormatFlagsNoTypeReduction                     TypeFormatFlags = 1 << 29 // Don't call getReducedType
	TypeFormatFlagsOmitThisParameter                   TypeFormatFlags = 1 << 25
	// Error Handling
	TypeFormatFlagsAllowUniqueESSymbolType TypeFormatFlags = 1 << 20 // This is bit 20 to align with the same bit in `NodeBuilderFlags`
	// TypeFormatFlags exclusive
	TypeFormatFlagsAddUndefined             TypeFormatFlags = 1 << 17 // Add undefined to types of initialized, non-optional parameters
	TypeFormatFlagsWriteArrowStyleSignature TypeFormatFlags = 1 << 18 // Write arrow style signature
	// State
	TypeFormatFlagsInArrayType         TypeFormatFlags = 1 << 19 // Writing an array element type
	TypeFormatFlagsInElementType       TypeFormatFlags = 1 << 21 // Writing an array or union element type
	TypeFormatFlagsInFirstTypeArgument TypeFormatFlags = 1 << 22 // Writing first type argument of the instantiated type
	TypeFormatFlagsInTypeAlias         TypeFormatFlags = 1 << 23 // Writing type in type alias declaration
)

// Ids

type NodeId uint32
type SymbolId uint32
type MergeId uint32
type TypeId uint32

// Symbol

type Symbol struct {
	flags                        SymbolFlags
	checkFlags                   CheckFlags // Non-zero only in transient symbols
	constEnumOnlyModule          bool       // True if module contains only const enums or other modules with only const enums
	isReplaceableByMethod        bool
	name                         string
	declarations                 []*Node
	valueDeclaration             *Node
	members                      SymbolTable
	exports                      SymbolTable
	id                           SymbolId
	mergeId                      MergeId // Assigned once symbol is merged somewhere
	parent                       *Symbol
	exportSymbol                 *Symbol
	assignmentDeclarationMembers map[NodeId]*Node // Set of detected assignment declarations
	globalExports                SymbolTable      // Conditional global UMD exports
}

// SymbolTable

type SymbolTable map[string]*Symbol

// Links for value symbols

type ValueSymbolLinks struct {
	resolvedType   *Type // Type of value symbol
	writeType      *Type
	target         *Symbol
	mapper         *TypeMapper
	nameType       *Type
	containingType *Type // Containing union or intersection type for synthetic property
}

// Links for alias symbols

type AliasSymbolLinks struct {
	immediateTarget             *Symbol // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
	aliasTarget                 *Symbol // Resolved (non-alias) target of an alias
	typeOnlyDeclarationResolved bool    // True when typeOnlyDeclaration resolution in process
	typeOnlyDeclaration         *Node   // First resolved alias declaration that makes the symbol only usable in type constructs
	typeOnlyExportStarName      string  // Set to the name of the symbol re-exported by an 'export type *' declaration, when different from the symbol name
}

// Links for module symbols

type ModuleSymbolLinks struct {
	resolvedExports       SymbolTable      // Resolved exports of module or combined early- and late-bound static members of a class.
	cjsExportMerged       *Symbol          // Version of the symbol with all non export= exports merged with the export= target
	typeOnlyExportStarMap map[string]*Node // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
}

// Links for export type symbols

type ExportTypeLinks struct {
	target            *Symbol // Target symbol
	originatingImport *Node   // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
}

// Links for type aliases

type TypeAliasLinks struct {
	declaredType   *Type
	typeParameters []*Type          // Type parameters of type alias (undefined if non-generic)
	instantiations map[string]*Type // Instantiations of generic type alias (undefined if non-generic)
}

// Links for late-binding containers

type MembersOrExportsResolutionKind int

const (
	MembersOrExportsResolutionKindResolvedExports MembersOrExportsResolutionKind = 0
	MembersOrExportsResolutionKindresolvedMembers MembersOrExportsResolutionKind = 1
)

type MembersAndExportsLinks [2]SymbolTable // Indexed by MembersOrExportsResolutionKind

// Links for type parameters

type TypeParameterLinks struct {
	declaredType *Type
}

// Links for interface types

type InterfaceTypeLinks struct {
	declaredType *Type
}

// FlowFlags

type FlowFlags uint32

const (
	FlowFlagsUnreachable    FlowFlags = 1 << 0  // Unreachable code
	FlowFlagsStart          FlowFlags = 1 << 1  // Start of flow graph
	FlowFlagsBranchLabel    FlowFlags = 1 << 2  // Non-looping junction
	FlowFlagsLoopLabel      FlowFlags = 1 << 3  // Looping junction
	FlowFlagsAssignment     FlowFlags = 1 << 4  // Assignment
	FlowFlagsTrueCondition  FlowFlags = 1 << 5  // Condition known to be true
	FlowFlagsFalseCondition FlowFlags = 1 << 6  // Condition known to be false
	FlowFlagsSwitchClause   FlowFlags = 1 << 7  // Switch statement clause
	FlowFlagsArrayMutation  FlowFlags = 1 << 8  // Potential array mutation
	FlowFlagsCall           FlowFlags = 1 << 9  // Potential assertion call
	FlowFlagsReduceLabel    FlowFlags = 1 << 10 // Temporarily reduce antecedents of label
	FlowFlagsReferenced     FlowFlags = 1 << 11 // Referenced as antecedent once
	FlowFlagsShared         FlowFlags = 1 << 12 // Referenced as antecedent more than once
	FlowFlagsLabel                    = FlowFlagsBranchLabel | FlowFlagsLoopLabel
	FlowFlagsCondition                = FlowFlagsTrueCondition | FlowFlagsFalseCondition
)

// FlowNode

type FlowNode struct {
	flags       FlowFlags
	node        any
	antecedent  *FlowNode // Antecedent for all but FlowLabel
	antecedents *FlowList // Linked list of antecedents for FlowLabel
}

type FlowList struct {
	node *FlowNode
	next *FlowList
}

type FlowLabel = FlowNode

var unreachableFlow = &FlowNode{flags: FlowFlagsUnreachable}
var reportedUnreachableFlow = &FlowNode{flags: FlowFlagsUnreachable}

// FlowSwitchClauseData

type FlowSwitchClauseData struct {
	switchStatement *SwitchStatement
	clauseStart     int32 // Start index of case/default clause range
	clauseEnd       int32 // End index of case/default clause range
}

// FlowReduceLabelData

type FlowReduceLabelData struct {
	target      *FlowLabel // Target label
	antecedents *FlowList  // Temporary antecedent list
}

// Tristate

type Tristate byte

const (
	TSUnknown Tristate = iota
	TSFalse
	TSTrue
)

type VarianceFlags uint32

const (
	VarianceFlagsInvariant                VarianceFlags = 0                                                                                                       // Neither covariant nor contravariant
	VarianceFlagsCovariant                VarianceFlags = 1 << 0                                                                                                  // Covariant
	VarianceFlagsContravariant            VarianceFlags = 1 << 1                                                                                                  // Contravariant
	VarianceFlagsBivariant                VarianceFlags = VarianceFlagsCovariant | VarianceFlagsContravariant                                                     // Both covariant and contravariant
	VarianceFlagsIndependent              VarianceFlags = 1 << 2                                                                                                  // Unwitnessed type parameter
	VarianceFlagsVarianceMask             VarianceFlags = VarianceFlagsInvariant | VarianceFlagsCovariant | VarianceFlagsContravariant | VarianceFlagsIndependent // Mask containing all measured variances without the unmeasurable flag
	VarianceFlagsUnmeasurable             VarianceFlags = 1 << 3                                                                                                  // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
	VarianceFlagsUnreliable               VarianceFlags = 1 << 4                                                                                                  // Variance result is unreliable - checking may produce false negatives, but not false positives
	VarianceFlagsAllowsStructuralFallback               = VarianceFlagsUnmeasurable | VarianceFlagsUnreliable
)

type AccessFlags uint32

const (
	AccessFlagsNone                       AccessFlags = 0
	AccessFlagsIncludeUndefined           AccessFlags = 1 << 0
	AccessFlagsNoIndexSignatures          AccessFlags = 1 << 1
	AccessFlagsWriting                    AccessFlags = 1 << 2
	AccessFlagsCacheSymbol                AccessFlags = 1 << 3
	AccessFlagsAllowMissing               AccessFlags = 1 << 4
	AccessFlagsExpressionPosition         AccessFlags = 1 << 5
	AccessFlagsReportDeprecated           AccessFlags = 1 << 6
	AccessFlagsSuppressNoImplicitAnyError AccessFlags = 1 << 7
	AccessFlagsContextual                 AccessFlags = 1 << 8
	AccessFlagsPersistent                             = AccessFlagsIncludeUndefined
)

type AssignmentDeclarationKind = int32

const (
	AssignmentDeclarationKindNone = AssignmentDeclarationKind(iota)
	/// exports.name = expr
	/// module.exports.name = expr
	AssignmentDeclarationKindExportsProperty
	/// module.exports = expr
	AssignmentDeclarationKindModuleExports
	/// className.prototype.name = expr
	AssignmentDeclarationKindPrototypeProperty
	/// this.name = expr
	AssignmentDeclarationKindThisProperty
	// F.name = expr
	AssignmentDeclarationKindProperty
	// F.prototype = { ... }
	AssignmentDeclarationKindPrototype
	// Object.defineProperty(x, 'name', { value: any, writable?: boolean (false by default) });
	// Object.defineProperty(x, 'name', { get: Function, set: Function });
	// Object.defineProperty(x, 'name', { get: Function });
	// Object.defineProperty(x, 'name', { set: Function });
	AssignmentDeclarationKindObjectDefinePropertyValue
	// Object.defineProperty(exports || module.exports, 'name', ...);
	AssignmentDeclarationKindObjectDefinePropertyExports
	// Object.defineProperty(Foo.prototype, 'name', ...);
	AssignmentDeclarationKindObjectDefinePrototypeProperty
)

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

const (
	InternalSymbolNameCall                    = InternalSymbolNamePrefix + "call"                    // Call signatures
	InternalSymbolNameConstructor             = InternalSymbolNamePrefix + "constructor"             // Constructor implementations
	InternalSymbolNameNew                     = InternalSymbolNamePrefix + "new"                     // Constructor signatures
	InternalSymbolNameIndex                   = InternalSymbolNamePrefix + "index"                   // Index signatures
	InternalSymbolNameExportStar              = InternalSymbolNamePrefix + "export"                  // Module export * declarations
	InternalSymbolNameGlobal                  = InternalSymbolNamePrefix + "global"                  // Global self-reference
	InternalSymbolNameMissing                 = InternalSymbolNamePrefix + "missing"                 // Indicates missing symbol
	InternalSymbolNameType                    = InternalSymbolNamePrefix + "type"                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = InternalSymbolNamePrefix + "object"                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = InternalSymbolNamePrefix + "jsxAttributes"           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = InternalSymbolNamePrefix + "class"                   // Unnamed class expression
	InternalSymbolNameFunction                = InternalSymbolNamePrefix + "function"                // Unnamed function expression
	InternalSymbolNameComputed                = InternalSymbolNamePrefix + "computed"                // Computed property name declaration with dynamic name
	InternalSymbolNameResolving               = InternalSymbolNamePrefix + "resolving"               // Indicator symbol used to mark partially resolved type aliases
	InternalSymbolNameExportEquals            = InternalSymbolNamePrefix + "export="                 // Export assignment symbol
	InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression" // Instantiation expressions
	InternalSymbolNameImportAttributes        = InternalSymbolNamePrefix + "importAttributes"
	InternalSymbolNameDefault                 = "default" // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = "this"
)

// CompilerOptions

type CompilerOptions struct {
	AllowSyntheticDefaultImports       Tristate
	AllowUmdGlobalAccess               Tristate
	AllowUnreachableCode               Tristate
	AllowUnusedLabels                  Tristate
	CheckJs                            Tristate
	CustomConditions                   []string
	ESModuleInterop                    Tristate
	ExactOptionalPropertyTypes         Tristate
	IsolatedModules                    Tristate
	ModuleKind                         ModuleKind
	ModuleResolution                   ModuleResolutionKind
	NoFallthroughCasesInSwitch         Tristate
	NoImplicitAny                      Tristate
	NoPropertyAccessFromIndexSignature Tristate
	NoUncheckedIndexedAccess           Tristate
	PreserveConstEnums                 Tristate
	Strict                             Tristate
	StrictBindCallApply                Tristate
	StrictNullChecks                   Tristate
	Target                             ScriptTarget
	TraceResolution                    Tristate
	Types                              []string
	UseDefineForClassFields            Tristate
	UseUnknownInCatchVariables         Tristate
	VerbatimModuleSyntax               Tristate
}

type ModuleKind int32

const (
	ModuleKindNone     ModuleKind = 0
	ModuleKindCommonJS ModuleKind = 1
	ModuleKindAMD      ModuleKind = 2
	ModuleKindUMD      ModuleKind = 3
	ModuleKindSystem   ModuleKind = 4
	// NOTE: ES module kinds should be contiguous to more easily check whether a module kind is *any* ES module kind.
	//       Non-ES module kinds should not come between ES2015 (the earliest ES module kind) and ESNext (the last ES
	//       module kind).
	ModuleKindES2015 ModuleKind = 5
	ModuleKindES2020 ModuleKind = 6
	ModuleKindES2022 ModuleKind = 7
	ModuleKindESNext ModuleKind = 99
	// Node16+ is an amalgam of commonjs (albeit updated) and es2022+, and represents a distinct module system from es2020/esnext
	ModuleKindNode16   ModuleKind = 100
	ModuleKindNodeNext ModuleKind = 199
	// Emit as written
	ModuleKindPreserve ModuleKind = 200
)

type ResolutionMode = ModuleKind // ModuleKindNone | ModuleKindCommonJS | ModuleKindESNext

type ModuleResolutionKind int32

const (
	ModuleResolutionKindUnknown ModuleResolutionKind = 0
	// Starting with node16, node's module resolver has significant departures from traditional cjs resolution
	// to better support ECMAScript modules and their use within node - however more features are still being added.
	// TypeScript's Node ESM support was introduced after Node 12 went end-of-life, and Node 14 is the earliest stable
	// version that supports both pattern trailers - *but*, Node 16 is the first version that also supports ECMAScript 2022.
	// In turn, we offer both a `NodeNext` moving resolution target, and a `Node16` version-anchored resolution target
	ModuleResolutionKindNode16   ModuleResolutionKind = 3
	ModuleResolutionKindNodeNext ModuleResolutionKind = 99 // Not simply `Node16` so that compiled code linked against TS can use the `Next` value reliably (same as with `ModuleKind`)
	ModuleResolutionKindBundler  ModuleResolutionKind = 100
)

type NodeCheckFlags uint32

const (
	NodeCheckFlagsNone                                     NodeCheckFlags = 0
	NodeCheckFlagsTypeChecked                              NodeCheckFlags = 1 << 0  // Node has been type checked
	NodeCheckFlagsLexicalThis                              NodeCheckFlags = 1 << 1  // Lexical 'this' reference
	NodeCheckFlagsCaptureThis                              NodeCheckFlags = 1 << 2  // Lexical 'this' used in body
	NodeCheckFlagsCaptureNewTarget                         NodeCheckFlags = 1 << 3  // Lexical 'new.target' used in body
	NodeCheckFlagsSuperInstance                            NodeCheckFlags = 1 << 4  // Instance 'super' reference
	NodeCheckFlagsSuperStatic                              NodeCheckFlags = 1 << 5  // Static 'super' reference
	NodeCheckFlagsContextChecked                           NodeCheckFlags = 1 << 6  // Contextual types have been assigned
	NodeCheckFlagsMethodWithSuperPropertyAccessInAsync     NodeCheckFlags = 1 << 7  // A method that contains a SuperProperty access in an async context.
	NodeCheckFlagsMethodWithSuperPropertyAssignmentInAsync NodeCheckFlags = 1 << 8  // A method that contains a SuperProperty assignment in an async context.
	NodeCheckFlagsCaptureArguments                         NodeCheckFlags = 1 << 9  // Lexical 'arguments' used in body
	NodeCheckFlagsEnumValuesComputed                       NodeCheckFlags = 1 << 10 // Values for enum members have been computed, and any errors have been reported for them.
	NodeCheckFlagsLexicalModuleMergesWithClass             NodeCheckFlags = 1 << 11 // Instantiated lexical module declaration is merged with a previous class declaration.
	NodeCheckFlagsLoopWithCapturedBlockScopedBinding       NodeCheckFlags = 1 << 12 // Loop that contains block scoped variable captured in closure
	NodeCheckFlagsContainsCapturedBlockScopeBinding        NodeCheckFlags = 1 << 13 // Part of a loop that contains block scoped variable captured in closure
	NodeCheckFlagsCapturedBlockScopedBinding               NodeCheckFlags = 1 << 14 // Block-scoped binding that is captured in some function
	NodeCheckFlagsBlockScopedBindingInLoop                 NodeCheckFlags = 1 << 15 // Block-scoped binding with declaration nested inside iteration statement
	NodeCheckFlagsNeedsLoopOutParameter                    NodeCheckFlags = 1 << 16 // Block scoped binding whose value should be explicitly copied outside of the converted loop
	NodeCheckFlagsAssignmentsMarked                        NodeCheckFlags = 1 << 17 // Parameter assignments have been marked
	NodeCheckFlagsContainsConstructorReference             NodeCheckFlags = 1 << 18 // Class or class element that contains a binding that references the class constructor.
	NodeCheckFlagsConstructorReference                     NodeCheckFlags = 1 << 29 // Binding to a class constructor inside of the class's body.
	NodeCheckFlagsContainsClassWithPrivateIdentifiers      NodeCheckFlags = 1 << 20 // Marked on all block-scoped containers containing a class with private identifiers.
	NodeCheckFlagsContainsSuperPropertyInStaticInitializer NodeCheckFlags = 1 << 21 // Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
	NodeCheckFlagsInCheckIdentifier                        NodeCheckFlags = 1 << 22
	NodeCheckFlagsPartiallyTypeChecked                     NodeCheckFlags = 1 << 23 // Node has been partially type checked
)

// Common links

type NodeLinks struct {
	flags                          NodeCheckFlags // Set of flags specific to Node
	declarationRequiresScopeChange Tristate
}

type TypeNodeLinks struct {
	resolvedType        *Type   // Cached type of type node
	resolvedSymbol      *Symbol // Cached name resolution result
	outerTypeParameters []*Type
}

// Signature specific links

type SignatureLinks struct {
	resolvedSignature *Signature
	effectsSignature  *Signature
}

// jsxFlag: JsxOpeningElement | JsxClosingElement
// resolvedJsxElementAttributesType: JsxOpeningElement | JsxClosingElement
// resolvedJsxElementAllAttributesType: JsxOpeningElement | JsxClosingElement
// jsxNamespace: Jsx*
// jsxImplicitImportContainer: Jsx*

// resolvedJSDocType: JSDoc TypeReference | ImportType

// switchTypes: SwitchStatement

// contectFreeType: Expression | FunctionExpression | ArrowFunction | MethodDeclaration

// outerTypeParameters: AnonymousType | MappedType | DeferredTypeReference

// Only on SourceFile
// deferredNodes []Node          // Set of nodes whose checking has been deferred

// resolvedSignature Signature;      // Cached signature of signature node or call expression
// effectsSignature Signature;       // Signature with possible control flow effects
// enumMemberValue EvaluatorResult;  // Constant value of enum member
// isVisible boolean;                // Is this node visible
// containsArgumentsReference boolean; // Whether a function-like declaration contains an 'arguments' reference
// hasReportedStatementInAmbientContext boolean; // Cache boolean if we report statements in ambient context
// jsxFlag JsxFlags;                 // flags for knowing what kind of element/attributes we're dealing with
// resolvedJsxElementAttributesType Type; // resolved element attributes type of a JSX openinglike element
// resolvedJsxElementAllAttributesType Type; // resolved all element attributes type of a JSX openinglike element
// resolvedJSDocType Type;           // Resolved type of a JSDoc type reference
// switchTypes []Type;               // Cached array of switch case expression types
// jsxNamespace *Symbol;      // Resolved jsx namespace symbol for this node
// jsxImplicitImportContainer *Symbol; // Resolved module symbol the implicit jsx import of this file should refer to
// contextFreeType Type;             // Cached context-free type used by the first pass of inference; used when a function's return is partially contextually sensitive
// deferredNodes []Node          // Set of nodes whose checking has been deferred
// capturedBlockScopeBindings []*Symbol; // Block-scoped bindings captured beneath this part of an IterationStatement
// outerTypeParameters []*TypeParameter; // Outer type parameters of anonymous object type
// isExhaustive boolean;         // Is node an exhaustive switch statement (0 indicates in-process resolution)
// skipDirectInference true;         // Flag set by the API `getContextualType` call on a node when `Completions` is passed to force the checker to skip making inferences to a node's type
// declarationRequiresScopeChange boolean; // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
// serializedTypes map[string]SerializedTypeEntry> // Collection of types serialized at this location
// decoratorSignature Signature;     // Signature for decorator as if invoked by the runtime.
// spreadIndices { first: number | undefined, last: number | undefined }; // Indices of first and last spread elements in array literal
// parameterInitializerContainsUndefined boolean; // True if this is a parameter declaration whose type annotation contains "undefined".
// fakeScopeForSignatureDeclaration "params" | "typeParams"; // If present, this is a fake scope injected into an enclosing declaration chain.
// assertionExpressionType Type;     // Cached type of the expression of a type assertion
// potentialThisCollisions Node[];
// potentialNewTargetCollisions Node[];
// potentialWeakMapSetCollisions Node[];
// potentialReflectCollisions Node[];
// potentialUnusedRenamedBindingElementsInTypes BindingElement[];
// externalHelpersModule Symbol;     // Resolved symbol for the external helpers module
// instantiationExpressionTypes Map<number, Type>; // Cache of instantiation expression types for the node

type TypeFlags uint32

const (
	TypeFlagsNone            TypeFlags = 0
	TypeFlagsAny             TypeFlags = 1 << 0
	TypeFlagsUnknown         TypeFlags = 1 << 1
	TypeFlagsString          TypeFlags = 1 << 2
	TypeFlagsNumber          TypeFlags = 1 << 3
	TypeFlagsBoolean         TypeFlags = 1 << 4
	TypeFlagsEnum            TypeFlags = 1 << 5 // Numeric computed enum member value
	TypeFlagsBigInt          TypeFlags = 1 << 6
	TypeFlagsStringLiteral   TypeFlags = 1 << 7
	TypeFlagsNumberLiteral   TypeFlags = 1 << 8
	TypeFlagsBooleanLiteral  TypeFlags = 1 << 9
	TypeFlagsEnumLiteral     TypeFlags = 1 << 10 // Always combined with StringLiteral, NumberLiteral, or Union
	TypeFlagsBigIntLiteral   TypeFlags = 1 << 11
	TypeFlagsESSymbol        TypeFlags = 1 << 12 // Type of symbol primitive introduced in ES6
	TypeFlagsUniqueESSymbol  TypeFlags = 1 << 13 // unique symbol
	TypeFlagsVoid            TypeFlags = 1 << 14
	TypeFlagsUndefined       TypeFlags = 1 << 15
	TypeFlagsNull            TypeFlags = 1 << 16
	TypeFlagsNever           TypeFlags = 1 << 17 // Never type
	TypeFlagsTypeParameter   TypeFlags = 1 << 18 // Type parameter
	TypeFlagsObject          TypeFlags = 1 << 19 // Object type
	TypeFlagsUnion           TypeFlags = 1 << 20 // Union (T | U)
	TypeFlagsIntersection    TypeFlags = 1 << 21 // Intersection (T & U)
	TypeFlagsIndex           TypeFlags = 1 << 22 // keyof T
	TypeFlagsIndexedAccess   TypeFlags = 1 << 23 // T[K]
	TypeFlagsConditional     TypeFlags = 1 << 24 // T extends U ? X : Y
	TypeFlagsSubstitution    TypeFlags = 1 << 25 // Type parameter substitution
	TypeFlagsNonPrimitive    TypeFlags = 1 << 26 // intrinsic object type
	TypeFlagsTemplateLiteral TypeFlags = 1 << 27 // Template literal type
	TypeFlagsStringMapping   TypeFlags = 1 << 28 // Uppercase/Lowercase type
	TypeFlagsReserved1       TypeFlags = 1 << 29 // Used by union/intersection type construction
	TypeFlagsReserved2       TypeFlags = 1 << 30 // Used by union/intersection type construction
	TypeFlagsReserved3       TypeFlags = 1 << 31

	TypeFlagsAnyOrUnknown                  = TypeFlagsAny | TypeFlagsUnknown
	TypeFlagsNullable                      = TypeFlagsUndefined | TypeFlagsNull
	TypeFlagsLiteral                       = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral
	TypeFlagsUnit                          = TypeFlagsEnum | TypeFlagsLiteral | TypeFlagsUniqueESSymbol | TypeFlagsNullable
	TypeFlagsFreshable                     = TypeFlagsEnum | TypeFlagsLiteral
	TypeFlagsStringOrNumberLiteral         = TypeFlagsStringLiteral | TypeFlagsNumberLiteral
	TypeFlagsStringOrNumberLiteralOrUnique = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsUniqueESSymbol
	TypeFlagsDefinitelyFalsy               = TypeFlagsStringLiteral | TypeFlagsNumberLiteral | TypeFlagsBigIntLiteral | TypeFlagsBooleanLiteral | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull
	TypeFlagsPossiblyFalsy                 = TypeFlagsDefinitelyFalsy | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsBoolean
	TypeFlagsIntrinsic                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
	TypeFlagsStringLike                    = TypeFlagsString | TypeFlagsStringLiteral | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	TypeFlagsNumberLike                    = TypeFlagsNumber | TypeFlagsNumberLiteral | TypeFlagsEnum
	TypeFlagsBigIntLike                    = TypeFlagsBigInt | TypeFlagsBigIntLiteral
	TypeFlagsBooleanLike                   = TypeFlagsBoolean | TypeFlagsBooleanLiteral
	TypeFlagsEnumLike                      = TypeFlagsEnum | TypeFlagsEnumLiteral
	TypeFlagsESSymbolLike                  = TypeFlagsESSymbol | TypeFlagsUniqueESSymbol
	TypeFlagsVoidLike                      = TypeFlagsVoid | TypeFlagsUndefined
	TypeFlagsPrimitive                     = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
	TypeFlagsDefinitelyNonNullable         = TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsEnumLike | TypeFlagsESSymbolLike | TypeFlagsObject | TypeFlagsNonPrimitive
	TypeFlagsDisjointDomains               = TypeFlagsNonPrimitive | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbolLike | TypeFlagsVoidLike | TypeFlagsNull
	TypeFlagsUnionOrIntersection           = TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsStructuredType                = TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsTypeVariable                  = TypeFlagsTypeParameter | TypeFlagsIndexedAccess
	TypeFlagsInstantiableNonPrimitive      = TypeFlagsTypeVariable | TypeFlagsConditional | TypeFlagsSubstitution
	TypeFlagsInstantiablePrimitive         = TypeFlagsIndex | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	TypeFlagsInstantiable                  = TypeFlagsInstantiableNonPrimitive | TypeFlagsInstantiablePrimitive
	TypeFlagsStructuredOrInstantiable      = TypeFlagsStructuredType | TypeFlagsInstantiable
	TypeFlagsObjectFlagsType               = TypeFlagsAny | TypeFlagsNullable | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection
	TypeFlagsSimplifiable                  = TypeFlagsIndexedAccess | TypeFlagsConditional
	TypeFlagsSingleton                     = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsString | TypeFlagsNumber | TypeFlagsBoolean | TypeFlagsBigInt | TypeFlagsESSymbol | TypeFlagsVoid | TypeFlagsUndefined | TypeFlagsNull | TypeFlagsNever | TypeFlagsNonPrimitive
	// 'TypeFlagsNarrowable' types are types where narrowing actually narrows.
	// This *should* be every type other than null, undefined, void, and never
	TypeFlagsNarrowable = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsStructuredOrInstantiable | TypeFlagsStringLike | TypeFlagsNumberLike | TypeFlagsBigIntLike | TypeFlagsBooleanLike | TypeFlagsESSymbol | TypeFlagsUniqueESSymbol | TypeFlagsNonPrimitive
	// The following flags are aggregated during union and intersection type construction
	TypeFlagsIncludesMask = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsPrimitive | TypeFlagsNever | TypeFlagsObject | TypeFlagsUnion | TypeFlagsIntersection | TypeFlagsNonPrimitive | TypeFlagsTemplateLiteral | TypeFlagsStringMapping
	// The following flags are used for different purposes during union and intersection type construction
	TypeFlagsIncludesMissingType             = TypeFlagsTypeParameter
	TypeFlagsIncludesNonWideningType         = TypeFlagsIndex
	TypeFlagsIncludesWildcard                = TypeFlagsIndexedAccess
	TypeFlagsIncludesEmptyObject             = TypeFlagsConditional
	TypeFlagsIncludesInstantiable            = TypeFlagsSubstitution
	TypeFlagsIncludesConstrainedTypeVariable = TypeFlagsReserved1
	TypeFlagsIncludesError                   = TypeFlagsReserved2
	TypeFlagsNotPrimitiveUnion               = TypeFlagsAny | TypeFlagsUnknown | TypeFlagsVoid | TypeFlagsNever | TypeFlagsObject | TypeFlagsIntersection | TypeFlagsIncludesInstantiable
)

type ObjectFlags uint32

// Types included in TypeFlags.ObjectFlagsType have an objectFlags property. Some ObjectFlags
// are specific to certain types and reuse the same bit position. Those ObjectFlags require a check
// for a certain TypeFlags value to determine their meaning.
// dprint-ignore
const (
	ObjectFlagsNone                                       ObjectFlags = 0
	ObjectFlagsClass                                      ObjectFlags = 1 << 0  // Class
	ObjectFlagsInterface                                  ObjectFlags = 1 << 1  // Interface
	ObjectFlagsReference                                  ObjectFlags = 1 << 2  // Generic type reference
	ObjectFlagsTuple                                      ObjectFlags = 1 << 3  // Synthesized generic tuple type
	ObjectFlagsAnonymous                                  ObjectFlags = 1 << 4  // Anonymous
	ObjectFlagsMapped                                     ObjectFlags = 1 << 5  // Mapped
	ObjectFlagsInstantiated                               ObjectFlags = 1 << 6  // Instantiated anonymous or mapped type
	ObjectFlagsObjectLiteral                              ObjectFlags = 1 << 7  // Originates in an object literal
	ObjectFlagsEvolvingArray                              ObjectFlags = 1 << 8  // Evolving array type
	ObjectFlagsObjectLiteralPatternWithComputedProperties ObjectFlags = 1 << 9  // Object literal pattern with computed properties
	ObjectFlagsReverseMapped                              ObjectFlags = 1 << 10 // Object contains a property from a reverse-mapped type
	ObjectFlagsJsxAttributes                              ObjectFlags = 1 << 11 // Jsx attributes type
	ObjectFlagsJSLiteral                                  ObjectFlags = 1 << 12 // Object type declared in JS - disables errors on read/write of nonexisting members
	ObjectFlagsFreshLiteral                               ObjectFlags = 1 << 13 // Fresh object literal
	ObjectFlagsArrayLiteral                               ObjectFlags = 1 << 14 // Originates in an array literal
	ObjectFlagsPrimitiveUnion                             ObjectFlags = 1 << 15 // Union of only primitive types
	ObjectFlagsContainsWideningType                       ObjectFlags = 1 << 16 // Type is or contains undefined or null widening type
	ObjectFlagsContainsObjectOrArrayLiteral               ObjectFlags = 1 << 17 // Type is or contains object literal type
	ObjectFlagsNonInferrableType                          ObjectFlags = 1 << 18 // Type is or contains anyFunctionType or silentNeverType
	ObjectFlagsCouldContainTypeVariablesComputed          ObjectFlags = 1 << 19 // CouldContainTypeVariables flag has been computed
	ObjectFlagsCouldContainTypeVariables                  ObjectFlags = 1 << 20 // Type could contain a type variable
	ObjectFlagsMembersResolved                            ObjectFlags = 1 << 21 // Members have been resolved

	ObjectFlagsClassOrInterface   = ObjectFlagsClass | ObjectFlagsInterface
	ObjectFlagsRequiresWidening   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral
	ObjectFlagsPropagatingFlags   = ObjectFlagsContainsWideningType | ObjectFlagsContainsObjectOrArrayLiteral | ObjectFlagsNonInferrableType
	ObjectFlagsInstantiatedMapped = ObjectFlagsMapped | ObjectFlagsInstantiated
	// Object flags that uniquely identify the kind of ObjectType
	ObjectFlagsObjectTypeKindMask = ObjectFlagsClassOrInterface | ObjectFlagsReference | ObjectFlagsTuple | ObjectFlagsAnonymous | ObjectFlagsMapped | ObjectFlagsReverseMapped | ObjectFlagsEvolvingArray
	// Flags that require TypeFlags.Object
	ObjectFlagsContainsSpread              = 1 << 22 // Object literal contains spread operation
	ObjectFlagsObjectRestType              = 1 << 23 // Originates in object rest declaration
	ObjectFlagsInstantiationExpressionType = 1 << 24 // Originates in instantiation expression
	ObjectFlagsSingleSignatureType         = 1 << 25 // A single signature type extracted from a potentially broader type
	ObjectFlagsIsClassInstanceClone        = 1 << 26 // Type is a clone of a class instance type
	// Flags that require TypeFlags.Object and ObjectFlags.Reference
	ObjectFlagsIdenticalBaseTypeCalculated = 1 << 27 // has had `getSingleBaseForNonAugmentingSubtype` invoked on it already
	ObjectFlagsIdenticalBaseTypeExists     = 1 << 28 // has a defined cachedEquivalentBaseType member
	// Flags that require TypeFlags.UnionOrIntersection or TypeFlags.Substitution
	ObjectFlagsIsGenericTypeComputed = 1 << 22 // IsGenericObjectType flag has been computed
	ObjectFlagsIsGenericObjectType   = 1 << 23 // Union or intersection contains generic object type
	ObjectFlagsIsGenericIndexType    = 1 << 24 // Union or intersection contains generic index type
	ObjectFlagsIsGenericType         = ObjectFlagsIsGenericObjectType | ObjectFlagsIsGenericIndexType
	// Flags that require TypeFlags.Union
	ObjectFlagsContainsIntersections      = 1 << 25 // Union contains intersections
	ObjectFlagsIsUnknownLikeUnionComputed = 1 << 26 // IsUnknownLikeUnion flag has been computed
	ObjectFlagsIsUnknownLikeUnion         = 1 << 27 // Union of null, undefined, and empty object type
	// Flags that require TypeFlags.Intersection
	ObjectFlagsIsNeverIntersectionComputed = 1 << 25 // IsNeverLike flag has been computed
	ObjectFlagsIsNeverIntersection         = 1 << 26 // Intersection reduces to never
	ObjectFlagsIsConstrainedTypeVariable   = 1 << 27 // T & C, where T's constraint and C are primitives, object, or {}
)

// TypeAlias

type TypeAlias struct {
	symbol        *Symbol
	typeArguments []*Type
}

func (a *TypeAlias) Symbol() *Symbol {
	if a == nil {
		return nil
	}
	return a.symbol
}

func (a *TypeAlias) TypeArguments() []*Type {
	if a == nil {
		return nil
	}
	return a.typeArguments
}

// Type

type Type struct {
	flags       TypeFlags
	objectFlags ObjectFlags
	id          TypeId
	symbol      *Symbol
	alias       *TypeAlias
	data        TypeData // Type specific data
}

// Casts for concrete struct types

func (t *Type) AsIntrinsicType() *IntrinsicType             { return t.data.(*IntrinsicType) }
func (t *Type) AsLiteralType() *LiteralType                 { return t.data.(*LiteralType) }
func (t *Type) AsUniqueESSymbolType() *UniqueESSymbolType   { return t.data.(*UniqueESSymbolType) }
func (t *Type) AsTupleType() *TupleType                     { return t.data.(*TupleType) }
func (t *Type) AsSingleSignatureType() *SingleSignatureType { return t.data.(*SingleSignatureType) }
func (t *Type) AsInstantiationExpressionType() *InstantiationExpressionType {
	return t.data.(*InstantiationExpressionType)
}
func (t *Type) AsMappedType() *MappedType                   { return t.data.(*MappedType) }
func (t *Type) AsReverseMappedType() *ReverseMappedType     { return t.data.(*ReverseMappedType) }
func (t *Type) AsTypeParameter() *TypeParameter             { return t.data.(*TypeParameter) }
func (t *Type) AsUnionType() *UnionType                     { return t.data.(*UnionType) }
func (t *Type) AsIntersectionType() *IntersectionType       { return t.data.(*IntersectionType) }
func (t *Type) AsIndexType() *IndexType                     { return t.data.(*IndexType) }
func (t *Type) AsIndexedAccessType() *IndexedAccessType     { return t.data.(*IndexedAccessType) }
func (t *Type) AsTemplateLiteralType() *TemplateLiteralType { return t.data.(*TemplateLiteralType) }
func (t *Type) AsStringMappingType() *StringMappingType     { return t.data.(*StringMappingType) }
func (t *Type) AsSubstitutionType() *SubstitutionType       { return t.data.(*SubstitutionType) }
func (t *Type) AsConditionalType() *ConditionalType         { return t.data.(*ConditionalType) }

// Casts for embedded struct types

func (t *Type) AsStructuredType() *StructuredType { return t.data.AsStructuredType() }
func (t *Type) AsObjectType() *ObjectType         { return t.data.AsObjectType() }
func (t *Type) AsTypeReference() *TypeReference   { return t.data.AsTypeReference() }
func (t *Type) AsInterfaceType() *InterfaceType   { return t.data.AsInterfaceType() }
func (t *Type) AsUnionOrIntersectionType() *UnionOrIntersectionType {
	return t.data.AsUnionOrIntersectionType()
}

// Common accessors

func (t *Type) Target() *Type {
	switch {
	case t.flags&TypeFlagsObject != 0:
		return t.AsObjectType().target
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.AsTypeParameter().target
	case t.flags&TypeFlagsIndex != 0:
		return t.AsIndexType().target
	case t.flags&TypeFlagsStringMapping != 0:
		return t.AsStringMappingType().target
	}
	panic("Unhandled case in Type.Target")
}

func (t *Type) Mapper() *TypeMapper {
	switch {
	case t.flags&TypeFlagsObject != 0:
		return t.AsObjectType().mapper
	case t.flags&TypeFlagsTypeParameter != 0:
		return t.AsTypeParameter().mapper
	case t.flags&TypeFlagsConditional != 0:
		return t.AsConditionalType().mapper
	}
	panic("Unhandled case in Type.Mapper")
}

func (t *Type) Types() []*Type {
	return t.AsUnionOrIntersectionType().types
}

func (t *Type) TargetInterfaceType() *InterfaceType {
	return t.AsTypeReference().target.AsInterfaceType()
}

func (t *Type) TargetTupleType() *TupleType {
	return t.AsTypeReference().target.AsTupleType()
}

// TypeData

type TypeData interface {
	AsType() *Type
	AsStructuredType() *StructuredType
	AsObjectType() *ObjectType
	AsTypeReference() *TypeReference
	AsInterfaceType() *InterfaceType
	AsUnionOrIntersectionType() *UnionOrIntersectionType
}

// TypeBase

type TypeBase struct {
	Type
}

func (t *TypeBase) AsType() *Type                     { return &t.Type }
func (t *TypeBase) AsStructuredType() *StructuredType { return nil }
func (t *TypeBase) AsObjectType() *ObjectType         { return nil }
func (t *TypeBase) AsTypeReference() *TypeReference   { return nil }

// IntrinsicTypeData

type IntrinsicType struct {
	TypeBase
	intrinsicName string
}

// LiteralTypeData

type LiteralType struct {
	TypeBase
	value       any   // string | float64 | bool | PseudoBigInt | nil (computed enum)
	freshType   *Type // Fresh version of type
	regularType *Type // Regular version of type
}

type PseudoBigInt struct {
	negative    bool
	base10Value string
}

// UniqueESSymbolTypeData

type UniqueESSymbolType struct {
	TypeBase
	name string
}

// StructuredType (base of all types with members)

type StructuredType struct {
	TypeBase
	members            SymbolTable
	properties         []*Symbol
	signatures         []*Signature // Signatures (call + construct)
	callSignatureCount int          // Count of call signatures
	indexInfos         []*IndexInfo
}

func (t *StructuredType) AsStructuredType() *StructuredType { return t }

func (t *StructuredType) CallSignatures() []*Signature {
	return slices.Clip(t.signatures[:t.callSignatureCount])
}

func (t *StructuredType) ConstructSignatures() []*Signature {
	return slices.Clip(t.signatures[t.callSignatureCount:])
}

// ObjectType (base of all instantiable object types)
// Instances of ObjectType or derived types have the following ObjectFlags:
// ObjectType (ObjectFlagsAnonymous)
//   TypeReference (ObjectFlagsReference)
//     InterfaceType (ObjectFlagsReference | (ObjectFlagsClass|ObjectFlagsInterface))
//       TupleType (ObjectFlagsReference | ObjectFlagsTuple)
//   SingleSignatureType (ObjectFlagsAnonymous|ObjectFlagsSingleSignatureType)
//   InstantiationExpressionType (ObjectFlagsAnonymous|ObjectFlagsInstantiationExpressionType)
//   MappedType (ObjectFlagsAnonymous|ObjectFlagsMapped)
//   ReverseMapped (ObjectFlagsReverseMapped)

type ObjectType struct {
	StructuredType
	target         *Type            // Target of instantiated type
	mapper         *TypeMapper      // Type mapper for instantiated type
	instantiations map[string]*Type // Map of type instantiations
}

func (t *ObjectType) AsObjectType() *ObjectType { return t }

// TypeReference (instantiation of an InterfaceType)

type TypeReference struct {
	ObjectType
	node                  *Node // TypeReferenceNode | ArrayTypeNode | TupleTypeNode when deferred, else nil
	resolvedTypeArguments []*Type
}

func (t *TypeReference) AsTypeReference() *TypeReference { return t }

// InterfaceType (when generic, serves as reference to instantiation of itself)

type InterfaceType struct {
	TypeReference
	allTypeParameters           []*Type // Type parameters (outer + local + thisType)
	outerTypeParameterCount     int     // Count of outer type parameters
	thisType                    *Type   // The "this" type (nil if none)
	variances                   []VarianceFlags
	baseTypesResolved           bool
	declaredMembersResolved     bool
	resolvedBaseConstructorType *Type
	resolvedBaseTypes           []*Type
	declaredMembers             SymbolTable  // Declared members
	declaredCallSignatures      []*Signature // Declared call signatures
	declaredConstructSignatures []*Signature // Declared construct signatures
	declaredIndexInfos          []*IndexInfo // Declared index signatures
}

func (t *InterfaceType) AsInterfaceType() *InterfaceType { return t }

func (t *InterfaceType) OuterTypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[:t.outerTypeParameterCount])
}

func (t *InterfaceType) LocalTypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[t.outerTypeParameterCount : len(t.allTypeParameters)-1])
}

func (t *InterfaceType) TypeParameters() []*Type {
	if len(t.allTypeParameters) == 0 {
		return nil
	}
	return slices.Clip(t.allTypeParameters[:len(t.allTypeParameters)-1])
}

// TupleType

type ElementFlags uint32

const (
	ElementFlagsNone        ElementFlags = 0
	ElementFlagsRequired    ElementFlags = 1 << 0 // T
	ElementFlagsOptional    ElementFlags = 1 << 1 // T?
	ElementFlagsRest        ElementFlags = 1 << 2 // ...T[]
	ElementFlagsVariadic    ElementFlags = 1 << 3 // ...T
	ElementFlagsFixed                    = ElementFlagsRequired | ElementFlagsOptional
	ElementFlagsVariable                 = ElementFlagsRest | ElementFlagsVariadic
	ElementFlagsNonRequired              = ElementFlagsOptional | ElementFlagsRest | ElementFlagsVariadic
	ElementFlagsNonRest                  = ElementFlagsRequired | ElementFlagsOptional | ElementFlagsVariadic
)

type TupleElementInfo struct {
	flags              ElementFlags
	labeledDeclaration *Node // NamedTupleMember | ParameterDeclaration | nil
}

type TupleType struct {
	InterfaceType
	elementInfos  []TupleElementInfo
	minLength     int // Number of required or variadic elements
	fixedLength   int // Number of initial required or optional elements
	combinedFlags ElementFlags
	readonly      bool
}

// SingleSignatureType

type SingleSignatureType struct {
	ObjectType
	outerTypeParameters []*Type
}

// InstantiationExpressionType

type InstantiationExpressionType struct {
	ObjectType
	node *Node
}

// MappedType

type MappedType struct {
	ObjectType
	declaration          MappedTypeNode
	typeParameter        *Type
	constraintType       *Type
	nameType             *Type
	templateType         *Type
	modifiersType        *Type
	resolvedApparentType *Type
	containsError        bool
}

// ReverseMappedType

type ReverseMappedType struct {
	ObjectType
	source         *Type
	mappedType     *Type
	constraintType *Type
}

// UnionOrIntersectionTypeData

type UnionOrIntersectionType struct {
	StructuredType
	types                                       []*Type
	propertyCache                               SymbolTable
	propertyCacheWithoutFunctionPropertyAugment SymbolTable
	resolvedProperties                          []*Symbol
	resolvedBaseConstraint                      *Type
}

func (t *UnionOrIntersectionType) AsUnionOrIntersectionType() *UnionOrIntersectionType { return t }

// UnionType

type UnionType struct {
	UnionOrIntersectionType
	resolvedReducedType *Type
	regularType         *Type
	origin              *Type            // Denormalized union, intersection, or index type in which union originates
	keyPropertyName     string           // Property with unique unit type that exists in every object/intersection in union type
	constituentMap      map[TypeId]*Type // Constituents keyed by unit type discriminants
}

// IntersectionType

type IntersectionType struct {
	UnionOrIntersectionType
	resolvedApparentType             *Type
	uniqueLiteralFilledInstantiation *Type // Instantiation with type parameters mapped to never type
}

// TypeParameter

type TypeParameter struct {
	TypeBase
	constraint          *Type
	target              *Type
	mapper              *TypeMapper
	isThisType          bool
	resolvedDefaultType *Type
}

// IndexFlags

type IndexFlags uint32

const (
	IndexFlagsNone              IndexFlags = 0
	IndexFlagsStringsOnly       IndexFlags = 1 << 0
	IndexFlagsNoIndexSignatures IndexFlags = 1 << 1
	IndexFlagsNoReducibleCheck  IndexFlags = 1 << 2
)

// IndexType

type IndexType struct {
	TypeBase
	target     *Type
	indexFlags IndexFlags
}

// IndexedAccessType

type IndexedAccessType struct {
	TypeBase
	objectType  *Type
	indexType   *Type
	accessFlags AccessFlags // Only includes AccessFlags.Persistent
}

type TemplateLiteralType struct {
	TypeBase
	texts []string // Always one element longer than types
	types []*Type  // Always at least one element
}

type StringMappingType struct {
	TypeBase
	target *Type
}

type SubstitutionType struct {
	TypeBase
	baseType   *Type // Target type
	constraint *Type // Constraint that target type is known to satisfy
}

type ConditionalRoot struct {
	node                *Node // ConditionalTypeNode
	checkType           *Type
	extendsType         *Type
	isDistributive      bool
	inferTypeParameters []*Type
	outerTypeParameters []*Type
	instantiations      map[string]*Type
	alias               *TypeAlias
}

type ConditionalType struct {
	TypeBase
	root                             *ConditionalRoot
	checkType                        *Type
	extendsType                      *Type
	resolvedTrueType                 *Type
	resolvedFalseType                *Type
	resolvedInferredTrueType         *Type // The `trueType` instantiated with the `combinedMapper`, if present
	resolvedDefaultConstraint        *Type
	resolvedConstraintOfDistributive *Type
	mapper                           *TypeMapper
	combinedMapper                   *TypeMapper
}

// SignatureFlags

type SignatureFlags uint32

const (
	SignatureFlagsNone SignatureFlags = 0
	// Propagating flags
	SignatureFlagsHasRestParameter SignatureFlags = 1 << 0 // Indicates last parameter is rest parameter
	SignatureFlagsHasLiteralTypes  SignatureFlags = 1 << 1 // Indicates signature is specialized
	SignatureFlagsAbstract         SignatureFlags = 1 << 2 // Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type
	// Non-propagating flags
	SignatureFlagsIsInnerCallChain                       SignatureFlags = 1 << 3 // Indicates signature comes from a CallChain nested in an outer OptionalChain
	SignatureFlagsIsOuterCallChain                       SignatureFlags = 1 << 4 // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
	SignatureFlagsIsUntypedSignatureInJSFile             SignatureFlags = 1 << 5 // Indicates signature is from a js file and has no types
	SignatureFlagsIsNonInferrable                        SignatureFlags = 1 << 6 // Indicates signature comes from a non-inferrable type
	SignatureFlagsIsSignatureCandidateForOverloadFailure SignatureFlags = 1 << 7
	// We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
	// attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
	// instantiating the return type.
	SignatureFlagsPropagatingFlags = SignatureFlagsHasRestParameter | SignatureFlagsHasLiteralTypes | SignatureFlagsAbstract | SignatureFlagsIsUntypedSignatureInJSFile | SignatureFlagsIsSignatureCandidateForOverloadFailure
	SignatureFlagsCallChainFlags   = SignatureFlagsIsInnerCallChain | SignatureFlagsIsOuterCallChain
)

// Signature

type Signature struct {
	flags                 SignatureFlags
	minArgumentCount      int32
	declaration           *Node
	typeParameters        []*Type
	parameters            []*Symbol
	thisParameter         *Symbol
	resolvedReturnType    *Type
	resolvedTypePredicate *Type
	target                *Signature
	mapper                *TypeMapper
	instantiations        map[string]*Signature
	isolatedSignatureType *Type
}

// IndexInfo

type IndexInfo struct {
	keyType     *Type
	valueType   *Type
	isReadonly  bool
	declaration *Node // IndexSignatureDeclaration
}

/**
 * Ternary values are defined such that
 * x & y picks the lesser in the order False < Unknown < Maybe < True, and
 * x | y picks the greater in the order False < Unknown < Maybe < True.
 * Generally, Ternary.Maybe is used as the result of a relation that depends on itself, and
 * Ternary.Unknown is used as the result of a variance check that depends on itself. We make
 * a distinction because we don't want to cache circular variance check results.
 */
type Ternary int8

const (
	TernaryFalse   Ternary = 0
	TernaryUnknown Ternary = 1
	TernaryMaybe   Ternary = 3
	TernaryTrue    Ternary = -1
)

type LanguageFeatureMinimumTargetMap struct {
	Classes                           ScriptTarget
	ForOf                             ScriptTarget
	Generators                        ScriptTarget
	Iteration                         ScriptTarget
	SpreadElements                    ScriptTarget
	RestElements                      ScriptTarget
	TaggedTemplates                   ScriptTarget
	DestructuringAssignment           ScriptTarget
	BindingPatterns                   ScriptTarget
	ArrowFunctions                    ScriptTarget
	BlockScopedVariables              ScriptTarget
	ObjectAssign                      ScriptTarget
	RegularExpressionFlagsUnicode     ScriptTarget
	RegularExpressionFlagsSticky      ScriptTarget
	Exponentiation                    ScriptTarget
	AsyncFunctions                    ScriptTarget
	ForAwaitOf                        ScriptTarget
	AsyncGenerators                   ScriptTarget
	AsyncIteration                    ScriptTarget
	ObjectSpreadRest                  ScriptTarget
	RegularExpressionFlagsDotAll      ScriptTarget
	BindinglessCatch                  ScriptTarget
	BigInt                            ScriptTarget
	NullishCoalesce                   ScriptTarget
	OptionalChaining                  ScriptTarget
	LogicalAssignment                 ScriptTarget
	TopLevelAwait                     ScriptTarget
	ClassFields                       ScriptTarget
	PrivateNamesAndClassStaticBlocks  ScriptTarget
	RegularExpressionFlagsHasIndices  ScriptTarget
	ShebangComments                   ScriptTarget
	UsingAndAwaitUsing                ScriptTarget
	ClassAndClassElementDecorators    ScriptTarget
	RegularExpressionFlagsUnicodeSets ScriptTarget
}

var LanguageFeatureMinimumTarget = LanguageFeatureMinimumTargetMap{
	Classes:                           ScriptTargetES2015,
	ForOf:                             ScriptTargetES2015,
	Generators:                        ScriptTargetES2015,
	Iteration:                         ScriptTargetES2015,
	SpreadElements:                    ScriptTargetES2015,
	RestElements:                      ScriptTargetES2015,
	TaggedTemplates:                   ScriptTargetES2015,
	DestructuringAssignment:           ScriptTargetES2015,
	BindingPatterns:                   ScriptTargetES2015,
	ArrowFunctions:                    ScriptTargetES2015,
	BlockScopedVariables:              ScriptTargetES2015,
	ObjectAssign:                      ScriptTargetES2015,
	RegularExpressionFlagsUnicode:     ScriptTargetES2015,
	RegularExpressionFlagsSticky:      ScriptTargetES2015,
	Exponentiation:                    ScriptTargetES2016,
	AsyncFunctions:                    ScriptTargetES2017,
	ForAwaitOf:                        ScriptTargetES2018,
	AsyncGenerators:                   ScriptTargetES2018,
	AsyncIteration:                    ScriptTargetES2018,
	ObjectSpreadRest:                  ScriptTargetES2018,
	RegularExpressionFlagsDotAll:      ScriptTargetES2018,
	BindinglessCatch:                  ScriptTargetES2019,
	BigInt:                            ScriptTargetES2020,
	NullishCoalesce:                   ScriptTargetES2020,
	OptionalChaining:                  ScriptTargetES2020,
	LogicalAssignment:                 ScriptTargetES2021,
	TopLevelAwait:                     ScriptTargetES2022,
	ClassFields:                       ScriptTargetES2022,
	PrivateNamesAndClassStaticBlocks:  ScriptTargetES2022,
	RegularExpressionFlagsHasIndices:  ScriptTargetES2022,
	ShebangComments:                   ScriptTargetESNext,
	UsingAndAwaitUsing:                ScriptTargetESNext,
	ClassAndClassElementDecorators:    ScriptTargetESNext,
	RegularExpressionFlagsUnicodeSets: ScriptTargetESNext,
}
