package project

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
)

// incrementalState carries what a project learned about which files a change reaches from one of
// its programs to the next, so a pull re-checks only the files an edit affected.
//
// It is built on the first pull that asks, not when the program is, because building it walks every
// file in the program and most programs are never pulled. Like the checker pool it is held by
// pointer, so the snapshots that share a program share what it has built.
type incrementalState struct {
	mu sync.Mutex
	// What the previous program left behind, holding no program of its own.
	previous *incremental.PriorState
	current  *incremental.Program
}

// get returns the incremental view of the program, building it from the previous program's
// bookkeeping the first time it is asked for.
func (s *incrementalState) get(program *compiler.Program) *incremental.Program {
	if s == nil {
		// A project built before it had any state to carry; nothing to chain from.
		return incremental.NewProgramFromPriorState(program, nil, nil)
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.current == nil {
		s.current = incremental.NewProgramFromPriorState(program, s.previous, nil)
		// The new view has taken what it needs; holding the old one keeps a program alive.
		s.previous = nil
	}
	return s.current
}

// next returns the state a replacement program starts from. It keeps what this one worked out and
// drops the program it worked it out from, which is the largest thing a project holds.
func (s *incrementalState) next() *incrementalState {
	if s == nil {
		return &incrementalState{}
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.current != nil {
		return &incrementalState{previous: s.current.PriorState()}
	}
	return &incrementalState{previous: s.previous}
}
