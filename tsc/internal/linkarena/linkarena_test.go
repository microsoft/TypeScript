package linkarena

import (
	"runtime"
	"sync/atomic"
	"testing"
	"time"
	"unsafe"

	"gotest.tools/v3/assert"
)

type testNode struct {
	parent *testNode
	child  Link
	text   string
	list   []*testNode
	value  int
}

func (n *testNode) setChild(c *testNode) { n.child = LinkTo(unsafe.Pointer(n), unsafe.Pointer(c)) }
func (n *testNode) getChild() *testNode  { return (*testNode)(At(n.child)) }

func collect() {
	for range 3 {
		runtime.GC()
	}
}

func eventually(t *testing.T, what string, done func() bool) {
	t.Helper()
	deadline := time.Now().Add(10 * time.Second)
	for !done() {
		if time.Now().After(deadline) {
			t.Fatal(what)
		}
		runtime.GC()
		time.Sleep(time.Millisecond)
	}
}

func TestChunksArePageAligned(t *testing.T) {
	t.Parallel()
	// The assumption the whole package rests on; see pageSize.
	a := NewArena(0)
	for range 200 {
		a.grow()
	}
	sizes := map[uintptr]bool{}
	for _, r := range a.ranges {
		assert.Equal(t, r.lo&pageMask, uintptr(0))
		sizes[r.hi-r.lo] = true
	}
	assert.Equal(t, len(sizes), 4)
}

func TestAlloc(t *testing.T) {
	t.Parallel()
	a := NewArena(0)
	var previous unsafe.Pointer
	for _, size := range []uintptr{1, 8, 24, 100, 4000, 4000, 4000, MaxAlloc, 40} {
		p := a.Alloc(size)
		assert.Assert(t, p != previous)
		assert.Equal(t, uintptr(p)%8, uintptr(0))
		assert.Assert(t, uintptr(p)&pageMask >= headerSize)
		assert.Assert(t, uintptr(p)&pageMask+size <= pageEnd, "allocation crosses a page")
		assert.Assert(t, a.Contains(p))
		assert.Assert(t, a.Contains(unsafe.Add(p, size-1)))
		assert.Equal(t, Of(p), a)
		b := unsafe.Slice((*byte)(p), size)
		for _, v := range b {
			assert.Equal(t, v, byte(0))
		}
		for i := range b {
			b[i] = 0xff
		}
		previous = p
	}
	// Page headers survive allocations that fill their pages.
	for _, r := range a.ranges {
		for page := r.lo; page < r.hi; page += pageSize {
			assert.Equal(t, atomic.LoadUintptr(&pages[(*pageHeader)(*(*unsafe.Pointer)(unsafe.Pointer(&page))).id]), page)
		}
	}
	onHeap := new(testNode)
	assert.Assert(t, !a.Contains(unsafe.Pointer(onHeap)))
	assert.Assert(t, MakeSlice[int](a, 0, 0) == nil)
	runtime.KeepAlive(a)
}

func TestChunkSizes(t *testing.T) {
	t.Parallel()
	sizeAfter := func(hint int, allocated int) int {
		a := NewArena(hint)
		for n := 0; n < allocated; n += 64 {
			a.Alloc(64)
		}
		return a.Size()
	}
	// Without an estimate chunks double; with one, little is left unused when it was right.
	assert.Equal(t, sizeAfter(0, 64), pageSize)
	assert.Assert(t, sizeAfter(0, 1<<20) < 1<<20+1<<17)
	for _, hint := range []int{3000, 20000, 100000, 1 << 20} {
		size := sizeAfter(hint, hint)
		assert.Assert(t, size < hint+hint/50+2*pageSize, "hint %d: %d bytes of chunks", hint, size)
	}
}

func TestLinks(t *testing.T) {
	t.Parallel()
	a := NewArena(0)
	root := New[testNode](a)
	node := root
	const count = 20000
	for i := 1; i <= count; i++ {
		next := New[testNode](a)
		next.value = i
		node.setChild(next)
		node = next
	}
	assert.Assert(t, len(a.chunks) > 4)
	n := 0
	for node = root; node != nil; node = node.getChild() {
		assert.Equal(t, node.value, n)
		assert.Equal(t, Of(unsafe.Pointer(node)), a)
		n++
	}
	assert.Equal(t, n, count+1)
	assert.Assert(t, At(0) == nil)
	assert.Equal(t, LinkTo(unsafe.Pointer(root), nil), Link(0))

	list := MakeSlice[*testNode](a, 0, 4)
	list = append(list, root)
	assert.Assert(t, a.Contains(unsafe.Pointer(unsafe.SliceData(list))))
	big := MakeSlice[*testNode](a, 2000, 2000)
	assert.Assert(t, !a.Contains(unsafe.Pointer(unsafe.SliceData(big))))
	runtime.KeepAlive(a)
}

func TestNotArenaMemory(t *testing.T) {
	t.Parallel()
	if raceEnabled {
		t.Skip("the pointer checker stops the process before the package can panic")
	}
	a := NewArena(0)
	node := New[testNode](a)
	onHeap := new([4 * pageSize]byte)
	check := func(f func()) {
		defer func() { assert.Assert(t, recover() != nil) }()
		f()
	}
	check(func() { LinkTo(unsafe.Pointer(node), unsafe.Pointer(&onHeap[2*pageSize+64])) })
	check(func() { Of(unsafe.Pointer(&onHeap[2*pageSize+64])) })
	check(func() { a.Alloc(MaxAlloc + 1) })
}

