package bundled_test

import (
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/bundled"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func TestTestingLibPath(t *testing.T) {
	t.Parallel()

	p := bundled.TestingLibPath()

	_, err := os.Stat(p)
	assert.NilError(t, err)

	libdts := filepath.Join(p, "lib.d.ts")

	_, err = os.Stat(libdts)
	assert.NilError(t, err)
}

func TestEmbeddedLibs(t *testing.T) {
	t.Parallel()

	fs := bundled.WrapFS(osvfs.FS())

	var files []string

	err := fs.WalkDir(bundled.LibPath(), func(path string, d vfs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			files = append(files, tspath.GetBaseFileName(path))
		}
		return nil
	})
	assert.NilError(t, err)

	assert.DeepEqual(t, files, bundled.LibNames)
}
