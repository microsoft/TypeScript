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

const (
	comparisonLessThan    = -1
	comparisonEqualTo     = 0
	comparisonGreaterThan = 1
)

// Finds the leftmost token satisfying `position < token.End()`.
// If the leftmost token satisfying `position < token.End()` is invalid, or if position
// is in the trivia of that leftmost token,
// we will find the rightmost valid token with `token.End() <= position`.
func FindPrecedingToken(sourceFile *ast.SourceFile, position int) *ast.Node {
	return FindPrecedingTokenEx(sourceFile, position, nil, false)
}

func FindPrecedingTokenEx(sourceFile *ast.SourceFile, position int, startNode *ast.Node, excludeJSDoc bool) *ast.Node {
	var find func(node *ast.Node) *ast.Node
	find = func(n *ast.Node) *ast.Node {
		if ast.IsNonWhitespaceToken(n) {
			return n
		}

		// `foundChild` is the leftmost node that contains the target position.
		// `prevChild` is the last visited child of the current node.
		var foundChild, prevChild *ast.Node
		visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
			// skip synthesized nodes (that will exist now because of jsdoc handling)
			if node == nil || node.Flags&ast.NodeFlagsReparsed != 0 {
				return node
			}
			if foundChild != nil { // We cannot abort visiting children, so once the desired child is found, we do nothing.
				return node
			}
			if position < node.End() && (prevChild == nil || prevChild.End() <= position) {
				foundChild = node
			} else {
				prevChild = node
			}
			return node
		}
		visitNodes := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
			if foundChild != nil {
				return nodeList
			}
			if nodeList != nil && len(nodeList.Nodes) > 0 {
				nodes := nodeList.Nodes
				if isJSDocSingleCommentNodeList(n, nodeList) {
					return nodeList
				}
				index, match := core.BinarySearchUniqueFunc(nodes, func(middle int, _ *ast.Node) int {
					// synthetic jsdoc nodes should have jsdocNode.End() <= n.Pos()
					if nodes[middle].Flags&ast.NodeFlagsReparsed != 0 {
						return comparisonLessThan
					}
					if position < nodes[middle].End() {
						if middle == 0 || position >= nodes[middle-1].End() {
							return comparisonEqualTo
						}
						return comparisonGreaterThan
					}
					return comparisonLessThan
				})

				if match {
					foundChild = nodes[index]
				}

				validLookupIndex := core.IfElse(match, index-1, len(nodes)-1)
				for i := validLookupIndex; i >= 0; i-- {
					if nodes[i].Flags&ast.NodeFlagsReparsed != 0 {
						continue
					}
					if prevChild == nil {
						prevChild = nodes[i]
					}
				}
			}
			return nodeList
		}
		nodeVisitor := ast.NewNodeVisitor(core.Identity, nil, ast.NodeVisitorHooks{
			VisitNode:  visitNode,
			VisitToken: visitNode,
			VisitNodes: visitNodes,
			VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
				if modifiers != nil {
					visitNodes(&modifiers.NodeList, visitor)
				}
				return modifiers
			},
		})
		visitEachChildAndJSDoc(n, sourceFile, nodeVisitor)

		if foundChild != nil {
			// Note that the span of a node's tokens is [getStartOfNode(node, ...), node.end).
			// Given that `position < child.end` and child has constituent tokens, we distinguish these cases:
			// 1) `position` precedes `child`'s tokens or `child` has no tokens (ie: in a comment or whitespace preceding `child`):
			// we need to find the last token in a previous child node or child tokens.
			// 2) `position` is within the same span: we recurse on `child`.
			start := getStartOfNode(foundChild, sourceFile, !excludeJSDoc /*includeJSDoc*/)
			lookInPreviousChild := start >= position || // cursor in the leading trivia or preceding tokens
				!isValidPrecedingNode(foundChild, sourceFile)
			if lookInPreviousChild {
				if position >= foundChild.Pos() {
					// Find jsdoc preceding the foundChild.
					var jsDoc *ast.Node
					nodeJSDoc := n.JSDoc(sourceFile)
					for i := len(nodeJSDoc) - 1; i >= 0; i-- {
						if nodeJSDoc[i].Pos() >= foundChild.Pos() {
							jsDoc = nodeJSDoc[i]
							break
						}
					}
					if jsDoc != nil {
						if !excludeJSDoc {
							return find(jsDoc)
						} else {
							return findRightmostValidToken(jsDoc.End(), sourceFile, n, position, excludeJSDoc)
						}
					}
					return findRightmostValidToken(foundChild.Pos(), sourceFile, n, -1 /*position*/, excludeJSDoc)
				} else { // Answer is in tokens between two visited children.
					return findRightmostValidToken(foundChild.Pos(), sourceFile, n, position, excludeJSDoc)
				}
			} else {
				// position is in [foundChild.getStart(), foundChild.End): recur.
				return find(foundChild)
			}
		}

		// We have two cases here: either the position is at the end of the file,
		// or the desired token is in the unvisited trailing tokens of the current node.
		if position >= n.End() {
			return findRightmostValidToken(n.End(), sourceFile, n, -1 /*position*/, excludeJSDoc)
		} else {
			return findRightmostValidToken(n.End(), sourceFile, n, position, excludeJSDoc)
		}
	}

	var node *ast.Node
	if startNode != nil {
		node = startNode
	} else {
		node = sourceFile.AsNode()
	}
	result := find(node)
	if result != nil && ast.IsWhitespaceOnlyJsxText(result) {
		panic("Expected result to be a non-whitespace token.")
	}
	return result
}

