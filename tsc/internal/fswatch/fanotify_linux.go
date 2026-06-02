//go:build linux

package fswatch

import (
	"encoding/binary"
	"errors"
	"fmt"
	"sync/atomic"
	"unsafe"

	"golang.org/x/sys/unix"
)

// ---------------------------------------------------------------------------
// fanotify_linux.go: Linux fanotify backend
//
// Uses Linux's fanotify(7) API (kernel ≥ 5.13 without CAP_SYS_ADMIN) to
// watch directory trees. Unlike inotify, fanotify uses FID-based event
// reporting (FAN_REPORT_FID | FAN_REPORT_DFID_NAME): each event carries the
// parent directory's file handle and the child entry name, so watch
// dispatch is keyed by (fsid, handle_type, handle_bytes) instead of a wd
// integer. This avoids the inotify per-user watch limit (fs.inotify.
// max_user_watches) entirely.
//
//	┌──────────────────────────────────────────────────────────────┐
//	│                     fanotifyBackend                          │
//	│                                                              │
//	│  ┌───────────┐        poll(2)        ┌──────────────────┐    │
//	│  │ pipe[0]   ├──────────────────────►│                  │    │
//	│  │ (wakeup)  │                       │  start()         │    │
//	│  └───────────┘                       │  goroutine       │    │
//	│  ┌───────────┐                       │  (event loop)    │    │
//	│  │ fanotify  ├──────────────────────►│                  │    │
//	│  │ fd        │                       └────────┬─────────┘    │
//	│  └───────────┘                                │              │
//	│                                      handleEvents()          │
//	│                                               │              │
//	│                                  parseFanotifyDfidNames      │
//	│                                  (extract handleKey + name)  │
//	│                                               │              │
//	│                                               ▼              │
//	│                               ┌─────────────────────────┐    │
//	│                               │ subscriptions           │    │
//	│                               │ map[handleKey] → []sub  │    │
//	│                               │  sub.dirWatch.events    │    │
//	│                               └─────────────────────────┘    │
//	│                                                              │
//	│  handleKey = (fsid, handle_type, handle_bytes)               │
//	│  obtained via statfs(2) + name_to_handle_at(2) per dir       │
//	└──────────────────────────────────────────────────────────────┘
//
// Goroutines and threading:
//   - One long-lived goroutine (start), launched by watcherBase.run(). It
//     owns the poll(2) loop and runs for the process lifetime. All event
//     reading and dispatch (handleEvents, handleParsedEvent,
//     handleSubscription, handleRenameEvent) execute on this goroutine,
//     under b.mu.
//   - subscribe/closeWatch run on the caller's goroutine under
//     watcherBase.mu. The event loop acquires b.mu for watch map
//     access, providing safe interleaving.
//
// Callback delivery:
//   dirWatch.notify() posts to the shared process-wide debouncer. After a
//   coalescing window (50 ms min / 500 ms max), the debouncer invokes all
//   registered WatchCallbacks on its own dedicated goroutine; never on
//   the caller's goroutine or the event-loop goroutine.
//
// WatchDirectory flow (caller goroutine):
//  1. Walk the target directory.
//  2. On the first subscribe, probe FAN_RENAME support (Linux 5.17+) by
//     attempting a fanotify_mark with FAN_RENAME. If the kernel returns
//     EINVAL or EOPNOTSUPP, fall back to FAN_MOVED_FROM | FAN_MOVED_TO
//     (two separate events instead of one paired event for renames).
//  3. For every directory found:
//     a. fanotify_mark(FAN_MARK_ADD | FAN_MARK_ONLYDIR) to watch it.
//     b. name_to_handle_at(2) to obtain the directory's file handle.
//     c. statfs(2) to obtain the filesystem ID (fsid).
//     d. Map (fsid, handle_type, handle_bytes) → fanotifySubscription.
//
// Event format:
//   Each event has a FanotifyEventMetadata header followed by variable-length
//   info records. parseFanotifyDfidNames extracts DFID_NAME records
//   (FAN_EVENT_INFO_TYPE_DFID_NAME, OLD_DFID_NAME, NEW_DFID_NAME) containing
//   the parent directory's file handle and child entry name. The file handle
//   is matched against the watch map to find the watched directory.
//
// Event dispatch (on start goroutine):
//   - FAN_CREATE / FAN_MOVED_TO  → events.create (→ EventUpdate); if the new
//     entry is a directory (FAN_ONDIR), recursively walk and mark it.
//   - FAN_MODIFY               → events.update (→ EventUpdate).
//   - FAN_DELETE* / FAN_MOVE*    → events.remove (→ EventDelete); drop
//     subscriptions for the removed path and any descendants.
//   - FAN_RENAME (5.17+)         → single paired event with OLD_DFID_NAME +
//     NEW_DFID_NAME info records; handleRenameEvent deletes the old path and
//     creates the new path in one pass.
//   - FAN_Q_OVERFLOW             → set ErrOverflow on every active dirWatch.
//
//   Merged events: fanotify can merge consecutive events on the same object
//   into one event with multiple mask bits. When both create and delete bits
//   are set, handleSubscription stats the path to determine which happened
//   last (exists → delete-then-create = update; gone → create-then-delete =
//   events cancel out).
//
//   After processing all buffered events, call dirWatch.notify() on each
//   touched dirWatch to trigger the debouncer.
//
// Shutdown:
//   Write a byte to pipe[1] → poll sees POLLIN on pipe[0] → loop exits →
//   deferred closeFDs closes fanotify fd, pipe fds, and signals endedSignal.
// ---------------------------------------------------------------------------

