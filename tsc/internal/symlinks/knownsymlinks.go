package symlinks

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type KnownDirectoryLink struct {
	// Matches the casing returned by `realpath`. Used to compute the `realpath` of children.
	// Always has trailing directory separator
	Real string
	// toPath(real). Stored to avoid repeated recomputation.
	// Always has trailing directory separator
	RealPath tspath.Path
}

type KnownSymlinks struct {
	directories               collections.SyncMap[tspath.Path, *KnownDirectoryLink]
	directoriesByRealpath     collections.SyncMap[tspath.Path, *collections.SyncSet[string]]
	files                     collections.SyncMap[tspath.Path, string]
	filesByRealpath           collections.SyncMap[tspath.Path, *collections.SyncSet[string]]
	cwd                       string
	useCaseSensitiveFileNames bool
}

func (cache *KnownSymlinks) HasDirectory(symlinkPath tspath.Path) bool {
	_, ok := cache.directories.Load(symlinkPath.EnsureTrailingDirectorySeparator())
	return ok
}

// Gets a map from symlink to realpath. Keys have trailing directory separators.
func (cache *KnownSymlinks) Directories() *collections.SyncMap[tspath.Path, *KnownDirectoryLink] {
	return &cache.directories
}

func (cache *KnownSymlinks) DirectoriesByRealpath() *collections.SyncMap[tspath.Path, *collections.SyncSet[string]] {
	return &cache.directoriesByRealpath
}

// Gets a map from symlink to realpath
func (cache *KnownSymlinks) Files() *collections.SyncMap[tspath.Path, string] {
	return &cache.files
}

// Gets a map from realpath to symlinks
func (cache *KnownSymlinks) FilesByRealpath() *collections.SyncMap[tspath.Path, *collections.SyncSet[string]] {
	return &cache.filesByRealpath
}

func (cache *KnownSymlinks) SetDirectory(symlink string, symlinkPath tspath.Path, realDirectory *KnownDirectoryLink) {
	if realDirectory != nil {
		if _, ok := cache.directories.Load(symlinkPath); !ok {
			set, _ := cache.directoriesByRealpath.LoadOrStore(realDirectory.RealPath, &collections.SyncSet[string]{})
			set.Add(symlink)
		}
	}
	cache.directories.Store(symlinkPath, realDirectory)
}

func (cache *KnownSymlinks) SetFile(symlink string, symlinkPath tspath.Path, realpath string) {
	if _, ok := cache.files.Load(symlinkPath); !ok {
		realpathPath := tspath.ToPath(realpath, cache.cwd, cache.useCaseSensitiveFileNames)
		set, _ := cache.filesByRealpath.LoadOrStore(realpathPath, &collections.SyncSet[string]{})
		set.Add(symlink)
	}
	cache.files.Store(symlinkPath, realpath)
}

func NewKnownSymlink(currentDirectory string, useCaseSensitiveFileNames bool) *KnownSymlinks {
	return &KnownSymlinks{
		cwd:                       currentDirectory,
		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
	}
}

func (cache *KnownSymlinks) SetSymlinksFromResolutions(
	forEachResolvedModule func(callback func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.Path), file *ast.SourceFile),
	forEachResolvedTypeReferenceDirective func(callback func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.Path), file *ast.SourceFile),
) {
	forEachResolvedModule(func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.Path) {
		cache.ProcessResolution(resolution.OriginalPath, resolution.ResolvedFileName)
	}, nil)
	forEachResolvedTypeReferenceDirective(func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.Path) {
		cache.ProcessResolution(resolution.OriginalPath, resolution.ResolvedFileName)
	}, nil)
}

func (cache *KnownSymlinks) ProcessResolution(originalPath string, resolvedFileName string) {
	if originalPath == "" || resolvedFileName == "" {
		return
	}
	cache.SetFile(originalPath, tspath.ToPath(originalPath, cache.cwd, cache.useCaseSensitiveFileNames), resolvedFileName)
	commonResolved, commonOriginal := cache.guessDirectorySymlink(resolvedFileName, originalPath, cache.cwd)
	if commonResolved != "" && commonOriginal != "" {
		symlinkPath := tspath.ToPath(commonOriginal, cache.cwd, cache.useCaseSensitiveFileNames)
		if !tspath.ContainsIgnoredPath(string(symlinkPath)) {
			cache.SetDirectory(
				commonOriginal,
				symlinkPath.EnsureTrailingDirectorySeparator(),
				&KnownDirectoryLink{
					Real:     tspath.EnsureTrailingDirectorySeparator(commonResolved),
					RealPath: tspath.ToPath(commonResolved, cache.cwd, cache.useCaseSensitiveFileNames).EnsureTrailingDirectorySeparator(),
				},
			)
		}
	}
}

func (cache *KnownSymlinks) guessDirectorySymlink(a string, b string, cwd string) (string, string) {
	aParts := tspath.GetPathComponents(tspath.GetNormalizedAbsolutePath(a, cwd), "")
	bParts := tspath.GetPathComponents(tspath.GetNormalizedAbsolutePath(b, cwd), "")
	isDirectory := false
	for len(aParts) >= 2 && len(bParts) >= 2 &&
		!cache.isNodeModulesOrScopedPackageDirectory(aParts[len(aParts)-2]) &&
		!cache.isNodeModulesOrScopedPackageDirectory(bParts[len(bParts)-2]) &&
		tspath.GetCanonicalFileName(aParts[len(aParts)-1], cache.useCaseSensitiveFileNames) == tspath.GetCanonicalFileName(bParts[len(bParts)-1], cache.useCaseSensitiveFileNames) {
		aParts = aParts[:len(aParts)-1]
		bParts = bParts[:len(bParts)-1]
		isDirectory = true
	}
	if isDirectory {
		return tspath.GetPathFromPathComponents(aParts), tspath.GetPathFromPathComponents(bParts)
	}
	return "", ""
}

func (cache *KnownSymlinks) isNodeModulesOrScopedPackageDirectory(s string) bool {
	return s != "" && (tspath.GetCanonicalFileName(s, cache.useCaseSensitiveFileNames) == "node_modules" || strings.HasPrefix(s, "@"))
}
