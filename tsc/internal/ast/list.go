package ast

import (
	"iter"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A NodeList is a handle to a list of nodes: the nodeStore that owns it
// and the index of its record there. The zero NodeList is the absent list.
//
// A list record is a word holding its range, a word holding its length and
// a per-kind auxiliary value, and then the elements as nodeRefs, two per
// word.
type NodeList struct {
	s *nodeStore
	i uint32
}

// A ModifierList is a NodeList of modifiers, whose record also holds their
// combined flags.
type ModifierList struct {
	NodeList
}

// A listRef is a record field referring to a list. Zero is no list. With
// refReused clear, it is the index of a list record in the referring
// record's store; otherwise, the rest is an index into the store's reused
// lists.
type listRef uint32

const listHeaderWords = 2

// listMissing marks a list that was expected but missing from the source.
const listMissing = 1

func (f *NodeFactory) NewNodeList(nodes []Node) NodeList {
	return newNodeList(f.nodeStore(), nodes, 0)
}

func (f *NodeFactory) NewModifierList(nodes []Node) ModifierList {
	return ModifierList{newNodeList(f.nodeStore(), nodes, uint32(ModifiersToFlags(nodes)))}
}

func newNodeList(s *nodeStore, nodes []Node, aux uint32) NodeList {
	n := len(nodes)
	i := s.alloc(uintptr(listHeaderWords+(n+1)/2) * wordSize)
	l := NodeList{s, i}
	l.SetLoc(core.UndefinedTextRange())
	s.words[i+1] = uint64(uint32(n)) | uint64(aux)<<32
	for k, node := range nodes {
		var r nodeRef
		s.setRef(&r, node)
		w := &s.words[i+listHeaderWords+uint32(k)/2]
		*w |= uint64(r) << (32 * (k & 1))
	}
	return l
}

func (l NodeList) IsNil() bool { return l.s == nil }

func (l NodeList) Loc() core.TextRange {
	w := l.s.words[l.i]
	return core.NewTextRange(int(int32(uint32(w))), int(int32(uint32(w>>32))))
}

func (l NodeList) SetLoc(loc core.TextRange) {
	l.s.words[l.i] = uint64(uint32(int32(loc.Pos()))) | uint64(uint32(int32(loc.End())))<<32
}

func (l NodeList) Pos() int { return l.Loc().Pos() }
func (l NodeList) End() int { return l.Loc().End() }

func (l NodeList) aux() uint32 { return uint32(l.s.words[l.i+1] >> 32) }

func (l NodeList) setAux(v uint32) {
	w := &l.s.words[l.i+1]
	*w = uint64(uint32(*w)) | uint64(v)<<32
}

// Len returns the number of nodes in l, which is zero for the absent list.
func (l NodeList) Len() int {
	if l.s == nil {
		return 0
	}
	return int(uint32(l.s.words[l.i+1]))
}

// At returns the node at index k of l.
func (l NodeList) At(k int) Node {
	if uint(k) >= uint(l.Len()) {
		panic("node list index out of range")
	}
	return l.at(k)
}

func (l NodeList) at(k int) Node {
	w := l.s.words[l.i+listHeaderWords+uint32(k)/2]
	r := nodeRef(w >> (32 * (k & 1)))
	if r&refReused == 0 {
		return Node{l.s, uint32(r)}
	}
	return l.s.reused[r&^refReused]
}

// SetAt replaces the node at index k of l.
func (l NodeList) SetAt(k int, node Node) {
	if uint(k) >= uint(l.Len()) {
		panic("node list index out of range")
	}
	w := &l.s.words[l.i+listHeaderWords+uint32(k)/2]
	shift := 32 * (k & 1)
	r := nodeRef(*w >> shift)
	l.s.setRef(&r, node)
	*w = *w&^(0xFFFFFFFF<<shift) | uint64(r)<<shift
}

// First returns the first node of l, or the absent node if l is empty.
func (l NodeList) First() Node {
	if l.Len() == 0 {
		return Node{}
	}
	return l.at(0)
}

// Last returns the last node of l, or the absent node if l is empty.
func (l NodeList) Last() Node {
	n := l.Len()
	if n == 0 {
		return Node{}
	}
	return l.at(n - 1)
}

// All returns an iterator over the indices and nodes of l.
func (l NodeList) All() iter.Seq2[int, Node] {
	return func(yield func(int, Node) bool) {
		n := l.Len()
		for k := range n {
			if !yield(k, l.at(k)) {
				return
			}
		}
	}
}

// Some reports whether f is true for any node of l.
func (l NodeList) Some(f func(Node) bool) bool {
	for k, n := 0, l.Len(); k < n; k++ {
		if f(l.at(k)) {
			return true
		}
	}
	return false
}

// Every reports whether f is true for every node of l.
func (l NodeList) Every(f func(Node) bool) bool {
	for k, n := 0, l.Len(); k < n; k++ {
		if !f(l.at(k)) {
			return false
		}
	}
	return true
}

// Slice returns the nodes of l in a new slice, or nil if l is empty.
func (l NodeList) Slice() []Node {
	n := l.Len()
	if n == 0 {
		return nil
	}
	nodes := make([]Node, n)
	for k := range nodes {
		nodes[k] = l.at(k)
	}
	return nodes
}

// IsMissing reports whether l stands for a list missing from the source.
func (l NodeList) IsMissing() bool { return l.s != nil && l.aux()&listMissing != 0 }

func (l NodeList) SetMissing() { l.setAux(l.aux() | listMissing) }

func (l NodeList) HasTrailingComma() bool {
	n := l.Len()
	if n == 0 {
		return false
	}
	return l.at(n-1).End() < l.End()
}

func (l NodeList) Clone(f NodeFactoryCoercible) NodeList {
	result := f.AsNodeFactory().NewNodeList(l.Slice())
	result.SetLoc(l.Loc())
	return result
}

func (l ModifierList) ModifierFlags() ModifierFlags {
	if l.s == nil {
		return ModifierFlagsNone
	}
	return ModifierFlags(l.aux())
}

func (l ModifierList) SetModifierFlags(flags ModifierFlags) { l.setAux(uint32(flags)) }

func (l ModifierList) Clone(f *NodeFactory) ModifierList {
	res := ModifierList{newNodeList(f.nodeStore(), l.Slice(), uint32(l.ModifierFlags()))}
	res.SetLoc(l.Loc())
	return res
}

// derefList returns the list that the field f of n's record refers to.
func (n Node) derefList(f *listRef) NodeList { return n.s.derefList(*f) }

func (n Node) derefModifiers(f *listRef) ModifierList {
	return ModifierList{n.s.derefList(*f)}
}

// setListRef makes the field f of n's record refer to v.
func (n Node) setListRef(f *listRef, v NodeList) { n.s.setListRef(f, v) }

func (n Node) setModifiersRef(f *listRef, v ModifierList) { n.s.setListRef(f, v.NodeList) }

// setListRefAt makes the field f of the record of owner refer to v.
func setListRefAt(f *listRef, owner Node, v NodeList) { owner.s.setListRef(f, v) }

func setModifiersRefAt(f *listRef, owner Node, v ModifierList) {
	owner.s.setListRef(f, v.NodeList)
}

func (s *nodeStore) derefList(r listRef) NodeList {
	if r&refReused == 0 {
		if r == 0 {
			return NodeList{}
		}
		return NodeList{s, uint32(r)}
	}
	return s.reusedLists[r&^refReused]
}

func (s *nodeStore) setListRef(f *listRef, v NodeList) {
	switch {
	case v.s == s:
		*f = listRef(v.i)
	case v.s == nil:
		*f = 0
	case *f&refReused != 0:
		s.reusedLists[*f&^refReused] = v
	default:
		if len(s.reusedLists) >= refReused {
			panic("node store reused list overflow")
		}
		*f = listRef(len(s.reusedLists)) | refReused
		s.reusedLists = append(s.reusedLists, v)
	}
}
