package lspwatcher

import (
	"errors"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/fswatch"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
)

func waitFor(t *testing.T, cond func() bool, msg string) {
	t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if cond() {
			return
		}
		time.Sleep(20 * time.Millisecond)
	}
	t.Fatalf("timed out waiting for %s", msg)
}

func TestWatcher_CreateChangeDelete(t *testing.T) {
	t.Parallel()
	dir := t.TempDir()

	var (
		mu      sync.Mutex
		batches [][]*lsproto.FileEvent
	)
	w := New(bundled.WrapFS(osvfs.FS()), func(changes []*lsproto.FileEvent) {
		mu.Lock()
		defer mu.Unlock()
		batches = append(batches, changes)
	}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	pattern := tspath.NormalizeSlashes(dir) + "/**/*"
	kind := lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete
	if err := w.WatchFiles("test", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
		Kind:        &kind,
	}}); err != nil {
		t.Fatal(err)
	}

	time.Sleep(200 * time.Millisecond)

	file := filepath.Join(dir, "a.ts")
	if err := os.WriteFile(file, []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}

	collected := func() []*lsproto.FileEvent {
		mu.Lock()
		defer mu.Unlock()
		var all []*lsproto.FileEvent
		for _, b := range batches {
			all = append(all, b...)
		}
		return all
	}

	waitFor(t, func() bool {
		for _, e := range collected() {
			if e.Type == lsproto.FileChangeTypeChanged {
				return true
			}
		}
		return false
	}, "update event")

	if err := os.Remove(file); err != nil {
		t.Fatal(err)
	}
	waitFor(t, func() bool {
		for _, e := range collected() {
			if e.Type == lsproto.FileChangeTypeDeleted {
				return true
			}
		}
		return false
	}, "delete event")

	if err := w.UnwatchFiles("test"); err != nil {
		t.Fatal(err)
	}
}

func TestWatcher_KindFilter(t *testing.T) {
	t.Parallel()
	dir := t.TempDir()
	dirNorm := tspath.NormalizeSlashes(dir)

	var (
		mu  sync.Mutex
		got []*lsproto.FileEvent
	)
	backend := newFakeBackend()
	w := newWithBackend(bundled.WrapFS(osvfs.FS()), backend, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		defer mu.Unlock()
		got = append(got, changes...)
	}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	pattern := dirNorm + "/**/*"
	kind := lsproto.WatchKindDelete
	if err := w.WatchFiles("test", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
		Kind:        &kind,
	}}); err != nil {
		t.Fatal(err)
	}
	backend.emitAll([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: filepath.FromSlash(filepath.Join(dirNorm, "x.ts"))},
		{Kind: fswatch.EventDelete, Path: filepath.FromSlash(filepath.Join(dirNorm, "x.ts"))},
	}, nil)

	waitFor(t, func() bool {
		mu.Lock()
		defer mu.Unlock()
		for _, e := range got {
			if e.Type == lsproto.FileChangeTypeDeleted {
				return true
			}
		}
		return false
	}, "delete event")

	mu.Lock()
	for _, e := range got {
		if e.Type != lsproto.FileChangeTypeDeleted {
			t.Errorf("unexpected non-delete event: %+v", e)
		}
	}
	mu.Unlock()
}

func TestRootFromGlob(t *testing.T) {
	t.Parallel()
	cases := []struct {
		pattern string
		want    string
	}{
		{"/abs/path/**/*", "/abs/path"},
		{"/abs/path/", "/abs/path"},
		{"/abs/path/?.ts", "/abs/path"},
		{"/abs/path/{a,b}/*", "/abs/path"},
	}
	for _, c := range cases {
		if got := rootFromGlob(c.pattern); got != c.want {
			t.Errorf("rootFromGlob(%q) = %q, want %q", c.pattern, got, c.want)
		}
	}
}

type fakeBackend struct {
	mu       sync.Mutex
	byDir    map[string]fswatch.WatchCallback
	closed   map[string]int
	optCount map[string]int
	failDirs map[string]error
}

func newFakeBackend() *fakeBackend {
	return &fakeBackend{
		byDir:    make(map[string]fswatch.WatchCallback),
		closed:   make(map[string]int),
		optCount: make(map[string]int),
		failDirs: make(map[string]error),
	}
}

func (f *fakeBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, opts ...fswatch.WatchOption) (io.Closer, error) {
	f.mu.Lock()
	defer f.mu.Unlock()
	if err := f.failDirs[dir]; err != nil {
		return nil, err
	}
	f.byDir[dir] = fn
	f.optCount[dir] = len(opts)
	return fakeWatch{closeFn: func() error {
		f.mu.Lock()
		defer f.mu.Unlock()
		delete(f.byDir, dir)
		f.closed[dir]++
		return nil
	}}, nil
}

