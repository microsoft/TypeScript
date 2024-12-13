package vfs

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
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

// We do this right at startup to minimize the chance that executable gets moved or deleted.
var isFileSystemCaseSensitive = func() bool {
	// win32/win64 are case insensitive platforms
	if runtime.GOOS == "windows" {
		return false
	}

	// As a proxy for case-insensitivity, we check if the current executable exists under a different case.
	// This is not entirely correct, since different OSs can have differing case sensitivity in different paths,
	// but this is largely good enough for our purposes (and what sys.ts used to do with __filename).
	exe, err := os.Executable()
	if err != nil {
		panic(fmt.Sprintf("vfs: failed to get executable path: %v", err))
	}

	// If the current executable exists under a different case, we must be case-insensitve.
	swapped := swapCase(exe)
	if _, err := os.Stat(swapped); err != nil {
		if os.IsNotExist(err) {
			return false
		}
		panic(fmt.Sprintf("vfs: failed to stat %q: %v", swapped, err))
	}
	return true
}()

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
	return isFileSystemCaseSensitive
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
