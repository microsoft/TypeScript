package dirty

import (
	"sync"
	"testing"

	"gotest.tools/v3/assert"
)

// testValue is a simple cloneable type for testing
type testValue struct {
	data string
}

func (v *testValue) Clone() *testValue {
	return &testValue{data: v.data}
}

func TestSyncMapProxyFor(t *testing.T) {
	t.Parallel()

	t.Run("proxy for race condition", func(t *testing.T) {
		t.Parallel()

		// Create a sync map with a base value
		base := map[string]*testValue{
			"key1": {data: "original"},
		}
		syncMap := NewSyncMap(base, nil)

		// Load the same entry from multiple goroutines to simulate race condition
		var entry1, entry2 *SyncMapEntry[string, *testValue]
		var wg sync.WaitGroup
		wg.Add(2)

		// First goroutine loads the entry
		go func() {
			defer wg.Done()
			var ok bool
			entry1, ok = syncMap.Load("key1")
			assert.Assert(t, ok, "entry1 should be loaded")
		}()

		// Second goroutine loads the same entry
		go func() {
			defer wg.Done()
			var ok bool
			entry2, ok = syncMap.Load("key1")
			assert.Assert(t, ok, "entry2 should be loaded")
		}()

		wg.Wait()

		// Both entries should exist and have the same initial value
		assert.Equal(t, "original", entry1.Value().data)
		assert.Equal(t, "original", entry2.Value().data)
		assert.Equal(t, false, entry1.Dirty())
		assert.Equal(t, false, entry2.Dirty())

		// Now try to change both entries concurrently to trigger the proxy mechanism.
		// (This change doesn't actually have to be concurrent to test the proxy behavior,
		// but might exercise concurrency safety in -race mode.)
		var changeWg sync.WaitGroup
		changeWg.Add(2)

		go func() {
			defer changeWg.Done()
			entry1.Change(func(v *testValue) {
				v.data = "changed_by_entry1"
			})
		}()

		go func() {
			defer changeWg.Done()
			entry2.Change(func(v *testValue) {
				v.data = "changed_by_entry2"
			})
		}()

		changeWg.Wait()

		// After the race, one entry should have proxyFor set and both should reflect the same final state
		// The exact final value depends on which goroutine wins the race, but both entries should be consistent
		finalValue1 := entry1.Value().data
		finalValue2 := entry2.Value().data
		assert.Equal(t, finalValue1, finalValue2, "both entries should have the same final value")

		// Both entries should be marked as dirty
		assert.Equal(t, true, entry1.Dirty())
		assert.Equal(t, true, entry2.Dirty())

		// At least one entry should have proxyFor set (the one that lost the race)
		hasProxy := (entry1.proxyFor != nil) || (entry2.proxyFor != nil)
		assert.Assert(t, hasProxy, "at least one entry should have proxyFor set")

		// If entry1 has a proxy, it should point to entry2, and vice versa
		if entry1.proxyFor != nil {
			assert.Equal(t, entry2, entry1.proxyFor, "entry1 should proxy to entry2")
		}
		if entry2.proxyFor != nil {
			assert.Equal(t, entry1, entry2.proxyFor, "entry2 should proxy to entry1")
		}
	})

	t.Run("proxy operations delegation", func(t *testing.T) {
		t.Parallel()

		base := map[string]*testValue{
			"key1": {data: "original"},
		}
		syncMap := NewSyncMap(base, nil)

		// Load two entries for the same key
		entry1, ok1 := syncMap.Load("key1")
		assert.Assert(t, ok1)
		entry2, ok2 := syncMap.Load("key1")
		assert.Assert(t, ok2)

		// Force one to become a proxy by making them both dirty in sequence
		entry1.Change(func(v *testValue) {
			v.data = "changed_by_entry1"
		})
		entry2.Change(func(v *testValue) {
			v.data = "changed_by_entry2"
		})

		// Determine which is the proxy and which is the target
		var proxy, target *SyncMapEntry[string, *testValue]
		if entry1.proxyFor != nil {
			proxy = entry1
			target = entry2
		} else {
			proxy = entry2
			target = entry1
		}

		// Test that proxy operations are delegated to the target
		// Change through proxy should affect target
		proxy.Change(func(v *testValue) {
			v.data = "changed_through_proxy"
		})
		assert.Equal(t, "changed_through_proxy", target.Value().data)
		assert.Equal(t, "changed_through_proxy", proxy.Value().data)

		// ChangeIf through proxy should work
		changed := proxy.ChangeIf(
			func(v *testValue) bool { return v.data == "changed_through_proxy" },
			func(v *testValue) { v.data = "conditional_change" },
		)
		assert.Assert(t, changed)
		assert.Equal(t, "conditional_change", target.Value().data)
		assert.Equal(t, "conditional_change", proxy.Value().data)

		// Dirty status should be consistent
		assert.Equal(t, target.Dirty(), proxy.Dirty())

		// Locked operations should work through proxy
		proxy.Locked(func(v Value[*testValue]) {
			v.Change(func(val *testValue) {
				val.data = "locked_change"
			})
		})
		assert.Equal(t, "locked_change", target.Value().data)
		assert.Equal(t, "locked_change", proxy.Value().data)
	})

	t.Run("proxy delete operations", func(t *testing.T) {
		t.Parallel()

		base := map[string]*testValue{
			"key1": {data: "original"},
		}
		syncMap := NewSyncMap(base, nil)

		// Load two entries and make one a proxy
		entry1, _ := syncMap.Load("key1")
		entry2, _ := syncMap.Load("key1")

		entry1.Change(func(v *testValue) { v.data = "modified" })
		entry2.Change(func(v *testValue) { v.data = "modified2" })

		// Determine which is the proxy
		var proxy *SyncMapEntry[string, *testValue]
		if entry1.proxyFor != nil {
			proxy = entry1
		} else {
			proxy = entry2
		}

		// Delete through proxy should affect target
		proxy.Delete()

		// Both should reflect the deletion
		_, exists := syncMap.Load("key1")
		assert.Equal(t, false, exists, "key should be deleted from sync map")

		// DeleteIf through proxy should work
		base2 := map[string]*testValue{
			"key2": {data: "test"},
		}
		syncMap2 := NewSyncMap(base2, nil)

		entry3, _ := syncMap2.Load("key2")
		entry4, _ := syncMap2.Load("key2")

		entry3.Change(func(v *testValue) { v.data = "modified" })
		entry4.Change(func(v *testValue) { v.data = "modified2" })

		var proxy2 *SyncMapEntry[string, *testValue]
		if entry3.proxyFor != nil {
			proxy2 = entry3
		} else {
			proxy2 = entry4
		}

		proxy2.DeleteIf(func(v *testValue) bool {
			return v.data == "modified2" || v.data == "modified"
		})

		_, exists2 := syncMap2.Load("key2")
		assert.Equal(t, false, exists2, "key2 should be deleted conditionally")
	})

	t.Run("no proxy when no race", func(t *testing.T) {
		t.Parallel()

		base := map[string]*testValue{
			"key1": {data: "original"},
		}
		syncMap := NewSyncMap(base, nil)

		// Load and modify a single entry - no race condition
		entry, ok := syncMap.Load("key1")
		assert.Assert(t, ok)

		entry.Change(func(v *testValue) {
			v.data = "changed"
		})

		// Should not have a proxy since there was no race
		assert.Assert(t, entry.proxyFor == nil, "entry should not have proxyFor when no race occurs")
		assert.Equal(t, true, entry.Dirty())
		assert.Equal(t, "changed", entry.Value().data)
	})
}
