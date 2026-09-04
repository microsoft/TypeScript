package wrapvfs

import (
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type Replacements struct {
	CaseSensitivity      func() tspath.CaseSensitivity
	FileExists           func(tspath.RootedFilePath) bool
	ReadFile             func(tspath.RootedFilePath) (string, bool)
	WriteFile            func(tspath.RootedFilePath, string) error
	AppendFile           func(tspath.RootedFilePath, string) error
	Remove               func(tspath.RootedPath) error
	Chtimes              func(tspath.RootedPath, time.Time, time.Time) error
	DirectoryExists      func(tspath.RootedDirectoryPath) bool
	GetAccessibleEntries func(tspath.RootedDirectoryPath) vfs.Entries
	Stat                 func(tspath.RootedPath) vfs.FileInfo
	WalkDir              func(tspath.RootedDirectoryPath, vfs.WalkDirFunc) error
	Realpath             func(tspath.RootedPath) tspath.RootedPath
}

func Wrap(fs vfs.FS, replacements Replacements) vfs.FS {
	return &wrappedFS{
		fs:           fs,
		replacements: replacements,
	}
}

type wrappedFS struct {
	fs           vfs.FS
	replacements Replacements
}

// CaseSensitivity implements [vfs.FS].
func (w *wrappedFS) CaseSensitivity() tspath.CaseSensitivity {
	if w.replacements.CaseSensitivity != nil {
		return w.replacements.CaseSensitivity()
	}
	return w.fs.CaseSensitivity()
}

// FileExists implements [vfs.FS].
func (w *wrappedFS) FileExists(path tspath.RootedFilePath) bool {
	if w.replacements.FileExists != nil {
		return w.replacements.FileExists(path)
	}
	return w.fs.FileExists(path)
}

// ReadFile implements [vfs.FS].
func (w *wrappedFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	if w.replacements.ReadFile != nil {
		return w.replacements.ReadFile(path)
	}
	return w.fs.ReadFile(path)
}

// WriteFile implements [vfs.FS].
func (w *wrappedFS) WriteFile(path tspath.RootedFilePath, data string) error {
	if w.replacements.WriteFile != nil {
		return w.replacements.WriteFile(path, data)
	}
	return w.fs.WriteFile(path, data)
}

// AppendFile implements [vfs.FS].
func (w *wrappedFS) AppendFile(path tspath.RootedFilePath, data string) error {
	if w.replacements.AppendFile != nil {
		return w.replacements.AppendFile(path, data)
	}
	return w.fs.AppendFile(path, data)
}

// Remove implements [vfs.FS].
func (w *wrappedFS) Remove(path tspath.RootedPath) error {
	if w.replacements.Remove != nil {
		return w.replacements.Remove(path)
	}
	return w.fs.Remove(path)
}

// Chtimes implements [vfs.FS].
func (w *wrappedFS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	if w.replacements.Chtimes != nil {
		return w.replacements.Chtimes(path, aTime, mTime)
	}
	return w.fs.Chtimes(path, aTime, mTime)
}

// DirectoryExists implements [vfs.FS].
func (w *wrappedFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	if w.replacements.DirectoryExists != nil {
		return w.replacements.DirectoryExists(path)
	}
	return w.fs.DirectoryExists(path)
}

// GetAccessibleEntries implements [vfs.FS].
func (w *wrappedFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	if w.replacements.GetAccessibleEntries != nil {
		return w.replacements.GetAccessibleEntries(path)
	}
	return w.fs.GetAccessibleEntries(path)
}

// Stat implements [vfs.FS].
func (w *wrappedFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	if w.replacements.Stat != nil {
		return w.replacements.Stat(path)
	}
	return w.fs.Stat(path)
}

// WalkDir implements [vfs.FS].
func (w *wrappedFS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	if w.replacements.WalkDir != nil {
		return w.replacements.WalkDir(root, walkFn)
	}
	return w.fs.WalkDir(root, walkFn)
}

// Realpath implements [vfs.FS].
func (w *wrappedFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	if w.replacements.Realpath != nil {
		return w.replacements.Realpath(path)
	}
	return w.fs.Realpath(path)
}

var _ vfs.FS = (*wrappedFS)(nil)
