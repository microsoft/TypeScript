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
// blocks, every record beginning with the shared node header
// (nodeBaseData). A Node is a pointer to its record, and holding one keeps
// its block alive.
//
// A block is a single Go object whose first word points to the store and
// whose remainder holds records. Records contain no Go pointers, so the
// garbage collector scans only that first word of each block. A record
// refers to another record in the same block by a 32-bit offset from the
// referring field; references leaving the block go through the store's
// far table, and fields holding other Go values through its side tables.
type nodeStore struct {
	block    unsafe.Pointer // the block being filled
	used     uintptr        // bytes used in the current block
	capacity uintptr        // size of the current block
	total    uintptr        // size of all blocks

	symbols       sideTable[*Symbol]
	symbolTables  sideTable[SymbolTable]
	nodeLists     sideTable[*NodeList]
	modifierLists sideTable[*ModifierList]
	texts         textStore
	stringLists   sideTable[[]string]
	nodeSlices    sideTable[[]Node]
	values        sideTable[any]

	far farTable

	// blocks keeps every block alive, since a block's records may only be
	// referred to by other records.
	blocks []unsafe.Pointer
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
	self   uint32 // the record's offset in its block, in words
	kind   Kind
}

// Every node has a header, so it must stay small.
var _ [32 - unsafe.Sizeof(nodeBaseData{})]struct{}

// A ref is a record field referring to another record. Zero is no record.
// With its low bit set, it is the target's offset in bytes from the field
// itself, plus one, and the target is in the field's block. Otherwise it
// is an index into the far table of the referring record's store, shifted
// left by one. Field and target addresses are both multiples of four, so
// offsets never have the low bit set.
type ref uint32

// A nodeRef is a ref to a node record.
type nodeRef = ref

const wordSize = unsafe.Sizeof(uintptr(0))

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.p) }

// blockOf returns the block holding the record at p, whose self is self.
func blockOf(p unsafe.Pointer, self uint32) unsafe.Pointer {
	return unsafe.Add(p, -int(self)*int(wordSize))
}

// storeOf returns the store owning block.
func storeOf(block unsafe.Pointer) *nodeStore {
	return *(**nodeStore)(block)
}

// store returns the store that owns n.
func (n Node) store() *nodeStore {
	return storeOf(n.block())
}

func (n Node) block() unsafe.Pointer { return blockOf(n.p, n.hdr().self) }

// derefAt returns the record that the ref field f refers to. The field
// belongs to the record at rec, whose self is self. It makes no calls, so
// that it inlines into every accessor.
func derefAt(f *ref, rec unsafe.Pointer, self uint32) unsafe.Pointer {
	r := *f
	if r&1 != 0 {
		return unsafe.Add(unsafe.Pointer(f), int32(r)-1)
	}
	if r == 0 {
		return nil
	}
	return (*storeOf(blockOf(rec, self)).far.items.Load())[r>>1]
}

// setRefAt makes the ref field f, of the record at rec whose self is self,
// refer to the record at target, whose self is targetSelf.
func setRefAt(f *ref, rec unsafe.Pointer, self uint32, target unsafe.Pointer, targetSelf uint32) {
	if target == nil {
		*f = 0
		return
	}
	block := blockOf(rec, self)
	if blockOf(target, targetSelf) == block {
		*f = ref(int32(uintptr(target)-uintptr(unsafe.Pointer(f)))) | 1
		return
	}
	*f = storeOf(block).far.add(target) << 1
}

// deref returns the node that the field f of n refers to.
func (n Node) deref(f *nodeRef) Node {
	return Node{derefAt(f, n.p, n.hdr().self)}
}

// setRef makes the field f of n refer to v.
func (n Node) setRef(f *nodeRef, v Node) {
	setNodeRef(f, n.p, v)
}

