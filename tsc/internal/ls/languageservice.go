package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

type LanguageService struct {
	host       Host
	converters *Converters
}

func NewLanguageService(host Host, converters *Converters) *LanguageService {
	return &LanguageService{
		host:       host,
		converters: converters,
	}
}

func (l *LanguageService) GetProgram() *compiler.Program {
	return l.host.GetProgram()
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
