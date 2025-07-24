package collections

import "fmt"

type ManyToManySet[K comparable, V comparable] struct {
	keyToValueSet map[K]*Set[V]
	valueToKeySet map[V]*Set[K]
}

func (m *ManyToManySet[K, V]) GetKeys(value V) (*Set[K], bool) {
	keys, present := m.valueToKeySet[value]
	return keys, present
}

func (m *ManyToManySet[K, V]) GetValues(key K) (*Set[V], bool) {
	values, present := m.keyToValueSet[key]
	return values, present
}

func (m *ManyToManySet[K, V]) Len() int {
	return len(m.keyToValueSet)
}

func (m *ManyToManySet[K, V]) Keys() map[K]*Set[V] {
	return m.keyToValueSet
}

func (m *ManyToManySet[K, V]) Set(key K, valueSet *Set[V]) {
	_, hasExisting := m.keyToValueSet[key]
	if hasExisting {
		panic("ManyToManySet.Set: key already exists: " + fmt.Sprintf("%v", key))
	}
	if m.keyToValueSet == nil {
		m.keyToValueSet = make(map[K]*Set[V])
	}
	m.keyToValueSet[key] = valueSet
	for value := range valueSet.Keys() {
		// Add to valueToKeySet
		keySetForValue, exists := m.valueToKeySet[value]
		if !exists {
			if m.valueToKeySet == nil {
				m.valueToKeySet = make(map[V]*Set[K])
			}
			keySetForValue = &Set[K]{}
			m.valueToKeySet[value] = keySetForValue
		}
		keySetForValue.Add(key)
	}
}
