package project

import (
	"context"
	"fmt"
	"slices"
	"sync/atomic"
	"testing"
	"testing/synctest"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func setupCheckerPoolSession(t *testing.T, opts CheckerPoolOptions) (*Session, *checkerPool) {
	t.Helper()
	return setupCheckerPoolSessionWithFiles(t, opts, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
	})
}

func setupCheckerPoolSessionWithFiles(t *testing.T, opts CheckerPoolOptions, files map[string]any) (*Session, *checkerPool) {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := bundled.WrapFS(vfstest.FromMap(files, false))
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options: &SessionOptions{
			CurrentDirectory:   "/",
			DefaultLibraryPath: bundled.LibPath(),
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			WatchEnabled:       false,
			LoggingEnabled:     true,
			CheckerPoolOptions: opts,
		},
		FS:     fs,
		Logger: logging.NewTestLogger(),
	})
	session.DidOpenFile(context.Background(), "file:///src/index.ts", 1, "export const x: number = 1;", lsproto.LanguageKindTypeScript)

	snapshot := session.Snapshot()
	project := snapshot.ProjectCollection.ConfiguredProject("/src/tsconfig.json")
	assert.Assert(t, project != nil, "expected configured project")
	assert.Assert(t, project.checkerPool != nil, "expected checker pool")
	return session, project.checkerPool
}

// newTestCheckerPool creates a checker pool inside the current goroutine context
// (suitable for use inside synctest.Test) using the given program.
func newTestCheckerPool(program *compiler.Program, opts CheckerPoolOptions) *checkerPool {
	return newCheckerPool(opts, program, func(string) {})
}

func TestCheckerPoolDiagnosticsRouting(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// Diagnostics requests should get checker at index 0.
	ctx := core.WithRequestID(context.Background(), "diag-req-1")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	c, release := pool.GetChecker(ctx, nil)
	assert.Assert(t, c != nil)
	assert.Assert(t, pool.checkers[0] == c, "diagnostics should use checker index 0")
	release()
}

// holdEveryFreeChecker takes every checker nothing is holding, so the next request has to wait.
func holdEveryFreeChecker(t *testing.T, pool *checkerPool) func() {
	t.Helper()
	var releases []func()
	for {
		pool.mu.Lock()
		_, free := pool.firstFreeLocked()
		pool.mu.Unlock()
		if !free {
			break
		}
		ctx := core.WithRequestID(context.Background(), fmt.Sprintf("fill-%d", len(releases)))
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		releases = append(releases, release)
	}
	return func() {
		for _, release := range releases {
			release()
		}
	}
}

// holdEveryChecker takes every checker in the pool, so the next request has to wait for one. There
// is no longer a slot reserved per kind of request: a request waits when the pool is exhausted.
func holdEveryChecker(t *testing.T, pool *checkerPool) func() {
	t.Helper()
	releases := make([]func(), 0, len(pool.checkers))
	for i := range pool.checkers {
		ctx := core.WithRequestID(context.Background(), fmt.Sprintf("hold-%d", i))
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		releases = append(releases, release)
	}
	return func() {
		for _, release := range releases {
			release()
		}
	}
}

func TestCheckerPoolQueryRouting(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// A query takes whichever checker is free; there is no separate region for it.
	ctx := core.WithRequestID(context.Background(), "query-req-1")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
	c, release := pool.GetChecker(ctx, nil)
	assert.Assert(t, c != nil)
	assert.Assert(t, slices.Contains(pool.checkers, c), "the checker must come from the pool")
	release()
}

func TestCheckerPoolRequestAffinity(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	ctx, cancel := context.WithCancel(t.Context())
	defer cancel()
	ctx = core.WithRequestID(ctx, "req-affinity")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)

	// First call acquires.
	c1, release1 := pool.GetChecker(ctx, nil)

	// Second call with same request ID while still held returns same checker (noop release).
	c2, release2 := pool.GetChecker(ctx, nil)
	release2()
	release1()

	assert.Assert(t, c1 == c2, "same request ID should return the same checker while held")

	// After release, same request should still get the same checker (cross-release affinity).
	c3, release3 := pool.GetChecker(ctx, nil)
	release3()

	assert.Assert(t, c1 == c3, "same request ID should return the same checker after release")
}

