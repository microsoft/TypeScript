package customlint

import (
	"cmp"
	"go/ast"
	"go/token"
	"go/types"
	"slices"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/ctrlflow"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
	"golang.org/x/tools/go/cfg"
)

var shadowAnalyzer = &analysis.Analyzer{
	Name:     "shadow",
	Doc:      "check for unintended shadowing of variables",
	URL:      "https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/shadow",
	Requires: []*analysis.Analyzer{inspect.Analyzer, ctrlflow.Analyzer},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&shadowPass{pass: pass}).run()
	},
}

type shadowPass struct {
	pass    *analysis.Pass
	inspect *inspector.Inspector
	cfgs    *ctrlflow.CFGs

	objectDefs     map[types.Object]*ast.Ident
	objectUses     map[types.Object][]*ast.Ident
	scopes         map[*types.Scope]ast.Node
	fnTypeToParent map[*ast.FuncType]ast.Node
}

func (s *shadowPass) run() (any, error) {
	s.inspect = s.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
	s.cfgs = s.pass.ResultOf[ctrlflow.Analyzer].(*ctrlflow.CFGs)

	s.objectDefs = make(map[types.Object]*ast.Ident)
	for id, obj := range s.pass.TypesInfo.Defs {
		if obj != nil {
			s.objectDefs[obj] = id
		}
	}

	s.objectUses = make(map[types.Object][]*ast.Ident)
	for id, obj := range s.pass.TypesInfo.Uses {
		if obj != nil {
			s.objectUses[obj] = append(s.objectUses[obj], id)
		}
	}
	for _, uses := range s.objectUses {
		slices.SortFunc(uses, comparePos)
	}

	s.scopes = make(map[*types.Scope]ast.Node, len(s.pass.TypesInfo.Scopes))
	for id, scope := range s.pass.TypesInfo.Scopes {
		s.scopes[scope] = id
	}

	s.fnTypeToParent = make(map[*ast.FuncType]ast.Node)

	for n := range s.inspect.PreorderSeq(
		(*ast.FuncDecl)(nil),
		(*ast.FuncLit)(nil),
		(*ast.AssignStmt)(nil),
		(*ast.GenDecl)(nil),
	) {
		switch n := n.(type) {
		case *ast.FuncDecl:
			s.fnTypeToParent[n.Type] = n
		case *ast.FuncLit:
			s.fnTypeToParent[n.Type] = n
		case *ast.AssignStmt:
			s.handleAssignment(n)
		case *ast.GenDecl:
			s.handleAssignment(n)
		}
	}

	return nil, nil
}

func (s *shadowPass) handleAssignment(n ast.Node) {
	var idents []*ast.Ident

	switch n := n.(type) {
	case *ast.AssignStmt:
		if n.Tok != token.DEFINE {
			return
		}
		for _, expr := range n.Lhs {
			ident, ok := expr.(*ast.Ident)
			if !ok {
				continue
			}
			idents = append(idents, ident)
		}
	case *ast.GenDecl:
		if n.Tok != token.VAR {
			return
		}
		for _, spec := range n.Specs {
			valueSpec, ok := spec.(*ast.ValueSpec)
			if !ok {
				continue
			}
			idents = append(idents, valueSpec.Names...)
		}
	}

	for _, ident := range idents {
		if ident.Name == "_" {
			// Can't shadow the blank identifier.
			continue
		}
		obj := s.pass.TypesInfo.Defs[ident]
		if obj == nil {
			continue
		}
		// obj.Parent.Parent is the surrounding scope. If we can find another declaration
		// starting from there, we have a shadowed identifier.
		_, shadowed := obj.Parent().Parent().LookupParent(obj.Name(), obj.Pos())
		if shadowed == nil {
			continue
		}
		shadowedScope := shadowed.Parent()
		// Don't complain if it's shadowing a universe-declared identifier; that's fine.
		if shadowedScope == types.Universe {
			continue
		}
		// Ignore shadowing a type name, which can never result in a logic error.
		if isTypeName(obj) || isTypeName(shadowed) {
			continue
		}
		// Don't complain if the types differ: that implies the programmer really wants two different things.
		if !types.Identical(obj.Type(), shadowed.Type()) {
			continue
		}

		uses := s.objectUses[obj]
		var lastUse *ast.Ident
		if len(uses) > 0 {
			lastUse = uses[len(uses)-1]
		}
		if lastUse == nil {
			// Unused variable?
			continue
		}

		shadowedFunctionScope := s.enclosingFunctionScope(shadowedScope)
		objFunctionScope := s.enclosingFunctionScope(obj.Parent())

		// Always error if the shadowed identifier is not in the same function.
		if shadowedFunctionScope == nil || shadowedFunctionScope != objFunctionScope {
			s.report(ident, shadowed, 0)
			continue
		}

		cfg := s.cfgFor(s.fnTypeToParent[s.scopes[objFunctionScope].(*ast.FuncType)])

		if reachable, ok := positionIsReachable(cfg, ident, shadowed.Pos(), s.objectUses[shadowed]); ok {
			s.report(ident, shadowed, reachable)
		}
	}
}

