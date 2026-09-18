package project

import (
	"context"
	"fmt"
	"sync"
	"sync/atomic"
	"testing"
	"testing/synctest"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/checker"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
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
	// A project only takes a build's worth of diagnostics checkers when the workspace pull is on,
	// which is what these tests are about. See setupCheckerPoolSessionWithScope for the other way.
	return setupCheckerPoolSessionWithScope(t, opts, files, lsutil.WorkspaceDiagnosticsScopeAllProjects)
}

func setupCheckerPoolSessionWithScope(t *testing.T, opts CheckerPoolOptions, files map[string]any, scope lsutil.WorkspaceDiagnosticsScope) (*Session, *checkerPool) {
	t.Helper()
	if !bundled.Embedded {
		t.Skip("bundled files are not embedded")
	}

	fs := bundled.WrapFS(vfstest.FromMap(files, false))
	options := &SessionOptions{
		CurrentDirectory:   "/",
		DefaultLibraryPath: bundled.LibPath(),
		PositionEncoding:   lsproto.PositionEncodingKindUTF8,
		WatchEnabled:       false,
		LoggingEnabled:     true,
		CheckerPoolOptions: opts,
	}
	// Set directly rather than through Configure, which tells the client to refresh and there is
	// no client here. The path from a preference to this is covered by the server's own tests.
	options.workspaceDiagnosticsEnabled.Store(scope.Enabled())
	session := NewSession(&SessionInit{
		BackgroundCtx: context.Background(),
		Options:       options,
		FS:            fs,
		Logger:        logging.NewTestLogger(),
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
	opts.MatchBuildCheckerCount = true
	return newCheckerPool(opts, program, nil /*interactive*/, func(string) {})
}

// manyCheckerPoolFiles is a program with more files than a build would give it checkers, so at
// least one checker owns several of them.
func manyCheckerPoolFiles() map[string]any {
	files := map[string]any{"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`}
	files["/src/index.ts"] = "export const x: number = 1;\n"
	for i := range 11 {
		files[fmt.Sprintf("/src/f%d.ts", i)] = fmt.Sprintf("export const v%d = %d;\n", i, i)
	}
	return files
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
		synctest.Sleep(5 * time.Second)

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
		synctest.Sleep(5 * time.Second)

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
		synctest.Sleep(5 * time.Second)

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

		// Discard should keep idle query checkers alive (they may be referenced by
		// API type handles) and just stop the cleanup timer.
		pool.Discard()

		pool.mu.Lock()
		hasQuery := false
		for i := pool.diagnosticsCount; i < len(pool.checkers); i++ {
			if pool.checkers[i] == c2 {
				hasQuery = true
				break
			}
		}
		assert.Assert(t, hasQuery, "query checker should survive Discard")
		assert.Assert(t, pool.cleanupTimer == nil, "cleanup timer should be stopped after Discard")
		pool.mu.Unlock()

		// Even after a long wait, checkers should not be disposed (no timer running).
		synctest.Sleep(60 * time.Second)

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[pool.diagnosticsCount] == c2, "query checker should persist indefinitely on discarded pool")
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
		synctest.Sleep(60 * time.Second)

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

// A discarded pool's program has been replaced, so its diagnostics checkers hold a whole program's
// worth of types that nothing will ask for again. They go, unlike the query checkers, which an API
// client may still be resolving handles against.
func TestCheckerPoolDiagnosticsCheckersDroppedOnDiscard(t *testing.T) {
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

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "diagnostics checker should be dropped on Discard")
		pool.mu.Unlock()

		// The pool stays usable; it just builds a new one. Work that started before the discard
		// goes on asking, a file at a time, so what it takes is not thrown away the moment it
		// hands it back — rebuilding one merges the globals of every file in the program.
		ctx2 := core.WithRequestID(context.Background(), "diag-discard-2")
		ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
		c2, release2 := pool.GetChecker(ctx2, nil)
		assert.Assert(t, c2 != nil)
		release2()

		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == c2, "a checker handed back on a discarded pool is kept for whoever asks next")
		pool.mu.Unlock()

		// Asking again gets the same one rather than paying to build another.
		c3, release3 := pool.GetChecker(ctx2, nil)
		assert.Equal(t, c3, c2, "the next caller is given the checker that is already there")
		release3()

		// Once nothing has come back for it, the idle timer collects it, so a discarded pool does
		// not hold a whole program's types for the life of the snapshot.
		time.Sleep(31 * time.Second)
		synctest.Wait()
		pool.mu.Lock()
		assert.Assert(t, pool.checkers[0] == nil, "an idle diagnostics checker on a discarded pool is collected")
		pool.mu.Unlock()
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
		synctest.Sleep(60 * time.Second)

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
		synctest.Sleep(11 * time.Second)

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
	ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
	sourceFile := pool.program.GetSourceFile("/src/index.ts")
	c, release := pool.GetChecker(ctx, sourceFile)
	assert.Assert(t, c != nil)
	c.GetDiagnostics(ctx, sourceFile)
	release()

	assert.Assert(t, pool.TakeNewGlobalDiagnostics(), "diagnostics checker should publish missing-lib globals")

	// After taking, a second call should always return false (flag is reset).
	assert.Assert(t, !pool.TakeNewGlobalDiagnostics(), "TakeNewGlobalDiagnostics should reset after first call")

	// Releasing the same checker again with the same state should not set the flag.
	ctx2 := core.WithRequestID(context.Background(), "global-diag-req-2")
	ctx2 = core.WithCheckerLifetime(ctx2, core.CheckerLifetimeDiagnostics)
	c2, release2 := pool.GetChecker(ctx2, sourceFile)
	assert.Assert(t, c2 != nil)
	c2.GetDiagnostics(ctx2, sourceFile)
	release2()

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
		assert.Assert(t, hasChecker, "idle checkers must survive cleanup on a discarded pool")
		pool.mu.Unlock()
	})
}

