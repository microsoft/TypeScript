package vfs

import (
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"unicode"

	"github.com/microsoft/typescript-go/internal/tspath"
)

// FromOS creates a new FS from the OS file system.
func FromOS() FS {
	return osVFS
}

var osVFS FS = &osFS{
	common: common{
		rootFor: os.DirFS,
	},
}

type osFS struct {
	common
}

var isFileSystemCaseSensitive = sync.OnceValue(func() bool {
	// win32/win64 are case insensitive platforms
	if runtime.GOOS == "windows" {
		return false
	}

	// If the current executable exists under a different case, we must be case-insensitve.
	if _, err := os.Stat(swapCase(os.Args[0])); os.IsNotExist(err) {
		return false
	}
	return true
})

// Convert all lowercase chars to uppercase, and vice-versa
func swapCase(str string) string {
	return strings.Map(func(r rune) rune {
		upper := unicode.ToUpper(r)
		if upper == r {
			return unicode.ToLower(r)
		} else {
			return upper
		}
	}, str)
}

func (vfs *osFS) UseCaseSensitiveFileNames() bool {
	return isFileSystemCaseSensitive()
}

var osReadSema = make(chan struct{}, 128)

func (vfs *osFS) ReadFile(path string) (contents string, ok bool) {
	osReadSema <- struct{}{}
	defer func() { <-osReadSema }()

	return vfs.common.ReadFile(path)
}

func (vfs *osFS) Realpath(path string) string {
	_ = rootLength(path) // Assert path is rooted

	orig := path
	path = filepath.FromSlash(path)
	path, err := filepath.EvalSymlinks(path)
	if err != nil {
		return orig
	}
	path, err = filepath.Abs(path)
	if err != nil {
		return orig
	}
	return tspath.NormalizeSlashes(path)
}
