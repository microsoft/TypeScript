package watchmanager

import (
	"io"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"gotest.tools/v3/assert"
)

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
	_, canonical := dirs["/repo/node_modules/pkgname"]
	assert.Assert(t, canonical, "Dirs must be keyed by the canonicalized path")

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

// TestResolveDesiredDirsShallowProject verifies that a directory that exists and was asked for is watched at any
// depth. A project close to the filesystem root (/app, /srv/app, a Docker WORKDIR) must not be silently ignored.
func TestResolveDesiredDirsShallowProject(t *testing.T) {
	t.Parallel()

	existing := map[string]bool{
		"/": true, "/app": true, "/app/src": true, "/srv": true, "/srv/app": true,
		"/home": true, "/home/user": true, "/home/user/project": true,
	}
	wm := NewWatchManager(io.Discard, func(dir string) bool { return existing[dir] })

	resolved := wm.ResolveDesiredDirs(map[string]bool{
		"/app":               true,
		"/app/src":           false,
		"/srv/app":           true,
		"/home/user/project": true,
	})

	assert.DeepEqual(t, resolved, map[string]bool{
		"/app":               true,
		"/app/src":           false,
		"/srv/app":           true,
		"/home/user/project": true,
	})
}

// TestResolveDesiredDirsAncestorFallback verifies that the depth check still guards the fallback to an ancestor,
// so a missing directory never turns into a watch on something too generic like /, /home or /home/user.
func TestResolveDesiredDirsAncestorFallback(t *testing.T) {
	t.Parallel()

	existing := map[string]bool{
		"/": true, "/app": true, "/home": true, "/home/user": true,
		"/repo": true, "/repo/a": true, "/repo/a/b": true, "/repo/a/b/c": true,
	}
	wm := NewWatchManager(io.Discard, func(dir string) bool { return existing[dir] })

	resolved := wm.ResolveDesiredDirs(map[string]bool{
		"/app/missing":              true, // ancestor /app is too shallow
		"/home/user/missing":        true, // ancestor /home/user is too shallow
		"/repo/a/b/c/missing/deep":  true, // ancestor /repo/a/b/c is deep enough, and is never recursive
		"/nothing/exists/anywhere/": true, // no existing ancestor except /
	})

	assert.DeepEqual(t, resolved, map[string]bool{"/repo/a/b/c": false})
}

// TestResolveDesiredDirsSkipsNonDiskPaths verifies that a directory that is not on disk, such as the embedded libs
// (bundled:///libs), is never watched, even though the wrapped FS reports that it exists.
func TestResolveDesiredDirsSkipsNonDiskPaths(t *testing.T) {
	t.Parallel()

	wm := NewWatchManager(io.Discard, func(dir string) bool { return true })

	resolved := wm.ResolveDesiredDirs(map[string]bool{
		"bundled:///libs": false,
		"/app":            true,
	})

	assert.DeepEqual(t, resolved, map[string]bool{"/app": true})
}
