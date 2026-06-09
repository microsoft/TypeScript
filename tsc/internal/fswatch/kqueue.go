//go:build darwin || freebsd || openbsd || netbsd || dragonfly

package fswatch

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"sync/atomic"

	"golang.org/x/sys/unix"
)

// ---------------------------------------------------------------------------
// kqueue.go: kqueue backend (macOS, FreeBSD, OpenBSD, NetBSD, DragonFlyBSD)
//
// Uses the kernel's kqueue/kevent mechanism to watch individual files and
// directories via EVFILT_VNODE. Unlike inotify, kqueue requires an open file
// descriptor per watched path, not just per directory. On macOS, O_EVTONLY
// opens files for event monitoring only; on other BSDs, O_RDONLY is used.
//
//	┌──────────────────────────────────────────────────────────────┐
//	│                       kqueueBackend                          │
//	│                                                              │
//	│  ┌───────────┐       kevent(2)        ┌──────────────────┐   │
//	│  │ pipe[0]   ├───────────────────────►│                  │   │
//	│  │ (wakeup)  │                        │  start()         │   │
//	│  └───────────┘                        │  goroutine       │   │
//	│  ┌───────────┐      EVFILT_VNODE      │  (event loop)    │   │
//	│  │ kqueue    ├───────────────────────►│                  │   │
//	│  │ fd        │                        └────────┬─────────┘   │
//	│  └───────────┘                                 │             │
//	│                                                ▼             │
//	│             ┌──────────────────────────────────────────────┐ │
//	│             │  fdToEntry:  map[fd]   → *dirEntry           │ │
//	│             │  subsByPath: map[path] → []*kqueueSub        │ │
//	│             │                                              │ │
//	│             │  Each dirEntry.state stores the open fd      │ │
//	│             └──────────────────────────────────────────────┘ │
//	└──────────────────────────────────────────────────────────────┘
//
// Goroutines and threading:
//   - One long-lived goroutine (start), launched by watcherBase.run(). It
//     owns the kevent(2) loop and runs for the process lifetime. All event
//     dispatch (compareDir, handleFileEvent) executes on this goroutine.
//     compareDir and handleFileEvent acquire b.mu for watch/fd lookups.
//   - subscribe/closeWatch run on the caller's goroutine under
//     watcherBase.mu. watchPath acquires b.mu to register fd mappings.
//
// Callback delivery:
//   dirWatch.notify() posts to the shared process-wide debouncer. After a
//   coalescing window (50 ms min / 500 ms max), the debouncer invokes all
//   registered WatchCallbacks on its own dedicated goroutine; never on
//   the caller's goroutine or the event-loop goroutine.
//
// WatchDirectory flow:
//  1. Walk the target directory, building a path→dirEntry map (caller goroutine).
//  2. For every entry (file or directory), open an fd and register it with
//     kqueue for EVFILT_VNODE events (NOTE_DELETE, NOTE_WRITE, NOTE_EXTEND,
//     NOTE_ATTRIB, NOTE_RENAME, NOTE_REVOKE). Store the fd↔dirEntry mapping.
//
// Event dispatch (on the start goroutine):
//   - NOTE_WRITE on a directory → compareDir: re-read the directory from
//     disk, diff against the in-memory tree, emit update events for new
//     entries (opening + watching them) and delete events for removed ones
//     (closing their fds).
//   - NOTE_DELETE / NOTE_RENAME / NOTE_REVOKE → close the stale fd. For a
//     pure NOTE_DELETE on a file, tryRewatchLocked checks whether the path
//     was immediately recreated (atomic-save pattern) and emits update
//     instead of delete if so. Otherwise emit delete and remove from the
//     tree. Directories skip tryRewatchLocked to avoid spurious updates
//     during RemoveAll races.
//   - NOTE_WRITE / NOTE_ATTRIB / NOTE_EXTEND on a file → emit update.
//   After processing all returned kevents, call dirWatch.notify() on each
//   touched dirWatch to trigger the debouncer.
//
// Shutdown:
//   Write a byte to pipe[1] → kevent sees the pipe fd → loop exits →
//   close all tracked fds, the kqueue fd, and the pipe.
// ---------------------------------------------------------------------------

