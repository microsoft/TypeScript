package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type Host interface {
	FS() vfs.FS
	DefaultLibraryPath() string
	GetCurrentDirectory() string
	NewLine() string
	Trace(msg string)
	GetProjectVersion() int
	// GetRootFileNames was called GetScriptFileNames in the original code.
	GetRootFileNames() []string
	// GetCompilerOptions was called GetCompilationSettings in the original code.
	GetCompilerOptions() *core.CompilerOptions
	GetSourceFile(fileName string, path tspath.Path, languageVersion core.ScriptTarget) *ast.SourceFile
	// This responsibility was moved from the language service to the project,
	// because they were bidirectionally interdependent.
	GetProgram() *compiler.Program
	GetDefaultLibraryPath() string
	GetPositionEncoding() lsproto.PositionEncodingKind
	GetScriptInfo(fileName string) ScriptInfo
}
