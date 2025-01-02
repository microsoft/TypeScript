//go:build !noembed

package bundled

import (
	"embed"
	"io/fs"
	"strings"

	"github.com/microsoft/typescript-go/internal/vfs"
)

const embedded = true

const scheme = "bundled:"

func splitPath(path string) (root string, rest string, ok bool) {
	rest, ok = strings.CutPrefix(path, scheme)
	if !ok {
		return "", "", false
	}
	return scheme, rest, true
}

func libPath() string {
	return scheme + "libs"
}

//go:embed libs
var embeddedFS embed.FS

var embeddedVFS = vfs.FromIOFS(embeddedFS, true)

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
	if _, path, ok := splitPath(path); ok {
		return embeddedVFS.FileExists("/" + path)
	}
	return vfs.fs.FileExists(path)
}

func (vfs *wrappedFS) ReadFile(path string) (contents string, ok bool) {
	if _, path, ok := splitPath(path); ok {
		return embeddedVFS.ReadFile("/" + path)
	}
	return vfs.fs.ReadFile(path)
}

func (vfs *wrappedFS) DirectoryExists(path string) bool {
	if _, path, ok := splitPath(path); ok {
		return embeddedVFS.DirectoryExists("/" + path)
	}
	return vfs.fs.DirectoryExists(path)
}

func (vfs *wrappedFS) GetDirectories(path string) []string {
	if _, path, ok := splitPath(path); ok {
		return embeddedVFS.GetDirectories("/" + path)
	}
	return vfs.fs.GetDirectories(path)
}

func (vfs *wrappedFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	if root, path, ok := splitPath(root); ok {
		return embeddedVFS.WalkDir("/"+path, func(path string, d fs.DirEntry, err error) error {
			return walkFn(root+strings.TrimPrefix(path, "/"), d, err)
		})
	}
	return vfs.fs.WalkDir(root, walkFn)
}

func (vfs *wrappedFS) Realpath(path string) string {
	if _, path, ok := splitPath(path); ok {
		return embeddedVFS.Realpath(path)
	}
	return vfs.fs.Realpath(path)
}

func (vfs *wrappedFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	if _, _, ok := splitPath(path); ok {
		panic("cannot write to embedded file system")
	}
	return vfs.fs.WriteFile(path, data, writeByteOrderMark)
}
