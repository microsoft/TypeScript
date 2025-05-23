package ls

import (
	"context"
	"fmt"
	"maps"
	"slices"
	"strings"
	"sync"
	"unicode"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func (l *LanguageService) ProvideCompletion(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	position lsproto.Position,
	context *lsproto.CompletionContext,
	clientOptions *lsproto.CompletionClientCapabilities,
	preferences *UserPreferences,
) (*lsproto.CompletionList, error) {
	program, file := l.getProgramAndFile(documentURI)
	return l.getCompletionsAtPosition(
		ctx,
		program,
		file,
		int(l.converters.LineAndCharacterToPosition(file, position)),
		context,
		preferences,
		clientOptions,
	), nil
}

// *completionDataData | *completionDataKeyword
type completionData = any

type completionDataData struct {
	symbols          []*ast.Symbol
	completionKind   CompletionKind
	isInSnippetScope bool
	// Note that the presence of this alone doesn't mean that we need a conversion. Only do that if the completion is not an ordinary identifier.
	propertyAccessToConvert      *ast.PropertyAccessExpressionNode
	isNewIdentifierLocation      bool
	location                     *ast.Node
	keywordFilters               KeywordCompletionFilters
	literals                     []literalValue
	symbolToOriginInfoMap        map[ast.SymbolId]*symbolOriginInfo
	symbolToSortTextMap          map[ast.SymbolId]sortText
	recommendedCompletion        *ast.Symbol
	previousToken                *ast.Node
	contextToken                 *ast.Node
	jsxInitializer               jsxInitializer
	insideJSDocTagTypeExpression bool
	isTypeOnlyLocation           bool
	// In JSX tag name and attribute names, identifiers like "my-tag" or "aria-name" is valid identifier.
	isJsxIdentifierExpected   bool
	isRightOfOpenTag          bool
	isRightOfDotOrQuestionDot bool
	importStatementCompletion any  // !!!
	hasUnresolvedAutoImports  bool // !!!
	// flags CompletionInfoFlags // !!!
	defaultCommitCharacters []string
}

type completionDataKeyword struct {
	keywordCompletions      []*lsproto.CompletionItem
	isNewIdentifierLocation bool
}

type importStatementCompletionInfo struct {
	// !!!
}

// If we're after the `=` sign but no identifier has been typed yet,
// value will be `true` but initializer will be `nil`.
type jsxInitializer struct {
	isInitializer bool
	initializer   *ast.IdentifierNode
}

type KeywordCompletionFilters int

const (
	KeywordCompletionFiltersNone                         KeywordCompletionFilters = iota // No keywords
	KeywordCompletionFiltersAll                                                          // Every possible kewyord
	KeywordCompletionFiltersClassElementKeywords                                         // Keywords inside class body
	KeywordCompletionFiltersInterfaceElementKeywords                                     // Keywords inside interface body
	KeywordCompletionFiltersConstructorParameterKeywords                                 // Keywords at constructor parameter
	KeywordCompletionFiltersFunctionLikeBodyKeywords                                     // Keywords at function like body
	KeywordCompletionFiltersTypeAssertionKeywords
	KeywordCompletionFiltersTypeKeywords
	KeywordCompletionFiltersTypeKeyword // Literally just `type`
	KeywordCompletionFiltersLast        = KeywordCompletionFiltersTypeKeyword
)

type CompletionKind int

const (
	CompletionKindNone CompletionKind = iota
	CompletionKindObjectPropertyDeclaration
	CompletionKindGlobal
	CompletionKindPropertyAccess
	CompletionKindMemberLike
	CompletionKindString
)

var TriggerCharacters = []string{".", `"`, "'", "`", "/", "@", "<", "#", " "}

// All commit characters, valid when `isNewIdentifierLocation` is false.
var allCommitCharacters = []string{".", ",", ";"}

// Commit characters valid at expression positions where we could be inside a parameter list.
var noCommaCommitCharacters = []string{".", ";"}

var emptyCommitCharacters = []string{}

type sortText string

const (
	SortTextLocalDeclarationPriority         sortText = "10"
	SortTextLocationPriority                 sortText = "11"
	SortTextOptionalMember                   sortText = "12"
	SortTextMemberDeclaredBySpreadAssignment sortText = "13"
	SortTextSuggestedClassMembers            sortText = "14"
	SortTextGlobalsOrKeywords                sortText = "15"
	SortTextAutoImportSuggestions            sortText = "16"
	SortTextClassMemberSnippets              sortText = "17"
	SortTextJavascriptIdentifiers            sortText = "18"
)

func DeprecateSortText(original sortText) sortText {
	return "z" + original
}

func sortBelow(original sortText) sortText {
	return original + "1"
}

type symbolOriginInfoKind int

const (
	symbolOriginInfoKindThisType symbolOriginInfoKind = 1 << iota
	symbolOriginInfoKindSymbolMember
	symbolOriginInfoKindExport
	symbolOriginInfoKindPromise
	symbolOriginInfoKindNullable
	symbolOriginInfoKindResolvedExport
	symbolOriginInfoKindTypeOnlyAlias
	symbolOriginInfoKindObjectLiteralMethod
	symbolOriginInfoKindIgnore
	symbolOriginInfoKindComputedPropertyName

	symbolOriginInfoKindSymbolMemberNoExport symbolOriginInfoKind = symbolOriginInfoKindSymbolMember
	symbolOriginInfoKindSymbolMemberExport                        = symbolOriginInfoKindSymbolMember | symbolOriginInfoKindExport
)

type symbolOriginInfo struct {
	kind              symbolOriginInfoKind
	isDefaultExport   bool
	isFromPackageJson bool
	fileName          string
	data              any
}

func (s *symbolOriginInfo) symbolName() string {
	switch s.data.(type) {
	case *symbolOriginInfoExport:
		return s.data.(*symbolOriginInfoExport).symbolName
	case *symbolOriginInfoResolvedExport:
		return s.data.(*symbolOriginInfoResolvedExport).symbolName
	default:
		panic(fmt.Sprintf("symbolOriginInfo: unknown data type for symbolName(): %T", s.data))
	}
}

type symbolOriginInfoExport struct {
	symbolName      string
	moduleSymbol    *ast.Symbol
	isDefaultExport bool
	exporName       string
	// exportMapKey  ExportMapInfoKey // !!!
}

func (s *symbolOriginInfo) asExport() *symbolOriginInfoExport {
	return s.data.(*symbolOriginInfoExport)
}

type symbolOriginInfoResolvedExport struct {
	symbolName   string
	moduleSymbol *ast.Symbol
	exportName   string
	// exportMapKey ExportMapInfoKey // !!!
	moduleSpecifier string
}

func (s *symbolOriginInfo) asResolvedExport() *symbolOriginInfoResolvedExport {
	return s.data.(*symbolOriginInfoResolvedExport)
}

type symbolOriginInfoObjectLiteralMethod struct {
	insertText   string
	labelDetails *lsproto.CompletionItemLabelDetails
	isSnippet    bool
}

func (s *symbolOriginInfo) asObjectLiteralMethod() *symbolOriginInfoObjectLiteralMethod {
	return s.data.(*symbolOriginInfoObjectLiteralMethod)
}

type symbolOriginInfoTypeOnlyAlias struct {
	declaration *ast.TypeOnlyImportDeclaration
}

type symbolOriginInfoComputedPropertyName struct {
	symbolName string
}

// Special values for `CompletionInfo['source']` used to disambiguate
// completion items with the same `name`. (Each completion item must
// have a unique name/source combination, because those two fields
// comprise `CompletionEntryIdentifier` in `getCompletionEntryDetails`.
//
// When the completion item is an auto-import suggestion, the source
// is the module specifier of the suggestion. To avoid collisions,
// the values here should not be a module specifier we would ever
// generate for an auto-import.
type completionSource string

const (
	// Completions that require `this.` insertion text.
	completionSourceThisProperty completionSource = "ThisProperty/"
	// Auto-import that comes attached to a class member snippet.
	completionSourceClassMemberSnippet completionSource = "ClassMemberSnippet/"
	// A type-only import that needs to be promoted in order to be used at the completion location.
	completionSourceTypeOnlyAlias completionSource = "TypeOnlyAlias/"
	// Auto-import that comes attached to an object literal method snippet.
	completionSourceObjectLiteralMethodSnippet completionSource = "ObjectLiteralMethodSnippet/"
	// Case completions for switch statements.
	completionSourceSwitchCases completionSource = "SwitchCases/"
	// Completions for an object literal expression.
	completionSourceObjectLiteralMemberWithComma completionSource = "ObjectLiteralMemberWithComma/"
)

// Value is set to false for global variables or completions from external module exports,
// true otherwise.
type uniqueNamesMap = map[string]bool

// string | jsnum.Number | PseudoBigInt
type literalValue any

type globalsSearch int

const (
	globalsSearchContinue globalsSearch = iota
	globalsSearchSuccess
	globalsSearchFail
)

func (l *LanguageService) getCompletionsAtPosition(
	ctx context.Context,
	program *compiler.Program,
	file *ast.SourceFile,
	position int,
	context *lsproto.CompletionContext,
	preferences *UserPreferences,
	clientOptions *lsproto.CompletionClientCapabilities,
) *lsproto.CompletionList {
	_, previousToken := getRelevantTokens(position, file)
	if context.TriggerCharacter != nil && !IsInString(file, position, previousToken) && !isValidTrigger(file, *context.TriggerCharacter, previousToken, position) {
		return nil
	}

	if context.TriggerCharacter != nil && *context.TriggerCharacter == " " {
		// `isValidTrigger` ensures we are at `import |`
		if ptrIsTrue(preferences.IncludeCompletionsForImportStatements) {
			return &lsproto.CompletionList{
				IsIncomplete: true,
			}
		}
		return nil
	}

	compilerOptions := program.GetCompilerOptions()

	// !!! see if incomplete completion list and continue or clean

	stringCompletions := l.getStringLiteralCompletions(
		ctx,
		file,
		position,
		previousToken,
		compilerOptions,
		program,
		preferences,
		clientOptions,
	)
	if stringCompletions != nil {
		return stringCompletions
	}

	if previousToken != nil && ast.IsBreakOrContinueStatement(previousToken.Parent) &&
		(previousToken.Kind == ast.KindBreakKeyword ||
			previousToken.Kind == ast.KindContinueKeyword ||
			previousToken.Kind == ast.KindIdentifier) {
		return l.getLabelCompletionsAtPosition(previousToken.Parent, clientOptions, file, position)
	}

	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	data := getCompletionData(program, checker, file, position, preferences)
	if data == nil {
		return nil
	}

	switch data := data.(type) {
	case *completionDataData:
		response := l.completionInfoFromData(
			ctx,
			file,
			program,
			compilerOptions,
			data,
			preferences,
			position,
			clientOptions,
		)
		// !!! check if response is incomplete
		return response
	case *completionDataKeyword:
		return specificKeywordCompletionInfo(clientOptions, data.keywordCompletions, data.isNewIdentifierLocation)
	// !!! jsdoc completion data cases
	default:
		panic("getCompletionData() returned unexpected type: " + fmt.Sprintf("%T", data))
	}
}

func getCompletionData(program *compiler.Program, typeChecker *checker.Checker, file *ast.SourceFile, position int, preferences *UserPreferences) completionData {
	inCheckedFile := isCheckedFile(file, program.GetCompilerOptions())

	currentToken := astnav.GetTokenAtPosition(file, position)

	insideComment := isInComment(file, position, currentToken)

	insideJSDocTagTypeExpression := false
	insideJsDocImportTag := false
	isInSnippetScope := false
	if insideComment != nil {
		// !!! jsdoc
	}

	// The decision to provide completion depends on the contextToken, which is determined through the previousToken.
	// Note: 'previousToken' (and thus 'contextToken') can be undefined if we are the beginning of the file
	isJSOnlyLocation := !insideJSDocTagTypeExpression && !insideJsDocImportTag && ast.IsSourceFileJS(file)
	contextToken, previousToken := getRelevantTokens(position, file)

	// Find the node where completion is requested on.
	// Also determine whether we are trying to complete with members of that node
	// or attributes of a JSX tag.
	node := currentToken
	var propertyAccessToConvert *ast.PropertyAccessExpressionNode
	isRightOfDot := false
	isRightOfQuestionDot := false
	isRightOfOpenTag := false
	isStartingCloseTag := false
	var jsxInitializer jsxInitializer
	isJsxIdentifierExpected := false
	var importStatementCompletion *importStatementCompletionInfo
	location := astnav.GetTouchingPropertyName(file, position)
	keywordFilters := KeywordCompletionFiltersNone
	isNewIdentifierLocation := false
	// !!!
	// flags := CompletionInfoFlagsNone
	var defaultCommitCharacters []string

	if contextToken != nil {
		// !!! import completions

		parent := contextToken.Parent
		if contextToken.Kind == ast.KindDotToken || contextToken.Kind == ast.KindQuestionDotToken {
			isRightOfDot = contextToken.Kind == ast.KindDotToken
			isRightOfQuestionDot = contextToken.Kind == ast.KindQuestionDotToken
			switch parent.Kind {
			case ast.KindPropertyAccessExpression:
				propertyAccessToConvert = parent
				node = propertyAccessToConvert.Expression()
				leftMostAccessExpression := ast.GetLeftmostAccessExpression(parent)
				if ast.NodeIsMissing(leftMostAccessExpression) ||
					((ast.IsCallExpression(node) || ast.IsFunctionLike(node)) &&
						node.End() == contextToken.Pos() &&
						getLastChild(node, file).Kind != ast.KindCloseParenToken) {
					// This is likely dot from incorrectly parsed expression and user is starting to write spread
					// eg: Math.min(./**/)
					// const x = function (./**/) {}
					// ({./**/})
					return nil
				}
			case ast.KindQualifiedName:
				node = parent.AsQualifiedName().Left
			case ast.KindModuleDeclaration:
				node = parent.Name()
			case ast.KindImportType:
				node = parent
			case ast.KindMetaProperty:
				node = getFirstToken(parent, file)
				if node.Kind != ast.KindImportKeyword && node.Kind != ast.KindNewKeyword {
					panic("Unexpected token kind: " + node.Kind.String())
				}
			default:
				// There is nothing that precedes the dot, so this likely just a stray character
				// or leading into a '...' token. Just bail out instead.
				return nil
			}
		} else { // !!! else if (!importStatementCompletion)
			// <UI.Test /* completion position */ />
			// If the tagname is a property access expression, we will then walk up to the top most of property access expression.
			// Then, try to get a JSX container and its associated attributes type.
			if parent != nil && parent.Kind == ast.KindPropertyAccessExpression {
				contextToken = parent
				parent = parent.Parent
			}

			// Fix location
			if parent == location {
				switch currentToken.Kind {
				case ast.KindGreaterThanToken:
					if parent.Kind == ast.KindJsxElement || parent.Kind == ast.KindJsxOpeningElement {
						location = currentToken
					}
				case ast.KindSlashToken:
					if parent.Kind == ast.KindJsxSelfClosingElement {
						location = currentToken
					}
				}
			}

			switch parent.Kind {
			case ast.KindJsxClosingElement:
				if contextToken.Kind == ast.KindSlashToken {
					isStartingCloseTag = true
					location = contextToken
				}
			case ast.KindBinaryExpression:
				if !binaryExpressionMayBeOpenTag(parent.AsBinaryExpression()) {
					break
				}
				fallthrough
			case ast.KindJsxSelfClosingElement, ast.KindJsxElement, ast.KindJsxOpeningElement:
				isJsxIdentifierExpected = true
				if contextToken.Kind == ast.KindLessThanToken {
					isRightOfOpenTag = true
					location = contextToken
				}
			case ast.KindJsxExpression, ast.KindJsxSpreadAttribute:
				// First case is for `<div foo={true} [||] />` or `<div foo={true} [||] ></div>`,
				// `parent` will be `{true}` and `previousToken` will be `}`.
				// Second case is for `<div foo={true} t[||] ></div>`.
				// Second case must not match for `<div foo={undefine[||]}></div>`.
				if previousToken.Kind == ast.KindCloseBraceToken ||
					previousToken.Kind == ast.KindIdentifier && previousToken.Parent.Kind == ast.KindJsxAttribute {
					isJsxIdentifierExpected = true
				}
			case ast.KindJsxAttribute:
				// For `<div className="x" [||] ></div>`, `parent` will be JsxAttribute and `previousToken` will be its initializer.
				if parent.Initializer() == previousToken && previousToken.End() < position {
					isJsxIdentifierExpected = true
				} else {
					switch previousToken.Kind {
					case ast.KindEqualsToken:
						jsxInitializer.isInitializer = true
					case ast.KindIdentifier:
						isJsxIdentifierExpected = true
						// For `<div x=[|f/**/|]`, `parent` will be `x` and `previousToken.parent` will be `f` (which is its own JsxAttribute).
						// Note for `<div someBool f>` we don't want to treat this as a jsx inializer, instead it's the attribute name.
						if parent != previousToken.Parent &&
							parent.Initializer() == nil &&
							findChildOfKind(parent, ast.KindEqualsToken, file) != nil {
							jsxInitializer.initializer = previousToken
						}
					}
				}
			}
		}
	}

	completionKind := CompletionKindNone
	hasUnresolvedAutoImports := false
	// This also gets mutated in nested-functions after the return
	var symbols []*ast.Symbol
	symbolToOriginInfoMap := map[ast.SymbolId]*symbolOriginInfo{}
	symbolToSortTextMap := map[ast.SymbolId]sortText{}
	// var importSpecifierResolver any // !!! import
	var seenPropertySymbols core.Set[ast.SymbolId]
	isTypeOnlyLocation := insideJSDocTagTypeExpression || insideJsDocImportTag ||
		importStatementCompletion != nil && ast.IsTypeOnlyImportOrExportDeclaration(location.Parent) ||
		!isContextTokenValueLocation(contextToken) &&
			(isPossiblyTypeArgumentPosition(contextToken, file, typeChecker) ||
				ast.IsPartOfTypeNode(location) ||
				isContextTokenTypeLocation(contextToken))
	// var getModuleSpecifierResolutionHost any // !!! auto import

	addSymbolOriginInfo := func(symbol *ast.Symbol, insertQuestionDot bool, insertAwait bool) {
		symbolId := ast.GetSymbolId(symbol)
		if insertAwait && seenPropertySymbols.AddIfAbsent(symbolId) {
			symbolToOriginInfoMap[symbolId] = &symbolOriginInfo{kind: getNullableSymbolOriginInfoKind(symbolOriginInfoKindPromise, insertQuestionDot)}
		} else if insertQuestionDot {
			symbolToOriginInfoMap[symbolId] = &symbolOriginInfo{kind: symbolOriginInfoKindNullable}
		}
	}

	addSymbolSortInfo := func(symbol *ast.Symbol) {
		symbolId := ast.GetSymbolId(symbol)
		if isStaticProperty(symbol) {
			symbolToSortTextMap[symbolId] = SortTextLocalDeclarationPriority
		}
	}

	addPropertySymbol := func(symbol *ast.Symbol, insertAwait bool, insertQuestionDot bool) {
		// For a computed property with an accessible name like `Symbol.iterator`,
		// we'll add a completion for the *name* `Symbol` instead of for the property.
		// If this is e.g. [Symbol.iterator], add a completion for `Symbol`.
		computedPropertyName := core.FirstNonNil(symbol.Declarations, func(decl *ast.Node) *ast.Node {
			name := ast.GetNameOfDeclaration(decl)
			if name != nil && name.Kind == ast.KindComputedPropertyName {
				return name
			}
			return nil
		})

		if computedPropertyName != nil {
			leftMostName := getLeftMostName(computedPropertyName.Expression()) // The completion is for `Symbol`, not `iterator`.
			var nameSymbol *ast.Symbol
			if leftMostName != nil {
				nameSymbol = typeChecker.GetSymbolAtLocation(leftMostName)
			}
			// If this is nested like for `namespace N { export const sym = Symbol(); }`, we'll add the completion for `N`.
			var firstAccessibleSymbol *ast.Symbol
			if nameSymbol != nil {
				firstAccessibleSymbol = getFirstSymbolInChain(nameSymbol, contextToken, typeChecker)
			}
			var firstAccessibleSymbolId ast.SymbolId
			if firstAccessibleSymbol != nil {
				firstAccessibleSymbolId = ast.GetSymbolId(firstAccessibleSymbol)
			}
			if firstAccessibleSymbolId != 0 && seenPropertySymbols.AddIfAbsent(firstAccessibleSymbolId) {
				symbols = append(symbols, firstAccessibleSymbol)
				moduleSymbol := firstAccessibleSymbol.Parent
				if moduleSymbol == nil ||
					!checker.IsExternalModuleSymbol(moduleSymbol) ||
					typeChecker.TryGetMemberInModuleExportsAndProperties(firstAccessibleSymbol.Name, moduleSymbol) != firstAccessibleSymbol {
					symbolToOriginInfoMap[ast.GetSymbolId(symbol)] = &symbolOriginInfo{kind: getNullableSymbolOriginInfoKind(symbolOriginInfoKindSymbolMemberNoExport, insertQuestionDot)}
				} else {
					// !!! imports
					// var fileName string
					// if tspath.IsExternalModuleNameRelative(core.StripQuotes(moduleSymbol.Name)) {
					// 	fileName = ast.GetSourceFileOfModule(moduleSymbol).FileName()
					// }
					// if importSpecifierResolver == nil {
					// importSpecifierResolver ||= codefix.createImportSpecifierResolver(sourceFile, program, host, preferences))
					// }
					// const { moduleSpecifier } = importSpecifier.getModuleSpecifierForBestExportInfo(
					// 	[{
					// 		exportKind: ExportKind.Named,
					// 		moduleFileName: fileName,
					// 		isFromPackageJson: false,
					// 		moduleSymbol,
					// 		symbol: firstAccessibleSymbol,
					// 		targetFlags: skipAlias(firstAccessibleSymbol, typeChecker).flags,
					// 	}],
					// 	position,
					// 	isValidTypeOnlyAliasUseSite(location),
					// ) || {};
					// if (moduleSpecifier) {
					// 	const origin: SymbolOriginInfoResolvedExport = {
					// 		kind: getNullableSymbolOriginInfoKind(SymbolOriginInfoKind.SymbolMemberExport),
					// 		moduleSymbol,
					// 		isDefaultExport: false,
					// 		symbolName: firstAccessibleSymbol.name,
					// 		exportName: firstAccessibleSymbol.name,
					// 		fileName,
					// 		moduleSpecifier,
					// 	};
					// 	symbolToOriginInfoMap[index] = origin;
					// }
				}
			} else if firstAccessibleSymbolId == 0 || !seenPropertySymbols.Has(firstAccessibleSymbolId) {
				symbols = append(symbols, symbol)
				addSymbolOriginInfo(symbol, insertQuestionDot, insertAwait)
				addSymbolSortInfo(symbol)
			}
		} else {
			symbols = append(symbols, symbol)
			addSymbolOriginInfo(symbol, insertQuestionDot, insertAwait)
			addSymbolSortInfo(symbol)
		}
	}

	addTypeProperties := func(t *checker.Type, insertAwait bool, insertQuestionDot bool) {
		if typeChecker.GetStringIndexType(t) != nil {
			isNewIdentifierLocation = true
			defaultCommitCharacters = []string{}
		}
		if isRightOfQuestionDot && len(typeChecker.GetCallSignatures(t)) != 0 {
			isNewIdentifierLocation = true
			if defaultCommitCharacters == nil {
				defaultCommitCharacters = slices.Clone(allCommitCharacters) // Only invalid commit character here would be `(`.
			}
		}

		var propertyAccess *ast.Node
		if node.Kind == ast.KindImportType {
			propertyAccess = node
		} else {
			propertyAccess = node.Parent
		}

		if inCheckedFile {
			for _, symbol := range typeChecker.GetApparentProperties(t) {
				if typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, t, symbol) {
					addPropertySymbol(symbol, false /*insertAwait*/, insertQuestionDot)
				}
			}
		} else {
			// In javascript files, for union types, we don't just get the members that
			// the individual types have in common, we also include all the members that
			// each individual type has. This is because we're going to add all identifiers
			// anyways. So we might as well elevate the members that were at least part
			// of the individual types to a higher status since we know what they are.
			for _, symbol := range getPropertiesForCompletion(t, typeChecker) {
				if typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, t, symbol) {
					symbols = append(symbols, symbol)
				}
			}
		}

		if insertAwait {
			promiseType := typeChecker.GetPromisedTypeOfPromise(t)
			if promiseType != nil {
				for _, symbol := range typeChecker.GetApparentProperties(promiseType) {
					if typeChecker.IsValidPropertyAccessForCompletions(propertyAccess, promiseType, symbol) {
						addPropertySymbol(symbol, true /*insertAwait*/, insertQuestionDot)
					}
				}
			}
		}
	}

	getTypeScriptMemberSymbols := func() {
		// Right of dot member completion list
		completionKind = CompletionKindPropertyAccess

		// Since this is qualified name check it's a type node location
		isImportType := ast.IsLiteralImportTypeNode(node)
		isTypeLocation := (isImportType && !node.AsImportTypeNode().IsTypeOf) ||
			ast.IsPartOfTypeNode(node.Parent) ||
			isPossiblyTypeArgumentPosition(contextToken, file, typeChecker)
		isRhsOfImportDeclaration := isInRightSideOfInternalImportEqualsDeclaration(node)
		if ast.IsEntityName(node) || isImportType || ast.IsPropertyAccessExpression(node) {
			isNamespaceName := ast.IsModuleDeclaration(node.Parent)
			if isNamespaceName {
				isNewIdentifierLocation = true
				defaultCommitCharacters = []string{}
			}
			symbol := typeChecker.GetSymbolAtLocation(node)
			if symbol != nil {
				symbol := checker.SkipAlias(symbol, typeChecker)
				if symbol.Flags&(ast.SymbolFlagsModule|ast.SymbolFlagsEnum) != 0 {
					var valueAccessNode *ast.Node
					if isImportType {
						valueAccessNode = node
					} else {
						valueAccessNode = node.Parent
					}
					// Extract module or enum members
					exportedSymbols := typeChecker.GetExportsOfModule(symbol)
					for _, exportedSymbol := range exportedSymbols {
						if exportedSymbol == nil {
							panic("getExporsOfModule() should all be defined")
						}
						isValidValueAccess := func(s *ast.Symbol) bool {
							return typeChecker.IsValidPropertyAccess(valueAccessNode, s.Name)
						}
						isValidTypeAccess := func(s *ast.Symbol) bool {
							return symbolCanBeReferencedAtTypeLocation(s, typeChecker, core.Set[ast.SymbolId]{})
						}
						var isValidAccess bool
						if isNamespaceName {
							// At `namespace N.M/**/`, if this is the only declaration of `M`, don't include `M` as a completion.
							isValidAccess = exportedSymbol.Flags&ast.SymbolFlagsNamespace != 0 &&
								!core.Every(exportedSymbol.Declarations, func(declaration *ast.Declaration) bool {
									return declaration.Parent == node.Parent
								})
						} else if isRhsOfImportDeclaration {
							// Any kind is allowed when dotting off namespace in internal import equals declaration
							isValidAccess = isValidTypeAccess(exportedSymbol) || isValidValueAccess(exportedSymbol)
						} else if isTypeLocation || insideJSDocTagTypeExpression {
							isValidAccess = isValidTypeAccess(exportedSymbol)
						} else {
							isValidAccess = isValidValueAccess(exportedSymbol)
						}
						if isValidAccess {
							symbols = append(symbols, exportedSymbol)
						}
					}

					// If the module is merged with a value, we must get the type of the class and add its properties (for inherited static methods).
					if !isTypeLocation && !insideJSDocTagTypeExpression &&
						core.Some(
							symbol.Declarations,
							func(decl *ast.Declaration) bool {
								return decl.Kind != ast.KindSourceFile && decl.Kind != ast.KindModuleDeclaration && decl.Kind != ast.KindEnumDeclaration
							}) {
						t := typeChecker.GetNonOptionalType(typeChecker.GetTypeOfSymbolAtLocation(symbol, node))
						insertQuestionDot := false
						if typeChecker.IsNullableType(t) {
							canCorrectToQuestionDot := isRightOfDot && !isRightOfQuestionDot &&
								!ptrIsFalse(preferences.IncludeAutomaticOptionalChainCompletions)
							if canCorrectToQuestionDot || isRightOfQuestionDot {
								t = typeChecker.GetNonNullableType(t)
								if canCorrectToQuestionDot {
									insertQuestionDot = true
								}
							}
						}
						addTypeProperties(t, node.Flags&ast.NodeFlagsAwaitContext != 0, insertQuestionDot)
					}

					return
				}
			}
		}

		if !isTypeLocation || checker.IsInTypeQuery(node) {
			// microsoft/TypeScript#39946. Pulling on the type of a node inside of a function with a contextual `this` parameter can result in a circularity
			// if the `node` is part of the exprssion of a `yield` or `return`. This circularity doesn't exist at compile time because
			// we will check (and cache) the type of `this` *before* checking the type of the node.
			typeChecker.TryGetThisTypeAtEx(node, false /*includeGlobalThis*/, nil)
			t := typeChecker.GetNonOptionalType(typeChecker.GetTypeAtLocation(node))

			if !isTypeLocation {
				insertQuestionDot := false
				if typeChecker.IsNullableType(t) {
					canCorrectToQuestionDot := isRightOfDot && !isRightOfQuestionDot &&
						!ptrIsFalse(preferences.IncludeAutomaticOptionalChainCompletions)

					if canCorrectToQuestionDot || isRightOfQuestionDot {
						t = typeChecker.GetNonNullableType(t)
						if canCorrectToQuestionDot {
							insertQuestionDot = true
						}
					}
				}
				addTypeProperties(t, node.Flags&ast.NodeFlagsAwaitContext != 0, insertQuestionDot)
			} else {
				addTypeProperties(typeChecker.GetNonNullableType(t), false /*insertAwait*/, false /*insertQuestionDot*/)
			}
		}
	}

	// Aggregates relevant symbols for completion in object literals in type argument positions.
	tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols := func() globalsSearch {
		typeLiteralNode := tryGetTypeLiteralNode(contextToken)
		if typeLiteralNode == nil {
			return globalsSearchContinue
		}

		intersectionTypeNode := core.IfElse(
			ast.IsIntersectionTypeNode(typeLiteralNode.Parent),
			typeLiteralNode.Parent,
			nil)
		containerTypeNode := core.IfElse(
			intersectionTypeNode != nil,
			intersectionTypeNode,
			typeLiteralNode)

		containerExpectedType := getConstraintOfTypeArgumentProperty(containerTypeNode, typeChecker)
		if containerExpectedType == nil {
			return globalsSearchContinue
		}

		containerActualType := typeChecker.GetTypeFromTypeNode(containerTypeNode)

		members := getPropertiesForCompletion(containerExpectedType, typeChecker)
		existingMembers := getPropertiesForCompletion(containerActualType, typeChecker)

		existingMemberNames := core.Set[string]{}
		for _, member := range existingMembers {
			existingMemberNames.Add(member.Name)
		}

		symbols = append(
			symbols,
			core.Filter(members, func(member *ast.Symbol) bool { return !existingMemberNames.Has(member.Name) })...)

		completionKind = CompletionKindObjectPropertyDeclaration
		isNewIdentifierLocation = true

		return globalsSearchSuccess
	}

	// Aggregates relevant symbols for completion in object literals and object binding patterns.
	// Relevant symbols are stored in the captured 'symbols' variable.
	tryGetObjectLikeCompletionSymbols := func() globalsSearch {
		if contextToken != nil && contextToken.Kind == ast.KindDotDotDotToken {
			return globalsSearchContinue
		}
		objectLikeContainer := tryGetObjectLikeCompletionContainer(contextToken, position, file)
		if objectLikeContainer == nil {
			return globalsSearchContinue
		}

		// We're looking up possible property names from contextual/inferred/declared type.
		completionKind = CompletionKindObjectPropertyDeclaration

		var typeMembers []*ast.Symbol
		var existingMembers []*ast.Declaration

		if objectLikeContainer.Kind == ast.KindObjectLiteralExpression {
			instantiatedType := tryGetObjectLiteralContextualType(objectLikeContainer, typeChecker)

			// Check completions for Object property value shorthand
			if instantiatedType == nil {
				if objectLikeContainer.Flags&ast.NodeFlagsInWithStatement != 0 {
					return globalsSearchFail
				}
				return globalsSearchContinue
			}
			completionsType := typeChecker.GetContextualType(objectLikeContainer, checker.ContextFlagsCompletions)
			t := core.IfElse(completionsType != nil, completionsType, instantiatedType)
			stringIndexType := typeChecker.GetStringIndexType(t)
			numberIndexType := typeChecker.GetNumberIndexType(t)
			isNewIdentifierLocation = stringIndexType != nil || numberIndexType != nil
			typeMembers = getPropertiesForObjectExpression(instantiatedType, completionsType, objectLikeContainer, typeChecker)
			properties := objectLikeContainer.AsObjectLiteralExpression().Properties
			if properties != nil {
				existingMembers = properties.Nodes
			}

			if len(typeMembers) == 0 {
				// Edge case: If NumberIndexType exists
				if numberIndexType == nil {
					return globalsSearchContinue
				}
			}
		} else {
			if objectLikeContainer.Kind != ast.KindObjectBindingPattern {
				panic("Expected 'objectLikeContainer' to be an object binding pattern.")
			}
			// We are *only* completing on properties from the type being destructured.
			isNewIdentifierLocation = false
			rootDeclaration := ast.GetRootDeclaration(objectLikeContainer.Parent)
			if !ast.IsVariableLike(rootDeclaration) {
				panic("Root declaration is not variable-like.")
			}

			// We don't want to complete using the type acquired by the shape
			// of the binding pattern; we are only interested in types acquired
			// through type declaration or inference.
			// Also proceed if rootDeclaration is a parameter and if its containing function expression/arrow function is contextually typed -
			// type of parameter will flow in from the contextual type of the function.
			canGetType := ast.HasInitializer(rootDeclaration) ||
				ast.GetTypeAnnotationNode(rootDeclaration) != nil ||
				rootDeclaration.Parent.Parent.Kind == ast.KindForOfStatement
			if !canGetType && rootDeclaration.Kind == ast.KindParameter {
				if ast.IsExpression(rootDeclaration.Parent) {
					canGetType = typeChecker.GetContextualType(rootDeclaration.Parent, checker.ContextFlagsNone) != nil
				} else if rootDeclaration.Parent.Kind == ast.KindMethodDeclaration ||
					rootDeclaration.Parent.Kind == ast.KindSetAccessor {
					canGetType = ast.IsExpression(rootDeclaration.Parent.Parent) &&
						typeChecker.GetContextualType(rootDeclaration.Parent.Parent, checker.ContextFlagsNone) != nil
				}
			}
			if canGetType {
				typeForObject := typeChecker.GetTypeAtLocation(objectLikeContainer)
				if typeForObject == nil {
					return globalsSearchFail
				}
				typeMembers = core.Filter(
					typeChecker.GetPropertiesOfType(typeForObject),
					func(propertySymbol *ast.Symbol) bool {
						return typeChecker.IsPropertyAccessible(
							objectLikeContainer,
							false, /*isSuper*/
							false, /*isWrite*/
							typeForObject,
							propertySymbol,
						)
					},
				)
				elements := objectLikeContainer.AsBindingPattern().Elements
				if elements != nil {
					existingMembers = elements.Nodes
				}
			}
		}

		if len(typeMembers) > 0 {
			// Add filtered items to the completion list.
			filteredMembers, spreadMemberNames := filterObjectMembersList(
				typeMembers,
				core.CheckEachDefined(existingMembers, "object like properties or elements should all be defined"),
				file,
				position,
				typeChecker,
			)
			symbols = append(symbols, filteredMembers...)

			// Set sort texts.
			transformObjectLiteralMembers := ptrIsTrue(preferences.IncludeCompletionsWithObjectLiteralMethodSnippets) &&
				objectLikeContainer.Kind == ast.KindObjectLiteralExpression
			for _, member := range filteredMembers {
				symbolId := ast.GetSymbolId(member)
				if spreadMemberNames.Has(member.Name) {
					symbolToSortTextMap[symbolId] = SortTextMemberDeclaredBySpreadAssignment
				}
				if member.Flags&ast.SymbolFlagsOptional != 0 {
					_, ok := symbolToSortTextMap[symbolId]
					if !ok {
						symbolToSortTextMap[symbolId] = SortTextOptionalMember
					}
				}
				if transformObjectLiteralMembers {
					// !!! object literal member snippet completions
				}
			}
		}

		return globalsSearchSuccess
	}

	tryGetImportCompletionSymbols := func() globalsSearch {
		if importStatementCompletion == nil {
			return globalsSearchContinue
		}
		isNewIdentifierLocation = true
		// !!! auto imports
		// collectAutoImports()
		return globalsSearchSuccess
	}

	// Aggregates relevant symbols for completion in import clauses and export clauses
	// whose declarations have a module specifier; for instance, symbols will be aggregated for
	//
	//      import { | } from "moduleName";
	//      export { a as foo, | } from "moduleName";
	//
	// but not for
	//
	//      export { | };
	//
	// Relevant symbols are stored in the captured 'symbols' variable.
	tryGetImportOrExportClauseCompletionSymbols := func() globalsSearch {
		if contextToken == nil {
			return globalsSearchContinue
		}

		// `import { |` or `import { a as 0, | }` or `import { type | }`
		var namedImportsOrExports *ast.NamedImportsOrExports
		if contextToken.Kind == ast.KindOpenBraceToken || contextToken.Kind == ast.KindCommaToken {
			namedImportsOrExports = core.IfElse(isNamedImportsOrExports(contextToken.Parent), contextToken.Parent, nil)
		} else if isTypeKeywordTokenOrIdentifier(contextToken) {
			namedImportsOrExports = core.IfElse(
				isNamedImportsOrExports(contextToken.Parent.Parent),
				contextToken.Parent.Parent,
				nil,
			)
		}

		if namedImportsOrExports == nil {
			return globalsSearchContinue
		}

		// We can at least offer `type` at `import { |`
		if !isTypeKeywordTokenOrIdentifier(contextToken) {
			keywordFilters = KeywordCompletionFiltersTypeKeyword
		}

		// try to show exported member for imported/re-exported module
		moduleSpecifier := core.IfElse(
			namedImportsOrExports.Kind == ast.KindNamedImports,
			namedImportsOrExports.Parent.Parent,
			namedImportsOrExports.Parent).ModuleSpecifier()
		if moduleSpecifier == nil {
			isNewIdentifierLocation = true
			if namedImportsOrExports.Kind == ast.KindNamedImports {
				return globalsSearchFail
			}
			return globalsSearchContinue
		}

		moduleSpecifierSymbol := typeChecker.GetSymbolAtLocation(moduleSpecifier)
		if moduleSpecifierSymbol == nil {
			isNewIdentifierLocation = true
			return globalsSearchFail
		}

		completionKind = CompletionKindMemberLike
		isNewIdentifierLocation = false
		exports := typeChecker.GetExportsAndPropertiesOfModule(moduleSpecifierSymbol)

		existing := core.Set[string]{}
		for _, element := range namedImportsOrExports.Elements() {
			if isCurrentlyEditingNode(element, file, position) {
				continue
			}
			existing.Add(element.PropertyNameOrName().Text())
		}
		uniques := core.Filter(exports, func(symbol *ast.Symbol) bool {
			return symbol.Name != ast.InternalSymbolNameDefault && !existing.Has(symbol.Name)
		})

		symbols = append(symbols, uniques...)
		if len(uniques) == 0 {
			// If there's nothing else to import, don't offer `type` either.
			keywordFilters = KeywordCompletionFiltersNone
		}
		return globalsSearchSuccess
	}

	// import { x } from "foo" with { | }
	tryGetImportAttributesCompletionSymbols := func() globalsSearch {
		if contextToken == nil {
			return globalsSearchContinue
		}

		var importAttributes *ast.ImportAttributesNode
		if contextToken.Kind == ast.KindOpenBraceToken || contextToken.Kind == ast.KindCommaToken {
			importAttributes = core.IfElse(ast.IsImportAttributes(contextToken.Parent), contextToken.Parent, nil)
		} else if contextToken.Kind == ast.KindColonToken {
			importAttributes = core.IfElse(ast.IsImportAttributes(contextToken.Parent.Parent), contextToken.Parent.Parent, nil)
		}

		if importAttributes == nil {
			return globalsSearchContinue
		}

		var elements []*ast.Node
		if importAttributes.AsImportAttributes().Attributes != nil {
			elements = importAttributes.AsImportAttributes().Attributes.Nodes
		}
		existing := core.NewSetFromItems(core.Map(elements, (*ast.Node).Text)...)
		uniques := core.Filter(
			typeChecker.GetApparentProperties(typeChecker.GetTypeAtLocation(importAttributes)),
			func(symbol *ast.Symbol) bool {
				return !existing.Has(symbol.Name)
			})
		symbols = append(symbols, uniques...)
		return globalsSearchSuccess
	}

	// Adds local declarations for completions in named exports:
	//   export { | };
	// Does not check for the absence of a module specifier (`export {} from "./other"`)
	// because `tryGetImportOrExportClauseCompletionSymbols` runs first and handles that,
	// preventing this function from running.
	tryGetLocalNamedExportCompletionSymbols := func() globalsSearch {
		if contextToken == nil {
			return globalsSearchContinue
		}
		var namedExports *ast.NamedExportsNode
		if contextToken.Kind == ast.KindOpenBraceToken || contextToken.Kind == ast.KindCommaToken {
			namedExports = core.IfElse(ast.IsNamedExports(contextToken.Parent), contextToken.Parent, nil)
		}

		if namedExports == nil {
			return globalsSearchContinue
		}

		localsContainer := ast.FindAncestor(namedExports, func(node *ast.Node) bool {
			return ast.IsSourceFile(node) || ast.IsModuleDeclaration(node)
		})
		completionKind = CompletionKindNone
		isNewIdentifierLocation = false
		localSymbol := localsContainer.Symbol()
		var localExports ast.SymbolTable
		if localSymbol != nil {
			localExports = localSymbol.Exports
		}
		for name, symbol := range localsContainer.Locals() {
			symbols = append(symbols, symbol)
			if _, ok := localExports[name]; ok {
				symbolId := ast.GetSymbolId(symbol)
				symbolToSortTextMap[symbolId] = SortTextOptionalMember
			}
		}

		return globalsSearchSuccess
	}

	tryGetConstructorCompletion := func() globalsSearch {
		if tryGetConstructorLikeCompletionContainer(contextToken) == nil {
			return globalsSearchContinue
		}

		// no members, only keywords
		completionKind = CompletionKindNone
		// Declaring new property/method/accessor
		isNewIdentifierLocation = true
		// Has keywords for constructor parameter
		keywordFilters = KeywordCompletionFiltersConstructorParameterKeywords
		return globalsSearchSuccess
	}

	// Aggregates relevant symbols for completion in class declaration
	// Relevant symbols are stored in the captured 'symbols' variable.
	tryGetClassLikeCompletionSymbols := func() globalsSearch {
		decl := tryGetObjectTypeDeclarationCompletionContainer(file, contextToken, location, position)
		if decl == nil {
			return globalsSearchContinue
		}

		// We're looking up possible property names from parent type.
		completionKind = CompletionKindMemberLike
		// Declaring new property/method/accessor
		isNewIdentifierLocation = true
		if contextToken.Kind == ast.KindAsteriskToken {
			keywordFilters = KeywordCompletionFiltersNone
		} else if ast.IsClassLike(decl) {
			keywordFilters = KeywordCompletionFiltersClassElementKeywords
		} else {
			keywordFilters = KeywordCompletionFiltersInterfaceElementKeywords
		}

		// If you're in an interface you don't want to repeat things from super-interface. So just stop here.
		if !ast.IsClassLike(decl) {
			return globalsSearchSuccess
		}

		var classElement *ast.Node
		if contextToken.Kind == ast.KindSemicolonToken {
			classElement = contextToken.Parent.Parent
		} else {
			classElement = contextToken.Parent
		}
		var classElementModifierFlags ast.ModifierFlags
		if ast.IsClassElement(classElement) {
			classElementModifierFlags = classElement.ModifierFlags()
		}
		// If this is context token is not something we are editing now, consider if this would lead to be modifier.
		if contextToken.Kind == ast.KindIdentifier && !isCurrentlyEditingNode(contextToken, file, position) {
			switch contextToken.Text() {
			case "private":
				classElementModifierFlags |= ast.ModifierFlagsPrivate
			case "static":
				classElementModifierFlags |= ast.ModifierFlagsStatic
			case "override":
				classElementModifierFlags |= ast.ModifierFlagsOverride
			}
		}
		if ast.IsClassStaticBlockDeclaration(classElement) {
			classElementModifierFlags |= ast.ModifierFlagsStatic
		}

		// No member list for private methods
		if classElementModifierFlags&ast.ModifierFlagsPrivate == 0 {
			// List of property symbols of base type that are not private and already implemented
			var baseTypeNodes []*ast.Node
			if ast.IsClassLike(decl) && classElementModifierFlags&ast.ModifierFlagsOverride != 0 {
				baseTypeNodes = []*ast.Node{ast.GetClassExtendsHeritageElement(decl)}
			} else {
				baseTypeNodes = getAllSuperTypeNodes(decl)
			}
			var baseSymbols []*ast.Symbol
			for _, baseTypeNode := range baseTypeNodes {
				t := typeChecker.GetTypeAtLocation(baseTypeNode)
				if classElementModifierFlags&ast.ModifierFlagsStatic != 0 {
					if t.Symbol() != nil {
						baseSymbols = append(
							baseSymbols,
							typeChecker.GetPropertiesOfType(typeChecker.GetTypeOfSymbolAtLocation(t.Symbol(), decl))...)
					}
				} else if t != nil {
					baseSymbols = append(baseSymbols, typeChecker.GetPropertiesOfType(t)...)
				}
			}

			symbols = append(symbols,
				filterClassMembersList(baseSymbols, decl.Members(), classElementModifierFlags, file, position)...)
			for _, symbol := range symbols {
				declaration := symbol.ValueDeclaration
				if declaration != nil && ast.IsClassElement(declaration) &&
					declaration.Name() != nil &&
					ast.IsComputedPropertyName(declaration.Name()) {
					symbolId := ast.GetSymbolId(symbol)
					origin := &symbolOriginInfo{
						kind: symbolOriginInfoKindComputedPropertyName,
						data: &symbolOriginInfoComputedPropertyName{symbolName: typeChecker.SymbolToString(symbol)},
					}
					symbolToOriginInfoMap[symbolId] = origin
				}
			}
		}

		return globalsSearchSuccess
	}

	tryGetJsxCompletionSymbols := func() globalsSearch {
		jsxContainer := tryGetContainingJsxElement(contextToken, file)
		if jsxContainer == nil {
			return globalsSearchContinue
		}
		// Cursor is inside a JSX self-closing element or opening element.
		attrsType := typeChecker.GetContextualType(jsxContainer.Attributes(), checker.ContextFlagsNone)
		if attrsType == nil {
			return globalsSearchContinue
		}
		completionsType := typeChecker.GetContextualType(jsxContainer.Attributes(), checker.ContextFlagsCompletions)
		filteredSymbols, spreadMemberNames := filterJsxAttributes(
			getPropertiesForObjectExpression(attrsType, completionsType, jsxContainer.Attributes(), typeChecker),
			jsxContainer.Attributes().Properties(),
			file,
			position,
			typeChecker,
		)

		symbols = append(symbols, filteredSymbols...)
		// Set sort texts.
		for _, symbol := range filteredSymbols {
			symbolId := ast.GetSymbolId(symbol)
			if spreadMemberNames.Has(symbol.Name) {
				symbolToSortTextMap[symbolId] = SortTextMemberDeclaredBySpreadAssignment
			}
			if symbol.Flags&ast.SymbolFlagsOptional != 0 {
				_, ok := symbolToSortTextMap[symbolId]
				if !ok {
					symbolToSortTextMap[symbolId] = SortTextOptionalMember
				}
			}
		}

		completionKind = CompletionKindMemberLike
		isNewIdentifierLocation = false
		return globalsSearchSuccess
	}

	getGlobalCompletions := func() globalsSearch {
		if tryGetFunctionLikeBodyCompletionContainer(contextToken) != nil {
			keywordFilters = KeywordCompletionFiltersFunctionLikeBodyKeywords
		} else {
			keywordFilters = KeywordCompletionFiltersAll
		}
		// Get all entities in the current scope.
		completionKind = CompletionKindGlobal
		isNewIdentifierLocation, defaultCommitCharacters = computeCommitCharactersAndIsNewIdentifier(contextToken, file, position)

		if previousToken != contextToken {
			if previousToken == nil {
				panic("Expected 'contextToken' to be defined when different from 'previousToken'.")
			}
		}

		// We need to find the node that will give us an appropriate scope to begin
		// aggregating completion candidates. This is achieved in 'getScopeNode'
		// by finding the first node that encompasses a position, accounting for whether a node
		// is "complete" to decide whether a position belongs to the node.
		//
		// However, at the end of an identifier, we are interested in the scope of the identifier
		// itself, but fall outside of the identifier. For instance:
		//
		//      xyz => x$
		//
		// the cursor is outside of both the 'x' and the arrow function 'xyz => x',
		// so 'xyz' is not returned in our results.
		//
		// We define 'adjustedPosition' so that we may appropriately account for
		// being at the end of an identifier. The intention is that if requesting completion
		// at the end of an identifier, it should be effectively equivalent to requesting completion
		// anywhere inside/at the beginning of the identifier. So in the previous case, the
		// 'adjustedPosition' will work as if requesting completion in the following:
		//
		//      xyz => $x
		//
		// If previousToken !== contextToken, then
		//   - 'contextToken' was adjusted to the token prior to 'previousToken'
		//      because we were at the end of an identifier.
		//   - 'previousToken' is defined.
		var adjustedPosition int
		if previousToken != contextToken {
			adjustedPosition = astnav.GetStartOfNode(previousToken, file, false /*includeJSDoc*/)
		} else {
			adjustedPosition = position
		}

		scopeNode := getScopeNode(contextToken, adjustedPosition, file)
		if scopeNode == nil {
			scopeNode = file.AsNode()
		}
		isInSnippetScope = isSnippetScope(scopeNode)

		symbolMeanings := core.IfElse(isTypeOnlyLocation, ast.SymbolFlagsNone, ast.SymbolFlagsValue) |
			ast.SymbolFlagsType | ast.SymbolFlagsNamespace | ast.SymbolFlagsAlias
		typeOnlyAliasNeedsPromotion := previousToken != nil && !ast.IsValidTypeOnlyAliasUseSite(previousToken)

		symbols = append(symbols, typeChecker.GetSymbolsInScope(scopeNode, symbolMeanings)...)
		core.CheckEachDefined(symbols, "getSymbolsInScope() should all be defined")
		for _, symbol := range symbols {
			symbolId := ast.GetSymbolId(symbol)
			if !typeChecker.IsArgumentsSymbol(symbol) &&
				!core.Some(symbol.Declarations, func(decl *ast.Declaration) bool {
					return ast.GetSourceFileOfNode(decl) == file
				}) {
				symbolToSortTextMap[symbolId] = SortTextGlobalsOrKeywords
			}
			if typeOnlyAliasNeedsPromotion && symbol.Flags&ast.SymbolFlagsValue == 0 {
				typeOnlyAliasDeclaration := core.Find(symbol.Declarations, ast.IsTypeOnlyImportDeclaration)
				if typeOnlyAliasDeclaration != nil {
					origin := &symbolOriginInfo{
						kind: symbolOriginInfoKindTypeOnlyAlias,
						data: &symbolOriginInfoTypeOnlyAlias{declaration: typeOnlyAliasDeclaration},
					}
					symbolToOriginInfoMap[symbolId] = origin
				}
			}
		}

		// Need to insert 'this.' before properties of `this` type, so only do that if `includeInsertTextCompletions`
		if scopeNode.Kind != ast.KindSourceFile {
			thisType := typeChecker.TryGetThisTypeAtEx(
				scopeNode,
				false, /*includeGlobalThis*/
				core.IfElse(ast.IsClassLike(scopeNode.Parent), scopeNode, nil))
			if thisType != nil && !isProbablyGlobalType(thisType, file, typeChecker) {
				for _, symbol := range getPropertiesForCompletion(thisType, typeChecker) {
					symbolId := ast.GetSymbolId(symbol)
					symbols = append(symbols, symbol)
					symbolToOriginInfoMap[symbolId] = &symbolOriginInfo{kind: symbolOriginInfoKindThisType}
					symbolToSortTextMap[symbolId] = SortTextSuggestedClassMembers
				}
			}
		}

		// !!! auto imports
		// collectAutoImports()

		if isTypeOnlyLocation {
			if contextToken != nil && ast.IsAssertionExpression(contextToken.Parent) {
				keywordFilters = KeywordCompletionFiltersTypeAssertionKeywords
			} else {
				keywordFilters = KeywordCompletionFiltersTypeKeywords
			}
		}

		return globalsSearchSuccess
	}

	tryGetGlobalSymbols := func() bool {
		var result globalsSearch
		globalSearchFuncs := []func() globalsSearch{
			tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols,
			tryGetObjectLikeCompletionSymbols,
			tryGetImportCompletionSymbols,
			tryGetImportOrExportClauseCompletionSymbols,
			tryGetImportAttributesCompletionSymbols,
			tryGetLocalNamedExportCompletionSymbols,
			tryGetConstructorCompletion,
			tryGetClassLikeCompletionSymbols,
			tryGetJsxCompletionSymbols,
			getGlobalCompletions,
		}
		for _, globalSearchFunc := range globalSearchFuncs {
			result = globalSearchFunc()
			if result != globalsSearchContinue {
				break
			}
		}
		return result == globalsSearchSuccess
	}

	if isRightOfDot || isRightOfQuestionDot {
		getTypeScriptMemberSymbols()
	} else if isRightOfOpenTag {
		symbols = typeChecker.GetJsxIntrinsicTagNamesAt(location)
		core.CheckEachDefined(symbols, "GetJsxIntrinsicTagNamesAt() should all be defined")
		tryGetGlobalSymbols()
		completionKind = CompletionKindGlobal
		keywordFilters = KeywordCompletionFiltersNone
	} else if isStartingCloseTag {
		tagName := contextToken.Parent.Parent.AsJsxElement().OpeningElement.TagName()
		tagSymbol := typeChecker.GetSymbolAtLocation(tagName)
		if tagSymbol != nil {
			symbols = []*ast.Symbol{tagSymbol}
		}
		completionKind = CompletionKindGlobal
		keywordFilters = KeywordCompletionFiltersNone
	} else {
		// For JavaScript or TypeScript, if we're not after a dot, then just try to get the
		// global symbols in scope.  These results should be valid for either language as
		// the set of symbols that can be referenced from this location.
		if !tryGetGlobalSymbols() {
			if keywordFilters != KeywordCompletionFiltersNone {
				return keywordCompletionData(keywordFilters, isJSOnlyLocation, isNewIdentifierLocation)
			}
			return nil
		}
	}

	var contextualType *checker.Type
	if previousToken != nil {
		contextualType = getContextualType(previousToken, position, file, typeChecker)
	}

	// exclude literal suggestions after <input type="text" [||] /> microsoft/TypeScript#51667) and after closing quote (microsoft/TypeScript#52675)
	// for strings getStringLiteralCompletions handles completions
	isLiteralExpected := !ast.IsStringLiteralLike(previousToken) && !isJsxIdentifierExpected
	var literals []literalValue
	if isLiteralExpected {
		var types []*checker.Type
		if contextualType != nil && contextualType.IsUnion() {
			types = contextualType.Types()
		} else if contextualType != nil {
			types = []*checker.Type{contextualType}
		}
		literals = core.MapNonNil(types, func(t *checker.Type) literalValue {
			if isLiteral(t) && !t.IsEnumLiteral() {
				return t.AsLiteralType().Value()
			}
			return nil
		})
	}

	var recommendedCompletion *ast.Symbol
	if previousToken != nil && contextualType != nil {
		recommendedCompletion = getRecommendedCompletion(previousToken, contextualType, typeChecker)
	}

	if defaultCommitCharacters == nil {
		defaultCommitCharacters = getDefaultCommitCharacters(isNewIdentifierLocation)
	}

	return &completionDataData{
		symbols:                      symbols,
		completionKind:               completionKind,
		isInSnippetScope:             isInSnippetScope,
		propertyAccessToConvert:      propertyAccessToConvert,
		isNewIdentifierLocation:      isNewIdentifierLocation,
		location:                     location,
		keywordFilters:               keywordFilters,
		literals:                     literals,
		symbolToOriginInfoMap:        symbolToOriginInfoMap,
		symbolToSortTextMap:          symbolToSortTextMap,
		recommendedCompletion:        recommendedCompletion,
		previousToken:                previousToken,
		contextToken:                 contextToken,
		jsxInitializer:               jsxInitializer,
		insideJSDocTagTypeExpression: insideJSDocTagTypeExpression,
		isTypeOnlyLocation:           isTypeOnlyLocation,
		isJsxIdentifierExpected:      isJsxIdentifierExpected,
		isRightOfOpenTag:             isRightOfOpenTag,
		isRightOfDotOrQuestionDot:    isRightOfDot || isRightOfQuestionDot,
		importStatementCompletion:    importStatementCompletion,
		hasUnresolvedAutoImports:     hasUnresolvedAutoImports,
		defaultCommitCharacters:      defaultCommitCharacters,
	}
}

