package transpile

import (
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// transpileFS embeds the unused operations so an unexpected filesystem access
// panics. NoResolve limits transpilation to the synthesized files below.
type transpileFS struct {
	vfs.FS
	files map[string]string
}

var _ vfs.FS = (*transpileFS)(nil)

func (fs *transpileFS) UseCaseSensitiveFileNames() bool {
	return true
}

func (fs *transpileFS) FileExists(path string) bool {
	_, ok := fs.files[path]
	return ok
}

func (fs *transpileFS) ReadFile(path string) (string, bool) {
	content, ok := fs.files[path]
	return content, ok
}

func (fs *transpileFS) DirectoryExists(path string) bool {
	for file := range fs.files {
		if tspath.ContainsPath(path, file, tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true}) {
			return true
		}
	}
	return false
}
