package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
)

func (l *LanguageService) ProvideHover(fileName string, position int) string {
	program, file := l.getProgramAndFile(fileName)
	node := astnav.GetTouchingPropertyName(file, position)
	if node.Kind == ast.KindSourceFile {
		// Avoid giving quickInfo for the sourceFile as a whole.
		return ""
	}

	checker := program.GetTypeChecker()
	if symbol := checker.GetSymbolAtLocation(node); symbol != nil {
		if t := checker.GetTypeOfSymbolAtLocation(symbol, node); t != nil {
			return checker.TypeToString(t)
		}
	}
	return ""
}
