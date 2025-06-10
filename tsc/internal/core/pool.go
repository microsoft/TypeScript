package core

import "slices"

// Pool allocator

type Pool[T any] struct {
	data []T
}

// Allocate a single element in the pool and return a pointer to the element. If the pool is at capacity,
// a new pool of the next size up is allocated.
func (p *Pool[T]) New() *T {
	if len(p.data) == cap(p.data) {
		nextSize := nextPoolSize(len(p.data))
		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
		p.data = slices.Grow[[]T](nil, nextSize)
	}
	index := len(p.data)
	p.data = p.data[:index+1]
	return &p.data[index]
}

// Allocate a slice of the given size in the pool. If the requested size is beyond the capacity of the pool
// and a pool of the next size up still wouldn't fit the slice, make a separate memory allocation for the slice.
// Otherwise, grow the pool if necessary and allocate a slice out of it. The length and capacity of the resulting
// slice are equal to the given size.
func (p *Pool[T]) NewSlice(size int) []T {
	if size == 0 {
		return nil
	}
	if len(p.data)+size > cap(p.data) {
		nextSize := nextPoolSize(len(p.data))
		if size > nextSize {
			return make([]T, size)
		}
		// Use the same trick as slices.Concat; Grow rounds up to the next size class.
		p.data = slices.Grow[[]T](nil, nextSize)
	}
	newLen := len(p.data) + size
	slice := p.data[len(p.data):newLen:newLen]
	p.data = p.data[:newLen]
	return slice
}

func (p *Pool[T]) NewSlice1(t T) []T {
	slice := p.NewSlice(1)
	slice[0] = t
	return slice
}

func nextPoolSize(size int) int {
	// This compiles down branch-free.
	size = max(size, 1)
	size = min(size*2, 256)
	return size
}
