package collections

import (
	"iter"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

type SyncMap[K comparable, V any] struct {
	_ [0]K
	_ [0]V
	m sync.Map
}

func (s *SyncMap[K, V] /* ref: nonnil */) Load(key K) (value V, ok bool) {
	val, ok := s.m.Load(key)
	if !ok || val == nil {
		return value, ok
	}
	return val.(V), true
}

func (s *SyncMap[K, V] /* ref: nonnil */) Store(key K, value V) {
	s.m.Store(key, value)
}

func (s *SyncMap[K, V] /* ref: nonnil */) LoadOrStore(key K, value V) (actual V, loaded bool) {
	actualAny, loaded := s.m.LoadOrStore(key, value)
	if actualAny == nil {
		return actual, loaded
	}

	return actualAny.(V), loaded
}

func (s *SyncMap[K, V] /* ref: nonnil */) Delete(key K) {
	s.m.Delete(key)
}

func (s *SyncMap[K, V] /* ref: nonnil */) Clear() {
	s.m.Clear()
}

func (s *SyncMap[K, V] /* ref: nonnil */) Range(f func(key K, value V) bool /* ref: nonnil */) {
	s.m.Range(func(key, value any) bool {
		var k K
		if key != nil {
			k = key.(K)
		}

		var v V
		if value != nil {
			v = value.(V)
		}

		return f(k, v)
	})
}

// Size returns the approximate number of items in the map.
// Note that this is not a precise count, as the map may be modified
// concurrently while this method is running.
func (s *SyncMap[K, V] /* ref: nonnil */) Size() int {
	count := 0
	s.m.Range(func(_, _ any) bool {
		count++
		return true
	})
	return count
}

func (s *SyncMap[K, V] /* ref: nonnil */) ToMap() typeutil.DefMap[K, V] {
	m := make(map[K]V, s.Size())
	s.m.Range(func(key, value any) bool {
		m[key.(K)] = value.(V)
		return true
	})
	return m
}

func (s *SyncMap[K, V] /* ref: nonnil */) Keys() iter.Seq[K] /* ref: nonnil */ {
	return func(yield func(K) bool /* ref: nonnil */) {
		s.m.Range(func(key, value any) bool {
			if !yield(key.(K)) {
				return false
			}
			return true
		})
	}
}

func (s *SyncMap[K, V] /* ref: nonnil */) Clone() typeutil.DefPtr[SyncMap[K, V]] {
	clone := &SyncMap[K, V]{}
	s.m.Range(func(key, value any) bool {
		clone.m.Store(key, value)
		return true
	})
	return clone
}
