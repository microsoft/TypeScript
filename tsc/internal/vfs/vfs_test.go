package vfs_test

import (
	"encoding/binary"
	"os"
	"path/filepath"
	"slices"
	"testing"
	"testing/fstest"
	"unicode/utf16"

	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
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

	fs := vfs.FromIOFS(true, testfs)

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
}

func TestIOFSWindows(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"c:/foo.ts": &fstest.MapFile{
			Data: []byte("hello, world"),
		},
		"c:/dir1/file1.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
		"c:/dir1/file2.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
		"c:/dir2/file1.ts": &fstest.MapFile{
			Data: []byte("export const foo = 42;"),
		},
	}

	fs := vfs.FromIOFS(true, testfs)

	t.Run("ReadFile", func(t *testing.T) {
		t.Parallel()

		content, ok := fs.ReadFile("c:/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("c:/does/not/exist.ts")
		assert.Assert(t, !ok)
		assert.Equal(t, content, "")
	})
}

func TestOS(t *testing.T) {
	t.Parallel()

	fs := vfs.FromOS()

	goMod := filepath.Join(repo.RootPath, "go.mod")
	goModPath := tspath.NormalizePath(goMod)

	t.Run("ReadFile", func(t *testing.T) {
		t.Parallel()

		expectedRaw, err := os.ReadFile(goMod)
		assert.NilError(t, err)
		expected := string(expectedRaw)

		contents, ok := fs.ReadFile(goModPath)
		assert.Assert(t, ok)
		assert.Equal(t, contents, expected)
	})

	t.Run("Realpath", func(t *testing.T) {
		t.Parallel()

		realpath := fs.Realpath(goModPath)
		assert.Equal(t, realpath, goModPath)
	})
}

func TestBOM(t *testing.T) {
	t.Parallel()

	const expected = "hello, world"

	tests := []struct {
		name  string
		order binary.ByteOrder
		bom   [2]byte
	}{
		{"BigEndian", binary.BigEndian, [2]byte{0xFE, 0xFF}},
		{"LittleEndian", binary.LittleEndian, [2]byte{0xFF, 0xFE}},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			var codePoints []uint16

			for _, r := range expected {
				codePoints = utf16.AppendRune(codePoints, r)
			}

			buf := tt.bom[:]

			for _, r := range codePoints {
				var err error
				buf, err = binary.Append(buf, tt.order, r)
				assert.NilError(t, err)
			}

			testfs := fstest.MapFS{
				"foo.ts": &fstest.MapFile{
					Data: buf,
				},
			}

			fs := vfs.FromIOFS(true, testfs)

			content, ok := fs.ReadFile("/foo.ts")
			assert.Assert(t, ok)
			assert.Equal(t, content, expected)
		})
	}

	t.Run("UTF8", func(t *testing.T) {
		t.Parallel()

		testfs := fstest.MapFS{
			"foo.ts": &fstest.MapFile{
				Data: []byte("\xEF\xBB\xBF" + expected),
			},
		}

		fs := vfs.FromIOFS(true, testfs)

		content, ok := fs.ReadFile("/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, expected)
	})
}
