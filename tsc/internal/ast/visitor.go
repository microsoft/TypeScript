package ast

import (
	"slices"
)

// NodeVisitor

type NodeVisitor struct {
	Visit   func(node *Node) *Node // The callback used to visit a node
	Factory NodeFactory            // A NodeFactory used to produce new nodes when passed to VisitEachChild

	// !!! Callbacks for LanguageService purposes (override VisitNodes, VisitModifiers, VisitToken)
}

func (v *NodeVisitor) VisitSourceFile(node *SourceFile) *SourceFile {
	return v.VisitNode(node.AsNode()).AsSourceFile()
}

func (v *NodeVisitor) VisitNode(node *Node) *Node {
	// !!! Invoke callback for Language Service purposes
	if node == nil || v.Visit == nil {
		return node
	}

	if v.Visit != nil {
		visited := v.Visit(node)
		if visited != nil && visited.Kind == KindSyntaxList {
			nodes := visited.AsSyntaxList().Children
			if len(nodes) != 1 {
				panic("Expected only a single node to be written to output")
			}
			visited = nodes[0]
			if visited != nil && visited.Kind == KindSyntaxList {
				panic("The result of visiting and lifting a Node may not be SyntaxList")
			}
		}
		return visited
	}

	return node
}

func (v *NodeVisitor) VisitToken(node *Node) *Node {
	// !!! Invoke callback for Language Service purposes
	return node
}

func (v *NodeVisitor) VisitNodes(nodes *NodeList) *NodeList {
	// !!! Invoke callback for Language Service purposes
	if nodes == nil {
		return nodes
	}

	if result, changed := v.visitSlice(nodes.Nodes); changed {
		list := v.Factory.NewNodeList(result)
		list.Loc = nodes.Loc
		return list
	}

	return nodes
}

func (v *NodeVisitor) VisitModifiers(nodes *ModifierList) *ModifierList {
	// !!! Invoke callback for Language Service purposes
	if nodes == nil {
		return nodes
	}

	if result, changed := v.visitSlice(nodes.Nodes); changed {
		list := v.Factory.NewModifierList(result)
		list.Loc = nodes.Loc
		return list
	}

	return nodes
}

func (v *NodeVisitor) visitSlice(nodes []*Node) (result []*Node, changed bool) {
	if nodes == nil || v.Visit == nil {
		return nodes, false
	}

	for i := 0; i < len(nodes); i++ {
		node := nodes[i]
		if v.Visit == nil {
			break
		}

		visited := v.Visit(node)
		if visited == nil || visited != node {
			updated := slices.Clone(nodes[:i])

			for {
				// finish prior loop
				switch {
				case visited == nil: // do nothing
				case visited.Kind == KindSyntaxList:
					updated = append(updated, visited.AsSyntaxList().Children...)
				default:
					updated = append(updated, visited)
				}

				i++

				// loop over remaining elements
				if i >= len(nodes) {
					break
				}

				if v.Visit != nil {
					node = nodes[i]
					visited = v.Visit(node)
				} else {
					updated = append(updated, nodes[i:]...)
					break
				}
			}

			return updated, true
		}
	}

	return nodes, false
}

func (v *NodeVisitor) VisitEachChild(node *Node) *Node {
	if node == nil || v.Visit == nil {
		return node
	}

	return node.VisitEachChild(v)
}

func (v *NodeVisitor) UpdateNode(updated *Node, original *Node) *Node {
	if updated != original {
		updated.Loc = original.Loc
	}
	return updated
}
