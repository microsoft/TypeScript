package fswatch

import (
	"errors"
	"fmt"
	"sort"
	"strings"
	"sync"
	"testing"
)

type fakeFallbackWatch struct {
	watcher *fakeFallbackWatcher
	dir     string
}

func (w *fakeFallbackWatch) Close() error {
	w.watcher.mu.Lock()
	defer w.watcher.mu.Unlock()
	w.watcher.closed = append(w.watcher.closed, w.dir)
	return nil
}

func (w *fakeFallbackWatch) unexported() {}

type fakeFallbackWatcher struct {
	mu       sync.Mutex
	name     string
	failWith error
	failDir  func(string) bool
	watched  []string
	closed   []string
}

func (w *fakeFallbackWatcher) Name() string                  { return w.name }
func (w *fakeFallbackWatcher) Available() bool               { return true }
func (w *fakeFallbackWatcher) HasFastRecursiveBackend() bool { return false }

func (w *fakeFallbackWatcher) shouldFail(dir string) bool {
	return w.failWith != nil && (w.failDir == nil || w.failDir(dir))
}

func (w *fakeFallbackWatcher) WatchDirectory(dir string, _ WatchCallback, _ ...WatchOption) (Watch, error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	if w.shouldFail(dir) {
		return nil, fmt.Errorf("%s: %w", w.name, w.failWith)
	}
	w.watched = append(w.watched, dir)
	return &fakeFallbackWatch{watcher: w, dir: dir}, nil
}

func (w *fakeFallbackWatcher) WatchDirectories(requests []WatchDirectoryRequest) ([]Watch, error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	for _, request := range requests {
		if w.shouldFail(request.Dir) {
			return nil, fmt.Errorf("%s: %w", w.name, w.failWith)
		}
	}
	watches := make([]Watch, len(requests))
	for i, request := range requests {
		w.watched = append(w.watched, request.Dir)
		watches[i] = &fakeFallbackWatch{watcher: w, dir: request.Dir}
	}
	return watches, nil
}

func (w *fakeFallbackWatcher) WatchFile(path string, fn WatchCallback) (Watch, error) {
	return w.WatchDirectory(path, fn)
}

func (w *fakeFallbackWatcher) unexported() {}

func (w *fakeFallbackWatcher) watchedDirs() []string {
	w.mu.Lock()
	defer w.mu.Unlock()
	dirs := append([]string(nil), w.watched...)
	sort.Strings(dirs)
	return dirs
}

func (w *fakeFallbackWatcher) closedDirs() []string {
	w.mu.Lock()
	defer w.mu.Unlock()
	dirs := append([]string(nil), w.closed...)
	sort.Strings(dirs)
	return dirs
}

func TestFallbackWatcherRoutesUnsupportedDirectories(t *testing.T) {
	t.Parallel()

	primary := &fakeFallbackWatcher{
		name:     "fanotify",
		failWith: ErrFilesystemUnsupported,
		failDir:  func(dir string) bool { return strings.HasPrefix(dir, "/mnt/fuse") },
	}
	secondary := &fakeFallbackWatcher{name: "inotify"}
	watcher := &fallbackWatcher{primary: primary, secondary: secondary}

	requests := []WatchDirectoryRequest{
		{Dir: "/project", Callback: func([]Event, error) {}},
		{Dir: "/project/src", Callback: func([]Event, error) {}},
		{Dir: "/mnt/fuse/deps", Callback: func([]Event, error) {}},
		{Dir: "/mnt/fuse/deps/a", Callback: func([]Event, error) {}},
	}
	watches, err := watcher.WatchDirectories(requests)
	if err != nil {
		t.Fatalf("WatchDirectories: %v", err)
	}
	t.Cleanup(func() {
		for _, watch := range watches {
			_ = watch.Close()
		}
	})

	if got, want := primary.watchedDirs(), []string{"/project", "/project/src"}; !equalStringSlices(got, want) {
		t.Errorf("primary watched %v, want %v", got, want)
	}
	if got, want := secondary.watchedDirs(), []string{"/mnt/fuse/deps", "/mnt/fuse/deps/a"}; !equalStringSlices(got, want) {
		t.Errorf("secondary watched %v, want %v", got, want)
	}
}

