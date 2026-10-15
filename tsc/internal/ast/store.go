package ast

import (
	"math/bits"
	"reflect"
	"slices"
	"sync"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A nodeStore holds the nodes created by one NodeFactory (for parsed files,
// one store per file). Nodes are records allocated from a sequence of
// chunks, every record beginning with the shared node header
// (nodeBaseData). A Node is a pointer to its record. Records never move,
// so a Node never goes stale.
//
// A chunk is a single Go object whose first word points to the store and
// whose remainder holds records. Records contain no Go pointers, so the
// garbage collector scans only that first word of each chunk; fields that
// hold Go pointers are kept in the store's side tables instead.
type nodeStore struct {
	chunk    unsafe.Pointer // the chunk being filled
	cur      uint32         // index of the chunk being filled
	used     uintptr        // bytes used in the current chunk
	capacity uintptr        // size of the current chunk
	total    uintptr        // size of all chunks

	symbols       sideTable[*Symbol]
	flowNodes     sideTable[*FlowNode]
	symbolTables  sideTable[SymbolTable]
	nodeLists     sideTable[*NodeList]
	modifierLists sideTable[*ModifierList]
	texts         textStore
	stringLists   sideTable[[]string]
	nodeSlices    sideTable[[]Node]
	values        sideTable[any]

	// far holds the nodes referred to by far refs. Readers load it without
	// locking; writers append under farMu, replacing far with a larger
	// copy when it is full, so published entries never change. Entry zero
	// is the nil Node.
	far      unsafe.Pointer // *[farCap]Node, accessed atomically
	farMu    sync.Mutex
	farN     uint32
	farCap   uint32
	farIndex map[Node]nodeRef
}

var noFarNodes [1]Node

func newNodeStore() *nodeStore {
	return &nodeStore{far: unsafe.Pointer(&noFarNodes), farN: 1, farCap: 1}
}

// nodeBaseData is the header at the start of every node record.
type nodeBaseData struct {
	id     atomic.Uint64
	loc    core.TextRange
	flags  NodeFlags
	parent nodeRef
	self   nodeRef // this record's own location
	kind   Kind
}

// A nodeRef is a reference from one record to another. A near ref, to a
// record in the same chunk, holds the chunk's index and the record's offset
// in it, in words, exactly as the record's own self does; it resolves
// relative to the referring record. Any other reference, including to no
// node at all, is a far ref: an index into the store's far table, with
// nodeRefFar set (the zero nodeRef is index zero, the nil Node). Chunk
// indexes start at one, so a far ref never matches a record's chunk.
type nodeRef uint32

const (
	nodeRefOffsetBits         = 24
	nodeRefOffsetMask nodeRef = 1<<nodeRefOffsetBits - 1
	nodeRefFar        nodeRef = 1 << 31
	chunkCount                = int(nodeRefFar >> nodeRefOffsetBits)

	// Records with Go pointers are each allocated alone, behind their own
	// store pointer, and identify themselves with this chunk index. They
	// are always referred to by far refs.
	standaloneChunk = nodeRef(chunkCount - 1)
	standaloneSelf  = standaloneChunk<<nodeRefOffsetBits | 1

	wordSize     = unsafe.Sizeof(uintptr(0))
	maxChunkSize = uintptr(nodeRefOffsetMask) * wordSize
)

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.p) }

// store returns the store that owns n.
func (n Node) store() *nodeStore {
	return *(**nodeStore)(unsafe.Add(n.p, -int(n.hdr().self&nodeRefOffsetMask)*int(wordSize)))
}

// deref returns the node that r, stored in one of n's fields, refers to.
func (n Node) deref(r nodeRef) Node {
	self := n.hdr().self
	if (r^self)>>nodeRefOffsetBits == 0 {
		// The chunk bits cancel, leaving the distance between the records.
		return Node{unsafe.Add(n.p, (int(r)-int(self))*int(wordSize))}
	}
	return *(*Node)(unsafe.Add(atomic.LoadPointer(&n.store().far), uintptr(r&^nodeRefFar)*unsafe.Sizeof(Node{})))
}

// ref returns a nodeRef to v for one of n's fields.
func (n Node) ref(v Node) nodeRef {
	return n.store().refAt(n.p, v)
}

// refAt returns a nodeRef to v for a field of the record at owner, which
// must belong to s.
func (s *nodeStore) refAt(owner unsafe.Pointer, v Node) nodeRef {
	if v.p == nil {
		return 0
	}
	self := (*nodeBaseData)(owner).self
	if near := v.hdr().self; (near^self)>>nodeRefOffsetBits == 0 && self>>nodeRefOffsetBits != standaloneChunk && v.store() == s {
		return near
	}
	return s.farRef(v)
}

