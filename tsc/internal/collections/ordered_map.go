package collections

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"iter"
	"maps"
	"reflect"
	"slices"

	json2 "github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

// OrderedMap is an insertion ordered map.
type OrderedMap[K comparable, V any] struct {
	keys []K
	mp   map[K]V
}

// NewOrderedMapWithSizeHint creates a new OrderedMap with a hint for the number of elements it will contain.
func NewOrderedMapWithSizeHint[K comparable, V any](hint int) *OrderedMap[K, V] {
	m := newMapWithSizeHint[K, V](hint)
	return &m
}

func newMapWithSizeHint[K comparable, V any](hint int) OrderedMap[K, V] {
	return OrderedMap[K, V]{
		keys: make([]K, 0, hint),
		mp:   make(map[K]V, hint),
	}
}

type MapEntry[K comparable, V any] struct {
	Key   K
	Value V
}

func NewOrderedMapFromList[K comparable, V any](items []MapEntry[K, V]) *OrderedMap[K, V] {
	mp := NewOrderedMapWithSizeHint[K, V](len(items))
	for _, item := range items {
		mp.Set(item.Key, item.Value)
	}
	return mp
}

// Set sets a key-value pair in the map.
func (m *OrderedMap[K, V]) Set(key K, value V) {
	if m.mp == nil {
		m.mp = make(map[K]V)
	}

	if _, ok := m.mp[key]; !ok {
		m.keys = append(m.keys, key)
	}
	m.mp[key] = value
}

// Get retrieves a value from the map.
func (m *OrderedMap[K, V]) Get(key K) (V, bool) {
	v, ok := m.mp[key]
	return v, ok
}

// GetOrZero retrieves a value from the map, or returns the zero value of the value type if the key is not present.
func (m *OrderedMap[K, V]) GetOrZero(key K) V {
	return m.mp[key]
}

// Has returns true if the map contains the key.
func (m *OrderedMap[K, V]) Has(key K) bool {
	_, ok := m.mp[key]
	return ok
}

// Delete removes a key-value pair from the map.
func (m *OrderedMap[K, V]) Delete(key K) (V, bool) {
	v, ok := m.mp[key]
	if !ok {
		var zero V
		return zero, false
	}

	delete(m.mp, key)
	i := slices.Index(m.keys, key)
	// If we're just removing the first or last element, avoid shifting everything around.
	if i == 0 {
		var zero K
		m.keys[0] = zero
		m.keys = m.keys[1:]
	} else if end := len(m.keys) - 1; i == end {
		var zero K
		m.keys[end] = zero
		m.keys = m.keys[:end]
	} else {
		m.keys = slices.Delete(m.keys, i, i+1)
	}

	return v, true
}

// Keys returns an iterator over the keys in the map.
// A slice of the keys can be obtained by calling `slices.Collect`.
func (m *OrderedMap[K, V]) Keys() iter.Seq[K] {
	return func(yield func(K) bool) {
		for _, key := range m.keys {
			if !yield(key) {
				break
			}
		}
	}
}

// Values returns an iterator over the values in the map.
// A slice of the values can be obtained by calling `slices.Collect`.
func (m *OrderedMap[K, V]) Values() iter.Seq[V] {
	return func(yield func(V) bool) {
		for _, key := range m.keys {
			if !yield(m.mp[key]) {
				break
			}
		}
	}
}

// Entries returns an iterator over the key-value pairs in the map.
func (m *OrderedMap[K, V]) Entries() iter.Seq2[K, V] {
	return func(yield func(K, V) bool) {
		for _, key := range m.keys {
			if !yield(key, m.mp[key]) {
				break
			}
		}
	}
}

// Clear removes all key-value pairs from the map.
// The space allocated for the map will be reused.
func (m *OrderedMap[K, V]) Clear() {
	clear(m.keys)
	m.keys = m.keys[:0]
	clear(m.mp)
}

// Size returns the number of key-value pairs in the map.
func (m *OrderedMap[K, V]) Size() int {
	return len(m.keys)
}

// Clone returns a shallow copy of the map.
func (m *OrderedMap[K, V]) Clone() *OrderedMap[K, V] {
	m2 := m.clone()
	return &m2
}

func (m *OrderedMap[K, V]) clone() OrderedMap[K, V] {
	return OrderedMap[K, V]{
		keys: slices.Clone(m.keys),
		mp:   maps.Clone(m.mp),
	}
}

func (m *OrderedMap[K, V]) UnmarshalJSON(data []byte) error {
	if string(data) == "null" {
		// By convention, to approximate the behavior of Unmarshal itself,
		// Unmarshalers implement UnmarshalJSON([]byte("null")) as a no-op.
		// https://pkg.go.dev/encoding/json#Unmarshaler
		return nil
	}
	dec := json.NewDecoder(bytes.NewReader(data))
	token, err := dec.Token()
	if err != nil {
		return err
	}
	if token != json.Delim('{') {
		return errors.New("cannot unmarshal non-object JSON value into Map")
	}
	for dec.More() {
		nameToken, err := dec.Token()
		if err != nil {
			return err
		}
		if nameToken == json.Delim('}') {
			break
		}
		if key, ok := nameToken.(K); ok {
			var valueBytes json.RawMessage
			if err := dec.Decode(&valueBytes); err != nil {
				return err
			}
			var value V
			if err := json.Unmarshal(valueBytes, &value); err != nil {
				return err
			}
			m.Set(key, value)
		} else {
			return fmt.Errorf("cannot unmarshal key into Map[%v, ...]", reflect.TypeFor[K]())
		}
	}
	return nil
}

func (m *OrderedMap[K, V]) UnmarshalJSONV2(dec *jsontext.Decoder, opts json2.Options) error {
	token, err := dec.ReadToken()
	if err != nil {
		return err
	}
	if token.Kind() == 'n' { // jsontext.Null.Kind()
		// By convention, to approximate the behavior of Unmarshal itself,
		// Unmarshalers implement UnmarshalJSON([]byte("null")) as a no-op.
		// https://pkg.go.dev/encoding/json#Unmarshaler
		return nil
	}
	if token.Kind() != '{' { // jsontext.ObjectStart.Kind()
		return errors.New("cannot unmarshal non-object JSON value into Map")
	}
	for dec.PeekKind() != '}' { // jsontext.ObjectEnd.Kind()
		var key K
		var value V
		if err := json2.UnmarshalDecode(dec, &key, opts); err != nil {
			return err
		}
		if err := json2.UnmarshalDecode(dec, &value, opts); err != nil {
			return err
		}
		m.Set(key, value)
	}
	if _, err := dec.ReadToken(); err != nil {
		return err
	}
	return nil
}
