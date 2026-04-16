package project

import (
	"context"
	"fmt"
	"slices"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
)

// checkerHeldAnonymous is a sentinel stored in heldBy when a checker is held
// by a caller that has no request ID (e.g., context.Background()). This
// distinguishes "held without ID" from "not held" (empty string).
const checkerHeldAnonymous = "<anonymous>"

type CheckerPoolOptions struct {
	// MaxCheckers controls the total number of checker slots per project
	// (1 dedicated diagnostics checker + N-1 query checkers). Minimum 2.
	// Zero uses the default (4).
	MaxCheckers int
	// IdleTimeout controls how long an idle checker is kept
	// before being disposed. Zero uses the default (30s).
	IdleTimeout time.Duration
}

// checkerPool manages three categories of type checkers for a project:
//
//   - Diagnostics (index 0): A single checker for LSP diagnostics, providing
//     consistent walk order. Idle-cleaned.
//   - Temporary (indices 1+): Ephemeral query checkers for LSP operations.
//     Idle-cleaned after a configurable timeout.
//   - API: A single checker for API operations, providing stable
//     instance identity for reference equality on type/symbol handles.
//     Never idle-cleaned.
type checkerPool struct {
	opts    CheckerPoolOptions
	program *compiler.Program

	mu sync.Mutex

	// discarded is set when the pool's program has been replaced. The pool
	// remains fully functional but stops its idle-cleanup timer so that
	// query checkers are not disposed until the pool is GC'd.
	discarded bool

	// checkers[0] is the diagnostics checker.
	// checkers[1:] are ephemeral query checkers.
	// All are idle-cleaned.
	checkers            []*checker.Checker
	heldBy              []string                // heldBy[i] is the requestID holding checker i, checkerHeldAnonymous, or "" if not held
	fileAssociations    map[*ast.SourceFile]int // file → query checker index (1+)
	requestAssociations map[string]int          // requestID → checker index

	// lastReleased tracks when each checker was last released.
	lastReleased []time.Time

	// cleanupTimer is reset each time a checker is released.
	// When it fires, idle checkers are disposed.
	cleanupTimer *time.Timer

	// persistentChecker is the API checker. It is never idle-cleaned,
	// providing stable instance identity for API clients.
	persistentChecker *checker.Checker
	persistentHeld    bool

	diagSem       chan struct{}
	querySem      chan struct{}
	persistentSem chan struct{}

	log                    func(msg string)
	globalDiagAccumulated  []*ast.Diagnostic
	globalDiagChanged      bool
	globalDiagCheckerCount []int // per-checker count of globals last seen
}

var _ compiler.CheckerPool = (*checkerPool)(nil)

func newCheckerPool(opts CheckerPoolOptions, program *compiler.Program, log func(msg string)) *checkerPool {
	if opts.MaxCheckers <= 0 {
		opts.MaxCheckers = 4
	} else if opts.MaxCheckers < 2 {
		opts.MaxCheckers = 2 // at least 1 diagnostics + 1 query checker
	}
	if opts.IdleTimeout <= 0 {
		opts.IdleTimeout = 30 * time.Second
	}
	querySlots := opts.MaxCheckers - 1
	pool := &checkerPool{
		program:                program,
		opts:                   opts,
		checkers:               make([]*checker.Checker, opts.MaxCheckers),
		heldBy:                 make([]string, opts.MaxCheckers),
		fileAssociations:       make(map[*ast.SourceFile]int),
		requestAssociations:    make(map[string]int),
		lastReleased:           make([]time.Time, opts.MaxCheckers),
		diagSem:                make(chan struct{}, 1),
		querySem:               make(chan struct{}, querySlots),
		persistentSem:          make(chan struct{}, 1),
		log:                    log,
		globalDiagCheckerCount: make([]int, opts.MaxCheckers),
	}
	return pool
}

// holdTag returns the value to store in heldBy for the given request ID.
func holdTag(requestID string) string {
	if requestID == "" {
		return checkerHeldAnonymous
	}
	return requestID
}

func (p *checkerPool) GetChecker(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
	lifetime := core.GetCheckerLifetime(ctx)
	requestID := core.GetRequestID(ctx)

	switch lifetime {
	case core.CheckerLifetimeDiagnostics:
		return p.getDiagnosticsChecker(ctx, requestID)
	case core.CheckerLifetimeAPI:
		return p.getPersistentChecker()
	default:
		return p.getQueryChecker(ctx, requestID, file)
	}
}

