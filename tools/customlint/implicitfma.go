package customlint

import (
	"go/ast"
	"go/token"
	"go/types"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/buildssa"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
	"golang.org/x/tools/go/ssa"
)

var implicitFMAAnalyzer = &analysis.Analyzer{
	Name: "implicitfma",
	Doc:  "finds floating-point additions and subtractions that may use implicit FMA",
	Requires: []*analysis.Analyzer{
		buildssa.Analyzer,
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&implicitFMAPass{pass: pass}).run()
	},
}

type implicitFMAPass struct {
	pass                      *analysis.Pass
	expressionsByOpPos        map[token.Pos]*ast.BinaryExpr
	explicitlyRoundedMultiply map[token.Pos]bool
}

func (f *implicitFMAPass) run() (any, error) {
	in := f.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
	f.expressionsByOpPos = make(map[token.Pos]*ast.BinaryExpr)
	f.explicitlyRoundedMultiply = make(map[token.Pos]bool)

	for cursor := range in.Root().Preorder((*ast.BinaryExpr)(nil)) {
		expr := cursor.Node().(*ast.BinaryExpr)
		f.expressionsByOpPos[expr.OpPos] = expr
		if expr.Op == token.MUL {
			typeAndValue := f.pass.TypesInfo.Types[expr]
			if typeAndValue.Value == nil &&
				isFloatingPointType(typeAndValue.Type) &&
				f.hasExplicitRoundingConversion(cursor) {
				// buildssa removes representation-preserving conversions, even though an
				// explicit floating-point conversion forces rounding under the Go spec.
				f.explicitlyRoundedMultiply[expr.OpPos] = true
			}
		}
	}

	ssaResult := f.pass.ResultOf[buildssa.Analyzer].(*buildssa.SSA)
	reported := make(map[token.Pos]bool)
	for _, function := range ssaResult.SrcFuncs {
		for _, block := range function.Blocks {
			for _, instruction := range block.Instrs {
				binOp, ok := instruction.(*ssa.BinOp)
				if !ok || binOp.Op != token.ADD && binOp.Op != token.SUB || !isFloatingPointType(binOp.Type()) {
					continue
				}
				if !f.reachedByUnroundedMultiplication(binOp.X, make(map[ssa.Value]bool)) &&
					!f.reachedByUnroundedMultiplication(binOp.Y, make(map[ssa.Value]bool)) {
					continue
				}
				if reported[binOp.Pos()] {
					continue
				}
				reported[binOp.Pos()] = true

				pos := binOp.Pos()
				end := pos + 1
				if expr := f.expressionsByOpPos[pos]; expr != nil {
					pos = expr.Pos()
					end = expr.End()
				}
				f.pass.Report(analysis.Diagnostic{
					Pos:     pos,
					End:     end,
					Message: "explicitly round the floating-point multiplication result to prevent implicit FMA",
				})
			}
		}
	}

	return nil, nil
}

func (f *implicitFMAPass) reachedByUnroundedMultiplication(value ssa.Value, seen map[ssa.Value]bool) bool {
	if seen[value] {
		return false
	}
	seen[value] = true

	switch value := value.(type) {
	case *ssa.BinOp:
		return value.Op == token.MUL && !f.explicitlyRoundedMultiply[value.Pos()]
	case *ssa.ChangeInterface:
		return f.reachedByUnroundedMultiplication(value.X, seen)
	case *ssa.ChangeType:
		return f.reachedByUnroundedMultiplication(value.X, seen)
	case *ssa.Phi:
		for _, edge := range value.Edges {
			if f.reachedByUnroundedMultiplication(edge, seen) {
				return true
			}
		}
	case *ssa.UnOp:
		if value.Op == token.ADD || value.Op == token.SUB {
			return f.reachedByUnroundedMultiplication(value.X, seen)
		}
	}
	return false
}

func (f *implicitFMAPass) hasExplicitRoundingConversion(cursor inspector.Cursor) bool {
	for {
		parent := cursor.Parent()
		switch node := parent.Node().(type) {
		case *ast.ParenExpr:
			cursor = parent
		case *ast.CallExpr:
			if len(node.Args) != 1 || node.Args[0] != cursor.Node() {
				return false
			}
			funTypeAndValue, ok := f.pass.TypesInfo.Types[node.Fun]
			return ok && funTypeAndValue.IsType() && isFloatingPointType(f.pass.TypesInfo.TypeOf(node))
		default:
			return false
		}
	}
}

func isFloatingPointType(t types.Type) bool {
	t = types.Unalias(t)
	if t == nil {
		return false
	}

	switch t := t.Underlying().(type) {
	case *types.Basic:
		return t.Info()&types.IsFloat != 0
	case *types.Interface:
		for embedded := range t.EmbeddedTypes() {
			if isFloatingPointType(embedded) {
				return true
			}
		}
		return false
	case *types.Union:
		for term := range t.Terms() {
			if isFloatingPointType(term.Type()) {
				return true
			}
		}
		return false
	default:
		return false
	}
}
