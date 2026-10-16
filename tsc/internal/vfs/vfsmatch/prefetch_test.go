package vfsmatch

import (
	"fmt"
	"maps"
	"runtime"
	"sync"
	"sync/atomic"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
	"gotest.tools/v3/assert"
)

// countingFS counts directory reads per path. When symlinks is non-nil, entries
// report which child directories are symlinks, like the OS file system does;
// otherwise Symlinks is nil and callers must use Realpath.
type countingFS struct {
	vfs.FS
	mu       sync.Mutex
	reads    map[string]int
	symlinks map[string]bool
}

func newCountingFS(files map[string]any, reportSymlinks bool) *countingFS {
	c := &countingFS{reads: map[string]int{}}
	if reportSymlinks {
		c.symlinks = map[string]bool{}
	}
	base := vfstest.FromMap(toMapFiles(files, c.symlinks), tspath.CaseSensitive)
	c.FS = wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path tspath.RootedDirectoryPath) vfs.Entries {
			c.mu.Lock()
			c.reads[path.AsString()]++
			c.mu.Unlock()
			entries := base.GetAccessibleEntries(path)
			entries.Symlinks = nil
			if c.symlinks != nil {
				entries.Symlinks = map[string]struct{}{}
				for _, name := range entries.Directories {
					if c.symlinks[tspath.CombinePaths(path.AsString(), name)] {
						entries.Symlinks[name] = struct{}{}
					}
				}
			}
			return entries
		},
	})
	return c
}

// symlinkMarker declares a directory symlink in a test file map.
type symlinkMarker struct{ target string }

func toMapFiles(files map[string]any, symlinks map[string]bool) map[string]any {
	result := make(map[string]any, len(files))
	for path, file := range files {
		if link, ok := file.(symlinkMarker); ok {
			result[path] = vfstest.Symlink(link.target)
			if symlinks != nil {
				symlinks[path] = true
			}
			continue
		}
		result[path] = file
	}
	return result
}

func (c *countingFS) readCounts() map[string]int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return maps.Clone(c.reads)
}

func TestPrefetchMatchesSerialWalk(t *testing.T) {
	t.Parallel()

	type testCase struct {
		name string
		// path defaults to /root.
		path     tspath.RootedDirectoryPath
		files    map[string]any
		includes []string
		excludes []string
		depth    int
		// reads are the expected directory reads with the prefetch enabled; each
		// directory spelling must be read at most once.
		reads map[string]int
		// prefetchOnly lists entries of reads that the serial walk alone does not read.
		prefetchOnly []string
	}
	cases := []testCase{
		{
			name: "symlink cycle",
			files: map[string]any{
				"/root/file.ts":   "",
				"/root/a/file.ts": "",
				"/root/a/b":       symlinkMarker{"/root/a"},
			},
			includes: []string{"**/*"},
			depth:    UnlimitedDepth,
			reads:    map[string]int{"/root": 1, "/root/a": 1},
		},
		{
			// The walk reaches z through the alias a first, so it reads a's subtree
			// itself and skips z. The prefetch does not follow symlinks and has read
			// z's subtree under its real spelling; no spelling is read twice.
			name: "alias sorts before target",
			files: map[string]any{
				"/root/a":            symlinkMarker{"/root/z"},
				"/root/z/f.ts":       "",
				"/root/z/sub/g.ts":   "",
				"/root/z/sub/x/h.ts": "",
			},
			includes: []string{"**/*"},
			depth:    UnlimitedDepth,
			reads: map[string]int{
				"/root":   1,
				"/root/a": 1, "/root/a/sub": 1, "/root/a/sub/x": 1,
				"/root/z": 1, "/root/z/sub": 1, "/root/z/sub/x": 1,
			},
			prefetchOnly: []string{"/root/z", "/root/z/sub", "/root/z/sub/x"},
		},
		{
			name: "alias sorts after target",
			files: map[string]any{
				"/root/a/f.ts":     "",
				"/root/a/sub/g.ts": "",
				"/root/b":          symlinkMarker{"/root/a"},
			},
			includes: []string{"**/*"},
			depth:    UnlimitedDepth,
			reads:    map[string]int{"/root": 1, "/root/a": 1, "/root/a/sub": 1},
		},
		{
			name: "depth, excludes, and multiple base paths",
			files: map[string]any{
				"/root/src/a/b/c/deep.ts":     "",
				"/root/src/a/shallow.ts":      "",
				"/root/src/skip/x.ts":         "",
				"/root/src/node_modules/m.ts": "",
				"/other/lib/l.ts":             "",
				"/other/lib/inner/i.ts":       "",
			},
			includes: []string{"src/**/*", "../other/lib/**/*"},
			excludes: []string{"src/skip"},
			depth:    3,
			reads: map[string]int{
				"/root": 1, "/root/src": 1, "/root/src/a": 1, "/root/src/skip": 1,
				"/other/lib": 1, "/other/lib/inner": 1,
			},
		},
		{
			// The base path /root/src is also below the include base path /root.
			name: "include in ancestor directory",
			path: "/root/src",
			files: map[string]any{
				"/root/top.ts":       "",
				"/root/src/a/f.ts":   "",
				"/root/src/a/b/g.ts": "",
				"/root/lib/sub/h.ts": "",
			},
			includes: []string{"../**/*"},
			depth:    UnlimitedDepth,
			reads: map[string]int{
				"/root": 1, "/root/lib": 1, "/root/lib/sub": 1,
				"/root/src": 1, "/root/src/a": 1, "/root/src/a/b": 1,
			},
		},
		{
			// Base /root/src is read with the full depth even though base /root
			// reaches it with less remaining depth.
			name: "include in ancestor directory with depth",
			path: "/root/src",
			files: map[string]any{
				"/root/src/a/f.ts":     "",
				"/root/src/a/b/g.ts":   "",
				"/root/src/a/b/c/h.ts": "",
			},
			includes: []string{"**/*", "../**/*"},
			depth:    3,
			reads: map[string]int{
				"/root": 1, "/root/src": 1, "/root/src/a": 1, "/root/src/a/b": 1,
			},
		},
	}

	for _, tc := range cases {
		if tc.path == "" {
			tc.path = "/root"
		}
		for _, reportSymlinks := range []bool{false, true} {
			t.Run(fmt.Sprintf("%s/reportSymlinks=%v", tc.name, reportSymlinks), func(t *testing.T) {
				t.Parallel()
				serialFS := newCountingFS(tc.files, reportSymlinks)
				expected := matchFileNamesWithPrefetch(tc.path, []string{".ts"}, tc.excludes, tc.includes, tc.depth, serialFS, 0)
				serialReads := maps.Clone(tc.reads)
				for _, path := range tc.prefetchOnly {
					delete(serialReads, path)
				}
				assert.DeepEqual(t, serialFS.readCounts(), serialReads)

				for _, workers := range []int{1, 4} {
					fs := newCountingFS(tc.files, reportSymlinks)
					got := matchFileNamesWithPrefetch(tc.path, []string{".ts"}, tc.excludes, tc.includes, tc.depth, fs, workers)
					assert.DeepEqual(t, got, expected)
					assert.DeepEqual(t, fs.readCounts(), tc.reads)
				}
			})
		}
	}
}

