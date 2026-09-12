package background

import (
	"context"
	"sync"
)

// Queue manages background tasks execution
type Queue struct {
	wg     sync.WaitGroup
	mu     sync.RWMutex
	closed bool
}

type (
	DefQueue   = *Queue          /* ref: nonnil */
	DefContext = context.Context /* ref: nonnil */
)

// NewQueue creates a new background queue for managing background tasks execution.
func NewQueue() DefQueue {
	return &Queue{}
}

func (q DefQueue) Enqueue(ctx DefContext, fn func(DefContext) /* ref: nonnil */) {
	q.mu.RLock()
	if q.closed {
		q.mu.RUnlock()
		return
	}
	q.mu.RUnlock()

	// Don't start new tasks if context is already cancelled
	if ctx.Err() != nil {
		return
	}

	q.wg.Go(func() {
		// Check context again before executing
		if ctx.Err() != nil {
			return
		}
		fn(ctx)
	})
}

// Wait waits for all active tasks to complete.
// It does not prevent new tasks from being enqueued while waiting.
func (q DefQueue) Wait() {
	q.wg.Wait()
}

func (q DefQueue) Close() {
	q.mu.Lock()
	q.closed = true
	q.mu.Unlock()
}
