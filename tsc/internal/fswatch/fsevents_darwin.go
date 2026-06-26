//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"fmt"
	"os"
	"runtime"
	"slices"
	"sort"
	"sync"
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
//	│ subscribe/closeWatch rebuild the shared stream set:       │
//	│      │                                                    │
//	│      ▼                                                    │
//	│ ┌─────────────────────────────────────────────────────┐   │
//	│ │ fseventsStream[]                                    │   │
//	│ │                                                     │   │
//	│ │  each FSEventStream watches up to N paths ────────► │   │
//	│ │  per-stream GCD dispatch queue                      │   │
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
//   - One Go goroutine per stream chunk (eventLoop, in fsevents_darwin_ffi.go)
//     blocks on eventFile.Read(), integrated with Go's netpoll so it parks
//     without consuming an OS thread. When woken by the asm callback, it calls
//     fsEventsCallback() to classify events and route them to matching
//     dirWatch event lists.
//   - subscribe/closeWatch rebuild the stream chunks on the caller's goroutine
//     under watcherBase.mu. Old streams are swapped out before teardown so a
//     callback cannot deadlock against stream teardown while routing events.
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
//   subscribe/closeWatch snapshots active dirWatches and creates one or more
//   FSEventStreams with kFSEventStreamEventIdSinceNow. Each stream receives a
//   chunk of physical watch roots. No directory walk or tree is needed;
//   FSEvents watches recursively via the kernel, and event classification uses
//   only the flags.
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
//   Detected in the callback; the logical watch is marked terminated and
//   receives ErrWatchTerminated. The shared stream remains active for other
//   watches until the owner closes or reconciles the terminated watch.
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

type fseventsState struct {
	terminated atomic.Bool
}

type fseventsStream struct {
	stream atomic.Uintptr
	cb     *streamCallback
	pinner runtime.Pinner
}

// ----- the watcherImpl -------------------------------------------------------

// fsEventsBackend.
type fsEventsBackend struct {
	watcherBase

	mu      sync.Mutex
	watches map[*dirWatch]*fseventsState
	streams []*fseventsStream
}

func init() {
	fseventsWatcher.factory = func() watcherImpl { return newFSEventsBackend() }
}

func newFSEventsBackend() *fsEventsBackend {
	b := &fsEventsBackend{
		watches: make(map[*dirWatch]*fseventsState),
	}
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
	errCFStringCreateNull = errors.New("CFStringCreate returned NULL")
	errCFArrayCreateNull  = errors.New("CFArrayCreate returned NULL")
	errStreamCreateNull   = errors.New("FSEventStreamCreate returned NULL")
	errStreamStartFailed  = errors.New("error starting FSEvents stream")
)

var (
	errFSEventsUserDropped   = fmt.Errorf("events were dropped by the FSEvents client: %w", ErrOverflow)
	errFSEventsKernelDropped = fmt.Errorf("events were dropped by the kernel: %w", ErrOverflow)
	errFSEventsTooMany       = fmt.Errorf("too many events: %w", ErrOverflow)
)

const fseventsPathsPerStream = 512

type fseventsWatchSnapshot struct {
	w     *dirWatch
	state *fseventsState
}

func (b *fsEventsBackend) activeWatchesLocked() []fseventsWatchSnapshot {
	watches := make([]fseventsWatchSnapshot, 0, len(b.watches))
	for w, state := range b.watches {
		if state.terminated.Load() {
			continue
		}
		watches = append(watches, fseventsWatchSnapshot{w: w, state: state})
	}
	return watches
}

func (b *fsEventsBackend) startStreams(watches []fseventsWatchSnapshot) ([]*fseventsStream, error) {
	return startFSEventsStreams(watches, b.startStream)
}

