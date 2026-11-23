package requestfilesystem

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRebaseFileChangesMatchLayerUpdate(t *testing.T) {
	t.Parallel()
	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindFull,
		Files: map[string]string{
			"/removed/nested/file.ts": "removed",
			"/replaced.ts":            "old",
			"/dir/old.ts":             "old listing",
			"/target/old.ts":          "old target",
		},
		Symlinks: map[string]RequestSymlink{
			"/alias": {Target: "/removed"},
			"/link":  {Target: "/target/old.ts"},
		},
	}, vfstest.FromMap(map[string]string{}, tspath.CaseSensitive), "/")
	assert.NilError(t, err)
	for name, params := range map[string]*RequestFileSystem{
		"files and tombstones": {
			Kind:         KindLayer,
			Files:        map[string]string{"/replaced.ts": "new", "/created.ts": "created"},
			RemovedPaths: []string{"/removed", "/missing", "/replaced.ts"},
		},
		"listings and symlinks": {
			Kind:        KindLayer,
			Directories: map[string]RequestDirectoryEntries{"/dir": {}},
			Symlinks:    map[string]RequestSymlink{"/link": {Target: "/elsewhere"}, "/new": {Target: "/host", Host: true}},
		},
	} {
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			source, sourceErr := newRequestFileSystem(params, vfstest.FromMap(map[string]string{}, tspath.CaseSensitive), "/")
			assert.NilError(t, sourceErr)
			var expected, actual project.FileChangeSummary
			_, updateErr := NewForUpdate(params, base, "/", &expected)
			assert.NilError(t, updateErr)
			Rebase(source, base, base, &actual)
			assert.DeepEqual(t, actual, expected)
		})
	}
}

func TestRebaseFileChangesPreserveTombstoneCasing(t *testing.T) {
	t.Parallel()
	host := vfstest.FromMap(map[string]string{"C:/Repo/Removed/index.ts": "old"}, tspath.CaseInsensitive)
	source, err := newRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{"C:/Repo/Removed"},
	}, host, "C:/Repo")
	assert.NilError(t, err)
	var summary project.FileChangeSummary
	Rebase(source, host, host, &summary)
	assert.Assert(t, summary.Deleted.Has("file:///c%3A/Repo/Removed"))
	assert.Equal(t, summary.Deleted.Len(), 1)
}

func TestRebaseFileChangesUnderMatchingTombstones(t *testing.T) {
	t.Parallel()
	for _, preserved := range []int{0, 1, 2} {
		t.Run(strconv.Itoa(preserved), func(t *testing.T) {
			t.Parallel()
			host := vfstest.FromMap(map[string]string{}, tspath.CaseSensitive)
			base, err := newRequestFileSystem(&RequestFileSystem{
				Kind: KindLayer,
				Files: map[string]string{
					"/removed/keep.ts":       "keep",
					"/removed/extra/file.ts": "extra",
				},
				RemovedPaths: []string{"/removed"},
				Symlinks:     map[string]RequestSymlink{"/alias": {Target: "/removed"}},
			}, host, "/")
			assert.NilError(t, err)
			files := map[string]string{}
			if preserved >= 1 {
				files["/removed/keep.ts"] = "keep"
			}
			if preserved == 2 {
				files["/removed/extra/file.ts"] = "extra"
			}
			source, err := newRequestFileSystem(&RequestFileSystem{
				Kind: KindLayer, Files: files, RemovedPaths: []string{"/removed"},
			}, host, "/")
			assert.NilError(t, err)
			var summary project.FileChangeSummary
			Rebase(source, base, base, &summary)
			var expected project.FileChangeSummary
			switch preserved {
			case 0:
				expected.Deleted.Add("file:///removed")
				expected.Deleted.Add("file:///alias")
			case 1:
				expected.Deleted.Add("file:///removed/extra")
				expected.Deleted.Add("file:///alias/extra")
			}
			expected.IncludesWatchChangeOutsideNodeModules = preserved != 2
			assert.DeepEqual(t, summary, expected)
		})
	}
}

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
	}, vfstest.FromMap(map[string]string{}, tspath.CaseSensitive), "/")
	assert.NilError(t, err)

	var summary project.FileChangeSummary
	_, err = NewForUpdate(&RequestFileSystem{
		Kind:         KindLayer,
		Files:        map[string]string{"/replaced.ts": "new"},
		RemovedPaths: []string{"removed", "/missing", "/replaced.ts"},
	}, base, "/", &summary)
	assert.NilError(t, err)
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
	}, tspath.CaseSensitive)

	var summary project.FileChangeSummary
	_, err := NewForUpdate(&RequestFileSystem{
		Kind: KindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {},
		},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/target"},
			"/new":  {Target: "/host", Host: true},
		},
	}, base, "/", &summary)
	assert.NilError(t, err)
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
	}, vfstest.FromMap(map[string]string{}, tspath.CaseSensitive), "/")
	assert.NilError(t, err)

	var summary project.FileChangeSummary
	_, err = NewForUpdate(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/dir/file.ts": "new"},
	}, base, "/", &summary)
	assert.NilError(t, err)
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
	}, vfstest.FromMap(map[string]string{}, tspath.CaseSensitive), "/")
	assert.NilError(t, err)
	content, ok := base.ReadFile("/link/file.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "old")

	var summary project.FileChangeSummary
	_, err = NewForUpdate(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/file.ts": "new"},
	}, base, "/", &summary)
	assert.NilError(t, err)
	assert.Equal(t, summary.Changed.Len(), 2)
	assert.Assert(t, summary.Changed.Has("file:///file.ts"))
	assert.Assert(t, summary.Changed.Has("file:///link/file.ts"))
	assert.Equal(t, summary.Created.Len(), 0)
}