const (
	fanotifyInitFlags uint = unix.FAN_CLASS_NOTIF | unix.FAN_CLOEXEC | unix.FAN_NONBLOCK |
		unix.FAN_REPORT_FID | unix.FAN_REPORT_DFID_NAME

	fanotifyMarkMaskBase uint64 = unix.FAN_CREATE | unix.FAN_DELETE | unix.FAN_MODIFY |
		unix.FAN_DELETE_SELF | unix.FAN_MOVE_SELF |
		unix.FAN_ONDIR | unix.FAN_EVENT_ON_CHILD

	// Used when FAN_RENAME is available (Linux 5.17+).
	fanotifyMarkMaskRename uint64 = fanotifyMarkMaskBase | unix.FAN_RENAME

	// Fallback when FAN_RENAME is not available.
	fanotifyMarkMaskMovedFromTo uint64 = fanotifyMarkMaskBase | unix.FAN_MOVED_FROM | unix.FAN_MOVED_TO

	fanotifyMarkAddFlags uint = unix.FAN_MARK_ADD | unix.FAN_MARK_ONLYDIR | unix.FAN_MARK_DONT_FOLLOW

	fanotifyBufferSize = 8192
)

// fanotifyHandleKey uniquely identifies a filesystem object by its fsid and
// file handle. Used as a map key for watch dispatch.
type fanotifyHandleKey struct {
	fsid       [2]int32
	handleType int32
	handle     string // raw handle bytes as string for map comparability
}

func makeFanotifyHandleKey(fsid [2]int32, handleType int32, handleBytes []byte) fanotifyHandleKey {
	return fanotifyHandleKey{
		fsid:       fsid,
		handleType: handleType,
		handle:     string(handleBytes),
	}
}

// fanotifySubscription mirrors inotifySubscription for the fanotify backend.
type fanotifySubscription struct {
	path     string
	dirWatch *dirWatch
	key      fanotifyHandleKey
}

// fanotifyDfidName holds parsed directory FID + name from an info record.
type fanotifyDfidName struct {
	key  fanotifyHandleKey
	name string // child entry name, or "" for self-events on directories
}

// fanotifyBackend is the fanotify-based watcher backend for Linux.
type fanotifyBackend struct {
	watcherBase

	pipeFDs     [2]int
	pipeWriteFD atomic.Int32
	fanotifyFD  int
	markMask    uint64 // fanotifyMarkMaskRename or fanotifyMarkMaskMovedFromTo; 0 until first subscribe
	noRename    bool   // when true, skip FAN_RENAME probe (for testing fallback path)

	subscriptions map[fanotifyHandleKey][]*fanotifySubscription
	endedSignal   chan struct{}

	// Persistent buffers reused across handleEvents calls. Only accessed
	// from the start goroutine, so no synchronization needed.
	readBuf         []byte
	watchersTouched map[*dirWatch]struct{}
}