func keywordCompletionData(
	keywordFilters KeywordCompletionFilters,
	filterOutTSOnlyKeywords bool,
	isNewIdentifierLocation bool,
) *completionDataKeyword {
	return &completionDataKeyword{
		keywordCompletions:      getKeywordCompletions(keywordFilters, filterOutTSOnlyKeywords),
		isNewIdentifierLocation: isNewIdentifierLocation,
	}
}

func getDefaultCommitCharacters(isNewIdentifierLocation bool) []string {
	if isNewIdentifierLocation {
		return []string{}
	}
	return slices.Clone(allCommitCharacters)
}

func (l *LanguageService) completionInfoFromData(
	ctx context.Context,
	file *ast.SourceFile,
	program *compiler.Program,
	compilerOptions *core.CompilerOptions,
	data *completionDataData,
	preferences *UserPreferences,
	position int,
	clientOptions *lsproto.CompletionClientCapabilities,
) *lsproto.CompletionList {
	keywordFilters := data.keywordFilters
	isNewIdentifierLocation := data.isNewIdentifierLocation
	contextToken := data.contextToken
	literals := data.literals
	typeChecker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()

	// Verify if the file is JSX language variant
	if ast.GetLanguageVariant(file.ScriptKind) == core.LanguageVariantJSX {
		list := l.getJsxClosingTagCompletion(data.location, file, position, clientOptions)
		if list != nil {
			return list
		}
	}

	// When the completion is for the expression of a case clause (e.g. `case |`),
	// filter literals & enum symbols whose values are already present in existing case clauses.
	caseClause := ast.FindAncestor(contextToken, ast.IsCaseClause)
	if caseClause != nil &&
		(contextToken.Kind == ast.KindCaseKeyword ||
			ast.IsNodeDescendantOf(contextToken, caseClause.Expression())) {
		tracker := newCaseClauseTracker(typeChecker, caseClause.Parent.AsCaseBlock().Clauses.Nodes)
		literals = core.Filter(literals, func(literal literalValue) bool {
			return !tracker.hasValue(literal)
		})
		data.symbols = core.Filter(data.symbols, func(symbol *ast.Symbol) bool {
			if symbol.ValueDeclaration != nil && ast.IsEnumMember(symbol.ValueDeclaration) {
				value := typeChecker.GetConstantValue(symbol.ValueDeclaration)
				if value != nil && tracker.hasValue(value) {
					return false
				}
			}
			return true
		})
	}

	isChecked := isCheckedFile(file, compilerOptions)
	if isChecked && !isNewIdentifierLocation && len(data.symbols) == 0 && keywordFilters == KeywordCompletionFiltersNone {
		return nil
	}

	optionalReplacementSpan := l.getOptionalReplacementSpan(data.location, file)
	uniqueNames, sortedEntries := l.getCompletionEntriesFromSymbols(
		ctx,
		data,
		optionalReplacementSpan,
		nil, /*replacementToken*/
		position,
		file,
		program,
		compilerOptions.GetEmitScriptTarget(),
		preferences,
		compilerOptions,
		clientOptions,
	)

	if data.keywordFilters != KeywordCompletionFiltersNone {
		keywordCompletions := getKeywordCompletions(
			data.keywordFilters,
			!data.insideJSDocTagTypeExpression && ast.IsSourceFileJS(file))
		for _, keywordEntry := range keywordCompletions {
			if data.isTypeOnlyLocation && isTypeKeyword(scanner.StringToToken(keywordEntry.Label)) ||
				!data.isTypeOnlyLocation && isContextualKeywordInAutoImportableExpressionSpace(keywordEntry.Label) ||
				!uniqueNames.Has(keywordEntry.Label) {
				uniqueNames.Add(keywordEntry.Label)
				sortedEntries = core.InsertSorted(sortedEntries, keywordEntry, compareCompletionEntries)
			}
		}
	}

	for _, keywordEntry := range getContextualKeywords(file, contextToken, position) {
		if !uniqueNames.Has(keywordEntry.Label) {
			uniqueNames.Add(keywordEntry.Label)
			sortedEntries = core.InsertSorted(sortedEntries, keywordEntry, compareCompletionEntries)
		}
	}

	for _, literal := range literals {
		literalEntry := createCompletionItemForLiteral(file, preferences, literal)
		uniqueNames.Add(literalEntry.Label)
		sortedEntries = core.InsertSorted(sortedEntries, literalEntry, compareCompletionEntries)
	}

	if !isChecked {
		sortedEntries = getJSCompletionEntries(
			file,
			position,
			&uniqueNames,
			compilerOptions.GetEmitScriptTarget(),
			sortedEntries,
		)
	}

	// !!! exhaustive case completions

	itemDefaults := setCommitCharacters(clientOptions, sortedEntries, &data.defaultCommitCharacters)

	return &lsproto.CompletionList{
		IsIncomplete: data.hasUnresolvedAutoImports,
		ItemDefaults: itemDefaults,
		Items:        sortedEntries,
	}
}

