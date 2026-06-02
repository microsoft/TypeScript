// Watcher tests: CRUD events for files, directories, sub-entries, and
// symlinks; event coalescing; multiple subscriptions; error handling;
// watch lifecycle; public API validation; and watcherBase/
// dirWatchError internals. Each test runs against every watcher available
// on the host OS unless it exercises internal types directly.

package fswatch

import (
	"cmp"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"path/filepath"
	"runtime"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"
)

// ----- helpers -----------------------------------------------------------

// defaultEventTimeout is the per-`next` wait used by subscribe tests for
// the fast/responsive backends (inotify, fanotify, Windows). Scales up
// on retry via [watcherEventTimeout] so the fast path is cheap.
func defaultEventTimeout() time.Duration {
	return 1 * time.Second
}

// kqueueFSEventsTimeout is the per-event deadline for the kqueue and
// fsevents backends. Those have materially higher kernel-to-userspace
// latency than inotify/fanotify/Windows: kqueue uses directory
// NOTE_WRITE + compareDir which takes a scheduling round-trip per
// change, and fsevents introduces its own batching on top of the GCD
// dispatch queue. Scales up on retry via [watcherEventTimeout].
func kqueueFSEventsTimeout() time.Duration {
	return 2 * time.Second
}

// watcherEventTimeout returns the appropriate per-event deadline for
// the backend under test, scaled by the current [testingT]'s retry attempt
// number. The fast-path uses the base timeout (1-2 seconds); retries
// scale up so a single environmental hiccup gets a longer wait without
// inflating every passing run's wall-clock.
func watcherEventTimeout(t testingT, w Watcher) time.Duration {
	base := defaultEventTimeout()
	if w == FSEvents() || w == Kqueue() {
		base = kqueueFSEventsTimeout()
	}
	scale := 1
	if rt, ok := t.(*retryT); ok {
		scale = retryTimeoutScale(rt.attempt)
	}
	return base * time.Duration(scale)
}

// availableWatchers is populated at init time from whichever backends
// are available on the current platform, plus any test-only watcher
// variants registered in additionalTestWatchers (see e.g.
// fanotify_linux_test.go).
var availableWatchers []Watcher

// additionalTestWatchers is appended to by platform-specific *_test.go
// init() functions to register test-only watcher variants (e.g. the
// fanotify-no-rename backend that exercises the FAN_MOVED_FROM/_TO
// fallback path). Producers' init() must run before this file's init();
// since Go runs file inits in lexicographic file-name order and this
// file is watcher_test.go, that ordering is satisfied for every other
// *_test.go file in the package.
var additionalTestWatchers []Watcher

func init() {
	for _, b := range AllWatchers() {
		if b.Available() {
			availableWatchers = append(availableWatchers, b)
		}
	}
	for _, b := range additionalTestWatchers {
		if b.Available() {
			availableWatchers = append(availableWatchers, b)
		}
	}
}

// runForEachWatcher runs fn as a subtest for every available watcher.
//
// The per-backend test body receives a [testingT] (a subset of *testing.T)
// rather than the real *testing.T. This lets [runWithRetry] re-run a
// body that fails due to environmental flakes (macOS event-delivery
// stalls under load) before propagating the failure to the real test
// runner.
func runForEachWatcher(t *testing.T, fn func(t testingT, watcherImpl Watcher)) {
	t.Helper()
	for _, b := range availableWatchers {
		t.Run(b.Name(), func(t *testing.T) {
			t.Parallel()
			runWithRetry(t, func(rt testingT) {
				fn(rt, b)
			})
		})
	}
}

// newTmpDir creates a fresh temp dir, resolves any symlinks in the path so
// it matches what backends report, and registers cleanup.
func newTmpDir(t testingT) string {
	t.Helper()
	d := t.TempDir()
	resolved, err := filepath.EvalSymlinks(d)
	if err != nil {
		t.Fatal(err)
	}
	return resolved
}

// nameCounter generates unique file names per test to avoid collisions.
var nameCounter atomic.Uint64

func uniqueName(parts ...string) string {
	n := nameCounter.Add(1)
	suffix := fmt.Sprintf("test%d%d", n, rand.Int63())
	return filepath.Join(append(parts, suffix)...)
}

// subPath produces a unique name in dir.
func subPath(dir string) string {
	return uniqueName(dir)
}

// newDirectWatcher creates a bare dirWatch for unit-testing tree/debounce
// helpers without going through the full backend subscribe path. Each
// test gets its own debouncer so tests don't share goroutine state.
func newDirectWatcher(t testingT, dir string) *dirWatch {
	t.Helper()
	w := newDirWatch(dir, newDebounce())
	w.recursive = true
	t.Cleanup(func() { w.destroyDebounce() })
	return w
}

// subscribeFor sets up a recorder + WatchDirectory and registers cleanup.
func subscribeFor(t testingT, dir string, watcherImpl Watcher) (*recordingWatcher, Watch) {
	return subscribeForOpts(t, dir, watcherImpl, WithRecursive())
}

// settleSleep is the post-subscribe settle wait. Empirically tuned per
// backend: fsevents and kqueue need a couple of hundred ms to actually
// arm their watches on the freshly-created tmp dir, while inotify/
// fanotify/Windows are essentially synchronous.
func settleSleep(w Watcher) time.Duration {
	if w == FSEvents() || w == Kqueue() {
		return 300 * time.Millisecond
	}
	return 60 * time.Millisecond
}

// preSubscribeSleep gives the macOS fsevents stream timestamp enough
// distance from any tmp-dir creation just before subscribe; without
// it the initial event batch may include the watched dir's own create.
func preSubscribeSleep(w Watcher) time.Duration {
	if w == FSEvents() || w == Kqueue() {
		return 50 * time.Millisecond
	}
	return 0
}

// subscribeFileFor sets up a recorder + WatchFile and registers cleanup.
func subscribeFileFor(t testingT, path string, watcherImpl Watcher) (*recordingWatcher, Watch) {
	t.Helper()
	if d := preSubscribeSleep(watcherImpl); d > 0 {
		time.Sleep(d)
	}
	r := newRecorder(t)
	r.watcher = watcherImpl
	sub, err := watcherImpl.WatchFile(path, r.callback)
	if err != nil {
		t.Fatalf("subscribeFile: %v", err)
	}
	t.Cleanup(func() { _ = sub.Close() })
	time.Sleep(settleSleep(watcherImpl))
	return r, sub
}

// subscribeForOpts sets up a recorder + WatchDirectory with options and registers cleanup.
func subscribeForOpts(t testingT, dir string, watcherImpl Watcher, opts ...WatchOption) (*recordingWatcher, Watch) {
	t.Helper()
	if d := preSubscribeSleep(watcherImpl); d > 0 {
		time.Sleep(d)
	}
	r := newRecorder(t)
	r.watcher = watcherImpl
	sub, err := watcherImpl.WatchDirectory(dir, r.callback, opts...)
	if err != nil {
		t.Fatalf("subscribe: %v", err)
	}
	t.Cleanup(func() { _ = sub.Close() })
	time.Sleep(settleSleep(watcherImpl))
	return r, sub
}

// ----- recordingWatcher --------------------------------------------------

type recordingWatcher struct {
	t       testingT
	watcher Watcher // bound at subscribe time so expect* helpers can choose timeouts
	mu      sync.Mutex
	cond    *sync.Cond
	buf     []Event
	errs    []error
}

func newRecorder(t testingT) *recordingWatcher {
	r := &recordingWatcher{t: t}
	r.cond = sync.NewCond(&r.mu)
	return r
}

// deadline returns the per-event timeout appropriate for the recorder's
// bound watcher backend, or the default if no watcher was attached.
// The returned duration scales with the current retry attempt when the
// recorder is bound to a [retryT].
func (r *recordingWatcher) deadline() time.Duration {
	if r.watcher == nil {
		return scaledDeadline(r.t, defaultEventTimeout())
	}
	return watcherEventTimeout(r.t, r.watcher)
}

// scaledDeadline multiplies base by the retry scale for t (if t is a
// retryT), so per-event timeouts grow on retries without inflating the
// fast path.
func scaledDeadline(t testingT, base time.Duration) time.Duration {
	if rt, ok := t.(*retryT); ok {
		return base * time.Duration(retryTimeoutScale(rt.attempt))
	}
	return base
}

