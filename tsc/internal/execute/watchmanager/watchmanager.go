package watchmanager

import (
	"context"
	"errors"
	"fmt"
	"io"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type watchedDir struct {
	dir       tspath.RootedDirectoryPath
	closer    io.Closer
	recursive bool
}

type dirWatchUpdate struct {
	key       tspath.PathKey
	dir       tspath.RootedDirectoryPath
	recursive bool
}

// WatchManager manages fswatch directory watches, event accumulation,
// and DoCycle signaling. It is shared by the CLI watcher and the build
// mode orchestrator.
//
// Locking contract:
//   - Call Lock/Unlock around the entire DoCycle body.
//   - ReconcileWatches must be called under Lock.
//   - CloseAllWatches and handleWatchTerminated manage their own locking.
type WatchManager struct {
	mu              sync.Mutex
	backend         WatchBackend
	watchedDirs     map[tspath.PathKey]*watchedDir
	doCycleCh       chan struct{}
	caseSensitivity tspath.CaseSensitivity

	// DebugLog receives verbose watch diagnostics when non-nil
	DebugLog io.Writer

	warnWriter io.Writer
	dirExists  func(tspath.RootedDirectoryPath) bool

	changedMu       sync.Mutex
	changedPaths    map[tspath.RootedFilePath]fswatch.EventKind
	changedOverflow bool
}

func NewWatchManager(warnWriter io.Writer, dirExists func(tspath.RootedDirectoryPath) bool, caseSensitivity tspath.CaseSensitivity) *WatchManager {
	return &WatchManager{
		watchedDirs:     make(map[tspath.PathKey]*watchedDir),
		doCycleCh:       make(chan struct{}, 1),
		warnWriter:      warnWriter,
		dirExists:       dirExists,
		caseSensitivity: caseSensitivity,
	}
}

func (wm *WatchManager) SetBackend(b WatchBackend) { wm.backend = b }

func (wm *WatchManager) Backend() WatchBackend { return wm.backend }

func (wm *WatchManager) EnsureDefaultBackend() {
	if wm.backend == nil {
		fsw := fswatch.Default()
		wm.backend = &FSWatchBackend{Inner: fsw}
		if wm.DebugLog != nil {
			fmt.Fprintf(wm.DebugLog, "[watch] using %s backend\n", fsw.Name())
		}
	}
}

func (wm *WatchManager) Lock() { wm.mu.Lock() }

func (wm *WatchManager) Unlock() { wm.mu.Unlock() }

func (wm *WatchManager) DoCycleCh() <-chan struct{} { return wm.doCycleCh }

func (wm *WatchManager) DrainEvents() (changed map[tspath.RootedFilePath]fswatch.EventKind, overflow bool) {
	wm.changedMu.Lock()
	changed = wm.changedPaths
	overflow = wm.changedOverflow
	wm.changedPaths = nil
	wm.changedOverflow = false
	wm.changedMu.Unlock()
	return
}

func (wm *WatchManager) ForceOverflow() {
	wm.changedMu.Lock()
	wm.changedOverflow = true
	wm.changedMu.Unlock()
}

func (wm *WatchManager) signalDoCycle() {
	select {
	case wm.doCycleCh <- struct{}{}:
		// Signal sent; the DoCycle loop will pick it up.
	default:
		// A signal is already pending; coalesced.
	}
}

func (wm *WatchManager) onWatchEvents(events []WatchEvent, err error) {
	if err != nil {
		if errors.Is(err, fswatch.ErrOverflow) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] event overflow, triggering rebuild\n")
			}
			wm.changedMu.Lock()
			wm.changedOverflow = true
			wm.changedMu.Unlock()
			wm.signalDoCycle()
			return
		}
		fmt.Fprintf(wm.warnWriter, "Warning: File watch error: %v\n", err)
		return
	}

	if len(events) > 0 {
		if wm.DebugLog != nil {
			fmt.Fprintf(wm.DebugLog, "[watch] %d event(s): ", len(events))
			for i, e := range events {
				if i > 0 {
					fmt.Fprint(wm.DebugLog, ", ")
				}
				if i >= 5 {
					fmt.Fprintf(wm.DebugLog, "... and %d more", len(events)-i)
					break
				}
				fmt.Fprintf(wm.DebugLog, "%s %s", e.Kind, e.Path)
			}
			fmt.Fprintln(wm.DebugLog)
		}
		wm.changedMu.Lock()
		if wm.changedPaths == nil {
			wm.changedPaths = make(map[tspath.RootedFilePath]fswatch.EventKind, len(events))
		}
		for _, e := range events {
			wm.changedPaths[e.Path] = e.Kind
		}
		wm.changedMu.Unlock()
		wm.signalDoCycle()
	}
}

