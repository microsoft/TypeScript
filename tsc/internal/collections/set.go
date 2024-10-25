package collections

import "iter"

// Set an insertion ordered set.
type Set[T comparable] struct {
	m Map[T, struct{}]
}

// NewSetWithSizeHint creates a new Set with a hint for the number of elements it will contain.
func NewSetWithSizeHint[T comparable](hint int) *Set[T] {
	return &Set[T]{
		m: newMapWithSizeHint[T, struct{}](hint),
	}
}

// Add adds a value to the set.
func (s *Set[T]) Add(value T) {
	s.m.Set(value, struct{}{})
}

// Has returns true if the set contains the value.
func (s *Set[T]) Has(value T) bool {
	return s.m.Has(value)
}

// Delete removes a value from the set.
func (s *Set[T]) Delete(value T) bool {
	_, ok := s.m.Delete(value)
	return ok
}

// Values returns an iterator over the values in the set.
func (s *Set[T]) Values() iter.Seq[T] {
	return s.m.Keys()
}

// Clear removes all elements from the set.
// The space allocated for the set will be reused.
func (s *Set[T]) Clear() {
	s.m.Clear()
}

// Size returns the number of elements in the set.
func (s *Set[T]) Size() int {
	return s.m.Size()
}

// Clone returns a shallow copy of the set.
func (s *Set[T]) Clone() *Set[T] {
	return &Set[T]{
		m: s.m.clone(),
	}
}
