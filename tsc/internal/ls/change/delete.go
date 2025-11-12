package change

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

// deleteDeclaration deletes a node with smart handling for different node types.
// This handles special cases like import specifiers in lists, parameters, etc.
func deleteDeclaration(t *Tracker, deletedNodesInLists map[*ast.Node]bool, sourceFile *ast.SourceFile, node *ast.Node) {
	switch node.Kind {
	case ast.KindParameter:
		oldFunction := node.Parent
		if oldFunction.Kind == ast.KindArrowFunction &&
			len(oldFunction.AsArrowFunction().Parameters.Nodes) == 1 &&
			astnav.FindChildOfKind(oldFunction, ast.KindOpenParenToken, sourceFile) == nil {
			// Lambdas with exactly one parameter are special because, after removal, there
			// must be an empty parameter list (i.e. `()`) and this won't necessarily be the
			// case if the parameter is simply removed (e.g. in `x => 1`).
			t.ReplaceRangeWithText(sourceFile, t.getAdjustedRange(sourceFile, node, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude), "()")
		} else {
			deleteNodeInList(t, deletedNodesInLists, sourceFile, node)
		}

	case ast.KindImportDeclaration, ast.KindImportEqualsDeclaration:
		imports := sourceFile.Imports()
		isFirstImport := len(imports) > 0 && node == imports[0].Parent ||
			node == core.Find(sourceFile.Statements.Nodes, func(s *ast.Node) bool { return ast.IsAnyImportSyntax(s) })
		// For first import, leave header comment in place, otherwise only delete JSDoc comments
		leadingTrivia := LeadingTriviaOptionStartLine
		if isFirstImport {
			leadingTrivia = LeadingTriviaOptionExclude
		} else if hasJSDocNodes(node) {
			leadingTrivia = LeadingTriviaOptionJSDoc
		}
		deleteNode(t, sourceFile, node, leadingTrivia, TrailingTriviaOptionInclude)

	case ast.KindBindingElement:
		pattern := node.Parent
		preserveComma := pattern.Kind == ast.KindArrayBindingPattern &&
			node != pattern.AsBindingPattern().Elements.Nodes[len(pattern.AsBindingPattern().Elements.Nodes)-1]
		if preserveComma {
			deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionExclude)
		} else {
			deleteNodeInList(t, deletedNodesInLists, sourceFile, node)
		}

	case ast.KindVariableDeclaration:
		deleteVariableDeclaration(t, deletedNodesInLists, sourceFile, node)

	case ast.KindTypeParameter:
		deleteNodeInList(t, deletedNodesInLists, sourceFile, node)

	case ast.KindImportSpecifier:
		namedImports := node.Parent
		if len(namedImports.AsNamedImports().Elements.Nodes) == 1 {
			deleteImportBinding(t, sourceFile, namedImports)
		} else {
			deleteNodeInList(t, deletedNodesInLists, sourceFile, node)
		}

	case ast.KindNamespaceImport:
		deleteImportBinding(t, sourceFile, node)

	case ast.KindSemicolonToken:
		deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionExclude)

	case ast.KindTypeKeyword:
		// For type keyword in import clauses, we need to delete the keyword and any trailing space
		// The trailing space is part of the next token's leading trivia, so we include it
		deleteNode(t, sourceFile, node, LeadingTriviaOptionExclude, TrailingTriviaOptionInclude)

	case ast.KindFunctionKeyword:
		deleteNode(t, sourceFile, node, LeadingTriviaOptionExclude, TrailingTriviaOptionInclude)

	case ast.KindClassDeclaration, ast.KindFunctionDeclaration:
		leadingTrivia := LeadingTriviaOptionStartLine
		if hasJSDocNodes(node) {
			leadingTrivia = LeadingTriviaOptionJSDoc
		}
		deleteNode(t, sourceFile, node, leadingTrivia, TrailingTriviaOptionInclude)

	default:
		if node.Parent == nil {
			// a misbehaving client can reach here with the SourceFile node
			deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
		} else if node.Parent.Kind == ast.KindImportClause && node.Parent.AsImportClause().Name() == node {
			deleteDefaultImport(t, sourceFile, node.Parent)
		} else if node.Parent.Kind == ast.KindCallExpression && slices.Contains(node.Parent.AsCallExpression().Arguments.Nodes, node) {
			deleteNodeInList(t, deletedNodesInLists, sourceFile, node)
		} else {
			deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
		}
	}
}

