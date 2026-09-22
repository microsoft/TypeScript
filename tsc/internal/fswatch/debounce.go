package fswatch

import (
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

const (
	defaultMinWaitTime = 50 * time.Millisecond
	defaultMaxWaitTime = 500 * time.Millisecond
)

var (
	minWaitTime = defaultMinWaitTime
	maxWaitTime = defaultMaxWaitTime
)

// debounce batches filesystem events for one backend. Each *watcher
// owns one debounce instance, created lazily on first subscribe and
// living for the process lifetime. The background goroutine costs
// nothing when idle.
//
// Per-backend (rather than process-wide) isolation means a slow user
// callback on one backend cannot starve event delivery on the others.
//
// Internally uses a resettable latch: the loop blocks until trigger()
// is called, then coalesces for minWaitTime before firing callbacks.
type debounce struct {
	mu        sync.Mutex
	callbacks debounceCallbackMap
	lastTime  time.Time

	// Latch state: waitCh is the persistent gate (closed = signalled),
	// triggerCh is replaced on each trigger for timed waits.
	latchMu   sync.Mutex
	waitCh    chan struct{}
	triggerCh chan struct{}
	notified  bool
}

type (
	defDebounce         = *debounce                /* ref: nonnil */
	debounceCallback    = func()                   /* ref: nonnil */
	debounceCallbackMap = map[any]debounceCallback /* ref: nonnil */
	signal              = struct{}
)

func newDebounce() defDebounce {
	d := &debounce{
		callbacks: make(map[any]debounceCallback),
	}
	go d.loop()
	return d
}

// add registers a callback under key.
func (d defDebounce) add(key any, cb debounceCallback) {
	d.mu.Lock()
	defer d.mu.Unlock()
	d.callbacks[key] = cb
}

// remove deregisters the callback for key.
func (d defDebounce) remove(key any) {
	d.mu.Lock()
	defer d.mu.Unlock()
	delete(d.callbacks, key)
}

// trigger wakes the debounce loop.
func (d defDebounce) trigger() {
	d.latchMu.Lock()
	defer d.latchMu.Unlock()
	if !d.notified {
		d.notified = true
		close(d.waitChLocked())
	}
	close(d.triggerChLocked())
	d.triggerCh = make(chan struct{})
}

func (d defDebounce) loop() {
	for {
		d.latchWait()
		d.notifyIfReady()
	}
}

func (d defDebounce) notifyIfReady() {
	d.mu.Lock()
	now := time.Now()
	gap := now.Sub(d.lastTime)
	if gap > maxWaitTime {
		d.lastTime = now
		d.mu.Unlock()
		d.fireCallbacks()
		return
	}
	d.mu.Unlock()
	d.coalesceWait()
}

func (d defDebounce) coalesceWait() {
	d.latchMu.Lock()
	ch := d.triggerChLocked()
	d.latchMu.Unlock()
	select {
	case <-ch:
		// Do nothing; new event triggered, fire on the next tick.
	case <-time.After(minWaitTime):
		d.fireCallbacks()
	}
}

// fireCallbacks snapshots and invokes all registered callbacks.
func (d defDebounce) fireCallbacks() {
	d.mu.Lock()
	d.lastTime = time.Now()
	cbs := make([]debounceCallback, 0, len(d.callbacks))
	for _, cb := range d.callbacks {
		cbs = append(cbs, cb)
	}
	d.mu.Unlock()

	d.latchReset()

	for _, cb := range cbs {
		cb()
	}
}

// ----- latch helpers (replace signal_) ------------------------------------

func (d defDebounce) waitChLocked() typeutil.DefChan[signal] {
	if d.waitCh == nil {
		d.waitCh = make(chan struct{})
	}
	return d.waitCh
}

func (d defDebounce) triggerChLocked() typeutil.DefChan[signal] {
	if d.triggerCh == nil {
		d.triggerCh = make(chan struct{})
	}
	return d.triggerCh
}

func (d defDebounce) latchWait() {
	d.latchMu.Lock()
	ch := d.waitChLocked()
	d.latchMu.Unlock()
	<-ch
}

func (d defDebounce) latchReset() {
	d.latchMu.Lock()
	defer d.latchMu.Unlock()
	if d.notified {
		d.notified = false
		d.waitCh = make(chan struct{})
	}
}
