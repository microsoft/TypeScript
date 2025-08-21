package cachedvfs

import (
	"sync/atomic"
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type FS struct {
	fs      vfs.FS
	enabled atomic.Bool

	directoryExistsCache      collections.SyncMap[string, bool]
	fileExistsCache           collections.SyncMap[string, bool]
	getAccessibleEntriesCache collections.SyncMap[string, vfs.Entries]
	realpathCache             collections.SyncMap[string, string]
	statCache                 collections.SyncMap[string, vfs.FileInfo]
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

func (fsys *FS) DirectoryExists(path string) bool {
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

func (fsys *FS) FileExists(path string) bool {
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

func (fsys *FS) GetAccessibleEntries(path string) vfs.Entries {
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

func (fsys *FS) ReadFile(path string) (contents string, ok bool) {
	return fsys.fs.ReadFile(path)
}

func (fsys *FS) Realpath(path string) string {
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

func (fsys *FS) Remove(path string) error {
	return fsys.fs.Remove(path)
}

func (fsys *FS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	return fsys.fs.Chtimes(path, aTime, mTime)
}

func (fsys *FS) Stat(path string) vfs.FileInfo {
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

func (fsys *FS) UseCaseSensitiveFileNames() bool {
	return fsys.fs.UseCaseSensitiveFileNames()
}

func (fsys *FS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return fsys.fs.WalkDir(root, walkFn)
}

func (fsys *FS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	// !!! sheetal this needs update to caches or not?
	return fsys.fs.WriteFile(path, data, writeByteOrderMark)
}
