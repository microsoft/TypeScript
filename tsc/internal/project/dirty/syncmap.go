package dirty

import (
	"maps"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
)

type lockedEntry[K comparable, V Cloneable[V]] struct {
	e *SyncMapEntry[K, V]
}

func (e *lockedEntry[K, V]) Value() V {
	return e.e.valueLocked()
}

func (e *lockedEntry[K, V]) Original() V {
	return e.e.original
}

func (e *lockedEntry[K, V]) Dirty() bool {
	return e.e.dirty
}

func (e *lockedEntry[K, V]) Change(apply func(V)) {
	e.e.changeLocked(apply)
}

func (e *lockedEntry[K, V]) ChangeIf(cond func(V) bool, apply func(V)) bool {
	if cond(e.e.valueLocked()) {
		e.e.changeLocked(apply)
		return true
	}
	return false
}

func (e *lockedEntry[K, V]) Delete() {
	e.e.deleteLocked()
}

func (e *lockedEntry[K, V]) Locked(fn func(Value[V])) {
	fn(e)
}

type SyncMapEntry[K comparable, V Cloneable[V]] struct {
	m  *SyncMap[K, V]
	mu sync.Mutex
	mapEntry[K, V]
	// proxyFor is set when this entry loses a race to become the dirty entry
	// for a value. Since two goroutines hold a reference to two entries that
	// may try to mutate the same underlying value, all mutations are routed
	// through the one that actually exists in the dirty map.
	proxyFor *SyncMapEntry[K, V]
}

func (e *SyncMapEntry[K, V]) Value() V {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		return e.proxyFor.Value()
	}
	return e.valueLocked()
}

func (e *SyncMapEntry[K, V]) valueLocked() V {
	if e.delete {
		var zero V
		return zero
	}
	return e.value
}

func (e *SyncMapEntry[K, V]) Dirty() bool {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		return e.proxyFor.Dirty()
	}
	return e.dirty
}

func (e *SyncMapEntry[K, V]) Locked(fn func(Value[V])) {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		e.proxyFor.Locked(fn)
		return
	}
	fn(&lockedEntry[K, V]{e: e})
}

func (e *SyncMapEntry[K, V]) Change(apply func(V)) {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		e.proxyFor.Change(apply)
		return
	}
	e.changeLocked(apply)
}

func (e *SyncMapEntry[K, V]) changeLocked(apply func(V)) {
	if e.dirty {
		apply(e.value)
		return
	}

	entry, loaded := e.m.dirty.LoadOrStore(e.key, e)
	if loaded {
		entry.mu.Lock()
		defer entry.mu.Unlock()
	}
	if !entry.dirty {
		entry.value = entry.value.Clone()
		entry.dirty = true
	}
	if loaded {
		e.proxyFor = entry
		e.value = entry.value
		e.dirty = true
		e.delete = entry.delete
	}
	apply(entry.value)
}

func (e *SyncMapEntry[K, V]) ChangeIf(cond func(V) bool, apply func(V)) bool {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		return e.proxyFor.ChangeIf(cond, apply)
	}

	if cond(e.value) {
		e.changeLocked(apply)
		return true
	}
	return false
}

func (e *SyncMapEntry[K, V]) Delete() {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		e.proxyFor.Delete()
		return
	}

	if e.dirty {
		e.delete = true
		return
	}
	entry, loaded := e.m.dirty.LoadOrStore(e.key, e)
	if loaded {
		entry.mu.Lock()
		defer entry.mu.Unlock()
		e.delete = true
	} else {
		entry.delete = true
	}
}

func (e *SyncMapEntry[K, V]) deleteLocked() {
	if e.dirty {
		e.delete = true
		return
	}
	entry, loaded := e.m.dirty.LoadOrStore(e.key, e)
	if loaded {
		entry.mu.Lock()
		defer entry.mu.Unlock()
		e.proxyFor = entry
		e.value = entry.value
		e.delete = true
		e.dirty = entry.dirty
	}
	entry.delete = true
}

func (e *SyncMapEntry[K, V]) DeleteIf(cond func(V) bool) {
	e.mu.Lock()
	defer e.mu.Unlock()
	if e.proxyFor != nil {
		e.proxyFor.DeleteIf(cond)
		return
	}
	if cond(e.value) {
		e.deleteLocked()
	}
}

