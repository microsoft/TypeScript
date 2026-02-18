package project

import (
	"slices"
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestSnapshotFSBuilder(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path {
		return tspath.Path(fileName)
	}

	t.Run("builds directory tree on file add", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
		}, false /* useCaseSensitiveFileNames */)

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Read the file to add it to the diskFiles
		fh := builder.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil, "file should exist")
		assert.Equal(t, fh.Content(), "const foo = 1;")

		// Finalize and check directories
		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// Check that directory structure was built
		// /src should contain /src/foo.ts
		srcDir, ok := snapshot.diskDirectories[tspath.Path("/src")]
		assert.Assert(t, ok, "/src directory should exist")
		_, hasFoo := srcDir[tspath.Path("/src/foo.ts")]
		assert.Assert(t, hasFoo, "/src should contain /src/foo.ts")

		// / should contain /src
		rootDir, ok := snapshot.diskDirectories[tspath.Path("/")]
		assert.Assert(t, ok, "/ directory should exist")
		_, hasSrc := rootDir[tspath.Path("/src")]
		assert.Assert(t, hasSrc, "/ should contain /src")
	})

	t.Run("builds nested directory tree", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/nested/deep/file.ts": "export const x = 1;",
		}, false /* useCaseSensitiveFileNames */)

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Read the file to add it to the diskFiles
		fh := builder.GetFile("/src/nested/deep/file.ts")
		assert.Assert(t, fh != nil, "file should exist")

		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// Check the complete directory tree
		_, hasFile := snapshot.diskDirectories[tspath.Path("/src/nested/deep")][tspath.Path("/src/nested/deep/file.ts")]
		assert.Assert(t, hasFile)
		_, hasDeep := snapshot.diskDirectories[tspath.Path("/src/nested")][tspath.Path("/src/nested/deep")]
		assert.Assert(t, hasDeep)
		_, hasNested := snapshot.diskDirectories[tspath.Path("/src")][tspath.Path("/src/nested")]
		assert.Assert(t, hasNested)
		_, hasSrc := snapshot.diskDirectories[tspath.Path("/")][tspath.Path("/src")]
		assert.Assert(t, hasSrc)
	})

	t.Run("removes directory entries on file delete", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
		}, false /* useCaseSensitiveFileNames */)

		// Start with existing diskFiles and directories
		existingDiskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/foo.ts"): newDiskFile("/src/foo.ts", "const foo = 1;"),
		}
		existingDirs := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/foo.ts"): "foo.ts",
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			existingDiskFiles,
			existingDirs,
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Mark the file for deletion by loading and deleting
		if entry, ok := builder.diskFiles.Load(tspath.Path("/src/foo.ts")); ok {
			entry.Delete()
		}

		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// File should be deleted
		_, hasFile := snapshot.diskFiles[tspath.Path("/src/foo.ts")]
		assert.Assert(t, !hasFile, "file should be deleted")

		// Directory tree should be cleaned up
		_, hasSrcDir := snapshot.diskDirectories[tspath.Path("/src")]
		assert.Assert(t, !hasSrcDir, "/src directory should be removed")

		_, hasRootDir := snapshot.diskDirectories[tspath.Path("/")]
		assert.Assert(t, !hasRootDir, "root directory should be removed")
	})

	t.Run("removes only empty directories on file delete", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
			"/src/bar.ts": "const bar = 2;",
		}, false /* useCaseSensitiveFileNames */)

		// Start with existing diskFiles and directories
		existingDiskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/foo.ts"): newDiskFile("/src/foo.ts", "const foo = 1;"),
			tspath.Path("/src/bar.ts"): newDiskFile("/src/bar.ts", "const bar = 2;"),
		}
		existingDirs := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/foo.ts"): "foo.ts",
				tspath.Path("/src/bar.ts"): "bar.ts",
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			existingDiskFiles,
			existingDirs,
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Delete only foo.ts
		if entry, ok := builder.diskFiles.Load(tspath.Path("/src/foo.ts")); ok {
			entry.Delete()
		}

		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// foo.ts should be deleted
		_, hasFile := snapshot.diskFiles[tspath.Path("/src/foo.ts")]
		assert.Assert(t, !hasFile, "foo.ts should be deleted")

		// bar.ts should still exist
		_, hasBar := snapshot.diskFiles[tspath.Path("/src/bar.ts")]
		assert.Assert(t, hasBar, "bar.ts should still exist")

		// /src directory should still exist with bar.ts
		srcDir, hasSrcDir := snapshot.diskDirectories[tspath.Path("/src")]
		assert.Assert(t, hasSrcDir, "/src directory should still exist")
		_, hasFoo := srcDir[tspath.Path("/src/foo.ts")]
		assert.Assert(t, !hasFoo, "/src should not contain foo.ts")
		_, hasBarInDir := srcDir[tspath.Path("/src/bar.ts")]
		assert.Assert(t, hasBarInDir, "/src should contain bar.ts")

		// root should still contain /src
		rootDir, hasRootDir := snapshot.diskDirectories[tspath.Path("/")]
		assert.Assert(t, hasRootDir, "root directory should still exist")
		_, hasSrc := rootDir[tspath.Path("/src")]
		assert.Assert(t, hasSrc, "root should contain /src")
	})

	t.Run("adds file to existing directory", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
			"/src/bar.ts": "const bar = 2;",
		}, false /* useCaseSensitiveFileNames */)

		// Start with existing file and directories
		existingDiskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/foo.ts"): newDiskFile("/src/foo.ts", "const foo = 1;"),
		}
		existingDirs := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/foo.ts"): "foo.ts",
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			existingDiskFiles,
			existingDirs,
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Read bar.ts to add it
		fh := builder.GetFile("/src/bar.ts")
		assert.Assert(t, fh != nil, "bar.ts should exist")

		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// /src should contain both files
		srcDir := snapshot.diskDirectories[tspath.Path("/src")]
		_, hasFoo := srcDir[tspath.Path("/src/foo.ts")]
		assert.Assert(t, hasFoo, "/src should contain foo.ts")
		_, hasBar := srcDir[tspath.Path("/src/bar.ts")]
		assert.Assert(t, hasBar, "/src should contain bar.ts")
	})

	t.Run("no change when no files added or deleted", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
		}, false /* useCaseSensitiveFileNames */)

		existingDiskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/foo.ts"): newDiskFile("/src/foo.ts", "const foo = 1;"),
		}
		existingDirs := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/foo.ts"): "foo.ts",
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			existingDiskFiles,
			existingDirs,
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Don't add or delete any files
		snapshot, changed := builder.Finalize()
		assert.Assert(t, !changed, "should not have changed")

		// Directories should remain the same
		srcDir := snapshot.diskDirectories[tspath.Path("/src")]
		_, hasFoo := srcDir[tspath.Path("/src/foo.ts")]
		assert.Assert(t, hasFoo)
	})

	t.Run("overlay files are returned over disk files", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "const foo = 1;",
		}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/foo.ts"): {
				fileBase: fileBase{fileName: "/src/foo.ts", content: "const foo = 999;"},
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			overlays,
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Should return overlay content
		fh := builder.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)
		assert.Equal(t, fh.Content(), "const foo = 999;")
	})

	t.Run("multiple files added and deleted in single cycle", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/a.ts":        "const a = 1;",
			"/src/b.ts":        "const b = 2;",
			"/lib/utils.ts":    "export const util = 1;",
			"/lib/helpers.ts":  "export const helper = 1;",
			"/other/single.ts": "const single = 1;",
		}, false /* useCaseSensitiveFileNames */)

		// Start with some existing files
		existingDiskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/a.ts"):        newDiskFile("/src/a.ts", "const a = 1;"),
			tspath.Path("/other/single.ts"): newDiskFile("/other/single.ts", "const single = 1;"),
		}
		existingDirs := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"):   "src",
				tspath.Path("/other"): "other",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/a.ts"): "a.ts",
			},
			tspath.Path("/other"): {
				tspath.Path("/other/single.ts"): "single.ts",
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			make(map[tspath.Path]*Overlay), // overlays
			existingDiskFiles,
			existingDirs,
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Add new files
		fh := builder.GetFile("/src/b.ts")
		assert.Assert(t, fh != nil)
		fh = builder.GetFile("/lib/utils.ts")
		assert.Assert(t, fh != nil)
		fh = builder.GetFile("/lib/helpers.ts")
		assert.Assert(t, fh != nil)

		// Delete existing files
		if entry, ok := builder.diskFiles.Load(tspath.Path("/src/a.ts")); ok {
			entry.Delete()
		}
		if entry, ok := builder.diskFiles.Load(tspath.Path("/other/single.ts")); ok {
			entry.Delete()
		}

		snapshot, changed := builder.Finalize()
		assert.Assert(t, changed, "should have changed")

		// Verify deleted files are gone
		_, hasA := snapshot.diskFiles[tspath.Path("/src/a.ts")]
		assert.Assert(t, !hasA, "/src/a.ts should be deleted")
		_, hasSingle := snapshot.diskFiles[tspath.Path("/other/single.ts")]
		assert.Assert(t, !hasSingle, "/other/single.ts should be deleted")

		// Verify added files exist
		_, hasB := snapshot.diskFiles[tspath.Path("/src/b.ts")]
		assert.Assert(t, hasB, "/src/b.ts should exist")
		_, hasUtils := snapshot.diskFiles[tspath.Path("/lib/utils.ts")]
		assert.Assert(t, hasUtils, "/lib/utils.ts should exist")
		_, hasHelpers := snapshot.diskFiles[tspath.Path("/lib/helpers.ts")]
		assert.Assert(t, hasHelpers, "/lib/helpers.ts should exist")

		// Verify /other directory is cleaned up (was only entry deleted)
		_, hasOther := snapshot.diskDirectories[tspath.Path("/other")]
		assert.Assert(t, !hasOther, "/other directory should be removed")

		// Verify /src still exists with b.ts (a.ts deleted, b.ts added)
		srcDir, hasSrc := snapshot.diskDirectories[tspath.Path("/src")]
		assert.Assert(t, hasSrc, "/src directory should exist")
		_, hasAInDir := srcDir[tspath.Path("/src/a.ts")]
		assert.Assert(t, !hasAInDir, "/src should not contain a.ts")
		_, hasBInDir := srcDir[tspath.Path("/src/b.ts")]
		assert.Assert(t, hasBInDir, "/src should contain b.ts")

		// Verify /lib was created with both files
		libDir, hasLib := snapshot.diskDirectories[tspath.Path("/lib")]
		assert.Assert(t, hasLib, "/lib directory should exist")
		_, hasUtilsInDir := libDir[tspath.Path("/lib/utils.ts")]
		assert.Assert(t, hasUtilsInDir, "/lib should contain utils.ts")
		_, hasHelpersInDir := libDir[tspath.Path("/lib/helpers.ts")]
		assert.Assert(t, hasHelpersInDir, "/lib should contain helpers.ts")

		// Verify root contains /src and /lib but not /other
		rootDir := snapshot.diskDirectories[tspath.Path("/")]
		_, hasSrcInRoot := rootDir[tspath.Path("/src")]
		assert.Assert(t, hasSrcInRoot, "root should contain /src")
		_, hasLibInRoot := rootDir[tspath.Path("/lib")]
		assert.Assert(t, hasLibInRoot, "root should contain /lib")
		_, hasOtherInRoot := rootDir[tspath.Path("/other")]
		assert.Assert(t, !hasOtherInRoot, "root should not contain /other")
	})

	t.Run("overlay directories are computed from overlays", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/overlay.ts"): {
				fileBase: fileBase{fileName: "/src/overlay.ts", content: "const x = 1;"},
			},
			tspath.Path("/src/nested/deep.ts"): {
				fileBase: fileBase{fileName: "/src/nested/deep.ts", content: "const y = 2;"},
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			overlays,
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		// Check overlayDirectories was built correctly
		srcDir, ok := builder.overlayDirectories[tspath.Path("/src")]
		assert.Assert(t, ok, "/src overlay directory should exist")
		_, hasOverlay := srcDir[tspath.Path("/src/overlay.ts")]
		assert.Assert(t, hasOverlay, "/src should contain overlay.ts")
		_, hasNested := srcDir[tspath.Path("/src/nested")]
		assert.Assert(t, hasNested, "/src should contain nested/")

		nestedDir, ok := builder.overlayDirectories[tspath.Path("/src/nested")]
		assert.Assert(t, ok, "/src/nested overlay directory should exist")
		_, hasDeep := nestedDir[tspath.Path("/src/nested/deep.ts")]
		assert.Assert(t, hasDeep, "/src/nested should contain deep.ts")

		rootDir, ok := builder.overlayDirectories[tspath.Path("/")]
		assert.Assert(t, ok, "/ overlay directory should exist")
		_, hasSrc := rootDir[tspath.Path("/src")]
		assert.Assert(t, hasSrc, "/ should contain /src")
	})

	t.Run("GetAccessibleEntries combines disk and overlay", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/disk.ts": "const disk = 1;",
		}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/overlay.ts"): {
				fileBase: fileBase{fileName: "/src/overlay.ts", content: "const overlay = 1;"},
			},
		}

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay), // prevOverlays
			overlays,
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		entries := builder.GetAccessibleEntries("/src")

		// Should contain both disk file and overlay file (both as basenames)
		assert.Assert(t, slices.Contains(entries.Files, "disk.ts"), "should contain disk.ts")
		assert.Assert(t, slices.Contains(entries.Files, "overlay.ts"), "should contain overlay.ts")
	})
}