func (l *LanguageService) getCompletionEntriesFromSymbols(
	ctx context.Context,
	data *completionDataData,
	optionalReplacementSpan *lsproto.Range,
	replacementToken *ast.Node,
	position int,
	file *ast.SourceFile,
	program *compiler.Program,
	target core.ScriptTarget,
	preferences *UserPreferences,
	compilerOptions *core.CompilerOptions,
	clientOptions *lsproto.CompletionClientCapabilities,
) (uniqueNames core.Set[string], sortedEntries []*lsproto.CompletionItem) {
	closestSymbolDeclaration := getClosestSymbolDeclaration(data.contextToken, data.location)
	useSemicolons := probablyUsesSemicolons(file)
	typeChecker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	isMemberCompletion := isMemberCompletionKind(data.completionKind)
	// Tracks unique names.
	// Value is set to false for global variables or completions from external module exports, because we can have multiple of those;
	// true otherwise. Based on the order we add things we will always see locals first, then globals, then module exports.
	// So adding a completion for a local will prevent us from adding completions for external module exports sharing the same name.
	uniques := make(uniqueNamesMap)
	for _, symbol := range data.symbols {
		symbolId := ast.GetSymbolId(symbol)
		origin := data.symbolToOriginInfoMap[symbolId]
		name, needsConvertPropertyAccess := getCompletionEntryDisplayNameForSymbol(
			symbol,
			target,
			origin,
			data.completionKind,
			data.isJsxIdentifierExpected,
		)
		if name == "" ||
			uniques[name] && (origin == nil || !originIsObjectLiteralMethod(origin)) ||
			data.completionKind == CompletionKindGlobal &&
				!shouldIncludeSymbol(symbol, data, closestSymbolDeclaration, file, typeChecker, compilerOptions) {
			continue
		}

		// When in a value location in a JS file, ignore symbols that definitely seem to be type-only.
		if !data.isTypeOnlyLocation && ast.IsSourceFileJS(file) && symbolAppearsToBeTypeOnly(symbol, typeChecker) {
			continue
		}

		originalSortText := data.symbolToSortTextMap[ast.GetSymbolId(symbol)]
		if originalSortText == "" {
			originalSortText = SortTextLocationPriority
		}

		var sortText sortText
		if isDeprecated(symbol, typeChecker) {
			sortText = DeprecateSortText(originalSortText)
		} else {
			sortText = originalSortText
		}
		entry := l.createCompletionItem(
			ctx,
			symbol,
			sortText,
			replacementToken,
			data,
			position,
			file,
			program,
			name,
			needsConvertPropertyAccess,
			origin,
			useSemicolons,
			compilerOptions,
			preferences,
			clientOptions,
			isMemberCompletion,
			optionalReplacementSpan,
		)
		if entry == nil {
			continue
		}

		// True for locals; false for globals, module exports from other files, `this.` completions.
		shouldShadowLaterSymbols := (origin == nil || originIsTypeOnlyAlias(origin)) &&
			!(symbol.Parent == nil &&
				!core.Some(symbol.Declarations, func(d *ast.Node) bool { return ast.GetSourceFileOfNode(d) == file }))
		uniques[name] = shouldShadowLaterSymbols
		sortedEntries = core.InsertSorted(sortedEntries, entry, compareCompletionEntries)
	}

	uniqueSet := core.NewSetWithSizeHint[string](len(uniques))
	for name := range maps.Keys(uniques) {
		uniqueSet.Add(name)
	}
	return *uniqueSet, sortedEntries
}