// A file goes back to the diagnostics checker that last checked it, where its types already are. One
// no checker has seen goes to the first.
func TestCheckerPoolDiagnosticsReturnsAFileToItsLastChecker(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a = 1;",
		"/src/b.ts":          "export const b = 1;",
	})
	files := pool.program.SourceFiles()
	for _, file := range files {
		assert.Equal(t, pool.diagnosticsIndexFor(file), 0, "a file no checker has seen goes to the first")
	}

	// Nobody leaves their first file until every file has been taken, so each checker gets one:
	// otherwise one could take them all, and returning each to its checker would prove nothing.
	assert.Equal(t, pool.diagnosticsCount, len(files))
	checkedBy := make([]*checker.Checker, len(files))
	var mu sync.Mutex
	var arrived sync.WaitGroup
	arrived.Add(len(files))
	ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)
	pool.ForEachCheckerGroupDo(ctx, files, false /*singleThreaded*/, func(c *checker.Checker, i int, _ *ast.SourceFile) {
		mu.Lock()
		checkedBy[i] = c
		mu.Unlock()
		arrived.Done()
		arrived.Wait()
	})
	distinct := map[*checker.Checker]bool{}
	for _, c := range checkedBy {
		distinct[c] = true
	}
	assert.Equal(t, len(distinct), len(files), "each file was checked on a checker of its own")

	for i, file := range files {
		pullCtx := core.WithCheckerLifetime(core.WithRequestID(t.Context(), fmt.Sprintf("diag-%d", i)), core.CheckerLifetimeDiagnostics)
		c, release := pool.GetChecker(pullCtx, file)
		assert.Assert(t, c == checkedBy[i], "a pull on %s must get the checker that checked it", file.FileName())
		release()
	}
}

