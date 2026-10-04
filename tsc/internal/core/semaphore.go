package core

import "context"

type Semaphore interface {
	Acquire() (release func())
	TryAcquire(ctx context.Context) (release func(), acquired bool)
}

var _ Semaphore = UnlimitedSemaphore{}

type UnlimitedSemaphore struct{}

func (s UnlimitedSemaphore) Acquire() (release func()) {
	return func() {}
}

func (s UnlimitedSemaphore) TryAcquire(ctx context.Context) (release func(), acquired bool) {
	return func() {}, true
}

var _ Semaphore = (*LimitedSemaphore)(nil)

type LimitedSemaphore struct {
	ch      chan struct{}
	release func()
}

func NewLimitedSemaphore(maxConcurrency int) *LimitedSemaphore {
	if maxConcurrency <= 0 {
		panic("maxConcurrency must be positive")
	}
	s := &LimitedSemaphore{
		ch: make(chan struct{}, maxConcurrency),
	}
	s.release = func() { <-s.ch }
	return s
}

func (s *LimitedSemaphore) Acquire() (release func()) {
	s.ch <- struct{}{}
	return s.release
}

func (s *LimitedSemaphore) TryAcquire(ctx context.Context) (release func(), acquired bool) {
	select {
	case s.ch <- struct{}{}:
		return s.release, true
	case <-ctx.Done():
		return func() {}, false
	}
}
