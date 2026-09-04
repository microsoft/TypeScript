package tspath

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
	"gotest.tools/v3/assert"
)

func TestToRootedFilePath(t *testing.T) {
	t.Parallel()

	assert.Equal(t, ToRootedFilePath("./src/../src/a.ts", "/project").AsString(), "/project/src/a.ts")
	assert.Equal(t, ToRootedFilePath("/project/src/", "/ignored").AsString(), "/project/src")
	assert.Equal(t, ToRootedFilePath("/", "/ignored").AsString(), "/")
	assert.Equal(t, ToRootedFilePath("file:///project/src/a.ts", "/ignored").AsString(), "file:///project/src/a.ts")
	assert.Equal(t, ToRootedFilePath("^/untitled/ts-nul-authority/Untitled-1", "/ignored").AsString(), "^/untitled/ts-nul-authority/Untitled-1")
	for input, expected := range map[string]string{
		"c:":                                    "c:/",
		"//server":                              "//server/",
		"file://server":                         "file://server/",
		"^/~ts-uri-v2~/custom/ts-nul-authority": "^/~ts-uri-v2~/custom/ts-nul-authority/",
		"^/~ts-uri-v2~/custom/authority?query":  "^/~ts-uri-v2~/custom/authority?query/",
	} {
		assert.Equal(t, ToRootedPath(input, "/ignored").AsString(), expected)
		assert.Equal(t, ToRootedFilePath(input, "/ignored").AsString(), expected)
		assert.Equal(t, ToRootedDirectoryPath(input, "/ignored").AsString(), expected)
	}
	diskWithSchemeText := ToRootedPath("/a://b?x/../y", "/ignored")
	assert.Equal(t, diskWithSchemeText.AsString(), "/a:/y")
	_, ok := TryRootedPathFromNormalized(diskWithSchemeText.AsString())
	assert.Assert(t, ok)
	for _, input := range []string{
		"http://server?query#fragment",
		"http://server?x/../y",
		"file:///c:?query/path",
	} {
		assertPanics(t, func() {
			ToRootedPath(input, "/ignored")
		})
		_, ok := TryRootedPathFromAbsolute(input)
		assert.Assert(t, !ok)
		_, ok = TryRootedPathFromNormalized(input)
		assert.Assert(t, !ok)
	}
	urlDirectory := RootedDirectoryPathFromNormalized("http://server/base")
	for _, resolve := range []func(){
		func() { ToRootedPath("file.ts?query/..", urlDirectory) },
		func() { urlDirectory.ResolveFile("file.ts?query") },
		func() { urlDirectory.ResolveFile("file.ts?query/..") },
		func() { urlDirectory.ResolveRelativeFile(RelativePath("file.ts?query")) },
		func() { urlDirectory.ResolveFileFromNormalizedRelative("file.ts?query") },
		func() { RootedFilePathFromNormalized("http://server/file.ts").AppendSuffix("?query") },
		func() { PathKey("http://server/file.ts").AppendCanonicalSuffix("#fragment") },
		func() { PathKey("http://server/base").AppendCanonicalComponent("file.ts?query") },
		func() { RootedFilePathFromNormalized("http://server/file.ts").ChangeExtension(".js?query") },
		func() { RootedFilePathFromNormalized("http://server/file.ts").ChangeFullExtension(".js#fragment") },
		func() {
			RootedFilePathFromNormalized("http://server/file.ts").ChangeAnyExtension(".js?query", []string{".ts"}, CaseSensitive)
		},
	} {
		assertPanics(t, resolve)
	}
	assert.Equal(t, urlDirectory.ResolveFile("/disk/file?name.ts"), RootedFilePath("/disk/file?name.ts"))
	assert.Equal(
		t,
		urlDirectory.ResolveDirectory("^/~ts-uri-v2~/custom/authority?query/"),
		RootedDirectoryPath("^/~ts-uri-v2~/custom/authority?query/"),
	)
}

