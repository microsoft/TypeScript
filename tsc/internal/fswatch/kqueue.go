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
//     watcherBase.mu. subscribe acquires b.mu to register fd mappings.
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
	path      string
	watchPath string
	isDir     bool
	state     any // owns the current open fd, or nil after it is closed
	identity  kqueueIdentity
}

type kqueueIdentity struct {
	device uint64
	inode  uint64
}

// The native device number type differs across kqueue platforms.
func newKqueueIdentity[D ~int32 | ~uint32 | ~int64 | ~uint64](device D, inode uint64) kqueueIdentity {
	return kqueueIdentity{device: uint64(device), inode: inode}
}

// kqueueSubscription.
type kqueueSubscription struct {
	dirWatch *dirWatch
	path     string
	entries  map[string]*dirEntry
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
	pipeFDs        [2]int
	pipeWriteFD    atomic.Int32
	subsByPath     map[string][]*kqueueSubscription // multimap<path, sub>
	fdToEntry      map[int]*dirEntry
	entriesByWatch map[*dirWatch]map[string]*dirEntry
	endedSignal    chan struct{}

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
		entriesByWatch:  map[*dirWatch]map[string]*dirEntry{},
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
	for _, entries := range b.entriesByWatch {
		b.cleanupEntriesLocked(entries)
	}
	b.subsByPath = map[string][]*kqueueSubscription{}
	b.fdToEntry = map[int]*dirEntry{}
	b.entriesByWatch = map[*dirWatch]map[string]*dirEntry{}
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
	if entry.state == nil {
		return
	}
	subs := b.findSubscriptionsLocked(entry.path)

	if fflags&(unix.NOTE_DELETE|unix.NOTE_RENAME|unix.NOTE_REVOKE) != 0 {
		// Close the stale fd; the watched inode is gone.
		b.closeEntryLocked(entry)

		recreated := false
		if fflags&unix.NOTE_DELETE != 0 && fflags&(unix.NOTE_RENAME|unix.NOTE_REVOKE) == 0 && !entry.isDir {
			recreated = b.tryRewatchLocked(entry)
		}
		if !recreated {
			b.removePathLocked(entry, touched)
			return
		}
		for _, sub := range subs {
			touched[sub.dirWatch] = struct{}{}
			sub.dirWatch.events.update(sub.path)
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

// An ancestor's removal may be the only event the kernel reports. Clean
// the affected trees, including entries without descriptors, but preserve
// watches already attached to a replacement inode at the same path.
func (b *kqueueBackend) removePathLocked(removed *dirEntry, touched map[*dirWatch]struct{}) {
	root := removed.path
	prefix := root + string(filepath.Separator)
	for w, entries := range b.entriesByWatch {
		affected := false
		if entry := entries[root]; entry != nil {
			affected = entry == removed || entry.state == nil || entry.identity == removed.identity
		} else if strings.HasPrefix(w.dir, prefix) {
			// A nested watch has no entry for the removed ancestor.
			// Its root fd still identifies whether it follows the
			// current path or belongs to the tree that moved away.
			entry := entries[w.dir]
			var st unix.Stat_t
			affected = unix.Stat(entry.watchPath, &st) != nil ||
				entry.identity != newKqueueIdentity(st.Dev, st.Ino)
		}
		if !affected {
			continue
		}
		for path, entry := range entries {
			if path != root && !strings.HasPrefix(path, prefix) {
				continue
			}
			b.closeEntryLocked(entry)
			b.removeSubsForEntryLocked(path, entry)
			delete(entries, path)
			w.events.remove(path)
			touched[w] = struct{}{}
			if path == w.dir {
				w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
				delete(b.entriesByWatch, w)
			}
		}
	}
}

// tryRewatchLocked checks whether a deleted path was immediately recreated
// with the same type. If so, it opens a new fd, registers a kqueue watch,
// and returns true. The caller should emit update instead of delete.
func (b *kqueueBackend) tryRewatchLocked(entry *dirEntry) bool {
	var st unix.Stat_t
	if unix.Lstat(entry.watchPath, &st) != nil {
		return false
	}

	// Only fast-path when the recreated path has the same type;
	// a file→dir change needs a full tree rebuild via compareDir.
	newIsDir := st.Mode&unix.S_IFMT == unix.S_IFDIR
	if newIsDir != entry.isDir {
		return false
	}

	return b.openEntryLocked(entry) == nil
}

func (b *kqueueBackend) openEntryLocked(entry *dirEntry) error {
	fd, err := openForEvents(entry.watchPath)
	if err != nil {
		return err
	}
	var st unix.Stat_t
	if err := unix.Fstat(fd, &st); err != nil {
		unix.Close(fd)
		return err
	}
	var ev unix.Kevent_t
	unix.SetKevent(&ev, fd, unix.EVFILT_VNODE, unix.EV_ADD|unix.EV_CLEAR|unix.EV_ENABLE)
	ev.Fflags = unix.NOTE_DELETE | unix.NOTE_WRITE | unix.NOTE_EXTEND |
		unix.NOTE_ATTRIB | unix.NOTE_RENAME | unix.NOTE_REVOKE
	if _, err := unix.Kevent(b.kq, []unix.Kevent_t{ev}, nil, nil); err != nil {
		unix.Close(fd)
		return err
	}
	entry.state = fd
	entry.identity = newKqueueIdentity(st.Dev, st.Ino)
	b.fdToEntry[fd] = entry
	return nil
}

func (b *kqueueBackend) closeEntryLocked(entry *dirEntry) {
	if fd, ok := entry.state.(int); ok {
		unix.Close(fd)
		delete(b.fdToEntry, fd)
		entry.state = nil
	}
}

func (b *kqueueBackend) removeSubsForEntryLocked(path string, entry *dirEntry) {
	list := b.subsByPath[path]
	kept := list[:0]
	for _, sub := range list {
		if sub.entries[path] == entry {
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
	if err := walkDir(w.physicalDir, w.recursive, func(watchPath string, isDir bool) error {
		path := w.displayPath(watchPath)
		entries[path] = &dirEntry{path: path, watchPath: watchPath, isDir: isDir}
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
		if err := b.openEntryLocked(entry); err != nil {
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
	}

	b.entriesByWatch[w] = entries
	for path := range entries {
		sub := &kqueueSubscription{dirWatch: w, path: path, entries: entries}
		b.subsByPath[path] = append(b.subsByPath[path], sub)
	}
	return nil
}

// cleanupEntriesLocked closes fds for all entries that have been opened.
// Called on subscribe failure to avoid fd leaks. Must be called under b.mu.
func (b *kqueueBackend) cleanupEntriesLocked(entries map[string]*dirEntry) {
	for _, e := range entries {
		b.closeEntryLocked(e)
	}
}

// watchPathLocked registers an entry while b.mu is held.
func (b *kqueueBackend) watchPathLocked(w *dirWatch, path string, entries map[string]*dirEntry) bool {
	entry := entries[path]
	if entry == nil {
		return false
	}
	sub := &kqueueSubscription{dirWatch: w, path: path, entries: entries}
	if entry.state == nil {
		if err := b.openEntryLocked(entry); err != nil {
			return false
		}
	}
	b.subsByPath[path] = append(b.subsByPath[path], sub)
	return true
}

// compareDir mirrors `kqueueBackend::compareDir`. Triggered when a watched
// directory has NOTE_WRITE: list the dir, diff against the tree, emit
// create/remove events.
func (b *kqueueBackend) compareDir(_ int, path string, touched map[*dirWatch]struct{}) bool {
	b.mu.Lock()
	defer b.mu.Unlock()
	subs := b.findSubscriptionsLocked(path)

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
	type diskSnapshot struct {
		entries             []os.DirEntry
		currentDisplayPaths map[string]struct{}
	}
	snapshots := map[string]diskSnapshot{}

	// Each subscription has its own entries map (built in subscribe).
	// Multiple subs at the same path arise from multiple dirWatches
	// covering overlapping subtrees; their maps are always distinct, so
	// we iterate subs directly rather than trying to dedup by map identity.
	for _, sub := range subs {
		baseEntry := sub.entries[path]
		if baseEntry == nil {
			continue
		}
		watchPath := baseEntry.watchPath
		watchDirStart := watchPath + string(filepath.Separator)

		snapshot, ok := snapshots[watchPath]
		if !ok {
			diskEntries, err := readEntries(watchPath)
			if err != nil {
				continue
			}
			snapshot.entries = diskEntries
			snapshot.currentDisplayPaths = make(map[string]struct{}, len(diskEntries))
			for _, ent := range diskEntries {
				snapshot.currentDisplayPaths[dirStart+ent.Name()] = struct{}{}
			}
			snapshots[watchPath] = snapshot
		}

		entries := sub.entries
		for _, ent := range snapshot.entries {
			fullPath := dirStart + ent.Name()
			fullWatchPath := watchDirStart + ent.Name()

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
						// Event descriptors follow symlinks. Use the link's
						// own identity only when its target cannot be resolved.
						pathErr := unix.Stat(fullWatchPath, &pathSt)
						if pathErr != nil {
							pathErr = unix.Lstat(fullWatchPath, &pathSt)
						}
						if unix.Fstat(fd, &fdSt) == nil && pathErr == nil {
							if fdSt.Dev != pathSt.Dev || fdSt.Ino != pathSt.Ino {
								// Inode changed: path was replaced.
								b.removePathLocked(existing, touched)
								entries[fullPath] = existing
								existing.isDir = ent.IsDir()
							}
						}
					}
				}
				if existing.state != nil {
					continue
				}
				// Entry exists but fd is stale: the file was replaced.
				// Re-watch it and emit an update.
				if !b.watchPathLocked(sub.dirWatch, fullPath, entries) {
					continue
				}
				sub.dirWatch.events.create(fullPath)
				touched[sub.dirWatch] = struct{}{}
				if ent.IsDir() && sub.dirWatch.recursive {
					_ = walkDir(fullWatchPath, true, func(p string, pIsDir bool) error {
						if p == fullWatchPath {
							return nil
						}
						displayPath := sub.dirWatch.displayPath(p)
						e := &dirEntry{path: displayPath, watchPath: p, isDir: pIsDir}
						entries[displayPath] = e
						sub.dirWatch.events.create(displayPath)
						b.watchPathLocked(sub.dirWatch, displayPath, entries)
						return nil
					})
				}
				continue
			}
			e := &dirEntry{path: fullPath, watchPath: fullWatchPath, isDir: ent.IsDir()}
			entries[fullPath] = e
			if !b.watchPathLocked(sub.dirWatch, fullPath, entries) {
				delete(entries, fullPath)
				continue
			}
			sub.dirWatch.events.create(fullPath)
			touched[sub.dirWatch] = struct{}{}

			// For recursive subscriptions, walk into the new directory
			// to catch pre-populated subdirectories (e.g. a directory
			// tree moved into the watched area).
			if ent.IsDir() && sub.dirWatch.recursive {
				_ = walkDir(fullWatchPath, true, func(p string, pIsDir bool) error {
					if p == fullWatchPath {
						return nil // already handled above
					}
					displayPath := sub.dirWatch.displayPath(p)
					entry := &dirEntry{path: displayPath, watchPath: p, isDir: pIsDir}
					entries[displayPath] = entry
					sub.dirWatch.events.create(displayPath)
					b.watchPathLocked(sub.dirWatch, displayPath, entries)
					return nil
				})
			}
		}

		// Detect removals: entries directly under dirStart that no longer
		// exist on disk.
		var toRemove []string
		for p := range entries {
			if !strings.HasPrefix(p, dirStart) {
				continue
			}
			rest := p[len(dirStart):]
			if strings.Contains(rest, string(filepath.Separator)) {
				continue
			}
			if _, ok := snapshot.currentDisplayPaths[p]; ok {
				continue
			}
			toRemove = append(toRemove, p)
		}
		for _, p := range toRemove {
			b.removePathLocked(entries[p], touched)
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
	for path, entry := range b.entriesByWatch[w] {
		b.closeEntryLocked(entry)
		b.removeSubsForEntryLocked(path, entry)
	}
	delete(b.entriesByWatch, w)
	return nil
}
