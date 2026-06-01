package lsp

import (
	"context"
	"errors"
	"testing"
)

func TestDynamicQueueFIFO(t *testing.T) {
	t.Parallel()

	ctx := t.Context()
	q := newDynamicQueue[int]()

	for i := range 1000 {
		if err := q.Put(ctx, i); err != nil {
			t.Fatal(err)
		}
	}

	for i := range 1000 {
		got, err := q.Get(ctx)
		if err != nil {
			t.Fatal(err)
		}
		if got != i {
			t.Fatalf("Get() = %d, want %d", got, i)
		}
	}
}

func TestDynamicQueueGetCancellation(t *testing.T) {
	t.Parallel()

	ctx, cancel := context.WithCancel(t.Context())
	cancel()

	q := newDynamicQueue[int]()
	got, err := q.Get(ctx)
	if !errors.Is(err, context.Canceled) {
		t.Fatalf("Get() error = %v, want %v", err, context.Canceled)
	}
	if got != 0 {
		t.Fatalf("Get() = %d, want zero value", got)
	}
}

func TestDynamicQueuePutCancellationWhileStateUnavailable(t *testing.T) {
	t.Parallel()

	q := newDynamicQueue[int]()
	state, err := q.getAny(t.Context())
	if err != nil {
		t.Fatal(err)
	}

	ctx, cancel := context.WithCancel(t.Context())
	cancel()

	putErr := q.Put(ctx, 1)
	if !errors.Is(putErr, context.Canceled) {
		t.Fatalf("Put() error = %v, want %v", putErr, context.Canceled)
	}

	q.idle <- state

	err = q.Put(t.Context(), 2)
	if err != nil {
		t.Fatal(err)
	}
	got, err := q.Get(t.Context())
	if err != nil {
		t.Fatal(err)
	}
	if got != 2 {
		t.Fatalf("Get() = %d, want 2", got)
	}
}
