package project

import (
	"testing"

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
		Kind:  RequestFileSystemKindLayer,
		Files: map[string]string{"/dir/retained.ts": "retained"},
		Directories: map[string]RequestDirectoryEntries{
			"/dir": {Files: []string{"retained.ts"}},
		},
	}, host, "/")
	assert.NilError(t, err)
	compacted, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind: RequestFileSystemKindLayer,
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
	verifyCompaction(t, compacted, host, []string{"/dir", "/dir/retained.ts"})
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
		Kind: RequestFileSystemKindFull,
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
		Kind: RequestFileSystemKindFull,
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
		Kind:        RequestFileSystemKindFull,
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
		Kind:        RequestFileSystemKindFull,
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
