//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"testing"
	"time"
)

func newTestFSEventsWatcher(impl **fsEventsBackend) Watcher {
	return &watcher{
		name:     "fsevents",
		sequence: fsEventsGetCurrentEventID,
		factory: func() watcherImpl {
			*impl = newFSEventsBackend()
			return *impl
		},
	}
}

func TestFSEventsSharedStreamAcrossWatches(t *testing.T) {
	t.Parallel()

	var impl *fsEventsBackend
	watcherImpl := newTestFSEventsWatcher(&impl)
	root := newTmpDir(t)

	var subs []Watch
	for i := range 5 {
		dir := filepath.Join(root, fmt.Sprintf("dir%d", i))
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatal(err)
		}
		sub, err := watcherImpl.WatchDirectory(dir, func([]Event, error) {})
		if err != nil {
			t.Fatal(err)
		}
		subs = append(subs, sub)
	}
	t.Cleanup(func() {
		for _, sub := range subs {
			_ = sub.Close()
		}
	})

	impl.mu.Lock()
	streamCount := len(impl.streams)
	watchCount := len(impl.watches)
	impl.mu.Unlock()
	if streamCount != 1 {
		t.Fatalf("expected one shared FSEvents stream, got %d", streamCount)
	}
	if watchCount != len(subs) {
		t.Fatalf("expected %d logical watches, got %d", len(subs), watchCount)
	}
}

func TestFSEventsSharedStreamRoutesEvents(t *testing.T) {
	t.Parallel()

	var impl *fsEventsBackend
	watcherImpl := newTestFSEventsWatcher(&impl)
	root := newTmpDir(t)
	dirA := filepath.Join(root, "a")
	dirB := filepath.Join(root, "b")
	if err := os.MkdirAll(dirA, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(dirB, 0o755); err != nil {
		t.Fatal(err)
	}

	time.Sleep(preSubscribeSleep(watcherImpl))
	recA := newRecorder(t)
	recA.watcher = watcherImpl
	subA, err := watcherImpl.WatchDirectory(dirA, recA.callback)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = subA.Close() })

	recB := newRecorder(t)
	recB.watcher = watcherImpl
	subB, err := watcherImpl.WatchDirectory(dirB, recB.callback)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = subB.Close() })
	time.Sleep(settleSleep(watcherImpl))

	fileA := filepath.Join(dirA, "file.ts")
	if err := os.WriteFile(fileA, []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}
	expectContains(t, recA, EventUpdate, fileA)
	assertNoEventsForPath(t, recB.drainQuiet(500*time.Millisecond), fileA, "sibling watch saw event")

	fileB := filepath.Join(dirB, "file.ts")
	if err := os.WriteFile(fileB, []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}
	expectContains(t, recB, EventUpdate, fileB)
	assertNoEventsForPath(t, recA.drainQuiet(500*time.Millisecond), fileB, "sibling watch saw event")
}

func setupFSEventsConsolidatedParent(t *testing.T) (Watcher, string) {
	t.Helper()

	var impl *fsEventsBackend
	watcherImpl := newTestFSEventsWatcher(&impl)
	parent := filepath.Join(newTmpDir(t), "parent")

	var subs []Watch
	for i := range recursiveConsolidateThreshold {
		dir := filepath.Join(parent, fmt.Sprintf("pkg%d", i))
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatal(err)
		}
		sub, err := watcherImpl.WatchDirectory(dir, func([]Event, error) {})
		if err != nil {
			t.Fatal(err)
		}
		subs = append(subs, sub)
	}
	t.Cleanup(func() {
		for _, sub := range subs {
			_ = sub.Close()
		}
	})

	return watcherImpl, parent
}

