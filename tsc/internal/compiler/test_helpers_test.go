package compiler_test

import (
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func testFileNames(fileNames ...string) []tspath.RootedFilePath {
	return core.Map(fileNames, tspath.RootedFilePathFromNormalized)
}
