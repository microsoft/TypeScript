package collections

import (
	"iter"
	"maps"
	"slices"
)

type MultiMap[K comparable, V comparable] struct {
	M map[K][]V
}

func GroupBy[K comparable, V comparable](items []V, groupId func(V) K) *MultiMap[K, V] {
	m := &MultiMap[K, V]{}
	for _, item := range items {
		m.Add(groupId(item), item)
	}
	return m
}

func (s *MultiMap[K, V]) Has(key K) bool {
	_, ok := s.M[key]
	return ok
}

func (s *MultiMap[K, V]) Get(key K) []V {
	return s.M[key]
}

func (s *MultiMap[K, V]) Add(key K, value V) {
	if s.M == nil {
		s.M = make(map[K][]V)
	}
	s.M[key] = append(s.M[key], value)
}

func (s *MultiMap[K, V]) Remove(key K, value V) {
	if values, ok := s.M[key]; ok {
		i := slices.Index(values, value)
		if i >= 0 {
			if len(values) == 1 {
				delete(s.M, key)
			} else {
				values = append(values[:i], values[i+1:]...)
				s.M[key] = values
			}
		}
	}
}

func (s *MultiMap[K, V]) RemoveAll(key K) {
	delete(s.M, key)
}

func (s *MultiMap[K, V]) Len() int {
	return len(s.M)
}

func (s *MultiMap[K, V]) Keys() iter.Seq[K] {
	return maps.Keys(s.M)
}

func (s *MultiMap[K, V]) Values() iter.Seq[[]V] {
	return maps.Values(s.M)
}

func (s *MultiMap[K, V]) Clear() {
	clear(s.M)
}
