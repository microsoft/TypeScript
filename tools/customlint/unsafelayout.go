package customlint

import (
	"go/ast"
	"go/constant"
	"go/token"
	"go/types"
	"path/filepath"
	"slices"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var unsafeLayoutAnalyzer = &analysis.Analyzer{
	Name:     "unsafelayout",
	Doc:      "enforces construction, immutable tags, and checked casts for compiler records",
	Requires: []*analysis.Analyzer{inspect.Analyzer},
	Run: func(pass *analysis.Pass) (any, error) {
		in := pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
		p := unsafeLayoutPass{pass: pass}
		p.collectNodeLayouts()
		for c := range in.Root().Preorder(
			(*ast.AssignStmt)(nil), (*ast.IncDecStmt)(nil), (*ast.UnaryExpr)(nil), (*ast.CompositeLit)(nil),
			(*ast.CallExpr)(nil), (*ast.IndexExpr)(nil), (*ast.TypeSpec)(nil),
			(*ast.StarExpr)(nil), (*ast.SelectorExpr)(nil), (*ast.Ident)(nil),
		) {
			p.check(c)
		}
		return nil, nil
	},
}

type unsafeLayoutPass struct {
	pass        *analysis.Pass
	nodeLayouts map[*types.TypeName][]int64
}

func (p *unsafeLayoutPass) collectNodeLayouts() {
	if !strings.HasSuffix(p.pass.Pkg.Path(), "/internal/ast") {
		return
	}
	p.nodeLayouts = make(map[*types.TypeName][]int64)
	for _, file := range p.pass.Files {
		for _, declaration := range file.Decls {
			fn, ok := declaration.(*ast.FuncDecl)
			if !ok || fn.Recv == nil || !strings.HasPrefix(fn.Name.Name, "As") {
				continue
			}
			function, _ := p.pass.TypesInfo.Defs[fn.Name].(*types.Func)
			if function == nil {
				continue
			}
			signature := function.Type().(*types.Signature)
			if signature.Results().Len() != 1 {
				continue
			}
			target := layoutNamedType(signature.Results().At(0).Type())
			if target == nil || layoutFamily(target) != "Node" || fn.Name.Name != "As"+target.Obj().Name() {
				continue
			}
			var kinds []int64
			ast.Inspect(fn.Body, func(node ast.Node) bool {
				if expr, isIdentifier := node.(*ast.Ident); isIdentifier {
					if value, isConstant := p.pass.TypesInfo.Uses[expr].(*types.Const); isConstant &&
						value.Pkg() == p.pass.Pkg && layoutNamedType(value.Type()) != nil &&
						layoutNamedType(value.Type()).Obj().Name() == "Kind" {
						if kind, isInteger := constant.Int64Val(value.Val()); isInteger {
							kinds = append(kinds, kind)
						}
					}
				}
				return true
			})
			if len(kinds) != 0 {
				p.nodeLayouts[target.Obj()] = kinds
			}
		}
	}
}

func (p *unsafeLayoutPass) matchingNodeKind(typ types.Type, expr ast.Expr) bool {
	named := layoutNamedType(typ)
	if named == nil {
		return false
	}
	value := p.pass.TypesInfo.Types[expr].Value
	if value == nil || value.Kind() != constant.Int {
		return false
	}
	kind, ok := constant.Int64Val(value)
	if !ok {
		return false
	}
	return slices.Contains(p.nodeLayouts[named.Obj()], kind)
}

func layoutNamedType(typ types.Type) *types.Named {
	if typ == nil {
		return nil
	}
	if pointer, ok := types.Unalias(typ).(*types.Pointer); ok {
		typ = pointer.Elem()
	}
	return namedType(typ)
}

func layoutFamily(typ types.Type) string {
	named := layoutNamedType(typ)
	if named == nil || named.Obj().Pkg() == nil {
		return ""
	}
	path := named.Obj().Pkg().Path()
	if strings.HasSuffix(path, "/internal/ast") && (named.Obj().Name() == "Node" || named.Obj().Name() == "MutableNode") {
		return "Node"
	}
	if strings.HasSuffix(path, "/internal/checker") {
		switch named.Obj().Name() {
		case "Type", "TypeMapper":
			return named.Obj().Name()
		}
	}
	if structure, ok := named.Underlying().(*types.Struct); ok && structure.NumFields() != 0 && structure.Field(0).Embedded() {
		if _, pointer := types.Unalias(structure.Field(0).Type()).(*types.Pointer); !pointer {
			return layoutFamily(structure.Field(0).Type())
		}
	}
	return ""
}

func layoutKind(typ types.Type) *types.Const {
	named := layoutNamedType(typ)
	if named == nil || named.Obj().Pkg() == nil {
		return nil
	}
	var name string
	switch layoutFamily(typ) {
	case "Type":
		name = "typeKind" + strings.TrimSuffix(named.Obj().Name(), "Type")
	case "TypeMapper":
		name = "typeMapper" + strings.TrimSuffix(named.Obj().Name(), "TypeMapper")
	default:
		return nil
	}
	kind, _ := named.Obj().Pkg().Scope().Lookup(name).(*types.Const)
	return kind
}

func (p *unsafeLayoutPass) matchingKind(typ types.Type, expr ast.Expr) bool {
	kind := layoutKind(typ)
	value := p.pass.TypesInfo.Types[expr].Value
	return kind != nil && value != nil && types.Identical(kind.Type(), p.pass.TypesInfo.TypeOf(expr)) &&
		constant.Compare(kind.Val(), token.EQL, value)
}

func layoutFunction(c inspector.Cursor) *ast.FuncDecl {
	for parent := c.Parent(); parent.Node() != nil; parent = parent.Parent() {
		switch node := parent.Node().(type) {
		case *ast.FuncLit:
			return nil
		case *ast.FuncDecl:
			return node
		}
	}
	return nil
}

func (p *unsafeLayoutPass) ownerFunction(c inspector.Cursor, family, name string) bool {
	fn := layoutFunction(c)
	if fn == nil || fn.Name.Name != name {
		return false
	}
	pkg := "/internal/checker"
	if family == "Node" {
		pkg = "/internal/ast"
	}
	if !strings.HasSuffix(p.pass.Pkg.Path(), pkg) {
		return false
	}
	function, _ := p.pass.TypesInfo.Defs[fn.Name].(*types.Func)
	if function == nil {
		return false
	}
	signature := function.Type().(*types.Signature)
	switch name {
	case "castType", "castTypeMapper":
		return signature.Recv() == nil
	case "newNode":
		return signature.Recv() == nil ||
			layoutNamedType(signature.Recv().Type()).Obj().Name() == "NodeFactory"
	case "newType":
		return signature.Recv() != nil &&
			layoutNamedType(signature.Recv().Type()).Obj().Name() == "Checker"
	default:
		return signature.Recv() != nil && layoutNamedType(signature.Recv().Type()).Obj().Name() == family
	}
}

func (p *unsafeLayoutPass) check(c inspector.Cursor) {
	node := c.Node()
	// Tests use detached metadata stubs; checked-cast pairing still applies.
	test := strings.HasSuffix(p.pass.Fset.Position(node.Pos()).Filename, "_test.go")
	switch node := node.(type) {
	case *ast.TypeSpec:
		if !node.Assign.IsValid() && layoutFamily(p.pass.TypesInfo.TypeOf(node.Type)) != "" {
			// MutableNode changes the method set without changing the header layout.
			if node.Name.Name != "MutableNode" || !strings.HasSuffix(p.pass.Pkg.Path(), "/internal/ast") {
				p.pass.Reportf(node.Pos(), "defining a new compiler-record type bypasses checked construction; use a type alias")
			}
		}
	case *ast.IndexExpr:
		if function, ok := node.X.(*ast.Ident); ok {
			object, _ := p.pass.TypesInfo.Uses[function].(*types.Func)
			if object != nil && strings.HasSuffix(object.Pkg().Path(), "/internal/checker") &&
				(object.Name() == "castType" || object.Name() == "castTypeMapper") {
				call, ok := c.Parent().Node().(*ast.CallExpr)
				if !ok || call.Fun != node || len(call.Args) != 2 || namedType(p.pass.TypesInfo.TypeOf(node.Index)) == nil ||
					!p.matchingKind(p.pass.TypesInfo.TypeOf(node.Index), call.Args[1]) {
					p.pass.Reportf(node.Pos(), "checked cast must directly pair its concrete target type with its matching constant kind")
				}
			}
		}
	case *ast.AssignStmt:
		if test {
			return
		}
		for _, lhs := range node.Lhs {
			if selector, ok := ast.Unparen(lhs).(*ast.SelectorExpr); ok {
				p.checkTagWrite(c, selector, node)
			}
		}
	case *ast.IncDecStmt:
		if selector, ok := ast.Unparen(node.X).(*ast.SelectorExpr); ok && p.protectedTag(selector) && !test {
			p.pass.Reportf(node.Pos(), "incrementing a compiler tag bypasses checked tag assignment")
		}
	case *ast.UnaryExpr:
		if node.Op == token.AND {
			if selector, ok := ast.Unparen(node.X).(*ast.SelectorExpr); ok && p.protectedTag(selector) && !test {
				p.pass.Reportf(node.Pos(), "taking a compiler tag's address bypasses checked tag assignment")
			}
		}
	case *ast.CompositeLit:
		if test || layoutFamily(p.pass.TypesInfo.TypeOf(node)) == "" || p.layoutConstant(c) {
			return
		}
		family := layoutFamily(p.pass.TypesInfo.TypeOf(node))
		named := layoutNamedType(p.pass.TypesInfo.TypeOf(node))
		if named.Obj().Name() == family || named.Obj().Name() == "MutableNode" {
			p.pass.Reportf(node.Pos(), "a bare compiler header has no concrete payload; use a concrete factory")
		}
		owner := "/internal/checker"
		if family == "Node" {
			owner = "/internal/ast"
		}
		if !strings.HasSuffix(p.pass.Pkg.Path(), owner) {
			p.pass.Reportf(node.Pos(), "construct compiler records through their owning factories, not struct literals")
		}
		for _, element := range node.Elts {
			if field, ok := element.(*ast.KeyValueExpr); ok {
				if key, ok := field.Key.(*ast.Ident); ok && (key.Name == "kind" || key.Name == "Kind") {
					p.pass.Reportf(field.Pos(), "compiler tags must be assigned by checked construction, not struct literals")
				}
			}
		}
	case *ast.CallExpr:
		p.checkCall(c, node, test)
	case *ast.StarExpr, *ast.SelectorExpr, *ast.Ident:
		var object *types.Func
		switch expr := node.(type) {
		case *ast.SelectorExpr:
			object, _ = p.pass.TypesInfo.Uses[expr.Sel].(*types.Func)
		case *ast.Ident:
			object, _ = p.pass.TypesInfo.Uses[expr].(*types.Func)
		}
		if object != nil && object.Pkg() != nil &&
			((strings.HasSuffix(object.Pkg().Path(), "/internal/checker") && object.Name() == "newType") ||
				(strings.HasSuffix(object.Pkg().Path(), "/internal/ast") && object.Name() == "newNode")) {
			call, ok := c.Parent().Node().(*ast.CallExpr)
			if !ok || call.Fun != node {
				// The selector's identifier is visited separately.
				if selector, ok := c.Parent().Node().(*ast.SelectorExpr); !ok || selector.Sel != node {
					p.pass.Reportf(node.Pos(), "checked construction must be called directly so its allocation/tag pairing can be verified")
				}
			}
		}
		if test {
			return
		}
		expr := node.(ast.Expr)
		value := p.pass.TypesInfo.Types[expr]
		if value.IsType() || value.Type == nil {
			return
		}
		if _, pointer := types.Unalias(value.Type).(*types.Pointer); pointer || layoutFamily(value.Type) == "" || p.layoutConstant(c) {
			return
		}
		switch parent := c.Parent().Node().(type) {
		case *ast.SelectorExpr:
			if parent.X == expr {
				return
			}
		case *ast.UnaryExpr:
			if parent.Op == token.AND {
				return
			}
		}
		p.pass.Reportf(expr.Pos(), "copying a compiler record by value can detach its tagged header; keep a pointer")
	}
}

func (p *unsafeLayoutPass) protectedTag(selector *ast.SelectorExpr) bool {
	return p.tagFamily(selector) != ""
}

func (p *unsafeLayoutPass) tagFamily(selector *ast.SelectorExpr) string {
	selection := p.pass.TypesInfo.Selections[selector]
	if selection == nil || selection.Obj().Pkg() == nil {
		return ""
	}
	field := selection.Obj()
	if field.Name() != "Kind" && field.Name() != "kind" {
		return ""
	}
	for _, family := range []string{"Node", "Type", "TypeMapper"} {
		object := field.Pkg().Scope().Lookup(family)
		if object == nil || layoutFamily(object.Type()) != family {
			continue
		}
		structure := object.Type().Underlying().(*types.Struct)
		for variable := range structure.Fields() {
			if variable == field {
				return family
			}
		}
	}
	return ""
}

func (p *unsafeLayoutPass) checkTagWrite(c inspector.Cursor, selector *ast.SelectorExpr, assignment *ast.AssignStmt) {
	if !p.protectedTag(selector) {
		return
	}
	family := p.tagFamily(selector)
	switch family {
	case "Node":
		if p.ownerFunction(c, family, "newNode") && layoutFunction(c).Recv == nil {
			p.checkInitializer(selector, assignment)
			return
		}
		p.pass.Reportf(selector.Pos(), "AST kind is immutable outside checked construction; create a new node")
	case "Type":
		if p.ownerFunction(c, family, "newType") {
			p.checkInitializer(selector, assignment)
			return
		}
		p.pass.Reportf(selector.Pos(), "type kind is immutable outside checked construction")
	case "TypeMapper":
		if assignment.Tok == token.ASSIGN && len(assignment.Lhs) == 1 && len(assignment.Rhs) == 1 &&
			p.matchingKind(p.pass.TypesInfo.TypeOf(selector.X), assignment.Rhs[0]) {
			return
		}
		p.pass.Reportf(selector.Pos(), "mapper tag must match the concrete mapper allocation")
	}
}

func (p *unsafeLayoutPass) checkInitializer(selector *ast.SelectorExpr, assignment *ast.AssignStmt) {
	if assignment.Tok == token.ASSIGN && len(assignment.Lhs) == 1 && len(assignment.Rhs) == 1 {
		if kind, ok := assignment.Rhs[0].(*ast.Ident); ok && kind.Name == "kind" {
			return
		}
	}
	p.pass.Reportf(selector.Pos(), "checked construction must initialize the tag from its kind parameter")
}

func (p *unsafeLayoutPass) layoutConstant(c inspector.Cursor) bool {
	for parent := c.Parent(); parent.Node() != nil; parent = parent.Parent() {
		if call, ok := parent.Node().(*ast.CallExpr); ok {
			if selector, ok := call.Fun.(*ast.SelectorExpr); ok {
				object := p.pass.TypesInfo.Uses[selector.Sel]
				if object != nil && object.Pkg() != nil && object.Pkg().Path() == "unsafe" &&
					(object.Name() == "Offsetof" || object.Name() == "Sizeof") {
					return true
				}
			}
		}
	}
	return false
}

func (p *unsafeLayoutPass) checkCall(c inspector.Cursor, call *ast.CallExpr, test bool) {
	var function *types.Func
	switch expr := call.Fun.(type) {
	case *ast.SelectorExpr:
		function, _ = p.pass.TypesInfo.Uses[expr.Sel].(*types.Func)
	case *ast.Ident:
		function, _ = p.pass.TypesInfo.Uses[expr].(*types.Func)
	}
	if function != nil && function.Pkg() != nil && !test {
		if strings.HasSuffix(function.Pkg().Path(), "/internal/checker") && function.Name() == "newType" {
			valid := len(call.Args) == 4 && p.matchingUpcast(call.Args[2], call.Args[3], "Type", false)
			if !valid {
				p.pass.Reportf(call.Pos(), "newType must directly pair a concrete AsType() receiver with its matching constant kind")
			}
		}
		if strings.HasSuffix(function.Pkg().Path(), "/internal/ast") && function.Name() == "newNode" &&
			!p.ownerFunction(c, "Node", "newNode") {
			valid := len(call.Args) >= 2 && p.matchingUpcast(call.Args[1], call.Args[0], "Node", p.generatedAST(c))
			if !valid {
				p.pass.Reportf(call.Pos(), "newNode must pair a concrete AsNode() receiver with a compatible kind")
			}
		}
	}
	if len(call.Args) != 1 {
		return
	}
	if builtin, ok := call.Fun.(*ast.Ident); ok && builtin.Name == "new" {
		family := layoutFamily(p.pass.TypesInfo.TypeOf(call))
		if family != "" && !test {
			named := layoutNamedType(p.pass.TypesInfo.TypeOf(call))
			if named.Obj().Name() == family || named.Obj().Name() == "MutableNode" {
				p.pass.Reportf(call.Pos(), "a bare compiler header has no concrete payload; use a concrete factory")
			}
			owner := "/internal/checker"
			if family == "Node" {
				owner = "/internal/ast"
			}
			if !strings.HasSuffix(p.pass.Pkg.Path(), owner) {
				p.pass.Reportf(call.Pos(), "allocate compiler records through their owning factories")
			}
		}
	}
	source := p.pass.TypesInfo.TypeOf(call.Args[0])
	target := p.pass.TypesInfo.TypeOf(call)
	isUnsafePointer := func(typ types.Type) bool {
		basic, ok := typ.(*types.Basic)
		return ok && basic.Kind() == types.UnsafePointer
	}
	if !isUnsafePointer(source) && !isUnsafePointer(target) {
		return
	}
	family := layoutFamily(target)
	if family == "" {
		family = layoutFamily(source)
	}
	if family == "" {
		if pointer, ok := call.Args[0].(*ast.CallExpr); ok && len(pointer.Args) == 1 {
			family = layoutFamily(p.pass.TypesInfo.TypeOf(pointer.Args[0]))
		}
	}
	if family == "" {
		return
	}
	allowed := false
	switch family {
	case "Node":
		allowed = p.generatedAST(c) || p.ownerFunction(c, family, "AsFlowSwitchClauseData") ||
			p.ownerFunction(c, family, "AsFlowReduceLabelData")
	case "Type":
		allowed = p.ownerFunction(c, family, "castType")
		for _, base := range []string{"ConstrainedType", "StructuredType", "ObjectType", "TypeReference", "InterfaceType", "UnionOrIntersectionType"} {
			allowed = allowed || p.ownerFunction(c, family, "As"+base)
		}
	case "TypeMapper":
		allowed = p.ownerFunction(c, family, "castTypeMapper")
	}
	if !allowed {
		p.pass.Reportf(call.Pos(), "reinterpret compiler records only through checked casts or generated AST dispatch")
	}
}

func (p *unsafeLayoutPass) generatedAST(c inspector.Cursor) bool {
	for parent := c; parent.Node() != nil; parent = parent.Parent() {
		if file, ok := parent.Node().(*ast.File); ok {
			return filepath.Base(p.pass.Fset.Position(file.Pos()).Filename) == "ast_generated.go" && ast.IsGenerated(file) &&
				strings.HasSuffix(p.pass.Pkg.Path(), "/internal/ast")
		}
	}
	return false
}

func (p *unsafeLayoutPass) matchingUpcast(expr, kind ast.Expr, family string, generated bool) bool {
	call, ok := expr.(*ast.CallExpr)
	if !ok || len(call.Args) != 0 {
		return false
	}
	method, ok := call.Fun.(*ast.SelectorExpr)
	if !ok || method.Sel.Name != "As"+family {
		return false
	}
	selection := p.pass.TypesInfo.Selections[method]
	if selection == nil {
		return false
	}
	signature := selection.Obj().Type().(*types.Signature)
	receiver := layoutNamedType(signature.Recv().Type())
	if receiver == nil || layoutFamily(receiver) != family ||
		(receiver.Obj().Name() != family && !(family == "Type" && receiver.Obj().Name() == "TypeBase")) {
		return false
	}
	if family == "Node" {
		return p.matchingNodeKind(p.pass.TypesInfo.TypeOf(method.X), kind) ||
			(generated && p.pass.TypesInfo.Types[kind].Value == nil)
	}
	return p.matchingKind(p.pass.TypesInfo.TypeOf(method.X), kind)
}