func TestSnapshotFS(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path {
		return tspath.Path(fileName)
	}

	t.Run("GetFile returns overlay file", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "disk content",
		}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/foo.ts"): {
				fileBase: fileBase{fileName: "/src/foo.ts", content: "overlay content"},
			},
		}

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           overlays,
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		fh := snapshot.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)
		assert.Equal(t, fh.Content(), "overlay content")
	})

	t.Run("GetFile returns disk file when not in overlay", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "disk content",
		}, false /* useCaseSensitiveFileNames */)

		diskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/foo.ts"): newDiskFile("/src/foo.ts", "disk content"),
		}

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          diskFiles,
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		fh := snapshot.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)
		assert.Equal(t, fh.Content(), "disk content")
	})

	t.Run("GetFile reads from fs when not cached", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "fs content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		fh := snapshot.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)
		assert.Equal(t, fh.Content(), "fs content")
	})

	t.Run("GetFile returns nil for non-existent file", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		fh := snapshot.GetFile("/src/nonexistent.ts")
		assert.Assert(t, fh == nil, "should return nil for non-existent file")
	})

	t.Run("isOpenFile returns true for overlays", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/foo.ts"): {
				fileBase: fileBase{fileName: "/src/foo.ts", content: "overlay content"},
			},
		}

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           overlays,
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		assert.Assert(t, snapshot.isOpenFile("/src/foo.ts"), "overlay file should be open")
		assert.Assert(t, !snapshot.isOpenFile("/src/bar.ts"), "non-overlay file should not be open")
	})

	t.Run("GetFileByPath uses provided path", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "disk content",
		}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/foo.ts"): {
				fileBase: fileBase{fileName: "/src/foo.ts", content: "overlay content"},
			},
		}

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           overlays,
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		// GetFileByPath should use the provided path directly
		fh := snapshot.GetFileByPath("/src/foo.ts", tspath.Path("/src/foo.ts"))
		assert.Assert(t, fh != nil)
		assert.Equal(t, fh.Content(), "overlay content")
	})

	t.Run("GetAccessibleEntries combines disk and overlay directories", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{}, false /* useCaseSensitiveFileNames */)

		overlays := map[tspath.Path]*Overlay{
			tspath.Path("/src/overlay.ts"): {
				fileBase: fileBase{fileName: "/src/overlay.ts", content: "overlay content"},
			},
		}
		overlayDirectories := map[tspath.Path]map[tspath.Path]string{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/overlay.ts"): "overlay.ts",
			},
		}
		diskFiles := map[tspath.Path]*diskFile{
			tspath.Path("/src/disk.ts"): newDiskFile("/src/disk.ts", "disk content"),
		}
		diskDirectories := map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{
			tspath.Path("/"): {
				tspath.Path("/src"): "src",
			},
			tspath.Path("/src"): {
				tspath.Path("/src/disk.ts"): "disk.ts",
			},
		}

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           overlays,
			overlayDirectories: overlayDirectories,
			diskFiles:          diskFiles,
			diskDirectories:    diskDirectories,
		}

		entries := snapshot.GetAccessibleEntries("/src")

		// Should contain both disk file and overlay file (both as basenames)
		assert.Assert(t, slices.Contains(entries.Files, "disk.ts"), "should contain disk.ts")
		assert.Assert(t, slices.Contains(entries.Files, "overlay.ts"), "should contain overlay.ts")
	})
}