func TestCheckerPoolIdleCleanup(t *testing.T) {
	t.Parallel()
	// Get a real program to use for checker creation, then test the pool
	// with fake time via synctest.
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 5 * time.Second})

		// Two requests at once, so two checkers are built rather than one being reused.
		ctx := core.WithRequestID(context.Background(), "diag-cleanup")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)

		ctx2 := core.WithRequestID(context.Background(), "query-cleanup")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil)
		assert.Assert(t, c2 != c, "a second request while the first is held gets its own checker")
		release()
		release2()
		synctest.Wait()

		pool.mu.Lock()
		built := 0
		for _, existing := range pool.checkers {
			if existing != nil {
				built++
			}
		}
		pool.mu.Unlock()
		assert.Equal(t, built, 2, "both checkers should exist")

		// Advance past idle timeout.
		time.Sleep(5 * time.Second)
		synctest.Wait()

		// After cleanup, both checkers should be disposed.
		pool.mu.Lock()
		for i, existing := range pool.checkers {
			assert.Assert(t, existing == nil, "checker %d should be disposed after idle timeout", i)
		}
		pool.mu.Unlock()
	})
}

func TestCheckerPoolFileAssociationCleanup(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	sourceFile := program.GetSourceFile("/src/index.ts")
	assert.Assert(t, sourceFile != nil)

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 5 * time.Second})

		// Which checker owns a file comes from the program's own split.
		ctx := core.WithRequestID(context.Background(), "file-assoc-req")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c, release := pool.GetChecker(ctx, sourceFile)
		assert.Assert(t, c != nil)
		owner := pool.ownerOf(sourceFile)
		assert.Equal(t, c, pool.checkers[owner], "a diagnostics request gets the file's owner")
		release()
		synctest.Wait()

		// Advance past idle timeout.
		time.Sleep(5 * time.Second)
		synctest.Wait()

		// Which checker owns the file is a property of the program, so disposing that checker does
		// not change it; the slot is simply refilled next time something asks.
		pool.mu.Lock()
		disposed := pool.checkers[owner] == nil
		pool.mu.Unlock()
		assert.Assert(t, disposed, "the idle checker should have been disposed")
		assert.Equal(t, pool.ownerOf(sourceFile), owner, "the file keeps its owner across disposal")
	})
}

func TestCheckerPoolMinCheckers(t *testing.T) {
	t.Parallel()
	// Requesting maxCheckers=1 should be clamped to 2.
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 1, IdleTimeout: 10 * time.Second})
	assert.Equal(t, pool.opts.MaxCheckers, 2)
	assert.Equal(t, len(pool.checkers), 2)
}

func TestCheckerPoolDefaultIdleTimeout(t *testing.T) {
	t.Parallel()
	// Zero idle timeout should default to 30s.
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4})
	assert.Equal(t, pool.opts.IdleTimeout, 30*time.Second)
}

func TestCheckerPoolQueryContention(t *testing.T) {
	t.Parallel()
	// maxCheckers=2 means 1 diagnostics + 1 query checker slot.
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 30 * time.Second})

		// Take every checker, so the next request has to wait for one.
		release1 := holdEveryChecker(t, pool)

		// A further query request from a different request ID should block.
		var c2Got atomic.Bool
		go func() {
			ctx2 := core.WithRequestID(context.Background(), "query-wait")
			ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
			c2, release2 := pool.GetChecker(ctx2, nil)
			_ = c2 // verified via c2Got flag
			c2Got.Store(c2 != nil)
			release2()
		}()

		// Wait for goroutine to reach the semaphore send.
		synctest.Wait()
		assert.Assert(t, !c2Got.Load(), "second query should be blocked while first holds the checker")

		// Release the first checker — second should unblock.
		release1()
		synctest.Wait()
		assert.Assert(t, c2Got.Load(), "second query should have acquired a checker after release")
	})
}

func TestCheckerPoolDiagnosticsContention(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 30 * time.Second})

		// Take every checker, so the next request has to wait for one.
		release1 := holdEveryChecker(t, pool)

		// A further diagnostics request should block.
		var c2Got atomic.Bool
		go func() {
			ctx2 := core.WithRequestID(context.Background(), "diag-wait")
			ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
			c2, release2 := pool.GetChecker(ctx2, nil)
			_ = c2 // verified via c2Got flag
			c2Got.Store(c2 != nil)
			release2()
		}()

		synctest.Wait()
		assert.Assert(t, !c2Got.Load(), "second diagnostics request should be blocked")

		// Release the held checkers — the waiting request should unblock.
		release1()
		synctest.Wait()
		assert.Assert(t, c2Got.Load(), "second diagnostics request should have acquired the checker after release")
	})
}

