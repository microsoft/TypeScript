package project

import (
	"context"
	"sync"
)

// interactiveWork counts the work a user is waiting on: a pull on the document in front of them, or
// a snapshot update that every other request is queued behind. A pass over the whole workspace
// stands aside while any of it is outstanding.
//
// The trade is one-sided. A workspace pass runs for as long as the workspace is big and nothing
// waits on it finishing sooner, so the time it gives up is time the user was going to spend waiting
// anyway; whereas a pass that keeps every checker and every core busy makes the file in front of
// them answer minutes late.
//
// One of these is shared by every checker pool in a session, so a pull on one project stands the
// whole pass down rather than just the project that owns the file.
type interactiveWork struct {
	mu    sync.Mutex
	count int
	// idle is closed while nothing is outstanding, and replaced with an open channel when
	// something starts. A waiter reads the channel rather than polling the count.
	idle chan struct{}
}

func newInteractiveWork() *interactiveWork {
	idle := make(chan struct{})
	close(idle)
	return &interactiveWork{idle: idle}
}

// begin marks interactive work as started and returns the function that marks it done. Safe on a
// nil receiver, which is what a pool built outside a session gets.
func (w *interactiveWork) begin() func() {
	if w == nil {
		return noop
	}
	w.mu.Lock()
	if w.count == 0 {
		w.idle = make(chan struct{})
	}
	w.count++
	w.mu.Unlock()

	return sync.OnceFunc(func() {
		w.mu.Lock()
		defer w.mu.Unlock()
		w.count--
		if w.count == 0 {
			close(w.idle)
		}
	})
}

// waitForIdle blocks until nothing interactive is outstanding, or ctx is done. A caller must not
// hold a checker while waiting, or the work it is standing aside for could be waiting on that.
func (w *interactiveWork) waitForIdle(ctx context.Context) error {
	if w == nil {
		return nil
	}
	for {
		w.mu.Lock()
		count, idle := w.count, w.idle
		w.mu.Unlock()
		if count == 0 {
			return nil
		}
		select {
		case <-idle:
			// Something finished; look again, since more may have started.
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}
