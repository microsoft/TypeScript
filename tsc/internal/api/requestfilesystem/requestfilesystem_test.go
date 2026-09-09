package requestfilesystem

import (
	"slices"
	"strings"
	"testing"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func newRequestFileSystem(params *RequestFileSystem, base vfs.FS, currentDirectory string) (*requestFileSystem, error) {
	return newLayeredRequestFileSystem(params, base, currentDirectory)
}

func newLayeredRequestFileSystem(params *RequestFileSystem, base vfs.FS, currentDirectory string) (*requestFileSystem, error) {
	var fileChanges project.FileChangeSummary
	fileSystem, err := NewForUpdate(params, base, currentDirectory, &fileChanges)
	if err != nil {
		return nil, err
	}
	return fileSystem.(*requestFileSystem), nil
}

func verifyCompactionWithoutHostReads(t *testing.T, layer *requestFileSystem, host *trackingvfs.FS, paths []string) {
	t.Helper()
	compacted, err := newRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, layer, layer.currentDirectory)
	assert.NilError(t, err)
	verify := func(name string, run func(vfs.FS, string) any) {
		t.Helper()
		for _, path := range paths {
			for seen := range host.SeenFiles.Keys() {
				host.SeenFiles.Delete(seen)
			}
			expected := run(layer, path)
			if !host.SeenFiles.IsEmpty() {
				continue
			}
			actual := run(compacted, path)
			assert.Assert(t, host.SeenFiles.IsEmpty(), name, path)
			t.Logf("Comparing %s(%q) after compaction", name, path)
			assert.DeepEqual(t, actual, expected)
		}
	}
	verify("FileExists", func(fileSystem vfs.FS, path string) any { return fileSystem.FileExists(path) })
	verify("DirectoryExists", func(fileSystem vfs.FS, path string) any { return fileSystem.DirectoryExists(path) })
	verify("ReadFile", func(fileSystem vfs.FS, path string) any {
		content, ok := fileSystem.ReadFile(path)
		return struct {
			Content string
			OK      bool
		}{content, ok}
	})
	verify("Realpath", func(fileSystem vfs.FS, path string) any { return fileSystem.Realpath(path) })
	verify("GetAccessibleEntries", func(fileSystem vfs.FS, path string) any { return fileSystem.GetAccessibleEntries(path) })
	verify("Stat", func(fileSystem vfs.FS, path string) any {
		info := fileSystem.Stat(path)
		if info == nil {
			return nil
		}
		return struct {
			Name      string
			Size      int64
			Mode      uint32
			ModTime   time.Time
			Directory bool
			Sys       any
		}{info.Name(), info.Size(), uint32(info.Mode()), info.ModTime(), info.IsDir(), info.Sys()}
	})
	verify("WalkDir", func(fileSystem vfs.FS, path string) any {
		var result struct {
			Paths       []string
			Directories []bool
			Errors      []string
			Error       string
		}
		walkResult := fileSystem.WalkDir(path, func(child string, entry vfs.DirEntry, walkErr error) error {
			result.Paths = append(result.Paths, child)
			result.Directories = append(result.Directories, entry != nil && entry.IsDir())
			message := ""
			if walkErr != nil {
				message = walkErr.Error()
			}
			result.Errors = append(result.Errors, message)
			return nil
		})
		if walkResult != nil {
			result.Error = walkResult.Error()
		}
		return result
	})
}

func TestInitializeForUpdate(t *testing.T) {
	t.Parallel()

	t.Run("filesystem layers eagerly compact a request filesystem base", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		var fileChanges project.FileChangeSummary
		base, err := NewForUpdate(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{"/base.ts": "base"},
		}, host, "/", &fileChanges)
		assert.NilError(t, err)

		layered, err := NewForUpdate(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{"/layered.ts": "layered"},
		}, base, "/", &fileChanges)
		assert.NilError(t, err)
		requestFileSystem, ok := layered.(*requestFileSystem)
		assert.Assert(t, ok)
		assert.Assert(t, requestFileSystem.baseFileSystem() == host)
		assert.Equal(t, requestFileSystem.kind, KindFull)
		assert.Assert(t, layered.FileExists("/base.ts"))
		assert.Assert(t, layered.FileExists("/layered.ts"))
	})

	t.Run("filesystem layers over a host-backed snapshot", func(t *testing.T) {
		t.Parallel()
		host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/dir/host.ts": "host",
		}, true)}
		var fileChanges project.FileChangeSummary
		fileSystem, err := NewForUpdate(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{"/dir/cached.ts": "cached"},
			Directories: map[string]RequestDirectoryEntries{
				"/dir": {Files: []string{"cached.ts"}, Directories: []string{}},
			},
		}, host, "/", &fileChanges)
		assert.NilError(t, err)
		// Change generation may inspect the old directory; reading the supplied
		// complete listing itself must not fall back to the host.
		host.SeenFiles.Delete("/dir")
		assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/dir").Files, []string{"cached.ts"})
		assert.Assert(t, !host.SeenFiles.Has("/dir"))
	})

	t.Run("memory starts a new chain", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{"/base.ts": "base"},
		}, host, "/")
		assert.NilError(t, err)

		var fileChanges project.FileChangeSummary
		fileSystem, err := NewForUpdate(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{"/replacement.ts": "replacement"},
		}, base, "/", &fileChanges)
		assert.NilError(t, err)
		requestFileSystem := getRequestFileSystem(fileSystem)
		assert.Assert(t, requestFileSystem.baseFileSystem() == host)
		assert.Assert(t, getRequestFileSystem(requestFileSystem.baseFileSystem()) == nil)
	})
}

func TestRequestFileSystemCompleteDirectoryListingsFullExplicitReplacement(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindFull, true, RequestDirectoryEntries{Files: []string{"replacement.ts"}, Directories: []string{"replacement-dir"}})
}

func TestRequestFileSystemCompleteDirectoryListingsFullExplicitEmpty(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindFull, true, RequestDirectoryEntries{Files: []string{}, Directories: []string{}})
}

func TestRequestFileSystemCompleteDirectoryListingsFullDerivedReplacement(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindFull, false, RequestDirectoryEntries{Files: []string{"replacement.ts"}, Directories: []string{"replacement-dir"}})
}

func TestRequestFileSystemCompleteDirectoryListingsFullDerivedEmpty(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindFull, false, RequestDirectoryEntries{Files: []string{}, Directories: []string{}})
}

func TestRequestFileSystemCompleteDirectoryListingsLayerExplicitReplacement(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindLayer, true, RequestDirectoryEntries{Files: []string{"replacement.ts"}, Directories: []string{"replacement-dir"}})
}

func TestRequestFileSystemCompleteDirectoryListingsLayerExplicitEmpty(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindLayer, true, RequestDirectoryEntries{Files: []string{}, Directories: []string{}})
}

func TestRequestFileSystemCompleteDirectoryListingsLayerDerivedReplacement(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindLayer, false, RequestDirectoryEntries{Files: []string{"replacement.ts"}, Directories: []string{"replacement-dir"}})
}

func TestRequestFileSystemCompleteDirectoryListingsLayerDerivedEmpty(t *testing.T) {
	t.Parallel()
	testCompleteDirectoryListing(t, KindLayer, false, RequestDirectoryEntries{Files: []string{}, Directories: []string{}})
}

