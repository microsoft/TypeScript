package project

import (
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/packagejson"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
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

func (a *autoImportBuilderFS) GetAccessibleEntries(path string) vfs.Entries {
	return a.snapshotFSBuilder.GetAccessibleEntries(path)
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
func (a *autoImportRegistryCloneHost) GetDefaultProject(path tspath.Path) (tspath.Path, *compiler.Program) {
	project := a.projectCollection.GetDefaultProject(path)
	if project == nil {
		return "", nil
	}
	return project.configFilePath, project.GetProgram()
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
func (a *autoImportRegistryCloneHost) GetProgramForProject(projectPath tspath.Path) *compiler.Program {
	project := a.projectCollection.GetProjectByPath(projectPath)
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
		FileName:         fileName,
		Path:             path,
		CompilerOptions:  core.EmptyCompilerOptions.SourceFileAffecting(),
		JSDocParsingMode: ast.JSDocParsingModeParseAll,
	}
	key := NewParseCacheKey(opts, fh.Hash(), fh.Kind())

	a.filesMu.Lock()
	a.files = append(a.files, key)
	a.filesMu.Unlock()
	return a.parseCache.Acquire(key, fh)
}

// Dispose implements autoimport.RegistryCloneHost.
func (a *autoImportRegistryCloneHost) Dispose() {
	a.filesMu.Lock()
	defer a.filesMu.Unlock()
	for _, key := range a.files {
		a.parseCache.Deref(key)
	}
}
