package vfswatch_test

import (
	"fmt"
	"sync"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"github.com/microsoft/typescript-go/internal/vfs/vfswatch"
)

var defaultPaths = []string{
	"/src/a.ts",
	"/src/b.ts",
	"/src/c.ts",
	"/src/sub/d.ts",
	"/tsconfig.json",
}

func newTestFS() vfs.FS {
	return vfstest.FromMap(map[string]string{
		"/src/a.ts":      "const a = 1;",
		"/src/b.ts":      "const b = 2;",
		"/src/c.ts":      "const c = 3;",
		"/src/sub/d.ts":  "const d = 4;",
		"/tsconfig.json": `{}`,
	}, true)
}

func newWatcherWithState(fs vfs.FS) *vfswatch.FileWatcher {
	fw := vfswatch.NewFileWatcher(fs, 10*time.Millisecond, true, func() {})
	fw.UpdateWatchState(defaultPaths, nil)
	return fw
}

// TestRaceHasChangesVsUpdateWatchState tests for data races between
// concurrent HasChanges reads and UpdateWatchState writes on the
// WatchState map.
func TestRaceHasChangesVsUpdateWatchState(t *testing.T) {
	t.Parallel()
	fs := newTestFS()
	fw := newWatcherWithState(fs)

	var wg sync.WaitGroup

	for range 10 {
		wg.Go(func() {
			for range 200 {
				fw.HasChangesFromWatchState()
			}
		})
	}

	for range 5 {
		wg.Go(func() {
			for range 100 {
				fw.UpdateWatchState([]string{"/src/a.ts", "/src/b.ts"}, nil)
			}
		})
	}

	wg.Wait()
}

// TestRaceWildcardDirectoriesAccess tests for data races when
// WildcardDirectories is read internally by HasChanges while being
// replaced concurrently via UpdateWatchState.
func TestRaceWildcardDirectoriesAccess(t *testing.T) {
	t.Parallel()
	fs := newTestFS()
	fw := newWatcherWithState(fs)
	fw.UpdateWatchState(defaultPaths, map[string]bool{"/src": true})

	var wg sync.WaitGroup

	for range 10 {
		wg.Go(func() {
			for range 200 {
				fw.HasChangesFromWatchState()
			}
		})
	}

	for range 5 {
		wg.Go(func() {
			for range 100 {
				fw.UpdateWatchState(defaultPaths, map[string]bool{"/src": true})
			}
		})
	}

	wg.Wait()
}

// TestRacePollIntervalAccess tests for data races on the PollInterval
// field when it is read and written from multiple goroutines.
func TestRacePollIntervalAccess(t *testing.T) {
	t.Parallel()
	fs := newTestFS()
	fw := newWatcherWithState(fs)

	var wg sync.WaitGroup

	for range 10 {
		wg.Go(func() {
			for range 500 {
				fw.HasChangesFromWatchState()
			}
		})
	}

	for i := range 5 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 200 {
				fw.SetPollInterval(time.Duration(i*200+j) * time.Millisecond)
			}
		}(i)
	}

	wg.Wait()
}

// TestRaceMixedOperations hammers all FileWatcher operations
// concurrently: HasChanges, UpdateWatchState, FS mutations,
// and PollInterval writes.
func TestRaceMixedOperations(t *testing.T) {
	t.Parallel()
	fs := newTestFS()
	fw := newWatcherWithState(fs)
	fw.UpdateWatchState(defaultPaths, map[string]bool{"/src": true})

	var wg sync.WaitGroup

	// HasChanges readers
	for range 8 {
		wg.Go(func() {
			for range 100 {
				fw.HasChangesFromWatchState()
			}
		})
	}

	// UpdateWatchState writers
	for i := range 4 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 50 {
				paths := []string{"/src/a.ts", fmt.Sprintf("/src/new_%d_%d.ts", i, j)}
				fw.UpdateWatchState(paths, map[string]bool{"/src": true})
			}
		}(i)
	}

	// FS modifiers
	for i := range 4 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 50 {
				path := fmt.Sprintf("/src/gen_%d_%d.ts", i, j)
				_ = fs.WriteFile(path, fmt.Sprintf("const x = %d;", j))
				if j%3 == 0 {
					_ = fs.Remove(path)
				}
			}
		}(i)
	}

	// PollInterval writers
	for i := range 2 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 100 {
				fw.SetPollInterval(time.Duration(50+j) * time.Millisecond)
			}
		}(i)
	}

	wg.Wait()
}

