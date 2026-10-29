package customlint

import (
	"go/ast"
	"go/token"
	"go/types"
	"slices"
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

// unsafeFuncs are the functions in package unsafe that can violate memory safety.
// Sizeof, Alignof, and Offsetof are compile-time constants and are always safe.
var unsafeFuncs = map[string]bool{
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
		var safetyComments []safetyComment
		var firstCodeEnd map[int]token.Pos
		for _, group := range file.Comments {
			if !hasSafetyComment(group) {
				continue
			}
			if firstCodeEnd == nil {
				firstCodeEnd = u.firstCodeEndByLine(file)
			}
			line := u.line(group.Pos())
			codeEnd, ok := firstCodeEnd[line]
			safetyComments = append(safetyComments, safetyComment{
				start:    line,
				end:      u.line(group.End()),
				trailing: ok && codeEnd <= group.Pos(),
			})
		}

		for c := range fileCursor.Preorder((*ast.CallExpr)(nil)) {
			call := c.Node().(*ast.CallExpr)
			what := u.unsafeOperation(call)
			if what == "" {
				continue
			}

			// Accept a SAFETY comment on the line directly above, or trailing on the same line as,
			// the start of the use itself or any enclosing node up to the innermost statement or
			// declaration. Trailing comments may also follow the end of the use or an enclosing
			// expression, but not a statement, whose end may be far from the use.
			var startLines, endLines []int
			for e := range c.Enclosing() {
				n := e.Node()
				startLines = append(startLines, u.line(n.Pos()))
				_, isStmt := n.(ast.Stmt)
				_, isDecl := n.(ast.Decl)
				if isStmt || isDecl {
					break
				}
				endLines = append(endLines, u.line(n.End()))
			}

			if !hasAdjacentSafetyComment(safetyComments, startLines, endLines) {
				u.pass.Report(analysis.Diagnostic{
					Pos:     call.Pos(),
					End:     call.End(),
					Message: what + " must be preceded by a `// SAFETY:` comment explaining why it is sound",
				})
			}
		}
	}

	return nil, nil
}

// unsafeOperation describes the unsafe operation performed by call, or returns "" if there is none.
func (u *unsafeSafetyPass) unsafeOperation(call *ast.CallExpr) string {
	info := u.pass.TypesInfo
	if tv, ok := info.Types[call.Fun]; ok && tv.IsType() && len(call.Args) == 1 {
		if isUnsafePointer(tv.Type) {
			return "conversion to unsafe.Pointer"
		}
		// Boxing into an interface is safe.
		if isUnsafePointer(info.TypeOf(call.Args[0])) && !isNonTypeParamInterface(tv.Type) {
			// (*T)(unsafe.Pointer(p)) and the like are a single operation, justified together.
			if inner, ok := ast.Unparen(call.Args[0]).(*ast.CallExpr); ok && u.unsafeOperation(inner) != "" {
				return ""
			}
			return "conversion from unsafe.Pointer"
		}
		return ""
	}

	var id *ast.Ident
	switch fun := ast.Unparen(call.Fun).(type) {
	case *ast.Ident:
		id = fun
	case *ast.SelectorExpr:
		id = fun.Sel
	default:
		return ""
	}
	obj := info.Uses[id]
	if obj == nil || !unsafeFuncs[obj.Name()] || obj != types.Unsafe.Scope().Lookup(obj.Name()) {
		return ""
	}
	return "use of unsafe." + obj.Name()
}

func isNonTypeParamInterface(t types.Type) bool {
	t = types.Unalias(t)
	if _, ok := t.(*types.TypeParam); ok {
		return false
	}
	return types.IsInterface(t)
}

// isUnsafePointer reports whether t is an unsafe.Pointer type, or a type parameter
// whose type set includes one.
func isUnsafePointer(t types.Type) bool {
	if t == nil {
		return false
	}
	if tp, ok := types.Unalias(t).(*types.TypeParam); ok {
		return typeSetHasUnsafePointer(tp.Constraint())
	}
	basic, ok := t.Underlying().(*types.Basic)
	return ok && basic.Kind() == types.UnsafePointer
}

// typeSetHasUnsafePointer reports whether the type set of constraint t may include an
// unsafe.Pointer type.
func typeSetHasUnsafePointer(t types.Type) bool {
	switch u := t.Underlying().(type) {
	case *types.Basic:
		return u.Kind() == types.UnsafePointer
	case *types.Union:
		for term := range u.Terms() {
			if typeSetHasUnsafePointer(term.Type()) {
				return true
			}
		}
		return false
	case *types.Interface:
		// Types based on unsafe.Pointer cannot have methods.
		if u.NumExplicitMethods() > 0 {
			return false
		}
		// Embedded constraints intersect, so every one must allow unsafe.Pointer.
		for embedded := range u.EmbeddedTypes() {
			if !typeSetHasUnsafePointer(embedded) {
				return false
			}
		}
		return true
	}
	return false
}

// firstCodeEndByLine maps each line to the earliest end position of a node ending on it.
func (u *unsafeSafetyPass) firstCodeEndByLine(file *ast.File) map[int]token.Pos {
	m := make(map[int]token.Pos)
	ast.Inspect(file, func(n ast.Node) bool {
		switch n.(type) {
		case nil, *ast.File, *ast.CommentGroup, *ast.Comment:
			return true
		}
		line := u.line(n.End())
		if prev, ok := m[line]; !ok || n.End() < prev {
			m[line] = n.End()
		}
		return true
	})
	return m
}

func (u *unsafeSafetyPass) line(pos token.Pos) int {
	return u.pass.Fset.Position(pos).Line
}

type safetyComment struct {
	start, end int
	// trailing is set when the comment follows code on its first line, so it only covers that line.
	trailing bool
}

func hasAdjacentSafetyComment(comments []safetyComment, startLines, endLines []int) bool {
	for _, c := range comments {
		for _, line := range startLines {
			if c.start == line || (!c.trailing && c.end == line-1) {
				return true
			}
		}
		if c.trailing && slices.Contains(endLines, c.start) {
			return true
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