func TestEncodedDynamicPathsPreserveOpaqueIdentity(t *testing.T) {
	t.Parallel()

	const root = "^/~ts-uri-v2~/custom/authority"
	rootWithSeparator := RootedPath(root + "/")
	upper := RootedFilePathFromNormalized(root + "/Foo.ts")
	lower := RootedFilePathFromNormalized(root + "/foo.ts")

	assert.Equal(t, GetRootLength(root), len(root))
	assert.Equal(t, CaseInsensitive.PathKey(RootedPath(root)), CaseInsensitive.PathKey(rootWithSeparator))
	assert.Assert(t, CaseInsensitive.CompareFilePaths(upper, lower) != 0)
	assert.Assert(t, !CaseInsensitive.ContainsFilePath(RootedDirectoryPath(root+"/Folder"), RootedFilePath(root+"/folder/file.ts")))
	relative, ok := CaseInsensitive.RelativeFilePathFromDirectory(RootedDirectoryPath(root), upper)
	assert.Assert(t, ok)
	assert.Equal(t, relative, RelativePath("Foo.ts"))
	_, ok = CaseInsensitive.RelativePathFromPath(
		RootedDirectoryPath("^/~ts-uri-v2~/custom/Authority/src"),
		RootedPath("^/~ts-uri-v2~/custom/authority/lib/x.ts"),
	)
	assert.Assert(t, !ok)
	assert.Assert(
		t,
		!PathKey("^/~ts-uri-v2~/custom/Authority/src").ContainsPath(
			PathKey("^/~ts-uri-v2~/custom/authority/src/file.ts"),
		),
	)
}

func TestPathKeyFromCanonicalRejectsURLSuffix(t *testing.T) {
	t.Parallel()

	const path = "http://server/?x/../y"
	_, ok := TryPathKeyFromCanonical(path)
	assert.Assert(t, !ok)
}

func TestDynamicPathKeyCaseInsensitiveKeyPreservesIdentity(t *testing.T) {
	t.Parallel()

	upper := CaseInsensitive.PathKey(RootedPathFromNormalized("^/~ts-uri-v2~/custom/ts-nul-authority/Foo.ts"))
	lower := CaseInsensitive.PathKey(RootedPathFromNormalized("^/~ts-uri-v2~/custom/ts-nul-authority/foo.ts"))

	assert.Equal(t, upper.CaseInsensitiveKey(), upper)
	assert.Equal(t, lower.CaseInsensitiveKey(), lower)
	assert.Assert(t, upper.CaseInsensitiveKey() != lower.CaseInsensitiveKey())
}

func TestExtensionMutationsPreserveNormalizedInvariant(t *testing.T) {
	t.Parallel()

	for _, mutate := range []func() RootedFilePath{
		func() RootedFilePath { return RootedFilePathFromNormalized("/project/..ts").RemoveFileExtension() },
		func() RootedFilePath { return RootedFilePathFromNormalized("/project/..ts").RemoveExtension(".ts") },
		func() RootedFilePath { return RootedFilePathFromNormalized("/project/..ts").ChangeExtension("") },
		func() RootedFilePath { return RootedFilePathFromNormalized("/project/...ts").ChangeFullExtension("") },
		func() RootedFilePath {
			return RootedFilePathFromNormalized("/project/..ts").ChangeAnyExtension("", []string{".ts"}, CaseSensitive)
		},
		func() RootedFilePath {
			return RootedFilePathFromNormalized("http://example.com/file.ts").
				ChangeAnyExtension("", []string{".com/file.ts"}, CaseSensitive)
		},
	} {
		assertPanics(t, func() {
			mutate()
		})
	}

	for _, test := range []struct {
		fileName  RootedFilePath
		component string
	}{
		{"//node_modules/pkg/index.d.ts", "node_modules"},
		{"http://node_modules/pkg/index.d.ts", "node_modules"},
		{"file:///c:/pkg/index.d.ts", "c:"},
		{"^/~ts-uri-v2~/https/node_modules/file.ts", "node_modules"},
	} {
		_, _, ok := test.fileName.SplitAtComponent(test.component)
		assert.Assert(t, !ok)
		_, _, ok = test.fileName.SplitAtLastComponent(test.component)
		assert.Assert(t, !ok)
		_, _, ok = CaseSensitive.PathKey(test.fileName.AsPath()).SplitAtCanonicalComponent(test.component)
		assert.Assert(t, !ok)
	}

	_, _, ok := PathKey("").SplitAtCanonicalComponent("node_modules")
	assert.Assert(t, !ok)
	_, _, ok = RootedFilePath("").SplitAtComponent("node_modules")
	assert.Assert(t, !ok)
}

func TestSplitAtRootLevelComponentKeepsRoot(t *testing.T) {
	t.Parallel()

	for _, fileName := range []RootedFilePath{
		"/node_modules/pkg/index.d.ts",
		"c:/node_modules/pkg/index.d.ts",
		"file:///node_modules/pkg/index.d.ts",
	} {
		before, through, ok := fileName.SplitAtComponent("node_modules")
		assert.Assert(t, ok)
		root, _ := fileName.RootAndRelativePath()
		assert.Equal(t, before, root)
		assert.Equal(t, through, root.ResolveDirectory("node_modules"))

		before, through, ok = fileName.SplitAtLastComponent("node_modules")
		assert.Assert(t, ok)
		assert.Equal(t, before, root)
		assert.Equal(t, through, root.ResolveDirectory("node_modules"))

		keyBefore, keyThrough, ok := CaseSensitive.PathKey(fileName.AsPath()).SplitAtCanonicalComponent("node_modules")
		assert.Assert(t, ok)
		assert.Equal(t, keyBefore, CaseSensitive.PathKey(root.AsPath()))
		assert.Equal(t, keyThrough, CaseSensitive.PathKey(root.ResolveDirectory("node_modules").AsPath()))
	}
}

