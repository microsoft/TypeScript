package fswatch

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"slices"
	"strings"
	"sync"
	"syscall"

	"github.com/microsoft/typescript-go/internal/nativepath"
)

var errNilCallback = errors.New("fswatch: callback must not be nil")

// errRootPath is returned by WatchFile when the supplied path is a
// filesystem root with no parent directory to watch.
var errRootPath = errors.New("fswatch: cannot watch a root path")

// errNotAbsolute is returned by [Watcher.WatchDirectory] and
// [Watcher.WatchFile] when the supplied path is not absolute.
var errNotAbsolute = errors.New("fswatch: path must be absolute")

// ErrOverflow indicates that the kernel event queue overflowed and
// some filesystem changes were missed. The watch remains
// active; further events will continue to be delivered. Callers
// should treat this as a signal to rescan the watched directory.
var ErrOverflow = errors.New("fswatch: event overflow; some changes were missed")

// ErrWatchTerminated indicates that the watch was terminated due to
// an unrecoverable error (e.g. the watched directory was deleted or
// the watch descriptor was revoked). No further events will be
// delivered. Call Close to release remaining state.
var ErrWatchTerminated = errors.New("fswatch: watch terminated")

// ErrUnavailable indicates that a requested watcher is not
// available on the current platform.
var ErrUnavailable = errors.New("fswatch: watcher not available on this platform")

// Watcher represents a filesystem watching implementation.
// Use one of the constructor functions ([Inotify], [FSEvents], [Kqueue],
// [Windows]) to obtain a value, or [Default] for the platform default.
//
// All watchers exist on every platform. Subscribing with a watcher that
// is not supported on the current OS returns [ErrUnavailable].
type Watcher interface {
	// Name returns a stable identifier ("inotify", "fsevents", "kqueue",
	// "windows").
	Name() string
	// Available reports whether this watcher works on the current OS.
	Available() bool
	// HasFastRecursiveBackend reports whether this watcher supports efficient
	// recursive watching without requiring a full userspace tree walk. This is
	// true for Windows (ReadDirectoryChangesW subtree mode) and macOS FSEvents
	// (inherently recursive), and false for all other backends.
	HasFastRecursiveBackend() bool
	// WatchDirectory watches dir for changes, calling fn with batched
	// events. By default, only direct children are watched. Use
	// [WithRecursive] to watch the entire directory tree.
	// dir must be an absolute path to an existing directory. If dir is a
	// symlink or reparse point to a directory, the OS subscription follows
	// the target directory but delivered event paths remain rooted at dir.
	// Userspace recursive traversal does not follow symlinked descendant
	// directories.
	// Returns [ErrUnavailable] if the watcher is not supported on
	// the current platform.
	WatchDirectory(dir string, fn WatchCallback, opts ...WatchOption) (Watch, error)
	// WatchDirectories watches multiple directories as a batch. It has the
	// same semantics as calling [Watcher.WatchDirectory] for each request, but
	// lets backends arm the underlying OS watches once for the whole batch.
	// Returned watches are in the same order as requests.
	WatchDirectories(requests []WatchDirectoryRequest) ([]Watch, error)
	// WatchFile watches a single file for changes, calling fn with
	// batched events. path must be an absolute path. The file does not
	// need to exist at subscribe time; its creation will be reported.
	// The parent directory must exist.
	//
	// Multiple WatchFile calls for files in the same directory
	// share a single OS watch on the parent directory.
	//
	// If the parent directory is deleted, [ErrWatchTerminated] is
	// delivered and the watch is dead. Unlike TypeScript's
	// watchFile (which falls back to polling for missing entries),
	// there is no automatic recovery. Callers that need to survive
	// parent directory deletion should handle [ErrWatchTerminated]
	// and re-subscribe when the directory is recreated.
	//
	// Returns [ErrUnavailable] if the watcher is not supported on
	// the current platform.
	WatchFile(path string, fn WatchCallback) (Watch, error)
	unexported()
}

