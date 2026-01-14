package wrapvfs

import (
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
)

type Replacements struct {
	UseCaseSensitiveFileNames func() bool
	FileExists                func(string) bool
	ReadFile                  func(string) (string, bool)
	WriteFile                 func(string, string, bool) error
	Remove                    func(string) error
	Chtimes                   func(string, time.Time, time.Time) error
	DirectoryExists           func(string) bool
	GetAccessibleEntries      func(string) vfs.Entries
	Stat                      func(string) vfs.FileInfo
	WalkDir                   func(string, vfs.WalkDirFunc) error
	Realpath                  func(string) string
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

// UseCaseSensitiveFileNames implements [vfs.FS].
func (w *wrappedFS) UseCaseSensitiveFileNames() bool {
	if w.replacements.UseCaseSensitiveFileNames != nil {
		return w.replacements.UseCaseSensitiveFileNames()
	}
	return w.fs.UseCaseSensitiveFileNames()
}

// FileExists implements [vfs.FS].
func (w *wrappedFS) FileExists(path string) bool {
	if w.replacements.FileExists != nil {
		return w.replacements.FileExists(path)
	}
	return w.fs.FileExists(path)
}

// ReadFile implements [vfs.FS].
func (w *wrappedFS) ReadFile(path string) (contents string, ok bool) {
	if w.replacements.ReadFile != nil {
		return w.replacements.ReadFile(path)
	}
	return w.fs.ReadFile(path)
}

// WriteFile implements [vfs.FS].
func (w *wrappedFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	if w.replacements.WriteFile != nil {
		return w.replacements.WriteFile(path, data, writeByteOrderMark)
	}
	return w.fs.WriteFile(path, data, writeByteOrderMark)
}

// Remove implements [vfs.FS].
func (w *wrappedFS) Remove(path string) error {
	if w.replacements.Remove != nil {
		return w.replacements.Remove(path)
	}
	return w.fs.Remove(path)
}

// Chtimes implements [vfs.FS].
func (w *wrappedFS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	if w.replacements.Chtimes != nil {
		return w.replacements.Chtimes(path, aTime, mTime)
	}
	return w.fs.Chtimes(path, aTime, mTime)
}

// DirectoryExists implements [vfs.FS].
func (w *wrappedFS) DirectoryExists(path string) bool {
	if w.replacements.DirectoryExists != nil {
		return w.replacements.DirectoryExists(path)
	}
	return w.fs.DirectoryExists(path)
}

// GetAccessibleEntries implements [vfs.FS].
func (w *wrappedFS) GetAccessibleEntries(path string) vfs.Entries {
	if w.replacements.GetAccessibleEntries != nil {
		return w.replacements.GetAccessibleEntries(path)
	}
	return w.fs.GetAccessibleEntries(path)
}

// Stat implements [vfs.FS].
func (w *wrappedFS) Stat(path string) vfs.FileInfo {
	if w.replacements.Stat != nil {
		return w.replacements.Stat(path)
	}
	return w.fs.Stat(path)
}

// WalkDir implements [vfs.FS].
func (w *wrappedFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	if w.replacements.WalkDir != nil {
		return w.replacements.WalkDir(root, walkFn)
	}
	return w.fs.WalkDir(root, walkFn)
}

// Realpath implements [vfs.FS].
func (w *wrappedFS) Realpath(path string) string {
	if w.replacements.Realpath != nil {
		return w.replacements.Realpath(path)
	}
	return w.fs.Realpath(path)
}

var _ vfs.FS = (*wrappedFS)(nil)
