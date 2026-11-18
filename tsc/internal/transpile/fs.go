package transpile

import (
	"fmt"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// transpileFS embeds unsupported operations so unexpected filesystem access
// panics.
type transpileFS struct {
	vfs.FS
	files map[tspath.RootedFilePath]string
}

var _ vfs.FS = (*transpileFS)(nil)

func (fs *transpileFS) CaseSensitivity() tspath.CaseSensitivity {
	return tspath.CaseSensitive
}

func (fs *transpileFS) FileExists(path tspath.RootedFilePath) bool {
	_, ok := fs.files[path]
	if !ok {
		panic(fmt.Sprintf("unexpected file existence check for %q", path))
	}
	return ok
}

func (fs *transpileFS) ReadFile(path tspath.RootedFilePath) (string, bool) {
	content, ok := fs.files[path]
	if !ok {
		panic(fmt.Sprintf("unexpected file read for %q", path))
	}
	return content, ok
}

func (fs *transpileFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	panic(fmt.Sprintf("unexpected directory existence check for %q", path))
}

func (fs *transpileFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	panic(fmt.Sprintf("unexpected realpath request for %q", path))
}