// WatchOption configures a watch.
type WatchOption interface {
	applyWatchOption(opts *watchOptions)
}

// WatchDirectoryRequest describes one directory subscription in a
// [Watcher.WatchDirectories] batch.
type WatchDirectoryRequest struct {
	Dir      string
	Callback WatchCallback
	Options  []WatchOption
}

type watchOptions struct {
	ignore    func(path string) bool
	recursive bool
}

type ignoreOption struct {
	fn func(path string) bool
}

func (o ignoreOption) applyWatchOption(opts *watchOptions) {
	opts.ignore = o.fn
}

// WithIgnore returns a [WatchOption] that filters events before delivery.
// If the function returns true for a path, events for that path are
// silently dropped. The filtering is per-subscriber; multiple watches
// on the same directory may have different ignore functions.
func WithIgnore(fn func(path string) bool) WatchOption {
	return ignoreOption{fn: fn}
}

type recursiveOption struct{}

func (o recursiveOption) applyWatchOption(opts *watchOptions) {
	opts.recursive = true
}

// WithRecursive returns a [WatchOption] that enables recursive watching
// of the entire directory tree. Without this option,
// [Watcher.WatchDirectory] watches only direct children of dir.
//
// In recursive mode, events for all descendants at any depth are
// delivered. On inotify/fanotify, a watch descriptor is added for
// every subdirectory. On kqueue, an fd is opened for every entry.
// On Windows, bWatchSubtree=TRUE is passed to ReadDirectoryChangesW.
// On FSEvents, the kernel is inherently recursive.
func WithRecursive() WatchOption {
	return recursiveOption{}
}

// Watch represents a live watch. Close stops watching
// and releases resources. It is idempotent.
type Watch interface {
	Close() error
	unexported()
}

// WatchCallback receives batched filesystem events. Rapid changes
// are coalesced before delivery.
//
// For a given Watch, the callback is never invoked concurrently
// with itself. It runs on a library goroutine, not the caller's.
//
// When err is non-nil, use [errors.Is] to check for [ErrOverflow]
// (recoverable) or [ErrWatchTerminated] (terminal).
type WatchCallback func(events []Event, err error)

// Package-level watcher instances. Platform init() functions set the factory.
var (
	inotifyWatcher  = &watcher{name: "inotify"}
	fseventsWatcher = &watcher{name: "fsevents"}
	kqueueWatcher   = &watcher{name: "kqueue"}
	windowsWatcher  = &watcher{name: "windows"}
	fanotifyWatcher = &watcher{name: "fanotify"}
)

// AllWatchers returns a fresh slice listing every watcher backend the package
// knows about. Use [Watcher.Available] to check which ones work on the current
// OS.
func AllWatchers() []Watcher {
	return []Watcher{
		inotifyWatcher,
		fseventsWatcher,
		kqueueWatcher,
		windowsWatcher,
		fanotifyWatcher,
	}
}

// Inotify returns the inotify watcher (Linux).
func Inotify() Watcher { return inotifyWatcher }

// FSEvents returns the FSEvents watcher (macOS).
func FSEvents() Watcher { return fseventsWatcher }

// Kqueue returns the kqueue watcher (macOS, FreeBSD, and other BSDs).
func Kqueue() Watcher { return kqueueWatcher }

// Windows returns the ReadDirectoryChangesW watcher (Windows).
func Windows() Watcher { return windowsWatcher }

// Fanotify returns the fanotify watcher (Linux, kernel ≥ 5.13).
func Fanotify() Watcher { return fanotifyWatcher }

// Default returns the recommended watcher for the current OS.
func Default() Watcher {
	switch runtime.GOOS {
	case "linux":
		if Fanotify().Available() {
			return Fanotify()
		}
		return Inotify()
	case "darwin":
		if FSEvents().Available() {
			return FSEvents()
		}
		return Kqueue()
	case "windows":
		return Windows()
	case "freebsd", "openbsd", "netbsd", "dragonfly":
		return Kqueue()
	default:
		return &watcher{name: "unsupported"}
	}
}

