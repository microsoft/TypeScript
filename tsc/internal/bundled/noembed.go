//go:build noembed

package bundled

import (
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

const embedded = false

func wrapFS(fs vfs.FS) vfs.FS {
	return fs
}

var executableDir = sync.OnceValue(func() string {
	exe, err := os.Executable()
	if err != nil {
		panic(fmt.Sprintf("bundled: failed to get executable path: %v", err))
	}
	exe, err = filepath.EvalSymlinks(exe)
	if err != nil {
		panic(fmt.Sprintf("bundled: failed to evaluate symlinks: %v", err))
	}
	return filepath.Dir(exe)
})

var libPath = sync.OnceValue(func() string {
	if testing.Testing() {
		return TestingLibPath()
	}
	dir := executableDir()

	libdts := filepath.Join(dir, "lib.d.ts")
	if _, err := os.Stat(libdts); err != nil {
		panic(fmt.Sprintf("bundled: %v does not exist; this executable may be misplaced", libdts))
	}

	return tspath.NormalizeSlashes(dir)
})
