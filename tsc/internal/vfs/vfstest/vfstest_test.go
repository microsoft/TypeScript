package vfstest

import (
	"encoding/binary"
	"io/fs"
	"math/rand/v2"
	"runtime"
	"slices"
	"sync"
	"testing"
	"testing/fstest"
	"unicode/utf16"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/vfs"
	"gotest.tools/v3/assert"
)

func TestInsensitive(t *testing.T) {
	t.Parallel()

	contents := []byte("bar")

	vfs := convertMapFS(fstest.MapFS{
		"foo/bar/baz": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"foo/bar2/baz2": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"foo/bar3/baz3": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
	}, false /*useCaseSensitiveFileNames*/)

	sensitive, err := fs.ReadFile(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.DeepEqual(t, sensitive, contents)
	sensitiveInfo, err := fs.Stat(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.Equal(t, sensitiveInfo.Sys(), 1234)
	sensitiveRealPath, err := vfs.Realpath("foo/bar/baz")
	assert.NilError(t, err)
	assert.Equal(t, sensitiveRealPath, "foo/bar/baz")
	entries, err := fs.ReadDir(vfs, "foo")
	assert.NilError(t, err)
	assert.DeepEqual(t, dirEntriesToNames(entries), []string{"bar", "bar2", "bar3"})
	_, err = vfs.Realpath("does/not/exist")
	assert.ErrorContains(t, err, "file does not exist")

	assert.NilError(t, fstest.TestFS(vfs, "foo/bar/baz"))

	insensitive, err := fs.ReadFile(vfs, "Foo/Bar/Baz")
	assert.NilError(t, err)
	assert.DeepEqual(t, insensitive, contents)
	insensitiveInfo, err := fs.Stat(vfs, "Foo/Bar/Baz")
	assert.NilError(t, err)
	assert.Equal(t, insensitiveInfo.Sys(), 1234)
	insensitiveRealPath, err := vfs.Realpath("Foo/Bar/Baz")
	assert.NilError(t, err)
	assert.Equal(t, insensitiveRealPath, "foo/bar/baz")
	entries, err = fs.ReadDir(vfs, "Foo")
	assert.NilError(t, err)
	assert.DeepEqual(t, dirEntriesToNames(entries), []string{"bar", "bar2", "bar3"})
	_, err = vfs.Realpath("Does/Not/Exist")
	assert.ErrorContains(t, err, "file does not exist")

	// assert.NilError(t, fstest.TestFS(vfs, "Foo/Bar/Baz"))
}

func TestInsensitiveUpper(t *testing.T) {
	t.Parallel()

	contents := []byte("bar")

	vfs := convertMapFS(fstest.MapFS{
		"Foo/Bar/Baz": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"Foo/Bar2/Baz2": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"Foo/Bar3/Baz3": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
	}, false /*useCaseSensitiveFileNames*/)

	sensitive, err := fs.ReadFile(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.DeepEqual(t, sensitive, contents)
	sensitiveInfo, err := fs.Stat(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.Equal(t, sensitiveInfo.Sys(), 1234)
	entries, err := fs.ReadDir(vfs, "foo")
	assert.NilError(t, err)
	assert.DeepEqual(t, dirEntriesToNames(entries), []string{"Bar", "Bar2", "Bar3"})

	// assert.NilError(t, fstest.TestFS(vfs, "foo/bar/baz"))

	insensitive, err := fs.ReadFile(vfs, "Foo/Bar/Baz")
	assert.NilError(t, err)
	assert.DeepEqual(t, insensitive, contents)
	insensitiveInfo, err := fs.Stat(vfs, "Foo/Bar/Baz")
	assert.NilError(t, err)
	assert.Equal(t, insensitiveInfo.Sys(), 1234)
	entries, err = fs.ReadDir(vfs, "Foo")
	assert.NilError(t, err)
	assert.DeepEqual(t, dirEntriesToNames(entries), []string{"Bar", "Bar2", "Bar3"})

	assert.NilError(t, fstest.TestFS(vfs, "Foo/Bar/Baz"))
}

func TestSensitive(t *testing.T) {
	t.Parallel()

	contents := []byte("bar")

	vfs := convertMapFS(fstest.MapFS{
		"foo/bar/baz": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"foo/bar2/baz2": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
		"foo/bar3/baz3": &fstest.MapFile{
			Data: contents,
			Sys:  1234,
		},
	}, true /*useCaseSensitiveFileNames*/)

	sensitive, err := fs.ReadFile(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.DeepEqual(t, sensitive, contents)
	sensitiveInfo, err := fs.Stat(vfs, "foo/bar/baz")
	assert.NilError(t, err)
	assert.Equal(t, sensitiveInfo.Sys(), 1234)

	assert.NilError(t, fstest.TestFS(vfs, "foo/bar/baz"))

	_, err = fs.ReadFile(vfs, "Foo/Bar/Baz")
	assert.ErrorContains(t, err, "file does not exist")
}

func TestSensitiveDuplicatePath(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"foo": &fstest.MapFile{
			Data: []byte("bar"),
		},
		"Foo": &fstest.MapFile{
			Data: []byte("baz"),
		},
	}

	testutil.AssertPanics(t, func() {
		convertMapFS(testfs, false /*useCaseSensitiveFileNames*/)
	}, `duplicate path: "Foo" and "foo" have the same canonical path`)
}

func TestInsensitiveDuplicatePath(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"foo": &fstest.MapFile{
			Data: []byte("bar"),
		},
		"Foo": &fstest.MapFile{
			Data: []byte("baz"),
		},
	}

	convertMapFS(testfs, true /*useCaseSensitiveFileNames*/)
}

func dirEntriesToNames(entries []fs.DirEntry) []string {
	names := make([]string, len(entries))
	for i, entry := range entries {
		names[i] = entry.Name()
	}
	return names
}

func TestWritableFS(t *testing.T) {
	t.Parallel()

	fs := FromMap[any](nil, false)

	err := fs.WriteFile("/foo/bar/baz", "hello, world", false)
	assert.NilError(t, err)

	content, ok := fs.ReadFile("/foo/bar/baz")
	assert.Assert(t, ok)
	assert.Equal(t, content, "hello, world")

	err = fs.WriteFile("/foo/bar/baz", "goodbye, world", false)
	assert.NilError(t, err)

	content, ok = fs.ReadFile("/foo/bar/baz")
	assert.Assert(t, ok)
	assert.Equal(t, content, "goodbye, world")

	err = fs.WriteFile("/foo/bar/baz/oops", "goodbye, world", false)
	assert.ErrorContains(t, err, `mkdir "foo/bar/baz": path exists but is not a directory`)
}

func TestStress(t *testing.T) {
	t.Parallel()

	fs := FromMap[any](nil, false)

	ops := []func(){
		func() { _ = fs.WriteFile("/foo/bar/baz.txt", "hello, world", false) },
		func() { fs.ReadFile("/foo/bar/baz.txt") },
		func() { fs.DirectoryExists("/foo/bar") },
		func() { fs.FileExists("/foo/bar") },
		func() { fs.FileExists("/foo/bar/baz.txt") },
		func() { fs.GetAccessibleEntries("/foo/bar") },
		func() { fs.Realpath("/foo/bar/baz.txt") },
		func() {
			_ = fs.WalkDir("/", func(path string, d vfs.DirEntry, err error) error {
				if err != nil {
					return err
				}
				_, err = d.Info()
				return err
			})
		},
	}

	var wg sync.WaitGroup
	for range runtime.GOMAXPROCS(0) {
		wg.Add(1)
		go func() {
			defer wg.Done()

			randomOps := slices.Clone(ops)
			rand.Shuffle(len(randomOps), func(i, j int) {
				randomOps[i], randomOps[j] = randomOps[j], randomOps[i]
			})

			for i := range 10000 {
				randomOps[i%len(randomOps)]()
			}
		}()
	}
}

func TestParentDirFile(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"foo": &fstest.MapFile{
			Data: []byte("bar"),
		},
		"foo/oops": &fstest.MapFile{
			Data: []byte("baz"),
		},
	}

	testutil.AssertPanics(t, func() {
		convertMapFS(testfs, false /*useCaseSensitiveFileNames*/)
	}, `failed to create intermediate directories for "foo/oops": mkdir "foo": path exists but is not a directory`)
}

func TestFromMap(t *testing.T) {
	t.Parallel()

	t.Run("POSIX", func(t *testing.T) {
		t.Parallel()

		fs := FromMap(map[string]any{
			"/string": "hello, world",
			"/bytes":  []byte("hello, world"),
			"/mapfile": &fstest.MapFile{
				Data: []byte("hello, world"),
			},
		}, false)

		content, ok := fs.ReadFile("/string")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("/bytes")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("/mapfile")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")
	})

	t.Run("Windows", func(t *testing.T) {
		t.Parallel()

		fs := FromMap(map[string]any{
			"c:/string": "hello, world",
			"d:/bytes":  []byte("hello, world"),
			"e:/mapfile": &fstest.MapFile{
				Data: []byte("hello, world"),
			},
		}, false)

		content, ok := fs.ReadFile("c:/string")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("d:/bytes")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("e:/mapfile")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")
	})

	t.Run("Mixed", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() {
			FromMap(map[string]any{
				"/string":  "hello, world",
				"c:/bytes": []byte("hello, world"),
			}, false)
		}, `mixed posix and windows paths`)
	})

	t.Run("NonRooted", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() {
			FromMap(map[string]any{
				"string": "hello, world",
			}, false)
		}, `non-rooted path "string"`)
	})

	t.Run("NonNormalized", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() {
			FromMap(map[string]any{
				"/string/": "hello, world",
			}, false)
		}, `non-normalized path "/string/"`)
	})

	t.Run("NonNormalized2", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() {
			FromMap(map[string]any{
				"/string/../foo": "hello, world",
			}, false)
		}, `non-normalized path "/string/../foo"`)
	})

	t.Run("InvalidFile", func(t *testing.T) {
		t.Parallel()

		testutil.AssertPanics(t, func() {
			FromMap(map[string]any{
				"/string": 1234,
			}, false)
		}, `invalid file type int`)
	})
}