// watcher is the concrete implementation of [Watcher]. Each platform
// watcher is a package-level *watcher whose factory is set by the
// platform's init() function.
type watcher struct {
	name       string
	mu         sync.Mutex
	impl       watcherImpl
	factory    func() watcherImpl // nil if not available on this platform
	dirWatches map[string]*dirWatch
	debounce   *debounce // lazily created in getOrCreateDirWatch
	sequence   func() uint64
}

const recursiveConsolidateThreshold = 10

func (w *watcher) Name() string    { return w.name }
func (w *watcher) String() string  { return w.name }
func (w *watcher) Available() bool { return w.factory != nil }
func (w *watcher) unexported()     {}

// HasFastRecursiveBackend implements [Watcher.HasFastRecursiveBackend].
func (w *watcher) HasFastRecursiveBackend() bool {
	switch w.name {
	case "windows", "fsevents":
		return true
	default:
		return false
	}
}

func (w *watcher) canShareRecursiveDirWatches() bool {
	// TODO: Re-enable this for Windows once coalesced recursive watches have
	// more real-world bake time.
	return w.name == "fsevents"
}

func (w *watcher) getImpl() (watcherImpl, error) {
	w.mu.Lock()
	if w.impl != nil {
		impl := w.impl
		w.mu.Unlock()
		return impl, nil
	}
	factory := w.factory
	w.mu.Unlock()

	if factory == nil {
		return nil, ErrUnavailable
	}

	impl := factory()
	if err := impl.run(); err != nil {
		return nil, err
	}

	w.mu.Lock()
	if w.impl != nil {
		w.mu.Unlock()
		impl.shutdown()
		return w.impl, nil
	}
	w.impl = impl
	w.mu.Unlock()
	return impl, nil
}

func (w *watcher) keyForDirWatch(dir string, recursive bool) string {
	if recursive {
		return dir + "\x00recursive"
	}
	return dir
}

func (w *watcher) findCoveringRecursiveWatchLocked(dir string, physicalDir string) *dirWatch {
	var best *dirWatch
	for _, dw := range w.dirWatches {
		if !dw.recursive || !isInDirectoryOrSelf(dw.dir, dir) || !isInDirectoryOrSelf(dw.physicalDir, physicalDir) {
			continue
		}
		if best == nil || len(dw.dir) > len(best.dir) {
			best = dw
		}
	}
	return best
}

func (w *watcher) findConsolidationDirLocked(dir string, physicalDir string) string {
	if !w.canShareRecursiveDirWatches() {
		return ""
	}
	parent := filepath.Dir(dir)
	for parent != dir && parent != "." {
		if filepath.Dir(parent) == parent {
			break
		}
		physicalParent := physicalDirFor(parent)
		if !isInDirectoryOrSelf(physicalParent, physicalDir) {
			return ""
		}
		count := 1
		for _, dw := range w.dirWatches {
			if isInDirectoryOrSelf(parent, dw.dir) && isInDirectoryOrSelf(physicalParent, dw.physicalDir) {
				count++
				if count >= recursiveConsolidateThreshold {
					return parent
				}
			}
		}
		next := filepath.Dir(parent)
		if next == parent {
			break
		}
		dir = parent
		parent = next
	}
	return ""
}

func (w *watcher) getOrCreateDirWatch(dir string, physicalDir string, recursive bool) *dirWatch {
	w.mu.Lock()
	defer w.mu.Unlock()
	if w.dirWatches == nil {
		w.dirWatches = make(map[string]*dirWatch)
	}
	if w.debounce == nil {
		w.debounce = newDebounce()
	}

	if w.canShareRecursiveDirWatches() {
		if dw := w.findCoveringRecursiveWatchLocked(dir, physicalDir); dw != nil {
			return dw
		}
		if consolidationDir := w.findConsolidationDirLocked(dir, physicalDir); consolidationDir != "" {
			dir = consolidationDir
			physicalDir = physicalDirFor(dir)
			recursive = true
			if dw := w.findCoveringRecursiveWatchLocked(dir, physicalDir); dw != nil {
				return dw
			}
		}
	}

	key := w.keyForDirWatch(dir, recursive)
	if dw, ok := w.dirWatches[key]; ok {
		return dw
	}
	dw := newDirWatch(dir, physicalDir, w.debounce)
	dw.sequence = w.sequence
	dw.recursive = recursive
	w.dirWatches[key] = dw
	return dw
}

