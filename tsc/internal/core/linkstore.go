package core

import (
	"slices"
)

// Links store

type LinkStore[K comparable, V any] struct {
	entries map[K]*V
	arena   Arena[V]
}

func (s *LinkStore[K, V]) Get(key K) *V {
	value := s.entries[key]
	if value != nil {
		return value
	}
	if s.entries == nil {
		s.entries = make(map[K]*V)
	}
	value = s.arena.New()
	s.entries[key] = value
	return value
}

func (s *LinkStore[K, V]) Has(key K) bool {
	_, ok := s.entries[key]
	return ok
}

func (s *LinkStore[K, V]) TryGet(key K) *V {
	return s.entries[key]
}

const (
	LinkPageShift = 8
	LinkPageSize  = 1 << LinkPageShift
	LinkPageMask  = LinkPageSize - 1
)

// PagedLinkStore implements a sparse-array-like structure for storing elements keyed by dense uint64 keys.
// Elements are allocated in an arena, and compressed indexes are stored in fixed-size pages of 256 entries.
// The pages contain no Go pointers, halving their size on 64-bit hosts and avoiding GC scans of each entry.

type PagedLinkStore[V any] struct {
	pages []*[LinkPageSize]uint32
	arena IndexedArena[V]
}

func (s *PagedLinkStore[V]) Get(key uint64) *V {
	pageIndex := key >> LinkPageShift
	if int(pageIndex) >= len(s.pages) {
		// Grow the length of the list to pageIndex+1
		s.pages = slices.Grow(s.pages, int(pageIndex)-len(s.pages)+1)[:pageIndex+1]
	}
	page := s.pages[pageIndex]
	if page == nil {
		page = new([LinkPageSize]uint32)
		s.pages[pageIndex] = page
	}
	index := page[key&LinkPageMask]
	if index == 0 {
		id, value := s.arena.New()
		page[key&LinkPageMask] = id
		return value
	}
	return s.arena.Get(index)
}

func (s *PagedLinkStore[V]) Has(key uint64) bool {
	pageIndex := key >> LinkPageShift
	return int(pageIndex) < len(s.pages) && s.pages[pageIndex] != nil && s.pages[pageIndex][key&LinkPageMask] != 0
}

func (s *PagedLinkStore[V]) TryGet(key uint64) *V {
	pageIndex := key >> LinkPageShift
	if int(pageIndex) < len(s.pages) {
		if page := s.pages[pageIndex]; page != nil {
			return s.arena.Get(page[key&LinkPageMask])
		}
	}
	return nil
}