func (wm *WatchManager) handleWatchTerminated(key tspath.PathKey, identity *watchedDir) {
	if wm.DebugLog != nil {
		fmt.Fprintf(wm.DebugLog, "[watch] watch terminated: %s\n", identity.dir)
	}
	var staleCloser io.Closer
	wm.mu.Lock()
	if wd, ok := wm.watchedDirs[key]; ok && wd == identity {
		staleCloser = wd.closer
		delete(wm.watchedDirs, key)
	}
	wm.mu.Unlock()
	if staleCloser != nil {
		staleCloser.Close()
	}
	wm.changedMu.Lock()
	wm.changedOverflow = true
	wm.changedMu.Unlock()
	wm.signalDoCycle()
}

func (wm *WatchManager) CloseAllWatches() {
	wm.mu.Lock()
	closers := make([]io.Closer, 0, len(wm.watchedDirs))
	for dir, wd := range wm.watchedDirs {
		closers = append(closers, wd.closer)
		delete(wm.watchedDirs, dir)
	}
	wm.mu.Unlock()
	for _, c := range closers {
		c.Close()
	}
}

func (wm *WatchManager) createDirWatchRequest(update dirWatchUpdate, entry *watchedDir) WatchDirectoryRequest {
	return WatchDirectoryRequest{
		Dir:       update.dir,
		Recursive: entry.recursive,
		Ignore:    ShouldIgnoreWatchPath,
		Callback: func(events []WatchEvent, err error) {
			if err != nil && errors.Is(err, fswatch.ErrWatchTerminated) {
				wm.handleWatchTerminated(update.key, entry)
				return
			}
			wm.onWatchEvents(events, err)
		},
	}
}

func (wm *WatchManager) ResolveDesiredDirs(desiredDirs map[tspath.RootedDirectoryPath]bool) map[tspath.RootedDirectoryPath]bool {
	resolvedByPath := make(map[tspath.PathKey]dirWatchUpdate, len(desiredDirs))
	for dir, recursive := range desiredDirs {
		watchDir := dir
		watchRecursive := recursive
		for !wm.dirExists(watchDir) {
			parent := watchDir.AsPath().Directory()
			if parent == watchDir {
				break
			}
			watchDir = parent
			watchRecursive = false // ancestor fallbacks are always non-recursive
		}
		if !wm.dirExists(watchDir) || !CanWatchDirectory(watchDir) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] no watchable ancestor for %s\n", dir)
			}
			continue
		}
		if watchDir != dir && wm.DebugLog != nil {
			fmt.Fprintf(wm.DebugLog, "[watch] resolved %s to ancestor %s\n", dir, watchDir)
		}
		key := wm.caseSensitivity.PathKey(watchDir.AsPath())
		if existing, has := resolvedByPath[key]; has {
			existing.recursive = existing.recursive || watchRecursive
			resolvedByPath[key] = existing
		} else {
			resolvedByPath[key] = dirWatchUpdate{key: key, dir: watchDir, recursive: watchRecursive}
		}
	}
	resolved := make(map[tspath.RootedDirectoryPath]bool, len(resolvedByPath))
	for _, watch := range resolvedByPath {
		resolved[watch.dir] = watch.recursive
	}
	return resolved
}

