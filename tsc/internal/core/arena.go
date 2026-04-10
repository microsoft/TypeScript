package core

import "slices"

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