func (r *recordingWatcher) callback(events []Event, err error) {
	r.mu.Lock()
	defer r.mu.Unlock()
	if err != nil {
		r.errs = append(r.errs, err)
	}
	r.buf = append(r.buf, events...)
	r.cond.Broadcast()
}

// next blocks for up to d for at least one event, then drains and returns
// everything that has accumulated.
func (r *recordingWatcher) next(d time.Duration) []Event {
	r.t.Helper()
	deadline := time.Now().Add(d)
	r.mu.Lock()
	defer r.mu.Unlock()
	for len(r.buf) == 0 {
		remaining := time.Until(deadline)
		if remaining <= 0 {
			return nil
		}
		stopper := time.AfterFunc(remaining, func() {
			r.mu.Lock()
			r.cond.Broadcast()
			r.mu.Unlock()
		})
		r.cond.Wait()
		stopper.Stop()
	}
	out := slices.Clone(r.buf)
	r.buf = nil
	return out
}

// drainQuiet drains any buffered events, then waits at most d to make sure
// no further events arrive. Returns whatever shows up.
func (r *recordingWatcher) drainQuiet(d time.Duration) []Event {
	r.t.Helper()
	r.mu.Lock()
	r.buf = nil
	r.mu.Unlock()
	time.Sleep(d)
	r.mu.Lock()
	out := slices.Clone(r.buf)
	r.buf = nil
	r.mu.Unlock()
	return out
}

// gather waits up to `wait` for at least one event, then settles for
// `settle` to give the rest of the debounced batch a chance to arrive.
func (r *recordingWatcher) gather(wait, settle time.Duration) []Event {
	first := r.next(wait)
	if len(first) == 0 {
		return nil
	}
	time.Sleep(settle)
	r.mu.Lock()
	defer r.mu.Unlock()
	more := slices.Clone(r.buf)
	r.buf = nil
	return append(first, more...)
}

// gatherUntilQuiet collects events until either the initial wait expires
// without seeing one, or the recorder has gone quiet for `quiet`. Useful
// for assertions that need to observe events possibly spread across
// multiple debounce batches (e.g. rapid-coalescing tests).
func (r *recordingWatcher) gatherUntilQuiet(initialWait, quiet time.Duration) []Event {
	first := r.next(initialWait)
	if len(first) == 0 {
		return nil
	}
	all := first
	for {
		more := r.next(quiet)
		if len(more) == 0 {
			return all
		}
		all = append(all, more...)
	}
}

// waitForEvent blocks until an event matching pred is observed in the
// recorder's accumulating buffer, or until deadline elapses. Returns all
// events collected up to the success / timeout (and drains them from the
// buffer). Useful for tests where the kernel backend takes a variable
// amount of time to install/propagate a fresh watch, instead of betting
// on a fixed sleep that breaks under host CPU/IO contention.
func (r *recordingWatcher) waitForEvent(d time.Duration, pred func(Event) bool) []Event {
	r.t.Helper()
	deadline := time.Now().Add(d)
	for {
		r.mu.Lock()
		if slices.ContainsFunc(r.buf, pred) {
			out := slices.Clone(r.buf)
			r.buf = nil
			r.mu.Unlock()
			return out
		}
		remaining := time.Until(deadline)
		if remaining <= 0 {
			out := slices.Clone(r.buf)
			r.buf = nil
			r.mu.Unlock()
			return out
		}
		stopper := time.AfterFunc(remaining, func() {
			r.mu.Lock()
			r.cond.Broadcast()
			r.mu.Unlock()
		})
		r.cond.Wait()
		stopper.Stop()
		r.mu.Unlock()
	}
}

// waitForAll polls the recorder's buffer until every event in want is
// observed (paths matched, kind matched) or d elapses. Returns the full
// accumulated set drained from the buffer either way. Extra events
// outside of want are kept in the returned slice but do not count
// against the deadline.
//
// Use this instead of one-shot r.next() in any test where the kernel
// might split events across multiple debounce batches or take a moment
// to install a watch on a freshly created dir. The retry behavior makes
// the test robust to host CPU/IO contention.
func (r *recordingWatcher) waitForAll(d time.Duration, want []wantEvent) []Event {
	r.t.Helper()
	if len(want) == 0 {
		return nil
	}
	deadline := time.Now().Add(d)
	collected := make([]Event, 0)
	for {
		r.mu.Lock()
		collected = append(collected, r.buf...)
		r.buf = nil
		r.mu.Unlock()
		if haveAll(collected, want) {
			return collected
		}
		remaining := time.Until(deadline)
		if remaining <= 0 {
			return collected
		}
		r.mu.Lock()
		if len(r.buf) > 0 {
			r.mu.Unlock()
			continue
		}
		stopper := time.AfterFunc(remaining, func() {
			r.mu.Lock()
			r.cond.Broadcast()
			r.mu.Unlock()
		})
		r.cond.Wait()
		stopper.Stop()
		r.mu.Unlock()
	}
}

// haveAll reports whether every event in want is matched at least once
// in got. Extra got events are ignored.
func haveAll(got []Event, want []wantEvent) bool {
	for _, w := range want {
		found := false
		for _, e := range got {
			if e.Kind == w.Kind && e.Path == w.Path {
				found = true
				break
			}
		}
		if !found {
			return false
		}
	}
	return true
}

// expectEventSet polls until every wanted event has arrived (or the
// scaled deadline elapses) and then asserts the matching set
// (ignoring order). Use everywhere the test had next/gather followed
// by assertEventSet; it removes the timing assumption that the events
// land in one debounce batch.
func expectEventSet(t testingT, r *recordingWatcher, want []wantEvent) []Event {
	t.Helper()
	got := r.waitForAll(r.deadline(), want)
	assertEventSet(t, got, want)
	return got
}

// expectEventSequence polls until every wanted event has arrived, then
// asserts they appear in the exact specified order (filtered to
// wanted paths). Order-sensitive callers that previously used
// assertEventSequence on a one-shot next/gather.
func expectEventSequence(t testingT, r *recordingWatcher, want []wantEvent) []Event {
	t.Helper()
	got := r.waitForAll(r.deadline(), want)
	assertEventSequence(t, got, want)
	return got
}

// expectContains polls until any event matching kind+path arrives, then
// returns the accumulated event slice. Use for tests that don't care
// about a specific set of events but want to verify at least one
// specific event surfaced.
func expectContains(t testingT, r *recordingWatcher, kind EventKind, path string) []Event {
	t.Helper()
	d := r.deadline()
	got := r.waitForEvent(d, func(e Event) bool {
		return e.Kind == kind && e.Path == path
	})
	if !containsEvent(got, kind, path) {
		t.Fatalf("expected event %s %s within %s, got %v", kind, path, d, toWantEvents(got))
	}
	return got
}

func expectNoBufferedEvents(t testingT, r *recordingWatcher, msg string) {
	t.Helper()
	r.mu.Lock()
	got := slices.Clone(r.buf)
	r.buf = nil
	r.mu.Unlock()
	if len(got) > 0 {
		t.Fatalf("%s, got %v", msg, toWantEvents(got))
	}
}

func assertNoEventsForPath(t testingT, got []Event, path, msg string) {
	t.Helper()
	got = filterEventsForPaths(got, path)
	if len(got) > 0 {
		t.Fatalf("%s %s, got %v", msg, path, toWantEvents(got))
	}
}

// ----- assertion helpers -------------------------------------------------

type wantEvent struct {
	Kind EventKind
	Path string
}

func toWantEvents(events []Event) []wantEvent {
	out := make([]wantEvent, len(events))
	for i, e := range events {
		out[i] = wantEvent(e)
	}
	return out
}

// assertEventSet compares two event sets ignoring order.
// Events for paths not in want are ignored (e.g. parent-dir update noise).
func assertEventSet(t testingT, got []Event, want []wantEvent) {
	t.Helper()
	got = filterToWantedPaths(got, want)
	gotW := toWantEvents(got)
	cmpEvents := func(a, b wantEvent) int {
		if a.Kind != b.Kind {
			return cmp.Compare(a.Kind, b.Kind)
		}
		return cmp.Compare(a.Path, b.Path)
	}
	slices.SortFunc(gotW, cmpEvents)
	slices.SortFunc(want, cmpEvents)
	if !equalWantEvents(gotW, want) {
		t.Fatalf("event mismatch\nwant: %v\n got: %v", want, gotW)
	}
}

