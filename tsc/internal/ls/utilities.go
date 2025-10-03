package ls

import (
	"cmp"
	"fmt"
	"iter"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/lsutil"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Implements a cmp.Compare like function for two lsproto.Position
// ComparePositions(pos, other) == cmp.Compare(pos, other)
func ComparePositions(pos, other lsproto.Position) int {
	if lineComp := cmp.Compare(pos.Line, other.Line); lineComp != 0 {
		return lineComp
	}
	return cmp.Compare(pos.Character, other.Character)
}

// Implements a cmp.Compare like function for two *lsproto.Range
// CompareRanges(lsRange, other) == cmp.Compare(lsrange, other)
//
//	Range.Start is compared before Range.End
func CompareRanges(lsRange, other *lsproto.Range) int {
	if startComp := ComparePositions(lsRange.Start, other.Start); startComp != 0 {
		return startComp
	}
	return ComparePositions(lsRange.End, other.End)
}

var quoteReplacer = strings.NewReplacer("'", `\'`, `\"`, `"`)

func IsInString(sourceFile *ast.SourceFile, position int, previousToken *ast.Node) bool {
	if previousToken != nil && ast.IsStringTextContainingNode(previousToken) {
		start := astnav.GetStartOfNode(previousToken, sourceFile, false /*includeJSDoc*/)
		end := previousToken.End()

		// To be "in" one of these literals, the position has to be:
		//   1. entirely within the token text.
		//   2. at the end position of an unterminated token.
		//   3. at the end of a regular expression (due to trailing flags like '/foo/g').
		if start < position && position < end {
			return true
		}

		if position == end {
			return ast.IsUnterminatedLiteral(previousToken)
		}
	}
	return false
}

func importFromModuleSpecifier(node *ast.Node) *ast.Node {
	if result := tryGetImportFromModuleSpecifier(node); result != nil {
		return result
	}
	debug.FailBadSyntaxKind(node.Parent)
	return nil
}

func tryGetImportFromModuleSpecifier(node *ast.StringLiteralLike) *ast.Node {
	switch node.Parent.Kind {
	case ast.KindImportDeclaration, ast.KindJSImportDeclaration, ast.KindExportDeclaration:
		return node.Parent
	case ast.KindExternalModuleReference:
		return node.Parent.Parent
	case ast.KindCallExpression:
		if ast.IsImportCall(node.Parent) || ast.IsRequireCall(node.Parent, false /*requireStringLiteralLikeArgument*/) {
			return node.Parent
		}
		return nil
	case ast.KindLiteralType:
		if !ast.IsStringLiteral(node) {
			return nil
		}
		if ast.IsImportTypeNode(node.Parent.Parent) {
			return node.Parent.Parent
		}
		return nil
	}
	return nil
}

func isModuleSpecifierLike(node *ast.Node) bool {
	if !ast.IsStringLiteralLike(node) {
		return false
	}

	if ast.IsRequireCall(node.Parent, false /*requireStringLiteralLikeArgument*/) || ast.IsImportCall(node.Parent) {
		return node.Parent.AsCallExpression().Arguments.Nodes[0] == node
	}

	return node.Parent.Kind == ast.KindExternalModuleReference ||
		node.Parent.Kind == ast.KindImportDeclaration ||
		node.Parent.Kind == ast.KindJSImportDeclaration
}

func getNonModuleSymbolOfMergedModuleSymbol(symbol *ast.Symbol) *ast.Symbol {
	if len(symbol.Declarations) == 0 || (symbol.Flags&(ast.SymbolFlagsModule|ast.SymbolFlagsTransient)) == 0 {
		return nil
	}

	if decl := core.Find(symbol.Declarations, func(d *ast.Node) bool { return !ast.IsSourceFile(d) && !ast.IsModuleDeclaration(d) }); decl != nil {
		return decl.Symbol()
	}
	return nil
}

func moduleSymbolToValidIdentifier(moduleSymbol *ast.Symbol, target core.ScriptTarget, forceCapitalize bool) string {
	return moduleSpecifierToValidIdentifier(stringutil.StripQuotes(moduleSymbol.Name), target, forceCapitalize)
}

func moduleSpecifierToValidIdentifier(moduleSpecifier string, target core.ScriptTarget, forceCapitalize bool) string {
	baseName := tspath.GetBaseFileName(strings.TrimSuffix(tspath.RemoveFileExtension(moduleSpecifier), "/index"))
	res := []rune{}
	lastCharWasValid := true
	baseNameRunes := []rune(baseName)
	if len(baseNameRunes) > 0 && scanner.IsIdentifierStart(baseNameRunes[0]) {
		if forceCapitalize {
			res = append(res, unicode.ToUpper(baseNameRunes[0]))
		} else {
			res = append(res, baseNameRunes[0])
		}
	} else {
		lastCharWasValid = false
	}

	for i := 1; i < len(baseNameRunes); i++ {
		isValid := scanner.IsIdentifierPart(baseNameRunes[i])
		if isValid {
			if !lastCharWasValid {
				res = append(res, unicode.ToUpper(baseNameRunes[i]))
			} else {
				res = append(res, baseNameRunes[i])
			}
		}
		lastCharWasValid = isValid
	}

	// Need `"_"` to ensure result isn't empty.
	resString := string(res)
	if resString != "" && !isNonContextualKeyword(scanner.StringToToken(resString)) {
		return resString
	}
	return "_" + resString
}

func getLocalSymbolForExportSpecifier(referenceLocation *ast.Identifier, referenceSymbol *ast.Symbol, exportSpecifier *ast.ExportSpecifier, ch *checker.Checker) *ast.Symbol {
	if isExportSpecifierAlias(referenceLocation, exportSpecifier) {
		if symbol := ch.GetExportSpecifierLocalTargetSymbol(exportSpecifier.AsNode()); symbol != nil {
			return symbol
		}
	}
	return referenceSymbol
}

func isExportSpecifierAlias(referenceLocation *ast.Identifier, exportSpecifier *ast.ExportSpecifier) bool {
	debug.Assert(exportSpecifier.PropertyName == referenceLocation.AsNode() || exportSpecifier.Name() == referenceLocation.AsNode(), "referenceLocation is not export specifier name or property name")
	propertyName := exportSpecifier.PropertyName
	if propertyName != nil {
		// Given `export { foo as bar } [from "someModule"]`: It's an alias at `foo`, but at `bar` it's a new symbol.
		return propertyName == referenceLocation.AsNode()
	} else {
		// `export { foo } from "foo"` is a re-export.
		// `export { foo };` is not a re-export, it creates an alias for the local variable `foo`.
		return exportSpecifier.Parent.Parent.AsExportDeclaration().ModuleSpecifier == nil
	}
}

func isInComment(file *ast.SourceFile, position int, tokenAtPosition *ast.Node) *ast.CommentRange {
	return getRangeOfEnclosingComment(file, position, astnav.FindPrecedingToken(file, position), tokenAtPosition)
}

func hasChildOfKind(containingNode *ast.Node, kind ast.Kind, sourceFile *ast.SourceFile) bool {
	return findChildOfKind(containingNode, kind, sourceFile) != nil
}

func findChildOfKind(containingNode *ast.Node, kind ast.Kind, sourceFile *ast.SourceFile) *ast.Node {
	lastNodePos := containingNode.Pos()
	scanner := scanner.GetScannerForSourceFile(sourceFile, lastNodePos)

	var foundChild *ast.Node
	visitNode := func(node *ast.Node) bool {
		if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
			return false
		}
		// Look for child in preceding tokens.
		startPos := lastNodePos
		for startPos < node.Pos() {
			tokenKind := scanner.Token()
			tokenFullStart := scanner.TokenFullStart()
			tokenEnd := scanner.TokenEnd()
			token := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, containingNode)
			if tokenKind == kind {
				foundChild = token
				return true
			}
			startPos = tokenEnd
			scanner.Scan()
		}
		if node.Kind == kind {
			foundChild = node
			return true
		}

		lastNodePos = node.End()
		scanner.ResetPos(lastNodePos)
		return false
	}

	ast.ForEachChildAndJSDoc(containingNode, sourceFile, visitNode)

	if foundChild != nil {
		return foundChild
	}

	// Look for child in trailing tokens.
	startPos := lastNodePos
	for startPos < containingNode.End() {
		tokenKind := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		token := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, containingNode)
		if tokenKind == kind {
			return token
		}
		startPos = tokenEnd
		scanner.Scan()
	}
	return nil
}

