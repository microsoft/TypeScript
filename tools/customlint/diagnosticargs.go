package customlint

import (
	"go/ast"
	"go/constant"
	"go/token"
	"go/types"
	"regexp"
	"strconv"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var diagnosticArgsAnalyzer = &analysis.Analyzer{
	Name:      "diagnosticargs",
	Doc:       "checks diagnostic messages have enough formatting arguments",
	Requires:  []*analysis.Analyzer{inspect.Analyzer},
	FactTypes: []analysis.Fact{new(diagnosticArgumentCount)},
	Run:       runDiagnosticArgs,
}

type diagnosticArgumentCount struct {
	Count int
}

func (*diagnosticArgumentCount) AFact() {}

var diagnosticPlaceholder = regexp.MustCompile(`\{(\d+)\}`)

func isDiagnosticMessage(t types.Type) bool {
	pointer, ok := types.Unalias(t).(*types.Pointer)
	if !ok {
		return false
	}
	named, ok := types.Unalias(pointer.Elem()).(*types.Named)
	return ok && named.Obj().Name() == "Message" && named.Obj().Pkg() != nil &&
		strings.HasSuffix(named.Obj().Pkg().Path(), "/internal/diagnostics")
}

func runDiagnosticArgs(pass *analysis.Pass) (any, error) {
	counts := make(map[types.Object]diagnosticArgumentCount)
	if strings.HasSuffix(pass.Pkg.Path(), "/internal/diagnostics") {
		for _, file := range pass.Files {
			for _, decl := range file.Decls {
				gen, ok := decl.(*ast.GenDecl)
				if !ok || gen.Tok != token.VAR {
					continue
				}
				for _, spec := range gen.Specs {
					value := spec.(*ast.ValueSpec)
					for i, expr := range value.Values {
						unary, ok := expr.(*ast.UnaryExpr)
						if !ok || unary.Op != token.AND || !isDiagnosticMessage(pass.TypesInfo.TypeOf(expr)) {
							continue
						}
						literal, ok := unary.X.(*ast.CompositeLit)
						if !ok {
							continue
						}
						for _, element := range literal.Elts {
							field, ok := element.(*ast.KeyValueExpr)
							if !ok {
								continue
							}
							key, ok := field.Key.(*ast.Ident)
							if !ok || key.Name != "text" {
								continue
							}
							text := pass.TypesInfo.Types[field.Value].Value
							if text == nil || text.Kind() != constant.String {
								continue
							}
							count := diagnosticArgumentCount{}
							for _, match := range diagnosticPlaceholder.FindAllStringSubmatch(constant.StringVal(text), -1) {
								index, err := strconv.Atoi(match[1])
								if err == nil {
									count.Count = max(count.Count, index+1)
								}
							}
							object := pass.TypesInfo.Defs[value.Names[i]]
							counts[object] = count
							pass.ExportObjectFact(object, &count)
						}
					}
				}
			}
		}
	}

	check := func(call *ast.CallExpr, message ast.Expr, actual int) {
		var object types.Object
		switch expr := ast.Unparen(message).(type) {
		case *ast.Ident:
			object = pass.TypesInfo.Uses[expr]
		case *ast.SelectorExpr:
			object = pass.TypesInfo.Uses[expr.Sel]
		}
		if object == nil {
			return
		}
		count, ok := counts[object]
		if !ok && !pass.ImportObjectFact(object, &count) {
			return
		}
		if actual < count.Count {
			pass.ReportRangef(call, "diagnostic %s requires at least %d formatting arguments, got %d", object.Name(), count.Count, actual)
		}
	}

	in := pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
	in.Preorder([]ast.Node{(*ast.CallExpr)(nil)}, func(node ast.Node) {
		call := node.(*ast.CallExpr)
		if call.Ellipsis.IsValid() {
			return
		}
		signature, ok := pass.TypesInfo.TypeOf(call.Fun).(*types.Signature)
		if !ok || !signature.Variadic() {
			return
		}
		fixed := signature.Params().Len() - 1
		if len(call.Args) < fixed {
			return
		}
		if fixed > 0 && isDiagnosticMessage(signature.Params().At(fixed-1).Type()) {
			check(call, call.Args[fixed-1], len(call.Args)-fixed)
			return
		}
		if selector, ok := call.Fun.(*ast.SelectorExpr); ok {
			selection := pass.TypesInfo.Selections[selector]
			if selection != nil && selection.Kind() == types.MethodVal &&
				isDiagnosticMessage(selection.Recv()) && selector.Sel.Name == "Localize" {
				check(call, selector.X, len(call.Args)-fixed)
			}
		}
	})
	return nil, nil
}
