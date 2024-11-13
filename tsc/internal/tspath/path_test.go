package tspath

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestNormalizeSlashes(t *testing.T) {
	assert.Equal(t, NormalizeSlashes("a"), "a")
	assert.Equal(t, NormalizeSlashes("a/b"), "a/b")
	assert.Equal(t, NormalizeSlashes("a\\b"), "a/b")
	assert.Equal(t, NormalizeSlashes("\\\\server\\path"), "//server/path")
}

func TestGetRootLength(t *testing.T) {
	assert.Equal(t, getRootLength("a"), 0)
	assert.Equal(t, getRootLength("/"), 1)
	assert.Equal(t, getRootLength("/path"), 1)
	assert.Equal(t, getRootLength("c:"), 2)
	assert.Equal(t, getRootLength("c:d"), 0)
	assert.Equal(t, getRootLength("c:/"), 3)
	assert.Equal(t, getRootLength("c:\\"), 3)
	assert.Equal(t, getRootLength("//server"), 8)
	assert.Equal(t, getRootLength("//server/share"), 9)
	assert.Equal(t, getRootLength("\\\\server"), 8)
	assert.Equal(t, getRootLength("\\\\server\\share"), 9)
	assert.Equal(t, getRootLength("file:///"), 8)
	assert.Equal(t, getRootLength("file:///path"), 8)
	assert.Equal(t, getRootLength("file:///c:"), 10)
	assert.Equal(t, getRootLength("file:///c:d"), 8)
	assert.Equal(t, getRootLength("file:///c:/path"), 11)
	assert.Equal(t, getRootLength("file:///c%3a"), 12)
	assert.Equal(t, getRootLength("file:///c%3ad"), 8)
	assert.Equal(t, getRootLength("file:///c%3a/path"), 13)
	assert.Equal(t, getRootLength("file:///c%3A"), 12)
	assert.Equal(t, getRootLength("file:///c%3Ad"), 8)
	assert.Equal(t, getRootLength("file:///c%3A/path"), 13)
	assert.Equal(t, getRootLength("file://localhost"), 16)
	assert.Equal(t, getRootLength("file://localhost/"), 17)
	assert.Equal(t, getRootLength("file://localhost/path"), 17)
	assert.Equal(t, getRootLength("file://localhost/c:"), 19)
	assert.Equal(t, getRootLength("file://localhost/c:d"), 17)
	assert.Equal(t, getRootLength("file://localhost/c:/path"), 20)
	assert.Equal(t, getRootLength("file://localhost/c%3a"), 21)
	assert.Equal(t, getRootLength("file://localhost/c%3ad"), 17)
	assert.Equal(t, getRootLength("file://localhost/c%3a/path"), 22)
	assert.Equal(t, getRootLength("file://localhost/c%3A"), 21)
	assert.Equal(t, getRootLength("file://localhost/c%3Ad"), 17)
	assert.Equal(t, getRootLength("file://localhost/c%3A/path"), 22)
	assert.Equal(t, getRootLength("file://server"), 13)
	assert.Equal(t, getRootLength("file://server/"), 14)
	assert.Equal(t, getRootLength("file://server/path"), 14)
	assert.Equal(t, getRootLength("file://server/c:"), 14)
	assert.Equal(t, getRootLength("file://server/c:d"), 14)
	assert.Equal(t, getRootLength("file://server/c:/d"), 14)
	assert.Equal(t, getRootLength("file://server/c%3a"), 14)
	assert.Equal(t, getRootLength("file://server/c%3ad"), 14)
	assert.Equal(t, getRootLength("file://server/c%3a/d"), 14)
	assert.Equal(t, getRootLength("file://server/c%3A"), 14)
	assert.Equal(t, getRootLength("file://server/c%3Ad"), 14)
	assert.Equal(t, getRootLength("file://server/c%3A/d"), 14)
	assert.Equal(t, getRootLength("http://server"), 13)
	assert.Equal(t, getRootLength("http://server/path"), 14)
}

func TestPathIsAbsolute(t *testing.T) {
	// POSIX
	assert.Equal(t, PathIsAbsolute("/path/to/file.ext"), true)
	// DOS
	assert.Equal(t, PathIsAbsolute("c:/path/to/file.ext"), true)
	// URL
	assert.Equal(t, PathIsAbsolute("file:///path/to/file.ext"), true)
	// Non-absolute
	assert.Equal(t, PathIsAbsolute("path/to/file.ext"), false)
	assert.Equal(t, PathIsAbsolute("./path/to/file.ext"), false)
}