// openForEvents opens a path for kqueue event monitoring. On darwin, O_EVTONLY
// opens the file for event notification without granting read access. On other
// BSDs, falls back to O_RDONLY.
func openForEvents(path string) (int, error) {
	flags := unix.O_RDONLY
	if runtime.GOOS == "darwin" {
		flags = 0x8000 // O_EVTONLY, darwin-only
	}
	return unix.Open(path, flags, 0)
}

// dirEntry tracks a watched path for kqueue's fd↔path mapping.
type dirEntry struct {
	path  string
	isDir bool
	state any // stores the open fd
}

// kqueueSubscription.
type kqueueSubscription struct {
	dirWatch *dirWatch
	path     string
	entries  map[string]*dirEntry
	fd       int
}

// kqueueBackend. It embeds treeReaderBackend (via Go
// composition) just like the inheritance hierarchy.
type kqueueBackend struct {
	watcherBase

	mu sync.Mutex // local lock for kqueue-specific maps
	kq int
	// pipeFDs[0] is read in the Start goroutine only. pipeFDs[1] is written
	// by Shutdown (any goroutine) to wake the loop, so it lives in
	// pipeWriteFD as an atomic with a sentinel of -1 once closed.
	pipeFDs     [2]int
	pipeWriteFD atomic.Int32
	subsByPath  map[string][]*kqueueSubscription // multimap<path, sub>
	fdToEntry   map[int]*dirEntry
	endedSignal chan struct{}

	// Persistent buffer reused across event batches. Only accessed
	// from the start goroutine, so no synchronization needed.
	watchersTouched map[*dirWatch]struct{}
}

func init() {
	kqueueWatcher.factory = func() watcherImpl { return newKqueueBackend() }
}

func newKqueueBackend() *kqueueBackend {
	b := &kqueueBackend{
		kq:              -1,
		pipeFDs:         [2]int{-1, -1},
		subsByPath:      map[string][]*kqueueSubscription{},
		fdToEntry:       map[int]*dirEntry{},
		endedSignal:     make(chan struct{}),
		watchersTouched: make(map[*dirWatch]struct{}),
	}
	b.pipeWriteFD.Store(-1)
	b.watcherBase.init(b)
	return b
}

func (b *kqueueBackend) start() error {
	kq, err := unix.Kqueue()
	if err != nil {
		return fmt.Errorf("unable to open kqueue: %w", err)
	}
	b.kq = kq
	defer func() {
		b.closeSubscriptions()
		b.closeFDs()
		close(b.endedSignal)
	}()

	if err := unix.Pipe(b.pipeFDs[:]); err != nil {
		return fmt.Errorf("unable to open pipe: %w", err)
	}
	b.pipeWriteFD.Store(int32(b.pipeFDs[1]))

	// WatchDirectory kqueue to the read side of the pipe so we can break the
	// loop on shutdown. SetKevent handles the per-arch Ident type
	// (uint64 on 64-bit, uint32 on 386/arm).
	var pipeEv unix.Kevent_t
	unix.SetKevent(&pipeEv, b.pipeFDs[0], unix.EVFILT_READ, unix.EV_ADD|unix.EV_CLEAR)
	if _, err := unix.Kevent(kq, []unix.Kevent_t{pipeEv}, nil, nil); err != nil {
		return fmt.Errorf("unable to watch pipe: %w", err)
	}

	b.notifyStarted()

	events := make([]unix.Kevent_t, 128)
	for {
		n, err := unix.Kevent(kq, nil, events, nil)
		if err != nil {
			if err == unix.EINTR {
				continue
			}
			return fmt.Errorf("kevent error: %w", err)
		}

		watchersTouched := b.watchersTouched
		stop := false
		for i := range n {
			fflags := events[i].Fflags
			flags := events[i].Flags
			fd := int(events[i].Ident)
			if fd == b.pipeFDs[0] {
				stop = true
				break
			}

			// EV_ERROR indicates kevent couldn't apply a changelist
			// entry or that the kernel rejected the registration.
			// Data carries the errno. Skip dispatching as a normal
			// event since fflags are not meaningful in this case.
			if flags&unix.EV_ERROR != 0 {
				continue
			}

			b.mu.Lock()
			entry, ok := b.fdToEntry[fd]
			b.mu.Unlock()
			if !ok || entry == nil {
				continue
			}

			if fflags&unix.NOTE_WRITE != 0 && entry.isDir {
				b.compareDir(fd, entry.path, watchersTouched)
				// NOTE_WRITE on a dir already ran compareDir above.
				// On DragonFlyBSD, rename-over coalesces NOTE_DELETE
				// with NOTE_WRITE on the parent directory (rather than
				// firing NOTE_DELETE on the replaced file's fd).
				// Skip handleFileEvent so we don't misinterpret the
				// coalesced NOTE_DELETE as the directory itself being
				// removed.
				fflags &^= unix.NOTE_DELETE
			}
			if fflags&^unix.NOTE_WRITE != 0 || !entry.isDir {
				b.handleFileEvent(fflags, entry, watchersTouched)
			}
		}

		for w := range watchersTouched {
			w.notify()
		}
		clear(watchersTouched)
		if stop {
			break
		}
	}

	return nil
}