// assertEventSequence is like assertEventSet but order-sensitive.
// Events for paths not in want are ignored (e.g. parent-dir update noise).
func assertEventSequence(t testingT, got []Event, want []wantEvent) {
	t.Helper()
	got = filterToWantedPaths(got, want)
	gotW := toWantEvents(got)
	if !equalWantEvents(gotW, want) {
		t.Fatalf("event sequence mismatch\nwant: %v\n got: %v", want, gotW)
	}
}

// filterToWantedPaths returns only events whose path appears in want.
func filterToWantedPaths(got []Event, want []wantEvent) []Event {
	paths := make(map[string]struct{}, len(want))
	for _, w := range want {
		paths[w.Path] = struct{}{}
	}
	filtered := make([]Event, 0, len(got))
	for _, e := range got {
		if _, ok := paths[e.Path]; ok {
			filtered = append(filtered, e)
		}
	}
	return filtered
}

func equalWantEvents(a, b []wantEvent) bool {
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

// containsEvent reports whether got contains an event with the given type+path.
func containsEvent(got []Event, typ EventKind, path string) bool {
	for _, e := range got {
		if e.Kind == typ && e.Path == path {
			return true
		}
	}
	return false
}

// filterEventsForPaths returns only the events whose Path is in the
// allowed set. Used to discard incidental dir-update events that some
// backends emit for the parent dir of a touched file.
func filterEventsForPaths(events []Event, paths ...string) []Event {
	allow := make(map[string]struct{}, len(paths))
	for _, p := range paths {
		allow[p] = struct{}{}
	}
	out := make([]Event, 0, len(events))
	for _, e := range events {
		if _, ok := allow[e.Path]; ok {
			out = append(out, e)
		}
	}
	return out
}

// replayEventList re-applies a sequence of events through a fresh
// eventList and returns the coalesced result. This is what the directory watch
// would have produced if every event had landed in the same debounce
// batch; useful for assertions that must be tolerant to batch splitting.
func replayEventList(events []Event) []Event {
	var el eventList
	for _, e := range events {
		switch e.Kind {
		case EventUpdate:
			el.update(e.Path)
		case EventDelete:
			el.remove(e.Path)
		}
	}
	return el.getEvents()
}

// ----- files -------------------------------------------------------------

func TestWatchFileCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)

		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestWatchFileUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		// Mirror upstream JS: create file AFTER subscribe so the create
		// event populates the watcherImpl's internal tree, then update it so
		// the subsequent modify event is correctly classified as update.
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true }) // consume the create event
		if err := os.WriteFile(f, []byte("v2-longer"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestWatchFileRename(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f1 := subPath(dir)
		f2 := subPath(dir)
		if err := os.WriteFile(f1, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.Rename(f1, f2); err != nil {
			t.Fatal(err)
		}
		expectEventSet(t, r, []wantEvent{
			{EventDelete, f1},
			{EventUpdate, f2},
		})
	})
}

func TestWatchFileRenameExisting(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		// Existing file present at subscribe time.
		f1 := subPath(dir)
		if err := os.WriteFile(f1, []byte("hi"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		f2 := subPath(dir)
		if err := os.Rename(f1, f2); err != nil {
			t.Fatal(err)
		}
		expectEventSet(t, r, []wantEvent{
			{EventDelete, f1},
			{EventUpdate, f2},
		})
	})
}

func TestWatchFileDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f}})
	})
}

// ----- directories -------------------------------------------------------

func TestSubscribeDirCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		if err := os.Mkdir(f, 0o755); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

// TestSubscribeNonASCIIPath checks that every backend round-trips a
// non-ASCII path byte-for-byte: subscribe to a directory whose name
// contains precomposed (NFC) Unicode, create a child with non-ASCII
// bytes in its name, and assert the event's Path equals what we would
// have produced with filepath.Join. Guards against any backend (or the
// shared event path) silently mutating the bytes.
func TestSubscribeNonASCIIPath(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		parent := newTmpDir(t)
		// "café" + "résumé"; both precomposed NFC.
		dir := filepath.Join(parent, "caf\u00e9-dir")
		if err := os.Mkdir(dir, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		child := filepath.Join(dir, "r\u00e9sum\u00e9.txt")
		if err := os.WriteFile(child, []byte("hi"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, child}})
	})
}

func TestSubscribeDirRename(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f1 := subPath(dir)
		if err := os.Mkdir(f1, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		f2 := subPath(dir)
		if err := os.Rename(f1, f2); err != nil {
			t.Fatal(err)
		}
		expectEventSet(t, r, []wantEvent{
			{EventDelete, f1},
			{EventUpdate, f2},
		})
	})
}

func TestSubscribeDirDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.Mkdir(f, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.RemoveAll(f); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f}})
	})
}

func TestSubscribeWatchedDirDeleted(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.RemoveAll(dir); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, dir}})

		// Give the backend a moment to surface ErrWatchTerminated alongside
		// the delete; some backends batch the error into a later debounce
		// tick than the event itself.
		deadline := time.Now().Add(r.deadline())
		for time.Now().Before(deadline) {
			r.mu.Lock()
			n := len(r.errs)
			r.mu.Unlock()
			if n > 0 {
				break
			}
			time.Sleep(20 * time.Millisecond)
		}
		r.mu.Lock()
		errs := slices.Clone(r.errs)
		r.errs = nil
		r.mu.Unlock()
		sawTerminated := false
		for _, e := range errs {
			if errors.Is(e, ErrWatchTerminated) {
				sawTerminated = true
				break
			}
		}
		if !sawTerminated {
			t.Fatalf("expected ErrWatchTerminated after watched dir delete, got errs=%v", errs)
		}

		// Re-create; should not emit events for a now-stale watch.
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatal(err)
		}
		extra := r.drainQuiet(200 * time.Millisecond)
		if len(extra) != 0 {
			t.Fatalf("expected no follow-up events, got %v", extra)
		}
	})
}

// ----- sub-files ---------------------------------------------------------

func TestSubscribeSubfileCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)

		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		expectContains(t, r, EventUpdate, sub)
		// Wait for the inotify watcherImpl to finish setting up the watch on
		// the new dir before mutating it.
		time.Sleep(100 * time.Millisecond)

		f := subPath(sub)
		if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeSubfileUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(sub)
		// WatchDirectory-then-create so the create event populates the
		// watcherImpl's tree before the modify arrives.
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true })
		if err := os.WriteFile(f, []byte("v2-longer"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectContains(t, r, EventUpdate, f)
	})
}

func TestSubscribeSubfileRename(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		f1 := subPath(sub)
		if err := os.WriteFile(f1, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		f2 := subPath(sub)
		if err := os.Rename(f1, f2); err != nil {
			t.Fatal(err)
		}
		// Wait for both events to arrive before checking the set.
		want := []wantEvent{{EventDelete, f1}, {EventUpdate, f2}}
		got := r.waitForAll(r.deadline(), want)
		filtered := filterEventsForPaths(got, f1, f2)
		assertEventSet(t, filtered, want)
	})
}

func TestSubscribeSubfileDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		f := subPath(sub)
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		want := []wantEvent{{EventDelete, f}}
		got := r.waitForAll(r.deadline(), want)
		filtered := filterEventsForPaths(got, f)
		assertEventSequence(t, filtered, want)
	})
}

// ----- sub-directories ---------------------------------------------------

func TestSubscribeSubdirCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		nested := subPath(sub)
		if err := os.Mkdir(nested, 0o755); err != nil {
			t.Fatal(err)
		}
		want := []wantEvent{{EventUpdate, nested}}
		got := r.waitForAll(r.deadline(), want)
		filtered := filterEventsForPaths(got, nested)
		assertEventSequence(t, filtered, want)
	})
}

