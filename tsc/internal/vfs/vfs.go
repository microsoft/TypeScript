package vfs

import (
	"io/fs"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

//go:generate go tool github.com/matryer/moq -fmt goimports -out vfsmock/mock_generated.go -pkg vfsmock . FS
//go:generate npx dprint fmt vfsmock/mock_generated.go

// FS is a file system abstraction over rooted, normalized paths. Operations
// declare whether they require a file, directory, or either kind of path.
type FS interface {
	// CaseSensitivity returns whether path comparison is case-sensitive.
	CaseSensitivity() tspath.CaseSensitivity

	// FileExists returns true if the file exists.
	FileExists(path tspath.RootedFilePath) bool

	// ReadFile reads the file specified by path and returns the content.
	// If the file fails to be read, ok will be false.
	ReadFile(path tspath.RootedFilePath) (contents string, ok bool)

	WriteFile(path tspath.RootedFilePath, data string) error

	// AppendFile appends data to the file at path, creating it if it does not exist.
	AppendFile(path tspath.RootedFilePath, data string) error

	// Removes `path` and all its contents. Will return the first error it encounters.
	Remove(path tspath.RootedPath) error

	// Chtimes changes the access and modification times of the named
	Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error

	// DirectoryExists returns true if the path is a directory.
	DirectoryExists(path tspath.RootedDirectoryPath) bool

	// GetAccessibleEntries returns the files/directories in the specified directory.
	// If any entry is a symlink, it will be followed.
	GetAccessibleEntries(path tspath.RootedDirectoryPath) Entries

	Stat(path tspath.RootedPath) FileInfo

	// WalkDir walks the file tree rooted at root, calling walkFn for each file or directory in the tree.
	// It has the same behavior as [fs.WalkDir], but reports rooted, normalized
	// [tspath.RootedPath] paths.
	WalkDir(root tspath.RootedDirectoryPath, walkFn WalkDirFunc) error

	// Realpath returns the "real path" of the specified path,
	// following symlinks and correcting filename casing.
	Realpath(path tspath.RootedPath) tspath.RootedPath
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
type WalkDirFunc func(path tspath.RootedPath, d fs.DirEntry, err error) error

var (
	// SkipAll is [fs.SkipAll].
	SkipAll = fs.SkipAll //nolint:errname

	// SkipDir is [fs.SkipDir].
	SkipDir = fs.SkipDir //nolint:errname
)
