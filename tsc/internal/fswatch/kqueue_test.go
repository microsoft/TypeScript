//go:build darwin || freebsd || openbsd || netbsd || dragonfly

package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"

	"golang.org/x/sys/unix"
)

func newTestKqueueWatcher(t *testing.T) (Watcher, *kqueueBackend) {
	t.Helper()
	impl := newKqueueBackend()
	t.Cleanup(impl.shutdown)
	return &watcher{name: "kqueue", factory: func() watcherImpl { return impl }}, impl
}

func openKqueueTestFile(t *testing.T, path string) *os.File {
	t.Helper()
	file, err := os.OpenFile(path, os.O_CREATE|os.O_RDWR, 0o600)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = file.Close() })
	return file
}

// Find the descriptor opened by a subscription using its inode, not backend
// bookkeeping. The caller keeps a file open below the subscription's fds.
func kqueueTestDescriptor(t *testing.T, path string, lower int) int {
	t.Helper()
	upper, err := os.Open(os.DevNull)
	if err != nil {
		t.Fatal(err)
	}
	defer upper.Close()
	var want unix.Stat_t
	if err := unix.Stat(path, &want); err != nil {
		t.Fatal(err)
	}
	found := -1
	for fd := lower + 1; fd < int(upper.Fd()); fd++ {
		var st unix.Stat_t
		if unix.Fstat(fd, &st) == nil && st.Dev == want.Dev && st.Ino == want.Ino {
			if found != -1 {
				t.Fatalf("multiple descriptors for %s", path)
			}
			found = fd
		}
	}
	if found == -1 {
		t.Fatalf("no descriptor for %s", path)
	}
	return found
}

func requireKqueueDescriptorClosed(t *testing.T, fd int) {
	t.Helper()
	var st unix.Stat_t
	if err := unix.Fstat(fd, &st); !errors.Is(err, unix.EBADF) {
		t.Errorf("descriptor %d was not released: %v", fd, err)
	}
}

func TestKqueueReplacedFileDescriptorLifetime(t *testing.T) { //nolint:paralleltest // Controls descriptor reuse within this process.
	for _, shutdown := range []bool{false, true} { //nolint:paralleltest // Controls descriptor reuse within this process.
		name := "close-watch"
		if shutdown {
			name = "shutdown"
		}
		t.Run(name, func(t *testing.T) {
			w, impl := newTestKqueueWatcher(t)
			root := newTmpDir(t)
			// Start the backend before reserving a lower descriptor slot.
			_, anchor := subscribeFor(t, newTmpDir(t), w)
			dir := filepath.Join(root, "watched")
			if err := os.Mkdir(dir, 0o755); err != nil {
				t.Fatal(err)
			}
			path := filepath.Join(dir, "file")
			replacement := filepath.Join(root, "replacement")
			for _, p := range []string{path, replacement} {
				if err := os.WriteFile(p, []byte("before"), 0o600); err != nil {
					t.Fatal(err)
				}
			}
			spare := openKqueueTestFile(t, filepath.Join(root, "spare"))
			spareFD := int(spare.Fd())
			rec, sub := subscribeFor(t, dir, w)
			oldFD := kqueueTestDescriptor(t, path, spareFD)

			// Atomic replacement must rewatch the new inode. Freeing a lower
			// slot ensures the rewatch cannot retain the old fd number.
			if err := spare.Close(); err != nil {
				t.Fatal(err)
			}
			if err := os.Rename(replacement, path); err != nil {
				t.Fatal(err)
			}
			expectContains(t, rec, EventUpdate, path)
			currentFD := kqueueTestDescriptor(t, path, spareFD-1)
			if currentFD == oldFD {
				t.Fatal("replacement did not reuse the lower descriptor slot")
			}
			if err := os.WriteFile(path, []byte("after"), 0o600); err != nil {
				t.Fatal(err)
			}
			expectContains(t, rec, EventUpdate, path)

			// Put an unrelated live file in the old descriptor slot.
			var reused *os.File
			for {
				file := openKqueueTestFile(t, filepath.Join(root, "unrelated"))
				if int(file.Fd()) > oldFD {
					t.Fatal("old descriptor is still in use")
				}
				if int(file.Fd()) == oldFD {
					reused = file
					break
				}
			}
			if shutdown {
				impl.shutdown()
			} else if err := sub.Close(); err != nil {
				t.Fatal(err)
			}
			if _, err := reused.WriteString("still open"); err != nil {
				t.Errorf("closing the watch closed an unrelated file: %v", err)
			}
			requireKqueueDescriptorClosed(t, currentFD)
			if err := sub.Close(); err != nil {
				t.Fatal(err)
			}
			if err := anchor.Close(); err != nil {
				t.Fatal(err)
			}
		})
	}
}