func TestFSEventsConsolidatedWatchValidatesLogicalRoot(t *testing.T) {
	t.Parallel()

	watcherImpl, parent := setupFSEventsConsolidatedParent(t)

	if sub, err := watcherImpl.WatchDirectory(filepath.Join(parent, "missing"), func([]Event, error) {}); err == nil {
		_ = sub.Close()
		t.Fatal("expected error subscribing to missing consolidated child")
	}

	file := filepath.Join(parent, "file")
	if err := os.WriteFile(file, []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	if sub, err := watcherImpl.WatchDirectory(file, func([]Event, error) {}); err == nil {
		_ = sub.Close()
		t.Fatal("expected error subscribing to file consolidated child")
	}
}

func TestFSEventsConsolidatedWatchTerminatesLogicalRoot(t *testing.T) {
	t.Parallel()

	watcherImpl, parent := setupFSEventsConsolidatedParent(t)

	watched := filepath.Join(parent, "watched")
	if err := os.MkdirAll(watched, 0o755); err != nil {
		t.Fatal(err)
	}
	r := newRecorder(t)
	r.watcher = watcherImpl
	sub, err := watcherImpl.WatchDirectory(watched, r.callback, WithRecursive())
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = sub.Close() })
	time.Sleep(settleSleep(watcherImpl))

	if err := os.RemoveAll(watched); err != nil {
		t.Fatal(err)
	}
	expectEventSequence(t, r, []wantEvent{{EventDelete, watched}})

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
	if !slices.ContainsFunc(errs, func(err error) bool { return errors.Is(err, ErrWatchTerminated) }) {
		t.Fatalf("expected ErrWatchTerminated after watched dir delete, got errs=%v", errs)
	}
}

func TestFSEventsSharedStreamFallsBackToChunks(t *testing.T) {
	t.Parallel()

	const count = fseventsPathsPerStream*2 + 1
	watches := make([]fseventsWatchSnapshot, 0, count)
	for i := range count {
		watches = append(watches, fseventsWatchSnapshot{
			w:     &dirWatch{physicalDir: fmt.Sprintf("/watch/dir%04d", i)},
			state: &fseventsState{},
		})
	}

	var calls []int
	var watchCalls []int
	streams, err := startFSEventsStreams(watches, func(paths []string, streamWatches []fseventsWatchSnapshot) (*fseventsStream, error) {
		calls = append(calls, len(paths))
		watchCalls = append(watchCalls, len(streamWatches))
		if len(calls) == 1 {
			return nil, errStreamStartFailed
		}
		return &fseventsStream{}, nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if len(streams) != 3 {
		t.Fatalf("expected 3 chunked streams, got %d", len(streams))
	}
	wantCalls := []int{count, fseventsPathsPerStream, fseventsPathsPerStream, 1}
	if !slices.Equal(calls, wantCalls) {
		t.Fatalf("startStream calls = %v, want %v", calls, wantCalls)
	}
	if !slices.Equal(watchCalls, wantCalls) {
		t.Fatalf("startStream watch calls = %v, want %v", watchCalls, wantCalls)
	}
}

func TestWatchesForFSEventsPaths(t *testing.T) {
	t.Parallel()

	watchA := &dirWatch{physicalDir: "/watch/a"}
	watchB := &dirWatch{physicalDir: "/watch/b"}
	watchC := &dirWatch{physicalDir: "/watch/c"}
	watches := []fseventsWatchSnapshot{
		{w: watchA, state: &fseventsState{}},
		{w: watchB, state: &fseventsState{}},
		{w: watchC, state: &fseventsState{}},
	}

	got := watchesForFSEventsPaths(watches, []string{"/watch/a", "/watch/c"})
	gotPaths := make([]string, 0, len(got))
	for _, watch := range got {
		gotPaths = append(gotPaths, watch.w.physicalDir)
	}
	slices.Sort(gotPaths)

	want := []string{"/watch/a", "/watch/c"}
	if !slices.Equal(gotPaths, want) {
		t.Fatalf("watchesForFSEventsPaths = %v, want %v", gotPaths, want)
	}
}

func TestFSEventsOverflowMatchesWatch(t *testing.T) {
	t.Parallel()

	w := &dirWatch{
		dir:         "/logical/root",
		physicalDir: "/physical/root",
	}
	cases := []struct {
		name    string
		rawPath string
		want    bool
	}{
		{name: "physical root", rawPath: "/physical/root", want: true},
		{name: "physical descendant", rawPath: "/physical/root/sub", want: true},
		{name: "physical ancestor", rawPath: "/physical", want: true},
		{name: "logical root", rawPath: "/logical/root", want: true},
		{name: "logical descendant", rawPath: "/logical/root/sub", want: true},
		{name: "logical ancestor", rawPath: "/logical", want: true},
		{name: "unrelated", rawPath: "/other/root", want: false},
		{name: "sibling prefix", rawPath: "/physical/root2", want: false},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			t.Parallel()
			if got := fseventsOverflowMatches(w, c.rawPath); got != c.want {
				t.Fatalf("fseventsOverflowMatches(%q) = %v, want %v", c.rawPath, got, c.want)
			}
		})
	}
}