func TestToRootedFilePathRequiresRoot(t *testing.T) {
	t.Parallel()

	assertPanics(t, func() {
		ToRootedFilePath("", "/project")
	})
	assertPanics(t, func() {
		ToRootedFilePath("src/a.ts", "")
	})
}

func TestRootedFilePathFromAbsolute(t *testing.T) {
	t.Parallel()

	assert.Equal(t, RootedFilePathFromAbsolute(`C:\project\src\..\a.ts`), RootedFilePathFromNormalized("C:/project/a.ts"))
	assertPanics(t, func() {
		RootedFilePathFromAbsolute("src/a.ts")
	})
	_, ok := TryRootedFilePathFromAbsolute("src/a.ts")
	assert.Assert(t, !ok)
	absolute, ok := TryRootedFilePathFromAbsolute("/project/src/../a.ts")
	assert.Assert(t, ok)
	assert.Equal(t, absolute, RootedFilePathFromNormalized("/project/a.ts"))
	for input, expected := range map[string]string{
		"c:":            "c:/",
		"//server":      "//server/",
		"file://server": "file://server/",
	} {
		assert.Equal(t, RootedFilePathFromAbsolute(input).AsString(), expected)
	}
}

func TestRootedFilePathFromNormalized(t *testing.T) {
	t.Parallel()

	assert.Equal(t, RootedFilePathFromNormalized("/project/src/a.ts").AsString(), "/project/src/a.ts")
	assert.Equal(t, RootedFilePathFromNormalized("c:/").AsString(), "c:/")
	assert.Equal(t, RootedFilePathFromNormalized("//server/").AsString(), "//server/")
	assert.Equal(t, RootedFilePathFromNormalized("file://server/").AsString(), "file://server/")
	assertPanics(t, func() {
		RootedFilePathFromNormalized("/project/src/../a.ts")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("src/a.ts")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("/project/src/")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized(`/project\src\a.ts`)
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("/project//src/a.ts")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("c:")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("//server")
	})
	assertPanics(t, func() {
		RootedFilePathFromNormalized("file://server")
	})

	for _, fileName := range []string{
		"/project/src/a.ts",
		"c:/",
		"//server/",
		"file://server/",
	} {
		result, ok := TryRootedFilePathFromNormalized(fileName)
		assert.Assert(t, ok)
		assert.Equal(t, result.AsString(), fileName)
	}
	for _, fileName := range []string{
		"",
		"/project/src/../a.ts",
		"src/a.ts",
		"/project/src/",
		`/project\src\a.ts`,
		"/project//src/a.ts",
		"c://project/src/a.ts",
		"//server//share/a.ts",
		"file://server//a.ts",
		"c:",
		"//server",
		"file://server",
	} {
		_, ok := TryRootedFilePathFromNormalized(fileName)
		assert.Assert(t, !ok)
	}
}

func TestTypedPathConstructorsAndDecoders(t *testing.T) {
	t.Parallel()

	assert.Equal(t, ToRootedDirectoryPath("./src", "/project").AsString(), "/project/src")
	assert.Equal(t, RootedDirectoryPathFromAbsolute("/project/src/../lib/").AsString(), "/project/lib")
	assert.Equal(t, RootedDirectoryPathFromAbsolute("c:\\project\\src\\..\\lib\\").AsString(), "c:/project/lib")
	assert.Equal(t, RootedDirectoryPathFromAbsolute("file:///project/src/../lib/").AsString(), "file:///project/lib")
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").AsString(), "/project/src")
	assert.Equal(t, string(PathKeyFromCanonical("/project/src")), "/project/src")
	assert.Equal(t, CaseSensitive.PathKey(RootedPathFromAbsolute("/project/src/")), PathKey("/project/src"))
	path, ok := TryPathKeyFromCanonical("/project/src")
	assert.Assert(t, ok)
	assert.Equal(t, string(path), "/project/src")
	assert.Equal(t, ToModuleSpecifier("./src").AsString(), "./src")

	assertPanics(t, func() {
		RootedDirectoryPathFromAbsolute("project/src")
	})
	assertPanics(t, func() {
		RootedDirectoryPathFromNormalized("/project/src/")
	})
	assertPanics(t, func() {
		PathKeyFromCanonical("/project/../src")
	})
	assertPanics(t, func() {
		PathKeyFromCanonical("project/src")
	})
	for _, value := range []string{
		"/project/../src",
		"project/src",
		"c:",
		"//server",
		"http://server",
		"file:///c:",
	} {
		_, ok = TryPathKeyFromCanonical(value)
		assert.Assert(t, !ok)
	}
	assertPanics(t, func() {
		CaseSensitive.PathKey(ToRootedPath("project/src", ""))
	})
}

