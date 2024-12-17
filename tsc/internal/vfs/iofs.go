package vfs

import (
	"fmt"
	"io/fs"
	"strings"

	"github.com/microsoft/typescript-go/internal/tspath"
)

type RealpathFS interface {
	fs.FS
	Realpath(path string) (string, error)
}

type WriteFileFS interface {
	fs.FS
	WriteFile(path string, data []byte, perm fs.FileMode) error
}

type MkdirAllFS interface {
	fs.FS
	MkdirAll(path string, perm fs.FileMode) error
}

// FromIOFS creates a new FS from an [fs.FS].
//
// For paths like `c:/foo/bar`, fsys will be used as though it's rooted at `/` and the path is `/c:/foo/bar`.
//
// If the provided [fs.FS] implements [RealpathFS], it will be used to implement the Realpath method.
// If the provided [fs.FS] implements [WriteFileFS], it will be used to implement the WriteFile method.
// If the provided [fs.FS] implements [MkdirAllFS], it will be used to implement the WriteFile method.
//
// Deprecated: FromIOFS does not actually handle case-insensitivity; ensure the passed in [fs.FS]
// respects case-insensitive file names if needed. Consider using [vfstest.FromMapFS] for testing.
func FromIOFS(fsys fs.FS, useCaseSensitiveFileNames bool) FS {
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
	if fsys, ok := fsys.(WriteFileFS); ok {
		writeFile = func(path string, content string, writeByteOrderMark bool) error {
			if writeByteOrderMark {
				content = "\uFEFF" + content
			}
			return fsys.WriteFile(path, []byte(content), 0o666)
		}
	} else {
		writeFile = func(string, string, bool) error {
			panic("writeFile not supported")
		}
	}

	var mkdirAll func(path string) error
	if fsys, ok := fsys.(MkdirAllFS); ok {
		mkdirAll = func(path string) error {
			return fsys.MkdirAll(path, 0o777)
		}
	} else {
		mkdirAll = func(string) error {
			panic("mkdirAll not supported")
		}
	}

	return &ioFS{
		common: common{
			rootFor: func(root string) fs.FS {
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
	}
}

type ioFS struct {
	common

	useCaseSensitiveFileNames bool
	realpath                  func(path string) (string, error)
	writeFile                 func(path string, content string, writeByteOrderMark bool) error
	mkdirAll                  func(path string) error
}

var _ FS = (*ioFS)(nil)

func (vfs *ioFS) UseCaseSensitiveFileNames() bool {
	return vfs.useCaseSensitiveFileNames
}

func (vfs *ioFS) Realpath(path string) string {
	root, rest := splitPath(path)
	// splitPath normalizes the path into parts (e.g. "c:/foo/bar" -> "c:/", "foo/bar")
	// Put them back together to call realpath.
	realpath, err := vfs.realpath(root + rest)
	if err != nil {
		return path
	}
	return realpath
}

func (vfs *ioFS) WriteFile(path string, content string, writeByteOrderMark bool) error {
	_ = rootLength(path) // Assert path is rooted
	if err := vfs.writeFile(path, content, writeByteOrderMark); err == nil {
		return nil
	}
	if err := vfs.mkdirAll(tspath.GetDirectoryPath(tspath.NormalizePath(path))); err != nil {
		return err
	}
	return vfs.writeFile(path, content, writeByteOrderMark)
}
