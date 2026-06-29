//go:build windows

package fswatch

import (
	"errors"
	"fmt"
	"sync"
	"syscall"
	"unsafe"

	"golang.org/x/sys/windows"
)

// ---------------------------------------------------------------------------
// windows.go: Windows ReadDirectoryChangesW backend
//
// Uses the Win32 ReadDirectoryChangesW API with overlapped (asynchronous)
// I/O to monitor directory trees. Unlike the Unix backends, there is no
// shared event loop; each watch owns its own goroutine that
// independently polls for directory changes.
//
//	┌──────────────────────────────────────────────────────────────┐
//	│  windowsBackend                                              │
//	│  (no event loop; start() just signals readiness)             │
//	│                                                              │
//	│  subscribe() per directory:                                  │
//	│       │                                                      │
//	│       ▼                                                      │
//	│  ┌───────────────────────────────────────────────────────┐   │
//	│  │ windowsSubscription                                   │   │
//	│  │                                                       │   │
//	│  │  handle ← CreateFile(dir, FILE_FLAG_OVERLAPPED)       │   │
//	│  │                                                       │   │
//	│  │  run() goroutine:                                     │   │
//	│  │    ┌───────────────────────────────┐                  │   │
//	│  │    │ ReadDirectoryChangesW (async) │◄──────────┐      │   │
//	│  │    └───────────────┬───────────────┘           │      │   │
//	│  │                    ▼                           │      │   │
//	│  │    ┌───────────────────────────────┐           │      │   │
//	│  │    │ WaitForSingleObject(event)    │           │      │   │
//	│  │    └───────────────┬───────────────┘           │      │   │
//	│  │                    ▼                           │      │   │
//	│  │    ┌───────────────────────────────┐           │      │   │
//	│  │    │ GetOverlappedResult           │           │      │   │
//	│  │    └───────────────┬───────────────┘           │      │   │
//	│  │                    ▼                           │      │   │
//	│  │    ┌───────────────────────────────┐           │      │   │
//	│  │    │ Walk FILE_NOTIFY_INFORMATION  │           │      │   │
//	│  │    │ chain → processOne()          ├───────────┘      │   │
//	│  │    └───────────────────────────────┘                  │   │
//	│  │                                                       │   │
//	│  │  stop: stopCh → CancelIoEx → run() exits              │   │
//	│  │  cleanup: deferred CloseHandle → doneCh closed        │   │
//	│  └───────────────────────────────────────────────────────┘   │
//	└──────────────────────────────────────────────────────────────┘
//
// Goroutines and threading:
//   - One goroutine per watch (run). It blocks in WaitForSingleObject
//     waiting for ReadDirectoryChangesW completions. processCompletion and
//     processOne execute on this goroutine. There is no shared event loop.
//   - subscribe runs on the caller's goroutine. It opens the directory handle,
//     arms the first ReadDirectoryChangesW, and spawns run().
//   - closeWatch runs on the caller's goroutine. It closes stopCh, which
//     triggers CancelIoEx (from a helper goroutine inside run's wait), waking
//     the run goroutine so it can exit cleanly.
//   - fatal() spawns a separate goroutine for handleWatcherError to avoid
//     deadlock: handleWatcherError → closeWatch → wait(doneCh), but doneCh
//     is only closed when run() returns. The indirection lets run() exit first.
//
// Callback delivery:
//   dirWatch.notify() posts to the shared process-wide debouncer. After a
//   coalescing window (50 ms min / 500 ms max), the debouncer invokes all
//   registered WatchCallbacks on its own dedicated goroutine; never on
//   the caller's goroutine or the per-watch goroutine.
//
// WatchDirectory flow:
//  1. Open the directory with CreateFile (FILE_FLAG_BACKUP_SEMANTICS |
//     FILE_FLAG_OVERLAPPED) on the caller's goroutine.
//  2. Arm the first ReadDirectoryChangesW synchronously so that any
//     filesystem operation after WatchDirectory returns is guaranteed to be
//     observed.
//  3. Spawn the run() goroutine.
//
// Event dispatch (processCompletion / processOne, on run goroutine):
//  1. Wait for the overlapped read to complete (WaitForSingleObject).
//  2. Arm the next ReadDirectoryChangesW immediately (double-buffering).
//  3. Walk the FILE_NOTIFY_INFORMATION linked list:
//     - FILE_ACTION_ADDED / RENAMED_NEW_NAME  → events.create (→ EventUpdate)
//     - FILE_ACTION_MODIFIED                  → events.update (→ EventUpdate)
//     - FILE_ACTION_REMOVED / RENAMED_OLD_NAME → events.remove + tree.remove
//  4. Call dirWatch.notify() to trigger the debouncer.
//
// Error recovery:
//   - ERROR_OPERATION_ABORTED → normal shutdown (CancelIoEx was called).
//   - ERROR_INVALID_PARAMETER → shrink buffer to 64 KB (network share limit).
//   - ERROR_NOTIFY_ENUM_DIR  → ErrOverflow (too many changes queued).
//   - ERROR_ACCESS_DENIED    → check if the watched dir was deleted.
//
// Shutdown:
//   close(stopCh) → CancelIoEx cancels in-flight IO → run() goroutine
//   exits → deferred CloseHandle closes the directory handle → doneCh closed.
// ---------------------------------------------------------------------------

