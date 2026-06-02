package fswatch

import "sync"

// EventKind classifies a filesystem change.
type EventKind int

const (
	EventUpdate EventKind = iota + 1
	EventDelete
)

func (k EventKind) String() string {
	switch k {
	case EventUpdate:
		return "update"
	case EventDelete:
		return "delete"
	default:
		return "unknown"
	}
}

// Event describes a single filesystem change.
type Event struct {
	Kind EventKind
	Path string
}

// eventEntry tracks coalescing state during a debounce batch.
// The two booleans are independent: a file can be created then deleted
// in the same batch, which cancels out (filtered by getEvents).
type eventEntry struct {
	isCreated bool
	isDeleted bool
}

// eventList coalesces filesystem events by path within a debounce window.
//   - create after delete → update (rapid delete+recreate)
//   - getEvents skips entries that were both created and deleted
type eventList struct {
	mu      sync.Mutex
	entries map[string]*eventEntry
	err     error
}

// create records a new-file event for path. Both create and update
// produce EventUpdate externally; isCreated is tracked only for
// coalescing (create+delete within a batch cancels out).
func (el *eventList) create(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	entry := el.getOrCreate(path)
	if entry.isDeleted {
		// Rapid delete+recreate: clear both flags so the entry
		// emits EventUpdate (the default for non-deleted entries).
		// https://github.com/parcel-bundler/watcher/issues/72
		entry.isDeleted = false
		entry.isCreated = false
	} else {
		entry.isCreated = true
	}
}

// update records an update event for path.
func (el *eventList) update(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.getOrCreate(path)
}

// remove records a delete event for path.
func (el *eventList) remove(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	entry := el.getOrCreate(path)
	entry.isDeleted = true
}

// size returns the number of tracked entries (including ones that may
// cancel out in getEvents).
func (el *eventList) size() int {
	el.mu.Lock()
	defer el.mu.Unlock()
	return len(el.entries)
}

// snapshotLocked returns the current set of pending events with
// create+delete pairs filtered out. Caller must hold el.mu.
func (el *eventList) snapshotLocked() []Event {
	out := make([]Event, 0, len(el.entries))
	for path, e := range el.entries {
		if e.isCreated && e.isDeleted {
			continue
		}
		kind := EventUpdate
		if e.isDeleted {
			kind = EventDelete
		}
		out = append(out, Event{Kind: kind, Path: path})
	}
	return out
}

// getEvents returns a snapshot of events, skipping entries that were both
// created and deleted. Order is not guaranteed.
func (el *eventList) getEvents() []Event {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.snapshotLocked()
}

// drain atomically snapshots all pending events and the stored error,
// then clears the list. This prevents events added between a separate
// getEvents+clear from being silently dropped.
func (el *eventList) drain() ([]Event, error) {
	el.mu.Lock()
	defer el.mu.Unlock()
	out := el.snapshotLocked()
	err := el.err
	el.entries = nil
	el.err = nil
	return out, err
}

// setError stores the first error encountered (later errors are ignored).
func (el *eventList) setError(err error) {
	el.mu.Lock()
	defer el.mu.Unlock()
	if el.err == nil {
		el.err = err
	}
}

// hasError reports whether an error has been recorded.
func (el *eventList) hasError() bool {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.err != nil
}

// getError returns the stored error (or nil if none).
func (el *eventList) getError() error {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.err
}

func (el *eventList) getOrCreate(path string) *eventEntry {
	if el.entries == nil {
		el.entries = make(map[string]*eventEntry)
	}
	if e, ok := el.entries[path]; ok {
		return e
	}
	e := &eventEntry{}
	el.entries[path] = e
	return e
}
