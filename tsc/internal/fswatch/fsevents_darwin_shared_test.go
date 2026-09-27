//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"slices"
	"strconv"
	"strings"
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

func TestFSEventsCaseSensitiveRouting(t *testing.T) {
	t.Parallel()
	for _, ignoreCase := range []bool{false, true} {
		w := &dirWatch{
			dir:         "/logical/root",
			physicalDir: "/physical/root",
			comparer:    pathComparer{ignoreCase: ignoreCase},
		}
		for _, root := range []string{"/PHYSICAL/ROOT", "/LOGICAL/ROOT"} {
			for _, suffix := range []string{"", "/File.ts", "/Nested/File.ts"} {
				path, ok := fseventsDisplayPath(w, root+suffix)
				if ok != ignoreCase || ok && path != w.dir+suffix {
					t.Errorf("display path for %q, ignoreCase=%v: got (%q, %v)", root+suffix, ignoreCase, path, ok)
				}
			}
			if fseventsOverflowMatches(w, root+"/Nested") != ignoreCase {
				t.Errorf("overflow descendant %q, ignoreCase=%v", root, ignoreCase)
			}
			if fseventsOverflowMatches(w, filepath.Dir(root)) != ignoreCase {
				t.Errorf("overflow ancestor %q, ignoreCase=%v", root, ignoreCase)
			}
			if _, ok := fseventsDisplayPath(w, root+"2/File.ts"); ok {
				t.Errorf("matched sibling of %q, ignoreCase=%v", root, ignoreCase)
			}
			if fseventsOverflowMatches(w, root+"2") {
				t.Errorf("overflow matched sibling of %q, ignoreCase=%v", root, ignoreCase)
			}
		}
	}
}

func TestFSEventsConsolidatedDifferentCasing(t *testing.T) {
	t.Parallel()
	for _, recursive := range []bool{false, true} {
		dw := newDirectWatcher(t, "/parent")
		dw.comparer = pathComparer{ignoreCase: true}
		child := "/parent/child"
		var got []Event
		var gotErr error
		dw.watch(child, child, recursive, func(events []Event, err error) {
			got = append(got, events...)
			gotErr = err
		}, func(path string) bool {
			return path == child+"/Ignored.ts"
		})
		dw.events.update("/parent/CHILD/File.ts")
		dw.events.update("/parent/CHILD/Ignored.ts")
		dw.events.update("/parent/CHILD2/File.ts")
		dw.events.update("/parent/CHILD/Nested/File.ts")
		dw.triggerCallbacks()
		wantCount := 1
		if recursive {
			wantCount++
		}
		if len(got) != wantCount || gotErr != nil {
			t.Fatalf("recursive=%v: got events=%v, err=%v", recursive, got, gotErr)
		}
		for _, e := range got {
			if e.Path != child+"/File.ts" && e.Path != child+"/Nested/File.ts" {
				t.Fatalf("unexpected path %q", e.Path)
			}
		}
		got = nil
		if !dw.terminateCallbacksForDeletedRoot("/parent/CHILD", 1, ErrWatchTerminated) {
			t.Fatal("expected differently cased child root to terminate")
		}
		dw.events.removeWatchRootAt("/parent/CHILD", 1)
		dw.triggerCallbacks()
		if !errors.Is(gotErr, ErrWatchTerminated) || len(got) != 1 || got[0].Kind != EventDelete || got[0].Path != child {
			t.Fatalf("expected child deletion and termination: got events=%v, err=%v", got, gotErr)
		}
	}
}

func TestFSEventsConsolidatedExpansion(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		for _, reverse := range []bool{false, true} {
			a, b := pair.a, pair.b
			if reverse {
				a, b = b, a
			}
			for _, recursive := range []bool{false, true} {
				dw := newDirectWatcher(t, "/parent")
				dw.setComparer(pathComparer{ignoreCase: true})
				child, raw := "/parent/"+canonicalizePath(a), "/parent/"+canonicalizePath(b)
				var got []Event
				var gotErr error
				dw.watch(child, child, recursive, func(events []Event, err error) {
					got = append(got, events...)
					gotErr = err
				}, func(path string) bool { return path == child+"/Ignored.ts" })
				dw.events.update(raw + "/File.ts")
				dw.events.update(raw + "/Nested/File.ts")
				dw.events.update(raw + "/Ignored.ts")
				dw.events.update(raw + "2/File.ts")
				dw.triggerCallbacks()
				want := 0
				if pair.alias {
					want = 1
					if recursive {
						want++
					}
				}
				if len(got) != want || gotErr != nil {
					t.Fatalf("%s reverse=%v recursive=%v: got %v, %v", pair.name, reverse, recursive, got, gotErr)
				}
				for _, e := range got {
					if e.Path != child+"/File.ts" && e.Path != child+"/Nested/File.ts" {
						t.Fatalf("incorrect rebasing: %v", e)
					}
				}
				got = nil
				if dw.terminateCallbacksForDeletedRoot(raw, 1, ErrWatchTerminated) != pair.alias {
					t.Fatalf("%s: incorrect termination", pair.name)
				}
				dw.events.removeWatchRootAt(raw, 1)
				dw.triggerCallbacks()
				if pair.alias && (len(got) != 1 || got[0].Path != child || got[0].Kind != EventDelete || !errors.Is(gotErr, ErrWatchTerminated)) {
					t.Fatalf("%s: missing deletion/termination: %v, %v", pair.name, got, gotErr)
				}
				if !pair.alias && (len(got) != 0 || gotErr != nil) {
					t.Fatalf("%s: cross-routed deletion/termination: %v, %v", pair.name, got, gotErr)
				}
			}
		}
	}
}