// watchedDirs returns the directories currently subscribed, for assertions.
func (f *fakeBackend) watchedDirs() []string {
	f.mu.Lock()
	defer f.mu.Unlock()
	dirs := make([]string, 0, len(f.byDir))
	for d := range f.byDir {
		dirs = append(dirs, d)
	}
	return dirs
}

func (f *fakeBackend) isWatching(dir string) bool {
	f.mu.Lock()
	defer f.mu.Unlock()
	_, ok := f.byDir[dir]
	return ok
}

func (f *fakeBackend) emit(dir string, events []fswatch.Event, err error) {
	f.mu.Lock()
	cb := f.byDir[dir]
	f.mu.Unlock()
	if cb != nil {
		cb(events, err)
	}
}

func (f *fakeBackend) emitAll(events []fswatch.Event, err error) {
	f.mu.Lock()
	cbs := make([]fswatch.WatchCallback, 0, len(f.byDir))
	for _, cb := range f.byDir {
		cbs = append(cbs, cb)
	}
	f.mu.Unlock()
	for _, cb := range cbs {
		cb(events, err)
	}
}

type fakeWatch struct{ closeFn func() error }

func (w fakeWatch) Close() error { return w.closeFn() }

func TestWatcher_BookkeepingAndOverflow(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	dirNorm := tspath.NormalizeSlashes(dir)
	pattern := dirNorm + "/**/*"

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	var (
		mu  sync.Mutex
		got []*lsproto.FileEvent
	)
	w := newWithBackend(fs, backend, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		defer mu.Unlock()
		got = append(got, changes...)
	}, logging.NewLogger(os.Stderr))

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatal(err)
	}
	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err == nil {
		t.Fatal("expected duplicate-id error")
	}

	backend.emitAll([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: filepath.FromSlash(filepath.Join(dirNorm, "a.ts"))},
	}, fswatch.ErrOverflow)
	waitFor(t, func() bool {
		mu.Lock()
		defer mu.Unlock()
		return len(got) > 0
	}, "events after overflow")

	if err := w.UnwatchFiles("missing"); err == nil {
		t.Fatal("expected unknown-id error")
	}
	if err := w.UnwatchFiles("id"); err != nil {
		t.Fatal(err)
	}
	if err := w.WatchFiles("id2", nil); err != nil {
		t.Fatal(err)
	}
	w.Close()
	if err := w.WatchFiles("id3", nil); err == nil {
		t.Fatal("expected closed error")
	}
}

func TestWatcher_NonRecursiveGlobIsNotRecursive(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	dirNorm := tspath.NormalizeSlashes(dir)
	if err := os.MkdirAll(filepath.Join(dir, "sub"), 0o755); err != nil {
		t.Fatal(err)
	}
	subNorm := tspath.NormalizeSlashes(filepath.Join(dir, "sub"))

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	w := newWithBackend(fs, backend, func([]*lsproto.FileEvent) {}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	recursive := dirNorm + "/**/*"
	nonRecursive := subNorm + "/*"
	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{
		{GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &recursive}},
		{GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &nonRecursive}},
	}); err != nil {
		t.Fatal(err)
	}

	realDir := tspath.NormalizeSlashes(fs.Realpath(dirNorm))
	realSub := tspath.NormalizeSlashes(fs.Realpath(subNorm))

	backend.mu.Lock()
	defer backend.mu.Unlock()
	if got := backend.optCount[realDir]; got != 1 {
		t.Errorf("recursive glob %q: expected 1 watch option (WithRecursive), got %d", recursive, got)
	}
	if got := backend.optCount[realSub]; got != 0 {
		t.Errorf("non-recursive glob %q: expected 0 watch options, got %d", nonRecursive, got)
	}
}