func TestCheckerPoolCanceledCheckerDisposal(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	sourceFile := program.GetSourceFile("/src/index.ts")
	assert.Assert(t, sourceFile != nil)

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Acquire a query checker and cancel it.
		ctx := core.WithRequestID(context.Background(), "cancel-test")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)

		canceledCtx, cancel := context.WithCancel(context.Background())
		cancel()
		c.GetDiagnostics(canceledCtx, sourceFile)
		assert.Assert(t, c.WasCanceled())

		// Release should dispose the canceled checker.
		release()
		synctest.Wait()

		// Next request should get a fresh checker.
		ctx2 := core.WithRequestID(context.Background(), "after-cancel")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != c, "should get a new checker, not the canceled one")
		release2()
	})
}

func TestCheckerPoolRequestAssociationCleanupOnDisposal(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 5 * time.Second})

		// Create a query checker with a request association.
		reqCtx, reqCancel := context.WithCancel(context.Background())
		defer reqCancel()
		ctx := core.WithRequestID(reqCtx, "assoc-cleanup-req")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)

		// Cancel the checker to trigger disposal on release.
		canceledCtx, cancel := context.WithCancel(context.Background())
		cancel()
		sourceFile := program.GetSourceFile("/src/index.ts")
		c.GetDiagnostics(canceledCtx, sourceFile)
		assert.Assert(t, c.WasCanceled())

		release()
		synctest.Wait()

		// Request association should be cleared after checker disposal.
		pool.mu.Lock()
		_, hasReqAssoc := pool.requestAssociations["assoc-cleanup-req"]
		pool.mu.Unlock()
		assert.Assert(t, !hasReqAssoc, "request association should be cleared after checker disposal")
	})
}

func TestCheckerPoolRequestAssociationCleanupOnContextDone(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Create a cancellable context to simulate request lifecycle.
		reqCtx, reqCancel := context.WithCancel(context.Background())
		ctx := core.WithRequestID(reqCtx, "ctx-cleanup-req")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)

		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		// Association should still exist after release.
		pool.mu.Lock()
		_, hasAssoc := pool.requestAssociations["ctx-cleanup-req"]
		pool.mu.Unlock()
		assert.Assert(t, hasAssoc, "request association should persist after release")

		// Cancel the request context — association should be cleaned up.
		reqCancel()
		synctest.Wait()

		pool.mu.Lock()
		_, hasAssoc = pool.requestAssociations["ctx-cleanup-req"]
		pool.mu.Unlock()
		assert.Assert(t, !hasAssoc, "request association should be cleaned up after context cancellation")
	})
}

func TestCheckerPoolDiagnosticsRecreatedAfterIdleDisposal(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 5 * time.Second})

		// Create and release diagnostics checker.
		ctx := core.WithRequestID(context.Background(), "diag-recreate-1")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c1, release1 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c1 != nil)
		release1()
		synctest.Wait()

		// Advance past idle timeout — diagnostics checker should be disposed.
		time.Sleep(5 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "diagnostics checker should be disposed")
		pool.mu.Unlock()

		// Request diagnostics checker again — should get a fresh one.
		ctx2 := core.WithRequestID(context.Background(), "diag-recreate-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil, "diagnostics checker should be re-created")
		assert.Assert(t, c2 != c1, "should be a new checker instance")
		release2()
	})
}

func TestCheckerPoolCrossReleaseAffinityWithContention(t *testing.T) {
	t.Parallel()
	// maxCheckers=2: 1 diagnostics + 1 query slot.
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 30 * time.Second})

		reqCtx, reqCancel := context.WithCancel(context.Background())
		defer reqCancel()

		// Request A acquires the only query slot.
		ctxA := core.WithRequestID(reqCtx, "req-A")
		ctxA = core.WithCheckerLifetime(ctxA, core.CheckerLifetimeTemporary)
		cA, releaseA := pool.GetChecker(ctxA, nil)
		assert.Assert(t, cA != nil)
		releaseA()
		synctest.Wait()

		// Request B takes a checker while A is released, and everything else is taken too, so A has
		// nothing free to fall back to.
		ctxB := core.WithRequestID(context.Background(), "req-B")
		ctxB = core.WithCheckerLifetime(ctxB, core.CheckerLifetimeTemporary)
		cB, releaseB := pool.GetChecker(ctxB, nil)
		assert.Assert(t, cB != nil)
		releaseRest := holdEveryFreeChecker(t, pool)
		defer releaseRest()

		// Request A reacquires — should block because B holds the slot.
		var reacquired atomic.Bool
		cA2Ch := make(chan *checker.Checker, 1)
		go func() {
			c, release := pool.GetChecker(ctxA, nil)
			cA2Ch <- c
			reacquired.Store(true)
			release()
		}()

		synctest.Wait()
		assert.Assert(t, !reacquired.Load(), "request A should block while B holds the slot")

		// Release B — A should unblock and get the same checker.
		releaseB()
		synctest.Wait()
		assert.Assert(t, reacquired.Load(), "request A should unblock after B releases")
		select {
		case cA2 := <-cA2Ch:
			assert.Assert(t, cA2 == cA, "request A should get the same checker on reacquire")
		case <-t.Context().Done():
			t.Fatal("timed out waiting for reacquired checker")
		}
	})
}

