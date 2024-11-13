package collections_test

import (
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/collections"
	"gotest.tools/v3/assert"
)

func TestOrderedSet(t *testing.T) {
	t.Parallel()

	s := &collections.OrderedSet[int]{}

	s.Add(1)
	s.Add(2)
	s.Add(3)

	assert.Assert(t, s.Has(1))
	assert.Assert(t, s.Has(2))
	assert.Assert(t, s.Has(3))

	assert.Assert(t, s.Delete(2))

	values := slices.Collect(s.Values())
	assert.Equal(t, len(values), 2)
	assert.Assert(t, slices.IsSorted(values))

	s.Clear()

	assert.Equal(t, s.Size(), 0)
	assert.Assert(t, !s.Has(1))
	assert.Assert(t, !s.Has(2))
	assert.Assert(t, !s.Has(3))

	s2 := s.Clone()
	assert.Assert(t, s != s2)
	assert.Equal(t, s2.Size(), 0)
}

func TestOrderedSetWithSizeHint(t *testing.T) { //nolint:paralleltest
	const N = 1024

	allocs := testing.AllocsPerRun(10, func() {
		m := collections.NewOrderedSetWithSizeHint[int](N)
		for i := range N {
			m.Add(i)
		}
	})

	assert.Assert(t, allocs < 10, "allocs = %v", allocs)
}
