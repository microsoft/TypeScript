package project

import (
	"context"
	"sync/atomic"
	"testing"
	"testing/synctest"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func setupCheckerPoolSession(t *testing.T, opts CheckerPoolOptions) (*Session, *checkerPool) {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	files := map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
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

func TestCheckerPoolQueryRouting(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	// Query requests should get a checker at index > 0.
	ctx := core.WithRequestID(context.Background(), "query-req-1")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
	c, release := pool.GetChecker(ctx, nil)
	assert.Assert(t, c != nil)

	// Verify it's not the diagnostics checker slot.
	assert.Assert(t, pool.checkers[0] != c, "query should not use checker index 0")
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

		// Create a checker via a diagnostics request.
		ctx := core.WithRequestID(context.Background(), "diag-cleanup")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		c, release := pool.GetChecker(ctx, nil)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		// Create a query checker as well.
		ctx2 := core.WithRequestID(context.Background(), "query-cleanup")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil)
		release2()
		synctest.Wait()

		// Both checkers should exist.
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] != nil, "diagnostics checker should exist")
		var queryIdx int
		for i := 1; i < len(pool.checkers); i++ {
			if pool.checkers[i] != nil {
				queryIdx = i
				break
			}
		}
		assert.Assert(t, queryIdx > 0, "query checker should exist")
		pool.mu.Unlock()

		// Advance past idle timeout.
		time.Sleep(5 * time.Second)
		synctest.Wait()

		// After cleanup, both checkers should be disposed.
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "diagnostics checker should be disposed after idle timeout")
		assert.Assert(t, pool.checkers[queryIdx] == nil, "query checker should be disposed after idle timeout")
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

		// Create a query checker with file affinity.
		ctx := core.WithRequestID(context.Background(), "file-assoc-req")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
		c, release := pool.GetChecker(ctx, sourceFile)
		assert.Assert(t, c != nil)
		release()
		synctest.Wait()

		// File association should exist.
		pool.mu.Lock()
		_, hasAssoc := pool.fileAssociations[sourceFile]
		pool.mu.Unlock()
		assert.Assert(t, hasAssoc, "file should have a checker association")

		// Advance past idle timeout.
		time.Sleep(5 * time.Second)
		synctest.Wait()

		// File association should be cleared.
		pool.mu.Lock()
		_, hasAssoc = pool.fileAssociations[sourceFile]
		pool.mu.Unlock()
		assert.Assert(t, !hasAssoc, "file association should be cleared after checker disposal")
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

		// Acquire the only query checker slot.
		ctx1 := core.WithRequestID(context.Background(), "query-hold")
		ctx1 = core.WithCheckerLifetime(ctx1, core.CheckerLifetimeTemporary)
		c1, release1 := pool.GetChecker(ctx1, nil)
		assert.Assert(t, c1 != nil)

		// A second query request from a different request ID should block.
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
		assert.Assert(t, c2Got.Load(), "second query should have acquired the checker after release")
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

		// Acquire the diagnostics checker.
		ctx1 := core.WithRequestID(context.Background(), "diag-hold")
		ctx1 = core.WithCheckerLifetime(ctx1, core.CheckerLifetimeDiagnostics)
		c1, release1 := pool.GetChecker(ctx1, nil)
		assert.Assert(t, c1 != nil)

		// A second diagnostics request should block since there's only one diag checker.
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

		// A query request should NOT be blocked (separate slot).
		ctx3 := core.WithRequestID(context.Background(), "query-concurrent")
		ctx3 = core.WithCheckerLifetime(ctx3, core.CheckerLifetimeTemporary)
		c3, release3 := pool.GetChecker(ctx3, nil)
		assert.Assert(t, c3 != nil)
		assert.Assert(t, c3 != c1, "query checker should be different from diagnostics checker")
		release3()

		// Release the diagnostics checker — second diag request should unblock.
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

		// Request B takes the query slot while A is released.
		ctxB := core.WithRequestID(context.Background(), "req-B")
		ctxB = core.WithCheckerLifetime(ctxB, core.CheckerLifetimeTemporary)
		cB, releaseB := pool.GetChecker(ctxB, nil)
		assert.Assert(t, cB != nil)

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

		// Now use the same request ID but with query purpose.
		// The old association points to index 0 (diagnostics), which should
		// be rejected — the returned checker must be a query checker (index > 0).
		ctxQuery := core.WithRequestID(reqCtx, "mixed")
		ctxQuery = core.WithCheckerLifetime(ctxQuery, core.CheckerLifetimeTemporary)
		cQuery, releaseQuery := pool.GetChecker(ctxQuery, nil)
		assert.Assert(t, cQuery != nil)
		assert.Assert(t, cQuery != cDiag, "query should not reuse the diagnostics checker")

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] != cQuery, "query checker should not be at diagnostics index 0")
		pool.mu.Unlock()
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
		assert.Assert(t, pool.checkers[0] == c1, "diagnostics checker should survive Discard")
		hasQuery := false
		for i := 1; i < len(pool.checkers); i++ {
			if pool.checkers[i] == c2 {
				hasQuery = true
				break
			}
		}
		assert.Assert(t, hasQuery, "query checker should survive Discard")
		assert.Assert(t, pool.cleanupTimer == nil, "cleanup timer should be stopped after Discard")
		pool.mu.Unlock()

		// Even after a long wait, checkers should not be disposed (no timer running).
		time.Sleep(60 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == c1, "diagnostics checker should persist indefinitely on discarded pool")
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
		var heldIndex int
		for i := 1; i < len(pool.checkers); i++ {
			if pool.checkers[i] == c {
				heldIndex = i
				break
			}
		}
		pool.mu.Unlock()
		assert.Assert(t, heldIndex > 0, "should find the held checker")

		// Discard while checker is held — should NOT dispose it.
		pool.Discard()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == c, "held checker should survive Discard")
		pool.mu.Unlock()

		// Release — checker should remain alive on a discarded pool.
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == c, "checker should persist after release on discarded pool")
		pool.mu.Unlock()

		// Even after a long wait, checker persists (no cleanup timer running).
		time.Sleep(60 * time.Second)
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[heldIndex] == c, "checker should persist indefinitely on discarded pool")
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
		var idx int
		for i := 1; i < len(pool.checkers); i++ {
			if pool.checkers[i] == c {
				idx = i
				break
			}
		}
		pool.mu.Unlock()
		assert.Assert(t, idx > 0, "checker should be in a query slot")

		// Release — checker should persist on discarded pool (no cleanup timer).
		release()
		synctest.Wait()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[idx] == c, "checker should persist after release on discarded pool")
		pool.mu.Unlock()

		// Re-acquire — should get the same checker back.
		ctx2 := core.WithRequestID(context.Background(), "post-obs-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 == c, "should get the same checker on discarded pool")
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
		assert.Assert(t, pool.checkers[0] == c, "diagnostics checker should survive Discard")
		pool.mu.Unlock()

		// Should still be acquirable and be the same instance.
		ctx2 := core.WithRequestID(context.Background(), "diag-discard-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 == c, "diagnostics checker identity should be stable after Discard")
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
	// maxCheckers=4: 1 diagnostics + 3 query slots.
	session, _ := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Acquire 3 query checkers concurrently (all slots).
		ctx1 := core.WithRequestID(context.Background(), "multi-q-1")
		ctx1 = core.WithCheckerLifetime(ctx1, core.CheckerLifetimeTemporary)
		c1, release1 := pool.GetChecker(ctx1, nil)
		assert.Assert(t, c1 != nil)

		ctx2 := core.WithRequestID(context.Background(), "multi-q-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil)

		ctx3 := core.WithRequestID(context.Background(), "multi-q-3")
		ctx3 = core.WithCheckerLifetime(ctx3, core.CheckerLifetimeTemporary)
		c3, release3 := pool.GetChecker(ctx3, nil)
		assert.Assert(t, c3 != nil)

		// All three should be distinct checkers.
		assert.Assert(t, c1 != c2, "concurrent query checkers should be distinct (1 vs 2)")
		assert.Assert(t, c1 != c3, "concurrent query checkers should be distinct (1 vs 3)")
		assert.Assert(t, c2 != c3, "concurrent query checkers should be distinct (2 vs 3)")

		// None should be the diagnostics checker at index 0.
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] != c1 && pool.checkers[0] != c2 && pool.checkers[0] != c3,
			"query checkers should not occupy the diagnostics slot")
		pool.mu.Unlock()

		// A 4th query request should block since all 3 slots are full.
		var c4Got atomic.Bool
		go func() {
			ctx4 := core.WithRequestID(context.Background(), "multi-q-4")
			ctx4 = core.WithCheckerLifetime(ctx4, core.CheckerLifetimeTemporary)
			c4, release4 := pool.GetChecker(ctx4, nil)
			_ = c4 // verified via c4Got flag
			c4Got.Store(c4 != nil)
			release4()
		}()

		synctest.Wait()
		assert.Assert(t, !c4Got.Load(), "4th query should block when all 3 query slots are held")

		release1()
		synctest.Wait()
		assert.Assert(t, c4Got.Load(), "4th query should unblock after one slot is released")

		release2()
		release3()
	})
}

