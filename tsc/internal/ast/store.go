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

// A nodeStore holds the nodes created by one NodeFactory: for a parsed
// file, every node of that file. Nodes are records in chunks of words,
// each beginning with the shared node header (nodeBaseData).
//
// Records hold no Go pointers and never move. A chunk is a Go object whose
// only pointer is its leading chunkHeader, so the garbage collector never
// scans its records. A Node is just the address of its record; the record
// header holds its offset from the start of its chunk, whose header leads
// back to the store. A record refers to another record in the same chunk
// by its offset from the referring field. Fields holding Go values, and
// refs to records in other chunks or stores, go through the store's side
// tables.
type nodeStore struct {
	// free is the unused rest of the chunk being allocated from, which
	// starts at base.
	free []uint64
	base unsafe.Pointer
	// chunks holds the start of every chunk, in allocation order.
	chunks []unsafe.Pointer
	// words counts the words of all chunks.
	words int
	// hint sizes the first chunk.
	hint int

	symbols      sideTable[*Symbol]
	symbolTables sideTable[SymbolTable]
	texts        textStore
	stringLists  sideTable[[]string]
	nodeSlices   sideTable[[]Node]
	values       sideTable[any]
	sourceFiles  sideTable[*SourceFile]

	// file is the source file whose tree the store holds, if it holds a
	// parsed file. Every node of the store that is in that tree is in the
	// file.
	file *SourceFile

	// far holds the nodes that records refer to but cannot reach by an
	// offset: those in other chunks, and those of other stores, such as
	// original nodes reused by a transformed tree.
	far []Node
	// farLists holds the lists that records refer to but cannot reach by
	// an offset.
	farLists []NodeList

	flows       []flowNodeData
	flowLists   []flowListData
	reusedFlows []FlowNode

	// frozen is set once the records are shared, after which no more may
	// be allocated.
	frozen bool
}

// A chunkHeader begins every chunk, before its records.
type chunkHeader struct {
	store *nodeStore
	index uint32
	_     uint32
}

const (
	chunkHeaderSize  = uint32(unsafe.Sizeof(chunkHeader{}))
	chunkHeaderWords = chunkHeaderSize / uint32(wordSize)
)

func newNodeStore() *nodeStore {
	// The first far slots are the absent node and list, which zero refs
	// refer to.
	return &nodeStore{
		far:          make([]Node, 1),
		farLists:     make([]NodeList, 1),
		symbols:      newSideTable[*Symbol](),
		symbolTables: newSideTable[SymbolTable](),
		stringLists:  newSideTable[[]string](),
		nodeSlices:   newSideTable[[]Node](),
		values:       newSideTable[any](),
		sourceFiles:  newSideTable[*SourceFile](),
	}
}

// nodeBaseData is the header at the start of every node record.
type nodeBaseData struct {
	id     atomic.Uint64
	loc    core.TextRange
	parent nodeRef
	flags  NodeFlags
	// chunk is the record's offset in bytes from the start of its chunk.
	chunk uint32
	kind  Kind
}

// Every node has a header, so it must stay small.
var _ [32 - unsafe.Sizeof(nodeBaseData{})]struct{}

// A nodeRef is a record field referring to a node. With the low bit set,
// the referenced record is in the same chunk, at the field's address plus
// the rest of the ref, read as a signed number of bytes; otherwise, the
// rest is an index into the store's far nodes, whose first is the absent
// node, so that zero is no node.
//
// Records are word aligned and refs are four byte aligned, so the distance
// from a ref to a record never has the low bit set.
type nodeRef uint32

const refNear = 1

const wordSize = unsafe.Sizeof(uint64(0))

// rec returns the address of n's record.
func (n Node) rec() unsafe.Pointer { return n.p }

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.p) }

// chunkOf returns the header of the chunk holding the record at p, which
// is chunk bytes from the chunk's start.
func chunkOf(p unsafe.Pointer, chunk uint32) *chunkHeader {
	return (*chunkHeader)(unsafe.Add(p, -int(chunk)))
}

func (n Node) chunk() *chunkHeader { return chunkOf(n.p, n.hdr().chunk) }

// store returns the store that owns n.
func (n Node) store() *nodeStore { return n.chunk().store }

