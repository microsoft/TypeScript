package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/lsutil"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func (l *LanguageService) ProvideDocumentHighlights(ctx context.Context, documentUri lsproto.DocumentUri, documentPosition lsproto.Position) (lsproto.DocumentHighlightResponse, error) {
	program, sourceFile := l.getProgramAndFile(documentUri)
	position := int(l.converters.LineAndCharacterToPosition(sourceFile, documentPosition))
	node := astnav.GetTouchingPropertyName(sourceFile, position)
	if node.Parent != nil && (node.Parent.Kind == ast.KindJsxClosingElement || (node.Parent.Kind == ast.KindJsxOpeningElement && node.Parent.TagName() == node)) {
		var openingElement, closingElement *ast.Node
		if ast.IsJsxElement(node.Parent.Parent) {
			openingElement = node.Parent.Parent.AsJsxElement().OpeningElement
			closingElement = node.Parent.Parent.AsJsxElement().ClosingElement
		}
		var documentHighlights []*lsproto.DocumentHighlight
		kind := lsproto.DocumentHighlightKindRead
		if openingElement != nil {
			documentHighlights = append(documentHighlights, &lsproto.DocumentHighlight{
				Range: *l.createLspRangeFromNode(openingElement, sourceFile),
				Kind:  &kind,
			})
		}
		if closingElement != nil {
			documentHighlights = append(documentHighlights, &lsproto.DocumentHighlight{
				Range: *l.createLspRangeFromNode(closingElement, sourceFile),
				Kind:  &kind,
			})
		}
		return lsproto.DocumentHighlightsOrNull{
			DocumentHighlights: &documentHighlights,
		}, nil
	}
	documentHighlights := l.getSemanticDocumentHighlights(ctx, position, node, program, sourceFile)
	if len(documentHighlights) == 0 {
		documentHighlights = l.getSyntacticDocumentHighlights(node, sourceFile)
	}
	// if nil is passed here we never generate an error, just pass an empty higlight
	return lsproto.DocumentHighlightsOrNull{DocumentHighlights: &documentHighlights}, nil
}

func (l *LanguageService) getSemanticDocumentHighlights(ctx context.Context, position int, node *ast.Node, program *compiler.Program, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	options := refOptions{use: referenceUseReferences}
	referenceEntries := l.getReferencedSymbolsForNode(ctx, position, node, program, []*ast.SourceFile{sourceFile}, options, &collections.Set[string]{})
	if referenceEntries == nil {
		return nil
	}
	var highlights []*lsproto.DocumentHighlight
	for _, entry := range referenceEntries {
		for _, ref := range entry.references {
			if ref.node != nil {
				fileName, highlight := l.toDocumentHighlight(ref)
				if fileName == sourceFile.FileName() {
					highlights = append(highlights, highlight)
				}
			}
		}
	}
	return highlights
}

func (l *LanguageService) toDocumentHighlight(entry *referenceEntry) (string, *lsproto.DocumentHighlight) {
	entry = l.resolveEntry(entry)

	kind := lsproto.DocumentHighlightKindRead
	if entry.kind == entryKindRange {
		return entry.fileName, &lsproto.DocumentHighlight{
			Range: *entry.textRange,
			Kind:  &kind,
		}
	}

	// Determine write access for node references.
	if ast.IsWriteAccessForReference(entry.node) {
		kind = lsproto.DocumentHighlightKindWrite
	}

	dh := &lsproto.DocumentHighlight{
		Range: *entry.textRange,
		Kind:  &kind,
	}

	return entry.fileName, dh
}

