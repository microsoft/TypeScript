package ls

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func getTouchingPropertyName(sourceFile *ast.SourceFile, position int) *ast.Node {
	return getTokenAtPosition(sourceFile, position, false, false, func(node *ast.Node) bool {
		return ast.IsPropertyNameLiteral(node) || ast.IsKeywordKind(node.Kind) || ast.IsPrivateIdentifier(node)
	})
}

func getTokenAtPosition(
	sourceFile *ast.SourceFile,
	position int,
	allowPositionInLeadingTrivia bool,
	includeEndPosition bool,
	includePrecedingTokenAtEndPosition func(node *ast.Node) bool,
) *ast.Node {
	var foundToken *ast.Node
	current := sourceFile.AsNode()

	for {
		children := getNodeChildren(current, sourceFile)
		index, match := slices.BinarySearchFunc(children, position, func(node *ast.Node, _ int) int {
			// This last callback is more of a selector than a comparator -
			// `0` causes the `node` result to be returned
			// `1` causes recursion on the left of the middle
			// `-1` causes recursion on the right of the middle

			// Let's say you have 3 nodes, spanning positons
			// pos: 1, end: 3
			// pos: 3, end: 3
			// pos: 3, end: 5
			// and you're looking for the token at positon 3 - all 3 of these nodes are overlapping with position 3.
			// In fact, there's a _good argument_ that node 2 shouldn't even be allowed to exist - depending on if
			// the start or end of the ranges are considered inclusive, it's either wholly subsumed by the first or the last node.
			// Unfortunately, such nodes do exist. :( - See fourslash/completionsImport_tsx.tsx - empty jsx attributes create
			// a zero-length node.
			// What also you may not expect is that which node we return depends on the includePrecedingTokenAtEndPosition flag.
			// Specifically, if includePrecedingTokenAtEndPosition is set, we return the 1-3 node, while if it's unset, we
			// return the 3-5 node. (The zero length node is never correct.) This is because the includePrecedingTokenAtEndPosition
			// flag causes us to return the first node whose end position matches the position and which produces and acceptable token
			// kind. Meanwhile, if includePrecedingTokenAtEndPosition is unset, we look for the first node whose start is <= the
			// position and whose end is greater than the position.

			// There are more sophisticated end tests later, but this one is very fast
			// and allows us to skip a bunch of work
			if node.End() < position {
				return -1
			}

			middle := slices.Index(children, node)
			start := node.Pos()
			if !allowPositionInLeadingTrivia {
				start = scanner.GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc*/)
			}

			if start > position {
				return 1
			}

			// first element whose start position is before the input and whose end position is after or equal to the input
			var result bool
			if result, foundToken = nodeContainsPosition(node, start, position, sourceFile, includeEndPosition, includePrecedingTokenAtEndPosition); result {
				if middle > 0 {
					// we want the _first_ element that contains the position, so left-recur if the prior node also contains the position
					prevNode := children[middle-1]
					prevNodeStart := prevNode.Pos()
					if !allowPositionInLeadingTrivia {
						prevNodeStart = scanner.GetTokenPosOfNode(prevNode, sourceFile, true /*includeJSDoc*/)
					}
					if result, foundToken = nodeContainsPosition(prevNode, prevNodeStart, position, sourceFile, includeEndPosition, includePrecedingTokenAtEndPosition); result {
						return 1
					}
				}
				return 0
			}

			// this complex condition makes us left-recur around a zero-length node when includePrecedingTokenAtEndPosition is set, rather than right-recur on it
			if includePrecedingTokenAtEndPosition != nil && start == position && middle > 0 && children[middle-1].End() == position {
				prevNode := children[middle-1]
				prevNodeStart := prevNode.Pos()
				if !allowPositionInLeadingTrivia {
					prevNodeStart = scanner.GetTokenPosOfNode(prevNode, sourceFile, true /*includeJSDoc*/)
				}
				if result, foundToken = nodeContainsPosition(prevNode, prevNodeStart, position, sourceFile, includeEndPosition, includePrecedingTokenAtEndPosition); result {
					return 1
				}
			}
			return -1
		})

		if foundToken != nil {
			return foundToken
		}
		if match {
			current = children[index]
			continue
		}
		return current
	}
}

