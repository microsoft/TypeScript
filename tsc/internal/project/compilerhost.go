package project

import (
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/binder"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/project/logging"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/zeebo/xxh3"
)

var _ compiler.CompilerHost = (*compilerHost)(nil)

type compilerHost struct {
	configFilePath   tspath.Path
	currentDirectory string
	sessionOptions   *SessionOptions

	sourceFS           *sourceFS
	configFileRegistry *ConfigFileRegistry

	project              *Project
	builder              *ProjectCollectionBuilder
	logger               *logging.LogTree
	contentMapperProject contentmapper.Project
	contentMapperOnce    sync.Once
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

// GetSourceFile implements compiler.CompilerHost. Files are cached in parseCache
// and acquired immediately for the in-progress program.
func (c *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	c.ensureAlive()
	if fh := c.sourceFS.GetFileByPath(opts.FileName, opts.Path); fh != nil {
		key := NewParseCacheKey(opts, fh.Hash(), fh.Kind())
		return c.builder.parseCache.Acquire(key, fh)
	}
	return nil
}

// GetContentMappedSourceFile implements compiler.CompilerHost.
func (c *compilerHost) GetContentMappedSourceFiles(parseOptions ast.SourceFileParseOptions, mapper *contentmapper.Mapper) (contentmapper.SourceFiles, error) {
	c.ensureAlive()
	fh := c.sourceFS.GetFileByPath(parseOptions.FileName, parseOptions.Path)
	if fh == nil {
		return contentmapper.SourceFiles{}, nil
	}
	diagnosticLocale := locale.Default
	if c.builder.client != nil {
		diagnosticLocale = c.builder.client.GetLocale()
	}
	c.ensureContentMapperProject()
	if c.contentMapperProject == nil {
		return contentmapper.SourceFiles{}, contentmapper.ErrProjectUnavailable
	}
	identity, err := c.contentMapperProject.Identity(mapper)
	if err != nil {
		return contentmapper.SourceFiles{}, contentmapper.NewTransformError(contentmapper.TransformErrorKindProject, err)
	}
	transformIdentity := xxh3.Hash128([]byte(identity))
	key := contentMappedParseCacheKey(parseOptions, fh.Hash(), transformIdentity, diagnosticLocale)
	files, err := c.builder.contentMappedParseCache.AcquireOrError(key, func() (contentmapper.SourceFiles, error) {
		files, transformErr := contentmapper.TransformAndParse(parseOptions, fh.Content(), mapper, c.contentMapperProject)
		if transformErr != nil {
			return contentmapper.SourceFiles{}, transformErr
		}
		files.Canonical.Hash = key.Hash
		binder.BindSourceFile(files.Canonical)
		for _, supplemental := range files.Supplemental {
			supplemental.Hash = key.Hash
			binder.BindSourceFile(supplemental)
		}
		return files, nil
	})
	if err == nil {
		err = contentmapper.CheckSupplementalFileNameCollisions(files, c.FS().FileExists)
		if err != nil {
			c.builder.contentMappedParseCache.Deref(key)
			return contentmapper.SourceFiles{}, err
		}
	}
	return files, err
}

func (c *compilerHost) ensureContentMapperProject() {
	c.contentMapperOnce.Do(func() {
		if c.builder.contentMapperHost == nil {
			return
		}
		commandLine := c.project.getCommandLineWithTypingsFiles()
		c.contentMapperProject = c.builder.contentMapperHost.Project(contentmapper.ProjectSpec{
			ConfigFileName:  commandLine.ConfigName(),
			Mappers:         commandLine.ContentMappers(),
			CompilerOptions: commandLine.CompilerOptions(),
		})
	})
}

func (c *compilerHost) ContentMapperProject() contentmapper.Project {
	return c.contentMapperProject
}

// Trace implements compiler.CompilerHost.
func (c *compilerHost) Trace(msg *diagnostics.Message, args ...any) {
	c.logger.Log(msg.Localize(locale.Default, args...))
}
