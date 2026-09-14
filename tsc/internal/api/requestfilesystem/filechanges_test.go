package requestfilesystem

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestFileChangesIncludeDirectoryTombstones(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindFull,
		Files: map[string]string{
			"/removed/nested/file.ts": "removed",
			"/replaced.ts":            "old",
		},
		Symlinks: map[string]RequestSymlink{
			"/alias": {Target: "/removed"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	var summary project.FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:         KindLayer,
		Files:        map[string]string{"/replaced.ts": "new"},
		RemovedPaths: []string{"removed", "/missing", "/replaced.ts"},
	}, base, "/")
	assert.Assert(t, !summary.InvalidateAll)
	assert.Assert(t, summary.IncludesWatchChangeOutsideNodeModules)
	assert.Equal(t, summary.Deleted.Len(), 4)
	assert.Assert(t, summary.Deleted.Has("file:///removed"))
	assert.Assert(t, summary.Deleted.Has("file:///alias"))
	assert.Assert(t, summary.Deleted.Has("file:///removed/nested/file.ts"))
	assert.Assert(t, summary.Deleted.Has("file:///alias/nested/file.ts"))
	assert.Equal(t, summary.Changed.Len(), 1)
	assert.Assert(t, summary.Changed.Has("file:///replaced.ts"))
}

func TestFileChangesIncludeDirectoryReplacedByFile(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/replaced/child.ts": "old",
	}, true)
	var summary project.FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/replaced": "new"},
	}, base, "/")

	assert.Assert(t, summary.Deleted.Has("file:///replaced"))
	// replaced/child.ts not included here because it's owned by the host file system.
	// If it were owned by the request filesystem, it would be included in the directory expansion.
	// Instead, it will be expanded by snapshotFSBuilder at a later step.
	assert.Assert(t, summary.Created.Has("file:///replaced"))
	assert.Assert(t, !summary.Changed.Has("file:///replaced"))
}

func TestFileChangesIncludeListingsAndSymlinks(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/dir/old.ts":  "old listing",
		"/link/old.ts": "old target",
	}, true)
	var summary project.FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind: KindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {},
		},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/target"},
			"/new":  {Target: "/host", Host: true},
		},
	}, base, "/")
	assert.Assert(t, !summary.InvalidateAll)
	assert.Equal(t, summary.Deleted.Len(), 2)
	assert.Assert(t, summary.Deleted.Has("file:///dir"))
	assert.Assert(t, summary.Deleted.Has("file:///link"))
	assert.Equal(t, summary.Created.Len(), 3)
	assert.Assert(t, summary.Created.Has("file:///dir"))
	assert.Assert(t, summary.Created.Has("file:///link"))
	assert.Assert(t, summary.Created.Has("file:///new"))
}

func TestFileChangesIncludeRecursiveSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindFull,
		Files: map[string]string{"/dir/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/dir/link": {Target: "/dir"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	var summary project.FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/dir/file.ts": "new"},
	}, base, "/")
	assert.Equal(t, summary.Changed.Len(), 2)
	assert.Assert(t, summary.Changed.Has("file:///dir/file.ts"))
	assert.Assert(t, summary.Changed.Has("file:///dir/link/file.ts"))
	assert.Equal(t, summary.Created.Len(), 0)
}

func TestFileChangesIncludeRootSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindFull,
		Files: map[string]string{"/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	content, ok := base.ReadFile("/link/file.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "old")

	var summary project.FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/file.ts": "new"},
	}, base, "/")
	assert.Equal(t, summary.Changed.Len(), 2)
	assert.Assert(t, summary.Changed.Has("file:///file.ts"))
	assert.Assert(t, summary.Changed.Has("file:///link/file.ts"))
	assert.Equal(t, summary.Created.Len(), 0)
}