func init() {
	if fanotifyAvailable() {
		fanotifyWatcher.factory = func() watcherImpl { return newFanotifyBackend(false) }
	}
}

// fanotifyAvailable probes whether fanotify_init succeeds with the flags
// this backend needs.
func fanotifyAvailable() bool {
	fd, err := unix.FanotifyInit(fanotifyInitFlags, unix.O_RDONLY|unix.O_CLOEXEC)
	if err != nil {
		return false
	}
	_ = unix.Close(fd)
	return true
}

// newFanotifyBackend creates a fanotify backend. If noRename is true, the
// backend skips the FAN_RENAME probe and forces the FAN_MOVED_FROM/FAN_MOVED_TO
// fallback path; this is only used by the fanotify-no-rename test watcher to
// exercise the fallback path on kernels that natively support FAN_RENAME.
func newFanotifyBackend(noRename bool) *fanotifyBackend {
	b := &fanotifyBackend{
		pipeFDs:         [2]int{-1, -1},
		fanotifyFD:      -1,
		noRename:        noRename,
		subscriptions:   map[fanotifyHandleKey][]*fanotifySubscription{},
		endedSignal:     make(chan struct{}),
		readBuf:         make([]byte, fanotifyBufferSize),
		watchersTouched: make(map[*dirWatch]struct{}),
	}
	b.pipeWriteFD.Store(-1)
	b.watcherBase.init(b)
	return b
}

func (b *fanotifyBackend) start() error {
	if err := unix.Pipe2(b.pipeFDs[:], unix.O_CLOEXEC|unix.O_NONBLOCK); err != nil {
		return fmt.Errorf("unable to open pipe: %w", err)
	}
	b.pipeWriteFD.Store(int32(b.pipeFDs[1]))
	defer func() {
		b.closeFDs()
		close(b.endedSignal)
	}()

	fd, err := unix.FanotifyInit(fanotifyInitFlags, unix.O_RDONLY|unix.O_CLOEXEC)
	if err != nil {
		return fmt.Errorf("unable to initialize fanotify: %w", err)
	}
	b.fanotifyFD = fd

	pollfds := []unix.PollFd{
		{Fd: int32(b.pipeFDs[0]), Events: unix.POLLIN},
		{Fd: int32(b.fanotifyFD), Events: unix.POLLIN},
	}

	b.notifyStarted()

	for {
		_, err := unix.Poll(pollfds, 500)
		if err != nil {
			if errors.Is(err, unix.EINTR) {
				continue
			}
			return fmt.Errorf("unable to poll: %w", err)
		}
		if pollfds[0].Revents != 0 {
			break
		}
		if pollfds[1].Revents != 0 {
			if err := b.handleEvents(); err != nil {
				return err
			}
		}
	}

	return nil
}

func (b *fanotifyBackend) closeFDs() {
	b.mu.Lock()
	defer b.mu.Unlock()
	if b.pipeFDs[0] >= 0 {
		_ = unix.Close(b.pipeFDs[0])
		b.pipeFDs[0] = -1
	}
	if fd := b.pipeWriteFD.Swap(-1); fd >= 0 {
		_ = unix.Close(int(fd))
	}
	b.pipeFDs[1] = -1
	if b.fanotifyFD >= 0 {
		_ = unix.Close(b.fanotifyFD)
		b.fanotifyFD = -1
	}
}

func (b *fanotifyBackend) shutdown() {
	fd := b.pipeWriteFD.Load()
	if fd < 0 {
		return
	}
	_, _ = unix.Write(int(fd), []byte{'X'})
	<-b.endedSignal
}