func startFSEventsStreams(watches []fseventsWatchSnapshot, startStream func([]string, []fseventsWatchSnapshot) (*fseventsStream, error)) ([]*fseventsStream, error) {
	if len(watches) == 0 {
		return nil, nil
	}
	seen := make(map[string]struct{}, len(watches))
	paths := make([]string, 0, len(watches))
	for _, watch := range watches {
		path := watch.w.physicalDir
		if _, ok := seen[path]; ok {
			continue
		}
		seen[path] = struct{}{}
		paths = append(paths, path)
	}
	sort.Strings(paths)

	stream, err := startStream(paths, watches)
	if err == nil {
		return []*fseventsStream{stream}, nil
	}

	streams := make([]*fseventsStream, 0, (len(paths)+fseventsPathsPerStream-1)/fseventsPathsPerStream)
	remainingPaths := paths
	for len(remainingPaths) > 0 {
		chunkLen := min(len(remainingPaths), fseventsPathsPerStream)
		chunkPaths := remainingPaths[:chunkLen]
		stream, err := startStream(chunkPaths, watchesForFSEventsPaths(watches, chunkPaths))
		if err != nil {
			stopFSEventsStreams(streams)
			return nil, err
		}
		streams = append(streams, stream)
		remainingPaths = remainingPaths[chunkLen:]
	}
	return streams, nil
}

func watchesForFSEventsPaths(watches []fseventsWatchSnapshot, paths []string) []fseventsWatchSnapshot {
	if len(paths) == 0 {
		return nil
	}
	filtered := make([]fseventsWatchSnapshot, 0, len(watches))
	for _, watch := range watches {
		if _, ok := slices.BinarySearch(paths, watch.w.physicalDir); ok {
			filtered = append(filtered, watch)
		}
	}
	return filtered
}