func completionNameForLiteral(
	file *ast.SourceFile,
	preferences *UserPreferences,
	literal literalValue,
) string {
	switch literal := literal.(type) {
	case string:
		return quote(file, preferences, literal)
	case jsnum.Number:
		name, _ := core.StringifyJson(literal, "" /*prefix*/, "" /*suffix*/)
		return name
	case jsnum.PseudoBigInt:
		return literal.String() + "n"
	}
	panic(fmt.Sprintf("Unhandled literal value: %v", literal))
}

func createCompletionItemForLiteral(
	file *ast.SourceFile,
	preferences *UserPreferences,
	literal literalValue,
) *lsproto.CompletionItem {
	return &lsproto.CompletionItem{
		Label:            completionNameForLiteral(file, preferences, literal),
		Kind:             ptrTo(lsproto.CompletionItemKindConstant),
		SortText:         ptrTo(string(SortTextLocationPriority)),
		CommitCharacters: ptrTo([]string{}),
	}
}

func (l *LanguageService) createCompletionItem(
	ctx context.Context,
	symbol *ast.Symbol,
	sortText sortText,
	replacementToken *ast.Node,
	data *completionDataData,
	position int,
	file *ast.SourceFile,
	program *compiler.Program,
	name string,
	needsConvertPropertyAccess bool,
	origin *symbolOriginInfo,
	useSemicolons bool,
	compilerOptions *core.CompilerOptions,
	preferences *UserPreferences,
	clientOptions *lsproto.CompletionClientCapabilities,
	isMemberCompletion bool,
	optionalReplacementSpan *lsproto.Range,
) *lsproto.CompletionItem {
	contextToken := data.contextToken
	var insertText string
	var filterText string
	replacementSpan := l.getReplacementRangeForContextToken(file, replacementToken, position)
	var isSnippet, hasAction bool
	source := getSourceFromOrigin(origin)
	var labelDetails *lsproto.CompletionItemLabelDetails

	typeChecker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	insertQuestionDot := originIsNullableMember(origin)
	useBraces := originIsSymbolMember(origin) || needsConvertPropertyAccess
	if originIsThisType(origin) {
		if needsConvertPropertyAccess {
			insertText = fmt.Sprintf(
				"this%s[%s]",
				core.IfElse(insertQuestionDot, "?.", ""),
				quotePropertyName(file, preferences, name))
		} else {
			insertText = fmt.Sprintf(
				"this%s%s",
				core.IfElse(insertQuestionDot, "?.", ""),
				name)
		}
	} else if data.propertyAccessToConvert != nil && (useBraces || insertQuestionDot) {
		// We should only have needsConvertPropertyAccess if there's a property access to convert. But see microsoft/TypeScript#21790.
		// Somehow there was a global with a non-identifier name. Hopefully someone will complain about getting a "foo bar" global completion and provide a repro.
		if useBraces {
			if needsConvertPropertyAccess {
				insertText = fmt.Sprintf("[%s]", quotePropertyName(file, preferences, name))
			} else {
				insertText = fmt.Sprintf("[%s]", name)
			}
		} else {
			insertText = name
		}

		if insertQuestionDot || data.propertyAccessToConvert.AsPropertyAccessExpression().QuestionDotToken != nil {
			insertText = "?." + insertText
		}

		dot := findChildOfKind(data.propertyAccessToConvert, ast.KindDotToken, file)
		if dot == nil {
			dot = findChildOfKind(data.propertyAccessToConvert, ast.KindQuestionDotToken, file)
		}

		if dot == nil {
			return nil
		}

		// If the text after the '.' starts with this name, write over it. Else, add new text.
		var end int
		if strings.HasPrefix(name, data.propertyAccessToConvert.Name().Text()) {
			end = data.propertyAccessToConvert.End()
		} else {
			end = dot.End()
		}
		replacementSpan = l.createLspRangeFromBounds(astnav.GetStartOfNode(dot, file, false /*includeJSDoc*/), end, file)
	}

	if data.jsxInitializer.isInitializer {
		if insertText == "" {
			insertText = name
		}
		insertText = fmt.Sprintf("{%s}", insertText)
		if data.jsxInitializer.initializer != nil {
			replacementSpan = l.createLspRangeFromNode(data.jsxInitializer.initializer, file)
		}
	}

	if originIsPromise(origin) && data.propertyAccessToConvert != nil {
		if insertText == "" {
			insertText = name
		}
		precedingToken := astnav.FindPrecedingToken(file, data.propertyAccessToConvert.Pos())
		var awaitText string
		if precedingToken != nil && positionIsASICandidate(precedingToken.End(), precedingToken.Parent, file) {
			awaitText = ";"
		}

		awaitText += "(await " + scanner.GetTextOfNode(data.propertyAccessToConvert.Expression()) + ")"
		if needsConvertPropertyAccess {
			insertText = awaitText + insertText
		} else {
			dotStr := core.IfElse(insertQuestionDot, "?.", ".")
			insertText = awaitText + dotStr + insertText
		}
		isInAwaitExpression := ast.IsAwaitExpression(data.propertyAccessToConvert.Parent)
		wrapNode := core.IfElse(
			isInAwaitExpression,
			data.propertyAccessToConvert.Parent,
			data.propertyAccessToConvert.Expression(),
		)
		replacementSpan = l.createLspRangeFromBounds(
			astnav.GetStartOfNode(wrapNode, file, false /*includeJSDoc*/),
			data.propertyAccessToConvert.End(),
			file)
	}

	if originIsResolvedExport(origin) {
		labelDetails = &lsproto.CompletionItemLabelDetails{
			Description: &origin.asResolvedExport().moduleSpecifier, // !!! vscode @link support
		}
		if data.importStatementCompletion != nil {
			// !!! auto-imports
		}
	}

	if originIsTypeOnlyAlias(origin) {
		hasAction = true
	}

	// Provide object member completions when missing commas, and insert missing commas.
	// For example:
	//
	//    interface I {
	//        a: string;
	//        b: number
	//     }
	//
	//     const cc: I = { a: "red" | }
	//
	// Completion should add a comma after "red" and provide completions for b
	if data.completionKind == CompletionKindObjectPropertyDeclaration &&
		contextToken != nil &&
		!ast.NodeHasKind(astnav.FindPrecedingTokenEx(file, contextToken.Pos(), contextToken, false /*excludeJSDoc*/), ast.KindCommaToken) {
		if ast.IsMethodDeclaration(contextToken.Parent.Parent) ||
			ast.IsGetAccessorDeclaration(contextToken.Parent.Parent) ||
			ast.IsSetAccessorDeclaration(contextToken.Parent.Parent) ||
			ast.IsSpreadAssignment(contextToken.Parent) ||
			getLastToken(ast.FindAncestor(contextToken.Parent, ast.IsPropertyAssignment), file) == contextToken ||
			ast.IsShorthandPropertyAssignment(contextToken.Parent) &&
				getLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position) {
			source = string(completionSourceObjectLiteralMemberWithComma)
			hasAction = true
		}
	}

	if ptrIsTrue(preferences.IncludeCompletionsWithClassMemberSnippets) &&
		data.completionKind == CompletionKindMemberLike &&
		isClassLikeMemberCompletion(symbol, data.location, file) {
		// !!! class member completions
	}

	if originIsObjectLiteralMethod(origin) {
		insertText = origin.asObjectLiteralMethod().insertText
		isSnippet = origin.asObjectLiteralMethod().isSnippet
		labelDetails = origin.asObjectLiteralMethod().labelDetails // !!! check if this can conflict with case above where we set label details
		if !ptrIsTrue(clientOptions.CompletionItem.LabelDetailsSupport) {
			name = name + *origin.asObjectLiteralMethod().labelDetails.Detail
			labelDetails = nil
		}
		source = string(completionSourceObjectLiteralMethodSnippet)
		sortText = sortBelow(sortText)
	}

	if data.isJsxIdentifierExpected &&
		!data.isRightOfOpenTag &&
		ptrIsTrue(clientOptions.CompletionItem.SnippetSupport) &&
		!jsxAttributeCompletionStyleIs(preferences.JsxAttributeCompletionStyle, JsxAttributeCompletionStyleNone) &&
		!(ast.IsJsxAttribute(data.location.Parent) && data.location.Parent.Initializer() != nil) {
		useBraces := jsxAttributeCompletionStyleIs(preferences.JsxAttributeCompletionStyle, JsxAttributeCompletionStyleBraces)
		t := typeChecker.GetTypeOfSymbolAtLocation(symbol, data.location)

		// If is boolean like or undefined, don't return a snippet, we want to return just the completion.
		if jsxAttributeCompletionStyleIs(preferences.JsxAttributeCompletionStyle, JsxAttributeCompletionStyleAuto) &&
			!t.IsBooleanLike() &&
			!(t.IsUnion() && core.Some(t.Types(), (*checker.Type).IsBooleanLike)) {
			if t.IsStringLike() ||
				t.IsUnion() &&
					core.Every(
						t.Types(),
						func(t *checker.Type) bool {
							return t.Flags()&(checker.TypeFlagsStringLike|checker.TypeFlagsUndefined) != 0 ||
								isStringAndEmptyAnonymousObjectIntersection(typeChecker, t)
						}) {
				// If type is string-like or undefined, use quotes.
				insertText = fmt.Sprintf("%s=%s", escapeSnippetText(name), quote(file, preferences, "$1"))
				isSnippet = true
			} else {
				// Use braces for everything else.
				useBraces = true
			}
		}

		if useBraces {
			insertText = escapeSnippetText(name) + "={$1}"
			isSnippet = true
		}
	}

	if originIsExport(origin) || originIsResolvedExport(origin) {
		// !!! auto-imports
		// data = originToCompletionEntryData(origin)
		// hasAction = importStatementCompletion == nil
	}

	parentNamedImportOrExport := ast.FindAncestor(data.location, isNamedImportsOrExports)
	if parentNamedImportOrExport != nil {
		languageVersion := compilerOptions.GetEmitScriptTarget()
		if !scanner.IsIdentifierText(name, languageVersion, core.LanguageVariantStandard) {
			insertText = quotePropertyName(file, preferences, name)

			if parentNamedImportOrExport.Kind == ast.KindNamedImports {
				// Check if it is `import { ^here as name } from '...'``.
				// We have to access the scanner here to check if it is `{ ^here as name }`` or `{ ^here, as, name }`.
				scanner := scanner.NewScanner()
				scanner.SetText(file.Text())
				scanner.ResetPos(position)
				if !(scanner.Scan() == ast.KindAsKeyword && scanner.Scan() == ast.KindIdentifier) {
					insertText += " as " + generateIdentifierForArbitraryString(name, languageVersion)
				}
			}
		} else if parentNamedImportOrExport.Kind == ast.KindNamedImports {
			possibleToken := scanner.StringToToken(name)
			if possibleToken != ast.KindUnknown &&
				(possibleToken == ast.KindAwaitKeyword || isNonContextualKeyword(possibleToken)) {
				insertText = fmt.Sprintf("%s as %s_", name, name)
			}
		}
	}

	// Commit characters

	elementKind := getSymbolKind(typeChecker, symbol, data.location)
	var commitCharacters *[]string
	if ptrIsTrue(clientOptions.CompletionItem.CommitCharactersSupport) {
		if elementKind == ScriptElementKindWarning || elementKind == ScriptElementKindString {
			commitCharacters = &[]string{}
		} else if !supportsDefaultCommitCharacters(clientOptions) {
			commitCharacters = ptrTo(data.defaultCommitCharacters)
		}
		// Otherwise use the completion list default.
	}

	preselect := isRecommendedCompletionMatch(symbol, data.recommendedCompletion, typeChecker)
	kindModifiers := getSymbolModifiers(typeChecker, symbol)

	return l.createLSPCompletionItem(
		name,
		insertText,
		filterText,
		sortText,
		elementKind,
		kindModifiers,
		replacementSpan,
		optionalReplacementSpan,
		commitCharacters,
		labelDetails,
		file,
		position,
		clientOptions,
		isMemberCompletion,
		isSnippet,
		hasAction,
		preselect,
		source,
	)
}

func supportsDefaultCommitCharacters(clientOptions *lsproto.CompletionClientCapabilities) bool {
	return clientOptions.CompletionList.ItemDefaults != nil &&
		slices.Contains(*clientOptions.CompletionList.ItemDefaults, "commitCharacters")
}

func isRecommendedCompletionMatch(localSymbol *ast.Symbol, recommendedCompletion *ast.Symbol, typeChecker *checker.Checker) bool {
	return localSymbol == recommendedCompletion ||
		localSymbol.Flags&ast.SymbolFlagsExportValue != 0 && typeChecker.GetExportSymbolOfSymbol(localSymbol) == recommendedCompletion
}

// Ported from vscode's `USUAL_WORD_SEPARATORS`.
var wordSeparators = core.NewSetFromItems(
	'`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '[', '{', ']', '}', '\\', '|',
	';', ':', '\'', '"', ',', '.', '<', '>', '/', '?',
)

// Finds the range of the word that ends at the given position.
// e.g. for "abc def.ghi|jkl", the word range is "ghi" and the word start is 'g'.
func getWordRange(sourceFile *ast.SourceFile, position int) (wordRange *core.TextRange, wordStart rune) {
	// !!! Port other case of vscode's `DEFAULT_WORD_REGEXP` that covers words that start like numbers, e.g. -123.456abcd.
	text := sourceFile.Text()[:position]
	totalSize := 0
	var firstRune rune
	for r, size := utf8.DecodeLastRuneInString(text); size != 0; r, size = utf8.DecodeLastRuneInString(text[:len(text)-totalSize]) {
		if wordSeparators.Has(r) || unicode.IsSpace(r) {
			break
		}
		totalSize += size
		firstRune = r
	}
	// If word starts with `@`, disregard this first character.
	if firstRune == '@' {
		totalSize -= 1
		firstRune, _ = utf8.DecodeRuneInString(text[len(text)-totalSize:])
	}
	if totalSize == 0 {
		return nil, firstRune
	}
	textRange := core.NewTextRange(position-totalSize, position)
	return &textRange, firstRune
}