func testCompleteDirectoryListing(t *testing.T, kind Kind, explicit bool, replacement RequestDirectoryEntries) {
	t.Helper()
	host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
		"/dir/host.ts":           "host",
		"/dir/host-dir/index.ts": "host child",
	}, true)}
	params := &RequestFileSystem{
		Kind: kind,
		Files: map[string]string{
			"/dir/base.ts":           "base",
			"/dir/base-dir/index.ts": "base child",
		},
	}
	if explicit {
		params.Directories = map[string]RequestDirectoryEntries{
			"/dir": {Files: []string{"base.ts"}, Directories: []string{"base-dir"}},
		}
	}
	base, err := newRequestFileSystem(params, host, "/")
	assert.NilError(t, err)
	layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind: KindLayer,
		Directories: map[string]RequestDirectoryEntries{
			"/dir": replacement,
		},
	}, base, "/")
	assert.NilError(t, err)

	// Omitting a listing in a later update still merges its derived
	// entries with the complete listing, without reopening host fallback.
	next, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind: KindLayer,
		Files: map[string]string{
			"/dir/added.ts":           "added",
			"/dir/added-dir/index.ts": "added child",
		},
	}, layered, "/")
	assert.NilError(t, err)
	for path := range host.SeenFiles.Keys() {
		host.SeenFiles.Delete(path)
	}

	verify := func() {
		t.Helper()
		entries := layered.GetAccessibleEntries("/dir")
		assert.Assert(t, host.SeenFiles.IsEmpty())
		assert.DeepEqual(t, entries.Files, replacement.Files)
		assert.DeepEqual(t, entries.Directories, replacement.Directories)
		entries = next.GetAccessibleEntries("/dir")
		assert.Assert(t, host.SeenFiles.IsEmpty())
		assert.DeepEqual(t, entries.Files, append([]string{"added.ts"}, replacement.Files...))
		assert.DeepEqual(t, entries.Directories, append([]string{"added-dir"}, replacement.Directories...))
	}
	verify()
	assert.Assert(t, layered.baseFileSystem() == host)
	assert.Assert(t, next.baseFileSystem() == host)
	verify()
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestSealedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestSealedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestSealedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestRemovedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, remove: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestRemovedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, remove: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullRequestRemovedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, caseSensitive: true, remove: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostSealedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostSealedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostSealedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostRemovedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, remove: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostRemovedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, remove: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryFullHostRemovedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindFull, hostTarget: true, caseSensitive: true, remove: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackSealedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackSealedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackSealedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackRemovedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, remove: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackRemovedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, remove: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerFallbackRemovedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, caseSensitive: true, remove: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveSealedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveSealedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveSealedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, linkPath: "/dir/removed/child"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveRemovedSame(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, remove: true, linkPath: "/dir/removed"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveRemovedParent(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, remove: true, linkPath: "/dir"})
}

func TestRequestFileSystemSymlinkReplacesDirectoryLayerHostInsensitiveRemovedChild(t *testing.T) {
	t.Parallel()
	testSymlinkReplacesDirectory(t, symlinkReplacementOptions{kind: KindLayer, hostTarget: true, remove: true, linkPath: "/dir/removed/child"})
}

type symlinkReplacementOptions struct {
	kind          Kind
	hostTarget    bool
	caseSensitive bool
	remove        bool
	linkPath      string
}

func testSymlinkReplacesDirectory(t *testing.T, options symlinkReplacementOptions) {
	t.Helper()
	linkPath := options.linkPath
	remove := options.remove
	host := vfstest.FromMap(map[string]string{
		"/dir/removed/old.ts":       "old host",
		"/dir/removed/child/old.ts": "old host child",
		"/dir/removed/sibling.ts":   "old sibling",
		"/dir/removed-other/old.ts": "unrelated",
		"/target/new.ts":            "host target",
		"/target/removed/new.ts":    "host target",
	}, options.caseSensitive)
	params := &RequestFileSystem{
		Kind: options.kind,
		Files: map[string]string{
			"/dir/removed/cached.ts":       "cached",
			"/dir/removed/child/cached.ts": "cached child",
			"/dir/removed-other/old.ts":    "unrelated",
		},
		Directories: map[string]RequestDirectoryEntries{
			"/dir":               {Directories: []string{"removed", "removed-other"}},
			"/dir/removed":       {Files: []string{"cached.ts"}, Directories: []string{"child"}},
			"/dir/removed/child": {Files: []string{"cached.ts"}},
		},
	}
	expectedContent := "host target"
	if options.kind == KindFull {
		params.Files["/target/new.ts"] = "request target"
		params.Files["/target/removed/new.ts"] = "request target"
		if !options.hostTarget {
			expectedContent = "request target"
		}
	}
	base, err := newRequestFileSystem(params, host, "/")
	assert.NilError(t, err)
	previous := base
	if remove {
		removedPath := "/dir/removed"
		if !options.caseSensitive {
			removedPath = strings.ToUpper(removedPath)
		}
		previous, err = newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			RemovedPaths: []string{removedPath},
		}, base, "/")
		assert.NilError(t, err)
	}
	verifyPrevious := func() {
		t.Helper()
		assert.Equal(t, previous.DirectoryExists("/dir/removed"), !remove)
		assert.Equal(t, previous.FileExists("/dir/removed/cached.ts"), !remove)
		if remove {
			assert.Assert(t, !previous.FileExists("/dir/removed/old.ts"))
			assert.Equal(t, len(previous.GetAccessibleEntries("/dir/removed").Files), 0)
			assert.Equal(t, len(previous.GetAccessibleEntries("/dir/removed").Directories), 0)
		} else {
			assert.DeepEqual(t, previous.GetAccessibleEntries("/dir/removed").Files, []string{"cached.ts"})
			assert.DeepEqual(t, previous.GetAccessibleEntries("/dir/removed").Directories, []string{"child"})
		}
	}
	verifyPrevious()
	linked, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind: KindLayer,
		Symlinks: map[string]RequestSymlink{
			linkPath: {Target: "/target", Host: options.hostTarget},
		},
	}, previous, "/")
	assert.NilError(t, err)
	verifyLinked := func(fileSystem *requestFileSystem) {
		t.Helper()
		assert.Assert(t, fileSystem.baseFileSystem() == host)
		assert.Equal(t, fileSystem.kind, options.kind)
		assert.Assert(t, fileSystem.DirectoryExists(linkPath))
		assert.Assert(t, !fileSystem.FileExists(linkPath))
		for _, suffix := range []string{"/new.ts", "/removed/new.ts"} {
			fileName := linkPath + suffix
			assert.Assert(t, fileSystem.FileExists(fileName), fileName)
			content, ok := fileSystem.ReadFile(fileName)
			assert.Assert(t, ok)
			assert.Equal(t, content, expectedContent)
			info := fileSystem.Stat(fileName)
			assert.Assert(t, info != nil)
			assert.Assert(t, !info.IsDir())
			assert.Equal(t, info.Size(), int64(len(expectedContent)))
			assert.Equal(t, fileSystem.Realpath(fileName), "/target"+suffix)
		}
		info := fileSystem.Stat(linkPath)
		assert.Assert(t, info != nil)
		assert.Assert(t, info.IsDir())
		assert.Equal(t, fileSystem.Realpath(linkPath), "/target")
		assert.DeepEqual(t, fileSystem.GetAccessibleEntries(linkPath).Files, []string{"new.ts"})
		assert.DeepEqual(t, fileSystem.GetAccessibleEntries(linkPath).Directories, []string{"removed"})
		parentEntries := fileSystem.GetAccessibleEntries(tspath.GetDirectoryPath(linkPath))
		linkName := tspath.GetBaseFileName(linkPath)
		assert.Assert(t, slices.Contains(parentEntries.Directories, linkName))
		_, isSymlink := parentEntries.Symlinks[linkName]
		assert.Assert(t, isSymlink)
		assert.Assert(t, !fileSystem.FileExists(linkPath+"/old.ts"))
		assert.Assert(t, !fileSystem.FileExists(linkPath+"/cached.ts"))
		if linkPath != "/dir" {
			assert.Assert(t, fileSystem.FileExists("/dir/removed-other/old.ts"))
		}
		if remove {
			assert.Assert(t, !fileSystem.FileExists("/dir/removed/sibling.ts"))
		}
		var walked []string
		assert.NilError(t, fileSystem.WalkDir(linkPath, func(path string, entry vfs.DirEntry, err error) error {
			assert.NilError(t, err)
			walked = append(walked, path)
			return nil
		}))
		assert.DeepEqual(t, walked, []string{linkPath, linkPath + "/new.ts", linkPath + "/removed", linkPath + "/removed/new.ts"})
	}
	verifyLinked(linked)
	next, err := newLayeredRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, linked, "/")
	assert.NilError(t, err)
	verifyLinked(next)
	deleted, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{linkPath + "/new.ts"},
	}, next, "/")
	assert.NilError(t, err)
	assert.Assert(t, !deleted.FileExists(linkPath+"/new.ts"))
	assert.Assert(t, deleted.FileExists(linkPath+"/removed/new.ts"))
	assert.Equal(t, len(deleted.GetAccessibleEntries(linkPath).Files), 0)
	verifyLinked(linked)
	assert.Assert(t, base.FileExists("/dir/removed/cached.ts"))
	verifyPrevious()
}

func TestRequestFileSystemFileOverridesParentTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", false, "/dir")
}

func TestRequestFileSystemFileOverridesSameTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", false, "/dir/removed")
}

func TestRequestFileSystemFileOverridesChildTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", false, "/dir/removed/child")
}

func TestRequestFileSystemFileOverridesParentTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", true, "/dir")
}

func TestRequestFileSystemFileOverridesSameTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", true, "/dir/removed")
}

func TestRequestFileSystemFileOverridesChildTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file", true, "/dir/removed/child")
}

func TestRequestFileSystemDirectoryOverridesParentTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", false, "/dir")
}

func TestRequestFileSystemDirectoryOverridesSameTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", false, "/dir/removed")
}

func TestRequestFileSystemDirectoryOverridesChildTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", false, "/dir/removed/child")
}

func TestRequestFileSystemDirectoryOverridesParentTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", true, "/dir")
}

func TestRequestFileSystemDirectoryOverridesSameTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", true, "/dir/removed")
}

func TestRequestFileSystemDirectoryOverridesChildTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "directory", true, "/dir/removed/child")
}

func TestRequestFileSystemSymlinkOverridesParentTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", false, "/dir")
}

func TestRequestFileSystemSymlinkOverridesSameTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", false, "/dir/removed")
}

func TestRequestFileSystemSymlinkOverridesChildTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", false, "/dir/removed/child")
}

func TestRequestFileSystemSymlinkOverridesParentTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", true, "/dir")
}

func TestRequestFileSystemSymlinkOverridesSameTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", true, "/dir/removed")
}

func TestRequestFileSystemSymlinkOverridesChildTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "symlink", true, "/dir/removed/child")
}

func TestRequestFileSystemFileSymlinkOverridesParentTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", false, "/dir")
}

func TestRequestFileSystemFileSymlinkOverridesSameTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", false, "/dir/removed")
}

func TestRequestFileSystemFileSymlinkOverridesChildTombstone(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", false, "/dir/removed/child")
}

func TestRequestFileSystemFileSymlinkOverridesParentTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", true, "/dir")
}

func TestRequestFileSystemFileSymlinkOverridesSameTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", true, "/dir/removed")
}

func TestRequestFileSystemFileSymlinkOverridesChildTombstoneInheritedLink(t *testing.T) {
	t.Parallel()
	testObjectOverridesTombstone(t, "file-symlink", true, "/dir/removed/child")
}

func testObjectOverridesTombstone(t *testing.T, object string, inheritedLink bool, path string) {
	t.Helper()
	host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
		"/dir/removed/old.ts":   "old",
		"/dir/removed/child.ts": "old child",
		"/old/removed/old.ts":   "old target",
		"/target/file.ts":       "target",
	}, true)}
	baseParams := &RequestFileSystem{Kind: KindLayer}
	if inheritedLink {
		baseParams.Symlinks = map[string]RequestSymlink{"/dir": {Target: "/old"}}
	}
	base, err := newRequestFileSystem(baseParams, host, "/")
	assert.NilError(t, err)
	removed, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{"/dir/removed"},
	}, base, "/")
	assert.NilError(t, err)
	params := &RequestFileSystem{Kind: KindLayer}
	switch object {
	case "file":
		params.Files = map[string]string{path: "new"}
	case "directory":
		params.Directories = map[string]RequestDirectoryEntries{path: {}}
	case "symlink":
		params.Symlinks = map[string]RequestSymlink{path: {Target: "/target"}}
	case "file-symlink":
		params.Symlinks = map[string]RequestSymlink{path: {Target: "/target/file.ts"}}
	}
	replaced, err := newLayeredRequestFileSystem(params, removed, "/")
	assert.NilError(t, err)
	isFile := object == "file" || object == "file-symlink"
	assert.Equal(t, replaced.FileExists(path), isFile)
	assert.Equal(t, replaced.DirectoryExists(path), !isFile)
	assert.Assert(t, replaced.Stat(path) != nil)
	entries := replaced.GetAccessibleEntries(tspath.GetDirectoryPath(path))
	entryName := tspath.GetBaseFileName(path)
	assert.Equal(t, slices.Contains(entries.Files, entryName), isFile)
	assert.Equal(t, slices.Contains(entries.Directories, entryName), !isFile)
	_, isSymlink := entries.Symlinks[entryName]
	assert.Equal(t, isSymlink, object == "symlink" || object == "file-symlink")
	assert.Assert(t, !replaced.FileExists("/dir/removed/old.ts"))
	_, ok := replaced.ReadFile("/dir/removed/old.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, replaced.Stat("/dir/removed/old.ts") == nil)
	if isFile {
		assert.Equal(t, len(replaced.GetAccessibleEntries(path+"/removed").Files), 0)
		assert.Equal(t, len(replaced.GetAccessibleEntries(path).Directories), 0)
	}
	assert.Assert(t, !removed.DirectoryExists("/dir/removed"))
	verifyCompactionWithoutHostReads(t, replaced, host, []string{
		path, path + "/file.ts", "/dir", "/dir/removed", "/dir/removed/old.ts", "/target/file.ts",
	})
}

func TestRequestFileSystemReplacementPreservesCurrentFullAliasDirectoryRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindFull, "/dir/blocked")
}

func TestRequestFileSystemReplacementPreservesCurrentFullAliasFileRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindFull, "/dir/blocked/gone.ts")
}

func TestRequestFileSystemReplacementPreservesCurrentFullTargetDirectoryRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindFull, "/target/blocked")
}

func TestRequestFileSystemReplacementPreservesCurrentFullTargetFileRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindFull, "/target/blocked/gone.ts")
}

func TestRequestFileSystemReplacementPreservesCurrentLayerAliasDirectoryRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindLayer, "/dir/blocked")
}

func TestRequestFileSystemReplacementPreservesCurrentLayerAliasFileRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindLayer, "/dir/blocked/gone.ts")
}

func TestRequestFileSystemReplacementPreservesCurrentLayerTargetDirectoryRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindLayer, "/target/blocked")
}

func TestRequestFileSystemReplacementPreservesCurrentLayerTargetFileRemoval(t *testing.T) {
	t.Parallel()
	testReplacementPreservesCurrentRemoval(t, KindLayer, "/target/blocked/gone.ts")
}

