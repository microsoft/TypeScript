package vfstest

import (
	"fmt"
	"io/fs"
	"maps"
	"path"
	"slices"
	"strings"
	"sync"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type mapFS struct {
	// mu protects m.
	// A single mutex is sufficient as we only use fstest.Map's Open method.
	mu sync.RWMutex
	m  fstest.MapFS

	useCaseSensitiveFileNames bool
}

var (
	_ vfs.RealpathFS = (*mapFS)(nil)
	_ vfs.WritableFS = (*mapFS)(nil)
)

type sys struct {
	original any
	realpath string
}

// FromMap creates a new [vfs.FS] from a map of paths to file contents.
// Those file contents may be strings, byte slices, or [fstest.MapFile]s.
//
// The paths must be normalized absolute paths according to the tspath package,
// without trailing directory separators.
// The paths must be all POSIX-style or all Windows-style, but not both.
func FromMap[File any](m map[string]File, useCaseSensitiveFileNames bool) vfs.FS {
	posix := false
	windows := false

	for p := range m {
		if !tspath.IsRootedDiskPath(p) {
			panic(fmt.Sprintf("non-rooted path %q", p))
		}

		if normal := tspath.RemoveTrailingDirectorySeparator(tspath.NormalizePath(p)); normal != p {
			panic(fmt.Sprintf("non-normalized path %q", p))
		}

		if strings.HasPrefix(p, "/") {
			posix = true
		} else {
			windows = true
		}
	}

	if posix && windows {
		panic("mixed posix and windows paths")
	}

	mfs := make(fstest.MapFS, len(m))
	for p, f := range m {
		var file *fstest.MapFile
		switch f := any(f).(type) {
		case string:
			file = &fstest.MapFile{Data: []byte(f)}
		case []byte:
			file = &fstest.MapFile{Data: f}
		case *fstest.MapFile:
			file = f
		default:
			panic(fmt.Sprintf("invalid file type %T", f))
		}

		p, _ = strings.CutPrefix(p, "/")
		mfs[p] = file
	}

	return vfs.FromIOFS(convertMapFS(mfs, useCaseSensitiveFileNames), useCaseSensitiveFileNames)
}

func convertMapFS(input fstest.MapFS, useCaseSensitiveFileNames bool) *mapFS {
	m := &mapFS{
		m:                         make(fstest.MapFS, len(input)),
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}

	// Verify that the input is well-formed.
	canonicalPaths := make(map[canonicalPath]string, len(input))
	for path := range input {
		canonical := m.getCanonicalPath(path)
		if other, ok := canonicalPaths[canonical]; ok {
			// Ensure consistent panic messages
			path, other = min(path, other), max(path, other)
			panic(fmt.Sprintf("duplicate path: %q and %q have the same canonical path", path, other))
		}
		canonicalPaths[canonical] = path
	}

	// Sort the input by depth and path so we ensure parent dirs are created
	// before their children, if explicitly specified by the input.
	inputKeys := slices.Collect(maps.Keys(input))
	slices.SortFunc(inputKeys, comparePathsByParts)

	for _, p := range inputKeys {
		file := input[p]

		// Create all missing intermediate directories so we can attach the realpath to each of them.
		// fstest.MapFS doesn't require this as it synthesizes directories on the fly, but it's a lot
		// harder to reapply a realpath onto those when we're deep in some FileInfo method.
		if err := m.mkdirAll(dirName(p), 0o777); err != nil {
			panic(fmt.Sprintf("failed to create intermediate directories for %q: %v", p, err))
		}
		m.setEntry(p, m.getCanonicalPath(p), *file)
	}

	return m
}

func comparePathsByParts(a, b string) int {
	for {
		aStart, aEnd, aOk := strings.Cut(a, "/")
		bStart, bEnd, bOk := strings.Cut(b, "/")

		if !aOk || !bOk {
			return strings.Compare(a, b)
		}

		if r := strings.Compare(aStart, bStart); r != 0 {
			return r
		}

		a, b = aEnd, bEnd
	}
}

type canonicalPath string

func (m *mapFS) getCanonicalPath(p string) canonicalPath {
	return canonicalPath(tspath.GetCanonicalFileName(p, m.useCaseSensitiveFileNames))
}

func (m *mapFS) open(p canonicalPath) (fs.File, error) {
	return m.m.Open(string(p))
}

func (m *mapFS) get(p canonicalPath) (*fstest.MapFile, bool) {
	file, ok := m.m[string(p)]
	return file, ok
}

func (m *mapFS) set(p canonicalPath, file *fstest.MapFile) {
	m.m[string(p)] = file
}

func (m *mapFS) setEntry(realpath string, canonical canonicalPath, file fstest.MapFile) {
	file.Sys = &sys{
		original: file.Sys,
		realpath: realpath,
	}
	m.set(canonical, &file)
}

func dirName(p string) string {
	dir := path.Dir(p)
	if dir == "." {
		return ""
	}
	return dir
}

func (m *mapFS) mkdirAll(p string, perm fs.FileMode) error {
	for ; p != ""; p = dirName(p) {
		canonical := m.getCanonicalPath(p)
		if other, ok := m.get(canonical); ok {
			if other.Mode.IsDir() {
				break
			}
			return fmt.Errorf("mkdir %q: path exists but is not a directory", p)
		}
		m.setEntry(p, canonical, fstest.MapFile{
			Mode: fs.ModeDir | perm&^umask,
		})
	}
	return nil
}

type fileInfo struct {
	fs.FileInfo
	sys      any
	realpath string
}

func (fi *fileInfo) Name() string {
	return path.Base(fi.realpath)
}

func (fi *fileInfo) Sys() any {
	return fi.sys
}

type file struct {
	fs.File
	fileInfo *fileInfo
}

func (f *file) Stat() (fs.FileInfo, error) {
	return f.fileInfo, nil
}

type readDirFile struct {
	fs.ReadDirFile
	fileInfo *fileInfo
}

func (f *readDirFile) Stat() (fs.FileInfo, error) {
	return f.fileInfo, nil
}

func (f *readDirFile) ReadDir(n int) ([]fs.DirEntry, error) {
	list, err := f.ReadDirFile.ReadDir(n)
	if err != nil {
		return nil, err
	}

	entries := make([]fs.DirEntry, len(list))
	for i, entry := range list {
		info := must(entry.Info())
		newInfo, ok := convertInfo(info)
		if !ok {
			panic(fmt.Sprintf("unexpected synthesized dir: %q", info.Name()))
		}
		entries[i] = fs.FileInfoToDirEntry(newInfo)
	}

	return entries, nil
}

func (m *mapFS) Open(name string) (fs.File, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	f, err := m.open(m.getCanonicalPath(name))
	if err != nil {
		return nil, err
	}

	info := must(f.Stat())

	newInfo, ok := convertInfo(info)
	if !ok {
		// This is a synthesized dir.
		if name != "." {
			panic(fmt.Sprintf("unexpected synthesized dir: %q", name))
		}

		return &readDirFile{
			ReadDirFile: f.(fs.ReadDirFile),
			fileInfo: &fileInfo{
				FileInfo: info,
				sys:      info.Sys(),
				realpath: ".",
			},
		}, nil
	}

	if f, ok := f.(fs.ReadDirFile); ok {
		return &readDirFile{
			ReadDirFile: f,
			fileInfo:    newInfo,
		}, nil
	}

	return &file{
		File:     f,
		fileInfo: newInfo,
	}, nil
}

func (m *mapFS) Realpath(name string) (string, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	// TODO: handle symlinks after https://go.dev/cl/385534 is available
	// Don't bother going through fs.Stat.
	file, ok := m.get(m.getCanonicalPath(name))
	if !ok {
		return "", fs.ErrNotExist
	}
	return file.Sys.(*sys).realpath, nil
}

func convertInfo(info fs.FileInfo) (*fileInfo, bool) {
	sys, ok := info.Sys().(*sys)
	if !ok {
		return nil, false
	}
	return &fileInfo{
		FileInfo: info,
		sys:      sys.original,
		realpath: sys.realpath,
	}, true
}

const umask = 0o022

func (m *mapFS) MkdirAll(path string, perm fs.FileMode) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.mkdirAll(path, perm)
}

func (m *mapFS) WriteFile(path string, data []byte, perm fs.FileMode) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if parent := dirName(path); parent != "" {
		canonical := m.getCanonicalPath(parent)
		parentFile, ok := m.get(canonical)
		if !ok {
			return fmt.Errorf("write %q: parent directory does not exist", path)
		}
		if !parentFile.Mode.IsDir() {
			return fmt.Errorf("write %q: parent path exists but is not a directory", path)
		}
	}

	m.setEntry(path, m.getCanonicalPath(path), fstest.MapFile{
		Data: data,
		Mode: perm &^ umask,
	})

	return nil
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}
