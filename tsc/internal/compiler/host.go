package compiler

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/contentmapper"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/tsoptions"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/cachedvfs"
)

type CompilerHost interface {
	FS() vfs.FS
	DefaultLibraryPath() tspath.RootedDirectoryPath
	Trace(msg *diagnostics.Message, args ...any)
	GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile
	// GetContentMappedSourceFile produces the source file for a content-mapped (foreign) file by running
	// the given mapper's transform on the file's content. The caller resolves the mapper (and owns the
	// failure accounting), so implementations must use it as-is. It returns nil if the file cannot be read,
	// or an error if the transform fails or the mapper produces invalid position mappings. Implementations
	// may cache successful results.
	GetContentMappedSourceFiles(parseOptions ast.SourceFileParseOptions, mapper *contentmapper.Mapper) (contentmapper.SourceFiles, error)
	// ContentMapperProject returns the project-scoped content mapper used by this host, or nil when the
	// command line has no content mappers. The project owns transform identity and lifecycle state.
	ContentMapperProject() contentmapper.Project
	GetResolvedProjectReference(fileName tspath.RootedFilePath, path tspath.PathKey) *tsoptions.ParsedCommandLine
}

var _ CompilerHost = (*compilerHost)(nil)

type compilerHost struct {
	fs                   vfs.FS
	defaultLibraryPath   tspath.RootedDirectoryPath
	extendedConfigCache  tsoptions.ExtendedConfigCache
	trace                func(msg *diagnostics.Message, args ...any)
	contentMapperProject contentmapper.Project
}

type parseConfigHost struct {
	fs               vfs.FS
	currentDirectory tspath.RootedDirectoryPath
}

func (h *parseConfigHost) FS() vfs.FS {
	return h.fs
}

func (h *parseConfigHost) GetCurrentDirectory() tspath.RootedDirectoryPath {
	return h.currentDirectory
}

func NewCachedFSCompilerHost(
	fs vfs.FS,
	defaultLibraryPath tspath.RootedDirectoryPath,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	trace func(msg *diagnostics.Message, args ...any),
	contentMapperProject contentmapper.Project,
) CompilerHost {
	return NewCompilerHost(cachedvfs.From(fs), defaultLibraryPath, extendedConfigCache, trace, contentMapperProject)
}

func NewCompilerHost(
	fs vfs.FS,
	defaultLibraryPath tspath.RootedDirectoryPath,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	trace func(msg *diagnostics.Message, args ...any),
	contentMapperProject contentmapper.Project,
) CompilerHost {
	if trace == nil {
		trace = func(msg *diagnostics.Message, args ...any) {}
	}
	return &compilerHost{
		fs:                   fs,
		defaultLibraryPath:   defaultLibraryPath,
		extendedConfigCache:  extendedConfigCache,
		trace:                trace,
		contentMapperProject: contentMapperProject,
	}
}

func (h *compilerHost) FS() vfs.FS {
	return h.fs
}

func (h *compilerHost) DefaultLibraryPath() tspath.RootedDirectoryPath {
	return h.defaultLibraryPath
}

func (h *compilerHost) Trace(msg *diagnostics.Message, args ...any) {
	h.trace(msg, args...)
}

func (h *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	text, ok := h.FS().ReadFile(opts.FileName)
	if !ok {
		return nil
	}
	return parser.ParseSourceFile(opts, text, core.EnsureScriptKindFromFileName(opts.FileName))
}

func (h *compilerHost) GetContentMappedSourceFiles(parseOptions ast.SourceFileParseOptions, mapper *contentmapper.Mapper) (contentmapper.SourceFiles, error) {
	if h.contentMapperProject == nil {
		return contentmapper.SourceFiles{}, contentmapper.ErrProjectUnavailable
	}
	content, ok := h.FS().ReadFile(parseOptions.FileName)
	if !ok {
		return contentmapper.SourceFiles{}, nil
	}
	files, err := contentmapper.TransformAndParse(parseOptions, content, mapper, h.contentMapperProject)
	if err == nil {
		err = contentmapper.CheckSupplementalFileNameCollisions(files, h.FS().FileExists)
	}
	return files, err
}

func (h *compilerHost) ContentMapperProject() contentmapper.Project {
	return h.contentMapperProject
}

func (h *compilerHost) GetResolvedProjectReference(fileName tspath.RootedFilePath, path tspath.PathKey) *tsoptions.ParsedCommandLine {
	host := &parseConfigHost{fs: h.fs, currentDirectory: fileName.Directory()}
	commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, nil, nil /*optionsRaw*/, host, h.extendedConfigCache)
	return commandLine
}
