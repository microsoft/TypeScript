package checker_test

import (
	goast "go/ast"
	"go/parser"
	"go/printer"
	"go/token"
	"path/filepath"
	"strings"
	"testing"

	"gotest.tools/v3/assert"
)

// memoComputeCalls are the calls only the computation of a result makes on
// its memo: a function making one computes the results of that memo.
var memoComputeCalls = map[string]bool{
	"begin": true, "set": true, "setIdentity": true, "setReported": true,
	"swap": true, "intern": true, "compute": true, "once": true,
	"setAfterMarker": true, "setIfChanged": true,
}

// memoReads are the calls reading what a memo holds.
var memoReads = map[string]bool{"cached": true, "hasCached": true, "peek": true}

// memoHelpers are methods standing for a call on a memo whose storage is
// allocated only when needed, or which a computation may replace with
// storage of its own: each names the memo field and whether the method reads
// it or computes it.
var memoHelpers = map[string]struct {
	field string
	reads bool
}{
	"cachedWriteType":           {"writeType", true},
	"setWriteType":              {"writeType", false},
	"setNewWriteType":           {"writeType", false},
	"cachedOuterTypeParameters": {"outerTypeParameters", true},
	"cachedEntry":               {"relation", true},
	"setEntry":                  {"relation", false},
}

// Whether a memo holds a result yet depends on what was computed first, so
// only the computation of a result reads it from its memo: its getter, which
// reuses it, and the computation itself. Everything else asks the getter. A
// memo a computation fills in as a side output of another has no getter of
// its own; it is read by the one accessor listed in memoAccessors, which runs
// the computation producing it first.
func TestOnlyComputationsReadMemos(t *testing.T) {
	t.Parallel()
	fset := token.NewFileSet()
	files, err := filepath.Glob("*.go")
	assert.NilError(t, err)
	text := func(e goast.Expr) string {
		var b strings.Builder
		printer.Fprint(&b, fset, e)
		return b.String()
	}
	field := func(memo string) string {
		return memo[strings.LastIndexByte(memo, '.')+1:]
	}
	for _, name := range files {
		// Memos and the resolutions computing them are implemented in
		// memo.go and resolutions.go, which find computations in progress.
		// Tracing reports what has been computed without computing more,
		// and its output is not the checker's.
		if name == "memo.go" || name == "resolutions.go" || name == "tracer.go" || strings.HasSuffix(name, "_test.go") {
			continue
		}
		file, err := parser.ParseFile(fset, name, nil, parser.SkipObjectResolution)
		assert.NilError(t, err)
		for _, decl := range file.Decls {
			fn, isFunc := decl.(*goast.FuncDecl)
			if !isFunc || fn.Body == nil {
				continue
			}
			if _, ok := memoHelpers[fn.Name.Name]; ok && fn.Recv != nil {
				continue
			}
			computes := make(map[string]bool)
			computesAny := false
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				call, ok := n.(*goast.CallExpr)
				if !ok {
					return true
				}
				switch f := call.Fun.(type) {
				case *goast.SelectorExpr:
					if memoComputeCalls[f.Sel.Name] {
						computes[text(f.X)] = true
					}
					if h, ok := memoHelpers[f.Sel.Name]; ok && !h.reads {
						computes[text(f.X)+"."+h.field] = true
					}
					// Computations keyed by entity and field begin by key.
					if f.Sel.Name == "beginMemo" || f.Sel.Name == "memoCompute" || f.Sel.Name == "objectFlagsCell" {
						computesAny = true
					}
				case *goast.Ident, *goast.IndexExpr:
					callee := text(call.Fun)
					if i := strings.IndexByte(callee, '['); i >= 0 {
						callee = callee[:i]
					}
					if memoComputeCalls[callee] && len(call.Args) > 1 {
						if u, ok := call.Args[1].(*goast.UnaryExpr); ok {
							computes[text(u.X)] = true
						}
					}
				}
				return true
			})
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				call, ok := n.(*goast.CallExpr)
				if !ok {
					return true
				}
				sel, ok := call.Fun.(*goast.SelectorExpr)
				if !ok {
					return true
				}
				var memo string
				if h, ok := memoHelpers[sel.Sel.Name]; ok && h.reads {
					memo = text(sel.X) + "." + h.field
				} else if memoReads[sel.Sel.Name] {
					memo = text(sel.X)
				} else {
					return true
				}
				if computes[memo] || computesAny || memoAccessors[field(memo)][fn.Name.Name] {
					return true
				}
				t.Errorf("%s: %s reads %s, whose results it does not compute", fset.Position(call.Pos()), fn.Name.Name, memo)
				return true
			})
		}
	}
}

