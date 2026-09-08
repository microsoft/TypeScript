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
	assert.Equal(t, summary.Deleted.Len(), 2)
	assert.Assert(t, summary.Deleted.Has("file:///removed"))
	assert.Assert(t, summary.Deleted.Has("file:///alias"))
	assert.Equal(t, summary.Changed.Len(), 1)
	assert.Assert(t, summary.Changed.Has("file:///replaced.ts"))
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