// setNodeRef makes the field f of the record at rec refer to v.
func setNodeRef(f *nodeRef, rec unsafe.Pointer, v Node) {
	if v.p == nil {
		*f = 0
		return
	}
	setRefAt(f, rec, (*nodeBaseData)(rec).self, v.p, v.hdr().self)
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
		(*nodeBaseData)(p).self = 1
		return &c.rec, p
	}
	p, self := s.alloc(unsafe.Sizeof(*new(T)))
	(*nodeBaseData)(p).self = self
	return (*T)(p), p
}

type standaloneRecord[T any] struct {
	s   *nodeStore
	rec T
}

// standaloneLayout reports whether a layout's records hold Go pointers, so
// must be allocated outside the blocks.
func standaloneLayout(layout nodeLayout) bool {
	return layout == layoutSourceFile
}

// Each block adds a quarter to the store's size, at least minBlockSize.
// Records do not move, so the unused end of the last block is never
// reclaimed; slower growth wastes less of it. Many stores, such as those
// for lazily parsed JSDoc, are tiny.
const minBlockSize = 512

// maxBlockSize keeps the byte offset between any two places in a block
// within an int32, so that near refs can hold it.
const maxBlockSize = 1 << 30

// alloc allocates size zeroed bytes for a record and returns the record
// and its self.
func (s *nodeStore) alloc(size uintptr) (unsafe.Pointer, uint32) {
	size = (size + wordSize - 1) &^ (wordSize - 1)
	if s.used+size > s.capacity {
		s.grow(size)
	}
	off := s.used
	s.used += size
	return unsafe.Add(s.block, off), uint32(off / wordSize)
}

func (s *nodeStore) grow(size uintptr) {
	next := min(max(minBlockSize, s.total/4, size+wordSize), maxBlockSize)
	block, capacity := newBlock(s, next)
	s.block = block
	s.blocks = append(s.blocks, block)
	s.used = wordSize
	s.capacity = capacity
	s.total += capacity
}

// newBlock allocates a block of at least size bytes for s, returning it
// and its size.
func newBlock(s *nodeStore, size uintptr) (unsafe.Pointer, uintptr) {
	typ := blockType(size)
	block := reflect.New(typ).UnsafePointer()
	*(**nodeStore)(block) = s
	return block, min(typ.Size(), maxBlockSize)
}

// A farTable holds the targets of a store's refs leaving their blocks, as
// real pointers, keeping them alive. It is appended to under its lock, and
// grows by copying, so it is read without one. Index 0 is unused, so that
// a far ref is never zero.
type farTable struct {
	mu    sync.Mutex
	items atomic.Pointer[[]unsafe.Pointer]
	next  ref
}

func (t *farTable) add(p unsafe.Pointer) ref {
	t.mu.Lock()
	defer t.mu.Unlock()
	if t.next == 0 {
		t.next = 1
	}
	i := t.next
	if i >= 1<<31 {
		panic("node store far table overflow")
	}
	items := t.items.Load()
	if items == nil || int(i) >= len(*items) {
		grown := make([]unsafe.Pointer, max(16, 2*int(i)))
		if items != nil {
			copy(grown, *items)
		}
		items = &grown
		t.items.Store(items)
	}
	(*items)[i] = p
	t.next++
	return i
}

var blockTypes sync.Map // map[uintptr]reflect.Type

// blockType returns a struct type holding a store pointer followed by at
// least size-wordSize bytes of records. Sizes are rounded so that few
// distinct types are created.
func blockType(size uintptr) reflect.Type {
	var step uintptr
	switch {
	case size <= 32<<10:
		step = minBlockSize
	case size <= 256<<10:
		step = 4 << 10
	default:
		step = uintptr(1) << (bits.Len(uint(size)) - 4)
	}
	size = (size + step - 1) &^ (step - 1)
	if t, ok := blockTypes.Load(size); ok {
		return t.(reflect.Type)
	}
	t, _ := blockTypes.LoadOrStore(size, reflect.StructOf([]reflect.StructField{
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