// memoAccessors lists, for each memo filled in as a side output of another
// computation, the accessors reading it, which run that computation first or
// are called by it once it has; and for each memo holding a part an entity's
// creator supplies, the accessor reading that part.
var memoAccessors = map[string]map[string]bool{
	"resolvedTypeArguments": {"typeArgumentsOfCreation": true},
	"writeType":             {"writeTypeOfCreation": true},
	"resolvedType":          {"typeOfCreation": true},
	"constraint":            {"constraintOfCreation": true},
	"containsError":         {"mappedTypeContainsError": true},
	"resolvedSymbol": {
		"getSymbolOfExpression": true, "symbolOfCheckedExpression": true,
		"getSymbolOfTypeNodePart": true,
	},
	"lateMergedSymbols": {"getLateMergedSymbol": true, "combineSymbolTables": true},
	"relation":          {"cachedRelation": true},
}

// A result an entity's creator sets is part of the entity, which can outlive
// the computation creating it in caches, with no way to compute the result
// again. So the creator sets it with setIdentity or intern, which are kept,
// and not with set, which a discarded computation discards.
func TestCreatorsKeepThePartsTheySet(t *testing.T) {
	t.Parallel()
	fset := token.NewFileSet()
	files, err := filepath.Glob("*.go")
	assert.NilError(t, err)
	text := func(e goast.Expr) string {
		var b strings.Builder
		printer.Fprint(&b, fset, e)
		return b.String()
	}
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
			// The entities the function creates, and the links of those.
			created := make(map[string]bool)
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				assign, ok := n.(*goast.AssignStmt)
				if !ok || len(assign.Lhs) != 1 || len(assign.Rhs) != 1 {
					return true
				}
				call, ok := assign.Rhs[0].(*goast.CallExpr)
				if !ok {
					return true
				}
				sel, ok := call.Fun.(*goast.SelectorExpr)
				if !ok {
					return true
				}
				isNew := strings.HasPrefix(sel.Sel.Name, "new") && text(sel.X) == "c"
				isLinks := sel.Sel.Name == "Get" && strings.HasSuffix(text(sel.X), "Links") && len(call.Args) == 1 && created[text(call.Args[0])]
				if isNew || isLinks {
					created[text(assign.Lhs[0])] = true
				}
				return true
			})
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				call, ok := n.(*goast.CallExpr)
				if !ok {
					return true
				}
				sel, ok := call.Fun.(*goast.SelectorExpr)
				if !ok || sel.Sel.Name != "set" && sel.Sel.Name != "setWriteType" {
					return true
				}
				// The memo is reached from a created entity or its links.
				for e := sel.X; e != nil; {
					switch x := e.(type) {
					case *goast.SelectorExpr:
						e = x.X
					case *goast.CallExpr:
						if s, ok := x.Fun.(*goast.SelectorExpr); ok && s.Sel.Name == "Get" && len(x.Args) == 1 && created[text(x.Args[0])] {
							t.Errorf("%s: %s sets part of %s, which it creates, with %s", fset.Position(call.Pos()), fn.Name.Name, text(x.Args[0]), sel.Sel.Name)
							return true
						}
						e = x.Fun
					case *goast.Ident:
						if created[x.Name] {
							t.Errorf("%s: %s sets part of %s, which it creates, with %s", fset.Position(call.Pos()), fn.Name.Name, x.Name, sel.Sel.Name)
						}
						e = nil
					default:
						e = nil
					}
				}
				return true
			})
		}
	}
}

// appliedCalls are the checker methods an effect may call when it is
// applied: those adding what was computed where the effect was recorded.
var appliedCalls = map[string]bool{
	"error": true, "addErrorOrSuggestion": true, "Add": true, "Has": true, "Get": true,
	"IsTrue": true,
}