type SyncMap[K comparable, V Cloneable[V]] struct {
	base          map[K]V
	dirty         collections.SyncMap[K, *SyncMapEntry[K, V]]
	finalizeValue func(dirty V, original V) V
}

func NewSyncMap[K comparable, V Cloneable[V]](base map[K]V, finalizeValue func(dirty V, original V) V) *SyncMap[K, V] {
	return &SyncMap[K, V]{
		base:          base,
		dirty:         collections.SyncMap[K, *SyncMapEntry[K, V]]{},
		finalizeValue: finalizeValue,
	}
}

func (m *SyncMap[K, V]) Load(key K) (*SyncMapEntry[K, V], bool) {
	if entry, ok := m.dirty.Load(key); ok {
		if entry.delete {
			return nil, false
		}
		return entry, true
	}
	if val, ok := m.base[key]; ok {
		return &SyncMapEntry[K, V]{
			m: m,
			mapEntry: mapEntry[K, V]{
				key:      key,
				original: val,
				value:    val,
				dirty:    false,
				delete:   false,
			},
		}, true
	}
	return nil, false
}

func (m *SyncMap[K, V]) LoadOrStore(key K, value V) (*SyncMapEntry[K, V], bool) {
	// Check for existence in the base map first so the sync map access is atomic.
	if baseValue, ok := m.base[key]; ok {
		if dirty, ok := m.dirty.Load(key); ok {
			dirty.mu.Lock()
			defer dirty.mu.Unlock()
			if dirty.delete {
				return nil, false
			}
			return dirty, true
		}
		return &SyncMapEntry[K, V]{
			m: m,
			mapEntry: mapEntry[K, V]{
				key:      key,
				original: baseValue,
				value:    baseValue,
				dirty:    false,
				delete:   false,
			},
		}, true
	}
	entry, loaded := m.dirty.LoadOrStore(key, &SyncMapEntry[K, V]{
		m: m,
		mapEntry: mapEntry[K, V]{
			key:   key,
			value: value,
			dirty: true,
		},
	})
	if loaded {
		entry.mu.Lock()
		defer entry.mu.Unlock()
		if entry.delete {
			return nil, false
		}
	}
	return entry, loaded
}

func (m *SyncMap[K, V]) Delete(key K) {
	entry, loaded := m.dirty.LoadOrStore(key, &SyncMapEntry[K, V]{
		m: m,
		mapEntry: mapEntry[K, V]{
			key:      key,
			original: m.base[key],
			delete:   true,
		},
	})
	if loaded {
		entry.Delete()
	}
}

func (m *SyncMap[K, V]) Range(fn func(*SyncMapEntry[K, V]) bool) {
	seenInDirty := make(map[K]struct{})
	m.dirty.Range(func(key K, entry *SyncMapEntry[K, V]) bool {
		seenInDirty[key] = struct{}{}
		if !entry.delete && !fn(entry) {
			return false
		}
		return true
	})
	for key, value := range m.base {
		if _, ok := seenInDirty[key]; ok {
			continue // already processed in dirty entries
		}
		if !fn(&SyncMapEntry[K, V]{m: m, mapEntry: mapEntry[K, V]{
			key:      key,
			original: value,
			value:    value,
			dirty:    false,
		}}) {
			break
		}
	}
}

func (m *SyncMap[K, V]) Finalize() (map[K]V, bool) {
	var changed bool
	result := m.base
	ensureCloned := func() {
		if !changed {
			if m.base == nil {
				result = make(map[K]V)
			} else {
				result = maps.Clone(m.base)
			}
			changed = true
		}
	}

	m.dirty.Range(func(key K, entry *SyncMapEntry[K, V]) bool {
		if entry.delete {
			ensureCloned()
			delete(result, key)
		} else if entry.dirty {
			ensureCloned()
			if m.finalizeValue != nil {
				result[key] = m.finalizeValue(entry.value, entry.original)
			} else {
				result[key] = entry.value
			}
		}
		return true
	})
	return result, changed
}