func (b *fanotifyBackend) subscribe(w *dirWatch) error {
	// Probe FAN_RENAME on the first subscribe using the actual watch
	// directory. FAN_RENAME (Linux 5.17+) yields a single paired event
	// for renames; when unavailable we fall back to FAN_MOVED_FROM/
	// FAN_MOVED_TO which produces two separate events but is otherwise
	// equivalent. The kernel rejects unknown mask bits with EINVAL.
	if b.markMask == 0 {
		if b.noRename {
			b.markMask = fanotifyMarkMaskMovedFromTo
		} else {
			b.markMask = fanotifyMarkMaskRename
			err := unix.FanotifyMark(b.fanotifyFD, fanotifyMarkAddFlags, fanotifyMarkMaskRename, unix.AT_FDCWD, w.dir)
			switch {
			case err == nil:
				// B5: pair the probe Add with a matching Remove. If
				// Remove fails (rare; only EINTR or kernel resource
				// pressure realistically) we leave the probe mark
				// attached for the life of the process, but since
				// markDir below will Add the real mask with the same
				// flags the kernel just merges them. The probe is the
				// only failure path we explicitly retry.
				for {
					rmErr := unix.FanotifyMark(b.fanotifyFD, unix.FAN_MARK_REMOVE|unix.FAN_MARK_ONLYDIR, fanotifyMarkMaskRename, unix.AT_FDCWD, w.dir)
					if rmErr == nil || !errors.Is(rmErr, unix.EINTR) {
						break
					}
				}
			case errors.Is(err, unix.EINVAL), errors.Is(err, unix.EOPNOTSUPP):
				b.markMask = fanotifyMarkMaskMovedFromTo
			}
		}
	}
	if !w.recursive {
		if err := b.markDir(w, w.dir); err != nil {
			return &dirWatchError{
				err:      fmt.Errorf("fanotify_mark on '%s' failed: %w", w.dir, err),
				dirWatch: w,
			}
		}
		return nil
	}
	if err := walkDir(w.dir, true, func(path string, isDir bool) error {
		if !isDir {
			return nil
		}
		if err := b.markDir(w, path); err != nil {
			return &dirWatchError{
				err:      fmt.Errorf("fanotify_mark on '%s' failed: %w", path, err),
				dirWatch: w,
			}
		}
		return nil
	}); err != nil {
		_ = b.closeWatch(w)
		return err
	}
	return nil
}

func (b *fanotifyBackend) markDir(w *dirWatch, path string) error {
	if err := unix.FanotifyMark(b.fanotifyFD, fanotifyMarkAddFlags, b.markMask, unix.AT_FDCWD, path); err != nil {
		return err
	}
	handle, _, err := unix.NameToHandleAt(unix.AT_FDCWD, path, 0)
	if err != nil {
		// Unmark since we can't track this directory without a handle.
		_ = unix.FanotifyMark(b.fanotifyFD, unix.FAN_MARK_REMOVE|unix.FAN_MARK_ONLYDIR, b.markMask, unix.AT_FDCWD, path)
		return fmt.Errorf("name_to_handle_at: %w", err)
	}
	var st unix.Statfs_t
	if err := unix.Statfs(path, &st); err != nil {
		_ = unix.FanotifyMark(b.fanotifyFD, unix.FAN_MARK_REMOVE|unix.FAN_MARK_ONLYDIR, b.markMask, unix.AT_FDCWD, path)
		return fmt.Errorf("statfs: %w", err)
	}
	key := makeFanotifyHandleKey(st.Fsid.Val, handle.Type(), handle.Bytes())
	sub := &fanotifySubscription{path: path, dirWatch: w, key: key}
	b.subscriptions[key] = append(b.subscriptions[key], sub)
	return nil
}

// handleEvents reads and dispatches fanotify events from the fd.
func (b *fanotifyBackend) handleEvents() error {
	buf := b.readBuf
	watchersTouched := b.watchersTouched

	for {
		n, err := unix.Read(b.fanotifyFD, buf)
		if err != nil {
			if errors.Is(err, unix.EAGAIN) || errors.Is(err, unix.EWOULDBLOCK) {
				break
			}
			return fmt.Errorf("Error reading from fanotify: %w", err)
		}
		if n == 0 {
			break
		}

		metaSize := int(unsafe.Sizeof(unix.FanotifyEventMetadata{}))
		data := buf[:n]
		for len(data) >= metaSize {
			meta := (*unix.FanotifyEventMetadata)(unsafe.Pointer(&data[0]))
			if meta.Vers != unix.FANOTIFY_METADATA_VERSION {
				return fmt.Errorf("unsupported fanotify metadata version: %d", meta.Vers)
			}
			eventLen := int(meta.Event_len)
			if eventLen < int(meta.Metadata_len) || eventLen > len(data) {
				break
			}

			// FID mode: fd should be FAN_NOFD, but close if somehow set.
			if meta.Fd >= 0 {
				_ = unix.Close(int(meta.Fd))
			}

			if meta.Mask&unix.FAN_Q_OVERFLOW != 0 {
				b.handleOverflow(watchersTouched)
				data = data[eventLen:]
				continue
			}

			infoData := data[meta.Metadata_len:eventLen]
			primary, renameTo := parseFanotifyDfidNames(infoData)
			if meta.Mask&unix.FAN_RENAME != 0 {
				if primary != nil || renameTo != nil {
					b.handleRenameEvent(meta.Mask, primary, renameTo, watchersTouched)
				}
			} else if primary != nil {
				b.handleParsedEvent(meta.Mask, primary, watchersTouched)
			}
			data = data[eventLen:]
		}
	}

	for w := range watchersTouched {
		w.notify()
	}
	clear(watchersTouched)
	return nil
}