func TestSubscribeSubdirDeleteWithFiles(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		subDir := subPath(dir)
		if err := os.Mkdir(subDir, 0o755); err != nil {
			t.Fatal(err)
		}
		child := subPath(subDir)
		if err := os.WriteFile(child, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.RemoveAll(subDir); err != nil {
			t.Fatal(err)
		}
		expectEventSet(t, r, []wantEvent{
			{EventDelete, subDir},
			{EventDelete, child},
		})
	})
}

// ----- symlinks ----------------------------------------------------------

func TestSubscribeSymlinkCreate(t *testing.T) {
	t.Parallel()
	if runtime.GOOS == "dragonfly" {
		t.Skip("DragonFlyBSD kqueue doesn't fire NOTE_WRITE on symlink creation")
	}
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f1 := subPath(dir)
		if err := os.WriteFile(f1, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		f2 := subPath(dir)
		if err := os.Symlink(f1, f2); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f2}})
	})
}

func TestSubscribeSymlinkDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f1 := subPath(dir)
		f2 := subPath(dir)
		if err := os.WriteFile(f1, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.Symlink(f1, f2); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)
		if err := os.Remove(f2); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f2}})
	})
}

// ----- event coalescing --------------------------------------------------

func TestSubscribeCoalesceCreateUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(f, []byte("v2"), 0o644); err != nil {
			t.Fatal(err)
		}
		// The two writes should net to one update. Under host load the
		// debounce may split them across batches, so check the coalesced
		// effect via replayEventList rather than insisting on a single
		// delivered event.
		got := r.gatherUntilQuiet(r.deadline(), 3*maxWaitTime)
		net := replayEventList(filterEventsForPaths(got, f))
		assertEventSet(t, net, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeCoalesceDeleteCreateAsUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true })
		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(f, []byte("v2"), 0o644); err != nil {
			t.Fatal(err)
		}
		// Net: delete+create coalesces to update.
		got := r.gatherUntilQuiet(r.deadline(), 3*maxWaitTime)
		net := replayEventList(filterEventsForPaths(got, f))
		assertEventSet(t, net, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeCoalesceCreateThenDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f1 := subPath(dir)
		f2 := subPath(dir)
		if err := os.WriteFile(f1, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(f2, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.Remove(f2); err != nil {
			t.Fatal(err)
		}
		// Whether all three operations land in one debounce batch (perfect
		// coalescing → just [update f1]) or split across batches (we may
		// see [update f1] + [update f2] + [delete f2]) depends on kernel
		// timing. Either is correct as long as the *net effect*,
		// replaying the events through eventList, leaves only [update f1].
		// Quiet window must exceed the debouncer's maxWaitTime so a delayed
		// follow-up batch doesn't get cut off by the gatherUntilQuiet timer.
		// Use 3× maxWaitTime to leave headroom for -race overhead.
		got := r.gatherUntilQuiet(r.deadline(), 3*maxWaitTime)
		net := replayEventList(got)
		assertEventSet(t, net, []wantEvent{{EventUpdate, f1}})
	})
}

func TestSubscribeCoalesceMultipleUpdates(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true }) // consume initial update
		for _, v := range []string{"v2", "v3", "v4"} {
			if err := os.WriteFile(f, []byte(v), 0o644); err != nil {
				t.Fatal(err)
			}
		}
		got := r.gatherUntilQuiet(r.deadline(), 3*maxWaitTime)
		net := replayEventList(filterEventsForPaths(got, f))
		assertEventSet(t, net, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeCoalesceUpdateDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)
		f := subPath(dir)
		// Upstream's debouncer (by design) fires the first event in a quiet
		// window immediately. To exercise the coalescing path, we create
		// the file post-subscribe and consume that initial event so the
		// debouncer's lastTime is recent before the update+delete pair.
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true })
		if err := os.WriteFile(f, []byte("v2"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		got := r.gatherUntilQuiet(r.deadline(), 3*maxWaitTime)
		net := replayEventList(filterEventsForPaths(got, f))
		assertEventSet(t, net, []wantEvent{{EventDelete, f}})
	})
}

// ----- multiple subscriptions --------------------------------------------

func TestSubscribeMultipleSameDir(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		// Let fseventsd register the freshly-created tmpDir before we
		// subscribe; otherwise the dir's own creation can appear in the
		// initial event batch on macOS.
		time.Sleep(50 * time.Millisecond)

		r1 := newRecorder(t)
		s1, err := watcherImpl.WatchDirectory(dir, r1.callback)
		if err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() { _ = s1.Close() })

		r2 := newRecorder(t)
		s2, err := watcherImpl.WatchDirectory(dir, r2.callback)
		if err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() { _ = s2.Close() })

		time.Sleep(100 * time.Millisecond)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
			t.Fatal(err)
		}
		assertEventSequence(t, r1.next(r1.deadline()), []wantEvent{{EventUpdate, f}})
		assertEventSequence(t, r2.next(r2.deadline()), []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeMultipleDifferentDirs(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir1 := newTmpDir(t)
		dir2 := newTmpDir(t)

		r1, _ := subscribeFor(t, dir1, watcherImpl)
		r2, _ := subscribeFor(t, dir2, watcherImpl)

		f1 := subPath(dir1)
		f2 := subPath(dir2)
		if err := os.WriteFile(f1, []byte("a"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(f2, []byte("b"), 0o644); err != nil {
			t.Fatal(err)
		}
		assertEventSequence(t, r1.next(r1.deadline()), []wantEvent{{EventUpdate, f1}})
		assertEventSequence(t, r2.next(r2.deadline()), []wantEvent{{EventUpdate, f2}})
	})
}

// ----- errors ------------------------------------------------------------

func TestSubscribeMissingDirError(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		bogus := filepath.Join(newTmpDir(t), "definitely-not-here")
		_, err := watcherImpl.WatchDirectory(bogus, func([]Event, error) {})
		if err == nil {
			t.Fatal("expected error subscribing to non-existent dir")
		}
	})
}

func TestSubscribeNotADirError(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		_, err := watcherImpl.WatchDirectory(f, func([]Event, error) {})
		if err == nil {
			t.Fatal("expected error subscribing to a file")
		}
	})
}

func TestSubscribeRejectsNilCallback(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		if _, err := watcherImpl.WatchDirectory(t.TempDir(), nil); err == nil {
			t.Fatal("WatchDirectory(nil callback) should return an error")
		}
	})
}

func TestSubscribeRejectsRelativePath(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		_, err := watcherImpl.WatchDirectory("relative/path", func([]Event, error) {})
		if err == nil {
			t.Fatal("WatchDirectory with relative path should return an error")
		}
		_, err = watcherImpl.WatchFile("relative/path/file.txt", func([]Event, error) {})
		if err == nil {
			t.Fatal("WatchFile with relative path should return an error")
		}
	})
}

// ----- watch lifecycle --------------------------------------------

func TestSubscribeUnsubscribeIdempotent(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r := newRecorder(t)
		sub, err := watcherImpl.WatchDirectory(dir, r.callback)
		if err != nil {
			t.Fatal(err)
		}
		if err := sub.Close(); err != nil {
			t.Fatal(err)
		}
		if err := sub.Close(); err != nil {
			t.Fatalf("second Close should be a no-op, got %v", err)
		}
	})
}

// TestSubscribeCloseThenReSubscribe verifies that Close fully tears down
// any kernel-side resources before returning, so a follow-on subscribe
// on the same path immediately afterwards observes events from a fresh
// watch instead of getting stuck on a stale handle / fd / mark.
//
// Before Q7's fix on Windows, Close returned while the per-watch
// goroutine was still completing GetOverlappedResult and the directory
// handle remained open. A test (or a real program) racing to delete the
// watched dir or to install a different watcher could see flakes.
func TestSubscribeCloseThenReSubscribe(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)

		r1 := newRecorder(t)
		s1, err := watcherImpl.WatchDirectory(dir, r1.callback)
		if err != nil {
			t.Fatal(err)
		}
		if err = s1.Close(); err != nil {
			t.Fatal(err)
		}

		// Immediately re-watch the same directory and verify a fresh
		// event still flows. Use a separate recorder so we know the
		// event isn't a leftover from the first watch.
		r2 := newRecorder(t)
		s2, err := watcherImpl.WatchDirectory(dir, r2.callback)
		if err != nil {
			t.Fatalf("re-WatchDirectory after Close: %v", err)
		}
		t.Cleanup(func() { _ = s2.Close() })

		// Give the second watcher a moment to settle (fsevents/kqueue
		// need it; inotify/fanotify/Windows don't but the wait is cheap).
		if watcherImpl == FSEvents() || watcherImpl == Kqueue() {
			time.Sleep(300 * time.Millisecond)
		} else {
			time.Sleep(60 * time.Millisecond)
		}

		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r2, []wantEvent{{EventUpdate, f}})

		// The first recorder must not have seen the event meant for r2.
		stale := r1.drainQuiet(50 * time.Millisecond)
		if len(stale) != 0 {
			t.Fatalf("closed watch saw events: %v", toWantEvents(stale))
		}
	})
}

