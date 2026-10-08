// Package linkarena allocates memory for objects that refer to each other through 32-bit
// links instead of pointers.
//
// An Arena hands out memory from chunks. A chunk is an ordinary Go allocation of one or
// more 8 KiB pages whose contents the garbage collector treats as plain bytes: apart from
// one pointer back to the arena, nothing stored in a chunk is scanned. Every page has a
// number, and a process-wide table maps page numbers to page addresses. A [Link] is a page
// number together with a position inside that page; see [At] and [LinkTo].
//
// Lifetimes are managed by the garbage collector. A pointer into arena memory keeps its
// chunk alive, the chunk keeps its arena alive, and the arena keeps all of its chunks alive,
// so everything allocated from one arena lives as long as any part of it is referenced.
// The page table holds plain addresses and keeps nothing alive; when a chunk is collected
// its page numbers are reused.
//
// Because the collector does not look inside chunks, whatever is stored there does not keep
// its target alive. Callers must uphold two rules:
//
//   - A pointer to memory outside arenas (a string, a slice, any Go object) that is stored
//     in arena memory must be registered with [Arena.Keep], unless something else is
//     guaranteed to keep the target alive for as long as the arena.
//   - A link or pointer from one arena into another must be recorded, so that the first
//     arena keeps the second alive. [LinkTo] does this for links; [Refer] does it for
//     pointers.
//
// Setting the TSGO_ASTVERIFY environment variable to 1 makes arenas record the type of every
// allocation so that [Arena.Verify] can check both rules.
package linkarena

import (
	"os"
	"reflect"
	"runtime"
	"slices"
	"sync"
	"sync/atomic"
	"unsafe"
)

const (
	pageShift = 13
	// The size of a page of the Go allocator. An allocation that fills a whole number of
	// these pages starts at a page boundary, or a fixed 8 bytes after it when the allocator
	// puts a header of its own in front. That is what lets the page header of any object be
	// found from its address; newChunk checks it for every chunk.
	pageSize = 1 << pageShift
	pageMask = pageSize - 1

	// Positions inside a page are counted in units of 8 bytes.
	unitShift  = 3
	offsetBits = pageShift - unitShift
	offsetMask = 1<<offsetBits - 1

	// 2^22 pages of 8 KiB: 32 GiB of arena memory can be live at a time.
	maxPages = 1 << (32 - offsetBits)

	headerSize = unsafe.Sizeof(pageHeader{})
	// The last word of a page is not used: in the last page of a chunk it may lie outside
	// the chunk's allocation.
	pageEnd = pageSize - 8

	// The largest allocation that fits in a page.
	maxAlloc = pageEnd - headerSize

	maxChunkPages = 8
)

// A Link identifies an object in arena memory. The zero Link refers to nothing.
type Link uint32

// pageHeader is the start of every page. Only the arena and id fields are the package's
// own. In the first page of a chunk, arena is a pointer the collector sees (see chunk); in
// the other pages it is a copy that the collector ignores.
type pageHeader struct {
	_     uintptr // the allocator's header in the first page of some chunks
	arena *Arena
	_     uintptr // the second arena pointer in the first page of some chunks
	id    uint32
	_     uint32
}

// The address of every page by page number, zero for numbers that are not in use. The
// entries are addresses rather than pointers so that the table keeps no chunk alive. The
// table is only touched for numbers that have been handed out.
var pages [maxPages]uintptr

var (
	mu sync.Mutex
	// Page number 0 is never used, so that the zero Link is never a valid one.
	nextPageID  uint32 = 1
	freePageIDs []uint32
)

var verifying = os.Getenv("TSGO_ASTVERIFY") == "1" //nolint:forbidigo

// At returns the address a link refers to, or nil for the zero Link.
func At(l Link) unsafe.Pointer {
	if l == 0 {
		return nil
	}
	// Loading the entry as a pointer, rather than converting an integer, is what makes the
	// result a pointer the collector and the pointer checker accept. The chunk it points
	// into is alive because the memory that held the link keeps it so.
	page := atomic.LoadPointer((*unsafe.Pointer)(unsafe.Pointer(&pages[l>>offsetBits])))
	return unsafe.Add(page, uintptr(l&offsetMask)<<unitShift)
}