// Files on different checkers are checked at the same time; files on the same one wait for each
// other.
func TestCheckerPoolDiagnosticsCheckersAreHeldIndependently(t *testing.T) {
	t.Parallel()
	session, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a = 1;",
		"/src/b.ts":          "export const b = 1;",
		"/src/c.ts":          "export const c = 1;",
		"/src/d.ts":          "export const d = 1;",
		"/src/e.ts":          "export const e = 1;",
	})
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	files := program.SourceFiles()
	assert.Assert(t, pool.diagnosticsCount > 1 && len(files) >= 3)

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		// Two files last checked on the same checker, and one on another.
		shared := files[:2]
		separate := files[2]
		pool.noteDiagnosticsAffinity(shared[0], 0)
		pool.noteDiagnosticsAffinity(shared[1], 0)
		pool.noteDiagnosticsAffinity(separate, 1)

		diagCtx := func(id string) context.Context {
			return core.WithCheckerLifetime(core.WithRequestID(context.Background(), id), core.CheckerLifetimeDiagnostics)
		}

		held, releaseHeld := pool.GetChecker(diagCtx("diag-held"), shared[0])
		assert.Assert(t, held != nil)

		// The other file on the same checker has to wait for it.
		var sameGot atomic.Bool
		go func() {
			c, release := pool.GetChecker(diagCtx("diag-same"), shared[1])
			sameGot.Store(c != nil)
			release()
		}()
		synctest.Wait()
		assert.Assert(t, !sameGot.Load(), "a file sharing a checker must wait for it")

		// A file on another checker does not.
		other, releaseOther := pool.GetChecker(diagCtx("diag-other"), separate)
		assert.Assert(t, other != nil && other != held, "a file on another checker gets another checker")
		releaseOther()

		releaseHeld()
		synctest.Wait()
		assert.Assert(t, sameGot.Load(), "the waiting file gets the checker once it is released")
	})
}

// A check of the whole project takes its checker a file at a time, so a pull on a file that checker
// last checked gets in between files rather than waiting out the whole project.
func TestCheckerPoolWholeProgramCheckYieldsBetweenFiles(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, manyCheckerPoolFiles())
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	// Single threaded, so the whole check runs on the first checker, which is also where a file no
	// checker has seen goes.
	files := program.SourceFiles()
	const owner = 0
	owned := files
	assert.Assert(t, len(owned) >= 3, "need enough files to interleave against")

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second})

		inFirstFile := make(chan struct{})
		finishFirstFile := make(chan struct{})
		var checked atomic.Int32
		go func() {
			pool.ForEachCheckerGroupDo(context.Background(), files, true /*singleThreaded*/, func(c *checker.Checker, _ int, file *ast.SourceFile) {
				if checked.Add(1) == 1 {
					close(inFirstFile)
					<-finishFirstFile
				}
			})
		}()
		<-inFirstFile

		// A pull on another file the busy checker owns.
		var checkedWhenPulled atomic.Int32
		checkedWhenPulled.Store(-1)
		go func() {
			ctx := core.WithRequestID(context.Background(), "diag-during-check")
			ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
			_, release := pool.GetChecker(ctx, owned[1])
			checkedWhenPulled.Store(checked.Load())
			release()
		}()
		synctest.Wait()
		assert.Equal(t, checkedWhenPulled.Load(), int32(-1), "the pull waits while the checker is on a file")

		close(finishFirstFile)
		synctest.Wait()
		assert.Assert(t, checkedWhenPulled.Load() > 0 && int(checkedWhenPulled.Load()) < len(owned),
			"the pull must get the checker between files, not after the whole project")
	})
}

// A whole-program check runs on the diagnostics checkers, of which there are as many as a build
// would use, and leaves each file remembered against the one that checked it.
func TestCheckerPoolChecksWholeProgramAcrossDiagnosticsCheckers(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a: string = 1;",
		"/src/b.ts":          "export const b = 1;",
	})
	assert.Equal(t, pool.diagnosticsCount, diagnosticsCheckerCount(pool.program))
	assert.Assert(t, pool.diagnosticsCount > 1, "a three-file program gets more than one checker")
	for index := range pool.checkers {
		assert.Assert(t, pool.checkers[index] == nil, "nothing built before a check is asked for")
	}

	diagnostics := pool.program.GetSemanticDiagnostics(context.Background(), nil)
	assert.Assert(t, len(diagnostics) > 0, "expected the seeded error")

	for _, file := range pool.program.SourceFiles() {
		index := pool.diagnosticsIndexFor(file)
		assert.Assert(t, index < pool.diagnosticsCount && pool.checkers[index] != nil,
			"%s must be remembered against the diagnostics checker that checked it", file.FileName())
	}
	for index := pool.diagnosticsCount; index < len(pool.checkers); index++ {
		assert.Assert(t, pool.checkers[index] == nil, "a whole-program check must not use a query checker")
	}
}

