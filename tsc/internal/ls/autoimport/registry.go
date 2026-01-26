package autoimport

import (
	"cmp"
	"context"
	"maps"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/module"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/project/dirty"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/symlinks"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type newProgramStructure int

const (
	newProgramStructureFalse newProgramStructure = iota
	newProgramStructureSameFileNames
	newProgramStructureDifferentFileNames
)

// BucketState represents the dirty state of a bucket.
// In general, a bucket can be used for an auto-imports request if it is clean
// or if the only edited file is the one that was requested for auto-imports.
// Most edits within a file will not change the imports available to that file.
// However, one exception causes the bucket to be rebuilt after a change to a
// single file: local files are newly added to the project by a manual import.
// This can only happen after a full (non-clone) program update. When this
// happens, the `newProgramStructure` flag is set until the next time the bucket
// is rebuilt, when this condition will be checked.
type BucketState struct {
	// dirtyFile is the file that was edited last, if any. It does not necessarily
	// indicate that no other files have been edited, so it should be ignored if
	// `multipleFilesDirty` is set. It should not be used for node_modules buckets,
	// which rely on `dirtyPackages` instead.
	dirtyFile           tspath.Path
	multipleFilesDirty  bool
	newProgramStructure newProgramStructure
	// fileExcludePatterns is the value of the corresponding user preference when
	// the bucket was built. If changed, the bucket should be rebuilt.
	fileExcludePatterns []string
	// dirtyPackages is the set of package names that need to be re-indexed.
	// This is used for granular updates: when a file in a project reference package
	// changes, only that package needs to be re-extracted rather than rebuilding
	// the entire node_modules bucket. If nil, no granular updates are pending.
	// If set but multipleFilesDirty is true, the entire bucket needs to be rebuilt.
	dirtyPackages *collections.Set[string]
}

func (b BucketState) Dirty() bool {
	return b.multipleFilesDirty || b.dirtyFile != "" || b.newProgramStructure > 0 || b.dirtyPackages.Len() > 0
}

func (b BucketState) DirtyFile() tspath.Path {
	if b.multipleFilesDirty {
		return ""
	}
	return b.dirtyFile
}

func (b BucketState) DirtyPackages() *collections.Set[string] {
	if b.multipleFilesDirty {
		return nil
	}
	return b.dirtyPackages
}

func (b BucketState) possiblyNeedsRebuildForFile(file tspath.Path, preferences *lsutil.UserPreferences) bool {
	return b.newProgramStructure > 0 ||
		b.hasDirtyFileBesides(file) ||
		!core.UnorderedEqual(b.fileExcludePatterns, preferences.AutoImportFileExcludePatterns) ||
		b.dirtyPackages.Len() > 0
}

func (b BucketState) hasDirtyFileBesides(file tspath.Path) bool {
	return b.multipleFilesDirty || b.dirtyFile != "" && b.dirtyFile != file
}

type RegistryBucket struct {
	state BucketState

	// Paths maps file paths to package names. For project buckets, the package name
	// is always empty string. For node_modules buckets, this enables reverse lookup
	// from path to package for granular updates. Only paths eligible for granular
	// update (project reference packages) have entries here.
	Paths map[tspath.Path]string
	// PackageFiles maps package names to their file paths and file names.
	// All package directory names in node_modules are keys; indexed packages have
	// non-nil maps with path→fileName entries, unindexed packages have nil maps.
	// This enables efficient removal of a package's files during granular updates
	// without iterating through all entries. Only defined for node_modules buckets.
	PackageFiles map[string]map[tspath.Path]string
	// ResolvedPackageNames is only defined for project buckets. It is the set of
	// package names that were resolved from imports in the project's program files.
	// This is passed to node_modules buckets so they include packages that are
	// directly imported even if not listed in package.json dependencies.
	ResolvedPackageNames *collections.Set[string]
	// DependencyNames is only defined for node_modules buckets. It is the set of
	// package names that will be included in the bucket if present in the directory,
	// computed from package.json dependencies plus resolved package names from
	// active programs. If nil, all packages are included because at least one open
	// file has access to this node_modules directory without being filtered by a
	// package.json.
	DependencyNames *collections.Set[string]
	// AmbientModuleNames is only defined for node_modules buckets. It is the set of
	// ambient module names found while extracting exports in the bucket.
	AmbientModuleNames map[string][]string
	// Entrypoints is only defined for node_modules buckets. Keys are package entrypoint
	// file paths, and values describe the ways of importing the package that would resolve
	// to that file.
	Entrypoints map[tspath.Path][]*module.ResolvedEntrypoint
	Index       *Index[*Export]
}

func newRegistryBucket() *RegistryBucket {
	return &RegistryBucket{
		state: BucketState{
			multipleFilesDirty:  true,
			newProgramStructure: newProgramStructureDifferentFileNames,
		},
	}
}

func (b *RegistryBucket) Clone() *RegistryBucket {
	return &RegistryBucket{
		state:                b.state,
		Paths:                b.Paths,
		PackageFiles:         b.PackageFiles,
		ResolvedPackageNames: b.ResolvedPackageNames,
		DependencyNames:      b.DependencyNames,
		AmbientModuleNames:   b.AmbientModuleNames,
		Entrypoints:          b.Entrypoints,
		Index:                b.Index,
	}
}

// markProjectFileDirty should only be called within a Change call on the dirty map.
// Buckets are considered immutable once in a finalized registry. Should only
// be used for project buckets.
func (b *RegistryBucket) markProjectFileDirty(file tspath.Path) {
	if b.state.hasDirtyFileBesides(file) {
		b.state.multipleFilesDirty = true
	} else {
		b.state.dirtyFile = file
	}
}

// markNodeModulesDirty should only be called within a Change call on the dirty map.
// Buckets are considered immutable once in a finalized registry. If packageName is
// non-empty, that package is marked for granular update. Otherwise, the entire bucket
// is marked dirty.
func (b *RegistryBucket) markNodeModulesDirty(packageName string) {
	if b.state.multipleFilesDirty {
		return
	}
	if packageName == "" {
		b.state.multipleFilesDirty = true
		return
	}
	// Track the package for granular updates
	if b.state.dirtyPackages == nil {
		b.state.dirtyPackages = &collections.Set[string]{}
	}
	b.state.dirtyPackages.Add(packageName)
}

type directory struct {
	name           string
	packageJson    *packagejson.InfoCacheEntry
	hasNodeModules bool
}

func (d *directory) Clone() *directory {
	return &directory{
		name:           d.name,
		packageJson:    d.packageJson,
		hasNodeModules: d.hasNodeModules,
	}
}

type Registry struct {
	toPath          func(fileName string) tspath.Path
	userPreferences *lsutil.UserPreferences

	// exports      map[tspath.Path][]*RawExport
	directories map[tspath.Path]*directory

	nodeModules map[tspath.Path]*RegistryBucket
	projects    map[tspath.Path]*RegistryBucket

	// specifierCache maps from importing file to target file to specifier.
	specifierCache map[tspath.Path]*collections.SyncMap[tspath.Path, string]
}

func NewRegistry(toPath func(fileName string) tspath.Path, preferences *lsutil.UserPreferences) *Registry {
	return &Registry{
		toPath:          toPath,
		userPreferences: preferences,
		directories:     make(map[tspath.Path]*directory),
	}
}

func (r *Registry) IsPreparedForImportingFile(fileName string, projectPath tspath.Path, preferences *lsutil.UserPreferences) bool {
	if r == nil {
		return false
	}
	projectBucket, ok := r.projects[projectPath]
	if !ok {
		panic("project bucket missing")
	}
	path := r.toPath(fileName)
	if projectBucket.state.possiblyNeedsRebuildForFile(path, preferences) {
		return false
	}

	dirPath := path.GetDirectoryPath()
	for {
		if dirBucket, ok := r.nodeModules[dirPath]; ok {
			if dirBucket.state.possiblyNeedsRebuildForFile(path, preferences) {
				return false
			}
		}
		parent := dirPath.GetDirectoryPath()
		if parent == dirPath {
			break
		}
		dirPath = parent
	}
	return true
}

func (r *Registry) NodeModulesDirectories() map[tspath.Path]string {
	dirs := make(map[tspath.Path]string)
	for dirPath, dir := range r.directories {
		if dir.hasNodeModules {
			dirs[tspath.Path(tspath.CombinePaths(string(dirPath), "node_modules"))] = tspath.CombinePaths(dir.name, "node_modules")
		}
	}
	return dirs
}

func (r *Registry) Clone(ctx context.Context, change RegistryChange, host RegistryCloneHost, logger *logging.LogTree) (*Registry, error) {
	start := time.Now()
	if logger != nil {
		logger = logger.Fork("Building autoimport registry")
	}
	builder := newRegistryBuilder(r, host)
	if change.UserPreferences != nil {
		builder.userPreferences = change.UserPreferences
		if !core.UnorderedEqual(builder.userPreferences.AutoImportSpecifierExcludeRegexes, r.userPreferences.AutoImportSpecifierExcludeRegexes) {
			builder.specifierCache.Clear()
		}
	}
	builder.updateBucketAndDirectoryExistence(change, logger)
	builder.markBucketsDirty(change, logger)
	if change.RequestedFile != "" {
		builder.updateIndexes(ctx, change, logger)
	}
	if logger != nil {
		logger.Logf("Built autoimport registry in %v", time.Since(start))
	}
	registry := builder.Build()
	builder.host.Dispose()
	return registry, nil
}

type BucketStats struct {
	Path            tspath.Path
	ExportCount     int
	FileCount       int
	State           BucketState
	DependencyNames *collections.Set[string]
	PackageNames    *collections.Set[string]
}

type CacheStats struct {
	ProjectBuckets     []BucketStats
	NodeModulesBuckets []BucketStats
}

func (r *Registry) GetCacheStats() *CacheStats {
	stats := &CacheStats{}

	for path, bucket := range r.projects {
		exportCount := 0
		if bucket.Index != nil {
			exportCount = len(bucket.Index.entries)
		}
		stats.ProjectBuckets = append(stats.ProjectBuckets, BucketStats{
			Path:            path,
			ExportCount:     exportCount,
			FileCount:       len(bucket.Paths),
			State:           bucket.state,
			DependencyNames: bucket.DependencyNames,
			PackageNames:    nil,
		})
	}

	for path, bucket := range r.nodeModules {
		exportCount := 0
		if bucket.Index != nil {
			exportCount = len(bucket.Index.entries)
		}
		// Derive PackageNames from PackageFiles keys
		var packageNames *collections.Set[string]
		if bucket.PackageFiles != nil {
			packageNames = collections.NewSetWithSizeHint[string](len(bucket.PackageFiles))
			for name := range bucket.PackageFiles {
				packageNames.Add(name)
			}
		}
		stats.NodeModulesBuckets = append(stats.NodeModulesBuckets, BucketStats{
			Path:            path,
			ExportCount:     exportCount,
			FileCount:       len(bucket.Paths),
			State:           bucket.state,
			DependencyNames: bucket.DependencyNames,
			PackageNames:    packageNames,
		})
	}

	slices.SortFunc(stats.ProjectBuckets, func(a, b BucketStats) int {
		return cmp.Compare(a.Path, b.Path)
	})
	slices.SortFunc(stats.NodeModulesBuckets, func(a, b BucketStats) int {
		return cmp.Compare(a.Path, b.Path)
	})

	return stats
}

type RegistryChange struct {
	RequestedFile tspath.Path
	OpenFiles     map[tspath.Path]string
	Changed       collections.Set[lsproto.DocumentUri]
	Created       collections.Set[lsproto.DocumentUri]
	Deleted       collections.Set[lsproto.DocumentUri]
	// RebuiltPrograms maps from project path to:
	//   - true: the program was rebuilt with a different set of file names
	//   - false: the program was rebuilt but the set of file names is unchanged
	RebuiltPrograms map[tspath.Path]bool
	UserPreferences *lsutil.UserPreferences
}

type RegistryCloneHost interface {
	module.ResolutionHost
	FS() vfs.FS
	GetDefaultProject(path tspath.Path) (tspath.Path, *compiler.Program)
	GetProgramForProject(projectPath tspath.Path) *compiler.Program
	GetPackageJson(fileName string) *packagejson.InfoCacheEntry
	GetSourceFile(fileName string, path tspath.Path) *ast.SourceFile
	Dispose()
}

type registryBuilder struct {
	host RegistryCloneHost
	base *Registry

	userPreferences *lsutil.UserPreferences
	directories     *dirty.Map[tspath.Path, *directory]
	nodeModules     *dirty.Map[tspath.Path, *RegistryBucket]
	projects        *dirty.Map[tspath.Path, *RegistryBucket]
	specifierCache  *dirty.MapBuilder[tspath.Path, *collections.SyncMap[tspath.Path, string], *collections.SyncMap[tspath.Path, string]]
}

func newRegistryBuilder(registry *Registry, host RegistryCloneHost) *registryBuilder {
	return &registryBuilder{
		host: host,
		base: registry,

		userPreferences: registry.userPreferences.OrDefault(),
		directories:     dirty.NewMap(registry.directories),
		nodeModules:     dirty.NewMap(registry.nodeModules),
		projects:        dirty.NewMap(registry.projects),
		specifierCache:  dirty.NewMapBuilder(registry.specifierCache, core.Identity, core.Identity),
	}
}

func (b *registryBuilder) Build() *Registry {
	return &Registry{
		toPath:          b.base.toPath,
		userPreferences: b.userPreferences,
		directories:     core.FirstResult(b.directories.Finalize()),
		nodeModules:     core.FirstResult(b.nodeModules.Finalize()),
		projects:        core.FirstResult(b.projects.Finalize()),
		specifierCache:  core.FirstResult(b.specifierCache.Build()),
	}
}

func (b *registryBuilder) updateBucketAndDirectoryExistence(change RegistryChange, logger *logging.LogTree) {
	start := time.Now()
	neededProjects := make(map[tspath.Path]struct{})
	neededDirectories := make(map[tspath.Path]string)
	for path, fileName := range change.OpenFiles {
		neededProjects[core.FirstResult(b.host.GetDefaultProject(path))] = struct{}{}
		if tspath.IsDynamicFileName(fileName) {
			continue
		}
		dir := fileName
		dirPath := path
		for {
			dir = tspath.GetDirectoryPath(dir)
			lastDirPath := dirPath
			dirPath = dirPath.GetDirectoryPath()
			if dirPath == lastDirPath {
				break
			}
			if _, ok := neededDirectories[dirPath]; ok {
				break
			}
			neededDirectories[dirPath] = dir
		}

		if !b.specifierCache.Has(path) {
			b.specifierCache.Set(path, &collections.SyncMap[tspath.Path, string]{})
		}
	}

	for path := range b.base.specifierCache {
		if _, ok := change.OpenFiles[path]; !ok {
			b.specifierCache.Delete(path)
		}
	}

	var addedProjects, removedProjects []tspath.Path
	core.DiffMapsFunc(
		b.base.projects,
		neededProjects,
		func(_ *RegistryBucket, _ struct{}) bool {
			panic("never called because onChanged is nil")
		},
		func(projectPath tspath.Path, _ struct{}) {
			// Need and don't have
			b.projects.Add(projectPath, newRegistryBucket())
			addedProjects = append(addedProjects, projectPath)
		},
		func(projectPath tspath.Path, _ *RegistryBucket) {
			// Have and don't need
			b.projects.Delete(projectPath)
			removedProjects = append(removedProjects, projectPath)
		},
		nil,
	)
	if logger != nil {
		for _, projectPath := range addedProjects {
			logger.Logf("Added project: %s", projectPath)
		}
		for _, projectPath := range removedProjects {
			logger.Logf("Removed project: %s", projectPath)
		}
	}

	updateDirectory := func(dirPath tspath.Path, dirName string, packageJsonChanged bool) {
		packageJsonFileName := tspath.CombinePaths(dirName, "package.json")
		hasNodeModules := b.host.FS().DirectoryExists(tspath.CombinePaths(dirName, "node_modules"))
		if entry, ok := b.directories.Get(dirPath); ok {
			entry.ChangeIf(func(dir *directory) bool {
				return packageJsonChanged || dir.hasNodeModules != hasNodeModules
			}, func(dir *directory) {
				dir.packageJson = b.host.GetPackageJson(packageJsonFileName)
				dir.hasNodeModules = hasNodeModules
			})
		} else {
			b.directories.Add(dirPath, &directory{
				name:           dirName,
				packageJson:    b.host.GetPackageJson(packageJsonFileName),
				hasNodeModules: hasNodeModules,
			})
		}

		if packageJsonChanged {
			// package.json changes affecting node_modules are handled by comparing dependencies in updateIndexes
			return
		}

		if hasNodeModules {
			if _, ok := b.nodeModules.Get(dirPath); !ok {
				b.nodeModules.Add(dirPath, newRegistryBucket())
			}
		} else {
			b.nodeModules.TryDelete(dirPath)
		}
	}

	var addedNodeModulesDirs, removedNodeModulesDirs []tspath.Path
	core.DiffMapsFunc(
		b.base.directories,
		neededDirectories,
		func(dir *directory, dirName string) bool {
			packageJsonUri := lsconv.FileNameToDocumentURI(tspath.CombinePaths(dirName, "package.json"))
			return !change.Changed.Has(packageJsonUri) && !change.Deleted.Has(packageJsonUri) && !change.Created.Has(packageJsonUri)
		},
		func(dirPath tspath.Path, dirName string) {
			// Need and don't have
			hadNodeModules := b.base.nodeModules[dirPath] != nil
			updateDirectory(dirPath, dirName, false)
			if logger != nil {
				logger.Logf("Added directory: %s", dirPath)
			}
			if _, hasNow := b.nodeModules.Get(dirPath); hasNow && !hadNodeModules {
				addedNodeModulesDirs = append(addedNodeModulesDirs, dirPath)
			}
		},
		func(dirPath tspath.Path, dir *directory) {
			// Have and don't need
			hadNodeModules := b.base.nodeModules[dirPath] != nil
			b.directories.Delete(dirPath)
			b.nodeModules.TryDelete(dirPath)
			if logger != nil {
				logger.Logf("Removed directory: %s", dirPath)
			}
			if hadNodeModules {
				removedNodeModulesDirs = append(removedNodeModulesDirs, dirPath)
			}
		},
		func(dirPath tspath.Path, dir *directory, dirName string) {
			// package.json may have changed
			updateDirectory(dirPath, dirName, true)
			if logger != nil {
				logger.Logf("Changed directory: %s", dirPath)
			}
		},
	)
	if logger != nil {
		for _, dirPath := range addedNodeModulesDirs {
			logger.Logf("Added node_modules bucket: %s", dirPath)
		}
		for _, dirPath := range removedNodeModulesDirs {
			logger.Logf("Removed node_modules bucket: %s", dirPath)
		}
		logger.Logf("Updated buckets and directories in %v", time.Since(start))
	}
}

func (b *registryBuilder) markBucketsDirty(change RegistryChange, logger *logging.LogTree) {
	// Mark new program structures
	for projectPath, newFileNames := range change.RebuiltPrograms {
		if bucket, ok := b.projects.Get(projectPath); ok {
			bucket.Change(func(bucket *RegistryBucket) {
				bucket.state.newProgramStructure = core.IfElse(newFileNames, newProgramStructureDifferentFileNames, newProgramStructureSameFileNames)
			})
		}
	}

	// Mark files dirty, bailing out if all buckets already have multiple files dirty
	cleanNodeModulesBuckets := make(map[tspath.Path]struct{})
	cleanProjectBuckets := make(map[tspath.Path]struct{})
	b.nodeModules.Range(func(entry *dirty.MapEntry[tspath.Path, *RegistryBucket]) bool {
		if !entry.Value().state.multipleFilesDirty {
			cleanNodeModulesBuckets[entry.Key()] = struct{}{}
		}
		return true
	})
	b.projects.Range(func(entry *dirty.MapEntry[tspath.Path, *RegistryBucket]) bool {
		if !entry.Value().state.multipleFilesDirty {
			cleanProjectBuckets[entry.Key()] = struct{}{}
		}
		return true
	})

	markFilesDirty := func(uris map[lsproto.DocumentUri]struct{}) {
		if len(cleanNodeModulesBuckets) == 0 && len(cleanProjectBuckets) == 0 {
			return
		}
		for uri := range uris {
			path := b.base.toPath(uri.FileName())
			if len(cleanNodeModulesBuckets) > 0 {
				// For node_modules, mark the bucket dirty if anything changes in the directory.
				// The path could be either a symlink path (containing /node_modules/) or a realpath
				// (for symlinked project references). Both are recorded in Paths for granular updates.
				if nodeModulesIndex := strings.Index(string(path), "/node_modules/"); nodeModulesIndex != -1 {
					dirPath := path[:nodeModulesIndex]
					if _, ok := cleanNodeModulesBuckets[dirPath]; ok {
						entry := core.FirstResult(b.nodeModules.Get(dirPath))
						// Look up the package name for granular updates
						packageName := entry.Value().Paths[path]
						entry.Change(func(bucket *RegistryBucket) { bucket.markNodeModulesDirty(packageName) })
						if !entry.Value().state.multipleFilesDirty {
							delete(cleanNodeModulesBuckets, dirPath)
						}
					}
				} else {
					// Check if this path (possibly a realpath of a symlinked package) is in any bucket's Paths.
					// This handles symlinked packages where the realpath doesn't contain /node_modules/.
					for bucketDirPath := range cleanNodeModulesBuckets {
						entry := core.FirstResult(b.nodeModules.Get(bucketDirPath))
						if packageName, ok := entry.Value().Paths[path]; ok {
							// Use the package name for granular updates
							entry.Change(func(bucket *RegistryBucket) { bucket.markNodeModulesDirty(packageName) })
							if !entry.Value().state.multipleFilesDirty {
								delete(cleanNodeModulesBuckets, bucketDirPath)
							}
						}
					}
				}
			}

			// For projects, mark the bucket dirty if the bucket contains the file directly.
			// Any other significant change, like a created failed lookup location, is
			// handled by newProgramStructure.
			for projectDirPath := range cleanProjectBuckets {
				entry, _ := b.projects.Get(projectDirPath)
				if _, ok := entry.Value().Paths[path]; ok {
					// Project buckets don't use package-based granular updates
					entry.Change(func(bucket *RegistryBucket) { bucket.markProjectFileDirty(path) })
					if !entry.Value().state.multipleFilesDirty {
						delete(cleanProjectBuckets, projectDirPath)
					}
				}
			}
		}
	}

	markFilesDirty(change.Created.Keys())
	markFilesDirty(change.Deleted.Keys())
	markFilesDirty(change.Changed.Keys())
}

func (b *registryBuilder) updateIndexes(ctx context.Context, change RegistryChange, logger *logging.LogTree) {
	type task struct {
		entry           *dirty.MapEntry[tspath.Path, *RegistryBucket]
		dependencyNames *collections.Set[string]
		result          *bucketBuildResult
		err             error
	}

	projectPath, _ := b.host.GetDefaultProject(change.RequestedFile)
	if projectPath == "" {
		return
	}

	var tasks []*task
	var wg sync.WaitGroup

	// Compute resolved package names and project reference output mappings for all projects upfront.
	// Resolved package names are needed to compute node_modules dependencies so packages that are
	// directly imported by programs are included even if not listed in package.json.
	// Project reference output mappings are needed to redirect extraction from output .d.ts files
	// to source files for packages that are project references.
	// We need all projects because a node_modules directory can be used by multiple projects.
	allResolvedPackageNames := make(map[tspath.Path]*collections.Set[string])
	projectReferenceOutputs := make(map[tspath.Path]string)
	b.projects.Range(func(entry *dirty.MapEntry[tspath.Path, *RegistryBucket]) bool {
		program := b.host.GetProgramForProject(entry.Key())
		if program != nil {
			allResolvedPackageNames[entry.Key()] = getResolvedPackageNames(ctx, program)
			addProjectReferenceOutputMappings(program, projectReferenceOutputs)
		}
		return true
	})

	tspath.ForEachAncestorDirectoryPath(change.RequestedFile, func(dirPath tspath.Path) (any, bool) {
		if nodeModulesBucket, ok := b.nodeModules.Get(dirPath); ok {
			dirName := core.FirstResult(b.directories.Get(dirPath)).Value().name
			dependencies := b.computeDependenciesForNodeModulesDirectory(change, allResolvedPackageNames, dirName, dirPath)
			bucketState := nodeModulesBucket.Value().state
			// !!! Optimization: handle different dependency set via granular updates
			needsFullRebuild := bucketState.multipleFilesDirty || !nodeModulesBucket.Value().DependencyNames.Equals(dependencies)
			dirtyPackages := bucketState.DirtyPackages()
			canDoGranularUpdate := !needsFullRebuild && dirtyPackages.Len() > 0

			if needsFullRebuild {
				task := &task{entry: nodeModulesBucket, dependencyNames: dependencies}
				tasks = append(tasks, task)
				wg.Go(func() {
					result, err := b.buildNodeModulesBucket(ctx, dependencies, dirName, dirPath, projectReferenceOutputs, logger.Fork("Building node_modules bucket "+dirName))
					task.result = result
					task.err = err
				})
			} else if canDoGranularUpdate {
				task := &task{entry: nodeModulesBucket, dependencyNames: dependencies}
				tasks = append(tasks, task)
				wg.Go(func() {
					result, err := b.updateNodeModulesBucket(ctx, nodeModulesBucket.Value(), dirtyPackages, dirName, dirPath, projectReferenceOutputs, logger.Fork("Updating node_modules bucket "+dirName))
					task.result = result
					task.err = err
				})
			}
		}
		return nil, false
	})

	if project, hasProject := b.projects.Get(projectPath); hasProject {
		program := b.host.GetProgramForProject(projectPath)
		resolvedPackageNames := allResolvedPackageNames[projectPath]
		shouldRebuild := project.Value().state.hasDirtyFileBesides(change.RequestedFile)
		if !shouldRebuild && project.Value().state.newProgramStructure > 0 {
			// Check if resolved package names changed, or if there are new non-node_modules files.
			// If so, we need to rebuild both the project bucket and potentially node_modules buckets.
			if !project.Value().ResolvedPackageNames.Equals(resolvedPackageNames) || hasNewNonNodeModulesFiles(program, project.Value()) {
				shouldRebuild = true
			} else {
				project.Change(func(b *RegistryBucket) { b.state.newProgramStructure = newProgramStructureFalse })
			}
		}
		if shouldRebuild {
			task := &task{entry: project}
			tasks = append(tasks, task)
			wg.Go(func() {
				index, err := b.buildProjectBucket(
					ctx,
					projectPath,
					resolvedPackageNames,
					logger.Fork("Building project bucket "+string(projectPath)),
				)
				task.result = index
				task.err = err
			})
		}
	}

	start := time.Now()
	wg.Wait()

	for _, t := range tasks {
		if t.err != nil {
			continue
		}
		t.entry.Replace(t.result.bucket)
	}

	// If we failed to resolve any alias exports by ending up at a non-relative module specifier
	// that didn't resolve to another package, it's probably an ambient module declared in another package.
	// We recorded these failures, along with the name of every ambient module declared elsewhere, so we
	// can do a second pass on the failed files, this time including the ambient modules declarations that
	// were missing the first time. Example: node_modules/fs-extra/index.d.ts is simply `export * from "fs"`,
	// but when trying to resolve the `export *`, we don't know where "fs" is declared. The aliasResolver
	// tries to find packages named "fs" on the file system, but after failing, records "fs" as a failure
	// for fs-extra/index.d.ts. Meanwhile, if we also processed node_modules/@types/node/fs.d.ts, we
	// recorded that file as declaring the ambient module "fs". In the second pass, we combine those two
	// files and reprocess fs-extra/index.d.ts, this time finding "fs" declared in @types/node.
	secondPassStart := time.Now()
	var secondPassFileCount int
	for _, t := range tasks {
		if t.err != nil {
			continue
		}
		if t.result.possibleFailedAmbientModuleLookupTargets == nil {
			continue
		}
		rootFiles := make(map[string]*ast.SourceFile)
		for target := range t.result.possibleFailedAmbientModuleLookupTargets.Keys() {
			for _, fileName := range b.resolveAmbientModuleName(target, t.entry.Key()) {
				if _, exists := rootFiles[fileName]; exists {
					continue
				}
				rootFiles[fileName] = b.host.GetSourceFile(fileName, b.base.toPath(fileName))
				secondPassFileCount++
			}
		}
		if len(rootFiles) > 0 {
			moduleResolver := module.NewResolver(b.host, core.EmptyCompilerOptions, "", "")
			aliasResolver := newAliasResolver(
				slices.Collect(maps.Values(rootFiles)),
				nil,
				b.host,
				moduleResolver,
				b.base.toPath,
				func(_ ast.HasFileName, _ string) {
					// no-op
				},
			)
			ch, _ := checker.NewChecker(aliasResolver)
			t.result.possibleFailedAmbientModuleLookupSources.Range(func(path tspath.Path, source *failedAmbientModuleLookupSource) bool {
				sourceFile := aliasResolver.GetSourceFile(source.fileName)
				extractor := b.newExportExtractor(t.entry.Key(), source.packageName, ch, moduleResolver, b.host.FS().Realpath)
				fileExports := extractor.extractFromFile(sourceFile)
				for _, exp := range fileExports {
					t.result.bucket.Index.insertAsWords(exp)
				}
				return true
			})
		}
	}

	if logger != nil && len(tasks) > 0 {
		if secondPassFileCount > 0 {
			logger.Logf("%d files required second pass, took %v", secondPassFileCount, time.Since(secondPassStart))
		}
		logger.Logf("Built %d indexes in %v", len(tasks), time.Since(start))
	}
}

func hasNewNonNodeModulesFiles(program *compiler.Program, bucket *RegistryBucket) bool {
	if bucket.state.newProgramStructure != newProgramStructureDifferentFileNames {
		return false
	}
	for _, file := range program.GetSourceFiles() {
		if strings.Contains(file.FileName(), "/node_modules/") || isIgnoredFile(program, file) {
			continue
		}
		if _, ok := bucket.Paths[file.Path()]; !ok {
			return true
		}
	}
	return false
}

func isIgnoredFile(program *compiler.Program, file *ast.SourceFile) bool {
	return program.IsSourceFileDefaultLibrary(file.Path()) || program.IsGlobalTypingsFile(file.FileName())
}

// hasSymlinkToNodeModules checks if a file's realpath has a symlink that points
// to a node_modules directory. This is used to skip files in the project bucket
// that would be duplicated by the node_modules bucket via their symlink.
func hasSymlinkToNodeModules(filePath tspath.Path, symlinkCache *symlinks.KnownSymlinks) bool {
	if symlinkCache == nil {
		return false
	}

	// First check if the file itself has a symlink to node_modules
	if filesByRealpath := symlinkCache.FilesByRealpath(); filesByRealpath != nil {
		if symlinkPaths, ok := filesByRealpath.Load(filePath); ok {
			found := false
			symlinkPaths.Range(func(symlinkPath string) bool {
				if strings.Contains(symlinkPath, "/node_modules/") {
					found = true
					return false // stop ranging
				}
				return true
			})
			if found {
				return true
			}
		}
	}

	// Fall back to checking ancestor directories
	directoriesByRealpath := symlinkCache.DirectoriesByRealpath()
	if directoriesByRealpath == nil {
		return false
	}
	found := false
	tspath.ForEachAncestorDirectoryPath(filePath, func(dirPath tspath.Path) (any, bool) {
		symlinkPaths, ok := directoriesByRealpath.Load(dirPath.EnsureTrailingDirectorySeparator())
		if !ok {
			return nil, false
		}
		// Check if any of the symlinks point to a node_modules directory
		symlinkPaths.Range(func(symlinkPath string) bool {
			if strings.Contains(symlinkPath, "/node_modules/") {
				found = true
				return false // stop ranging
			}
			return true
		})
		return nil, found // stop if we found a match
	})
	return found
}

type failedAmbientModuleLookupSource struct {
	mu          sync.Mutex
	fileName    string
	packageName string
}

type bucketBuildResult struct {
	bucket *RegistryBucket
	// File path to filename and package name
	possibleFailedAmbientModuleLookupSources *collections.SyncMap[tspath.Path, *failedAmbientModuleLookupSource]
	// Likely ambient module name
	possibleFailedAmbientModuleLookupTargets *collections.SyncSet[string]
}

func (b *registryBuilder) buildProjectBucket(
	ctx context.Context,
	projectPath tspath.Path,
	resolvedPackageNames *collections.Set[string],
	logger *logging.LogTree,
) (*bucketBuildResult, error) {
	if ctx.Err() != nil {
		return nil, ctx.Err()
	}

	start := time.Now()
	var mu sync.Mutex
	fileExcludePatterns := b.userPreferences.ParsedAutoImportFileExcludePatterns(b.host.FS().UseCaseSensitiveFileNames())
	result := &bucketBuildResult{bucket: &RegistryBucket{}}
	moduleResolver := module.NewResolver(b.host, core.EmptyCompilerOptions, "", "")
	program := b.host.GetProgramForProject(projectPath)
	symlinkCache := program.GetSymlinkCache()
	getChecker, closePool, checkerCount := createCheckerPool(program)
	defer closePool()
	exports := make(map[tspath.Path][]*Export)
	var wg sync.WaitGroup
	var skippedFileCount int
	var combinedStats extractorStats

outer:
	for _, file := range program.GetSourceFiles() {
		if isIgnoredFile(program, file) {
			continue
		}
		for _, excludePattern := range fileExcludePatterns {
			if matched, _ := excludePattern.MatchString(file.FileName()); matched {
				skippedFileCount++
				continue outer
			}
		}
		// Skip all node_modules files - they are always handled by node_modules buckets.
		// This simplifies the logic and ensures exports are indexed consistently.
		if strings.Contains(file.FileName(), "/node_modules/") {
			continue
		}
		// Skip files that are realpaths of symlinks in node_modules.
		// These files will be indexed via their symlinked path in node_modules buckets.
		if hasSymlinkToNodeModules(file.Path(), symlinkCache) {
			continue
		}
		wg.Go(func() {
			if ctx.Err() == nil {
				checker, done := getChecker()
				defer done()
				extractor := b.newExportExtractor("", "", checker, moduleResolver, nil)
				fileExports := extractor.extractFromFile(file)
				mu.Lock()
				exports[file.Path()] = fileExports
				mu.Unlock()
				stats := extractor.Stats()
				combinedStats.exports.Add(stats.exports.Load())
				combinedStats.usedChecker.Add(stats.usedChecker.Load())
			}
		})
	}

	wg.Wait()

	indexStart := time.Now()
	idx := &Index[*Export]{}
	paths := make(map[tspath.Path]string, len(exports))
	for path, fileExports := range exports {
		paths[path] = "" // Empty string for project buckets
		for _, exp := range fileExports {
			idx.insertAsWords(exp)
		}
	}

	result.bucket.Paths = paths
	result.bucket.Index = idx
	result.bucket.ResolvedPackageNames = resolvedPackageNames
	result.bucket.state.fileExcludePatterns = b.userPreferences.AutoImportFileExcludePatterns

	if logger != nil {
		logger.Logf("Extracted exports: %v (%d exports, %d used checker, %d created checkers)", indexStart.Sub(start), combinedStats.exports.Load(), combinedStats.usedChecker.Load(), checkerCount())
		if skippedFileCount > 0 {
			logger.Logf("Skipped %d files due to exclude patterns", skippedFileCount)
		}
		logger.Logf("Built index: %v", time.Since(indexStart))
		logger.Logf("Bucket total: %v", time.Since(start))
	}
	return result, nil
}

func (b *registryBuilder) computeDependenciesForNodeModulesDirectory(change RegistryChange, allResolvedPackageNames map[tspath.Path]*collections.Set[string], dirName string, dirPath tspath.Path) *collections.Set[string] {
	// If any open files are in scope of this directory but not in scope of any package.json,
	// we need to add all packages in this node_modules directory.
	for path := range change.OpenFiles {
		if dirPath.ContainsPath(path) && b.getNearestAncestorDirectoryWithValidPackageJson(path) == nil {
			return nil
		}
	}

	// Get all package.jsons that have this node_modules directory in their spine
	dependencies := &collections.Set[string]{}
	b.directories.Range(func(entry *dirty.MapEntry[tspath.Path, *directory]) bool {
		if entry.Value().packageJson.Exists() && dirPath.ContainsPath(entry.Key()) {
			addPackageJsonDependencies(entry.Value().packageJson.Contents, dependencies)
		}
		return true
	})

	// Add packages that are directly imported by programs but not listed in package.json.
	// This ensures node_modules files are always in node_modules buckets.
	// Include packages from all projects that have this node_modules directory in their spine.
	for _, resolvedPackageNames := range allResolvedPackageNames {
		for name := range resolvedPackageNames.Keys() {
			dependencies.Add(name)
		}
	}

	return dependencies
}

// packageExtractionResult holds the results of extracting exports from a set of packages.
type packageExtractionResult struct {
	exports                                  map[tspath.Path][]*Export
	packageFiles                             map[string]map[tspath.Path]string
	ambientModuleNames                       map[string][]string
	entrypoints                              []*module.ResolvedEntrypoints
	projectReferencePackages                 *collections.Set[string]
	possibleFailedAmbientModuleLookupSources *collections.SyncMap[tspath.Path, *failedAmbientModuleLookupSource]
	possibleFailedAmbientModuleLookupTargets *collections.SyncSet[string]
	stats                                    extractorStats
	skippedEntrypointsCount                  int32
}

// extractPackages extracts exports from a set of packages in parallel.
// This is the core extraction logic shared by buildNodeModulesBucket and updateNodeModulesBucket.
func (b *registryBuilder) extractPackages(
	ctx context.Context,
	packageNames *collections.Set[string],
	dirName string,
	dirPath tspath.Path,
	projectReferenceOutputs map[tspath.Path]string,
	fileExcludePatterns []*regexp2.Regexp,
) *packageExtractionResult {
	result := &packageExtractionResult{
		exports:                                  make(map[tspath.Path][]*Export),
		packageFiles:                             make(map[string]map[tspath.Path]string),
		ambientModuleNames:                       make(map[string][]string),
		projectReferencePackages:                 &collections.Set[string]{},
		possibleFailedAmbientModuleLookupSources: &collections.SyncMap[tspath.Path, *failedAmbientModuleLookupSource]{},
		possibleFailedAmbientModuleLookupTargets: &collections.SyncSet[string]{},
	}

	var exportsMu sync.Mutex
	var entrypointsMu sync.Mutex
	var projectRefMu sync.Mutex

	createAliasResolver := func(packageName string, entrypoints []*module.ResolvedEntrypoint, toSymlink func(string) string, moduleResolver *module.Resolver) *aliasResolver {
		seenFiles := collections.NewSetWithSizeHint[tspath.Path](len(entrypoints))
		rootFiles := make([]*ast.SourceFile, len(entrypoints))
		symlinks := make(map[tspath.Path]pathAndFileName)
		var wg sync.WaitGroup
		for i, entrypoint := range entrypoints {
			fileName := entrypoint.SymlinkOrRealpath()

			// Compute realpath for deduplication and project reference output lookup.
			realpathFileName := entrypoint.ResolvedFileName
			realpathPath := b.base.toPath(realpathFileName)

			// Check if this is a project reference output file that should be redirected to source.
			if inputFileName, ok := projectReferenceOutputs[realpathPath]; ok {
				fileName = toSymlink(inputFileName)
				realpathFileName = inputFileName
				realpathPath = b.base.toPath(realpathFileName)
				// Mark this package as a project reference for granular update tracking
				projectRefMu.Lock()
				result.projectReferencePackages.Add(packageName)
				projectRefMu.Unlock()
			}

			if !seenFiles.AddIfAbsent(realpathPath) {
				continue
			}
			if fileName != realpathFileName {
				symlinkPath := b.base.toPath(fileName)
				symlinks[realpathPath] = pathAndFileName{path: symlinkPath, fileName: fileName}
			}
			wg.Go(func() {
				file := b.host.GetSourceFile(realpathFileName, realpathPath)
				binder.BindSourceFile(file)
				rootFiles[i] = file
			})
		}
		wg.Wait()

		rootFiles = slices.DeleteFunc(rootFiles, func(f *ast.SourceFile) bool {
			return f == nil
		})

		return newAliasResolver(rootFiles, symlinks, b.host, moduleResolver, b.base.toPath, func(source ast.HasFileName, moduleName string) {
			result.possibleFailedAmbientModuleLookupTargets.Add(moduleName)
			result.possibleFailedAmbientModuleLookupSources.LoadOrStore(source.Path(), &failedAmbientModuleLookupSource{
				fileName: source.FileName(),
			})
		})
	}

	var wg sync.WaitGroup
	for packageName := range packageNames.Keys() {
		wg.Go(func() {
			if ctx.Err() != nil {
				return
			}

			typesPackageName := module.GetTypesPackageName(packageName)
			var packageJson *packagejson.InfoCacheEntry
			packageJson = b.host.GetPackageJson(tspath.CombinePaths(dirName, "node_modules", packageName, "package.json"))
			if !packageJson.DirectoryExists {
				packageJson = b.host.GetPackageJson(tspath.CombinePaths(dirName, "node_modules", typesPackageName, "package.json"))
			}

			toRealpath, toSymlink := getPackageRealpathFuncs(b.host.FS(), packageJson.PackageDirectory)
			resolver := getModuleResolver(b.host, toRealpath)
			packageEntrypoints := resolver.GetEntrypointsFromPackageJsonInfo(packageJson, packageName)
			if packageEntrypoints == nil {
				return
			}
			if len(fileExcludePatterns) > 0 {
				count := int32(len(packageEntrypoints.Entrypoints))
				packageEntrypoints.Entrypoints = slices.DeleteFunc(packageEntrypoints.Entrypoints, func(entrypoint *module.ResolvedEntrypoint) bool {
					for _, excludePattern := range fileExcludePatterns {
						if matched, _ := excludePattern.MatchString(entrypoint.ResolvedFileName); matched {
							return true
						}
					}
					return false
				})
				atomic.AddInt32(&result.skippedEntrypointsCount, count-int32(len(packageEntrypoints.Entrypoints)))
			}
			if len(packageEntrypoints.Entrypoints) == 0 {
				return
			}

			entrypointsMu.Lock()
			result.entrypoints = append(result.entrypoints, packageEntrypoints)
			entrypointsMu.Unlock()

			aliasResolver := createAliasResolver(packageName, packageEntrypoints.Entrypoints, toSymlink, resolver)
			ch, _ := checker.NewChecker(aliasResolver)
			extractor := b.newExportExtractor(dirPath, packageName, ch, resolver, toRealpath)
			for _, entrypoint := range aliasResolver.rootFiles {
				if ctx.Err() != nil {
					return
				}

				fileExports := extractor.extractFromFile(entrypoint)
				exportsMu.Lock()
				for _, name := range entrypoint.AmbientModuleNames {
					result.ambientModuleNames[name] = append(result.ambientModuleNames[name], entrypoint.FileName())
				}
				if result.packageFiles[packageName] == nil {
					result.packageFiles[packageName] = make(map[tspath.Path]string)
				}
				result.packageFiles[packageName][entrypoint.Path()] = entrypoint.FileName()
				if symlink, ok := aliasResolver.symlinks[entrypoint.Path()]; ok {
					result.packageFiles[packageName][symlink.path] = symlink.fileName
				}

				if source, ok := result.possibleFailedAmbientModuleLookupSources.Load(entrypoint.Path()); !ok {
					result.exports[entrypoint.Path()] = fileExports
				} else {
					source.mu.Lock()
					source.packageName = packageName
					source.mu.Unlock()
				}
				exportsMu.Unlock()
			}
			stats := extractor.Stats()
			result.stats.exports.Add(stats.exports.Load())
			result.stats.usedChecker.Add(stats.usedChecker.Load())
		})
	}

	wg.Wait()
	return result
}

func (b *registryBuilder) buildNodeModulesBucket(
	ctx context.Context,
	dependencies *collections.Set[string],
	dirName string,
	dirPath tspath.Path,
	projectReferenceOutputs map[tspath.Path]string,
	logger *logging.LogTree,
) (*bucketBuildResult, error) {
	if ctx.Err() != nil {
		return nil, ctx.Err()
	}

	start := time.Now()
	fileExcludePatterns := b.userPreferences.ParsedAutoImportFileExcludePatterns(b.host.FS().UseCaseSensitiveFileNames())
	directoryPackageNames, err := getPackageNamesInNodeModules(tspath.CombinePaths(dirName, "node_modules"), b.host.FS())
	if err != nil {
		return nil, err
	}

	extractorStart := time.Now()
	packageNames := core.Coalesce(dependencies, directoryPackageNames)

	extraction := b.extractPackages(ctx, packageNames, dirName, dirPath, projectReferenceOutputs, fileExcludePatterns)

	indexStart := time.Now()

	// Build PackageFiles with all directory package names; indexed packages have
	// non-nil maps, unindexed packages have nil maps.
	allPackageFiles := make(map[string]map[tspath.Path]string, directoryPackageNames.Len())
	for pkgName := range directoryPackageNames.Keys() {
		allPackageFiles[pkgName] = extraction.packageFiles[pkgName]
	}

	// Build Paths as reverse mapping from path to package name.
	// Only include paths for packages that are project references (eligible for granular updates).
	paths := make(map[tspath.Path]string)
	for pkgName := range extraction.projectReferencePackages.Keys() {
		if files, ok := extraction.packageFiles[pkgName]; ok {
			for path := range files {
				paths[path] = pkgName
			}
		}
	}

	result := &bucketBuildResult{
		bucket: &RegistryBucket{
			Index:              &Index[*Export]{},
			DependencyNames:    dependencies,
			PackageFiles:       allPackageFiles,
			AmbientModuleNames: extraction.ambientModuleNames,
			Paths:              paths,
			Entrypoints:        make(map[tspath.Path][]*module.ResolvedEntrypoint, len(extraction.exports)),
			state: BucketState{
				fileExcludePatterns: b.userPreferences.AutoImportFileExcludePatterns,
			},
		},
		possibleFailedAmbientModuleLookupSources: extraction.possibleFailedAmbientModuleLookupSources,
		possibleFailedAmbientModuleLookupTargets: extraction.possibleFailedAmbientModuleLookupTargets,
	}
	for _, fileExports := range extraction.exports {
		for _, exp := range fileExports {
			result.bucket.Index.insertAsWords(exp)
		}
	}
	for _, entrypointSet := range extraction.entrypoints {
		for _, entrypoint := range entrypointSet.Entrypoints {
			path := b.base.toPath(entrypoint.ResolvedFileName)
			result.bucket.Entrypoints[path] = append(result.bucket.Entrypoints[path], entrypoint)
		}
	}

	if logger != nil {
		logger.Logf("Determined dependencies and package names: %v", extractorStart.Sub(start))
		logger.Logf("Extracted exports: %v (%d exports, %d used checker)", indexStart.Sub(extractorStart), extraction.stats.exports.Load(), extraction.stats.usedChecker.Load())
		if extraction.skippedEntrypointsCount > 0 {
			logger.Logf("Skipped %d entrypoints due to exclude patterns", extraction.skippedEntrypointsCount)
		}
		logger.Logf("Built index: %v", time.Since(indexStart))
		logger.Logf("Bucket total: %v", time.Since(start))
	}

	return result, ctx.Err()
}

// updateNodeModulesBucket performs a granular update of the node_modules bucket,
// re-extracting only the dirty packages and merging with the existing bucket.
func (b *registryBuilder) updateNodeModulesBucket(
	ctx context.Context,
	existingBucket *RegistryBucket,
	dirtyPackages *collections.Set[string],
	dirName string,
	dirPath tspath.Path,
	projectReferenceOutputs map[tspath.Path]string,
	logger *logging.LogTree,
) (*bucketBuildResult, error) {
	if ctx.Err() != nil {
		return nil, ctx.Err()
	}

	start := time.Now()
	fileExcludePatterns := b.userPreferences.ParsedAutoImportFileExcludePatterns(b.host.FS().UseCaseSensitiveFileNames())

	// Extract only the dirty packages
	extraction := b.extractPackages(ctx, dirtyPackages, dirName, dirPath, projectReferenceOutputs, fileExcludePatterns)

	indexStart := time.Now()

	// Clone the existing index, excluding exports from dirty packages
	newIndex := existingBucket.Index.Clone(func(exp *Export) bool {
		return !dirtyPackages.Has(exp.PackageName)
	})

	// Clone PackageFiles, removing dirty packages
	newPackageFiles := maps.Clone(existingBucket.PackageFiles)
	for pkgName := range dirtyPackages.Keys() {
		delete(newPackageFiles, pkgName)
	}
	// Add newly extracted package files
	maps.Copy(newPackageFiles, extraction.packageFiles)

	// Clone Paths, removing dirty package paths
	newPaths := make(map[tspath.Path]string, len(existingBucket.Paths))
	for path, pkgName := range existingBucket.Paths {
		if dirtyPackages.Has(pkgName) {
			continue
		}
		newPaths[path] = pkgName
	}
	// Add paths for newly extracted project reference packages
	for pkgName := range extraction.projectReferencePackages.Keys() {
		if files, ok := extraction.packageFiles[pkgName]; ok {
			for path := range files {
				newPaths[path] = pkgName
			}
		}
	}

	// Clone AmbientModuleNames, removing dirty package entries
	newAmbientModuleNames := make(map[string][]string, len(existingBucket.AmbientModuleNames))
	for moduleName, fileNames := range existingBucket.AmbientModuleNames {
		// Filter out files from dirty packages
		var filtered []string
		for _, fileName := range fileNames {
			path := b.base.toPath(fileName)
			if pkgName, ok := existingBucket.Paths[path]; ok && dirtyPackages.Has(pkgName) {
				continue
			}
			filtered = append(filtered, fileName)
		}
		if len(filtered) > 0 {
			newAmbientModuleNames[moduleName] = filtered
		}
	}
	// Add newly extracted ambient module names
	for moduleName, fileNames := range extraction.ambientModuleNames {
		newAmbientModuleNames[moduleName] = append(newAmbientModuleNames[moduleName], fileNames...)
	}

	// Clone Entrypoints, removing dirty package entries
	newEntrypoints := make(map[tspath.Path][]*module.ResolvedEntrypoint, len(existingBucket.Entrypoints))
	for path, eps := range existingBucket.Entrypoints {
		if pkgName, ok := existingBucket.Paths[path]; ok && dirtyPackages.Has(pkgName) {
			continue
		}
		newEntrypoints[path] = eps
	}
	// Add newly extracted entrypoints
	for _, entrypointSet := range extraction.entrypoints {
		for _, entrypoint := range entrypointSet.Entrypoints {
			path := b.base.toPath(entrypoint.ResolvedFileName)
			newEntrypoints[path] = append(newEntrypoints[path], entrypoint)
		}
	}

	// Insert newly extracted exports into the index
	for _, fileExports := range extraction.exports {
		for _, exp := range fileExports {
			newIndex.insertAsWords(exp)
		}
	}

	result := &bucketBuildResult{
		bucket: &RegistryBucket{
			Index:              newIndex,
			DependencyNames:    existingBucket.DependencyNames,
			PackageFiles:       newPackageFiles,
			AmbientModuleNames: newAmbientModuleNames,
			Paths:              newPaths,
			Entrypoints:        newEntrypoints,
			state: BucketState{
				fileExcludePatterns: b.userPreferences.AutoImportFileExcludePatterns,
			},
		},
		possibleFailedAmbientModuleLookupSources: extraction.possibleFailedAmbientModuleLookupSources,
		possibleFailedAmbientModuleLookupTargets: extraction.possibleFailedAmbientModuleLookupTargets,
	}

	if logger != nil {
		logger.Logf("Granular update of %d packages: %v (%d exports)", dirtyPackages.Len(), indexStart.Sub(start), extraction.stats.exports.Load())
		logger.Logf("Built index: %v", time.Since(indexStart))
		logger.Logf("Bucket total: %v", time.Since(start))
	}

	return result, ctx.Err()
}

func (b *registryBuilder) getNearestAncestorDirectoryWithValidPackageJson(filePath tspath.Path) *directory {
	return core.FirstResult(tspath.ForEachAncestorDirectoryPath(filePath.GetDirectoryPath(), func(dirPath tspath.Path) (result *directory, stop bool) {
		if dirEntry, ok := b.directories.Get(dirPath); ok && dirEntry.Value().packageJson.Exists() && dirEntry.Value().packageJson.Contents.Parseable {
			return dirEntry.Value(), true
		}
		return nil, false
	}))
}

func (b *registryBuilder) resolveAmbientModuleName(moduleName string, fromPath tspath.Path) []string {
	return core.FirstResult(tspath.ForEachAncestorDirectoryPath(fromPath, func(dirPath tspath.Path) (result []string, stop bool) {
		if bucket, ok := b.nodeModules.Get(dirPath); ok {
			if fileNames, ok := bucket.Value().AmbientModuleNames[moduleName]; ok {
				return fileNames, true
			}
		}
		return nil, false
	}))
}