func TestRelativePath(t *testing.T) {
	t.Parallel()

	assert.Equal(t, ToRelativePath(`.\src\..\lib\file.ts`).AsString(), "lib/file.ts")
	assert.Equal(t, RelativePathFromNormalized("../lib/file.ts").AsString(), "../lib/file.ts")
	assert.Equal(t, RelativePathFromNormalized("").AsString(), "")
	assertPanics(t, func() {
		RelativePathFromNormalized("./lib/file.ts")
	})
	assertPanics(t, func() {
		ToRelativePath("/lib/file.ts")
	})

	assert.Equal(t, RelativePathFromNormalized("lib/file.ts").AsModuleSpecifier().AsString(), "./lib/file.ts")
	assert.Equal(t, RelativePathFromNormalized("../lib/file.ts").AsModuleSpecifier().AsString(), "../lib/file.ts")
	assert.Equal(t, RootedFilePathFromNormalized("/project/lib/file.ts").AsModuleSpecifier(), ModuleSpecifier("/project/lib/file.ts"))
	assert.Assert(t, ToModuleSpecifier("./lib/file.ts").IsRelative())
	assert.Assert(t, !ToModuleSpecifier("lib").IsRelative())
	assert.Assert(t, ToModuleSpecifier("/project/lib").IsAbsolute())
	assert.Assert(t, !ToModuleSpecifier("lib").IsAbsolute())
	assert.Equal(t, ToModuleSpecifier("pkg").Resolve("./dist", "file.js"), ModuleSpecifier("pkg/dist/file.js"))
	assert.Equal(t, ToModuleSpecifier("pkg").ResolveRelative(RelativePathFromNormalized("lib/file.js")), ModuleSpecifier("pkg/lib/file.js"))
	assert.Equal(t, ToModuleSpecifier("pkg").CombineRelative(RelativePathFromNormalized("lib/file.js")), ModuleSpecifier("pkg/lib/file.js"))
	assert.Equal(t, ToModuleSpecifier("pkg/lib/file.d.ts").RemoveFileExtension(), ModuleSpecifier("pkg/lib/file"))
	assert.Assert(t, RelativePathFromNormalized("../lib/file.ts").IsParentRelative())
	assert.Assert(t, !RelativePathFromNormalized("..file.ts").IsParentRelative())
	assert.Assert(t, RelativePathFromNormalized("lib/").HasTrailingDirectorySeparator())
	assert.Equal(t, RelativePathFromNormalized("lib").WithTrailingDirectorySeparator(), RelativePath("lib/"))
	assert.Equal(
		t,
		RootedDirectoryPathFromNormalized("/project/dist").ResolveRelativeFile(RelativePathFromNormalized("../src/file.ts")),
		RootedFilePathFromNormalized("/project/src/file.ts"),
	)
}

func TestTypedPathComponents(t *testing.T) {
	t.Parallel()

	fileName := RootedFilePathFromNormalized("/project/node_modules/pkg/index.ts")
	assert.Assert(t, fileName.ContainsLowercaseDirectorySequence("/node_modules/"))
	assert.Assert(t, !RootedFilePathFromNormalized("/project/node_modules").ContainsLowercaseDirectorySequence("/node_modules/"))
	assert.Assert(t, !RootedFilePathFromNormalized("/project/not_node_modules/pkg/index.ts").ContainsLowercaseDirectorySequence("/node_modules/"))

	path := PathKeyFromCanonical("/project/node_modules/@types/node/index.d.ts")
	assert.Assert(t, path.ContainsLowercaseDirectorySequence("/node_modules/@types/node/"))
	assert.Assert(t, !PathKeyFromCanonical("/project/node_modules/@types/node").ContainsLowercaseDirectorySequence("/node_modules/@types/node/"))
}

