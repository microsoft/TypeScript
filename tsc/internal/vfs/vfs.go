package vfs

import (
	"io/fs"
)

//go:generate go tool github.com/matryer/moq -fmt goimports -out vfsmock/mock_generated.go -pkg vfsmock . FS

// FS is a file system abstraction.
type FS interface {
	// UseCaseSensitiveFileNames returns true if the file system is case-sensitive.
	UseCaseSensitiveFileNames() bool

	// FileExists returns true if the file exists.
	FileExists(path string) bool

	// ReadFile reads the file specified by path and returns the content.
	// If the file fails to be read, ok will be false.
	ReadFile(path string) (contents string, ok bool)

	WriteFile(path string, data string, writeByteOrderMark bool) error

	// Removes `path` and all its contents. Will return the first error it encounters.
	Remove(path string) error

	// DirectoryExists returns true if the path is a directory.
	DirectoryExists(path string) bool

	// GetAccessibleEntries returns the files/directories in the specified directory.
	// If any entry is a symlink, it will be followed.
	GetAccessibleEntries(path string) Entries

	Stat(path string) FileInfo

	// WalkDir walks the file tree rooted at root, calling walkFn for each file or directory in the tree.
	// It is has the same behavior as [fs.WalkDir], but with paths as [string].
	WalkDir(root string, walkFn WalkDirFunc) error

	// Realpath returns the "real path" of the specified path,
	// following symlinks and correcting filename casing.
	Realpath(path string) string
}

type Entries struct {
	Files       []string
	Directories []string
}

type (
	// DirEntry is [fs.DirEntry].
	DirEntry = fs.DirEntry

	// FileInfo is [fs.FileInfo].
	FileInfo = fs.FileInfo
)

var (
	ErrInvalid    = fs.ErrInvalid    // "invalid argument"
	ErrPermission = fs.ErrPermission // "permission denied"
	ErrExist      = fs.ErrExist      // "file already exists"
	ErrNotExist   = fs.ErrNotExist   // "file does not exist"
	ErrClosed     = fs.ErrClosed     // "file already closed"
)

// WalkDirFunc is [fs.WalkDirFunc].
type WalkDirFunc = fs.WalkDirFunc

var (
	// SkipAll is [fs.SkipAll].
	SkipAll = fs.SkipAll //nolint:errname

	// SkipDir is [fs.SkipDir].
	SkipDir = fs.SkipDir //nolint:errname
)