// tryReacquireForRequest checks whether the given request already has an
// associated checker. If so, it either returns the checker directly (still held)
// or reacquires it by claiming a semaphore slot. The caller must provide the
// appropriate semaphore channel and indicate whether this is a diagnostics
// request (isDiag). If the associated checker is in the wrong category
// (e.g. a diagnostics index for a query request), the association is deleted
// and normal acquisition proceeds.
//
// Returns (checker, release, true) if the request was served (either still held
// or reclaimed). Returns (nil, nil, false) if the caller must proceed with
// normal acquisition — in this case, a semaphore slot has already been claimed.
// Must NOT be called with p.mu held.
func (p *checkerPool) tryReacquireForRequest(requestID string, sem chan<- struct{}, isDiag bool) (*checker.Checker, func(), bool) {
	if requestID == "" {
		sem <- struct{}{}
		return nil, nil, false
	}

	p.mu.Lock()
	index, ok := p.requestAssociations[requestID]
	if !ok {
		p.mu.Unlock()
		sem <- struct{}{}
		return nil, nil, false
	}

	// Validate that the associated index matches the expected category.
	// Index 0 is for diagnostics; indices 1+ are for queries.
	if (isDiag && index != 0) || (!isDiag && index == 0) {
		delete(p.requestAssociations, requestID)
		p.mu.Unlock()
		sem <- struct{}{}
		return nil, nil, false
	}

	c := p.checkers[index]
	if c == nil {
		delete(p.requestAssociations, requestID)
		p.mu.Unlock()
		sem <- struct{}{}
		return nil, nil, false
	}

	held := p.heldBy[index]
	if held == requestID {
		// Same request, checker still held — return without claiming a slot.
		p.mu.Unlock()
		return c, noop, true
	}

	if held == "" {
		// Same request reacquiring after release — need a semaphore slot.
		p.mu.Unlock()
		sem <- struct{}{}
		p.mu.Lock()
		// Re-check: checker may have been disposed while waiting for the slot.
		if cc := p.checkers[index]; cc == c && p.heldBy[index] == "" {
			p.heldBy[index] = requestID
			p.mu.Unlock()
			return c, p.createRelease(requestID, index, c), true
		}
		p.mu.Unlock()
		// Checker was replaced/disposed while waiting for the slot.
		// The slot is still claimed; the caller will use it for normal acquisition.
		return nil, nil, false
	}

	// Checker held by another request — claim a slot normally.
	p.mu.Unlock()
	sem <- struct{}{}
	return nil, nil, false
}

// getDiagnosticsChecker returns the dedicated diagnostics checker (index 0).
// Creates it on first use. Blocks on diagSem if it's currently in use.
func (p *checkerPool) getDiagnosticsChecker(ctx context.Context, requestID string) (*checker.Checker, func()) {
	const diagIndex = 0

	if c, release, ok := p.tryReacquireForRequest(requestID, p.diagSem, true); ok {
		return c, release
	}

	// Token consumed — proceed with normal acquisition.
	p.mu.Lock()
	defer p.mu.Unlock()

	if p.checkers[diagIndex] == nil {
		p.log("checkerpool: Creating diagnostics checker")
		c, _ := checker.NewChecker(p.program)
		p.checkers[diagIndex] = c
	}

	c := p.checkers[diagIndex]
	p.heldBy[diagIndex] = holdTag(requestID)
	p.log("checkerpool: Acquired diagnostics checker for request " + holdTag(requestID))
	if requestID != "" {
		if _, alreadyRegistered := p.requestAssociations[requestID]; !alreadyRegistered {
			p.requestAssociations[requestID] = diagIndex
			p.registerRequestCleanup(ctx, requestID)
		}
	}
	return c, p.createRelease(requestID, diagIndex, c)
}