func TestFallbackWatcherDoesNotFallbackForUnrelatedError(t *testing.T) {
	t.Parallel()

	primary := &fakeFallbackWatcher{name: "fanotify", failWith: ErrUnavailable}
	secondary := &fakeFallbackWatcher{name: "inotify"}
	watcher := &fallbackWatcher{primary: primary, secondary: secondary}

	_, err := watcher.WatchDirectory("/project", func([]Event, error) {})
	if !errors.Is(err, ErrUnavailable) {
		t.Fatalf("WatchDirectory error = %v, want ErrUnavailable", err)
	}
	if got := secondary.watchedDirs(); len(got) != 0 {
		t.Errorf("secondary watched %v, want no watches", got)
	}
}

func TestFallbackWatcherDoesNotUseSecondaryOnHappyPath(t *testing.T) {
	t.Parallel()

	primary := &fakeFallbackWatcher{name: "fanotify"}
	secondary := &fakeFallbackWatcher{name: "inotify", failWith: errors.New("secondary should not be used")}
	watcher := &fallbackWatcher{primary: primary, secondary: secondary}

	watches, err := watcher.WatchDirectories([]WatchDirectoryRequest{
		{Dir: "/project", Callback: func([]Event, error) {}},
		{Dir: "/project/src", Callback: func([]Event, error) {}},
	})
	if err != nil {
		t.Fatalf("WatchDirectories: %v", err)
	}
	t.Cleanup(func() {
		for _, watch := range watches {
			_ = watch.Close()
		}
	})
	if got := secondary.watchedDirs(); len(got) != 0 {
		t.Errorf("secondary watched %v, want no watches", got)
	}
}

func TestFallbackWatcherRollsBackRoutedWatchesOnFailure(t *testing.T) {
	t.Parallel()

	primary := &fakeFallbackWatcher{
		name:     "fanotify",
		failWith: ErrFilesystemUnsupported,
		failDir:  func(dir string) bool { return dir != "/project" },
	}
	secondary := &fakeFallbackWatcher{
		name:     "inotify",
		failWith: ErrUnavailable,
		failDir:  func(dir string) bool { return dir == "/broken" },
	}
	watcher := &fallbackWatcher{primary: primary, secondary: secondary}

	_, err := watcher.WatchDirectories([]WatchDirectoryRequest{
		{Dir: "/project", Callback: func([]Event, error) {}},
		{Dir: "/mnt/fuse", Callback: func([]Event, error) {}},
		{Dir: "/broken", Callback: func([]Event, error) {}},
	})
	if !errors.Is(err, ErrUnavailable) {
		t.Fatalf("WatchDirectories error = %v, want ErrUnavailable", err)
	}
	if got, want := primary.closedDirs(), []string{"/project"}; !equalStringSlices(got, want) {
		t.Errorf("primary closed %v, want %v", got, want)
	}
	if got, want := secondary.closedDirs(), []string{"/mnt/fuse"}; !equalStringSlices(got, want) {
		t.Errorf("secondary closed %v, want %v", got, want)
	}
}

func TestFanotifyUsesInternalInotifyFallback(t *testing.T) {
	t.Parallel()

	fallback, ok := Fanotify().(*fallbackWatcher)
	if !ok {
		t.Fatalf("Fanotify() = %T, want *fallbackWatcher", Fanotify())
	}
	if fallback.primary != fanotifyWatcher {
		t.Errorf("Fanotify primary = %T, want package fanotify watcher", fallback.primary)
	}
	if fallback.secondary != inotifyWatcher {
		t.Errorf("Fanotify secondary = %T, want package inotify watcher", fallback.secondary)
	}
}

func equalStringSlices(a, b []string) bool {
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
