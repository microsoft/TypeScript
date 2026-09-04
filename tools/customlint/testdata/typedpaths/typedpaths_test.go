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
	return "/implicit/return"
}

func testInvalidImplicitConversions() tspath.PathKey {
	testImplicitPath("relative/argument")
	_ = holder{path: "/implicit//field"}
	_ = map[tspath.PathKey]bool{"relative/key": true}
	return "/implicit/../return"
}