func (b *kqueueBackend) closeFDs() {
	if b.pipeFDs[0] >= 0 {
		_ = unix.Close(b.pipeFDs[0])
		b.pipeFDs[0] = -1
	}
	if fd := b.pipeWriteFD.Swap(-1); fd >= 0 {
		_ = unix.Close(int(fd))
	}
	b.pipeFDs[1] = -1
	if b.kq >= 0 {
		_ = unix.Close(b.kq)
		b.kq = -1
	}
}

func (b *kqueueBackend) closeSubscriptions() {
	b.mu.Lock()
	seenFDs := map[int]struct{}{}
	for _, list := range b.subsByPath {
		for _, sub := range list {
			if sub.fd < 0 {
				continue
			}
			if _, ok := seenFDs[sub.fd]; ok {
				continue
			}
			seenFDs[sub.fd] = struct{}{}
			_ = unix.Close(sub.fd)
		}
	}
	b.subsByPath = map[string][]*kqueueSubscription{}
	b.fdToEntry = map[int]*dirEntry{}
	b.mu.Unlock()
}

func (b *kqueueBackend) shutdown() {
	fd := b.pipeWriteFD.Load()
	if fd < 0 {
		return
	}
	_, _ = unix.Write(int(fd), []byte{'X'})
	<-b.endedSignal
}

func (b *kqueueBackend) handleFileEvent(fflags uint32, entry *dirEntry, touched map[*dirWatch]struct{}) {
	b.mu.Lock()
	defer b.mu.Unlock()
	subs := b.findSubscriptionsLocked(entry.path)

	if fflags&(unix.NOTE_DELETE|unix.NOTE_RENAME|unix.NOTE_REVOKE) != 0 {
		// Close the stale fd; the watched inode is gone.
		if oldFD, ok := entry.state.(int); ok {
			unix.Close(oldFD)
			delete(b.fdToEntry, oldFD)
			entry.state = nil
		}

		recreated := false
		if fflags&unix.NOTE_DELETE != 0 && fflags&(unix.NOTE_RENAME|unix.NOTE_REVOKE) == 0 && !entry.isDir {
			recreated = b.tryRewatchLocked(entry)
		}

		for _, sub := range subs {
			touched[sub.dirWatch] = struct{}{}
			if recreated {
				sub.dirWatch.events.update(sub.path)
			} else {
				sub.dirWatch.events.remove(sub.path)
				// If we lost a directory, walk the entries map and
				// close every fd we had open for descendants. Some
				// kernels (OpenBSD in particular) deliver only the
				// parent's NOTE_DELETE/NOTE_RENAME and never fire
				// NOTE_DELETE on the children; without this cleanup,
				// modifying a file inside the moved tree later
				// surfaces an event against the descendant's stale
				// (pre-rename) path. We also emit a delete for each
				// descendant we close, so callers don't miss those
				// removals if the kernel didn't fire per-child events.
				// (When the kernel does fire them, our follow-up
				// handleFileEvent finds the fd already gone and is a
				// no-op, so events.create's coalescing handles dups.)
				if entry.isDir {
					b.closeDescendantFDsLocked(sub.dirWatch, sub.entries, sub.path)
				}
				removeEntryAndDescendants(sub.entries, sub.path)
				// Root-of-watch deletion: no more events can fire
				// for this dirWatch. Tell the caller.
				if sub.path == sub.dirWatch.dir {
					sub.dirWatch.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
				}
			}
		}
		if !recreated {
			delete(b.subsByPath, entry.path)
		}
		return
	}

	for _, sub := range subs {
		touched[sub.dirWatch] = struct{}{}
		if fflags&(unix.NOTE_WRITE|unix.NOTE_ATTRIB|unix.NOTE_EXTEND) != 0 {
			sub.dirWatch.events.update(sub.path)
		}
	}
}

