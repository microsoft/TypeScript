package watchmanager

import (
	"fmt"
	"io"
	"slices"
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fswatch"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

type eventOnlyFS struct {
	vfs.FS
	caseSensitive bool
}

type countingWatchFS struct {
	vfs.FS
	realpathCalls int
	entriesCalls  int
}

func (f *countingWatchFS) Realpath(path string) string {
	f.realpathCalls++
	return f.FS.Realpath(path)
}

func (f *countingWatchFS) GetAccessibleEntries(path string) vfs.Entries {
	f.entriesCalls++
	entries := f.FS.GetAccessibleEntries(path)
	// This fixture contains no symlinks.
	entries.Symlinks = map[string]struct{}{}
	return entries
}

func TestWatchGenerationReusesUnchangedResolution(t *testing.T) {
	t.Parallel()
	files := make(map[string]string)
	var names []string
	for i := range 1000 {
		name := fmt.Sprintf("/repo/src/file%d.ts", i)
		names = append(names, name)
		files[name] = ""
	}
	filesystem := &countingWatchFS{FS: vfstest.FromMap(files, true)}
	cached := cachedvfs.From(filesystem)
	for _, dir := range []string{"/", "/repo", "/repo/src"} {
		cached.GetAccessibleEntries(dir)
	}
	initialScans := filesystem.entriesCalls
	wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
	wm.SetResolutionFS(cached)
	wm.SetWatchFiles(names)
	assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
	wm.SetResolutionFS(nil)
	assert.Equal(t, filesystem.entriesCalls, initialScans, "reuse the build's directory listings")
	assert.Assert(t, filesystem.realpathCalls < 10, "ordinary leaves should share directory resolution: %d", filesystem.realpathCalls)
	calls, scans := filesystem.realpathCalls, filesystem.entriesCalls
	aliases := wm.aliases
	wm.SetWatchFiles(names)
	assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
	assert.Equal(t, filesystem.realpathCalls, calls)
	assert.Equal(t, filesystem.entriesCalls, scans)
	assert.Assert(t, wm.aliases == aliases, "unchanged generation must retain its alias index")
	wm.onWatchEvents([]fswatch.Event{{Path: names[0], Kind: fswatch.EventUpdate}}, nil)
	wm.DrainEvents()
	assert.Equal(t, filesystem.realpathCalls, calls, "events must not resolve paths")
	assert.Equal(t, filesystem.entriesCalls, scans, "events must not scan directories")
	assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
	assert.Assert(t, filesystem.realpathCalls-calls < 10, "one changed leaf must not resolve all unchanged leaves")
	assert.Assert(t, filesystem.entriesCalls-scans < 10, "one changed leaf must not scan all directories")
	assert.Assert(t, wm.aliases == aliases, "ordinary file updates must retain their alias index")
	reordered := slices.Clone(names)
	slices.Reverse(reordered)
	reordered = append(reordered, names[0])
	wm.SetWatchFiles(reordered)
	assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
	assert.Assert(t, wm.aliases == aliases, "order and duplicate observations do not change the generation")
	reordered[0] = names[0]
	wm.SetWatchFiles(reordered)
	assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
	assert.Assert(t, wm.aliases != aliases, "replacing a dependency with a duplicate must rebuild the generation")
}

func (f *eventOnlyFS) UseCaseSensitiveFileNames() bool { return f.caseSensitive }

func TestWatchDirectoryDeletionExpandsTrackedSubtree(t *testing.T) {
	t.Parallel()
	for _, caseSensitive := range []bool{false, true} {
		t.Run(strconv.FormatBool(caseSensitive), func(t *testing.T) {
			t.Parallel()
			filesystem := vfstest.FromMap(map[string]string{}, caseSensitive)
			wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
			wm.Lock()
			defer wm.Unlock()
			files := []string{"/repo/src/a.ts", "/repo/src/nested/b.ts", "/repo/src-other/c.ts", "/repo/SRC/other.ts", "/repo/ſ/d.ts"}
			for i := range 10000 {
				files = append(files, fmt.Sprintf("/unrelated/%d/file.ts", i))
			}
			wm.SetWatchFiles(files)
			assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
			// Event processing must not query the filesystem after deletion.
			wm.filesystem = &eventOnlyFS{caseSensitive: caseSensitive}
			wm.onWatchEvents([]fswatch.Event{
				{Path: "/repo/src", Kind: fswatch.EventDelete},
				{Path: "/repo/src/nested", Kind: fswatch.EventDelete},
				{Path: "/repo/src/a.ts", Kind: fswatch.EventUpdate},
				{Path: "/repo/s", Kind: fswatch.EventDelete},
				{Path: "/unknown", Kind: fswatch.EventDelete},
			}, nil)
			events, overflow := wm.DrainEvents()
			assert.Assert(t, !overflow)
			expected := map[string]fswatch.EventKind{
				"/repo/src":             fswatch.EventDelete,
				"/repo/src/nested":      fswatch.EventDelete,
				"/repo/src/a.ts":        fswatch.EventDelete,
				"/repo/src/nested/b.ts": fswatch.EventDelete,
				"/repo/s":               fswatch.EventDelete,
				"/unknown":              fswatch.EventDelete,
			}
			if !caseSensitive {
				expected["/repo/SRC/other.ts"] = fswatch.EventDelete
			}
			assert.DeepEqual(t, events, expected)
			wm.filesystem = filesystem
			wm.SetWatchFiles([]string{"/repo/new.ts"})
			assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
			wm.onWatchEvents([]fswatch.Event{{Path: "/repo/src", Kind: fswatch.EventDelete}}, nil)
			events, overflow = wm.DrainEvents()
			assert.Assert(t, !overflow)
			assert.DeepEqual(t, events, map[string]fswatch.EventKind{"/repo/src": fswatch.EventDelete})
		})
	}
}

func TestWatchAliasesDoNotFoldMockPaths(t *testing.T) {
	t.Parallel()
	for _, caseSensitive := range []bool{false, true} {
		filesystem := vfstest.FromMap(map[string]string{}, caseSensitive)
		wm := NewWatchManager(io.Discard, filesystem.DirectoryExists, filesystem)
		wm.Lock()
		wm.SetWatchFiles([]string{"/repo/ſ.ts", "/repo/e\u0301.ts"})
		assert.NilError(t, wm.ReconcileWatches(map[string]bool{"/repo": true}))
		wm.onWatchEvents([]fswatch.Event{
			{Path: "/repo/s.ts", Kind: fswatch.EventUpdate},
			{Path: "/repo/é.ts", Kind: fswatch.EventDelete},
			{Path: "/repo/new.ts", Kind: fswatch.EventUpdate},
		}, nil)
		events, overflow := wm.DrainEvents()
		wm.Unlock()
		assert.Assert(t, !overflow)
		assert.DeepEqual(t, events, map[string]fswatch.EventKind{
			"/repo/s.ts":   fswatch.EventUpdate,
			"/repo/é.ts":   fswatch.EventDelete,
			"/repo/new.ts": fswatch.EventUpdate,
		})
	}
}

var (
	caseSensitiveOpts   = tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true, CurrentDirectory: "/repo"}
	caseInsensitiveOpts = tspath.ComparePathsOptions{UseCaseSensitiveFileNames: false, CurrentDirectory: "/repo"}
)

