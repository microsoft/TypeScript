package tstransforms

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
)

func constantExpression(value any, factory *printer.NodeFactory) *ast.Expression {
	switch value := value.(type) {
	case string:
		return factory.NewStringLiteral(value, ast.TokenFlagsNone)
	case jsnum.Number:
		if value.IsInf() {
			inf := factory.NewBinaryExpression(nil, factory.NewNumericLiteral("1", ast.TokenFlagsNone), nil, factory.NewToken(ast.KindSlashToken), factory.NewNumericLiteral("0", ast.TokenFlagsNone))
			if value > 0 {
				return inf
			}
			return factory.NewPrefixUnaryExpression(ast.KindMinusToken, inf)
		}
		if value.IsNaN() {
			return factory.NewBinaryExpression(nil, factory.NewNumericLiteral("0", ast.TokenFlagsNone), nil, factory.NewToken(ast.KindSlashToken), factory.NewNumericLiteral("0", ast.TokenFlagsNone))
		}
		if value < 0 {
			return factory.NewPrefixUnaryExpression(ast.KindMinusToken, constantExpression(-value, factory))
		}
		return factory.NewNumericLiteral(value.String(), ast.TokenFlagsNone)
	}
	return nil
}
