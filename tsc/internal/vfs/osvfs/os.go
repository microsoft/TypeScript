package osvfs

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/internal"
)

// FS creates a new FS from the OS file system.
func FS() vfs.FS {
	return osVFS
}

var osVFS vfs.FS = &osFS{
	common: internal.Common{
		RootFor:  os.DirFS,
		Realpath: osFSRealpath,
	},
}

type osFS struct {
	common internal.Common
}

// We do this right at startup to minimize the chance that executable gets moved or deleted.
var isFileSystemCaseSensitive = func() bool {
	// win32/win64 are case insensitive platforms
	if runtime.GOOS == "windows" {
		return false
	}

	if runtime.GOARCH == "wasm" {
		// !!! Who knows; this depends on the host implementation.
		return true
	}

	// As a proxy for case-insensitivity, we check if the current executable exists under a different case.
	// This is not entirely correct, since different OSs can have differing case sensitivity in different paths,
	// but this is largely good enough for our purposes (and what sys.ts used to do with __filename).
	exe, err := os.Executable()
	if err != nil {
		panic(fmt.Sprintf("vfs: failed to get executable path: %v", err))
	}

	// If the current executable exists under a different case, we must be case-insensitive.
	swapped := swapCase(exe)
	if _, err := os.Stat(swapped); err != nil {
		if os.IsNotExist(err) {
			return true
		}
		panic(fmt.Sprintf("vfs: failed to stat %q: %v", swapped, err))
	}
	return false
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

var readSema = make(chan struct{}, 128)

func (vfs *osFS) ReadFile(path string) (contents string, ok bool) {
	// Limit ourselves to fewer open files, which greatly reduces IO contention.
	readSema <- struct{}{}
	defer func() { <-readSema }()

	return vfs.common.ReadFile(path)
}

func (vfs *osFS) DirectoryExists(path string) bool {
	return vfs.common.DirectoryExists(path)
}

func (vfs *osFS) FileExists(path string) bool {
	return vfs.common.FileExists(path)
}

func (vfs *osFS) GetAccessibleEntries(path string) vfs.Entries {
	return vfs.common.GetAccessibleEntries(path)
}

func (vfs *osFS) Stat(path string) vfs.FileInfo {
	return vfs.common.Stat(path)
}

func (vfs *osFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return vfs.common.WalkDir(root, walkFn)
}

func (vfs *osFS) Realpath(path string) string {
	return osFSRealpath(path)
}

func osFSRealpath(path string) string {
	_ = internal.RootLength(path) // Assert path is rooted

	orig := path
	path = filepath.FromSlash(path)
	path, err := realpath(path)
	if err != nil {
		return orig
	}
	path, err = filepath.Abs(path)
	if err != nil {
		return orig
	}
	return tspath.NormalizeSlashes(path)
}

var writeSema = make(chan struct{}, 32)

func (vfs *osFS) writeFile(path string, content string, writeByteOrderMark bool) error {
	writeSema <- struct{}{}
	defer func() { <-writeSema }()

	file, err := os.Create(path)
	if err != nil {
		return err
	}
	defer file.Close()

	if writeByteOrderMark {
		if _, err := file.WriteString("\uFEFF"); err != nil {
			return err
		}
	}

	if _, err := file.WriteString(content); err != nil {
		return err
	}

	return nil
}

func (vfs *osFS) ensureDirectoryExists(directoryPath string) error {
	return os.MkdirAll(directoryPath, 0o777)
}

func (vfs *osFS) WriteFile(path string, content string, writeByteOrderMark bool) error {
	_ = internal.RootLength(path) // Assert path is rooted
	if err := vfs.writeFile(path, content, writeByteOrderMark); err == nil {
		return nil
	}
	if err := vfs.ensureDirectoryExists(tspath.GetDirectoryPath(tspath.NormalizePath(path))); err != nil {
		return err
	}
	return vfs.writeFile(path, content, writeByteOrderMark)
}

func (vfs *osFS) Remove(path string) error {
	// todo: #701 add retry mechanism?
	return os.RemoveAll(path)
}
