package osvfs

import (
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"time"
	"unicode"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/nativepath"
	"github.com/microsoft/TypeScript/tsc/internal/osutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/internal"
)

var (
	// Semaphore for operations that are effectively blocking syscalls.
	blockingOpSema = core.NewLimitedSemaphore(128)
	// Semaphore for file reads.
	readSema = core.NewLimitedSemaphore(128)
	// Semaphore for file writes.
	writeSema = core.NewLimitedSemaphore(32)
)

// FS creates a new FS from the OS file system.
func FS() vfs.FS {
	return osVFS
}

var osVFS vfs.FS = &osFS{
	common: internal.Common{
		RootFor:        os.DirFS,
		IsReparsePoint: isReparsePoint,
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
	exe, err := osutil.Executable()
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

func (vfs *osFS) CaseSensitivity() tspath.CaseSensitivity {
	if isFileSystemCaseSensitive {
		return tspath.CaseSensitive
	}
	return tspath.CaseInsensitive
}

func (vfs *osFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	defer readSema.Acquire()()
	return vfs.common.ReadFile(path)
}

func (vfs *osFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	defer blockingOpSema.Acquire()()
	return vfs.common.DirectoryExists(path)
}

func (vfs *osFS) FileExists(path tspath.RootedFilePath) bool {
	defer blockingOpSema.Acquire()()
	return vfs.common.FileExists(path)
}

func (vfs *osFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	defer blockingOpSema.Acquire()()
	return vfs.common.GetAccessibleEntries(path)
}

func (vfs *osFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	defer blockingOpSema.Acquire()()
	return vfs.common.Stat(path)
}

var limitedWalkDirFuncPool = sync.Pool{
	New: func() any {
		w := &limitedWalkDirFunc{}
		w.walk = w.walker
		return w
	},
}

func getLimitedWalkDirFunc(walkFn vfs.WalkDirFunc) *limitedWalkDirFunc {
	w := limitedWalkDirFuncPool.Get().(*limitedWalkDirFunc)
	w.inner = walkFn
	return w
}

func putLimitedWalkDirFunc(w *limitedWalkDirFunc) {
	w.inner = nil
	limitedWalkDirFuncPool.Put(w)
}

type limitedWalkDirFunc struct {
	inner vfs.WalkDirFunc
	walk  vfs.WalkDirFunc
}

func (w *limitedWalkDirFunc) walker(path tspath.RootedPath, d fs.DirEntry, err error) error {
	defer blockingOpSema.Acquire()()
	return w.inner(path, d, err)
}

func (vfs *osFS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	walker := getLimitedWalkDirFunc(walkFn)
	defer putLimitedWalkDirFunc(walker)
	return vfs.common.WalkDir(root, walker.walk)
}

func (vfs *osFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	defer blockingOpSema.Acquire()()
	return osFSRealpath(path)
}

func osFSRealpath(path tspath.RootedPath) tspath.RootedPath {
	orig := path
	nativePath := filepath.FromSlash(path.AsString())
	nativePath, err := nativepath.Realpath(nativePath)
	if err != nil {
		return orig
	}
	nativePath, err = filepath.Abs(nativePath)
	if err != nil {
		return orig
	}
	return tspath.RootedPathFromAbsolute(nativePath)
}

func isReparsePoint(path string) bool {
	return nativepath.IsSymlinkOrReparsePoint(filepath.FromSlash(path))
}

func (vfs *osFS) writeFileWithFlag(path string, content string, flag int) error {
	defer writeSema.Acquire()()

	file, err := os.OpenFile(path, flag, 0o666)
	if err != nil {
		return err
	}
	defer file.Close()

	if _, err := file.WriteString(content); err != nil {
		return err
	}

	return nil
}

func (vfs *osFS) ensureDirectoryExists(directoryPath string) error {
	defer blockingOpSema.Acquire()()
	return os.MkdirAll(directoryPath, 0o777)
}

func (vfs *osFS) writeFileEnsuringDir(path tspath.RootedFilePath, content string, flag int) error {
	pathString := path.AsString()
	if err := vfs.writeFileWithFlag(pathString, content, flag); err == nil {
		return nil
	}
	if err := vfs.ensureDirectoryExists(path.Directory().AsString()); err != nil {
		return err
	}
	return vfs.writeFileWithFlag(pathString, content, flag)
}

func (vfs *osFS) WriteFile(path tspath.RootedFilePath, content string) error {
	return vfs.writeFileEnsuringDir(path, content, os.O_WRONLY|os.O_CREATE|os.O_TRUNC)
}

func (vfs *osFS) AppendFile(path tspath.RootedFilePath, content string) error {
	return vfs.writeFileEnsuringDir(path, content, os.O_WRONLY|os.O_CREATE|os.O_APPEND)
}

func (vfs *osFS) Remove(path tspath.RootedPath) error {
	defer blockingOpSema.Acquire()()
	// todo: #701 add retry mechanism?
	return os.RemoveAll(path.AsString())
}

func (vfs *osFS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	defer blockingOpSema.Acquire()()
	return os.Chtimes(path.AsString(), aTime, mTime)
}

func GetGlobalTypingsCacheLocation() string {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		cacheDir = os.TempDir()
	}

	var subdir string
	if runtime.GOOS == "windows" {
		subdir = "Microsoft/TypeScript"
	} else {
		subdir = "typescript"
	}
	return tspath.CombinePaths(cacheDir, subdir, core.VersionMajorMinor())
}
