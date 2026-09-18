package project

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/execute/incremental"
)

// incrementalState carries what a project learned about which files a change reaches from one of
// its programs to the next, so a pull re-checks only the files an edit affected. It is held by
// pointer, so snapshots sharing a program share what it has built.
//
// It is built on the first pull that asks, not when the program is: building walks every file and
// resolves every import, and most programs are never pulled. It is built outside the lock, because
// next() runs while the session holds its snapshot write lock, with every request queued behind it.
type incrementalState struct {
	mu sync.Mutex
	// What the previous program left behind, holding no program of its own.
	previous *incremental.PriorState
	current  *incremental.Program
	// building is non-nil while a build is in flight and closed once it has published, so that a
	// second caller waits on the build rather than on the lock.
	building chan struct{}
	// referencesValid says previous describes a program this one is a clone of, so what each file
	// references has not moved. Working it out again means resolving every import in the program
	// through a type checker, which on a large project is the slowest thing a pull does.
	referencesValid bool
}

// get returns the incremental view of the program, building it from the previous program's
// bookkeeping the first time it is asked for.
func (s *incrementalState) get(program *compiler.Program) *incremental.Program {
	if s == nil {
		// A project built before it had any state to carry; nothing to chain from.
		return incremental.NewProgramFromPriorState(program, nil, nil, false /*reuseReferences*/)
	}
	for {
		current, previous, built, mine := s.claimBuild()
		switch {
		case current != nil:
			return current
		case mine:
			return s.publishBuild(incremental.NewProgramFromPriorState(program, previous, nil, s.referencesValid))
		default:
			// Waiting on the build rather than the lock is what keeps next() off it.
			<-built
		}
	}
}

// claimBuild says what to do: use what is there, wait for the build in flight, or build it. A
// caller told to build must publish, or whoever waits on it waits forever.
func (s *incrementalState) claimBuild() (current *incremental.Program, previous *incremental.PriorState, built <-chan struct{}, mine bool) {
	s.mu.Lock()
	defer s.mu.Unlock()
	switch {
	case s.current != nil:
		return s.current, nil, nil, false
	case s.building != nil:
		return nil, nil, s.building, false
	default:
		s.building = make(chan struct{})
		return nil, s.previous, nil, true
	}
}

// publishBuild hands the built view to whoever is waiting. A nil view means the build did not
// finish, and leaves the state as it was for the next caller to try again.
func (s *incrementalState) publishBuild(program *incremental.Program) *incremental.Program {
	s.mu.Lock()
	building := s.building
	s.building = nil
	if program != nil {
		s.current = program
		// The new view has taken what it needs; holding the old one keeps a program alive.
		s.previous = nil
	}
	s.mu.Unlock()
	// Closed after the state is published, so a waiter looking again finds it.
	close(building)
	return program
}

// next returns the state a replacement program starts from. It keeps what this one worked out and
// drops the program it worked it out from, which is the largest thing a project holds.
//
// A build in flight is not waited for: what it produces describes the program being replaced, so
// the replacement chains from the baseline that build started from and sees the changes since as
// one. The build finishes into a state nothing reads.
// cloned says the replacement program was made by replacing one file in this one, which is only
// possible when nothing about what any file references changed.
func (s *incrementalState) next(cloned bool) *incrementalState {
	if s == nil {
		return &incrementalState{}
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.current != nil {
		// previous describes the program being replaced, so the replacement being a clone of it is
		// all that is needed.
		return &incrementalState{previous: s.current.PriorState(), referencesValid: cloned}
	}
	// Nothing was built from previous, so it describes an earlier program still. It carries over
	// only if every step from there to here was a clone.
	return &incrementalState{previous: s.previous, referencesValid: cloned && s.referencesValid}
}
