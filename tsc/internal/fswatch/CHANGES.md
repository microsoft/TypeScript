# Changes from upstream `@parcel/watcher`

This Go port started from the C++
[`@parcel/watcher`](https://github.com/parcel-bundler/watcher) (v2.5.6,
`8926bb8`) and has diverged significantly. This document covers API differences,
simplifications, new features, and bugfixes.

## API differences

### Method naming

| C++ / JS               | Go                                          |
| ---------------------- | ------------------------------------------- |
| `subscribe(dir, fn)`   | `WatchDirectory(dir, fn, opts...)`          |
| —                      | `WatchDirectories([]WatchDirectoryRequest)` |
| —                      | `WatchFile(path, fn)`                       |
| `unsubscribe(dir, fn)` | `w.Close()`                                 |

### Recursion default

C++ `subscribe` is always recursive. Go's `WatchDirectory` is **non-recursive by
default**, watching only direct children. Pass `WithRecursive()` to watch the
entire tree. This matches TypeScript's `watchDirectory(path, cb, recursive?)`
where recursive is opt-in.

### Symlinked watch roots

When `WatchDirectory` is called with a symlink or reparse point to a directory,
Go follows the link for the OS subscription but reports events under the
caller-provided path. This matches TypeScript/Node's behavior for watch roots
while keeping the logical paths stable for callers.

Userspace recursive traversal still does not follow symlinked descendant
directories.

### Event kinds

C++ has three event kinds: create, update, delete. Go has two: **`EventUpdate`**
and **`EventDelete`**. File creation is reported as `EventUpdate`. `tsc --watch`
doesn't distinguish between a file being created and a file being modified; both
mean "something changed, rebuild." This also sidesteps a C++ FSEvents bug where
pre-existing files are misclassified as "created" because the internal tree
starts empty at subscribe time.

### Watch options

Go adds functional options not present in the C++ API:

- **`WithRecursive()`**: opt in to recursive directory tree watching.
- **`WithIgnore(func(path string) bool)`**: filter events per-subscriber before
  delivery. Return true to drop.

### File watching

`WatchFile(path, fn)` watches a single file by watching its parent directory
non-recursively and filtering events to the target path. Multiple file watches
in the same directory share one OS watch. Not available in the C++ API.

### Batch directory watching

`WatchDirectories` registers multiple directory watches in one call. It has the
same logical behavior as repeated `WatchDirectory` calls, but lets backends batch
the underlying OS subscription work. On macOS this avoids rebuilding the shared
FSEvents stream once per logical watch during large watch reconciliations.

### Error delivery

C++ delivers errors via a separate error callback or return value. Go delivers
errors through the same `WatchCallback(events, err)` with sentinel errors:

- `ErrOverflow`: recoverable, the watch stays active.
- `ErrWatchTerminated`: terminal, call `Close()` to clean up.

`ErrUnavailable` is returned directly from `WatchDirectory`/`WatchFile` (not
through the callback) when the watcher is not supported on the current platform.

## Simplifications

### No in-memory directory tree