func (w *watcher) removeDirWatch(dw *dirWatch) {
	w.mu.Lock()
	defer w.mu.Unlock()
	key := w.keyForDirWatch(dw.dir, dw.recursive)
	if existing, ok := w.dirWatches[key]; ok && existing == dw {
		delete(w.dirWatches, key)
		dw.destroyDebounce()
	}
}

func (w *watcher) WatchDirectory(dir string, fn WatchCallback, opts ...WatchOption) (Watch, error) {
	watches, err := w.WatchDirectories([]WatchDirectoryRequest{{
		Dir:      dir,
		Callback: fn,
		Options:  opts,
	}})
	if err != nil {
		return nil, err
	}
	return watches[0], nil
}

func (w *watcher) WatchDirectories(requests []WatchDirectoryRequest) ([]Watch, error) {
	if !w.Available() {
		return nil, ErrUnavailable
	}
	if len(requests) == 0 {
		return nil, nil
	}

	type preparedWatch struct {
		dw        *dirWatch
		id        uint64
		recursive bool
		dir       string
	}
	prepared := make([]preparedWatch, 0, len(requests))
	uniqueDirWatches := make([]*dirWatch, 0, len(requests))
	seenDirWatches := make(map[*dirWatch]struct{}, len(requests))
	rollback := func() {
		for i := len(prepared) - 1; i >= 0; i-- {
			p := prepared[i]
			p.dw.unwatch(p.id)
			p.dw.unref(w)
		}
	}

	for _, request := range requests {
		dir := request.Dir
		fn := request.Callback
		if fn == nil {
			rollback()
			return nil, errNilCallback
		}
		dir = filepath.Clean(dir)
		if !filepath.IsAbs(dir) {
			rollback()
			return nil, errNotAbsolute
		}
		dir = canonicalizePath(dir)
		if w.canShareRecursiveDirWatches() {
			if err := validateWatchDirectory(dir); err != nil {
				rollback()
				return nil, err
			}
		}
		physicalDir := physicalDirFor(dir)

		var sopts watchOptions
		for _, o := range request.Options {
			o.applyWatchOption(&sopts)
		}

		dw := w.getOrCreateDirWatch(dir, physicalDir, sopts.recursive)
		id, _ := dw.watch(dir, physicalDir, sopts.recursive, fn, sopts.ignore)
		prepared = append(prepared, preparedWatch{dw: dw, id: id, recursive: sopts.recursive, dir: dir})
		if _, ok := seenDirWatches[dw]; !ok {
			seenDirWatches[dw] = struct{}{}
			uniqueDirWatches = append(uniqueDirWatches, dw)
		}
	}

	impl, err := w.getImpl()
	if err != nil {
		rollback()
		return nil, err
	}
	if err := impl.watchAddMany(uniqueDirWatches); err != nil {
		rollback()
		return nil, err
	}

	watches := make([]Watch, len(prepared))
	for i, p := range prepared {
		watches[i] = &watch{w: w, dw: p.dw, impl: impl, id: p.id}
	}
	return watches, nil
}

func validateWatchDirectory(dir string) error {
	info, err := os.Stat(dir)
	if err != nil {
		return err
	}
	if !info.IsDir() {
		return syscall.ENOTDIR
	}
	return nil
}

