package inliners

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/transformers"
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
						inf := tx.Factory().NewBinaryExpression(nil, tx.Factory().NewNumericLiteral("1", ast.TokenFlagsNone), nil, tx.Factory().NewToken(ast.KindSlashToken), tx.Factory().NewNumericLiteral("0", ast.TokenFlagsNone))
						if v.Abs() == v {
							replacement = inf
						} else {
							replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, inf)
						}
					} else if v.IsNaN() {
						replacement = tx.Factory().NewBinaryExpression(nil, tx.Factory().NewNumericLiteral("0", ast.TokenFlagsNone), nil, tx.Factory().NewToken(ast.KindSlashToken), tx.Factory().NewNumericLiteral("0", ast.TokenFlagsNone))
					} else if v.Abs() == v {
						replacement = tx.Factory().NewNumericLiteral(v.String(), ast.TokenFlagsNone)
					} else {
						replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, tx.Factory().NewNumericLiteral(v.Abs().String(), ast.TokenFlagsNone))
					}
				case string:
					replacement = tx.Factory().NewStringLiteral(v, ast.TokenFlagsNone)
				case jsnum.PseudoBigInt: // technically not supported by strada, and issues a checker error, handled here for completeness
					if v == (jsnum.PseudoBigInt{}) {
						replacement = tx.Factory().NewBigIntLiteral("0", ast.TokenFlagsNone)
					} else if !v.Negative {
						replacement = tx.Factory().NewBigIntLiteral(v.Base10Value, ast.TokenFlagsNone)
					} else {
						replacement = tx.Factory().NewPrefixUnaryExpression(ast.KindMinusToken, tx.Factory().NewBigIntLiteral(v.Base10Value, ast.TokenFlagsNone))
					}
				}

				if tx.compilerOptions.RemoveComments.IsFalseOrUnknown() {
					original := tx.EmitContext().MostOriginal(node)
					if original != nil && !ast.NodeIsSynthesized(original) {
						originalText := scanner.GetTextOfNode(original)
						escapedText := safeMultiLineComment(originalText)
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
	var b strings.Builder
	b.Grow(len(text) + 2)
	b.WriteByte(' ')
	for {
		i := strings.Index(text, "*/")
		if i < 0 {
			break
		}
		b.WriteString(text[:i])
		b.WriteString("*_/")
		text = text[i+2:]
	}
	b.WriteString(text)
	b.WriteByte(' ')
	return b.String()
}