// closeDescendantFDsLocked closes every fd attached to an entry whose
// path lives strictly under root, removing the kevent registration and
// the corresponding b.subsByPath / b.fdToEntry bookkeeping, and emits a
// delete event for each. Used when a directory's parent is lost
// (deleted, renamed away) and the kernel didn't propagate the loss to
// children. eventList coalesces against any per-child NOTE_DELETE that
// arrives later.
func (b *kqueueBackend) closeDescendantFDsLocked(w *dirWatch, entries map[string]*dirEntry, root string) {
	prefix := root + string(filepath.Separator)
	for path, e := range entries {
		if !strings.HasPrefix(path, prefix) {
			continue
		}
		if fd, ok := e.state.(int); ok {
			unix.Close(fd)
			delete(b.fdToEntry, fd)
			e.state = nil
		}
		delete(b.subsByPath, path)
		w.events.remove(path)
	}
}

// tryRewatchLocked checks whether a deleted path was immediately recreated
// with the same type. If so, it opens a new fd, registers a kqueue watch,
// and returns true. The caller should emit update instead of delete.
func (b *kqueueBackend) tryRewatchLocked(entry *dirEntry) bool {
	var st unix.Stat_t
	if unix.Lstat(entry.path, &st) != nil {
		return false
	}

	// Only fast-path when the recreated path has the same type;
	// a file→dir change needs a full tree rebuild via compareDir.
	newIsDir := st.Mode&unix.S_IFMT == unix.S_IFDIR
	if newIsDir != entry.isDir {
		return false
	}

	fd, err := openForEvents(entry.path)
	if err != nil {
		return false
	}

	var ev unix.Kevent_t
	unix.SetKevent(&ev, fd, unix.EVFILT_VNODE, unix.EV_ADD|unix.EV_CLEAR|unix.EV_ENABLE)
	ev.Fflags = unix.NOTE_DELETE | unix.NOTE_WRITE | unix.NOTE_EXTEND |
		unix.NOTE_ATTRIB | unix.NOTE_RENAME | unix.NOTE_REVOKE
	if _, err := unix.Kevent(b.kq, []unix.Kevent_t{ev}, nil, nil); err != nil {
		unix.Close(fd)
		return false
	}

	entry.state = fd

	b.fdToEntry[fd] = entry
	return true
}

func (b *kqueueBackend) closeEntryLocked(entry *dirEntry) {
	if fd, ok := entry.state.(int); ok {
		unix.Close(fd)
		delete(b.fdToEntry, fd)
		entry.state = nil
	}
}

func (b *kqueueBackend) removeSubsForEntriesLocked(path string, entriesPtr *map[string]*dirEntry) {
	list := b.subsByPath[path]
	kept := list[:0]
	for _, sub := range list {
		if &sub.entries == entriesPtr {
			continue
		}
		kept = append(kept, sub)
	}
	if len(kept) == 0 {
		delete(b.subsByPath, path)
	} else {
		b.subsByPath[path] = kept
	}
}

