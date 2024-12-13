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

// FromIOFS creates a new FS from an [fs.FS].
//
// For paths like `c:/foo/bar`, fsys will be used as though it's rooted at `/` and the path is `/c:/foo/bar`.
//
// If the provided [fs.FS] implements [RealpathFS], it will be used to implement the Realpath method.
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
	}
}

type ioFS struct {
	common

	useCaseSensitiveFileNames bool
	realpath                  func(path string) (string, error)
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
