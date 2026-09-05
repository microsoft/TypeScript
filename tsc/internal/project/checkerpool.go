package project

import (
	"context"
	"fmt"
	"slices"
	"sync"
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

	// owners is how many of the checkers below are the program's own split; the rest are spares
	// that only queries are given.
	owners int
	// checkers are the checkers this program is checked with: the first owners of them are as many
	// as a build of it would use, with each file assigned to the same one a build would assign it
	// to. Created on demand and idle-cleaned; which slot owns a file does not change when that
	// slot's checker goes.
	checkers []*checker.Checker
	heldBy   []string // heldBy[i] is the requestID holding checker i, checkerHeldAnonymous, or "" if not held

	// waiting[i] counts the requests waiting for checker i. Work with a user behind it is counted;
	// a sweep is not, so a sweep can tell when to stand aside.
	waiting             []int
	fileAssociations    map[*ast.SourceFile]int // the compiler's partition: file → owning checker
	associationsOnce    sync.Once
	requestAssociations map[string]int // requestID → checker index

	// lastReleased tracks when each checker was last released.
	lastReleased []time.Time

	// cleanupTimer is reset each time a checker is released.
	// When it fires, idle checkers are disposed.
	cleanupTimer *time.Timer

	// persistentChecker is the API checker. It is never idle-cleaned,
	// providing stable instance identity for API clients.
	persistentChecker *checker.Checker
	persistentHeld    bool

	// free is signalled whenever a checker is handed back, waking whoever is waiting for one.
	free          *sync.Cond
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
	// The program's own split owns the files, so that a check of the whole project reports what a
	// build reports. Everything else - a document pull, a hover - shares those same checkers rather
	// than having any of its own.
	owners := program.CheckerCount()
	// A program is split across at most one checker per file, so a one-file project would otherwise
	// have a single checker and serialise every request against it. On a project large enough for
	// the split to reach the editor's limit - which is any real one - this asks for nothing extra.
	count := max(owners, opts.MaxCheckers)
	pool := &checkerPool{
		program:                program,
		opts:                   opts,
		owners:                 owners,
		checkers:               make([]*checker.Checker, count),
		heldBy:                 make([]string, count),
		waiting:                make([]int, count),
		requestAssociations:    make(map[string]int),
		lastReleased:           make([]time.Time, count),
		persistentSem:          make(chan struct{}, 1),
		log:                    log,
		globalDiagCheckerCount: make([]int, count),
	}

	pool.free = sync.NewCond(&pool.mu)
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

	if lifetime == core.CheckerLifetimeAPI {
		return p.getPersistentChecker()
	}
	// Prefers the checker that owns the file, so a request gets the one most likely to have already
	// seen it, but never waits for it. Only a check of the whole program insists on owners: that is
	// what makes a sweep report what a build reports, and it is the one caller that can afford to
	// wait. A request with a user behind it cannot, and would otherwise sit behind whatever file
	// the sweep is checking.
	return p.acquire(ctx, requestID, file, false /*mustOwn*/)
}

// ownerOf returns the checker a build would check this file with. Files the program does not have,
// and every file when there is only one checker, belong to the first.
func (p *checkerPool) ownerOf(file *ast.SourceFile) int {
	p.mu.Lock()
	defer p.mu.Unlock()
	return p.ownerOfLocked(file)
}

// ownerOfLocked is ownerOf for callers already holding p.mu.
func (p *checkerPool) ownerOfLocked(file *ast.SourceFile) int {
	if file == nil || p.owners == 1 {
		return 0
	}
	p.associationsOnce.Do(func() {
		files := p.program.SourceFiles()
		indexes := p.program.CheckerAssociations(p.owners)
		p.fileAssociations = make(map[*ast.SourceFile]int, len(files))
		for i, file := range files {
			if i < len(indexes) {
				p.fileAssociations[file] = indexes[i]
			}
		}
	})
	return p.fileAssociations[file]
}

// acquire hands out a checker for a file. Diagnostics get the one that owns it, because which
// checker sees a file decides what it reports and a pull has to report what a build would. A query
// does not depend on that, so if the owner is busy it takes whichever checker is free rather than
// wait behind a check of the whole project.
func (p *checkerPool) acquire(ctx context.Context, requestID string, file *ast.SourceFile, mustOwn bool) (*checker.Checker, func()) {
	p.mu.Lock()
	defer p.mu.Unlock()

	// A request that already holds a checker gets it back rather than waiting on itself.
	if requestID != "" {
		if index, ok := p.requestAssociations[requestID]; ok && p.heldBy[index] == requestID {
			if c := p.checkers[index]; c != nil {
				return c, noop
			}
		}
	}

	// A checker can only be used by one thing at a time. Diagnostics wait for the checker that owns
	// the file, because which checker sees a file decides what it reports; a query does not depend
	// on that, so it takes any free checker rather than wait behind a check of the whole project.
	// A sweep asks with no request id.
	background := requestID == ""
	var index, countedAt int
	var counted bool
	for {
		index = p.ownerOfLocked(file)
		// A sweep re-takes the same checker for file after file, so without standing aside here it
		// would starve a request that has to have that particular checker: the file the user is
		// looking at would wait for the whole project to be checked.
		yield := background && p.waiting[index] > 0
		if p.heldBy[index] == "" && !yield {
			break
		}
		if !mustOwn && !yield {
			if free, ok := p.firstFreeLocked(); ok {
				index = free
				break
			}
		}
		if !background && !counted {
			// Counted for the whole wait, not just one turn: dropping the count between waking and
			// re-checking would let the sweep take the checker again before this request could,
			// over and over.
			countedAt, counted = index, true
			p.waiting[index]++
		}
		p.free.Wait()
	}
	if counted {
		p.waiting[countedAt]--
	}

	// Claim the slot before building anything, so nothing else takes it while the lock is down.
	p.heldBy[index] = holdTag(requestID)
	if p.checkers[index] == nil {
		p.log(fmt.Sprintf("checkerpool: Creating checker %d", index))
		// Built with the lock released: on a large program this is slow, and holding the pool's
		// lock through it would stop every other request from getting a checker at all.
		p.mu.Unlock()
		built := func() *checker.Checker {
			defer p.mu.Lock()
			c, _ := checker.NewChecker(p.program, nil)
			return c
		}()
		if p.checkers[index] == nil {
			p.checkers[index] = built
		}
	}
	c := p.checkers[index]
	if requestID != "" {
		if _, alreadyRegistered := p.requestAssociations[requestID]; !alreadyRegistered {
			p.requestAssociations[requestID] = index
			p.registerRequestCleanup(ctx, requestID)
		}
	}
	return c, p.createRelease(requestID, index, c)
}