func deleteDefaultImport(t *Tracker, sourceFile *ast.SourceFile, importClause *ast.Node) {
	clause := importClause.AsImportClause()
	if clause.NamedBindings == nil {
		// Delete the whole import
		deleteNode(t, sourceFile, importClause.Parent, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
	} else {
		// import |d,| * as ns from './file'
		name := clause.Name()
		start := astnav.GetStartOfNode(name, sourceFile, false)
		nextToken := astnav.GetTokenAtPosition(sourceFile, name.End())
		if nextToken != nil && nextToken.Kind == ast.KindCommaToken {
			// shift first non-whitespace position after comma to the start position of the node
			end := scanner.SkipTriviaEx(sourceFile.Text(), nextToken.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: false, StopAtComments: true})
			startPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(start))
			endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(end))
			t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startPos, End: endPos}, "")
		} else {
			deleteNode(t, sourceFile, name, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
		}
	}
}

func deleteImportBinding(t *Tracker, sourceFile *ast.SourceFile, node *ast.Node) {
	importClause := node.Parent.AsImportClause()
	if importClause.Name() != nil {
		// Delete named imports while preserving the default import
		// import d|, * as ns| from './file'
		// import d|, { a }| from './file'
		previousToken := astnav.GetTokenAtPosition(sourceFile, node.Pos()-1)
		debug.Assert(previousToken != nil, "previousToken should not be nil")
		startPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(astnav.GetStartOfNode(previousToken, sourceFile, false)))
		endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(node.End()))
		t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startPos, End: endPos}, "")
	} else {
		// Delete the entire import declaration
		// |import * as ns from './file'|
		// |import { a } from './file'|
		importDecl := ast.FindAncestorKind(node, ast.KindImportDeclaration)
		debug.Assert(importDecl != nil, "importDecl should not be nil")
		deleteNode(t, sourceFile, importDecl, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
	}
}

func deleteVariableDeclaration(t *Tracker, deletedNodesInLists map[*ast.Node]bool, sourceFile *ast.SourceFile, node *ast.Node) {
	parent := node.Parent

	if parent.Kind == ast.KindCatchClause {
		// TODO: There's currently no unused diagnostic for this, could be a suggestion
		openParen := astnav.FindChildOfKind(parent, ast.KindOpenParenToken, sourceFile)
		closeParen := astnav.FindChildOfKind(parent, ast.KindCloseParenToken, sourceFile)
		debug.Assert(openParen != nil && closeParen != nil, "catch clause should have parens")
		t.DeleteNodeRange(sourceFile, openParen, closeParen, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
		return
	}

	if len(parent.AsVariableDeclarationList().Declarations.Nodes) != 1 {
		deleteNodeInList(t, deletedNodesInLists, sourceFile, node)
		return
	}

	gp := parent.Parent
	switch gp.Kind {
	case ast.KindForOfStatement, ast.KindForInStatement:
		t.ReplaceNode(sourceFile, node, t.NodeFactory.NewObjectLiteralExpression(t.NodeFactory.NewNodeList([]*ast.Node{}), false), nil)

	case ast.KindForStatement:
		deleteNode(t, sourceFile, parent, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)

	case ast.KindVariableStatement:
		leadingTrivia := LeadingTriviaOptionStartLine
		if hasJSDocNodes(gp) {
			leadingTrivia = LeadingTriviaOptionJSDoc
		}
		deleteNode(t, sourceFile, gp, leadingTrivia, TrailingTriviaOptionInclude)

	default:
		debug.Fail("Unexpected grandparent kind: " + gp.Kind.String())
	}
}

// deleteNode deletes a node with the specified trivia options.
// Warning: This deletes comments too.
func deleteNode(t *Tracker, sourceFile *ast.SourceFile, node *ast.Node, leadingTrivia LeadingTriviaOption, trailingTrivia TrailingTriviaOption) {
	startPosition := t.getAdjustedStartPosition(sourceFile, node, leadingTrivia, false)
	endPosition := t.getAdjustedEndPosition(sourceFile, node, trailingTrivia)
	startPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(startPosition))
	endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(endPosition))
	t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startPos, End: endPos}, "")
}

