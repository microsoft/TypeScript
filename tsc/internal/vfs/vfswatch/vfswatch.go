// This package implements a polling-based file watcher designed
// for use by both the CLI watcher and the language server.
package vfswatch

import (
	"slices"
	"sync"
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/zeebo/xxh3"
)

const debounceWait = 250 * time.Millisecond

type WatchEntry struct {
	ModTime      time.Time
	Exists       bool
	ChildrenHash uint64 // 0 if not tracked
}

type FileWatcher struct {
	fs                  vfs.FS
	pollInterval        time.Duration
	testing             bool
	callback            func()
	watchState          map[string]WatchEntry
	wildcardDirectories map[string]bool
	mu                  sync.Mutex
}

func NewFileWatcher(fs vfs.FS, pollInterval time.Duration, testing bool, callback func()) *FileWatcher {
	return &FileWatcher{
		fs:           fs,
		pollInterval: pollInterval,
		testing:      testing,
		callback:     callback,
	}
}

func (fw *FileWatcher) SetPollInterval(d time.Duration) {
	fw.mu.Lock()
	defer fw.mu.Unlock()
	fw.pollInterval = d
}

func (fw *FileWatcher) WatchStateEntry(path string) (WatchEntry, bool) {
	fw.mu.Lock()
	defer fw.mu.Unlock()
	e, ok := fw.watchState[path]
	return e, ok
}

func (fw *FileWatcher) WatchStateUninitialized() bool {
	fw.mu.Lock()
	defer fw.mu.Unlock()
	return fw.watchState == nil
}

func (fw *FileWatcher) UpdateWatchState(paths []string, wildcardDirs map[string]bool) {
	state := snapshotPaths(fw.fs, paths, wildcardDirs)
	fw.mu.Lock()
	defer fw.mu.Unlock()
	fw.watchState = state
	fw.wildcardDirectories = wildcardDirs
}

func (fw *FileWatcher) WaitForSettled(now func() time.Time) {
	if fw.testing {
		return
	}
	fw.mu.Lock()
	wildcardDirs := fw.wildcardDirectories
	pollInterval := fw.pollInterval
	fw.mu.Unlock()
	current := fw.currentState()
	settledAt := now()
	tick := min(pollInterval, debounceWait)
	for now().Sub(settledAt) < debounceWait {
		time.Sleep(tick)
		if fw.hasChanges(current, wildcardDirs) {
			current = fw.currentState()
			settledAt = now()
		}
	}
}

func (fw *FileWatcher) currentState() map[string]WatchEntry {
	fw.mu.Lock()
	watchState := fw.watchState
	wildcardDirs := fw.wildcardDirectories
	fw.mu.Unlock()
	state := make(map[string]WatchEntry, len(watchState))
	for fn := range watchState {
		if s := fw.fs.Stat(fn); s != nil {
			state[fn] = WatchEntry{ModTime: s.ModTime(), Exists: true}
		} else {
			state[fn] = WatchEntry{Exists: false}
		}
	}
	for dir, recursive := range wildcardDirs {
		if !recursive {
			snapshotDirEntry(fw.fs, state, dir)
			continue
		}
		_ = fw.fs.WalkDir(dir, func(path string, d vfs.DirEntry, err error) error {
			if err != nil || !d.IsDir() {
				return nil
			}
			snapshotDirEntry(fw.fs, state, path)
			return nil
		})
	}
	return state
}

func snapshotPaths(fs vfs.FS, paths []string, wildcardDirs map[string]bool) map[string]WatchEntry {
	state := make(map[string]WatchEntry, len(paths))
	for _, fn := range paths {
		if s := fs.Stat(fn); s != nil {
			entry := WatchEntry{ModTime: s.ModTime(), Exists: true}
			if s.IsDir() {
				entries := fs.GetAccessibleEntries(fn)
				entry.ChildrenHash = hashEntries(entries)
			}
			state[fn] = entry
		} else {
			state[fn] = WatchEntry{Exists: false}
		}
	}
	for dir, recursive := range wildcardDirs {
		if !recursive {
			snapshotDirEntry(fs, state, dir)
			continue
		}
		_ = fs.WalkDir(dir, func(path string, d vfs.DirEntry, err error) error {
			if err != nil || !d.IsDir() {
				return nil
			}
			snapshotDirEntry(fs, state, path)
			return nil
		})
	}
	return state
}