// Query checkers sit after the diagnostics ones, so a query never lands on a checker a whole-program
// check is partway through.
func TestCheckerPoolQueryCheckersSitAfterDiagnosticsCheckers(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a: string = 1;",
		"/src/b.ts":          "export const b = 1;",
	})
	assert.Equal(t, len(pool.checkers), pool.diagnosticsCount+3, "MaxCheckers-1 query checkers on top of the diagnostics ones")

	ctx := core.WithCheckerLifetime(core.WithRequestID(t.Context(), "query-after-diag"), core.CheckerLifetimeTemporary)
	c, release := pool.GetChecker(ctx, nil)
	defer release()
	for index := range pool.diagnosticsCount {
		assert.Assert(t, pool.checkers[index] != c, "a query must not use a diagnostics checker")
	}
}

// The checkers a sweep uses are handed back when it is done with them: they hold the types of every
// file in the program, and a later pull either finds the project unchanged, and answers from result
// ids without checking, or finds it changed and needs new ones anyway.
func TestCheckerPoolReleasesCheckersAfterAWholeProgramCheck(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{IdleTimeout: 10 * time.Second}, map[string]any{
		"/src/tsconfig.json": `{ "compilerOptions": { "noLib": true } }`,
		"/src/index.ts":      "export const x: number = 1;",
		"/src/a.ts":          "export const a: string = 1;",
	})

	anyDiagnosticsChecker := func() bool {
		for index := range pool.diagnosticsCount {
			if pool.checkers[index] != nil {
				return true
			}
		}
		return false
	}

	pool.program.GetSemanticDiagnostics(context.Background(), nil)
	assert.Assert(t, anyDiagnosticsChecker())

	assert.Assert(t, pool.releaseDiagnosticsCheckers(), "releasing reports that it dropped the checkers")
	assert.Assert(t, !anyDiagnosticsChecker())
	assert.Assert(t, !pool.releaseDiagnosticsCheckers(), "nothing left to release")

	// Discarding is what the project system does once a program is replaced, and it has to happen
	// before the next program's checkers are built or both generations are held at once.
	pool.program.GetSemanticDiagnostics(context.Background(), nil)
	assert.Assert(t, anyDiagnosticsChecker(), "a later check builds them again")
	pool.Discard()
	assert.Assert(t, !anyDiagnosticsChecker(), "a discarded pool must let go of its checkers")
}

// A build's worth of diagnostics checkers is what a workspace pull needs. A session without the
// pull switched on keeps the single diagnostics checker it has always had, and does not pay for
// the memory of the rest.
func TestCheckerPoolKeepsOneDiagnosticsCheckerWithoutTheWorkspacePull(t *testing.T) {
	t.Parallel()
	_, pool := setupCheckerPoolSessionWithScope(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second},
		manyCheckerPoolFiles(), lsutil.WorkspaceDiagnosticsScopeOff)

	assert.Assert(t, diagnosticsCheckerCount(pool.program) > 1, "the program is big enough for a build to use several")
	assert.Equal(t, pool.diagnosticsCount, 1, "without the pull, diagnostics stay on one checker")
	assert.Equal(t, len(pool.checkers), 1+3, "one diagnostics checker plus MaxCheckers-1 query checkers")

	// Every file goes to that one checker.
	for _, file := range pool.program.SourceFiles() {
		assert.Equal(t, pool.diagnosticsIndexFor(file), 0)
	}
}

