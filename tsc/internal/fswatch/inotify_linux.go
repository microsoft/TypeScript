//go:build linux

package fswatch

import (
	"errors"
	"fmt"
	"sync/atomic"
	"unsafe"

	"golang.org/x/sys/unix"
)

// ---------------------------------------------------------------------------
// inotify_linux.go: Linux inotify backend
//
// Uses the kernel's inotify(7) subsystem to watch directory trees. A single
// inotify instance serves all subscriptions for the process lifetime.
//
//	┌───────────────────────────────────────────────────────────┐
//	│                    inotifyBackend                         │
//	│                                                           │
//	│  ┌───────────┐        poll(2)        ┌─────────────────┐  │
//	│  │ pipe[0]   ├──────────────────────►│                 │  │
//	│  │ (wakeup)  │                       │  start()        │  │
//	│  └───────────┘                       │  goroutine      │  │
//	│  ┌───────────┐                       │  (event loop)   │  │
//	│  │ inotify   ├──────────────────────►│                 │  │
//	│  │ fd        │                       └────────┬────────┘  │
//	│  └───────────┘                                │           │
//	│                                      handleEvents()       │
//	│                                               │           │
//	│                                               ▼           │
//	│                               ┌─────────────────────────┐ │
//	│                               │ subscriptions           │ │
//	│                               │ map[wd] → []sub         │ │
//	│                               │  sub.dirWatch.events    │ │
//	│                               └─────────────────────────┘ │
//	└───────────────────────────────────────────────────────────┘
//
// Goroutines and threading:
//   - One long-lived goroutine (start), launched by watcherBase.run(). It
//     owns the poll(2) loop and runs for the process lifetime. All event
//     reading and dispatch (handleEvents, handleEvent, handleSubscription)
//     execute on this goroutine, under b.mu.
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
// WatchDirectory flow:
//  1. Walk the target directory (caller goroutine).
//  2. For every directory found, call inotify_add_watch to obtain a
//     watch descriptor (wd). Map wd → inotifySubscription.
//
// Event dispatch (handleEvents → handleSubscription, on start goroutine):
//   - IN_CREATE / IN_MOVED_TO  → events.create (→ EventUpdate); if the new
//     entry is a directory (IN_ISDIR), recursively walk and watch it.
//   - IN_MODIFY                → events.update.
//   - IN_DELETE* / IN_MOVE*    → events.remove; drop inotify subscriptions
//     for the removed path and any descendants.
//   - IN_Q_OVERFLOW            → set ErrOverflow on every active dirWatch.
//   After processing all buffered events, call dirWatch.notify() on each
//   touched dirWatch to trigger the debouncer.
//
// Shutdown:
//   Write a byte to pipe[1] → poll sees POLLIN on pipe[0] → loop exits →
//   deferred closeFDs closes inotify fd, pipe fds, and signals endedSignal.
// ---------------------------------------------------------------------------

const (
	inotifyMask = unix.IN_CREATE |
		unix.IN_DELETE |
		unix.IN_DELETE_SELF |
		unix.IN_MODIFY |
		unix.IN_MOVE_SELF |
		unix.IN_MOVED_FROM |
		unix.IN_MOVED_TO |
		unix.IN_DONT_FOLLOW |
		unix.IN_ONLYDIR |
		unix.IN_EXCL_UNLINK
	inotifyBufferSize = 8192
)

// inotifySubscription.
type inotifySubscription struct {
	path     string
	dirWatch *dirWatch
	wd       int
}

// inotifyBackend.
type inotifyBackend struct {
	watcherBase

	pipeFDs [2]int
	// pipeWriteFD shadows pipeFDs[1] as an atomic so shutdown (any goroutine)
	// can safely race against the start goroutine's deferred closeFDs.
	// Sentinel -1 once closed.
	pipeWriteFD   atomic.Int32
	inotify       int
	subscriptions map[int][]*inotifySubscription // multimap<wd, sub>
	endedSignal   chan struct{}

	// Persistent buffers reused across handleEvents calls. Only accessed
	// from the start goroutine, so no synchronization needed.
	readBuf         []byte
	watchersTouched map[*dirWatch]struct{}
}

func init() {
	inotifyWatcher.factory = func() watcherImpl { return newInotifyBackend() }
}