func (l *LanguageService) getSyntacticDocumentHighlights(node *ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	switch node.Kind {
	case ast.KindIfKeyword, ast.KindElseKeyword:
		if ast.IsIfStatement(node.Parent) {
			return l.getIfElseOccurrences(node.Parent.AsIfStatement(), sourceFile)
		}
		return nil
	case ast.KindReturnKeyword:
		return l.useParent(node.Parent, ast.IsReturnStatement, getReturnOccurrences, sourceFile)
	case ast.KindThrowKeyword:
		return l.useParent(node.Parent, ast.IsThrowStatement, getThrowOccurrences, sourceFile)
	case ast.KindTryKeyword, ast.KindCatchKeyword, ast.KindFinallyKeyword:
		var tryStatement *ast.Node
		if node.Kind == ast.KindCatchKeyword {
			tryStatement = node.Parent.Parent
		} else {
			tryStatement = node.Parent
		}
		return l.useParent(tryStatement, ast.IsTryStatement, getTryCatchFinallyOccurrences, sourceFile)
	case ast.KindSwitchKeyword:
		return l.useParent(node.Parent, ast.IsSwitchStatement, getSwitchCaseDefaultOccurrences, sourceFile)
	case ast.KindCaseKeyword, ast.KindDefaultKeyword:
		if ast.IsDefaultClause(node.Parent) || ast.IsCaseClause(node.Parent) {
			return l.useParent(node.Parent.Parent.Parent, ast.IsSwitchStatement, getSwitchCaseDefaultOccurrences, sourceFile)
		}
		return nil
	case ast.KindBreakKeyword, ast.KindContinueKeyword:
		return l.useParent(node.Parent, ast.IsBreakOrContinueStatement, getBreakOrContinueStatementOccurrences, sourceFile)
	case ast.KindForKeyword, ast.KindWhileKeyword, ast.KindDoKeyword:
		return l.useParent(node.Parent, func(n *ast.Node) bool {
			return ast.IsIterationStatement(n, true)
		}, getLoopBreakContinueOccurrences, sourceFile)
	case ast.KindConstructorKeyword:
		return l.getFromAllDeclarations(ast.IsConstructorDeclaration, []ast.Kind{ast.KindConstructorKeyword}, node, sourceFile)
	case ast.KindGetKeyword, ast.KindSetKeyword:
		return l.getFromAllDeclarations(ast.IsAccessor, []ast.Kind{ast.KindGetKeyword, ast.KindSetKeyword}, node, sourceFile)
	case ast.KindAwaitKeyword:
		return l.useParent(node.Parent, ast.IsAwaitExpression, getAsyncAndAwaitOccurrences, sourceFile)
	case ast.KindAsyncKeyword:
		return l.highlightSpans(getAsyncAndAwaitOccurrences(node, sourceFile), sourceFile)
	case ast.KindYieldKeyword:
		return l.highlightSpans(getYieldOccurrences(node, sourceFile), sourceFile)
	case ast.KindInKeyword, ast.KindOutKeyword:
		return nil
	default:
		if ast.IsModifierKind(node.Kind) && (ast.IsDeclaration(node.Parent) || ast.IsVariableStatement(node.Parent)) {
			return l.highlightSpans(getModifierOccurrences(node.Kind, node.Parent, sourceFile), sourceFile)
		}
		return nil
	}
}

func (l *LanguageService) useParent(node *ast.Node, nodeTest func(*ast.Node) bool, getNodes func(*ast.Node, *ast.SourceFile) []*ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	if nodeTest(node) {
		return l.highlightSpans(getNodes(node, sourceFile), sourceFile)
	}
	return nil
}

func (l *LanguageService) highlightSpans(nodes []*ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	if len(nodes) == 0 {
		return nil
	}
	var highlights []*lsproto.DocumentHighlight
	kind := lsproto.DocumentHighlightKindRead
	for _, node := range nodes {
		if node != nil {
			highlights = append(highlights, &lsproto.DocumentHighlight{
				Range: *l.createLspRangeFromNode(node, sourceFile),
				Kind:  &kind,
			})
		}
	}
	return highlights
}

func (l *LanguageService) getFromAllDeclarations(nodeTest func(*ast.Node) bool, keywords []ast.Kind, node *ast.Node, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	return l.useParent(node.Parent, nodeTest, func(decl *ast.Node, sf *ast.SourceFile) []*ast.Node {
		var symbolDecls []*ast.Node
		if ast.CanHaveSymbol(decl) {
			if symbol := decl.Symbol(); symbol != nil {
				for _, d := range symbol.Declarations {
					if nodeTest(d) {
					outer:
						for _, c := range getChildrenFromNonJSDocNode(d, sourceFile) {
							for _, k := range keywords {
								if c.Kind == k {
									symbolDecls = append(symbolDecls, c)
									break outer
								}
							}
						}
					}
				}
			}
		}
		return symbolDecls
	}, sourceFile)
}

