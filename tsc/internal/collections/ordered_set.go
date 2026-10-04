package collections

import "iter"

// OrderedSet an insertion ordered set.
type OrderedSet[T comparable] struct {
	m OrderedMap[T, struct{}]
}

// NewOrderedSetWithSizeHint creates a new OrderedSet with a hint for the number of elements it will contain.
func NewOrderedSetWithSizeHint[T comparable](hint int) *OrderedSet[T] {
	return &OrderedSet[T]{
		m: newMapWithSizeHint[T, struct{}](hint),
	}
}

// Add adds a value to the set.
func (s *OrderedSet[T]) Add(value T) {
	s.m.Set(value, struct{}{})
}

// Has returns true if the set contains the value.
func (s *OrderedSet[T]) Has(value T) bool {
	return s.m.Has(value)
}

// Delete removes a value from the set.
func (s *OrderedSet[T]) Delete(value T) bool {
	_, ok := s.m.Delete(value)
	return ok
}

// Values returns an iterator over the values in the set.
func (s *OrderedSet[T]) Values() iter.Seq[T] {
	return s.m.Keys()
}

// Clear removes all elements from the set.
// The space allocated for the set will be reused.
func (s *OrderedSet[T]) Clear() {
	s.m.Clear()
}

// Size returns the number of elements in the set.
func (s *OrderedSet[T]) Size() int {
	return s.m.Size()
}

// Clone returns a shallow copy of the set.
func (s *OrderedSet[T]) Clone() *OrderedSet[T] {
	return &OrderedSet[T]{
		m: s.m.clone(),
	}
}
