package cachedvfs

import (
	"sync/atomic"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type FS struct {
	fs      vfs.FS
	enabled atomic.Bool

	directoryExistsCache      collections.SyncMap[tspath.RootedDirectoryPath, bool]
	fileExistsCache           collections.SyncMap[tspath.RootedFilePath, bool]
	getAccessibleEntriesCache collections.SyncMap[tspath.RootedDirectoryPath, vfs.Entries]
	realpathCache             collections.SyncMap[tspath.RootedPath, tspath.RootedPath]
	statCache                 collections.SyncMap[tspath.RootedPath, vfs.FileInfo]
}

var _ vfs.FS = (*FS)(nil)

func From(fs vfs.FS) *FS {
	fsys := &FS{fs: fs}
	fsys.enabled.Store(true)
	return fsys
}

func (fsys *FS) DisableAndClearCache() {
	if fsys.enabled.CompareAndSwap(true, false) {
		fsys.ClearCache()
	}
}

func (fsys *FS) Enable() {
	fsys.enabled.Store(true)
}

func (fsys *FS) ClearCache() {
	fsys.directoryExistsCache.Clear()
	fsys.fileExistsCache.Clear()
	fsys.getAccessibleEntriesCache.Clear()
	fsys.realpathCache.Clear()
	fsys.statCache.Clear()
}

func (fsys *FS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	if fsys.enabled.Load() {
		if ret, ok := fsys.directoryExistsCache.Load(path); ok {
			return ret
		}
	}

	ret := fsys.fs.DirectoryExists(path)

	if fsys.enabled.Load() {
		fsys.directoryExistsCache.Store(path, ret)
	}

	return ret
}

func (fsys *FS) FileExists(path tspath.RootedFilePath) bool {
	if fsys.enabled.Load() {
		if ret, ok := fsys.fileExistsCache.Load(path); ok {
			return ret
		}
	}

	ret := fsys.fs.FileExists(path)

	if fsys.enabled.Load() {
		fsys.fileExistsCache.Store(path, ret)
	}

	return ret
}

func (fsys *FS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	if fsys.enabled.Load() {
		if ret, ok := fsys.getAccessibleEntriesCache.Load(path); ok {
			return ret
		}
	}

	ret := fsys.fs.GetAccessibleEntries(path)

	if fsys.enabled.Load() {
		fsys.getAccessibleEntriesCache.Store(path, ret)
	}

	return ret
}

func (fsys *FS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	return fsys.fs.ReadFile(path)
}

func (fsys *FS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	if fsys.enabled.Load() {
		if ret, ok := fsys.realpathCache.Load(path); ok {
			return ret
		}
	}

	ret := fsys.fs.Realpath(path)

	if fsys.enabled.Load() {
		fsys.realpathCache.Store(path, ret)
	}

	return ret
}

func (fsys *FS) Remove(path tspath.RootedPath) error {
	return fsys.fs.Remove(path)
}

func (fsys *FS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	return fsys.fs.Chtimes(path, aTime, mTime)
}

func (fsys *FS) Stat(path tspath.RootedPath) vfs.FileInfo {
	if fsys.enabled.Load() {
		if ret, ok := fsys.statCache.Load(path); ok {
			return ret
		}
	}

	ret := fsys.fs.Stat(path)

	if fsys.enabled.Load() {
		fsys.statCache.Store(path, ret)
	}

	return ret
}

func (fsys *FS) CaseSensitivity() tspath.CaseSensitivity {
	return fsys.fs.CaseSensitivity()
}

func (fsys *FS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	return fsys.fs.WalkDir(root, walkFn)
}

func (fsys *FS) WriteFile(path tspath.RootedFilePath, data string) error {
	return fsys.fs.WriteFile(path, data)
}

func (fsys *FS) AppendFile(path tspath.RootedFilePath, data string) error {
	return fsys.fs.AppendFile(path, data)
}
