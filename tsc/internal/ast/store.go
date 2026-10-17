package ast

import (
	"math/bits"
	"slices"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A nodeStore holds the nodes created by one NodeFactory: for a parsed
// file, every node of that file. Nodes are records in chunks of words,
// each beginning with the shared node header (nodeBaseData).
//
// Records hold no Go pointers, so chunks are never scanned by the garbage
// collector, and they never move. A Node is the address of its record and
// its store, and a record refers to another record in the same chunk by
// its offset from the referring field. Fields holding Go values, and refs
// to records in other chunks or stores, go through the store's side
// tables.
type nodeStore struct {
	// free is the unused rest of the chunk being allocated from.
	free []uint64
	// chunks holds every chunk, in allocation order, keeping them alive.
	chunks []storeChunk
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

type storeChunk struct {
	words []uint64
	// lo and hi bound the chunk's addresses.
	lo, hi uintptr
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
// the low bit clear, the referenced record is in the same chunk, at the
// field's address plus twice the ref, read as a signed number of bytes;
// otherwise, the rest is an index into the store's far nodes.
type nodeRef uint32

const refFar = 1

const wordSize = unsafe.Sizeof(uint64(0))

// rec returns the address of n's record.
func (n Node) rec() unsafe.Pointer { return n.p }

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.p) }

// store returns the store that owns n.
func (n Node) store() *nodeStore { return n.s }

// deref returns the node that the field f of a record of n's store refers
// to.
func (n Node) deref(f *nodeRef) Node {
	r := int32(*f)
	if r&refFar == 0 {
		if r == 0 {
			return Node{}
		}
		return Node{unsafe.Add(unsafe.Pointer(f), int(r)*2), n.s}
	}
	return n.s.far[uint32(r)>>1]
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
	if v.s == nil {
		*f = 0
		return
	}
	if v.s == s {
		if d, ok := s.offset(unsafe.Pointer(f), v.p); ok {
			*f = nodeRef(d)
			return
		}
	}
	if *f&refFar != 0 {
		// Slots are never shared, so the field's own slot can be reused.
		s.far[*f>>1] = v
		return
	}
	*f = nodeRef(s.farSlot(len(s.far)))
	s.far = append(s.far, v)
}

// offset returns the ref from the field at f to the record at p, if they
// are in the same chunk of s.
func (s *nodeStore) offset(f, p unsafe.Pointer) (uint32, bool) {
	c := s.chunkOf(uintptr(f))
	if c == nil || uintptr(p) < c.lo || uintptr(p) >= c.hi {
		return 0, false
	}
	return uint32(int32((int64(uintptr(p)) - int64(uintptr(f))) / 2)), true
}

// chunkOf returns the chunk holding address a, which is nearly always one
// of the latest.
func (s *nodeStore) chunkOf(a uintptr) *storeChunk {
	for i := len(s.chunks) - 1; i >= 0; i-- {
		if c := &s.chunks[i]; a >= c.lo && a < c.hi {
			return c
		}
	}
	return nil
}

func (s *nodeStore) farSlot(i int) uint32 {
	if i >= 1<<31 {
		panic("node store far ref overflow")
	}
	return uint32(i)<<1 | refFar
}

// A nodeAnchor refers to a node of a store from outside its records: the
// chunk, biased by one, and the word offset there. With anchorFar set, the
// rest is an index into the store's far nodes.
type nodeAnchor uint32

const (
	anchorFar        = 1 << 31
	anchorChunkShift = 23
	maxAnchorChunks  = 1<<(31-anchorChunkShift) - 1
	// maxChunkWords bounds chunks so that anchors can address every word.
	maxChunkWords = 1 << anchorChunkShift
)

func (s *nodeStore) anchor(v Node) nodeAnchor {
	if v.s == nil {
		return 0
	}
	if v.s == s {
		for i := range s.chunks {
			if c := &s.chunks[i]; uintptr(v.p) >= c.lo && uintptr(v.p) < c.hi {
				if i < maxAnchorChunks {
					return nodeAnchor((i+1)<<anchorChunkShift | int((uintptr(v.p)-c.lo)/wordSize))
				}
				break
			}
		}
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
	c := &s.chunks[r>>anchorChunkShift-1]
	return Node{unsafe.Pointer(&c.words[r&(maxChunkWords-1)]), s}
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
	p := s.alloc(unsafe.Sizeof(*new(T)))
	return (*T)(p), Node{p, s}
}

// alloc allocates size zeroed bytes for a record.
func (s *nodeStore) alloc(size uintptr) unsafe.Pointer {
	if s.frozen {
		panic("node store is frozen")
	}
	words := int((size + wordSize - 1) / wordSize)
	if words > len(s.free) {
		return s.grow(words)
	}
	p := unsafe.Pointer(unsafe.SliceData(s.free))
	s.free = s.free[words:]
	return p
}

// grow allocates words in a new chunk. A record never spans two chunks.
func (s *nodeStore) grow(words int) unsafe.Pointer {
	n := min(max(s.words/storeGrowthDivisor, minStoreWords), maxChunkWords)
	if len(s.chunks) == 0 {
		n = min(max(n, s.hint), maxChunkWords)
	}
	if words > n || words > maxChunkWords {
		// A record too large for a normal chunk gets one of its own, and
		// the current chunk stays in use.
		return s.addChunk(words)
	}
	p := s.addChunk(n)
	s.free = s.chunks[len(s.chunks)-1].words[words:]
	return p
}

func (s *nodeStore) addChunk(n int) unsafe.Pointer {
	words := make([]uint64, n)
	p := unsafe.Pointer(unsafe.SliceData(words))
	s.chunks = append(s.chunks, storeChunk{words, uintptr(p), uintptr(p) + uintptr(n)*wordSize})
	s.words += n
	return p
}

// Stores start small, since many, such as those for lazily parsed JSDoc,
// are tiny.
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
