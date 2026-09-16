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
	closer    io.Closer
	recursive bool
}

type dirWatchUpdate struct {
	dir       string
	recursive bool
}

type resolution struct {
	path  string
	stale bool
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
	mu            sync.Mutex
	backend       WatchBackend
	watchedDirs   map[string]*watchedDir
	doCycleCh     chan struct{}
	filesystem    vfs.FS
	aliases       *watchalias.Index
	resolvedPaths map[string]*resolution
	registrations map[string]watchRequest

	// DebugLog receives verbose watch diagnostics when non-nil
	DebugLog io.Writer

	warnWriter io.Writer
	dirExists  func(string) bool

	changedMu       sync.Mutex
	changedPaths    map[string]fswatch.EventKind
	changedOverflow bool
}

func NewWatchManager(warnWriter io.Writer, dirExists func(string) bool, filesystem ...vfs.FS) *WatchManager {
	wm := &WatchManager{
		watchedDirs: make(map[string]*watchedDir),
		doCycleCh:   make(chan struct{}, 1),
		warnWriter:  warnWriter,
		dirExists:   dirExists,
	}
	if len(filesystem) != 0 {
		wm.filesystem = filesystem[0]
	}
	return wm
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
	if wm.aliases != nil && len(changed) != 0 {
		return Changes{Matches: wm.aliases.Match(changed), Overflow: overflow}
	}
	return Changes{Matches: watchalias.Matches{Changes: changed}, Overflow: overflow || wm.aliases == nil && wm.registrations != nil}
}

// Realpath shares watch resolution between computing subscription directories
// and registering aliases. Filesystems may authoritatively resolve a leaf using
// its cached parent; others retain their full resolver.
func (wm *WatchManager) Realpath(name string, filesystem vfs.FS) string {
	return wm.realpath(name, filesystem, nil)
}

func (wm *WatchManager) realpath(name string, filesystem vfs.FS, retargeted *bool) string {
	if filesystem == nil {
		filesystem = wm.filesystem
	}
	if filesystem == nil {
		return name
	}
	previous := wm.resolvedPaths[name]
	if previous != nil && !previous.stale {
		return previous.path
	}
	if wm.resolvedPaths == nil {
		wm.resolvedPaths = make(map[string]*resolution)
	}
	resolved := vfs.RealpathWithParent(filesystem, name, func(parent string) string {
		return wm.realpath(parent, filesystem, retargeted)
	})
	if previous == nil {
		wm.resolvedPaths[name] = &resolution{path: resolved}
	} else {
		if retargeted != nil && previous.path != resolved {
			*retargeted = true
		}
		previous.path, previous.stale = resolved, false
	}
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
		for _, name := range changes.Affected {
			if entry := wm.resolvedPaths[name]; entry != nil {
				entry.stale = true
			}
		}
		for _, name := range changes.Affected {
			wm.realpath(name, wm.filesystem, &retargeted)
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

func (wm *WatchManager) onWatchEvents(events []fswatch.Event, err error) {
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
			wm.changedPaths = make(map[string]fswatch.EventKind, len(events))
		}
		for _, e := range events {
			wm.changedPaths[e.Path] = e.Kind
		}
		wm.changedMu.Unlock()
		wm.signalDoCycle()
	}
}

