package vfs

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"unicode"
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

	// DirectoryExists returns true if the path is a directory.
	DirectoryExists(path string) bool

	// GetDirectories returns the names of the directories in the specified directory.
	GetDirectories(path string) []string

	// WalkDir walks the file tree rooted at root, calling walkFn for each file or directory in the tree.
	// It is has the same behavior as [fs.WalkDir], but with paths as [string].
	WalkDir(root string, walkFn WalkDirFunc) error

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

var _ FS = (*vfs)(nil)

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

	return &vfs{
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
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
		realpath: realpath,
	}
}

// FromOS creates a new FS from the OS file system.
func FromOS() FS {
	useCaseSensitiveFileNames := isFileSystemCaseSensitive()
	return &vfs{
		readSema:                  osReadSema,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		rootFor:                   os.DirFS,
		realpath: func(path string) (string, error) {
			// TODO: replace once https://go.dev/cl/385534 is available
			path = filepath.FromSlash(path)
			path, err := filepath.EvalSymlinks(path)
			if err != nil {
				return "", err
			}
			path, err = filepath.Abs(path)
			if err != nil {
				return "", err
			}
			return tspath.NormalizeSlashes(path), nil
		},
	}
}

var osReadSema = make(chan struct{}, 128)

var isFileSystemCaseSensitive = sync.OnceValue(func() bool {
	// win32/win64 are case insensitive platforms
	if runtime.GOOS == "windows" {
		return false
	}

	// If the current executable exists under a different case, we must be case-insensitve.
	if _, err := os.Stat(swapCase(os.Args[0])); os.IsNotExist(err) {
		return false
	}
	return true
})

// Convert all lowercase chars to uppercase, and vice-versa
func swapCase(str string) string {
	return strings.Map(func(r rune) rune {
		upper := unicode.ToUpper(r)
		if upper == r {
			return unicode.ToLower(r)
		} else {
			return upper
		}
	}, str)
}

type vfs struct {
	readSema chan struct{}

	useCaseSensitiveFileNames bool

	rootFor  func(root string) fs.FS
	realpath func(path string) (string, error)
}

func (v *vfs) UseCaseSensitiveFileNames() bool {
	return v.useCaseSensitiveFileNames
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

func (v *vfs) rootAndPath(path string) (fsys fs.FS, rootName string, rest string) {
	rootName, rest = splitPath(path)
	if rest == "" {
		rest = "."
	}
	return v.rootFor(rootName), rootName, rest
}

func (v *vfs) stat(path string) fs.FileInfo {
	fsys, _, rest := v.rootAndPath(path)
	if fsys == nil {
		return nil
	}
	stat, err := fs.Stat(fsys, rest)
	if err != nil {
		return nil
	}
	return stat
}

func (v *vfs) FileExists(path string) bool {
	stat := v.stat(path)
	return stat != nil && !stat.IsDir()
}

func (v *vfs) ReadFile(path string) (contents string, ok bool) {
	if v.readSema != nil {
		v.readSema <- struct{}{}
		defer func() { <-v.readSema }()
	}

	fsys, _, rest := v.rootAndPath(path)
	if fsys == nil {
		return "", false
	}

	b, err := fs.ReadFile(fsys, rest)
	if err != nil {
		return "", false
	}

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

func (v *vfs) DirectoryExists(path string) bool {
	stat := v.stat(path)
	return stat != nil && stat.IsDir()
}

func (v *vfs) GetDirectories(path string) []string {
	fsys, _, rest := v.rootAndPath(path)
	if fsys == nil {
		return nil
	}

	entries, err := fs.ReadDir(fsys, rest)
	if err != nil {
		return nil
	}

	// TODO: should this really exist? ReadDir with manual filtering seems like a better idea.
	var dirs []string
	for _, entry := range entries {
		if entry.IsDir() {
			dirs = append(dirs, entry.Name())
		}
	}
	return dirs
}

func (v *vfs) WalkDir(root string, walkFn WalkDirFunc) error {
	fsys, rootName, rest := v.rootAndPath(root)
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

func (v *vfs) Realpath(path string) string {
	root, rest := splitPath(path)
	// splitPath normalizes the path into parts (e.g. "c:/foo/bar" -> "c:/", "foo/bar")
	// Put them back together to call realpath.
	realpath, err := v.realpath(root + rest)
	if err != nil {
		return path
	}
	return realpath
}
