package customlint

import (
	"bytes"
	"fmt"
	"go/ast"
	"go/format"
	"go/types"
	"slices"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var unexportedAPIAnalyzer = &analysis.Analyzer{
	Name: "unexportedapi",
	Doc:  "finds exported APIs referencing unexported identifiers",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&unexportedAPIPass{pass: pass}).run()
	},
}

type unexportedAPIPass struct {
	pass     *analysis.Pass
	file     *ast.File
	currDecl ast.Node
	// Track which types/objects we've already checked to avoid duplicates
	checked map[types.Object]bool
}

func (u *unexportedAPIPass) run() (any, error) {
	u.checked = make(map[types.Object]bool)
	in := u.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for c := range in.Root().Preorder(
		(*ast.File)(nil),
		(*ast.FuncDecl)(nil),
		(*ast.TypeSpec)(nil),
		(*ast.ValueSpec)(nil),
	) {
		u.currDecl = c.Node()
		switch n := c.Node().(type) {
		case *ast.File:
			u.file = n
		case *ast.FuncDecl:
			u.checkFuncDecl(n)
		case *ast.TypeSpec:
			u.checkTypeSpec(n)
		case *ast.ValueSpec:
			u.checkValueSpec(n)
		}
	}

	return nil, nil
}

func (u *unexportedAPIPass) checkFuncDecl(fn *ast.FuncDecl) {
	if !fn.Name.IsExported() {
		return
	}

	// Get the method object to mark it as checked
	var methodObj types.Object
	if fn.Name != nil {
		methodObj = u.pass.TypesInfo.Defs[fn.Name]
	}

	// If this is a method on an unexported type, skip it
	// Unexported types and their methods (even if exported) are not part of the public API
	if fn.Recv != nil && len(fn.Recv.List) > 0 {
		recvType := fn.Recv.List[0].Type
		// Unwrap pointer receiver if needed
		if star, ok := recvType.(*ast.StarExpr); ok {
			recvType = star.X
		}
		// Check if the receiver type is unexported
		if ident, ok := recvType.(*ast.Ident); ok && !ident.IsExported() {
			return
		}
	}

	// Mark this method as checked so we don't check it again through embedding
	if methodObj != nil {
		u.checked[methodObj] = true
	}

	u.checkExpr(fn.Type)
}

func (u *unexportedAPIPass) checkTypeSpec(ts *ast.TypeSpec) {
	if !ts.Name.IsExported() {
		return
	}

	if ts.TypeParams != nil {
		for _, param := range ts.TypeParams.List {
			if anyIdentExported(param.Names) {
				if u.checkField(param) {
					return
				}
			}
		}
	}

	u.checkExpr(ts.Type)
}

func (u *unexportedAPIPass) checkValueSpec(vs *ast.ValueSpec) {
	if !anyIdentExported(vs.Names) {
		return
	}

	// If there's an explicit type annotation, check it
	if vs.Type != nil {
		u.checkExpr(vs.Type)
		return
	}

	// If there's no explicit type, we need to check the inferred type, not the initialization expression
	// The initialization expression is an implementation detail and not part of the API
	// For example: var Foo = unexportedFunc() where unexportedFunc returns an exported type is OK
	for _, name := range vs.Names {
		if !name.IsExported() {
			continue
		}
		obj := u.pass.TypesInfo.Defs[name]
		if obj != nil {
			if u.checkType(obj.Type()) {
				return
			}
		}
	}
}

func anyIdentExported(idents []*ast.Ident) bool {
	for _, ident := range idents {
		if ident.IsExported() {
			return true
		}
	}
	return false
}

func (u *unexportedAPIPass) checkExportedField(field *ast.Field) (stop bool) {
	// For embedded fields (no names), handle specially
	if len(field.Names) == 0 {
		return u.checkEmbeddedField(field)
	}
	// For named fields, only check if at least one name is exported
	if anyIdentExported(field.Names) {
		return u.checkField(field)
	}
	return false
}

func (u *unexportedAPIPass) checkEmbeddedField(field *ast.Field) (stop bool) {
	// Get the type of the embedded field
	typ := u.pass.TypesInfo.TypeOf(field.Type)

	// For embedded fields, walk through all exported members and check them.
	// Use the checked map to avoid re-checking members we've already seen.

	// Dereference pointers
	if ptr, ok := typ.(*types.Pointer); ok {
		typ = ptr.Elem()
	}

	// Check exported fields in structs
	if structType, ok := typ.Underlying().(*types.Struct); ok {
		for field := range structType.Fields() {
			if field.Exported() && u.checkObjectType(field) {
				return true
			}
		}
	}

	// Check exported methods on the type
	if named, ok := typ.(*types.Named); ok {
		for method := range named.Methods() {
			if method.Exported() && u.checkObjectType(method) {
				return true
			}
		}
	}

	return false
}

// checkObjectType checks a types.Object and memoizes it to avoid duplicate checks
func (u *unexportedAPIPass) checkObjectType(obj types.Object) (stop bool) {
	// If we've already checked this object, skip it
	if u.checked[obj] {
		return false
	}
	u.checked[obj] = true

	return u.checkType(obj.Type())
}