func (b *fanotifyBackend) handleOverflow(touched map[*dirWatch]struct{}) {
	b.mu.Lock()
	defer b.mu.Unlock()
	seen := map[*dirWatch]struct{}{}
	for _, subs := range b.subscriptions {
		for _, s := range subs {
			if _, ok := seen[s.dirWatch]; ok {
				continue
			}
			seen[s.dirWatch] = struct{}{}
			s.dirWatch.events.setError(ErrOverflow)
			touched[s.dirWatch] = struct{}{}
		}
	}
}

func (b *fanotifyBackend) handleRenameEvent(mask uint64, dfidOld *fanotifyDfidName, dfidNew *fanotifyDfidName, touched map[*dirWatch]struct{}) {
	b.mu.Lock()
	defer b.mu.Unlock()

	isDir := mask&unix.FAN_ONDIR != 0

	// Remove from old location.
	if dfidOld != nil && dfidOld.name != "" && dfidOld.name != "." {
		for _, s := range b.subscriptions[dfidOld.key] {
			oldPath := s.path + "/" + dfidOld.name
			// If the renamed item is a dir, drop its subscriptions and
			// all descendant subscriptions. The kernel marks themselves
			// leak when the destination is outside our watched tree:
			// fanotify has no path-independent unmark and we don't
			// keep fds open for marked directories.
			if isDir {
				b.dropSubsForPathAndDescendantsLocked(oldPath)
			}
			s.dirWatch.events.remove(oldPath)
			touched[s.dirWatch] = struct{}{}
		}
	}

	// Create at new location.
	if dfidNew != nil && dfidNew.name != "" && dfidNew.name != "." {
		for _, s := range b.subscriptions[dfidNew.key] {
			newPath := s.path + "/" + dfidNew.name
			s.dirWatch.events.create(newPath)
			if isDir && s.dirWatch.recursive {
				_ = walkDir(newPath, true, func(p string, pIsDir bool) error {
					if !pIsDir {
						return nil
					}
					_ = b.markDir(s.dirWatch, p)
					return nil
				})
			}
			touched[s.dirWatch] = struct{}{}
		}
	}
}

func (b *fanotifyBackend) handleParsedEvent(mask uint64, dfid *fanotifyDfidName, touched map[*dirWatch]struct{}) {
	b.mu.Lock()
	defer b.mu.Unlock()

	// b.subscriptions[key] holds at most one entry per *fanotifySubscription
	// pointer (markDir always appends a fresh struct), so no dedup is
	// necessary.
	for _, s := range b.subscriptions[dfid.key] {
		if b.handleSubscription(mask, dfid, s) {
			touched[s.dirWatch] = struct{}{}
		}
	}
}

