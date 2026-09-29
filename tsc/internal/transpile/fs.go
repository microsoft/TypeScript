package transpile

import (
	"fmt"

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
	if !ok {
		panic(fmt.Sprintf("unexpected file existence check for %q", path))
	}
	return ok
}

func (fs *transpileFS) ReadFile(path string) (string, bool) {
	content, ok := fs.files[path]
	if !ok {
		panic(fmt.Sprintf("unexpected file read for %q", path))
	}
	return content, ok
}

func (fs *transpileFS) DirectoryExists(path string) bool {
	panic(fmt.Sprintf("unexpected directory existence check for %q", path))
}

func (fs *transpileFS) Realpath(path string) string {
	panic(fmt.Sprintf("unexpected realpath request for %q", path))
}