func (b *kqueueBackend) removeEntryAndDescendantsLocked(entriesPtr *map[string]*dirEntry, path string, includeRoot bool) {
	entries := *entriesPtr
	for descendant, e := range entries {
		if descendant == path {
			if !includeRoot {
				continue
			}
		} else if !(len(descendant) > len(path) && descendant[len(path)] == filepath.Separator && descendant[:len(path)] == path) {
			continue
		}
		b.closeEntryLocked(e)
		b.removeSubsForEntriesLocked(descendant, entriesPtr)
		delete(entries, descendant)
	}
}

func (b *kqueueBackend) findSubscriptionsLocked(path string) []*kqueueSubscription {
	subs := b.subsByPath[path]
	out := make([]*kqueueSubscription, len(subs))
	copy(out, subs)
	return out
}

// subscribe mirrors `kqueueBackend::subscribe`. Called under watcherBase.mu
// via watchAdd.
func (b *kqueueBackend) subscribe(w *dirWatch) error {
	// Build the entries map without registering any watches or
	// subscriptions. This avoids a data race: registering a subscription
	// publishes the entries map to the event loop (via subsByPath),
	// which could read it via compareDir while we're still populating it.
	entries := map[string]*dirEntry{}
	if err := walkDir(w.dir, w.recursive, func(path string, isDir bool) error {
		entries[path] = &dirEntry{path: path, isDir: isDir}
		return nil
	}); err != nil {
		return err
	}

	// Open fds, register kevents, and publish subscriptions under b.mu.
	// Holding the lock for the entire block ensures that the event loop
	// cannot see a partially-built entries map, and that fds are always
	// tracked in fdToEntry (no leak on early return).
	b.mu.Lock()
	defer b.mu.Unlock()

	for path, entry := range entries {
		fd, err := openForEvents(path)
		if err != nil {
			if path == w.dir {
				b.cleanupEntriesLocked(entries)
				return &dirWatchError{
					err:      fmt.Errorf("error watching %s: %w", w.dir, err),
					dirWatch: w,
				}
			}
			delete(entries, path)
			continue
		}
		var ev unix.Kevent_t
		unix.SetKevent(&ev, fd, unix.EVFILT_VNODE, unix.EV_ADD|unix.EV_CLEAR|unix.EV_ENABLE)
		ev.Fflags = unix.NOTE_DELETE | unix.NOTE_WRITE | unix.NOTE_EXTEND |
			unix.NOTE_ATTRIB | unix.NOTE_RENAME | unix.NOTE_REVOKE
		if _, err := unix.Kevent(b.kq, []unix.Kevent_t{ev}, nil, nil); err != nil {
			unix.Close(fd)
			if path == w.dir {
				b.cleanupEntriesLocked(entries)
				return &dirWatchError{
					err:      fmt.Errorf("error watching %s: %w", w.dir, err),
					dirWatch: w,
				}
			}
			delete(entries, path)
			continue
		}
		entry.state = fd
		b.fdToEntry[fd] = entry
	}

	for path, entry := range entries {
		fd := entry.state.(int)
		sub := &kqueueSubscription{dirWatch: w, path: path, entries: entries, fd: fd}
		b.subsByPath[path] = append(b.subsByPath[path], sub)
	}
	return nil
}

// cleanupEntriesLocked closes fds for all entries that have been opened.
// Called on subscribe failure to avoid fd leaks. Must be called under b.mu.
func (b *kqueueBackend) cleanupEntriesLocked(entries map[string]*dirEntry) {
	for _, e := range entries {
		if fd, ok := e.state.(int); ok {
			unix.Close(fd)
			delete(b.fdToEntry, fd)
			e.state = nil
		}
	}
}