func testReplacementPreservesCurrentRemoval(t *testing.T, kind Kind, removedPath string) {
	t.Helper()
	files := map[string]string{
		"/dir/old.ts":             "old host",
		"/target/keep.ts":         "keep",
		"/target/blocked/gone.ts": "gone",
	}
	host := vfstest.FromMap(files, true)
	params := &RequestFileSystem{Kind: kind}
	if kind == KindFull {
		params.Files = files
	}
	base, err := newRequestFileSystem(params, host, "/")
	assert.NilError(t, err)
	removed, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{"/dir", "/dir/blocked"},
	}, base, "/")
	assert.NilError(t, err)
	linked, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		Symlinks:     map[string]RequestSymlink{"/dir": {Target: "/target", Host: kind == KindLayer}},
		RemovedPaths: []string{removedPath},
	}, removed, "/")
	assert.NilError(t, err)
	assert.Assert(t, linked.FileExists("/dir/keep.ts"))
	assert.Assert(t, !linked.FileExists("/dir/old.ts"))
	assert.Assert(t, !linked.FileExists("/dir/blocked/gone.ts"))
	_, ok := linked.ReadFile("/dir/blocked/gone.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, linked.Stat("/dir/blocked/gone.ts") == nil)
	assert.Equal(t, len(linked.GetAccessibleEntries("/dir/blocked").Files), 0)
	deleted, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{"/dir"},
	}, linked, "/")
	assert.NilError(t, err)
	assert.Assert(t, !deleted.DirectoryExists("/dir"))
	assert.Assert(t, !deleted.FileExists("/dir/keep.ts"))
	assert.Equal(t, len(deleted.GetAccessibleEntries("/dir").Files), 0)
	assert.Assert(t, deleted.FileExists("/target/keep.ts"))
	assert.Assert(t, linked.FileExists("/dir/keep.ts"))
}

func TestRequestFileSystemSameLayerRemovalRequestAncestorStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links", "standalone")
}

func TestRequestFileSystemSameLayerRemovalRequestAncestorLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links", "layered")
}

func TestRequestFileSystemSameLayerRemovalRequestAncestorCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links", "compacted")
}

func TestRequestFileSystemSameLayerRemovalRequestAncestorRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalRequestAncestorCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links", "compacted-input")
}

func TestRequestFileSystemSameLayerRemovalRequestLinkStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg", "standalone")
}

func TestRequestFileSystemSameLayerRemovalRequestLinkLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg", "layered")
}

func TestRequestFileSystemSameLayerRemovalRequestLinkCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg", "compacted")
}

func TestRequestFileSystemSameLayerRemovalRequestLinkRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalRequestLinkCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg", "compacted-input")
}

func TestRequestFileSystemSameLayerRemovalRequestDescendantStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg/file.ts", "standalone")
}

func TestRequestFileSystemSameLayerRemovalRequestDescendantLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg/file.ts", "layered")
}

func TestRequestFileSystemSameLayerRemovalRequestDescendantCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg/file.ts", "compacted")
}

func TestRequestFileSystemSameLayerRemovalRequestDescendantRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg/file.ts", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalRequestDescendantCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, false, "/links/pkg/file.ts", "compacted-input")
}

func TestRequestFileSystemSameLayerRemovalHostAncestorStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links", "standalone")
}

func TestRequestFileSystemSameLayerRemovalHostAncestorLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links", "layered")
}

func TestRequestFileSystemSameLayerRemovalHostAncestorCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links", "compacted")
}

func TestRequestFileSystemSameLayerRemovalHostAncestorRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalHostAncestorCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links", "compacted-input")
}

func TestRequestFileSystemSameLayerRemovalHostLinkStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg", "standalone")
}

func TestRequestFileSystemSameLayerRemovalHostLinkLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg", "layered")
}

func TestRequestFileSystemSameLayerRemovalHostLinkCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg", "compacted")
}

func TestRequestFileSystemSameLayerRemovalHostLinkRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalHostLinkCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg", "compacted-input")
}

func TestRequestFileSystemSameLayerRemovalHostDescendantStandalone(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg/file.ts", "standalone")
}

func TestRequestFileSystemSameLayerRemovalHostDescendantLayered(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg/file.ts", "layered")
}

func TestRequestFileSystemSameLayerRemovalHostDescendantCompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg/file.ts", "compacted")
}

func TestRequestFileSystemSameLayerRemovalHostDescendantRecompacted(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg/file.ts", "recompacted")
}

func TestRequestFileSystemSameLayerRemovalHostDescendantCompactedInput(t *testing.T) {
	t.Parallel()
	testSameLayerRemoval(t, true, "/links/pkg/file.ts", "compacted-input")
}

func testSameLayerRemoval(t *testing.T, hostTarget bool, removedPath string, form string) {
	t.Helper()
	host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{"/target/file.ts": "host"}, true)}
	base, err := newRequestFileSystem(&RequestFileSystem{
		Kind: KindFull,
	}, host, "/")
	assert.NilError(t, err)
	params := &RequestFileSystem{
		Kind:         KindLayer,
		Files:        map[string]string{"/target/file.ts": "request"},
		Symlinks:     map[string]RequestSymlink{"/links/pkg": {Target: "/target", Host: hostTarget}},
		RemovedPaths: []string{removedPath},
	}
	var fileSystem *requestFileSystem
	switch form {
	case "standalone":
		fileSystem, err = newRequestFileSystem(params, host, "/")
	case "layered":
		fileSystem, err = newRequestFileSystem(params, base, "/")
	default:
		fileSystem, err = newLayeredRequestFileSystem(params, base, "/")
		assert.NilError(t, err)
		switch form {
		case "recompacted":
			fileSystem, err = newLayeredRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, fileSystem, "/")
		case "compacted-input":
			fileSystem, err = newRequestFileSystem(params, fileSystem, "/")
		}
	}
	assert.NilError(t, err)
	assert.Assert(t, !fileSystem.FileExists("/links/pkg/file.ts"))
	_, ok := fileSystem.ReadFile("/links/pkg/file.ts")
	assert.Assert(t, !ok)
	assert.Assert(t, fileSystem.Stat("/links/pkg/file.ts") == nil)
	assert.Equal(t, fileSystem.Realpath("/links/pkg/file.ts"), "/links/pkg/file.ts")
	assert.Equal(t, len(fileSystem.GetAccessibleEntries("/links/pkg").Files), 0)
	linkExists := removedPath == "/links/pkg/file.ts"
	assert.Equal(t, fileSystem.DirectoryExists("/links/pkg"), linkExists)
	entries := fileSystem.GetAccessibleEntries("/links")
	assert.Equal(t, slices.Contains(entries.Directories, "pkg"), linkExists)
	_, isSymlink := entries.Symlinks["pkg"]
	assert.Equal(t, isSymlink, linkExists)
	assert.Assert(t, fileSystem.FileExists("/target/file.ts"))
	verifyCompactionWithoutHostReads(t, fileSystem, host, []string{
		"/", "/links", "/links/pkg", "/links/pkg/file.ts", "/target", "/target/file.ts", "/missing",
	})
}

func TestRequestFileSystemRemovalExceptionsRequest(t *testing.T) {
	t.Parallel()
	testRemovalExceptions(t, false, false)
}

func TestRequestFileSystemRemovalExceptionsRequestRemovedAgain(t *testing.T) {
	t.Parallel()
	testRemovalExceptions(t, false, true)
}

func TestRequestFileSystemRemovalExceptionsHost(t *testing.T) {
	t.Parallel()
	testRemovalExceptions(t, true, false)
}

func TestRequestFileSystemRemovalExceptionsHostRemovedAgain(t *testing.T) {
	t.Parallel()
	testRemovalExceptions(t, true, true)
}

