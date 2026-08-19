package compiler

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/cachedvfs"
)

type CompilerHost interface {
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
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
	GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine
}

var _ CompilerHost = (*compilerHost)(nil)

type compilerHost struct {
	currentDirectory     string
	fs                   vfs.FS
	defaultLibraryPath   string
	extendedConfigCache  tsoptions.ExtendedConfigCache
	trace                func(msg *diagnostics.Message, args ...any)
	contentMapperProject contentmapper.Project
}

func NewCachedFSCompilerHost(
	currentDirectory string,
	fs vfs.FS,
	defaultLibraryPath string,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	trace func(msg *diagnostics.Message, args ...any),
	contentMapperProject contentmapper.Project,
) CompilerHost {
	return NewCompilerHost(currentDirectory, cachedvfs.From(fs), defaultLibraryPath, extendedConfigCache, trace, contentMapperProject)
}

func NewCompilerHost(
	currentDirectory string,
	fs vfs.FS,
	defaultLibraryPath string,
	extendedConfigCache tsoptions.ExtendedConfigCache,
	trace func(msg *diagnostics.Message, args ...any),
	contentMapperProject contentmapper.Project,
) CompilerHost {
	if trace == nil {
		trace = func(msg *diagnostics.Message, args ...any) {}
	}
	return &compilerHost{
		currentDirectory:     currentDirectory,
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

func (h *compilerHost) DefaultLibraryPath() string {
	return h.defaultLibraryPath
}

func (h *compilerHost) GetCurrentDirectory() string {
	return h.currentDirectory
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

func (h *compilerHost) GetResolvedProjectReference(fileName string, path tspath.Path) *tsoptions.ParsedCommandLine {
	commandLine, _ := tsoptions.GetParsedCommandLineOfConfigFilePath(fileName, path, nil, nil /*optionsRaw*/, h, h.extendedConfigCache)
	return commandLine
}
