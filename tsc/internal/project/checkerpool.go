package project

import (
	"context"
	"fmt"
	"slices"
	"sync"
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// checkerHeldAnonymous is a sentinel stored in heldBy when a checker is held
// by a caller that has no request ID (e.g., context.Background()). This
// distinguishes "held without ID" from "not held" (empty string).
const checkerHeldAnonymous = "<anonymous>"

type CheckerPoolOptions struct {
	// MaxCheckers bounds the query checkers a project keeps, at MaxCheckers-1 of them. Minimum 2.
	// Zero uses the default (4). Diagnostics checkers are counted separately; see
	// MatchBuildCheckerCount.
	MaxCheckers int
	// IdleTimeout controls how long an idle checker is kept
	// before being disposed. Zero uses the default (30s).
	IdleTimeout time.Duration
	// MatchBuildCheckerCount makes diagnostics run on as many checkers as a build would use, over
	// the same partition of files. Only a workspace pull checks a project that way; without it a
	// project keeps one diagnostics checker and does not pay for the rest.
	MatchBuildCheckerCount bool
}

// checkerPool manages three categories of type checkers for a project:
//
//   - Diagnostics (indices 0 to diagnosticsCount-1): the checkers a build of this program would
//     use, over the same partition of its files, so a file is checked in the editor by the checker
//     the command line would check it with. Idle-cleaned.
//   - Temporary (indices diagnosticsCount+): Ephemeral query checkers for LSP operations.
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

	// interactive is the session's count of work a user is waiting on. A whole-program check
	// stands aside while any of it is outstanding, and an interactive check adds to it.
	interactive *interactiveWork

	// diagnosticsCount is how many checkers a build of this program would check it with.
	diagnosticsCount int
	// diagnosticsAssociations maps each of the program's files to the diagnostics checker that owns
	// it. Built on first use, because working it out walks every file in the program and most
	// programs are never asked for diagnostics.
	diagnosticsAssociations     map[*ast.SourceFile]int
	diagnosticsAssociationsOnce sync.Once

	// checkers[:diagnosticsCount] are the diagnostics checkers.
	// checkers[diagnosticsCount:] are ephemeral query checkers.
	// All are idle-cleaned.
	checkers            []*checker.Checker
	heldBy              []string                // heldBy[i] is the requestID holding checker i, checkerHeldAnonymous, or "" if not held
	fileAssociations    map[*ast.SourceFile]int // file → query checker index
	requestAssociations map[string]int          // requestID → query checker index

	// lastReleased tracks when each checker was last released.
	lastReleased []time.Time

	// cleanupTimer is reset each time a checker is released.
	// When it fires, idle checkers are disposed.
	cleanupTimer *time.Timer

	// persistentChecker is the API checker. It is never idle-cleaned,
	// providing stable instance identity for API clients.
	persistentChecker *checker.Checker
	persistentHeld    bool

	// Which diagnostics checker serves a request is decided by the file, so they get a slot each
	// rather than sharing a counting semaphore the way the interchangeable query checkers do.
	diagSems      []chan struct{}
	querySem      chan struct{}
	persistentSem chan struct{}

	log                    func(msg string)
	globalDiagAccumulated  []*ast.Diagnostic
	globalDiagChanged      bool
	globalDiagCheckerCount []int // per-checker count of globals last seen
}

var _ compiler.CheckerPool = (*checkerPool)(nil)