// watchPath corresponds to `kqueueBackend::watchDir`.
func (b *kqueueBackend) watchPath(w *dirWatch, path string, entries map[string]*dirEntry) bool {
	entry := entries[path]
	if entry == nil {
		return false
	}
	b.mu.Lock()
	defer b.mu.Unlock()

	sub := &kqueueSubscription{dirWatch: w, path: path, entries: entries}
	if entry.state == nil {
		fd, err := openForEvents(path)
		if err != nil {
			return false
		}
		var ev unix.Kevent_t
		unix.SetKevent(&ev, fd, unix.EVFILT_VNODE, unix.EV_ADD|unix.EV_CLEAR|unix.EV_ENABLE)
		ev.Fflags = unix.NOTE_DELETE | unix.NOTE_WRITE | unix.NOTE_EXTEND |
			unix.NOTE_ATTRIB | unix.NOTE_RENAME | unix.NOTE_REVOKE
		if _, err := unix.Kevent(b.kq, []unix.Kevent_t{ev}, nil, nil); err != nil {
			unix.Close(fd)
			return false
		}
		entry.state = fd
		b.fdToEntry[fd] = entry
	}
	sub.fd = entry.state.(int)
	b.subsByPath[path] = append(b.subsByPath[path], sub)
	return true
}

// compareDir mirrors `kqueueBackend::compareDir`. Triggered when a watched
// directory has NOTE_WRITE: list the dir, diff against the tree, emit
// create/remove events.
func (b *kqueueBackend) compareDir(_ int, path string, touched map[*dirWatch]struct{}) bool {
	b.mu.Lock()
	subs := b.findSubscriptionsLocked(path)
	b.mu.Unlock()

	// For non-recursive subscriptions, only compareDir on the root dir.
	// NOTE_WRITE on a child dir means something changed inside it, but
	// non-recursive mode shouldn't report those changes. Emit an update
	// for the child dir itself (its metadata changed) and return.
	filteredSubs := subs[:0:0]
	for _, s := range subs {
		if !s.dirWatch.recursive && path != s.dirWatch.dir {
			s.dirWatch.events.update(path)
			touched[s.dirWatch] = struct{}{}
		} else {
			filteredSubs = append(filteredSubs, s)
		}
	}
	if len(filteredSubs) == 0 {
		return true
	}
	subs = filteredSubs

	dirStart := path + string(filepath.Separator)

	// Read the current dir contents from disk.
	diskEntries, err := readEntries(path)
	if err != nil {
		return false
	}

	// Each subscription has its own entries map (built in subscribe).
	// Multiple subs at the same path arise from multiple dirWatches
	// covering overlapping subtrees; their maps are always distinct, so
	// we iterate subs directly rather than trying to dedup by map identity.
	currentSet := map[string]struct{}{}
	for _, ent := range diskEntries {
		fullPath := dirStart + ent.Name()
		currentSet[fullPath] = struct{}{}

		for _, sub := range subs {
			entries := sub.entries
			existing := entries[fullPath]
			if existing != nil {
				if existing.state != nil {
					// Check if the fd still refers to the same inode as
					// the path on disk. On DragonFlyBSD, rename-over
					// doesn't fire NOTE_DELETE on the replaced file's fd,
					// leaving a stale entry whose fd points to the old
					// (now unlinked) inode.
					if fd, ok := existing.state.(int); ok {
						var fdSt, pathSt unix.Stat_t
						if unix.Fstat(fd, &fdSt) == nil && unix.Lstat(fullPath, &pathSt) == nil {
							if fdSt.Dev != pathSt.Dev || fdSt.Ino != pathSt.Ino {
								// Inode changed: path was replaced.
								b.mu.Lock()
								b.closeEntryLocked(existing)
								b.removeSubsForEntriesLocked(fullPath, &sub.entries)
								if existing.isDir {
									b.removeEntryAndDescendantsLocked(&sub.entries, fullPath, false)
								}
								existing.isDir = ent.IsDir()
								b.mu.Unlock()
							}
						}
					}
				}
				if existing.state != nil {
					continue
				}
				// Entry exists but fd is stale: the file was replaced.
				// Re-watch it and emit an update.
				if !b.watchPath(sub.dirWatch, fullPath, entries) {
					continue
				}
				sub.dirWatch.events.update(fullPath)
				touched[sub.dirWatch] = struct{}{}
				if ent.IsDir() && sub.dirWatch.recursive {
					_ = walkDir(fullPath, true, func(p string, pIsDir bool) error {
						if p == fullPath {
							return nil
						}
						e := &dirEntry{path: p, isDir: pIsDir}
						entries[p] = e
						sub.dirWatch.events.create(p)
						b.watchPath(sub.dirWatch, p, entries)
						return nil
					})
				}
				continue
			}
			e := &dirEntry{path: fullPath, isDir: ent.IsDir()}
			entries[fullPath] = e
			if !b.watchPath(sub.dirWatch, fullPath, entries) {
				delete(entries, fullPath)
				continue
			}
			sub.dirWatch.events.create(fullPath)
			touched[sub.dirWatch] = struct{}{}

			// For recursive subscriptions, walk into the new directory
			// to catch pre-populated subdirectories (e.g. a directory
			// tree moved into the watched area).
			if ent.IsDir() && sub.dirWatch.recursive {
				_ = walkDir(fullPath, true, func(p string, pIsDir bool) error {
					if p == fullPath {
						return nil // already handled above
					}
					entry := &dirEntry{path: p, isDir: pIsDir}
					entries[p] = entry
					sub.dirWatch.events.create(p)
					b.watchPath(sub.dirWatch, p, entries)
					return nil
				})
			}
		}
	}

	// Detect removals: entries directly under dirStart that no longer
	// exist on disk.
	for _, sub := range subs {
		entries := sub.entries
		var toRemove []string
		for p := range entries {
			if !strings.HasPrefix(p, dirStart) {
				continue
			}
			rest := p[len(dirStart):]
			if strings.Contains(rest, string(filepath.Separator)) {
				continue
			}
			if _, ok := currentSet[p]; ok {
				continue
			}
			toRemove = append(toRemove, p)
		}
		for _, p := range toRemove {
			sub.dirWatch.events.remove(p)
			touched[sub.dirWatch] = struct{}{}
			b.mu.Lock()
			for descendant, e := range entries {
				if descendant != p && !(len(descendant) > len(p) && descendant[len(p)] == filepath.Separator && descendant[:len(p)] == p) {
					continue
				}
				if fd, ok := e.state.(int); ok {
					unix.Close(fd)
					delete(b.fdToEntry, fd)
				}
				delete(b.subsByPath, descendant)
			}
			b.mu.Unlock()
			removeEntryAndDescendants(entries, p)
		}
	}
	return true
}

