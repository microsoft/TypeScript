//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"fmt"
	"os"
	"runtime"
	"sync/atomic"
	"syscall"
	"unsafe"

	"golang.org/x/sys/unix"
)

// ---------------------------------------------------------------------------
// fsevents_darwin.go: macOS FSEvents backend (event processing)
//
// Uses Apple's FSEvents API to receive file-level notifications for watched
// directory trees. FSEvents is a high-level, path-based API that watches
// recursively without requiring an fd per file (unlike kqueue). Events are
// coalesced by the kernel and delivered in batches.
//
// This file contains the event classification and stream lifecycle logic.
// The low-level FFI plumbing (cgo-free CoreFoundation/CoreServices calls,
// assembly trampolines, pipe-based callback synchronization) lives in
// fsevents_darwin_ffi.go and the companion .s files.
//
//	┌───────────────────────────────────────────────────────────┐
//	│ fsEventsBackend                                           │
//	│ (no event loop; start() just signals readiness)           │
//	│                                                           │
//	│ subscribe() per directory:                                │
//	│      │                                                    │
//	│      ▼                                                    │
//	│ ┌─────────────────────────────────────────────────────┐   │
//	│ │ fseventsState                                       │   │
//	│ │                                                     │   │
//	│ │  FSEventStream ──► per-stream GCD dispatch queue    │   │
//	│ │  (UseCFTypes | FileEvents = 0x11)                   │   │
//	│ │                                                     │   │
//	│ │  callback fires on GCD thread:                      │   │
//	│ │    ┌─────────────────────────────────────────┐      │   │
//	│ │    │ asm: retain/copy callback payload       │      │   │
//	│ │    │ asm: write(eventPipe) ──────────────►   │      │   │
//	│ │    │                          eventLoop()    │      │   │
//	│ │    │                          goroutine      │      │   │
//	│ │    │                              │          │      │   │
//	│ │    │                     fsEventsCallback()  │      │   │
//	│ │    │ asm: return to FSEvents                 │      │   │
//	│ │    └─────────────────────────────────────────┘      │   │
//	│ └─────────────────────────────────────────────────────┘   │
//	└───────────────────────────────────────────────────────────┘
//
// Goroutines and threading:
//   - FSEvents delivers the raw C callback on a GCD dispatch queue thread
//     (an OS thread managed by libdispatch, not a Go goroutine).
//   - The assembly callback (fsEventsCallbackASM, in the .s files) runs on
//     that GCD thread in the C calling convention. It never enters Go ABI.
//     It retains/copies the callback payload and passes it to Go through
//     eventPipe.
//   - One Go goroutine per stream (eventLoop, in fsevents_darwin_ffi.go)
//     blocks on eventFile.Read(), integrated with Go's netpoll so it parks
//     without consuming an OS thread. When woken by the asm callback, it
//     calls fsEventsCallback() to classify events and post them to the
//     dirWatch's eventList.
//   - subscribe/closeWatch and stream lifecycle (startStream/stopStream)
//     run on the caller's goroutine under watcherBase.mu. Stream teardown
//     uses atomic.Swap on the stream pointer so that only one of
//     (Close, callback's deleted-root path) performs cleanup.
//
// Callback delivery:
//   dirWatch.notify() posts to the shared process-wide debouncer. After a
//   coalescing window (50 ms min / 500 ms max), the debouncer invokes all
//   registered WatchCallbacks on its own dedicated goroutine; never on
//   the GCD thread, the eventLoop goroutine, or the caller's goroutine.
//   On all backends, events matching a WithIgnore function are filtered
//   per-subscriber before delivery.
//
// WatchDirectory flow (caller goroutine):
//   subscribe → startStream: create an FSEventStream with
//   kFSEventStreamEventIdSinceNow and start it on its own serial GCD
//   queue. No directory walk or tree is needed; FSEvents watches
//   recursively via the kernel, and event classification uses only the
//   flags.
//
// Event classification (fsEventsCallback, on eventLoop goroutine):
//   Each batch delivers arrays of paths, flags, and event IDs. The flags
//   bitmask may combine multiple states (created + modified + renamed).
//   Pure removes emit EventDelete with no syscalls. Renames and
//   remove+create combos do one Lstat to check existence (the kernel
//   reports some deletions as renames). Everything else emits EventUpdate
//   with no syscalls.
//
// Overflow:
//   flagMustScanSubDirs → ErrOverflow with detail (user/kernel/too-many).
//
// Root deletion:
//   Detected in the callback; cb.closed is set so future callbacks are
//   no-ops. Stream teardown is deferred to Close.
// ---------------------------------------------------------------------------

// ----- FSEvents flag bits (from FSEvents.h) ------------------------------

