package project

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/vfs"
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
