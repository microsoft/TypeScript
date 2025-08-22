package collections

import (
	"encoding"
	"errors"
	"iter"
	"maps"
	"reflect"
	"slices"
	"strconv"

	"github.com/go-json-experiment/json"
	"github.com/go-json-experiment/json/jsontext"
)

// OrderedMap is an insertion ordered map.
type OrderedMap[K comparable, V any] struct {
	_    noCopy
	keys []K
	mp   map[K]V
}

// noCopy may be embedded into structs which must not be copied
// after the first use.
//
// See https://golang.org/issues/8005#issuecomment-190753527
// for details.
type noCopy struct{}

// Lock is a no-op used by -copylocks checker from `go vet`.
func (*noCopy) Lock()   {}
func (*noCopy) Unlock() {}

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

// EntryAt retrieves the key-value pair at the specified index.
func (m *OrderedMap[K, V]) EntryAt(index int) (K, V, bool) {
	if index < 0 || index >= len(m.keys) {
		var zero K
		var zeroV V
		return zero, zeroV, false
	}

	key := m.keys[index]
	value := m.mp[key]
	return key, value, true
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
		if m == nil {
			return
		}

		// We use a for loop here to ensure we enumerate new items added during iteration.
		//nolint:intrange
		for i := 0; i < len(m.keys); i++ {
			if !yield(m.keys[i]) {
				break
			}
		}
	}
}

// Values returns an iterator over the values in the map.
// A slice of the values can be obtained by calling `slices.Collect`.
func (m *OrderedMap[K, V]) Values() iter.Seq[V] {
	return func(yield func(V) bool) {
		if m == nil {
			return
		}

		// We use a for loop here to ensure we enumerate new items added during iteration.
		//nolint:intrange
		for i := 0; i < len(m.keys); i++ {
			if !yield(m.mp[m.keys[i]]) {
				break
			}
		}
	}
}

// Entries returns an iterator over the key-value pairs in the map.
func (m *OrderedMap[K, V]) Entries() iter.Seq2[K, V] {
	return func(yield func(K, V) bool) {
		if m == nil {
			return
		}

		// We use a for loop here to ensure we enumerate new items added during iteration.
		//nolint:intrange
		for i := 0; i < len(m.keys); i++ {
			key := m.keys[i]
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
	if m == nil {
		return 0
	}

	return len(m.keys)
}

// Clone returns a shallow copy of the map.
func (m *OrderedMap[K, V]) Clone() *OrderedMap[K, V] {
	if m == nil {
		return nil
	}

	m2 := m.clone()
	return &m2
}

func (m *OrderedMap[K, V]) clone() OrderedMap[K, V] {
	return OrderedMap[K, V]{
		keys: slices.Clone(m.keys),
		mp:   maps.Clone(m.mp),
	}
}

var _ json.MarshalerTo = (*OrderedMap[string, string])(nil)

func (m *OrderedMap[K, V]) MarshalJSONTo(enc *jsontext.Encoder) error {
	if err := enc.WriteToken(jsontext.BeginObject); err != nil {
		return err
	}

	for _, k := range m.keys {
		// TODO: is this needed? Can we just MarshalEncode k directly?
		keyString, err := resolveKeyName(reflect.ValueOf(k))
		if err != nil {
			return err
		}

		if err := json.MarshalEncode(enc, keyString); err != nil {
			return err
		}

		if err := json.MarshalEncode(enc, m.mp[k]); err != nil {
			return err
		}
	}

	return enc.WriteToken(jsontext.EndObject)
}

func resolveKeyName(k reflect.Value) (string, error) {
	if k.Kind() == reflect.String {
		return k.String(), nil
	}
	if tm, ok := reflect.TypeAssert[encoding.TextMarshaler](k); ok {
		if k.Kind() == reflect.Pointer && k.IsNil() {
			return "", nil
		}
		buf, err := tm.MarshalText()
		return string(buf), err
	}
	switch k.Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		return strconv.FormatInt(k.Int(), 10), nil
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		return strconv.FormatUint(k.Uint(), 10), nil
	}
	panic("unexpected map key type")
}

var _ json.UnmarshalerFrom = (*OrderedMap[string, string])(nil)

func (m *OrderedMap[K, V]) UnmarshalJSONFrom(dec *jsontext.Decoder) error {
	token, err := dec.ReadToken()
	if err != nil {
		return err
	}
	if token.Kind() == 'n' { // jsontext.Null.Kind()
		// By convention, to approximate the behavior of Unmarshal itself,
		// Unmarshalers implement UnmarshalJSON([]byte("null")) as a no-op.
		// https://pkg.go.dev/encoding/json#Unmarshaler
		// TODO: reconsider
		return nil
	}
	if token.Kind() != '{' { // jsontext.ObjectStart.Kind()
		return errors.New("cannot unmarshal non-object JSON value into Map")
	}
	for dec.PeekKind() != '}' { // jsontext.ObjectEnd.Kind()
		var key K
		var value V
		if err := json.UnmarshalDecode(dec, &key); err != nil {
			return err
		}
		if err := json.UnmarshalDecode(dec, &value); err != nil {
			return err
		}
		m.Set(key, value)
	}
	if _, err := dec.ReadToken(); err != nil {
		return err
	}
	return nil
}

func DiffOrderedMaps[K comparable, V comparable](m1 *OrderedMap[K, V], m2 *OrderedMap[K, V], onAdded func(key K, value V), onRemoved func(key K, value V), onModified func(key K, oldValue V, newValue V)) {
	DiffOrderedMapsFunc(m1, m2, func(a, b V) bool {
		return a == b
	}, onAdded, onRemoved, onModified)
}

func DiffOrderedMapsFunc[K comparable, V any](m1 *OrderedMap[K, V], m2 *OrderedMap[K, V], equalValues func(a, b V) bool, onAdded func(key K, value V), onRemoved func(key K, value V), onModified func(key K, oldValue V, newValue V)) {
	for k, v1 := range m1.Entries() {
		if v2, ok := m2.Get(k); ok {
			if !equalValues(v1, v2) {
				onModified(k, v1, v2)
			}
		} else {
			onRemoved(k, v1)
		}
	}

	for k, v2 := range m2.Entries() {
		if _, ok := m1.Get(k); !ok {
			onAdded(k, v2)
		}
	}
}
