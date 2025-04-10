package ls

import (
	"errors"
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/checker"
)

var (
	ErrNoSourceFile      = errors.New("source file not found")
	ErrNoTokenAtPosition = errors.New("no token found at position")
)

func (l *LanguageService) GetSymbolAtPosition(fileName string, position int) (*ast.Symbol, error) {
	program, file := l.tryGetProgramAndFile(fileName)
	if file == nil {
		return nil, fmt.Errorf("%w: %s", ErrNoSourceFile, fileName)
	}
	node := astnav.GetTokenAtPosition(file, position)
	if node == nil {
		return nil, fmt.Errorf("%w: %s:%d", ErrNoTokenAtPosition, fileName, position)
	}
	checker := program.GetTypeChecker()
	return checker.GetSymbolAtLocation(node), nil
}

func (l *LanguageService) GetSymbolAtLocation(node *ast.Node) *ast.Symbol {
	program := l.GetProgram()
	checker := program.GetTypeChecker()
	return checker.GetSymbolAtLocation(node)
}

func (l *LanguageService) GetTypeOfSymbol(symbol *ast.Symbol) *checker.Type {
	checker := l.GetProgram().GetTypeChecker()
	return checker.GetTypeOfSymbolAtLocation(symbol, nil)
}
