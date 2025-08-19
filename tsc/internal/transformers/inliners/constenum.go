package inliners

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/transformers"
)

type ConstEnumInliningTransformer struct {
	transformers.Transformer
	compilerOptions   *core.CompilerOptions
	currentSourceFile *ast.SourceFile
	emitResolver      printer.EmitResolver
}

func NewConstEnumInliningTransformer(opt *transformers.TransformOptions) *transformers.Transformer {
	compilerOptions := opt.CompilerOptions
	emitContext := opt.Context
	if compilerOptions.GetIsolatedModules() {
		debug.Fail("const enums are not inlined under isolated modules")
	}
	tx := &ConstEnumInliningTransformer{compilerOptions: compilerOptions, emitResolver: opt.EmitResolver}
	return tx.NewTransformer(tx.visit, emitContext)
}

func (tx *ConstEnumInliningTransformer) visit(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		{
			parse := tx.EmitContext().ParseNode(node)
			if parse == nil {
				return tx.Visitor().VisitEachChild(node)
			}
			value := tx.emitResolver.GetConstantValue(parse)
			if value != nil {
				var replacement *ast.Node
				switch v := value.(type) {
				case jsnum.Number:
					if v.IsInf() {
						if v.Abs() == v {
							replacement = tx.Factory().NewIdentifier("Infinity")
						} else {
							replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, tx.Factory().NewIdentifier("Infinity"))
						}
					} else if v.IsNaN() {
						replacement = tx.Factory().NewIdentifier("NaN")
					} else if v.Abs() == v {
						replacement = tx.Factory().NewNumericLiteral(v.String())
					} else {
						replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, tx.Factory().NewNumericLiteral(v.Abs().String()))
					}
				case string:
					replacement = tx.Factory().NewStringLiteral(v)
				case jsnum.PseudoBigInt: // technically not supported by strada, and issues a checker error, handled here for completeness
					if v == (jsnum.PseudoBigInt{}) {
						replacement = tx.Factory().NewBigIntLiteral("0")
					} else if !v.Negative {
						replacement = tx.Factory().NewBigIntLiteral(v.Base10Value)
					} else {
						replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, tx.Factory().NewBigIntLiteral(v.Base10Value))
					}
				}

				if tx.compilerOptions.RemoveComments.IsFalseOrUnknown() {
					original := tx.EmitContext().MostOriginal(node)
					if original != nil && !ast.NodeIsSynthesized(original) {
						originalText := scanner.GetTextOfNode(original)
						escapedText := " " + safeMultiLineComment(originalText) + " "
						tx.EmitContext().AddSyntheticTrailingComment(replacement, ast.KindMultiLineCommentTrivia, escapedText, false)
					}
				}
				return replacement
			}
			return tx.Visitor().VisitEachChild(node)
		}
	}
	return tx.Visitor().VisitEachChild(node)
}

func safeMultiLineComment(text string) string {
	return strings.ReplaceAll(text, "*/", "*_/")
}
