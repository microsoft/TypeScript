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
// (nodeBaseData). A Node is a pointer to its record. Records never move,
// so a Node never goes stale, and holding one keeps its block alive.
//
// A block is a single Go object whose first word points to the store and
// whose remainder holds records. Records contain no Go pointers, so the
// garbage collector scans only that first word of each block. A record
// refers to another record of its store by a 32-bit ref giving the
// target's block and offset; references to other stores go through the
// store's far table, and fields holding other Go values through its side
// tables.
type nodeStore struct {
	block    unsafe.Pointer // the block being filled
	current  ref            // the index of the block being filled, as a ref
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

	// blocks holds every block, by index, keeping them alive, since a
	// block's records may only be referred to by other records.
	blocks  [maxBlocks]unsafe.Pointer
	nblocks uint32
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
	self   ref // the record's own location in its store
	kind   Kind
}

// Every node has a header, so it must stay small.
var _ [32 - unsafe.Sizeof(nodeBaseData{})]struct{}

// A ref is a record field referring to another record. Zero is no record.
// Without farRef, it locates the target in the referring record's store:
// the index of the target's block in the high bits, and the target's
// offset in that block, in words, in the low bits. Every record keeps its
// own location as its self, so a ref to a record is its self. With farRef,
// it is an index into the referring store's far table.
type ref uint32

const (
	farRef     ref = 1 << 31
	blockShift     = 25
	offsetMask ref = 1<<blockShift - 1
	maxBlocks      = int(farRef >> blockShift)
	// Records with Go pointers are each allocated alone, behind their own
	// store pointer, as a block of their own. A store has blocks for a
	// limited number of them; the rest are only referred to as far.
	unindexedBlock = maxBlocks - 1
)

// A nodeRef is a ref to a node record.
type nodeRef = ref

func (r ref) block() int { return int(r >> blockShift) }

const wordSize = unsafe.Sizeof(uintptr(0))

func (n Node) hdr() *nodeBaseData { return (*nodeBaseData)(n.p) }

