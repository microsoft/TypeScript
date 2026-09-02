package requestfilesystem

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/project"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/trackingvfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
)

func newRequestFileSystem(params *RequestFileSystem, base vfs.FS, currentDirectory string) (*Handle, error) {
	handle := &Handle{}
	if err := handle.initializeFromRequest(params, base, currentDirectory); err != nil {
		return nil, err
	}
	return handle, nil
}

func newLayeredRequestFileSystem(params *RequestFileSystem, base vfs.FS, currentDirectory string) (*Handle, error) {
	handle := &Handle{}
	if err := handle.initializeLayered(params, base, currentDirectory); err != nil {
		return nil, err
	}
	return handle, nil
}

func (h *Handle) applyTo(base *Handle) {
	requestFileSystemDependenciesMu.Lock()
	defer requestFileSystemDependenciesMu.Unlock()
	h.applyToLocked(base)
}

func TestInitializeForUpdate(t *testing.T) {
	t.Parallel()

	t.Run("cache layers over a host-backed snapshot", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/dir/host.ts": "host",
		}, true)
		var handle Handle
		var fileChanges project.FileChangeSummary
		err := handle.InitializeForUpdate(&RequestFileSystem{
			Kind:  KindCache,
			Files: map[string]string{"/dir/cached.ts": "cached"},
			Directories: map[string]RequestDirectoryEntries{
				"/dir": {Files: []string{"cached.ts"}, Directories: []string{}},
			},
		}, nil, host, "/", &fileChanges, true)
		assert.NilError(t, err)
		assert.DeepEqual(t, handle.GetAccessibleEntries("/dir").Files, []string{"cached.ts", "host.ts"})
	})

	t.Run("memory starts a new chain", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind:  KindMemory,
			Files: map[string]string{"/base.ts": "base"},
		}, host, "/")
		assert.NilError(t, err)

		var handle Handle
		var fileChanges project.FileChangeSummary
		err = handle.InitializeForUpdate(&RequestFileSystem{
			Kind:  KindMemory,
			Files: map[string]string{"/replacement.ts": "replacement"},
		}, base, host, "/", &fileChanges, true)
		assert.NilError(t, err)
		assert.Assert(t, handle.baseFileSystem() == host)
		assert.Assert(t, getRequestFileSystem(handle.baseFileSystem()) == nil)
	})
}