func TestIsUrl(t *testing.T) {
	assert.Equal(t, isUrl("a"), false)
	assert.Equal(t, isUrl("/"), false)
	assert.Equal(t, isUrl("c:"), false)
	assert.Equal(t, isUrl("c:d"), false)
	assert.Equal(t, isUrl("c:/"), false)
	assert.Equal(t, isUrl("c:\\"), false)
	assert.Equal(t, isUrl("//server"), false)
	assert.Equal(t, isUrl("//server/share"), false)
	assert.Equal(t, isUrl("\\\\server"), false)
	assert.Equal(t, isUrl("\\\\server\\share"), false)

	assert.Equal(t, isUrl("file:///path"), true)
	assert.Equal(t, isUrl("file:///c:"), true)
	assert.Equal(t, isUrl("file:///c:d"), true)
	assert.Equal(t, isUrl("file:///c:/path"), true)
	assert.Equal(t, isUrl("file://server"), true)
	assert.Equal(t, isUrl("file://server/path"), true)
	assert.Equal(t, isUrl("http://server"), true)
	assert.Equal(t, isUrl("http://server/path"), true)
}

func TestIsRootedDiskPath(t *testing.T) {
	assert.Equal(t, IsRootedDiskPath("a"), false)
	assert.Equal(t, IsRootedDiskPath("/"), true)
	assert.Equal(t, IsRootedDiskPath("c:"), true)
	assert.Equal(t, IsRootedDiskPath("c:d"), false)
	assert.Equal(t, IsRootedDiskPath("c:/"), true)
	assert.Equal(t, IsRootedDiskPath("c:\\"), true)
	assert.Equal(t, IsRootedDiskPath("//server"), true)
	assert.Equal(t, IsRootedDiskPath("//server/share"), true)
	assert.Equal(t, IsRootedDiskPath("\\\\server"), true)
	assert.Equal(t, IsRootedDiskPath("\\\\server\\share"), true)
	assert.Equal(t, IsRootedDiskPath("file:///path"), false)
	assert.Equal(t, IsRootedDiskPath("file:///c:"), false)
	assert.Equal(t, IsRootedDiskPath("file:///c:d"), false)
	assert.Equal(t, IsRootedDiskPath("file:///c:/path"), false)
	assert.Equal(t, IsRootedDiskPath("file://server"), false)
	assert.Equal(t, IsRootedDiskPath("file://server/path"), false)
	assert.Equal(t, IsRootedDiskPath("http://server"), false)
	assert.Equal(t, IsRootedDiskPath("http://server/path"), false)
}

func TestGetDirectoryPath(t *testing.T) {
	assert.Equal(t, GetDirectoryPath(""), "")
	assert.Equal(t, GetDirectoryPath("a"), "")
	assert.Equal(t, GetDirectoryPath("a/b"), "a")
	assert.Equal(t, GetDirectoryPath("/"), "/")
	assert.Equal(t, GetDirectoryPath("/a"), "/")
	assert.Equal(t, GetDirectoryPath("/a/"), "/")
	assert.Equal(t, GetDirectoryPath("/a/b"), "/a")
	assert.Equal(t, GetDirectoryPath("/a/b/"), "/a")
	assert.Equal(t, GetDirectoryPath("c:"), "c:")
	assert.Equal(t, GetDirectoryPath("c:d"), "")
	assert.Equal(t, GetDirectoryPath("c:/"), "c:/")
	assert.Equal(t, GetDirectoryPath("c:/path"), "c:/")
	assert.Equal(t, GetDirectoryPath("c:/path/"), "c:/")
	assert.Equal(t, GetDirectoryPath("//server"), "//server")
	assert.Equal(t, GetDirectoryPath("//server/"), "//server/")
	assert.Equal(t, GetDirectoryPath("//server/share"), "//server/")
	assert.Equal(t, GetDirectoryPath("//server/share/"), "//server/")
	assert.Equal(t, GetDirectoryPath("\\\\server"), "//server")
	assert.Equal(t, GetDirectoryPath("\\\\server\\"), "//server/")
	assert.Equal(t, GetDirectoryPath("\\\\server\\share"), "//server/")
	assert.Equal(t, GetDirectoryPath("\\\\server\\share\\"), "//server/")
	assert.Equal(t, GetDirectoryPath("file:///"), "file:///")
	assert.Equal(t, GetDirectoryPath("file:///path"), "file:///")
	assert.Equal(t, GetDirectoryPath("file:///path/"), "file:///")
	assert.Equal(t, GetDirectoryPath("file:///c:"), "file:///c:")
	assert.Equal(t, GetDirectoryPath("file:///c:d"), "file:///")
	assert.Equal(t, GetDirectoryPath("file:///c:/"), "file:///c:/")
	assert.Equal(t, GetDirectoryPath("file:///c:/path"), "file:///c:/")
	assert.Equal(t, GetDirectoryPath("file:///c:/path/"), "file:///c:/")
	assert.Equal(t, GetDirectoryPath("file://server"), "file://server")
	assert.Equal(t, GetDirectoryPath("file://server/"), "file://server/")
	assert.Equal(t, GetDirectoryPath("file://server/path"), "file://server/")
	assert.Equal(t, GetDirectoryPath("file://server/path/"), "file://server/")
	assert.Equal(t, GetDirectoryPath("http://server"), "http://server")
	assert.Equal(t, GetDirectoryPath("http://server/"), "http://server/")
	assert.Equal(t, GetDirectoryPath("http://server/path"), "http://server/")
	assert.Equal(t, GetDirectoryPath("http://server/path/"), "http://server/")
}

