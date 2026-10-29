package customlint

import (
	"go/ast"
	"go/token"
	"go/types"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var unsafeSafetyAnalyzer = &analysis.Analyzer{
	Name: "unsafesafety",
	Doc:  "requires a `// SAFETY:` comment justifying each use of package unsafe",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&unsafeSafetyPass{pass: pass}).run()
	},
}

// unsafeOperations are the members of package unsafe that can violate memory safety.
// Sizeof, Alignof, and Offsetof are compile-time constants and are always safe.
var unsafeOperations = map[string]bool{
	"Pointer":    true,
	"Add":        true,
	"Slice":      true,
	"SliceData":  true,
	"String":     true,
	"StringData": true,
}

type unsafeSafetyPass struct {
	pass *analysis.Pass
}

func (u *unsafeSafetyPass) run() (any, error) {
	in := u.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for fileCursor := range in.Root().Children() {
		file := fileCursor.Node().(*ast.File)
		var safetyComments []*ast.CommentGroup
		for _, group := range file.Comments {
			if hasSafetyComment(group) {
				safetyComments = append(safetyComments, group)
			}
		}

		for c := range fileCursor.Preorder((*ast.CallExpr)(nil)) {
			call := c.Node().(*ast.CallExpr)
			name, ok := u.unsafeOperation(call.Fun)
			if !ok {
				continue
			}

			// Accept a SAFETY comment directly above, or trailing on the same line as,
			// the use itself or any enclosing node up to the innermost statement or declaration.
			var lines []int
			for e := range c.Enclosing() {
				lines = append(lines, u.line(e.Node().Pos()))
				if _, isStmt := e.Node().(ast.Stmt); isStmt {
					break
				}
				if _, isDecl := e.Node().(ast.Decl); isDecl {
					break
				}
			}

			if !u.hasAdjacentSafetyComment(safetyComments, lines) {
				u.pass.Report(analysis.Diagnostic{
					Pos:     call.Pos(),
					End:     call.End(),
					Message: "use of unsafe." + name + " must be preceded by a `// SAFETY:` comment explaining why it is sound",
				})
			}
		}
	}

	return nil, nil
}

func (u *unsafeSafetyPass) unsafeOperation(fun ast.Expr) (string, bool) {
	sel, ok := ast.Unparen(fun).(*ast.SelectorExpr)
	if !ok {
		return "", false
	}
	obj := u.pass.TypesInfo.Uses[sel.Sel]
	if obj == nil || !unsafeOperations[obj.Name()] || obj != types.Unsafe.Scope().Lookup(obj.Name()) {
		return "", false
	}
	return obj.Name(), true
}

func (u *unsafeSafetyPass) line(pos token.Pos) int {
	return u.pass.Fset.Position(pos).Line
}

func (u *unsafeSafetyPass) hasAdjacentSafetyComment(groups []*ast.CommentGroup, lines []int) bool {
	for _, group := range groups {
		start, end := u.line(group.Pos()), u.line(group.End())
		for _, line := range lines {
			if end == line-1 || start == line {
				return true
			}
		}
	}
	return false
}

func hasSafetyComment(group *ast.CommentGroup) bool {
	for _, c := range group.List {
		text := strings.TrimPrefix(c.Text, "//")
		text = strings.TrimPrefix(text, "/*")
		if strings.HasPrefix(strings.TrimSpace(text), "SAFETY:") {
			return true
		}
	}
	return false
}