func TestWatcher_RealBackend_MissingThenCreate(t *testing.T) {
	t.Parallel()
	base := t.TempDir()
	fs := bundled.WrapFS(osvfs.FS())

	var (
		mu      sync.Mutex
		batches [][]*lsproto.FileEvent
	)
	w := New(fs, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		defer mu.Unlock()
		batches = append(batches, changes)
	}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	// Watch a directory that does not exist yet.
	target := tspath.NormalizeSlashes(filepath.Join(base, "pkg"))
	pattern := target + "/*"
	kind := lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete
	if err := w.WatchFiles("test", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
		Kind:        &kind,
	}}); err != nil {
		t.Fatal(err)
	}

	// Give the ancestor watch time to install.
	time.Sleep(200 * time.Millisecond)

	// Create the target directory and a file inside it. The real backend's
	// ancestor watch should fire, promote to the target, and
	// the file should ultimately surface.
	if err := os.MkdirAll(filepath.Join(base, "pkg"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(base, "pkg", "index.ts"), []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}

	collected := func() []*lsproto.FileEvent {
		mu.Lock()
		defer mu.Unlock()
		var all []*lsproto.FileEvent
		for _, b := range batches {
			all = append(all, b...)
		}
		return all
	}

	waitFor(t, func() bool {
		for _, e := range collected() {
			if strings.HasSuffix(string(e.Uri), "/pkg/index.ts") {
				return true
			}
		}
		return false
	}, "event for file created in a previously-missing directory")
}

func TestWatcher_MissingDirectoryTracksAncestor(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	w := newWithBackend(fs, backend, func([]*lsproto.FileEvent) {}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	base := t.TempDir()
	baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
	target := tspath.NormalizeSlashes(filepath.Join(base, "pkg"))
	pattern := target + "/*"

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatal(err)
	}

	// A missing target directory installs an ancestor watch on the nearest
	// existing ancestor (the base dir), not on the target.
	if !backend.isWatching(baseReal) {
		t.Fatalf("expected ancestor watch on ancestor %q, watched: %v", baseReal, backend.watchedDirs())
	}
	if dirs := backend.watchedDirs(); len(dirs) != 1 {
		t.Fatalf("expected exactly one (ancestor) watch, got %v", dirs)
	}

	if err := w.UnwatchFiles("id"); err != nil {
		t.Fatal(err)
	}
	if dirs := backend.watchedDirs(); len(dirs) != 0 {
		t.Fatalf("expected all watches closed after unwatch, got %v", dirs)
	}
}

func TestWatcher_MissingDirectoryPromotesOnCreate(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	var (
		mu  sync.Mutex
		got []*lsproto.FileEvent
	)
	w := newWithBackend(fs, backend, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		got = append(got, changes...)
		mu.Unlock()
	}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	base := t.TempDir()
	baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
	target := tspath.NormalizeSlashes(filepath.Join(base, "pkg"))
	pattern := target + "/*"
	kind := lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
		Kind:        &kind,
	}}); err != nil {
		t.Fatal(err)
	}

	// Create the target directory with a file, then notify the ancestor watch.
	if err := os.MkdirAll(filepath.Join(base, "pkg"), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(base, "pkg", "index.ts"), []byte("export {}"), 0o644); err != nil {
		t.Fatal(err)
	}
	backend.emit(baseReal, []fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "pkg")},
	}, nil)

	targetReal := tspath.NormalizeSlashes(fs.Realpath(target))
	waitFor(t, func() bool { return backend.isWatching(targetReal) }, "promotion to target watch")

	// Synthetic creates must cover the target dir and its immediate child so
	// the session re-resolves files created before the watch was installed.
	waitFor(t, func() bool {
		mu.Lock()
		defer mu.Unlock()
		var sawDir, sawChild bool
		for _, e := range got {
			if e.Type != lsproto.FileChangeTypeCreated {
				continue
			}
			s := string(e.Uri)
			if strings.HasSuffix(s, "/pkg") {
				sawDir = true
			}
			if strings.HasSuffix(s, "/pkg/index.ts") {
				sawChild = true
			}
		}
		return sawDir && sawChild
	}, "synthetic create events for target and child")
}

func TestWatcher_MultiLevelDescend(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	w := newWithBackend(fs, backend, func([]*lsproto.FileEvent) {}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	base := t.TempDir()
	baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
	target := tspath.NormalizeSlashes(filepath.Join(base, "a", "b", "c"))
	pattern := target + "/*"

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatal(err)
	}
	if !backend.isWatching(baseReal) {
		t.Fatalf("expected initial ancestor watch on %q, got %v", baseReal, backend.watchedDirs())
	}

	// Reveal one path component at a time; the ancestor watch should descend.
	mkdirAndRealpath := func(rel string) string {
		p := filepath.Join(base, rel)
		if err := os.MkdirAll(p, 0o755); err != nil {
			t.Fatal(err)
		}
		return tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(p)))
	}

	aReal := mkdirAndRealpath("a")
	backend.emit(baseReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "a")}}, nil)
	waitFor(t, func() bool { return backend.isWatching(aReal) }, "descend to a")

	abReal := mkdirAndRealpath(filepath.Join("a", "b"))
	backend.emit(aReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "a", "b")}}, nil)
	waitFor(t, func() bool { return backend.isWatching(abReal) }, "descend to a/b")

	abcReal := mkdirAndRealpath(filepath.Join("a", "b", "c"))
	backend.emit(abReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "a", "b", "c")}}, nil)
	waitFor(t, func() bool { return backend.isWatching(abcReal) }, "promote to target a/b/c")
}

