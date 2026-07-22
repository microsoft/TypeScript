package core

import "slices"

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
	pageShift    = 8
	pageSize     = 1 << pageShift
	pageMask     = pageSize - 1
	maxPageCount = 65536
)

// Implements a sparse-array-like structure for storing elements keyed by dense uint64 keys. Elements are
// stored in fixed-size pages of 256 entries and an index of pages is maintained in an array for lower valued
// page indices and a map for higher valued page indices.
type PagedLinkStore[V any] struct {
	pageMap  map[uint64]*[pageSize]V // Page map for page indices above maxPageCount
	pageList []*[pageSize]V          // Page table for page indices below maxPageCount
}

func (s *PagedLinkStore[V]) Get(key uint64) *V {
	var page *[pageSize]V
	pageIndex := key >> pageShift
	if pageIndex < maxPageCount {
		if int(pageIndex) >= len(s.pageList) {
			// Grow the length of the list to pageIndex+1
			s.pageList = slices.Grow(s.pageList, int(pageIndex)-len(s.pageList)+1)[:pageIndex+1]
		}
		page = s.pageList[pageIndex]
		if page == nil {
			page = new([pageSize]V)
			s.pageList[pageIndex] = page
		}
	} else {
		page = s.pageMap[pageIndex]
		if page == nil {
			page = new([pageSize]V)
			if s.pageMap == nil {
				s.pageMap = make(map[uint64]*[pageSize]V)
			}
			s.pageMap[pageIndex] = page
		}
	}
	return &page[key&pageMask]
}

func (s *PagedLinkStore[V]) Has(key uint64) bool {
	return s.TryGet(key) != nil
}

func (s *PagedLinkStore[V]) TryGet(key uint64) *V {
	var page *[pageSize]V
	pageIndex := key >> pageShift
	if pageIndex < maxPageCount {
		if int(pageIndex) < len(s.pageList) {
			page = s.pageList[pageIndex]
		}
	} else {
		page = s.pageMap[pageIndex]
	}
	if page != nil {
		return &page[key&pageMask]
	}
	return nil
}