// readEntries lists directory entries (excluding "." and "..") at path.
func readEntries(path string) ([]os.DirEntry, error) {
	return os.ReadDir(path)
}

// closeWatch mirrors `kqueueBackend::closeWatch`.
func (b *kqueueBackend) closeWatch(w *dirWatch) error {
	b.mu.Lock()
	defer b.mu.Unlock()
	for path, list := range b.subsByPath {
		kept := list[:0]
		removedAny := false
		for _, s := range list {
			if s.dirWatch == w {
				removedAny = true
				continue
			}
			kept = append(kept, s)
		}
		if !removedAny {
			continue
		}
		if len(kept) == 0 {
			// Closing the file descriptor automatically unwatches it in kqueue.
			fd := list[0].fd
			unix.Close(fd)
			delete(b.fdToEntry, fd)
			delete(b.subsByPath, path)
		} else {
			b.subsByPath[path] = kept
		}
	}
	return nil
}

// removeEntryAndDescendants removes path and all paths prefixed with
// path + separator from the entries map.
func removeEntryAndDescendants(entries map[string]*dirEntry, path string) {
	delete(entries, path)
	for k := range entries {
		if len(k) > len(path) && k[len(path)] == filepath.Separator && k[:len(path)] == path {
			delete(entries, k)
		}
	}
}
