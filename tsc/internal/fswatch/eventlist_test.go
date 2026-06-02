// Unit tests for eventList coalescing and drain semantics.

package fswatch

import (
	"errors"
	"testing"
)

// clear is only used by tests; live code drains via drain() so the
// snapshot and the reset happen atomically.
func (el *eventList) clear() {
	el.mu.Lock()
	defer el.mu.Unlock()
	el.entries = nil
	el.err = nil
}

func TestEventListCreateThenDelete(t *testing.T) {
	t.Parallel()
	var el eventList
	el.create("a")
	el.remove("a")
	if el.size() != 1 {
		t.Fatalf("size after create+remove want 1, got %d", el.size())
	}
	if got := el.getEvents(); len(got) != 0 {
		t.Fatalf("getEvents should drop create+delete, got %v", got)
	}
}

func TestEventListDeleteThenCreate(t *testing.T) {
	t.Parallel()
	var el eventList
	el.remove("a")
	el.create("a")
	got := el.getEvents()
	if len(got) != 1 {
		t.Fatalf("expected 1 event, got %d", len(got))
	}
	// "Assume update event when rapidly removed and created".
	if got[0].Kind != EventUpdate {
		t.Fatalf("expected update, got %v", got[0].Kind)
	}
}

func TestEventListCreateDeleteCreate(t *testing.T) {
	t.Parallel()
	var el eventList
	el.create("a")
	el.remove("a")
	el.create("a")
	got := el.getEvents()
	if len(got) != 1 {
		t.Fatalf("expected 1 event, got %d", len(got))
	}
	if got[0].Kind != EventUpdate {
		t.Fatalf("create+delete+create should coalesce to update, got %v", got[0].Kind)
	}
}

func TestEventListErrorIsLatchedAndCleared(t *testing.T) {
	t.Parallel()
	var el eventList
	if el.hasError() {
		t.Fatal("fresh eventList should have no error")
	}
	if got := el.getError(); got != nil {
		t.Fatalf("fresh getError want nil, got %v", got)
	}
	el.setError(errors.New("first"))
	el.setError(errors.New("second")) // only first wins
	if !el.hasError() {
		t.Fatal("hasError should be true after setError")
	}
	if got := el.getError(); got == nil || got.Error() != "first" {
		t.Fatalf("getError want first, got %v", got)
	}
	el.clear()
	if el.hasError() {
		t.Fatal("clear should drop the error")
	}
	if got := el.getError(); got != nil {
		t.Fatalf("post-clear getError want nil, got %v", got)
	}
}

func TestEventListDrainIsAtomic(t *testing.T) {
	t.Parallel()
	var el eventList
	el.create("a")
	el.update("b")
	el.setError(errors.New("oops"))

	events, err := el.drain()
	if err == nil {
		t.Fatal("drain should return the error")
	}
	if len(events) != 2 {
		t.Fatalf("drain should return 2 events, got %d", len(events))
	}

	events2, err2 := el.drain()
	if err2 != nil {
		t.Fatalf("second drain should have no error, got %v", err2)
	}
	if len(events2) != 0 {
		t.Fatalf("second drain should be empty, got %d", len(events2))
	}
}

func TestEventListDrainReturnsErrorWithEvents(t *testing.T) {
	t.Parallel()
	var el eventList
	el.create("file.txt")
	el.setError(errors.New("overflow"))

	events, err := el.drain()
	if err == nil {
		t.Fatal("expected error from drain")
	}
	if len(events) != 1 {
		t.Fatalf("expected 1 event alongside error, got %d", len(events))
	}
}
