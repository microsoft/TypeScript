package ast

type Kind int16

const (
	KindIdentifier Kind = iota
	KindImportDeclaration
	KindJSImportDeclaration
)

type Node struct {
	Kind Kind
}

type Identifier struct {
	Node
	Text string
}

type ImportDeclaration struct {
	Node
}

func (n *Node) AsNode() *Node { return n }

func (n *Node) AsIdentifier() *Identifier {
	if n.Kind != KindIdentifier {
		panic("Invalid node cast")
	}
	return nil
}

func (n *Node) AsImportDeclaration() *ImportDeclaration {
	switch n.Kind {
	case KindImportDeclaration, KindJSImportDeclaration:
		return nil
	default:
		panic("Invalid node cast")
	}
}

func newNode(kind Kind, node *Node) *Node {
	node.Kind = kind
	return node
}

func NewIdentifier(text string) *Node {
	data := &Identifier{Text: text}
	return newNode(KindIdentifier, data.AsNode())
}

func badFactory() *Node {
	data := &ImportDeclaration{}
	return newNode(KindIdentifier, data.AsNode())
}

func escapes(kind Kind) *Node {
	data := &Identifier{}
	_ = newNode
	return newNode(kind, data.AsNode())
}

type PretendIdentifier struct {
	Identifier
}

func (n *PretendIdentifier) AsNode() *Node { return &n.Node }

func shadowedUpcast() *Node {
	data := &PretendIdentifier{}
	return newNode(KindIdentifier, data.AsNode())
}

func illegalWrites(node *Node, identifier *Identifier, declaration *ImportDeclaration, kind Kind) {
	node.Kind = KindIdentifier
	identifier.Kind = KindIdentifier
	identifier.Kind = KindImportDeclaration
	declaration.Kind = KindImportDeclaration
	declaration.Kind = KindJSImportDeclaration
	declaration.Kind = kind
	declaration.Kind += KindImportDeclaration
	node.Kind++
	_ = &node.Kind
	(node.Kind) = KindIdentifier
	(node.Kind)++
	_ = &(node.Kind)
}

func freshNodes() *Node {
	tagged := &Identifier{}
	tagged.Text = "x"
	_ = newNode(KindIdentifier, tagged.AsNode())
	return (&Identifier{}).AsNode()
}