// TestDirWatchSetCoverage checks the core coverage rules: a recursive watch
// covers itself and all descendants, while a non-recursive watch covers only
// itself. Ancestors and unrelated paths are never covered.
func TestDirWatchSetCoverage(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseSensitiveOpts)
	set.Set("/repo/src", true)             // recursive
	set.Set("/repo/config", false)         // non-recursive
	set.Set("/repo/node_modules/a", false) // non-recursive

	tests := []struct {
		dir  string
		want bool
	}{
		{"/repo/src", true},             // exact recursive
		{"/repo/src/nested", true},      // descendant of recursive
		{"/repo/src/nested/deep", true}, // deep descendant of recursive
		{"/repo/config", true},          // exact non-recursive
		{"/repo/config/nested", false},  // descendant of non-recursive: NOT covered
		{"/repo/node_modules/a", true},  // exact non-recursive
		{"/repo/node_modules/b", false}, // sibling, absent
		{"/repo", false},                // ancestor of watched dirs: NOT covered
		{"/other", false},               // unrelated
	}
	for _, tt := range tests {
		assert.Equal(t, set.Covered(tt.dir), tt.want, "Covered(%q)", tt.dir)
	}
}

// TestDirWatchSetCaseSensitive verifies that on a case-sensitive filesystem a
// differently-cased directory is a distinct, uncovered directory.
func TestDirWatchSetCaseSensitive(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseSensitiveOpts)
	set.Set("/repo/node_modules/a", false)
	set.Set("/repo/Src", true)

	assert.Assert(t, set.Covered("/repo/node_modules/a"))
	assert.Assert(t, !set.Covered("/repo/node_modules/A"), "case-sensitive FS must not cover differently-cased dir")
	assert.Assert(t, set.Covered("/repo/Src/nested"), "recursive descendant with matching case is covered")
	assert.Assert(t, !set.Covered("/repo/src/nested"), "case-sensitive FS must not cover differently-cased descendant")
}

