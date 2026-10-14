package symlinks

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type KnownDirectoryLink struct {
	// Matches the spelling used to reach the symlink. Used to preserve the
	// spelling of child paths when substituting the real directory.
	Symlink tspath.RootedDirectoryPath
	// Matches the casing returned by `realpath`. Used to compute the `realpath` of children.
	Real tspath.RootedDirectoryPath
	// Canonical key for Real, stored to avoid repeated recomputation.
	RealPath tspath.PathKey
}

type KnownSymlinks struct {
	directories           collections.SyncMap[tspath.PathKey, *KnownDirectoryLink]
	directoriesByRealpath collections.SyncMap[tspath.PathKey, *collections.SyncSet[tspath.RootedDirectoryPath]]
	files                 collections.SyncMap[tspath.PathKey, tspath.RootedFilePath]
	filesByRealpath       collections.SyncMap[tspath.PathKey, *collections.SyncSet[tspath.RootedFilePath]]
	caseSensitivity       tspath.CaseSensitivity
}

func (cache *KnownSymlinks) HasDirectory(symlinkPath tspath.PathKey) bool {
	_, ok := cache.directories.Load(symlinkPath)
	return ok
}

// Gets a map from symlink to realpath.
func (cache *KnownSymlinks) Directories() *collections.SyncMap[tspath.PathKey, *KnownDirectoryLink] {
	return &cache.directories
}

func (cache *KnownSymlinks) DirectoriesByRealpath() *collections.SyncMap[tspath.PathKey, *collections.SyncSet[tspath.RootedDirectoryPath]] {
	return &cache.directoriesByRealpath
}

// Gets a map from symlink to realpath
func (cache *KnownSymlinks) Files() *collections.SyncMap[tspath.PathKey, tspath.RootedFilePath] {
	return &cache.files
}

// Gets a map from realpath to symlinks
func (cache *KnownSymlinks) FilesByRealpath() *collections.SyncMap[tspath.PathKey, *collections.SyncSet[tspath.RootedFilePath]] {
	return &cache.filesByRealpath
}

func (cache *KnownSymlinks) SetDirectory(symlink tspath.RootedDirectoryPath, symlinkPath tspath.PathKey, realDirectory *KnownDirectoryLink) {
	if realDirectory != nil {
		link := *realDirectory
		link.Symlink = symlink
		realDirectory = &link
		if _, ok := cache.directories.Load(symlinkPath); !ok {
			set, _ := cache.directoriesByRealpath.LoadOrStore(realDirectory.RealPath, &collections.SyncSet[tspath.RootedDirectoryPath]{})
			set.Add(symlink)
		}
	}
	cache.directories.Store(symlinkPath, realDirectory)
}

func (link *KnownDirectoryLink) ResolveFilePath(fileName tspath.RootedFilePath, caseSensitivity tspath.CaseSensitivity) (tspath.RootedFilePath, bool) {
	relative, ok := caseSensitivity.RelativeFilePathFromDirectory(link.Symlink, fileName)
	if !ok {
		return "", false
	}
	return link.Real.ResolveRelativeFile(relative), true
}

func (cache *KnownSymlinks) SetFile(symlink tspath.RootedFilePath, symlinkPath tspath.PathKey, realpath tspath.RootedFilePath) {
	if _, ok := cache.files.Load(symlinkPath); !ok {
		realpathPath := cache.caseSensitivity.PathKey(tspath.RootedPath(realpath))
		set, _ := cache.filesByRealpath.LoadOrStore(realpathPath, &collections.SyncSet[tspath.RootedFilePath]{})
		set.Add(symlink)
	}
	cache.files.Store(symlinkPath, realpath)
}

func NewKnownSymlinks(caseSensitivity tspath.CaseSensitivity) *KnownSymlinks {
	return &KnownSymlinks{
		caseSensitivity: caseSensitivity,
	}
}

func (cache *KnownSymlinks) SetSymlinksFromResolutions(
	forEachResolvedModule func(callback func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey), file *ast.SourceFile),
	forEachResolvedTypeReferenceDirective func(callback func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey), file *ast.SourceFile),
) {
	forEachResolvedModule(func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey) {
		cache.ProcessResolution(resolution.OriginalPath, resolution.ResolvedFileName)
	}, nil)
	forEachResolvedTypeReferenceDirective(func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.PathKey) {
		cache.ProcessResolution(resolution.OriginalPath, resolution.ResolvedFileName)
	}, nil)
}

func (cache *KnownSymlinks) ProcessResolution(originalFileName tspath.RootedFilePath, resolvedFileName tspath.RootedFilePath) {
	if originalFileName == "" || resolvedFileName == "" {
		return
	}
	cache.SetFile(originalFileName, cache.caseSensitivity.PathKey(tspath.RootedPath(originalFileName)), resolvedFileName)
	commonResolved, commonOriginal := cache.guessDirectorySymlinkFromFilePaths(resolvedFileName, originalFileName)
	if commonResolved != "" && commonOriginal != "" {
		symlinkPath := cache.caseSensitivity.PathKey(commonOriginal.AsPath())
		if !tspath.ContainsIgnoredPathKey(symlinkPath) {
			cache.SetDirectory(
				commonOriginal,
				symlinkPath,
				&KnownDirectoryLink{
					Real:     commonResolved,
					RealPath: cache.caseSensitivity.PathKey(commonResolved.AsPath()),
				},
			)
		}
	}
}

func (cache *KnownSymlinks) guessDirectorySymlinkFromFilePaths(a tspath.RootedFilePath, b tspath.RootedFilePath) (tspath.RootedDirectoryPath, tspath.RootedDirectoryPath) {
	isDirectory := false
	for {
		aParent := a.Directory()
		bParent := b.Directory()
		if aParent.AsPath() == a.AsPath() || bParent.AsPath() == b.AsPath() ||
			cache.isNodeModulesOrScopedPackageDirectory(aParent.AsPath().BaseName()) ||
			cache.isNodeModulesOrScopedPackageDirectory(bParent.AsPath().BaseName()) ||
			cache.caseSensitivity.Canonicalize(a.BaseName()) != cache.caseSensitivity.Canonicalize(b.BaseName()) {
			break
		}
		a = tspath.RootedFilePathFromPath(aParent.AsPath())
		b = tspath.RootedFilePathFromPath(bParent.AsPath())
		isDirectory = true
	}
	if isDirectory {
		return tspath.RootedDirectoryPathFromPath(tspath.RootedPath(a)), tspath.RootedDirectoryPathFromPath(tspath.RootedPath(b))
	}
	return "", ""
}

func (cache *KnownSymlinks) isNodeModulesOrScopedPackageDirectory(s string) bool {
	return s != "" && (cache.caseSensitivity.Canonicalize(s) == "node_modules" || strings.HasPrefix(s, "@"))
}