func (l *LanguageService) getIfElseOccurrences(ifStatement *ast.IfStatement, sourceFile *ast.SourceFile) []*lsproto.DocumentHighlight {
	keywords := getIfElseKeywords(ifStatement, sourceFile)
	kind := lsproto.DocumentHighlightKindRead
	var highlights []*lsproto.DocumentHighlight

	// We'd like to highlight else/ifs together if they are only separated by whitespace
	// (i.e. the keywords are separated by no comments, no newlines).
	for i := 0; i < len(keywords); i++ {
		if keywords[i].Kind == ast.KindElseKeyword && i < len(keywords)-1 {
			elseKeyword := keywords[i]
			ifKeyword := keywords[i+1] // this *should* always be an 'if' keyword.
			shouldCombine := true

			// Avoid recalculating getStart() by iterating backwards.
			ifTokenStart := scanner.GetTokenPosOfNode(ifKeyword, sourceFile, false)
			if ifTokenStart < 0 {
				ifTokenStart = ifKeyword.Pos()
			}
			for j := ifTokenStart - 1; j >= elseKeyword.End(); j-- {
				if !stringutil.IsWhiteSpaceSingleLine(rune(sourceFile.Text()[j])) {
					shouldCombine = false
					break
				}
			}
			if shouldCombine {
				highlights = append(highlights, &lsproto.DocumentHighlight{
					Range: *l.createLspRangeFromBounds(scanner.SkipTrivia(sourceFile.Text(), elseKeyword.Pos()), ifKeyword.End(), sourceFile),
					Kind:  &kind,
				})
				i++ // skip the next keyword
				continue
			}
		}
		// Ordinary case: just highlight the keyword.
		highlights = append(highlights, &lsproto.DocumentHighlight{
			Range: *l.createLspRangeFromNode(keywords[i], sourceFile),
			Kind:  &kind,
		})
	}
	return highlights
}

func getIfElseKeywords(ifStatement *ast.IfStatement, sourceFile *ast.SourceFile) []*ast.Node {
	// Traverse upwards through all parent if-statements linked by their else-branches.
	// Is this cast error safe or should i be checking if elseStatement exists first?
	for ast.IsIfStatement(ifStatement.Parent) && ifStatement.Parent.AsIfStatement().ElseStatement.AsIfStatement() == ifStatement {
		ifStatement = ifStatement.Parent.AsIfStatement()
	}

	var keywords []*ast.Node

	// Traverse back down through the else branches, aggregating if/else keywords of if-statements.
	for {
		children := getChildrenFromNonJSDocNode(ifStatement.AsNode(), sourceFile)
		if len(children) > 0 && children[0].Kind == ast.KindIfKeyword {
			keywords = append(keywords, children[0])
		}
		// Generally the 'else' keyword is second-to-last, so traverse backwards.
		for i := len(children) - 1; i >= 0; i-- {
			if children[i].Kind == ast.KindElseKeyword {
				keywords = append(keywords, children[i])
				break
			}
		}
		elseStatement := ifStatement.ElseStatement
		if elseStatement == nil || !ast.IsIfStatement(elseStatement) {
			break
		}
		ifStatement = elseStatement.AsIfStatement()
	}
	return keywords
}

func getReturnOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	funcNode := ast.FindAncestor(node.Parent, ast.IsFunctionLike)
	if funcNode == nil {
		return nil
	}

	var keywords []*ast.Node
	body := funcNode.Body()
	if body != nil {
		ast.ForEachReturnStatement(body, func(ret *ast.Node) bool {
			keyword := findChildOfKind(ret, ast.KindReturnKeyword, sourceFile)
			if keyword != nil {
				keywords = append(keywords, keyword)
			}
			return false // continue traversal
		})

		// Get all throw statements not in a try block
		throwStatements := aggregateOwnedThrowStatements(body, sourceFile)
		for _, throw := range throwStatements {
			keyword := findChildOfKind(throw, ast.KindThrowKeyword, sourceFile)
			if keyword != nil {
				keywords = append(keywords, keyword)
			}
		}
	}
	return keywords
}

