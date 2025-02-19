package ast

import (
	"slices"
)

// NodeVisitor

type NodeVisitor struct {
	Visit   func(node *Node) *Node // Required. The callback used to visit a node
	Factory *NodeFactory           // Required. The NodeFactory used to produce new nodes when passed to VisitEachChild
	Hooks   NodeVisitorHooks       // Hooks to be invoked when visiting a node
}

// These hooks are used to intercept the default behavior of the visitor in certain situations such as
// in tests or in the language service.
type NodeVisitorHooks struct {
	VisitNode      func(node *Node, v *NodeVisitor) *Node                  // Overrides visiting a Node. Only invoked by the Update* methods on NodeFactory.
	VisitToken     func(node *TokenNode, v *NodeVisitor) *Node             // Overrides visiting a TokenNode. Only invoked by the Update* methods on NodeFactory.
	VisitNodes     func(nodes *NodeList, v *NodeVisitor) *NodeList         // Overrides visiting a NodeList. Only invoked by the Update* methods on NodeFactory.
	VisitModifiers func(nodes *ModifierList, v *NodeVisitor) *ModifierList // Overrides visiting a ModifierList. Only invoked by the Update* methods on NodeFactory.
	SetOriginal    func(node *Node, original *Node)                        // Overrides setting the original node. Only invoked by VisitEachChild on NodeVisitor.
}

func (v *NodeVisitor) VisitSourceFile(node *SourceFile) *SourceFile {
	return v.VisitNode(node.AsNode()).AsSourceFile()
}

// Visits a Node, possibly returning a new Node in its place.
//
//   - If the input node is nil, then the output is nil.
//   - If v.Visit is nil, then the output is the input.
//   - If v.Visit returns nil, then the output is nil.
//   - If v.Visit returns a SyntaxList Node, then the output is the only child of the SyntaxList Node.
func (v *NodeVisitor) VisitNode(node *Node) *Node {
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

// Visits a NodeList, possibly returning a new NodeList in its place.
//
//   - If the input NodeList is nil, the output is nil.
//   - If v.Visit is nil, then the output is the input.
//   - If v.Visit returns nil, the visited Node will be absent in the output.
//   - If v.Visit returns a different Node than the input, a new NodeList will be generated and returned.
//   - If v.Visit returns a SyntaxList Node, then the children of that node will be merged into the output and a new NodeList will be returned.
//   - If this method returns a new NodeList for any reason, it will have the same Loc as the input NodeList.
func (v *NodeVisitor) VisitNodes(nodes *NodeList) *NodeList {
	if nodes == nil || v.Visit == nil {
		return nodes
	}

	if result, changed := v.VisitSlice(nodes.Nodes); changed {
		list := v.Factory.NewNodeList(result)
		list.Loc = nodes.Loc
		return list
	}

	return nodes
}

// Visits a ModifierList, possibly returning a new ModifierList in its place.
//
//   - If the input ModifierList is nil, the output is nil.
//   - If v.Visit is nil, then the output is the input.
//   - If v.Visit returns nil, the visited Node will be absent in the output.
//   - If v.Visit returns a different Node than the input, a new ModifierList will be generated and returned.
//   - If v.Visit returns a SyntaxList Node, then the children of that node will be merged into the output and a new NodeList will be returned.
//   - If this method returns a new NodeList for any reason, it will have the same Loc as the input NodeList.
func (v *NodeVisitor) VisitModifiers(nodes *ModifierList) *ModifierList {
	if nodes == nil || v.Visit == nil {
		return nodes
	}

	if result, changed := v.VisitSlice(nodes.Nodes); changed {
		list := v.Factory.NewModifierList(result)
		list.Loc = nodes.Loc
		return list
	}

	return nodes
}

// Visits a slice of Nodes, returning the resulting slice and a value indicating whether the slice was changed.
//
//   - If the input slice is nil, the output is nil.
//   - If v.Visit is nil, then the output is the input.
//   - If v.Visit returns nil, the visited Node will be absent in the output.
//   - If v.Visit returns a different Node than the input, a new slice will be generated and returned.
//   - If v.Visit returns a SyntaxList Node, then the children of that node will be merged into the output and a new slice will be returned.
func (v *NodeVisitor) VisitSlice(nodes []*Node) (result []*Node, changed bool) {
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

// Visits each child of a Node, possibly returning a new Node of the same kind in its place.
func (v *NodeVisitor) VisitEachChild(node *Node) *Node {
	if node == nil || v.Visit == nil {
		return node
	}

	updated := node.VisitEachChild(v)
	if updated != node && v.Hooks.SetOriginal != nil {
		v.Hooks.SetOriginal(updated, node)
	}
	return updated
}

// Invokes v.Hooks.VisitNode if provided, otherwise invokes v.VisitNode.
func (v *NodeVisitor) visitNode(node *Node) *Node {
	if v.Hooks.VisitNode != nil {
		return v.Hooks.VisitNode(node, v)
	}
	return v.VisitNode(node)
}

// Invokes v.Hooks.VisitToken if provided, otherwise invokes v.VisitNode.
func (v *NodeVisitor) visitToken(node *Node) *Node {
	if v.Hooks.VisitToken != nil {
		return v.Hooks.VisitToken(node, v)
	}
	return v.VisitNode(node)
}

// Invokes v.Hooks.VisitNodes if provided, otherwise invokes v.VisitNodes.
func (v *NodeVisitor) visitNodes(nodes *NodeList) *NodeList {
	if v.Hooks.VisitNodes != nil {
		return v.Hooks.VisitNodes(nodes, v)
	}
	return v.VisitNodes(nodes)
}

// Invokes v.Hooks.VisitModifiers if provided, otherwise invokes v.VisitModifiers.
func (v *NodeVisitor) visitModifiers(nodes *ModifierList) *ModifierList {
	if v.Hooks.VisitModifiers != nil {
		return v.Hooks.VisitModifiers(nodes, v)
	}
	return v.VisitModifiers(nodes)
}
