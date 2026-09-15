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
func WalkDir(fileSystem FS, root string, walkFn fs.WalkDirFunc) error {
	rootInfo := fileSystem.Stat(root)
	if rootInfo == nil {
		return normalizeWalkDirError(walkFn(root, nil, ErrNotExist))
	}

	useCaseSensitiveFileNames := fileSystem.UseCaseSensitiveFileNames()
	rootPrefix := root[:tspath.GetRootLength(root)]
	sameRoot := func(path string) bool {
		pathRootLength := tspath.GetRootLength(path)
		return pathRootLength == len(rootPrefix) && tspath.ComparePaths(
			path[:pathRootLength],
			rootPrefix,
			tspath.ComparePathsOptions{UseCaseSensitiveFileNames: useCaseSensitiveFileNames},
		) == 0
	}
	equivalent := func(left string, right string) bool {
		return tspath.ComparePaths(
			left,
			right,
			tspath.ComparePathsOptions{UseCaseSensitiveFileNames: useCaseSensitiveFileNames},
		) == 0
	}
	canonicalize := func(path string) string {
		return tspath.GetCanonicalFileName(tspath.NormalizePath(path), useCaseSensitiveFileNames)
	}

	visited := map[string]struct{}{}
	var visit func(path string, entry fs.DirEntry, realpath string) error
	visit = func(path string, entry fs.DirEntry, realpath string) error {
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

		entries := fileSystem.GetAccessibleEntries(path)
		directories := make(map[string]struct{}, len(entries.Directories))
		for _, name := range entries.Directories {
			directories[name] = struct{}{}
		}
		names := append(slices.Clone(entries.Directories), entries.Files...)
		slices.Sort(names)
		for _, name := range names {
			childPath := tspath.CombinePaths(path, name)
			if !sameRoot(childPath) {
				continue
			}

			mode := fs.FileMode(0)
			if _, ok := directories[name]; ok {
				mode = fs.ModeDir
			}
			childRealpath := ""
			isSymlink := false
			if entries.Symlinks != nil {
				_, isSymlink = entries.Symlinks[name]
				if !isSymlink && mode.IsDir() {
					childRealpath = tspath.CombinePaths(realpath, name)
				}
			} else {
				childRealpath = fileSystem.Realpath(childPath)
				isSymlink = !equivalent(childRealpath, tspath.CombinePaths(realpath, name))
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
	rootRealpath := fileSystem.Realpath(root)
	if tspath.GetRootLength(root) != len(root) {
		parent := tspath.GetDirectoryPath(root)
		expectedRealpath := tspath.CombinePaths(fileSystem.Realpath(parent), tspath.GetBaseFileName(root))
		if !equivalent(rootRealpath, expectedRealpath) {
			rootEntry = &walkDirEntry{
				fileSystem: fileSystem,
				path:       root,
				name:       tspath.GetBaseFileName(root),
				mode:       fs.ModeSymlink,
			}
		}
	}
	return normalizeWalkDirError(visit(root, rootEntry, rootRealpath))
}

func normalizeWalkDirError(err error) error {
	if errors.Is(err, fs.SkipDir) || errors.Is(err, fs.SkipAll) {
		return nil
	}
	return err
}

type walkDirEntry struct {
	fileSystem FS
	path       string
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
