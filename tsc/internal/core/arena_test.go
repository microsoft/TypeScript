package core_test

import (
	"runtime"
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

func TestArenaBoundsSingleValueRetention(t *testing.T) { //nolint:paralleltest
	type value struct {
		pointer *int
		padding [65528]byte
	}
	runtime.GC()
	var before runtime.MemStats
	runtime.ReadMemStats(&before)
	var arena core.Arena[value]
	var retained *value
	for i := range 300 {
		retained = arena.New()
		retained.pointer = new(i)
	}
	arena = core.Arena[value]{}
	runtime.GC()
	runtime.GC()
	var after runtime.MemStats
	runtime.ReadMemStats(&after)
	assert.Equal(t, *retained.pointer, 299)
	assert.Assert(t, after.HeapAlloc < before.HeapAlloc+1024*1024, "one live value retained more than 1 MiB")
	runtime.KeepAlive(retained)
}

func TestArenaMixedSingleValuesAndSlices(t *testing.T) {
	t.Parallel()
	type value struct {
		number int
		text   *string
	}
	var arena core.Arena[value]
	assert.Assert(t, arena.NewSlice(0) == nil)
	first := arena.New()
	first.number, first.text = 1, new("first")
	small := arena.NewSlice1(value{number: 3, text: new("small")})
	copyOfSmall := arena.Clone(small)
	small[0].number = 4
	slices := make([][]value, 0, 7)
	for _, size := range []int{1, 2, 31, 32, 33, 64, 100} {
		slice := arena.NewSlice(size)
		assert.Equal(t, len(slice), size)
		assert.Equal(t, cap(slice), size)
		for i := range slice {
			assert.Equal(t, slice[i], value{})
			slice[i] = value{number: i + size, text: new(strconv.Itoa(size))}
		}
		slices = append(slices, slice)
		assert.Equal(t, *arena.New(), value{})
	}
	values := arena.NewSlice(100)
	assert.Equal(t, len(values), 100)
	assert.Equal(t, cap(values), 100)
	for i := range values {
		values[i].number = i
	}
	last := arena.New()
	last.number, last.text = 2, new("last")
	for range 1024 {
		arena.New()
	}
	arena = core.Arena[value]{}
	runtime.GC()
	assert.Equal(t, first.number, 1)
	assert.Equal(t, *first.text, "first")
	assert.Equal(t, last.number, 2)
	assert.Equal(t, *last.text, "last")
	assert.Equal(t, small[0].number, 4)
	assert.Equal(t, *small[0].text, "small")
	assert.Equal(t, copyOfSmall[0].number, 3)
	assert.Equal(t, *copyOfSmall[0].text, "small")
	for _, slice := range slices {
		for i := range slice {
			assert.Equal(t, slice[i].number, i+len(slice))
			assert.Equal(t, *slice[i].text, strconv.Itoa(len(slice)))
		}
	}
	for i := range values {
		assert.Equal(t, values[i].number, i)
	}
}

func TestArenaZeroSizedValues(t *testing.T) {
	t.Parallel()
	var arena core.Arena[struct{}]
	for range 1024 {
		assert.Assert(t, arena.New() != nil)
	}
	values := arena.NewSlice(300)
	assert.Equal(t, len(values), 300)
	assert.Equal(t, cap(values), 300)
}
