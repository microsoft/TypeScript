package ast

import (
	"math/bits"
	"slices"
	"sync"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A nodeStore holds the nodes created by one NodeFactory: for a parsed
// file, every node of that file. Nodes are records in one growable array
// of words, each beginning with the shared node header (nodeBaseData).
//
// Records hold no Go pointers, so the array is never scanned by the
// garbage collector, and it may move when it grows or is compacted.
// Nothing outside it holds an address within it: a Node is the store and
// a word index, and a record refers to another record of its store by
// that index. Fields holding Go values, and refs to nodes of other stores,
// go through the store's side tables.
type nodeStore struct {
	// words holds the records. Word 0 is unused, so that no record is at
	// index zero.
	words []uint64

	symbols      sideTable[*Symbol]
	symbolTables sideTable[SymbolTable]
	texts        textStore
	stringLists  sideTable[[]string]
	nodeSlices   sideTable[[]Node]
	values       sideTable[any]
	sourceFiles  sideTable[*SourceFile]

	// reused holds the nodes of other stores that records refer to, such
	// as original nodes reused by a transformed tree.
	reused []Node
	// reusedLists holds the lists of other stores that records refer to.
	reusedLists []NodeList

	flows       []flowNodeData
	flowLists   []flowListData
	reusedFlows []FlowNode

	// scratch is set while words is reusable scratch memory.
	scratch bool
	// frozen is set once the records are shared, after which they must not
	// move.
	frozen bool

	debugAllocs uint32
}

func newNodeStore() *nodeStore {
	return &nodeStore{}
}

// nodeBaseData is the header at the start of every node record.
type nodeBaseData struct {
	id     atomic.Uint64
	loc    core.TextRange
	parent nodeRef
	flags  NodeFlags
	kind   Kind
}

// Every node has a header, so it must stay small.
var _ [32 - unsafe.Sizeof(nodeBaseData{})]struct{}

// A nodeRef is a record field referring to a node. Zero is no node. With
// refReused clear, it is the index of a record in the referring record's
// store; otherwise, the rest is an index into the store's reused nodes.
type nodeRef uint32

const refReused = 1 << 31

const wordSize = unsafe.Sizeof(uint64(0))

// rec returns the address of n's record. It is only valid until the
// store next allocates or is compacted.
func (n Node) rec() unsafe.Pointer { return unsafe.Pointer(&n.s.words[n.i]) }

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.rec()) }

// store returns the store that owns n.
func (n Node) store() *nodeStore { return n.s }

// deref returns the node that the field f of a record of n's store refers
// to.
func (n Node) deref(f *nodeRef) Node {
	r := *f
	if r&refReused == 0 {
		if r == 0 {
			return Node{}
		}
		return n.s.node(uint32(r))
	}
	return n.s.reused[r&^refReused]
}

// setRef makes the field f of a record of n's store refer to v.
func (n Node) setRef(f *nodeRef, v Node) {
	n.s.setRef(f, v)
}

// setNodeRef makes the field f of the record of owner refer to v.
func setNodeRef(f *nodeRef, owner Node, v Node) {
	owner.s.setRef(f, v)
}

func (s *nodeStore) setRef(f *nodeRef, v Node) {
	switch {
	case v.s == s:
		*f = nodeRef(v.i)
	case v.s == nil:
		*f = 0
	case *f&refReused != 0:
		// Slots are never shared, so the field's own slot can be reused.
		s.reused[*f&^refReused] = v
	default:
		if len(s.reused) >= refReused {
			panic("node store reused node overflow")
		}
		*f = nodeRef(len(s.reused)) | refReused
		s.reused = append(s.reused, v)
	}
}

func (s *nodeStore) newNode(kind Kind, layout nodeLayout, n Node) Node {
	if kindLayout[kind] != layout {
		panic("node kind does not match its record layout")
	}
	n.hdr().kind = kind
	n.k = uint32(kind)
	return n
}

// node returns the node whose record is at index i.
func (s *nodeStore) node(i uint32) Node {
	return Node{s, i, uint32((*nodeBaseData)(unsafe.Pointer(&s.words[i])).kind)}
}

// newRecord allocates a zeroed record of type T, whose first field must be
// its nodeBaseData. The returned pointer is only valid until the store
// next allocates.
func newRecord[T any](s *nodeStore, layout nodeLayout) (*T, Node) {
	n := Node{s: s, i: s.alloc(unsafe.Sizeof(*new(T)))}
	return (*T)(n.rec()), n
}

// alloc allocates size zeroed bytes for a record and returns its index.
func (s *nodeStore) alloc(size uintptr) uint32 {
	words := int((size + wordSize - 1) / wordSize)
	i := max(len(s.words), 1)
	if i+words > cap(s.words) {
		if s.frozen {
			panic("node store is frozen")
		}
		s.grow(words)
	}
	if debugMoveRecords {
		// Moving on every allocation would be quadratic, so large stores
		// move less often, copying about a thousand words per allocation.
		s.debugAllocs++
		if s.debugAllocs%(uint32(len(s.words))>>10+1) == 0 {
			old := s.words
			s.words = append(make([]uint64, 0, cap(old)), old...)
			for j := range old {
				old[j] = ^uint64(0)
			}
		}
	}
	s.words = s.words[:i+words]
	if i+words > refReused {
		panic("node store overflow")
	}
	return uint32(i)
}