func TestTryRelativePathBetweenFilePaths(t *testing.T) {
	t.Parallel()

	from := RootedDirectoryPathFromNormalized("/project/src")
	to := RootedFilePathFromNormalized("/project/lib/file.ts")
	relative, ok := CaseSensitive.RelativePathFromDirectory(from, to)
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "../lib/file.ts")

	_, ok = CaseSensitive.RelativePathFromDirectory(
		RootedDirectoryPathFromNormalized("c:/project/src"),
		RootedFilePathFromNormalized("d:/project/lib/file.ts"),
	)
	assert.Assert(t, !ok)
}

func TestRootedFilePathDirectory(t *testing.T) {
	t.Parallel()

	assert.Equal(t, RootedFilePathFromNormalized("/project/src/a.ts").Directory().AsString(), "/project/src")
	assert.Equal(t, RootedFilePathFromNormalized("/").Directory().AsString(), "/")
	assert.Equal(t, RootedFilePathFromNormalized("c:/project/src/a.ts").Directory().AsString(), "c:/project/src")
	assert.Equal(t, RootedFilePathFromNormalized("file:///project/src/a.ts").Directory().AsString(), "file:///project/src")
}

func TestRootedFilePathWithoutRoot(t *testing.T) {
	t.Parallel()

	assert.Equal(t, RootedFilePathFromNormalized("/project/src/a.ts").WithoutRoot(), "project/src/a.ts")
	assert.Equal(t, RootedFilePathFromNormalized("c:/project/src/a.ts").WithoutRoot(), "project/src/a.ts")
	assert.Equal(t, RootedFilePathFromNormalized("file:///project/src/a.ts").WithoutRoot(), "project/src/a.ts")
}

func TestRootedFilePathRootAndRelativePath(t *testing.T) {
	t.Parallel()

	root, relative := RootedFilePathFromNormalized("file:///project/src/a.ts").RootAndRelativePath()
	assert.Equal(t, root.AsString(), "file:///")
	assert.Equal(t, relative, "project/src/a.ts")
	assert.Equal(t, root.ResolveFileFromNormalizedRelative(relative), RootedFilePathFromNormalized("file:///project/src/a.ts"))
	assert.Equal(t, RootedDirectoryPathFromNormalized("/").ResolveFileFromNormalizedRelative("C:/src/a.ts"), RootedFilePathFromNormalized("/C:/src/a.ts"))
	assertPanics(t, func() {
		root.ResolveFileFromNormalizedRelative("")
	})
	assertPanics(t, func() {
		root.ResolveFileFromNormalizedRelative("../a.ts")
	})
}

func TestCommonDirectoryOfFiles(t *testing.T) {
	t.Parallel()

	fileNames := []RootedFilePath{
		RootedFilePathFromNormalized("/Project/src/a.ts"),
		RootedFilePathFromNormalized("/project/src/nested/b.ts"),
		RootedFilePathFromNormalized("/project/test/c.ts"),
	}
	assert.Equal(t, CaseInsensitive.CommonDirectoryOfFiles(fileNames), RootedDirectoryPathFromNormalized("/Project"))
	assert.Equal(t, CaseSensitive.CommonDirectoryOfFiles(fileNames), RootedDirectoryPathFromNormalized("/"))
	assert.Equal(t, CaseInsensitive.CommonDirectoryOfFiles([]RootedFilePath{
		RootedFilePathFromNormalized("/repo/İproject/a.ts"),
		RootedFilePathFromNormalized("/repo/iproject/b.ts"),
	}), RootedDirectoryPathFromNormalized("/repo"))
}

func TestRelativePathsFromTypedPaths(t *testing.T) {
	t.Parallel()

	fromDirectory := RootedDirectoryPathFromNormalized("/project/src")
	fromFile := RootedFilePathFromNormalized("/project/src/index.ts")
	toFile := RootedFilePathFromNormalized("/project/lib/util.ts")

	relative, ok := CaseSensitive.RelativePathFromDirectory(fromDirectory, toFile)
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "../lib/util.ts")
	relative, ok = CaseSensitive.RelativePathFromFile(fromFile, toFile)
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "../lib/util.ts")
	relative, ok = CaseInsensitive.RelativePathFromDirectory(
		RootedDirectoryPathFromNormalized("/PROJECT/src"),
		toFile,
	)
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "../lib/util.ts")
	relative, ok = CaseInsensitive.RelativeFilePathFromDirectory(
		RootedDirectoryPathFromNormalized("/repo/K"),
		RootedFilePathFromNormalized("/repo/k/a.ts"),
	)
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "a.ts")
}

