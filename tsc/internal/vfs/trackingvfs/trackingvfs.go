// Package trackingvfs provides a VFS wrapper that records every file path
// accessed during compilation. This allows watch mode to know exactly which
// files and directories the compiler depended on, including non-existent
// paths from failed module resolution.
package trackingvfs

import (
	"time"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/vfs"
)

// FS wraps a vfs.FS and records every path accessed via read-like operations.
// Write operations (WriteFile, Remove, Chtimes) are not tracked since they
// represent outputs, not dependencies.
type FS struct {
	Inner     vfs.FS
	SeenFiles collections.SyncSet[string]
}

var _ vfs.FS = (*FS)(nil)

func (fs *FS) ReadFile(path string) (string, bool) {
	fs.SeenFiles.Add(path)
	return fs.Inner.ReadFile(path)
}

func (fs *FS) FileExists(path string) bool {
	fs.SeenFiles.Add(path)
	return fs.Inner.FileExists(path)
}

func (fs *FS) UseCaseSensitiveFileNames() bool { return fs.Inner.UseCaseSensitiveFileNames() }

func (fs *FS) WriteFile(path string, data string) error {
	return fs.Inner.WriteFile(path, data)
}

func (fs *FS) Remove(path string) error { return fs.Inner.Remove(path) }

func (fs *FS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	return fs.Inner.Chtimes(path, aTime, mTime)
}

func (fs *FS) DirectoryExists(path string) bool {
	fs.SeenFiles.Add(path)
	return fs.Inner.DirectoryExists(path)
}

func (fs *FS) GetAccessibleEntries(path string) vfs.Entries {
	fs.SeenFiles.Add(path)
	return fs.Inner.GetAccessibleEntries(path)
}

func (fs *FS) Stat(path string) vfs.FileInfo {
	fs.SeenFiles.Add(path)
	return fs.Inner.Stat(path)
}

func (fs *FS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	fs.SeenFiles.Add(root)
	return fs.Inner.WalkDir(root, func(path string, d vfs.DirEntry, err error) error {
		fs.SeenFiles.Add(path)
		return walkFn(path, d, err)
	})
}

func (fs *FS) Realpath(path string) string { return fs.Inner.Realpath(path) }
