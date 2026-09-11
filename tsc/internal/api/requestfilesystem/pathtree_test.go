package requestfilesystem

import (
	"io/fs"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestRequestPathTreeChildOverridesInheritedMissing(t *testing.T) {
	t.Parallel()
	base := &requestPathNode{}
	base.ensure("/dir").fallback = requestFallbackMissing
	layer := &requestPathNode{}
	layer.ensure("/dir/pkg").entry = &requestSymlink{linkName: "/dir/pkg", target: "/target"}
	compacted := composeRequestPaths(base, layer, requestFallbackAllowed, true)
	_, fallback := compacted.lookup("/dir/pkg/file.ts")
	assert.Equal(t, fallback, requestFallbackAllowed)
	_, fallback = compacted.lookup("/dir/other.ts")
	assert.Equal(t, fallback, requestFallbackMissing)
	_, fallback = base.lookup("/dir/pkg/file.ts")
	assert.Equal(t, fallback, requestFallbackMissing)
}

func TestRequestPathTreeSameLayerMissingBlocksSymlink(t *testing.T) {
	t.Parallel()
	layer := &requestPathNode{}
	layer.ensure("/dir").fallback = requestFallbackMissing
	layer.ensure("/dir/pkg").entry = &requestSymlink{linkName: "/dir/pkg", target: "/target"}
	compacted := composeRequestPaths(&requestPathNode{}, layer, requestFallbackAllowed, true)
	_, fallback := compacted.lookup("/dir/pkg/file.ts")
	assert.Equal(t, fallback, requestFallbackMissing)
}

func TestRequestPathTreeDirectoryPreservesInheritedMissing(t *testing.T) {
	t.Parallel()
	base := &requestPathNode{}
	base.ensure("/dir").fallback = requestFallbackMissing
	layer := &requestPathNode{}
	layer.ensure("/dir/new").entry = &requestDirectory{directoryName: "/dir/new"}
	compacted := composeRequestPaths(base, layer, requestFallbackAllowed, true)
	node, fallback := compacted.lookup("/dir/new")
	directory, ok := node.entry.(*requestDirectory)
	assert.Assert(t, ok)
	assert.Equal(t, directory.directoryName, "/dir/new")
	assert.Equal(t, fallback, requestFallbackMissing)
	_, fallback = compacted.lookup("/dir/new/old.ts")
	assert.Equal(t, fallback, requestFallbackMissing)
}

func TestRequestPathTreeFileReplacesSubtree(t *testing.T) {
	t.Parallel()
	base := &requestPathNode{}
	base.ensure("/dir").entry = &requestDirectory{directoryName: "/dir", listing: &vfs.Entries{Files: []string{"old.ts"}}}
	base.ensure("/dir/old.ts").entry = &requestFile{fileName: "/dir/old.ts", content: "old"}
	layer := &requestPathNode{}
	layer.ensure("/dir").entry = &requestFile{fileName: "/dir", content: "new"}
	compacted := composeRequestPaths(base, layer, requestFallbackAllowed, true)
	node, _ := compacted.lookup("/dir")
	file, ok := node.entry.(*requestFile)
	assert.Assert(t, ok)
	assert.Equal(t, file.content, "new")
	assert.Equal(t, len(node.children), 0)
	assert.Assert(t, compacted.containsFileAncestor("/dir/old.ts"))
	previous, _ := base.lookup("/dir/old.ts")
	previousFile, ok := previous.entry.(*requestFile)
	assert.Assert(t, ok)
	assert.Equal(t, previousFile.content, "old")
}

func TestRequestPathTreeListingReplacementDoesNotRemoveFiles(t *testing.T) {
	t.Parallel()
	host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{}, true)}
	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindLayer,
		Files: map[string]string{"/dir/retained.ts": "retained"},
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {Files: []string{"retained.ts"}},
		},
	}, host, "/")
	assert.NilError(t, err)
	compacted, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind: KindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {Files: []string{}, Directories: []string{}},
		},
	}, base, "/")
	assert.NilError(t, err)
	content, ok := compacted.ReadFile("/dir/retained.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "retained")
	assert.DeepEqual(t, compacted.GetAccessibleEntries("/dir").Files, []string{})
	assert.DeepEqual(t, base.GetAccessibleEntries("/dir").Files, []string{"retained.ts"})
	verifyCompactionWithoutHostReads(t, compacted, host, []string{"/dir", "/dir/retained.ts"})
}