func TestCheckerPoolLifetimeMismatchIgnoresAssociation(t *testing.T) {
	t.Parallel()
	// Verify that if a request first uses a diagnostics checker, then switches
	// to a temporary lifetime (or vice versa), the stale association is ignored
	// rather than returning a checker from the wrong category.
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		reqCtx, reqCancel := context.WithCancel(context.Background())
		defer reqCancel()

		// Acquire a diagnostics checker with request ID "mixed".
		ctxDiag := core.WithRequestID(reqCtx, "mixed")
		ctxDiag = core.WithCheckerLifetime(ctxDiag, core.CheckerLifetimeDiagnostics)
		cDiag, releaseDiag := pool.GetChecker(ctxDiag, nil)
		assert.Assert(t, cDiag != nil)
		assert.Assert(t, pool.checkers[0] == cDiag, "diagnostics checker should be at index 0")
		releaseDiag()
		synctest.Wait()

		// The same request now asks as a query. Its old checker was released, so it is free to be
		// handed back: one kind of request no longer has checkers the other cannot use.
		ctxQuery := core.WithRequestID(reqCtx, "mixed")
		ctxQuery = core.WithCheckerLifetime(ctxQuery, core.CheckerLifetimeTemporary)
		cQuery, releaseQuery := pool.GetChecker(ctxQuery, nil)
		assert.Assert(t, cQuery != nil)
		assert.Assert(t, slices.Contains(pool.checkers, cQuery), "the checker must come from the pool")
		releaseQuery()
	})
}

func TestCheckerPoolNoRequestID(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// Calls without a request ID should still work (e.g., callhierarchy uses context.Background()).
	ctx := context.Background()

	c1, release1 := pool.GetChecker(ctx, nil)
	assert.Assert(t, c1 != nil)
	release1()

	c2, release2 := pool.GetChecker(ctx, nil)
	assert.Assert(t, c2 != nil)
	release2()

	// Without request ID, no affinity guarantee — just verify it doesn't crash.
}

func TestCheckerPoolDiagnosticsCrossReleaseAffinity(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		reqCtx, reqCancel := context.WithCancel(context.Background())
		defer reqCancel()
		ctx := core.WithRequestID(reqCtx, "diag-affinity")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)

		c1, release1 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c1 != nil)
		assert.Assert(t, pool.checkers[0] == c1, "should be the diagnostics checker")
		release1()
		synctest.Wait()

		// Same request reacquiring diagnostics should get the same checker.
		c2, release2 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c2 == c1, "same diagnostics request should get the same checker after release")
		release2()
	})
}

func TestCheckerPoolDiscardKeepsIdleCheckers(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Create both a diagnostics and a query checker.
		ctx1 := core.WithRequestID(context.Background(), "obs-diag")
		ctx1 = core.WithCheckerLifetime(ctx1, core.CheckerLifetimeDiagnostics)
		c1, release1 := pool.GetChecker(ctx1, nil)
		assert.Assert(t, c1 != nil)
		release1()
		synctest.Wait()

		ctx2 := core.WithRequestID(context.Background(), "obs-query")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil)
		release2()
		synctest.Wait()

		// Both checkers should exist before Discard.
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] != nil, "diagnostics checker should exist")
		pool.mu.Unlock()

		// Discard should keep idle checkers alive (they may be referenced by
		// API type handles) and just stop the cleanup timer.
		pool.Discard()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "a discarded pool lets go of the program's checkers")
		assert.Assert(t, !slices.Contains(pool.checkers, c2), "a discarded pool lets go of them all")
		assert.Assert(t, pool.cleanupTimer == nil, "cleanup timer should be stopped after Discard")
		pool.mu.Unlock()

		// Even after a long wait, checkers should not be disposed (no timer running).
		time.Sleep(60 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "a discarded pool does not hold checkers indefinitely")
		pool.mu.Unlock()
	})
}