// getQueryChecker returns an ephemeral query checker from indices 1+.
// Uses request affinity, then file affinity, then finds/creates.
// Blocks on querySem if all query slots are in use.
func (p *checkerPool) getQueryChecker(ctx context.Context, requestID string, file *ast.SourceFile) (*checker.Checker, func()) {
	if c, release, ok := p.tryReacquireForRequest(requestID, p.querySem, false); ok {
		return c, release
	}

	// Token consumed — proceed with normal acquisition.
	p.mu.Lock()
	defer p.mu.Unlock()

	// Try file affinity.
	if file != nil {
		if index, ok := p.fileAssociations[file]; ok && index > 0 {
			if c := p.checkers[index]; c != nil && p.heldBy[index] == "" {
				p.heldBy[index] = holdTag(requestID)
				if requestID != "" {
					if _, alreadyRegistered := p.requestAssociations[requestID]; !alreadyRegistered {
						p.requestAssociations[requestID] = index
						p.registerRequestCleanup(ctx, requestID)
					}
				}
				return c, p.createRelease(requestID, index, c)
			}
		}
	}

	// Find any available query checker or create one.
	c, index := p.findOrCreateQueryCheckerLocked()
	p.heldBy[index] = holdTag(requestID)
	p.log(fmt.Sprintf("checkerpool: Acquired query checker %d for request %s", index, holdTag(requestID)))
	if requestID != "" {
		if _, alreadyRegistered := p.requestAssociations[requestID]; !alreadyRegistered {
			p.requestAssociations[requestID] = index
			p.registerRequestCleanup(ctx, requestID)
		}
	}
	if file != nil {
		p.fileAssociations[file] = index
	}
	return c, p.createRelease(requestID, index, c)
}

// findOrCreateQueryCheckerLocked returns an idle query checker or creates one
// in the first empty slot. The semaphore guarantees at least one slot is
// available. Must be called with p.mu held.
func (p *checkerPool) findOrCreateQueryCheckerLocked() (*checker.Checker, int) {
	// Prefer an existing idle checker.
	for i := 1; i < len(p.checkers); i++ {
		if c := p.checkers[i]; c != nil && p.heldBy[i] == "" {
			return c, i
		}
	}
	// Create in the first empty slot.
	for i := 1; i < len(p.checkers); i++ {
		if p.checkers[i] == nil {
			p.log(fmt.Sprintf("checkerpool: Creating query checker %d", i))
			c, _ := checker.NewChecker(p.program)
			p.checkers[i] = c
			return c, i
		}
	}
	panic("checkerpool: no available query slot despite holding semaphore token")
}

func (p *checkerPool) getPersistentChecker() (*checker.Checker, func()) {
	p.persistentSem <- struct{}{}
	p.mu.Lock()

	if p.persistentChecker == nil {
		p.log("checkerpool: Creating persistent checker")
		c, _ := checker.NewChecker(p.program)
		p.persistentChecker = c
	}

	c := p.persistentChecker
	p.persistentHeld = true
	p.mu.Unlock()

	return c, sync.OnceFunc(func() {
		p.mu.Lock()
		p.persistentHeld = false
		p.mu.Unlock()
		<-p.persistentSem
	})
}

func (p *checkerPool) createRelease(requestID string, index int, c *checker.Checker) func() {
	return sync.OnceFunc(func() {
		p.mu.Lock()

		if c.WasCanceled() {
			// Canceled checkers must be disposed.
			p.log(fmt.Sprintf("checkerpool: Checker %d for request %s was canceled, disposing", index, holdTag(requestID)))
			p.disposeCheckerLocked(index, c)
		} else {
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.heldBy[index] = ""
			p.lastReleased[index] = time.Now()
			if !p.discarded {
				p.scheduleCleanupLocked()
			}
			// If discarded, skip scheduling cleanup — checkers stay alive
			// until the pool is garbage collected so that API clients can
			// continue resolving type/symbol handles.
		}

		// Unlock before releasing the semaphore slot. If we received from
		// the channel while holding p.mu, a woken goroutine could immediately
		// try to acquire p.mu, risking priority inversion or unnecessary
		// contention.
		p.mu.Unlock()

		// Release the semaphore slot.
		if index == 0 {
			<-p.diagSem
		} else {
			<-p.querySem
		}
	})
}

// registerRequestCleanup uses context.AfterFunc to delete the request
// association when the request context is done. This prevents the map
// from growing unboundedly with completed request IDs.
// Must be called with p.mu held; the cleanup runs asynchronously.
func (p *checkerPool) registerRequestCleanup(ctx context.Context, requestID string) {
	context.AfterFunc(ctx, func() {
		p.mu.Lock()
		defer p.mu.Unlock()
		delete(p.requestAssociations, requestID)
	})
}

