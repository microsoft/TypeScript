package project

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/diagnostics"
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

	sourceFS           *sourceFS
	configFileRegistry *ConfigFileRegistry

	project *Project
	builder *ProjectCollectionBuilder
	logger  *logging.LogTree
}

func newCompilerHost(
	currentDirectory string,
	project *Project,
	builder *ProjectCollectionBuilder,
	logger *logging.LogTree,
) *compilerHost {
	return &compilerHost{
		configFilePath:   project.configFilePath,
		currentDirectory: currentDirectory,
		sessionOptions:   builder.sessionOptions,

		sourceFS: newSourceFS(true, builder.fs, builder.toPath),

		project: project,
		builder: builder,
		logger:  logger,
	}
}

// freeze clears references to mutable state to make the compilerHost safe for use
// after the snapshot has been finalized. See the usage in snapshot.go for more details.
func (c *compilerHost) freeze(snapshotFS *SnapshotFS, configFileRegistry *ConfigFileRegistry) {
	if c.builder == nil {
		panic("freeze can only be called once")
	}
	c.sourceFS.source = snapshotFS
	c.sourceFS.DisableTracking()
	c.configFileRegistry = configFileRegistry
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
	return c.sourceFS
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
		// acquireConfigForProject will bypass sourceFS, so track the file here.
		c.sourceFS.Track(fileName)
		return c.builder.configFileRegistryBuilder.acquireConfigForProject(fileName, path, c.project, c.logger)
	}
}

// GetSourceFile implements compiler.CompilerHost. Files are cached in parseCache;
// ref counting is handled at the snapshot level after program construction.
func (c *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	c.ensureAlive()
	if fh := c.sourceFS.GetFileByPath(opts.FileName, opts.Path); fh != nil {
		return c.builder.parseCache.Load(NewParseCacheKey(opts, fh.Hash(), fh.Kind()), fh)
	}
	return nil
}

// Trace implements compiler.CompilerHost.
func (c *compilerHost) Trace(msg *diagnostics.Message, args ...any) {
	panic("unimplemented")
}
