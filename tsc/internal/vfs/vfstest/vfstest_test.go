package vfstest

import (
	"io/fs"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/testutil"
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