func (s *nodeStore) farRef(n Node) nodeRef {
	s.farMu.Lock()
	defer s.farMu.Unlock()
	if r, ok := s.farIndex[n]; ok {
		return r
	}
	if s.farIndex == nil {
		s.farIndex = make(map[Node]nodeRef)
	}
	i := s.farN
	if nodeRef(i)&nodeRefFar != 0 {
		panic("too many far node references")
	}
	if i == s.farCap {
		s.farCap *= 2
		grown := make([]Node, s.farCap)
		copy(grown, unsafe.Slice((*Node)(s.far), i))
		grown[i] = n
		atomic.StorePointer(&s.far, unsafe.Pointer(unsafe.SliceData(grown)))
	} else {
		*(*Node)(unsafe.Add(s.far, uintptr(i)*unsafe.Sizeof(Node{}))) = n
	}
	s.farN++
	r := nodeRef(i) | nodeRefFar
	s.farIndex[n] = r
	return r
}

func (s *nodeStore) newNode(kind Kind, layout nodeLayout, rec unsafe.Pointer) Node {
	if kindLayout[kind] != layout {
		panic("node kind does not match its record layout")
	}
	n := Node{rec}
	n.hdr().kind = kind
	return n
}

// newRecord allocates a zeroed record of type T, whose first field must be
// its nodeBaseData.
func newRecord[T any](s *nodeStore, layout nodeLayout) (*T, unsafe.Pointer) {
	if standaloneLayout(layout) {
		c := &standaloneRecord[T]{s: s}
		p := unsafe.Pointer(&c.rec)
		(*nodeBaseData)(p).self = standaloneSelf
		return &c.rec, p
	}
	p := s.alloc((unsafe.Sizeof(*new(T)) + wordSize - 1) &^ (wordSize - 1))
	return (*T)(p), p
}

type standaloneRecord[T any] struct {
	s   *nodeStore
	rec T
}

// standaloneLayout reports whether a layout's records hold Go pointers, so
// must be allocated outside the chunks.
func standaloneLayout(layout nodeLayout) bool {
	switch layout {
	case layoutSourceFile, layoutFlowSwitchClauseData, layoutFlowReduceLabelData:
		return true
	}
	return false
}

// Each chunk adds a quarter to the store's size, at least minChunkSize.
// Records do not move, so the unused end of the last chunk is never
// reclaimed; slower growth wastes less of it, at the cost of more
// references between chunks.
const minChunkSize = 4 << 10

// alloc allocates size zeroed bytes for a record and sets its self.
func (s *nodeStore) alloc(size uintptr) unsafe.Pointer {
	if s.used+size > s.capacity {
		s.grow(size)
	}
	off := s.used
	s.used += size
	p := unsafe.Add(s.chunk, off)
	(*nodeBaseData)(p).self = nodeRef(s.cur)<<nodeRefOffsetBits | nodeRef(off/wordSize)
	return p
}

func (s *nodeStore) grow(size uintptr) {
	s.cur++
	if nodeRef(s.cur) >= standaloneChunk {
		panic("node store is full")
	}
	next := min(max(minChunkSize, s.total/4, size+wordSize), maxChunkSize)
	typ := chunkType(next)
	chunk := reflect.New(typ).UnsafePointer()
	*(**nodeStore)(chunk) = s
	s.chunk = chunk
	s.used = wordSize
	s.capacity = typ.Size()
	s.total += s.capacity
}

var chunkTypes sync.Map // map[uintptr]reflect.Type

// chunkType returns a struct type holding a store pointer followed by at
// least size-wordSize bytes of records. Sizes are rounded so that few
// distinct types are created.
func chunkType(size uintptr) reflect.Type {
	step := uintptr(minChunkSize)
	if size > 64*minChunkSize {
		step = uintptr(1) << (bits.Len(uint(size)) - 4)
	}
	size = (size + step - 1) &^ (step - 1)
	if t, ok := chunkTypes.Load(size); ok {
		return t.(reflect.Type)
	}
	t, _ := chunkTypes.LoadOrStore(size, reflect.StructOf([]reflect.StructField{
		{Name: "S", Type: reflect.TypeFor[*nodeStore]()},
		{Name: "D", Type: reflect.ArrayOf(int(size-wordSize), reflect.TypeFor[byte]())},
	}))
	return t.(reflect.Type)
}

// compact trims the store's side tables. It must only be called before the
// store is shared.
func (s *nodeStore) compact() {
	s.compactSide()
}

// compactSide trims the side tables to size. Side values are never
// addressed, so this is safe whenever the store is not being read
// concurrently.
func (s *nodeStore) compactSide() {
	s.symbols.compact()
	s.flowNodes.compact()
	s.symbolTables.compact()
	s.nodeLists.compact()
	s.modifierLists.compact()
	s.stringLists.compact()
	s.nodeSlices.compact()
	s.values.compact()
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