func newCheckerPool(opts CheckerPoolOptions, program *compiler.Program, interactive *interactiveWork, log func(msg string)) *checkerPool {
	if opts.MaxCheckers <= 0 {
		opts.MaxCheckers = 4
	} else if opts.MaxCheckers < 2 {
		opts.MaxCheckers = 2 // at least the diagnostics slot + 1 query checker
	}
	if opts.IdleTimeout <= 0 {
		opts.IdleTimeout = 30 * time.Second
	}
	querySlots := opts.MaxCheckers - 1
	// The partition only pays for itself when whole projects are checked the way a build does.
	diagnosticsCount := 1
	if opts.MatchBuildCheckerCount {
		diagnosticsCount = compiler.GetCheckerCount(program)
	}
	diagSems := make([]chan struct{}, diagnosticsCount)
	for i := range diagSems {
		diagSems[i] = make(chan struct{}, 1)
	}
	slots := diagnosticsCount + querySlots
	pool := &checkerPool{
		program:                program,
		opts:                   opts,
		interactive:            interactive,
		diagnosticsCount:       diagnosticsCount,
		checkers:               make([]*checker.Checker, slots),
		heldBy:                 make([]string, slots),
		fileAssociations:       make(map[*ast.SourceFile]int),
		requestAssociations:    make(map[string]int),
		lastReleased:           make([]time.Time, slots),
		diagSems:               diagSems,
		querySem:               make(chan struct{}, querySlots),
		persistentSem:          make(chan struct{}, 1),
		log:                    log,
		globalDiagCheckerCount: make([]int, slots),
	}

	if pool.log == nil {
		pool.log = func(msg string) {}
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

	// Request affinity is cleaned up via context.AfterFunc when the request
	// context is done. If the context can never be canceled (ctx.Done() == nil,
	// e.g. context.Background()), that cleanup would never run and
	// requestAssociations would grow unboundedly, so disable affinity entirely.
	if ctx.Done() == nil {
		requestID = ""
	}

	switch lifetime {
	case core.CheckerLifetimeDiagnostics:
		return p.getDiagnosticsChecker(requestID, file, core.IsInteractiveRequest(ctx))
	case core.CheckerLifetimeAPI:
		return p.getPersistentChecker()
	default:
		return p.getQueryChecker(ctx, requestID, file)
	}
}

// tryReacquireForRequest checks whether the given request already has an
// associated query checker. If so, it either returns the checker directly (still
// held) or reacquires it by claiming a semaphore slot.
//
// Returns (checker, release, true) if the request was served (either still held
// or reclaimed). Returns (nil, nil, false) if the caller must proceed with
// normal acquisition — in this case, a semaphore slot has already been claimed.
// Must NOT be called with p.mu held.
func (p *checkerPool) tryReacquireForRequest(requestID string, sem chan<- struct{}) (*checker.Checker, func(), bool) {
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

// getDiagnosticsAssociations returns which diagnostics checker owns each of the program's files,
// split the way a build splits them.
func (p *checkerPool) getDiagnosticsAssociations() map[*ast.SourceFile]int {
	p.diagnosticsAssociationsOnce.Do(func() {
		files := p.program.SourceFiles()
		associations := compiler.GetFileCheckerAssociations(p.program, p.diagnosticsCount)
		byFile := make(map[*ast.SourceFile]int, len(files))
		for i, file := range files {
			byFile[file] = associations[i]
		}
		p.diagnosticsAssociations = byFile
	})
	return p.diagnosticsAssociations
}

// diagnosticsIndexFor returns the diagnostics checker that owns a file. A caller that named no
// file, or one the program does not have, gets the first checker, as it would from a build.
func (p *checkerPool) diagnosticsIndexFor(file *ast.SourceFile) int {
	if file == nil || p.diagnosticsCount == 1 {
		return 0
	}
	return p.getDiagnosticsAssociations()[file]
}

// getDiagnosticsChecker returns the diagnostics checker that owns the file. Unlike a query checker
// it is not reacquired by request: the file decides which one a caller gets, so a request is handed
// back the checker that already holds that file's types. A caller must not hold one diagnostics
// checker while asking for another, or two doing it in opposite orders would deadlock.
func (p *checkerPool) getDiagnosticsChecker(requestID string, file *ast.SourceFile, interactive bool) (*checker.Checker, func()) {
	// Counted from before the wait for the checker rather than from when it is handed over, so a
	// whole-program check stands aside for this rather than taking the checker out from under it.
	var interactiveDone func()
	if interactive {
		interactiveDone = p.interactive.begin()
	}

	index := p.diagnosticsIndexFor(file)
	c, release := p.acquireDiagnosticsChecker(index, requestID)
	p.log(fmt.Sprintf("checkerpool: Acquired diagnostics checker %d for request %s", index, holdTag(requestID)))
	if interactiveDone == nil {
		return c, release
	}
	return c, sync.OnceFunc(func() {
		release()
		interactiveDone()
	})
}

// acquireDiagnosticsChecker takes the numbered diagnostics checker, creating it on first use and
// blocking while another caller holds it.
func (p *checkerPool) acquireDiagnosticsChecker(index int, requestID string) (*checker.Checker, func()) {
	p.diagSems[index] <- struct{}{}

	p.mu.Lock()
	// Marking the slot held before letting go of the lock keeps idle cleanup and Discard off it
	// while there is nothing in it to see.
	p.heldBy[index] = holdTag(requestID)
	c := p.checkers[index]
	p.mu.Unlock()

	if c == nil {
		// Built without the pool's lock: building a checker merges the globals of every file in
		// the program, and a whole-program check builds one per checker at once.
		p.log(fmt.Sprintf("checkerpool: Creating diagnostics checker %d", index))
		c, _ = checker.NewChecker(p.program, nil)
		p.mu.Lock()
		p.checkers[index] = c
		p.mu.Unlock()
	}

	return c, p.createRelease(requestID, index, c)
}

// ForEachCheckerGroupDo implements compiler.CheckerPool. A whole-program check runs on the
// diagnostics checkers, over the partition a build uses, so the editor and the command line check
// each file with the same checker. Query checkers, handed out by request rather than by file, take
// no part in it.
func (p *checkerPool) ForEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
	associations := p.getDiagnosticsAssociations()
	// A caller the user is waiting on is what everything else stands aside for; waiting here would
	// be waiting on itself, and one group's checkers would take turns rather than run together.
	standAside := !core.IsInteractiveRequest(ctx)
	// Counted across the groups rather than per group, so a caller sees one number for the check
	// rather than one per checker.
	reportProgress := checkProgressFrom(ctx)
	var checked atomic.Int64
	wg := core.NewWorkGroup(singleThreaded)
	for index := range p.diagnosticsCount {
		wg.Queue(func() {
			// Files this checker owns, in the order they were given. A file the program does not
			// have belongs to no checker and is left alone.
			var group []int
			for i, file := range files {
				if owner, ok := associations[file]; ok && owner == index {
					group = append(group, i)
				}
			}
			if len(group) == 0 {
				// Nothing to do, so don't build a checker to do it with.
				return
			}
			requestID := core.GetRequestID(ctx)
			p.log(fmt.Sprintf("checkerpool: Checking %d files on diagnostics checker %d for request %s", len(group), index, holdTag(requestID)))
			for _, i := range group {
				// A cancelled caller discards what comes back anyway. Checked here rather than
				// left to waitForIdle, which returns without looking at the context when nothing
				// is outstanding. Bailing leaves the rest of the group's diagnostics zero, so a
				// caller must test for cancellation before reading them.
				if ctx.Err() != nil {
					return
				}
				// Stand aside between files for anything the user is waiting on. Nothing is held
				// while waiting, so the work being waited for can take this checker if it needs it.
				if standAside {
					if err := p.interactive.waitForIdle(ctx); err != nil {
						return
					}
				}
				// Taken a file at a time rather than for the whole group, so that standing aside
				// is possible at all: a check of the whole project runs for as long as the project
				// is big, and a pull on an open file this checker owns would otherwise wait out
				// all of it.
				c, release := p.acquireDiagnosticsChecker(index, requestID)
				cb(c, i, files[i])
				release()
				if reportProgress != nil {
					reportProgress(int(checked.Add(1)), len(files))
				}
			}
		})
	}
	wg.RunAndWait()
}

// releaseDiagnosticsCheckers drops the checkers a whole-program check used. They hold the types of
// every file it reached, which is worth keeping only while something is likely to ask again. One
// another caller is holding is left to the idle timer. The global diagnostics they found are kept,
// since nothing else collects them.
func (p *checkerPool) releaseDiagnosticsCheckers() bool {
	p.mu.Lock()
	defer p.mu.Unlock()
	released := false
	for index := range p.diagnosticsCount {
		c := p.checkers[index]
		if c == nil || p.heldBy[index] != "" {
			continue
		}
		p.log(fmt.Sprintf("checkerpool: Releasing diagnostics checker %d on request", index))
		p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
		p.disposeCheckerLocked(index, c)
		released = true
	}
	if released && !p.discarded {
		p.scheduleCleanupLocked()
	}
	return released
}

// getQueryChecker returns an ephemeral query checker from the slots after the diagnostics ones.
// Uses request affinity, then file affinity, then finds/creates.
// Blocks on querySem if all query slots are in use.
func (p *checkerPool) getQueryChecker(ctx context.Context, requestID string, file *ast.SourceFile) (*checker.Checker, func()) {
	if c, release, ok := p.tryReacquireForRequest(requestID, p.querySem); ok {
		return c, release
	}

	// Token consumed — proceed with normal acquisition.
	p.mu.Lock()
	defer p.mu.Unlock()

	// Try file affinity.
	if file != nil {
		if index, ok := p.fileAssociations[file]; ok && index >= p.diagnosticsCount {
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
	for i := p.diagnosticsCount; i < len(p.checkers); i++ {
		if c := p.checkers[i]; c != nil && p.heldBy[i] == "" {
			return c, i
		}
	}
	// Create in the first empty slot.
	for i := p.diagnosticsCount; i < len(p.checkers); i++ {
		if p.checkers[i] == nil {
			p.log(fmt.Sprintf("checkerpool: Creating query checker %d", i))
			c, _ := checker.NewChecker(p.program, nil)
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
		c, _ := checker.NewChecker(p.program, nil)
		p.persistentChecker = c
	}

	c := p.persistentChecker
	p.persistentHeld = true
	p.mu.Unlock()

	return c, sync.OnceFunc(func() {
		p.mu.Lock()
		p.persistentHeld = false
		if c.WasCanceled() {
			// A canceled checker panics on reuse, so drop it; the next API
			// acquisition will create a fresh persistent checker.
			p.log("checkerpool: Persistent checker was canceled, disposing")
			if p.persistentChecker == c {
				p.persistentChecker = nil
			}
		}
		p.mu.Unlock()
		<-p.persistentSem
	})
}

func (p *checkerPool) createRelease(requestID string, index int, c *checker.Checker) func() {
	return sync.OnceFunc(func() {
		p.mu.Lock()

		switch {
		case c.WasCanceled():
			// Canceled checkers must be disposed.
			p.log(fmt.Sprintf("checkerpool: Checker %d for request %s was canceled, disposing", index, holdTag(requestID)))
			p.disposeCheckerLocked(index, c)
		case p.discarded && index < p.diagnosticsCount:
			// The program this checked has been replaced, so nothing will ask it for diagnostics
			// again. Let go of it rather than holding a whole program's types until the pool is.
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.disposeCheckerLocked(index, c)
		default:
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.heldBy[index] = ""
			p.lastReleased[index] = time.Now()
			if !p.discarded {
				p.scheduleCleanupLocked()
			}
			// If discarded, skip scheduling cleanup — query checkers stay alive
			// until the pool is garbage collected so that API clients can
			// continue resolving type/symbol handles.
		}

		// Unlock before releasing the semaphore slot. If we received from
		// the channel while holding p.mu, a woken goroutine could immediately
		// try to acquire p.mu, risking priority inversion or unnecessary
		// contention.
		p.mu.Unlock()

		// Release the semaphore slot.
		if index < p.diagnosticsCount {
			<-p.diagSems[index]
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
	// The timer callback may already have been in flight when Discard() called
	// Stop() (which does not guarantee the callback won't run). Bail out without
	// rescheduling so a discarded pool doesn't keep itself alive via a new timer.
	if p.discarded {
		return
	}
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
	if len(globals) == 0 {
		return
	}
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
// remains functional but stops its idle-cleanup timer so that query checkers
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
	// A discarded pool belongs to a program that has been replaced, so let go of the checkers a
	// sweep left behind rather than holding a whole program's types for the life of the snapshot.
	// Query checkers stay: an API client may still be resolving handles they handed out.
	for index := range p.diagnosticsCount {
		if c := p.checkers[index]; c != nil && p.heldBy[index] == "" {
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.disposeCheckerLocked(index, c)
		}
	}
	if p.cleanupTimer != nil {
		p.cleanupTimer.Stop()
		p.cleanupTimer = nil
	}
}

func noop() {}
