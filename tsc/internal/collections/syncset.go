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
