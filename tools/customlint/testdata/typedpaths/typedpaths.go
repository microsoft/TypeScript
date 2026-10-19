package typedpaths

import (
	"testdata/constants"
	"testdata/internal/tspath"
)

var implicitPath tspath.PathKey = "/implicit/path"
var emptyPath tspath.PathKey = ""

type holder struct {
	path tspath.PathKey
}

type localPath tspath.PathKey
type pathAlias = tspath.PathKey

// Invalid conversions and operations.
func bad(
	value string,
	path tspath.PathKey,
	rootedPath tspath.RootedPath,
	file tspath.RootedFilePath,
	directory tspath.RootedDirectoryPath,
) {
	_ = tspath.PathKey(value)
	_ = tspath.RootedPath(value)
	_ = tspath.RootedFilePath(rootedPath)
	_ = tspath.RootedDirectoryPath(rootedPath)
	_ = tspath.RootedDirectoryPath(file)
	_ = tspath.RootedFilePath(directory)
	_ = tspath.RelativePath(value)
	_ = tspath.SourceMapLocation(value)
	_ = tspath.ModuleSpecifier(value)
	_ = tspath.FileSpec(value)
	_ = tspath.PathPattern(value)
	_ = tspath.PathKey("/constant/is/still/a/cast")
	_ = tspath.NormalizePath(path.AsString())
	_ = tspath.NormalizeSlashes(string(file))
	_ = tspath.GetDirectoryPath(path.AsString())
	_ = tspath.GetDirectoryPath(file.AsString())
	_ = tspath.EnsureTrailingDirectorySeparator(string(path))
	_ = tspath.RemoveTrailingDirectorySeparator(path.AsString())
	_ = tspath.RootedPathFromNormalized(path.AsString())
	_ = tspath.RootedFilePathFromAbsolute(path.AsString())
	_ = tspath.ToRootedDirectoryPath(path.AsString(), directory)
	_ = tspath.RootedPathFromNormalized((path.AsString()))
	_ = holder{path: "/implicit/field"}
	_ = path[1:]
	_ = file[:len(file)-1]
	_ = path + "/child"
	_ = "prefix/" + file
	path += "/child"
	_ = path.ContainsLowercaseDirectorySequence("/node_modules/@Types/")
	sequence := "/node_modules/@types/"
	_ = path.ContainsLowercaseDirectorySequence(sequence)
}

func badReturn() tspath.PathKey {
	return "/implicit/return"
}

func consumePath(tspath.PathKey) {}

func badImportedConstants() tspath.PathKey {
	var path tspath.PathKey
	path = constants.Path
	_ = path
	_ = holder{path: constants.Path}
	consumePath(constants.Path)
	_ = []tspath.PathKey{constants.Path}
	_ = map[string]tspath.PathKey{"path": constants.Path}
	_ = map[tspath.PathKey]bool{constants.Path: true}
	return constants.Path
}

func badGeneric[T tspath.PathKey](path T) {
	_ = path[1:]
	_ = path + "/child"
	path += "/child"
}

// Invalid operations through a union constraint.
// Valid typed-path operations.
func good(
	path tspath.PathKey,
	rootedPath tspath.RootedPath,
	file tspath.RootedFilePath,
	directory tspath.RootedDirectoryPath,
) {
	_ = tspath.RootedPath(file)
	_ = tspath.RootedPath(directory)
	_ = tspath.ToRootedFilePath("through/a/constructor", tspath.RootedDirectoryPathFromNormalized("/project"))
	_ = tspath.NormalizePath("raw/input")
	_ = file.Directory()
	_ = path.Parent()
	_ = path.ContainsLowercaseDirectorySequence("/node_modules/@types/")
	_ = path[0]
}

const constantRoot = "/project"

func badConstructorConstants() {
	_ = tspath.RootedPathFromAbsolute("relative/path")
	_ = tspath.RootedPathFromAbsolute("http://server/file.ts?query")
	_ = tspath.RootedFilePathFromAbsolute("relative/path")
	_ = tspath.RootedDirectoryPathFromAbsolute("relative/path")
	_ = tspath.RootedPathFromNormalized("")
	_ = tspath.RootedFilePathFromNormalized("/project/../file.ts")
	_ = tspath.RootedDirectoryPathFromNormalized("/project/")
	_ = tspath.RelativePathFromNormalized("/project/file.ts")
	_ = tspath.PathKeyFromCanonical("project/file.ts")
	_ = tspath.PathKeyFromCanonical("c:")
	_ = tspath.PathKeyFromCanonical("//server")
	_ = tspath.PathKeyFromCanonical("http://server")
	_ = tspath.PathKeyFromCanonical("file:///c:")
	_ = tspath.ToRelativePath("/project/file.ts")
	_ = tspath.ToRootedFilePath("relative/path", "")
	_ = tspath.ToRootedFilePath("http://server/file.ts#fragment", tspath.RootedDirectoryPathFromNormalized("/project"))
	_ = tspath.ToRootedFilePath("file.ts?query", tspath.RootedDirectoryPathFromNormalized("http://server/base"))
	_ = tspath.ToRootedFilePath("file.ts?query", tspath.RootedDirectoryPathFromPath(tspath.RootedPathFromNormalized("http://server/base")))
	_ = tspath.ToRootedFilePath("file.ts?query", (tspath.RootedDirectoryPathFromNormalized("http://server/base")))
	_ = tspath.ToRootedFilePath("file.ts?query", tspath.RootedDirectoryPath(tspath.RootedFilePathFromNormalized("http://server/base")))
	_ = tspath.ToRootedFilePath("file.ts", tspath.RootedDirectoryPathFromAbsolute("/project/../base"))
	_ = tspath.ToRootedFilePath("file.ts", tspath.ToRootedDirectoryPath("base", tspath.RootedDirectoryPathFromNormalized("/project")))
	_ = tspath.ToRootedFilePath("", tspath.RootedDirectoryPathFromNormalized("/project"))
}

func goodConstructorConstants(dynamic string) {
	_ = tspath.RootedPathFromAbsolute("/project/file.ts")
	_ = tspath.RootedFilePathFromAbsolute(`C:\project\file.ts`)
	_ = tspath.RootedDirectoryPathFromAbsolute("file:///project")
	_ = tspath.RootedPathFromNormalized("/")
	_ = tspath.RootedPathFromNormalized("FILE:///C:/")
	_ = tspath.RootedFilePathFromNormalized(constantRoot + "/file.ts")
	_ = tspath.RootedDirectoryPathFromNormalized("^/untitled")
	_ = tspath.RelativePathFromNormalized("../project/")
	_ = tspath.PathKeyFromCanonical("")
	_ = tspath.PathKeyFromCanonical("/project/file.ts")
	_ = tspath.ToRelativePath("../project/file.ts")
	_ = tspath.RootedFilePathFromNormalized(dynamic)
}