func (w *watcher) WatchFile(path string, fn WatchCallback) (Watch, error) {
	if fn == nil {
		return nil, errNilCallback
	}
	if !w.Available() {
		return nil, ErrUnavailable
	}
	path = filepath.Clean(path)
	if !filepath.IsAbs(path) {
		return nil, errNotAbsolute
	}
	path = canonicalizePath(path)
	dir := filepath.Dir(path)
	if dir == path {
		return nil, errRootPath
	}

	return w.WatchDirectory(dir, fileCallback(path, fn))
}

// fileCallback wraps a WatchCallback so it only sees events for the
// specific target path. Errors are always forwarded (with any matching
// events delivered alongside) so callers don't lose overflow signals
// just because their target wasn't in the same batch.
func fileCallback(target string, fn WatchCallback) WatchCallback {
	return func(events []Event, err error) {
		var filtered []Event
		for _, e := range events {
			if e.Path == target {
				filtered = append(filtered, e)
			}
		}
		if len(filtered) > 0 || err != nil {
			fn(filtered, err)
		}
	}
}

type watch struct {
	mu        sync.Mutex
	w         *watcher
	dw        *dirWatch
	impl      watcherImpl
	id        uint64
	cancelled bool
}

func (s *watch) Close() error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.cancelled {
		return nil
	}
	s.cancelled = true
	last := s.dw.unwatch(s.id)
	if last {
		s.impl.watchRemove(s.dw)
		s.dw.unref(s.w)
	}
	return nil
}

func (s *watch) unexported() {}

// watcherImpl is the internal interface implemented by each platform watcher.
type watcherImpl interface {
	start() error
	run() error
	shutdown()

	watchAdd(w *dirWatch) error
	watchAddMany(watches []*dirWatch) error
	watchRemove(w *dirWatch)
	handleWatcherError(err *dirWatchError)

	subscribe(w *dirWatch) error
	closeWatch(w *dirWatch) error
}

// watcherBase provides shared watch-tracking and lifecycle logic.
// Concrete backends embed it and override subscribe/closeWatch/start.
type watcherBase struct {
	mu            sync.Mutex
	subscriptions map[*dirWatch]struct{}
	started       chan struct{}
	startErr      error

	self watcherImpl // back-reference for virtual dispatch
}

func (b *watcherBase) init(self watcherImpl) {
	b.self = self
	b.subscriptions = make(map[*dirWatch]struct{})
	b.started = make(chan struct{})
}

func (b *watcherBase) notifyStarted() {
	select {
	case <-b.started:
		// Do nothing; already started.
	default:
		close(b.started)
	}
}

func (b *watcherBase) shutdown() {}

func (b *watcherBase) run() error {
	go func() {
		defer func() {
			if r := recover(); r != nil {
				err, ok := r.(error)
				if !ok {
					err = fmt.Errorf("%v", r)
				}
				b.handleStartError(err)
			}
		}()
		if err := b.self.start(); err != nil {
			b.handleStartError(err)
		}
	}()
	<-b.started
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.startErr
}

func (b *watcherBase) handleStartError(err error) {
	b.mu.Lock()
	b.startErr = err
	subs := make([]*dirWatch, 0, len(b.subscriptions))
	for w := range b.subscriptions {
		subs = append(subs, w)
	}
	b.mu.Unlock()
	for _, w := range subs {
		w.notifyError(err)
	}
	b.notifyStarted()
}

func (b *watcherBase) watchAdd(w *dirWatch) error {
	return b.watchAddMany([]*dirWatch{w})
}

func (b *watcherBase) watchAddMany(watches []*dirWatch) error {
	b.mu.Lock()
	toAdd := make([]*dirWatch, 0, len(watches))
	for _, w := range watches {
		if _, ok := b.subscriptions[w]; ok {
			continue
		}
		toAdd = append(toAdd, w)
	}
	if len(toAdd) == 0 {
		b.mu.Unlock()
		return nil
	}

	if subscriber, ok := b.self.(interface {
		subscribeMany(watches []*dirWatch) error
	}); ok {
		if err := subscriber.subscribeMany(toAdd); err != nil {
			b.mu.Unlock()
			return err
		}
		for _, w := range toAdd {
			b.subscriptions[w] = struct{}{}
		}
		b.mu.Unlock()
		return nil
	}

	added := make([]*dirWatch, 0, len(toAdd))
	for _, w := range toAdd {
		if err := b.self.subscribe(w); err != nil {
			for _, addedWatch := range added {
				delete(b.subscriptions, addedWatch)
				_ = b.self.closeWatch(addedWatch)
			}
			b.mu.Unlock()
			return err
		}
		b.subscriptions[w] = struct{}{}
		added = append(added, w)
	}
	b.mu.Unlock()
	return nil
}