var (
	errGetFileInfo         = errors.New("could not get file information")
	errReadChanges         = errors.New("failed to read changes")
	errGetOverlappedResult = errors.New("GetOverlappedResult failed")
	errUnknown             = errors.New("unknown error")
)

const (
	defaultBufSize = 1024 * 1024
	networkBufSize = 64 * 1024

	notifyChangeFilter = windows.FILE_NOTIFY_CHANGE_FILE_NAME |
		windows.FILE_NOTIFY_CHANGE_DIR_NAME |
		windows.FILE_NOTIFY_CHANGE_SIZE |
		windows.FILE_NOTIFY_CHANGE_LAST_WRITE
)

// windowsBackend.
type windowsBackend struct {
	watcherBase
}

func init() {
	windowsWatcher.factory = func() watcherImpl { return newWindowsBackend() }
}

func newWindowsBackend() *windowsBackend {
	b := &windowsBackend{}
	b.watcherBase.init(b)
	return b
}

// start notifies that the watcherImpl is ready. Each watch owns
// its own goroutine, so there's no shared event loop to start.
func (b *windowsBackend) start() error {
	b.notifyStarted()
	return nil
}

// windowsSubscription.
type windowsSubscription struct {
	mu          sync.Mutex
	watcherImpl *windowsBackend
	dirWatch    *dirWatch
	handle      windows.Handle
	stopped     bool
	stopCh      chan struct{}
	doneCh      chan struct{}
	bufBytes    int
	first       *windowsRead
}

type windowsRead struct {
	buf        []byte
	overlapped windows.Overlapped
	event      windows.Handle
}

func newWindowsSubscription(watcherImpl *windowsBackend, w *dirWatch) (*windowsSubscription, error) {
	pathPtr, err := windows.UTF16PtrFromString(w.physicalDir)
	if err != nil {
		return nil, &dirWatchError{err: err, dirWatch: w}
	}
	h, err := windows.CreateFile(
		pathPtr,
		windows.FILE_LIST_DIRECTORY,
		windows.FILE_SHARE_READ|windows.FILE_SHARE_WRITE|windows.FILE_SHARE_DELETE,
		nil,
		windows.OPEN_EXISTING,
		windows.FILE_FLAG_BACKUP_SEMANTICS|windows.FILE_FLAG_OVERLAPPED,
		0,
	)
	if err != nil {
		return nil, &dirWatchError{err: fmt.Errorf("invalid handle: %w", err), dirWatch: w}
	}
	var info windows.ByHandleFileInformation
	if err := windows.GetFileInformationByHandle(h, &info); err != nil {
		_ = windows.CloseHandle(h)
		return nil, &dirWatchError{err: errGetFileInfo, dirWatch: w}
	}
	if info.FileAttributes&windows.FILE_ATTRIBUTE_DIRECTORY == 0 {
		_ = windows.CloseHandle(h)
		return nil, &dirWatchError{err: syscall.ENOTDIR, dirWatch: w}
	}
	return &windowsSubscription{
		watcherImpl: watcherImpl,
		dirWatch:    w,

		handle:   h,
		stopCh:   make(chan struct{}),
		doneCh:   make(chan struct{}),
		bufBytes: defaultBufSize,
	}, nil
}