// Ported from vscode ts extension: `getFilterText`.
func getFilterText(
	file *ast.SourceFile,
	position int,
	insertText string,
	label string,
	isMemberCompletion bool,
	isSnippet bool,
	wordStart rune,
) string {
	// Private field completion.
	if strings.HasPrefix(label, "#") {
		// !!! document theses cases
		if insertText != "" {
			if strings.HasPrefix(insertText, "this.#") {
				if wordStart == '#' {
					return insertText
				} else {
					return strings.TrimPrefix(insertText, "this.#")
				}
			}
		} else {
			if wordStart == '#' {
				return ""
			} else {
				return strings.TrimPrefix(label, "#")
			}
		}
	}

	// For `this.` completions, generally don't set the filter text since we don't want them to be overly prioritized. microsoft/vscode#74164
	if strings.HasPrefix(insertText, "this.") {
		return ""
	}

	// Handle the case:
	// ```
	// const xyz = { 'ab c': 1 };
	// xyz.ab|
	// ```
	// In which case we want to insert a bracket accessor but should use `.abc` as the filter text instead of
	// the bracketed insert text.
	if strings.HasPrefix(insertText, "[") {
		if strings.HasPrefix(insertText, `['`) && strings.HasSuffix(insertText, `']`) {
			return "." + strings.TrimPrefix(strings.TrimSuffix(insertText, `']`), `['`)
		}
		if strings.HasPrefix(insertText, `["`) && strings.HasSuffix(insertText, `"]`) {
			return "." + strings.TrimPrefix(strings.TrimSuffix(insertText, `"]`), `["`)
		}
		return insertText
	}

	// In all other cases, fall back to using the insertText.
	return insertText
}

// Ported from vscode's `provideCompletionItems`.
func getDotAccessorContext(file *ast.SourceFile, position int) (acessorRange *core.TextRange, accessorText string) {
	text := file.Text()[:position]
	totalSize := 0
	for r, size := utf8.DecodeLastRuneInString(text); size != 0; r, size = utf8.DecodeLastRuneInString(text[:len(text)-totalSize]) {
		if !unicode.IsSpace(r) {
			break
		}
		totalSize += size
		text = text[:len(text)-size]
	}
	if strings.HasSuffix(text, "?.") {
		totalSize += 2
		newRange := core.NewTextRange(position-totalSize, position)
		return &newRange, file.Text()[position-totalSize : position]
	}
	if strings.HasSuffix(text, ".") {
		totalSize += 1
		newRange := core.NewTextRange(position-totalSize, position)
		return &newRange, file.Text()[position-totalSize : position]
	}
	return nil, ""
}

func strPtrTo(v string) *string {
	if v == "" {
		return nil
	}
	return &v
}

func ptrIsTrue(ptr *bool) bool {
	if ptr == nil {
		return false
	}
	return *ptr
}

func ptrIsFalse(ptr *bool) bool {
	if ptr == nil {
		return false
	}
	return !*ptr
}

func boolToPtr(v bool) *bool {
	if v {
		return ptrTo(true)
	}
	return nil
}

func jsxAttributeCompletionStyleIs(preferenceStyle *JsxAttributeCompletionStyle, style JsxAttributeCompletionStyle) bool {
	if preferenceStyle == nil {
		return false
	}
	return *preferenceStyle == style
}

func getLineOfPosition(file *ast.SourceFile, pos int) int {
	line, _ := scanner.GetLineAndCharacterOfPosition(file, pos)
	return line
}

func isClassLikeMemberCompletion(symbol *ast.Symbol, location *ast.Node, file *ast.SourceFile) bool {
	// !!! class member completions
	return false
}

func symbolAppearsToBeTypeOnly(symbol *ast.Symbol, typeChecker *checker.Checker) bool {
	flags := checker.GetCombinedLocalAndExportSymbolFlags(checker.SkipAlias(symbol, typeChecker))
	return flags&ast.SymbolFlagsValue == 0 &&
		(len(symbol.Declarations) == 0 || !ast.IsInJSFile(symbol.Declarations[0]) || flags&ast.SymbolFlagsType != 0)
}

func shouldIncludeSymbol(
	symbol *ast.Symbol,
	data *completionDataData,
	closestSymbolDeclaration *ast.Declaration,
	file *ast.SourceFile,
	typeChecker *checker.Checker,
	compilerOptions *core.CompilerOptions,
) bool {
	allFlags := symbol.Flags
	location := data.location
	if !ast.IsSourceFile(location) {
		// export = /**/ here we want to get all meanings, so any symbol is ok
		if ast.IsExportAssignment(location.Parent) {
			return true
		}

		// Filter out variables from their own initializers
		// `const a = /* no 'a' here */`
		if closestSymbolDeclaration != nil &&
			ast.IsVariableDeclaration(closestSymbolDeclaration) &&
			symbol.ValueDeclaration == closestSymbolDeclaration {
			return false
		}

		// Filter out current and latter parameters from defaults
		// `function f(a = /* no 'a' and 'b' here */, b) { }` or
		// `function f<T = /* no 'T' and 'T2' here */>(a: T, b: T2) { }`
		var symbolDeclaration *ast.Declaration
		if symbol.ValueDeclaration != nil {
			symbolDeclaration = symbol.ValueDeclaration
		} else if len(symbol.Declarations) > 0 {
			symbolDeclaration = symbol.Declarations[0]
		}

		if closestSymbolDeclaration != nil && symbolDeclaration != nil {
			if ast.IsParameter(closestSymbolDeclaration) && ast.IsParameter(symbolDeclaration) {
				parameters := closestSymbolDeclaration.Parent.ParameterList()
				if symbolDeclaration.Pos() >= closestSymbolDeclaration.Pos() &&
					symbolDeclaration.Pos() < parameters.End() {
					return false
				}
			} else if ast.IsTypeParameterDeclaration(closestSymbolDeclaration) &&
				ast.IsTypeParameterDeclaration(symbolDeclaration) {
				if closestSymbolDeclaration == symbolDeclaration && data.contextToken != nil && data.contextToken.Kind == ast.KindExtendsKeyword {
					// filter out the directly self-recursive type parameters
					// `type A<K extends /* no 'K' here*/> = K`
					return false
				}
				if isInTypeParameterDefault(data.contextToken) && !ast.IsInferTypeNode(closestSymbolDeclaration.Parent) {
					typeParameters := closestSymbolDeclaration.Parent.TypeParameterList()
					if typeParameters != nil && symbolDeclaration.Pos() >= closestSymbolDeclaration.Pos() &&
						symbolDeclaration.Pos() < typeParameters.End() {
						return false
					}
				}
			}
		}

		// External modules can have global export declarations that will be
		// available as global keywords in all scopes. But if the external module
		// already has an explicit export and user only wants to use explicit
		// module imports then the global keywords will be filtered out so auto
		// import suggestions will win in the completion.
		symbolOrigin := checker.SkipAlias(symbol, typeChecker)
		// We only want to filter out the global keywords.
		// Auto Imports are not available for scripts so this conditional is always false.
		if file.AsSourceFile().ExternalModuleIndicator != nil &&
			compilerOptions.AllowUmdGlobalAccess != core.TSTrue &&
			data.symbolToSortTextMap[ast.GetSymbolId(symbol)] == SortTextGlobalsOrKeywords &&
			(data.symbolToSortTextMap[ast.GetSymbolId(symbolOrigin)] == SortTextAutoImportSuggestions ||
				data.symbolToSortTextMap[ast.GetSymbolId(symbolOrigin)] == SortTextLocationPriority) {
			return false
		}

		allFlags = allFlags | checker.GetCombinedLocalAndExportSymbolFlags(symbolOrigin)

		// import m = /**/ <-- It can only access namespace (if typing import = x. this would get member symbols and not namespace)
		if isInRightSideOfInternalImportEqualsDeclaration(data.location) {
			return allFlags&ast.SymbolFlagsNamespace != 0
		}

		if data.isTypeOnlyLocation {
			// It's a type, but you can reach it by namespace.type as well.
			return symbolCanBeReferencedAtTypeLocation(symbol, typeChecker, core.Set[ast.SymbolId]{})
		}
	}

	// expressions are value space (which includes the value namespaces)
	return allFlags&ast.SymbolFlagsValue != 0
}

func getCompletionEntryDisplayNameForSymbol(
	symbol *ast.Symbol,
	target core.ScriptTarget,
	origin *symbolOriginInfo,
	completionKind CompletionKind,
	isJsxIdentifierExpected bool,
) (displayName string, needsConvertPropertyAccess bool) {
	if originIsIgnore(origin) {
		return "", false
	}

	var name string
	if originIncludesSymbolName(origin) {
		name = origin.symbolName()
	} else {
		name = symbol.Name
	}
	if name == "" ||
		// If the symbol is external module, don't show it in the completion list
		// (i.e declare module "http" { const x; } | // <= request completion here, "http" should not be there)
		symbol.Flags&ast.SymbolFlagsModule != 0 && startsWithQuote(name) ||
		// If the symbol is the internal name of an ES symbol, it is not a valid entry. Internal names for ES symbols start with "__@"
		checker.IsKnownSymbol(symbol) {
		return "", false
	}

	variant := core.IfElse(isJsxIdentifierExpected, core.LanguageVariantJSX, core.LanguageVariantStandard)
	// name is a valid identifier or private identifier text
	if scanner.IsIdentifierText(name, target, variant) ||
		symbol.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration) {
		return name, false
	}
	if symbol.Flags&ast.SymbolFlagsAlias != 0 {
		// Allow non-identifier import/export aliases since we can insert them as string literals
		return name, true
	}

	switch completionKind {
	case CompletionKindMemberLike:
		if originIsComputedPropertyName(origin) {
			return origin.symbolName(), false
		}
		return "", false
	case CompletionKindObjectPropertyDeclaration:
		// TODO: microsoft/TypeScript#18169
		escapedName, _ := core.StringifyJson(name, "", "")
		return escapedName, false
	case CompletionKindPropertyAccess, CompletionKindGlobal:
		// For a 'this.' completion it will be in a global context, but may have a non-identifier name.
		// Don't add a completion for a name starting with a space. See https://github.com/Microsoft/TypeScript/pull/20547
		ch, _ := utf8.DecodeRuneInString(name)
		if ch == ' ' {
			return "", false
		}
		return name, true
	case CompletionKindNone, CompletionKindString:
		return name, false
	default:
		panic(fmt.Sprintf("Unexpected completion kind: %v", completionKind))
	}
}

// !!! refactor symbolOriginInfo so that we can tell the difference between flags and the kind of data it has
func originIsIgnore(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindIgnore != 0
}

func originIncludesSymbolName(origin *symbolOriginInfo) bool {
	return originIsExport(origin) || originIsResolvedExport(origin) || originIsComputedPropertyName(origin)
}

func originIsExport(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindExport != 0
}

func originIsResolvedExport(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindResolvedExport != 0
}

func originIsComputedPropertyName(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindComputedPropertyName != 0
}

func originIsObjectLiteralMethod(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindObjectLiteralMethod != 0
}

func originIsThisType(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindThisType != 0
}

func originIsTypeOnlyAlias(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindTypeOnlyAlias != 0
}

func originIsSymbolMember(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindSymbolMember != 0
}

func originIsNullableMember(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindNullable != 0
}

func originIsPromise(origin *symbolOriginInfo) bool {
	return origin != nil && origin.kind&symbolOriginInfoKindPromise != 0
}

func getSourceFromOrigin(origin *symbolOriginInfo) string {
	if originIsExport(origin) {
		return core.StripQuotes(origin.asExport().moduleSymbol.Name)
	}

	if originIsResolvedExport(origin) {
		return origin.asResolvedExport().moduleSpecifier
	}

	if originIsThisType(origin) {
		return string(completionSourceThisProperty)
	}

	if originIsTypeOnlyAlias(origin) {
		return string(completionSourceTypeOnlyAlias)
	}

	return ""
}

// In a scenarion such as `const x = 1 * |`, the context and previous tokens are both `*`.
// In `const x = 1 * o|`, the context token is *, and the previous token is `o`.
// `contextToken` and `previousToken` can both be nil if we are at the beginning of the file.
func getRelevantTokens(position int, file *ast.SourceFile) (contextToken *ast.Node, previousToken *ast.Node) {
	previousToken = astnav.FindPrecedingToken(file, position)
	if previousToken != nil && position <= previousToken.End() && (ast.IsMemberName(previousToken) || ast.IsKeywordKind(previousToken.Kind)) {
		contextToken := astnav.FindPrecedingToken(file, previousToken.Pos())
		return contextToken, previousToken
	}
	return previousToken, previousToken
}

// "." | '"' | "'" | "`" | "/" | "@" | "<" | "#" | " "
type CompletionsTriggerCharacter = string

func isValidTrigger(file *ast.SourceFile, triggerCharacter CompletionsTriggerCharacter, contextToken *ast.Node, position int) bool {
	switch triggerCharacter {
	case ".", "@":
		return true
	case "\"", "'", "`":
		// Only automatically bring up completions if this is an opening quote.
		return contextToken != nil &&
			isStringLiteralOrTemplate(contextToken) &&
			position == astnav.GetStartOfNode(contextToken, file, false /*includeJSDoc*/)+1
	case "#":
		return contextToken != nil &&
			ast.IsPrivateIdentifier(contextToken) &&
			ast.GetContainingClass(contextToken) != nil
	case "<":
		// Opening JSX tag
		return contextToken != nil &&
			contextToken.Kind == ast.KindLessThanToken &&
			(!ast.IsBinaryExpression(contextToken.Parent) || binaryExpressionMayBeOpenTag(contextToken.Parent.AsBinaryExpression()))
	case "/":
		if contextToken == nil {
			return false
		}
		if ast.IsStringLiteralLike(contextToken) {
			return tryGetImportFromModuleSpecifier(contextToken) != nil
		}
		return contextToken.Kind == ast.KindSlashToken && ast.IsJsxClosingElement(contextToken.Parent)
	case " ":
		return contextToken != nil && contextToken.Kind == ast.KindImportKeyword && contextToken.Parent.Kind == ast.KindSourceFile
	default:
		panic("Unknown trigger character: " + triggerCharacter)
	}
}

func isStringLiteralOrTemplate(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindTemplateExpression,
		ast.KindTaggedTemplateExpression:
		return true
	}
	return false
}

func binaryExpressionMayBeOpenTag(binaryExpression *ast.BinaryExpression) bool {
	return ast.NodeIsMissing(binaryExpression.Left)
}

func isCheckedFile(file *ast.SourceFile, compilerOptions *core.CompilerOptions) bool {
	return !ast.IsSourceFileJS(file) || ast.IsCheckJSEnabledForFile(file, compilerOptions)
}

func isContextTokenValueLocation(contextToken *ast.Node) bool {
	return contextToken != nil && ((contextToken.Kind == ast.KindTypeOfKeyword &&
		(contextToken.Parent.Kind == ast.KindTypeQuery || ast.IsTypeOfExpression(contextToken.Parent))) ||
		(contextToken.Kind == ast.KindAssertsKeyword && contextToken.Parent.Kind == ast.KindTypePredicate))
}

func isPossiblyTypeArgumentPosition(token *ast.Node, sourceFile *ast.SourceFile, typeChecker *checker.Checker) bool {
	info := getPossibleTypeArgumentsInfo(token, sourceFile)
	return info != nil && (ast.IsPartOfTypeNode(info.called) ||
		len(getPossibleGenericSignatures(info.called, info.nTypeArguments, typeChecker)) != 0 ||
		isPossiblyTypeArgumentPosition(info.called, sourceFile, typeChecker))
}

func isContextTokenTypeLocation(contextToken *ast.Node) bool {
	if contextToken != nil {
		parentKind := contextToken.Parent.Kind
		switch contextToken.Kind {
		case ast.KindColonToken:
			return parentKind == ast.KindPropertyDeclaration ||
				parentKind == ast.KindPropertySignature ||
				parentKind == ast.KindParameter ||
				parentKind == ast.KindVariableDeclaration ||
				ast.IsFunctionLikeKind(parentKind)
		case ast.KindEqualsToken:
			return parentKind == ast.KindTypeAliasDeclaration || parentKind == ast.KindTypeParameter
		case ast.KindAsKeyword:
			return parentKind == ast.KindAsExpression
		case ast.KindLessThanToken:
			return parentKind == ast.KindTypeReference || parentKind == ast.KindTypeAssertionExpression
		case ast.KindExtendsKeyword:
			return parentKind == ast.KindTypeParameter
		case ast.KindSatisfiesKeyword:
			return parentKind == ast.KindSatisfiesExpression
		}
	}
	return false
}

// True if symbol is a type or a module containing at least one type.
func symbolCanBeReferencedAtTypeLocation(symbol *ast.Symbol, typeChecker *checker.Checker, seenModules core.Set[ast.SymbolId]) bool {
	// Since an alias can be merged with a local declaration, we need to test both the alias and its target.
	// This code used to just test the result of `skipAlias`, but that would ignore any locally introduced meanings.
	return nonAliasCanBeReferencedAtTypeLocation(symbol, typeChecker, seenModules) ||
		nonAliasCanBeReferencedAtTypeLocation(
			checker.SkipAlias(core.IfElse(symbol.ExportSymbol != nil, symbol.ExportSymbol, symbol), typeChecker),
			typeChecker,
			seenModules,
		)
}

func nonAliasCanBeReferencedAtTypeLocation(symbol *ast.Symbol, typeChecker *checker.Checker, seenModules core.Set[ast.SymbolId]) bool {
	return symbol.Flags&ast.SymbolFlagsType != 0 || typeChecker.IsUnknownSymbol(symbol) ||
		symbol.Flags&ast.SymbolFlagsModule != 0 && seenModules.AddIfAbsent(ast.GetSymbolId(symbol)) &&
			core.Some(
				typeChecker.GetExportsOfModule(symbol),
				func(e *ast.Symbol) bool { return symbolCanBeReferencedAtTypeLocation(e, typeChecker, seenModules) })
}

// Gets all properties on a type, but if that type is a union of several types,
// excludes array-like types or callable/constructable types.
func getPropertiesForCompletion(t *checker.Type, typeChecker *checker.Checker) []*ast.Symbol {
	if t.IsUnion() {
		return core.CheckEachDefined(typeChecker.GetAllPossiblePropertiesOfTypes(t.Types()), "getAllPossiblePropertiesOfTypes() should all be defined.")
	} else {
		return core.CheckEachDefined(typeChecker.GetApparentProperties(t), "getApparentProperties() should all be defined.")
	}
}

// Given 'a.b.c', returns 'a'.
func getLeftMostName(e *ast.Expression) *ast.IdentifierNode {
	if ast.IsIdentifier(e) {
		return e
	} else if ast.IsPropertyAccessExpression(e) {
		return getLeftMostName(e.Expression())
	} else {
		return nil
	}
}

func getFirstSymbolInChain(symbol *ast.Symbol, enclosingDeclaration *ast.Node, typeChecker *checker.Checker) *ast.Symbol {
	chain := typeChecker.GetAccessibleSymbolChain(
		symbol,
		enclosingDeclaration,
		ast.SymbolFlagsAll, /*meaning*/
		false /*useOnlyExternalAliasing*/)
	if len(chain) > 0 {
		return chain[0]
	}
	if symbol.Parent != nil {
		if isModuleSymbol(symbol.Parent) {
			return symbol
		}
		return getFirstSymbolInChain(symbol.Parent, enclosingDeclaration, typeChecker)
	}
	return nil
}

func isModuleSymbol(symbol *ast.Symbol) bool {
	return core.Some(symbol.Declarations, func(decl *ast.Declaration) bool { return decl.Kind == ast.KindSourceFile })
}

func getNullableSymbolOriginInfoKind(kind symbolOriginInfoKind, insertQuestionDot bool) symbolOriginInfoKind {
	if insertQuestionDot {
		kind |= symbolOriginInfoKindNullable
	}
	return kind
}

func isStaticProperty(symbol *ast.Symbol) bool {
	return symbol.ValueDeclaration != nil &&
		symbol.ValueDeclaration.ModifierFlags()&ast.ModifierFlagsStatic != 0 &&
		ast.IsClassLike(symbol.ValueDeclaration.Parent)
}

