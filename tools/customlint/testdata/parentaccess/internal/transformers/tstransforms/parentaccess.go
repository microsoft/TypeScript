package tstransforms

type Node struct{}

func (n *Node) Parent() *Node {
	return nil
}

type WithField struct {
	Parent *Node
}

func badCall(n *Node) {
	_ = n.Parent()
}

func badFieldAccess(w *WithField) {
	_ = w.Parent
}
