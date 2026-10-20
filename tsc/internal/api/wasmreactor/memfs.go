package wasmreactor

import (
	"io/fs"
	"maps"
	"slices"
	"sync"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// memFS holds the files mirrored into the reactor by its host.
type memFS struct {
	mu              sync.RWMutex
	caseSensitivity tspath.CaseSensitivity
	files           map[string]*memFile
	dirs            map[string]*memDir
}

type memFile struct {
	path    tspath.RootedFilePath
	content string
	modTime time.Time
}

type memDir struct {
	path tspath.RootedDirectoryPath
	// Children are keyed by canonical base name and map to their original base name.
	files map[string]string
	dirs  map[string]string
}

var _ vfs.FS = (*memFS)(nil)

func newMemFS(caseSensitivity tspath.CaseSensitivity) *memFS {
	m := &memFS{
		caseSensitivity: caseSensitivity,
		files:           map[string]*memFile{},
		dirs:            map[string]*memDir{},
	}
	m.ensureDir(tspath.RootedDirectoryPathFromAbsolute("/"))
	return m
}

func (m *memFS) key(path string) string {
	return m.caseSensitivity.Canonicalize(path)
}

func (m *memFS) ensureDir(path tspath.RootedDirectoryPath) *memDir {
	if dir := m.dirs[m.key(path.AsString())]; dir != nil {
		return dir
	}
	dir := &memDir{path: path, files: map[string]string{}, dirs: map[string]string{}}
	m.dirs[m.key(path.AsString())] = dir
	if parent := path.AsPath().Directory(); parent != path {
		name := path.BaseName()
		m.ensureDir(parent).dirs[m.key(name)] = name
	}
	return dir
}

func (m *memFS) CaseSensitivity() tspath.CaseSensitivity {
	return m.caseSensitivity
}

func (m *memFS) FileExists(path tspath.RootedFilePath) bool {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.files[m.key(path.AsString())] != nil
}

func (m *memFS) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.dirs[m.key(path.AsString())] != nil
}

func (m *memFS) ReadFile(path tspath.RootedFilePath) (string, bool) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if file := m.files[m.key(path.AsString())]; file != nil {
		return file.content, true
	}
	return "", false
}

func (m *memFS) WriteFile(path tspath.RootedFilePath, data string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.writeFile(path, data)
}

func (m *memFS) AppendFile(path tspath.RootedFilePath, data string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if file := m.files[m.key(path.AsString())]; file != nil {
		data = file.content + data
	}
	return m.writeFile(path, data)
}

func (m *memFS) writeFile(path tspath.RootedFilePath, data string) error {
	key := m.key(path.AsString())
	if m.dirs[key] != nil {
		return &fs.PathError{Op: "write", Path: path.AsString(), Err: fs.ErrInvalid}
	}
	if file := m.files[key]; file != nil {
		file.content = data
		file.modTime = time.Now()
		return nil
	}
	for dir := path.Directory(); ; dir = dir.AsPath().Directory() {
		if m.dirs[m.key(dir.AsString())] != nil {
			break
		}
		if m.files[m.key(dir.AsString())] != nil {
			return &fs.PathError{Op: "write", Path: path.AsString(), Err: fs.ErrInvalid}
		}
	}
	name := path.BaseName()
	m.ensureDir(path.Directory()).files[m.key(name)] = name
	m.files[key] = &memFile{path: path, content: data, modTime: time.Now()}
	return nil
}

func (m *memFS) Remove(path tspath.RootedPath) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	key := m.key(path.AsString())
	if file := m.files[key]; file != nil {
		delete(m.files, key)
		m.removeFromParent(file.path.AsPath())
	} else if dir := m.dirs[key]; dir != nil {
		m.removeDir(dir)
		if dir.path.AsPath().Directory() != dir.path {
			m.removeFromParent(dir.path.AsPath())
		}
	}
	return nil
}

func (m *memFS) removeFromParent(path tspath.RootedPath) {
	name := m.key(path.BaseName())
	parent := m.dirs[m.key(path.Directory().AsString())]
	delete(parent.files, name)
	delete(parent.dirs, name)
}

func (m *memFS) removeDir(dir *memDir) {
	for _, name := range dir.files {
		delete(m.files, m.key(dir.path.ResolveFile(name).AsString()))
	}
	for _, name := range dir.dirs {
		m.removeDir(m.dirs[m.key(dir.path.ResolveDirectory(name).AsString())])
	}
	delete(m.dirs, m.key(dir.path.AsString()))
}

func (m *memFS) Chtimes(path tspath.RootedPath, aTime time.Time, mTime time.Time) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if file := m.files[m.key(path.AsString())]; file != nil {
		file.modTime = mTime
		return nil
	}
	if m.dirs[m.key(path.AsString())] != nil {
		return nil
	}
	return &fs.PathError{Op: "chtimes", Path: path.AsString(), Err: fs.ErrNotExist}
}

func (m *memFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	m.mu.RLock()
	defer m.mu.RUnlock()
	entries := vfs.Entries{Symlinks: map[string]struct{}{}}
	if dir := m.dirs[m.key(path.AsString())]; dir != nil {
		entries.Files = slices.Sorted(maps.Values(dir.files))
		entries.Directories = slices.Sorted(maps.Values(dir.dirs))
	}
	return entries
}

func (m *memFS) Stat(path tspath.RootedPath) vfs.FileInfo {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if file := m.files[m.key(path.AsString())]; file != nil {
		return &memFileInfo{name: file.path.BaseName(), size: int64(len(file.content)), modTime: file.modTime}
	}
	if dir := m.dirs[m.key(path.AsString())]; dir != nil {
		return &memFileInfo{name: dir.path.BaseName(), mode: fs.ModeDir}
	}
	return nil
}

func (m *memFS) Realpath(path tspath.RootedPath) tspath.RootedPath {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if file := m.files[m.key(path.AsString())]; file != nil {
		return file.path.AsPath()
	}
	if dir := m.dirs[m.key(path.AsString())]; dir != nil {
		return dir.path.AsPath()
	}
	return path
}

type memFileInfo struct {
	name    string
	size    int64
	mode    fs.FileMode
	modTime time.Time
}

func (i *memFileInfo) Name() string       { return i.name }
func (i *memFileInfo) Size() int64        { return i.size }
func (i *memFileInfo) Mode() fs.FileMode  { return i.mode }
func (i *memFileInfo) ModTime() time.Time { return i.modTime }
func (i *memFileInfo) IsDir() bool        { return i.mode.IsDir() }
func (i *memFileInfo) Sys() any           { return nil }
