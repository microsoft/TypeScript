package core

import (
	"math/bits"
	"slices"
)

// Arena allocator

type Arena[T any] struct {
	data []T
}

// Allocate a single element in the arena and return a pointer to the element. If the arena is at capacity,
// a new arena of the next size up is allocated.
func (a *Arena[T]) New() *T {
	if len(a.data) == cap(a.data) {
		nextSize := nextArenaSize(len(a.data))
		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
		a.data = slices.Grow[[]T](nil, nextSize)
	}
	index := len(a.data)
	a.data = a.data[:index+1]
	return &a.data[index]
}

// Allocate a slice of the given size in the arena. If the requested size is beyond the capacity of the arena
// and an arena of the next size up still wouldn't fit the slice, make a separate memory allocation for the slice.
// Otherwise, grow the arena if necessary and allocate a slice out of it. The length and capacity of the resulting
// slice are equal to the given size.
func (a *Arena[T]) NewSlice(size int) []T {
	if size == 0 {
		return nil
	}
	if len(a.data)+size > cap(a.data) {
		nextSize := nextArenaSize(len(a.data))
		if size > nextSize {
			return make([]T, size)
		}
		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
		a.data = slices.Grow[[]T](nil, nextSize)
	}
	newLen := len(a.data) + size
	slice := a.data[len(a.data):newLen:newLen]
	a.data = a.data[:newLen]
	return slice
}

func (a *Arena[T]) NewSlice1(t T) []T {
	slice := a.NewSlice(1)
	slice[0] = t
	return slice
}

func (a *Arena[T]) Clone(t []T) []T {
	if len(t) == 0 {
		return nil
	}
	slice := a.NewSlice(len(t))
	copy(slice, t)
	return slice
}

func nextArenaSize(size int) int {
	// This compiles down branch-free.
	size = max(size, 1)
	size = min(size*2, 256)
	return size
}

// IndexedArena keeps values at stable addresses and references them with uint32
// indexes instead of Go pointers. Index zero is nil. Unlike Arena, it retains all
// blocks so that an index alone keeps its value reachable through the arena.
type IndexedArena[T any] struct {
	blocks [][]T
	size   uint32
}

const indexedArenaPageShift = 8

func (a *IndexedArena[T]) New() (uint32, *T) {
	if a.size == ^uint32(0) {
		panic("IndexedArena exhausted")
	}
	if len(a.blocks) == 0 || len(a.blocks[len(a.blocks)-1]) == cap(a.blocks[len(a.blocks)-1]) {
		size := 1 << min(len(a.blocks), indexedArenaPageShift)
		a.blocks = append(a.blocks, make([]T, 0, size))
	}
	block := &a.blocks[len(a.blocks)-1]
	*block = (*block)[:len(*block)+1]
	a.size++
	return a.size, &(*block)[len(*block)-1]
}

func (a *IndexedArena[T]) Get(index uint32) *T {
	if index == 0 {
		return nil
	}
	// The initial blocks have sizes 1, 2, 4, ..., 128. Subsequent
	// blocks have 256 entries, avoiding geometric over-allocation.
	if index < 1<<indexedArenaPageShift {
		block := bits.Len32(index) - 1
		return &a.blocks[block][index-(1<<block)]
	}
	index -= 1 << indexedArenaPageShift
	return &a.blocks[indexedArenaPageShift+int(index>>indexedArenaPageShift)][index&((1<<indexedArenaPageShift)-1)]
}
