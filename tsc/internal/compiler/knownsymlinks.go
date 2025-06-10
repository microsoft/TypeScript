package compiler

import (
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type knownDirectoryLink struct {
	/**
	 * Matches the casing returned by `realpath`.  Used to compute the `realpath` of children.
	 * Always has trailing directory separator
	 */
	Real string
	/**
	 * toPath(real).  Stored to avoid repeated recomputation.
	 * Always has trailing directory separator
	 */
	RealPath tspath.Path
}

type knownSymlinks struct {
	directories collections.SyncMap[tspath.Path, *knownDirectoryLink]
	files       collections.SyncMap[tspath.Path, string]
}

/** Gets a map from symlink to realpath. Keys have trailing directory separators. */
func (cache *knownSymlinks) Directories() *collections.SyncMap[tspath.Path, *knownDirectoryLink] {
	return &cache.directories
}

/** Gets a map from symlink to realpath */
func (cache *knownSymlinks) Files() *collections.SyncMap[tspath.Path, string] {
	return &cache.files
}

// all callers should check !containsIgnoredPath(symlinkPath)
func (cache *knownSymlinks) SetDirectory(symlink string, symlinkPath tspath.Path, realDirectory *knownDirectoryLink) {
	// Large, interconnected dependency graphs in pnpm will have a huge number of symlinks
	// where both the realpath and the symlink path are inside node_modules/.pnpm. Since
	// this path is never a candidate for a module specifier, we can ignore it entirely.

	// !!!
	// if realDirectory != nil {
	// 	if _, ok := cache.directories.Load(symlinkPath); !ok {
	// 		cache.directoriesByRealpath.Add(realDirectory.RealPath, symlink)
	// 	}
	// }
	cache.directories.Store(symlinkPath, realDirectory)
}

func (cache *knownSymlinks) SetFile(symlinkPath tspath.Path, realpath string) {
	cache.files.Store(symlinkPath, realpath)
}