func testRemovalExceptions(t *testing.T, hostTarget bool, removeAgain bool) {
	t.Helper()
	host := vfstest.FromMap(map[string]string{
		"/dir/old.ts":      "old",
		"/target/a.ts":     "a",
		"/target/b.ts":     "b",
		"/target/sub/c.ts": "c",
	}, true)
	base, err := newRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, host, "/")
	assert.NilError(t, err)
	removed, err := newLayeredRequestFileSystem(&RequestFileSystem{
		Kind:         KindLayer,
		RemovedPaths: []string{"/dir"},
	}, base, "/")
	assert.NilError(t, err)
	params := &RequestFileSystem{
		Kind: KindLayer,
		Symlinks: map[string]RequestSymlink{
			"/dir/pkg": {Target: "/target", Host: hostTarget},
		},
		RemovedPaths: []string{"/dir/pkg/b.ts"},
	}
	layered, err := newRequestFileSystem(params, removed, "/")
	assert.NilError(t, err)
	compacted, err := newRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, layered, "/")
	assert.NilError(t, err)
	input, err := newRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, compacted, "/")
	assert.NilError(t, err)
	verify := func(fileSystem *requestFileSystem) {
		t.Helper()
		if removeAgain {
			fileSystem, err = newLayeredRequestFileSystem(&RequestFileSystem{
				Kind:         KindLayer,
				RemovedPaths: []string{"/dir"},
			}, fileSystem, "/")
			assert.NilError(t, err)
		}
		assert.Equal(t, fileSystem.FileExists("/dir/pkg/a.ts"), !removeAgain)
		assert.Assert(t, !fileSystem.FileExists("/dir/pkg/b.ts"))
		assert.Assert(t, !fileSystem.FileExists("/dir/old.ts"))
		entries := fileSystem.GetAccessibleEntries("/dir/pkg")
		if removeAgain {
			assert.Equal(t, len(entries.Files), 0)
			assert.Equal(t, len(entries.Directories), 0)
		} else {
			assert.DeepEqual(t, entries.Files, []string{"a.ts"})
			assert.DeepEqual(t, entries.Directories, []string{"sub"})
		}
	}
	verify(layered)
	verify(compacted)
	verify(input)
	assert.Assert(t, !removed.DirectoryExists("/dir/pkg"))
	assert.Assert(t, compacted.FileExists("/dir/pkg/a.ts"))
}

