package typedpaths

import "testdata/internal/tspath"

func testImplicitPath(path tspath.PathKey) {}
func testRootedFilePath(path tspath.RootedFilePath) {}
func testRelativePath(path tspath.RelativePath) {}

func testImplicitConversions() tspath.PathKey {
	testImplicitPath("/implicit/argument")
	testImplicitPath("")
	testRootedFilePath("")
	testRelativePath("")
	_ = holder{path: "/implicit/field"}
	_ = map[tspath.PathKey]bool{"/implicit/key": true}
	raw := string("/dynamic/file.ts")
	path := tspath.RootedPath("/dynamic/file.ts")
	file := tspath.RootedFilePath("/dynamic/file.ts")
	_ = tspath.RootedFilePath(raw)
	_ = tspath.RootedFilePath(path)
	_ = tspath.RootedPath(file)
	_ = tspath.RootedFilePath("/valid/file.ts")
	_ = tspath.RootedFilePath("relative/file.ts")
	return "/implicit/return"
}

func testInvalidImplicitConversions() tspath.PathKey {
	testImplicitPath("relative/argument")
	_ = holder{path: "/implicit//field"}
	_ = map[tspath.PathKey]bool{"relative/key": true}
	return "/implicit/../return"
}