func TestKqueueRootReplacementDescriptorLifetime(t *testing.T) { //nolint:paralleltest // Controls descriptor reuse within this process.
	for _, rename := range []bool{false, true} { //nolint:paralleltest // Controls descriptor reuse within this process.
		name := "delete"
		if rename {
			name = "rename"
		}
		t.Run(name, func(t *testing.T) {
			w, _ := newTestKqueueWatcher(t)
			root := newTmpDir(t)
			dir := filepath.Join(root, "watched")
			if err := os.Mkdir(dir, 0o755); err != nil {
				t.Fatal(err)
			}
			parentRec, parent := subscribeFor(t, root, w)
			unrelated := newTmpDir(t)
			lower := openKqueueTestFile(t, filepath.Join(unrelated, "lower"))
			terminated := make(chan error, 1)
			sub, err := w.WatchDirectory(dir, func(_ []Event, err error) {
				if err != nil {
					select {
					case terminated <- err:
						return
					default:
						return
					}
				}
			})
			if err != nil {
				t.Fatal(err)
			}
			t.Cleanup(func() { _ = sub.Close() })
			oldFD := kqueueTestDescriptor(t, dir, int(lower.Fd()))
			if rename {
				err = os.Rename(dir, filepath.Join(unrelated, "moved"))
			} else {
				err = os.Remove(dir)
			}
			if err != nil {
				t.Fatal(err)
			}
			select {
			case err := <-terminated:
				if !errors.Is(err, ErrWatchTerminated) {
					t.Fatalf("unexpected root error: %v", err)
				}
			case <-time.After(watcherEventTimeout(t, w)):
				t.Fatal("root watch did not terminate")
			}
			expectContains(t, parentRec, EventDelete, dir)
			requireKqueueDescriptorClosed(t, oldFD)
			if err := sub.Close(); err != nil {
				t.Fatal(err)
			}
			if err := os.Mkdir(dir, 0o755); err != nil {
				t.Fatal(err)
			}
			expectContains(t, parentRec, EventUpdate, dir)
			parentFD := kqueueTestDescriptor(t, dir, -1)

			lowerNew := openKqueueTestFile(t, filepath.Join(unrelated, "lower-new"))
			rec, replacement := subscribeFor(t, dir, w)
			currentFD := kqueueTestDescriptor(t, dir, int(lowerNew.Fd()))
			if err := parent.Close(); err != nil {
				t.Fatal(err)
			}
			requireKqueueDescriptorClosed(t, parentFD)
			file := filepath.Join(dir, "new-file")
			if err := os.WriteFile(file, []byte("after"), 0o600); err != nil {
				t.Fatal(err)
			}
			expectContains(t, rec, EventUpdate, file)
			if err := replacement.Close(); err != nil {
				t.Fatal(err)
			}
			requireKqueueDescriptorClosed(t, currentFD)
		})
	}
}

func TestKqueueSymlinkWatchSurvivesParentChange(t *testing.T) {
	t.Parallel()
	w, _ := newTestKqueueWatcher(t)
	root := newTmpDir(t)
	target := newTmpDir(t)
	link := filepath.Join(root, "link")
	if err := os.Symlink(target, link); err != nil {
		t.Fatal(err)
	}
	parentRec, parent := subscribeFor(t, root, w)
	linkRec, _ := subscribeFor(t, link, w)

	sibling := filepath.Join(root, "sibling")
	if err := os.WriteFile(sibling, nil, 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, parentRec, EventUpdate, sibling)
	file := filepath.Join(target, "file")
	if err := os.WriteFile(file, []byte("before parent close"), 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, linkRec, EventUpdate, filepath.Join(link, "file"))
	if err := parent.Close(); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(file, []byte("after parent close"), 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, linkRec, EventUpdate, filepath.Join(link, "file"))
	linkRec.mu.Lock()
	defer linkRec.mu.Unlock()
	if len(linkRec.errs) != 0 {
		t.Fatalf("unchanged symlink watch received errors: %v", linkRec.errs)
	}
}