func pageOf(p unsafe.Pointer) *pageHeader {
	return (*pageHeader)(unsafe.Pointer(uintptr(p) &^ pageMask))
}

// checkedPageOf returns the header of the page that holds p and panics when p is not arena
// memory.
func checkedPageOf(p unsafe.Pointer) *pageHeader {
	h := pageOf(p)
	if id := h.id; id >= maxPages || atomic.LoadUintptr(&pages[id]) != uintptr(unsafe.Pointer(h)) {
		panic("linkarena: pointer to memory that was not allocated from an arena")
	}
	return h
}

// Of returns the arena that p was allocated from. It panics when p is not arena memory.
func Of(p unsafe.Pointer) *Arena {
	return checkedPageOf(p).arena
}

// LinkTo returns a link to target for storing in the memory at holder. Both must be arena
// memory. When they belong to different arenas, holder's arena is made to keep target's
// arena alive.
func LinkTo(holder unsafe.Pointer, target unsafe.Pointer) Link {
	if target == nil {
		return 0
	}
	t := checkedPageOf(target)
	if h := pageOf(holder); h.arena != t.arena {
		checkedPageOf(holder).arena.use(t.arena)
	}
	return Link(t.id<<offsetBits | uint32(uintptr(target)&pageMask)>>unitShift)
}

// Refer records that the memory at holder contains a pointer to target. Both must be arena
// memory. When they belong to different arenas, holder's arena is made to keep target's
// arena alive.
func Refer(holder unsafe.Pointer, target unsafe.Pointer) {
	if h, t := pageOf(holder), pageOf(target); h.arena != t.arena {
		checkedPageOf(holder).arena.use(checkedPageOf(target).arena)
	}
}

// Arena allocates memory that is released as a whole once nothing refers to any of it.
// Allocation is not safe for concurrent use; Keep and the recording of references between
// arenas are.
type Arena struct {
	// The page being allocated from and the number of bytes used in it.
	page unsafe.Pointer
	used uintptr
	// The chunk that page belongs to.
	chunkBase unsafe.Pointer
	chunkSize uintptr
	pagesLeft int
	// The number of bytes the owner still expects to allocate, used to size chunks.
	hint int
	// The number of pages in the most recent chunk allocated beyond the hint.
	grown int

	// Every chunk of the arena, and their address ranges in sorted order.
	chunks []unsafe.Pointer
	ranges []addrRange
	size   int

	mu sync.Mutex
	// Objects outside arenas that this arena's memory points to.
	kept     []unsafe.Pointer
	lastKept atomic.Uintptr
	// Arenas that this arena's memory points into.
	uses    map[*Arena]struct{}
	lastUse atomic.Pointer[Arena]

	verify *verifyState
}

// NewArena creates an arena. sizeHint is the number of bytes the caller expects to allocate,
// or zero when it does not know.
func NewArena(sizeHint int) *Arena {
	a := &Arena{used: pageEnd, hint: sizeHint}
	if verifying {
		a.verify = &verifyState{}
	}
	return a
}

// Alloc returns size bytes of zeroed memory aligned to 8 bytes. size must not exceed
// MaxAlloc.
func (a *Arena) Alloc(size uintptr) unsafe.Pointer {
	return a.allocAligned((size + 7) &^ 7)
}

// MaxAlloc is the largest size Alloc accepts.
const MaxAlloc = maxAlloc

func (a *Arena) allocAligned(size uintptr) unsafe.Pointer {
	used := a.used
	if end := used + size; end <= pageEnd {
		a.used = end
		return unsafe.Add(a.page, used)
	}
	return a.allocSlow(size)
}

func (a *Arena) allocSlow(size uintptr) unsafe.Pointer {
	if size > maxAlloc {
		panic("linkarena: allocation does not fit in a page")
	}
	if a.pagesLeft > 0 {
		a.page = unsafe.Add(a.page, pageSize)
		a.pagesLeft--
	} else {
		a.grow()
	}
	a.used = headerSize + size
	return unsafe.Add(a.page, headerSize)
}

