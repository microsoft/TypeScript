//go:build linux

package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"

	"golang.org/x/sys/unix"
)

// fanotifyNoRenameWatcher exposes a fanotify backend that skips the
// FAN_RENAME probe and forces the FAN_MOVED_FROM/FAN_MOVED_TO fallback
// path. It runs under runForEachWatcher (via additionalTestWatchers)
// so the broad test matrix exercises both kernel paths on systems where
// FAN_RENAME would otherwise be selected automatically.
var fanotifyNoRenameWatcher = &watcher{name: "fanotify-no-rename"}

func init() {
	if fanotifyAvailable() {
		fanotifyNoRenameWatcher.factory = func() watcherImpl { return newFanotifyBackend(true) }
		additionalTestWatchers = append(additionalTestWatchers, fanotifyNoRenameWatcher)
	}
}

func TestLinuxFanotifyShutdownBeforeStart(t *testing.T) {
	t.Parallel()
	newFanotifyBackend(false).shutdown()
}

func TestLinuxFanotifyBackendSelection(t *testing.T) {
	t.Parallel()
	if !fanotifyAvailable() {
		t.Skip("fanotify not available")
	}
	impl, err := fanotifyWatcher.getImpl()
	if err != nil {
		t.Fatal(err)
	}
	if _, ok := impl.(*fanotifyBackend); !ok {
		t.Fatalf("fanotify watcher = %T, want *fanotifyBackend", impl)
	}
}

func TestLinuxFanotifySubscribeCleansUpAfterMarkFailure(t *testing.T) {
	t.Parallel()
	dir := newTmpDir(t)
	w := newDirectWatcher(t, dir)
	b := newFanotifyBackend(false)

	err := b.subscribe(w)
	var werr *dirWatchError
	if !errors.As(err, &werr) {
		t.Fatalf("subscribe error = %v, want *dirWatchError", err)
	}
	if werr.dirWatch != w {
		t.Fatalf("dirWatchError dirWatch = %p, want %p", werr.dirWatch, w)
	}
	if len(b.subscriptions) != 0 {
		t.Fatalf("subscriptions not cleaned up: %d remaining", len(b.subscriptions))
	}
}

func TestLinuxFanotifyParseDfidNameRoundTrip(t *testing.T) {
	t.Parallel()
	dir := newTmpDir(t)
	handle, _, err := unix.NameToHandleAt(unix.AT_FDCWD, dir, 0)
	if err != nil {
		t.Skipf("NameToHandleAt not supported: %v", err)
	}
	var st unix.Statfs_t
	if err = unix.Statfs(dir, &st); err != nil {
		t.Fatal(err)
	}
	key := makeFanotifyHandleKey(st.Fsid.Val, handle.Type(), handle.Bytes())
	if key.handle == "" {
		t.Fatal("empty handle bytes")
	}
	handle2, _, err := unix.NameToHandleAt(unix.AT_FDCWD, dir, 0)
	if err != nil {
		t.Fatal(err)
	}
	key2 := makeFanotifyHandleKey(st.Fsid.Val, handle2.Type(), handle2.Bytes())
	if key != key2 {
		t.Fatalf("handle keys differ for same path:\n  1: %+v\n  2: %+v", key, key2)
	}
}

func TestFanotifyCrossWatcherSameFs(t *testing.T) {
	t.Parallel()
	if !fanotifyAvailable() {
		t.Skip("fanotify not available")
	}

	t.Run("Modify", func(t *testing.T) {
		t.Parallel()
		dirA, dirB := newTmpDir(t), newTmpDir(t)
		pathA := filepath.Join(dirA, "child")
		pathB := filepath.Join(dirB, "child")
		for _, p := range []string{pathA, pathB} {
			if err := os.WriteFile(p, []byte("initial"), 0o644); err != nil {
				t.Fatal(err)
			}
		}
		rA, _ := subscribeFor(t, dirA, Fanotify())
		rB, _ := subscribeFor(t, dirB, Fanotify())

		if err := os.WriteFile(pathA, []byte("changed"), 0o644); err != nil {
			t.Fatal(err)
		}
		gotA := rA.gather(rA.deadline(), 200*time.Millisecond)
		assertEventSet(t, gotA, []wantEvent{{EventUpdate, pathA}})

		if gotB := rB.drainQuiet(200 * time.Millisecond); len(gotB) != 0 {
			t.Fatalf("watcher B got phantom events: %v", toWantEvents(gotB))
		}
	})
}