type PossibleTypeArgumentInfo struct {
	called         *ast.IdentifierNode
	nTypeArguments int
}

// Get info for an expression like `f <` that may be the start of type arguments.
func getPossibleTypeArgumentsInfo(tokenIn *ast.Node, sourceFile *ast.SourceFile) *PossibleTypeArgumentInfo {
	// This is a rare case, but one that saves on a _lot_ of work if true - if the source file has _no_ `<` character,
	// then there obviously can't be any type arguments - no expensive brace-matching backwards scanning required
	if strings.LastIndexByte(sourceFile.Text(), '<') == -1 {
		return nil
	}

	token := tokenIn
	// This function determines if the node could be a type argument position
	// When editing, it is common to have an incomplete type argument list (e.g. missing ">"),
	// so the tree can have any shape depending on the tokens before the current node.
	// Instead, scanning for an identifier followed by a "<" before current node
	// will typically give us better results than inspecting the tree.
	// Note that we also balance out the already provided type arguments, arrays, object literals while doing so.
	remainingLessThanTokens := 0
	nTypeArguments := 0
	for token != nil {
		switch token.Kind {
		case ast.KindLessThanToken:
			// Found the beginning of the generic argument expression
			token = astnav.FindPrecedingToken(sourceFile, token.Pos())
			if token != nil && token.Kind == ast.KindQuestionDotToken {
				token = astnav.FindPrecedingToken(sourceFile, token.Pos())
			}
			if token == nil || !ast.IsIdentifier(token) {
				return nil
			}
			if remainingLessThanTokens == 0 {
				if ast.IsDeclarationName(token) {
					return nil
				}
				return &PossibleTypeArgumentInfo{
					called:         token,
					nTypeArguments: nTypeArguments,
				}
			}
			remainingLessThanTokens--
		case ast.KindGreaterThanGreaterThanGreaterThanToken:
			remainingLessThanTokens = +3
		case ast.KindGreaterThanGreaterThanToken:
			remainingLessThanTokens = +2
		case ast.KindGreaterThanToken:
			remainingLessThanTokens++
		case ast.KindCloseBraceToken:
			// This can be object type, skip until we find the matching open brace token
			// Skip until the matching open brace token
			token = findPrecedingMatchingToken(token, ast.KindOpenBraceToken, sourceFile)
			if token == nil {
				return nil
			}
		case ast.KindCloseParenToken:
			// This can be object type, skip until we find the matching open brace token
			// Skip until the matching open brace token
			token = findPrecedingMatchingToken(token, ast.KindOpenParenToken, sourceFile)
			if token == nil {
				return nil
			}
		case ast.KindCloseBracketToken:
			// This can be object type, skip until we find the matching open brace token
			// Skip until the matching open brace token
			token = findPrecedingMatchingToken(token, ast.KindOpenBracketToken, sourceFile)
			if token == nil {
				return nil
			}
		case ast.KindCommaToken:
			// Valid tokens in a type name. Skip.
			nTypeArguments++
		case ast.KindEqualsGreaterThanToken, ast.KindIdentifier, ast.KindStringLiteral, ast.KindNumericLiteral,
			ast.KindBigIntLiteral, ast.KindTrueKeyword, ast.KindFalseKeyword, ast.KindTypeOfKeyword, ast.KindExtendsKeyword,
			ast.KindKeyOfKeyword, ast.KindDotToken, ast.KindBarToken, ast.KindQuestionToken, ast.KindColonToken:
			// do nothing
		default:
			if !ast.IsTypeNode(token) {
				// Invalid token in type
				return nil
			}
		}
		token = astnav.FindPrecedingToken(sourceFile, token.Pos())
	}
	return nil
}

func isNameOfModuleDeclaration(node *ast.Node) bool {
	if node.Parent.Kind != ast.KindModuleDeclaration {
		return false
	}
	return node.Parent.Name() == node
}

func isExpressionOfExternalModuleImportEqualsDeclaration(node *ast.Node) bool {
	return ast.IsExternalModuleImportEqualsDeclaration(node.Parent.Parent) && ast.GetExternalModuleImportEqualsDeclarationExpression(node.Parent.Parent) == node
}

func isNamespaceReference(node *ast.Node) bool {
	return isQualifiedNameNamespaceReference(node) || isPropertyAccessNamespaceReference(node)
}

func isQualifiedNameNamespaceReference(node *ast.Node) bool {
	root := node
	isLastClause := true
	if root.Parent.Kind == ast.KindQualifiedName {
		for root.Parent != nil && root.Parent.Kind == ast.KindQualifiedName {
			root = root.Parent
		}

		isLastClause = root.AsQualifiedName().Right == node
	}

	return root.Parent.Kind == ast.KindTypeReference && !isLastClause
}

func isPropertyAccessNamespaceReference(node *ast.Node) bool {
	root := node
	isLastClause := true
	if root.Parent.Kind == ast.KindPropertyAccessExpression {
		for root.Parent != nil && root.Parent.Kind == ast.KindPropertyAccessExpression {
			root = root.Parent
		}

		isLastClause = root.Name() == node
	}

	if !isLastClause && root.Parent.Kind == ast.KindExpressionWithTypeArguments && root.Parent.Parent.Kind == ast.KindHeritageClause {
		decl := root.Parent.Parent.Parent
		return (decl.Kind == ast.KindClassDeclaration && root.Parent.Parent.AsHeritageClause().Token == ast.KindImplementsKeyword) ||
			(decl.Kind == ast.KindInterfaceDeclaration && root.Parent.Parent.AsHeritageClause().Token == ast.KindExtendsKeyword)
	}

	return false
}

func isThis(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindThisKeyword:
		// case ast.KindThisType: TODO: GH#9267
		return true
	case ast.KindIdentifier:
		// 'this' as a parameter
		return node.AsIdentifier().Text == "this" && node.Parent.Kind == ast.KindParameter
	default:
		return false
	}
}

func isTypeReference(node *ast.Node) bool {
	if ast.IsRightSideOfQualifiedNameOrPropertyAccess(node) {
		node = node.Parent
	}

	switch node.Kind {
	case ast.KindThisKeyword:
		return !ast.IsExpressionNode(node)
	case ast.KindThisType:
		return true
	}

	switch node.Parent.Kind {
	case ast.KindTypeReference:
		return true
	case ast.KindImportType:
		return !node.Parent.AsImportTypeNode().IsTypeOf
	case ast.KindExpressionWithTypeArguments:
		return ast.IsPartOfTypeNode(node.Parent)
	}

	return false
}

func isInRightSideOfInternalImportEqualsDeclaration(node *ast.Node) bool {
	if node.Parent == nil {
		return false
	}
	for node.Parent.Kind == ast.KindQualifiedName {
		node = node.Parent
	}

	return ast.IsInternalModuleImportEqualsDeclaration(node.Parent) && node.Parent.AsImportEqualsDeclaration().ModuleReference == node
}

func (l *LanguageService) createLspRangeFromNode(node *ast.Node, file *ast.SourceFile) *lsproto.Range {
	return l.createLspRangeFromBounds(scanner.GetTokenPosOfNode(node, file, false /*includeJSDoc*/), node.End(), file)
}

func createRangeFromNode(node *ast.Node, file *ast.SourceFile) core.TextRange {
	return core.NewTextRange(scanner.GetTokenPosOfNode(node, file, false /*includeJSDoc*/), node.End())
}

func (l *LanguageService) createLspRangeFromBounds(start, end int, file *ast.SourceFile) *lsproto.Range {
	lspRange := l.converters.ToLSPRange(file, core.NewTextRange(start, end))
	return &lspRange
}

func (l *LanguageService) createLspRangeFromRange(textRange core.TextRange, script Script) *lsproto.Range {
	lspRange := l.converters.ToLSPRange(script, textRange)
	return &lspRange
}

func (l *LanguageService) createLspPosition(position int, file *ast.SourceFile) lsproto.Position {
	return l.converters.PositionToLineAndCharacter(file, core.TextPos(position))
}