// firstFreeLocked returns a checker nothing is holding, preferring one that has already been built:
// an existing checker has seen files before and answers faster than one built from nothing, and
// building another costs the memory of a whole extra checker. Must be called with p.mu held.
func (p *checkerPool) firstFreeLocked() (int, bool) {
	empty := -1
	for i := range p.checkers {
		if p.heldBy[i] != "" {
			continue
		}
		if p.checkers[i] != nil {
			return i, true
		}
		if empty < 0 {
			empty = i
		}
	}
	if empty >= 0 {
		return empty, true
	}
	return 0, false
}

// ForEachCheckerGroupDo implements compiler.CheckerPool: one task per checker, each walking the
// files that checker owns, which is how a build checks a program.
//
// The checker is taken and handed back around each file rather than held for the whole group. A
// document pull needs the checker that owns its file and cannot be given another, so holding one
// for the length of a sweep would leave the file the user is looking at waiting for it.
func (p *checkerPool) ForEachCheckerGroupDo(ctx context.Context, files []*ast.SourceFile, singleThreaded bool, cb func(c *checker.Checker, fileIndex int, file *ast.SourceFile)) {
	groups := make([][]int, p.owners)
	for i, file := range files {
		owner := p.ownerOf(file)
		groups[owner] = append(groups[owner], i)
	}

	wg := core.NewWorkGroup(singleThreaded)
	for _, group := range groups {
		wg.Queue(func() {
			for _, i := range group {
				if ctx.Err() != nil {
					return
				}
				c, release := p.acquire(ctx, "", files[i], true /*mustOwn*/)
				cb(c, i, files[i])
				release()
			}
		})
	}
	wg.RunAndWait()
}

// releaseSweptCheckers lets go of the checkers that checked the whole program. They hold the types
// of every file in it, which is the largest thing a pull creates, and a pull that finds the project
// unchanged answers from result ids without checking anything.
func (p *checkerPool) releaseSweptCheckers() bool {
	p.mu.Lock()
	defer p.mu.Unlock()
	released := false
	for i := range p.owners {
		if c := p.checkers[i]; c != nil && p.heldBy[i] == "" {
			p.mergeGlobalDiagnosticsFromCheckerLocked(i, c)
			p.disposeCheckerLocked(i, c)
			released = true
		}
	}
	return released
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

		if c.WasCanceled() {
			// Canceled checkers must be disposed.
			p.log(fmt.Sprintf("checkerpool: Checker %d for request %s was canceled, disposing", index, holdTag(requestID)))
			p.disposeCheckerLocked(index, c)
		} else if p.discarded {
			// The program is gone; hand the checker's global diagnostics back and let it go rather
			// than wait for a cleanup pass that no longer runs.
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.disposeCheckerLocked(index, c)
		} else {
			p.mergeGlobalDiagnosticsFromCheckerLocked(index, c)
			p.heldBy[index] = ""
			p.lastReleased[index] = time.Now()
			p.scheduleCleanupLocked()
		}

		// Woken before unlocking so a waiter sees the slot free; it cannot run until we unlock.
		p.free.Broadcast()
		p.mu.Unlock()
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
	// The slot is now free, so anything waiting for this checker can take it.
	defer p.free.Broadcast()
	p.checkers[index] = nil
	p.heldBy[index] = ""
	p.globalDiagCheckerCount[index] = 0
	p.lastReleased[index] = time.Time{}
	// fileAssociations is the program's own split, not something this checker learned, so it
	// outlives the checker: the slot is simply refilled the next time one of its files is asked
	// about. Clearing it here would move every file the checker owned onto slot zero.
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
	p.mergeGlobalDiagnosticsLocked(globals)
}

// mergeGlobalDiagnosticsLocked merges global diagnostics into the accumulated set.
// Must be called with p.mu held.
func (p *checkerPool) mergeGlobalDiagnosticsLocked(globals []*ast.Diagnostic) {
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
	// The program these were built for has been replaced, so nothing will ask them anything again.
	// Idle cleanup does not run on a discarded pool, so without this they would be held until the
	// pool itself is collected, and each one holds the types of every file it saw. Checkers still
	// in use are let go of when they are handed back; the API checker is kept, since handles given
	// out to API clients have to keep resolving.
	for i, c := range p.checkers {
		if c != nil && p.heldBy[i] == "" {
			p.disposeCheckerLocked(i, c)
		}
	}
}

func noop() {}