func TestContainsFilePath(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name            string
		caseSensitivity CaseSensitivity
		directory       string
		fileName        string
		relative        string
		contained       bool
	}{
		{name: "same path", caseSensitivity: CaseSensitive, directory: "/project/src", fileName: "/project/src", contained: true},
		{name: "child", caseSensitivity: CaseSensitive, directory: "/project/src", fileName: "/project/src/a.ts", relative: "a.ts", contained: true},
		{name: "prefix sibling", caseSensitivity: CaseSensitive, directory: "/project/src", fileName: "/project/source/a.ts"},
		{name: "root", caseSensitivity: CaseSensitive, directory: "/", fileName: "/project/src/a.ts", relative: "project/src/a.ts", contained: true},
		{name: "case sensitive mismatch", caseSensitivity: CaseSensitive, directory: "/PROJECT", fileName: "/project/a.ts"},
		{name: "case insensitive", caseSensitivity: CaseInsensitive, directory: "/PROJECT", fileName: "/project/a.ts", relative: "a.ts", contained: true},
		{name: "case folded rune", caseSensitivity: CaseInsensitive, directory: "/repo/K", fileName: "/repo/k/a.ts", relative: "a.ts", contained: true},
		{name: "drive root casing", caseSensitivity: CaseSensitive, directory: "C:/project", fileName: "c:/project/a.ts", relative: "a.ts", contained: true},
		{name: "file URL scheme and drive casing", caseSensitivity: CaseSensitive, directory: "FILE:///C:/project", fileName: "file:///c:/project/a.ts", relative: "a.ts", contained: true},
		{name: "file URL localhost and drive casing", caseSensitivity: CaseSensitive, directory: "file://LOCALHOST/C:/project", fileName: "file://localhost/c:/project/a.ts", relative: "a.ts", contained: true},
		{name: "different root", caseSensitivity: CaseInsensitive, directory: "c:/project", fileName: "d:/project/a.ts"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			directory := RootedDirectoryPathFromNormalized(test.directory)
			fileName := RootedFilePathFromNormalized(test.fileName)
			assert.Equal(t, test.caseSensitivity.ContainsFilePath(directory, fileName), test.contained)
			assert.Equal(
				t,
				test.caseSensitivity.ContainsPath(directory, fileName.AsPath()),
				test.contained,
			)
			assert.Equal(t, test.caseSensitivity.StartsWithDirectory(fileName, directory), test.contained && test.relative != "")
			relative, ok := test.caseSensitivity.RelativeFilePathFromDirectory(directory, fileName)
			assert.Equal(t, ok, test.contained)
			if ok {
				assert.Equal(t, relative.AsString(), test.relative)
			}
		})
	}

	parentKey := CaseSensitive.PathKey(RootedDirectoryPathFromNormalized("C:/project").AsPath())
	childKey := CaseSensitive.PathKey(RootedFilePathFromNormalized("c:/project/a.ts").AsPath())
	assert.Assert(t, parentKey.ContainsPath(childKey))

	relative, ok := RootedFilePathFromNormalized("c:/project/a.ts").RelativeTo(
		RootedDirectoryPathFromNormalized("C:/project"),
	)
	assert.Assert(t, ok)
	assert.Equal(t, relative, RelativePath("a.ts"))
}

func TestSourceMapLocation(t *testing.T) {
	t.Parallel()

	relative := ToSourceMapLocation(`maps\generated`)
	assert.Equal(t, relative.AsString(), "maps/generated")
	assert.Assert(t, relative.IsRelative())
	assert.Equal(
		t,
		relative.ResolveDirectory(RootedDirectoryPathFromNormalized("/project/src"), RootedDirectoryPathFromNormalized("/project")).AsString(),
		"/project/src/maps/generated",
	)

	rooted := ToSourceMapLocation(`/maps\generated`)
	assert.Assert(t, !rooted.IsRelative())
	assert.Equal(
		t,
		rooted.ResolveDirectory(RootedDirectoryPathFromNormalized("/project/src"), RootedDirectoryPathFromNormalized("/project")).AsString(),
		"/maps/generated",
	)

	var decoded SourceMapLocation
	assert.NilError(t, json.Unmarshal([]byte(`"maps\\generated"`), &decoded))
	assert.Equal(t, decoded.AsString(), "maps/generated")
	encoded, err := json.Marshal(decoded)
	assert.NilError(t, err)
	assert.Equal(t, string(encoded), `"maps/generated"`)
}

func TestRootedPath(t *testing.T) {
	t.Parallel()

	path := ToRootedPath(`src\config.json`, RootedDirectoryPathFromNormalized("/project"))
	assert.Equal(t, path.AsString(), "/project/src/config.json")
	assert.Equal(t, RootedFilePathFromPath(path), RootedFilePathFromNormalized("/project/src/config.json"))
	assert.Equal(t, RootedDirectoryPathFromPath(path), RootedDirectoryPathFromNormalized("/project/src/config.json"))
	assert.Equal(
		t,
		RootedPath(RootedDirectoryPathFromNormalized("/project/src")),
		RootedPathFromNormalized("/project/src"),
	)
}

