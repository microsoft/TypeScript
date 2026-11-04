//go:build unix

package ipc

import (
	"io"
	"os"
	"testing"
	"time"

	"gotest.tools/v3/assert"
)

func newTestPipe(t *testing.T) (*os.File, *os.File) {
	t.Helper()
	r, w, err := os.Pipe()
	assert.NilError(t, err)
	t.Cleanup(func() {
		r.Close()
		w.Close()
	})
	return r, w
}

func TestNewSpinReadCloserReturnsInputUnchanged(t *testing.T) {
	t.Parallel()
	r, _ := newTestPipe(t)

	t.Run("when spinning is disabled", func(t *testing.T) {
		t.Parallel()
		assert.Assert(t, NewSpinReadCloser(r, 0, true) == io.ReadCloser(r))
		assert.Assert(t, NewSpinReadCloser(r, -time.Microsecond, true) == io.ReadCloser(r))
	})
	t.Run("when the reader has no file descriptor", func(t *testing.T) {
		t.Parallel()
		rc := io.NopCloser(nil)
		assert.Assert(t, NewSpinReadCloser(rc, DefaultSyncSpin, true) == rc)
	})
	t.Run("otherwise wraps the reader", func(t *testing.T) {
		t.Parallel()
		_, ok := NewSpinReadCloser(r, DefaultSyncSpin, true).(*spinReadCloser)
		assert.Assert(t, ok)
	})
}

func TestSpinReadCloserReadsDataAvailableWithinBudget(t *testing.T) {
	t.Parallel()
	r, w := newTestPipe(t)
	// A long budget: the write below lands inside it, so the read must be
	// served by the poll loop rather than after the budget runs out.
	rc := NewSpinReadCloser(r, time.Second, false)

	go func() {
		time.Sleep(5 * time.Millisecond)
		_, _ = w.WriteString("hello")
	}()

	start := time.Now()
	buf := make([]byte, 16)
	n, err := rc.Read(buf)
	assert.NilError(t, err)
	assert.Equal(t, string(buf[:n]), "hello")
	assert.Assert(t, time.Since(start) < time.Second/2, "read returned only after the budget: %v", time.Since(start))
}

func TestSpinReadCloserFallsBackToBlockingReadAfterBudget(t *testing.T) {
	t.Parallel()
	r, w := newTestPipe(t)
	rc := NewSpinReadCloser(r, 100*time.Microsecond, false)

	go func() {
		time.Sleep(20 * time.Millisecond)
		_, _ = w.WriteString("late")
	}()

	buf := make([]byte, 16)
	n, err := rc.Read(buf)
	assert.NilError(t, err)
	assert.Equal(t, string(buf[:n]), "late")
}

func TestSpinReadCloserReportsEOFAndClosesInput(t *testing.T) {
	t.Parallel()
	r, w := newTestPipe(t)
	rc := NewSpinReadCloser(r, 100*time.Microsecond, true)

	assert.NilError(t, w.Close())
	n, err := rc.Read(make([]byte, 1))
	assert.Equal(t, n, 0)
	assert.Equal(t, err, io.EOF)

	assert.NilError(t, rc.Close())
	_, err = r.Read(make([]byte, 1))
	assert.ErrorIs(t, err, os.ErrClosed)
}

func TestSpinReadCloserAdaptsToTheWriterCadence(t *testing.T) {
	t.Parallel()
	r, w := newTestPipe(t)
	rc := NewSpinReadCloser(r, 100*time.Microsecond, true).(*spinReadCloser)
	buf := make([]byte, 16)

	read := func(delay time.Duration) {
		t.Helper()
		go func() {
			time.Sleep(delay)
			_, _ = w.WriteString("x")
		}()
		rc.BeginMessage()
		n, err := rc.Read(buf)
		assert.NilError(t, err)
		assert.Equal(t, n, 1)
	}

	// Messages that arrive long after the budget: the peer is idle between
	// them, so spinning is suspended after adaptiveWindow of them.
	slow := 20 * adaptiveSlowWait
	for range adaptiveWindow {
		assert.Assert(t, rc.state.spinning)
		read(slow)
	}
	assert.Assert(t, !rc.state.spinning, "spinning must be suspended after %d slow messages", adaptiveWindow)

	// Messages that are already waiting: back-to-back traffic resumes spinning.
	for range adaptiveWindow {
		assert.Assert(t, !rc.state.spinning)
		_, err := w.WriteString("y")
		assert.NilError(t, err)
		rc.BeginMessage()
		n, err := rc.Read(buf)
		assert.NilError(t, err)
		assert.Equal(t, n, 1)
	}
	assert.Assert(t, rc.state.spinning, "spinning must resume after %d fast messages", adaptiveWindow)
}

func TestSpinReadCloserObservesCadenceOncePerMessage(t *testing.T) {
	t.Parallel()
	r, w := newTestPipe(t)
	rc := NewSpinReadCloser(r, 100*time.Microsecond, true).(*spinReadCloser)
	buf := make([]byte, 4)

	// Each message arrives long after the previous one (the peer is idle) but
	// is written in two parts, so the read that completes it finds data quickly.
	// Only the wait for the first byte of a message says anything about the
	// peer's cadence; the continuation read must not reset the slow streak.
	readMessage := func() {
		t.Helper()
		go func() {
			time.Sleep(20 * adaptiveSlowWait)
			_, _ = w.WriteString("head")
			time.Sleep(200 * time.Microsecond)
			_, _ = w.WriteString("tail")
		}()
		rc.BeginMessage()
		for got := 0; got < 8; {
			n, err := rc.Read(buf)
			assert.NilError(t, err)
			got += n
		}
	}
	for range adaptiveWindow {
		assert.Assert(t, rc.state.spinning)
		readMessage()
	}
	assert.Assert(t, !rc.state.spinning, "spinning must be suspended after %d slow messages even when each is read in several pieces", adaptiveWindow)

	// While blocking, messages that are already waiting resume spinning, and a
	// continuation read in between does not count as a fast arrival of its own.
	for range adaptiveWindow {
		assert.Assert(t, !rc.state.spinning)
		_, err := w.WriteString("ab")
		assert.NilError(t, err)
		rc.BeginMessage()
		n, err := rc.Read(buf[:1])
		assert.NilError(t, err)
		assert.Equal(t, n, 1)
		n, err = rc.Read(buf[:1])
		assert.NilError(t, err)
		assert.Equal(t, n, 1)
	}
	assert.Assert(t, rc.state.spinning)
}