// startStream creates and starts one FSEventStream watching all supplied paths.
func (b *fsEventsBackend) startStream(paths []string, watches []fseventsWatchSnapshot) (*fseventsStream, error) {
	if len(paths) == 0 {
		return nil, nil
	}

	cfStrings := make([]uintptr, 0, len(paths))
	for _, path := range paths {
		dirCStr := append([]byte(path), 0)
		cfDir := cfStringCreate(0, unsafe.Pointer(&dirCStr[0]), cfStringEncodingUTF8)
		if cfDir == 0 {
			for _, cfString := range cfStrings {
				cfRelease(cfString)
			}
			return nil, errCFStringCreateNull
		}
		cfStrings = append(cfStrings, cfDir)
	}
	defer func() {
		for _, cfString := range cfStrings {
			cfRelease(cfString)
		}
	}()

	pathsToWatch := cfArrayCreate(0, unsafe.Pointer(&cfStrings[0]), len(cfStrings), 0)
	if pathsToWatch == 0 {
		return nil, errCFArrayCreateNull
	}
	defer cfRelease(pathsToWatch)

	cb, err := newStreamCallback(watches)
	if err != nil {
		return nil, err
	}
	state := &fseventsStream{cb: cb}
	state.pinner.Pin(cb)

	ctx := fsEventStreamContext{info: uintptr(unsafe.Pointer(cb))}

	stream := fsEventStreamCreate(
		0,
		fsEventsCallbackAsmAddr,
		unsafe.Pointer(&ctx),
		pathsToWatch,
		eventIDSinceNow,
		0.001,
	)
	if stream == 0 {
		cb.close()
		state.cb = nil
		state.pinner.Unpin()
		return nil, errStreamCreateNull
	}

	fsEventStreamSetDispatchQueue(stream, cb.queue)
	if fsEventStreamStart(stream) == 0 {
		fsEventStreamInvalidate(stream)
		fsEventStreamRelease(stream)
		cb.close()
		state.cb = nil
		state.pinner.Unpin()
		return nil, errStreamStartFailed
	}
	fsEventStreamFlushSync(stream)
	state.stream.Store(stream)
	return state, nil
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

// The atomic Swap gates teardown so concurrent or repeated calls are safe:
// only the goroutine that observes a non-zero stream performs the cleanup.
func stopFSEventsStreams(streams []*fseventsStream) {
	for _, stream := range streams {
		stopFSEventsStream(stream)
	}
}

func stopFSEventsStream(state *fseventsStream) {
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
	return b.subscribeMany([]*dirWatch{w})
}

func (b *fsEventsBackend) subscribeMany(watchesToAdd []*dirWatch) error {
	if len(watchesToAdd) == 0 {
		return nil
	}
	states := make(map[*dirWatch]*fseventsState, len(watchesToAdd))
	for _, w := range watchesToAdd {
		if err := checkWatcher(w); err != nil {
			return err
		}
		states[w] = &fseventsState{}
	}

	b.mu.Lock()
	for w, state := range states {
		w.state = state
		b.watches[w] = state
	}
	watches := b.activeWatchesLocked()
	b.mu.Unlock()

	streams, err := b.startStreams(watches)
	if err != nil {
		b.mu.Lock()
		for w, state := range states {
			if b.watches[w] == state {
				delete(b.watches, w)
				w.state = nil
			}
		}
		b.mu.Unlock()
		return &dirWatchError{err: err, dirWatch: watchesToAdd[0]}
	}

	b.mu.Lock()
	oldStreams := b.streams
	b.streams = streams
	b.mu.Unlock()
	stopFSEventsStreams(oldStreams)
	return nil
}

// closeWatch mirrors `fsEventsBackend::closeWatch`.
func (b *fsEventsBackend) closeWatch(w *dirWatch) error {
	state, _ := w.state.(*fseventsState)
	w.state = nil
	if state == nil {
		return nil
	}
	state.terminated.Store(true)

	b.mu.Lock()
	delete(b.watches, w)
	watches := b.activeWatchesLocked()
	b.mu.Unlock()

	streams, err := b.startStreams(watches)
	if err != nil {
		return err
	}

	b.mu.Lock()
	oldStreams := b.streams
	b.streams = streams
	b.mu.Unlock()
	stopFSEventsStreams(oldStreams)
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

	const (
		flagSize = unsafe.Sizeof(uint32(0))
	)

	if payload == nil || payload.paths == 0 || payload.flags == 0 {
		return
	}

	numEvents := payload.numEvents
	paths := payload.paths
	flags := payload.flags

	watches := cb.watches
	touched := map[*dirWatch]struct{}{}

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
			var overflow error
			switch {
			case flag&flagUserDropped != 0:
				overflow = errFSEventsUserDropped
			case flag&flagKernelDropped != 0:
				overflow = errFSEventsKernelDropped
			default:
				overflow = errFSEventsTooMany
			}
			for _, watch := range watches {
				if watch.state.terminated.Load() {
					continue
				}
				if fseventsOverflowMatches(watch.w, path) {
					watch.w.events.setError(overflow)
					touched[watch.w] = struct{}{}
				}
			}
		}

		if isDone {
			break
		}

		if flag&^uint32(ignoredFlags) == 0 {
			continue
		}

		rawPath := path
		pathExists := false
		pathExistsKnown := false

		for _, watch := range watches {
			if watch.state.terminated.Load() {
				continue
			}
			w := watch.w
			displayPath, ok := fseventsDisplayPath(w, rawPath)
			if !ok {
				continue
			}

			// Skip events for the watched directory itself unless it's been
			// removed. fseventsd reports a change on the watched dir when a
			// child is added or removed; subscribers observe changes *within*
			// the directory, not the dir's own metadata churn.
			// (A removal of the dir is still propagated because Watcher
			// relies on it to tear down the stream.)
			if displayPath == w.dir && !isRemoved && !isRenamed {
				continue
			}

			switch {
			case isRemoved && !isCreated:
				w.events.remove(displayPath)
				if displayPath == w.dir {
					watch.state.terminated.Store(true)
					w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
				}
			case isRenamed || (isRemoved && isCreated):
				if !pathExistsKnown {
					var st unix.Stat_t
					pathExists = unix.Lstat(rawPath, &st) == nil
					pathExistsKnown = true
				}
				if pathExists {
					w.events.update(displayPath)
				} else {
					w.events.remove(displayPath)
					if displayPath == w.dir {
						watch.state.terminated.Store(true)
						w.events.setError(fmt.Errorf("%w: watched directory removed", ErrWatchTerminated))
					}
				}
			default:
				w.events.update(displayPath)
			}
			touched[w] = struct{}{}
		}
	}

	for w := range touched {
		w.notify()
	}
}

func fseventsDisplayPath(w *dirWatch, rawPath string) (string, bool) {
	if isInDirectoryOrSelf(w.physicalDir, rawPath) {
		return w.displayPath(rawPath), true
	}
	if w.physicalDir != w.dir && isInDirectoryOrSelf(w.dir, rawPath) {
		return rawPath, true
	}
	return "", false
}

func fseventsOverflowMatches(w *dirWatch, rawPath string) bool {
	if isInDirectoryOrSelf(w.physicalDir, rawPath) || isInDirectoryOrSelf(rawPath, w.physicalDir) {
		return true
	}
	return w.physicalDir != w.dir && (isInDirectoryOrSelf(w.dir, rawPath) || isInDirectoryOrSelf(rawPath, w.dir))
}