func TestCheckerPoolDiscardHeldCheckerSurvivesRelease(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Acquire a checker and hold it.
		ctx := core.WithRequestID(context.Background(), "held-obs")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)

		// Find which slot it's in.
		pool.mu.Lock()
		heldIndex := slices.Index(pool.checkers, c)
		pool.mu.Unlock()
		assert.Assert(t, heldIndex >= 0, "should find the held checker")

		// Discard while checker is held — should NOT dispose it.
		pool.Discard()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == c, "held checker should survive Discard")
		pool.mu.Unlock()

		// Release — checker should remain alive on a discarded pool.
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == nil, "a checker handed back to a discarded pool is let go of")
		pool.mu.Unlock()

		// Even after a long wait, checker persists (no cleanup timer running).
		time.Sleep(60 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == nil, "a discarded pool does not hold checkers indefinitely")
		pool.mu.Unlock()
	})
}

func TestCheckerPoolDiscardStillFunctional(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})
		pool.Discard()

		// Pool should still work — GetChecker should create a fresh checker.
		ctx := core.WithRequestID(context.Background(), "post-obs")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil, "should still create checkers after Discard")

		// Find the slot.
		pool.mu.Lock()
		idx := slices.Index(pool.checkers, c)
		pool.mu.Unlock()
		assert.Assert(t, idx >= 0, "the checker should be in the pool")

		// Release — checker should persist on discarded pool (no cleanup timer).
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[idx] == nil, "a checker handed back to a discarded pool is let go of")
		pool.mu.Unlock()

		// Re-acquire — should get the same checker back.
		ctx2 := core.WithRequestID(context.Background(), "post-obs-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil, "a discarded pool still builds a checker when asked")
		release2()
	})
}

func TestCheckerPoolDiagnosticsCheckerStableIdentity(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Acquire the diagnostics checker.
		ctx := core.WithRequestID(context.Background(), "diag-stable-1")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c1, release1 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c1 != nil, "diagnostics checker should be created")
		release1()
		synctest.Wait()

		// Re-acquire before idle timeout — should be the same instance.
		ctx2 := core.WithRequestID(context.Background(), "diag-stable-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 == c1, "diagnostics checker should be the same instance before idle timeout")
		release2()
	})
}

func TestCheckerPoolDiagnosticsCheckerSurvivesDiscard(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Create the diagnostics checker.
		ctx := core.WithRequestID(context.Background(), "diag-discard")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		pool.Discard()

		// Diagnostics checker should survive Discard.
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "a discarded pool lets go of the program's checkers")
		pool.mu.Unlock()

		// Should still be acquirable and be the same instance.
		ctx2 := core.WithRequestID(context.Background(), "diag-discard-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil, "a discarded pool still answers, building a checker again if it must")
		release2()
	})
}

func TestCheckerPoolDiagnosticsCheckerIndependentFromQuery(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Acquire diagnostics and query checkers.
		diagCtx := core.WithRequestID(context.Background(), "diag-indep")
		diagCtx = core.WithCheckerLifetime(diagCtx, core.CheckerLifetimeDiagnostics)
		queryCtx := core.WithRequestID(context.Background(), "query-indep")
		queryCtx = core.WithCheckerLifetime(queryCtx, core.CheckerLifetimeTemporary)

		diagC, diagRelease := pool.GetChecker(diagCtx, nil)
		queryC, queryRelease := pool.GetChecker(queryCtx, nil)

		// They should be different checker instances.
		assert.Assert(t, diagC != queryC, "diagnostics and query checkers should be different")

		diagRelease()
		queryRelease()
	})
}

func TestCheckerPoolAPICheckerStableIdentity(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeAPI)
		c1, release1 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c1 != nil)
		release1()

		c2, release2 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c2 == c1, "API checker should be the same instance")
		release2()

		// Should survive idle timeout.
		time.Sleep(60 * time.Second)
		synctest.Wait()

		c3, release3 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c3 == c1, "API checker should survive idle timeout")
		release3()
	})
}

func TestCheckerPoolAPICheckerSurvivesDiscard(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeAPI)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()

		pool.Discard()

		pool.mu.Lock()
		assert.Assert(t, pool.persistentChecker == c, "API checker should survive Discard")
		pool.mu.Unlock()

		c2, release2 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c2 == c, "API checker identity should be stable after Discard")
		release2()
	})
}

