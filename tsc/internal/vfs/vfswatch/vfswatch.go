// This package implements a polling-based file watcher designed
// for use by both the CLI watcher and the language server.
package vfswatch

import (
	"fmt"
	"io"
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
	debugLog            io.Writer // nil = silent; non-nil = write timing lines here
}

func NewFileWatcher(fs vfs.FS, pollInterval time.Duration, testing bool, callback func()) *FileWatcher {
	return &FileWatcher{
		fs:           fs,
		pollInterval: pollInterval,
		testing:      testing,
		callback:     callback,
	}
}

// SetDebugLog enables per-scan timing output written to w.
// Pass nil to disable. Safe to call at any time.
func (fw *FileWatcher) SetDebugLog(w io.Writer) {
	fw.mu.Lock()
	defer fw.mu.Unlock()
	fw.debugLog = w
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
	pollInterval := fw.pollInterval
	fw.mu.Unlock()
	current := fw.currentState()
	settledAt := now()
	tick := min(pollInterval, debounceWait)
	for now().Sub(settledAt) < debounceWait {
		time.Sleep(tick)
		if fw.hasChanges(current) {
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
			state[fn] = WatchEntry{ModTime: s.ModTime(), Exists: true}
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

// hasChanges compares the current filesystem state against baseline.
//
// Tracked entries fall into two categories:
//
//   - Explicit paths (files the compiler depends on, plus directory paths
//     accessed via DirectoryExists/Stat/etc. during compilation). For these
//     we only need to know whether the path exists and, if it does, whether
//     its mtime has changed. We never depend on *what's inside* a directory
//     in this category — any specific file we care about is tracked
//     independently in this same map.
//
//   - Wildcard tree directories. snapshotPaths walks every directory under
//     each recursive wildcard root and stores it with a ChildrenHash that
//     covers the directory's listing. Re-hashing here detects any new,
//     deleted, or renamed file or subdirectory in those trees.
//
// Iterating baseline once therefore covers both: a single fs.Stat per entry,
// plus a fs.GetAccessibleEntries only for entries with ChildrenHash != 0
// (i.e. wildcard tree members).
func (fw *FileWatcher) hasChanges(baseline map[string]WatchEntry) bool {
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
	return false
}

// HasChangesFromWatchState compares the current filesystem against the
// stored watch state. Safe for concurrent use: watchState is snapshotted
// under lock; the map itself is never mutated after creation
// (UpdateWatchState replaces it).
func (fw *FileWatcher) HasChangesFromWatchState() bool {
	fw.mu.Lock()
	ws := fw.watchState
	fw.mu.Unlock()
	return fw.hasChanges(ws)
}

func (fw *FileWatcher) Run(now func() time.Time) {
	for {
		fw.mu.Lock()
		interval := fw.pollInterval
		ws := fw.watchState
		log := fw.debugLog
		fw.mu.Unlock()
		time.Sleep(interval)
		start := now()
		changed := ws == nil || fw.hasChanges(ws)
		if log != nil {
			elapsed := now().Sub(start)
			files, dirs, missing := 0, 0, 0
			for _, e := range ws {
				switch {
				case !e.Exists:
					missing++
				case e.ChildrenHash != 0:
					dirs++
				default:
					files++
				}
			}
			fmt.Fprintf(log, "[vfswatch] scan: %d paths (%d files, %d dirs, %d missing), %.1fms, changed=%v\n",
				len(ws), files, dirs, missing, float64(elapsed.Microseconds())/1000.0, changed)
		}
		if changed {
			fw.WaitForSettled(now)
			fw.callback()
		}
	}
}