func (wm *WatchManager) handleWatchTerminated(dir string, identity *watchedDir) {
	if wm.DebugLog != nil {
		fmt.Fprintf(wm.DebugLog, "[watch] watch terminated: %s\n", dir)
	}
	var staleCloser io.Closer
	wm.mu.Lock()
	if wd, ok := wm.watchedDirs[dir]; ok && wd == identity {
		staleCloser = wd.closer
		delete(wm.watchedDirs, dir)
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

func (wm *WatchManager) createDirWatchRequest(dir string, entry *watchedDir) WatchDirectoryRequest {
	return WatchDirectoryRequest{
		Dir:       dir,
		Recursive: entry.recursive,
		Ignore:    ShouldIgnoreWatchPath,
		Callback: func(events []fswatch.Event, err error) {
			if err != nil && errors.Is(err, fswatch.ErrWatchTerminated) {
				wm.handleWatchTerminated(dir, entry)
				return
			}
			wm.onWatchEvents(events, err)
		},
	}
}

func (wm *WatchManager) ResolveDesiredDirs(desiredDirs map[string]bool) map[string]bool {
	resolved := make(map[string]bool, len(desiredDirs))
	for dir, recursive := range desiredDirs {
		watchDir := dir
		watchRecursive := recursive
		for !wm.dirExists(watchDir) {
			parent := tspath.GetDirectoryPath(watchDir)
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
		if existing, has := resolved[watchDir]; has {
			resolved[watchDir] = existing || watchRecursive
		} else {
			resolved[watchDir] = watchRecursive
		}
	}
	return resolved
}

func (wm *WatchManager) ReconcileWatches(files []string, desiredDirs map[string]bool, filesystem vfs.FS) error {
	registrations := make(map[string]watchRequest, len(files)+len(desiredDirs))
	for _, name := range files {
		registrations[name] = watchRequest{dependency: true}
	}
	for name := range desiredDirs {
		request := registrations[name]
		request.directory = true
		registrations[name] = request
	}
	if wm.aliases == nil || !maps.Equal(wm.registrations, registrations) {
		if err := wm.rebuildAliases(registrations, filesystem); err != nil {
			return err
		}
	}
	if wm.backend == nil {
		return nil
	}

	var additions []dirWatchUpdate
	var changes []dirWatchUpdate

	core.DiffMapsFunc(
		wm.watchedDirs,
		desiredDirs,
		func(wd *watchedDir, recursive bool) bool { return wd.recursive == recursive },
		func(dir string, recursive bool) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] watching directory %s (recursive=%v)\n", dir, recursive)
			}
			additions = append(additions, dirWatchUpdate{dir: dir, recursive: recursive})
		},
		func(dir string, wd *watchedDir) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] closing stale dir watch: %s\n", dir)
			}
			wd.closer.Close()
			delete(wm.watchedDirs, dir)
		},
		func(dir string, wd *watchedDir, recursive bool) {
			if wm.DebugLog != nil {
				fmt.Fprintf(wm.DebugLog, "[watch] recreating dir watch %s (recursive %v→%v)\n", dir, wd.recursive, recursive)
			}
			wd.closer.Close()
			delete(wm.watchedDirs, dir)
			changes = append(changes, dirWatchUpdate{dir: dir, recursive: recursive})
		},
	)
	additions = append(additions, changes...)
	return wm.createDirWatches(additions)
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
			wm.ForceOverflow()
			return err
		}
	}
	for name, entry := range wm.resolvedPaths {
		if !aliases.Covers(watchalias.Registration{Name: name, Realpath: entry.path}) {
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
		entry := &watchedDir{recursive: update.recursive}
		entries[i] = entry
		requests[i] = wm.createDirWatchRequest(update.dir, entry)
	}
	closers, err := wm.backend.WatchDirectories(requests)
	if err == nil {
		for i, update := range updates {
			entries[i].closer = closers[i]
			wm.watchedDirs[update.dir] = entries[i]
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
	opts  tspath.ComparePathsOptions
	dirs  map[string]bool
	names map[string]string
}

func NewDirWatchSet(opts tspath.ComparePathsOptions) *DirWatchSet {
	return &DirWatchSet{
		opts:  opts,
		dirs:  make(map[string]bool),
		names: make(map[string]string),
	}
}

func (s *DirWatchSet) canonical(dir string) string {
	return tspath.GetCanonicalFileName(dir, s.opts.UseCaseSensitiveFileNames)
}

func (s *DirWatchSet) Set(dir string, recursive bool) {
	original := dir
	dir = s.canonical(dir)
	if _, exists := s.names[dir]; !exists {
		s.names[dir] = original
	}
	s.dirs[dir] = s.dirs[dir] || recursive
}

func (s *DirWatchSet) Covered(dir string) bool {
	dir = s.canonical(dir)
	if _, has := s.dirs[dir]; has {
		return true
	}
	rootLength := tspath.GetRootLength(dir)
	for len(dir) > rootLength {
		dir = tspath.GetDirectoryPath(dir)
		if s.dirs[dir] {
			return true
		}
	}
	return false
}

func (s *DirWatchSet) Dirs() map[string]bool {
	dirs := make(map[string]bool, len(s.dirs))
	for key, recursive := range s.dirs {
		dirs[s.names[key]] = recursive
	}
	return dirs
}

func (wm *WatchManager) IsPathUnderWatch(path string, opts tspath.ComparePathsOptions) bool {
	for dir := range wm.watchedDirs {
		if tspath.ContainsPath(dir, path, opts) {
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
