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
// one store per file). Each node is a row in the record table for its
// layout; every record begins with the shared node header (nodeBaseData).
//
// Records live in fixed-size pages, so they never move while a store is
// being built and may be addressed directly. Once a parse completes, each
// layout that is not appended to afterwards is compacted into a single,
// exactly sized page and sealed.
type nodeStore struct {
	// base holds the record array of each sealed layout, which is indexed
	// directly; other layouts are paged.
	base    [layoutCount]unsafe.Pointer
	records [layoutCount]recordTable

	// Fields that hold Go pointers live in side tables rather than in the
	// records, so that the records themselves contain no pointers and the
	// garbage collector never scans them.
	symbols       sideTable[*Symbol]
	flowNodes     sideTable[*FlowNode]
	symbolTables  sideTable[SymbolTable]
	nodeLists     sideTable[*NodeList]
	modifierLists sideTable[*ModifierList]
	texts         textStore
	stringLists   sideTable[[]string]
	nodeSlices    sideTable[[]Node]
	values        sideTable[any]

	// Children stored in another store, or whose rows do not fit in a
	// nodeRef, are recorded as foreign refs. Readers load foreign without
	// locking; writers append under foreignMu, replacing foreign with a
	// larger copy when it is full, so published entries never change.
	foreign      unsafe.Pointer // *[foreignCap]Node, accessed atomically
	foreignMu    sync.Mutex
	foreignN     uint32
	foreignCap   uint32
	foreignIndex map[Node]nodeRef
}

func newNodeStore() *nodeStore {
	return &nodeStore{}
}

// nodeBaseData is the header at the start of every node record.
type nodeBaseData struct {
	id     atomic.Uint64
	loc    core.TextRange
	flags  NodeFlags
	parent nodeRef
}

// A nodeRef is a node reference stored within a store's records. A local
// ref packs the node's kind (biased by one, so that the zero nodeRef means
// "no node") and row, so it can be resolved without loading anything; with
// nodeRefForeign set, it is a row in the foreign table.
type nodeRef uint32

const (
	nodeRefRowBits         = 22
	nodeRefRowMask nodeRef = 1<<nodeRefRowBits - 1
	nodeRefForeign nodeRef = 1 << 31
	nodeRefMaxKind         = nodeRefForeign>>nodeRefRowBits - 1
	_              uint    = uint(nodeRefMaxKind) - uint(kindFlowReduceLabelData+1) // kinds must fit in a nodeRef
)

// refLayout maps the biased kind of a local nodeRef to its layout.
var refLayout = func() (t [1 << (32 - nodeRefRowBits)]uint16) {
	for k, l := range kindLayout {
		t[k+1] = uint16(l)
	}
	return t
}()

func (s *nodeStore) ref(n Node) nodeRef {
	if n.s == s && n.row>>nodeRefRowBits == 0 {
		return nodeRef(n.kind+1)<<nodeRefRowBits | nodeRef(n.row)
	}
	return s.refSlow(n)
}

func (s *nodeStore) refSlow(n Node) nodeRef {
	if n.s == nil {
		return 0
	}
	s.foreignMu.Lock()
	defer s.foreignMu.Unlock()
	if r, ok := s.foreignIndex[n]; ok {
		return r
	}
	if s.foreignIndex == nil {
		s.foreignIndex = make(map[Node]nodeRef)
	}
	i := s.foreignN
	if nodeRef(i)&nodeRefForeign != 0 {
		panic("too many foreign node references")
	}
	if i == s.foreignCap {
		s.foreignCap = max(8, 2*s.foreignCap)
		grown := make([]Node, s.foreignCap)
		if i != 0 {
			copy(grown, unsafe.Slice((*Node)(s.foreign), i))
		}
		grown[i] = n
		atomic.StorePointer(&s.foreign, unsafe.Pointer(unsafe.SliceData(grown)))
	} else {
		*(*Node)(unsafe.Add(s.foreign, uintptr(i)*unsafe.Sizeof(Node{}))) = n
	}
	s.foreignN++
	r := nodeRef(i) | nodeRefForeign
	s.foreignIndex[n] = r
	return r
}

func (s *nodeStore) deref(r nodeRef) Node {
	if r&nodeRefForeign != 0 {
		return *(*Node)(unsafe.Add(atomic.LoadPointer(&s.foreign), uintptr(r&^nodeRefForeign)*unsafe.Sizeof(Node{})))
	}
	if r == 0 {
		return Node{}
	}
	return Node{s: s, row: uint32(r & nodeRefRowMask), kind: Kind(r>>nodeRefRowBits) - 1, layout: refLayout[r>>nodeRefRowBits]}
}