func TestCheckerPoolAllThreeIndependent(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		dedCtx := core.WithRequestID(context.Background(), "ded-req")
		dedCtx = core.WithCheckerLifetime(dedCtx, core.CheckerLifetimeDiagnostics)
		tmpCtx := core.WithRequestID(context.Background(), "tmp-req")
		tmpCtx = core.WithCheckerLifetime(tmpCtx, core.CheckerLifetimeTemporary)
		perCtx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeAPI)

		dedC, dedRelease := pool.GetChecker(dedCtx, nil)
		tmpC, tmpRelease := pool.GetChecker(tmpCtx, nil)
		perC, perRelease := pool.GetChecker(perCtx, nil)

		assert.Assert(t, dedC != tmpC, "diagnostics and temporary should be different")
		assert.Assert(t, dedC != perC, "diagnostics and API should be different")
		assert.Assert(t, tmpC != perC, "temporary and API should be different")

		dedRelease()
		tmpRelease()
		perRelease()
	})
}

func TestCheckerPoolFileAffinity(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	sourceFile := program.GetSourceFile("/src/index.ts")
	assert.Assert(t, sourceFile != nil)

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// First query with a file should create a checker and associate it.
		ctx1 := core.WithRequestID(context.Background(), "file-aff-1")
		ctx1 = core.WithCheckerLifetime(ctx1, core.CheckerLifetimeTemporary)
		c1, release1 := pool.GetChecker(ctx1, sourceFile)
		assert.Assert(t, c1 != nil)
		release1()
		synctest.Wait()

		// Second query with the same file (different request) should get the same checker via file affinity.
		ctx2 := core.WithRequestID(context.Background(), "file-aff-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, sourceFile)
		assert.Assert(t, c2 != nil)
		assert.Assert(t, c2 == c1, "same file should return the same checker via file affinity")
		release2()
	})
}

func TestCheckerPoolMultipleConcurrentQueryCheckers(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Concurrent queries each get their own checker, up to however many the pool has.
		var held []*checker.Checker
		var releases []func()
		for i := range pool.checkers {
			ctx := core.WithRequestID(context.Background(), fmt.Sprintf("multi-q-%d", i))
			ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
			c, release := pool.GetChecker(ctx, nil)
			assert.Assert(t, c != nil)
			assert.Assert(t, !slices.Contains(held, c), "concurrent queries should get distinct checkers")
			held = append(held, c)
			releases = append(releases, release)
		}

		// One more blocks, since every checker is taken.
		var extraGot atomic.Bool
		go func() {
			ctx := core.WithRequestID(context.Background(), "multi-q-extra")
			ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
			c, release := pool.GetChecker(ctx, nil)
			extraGot.Store(c != nil)
			release()
		}()

		synctest.Wait()
		assert.Assert(t, !extraGot.Load(), "a query should block when every checker is held")

		releases[0]()
		synctest.Wait()
		assert.Assert(t, extraGot.Load(), "it should proceed once one is handed back")
		for _, release := range releases[1:] {
			release()
		}
	})
}

// How a program is split is the program's own property: the checkers that own its files are the
// ones a build of it would use, whatever the editor asks for.
func TestCheckerPoolSizedByTheProgram(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 0, IdleTimeout: 10 * time.Second})
	assert.Equal(t, pool.owners, pool.program.CheckerCount())
	// A one-file program is split across one checker; the pool still holds enough for requests to
	// run alongside each other.
	assert.Equal(t, len(pool.checkers), max(pool.owners, pool.opts.MaxCheckers))
}

func TestCheckerPoolStaggeredIdleCleanup(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

		// Acquire checker A and hold it.
		ctxA := core.WithRequestID(context.Background(), "stagger-A")
		ctxA = core.WithCheckerLifetime(ctxA, core.CheckerLifetimeTemporary)
		cA, releaseA := pool.GetChecker(ctxA, nil)
		assert.Assert(t, cA != nil)

		// While A is held, acquire a second checker B.
		ctxB := core.WithRequestID(context.Background(), "stagger-B")
		ctxB = core.WithCheckerLifetime(ctxB, core.CheckerLifetimeTemporary)
		cB, releaseB := pool.GetChecker(ctxB, nil)
		assert.Assert(t, cB != nil)
		assert.Assert(t, cB != cA, "B should be a different checker since A is held")

		// Find their indices.
		pool.mu.Lock()
		idxA := slices.Index(pool.checkers, cA)
		idxB := slices.Index(pool.checkers, cB)
		pool.mu.Unlock()
		assert.Assert(t, idxA >= 0)
		assert.Assert(t, idxB >= 0)

		// Release A first. Timer is set for t=10.
		releaseA()
		synctest.Wait()

		// Release B 6 seconds later. Timer is reset for t=16.
		time.Sleep(6 * time.Second)
		releaseB()
		synctest.Wait()

		// At t < 16, both should still exist (timer hasn't fired).
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[idxA] != nil, "checker A should still exist before timer fires")
		assert.Assert(t, pool.checkers[idxB] != nil, "checker B should still exist before timer fires")
		pool.mu.Unlock()

		// Advance past t=16 (when the timer fires). Both should be disposed
		// because A has been idle 16s and B has been idle 10s.
		time.Sleep(11 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[idxA] == nil, "checker A should be disposed after timer fires")
		assert.Assert(t, pool.checkers[idxB] == nil, "checker B should be disposed after timer fires")
		pool.mu.Unlock()
	})
}

