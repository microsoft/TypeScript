package project

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/packagejson"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

type autoImportBuilderFS struct {
	snapshotFSBuilder *snapshotFSBuilder
	untrackedFiles    collections.SyncMap[tspath.PathKey, FileHandle]
}

var _ FileSource = (*autoImportBuilderFS)(nil)

// FS implements FileSource.
func (a *autoImportBuilderFS) FS() vfs.FS {
	return a.snapshotFSBuilder.fs
}

// GetFile implements FileSource.
func (a *autoImportBuilderFS) GetFile(fileName tspath.RootedFilePath) FileHandle {
	path := a.snapshotFSBuilder.caseSensitivity.PathKey(tspath.RootedPath(fileName))
	return a.GetFileByPath(fileName, path)
}

// GetFileByPath implements FileSource.
func (a *autoImportBuilderFS) GetFileByPath(fileName tspath.RootedFilePath, path tspath.PathKey) FileHandle {
	// We want to avoid long-term caching of files referenced only by auto-imports, so we
	// override GetFileByPath to avoid collecting more files into the snapshotFSBuilder's
	// diskFiles. (Note the reason we can't just use the finalized SnapshotFS is that changed
	// files not read during other parts of the snapshot clone will be marked as dirty, but
	// not yet refreshed from disk.)
	if overlay, ok := a.snapshotFSBuilder.overlays[path]; ok {
		return overlay
	}
	if diskFile, ok := a.snapshotFSBuilder.diskFiles.Load(path); ok {
		return a.snapshotFSBuilder.reloadEntryIfNeeded(diskFile)
	}
	if fh, ok := a.untrackedFiles.Load(path); ok {
		return fh
	}
	var fh FileHandle
	content, ok := a.snapshotFSBuilder.fs.ReadFile(fileName)
	if ok {
		fh = newDiskFile(fileName, content)
	}
	fh, _ = a.untrackedFiles.LoadOrStore(path, fh)
	return fh
}

func (a *autoImportBuilderFS) GetAccessibleEntries(path tspath.RootedDirectoryPath) vfs.Entries {
	return a.snapshotFSBuilder.GetAccessibleEntries(path)
}

// FileExists implements FileSource.
func (a *autoImportBuilderFS) FileExists(fileName tspath.RootedFilePath, path tspath.PathKey) bool {
	return a.snapshotFSBuilder.FileExists(fileName, path)
}

type autoImportRegistryCloneHost struct {
	projectCollection *ProjectCollection
	parseCache        *ParseCache
	fs                *sourceFS
	currentDirectory  tspath.RootedDirectoryPath

	filesMu sync.Mutex
	files   []ParseCacheKey
}

var _ autoimport.RegistryCloneHost = (*autoImportRegistryCloneHost)(nil)

func newAutoImportRegistryCloneHost(
	projectCollection *ProjectCollection,
	parseCache *ParseCache,
	snapshotFSBuilder *snapshotFSBuilder,
	currentDirectory tspath.RootedDirectoryPath,
) *autoImportRegistryCloneHost {
	return &autoImportRegistryCloneHost{
		projectCollection: projectCollection,
		parseCache:        parseCache,
		fs:                newSourceFS(false, &autoImportBuilderFS{snapshotFSBuilder: snapshotFSBuilder}),
		currentDirectory:  currentDirectory,
	}
}

// FS implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) FS() vfs.FS {
	return a.fs
}

// GetCurrentDirectory implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return a.currentDirectory
}

// GetDefaultProject implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetDefaultProject(path tspath.PathKey) (tspath.PathKey, *compiler.Program) {
	project := a.projectCollection.GetDefaultProject(path)
	if project == nil {
		return "", nil
	}
	return project.configFilePath, project.GetProgram()
}

// GetPackageJson implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetPackageJson(fileName tspath.RootedFilePath) *packagejson.InfoCacheEntry {
	// !!! ref-counted shared cache
	fh := a.fs.GetFile(fileName)
	packageDirectory := fileName.Directory()
	cachePackageDirectory := packagejson.NewPackageDirectory(packageDirectory, a.fs.CaseSensitivity())
	if fh == nil {
		return &packagejson.InfoCacheEntry{
			DirectoryExists:  a.fs.DirectoryExists(packageDirectory),
			PackageDirectory: cachePackageDirectory,
		}
	}
	fields, err := packagejson.Parse([]byte(fh.Content()))
	if err != nil {
		return &packagejson.InfoCacheEntry{
			DirectoryExists:  true,
			PackageDirectory: cachePackageDirectory,
			Contents: &packagejson.PackageJson{
				Parseable: false,
			},
		}
	}
	return &packagejson.InfoCacheEntry{
		DirectoryExists:  true,
		PackageDirectory: cachePackageDirectory,
		Contents: &packagejson.PackageJson{
			Fields:    fields,
			Parseable: true,
		},
	}
}

// GetProgramForProject implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetProgramForProject(projectPath tspath.PathKey) *compiler.Program {
	project := a.projectCollection.GetProjectByPath(projectPath)
	if project == nil {
		return nil
	}
	return project.GetProgram()
}

// GetSourceFile implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetSourceFile(fileName tspath.RootedFilePath, path tspath.PathKey) *ast.SourceFile {
	fh := a.fs.GetFile(fileName)
	if fh == nil {
		return nil
	}
	opts := ast.SourceFileParseOptions{
		FileName: fh.FileName(),
		PathKey:  path,
	}
	key := NewParseCacheKey(opts, fh.Hash(), fh.Kind())
	result := a.parseCache.Acquire(key, fh)

	a.filesMu.Lock()
	a.files = append(a.files, key)
	a.filesMu.Unlock()

	return result
}

// Dispose implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) Dispose() {
	a.filesMu.Lock()
	defer a.filesMu.Unlock()
	for _, key := range a.files {
		a.parseCache.Deref(key)
	}
}