func deleteNodeInList(t *Tracker, deletedNodesInLists map[*ast.Node]bool, sourceFile *ast.SourceFile, node *ast.Node) {
	containingList := format.GetContainingList(node, sourceFile)
	debug.Assert(containingList != nil, "containingList should not be nil")
	index := slices.Index(containingList.Nodes, node)
	debug.Assert(index != -1, "node should be in containing list")

	if len(containingList.Nodes) == 1 {
		deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll, TrailingTriviaOptionInclude)
		return
	}

	// Note: We will only delete a comma *after* a node. This will leave a trailing comma if we delete the last node.
	// That's handled in the end by finishTrailingCommaAfterDeletingNodesInList.
	debug.Assert(!deletedNodesInLists[node], "Deleting a node twice")
	deletedNodesInLists[node] = true

	startPos := t.startPositionToDeleteNodeInList(sourceFile, node)
	var endPos int
	if index == len(containingList.Nodes)-1 {
		endPos = t.getAdjustedEndPosition(sourceFile, node, TrailingTriviaOptionInclude)
	} else {
		prevNode := (*ast.Node)(nil)
		if index > 0 {
			prevNode = containingList.Nodes[index-1]
		}
		endPos = t.endPositionToDeleteNodeInList(sourceFile, node, prevNode, containingList.Nodes[index+1])
	}

	startLSPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(startPos))
	endLSPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(endPos))
	t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startLSPos, End: endLSPos}, "")
}

// startPositionToDeleteNodeInList finds the first non-whitespace position in the leading trivia of the node
func (t *Tracker) startPositionToDeleteNodeInList(sourceFile *ast.SourceFile, node *ast.Node) int {
	start := t.getAdjustedStartPosition(sourceFile, node, LeadingTriviaOptionIncludeAll, false)
	return scanner.SkipTriviaEx(sourceFile.Text(), start, &scanner.SkipTriviaOptions{StopAfterLineBreak: false, StopAtComments: true})
}

func (t *Tracker) endPositionToDeleteNodeInList(sourceFile *ast.SourceFile, node *ast.Node, prevNode *ast.Node, nextNode *ast.Node) int {
	end := t.startPositionToDeleteNodeInList(sourceFile, nextNode)
	if prevNode == nil || positionsAreOnSameLine(t.getAdjustedEndPosition(sourceFile, node, TrailingTriviaOptionInclude), end, sourceFile) {
		return end
	}
	token := astnav.FindPrecedingToken(sourceFile, astnav.GetStartOfNode(nextNode, sourceFile, false))
	if isSeparator(node, token) {
		prevToken := astnav.FindPrecedingToken(sourceFile, astnav.GetStartOfNode(node, sourceFile, false))
		if isSeparator(prevNode, prevToken) {
			pos := scanner.SkipTriviaEx(sourceFile.Text(), token.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true, StopAtComments: true})
			if positionsAreOnSameLine(astnav.GetStartOfNode(prevToken, sourceFile, false), astnav.GetStartOfNode(token, sourceFile, false), sourceFile) {
				if pos > 0 && stringutil.IsLineBreak(rune(sourceFile.Text()[pos-1])) {
					return pos - 1
				}
				return pos
			}
			if stringutil.IsLineBreak(rune(sourceFile.Text()[pos])) {
				return pos
			}
		}
	}
	return end
}

func positionsAreOnSameLine(pos1, pos2 int, sourceFile *ast.SourceFile) bool {
	return format.GetLineStartPositionForPosition(pos1, sourceFile) == format.GetLineStartPositionForPosition(pos2, sourceFile)
}

// hasJSDocNodes checks if a node has JSDoc comments
func hasJSDocNodes(node *ast.Node) bool {
	if node == nil {
		return false
	}
	// nil is ok for JSDoc - it will return empty slice if not available
	jsdocs := node.JSDoc(nil)
	return len(jsdocs) > 0
}
