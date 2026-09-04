package ls

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/ls/autoimport"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/sourcemap"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

type LanguageService struct {
	projectPath             tspath.PathKey
	host                    Host
	activeConfig            lsutil.UserPreferences
	program                 *compiler.Program
	converters              *lsconv.Converters
	documentPositionMappers map[tspath.PathKey]*sourcemap.DocumentPositionMapper
}

func NewLanguageService(
	projectPath tspath.PathKey,
	program *compiler.Program,
	host Host,
	activeFile string,
) *LanguageService {
	return &LanguageService{
		projectPath:             projectPath,
		host:                    host,
		program:                 program,
		converters:              host.Converters(),
		activeConfig:            host.GetPreferences(activeFile),
		documentPositionMappers: map[tspath.PathKey]*sourcemap.DocumentPositionMapper{},
	}
}

func (l *LanguageService) GetProgram() *compiler.Program {
	return l.program
}

func (l *LanguageService) UserPreferences() lsutil.UserPreferences {
	return l.activeConfig
}

func (l *LanguageService) FormatOptions() lsutil.FormatCodeSettings {
	return l.activeConfig.FormatCodeSettings
}

func (l *LanguageService) tryGetProgramAndFile(fileName tspath.RootedFilePath) (*compiler.Program, *ast.SourceFile) {
	program := l.GetProgram()
	file := program.GetSourceFile(fileName)
	return program, file
}

func (l *LanguageService) getProgramAndFile(documentURI lsproto.DocumentUri) (*compiler.Program, *ast.SourceFile) {
	fileName := documentURI.FileName()
	program, file := l.tryGetProgramAndFile(fileName)
	if file == nil {
		panic("file not found: " + fileName.AsString())
	}
	return program, file
}

func (l *LanguageService) GetDocumentPositionMapper(fileName tspath.RootedFilePath) *sourcemap.DocumentPositionMapper {
	path := l.program.PathKeyForFileName(fileName)
	d, ok := l.documentPositionMappers[path]
	if !ok {
		d = sourcemap.GetDocumentPositionMapper(l, fileName)
		l.documentPositionMappers[path] = d
	}
	return d
}

func (l *LanguageService) ReadFile(fileName tspath.RootedFilePath) (string, bool) {
	return l.host.ReadFile(fileName)
}

func (l *LanguageService) CaseSensitivity() tspath.CaseSensitivity {
	return l.host.CaseSensitivity()
}

func (l *LanguageService) GetECMALineInfo(fileName tspath.RootedFilePath) *sourcemap.ECMALineInfo {
	return l.host.GetECMALineInfo(fileName)
}

// getPreparedAutoImportView returns an auto-import view for the given file if the registry is prepared
// to provide up-to-date auto-imports for it. If not, it returns ErrNeedsAutoImports.
func (l *LanguageService) getPreparedAutoImportView(fromFile *ast.SourceFile) (*autoimport.View, error) {
	registry := l.host.AutoImportRegistry()
	registryFile := fromFile
	if canonical := fromFile.CanonicalSourceFile(); canonical != nil {
		registryFile = canonical
	}
	if !registry.IsPreparedForImportingFile(registryFile.FileName(), l.projectPath, l.UserPreferences()) {
		return nil, ErrNeedsAutoImports
	}

	view := autoimport.NewView(registry, fromFile, l.projectPath, l.program, l.UserPreferences().ModuleSpecifierPreferences())
	return view, nil
}

// getCurrentAutoImportView returns an auto-import view for the given file, based on the current state
// of the auto-import registry, which may or may not be up-to-date.
func (l *LanguageService) getCurrentAutoImportView(fromFile *ast.SourceFile) *autoimport.View {
	return autoimport.NewView(
		l.host.AutoImportRegistry(),
		fromFile,
		l.projectPath,
		l.program,
		l.UserPreferences().ModuleSpecifierPreferences(),
	)
}

// Used for module specifier completions.
func (l *LanguageService) DirectoryExists(path tspath.RootedDirectoryPath) bool {
	return l.host.DirectoryExists(path)
}

// Used for module specifier completions.
func (l *LanguageService) ReadDirectory(path tspath.RootedDirectoryPath, extensions []string, includes []string) []tspath.RootedFilePath {
	return l.host.ReadDirectory(path, extensions, nil /*excludes*/, includes, vfsmatch.UnlimitedDepth)
}

func (l *LanguageService) GetDirectories(path tspath.RootedDirectoryPath) []string {
	return l.host.GetDirectories(path)
}
