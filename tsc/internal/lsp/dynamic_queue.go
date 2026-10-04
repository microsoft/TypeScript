package lsp

import (
	"context"
)

// Inspired by Brian C. Mills' "Rethinking Classical Concurrency Patterns" talk:
// https://www.youtube.com/watch?v=5zXAHh5tJqQ
//
// This queue is a state machine, where each state is a channel, "idle" or "ready".
// Only one caller ever has the actual state struct at a time. The Get function
// will wait until the "ready" channel holds the state. Putting an item
// means grabbing the state from any channel, modifying it, and putting it
// back on the "ready" channel. Since this is all managed via contexts, any method
// can be cancelled while waiting for the state.

type dynamicQueue[T any] struct {
	idle  chan *dynamicQueueState[T]
	ready chan *dynamicQueueState[T]
}

type dynamicQueueState[T any] struct {
	items []T
}

func newDynamicQueue[T any]() *dynamicQueue[T] {
	q := &dynamicQueue[T]{
		idle:  make(chan *dynamicQueueState[T], 1),
		ready: make(chan *dynamicQueueState[T], 1),
	}
	q.idle <- &dynamicQueueState[T]{}
	return q
}

func (q *dynamicQueue[T]) Put(ctx context.Context, item T) error {
	if err := ctx.Err(); err != nil {
		return err
	}

	state, err := q.getAny(ctx)
	if err != nil {
		return err
	}

	state.items = append(state.items, item)
	q.ready <- state
	return nil
}

func (q *dynamicQueue[T]) Get(ctx context.Context) (T, error) {
	if err := ctx.Err(); err != nil {
		var zero T
		return zero, err
	}

	state, err := q.getReady(ctx)
	if err != nil {
		var zero T
		return zero, err
	}

	item := state.items[0]
	var zero T
	state.items[0] = zero
	state.items = state.items[1:]

	if len(state.items) == 0 {
		state.items = nil
		q.idle <- state
	} else {
		q.ready <- state
	}
	return item, nil
}

func (q *dynamicQueue[T]) getAny(ctx context.Context) (*dynamicQueueState[T], error) {
	select {
	case state := <-q.idle:
		return state, nil
	case state := <-q.ready:
		return state, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	}
}

func (q *dynamicQueue[T]) getReady(ctx context.Context) (*dynamicQueueState[T], error) {
	select {
	case state := <-q.ready:
		return state, nil
	case <-ctx.Done():
		return nil, ctx.Err()
	}
}
