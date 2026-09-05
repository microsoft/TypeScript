package transpile

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestTranspileFSRejectsDirectoryAccess(t *testing.T) {
	t.Parallel()

	fs := &transpileFS{files: map[tspath.RootedFilePath]string{"/src/module.ts": ""}}
	testutil.AssertPanics(t, func() {
		fs.DirectoryExists(tspath.RootedDirectoryPathFromNormalized("/src"))
	}, `unexpected directory existence check for "/src"`)
	testutil.AssertPanics(t, func() {
		fs.Realpath(tspath.RootedFilePathFromNormalized("/src/module.ts").AsPath())
	}, `unexpected realpath request for "/src/module.ts"`)
}
