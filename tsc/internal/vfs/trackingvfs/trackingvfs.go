// Package trackingvfs provides a VFS wrapper that records every file path
// accessed during compilation. This allows watch mode to know exactly which
// files and directories the compiler depended on, including non-existent
// paths from failed module resolution.
package trackingvfs

import (
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// FS wraps a vfs.FS and records every path accessed via read-like operations.
// Write operations (WriteFile, Remove, Chtimes) are not tracked since they
// represent outputs, not dependencies.
type FS struct {
	Inner     vfs.FS
	SeenFiles collections.SyncSet[tspath.RootedPath]
}

var _ vfs.FS = (*FS)(nil)

func (fs *FS) ReadFile(path tspath.RootedFilePath) (string, bool) {
	fs.SeenFiles.Add(path.AsPath())
	return fs.Inner.ReadFile(path)
}

func (fs *FS) FileExists(path tspath.RootedFilePath) bool {
	fs.SeenFiles.Add(path.AsPath())
	return fs.Inner.FileExists(path)
}

func (fs *FS) CaseSensitivity() tspath.CaseSensitivity { return fs.Inner.CaseSensitivity() }

func (fs *FS) WriteFile(path tspath.RootedFilePath, data string) error {
	return fs.Inner.WriteFile(path, data)
}

func (fs *FS) AppendFile(path tspath.RootedFilePath, data string) error {
	return fs.Inner.AppendFile(path, data)
}

func (fs *FS) Remove(path tspath.RootedPath) error { return fs.Inner.Remove(path) }

func (fs *FS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	return fs.Inner.Chtimes(path, aTime, mTime)
}

func (fs *FS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	fs.SeenFiles.Add(path.AsPath())
	return fs.Inner.DirectoryExists(path)
}

func (fs *FS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	fs.SeenFiles.Add(path.AsPath())
	return fs.Inner.GetAccessibleEntries(path)
}

func (fs *FS) Stat(path tspath.RootedPath) vfs.FileInfo {
	fs.SeenFiles.Add(path)
	return fs.Inner.Stat(path)
}

func (fs *FS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	fs.SeenFiles.Add(root.AsPath())
	return fs.Inner.WalkDir(root, func(path tspath.RootedPath, d vfs.DirEntry, err error) error {
		fs.SeenFiles.Add(path)
		return walkFn(path, d, err)
	})
}

func (fs *FS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	fs.SeenFiles.Add(path)
	return fs.Inner.Realpath(path)
}
