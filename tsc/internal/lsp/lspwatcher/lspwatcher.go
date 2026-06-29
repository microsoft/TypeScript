// Package lspwatcher implements an in-process file watcher used as a
// drop-in replacement for LSP-based file watching when the client does not
// support dynamic registration of file watchers.
package lspwatcher

import (
	"errors"
	"fmt"
	"io"
	"strings"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/fswatch"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

// throttleWindow mirrors VS Code's parcel watcher integration: give the
// first batch a short grace window so adjacent filesystem bursts coalesce.
const throttleWindow = 75 * time.Millisecond

type watcherBackend interface {
	WatchDirectory(dir string, fn fswatch.WatchCallback, opts ...fswatch.WatchOption) (io.Closer, error)
}

type defaultWatcherBackend struct {
	watcher fswatch.Watcher
}

func (d defaultWatcherBackend) WatchDirectory(dir string, fn fswatch.WatchCallback, opts ...fswatch.WatchOption) (io.Closer, error) {
	return d.watcher.WatchDirectory(dir, fn, opts...)
}

// Watcher manages a set of file system subscriptions identified by
// WatcherID strings (matching the LSP server's project.WatcherID type).
// Events are delivered to onChanges in batches as `*lsproto.FileEvent`,
// shaped exactly like a `workspace/didChangeWatchedFiles` notification.
type Watcher struct {
	fs        vfs.FS
	backend   watcherBackend
	onChanges func(changes []*lsproto.FileEvent)
	logger    logging.Logger

	mu sync.Mutex
	// watches holds the watches associated with each LSP WatcherID. A single id
	// may map to more than one watch because each FileSystemWatcher in the
	// registration becomes its own watch (different roots and kinds).
	watches map[string][]*watch
	closed  bool

	// Pending batch state, protected by mu.
	pending    map[string]*lsproto.FileEvent
	flushTimer *time.Timer
}

// watch represents one FileSystemWatcher from the LSP registration.
//
// The directory the session asks to watch may not exist yet (common in
// granular mode, where each probed-but-missing package directory becomes a
// watch) or may be deleted while watched. To honor the watch across those
// transitions, a watch maintains either:
//
//   - a "target" subscription rooted directly at the requested directory, once
//     it exists, or
//   - an "ancestor" subscription on the nearest existing ancestor
//     (non-recursive), used to detect the requested directory — or an
//     intermediate path component — being created, after which the watch
//     descends toward and eventually promotes to the target.
//
// When the target materializes, synthetic create events are emitted for it
// (and, depending on whether the watch is recursive, its immediate children or
// its whole subtree) so the session re-resolves files that appeared in the gap
// before the real subscription was installed.
//
// All path fields are tspath-style (forward-slash) absolute paths.
type watch struct {
	watcher            *Watcher
	requestedDirectory string // directory requested by the LSP layer (possibly a symlink)
	kind               lsproto.WatchKind
	recursive          bool // whether the target subscription should be recursive

	mu               sync.Mutex
	subscription     io.Closer // current subscription (target or ancestor); nil if none
	watchedDirectory string    // canonicalized directory 'subscription' is rooted at
	watchingTarget   bool      // whether 'subscription' is rooted at the target directory
	closed           bool
}

// New constructs a Watcher backed by internal/fswatch's platform-default
// watcher implementation.
func New(fs vfs.FS, onChanges func(changes []*lsproto.FileEvent), logger logging.Logger) *Watcher {
	return NewWithFSWatcher(fs, fswatch.Default(), onChanges, logger)
}

// NewWithFSWatcher constructs a Watcher backed by the provided fswatch.Watcher.
// Use this to select a specific backend (e.g. fswatch.Kqueue()) instead of the
// platform default.
func NewWithFSWatcher(fs vfs.FS, watcher fswatch.Watcher, onChanges func(changes []*lsproto.FileEvent), logger logging.Logger) *Watcher {
	return newWithBackend(fs, defaultWatcherBackend{watcher: watcher}, onChanges, logger)
}

func newWithBackend(fs vfs.FS, backend watcherBackend, onChanges func(changes []*lsproto.FileEvent), logger logging.Logger) *Watcher {
	return &Watcher{
		fs:        fs,
		backend:   backend,
		onChanges: onChanges,
		logger:    logger,
		watches:   make(map[string][]*watch),
	}
}

// WatchFiles subscribes to each FileSystemWatcher under the given id.
//
// A watcher whose directory does not exist yet is not an error: an ancestor
// watch is installed on the nearest existing ancestor and the subscription is
// reported as successful, so the session's notion of "this watcher is alive"
// stays true for the subscription's whole lifetime. Only a genuine backend
// failure (e.g. resource exhaustion while watching an existing directory)
// causes WatchFiles to roll back the whole id and return an error, so the
// session's pending/retry path re-registers it on the next reevaluation.
func (w *Watcher) WatchFiles(id string, fileSystemWatchers []*lsproto.FileSystemWatcher) error {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return errors.New("lspwatcher: closed")
	}
	if _, exists := w.watches[id]; exists {
		w.mu.Unlock()
		return fmt.Errorf("lspwatcher: watcher %q already exists", id)
	}
	// Mark the id as existing before installing any watches so a concurrent
	// WatchFiles for the same id is rejected above.
	w.watches[id] = nil
	w.mu.Unlock()

	var failed bool
	for _, fileSystemWatcher := range fileSystemWatchers {
		directory, ok := watchRoot(fileSystemWatcher)
		if !ok || directory == "" {
			w.logger.Logf("lspwatcher: skipping watcher %q: unrecognized pattern %q", id, watchPatternString(fileSystemWatcher))
			continue
		}
		newWatch := &watch{
			watcher:            w,
			requestedDirectory: directory,
			kind:               effectiveKind(fileSystemWatcher),
			recursive:          isRecursiveGlob(fileSystemWatcher),
		}
		if err := newWatch.reconcile(false /*emitSynthetic*/); err != nil {
			w.logger.Logf("lspwatcher: failed to register watcher %q for %q: %v", id, directory, err)
			newWatch.close()
			failed = true
			break
		}
		w.mu.Lock()
		w.watches[id] = append(w.watches[id], newWatch)
		w.mu.Unlock()
	}

	if failed {
		// Roll back the whole id so the session's retry (MarkPending) can
		// cleanly re-register it. The session treats an id as a single unit.
		_ = w.UnwatchFiles(id)
		return fmt.Errorf("lspwatcher: failed to register one or more watchers for %q", id)
	}
	return nil
}

