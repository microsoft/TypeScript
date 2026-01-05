//go:build noembed

package bundled

import (
	"fmt"
	"os"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
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
	exe = tspath.NormalizeSlashes(exe)
	exe = osvfs.FS().Realpath(exe)
	return tspath.GetDirectoryPath(exe)
})

var libPath = sync.OnceValue(func() string {
	if testing.Testing() {
		return TestingLibPath()
	}
	dir := executableDir()

	libdts := tspath.CombinePaths(dir, "lib.d.ts")
	if info := osvfs.FS().Stat(libdts); info == nil {
		panic(fmt.Sprintf("bundled: %v does not exist; this executable may be misplaced", libdts))
	}

	return dir
})

func IsBundled(path string) bool {
	return false
}
