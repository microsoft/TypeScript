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

// NewQueue creates a new background queue for managing background tasks execution.
func NewQueue() *Queue {
	return &Queue{}
}

func (q *Queue) Enqueue(ctx context.Context, fn func(context.Context)) {
	q.mu.RLock()
	if q.closed {
		q.mu.RUnlock()
		return
	}

	// Don't start new tasks if context is already cancelled
	if ctx.Err() != nil {
		q.mu.RUnlock()
		return
	}

	q.wg.Add(1)
	q.mu.RUnlock()
	go func() {
		defer q.wg.Done()
		// Check context again before executing
		if ctx.Err() != nil {
			return
		}
		fn(ctx)
	}()
}

// Wait waits for all active tasks to complete.
// It does not prevent new tasks from being enqueued while waiting.
func (q *Queue) Wait() {
	q.wg.Wait()
}

func (q *Queue) Close() {
	q.mu.Lock()
	q.closed = true
	q.mu.Unlock()
	q.wg.Wait()
}