// deref returns the node that the field f of n's record refers to.
func (n Node) deref(f *nodeRef) Node {
	r := *f
	if r&refNear != 0 {
		return Node{unsafe.Add(unsafe.Pointer(f), int(int32(r))-refNear)}
	}
	// The store is found by hand rather than by n.store() to keep callers
	// within the inlining budget.
	return (*chunkHeader)(unsafe.Add(n.p, -int((*nodeBaseData)(n.p).chunk))).store.far[r>>1]
}

// refAt returns the node that the field at offset off of n's record refers
// to.
func (n Node) refAt(off uint8) Node {
	return n.deref((*nodeRef)(unsafe.Add(n.p, off)))
}

// setRef makes the field f of n's record refer to v.
func (n Node) setRef(f *nodeRef, v Node) {
	setRef(n.chunk(), f, v)
}

// setNodeRef makes the field f of the record of owner refer to v.
func setNodeRef(f *nodeRef, owner Node, v Node) {
	setRef(owner.chunk(), f, v)
}

// setRef makes the field f of a record in chunk c refer to v.
func setRef(c *chunkHeader, f *nodeRef, v Node) {
	if v.p == nil {
		*f = 0
		return
	}
	if v.chunk() == c {
		*f = nodeRef(near(f, v.p))
		return
	}
	s := c.store
	if *f != 0 && *f&refNear == 0 {
		// Slots are never shared, so the field's own slot can be reused.
		s.far[*f>>1] = v
		return
	}
	*f = nodeRef(farSlot(len(s.far)))
	s.far = append(s.far, v)
}

// near returns the ref from the field at f to the record at p in the same
// chunk.
func near[F any](f *F, p unsafe.Pointer) uint32 {
	return uint32(int32(uintptr(p)-uintptr(unsafe.Pointer(f)))) | refNear
}

func farSlot(i int) uint32 {
	if i >= 1<<31 {
		panic("node store far ref overflow")
	}
	return uint32(i) << 1
}

// A nodeAnchor refers to a node of a store from outside its records: the
// chunk, biased by one, and the record's word offset there. With anchorFar
// set, the rest is an index into the store's far nodes.
type nodeAnchor uint32

const (
	anchorFar        = 1 << 31
	anchorChunkShift = 23
	maxAnchorChunks  = 1<<(31-anchorChunkShift) - 1
	// maxChunkWords bounds chunks so that anchors can address every word.
	maxChunkWords = 1 << anchorChunkShift
)

func (s *nodeStore) anchor(v Node) nodeAnchor {
	if v.p == nil {
		return 0
	}
	if c, w := v.chunk(), v.hdr().chunk/uint32(wordSize); c.store == s && c.index < maxAnchorChunks && w < maxChunkWords {
		return nodeAnchor((c.index+1)<<anchorChunkShift | w)
	}
	s.far = append(s.far, v)
	if len(s.far) > anchorFar {
		panic("node store far ref overflow")
	}
	return nodeAnchor(len(s.far)-1) | anchorFar
}

func (s *nodeStore) fromAnchor(r nodeAnchor) Node {
	switch {
	case r == 0:
		return Node{}
	case r&anchorFar != 0:
		return s.far[r&^anchorFar]
	}
	c := s.chunks[r>>anchorChunkShift-1]
	return Node{unsafe.Add(c, int(r&(maxChunkWords-1))*int(wordSize))}
}

func (s *nodeStore) newNode(kind Kind, layout nodeLayout, n Node) Node {
	if kindLayout[kind] != layout {
		panic("node kind does not match its record layout")
	}
	n.hdr().kind = kind
	return n
}

// newRecord allocates a zeroed record of type T, whose first field must be
// its nodeBaseData.
func newRecord[T any](s *nodeStore, layout nodeLayout) (*T, Node) {
	p, chunk := s.alloc(unsafe.Sizeof(*new(T)))
	(*nodeBaseData)(p).chunk = chunk
	return (*T)(p), Node{p}
}

// alloc allocates size zeroed bytes for a record, returning its address and
// its byte offset in its chunk.
func (s *nodeStore) alloc(size uintptr) (unsafe.Pointer, uint32) {
	if s.frozen {
		panic("node store is frozen")
	}
	words := int((size + wordSize - 1) / wordSize)
	if words > len(s.free) {
		return s.grow(words)
	}
	p := unsafe.Pointer(unsafe.SliceData(s.free))
	s.free = s.free[words:]
	return p, uint32(uintptr(p) - uintptr(s.base))
}

