package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

// hostFileSource stands in for a snapshot with no cached files or editor overlays.
type hostFileSource struct {
	fs vfs.FS
}

func (s hostFileSource) GetFile(fileName string) FileHandle {
	if content, ok := s.fs.ReadFile(fileName); ok {
		return NewFileHandle(fileName, content)
	}
	return nil
}

func (s hostFileSource) GetFileByPath(fileName string, _ tspath.Path) FileHandle {
	return s.GetFile(fileName)
}

func (s hostFileSource) FileExists(fileName string, _ tspath.Path) bool {
	return s.fs.FileExists(fileName)
}

func (s hostFileSource) DirectoryExists(path string) bool {
	return s.fs.DirectoryExists(path)
}

func (s hostFileSource) GetAccessibleEntries(path string) vfs.Entries {
	return s.fs.GetAccessibleEntries(path)
}

func (s hostFileSource) Realpath(path string) string { return s.fs.Realpath(path) }

func (s hostFileSource) UseCaseSensitiveFileNames() bool { return s.fs.UseCaseSensitiveFileNames() }

// baseFileSource builds the view a base snapshot would present: the given request
// filesystem layer, if any, stacked over host contents.
func baseFileSource(layer *requestFileSystem, host vfs.FS) FileSource {
	if layer == nil {
		return hostFileSource{fs: host}
	}
	return &SnapshotFS{
		upperLayer: layer,
		fs:         host,
		toPath: func(fileName string) tspath.Path {
			return tspath.ToPath(fileName, "/", host.UseCaseSensitiveFileNames())
		},
		overlays:           map[tspath.Path]*Overlay{},
		diskFiles:          map[tspath.Path]*diskFile{},
		diskDirectories:    map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{},
		overlayDirectories: map[tspath.Path]map[tspath.Path]string{},
	}
}

func TestFileChangesIncludeDirectoryTombstones(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind: RequestFileSystemKindFull,
		Files: map[string]string{
			"/removed/nested/file.ts": "removed",
			"/replaced.ts":            "old",
		},
		Symlinks: map[string]RequestSymlink{
			"/alias": {Target: "/removed"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	var summary FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:         RequestFileSystemKindLayer,
		Files:        map[string]string{"/replaced.ts": "new"},
		RemovedPaths: []string{"removed", "/missing", "/replaced.ts"},
	}, baseFileSource(base.requestFileSystem, vfstest.FromMap(map[string]string{}, true)), base.requestFileSystem, "/")
	assert.Assert(t, !summary.InvalidateAll)
	assert.Assert(t, summary.IncludesWatchChangeOutsideNodeModules)
	// The removed directory, the symlink aliasing it, and the base layer's files
	// under both, which the snapshot's cached directory tree does not describe.
	assert.Equal(t, summary.Deleted.Len(), 4)
	assert.Assert(t, summary.Deleted.Has("file:///removed"))
	assert.Assert(t, summary.Deleted.Has("file:///removed/nested/file.ts"))
	assert.Assert(t, summary.Deleted.Has("file:///alias"))
	assert.Assert(t, summary.Deleted.Has("file:///alias/nested/file.ts"))
	assert.Equal(t, summary.Changed.Len(), 1)
	assert.Assert(t, summary.Changed.Has("file:///replaced.ts"))
}

func TestFileChangesIncludeListingsAndSymlinks(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/dir/old.ts":  "old listing",
		"/link/old.ts": "old target",
	}, true)
	var summary FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind: RequestFileSystemKindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {},
		},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/target"},
			"/new":  {Target: "/host", Host: true},
		},
	}, baseFileSource(nil, base), nil, "/")
	assert.Assert(t, !summary.InvalidateAll)
	// Retargeting "/link" drops what was visible through it, but supplying a
	// listing for "/dir" does not touch "/dir/old.ts": a listing only decides what
	// enumerating that directory returns. Nothing is deleted for "/new", which
	// named a path that did not exist.
	assert.Equal(t, summary.Deleted.Len(), 3)
	assert.Assert(t, summary.Deleted.Has("file:///dir"))
	assert.Assert(t, !summary.Deleted.Has("file:///dir/old.ts"))
	assert.Assert(t, summary.Deleted.Has("file:///link"))
	assert.Assert(t, summary.Deleted.Has("file:///link/old.ts"))
	assert.Equal(t, summary.Created.Len(), 3)
	assert.Assert(t, summary.Created.Has("file:///dir"))
	assert.Assert(t, summary.Created.Has("file:///link"))
	assert.Assert(t, summary.Created.Has("file:///new"))
}

func TestFileChangesIncludeRecursiveSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  RequestFileSystemKindFull,
		Files: map[string]string{"/dir/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/dir/link": {Target: "/dir"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)

	var summary FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:  RequestFileSystemKindLayer,
		Files: map[string]string{"/dir/file.ts": "new"},
	}, baseFileSource(base.requestFileSystem, vfstest.FromMap(map[string]string{}, true)), base.requestFileSystem, "/")
	assert.Equal(t, summary.Changed.Len(), 2)
	assert.Assert(t, summary.Changed.Has("file:///dir/file.ts"))
	assert.Assert(t, summary.Changed.Has("file:///dir/link/file.ts"))
	assert.Equal(t, summary.Created.Len(), 0)
}

func TestFileChangesIncludeRootSymlinkAliases(t *testing.T) {
	t.Parallel()

	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  RequestFileSystemKindFull,
		Files: map[string]string{"/file.ts": "old"},
		Symlinks: map[string]RequestSymlink{
			"/link": {Target: "/"},
		},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	source := baseFileSource(base.requestFileSystem, vfstest.FromMap(map[string]string{}, true))
	file := source.GetFile("/link/file.ts")
	assert.Assert(t, file != nil)
	assert.Equal(t, file.Content(), "old")

	var summary FileChangeSummary
	addFileChanges(&summary, &RequestFileSystem{
		Kind:  RequestFileSystemKindLayer,
		Files: map[string]string{"/file.ts": "new"},
	}, source, base.requestFileSystem, "/")
	assert.Equal(t, summary.Changed.Len(), 2)
	assert.Assert(t, summary.Changed.Has("file:///file.ts"))
	assert.Assert(t, summary.Changed.Has("file:///link/file.ts"))
	assert.Equal(t, summary.Created.Len(), 0)
}