// A query records the effects of a computation, and reports located at the
// node checking it, to apply them once checking reaches its result; checking
// applies them as they happen, inside the computation. So an effect, and a
// report, only applies what was computed where it was recorded: computing
// more when applied, such as printing a type, would run inside the
// computation in a check but after it in a query, and could find
// computations in progress in one and not in the other.
func TestDeferredEffectsOnlyApply(t *testing.T) {
	t.Parallel()
	fset := token.NewFileSet()
	files, err := filepath.Glob("*.go")
	assert.NilError(t, err)
	text := func(e goast.Expr) string {
		var b strings.Builder
		printer.Fprint(&b, fset, e)
		return b.String()
	}
	funcs := make(map[string]*goast.FuncDecl)
	var parsed []*goast.File
	for _, name := range files {
		if strings.HasSuffix(name, "_test.go") {
			continue
		}
		file, err := parser.ParseFile(fset, name, nil, parser.SkipObjectResolution)
		assert.NilError(t, err)
		parsed = append(parsed, file)
		for _, decl := range file.Decls {
			if fn, ok := decl.(*goast.FuncDecl); ok && fn.Recv != nil && fn.Body != nil {
				funcs[fn.Name.Name] = fn
			}
		}
	}
	// check reports the calls in body of checker methods not adding what
	// was computed. A method recording an effect that calls the method
	// again applies the rest of its body.
	var check func(owner *goast.FuncDecl, body goast.Node, where token.Pos)
	check = func(owner *goast.FuncDecl, body goast.Node, where token.Pos) {
		goast.Inspect(body, func(n goast.Node) bool {
			call, ok := n.(*goast.CallExpr)
			if !ok {
				return true
			}
			sel, ok := call.Fun.(*goast.SelectorExpr)
			if !ok {
				return true
			}
			root := sel.X
			for {
				if s, ok := root.(*goast.SelectorExpr); ok {
					root = s.X
				} else {
					break
				}
			}
			if id, ok := root.(*goast.Ident); !ok || id.Name != "c" {
				return true
			}
			// A deferred diagnostic is produced when the check ends, outside
			// the computations in progress, in a check and in a query alike.
			if sel.Sel.Name == "addDeferredDiagnostic" {
				return false
			}
			// The program computes nothing in the checker.
			if appliedCalls[sel.Sel.Name] || text(sel.X) == "c.program" {
				return true
			}
			if sel.Sel.Name == owner.Name.Name && text(sel.X) == "c" {
				for _, stmt := range owner.Body.List {
					if !recordsEffect(stmt) {
						check(owner, stmt, where)
					}
				}
				return true
			}
			t.Errorf("%s: an effect recorded by %s calls %s when applied", fset.Position(where), owner.Name.Name, text(call.Fun))
			return true
		})
	}
	for _, file := range parsed {
		for _, decl := range file.Decls {
			fn, isFunc := decl.(*goast.FuncDecl)
			if !isFunc || fn.Body == nil {
				continue
			}
			// Closures the function assigns to names.
			closures := make(map[string]*goast.FuncLit)
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				if assign, ok := n.(*goast.AssignStmt); ok && len(assign.Lhs) == 1 && len(assign.Rhs) == 1 {
					if lit, ok := assign.Rhs[0].(*goast.FuncLit); ok {
						closures[text(assign.Lhs[0])] = lit
					}
				}
				return true
			})
			goast.Inspect(fn.Body, func(n goast.Node) bool {
				call, ok := n.(*goast.CallExpr)
				if !ok || len(call.Args) == 0 {
					return true
				}
				sel, ok := call.Fun.(*goast.SelectorExpr)
				if !ok || text(sel.X) != "c" || !deferringCalls[sel.Sel.Name] {
					return true
				}
				var lit *goast.FuncLit
				switch arg := call.Args[len(call.Args)-1].(type) {
				case *goast.FuncLit:
					lit = arg
				case *goast.Ident:
					lit = closures[arg.Name]
				}
				if lit != nil {
					check(fn, lit.Body, call.Pos())
				}
				return true
			})
		}
	}
}

// deferringCalls are the checker methods taking an effect, or a report,
// that a query applies later than checking does.
var deferringCalls = map[string]bool{
	"recordEffect": true, "recordMark": true, "reportAtCurrentNode": true, "reportAtCurrentNodeOnce": true,
	"holdEffect": true,
}

// recordsEffect reports whether stmt is the part of a method recording an
// effect that records it.
func recordsEffect(stmt goast.Stmt) bool {
	found := false
	goast.Inspect(stmt, func(n goast.Node) bool {
		if call, ok := n.(*goast.CallExpr); ok {
			if sel, ok := call.Fun.(*goast.SelectorExpr); ok && deferringCalls[sel.Sel.Name] {
				found = true
			}
		}
		return !found
	})
	return found
}