func TestSourceFS(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path {
		return tspath.Path(fileName)
	}

	t.Run("tracks files when tracking enabled", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		sourceFS := newSourceFS(true /* tracking */, snapshot, toPath)

		// File should not be seen yet
		assert.Assert(t, !sourceFS.Seen(tspath.Path("/src/foo.ts")))

		// Read the file
		fh := sourceFS.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)

		// Now it should be seen
		assert.Assert(t, sourceFS.Seen(tspath.Path("/src/foo.ts")))
	})

	t.Run("does not track files when tracking disabled", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		sourceFS := newSourceFS(false /* tracking */, snapshot, toPath)

		// Read the file
		fh := sourceFS.GetFile("/src/foo.ts")
		assert.Assert(t, fh != nil)

		// Should not be seen since tracking is disabled
		assert.Assert(t, !sourceFS.Seen(tspath.Path("/src/foo.ts")))
	})

	t.Run("DisableTracking stops tracking", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "content",
			"/src/bar.ts": "content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		sourceFS := newSourceFS(true /* tracking */, snapshot, toPath)

		// Read foo while tracking
		sourceFS.GetFile("/src/foo.ts")
		assert.Assert(t, sourceFS.Seen(tspath.Path("/src/foo.ts")))

		// Disable tracking
		sourceFS.DisableTracking()

		// Read bar after tracking disabled
		sourceFS.GetFile("/src/bar.ts")
		assert.Assert(t, !sourceFS.Seen(tspath.Path("/src/bar.ts")))
	})

	t.Run("FileExists returns true for files in source", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		sourceFS := newSourceFS(false /* tracking */, snapshot, toPath)

		assert.Assert(t, sourceFS.FileExists("/src/foo.ts"))
		assert.Assert(t, !sourceFS.FileExists("/src/nonexistent.ts"))
	})

	t.Run("ReadFile returns content for files in source", func(t *testing.T) {
		t.Parallel()
		testFS := vfstest.FromMap(map[string]string{
			"/src/foo.ts": "file content",
		}, false /* useCaseSensitiveFileNames */)

		snapshot := &SnapshotFS{
			toPath:             toPath,
			fs:                 testFS,
			overlays:           make(map[tspath.Path]*Overlay),
			overlayDirectories: make(map[tspath.Path]map[tspath.Path]string),
			diskFiles:          make(map[tspath.Path]*diskFile),
			diskDirectories:    make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
		}

		sourceFS := newSourceFS(false /* tracking */, snapshot, toPath)

		content, ok := sourceFS.ReadFile("/src/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, "file content")

		_, ok = sourceFS.ReadFile("/src/nonexistent.ts")
		assert.Assert(t, !ok)
	})
}