func TestVFSTestMapFS(t *testing.T) {
	t.Parallel()

	fs := FromMap(map[string]string{
		"/foo.ts":        "hello, world",
		"/dir1/file1.ts": "export const foo = 42;",
		"/dir1/file2.ts": "export const foo = 42;",
		"/dir2/file1.ts": "export const foo = 42;",
	}, false /*useCaseSensitiveFileNames*/)

	t.Run("ReadFile", func(t *testing.T) {
		t.Parallel()

		content, ok := fs.ReadFile("/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("/does/not/exist.ts")
		assert.Assert(t, !ok)
		assert.Equal(t, content, "")
	})

	t.Run("Realpath", func(t *testing.T) {
		t.Parallel()

		realpath := fs.Realpath("/foo.ts")
		assert.Equal(t, realpath, "/foo.ts")

		realpath = fs.Realpath("/Foo.ts")
		assert.Equal(t, realpath, "/foo.ts")

		realpath = fs.Realpath("/does/not/exist.ts")
		assert.Equal(t, realpath, "/does/not/exist.ts")
	})

	t.Run("UseCaseSensitiveFileNames", func(t *testing.T) {
		t.Parallel()

		assert.Assert(t, !fs.UseCaseSensitiveFileNames())
	})
}

func TestVFSTestMapFSWindows(t *testing.T) {
	t.Parallel()

	fs := FromMap(map[string]string{
		"c:/foo.ts":        "hello, world",
		"c:/dir1/file1.ts": "export const foo = 42;",
		"c:/dir1/file2.ts": "export const foo = 42;",
		"c:/dir2/file1.ts": "export const foo = 42;",
	}, false)

	t.Run("ReadFile", func(t *testing.T) {
		t.Parallel()

		content, ok := fs.ReadFile("c:/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, "hello, world")

		content, ok = fs.ReadFile("c:/does/not/exist.ts")
		assert.Assert(t, !ok)
		assert.Equal(t, content, "")
	})

	t.Run("Realpath", func(t *testing.T) {
		t.Parallel()

		realpath := fs.Realpath("c:/foo.ts")
		assert.Equal(t, realpath, "c:/foo.ts")

		realpath = fs.Realpath("c:/Foo.ts")
		assert.Equal(t, realpath, "c:/foo.ts")

		realpath = fs.Realpath("c:/does/not/exist.ts")
		assert.Equal(t, realpath, "c:/does/not/exist.ts")
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

			fs := FromMap(map[string][]byte{
				"/foo.ts": buf,
			}, true)

			content, ok := fs.ReadFile("/foo.ts")
			assert.Assert(t, ok)
			assert.Equal(t, content, expected)
		})
	}

	t.Run("UTF8", func(t *testing.T) {
		t.Parallel()

		fs := FromMap(map[string][]byte{
			"/foo.ts": []byte("\xEF\xBB\xBF" + expected),
		}, true)

		content, ok := fs.ReadFile("/foo.ts")
		assert.Assert(t, ok)
		assert.Equal(t, content, expected)
	})
}
