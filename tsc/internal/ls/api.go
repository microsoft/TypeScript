package ls

import (
	"context"
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

func (l *LanguageService) GetSymbolAtPosition(ctx context.Context, fileName string, position int) (*ast.Symbol, error) {
	program, file := l.tryGetProgramAndFile(fileName)
	if file == nil {
		return nil, fmt.Errorf("%w: %s", ErrNoSourceFile, fileName)
	}
	node := astnav.GetTokenAtPosition(file, position)
	if node == nil {
		return nil, fmt.Errorf("%w: %s:%d", ErrNoTokenAtPosition, fileName, position)
	}
	checker, done := program.GetTypeCheckerForFile(ctx, file)
	defer done()
	return checker.GetSymbolAtLocation(node), nil
}

func (l *LanguageService) GetSymbolAtLocation(ctx context.Context, node *ast.Node) *ast.Symbol {
	program := l.GetProgram()
	checker, done := program.GetTypeCheckerForFile(ctx, ast.GetSourceFileOfNode(node))
	defer done()
	return checker.GetSymbolAtLocation(node)
}

func (l *LanguageService) GetTypeOfSymbol(ctx context.Context, symbol *ast.Symbol) *checker.Type {
	program := l.GetProgram()
	checker, done := program.GetTypeChecker(ctx)
	defer done()
	return checker.GetTypeOfSymbolAtLocation(symbol, nil)
}