func TestCheckerPoolDoubleReleaseSafe(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second})

	ctx := core.WithRequestID(context.Background(), "double-release")
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeTemporary)
	c, release := pool.GetChecker(ctx, nil)
	assert.Assert(t, c != nil)

	// First release should work normally.
	release()
	// Second release should be a no-op (sync.OnceFunc).
	release()

	// Pool should still be functional after double release.
	ctx2 := core.WithRequestID(context.Background(), "after-double")
	ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeTemporary)
	c2, release2 := pool.GetChecker(ctx2, nil)
	assert.Assert(t, c2 != nil)
	release2()
}

func TestCheckerPoolDefaultMaxCheckers(t *testing.T) {
	t.Parallel()
	// Zero MaxCheckers should default to 4.
	_, pool := setupCheckerPoolSession(t, CheckerPoolOptions{MaxCheckers: 0, IdleTimeout: 10 * time.Second})
	assert.Equal(t, pool.opts.MaxCheckers, 4)
	assert.Equal(t, len(pool.checkers), 4)
	assert.Equal(t, cap(pool.querySem), 3, "querySem capacity should be MaxCheckers-1")
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
		var idxA, idxB int
		for i := 1; i < len(pool.checkers); i++ {
			if pool.checkers[i] == cA {
				idxA = i
			}
			if pool.checkers[i] == cB {
				idxB = i
			}
		}
		pool.mu.Unlock()
		assert.Assert(t, idxA > 0)
		assert.Assert(t, idxB > 0)

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
		assert.Assert(t, hasChecker, "first Discard should keep idle checkers alive")

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