const (
	flagMustScanSubDirs = 0x00000001
	flagUserDropped     = 0x00000002
	flagKernelDropped   = 0x00000004
	flagHistoryDone     = 0x00000010

	flagItemCreated        = 0x00000100
	flagItemRemoved        = 0x00000200
	flagItemInodeMetaMod   = 0x00000400
	flagItemRenamed        = 0x00000800
	flagItemModified       = 0x00001000
	flagItemFinderInfoMod  = 0x00002000
	flagItemChangeOwner    = 0x00004000
	flagItemXattrMod       = 0x00008000
	flagItemIsFile         = 0x00010000
	flagItemIsDir          = 0x00020000
	flagItemIsSymlink      = 0x00040000
	flagItemIsHardlink     = 0x00100000
	flagItemIsLastHardlink = 0x00200000
	flagItemCloned         = 0x00400000

	// kFSEventStreamCreateFlagUseCFTypes (0x1) |
	// kFSEventStreamCreateFlagFileEvents (0x10) is hardcoded in the
	// arch-specific assembly trampolines (fsevents_darwin_ffi_{arm64,amd64}.s).

	cfStringEncodingUTF8 = 0x08000100

	// kFSEventStreamEventIdSinceNow == ((FSEventStreamEventId)0xFFFFFFFFFFFFFFFFULL)
	eventIDSinceNow = uint64(0xFFFFFFFFFFFFFFFF)
)

const ignoredFlags = flagItemIsHardlink | flagItemIsLastHardlink |
	flagItemIsSymlink | flagItemIsDir | flagItemIsFile | flagItemCloned

// fsEventStreamContext mirrors the C struct of the same name.
//
//	typedef struct {
//	  CFIndex version;          // signed long, 8 bytes on 64-bit
//	  void   *info;             // pointer
//	  void   *retain;           // pointer
//	  void   *release;          // pointer
//	  void   *copyDescription;  // pointer
//	} FSEventStreamContext;
type fsEventStreamContext struct {
	version         int
	info            uintptr
	retain          uintptr
	release         uintptr
	copyDescription uintptr
}

// fseventsState.
//
// stream is claimed by Close with an atomic Swap. Root deletion is detected in
// the callback, but teardown is deferred to Close because the assembly callback
// is still waiting on the done pipe while fsEventsCallback runs.
type fseventsState struct {
	stream atomic.Uintptr
	cb     *streamCallback
	pinner runtime.Pinner
}

// ----- the watcherImpl -------------------------------------------------------

// fsEventsBackend.
type fsEventsBackend struct {
	watcherBase
}

func init() {
	fseventsWatcher.factory = func() watcherImpl { return newFSEventsBackend() }
}

func newFSEventsBackend() *fsEventsBackend {
	b := &fsEventsBackend{}
	b.watcherBase.init(b)
	return b
}

func (b *fsEventsBackend) start() error {
	b.notifyStarted()
	return nil
}

// checkWatcher mirrors the helper of the same name.
func checkWatcher(w *dirWatch) error {
	info, err := os.Stat(w.physicalDir)
	if err != nil {
		return &dirWatchError{err: err, dirWatch: w}
	}
	if !info.IsDir() {
		return &dirWatchError{err: syscall.ENOTDIR, dirWatch: w}
	}
	return nil
}

var (
	errMissingFSEventsState = errors.New("fsevents: missing state")
	errStreamCreateNull     = errors.New("FSEventStreamCreate returned NULL")
	errStreamStartFailed    = errors.New("error starting FSEvents stream")
)

var (
	errFSEventsUserDropped   = fmt.Errorf("events were dropped by the FSEvents client: %w", ErrOverflow)
	errFSEventsKernelDropped = fmt.Errorf("events were dropped by the kernel: %w", ErrOverflow)
	errFSEventsTooMany       = fmt.Errorf("too many events: %w", ErrOverflow)
)

// startStream creates and starts an FSEventStream on its per-stream
// serial dispatch queue.
func (b *fsEventsBackend) startStream(w *dirWatch, since uint64) error {
	if err := checkWatcher(w); err != nil {
		return err
	}

	state, _ := w.state.(*fseventsState)
	if state == nil {
		return errMissingFSEventsState
	}

	dirCStr := append([]byte(w.physicalDir), 0)
	cfDir := cfStringCreate(0, unsafe.Pointer(&dirCStr[0]), cfStringEncodingUTF8)
	defer cfRelease(cfDir)

	pathsToWatch := cfArrayCreate(0, unsafe.Pointer(&cfDir), 1, 0)
	defer cfRelease(pathsToWatch)

	cb, err := newStreamCallback(w)
	if err != nil {
		return &dirWatchError{err: err, dirWatch: w}
	}
	state.pinner.Pin(cb)
	state.cb = cb

	ctx := fsEventStreamContext{info: uintptr(unsafe.Pointer(cb))}

	stream := fsEventStreamCreate(
		0,
		fsEventsCallbackAsmAddr,
		unsafe.Pointer(&ctx),
		pathsToWatch,
		since,
		0.001,
	)
	if stream == 0 {
		cb.close()
		state.cb = nil
		state.pinner.Unpin()
		return &dirWatchError{err: errStreamCreateNull, dirWatch: w}
	}

	fsEventStreamSetDispatchQueue(stream, cb.queue)
	if fsEventStreamStart(stream) == 0 {
		fsEventStreamInvalidate(stream)
		fsEventStreamRelease(stream)
		cb.close()
		state.cb = nil
		state.pinner.Unpin()
		return &dirWatchError{err: errStreamStartFailed, dirWatch: w}
	}
	fsEventStreamFlushSync(stream)
	state.stream.Store(stream)
	return nil
}