func (wm *WatchManager) ReconcileWatches(desiredDirs map[tspath.RootedDirectoryPath]bool) error {
	if wm.backend == nil {
		return nil
	}

	desiredByPath := make(map[tspath.PathKey]dirWatchUpdate, len(desiredDirs))
	for dir, recursive := range desiredDirs {
		key := wm.caseSensitivity.PathKey(dir.AsPath())
		if existing, ok := desiredByPath[key]; ok {
			existing.recursive = existing.recursive || recursive
			desiredByPath[key] = existing
		} else {
			desiredByPath[key] = dirWatchUpdate{key: key, dir: dir, recursive: recursive}
		}
	}

	var additions []dirWatchUpdate
	var changes []dirWatchUpdate

	core.DiffMapsFunc(
		wm.watchedDirs,
		desiredByPath,
		func(wd *watchedDir, desired dirWatchUpdate) bool { return wd.recursive == desired.recursive },
		func(_ tspath.PathKey, desired dirWatchUpdate) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] watching directory %s (recursive=%v)\n", desired.dir, desired.recursive)
			}
			additions = append(additions, desired)
		},
		func(key tspath.PathKey, wd *watchedDir) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] closing stale dir watch: %s\n", wd.dir)
			}
			wd.closer.Close()
			delete(wm.watchedDirs, key)
		},
		func(key tspath.PathKey, wd *watchedDir, desired dirWatchUpdate) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] recreating dir watch %s (recursive %v→%v)\n", wd.dir, wd.recursive, desired.recursive)
			}
			wd.closer.Close()
			delete(wm.watchedDirs, key)
			changes = append(changes, desired)
		},
	)
	additions = append(additions, changes...)
	return wm.createDirWatches(additions)
}

func (wm *WatchManager) createDirWatches(updates []dirWatchUpdate) error {
	if len(updates) == 0 {
		return nil
	}
	requests := make([]WatchDirectoryRequest, len(updates))
	entries := make([]*watchedDir, len(updates))
	for i, update := range updates {
		entry := &watchedDir{dir: update.dir, recursive: update.recursive}
		entries[i] = entry
		requests[i] = wm.createDirWatchRequest(update, entry)
	}
	closers, err := wm.backend.WatchDirectories(requests)
	if err == nil {
		for i, update := range updates {
			entries[i].closer = closers[i]
			wm.watchedDirs[update.key] = entries[i]
		}
		return nil
	}
	if wm.DebugLog != nil {
		for _, update := range updates {
			fmt.Fprintf(wm.DebugLog, "[watch] failed to watch directory %s: %v\n", update.dir, err)
		}
	}
	return err
}

// DirWatchSet accumulates the set of directories that should be watched while
// answering coverage queries efficiently. A directory is "covered" when it is
// already present in the set, or when it is contained within a recursive watch
// directory already in the set.
type DirWatchSet struct {
	caseSensitivity tspath.CaseSensitivity
	dirs            map[tspath.PathKey]dirWatchUpdate
}

func NewDirWatchSet(caseSensitivity tspath.CaseSensitivity) *DirWatchSet {
	return &DirWatchSet{
		caseSensitivity: caseSensitivity,
		dirs:            make(map[tspath.PathKey]dirWatchUpdate),
	}
}

func (s *DirWatchSet) Set(dir tspath.RootedDirectoryPath, recursive bool) {
	key := s.caseSensitivity.PathKey(dir.AsPath())
	if existing, ok := s.dirs[key]; ok {
		existing.recursive = existing.recursive || recursive
		s.dirs[key] = existing
	} else {
		s.dirs[key] = dirWatchUpdate{dir: dir, recursive: recursive}
	}
}

func (s *DirWatchSet) Covered(dir tspath.RootedDirectoryPath) bool {
	path := s.caseSensitivity.PathKey(dir.AsPath())
	if _, has := s.dirs[path]; has {
		return true
	}
	for {
		parent := path.Parent()
		if parent == path {
			return false
		}
		path = parent
		if watch, ok := s.dirs[path]; ok && watch.recursive {
			return true
		}
	}
}

func (s *DirWatchSet) Dirs() map[tspath.RootedDirectoryPath]bool {
	dirs := make(map[tspath.RootedDirectoryPath]bool, len(s.dirs))
	for _, watch := range s.dirs {
		dirs[watch.dir] = watch.recursive
	}
	return dirs
}

func (wm *WatchManager) IsPathUnderWatch(fileName tspath.RootedFilePath) bool {
	for _, watch := range wm.watchedDirs {
		if wm.caseSensitivity.ContainsFilePath(watch.dir, fileName) {
			return true
		}
	}
	return false
}

func (wm *WatchManager) RunLoop(ctx context.Context, doCycle func()) {
	for {
		select {
		case <-ctx.Done():
			wm.CloseAllWatches()
			return
		case <-wm.doCycleCh:
			doCycle()
		}
	}
}