func getContextualType(previousToken *ast.Node, position int, file *ast.SourceFile, typeChecker *checker.Checker) *checker.Type {
	parent := previousToken.Parent
	switch previousToken.Kind {
	case ast.KindIdentifier:
		return getContextualTypeFromParent(previousToken, typeChecker, checker.ContextFlagsNone)
	case ast.KindEqualsToken:
		switch parent.Kind {
		case ast.KindVariableDeclaration:
			return typeChecker.GetContextualType(parent.Initializer(), checker.ContextFlagsNone)
		case ast.KindBinaryExpression:
			return typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Left)
		case ast.KindJsxAttribute:
			return typeChecker.GetContextualTypeForJsxAttribute(parent)
		default:
			return nil
		}
	case ast.KindNewKeyword:
		return typeChecker.GetContextualType(parent, checker.ContextFlagsNone)
	case ast.KindCaseKeyword:
		caseClause := core.IfElse(ast.IsCaseClause(parent), parent, nil)
		if caseClause != nil {
			return getSwitchedType(caseClause, typeChecker)
		}
		return nil
	case ast.KindOpenBraceToken:
		if ast.IsJsxExpression(parent) && !ast.IsJsxElement(parent.Parent) && !ast.IsJsxFragment(parent.Parent) {
			return typeChecker.GetContextualTypeForJsxAttribute(parent.Parent)
		}
		return nil
	default:
		// argInfo := getArgumentInfoForCompletions(previousToken, position, file, typeChecker) // !!! signature help
		var argInfo *struct{} // !!! signature help
		if argInfo != nil {
			// !!! signature help
			return nil
		} else if isEqualityOperatorKind(previousToken.Kind) && ast.IsBinaryExpression(parent) && isEqualityOperatorKind(parent.AsBinaryExpression().OperatorToken.Kind) {
			// completion at `x ===/**/`
			return typeChecker.GetTypeAtLocation(parent.AsBinaryExpression().Left)
		} else {
			contextualType := typeChecker.GetContextualType(previousToken, checker.ContextFlagsCompletions)
			if contextualType != nil {
				return contextualType
			}
			return typeChecker.GetContextualType(previousToken, checker.ContextFlagsNone)
		}
	}
}

func getContextualTypeFromParent(node *ast.Expression, typeChecker *checker.Checker, contextFlags checker.ContextFlags) *checker.Type {
	parent := ast.WalkUpParenthesizedExpressions(node.Parent)
	switch parent.Kind {
	case ast.KindNewExpression:
		return typeChecker.GetContextualType(parent, contextFlags)
	case ast.KindBinaryExpression:
		if isEqualityOperatorKind(parent.AsBinaryExpression().OperatorToken.Kind) {
			return typeChecker.GetTypeAtLocation(
				core.IfElse(node == parent.AsBinaryExpression().Right, parent.AsBinaryExpression().Left, parent.AsBinaryExpression().Right))
		}
		return typeChecker.GetContextualType(node, contextFlags)
	case ast.KindCaseClause:
		return getSwitchedType(parent, typeChecker)
	default:
		return typeChecker.GetContextualType(node, contextFlags)
	}
}

func getSwitchedType(caseClause *ast.CaseClauseNode, typeChecker *checker.Checker) *checker.Type {
	return typeChecker.GetTypeAtLocation(caseClause.Parent.Parent.Expression())
}

func isEqualityOperatorKind(kind ast.Kind) bool {
	switch kind {
	case ast.KindEqualsEqualsEqualsToken, ast.KindEqualsEqualsToken,
		ast.KindExclamationEqualsEqualsToken, ast.KindExclamationEqualsToken:
		return true
	default:
		return false
	}
}

func isLiteral(t *checker.Type) bool {
	return t.IsStringLiteral() || t.IsNumberLiteral() || t.IsBigIntLiteral()
}

func getRecommendedCompletion(previousToken *ast.Node, contextualType *checker.Type, typeChecker *checker.Checker) *ast.Symbol {
	var types []*checker.Type
	if contextualType.IsUnion() {
		types = contextualType.Types()
	} else {
		types = []*checker.Type{contextualType}
	}
	// For a union, return the first one with a recommended completion.
	return core.FirstNonNil(
		types,
		func(t *checker.Type) *ast.Symbol {
			symbol := t.Symbol()
			// Don't make a recommended completion for an abstract class.
			if symbol != nil &&
				symbol.Flags&(ast.SymbolFlagsEnumMember|ast.SymbolFlagsEnum|ast.SymbolFlagsClass) != 0 &&
				!isAbstractConstructorSymbol(symbol) {
				return getFirstSymbolInChain(symbol, previousToken, typeChecker)
			}
			return nil
		},
	)
}

func isAbstractConstructorSymbol(symbol *ast.Symbol) bool {
	if symbol.Flags&ast.SymbolFlagsClass != 0 {
		declaration := ast.GetClassLikeDeclarationOfSymbol(symbol)
		return declaration != nil && ast.HasSyntacticModifier(declaration, ast.ModifierFlagsAbstract)
	}
	return false
}

func startsWithQuote(s string) bool {
	r, _ := utf8.DecodeRuneInString(s)
	return r == '"' || r == '\''
}

func getClosestSymbolDeclaration(contextToken *ast.Node, location *ast.Node) *ast.Declaration {
	if contextToken == nil {
		return nil
	}

	closestDeclaration := ast.FindAncestorOrQuit(contextToken, func(node *ast.Node) ast.FindAncestorResult {
		if ast.IsFunctionBlock(node) || isArrowFunctionBody(node) || ast.IsBindingPattern(node) {
			return ast.FindAncestorQuit
		}

		if (ast.IsParameter(node) || ast.IsTypeParameterDeclaration(node)) &&
			!ast.IsIndexSignatureDeclaration(node.Parent) {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	})

	if closestDeclaration == nil {
		closestDeclaration = ast.FindAncestorOrQuit(contextToken, func(node *ast.Node) ast.FindAncestorResult {
			if ast.IsFunctionBlock(node) || isArrowFunctionBody(node) || ast.IsBindingPattern(node) {
				return ast.FindAncestorQuit
			}

			if ast.IsVariableDeclaration(node) {
				return ast.FindAncestorTrue
			}
			return ast.FindAncestorFalse
		})
	}
	return closestDeclaration
}

func isArrowFunctionBody(node *ast.Node) bool {
	return node.Parent != nil && ast.IsArrowFunction(node.Parent) &&
		(node.Parent.Body() == node ||
			// const a = () => /**/;
			node.Kind == ast.KindEqualsGreaterThanToken)
}

func isInTypeParameterDefault(contextToken *ast.Node) bool {
	if contextToken == nil {
		return false
	}

	node := contextToken
	parent := contextToken.Parent
	for parent != nil {
		if ast.IsTypeParameterDeclaration(parent) {
			return parent.AsTypeParameter().DefaultType == node || node.Kind == ast.KindEqualsToken
		}
		node = parent
		parent = parent.Parent
	}

	return false
}

func isDeprecated(symbol *ast.Symbol, typeChecker *checker.Checker) bool {
	declarations := checker.SkipAlias(symbol, typeChecker).Declarations
	return len(declarations) > 0 && core.Every(declarations, func(decl *ast.Declaration) bool { return typeChecker.IsDeprecatedDeclaration(decl) })
}

func (l *LanguageService) getReplacementRangeForContextToken(file *ast.SourceFile, contextToken *ast.Node, position int) *lsproto.Range {
	if contextToken == nil {
		return nil
	}

	// !!! ensure range is single line
	switch contextToken.Kind {
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
		return l.createRangeFromStringLiteralLikeContent(file, contextToken, position)
	default:
		return l.createLspRangeFromNode(contextToken, file)
	}
}

func (l *LanguageService) createRangeFromStringLiteralLikeContent(file *ast.SourceFile, node *ast.StringLiteralLike, position int) *lsproto.Range {
	replacementEnd := node.End() - 1
	nodeStart := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)
	if ast.IsUnterminatedLiteral(node) {
		// we return no replacement range only if unterminated string is empty
		if nodeStart == replacementEnd {
			return nil
		}
		replacementEnd = min(position, node.End())
	}
	return l.createLspRangeFromBounds(nodeStart+1, replacementEnd, file)
}

func quotePropertyName(file *ast.SourceFile, preferences *UserPreferences, name string) string {
	r, _ := utf8.DecodeRuneInString(name)
	if unicode.IsDigit(r) {
		return name
	}
	return quote(file, preferences, name)
}

// Checks whether type is `string & {}`, which is semantically equivalent to string but
// is not reduced by the checker as a special case used for supporting string literal completions
// for string type.
func isStringAndEmptyAnonymousObjectIntersection(typeChecker *checker.Checker, t *checker.Type) bool {
	if !t.IsIntersection() {
		return false
	}

	return len(t.Types()) == 2 &&
		(areIntersectedTypesAvoidingStringReduction(typeChecker, t.Types()[0], t.Types()[1]) ||
			areIntersectedTypesAvoidingStringReduction(typeChecker, t.Types()[1], t.Types()[0]))
}

func areIntersectedTypesAvoidingStringReduction(typeChecker *checker.Checker, t1 *checker.Type, t2 *checker.Type) bool {
	return t1.IsString() && typeChecker.IsEmptyAnonymousObjectType(t2)
}

func escapeSnippetText(text string) string {
	return strings.ReplaceAll(text, `$`, `\$`)
}

func isNamedImportsOrExports(node *ast.Node) bool {
	return ast.IsNamedImports(node) || ast.IsNamedExports(node)
}

func generateIdentifierForArbitraryString(text string, languageVersion core.ScriptTarget) string {
	needsUnderscore := false
	identifier := ""
	var ch rune
	var size int

	// Convert "(example, text)" into "_example_text_"
	for pos := 0; pos < len(text); pos += size {
		ch, size = utf8.DecodeRuneInString(text[pos:])
		var validChar bool
		if pos == 0 {
			validChar = scanner.IsIdentifierStart(ch, languageVersion)
		} else {
			validChar = scanner.IsIdentifierPart(ch, languageVersion)
		}
		if size > 0 && validChar {
			if needsUnderscore {
				identifier += "_"
				identifier += string(ch)
				needsUnderscore = false
			}
		} else {
			needsUnderscore = true
		}
	}

	if needsUnderscore {
		identifier += "_"
	}

	// Default to "_" if the provided text was empty
	if identifier == "" {
		return "_"
	}

	return identifier
}

// Copied from vscode TS extension.
func getCompletionsSymbolKind(kind ScriptElementKind) lsproto.CompletionItemKind {
	switch kind {
	case ScriptElementKindPrimitiveType, ScriptElementKindKeyword:
		return lsproto.CompletionItemKindKeyword
	case ScriptElementKindConstElement, ScriptElementKindLetElement, ScriptElementKindVariableElement,
		ScriptElementKindLocalVariableElement, ScriptElementKindAlias, ScriptElementKindParameterElement:
		return lsproto.CompletionItemKindVariable

	case ScriptElementKindMemberVariableElement, ScriptElementKindMemberGetAccessorElement,
		ScriptElementKindMemberSetAccessorElement:
		return lsproto.CompletionItemKindField

	case ScriptElementKindFunctionElement, ScriptElementKindLocalFunctionElement:
		return lsproto.CompletionItemKindFunction

	case ScriptElementKindMemberFunctionElement, ScriptElementKindConstructSignatureElement,
		ScriptElementKindCallSignatureElement, ScriptElementKindIndexSignatureElement:
		return lsproto.CompletionItemKindMethod

	case ScriptElementKindEnumElement:
		return lsproto.CompletionItemKindEnum

	case ScriptElementKindEnumMemberElement:
		return lsproto.CompletionItemKindEnumMember

	case ScriptElementKindModuleElement, ScriptElementKindExternalModuleName:
		return lsproto.CompletionItemKindModule

	case ScriptElementKindClassElement, ScriptElementKindTypeElement:
		return lsproto.CompletionItemKindClass

	case ScriptElementKindInterfaceElement:
		return lsproto.CompletionItemKindInterface

	case ScriptElementKindWarning:
		return lsproto.CompletionItemKindText

	case ScriptElementKindScriptElement:
		return lsproto.CompletionItemKindFile

	case ScriptElementKindDirectory:
		return lsproto.CompletionItemKindFolder

	case ScriptElementKindString:
		return lsproto.CompletionItemKindConstant

	default:
		return lsproto.CompletionItemKindProperty
	}
}

// Editors will use the `sortText` and then fall back to `name` for sorting, but leave ties in response order.
// So, it's important that we sort those ties in the order we want them displayed if it matters. We don't
// strictly need to sort by name or SortText here since clients are going to do it anyway, but we have to
// do the work of comparing them so we can sort those ties appropriately; plus, it makes the order returned
// by the language service consistent with what TS Server does and what editors typically do. This also makes
// completions tests make more sense. We used to sort only alphabetically and only in the server layer, but
// this made tests really weird, since most fourslash tests don't use the server.
func compareCompletionEntries(entryInSlice *lsproto.CompletionItem, entryToInsert *lsproto.CompletionItem) int {
	// !!! use locale-aware comparison
	result := stringutil.CompareStringsCaseSensitive(*entryInSlice.SortText, *entryToInsert.SortText)
	if result == stringutil.ComparisonEqual {
		result = stringutil.CompareStringsCaseSensitive(entryInSlice.Label, entryToInsert.Label)
	}
	// !!! auto-imports
	// if (result === Comparison.EqualTo && entryInArray.data?.moduleSpecifier && entryToInsert.data?.moduleSpecifier) {
	//     // Sort same-named auto-imports by module specifier
	//     result = compareNumberOfDirectorySeparators(
	//         (entryInArray.data as CompletionEntryDataResolved).moduleSpecifier,
	//         (entryToInsert.data as CompletionEntryDataResolved).moduleSpecifier,
	//     );
	// }
	if result == stringutil.ComparisonEqual {
		// Fall back to symbol order - if we return `EqualTo`, `insertSorted` will put later symbols first.
		return stringutil.ComparisonLessThan
	}

	return result
}

var (
	keywordCompletionsCache = collections.SyncMap[KeywordCompletionFilters, []*lsproto.CompletionItem]{}
	allKeywordCompletions   = sync.OnceValue(func() []*lsproto.CompletionItem {
		result := make([]*lsproto.CompletionItem, 0, ast.KindLastKeyword-ast.KindFirstKeyword+1)
		for i := ast.KindFirstKeyword; i <= ast.KindLastKeyword; i++ {
			result = append(result, &lsproto.CompletionItem{
				Label:    scanner.TokenToString(i),
				Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
				SortText: ptrTo(string(SortTextGlobalsOrKeywords)),
			})
		}
		return result
	})
)

func cloneItems(items []*lsproto.CompletionItem) []*lsproto.CompletionItem {
	result := make([]*lsproto.CompletionItem, len(items))
	for i, item := range items {
		itemClone := *item
		result[i] = &itemClone
	}
	return result
}

func getKeywordCompletions(keywordFilter KeywordCompletionFilters, filterOutTsOnlyKeywords bool) []*lsproto.CompletionItem {
	if !filterOutTsOnlyKeywords {
		return cloneItems(getTypescriptKeywordCompletions(keywordFilter))
	}

	index := keywordFilter + KeywordCompletionFiltersLast + 1
	if cached, ok := keywordCompletionsCache.Load(index); ok {
		return cloneItems(cached)
	}
	result := core.Filter(
		getTypescriptKeywordCompletions(keywordFilter),
		func(ci *lsproto.CompletionItem) bool {
			return !isTypeScriptOnlyKeyword(scanner.StringToToken(ci.Label))
		})
	keywordCompletionsCache.Store(index, result)
	return cloneItems(result)
}

func getTypescriptKeywordCompletions(keywordFilter KeywordCompletionFilters) []*lsproto.CompletionItem {
	if cached, ok := keywordCompletionsCache.Load(keywordFilter); ok {
		return cached
	}
	result := core.Filter(allKeywordCompletions(), func(entry *lsproto.CompletionItem) bool {
		kind := scanner.StringToToken(entry.Label)
		switch keywordFilter {
		case KeywordCompletionFiltersNone:
			return false
		case KeywordCompletionFiltersAll:
			return isFunctionLikeBodyKeyword(kind) ||
				kind == ast.KindDeclareKeyword ||
				kind == ast.KindModuleKeyword ||
				kind == ast.KindTypeKeyword ||
				kind == ast.KindNamespaceKeyword ||
				kind == ast.KindAbstractKeyword ||
				isTypeKeyword(kind) && kind != ast.KindUndefinedKeyword
		case KeywordCompletionFiltersFunctionLikeBodyKeywords:
			return isFunctionLikeBodyKeyword(kind)
		case KeywordCompletionFiltersClassElementKeywords:
			return isClassMemberCompletionKeyword(kind)
		case KeywordCompletionFiltersInterfaceElementKeywords:
			return isInterfaceOrTypeLiteralCompletionKeyword(kind)
		case KeywordCompletionFiltersConstructorParameterKeywords:
			return ast.IsParameterPropertyModifier(kind)
		case KeywordCompletionFiltersTypeAssertionKeywords:
			return isTypeKeyword(kind) || kind == ast.KindConstKeyword
		case KeywordCompletionFiltersTypeKeywords:
			return isTypeKeyword(kind)
		case KeywordCompletionFiltersTypeKeyword:
			return kind == ast.KindTypeKeyword
		default:
			panic(fmt.Sprintf("Unknown keyword filter: %v", keywordFilter))
		}
	})

	keywordCompletionsCache.Store(keywordFilter, result)
	return result
}

func isTypeScriptOnlyKeyword(kind ast.Kind) bool {
	switch kind {
	case ast.KindAbstractKeyword,
		ast.KindAnyKeyword,
		ast.KindBigIntKeyword,
		ast.KindBooleanKeyword,
		ast.KindDeclareKeyword,
		ast.KindEnumKeyword,
		ast.KindGlobalKeyword,
		ast.KindImplementsKeyword,
		ast.KindInferKeyword,
		ast.KindInterfaceKeyword,
		ast.KindIsKeyword,
		ast.KindKeyOfKeyword,
		ast.KindModuleKeyword,
		ast.KindNamespaceKeyword,
		ast.KindNeverKeyword,
		ast.KindNumberKeyword,
		ast.KindObjectKeyword,
		ast.KindOverrideKeyword,
		ast.KindPrivateKeyword,
		ast.KindProtectedKeyword,
		ast.KindPublicKeyword,
		ast.KindReadonlyKeyword,
		ast.KindStringKeyword,
		ast.KindSymbolKeyword,
		ast.KindTypeKeyword,
		ast.KindUniqueKeyword,
		ast.KindUnknownKeyword:
		return true
	default:
		return false
	}
}

func isFunctionLikeBodyKeyword(kind ast.Kind) bool {
	return kind == ast.KindAsyncKeyword ||
		kind == ast.KindAwaitKeyword ||
		kind == ast.KindUsingKeyword ||
		kind == ast.KindAsKeyword ||
		kind == ast.KindAssertsKeyword ||
		kind == ast.KindTypeKeyword ||
		!ast.IsContextualKeyword(kind) && !isClassMemberCompletionKeyword(kind)
}

func isClassMemberCompletionKeyword(kind ast.Kind) bool {
	switch kind {
	case ast.KindAbstractKeyword, ast.KindAccessorKeyword, ast.KindConstructorKeyword, ast.KindGetKeyword,
		ast.KindSetKeyword, ast.KindAsyncKeyword, ast.KindDeclareKeyword, ast.KindOverrideKeyword:
		return true
	default:
		return ast.IsClassMemberModifier(kind)
	}
}

func isInterfaceOrTypeLiteralCompletionKeyword(kind ast.Kind) bool {
	return kind == ast.KindReadonlyKeyword
}

func isContextualKeywordInAutoImportableExpressionSpace(keyword string) bool {
	return keyword == "abstract" ||
		keyword == "async" ||
		keyword == "await" ||
		keyword == "declare" ||
		keyword == "module" ||
		keyword == "namespace" ||
		keyword == "type" ||
		keyword == "satisfies" ||
		keyword == "as"
}

func getContextualKeywords(file *ast.SourceFile, contextToken *ast.Node, position int) []*lsproto.CompletionItem {
	var entries []*lsproto.CompletionItem
	// An `AssertClause` can come after an import declaration:
	//  import * from "foo" |
	//  import "foo" |
	// or after a re-export declaration that has a module specifier:
	//  export { foo } from "foo" |
	// Source: https://tc39.es/proposal-import-assertions/
	if contextToken != nil {
		parent := contextToken.Parent
		tokenLine, _ := scanner.GetLineAndCharacterOfPosition(file, contextToken.End())
		currentLine, _ := scanner.GetLineAndCharacterOfPosition(file, position)
		if (ast.IsImportDeclaration(parent) ||
			ast.IsExportDeclaration(parent) && parent.AsExportDeclaration().ModuleSpecifier != nil) &&
			contextToken == parent.ModuleSpecifier() &&
			tokenLine == currentLine {
			entries = append(entries, &lsproto.CompletionItem{
				Label:    scanner.TokenToString(ast.KindAssertKeyword),
				Kind:     ptrTo(lsproto.CompletionItemKindKeyword),
				SortText: ptrTo(string(SortTextGlobalsOrKeywords)),
			})
		}
	}
	return entries
}

