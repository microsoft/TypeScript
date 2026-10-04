package customlint

import (
	"go/ast"
	"go/token"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

// checkChildrenAnalyzer flags `return` statements in checker methods that are
// dispatched from `checkSourceElementWorker` / `checkExpressionWorker` and that
// exit the method before its child nodes have been checked.
//
// Methods like `checkReturnStatement` contain grammar/error `return`s that fire
// before the child expression is ever checked (e.g. via `checkExpression`).
// When such a return is taken the child is never checked, so the set of
// diagnostics produced depends on whether the child happens to be checked
// elsewhere first. Requiring children to always be checked - even on error
// paths - keeps diagnostics stable regardless of traversal order.
//
// A return is flagged when a child-checking call is reachable *after* it: that
// is what makes the return "early". Checking children up front - even
// conditionally, e.g.
//
//	var exprType *Type
//	if node.Expression() != nil {
//		exprType = c.checkExpressionCached(node.Expression())
//	}
//	if c.grammarError(node) {
//		return
//	}
//
// is therefore accepted, because the child has already been given its chance to
// be checked before the return.
var checkChildrenAnalyzer = &analysis.Analyzer{
	Name: "checkchildren",
	Doc:  "finds early returns in checker dispatch methods that skip checking child nodes",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&checkChildrenPass{pass: pass}).run()
	},
}

// checkWorkerFuncs are the dispatch methods whose switch cases enumerate the
// per-node-kind checker methods we want to analyze.
var checkWorkerFuncs = map[string]bool{
	"checkSourceElementWorker": true,
	"checkExpressionWorker":    true,
}

type checkChildrenPass struct {
	pass *analysis.Pass
}

func (p *checkChildrenPass) run() (any, error) {
	in := p.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	// Collect a cursor for every method in the package, keyed by name, and the
	// set of method names dispatched from the worker functions.
	methods := make(map[string]inspector.Cursor)
	handlerNames := make(map[string]struct{})

	for cursor := range in.Root().Preorder((*ast.FuncDecl)(nil)) {
		fd := cursor.Node().(*ast.FuncDecl)
		recv, ok := receiverIdent(fd)
		if !ok {
			continue
		}
		methods[fd.Name.Name] = cursor
		if checkWorkerFuncs[fd.Name.Name] {
			collectDispatchedMethods(fd, recv, handlerNames)
		}
	}

	for name := range handlerNames {
		if cursor, ok := methods[name]; ok && cursor.Node().(*ast.FuncDecl).Body != nil {
			p.analyzeMethod(cursor)
		}
	}

	return nil, nil
}

// collectDispatchedMethods records every `recv.<method>(...)` call appearing in
// the body of a worker function.
func collectDispatchedMethods(fd *ast.FuncDecl, recv string, out map[string]struct{}) {
	ast.Inspect(fd.Body, func(n ast.Node) bool {
		call, ok := n.(*ast.CallExpr)
		if !ok {
			return true
		}
		if name, ok := receiverCallName(call, recv); ok {
			out[name] = struct{}{}
		}
		return true
	})
}

func (p *checkChildrenPass) analyzeMethod(method inspector.Cursor) {
	fd := method.Node().(*ast.FuncDecl)
	recv, ok := receiverIdent(fd)
	if !ok {
		return
	}

	// Collect cursors for the child-checking calls and the explicit returns that
	// belong to this method. Nested function literals are skipped: they have
	// their own control flow and returns, which are not this method's concern.
	var checks, returns []inspector.Cursor
	method.Inspect([]ast.Node{(*ast.FuncLit)(nil), (*ast.ReturnStmt)(nil), (*ast.CallExpr)(nil)}, func(c inspector.Cursor) bool {
		switch n := c.Node().(type) {
		case *ast.FuncLit:
			return false
		case *ast.ReturnStmt:
			returns = append(returns, c)
		case *ast.CallExpr:
			if name, isCall := receiverCallName(n, recv); isCall && isChildCheckName(name) {
				checks = append(checks, c)
			}
		}
		return true
	})

	// If the method never checks any children, there is nothing to enforce:
	// either the node kind is a leaf, or checking is delegated elsewhere.
	if len(checks) == 0 {
		return
	}

	for _, ret := range returns {
		for _, call := range reachableChecksAfter(ret, checks) {
			// A return that only fires when the child is absent (a `nil` guard on
			// the very expression the later call would check) is fine: there is
			// nothing to check on that path.
			if child := firstArg(call.Node().(*ast.CallExpr)); child != nil && guardedNil(ret, child) {
				continue
			}
			p.pass.Report(analysis.Diagnostic{
				Pos:     ret.Node().Pos(),
				End:     ret.Node().End(),
				Message: fd.Name.Name + " returns before checking its child nodes; check children (e.g. via checkExpression, checkSourceElement, or resolveCall) on all paths so diagnostics are stable regardless of traversal order",
			})
			break
		}
	}
}