func quote(file *ast.SourceFile, preferences *UserPreferences, text string) string {
	// Editors can pass in undefined or empty string - we want to infer the preference in those cases.
	quotePreference := getQuotePreference(file, preferences)
	quoted, _ := core.StringifyJson(text, "" /*prefix*/, "" /*indent*/)
	if quotePreference == quotePreferenceSingle {
		quoted = quoteReplacer.Replace(stringutil.StripQuotes(quoted))
	}
	return quoted
}

type quotePreference int

const (
	quotePreferenceSingle quotePreference = iota
	quotePreferenceDouble
)

// !!!
func getQuotePreference(file *ast.SourceFile, preferences *UserPreferences) quotePreference {
	return quotePreferenceDouble
}

func isNonContextualKeyword(token ast.Kind) bool {
	return ast.IsKeywordKind(token) && !ast.IsContextualKeyword(token)
}

func probablyUsesSemicolons(file *ast.SourceFile) bool {
	withSemicolon := 0
	withoutSemicolon := 0
	nStatementsToObserve := 5

	var visit func(node *ast.Node) bool
	visit = func(node *ast.Node) bool {
		if node.Flags&ast.NodeFlagsReparsed != 0 {
			return false
		}
		if lsutil.SyntaxRequiresTrailingSemicolonOrASI(node.Kind) {
			lastToken := lsutil.GetLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else {
				withoutSemicolon++
			}
		} else if lsutil.SyntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {
			lastToken := lsutil.GetLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else if lastToken != nil && lastToken.Kind != ast.KindCommaToken {
				lastTokenLine, _ := scanner.GetECMALineAndCharacterOfPosition(
					file,
					astnav.GetStartOfNode(lastToken, file, false /*includeJSDoc*/))
				nextTokenLine, _ := scanner.GetECMALineAndCharacterOfPosition(
					file,
					scanner.GetRangeOfTokenAtPosition(file, lastToken.End()).Pos())
				// Avoid counting missing semicolon in single-line objects:
				// `function f(p: { x: string /*no semicolon here is insignificant*/ }) {`
				if lastTokenLine != nextTokenLine {
					withoutSemicolon++
				}
			}
		}

		if withSemicolon+withoutSemicolon >= nStatementsToObserve {
			return true
		}

		return node.ForEachChild(visit)
	}

	file.ForEachChild(visit)

	// One statement missing a semicolon isn't sufficient evidence to say the user
	// doesn't want semicolons, because they may not even be done writing that statement.
	if withSemicolon == 0 && withoutSemicolon <= 1 {
		return true
	}

	// If even 2/5 places have a semicolon, the user probably wants semicolons
	if withoutSemicolon == 0 {
		return true
	}
	return withSemicolon/withoutSemicolon > 1/nStatementsToObserve
}

var typeKeywords *collections.Set[ast.Kind] = collections.NewSetFromItems(
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
)

func isTypeKeyword(kind ast.Kind) bool {
	return typeKeywords.Has(kind)
}

func isSeparator(node *ast.Node, candidate *ast.Node) bool {
	return candidate != nil && node.Parent != nil && (candidate.Kind == ast.KindCommaToken || (candidate.Kind == ast.KindSemicolonToken && node.Parent.Kind == ast.KindObjectLiteralExpression))
}

// Returns a map of all names in the file to their positions.
// !!! cache this
func getNameTable(file *ast.SourceFile) map[string]int {
	nameTable := make(map[string]int)
	var walk func(node *ast.Node) bool

	walk = func(node *ast.Node) bool {
		if ast.IsIdentifier(node) && !isTagName(node) && node.Text() != "" ||
			ast.IsStringOrNumericLiteralLike(node) && literalIsName(node) ||
			ast.IsPrivateIdentifier(node) {
			text := node.Text()
			if _, ok := nameTable[text]; ok {
				nameTable[text] = -1
			} else {
				nameTable[text] = node.Pos()
			}
		}

		node.ForEachChild(walk)
		jsdocNodes := node.JSDoc(file)
		for _, jsdoc := range jsdocNodes {
			jsdoc.ForEachChild(walk)
		}
		return false
	}

	file.ForEachChild(walk)
	return nameTable
}

// We want to store any numbers/strings if they were a name that could be
// related to a declaration.  So, if we have 'import x = require("something")'
// then we want 'something' to be in the name table.  Similarly, if we have
// "a['propname']" then we want to store "propname" in the name table.
func literalIsName(node *ast.NumericOrStringLikeLiteral) bool {
	return ast.IsDeclarationName(node) ||
		node.Parent.Kind == ast.KindExternalModuleReference ||
		isArgumentOfElementAccessExpression(node) ||
		ast.IsLiteralComputedPropertyDeclarationName(node)
}

func isLiteralNameOfPropertyDeclarationOrIndexAccess(node *ast.Node) bool {
	// utilities
	switch node.Parent.Kind {
	case ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindPropertyAssignment,
		ast.KindEnumMember,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindModuleDeclaration:
		return ast.GetNameOfDeclaration(node.Parent) == node
	case ast.KindElementAccessExpression:
		return node.Parent.AsElementAccessExpression().ArgumentExpression == node
	case ast.KindComputedPropertyName:
		return true
	case ast.KindLiteralType:
		return node.Parent.Parent.Kind == ast.KindIndexedAccessType
	default:
		return false
	}
}

func isObjectBindingElementWithoutPropertyName(bindingElement *ast.Node) bool {
	return bindingElement.Kind == ast.KindBindingElement &&
		bindingElement.Parent.Kind == ast.KindObjectBindingPattern &&
		bindingElement.Name().Kind == ast.KindIdentifier &&
		bindingElement.PropertyName() == nil
}

func isArgumentOfElementAccessExpression(node *ast.Node) bool {
	return node != nil && node.Parent != nil &&
		node.Parent.Kind == ast.KindElementAccessExpression &&
		node.Parent.AsElementAccessExpression().ArgumentExpression == node
}

func isRightSideOfPropertyAccess(node *ast.Node) bool {
	return node.Parent.Kind == ast.KindPropertyAccessExpression && node.Parent.Name() == node
}

func isStaticSymbol(symbol *ast.Symbol) bool {
	if symbol.ValueDeclaration == nil {
		return false
	}
	modifierFlags := symbol.ValueDeclaration.ModifierFlags()
	return modifierFlags&ast.ModifierFlagsStatic != 0
}

func isImplementation(node *ast.Node) bool {
	if node.Flags&ast.NodeFlagsAmbient != 0 {
		return !(node.Kind == ast.KindInterfaceDeclaration || node.Kind == ast.KindTypeAliasDeclaration)
	}
	if ast.IsVariableLike(node) {
		return ast.HasInitializer(node)
	}
	if ast.IsFunctionLikeDeclaration(node) {
		return node.Body() != nil
	}
	return ast.IsClassLike(node) || ast.IsModuleOrEnumDeclaration(node)
}

func isImplementationExpression(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParenthesizedExpression:
		return isImplementationExpression(node.Expression())
	case ast.KindArrowFunction, ast.KindFunctionExpression, ast.KindObjectLiteralExpression, ast.KindClassExpression, ast.KindArrayLiteralExpression:
		return true
	default:
		return false
	}
}

func isReadonlyTypeOperator(node *ast.Node) bool {
	return node.Kind == ast.KindReadonlyKeyword && node.Parent.Kind == ast.KindTypeOperator && node.Parent.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword
}

func isJumpStatementTarget(node *ast.Node) bool {
	return node.Kind == ast.KindIdentifier && ast.IsBreakOrContinueStatement(node.Parent) && node.Parent.Label() == node
}

func isLabelOfLabeledStatement(node *ast.Node) bool {
	return node.Kind == ast.KindIdentifier && node.Parent.Kind == ast.KindLabeledStatement && node.Parent.Label() == node
}

func findReferenceInPosition(refs []*ast.FileReference, pos int) *ast.FileReference {
	return core.Find(refs, func(ref *ast.FileReference) bool { return ref.TextRange.ContainsInclusive(pos) })
}

func isTagName(node *ast.Node) bool {
	return node.Parent != nil && ast.IsJSDocTag(node.Parent) && node.Parent.TagName() == node
}

// Assumes `candidate.pos <= position` holds.
func positionBelongsToNode(candidate *ast.Node, position int, file *ast.SourceFile) bool {
	if candidate.Pos() > position {
		panic("Expected candidate.pos <= position")
	}
	return position < candidate.End() || !isCompletedNode(candidate, file)
}

