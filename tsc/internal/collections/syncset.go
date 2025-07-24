package collections

type SyncSet[T comparable] struct {
	m SyncMap[T, struct{}]
}

func (s *SyncSet[T]) Has(key T) bool {
	_, ok := s.m.Load(key)
	return ok
}

func (s *SyncSet[T]) Add(key T) {
	s.m.Store(key, struct{}{})
}

func (s *SyncSet[T]) Delete(key T) {
	s.m.Delete(key)
}

func (s *SyncSet[T]) Range(fn func(key T) bool) {
	s.m.Range(func(key T, value struct{}) bool {
		return fn(key)
	})
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
