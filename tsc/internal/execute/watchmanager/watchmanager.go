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

type trackedPath struct {
	names    []string
	children []*trackedPath
}

type watchEntry struct {
	symlink   bool
	directory bool
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
	mu                       sync.Mutex
	backend                  WatchBackend
	watchedDirs              map[string]*watchedDir
	doCycleCh                chan struct{}
	filesystem               vfs.FS
	resolutionFS             vfs.FS
	watchFiles               []string
	aliases                  *watchalias.Index
	tracked                  map[tspath.Path]*trackedPath
	realpaths                map[tspath.Path][]string
	resolvedPaths            map[string]string
	directoryEntries         map[string]map[string]watchEntry
	staleResolutions         map[string]string
	generationFiles          map[string]bool
	fileMark                 bool
	generationDirs           map[string]bool
	generationDirty          bool
	realpathsChanged         bool
	pendingResolutionChanges map[string]fswatch.EventKind

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

// SetWatchFiles supplies original dependency spellings for the next watch
// generation. Like ReconcileWatches, it must be called under Lock.
func (wm *WatchManager) SetWatchFiles(files []string) { wm.watchFiles = files }

// SetResolutionFS borrows the current build's filesystem caches. Call under
// Lock and reset to nil before those caches can outlive the build.
func (wm *WatchManager) SetResolutionFS(filesystem vfs.FS) { wm.resolutionFS = filesystem }

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

func (wm *WatchManager) DrainEvents() (changed map[string]fswatch.EventKind, overflow bool) {
	wm.changedMu.Lock()
	changed = wm.changedPaths
	overflow = wm.changedOverflow
	wm.changedPaths = nil
	wm.changedOverflow = false
	wm.changedMu.Unlock()
	if wm.aliases != nil && len(changed) != 0 {
		expanded := make(map[string]fswatch.EventKind, len(changed))
		add := func(alias string, kind fswatch.EventKind) {
			// Deletion is conservative when multiple spellings coalesce.
			if previous, ok := expanded[alias]; !ok || previous != fswatch.EventDelete {
				expanded[alias] = kind
			}
		}
		for path, kind := range changed {
			knownFile := false
			for _, alias := range wm.aliases.Expand(path) {
				if entry, ok := wm.directoryEntries[tspath.GetDirectoryPath(alias)][tspath.GetBaseFileName(alias)]; ok && !entry.directory {
					knownFile = true
					if node := wm.tracked[wm.toPath(alias)]; node != nil && len(node.children) != 0 {
						wm.generationDirty = true
					}
				}
				add(alias, kind)
				for ancestor := alias; ; {
					for _, original := range wm.realpaths[wm.toPath(ancestor)] {
						add(original+alias[len(ancestor):], kind)
					}
					parent := tspath.GetDirectoryPath(ancestor)
					if parent == ancestor || parent == "" {
						break
					}
					ancestor = parent
				}
			}
			if kind != fswatch.EventUpdate || !knownFile {
				wm.generationDirty = true
			}
		}
		// Each matched subtree is visited at most once per batch, even when
		// overlapping directory deletions or multiple aliases are reported.
		visited := make(map[*trackedPath]struct{})
		var expandDelete func(*trackedPath)
		expandDelete = func(node *trackedPath) {
			if node == nil {
				return
			}
			if _, ok := visited[node]; ok {
				return
			}
			visited[node] = struct{}{}
			for _, name := range node.names {
				expanded[name] = fswatch.EventDelete
			}
			for _, child := range node.children {
				expandDelete(child)
			}
		}
		for path, kind := range expanded {
			if kind == fswatch.EventDelete {
				expandDelete(wm.tracked[wm.toPath(path)])
			}
		}
		changed = expanded
	}
	if overflow {
		wm.resolvedPaths = nil
		wm.directoryEntries = nil
		wm.staleResolutions = nil
		wm.pendingResolutionChanges = nil
		wm.generationDirty = true
	} else if len(changed) != 0 {
		if wm.pendingResolutionChanges == nil {
			wm.pendingResolutionChanges = maps.Clone(changed)
		} else {
			maps.Copy(wm.pendingResolutionChanges, changed)
		}
	}
	return changed, overflow
}

// Realpath shares watch resolution between computing subscription directories
// and registering aliases. Directory entries may prove an existing leaf is not
// a symlink; unknown entries and filesystems without link metadata still use
// the filesystem's full resolver.
func (wm *WatchManager) Realpath(name string) string {
	wm.invalidateResolutions()
	if wm.filesystem == nil {
		return name
	}
	filesystem := wm.resolutionFS
	if filesystem == nil {
		filesystem = wm.filesystem
	}
	if resolved, ok := wm.resolvedPaths[name]; ok {
		return resolved
	}
	if wm.resolvedPaths == nil {
		wm.resolvedPaths = make(map[string]string)
		wm.directoryEntries = make(map[string]map[string]watchEntry)
	}
	parent := tspath.GetDirectoryPath(name)
	var resolved string
	if parent != name && parent != "" {
		entries, ok := wm.directoryEntries[parent]
		if !ok {
			listing := filesystem.GetAccessibleEntries(parent)
			if listing.Symlinks != nil {
				entries = make(map[string]watchEntry, len(listing.Files)+len(listing.Directories))
				for kind, names := range [][]string{listing.Files, listing.Directories} {
					for _, entry := range names {
						_, symlink := listing.Symlinks[entry]
						entries[entry] = watchEntry{symlink: symlink, directory: kind != 0}
					}
				}
			}
			wm.directoryEntries[parent] = entries
		}
		if entry, exists := entries[tspath.GetBaseFileName(name)]; exists && !entry.symlink {
			realParent := wm.Realpath(parent)
			if realParent == parent {
				resolved = name
			} else {
				resolved = tspath.CombinePaths(realParent, tspath.GetBaseFileName(name))
			}
		}
	}
	if resolved == "" {
		resolved = filesystem.Realpath(name)
	}
	wm.resolvedPaths[name] = resolved
	if previous, ok := wm.staleResolutions[name]; ok {
		if previous != resolved {
			wm.generationDirty = true
			wm.realpathsChanged = true
		}
		delete(wm.staleResolutions, name)
	}
	return resolved
}

func (wm *WatchManager) invalidateResolutions() {
	changed := wm.pendingResolutionChanges
	if len(changed) == 0 {
		return
	}
	wm.pendingResolutionChanges = nil
	invalidate := func(name string) {
		if previous, ok := wm.resolvedPaths[name]; ok {
			if wm.staleResolutions == nil {
				wm.staleResolutions = make(map[string]string)
			}
			wm.staleResolutions[name] = previous
			delete(wm.resolvedPaths, name)
		}
	}
	if !wm.generationDirty {
		// Known file updates cannot change their siblings' resolution. Alias
		// expansion already supplied every registered spelling of these leaves.
		for name := range changed {
			invalidate(name)
			delete(wm.directoryEntries, tspath.GetDirectoryPath(name))
		}
		return
	}
	paths := make(map[tspath.Path]struct{}, len(changed))
	parents := make(map[tspath.Path]struct{}, len(changed))
	for name := range changed {
		paths[wm.toPath(name)] = struct{}{}
		parents[wm.toPath(tspath.GetDirectoryPath(name))] = struct{}{}
	}
	affected := func(name string) bool {
		for path := wm.toPath(name); ; {
			if _, ok := paths[path]; ok {
				return true
			}
			parent := tspath.Path(tspath.GetDirectoryPath(string(path)))
			if parent == path || parent == "" {
				return false
			}
			path = parent
		}
	}
	// Expansion above must use the old mappings, particularly after a deleted
	// directory or retargeted symlink. Only then discard affected resolutions.
	for name := range wm.resolvedPaths {
		if affected(name) {
			invalidate(name)
		}
	}
	for name := range wm.directoryEntries {
		_, parent := parents[wm.toPath(name)]
		if parent || affected(name) {
			delete(wm.directoryEntries, name)
		}
	}
}

func (wm *WatchManager) toPath(name string) tspath.Path {
	return tspath.ToPath(name, "", wm.filesystem == nil || wm.filesystem.UseCaseSensitiveFileNames())
}

func (wm *WatchManager) track(pathName, original string) {
	path := wm.toPath(pathName)
	node, exists := wm.tracked[path]
	if !exists {
		node = &trackedPath{}
		wm.tracked[path] = node
	}
	node.names = append(node.names, original)
	if exists {
		return
	}
	for {
		parent := tspath.Path(tspath.GetDirectoryPath(string(path)))
		if parent == path || parent == "" {
			break
		}
		parentNode, exists := wm.tracked[parent]
		if !exists {
			parentNode = &trackedPath{}
			wm.tracked[parent] = parentNode
		}
		parentNode.children = append(parentNode.children, node)
		if exists {
			break
		}
		path, node = parent, parentNode
	}
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

func (wm *WatchManager) ReconcileWatches(desiredDirs map[string]bool) error {
	wm.RefreshRealpaths()
	if wm.aliases == nil || wm.generationDirty || !wm.sameWatchFiles() || !maps.Equal(wm.generationDirs, desiredDirs) {
		if err := wm.rebuildAliases(desiredDirs); err != nil {
			return err
		}
		wm.generationFiles = make(map[string]bool, len(wm.watchFiles))
		for _, name := range wm.watchFiles {
			wm.generationFiles[name] = wm.fileMark
		}
		wm.generationDirs = maps.Clone(desiredDirs)
		wm.generationDirty = false
		wm.realpathsChanged = false
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

// RefreshRealpaths runs during a build, never in the event callback. A changed
// symlink target requires recomputing subscriptions even if a source-file-only
// incremental update could otherwise reuse the compiler program.
func (wm *WatchManager) RefreshRealpaths() bool {
	wm.invalidateResolutions()
	for name := range wm.staleResolutions {
		wm.Realpath(name)
	}
	return wm.realpathsChanged
}

func (wm *WatchManager) sameWatchFiles() bool {
	// Dependency traversal order and duplicate observations do not change the
	// watch set. Toggle visitation marks instead of allocating another set.
	wm.fileMark = !wm.fileMark
	count := 0
	for _, name := range wm.watchFiles {
		mark, ok := wm.generationFiles[name]
		if !ok {
			return false
		}
		if mark != wm.fileMark {
			wm.generationFiles[name] = wm.fileMark
			count++
		}
	}
	return count == len(wm.generationFiles)
}

func (wm *WatchManager) rebuildAliases(desiredDirs map[string]bool) error {
	aliases := watchalias.New(wm.filesystem)
	wm.tracked = make(map[tspath.Path]*trackedPath)
	wm.realpaths = make(map[tspath.Path][]string)
	// Resolve explicit symlinks only while registering the generation. Events
	// may arrive after deletion, when querying their realpath is too late.
	registered := make(map[string]string)
	register := func(name string) error {
		if err := aliases.Add(name); err != nil {
			return err
		}
		if wm.filesystem == nil {
			return nil
		}
		for {
			if _, ok := registered[name]; ok {
				break
			}
			realPath := wm.Realpath(name)
			registered[name] = realPath
			if realPath != name {
				if err := aliases.Add(realPath); err != nil {
					return err
				}
				key := wm.toPath(realPath)
				wm.realpaths[key] = append(wm.realpaths[key], name)
			}
			parent := tspath.GetDirectoryPath(name)
			if parent == name || parent == "" {
				break
			}
			name = parent
		}
		return nil
	}
	for _, file := range wm.watchFiles {
		if err := register(file); err != nil {
			wm.aliases = nil
			wm.ForceOverflow()
			return err
		}
		wm.track(file, file)
		if realPath := registered[file]; realPath != "" && realPath != file {
			wm.track(realPath, file)
		}
	}
	for dir := range desiredDirs {
		if err := register(dir); err != nil {
			wm.aliases = nil
			wm.ForceOverflow()
			return err
		}
	}
	for name := range wm.resolvedPaths {
		if _, ok := registered[name]; !ok {
			delete(wm.resolvedPaths, name)
		}
	}
	for name := range wm.directoryEntries {
		if _, ok := registered[name]; !ok {
			delete(wm.directoryEntries, name)
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
	paths := []string{path}
	if wm.aliases != nil {
		paths = wm.aliases.Expand(path)
	}
	for dir := range wm.watchedDirs {
		for _, path := range paths {
			if tspath.ContainsPath(dir, path, opts) {
				return true
			}
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
