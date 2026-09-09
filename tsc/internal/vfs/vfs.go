package vfs

import (
	"io/fs"
	"time"
)

//go:generate go tool github.com/matryer/moq -fmt goimports -out vfsmock/mock_generated.go -pkg vfsmock . FS
//go:generate npx dprint fmt vfsmock/mock_generated.go

// FS is a file system abstraction.
type FS interface {
	// UseCaseSensitiveFileNames returns true if the file system is case-sensitive.
	UseCaseSensitiveFileNames() bool

	// FileExists returns true if the file exists.
	FileExists(path string) bool

	// ReadFile reads the file specified by path and returns the content.
	// If the file fails to be read, ok will be false.
	ReadFile(path string) (contents string, ok bool)

	WriteFile(path string, data string) error

	// AppendFile appends data to the file at path, creating it if it does not exist.
	AppendFile(path string, data string) error

	// Removes `path` and all its contents. Will return the first error it encounters.
	Remove(path string) error

	// Chtimes changes the access and modification times of the named
	Chtimes(path string, aTime time.Time, mTime time.Time) error

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

// RealpathWithParent allows a filesystem to reuse the caller's cached parent
// resolution. It has the same result and failure semantics as FS.Realpath.
// The callback must resolve paths on this filesystem, not on the host OS.
func RealpathWithParent(fs FS, path string, realpath func(string) string) string {
	if resolver, ok := fs.(interface {
		RealpathWithParent(path string, realpath func(string) string) string
	}); ok {
		return resolver.RealpathWithParent(path, realpath)
	}
	return fs.Realpath(path)
}

type Entries struct {
	Files       []string
	Directories []string
	// Symlinks contains the names of entries in Files or Directories that were
	// originally symbolic links (or reparse points) on disk. The names are the
	// same as those in Files/Directories (i.e., the link name, not the target).
	// nil means symlink information is not available and the entries may need
	// to be re-checked for symlinks.
	Symlinks map[string]struct{}
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