// A whole-program check stands aside between files for anything the user is waiting on, so a pull
// on the file in front of them is not queued behind the rest of the workspace.
func TestCheckerPoolWholeProgramCheckStandsAsideForInteractiveWork(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, manyCheckerPoolFiles())
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	files := program.SourceFiles()

	synctest.Test(t, func(t *testing.T) {
		interactive := newInteractiveWork()
		pool := newCheckerPool(CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second}, program, interactive, func(string) {})

		// Something the user is waiting on is outstanding before the check starts.
		interactiveDone := interactive.begin()

		var checked atomic.Int32
		var finished atomic.Bool
		go func() {
			pool.ForEachCheckerGroupDo(context.Background(), files, false /*singleThreaded*/, func(_ *checker.Checker, _ int, _ *ast.SourceFile) {
				checked.Add(1)
			})
			finished.Store(true)
		}()
		synctest.Wait()
		assert.Equal(t, checked.Load(), int32(0), "no file may be checked while the user is waiting on something")

		interactiveDone()
		synctest.Wait()
		assert.Assert(t, finished.Load(), "the check resumes once the interactive work is done")
		assert.Assert(t, checked.Load() > 0)
	})
}

// An interactive pull counts as work the user is waiting on from before it waits for a checker, so
// a check of the whole program stands aside rather than taking the checker out from under it.
func TestCheckerPoolInteractivePullCountsAsInteractiveWork(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, manyCheckerPoolFiles())
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		interactive := newInteractiveWork()
		pool := newCheckerPool(CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second}, program, interactive, func(string) {})

		ctx := core.WithRequestID(context.Background(), "doc-pull")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)
		ctx = core.WithInteractiveRequest(ctx)

		c, release := pool.GetChecker(ctx, program.SourceFiles()[0])
		assert.Assert(t, c != nil)

		var idle atomic.Bool
		go func() {
			interactive.waitForIdle(context.Background())
			idle.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, !idle.Load(), "a held interactive checker is work the user is waiting on")

		release()
		synctest.Wait()
		assert.Assert(t, idle.Load(), "releasing it clears the way for a workspace pass")
	})
}

// A pull that is not interactive - the workspace pass's own per-file acquisitions - must not count,
// or the pass would stand aside for itself and never finish.
func TestCheckerPoolSweepAcquisitionIsNotInteractive(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, manyCheckerPoolFiles())
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		interactive := newInteractiveWork()
		pool := newCheckerPool(CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second}, program, interactive, func(string) {})

		ctx := core.WithRequestID(context.Background(), "sweep")
		ctx = core.WithCheckerLifetime(ctx, core.CheckerLifetimeDiagnostics)

		_, release := pool.GetChecker(ctx, program.SourceFiles()[0])
		defer release()

		var idle atomic.Bool
		go func() {
			interactive.waitForIdle(context.Background())
			idle.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, idle.Load(), "a checker held by the pass itself is not work the user is waiting on")
	})
}

// A whole-program check reached from a request the user is waiting on must not stand aside: it
// would be waiting on itself, and the checkers of one group would take turns rather than run
// together. Nothing does this today, but it is a cheap thing to leave armed.
func TestCheckerPoolInteractiveWholeProgramCheckDoesNotStandAside(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 10 * time.Second}, manyCheckerPoolFiles())
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()
	files := program.SourceFiles()

	synctest.Test(t, func(t *testing.T) {
		interactive := newInteractiveWork()
		pool := newCheckerPool(CheckerPoolOptions{MaxCheckers: 4, IdleTimeout: 30 * time.Second}, program, interactive, func(string) {})

		// Something else the user is waiting on never finishes.
		defer interactive.begin()()

		ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)
		ctx = core.WithInteractiveRequest(ctx)

		var finished atomic.Bool
		go func() {
			pool.ForEachCheckerGroupDo(ctx, files, false /*singleThreaded*/, func(*checker.Checker, int, *ast.SourceFile) {})
			finished.Store(true)
		}()
		synctest.Wait()
		assert.Assert(t, finished.Load(), "an interactive check must not wait for the work it is part of")
	})
}

