package fswatch

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

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
	entries eventEntryMap
	err     error
	seq     uint64
}

type (
	defEventList  = *eventList  /* ref: nonnil */
	defEventEntry = *eventEntry /* ref: nonnil */
	eventEntryMap = map[string]defEventEntry
)

// create records a new-file event for path. Both create and update
// produce EventUpdate externally; sequence state tracks coalescing
// (create+delete within a batch cancels out).
func (el defEventList) create(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.createLocked(path, seq)
}

func (el defEventList) createAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.createLocked(path, seq)
}

func (el defEventList) createLocked(path string, seq uint64) {
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
func (el defEventList) update(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.updateLocked(path, seq)
}

func (el defEventList) updateAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.updateLocked(path, seq)
}

func (el defEventList) updateWatchRootAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.updateLocked(path, seq)
	el.getOrCreate(path).includedWatchRoot = true
}

func (el defEventList) updateLocked(path string, seq uint64) {
	el.getOrCreate(path).updatedSeq = seq
}

// remove records a delete event for path.
func (el defEventList) remove(path string) {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.removeLocked(path, seq)
}

func (el defEventList) removeAndGetSequence(path string) uint64 {
	el.mu.Lock()
	defer el.mu.Unlock()
	seq := el.nextSeqLocked()
	el.removeLocked(path, seq)
	return seq
}

func (el defEventList) removeAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.removeLocked(path, seq)
}

func (el defEventList) removeWatchRootAt(path string, seq uint64) {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.advanceSeqLocked(seq)
	el.removeLocked(path, seq)
	el.getOrCreate(path).includedWatchRoot = true
}

func (el defEventList) removeLocked(path string, seq uint64) {
	entry := el.getOrCreate(path)
	entry.deletedSeq = seq
}

// size returns the number of tracked entries (including ones that may
// cancel out in getEvents).
func (el defEventList) size() int {
	el.mu.Lock()
	defer el.mu.Unlock()
	return len(el.entries)
}

// snapshotLocked returns the current set of pending events with
// create+delete pairs filtered out. Caller must hold el.mu.
func (el defEventList) snapshotLocked() []Event {
	return el.snapshotSinceLocked(0)
}

func (el defEventList) snapshotSinceLocked(startSeq uint64) []Event {
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
func (el defEventList) getEvents() []Event {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.snapshotLocked()
}

// drain atomically snapshots all pending events and the stored error,
// then clears the list. This prevents events added between a separate
// getEvents+clear from being silently dropped.
func (el defEventList) drain() ([]Event, error) {
	el.mu.Lock()
	defer el.mu.Unlock()
	out := el.snapshotLocked()
	err := el.err
	el.entries = nil
	el.err = nil
	return out, err
}

func (el defEventList) drainForSequences(startSeqs []uint64) (typeutil.DefSlice[[]Event], error) {
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
func (el defEventList) setError(err error) {
	el.mu.Lock()
	defer el.mu.Unlock()
	if el.err == nil {
		el.err = err
	}
}

// hasError reports whether an error has been recorded.
func (el defEventList) hasError() bool {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.err != nil
}

// getError returns the stored error (or nil if none).
func (el defEventList) getError() error {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.err
}

func (el defEventList) getOrCreate(path string) defEventEntry {
	if el.entries == nil {
		el.entries = make(eventEntryMap)
	}
	if e, ok := el.entries[path]; ok {
		return e
	}
	e := &eventEntry{}
	el.entries[path] = e
	return e
}

func (el defEventList) sequence() uint64 {
	el.mu.Lock()
	defer el.mu.Unlock()
	return el.seq
}

func (el defEventList) nextSeqLocked() uint64 {
	el.seq++
	return el.seq
}

func (el defEventList) advanceSeqLocked(seq uint64) {
	if seq > el.seq {
		el.seq = seq
	}
}

func (e defEventEntry) isDeleted() bool {
	return e.deletedSeq > e.createdSeq && e.deletedSeq > e.updatedSeq
}

func (e defEventEntry) kindSince(startSeq uint64) (EventKind, bool) {
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
