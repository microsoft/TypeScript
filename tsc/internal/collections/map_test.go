package collections_test

import (
	"encoding/json"
	"fmt"
	"slices"
	"testing"

	json2 "github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/collections"
	"gotest.tools/v3/assert"
)

func TestMap(t *testing.T) {
	t.Parallel()

	var m collections.Map[int, string]

	assert.Assert(t, !m.Has(1))

	const (
		N     = 1000
		start = 1
		end   = start + N
	)

	// Seed the map with ascending keys and values for easier testing.
	for i := start; i < end; i++ {
		m.Set(i, padInt(i))
	}

	assert.Equal(t, m.Size(), N)

	// Attempt to overwrite existing keys in reverse order.
	for i := end - 1; i >= start; i-- {
		m.Set(i, padInt(i))
	}

	assert.Equal(t, m.Size(), N)

	for i := start; i < end; i++ {
		v, ok := m.Get(i)
		assert.Assert(t, ok)
		assert.Equal(t, v, padInt(i))
	}

	for k, v := range m.Entries() {
		assert.Equal(t, v, padInt(k))
	}

	keys := slices.Collect(m.Keys())
	assert.Equal(t, len(keys), N)
	assert.Assert(t, slices.IsSorted(keys))

	values := slices.Collect(m.Values())
	assert.Equal(t, len(values), N)
	assert.Assert(t, slices.IsSorted(values))

	var firstKey int
	for k := range m.Keys() {
		firstKey = k
		break
	}
	assert.Equal(t, firstKey, start)

	var firstValue string
	for v := range m.Values() {
		firstValue = v
		break
	}
	assert.Equal(t, firstValue, padInt(start))

	for k, v := range m.Entries() {
		firstKey = k
		firstValue = v
		break
	}

	assert.Equal(t, firstKey, start)
	assert.Equal(t, firstValue, padInt(start))

	for i := start + 1; i < end; i++ {
		v, ok := m.Delete(i)
		assert.Assert(t, ok)
		assert.Equal(t, v, padInt(i))
		assert.Assert(t, !m.Has(i))

		v, ok = m.Get(i)
		assert.Assert(t, !ok)
		assert.Equal(t, v, "")

		v, ok = m.Delete(i)
		assert.Assert(t, !ok)
		assert.Equal(t, v, "")
	}

	assert.Equal(t, m.Size(), 1)
	assert.Assert(t, m.Has(start))

	v, ok := m.Delete(start)
	assert.Assert(t, ok)
	assert.Equal(t, v, padInt(start))

	assert.Equal(t, m.Size(), 0)
}

func TestMapClone(t *testing.T) {
	t.Parallel()

	m := &collections.Map[int, string]{}
	m.Set(1, "one")
	m.Set(2, "two")

	clone := m.Clone()

	assert.Assert(t, clone != m)
	assert.Equal(t, clone.Size(), 2)
	assert.DeepEqual(t, slices.Collect(clone.Keys()), []int{1, 2})
	assert.DeepEqual(t, slices.Collect(clone.Values()), []string{"one", "two"})

	v, ok := clone.Get(1)
	assert.Assert(t, ok)
	assert.Equal(t, v, "one")

	m.Delete(1)

	assert.Equal(t, m.Size(), 1)
	assert.Equal(t, clone.Size(), 2)
	assert.DeepEqual(t, slices.Collect(clone.Keys()), []int{1, 2})
	assert.DeepEqual(t, slices.Collect(clone.Values()), []string{"one", "two"})
}

func TestMapClear(t *testing.T) {
	t.Parallel()

	var m collections.Map[int, string]
	m.Set(1, "one")
	m.Set(2, "two")

	m.Clear()

	assert.Equal(t, m.Size(), 0)
}

func padInt(n int) string {
	return fmt.Sprintf("%10d", n)
}

func TestMapWithSizeHint(t *testing.T) { //nolint:paralleltest
	const N = 1024

	allocs := testing.AllocsPerRun(10, func() {
		m := collections.NewMapWithSizeHint[int, int](N)
		for i := range N {
			m.Set(i, i)
		}
	})

	assert.Assert(t, allocs < 10, "allocs = %v", allocs)
}

func TestMapUnmarshalJSON(t *testing.T) {
	t.Parallel()

	t.Run("UnmarshalJSON", func(t *testing.T) {
		t.Parallel()
		testMapUnmarshalJSON(t, json.Unmarshal)
	})
	t.Run("UnmarshalJSONV2", func(t *testing.T) {
		t.Parallel()
		testMapUnmarshalJSON(t, func(in []byte, out any) error { return json2.Unmarshal(in, out) })
	})
}

func testMapUnmarshalJSON(t *testing.T, unmarshal func([]byte, any) error) {
	var m collections.Map[string, any]
	err := unmarshal([]byte(`{"a": 1, "b": "two", "c": { "d": 4 } }`), &m)
	assert.NilError(t, err)

	assert.Equal(t, m.Size(), 3)
	assert.Equal(t, m.GetOrZero("a"), float64(1))

	err = unmarshal([]byte(`null`), &m)
	assert.NilError(t, err)

	err = unmarshal([]byte(`"foo"`), &m)
	assert.ErrorContains(t, err, "cannot unmarshal non-object JSON value into Map")

	var invalidMap collections.Map[int, any]
	err = unmarshal([]byte(`{"a": 1, "b": "two"}`), &invalidMap)
	assert.ErrorContains(t, err, "unmarshal")
}
