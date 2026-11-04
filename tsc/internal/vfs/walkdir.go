package vfs

import (
	"errors"
	"io/fs"
	"slices"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// WalkDir calls walkFn for root and each accessible descendant in lexical order.
// Symbolic links are reported but not followed. Directory read failures are
// indistinguishable from empty directories because [FS.GetAccessibleEntries]
// does not return errors. The FileInfo returned by DirEntry.Info for a symbolic
// link contains only its name and mode because [FS] does not provide lstat.
// Using DirEntry.Info() requires the FS to implement Stat().
func WalkDir(fileSystem FS, root tspath.RootedPath, walkFn WalkDirFunc) error {
	rootPath := root
	rootInfo := fileSystem.Stat(rootPath)
	if rootInfo == nil {
		return normalizeWalkDirError(walkFn(rootPath, nil, ErrNotExist))
	}

	caseSensitivity := fileSystem.CaseSensitivity()
	rootPrefix, _ := rootPath.RootAndRelativePath()
	sameRoot := func(path tspath.RootedPath) bool {
		pathRoot, _ := path.RootAndRelativePath()
		return caseSensitivity.ComparePaths(pathRoot.AsPath(), rootPrefix.AsPath()) == 0
	}
	equivalent := func(left tspath.RootedPath, right tspath.RootedPath) bool {
		return caseSensitivity.ComparePaths(left, right) == 0
	}
	canonicalize := func(path tspath.RootedPath) tspath.PathKey {
		return caseSensitivity.PathKey(path)
	}

	visited := map[tspath.PathKey]struct{}{}
	var visit func(path tspath.RootedPath, entry fs.DirEntry, realpath tspath.RootedPath) error
	visit = func(path tspath.RootedPath, entry fs.DirEntry, realpath tspath.RootedPath) error {
		if entry.IsDir() {
			canonicalRealpath := canonicalize(realpath)
			if _, ok := visited[canonicalRealpath]; ok {
				return nil
			}
			visited[canonicalRealpath] = struct{}{}
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

		directory := tspath.RootedDirectoryPathFromPath(path)
		entries := fileSystem.GetAccessibleEntries(directory)
		directories := make(map[string]struct{}, len(entries.Directories))
		for _, name := range entries.Directories {
			directories[name] = struct{}{}
		}
		names := append(slices.Clone(entries.Directories), entries.Files...)
		slices.Sort(names)
		for _, name := range names {
			mode := fs.FileMode(0)
			if _, ok := directories[name]; ok {
				mode = fs.ModeDir
			}
			var childPath tspath.RootedPath
			if mode.IsDir() {
				childPath = directory.ResolveDirectory(name).AsPath()
			} else {
				childPath = directory.ResolveFile(name).AsPath()
			}
			if !sameRoot(childPath) {
				continue
			}

			var childRealpath tspath.RootedPath
			isSymlink := false
			if entries.Symlinks != nil {
				_, isSymlink = entries.Symlinks[name]
				if !isSymlink && mode.IsDir() {
					childRealpath = tspath.RootedDirectoryPathFromPath(realpath).ResolveDirectory(name).AsPath()
				}
			} else {
				childRealpath = fileSystem.Realpath(childPath)
				realDirectory := tspath.RootedDirectoryPathFromPath(realpath)
				expectedRealpath := realDirectory.ResolveFile(name).AsPath()
				if mode.IsDir() {
					expectedRealpath = realDirectory.ResolveDirectory(name).AsPath()
				}
				isSymlink = !equivalent(childRealpath, expectedRealpath)
			}
			if isSymlink {
				mode = fs.ModeSymlink
			}
			childEntry := &walkDirEntry{
				fileSystem: fileSystem,
				path:       childPath,
				name:       name,
				mode:       mode,
			}
			if !mode.IsDir() {
				if err := visit(childPath, childEntry, ""); err != nil {
					if errors.Is(err, fs.SkipDir) {
						return nil
					}
					return err
				}
				continue
			}

			if childRealpath == "" {
				childRealpath = fileSystem.Realpath(childPath)
			}
			if err := visit(childPath, childEntry, childRealpath); err != nil {
				if errors.Is(err, fs.SkipDir) {
					return nil
				}
				return err
			}
		}
		return nil
	}

	rootEntry := fs.FileInfoToDirEntry(rootInfo)
	rootRealpath := fileSystem.Realpath(rootPath)
	if rootPath != rootPrefix.AsPath() {
		parent := rootPath.Directory()
		expectedRealpath := tspath.RootedDirectoryPathFromPath(fileSystem.Realpath(parent.AsPath())).ResolveDirectory(rootPath.BaseName()).AsPath()
		if !equivalent(rootRealpath, expectedRealpath) {
			rootEntry = &walkDirEntry{
				fileSystem: fileSystem,
				path:       rootPath,
				name:       rootPath.BaseName(),
				mode:       fs.ModeSymlink,
			}
		}
	}
	return normalizeWalkDirError(visit(rootPath, rootEntry, rootRealpath))
}

func normalizeWalkDirError(err error) error {
	if errors.Is(err, fs.SkipDir) || errors.Is(err, fs.SkipAll) {
		return nil
	}
	return err
}

type walkDirEntry struct {
	fileSystem FS
	path       tspath.RootedPath
	name       string
	mode       fs.FileMode
}

func (e *walkDirEntry) Name() string { return e.name }

func (e *walkDirEntry) IsDir() bool { return e.mode.IsDir() }

func (e *walkDirEntry) Type() fs.FileMode { return e.mode.Type() }

func (e *walkDirEntry) Info() (fs.FileInfo, error) {
	if e.mode&fs.ModeSymlink != 0 {
		return &walkDirFileInfo{name: e.name, mode: e.mode}, nil
	}
	info := e.fileSystem.Stat(e.path)
	if info == nil {
		return nil, ErrNotExist
	}
	return info, nil
}

type walkDirFileInfo struct {
	name string
	mode fs.FileMode
}

func (i *walkDirFileInfo) Name() string       { return i.name }
func (i *walkDirFileInfo) Size() int64        { return 0 }
func (i *walkDirFileInfo) Mode() fs.FileMode  { return i.mode }
func (i *walkDirFileInfo) ModTime() time.Time { return time.Time{} }
func (i *walkDirFileInfo) IsDir() bool        { return i.mode.IsDir() }
func (i *walkDirFileInfo) Sys() any           { return nil }
