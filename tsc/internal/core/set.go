package core

type Set[T comparable] struct {
	M map[T]struct{}
}

func (s *Set[T]) Has(key T) bool {
	_, ok := s.M[key]
	return ok
}

func (s *Set[T]) Add(key T) {
	if s.M == nil {
		s.M = make(map[T]struct{})
	}
	s.M[key] = struct{}{}
}

func (s *Set[T]) Delete(key T) {
	delete(s.M, key)
}

func (s *Set[T]) Len() int {
	return len(s.M)
}

func (s *Set[T]) Keys() map[T]struct{} {
	return s.M
}

func NewSetFromItems[T comparable](items ...T) *Set[T] {
	s := &Set[T]{}
	for _, item := range items {
		s.Add(item)
	}
	return s
}