// A snapshot update during a whole-program check discards the pool the check is running on. The
// check is still using it, one file at a time, so a pool that lets go of a diagnostics checker the
// moment it is handed back makes the next file build a fresh one — and building one merges the
// globals of every file in the program. On a large project that is minutes per file.
func TestCheckerPoolDiscardDoesNotRebuildPerFile(t *testing.T) {
	t.Parallel()

	session, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, manyCheckerPoolFiles())
	t.Cleanup(session.Close)

	files := pool.program.SourceFiles()
	ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)

	// Discard lands partway through, as a snapshot update would.
	const discardAfter = 2
	seen := 0
	var checkers []*checker.Checker
	pool.ForEachCheckerGroupDo(ctx, files, true /*singleThreaded*/, func(c *checker.Checker, _ int, _ *ast.SourceFile) {
		checkers = append(checkers, c)
		seen++
		if seen == discardAfter {
			pool.Discard()
		}
	})

	assert.Assert(t, len(checkers) == len(files), "every file is checked, got %d of %d", len(checkers), len(files))
	distinct := map[*checker.Checker]bool{}
	for _, c := range checkers {
		distinct[c] = true
	}
	assert.Assert(t, len(distinct) <= pool.diagnosticsCount,
		"a discarded pool must not rebuild a checker per file: %d files were checked by %d distinct checkers, with only %d in the pool",
		len(files), len(distinct), pool.diagnosticsCount)
}

// Building a checker merges the globals of every file in the program, which on a large project is
// the slowest thing a pull does. A check that has been cancelled while waiting for a slot must
// give up rather than take the slot and build into it: the pull that cancelled it is waiting for
// that same slot.
func TestCheckerPoolCancelledSweepGivesUpTheSlot(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, manyCheckerPoolFiles())
	t.Cleanup(session.Close)
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{})
		// Single threaded, so the check runs on the first checker only.
		const owner = 0
		group := program.SourceFiles()

		// Something else holds the checker the group needs, so the check cannot start.
		held, releaseHeld := pool.acquireDiagnosticsChecker(owner, "holder")
		assert.Assert(t, held != nil)

		ctx, cancel := context.WithCancel(core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics))
		var checked atomic.Int64
		var returned atomic.Bool
		go func() {
			pool.ForEachCheckerGroupDo(ctx, group, true /*singleThreaded*/, func(*checker.Checker, int, *ast.SourceFile) {
				checked.Add(1)
			})
			returned.Store(true)
		}()

		synctest.Wait()
		assert.Assert(t, !returned.Load(), "the check is waiting for the checker the holder has")

		cancel()
		synctest.Wait()
		assert.Assert(t, returned.Load(), "a cancelled check must stop waiting for a slot it no longer needs")
		assert.Equal(t, checked.Load(), int64(0), "it checked nothing")

		// The slot is the holder's to give back, not the abandoned check's.
		releaseHeld()
		synctest.Wait()
		c, release := pool.acquireDiagnosticsChecker(owner, "after")
		assert.Assert(t, c != nil, "the slot is free once the holder releases it")
		release()
	})
}

// The reference graph a pull needs resolves every file's imports through a type checker, taking
// one from the pool per file rather than through ForEachCheckerGroupDo. A snapshot update part
// way through discards the pool underneath it, and it goes on asking, so the discard must not
// make each of those calls build a checker of its own.
func TestCheckerPoolDiscardDoesNotRebuildPerAcquisition(t *testing.T) {
	t.Parallel()

	session, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, manyCheckerPoolFiles())
	t.Cleanup(session.Close)

	files := pool.program.SourceFiles()
	ctx := core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics)

	// Discarding lets go of what nothing is holding, so the count that matters is how many
	// checkers the calls after it are served by, not how many the whole run built.
	const discardAfter = 2
	discarded := false
	after := map[*checker.Checker]bool{}
	for i, file := range files {
		c, release := pool.GetChecker(ctx, file)
		if discarded {
			after[c] = true
		}
		release()
		if i == discardAfter {
			pool.Discard()
			discarded = true
		}
	}

	served := len(files) - discardAfter - 1
	assert.Assert(t, len(after) <= pool.diagnosticsCount,
		"a discarded pool must not rebuild a checker per acquisition: %d calls after the discard were served by %d distinct checkers, with only %d in the pool",
		served, len(after), pool.diagnosticsCount)
}