func (b *fanotifyBackend) handleSubscription(mask uint64, dfid *fanotifyDfidName, sub *fanotifySubscription) bool {
	w := sub.dirWatch

	// Compute full path. Self-events (name empty or ".") use the
	// watch path directly.
	isSelfEvent := dfid.name == "" || dfid.name == "."
	path := sub.path
	if !isSelfEvent {
		path = sub.path + "/" + dfid.name
	}

	isDir := mask&unix.FAN_ONDIR != 0
	touched := false

	hasDelete := mask&(unix.FAN_DELETE|unix.FAN_MOVED_FROM) != 0
	hasCreate := mask&(unix.FAN_CREATE|unix.FAN_MOVED_TO) != 0

	// Fanotify can merge consecutive events on the same object into a
	// single event with multiple mask bits. When both create and delete
	// bits are set, we can't tell the temporal order from the mask alone.
	// Stat the path: if it exists, the last op was create (delete→create
	// = "update"); if gone, the last op was delete (create→delete =
	// cancel out).
	if hasCreate && hasDelete && !isSelfEvent {
		var st unix.Stat_t
		if unix.Lstat(path, &st) != nil {
			// File was created then deleted: record both so they cancel.
			w.events.create(path)
			w.events.remove(path)
			return true
		}
		// File exists: was deleted then recreated. Fall through to the
		// normal delete-first processing which produces "update".
	}

	// Process delete/move-from FIRST so that a merged DELETE+CREATE
	// coalesces to "update" via the eventList's rapid-recreate logic.
	if mask&(unix.FAN_DELETE|unix.FAN_DELETE_SELF|unix.FAN_MOVED_FROM|unix.FAN_MOVE_SELF) != 0 {
		isSelfMask := mask&(unix.FAN_DELETE_SELF|unix.FAN_MOVE_SELF) != 0
		// Ignore delete/move self events unless this is the watch root.
		if !(isSelfMask && path != w.dir) {
			// If the deleted/moved item is a dir, drop subscriptions
			// for both the path itself and every descendant; otherwise
			// later events for the (now-moved) inodes would be reported
			// against stale paths. For FAN_MOVED_FROM that takes the
			// inode out of our watched tree the kernel mark on the
			// inode itself unfortunately leaks: fanotify has no
			// path-independent way to unmark and the destination is
			// outside everything we can resolve.
			// Self events may not have FAN_ONDIR set (like inotify).
			if isSelfMask || isDir {
				b.dropSubsForPathAndDescendantsLocked(path)
			} else {
				b.dropSubsForPathLocked(path)
			}
			w.events.remove(path)
			touched = true
			// Root-of-watch deletion: the kernel has dropped the mark.
			// Surface ErrWatchTerminated alongside the delete so callers
			// know to clean up; no more events will arrive for w.
			if isSelfMask && path == w.dir {
				w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
			}
		}
	}

	if hasCreate {
		w.events.create(path)
		if isDir && w.recursive {
			_ = walkDir(path, true, func(p string, pIsDir bool) error {
				if !pIsDir {
					return nil
				}
				_ = b.markDir(w, p)
				return nil
			})
		}
		touched = true
	}

	if mask&unix.FAN_MODIFY != 0 {
		w.events.update(path)
		touched = true
	}

	return touched
}

// parseFanotifyDfidNames extracts DFID_NAME info records from the event's
// info record area. Returns a primary record (DFID_NAME or OLD_DFID_NAME)
// and an optional second record (NEW_DFID_NAME, for FAN_RENAME events).
func parseFanotifyDfidNames(data []byte) (primary *fanotifyDfidName, rename *fanotifyDfidName) {
	const (
		infoHdrSize = 4 // fanotify_event_info_header
		fsidSize    = 8 // __kernel_fsid_t
		fhHdrSize   = 8 // file_handle header (handle_bytes + handle_type)
		minBodySize = fsidSize + fhHdrSize
	)
	for offset := 0; offset+infoHdrSize <= len(data); {
		infoType := data[offset]
		infoLen := int(binary.NativeEndian.Uint16(data[offset+2 : offset+4]))
		if infoLen < infoHdrSize || offset+infoLen > len(data) {
			break
		}

		switch infoType {
		case unix.FAN_EVENT_INFO_TYPE_DFID_NAME,
			unix.FAN_EVENT_INFO_TYPE_OLD_DFID_NAME:

			if parsed := parseFanotifyFidRecord(data[offset:offset+infoLen], true); parsed != nil {
				primary = parsed
			}

		case unix.FAN_EVENT_INFO_TYPE_NEW_DFID_NAME:
			if parsed := parseFanotifyFidRecord(data[offset:offset+infoLen], true); parsed != nil {
				rename = parsed
			}

		case unix.FAN_EVENT_INFO_TYPE_DFID:
			// DFID without name: the handle identifies the directory itself.
			// Use as fallback if we haven't found a DFID_NAME record.
			if primary == nil {
				if parsed := parseFanotifyFidRecord(data[offset:offset+infoLen], false); parsed != nil {
					primary = parsed
				}
			}
		}

		if primary != nil && rename != nil {
			return primary, rename
		}

		offset += infoLen
	}
	return primary, rename
}