func (b *watcherBase) watchRemove(w *dirWatch) {
	b.mu.Lock()
	if _, ok := b.subscriptions[w]; !ok {
		b.mu.Unlock()
		return
	}
	delete(b.subscriptions, w)
	_ = b.self.closeWatch(w)
	b.mu.Unlock()
}

func (b *watcherBase) handleWatcherError(werr *dirWatchError) {
	b.watchRemove(werr.dirWatch)
	werr.dirWatch.notifyError(fmt.Errorf("%w: %w", ErrWatchTerminated, werr))
}

// ----- dirWatch: per-directory watch state -------------------------

type callback struct {
	id               uint64
	dir              string
	physicalDir      string
	watchDir         string
	watchPhysicalDir string
	recursive        bool
	fn               WatchCallback
	ignore           func(path string) bool
	sinceSeq         uint64
	terminal         error
	delivered        bool
}

// dirWatchError associates an error with a specific directory watch.
type dirWatchError struct {
	err      error
	dirWatch *dirWatch
}

func (e *dirWatchError) Error() string { return e.err.Error() }
func (e *dirWatchError) Unwrap() error { return e.err }

// dirWatch holds per-directory state: pending events, registered callbacks,
// and a reference to the shared debouncer. Each watched directory has one.
type dirWatch struct {
	// dir is the caller-visible watch root used in delivered event paths.
	dir string
	// physicalDir is the path passed to OS watcher APIs. It differs from dir
	// when dir or an ancestor is a symlink or reparse point to a directory.
	physicalDir string
	recursive   bool
	events      eventList

	// state stores per-directory platform-specific bookkeeping (fsevents, windows).
	state any
	// sequence returns a backend event sequence cutoff for new logical callbacks.
	sequence func() uint64

	mu        sync.Mutex
	callbacks []callback
	debounce  *debounce
	nextCBID  uint64
}

func newDirWatch(dir string, physicalDir string, db *debounce) *dirWatch {
	dw := &dirWatch{dir: dir, physicalDir: physicalDir}
	dw.debounce = db
	dw.debounce.add(dw, func() { dw.triggerCallbacks() })
	return dw
}

// physicalDirFor returns the physical path to watch for dir. If dir, or an
// ancestor of dir, is a symlink or reparse point, events are subscribed on its
// realpath while callbacks still use dir.
func physicalDirFor(dir string) string {
	realpath, err := nativepath.Realpath(dir)
	if err != nil {
		return dir
	}
	if realpath == dir {
		return dir
	}
	return canonicalizePath(filepath.Clean(realpath))
}

// displayPath maps a physical event path back under the caller-visible
// watch root.
func (dw *dirWatch) displayPath(watchPath string) string {
	return rebasePath(watchPath, dw.physicalDir, dw.dir)
}

// physicalPath maps a caller-visible path to the physical watched root.
func (dw *dirWatch) physicalPath(displayPath string) string {
	return rebasePath(displayPath, dw.dir, dw.physicalDir)
}

// rebasePath replaces the from root in path with to, preserving any child
// suffix. Prefix matches must end at a path separator so sibling paths like
// "/foo2" are not rebased from "/foo".
func rebasePath(path string, from string, to string) string {
	if from == to {
		return path
	}
	if path == from {
		return to
	}
	if !strings.HasPrefix(path, from) {
		return path
	}
	suffix := path[len(from):]
	if len(from) > 0 && os.IsPathSeparator(from[len(from)-1]) {
		return joinPathSuffix(to, suffix)
	}
	if len(suffix) == 0 || !os.IsPathSeparator(suffix[0]) {
		return path
	}
	return joinPathSuffix(to, suffix)
}