// UnwatchFiles tears down all subscriptions associated with id.
func (w *Watcher) UnwatchFiles(id string) error {
	w.mu.Lock()
	watches, ok := w.watches[id]
	if !ok {
		w.mu.Unlock()
		return fmt.Errorf("lspwatcher: no watcher with id %q", id)
	}
	delete(w.watches, id)
	w.mu.Unlock()
	for _, watch := range watches {
		watch.close()
	}
	return nil
}

// Close removes every subscription. Safe to call multiple times.
func (w *Watcher) Close() {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return
	}
	w.closed = true
	watchesByID := w.watches
	w.watches = nil
	if w.flushTimer != nil {
		w.flushTimer.Stop()
		w.flushTimer = nil
	}
	w.pending = nil
	w.mu.Unlock()
	for _, watches := range watchesByID {
		for _, watch := range watches {
			watch.close()
		}
	}
}

// close tears down the watch's current subscription and prevents any in-flight
// reconcile from reinstalling one.
func (w *watch) close() {
	w.mu.Lock()
	w.closed = true
	subscription := w.subscription
	w.subscription = nil
	w.watchedDirectory = ""
	w.mu.Unlock()
	if subscription != nil {
		_ = subscription.Close()
	}
}

// reconcile installs or advances this watch toward the target directory based
// on the current filesystem state. It is called at registration, whenever a
// ancestor watch observes activity, and after a target watch is terminated by
// deletion.
//
// emitSynthetic controls whether promoting to the target emits synthetic
// create events: false for the initial install when the target already exists
// (the session already knows about those files), true for any missing→present
// recovery.
//
// It returns a non-nil error only on a genuine backend failure to install a
// watch; a missing target directory is handled by installing an ancestor watch
// and returns nil.
func (w *watch) reconcile(emitSyntheticCreates bool) error {
	w.mu.Lock()
	defer w.mu.Unlock()
	watcher := w.watcher
	for {
		if w.closed {
			return nil
		}
		if watcher.fs.DirectoryExists(w.requestedDirectory) {
			if w.watchingTarget && w.subscription != nil {
				return nil // already watching the target
			}
			targetDirectory := w.requestedDirectory
			var options []fswatch.WatchOption
			if w.recursive {
				options = append(options, fswatch.WithRecursive())
			}
			subscription, err := watcher.backend.WatchDirectory(targetDirectory, w.targetCallback(targetDirectory), options...)
			if err != nil {
				return err
			}
			previous := w.subscription
			w.subscription = subscription
			w.watchedDirectory = targetDirectory
			w.watchingTarget = true
			if previous != nil {
				_ = previous.Close()
			}
			if emitSyntheticCreates {
				watcher.emitSyntheticCreates(targetDirectory, w.kind, w.recursive)
			}
			return nil
		}

		ancestor, ok := nearestExistingAncestor(watcher.fs, w.requestedDirectory)
		if !ok {
			// Nothing exists to watch (even the root is gone); drop any subscription.
			if w.subscription != nil {
				previous := w.subscription
				w.subscription = nil
				w.watchedDirectory = ""
				w.watchingTarget = false
				_ = previous.Close()
			}
			return nil
		}
		ancestorDirectory := ancestor
		if !w.watchingTarget && w.subscription != nil && w.watchedDirectory == ancestorDirectory {
			return nil // already watching the correct ancestor
		}
		subscription, err := watcher.backend.WatchDirectory(ancestorDirectory, w.ancestorCallback())
		if err != nil {
			return err
		}
		previous := w.subscription
		w.subscription = subscription
		w.watchedDirectory = ancestorDirectory
		w.watchingTarget = false
		if previous != nil {
			_ = previous.Close()
		}
		// The target may have appeared between the DirectoryExists check above
		// and installing this ancestor subscription (e.g. an atomic tree
		// creation), so loop to descend further or promote immediately. Any
		// promotion from here on is a missing→present transition, so synthesize
		// creates.
		emitSyntheticCreates = true
	}
}

