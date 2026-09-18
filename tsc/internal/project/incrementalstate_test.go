package project

import (
	"sync/atomic"
	"testing"
	"testing/synctest"

	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
	"gotest.tools/v3/assert"
)

// next() is called while the session holds its snapshot write lock, with every request in the
// session queued behind it. Building the view walks every file of the program, so waiting for one
// in flight would freeze the session for as long as the build takes.
func TestIncrementalStateNextDoesNotWaitForABuildInFlight(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		state := &incrementalState{}

		// Claim the build without finishing it, standing in for a pull part way through one.
		_, _, _, mine := state.claimBuild()
		assert.Assert(t, mine, "the first caller builds")

		var returned atomic.Bool
		go func() {
			state.next()
			returned.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, returned.Load(), "next must not wait for a build in flight")
	})
}

// The replacement chains from the baseline the in-flight build started from, so the changes that
// build was going to describe are still seen - by the generation after it, all at once.
func TestIncrementalStateNextKeepsTheBaselineWhileBuilding(t *testing.T) {
	t.Parallel()
	baseline := &incremental.PriorState{}
	state := &incrementalState{previous: baseline}

	_, previous, _, mine := state.claimBuild()
	assert.Assert(t, mine)
	assert.Equal(t, previous, baseline, "the build starts from the baseline")

	assert.Equal(t, state.next().previous, baseline, "and so does the program that replaces it")
}

// Only one caller builds; the rest wait on it rather than each building their own.
func TestIncrementalStateBuildsOnceForConcurrentCallers(t *testing.T) {
	t.Parallel()
	synctest.Test(t, func(t *testing.T) {
		state := &incrementalState{}
		_, _, _, mine := state.claimBuild()
		assert.Assert(t, mine)

		var waiterDone atomic.Bool
		go func() {
			current, _, built, mine := state.claimBuild()
			assert.Assert(t, current == nil && !mine, "a second caller waits rather than building")
			<-built
			waiterDone.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, !waiterDone.Load(), "the waiter is held until the build publishes")

		state.publishBuild(&incremental.Program{})
		synctest.Wait()
		assert.Assert(t, waiterDone.Load(), "publishing releases it")
		assert.Assert(t, state.current != nil)
		assert.Assert(t, state.previous == nil, "the view has taken what it needs from the baseline")
	})
}

// A build that does not finish must leave the state as it was, so the next caller tries again
// rather than waiting on a channel nobody will ever close.
func TestIncrementalStateAbandonedBuildLetsTheNextCallerTry(t *testing.T) {
	t.Parallel()
	baseline := &incremental.PriorState{}
	state := &incrementalState{previous: baseline}

	_, _, _, mine := state.claimBuild()
	assert.Assert(t, mine)
	state.publishBuild(nil)

	current, previous, _, mine := state.claimBuild()
	assert.Assert(t, current == nil)
	assert.Assert(t, mine, "the next caller builds it")
	assert.Equal(t, previous, baseline, "still from the same baseline")
}