func nodeContainsPosition(node *ast.Node, nodeStart int, position int, sourceFile *ast.SourceFile, includeEndPosition bool, includePrecedingTokenAtEndPosition func(node *ast.Node) bool) (result bool, foundToken *ast.Node) {
	if nodeStart > position {
		// If this child begins after position, then all subsequent children will as well.
		return false, nil
	}
	if position < node.End() || position == node.End() && includeEndPosition {
		return true, nil
	}
	if includePrecedingTokenAtEndPosition != nil && position == node.End() {
		previousToken := findPrecedingToken(position, sourceFile, node, false /*excludeJsDoc*/)
		if previousToken != nil && includePrecedingTokenAtEndPosition(previousToken) {
			return true, previousToken
		}
	}
	return false, nil
}

func findPrecedingToken(position int, sourceFile *ast.SourceFile, startNode *ast.Node, excludeJsDoc bool) *ast.Node {
	node := startNode
	if node == nil {
		node = sourceFile.AsNode()
	}

	if ast.IsNonWhitespaceToken(node) {
		return node
	}

	children := getNodeChildren(node, sourceFile)
	index, match := slices.BinarySearchFunc(children, position, func(middle *ast.Node, _ int) int {
		// This last callback is more of a selector than a comparator -
		// `0` causes the `middle` result to be returned
		// `1` causes recursion on the left of the middle
		// `-1` causes recursion on the right of the middle
		index := slices.Index(children, middle)
		if position < middle.End() {
			// first element whose end position is greater than the input position
			if index == 0 || position >= children[index-1].End() {
				return 0
			}
			return 1
		}
		return -1
	})

	if match {
		child := children[index]
		// Note that the span of a node's tokens is [scanner.GetTokenPosOfNode(node), node.End()).
		// Given that `position < child.End()` and child has constituent tokens, we distinguish these cases:
		// 1) `position` precedes `child`'s tokens or `child` has no tokens (i.e., in a comment or whitespace preceding `child`):
		// we need to find the last token in a previous child.
		// 2) `position` is within the same span: we recurse on `child`.
		if position < child.End() {
			start := scanner.GetTokenPosOfNode(child, sourceFile, !excludeJsDoc)
			lookInPreviousChild := start >= position || // cursor in the leading trivia
				!nodeHasTokens(child, sourceFile) ||
				ast.IsWhitespaceOnlyJsxText(child)
			if lookInPreviousChild {
				// actual start of the node is past the position - previous token should be at the end of previous child
				candidate := findRightmostChildNodeWithTokens(children, index, sourceFile, node.Kind)
				if candidate != nil {
					// Ensure we recurse into JSDoc nodes with children.
					if !excludeJsDoc && ast.IsJSDocCommentContainingNode(candidate) && len(getNodeChildren(candidate, sourceFile)) > 0 {
						return findPrecedingToken(position, sourceFile, candidate, excludeJsDoc)
					}
					return findRightmostToken(candidate, sourceFile)
				}
				return nil
			} else {
				// candidate should be in this node
				return findPrecedingToken(position, sourceFile, child, excludeJsDoc)
			}
		}
	}

	// Here we know that none of child token nodes embrace the position,
	// the only known case is when position is at the end of the file.
	// Try to find the rightmost token in the file without filtering.
	// Namely we are skipping the check: 'position < node.End()'
	if candidate := findRightmostChildNodeWithTokens(children, len(children), sourceFile, node.Kind); candidate != nil {
		return findRightmostToken(candidate, sourceFile)
	}
	return nil
}

func nodeHasTokens(node *ast.Node, sourceFile *ast.SourceFile) bool {
	return scanner.GetTokenPosOfNode(node, sourceFile, false /*includeJsDoc*/) < node.End()
}

func findRightmostToken(n *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if ast.IsNonWhitespaceToken(n) {
		return n
	}

	children := getNodeChildren(n, sourceFile)
	if len(children) == 0 {
		return n
	}

	candidate := findRightmostChildNodeWithTokens(children, len(children), sourceFile, n.Kind)
	if candidate != nil {
		return findRightmostToken(candidate, sourceFile)
	}
	return nil
}

// findRightmostChildNodeWithTokens finds the rightmost child to the left of `children[exclusiveStartPosition]` which is a non-all-whitespace token or has constituent tokens.
func findRightmostChildNodeWithTokens(children []*ast.Node, exclusiveStartPosition int, sourceFile *ast.SourceFile, parentKind ast.Kind) *ast.Node {
	for i := exclusiveStartPosition - 1; i >= 0; i-- {
		child := children[i]

		if ast.IsWhitespaceOnlyJsxText(child) {
			if i == 0 && (parentKind == ast.KindJsxText || parentKind == ast.KindJsxSelfClosingElement) {
				panic("`JsxText` tokens should not be the first child of `JsxElement | JsxSelfClosingElement`")
			}
		} else if nodeHasTokens(children[i], sourceFile) {
			return children[i]
		}
	}
	return nil
}
