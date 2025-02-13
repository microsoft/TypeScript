package internal

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io/fs"
	"unicode/utf16"

	"github.com/microsoft/typescript-go/internal/tspath"
)

type Common struct {
	RootFor func(root string) fs.FS
}

func RootLength(p string) int {
	l := tspath.GetEncodedRootLength(p)
	if l <= 0 {
		panic(fmt.Sprintf("vfs: path %q is not absolute", p))
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

func (vfs *Common) stat(path string) fs.FileInfo {
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
	stat := vfs.stat(path)
	return stat != nil && !stat.IsDir()
}

func (vfs *Common) DirectoryExists(path string) bool {
	stat := vfs.stat(path)
	return stat != nil && stat.IsDir()
}

func (vfs *Common) GetDirectories(path string) []string {
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

func (vfs *Common) GetEntries(path string) []fs.DirEntry {
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
