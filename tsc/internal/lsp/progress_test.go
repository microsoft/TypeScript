package lsp

import (
	"context"
	"sync"
	"testing"
	"testing/synctest"
	"time"

	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

type progressCall struct {
	method string // "create", "begin", "report", "end"
	token  string
	title  string // begin only
	msg    string // begin/report only
}

type fakeProgressReporter struct {
	mu    sync.Mutex
	calls []progressCall
	ctx   context.Context
}

func (f *fakeProgressReporter) done() <-chan struct{} {
	return f.ctx.Done()
}

func (f *fakeProgressReporter) localize(msg *diagnostics.Message, args ...any) string {
	return msg.Localize(locale.Default, args...)
}

func (f *fakeProgressReporter) createWorkDoneProgress(token string) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.calls = append(f.calls, progressCall{method: "create", token: token})
}

func (f *fakeProgressReporter) sendProgress(token string, value lsproto.WorkDoneProgressBeginOrReportOrEnd) {
	f.mu.Lock()
	defer f.mu.Unlock()
	switch {
	case value.Begin != nil:
		msg := ""
		if value.Begin.Message != nil {
			msg = *value.Begin.Message
		}
		f.calls = append(f.calls, progressCall{method: "begin", token: token, title: value.Begin.Title, msg: msg})
	case value.Report != nil:
		msg := ""
		if value.Report.Message != nil {
			msg = *value.Report.Message
		}
		f.calls = append(f.calls, progressCall{method: "report", token: token, msg: msg})
	case value.End != nil:
		f.calls = append(f.calls, progressCall{method: "end", token: token})
	}
}

func (f *fakeProgressReporter) getCalls() []progressCall {
	f.mu.Lock()
	defer f.mu.Unlock()
	return append([]progressCall(nil), f.calls...)
}