func getJSCompletionEntries(
	file *ast.SourceFile,
	position int,
	uniqueNames *core.Set[string],
	target core.ScriptTarget,
	sortedEntries []*lsproto.CompletionItem,
) []*lsproto.CompletionItem {
	nameTable := getNameTable(file)
	for name, pos := range nameTable {
		// Skip identifiers produced only from the current location
		if pos == position {
			continue
		}
		if !uniqueNames.Has(name) && scanner.IsIdentifierText(name, target, core.LanguageVariantStandard) {
			uniqueNames.Add(name)
			sortedEntries = core.InsertSorted(
				sortedEntries,
				&lsproto.CompletionItem{
					Label:            name,
					Kind:             ptrTo(lsproto.CompletionItemKindText),
					SortText:         ptrTo(string(SortTextJavascriptIdentifiers)),
					CommitCharacters: ptrTo([]string{}),
				},
				compareCompletionEntries,
			)
		}
	}
	return sortedEntries
}

func (l *LanguageService) getOptionalReplacementSpan(location *ast.Node, file *ast.SourceFile) *lsproto.Range {
	// StringLiteralLike locations are handled separately in stringCompletions.ts
	if location != nil && location.Kind == ast.KindIdentifier {
		start := astnav.GetStartOfNode(location, file, false /*includeJSDoc*/)
		return l.createLspRangeFromBounds(start, location.End(), file)
	}
	return nil
}

func isMemberCompletionKind(kind CompletionKind) bool {
	return kind == CompletionKindObjectPropertyDeclaration ||
		kind == CompletionKindMemberLike ||
		kind == CompletionKindPropertyAccess
}

func tryGetFunctionLikeBodyCompletionContainer(contextToken *ast.Node) *ast.Node {
	if contextToken == nil {
		return nil
	}

	var prev *ast.Node
	container := ast.FindAncestorOrQuit(contextToken, func(node *ast.Node) ast.FindAncestorResult {
		if ast.IsClassLike(node) {
			return ast.FindAncestorQuit
		}
		if ast.IsFunctionLikeDeclaration(node) && prev == node.Body() {
			return ast.FindAncestorTrue
		}
		prev = node
		return ast.FindAncestorFalse
	})
	return container
}

func computeCommitCharactersAndIsNewIdentifier(
	contextToken *ast.Node,
	file *ast.SourceFile,
	position int,
) (isNewIdentifierLocation bool, defaultCommitCharacters []string) {
	if contextToken == nil {
		return false, allCommitCharacters
	}
	containingNodeKind := contextToken.Parent.Kind
	tokenKind := keywordForNode(contextToken)
	// Previous token may have been a keyword that was converted to an identifier.
	switch tokenKind {
	case ast.KindCommaToken:
		switch containingNodeKind {
		// func( a, |
		// new C(a, |
		case ast.KindCallExpression, ast.KindNewExpression:
			expression := contextToken.Parent.Expression()
			// func\n(a, |
			if getLineOfPosition(file, expression.End()) != getLineOfPosition(file, position) {
				return true, noCommaCommitCharacters
			}
			return true, allCommitCharacters
		// const x = (a, |
		case ast.KindBinaryExpression:
			return true, noCommaCommitCharacters
		// constructor( a, | /* public, protected, private keywords are allowed here, so show completion */
		// var x: (s: string, list|
		// const obj = { x, |
		case ast.KindConstructor, ast.KindFunctionType, ast.KindObjectLiteralExpression:
			return true, emptyCommitCharacters
		// [a, |
		case ast.KindArrayLiteralExpression:
			return true, allCommitCharacters
		default:
			return false, allCommitCharacters
		}
	case ast.KindOpenParenToken:
		switch containingNodeKind {
		// func( |
		// new C(a|
		case ast.KindCallExpression, ast.KindNewExpression:
			expression := contextToken.Parent.Expression()
			// func\n( |
			if getLineOfPosition(file, expression.End()) != getLineOfPosition(file, position) {
				return true, noCommaCommitCharacters
			}
			return true, allCommitCharacters
		// const x = (a|
		case ast.KindParenthesizedExpression:
			return true, noCommaCommitCharacters
		// constructor( |
		// function F(pred: (a| /* this can become an arrow function, where 'a' is the argument */
		case ast.KindConstructor, ast.KindParenthesizedType:
			return true, emptyCommitCharacters
		default:
			return false, allCommitCharacters
		}
	case ast.KindOpenBracketToken:
		switch containingNodeKind {
		// [ |
		// [ | : string ]
		// [ | : string ]
		// [ |    /* this can become an index signature */
		case ast.KindArrayLiteralExpression, ast.KindIndexSignature, ast.KindTupleType, ast.KindComputedPropertyName:
			return true, allCommitCharacters
		default:
			return false, allCommitCharacters
		}
	// module |
	// namespace |
	// import |
	case ast.KindModuleKeyword, ast.KindNamespaceKeyword, ast.KindImportKeyword:
		return true, emptyCommitCharacters
	case ast.KindDotToken:
		switch containingNodeKind {
		// module A.|
		case ast.KindModuleDeclaration:
			return true, emptyCommitCharacters
		default:
			return false, allCommitCharacters
		}
	case ast.KindOpenBraceToken:
		switch containingNodeKind {
		// class A { |
		// const obj = { |
		case ast.KindClassDeclaration, ast.KindObjectLiteralExpression:
			return true, emptyCommitCharacters
		default:
			return false, allCommitCharacters
		}
	case ast.KindEqualsToken:
		switch containingNodeKind {
		// const x = a|
		// x = a|
		case ast.KindVariableDeclaration, ast.KindBinaryExpression:
			return true, allCommitCharacters
		default:
			return false, allCommitCharacters
		}
	case ast.KindTemplateHead:
		// `aa ${|
		return containingNodeKind == ast.KindTemplateExpression, allCommitCharacters
	case ast.KindTemplateMiddle:
		// `aa ${10} dd ${|
		return containingNodeKind == ast.KindTemplateSpan, allCommitCharacters
	case ast.KindAsyncKeyword:
		// const obj = { async c|()
		// const obj = { async c|
		if containingNodeKind == ast.KindMethodDeclaration || containingNodeKind == ast.KindShorthandPropertyAssignment {
			return true, emptyCommitCharacters
		}
		return false, allCommitCharacters
	case ast.KindAsteriskToken:
		// const obj = { * c|
		if containingNodeKind == ast.KindMethodDeclaration {
			return true, emptyCommitCharacters
		}
		return false, allCommitCharacters
	}

	if isClassMemberCompletionKeyword(tokenKind) {
		return true, emptyCommitCharacters
	}

	return false, allCommitCharacters
}

func keywordForNode(node *ast.Node) ast.Kind {
	if ast.IsIdentifier(node) {
		return scanner.IdentifierToKeywordKind(node.AsIdentifier())
	}
	return node.Kind
}

// Finds the first node that "embraces" the position, so that one may
// accurately aggregate locals from the closest containing scope.
func getScopeNode(initialToken *ast.Node, position int, file *ast.SourceFile) *ast.Node {
	scope := initialToken
	for scope != nil && !positionBelongsToNode(scope, position, file) {
		scope = scope.Parent
	}
	return scope
}

func isSnippetScope(scopeNode *ast.Node) bool {
	switch scopeNode.Kind {
	case ast.KindSourceFile,
		ast.KindTemplateExpression,
		ast.KindJsxExpression,
		ast.KindBlock:
		return true
	default:
		return ast.IsStatement(scopeNode)
	}
}

// Determines if a type is exactly the same type resolved by the global 'self', 'global', or 'globalThis'.
func isProbablyGlobalType(t *checker.Type, file *ast.SourceFile, typeChecker *checker.Checker) bool {
	// The type of `self` and `window` is the same in lib.dom.d.ts, but `window` does not exist in
	// lib.webworker.d.ts, so checking against `self` is also a check against `window` when it exists.
	selfSymbol := typeChecker.GetGlobalSymbol("self", ast.SymbolFlagsValue, nil /*diagnostic*/)
	if selfSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(selfSymbol, file.AsNode()) == t {
		return true
	}
	globalSymbol := typeChecker.GetGlobalSymbol("global", ast.SymbolFlagsValue, nil /*diagnostic*/)
	if globalSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(globalSymbol, file.AsNode()) == t {
		return true
	}
	globalThisSymbol := typeChecker.GetGlobalSymbol("globalThis", ast.SymbolFlagsValue, nil /*diagnostic*/)
	if globalThisSymbol != nil && typeChecker.GetTypeOfSymbolAtLocation(globalThisSymbol, file.AsNode()) == t {
		return true
	}
	return false
}

func tryGetTypeLiteralNode(node *ast.Node) *ast.TypeLiteral {
	if node == nil {
		return nil
	}

	parent := node.Parent
	switch node.Kind {
	case ast.KindOpenBraceToken:
		if ast.IsTypeLiteralNode(parent) {
			return parent
		}
	case ast.KindSemicolonToken, ast.KindCommaToken, ast.KindIdentifier:
		if parent.Kind == ast.KindPropertySignature && ast.IsTypeLiteralNode(parent.Parent) {
			return parent.Parent
		}
	}

	return nil
}

func getConstraintOfTypeArgumentProperty(node *ast.Node, typeChecker *checker.Checker) *checker.Type {
	if node == nil {
		return nil
	}

	if ast.IsTypeNode(node) && ast.IsTypeReferenceType(node.Parent) {
		return typeChecker.GetTypeArgumentConstraint(node)
	}

	t := getConstraintOfTypeArgumentProperty(node.Parent, typeChecker)
	if t == nil {
		return nil
	}

	switch node.Kind {
	case ast.KindPropertySignature:
		return typeChecker.GetTypeOfPropertyOfContextualType(t, node.Symbol().Name)
	case ast.KindIntersectionType, ast.KindTypeLiteral, ast.KindUnionType:
		return t
	}

	return nil
}

func tryGetObjectLikeCompletionContainer(contextToken *ast.Node, position int, file *ast.SourceFile) *ast.ObjectLiteralLike {
	if contextToken == nil {
		return nil
	}

	parent := contextToken.Parent
	switch contextToken.Kind {
	// const x = { |
	// const x = { a: 0, |
	case ast.KindOpenBraceToken, ast.KindCommaToken:
		if ast.IsObjectLiteralExpression(parent) || ast.IsObjectBindingPattern(parent) {
			return parent
		}
	case ast.KindAsteriskToken:
		if ast.IsMethodDeclaration(parent) && ast.IsObjectLiteralExpression(parent.Parent) {
			return parent.Parent
		}
	case ast.KindAsyncKeyword:
		if ast.IsObjectLiteralExpression(parent.Parent) {
			return parent.Parent
		}
	case ast.KindIdentifier:
		if contextToken.Text() == "async" && ast.IsShorthandPropertyAssignment(parent) {
			return parent.Parent
		} else {
			if ast.IsObjectLiteralExpression(parent.Parent) &&
				(ast.IsSpreadAssignment(parent) ||
					ast.IsShorthandPropertyAssignment(parent) &&
						getLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position)) {
				return parent.Parent
			}
			ancestorNode := ast.FindAncestor(parent, ast.IsPropertyAssignment)
			if ancestorNode != nil && getLastToken(ancestorNode, file) == contextToken && ast.IsObjectLiteralExpression(ancestorNode.Parent) {
				return ancestorNode.Parent
			}
		}
	default:
		if parent.Parent != nil && parent.Parent.Parent != nil &&
			(ast.IsMethodDeclaration(parent.Parent) ||
				ast.IsGetAccessorDeclaration(parent.Parent) ||
				ast.IsSetAccessorDeclaration(parent.Parent)) &&
			ast.IsObjectLiteralExpression(parent.Parent.Parent) {
			return parent.Parent.Parent
		}
		if ast.IsSpreadAssignment(parent) && ast.IsObjectLiteralExpression(parent.Parent) {
			return parent.Parent
		}
		ancestorNode := ast.FindAncestor(parent, ast.IsPropertyAssignment)
		if contextToken.Kind != ast.KindColonToken &&
			ancestorNode != nil && getLastToken(ancestorNode, file) == contextToken &&
			ast.IsObjectLiteralExpression(ancestorNode.Parent) {
			return ancestorNode.Parent
		}
	}

	return nil
}

func tryGetObjectLiteralContextualType(node *ast.ObjectLiteralExpressionNode, typeChecker *checker.Checker) *checker.Type {
	t := typeChecker.GetContextualType(node, checker.ContextFlagsNone)
	if t != nil {
		return t
	}

	parent := ast.WalkUpParenthesizedExpressions(node.Parent)
	if ast.IsBinaryExpression(parent) &&
		parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&
		node == parent.AsBinaryExpression().Left {
		// Object literal is assignment pattern: ({ | } = x)
		return typeChecker.GetTypeAtLocation(parent)
	}
	if ast.IsExpression(parent) {
		// f(() => (({ | })));
		return typeChecker.GetContextualType(parent, checker.ContextFlagsNone)
	}

	return nil
}

func getPropertiesForObjectExpression(
	contextualType *checker.Type,
	completionsType *checker.Type,
	obj *ast.Node,
	typeChecker *checker.Checker,
) []*ast.Symbol {
	hasCompletionsType := completionsType != nil && completionsType != contextualType
	var types []*checker.Type
	if contextualType.IsUnion() {
		types = contextualType.Types()
	} else {
		types = []*checker.Type{contextualType}
	}
	promiseFilteredContextualType := typeChecker.GetUnionType(core.Filter(types, func(t *checker.Type) bool {
		return typeChecker.GetPromisedTypeOfPromise(t) == nil
	}))

	var t *checker.Type
	if hasCompletionsType && completionsType.Flags()&checker.TypeFlagsAnyOrUnknown == 0 {
		t = typeChecker.GetUnionType([]*checker.Type{promiseFilteredContextualType, completionsType})
	} else {
		t = promiseFilteredContextualType
	}

	// Filter out members whose only declaration is the object literal itself to avoid
	// self-fulfilling completions like:
	//
	// function f<T>(x: T) {}
	// f({ abc/**/: "" }) // `abc` is a member of `T` but only because it declares itself
	hasDeclarationOtherThanSelf := func(member *ast.Symbol) bool {
		if len(member.Declarations) == 0 {
			return true
		}
		return core.Some(member.Declarations, func(decl *ast.Declaration) bool { return decl.Parent != obj })
	}

	properties := getApparentProperties(t, obj, typeChecker)
	if t.IsClass() && containsNonPublicProperties(properties) {
		return nil
	} else if hasCompletionsType {
		return core.Filter(properties, hasDeclarationOtherThanSelf)
	} else {
		return properties
	}
}

func getApparentProperties(t *checker.Type, node *ast.Node, typeChecker *checker.Checker) []*ast.Symbol {
	if !t.IsUnion() {
		return typeChecker.GetApparentProperties(t)
	}
	return typeChecker.GetAllPossiblePropertiesOfTypes(core.Filter(t.Types(), func(memberType *checker.Type) bool {
		return !(memberType.Flags()&checker.TypeFlagsPrimitive != 0 ||
			typeChecker.IsArrayLikeType(memberType) ||
			typeChecker.IsTypeInvalidDueToUnionDiscriminant(memberType, node) ||
			typeChecker.TypeHasCallOrConstructSignatures(memberType) ||
			memberType.IsClass() && containsNonPublicProperties(typeChecker.GetApparentProperties(memberType)))
	}))
}

func containsNonPublicProperties(props []*ast.Symbol) bool {
	return core.Some(props, func(p *ast.Symbol) bool {
		return checker.GetDeclarationModifierFlagsFromSymbol(p)&ast.ModifierFlagsNonPublicAccessibilityModifier != 0
	})
}

// Filters out members that are already declared in the object literal or binding pattern.
// Also computes the set of existing members declared by spread assignment.
func filterObjectMembersList(
	contextualMemberSymbols []*ast.Symbol,
	existingMembers []*ast.Declaration,
	file *ast.SourceFile,
	position int,
	typeChecker *checker.Checker,
) (filteredMembers []*ast.Symbol, spreadMemberNames core.Set[string]) {
	if len(existingMembers) == 0 {
		return contextualMemberSymbols, core.Set[string]{}
	}

	membersDeclaredBySpreadAssignment := core.Set[string]{}
	existingMemberNames := core.Set[string]{}
	for _, member := range existingMembers {
		// Ignore omitted expressions for missing members.
		if member.Kind != ast.KindPropertyAssignment &&
			member.Kind != ast.KindShorthandPropertyAssignment &&
			member.Kind != ast.KindBindingElement &&
			member.Kind != ast.KindMethodDeclaration &&
			member.Kind != ast.KindGetAccessor &&
			member.Kind != ast.KindSetAccessor &&
			member.Kind != ast.KindSpreadAssignment {
			continue
		}

		// If this is the current item we are editing right now, do not filter it out.
		if isCurrentlyEditingNode(member, file, position) {
			continue
		}

		var existingName string

		if ast.IsSpreadAssignment(member) {
			setMemberDeclaredBySpreadAssignment(member, &membersDeclaredBySpreadAssignment, typeChecker)
		} else if ast.IsBindingElement(member) && member.AsBindingElement().PropertyName != nil {
			// include only identifiers in completion list
			if member.AsBindingElement().PropertyName.Kind == ast.KindIdentifier {
				existingName = member.AsBindingElement().PropertyName.Text()
			}
		} else {
			// TODO: Account for computed property name
			// NOTE: if one only performs this step when m.name is an identifier,
			// things like '__proto__' are not filtered out.
			name := ast.GetNameOfDeclaration(member)
			if name != nil && ast.IsPropertyNameLiteral(name) {
				existingName = name.Text()
			}
		}

		if existingName != "" {
			existingMemberNames.Add(existingName)
		}
	}

	filteredSymbols := core.Filter(contextualMemberSymbols, func(m *ast.Symbol) bool {
		return !existingMemberNames.Has(m.Name)
	})

	return filteredSymbols, membersDeclaredBySpreadAssignment
}

func isCurrentlyEditingNode(node *ast.Node, file *ast.SourceFile, position int) bool {
	start := astnav.GetStartOfNode(node, file, false /*includeJSDoc*/)
	return start <= position && position <= node.End()
}

func setMemberDeclaredBySpreadAssignment(declaration *ast.Node, members *core.Set[string], typeChecker *checker.Checker) {
	expression := declaration.Expression()
	symbol := typeChecker.GetSymbolAtLocation(expression)
	var t *checker.Type
	if symbol != nil {
		t = typeChecker.GetTypeOfSymbolAtLocation(symbol, expression)
	}
	properties := t.AsStructuredType().Properties()
	for _, property := range properties {
		members.Add(property.Name)
	}
}

// Returns the immediate owning class declaration of a context token,
// on the condition that one exists and that the context implies completion should be given.
func tryGetConstructorLikeCompletionContainer(contextToken *ast.Node) *ast.ConstructorDeclarationNode {
	if contextToken == nil {
		return nil
	}

	parent := contextToken.Parent
	switch contextToken.Kind {
	case ast.KindOpenParenToken, ast.KindCommaToken:
		if ast.IsConstructorDeclaration(parent) {
			return parent
		}
		return nil
	default:
		if isConstructorParameterCompletion(contextToken) {
			return parent.Parent
		}
	}
	return nil
}

func isConstructorParameterCompletion(node *ast.Node) bool {
	return node.Parent != nil && ast.IsParameter(node.Parent) && ast.IsConstructorDeclaration(node.Parent.Parent) &&
		(ast.IsParameterPropertyModifier(node.Kind) || ast.IsDeclarationName(node))
}