func (s *nodeStore) grow(words int) {
	n := max(len(s.words), 1)
	grown := make([]uint64, n, max(minStoreWords, n+words, n*2))
	copy(grown, s.words)
	s.words = grown
}

// Stores start small, since many, such as those for lazily parsed JSDoc,
// are tiny.
const minStoreWords = 64

// debugMoveRecords makes every allocation move a store's records, so that
// tests catch record addresses held across one.
var debugMoveRecords = false

// A store being built, such as by the parser, can keep its records in
// scratch memory that is reused from file to file, so that growing it is
// nearly free. Finishing the store copies the records out once.
var scratchWords sync.Pool

// maxScratchWords bounds the scratch memory kept for reuse.
const maxScratchWords = 1 << 22

func (s *nodeStore) useScratch() {
	if len(s.words) > 1 || s.scratch {
		panic("node store already has records")
	}
	if p, ok := scratchWords.Get().(*[]uint64); ok {
		s.words = (*p)[:1]
	}
	s.scratch = true
}

// finish copies the records into memory of their exact size, freezing them
// if asked to, and trims the side tables. It must only be called before the store
// is shared.
func (s *nodeStore) finish(freeze bool) {
	if len(s.words) != cap(s.words) {
		words := slices.Clip(slices.Clone(s.words))
		if s.scratch && cap(s.words) <= maxScratchWords {
			clear(s.words)
			scratch := s.words[:0]
			scratchWords.Put(&scratch)
		}
		s.words = words
	}
	s.scratch = false
	s.frozen = freeze
	s.compactSide()
}

// compactSide trims the side tables to size. Side values are never
// addressed, so this is safe whenever the store is not being read
// concurrently.
func (s *nodeStore) compactSide() {
	s.symbols.compact()
	s.symbolTables.compact()
	s.stringLists.compact()
	s.nodeSlices.compact()
	s.values.compact()
	s.reused = slices.Clip(s.reused)
	s.reusedLists = slices.Clip(s.reusedLists)
}

// A sideRef is a record field's slot in a side table, biased by one so that
// zero means the zero value without a slot.
type sideRef uint32

// A sideTable is appended to only by its store's owner, before the store
// is shared.
type sideTable[T any] struct {
	items []T
}

func (t *sideTable[T]) get(r sideRef) T {
	if r == 0 {
		var zero T
		return zero
	}
	return t.items[r-1]
}

// set stores v in r's slot, allocating one unless v is the zero value.
func (t *sideTable[T]) set(r *sideRef, v T, isZero bool) {
	if *r != 0 {
		t.items[*r-1] = v
		return
	}
	if !isZero {
		t.items = append(t.items, v)
		*r = sideRef(len(t.items))
	}
}

func (t *sideTable[T]) compact() {
	if len(t.items) != cap(t.items) {
		t.items = slices.Clip(slices.Clone(t.items))
	}
}

// A textRef is a string field: a range of the store's source text, or,
// with textRefArena set, of its text arena.
type textRef struct {
	off uint32
	len uint32
}

const textRefArena = 1 << 31

// textStore holds the text of a store's string fields. Text found within
// the source is referenced in place; other text is copied into an arena of
// chunks that are never moved or modified, so strings may alias them.
type textStore struct {
	source string
	chunks [32 - textBaseShift]*byte
	next   uint32
}

func (t *textStore) get(r textRef) string {
	if r.off&textRefArena == 0 {
		return unsafe.String((*byte)(unsafe.Add(unsafe.Pointer(unsafe.StringData(t.source)), r.off)), r.len)
	}
	k, off := textLocate(r.off &^ textRefArena)
	return unsafe.String((*byte)(unsafe.Add(unsafe.Pointer(t.chunks[k]), off)), r.len)
}

func (t *textStore) set(r *textRef, v string, _ bool) {
	if len(v) == 0 {
		*r = textRef{}
		return
	}
	if len(t.source) != 0 {
		start := uintptr(unsafe.Pointer(unsafe.StringData(t.source)))
		p := uintptr(unsafe.Pointer(unsafe.StringData(v)))
		if p >= start && p+uintptr(len(v)) <= start+uintptr(len(t.source)) {
			*r = textRef{off: uint32(p - start), len: uint32(len(v))}
			return
		}
	}
	*r = textRef{off: t.alloc(v) | textRefArena, len: uint32(len(v))}
}

// Arena chunk k holds 1<<(k+textBaseShift) bytes; offsets run contiguously
// through the chunks, and a string never spans two.
const textBaseShift = 12

func textLocate(i uint32) (k, off uint32) {
	j := i + 1<<textBaseShift
	k = uint32(bits.Len32(j)) - (textBaseShift + 1)
	return k, j - 1<<(k+textBaseShift)
}

func (t *textStore) alloc(v string) uint32 {
	n := uint32(len(v))
	for {
		k, off := textLocate(t.next)
		size := uint32(1) << (k + textBaseShift)
		if off+n <= size {
			if t.chunks[k] == nil {
				t.chunks[k] = unsafe.SliceData(make([]byte, size))
			}
			copy(unsafe.Slice((*byte)(unsafe.Add(unsafe.Pointer(t.chunks[k]), off)), n), v)
			i := t.next
			t.next += n
			if t.next&textRefArena != 0 {
				panic("node text arena overflow")
			}
			return i
		}
		// Skip the rest of this chunk.
		t.next += size - off
	}
}
