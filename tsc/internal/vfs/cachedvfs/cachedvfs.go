package cachedvfs

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type FS struct {
	fs vfs.FS

	directoryExistsCache      collections.SyncMap[string, bool]
	fileExistsCache           collections.SyncMap[string, bool]
	getAccessibleEntriesCache collections.SyncMap[string, vfs.Entries]
	realpathCache             collections.SyncMap[string, string]
	statCache                 collections.SyncMap[string, vfs.FileInfo]
}

var _ vfs.FS = (*FS)(nil)

func From(fs vfs.FS) *FS {
	return &FS{fs: fs}
}

func (fsys *FS) ClearCache() {
	fsys.directoryExistsCache.Clear()
	fsys.fileExistsCache.Clear()
	fsys.getAccessibleEntriesCache.Clear()
	fsys.realpathCache.Clear()
	fsys.statCache.Clear()
}

func (fsys *FS) DirectoryExists(path string) bool {
	if ret, ok := fsys.directoryExistsCache.Load(path); ok {
		return ret
	}
	ret := fsys.fs.DirectoryExists(path)
	fsys.directoryExistsCache.Store(path, ret)
	return ret
}

func (fsys *FS) FileExists(path string) bool {
	if ret, ok := fsys.fileExistsCache.Load(path); ok {
		return ret
	}
	ret := fsys.fs.FileExists(path)
	fsys.fileExistsCache.Store(path, ret)
	return ret
}

func (fsys *FS) GetAccessibleEntries(path string) vfs.Entries {
	if ret, ok := fsys.getAccessibleEntriesCache.Load(path); ok {
		return ret
	}
	ret := fsys.fs.GetAccessibleEntries(path)
	fsys.getAccessibleEntriesCache.Store(path, ret)
	return ret
}

func (fsys *FS) ReadFile(path string) (contents string, ok bool) {
	return fsys.fs.ReadFile(path)
}

func (fsys *FS) Realpath(path string) string {
	if ret, ok := fsys.realpathCache.Load(path); ok {
		return ret
	}
	ret := fsys.fs.Realpath(path)
	fsys.realpathCache.Store(path, ret)
	return ret
}

func (fsys *FS) Remove(path string) error {
	return fsys.fs.Remove(path)
}

func (fsys *FS) Stat(path string) vfs.FileInfo {
	if ret, ok := fsys.statCache.Load(path); ok {
		return ret.(vfs.FileInfo)
	}
	ret := fsys.fs.Stat(path)
	fsys.statCache.Store(path, ret)
	return ret
}

func (fsys *FS) UseCaseSensitiveFileNames() bool {
	return fsys.fs.UseCaseSensitiveFileNames()
}

func (fsys *FS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return fsys.fs.WalkDir(root, walkFn)
}

func (fsys *FS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	return fsys.fs.WriteFile(path, data, writeByteOrderMark)
}
