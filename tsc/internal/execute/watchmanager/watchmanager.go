package watchmanager

import (
	"context"
	"errors"
	"fmt"
	"io"
	"maps"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/watchalias"
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

type watchRequest struct {
	dependency bool
	directory  bool
}

type Changes struct {
	watchalias.Matches
	Overflow bool
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
	filesystem      vfs.FS
	aliases         *watchalias.Index
	resolvedPaths   map[string]string
	registrations   map[string]watchRequest

	// DebugLog receives verbose watch diagnostics when non-nil
	DebugLog io.Writer

	warnWriter io.Writer
	dirExists  func(tspath.RootedDirectoryPath) bool

	changedMu       sync.Mutex
	changedPaths    map[tspath.RootedPath]fswatch.EventKind
	changedOverflow bool
}

func NewWatchManager(warnWriter io.Writer, dirExists func(tspath.RootedDirectoryPath) bool, caseSensitivity tspath.CaseSensitivity, filesystem vfs.FS) *WatchManager {
	return &WatchManager{
		watchedDirs:     make(map[tspath.PathKey]*watchedDir),
		doCycleCh:       make(chan struct{}, 1),
		warnWriter:      warnWriter,
		dirExists:       dirExists,
		caseSensitivity: caseSensitivity,
		filesystem:      filesystem,
	}
}

func (wm *WatchManager) WatchFiles() []string {
	files := make([]string, 0, len(wm.registrations))
	for name, request := range wm.registrations {
		if request.dependency {
			files = append(files, name)
		}
	}
	return files
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

func (wm *WatchManager) DrainEvents() Changes {
	wm.changedMu.Lock()
	changed := wm.changedPaths
	overflow := wm.changedOverflow
	wm.changedPaths = nil
	wm.changedOverflow = false
	wm.changedMu.Unlock()
	named := make(map[string]fswatch.EventKind, len(changed))
	for path, kind := range changed {
		named[path.AsString()] = kind
	}
	if wm.aliases != nil && len(named) != 0 {
		return Changes{Matches: wm.aliases.Match(named), Overflow: overflow}
	}
	return Changes{Changes: named, Overflow: overflow || wm.aliases == nil && wm.registrations != nil}
}

// Realpath shares watch resolution between computing subscription directories
// and registering aliases. Filesystems may authoritatively resolve a leaf using
// its cached parent; others retain their full resolver.
func (wm *WatchManager) Realpath(name string, filesystem vfs.FS) string {
	if filesystem == nil {
		filesystem = wm.filesystem
	}
	if filesystem == nil {
		return name
	}
	if resolved := wm.resolvedPaths[name]; resolved != "" {
		return resolved
	}
	if wm.resolvedPaths == nil {
		wm.resolvedPaths = make(map[string]string)
	}
	resolved := vfs.RealpathWithParent(filesystem, tspath.RootedPathFromNormalized(name), func(parent tspath.RootedPath) tspath.RootedPath {
		return tspath.RootedPathFromNormalized(wm.Realpath(parent.AsString(), filesystem))
	}).AsString()
	wm.resolvedPaths[name] = resolved
	return resolved
}

// RefreshResolutions runs once under the cycle lock, after matching with the
// old index and before any build decision. Publishing here also handles cycles
// that subsequently return early without compiling or reconciling subscriptions.
func (wm *WatchManager) RefreshResolutions(changes Changes) (bool, error) {
	retargeted := false
	if changes.Overflow {
		wm.resolvedPaths = nil
	} else {
		// Empty paths mark stale entries. Invalidate all affected parents before
		// resolving children; the old alias index retains the paths to compare.
		for _, name := range changes.Affected {
			wm.resolvedPaths[name] = ""
		}
		for _, name := range changes.Affected {
			resolved := wm.Realpath(name, wm.filesystem)
			if !wm.aliases.Covers(watchalias.Registration{Name: name, Realpath: resolved}) {
				retargeted = true
			}
		}
	}
	if changes.Overflow || changes.NamespaceChanged || retargeted {
		return retargeted, wm.rebuildAliases(wm.registrations, wm.filesystem)
	}
	return retargeted, nil
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
			wm.changedPaths = make(map[tspath.RootedPath]fswatch.EventKind, len(events))
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
		// Only directories on disk can be watched. The embedded libs (bundled:///libs) exist in the FS but not on disk.
		if !tspath.IsRootedDiskPath(dir.AsString()) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] not a disk path: %s\n", dir)
			}
			continue
		}
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
		// CanWatchDirectory only guards against falling back to an ancestor that is too generic to watch
		// (/, /home, ...). A directory that exists and was asked for is watched at any depth, otherwise a
		// project that lives near the filesystem root (say /app or /srv/app) would never be watched.
		if !wm.dirExists(watchDir) || (watchDir != dir && !CanWatchDirectory(watchDir)) {
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

// logicalDirs retain directory aliases even when subscriptions use resolved paths.
func (wm *WatchManager) ReconcileWatches(files []string, desiredDirs map[tspath.RootedDirectoryPath]bool, filesystem vfs.FS, logicalDirs ...string) error {
	registrations := make(map[string]watchRequest, len(files)+len(desiredDirs)+len(logicalDirs))
	for _, name := range files {
		registrations[name] = watchRequest{dependency: true}
	}
	for dir := range desiredDirs {
		name := dir.AsString()
		request := registrations[name]
		request.directory = true
		registrations[name] = request
	}
	for _, name := range logicalDirs {
		request := registrations[name]
		request.directory = true
		registrations[name] = request
	}
	var aliasErr error
	if wm.aliases == nil || !maps.Equal(wm.registrations, registrations) {
		aliasErr = wm.rebuildAliases(registrations, filesystem)
	}
	if wm.backend == nil {
		return aliasErr
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

	// Install watches even if alias indexing failed so later events can retry it.
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
	return errors.Join(aliasErr, wm.createDirWatches(additions))
}

func (wm *WatchManager) rebuildAliases(registrations map[string]watchRequest, filesystem vfs.FS) error {
	aliases := watchalias.New(wm.filesystem)
	wm.registrations = registrations
	register := func(name string, request watchRequest) error {
		for {
			registration := watchalias.Registration{
				Name: name, Realpath: wm.Realpath(name, filesystem),
				Dependency: request.dependency, Directory: request.directory,
			}
			if aliases.Covers(registration) {
				break
			}
			if err := aliases.Register(registration); err != nil {
				return err
			}
			parent := tspath.GetDirectoryPath(name)
			if parent == name || parent == "" {
				break
			}
			name = parent
			request = watchRequest{directory: true}
		}
		return nil
	}
	for name, request := range registrations {
		if err := register(name, request); err != nil {
			wm.aliases = nil
			return err
		}
	}
	for name, resolved := range wm.resolvedPaths {
		if !aliases.Covers(watchalias.Registration{Name: name, Realpath: resolved}) {
			delete(wm.resolvedPaths, name)
		}
	}
	wm.aliases = aliases
	return nil
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

func (wm *WatchManager) IsPathUnderWatch(path tspath.RootedPath) bool {
	for _, watch := range wm.watchedDirs {
		if wm.caseSensitivity.ContainsPath(watch.dir, path) {
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