// scheduleCleanupLocked resets (or starts) the cleanup timer so it fires at
// the earliest pending checker-expiration deadline among all currently idle,
// unheld checkers.
// Must be called with p.mu held. Must NOT be called on discarded pools.
func (p *checkerPool) scheduleCleanupLocked() {
	var earliestDeadline time.Time
	for i := range p.checkers {
		if p.checkers[i] == nil || p.heldBy[i] != "" || p.lastReleased[i].IsZero() {
			continue
		}
		deadline := p.lastReleased[i].Add(p.opts.IdleTimeout)
		if earliestDeadline.IsZero() || deadline.Before(earliestDeadline) {
			earliestDeadline = deadline
		}
	}
	if earliestDeadline.IsZero() {
		// No idle checkers remain — stop the timer if it exists.
		if p.cleanupTimer != nil {
			p.cleanupTimer.Stop()
			p.cleanupTimer = nil
		}
		return
	}
	delay := time.Until(earliestDeadline)
	if delay <= 0 {
		delay = time.Millisecond
	}
	if p.cleanupTimer != nil {
		p.cleanupTimer.Reset(delay)
	} else {
		p.cleanupTimer = time.AfterFunc(delay, p.cleanupIdleCheckers)
	}
}

// cleanupIdleCheckers disposes checkers that have been idle for longer than
// the idle timeout. The API checker is separate and never idle-cleaned.
func (p *checkerPool) cleanupIdleCheckers() {
	p.mu.Lock()
	defer p.mu.Unlock()
	now := time.Now()
	for i := range p.checkers {
		c := p.checkers[i]
		if c == nil || p.heldBy[i] != "" {
			continue
		}
		if p.lastReleased[i].IsZero() {
			continue
		}
		idle := now.Sub(p.lastReleased[i])
		if idle >= p.opts.IdleTimeout {
			p.log(fmt.Sprintf("checkerpool: Disposing idle checker %d (idle %v)", i, idle))
			p.disposeCheckerLocked(i, c)
		}
	}
	// Reschedule for any remaining idle-but-not-yet-expired checkers.
	// scheduleCleanupLocked will Reset the existing timer rather than
	// creating a new one, avoiding goroutine leaks.
	p.scheduleCleanupLocked()
}

// disposeCheckerLocked removes a checker from the pool and clears all associations
// (file and request) that reference it. Must be called with p.mu held.
func (p *checkerPool) disposeCheckerLocked(index int, c *checker.Checker) {
	debug.Assert(p.checkers[index] == c)
	p.checkers[index] = nil
	p.heldBy[index] = ""
	p.globalDiagCheckerCount[index] = 0
	p.lastReleased[index] = time.Time{}
	for file, idx := range p.fileAssociations {
		if idx == index {
			delete(p.fileAssociations, file)
		}
	}
	for req, idx := range p.requestAssociations {
		if idx == index {
			delete(p.requestAssociations, req)
		}
	}
}

// mergeGlobalDiagnosticsFromCheckerLocked checks if the given checker has produced new global
// diagnostics since the last time we looked, and if so merges them into the accumulated set.
// Must be called with p.mu held.
func (p *checkerPool) mergeGlobalDiagnosticsFromCheckerLocked(index int, c *checker.Checker) {
	globals := c.GetGlobalDiagnostics()
	if len(globals) == p.globalDiagCheckerCount[index] {
		return
	}
	p.globalDiagCheckerCount[index] = len(globals)
	before := len(p.globalDiagAccumulated)
	p.globalDiagAccumulated = compiler.SortAndDeduplicateDiagnostics(append(p.globalDiagAccumulated, globals...))
	if len(p.globalDiagAccumulated) != before {
		p.globalDiagChanged = true
	}
}

// GetGlobalDiagnostics returns the accumulated global diagnostics collected from
// all checkers that have been used so far in this pool's lifetime.
func (p *checkerPool) GetGlobalDiagnostics() []*ast.Diagnostic {
	p.mu.Lock()
	defer p.mu.Unlock()
	return slices.Clone(p.globalDiagAccumulated)
}

// TakeNewGlobalDiagnostics reports whether new global diagnostics have been
// accumulated since the last call, and resets the flag.
func (p *checkerPool) TakeNewGlobalDiagnostics() bool {
	p.mu.Lock()
	defer p.mu.Unlock()
	changed := p.globalDiagChanged
	p.globalDiagChanged = false
	return changed
}

// Discard signals that this pool's program has been replaced. The pool
// remains functional but stops its idle-cleanup timer so that checkers
// are not disposed until the pool is GC'd. The API checker is unaffected
// since it is never idle-cleaned.
func (p *checkerPool) Discard() {
	p.mu.Lock()
	defer p.mu.Unlock()
	if p.discarded {
		return // already discarded
	}
	p.log("checkerpool: Discarding pool, stopping idle cleanup")
	p.discarded = true
	if p.cleanupTimer != nil {
		p.cleanupTimer.Stop()
		p.cleanupTimer = nil
	}
}

func noop() {}