func TestWatcher_AtomicTreeCreateRace(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	w := newWithBackend(fs, backend, func([]*lsproto.FileEvent) {}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	base := t.TempDir()
	baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
	target := tspath.NormalizeSlashes(filepath.Join(base, "a", "b", "c"))
	pattern := target + "/*"

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatal(err)
	}

	// The whole tree appears at once (e.g. an extraction/symlink). A single
	// notification on the base ancestor watch must descend all the way and
	// promote to the target in one reconcile pass.
	if err := os.MkdirAll(filepath.Join(base, "a", "b", "c"), 0o755); err != nil {
		t.Fatal(err)
	}
	backend.emit(baseReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "a")}}, nil)

	targetReal := tspath.NormalizeSlashes(fs.Realpath(target))
	waitFor(t, func() bool { return backend.isWatching(targetReal) }, "promote to target in one pass")
}

func TestWatcher_SyntheticCreateDepth(t *testing.T) {
	t.Parallel()

	for _, recursive := range []bool{false, true} {
		t.Run(map[bool]string{false: "non-recursive", true: "recursive"}[recursive], func(t *testing.T) {
			t.Parallel()
			fs := bundled.WrapFS(osvfs.FS())
			backend := newFakeBackend()
			var (
				mu  sync.Mutex
				got []*lsproto.FileEvent
			)
			w := newWithBackend(fs, backend, func(changes []*lsproto.FileEvent) {
				mu.Lock()
				got = append(got, changes...)
				mu.Unlock()
			}, logging.NewLogger(os.Stderr))
			t.Cleanup(w.Close)

			base := t.TempDir()
			baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
			target := tspath.NormalizeSlashes(filepath.Join(base, "pkg"))
			kind := lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete
			var pattern string
			if recursive {
				pattern = target + "/**/*"
			} else {
				pattern = target + "/*"
			}

			if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
				GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
				Kind:        &kind,
			}}); err != nil {
				t.Fatal(err)
			}

			// Materialize the target with a nested file under a subdirectory.
			if err := os.MkdirAll(filepath.Join(base, "pkg", "sub"), 0o755); err != nil {
				t.Fatal(err)
			}
			if err := os.WriteFile(filepath.Join(base, "pkg", "top.ts"), []byte("export {}"), 0o644); err != nil {
				t.Fatal(err)
			}
			if err := os.WriteFile(filepath.Join(base, "pkg", "sub", "deep.ts"), []byte("export {}"), 0o644); err != nil {
				t.Fatal(err)
			}
			backend.emit(baseReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "pkg")}}, nil)

			targetReal := tspath.NormalizeSlashes(fs.Realpath(target))
			waitFor(t, func() bool { return backend.isWatching(targetReal) }, "promotion")

			created := func() map[string]bool {
				mu.Lock()
				defer mu.Unlock()
				m := map[string]bool{}
				for _, e := range got {
					if e.Type == lsproto.FileChangeTypeCreated {
						m[string(e.Uri)] = true
					}
				}
				return m
			}

			// Both modes must synthesize the immediate child.
			waitFor(t, func() bool {
				for s := range created() {
					if strings.HasSuffix(s, "/pkg/top.ts") {
						return true
					}
				}
				return false
			}, "synthetic create for immediate child")

			// Only the recursive watch should synthesize the deep descendant.
			deadline := time.Now().Add(1 * time.Second)
			sawDeep := func() bool {
				for s := range created() {
					if strings.HasSuffix(s, "/pkg/sub/deep.ts") {
						return true
					}
				}
				return false
			}
			if recursive {
				for time.Now().Before(deadline) && !sawDeep() {
					time.Sleep(20 * time.Millisecond)
				}
				if !sawDeep() {
					t.Errorf("recursive watch should synthesize deep descendant; got %v", created())
				}
			} else {
				time.Sleep(300 * time.Millisecond) // allow any erroneous deep event to arrive
				if sawDeep() {
					t.Errorf("non-recursive watch must not synthesize deep descendant; got %v", created())
				}
			}
		})
	}
}

