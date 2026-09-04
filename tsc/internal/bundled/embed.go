//go:build !noembed

package bundled

import (
	"io/fs"
	"strings"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

const embedded = true

const scheme = "bundled:///"

func splitPath(path string) (rest string, ok bool) {
	return strings.CutPrefix(path, scheme)
}

func libPath() string {
	return scheme + "libs"
}

func IsBundled(path string) bool {
	_, ok := splitPath(path)
	return ok
}

// wrappedFS is implemented directly rather than going through [io/fs.FS].
// Our vfs.FS works with file contents in terms of strings, and that's
// what go:embed does under the hood, but going through fs.FS will cause
// copying to []byte and back.

type wrappedFS struct {
	fs vfs.FS
}

var _ vfs.FS = (*wrappedFS)(nil)

func wrapFS(fs vfs.FS) vfs.FS {
	return &wrappedFS{fs: fs}
}

func (vfs *wrappedFS) CaseSensitivity() tspath.CaseSensitivity {
	return vfs.fs.CaseSensitivity()
}

func (vfs *wrappedFS) FileExists(path tspath.RootedFilePath) bool {
	if rest, ok := splitPath(path.AsString()); ok {
		_, ok := embeddedContents[rest]
		return ok
	}
	return vfs.fs.FileExists(path)
}

func (vfs *wrappedFS) ReadFile(path tspath.RootedFilePath) (contents string, ok bool) {
	if rest, ok := splitPath(path.AsString()); ok {
		contents, ok = embeddedContents[rest]
		return contents, ok
	}
	return vfs.fs.ReadFile(path)
}

func (vfs *wrappedFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	if rest, ok := splitPath(path.AsString()); ok {
		return rest == "libs"
	}
	return vfs.fs.DirectoryExists(path)
}

func (vfs *wrappedFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) (result vfs.Entries) {
	if rest, ok := splitPath(path.AsString()); ok {
		if rest == "" {
			result.Directories = []string{"libs"}
		} else if rest == "libs" {
			result.Files = LibNames
		}
		return result
	}
	return vfs.fs.GetAccessibleEntries(path)
}

var rootEntries = []fs.DirEntry{
	fs.FileInfoToDirEntry(&fileInfo{name: "libs", mode: fs.ModeDir}),
}

func (vfs *wrappedFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	if rest, ok := splitPath(path.AsString()); ok {
		if rest == "" || rest == "libs" {
			return &fileInfo{name: rest, mode: fs.ModeDir}
		}
		if lib, ok := embeddedContents[rest]; ok {
			libName, _ := strings.CutPrefix(rest, "libs/")
			return &fileInfo{name: libName, size: int64(len(lib))}
		}
		return nil
	}
	return vfs.fs.Stat(path)
}

func (vfs *wrappedFS) WalkDir(root tspath.RootedDirectoryPath, walkFn vfs.WalkDirFunc) error {
	if rest, ok := splitPath(root.AsString()); ok {
		if err := vfs.walkDir(rest, walkFn); err != nil {
			if err == fs.SkipAll { //nolint:errorlint
				return nil
			}
			return err
		}
		return nil
	}
	return vfs.fs.WalkDir(root, walkFn)
}

func (vfs *wrappedFS) walkDir(rest string, walkFn vfs.WalkDirFunc) error {
	var entries []fs.DirEntry
	switch rest {
	case "":
		entries = rootEntries
	case "libs":
		entries = libsEntries
	default:
		return nil
	}

	root := tspath.RootedDirectoryPathFromNormalized(scheme)
	for _, entry := range entries {
		name := entry.Name()
		if rest != "" {
			name = rest + "/" + name
		}

		if err := walkFn(root.ResolveFile(name).AsPath(), entry, nil); err != nil {
			if err == fs.SkipAll { //nolint:errorlint
				return fs.SkipAll
			}
			if err == fs.SkipDir { //nolint:errorlint
				continue
			}
			return err
		}
		if entry.IsDir() {
			if err := vfs.walkDir(strings.TrimPrefix(name, "/"), walkFn); err != nil {
				return err
			}
		}
	}

	return nil
}

func (vfs *wrappedFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	if _, ok := splitPath(path.AsString()); ok {
		return path
	}
	return vfs.fs.Realpath(path)
}

func (vfs *wrappedFS) WriteFile(path tspath.RootedFilePath, data string) error {
	if _, ok := splitPath(path.AsString()); ok {
		panic("cannot write to embedded file system")
	}
	return vfs.fs.WriteFile(path, data)
}

func (vfs *wrappedFS) AppendFile(path tspath.RootedFilePath, data string) error {
	if _, ok := splitPath(path.AsString()); ok {
		panic("cannot write to embedded file system")
	}
	return vfs.fs.AppendFile(path, data)
}

func (vfs *wrappedFS) Remove(path tspath.RootedPath) error {
	if _, ok := splitPath(path.AsString()); ok {
		panic("cannot remove from embedded file system")
	}
	return vfs.fs.Remove(path)
}

func (vfs *wrappedFS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	if _, ok := splitPath(path.AsString()); ok {
		panic("cannot change times on embedded file system")
	}
	return vfs.fs.Chtimes(path, aTime, mTime)
}

type fileInfo struct {
	mode fs.FileMode
	name string
	size int64
}

var (
	_ fs.FileInfo = (*fileInfo)(nil)
	_ fs.DirEntry = (*fileInfo)(nil)
)

func (fi *fileInfo) IsDir() bool {
	return fi.mode.IsDir()
}

func (fi *fileInfo) ModTime() time.Time {
	return time.Time{}
}

func (fi *fileInfo) Mode() fs.FileMode {
	return fi.mode
}

func (fi *fileInfo) Name() string {
	return fi.name
}

func (fi *fileInfo) Size() int64 {
	return fi.size
}

func (fi *fileInfo) Sys() any {
	return nil
}

func (fi *fileInfo) Info() (fs.FileInfo, error) {
	return fi, nil
}

func (fi *fileInfo) Type() fs.FileMode {
	return fi.mode.Type()
}
