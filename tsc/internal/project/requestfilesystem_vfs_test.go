package project

import (
	"errors"
	"io/fs"
	"slices"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/project/dirty"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

// These methods preserve the old standalone request filesystem test surface.
// Production reads exercise the same request lookup through SnapshotFS instead.

func getRequestFileSystem(fileSystem *requestFileSystem) *requestFileSystem {
	return fileSystem
}

func (s requestFileSystem) snapshotView() *SnapshotFS {
	return &SnapshotFS{
		fs:                 s.base,
		toPath:             s.toPath,
		overlays:           map[tspath.Path]*Overlay{},
		overlayDirectories: map[tspath.Path]map[tspath.Path]string{},
		diskFiles:          map[tspath.Path]*diskFile{},
		diskDirectories:    map[tspath.Path]dirty.CloneableMap[tspath.Path, string]{},
		upperLayer:         &s,
	}
}

func (s requestFileSystem) UseCaseSensitiveFileNames() bool {
	return s.useCaseSensitiveNames
}

func (s requestFileSystem) ReadFile(fileName string) (string, bool) {
	file := s.snapshotView().GetFile(fileName)
	if file == nil {
		return "", false
	}
	return file.Content(), true
}

func (s requestFileSystem) FileExists(fileName string) bool {
	return s.snapshotView().FileExists(fileName, s.toPath(fileName))
}

func (s requestFileSystem) DirectoryExists(directoryName string) bool {
	return s.snapshotView().DirectoryExists(directoryName)
}

func (s requestFileSystem) GetAccessibleEntries(directoryName string) vfs.Entries {
	return s.snapshotView().GetAccessibleEntries(directoryName)
}

func (s requestFileSystem) Realpath(path string) string {
	return s.snapshotView().Realpath(path)
}

func (s requestFileSystem) mutationPath(path string) (vfs.FS, string, bool) {
	if s.kind != RequestFileSystemKindLayer {
		return nil, "", false
	}
	resolved := s.resolvePath(path)
	if !resolved.ok {
		return nil, "", false
	}
	return s.base, resolved.path, s.base != nil
}

func (s requestFileSystem) WriteFile(fileName string, data string) error {
	host, path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.WriteFile(path, data)
}

func (s requestFileSystem) AppendFile(fileName string, data string) error {
	host, path, ok := s.mutationPath(fileName)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.AppendFile(path, data)
}

func (s requestFileSystem) Remove(path string) error {
	host, path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.Remove(path)
}

func (s requestFileSystem) Chtimes(path string, aTime time.Time, mTime time.Time) error {
	host, path, ok := s.mutationPath(path)
	if !ok {
		return vfs.ErrInvalid
	}
	return host.Chtimes(path, aTime, mTime)
}

func (s requestFileSystem) Stat(path string) vfs.FileInfo {
	lookup := s.lookupPath(path)
	if !lookup.ok {
		return nil
	}
	if lookup.fallback {
		return statRequestTestFileSystem(s.base, lookup.path)
	}
	info, _ := lookup.info.(vfs.FileInfo)
	return info
}

func (file *requestFile) Name() string               { return tspath.GetBaseFileName(file.fileName) }
func (file *requestFile) Size() int64                { return int64(len(file.content)) }
func (file *requestFile) Mode() fs.FileMode          { return 0o444 }
func (file *requestFile) ModTime() time.Time         { return time.Time{} }
func (file *requestFile) IsDir() bool                { return false }
func (file *requestFile) Sys() any                   { return nil }
func (file *requestFile) Type() fs.FileMode          { return file.Mode().Type() }
func (file *requestFile) Info() (fs.FileInfo, error) { return file, nil }

func (directory *requestDirectory) Name() string {
	return tspath.GetBaseFileName(directory.directoryName)
}
func (directory *requestDirectory) Size() int64                { return 0 }
func (directory *requestDirectory) Mode() fs.FileMode          { return fs.ModeDir | 0o555 }
func (directory *requestDirectory) ModTime() time.Time         { return time.Time{} }
func (directory *requestDirectory) IsDir() bool                { return true }
func (directory *requestDirectory) Sys() any                   { return nil }
func (directory *requestDirectory) Type() fs.FileMode          { return directory.Mode().Type() }
func (directory *requestDirectory) Info() (fs.FileInfo, error) { return directory, nil }

func statRequestTestFileSystem(fileSystem vfs.FS, path string) vfs.FileInfo {
	if info := fileSystem.Stat(path); info != nil {
		return info
	}
	if fileSystem.DirectoryExists(path) {
		return &requestDirectory{directoryName: path}
	}
	if fileSystem.FileExists(path) {
		return &requestFile{fileName: path}
	}
	return nil
}

func (s requestFileSystem) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	root = s.toAbsolutePath(root)
	info := s.Stat(root)
	if info == nil {
		return walkFn(root, nil, vfs.ErrNotExist)
	}
	return s.walkDir(root, info, walkFn, map[string]struct{}{})
}

func (s requestFileSystem) walkDir(path string, info vfs.FileInfo, walkFn vfs.WalkDirFunc, visited map[string]struct{}) error {
	realpath := s.Realpath(path)
	if _, ok := visited[realpath]; ok {
		return nil
	}
	visited[realpath] = struct{}{}
	entry, ok := info.(vfs.DirEntry)
	if !ok {
		entry = fs.FileInfoToDirEntry(info)
	}
	if err := walkFn(path, entry, nil); err != nil {
		if errors.Is(err, fs.SkipDir) && entry.IsDir() {
			return nil
		}
		return err
	}
	if !entry.IsDir() {
		return nil
	}
	entries := s.GetAccessibleEntries(path)
	names := append(slices.Clone(entries.Directories), entries.Files...)
	slices.Sort(names)
	for _, name := range names {
		childPath := tspath.CombinePaths(path, name)
		childInfo := s.Stat(childPath)
		if childInfo == nil {
			continue
		}
		if err := s.walkDir(childPath, childInfo, walkFn, visited); err != nil {
			if errors.Is(err, fs.SkipDir) {
				continue
			}
			return err
		}
	}
	return nil
}