// reachableChecksAfter returns the child-checking calls that would execute after
// `ret` if it fell through instead of returning. Walking up the ancestors, only
// statements that genuinely follow `ret` in execution order are considered:
// mutually exclusive branches (the other arm of an if, sibling switch cases) are
// not, while loop bodies are revisited in full.
func reachableChecksAfter(ret inspector.Cursor, checks []inspector.Cursor) []inspector.Cursor {
	var reachable []inspector.Cursor
	appendContained := func(scope inspector.Cursor) {
		for _, check := range checks {
			if scope.Contains(check) {
				reachable = append(reachable, check)
			}
		}
	}

	cur := ret
	for {
		parent := cur.Parent()
		switch p := parent.Node().(type) {
		case nil, *ast.FuncDecl, *ast.FuncLit:
			// Reached the enclosing function without finding a later check.
			return reachable
		case *ast.BlockStmt, *ast.CaseClause, *ast.CommClause:
			// Statements after `cur` execute after it, but sibling switch/select
			// clauses are alternatives, not successors.
			if !isSwitchClause(cur.Node()) {
				for sib, ok := cur.NextSibling(); ok; sib, ok = sib.NextSibling() {
					appendContained(sib)
				}
			}
		case *ast.ForStmt:
			// Falling through the loop body re-runs the body, post, and condition.
			if cur.Node() == p.Body {
				appendContained(cur)
				if p.Post != nil {
					appendContained(parent.Child(p.Post))
				}
				if p.Cond != nil {
					appendContained(parent.Child(p.Cond))
				}
			}
		case *ast.RangeStmt:
			if cur.Node() == p.Body {
				appendContained(cur)
			}
		}
		cur = parent
	}
}

func isSwitchClause(n ast.Node) bool {
	switch n.(type) {
	case *ast.CaseClause, *ast.CommClause:
		return true
	}
	return false
}

// firstArg returns the first argument of a call, or nil if it has none.
func firstArg(call *ast.CallExpr) ast.Expr {
	if len(call.Args) == 0 {
		return nil
	}
	return call.Args[0]
}

// guardedNil reports whether an enclosing `if` guard proves that `childExpr` is
// nil on the path to `ret`, i.e. the return only fires when the child that a
// later call would check is absent.
func guardedNil(ret inspector.Cursor, childExpr ast.Expr) bool {
	for cur := ret; ; {
		parent := cur.Parent()
		switch p := parent.Node().(type) {
		case nil, *ast.FuncDecl, *ast.FuncLit:
			return false
		case *ast.IfStmt:
			if cur.Node() == p.Body && condImpliesNil(p.Cond, childExpr, true) {
				return true
			}
			if cur.Node() == p.Else && condImpliesNil(p.Cond, childExpr, false) {
				return true
			}
		}
		cur = parent
	}
}

// condImpliesNil reports whether `cond` evaluating to `condIsTrue` implies that
// `childExpr` is nil, i.e. `childExpr == nil` (when true) or `childExpr != nil`
// (when false).
func condImpliesNil(cond ast.Expr, childExpr ast.Expr, condIsTrue bool) bool {
	bin, ok := cond.(*ast.BinaryExpr)
	if !ok {
		return false
	}
	wantOp := token.EQL
	if !condIsTrue {
		wantOp = token.NEQ
	}
	if bin.Op != wantOp {
		return false
	}
	return (isNilIdent(bin.Y) && equalExpr(bin.X, childExpr)) ||
		(isNilIdent(bin.X) && equalExpr(bin.Y, childExpr))
}

func isNilIdent(e ast.Expr) bool {
	id, ok := e.(*ast.Ident)
	return ok && id.Name == "nil"
}

// equalExpr reports whether two expressions are structurally identical for the
// simple forms used to identify child nodes (identifiers, selectors, and calls
// such as `node.Expression()`).
func equalExpr(a, b ast.Expr) bool {
	switch a := a.(type) {
	case *ast.Ident:
		b, ok := b.(*ast.Ident)
		return ok && a.Name == b.Name
	case *ast.SelectorExpr:
		b, ok := b.(*ast.SelectorExpr)
		return ok && a.Sel.Name == b.Sel.Name && equalExpr(a.X, b.X)
	case *ast.CallExpr:
		b, ok := b.(*ast.CallExpr)
		if !ok || len(a.Args) != len(b.Args) || !equalExpr(a.Fun, b.Fun) {
			return false
		}
		for i := range a.Args {
			if !equalExpr(a.Args[i], b.Args[i]) {
				return false
			}
		}
		return true
	case *ast.ParenExpr:
		b, ok := b.(*ast.ParenExpr)
		return ok && equalExpr(a.X, b.X)
	case *ast.IndexExpr:
		b, ok := b.(*ast.IndexExpr)
		return ok && equalExpr(a.X, b.X) && equalExpr(a.Index, b.Index)
	case *ast.BasicLit:
		b, ok := b.(*ast.BasicLit)
		return ok && a.Kind == b.Kind && a.Value == b.Value
	default:
		return false
	}
}

// isChildCheckName reports whether a method name recursively checks a child node.
func isChildCheckName(name string) bool {
	return strings.HasPrefix(name, "checkExpression") ||
		strings.HasPrefix(name, "checkSourceElement") ||
		name == "resolveCall"
}

// receiverCallName returns the method name of a `recv.<method>(...)` call.
func receiverCallName(call *ast.CallExpr, recv string) (string, bool) {
	sel, ok := call.Fun.(*ast.SelectorExpr)
	if !ok {
		return "", false
	}
	x, ok := sel.X.(*ast.Ident)
	if !ok || x.Name != recv {
		return "", false
	}
	return sel.Sel.Name, true
}

// receiverIdent returns the name of a method's single receiver variable.
func receiverIdent(fd *ast.FuncDecl) (string, bool) {
	if fd.Recv == nil || len(fd.Recv.List) != 1 {
		return "", false
	}
	names := fd.Recv.List[0].Names
	if len(names) != 1 {
		return "", false
	}
	return names[0].Name, true
}
