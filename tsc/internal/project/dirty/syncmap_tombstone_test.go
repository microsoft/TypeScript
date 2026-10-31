package dirty

import (
	"testing"

	"gotest.tools/v3/assert"
)

// LoadOrStore after Delete must resurrect a tombstone with the new value
// instead of returning (nil, false). Callers that dereference the entry
// otherwise panic — #65071, #65054, #64911.
func TestLoadOrStoreAfterDeleteTombstone(t *testing.T) {
	t.Parallel()

	t.Run("base key deleted then LoadOrStore", func(t *testing.T) {
		t.Parallel()
		base := map[string]*testValue{
			"key1": {data: "original"},
		}
		m := NewSyncMap(base)
		m.Delete("key1")

		entry, loaded := m.LoadOrStore("key1", &testValue{data: "new"})
		assert.Assert(t, entry != nil, "LoadOrStore must not return nil entry after tombstone")
		assert.Equal(t, false, loaded, "key was deleted so store should win")
		assert.Equal(t, "new", entry.Value().data)
	})

	t.Run("dirty-only key deleted then LoadOrStore", func(t *testing.T) {
		t.Parallel()
		m := NewSyncMap(map[string]*testValue{})
		e, loaded := m.LoadOrStore("k", &testValue{data: "first"})
		assert.Equal(t, false, loaded)
		assert.Assert(t, e != nil)
		e.Delete()

		entry, loaded2 := m.LoadOrStore("k", &testValue{data: "second"})
		assert.Assert(t, entry != nil, "LoadOrStore must not return nil after dirty tombstone")
		assert.Equal(t, false, loaded2)
		assert.Equal(t, "second", entry.Value().data)
	})

	t.Run("Load after Delete then LoadOrStore resurrects", func(t *testing.T) {
		t.Parallel()
		base := map[string]*testValue{"a": {data: "base"}}
		m := NewSyncMap(base)
		m.Delete("a")
		_, ok := m.Load("a")
		assert.Equal(t, false, ok)

		entry, _ := m.LoadOrStore("a", &testValue{data: "resurrected"})
		assert.Assert(t, entry != nil)
		got, ok2 := m.Load("a")
		assert.Equal(t, true, ok2)
		assert.Equal(t, "resurrected", got.Value().data)
	})
}
