package project

import (
	"time"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var _ compiler.CompilerHost = (*compilerHost)(nil)

type compilerHost struct {
	configFilePath   tspath.Path
	currentDirectory string
	sessionOptions   *SessionOptions

	fs                 *snapshotFSBuilder
	compilerFS         *compilerFS
	configFileRegistry *ConfigFileRegistry
	seenFiles          *collections.SyncSet[tspath.Path]

	project *Project
	builder *projectCollectionBuilder
	logger  *logging.LogTree
}

type builderFileSource struct {
	seenFiles         *collections.SyncSet[tspath.Path]
	snapshotFSBuilder *snapshotFSBuilder
}

func (c *builderFileSource) GetFile(fileName string) FileHandle {
	path := c.snapshotFSBuilder.toPath(fileName)
	c.seenFiles.Add(path)
	return c.snapshotFSBuilder.GetFileByPath(fileName, path)
}

func (c *builderFileSource) FS() vfs.FS {
	return c.snapshotFSBuilder.FS()
}

func newCompilerHost(
	currentDirectory string,
	project *Project,
	builder *projectCollectionBuilder,
	logger *logging.LogTree,
) *compilerHost {
	seenFiles := &collections.SyncSet[tspath.Path]{}
	compilerFS := &compilerFS{
		source: &builderFileSource{
			seenFiles:         seenFiles,
			snapshotFSBuilder: builder.fs,
		},
	}

	return &compilerHost{
		configFilePath:   project.configFilePath,
		currentDirectory: currentDirectory,
		sessionOptions:   builder.sessionOptions,

		compilerFS: compilerFS,
		seenFiles:  seenFiles,

		fs:      builder.fs,
		project: project,
		builder: builder,
		logger:  logger,
	}
}

// freeze clears references to mutable state to make the compilerHost safe for use
// after the snapshot has been finalized. See the usage in snapshot.go for more details.
func (c *compilerHost) freeze(snapshotFS *snapshotFS, configFileRegistry *ConfigFileRegistry) {
	if c.builder == nil {
		panic("freeze can only be called once")
	}
	c.compilerFS.source = snapshotFS
	c.configFileRegistry = configFileRegistry
	c.fs = nil
	c.builder = nil
	c.project = nil
	c.logger = nil
}

func (c *compilerHost) ensureAlive() {
	if c.builder == nil || c.project == nil {
		panic("method must not be called after snapshot initialization")
	}
}

// DefaultLibraryPath implements compiler.CompilerHost.
func (c *compilerHost) DefaultLibraryPath() string {
	return c.sessionOptions.DefaultLibraryPath
}

// FS implements compiler.CompilerHost.
func (c *compilerHost) FS() vfs.FS {
	return c.compilerFS
}

// GetCurrentDirectory implements compiler.CompilerHost.
func (c *compilerHost) GetCurrentDirectory() string {
	return c.currentDirectory
}

// GetResolvedProjectReference implements compiler.CompilerHost.
func (c *compilerHost) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
	if c.builder == nil {
		return c.configFileRegistry.GetConfig(path)
	} else {
		c.seenFiles.Add(path)
		return c.builder.configFileRegistryBuilder.acquireConfigForProject(fileName, path, c.project, c.logger)
	}
}

// GetSourceFile implements compiler.CompilerHost. GetSourceFile increments
// the ref count of source files it acquires in the parseCache. There should
// be a corresponding release for each call made.
func (c *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	c.ensureAlive()
	c.seenFiles.Add(opts.Path)
	if fh := c.fs.GetFileByPath(opts.FileName, opts.Path); fh != nil {
		return c.builder.parseCache.Acquire(fh, opts, fh.Kind())
	}
	return nil
}

// Trace implements compiler.CompilerHost.
func (c *compilerHost) Trace(msg string) {
	panic("unimplemented")
}

var _ vfs.FS = (*compilerFS)(nil)

type compilerFS struct {
	source FileSource
}

// DirectoryExists implements vfs.FS.
func (fs *compilerFS) DirectoryExists(path string) bool {
	return fs.source.FS().DirectoryExists(path)
}

// FileExists implements vfs.FS.
func (fs *compilerFS) FileExists(path string) bool {
	if fh := fs.source.GetFile(path); fh != nil {
		return true
	}
	return fs.source.FS().FileExists(path)
}

// GetAccessibleEntries implements vfs.FS.
func (fs *compilerFS) GetAccessibleEntries(path string) vfs.Entries {
	return fs.source.FS().GetAccessibleEntries(path)
}

// ReadFile implements vfs.FS.
func (fs *compilerFS) ReadFile(path string) (contents string, ok bool) {
	if fh := fs.source.GetFile(path); fh != nil {
		return fh.Content(), true
	}
	return "", false
}

// Realpath implements vfs.FS.
func (fs *compilerFS) Realpath(path string) string {
	return fs.source.FS().Realpath(path)
}

// Stat implements vfs.FS.
func (fs *compilerFS) Stat(path string) vfs.FileInfo {
	return fs.source.FS().Stat(path)
}

// UseCaseSensitiveFileNames implements vfs.FS.
func (fs *compilerFS) UseCaseSensitiveFileNames() bool {
	return fs.source.FS().UseCaseSensitiveFileNames()
}

// WalkDir implements vfs.FS.
func (fs *compilerFS) WalkDir(root string, walkFn vfs.WalkDirFunc) error {
	panic("unimplemented")
}

// WriteFile implements vfs.FS.
func (fs *compilerFS) WriteFile(path string, data string, writeByteOrderMark bool) error {
	panic("unimplemented")
}

// Remove implements vfs.FS.
func (fs *compilerFS) Remove(path string) error {
	panic("unimplemented")
}

// Chtimes implements vfs.FS.
func (fs *compilerFS) Chtimes(path string, atime time.Time, mtime time.Time) error {
	panic("unimplemented")
}
