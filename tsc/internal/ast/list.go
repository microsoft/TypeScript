package ast

import (
	"iter"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A NodeList is a handle to a list of nodes: the address of its record.
// The zero NodeList is the absent list.
//
// A list record is a listHeader and then the elements as nodeRefs.
type NodeList struct {
	p unsafe.Pointer
}

type listHeader struct {
	// chunk is the record's offset in bytes from the start of its chunk.
	chunk    uint32
	n        uint32
	pos, end int32
	aux      uint32
}

const listHeaderSize = unsafe.Sizeof(listHeader{})

// A ModifierList is a NodeList of modifiers, whose record also holds their
// combined flags.
type ModifierList struct {
	NodeList
}

// A listRef is a record field referring to a list, encoded like a
// nodeRef, whose far lists are the store's farLists.
type listRef uint32

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
	p, chunk := s.alloc(listHeaderSize + uintptr(n)*unsafe.Sizeof(nodeRef(0)))
	l := NodeList{p}
	*l.hdr() = listHeader{chunk: chunk, n: uint32(n), pos: -1, end: -1, aux: aux}
	c := l.chunk()
	for k, node := range nodes {
		setRef(c, l.slot(k), node)
	}
	return l
}

func (l NodeList) IsNil() bool { return l.p == nil }

func (l NodeList) hdr() *listHeader { return (*listHeader)(l.p) }

func (l NodeList) slot(k int) *nodeRef {
	return (*nodeRef)(unsafe.Add(l.p, listHeaderSize+uintptr(k)*unsafe.Sizeof(nodeRef(0))))
}

func (l NodeList) chunk() *chunkHeader { return chunkOf(l.p, l.hdr().chunk) }

func (l NodeList) store() *nodeStore { return l.chunk().store }

func (l NodeList) Loc() core.TextRange {
	h := l.hdr()
	return core.NewTextRange(int(h.pos), int(h.end))
}

func (l NodeList) SetLoc(loc core.TextRange) {
	h := l.hdr()
	h.pos, h.end = int32(loc.Pos()), int32(loc.End())
}

func (l NodeList) Pos() int { return l.Loc().Pos() }
func (l NodeList) End() int { return l.Loc().End() }

func (l NodeList) aux() uint32 { return l.hdr().aux }

func (l NodeList) setAux(v uint32) { l.hdr().aux = v }

// Len returns the number of nodes in l, which is zero for the absent list.
func (l NodeList) Len() int {
	if l.p == nil {
		return 0
	}
	return int(l.hdr().n)
}

// At returns the node at index k of l.
func (l NodeList) At(k int) Node {
	if uint(k) >= uint(l.Len()) {
		panic("node list index out of range")
	}
	return l.at(k)
}

func (l NodeList) at(k int) Node {
	f := l.slot(k)
	r := *f
	if r&refNear != 0 {
		return Node{unsafe.Add(unsafe.Pointer(f), int(int32(r))-refNear)}
	}
	return l.store().far[r>>1]
}

// SetAt replaces the node at index k of l.
func (l NodeList) SetAt(k int, node Node) {
	if uint(k) >= uint(l.Len()) {
		panic("node list index out of range")
	}
	setRef(l.chunk(), l.slot(k), node)
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
func (l NodeList) IsMissing() bool { return l.p != nil && l.aux()&listMissing != 0 }

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
	if l.p == nil {
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
func (n Node) derefList(f *listRef) NodeList {
	r := *f
	if r&refNear != 0 {
		return NodeList{unsafe.Add(unsafe.Pointer(f), int(int32(r))-refNear)}
	}
	return (*chunkHeader)(unsafe.Add(n.p, -int((*nodeBaseData)(n.p).chunk))).store.farLists[r>>1]
}

func (n Node) derefModifiers(f *listRef) ModifierList {
	return ModifierList{n.derefList(f)}
}

// setListRef makes the field f of n's record refer to v.
func (n Node) setListRef(f *listRef, v NodeList) { setListRef(n.chunk(), f, v) }

func (n Node) setModifiersRef(f *listRef, v ModifierList) { setListRef(n.chunk(), f, v.NodeList) }

// setListRefAt makes the field f of the record of owner refer to v.
func setListRefAt(f *listRef, owner Node, v NodeList) { setListRef(owner.chunk(), f, v) }

func setModifiersRefAt(f *listRef, owner Node, v ModifierList) {
	setListRef(owner.chunk(), f, v.NodeList)
}

// setListRef makes the field f of a record in chunk c refer to v.
func setListRef(c *chunkHeader, f *listRef, v NodeList) {
	if v.p == nil {
		*f = 0
		return
	}
	if v.chunk() == c {
		*f = listRef(near(f, v.p))
		return
	}
	s := c.store
	if *f != 0 && *f&refNear == 0 {
		s.farLists[*f>>1] = v
		return
	}
	*f = listRef(farSlot(len(s.farLists)))
	s.farLists = append(s.farLists, v)
}

// listAt returns the list that the field at offset off of n's record
// refers to.
func (n Node) listAt(off uint8) NodeList {
	return n.derefList((*listRef)(unsafe.Add(n.p, off)))
}