func TestPrefetchBoundsConcurrency(t *testing.T) { //nolint:paralleltest // Measures process-wide goroutine counts
	const width = 2000
	const workers = 4

	files := map[string]any{}
	for i := range width {
		files[fmt.Sprintf("/root/d%d/f.ts", i)] = ""
	}
	base := vfstest.FromMap(files, tspath.CaseSensitive)

	release := make(chan struct{})
	var inFlight, maxInFlight, blocked atomic.Int32
	host := wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path tspath.RootedDirectoryPath) vfs.Entries {
			n := inFlight.Add(1)
			for {
				m := maxInFlight.Load()
				if n <= m || maxInFlight.CompareAndSwap(m, n) {
					break
				}
			}
			defer inFlight.Add(-1)
			if path != "/root" {
				blocked.Add(1)
				<-release
			}
			return base.GetAccessibleEntries(path)
		},
	})

	before := runtime.NumGoroutine()
	done := make(chan []tspath.RootedFilePath)
	go func() {
		done <- matchFileNamesWithPrefetch("/root", []string{".ts"}, nil, []string{"**/*"}, UnlimitedDepth, host, workers)
	}()

	for blocked.Load() < workers {
		runtime.Gosched()
	}
	// All workers are blocked on the host; nothing else may have been started.
	assert.Equal(t, inFlight.Load(), int32(workers))
	assert.Assert(t, runtime.NumGoroutine()-before <= workers+1, "goroutines: %d", runtime.NumGoroutine()-before)

	close(release)
	got := <-done
	assert.Equal(t, len(got), width)
	assert.Equal(t, maxInFlight.Load(), int32(workers))
}

func TestPrefetchLeafScanStartsNoWorkers(t *testing.T) { //nolint:paralleltest // Measures process-wide goroutine counts
	base := vfstest.FromMap(map[string]any{"/root/f.ts": "", "/root/g.ts": ""}, tspath.CaseSensitive)
	var goroutinesDuringRead int
	host := wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path tspath.RootedDirectoryPath) vfs.Entries {
			goroutinesDuringRead = runtime.NumGoroutine()
			return base.GetAccessibleEntries(path)
		},
	})
	before := runtime.NumGoroutine()
	got := matchFileNamesWithPrefetch("/root", []string{".ts"}, nil, []string{"**/*"}, UnlimitedDepth, host, 64)
	assert.Equal(t, len(got), 2)
	assert.Equal(t, goroutinesDuringRead, before)
}

func TestPrefetchRethrowsHostPanic(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]any{
		"/root/a/f.ts": "",
		"/root/b/g.ts": "",
	}, tspath.CaseSensitive)
	var panicked atomic.Bool
	host := wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path tspath.RootedDirectoryPath) vfs.Entries {
			if path == "/root/a" && panicked.CompareAndSwap(false, true) {
				panic("host failure")
			}
			return base.GetAccessibleEntries(path)
		},
	})

	// The host fails only once, so a walk that retried the directory after
	// swallowing the prefetch panic would succeed.
	var recovered any
	func() {
		defer func() { recovered = recover() }()
		matchFileNamesWithPrefetch("/root", []string{".ts"}, nil, []string{"**/*"}, UnlimitedDepth, host, 4)
	}()
	assert.Equal(t, recovered, "host failure")
}
