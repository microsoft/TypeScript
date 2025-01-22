package vfs

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io/fs"
	"unicode/utf16"

	"github.com/microsoft/typescript-go/internal/tspath"
)

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

	// DirectoryExists returns true if the path is a directory.
	DirectoryExists(path string) bool

	// GetDirectories returns the names of the directories in the specified directory.
	GetDirectories(path string) []string

	// GetEntries returns the entries in the specified directory.
	GetEntries(path string) []fs.DirEntry

	// WalkDir walks the file tree rooted at root, calling walkFn for each file or directory in the tree.
	// It is has the same behavior as [fs.WalkDir], but with paths as [string].
	WalkDir(root string, walkFn WalkDirFunc) error

	// Realpath returns the "real path" of the specified path,
	// following symlinks and correcting filename casing.
	Realpath(path string) string
}

// DirEntry is [fs.DirEntry].
type DirEntry = fs.DirEntry

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

type common struct {
	rootFor func(root string) fs.FS
}

func rootLength(p string) int {
	l := tspath.GetEncodedRootLength(p)
	if l <= 0 {
		panic(fmt.Sprintf("vfs: path %q is not absolute", p))
	}
	return l
}

func splitPath(p string) (rootName, rest string) {
	p = tspath.NormalizePath(p)
	l := rootLength(p)
	rootName, rest = p[:l], p[l:]
	rest = tspath.RemoveTrailingDirectorySeparator(rest)
	return rootName, rest
}

func (vfs *common) rootAndPath(path string) (fsys fs.FS, rootName string, rest string) {
	rootName, rest = splitPath(path)
	if rest == "" {
		rest = "."
	}
	return vfs.rootFor(rootName), rootName, rest
}

func (vfs *common) stat(path string) fs.FileInfo {
	fsys, _, rest := vfs.rootAndPath(path)
	if fsys == nil {
		return nil
	}
	stat, err := fs.Stat(fsys, rest)
	if err != nil {
		return nil
	}
	return stat
}

func (vfs *common) FileExists(path string) bool {
	stat := vfs.stat(path)
	return stat != nil && !stat.IsDir()
}

func (vfs *common) DirectoryExists(path string) bool {
	stat := vfs.stat(path)
	return stat != nil && stat.IsDir()
}

func (vfs *common) GetDirectories(path string) []string {
	entries := vfs.GetEntries(path)
	// TODO: should this really exist? ReadDir with manual filtering seems like a better idea.
	var dirs []string
	for _, entry := range entries {
		if entry.IsDir() {
			dirs = append(dirs, entry.Name())
		}
	}
	return dirs
}

func (vfs *common) GetEntries(path string) []fs.DirEntry {
	fsys, _, rest := vfs.rootAndPath(path)
	if fsys == nil {
		return nil
	}

	entries, err := fs.ReadDir(fsys, rest)
	if err != nil {
		return nil
	}

	return entries
}

func (vfs *common) WalkDir(root string, walkFn WalkDirFunc) error {
	fsys, rootName, rest := vfs.rootAndPath(root)
	if fsys == nil {
		return nil
	}
	return fs.WalkDir(fsys, rest, func(path string, d fs.DirEntry, err error) error {
		if path == "." {
			path = ""
		}
		return walkFn(rootName+path, d, err)
	})
}

func (vfs *common) ReadFile(path string) (contents string, ok bool) {
	fsys, _, rest := vfs.rootAndPath(path)
	if fsys == nil {
		return "", false
	}

	b, err := fs.ReadFile(fsys, rest)
	if err != nil {
		return "", false
	}

	return decodeBytes(b)
}

func decodeBytes(b []byte) (contents string, ok bool) {
	var bom [2]byte
	if len(b) >= 2 {
		bom = [2]byte{b[0], b[1]}
		switch bom {
		case [2]byte{0xFF, 0xFE}:
			return decodeUtf16(b[2:], binary.LittleEndian), true
		case [2]byte{0xFE, 0xFF}:
			return decodeUtf16(b[2:], binary.BigEndian), true
		}
	}
	if len(b) >= 3 && b[0] == 0xEF && b[1] == 0xBB && b[2] == 0xBF {
		b = b[3:]
	}

	return string(b), true
}

func decodeUtf16(b []byte, order binary.ByteOrder) string {
	ints := make([]uint16, len(b)/2)
	if err := binary.Read(bytes.NewReader(b), order, &ints); err != nil {
		return ""
	}
	return string(utf16.Decode(ints))
}