func isCompletedNode(n *ast.Node, sourceFile *ast.SourceFile) bool {
	if n == nil || ast.NodeIsMissing(n) {
		return false
	}

	switch n.Kind {
	case ast.KindClassDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindEnumDeclaration,
		ast.KindObjectLiteralExpression,
		ast.KindObjectBindingPattern,
		ast.KindTypeLiteral,
		ast.KindBlock,
		ast.KindModuleBlock,
		ast.KindCaseBlock,
		ast.KindNamedImports,
		ast.KindNamedExports:
		return nodeEndsWith(n, ast.KindCloseBraceToken, sourceFile)

	case ast.KindCatchClause:
		return isCompletedNode(n.AsCatchClause().Block, sourceFile)

	case ast.KindNewExpression:
		if n.AsNewExpression().Arguments == nil {
			return true
		}
		fallthrough

	case ast.KindCallExpression,
		ast.KindParenthesizedExpression,
		ast.KindParenthesizedType:
		return nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)

	case ast.KindFunctionType,
		ast.KindConstructorType:
		return isCompletedNode(n.Type(), sourceFile)

	case ast.KindConstructor,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindFunctionDeclaration,
		ast.KindFunctionExpression,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature,
		ast.KindConstructSignature,
		ast.KindCallSignature,
		ast.KindArrowFunction:
		if n.Body() != nil {
			return isCompletedNode(n.Body(), sourceFile)
		}
		if n.Type() != nil {
			return isCompletedNode(n.Type(), sourceFile)
		}
		// Even though type parameters can be unclosed, we can get away with
		// having at least a closing paren.
		return hasChildOfKind(n, ast.KindCloseParenToken, sourceFile)

	case ast.KindModuleDeclaration:
		return n.AsModuleDeclaration().Body != nil && isCompletedNode(n.AsModuleDeclaration().Body, sourceFile)

	case ast.KindIfStatement:
		if n.AsIfStatement().ElseStatement != nil {
			return isCompletedNode(n.AsIfStatement().ElseStatement, sourceFile)
		}
		return isCompletedNode(n.AsIfStatement().ThenStatement, sourceFile)

	case ast.KindExpressionStatement:
		return isCompletedNode(n.AsExpressionStatement().Expression, sourceFile) ||
			hasChildOfKind(n, ast.KindSemicolonToken, sourceFile)

	case ast.KindArrayLiteralExpression,
		ast.KindArrayBindingPattern,
		ast.KindElementAccessExpression,
		ast.KindComputedPropertyName,
		ast.KindTupleType:
		return nodeEndsWith(n, ast.KindCloseBracketToken, sourceFile)

	case ast.KindIndexSignature:
		if n.AsIndexSignatureDeclaration().Type != nil {
			return isCompletedNode(n.AsIndexSignatureDeclaration().Type, sourceFile)
		}
		return hasChildOfKind(n, ast.KindCloseBracketToken, sourceFile)

	case ast.KindCaseClause,
		ast.KindDefaultClause:
		// there is no such thing as terminator token for CaseClause/DefaultClause so for simplicity always consider them non-completed
		return false

	case ast.KindForStatement,
		ast.KindForInStatement,
		ast.KindForOfStatement,
		ast.KindWhileStatement:
		return isCompletedNode(n.Statement(), sourceFile)
	case ast.KindDoStatement:
		// rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
		if hasChildOfKind(n, ast.KindWhileKeyword, sourceFile) {
			return nodeEndsWith(n, ast.KindCloseParenToken, sourceFile)
		}
		return isCompletedNode(n.AsDoStatement().Statement, sourceFile)

	case ast.KindTypeQuery:
		return isCompletedNode(n.AsTypeQueryNode().ExprName, sourceFile)

	case ast.KindTypeOfExpression,
		ast.KindDeleteExpression,
		ast.KindVoidExpression,
		ast.KindYieldExpression,
		ast.KindSpreadElement:
		return isCompletedNode(n.Expression(), sourceFile)

	case ast.KindTaggedTemplateExpression:
		return isCompletedNode(n.AsTaggedTemplateExpression().Template, sourceFile)

	case ast.KindTemplateExpression:
		if n.AsTemplateExpression().TemplateSpans == nil {
			return false
		}
		lastSpan := core.LastOrNil(n.AsTemplateExpression().TemplateSpans.Nodes)
		return isCompletedNode(lastSpan, sourceFile)

	case ast.KindTemplateSpan:
		return ast.NodeIsPresent(n.AsTemplateSpan().Literal)

	case ast.KindExportDeclaration,
		ast.KindImportDeclaration:
		return ast.NodeIsPresent(n.ModuleSpecifier())

	case ast.KindPrefixUnaryExpression:
		return isCompletedNode(n.AsPrefixUnaryExpression().Operand, sourceFile)

	case ast.KindBinaryExpression:
		return isCompletedNode(n.AsBinaryExpression().Right, sourceFile)

	case ast.KindConditionalExpression:
		return isCompletedNode(n.AsConditionalExpression().WhenFalse, sourceFile)

	default:
		return true
	}
}

// Checks if node ends with 'expectedLastToken'.
// If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
func nodeEndsWith(n *ast.Node, expectedLastToken ast.Kind, sourceFile *ast.SourceFile) bool {
	lastChildNode := lsutil.GetLastVisitedChild(n, sourceFile)
	var lastNodeAndTokens []*ast.Node
	var tokenStartPos int
	if lastChildNode != nil {
		lastNodeAndTokens = []*ast.Node{lastChildNode}
		tokenStartPos = lastChildNode.End()
	} else {
		tokenStartPos = n.Pos()
	}
	scanner := scanner.GetScannerForSourceFile(sourceFile, tokenStartPos)
	for startPos := tokenStartPos; startPos < n.End(); {
		tokenKind := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		token := sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, n)
		lastNodeAndTokens = append(lastNodeAndTokens, token)
		startPos = tokenEnd
		scanner.Scan()
	}
	if len(lastNodeAndTokens) == 0 {
		return false
	}
	lastChild := lastNodeAndTokens[len(lastNodeAndTokens)-1]
	if lastChild.Kind == expectedLastToken {
		return true
	} else if lastChild.Kind == ast.KindSemicolonToken && len(lastNodeAndTokens) > 1 {
		return lastNodeAndTokens[len(lastNodeAndTokens)-2].Kind == expectedLastToken
	}
	return false
}

func getContainingNodeIfInHeritageClause(node *ast.Node) *ast.Node {
	if node.Kind == ast.KindIdentifier || node.Kind == ast.KindPropertyAccessExpression {
		return getContainingNodeIfInHeritageClause(node.Parent)
	}
	if node.Kind == ast.KindExpressionWithTypeArguments && (ast.IsClassLike(node.Parent.Parent) || node.Parent.Parent.Kind == ast.KindInterfaceDeclaration) {
		return node.Parent.Parent
	}
	return nil
}

func getContainerNode(node *ast.Node) *ast.Node {
	for parent := node.Parent; parent != nil; parent = parent.Parent {
		switch parent.Kind {
		case ast.KindSourceFile, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindFunctionDeclaration, ast.KindFunctionExpression,
			ast.KindGetAccessor, ast.KindSetAccessor, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindModuleDeclaration:
			return parent
		}
	}
	return nil
}