// grow adds a chunk to the arena.
func (a *Arena) grow() {
	// Chunks are as large as the owner's estimate allows, so that little is left unused when
	// the estimate is right. Beyond the estimate, chunk sizes double.
	n := 1
	if a.hint >= pageSize {
		n = min(a.hint>>pageShift, maxChunkPages)
		n = 1 << (bitLen(uint(n)) - 1)
	} else {
		if a.grown > 0 {
			n = min(a.grown*2, maxChunkPages)
		}
		a.grown = n
	}
	a.hint -= n << pageShift
	base := newChunk(a, n)
	a.chunks = append(a.chunks, base)
	r := addrRange{lo: uintptr(base), hi: uintptr(base) + uintptr(n)<<pageShift}
	i, _ := slices.BinarySearchFunc(a.ranges, r, compareRanges)
	// Verify reads the ranges of other arenas.
	a.mu.Lock()
	a.ranges = slices.Insert(a.ranges, i, r)
	a.mu.Unlock()
	a.size += n << pageShift
	a.page = base
	a.chunkBase = base
	a.chunkSize = uintptr(n) << pageShift
	a.pagesLeft = n - 1
}

func bitLen(x uint) int {
	n := 0
	for ; x != 0; x >>= 1 {
		n++
	}
	return n
}

// chunk is the Go object behind a chunk of n pages: two pointers to the arena followed by
// plain bytes, n*pageSize-8 bytes in all. The allocator places such an object either at a
// page boundary or, when it prepends an 8-byte header of its own, 8 bytes after one. Either
// way the chunk covers n pages from that boundary except for the last word, and one of the
// two pointers lands in pageHeader.arena of the first page.
type chunk[B any] struct {
	arena0, arena1 *Arena
	_              B
}

// newChunk allocates a chunk of n pages for a, numbers its pages and returns the address of
// its first page.
func newChunk(a *Arena, n int) unsafe.Pointer {
	switch n {
	case 1:
		return initChunk(new(chunk[[1*pageSize - 24]byte]), a, n)
	case 2:
		return initChunk(new(chunk[[2*pageSize - 24]byte]), a, n)
	case 4:
		return initChunk(new(chunk[[4*pageSize - 24]byte]), a, n)
	case 8:
		return initChunk(new(chunk[[8*pageSize - 24]byte]), a, n)
	}
	panic("linkarena: unsupported chunk size")
}

type pageIDs struct {
	n   int
	ids [maxChunkPages]uint32
}

func initChunk[B any](c *chunk[B], a *Arena, n int) unsafe.Pointer {
	offset := uintptr(unsafe.Pointer(c)) & pageMask
	if offset != 0 && offset != 8 {
		// Links are computed from addresses on the assumption stated at pageSize.
		panic("linkarena: the Go allocator placed a chunk where its pages cannot be found")
	}
	base := unsafe.Add(unsafe.Pointer(c), -int(offset))
	c.arena0, c.arena1 = a, a
	ids := pageIDs{n: n}
	mu.Lock()
	for i := range n {
		if k := len(freePageIDs); k > 0 {
			ids.ids[i] = freePageIDs[k-1]
			freePageIDs = freePageIDs[:k-1]
		} else {
			if nextPageID == maxPages {
				mu.Unlock()
				panic("linkarena: more than 32 GiB of arena memory is in use")
			}
			ids.ids[i] = nextPageID
			nextPageID++
		}
	}
	mu.Unlock()
	for i := range n {
		h := (*pageHeader)(unsafe.Add(base, i<<pageShift))
		if i > 0 {
			// Not a pointer the collector sees: past its first words the chunk is plain bytes.
			*(*uintptr)(unsafe.Pointer(&h.arena)) = uintptr(unsafe.Pointer(a))
		}
		h.id = ids.ids[i]
		atomic.StoreUintptr(&pages[ids.ids[i]], uintptr(unsafe.Pointer(h)))
	}
	// Runs once the chunk has been collected, when no link into it can be followed any more.
	runtime.AddCleanup(c, releasePages, ids)
	return base
}