// Returns the immediate owning class declaration of a context token,
// on the condition that one exists and that the context implies completion should be given.
func tryGetObjectTypeDeclarationCompletionContainer(
	file *ast.SourceFile,
	contextToken *ast.Node,
	location *ast.Node,
	position int,
) *ast.ObjectTypeDeclaration {
	// class c { method() { } | method2() { } }
	switch location.Kind {
	case ast.KindSyntaxList:
		if ast.IsObjectTypeDeclaration(location.Parent) {
			return location.Parent
		}
		return nil
	// !!! we don't include EOF token anymore, verify what we should do in this case.
	case ast.KindEndOfFile:
		stmtList := location.Parent.AsSourceFile().Statements
		if stmtList != nil && len(stmtList.Nodes) > 0 && ast.IsObjectTypeDeclaration(stmtList.Nodes[len(stmtList.Nodes)-1]) {
			cls := stmtList.Nodes[len(stmtList.Nodes)-1]
			if findChildOfKind(cls, ast.KindCloseBraceToken, file) == nil {
				return cls
			}
		}
	case ast.KindPrivateIdentifier:
		if ast.IsPropertyDeclaration(location.Parent) {
			return ast.FindAncestor(location, ast.IsClassLike)
		}
	case ast.KindIdentifier:
		originalKeywordKind := scanner.IdentifierToKeywordKind(location.AsIdentifier())
		if originalKeywordKind != ast.KindUnknown {
			return nil
		}
		// class c { public prop = c| }
		if ast.IsPropertyDeclaration(location.Parent) && location.Parent.Initializer() == location {
			return nil
		}
		// class c extends React.Component { a: () => 1\n compon| }
		if isFromObjectTypeDeclaration(location) {
			return ast.FindAncestor(location, ast.IsObjectTypeDeclaration)
		}
	}

	if contextToken == nil {
		return nil
	}

	// class C { blah; constructor/**/ }
	// or
	// class C { blah \n constructor/**/ }
	if location.Kind == ast.KindConstructorKeyword ||
		(ast.IsIdentifier(contextToken) && ast.IsPropertyDeclaration(contextToken.Parent) && ast.IsClassLike(location)) {
		return ast.FindAncestor(contextToken, ast.IsClassLike)
	}

	switch contextToken.Kind {
	// class c { public prop = | /* global completions */ }
	case ast.KindEqualsToken:
		return nil
	// class c {getValue(): number; | }
	// class c { method() { } | }
	case ast.KindSemicolonToken, ast.KindCloseBraceToken:
		// class c { method() { } b| }
		if isFromObjectTypeDeclaration(location) && location.Parent.Name() == location {
			return location.Parent.Parent
		}
		if ast.IsObjectTypeDeclaration(location) {
			return location
		}
		return nil
	// class c { |
	// class c {getValue(): number, | }
	case ast.KindOpenBraceToken, ast.KindCommaToken:
		if ast.IsObjectTypeDeclaration(contextToken.Parent) {
			return contextToken.Parent
		}
		return nil
	default:
		if ast.IsObjectTypeDeclaration(location) {
			// class C extends React.Component { a: () => 1\n| }
			// class C { prop = ""\n | }
			if getLineOfPosition(file, contextToken.End()) != getLineOfPosition(file, position) {
				return location
			}
			isValidKeyword := core.IfElse(
				ast.IsClassLike(contextToken.Parent.Parent),
				isClassMemberCompletionKeyword,
				isInterfaceOrTypeLiteralCompletionKeyword,
			)

			if isValidKeyword(contextToken.Kind) || contextToken.Kind == ast.KindAsteriskToken ||
				ast.IsIdentifier(contextToken) && isValidKeyword(scanner.IdentifierToKeywordKind(contextToken.AsIdentifier())) {
				return contextToken.Parent.Parent
			}
		}

		return nil
	}
}

func isFromObjectTypeDeclaration(node *ast.Node) bool {
	return node.Parent != nil && ast.IsClassOrTypeElement(node.Parent) && ast.IsObjectTypeDeclaration(node.Parent.Parent)
}

// Filters out completion suggestions for class elements.
func filterClassMembersList(
	baseSymbols []*ast.Symbol,
	existingMembers []*ast.ClassElement,
	classElementModifierFlags ast.ModifierFlags,
	file *ast.SourceFile,
	position int,
) []*ast.Symbol {
	existingMemberNames := core.Set[string]{}
	for _, member := range existingMembers {
		// Ignore omitted expressions for missing members.
		if member.Kind != ast.KindPropertyDeclaration &&
			member.Kind != ast.KindMethodDeclaration &&
			member.Kind != ast.KindGetAccessor &&
			member.Kind != ast.KindSetAccessor {
			continue
		}

		// If this is the current item we are editing right now, do not filter it out
		if isCurrentlyEditingNode(member, file, position) {
			continue
		}

		// Don't filter member even if the name matches if it is declared private in the list.
		if member.ModifierFlags()&ast.ModifierFlagsPrivate != 0 {
			continue
		}

		// Do not filter it out if the static presence doesn't match.
		if ast.IsStatic(member) != (classElementModifierFlags&ast.ModifierFlagsStatic != 0) {
			continue
		}

		existingName := ast.GetPropertyNameForPropertyNameNode(member.Name())
		if existingName != "" {
			existingMemberNames.Add(existingName)
		}
	}

	return core.Filter(baseSymbols, func(propertySymbol *ast.Symbol) bool {
		return !existingMemberNames.Has(propertySymbol.Name) &&
			len(propertySymbol.Declarations) > 0 &&
			checker.GetDeclarationModifierFlagsFromSymbol(propertySymbol)&ast.ModifierFlagsPrivate == 0 &&
			!(propertySymbol.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(propertySymbol.ValueDeclaration))
	})
}

func tryGetContainingJsxElement(contextToken *ast.Node, file *ast.SourceFile) *ast.JsxOpeningLikeElement {
	if contextToken == nil {
		return nil
	}

	parent := contextToken.Parent
	switch contextToken.Kind {
	case ast.KindGreaterThanToken, ast.KindLessThanSlashToken, ast.KindSlashToken, ast.KindIdentifier,
		ast.KindPropertyAccessExpression, ast.KindJsxAttributes, ast.KindJsxAttribute, ast.KindJsxSpreadAttribute:
		if parent != nil && (parent.Kind == ast.KindJsxSelfClosingElement || parent.Kind == ast.KindJsxOpeningElement) {
			if contextToken.Kind == ast.KindGreaterThanToken {
				precedingToken := astnav.FindPrecedingToken(file, contextToken.Pos())
				if len(parent.TypeArguments()) == 0 ||
					precedingToken != nil && precedingToken.Kind == ast.KindSlashToken {
					return nil
				}
			}
			return parent
		}
	// The context token is the closing } or " of an attribute, which means
	// its parent is a JsxExpression, whose parent is a JsxAttribute,
	// whose parent is a JsxOpeningLikeElement
	case ast.KindStringLiteral:
		if parent != nil && (parent.Kind == ast.KindJsxAttribute || parent.Kind == ast.KindJsxSpreadAttribute) {
			// Currently we parse JsxOpeningLikeElement as:
			//      JsxOpeningLikeElement
			//          attributes: JsxAttributes
			//             properties: NodeArray<JsxAttributeLike>
			return parent.Parent.Parent
		}
	case ast.KindCloseBraceToken:
		if parent != nil && parent.Kind == ast.KindJsxExpression &&
			parent.Parent != nil && parent.Parent.Kind == ast.KindJsxAttribute {
			// Currently we parse JsxOpeningLikeElement as:
			//      JsxOpeningLikeElement
			//          attributes: JsxAttributes
			//             properties: NodeArray<JsxAttributeLike>
			//                  each JsxAttribute can have initializer as JsxExpression
			return parent.Parent.Parent.Parent
		}
		if parent != nil && parent.Kind == ast.KindJsxSpreadAttribute {
			// Currently we parse JsxOpeningLikeElement as:
			//      JsxOpeningLikeElement
			//          attributes: JsxAttributes
			//             properties: NodeArray<JsxAttributeLike>
			return parent.Parent.Parent
		}
	}

	return nil
}

// Filters out completion suggestions from 'symbols' according to existing JSX attributes.
// @returns Symbols to be suggested in a JSX element, barring those whose attributes
// do not occur at the current position and have not otherwise been typed.
func filterJsxAttributes(
	symbols []*ast.Symbol,
	attributes []*ast.JsxAttributeLike,
	file *ast.SourceFile,
	position int,
	typeChecker *checker.Checker,
) (filteredMembers []*ast.Symbol, spreadMemberNames *core.Set[string]) {
	existingNames := core.Set[string]{}
	membersDeclaredBySpreadAssignment := core.Set[string]{}
	for _, attr := range attributes {
		// If this is the item we are editing right now, do not filter it out.
		if isCurrentlyEditingNode(attr, file, position) {
			continue
		}

		if attr.Kind == ast.KindJsxAttribute {
			existingNames.Add(attr.Name().Text())
		} else if ast.IsJsxSpreadAttribute(attr) {
			setMemberDeclaredBySpreadAssignment(attr, &membersDeclaredBySpreadAssignment, typeChecker)
		}
	}

	return core.Filter(symbols, func(a *ast.Symbol) bool { return !existingNames.Has(a.Name) }),
		&membersDeclaredBySpreadAssignment
}

func isTypeKeywordTokenOrIdentifier(node *ast.Node) bool {
	return ast.IsTypeKeywordToken(node) ||
		ast.IsIdentifier(node) && scanner.IdentifierToKeywordKind(node.AsIdentifier()) == ast.KindTypeKeyword
}

// Returns the default commit characters for completion items, if that capability is supported.
// Otherwise, if item commit characters are supported, sets the commit characters on each item.
func setCommitCharacters(
	clientOptions *lsproto.CompletionClientCapabilities,
	items []*lsproto.CompletionItem,
	defaultCommitCharacters *[]string,
) *lsproto.CompletionItemDefaults {
	var itemDefaults *lsproto.CompletionItemDefaults
	supportsItemCommitCharacters := ptrIsTrue(clientOptions.CompletionItem.CommitCharactersSupport)
	if supportsDefaultCommitCharacters(clientOptions) && supportsItemCommitCharacters {
		itemDefaults = &lsproto.CompletionItemDefaults{
			CommitCharacters: defaultCommitCharacters,
		}
	} else if supportsItemCommitCharacters {
		for _, item := range items {
			if item.CommitCharacters == nil {
				item.CommitCharacters = defaultCommitCharacters
			}
		}
	}

	return itemDefaults
}

func specificKeywordCompletionInfo(
	clientOptions *lsproto.CompletionClientCapabilities,
	items []*lsproto.CompletionItem,
	isNewIdentifierLocation bool,
) *lsproto.CompletionList {
	defaultCommitCharacters := getDefaultCommitCharacters(isNewIdentifierLocation)
	itemDefaults := setCommitCharacters(
		clientOptions,
		items,
		&defaultCommitCharacters,
	)
	return &lsproto.CompletionList{
		IsIncomplete: false,
		ItemDefaults: itemDefaults,
		Items:        items,
	}
}

func (l *LanguageService) getJsxClosingTagCompletion(
	location *ast.Node,
	file *ast.SourceFile,
	position int,
	clientOptions *lsproto.CompletionClientCapabilities,
) *lsproto.CompletionList {
	// We wanna walk up the tree till we find a JSX closing element.
	jsxClosingElement := ast.FindAncestorOrQuit(location, func(node *ast.Node) ast.FindAncestorResult {
		switch node.Kind {
		case ast.KindJsxClosingElement:
			return ast.FindAncestorTrue
		case ast.KindSlashToken, ast.KindGreaterThanToken, ast.KindIdentifier, ast.KindPropertyAccessExpression:
			return ast.FindAncestorFalse
		default:
			return ast.FindAncestorQuit
		}
	})

	if jsxClosingElement == nil {
		return nil
	}

	// In the TypeScript JSX element, if such element is not defined. When users query for completion at closing tag,
	// instead of simply giving unknown value, the completion will return the tag-name of an associated opening-element.
	// For example:
	//     var x = <div> </ /*1*/
	// The completion list at "1" will contain "div>" with type any
	// And at `<div> </ /*1*/ >` (with a closing `>`), the completion list will contain "div".
	// And at property access expressions `<MainComponent.Child> </MainComponent. /*1*/ >` the completion will
	// return full closing tag with an optional replacement span
	// For example:
	//     var x = <MainComponent.Child> </     MainComponent /*1*/  >
	//     var y = <MainComponent.Child> </   /*2*/   MainComponent >
	// the completion list at "1" and "2" will contain "MainComponent.Child" with a replacement span of closing tag name
	hasClosingAngleBracket := findChildOfKind(jsxClosingElement, ast.KindGreaterThanToken, file) != nil
	tagName := jsxClosingElement.Parent.AsJsxElement().OpeningElement.TagName()
	closingTag := tagName.Text()
	fullClosingTag := closingTag + core.IfElse(hasClosingAngleBracket, "", ">")
	optionalReplacementSpan := l.createLspRangeFromNode(jsxClosingElement.TagName(), file)
	defaultCommitCharacters := getDefaultCommitCharacters(false /*isNewIdentifierLocation*/)

	item := l.createLSPCompletionItem(
		fullClosingTag, /*name*/
		"",             /*insertText*/
		"",             /*filterText*/
		SortTextLocationPriority,
		ScriptElementKindClassElement,
		core.Set[ScriptElementKindModifier]{}, /*kindModifiers*/
		nil,                                   /*replacementSpan*/
		optionalReplacementSpan,
		nil, /*commitCharacters*/
		nil, /*labelDetails*/
		file,
		position,
		clientOptions,
		true,  /*isMemberCompletion*/
		false, /*isSnippet*/
		false, /*hasAction*/
		false, /*preselect*/
		"",    /*source*/
	)
	items := []*lsproto.CompletionItem{item}
	itemDefaults := setCommitCharacters(clientOptions, items, &defaultCommitCharacters)

	return &lsproto.CompletionList{
		IsIncomplete: false,
		ItemDefaults: itemDefaults,
		Items:        items,
	}
}

func (l *LanguageService) createLSPCompletionItem(
	name string,
	insertText string,
	filterText string,
	sortText sortText,
	elementKind ScriptElementKind,
	kindModifiers core.Set[ScriptElementKindModifier],
	replacementSpan *lsproto.Range,
	optionalReplacementSpan *lsproto.Range,
	commitCharacters *[]string,
	labelDetails *lsproto.CompletionItemLabelDetails,
	file *ast.SourceFile,
	position int,
	clientOptions *lsproto.CompletionClientCapabilities,
	isMemberCompletion bool,
	isSnippet bool,
	hasAction bool,
	preselect bool,
	source string,
) *lsproto.CompletionItem {
	kind := getCompletionsSymbolKind(elementKind)

	// Text edit
	var textEdit *lsproto.TextEditOrInsertReplaceEdit
	if replacementSpan != nil {
		textEdit = &lsproto.TextEditOrInsertReplaceEdit{
			TextEdit: &lsproto.TextEdit{
				NewText: core.IfElse(insertText == "", name, insertText),
				Range:   *replacementSpan,
			},
		}
	} else {
		// Ported from vscode ts extension.
		if optionalReplacementSpan != nil && ptrIsTrue(clientOptions.CompletionItem.InsertReplaceSupport) {
			insertRange := &lsproto.Range{
				Start: optionalReplacementSpan.Start,
				End:   l.createLspPosition(position, file),
			}
			replaceRange := optionalReplacementSpan
			textEdit = &lsproto.TextEditOrInsertReplaceEdit{
				InsertReplaceEdit: &lsproto.InsertReplaceEdit{
					NewText: core.IfElse(insertText == "", name, insertText),
					Insert:  *insertRange,
					Replace: *replaceRange,
				},
			}
		}
	}

	// Filter text

	// Ported from vscode ts extension.
	wordRange, wordStart := getWordRange(file, position)
	if filterText == "" {
		filterText = getFilterText(file, position, insertText, name, isMemberCompletion, isSnippet, wordStart)
	}
	if isMemberCompletion && !isSnippet {
		accessorRange, accessorText := getDotAccessorContext(file, position)
		if accessorText != "" {
			filterText = accessorText + core.IfElse(insertText != "", insertText, name)
			if textEdit == nil {
				insertText = filterText
				if wordRange != nil && ptrIsTrue(clientOptions.CompletionItem.InsertReplaceSupport) {
					textEdit = &lsproto.TextEditOrInsertReplaceEdit{
						InsertReplaceEdit: &lsproto.InsertReplaceEdit{
							NewText: insertText,
							Insert: *l.createLspRangeFromBounds(
								accessorRange.Pos(),
								accessorRange.End(),
								file),
							Replace: *l.createLspRangeFromBounds(
								min(accessorRange.Pos(), wordRange.Pos()),
								accessorRange.End(),
								file),
						},
					}
				} else {
					textEdit = &lsproto.TextEditOrInsertReplaceEdit{
						TextEdit: &lsproto.TextEdit{
							NewText: insertText,
							Range:   *l.createLspRangeFromBounds(accessorRange.Pos(), accessorRange.End(), file),
						},
					}
				}
			}
		}
	}

	// Adjustements based on kind modifiers.
	var tags *[]lsproto.CompletionItemTag
	var detail *string
	// Copied from vscode ts extension: `MyCompletionItem.constructor`.
	if kindModifiers.Has(ScriptElementKindModifierOptional) {
		if insertText == "" {
			insertText = name
		}
		if filterText == "" {
			filterText = name
		}
		name = name + "?"
	}
	if kindModifiers.Has(ScriptElementKindModifierDeprecated) {
		tags = &[]lsproto.CompletionItemTag{lsproto.CompletionItemTagDeprecated}
	}
	if kind == lsproto.CompletionItemKindFile {
		for _, extensionModifier := range fileExtensionKindModifiers {
			if kindModifiers.Has(extensionModifier) {
				if strings.HasSuffix(name, string(extensionModifier)) {
					detail = ptrTo(name)
				} else {
					detail = ptrTo(name + string(extensionModifier))
				}
				break
			}
		}
	}

	if hasAction && source != "" {
		// !!! adjust label like vscode does
	}

	// Client assumes plain text by default.
	var insertTextFormat *lsproto.InsertTextFormat
	if isSnippet {
		insertTextFormat = ptrTo(lsproto.InsertTextFormatSnippet)
	}

	return &lsproto.CompletionItem{
		Label:            name,
		LabelDetails:     labelDetails,
		Kind:             &kind,
		Tags:             tags,
		Detail:           detail,
		Preselect:        boolToPtr(preselect),
		SortText:         ptrTo(string(sortText)),
		FilterText:       strPtrTo(filterText),
		InsertText:       strPtrTo(insertText),
		InsertTextFormat: insertTextFormat,
		TextEdit:         textEdit,
		CommitCharacters: commitCharacters,
		Data:             nil, // !!! auto-imports
	}
}

func (l *LanguageService) getLabelCompletionsAtPosition(
	node *ast.BreakOrContinueStatement,
	clientOptions *lsproto.CompletionClientCapabilities,
	file *ast.SourceFile,
	position int,
) *lsproto.CompletionList {
	items := l.getLabelStatementCompletions(node, clientOptions, file, position)
	if len(items) == 0 {
		return nil
	}
	defaultCommitCharacters := getDefaultCommitCharacters(false /*isNewIdentifierLocation*/)
	itemDefaults := setCommitCharacters(clientOptions, items, &defaultCommitCharacters)
	return &lsproto.CompletionList{
		IsIncomplete: false,
		ItemDefaults: itemDefaults,
		Items:        items,
	}
}

func (l *LanguageService) getLabelStatementCompletions(
	node *ast.BreakOrContinueStatement,
	clientOptions *lsproto.CompletionClientCapabilities,
	file *ast.SourceFile,
	position int,
) []*lsproto.CompletionItem {
	var uniques core.Set[string]
	var items []*lsproto.CompletionItem
	current := node
	for current != nil {
		if ast.IsFunctionLike(current) {
			break
		}
		if ast.IsLabeledStatement(current) {
			name := current.Label().Text()
			if !uniques.Has(name) {
				uniques.Add(name)
				items = append(items, l.createLSPCompletionItem(
					name,
					"", /*insertText*/
					"", /*filterText*/
					SortTextLocationPriority,
					ScriptElementKindLabel,
					core.Set[ScriptElementKindModifier]{}, /*kindModifiers*/
					nil,                                   /*replacementSpan*/
					nil,                                   /*optionalReplacementSpan*/
					nil,                                   /*commitCharacters*/
					nil,                                   /*labelDetails*/
					file,
					position,
					clientOptions,
					false, /*isMemberCompletion*/
					false, /*isSnippet*/
					false, /*hasAction*/
					false, /*preselect*/
					"",    /*source*/
				))
			}
		}
		current = current.Parent
	}
	return items
}