func TestRequestPathTreeCompositionPreservesListingSnapshots(t *testing.T) {
	t.Parallel()
	base := &requestPathNode{}
	base.ensure("/dir").entry = &requestDirectory{directoryName: "/dir", listing: &vfs.Entries{Files: []string{"OLD.ts"}}}
	base.ensure("/dir/old.ts").entry = &requestFile{fileName: "/dir/OLD.ts"}
	layer := &requestPathNode{}
	layer.ensure("/dir/old.ts").fallback = requestFallbackMissing
	layer.ensure("/dir/new.ts").entry = &requestFile{fileName: "/dir/new.ts"}
	compacted := composeRequestPaths(base, layer, requestFallbackAllowed, false)
	node, _ := compacted.lookup("/dir")
	directory, ok := node.entry.(*requestDirectory)
	assert.Assert(t, ok)
	assert.DeepEqual(t, directory.listing.Files, []string{"new.ts"})
	previous, _ := base.lookup("/dir")
	previousDirectory, ok := previous.entry.(*requestDirectory)
	assert.Assert(t, ok)
	assert.DeepEqual(t, previousDirectory.listing.Files, []string{"OLD.ts"})
	next := composeRequestPaths(compacted, &requestPathNode{}, requestFallbackAllowed, false)
	nextNode, _ := next.lookup("/dir")
	assert.Assert(t, nextNode == node)
}