// blockOf returns the block holding the record at p, whose self is self.
func blockOf(p unsafe.Pointer, self ref) unsafe.Pointer {
	return unsafe.Add(p, -int(self&offsetMask)*int(wordSize))
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

// deref returns the record that r, a field of the record at p whose self
// is self, refers to. Block 0 is never used, so a zero ref is never in the
// referring record's block.
func deref(p unsafe.Pointer, self ref, r ref) unsafe.Pointer {
	if r^self < 1<<blockShift {
		return unsafe.Add(p, int(int32(r-self))*int(wordSize))
	}
	return derefOther(p, self, r)
}

func derefOther(p unsafe.Pointer, self ref, r ref) unsafe.Pointer {
	if r == 0 {
		return nil
	}
	s := storeOf(blockOf(p, self))
	if r&farRef == 0 {
		return unsafe.Add(s.blocks[r.block()], uintptr(r&offsetMask)*wordSize)
	}
	return s.far.get(r &^ farRef)
}

// refTo returns a ref to the record at target, whose self is targetSelf,
// for a field of a record of s.
func (s *nodeStore) refTo(target unsafe.Pointer, targetSelf ref) ref {
	if target == nil {
		return 0
	}
	if targetSelf.block() != unindexedBlock && storeOf(blockOf(target, targetSelf)) == s {
		return targetSelf
	}
	return s.far.add(target) | farRef
}

// deref returns the node that the field f of n refers to.
func (n Node) deref(f *nodeRef) Node {
	return Node{deref(n.p, n.hdr().self, *f)}
}

// setRef makes the field f of n refer to v.
func (n Node) setRef(f *nodeRef, v Node) {
	*f = n.store().refNode(v)
}

// refAt returns a nodeRef to v for a field of the node record at owner,
// which must belong to s.
func (s *nodeStore) refAt(owner unsafe.Pointer, v Node) nodeRef {
	return s.refNode(v)
}

func (s *nodeStore) refNode(v Node) nodeRef {
	if v.p == nil {
		return 0
	}
	return s.refTo(v.p, v.hdr().self)
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
		(*nodeBaseData)(p).self = s.addStandalone(unsafe.Pointer(c))
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

// addStandalone returns the self of the record of the standalone block c,
// indexing c as a block of s if the store has used under half its block
// indexes.
func (s *nodeStore) addStandalone(c unsafe.Pointer) ref {
	s.reserveBlockZero()
	if s.nblocks < uint32(unindexedBlock)/2 {
		i := s.nblocks
		s.blocks[i] = c
		s.nblocks++
		return ref(i)<<blockShift | 1
	}
	return ref(unindexedBlock)<<blockShift | 1
}

// reserveBlockZero skips block index 0, so that the zero ref is never a
// ref within the referring record's block.
func (s *nodeStore) reserveBlockZero() {
	if s.nblocks == 0 {
		s.nblocks = 1
	}
}

// Each block adds a quarter to the store's size, at least minBlockSize,
// until the store has used half its block indexes, after which each block
// doubles it. Records do not move, so the unused end of the last block is
// never reclaimed; slower growth wastes less of it. Many stores, such as
// those for lazily parsed JSDoc, are tiny.
const minBlockSize = 512

// alloc allocates size zeroed bytes for a record and returns the record
// and its self.
func (s *nodeStore) alloc(size uintptr) (unsafe.Pointer, ref) {
	size = (size + wordSize - 1) &^ (wordSize - 1)
	if s.used+size > s.capacity {
		s.grow(size)
	}
	off := s.used
	s.used += size
	return unsafe.Add(s.block, off), s.current | ref(off/wordSize)
}

func (s *nodeStore) grow(size uintptr) {
	s.reserveBlockZero()
	growth := s.total / 4
	if s.nblocks >= uint32(unindexedBlock)/2 {
		growth = s.total
	}
	next := max(minBlockSize, growth, size+wordSize)
	if s.nblocks >= uint32(unindexedBlock) || next/wordSize > uintptr(offsetMask) {
		panic("node store too large")
	}
	typ := blockType(next)
	block := reflect.New(typ).UnsafePointer()
	*(**nodeStore)(block) = s
	s.block = block
	s.current = ref(s.nblocks) << blockShift
	s.blocks[s.nblocks] = block
	s.nblocks++
	s.used = wordSize
	s.capacity = min(typ.Size(), uintptr(offsetMask)*wordSize)
	s.total += s.capacity
}

// A farTable holds the targets of a store's refs leaving their blocks. It
// is appended to under its lock, but entries never move, so it is read
// without one.
type farTable struct {
	mu    sync.Mutex
	index map[unsafe.Pointer]ref
	pages [32 - farBaseShift]*unsafe.Pointer
	next  ref
}

// Far page k holds 1<<(k+farBaseShift) entries.
const farBaseShift = 4

func farLocate(i ref) (k, off uint32) {
	j := uint32(i) + 1<<farBaseShift
	k = uint32(bits.Len32(j)) - (farBaseShift + 1)
	return k, j - 1<<(k+farBaseShift)
}

func (t *farTable) get(i ref) unsafe.Pointer {
	k, off := farLocate(i)
	return *(*unsafe.Pointer)(unsafe.Add(unsafe.Pointer(t.pages[k]), uintptr(off)*wordSize))
}

func (t *farTable) add(p unsafe.Pointer) ref {
	t.mu.Lock()
	defer t.mu.Unlock()
	if i, ok := t.index[p]; ok {
		return i
	}
	i := t.next
	if i&farRef != 0 {
		panic("node store far table overflow")
	}
	k, off := farLocate(i)
	if t.pages[k] == nil {
		t.pages[k] = unsafe.SliceData(make([]unsafe.Pointer, 1<<(k+farBaseShift)))
	}
	*(*unsafe.Pointer)(unsafe.Add(unsafe.Pointer(t.pages[k]), uintptr(off)*wordSize)) = p
	t.next++
	if t.index == nil {
		t.index = make(map[unsafe.Pointer]ref)
	}
	t.index[p] = i
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