func aggregateOwnedThrowStatements(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	if ast.IsThrowStatement(node) {
		return []*ast.Node{node}
	}
	if ast.IsTryStatement(node) {
		// Exceptions thrown within a try block lacking a catch clause are "owned" in the current context.
		statement := node.AsTryStatement()
		tryBlock := statement.TryBlock
		catchClause := statement.CatchClause
		finallyBlock := statement.FinallyBlock

		var result []*ast.Node
		if catchClause != nil {
			result = aggregateOwnedThrowStatements(catchClause, sourceFile)
		} else if tryBlock != nil {
			result = aggregateOwnedThrowStatements(tryBlock, sourceFile)
		}
		if finallyBlock != nil {
			result = append(result, aggregateOwnedThrowStatements(finallyBlock, sourceFile)...)
		}
		return result
	}
	// Do not cross function boundaries.
	if ast.IsFunctionLike(node) {
		return nil
	}
	return flatMapChildren(node, sourceFile, aggregateOwnedThrowStatements)
}

func flatMapChildren[T any](node *ast.Node, sourceFile *ast.SourceFile, cb func(child *ast.Node, sourceFile *ast.SourceFile) []T) []T {
	var result []T

	node.ForEachChild(func(child *ast.Node) bool {
		value := cb(child, sourceFile)
		if value != nil {
			result = append(result, value...)
		}
		return false // continue traversal
	})
	return result
}

func getThrowOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	owner := getThrowStatementOwner(node)
	if owner == nil {
		return nil
	}

	var keywords []*ast.Node

	// Aggregate all throw statements "owned" by this owner.
	throwStatements := aggregateOwnedThrowStatements(owner, sourceFile)
	for _, throw := range throwStatements {
		keyword := findChildOfKind(throw, ast.KindThrowKeyword, sourceFile)
		if keyword != nil {
			keywords = append(keywords, keyword)
		}
	}

	// If the "owner" is a function, then we equate 'return' and 'throw' statements in their
	// ability to "jump out" of the function, and include occurrences for both
	if ast.IsFunctionBlock(owner) {
		ast.ForEachReturnStatement(owner, func(ret *ast.Node) bool {
			keyword := findChildOfKind(ret, ast.KindReturnKeyword, sourceFile)
			if keyword != nil {
				keywords = append(keywords, keyword)
			}
			return false // continue traversal
		})
	}

	return keywords
}

// For lack of a better name, this function takes a throw statement and returns the
// nearest ancestor that is a try-block (whose try statement has a catch clause),
// function-block, or source file.
func getThrowStatementOwner(throwStatement *ast.Node) *ast.Node {
	child := throwStatement
	for child.Parent != nil {
		parent := child.Parent

		if ast.IsFunctionBlock(parent) || parent.Kind == ast.KindSourceFile {
			return parent
		}

		// A throw-statement is only owned by a try-statement if the try-statement has
		// a catch clause, and if the throw-statement occurs within the try block.
		if ast.IsTryStatement(parent) {
			tryStatement := parent.AsTryStatement()
			if tryStatement.TryBlock == child && tryStatement.CatchClause != nil {
				return child
			}
		}

		child = parent
	}
	return nil
}

func getTryCatchFinallyOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	tryStatement := node.AsTryStatement()

	var keywords []*ast.Node
	token := lsutil.GetFirstToken(node, sourceFile)
	if token.Kind == ast.KindTryKeyword {
		keywords = append(keywords, token)
	}

	if tryStatement.CatchClause != nil {
		catchToken := lsutil.GetFirstToken(tryStatement.CatchClause.AsNode(), sourceFile)
		if catchToken.Kind == ast.KindCatchKeyword {
			keywords = append(keywords, catchToken)
		}
	}

	if tryStatement.FinallyBlock != nil {
		finallyKeyword := findChildOfKind(node, ast.KindFinallyKeyword, sourceFile)
		if finallyKeyword.Kind == ast.KindFinallyKeyword {
			keywords = append(keywords, finallyKeyword)
		}
	}

	return keywords
}

func getSwitchCaseDefaultOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	switchStatement := node.AsSwitchStatement()

	var keywords []*ast.Node
	token := lsutil.GetFirstToken(node, sourceFile)
	if token.Kind == ast.KindSwitchKeyword {
		keywords = append(keywords, token)
	}

	clauses := switchStatement.CaseBlock.AsCaseBlock().Clauses
	for _, clause := range clauses.Nodes {
		clauseToken := lsutil.GetFirstToken(clause.AsNode(), sourceFile)
		if clauseToken.Kind == ast.KindCaseKeyword || clauseToken.Kind == ast.KindDefaultKeyword {
			keywords = append(keywords, clauseToken)
		}

		breakAndContinueStatements := aggregateAllBreakAndContinueStatements(clause, sourceFile)
		for _, statement := range breakAndContinueStatements {
			if statement.Kind == ast.KindBreakStatement && ownsBreakOrContinueStatement(switchStatement.AsNode(), statement) {
				keywords = append(keywords, lsutil.GetFirstToken(statement, sourceFile))
			}
		}
	}

	return keywords
}

