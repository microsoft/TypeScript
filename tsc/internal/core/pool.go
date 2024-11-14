package core

// Pool allocator

type Pool[T any] struct {
	data []T
}

func (p *Pool[T]) New() *T {
	if len(p.data) == cap(p.data) {
		p.data = make([]T, 0, NextPoolSize(len(p.data)))
	}
	index := len(p.data)
	p.data = p.data[:index+1]
	return &p.data[index]
}

func NextPoolSize(size int) int {
	switch {
	case size < 16:
		return 16
	case size < 256:
		return size * 2
	}
	return size
}
