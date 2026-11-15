package checker

import "math/bits"

// clearableMap is a hash table keyed by 128-bit keys that can be cleared in constant time. It
// is used for short-lived caches that are cleared and reused many times: a Go map takes time
// proportional to its capacity to clear, which stays large once it has grown. Here each entry
// records the generation it was written in, and clearing starts a new one.
type clearableMap[V any] struct {
	entries    []clearableMapEntry[V]
	generation uint32
	count      int
	shift      uint8
}

type clearableMapEntry[V any] struct {
	key        CacheHashKey
	value      V
	generation uint32
}

func (m *clearableMap[V]) slot(key CacheHashKey) int {
	return int(((key.Lo ^ key.Hi) * 0x9e3779b97f4a7c15) >> m.shift)
}

func (m *clearableMap[V]) get(key CacheHashKey) (V, bool) {
	var zero V
	if m.count == 0 {
		return zero, false
	}
	mask := len(m.entries) - 1
	for i := m.slot(key); ; i = (i + 1) & mask {
		e := &m.entries[i]
		if e.generation != m.generation {
			return zero, false
		}
		if e.key == key {
			return e.value, true
		}
	}
}

func (m *clearableMap[V]) set(key CacheHashKey, value V) {
	if (m.count+1)*4 > len(m.entries)*3 {
		m.grow()
	}
	mask := len(m.entries) - 1
	for i := m.slot(key); ; i = (i + 1) & mask {
		e := &m.entries[i]
		if e.generation != m.generation {
			*e = clearableMapEntry[V]{key: key, value: value, generation: m.generation}
			m.count++
			return
		}
		if e.key == key {
			e.value = value
			return
		}
	}
}

func (m *clearableMap[V]) grow() {
	old := m.entries
	oldGeneration := m.generation
	size := max(len(old)*2, 8)
	m.entries = make([]clearableMapEntry[V], size)
	m.shift = uint8(64 - bits.TrailingZeros(uint(size)))
	m.generation = 1
	m.count = 0
	for i := range old {
		if e := &old[i]; e.generation == oldGeneration {
			m.set(e.key, e.value)
		}
	}
}

func (m *clearableMap[V]) clear() {
	if m.count == 0 {
		return
	}
	m.count = 0
	m.generation++
	if m.generation == 0 {
		clear(m.entries)
		m.generation = 1
	}
}
