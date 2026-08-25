package transpile

import (
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// transpileFS embeds unsupported operations so unexpected filesystem access
// panics.
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
		if tspath.ContainsPath(path, tspath.GetDirectoryPath(file), tspath.ComparePathsOptions{UseCaseSensitiveFileNames: true}) {
			return true
		}
	}
	return false
}

func (fs *transpileFS) Realpath(path string) string {
	return path
}