func (s *shadowPass) report(ident *ast.Ident, shadowed types.Object, use token.Pos) {
	shadowedLine := s.pass.Fset.Position(shadowed.Pos()).Line
	if use != 0 {
		shadowedUse := s.pass.Fset.Position(use).Line
		s.pass.ReportRangef(ident, "declaration of %q shadows declaration at line %d and is reachable from use at line %d", ident.Name, shadowedLine, shadowedUse)
	} else {
		s.pass.ReportRangef(ident, "declaration of %q shadows non-local declaration at line %d", ident.Name, shadowedLine)
	}
}

func (s *shadowPass) reportWithUse(ident *ast.Ident, use token.Pos) {
	line := s.pass.Fset.Position(use).Line
	s.pass.ReportRangef(ident, "declaration of %q shadows declaration at line %d", ident.Name, line)
}

func positionIsReachable(c *cfg.CFG, ident *ast.Ident, shadowDecl token.Pos, shadowUses []*ast.Ident) (reachablePos token.Pos, found bool) {
	var start *cfg.Block
	for _, b := range c.Blocks {
		if posInBlock(b, ident.Pos()) {
			start = b
			break
		}
	}
	if start == nil {
		return 0, true
	}

	seen := make(map[*cfg.Block]struct{})
	var reachable func(b *cfg.Block) (reachablePos token.Pos, found bool)
	reachable = func(b *cfg.Block) (reachablePos token.Pos, found bool) {
		if _, ok := seen[b]; ok {
			return 0, false
		}
		seen[b] = struct{}{}

		if posInBlock(b, shadowDecl) {
			// We hit the declaration; any value we could have written
			// will be written over again, so ineffectual.
			return 0, false
		}

		for _, use := range shadowUses {
			if posInBlock(b, use.Pos()) {
				return use.Pos(), true
			}
		}

		for _, succ := range b.Succs {
			if pos, found := reachable(succ); found {
				return pos, true
			}
		}

		return 0, false
	}

	// Start from start's successors, since a block can only reach itself
	// through its successors (and therefore should not be checked first).
	for _, succ := range start.Succs {
		if pos, found := reachable(succ); found {
			return pos, true
		}
	}

	return 0, false
}

func (s *shadowPass) enclosingFunctionScope(scope *types.Scope) *types.Scope {
	for ; scope != types.Universe; scope = scope.Parent() {
		if _, ok := s.scopes[scope].(*ast.FuncType); ok {
			return scope
		}
	}
	return nil
}

func (s *shadowPass) cfgFor(n ast.Node) *cfg.CFG {
	switch n := n.(type) {
	case *ast.FuncDecl:
		return s.cfgs.FuncDecl(n)
	case *ast.FuncLit:
		return s.cfgs.FuncLit(n)
	default:
		panic("unexpected node type")
	}
}

func posInBlock(b *cfg.Block, pos token.Pos) bool {
	if len(b.Nodes) == 0 {
		return false
	}

	first := b.Nodes[0]
	last := b.Nodes[len(b.Nodes)-1]

	return first.Pos() <= pos && pos <= last.End()
}

func comparePos[T ast.Node](a, b T) int {
	return cmp.Compare(a.Pos(), b.Pos())
}

func nodeContainsPos(node ast.Node, pos token.Pos) bool {
	return node.Pos() <= pos && pos <= node.End()
}

func isTypeName(obj types.Object) bool {
	_, ok := obj.(*types.TypeName)
	return ok
}