func (s *windowsSubscription) beginRead() (*windowsRead, error) {
	s.mu.Lock()
	if s.stopped {
		s.mu.Unlock()
		return nil, nil
	}
	bufSize := s.bufBytes
	s.mu.Unlock()

	req := &windowsRead{buf: make([]byte, bufSize)}
	ev, err := windows.CreateEvent(nil, 1, 0, nil)
	if err != nil {
		return nil, fmt.Errorf("CreateEvent: %w", err)
	}
	req.event = ev
	req.overlapped.HEvent = ev

	var bytesReturned uint32
	err = windows.ReadDirectoryChanges(
		s.handle,
		&req.buf[0],
		uint32(len(req.buf)),
		s.dirWatch.recursive, // recursive
		notifyChangeFilter,
		&bytesReturned,
		&req.overlapped,
		0,
	)
	if err != nil {
		_ = windows.CloseHandle(ev)
		return nil, &dirWatchError{err: errReadChanges, dirWatch: s.dirWatch}
	}
	return req, nil
}

func (r *windowsRead) wait(s *windowsSubscription) (uint32, error, error) {
	stopWait := make(chan struct{})
	go func() {
		select {
		case <-s.stopCh:
			_ = windows.CancelIoEx(s.handle, &r.overlapped)
		case <-stopWait:
			// Do nothing; wait completed normally.
		}
	}()
	_, waitErr := windows.WaitForSingleObject(r.event, windows.INFINITE)
	close(stopWait)
	var bytes uint32
	completionErr := windows.GetOverlappedResult(s.handle, &r.overlapped, &bytes, false)
	_ = windows.CloseHandle(r.event)
	return bytes, waitErr, completionErr
}

// run is the per-watch goroutine. It loops on ReadDirectoryChangesW
// until the watch is stopped or an unrecoverable error occurs.
//
// We close the directory handle here in a defer (not in stop()) to
// guarantee that any in-flight ReadDirectoryChangesW has completed and
// GetOverlappedResult has returned before the handle becomes invalid.
// Closing the handle from another goroutine while we're mid-syscall on
// it is undefined behavior on Windows.
func (s *windowsSubscription) run() {
	defer close(s.doneCh)
	defer func() { _ = windows.CloseHandle(s.handle) }()
	if s.first == nil {
		// subscribe always arms the initial read before spawning run.
		// Guard the invariant rather than silently producing a watch
		// that delivers neither events nor errors if it ever breaks.
		s.fatal(&dirWatchError{err: errors.New("fswatch: windows: missing initial read"), dirWatch: s.dirWatch})
		return
	}
	current := s.first
	s.first = nil
	for {
		bytes, waitErr, gErr := current.wait(s)
		if waitErr != nil && gErr != nil {
			s.fatal(&dirWatchError{err: errGetOverlappedResult, dirWatch: s.dirWatch})
			return
		}

		s.mu.Lock()
		if s.stopped {
			s.mu.Unlock()
			return
		}
		s.mu.Unlock()

		if gErr != nil {
			if shouldStop := s.processCompletion(gErr, current.buf, bytes); shouldStop {
				return
			}
			next, err := s.beginRead()
			if err != nil {
				s.fatal(err)
				return
			}
			if next == nil {
				return
			}
			current = next
			continue
		}

		next, err := s.beginRead()
		if err != nil {
			s.fatal(err)
			return
		}
		if next == nil {
			return
		}
		if shouldStop := s.processCompletion(nil, current.buf, bytes); shouldStop {
			return
		}
		current = next
	}
}

// processCompletion mirrors the body of `Watch::processEvents` for
// the cases that translate cleanly to Go's overlapped wrapper.
func (s *windowsSubscription) processCompletion(callErr error, buf []byte, bytes uint32) (stop bool) {
	if callErr != nil {
		switch {
		case errors.Is(callErr, windows.ERROR_OPERATION_ABORTED):
			return true
		case errors.Is(callErr, windows.ERROR_INVALID_PARAMETER):
			s.mu.Lock()
			s.bufBytes = networkBufSize
			s.mu.Unlock()
			return false
		case errors.Is(callErr, windows.ERROR_NOTIFY_ENUM_DIR):
			s.dirWatch.events.setError(ErrOverflow)
			s.dirWatch.notify()
			return false
		case errors.Is(callErr, windows.ERROR_ACCESS_DENIED):
			// Possibly the watched dir was deleted; check and handle.
			pathPtr, _ := windows.UTF16PtrFromString(s.dirWatch.physicalDir)
			attrs, err := windows.GetFileAttributes(pathPtr)
			if err != nil || attrs == windows.INVALID_FILE_ATTRIBUTES || attrs&windows.FILE_ATTRIBUTE_DIRECTORY == 0 {
				s.dirWatch.events.remove(s.dirWatch.dir)
				s.dirWatch.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
				s.dirWatch.notify()
				s.stop()
				return true
			}
			fallthrough
		default:
			s.fatal(&dirWatchError{err: errUnknown, dirWatch: s.dirWatch})
			return true
		}
	}

	// Walk the FILE_NOTIFY_INFORMATION chain.
	offset := uint32(0)
	if bytes == 0 {
		bytes = uint32(len(buf))
	}
	for offset < bytes {
		fni := (*windows.FileNotifyInformation)(unsafe.Pointer(&buf[offset]))
		nameLen := int(fni.FileNameLength) / 2
		// The FileName field is a flexible array; reslice.
		base := unsafe.Pointer(&fni.FileName)
		nameSlice := unsafe.Slice((*uint16)(base), nameLen)
		name := windows.UTF16ToString(nameSlice)

		s.processOne(fni.Action, name)

		if fni.NextEntryOffset == 0 {
			break
		}
		offset += fni.NextEntryOffset
	}
	s.dirWatch.notify()
	return false
}