func joinPathSuffix(root string, suffix string) string {
	if suffix == "" {
		return root
	}
	if os.IsPathSeparator(suffix[0]) {
		if len(root) > 0 && os.IsPathSeparator(root[len(root)-1]) {
			return root + suffix[1:]
		}
		return root + suffix
	}
	if len(root) > 0 && os.IsPathSeparator(root[len(root)-1]) {
		return root + suffix
	}
	return root + string(filepath.Separator) + suffix
}

func (dw *dirWatch) destroyDebounce() {
	dw.mu.Lock()
	db := dw.debounce
	dw.debounce = nil
	dw.mu.Unlock()
	if db != nil {
		db.remove(dw)
	}
}

func (dw *dirWatch) notify() {
	dw.mu.Lock()
	hasPendingCBs := slices.ContainsFunc(dw.callbacks, func(cb callback) bool {
		return !cb.delivered
	})
	hasTerminal := slices.ContainsFunc(dw.callbacks, func(cb callback) bool {
		return cb.terminal != nil && !cb.delivered
	})
	hasEvents := dw.events.size() > 0
	hasError := dw.events.hasError()
	db := dw.debounce
	dw.mu.Unlock()

	if hasPendingCBs && (hasEvents || hasError || hasTerminal) && db != nil {
		db.trigger()
	}
}

func (dw *dirWatch) notifyError(err error) {
	dw.mu.Lock()
	cbs := slices.Clone(dw.callbacks)
	dw.callbacks = nil
	dw.mu.Unlock()
	for _, cb := range cbs {
		cb.fn(nil, err)
	}
}

func (dw *dirWatch) triggerCallbacks() {
	dw.mu.Lock()
	hasError := dw.events.hasError()
	hasEvents := dw.events.size() > 0
	cbs := make([]callback, 0, len(dw.callbacks))
	hasTerminal := false
	for _, cb := range dw.callbacks {
		if cb.delivered {
			continue
		}
		if cb.terminal != nil {
			hasTerminal = true
		}
		cbs = append(cbs, cb)
	}
	if len(cbs) == 0 {
		if hasEvents || hasError {
			_, _ = dw.events.drain()
		}
		dw.mu.Unlock()
		return
	}
	if !hasEvents && !hasError && !hasTerminal {
		dw.mu.Unlock()
		return
	}
	startSeqs := make([]uint64, len(cbs))
	for i, cb := range cbs {
		startSeqs[i] = cb.sinceSeq
	}
	eventsByCallback, err := dw.events.drainForSequences(startSeqs)
	for _, cb := range cbs {
		if cb.terminal == nil {
			continue
		}
		for i := range dw.callbacks {
			if dw.callbacks[i].id == cb.id {
				dw.callbacks[i].delivered = true
				break
			}
		}
	}
	dw.mu.Unlock()

	for i, cb := range cbs {
		cbEvents := eventsByCallback[i]
		if cb.ignore != nil || !cb.recursive || cb.dir != dw.dir {
			filtered := make([]Event, 0, len(cbEvents))
			for _, e := range cbEvents {
				e = cb.mapEvent(e)
				if cb.ignore != nil && cb.ignore(e.Path) {
					continue
				}
				if cb.dir != dw.dir && !e.includedWatchRoot && e.Path == cb.dir && e.Kind == EventUpdate {
					continue
				}
				if cb.recursive {
					if cb.dir != dw.dir && !isInDirectoryOrSelf(cb.dir, e.Path) {
						continue
					}
				} else if !isDirectChild(cb.dir, e.Path) && !(cb.dir != dw.dir && e.Path == cb.dir) {
					continue
				}
				filtered = append(filtered, e)
			}
			cbEvents = filtered
		}
		cbErr := err
		if cb.terminal != nil {
			cbErr = cb.terminal
		}
		if len(cbEvents) > 0 || cbErr != nil {
			cb.fn(cbEvents, cbErr)
		}
	}
}