func isValidPrecedingNode(node *ast.Node, sourceFile *ast.SourceFile) bool {
	start := getStartOfNode(node, sourceFile, false /*includeJSDoc*/)
	width := node.End() - start
	return !(ast.IsWhitespaceOnlyJsxText(node) || width == 0)
}

func getStartOfNode(node *ast.Node, file *ast.SourceFile, includeJSDoc bool) int {
	return scanner.GetTokenPosOfNode(node, file, includeJSDoc)
}

// If this is a single comment JSDoc, we do not visit the comment node.
func isJSDocSingleCommentNodeList(parent *ast.Node, nodeList *ast.NodeList) bool {
	return parent.Kind == ast.KindJSDoc && nodeList == parent.AsJSDoc().Comment && nodeList != nil && len(nodeList.Nodes) == 1
}

// Looks for rightmost valid token in the range [startPos, endPos).
// If position is >= 0, looks for rightmost valid token that precedes or touches that position.
func findRightmostValidToken(endPos int, sourceFile *ast.SourceFile, containingNode *ast.Node, position int, excludeJSDoc bool) *ast.Node {
	if position == -1 {
		position = containingNode.End()
	}
	var find func(n *ast.Node) *ast.Node
	find = func(n *ast.Node) *ast.Node {
		if n == nil {
			return nil
		}
		if ast.IsNonWhitespaceToken(n) {
			return n
		}

		var rightmostValidNode *ast.Node
		var rightmostVisitedNode *ast.Node
		hasChildren := false
		test := func(node *ast.Node) bool {
			if node.Flags&ast.NodeFlagsReparsed != 0 ||
				node.End() > endPos || getStartOfNode(node, sourceFile, !excludeJSDoc /*includeJSDoc*/) >= position {
				return false
			}
			rightmostVisitedNode = node
			if isValidPrecedingNode(node, sourceFile) {
				rightmostValidNode = node
				return true
			}
			return false
		}
		visitNode := func(node *ast.Node, _ *ast.NodeVisitor) *ast.Node {
			if node == nil {
				return node
			}
			hasChildren = true
			test(node)
			return node
		}
		visitNodes := func(nodeList *ast.NodeList, _ *ast.NodeVisitor) *ast.NodeList {
			if nodeList != nil && len(nodeList.Nodes) > 0 {
				if isJSDocSingleCommentNodeList(n, nodeList) {
					return nodeList
				}
				hasChildren = true
				index, _ := core.BinarySearchUniqueFunc(nodeList.Nodes, func(middle int, node *ast.Node) int {
					if node.End() > endPos {
						return comparisonGreaterThan
					}
					return comparisonLessThan
				})
				for i := index - 1; i >= 0; i-- {
					if test(nodeList.Nodes[i]) {
						break
					}
				}
			}
			return nodeList
		}
		nodeVisitor := ast.NewNodeVisitor(core.Identity, nil, ast.NodeVisitorHooks{
			VisitNode:  visitNode,
			VisitToken: visitNode,
			VisitNodes: visitNodes,
			VisitModifiers: func(modifiers *ast.ModifierList, visitor *ast.NodeVisitor) *ast.ModifierList {
				if modifiers != nil {
					visitNodes(&modifiers.NodeList, visitor)
				}
				return modifiers
			},
		})
		visitEachChildAndJSDoc(n, sourceFile, nodeVisitor)

		// Three cases:
		// 1. The answer is a token of `rightmostValidNode`.
		// 2. The answer is one of the unvisited tokens that occur after the last visited node.
		// 3. The current node is a childless, token-less node. The answer is the current node.

		// Case 2: Look at trailing tokens.
		if !ast.IsJSDocCommentContainingNode(n) { // JSDoc nodes don't include trivia tokens as children.
			var startPos int
			if rightmostVisitedNode != nil {
				startPos = rightmostVisitedNode.End()
			} else {
				startPos = n.Pos()
			}
			scanner := scanner.GetScannerForSourceFile(sourceFile, startPos)
			var tokens []*ast.Node
			for startPos < min(endPos, position) {
				tokenStart := scanner.TokenStart()
				if tokenStart >= position {
					break
				}
				token := scanner.Token()
				tokenFullStart := scanner.TokenFullStart()
				tokenEnd := scanner.TokenEnd()
				startPos = tokenEnd
				tokens = append(tokens, sourceFile.GetOrCreateToken(token, tokenFullStart, tokenEnd, n))
				scanner.Scan()
			}
			lastToken := len(tokens) - 1
			// Find preceding valid token.
			for i := lastToken; i >= 0; i-- {
				if !ast.IsWhitespaceOnlyJsxText(tokens[i]) {
					return tokens[i]
				}
			}
		}

		// Case 3: childless node.
		if !hasChildren {
			return n
		}
		// Case 1: recur on rightmostValidNode.
		return find(rightmostValidNode)
	}

	return find(containingNode)
}
