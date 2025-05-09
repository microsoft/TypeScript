package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
)

func (l *LanguageService) GetDocumentDiagnostics(fileName string) []*ast.Diagnostic {
	program, file := l.getProgramAndFile(fileName)
	syntaxDiagnostics := program.GetSyntacticDiagnostics(context.Background(), file)
	semanticDiagnostics := program.GetSemanticDiagnostics(context.Background(), file)
	return slices.Concat(syntaxDiagnostics, semanticDiagnostics)
}
