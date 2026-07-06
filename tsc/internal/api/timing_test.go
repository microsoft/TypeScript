package api

import (
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func TestTimingCollector(t *testing.T) {
	t.Parallel()

	t.Run("accumulates totals and records recent requests", func(t *testing.T) {
		t.Parallel()
		c := newTimingCollector()
		c.record("getSourceFile", 2*time.Millisecond)
		c.record("getSymbolAtPosition", 500*time.Microsecond)

		snap := c.snapshot()
		assert.Equal(t, snap.Enabled, true)
		assert.Equal(t, snap.Totals.RequestCount, uint64(2))
		assert.Equal(t, snap.Totals.TotalProcessingTimeMs, 2.5)
		assert.Equal(t, len(snap.RecentRequests), 2)
		assert.Equal(t, snap.RecentRequests[0].Method, "getSourceFile")
		assert.Equal(t, snap.RecentRequests[0].ProcessingTimeMs, 2.0)
		assert.Equal(t, snap.RecentRequests[1].Method, "getSymbolAtPosition")
		assert.Equal(t, snap.RecentRequests[1].ProcessingTimeMs, 0.5)
	})

	t.Run("ring buffer retains only the most recent requests, oldest to newest", func(t *testing.T) {
		t.Parallel()
		c := newTimingCollector()
		methods := []string{"a", "b", "c", "d", "e", "f", "g"}
		for _, m := range methods {
			c.record(m, time.Millisecond)
		}

		snap := c.snapshot()
		assert.Equal(t, snap.Totals.RequestCount, uint64(7))
		assert.Equal(t, len(snap.RecentRequests), serverRecentRequestCapacity)

		// Expect the last 5 methods, oldest to newest.
		want := methods[len(methods)-serverRecentRequestCapacity:]
		for i, w := range want {
			assert.Equal(t, snap.RecentRequests[i].Method, w)
		}
	})

	t.Run("negative durations clamp to zero", func(t *testing.T) {
		t.Parallel()
		c := newTimingCollector()
		c.record("x", -5*time.Second)
		snap := c.snapshot()
		assert.Equal(t, snap.Totals.TotalProcessingTimeMs, 0.0)
		assert.Equal(t, snap.RecentRequests[0].ProcessingTimeMs, 0.0)
	})
}

func TestServerTimingSnapshotDisabled(t *testing.T) {
	t.Parallel()
	snap := serverTimingSnapshot(nil)
	assert.Equal(t, snap.Enabled, false)
	assert.Equal(t, snap.Totals.RequestCount, uint64(0))
	assert.Equal(t, len(snap.RecentRequests), 0)
}

func TestTimingCollectorReset(t *testing.T) {
	t.Parallel()
	c := newTimingCollector()
	c.record("a", time.Millisecond)
	c.record("b", time.Millisecond)
	c.reset()

	snap := c.snapshot()
	assert.Equal(t, snap.Enabled, true)
	assert.Equal(t, snap.Totals.RequestCount, uint64(0))
	assert.Equal(t, snap.Totals.TotalProcessingTimeMs, 0.0)
	assert.Equal(t, len(snap.RecentRequests), 0)

	// The collector remains usable after a reset.
	c.record("c", 2*time.Millisecond)
	snap = c.snapshot()
	assert.Equal(t, snap.Totals.RequestCount, uint64(1))
	assert.Equal(t, snap.RecentRequests[0].Method, "c")
}

func TestDurationToMillis(t *testing.T) {
	t.Parallel()
	assert.Equal(t, durationToMillis(1500*time.Microsecond), 1.5)
	assert.Equal(t, durationToMillis(0), 0.0)
	assert.Equal(t, durationToMillis(-5*time.Second), 0.0)
	// Sub-microsecond durations retain precision rather than truncating to 0.
	assert.Equal(t, durationToMillis(500*time.Nanosecond), 0.0005)
	assert.Equal(t, durationToMillis(1234*time.Nanosecond), 0.001234)
}
