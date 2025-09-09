package vfstest

import (
	"errors"
	"fmt"
	"io/fs"
	"iter"
	"maps"
	"path"
	"slices"
	"strings"
	"sync"
	"testing/fstest"
	"time"

	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/iovfs"
)

type MapFS struct {
	// mu protects m.
	// A single mutex is sufficient as we only use fstest.Map's Open method.
	mu sync.RWMutex

	// keys in m are canonicalPaths
	m fstest.MapFS

	useCaseSensitiveFileNames bool

	symlinks map[canonicalPath]canonicalPath

	clock Clock
}

type Clock interface {
	Now() time.Time
	SinceStart() time.Duration
}

type clockImpl struct {
	start time.Time
}

func (c *clockImpl) Now() time.Time {
	return time.Now()
}

func (c *clockImpl) SinceStart() time.Duration {
	return time.Since(c.start)
}

var (
	_ iovfs.RealpathFS = (*MapFS)(nil)
	_ iovfs.WritableFS = (*MapFS)(nil)
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
	return FromMapWithClock(m, useCaseSensitiveFileNames, &clockImpl{start: time.Now()})
}

// FromMapWithClock creates a new [vfs.FS] from a map of paths to file contents.
// Those file contents may be strings, byte slices, or [fstest.MapFile]s.
//
// The paths must be normalized absolute paths according to the tspath package,
// without trailing directory separators.
// The paths must be all POSIX-style or all Windows-style, but not both.
func FromMapWithClock[File any](m map[string]File, useCaseSensitiveFileNames bool, clock Clock) vfs.FS {
	posix := false
	windows := false

	checkPath := func(p string) {
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

	mfs := make(fstest.MapFS, len(m))
	// Sorted creation to ensure times are always guaranteed to be in order.
	keys := slices.Collect(maps.Keys(m))
	slices.SortFunc(keys, comparePathsByParts)
	for _, p := range keys {
		f := m[p]
		checkPath(p)

		var file *fstest.MapFile
		switch f := any(f).(type) {
		case string:
			file = &fstest.MapFile{Data: []byte(f), ModTime: clock.Now()}
		case []byte:
			file = &fstest.MapFile{Data: f, ModTime: clock.Now()}
		case *fstest.MapFile:
			fCopy := *f
			fCopy.ModTime = clock.Now()
			file = &fCopy
		default:
			panic(fmt.Sprintf("invalid file type %T", f))
		}

		if file.Mode&fs.ModeSymlink != 0 {
			target := string(file.Data)
			checkPath(target)

			target, _ = strings.CutPrefix(target, "/")
			fileCopy := *file
			fileCopy.Data = []byte(target)
			file = &fileCopy
		}

		p, _ = strings.CutPrefix(p, "/")
		mfs[p] = file
	}

	if posix && windows {
		panic("mixed posix and windows paths")
	}

	return iovfs.From(convertMapFS(mfs, useCaseSensitiveFileNames, clock), useCaseSensitiveFileNames)
}

func convertMapFS(input fstest.MapFS, useCaseSensitiveFileNames bool, clock Clock) *MapFS {
	if clock == nil {
		clock = &clockImpl{start: time.Now()}
	}
	m := &MapFS{
		m:                         make(fstest.MapFS, len(input)),
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
		clock:                     clock,
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
		if dir := dirName(p); dir != "" {
			if err := m.mkdirAll(dir, 0o777); err != nil {
				panic(fmt.Sprintf("failed to create intermediate directories for %q: %v", p, err))
			}
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

func (m *MapFS) getCanonicalPath(p string) canonicalPath {
	return canonicalPath(tspath.GetCanonicalFileName(p, m.useCaseSensitiveFileNames))
}

func (m *MapFS) open(p canonicalPath) (fs.File, error) {
	return m.m.Open(string(p))
}

func (m *MapFS) remove(path string) error {
	canonical := m.getCanonicalPath(path)
	canonicalString := string(canonical)
	fileInfo := m.m[canonicalString]
	if fileInfo == nil {
		// file does not exist
		return nil
	}
	delete(m.m, canonicalString)
	delete(m.symlinks, canonical)

	if fileInfo.Mode.IsDir() {
		canonicalString += "/"
		for path := range m.m {
			if strings.HasPrefix(path, canonicalString) {
				delete(m.m, path)
				delete(m.symlinks, canonicalPath(path))
			}
		}
	}
	return nil
}

func Symlink(target string) *fstest.MapFile {
	return &fstest.MapFile{
		Data: []byte(target),
		Mode: fs.ModeSymlink,
	}
}

func (m *MapFS) getFollowingSymlinks(p canonicalPath) (*fstest.MapFile, canonicalPath, error) {
	return m.getFollowingSymlinksWorker(p, "", "")
}

type brokenSymlinkError struct {
	from, to canonicalPath
}

func (e *brokenSymlinkError) Error() string {
	return fmt.Sprintf("broken symlink %q -> %q", e.from, e.to)
}

func (m *MapFS) getFollowingSymlinksWorker(p canonicalPath, symlinkFrom, symlinkTo canonicalPath) (*fstest.MapFile, canonicalPath, error) {
	if file, ok := m.m[string(p)]; ok && file.Mode&fs.ModeSymlink == 0 {
		return file, p, nil
	}

	if target, ok := m.symlinks[p]; ok {
		return m.getFollowingSymlinksWorker(target, p, target)
	}

	// This could be a path underneath a symlinked directory.
	for other, target := range m.symlinks {
		if len(other) < len(p) && other == p[:len(other)] && p[len(other)] == '/' {
			return m.getFollowingSymlinksWorker(target+p[len(other):], other, target)
		}
	}

	err := fs.ErrNotExist
	if symlinkFrom != "" {
		err = &brokenSymlinkError{symlinkFrom, symlinkTo}
	}
	return nil, p, err
}

func (m *MapFS) set(p canonicalPath, file *fstest.MapFile) {
	m.m[string(p)] = file
}

func (m *MapFS) setEntry(realpath string, canonical canonicalPath, file fstest.MapFile) {
	if realpath == "" || canonical == "" {
		panic("empty path")
	}

	file.Sys = &sys{
		original: file.Sys,
		realpath: realpath,
	}
	m.set(canonical, &file)

	if file.Mode&fs.ModeSymlink != 0 {
		if m.symlinks == nil {
			m.symlinks = make(map[canonicalPath]canonicalPath)
		}
		m.symlinks[canonical] = m.getCanonicalPath(string(file.Data))
	}
}

func splitPath(s string, offset int) (before, after string) {
	idx := strings.IndexByte(s[offset:], '/')
	if idx < 0 {
		return s, ""
	}
	return s[:idx+offset], s[idx+1+offset:]
}

func dirName(p string) string {
	dir, _ := path.Split(p)
	return strings.TrimSuffix(dir, "/")
}

func baseName(p string) string {
	_, file := path.Split(p)
	return file
}

func (m *MapFS) mkdirAll(p string, perm fs.FileMode) error {
	if p == "" {
		panic("empty path")
	}

	// Fast path; already exists.
	if other, _, err := m.getFollowingSymlinks(m.getCanonicalPath(p)); err == nil {
		if !other.Mode.IsDir() {
			return fmt.Errorf("mkdir %q: path exists but is not a directory", p)
		}
		return nil
	}

	var toCreate []string
	offset := 0
	for {
		dir, rest := splitPath(p, offset)
		canonical := m.getCanonicalPath(dir)
		other, otherPath, err := m.getFollowingSymlinks(canonical)
		if err != nil {
			if !errors.Is(err, fs.ErrNotExist) {
				return err
			}
			toCreate = append(toCreate, dir)
		} else {
			if !other.Mode.IsDir() {
				return fmt.Errorf("mkdir %q: path exists but is not a directory", otherPath)
			}
			if canonical != otherPath {
				// We have a symlinked parent, reset and start again.
				p = other.Sys.(*sys).realpath + "/" + rest
				toCreate = toCreate[:0]
				offset = 0
				continue
			}
		}
		if rest == "" {
			break
		}
		offset = len(dir) + 1
	}

	for _, dir := range toCreate {
		m.setEntry(dir, m.getCanonicalPath(dir), fstest.MapFile{
			Mode:    fs.ModeDir | perm&^umask,
			ModTime: m.clock.Now(),
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
	return baseName(fi.realpath)
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

func (m *MapFS) Open(name string) (fs.File, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	_, cp, _ := m.getFollowingSymlinks(m.getCanonicalPath(name))
	f, err := m.open(cp)
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

func (m *MapFS) Realpath(name string) (string, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	file, _, err := m.getFollowingSymlinks(m.getCanonicalPath(name))
	if err != nil {
		return "", err
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

func (m *MapFS) MkdirAll(path string, perm fs.FileMode) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.mkdirAll(path, perm)
}

func (m *MapFS) WriteFile(path string, data []byte, perm fs.FileMode) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if parent := dirName(path); parent != "" {
		canonical := m.getCanonicalPath(parent)
		parentFile, _, err := m.getFollowingSymlinks(canonical)
		if err != nil {
			return fmt.Errorf("write %q: %w", path, err)
		}
		if !parentFile.Mode.IsDir() {
			return fmt.Errorf("write %q: parent path exists but is not a directory", path)
		}
	}

	file, cp, err := m.getFollowingSymlinks(m.getCanonicalPath(path))
	if err != nil {
		var brokenSymlinkError *brokenSymlinkError
		if !errors.Is(err, fs.ErrNotExist) && !errors.As(err, &brokenSymlinkError) {
			// No other errors are possible.
			panic(err)
		}
	} else {
		if !file.Mode.IsRegular() {
			return fmt.Errorf("write %q: path exists but is not a regular file", path)
		}
	}

	m.setEntry(path, cp, fstest.MapFile{
		Data:    data,
		ModTime: m.clock.Now(),
		Mode:    perm &^ umask,
	})

	return nil
}

func (m *MapFS) Remove(path string) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	return m.remove(path)
}

func (m *MapFS) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	canonical := m.getCanonicalPath(path)
	canonicalString := string(canonical)
	fileInfo := m.m[canonicalString]
	if fileInfo == nil {
		// file does not exist
		return fs.ErrNotExist
	}
	fileInfo.ModTime = mTime
	return nil
}

func (m *MapFS) GetTargetOfSymlink(path string) (string, bool) {
	path, _ = strings.CutPrefix(path, "/")
	m.mu.RLock()
	defer m.mu.RUnlock()
	canonical := m.getCanonicalPath(path)
	canonicalString := string(canonical)
	if fileInfo, ok := m.m[canonicalString]; ok {
		if fileInfo.Mode&fs.ModeSymlink != 0 {
			return "/" + string(fileInfo.Data), true
		}
	}
	return "", false
}

func (m *MapFS) GetModTime(path string) time.Time {
	path, _ = strings.CutPrefix(path, "/")
	m.mu.RLock()
	defer m.mu.RUnlock()
	canonical := m.getCanonicalPath(path)
	canonicalString := string(canonical)
	if fileInfo, ok := m.m[canonicalString]; ok {
		return fileInfo.ModTime
	}
	return time.Time{}
}

func (m *MapFS) Entries() iter.Seq2[string, *fstest.MapFile] {
	return func(yield func(string, *fstest.MapFile) bool) {
		m.mu.RLock()
		defer m.mu.RUnlock()
		inputKeys := slices.Collect(maps.Keys(m.m))
		slices.SortFunc(inputKeys, comparePathsByParts)

		for _, p := range inputKeys {
			file := m.m[p]
			path := file.Sys.(*sys).realpath
			if !tspath.PathIsAbsolute(path) {
				path = "/" + path
			}
			if !yield(path, file) {
				break
			}
		}
	}
}

func (m *MapFS) GetFileInfo(path string) *fstest.MapFile {
	path, _ = strings.CutPrefix(path, "/")
	m.mu.RLock()
	defer m.mu.RUnlock()
	canonical := m.getCanonicalPath(path)
	canonicalString := string(canonical)
	return m.m[canonicalString]
}

func must[T any](v T, err error) T {
	if err != nil {
		panic(err)
	}
	return v
}
