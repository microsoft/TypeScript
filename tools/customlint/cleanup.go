package customlint

import (
	"fmt"
	"go/ast"
	"go/types"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var cleanupAnalyzer = &analysis.Analyzer{
	Name: "cleanup",
	Doc:  "finds t.Cleanup calls where the closure captures a testing variable from the enclosing function",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&cleanupPass{pass: pass}).run()
	},
}

type cleanupPass struct {
	pass *analysis.Pass
}

func (c *cleanupPass) run() (any, error) {
	in := c.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for cursor := range in.Root().Preorder((*ast.CallExpr)(nil)) {
		call := cursor.Node().(*ast.CallExpr)
		c.checkCall(call)
	}

	return nil, nil
}

func (c *cleanupPass) checkCall(call *ast.CallExpr) {
	sel, ok := call.Fun.(*ast.SelectorExpr)
	if !ok || sel.Sel.Name != "Cleanup" {
		return
	}

	recvType := c.pass.TypesInfo.TypeOf(sel.X)
	if recvType == nil || !isTestingType(recvType) {
		return
	}

	if len(call.Args) != 1 {
		return
	}
	funcLit, ok := call.Args[0].(*ast.FuncLit)
	if !ok {
		return
	}

	ast.Inspect(funcLit.Body, func(n ast.Node) bool {
		c.checkCleanupIdent(n, funcLit)
		return true
	})
}

func (c *cleanupPass) checkCleanupIdent(n ast.Node, funcLit *ast.FuncLit) {
	ident, ok := n.(*ast.Ident)
	if !ok {
		return
	}
	obj := c.pass.TypesInfo.Uses[ident]
	if obj == nil {
		return
	}
	v, ok := obj.(*types.Var)
	if !ok {
		return
	}
	if !isTestingType(v.Type()) {
		return
	}
	// Flag if the variable is defined outside the closure (captured).
	if v.Pos() < funcLit.Pos() || v.Pos() >= funcLit.End() {
		c.pass.Report(analysis.Diagnostic{
			Pos:     ident.Pos(),
			End:     ident.End(),
			Message: fmt.Sprintf("cleanup closure captures %s; the test will have ended when cleanup runs", ident.Name),
		})
	}
}

func isTestingType(t types.Type) bool {
	if ptr, ok := t.(*types.Pointer); ok {
		t = ptr.Elem()
	}
	named, ok := t.(*types.Named)
	if !ok {
		return false
	}
	obj := named.Obj()
	if obj.Pkg() == nil || obj.Pkg().Path() != "testing" {
		return false
	}
	switch obj.Name() {
	case "T", "B", "F", "TB":
		return true
	}
	return false
}