// !!!
// getBaseFileName
// getAnyExtensionFromPath

func TestGetPathComponents(t *testing.T) {
	assert.DeepEqual(t, getPathComponents("", ""), []string{""})
	assert.DeepEqual(t, getPathComponents("a", ""), []string{"", "a"})
	assert.DeepEqual(t, getPathComponents("./a", ""), []string{"", ".", "a"})
	assert.DeepEqual(t, getPathComponents("/", ""), []string{"/"})
	assert.DeepEqual(t, getPathComponents("/a", ""), []string{"/", "a"})
	assert.DeepEqual(t, getPathComponents("/a/", ""), []string{"/", "a"})
	assert.DeepEqual(t, getPathComponents("c:", ""), []string{"c:"})
	assert.DeepEqual(t, getPathComponents("c:d", ""), []string{"", "c:d"})
	assert.DeepEqual(t, getPathComponents("c:/", ""), []string{"c:/"})
	assert.DeepEqual(t, getPathComponents("c:/path", ""), []string{"c:/", "path"})
	assert.DeepEqual(t, getPathComponents("//server", ""), []string{"//server"})
	assert.DeepEqual(t, getPathComponents("//server/", ""), []string{"//server/"})
	assert.DeepEqual(t, getPathComponents("//server/share", ""), []string{"//server/", "share"})
	assert.DeepEqual(t, getPathComponents("file:///", ""), []string{"file:///"})
	assert.DeepEqual(t, getPathComponents("file:///path", ""), []string{"file:///", "path"})
	assert.DeepEqual(t, getPathComponents("file:///c:", ""), []string{"file:///c:"})
	assert.DeepEqual(t, getPathComponents("file:///c:d", ""), []string{"file:///", "c:d"})
	assert.DeepEqual(t, getPathComponents("file:///c:/", ""), []string{"file:///c:/"})
	assert.DeepEqual(t, getPathComponents("file:///c:/path", ""), []string{"file:///c:/", "path"})
	assert.DeepEqual(t, getPathComponents("file://server", ""), []string{"file://server"})
	assert.DeepEqual(t, getPathComponents("file://server/", ""), []string{"file://server/"})
	assert.DeepEqual(t, getPathComponents("file://server/path", ""), []string{"file://server/", "path"})
	assert.DeepEqual(t, getPathComponents("http://server", ""), []string{"http://server"})
	assert.DeepEqual(t, getPathComponents("http://server/", ""), []string{"http://server/"})
	assert.DeepEqual(t, getPathComponents("http://server/path", ""), []string{"http://server/", "path"})
}

func TestReducePathComponents(t *testing.T) {
	assert.DeepEqual(t, reducePathComponents([]string{""}), []string{""})
	assert.DeepEqual(t, reducePathComponents([]string{"", "."}), []string{""})
	assert.DeepEqual(t, reducePathComponents([]string{"", ".", "a"}), []string{"", "a"})
	assert.DeepEqual(t, reducePathComponents([]string{"", "a", "."}), []string{"", "a"})
	assert.DeepEqual(t, reducePathComponents([]string{"", ".."}), []string{"", ".."})
	assert.DeepEqual(t, reducePathComponents([]string{"", "..", ".."}), []string{"", "..", ".."})
	assert.DeepEqual(t, reducePathComponents([]string{"", "..", ".", ".."}), []string{"", "..", ".."})
	assert.DeepEqual(t, reducePathComponents([]string{"", "a", ".."}), []string{""})
	assert.DeepEqual(t, reducePathComponents([]string{"", "..", "a"}), []string{"", "..", "a"})
	assert.DeepEqual(t, reducePathComponents([]string{"/"}), []string{"/"})
	assert.DeepEqual(t, reducePathComponents([]string{"/", "."}), []string{"/"})
	assert.DeepEqual(t, reducePathComponents([]string{"/", ".."}), []string{"/"})
	assert.DeepEqual(t, reducePathComponents([]string{"/", "a", ".."}), []string{"/"})
}

