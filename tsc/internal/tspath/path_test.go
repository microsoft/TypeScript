package tspath

import (
	"regexp"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

func TestNormalizeSlashes(t *testing.T) {
	t.Parallel()
	assert.Equal(t, NormalizeSlashes("a"), "a")
	assert.Equal(t, NormalizeSlashes("a/b"), "a/b")
	assert.Equal(t, NormalizeSlashes("a\\b"), "a/b")
	assert.Equal(t, NormalizeSlashes("\\\\server\\path"), "//server/path")
}

func TestGetRootLength(t *testing.T) {
	t.Parallel()
	assert.Equal(t, GetRootLength("a"), 0)
	assert.Equal(t, GetRootLength("/"), 1)
	assert.Equal(t, GetRootLength("/path"), 1)
	assert.Equal(t, GetRootLength("c:"), 2)
	assert.Equal(t, GetRootLength("c:d"), 0)
	assert.Equal(t, GetRootLength("c:/"), 3)
	assert.Equal(t, GetRootLength("c:\\"), 3)
	assert.Equal(t, GetRootLength("//server"), 8)
	assert.Equal(t, GetRootLength("//server/share"), 9)
	assert.Equal(t, GetRootLength("\\\\server"), 8)
	assert.Equal(t, GetRootLength("\\\\server\\share"), 9)
	assert.Equal(t, GetRootLength("file:///"), 8)
	assert.Equal(t, GetRootLength("file:///path"), 8)
	assert.Equal(t, GetRootLength("file:///c:"), 10)
	assert.Equal(t, GetRootLength("file:///c:d"), 8)
	assert.Equal(t, GetRootLength("file:///c:/path"), 11)
	assert.Equal(t, GetRootLength("file:///c%3a"), 12)
	assert.Equal(t, GetRootLength("file:///c%3ad"), 8)
	assert.Equal(t, GetRootLength("file:///c%3a/path"), 13)
	assert.Equal(t, GetRootLength("file:///c%3A"), 12)
	assert.Equal(t, GetRootLength("file:///c%3Ad"), 8)
	assert.Equal(t, GetRootLength("file:///c%3A/path"), 13)
	assert.Equal(t, GetRootLength("file://localhost"), 16)
	assert.Equal(t, GetRootLength("file://localhost/"), 17)
	assert.Equal(t, GetRootLength("file://localhost/path"), 17)
	assert.Equal(t, GetRootLength("file://localhost/c:"), 19)
	assert.Equal(t, GetRootLength("file://localhost/c:d"), 17)
	assert.Equal(t, GetRootLength("file://localhost/c:/path"), 20)
	assert.Equal(t, GetRootLength("file://localhost/c%3a"), 21)
	assert.Equal(t, GetRootLength("file://localhost/c%3ad"), 17)
	assert.Equal(t, GetRootLength("file://localhost/c%3a/path"), 22)
	assert.Equal(t, GetRootLength("file://localhost/c%3A"), 21)
	assert.Equal(t, GetRootLength("file://localhost/c%3Ad"), 17)
	assert.Equal(t, GetRootLength("file://localhost/c%3A/path"), 22)
	assert.Equal(t, GetRootLength("file://server"), 13)
	assert.Equal(t, GetRootLength("file://server/"), 14)
	assert.Equal(t, GetRootLength("file://server/path"), 14)
	assert.Equal(t, GetRootLength("file://server/c:"), 14)
	assert.Equal(t, GetRootLength("file://server/c:d"), 14)
	assert.Equal(t, GetRootLength("file://server/c:/d"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3a"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3ad"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3a/d"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3A"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3Ad"), 14)
	assert.Equal(t, GetRootLength("file://server/c%3A/d"), 14)
	assert.Equal(t, GetRootLength("http://server"), 13)
	assert.Equal(t, GetRootLength("http://server/path"), 14)
}

func TestPathIsAbsolute(t *testing.T) {
	t.Parallel()
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
	t.Parallel()
	assert.Equal(t, IsUrl("a"), false)
	assert.Equal(t, IsUrl("/"), false)
	assert.Equal(t, IsUrl("c:"), false)
	assert.Equal(t, IsUrl("c:d"), false)
	assert.Equal(t, IsUrl("c:/"), false)
	assert.Equal(t, IsUrl("c:\\"), false)
	assert.Equal(t, IsUrl("//server"), false)
	assert.Equal(t, IsUrl("//server/share"), false)
	assert.Equal(t, IsUrl("\\\\server"), false)
	assert.Equal(t, IsUrl("\\\\server\\share"), false)

	assert.Equal(t, IsUrl("file:///path"), true)
	assert.Equal(t, IsUrl("file:///c:"), true)
	assert.Equal(t, IsUrl("file:///c:d"), true)
	assert.Equal(t, IsUrl("file:///c:/path"), true)
	assert.Equal(t, IsUrl("file://server"), true)
	assert.Equal(t, IsUrl("file://server/path"), true)
	assert.Equal(t, IsUrl("http://server"), true)
	assert.Equal(t, IsUrl("http://server/path"), true)
}

func TestIsRootedDiskPath(t *testing.T) {
	t.Parallel()
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
	t.Parallel()
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
	t.Parallel()
	assert.DeepEqual(t, GetPathComponents("", ""), []string{""})
	assert.DeepEqual(t, GetPathComponents("a", ""), []string{"", "a"})
	assert.DeepEqual(t, GetPathComponents("./a", ""), []string{"", ".", "a"})
	assert.DeepEqual(t, GetPathComponents("/", ""), []string{"/"})
	assert.DeepEqual(t, GetPathComponents("/a", ""), []string{"/", "a"})
	assert.DeepEqual(t, GetPathComponents("/a/", ""), []string{"/", "a"})
	assert.DeepEqual(t, GetPathComponents("c:", ""), []string{"c:"})
	assert.DeepEqual(t, GetPathComponents("c:d", ""), []string{"", "c:d"})
	assert.DeepEqual(t, GetPathComponents("c:/", ""), []string{"c:/"})
	assert.DeepEqual(t, GetPathComponents("c:/path", ""), []string{"c:/", "path"})
	assert.DeepEqual(t, GetPathComponents("//server", ""), []string{"//server"})
	assert.DeepEqual(t, GetPathComponents("//server/", ""), []string{"//server/"})
	assert.DeepEqual(t, GetPathComponents("//server/share", ""), []string{"//server/", "share"})
	assert.DeepEqual(t, GetPathComponents("file:///", ""), []string{"file:///"})
	assert.DeepEqual(t, GetPathComponents("file:///path", ""), []string{"file:///", "path"})
	assert.DeepEqual(t, GetPathComponents("file:///c:", ""), []string{"file:///c:"})
	assert.DeepEqual(t, GetPathComponents("file:///c:d", ""), []string{"file:///", "c:d"})
	assert.DeepEqual(t, GetPathComponents("file:///c:/", ""), []string{"file:///c:/"})
	assert.DeepEqual(t, GetPathComponents("file:///c:/path", ""), []string{"file:///c:/", "path"})
	assert.DeepEqual(t, GetPathComponents("file://server", ""), []string{"file://server"})
	assert.DeepEqual(t, GetPathComponents("file://server/", ""), []string{"file://server/"})
	assert.DeepEqual(t, GetPathComponents("file://server/path", ""), []string{"file://server/", "path"})
	assert.DeepEqual(t, GetPathComponents("http://server", ""), []string{"http://server"})
	assert.DeepEqual(t, GetPathComponents("http://server/", ""), []string{"http://server/"})
	assert.DeepEqual(t, GetPathComponents("http://server/path", ""), []string{"http://server/", "path"})
}

func TestReducePathComponents(t *testing.T) {
	t.Parallel()
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
	t.Parallel()
	// Non-rooted
	assert.Equal(t, CombinePaths("path", "to", "file.ext"), "path/to/file.ext")
	assert.Equal(t, CombinePaths("path", "dir", "..", "to", "file.ext"), "path/dir/../to/file.ext")
	// POSIX
	assert.Equal(t, CombinePaths("/path", "to", "file.ext"), "/path/to/file.ext")
	assert.Equal(t, CombinePaths("/path", "/to", "file.ext"), "/to/file.ext")
	// DOS
	assert.Equal(t, CombinePaths("c:/path", "to", "file.ext"), "c:/path/to/file.ext")
	assert.Equal(t, CombinePaths("c:/path", "c:/to", "file.ext"), "c:/to/file.ext")
	// URL
	assert.Equal(t, CombinePaths("file:///path", "to", "file.ext"), "file:///path/to/file.ext")
	assert.Equal(t, CombinePaths("file:///path", "file:///to", "file.ext"), "file:///to/file.ext")

	assert.Equal(t, CombinePaths("/", "/node_modules/@types"), "/node_modules/@types")
	assert.Equal(t, CombinePaths("/a/..", ""), "/a/..")
	assert.Equal(t, CombinePaths("/a/..", "b"), "/a/../b")
	assert.Equal(t, CombinePaths("/a/..", "b/"), "/a/../b/")
	assert.Equal(t, CombinePaths("/a/..", "/"), "/")
	assert.Equal(t, CombinePaths("/a/..", "/b"), "/b")
}

func TestResolvePath(t *testing.T) {
	t.Parallel()
	assert.Equal(t, ResolvePath(""), "")
	assert.Equal(t, ResolvePath("."), "")
	assert.Equal(t, ResolvePath("./"), "")
	assert.Equal(t, ResolvePath(".."), "..")
	assert.Equal(t, ResolvePath("../"), "../")
	assert.Equal(t, ResolvePath("/"), "/")
	assert.Equal(t, ResolvePath("/."), "/")
	assert.Equal(t, ResolvePath("/./"), "/")
	assert.Equal(t, ResolvePath("/../"), "/")
	assert.Equal(t, ResolvePath("/a"), "/a")
	assert.Equal(t, ResolvePath("/a/"), "/a/")
	assert.Equal(t, ResolvePath("/a/."), "/a")
	assert.Equal(t, ResolvePath("/a/./"), "/a/")
	assert.Equal(t, ResolvePath("/a/./b"), "/a/b")
	assert.Equal(t, ResolvePath("/a/./b/"), "/a/b/")
	assert.Equal(t, ResolvePath("/a/.."), "/")
	assert.Equal(t, ResolvePath("/a/../"), "/")
	assert.Equal(t, ResolvePath("/a/../b"), "/b")
	assert.Equal(t, ResolvePath("/a/../b/"), "/b/")
	assert.Equal(t, ResolvePath("/a/..", "b"), "/b")
	assert.Equal(t, ResolvePath("/a/..", "/"), "/")
	assert.Equal(t, ResolvePath("/a/..", "b/"), "/b/")
	assert.Equal(t, ResolvePath("/a/..", "/b"), "/b")
	assert.Equal(t, ResolvePath("/a/.", "b"), "/a/b")
	assert.Equal(t, ResolvePath("/a/.", "."), "/a")
	assert.Equal(t, ResolvePath("a", "b", "c"), "a/b/c")
	assert.Equal(t, ResolvePath("a", "b", "/c"), "/c")
	assert.Equal(t, ResolvePath("a", "b", "../c"), "a/c")
}

func TestGetRelativePathToDirectoryOrUrl(t *testing.T) {
	t.Parallel()
	// !!!
	// Based on tests for `getRelativePathFromDirectory`.

	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/", "/", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a", "/a", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a/", "/a", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a", "/", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "..")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a", "/b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a/b", "/b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a/b/c", "/b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a/b/c", "/b/c", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../../b/c")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("/a/b/c", "/a/b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "..")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("c:", "d:", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "d:/")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///", "file:///", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a", "file:///a", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a/", "file:///a", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a", "file:///", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "..")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a", "file:///b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a/b", "file:///b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../../b")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///b/c", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "../../../b/c")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///a/b/c", "file:///a/b", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "..")
	assert.Equal(t, GetRelativePathToDirectoryOrUrl("file:///c:", "file:///d:", false /*isAbsolutePathAnUrl*/, ComparePathsOptions{}), "file:///d:/")
}

func TestToFileNameLowerCase(t *testing.T) {
	t.Parallel()
	assert.Equal(t, toFileNameLowerCase("/user/UserName/projects/Project/file.ts"), "/user/username/projects/project/file.ts")
	assert.Equal(t, toFileNameLowerCase("/user/UserName/projects/projectß/file.ts"), "/user/username/projects/projectß/file.ts")
	assert.Equal(t, toFileNameLowerCase("/user/UserName/projects/İproject/file.ts"), "/user/username/projects/İproject/file.ts")
	assert.Equal(t, toFileNameLowerCase("/user/UserName/projects/ı/file.ts"), "/user/username/projects/ı/file.ts")
}

var toFileNameLowerCaseTests = []string{
	"/path/to/file.ext",
	"/PATH/TO/FILE.EXT",
	"/path/to/FILE.EXT",
	"/user/UserName/projects/Project/file.ts",
	"/user/UserName/projects/projectß/file.ts",
	"/user/UserName/projects/İproject/file.ts",
	"/user/UserName/projects/ı/file.ts",
	strings.Repeat("FoO/", 100),
}

// See [toFileNameLowerCase] for more info.
//
// To avoid having to do string building for most common cases, also ignore
// a-z, 0-9, \u0131, \u00DF, \, /, ., : and space
var fileNameLowerCaseRegExp = regexp.MustCompile(`[^\x{0130}\x{0131}\x{00DF}a-z0-9\\/:\-_. ]+`)

func oldToFileNameLowerCase(fileName string) string {
	return fileNameLowerCaseRegExp.ReplaceAllStringFunc(fileName, strings.ToLower)
}

func BenchmarkToFileNameLowerCase(b *testing.B) {
	for _, test := range toFileNameLowerCaseTests {
		name := shortenName(test)
		b.Run(name, func(b *testing.B) {
			b.ReportAllocs()
			for i := 0; i < b.N; i++ {
				toFileNameLowerCase(test)
			}
		})
	}
}

func FuzzToFileNameLowerCase(f *testing.F) {
	for _, test := range toFileNameLowerCaseTests {
		f.Add(test)
	}

	f.Fuzz(func(t *testing.T, p string) {
		assert.Equal(t, oldToFileNameLowerCase(p), toFileNameLowerCase(p))
	})
}

func TestToPath(t *testing.T) {
	t.Parallel()
	assert.Equal(t, string(ToPath("file.ext", "path/to", false /*useCaseSensitiveFileNames*/)), "path/to/file.ext")
	assert.Equal(t, string(ToPath("file.ext", "/path/to", true /*useCaseSensitiveFileNames*/)), "/path/to/file.ext")
	assert.Equal(t, string(ToPath("/path/to/../file.ext", "path/to", true /*useCaseSensitiveFileNames*/)), "/path/file.ext")
}

var relativePathSegmentRegExp = regexp.MustCompile(`//|(?:^|/)\.\.?(?:$|/)`)

func oldHasRelativePathSegment(p string) bool {
	return relativePathSegmentRegExp.MatchString(p)
}

var hasRelativePathSegmentTests = []struct {
	p     string
	bench bool
}{
	{"//", false},
	{"foo/bar/baz", true},
	{"foo/./baz", false},
	{"foo/../baz", false},
	{"foo/bar/baz/.", false},
	{"./some/path", true},
	{"/foo//bar/", false},
	{"/foo/./bar/../../.", true},
	{strings.Repeat("foo/", 100) + "..", true},
}

func BenchmarkHasRelativePathSegment(b *testing.B) {
	for _, tt := range hasRelativePathSegmentTests {
		if !tt.bench {
			continue
		}
		name := shortenName(tt.p)
		b.Run(name, func(b *testing.B) {
			b.ReportAllocs()
			for i := 0; i < b.N; i++ {
				hasRelativePathSegment(tt.p)
			}
		})
	}
}

func FuzzHasRelativePathSegment(f *testing.F) {
	for _, tt := range hasRelativePathSegmentTests {
		f.Add(tt.p)
	}

	f.Fuzz(func(t *testing.T, p string) {
		assert.Equal(t, oldHasRelativePathSegment(p), hasRelativePathSegment(p))
	})
}

var pathIsRelativeTests = []struct {
	p          string
	isRelative bool
	benchmark  bool
}{
	// relative
	{".", true, false},
	{"..", true, false},
	{"./", true, false},
	{"../", true, false},
	{"./foo/bar", true, true},
	{"../foo/bar", true, true},
	{"../" + strings.Repeat("foo/", 100), true, true},
	// non-relative
	{"", false, false},
	{"foo", false, false},
	{"foo/bar", false, false},
	{"/foo/bar", false, false},
	{"c:/foo/bar", false, false},
}

func init() {
	old := pathIsRelativeTests

	for _, t := range old {
		t.p = strings.ReplaceAll(t.p, "/", "\\")
		pathIsRelativeTests = append(pathIsRelativeTests, t)
	}
}

func TestPathIsRelative(t *testing.T) {
	t.Parallel()
	for _, tt := range pathIsRelativeTests {
		name := shortenName(tt.p)
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, PathIsRelative(tt.p), tt.isRelative)
		})
	}
}

func BenchmarkPathIsRelative(b *testing.B) {
	for _, tt := range pathIsRelativeTests {
		if !tt.benchmark {
			continue
		}
		name := shortenName(tt.p)
		b.Run(name, func(b *testing.B) {
			b.ReportAllocs()
			for i := 0; i < b.N; i++ {
				PathIsRelative(tt.p)
			}
		})
	}
}

func shortenName(name string) string {
	if len(name) > 20 {
		return name[:20] + "...etc"
	}
	return name
}