// targetCallback returns the fswatch callback for a target watch rooted at
// watchedReal. It forwards events to the session and, on ErrWatchTerminated
// (the watched directory was deleted), falls back to watching the nearest
// existing ancestor so the watch re-attaches when the directory is recreated.
func (w *watch) targetCallback(watchedDirectory string) fswatch.WatchCallback {
	watcher := w.watcher
	return func(events []fswatch.Event, err error) {
		terminated := false
		if err != nil {
			switch {
			case errors.Is(err, fswatch.ErrOverflow):
				watcher.logger.Logf("lspwatcher: watch overflow in %q (some events may have been dropped): %v", watchedDirectory, err)
			case errors.Is(err, fswatch.ErrWatchTerminated):
				terminated = true
				watcher.logger.Logf("lspwatcher: watch terminated in %q (directory removed): %v", watchedDirectory, err)
			default:
				watcher.logger.Logf("lspwatcher: watch error in %q: %v", watchedDirectory, err)
			}
		}
		if len(events) > 0 {
			watcher.forwardEvents(w.kind, events)
		}
		if terminated {
			// The delete event for the directory was forwarded above; now
			// re-attach to the nearest existing ancestor.
			w.handleTerminated()
		}
	}
}

// handleTerminated clears the dead target watch (the backend has already
// removed it) and re-evaluates, falling back to an ancestor watch on the nearest
// existing ancestor so the watch re-attaches when the directory reappears.
// Clearing the state first is essential: reconcile would otherwise see
// watchingTarget && subscription != nil and conclude the target is already
// watched, even though the subscription is dead — losing recovery if the
// directory is recreated before reconcile runs.
func (w *watch) handleTerminated() {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return
	}
	previous := w.subscription
	w.subscription = nil
	w.watchedDirectory = ""
	w.watchingTarget = false
	w.mu.Unlock()
	if previous != nil {
		_ = previous.Close()
	}
	_ = w.reconcile(true /*emitSyntheticCreates*/)
}