func TestRequestFileSystem(t *testing.T) {
	t.Parallel()

	t.Run("compaction preserves host fallback", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
		}, host, "/")
		assert.NilError(t, err)
		base := getRequestFileSystem(baseFS)
		assert.Assert(t, base != nil)
		assert.Assert(t, base.baseFileSystem() == host)
		assert.Assert(t, !base.FileExists("/created-after-base.ts"))
		assert.NilError(t, host.WriteFile("/created-after-base.ts", "created"))

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindCache,
			Files: map[string]string{"/layered.ts": "layered"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Assert(t, layered != nil)
		assert.Assert(t, layered.baseFileSystem() == baseFS)
		assert.Assert(t, layered.FileExists("/created-after-base.ts"))
		assert.NilError(t, host.Remove("/created-after-base.ts"))

		layered.applyTo(base)

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
			Kind: KindMemory,
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
			Kind: KindCache,
			Files: map[string]string{
				"/cached/index.ts": "cached",
			},
			Directories: map[string]RequestDirectoryEntries{
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

	t.Run("layered memory is a total replacement", func(t *testing.T) {
		t.Parallel()
		fileSystem, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
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
			Kind: KindMemory,
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
			Kind: KindCache,
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
			Kind: KindCache,
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
			Kind: KindMemory,
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
			Kind: KindCache,
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
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Files, []string{"added.ts", "becomes-file", "change.ts", "keep.ts", "remove.ts"})
		assert.DeepEqual(t, layered.GetAccessibleEntries("/").Directories, []string{"becomes-directory.ts", "removed-dir"})
	})

	t.Run("new layers override targets of inherited symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
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
			Kind: KindCache,
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
			Kind: KindMemory,
			Files: map[string]string{
				"/target/file.ts": "old",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
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

	t.Run("compaction preserves overlays addressed through inherited symlinks", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
			Files: map[string]string{
				"/target/remove.ts": "remove",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)
		base := getRequestFileSystem(baseFS)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindCache,
			Files:        map[string]string{},
			RemovedPaths: []string{"/link/remove.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)

		_, ok := layered.ReadFile("/link/remove.ts")
		assert.Assert(t, !ok)

		layered.applyTo(base)

		_, ok = layered.ReadFile("/link/remove.ts")
		assert.Assert(t, !ok)
	})

	t.Run("compaction removes tombstones from explicit listings", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
			Files: map[string]string{
				"/dir/remove.ts": "remove",
			},
			Directories: map[string]RequestDirectoryEntries{
				"/dir": {Files: []string{"remove.ts"}, Directories: []string{}},
			},
		}, host, "/")
		assert.NilError(t, err)
		base := getRequestFileSystem(baseFS)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindCache,
			Files:        map[string]string{},
			RemovedPaths: []string{"/dir/remove.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		assert.Equal(t, len(layered.GetAccessibleEntries("/dir").Files), 0)

		layered.applyTo(base)

		assert.Equal(t, len(layered.GetAccessibleEntries("/dir").Files), 0)
	})

	t.Run("compaction allows recreating a path removed through an inherited symlink", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
			Files: map[string]string{
				"/target/recreated.ts": "base",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)
		base := getRequestFileSystem(baseFS)

		removedFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:         KindCache,
			RemovedPaths: []string{"/link/recreated.ts"},
		}, baseFS, "/")
		assert.NilError(t, err)
		removed := getRequestFileSystem(removedFS)
		removed.applyTo(base)

		recreatedFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
			Files: map[string]string{
				"/link/recreated.ts": "recreated",
			},
		}, removedFS, "/")
		assert.NilError(t, err)
		recreated := getRequestFileSystem(recreatedFS)
		contents, ok := recreated.ReadFile("/link/recreated.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "recreated")

		recreated.applyTo(removed)

		contents, ok = recreated.ReadFile("/link/recreated.ts")
		assert.Assert(t, ok)
		assert.Equal(t, contents, "recreated")
	})

	t.Run("files replacing inherited symlink target directories have empty listings", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{}, true)
		base, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
			Files: map[string]string{
				"/target/item/child.ts": "child",
			},
			Symlinks: map[string]RequestSymlink{
				"/link": {Target: "/target"},
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
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
			Kind:         KindCache,
			Files:        map[string]string{},
			RemovedPaths: []string{"/remove.ts", "/removed-dir"},
		}, base, "/")
		assert.NilError(t, err)

		assert.Assert(t, !fileSystem.FileExists("/remove.ts"))
		assert.Assert(t, !fileSystem.DirectoryExists("/removed-dir"))
		assert.Assert(t, !fileSystem.FileExists("/removed-dir/gone.ts"))
		assert.Assert(t, base.SeenFiles.IsEmpty())
	})

	t.Run("compacted cache layers retain host fallback", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts":              "host",
			"/removed.ts":           "host removed",
			"/sealed/host.ts":       "hidden from listing",
			"/open/host.ts":         "host listing",
			"/open/layer-listed.ts": "host listed",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
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
		base := getRequestFileSystem(baseFS)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
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
		layered.applyTo(base)
		assert.Assert(t, getRequestFileSystem(layered.baseFileSystem()) != base)
		assert.Equal(t, layered.load().kind, KindCache)

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
		assert.DeepEqual(t, layered.GetAccessibleEntries("/open").Files, []string{"host.ts", "layer-listed.ts"})
	})

	t.Run("compacting a cache layer over memory produces memory", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		baseFS, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
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
		base := getRequestFileSystem(baseFS)

		layeredFS, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind: KindCache,
			Files: map[string]string{
				"/target/added.ts": "added",
			},
		}, baseFS, "/")
		assert.NilError(t, err)
		layered := getRequestFileSystem(layeredFS)
		layered.applyTo(base)
		assert.Equal(t, layered.load().kind, KindMemory)
		assert.Assert(t, getRequestFileSystem(layered.baseFileSystem()) != base)

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
			Kind: KindMemory,
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
			Kind: KindMemory,
			Files: map[string]string{
				"/memory.ts": "memory",
			},
		}, host, "/")
		assert.NilError(t, err)

		layered, err := newLayeredRequestFileSystem(&RequestFileSystem{
			Kind:  KindCache,
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

	t.Run("canonical path collisions are rejected", func(t *testing.T) {
		t.Parallel()
		base := vfstest.FromMap(map[string]string{}, false)

		_, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
			Files: map[string]string{
				`C:\Repo\file.ts`: "first",
				`c:/repo/file.ts`: "second",
			},
		}, base, `C:\Workspace`)
		assert.ErrorContains(t, err, "duplicate request filesystem file path")

		_, err = newRequestFileSystem(&RequestFileSystem{
			Kind:  KindMemory,
			Files: map[string]string{},
			Directories: map[string]RequestDirectoryEntries{
				`C:\Repo`:   {},
				`c:/repo/.`: {},
			},
		}, base, `C:\Workspace`)
		assert.ErrorContains(t, err, "duplicate request filesystem directory path")

		_, err = newRequestFileSystem(&RequestFileSystem{
			Kind:  KindMemory,
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
			Kind:  KindMemory,
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
			Kind: KindMemory,
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
			Kind: KindMemory,
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
			Kind: KindMemory,
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
			Kind: KindMemory,
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

	t.Run("request filesystems are immutable and cache mutations write through to the host", func(t *testing.T) {
		t.Parallel()
		host := vfstest.FromMap(map[string]string{
			"/host.ts": "host",
		}, true)
		memory, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
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
			Kind:  KindCache,
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
		fileSystem, err := newRequestFileSystem(&RequestFileSystem{
			Kind: KindMemory,
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
