package checker_test

import (
	goast "go/ast"
	"go/parser"
	"go/token"
	"path/filepath"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

// markFields are fields holding what checking accumulates for later checks
// and emit to read, such as which symbols are referenced or which nodes are
// checked once a file is: a computation answering a query must not write
// them, or what checking reports depends on what was asked first (see
// writesMarks).
var markFields = map[string]bool{
	"referenceKinds":               true,
	"referenced":                   true,
	"deferredNodes":                true,
	"identifierCheckNodes":         true,
	"externalHelperRequests":       true,
	"requestedExternalEmitHelpers": true,
	"nonExistentPropertyNodes":     true,
	"deferredDiagnosticCallbacks":  true,
}

// Marks may only be written by functions that test whether they may be,
// which record them as an effect otherwise, or by those listed in
// allowedMarkWriters with the reason they only run when checking.
func TestMarksAreWrittenOnlyWhenChecking(t *testing.T) {
	t.Parallel()
	fset := token.NewFileSet()
	files, err := filepath.Glob("*.go")
	assert.NilError(t, err)
	seen := make(map[string]bool)
	for _, name := range files {
		if strings.HasSuffix(name, "_test.go") {
			continue
		}
		file, err := parser.ParseFile(fset, name, nil, parser.SkipObjectResolution)
		assert.NilError(t, err)
		for _, decl := range file.Decls {
			fn, isFunc := decl.(*goast.FuncDecl)
			if !isFunc || fn.Body == nil {
				continue
			}
			guarded := false
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				if sel, ok := n.(*goast.SelectorExpr); ok && (sel.Sel.Name == "writesMarks" || sel.Sel.Name == "checking") {
					guarded = true
				}
				return !guarded
			})
			check := func(pos token.Pos, e goast.Expr) {
				sel, ok := e.(*goast.SelectorExpr)
				if !ok || !markFields[sel.Sel.Name] {
					return
				}
				key := fn.Name.Name + ": " + sel.Sel.Name
				seen[key] = true
				if _, ok := allowedMarkWriters[key]; !ok && !guarded {
					t.Errorf("%s: %s writes %s without testing whether checking may", fset.Position(pos), fn.Name.Name, sel.Sel.Name)
				}
			}
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				switch n := n.(type) {
				case *goast.AssignStmt:
					for _, lhs := range n.Lhs {
						check(n.Pos(), lhs)
					}
				case *goast.CallExpr:
					if sel, ok := n.Fun.(*goast.SelectorExpr); ok && (sel.Sel.Name == "Add" || sel.Sel.Name == "Delete" || sel.Sel.Name == "Clear") {
						check(n.Pos(), sel.X)
					}
				}
				return true
			})
		}
	}
	for key := range allowedMarkWriters {
		if !seen[key] {
			t.Errorf("allowedMarkWriters lists %s, which writes no mark", key)
		}
	}
}

// allowedMarkWriters lists functions writing marks without testing, keyed by
// function and field, with why they only run when checking.
var allowedMarkWriters = map[string]string{
	"checkDeferredNodes: deferredNodes":                        "called by checkSourceFileWorker",
	"checkExternalHelperRequests: externalHelperRequests":      "called by checkSourceFileWorker",
	"produceDeferredDiagnostics: deferredDiagnosticCallbacks":  "called by checkSourceFileWorker",
	"checkExternalEmitHelpersAt: requestedExternalEmitHelpers": "called by checkExternalEmitHelpers once it may write, and checkExternalHelperRequests",
}
