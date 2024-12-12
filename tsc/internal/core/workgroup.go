package core

import "sync"

type WorkGroup struct {
	wg               sync.WaitGroup
	singleThreaded   bool
	singleThreadedMu sync.Mutex
}

func NewWorkGroup(singleThreaded bool) *WorkGroup {
	return &WorkGroup{
		singleThreaded: singleThreaded,
	}
}

func (w *WorkGroup) Run(fn func()) {
	w.wg.Add(1)
	go func() {
		defer w.wg.Done()
		if w.singleThreaded {
			w.singleThreadedMu.Lock()
			defer w.singleThreadedMu.Unlock()
		}
		fn()
	}()
}

func (w *WorkGroup) Wait() {
	w.wg.Wait()
}
