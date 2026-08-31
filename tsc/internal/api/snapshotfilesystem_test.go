package api

import (
	"context"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil/projecttestutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func TestSnapshotFileSystem(t *testing.T) {
	t.Parallel()

	t.Run("memory is total and never falls back", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
			Files: map[string]string{
				"/cached/index.ts": "cached",
			},
			Directories: map[string]SnapshotDirectoryEntries{
				"/cached": {Files: []string{"index.ts"}, Directories: []string{}},
			},
		}, base, "/")
		assert.NilError(t, err)

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

	t.Run("memory resolves internal file and directory symlinks", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "export declare const value: number;",
			},
			Symlinks: map[string]SnapshotSymlink{
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "cached content",
			},
			Directories: map[string]SnapshotDirectoryEntries{
				"/project/node_modules": {Files: []string{}, Directories: []string{}},
			},
			Symlinks: map[string]SnapshotSymlink{
				"/project/node_modules/pkg": {Target: "/packages/pkg"},
			},
		}, base, "/")
		assert.NilError(t, err)

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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
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
		base, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
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

		layered, err := newLayeredSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
			Files: map[string]string{
				"/change.ts":                     "new",
				"/added.ts":                      "added",
				"/remove.ts":                     "replacement",
				"/removed-dir/replacement.ts":    "replacement",
				"/becomes-file":                  "file",
				"/becomes-directory.ts/child.ts": "child",
			},
			Directories: map[string]SnapshotDirectoryEntries{
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
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Files, []string{"added.ts", "becomes-file", "change.ts", "keep.ts", "remove.ts"})
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Directories, []string{"becomes-directory.ts", "removed-dir"})
	})

	t.Run("new layers override targets of inherited symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/target/change.ts": "old",
				"/target/remove.ts": "remove",
			},
			Symlinks: map[string]SnapshotSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
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
		assert.DeepEqual(t, layered.GetAccessibleEntries("/link").Files, []string{"added.ts", "change.ts"})
	})

	t.Run("alias tombstones take precedence over inherited symlink targets", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/target/file.ts": "old",
			},
			Symlinks: map[string]SnapshotSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
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

	t.Run("files replacing inherited symlink target directories have empty listings", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/target/item/child.ts": "child",
			},
			Symlinks: map[string]SnapshotSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindCache,
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind:         SnapshotFileSystemKindCache,
			Files:        map[string]string{},
			RemovedPaths: []string{"/remove.ts", "/removed-dir"},
		}, base, "/")
		assert.NilError(t, err)

		assert.Assert(t, !fileSystem.FileExists("/remove.ts"))
		assert.Assert(t, !fileSystem.DirectoryExists("/removed-dir"))
		assert.Assert(t, !fileSystem.FileExists("/removed-dir/gone.ts"))
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("memory routes explicit host symlinks to the host only through the link", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host/node_modules/pkg/index.d.ts": "export declare const hostValue: string;",
			"/host/outside.ts":                  "outside",
		}, true)}
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/project/index.ts": `import { hostValue } from "pkg";`,
			},
			Symlinks: map[string]SnapshotSymlink{
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

	t.Run("symlink cycles are treated as missing", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)}
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind:  SnapshotFileSystemKindMemory,
			Files: map[string]string{},
			Symlinks: map[string]SnapshotSymlink{
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/packages/pkg/index.d.ts": "export declare const value: number;",
			},
			Symlinks: map[string]SnapshotSymlink{
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"vscode-remote://ssh-remote+host/workspace/src/index.ts":      "index",
				"vscode-remote://ssh-remote+host/workspace/packages/pkg/a.ts": "package",
			},
			Symlinks: map[string]SnapshotSymlink{
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				`C:\Repo\Packages\Pkg\Index.d.ts`: "export declare const windowsValue: number;",
			},
			Directories: map[string]SnapshotDirectoryEntries{
				`C:\Repo\Project\node_modules`: {Files: []string{}, Directories: []string{"pkg"}},
			},
			Symlinks: map[string]SnapshotSymlink{
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
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"C:/Repo/target.ts": "target",
			},
			Symlinks: map[string]SnapshotSymlink{
				"C:/Repo/K": {Target: "C:/Repo/target.ts"},
			},
		}, base, "C:/Repo")
		assert.NilError(t, err)

		contents, ok := fileSystem.ReadFile("c:/repo/k")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "target")
	})

	t.Run("snapshot filesystems are immutable and cache mutations write through to the host", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		memory, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
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

		cache, err := newLayeredSnapshotFileSystem(&SnapshotFileSystem{
			Kind:  SnapshotFileSystemKindCache,
			Files: map[string]string{},
		}, memory, "/")
		assert.NilError(t, err)
		assert.NilError(t, cache.WriteFile("/written.ts", "written"))
		assert.NilError(t, cache.AppendFile("/written.ts", " appended"))
		contents, ok = host.ReadFile("/written.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "written appended")
		assert.NilError(t, cache.Remove("/written.ts"))
		assert.Assert(t, !host.FileExists("/written.ts"))
	})

	t.Run("mixed windows and posix roots support cross-root and relative symlinks", func(t *testing.T) {
		t.Parallel()
		base := &trackingvfs.FS{Inner: vfstest.FromMap(map[string]string{
			"C:/Host/node_modules/host-pkg/index.d.ts": "export declare const hostValue: boolean;",
		}, false)}
		fileSystem, err := newSnapshotFileSystem(&SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				`C:\Repo\Packages\windows-pkg\index.d.ts`: "export declare const windowsValue: number;",
				"/repo/packages/posix-pkg/index.d.ts":     "export declare const posixValue: string;",
			},
			Symlinks: map[string]SnapshotSymlink{
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

func TestUpdateSnapshotUsesMemoryFileSystem(t *testing.T) {
	t.Parallel()

	projectSession, _ := projecttestutil.Setup(map[string]any{
		"/host.ts": "host",
	})
	defer projectSession.Close()
	session := NewSession(projectSession, nil)
	defer session.Close()

	response, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		OpenProjects: []DocumentIdentifier{{FileName: "/tsconfig.json"}},
		FileSystem: &SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["src/index.ts"] }`,
				"/src/index.ts":  `export const value = "memory";`,
				"/src/other.ts":  `export const other = true;`,
			},
		},
	})
	assert.NilError(t, err)
	assert.Equal(t, len(response.Projects), 1)
	assert.Equal(t, response.Projects[0].ConfigFileName, "/tsconfig.json")

	snapshot := session.snapshots[response.Snapshot].snapshot
	contents, ok := snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "memory";`)
	_, ok = snapshot.ReadFile("/host.ts")
	assert.Assert(t, !ok)

	// Carrying the same filesystem forward without a delta must preserve
	// incremental state instead of forcing a full program rebuild.
	program := snapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram()
	unchanged, err := session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{Snapshot: response.Snapshot})
	assert.NilError(t, err)
	unchangedSnapshot := session.snapshots[unchanged.Snapshot].snapshot
	assert.Assert(t, unchangedSnapshot.ProjectCollection.GetProjectByPath(tspath.Path("/tsconfig.json")).GetProgram() == program)
	response = unchanged

	// Supplying a new filesystem replaces inherited snapshot disk caches even
	// when the caller does not redundantly list every file in FileChanges.
	response, err = session.handleUpdateSnapshot(context.Background(), &UpdateSnapshotParams{
		FileSystem: &SnapshotFileSystem{
			Kind: SnapshotFileSystemKindMemory,
			Files: map[string]string{
				"/tsconfig.json": `{ "compilerOptions": { "noLib": true }, "files": ["src/index.ts", "src/other.ts"] }`,
				"/src/index.ts":  `export const value = "updated";`,
				"/src/other.ts":  `export const other = true;`,
			},
		},
	})
	assert.NilError(t, err)
	snapshot = session.snapshots[response.Snapshot].snapshot
	contents, ok = snapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "updated";`)

	// Temporary snapshots retain the base snapshot's supplied filesystem for
	// every file other than the temporary overlay.
	temporary, err := session.handleUpdateTemporarySnapshot(context.Background(), &UpdateTemporarySnapshotParams{
		Snapshot: response.Snapshot,
		File:     DocumentIdentifier{FileName: "/src/index.ts"},
		NewText:  `export const value = "temporary";`,
	})
	assert.NilError(t, err)
	temporarySnapshot := session.snapshots[temporary.Snapshot].snapshot
	contents, ok = temporarySnapshot.ReadFile("/src/index.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const value = "temporary";`)
	contents, ok = temporarySnapshot.ReadFile("/src/other.ts")
	assert.Assert(t, ok)
	assert.Equal(t, contents, `export const other = true;`)
}
