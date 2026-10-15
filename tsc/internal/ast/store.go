package ast

import (
	"math/bits"
	"sync"
	"sync/atomic"
	"unsafe"

	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// A nodeStore holds the nodes created by one NodeFactory (for parsed files,
// one store per file). Each node is a row in the record table for its
// layout; every record begins with the shared node header (nodeBaseData).
// Rows never move once allocated, so records may be addressed directly and
// read concurrently once published, while a single owner appends.
type nodeStore struct {
	// Once a parse completes, each layout's rows are compacted into one
	// contiguous, exactly sized slice; rows appended afterwards go to the
	// segmented tail in records, numbered after the compacted rows.
	flat    [layoutCount]flatTable
	records [layoutCount]*recordTable

	// Children stored in another store, or whose rows do not fit in a
	// nodeRef, are recorded as foreign refs.
	foreignMu    sync.Mutex
	foreign      segTable[Node]
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

func (s *nodeStore) ref(n Node) nodeRef {
	if n.s == s && nodeRef(n.row) <= nodeRefRowMask {
		return nodeRef(n.kind+1)<<nodeRefRowBits | nodeRef(n.row)
	}
	if n.s == nil {
		return 0
	}
	return s.foreignRef(n)
}

func (s *nodeStore) foreignRef(n Node) nodeRef {
	s.foreignMu.Lock()
	defer s.foreignMu.Unlock()
	if r, ok := s.foreignIndex[n]; ok {
		return r
	}
	if s.foreignIndex == nil {
		s.foreignIndex = make(map[Node]nodeRef)
	}
	i, slot := s.foreign.alloc()
	if nodeRef(i)&nodeRefForeign != 0 {
		panic("too many foreign node references")
	}
	*slot = n
	r := nodeRef(i) | nodeRefForeign
	s.foreignIndex[n] = r
	return r
}

func (s *nodeStore) deref(r nodeRef) Node {
	if r&nodeRefForeign == 0 {
		if r == 0 {
			return Node{}
		}
		kind := Kind(r>>nodeRefRowBits) - 1
		return Node{s: s, row: uint32(r & nodeRefRowMask), kind: kind, layout: uint16(kindLayout[kind])}
	}
	return *s.foreign.at(uint32(r &^ nodeRefForeign))
}

func (s *nodeStore) newNode(kind Kind, layout nodeLayout, row uint32) Node {
	if kindLayout[kind] != layout {
		panic("node kind does not match its record layout")
	}
	return Node{s: s, row: row, kind: kind, layout: uint16(layout)}
}

// newRecord allocates a zeroed record of type T in the table for layout.
func newRecord[T any](s *nodeStore, layout nodeLayout) (*T, uint32) {
	t := s.records[layout]
	if t == nil {
		t = &recordTable{size: unsafe.Sizeof(*new(T)), compact: compactRecords[T]}
		s.records[layout] = t
	}
	i := t.n
	k, off := segLocate(i)
	if t.segs[k] == nil {
		t.segs[k] = unsafe.Pointer(unsafe.SliceData(make([]T, segLen(k))))
	}
	t.n++
	return (*T)(unsafe.Add(t.segs[k], uintptr(off)*t.size)), s.flat[layout].n + i
}

type flatTable struct {
	base unsafe.Pointer
	n    uint32
	size uint32
}

// at returns the record for row.
func (s *nodeStore) at(layout uint16, row uint32) unsafe.Pointer {
	f := &s.flat[layout]
	if row < f.n {
		return unsafe.Add(f.base, uintptr(row)*uintptr(f.size))
	}
	return s.tailAt(layout, row-f.n)
}

//go:noinline
func (s *nodeStore) tailAt(layout uint16, row uint32) unsafe.Pointer {
	return s.records[layout].at(row)
}

// pinnedLayout reports whether records of layout are addressed by pointer
// (*SourceFile and the flow data records), and so must never move.
func pinnedLayout(layout nodeLayout) bool {
	switch layout {
	case layoutSourceFile, layoutFlowSwitchClauseData, layoutFlowReduceLabelData:
		return true
	}
	return false
}

// compact moves the rows of every unpinned layout into one exactly sized
// slice. Rows keep their numbers, so existing Nodes remain valid, but
// record pointers obtained earlier do not; it must only be called before
// the store is shared, with no record pointers outstanding.
func (s *nodeStore) compact() {
	for l, t := range s.records {
		if t == nil || t.n == 0 {
			continue
		}
		f := &s.flat[l]
		if f.n != 0 {
			panic("node store compacted twice")
		}
		base := t.segs[0]
		if pinnedLayout(nodeLayout(l)) {
			// Pinned records cannot move, but rows that all fit in the
			// first segment are already contiguous.
			if t.n > segLen(0) {
				continue
			}
		} else {
			base = t.compact(t)
		}
		*f = flatTable{base: base, n: t.n, size: uint32(t.size)}
		t.segs = [segCount]unsafe.Pointer{}
		t.n = 0
	}
}

func compactRecords[T any](t *recordTable) unsafe.Pointer {
	flat := make([]T, t.n)
	for k, copied := uint32(0), 0; copied < len(flat); k++ {
		copied += copy(flat[copied:], unsafe.Slice((*T)(t.segs[k]), segLen(k)))
	}
	return unsafe.Pointer(unsafe.SliceData(flat))
}

// Segmented tables grow by adding segments of doubling length, so rows
// never move and the fixed segment directory is never reallocated.

const (
	segBaseShift = 3
	segCount     = 29
)

func segLen(k uint32) uint32 { return 1 << (k + segBaseShift) }

func segLocate(i uint32) (k, off uint32) {
	j := i + 1<<segBaseShift
	k = uint32(bits.Len32(j)) - (segBaseShift + 1)
	return k, j - segLen(k)
}

type segTable[T any] struct {
	segs [segCount]*T
	n    uint32
}

func (t *segTable[T]) at(i uint32) *T {
	k, off := segLocate(i)
	return (*T)(unsafe.Add(unsafe.Pointer(t.segs[k]), uintptr(off)*unsafe.Sizeof(*new(T))))
}

func (t *segTable[T]) alloc() (uint32, *T) {
	i := t.n
	k, off := segLocate(i)
	if t.segs[k] == nil {
		t.segs[k] = unsafe.SliceData(make([]T, segLen(k)))
	}
	t.n++
	return i, (*T)(unsafe.Add(unsafe.Pointer(t.segs[k]), uintptr(off)*unsafe.Sizeof(*new(T))))
}

// recordTable is an untyped segTable; each segment is allocated with its
// record type so the garbage collector sees the records' real layout.
type recordTable struct {
	segs    [segCount]unsafe.Pointer
	n       uint32
	size    uintptr
	compact func(*recordTable) unsafe.Pointer
}

func (t *recordTable) at(i uint32) unsafe.Pointer {
	k, off := segLocate(i)
	return unsafe.Add(t.segs[k], uintptr(off)*t.size)
}