func TestPathOperationsSeparateRooting(t *testing.T) {
	t.Parallel()

	assert.Equal(t, ComparePaths("src/a.ts", "/project/src/a.ts", CaseSensitive), -1)
	assert.Equal(t, ComparePathsRelativeTo("src/a.ts", "/project/src/a.ts", "/project", CaseSensitive), 0)
	assert.Assert(t, ContainsPath("src", "src/a.ts", CaseSensitive))
	assert.Assert(t, !ContainsPath("/project/src", "src/a.ts", CaseSensitive))
	assert.Equal(t, GetRelativePathFromDirectory("src", "lib/a.ts", CaseSensitive), "../lib/a.ts")
	assert.Equal(t, ResolveRelativePathFromDirectory("src", "lib/a.ts", "/project", CaseSensitive), "../lib/a.ts")
}

func TestRootedFilePathExtensionOperationsPreserveInvariants(t *testing.T) {
	t.Parallel()

	fileName := RootedFilePathFromNormalized("/project/src/file.ts")
	assert.Equal(t, fileName.RemoveFileExtension(), RootedFilePathFromNormalized("/project/src/file"))
	assert.Equal(t, fileName.ChangeExtension(".js"), RootedFilePathFromNormalized("/project/src/file.js"))
	assert.Equal(t, RootedFilePathFromNormalized("/project/src/file.d.ts").ChangeFullExtension(""), RootedFilePathFromNormalized("/project/src/file"))
	assertPanics(t, func() { fileName.ChangeExtension("../other") })
	assertPanics(t, func() { fileName.ChangeFullExtension(`\nested`) })
	assertPanics(t, func() { fileName.RemoveExtension(".js") })
}

func TestForEachAncestorDirectoryPath(t *testing.T) {
	t.Parallel()

	var ancestors []RootedDirectoryPath
	ForEachAncestorDirectoryPath(RootedDirectoryPathFromNormalized("/project/src/lib"), func(directory RootedDirectoryPath) (struct{}, bool) {
		ancestors = append(ancestors, directory)
		return struct{}{}, false
	})
	assert.DeepEqual(t, ancestors, []RootedDirectoryPath{
		RootedDirectoryPathFromNormalized("/project/src/lib"),
		RootedDirectoryPathFromNormalized("/project/src"),
		RootedDirectoryPathFromNormalized("/project"),
		RootedDirectoryPathFromNormalized("/"),
	})
}

func TestRootedFilePathComponents(t *testing.T) {
	t.Parallel()

	fileName := RootedFilePathFromNormalized("/store/node_modules/pkg/node_modules/dep/index.d.ts")
	assert.Equal(t, fileName.DirectoryBefore(23), RootedDirectoryPathFromNormalized("/store/node_modules/pkg"))
	assert.Equal(t, fileName.SuffixAfterSeparator(23), "node_modules/dep/index.d.ts")
	relative, ok := fileName.RelativeTo(RootedDirectoryPathFromNormalized("/store/node_modules/pkg"))
	assert.Assert(t, ok)
	assert.Equal(t, relative.AsString(), "node_modules/dep/index.d.ts")
	_, ok = fileName.RelativeTo(RootedDirectoryPathFromNormalized("/other"))
	assert.Assert(t, !ok)

	before, through, ok := fileName.SplitAtComponent("node_modules")
	assert.Assert(t, ok)
	assert.Equal(t, before, RootedDirectoryPathFromNormalized("/store"))
	assert.Equal(t, through, RootedDirectoryPathFromNormalized("/store/node_modules"))

	before, through, ok = fileName.SplitAtLastComponent("node_modules")
	assert.Assert(t, ok)
	assert.Equal(t, before, RootedDirectoryPathFromNormalized("/store/node_modules/pkg"))
	assert.Equal(t, through, RootedDirectoryPathFromNormalized("/store/node_modules/pkg/node_modules"))
	assertPanics(t, func() {
		fileName.DirectoryBefore(22)
	})
	assertPanics(t, func() {
		fileName.SuffixAfterSeparator(22)
	})
}

