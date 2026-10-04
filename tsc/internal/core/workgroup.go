package core

import (
	"context"
	"sync"
	"sync/atomic"

	"golang.org/x/sync/errgroup"
)

type WorkGroup interface {
	// Queue queues a function to run. It may be invoked immediately, or deferred until RunAndWait.
	// It is not safe to call Queue after RunAndWait has returned.
	Queue(fn func())

	// RunAndWait runs all queued functions, blocking until they have all completed.
	RunAndWait()
}

func NewWorkGroup(singleThreaded bool) WorkGroup {
	if singleThreaded {
		return &singleThreadedWorkGroup{}
	}
	return &parallelWorkGroup{}
}

type parallelWorkGroup struct {
	done atomic.Bool
	wg   sync.WaitGroup
}

var _ WorkGroup = (*parallelWorkGroup)(nil)

func (w *parallelWorkGroup) Queue(fn func()) {
	if w.done.Load() {
		panic("Queue called after RunAndWait returned")
	}

	w.wg.Go(func() {
		fn()
	})
}

func (w *parallelWorkGroup) RunAndWait() {
	defer w.done.Store(true)
	w.wg.Wait()
}

type singleThreadedWorkGroup struct {
	done  atomic.Bool
	fnsMu sync.Mutex
	fns   []func()
}

var _ WorkGroup = (*singleThreadedWorkGroup)(nil)

func (w *singleThreadedWorkGroup) Queue(fn func()) {
	if w.done.Load() {
		panic("Queue called after RunAndWait returned")
	}

	w.fnsMu.Lock()
	defer w.fnsMu.Unlock()
	w.fns = append(w.fns, fn)
}

func (w *singleThreadedWorkGroup) RunAndWait() {
	defer w.done.Store(true)
	for {
		fn := w.pop()
		if fn == nil {
			return
		}
		fn()
	}
}

func (w *singleThreadedWorkGroup) pop() func() {
	w.fnsMu.Lock()
	defer w.fnsMu.Unlock()
	if len(w.fns) == 0 {
		return nil
	}
	end := len(w.fns) - 1
	fn := w.fns[end]
	w.fns[end] = nil // Allow GC
	w.fns = w.fns[:end]
	return fn
}

// ThrottleGroup is like errgroup.Group but with global concurrency limiting via a semaphore.
type ThrottleGroup struct {
	semaphore chan struct{}
	group     *errgroup.Group
}

// NewThrottleGroup creates a new ThrottleGroup with the given context and semaphore for concurrency limiting.
func NewThrottleGroup(ctx context.Context, semaphore chan struct{}) *ThrottleGroup {
	g, _ := errgroup.WithContext(ctx)
	return &ThrottleGroup{
		semaphore: semaphore,
		group:     g,
	}
}

// Go runs the given function in a new goroutine, but first acquires a slot from the semaphore.
// The semaphore slot is released when the function completes.
func (tg *ThrottleGroup) Go(fn func() error) {
	tg.group.Go(func() error {
		// Acquire semaphore slot - this will block until a slot is available
		tg.semaphore <- struct{}{}
		defer func() {
			// Release semaphore slot when done
			<-tg.semaphore
		}()
		return fn()
	})
}

// Wait waits for all goroutines to complete and returns the first error encountered, if any.
func (tg *ThrottleGroup) Wait() error {
	return tg.group.Wait()
}