func TestRequestPathTreeFileTakesPrecedenceOverSameLayerSymlink(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindFull,
		Files: map[string]string{
			"/item":           "file",
			"/target/file.ts": "target",
		},
		Symlinks: map[string]RequestSymlink{"/item": {Target: "/target"}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	content, ok := fileSystem.ReadFile("/item")
	assert.Assert(t, ok)
	assert.Equal(t, content, "file")
	assert.Assert(t, !fileSystem.DirectoryExists("/item"))
	assert.Equal(t, fileSystem.Realpath("/item"), "/item")
	node, _ := fileSystem.paths.lookup("/item")
	_, isFile := node.entry.(*requestFile)
	assert.Assert(t, isFile)
	assert.Assert(t, !fileSystem.paths.hasSymlinks)
	assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/").Files, []string{"item"})
}

func TestRequestPathTreeDirectoryTakesPrecedenceOverSameLayerSymlink(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindFull,
		Files: map[string]string{
			"/item/child.ts": "child",
			"/target.ts":     "target",
		},
		Directories: map[string]RequestDirectoryEntries{"/item": {Files: []string{"child.ts"}}},
		Symlinks:    map[string]RequestSymlink{"/item": {Target: "/target.ts"}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	assert.Assert(t, fileSystem.DirectoryExists("/item"))
	assert.Assert(t, !fileSystem.FileExists("/item"))
	assert.Equal(t, fileSystem.Realpath("/item"), "/item")
	content, ok := fileSystem.ReadFile("/item/child.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "child")
	node, _ := fileSystem.paths.lookup("/item")
	_, isDirectory := node.entry.(*requestDirectory)
	assert.Assert(t, isDirectory)
	assert.Assert(t, !fileSystem.paths.hasSymlinks)
	assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/item").Files, []string{"child.ts"})
}

func TestRequestPathTreeSymlinkTakesPrecedenceOverListingHint(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind:        KindFull,
		Files:       map[string]string{"/target/file.ts": "target"},
		Directories: map[string]RequestDirectoryEntries{"/links": {Directories: []string{"pkg"}}},
		Symlinks:    map[string]RequestSymlink{"/links/pkg": {Target: "/target"}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	node, _ := fileSystem.paths.lookup("/links/pkg")
	_, isSymlink := node.entry.(*requestSymlink)
	assert.Assert(t, isSymlink)
	assert.Assert(t, fileSystem.paths.hasSymlinks)
	content, ok := fileSystem.ReadFile("/links/pkg/file.ts")
	assert.Assert(t, ok)
	assert.Equal(t, content, "target")
	assert.Equal(t, fileSystem.Realpath("/links/pkg"), "/target")
	assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/links"), vfs.Entries{
		Directories: []string{"pkg"},
		Symlinks:    map[string]struct{}{"pkg": {}},
	})
}

func TestRequestPathTreeFileTakesPrecedenceOverSameLayerDirectory(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind:        KindFull,
		Files:       map[string]string{"/item": "file"},
		Directories: map[string]RequestDirectoryEntries{"/item": {Files: []string{"listed.ts"}}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	node, _ := fileSystem.paths.lookup("/item")
	_, isFile := node.entry.(*requestFile)
	assert.Assert(t, isFile)
	content, ok := fileSystem.ReadFile("/item")
	assert.Assert(t, ok)
	assert.Equal(t, content, "file")
	assert.Assert(t, !fileSystem.DirectoryExists("/item"))
	assert.Equal(t, len(fileSystem.GetAccessibleEntries("/item").Files), 0)
}

func TestRequestPathTreeFileProvidesStatAndDirEntry(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind:  KindFull,
		Files: map[string]string{"/dir/file.ts": "file content"},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	node, _ := fileSystem.paths.lookup("/dir/file.ts")
	info := fileSystem.Stat("/dir/file.ts")
	assert.Assert(t, info != nil)
	assert.Equal(t, info.Name(), "file.ts")
	assert.Equal(t, info.Size(), int64(len("file content")))
	assert.Equal(t, info.Mode(), fs.FileMode(0o444))
	assert.Assert(t, !info.IsDir())
	assert.Equal(t, info.ModTime(), time.Time{})
	assert.Assert(t, info.Sys() == nil)
	assert.Assert(t, any(info) == node.entry)
	visited := false
	assert.NilError(t, fileSystem.WalkDir("/dir/file.ts", func(path string, entry vfs.DirEntry, walkErr error) error {
		assert.NilError(t, walkErr)
		assert.Equal(t, path, "/dir/file.ts")
		assert.Assert(t, any(entry) == node.entry)
		assert.Equal(t, entry.Type(), fs.FileMode(0))
		entryInfo, infoErr := entry.Info()
		assert.NilError(t, infoErr)
		assert.Assert(t, entryInfo == info)
		visited = true
		return nil
	}))
	assert.Assert(t, visited)
}

func TestRequestPathTreeDirectoryProvidesStatAndDirEntry(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind:        KindFull,
		Directories: map[string]RequestDirectoryEntries{"/dir": {}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	node, _ := fileSystem.paths.lookup("/dir")
	info := fileSystem.Stat("/dir")
	assert.Assert(t, info != nil)
	assert.Equal(t, info.Name(), "dir")
	assert.Equal(t, info.Size(), int64(0))
	assert.Equal(t, info.Mode(), fs.ModeDir|0o555)
	assert.Assert(t, info.IsDir())
	assert.Equal(t, info.ModTime(), time.Time{})
	assert.Assert(t, info.Sys() == nil)
	assert.Assert(t, any(info) == node.entry)
	visited := false
	assert.NilError(t, fileSystem.WalkDir("/dir", func(path string, entry vfs.DirEntry, walkErr error) error {
		assert.NilError(t, walkErr)
		assert.Equal(t, path, "/dir")
		assert.Assert(t, any(entry) == node.entry)
		assert.Equal(t, entry.Type(), fs.ModeDir)
		entryInfo, infoErr := entry.Info()
		assert.NilError(t, infoErr)
		assert.Assert(t, entryInfo == info)
		visited = true
		return nil
	}))
	assert.Assert(t, visited)
}

func TestRequestPathTreeSymlinkReportsTargetMetadata(t *testing.T) {
	t.Parallel()
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind:     KindFull,
		Files:    map[string]string{"/target/file.ts": "target content"},
		Symlinks: map[string]RequestSymlink{"/link.ts": {Target: "/target/file.ts"}},
	}, vfstest.FromMap(map[string]string{}, true), "/")
	assert.NilError(t, err)
	info := fileSystem.Stat("/target/file.ts")
	assert.Assert(t, fileSystem.Stat("/link.ts") == info)
	visited := false
	assert.NilError(t, fileSystem.WalkDir("/link.ts", func(path string, entry vfs.DirEntry, walkErr error) error {
		assert.NilError(t, walkErr)
		assert.Equal(t, path, "/link.ts")
		assert.Equal(t, entry.Name(), "file.ts")
		assert.Equal(t, entry.Type(), fs.FileMode(0))
		entryInfo, infoErr := entry.Info()
		assert.NilError(t, infoErr)
		assert.Assert(t, entryInfo == info)
		visited = true
		return nil
	}))
	assert.Assert(t, visited)
}

type requestTestHostMetadata struct {
	vfs.FS
	info vfs.FileInfo
}

func (host requestTestHostMetadata) Stat(string) vfs.FileInfo { return host.info }

func TestRequestPathTreeWalkPreservesHostMetadata(t *testing.T) {
	t.Parallel()
	hostFS := vfstest.FromMap(map[string]string{"/host.ts": "host content"}, true)
	modified := time.Date(2026, time.September, 9, 12, 0, 0, 0, time.UTC)
	assert.NilError(t, hostFS.Chtimes("/host.ts", modified, modified))
	info := hostFS.Stat("/host.ts")
	host := requestTestHostMetadata{FS: hostFS, info: info}
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindLayer,
	}, host, "/")
	assert.NilError(t, err)
	assert.Assert(t, fileSystem.Stat("/host.ts") == info)
	visited := false
	assert.NilError(t, fileSystem.WalkDir("/host.ts", func(path string, entry vfs.DirEntry, walkErr error) error {
		assert.NilError(t, walkErr)
		assert.Equal(t, path, "/host.ts")
		assert.Equal(t, entry.Name(), info.Name())
		assert.Equal(t, entry.Type(), info.Mode().Type())
		entryInfo, infoErr := entry.Info()
		assert.NilError(t, infoErr)
		assert.Assert(t, entryInfo == info)
		assert.Equal(t, entryInfo.ModTime(), modified)
		assert.Equal(t, entryInfo.Size(), int64(len("host content")))
		visited = true
		return nil
	}))
	assert.Assert(t, visited)
}

func TestRequestPathTreeStatSupportsExistenceOnlyHost(t *testing.T) {
	t.Parallel()
	host := requestTestHostMetadata{FS: vfstest.FromMap(map[string]string{"/dir/file.ts": "host content"}, true)}
	fileSystem, err := newRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, host, "/")
	assert.NilError(t, err)
	fileInfo := fileSystem.Stat("/dir/file.ts")
	assert.Assert(t, fileInfo != nil)
	assert.Equal(t, fileInfo.Name(), "file.ts")
	assert.Equal(t, fileInfo.Size(), int64(0))
	assert.Equal(t, fileInfo.Mode(), fs.FileMode(0o444))
	assert.Assert(t, !fileInfo.IsDir())
	directoryInfo := fileSystem.Stat("/dir")
	assert.Assert(t, directoryInfo != nil)
	assert.Equal(t, directoryInfo.Name(), "dir")
	assert.Equal(t, directoryInfo.Mode(), fs.ModeDir|0o555)
	assert.Assert(t, directoryInfo.IsDir())
	assert.Assert(t, fileSystem.Stat("/missing") == nil)
}