func TestProgress(t *testing.T) {
	t.Parallel()

	t.Run("StartFinishBeforeDelay", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 500*time.Millisecond)

			p.start(diagnostics.Project_0, "myProject")
			synctest.Wait()

			// Finish before the delay fires — no UI should appear.
			p.finish(diagnostics.Project_0, "myProject")
			synctest.Wait()

			// Advance time past the delay to ensure no progress is sent.
			time.Sleep(600 * time.Millisecond)
			synctest.Wait()

			calls := reporter.getCalls()
			if len(calls) != 0 {
				t.Fatalf("expected no progress calls for fast operation, got %v", calls)
			}

			cancel()
		})
	})

	t.Run("ShowsAfterDelay", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 500*time.Millisecond)

			p.start(diagnostics.Project_0, "myProject")
			synctest.Wait()

			// Let the delay fire.
			time.Sleep(500 * time.Millisecond)
			synctest.Wait()

			calls := reporter.getCalls()
			if len(calls) != 2 {
				t.Fatalf("expected 2 calls (create + begin), got %d: %v", len(calls), calls)
			}
			if calls[0].method != "create" {
				t.Fatalf("expected create, got %v", calls[0])
			}
			if calls[1].method != "begin" {
				t.Fatalf("expected begin, got %v", calls[1])
			}
			if calls[1].title != diagnostics.Loading.String() {
				t.Fatalf("expected title %q, got %q", diagnostics.Loading.String(), calls[1].title)
			}

			// Finish the operation.
			p.finish(diagnostics.Project_0, "myProject")
			synctest.Wait()

			calls = reporter.getCalls()
			last := calls[len(calls)-1]
			if last.method != "end" {
				t.Fatalf("expected end, got %v", last)
			}

			cancel()
		})
	})

	t.Run("ReportsMultipleOperations", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 100*time.Millisecond)

			// Start two different operations.
			p.start(diagnostics.Project_0, "projA")
			p.start(diagnostics.Project_0, "projB")
			synctest.Wait()

			// Let the delay fire.
			time.Sleep(100 * time.Millisecond)
			synctest.Wait()

			calls := reporter.getCalls()
			// Should have: create, begin (with first message).
			if len(calls) < 2 {
				t.Fatalf("expected at least 2 calls, got %d: %v", len(calls), calls)
			}
			if calls[0].method != "create" {
				t.Fatalf("expected create, got %v", calls[0])
			}
			if calls[1].method != "begin" {
				t.Fatalf("expected begin, got %v", calls[1])
			}

			// Finish one — should send a report with the remaining operation.
			p.finish(diagnostics.Project_0, "projA")
			synctest.Wait()

			calls = reporter.getCalls()
			found := false
			for _, c := range calls {
				if c.method == "report" {
					found = true
					break
				}
			}
			if !found {
				t.Fatalf("expected a report after partial finish, got %v", calls)
			}

			// Finish the second — should send end.
			p.finish(diagnostics.Project_0, "projB")
			synctest.Wait()

			calls = reporter.getCalls()
			last := calls[len(calls)-1]
			if last.method != "end" {
				t.Fatalf("expected end, got %v", last)
			}

			cancel()
		})
	})

	t.Run("RefCounting", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 100*time.Millisecond)

			// Start the same operation twice (ref count = 2).
			p.start(diagnostics.Project_0, "proj")
			p.start(diagnostics.Project_0, "proj")
			synctest.Wait()

			time.Sleep(100 * time.Millisecond)
			synctest.Wait()

			// Finish once (ref count = 1) — should NOT end.
			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls := reporter.getCalls()
			for _, c := range calls {
				if c.method == "end" {
					t.Fatalf("unexpected end with ref count > 0: %v", calls)
				}
			}

			// Finish again (ref count = 0) — should end.
			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls = reporter.getCalls()
			last := calls[len(calls)-1]
			if last.method != "end" {
				t.Fatalf("expected end when ref count reaches 0, got %v", last)
			}

			cancel()
		})
	})

	t.Run("NewTokenAfterEnd", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 100*time.Millisecond)

			// First cycle.
			p.start(diagnostics.Project_0, "proj")
			synctest.Wait()
			time.Sleep(100 * time.Millisecond)
			synctest.Wait()

			calls := reporter.getCalls()
			firstToken := calls[0].token

			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			// Second cycle — should get a new token.
			p.start(diagnostics.Project_0, "proj2")
			synctest.Wait()
			time.Sleep(100 * time.Millisecond)
			synctest.Wait()

			calls = reporter.getCalls()
			var secondToken string
			for _, c := range calls {
				if c.method == "create" && c.token != firstToken {
					secondToken = c.token
					break
				}
			}
			if secondToken == "" {
				t.Fatalf("expected a new token for second cycle, got calls: %v", calls)
			}
			if firstToken == secondToken {
				t.Fatalf("expected different tokens, both were %q", firstToken)
			}

			p.finish(diagnostics.Project_0, "proj2")
			synctest.Wait()

			cancel()
		})
	})

	t.Run("StartBeforeDelayThenMoreAfterDelay", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 200*time.Millisecond)

			// Start before delay.
			p.start(diagnostics.Project_0, "projA")
			synctest.Wait()

			// Let delay fire.
			time.Sleep(200 * time.Millisecond)
			synctest.Wait()

			calls := reporter.getCalls()
			if len(calls) < 2 {
				t.Fatalf("expected create + begin after delay, got %v", calls)
			}

			// Start another operation after delay — should send a report immediately.
			p.start(diagnostics.Project_0, "projB")
			synctest.Wait()

			calls = reporter.getCalls()
			last := calls[len(calls)-1]
			if last.method != "report" {
				t.Fatalf("expected report for new start after delay, got %v", last)
			}

			// Clean up.
			p.finish(diagnostics.Project_0, "projA")
			p.finish(diagnostics.Project_0, "projB")
			synctest.Wait()

			cancel()
		})
	})

	t.Run("FinishWithNoActiveToken", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 100*time.Millisecond)

			// Finish without any prior start — should be a no-op.
			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls := reporter.getCalls()
			if len(calls) != 0 {
				t.Fatalf("expected no calls for orphan finish, got %v", calls)
			}

			cancel()
		})
	})

	t.Run("ShutdownDuringStartAndFinish", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 100*time.Millisecond)

			// Cancel context so the run goroutine exits.
			cancel()
			synctest.Wait()

			// Fill the channel buffer so start/finish block on send.
			for range cap(p.ch) {
				p.ch <- progressEvent{message: diagnostics.Project_0, args: []any{"fill"}}
			}

			// These should return immediately via the done() path
			// since the channel is full and the context is cancelled.
			p.start(diagnostics.Project_0, "proj")
			p.finish(diagnostics.Project_0, "proj")
		})
	})

	t.Run("ShutdownWithActiveTimer", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 500*time.Millisecond)

			// Start an operation so the delay timer is created.
			p.start(diagnostics.Project_0, "proj")
			synctest.Wait()

			// Shutdown while the delay timer is still pending.
			cancel()
			synctest.Wait()
		})
	})

	t.Run("ZeroDelay", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 0)

			// With zero delay, progress should begin immediately.
			p.start(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls := reporter.getCalls()
			if len(calls) != 2 {
				t.Fatalf("expected 2 calls (create + begin), got %d: %v", len(calls), calls)
			}
			if calls[0].method != "create" {
				t.Fatalf("expected create, got %v", calls[0])
			}
			if calls[1].method != "begin" {
				t.Fatalf("expected begin, got %v", calls[1])
			}
			if calls[1].msg != "Project 'proj'" {
				t.Fatalf("expected message %q, got %q", "Project 'proj'", calls[1].msg)
			}

			// Start+finish should still produce begin and end.
			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls = reporter.getCalls()
			last := calls[len(calls)-1]
			if last.method != "end" {
				t.Fatalf("expected end, got %v", last)
			}

			cancel()
		})
	})

	t.Run("FinishBeforeDelayNoBegun", func(t *testing.T) {
		t.Parallel()
		synctest.Test(t, func(t *testing.T) {
			ctx, cancel := context.WithCancel(context.Background())
			defer cancel()
			reporter := &fakeProgressReporter{ctx: ctx}
			p := newProjectLoadingProgressFromReporter(reporter, 500*time.Millisecond)

			// Start, then finish before delay — begun is false, so no end is sent.
			p.start(diagnostics.Project_0, "proj")
			synctest.Wait()
			p.finish(diagnostics.Project_0, "proj")
			synctest.Wait()

			calls := reporter.getCalls()
			for _, c := range calls {
				if c.method == "end" {
					t.Fatalf("unexpected end when begun=false: %v", calls)
				}
			}

			cancel()
		})
	})
}
