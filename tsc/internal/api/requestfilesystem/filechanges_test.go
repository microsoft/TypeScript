package requestfilesystem

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func changeMap(changes []project.FileSourceLayerChange) map[string][2]bool {
	result := make(map[string][2]bool, len(changes))
	for _, change := range changes {
		result[change.Path] = [2]bool{change.Structural, change.ShadowsDescendants}
	}
	return result
}

func TestFileSourceLayerChangesIncludeDirectoryTombstones(t *testing.T) {
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

	changes := changeMap(getFileSourceLayerChanges(&RequestFileSystem{
		Kind:         KindLayer,
		Files:        map[string]string{"/replaced.ts": "new"},
		RemovedPaths: []string{"removed", "/missing", "/replaced.ts"},
	}, base, "/", true))
	assert.DeepEqual(t, changes, map[string][2]bool{
		"/alias":                  {true, true},
		"/alias/nested/file.ts":   {},
		"/missing":                {true, true},
		"/removed":                {true, true},
		"/removed/nested/file.ts": {},
		"/replaced.ts":            {},
	})
}

func TestFileSourceLayerChangesIncludeDirectoryReplacedByFile(t *testing.T) {
	t.Parallel()

	changes := getFileSourceLayerChanges(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/replaced": "new"},
	}, nil, "/", true)
	assert.DeepEqual(t, changes, []project.FileSourceLayerChange{{Path: "/replaced"}})
}

func TestFileSourceLayerChangesIncludeListingsAndSymlinks(t *testing.T) {
	t.Parallel()

	changes := changeMap(getFileSourceLayerChanges(&RequestFileSystem{
		Kind: KindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {},
		},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/target"},
			"/new":  {Target: "/host", Host: true},
		},
	}, nil, "/", true))
	assert.DeepEqual(t, changes, map[string][2]bool{
		"/dir":  {true, false},
		"/link": {true, true},
		"/new":  {true, true},
	})
}

func TestFileSourceLayerChangesIncludeRecursiveSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindFull,
		Files: map[string]string{"/dir/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/dir/link": {Target: "/dir"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	changes := getFileSourceLayerChanges(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/dir/file.ts": "new"},
	}, base, "/", true)
	assert.DeepEqual(t, changes, []project.FileSourceLayerChange{
		{Path: "/dir/file.ts"},
		{Path: "/dir/link/file.ts"},
	})
}

func TestFileSourceLayerChangesIncludeRootSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindFull,
		Files: map[string]string{"/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	changes := getFileSourceLayerChanges(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/file.ts": "new"},
	}, base, "/", true)
	assert.DeepEqual(t, changes, []project.FileSourceLayerChange{
		{Path: "/file.ts"},
		{Path: "/link/file.ts"},
	})
}
