package customlint

import (
	"go/ast"
	"go/token"
	"go/types"
	"maps"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/ctrlflow"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
	"golang.org/x/tools/go/cfg"
)

var implicitFMAAnalyzer = &analysis.Analyzer{
	Name:     "implicitfma",
	Doc:      "finds floating-point additions and subtractions that may use implicit FMA",
	Requires: []*analysis.Analyzer{inspect.Analyzer, ctrlflow.Analyzer},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&implicitFMAPass{pass: pass}).run()
	},
}

type implicitFMAPass struct {
	pass     *analysis.Pass
	inspect  *inspector.Inspector
	cfgs     *ctrlflow.CFGs
	reported map[token.Pos]bool
}

// implicitFMAState contains variables that may hold an unrounded
// floating-point multiplication result on at least one incoming path.
type implicitFMAState map[types.Object]bool

func (f *implicitFMAPass) run() (any, error) {
	f.inspect = f.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
	f.cfgs = f.pass.ResultOf[ctrlflow.Analyzer].(*ctrlflow.CFGs)
	f.reported = make(map[token.Pos]bool)

	for cursor := range f.inspect.Root().Preorder(
		(*ast.FuncDecl)(nil),
		(*ast.FuncLit)(nil),
	) {
		switch node := cursor.Node().(type) {
		case *ast.FuncDecl:
			if node.Body != nil {
				f.analyze(f.cfgs.FuncDecl(node))
			}
		case *ast.FuncLit:
			f.analyze(f.cfgs.FuncLit(node))
		}
	}

	return nil, nil
}

func (f *implicitFMAPass) analyze(graph *cfg.CFG) {
	in := make([]implicitFMAState, len(graph.Blocks))
	initialized := make([]bool, len(graph.Blocks))
	queued := make([]bool, len(graph.Blocks))
	queue := []*cfg.Block{graph.Blocks[0]}
	in[0] = make(implicitFMAState)
	initialized[0] = true
	queued[0] = true

	for len(queue) > 0 {
		block := queue[0]
		queue = queue[1:]
		queued[block.Index] = false

		state := cloneImplicitFMAState(in[block.Index])
		for _, node := range block.Nodes {
			if f.handleRangeAssignment(block, node, state) {
				continue
			}
			f.transfer(node, state)
		}

		for _, successor := range block.Succs {
			changed := false
			if !initialized[successor.Index] {
				in[successor.Index] = cloneImplicitFMAState(state)
				initialized[successor.Index] = true
				changed = true
			} else {
				changed = mergeImplicitFMAState(in[successor.Index], state)
			}
			if changed && !queued[successor.Index] {
				queue = append(queue, successor)
				queued[successor.Index] = true
			}
		}
	}
}

func (f *implicitFMAPass) handleRangeAssignment(block *cfg.Block, node ast.Node, state implicitFMAState) bool {
	if block.Kind != cfg.KindRangeLoop {
		return false
	}
	rangeStatement, ok := block.Stmt.(*ast.RangeStmt)
	if !ok || node != rangeStatement.Key && node != rangeStatement.Value {
		return false
	}
	f.setExpressionState(node.(ast.Expr), false, state)
	return true
}

func (f *implicitFMAPass) transfer(node ast.Node, state implicitFMAState) {
	switch node := node.(type) {
	case *ast.AssignStmt:
		f.transferAssignment(node, state)
	case *ast.DeferStmt:
		f.evaluate(node.Call, state)
	case ast.Expr:
		f.evaluate(node, state)
	case *ast.ExprStmt:
		f.evaluate(node.X, state)
	case *ast.GoStmt:
		f.evaluate(node.Call, state)
	case *ast.IncDecStmt:
		if f.evaluate(node.X, state) && isFloatingPointType(f.pass.TypesInfo.TypeOf(node.X)) {
			f.report(node)
		}
		f.setExpressionState(node.X, false, state)
	case *ast.ReturnStmt:
		for _, result := range node.Results {
			f.evaluate(result, state)
		}
	case *ast.SendStmt:
		f.evaluate(node.Chan, state)
		f.evaluate(node.Value, state)
	case *ast.ValueSpec:
		values := make([]bool, len(node.Values))
		for i, value := range node.Values {
			values[i] = f.evaluate(value, state)
		}
		for i, name := range node.Names {
			value := len(values) == len(node.Names) && values[i]
			f.setObjectState(f.pass.TypesInfo.Defs[name], value, state)
		}
	}
}