func getAdjustedLocation(node *ast.Node, forRename bool, sourceFile *ast.SourceFile) *ast.Node {
	// todo: check if this function needs to be changed for jsdoc updates

	parent := node.Parent
	// /**/<modifier> [|name|] ...
	// /**/<modifier> <class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
	// /**/<class|interface|type|enum|module|namespace|function|get|set> [|name|] ...
	// /**/import [|name|] = ...
	//
	// NOTE: If the node is a modifier, we don't adjust its location if it is the `default` modifier as that is handled
	// specially by `getSymbolAtLocation`.
	isModifier := func(node *ast.Node) bool {
		if ast.IsModifier(node) && (forRename || node.Kind != ast.KindDefaultKeyword) {
			return ast.CanHaveModifiers(parent) && slices.Contains(parent.Modifiers().NodeList.Nodes, node)
		}
		switch node.Kind {
		case ast.KindClassKeyword:
			return ast.IsClassDeclaration(parent) || ast.IsClassExpression(node)
		case ast.KindFunctionKeyword:
			return ast.IsFunctionDeclaration(parent) || ast.IsFunctionExpression(node)
		case ast.KindInterfaceKeyword:
			return ast.IsInterfaceDeclaration(parent)
		case ast.KindEnumKeyword:
			return ast.IsEnumDeclaration(parent)
		case ast.KindTypeKeyword:
			return ast.IsTypeAliasDeclaration(parent)
		case ast.KindNamespaceKeyword, ast.KindModuleKeyword:
			return ast.IsModuleDeclaration(parent)
		case ast.KindImportKeyword:
			return ast.IsImportEqualsDeclaration(parent)
		case ast.KindGetKeyword:
			return ast.IsGetAccessorDeclaration(parent)
		case ast.KindSetKeyword:
			return ast.IsSetAccessorDeclaration(parent)
		}
		return false
	}
	if isModifier(node) {
		if sourceFile == nil {
			sourceFile = ast.GetSourceFileOfNode(node)
		}
		if location := getAdjustedLocationForDeclaration(parent, forRename, sourceFile); location != nil {
			return location
		}
	}

	// /**/<var|let| [|n:ame|] ...
	if node.Kind == ast.KindVarKeyword || node.Kind == ast.KindConstKeyword || node.Kind == ast.KindLetKeyword &&
		ast.IsVariableDeclarationList(parent) && len(parent.AsVariableDeclarationList().Declarations.Nodes) == 1 {
		if decl := parent.AsVariableDeclarationList().Declarations.Nodes[0].AsVariableDeclaration(); ast.IsIdentifier(decl.Name()) {
			return decl.Name()
		}
	}

	if node.Kind == ast.KindTypeKeyword {
		// import /**/type [|name|] from ...;
		// import /**/type { [|name|] } from ...;
		// import /**/type { propertyName as [|name|] } from ...;
		// import /**/type ... from "[|module|]";
		if ast.IsImportClause(parent) && parent.IsTypeOnly() {
			if location := getAdjustedLocationForImportDeclaration(parent.Parent.AsImportDeclaration(), forRename); location != nil {
				return location
			}
		}
		// export /**/type { [|name|] } from ...;
		// export /**/type { propertyName as [|name|] } from ...;
		// export /**/type * from "[|module|]";
		// export /**/type * as ... from "[|module|]";
		if ast.IsExportDeclaration(parent) && parent.IsTypeOnly() {
			if location := getAdjustedLocationForExportDeclaration(parent.Parent.AsExportDeclaration(), forRename); location != nil {
				return location
			}
		}
	}

	// import { propertyName /**/as [|name|] } ...
	// import * /**/as [|name|] ...
	// export { propertyName /**/as [|name|] } ...
	// export * /**/as [|name|] ...
	if node.Kind == ast.KindAsKeyword {
		if parent.Kind == ast.KindImportSpecifier && parent.AsImportSpecifier().PropertyName != nil ||
			parent.Kind == ast.KindExportSpecifier && parent.AsExportSpecifier().PropertyName != nil ||
			parent.Kind == ast.KindNamespaceImport ||
			parent.Kind == ast.KindNamespaceExport {
			return parent.Name()
		}
		if parent.Kind == ast.KindExportDeclaration {
			if exportClause := parent.AsExportDeclaration().ExportClause; exportClause != nil && exportClause.Kind == ast.KindNamespaceExport {
				return exportClause.Name()
			}
		}
	}

	// /**/import [|name|] from ...;
	// /**/import { [|name|] } from ...;
	// /**/import { propertyName as [|name|] } from ...;
	// /**/import ... from "[|module|]";
	// /**/import "[|module|]";
	if node.Kind == ast.KindImportKeyword && parent.Kind == ast.KindImportDeclaration {
		if location := getAdjustedLocationForImportDeclaration(parent.AsImportDeclaration(), forRename); location != nil {
			return location
		}
	}

	if node.Kind == ast.KindExportKeyword {
		// /**/export { [|name|] } ...;
		// /**/export { propertyName as [|name|] } ...;
		// /**/export * from "[|module|]";
		// /**/export * as ... from "[|module|]";
		if parent.Kind == ast.KindExportDeclaration {
			if location := getAdjustedLocationForExportDeclaration(parent.AsExportDeclaration(), forRename); location != nil {
				return location
			}
		}
		// NOTE: We don't adjust the location of the `default` keyword as that is handled specially by `getSymbolAtLocation`.
		// /**/export default [|name|];
		// /**/export = [|name|];
		if parent.Kind == ast.KindExportAssignment {
			return ast.SkipOuterExpressions(parent.AsExportAssignment().Expression, ast.OEKAll)
		}
	}
	// import name = /**/require("[|module|]");
	if node.Kind == ast.KindRequireKeyword && parent.Kind == ast.KindExternalModuleReference {
		return parent.AsExternalModuleReference().Expression
	}
	// import ... /**/from "[|module|]";
	// export ... /**/from "[|module|]";
	if node.Kind == ast.KindFromKeyword {
		if parent.Kind == ast.KindImportDeclaration && parent.AsImportDeclaration().ModuleSpecifier != nil {
			return parent.AsImportDeclaration().ModuleSpecifier
		}
		if parent.Kind == ast.KindImportDeclaration && parent.AsExportDeclaration().ModuleSpecifier != nil {
			return parent.AsExportDeclaration().ModuleSpecifier
		}
	}
	// class ... /**/extends [|name|] ...
	// class ... /**/implements [|name|] ...
	// class ... /**/implements name1, name2 ...
	// interface ... /**/extends [|name|] ...
	// interface ... /**/extends name1, name2 ...
	if (node.Kind == ast.KindExtendsKeyword || node.Kind == ast.KindImplementsKeyword) && parent.Kind == ast.KindHeritageClause && parent.AsHeritageClause().Token == node.Kind {
		getAdjustedLocationForHeritageClause := func(node *ast.HeritageClause) *ast.Node {
			// /**/extends [|name|]
			// /**/implements [|name|]
			if len(node.Types.Nodes) == 1 {
				return node.Types.Nodes[0].Expression()
			}

			// fall through `getAdjustedLocation`
			//    /**/extends name1, name2 ...
			//    /**/implements name1, name2 ...
			return nil
		}

		if location := getAdjustedLocationForHeritageClause(parent.AsHeritageClause()); location != nil {
			return location
		}
	}
	if node.Kind == ast.KindExtendsKeyword {
		// ... <T /**/extends [|U|]> ...
		if parent.Kind == ast.KindTypeParameter {
			if constraint := parent.AsTypeParameter().Constraint; constraint != nil && constraint.Kind == ast.KindTypeReference {
				return constraint.AsTypeReference().TypeName
			}
		}
		// ... T /**/extends [|U|] ? ...
		if parent.Kind == ast.KindConditionalType {
			if extendsType := parent.AsConditionalTypeNode().ExtendsType; extendsType != nil && extendsType.Kind == ast.KindTypeReference {
				return extendsType.AsTypeReference().TypeName
			}
		}
	}
	// ... T extends /**/infer [|U|] ? ...
	if node.Kind == ast.KindInferKeyword && parent.Kind == ast.KindInferType {
		return parent.AsInferTypeNode().TypeParameter.Name()
	}
	// { [ [|K|] /**/in keyof T]: ... }
	if node.Kind == ast.KindInKeyword && parent.Kind == ast.KindTypeParameter && parent.Parent.Kind == ast.KindMappedType {
		return parent.Name()
	}
	// /**/keyof [|T|]
	if node.Kind == ast.KindKeyOfKeyword && parent.Kind == ast.KindTypeOperator && parent.AsTypeOperatorNode().Operator == ast.KindKeyOfKeyword {
		if parentType := parent.Type(); parentType != nil && parentType.Kind == ast.KindTypeReference {
			return parentType.AsTypeReferenceNode().TypeName
		}
	}
	// /**/readonly [|name|][]
	if node.Kind == ast.KindReadonlyKeyword && parent.Kind == ast.KindTypeOperator && parent.AsTypeOperatorNode().Operator == ast.KindReadonlyKeyword {
		if parentType := parent.Type(); parentType != nil && parentType.Kind == ast.KindArrayType && parentType.AsArrayTypeNode().ElementType.Kind == ast.KindTypeReference {
			return parentType.AsArrayTypeNode().ElementType.AsTypeReferenceNode().TypeName
		}
	}

	if !forRename {
		// /**/new [|name|]
		// /**/void [|name|]
		// /**/void obj.[|name|]
		// /**/typeof [|name|]
		// /**/typeof obj.[|name|]
		// /**/await [|name|]
		// /**/await obj.[|name|]
		// /**/yield [|name|]
		// /**/yield obj.[|name|]
		// /**/delete obj.[|name|]
		if node.Kind == ast.KindNewKeyword && parent.Kind == ast.KindNewExpression ||
			node.Kind == ast.KindVoidKeyword && parent.Kind == ast.KindVoidExpression ||
			node.Kind == ast.KindTypeOfKeyword && parent.Kind == ast.KindTypeOfExpression ||
			node.Kind == ast.KindAwaitKeyword && parent.Kind == ast.KindAwaitExpression ||
			node.Kind == ast.KindYieldKeyword && parent.Kind == ast.KindYieldExpression ||
			node.Kind == ast.KindDeleteKeyword && parent.Kind == ast.KindDeleteExpression {
			if expr := parent.Expression(); expr != nil {
				return ast.SkipOuterExpressions(expr, ast.OEKAll)
			}
		}

		// left /**/in [|name|]
		// left /**/instanceof [|name|]
		if (node.Kind == ast.KindInKeyword || node.Kind == ast.KindInstanceOfKeyword) && parent.Kind == ast.KindBinaryExpression && parent.AsBinaryExpression().OperatorToken == node {
			return ast.SkipOuterExpressions(parent.AsBinaryExpression().Right, ast.OEKAll)
		}

		// left /**/as [|name|]
		if node.Kind == ast.KindAsKeyword && parent.Kind == ast.KindAsExpression {
			if asExprType := parent.Type(); asExprType != nil && asExprType.Kind == ast.KindTypeReference {
				return asExprType.AsTypeReferenceNode().TypeName
			}
		}

		// for (... /**/in [|name|])
		// for (... /**/of [|name|])
		if node.Kind == ast.KindInKeyword && parent.Kind == ast.KindForInStatement ||
			node.Kind == ast.KindOfKeyword && parent.Kind == ast.KindForOfStatement {
			return ast.SkipOuterExpressions(parent.AsForInOrOfStatement().Expression, ast.OEKAll)
		}
	}

	return node
}

