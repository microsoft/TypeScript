package collections

import (
	"iter"
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

type MultiMap[K comparable, V comparable] struct {
	M map[K][]V
}

func NewMultiMapWithSizeHint[K comparable, V comparable](hint int) typeutil.DefPtr[MultiMap[K, V]] {
	return &MultiMap[K, V]{
		M: make(map[K][]V, hint),
	}
}

func GroupBy[K comparable, V comparable](items []V, groupId func(V) K /* ref: nonnil */) typeutil.DefPtr[MultiMap[K, V]] {
	m := &MultiMap[K, V]{}
	for _, item := range items {
		m.Add(groupId(item), item)
	}
	return m
}

func (s *MultiMap[K, V] /* ref: nonnil */) Has(key K) bool {
	_, ok := s.M[key]
	return ok
}

func (s *MultiMap[K, V] /* ref: nonnil */) Get(key K) []V {
	return s.M[key]
}

func (s *MultiMap[K, V] /* ref: nonnil */) Add(key K, value V) {
	if s.M == nil {
		s.M = make(map[K][]V)
	}
	s.M[key] = append(s.M[key], value)
}

func (s *MultiMap[K, V] /* ref: nonnil */) Remove(key K, value V) {
	if values, ok := s.M[key]; ok {
		if values == nil {
			return
		}
		i := slices.Index(values, value)
		if i >= 0 {
			if len(values) == 1 {
				delete(s.M, key)
			} else if len(values) > 1 {
				values = append(values[:i], values[i+1:]...)
				s.M[key] = values
			}
		}
	}
}

func (s *MultiMap[K, V] /* ref: nonnil */) RemoveAll(key K) {
	delete(s.M, key)
}

func (s *MultiMap[K, V] /* ref: nonnil */) Len() int {
	return len(s.M)
}

func (s *MultiMap[K, V] /* ref: nonnil */) Keys() iter.Seq[K] {
	return maps.Keys(s.M)
}

func (s *MultiMap[K, V] /* ref: nonnil */) Values() iter.Seq[[]V] {
	return maps.Values(s.M)
}

func (s *MultiMap[K, V] /* ref: nonnil */) Clear() {
	clear(s.M)
}
