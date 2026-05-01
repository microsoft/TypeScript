package vfswatch_test

import (
	"sync/atomic"
	"testing"
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"github.com/microsoft/typescript-go/internal/vfs/vfswatch"
)

// countingFS wraps a vfs.FS and counts calls to GetAccessibleEntries.
type countingFS struct {
	vfs.FS
	n atomic.Int64
}

func (c *countingFS) GetAccessibleEntries(path string) vfs.Entries {
	c.n.Add(1)
	return c.FS.GetAccessibleEntries(path)
}

// TestHasChangesNoRedundantGetAccessibleEntries verifies that
// HasChangesFromWatchState calls GetAccessibleEntries only for directories
// that are part of a recursive wildcard tree, and exactly once each — never
// for directories that merely happened to be in the explicit paths list.
//
// Setup: /src is a recursive wildcard root containing /src and /src/sub.
// The explicit paths list also contains /node_modules (a directory accessed
// during compilation but with no wildcard scope) and the tsconfig file.
// A single HasChangesFromWatchState call should call GetAccessibleEntries
// exactly twice: once for /src and once for /src/sub. /node_modules is a
// directory but is *not* a wildcard tree member, so it gets only a Stat —
// the watcher does not depend on its listing.
func TestHasChangesNoRedundantGetAccessibleEntries(t *testing.T) {
	t.Parallel()

	inner := vfstest.FromMap(map[string]string{
		"/src/a.ts":          "const a = 1;",
		"/src/b.ts":          "const b = 2;",
		"/src/sub/c.ts":      "const c = 3;",
		"/node_modules/x.js": "",
		"/tsconfig.json":     "{}",
	}, true)
	cfs := &countingFS{FS: inner}

	fw := vfswatch.NewFileWatcher(cfs, 10*time.Millisecond, true, func() {})
	fw.UpdateWatchState(
		[]string{"/src/a.ts", "/src/b.ts", "/src/sub/c.ts", "/node_modules", "/tsconfig.json"},
		map[string]bool{"/src": true},
	)

	cfs.n.Store(0) // reset counter after baseline snapshot

	fw.HasChangesFromWatchState()

	// Only /src and /src/sub (the wildcard tree) are tracked with ChildrenHash.
	// /node_modules is a directory in the explicit paths list but should NOT be
	// hashed: its listing is not something the watcher depends on.
	if got := cfs.n.Load(); got != 2 {
		t.Errorf("GetAccessibleEntries called %d times, want 2 (once per wildcard-tree dir)", got)
	}
}
