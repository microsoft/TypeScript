// Package bundled provides access to files bundled with TypeScript.
package bundled

import (
	"path/filepath"
	"runtime"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

//go:generate go run generate.go

// Define the below here to consolidate documentation.

// Embedded is true if the bundled files are implemented through an embedded FS.
const Embedded = embedded

// WrapFS returns an FS which redirects embedded paths to the embedded file system.
// If the embedded file system is not available, it returns the original FS.
func WrapFS(fs vfs.FS) vfs.FS {
	return wrapFS(fs)
}

// LibPath returns the path to the directory containing the bundled lib.d.ts files.
// If embedding is not enabled, this is a path on disk, and must be accessed through
// a real OS filesystem.
func LibPath() string {
	return libPath()
}

var bundledSourceDir = sync.OnceValue(func() string {
	_, filename, _, ok := runtime.Caller(0)
	if !ok {
		panic("bundled: could not get current filename")
	}
	return filepath.Dir(filepath.FromSlash(filename))
})

var testingLibPath = sync.OnceValue(func() string {
	if !testing.Testing() {
		panic("bundled: TestingLibPath should only be called during tests")
	}
	return tspath.NormalizeSlashes(filepath.Join(bundledSourceDir(), "libs"))
})

// TestingLibPath returns the path to the source bundled libs directory.
// It's only valid to use in tests where the source code is available.
func TestingLibPath() string {
	return testingLibPath()
}