func TestRequestFileSystem(t *testing.T) {
	t.Parallel()

	t.Run("compaction preserves host fallback", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
		}, host, "/")
		assert.NilError(t, err)
		base := getRequestFileSystem(baseFS)
		assert.Assert(t, base != nil)
		assert.Assert(t, base.baseFileSystem() == host)
		assert.Assert(t, !base.FileExists("/created-after-base.ts"))
		assert.NilError(t, host.WriteFile("/created-after-base.ts", "created"))

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{"/layered.ts": "layered"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Assert(t, layered != nil)
		assert.Assert(t, layered.baseFileSystem() == host)
		assert.Assert(t, layered.FileExists("/created-after-base.ts"))
		assert.NilError(t, host.Remove("/created-after-base.ts"))

		assert.Assert(t, layered.baseFileSystem() == host)
		assert.Assert(t, !layered.FileExists("/created-after-base.ts"))
		contents, ok := layered.ReadFile("/host.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "host")
	})

	t.Run("memory is total and never falls back", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/src/index.ts": "memory",
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("/src/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "memory")
		assert.Assert(t, fileSystem.FileExists("/src/index.ts"))
		assert.Assert(t, fileSystem.DirectoryExists("/src"))
		assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/src").Files, []string{"index.ts"})

		_, ok = fileSystem.ReadFile("/host.ts")
		assert.Assert(t, !ok)
		assert.Assert(t, !fileSystem.FileExists("/host.ts"))
		assert.Assert(t, !base.SeenFiles.Has("/host.ts"))
	})

	t.Run("cache hits bypass the host and misses fall back", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/fallback.ts": "fallback",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/cached/index.ts": "cached",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/cached": {Files: []string{"index.ts"}, Directories: []string{}},
			},
		}, base, "/")
		assert.NilError(t, err)
		for seen := range base.SeenFiles.Keys() {
			base.SeenFiles.Delete(seen)
		}

		contents, ok := fileSystem.ReadFile("/cached/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "cached")
		assert.Assert(t, fileSystem.FileExists("/cached/index.ts"))
		assert.Assert(t, fileSystem.DirectoryExists("/cached"))
		assert.DeepEqual(t, fileSystem.GetAccessibleEntries("/cached").Files, []string{"index.ts"})
		assert.Assert(t, !base.SeenFiles.Has("/cached/index.ts"))
		assert.Assert(t, !base.SeenFiles.Has("/cached"))

		contents, ok = fileSystem.ReadFile("/fallback.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "fallback")
		assert.Assert(t, base.SeenFiles.Has("/fallback.ts"))
	})

	t.Run("layered memory is a total replacement", func(t *testing.T) {
		t.Parallel()
		fileSystem, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/memory.ts": "memory",
			},
		}, vfstest.FromMap(map[string]string{"/host.ts": "host"}, true), "/")
		assert.NilError(t, err)
		contents, ok := fileSystem.ReadFile("/memory.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "memory")
		_, ok = fileSystem.ReadFile("/host.ts")
		assert.Assert(t, !ok)
	})

	t.Run("memory resolves internal file and directory symlinks", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "export declare const value: number;",
			},
			Symlinks: map[string]RequestSymlink{
				"/project/node_modules/pkg": {Target: "../../../packages/pkg"},
				"/project/pkg.d.ts":         {Target: "../packages/pkg/index.d.ts"},
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("/project/node_modules/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const value: number;")
		contents, ok = fileSystem.ReadFile("/project/pkg.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const value: number;")
		assert.Equal(t, fileSystem.Realpath("/project/node_modules/pkg/index.d.ts"), "/packages/pkg/index.d.ts")

		entries := fileSystem.GetAccessibleEntries("/project/node_modules")
		assert.DeepEqual(t, entries.Directories, []string{"pkg"})
		_, isSymlink := entries.Symlinks["pkg"]
		assert.Assert(t, isSymlink)
		entries = fileSystem.GetAccessibleEntries("/project")
		assert.DeepEqual(t, entries.Files, []string{"pkg.d.ts"})
		_, isSymlink = entries.Symlinks["pkg.d.ts"]
		assert.Assert(t, isSymlink)
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("cache resolves internal symlinks before the host", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/packages/pkg/index.d.ts": "host content",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "cached content",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/project/node_modules": {Files: []string{}, Directories: []string{}},
			},
			Symlinks: map[string]RequestSymlink{
				"/project/node_modules/pkg": {Target: "/packages/pkg"},
			},
		}, base, "/")
		assert.NilError(t, err)
		for seen := range base.SeenFiles.Keys() {
			base.SeenFiles.Delete(seen)
		}

		contents, ok := fileSystem.ReadFile("/project/node_modules/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "cached content")
		assert.Equal(t, fileSystem.Realpath("/project/node_modules/pkg/index.d.ts"), "/packages/pkg/index.d.ts")
		entries := fileSystem.GetAccessibleEntries("/project/node_modules")
		assert.DeepEqual(t, entries.Directories, []string{"pkg"})
		_, isSymlink := entries.Symlinks["pkg"]
		assert.Assert(t, isSymlink)
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("cache file shadows underlying symlink realpath", func(t *testing.T) {
		t.Parallel()
		base := vfstest.FromMap(map[string]any{
			"/project/node_modules/pkg": vfstest.Symlink("/host/pkg"),
			"/host/pkg/index.d.ts":      "host content",
		}, true)
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/project/node_modules/pkg/index.d.ts": "cached content",
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("/project/node_modules/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "cached content")
		assert.Equal(
			t,
			fileSystem.Realpath("/project/node_modules/pkg/index.d.ts"),
			"/project/node_modules/pkg/index.d.ts",
		)
	})

	t.Run("layered cache adds changes and blocks removed entries", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/keep.ts":               "keep",
				"/change.ts":             "old",
				"/remove.ts":             "remove",
				"/removed-dir/gone.ts":   "gone",
				"/becomes-file/child.ts": "child",
				"/becomes-directory.ts":  "file",
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/change.ts":                     "new",
				"/added.ts":                      "added",
				"/remove.ts":                     "replacement",
				"/removed-dir/replacement.ts":    "replacement",
				"/becomes-file":                  "file",
				"/becomes-directory.ts/child.ts": "child",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/": {Files: []string{"added.ts", "becomes-file", "change.ts", "remove.ts"}, Directories: []string{"becomes-directory.ts", "removed-dir"}},
			},
			RemovedPaths: []string{"/remove.ts", "/removed-dir"},
		}, base, "/")
		assert.NilError(t, err)

		for path, expected := range map[string]string{
			"/keep.ts":                       "keep",
			"/change.ts":                     "new",
			"/added.ts":                      "added",
			"/remove.ts":                     "replacement",
			"/removed-dir/replacement.ts":    "replacement",
			"/becomes-file":                  "file",
			"/becomes-directory.ts/child.ts": "child",
		} {
			contents, ok := layered.ReadFile(path)
			assert.Assert(t, ok, path)
			assert.Equal(t, contents, expected)
		}
		assert.Assert(t, layered.FileExists("/remove.ts"))
		assert.Assert(t, layered.DirectoryExists("/removed-dir"))
		assert.Assert(t, !layered.FileExists("/removed-dir/gone.ts"))
		assert.Assert(t, layered.Stat("/remove.ts") != nil)
		assert.Assert(t, layered.Stat("/removed-dir/replacement.ts") != nil)
		assert.Equal(t, layered.Realpath("/removed-dir/replacement.ts"), "/removed-dir/replacement.ts")
		assert.Assert(t, layered.FileExists("/becomes-file"))
		assert.Assert(t, !layered.DirectoryExists("/becomes-file"))
		assert.Assert(t, !layered.FileExists("/becomes-directory.ts"))
		assert.Assert(t, layered.DirectoryExists("/becomes-directory.ts"))
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Files, []string{"added.ts", "becomes-file", "change.ts", "remove.ts"})
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Directories, []string{"becomes-directory.ts", "removed-dir"})
	})

	t.Run("new layers override targets of inherited symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/change.ts": "old",
				"/target/keep.ts":   "keep",
				"/target/remove.ts": "remove",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/target/change.ts": "new",
				"/target/added.ts":  "added",
			},
			RemovedPaths: []string{"/target/remove.ts"},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := layered.ReadFile("/link/change.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "new")
		contents, ok = layered.ReadFile("/link/added.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "added")
		_, ok = layered.ReadFile("/link/remove.ts")
		assert.Assert(t, !ok)
		assert.DeepEqual(t, layered.GetAccessibleEntries("/link").Files, []string{"added.ts", "change.ts", "keep.ts"})
	})

	t.Run("alias tombstones take precedence over inherited symlink targets", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/file.ts": "old",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/target/file.ts": "new",
			},
			RemovedPaths: []string{"/link"},
		}, base, "/")
		assert.NilError(t, err)

		_, ok := layered.ReadFile("/link/file.ts")
		assert.Assert(t, !ok)
		assert.Assert(t, !layered.FileExists("/link/file.ts"))
		assert.Assert(t, !layered.DirectoryExists("/link"))
		assert.Assert(t, layered.Stat("/link/file.ts") == nil)
		assert.Equal(t, len(layered.GetAccessibleEntries("/link").Files), 0)
	})

	t.Run("alias tombstones take precedence over same-layer symlink targets", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host-target/file.ts": "host",
		}, true)
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/file.ts": "memory",
			},
			Symlinks: map[string]RequestSymlink{
				"/link":      {Target: "/target"},
				"/host-link": {Target: "/host-target", Host: true},
			},
			RemovedPaths: []string{"/link/file.ts", "/host-link/file.ts"},
		}, host, "/")
		assert.NilError(t, err)

		for _, path := range []string{"/link/file.ts", "/host-link/file.ts"} {
			_, ok := fileSystem.ReadFile(path)
			assert.Assert(t, !ok, path)
			assert.Assert(t, !fileSystem.FileExists(path), path)
			assert.Assert(t, fileSystem.Stat(path) == nil, path)
		}
		assert.Equal(t, len(fileSystem.GetAccessibleEntries("/link").Files), 0)
		assert.Equal(t, len(fileSystem.GetAccessibleEntries("/host-link").Files), 0)
	})

	t.Run("compaction preserves overlays addressed through inherited symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/remove.ts": "remove",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			Files:        map[string]string{},
			RemovedPaths: []string{"/link/remove.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)

		_, ok := layered.ReadFile("/link/remove.ts")
		assert.Assert(t, !ok)
	})

	t.Run("compaction removes tombstones from explicit listings", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/dir/remove.ts": "remove",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/dir": {Files: []string{"remove.ts"}, Directories: []string{}},
			},
		}, host, "/")
		assert.NilError(t, err)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			Files:        map[string]string{},
			RemovedPaths: []string{"/dir/remove.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Equal(t, len(layered.GetAccessibleEntries("/dir").Files), 0)
	})

	t.Run("compaction allows recreating a path removed through an inherited symlink", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/recreated.ts": "base",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		removedFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			RemovedPaths: []string{"/link/recreated.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)

		recreatedFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/link/recreated.ts": "recreated",
			},
		}, removedFS, "/")
		assert.NilError(t, err)
		recreated := getRequestFileSystem(recreatedFS)
		contents, ok := recreated.ReadFile("/link/recreated.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "recreated")
	})

	t.Run("compaction allows recreating a descendant of a path removed through an inherited symlink", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/dir/existing.ts": "existing",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		removed, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			RemovedPaths: []string{"/link/dir"},
		}, base, "/")
		assert.NilError(t, err)

		recreated, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/link/dir/recreated.ts": "recreated",
			},
		}, removed, "/")
		assert.NilError(t, err)
		contents, ok := recreated.ReadFile("/link/dir/recreated.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "recreated")
		assert.Assert(t, !recreated.FileExists("/link/dir/existing.ts"))
		assert.DeepEqual(t, recreated.GetAccessibleEntries("/link/dir").Files, []string{"recreated.ts"})
		assert.DeepEqual(t, recreated.GetAccessibleEntries("/link").Directories, []string{"dir"})
	})

	t.Run("files replacing inherited symlink target directories have empty listings", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/item/child.ts": "child",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/target/item": "file",
			},
		}, base, "/")
		assert.NilError(t, err)

		assert.Assert(t, layered.FileExists("/link/item"))
		assert.Assert(t, !layered.DirectoryExists("/link/item"))
		assert.Equal(t, len(layered.GetAccessibleEntries("/link/item").Files), 0)
		assert.Equal(t, len(layered.GetAccessibleEntries("/link/item").Directories), 0)
	})

	t.Run("cache tombstones block host hits", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/remove.ts":           "host",
			"/removed-dir/gone.ts": "host",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			Files:        map[string]string{},
			RemovedPaths: []string{"/remove.ts", "/removed-dir"},
		}, base, "/")
		assert.NilError(t, err)
		for seen := range base.SeenFiles.Keys() {
			base.SeenFiles.Delete(seen)
		}

		assert.Assert(t, !fileSystem.FileExists("/remove.ts"))
		assert.Assert(t, !fileSystem.DirectoryExists("/removed-dir"))
		assert.Assert(t, !fileSystem.FileExists("/removed-dir/gone.ts"))
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("compacted filesystem layers retain host fallback", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts":              "host",
			"/removed.ts":           "host removed",
			"/sealed/host.ts":       "hidden from listing",
			"/open/host.ts":         "host listing",
			"/open/layer-listed.ts": "host listed",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/inherited.ts":        "inherited",
				"/sealed/inherited.ts": "sealed inherited",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/sealed": {Files: []string{"inherited.ts"}, Directories: []string{}},
			},
			RemovedPaths: []string{"/removed.ts"},
		}, host, "/")
		assert.NilError(t, err)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/added.ts":        "added",
				"/sealed/added.ts": "sealed added",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/open": {Files: []string{"layer-listed.ts"}, Directories: []string{}},
			},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Assert(t, layered.baseFileSystem() == host)
		assert.Equal(t, layered.kind, KindLayer)

		for path, expected := range map[string]string{
			"/host.ts":      "host",
			"/inherited.ts": "inherited",
			"/added.ts":     "added",
		} {
			contents, ok := layered.ReadFile(path)
			assert.Assert(t, ok, path)
			assert.Equal(t, contents, expected)
		}
		_, ok := layered.ReadFile("/removed.ts")
		assert.Assert(t, !ok)
		assert.DeepEqual(t, layered.GetAccessibleEntries("/sealed").Files, []string{"added.ts", "inherited.ts"})
		assert.DeepEqual(t, layered.GetAccessibleEntries("/open").Files, []string{"layer-listed.ts"})
	})

	t.Run("compacting a filesystem layer over a full filesystem produces a full filesystem", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/target/inherited.ts": "inherited",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/target": {Files: []string{"inherited.ts"}, Directories: []string{}},
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindLayer,
			Files: map[string]string{
				"/target/added.ts": "added",
			},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Equal(t, layered.kind, KindFull)
		assert.Assert(t, layered.baseFileSystem() == host)

		for path, expected := range map[string]string{
			"/link/inherited.ts": "inherited",
			"/link/added.ts":     "added",
		} {
			contents, ok := layered.ReadFile(path)
			assert.Assert(t, ok, path)
			assert.Equal(t, contents, expected)
		}
		_, ok := layered.ReadFile("/host.ts")
		assert.Assert(t, !ok)
	})

	t.Run("memory routes explicit host symlinks to the host only through the link", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host/node_modules/pkg/index.d.ts": "export declare const hostValue: string;",
			"/host/outside.ts":                  "outside",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/project/index.ts": `import { hostValue } from "pkg";`,
			},
			Symlinks: map[string]RequestSymlink{
				"/project/node_modules": {Target: "/host/node_modules", Host: true},
			},
		}, base, "/")
		assert.NilError(t, err)

		_, ok := fileSystem.ReadFile("/host/outside.ts")
		assert.Assert(t, !ok)
		assert.Assert(t, !base.SeenFiles.Has("/host/outside.ts"))

		contents, ok := fileSystem.ReadFile("/project/node_modules/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const hostValue: string;")
		assert.Assert(t, base.SeenFiles.Has("/host/node_modules/pkg/index.d.ts"))
		assert.Equal(t, fileSystem.Realpath("/project/node_modules/pkg/index.d.ts"), "/host/node_modules/pkg/index.d.ts")

		entries := fileSystem.GetAccessibleEntries("/project")
		assert.DeepEqual(t, entries.Directories, []string{"node_modules"})
		_, isSymlink := entries.Symlinks["node_modules"]
		assert.Assert(t, isSymlink)
	})

	t.Run("layered host symlinks bypass snapshot bases", func(t *testing.T) {
		t.Parallel()
		host := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host/pkg/index.d.ts": "host",
		}, true)}
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/memory.ts": "memory",
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{},
			Symlinks: map[string]RequestSymlink{
				"/project/pkg": {Target: "/host/pkg", Host: true},
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := layered.ReadFile("/project/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "host")
		assert.Assert(t, layered.FileExists("/project/pkg/index.d.ts"))
		assert.Assert(t, layered.DirectoryExists("/project/pkg"))
		assert.DeepEqual(t, layered.GetAccessibleEntries("/project/pkg").Files, []string{"index.d.ts"})
		assert.Equal(t, layered.Realpath("/project/pkg/index.d.ts"), "/host/pkg/index.d.ts")
		info := layered.Stat("/project/pkg/index.d.ts")
		assert.Assert(t, info != nil)
		assert.Equal(t, info.Name(), "index.d.ts")
		assert.Assert(t, host.SeenFiles.Has("/host/pkg/index.d.ts"))
	})

	t.Run("inherited host symlinks bypass newer cache entries at the target", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host/pkg/host.ts":    "host",
			"/host/pkg/removed.ts": "removed",
		}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/host/pkg", Host: true},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindLayer,
			RemovedPaths: []string{"/link/removed.ts"},
			Files: map[string]string{
				"/host/pkg/host.ts":       "cache",
				"/host/pkg/cache-only.ts": "cache only",
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := layered.ReadFile("/link/host.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "host")
		assert.Assert(t, !layered.FileExists("/link/cache-only.ts"))
		assert.Assert(t, !layered.FileExists("/link/removed.ts"))
		assert.Equal(t, layered.Stat("/link/host.ts").Size(), int64(len("host")))
		assert.DeepEqual(t, layered.GetAccessibleEntries("/link").Files, []string{"host.ts"})
	})

	t.Run("canonical path collisions are rejected", func(t *testing.T) {
		t.Parallel()
		base := vfstest.FromMap(map[string]string{}, false)

		_, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				`C:\Repo\file.ts`: "first",
				`c:/repo/file.ts`: "second",
			},
		}, base, `C:\Workspace`)
		assert.ErrorContains(t, err, "duplicate request filesystem file path")

		_, err = newRequestFileSystem(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{},
			Directories: map[string]RequestDirectoryEntries{
				`C:\Repo`:   {},
				`c:/repo/.`: {},
			},
		}, base, `C:\Workspace`)
		assert.ErrorContains(t, err, "duplicate request filesystem directory path")

		_, err = newRequestFileSystem(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{},
			Symlinks: map[string]RequestSymlink{
				`C:\Repo\link`: {Target: `C:\Target`},
				`c:/repo/link`: {Target: `C:\Other`},
			},
		}, base, `C:\Workspace`)
		assert.ErrorContains(t, err, "duplicate request filesystem symlink path")
	})

	t.Run("symlink cycles are treated as missing", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindFull,
			Files: map[string]string{},
			Symlinks: map[string]RequestSymlink{
				"/a": {Target: "/b"},
				"/b": {Target: "/a"},
			},
		}, base, "/")
		assert.NilError(t, err)

		_, ok := fileSystem.ReadFile("/a/file.ts")
		assert.Assert(t, !ok)
		assert.Assert(t, !fileSystem.DirectoryExists("/a"))
		assert.Equal(t, fileSystem.Realpath("/a"), "/a")
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("posix relative symlink targets resolve from the link directory", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "export declare const value: number;",
			},
			Symlinks: map[string]RequestSymlink{
				"/project/pkg": {Target: "../packages/pkg"},
			},
		}, base, `C:\Workspace`)
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("/project/pkg/index.d.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const value: number;")
		assert.Equal(t, fileSystem.Realpath("/project/pkg/index.d.ts"), "/packages/pkg/index.d.ts")
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("vscode document URI paths support listings symlinks and tombstones", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{}, true)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"vscode-remote://ssh-remote+host/workspace/src/index.ts":      "index",
				"vscode-remote://ssh-remote+host/workspace/packages/pkg/a.ts": "package",
			},
			Symlinks: map[string]RequestSymlink{
				"vscode-remote://ssh-remote+host/workspace/src/pkg": {Target: "../packages/pkg"},
			},
			RemovedPaths: []string{
				"vscode-remote://ssh-remote+host/workspace/packages/pkg/removed.ts",
			},
		}, base, "/")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("vscode-remote://ssh-remote+host/workspace/src/index.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "index")
		contents, ok = fileSystem.ReadFile("vscode-remote://ssh-remote+host/workspace/src/pkg/a.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "package")
		assert.Equal(
			t,
			fileSystem.Realpath("vscode-remote://ssh-remote+host/workspace/src/pkg/a.ts"),
			"vscode-remote://ssh-remote+host/workspace/packages/pkg/a.ts",
		)
		assert.DeepEqual(
			t,
			fileSystem.GetAccessibleEntries("vscode-remote://ssh-remote+host/workspace/src").Files,
			[]string{"index.ts"},
		)
		assert.DeepEqual(
			t,
			fileSystem.GetAccessibleEntries("vscode-remote://ssh-remote+host/workspace/src").Directories,
			[]string{"pkg"},
		)
		assert.Assert(t, !fileSystem.FileExists("vscode-remote://ssh-remote+host/workspace/src/pkg/removed.ts"))
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("windows paths resolve symlinks case insensitively", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"C:/Host/outside.ts": "outside",
		}, false)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				`C:\Repo\Packages\Pkg\Index.d.ts`: "export declare const windowsValue: number;",
			},
			Directories: map[string]RequestDirectoryEntries{
				`C:\Repo\Project\node_modules`: {Files: []string{}, Directories: []string{"pkg"}},
			},
			Symlinks: map[string]RequestSymlink{
				`C:\Repo\Project\node_modules\PKG`: {Target: `..\..\Packages\Pkg`},
				`C:\Repo\Project\Current.d.ts`:     {Target: `..\Packages\Pkg\Index.d.ts`},
			},
		}, base, `C:\Workspace`)
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile(`c:\repo\project\NODE_MODULES\pkg\INDEX.D.TS`)
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const windowsValue: number;")
		contents, ok = fileSystem.ReadFile(`C:\REPO\PROJECT\current.d.ts`)
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const windowsValue: number;")
		assert.Equal(
			t,
			fileSystem.Realpath(`c:\repo\project\node_modules\pkg\index.d.ts`),
			"C:/Repo/Packages/Pkg/index.d.ts",
		)

		entries := fileSystem.GetAccessibleEntries(`c:\REPO\project\NODE_MODULES`)
		assert.DeepEqual(t, entries.Directories, []string{"PKG"})
		_, isSymlink := entries.Symlinks["PKG"]
		assert.Assert(t, isSymlink)
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("case insensitive symlink matching handles unicode byte length changes", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{}, false)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"C:/Repo/target.ts": "target",
			},
			Symlinks: map[string]RequestSymlink{
				"C:/Repo/K": {Target: "C:/Repo/target.ts"},
			},
		}, base, "C:/Repo")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("c:/repo/k")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "target")
	})

	t.Run("full request filesystems are immutable after eager compaction", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		memory, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				"/src/a.ts": "a",
			},
		}, host, "/")
		assert.NilError(t, err)
		assert.ErrorIs(t, memory.WriteFile("/src/b.ts", "b"), vfs.ErrInvalid)
		assert.ErrorIs(t, memory.AppendFile("/src/a.ts", "b"), vfs.ErrInvalid)
		assert.ErrorIs(t, memory.Remove("/src"), vfs.ErrInvalid)
		contents, ok := memory.ReadFile("/src/a.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "a")

		cache, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{},
		}, memory, "/")
		assert.NilError(t, err)
		assert.Equal(t, cache.kind, KindFull)
		assert.ErrorIs(t, cache.WriteFile("/written.ts", "written"), vfs.ErrInvalid)
	})

	t.Run("layer request filesystems write through after eager compaction", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{},
		}, host, "/")
		assert.NilError(t, err)
		cache, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{},
		}, base, "/")
		assert.NilError(t, err)
		assert.Equal(t, cache.kind, KindLayer)
		assert.NilError(t, cache.WriteFile("/written.ts", "written"))
		assert.NilError(t, cache.AppendFile("/written.ts", " appended"))
		contents, ok := host.ReadFile("/written.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "written appended")
		assert.NilError(t, cache.Remove("/written.ts"))
		assert.Assert(t, !host.FileExists("/written.ts"))
	})

	t.Run("cache mutations follow inherited request symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/target/write.ts":  "target",
			"/target/append.ts": "target",
			"/target/remove.ts": "target",
			"/target/times.ts":  "target",
			"/link/write.ts":    "alias",
			"/link/append.ts":   "alias",
			"/link/remove.ts":   "alias",
			"/link/times.ts":    "alias",
		}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindLayer,
			Files: map[string]string{},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)
		cache, err := newLayeredRequestFileSystem(&RequestFileSystem{Kind: KindLayer}, base, "/")
		assert.NilError(t, err)

		assert.NilError(t, cache.WriteFile("/link/write.ts", "written"))
		contents, ok := host.ReadFile("/target/write.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "written")

		assert.NilError(t, cache.AppendFile("/link/append.ts", " appended"))
		contents, ok = host.ReadFile("/target/append.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "target appended")

		assert.NilError(t, cache.Remove("/link/remove.ts"))
		assert.Assert(t, !host.FileExists("/target/remove.ts"))

		modified := time.Unix(123, 0)
		assert.NilError(t, cache.Chtimes("/link/times.ts", modified, modified))
		assert.Equal(t, host.Stat("/target/times.ts").ModTime(), modified)
	})

	t.Run("mixed windows and posix roots support cross-root and relative symlinks", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"C:/Host/node_modules/host-pkg/index.d.ts": "export declare const hostValue: boolean;",
		}, false)}
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindFull,
			Files: map[string]string{
				`C:\Repo\Packages\windows-pkg\index.d.ts`: "export declare const windowsValue: number;",
				"/repo/packages/posix-pkg/index.d.ts":     "export declare const posixValue: string;",
			},
			Symlinks: map[string]RequestSymlink{
				// Cross between drive-letter and POSIX roots in both directions.
				`C:\Repo\Project\node_modules\posix-pkg`: {Target: "/repo/packages/posix-pkg"},
				"/repo/project/node_modules/windows-pkg": {Target: `C:\Repo\Packages\windows-pkg`},
				// Windows symlink targets read from disk may be relative to the link's directory.
				`C:\Repo\Project\windows-pkg.d.ts`: {Target: `..\Packages\windows-pkg\index.d.ts`},
				`C:\Repo\Project\node_modules\host-pkg`: {
					Target: `..\..\..\Host\node_modules\host-pkg`,
					Host:   true,
				},
			},
		}, base, `C:\Workspace`)
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile(`c:\REPO\project\NODE_MODULES\POSIX-PKG\INDEX.D.TS`)
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const posixValue: string;")
		contents, ok = fileSystem.ReadFile("/REPO/PROJECT/NODE_MODULES/WINDOWS-PKG/INDEX.D.TS")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const windowsValue: number;")
		contents, ok = fileSystem.ReadFile(`c:\repo\project\WINDOWS-PKG.D.TS`)
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const windowsValue: number;")
		contents, ok = fileSystem.ReadFile(`C:\Repo\Project\node_modules\HOST-PKG\index.d.ts`)
		assert.Assert(t, ok)
		assert.Equal(t, contents, "export declare const hostValue: boolean;")

		assert.Equal(
			t,
			fileSystem.Realpath(`c:\repo\project\node_modules\posix-pkg\index.d.ts`),
			"/repo/packages/posix-pkg/index.d.ts",
		)
		assert.Equal(
			t,
			fileSystem.Realpath("/repo/project/node_modules/windows-pkg/index.d.ts"),
			"C:/Repo/Packages/windows-pkg/index.d.ts",
		)
		assert.Assert(t, base.SeenFiles.Has("C:/Host/node_modules/host-pkg/index.d.ts"))
	})
}
