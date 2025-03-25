package iovfs

import (
	"fmt"
	"io/fs"
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/internal"
)

type RealpathFS interface {
	fs.FS
	Realpath(path string) (string, error)
}

type WritableFS interface {
	fs.FS
	WriteFile(path string, data []byte, perm fs.FileMode) error
	MkdirAll(path string, perm fs.FileMode) error
	// Removes `path` and all its contents. Will return the first error it encounters.
	Remove(path string) error
}

// From creates a new FS from an [fs.FS].
//
// For paths like `c:/foo/bar`, fsys will be used as though it's rooted at `/` and the path is `/c:/foo/bar`.
//
// If the provided [fs.FS] implements [RealpathFS], it will be used to implement the Realpath method.
// If the provided [fs.FS] implements [WritableFS], it will be used to implement the WriteFile method.
//
// From does not actually handle case-insensitivity; ensure the passed in [fs.FS]
// respects case-insensitive file names if needed. Consider using [vfstest.FromMap] for testing.
func From(fsys fs.FS, useCaseSensitiveFileNames bool) vfs.FS {
	var realpath func(path string) (string, error)
	if fsys, ok := fsys.(RealpathFS); ok {
		realpath = func(path string) (string, error) {
			rest, hadSlash := strings.CutPrefix(path, "/")
			rp, err := fsys.Realpath(rest)
			if err != nil {
				return "", err
			}
			if hadSlash {
				return "/" + rp, nil
			}
			return rp, nil
		}
	} else {
		realpath = func(path string) (string, error) {
			return path, nil
		}
	}

	var writeFile func(path string, content string, writeByteOrderMark bool) error
	var mkdirAll func(path string) error
	var remove func(path string) error
	if fsys, ok := fsys.(WritableFS); ok {
		writeFile = func(path string, content string, writeByteOrderMark bool) error {
			rest, _ := strings.CutPrefix(path, "/")
			if writeByteOrderMark {
				content = "\uFEFF" + content
			}
			return fsys.WriteFile(rest, []byte(content), 0o666)
		}
		mkdirAll = func(path string) error {
			rest, _ := strings.CutPrefix(path, "/")
			return fsys.MkdirAll(rest, 0o777)
		}
		remove = func(path string) error {
			rest, _ := strings.CutPrefix(path, "/")
			return fsys.Remove(rest)
		}
	} else {
		writeFile = func(string, string, bool) error {
			panic("writeFile not supported")
		}
		mkdirAll = func(string) error {
			panic("mkdirAll not supported")
		}
		remove = func(string) error {
			panic("remove not supported")
		}
	}

	return &ioFS{
		common: internal.Common{
			RootFor: func(root string) fs.FS {
				if root == "/" {
					return fsys
				}

				p := tspath.RemoveTrailingDirectorySeparator(root)
				sub, err := fs.Sub(fsys, p)
				if err != nil {
					panic(fmt.Sprintf("vfs: failed to create sub file system for %q: %v", p, err))
				}
				return sub
			},
		},
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		realpath:                  realpath,
		writeFile:                 writeFile,
		mkdirAll:                  mkdirAll,
		remove:                    remove,
	}
}

type ioFS struct {
	common internal.Common

	useCaseSensitiveFileNames bool
	realpath                  func(path string) (string, error)
	writeFile                 func(path string, content string, writeByteOrderMark bool) error
	mkdirAll                  func(path string) error
	remove                    func(path string) error
}

var _ vfs.FS = (*ioFS)(nil)

func (vfs *ioFS) UseCaseSensitiveFileNames() bool {
	return vfs.useCaseSensitiveFileNames
}

func (vfs *ioFS) DirectoryExists(path string) bool {
	return vfs.common.DirectoryExists(path)
}

func (vfs *ioFS) FileExists(path string) bool {
	return vfs.common.FileExists(path)
}

func (vfs *ioFS) GetAccessibleEntries(path string) vfs.Entries {
	return vfs.common.GetAccessibleEntries(path)
}

func (vfs *ioFS) Stat(path string) vfs.FileInfo {
	_ = internal.RootLength(path) // Assert path is rooted
	return vfs.common.Stat(path)
}

func (vfs *ioFS) ReadFile(path string) (contents string, ok bool) {
	return vfs.common.ReadFile(path)
}

func (vfs *ioFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	return vfs.common.WalkDir(root, walkFn)
}

func (vfs *ioFS) Remove(path string) error {
	_ = internal.RootLength(path) // Assert path is rooted
	return vfs.remove(path)
}

func (vfs *ioFS) Realpath(path string) string {
	root, rest := internal.SplitPath(path)
	// splitPath normalizes the path into parts (e.g. "c:/foo/bar" -> "c:/", "foo/bar")
	// Put them back together to call realpath.
	realpath, err := vfs.realpath(root + rest)
	if err != nil {
		return path
	}
	return realpath
}

func (vfs *ioFS) WriteFile(path string, content string, writeByteOrderMark bool) error {
	_ = internal.RootLength(path) // Assert path is rooted
	if err := vfs.writeFile(path, content, writeByteOrderMark); err == nil {
		return nil
	}
	if err := vfs.mkdirAll(tspath.GetDirectoryPath(tspath.NormalizePath(path))); err != nil {
		return err
	}
	return vfs.writeFile(path, content, writeByteOrderMark)
}