// ancestorCallback returns the fswatch callback for an ancestor watch. Ancestor
// watches exist only to detect the target — or an intermediate path component —
// being created; their events are about ancestor directories the session
// doesn't track, so they are ignored and the watch is simply re-evaluated.
func (w *watch) ancestorCallback() fswatch.WatchCallback {
	return func(events []fswatch.Event, err error) {
		_ = w.reconcile(true /*emitSyntheticCreates*/)
	}
}

// nearestExistingAncestor returns the deepest existing directory that is dir or
// an ancestor of dir, walking upward. ok is false only if nothing in the chain
// (including the root) exists.
func nearestExistingAncestor(fs vfs.FS, dir string) (string, bool) {
	for {
		if fs.DirectoryExists(dir) {
			return dir, true
		}
		parent := tspath.GetDirectoryPath(dir)
		if parent == dir {
			return "", false
		}
		dir = parent
	}
}

// forwardEvents translates fswatch events into LSP file events and enqueues
// them for the next debounced flush.
func (w *Watcher) forwardEvents(kind lsproto.WatchKind, events []fswatch.Event) {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return
	}
	if w.pending == nil {
		w.pending = make(map[string]*lsproto.FileEvent, len(events))
	}
	for _, event := range events {
		var changeType lsproto.FileChangeType
		switch event.Kind {
		case fswatch.EventUpdate:
			// fswatch intentionally doesn't distinguish create vs update.
			// For LSP consumers this is fine: callers infer create/update
			// from their own cache and both should invalidate stale state.
			if kind&(lsproto.WatchKindCreate|lsproto.WatchKindChange) == 0 {
				continue
			}
			changeType = lsproto.FileChangeTypeChanged
		case fswatch.EventDelete:
			if kind&lsproto.WatchKindDelete == 0 {
				continue
			}
			changeType = lsproto.FileChangeTypeDeleted
		default:
			continue
		}

		path := tspath.NormalizeSlashes(event.Path)
		uri := lsconv.FileNameToDocumentURI(path)
		w.pending[string(uri)] = &lsproto.FileEvent{
			Uri:  uri,
			Type: changeType,
		}
	}
	w.scheduleFlushLocked()
	w.mu.Unlock()
}

// emitSyntheticCreates enqueues synthetic create events after a target watch is
// (re)installed following a missing→present transition, so the session
// re-resolves files that appeared before the real watch existed. The target
// directory itself is always included; for a non-recursive watch its immediate
// children are added, and for a recursive watch its whole subtree is walked.
// Nothing is emitted if the watch doesn't request create notifications.
func (w *Watcher) emitSyntheticCreates(directory string, kind lsproto.WatchKind, recursive bool) {
	if kind&lsproto.WatchKindCreate == 0 {
		return
	}
	paths := []string{directory}
	if recursive {
		_ = w.fs.WalkDir(directory, func(path string, entry vfs.DirEntry, err error) error {
			if err != nil {
				return nil
			}
			normalizedPath := tspath.NormalizeSlashes(path)
			if normalizedPath == directory {
				return nil
			}
			paths = append(paths, normalizedPath)
			return nil
		})
	} else {
		entries := w.fs.GetAccessibleEntries(directory)
		for _, name := range entries.Files {
			paths = append(paths, tspath.CombinePaths(directory, name))
		}
		for _, name := range entries.Directories {
			paths = append(paths, tspath.CombinePaths(directory, name))
		}
	}
	w.enqueueSyntheticCreates(paths)
}

// enqueueSyntheticCreates adds synthetic create events for paths, without
// clobbering a more specific event already pending for the same path (e.g. a
// real delete).
func (w *Watcher) enqueueSyntheticCreates(paths []string) {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return
	}
	if w.pending == nil {
		w.pending = make(map[string]*lsproto.FileEvent, len(paths))
	}
	for _, path := range paths {
		uri := lsconv.FileNameToDocumentURI(path)
		if _, ok := w.pending[string(uri)]; ok {
			continue
		}
		w.pending[string(uri)] = &lsproto.FileEvent{
			Uri:  uri,
			Type: lsproto.FileChangeTypeCreated,
		}
	}
	w.scheduleFlushLocked()
	w.mu.Unlock()
}

