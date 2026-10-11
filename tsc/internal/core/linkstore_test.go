package core_test

import (
	"fmt"
	"runtime"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

func TestLinkStore(t *testing.T) {
	t.Parallel()
	type value struct {
		number int
		text   *string
	}
	var store core.LinkStore[int, value]
	assert.Assert(t, !store.Has(0))
	assert.Assert(t, store.TryGet(0) == nil)

	values := make([]*value, 4096)
	for i := range values {
		v := store.Get(i)
		assert.Equal(t, *v, value{})
		v.number = i
		v.text = new("retained")
		values[i] = v
	}
	runtime.GC()
	for i, v := range values {
		assert.Assert(t, store.Has(i))
		assert.Equal(t, store.Get(i), v)
		assert.Equal(t, store.TryGet(i), v)
		assert.Equal(t, v.number, i)
		assert.Equal(t, *v.text, "retained")
	}
	assert.Assert(t, !store.Has(len(values)))
	assert.Assert(t, store.TryGet(len(values)) == nil)
}

func TestPagedLinkStore(t *testing.T) {
	t.Parallel()
	var store core.PagedLinkStore[int]
	keys := []uint64{0, 255, 256, 65535, 16777215}
	values := make([]*int, len(keys))
	for _, key := range keys {
		assert.Assert(t, !store.Has(key))
	}
	for i, key := range keys {
		v := store.Get(key)
		assert.Equal(t, *v, 0)
		*v = i + 1
		values[i] = v
	}
	runtime.GC()
	for i, key := range keys {
		assert.Assert(t, store.Has(key))
		assert.Equal(t, store.Get(key), values[i])
		assert.Equal(t, *store.TryGet(key), i+1)
	}
	assert.Assert(t, !store.Has(1))
	assert.Assert(t, store.TryGet(1) == nil)
}

func BenchmarkLinkStore(b *testing.B) {
	type value struct {
		typ   *int
		flags uint32
	}
	b.ReportAllocs()
	for b.Loop() {
		var store core.LinkStore[int, value]
		for i := range 10000 {
			store.Get(i).flags = uint32(i)
		}
		for i := range 10000 {
			if store.Get(i).flags != uint32(i) {
				b.Fatal("link changed during arena growth")
			}
		}

	}
}

func TestIndexedArena(t *testing.T) {
	t.Parallel()
	type value struct {
		number int
		text   *string
	}
	var arena core.IndexedArena[value]
	assert.Assert(t, arena.Get(0) == nil)
	values := make([]*value, 4096)
	for i := range values {
		index, v := arena.New()
		assert.Equal(t, index, uint32(i+1))
		assert.Equal(t, *v, value{})
		v.number = i
		v.text = new("retained")
		values[i] = v
	}
	runtime.GC()
	for i, v := range values {
		assert.Equal(t, arena.Get(uint32(i+1)), v)
		assert.Equal(t, v.number, i)
		assert.Equal(t, *v.text, "retained")
	}
}

func TestIndexedArenaReachability(t *testing.T) {
	t.Parallel()
	var arena core.IndexedArena[*string]
	for i := range 4096 {
		_, value := arena.New()
		*value = new(fmt.Sprint(i))
	}
	runtime.GC()
	for i := range 4096 {
		assert.Equal(t, **arena.Get(uint32(i + 1)), fmt.Sprint(i))
	}
}

func BenchmarkPagedLinkStore(b *testing.B) {
	for _, stride := range []uint64{1, 16, 256} {
		b.Run(fmt.Sprint(stride), func(b *testing.B) {
			type value struct {
				typ   *int
				flags uint32
			}
			b.ReportAllocs()
			for b.Loop() {
				var store core.PagedLinkStore[value]
				for i := range 10000 {
					store.Get(uint64(i) * stride).flags = uint32(i)
				}
				for i := range 10000 {
					if store.Get(uint64(i)*stride).flags != uint32(i) {
						b.Fatal("link changed during arena growth")
					}
				}
			}
		})
	}
}