C++ maintains an in-memory `DirTree` for every subscription on every backend,
storing path, type, and mtime for every watched file. The tree serves two
purposes: mtime-based event dedup (suppressing events when the mtime hasn't
changed) and create-vs-update classification (if a path is in the tree it's an
update, otherwise it's a create).

Go removes the tree entirely on inotify, fanotify, Windows, and FSEvents. With
mtime tracking removed and only two event kinds (update and delete), the tree
became write-only on those backends: populated during setup and event handling
but never read from. Event classification relies on kernel flags instead of stat
calls, eliminating O(events) syscalls from the hot path. kqueue needs a
path-to-fd mapping (kqueue identifies events by fd, not path), but uses a flat
map holding only path and isDir.

C++ also maintains a separate lazily-populated `DirTree` for FSEvents, used for
create/update classification. Because the tree starts empty at subscribe time,
pre-existing files aren't in it, and the first modification of any pre-existing
file is misclassified as "create" instead of "update." Go's FSEvents backend
classifies events using only the kernel-provided flags. Pure
create/remove/modify cases need zero syscalls; only the ambiguous-flags case
(multiple flags set) does one `Lstat` to check existence.

### No attribute events

C++ watches `IN_ATTRIB` (inotify), `FAN_ATTRIB` (fanotify), and
`FILE_NOTIFY_CHANGE_ATTRIBUTES` (Windows). Go removes all three from the watch
masks. `chmod`, `chown`, and other metadata-only changes don't trigger events.
kqueue still receives `NOTE_ATTRIB` (needed for truncate on some BSDs), but the
events are delivered as `EventUpdate` without special handling.

### Simpler event coalescing

With only two event kinds (update, delete), the `eventList` coalescing logic is
simpler:

- `create + delete` within one batch cancels out (the entry is skipped).
- `delete + create` becomes update (the rapid delete+recreate pattern).
- `update + delete` yields delete.
- `delete + update` yields delete (a bare `update` does not resurrect a deleted
  entry; only an explicit `create` does).

### Per-backend debouncer

Upstream uses one process-wide `Debounce::getShared()` singleton that batches
events for every `Watcher` in the process. This is a fine choice for
parcel-watcher's setting: Node consumers serialize through the libuv event loop
anyway, so spawning multiple debounce threads wouldn't buy any downstream
parallelism.

Go can handle concurrent work cheaply, so the Go port creates one debouncer per
backend (inotify, fanotify, kqueue, fsevents, windows) instead of one per
process. Each backend's debouncer is created lazily on first subscribe and
serves only that backend's `dirWatch`es, so a slow user callback on one backend
can't starve event delivery on any of the others. In practice most callers will
only ever use one backend (`Default()`), so this mainly matters for processes
that mix backends, but the cost of the split is essentially nothing.

### Shared FSEvents streams

Upstream opens one macOS FSEventStream per subscription. Go's FSEvents backend
shares streams across all logical directory watches in a backend instance. The
fast path attempts one stream containing every active physical watch root; if
that stream cannot be started, the backend retries with bounded path chunks.
Events from shared streams are routed back to matching logical watches by path,
so non-recursive and per-subscriber ignore semantics are preserved while using
far fewer system-wide FSEvents stream slots. When many sibling watches are
consolidated under one recursive parent watch, each callback still keeps its own
logical root, physical root, event-ID cutoff, and termination state, so
late-added watches don't receive older queued events and symlinked watch roots
continue reporting caller-visible paths.

## New backends

**fanotify** (Linux, kernel ≥ 5.13) is the default on Linux when available. It
uses FID-based event reporting, avoiding the inotify per-user watch limit
entirely. Written from scratch rather than ported from the upstream
[PR #180](https://github.com/parcel-bundler/watcher/pull/180), which has several
bugs (see below). The backend runtime-probes `FAN_RENAME` (Linux 5.17+) and
falls back to `FAN_MOVED_FROM`/`FAN_MOVED_TO`.

## Pure Go, no cgo

The C++ library requires a C++ compiler and platform-specific build
configuration. The Go port is pure Go on all platforms:

- **macOS FSEvents**: CoreFoundation/CoreServices calls via
  `//go:cgo_import_dynamic` and hand-written assembly trampolines (amd64 and
  arm64), following the pattern from Go's `crypto/x509/internal/macos`. The
  FSEvents C callback runs on a libdispatch (GCD) thread, not a Go goroutine. An
  assembly shim, staying entirely in C calling convention, retains the CFArray
  of paths, allocates a per-callback payload on the C heap, copies the flags and
  event ID arrays into it, and writes the payload pointer to the stream's event
  pipe, waking a dedicated Go event-loop goroutine that classifies the events
  and frees the payload. The shim then returns immediately, so the dispatch
  thread never enters Go ABI and does not wait for Go-side event classification.
  Each FSEventStream has its own serial GCD dispatch queue and event pipe, so
  callbacks for different streams run concurrently without contention: a stuck
  callback for one stream cannot back up callbacks for any other stream behind
  it. Teardown invalidates the stream and uses a `dispatch_sync_f` barrier on
  the stream's serial queue before closing the pipe, releasing the queue, and
  unpinning the callback state.
- **Windows**: direct `x/sys/windows` syscalls.
- **Linux/BSD**: direct `x/sys/unix` syscalls.

Cross-compilation works without cgo:
`CGO_ENABLED=0 GOOS=darwin GOARCH=arm64 go build ./...`

## Bugfixes from upstream C++

### 1. Windows: dropped create event when GetFileAttributesEx fails

`ReadDirectoryChangesW` reports `FILE_ACTION_ADDED` for files that may vanish
before processing. C++ guards the event inside the attribute lookup success
check, silently dropping it. Go always emits the event.

### 2. Windows: race between subscribe and ReadDirectoryChangesW

C++ queues an APC that eventually arms the watch. A filesystem operation between
`subscribe()` returning and the APC firing is missed. Go arms the first
`ReadDirectoryChangesW` synchronously before returning.

### 3. kqueue: TOCTOU race and early-return in compareDir

C++ emits a create event before confirming the file can be opened. If it
vanishes, a phantom create is queued. Additionally, `watchDir` failure returns
from the entire `compareDir`, skipping delete detection for other files.

### 4. Event coalescing: create+delete+create yields wrong result

C++ clears `isDeleted` without clearing `isCreated`, so a create+delete+create
sequence produces a spurious "create" instead of the intended "update."

### 5. Event drain race: getEvents + clear are separate locks

C++ calls `getEvents()` then `clear()`, each independently locking. Events
inserted between the two calls are silently lost. Go uses an atomic `drain()`
that snapshots and clears under a single lock.

### 6. inotify: IN_Q_OVERFLOW silently skipped

C++ skips overflow events without notifying subscribers. Go delivers
`ErrOverflow` to all active watches.

### 7. inotify: descendant watches not cleaned on directory deletion

C++ only removes exact-match watches when a directory is deleted. Watches for
descendant paths remain and may receive stale events if watch descriptors are
reused.

### 8. kqueue: mtime guard suppresses NOTE_WRITE on coarse-mtime filesystems

C++ guards all `NOTE_WRITE | NOTE_ATTRIB | NOTE_EXTEND` events behind an mtime
check. On OpenBSD FFS (1-second mtime granularity), rapid writes share the same
mtime and are suppressed.

### 9. Windows: readTree follows symlinked directories

C++ checks `FILE_ATTRIBUTE_DIRECTORY` without excluding
`FILE_ATTRIBUTE_REPARSE_POINT`, causing symlinks and junctions to be traversed.

### 10. kqueue: delete/create coalescing race and fd leak

When a file is deleted and recreated, kqueue may deliver `NOTE_WRITE` on the
parent before `NOTE_DELETE` on the file. C++ processes these in order, missing
the create. Separately, deleted fds are erased from the map but never closed.

### 11. kqueue: tryRewatchLocked race for directories

On OpenBSD, `RemoveAll(dir)` can deliver `NOTE_DELETE` for a directory while
`rmdir` is still in progress. `tryRewatchLocked` sees the directory still exists
via `Lstat` and emits a spurious "update" instead of "delete." Go skips
`tryRewatchLocked` for directories entirely.

### 12. FSEvents: empty tree misclassifies updates as creates

C++ maintains a lazily-populated `DirTree` for FSEvents. Pre-existing files
aren't in the tree at subscribe time, so the first modification is classified as
"create" instead of "update."

## Bugfixes from upstream fanotify PR

The upstream [PR #180](https://github.com/parcel-bundler/watcher/pull/180) adds
a fanotify backend to the C++ library. Go's fanotify backend was written from
scratch and avoids the following issues in the C++ PR:

- **FAN_Q_OVERFLOW silently skipped.** C++ skips the event; Go delivers
  `ErrOverflow`.
- **Descendant watches not cleaned.** Same exact-match-only bug as inotify.
- **Unchecked lstat/stat return values.** C++ feeds uninitialized stat data to
  `tree->add()` on rapid create+delete. Go guards all stat calls.
- **No merged-event disambiguation.** C++ processes `FAN_CREATE` before
  `FAN_DELETE` in an if/else chain, so a merged create+delete always emits a
  spurious create. Go stats the path to determine temporal order.
- **No runtime FAN_RENAME probing.** C++ uses compile-time `#ifdef`; Go probes
  at runtime and falls back gracefully.
