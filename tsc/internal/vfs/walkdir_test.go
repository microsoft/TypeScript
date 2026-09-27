package vfs_test

import (
	"io/fs"
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfstest"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/wrapvfs"
	"gotest.tools/v3/assert"
)

func TestWalkDir(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/root/a.ts":           "",
		"/root/dir/b.ts":       "",
		"/root/link/hidden.ts": "",
		"/target/hidden.ts":    "",
	}, true)
	fileSystem := wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path string) vfs.Entries {
			entries := base.GetAccessibleEntries(path)
			entries.Symlinks = nil
			if path == "/root" {
				entries.Files = append(entries.Files, "C:/foreign.ts")
			}
			return entries
		},
		Realpath: func(path string) string {
			switch path {
			case "/root/link":
				return "/target"
			case "/root/link/hidden.ts":
				return "/target/hidden.ts"
			default:
				return path
			}
		},
	})

	var paths []string
	var modes []fs.FileMode
	err := vfs.WalkDir(fileSystem, "/root", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		paths = append(paths, path)
		modes = append(modes, entry.Type())
		if entry.Type()&fs.ModeSymlink != 0 {
			info, err := entry.Info()
			assert.NilError(t, err)
			assert.Equal(t, info.Mode(), fs.ModeSymlink)
			assert.Assert(t, !info.IsDir())
		}
		return nil
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, paths, []string{"/root", "/root/a.ts", "/root/dir", "/root/dir/b.ts", "/root/link"})
	assert.DeepEqual(t, modes, []fs.FileMode{fs.ModeDir, 0, fs.ModeDir, 0, fs.ModeSymlink})
}

func TestWalkDirDoesNotFollowRootSymlink(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/root/link/hidden.ts": "",
		"/target/hidden.ts":    "",
	}, true)
	fileSystem := wrapvfs.Wrap(base, wrapvfs.Replacements{
		GetAccessibleEntries: func(path string) vfs.Entries {
			entries := base.GetAccessibleEntries(path)
			entries.Symlinks = nil
			return entries
		},
		Realpath: func(path string) string {
			if path == "/root/link" {
				return "/target"
			}
			return path
		},
	})

	var paths []string
	err := vfs.WalkDir(fileSystem, "/root/link", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		paths = append(paths, path)
		assert.Equal(t, entry.Type(), fs.ModeSymlink)
		return nil
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, paths, []string{"/root/link"})
}

func TestWalkDirReportsRootFileSymlink(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/target/file.ts": "",
	}, true)
	fileSystem := wrapvfs.Wrap(base, wrapvfs.Replacements{
		Stat: func(path string) vfs.FileInfo {
			if path == "/root/link.ts" {
				return base.Stat("/target/file.ts")
			}
			return base.Stat(path)
		},
		Realpath: func(path string) string {
			if path == "/root/link.ts" {
				return "/target/file.ts"
			}
			return path
		},
	})

	err := vfs.WalkDir(fileSystem, "/root/link.ts", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		assert.Equal(t, path, "/root/link.ts")
		assert.Equal(t, entry.Name(), "link.ts")
		assert.Equal(t, entry.Type(), fs.ModeSymlink)
		return nil
	})
	assert.NilError(t, err)
}

func TestWalkDirSkipDir(t *testing.T) {
	t.Parallel()

	fileSystem := vfstest.FromMap(map[string]string{
		"/root/a/hidden.ts": "",
		"/root/b.ts":        "",
	}, true)
	var paths []string
	err := vfs.WalkDir(fileSystem, "/root", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		paths = append(paths, path)
		if path == "/root/a" {
			return fs.SkipDir
		}
		return nil
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, paths, []string{"/root", "/root/a", "/root/b.ts"})
}

func TestWalkDirSkipAll(t *testing.T) {
	t.Parallel()

	fileSystem := vfstest.FromMap(map[string]string{
		"/root/a.ts": "",
		"/root/b.ts": "",
	}, true)
	var paths []string
	err := vfs.WalkDir(fileSystem, "/root", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		paths = append(paths, path)
		if path == "/root/a.ts" {
			return fs.SkipAll
		}
		return nil
	})
	assert.NilError(t, err)
	assert.DeepEqual(t, paths, []string{"/root", "/root/a.ts"})
}

func TestWalkDirConsumesSkipDirForRootFile(t *testing.T) {
	t.Parallel()

	fileSystem := vfstest.FromMap(map[string]string{"/root.ts": ""}, true)
	err := vfs.WalkDir(fileSystem, "/root.ts", func(path string, entry fs.DirEntry, err error) error {
		assert.NilError(t, err)
		return fs.SkipDir
	})
	assert.NilError(t, err)
}

func TestWalkDirConsumesSkipForMissingRoot(t *testing.T) {
	t.Parallel()

	fileSystem := vfstest.FromMap(map[string]string{}, true)
	for _, sentinel := range []error{fs.SkipDir, fs.SkipAll} {
		err := vfs.WalkDir(fileSystem, "/missing", func(path string, entry fs.DirEntry, err error) error {
			assert.ErrorIs(t, err, fs.ErrNotExist)
			return sentinel
		})
		assert.NilError(t, err)
	}
}

func TestWalkDirUsesSymlinkMetadataWithoutRealpathCalls(t *testing.T) {
	t.Parallel()

	base := vfstest.FromMap(map[string]string{
		"/root/dir/file.ts": "",
	}, true)
	var realpathCalls []string
	fileSystem := wrapvfs.Wrap(base, wrapvfs.Replacements{
		Realpath: func(path string) string {
			realpathCalls = append(realpathCalls, path)
			return path
		},
	})

	err := vfs.WalkDir(fileSystem, "/root", func(path string, entry fs.DirEntry, err error) error {
		return err
	})
	assert.NilError(t, err)
	assert.Assert(t, !slices.Contains(realpathCalls, "/root/dir"))
}