func (s *windowsSubscription) processOne(action uint32, name string) {
	path := s.dirWatch.dir + "\\" + name
	watchPath := s.dirWatch.physicalDir + "\\" + name
	switch action {
	case windows.FILE_ACTION_ADDED, windows.FILE_ACTION_RENAMED_NEW_NAME:
		// Always emit the event, even if the file is already gone by the
		// time we look it up. The kernel told us it was added, and a
		// subsequent REMOVED needs to find this entry in the eventList so
		// the create+delete pair coalesces away.
		s.dirWatch.events.create(path)
	case windows.FILE_ACTION_MODIFIED:
		if pathPtr, err := windows.UTF16PtrFromString(watchPath); err == nil {
			var data windows.Win32FileAttributeData
			if err := windows.GetFileAttributesEx(pathPtr, windows.GetFileExInfoStandard, (*byte)(unsafe.Pointer(&data))); err == nil {
				if data.FileAttributes&windows.FILE_ATTRIBUTE_DIRECTORY == 0 {
					s.dirWatch.events.update(path)
				}
			}
		}
	case windows.FILE_ACTION_REMOVED, windows.FILE_ACTION_RENAMED_OLD_NAME:
		s.dirWatch.events.remove(path)
	}
}

// fatal is invoked when the run goroutine hits an unrecoverable error.
// handleWatcherError eventually calls closeWatch which waits on doneCh,
// but doneCh isn't closed until run() returns. Calling handleWatcherError
// synchronously from inside run() would deadlock. Spawn a goroutine to do
// the cleanup so run() can exit and unblock the wait.
func (s *windowsSubscription) fatal(err error) {
	werr := &dirWatchError{err: err, dirWatch: s.dirWatch}
	go s.watcherImpl.handleWatcherError(werr)
	s.stop()
}

func (s *windowsSubscription) stopLocked() {
	if s.stopped {
		return
	}
	s.stopped = true
	close(s.stopCh)
	// Cancel any in-flight IO so the wait returns; the run goroutine
	// closes the handle in its deferred cleanup once the IO has fully
	// finished and GetOverlappedResult has returned.
	_ = windows.CancelIoEx(s.handle, nil)
}

func (s *windowsSubscription) stop() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.stopLocked()
}

// subscribe mirrors `windowsBackend::subscribe`.
func (b *windowsBackend) subscribe(w *dirWatch) error {
	sub, err := newWindowsSubscription(b, w)
	if err != nil {
		return err
	}
	// Arm the first ReadDirectoryChangesW synchronously so that any file
	// operation a caller performs after subscribe returns is guaranteed
	// to be observed. Doing this in run() would race the spawning
	// goroutine with the caller's first filesystem op, occasionally
	// missing the initial create event or seeing it as a stray modify.
	first, err := sub.beginRead()
	if err != nil {
		_ = windows.CloseHandle(sub.handle)
		return err
	}
	sub.first = first
	w.state = sub
	go sub.run()
	return nil
}

// closeWatch mirrors `windowsBackend::closeWatch`. Signals the watch
// goroutine to stop and waits for it to finish; that way the directory
// handle is guaranteed to be closed before this returns, so a follow-on
// operation (e.g. immediately re-watching, deleting the directory) sees
// a clean slate.
func (b *windowsBackend) closeWatch(w *dirWatch) error {
	sub, _ := w.state.(*windowsSubscription)
	w.state = nil
	if sub == nil {
		return nil
	}
	sub.stop()
	<-sub.doneCh
	return nil
}

// shutdown mirrors `windowsBackend::~windowsBackend`.
func (b *windowsBackend) shutdown() {
	// Nothing to do; each watch owns its goroutine and is stopped
	// by closeWatch.
}