func TestKqueueUnopenedRecursiveEntryRemoval(t *testing.T) {
	t.Parallel()
	w, _ := newTestKqueueWatcher(t)
	root := newTmpDir(t)
	rec, _ := subscribeFor(t, root, w)
	staging := filepath.Join(newTmpDir(t), "staging")
	if err := os.Mkdir(staging, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.Symlink(filepath.Join(staging, "missing"), filepath.Join(staging, "dangling")); err != nil {
		t.Fatal(err)
	}
	destination := filepath.Join(root, "subtree")
	if err := os.Rename(staging, destination); err != nil {
		t.Fatal(err)
	}
	link := filepath.Join(destination, "dangling")
	expectContains(t, rec, EventUpdate, link)
	if err := os.Remove(link); err != nil {
		t.Fatal(err)
	}
	expectContains(t, rec, EventDelete, link)
	if err := os.WriteFile(link, []byte("replacement"), 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, rec, EventUpdate, link)
}

func TestKqueueReplacementWatchBeforeParentDispatch(t *testing.T) { //nolint:paralleltest // Locates descriptors to control kernel event delivery.
	w, impl := newTestKqueueWatcher(t)
	_, _ = subscribeFor(t, newTmpDir(t), w)
	root := newTmpDir(t)
	child := filepath.Join(root, "child")
	if err := os.Mkdir(child, 0o755); err != nil {
		t.Fatal(err)
	}
	lower := openKqueueTestFile(t, filepath.Join(newTmpDir(t), "lower"))
	parentRec, _ := subscribeFor(t, root, w)
	rootFD := kqueueTestDescriptor(t, root, int(lower.Fd()))
	childFD := kqueueTestDescriptor(t, child, int(lower.Fd()))

	// Hold actual kernel delivery while the public API subscribes to the
	// replacement. No backend subscription bookkeeping is modified.
	changes := make([]unix.Kevent_t, 2)
	for i, fd := range []int{rootFD, childFD} {
		unix.SetKevent(&changes[i], fd, unix.EVFILT_VNODE, unix.EV_DISABLE)
	}
	if _, err := unix.Kevent(impl.kq, changes, nil, nil); err != nil {
		t.Fatal(err)
	}
	if err := os.Rename(child, filepath.Join(newTmpDir(t), "old-child")); err != nil {
		t.Fatal(err)
	}
	if err := os.Mkdir(child, 0o755); err != nil {
		t.Fatal(err)
	}
	childRec, _ := subscribeFor(t, child, w)
	unix.SetKevent(&changes[0], rootFD, unix.EVFILT_VNODE, unix.EV_ENABLE)
	if _, err := unix.Kevent(impl.kq, changes[:1], nil, nil); err != nil {
		t.Fatal(err)
	}
	barrier := filepath.Join(root, "barrier")
	if err := os.WriteFile(barrier, nil, 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, parentRec, EventUpdate, barrier)

	file := filepath.Join(child, "file")
	if err := os.WriteFile(file, []byte("replacement"), 0o600); err != nil {
		t.Fatal(err)
	}
	expectContains(t, childRec, EventUpdate, file)
	childRec.mu.Lock()
	defer childRec.mu.Unlock()
	if len(childRec.errs) != 0 {
		t.Fatalf("replacement watch received errors: %v", childRec.errs)
	}
}

func TestKqueueAncestorRenameTerminatesNestedWatch(t *testing.T) {
	t.Parallel()
	for _, recursive := range []bool{false, true} {
		name := "non-recursive"
		if recursive {
			name = "recursive"
		}
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			w, _ := newTestKqueueWatcher(t)
			root := newTmpDir(t)
			ancestor := filepath.Join(root, "moved")
			nested := filepath.Join(ancestor, "nested")
			sibling := filepath.Join(root, "moved-other")
			for _, dir := range []string{nested, sibling} {
				if err := os.MkdirAll(dir, 0o755); err != nil {
					t.Fatal(err)
				}
				if err := os.WriteFile(filepath.Join(dir, "file"), []byte("before"), 0o600); err != nil {
					t.Fatal(err)
				}
			}
			var opts []WatchOption
			if recursive {
				opts = append(opts, WithRecursive())
			}
			parentRec, parent := subscribeForOpts(t, root, w, opts...)
			nestedRec, nestedSub := subscribeFor(t, nested, w)
			siblingRec, siblingSub := subscribeFor(t, sibling, w)
			destination := filepath.Join(newTmpDir(t), "renamed")
			if err := os.Rename(ancestor, destination); err != nil {
				t.Fatal(err)
			}
			expectContains(t, parentRec, EventDelete, ancestor)
			expectContains(t, nestedRec, EventDelete, nested)
			nestedRec.mu.Lock()
			terminated := false
			for _, err := range nestedRec.errs {
				terminated = terminated || errors.Is(err, ErrWatchTerminated)
			}
			nestedRec.mu.Unlock()
			if !terminated {
				t.Fatal("nested watch did not receive ErrWatchTerminated")
			}

			if err := os.WriteFile(filepath.Join(destination, "nested", "file"), []byte("after"), 0o600); err != nil {
				t.Fatal(err)
			}
			if events := nestedRec.next(watcherEventTimeout(t, w)); len(events) != 0 {
				t.Fatalf("terminated watch delivered stale events: %v", events)
			}
			if err := nestedSub.Close(); err != nil {
				t.Fatal(err)
			}
			if err := nestedSub.Close(); err != nil {
				t.Fatal(err)
			}

			file := filepath.Join(root, "parent-file")
			if err := os.WriteFile(file, []byte("parent"), 0o600); err != nil {
				t.Fatal(err)
			}
			expectContains(t, parentRec, EventUpdate, file)
			if err := parent.Close(); err != nil {
				t.Fatal(err)
			}
			siblingFile := filepath.Join(sibling, "file")
			if err := os.WriteFile(siblingFile, []byte("sibling"), 0o600); err != nil {
				t.Fatal(err)
			}
			expectContains(t, siblingRec, EventUpdate, siblingFile)
			if err := siblingSub.Close(); err != nil {
				t.Fatal(err)
			}
		})
	}
}
