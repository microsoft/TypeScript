package collections

import "maps"

type Set[T comparable] struct {
	M map[T]struct{}
}

// NewSetWithSizeHint creates a new Set with a hint for the number of elements it will contain.
func NewSetWithSizeHint[T comparable](hint int) *Set[T] {
	return &Set[T]{
		M: make(map[T]struct{}, hint),
	}
}

func (s *Set[T]) Has(key T) bool {
	if s == nil {
		return false
	}
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
	if s == nil {
		return 0
	}
	return len(s.M)
}

func (s *Set[T]) Keys() map[T]struct{} {
	if s == nil {
		return nil
	}
	return s.M
}

func (s *Set[T]) Clear() {
	if s == nil {
		return
	}
	clear(s.M)
}

// Returns true if the key was not already present in the set.
func (s *Set[T]) AddIfAbsent(key T) bool {
	if s.Has(key) {
		return false
	}
	s.Add(key)
	return true
}

func (s *Set[T]) Clone() *Set[T] {
	if s == nil {
		return nil
	}
	clone := &Set[T]{M: maps.Clone(s.M)}
	return clone
}

func (s *Set[T]) Union(other *Set[T]) {
	if s.Len() == 0 && other.Len() == 0 {
		return
	}
	if s == nil {
		panic("cannot modify nil Set")
	}
	if s.M == nil {
		s.M = maps.Clone(other.M)
		return
	}
	maps.Copy(s.M, other.M)
}

func (s *Set[T]) UnionedWith(other *Set[T]) *Set[T] {
	if s == nil && other == nil {
		return nil
	}
	result := s.Clone()
	if other != nil {
		if result == nil {
			result = &Set[T]{}
		}
		if result.M == nil {
			result.M = make(map[T]struct{}, len(other.M))
		}
		maps.Copy(result.M, other.M)
	}
	return result
}

func (s *Set[T]) Equals(other *Set[T]) bool {
	if s == other {
		return true
	}
	if s == nil || other == nil {
		return false
	}
	return maps.Equal(s.M, other.M)
}

func (s *Set[T]) IsSubsetOf(other *Set[T]) bool {
	if s == nil {
		return true
	}
	for key := range s.M {
		if !other.Has(key) {
			return false
		}
	}
	return true
}

func (s *Set[T]) Intersects(other *Set[T]) bool {
	if s == nil || other == nil {
		return false
	}
	for key := range s.M {
		if other.Has(key) {
			return true
		}
	}
	return false
}

func NewSetFromItems[T comparable](items ...T) *Set[T] {
	s := &Set[T]{}
	for _, item := range items {
		s.Add(item)
	}
	return s
}
