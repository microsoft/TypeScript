package dirty

import "maps"

type MapEntry[K comparable, V Cloneable[V]] struct {
	m *Map[K, V]
	mapEntry[K, V]
}

func (e *MapEntry[K, V]) Change(apply func(V)) {
	if e.delete {
		panic("tried to change a deleted entry")
	}
	if !e.dirty {
		e.value = e.value.Clone()
		e.dirty = true
		e.m.dirty[e.key] = e
	}
	apply(e.value)
}

func (e *MapEntry[K, V]) Replace(newValue V) {
	if e.delete {
		panic("tried to change a deleted entry")
	}
	if !e.dirty {
		e.dirty = true
		e.m.dirty[e.key] = e
	}
	e.value = newValue
}

func (e *MapEntry[K, V]) ChangeIf(cond func(V) bool, apply func(V)) bool {
	if cond(e.Value()) {
		e.Change(apply)
		return true
	}
	return false
}

func (e *MapEntry[K, V]) Delete() {
	if !e.dirty {
		e.m.dirty[e.key] = e
	}
	e.delete = true
}

func (e *MapEntry[K, V]) Locked(fn func(Value[V])) {
	fn(e)
}

type Map[K comparable, V Cloneable[V]] struct {
	base  map[K]V
	dirty map[K]*MapEntry[K, V]
}

func NewMap[K comparable, V Cloneable[V]](base map[K]V) *Map[K, V] {
	return &Map[K, V]{
		base:  base,
		dirty: make(map[K]*MapEntry[K, V]),
	}
}

func (m *Map[K, V]) Get(key K) (*MapEntry[K, V], bool) {
	if entry, ok := m.dirty[key]; ok {
		if entry.delete {
			return nil, false
		}
		return entry, true
	}
	value, ok := m.base[key]
	if !ok {
		return nil, false
	}
	return &MapEntry[K, V]{
		m: m,
		mapEntry: mapEntry[K, V]{
			key:      key,
			original: value,
			value:    value,
			dirty:    false,
		},
	}, true
}

// Add sets a new entry in the dirty map without checking if it exists
// in the base map. The entry added is considered dirty, so it should
// be a fresh value, mutable until finalized (i.e., it will not be cloned
// before changing if a change is made). If modifying an entry that may
// exist in the base map, use `Change` instead.
func (m *Map[K, V]) Add(key K, value V) {
	m.dirty[key] = &MapEntry[K, V]{
		m: m,
		mapEntry: mapEntry[K, V]{
			key:   key,
			value: value,
			dirty: true,
		},
	}
}

func (m *Map[K, V]) Change(key K, apply func(V)) {
	if entry, ok := m.Get(key); ok {
		entry.Change(apply)
	} else {
		panic("tried to change a non-existent entry")
	}
}

func (m *Map[K, V]) TryDelete(key K) bool {
	if entry, ok := m.Get(key); ok {
		entry.Delete()
		return true
	}
	return false
}

func (m *Map[K, V]) Delete(key K) {
	if !m.TryDelete(key) {
		panic("tried to delete a non-existent entry")
	}
}

func (m *Map[K, V]) Range(fn func(*MapEntry[K, V]) bool) {
	seenInDirty := make(map[K]struct{})
	for _, entry := range m.dirty {
		seenInDirty[entry.key] = struct{}{}
		if !entry.delete && !fn(entry) {
			break
		}
	}
	for key, value := range m.base {
		if _, ok := seenInDirty[key]; ok {
			continue // already processed in dirty entries
		}
		if !fn(&MapEntry[K, V]{m: m, mapEntry: mapEntry[K, V]{
			key:      key,
			original: value,
			value:    value,
			dirty:    false,
		}}) {
			break
		}
	}
}

func (m *Map[K, V]) Clear() {
	m.dirty = make(map[K]*MapEntry[K, V])
	m.base = make(map[K]V)
}

func (m *Map[K, V]) Finalize() (result map[K]V, changed bool) {
	if len(m.dirty) == 0 {
		return m.base, false // no changes, return base map
	}
	if m.base == nil {
		result = make(map[K]V, len(m.dirty))
	} else {
		result = maps.Clone(m.base)
	}
	for key, entry := range m.dirty {
		if entry.delete {
			delete(result, key)
		} else {
			result[key] = entry.value
		}
	}
	return result, true
}
