package project

import (
	"fmt"
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
	untrackedFiles    collections.SyncMap[tspath.Path, FileHandle]
}

var _ FileSource = (*autoImportBuilderFS)(nil)

// FS implements FileSource.
func (a *autoImportBuilderFS) FS() vfs.FS {
	return a.snapshotFSBuilder.fs
}

// GetFile implements FileSource.
func (a *autoImportBuilderFS) GetFile(fileName string) FileHandle {
	path := a.snapshotFSBuilder.toPath(fileName)
	return a.GetFileByPath(fileName, path)
}

// GetFileByPath implements FileSource.
func (a *autoImportBuilderFS) GetFileByPath(fileName string, path tspath.Path) FileHandle {
	// We want to avoid long-term caching of files referenced only by auto-imports, so we
	// override GetFileByPath to avoid collecting more files into the snapshotFSBuilder's
	// cacheFiles. (Note the reason we can't just use the finalized SnapshotFS is that changed
	// files not read during other parts of the snapshot clone will be marked as dirty, but
	// not yet refreshed from the source filesystem.)
	if cachedFile, ok := a.snapshotFSBuilder.cacheFiles.Load(path); ok {
		return a.snapshotFSBuilder.reloadEntryIfNeeded(cachedFile)
	}
	if fh, ok := a.untrackedFiles.Load(path); ok {
		return fh
	}
	fh := a.snapshotFSBuilder.fs.GetFileByPath(fileName, path)
	fh, _ = a.untrackedFiles.LoadOrStore(path, fh)
	return fh
}

func (a *autoImportBuilderFS) GetAccessibleEntries(path string) vfs.Entries {
	return a.snapshotFSBuilder.GetAccessibleEntries(path)
}

// FileExists implements FileSource.
func (a *autoImportBuilderFS) FileExists(fileName string, path tspath.Path) bool {
	return a.snapshotFSBuilder.FileExists(fileName, path)
}

type autoImportRegistryCloneHost struct {
	projectCollection *ProjectCollection
	parseCache        *ParseCache
	fs                *sourceFS
	currentDirectory  string

	filesMu sync.Mutex
	files   []ParseCacheKey
}

var _ autoimport.RegistryCloneHost = (*autoImportRegistryCloneHost)(nil)

func newAutoImportRegistryCloneHost(
	projectCollection *ProjectCollection,
	parseCache *ParseCache,
	snapshotFSBuilder *snapshotFSBuilder,
	currentDirectory string,
	toPath func(fileName string) tspath.Path,
) *autoImportRegistryCloneHost {
	return &autoImportRegistryCloneHost{
		projectCollection: projectCollection,
		parseCache:        parseCache,
		fs:                newSourceFS(false, &autoImportBuilderFS{snapshotFSBuilder: snapshotFSBuilder}, toPath),
		currentDirectory:  currentDirectory,
	}
}

// FS implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) FS() vfs.FS {
	return a.fs
}

// GetCurrentDirectory implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetCurrentDirectory() string {
	return a.currentDirectory
}

// GetDefaultProject implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetDefaultProject(path tspath.Path) (autoimport.ProjectID, *compiler.Program) {
	project := a.projectCollection.GetDefaultProject(path)
	if project == nil {
		return nil, nil
	}
	return project.ID(), project.GetProgram()
}

// GetPackageJson implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetPackageJson(fileName string) *packagejson.InfoCacheEntry {
	// !!! ref-counted shared cache
	fh := a.fs.GetFile(fileName)
	packageDirectory := tspath.GetDirectoryPath(fileName)
	if fh == nil {
		return &packagejson.InfoCacheEntry{
			DirectoryExists:  a.fs.DirectoryExists(packageDirectory),
			PackageDirectory: packageDirectory,
		}
	}
	fields, err := packagejson.Parse([]byte(fh.Content()))
	if err != nil {
		return &packagejson.InfoCacheEntry{
			DirectoryExists:  true,
			PackageDirectory: tspath.GetDirectoryPath(fileName),
			Contents: &packagejson.PackageJson{
				Parseable: false,
			},
		}
	}
	return &packagejson.InfoCacheEntry{
		DirectoryExists:  true,
		PackageDirectory: tspath.GetDirectoryPath(fileName),
		Contents: &packagejson.PackageJson{
			Fields:    fields,
			Parseable: true,
		},
	}
}

// GetProgramForProject implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetProgramForProject(projectID autoimport.ProjectID) *compiler.Program {
	id, ok := projectID.(ID)
	if !ok {
		panic(fmt.Sprintf("unexpected project ID type %T", projectID))
	}
	project := a.projectCollection.GetProject(id)
	if project == nil {
		return nil
	}
	return project.GetProgram()
}

// GetSourceFile implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) GetSourceFile(fileName string, path tspath.Path) *ast.SourceFile {
	fh := a.fs.GetFile(fileName)
	if fh == nil {
		return nil
	}
	opts := ast.SourceFileParseOptions{
		FileName: fileName,
		Path:     path,
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