func getAdjustedLocationForDeclaration(node *ast.Node, forRename bool, sourceFile *ast.SourceFile) *ast.Node {
	if node.Name() != nil {
		return node.Name()
	}
	if forRename {
		return nil
	}
	switch node.Kind {
	case ast.KindClassDeclaration, ast.KindFunctionDeclaration:
		// for class and function declarations, use the `default` modifier
		// when the declaration is unnamed.
		if node.Modifiers() != nil {
			return core.Find(node.Modifiers().NodeList.Nodes, func(*ast.Node) bool { return node.Kind == ast.KindDefaultKeyword })
		}
	case ast.KindClassExpression:
		// for class expressions, use the `class` keyword when the class is unnamed
		return findChildOfKind(node, ast.KindClassKeyword, sourceFile)
	case ast.KindFunctionExpression:
		// for function expressions, use the `function` keyword when the function is unnamed
		return findChildOfKind(node, ast.KindFunctionKeyword, sourceFile)
	case ast.KindConstructor:
		return node
	}
	return nil
}

func getAdjustedLocationForImportDeclaration(node *ast.ImportDeclaration, forRename bool) *ast.Node {
	if node.ImportClause != nil {
		if name := node.ImportClause.Name(); name != nil {
			if node.ImportClause.AsImportClause().NamedBindings != nil {
				// do not adjust if we have both a name and named bindings
				return nil
			}
			// /**/import [|name|] from ...;
			// import /**/type [|name|] from ...;
			return node.ImportClause.Name()
		}

		// /**/import { [|name|] } from ...;
		// /**/import { propertyName as [|name|] } from ...;
		// /**/import * as [|name|] from ...;
		// import /**/type { [|name|] } from ...;
		// import /**/type { propertyName as [|name|] } from ...;
		// import /**/type * as [|name|] from ...;
		if namedBindings := node.ImportClause.AsImportClause().NamedBindings; namedBindings != nil {
			switch namedBindings.Kind {
			case ast.KindNamedImports:
				// do nothing if there is more than one binding
				elements := namedBindings.AsNamedImports().Elements
				if len(elements.Nodes) != 1 {
					return nil
				}
				return elements.Nodes[0].Name()

			case ast.KindNamespaceImport:
				return namedBindings.Name()

			}
		}
	}
	if !forRename {
		// /**/import "[|module|]";
		// /**/import ... from "[|module|]";
		// import /**/type ... from "[|module|]";
		return node.ModuleSpecifier
	}
	return nil
}

func getAdjustedLocationForExportDeclaration(node *ast.ExportDeclaration, forRename bool) *ast.Node {
	if node.ExportClause != nil {
		// /**/export { [|name|] } ...
		// /**/export { propertyName as [|name|] } ...
		// /**/export * as [|name|] ...
		// export /**/type { [|name|] } from ...
		// export /**/type { propertyName as [|name|] } from ...
		// export /**/type * as [|name|] ...
		switch node.ExportClause.Kind {
		case ast.KindNamedExports:
			// do nothing if there is more than one binding
			elements := node.ExportClause.AsNamedExports().Elements
			if len(elements.Nodes) != 1 {
				return nil
			}
			return elements.Nodes[0].Name()
		case ast.KindNamespaceExport:
			return node.ExportClause.Name()
		}
	}
	if !forRename {
		// /**/export * from "[|module|]";
		// export /**/type * from "[|module|]";
		return node.ModuleSpecifier
	}
	return nil
}

func getMeaningFromLocation(node *ast.Node) ast.SemanticMeaning {
	// todo: check if this function needs to be changed for jsdoc updates
	node = getAdjustedLocation(node, false /*forRename*/, nil)
	parent := node.Parent
	switch {
	case ast.IsSourceFile(node):
		return ast.SemanticMeaningValue
	case ast.NodeKindIs(node, ast.KindExportAssignment, ast.KindExportSpecifier, ast.KindExternalModuleReference, ast.KindImportSpecifier, ast.KindImportClause) || parent.Kind == ast.KindImportEqualsDeclaration && node == parent.Name():
		return ast.SemanticMeaningAll
	case isInRightSideOfInternalImportEqualsDeclaration(node):
		//     import a = |b|; // Namespace
		//     import a = |b.c|; // Value, type, namespace
		//     import a = |b.c|.d; // Namespace
		name := node
		if node.Kind != ast.KindQualifiedName {
			name = core.IfElse(node.Parent.Kind == ast.KindQualifiedName && node.Parent.AsQualifiedName().Right == node, node.Parent, nil)
		}
		if name == nil || name.Parent.Kind == ast.KindImportEqualsDeclaration {
			return ast.SemanticMeaningNamespace
		}
		return ast.SemanticMeaningAll
	case ast.IsDeclarationName(node):
		return getMeaningFromDeclaration(parent)
	case ast.IsEntityName(node) && ast.IsJSDocNameReferenceContext(node):
		return ast.SemanticMeaningAll
	case isTypeReference(node):
		return ast.SemanticMeaningType
	case isNamespaceReference(node):
		return ast.SemanticMeaningNamespace
	case ast.IsTypeParameterDeclaration(parent):
		return ast.SemanticMeaningType
	case ast.IsLiteralTypeNode(parent):
		// This might be T["name"], which is actually referencing a property and not a type. So allow both meanings.
		return ast.SemanticMeaningType | ast.SemanticMeaningValue
	default:
		return ast.SemanticMeaningValue
	}
}

