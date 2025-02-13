package iovfs_test

import (
	"slices"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
	"gotest.tools/v3/assert"
)

func TestIOFS(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"foo.ts": &fstest.MapFile{
			Data: []byte("hello, world"),
		},
		"dir1/file1.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
		"dir1/file2.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
		"dir2/file1.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
	}

	fs := iovfs.From(testfs, true)

	t.Run("ReadFile", func(t *testing.T) {
		t.Parallel()

		content, ok := fs.ReadFile("/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("/does/not/exist.ts")
		assert.Assert(t, !ok)
		assert.Equal(t, content, "")
	})

	t.Run("ReadFileUnrooted", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() { fs.ReadFile("bar") }, `vfs: path "bar" is not absolute`)
	})

	t.Run("FileExists", func(t *testing.T) {
		t.Parallel()

		assert.Assert(t, fs.FileExists("/foo.ts"))
		assert.Assert(t, !fs.FileExists("/bar"))
	})

	t.Run("DirectoryExists", func(t *testing.T) {
		t.Parallel()

		assert.Assert(t, fs.DirectoryExists("/"))
		assert.Assert(t, fs.DirectoryExists("/dir1"))
		assert.Assert(t, fs.DirectoryExists("/dir1/"))
		assert.Assert(t, fs.DirectoryExists("/dir1/./"))
		assert.Assert(t, !fs.DirectoryExists("/bar"))
	})

	t.Run("GetDirectories", func(t *testing.T) {
		t.Parallel()

		dirs := fs.GetDirectories("/")
		slices.Sort(dirs)

		assert.DeepEqual(t, dirs, []string{"dir1", "dir2"})
	})

	t.Run("WalkDir", func(t *testing.T) {
		t.Parallel()

		var files []string
		err := fs.WalkDir("/", func(path string, d vfs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if !d.IsDir() {
				files = append(files, path)
			}
			return nil
		})
		assert.NilError(t, err)

		slices.Sort(files)

		assert.DeepEqual(t, files, []string{"/dir1/file1.ts", "/dir1/file2.ts", "/dir2/file1.ts", "/foo.ts"})
	})

	t.Run("WalkDirSkip", func(t *testing.T) {
		t.Parallel()

		var files []string
		err := fs.WalkDir("/", func(path string, d vfs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if !d.IsDir() {
				files = append(files, path)
			}

			if path == "/" {
				return nil
			}

			return vfs.SkipDir
		})
		assert.NilError(t, err)

		slices.Sort(files)

		assert.DeepEqual(t, files, []string{"/foo.ts"})
	})

	t.Run("Realpath", func(t *testing.T) {
		t.Parallel()

		realpath := fs.Realpath("/foo.ts")
		assert.Equal(t, realpath, "/foo.ts")
	})

	t.Run("UseCaseSensitiveFileNames", func(t *testing.T) {
		t.Parallel()

		assert.Assert(t, fs.UseCaseSensitiveFileNames())
	})
}