func TestWatcher_TerminatedFallsBackAndRecovers(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	var (
		mu  sync.Mutex
		got []*lsproto.FileEvent
	)
	w := newWithBackend(fs, backend, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		got = append(got, changes...)
		mu.Unlock()
	}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	base := t.TempDir()
	baseReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(base)))
	target := tspath.NormalizeSlashes(filepath.Join(base, "pkg"))
	if err := os.MkdirAll(filepath.Join(base, "pkg"), 0o755); err != nil {
		t.Fatal(err)
	}
	targetReal := tspath.NormalizeSlashes(fs.Realpath(target))
	pattern := target + "/*"
	kind := lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
		Kind:        &kind,
	}}); err != nil {
		t.Fatal(err)
	}
	if !backend.isWatching(targetReal) {
		t.Fatalf("expected target watch on %q, got %v", targetReal, backend.watchedDirs())
	}

	// Delete the directory and deliver ErrWatchTerminated together with the
	// directory's own delete event (as the real backends do).
	if err := os.RemoveAll(filepath.Join(base, "pkg")); err != nil {
		t.Fatal(err)
	}
	backend.emit(targetReal, []fswatch.Event{
		{Kind: fswatch.EventDelete, Path: filepath.Join(base, "pkg")},
	}, errors.Join(fswatch.ErrWatchTerminated, errors.New("removed")))

	// The delete must be forwarded, and the watch must fall back to watching
	// the ancestor.
	waitFor(t, func() bool {
		mu.Lock()
		defer mu.Unlock()
		for _, e := range got {
			if e.Type == lsproto.FileChangeTypeDeleted && strings.HasSuffix(string(e.Uri), "/pkg") {
				return true
			}
		}
		return false
	}, "forwarded delete of terminated dir")
	waitFor(t, func() bool { return backend.isWatching(baseReal) && !backend.isWatching(targetReal) }, "fallback to ancestor watch")

	// Recreate the directory; the ancestor watch must promote back to target.
	if err := os.MkdirAll(filepath.Join(base, "pkg"), 0o755); err != nil {
		t.Fatal(err)
	}
	recreatedReal := tspath.NormalizeSlashes(fs.Realpath(target))
	backend.emit(baseReal, []fswatch.Event{{Kind: fswatch.EventUpdate, Path: filepath.Join(base, "pkg")}}, nil)
	waitFor(t, func() bool { return backend.isWatching(recreatedReal) }, "recovery to target watch after recreation")
}

func TestWatcher_GenuineFailureRollsBackForRetry(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	w := newWithBackend(fs, backend, func([]*lsproto.FileEvent) {}, logging.NewLogger(os.Stderr))
	t.Cleanup(w.Close)

	dir := t.TempDir()
	dirReal := tspath.NormalizeSlashes(fs.Realpath(tspath.NormalizeSlashes(dir)))
	pattern := tspath.NormalizeSlashes(dir) + "/*"

	// Inject a genuine backend failure for the existing directory.
	backend.mu.Lock()
	backend.failDirs[dirReal] = errors.New("too many open files")
	backend.mu.Unlock()

	err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}})
	if err == nil {
		t.Fatal("expected error from genuine backend failure")
	}

	// The id must have been rolled back so a retry can re-register cleanly
	// (rather than hitting the duplicate-id error). Clear the injected failure
	// to simulate the resource pressure easing on retry.
	backend.mu.Lock()
	delete(backend.failDirs, dirReal)
	backend.mu.Unlock()

	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatalf("retry after rollback should succeed, got %v", err)
	}
	if !backend.isWatching(dirReal) {
		t.Fatalf("expected watch on %q after successful retry, got %v", dirReal, backend.watchedDirs())
	}
}

func TestWatcher_WatchTerminatedDoesNotDropEvents(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	dirNorm := tspath.NormalizeSlashes(dir)
	fs := bundled.WrapFS(osvfs.FS())
	backend := newFakeBackend()
	var got []*lsproto.FileEvent
	var mu sync.Mutex
	w := newWithBackend(fs, backend, func(changes []*lsproto.FileEvent) {
		mu.Lock()
		got = append(got, changes...)
		mu.Unlock()
	}, logging.NewLogger(os.Stderr))

	pattern := dirNorm + "/**/*"
	if err := w.WatchFiles("id", []*lsproto.FileSystemWatcher{{
		GlobPattern: lsproto.PatternOrRelativePattern{Pattern: &pattern},
	}}); err != nil {
		t.Fatal(err)
	}

	backend.emitAll([]fswatch.Event{
		{Kind: fswatch.EventUpdate, Path: filepath.FromSlash(filepath.Join(dirNorm, "b.ts"))},
	}, errors.Join(fswatch.ErrWatchTerminated, errors.New("simulated")))

	waitFor(t, func() bool {
		mu.Lock()
		defer mu.Unlock()
		return len(got) > 0
	}, "events with watch-terminated error")
}