// scheduleFlushLocked arms the debounce flush timer if it isn't already armed.
// Callers must hold w.mu.
func (w *Watcher) scheduleFlushLocked() {
	if w.flushTimer == nil {
		w.flushTimer = time.AfterFunc(throttleWindow, w.flush)
	}
}

func (w *Watcher) flush() {
	w.mu.Lock()
	if w.closed {
		w.mu.Unlock()
		return
	}
	pending := w.pending
	w.pending = nil
	w.flushTimer = nil
	w.mu.Unlock()

	if len(pending) == 0 {
		return
	}
	changes := make([]*lsproto.FileEvent, 0, len(pending))
	for _, event := range pending {
		changes = append(changes, event)
	}
	w.onChanges(changes)
}

// watchRoot extracts the directory the fswatch subscription should be
// rooted at from a FileSystemWatcher. The patterns the project layer
// produces are of the form `<dir>/**/*` (recursive) or `<dir>/*`
// (non-recursive, used by granular watch mode), either as a Pattern
// with a fully-qualified directory or as a RelativePattern with a
// file:// BaseUri, so the heuristic of "everything before the first
// glob meta character" is reliable. Use [isRecursiveGlob] to determine
// whether the subscription should be recursive.
//
// Returned roots are tspath-normalized (forward-slash) absolute paths.
func watchRoot(fileSystemWatcher *lsproto.FileSystemWatcher) (string, bool) {
	if fileSystemWatcher.GlobPattern.Pattern != nil {
		return rootFromGlob(*fileSystemWatcher.GlobPattern.Pattern), true
	}
	if relativePattern := fileSystemWatcher.GlobPattern.RelativePattern; relativePattern != nil {
		var base string
		if relativePattern.BaseUri.URI != nil {
			base = lsproto.DocumentUri(*relativePattern.BaseUri.URI).FileName()
		} else {
			return "", false
		}
		pattern := tspath.CombinePaths(base, relativePattern.Pattern)
		return rootFromGlob(pattern), true
	}
	return "", false
}

func rootFromGlob(pattern string) string {
	pattern = tspath.NormalizeSlashes(pattern)
	metaIndex := -1
	for i := range len(pattern) {
		switch pattern[i] {
		case '*', '?', '[', '{':
			metaIndex = i
		}
		if metaIndex != -1 {
			break
		}
	}
	if metaIndex == -1 {
		return tspath.NormalizePath(strings.TrimRight(pattern, "/"))
	}
	directory := strings.TrimRight(pattern[:metaIndex], "/")
	if directory == "" {
		return ""
	}
	return tspath.NormalizePath(directory)
}

func watchPatternString(fileSystemWatcher *lsproto.FileSystemWatcher) string {
	if fileSystemWatcher.GlobPattern.Pattern != nil {
		return *fileSystemWatcher.GlobPattern.Pattern
	}
	if relativePattern := fileSystemWatcher.GlobPattern.RelativePattern; relativePattern != nil {
		var base string
		if relativePattern.BaseUri.URI != nil {
			base = string(*relativePattern.BaseUri.URI)
		}
		return base + "/" + relativePattern.Pattern
	}
	return ""
}

// isRecursiveGlob reports whether a FileSystemWatcher's pattern requests
// recursive watching (contains a `**` segment). Granular watch mode emits
// non-recursive `<dir>/*` patterns, which watch only the immediate directory.
func isRecursiveGlob(fileSystemWatcher *lsproto.FileSystemWatcher) bool {
	return strings.Contains(watchPatternString(fileSystemWatcher), "**")
}

func effectiveKind(fileSystemWatcher *lsproto.FileSystemWatcher) lsproto.WatchKind {
	if fileSystemWatcher.Kind != nil {
		return *fileSystemWatcher.Kind
	}
	return lsproto.WatchKindCreate | lsproto.WatchKindChange | lsproto.WatchKindDelete
}
