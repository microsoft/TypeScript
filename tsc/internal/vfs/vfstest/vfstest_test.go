package vfstest

import (
	"io/fs"
	"math/rand/v2"
	"runtime"
	"slices"
	"sync"
	"testing"
	"testing/fstest"

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

func TestFromMapFS(t *testing.T) {
	t.Parallel()

	testfs := fstest.MapFS{
		"foo/bar/baz": &fstest.MapFile{
			Data: []byte("hello, world"),
		},
	}

	fs := FromMapFS(testfs, false)

	content, ok := fs.ReadFile("/foo/bar/baz")
	assert.Assert(t, ok)
	assert.Equal(t, content, "hello, world")

	content, ok = fs.ReadFile("/FOO/bar/baZ")
	assert.Assert(t, ok)
	assert.Equal(t, content, "hello, world")

	content, ok = fs.ReadFile("/does/not/exist")
	assert.Assert(t, !ok)
	assert.Equal(t, content, "")
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

	testfs := fstest.MapFS{}

	fs := FromMapFS(testfs, false)

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

	testfs := fstest.MapFS{}

	fs := FromMapFS(testfs, false)

	ops := []func(){
		func() { _ = fs.WriteFile("/foo/bar/baz.txt", "hello, world", false) },
		func() { fs.ReadFile("/foo/bar/baz.txt") },
		func() { fs.DirectoryExists("/foo/bar") },
		func() { fs.FileExists("/foo/bar") },
		func() { fs.FileExists("/foo/bar/baz.txt") },
		func() { fs.GetDirectories("/foo/bar") },
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