func TestAutoImportBuilderFS(t *testing.T) {
	t.Parallel()

	toPath := func(fileName string) tspath.Path {
		return tspath.Path(fileName)
	}

	// This test demonstrates that autoImportBuilderFS stores files in untrackedFiles keyed
	// by the path derived from the filename. When module resolution reads a file via its
	// symlink path, the file is cached at the symlink path key. If the file is subsequently
	// requested by its realpath (which is the typical case after module resolution resolves
	// the symlink), the cache is bypassed. If the file was deleted from disk between those
	// two operations, the realpath read fails and returns nil. This is the mechanism behind
	// the nil source file crash in aliasResolver.GetSourceFile.
	t.Run("symlink cache mismatch: file cached at symlink path, missed at realpath after deletion", func(t *testing.T) {
		t.Parallel()

		// Create a VFS with a real file and a symlinked directory pointing to it.
		// /real/pkg/index.d.ts is the real file.
		// /project/node_modules/pkg is a symlink to /real/pkg.
		testFS := vfstest.FromMap(map[string]any{
			"/real/pkg/index.d.ts":      "export declare const x: number;",
			"/project/node_modules/pkg": vfstest.Symlink("/real/pkg"),
		}, true /* useCaseSensitiveFileNames */)

		// Verify symlink works as expected
		symlinkPath := "/project/node_modules/pkg/index.d.ts"
		realpathPath := testFS.Realpath(symlinkPath)
		assert.Equal(t, realpathPath, "/real/pkg/index.d.ts", "Realpath should resolve the symlink to the real path")

		builder := newSnapshotFSBuilder(
			testFS,
			make(map[tspath.Path]*Overlay),
			make(map[tspath.Path]*Overlay),
			make(map[tspath.Path]*diskFile),
			make(map[tspath.Path]dirty.CloneableMap[tspath.Path, string]),
			lsproto.PositionEncodingKindUTF16,
			toPath,
		)

		autoImportFS := &autoImportBuilderFS{
			snapshotFSBuilder: builder,
		}

		// Step 1: Read the file via its symlink path (simulating what module resolution does
		// during FileExists). This caches the file in untrackedFiles at the symlink path key.
		fh := autoImportFS.GetFile(symlinkPath)
		assert.Assert(t, fh != nil, "File should be readable via symlink path")
		assert.Equal(t, fh.Content(), "export declare const x: number;")

		// Step 2: Simulate a file deletion from disk (e.g., npm install running concurrently).
		// This deletes both the real file and effectively breaks the symlink.
		err := testFS.Remove("/real/pkg/index.d.ts")
		assert.NilError(t, err)

		// Step 3: Request the file by its realpath (simulating what GetSourceFile does after
		// the checker resolves the module). This bypasses the symlink-path cache entry in
		// untrackedFiles because the realpath has a different key.
		fh2 := autoImportFS.GetFile(realpathPath)
		// The file was cached at the symlink path, but the realpath lookup misses the cache
		// and goes to disk where the file is now deleted. This returns nil.
		assert.Assert(t, fh2 == nil, "File should be nil when accessed by realpath after deletion from disk")
	})
}