func (cb callback) mapEvent(e Event) Event {
	if cb.physicalDir != "" && cb.physicalDir != cb.dir {
		physicalPath := cb.eventPhysicalPath(e.Path)
		if isInDirectoryOrSelf(cb.physicalDir, physicalPath) {
			e.Path = rebasePath(physicalPath, cb.physicalDir, cb.dir)
		}
	}
	return e
}

func (cb callback) eventPhysicalPath(path string) string {
	if cb.watchPhysicalDir != "" && cb.watchDir != "" && cb.watchPhysicalDir != cb.watchDir && isInDirectoryOrSelf(cb.watchDir, path) {
		return rebasePath(path, cb.watchDir, cb.watchPhysicalDir)
	}
	return path
}

func (dw *dirWatch) terminateCallbacksForDeletedRoot(path string, seq uint64, err error) bool {
	dw.mu.Lock()
	defer dw.mu.Unlock()
	changed := false
	for i := range dw.callbacks {
		cb := &dw.callbacks[i]
		if cb.delivered || cb.terminal != nil || cb.sinceSeq >= seq {
			continue
		}
		physicalPath := cb.eventPhysicalPath(path)
		if isInDirectoryOrSelf(path, cb.dir) || (cb.physicalDir != cb.dir && isInDirectoryOrSelf(physicalPath, cb.physicalDir)) {
			cb.terminal = err
			changed = true
		}
	}
	return changed
}

func isInDirectoryOrSelf(dir, path string) bool {
	if dir == "" {
		return false
	}
	if path == dir {
		return true
	}
	if !strings.HasPrefix(path, dir) {
		return false
	}
	rest := path[len(dir):]
	if len(rest) == 0 {
		return false
	}
	if os.IsPathSeparator(dir[len(dir)-1]) {
		return true
	}
	return os.IsPathSeparator(rest[0])
}

// isDirectChild reports whether path is an immediate child of dir.
// Both paths must be absolute. Returns false for path == dir.
func isDirectChild(dir, path string) bool {
	if !strings.HasPrefix(path, dir) {
		return false
	}
	rest := path[len(dir):]
	if len(rest) == 0 {
		return false
	}
	if rest[0] != '/' && rest[0] != filepath.Separator {
		return false
	}
	rest = rest[1:]
	return len(rest) > 0 && !strings.ContainsRune(rest, '/') && !strings.ContainsRune(rest, filepath.Separator)
}

func (dw *dirWatch) watch(dir string, physicalDir string, recursive bool, fn WatchCallback, ignore func(path string) bool) (uint64, bool) {
	dw.mu.Lock()
	defer dw.mu.Unlock()
	dw.nextCBID++
	id := dw.nextCBID
	sinceSeq := dw.events.sequence()
	if dw.sequence != nil {
		sinceSeq = dw.sequence()
	}
	dw.callbacks = append(dw.callbacks, callback{id: id, dir: dir, physicalDir: physicalDir, watchDir: dw.dir, watchPhysicalDir: dw.physicalDir, recursive: recursive, fn: fn, ignore: ignore, sinceSeq: sinceSeq})
	return id, true
}

func (dw *dirWatch) unwatch(id uint64) bool {
	dw.mu.Lock()
	defer dw.mu.Unlock()
	for i, cb := range dw.callbacks {
		if cb.id == id {
			dw.callbacks = append(dw.callbacks[:i], dw.callbacks[i+1:]...)
			return len(dw.callbacks) == 0
		}
	}
	return false
}

func (dw *dirWatch) unref(w *watcher) {
	dw.mu.Lock()
	empty := len(dw.callbacks) == 0
	dw.mu.Unlock()
	if empty {
		w.removeDirWatch(dw)
	}
}