func TestSubscribeNoGoroutineLeak(t *testing.T) { //nolint:paralleltest // goroutine counting requires sequential execution
	// No t.Parallel(): goroutine counting requires sequential execution.
	for _, b := range availableWatchers { //nolint:paralleltest // goroutine counting requires sequential execution
		t.Run(b.Name(), func(t *testing.T) {
			dir := newTmpDir(t)
			// Warm up: trigger any lazy singleton init (backend,
			// debouncer) so it doesn't inflate the post-loop count.
			warmup, err := b.WatchDirectory(dir, func([]Event, error) {})
			if err != nil {
				t.Fatal(err)
			}
			if err := warmup.Close(); err != nil {
				t.Fatal(err)
			}
			runtime.GC()
			time.Sleep(100 * time.Millisecond)

			baseline := runtime.NumGoroutine()
			for range 8 {
				r := newRecorder(t)
				sub, err := b.WatchDirectory(dir, r.callback)
				if err != nil {
					t.Fatal(err)
				}
				if err := sub.Close(); err != nil {
					t.Fatal(err)
				}
			}
			// Allow lazy backend/debounce shutdown to settle.
			deadline := time.Now().Add(2 * time.Second)
			for time.Now().Before(deadline) {
				runtime.GC()
				if runtime.NumGoroutine() <= baseline+2 {
					return
				}
				time.Sleep(50 * time.Millisecond)
			}
			t.Fatalf("goroutine leak: baseline=%d now=%d", baseline, runtime.NumGoroutine())
		})
	}
}

// ----- additional coverage -----------------------------------------------

func TestSubscribeDeepNestedCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)

		// Create a/b/c one level at a time so the watcher can keep up.
		a := filepath.Join(dir, "a")
		b := filepath.Join(a, "b")
		c := filepath.Join(b, "c")
		for _, d := range []string{a, b, c} {
			if err := os.Mkdir(d, 0o755); err != nil {
				t.Fatal(err)
			}
			time.Sleep(150 * time.Millisecond)
		}
		f := filepath.Join(c, "deep.txt")
		if err := os.WriteFile(f, []byte("deep"), 0o644); err != nil {
			t.Fatal(err)
		}
		want := []wantEvent{{EventUpdate, a}, {EventUpdate, f}}
		got := r.waitForAll(r.deadline(), want)
		for _, w := range want {
			if !containsEvent(got, w.Kind, w.Path) {
				t.Fatalf("expected %s for %s, got %v", w.Kind, w.Path, toWantEvents(got))
			}
		}
	})
}

func TestSubscribeManyFilesAtOnce(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeFor(t, dir, watcherImpl)

		const count = 50
		paths := make([]string, count)
		for i := range count {
			paths[i] = subPath(dir)
			if err := os.WriteFile(paths[i], []byte("x"), 0o644); err != nil {
				t.Fatal(err)
			}
		}

		want := make([]wantEvent, count)
		for i, p := range paths {
			want[i] = wantEvent{EventUpdate, p}
		}
		// Some kqueue kernels coalesce dir-NOTE_WRITE events under
		// load and miss a few. Retry the missing files (a fresh write
		// provokes a new NOTE_WRITE on the parent) up to a couple of
		// times before declaring failure.
		got := r.waitForAll(r.deadline(), want)
		for attempt := 0; attempt < 3 && !haveAll(got, want); attempt++ {
			for _, p := range paths {
				if !containsEvent(got, EventUpdate, p) {
					_ = os.WriteFile(p, []byte("x"), 0o644)
				}
			}
			more := r.waitForAll(r.deadline(), want)
			got = append(got, more...)
		}
		for _, p := range paths {
			if !containsEvent(got, EventUpdate, p) {
				t.Fatalf("missing create for %s (got %d events total)", p, len(got))
			}
		}
	})
}

func TestSubscribeTruncateFile(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hello world"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		if err := os.Truncate(f, 0); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeConcurrentSubscribeUnsubscribe(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		done := make(chan struct{})
		for range 8 {
			go func() {
				defer func() { done <- struct{}{} }()
				rec := newRecorder(t)
				sub, err := watcherImpl.WatchDirectory(dir, rec.callback)
				if err != nil {
					return
				}
				_ = sub.Close()
			}()
		}
		for range 8 {
			<-done
		}
	})
}

func TestSubscribeRenameDir(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "before")
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		child := filepath.Join(sub, "file.txt")
		if err := os.WriteFile(child, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		after := filepath.Join(dir, "after")
		if err := os.Rename(sub, after); err != nil {
			t.Fatal(err)
		}
		want := []wantEvent{{EventUpdate, after}, {EventDelete, sub}}
		got := r.waitForAll(r.deadline(), want)
		for _, w := range want {
			if !containsEvent(got, w.Kind, w.Path) {
				t.Fatalf("expected %s for %s, got %v", w.Kind, w.Path, toWantEvents(got))
			}
		}
	})
}

func TestSubscribeReplaceFileWithDir(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		target := subPath(dir)
		if err := os.WriteFile(target, []byte("file"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		if err := os.Remove(target); err != nil {
			t.Fatal(err)
		}
		if err := os.Mkdir(target, 0o755); err != nil {
			t.Fatal(err)
		}
		// Should see at least one event for target (delete and/or update).
		got := r.waitForEvent(r.deadline(), func(e Event) bool {
			return e.Path == target
		})
		if !containsEvent(got, EventDelete, target) && !containsEvent(got, EventUpdate, target) {
			t.Fatalf("expected events for file-to-dir replacement, got %v", toWantEvents(got))
		}
	})
}

func TestSubscribeAppendToFile(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("initial"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		fh, err := os.OpenFile(f, os.O_APPEND|os.O_WRONLY, 0)
		if err != nil {
			t.Fatal(err)
		}
		_, _ = fh.WriteString(" appended")
		fh.Close()

		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestSubscribeNoEventsAfterUnsubscribe(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, sub := subscribeFor(t, dir, watcherImpl)
		if err := sub.Close(); err != nil {
			t.Fatal(err)
		}
		// Create a file after closeWatch; should produce nothing.
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		got := r.drainQuiet(500 * time.Millisecond)
		if len(got) != 0 {
			t.Fatalf("expected no events after closeWatch, got %v", toWantEvents(got))
		}
	})
}

// ----- watcherBase / dirWatchError internals -----------------------------

type failingBackend struct {
	watcherBase
	err error
}

func newFailingBackend(err error) *failingBackend {
	b := &failingBackend{err: err}
	b.watcherBase.init(b)
	return b
}

func (b *failingBackend) start() error { return b.err }

func (b *failingBackend) subscribe(*dirWatch) error {
	return nil
}

func (b *failingBackend) closeWatch(*dirWatch) error {
	return nil
}

func TestBackendRunReturnsStartError(t *testing.T) {
	t.Parallel()
	want := errors.New("startup failed")
	b := newFailingBackend(want)
	if err := b.run(); !errors.Is(err, want) {
		t.Fatalf("run() error = %v, want %v", err, want)
	}
}

func TestDirWatchErrorImplementsError(t *testing.T) {
	t.Parallel()
	var err error = &dirWatchError{err: errors.New("boom")}
	if err.Error() != "boom" {
		t.Fatalf("dirWatchError.Error want boom, got %q", err.Error())
	}
}

