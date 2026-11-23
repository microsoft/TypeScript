package customlint

import (
	"go/ast"
	"go/token"
	"go/types"
	"reflect"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

// protectedFieldAnalyzer guards fields tagged `customlint:"protected"`, such as
// the kind headers that unsafe casts trust to identify the enclosing allocation.
// Writing such a field, or copying a struct that contains one, can make a value
// claim to be a larger record than its storage holds. Intentional writes are
// suppressed with //nolint:customlint.
var protectedFieldAnalyzer = &analysis.Analyzer{
	Name: "protectedfield",
	Doc:  "forbids writes to protected fields and by-value copies of structs containing them",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&protectedFieldPass{pass: pass, contains: make(map[types.Type]bool)}).run()
	},
}

type protectedFieldPass struct {
	pass     *analysis.Pass
	contains map[types.Type]bool
}

func (p *protectedFieldPass) run() (any, error) {
	in := p.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for c := range in.Root().Preorder(
		(*ast.AssignStmt)(nil),
		(*ast.IncDecStmt)(nil),
		(*ast.RangeStmt)(nil),
		(*ast.UnaryExpr)(nil),
		(*ast.CompositeLit)(nil),
		(*ast.FuncType)(nil),
		(*ast.FuncDecl)(nil),
	) {
		switch node := c.Node().(type) {
		case *ast.AssignStmt:
			for _, lhs := range node.Lhs {
				p.checkWrite(lhs, "write to")
			}
		case *ast.IncDecStmt:
			p.checkWrite(node.X, "write to")
		case *ast.RangeStmt:
			if node.Key != nil {
				p.checkWrite(node.Key, "write to")
			}
			if node.Value != nil {
				p.checkWrite(node.Value, "write to")
			}
		case *ast.UnaryExpr:
			if node.Op == token.AND {
				p.checkWrite(node.X, "address of")
			}
		case *ast.CompositeLit:
			p.checkLiteral(node)
		case *ast.FuncType:
			p.checkFields(node.Params, "parameter")
			p.checkFields(node.Results, "result")
		case *ast.FuncDecl:
			p.checkFields(node.Recv, "receiver")
		}
	}

	for id, obj := range p.pass.TypesInfo.Defs {
		if v, ok := obj.(*types.Var); ok && (v.Kind() == types.PackageVar || v.Kind() == types.LocalVar) && p.containsProtected(v.Type()) {
			p.pass.Reportf(id.Pos(), "variable %s holds %s by value, which contains a protected field", id.Name, v.Type())
		}
	}

	for c := range in.Root().Preorder((*ast.StarExpr)(nil), (*ast.IndexExpr)(nil), (*ast.CallExpr)(nil), (*ast.CompositeLit)(nil), (*ast.SelectorExpr)(nil)) {
		expr := c.Node().(ast.Expr)
		tv, ok := p.pass.TypesInfo.Types[expr]
		if !ok || !tv.IsValue() || !p.containsProtected(tv.Type) || p.allowedValue(c) {
			continue
		}
		p.pass.Reportf(expr.Pos(), "by-value copy of %s, which contains a protected field", tv.Type)
	}

	return nil, nil
}

func (p *protectedFieldPass) checkWrite(expr ast.Expr, what string) {
	sel, ok := ast.Unparen(expr).(*ast.SelectorExpr)
	if !ok {
		return
	}
	selection := p.pass.TypesInfo.Selections[sel]
	if selection == nil || selection.Kind() != types.FieldVal {
		return
	}
	typ := selection.Recv()
	var tag string
	for _, index := range selection.Index() {
		if ptr, ok := typ.Underlying().(*types.Pointer); ok {
			typ = ptr.Elem()
		}
		st := typ.Underlying().(*types.Struct)
		tag = st.Tag(index)
		typ = st.Field(index).Type()
	}
	if isProtectedTag(tag) {
		p.pass.Reportf(sel.Sel.Pos(), "%s protected field %s", what, sel.Sel.Name)
	}
}

func (p *protectedFieldPass) checkLiteral(lit *ast.CompositeLit) {
	typ := p.pass.TypesInfo.TypeOf(lit)
	// Elided literals in []*T or map[K]*T composites have type *T.
	if ptr, ok := typ.Underlying().(*types.Pointer); ok {
		typ = ptr.Elem()
	}
	st, ok := typ.Underlying().(*types.Struct)
	if !ok {
		return
	}
	for i, elt := range lit.Elts {
		index := i
		if kv, ok := elt.(*ast.KeyValueExpr); ok {
			key, ok := kv.Key.(*ast.Ident)
			if !ok {
				continue
			}
			index = -1
			for j := range st.NumFields() {
				if st.Field(j).Name() == key.Name {
					index = j
					break
				}
			}
			if index < 0 {
				continue
			}
		}
		if index < st.NumFields() && isProtectedTag(st.Tag(index)) {
			p.pass.Reportf(elt.Pos(), "write to protected field %s", st.Field(index).Name())
		}
	}
}

func (p *protectedFieldPass) checkFields(fields *ast.FieldList, what string) {
	if fields == nil {
		return
	}
	for _, field := range fields.List {
		if typ := p.pass.TypesInfo.TypeOf(field.Type); typ != nil && p.containsProtected(typ) {
			p.pass.Reportf(field.Type.Pos(), "%s holds %s by value, which contains a protected field", what, typ)
		}
	}
}

// allowedValue reports whether a record-valued expression is used without
// copying it: selecting a field or method, taking its address, indexing it, or
// as an operand of unsafe.Sizeof, Alignof, or Offsetof.
func (p *protectedFieldPass) allowedValue(c inspector.Cursor) bool {
	child := c.Node()
	for parent := c.Parent(); ; parent = parent.Parent() {
		switch node := parent.Node().(type) {
		case *ast.ParenExpr:
			child = node
			continue
		case *ast.SelectorExpr:
			return node.X == child
		case *ast.UnaryExpr:
			return node.Op == token.AND
		case *ast.IndexExpr:
			return node.X == child
		case *ast.SliceExpr:
			return node.X == child
		}
		for call := range parent.Enclosing((*ast.CallExpr)(nil)) {
			if p.isUnsafeLayoutCall(call.Node().(*ast.CallExpr)) {
				return true
			}
		}
		return false
	}
}

func (p *protectedFieldPass) isUnsafeLayoutCall(call *ast.CallExpr) bool {
	sel, ok := ast.Unparen(call.Fun).(*ast.SelectorExpr)
	if !ok {
		return false
	}
	builtin, ok := p.pass.TypesInfo.Uses[sel.Sel].(*types.Builtin)
	return ok && (builtin.Name() == "Sizeof" || builtin.Name() == "Alignof" || builtin.Name() == "Offsetof")
}

func (p *protectedFieldPass) containsProtected(typ types.Type) bool {
	if result, ok := p.contains[typ]; ok {
		return result
	}
	result := false
	switch t := typ.Underlying().(type) {
	case *types.Struct:
		for i := range t.NumFields() {
			if isProtectedTag(t.Tag(i)) || p.containsProtected(t.Field(i).Type()) {
				result = true
				break
			}
		}
	case *types.Array:
		result = p.containsProtected(t.Elem())
	}
	p.contains[typ] = result
	return result
}

func isProtectedTag(tag string) bool {
	return reflect.StructTag(tag).Get("customlint") == "protected"
}
