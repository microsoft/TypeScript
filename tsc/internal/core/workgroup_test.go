package core_test

import (
	"runtime"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"gotest.tools/v3/assert"
)

func TestWorkGroupConcurrencyLimit(t *testing.T) {
	t.Parallel()
	const limit = 3
	const depth = 2
	const children = 4
	wg := core.NewWorkGroup(limit)
	var running, maxRunning, completed atomic.Int32
	var allRootsRunning sync.WaitGroup
	allRootsRunning.Add(limit)
	var queue func(remaining int)
	queue = func(remaining int) {
		wg.Queue(func() {
			now := running.Add(1)
			for {
				seen := maxRunning.Load()
				if now <= seen || maxRunning.CompareAndSwap(seen, now) {
					break
				}
			}
			if remaining == depth {
				allRootsRunning.Done()
				allRootsRunning.Wait()
			}
			if remaining > 0 {
				for range children {
					queue(remaining - 1)
				}
			}
			runtime.Gosched()
			running.Add(-1)
			completed.Add(1)
		})
	}
	for range limit {
		queue(depth)
	}
	wg.RunAndWait()
	assert.Equal(t, completed.Load(), int32(limit*(1+children+children*children)))
	assert.Equal(t, maxRunning.Load(), int32(limit))
}
