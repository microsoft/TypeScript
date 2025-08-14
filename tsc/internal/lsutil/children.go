package lsutil

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

// Replaces last(node.getChildren(sourceFile))
func GetLastChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	lastChildNode := GetLastVisitedChild(node, sourceFile)
	if ast.IsJSDocSingleCommentNode(node) && lastChildNode == nil {
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

func GetLastToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if node == nil {
		return nil
	}

	if ast.IsTokenKind(node.Kind) || ast.IsIdentifier(node) {
		return nil
	}

	AssertHasRealPosition(node)

	lastChild := GetLastChild(node, sourceFile)
	if lastChild == nil {
		return nil
	}

	if lastChild.Kind < ast.KindFirstNode {
		return lastChild
	} else {
		return GetLastToken(lastChild, sourceFile)
	}
}

// Gets the last visited child of the given node.
// NOTE: This doesn't include unvisited tokens; for this, use `getLastChild` or `getLastToken`.
func GetLastVisitedChild(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	var lastChild *ast.Node

	visitNode := func(n *ast.Node, _ *ast.NodeVisitor) *ast.Node {
		if !(n == nil || node.Flags&ast.NodeFlagsReparsed != 0) {
			lastChild = n
		}
		return n
	}
	visitNodeList := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
		if nodeList != nil && len(nodeList.Nodes) > 0 {
			for i := len(nodeList.Nodes) - 1; i >= 0; i-- {
				if nodeList.Nodes[i].Flags&ast.NodeFlagsReparsed == 0 {
					lastChild = nodeList.Nodes[i]
					break
				}
			}
		}
		return nodeList
	}

	astnav.VisitEachChildAndJSDoc(node, sourceFile, visitNode, visitNodeList)
	return lastChild
}

func GetFirstToken(node *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if ast.IsIdentifier(node) || ast.IsTokenKind(node.Kind) {
		return nil
	}
	AssertHasRealPosition(node)
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
	return GetFirstToken(firstChild, sourceFile)
}

func AssertHasRealPosition(node *ast.Node) {
	if ast.PositionIsSynthesized(node.Pos()) || ast.PositionIsSynthesized(node.End()) {
		panic("Node must have a real position for this operation.")
	}
}