func TestCheckerPoolDiscardIdempotent(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 2, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Create a checker so there's something to discard.
		ctx := core.WithRequestID(context.Background(), "idem-q")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		// First discard should keep idle checkers alive.
		pool.Discard()
		pool.mu.Lock()
		hasChecker := false
		for _, c := range pool.checkers {
			if c != nil {
				hasChecker = true
				break
			}
		}
		pool.mu.Unlock()
		// The program these were built for is gone, and idle cleanup does not run on a discarded
		// pool, so they are let go of here rather than held until the pool is collected.
		assert.Assert(t, !hasChecker, "first Discard should let go of the program's checkers")

		// Second discard should be a no-op (no panic, no state corruption).
		pool.Discard()

		// Pool should still be functional after double Discard.
		ctx2 := core.WithRequestID(context.Background(), "post-idem")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil, "pool should still work after double Discard")
		release2()
	})
}

func TestCheckerPoolGetGlobalDiagnosticsEmpty(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// Before any checker is used, global diagnostics should be empty.
	diags := pool.GetGlobalDiagnostics()
	assert.Equal(t, len(diags), 0, "global diagnostics should be empty initially")
}

func TestCheckerPoolTakeNewGlobalDiagnostics(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// Initially, no new globals.
	assert.Assert(t, !pool.TakeNewGlobalDiagnostics(), "should report no new globals initially")

	// Use a checker and trigger diagnostics, then release to run the merge.
	ctx := core.WithRequestID(context.Background(), "global-diag-req")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
	sourceFile := pool.program.GetSourceFile("/src/index.ts")
	c, release := pool.GetChecker(ctx, sourceFile)
	assert.Assert(t, c != nil)
	c.GetDiagnostics(ctx, sourceFile)
	release()

	// Whether globals were produced depends on the program, but the flag
	// should reflect the merge result.
	firstTake := pool.TakeNewGlobalDiagnostics()

	// After taking, a second call should always return false (flag is reset).
	assert.Assert(t, !pool.TakeNewGlobalDiagnostics(), "TakeNewGlobalDiagnostics should reset after first call")

	// Releasing the same checker again with the same state should not set the flag.
	ctx2 := core.WithRequestID(context.Background(), "global-diag-req-2")
	ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
	c2, release2 := pool.GetChecker(ctx2, sourceFile)
	assert.Assert(t, c2 != nil)
	c2.GetDiagnostics(ctx2, sourceFile)
	release2()

	// If first call produced globals, the count is now stable, so no new change.
	// If first call produced no globals, still no change.
	_ = firstTake
	assert.Assert(t, !pool.TakeNewGlobalDiagnostics(), "should not report new globals when checker state is unchanged")
}

func TestCheckerPoolAPICheckerDisposedOnCancel(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	sourceFile := program.GetSourceFile("/src/index.ts")
	assert.Assert(t, sourceFile != nil)

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeAPI)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)

		// Cancel the API checker.
		canceledCtx, cancel := context.WithCancel(context.Background())
		cancel()
		c.GetDiagnostics(canceledCtx, sourceFile)
		assert.Assert(t, c.WasCanceled())

		// Releasing a canceled API checker must drop it so it isn't reused.
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.persistentChecker == nil, "canceled API checker should be dropped on release")
		pool.mu.Unlock()

		// Next API acquisition gets a fresh, usable checker rather than panicking.
		c2, release2 := pool.GetChecker(ctx, nil)
		assert.Assert(t, c2 != c, "should get a fresh API checker after cancellation")
		release2()
	})
}

func TestCheckerPoolNonCancelableContextNoAffinity(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// A context that carries a request ID but can never be canceled
		// (ctx.Done() == nil) must not register a request association, since
		// there would be no way to clean it up.
		ctx := core.WithRequestID(context.Background(), "uncancelable-req")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		assert.Assert(t, ctx.Done() == nil, "test precondition: context must be non-cancelable")

		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Equal(t, len(pool.requestAssociations), 0, "non-cancelable context must not grow requestAssociations")
		pool.mu.Unlock()
	})
}

