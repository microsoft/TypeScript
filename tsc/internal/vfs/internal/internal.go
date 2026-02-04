package internal

import (
	"encoding/binary"
	"fmt"
	"io/fs"
	"strings"
	"unicode/utf16"
	"unsafe"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type Common struct {
	RootFor        func(root string) fs.FS
	IsReparsePoint func(path string) bool
}

func RootLength(p string) int {
	l := tspath.GetEncodedRootLength(p)
	if l == 0 {
		panic(fmt.Sprintf("vfs: path %q is not absolute", p))
	} else if l < 0 {
		return ^l
	}
	return l
}

func SplitPath(p string) (rootName, rest string) {
	p = tspath.NormalizePath(p)
	l := RootLength(p)
	rootName, rest = p[:l], p[l:]
	rest = tspath.RemoveTrailingDirectorySeparator(rest)
	return rootName, rest
}

func (vfs *Common) RootAndPath(path string) (fsys fs.FS, rootName string, rest string) {
	rootName, rest = SplitPath(path)
	if rest == "" {
		rest = "."
	}
	return vfs.RootFor(rootName), rootName, rest
}

func (vfs *Common) Stat(path string) vfs.FileInfo {
	fsys, _, rest := vfs.RootAndPath(path)
	if fsys == nil {
		return nil
	}
	stat, err := fs.Stat(fsys, rest)
	if err != nil {
		return nil
	}
	return stat
}

func (vfs *Common) FileExists(path string) bool {
	stat := vfs.Stat(path)
	return stat != nil && !stat.IsDir()
}

func (vfs *Common) DirectoryExists(path string) bool {
	stat := vfs.Stat(path)
	return stat != nil && stat.IsDir()
}

func (vfs *Common) GetAccessibleEntries(path string) (result vfs.Entries) {
	addToResult := func(name string, mode fs.FileMode) (added bool) {
		if mode.IsDir() {
			result.Directories = append(result.Directories, name)
			return true
		}

		if mode.IsRegular() {
			result.Files = append(result.Files, name)
			return true
		}

		return false
	}

	for _, entry := range vfs.getEntries(path) {
		entryType := entry.Type()

		if addToResult(entry.Name(), entryType) {
			continue
		}

		if entryType&fs.ModeSymlink != 0 {
			// Easy case; UNIX-like system will clearly mark symlinks.
			if stat := vfs.Stat(path + "/" + entry.Name()); stat != nil {
				addToResult(entry.Name(), stat.Mode())
			}
			continue
		}

		if entryType&fs.ModeIrregular != 0 && vfs.IsReparsePoint != nil {
			// Could be a Windows junction or other reparse point.
			// Check using the OS-specific helper.
			fullPath := path + "/" + entry.Name()
			if vfs.IsReparsePoint(fullPath) {
				if stat := vfs.Stat(fullPath); stat != nil {
					addToResult(entry.Name(), stat.Mode())
				}
			}
			continue
		}
	}

	return result
}

func (vfs *Common) getEntries(path string) []vfs.DirEntry {
	fsys, _, rest := vfs.RootAndPath(path)
	if fsys == nil {
		return nil
	}

	entries, err := fs.ReadDir(fsys, rest)
	if err != nil {
		return nil
	}

	return entries
}

func (vfs *Common) WalkDir(root string, walkFn fs.WalkDirFunc) error {
	fsys, rootName, rest := vfs.RootAndPath(root)
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

func (vfs *Common) ReadFile(path string) (contents string, ok bool) {
	fsys, _, rest := vfs.RootAndPath(path)
	if fsys == nil {
		return "", false
	}

	b, err := fs.ReadFile(fsys, rest)
	if err != nil {
		return "", false
	}

	// An invariant of any underlying filesystem is that the bytes returned
	// are immutable, otherwise anyone using the filesystem would end up
	// with data races.
	//
	// This means that we can safely convert the bytes to a string directly,
	// saving a copy.
	if len(b) == 0 {
		return "", true
	}

	s := unsafe.String(&b[0], len(b))

	return decodeBytes(s)
}

func decodeBytes(s string) (contents string, ok bool) {
	var bom [2]byte
	if len(s) >= 2 {
		bom = [2]byte{s[0], s[1]}
		switch bom {
		case [2]byte{0xFF, 0xFE}:
			return decodeUtf16(s[2:], binary.LittleEndian), true
		case [2]byte{0xFE, 0xFF}:
			return decodeUtf16(s[2:], binary.BigEndian), true
		}
	}
	if len(s) >= 3 && s[0] == 0xEF && s[1] == 0xBB && s[2] == 0xBF {
		s = s[3:]
	}

	return s, true
}

func decodeUtf16(s string, order binary.ByteOrder) string {
	ints := make([]uint16, len(s)/2)
	if err := binary.Read(strings.NewReader(s), order, &ints); err != nil {
		return ""
	}
	return string(utf16.Decode(ints))
}