func (s *nodeStore) newNode(kind Kind, layout nodeLayout, row uint32) Node {
	if kindLayout[kind] != layout {
		panic("node kind does not match its record layout")
	}
	return Node{s: s, row: row, kind: kind, layout: uint16(layout)}
}

// A recordTable addresses row r of an unsealed layout as
// dir[r>>shift] + (r & (1<<shift - 1)) * size.
type recordTable struct {
	dir    unsafe.Pointer // *[dirCap]unsafe.Pointer
	n      uint32
	size   uint32
	dirCap uint32
	shift  uint8
	sealed bool
}

// layoutSize is the record size of each layout.
var layoutSize = func() (t [layoutCount]uintptr) {
	for l := range t {
		if r := layoutRecord(nodeLayout(l)); r != nil {
			t[l] = reflect.TypeOf(r).Size()
		}
	}
	return t
}()

// at returns the record for row.
func (s *nodeStore) at(layout uint16, row uint32) unsafe.Pointer {
	if b := s.base[layout]; b != nil {
		return unsafe.Add(b, uintptr(row)*layoutSize[layout])
	}
	return s.pagedAt(layout, row)
}

func (s *nodeStore) pagedAt(layout uint16, row uint32) unsafe.Pointer {
	t := &s.records[layout]
	page := *(*unsafe.Pointer)(unsafe.Add(t.dir, uintptr(row>>t.shift)*unsafe.Sizeof(t.dir)))
	return unsafe.Add(page, uintptr(row&(1<<t.shift-1))*uintptr(t.size))
}

// Pages hold about this many bytes of records.
const (
	pageBytes       = 4096
	pinnedPageBytes = 512
)

// newRecord allocates a zeroed record of type T in the table for layout.
func newRecord[T any](s *nodeStore, layout nodeLayout) (*T, uint32) {
	t := &s.records[layout]
	if t.dir == nil {
		size := unsafe.Sizeof(*new(T))
		t.size = uint32(size)
		bytes := uintptr(pageBytes)
		if pinnedLayout(layout) {
			bytes = pinnedPageBytes
		}
		t.shift = uint8(max(0, bits.Len(uint(bytes/size))-1))
	} else if t.sealed {
		panic("node store layout is sealed")
	}
	i := t.n
	p := i >> t.shift
	off := i & (1<<t.shift - 1)
	if off == 0 {
		if p == t.dirCap {
			t.dirCap = max(1, 2*t.dirCap)
			dir := make([]unsafe.Pointer, t.dirCap)
			if p != 0 {
				copy(dir, unsafe.Slice((*unsafe.Pointer)(t.dir), p))
			}
			t.dir = unsafe.Pointer(unsafe.SliceData(dir))
		}
		*(*unsafe.Pointer)(unsafe.Add(t.dir, uintptr(p)*unsafe.Sizeof(t.dir))) = unsafe.Pointer(unsafe.SliceData(make([]T, 1<<t.shift)))
	}
	t.n++
	return (*T)(s.pagedAt(uint16(layout), i)), i
}

// pinnedLayout reports whether a layout's records must not move once
// parsing completes: *SourceFile is addressed by pointer, and the binder
// appends flow data records.
func pinnedLayout(layout nodeLayout) bool {
	switch layout {
	case layoutSourceFile, layoutFlowSwitchClauseData, layoutFlowReduceLabelData:
		return true
	}
	return false
}

// compact moves the rows of every unpinned layout into one exactly sized
// page and seals the layout. Rows keep their numbers, so existing Nodes
// remain valid, but record pointers obtained earlier do not; it must only
// be called before the store is shared, with no record pointers
// outstanding.
func (s *nodeStore) compact() {
	s.compactSide()
	for l := range s.records {
		t := &s.records[l]
		if t.n == 0 || t.sealed || pinnedLayout(nodeLayout(l)) {
			continue
		}
		flat := allocRecords(nodeLayout(l), int(t.n))
		pageLen := uintptr(t.size) << t.shift
		for p, copied := uint32(0), uintptr(0); copied < uintptr(t.n)*uintptr(t.size); p++ {
			page := *(*unsafe.Pointer)(unsafe.Add(t.dir, uintptr(p)*unsafe.Sizeof(t.dir)))
			n := min(pageLen, uintptr(t.n)*uintptr(t.size)-copied)
			copy(unsafe.Slice((*byte)(unsafe.Add(flat, copied)), n), unsafe.Slice((*byte)(page), n))
			copied += n
		}
		s.base[l] = flat
		t.dir = nil
		t.dirCap = 0
		t.sealed = true
	}
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