func getMeaningFromDeclaration(node *ast.Node) ast.SemanticMeaning {
	switch node.Kind {
	case ast.KindVariableDeclaration, ast.KindCommonJSExport, ast.KindParameter, ast.KindBindingElement,
		ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment,
		ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor,
		ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindCatchClause, ast.KindJsxAttribute:
		return ast.SemanticMeaningValue

	case ast.KindTypeParameter, ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration, ast.KindJSTypeAliasDeclaration, ast.KindTypeLiteral:
		return ast.SemanticMeaningType

	case ast.KindEnumMember, ast.KindClassDeclaration:
		return ast.SemanticMeaningValue | ast.SemanticMeaningType

	case ast.KindModuleDeclaration:
		if ast.IsAmbientModule(node) {
			return ast.SemanticMeaningNamespace | ast.SemanticMeaningValue
		} else if ast.GetModuleInstanceState(node) == ast.ModuleInstanceStateInstantiated {
			return ast.SemanticMeaningNamespace | ast.SemanticMeaningValue
		} else {
			return ast.SemanticMeaningNamespace
		}

	case ast.KindEnumDeclaration, ast.KindNamedImports, ast.KindImportSpecifier, ast.KindImportEqualsDeclaration, ast.KindImportDeclaration,
		ast.KindJSImportDeclaration, ast.KindExportAssignment, ast.KindJSExportAssignment, ast.KindExportDeclaration:
		return ast.SemanticMeaningAll

	// An external module can be a Value
	case ast.KindSourceFile:
		return ast.SemanticMeaningNamespace | ast.SemanticMeaningValue
	}

	return ast.SemanticMeaningAll
}

func getIntersectingMeaningFromDeclarations(node *ast.Node, symbol *ast.Symbol, defaultMeaning ast.SemanticMeaning) ast.SemanticMeaning {
	if node == nil {
		return defaultMeaning
	}

	meaning := getMeaningFromLocation(node)
	declarations := symbol.Declarations
	if len(declarations) == 0 {
		return meaning
	}

	lastIterationMeaning := meaning

	// !!! TODO check if the port is correct and the for loop is needed
	iteration := func(m ast.SemanticMeaning) ast.SemanticMeaning {
		for _, declaration := range declarations {
			declarationMeaning := getMeaningFromDeclaration(declaration)

			if declarationMeaning&m != 0 {
				m |= declarationMeaning
			}
		}
		return m
	}
	meaning = iteration(meaning)

	for meaning != lastIterationMeaning {
		// The result is order-sensitive, for instance if initialMeaning == Namespace, and declarations = [class, instantiated module]
		// we need to consider both as the initialMeaning intersects with the module in the namespace space, and the module
		// intersects with the class in the value space.
		// To achieve that we will keep iterating until the result stabilizes.

		// Remember the last meaning
		lastIterationMeaning = meaning
		meaning = iteration(meaning)
	}

	return meaning
}

// Returns the node in an `extends` or `implements` clause of a class or interface.
func getAllSuperTypeNodes(node *ast.Node) []*ast.TypeNode {
	if ast.IsInterfaceDeclaration(node) {
		return ast.GetHeritageElements(node, ast.KindExtendsKeyword)
	}
	if ast.IsClassLike(node) {
		return append(
			core.SingleElementSlice(ast.GetClassExtendsHeritageElement(node)),
			ast.GetImplementsTypeNodes(node)...,
		)
	}
	return nil
}

func getParentSymbolsOfPropertyAccess(location *ast.Node, symbol *ast.Symbol, ch *checker.Checker) []*ast.Symbol {
	if !isRightSideOfPropertyAccess(location) {
		return nil
	}
	lhsType := ch.GetTypeAtLocation(location.Parent.Expression())
	if lhsType == nil {
		return nil
	}
	var possibleSymbols []*checker.Type
	if lhsType.Flags()&checker.TypeFlagsUnionOrIntersection != 0 {
		possibleSymbols = lhsType.Types()
	} else if lhsType.Symbol() != symbol.Parent {
		possibleSymbols = []*checker.Type{lhsType}
	}
	return core.MapNonNil(possibleSymbols, func(t *checker.Type) *ast.Symbol {
		if t.Symbol() != nil && t.Symbol().Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) != 0 {
			return t.Symbol()
		}
		return nil
	})
}

// Find symbol of the given property-name and add the symbol to the given result array
// @param symbol a symbol to start searching for the given propertyName
// @param propertyName a name of property to search for
// @param cb a cache of symbol from previous iterations of calling this function to prevent infinite revisiting of the same symbol.
//
//	The value of previousIterationSymbol is undefined when the function is first called.
func getPropertySymbolsFromBaseTypes(symbol *ast.Symbol, propertyName string, checker *checker.Checker, cb func(base *ast.Symbol) *ast.Symbol) *ast.Symbol {
	var seen collections.Set[*ast.Symbol]
	var recur func(*ast.Symbol) *ast.Symbol
	recur = func(symbol *ast.Symbol) *ast.Symbol {
		// Use `addToSeen` to ensure we don't infinitely recurse in this situation:
		//      interface C extends C {
		//          /*findRef*/propName: string;
		//      }
		if symbol.Flags&(ast.SymbolFlagsClass|ast.SymbolFlagsInterface) == 0 || !seen.AddIfAbsent(symbol) {
			return nil
		}
		for _, declaration := range symbol.Declarations {
			for _, typeReference := range getAllSuperTypeNodes(declaration) {
				if propertyType := checker.GetTypeAtLocation(typeReference); propertyType != nil && propertyType.Symbol() != nil {
					// Visit the typeReference as well to see if it directly or indirectly uses that property
					if propertySymbol := checker.GetPropertyOfType(propertyType, propertyName); propertySymbol != nil {
						for _, rootSymbol := range checker.GetRootSymbols(propertySymbol) {
							if result := cb(rootSymbol); result != nil {
								return result
							}
						}
					}
					if result := recur(propertyType.Symbol()); result != nil {
						return result
					}
				}
			}
		}
		return nil
	}
	return recur(symbol)
}

func getPropertySymbolFromBindingElement(checker *checker.Checker, bindingElement *ast.Node) *ast.Symbol {
	if typeOfPattern := checker.GetTypeAtLocation(bindingElement.Parent); typeOfPattern != nil {
		return checker.GetPropertyOfType(typeOfPattern, bindingElement.Name().Text())
	}
	return nil
}

func getPropertySymbolOfObjectBindingPatternWithoutPropertyName(symbol *ast.Symbol, checker *checker.Checker) *ast.Symbol {
	bindingElement := ast.GetDeclarationOfKind(symbol, ast.KindBindingElement)
	if bindingElement != nil && isObjectBindingElementWithoutPropertyName(bindingElement) {
		return getPropertySymbolFromBindingElement(checker, bindingElement)
	}
	return nil
}

func getTargetLabel(referenceNode *ast.Node, labelName string) *ast.Node {
	// todo: rewrite as `ast.FindAncestor`
	for referenceNode != nil {
		if referenceNode.Kind == ast.KindLabeledStatement && referenceNode.AsLabeledStatement().Label.Text() == labelName {
			return referenceNode.AsLabeledStatement().Label
		}
		referenceNode = referenceNode.Parent
	}
	return nil
}

func skipConstraint(t *checker.Type, typeChecker *checker.Checker) *checker.Type {
	if t.IsTypeParameter() {
		c := typeChecker.GetBaseConstraintOfType(t)
		if c != nil {
			return c
		}
	}
	return t
}

type caseClauseTrackerState struct {
	existingStrings collections.Set[string]
	existingNumbers collections.Set[jsnum.Number]
	existingBigInts collections.Set[jsnum.PseudoBigInt]
}

// string | jsnum.Number
type trackerAddValue = any

// string | jsnum.Number | jsnum.PseudoBigInt
type trackerHasValue = any

type caseClauseTracker interface {
	addValue(value trackerAddValue)
	hasValue(value trackerHasValue) bool
}

func (c *caseClauseTrackerState) addValue(value trackerAddValue) {
	switch v := value.(type) {
	case string:
		c.existingStrings.Add(v)
	case jsnum.Number:
		c.existingNumbers.Add(v)
	default:
		panic(fmt.Sprintf("Unsupported type: %T", v))
	}
}

func (c *caseClauseTrackerState) hasValue(value trackerHasValue) bool {
	switch v := value.(type) {
	case string:
		return c.existingStrings.Has(v)
	case jsnum.Number:
		return c.existingNumbers.Has(v)
	case jsnum.PseudoBigInt:
		return c.existingBigInts.Has(v)
	default:
		panic(fmt.Sprintf("Unsupported type: %T", v))
	}
}

