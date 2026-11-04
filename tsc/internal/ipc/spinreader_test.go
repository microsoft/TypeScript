package ipc

import (
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func TestParseSyncSpin(t *testing.T) {
	t.Parallel()

	assert.Equal(t, ParseSyncSpin(""), DefaultSyncSpin)
	assert.Equal(t, ParseSyncSpin("0"), time.Duration(0))
	assert.Equal(t, ParseSyncSpin("-5"), time.Duration(0))
	assert.Equal(t, ParseSyncSpin("abc"), time.Duration(0))
	assert.Equal(t, ParseSyncSpin("250"), 250*time.Microsecond)

	assert.Assert(t, ParseSyncSpinAdaptive(""))
	assert.Assert(t, ParseSyncSpinAdaptive("1"))
	assert.Assert(t, !ParseSyncSpinAdaptive("0"))
}

func TestSpinStateSuspendsAfterConsecutiveSlowWaits(t *testing.T) {
	t.Parallel()

	s := spinState{spinning: true}
	slow := 2 * adaptiveSlowWait
	fast := adaptiveSlowWait / 2

	for range adaptiveWindow - 1 {
		s.observe(slow)
		assert.Assert(t, s.spinning, "fewer than %d slow waits must keep spinning", adaptiveWindow)
	}
	// A single fast wait resets the count.
	s.observe(fast)
	for range adaptiveWindow - 1 {
		s.observe(slow)
		assert.Assert(t, s.spinning)
	}
	s.observe(slow)
	assert.Assert(t, !s.spinning, "%d consecutive slow waits must suspend spinning", adaptiveWindow)
	assert.Equal(t, s.misses, 0)
}

func TestSpinStateResumesAfterConsecutiveFastWaits(t *testing.T) {
	t.Parallel()

	s := spinState{spinning: false}
	slow := 2 * adaptiveSlowWait
	fast := adaptiveSlowWait / 2

	for range adaptiveWindow - 1 {
		s.observe(fast)
		assert.Assert(t, !s.spinning, "fewer than %d fast waits must stay blocking", adaptiveWindow)
	}
	// A single slow wait resets the count.
	s.observe(slow)
	for range adaptiveWindow - 1 {
		s.observe(fast)
		assert.Assert(t, !s.spinning)
	}
	s.observe(fast)
	assert.Assert(t, s.spinning, "%d consecutive fast waits must resume spinning", adaptiveWindow)
	assert.Equal(t, s.hits, 0)
}

func TestSpinStateRoundTrip(t *testing.T) {
	t.Parallel()

	s := spinState{spinning: true}
	for range adaptiveWindow {
		s.observe(2 * adaptiveSlowWait)
	}
	assert.Assert(t, !s.spinning)
	for range adaptiveWindow {
		s.observe(adaptiveSlowWait / 2)
	}
	assert.Assert(t, s.spinning)
}