// grow allocates words in a new chunk. A record never spans two chunks.
func (s *nodeStore) grow(words int) (unsafe.Pointer, uint32) {
	n := min(max(s.words/storeGrowthDivisor, minStoreWords), maxChunkWords)
	if len(s.chunks) == 0 {
		n = min(max(n, s.hint), maxChunkWords)
	}
	if words > n || words > maxChunkWords {
		// A record too large for a normal chunk gets one of its own, and
		// the current chunk stays in use.
		base, _ := s.addChunk(words)
		return unsafe.Add(base, chunkHeaderSize), chunkHeaderSize
	}
	base, all := s.addChunk(n)
	s.base = base
	s.free = all[words:]
	return unsafe.Pointer(unsafe.SliceData(all)), chunkHeaderSize
}

// addChunk allocates a chunk with room for at least n words of records,
// returning its start and its records' words.
func (s *nodeStore) addChunk(n int) (unsafe.Pointer, []uint64) {
	n = chunkClass(n)
	base := reflect.New(chunkType(n)).UnsafePointer()
	*(*chunkHeader)(base) = chunkHeader{store: s, index: uint32(len(s.chunks))}
	s.chunks = append(s.chunks, base)
	s.words += n
	return base, unsafe.Slice((*uint64)(unsafe.Add(base, chunkHeaderSize)), n)
}

// chunkClass rounds n up so that a chunk with n words of records is 2^k
// or 3*2^(k-1) bytes, sizes that the Go allocator has a class for, so the
// space it would otherwise round up to holds records too.
func chunkClass(n int) int {
	bytes := max(n+int(chunkHeaderWords), minStoreWords) * int(wordSize)
	size := 1 << bits.Len(uint(bytes-1))
	if three := size / 4 * 3; three >= bytes {
		size = three
	}
	return size/int(wordSize) - int(chunkHeaderWords)
}

var chunkTypes sync.Map // int -> reflect.Type

// chunkType returns the type of a chunk with n words of records: a
// chunkHeader followed by an array of n words, so the header is its only
// pointer.
func chunkType(n int) reflect.Type {
	if t, ok := chunkTypes.Load(n); ok {
		return t.(reflect.Type)
	}
	t := reflect.StructOf([]reflect.StructField{
		{Name: "Header", Type: reflect.TypeFor[chunkHeader]()},
		{Name: "Words", Type: reflect.ArrayOf(n, reflect.TypeFor[uint64]())},
	})
	t2, _ := chunkTypes.LoadOrStore(n, t)
	return t2.(reflect.Type)
}

// Stores start small, since many, such as those for lazily parsed JSDoc,
// are tiny. This is the words of a chunk, including its header.
const minStoreWords = 64

// Each new chunk adds a fraction of the store's size, which bounds the
// space left unused at the end of the last one.
const storeGrowthDivisor = 16

// textBytesPerStoreWord gives a lower estimate of how many words parsing
// text takes.
const textBytesPerStoreWord = 4

// sizeForSource sizes the store's first chunk for parsing its source text.
func (s *nodeStore) sizeForSource() {
	if len(s.chunks) != 0 {
		panic("node store already has records")
	}
	s.hint = len(s.texts.source) / textBytesPerStoreWord
}

// finish freezes the records if asked to, and trims the side tables. It
// must only be called before the store is shared.
func (s *nodeStore) finish(freeze bool) {
	s.frozen = freeze
	if freeze {
		s.free = nil
	}
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
	s.far = slices.Clip(slices.Clone(s.far))
	s.farLists = slices.Clip(slices.Clone(s.farLists))
}

// A sideRef is a record field's slot in a side table. The first slot holds
// the zero value and is never written, so a zero ref reads as the zero value
// without a slot of its own.
type sideRef uint32

// A sideTable is appended to only by its store's owner, before the store
// is shared.
type sideTable[T any] struct {
	items []T
}

func newSideTable[T any]() sideTable[T] {
	return sideTable[T]{items: make([]T, 1)}
}

func (t *sideTable[T]) get(r sideRef) T {
	return t.items[r]
}

// set stores v in r's slot, allocating one unless v is the zero value.
func (t *sideTable[T]) set(r *sideRef, v T, isZero bool) {
	if *r != 0 {
		t.items[*r] = v
		return
	}
	if !isZero {
		*r = sideRef(len(t.items))
		t.items = append(t.items, v)
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