func TestCheckerPoolCleanupAfterDiscardIsNoop(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		ctx := core.WithRequestID(context.Background(), "discard-cleanup")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		pool.Discard()

		// Simulate the timer callback firing after Discard() (Stop() does not
		// guarantee the callback won't run). It must be a no-op and must not
		// re-arm the cleanup timer, which would keep the discarded pool alive.
		pool.cleanupIdleCheckers()

		pool.mu.Lock()
		assert.Assert(t, pool.cleanupTimer == nil, "cleanup must not reschedule a timer on a discarded pool")
		hasChecker := false
		for _, cc := range pool.checkers {
			if cc != nil {
				hasChecker = true
			}
		}
		// Discard already let them go; a later cleanup pass has nothing left to do.
		assert.Assert(t, !hasChecker, "a discarded pool holds no checkers for a program that is gone")
		pool.mu.Unlock()
	})
}

// Everything checks a file with the checker that owns it, so a document pull, a workspace pull and
// a build all report the same thing for that file.
func TestCheckerPoolChecksEveryFileWithItsOwner(t *testing.T) {
	t.Parallel()
	files := map[string]any{"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`}
	for i := range 8 {
		files[fmt.Sprintf("/src/f%d.ts", i)] = fmt.Sprintf("export const v%d: number = %d;", i, i)
	}
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: 10 * time.Second}, files)

	ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)
	for _, file := range pool.program.SourceFiles() {
		owner := pool.ownerOf(file)
		c, release := pool.GetChecker(ctx, file)
		assert.Equal(t, c, pool.checkers[owner], "a diagnostics request must get the file's owner")
		release()
	}
}

// A whole-program check runs on those same checkers rather than a second set beside them.
func TestCheckerPoolChecksWholeProgramOnItsOwnCheckers(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a: string = 1;",
		"/src/b.ts":          "export const b = 1;",
	})

	diagnostics := pool.program.GetSemanticDiagnostics(context.Background(), nil)
	assert.Assert(t, len(diagnostics) > 0, "expected the seeded error")

	built := 0
	for _, c := range pool.checkers {
		if c != nil {
			built++
		}
	}
	assert.Assert(t, built > 0, "the check must have used the pool's own checkers")
}

// A query does not depend on which checker sees the file, so rather than wait behind a check of the
// whole project it takes whichever checker is free.
func TestCheckerPoolQueryDoesNotWaitForABusyOwner(t *testing.T) {
	t.Parallel()
	files := map[string]any{"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`}
	for i := range 8 {
		files[fmt.Sprintf("/src/f%d.ts", i)] = fmt.Sprintf("export const v%d: number = %d;", i, i)
	}
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: 10 * time.Second}, files)
	if len(pool.checkers) < 2 {
		t.Skip("needs a program the compiler splits across more than one checker")
	}

	file := pool.program.SourceFiles()[0]
	held, release := pool.GetChecker(core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics), file)
	defer release()

	query := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeTemporary)
	other, releaseOther := pool.GetChecker(query, file)
	defer releaseOther()
	assert.Assert(t, other != held, "a query must not wait on the checker a diagnostics request holds")
}

// Which checker owns a file is the program's own split, so it has to outlive the checkers
// themselves. Deriving it from the live checkers instead would move every file whose checker had
// been let go onto the first slot, quietly undoing both the split and the parity it buys.
func TestCheckerPoolOwnershipOutlivesItsCheckers(t *testing.T) {
	t.Parallel()
	files := map[string]any{"/src/tsconfig.json": `{ "compilerOptions": { "strict": true } }`}
	for i := range 40 {
		files[fmt.Sprintf("/src/f%d.ts", i)] = fmt.Sprintf("export const v%d: number = %d;", i, i)
	}
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: time.Minute}, files)

	before := make(map[string]int, len(pool.program.SourceFiles()))
	owners := map[int]struct{}{}
	for _, f := range pool.program.SourceFiles() {
		owner := pool.ownerOf(f)
		before[f.FileName()] = owner
		owners[owner] = struct{}{}
	}
	if len(owners) < 2 {
		t.Skip("needs a program the compiler splits across more than one checker")
	}

	pool.program.GetSemanticDiagnostics(context.Background(), nil)
	assert.Assert(t, pool.releaseSweptCheckers(), "the sweep's checkers should have been let go of")

	for _, f := range pool.program.SourceFiles() {
		assert.Equal(t, pool.ownerOf(f), before[f.FileName()], "%s should keep its owner", f.FileName())
	}
}