func TestCombinePaths(t *testing.T) {
	// Non-rooted
	assert.Equal(t, combinePaths("path", "to", "file.ext"), "path/to/file.ext")
	assert.Equal(t, combinePaths("path", "dir", "..", "to", "file.ext"), "path/dir/../to/file.ext")
	// POSIX
	assert.Equal(t, combinePaths("/path", "to", "file.ext"), "/path/to/file.ext")
	assert.Equal(t, combinePaths("/path", "/to", "file.ext"), "/to/file.ext")
	// DOS
	assert.Equal(t, combinePaths("c:/path", "to", "file.ext"), "c:/path/to/file.ext")
	assert.Equal(t, combinePaths("c:/path", "c:/to", "file.ext"), "c:/to/file.ext")
	// URL
	assert.Equal(t, combinePaths("file:///path", "to", "file.ext"), "file:///path/to/file.ext")
	assert.Equal(t, combinePaths("file:///path", "file:///to", "file.ext"), "file:///to/file.ext")

	assert.Equal(t, combinePaths("/", "/node_modules/@types"), "/node_modules/@types")
	assert.Equal(t, combinePaths("/a/..", ""), "/a/..")
	assert.Equal(t, combinePaths("/a/..", "b"), "/a/../b")
	assert.Equal(t, combinePaths("/a/..", "b/"), "/a/../b/")
	assert.Equal(t, combinePaths("/a/..", "/"), "/")
	assert.Equal(t, combinePaths("/a/..", "/b"), "/b")
}

func TestResolvePath(t *testing.T) {
	assert.Equal(t, resolvePath(""), "")
	assert.Equal(t, resolvePath("."), "")
	assert.Equal(t, resolvePath("./"), "")
	assert.Equal(t, resolvePath(".."), "..")
	assert.Equal(t, resolvePath("../"), "../")
	assert.Equal(t, resolvePath("/"), "/")
	assert.Equal(t, resolvePath("/."), "/")
	assert.Equal(t, resolvePath("/./"), "/")
	assert.Equal(t, resolvePath("/../"), "/")
	assert.Equal(t, resolvePath("/a"), "/a")
	assert.Equal(t, resolvePath("/a/"), "/a/")
	assert.Equal(t, resolvePath("/a/."), "/a")
	assert.Equal(t, resolvePath("/a/./"), "/a/")
	assert.Equal(t, resolvePath("/a/./b"), "/a/b")
	assert.Equal(t, resolvePath("/a/./b/"), "/a/b/")
	assert.Equal(t, resolvePath("/a/.."), "/")
	assert.Equal(t, resolvePath("/a/../"), "/")
	assert.Equal(t, resolvePath("/a/../b"), "/b")
	assert.Equal(t, resolvePath("/a/../b/"), "/b/")
	assert.Equal(t, resolvePath("/a/..", "b"), "/b")
	assert.Equal(t, resolvePath("/a/..", "/"), "/")
	assert.Equal(t, resolvePath("/a/..", "b/"), "/b/")
	assert.Equal(t, resolvePath("/a/..", "/b"), "/b")
	assert.Equal(t, resolvePath("/a/.", "b"), "/a/b")
	assert.Equal(t, resolvePath("/a/.", "."), "/a")
	assert.Equal(t, resolvePath("a", "b", "c"), "a/b/c")
	assert.Equal(t, resolvePath("a", "b", "/c"), "/c")
	assert.Equal(t, resolvePath("a", "b", "../c"), "a/c")
}

func TestGetRelativePathToDirectoryOrUrl(t *testing.T) {
	// !!!
	// Based on tests for `getRelativePathFromDirectory`.
	getCanonicalFileName := func(s string) string {
		return s
	}

	assert.Equal(t, getRelativePathToDirectoryOrUrl("/", "/", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a", "/a", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a/", "/a", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a", "/", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "..")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a", "/b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a/b", "/b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a/b/c", "/b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a/b/c", "/b/c", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../../b/c")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("/a/b/c", "/a/b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "..")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("c:", "d:", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "d:/")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///", "file:///", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a", "file:///a", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a/", "file:///a", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a", "file:///", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "..")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a", "file:///b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a/b", "file:///b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../../b")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///b/c", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "../../../b/c")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///a/b", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "..")
	assert.Equal(t, getRelativePathToDirectoryOrUrl("file:///c:", "file:///d:", "" /*currentDirectory*/, getCanonicalFileName, false /*isAbsolutePathAnUrl*/), "file:///d:/")
}

// !!!
// toFileNameLowerCase