func TestFSEventsExpansionRouting(t *testing.T) {
	t.Parallel()
	for _, pair := range fseventsFoldPairs {
		for _, reverse := range []bool{false, true} {
			a, b := pair.a, pair.b
			if reverse {
				a, b = b, a
			}
			for padding := range 16 {
				root := "/physical/" + strings.Repeat("x", padding) + canonicalizePath(a)
				raw := "/PHYSICAL/" + strings.Repeat("x", padding) + canonicalizePath(b)
				for _, ignoreCase := range []bool{false, true} {
					w := &dirWatch{dir: "/logical/Caller", physicalDir: root, comparer: pathComparer{ignoreCase: ignoreCase}}
					w.setComparer(w.comparer)
					want := ignoreCase && pair.alias
					for _, suffix := range []string{"", "/File\u00df.ts", "/Nested/File.ts"} {
						got, ok := fseventsDisplayPath(w, raw+suffix)
						if ok != want || ok && got != w.dir+suffix {
							t.Fatalf("%s reverse=%v padding=%d ignoreCase=%v: got (%q, %v)", pair.name, reverse, padding, ignoreCase, got, ok)
						}
					}
					if fseventsOverflowMatches(w, raw+"/Nested") != want || fseventsOverflowMatches(w, raw) != want {
						t.Fatalf("%s: incorrect overflow routing", pair.name)
					}
					if _, ok := fseventsDisplayPath(w, raw+"2/File.ts"); ok {
						t.Fatalf("%s: matched sibling", pair.name)
					}
					w.physicalDir += "/Nested"
					w.setComparer(w.comparer)
					if fseventsOverflowMatches(w, raw) != want {
						t.Fatalf("%s: incorrect ancestor overflow routing", pair.name)
					}
				}
			}
		}
	}
}

func TestFSEventsLazyPathFolding(t *testing.T) {
	t.Parallel()
	for _, tt := range []struct {
		root, event string
		match, fold bool
	}{
		{"/root", "/root/File\u00df.ts", true, false},
		{"/root", "/other/\u00df/File.ts", false, false},
		{"/ROOT", "/root/File.ts", true, false},
		{"/SS", "/\u00df/File.ts", true, true},
		{"/\u00df", "/SS/File.ts", true, true},
	} {
		w := &dirWatch{dir: tt.root, physicalDir: tt.root}
		w.setComparer(pathComparer{ignoreCase: true})
		event := comparisonPath{path: tt.event}
		for range 10 {
			if _, ok := fseventsDisplayPathPrepared(w, &event); ok != tt.match || event.ready != tt.fold {
				t.Fatalf("root=%q event=%q: match=%v, folded=%v", tt.root, tt.event, ok, event.ready)
			}
		}
	}
	var cache comparisonCache
	for _, root := range []string{"/SS", "/ss"} {
		cb := callback{
			dir: root, physicalDir: root, comparer: pathComparer{ignoreCase: true},
			physicalComparison: pathComparer{ignoreCase: true}.prepare(root),
		}
		e := cb.mapEventCached(Event{Path: "/\u00df/File.ts", Kind: EventUpdate}, &cache)
		if e.Path != root+"/File.ts" {
			t.Fatalf("cached callback: %v", e)
		}
	}
	if len(cache) != 1 || cache["/\u00df/File.ts"] != "/ss/file.ts" {
		t.Fatalf("expected one shared event comparison, got %v", cache)
	}
}

