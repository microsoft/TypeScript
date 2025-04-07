package astnav

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func GetTouchingPropertyName(sourceFile *ast.SourceFile, position int) *ast.Node {
	return getTokenAtPosition(sourceFile, position, false /*allowPositionInLeadingTrivia*/, func(node *ast.Node) bool {
		return ast.IsPropertyNameLiteral(node) || ast.IsKeywordKind(node.Kind) || ast.IsPrivateIdentifier(node)
	})
}

func GetTokenAtPosition(sourceFile *ast.SourceFile, position int) *ast.Node {
	return getTokenAtPosition(sourceFile, position, true /*allowPositionInLeadingTrivia*/, nil)
}

func getTokenAtPosition(
	sourceFile *ast.SourceFile,
	position int,
	allowPositionInLeadingTrivia bool,
	includePrecedingTokenAtEndPosition func(node *ast.Node) bool,
) *ast.Node {
	// getTokenAtPosition returns a token at the given position in the source file.
	// The token can be a real node in the AST, or a synthesized token constructed
	// with information from the scanner. Synthesized tokens are only created when
	// needed, and they are stored in the source file's token cache such that multiple
	// calls to getTokenAtPosition with the same position will return the same object
	// in memory. If there is no token at the given position (possible when
	// `allowPositionInLeadingTrivia` is false), the lowest node that encloses the
	// position is returned.

	// `next` tracks the node whose children will be visited on the next iteration.
	// `prevSubtree` is a node whose end position is equal to the target position,
	// only if `includePrecedingTokenAtEndPosition` is provided. Once set, the next
	// iteration of the loop will test the rightmost token of `prevSubtree` to see
	// if it should be returned.
	var next, prevSubtree *ast.Node
	current := sourceFile.AsNode()
	// `left` tracks the lower boundary of the node/token that could be returned,
	// and is eventually the scanner's start position, if the scanner is used.
	left := 0

	testNode := func(node *ast.Node) int {
		if node.End() == position && includePrecedingTokenAtEndPosition != nil {
			prevSubtree = node
		}

		if node.End() <= position {
			return -1
		}
		if getPosition(node, sourceFile, allowPositionInLeadingTrivia) > position {
			return 1
		}
		return 0
	}

	// We zero in on the node that contains the target position by visiting each
	// child and JSDoc comment of the current node. Node children are walked in
	// order, while node lists are binary searched.
	visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
		// We can't abort visiting children, so once a match is found, we set `next`
		// and do nothing on subsequent visits.
		if node != nil && node.Flags&ast.NodeFlagsReparsed == 0 && next == nil {
			switch testNode(node) {
			case -1:
				if !ast.IsJSDocKind(node.Kind) {
					// We can't move the left boundary into or beyond JSDoc,
					// because we may end up returning the token after this JSDoc,
					// constructing it with the scanner, and we need to include
					// all its leading trivia in its position.
					left = node.End()
				}
			case 0:
				next = node
			}
		}
		return node
	}

	visitNodeList := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
		if nodeList != nil && len(nodeList.Nodes) > 0 && next == nil {
			if nodeList.End() == position && includePrecedingTokenAtEndPosition != nil {
				left = nodeList.End()
				prevSubtree = nodeList.Nodes[len(nodeList.Nodes)-1]
			} else if nodeList.End() <= position {
				left = nodeList.End()
			} else if nodeList.Pos() <= position {
				nodes := nodeList.Nodes
				index, match := core.BinarySearchUniqueFunc(nodes, func(middle int, node *ast.Node) int {
					if node.Flags&ast.NodeFlagsReparsed != 0 {
						return 0
					}
					cmp := testNode(node)
					if cmp < 0 {
						left = node.End()
					}
					return cmp
				})
				if match && nodes[index].Flags&ast.NodeFlagsReparsed != 0 {
					// filter and search again
					nodes = core.Filter(nodes, func(node *ast.Node) bool {
						return node.Flags&ast.NodeFlagsReparsed == 0
					})
					index, match = core.BinarySearchUniqueFunc(nodes, func(middle int, node *ast.Node) int {
						cmp := testNode(node)
						if cmp < 0 {
							left = node.End()
						}
						return cmp
					})
				}
				if match {
					next = nodes[index]
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

	for {
		visitEachChildAndJSDoc(current, sourceFile, nodeVisitor)
		// If prevSubtree was set on the last iteration, it ends at the target position.
		// Check if the rightmost token of prevSubtree should be returned based on the
		// `includePrecedingTokenAtEndPosition` callback.
		if prevSubtree != nil {
			child := findRightmostNode(prevSubtree)
			if child.End() == position && includePrecedingTokenAtEndPosition(child) {
				// Optimization: includePrecedingTokenAtEndPosition only ever returns true
				// for real AST nodes, so we don't run the scanner here.
				return child
			}
			prevSubtree = nil
		}

		// No node was found that contains the target position, so we've gone as deep as
		// we can in the AST. We've either found a token, or we need to run the scanner
		// to construct one that isn't stored in the AST.
		if next == nil {
			if ast.IsTokenKind(current.Kind) || ast.IsJSDocCommentContainingNode(current) {
				return current
			}
			scanner := scanner.GetScannerForSourceFile(sourceFile, left)
			for left < current.End() {
				token := scanner.Token()
				tokenFullStart := scanner.TokenFullStart()
				tokenStart := core.IfElse(allowPositionInLeadingTrivia, tokenFullStart, scanner.TokenStart())
				tokenEnd := scanner.TokenEnd()
				if tokenStart <= position && (position < tokenEnd) {
					if token == ast.KindIdentifier || !ast.IsTokenKind(token) {
						if ast.IsJSDocKind(current.Kind) {
							return current
						}
						panic(fmt.Sprintf("did not expect %s to have %s in its trivia", current.Kind.String(), token.String()))
					}
					return sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, current)
				}
				if includePrecedingTokenAtEndPosition != nil && tokenEnd == position {
					prevToken := sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, current)
					if includePrecedingTokenAtEndPosition(prevToken) {
						return prevToken
					}
				}
				left = tokenEnd
				scanner.Scan()
			}
			return current
		}
		current = next
		left = current.Pos()
		next = nil
	}
}