func TestFileCallbackForwardsErrAlongsideEvents(t *testing.T) {
	t.Parallel()
	target := "/abs/dir/target.txt"
	other := "/abs/dir/sibling.txt"
	overflow := errors.New("overflow")

	type call struct {
		events []Event
		err    error
	}
	var got []call
	cb := fileCallback(target, func(events []Event, err error) {
		got = append(got, call{events: events, err: err})
	})

	// Plain events: only target events pass through, sibling dropped.
	cb([]Event{{Kind: EventUpdate, Path: target}, {Kind: EventUpdate, Path: other}}, nil)
	if len(got) != 1 || len(got[0].events) != 1 || got[0].events[0].Path != target || got[0].err != nil {
		t.Fatalf("plain delivery: got %+v", got)
	}

	// Err only, no matching events: still forwarded with empty slice.
	got = nil
	cb([]Event{{Kind: EventUpdate, Path: other}}, overflow)
	if len(got) != 1 || len(got[0].events) != 0 || !errors.Is(got[0].err, overflow) {
		t.Fatalf("err-only delivery: got %+v", got)
	}

	// Err with matching events: deliver both the filtered events and err.
	got = nil
	cb([]Event{{Kind: EventDelete, Path: target}, {Kind: EventUpdate, Path: other}}, overflow)
	if len(got) != 1 || len(got[0].events) != 1 || got[0].events[0].Path != target ||
		got[0].events[0].Kind != EventDelete || !errors.Is(got[0].err, overflow) {
		t.Fatalf("combined delivery: got %+v", got)
	}

	// No events, no err: callback not invoked at all.
	got = nil
	cb(nil, nil)
	if len(got) != 0 {
		t.Fatalf("no-op delivery: got %+v", got)
	}
}

// TestRenameDirOutOfTreeNoStaleEvents pins the cross-backend contract:
// once a subdirectory is renamed out of the watched root, modifications
// to files at its new location must not surface against the old paths.
//
// This passes today on every backend even without B6's fanotify fix:
// the FAN_RENAME path (kernel >= 5.17) already handles descendant
// cleanup correctly, and inotify/kqueue/fsevents/Windows track watches
// at a level where the moved subtree drops out naturally. The harder
// case (forced FAN_MOVED_FROM fallback) is in
// TestFanotifyNoRenameFallback/RenameDirOutDropsDescendants.
func TestRenameDirOutOfTreeNoStaleEvents(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		watched := newTmpDir(t)
		outside := newTmpDir(t) // separate watch root, NOT watched.

		// Build a nested subtree under sub/. The descendant subdirs are
		// the ones that exercise the bug: with the broken fanotify
		// handleSubscription, sub itself got cleaned (exact-match) but
		// sub/inner stayed in b.subscriptions with a stale path. Later
		// modifications to files at the new location of sub/inner would
		// then surface against the old (now-invalid) path.
		sub := filepath.Join(watched, "sub")
		inner := filepath.Join(sub, "inner")
		if err := os.MkdirAll(inner, 0o755); err != nil {
			t.Fatal(err)
		}
		nested := filepath.Join(inner, "leaf.txt")
		if err := os.WriteFile(nested, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeForOpts(t, watched, watcherImpl, WithRecursive())

		// Rename the whole subtree out of the watched dir.
		dest := filepath.Join(outside, "moved")
		if err := os.Rename(sub, dest); err != nil {
			t.Fatal(err)
		}
		// Consume the rename-away events.
		_ = r.drainQuiet(500 * time.Millisecond)

		// Modify the file at its new location.
		movedNested := filepath.Join(dest, "inner", "leaf.txt")
		if err := os.WriteFile(movedNested, []byte("v2-longer"), 0o644); err != nil {
			t.Fatal(err)
		}

		extra := r.drainQuiet(800 * time.Millisecond)
		// Allow events for unrelated parts of the watched dir, but no
		// event whose path is at or under the moved subtree may appear.
		oldPrefix := sub + string(filepath.Separator)
		for _, e := range extra {
			if e.Path == sub || strings.HasPrefix(e.Path, oldPrefix) {
				t.Fatalf("stale event for moved-out path %s: %+v\nall extras: %v",
					e.Path, e, toWantEvents(extra))
			}
		}
	})
}

// ----- platform-specific -------------------------------------------------

func TestDefaultBackendMatchesPlatform(t *testing.T) {
	t.Parallel()
	d := Default()
	var wantName string
	switch runtime.GOOS {
	case "linux":
		if Fanotify().Available() {
			wantName = "fanotify"
		} else {
			wantName = "inotify"
		}
	case "darwin":
		wantName = "fsevents"
	case "windows":
		wantName = "windows"
	case "freebsd", "openbsd", "netbsd", "dragonfly":
		wantName = "kqueue"
	default:
		t.Skipf("no expected default watcher for %s", runtime.GOOS)
	}
	if !d.Available() {
		t.Fatalf("Default() should be available on %s", runtime.GOOS)
	}
	if d.Name() != wantName {
		t.Fatalf("Default().Name() = %q, want %q", d.Name(), wantName)
	}
}

func TestUnavailableBackendReturnsError(t *testing.T) {
	t.Parallel()
	// Pick a watcher that is definitely unavailable on the current OS.
	var unavailable Watcher
	for _, w := range AllWatchers() {
		if !w.Available() {
			unavailable = w
			break
		}
	}
	if unavailable == nil {
		t.Skip("all watchers are available on this platform")
	}
	dir := newTmpDir(t)
	_, err := unavailable.WatchDirectory(dir, func([]Event, error) {})
	if !errors.Is(err, ErrUnavailable) {
		t.Fatalf("expected ErrUnavailable from %s, got %v", unavailable.Name(), err)
	}
}

func TestSubscribeNestedDirDeletionCleansDescendants(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "parent")
		nested := filepath.Join(sub, "child")
		if err := os.MkdirAll(nested, 0o755); err != nil {
			t.Fatal(err)
		}
		childFile := filepath.Join(nested, "file.txt")
		if err := os.WriteFile(childFile, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeFor(t, dir, watcherImpl)

		if err := os.RemoveAll(sub); err != nil {
			t.Fatal(err)
		}

		expectContains(t, r, EventDelete, sub)
	})
}

// ----- non-recursive tests -----------------------------------------------

func TestNonRecursiveFileCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestNonRecursiveFileUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		f := subPath(dir)
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.waitForEvent(r.deadline(), func(Event) bool { return true }) // consume create
		if err := os.WriteFile(f, []byte("v2-longer"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestNonRecursiveFileDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := subPath(dir)
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f}})
	})
}

func TestNonRecursiveDirCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		expectContains(t, r, EventUpdate, sub)
	})
}

func TestNonRecursiveGrandchildIgnored(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "child")
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeForOpts(t, dir, watcherImpl)

		// Create a file inside the child directory (grandchild).
		grandchild := subPath(sub)
		if err := os.WriteFile(grandchild, []byte("deep"), 0o644); err != nil {
			t.Fatal(err)
		}

		marker := subPath(dir)
		if err := os.WriteFile(marker, []byte("flush"), 0o644); err != nil {
			t.Fatal(err)
		}

		// The marker proves the non-recursive watcher processed a later
		// direct-child batch. It still must not report the grandchild.
		got := expectContains(t, r, EventUpdate, marker)
		got = append(got, r.drainQuiet(2*maxWaitTime)...)
		assertNoEventsForPath(t, got, grandchild, "expected no events for grandchild")
	})
}

func TestNonRecursiveNewSubdirContentIgnored(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		// Create a new subdirectory.
		sub := subPath(dir)
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		// Wait for the dir create event.
		expectContains(t, r, EventUpdate, sub)

		// Write a file inside the new subdirectory.
		grandchild := subPath(sub)
		if err := os.WriteFile(grandchild, []byte("nested"), 0o644); err != nil {
			t.Fatal(err)
		}

		marker := subPath(dir)
		if err := os.WriteFile(marker, []byte("flush"), 0o644); err != nil {
			t.Fatal(err)
		}

		// Should NOT see the grandchild event.
		got := expectContains(t, r, EventUpdate, marker)
		got = append(got, r.drainQuiet(2*maxWaitTime)...)
		assertNoEventsForPath(t, got, grandchild, "expected no events for nested file")
	})
}