func (u *unexportedAPIPass) checkFieldsIgnoringNames(fields *ast.FieldList) (stop bool) {
	if fields == nil {
		return false
	}
	return slices.ContainsFunc(fields.List, u.checkField)
}

func (u *unexportedAPIPass) checkField(field *ast.Field) (stop bool) {
	return u.checkExpr(field.Type)
}

func (u *unexportedAPIPass) checkExpr(expr ast.Expr) (stop bool) {
	if expr == nil {
		return false
	}

	switch expr := expr.(type) {
	case *ast.StructType:
		return slices.ContainsFunc(expr.Fields.List, u.checkExportedField)
	case *ast.StarExpr:
		return u.checkExpr(expr.X)
	case *ast.Ident:
		// First check Defs (for defining occurrences), then Uses (for referring occurrences)
		obj := u.pass.TypesInfo.Defs[expr]
		if obj == nil {
			obj = u.pass.TypesInfo.Uses[expr]
		}
		if !expr.IsExported() {
			if obj.Parent() == types.Universe {
				return false
			}
			// Only report if the unexported identifier is from the same package
			if obj.Pkg() != nil && obj.Pkg() == u.pass.Pkg {
				u.pass.Reportf(expr.Pos(), "exported API references unexported identifier %s", expr.Name)
				return true
			}
		}
		return u.checkType(obj.Type())
	case *ast.MapType:
		return u.checkExpr(expr.Key) || u.checkExpr(expr.Value)
	case *ast.ArrayType:
		return u.checkExpr(expr.Len) || u.checkExpr(expr.Elt)
	case *ast.SelectorExpr:
		// Unexported selectors from other packages (pkg.unexported) are compile errors,
		// so we only need to check the type of exported selectors.
		return u.checkType(u.pass.TypesInfo.TypeOf(expr))
	case *ast.InterfaceType:
		return slices.ContainsFunc(expr.Methods.List, u.checkExportedField)
	case *ast.ChanType:
		return u.checkExpr(expr.Value)
	case *ast.FuncType:
		return u.checkFieldsIgnoringNames(expr.TypeParams) ||
			u.checkFieldsIgnoringNames(expr.Params) ||
			u.checkFieldsIgnoringNames(expr.Results)
	case *ast.Ellipsis:
		return u.checkExpr(expr.Elt)
	case *ast.IndexListExpr:
		return u.checkExpr(expr.X) || slices.ContainsFunc(expr.Indices, u.checkExpr)
	case *ast.IndexExpr:
		return u.checkExpr(expr.X) || u.checkExpr(expr.Index)
	case *ast.UnaryExpr:
		// Unary expressions can appear in array length expressions like [-1]int
		return u.checkExpr(expr.X)
	case *ast.BinaryExpr:
		// Binary expressions can appear in array length expressions like [1+2]int
		return u.checkExpr(expr.X) || u.checkExpr(expr.Y)
	case *ast.BasicLit:
		// Basic literals can appear in array length expressions like [3]int
		return false
	case *ast.ParenExpr:
		return u.checkExpr(expr.X)
	default:
		var buf bytes.Buffer
		_ = format.Node(&buf, u.pass.Fset, expr)
		panic(fmt.Sprintf("unhandled expression type %T: %s", expr, buf.String()))
	}
}

func (u *unexportedAPIPass) checkType(typ types.Type) (stop bool) {
	switch typ := typ.(type) {
	case *types.Named:
		// Check if the named type itself is unexported
		obj := typ.Obj()
		if obj != nil && !obj.Exported() && obj.Pkg() == u.pass.Pkg {
			u.pass.Reportf(u.currDecl.Pos(), "exported API references unexported type %s", obj.Name())
			return true
		}
		// Check type arguments if any (for generics)
		if typ.TypeArgs() != nil {
			for t := range typ.TypeArgs().Types() {
				if u.checkType(t) {
					return true
				}
			}
		}
		return false
	case *types.Pointer:
		return u.checkType(typ.Elem())
	case *types.Slice:
		return u.checkType(typ.Elem())
	case *types.Array:
		return u.checkType(typ.Elem())
	case *types.Chan:
		return u.checkType(typ.Elem())
	case *types.Map:
		return u.checkType(typ.Key()) || u.checkType(typ.Elem())
	case *types.Signature:
		// Check parameters
		if typ.Params() != nil {
			for v := range typ.Params().Variables() {
				if u.checkType(v.Type()) {
					return true
				}
			}
		}
		// Check results
		if typ.Results() != nil {
			for v := range typ.Results().Variables() {
				if u.checkType(v.Type()) {
					return true
				}
			}
		}
		return false
	case *types.Struct:
		// Check all fields
		for field := range typ.Fields() {
			// Only check exported fields
			if field.Exported() {
				if u.checkType(field.Type()) {
					return true
				}
			}
		}
		return false
	case *types.Interface:
		// Check all methods
		for method := range typ.Methods() {
			// Only check exported methods
			if method.Exported() {
				if u.checkType(method.Type()) {
					return true
				}
			}
		}
		return false
	case *types.Basic, *types.TypeParam:
		// Basic types and type parameters are always OK
		return false
	case *types.Alias:
		// For type aliases, check the underlying aliased type
		return u.checkType(typ.Rhs())
	default:
		panic(fmt.Sprintf("unhandled types.Type %T", typ))
	}
}