func (f *implicitFMAPass) transferAssignment(statement *ast.AssignStmt, state implicitFMAState) {
	right := make([]bool, len(statement.Rhs))
	for i, expression := range statement.Rhs {
		right[i] = f.evaluate(expression, state)
	}

	if len(statement.Lhs) == 1 && len(right) == 1 {
		left := statement.Lhs[0]
		switch statement.Tok {
		case token.ADD_ASSIGN, token.SUB_ASSIGN:
			if isFloatingPointType(f.pass.TypesInfo.TypeOf(left)) && (f.evaluate(left, state) || right[0]) {
				f.report(statement)
			}
			f.setExpressionState(left, false, state)
			return
		case token.MUL_ASSIGN:
			f.setExpressionState(left, isFloatingPointType(f.pass.TypesInfo.TypeOf(left)), state)
			return
		case token.ASSIGN, token.DEFINE:
			f.setExpressionState(left, right[0], state)
			return
		default:
			f.setExpressionState(left, false, state)
			return
		}
	}

	for _, left := range statement.Lhs {
		f.setExpressionState(left, false, state)
	}
	if len(statement.Lhs) == len(right) {
		for i, left := range statement.Lhs {
			f.setExpressionState(left, right[i], state)
		}
	}
}

func (f *implicitFMAPass) evaluate(expression ast.Expr, state implicitFMAState) bool {
	switch expression := expression.(type) {
	case *ast.BinaryExpr:
		left := f.evaluate(expression.X, state)
		right := f.evaluate(expression.Y, state)
		typeAndValue := f.pass.TypesInfo.Types[expression]
		switch expression.Op {
		case token.ADD, token.SUB:
			if typeAndValue.Value == nil && isFloatingPointType(typeAndValue.Type) && (left || right) {
				f.report(expression)
			}
			return false
		case token.MUL:
			return typeAndValue.Value == nil && isFloatingPointType(typeAndValue.Type)
		default:
			return false
		}

	case *ast.CallExpr:
		for _, argument := range expression.Args {
			f.evaluate(argument, state)
		}
		return false

	case *ast.Ident:
		return state[f.pass.TypesInfo.Uses[expression]]

	case *ast.ParenExpr:
		return f.evaluate(expression.X, state)

	case *ast.UnaryExpr:
		value := f.evaluate(expression.X, state)
		return value && (expression.Op == token.ADD || expression.Op == token.SUB)

	case *ast.FuncLit:
		return false

	default:
		ast.Inspect(expression, func(node ast.Node) bool {
			if node == expression {
				return true
			}
			if child, ok := node.(ast.Expr); ok {
				f.evaluate(child, state)
				return false
			}
			return true
		})
		return false
	}
}

func (f *implicitFMAPass) setExpressionState(expression ast.Expr, value bool, state implicitFMAState) {
	ident, ok := expression.(*ast.Ident)
	if !ok {
		return
	}
	object := f.pass.TypesInfo.Defs[ident]
	if object == nil {
		object = f.pass.TypesInfo.Uses[ident]
	}
	f.setObjectState(object, value, state)
}

func (f *implicitFMAPass) setObjectState(object types.Object, value bool, state implicitFMAState) {
	if object == nil {
		return
	}
	if value {
		state[object] = true
	} else {
		delete(state, object)
	}
}

func (f *implicitFMAPass) report(node ast.Node) {
	if f.reported[node.Pos()] {
		return
	}
	f.reported[node.Pos()] = true
	f.pass.ReportRangef(node, "explicitly round the floating-point multiplication result to prevent implicit FMA")
}

func cloneImplicitFMAState(state implicitFMAState) implicitFMAState {
	clone := make(implicitFMAState, len(state))
	maps.Copy(clone, state)
	return clone
}

func mergeImplicitFMAState(into implicitFMAState, from implicitFMAState) bool {
	changed := false
	for object := range from {
		if !into[object] {
			into[object] = true
			changed = true
		}
	}
	return changed
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