func TestNonRecursiveAndRecursiveSameDir(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "child")
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}

		rNonRec, _ := subscribeForOpts(t, dir, watcherImpl)
		rRec, _ := subscribeForOpts(t, dir, watcherImpl, WithRecursive())

		// Create a grandchild file.
		grandchild := subPath(sub)
		if err := os.WriteFile(grandchild, []byte("deep"), 0o644); err != nil {
			t.Fatal(err)
		}
		marker := subPath(dir)
		if err := os.WriteFile(marker, []byte("flush"), 0o644); err != nil {
			t.Fatal(err)
		}

		// Recursive should see the grandchild.
		expectContains(t, rRec, EventUpdate, grandchild)

		// Non-recursive should NOT see the grandchild.
		gotNonRec := expectContains(t, rNonRec, EventUpdate, marker)
		gotNonRec = append(gotNonRec, rNonRec.drainQuiet(2*maxWaitTime)...)
		assertNoEventsForPath(t, gotNonRec, grandchild, "non-recursive: expected no events for")
	})
}

func TestNonRecursiveWithDeniedSubdir(t *testing.T) {
	t.Parallel()
	if runtime.GOOS == "windows" {
		t.Skip("chmod is not meaningful on Windows")
	}
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)

		// Create a permission-denied subdirectory.
		denied := filepath.Join(dir, "denied")
		if err := os.Mkdir(denied, 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.Chmod(denied, 0); err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() { _ = os.Chmod(denied, 0o700) })

		// Non-recursive watch should succeed despite the inaccessible child.
		r, _ := subscribeForOpts(t, dir, watcherImpl)

		f := subPath(dir)
		if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

// ----- file watch tests --------------------------------------------------

func TestFileWatchCreate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := filepath.Join(dir, "target.txt")

		r, _ := subscribeFileFor(t, f, watcherImpl)

		if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestFileWatchUpdate(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := filepath.Join(dir, "target.txt")
		if err := os.WriteFile(f, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeFileFor(t, f, watcherImpl)

		if err := os.WriteFile(f, []byte("v2-longer"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

func TestFileWatchDelete(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := filepath.Join(dir, "target.txt")
		if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeFileFor(t, f, watcherImpl)

		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f}})
	})
}

func TestFileWatchIgnoresSiblings(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		target := filepath.Join(dir, "target.txt")
		sibling := filepath.Join(dir, "sibling.txt")

		r, _ := subscribeFileFor(t, target, watcherImpl)
		witness, _ := subscribeForOpts(t, dir, watcherImpl)

		// Write to sibling; should NOT see this.
		if err := os.WriteFile(sibling, []byte("noise"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectContains(t, witness, EventUpdate, sibling)
		expectNoBufferedEvents(t, r, "expected no events for sibling")
	})
}

// Not parallel: under load on macOS, this test (which subscribes
// twice to files in the same directory via WatchFile) intermittently
// stalls for the full FSEvents-timeout window. Running serially keeps
// the multi-WatchFile-share path predictable.
func TestFileWatchMultipleSameDir(t *testing.T) { //nolint:tparallel,paralleltest // see comment
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f1 := filepath.Join(dir, "a.txt")
		f2 := filepath.Join(dir, "b.txt")

		r1, _ := subscribeFileFor(t, f1, watcherImpl)
		r2, _ := subscribeFileFor(t, f2, watcherImpl)

		// Write to f1; only r1 should see it.
		if err := os.WriteFile(f1, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		got1 := r1.next(r1.deadline())
		assertEventSequence(t, got1, []wantEvent{{EventUpdate, f1}})

		expectNoBufferedEvents(t, r2, "r2 should not see f1 events")

		// Write to f2; only r2 should see it.
		if err := os.WriteFile(f2, []byte("world"), 0o644); err != nil {
			t.Fatal(err)
		}
		got2 := r2.next(r2.deadline())
		assertEventSequence(t, got2, []wantEvent{{EventUpdate, f2}})

		expectNoBufferedEvents(t, r1, "r1 should not see f2 events")
	})
}

// Not parallel: under load on macOS, this test (delete then recreate
// a file inside a WatchFile target) intermittently stalls for the full
// FSEvents-timeout window. Running serially eliminates the flake.
func TestFileWatchDeleteAndRecreate(t *testing.T) { //nolint:tparallel,paralleltest // see comment
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := filepath.Join(dir, "config.json")
		if err := os.WriteFile(f, []byte(`{"v":1}`), 0o644); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeFileFor(t, f, watcherImpl)

		// Delete the file.
		if err := os.Remove(f); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventDelete, f}})

		// Recreate it.
		if err := os.WriteFile(f, []byte(`{"v":2}`), 0o644); err != nil {
			t.Fatal(err)
		}
		expectContains(t, r, EventUpdate, f)
	})
}

func TestFileWatchNonExistentTarget(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		f := filepath.Join(dir, "doesnotexist.txt")

		// File doesn't exist; subscribe should still succeed
		// (watches the parent dir).
		r, _ := subscribeFileFor(t, f, watcherImpl)

		// Now create it.
		if err := os.WriteFile(f, []byte("appeared"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectEventSequence(t, r, []wantEvent{{EventUpdate, f}})
	})
}

// TestRecursiveMoveInPrePopulated verifies that moving a pre-populated
// directory tree into a recursive watch detects changes in nested subdirs.
func TestRecursiveMoveInPrePopulated(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		outside := newTmpDir(t)

		// Build a tree outside the watched directory.
		nested := filepath.Join(outside, "a", "b", "c")
		if err := os.MkdirAll(nested, 0o755); err != nil {
			t.Fatal(err)
		}

		r, _ := subscribeForOpts(t, dir, watcherImpl, WithRecursive())

		// Move the pre-populated tree into the watched directory.
		dest := filepath.Join(dir, "tree")
		if err := os.Rename(outside, dest); err != nil {
			t.Fatal(err)
		}
		// Consume the move-in events.
		_ = r.drainQuiet(500 * time.Millisecond)

		// Now modify a file deep inside the moved tree. There's a
		// race against the backend's recursive re-arm of the moved
		// subtree, so retry with fresh filenames until one surfaces
		// rather than betting on the first write being seen.
		nestedDir := filepath.Join(dest, "a", "b", "c")
		deadline := time.Now().Add(r.deadline())
		var allSeen []Event
		for attempt := 0; time.Now().Before(deadline); attempt++ {
			f := filepath.Join(nestedDir, fmt.Sprintf("deep-%d.txt", attempt))
			if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
				t.Fatal(err)
			}
			more := r.waitForEvent(750*time.Millisecond, func(e Event) bool {
				return e.Kind == EventUpdate && strings.HasPrefix(e.Path, nestedDir+string(filepath.Separator))
			})
			allSeen = append(allSeen, more...)
			for _, e := range more {
				if e.Kind == EventUpdate && strings.HasPrefix(e.Path, nestedDir+string(filepath.Separator)) {
					return
				}
			}
		}
		t.Fatalf("expected update for a file inside moved-in tree (gave up after %s), got %v",
			r.deadline(), toWantEvents(allSeen))
	})
}

// TestAtomicSave verifies that the "safe save" pattern (write tmp, rename
// over target) is detected as an update, not a delete+create or nothing.
func TestAtomicSave(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		target := filepath.Join(dir, "config.json")
		if err := os.WriteFile(target, []byte(`{"v":1}`), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		// Atomic save: write to temp, rename over target.
		tmp := target + ".tmp"
		if err := os.WriteFile(tmp, []byte(`{"v":2}`), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.Rename(tmp, target); err != nil {
			t.Fatal(err)
		}
		// Any event for target proves the atomic save was observed.
		got := r.waitForEvent(r.deadline(), func(e Event) bool {
			return e.Path == target
		})
		got = filterEventsForPaths(got, target)
		if len(got) == 0 {
			t.Fatalf("expected events for %s after atomic save, got none", target)
		}
	})
}

