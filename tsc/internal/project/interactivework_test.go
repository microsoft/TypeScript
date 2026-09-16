package project

import (
	"context"
	"sync/atomic"
	"testing"
	"testing/synctest"

	"gotest.tools/v3/assert"
)

// Nothing outstanding means nothing to wait for.
func TestInteractiveWorkIdleByDefault(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		work := newInteractiveWork()
		work.waitForIdle(context.Background())
	})
}

// A waiter is held until the last outstanding piece of work finishes, not the first.
func TestInteractiveWorkWaitsForAllOfIt(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		work := newInteractiveWork()
		firstDone := work.begin()
		secondDone := work.begin()

		var idle atomic.Bool
		go func() {
			work.waitForIdle(context.Background())
			idle.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, !idle.Load(), "a waiter must not go while work is outstanding")

		firstDone()
		synctest.Wait()
		assert.Assert(t, !idle.Load(), "one of two finishing is not enough")

		secondDone()
		synctest.Wait()
		assert.Assert(t, idle.Load(), "the waiter goes once the last piece finishes")
	})
}

// Work starting while a waiter is being woken must hold it back again, rather than letting it
// through on the strength of a moment of quiet.
func TestInteractiveWorkHoldsAcrossBackToBackWork(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		work := newInteractiveWork()
		done := work.begin()

		var idle atomic.Bool
		go func() {
			work.waitForIdle(context.Background())
			idle.Store(true)
		}()
		synctest.Wait()

		next := work.begin()
		done()
		synctest.Wait()
		assert.Assert(t, !idle.Load(), "the waiter must see the work that started behind the first")

		next()
		synctest.Wait()
		assert.Assert(t, idle.Load())
	})
}

// A cancelled caller stops waiting, so a superseded pass does not hang on a busy editor.
func TestInteractiveWorkStopsWaitingWhenCancelled(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		work := newInteractiveWork()
		defer work.begin()()

		ctx, cancel := context.WithCancel(context.Background())
		var returned atomic.Bool
		go func() {
			work.waitForIdle(ctx)
			returned.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, !returned.Load())

		cancel()
		synctest.Wait()
		assert.Assert(t, returned.Load(), "a cancelled waiter must not wait out the work")
	})
}

// A pool built outside a session has no gate, and must not panic on one.
func TestInteractiveWorkNilIsInert(t *testing.T) {
	t.Parallel()
	var work *interactiveWork
	work.begin()()
	work.waitForIdle(context.Background())
}
