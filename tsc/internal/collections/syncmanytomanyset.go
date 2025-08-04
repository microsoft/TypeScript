package collections

import "fmt"

type SyncManyToManySet[K comparable, V comparable] struct {
	keyToValueSet SyncMap[K, *Set[V]]
	valueToKeySet SyncMap[V, *SyncSet[K]]
}

func (m *SyncManyToManySet[K, V]) GetKeys(value V) (*SyncSet[K], bool) {
	keys, present := m.valueToKeySet.Load(value)
	return keys, present
}

func (m *SyncManyToManySet[K, V]) GetValues(key K) (*Set[V], bool) {
	values, present := m.keyToValueSet.Load(key)
	return values, present
}

func (m *SyncManyToManySet[K, V]) Keys() *SyncMap[K, *Set[V]] {
	return &m.keyToValueSet
}

func (m *SyncManyToManySet[K, V]) Store(key K, valueSet *Set[V]) {
	_, hasExisting := m.keyToValueSet.LoadOrStore(key, valueSet)
	if hasExisting {
		panic("ManyToManySet.Set: key already exists: " + fmt.Sprintf("%v", key))
	}
	for value := range valueSet.Keys() {
		// Add to valueToKeySet
		keySetForValue, _ := m.valueToKeySet.LoadOrStore(value, &SyncSet[K]{})
		keySetForValue.Add(key)
	}
}