// parseFanotifyFidRecord parses a single fanotify_event_info_fid record.
func parseFanotifyFidRecord(data []byte, hasName bool) *fanotifyDfidName {
	const (
		infoHdrSize = 4
		fsidSize    = 8
		fhHdrSize   = 8
		minSize     = infoHdrSize + fsidSize + fhHdrSize
	)
	if len(data) < minSize {
		return nil
	}
	body := data[infoHdrSize:]

	var fsid [2]int32
	fsid[0] = int32(binary.NativeEndian.Uint32(body[0:4]))
	fsid[1] = int32(binary.NativeEndian.Uint32(body[4:8]))

	handleBytes := int(binary.NativeEndian.Uint32(body[8:12]))
	handleType := int32(binary.NativeEndian.Uint32(body[12:16]))

	handleStart := fsidSize + fhHdrSize
	if handleStart+handleBytes > len(body) {
		return nil
	}
	handleData := body[handleStart : handleStart+handleBytes]
	key := makeFanotifyHandleKey(fsid, handleType, handleData)

	var name string
	if hasName {
		nameStart := handleStart + handleBytes
		if nameStart < len(body) {
			nameData := body[nameStart:]
			for i, c := range nameData {
				if c == 0 {
					nameData = nameData[:i]
					break
				}
			}
			name = string(nameData)
		}
	}

	return &fanotifyDfidName{key: key, name: name}
}

// dropSubsForPathLocked removes every subscription whose s.path equals
// path, regardless of which fanotify handle key it lives under. Must be
// called with b.mu held.
func (b *fanotifyBackend) dropSubsForPathLocked(path string) {
	for key, list := range b.subscriptions {
		kept := list[:0]
		for _, s := range list {
			if s.path == path {
				continue
			}
			kept = append(kept, s)
		}
		if len(kept) == 0 {
			delete(b.subscriptions, key)
		} else {
			b.subscriptions[key] = kept
		}
	}
}

// dropSubsForPathAndDescendantsLocked removes every subscription whose
// s.path equals path or lives strictly under path. The kernel mark on
// the moved-out inode itself remains active (fanotify provides no
// path-independent unmark) but dropping the bookkeeping prevents later
// events from being reported against the no-longer-valid path.
// Must be called with b.mu held.
func (b *fanotifyBackend) dropSubsForPathAndDescendantsLocked(path string) {
	for key, list := range b.subscriptions {
		kept := list[:0]
		for _, s := range list {
			if s.path == path || (len(s.path) > len(path) && s.path[len(path)] == '/' && s.path[:len(path)] == path) {
				continue
			}
			kept = append(kept, s)
		}
		if len(kept) == 0 {
			delete(b.subscriptions, key)
		} else {
			b.subscriptions[key] = kept
		}
	}
}

func (b *fanotifyBackend) closeWatch(w *dirWatch) error {
	for key, list := range b.subscriptions {
		kept := list[:0]
		removedAny := false
		var removedPath string
		for _, s := range list {
			if s.dirWatch == w {
				removedAny = true
				removedPath = s.path
				continue
			}
			kept = append(kept, s)
		}
		if !removedAny {
			continue
		}
		if len(kept) == 0 {
			// Try to unmark. Skip the call entirely when markMask is
			// still 0 (closeWatch racing with a shutdown that happened
			// before subscribe ever set markMask); fanotify_mark with
			// mask=0 is undocumented. Ignore ENOENT (directory may have
			// been deleted) and EBADF (fanotify fd may already be
			// closed during shutdown).
			if b.markMask != 0 {
				_ = unix.FanotifyMark(b.fanotifyFD,
					unix.FAN_MARK_REMOVE, b.markMask, unix.AT_FDCWD, removedPath)
			}
			delete(b.subscriptions, key)
		} else {
			b.subscriptions[key] = kept
		}
	}
	return nil
}
