package ls

import (
	"fmt"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

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

func tryGetImportFromModuleSpecifier(node *ast.StringLiteralLike) *ast.Node {
	switch node.Parent.Kind {
	case ast.KindImportDeclaration, ast.KindJSImportDeclaration, ast.KindExportDeclaration:
		return node.Parent
	case ast.KindExternalModuleReference:
		return node.Parent.Parent
	case ast.KindCallExpression:
		if ast.IsImportCall(node.Parent) || ast.IsRequireCall(node.Parent) {
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

// !!!
func isInComment(file *ast.SourceFile, position int, tokenAtPosition *ast.Node) *ast.CommentRange {
	return nil
}

// Replaces last(node.getChildren(sourceFile))
func getLastChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	lastChildNode := getLastVisitedChild(node, sourceFile)
	if ast.IsJSDocSingleCommentNode(node) {
		return nil
	}
	var tokenStartPos int
	if lastChildNode != nil {
		tokenStartPos = lastChildNode.End()
	} else {
		tokenStartPos = node.Pos()
	}
	var lastToken *ast.Node
	scanner := scanner.GetScannerForSourceFile(sourceFile, tokenStartPos)
	for startPos := tokenStartPos; startPos < node.End(); {
		tokenKind := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		lastToken = sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, node)
		startPos = tokenEnd
		scanner.Scan()
	}
	return core.IfElse(lastToken != nil, lastToken, lastChildNode)
}

func getLastToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if node == nil {
		return nil
	}

	if ast.IsTokenKind(node.Kind) || ast.IsIdentifier(node) {
		return nil
	}

	assertHasRealPosition(node)

	lastChild := getLastChild(node, sourceFile)
	if lastChild == nil {
		return nil
	}

	if lastChild.Kind < ast.KindFirstNode {
		return lastChild
	} else {
		return getLastToken(lastChild, sourceFile)
	}
}

// Gets the last visited child of the given node.
// NOTE: This doesn't include unvisited tokens; for this, use `getLastChild` or `getLastToken`.
func getLastVisitedChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	var lastChild *ast.Node

	visitNode := func(n *ast.Node, _ *ast.NodeVisitor) *ast.Node {
		if !(n == nil || node.Flags&ast.NodeFlagsReparsed != 0) {
			lastChild = n
		}
		return n
	}
	visitNodeList := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
		if nodeList != nil && len(nodeList.Nodes) > 0 && !ast.IsJSDocSingleCommentNodeList(node, nodeList) {
			for i := len(nodeList.Nodes) - 1; i >= 0; i-- {
				if nodeList.Nodes[i].Flags&ast.NodeFlagsReparsed == 0 {
					lastChild = nodeList.Nodes[i]
					break
				}
			}
		}
		return nodeList
	}

	nodeVisitor := ast.NewNodeVisitor(core.Identity, nil, ast.NodeVisitorHooks{
		VisitNode:  visitNode,
		VisitToken: visitNode,
		VisitNodes: visitNodeList,
		VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
			if modifiers != nil {
				visitNodeList(&modifiers.NodeList, visitor)
			}
			return modifiers
		},
	})

	astnav.VisitEachChildAndJSDoc(node, sourceFile, nodeVisitor)
	return lastChild
}

func getFirstToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if ast.IsIdentifier(node) || ast.IsTokenKind(node.Kind) {
		return nil
	}
	assertHasRealPosition(node)
	var firstChild *ast.Node
	node.ForEachChild(func(n *ast.Node) bool {
		if n == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
			return false
		}
		firstChild = n
		return true
	})

	var tokenEndPosition int
	if firstChild != nil {
		tokenEndPosition = firstChild.Pos()
	} else {
		tokenEndPosition = node.End()
	}
	scanner := scanner.GetScannerForSourceFile(sourceFile, node.Pos())
	var firstToken *ast.Node
	if node.Pos() < tokenEndPosition {
		tokenKind := scanner.Token()
		tokenFullStart := scanner.TokenFullStart()
		tokenEnd := scanner.TokenEnd()
		firstToken = sourceFile.GetOrCreateToken(tokenKind, tokenFullStart, tokenEnd, node)
	}

	if firstToken != nil {
		return firstToken
	}
	if firstChild == nil {
		return nil
	}
	if firstChild.Kind < ast.KindFirstNode {
		return firstChild
	}
	return getFirstToken(firstChild, sourceFile)
}

func assertHasRealPosition(node *ast.Node) {
	if ast.PositionIsSynthesized(node.Pos()) || ast.PositionIsSynthesized(node.End()) {
		panic("Node must have a real position for this operation.")
	}
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

// !!! signature help
type PossibleTypeArgumentInfo struct {
	called         *ast.IdentifierNode
	nTypeArguments int
}

// !!! signature help
func getPossibleTypeArgumentsInfo(tokenIn *ast.Node, sourceFile *ast.SourceFile) *PossibleTypeArgumentInfo {
	return nil
}

// !!! signature help
func getPossibleGenericSignatures(called *ast.Expression, typeArgumentCount int, checker *checker.Checker) []*checker.Signature {
	return nil
}

func isInRightSideOfInternalImportEqualsDeclaration(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindQualifiedName {
		node = node.Parent
	}

	return ast.IsInternalModuleImportEqualsDeclaration(node.Parent) && node.Parent.AsImportEqualsDeclaration().ModuleReference == node
}

func (l *LanguageService) createLspRangeFromNode(node *ast.Node, file *ast.SourceFile) *lsproto.Range {
	return l.createLspRangeFromBounds(node.Pos(), node.End(), file)
}

func (l *LanguageService) createLspRangeFromBounds(start, end int, file *ast.SourceFile) *lsproto.Range {
	lspRange := l.converters.ToLSPRange(file, core.NewTextRange(start, end))
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

func positionIsASICandidate(pos int, context *ast.Node, file *ast.SourceFile) bool {
	contextAncestor := ast.FindAncestorOrQuit(context, func(ancestor *ast.Node) ast.FindAncestorResult {
		if ancestor.End() != pos {
			return ast.FindAncestorQuit
		}

		return ast.ToFindAncestorResult(syntaxMayBeASICandidate(ancestor.Kind))
	})

	return contextAncestor != nil && nodeIsASICandidate(contextAncestor, file)
}

func syntaxMayBeASICandidate(kind ast.Kind) bool {
	return syntaxRequiresTrailingCommaOrSemicolonOrASI(kind) ||
		syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind) ||
		syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind) ||
		syntaxRequiresTrailingSemicolonOrASI(kind)
}

func syntaxRequiresTrailingCommaOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindCallSignature ||
		kind == ast.KindConstructSignature ||
		kind == ast.KindIndexSignature ||
		kind == ast.KindPropertySignature ||
		kind == ast.KindMethodSignature
}

func syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindFunctionDeclaration ||
		kind == ast.KindConstructor ||
		kind == ast.KindMethodDeclaration ||
		kind == ast.KindGetAccessor ||
		kind == ast.KindSetAccessor
}

func syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindModuleDeclaration
}

func syntaxRequiresTrailingSemicolonOrASI(kind ast.Kind) bool {
	return kind == ast.KindVariableStatement ||
		kind == ast.KindExpressionStatement ||
		kind == ast.KindDoStatement ||
		kind == ast.KindContinueStatement ||
		kind == ast.KindBreakStatement ||
		kind == ast.KindReturnStatement ||
		kind == ast.KindThrowStatement ||
		kind == ast.KindDebuggerStatement ||
		kind == ast.KindPropertyDeclaration ||
		kind == ast.KindTypeAliasDeclaration ||
		kind == ast.KindImportDeclaration ||
		kind == ast.KindImportEqualsDeclaration ||
		kind == ast.KindExportDeclaration ||
		kind == ast.KindNamespaceExportDeclaration ||
		kind == ast.KindExportAssignment
}

func nodeIsASICandidate(node *ast.Node, file *ast.SourceFile) bool {
	lastToken := getLastToken(node, file)
	if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
		return false
	}

	if syntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {
		if lastToken != nil && lastToken.Kind == ast.KindCommaToken {
			return false
		}
	} else if syntaxRequiresTrailingModuleBlockOrSemicolonOrASI(node.Kind) {
		lastChild := getLastChild(node, file)
		if lastChild != nil && ast.IsModuleBlock(lastChild) {
			return false
		}
	} else if syntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(node.Kind) {
		lastChild := getLastChild(node, file)
		if lastChild != nil && ast.IsFunctionBlock(lastChild) {
			return false
		}
	} else if !syntaxRequiresTrailingSemicolonOrASI(node.Kind) {
		return false
	}

	// See comment in parser's `parseDoStatement`
	if node.Kind == ast.KindDoStatement {
		return true
	}

	topNode := ast.FindAncestor(node, func(ancestor *ast.Node) bool { return ancestor.Parent == nil })
	nextToken := astnav.FindNextToken(node, topNode, file)
	if nextToken == nil || nextToken.Kind == ast.KindCloseBraceToken {
		return true
	}

	startLine, _ := scanner.GetLineAndCharacterOfPosition(file, node.End())
	endLine, _ := scanner.GetLineAndCharacterOfPosition(file, astnav.GetStartOfNode(nextToken, file, false /*includeJSDoc*/))
	return startLine != endLine
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
		if syntaxRequiresTrailingSemicolonOrASI(node.Kind) {
			lastToken := getLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else {
				withoutSemicolon++
			}
		} else if syntaxRequiresTrailingCommaOrSemicolonOrASI(node.Kind) {
			lastToken := getLastToken(node, file)
			if lastToken != nil && lastToken.Kind == ast.KindSemicolonToken {
				withSemicolon++
			} else if lastToken != nil && lastToken.Kind != ast.KindCommaToken {
				lastTokenLine, _ := scanner.GetLineAndCharacterOfPosition(
					file,
					astnav.GetStartOfNode(lastToken, file, false /*includeJSDoc*/))
				nextTokenLine, _ := scanner.GetLineAndCharacterOfPosition(
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

var typeKeywords *core.Set[ast.Kind] = core.NewSetFromItems(
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

func isArgumentOfElementAccessExpression(node *ast.Node) bool {
	return node != nil && node.Parent != nil &&
		node.Parent.Kind == ast.KindElementAccessExpression &&
		node.Parent.AsElementAccessExpression().ArgumentExpression == node
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
	lastChildNode := getLastVisitedChild(n, sourceFile)
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

// Returns the node in an `extends` or `implements` clause of a class or interface.
func getAllSuperTypeNodes(node *ast.Node) []*ast.TypeNode {
	if ast.IsInterfaceDeclaration(node) {
		return ast.GetHeritageElements(node, ast.KindExtendsKeyword)
	}
	if ast.IsClassLike(node) {
		return append(
			[]*ast.Node{ast.GetClassExtendsHeritageElement(node)},
			ast.GetImplementsTypeNodes(node)...,
		)
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
	existingStrings core.Set[string]
	existingNumbers core.Set[jsnum.Number]
	existingBigInts core.Set[jsnum.PseudoBigInt]
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
		existingStrings: core.Set[string]{},
		existingNumbers: core.Set[jsnum.Number]{},
		existingBigInts: core.Set[jsnum.PseudoBigInt]{},
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