// TestAtomicSaveFileWatch verifies atomic save detection through WatchFile.
func TestAtomicSaveFileWatch(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		target := filepath.Join(dir, "target.txt")
		if err := os.WriteFile(target, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFileFor(t, target, watcherImpl)

		tmp := target + ".tmp"
		if err := os.WriteFile(tmp, []byte("v2"), 0o644); err != nil {
			t.Fatal(err)
		}
		if err := os.Rename(tmp, target); err != nil {
			t.Fatal(err)
		}
		got := r.waitForEvent(r.deadline(), func(e Event) bool {
			return e.Path == target
		})
		got = filterEventsForPaths(got, target)
		if len(got) == 0 {
			t.Fatalf("expected events for %s after atomic save, got none", target)
		}
	})
}

// TestReplaceDirWithFile verifies that replacing a directory with a file
// of the same name emits appropriate events.
func TestReplaceDirWithFile(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		child := filepath.Join(dir, "child")
		if err := os.Mkdir(child, 0o755); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		if err := os.Remove(child); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(child, []byte("now a file"), 0o644); err != nil {
			t.Fatal(err)
		}

		got := r.waitForEvent(r.deadline(), func(e Event) bool {
			return e.Path == child
		})
		got = filterEventsForPaths(got, child)
		if len(got) == 0 {
			t.Fatalf("expected events for dir->file replacement at %s, got none", child)
		}
	})
}

// TestRecreateSubdirAndModify verifies that after deleting and recreating
// a subdirectory, changes inside it are still detected.
func TestRecreateSubdirAndModify(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "sub")
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}
		inner := filepath.Join(sub, "file.txt")
		if err := os.WriteFile(inner, []byte("v1"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		// Delete the subdirectory tree.
		if err := os.RemoveAll(sub); err != nil {
			t.Fatal(err)
		}
		_ = r.drainQuiet(500 * time.Millisecond)

		// Recreate the same path.
		if err := os.Mkdir(sub, 0o755); err != nil {
			t.Fatal(err)
		}

		// Give the backend a chance to observe the FAN_CREATE /
		// IN_CREATE / compareDir on the parent and install its watch
		// on the new sub inode BEFORE we write inside it. Without
		// this beat the user's write can race the kernel's
		// enqueue-on-marked-inode and the event is never delivered.
		// The poll loop below then has nothing to wait for.
		time.Sleep(150 * time.Millisecond)

		// Keep nudging with a fresh file until one surfaces. Each
		// iteration uses a new filename so a missed event on attempt
		// N doesn't trap us waiting for it on attempt N+1. Short
		// per-attempt deadline + long total deadline = many retry
		// cycles, which is what kqueue needs when the kernel is slow
		// to deliver NOTE_WRITE on a freshly-watched sub inode.
		deadline := time.Now().Add(r.deadline() * 2)
		var allSeen []Event
		for attempt := 0; time.Now().Before(deadline); attempt++ {
			f := filepath.Join(sub, fmt.Sprintf("attempt-%d.txt", attempt))
			if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
				t.Fatal(err)
			}
			more := r.waitForEvent(750*time.Millisecond, func(e Event) bool {
				return e.Kind == EventUpdate && strings.HasPrefix(e.Path, sub+string(filepath.Separator))
			})
			allSeen = append(allSeen, more...)
			for _, e := range more {
				if e.Kind == EventUpdate && strings.HasPrefix(e.Path, sub+string(filepath.Separator)) {
					return
				}
			}
		}
		t.Fatalf("expected update for a file inside recreated sub (gave up after %s), got %v",
			r.deadline()*2, toWantEvents(allSeen))
	})
}

// TestReplaceParentDirWithDifferent verifies that replacing a subtree with
// a different pre-populated directory of the same name still detects
// changes inside the new tree.
func TestReplaceParentDirWithDifferent(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		sub := filepath.Join(dir, "pkg")
		if err := os.MkdirAll(filepath.Join(sub, "old"), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(filepath.Join(sub, "old", "a.txt"), []byte("a"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		// Replace: remove old tree, create new tree at same path.
		if err := os.RemoveAll(sub); err != nil {
			t.Fatal(err)
		}
		if err := os.MkdirAll(filepath.Join(sub, "new"), 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.WriteFile(filepath.Join(sub, "new", "b.txt"), []byte("b"), 0o644); err != nil {
			t.Fatal(err)
		}
		_ = r.drainQuiet(500 * time.Millisecond)

		// Now modify something inside the replaced tree. The same
		// "watch may not yet be armed on the replaced subtree" race
		// applies as TestRecreateSubdirAndModify; retry with fresh
		// filenames.
		newDir := filepath.Join(sub, "new")
		deadline := time.Now().Add(r.deadline())
		var allSeen []Event
		for attempt := 0; time.Now().Before(deadline); attempt++ {
			f := filepath.Join(newDir, fmt.Sprintf("attempt-%d.txt", attempt))
			if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
				t.Fatal(err)
			}
			more := r.waitForEvent(750*time.Millisecond, func(e Event) bool {
				return e.Kind == EventUpdate && strings.HasPrefix(e.Path, newDir+string(filepath.Separator))
			})
			allSeen = append(allSeen, more...)
			for _, e := range more {
				if e.Kind == EventUpdate && strings.HasPrefix(e.Path, newDir+string(filepath.Separator)) {
					return
				}
			}
		}
		t.Fatalf("expected update for a file inside replaced tree (gave up after %s), got %v",
			r.deadline(), toWantEvents(allSeen))
	})
}

// TestRoundTripRename renames a file away and back within a short window.
// The net result is that the file is unchanged, but we should see at least
// some events (coalescing may merge them).
func TestRoundTripRename(t *testing.T) {
	t.Parallel()
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		if watcherImpl == Kqueue() {
			t.Skip("kqueue fd-based tracking delivers stale delete before parent NOTE_WRITE reconciles")
		}
		dir := newTmpDir(t)
		orig := filepath.Join(dir, "data.txt")
		if err := os.WriteFile(orig, []byte("content"), 0o644); err != nil {
			t.Fatal(err)
		}
		r, _ := subscribeFor(t, dir, watcherImpl)

		tmp := filepath.Join(dir, "data.txt.bak")
		if err := os.Rename(orig, tmp); err != nil {
			t.Fatal(err)
		}
		if err := os.Rename(tmp, orig); err != nil {
			t.Fatal(err)
		}
		// Either some events or zero events (coalesced to no-op) are
		// both acceptable. On fd-based backends (kqueue), a transient
		// delete may appear if the debounce window fires between the
		// rename-away and rename-back; as long as a subsequent update
		// follows, the watcher correctly recovered. Use gatherUntilQuiet
		// here because we genuinely need to see "everything that arrives"
		// (the test asserts what coalesced, not a specific positive event).
		got := r.gatherUntilQuiet(r.deadline(), 500*time.Millisecond)
		got = filterEventsForPaths(got, orig)
		hasDelete := containsEvent(got, EventDelete, orig)
		hasUpdate := containsEvent(got, EventUpdate, orig)
		if hasDelete && !hasUpdate {
			t.Fatalf("round-trip rename left a stale delete without recovery for %s; events: %v", orig, toWantEvents(got))
		}
	})
}

// TestRecursiveWithDeniedSubdir verifies that a recursive watch succeeds
// even when a child directory is unreadable.
func TestRecursiveWithDeniedSubdir(t *testing.T) {
	t.Parallel()
	if runtime.GOOS == "windows" {
		t.Skip("chmod is not meaningful on Windows")
	}
	runForEachWatcher(t, func(t testingT, watcherImpl Watcher) {
		dir := newTmpDir(t)
		accessible := filepath.Join(dir, "ok")
		if err := os.Mkdir(accessible, 0o755); err != nil {
			t.Fatal(err)
		}
		denied := filepath.Join(dir, "denied")
		if err := os.Mkdir(denied, 0o755); err != nil {
			t.Fatal(err)
		}
		if err := os.Chmod(denied, 0); err != nil {
			t.Fatal(err)
		}
		t.Cleanup(func() { _ = os.Chmod(denied, 0o700) })

		// Recursive watch should succeed despite the inaccessible child.
		r, _ := subscribeFor(t, dir, watcherImpl)

		// Events in the accessible sibling should still work.
		f := filepath.Join(accessible, "test.txt")
		if err := os.WriteFile(f, []byte("hello"), 0o644); err != nil {
			t.Fatal(err)
		}
		expectContains(t, r, EventUpdate, f)
	})
}
