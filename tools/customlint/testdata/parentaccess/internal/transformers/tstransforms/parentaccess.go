package tstransforms

type Node struct{}

func (n *Node) Parent() *Node {
	return nil
}

func (n *Node) SetParent(parent *Node) {}

type WithField struct {
	Parent *Node
}

func badCall(n *Node) {
	_ = n.Parent()
}

func badFieldAccess(w *WithField) {
	_ = w.Parent
}

func badSetter(n *Node, parent *Node) {
	n.SetParent(parent)
}