func TestCaseSensitivityKey(t *testing.T) {
	t.Parallel()

	fileName := RootedFilePathFromNormalized("/Project/SRC/a.ts")
	caseSensitive := CaseSensitive
	caseInsensitive := CaseInsensitive
	assert.Equal(t, string(caseSensitive.PathKey(RootedPath(fileName))), "/Project/SRC/a.ts")
	assert.Equal(t, string(caseInsensitive.PathKey(RootedPath(fileName))), "/project/src/a.ts")
	assert.Equal(t, caseSensitive.CompareFilePaths(fileName, RootedFilePathFromNormalized("/Project/SRC/b.ts")), -1)
	assert.Equal(t, caseInsensitive.CompareFilePaths(fileName, RootedFilePathFromNormalized("/project/src/A.ts")), 0)
	assert.Equal(t, fileName.DirectorySeparatorCount(), 3)
}

func TestPathKeyConstructionMethods(t *testing.T) {
	t.Parallel()

	path := PathKey("/project/src")
	assert.Equal(t, string(path.AppendCanonicalComponent("node_modules")), "/project/src/node_modules")
	assert.Equal(t, string(path.AppendCanonicalSuffix(".0.ts")), "/project/src.0.ts")
	assert.Equal(t, path.AppendCanonicalSuffix(".ts").Extension(), ".ts")
	before, through, ok := PathKey("/project/node_modules/pkg/index.d.ts").SplitAtCanonicalComponent("node_modules")
	assert.Assert(t, ok)
	assert.Equal(t, before, PathKey("/project"))
	assert.Equal(t, through, PathKey("/project/node_modules"))
	_, _, ok = PathKey("/project/not_node_modules/pkg").SplitAtCanonicalComponent("node_modules")
	assert.Assert(t, !ok)
	assertPanics(t, func() {
		path.AppendCanonicalComponent("../src")
	})
	assertPanics(t, func() {
		path.AppendCanonicalSuffix("/src")
	})
	assertPanics(t, func() {
		PathKey("").AppendCanonicalComponent("src")
	})
	assertPanics(t, func() {
		PathKey("").AppendCanonicalSuffix(".ts")
	})
	assertPanics(t, func() {
		path.SplitAtCanonicalComponent("../node_modules")
	})
	assertPanics(t, func() {
		RootedFilePath("").AppendSuffix(".ts")
	})
	assertPanics(t, func() {
		RootedDirectoryPath("").ResolveFile("file.ts")
	})
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").ResolveDirectory("types").AsString(), "/project/src/types")
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").ResolveDirectory("types/").AsString(), "/project/src/types")
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").ResolveDirectory("").AsString(), "/project/src")
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").ResolveFile("file.ts/").AsString(), "/project/src/file.ts")
	assert.Equal(t, RootedDirectoryPathFromNormalized("/project/src").ResolveFile("").AsString(), "/project/src")
	assertPanics(t, func() {
		RootedDirectoryPath("").ResolveDirectory("types")
	})
}

func TestRootedDirectoryPathResolutionMatchesGeneralRooting(t *testing.T) {
	t.Parallel()

	base := RootedDirectoryPathFromNormalized("/project/src")
	tests := []string{
		"file.ts",
		"nested/file.ts",
		"./file.ts",
		"../file.ts",
		`nested\file.ts`,
		"nested/file.ts/",
		"/absolute/file.ts",
		"c:/absolute/file.ts",
		"file:///absolute/file.ts",
	}
	for _, path := range tests {
		t.Run(path, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, base.ResolveFile(path), ToRootedFilePath(path, base))
			assert.Equal(t, base.ResolveDirectory(path), ToRootedDirectoryPath(path, base))
		})
	}
}

func BenchmarkRootedDirectoryPathResolveFile(b *testing.B) {
	base := RootedDirectoryPathFromNormalized("/project/src")
	b.Run("typed fast path", func(b *testing.B) {
		for b.Loop() {
			_ = base.ResolveFile("node_modules")
		}
	})
	b.Run("general rooting", func(b *testing.B) {
		for b.Loop() {
			_ = ToRootedFilePath("node_modules", base)
		}
	})
}

func BenchmarkRootedFilePathToPathKey(b *testing.B) {
	const fileName = "/home/user/project/src/some/deep/module/file.ts"
	normalized := RootedFilePathFromNormalized(fileName)
	currentDirectory := RootedDirectoryPath("/home/user/project")

	b.Run("RootAndPathKey", func(b *testing.B) {
		for b.Loop() {
			_ = CaseInsensitive.PathKey(ToRootedPath(fileName, currentDirectory))
		}
	})
	b.Run("AlreadyRooted", func(b *testing.B) {
		for b.Loop() {
			_ = CaseInsensitive.PathKey(normalized.AsPath())
		}
	})
}

func assertPanics(t *testing.T, f func()) {
	t.Helper()
	defer func() {
		assert.Assert(t, recover() != nil)
	}()
	f()
}