func snapshotDirEntry(fs vfs.FS, state map[string]WatchEntry, dir string) {
	entries := fs.GetAccessibleEntries(dir)
	h := hashEntries(entries)
	if existing, ok := state[dir]; ok {
		existing.ChildrenHash = h
		state[dir] = existing
	} else {
		if s := fs.Stat(dir); s != nil {
			state[dir] = WatchEntry{ModTime: s.ModTime(), Exists: true, ChildrenHash: h}
		}
	}
}

func hashEntries(entries vfs.Entries) uint64 {
	dirs := slices.Clone(entries.Directories)
	files := slices.Clone(entries.Files)
	slices.Sort(dirs)
	slices.Sort(files)
	var h xxh3.Hasher
	for _, name := range dirs {
		_, _ = h.WriteString("d:")
		_, _ = h.WriteString(name)
		_, _ = h.Write([]byte{0})
	}
	for _, name := range files {
		_, _ = h.WriteString("f:")
		_, _ = h.WriteString(name)
		_, _ = h.Write([]byte{0})
	}
	return h.Sum64()
}

func dirChanged(fs vfs.FS, baseline map[string]WatchEntry, dir string) bool {
	entry, ok := baseline[dir]
	if !ok {
		return true
	}
	if entry.ChildrenHash != 0 {
		entries := fs.GetAccessibleEntries(dir)
		if hashEntries(entries) != entry.ChildrenHash {
			return true
		}
	}
	return false
}

func (fw *FileWatcher) hasChanges(baseline map[string]WatchEntry, wildcardDirs map[string]bool) bool {
	for path, old := range baseline {
		s := fw.fs.Stat(path)
		if !old.Exists {
			if s != nil {
				return true
			}
		} else {
			if s == nil || !s.ModTime().Equal(old.ModTime) {
				return true
			}
			if old.ChildrenHash != 0 {
				entries := fw.fs.GetAccessibleEntries(path)
				if hashEntries(entries) != old.ChildrenHash {
					return true
				}
			}
		}
	}
	for dir, recursive := range wildcardDirs {
		if !recursive {
			if dirChanged(fw.fs, baseline, dir) {
				return true
			}
			continue
		}
		found := false
		_ = fw.fs.WalkDir(dir, func(path string, d vfs.DirEntry, err error) error {
			if err != nil || !d.IsDir() {
				return nil
			}
			if dirChanged(fw.fs, baseline, path) {
				found = true
				return vfs.SkipAll
			}
			return nil
		})
		if found {
			return true
		}
	}
	return false
}

// HasChangesFromWatchState compares the current filesystem against the
// stored watch state. Safe for concurrent use: watchState and
// wildcardDirectories are snapshotted under lock; the maps themselves
// are never mutated after creation (UpdateWatchState replaces them).
func (fw *FileWatcher) HasChangesFromWatchState() bool {
	fw.mu.Lock()
	ws := fw.watchState
	wildcardDirs := fw.wildcardDirectories
	fw.mu.Unlock()
	return fw.hasChanges(ws, wildcardDirs)
}

func (fw *FileWatcher) Run(now func() time.Time) {
	for {
		fw.mu.Lock()
		interval := fw.pollInterval
		ws := fw.watchState
		wildcardDirs := fw.wildcardDirectories
		fw.mu.Unlock()
		time.Sleep(interval)
		if ws == nil || fw.hasChanges(ws, wildcardDirs) {
			fw.WaitForSettled(now)
			fw.callback()
		}
	}
}
