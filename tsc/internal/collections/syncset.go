package collections

import "iter"

type SyncSet[T comparable] struct {
	m SyncMap[T, struct{}]
}

func (s *SyncSet[T]) Has(key T) bool {
	_, ok := s.m.Load(key)
	return ok
}

func (s *SyncSet[T]) Add(key T) {
	s.AddIfAbsent(key)
}

// AddIfAbsent adds the key to the set if it is not already present
// using LoadOrStore. It returns true if the key was not already present
// (opposite of the return value of LoadOrStore).
func (s *SyncSet[T]) AddIfAbsent(key T) bool {
	_, loaded := s.m.LoadOrStore(key, struct{}{})
	return !loaded
}

func (s *SyncSet[T]) Delete(key T) {
	s.m.Delete(key)
}

func (s *SyncSet[T]) Range(fn func(key T) bool) {
	s.m.Range(func(key T, value struct{}) bool {
		return fn(key)
	})
}

// Size returns the approximate number of items in the map.
// Note that this is not a precise count, as the map may be modified
// concurrently while this method is running.
func (s *SyncSet[T]) Size() int {
	count := 0
	s.m.Range(func(_ T, _ struct{}) bool {
		count++
		return true
	})
	return count
}

func (s *SyncSet[T]) ToSlice() []T {
	var arr []T
	arr = make([]T, 0, s.m.Size())
	s.m.Range(func(key T, value struct{}) bool {
		arr = append(arr, key)
		return true
	})
	return arr
}

func (s *SyncSet[T]) Keys() iter.Seq[T] {
	return func(yield func(T) bool) {
		s.m.Range(func(key T, value struct{}) bool {
			if !yield(key) {
				return false
			}
			return true
		})
	}
}
