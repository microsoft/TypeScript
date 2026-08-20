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
	Kind              EventKind
	Path              string
	includedWatchRoot bool
}

// eventEntry tracks coalescing state during a debounce batch.
type eventEntry struct {
	createdSeq        uint64
	updatedSeq        uint64
	deletedSeq        uint64
	includedWatchRoot bool
}

// eventList coalesces filesystem events by path within a debounce window.
//   - create after delete → update (rapid delete+recreate)
//   - getEvents skips entries that were both created and deleted
type eventList struct {
	mu      sync.Mutex
	entries map[string]*eventEntry
	err     error
	seq     uint64
}

// create records a new-file event for path. Both create and update
// produce EventUpdate externally; sequence state tracks coalescing
// (create+delete within a batch cancels out).
func (el *eventList) create(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.createLocked(path, seq)
}

func (el *eventList) createAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.createLocked(path, seq)
}

func (el *eventList) createLocked(path string, seq uint64) {
	entry := el.getOrCreate(path)
	if entry.isDeleted() {
		// Rapid delete+recreate: clear both flags so the entry
		// emits EventUpdate (the default for non-deleted entries).
		// https://github.com/parcel-bundler/watcher/issues/72
		entry.deletedSeq = 0
		entry.createdSeq = 0
		entry.updatedSeq = seq
	} else {
		entry.createdSeq = seq
	}
}

// update records an update event for path.
func (el *eventList) update(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.updateLocked(path, seq)
}

func (el *eventList) updateAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.updateLocked(path, seq)
}

func (el *eventList) updateWatchRootAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.updateLocked(path, seq)
	el.getOrCreate(path).includedWatchRoot = true
}

func (el *eventList) updateLocked(path string, seq uint64) {
	el.getOrCreate(path).updatedSeq = seq
}

// remove records a delete event for path.
func (el *eventList) remove(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.removeLocked(path, seq)
}

func (el *eventList) removeAndGetSequence(path string) uint64 {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.removeLocked(path, seq)
	return seq
}

func (el *eventList) removeAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.removeLocked(path, seq)
}

func (el *eventList) removeWatchRootAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.removeLocked(path, seq)
	el.getOrCreate(path).includedWatchRoot = true
}

func (el *eventList) removeLocked(path string, seq uint64) {
	entry := el.getOrCreate(path)
	entry.deletedSeq = seq
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
	return el.snapshotSinceLocked(0)
}

func (el *eventList) snapshotSinceLocked(startSeq uint64) []Event {
	out := make([]Event, 0, len(el.entries))
	for path, e := range el.entries {
		kind, ok := e.kindSince(startSeq)
		if !ok {
			continue
		}
		out = append(out, Event{Kind: kind, Path: path, includedWatchRoot: e.includedWatchRoot})
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

func (el *eventList) drainForSequences(startSeqs []uint64) ([][]Event, error) {
	el.mu.Lock()
	defer el.mu.Unlock()
	out := make([][]Event, len(startSeqs))
	for i, startSeq := range startSeqs {
		out[i] = el.snapshotSinceLocked(startSeq)
	}
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

func (el *eventList) sequence() uint64 {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.seq
}

func (el *eventList) nextSeqLocked() uint64 {
	el.seq++
	return el.seq
}

func (el *eventList) advanceSeqLocked(seq uint64) {
	if seq > el.seq {
		el.seq = seq
	}
}

func (e *eventEntry) isDeleted() bool {
	return e.deletedSeq > e.createdSeq && e.deletedSeq > e.updatedSeq
}

func (e *eventEntry) kindSince(startSeq uint64) (EventKind, bool) {
	if e.deletedSeq > startSeq {
		if e.createdSeq > startSeq && e.createdSeq < e.deletedSeq && e.updatedSeq < e.deletedSeq {
			return 0, false
		}
		return EventDelete, true
	}
	seq := max(e.createdSeq, e.updatedSeq)
	if seq > startSeq {
		return EventUpdate, true
	}
	return 0, false
}
