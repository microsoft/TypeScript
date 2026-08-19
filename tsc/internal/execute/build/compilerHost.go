package build

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type compilerHost struct {
	host                 *host
	trace                func(msg *diagnostics.Message, args ...any)
	contentMapperProject contentmapper.Project
}

var _ compiler.CompilerHost = (*compilerHost)(nil)

func (h *compilerHost) FS() vfs.FS {
	return h.host.FS()
}

func (h *compilerHost) DefaultLibraryPath() string {
	return h.host.DefaultLibraryPath()
}

func (h *compilerHost) GetCurrentDirectory() string {
	return h.host.GetCurrentDirectory()
}

func (h *compilerHost) Trace(msg *diagnostics.Message, args ...any) {
	h.trace(msg, args...)
}

func (h *compilerHost) GetSourceFile(opts ast.SourceFileParseOptions) *ast.SourceFile {
	return h.host.GetSourceFile(opts)
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
	return h.host.GetResolvedProjectReference(fileName, path)
}