// TestDirWatchSetCaseInsensitive verifies that on a case-insensitive filesystem
// coverage ignores casing for both exact matches and recursive containment.
func TestDirWatchSetCaseInsensitive(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseInsensitiveOpts)
	set.Set("/repo/node_modules/a", false)
	set.Set("/repo/Src", true)

	assert.Assert(t, set.Covered("/repo/node_modules/A"), "exact match should be case-insensitive")
	assert.Assert(t, set.Covered("/REPO/NODE_MODULES/a"), "exact match should be case-insensitive across components")
	assert.Assert(t, set.Covered("/repo/src/nested/deep"), "recursive containment should be case-insensitive")
}

// TestDirWatchSetCanonicalDedup verifies that on a case-insensitive filesystem
// directories that differ only by casing collapse to a single canonical entry,
// while a case-sensitive filesystem keeps them distinct.
func TestDirWatchSetCanonicalDedup(t *testing.T) {
	t.Parallel()

	insensitive := NewDirWatchSet(caseInsensitiveOpts)
	insensitive.Set("/repo/Node_Modules/PkgName", false)
	insensitive.Set("/repo/node_modules/pkgname", false) // same dir, different casing

	dirs := insensitive.Dirs()
	assert.Equal(t, len(dirs), 1, "differently-cased dirs must collapse to one entry")
	_, original := dirs["/repo/Node_Modules/PkgName"]
	assert.Assert(t, original, "Dirs must retain the original spelling used for registration")

	sensitive := NewDirWatchSet(caseSensitiveOpts)
	sensitive.Set("/repo/Node_Modules/PkgName", false)
	sensitive.Set("/repo/node_modules/pkgname", false) // distinct dirs when case-sensitive
	assert.Equal(t, len(sensitive.Dirs()), 2, "case-sensitive FS keeps differently-cased dirs distinct")
}

// TestDirWatchSetUpgradeToRecursive verifies that upgrading a directory from
// non-recursive to recursive begins covering its descendants.
func TestDirWatchSetUpgradeToRecursive(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseSensitiveOpts)
	set.Set("/repo/src", false)
	assert.Assert(t, set.Covered("/repo/src"))
	assert.Assert(t, !set.Covered("/repo/src/nested"), "descendant not covered while non-recursive")

	set.Set("/repo/src", true)
	assert.Assert(t, set.Covered("/repo/src/nested"), "descendant covered after upgrade to recursive")
	assert.Equal(t, set.Dirs()["/repo/src"], true)
}

// TestDirWatchSetNeverDowngrades verifies a recursive watch is not downgraded by
// a subsequent non-recursive Set of the same directory.
func TestDirWatchSetNeverDowngrades(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseSensitiveOpts)
	set.Set("/repo/src", true)
	set.Set("/repo/src", false)

	assert.Equal(t, set.Dirs()["/repo/src"], true)
	assert.Assert(t, set.Covered("/repo/src/nested"), "recursive coverage retained after non-recursive Set")
}

// TestDirWatchSetDirs verifies the emitted map reflects every added directory
// with the expected recursive flags.
func TestDirWatchSetDirs(t *testing.T) {
	t.Parallel()

	set := NewDirWatchSet(caseSensitiveOpts)
	set.Set("/repo/a", false)
	set.Set("/repo/b", true)
	set.Set("/repo/a", false) // duplicate non-recursive add is idempotent

	dirs := set.Dirs()
	assert.Equal(t, len(dirs), 2)
	assert.Equal(t, dirs["/repo/a"], false)
	assert.Equal(t, dirs["/repo/b"], true)
}
