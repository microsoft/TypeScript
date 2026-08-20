package customlint

import (
	"go/ast"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var forbidParentAccessAnalyzer = &analysis.Analyzer{
	Name: "forbidparentaccess",
	Doc:  "forbids .Parent access in internal/transformers except internal/transformers/declarations",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		if !shouldCheckForParentAccess(pass.Pkg.Path()) {
			return nil, nil
		}

		in := pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
		for c := range in.Root().Preorder((*ast.SelectorExpr)(nil)) {
			n := c.Node().(*ast.SelectorExpr)
			if n.Sel.Name != "Parent" {
				continue
			}

			pass.Report(analysis.Diagnostic{
				Pos:     n.Sel.Pos(),
				End:     n.Sel.End(),
				Message: "Transformers are run on nodes with potentially unset .Parent pointers, do not use them in transformers. Track context in the transform itself, instead.",
			})
		}

		return nil, nil
	},
}

func shouldCheckForParentAccess(pkgPath string) bool {
	_, rest, found := strings.Cut(pkgPath, "/internal/transformers/")
	if found {
		if rest == "declarations" || strings.HasPrefix(rest, "declarations/") {
			return false
		}
		return true
	}

	if !strings.HasSuffix(pkgPath, "/internal/transformers") {
		return false
	}
	return true
}