func getPosition(node *ast.Node, sourceFile *ast.SourceFile, allowPositionInLeadingTrivia bool) int {
	if allowPositionInLeadingTrivia {
		return node.Pos()
	}
	return scanner.GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc*/)
}

func findRightmostNode(node *ast.Node) *ast.Node {
	var next *ast.Node
	current := node
	visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
		if node != nil {
			next = node
		}
		return node
	}
	visitor := ast.NewNodeVisitor(core.Identity, nil, ast.NodeVisitorHooks{
		VisitNode:  visitNode,
		VisitToken: visitNode,
		VisitNodes: func(nodeList *ast.NodeList, visitor *ast.NodeVisitor) *ast.NodeList {
			if nodeList != nil {
				if rightmost := ast.FindLastVisibleNode(nodeList.Nodes); rightmost != nil {
					next = rightmost
				}
			}
			return nodeList
		},
		VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
			if modifiers != nil {
				if rightmost := ast.FindLastVisibleNode(modifiers.Nodes); rightmost != nil {
					next = rightmost
				}
			}
			return modifiers
		},
	})

	for {
		current.VisitEachChild(visitor)
		if next == nil {
			return current
		}
		current = next
		next = nil
	}
}

func visitEachChildAndJSDoc(node *ast.Node, sourceFile *ast.SourceFile, visitor *ast.NodeVisitor) {
	if node.Flags&ast.NodeFlagsHasJSDoc != 0 {
		for _, jsdoc := range node.JSDoc(sourceFile) {
			if visitor.Hooks.VisitNode != nil {
				visitor.Hooks.VisitNode(jsdoc, visitor)
			} else {
				visitor.VisitNode(jsdoc)
			}
		}
	}
	node.VisitEachChild(visitor)
}