func newInotifyBackend() *inotifyBackend {
	b := &inotifyBackend{
		pipeFDs:         [2]int{-1, -1},
		inotify:         -1,
		subscriptions:   map[int][]*inotifySubscription{},
		endedSignal:     make(chan struct{}),
		readBuf:         make([]byte, inotifyBufferSize),
		watchersTouched: make(map[*dirWatch]struct{}),
	}
	b.pipeWriteFD.Store(-1)
	b.watcherBase.init(b)
	return b
}

// start mirrors `inotifyBackend::start`.
func (b *inotifyBackend) start() error {
	// Create a pipe so we can wake the poll(2) loop on shutdown.
	if err := unix.Pipe2(b.pipeFDs[:], unix.O_CLOEXEC|unix.O_NONBLOCK); err != nil {
		return fmt.Errorf("unable to open pipe: %w", err)
	}
	b.pipeWriteFD.Store(int32(b.pipeFDs[1]))
	defer func() {
		b.closeFDs()
		close(b.endedSignal)
	}()
	fd, err := unix.InotifyInit1(unix.IN_NONBLOCK | unix.IN_CLOEXEC)
	if err != nil {
		return fmt.Errorf("unable to initialize inotify: %w", err)
	}
	b.inotify = fd

	pollfds := []unix.PollFd{
		{Fd: int32(b.pipeFDs[0]), Events: unix.POLLIN},
		{Fd: int32(b.inotify), Events: unix.POLLIN},
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

// closeFDs runs in the start goroutine after the poll loop exits. Takes
// b.mu so the writes to b.inotify / b.pipeFDs synchronize-against the
// reads in closeWatch / subscribe (both of which run under b.mu).
func (b *inotifyBackend) closeFDs() {
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
	if b.inotify >= 0 {
		_ = unix.Close(b.inotify)
		b.inotify = -1
	}
}

// shutdown is the equivalent of the destructor's pipe-write+wait.
// Called by removeSharedBackend when the last watch drops. Reads
// the pipe write fd via atomic so it's safe to race against the start
// goroutine's deferred closeFDs.
func (b *inotifyBackend) shutdown() {
	fd := b.pipeWriteFD.Load()
	if fd < 0 {
		return
	}
	_, _ = unix.Write(int(fd), []byte{'X'})
	<-b.endedSignal
}

// subscribe mirrors `inotifyBackend::subscribe`. Called via the watcherBase
// virtual dispatch under b.mu (so it's serialized against handleEvent).
func (b *inotifyBackend) subscribe(w *dirWatch) error {
	if !w.recursive {
		if _, err := b.watchDir(w, w.dir); err != nil {
			return &dirWatchError{
				err:      fmt.Errorf("inotify_add_watch on '%s' failed: %w", w.dir, err),
				dirWatch: w,
			}
		}
		return nil
	}
	if err := walkDir(w.dir, true, func(path string, isDir bool) error {
		if !isDir {
			return nil
		}
		if _, err := b.watchDir(w, path); err != nil {
			return &dirWatchError{
				err:      fmt.Errorf("inotify_add_watch on '%s' failed: %w", path, err),
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

// watchDir registers an inotify watch on path and records the resulting
// subscription. Returns the kernel watch descriptor on success.
func (b *inotifyBackend) watchDir(w *dirWatch, path string) (int, error) {
	wd, err := unix.InotifyAddWatch(b.inotify, path, inotifyMask)
	if err != nil {
		return 0, err
	}
	sub := &inotifySubscription{path: path, dirWatch: w, wd: wd}
	b.subscriptions[wd] = append(b.subscriptions[wd], sub)
	return wd, nil
}

// handleEvents mirrors `inotifyBackend::handleEvents`.
func (b *inotifyBackend) handleEvents() error {
	buf := b.readBuf
	watchersTouched := b.watchersTouched

	for {
		n, err := unix.Read(b.inotify, buf)
		if err != nil {
			if errors.Is(err, unix.EAGAIN) || errors.Is(err, unix.EWOULDBLOCK) {
				break
			}
			return fmt.Errorf("Error reading from inotify: %w", err)
		}
		if n == 0 {
			break
		}
		// Walk the buffer.
		for offset := 0; offset < n; {
			ev := (*unix.InotifyEvent)(unsafe.Pointer(&buf[offset]))
			recordSize := unix.SizeofInotifyEvent + int(ev.Len)
			var name string
			if ev.Len > 0 {
				// Name is NUL-terminated; trim trailing zeros.
				nameBytes := buf[offset+unix.SizeofInotifyEvent : offset+recordSize]
				for i, c := range nameBytes {
					if c == 0 {
						nameBytes = nameBytes[:i]
						break
					}
				}
				name = string(nameBytes)
			}

			if ev.Mask&unix.IN_Q_OVERFLOW != 0 {
				b.mu.Lock()
				for _, subs := range b.subscriptions {
					for _, sub := range subs {
						sub.dirWatch.events.setError(ErrOverflow)
						watchersTouched[sub.dirWatch] = struct{}{}
					}
				}
				b.mu.Unlock()
				offset += recordSize
				continue
			}

			b.handleEvent(ev, name, watchersTouched)
			offset += recordSize
		}
	}
	for w := range watchersTouched {
		w.notify()
	}
	clear(watchersTouched)
	return nil
}

// handleEvent mirrors `inotifyBackend::handleEvent`.
func (b *inotifyBackend) handleEvent(ev *unix.InotifyEvent, name string, touched map[*dirWatch]struct{}) {
	b.mu.Lock()
	defer b.mu.Unlock()

	// b.subscriptions[wd] holds at most one entry per *inotifySubscription
	// pointer (watchDir always appends a fresh struct), so no dedup is
	// necessary; the upstream C++ used an unordered_set keyed by
	// shared_ptr identity but the equivalent Go invariant is structural.
	for _, s := range b.subscriptions[int(ev.Wd)] {
		if b.handleSubscription(ev, name, s) {
			touched[s.dirWatch] = struct{}{}
		}
	}
}

// handleSubscription mirrors `inotifyBackend::handleSubscription`.
func (b *inotifyBackend) handleSubscription(ev *unix.InotifyEvent, name string, sub *inotifySubscription) bool {
	w := sub.dirWatch
	path := sub.path
	isDir := ev.Mask&unix.IN_ISDIR != 0
	if name != "" {
		path = path + "/" + name
	}

	switch {
	case ev.Mask&(unix.IN_CREATE|unix.IN_MOVED_TO) != 0:
		w.events.create(path)
		if isDir && w.recursive {
			_ = walkDir(path, true, func(p string, pIsDir bool) error {
				if !pIsDir {
					return nil
				}
				_, _ = b.watchDir(w, p)
				return nil
			})
		}

	case ev.Mask&unix.IN_MODIFY != 0:
		w.events.update(path)

	case ev.Mask&(unix.IN_DELETE|unix.IN_DELETE_SELF|unix.IN_MOVED_FROM|unix.IN_MOVE_SELF) != 0:
		isSelfEvent := ev.Mask&(unix.IN_DELETE_SELF|unix.IN_MOVE_SELF) != 0
		// Ignore delete/move self events unless this is the watch root.
		if isSelfEvent && path != w.dir {
			return false
		}
		// If deleted item is a dir, drop matching subscriptions.
		// XXX: self events don't have IN_ISDIR set.
		if isSelfEvent || isDir {
			for wd, list := range b.subscriptions {
				kept := list[:0]
				for _, s := range list {
					if s.path == path || (len(s.path) > len(path) && s.path[len(path)] == '/' && s.path[:len(path)] == path) {
						continue
					}
					kept = append(kept, s)
				}
				if len(kept) == 0 {
					_, _ = unix.InotifyRmWatch(b.inotify, uint32(wd))
					delete(b.subscriptions, wd)
				} else {
					b.subscriptions[wd] = kept
				}
			}
		}
		w.events.remove(path)
		// If the watched root itself is gone the kernel has already
		// auto-removed every wd associated with this dirWatch and no
		// further events will fire. Surface ErrWatchTerminated so the
		// caller knows to clean up; the delete event above still
		// flows through the same callback.
		if isSelfEvent && path == w.dir {
			w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
		}
	}
	return true
}

// closeWatch mirrors `inotifyBackend::closeWatch`. Iterates every wd that
// referenced w and removes the matching subscriptions. If a kernel
// InotifyRmWatch fails we keep processing remaining wds and return the
// first error encountered; bailing early would leave the internal state
// half-cleaned and the caller's dirWatch hanging off other wds.
func (b *inotifyBackend) closeWatch(w *dirWatch) error {
	var firstErr error
	for wd, list := range b.subscriptions {
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
			if _, err := unix.InotifyRmWatch(b.inotify, uint32(wd)); err != nil && firstErr == nil {
				firstErr = &dirWatchError{
					err:      fmt.Errorf("unable to remove dirWatch: %w", err),
					dirWatch: w,
				}
			}
			delete(b.subscriptions, wd)
		} else {
			b.subscriptions[wd] = kept
		}
	}
	return firstErr
}
