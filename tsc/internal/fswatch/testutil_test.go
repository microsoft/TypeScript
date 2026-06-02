package fswatch

import "testing"

// testingT is the subset of [testing.T] (and [testing.TB]) used by every
// test in this package. It exists so that the per-backend test bodies
// dispatched through [runForEachWatcher] can be re-run by a fake T that
// captures Fatal/Skip via panic+recover instead of terminating the
// goroutine. macOS event-delivery stalls (which are not regressions but
// environmental flakes) can then be transparently retried before
// propagating to the real *testing.T.
//
// Restricted vs *testing.T:
//   - No Parallel, Run, or other subtest plumbing.
//   - No Setenv / Chdir (would race across retries).
//
// All helper functions in this file accept testingT rather than
// *testing.T so they work with both the real test runner and the retry
// wrapper.
type testingT interface {
	Helper()
	Cleanup(fn func())
	TempDir() string
	Name() string

	Log(args ...any)
	Logf(format string, args ...any)

	Error(args ...any)
	Errorf(format string, args ...any)
	Fatal(args ...any)
	Fatalf(format string, args ...any)

	Skip(args ...any)
	Skipf(format string, args ...any)
	SkipNow()

	Failed() bool
}

// Compile-time assertion that *testing.T satisfies testingT.
var _ testingT = (*testing.T)(nil)

// retryAttempts is the number of times runForEachWatcher will re-run a
// failing per-backend test body before propagating the failure to the
// real *testing.T. The per-event timeouts inside the body scale with
// the attempt number (1×, 5×, 15×), so the fast-path is cheap and only
// real environmental flakes pay the cost of longer waits.
const retryAttempts = 3

// retryTimeoutScale returns the multiplier applied to per-event timeouts
// on the given (1-based) attempt. 1× on first try, 5× on second,
// 15× on third.
func retryTimeoutScale(attempt int) int {
	switch attempt {
	case 1:
		return 1
	case 2:
		return 5
	default:
		return 15
	}
}

// retryT is a fake [testingT] used to run a test body and decide
// whether it passed without committing the verdict to the real
// *testing.T on intermediate attempts.
//
// Most methods (Helper, Cleanup, TempDir, Name, Log, Logf) are direct
// passthroughs to the real T so messages stream to test output as they
// happen rather than waiting for a verdict. Error/Errorf record a
// failure locally but also log to the real T (so the message is visible
// even on a successful retry). Fatal/Fatalf/Skip[Now/f] additionally
// panic with [retryBail] to unwind the goroutine; the retry driver
// recovers and either retries or surfaces a final failure.
type retryT struct {
	t *testing.T

	// attempt is 1-based and increases on each retry. Per-event
	// timeouts in helpers (waitForEvent etc.) scale from this so the
	// fast-path uses a short deadline and only retries pay the cost of
	// longer waits.
	attempt int

	failed  bool
	skipped bool
}

// retryBail is panicked by Fatal/Fatalf/SkipNow/Skip[f] to abort the
// test body. The retry driver recovers it and inspects the retryT
// state to decide whether to retry, surface a skip, or accept success.
type retryBail struct{}

func newRetryT(t *testing.T, attempt int) *retryT {
	return &retryT{t: t, attempt: attempt}
}

func (r *retryT) Helper()                         { r.t.Helper() }
func (r *retryT) Cleanup(fn func())               { r.t.Cleanup(fn) }
func (r *retryT) TempDir() string                 { return r.t.TempDir() }
func (r *retryT) Name() string                    { return r.t.Name() }
func (r *retryT) Log(args ...any)                 { r.t.Helper(); r.t.Log(args...) }
func (r *retryT) Logf(format string, args ...any) { r.t.Helper(); r.t.Logf(format, args...) }
func (r *retryT) Failed() bool                    { return r.failed }

func (r *retryT) Error(args ...any) {
	r.t.Helper()
	r.failed = true
	r.t.Log(args...)
}

func (r *retryT) Errorf(format string, args ...any) {
	r.t.Helper()
	r.failed = true
	r.t.Logf(format, args...)
}

func (r *retryT) Fatal(args ...any) {
	r.t.Helper()
	r.failed = true
	r.t.Log(args...)
	panic(retryBail{})
}

func (r *retryT) Fatalf(format string, args ...any) {
	r.t.Helper()
	r.failed = true
	r.t.Logf(format, args...)
	panic(retryBail{})
}

func (r *retryT) Skip(args ...any) {
	r.t.Helper()
	r.skipped = true
	r.t.Log(args...)
	panic(retryBail{})
}

func (r *retryT) Skipf(format string, args ...any) {
	r.t.Helper()
	r.skipped = true
	r.t.Logf(format, args...)
	panic(retryBail{})
}

func (r *retryT) SkipNow() {
	r.skipped = true
	panic(retryBail{})
}

// runWithRetry runs body up to [retryAttempts] times. Each attempt uses
// a fresh retryT whose attempt counter scales the per-event timeouts in
// the test helpers. Returns on the first attempt that does not fail
// (Skip and success both terminate the loop). On final failure the real
// T is marked failed; intermediate failures are visible in test output
// as Log messages (from Error/Errorf/Fatal/Fatalf streaming through)
// followed by a "retry: ..." log noting the next attempt.
//
// On the fast-path (body passes first try), this is one call with
// negligible overhead over a direct invocation.
func runWithRetry(t *testing.T, body func(testingT)) {
	t.Helper()
	for attempt := 1; attempt <= retryAttempts; attempt++ {
		r := newRetryT(t, attempt)
		func() {
			defer func() {
				if rec := recover(); rec != nil {
					if _, ok := rec.(retryBail); !ok {
						// Not our panic; resurface.
						panic(rec)
					}
				}
			}()
			body(r)
		}()

		if r.skipped {
			t.SkipNow()
			return
		}
		if !r.failed {
			if attempt > 1 {
				t.Logf("retry: succeeded on attempt %d/%d", attempt, retryAttempts)
			}
			return
		}
		if attempt < retryAttempts {
			t.Logf("retry: attempt %d/%d failed, retrying with %d× timeout scale",
				attempt, retryAttempts, retryTimeoutScale(attempt+1))
		}
	}
	t.Errorf("retry: gave up after %d attempts", retryAttempts)
}