func newCaseClauseTracker(typeChecker *checker.Checker, clauses []*ast.CaseOrDefaultClauseNode) caseClauseTracker {
	c := &caseClauseTrackerState{
		existingStrings: collections.Set[string]{},
		existingNumbers: collections.Set[jsnum.Number]{},
		existingBigInts: collections.Set[jsnum.PseudoBigInt]{},
	}
	for _, clause := range clauses {
		if !ast.IsDefaultClause(clause) {
			expression := ast.SkipParentheses(clause.Expression())
			if ast.IsLiteralExpression(expression) {
				switch expression.Kind {
				case ast.KindNoSubstitutionTemplateLiteral, ast.KindStringLiteral:
					c.existingStrings.Add(expression.Text())
				case ast.KindNumericLiteral:
					c.existingNumbers.Add(jsnum.FromString(expression.Text()))
				case ast.KindBigIntLiteral:
					c.existingBigInts.Add(jsnum.ParseValidBigInt(expression.Text()))
				}
			} else {
				symbol := typeChecker.GetSymbolAtLocation(clause.Expression())
				if symbol != nil && symbol.ValueDeclaration != nil && ast.IsEnumMember(symbol.ValueDeclaration) {
					enumValue := typeChecker.GetConstantValue(symbol.ValueDeclaration)
					if enumValue != nil {
						c.addValue(enumValue)
					}
				}
			}
		}
	}
	return c
}

func RangeContainsRange(r1 core.TextRange, r2 core.TextRange) bool {
	return startEndContainsRange(r1.Pos(), r1.End(), r2)
}

func startEndContainsRange(start int, end int, textRange core.TextRange) bool {
	return start <= textRange.Pos() && end >= textRange.End()
}

func getPossibleGenericSignatures(called *ast.Expression, typeArgumentCount int, c *checker.Checker) []*checker.Signature {
	typeAtLocation := c.GetTypeAtLocation(called)
	if ast.IsOptionalChain(called.Parent) {
		typeAtLocation = removeOptionality(typeAtLocation, ast.IsOptionalChainRoot(called.Parent), true /*isOptionalChain*/, c)
	}
	var signatures []*checker.Signature
	if ast.IsNewExpression(called.Parent) {
		signatures = c.GetSignaturesOfType(typeAtLocation, checker.SignatureKindConstruct)
	} else {
		signatures = c.GetSignaturesOfType(typeAtLocation, checker.SignatureKindCall)
	}
	return core.Filter(signatures, func(s *checker.Signature) bool {
		return s.TypeParameters() != nil && len(s.TypeParameters()) >= typeArgumentCount
	})
}

func removeOptionality(t *checker.Type, isOptionalExpression bool, isOptionalChain bool, c *checker.Checker) *checker.Type {
	if isOptionalExpression {
		return c.GetNonNullableType(t)
	} else if isOptionalChain {
		return c.GetNonOptionalType(t)
	}
	return t
}

func isNoSubstitutionTemplateLiteral(node *ast.Node) bool {
	return node.Kind == ast.KindNoSubstitutionTemplateLiteral
}

func isTaggedTemplateExpression(node *ast.Node) bool {
	return node.Kind == ast.KindTaggedTemplateExpression
}

func isInsideTemplateLiteral(node *ast.Node, position int, sourceFile *ast.SourceFile) bool {
	return ast.IsTemplateLiteralKind(node.Kind) && (scanner.GetTokenPosOfNode(node, sourceFile, false) < position && position < node.End() || (ast.IsUnterminatedLiteral(node) && position == node.End()))
}

// Pseudo-literals
func isTemplateHead(node *ast.Node) bool {
	return node.Kind == ast.KindTemplateHead
}

func isTemplateTail(node *ast.Node) bool {
	return node.Kind == ast.KindTemplateTail
}

func findPrecedingMatchingToken(token *ast.Node, matchingTokenKind ast.Kind, sourceFile *ast.SourceFile) *ast.Node {
	closeTokenText := scanner.TokenToString(token.Kind)
	matchingTokenText := scanner.TokenToString(matchingTokenKind)
	// Text-scan based fast path - can be bamboozled by comments and other trivia, but often provides
	// a good, fast approximation without too much extra work in the cases where it fails.
	bestGuessIndex := strings.LastIndex(sourceFile.Text(), matchingTokenText)
	if bestGuessIndex == -1 {
		return nil // if the token text doesn't appear in the file, there can't be a match - super fast bail
	}
	// we can only use the textual result directly if we didn't have to count any close tokens within the range
	if strings.LastIndex(sourceFile.Text(), closeTokenText) < bestGuessIndex {
		nodeAtGuess := astnav.FindPrecedingToken(sourceFile, bestGuessIndex+1)
		if nodeAtGuess != nil && nodeAtGuess.Kind == matchingTokenKind {
			return nodeAtGuess
		}
	}
	tokenKind := token.Kind
	remainingMatchingTokens := 0
	for {
		preceding := astnav.FindPrecedingToken(sourceFile, token.Pos())
		if preceding == nil {
			return nil
		}
		token = preceding
		switch token.Kind {
		case matchingTokenKind:
			if remainingMatchingTokens == 0 {
				return token
			}
			remainingMatchingTokens--
		case tokenKind:
			remainingMatchingTokens++
		}
	}
}

func findContainingList(node *ast.Node, file *ast.SourceFile) *ast.NodeList {
	// The node might be a list element (nonsynthetic) or a comma (synthetic). Either way, it will
	// be parented by the container of the SyntaxList, not the SyntaxList itself.
	var list *ast.NodeList
	visitNode := func(n *ast.Node, visitor *ast.NodeVisitor) *ast.Node {
		return n
	}
	visitNodes := func(nodes *ast.NodeList, visitor *ast.NodeVisitor) *ast.NodeList {
		if nodes != nil && RangeContainsRange(nodes.Loc, node.Loc) {
			list = nodes
		}
		return nodes
	}
	astnav.VisitEachChildAndJSDoc(node.Parent, file, visitNode, visitNodes)
	return list
}

func getLeadingCommentRangesOfNode(node *ast.Node, file *ast.SourceFile) iter.Seq[ast.CommentRange] {
	if node.Kind == ast.KindJsxText {
		return nil
	}
	return scanner.GetLeadingCommentRanges(&ast.NodeFactory{}, file.Text(), node.Pos())
}

// Equivalent to Strada's `node.getChildren()` for non-JSDoc nodes.
func getChildrenFromNonJSDocNode(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	var childNodes []*ast.Node
	node.ForEachChild(func(child *ast.Node) bool {
		childNodes = append(childNodes, child)
		return false
	})
	var children []*ast.Node
	pos := node.Pos()
	for _, child := range childNodes {
		scanner := scanner.GetScannerForSourceFile(sourceFile, pos)
		for pos < child.Pos() {
			token := scanner.Token()
			tokenFullStart := scanner.TokenFullStart()
			tokenEnd := scanner.TokenEnd()
			children = append(children, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, node))
			pos = tokenEnd
			scanner.Scan()
		}
		children = append(children, child)
		pos = child.End()
	}
	scanner := scanner.GetScannerForSourceFile(sourceFile, pos)
	for pos < node.End() {
		token := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		children = append(children, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, node))
		pos = tokenEnd
		scanner.Scan()
	}
	return children
}

// Returns the containing object literal property declaration given a possible name node, e.g. "a" in x = { "a": 1 }
func getContainingObjectLiteralElement(node *ast.Node) *ast.Node {
	element := getContainingObjectLiteralElementWorker(node)
	if element != nil && (ast.IsObjectLiteralExpression(element.Parent) || ast.IsJsxAttributes(element.Parent)) {
		return element
	}
	return nil
}

func getContainingObjectLiteralElementWorker(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral:
		if node.Parent.Kind == ast.KindComputedPropertyName {
			if ast.IsObjectLiteralElement(node.Parent.Parent) {
				return node.Parent.Parent
			}
			return nil
		}
		fallthrough
	case ast.KindIdentifier:
		if ast.IsObjectLiteralElement(node.Parent) && (node.Parent.Parent.Kind == ast.KindObjectLiteralExpression || node.Parent.Parent.Kind == ast.KindJsxAttributes) && node.Parent.Name() == node {
			return node.Parent
		}
	}
	return nil
}

// Return a function that returns true if the given node has not been seen
func nodeSeenTracker() func(*ast.Node) bool {
	var seen collections.Set[*ast.Node]
	return func(node *ast.Node) bool {
		return seen.AddIfAbsent(node)
	}
}