func releasePages(ids pageIDs) {
	for _, id := range ids.ids[:ids.n] {
		atomic.StoreUintptr(&pages[id], 0)
	}
	mu.Lock()
	freePageIDs = append(freePageIDs, ids.ids[:ids.n]...)
	mu.Unlock()
}

// Size returns the number of bytes of chunks the arena holds.
func (a *Arena) Size() int {
	return a.size
}

// Contains reports whether p points into the arena's memory.
func (a *Arena) Contains(p unsafe.Pointer) bool {
	addr := uintptr(p)
	return addr-uintptr(a.chunkBase) < a.chunkSize || inRanges(a.ranges, addr)
}

type addrRange struct {
	lo, hi uintptr
}

func compareRanges(a, b addrRange) int {
	switch {
	case a.lo < b.lo:
		return -1
	case a.lo > b.lo:
		return 1
	}
	return 0
}

// inRanges reports whether addr lies in one of the sorted, disjoint ranges.
func inRanges(ranges []addrRange, addr uintptr) bool {
	i, found := slices.BinarySearchFunc(ranges, addrRange{lo: addr}, compareRanges)
	return found || i > 0 && addr < ranges[i-1].hi
}

// Keep keeps the object that p points into alive for as long as the arena. size is the
// number of bytes at p that arena memory may point into; it is only used by Verify. Keep is
// safe for concurrent use.
func (a *Arena) Keep(p unsafe.Pointer, size uintptr) {
	if p == nil || a.lastKept.Load() == uintptr(p) {
		return
	}
	a.mu.Lock()
	a.kept = append(a.kept, p)
	a.lastKept.Store(uintptr(p))
	if a.verify != nil {
		a.verify.kept = append(a.verify.kept, addrRange{lo: uintptr(p), hi: uintptr(p) + max(size, 1)})
	}
	a.mu.Unlock()
}

// KeepSlice keeps the backing array of s alive for as long as the arena.
func KeepSlice[T any](a *Arena, s []T) {
	if cap(s) != 0 {
		a.Keep(unsafe.Pointer(unsafe.SliceData(s)), uintptr(cap(s))*unsafe.Sizeof(s[0]))
	}
}

// Use makes the arena keep the arena that holds target alive. target must be arena memory.
func (a *Arena) Use(target unsafe.Pointer) {
	if b := pageOf(target).arena; b != a {
		a.use(checkedPageOf(target).arena)
	}
}

func (a *Arena) use(b *Arena) {
	if a == b || a.lastUse.Load() == b {
		return
	}
	a.mu.Lock()
	if _, ok := a.uses[b]; !ok {
		if a.uses == nil {
			a.uses = make(map[*Arena]struct{})
		}
		a.uses[b] = struct{}{}
	}
	a.lastUse.Store(b)
	a.mu.Unlock()
}

// New allocates a zeroed T in the arena.
func New[T any](a *Arena) *T {
	var zero T
	p := a.allocAligned((unsafe.Sizeof(zero) + 7) &^ 7)
	if a.verify != nil {
		a.verify.record(p, reflect.TypeFor[T](), 1)
	}
	return (*T)(p)
}

// MakeSlice allocates a zeroed slice with the given length and capacity. A slice that does
// not fit in a page is allocated outside the arena and kept alive by it.
func MakeSlice[T any](a *Arena, length int, capacity int) []T {
	if capacity == 0 {
		return nil
	}
	var zero T
	size := unsafe.Sizeof(zero) * uintptr(capacity)
	if size > maxAlloc {
		s := make([]T, length, capacity)
		KeepSlice(a, s)
		return s
	}
	p := a.allocAligned((size + 7) &^ 7)
	if a.verify != nil {
		a.verify.record(p, reflect.TypeFor[T](), capacity)
	}
	return unsafe.Slice((*T)(p), capacity)[:length]
}
