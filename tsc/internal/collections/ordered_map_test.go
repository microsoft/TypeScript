package collections_test

import (
	"fmt"
	"slices"
	"strconv"
	"strings"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"gotest.tools/v3/assert"
)

func TestOrderedMapEqualFunc(t *testing.T) {
	t.Parallel()

	zero := &collections.OrderedMap[int, string]{}
	allocated := collections.NewOrderedMapWithSizeHint[int, string](0)
	ordered := collections.NewOrderedMapFromList([]collections.MapEntry[int, string]{{Key: 1, Value: "a"}, {Key: 2, Value: "b"}})
	reversed := collections.NewOrderedMapFromList([]collections.MapEntry[int, string]{{Key: 2, Value: "b"}, {Key: 1, Value: "a"}})
	uppercase := collections.NewOrderedMapFromList([]collections.MapEntry[int, string]{{Key: 1, Value: "A"}, {Key: 2, Value: "B"}})
	different := ordered.Clone()
	different.Set(2, "c")
	cleared := ordered.Clone()
	cleared.Clear()

	for _, test := range []struct {
		name  string
		a, b  *collections.OrderedMap[int, string]
		equal bool
	}{
		{"nil", nil, nil, true},
		{"nil versus empty", nil, zero, false},
		{"empty allocation", zero, allocated, true},
		{"cleared allocation", zero, cleared, true},
		{"same", ordered, ordered, true},
		{"clone", ordered, ordered.Clone(), true},
		{"different order", ordered, reversed, false},
		{"different values", ordered, different, false},
		{"different length", zero, ordered, false},
		{"custom equality", ordered, uppercase, true},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, test.a.EqualFunc(test.b, strings.EqualFold), test.equal)
			assert.Equal(t, test.b.EqualFunc(test.a, strings.EqualFold), test.equal)
		})
	}
}

func TestOrderedMap(t *testing.T) {
	t.Parallel()

	var m collections.OrderedMap[int, string]

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

func TestOrderedMapClone(t *testing.T) {
	t.Parallel()

	m := &collections.OrderedMap[int, string]{}
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

func TestOrderedMapClear(t *testing.T) {
	t.Parallel()

	var m collections.OrderedMap[int, string]
	m.Set(1, "one")
	m.Set(2, "two")

	m.Clear()

	assert.Equal(t, m.Size(), 0)
}

func padInt(n int) string {
	return fmt.Sprintf("%10d", n)
}

func TestOrderedMapWithSizeHint(t *testing.T) { //nolint:paralleltest
	const N = 1024

	allocs := testing.AllocsPerRun(10, func() {
		m := collections.NewOrderedMapWithSizeHint[int, int](N)
		for i := range N {
			m.Set(i, i)
		}
	})

	assert.Assert(t, allocs < 10, "allocs = %v", allocs)
}

func TestOrderedMapUnmarshalJSON(t *testing.T) {
	t.Parallel()

	t.Run("UnmarshalJSONV2", func(t *testing.T) {
		t.Parallel()
		testOrderedMapUnmarshalJSON(t, func(in []byte, out any) error { return json.Unmarshal(in, out) })
	})
}

func testOrderedMapUnmarshalJSON(t *testing.T, unmarshal func([]byte, any) error) {
	var m collections.OrderedMap[string, any]
	err := unmarshal([]byte(`{"a": 1, "b": "two", "c": { "d": 4 } }`), &m)
	assert.NilError(t, err)

	assert.Equal(t, m.Size(), 3)
	assert.Equal(t, m.GetOrZero("a"), float64(1))

	err = unmarshal([]byte(`null`), &m)
	assert.NilError(t, err)

	err = unmarshal([]byte(`"foo"`), &m)
	assert.ErrorContains(t, err, "cannot unmarshal non-object JSON value into Map")

	var invalidMap collections.OrderedMap[int, any]
	err = unmarshal([]byte(`{"a": 1, "b": "two"}`), &invalidMap)
	assert.ErrorContains(t, err, "unmarshal")
}

func TestOrderedMapDeleteSuffix(t *testing.T) {
	t.Parallel()

	m := collections.NewOrderedMapFromList([]collections.MapEntry[int, string]{
		{Key: 1, Value: "one"},
		{Key: 2, Value: "two"},
		{Key: 3, Value: "three"},
		{Key: 4, Value: "four"},
	})
	for _, key := range []int{4, 3, 2} {
		want, _ := m.Get(key)
		value, ok := m.Delete(key)
		assert.Assert(t, ok)
		assert.Equal(t, value, want)
		assert.Assert(t, !m.Has(key))
	}
	assert.Equal(t, m.Size(), 1)
	assert.DeepEqual(t, slices.Collect(m.Keys()), []int{1})
	m.Set(2, "new")
	assert.DeepEqual(t, slices.Collect(m.Values()), []string{"one", "new"})
}

func BenchmarkOrderedMapDeleteSuffix(b *testing.B) {
	for _, size := range []int{1024, 8192, 32768} {
		b.Run(strconv.Itoa(size), func(b *testing.B) {
			m := collections.NewOrderedMapWithSizeHint[int, int](size)
			for b.Loop() {
				for key := range size {
					m.Set(key, key)
				}
				for key := size - 1; key > 0; key-- {
					m.Delete(key)
				}
			}
		})
	}
}