func aggregateAllBreakAndContinueStatements(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	if ast.IsBreakOrContinueStatement(node) {
		return []*ast.Node{node}
	}
	if ast.IsFunctionLike(node) {
		return nil
	}
	return flatMapChildren(node, sourceFile, aggregateAllBreakAndContinueStatements)
}

func ownsBreakOrContinueStatement(owner *ast.Node, statement *ast.Node) bool {
	actualOwner := getBreakOrContinueOwner(statement)
	if actualOwner == nil {
		return false
	}
	return actualOwner == owner
}

func getBreakOrContinueOwner(statement *ast.Node) *ast.Node {
	return ast.FindAncestorOrQuit(statement, func(node *ast.Node) ast.FindAncestorResult {
		switch node.Kind {
		case ast.KindSwitchStatement:
			if statement.Kind == ast.KindContinueStatement {
				return ast.FindAncestorFalse
			}
			fallthrough
		case ast.KindForStatement,
			ast.KindForInStatement,
			ast.KindForOfStatement,
			ast.KindWhileStatement,
			ast.KindDoStatement:
			// If the statement is labeled, check if the node is labeled by the statement's label.
			if statement.Label() == nil || isLabeledBy(node, statement.Label().Text()) {
				return ast.FindAncestorTrue
			}
			return ast.FindAncestorFalse
		default:
			// Don't cross function boundaries.
			if ast.IsFunctionLike(node) {
				return ast.FindAncestorQuit
			}
			return ast.FindAncestorFalse
		}
	})
}

// Whether or not a 'node' is preceded by a label of the given string.
// Note: 'node' cannot be a SourceFile.
func isLabeledBy(node *ast.Node, labelName string) bool {
	return ast.FindAncestorOrQuit(node.Parent, func(owner *ast.Node) ast.FindAncestorResult {
		if !ast.IsLabeledStatement(owner) {
			return ast.FindAncestorQuit
		}
		if owner.Label().Text() == labelName {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	}) != nil
}

func getBreakOrContinueStatementOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	if owner := getBreakOrContinueOwner(node); owner != nil {
		switch owner.Kind {
		case ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindDoStatement, ast.KindWhileStatement:
			return getLoopBreakContinueOccurrences(owner, sourceFile)
		case ast.KindSwitchStatement:
			return getSwitchCaseDefaultOccurrences(owner, sourceFile)
		}
	}
	return nil
}

func getLoopBreakContinueOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	var keywords []*ast.Node

	token := lsutil.GetFirstToken(node, sourceFile)
	if token.Kind == ast.KindForKeyword || token.Kind == ast.KindDoKeyword || token.Kind == ast.KindWhileKeyword {
		keywords = append(keywords, token)
		if node.Kind == ast.KindDoStatement {
			loopTokens := getChildrenFromNonJSDocNode(node, sourceFile)
			for i := len(loopTokens) - 1; i >= 0; i-- {
				if loopTokens[i].Kind == ast.KindWhileKeyword {
					keywords = append(keywords, loopTokens[i])
					break
				}
			}
		}
	}

	breakAndContinueStatements := aggregateAllBreakAndContinueStatements(node, sourceFile)
	for _, statement := range breakAndContinueStatements {
		token := lsutil.GetFirstToken(statement, sourceFile)
		if ownsBreakOrContinueStatement(node, statement) && (token.Kind == ast.KindBreakKeyword || token.Kind == ast.KindContinueKeyword) {
			keywords = append(keywords, token)
		}
	}

	return keywords
}

func getAsyncAndAwaitOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	parent := ast.FindAncestor(node.Parent, ast.IsFunctionLike)
	if parent == nil {
		return nil
	}
	parentFunc := parent.AsFunctionDeclaration()
	var keywords []*ast.Node

	modifiers := parentFunc.Modifiers()
	if modifiers != nil {
		for _, modifier := range modifiers.Nodes {
			if modifier.Kind == ast.KindAsyncKeyword {
				keywords = append(keywords, modifier)
			}
		}
	}

	parentFunc.ForEachChild(func(child *ast.Node) bool {
		traverseWithoutCrossingFunction(child, sourceFile, func(child *ast.Node) {
			if ast.IsAwaitExpression(child) {
				token := lsutil.GetFirstToken(child, sourceFile)
				if token.Kind == ast.KindAwaitKeyword {
					keywords = append(keywords, token)
				}
			}
		})
		return false // continue traversal
	})

	return keywords
}

func getYieldOccurrences(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	parentFunc := ast.FindAncestor(node.Parent, ast.IsFunctionLike).AsFunctionDeclaration()
	if parentFunc == nil {
		return nil
	}

	var keywords []*ast.Node

	parentFunc.ForEachChild(func(child *ast.Node) bool {
		traverseWithoutCrossingFunction(child, sourceFile, func(child *ast.Node) {
			if ast.IsYieldExpression(child) {
				token := lsutil.GetFirstToken(child, sourceFile)
				if token.Kind == ast.KindYieldKeyword {
					keywords = append(keywords, token)
				}
			}
		})
		return false // continue traversal
	})

	return keywords
}

func traverseWithoutCrossingFunction(node *ast.Node, sourceFile *ast.SourceFile, cb func(*ast.Node)) {
	cb(node)
	if !ast.IsFunctionLike(node) && !ast.IsClassLike(node) && !ast.IsInterfaceDeclaration(node) && !ast.IsModuleDeclaration(node) && !ast.IsTypeAliasDeclaration(node) && !ast.IsTypeNode(node) {
		node.ForEachChild(func(child *ast.Node) bool {
			traverseWithoutCrossingFunction(child, sourceFile, cb)
			return false // continue traversal
		})
	}
}

func getModifierOccurrences(kind ast.Kind, node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	var result []*ast.Node

	nodesToSearch := getNodesToSearchForModifier(node, ast.ModifierToFlag(kind))
	for _, n := range nodesToSearch {
		modifier := findModifier(n, kind)
		if modifier != nil {
			result = append(result, modifier)
		}
	}
	return result
}

func getNodesToSearchForModifier(declaration *ast.Node, modifierFlag ast.ModifierFlags) []*ast.Node {
	var result []*ast.Node

	container := declaration.Parent
	if container == nil {
		return nil
	}

	// Types of node whose children might have modifiers.
	switch container.Kind {
	case ast.KindModuleBlock, ast.KindSourceFile, ast.KindBlock, ast.KindCaseClause, ast.KindDefaultClause:
		// Container is either a class declaration or the declaration is a classDeclaration
		if (modifierFlag&ast.ModifierFlagsAbstract) != 0 && ast.IsClassDeclaration(declaration) {
			return append(append(result, declaration.Members()...), declaration)
		} else {
			return append(result, container.Statements()...)
		}
	case ast.KindConstructor, ast.KindMethodDeclaration, ast.KindFunctionDeclaration:
		// Parameters and, if inside a class, also class members
		result = append(result, container.Parameters()...)
		if ast.IsClassLike(container.Parent) {
			result = append(result, container.Parent.Members()...)
		}
		return result
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindTypeLiteral:
		nodes := container.Members()
		result = append(result, nodes...)
		// If we're an accessibility modifier, we're in an instance member and should search
		// the constructor's parameter list for instance members as well.
		if (modifierFlag & (ast.ModifierFlagsAccessibilityModifier | ast.ModifierFlagsReadonly)) != 0 {
			var constructor *ast.Node

			for _, member := range nodes {
				if ast.IsConstructorDeclaration(member) {
					constructor = member
					break
				}
			}
			if constructor != nil {
				result = append(result, constructor.Parameters()...)
			}
		} else if (modifierFlag & ast.ModifierFlagsAbstract) != 0 {
			result = append(result, container)
		}
		return result
	default:
		// Syntactically invalid positions or unsupported containers
		return nil
	}
}

func findModifier(node *ast.Node, kind ast.Kind) *ast.Node {
	if modifiers := node.Modifiers(); modifiers != nil {
		for _, modifier := range modifiers.Nodes {
			if modifier.Kind == kind {
				return modifier
			}
		}
	}
	return nil
}