// TestRaceUpdateWithConcurrentFileModifications creates and deletes
// files on the FS while UpdateWatchState is scanning the same FS,
// testing for races between the FS walker and concurrent mutations.
func TestRaceUpdateWithConcurrentFileModifications(t *testing.T) {
	t.Parallel()
	fs := newTestFS()
	fw := newWatcherWithState(fs)
	fw.UpdateWatchState(defaultPaths, map[string]bool{"/src": true})

	var wg sync.WaitGroup

	// Rapid file creation/deletion
	for i := range 6 {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			for j := range 100 {
				path := fmt.Sprintf("/src/churn_%d_%d.ts", i, j)
				_ = fs.WriteFile(path, fmt.Sprintf("export const v = %d;", j))
				_ = fs.Remove(path)
			}
		}(i)
	}

	// Concurrent UpdateWatchState (walks the FS tree via WildcardDirectories)
	for range 4 {
		wg.Go(func() {
			for range 50 {
				fw.UpdateWatchState([]string{"/src/a.ts", "/tsconfig.json"}, map[string]bool{"/src": true})
			}
		})
	}

	wg.Wait()
}

// FuzzFileWatcherOperations fuzzes random sequences of file operations
// and watcher state management to find panics and edge cases.
// Run with -race to also detect data races.
func FuzzFileWatcherOperations(f *testing.F) {
	f.Add([]byte{0, 1, 2, 3, 0, 1, 2, 3})
	f.Add([]byte{2, 2, 2, 0, 0, 1, 3, 3})
	f.Add([]byte{3, 3, 3, 3, 0, 0, 0, 0})
	f.Add([]byte{4, 4, 4, 0, 2, 1, 3, 2})
	f.Add([]byte{5, 5, 5, 5, 5, 5, 5, 5})
	f.Add([]byte{0, 0, 0, 0, 0, 0, 0, 0})
	f.Add([]byte{1, 1, 1, 1, 1, 1, 1, 1})

	f.Fuzz(func(t *testing.T, ops []byte) {
		if len(ops) == 0 {
			return
		}

		fs := newTestFS()
		fw := newWatcherWithState(fs)

		files := []string{"/src/a.ts", "/src/b.ts", "/src/c.ts", "/src/new.ts", "/src/sub/new.ts"}

		for i, op := range ops {
			path := files[i%len(files)]

			switch op % 6 {
			case 0: // Write/modify a file
				_ = fs.WriteFile(path, fmt.Sprintf("const x = %d;", i))
			case 1: // Remove a file
				_ = fs.Remove(path)
			case 2: // Check for changes against current state
				fw.HasChangesFromWatchState()
			case 3: // Rebuild watch state
				fw.UpdateWatchState(files, nil)
			case 4: // Set wildcard directories and check for changes
				fw.UpdateWatchState(files, map[string]bool{"/src": true})
				fw.HasChangesFromWatchState()
			case 5: // Modify PollInterval
				fw.SetPollInterval(time.Duration(i*10) * time.Millisecond)
			}
		}
	})
}

// FuzzFileWatcherConcurrent is a fuzz test that runs random operations
// from multiple goroutines to find concurrency bugs.
func FuzzFileWatcherConcurrent(f *testing.F) {
	f.Add([]byte{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5})
	f.Add([]byte{0, 0, 0, 3, 3, 3, 2, 2, 2, 1, 1, 1})
	f.Add([]byte{2, 3, 2, 3, 2, 3, 0, 0, 0, 0, 0, 0})

	f.Fuzz(func(t *testing.T, ops []byte) {
		if len(ops) < 4 {
			return
		}

		fs := newTestFS()
		fw := newWatcherWithState(fs)
		fw.UpdateWatchState(defaultPaths, map[string]bool{"/src": true})

		files := []string{"/src/a.ts", "/src/b.ts", "/src/c.ts", "/src/new.ts"}

		// Split ops into chunks for different goroutines
		chunkSize := len(ops) / 2
		if chunkSize == 0 {
			chunkSize = 1
		}

		var wg sync.WaitGroup

		for start := 0; start < len(ops); start += chunkSize {
			end := min(start+chunkSize, len(ops))
			chunk := ops[start:end]

			wg.Add(1)
			go func(chunk []byte, goroutineID int) {
				defer wg.Done()
				for i, op := range chunk {
					path := files[(goroutineID*len(chunk)+i)%len(files)]
					switch op % 4 {
					case 0:
						_ = fs.WriteFile(path, fmt.Sprintf("const g%d = %d;", goroutineID, i))
					case 1:
						_ = fs.Remove(path)
					case 2:
						fw.HasChangesFromWatchState()
					case 3:
						fw.UpdateWatchState([]string{path}, map[string]bool{"/src": true})
					}
				}
			}(chunk, start/chunkSize)
		}

		wg.Wait()
	})
}