// build returns a pointer into the middle of a two-arena structure and nothing else.
//
//go:noinline
func build(freed chan<- string) *testNode {
	a, b := NewArena(0), NewArena(0)
	root := New[testNode](a)
	node := root
	for range 3000 {
		next := New[testNode](a)
		node.setChild(next)
		node = next
	}
	other := New[testNode](b)
	other.value = 42
	node.setChild(other)

	kept, lost := &testNode{value: 1}, &testNode{value: 2}
	runtime.SetFinalizer(kept, func(*testNode) { freed <- "kept" })
	runtime.SetFinalizer(lost, func(*testNode) { freed <- "lost" })
	root.parent = kept
	a.Keep(unsafe.Pointer(kept), unsafe.Sizeof(*kept))
	root.list = MakeSlice[*testNode](a, 1, 1)
	root.list[0] = lost
	return root.getChild().getChild()
}

func TestLifetime(t *testing.T) {
	t.Parallel()
	freed := make(chan string, 2)
	// The only reference to the arenas is the node pointer inside this function.
	firstPage := func() uint32 {
		node := build(freed)

		// The collector does not look inside chunks, so only the registered object survives.
		collect()
		select {
		case name := <-freed:
			assert.Equal(t, name, "lost")
		case <-time.After(10 * time.Second):
			t.Fatal("the unregistered object was not collected")
		}
		// One pointer into the arena keeps all of it alive, along with the arena it links
		// into and the object it keeps.
		collect()
		assert.Equal(t, len(freed), 0)
		steps := 0
		last := node
		for n := node; n != nil; n = n.getChild() {
			last = n
			steps++
		}
		assert.Equal(t, steps, 3000)
		assert.Equal(t, last.value, 42)
		return pageOf(unsafe.Pointer(node)).id
	}()

	// Once nothing points into the arena, everything goes, and the page numbers are free.
	eventually(t, "the kept object was not released", func() bool { return len(freed) == 1 })
	assert.Equal(t, <-freed, "kept")
	eventually(t, "the page number was not released", func() bool { return atomic.LoadUintptr(&pages[firstPage]) == 0 })
}

func TestVerify(t *testing.T) {
	t.Parallel()
	a, b, c := NewArena(0), NewArena(0), NewArena(0)
	for _, arena := range []*Arena{a, b, c} {
		arena.verify = &verifyState{}
	}
	alloc := func(arena *Arena) *testNode { return New[testNode](arena) }
	problems := func() []string {
		var result []string
		for _, v := range a.Verify(10) {
			result = append(result, v.Field+": "+v.Problem)
		}
		return result
	}

	node, child := alloc(a), alloc(a)
	node.setChild(child)
	child.parent = node
	child.text = "static"
	node.list = MakeSlice[*testNode](a, 1, 2)
	node.list[0] = child
	assert.Equal(t, len(problems()), 0)

	// A link into another arena is recorded by LinkTo, a pointer is not.
	inB, inC := alloc(b), alloc(c)
	child.setChild(inB)
	assert.Equal(t, len(problems()), 0)
	child.parent = inC
	if CanFindGoHeapPointers() {
		assert.DeepEqual(t, problems(), []string{".parent: a pointer to Go memory that this arena does not keep alive"})
	}
	Refer(unsafe.Pointer(child), unsafe.Pointer(inC))
	assert.Equal(t, len(problems()), 0)

	// A link whose page is gone, and a link into an arena that is not kept alive.
	saved := child.child
	child.child = Link(maxPages-1) << offsetBits
	assert.DeepEqual(t, problems(), []string{".child: a link to a page that is not in use"})
	d := NewArena(0)
	child.child = Link(pageOf(unsafe.Pointer(New[testNode](d))).id<<offsetBits | 8)
	assert.DeepEqual(t, problems(), []string{".child: a link into an arena that this one does not keep alive"})
	child.child = saved

	if !CanFindGoHeapPointers() {
		t.Skip("Go-heap addresses cannot be recognized on this system")
	}
	// A Go object must be kept; a pointer into the middle of a kept object is fine.
	onHeap := &testNode{}
	node.parent = onHeap
	assert.DeepEqual(t, problems(), []string{".parent: a pointer to Go memory that this arena does not keep alive"})
	a.Keep(unsafe.Pointer(onHeap), unsafe.Sizeof(*onHeap))
	assert.Equal(t, len(problems()), 0)
	text := string([]byte("heap allocated text"))
	node.text = text[5:9]
	assert.DeepEqual(t, problems(), []string{".text: a pointer to Go memory that this arena does not keep alive"})
	a.Keep(unsafe.Pointer(unsafe.StringData(text)), uintptr(len(text)))
	assert.Equal(t, len(problems()), 0)
	// Elements of a slice allocation are checked individually.
	node.list[0] = &testNode{}
	assert.DeepEqual(t, problems(), []string{": a pointer to Go memory that this arena does not keep alive"})
	node.list[0] = child
	runtime.KeepAlive(a)
	runtime.KeepAlive(b)
	runtime.KeepAlive(c)
	runtime.KeepAlive(d)
}
