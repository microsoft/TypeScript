package estransforms

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/transformers"
)

func convertClassDeclarationToClassExpression(emitContext *printer.EmitContext, node *ast.ClassDeclaration) *ast.Expression {
	updated := emitContext.Factory.NewClassExpression(
		transformers.ExtractModifiers(emitContext, node.Modifiers(), ^ast.ModifierFlagsExportDefault),
		node.Name(),
		node.TypeParameters,
		node.HeritageClauses,
		node.Members,
	)
	emitContext.SetOriginal(updated, node.AsNode())
	updated.Loc = node.Loc
	return updated
}

func createNotNullCondition(emitContext *printer.EmitContext, left *ast.Node, right *ast.Node, invert bool) *ast.Node {
	token := ast.KindExclamationEqualsEqualsToken
	op := ast.KindAmpersandAmpersandToken
	if invert {
		token = ast.KindEqualsEqualsEqualsToken
		op = ast.KindBarBarToken
	}

	return emitContext.Factory.NewBinaryExpression(
		nil,
		emitContext.Factory.NewBinaryExpression(
			nil,
			left,
			nil,
			emitContext.Factory.NewToken(token),
			emitContext.Factory.NewKeywordExpression(ast.KindNullKeyword),
		),
		nil,
		emitContext.Factory.NewToken(op),
		emitContext.Factory.NewBinaryExpression(
			nil,
			right,
			nil,
			emitContext.Factory.NewToken(token),
			emitContext.Factory.NewVoidZeroExpression(),
		),
	)
}