// teardownStream performs the full FSEventStream cleanup. Stop and Invalidate
// prevent new callbacks, waitDispatchQueue waits for callbacks already queued
// on the stream's serial dispatch queue, and cb.close joins the Go event loop
// after it drains payloads already written to the pipe.
func teardownStream(stream uintptr, cb *streamCallback) {
	fsEventStreamStop(stream)
	if cb != nil {
		fsEventStreamInvalidate(stream)
		cb.waitDispatchQueue()
		cb.close()
	} else {
		fsEventStreamInvalidate(stream)
	}
	fsEventStreamRelease(stream)
}

// stopStream tears down a stream if WatchDirectory successfully started one.
// The atomic Swap gates teardown so concurrent or repeated calls are safe:
// only the goroutine that observes a non-zero stream performs the cleanup.
func (b *fsEventsBackend) stopStream(state *fseventsState) {
	if state == nil {
		return
	}
	stream := state.stream.Swap(0)
	if stream == 0 {
		return
	}
	cb := state.cb
	teardownStream(stream, cb)
	state.cb = nil
	state.pinner.Unpin()
}

// subscribe mirrors `fsEventsBackend::subscribe`.
func (b *fsEventsBackend) subscribe(w *dirWatch) error {
	state := &fseventsState{}
	w.state = state
	return b.startStream(w, eventIDSinceNow)
}

// closeWatch mirrors `fsEventsBackend::closeWatch`.
func (b *fsEventsBackend) closeWatch(w *dirWatch) error {
	state, _ := w.state.(*fseventsState)
	w.state = nil
	if state == nil {
		return nil
	}
	b.stopStream(state)
	return nil
}

// fsEventsCallback processes a batch of FSEvents. The payload contains callback
// data retained/copied by the assembly before it returned control to Go.
//
// Called by streamCallback.eventLoop on a per-stream Go goroutine (not the
// dispatch queue thread). The C callback assembly signals the event loop via a
// pipe; see fsevents_darwin_ffi.go.
func fsEventsCallback(cb *streamCallback, payload *fsEventsCallbackPayload) {
	defer payload.close()

	if cb.closed.Load() {
		return
	}

	const (
		flagSize = unsafe.Sizeof(uint32(0))
	)

	if payload == nil || payload.paths == 0 || payload.flags == 0 {
		return
	}

	numEvents := payload.numEvents
	paths := payload.paths
	flags := payload.flags

	w := cb.dirWatch
	deletedRoot := false

	for i := range numEvents {
		flag := *(*uint32)(unsafe.Add(nil, flags+i*flagSize))
		pathRef := cfArrayGetValueAtIndex(paths, int(i))
		path := cfStringToNFC(pathRef)
		if path == "" {
			continue
		}

		isRemoved := flag&flagItemRemoved != 0
		isRenamed := flag&flagItemRenamed != 0
		isCreated := flag&flagItemCreated != 0
		isDone := flag&flagHistoryDone != 0

		if flag&flagMustScanSubDirs != 0 {
			switch {
			case flag&flagUserDropped != 0:
				w.events.setError(errFSEventsUserDropped)
			case flag&flagKernelDropped != 0:
				w.events.setError(errFSEventsKernelDropped)
			default:
				w.events.setError(errFSEventsTooMany)
			}
		}

		if isDone {
			w.notify()
			break
		}

		if flag&^uint32(ignoredFlags) == 0 {
			continue
		}

		// Skip events for the watched directory itself unless it's been
		// removed. fseventsd reports a change on the watched dir when a
		// child is added or removed; subscribers observe changes *within*
		// the directory, not the dir's own metadata churn.
		// (A removal of the dir is still propagated because Watcher
		// relies on it to tear down the stream.)
		rawPath := path
		path = w.displayPath(path)

		if path == w.dir && !isRemoved && !isRenamed {
			continue
		}

		switch {
		case isRemoved && !isCreated:
			// Pure remove, or remove+rename: file is gone.
			w.events.remove(path)
			if path == w.dir {
				deletedRoot = true
			}
		case isRenamed || (isRemoved && isCreated):
			// Ambiguous: rename could mean moved away (delete) or
			// moved in (update); remove+create could mean replaced.
			// Stat to check existence.
			var st unix.Stat_t
			if unix.Lstat(rawPath, &st) != nil {
				w.events.remove(path)
				if path == w.dir {
					deletedRoot = true
				}
			} else {
				w.events.update(path)
			}
		default:
			// Create, modify, or any other flag combo.
			w.events.update(path)
		}
	}

	if deletedRoot {
		// Surface ErrWatchTerminated alongside the delete event so the
		// caller knows no further events will arrive. Stream teardown is
		// still deferred to Close.
		w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
	}

	w.notify()

	if deletedRoot {
		// The watched root was deleted. Mark the callback as closed so
		// future callbacks are no-ops. Stream teardown and pipe cleanup
		// are deferred to Close.
		cb.closed.Store(true)
	}
}
