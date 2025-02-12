package ls

import (
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

var factory = &ast.NodeFactory{}

func getNodeChildren(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	// !!! implement weak map cache
	if ast.IsTokenKind(node.Kind) {
		return nil
	}
	if node.Kind == ast.KindSyntaxList {
		return node.AsSyntaxList().Children
	}
	return createChildren(node, sourceFile)
}

func createChildren(node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	var children []*ast.Node
	if ast.IsJSDocCommentContainingNode(node) {
		// Don't add trivia for "tokens" since this is in a comment
		node.ForEachChild(func(child *ast.Node) bool {
			children = append(children, child)
			return false
		})
		return children
	}

	scanner := scanner.GetScannerForSourceFile(sourceFile, 0)
	pos := node.Pos()

	processNode := func(child *ast.Node) {
		children = addSyntheticNodes(children, pos, child.Pos(), node, scanner)
		children = append(children, child)
		pos = child.End()
	}

	visitor := &ast.NodeVisitor{
		Visit: func(child *ast.Node) *ast.Node {
			return child
		},
		Hooks: ast.NodeVisitorHooks{
			VisitNode: func(child *ast.Node, v *ast.NodeVisitor) *ast.Node {
				if child != nil {
					processNode(child)
				}
				return child
			},
			VisitNodes: func(nodeList *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
				if nodeList != nil {
					children = addSyntheticNodes(children, pos, nodeList.Pos(), node, scanner)
					children = append(children, createSyntaxList(nodeList, node, scanner))
					pos = nodeList.End()
				}
				return nodeList
			},
		},
	}

	// jsDocComments need to be the first children
	for _, jsDoc := range node.JSDoc(sourceFile) {
		processNode(jsDoc)
	}
	// For syntactic classifications, all trivia are classified together, including jsdoc comments.
	// For that to work, the jsdoc comments should still be the leading trivia of the first child.
	// Restoring the scanner position ensures that.
	pos = node.Pos()
	node.VisitEachChild(visitor)
	children = addSyntheticNodes(children, pos, node.End(), node, scanner)
	return children
}

func createSyntaxList(nodeList *ast.NodeList, parent *ast.Node, scanner *scanner.Scanner) *ast.Node {
	children := make([]*ast.Node, 0, len(nodeList.Nodes))
	pos := nodeList.Pos()
	for _, child := range nodeList.Nodes {
		children = addSyntheticNodes(children, pos, child.Pos(), parent, scanner)
		children = append(children, child)
		pos = child.End()
	}
	children = addSyntheticNodes(children, pos, nodeList.End(), parent, scanner)
	list := factory.NewSyntaxList(children)
	list.Loc = nodeList.Loc
	list.Parent = parent
	return list
}

func addSyntheticNodes(children []*ast.Node, pos, end int, parent *ast.Node, scanner *scanner.Scanner) []*ast.Node {
	scanner.ResetPos(pos)
	for pos < end {
		scanner.Scan()
		token := scanner.Token()
		textPos := scanner.TokenEnd()
		if textPos <= end {
			if token == ast.KindIdentifier || !ast.IsTokenKind(token) {
				// !!! snippet support
				// if hasTabstop(parent) {
				// 	continue
				// }
				panic(fmt.Sprintf("did not expect %s to have %s in its trivia", parent.Kind.String(), token.String()))
			}
			tokenNode := factory.NewToken(token)
			tokenNode.Loc = core.NewTextRange(pos, textPos)
			tokenNode.Parent = parent
			children = append(children, tokenNode)
		}
		pos = textPos
	}
	return children
}
