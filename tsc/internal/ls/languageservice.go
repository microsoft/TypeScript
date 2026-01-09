package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/ls/autoimport"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/sourcemap"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type LanguageService struct {
	projectPath             tspath.Path
	host                    Host
	program                 *compiler.Program
	converters              *lsconv.Converters
	documentPositionMappers map[string]*sourcemap.DocumentPositionMapper
}

func NewLanguageService(
	projectPath tspath.Path,
	program *compiler.Program,
	host Host,
) *LanguageService {
	return &LanguageService{
		projectPath:             projectPath,
		host:                    host,
		program:                 program,
		converters:              host.Converters(),
		documentPositionMappers: map[string]*sourcemap.DocumentPositionMapper{},
	}
}

func (l *LanguageService) toPath(fileName string) tspath.Path {
	return tspath.ToPath(fileName, l.program.GetCurrentDirectory(), l.UseCaseSensitiveFileNames())
}

func (l *LanguageService) GetProgram() *compiler.Program {
	return l.program
}

func (l *LanguageService) UserPreferences() *lsutil.UserPreferences {
	return l.host.UserPreferences()
}

func (l *LanguageService) FormatOptions() *format.FormatCodeSettings {
	if formatOptions := l.host.FormatOptions(); formatOptions != nil {
		return formatOptions
	}
	return format.GetDefaultFormatCodeSettings(l.GetProgram().Options().NewLine.GetNewLineCharacter())
}

func (l *LanguageService) tryGetProgramAndFile(fileName string) (*compiler.Program, *ast.SourceFile) {
	program := l.GetProgram()
	file := program.GetSourceFile(fileName)
	return program, file
}

func (l *LanguageService) getProgramAndFile(documentURI lsproto.DocumentUri) (*compiler.Program, *ast.SourceFile) {
	fileName := documentURI.FileName()
	program, file := l.tryGetProgramAndFile(fileName)
	if file == nil {
		panic("file not found: " + fileName)
	}
	return program, file
}

func (l *LanguageService) GetDocumentPositionMapper(fileName string) *sourcemap.DocumentPositionMapper {
	d, ok := l.documentPositionMappers[fileName]
	if !ok {
		d = sourcemap.GetDocumentPositionMapper(l, fileName)
		l.documentPositionMappers[fileName] = d
	}
	return d
}

func (l *LanguageService) ReadFile(fileName string) (string, bool) {
	return l.host.ReadFile(fileName)
}

func (l *LanguageService) UseCaseSensitiveFileNames() bool {
	return l.host.UseCaseSensitiveFileNames()
}

func (l *LanguageService) GetECMALineInfo(fileName string) *sourcemap.ECMALineInfo {
	return l.host.GetECMALineInfo(fileName)
}

// getPreparedAutoImportView returns an auto-import view for the given file if the registry is prepared
// to provide up-to-date auto-imports for it. If not, it returns ErrNeedsAutoImports.
func (l *LanguageService) getPreparedAutoImportView(fromFile *ast.SourceFile) (*autoimport.View, error) {
	registry := l.host.AutoImportRegistry()
	if !registry.IsPreparedForImportingFile(fromFile.FileName(), l.projectPath, l.UserPreferences()) {
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
