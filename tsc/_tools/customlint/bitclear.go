package customlint

import (
	"go/ast"
	"go/token"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var bitclearAnalyzer = &analysis.Analyzer{
	Name: "bitclear",
	Doc:  "finds `x &= ^y` and suggests `x &^= y` instead",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&bitclearPass{pass: pass}).run()
	},
}

type bitclearPass struct {
	pass *analysis.Pass
}

func (b *bitclearPass) run() (any, error) {
	in := b.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for c := range in.Root().Preorder((*ast.AssignStmt)(nil)) {
		stmt := c.Node().(*ast.AssignStmt)
		if stmt.Tok != token.AND_ASSIGN {
			continue
		}
		if len(stmt.Rhs) != 1 {
			continue
		}

		rhs := stmt.Rhs[0]
		unary, ok := rhs.(*ast.UnaryExpr)
		if !ok || unary.Op != token.XOR {
			continue
		}

		// Found `x &= ^expr`. Report and suggest `x &^= expr`.
		// If the operand is parenthesized (e.g. `^(A | B)`), strip the parens
		// since they are unnecessary in `x &^= A | B`.

		// Build text edits:
		// 1. Replace `&=` with `&^=`
		// 2. Remove `^` (and parens if present), preserving interior whitespace/comments
		edits := []analysis.TextEdit{
			{Pos: stmt.TokPos, End: stmt.TokPos + token.Pos(len("&=")), NewText: []byte("&^=")},
		}

		if paren, ok := unary.X.(*ast.ParenExpr); ok {
			// Remove just the `^` and the surrounding parentheses, but keep anything inside.
			// Use min(OpPos+2, Lparen) to also consume one trailing space after `^` if present.
			edits = append(edits,
				// Delete `^` (and trailing space if present)
				analysis.TextEdit{Pos: unary.OpPos, End: min(unary.OpPos+2, paren.Lparen), NewText: nil},
				// Delete `(`
				analysis.TextEdit{Pos: paren.Lparen, End: paren.Lparen + 1, NewText: nil},
				// Delete `)`
				analysis.TextEdit{Pos: paren.Rparen, End: paren.Rparen + 1, NewText: nil},
			)
		} else {
			// Remove just the `^` operator (and trailing space if present).
			edits = append(edits,
				analysis.TextEdit{Pos: unary.OpPos, End: min(unary.OpPos+2, unary.X.Pos()), NewText: nil},
			)
		}

		b.pass.Report(analysis.Diagnostic{
			Pos:     stmt.TokPos,
			End:     unary.X.End(),
			Message: "use `&^=` instead of `&= ^`",
			SuggestedFixes: []analysis.SuggestedFix{
				{
					Message:   "Replace with `&^=`",
					TextEdits: edits,
				},
			},
		})
	}

	return nil, nil
}
