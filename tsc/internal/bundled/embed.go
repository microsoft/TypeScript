//go:build !noembed

package bundled

import (
	"io/fs"
	"slices"
	"strings"
	"time"

	"github.com/microsoft/typescript-go/internal/vfs"
)

const embedded = true

const scheme = "bundled:///"

func splitPath(path string) (rest string, ok bool) {
	return strings.CutPrefix(path, scheme)
}

func libPath() string {
	return scheme + "libs"
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

func (vfs *wrappedFS) UseCaseSensitiveFileNames() bool {
	return vfs.fs.UseCaseSensitiveFileNames()
}

func (vfs *wrappedFS) FileExists(path string) bool {
	if rest, ok := splitPath(path); ok {
		_, ok := embeddedContents[rest]
		return ok
	}
	return vfs.fs.FileExists(path)
}

func (vfs *wrappedFS) ReadFile(path string) (contents string, ok bool) {
	if rest, ok := splitPath(path); ok {
		contents, ok = embeddedContents[rest]
		return contents, ok
	}
	return vfs.fs.ReadFile(path)
}

func (vfs *wrappedFS) DirectoryExists(path string) bool {
	if rest, ok := splitPath(path); ok {
		return rest == "libs"
	}
	return vfs.fs.DirectoryExists(path)
}

func (vfs *wrappedFS) GetAccessibleEntries(path string) (result vfs.Entries) {
	if rest, ok := splitPath(path); ok {
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

func (vfs *wrappedFS) GetEntries(path string) []fs.DirEntry {
	if rest, ok := splitPath(path); ok {
		if rest == "" {
			return slices.Clone(rootEntries)
		}
		if rest == "libs" {
			return slices.Clone(libsEntries)
		}
		return []fs.DirEntry{}
	}
	return vfs.fs.GetEntries(path)
}

func (vfs *wrappedFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	if rest, ok := splitPath(root); ok {
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

	for _, entry := range entries {
		name := rest + "/" + entry.Name()

		if err := walkFn(scheme+name, entry, nil); err != nil {
			if err == fs.SkipAll { //nolint:errorlint
				return fs.SkipAll
			}
			if err == fs.SkipDir { //nolint:errorlint
				continue
			}
			return err
		}
		if entry.IsDir() {
			if err := vfs.walkDir(name, walkFn); err != nil {
				return err
			}
		}
	}

	return nil
}

func (vfs *wrappedFS) Realpath(path string) string {
	if _, ok := splitPath(path); ok {
		return path
	}
	return vfs.fs.Realpath(path)
}

func (vfs *wrappedFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	if _, ok := splitPath(path); ok {
		panic("cannot write to embedded file system")
	}
	return vfs.fs.WriteFile(path, data, writeByteOrderMark)
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