// A check of the whole program splits the files unevenly, so a checker given a small share goes
// untouched for longer than the idle timeout while the rest are still going. Collecting it would
// have the next file that lands on it rebuild a checker part way through the check using it.
func TestCheckerPoolIdleCleanupWaitsForARunningCheck(t *testing.T) {
	t.Parallel()
	session, _ := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, manyCheckerPoolFiles())
	t.Cleanup(session.Close)
	ls, err := session.GetLanguageService(context.Background(), "file:///src/index.ts")
	assert.NilError(t, err)
	program := ls.GetProgram()

	synctest.Test(t, func(t *testing.T) {
		pool := newTestCheckerPool(program, CheckerPoolOptions{IdleTimeout: 30 * time.Second})
		// Single threaded, so the check runs on the first checker only.
		const owner = 0
		group := program.SourceFiles()

		// A checker the check is not on right now is built and handed back, as one given a small
		// share of the files would be early on, while the rest of the check runs for minutes.
		other := (owner + 1) % pool.diagnosticsCount
		idle, releaseIdle := pool.acquireDiagnosticsChecker(other, "early")
		assert.Assert(t, idle != nil)
		releaseIdle()

		// Meanwhile the check is still running.
		ctx, cancel := context.WithCancel(core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics))
		defer cancel()
		started := make(chan struct{})
		blocked := make(chan struct{})
		go func() {
			pool.ForEachCheckerGroupDo(ctx, group, true /*singleThreaded*/, func(*checker.Checker, int, *ast.SourceFile) {
				select {
				case <-started:
				default:
					close(started)
				}
				<-blocked
			})
		}()
		<-started

		time.Sleep(2 * pool.opts.IdleTimeout)
		synctest.Wait()
		pool.mu.Lock()
		kept := pool.checkers[other]
		pool.mu.Unlock()
		assert.Assert(t, kept == idle, "an idle checker must not be collected while a check is still running")

		close(blocked)
		synctest.Wait()
	})
}

// A bar has a hundred positions however big the sweep, so a report per file is work no one can
// see. The final count is still reported, or the bar stops short of where the check got to.
func TestCheckerPoolBatchesProgressReports(t *testing.T) {
	t.Parallel()

	session, pool := setupCheckerPoolSessionWithFiles(t, CheckerPoolOptions{}, manyCheckerPoolFiles())
	t.Cleanup(session.Close)

	files := pool.program.SourceFiles()
	var mu sync.Mutex
	var reports [][2]int
	ctx := WithCheckProgress(
		core.WithCheckerLifetime(context.Background(), core.CheckerLifetimeDiagnostics),
		func(checked, total int) {
			mu.Lock()
			defer mu.Unlock()
			reports = append(reports, [2]int{checked, total})
		})

	checked := 0
	pool.ForEachCheckerGroupDo(ctx, files, true /*singleThreaded*/, func(*checker.Checker, int, *ast.SourceFile) {
		checked++
	})

	assert.Equal(t, checked, len(files), "every file is checked")
	assert.Equal(t, len(reports), checked/checkProgressBatchFiles+1,
		"one report per %d files plus a final one, for %d files: %v", checkProgressBatchFiles, checked, reports)
	last := reports[len(reports)-1]
	assert.Equal(t, last[0], checked, "the last report is the final count")
	assert.Equal(t, last[1], len(files), "the total is the files it was given")
	for _, report := range reports[:len(reports)-1] {
		assert.Equal(t, report[0]%checkProgressBatchFiles, 0, "batched reports land on a batch boundary: %v", reports)
	}
}