func BenchmarkFSEventsDisplayPath(b *testing.B) {
	const root = "/Users/developer/work/TypeScript/packages/vscode-typescript"
	for _, scenario := range []struct {
		name string
		root string
		path string
		want string
		ok   bool
	}{
		{"exact-match", root, root + "/src/File.ts", root + "/src/File.ts", true},
		{"case-mismatch", strings.ToLower(root), root + "/src/File.ts", strings.ToLower(root) + "/src/File.ts", true},
		{"sibling-miss", root, "/Users/developer/work/TypeScript/packages/other-package/src/File.ts", "", false},
		{"unrelated-miss", root, "/private/tmp/other/File.ts", "", false},
		{"unicode-match", "/Users/developer/work/caf\u00e9", "/Users/developer/work/CAF\u00c9/File.ts", "/Users/developer/work/caf\u00e9/File.ts", true},
		{"unicode-length-match", "/Users/developer/work/s", "/Users/developer/work/\u017f/File.ts", "/Users/developer/work/s/File.ts", true},
		{"expanding-event", "/Users/developer/work/SS", "/Users/developer/work/\u00df/File.ts", "/Users/developer/work/SS/File.ts", true},
		{"expanding-root", "/Users/developer/work/\u00df", "/Users/developer/work/SS/File.ts", "/Users/developer/work/\u00df/File.ts", true},
		{"unicode-unrelated-miss", root, "/private/tmp/\u00df/File.ts", "", false},
	} {
		b.Run(scenario.name, func(b *testing.B) {
			w := &dirWatch{dir: scenario.root, physicalDir: scenario.root, comparer: pathComparer{ignoreCase: true}}
			w.setComparer(w.comparer)
			if got, ok := fseventsDisplayPath(w, scenario.path); got != scenario.want || ok != scenario.ok {
				b.Fatalf("got (%q, %v), want (%q, %v)", got, ok, scenario.want, scenario.ok)
			}
			b.ReportAllocs()
			for b.Loop() {
				fseventsDisplayPath(w, scenario.path)
			}
		})
	}
}

func BenchmarkFSEventsRoutingFanout(b *testing.B) {
	for _, count := range []int{100, 1000} {
		watches := make([]dirWatch, count)
		for i := range watches {
			dir := fmt.Sprintf("/Users/developer/work/TypeScript/packages/package%04d", i)
			watches[i] = dirWatch{dir: dir, physicalDir: dir, comparer: pathComparer{ignoreCase: true}}
			watches[i].setComparer(watches[i].comparer)
		}
		path := watches[count-1].dir + "/src/File.ts"
		b.Run(strconv.Itoa(count), func(b *testing.B) {
			matches := 0
			for i := range watches {
				if got, ok := fseventsDisplayPath(&watches[i], path); ok {
					matches++
					if got != path {
						b.Fatalf("got %q, want %q", got, path)
					}
				}
			}
			if matches != 1 {
				b.Fatalf("got %d matches, want 1", matches)
			}
			b.ReportAllocs()
			for b.Loop() {
				event := comparisonPath{path: path}
				for i := range watches {
					fseventsDisplayPathPrepared(&watches[i], &event)
				}

			}
		})
	}
}

func BenchmarkFSEventsUnicodeFanout(b *testing.B) {
	for _, scenario := range []struct{ name, root, event string }{
		{"simple", "S", "\u017f"},
		{"expanding-event", "SS", "\u00df"},
		{"expanding-root", "\u00df", "SS"},
	} {
		for _, count := range []int{100, 1000} {
			b.Run(scenario.name+"/"+strconv.Itoa(count), func(b *testing.B) {
				watches := make([]dirWatch, count)
				for i := range watches {
					dir := fmt.Sprintf("/Users/developer/work/%s/package%04d", scenario.root, i)
					watches[i] = dirWatch{dir: dir, physicalDir: dir}
					watches[i].setComparer(pathComparer{ignoreCase: true})
				}
				path := fmt.Sprintf("/Users/developer/work/%s/package%04d/File.ts", scenario.event, count-1)
				matches := 0
				event := comparisonPath{path: path}
				for i := range watches {
					if got, ok := fseventsDisplayPathPrepared(&watches[i], &event); ok {
						matches++
						if got != watches[i].dir+"/File.ts" {
							b.Fatalf("unexpected display path %q", got)
						}
					}
				}
				if matches != 1 || !event.ready {
					b.Fatalf("matches=%d, event folded=%v", matches, event.ready)
				}
				b.ReportAllocs()
				for b.Loop() {
					event := comparisonPath{path: path}
					for i := range watches {
						fseventsDisplayPathPrepared(&watches[i], &event)
					}
				}
			})
		}
	}
}
