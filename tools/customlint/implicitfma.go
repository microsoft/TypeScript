package customlint

import (
	"fmt"
	"go/ast"
	"go/token"
	"go/types"
	"maps"
	"slices"
	"strconv"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/ctrlflow"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
	"golang.org/x/tools/go/cfg"
	"golang.org/x/tools/go/types/typeutil"
)

var implicitFMAAnalyzer = &analysis.Analyzer{
	Name:     "implicitfma",
	Doc:      "finds floating-point additions and subtractions that may use implicit FMA",
	Requires: []*analysis.Analyzer{inspect.Analyzer, ctrlflow.Analyzer},
	FactTypes: []analysis.Fact{
		new(implicitFMAFunctionFact),
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&implicitFMAPass{pass: pass}).run()
	},
}

type implicitFMAPass struct {
	pass     *analysis.Pass
	inspect  *inspector.Inspector
	cfgs     *ctrlflow.CFGs
	reported map[token.Pos]bool

	selectReceiveAssignments map[*ast.AssignStmt]bool
	functions                map[*types.Func]*ast.FuncDecl
	functionSummaries        map[*types.Func]implicitFMAFunctionSummary
	returnedMultiply         bool
	foundFMA                 bool
	suppressReports          bool
}

// implicitFMAState contains locations that may hold an unrounded
// floating-point multiplication result on at least one incoming path.
type implicitFMAState map[implicitFMALocation]bool

type implicitFMALocation struct {
	object types.Object
	path   string
}

type implicitFMAFunctionSummary struct {
	returnsMultiply          bool
	receiverReturnsMultiply  bool
	receiverCausesFMA        bool
	parameterReturnsMultiply []bool
	parameterCausesFMA       []bool
}

type implicitFMAFunctionFact struct {
	ReturnsMultiply          bool
	ReceiverReturnsMultiply  bool
	ReceiverCausesFMA        bool
	ParameterReturnsMultiply []bool
	ParameterCausesFMA       []bool
}

func (*implicitFMAFunctionFact) AFact() {}

func (f *implicitFMAFunctionFact) String() string {
	return fmt.Sprintf(
		"returnsMultiply=%t receiverReturnsMultiply=%t receiverCausesFMA=%t parameterReturnsMultiply=%v parameterCausesFMA=%v",
		f.ReturnsMultiply,
		f.ReceiverReturnsMultiply,
		f.ReceiverCausesFMA,
		f.ParameterReturnsMultiply,
		f.ParameterCausesFMA,
	)
}

func (f *implicitFMAPass) run() (any, error) {
	f.inspect = f.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)
	f.cfgs = f.pass.ResultOf[ctrlflow.Analyzer].(*ctrlflow.CFGs)
	f.reported = make(map[token.Pos]bool)
	f.selectReceiveAssignments = make(map[*ast.AssignStmt]bool)
	f.functions = make(map[*types.Func]*ast.FuncDecl)
	f.functionSummaries = make(map[*types.Func]implicitFMAFunctionSummary)

	for cursor := range f.inspect.Root().Preorder(
		(*ast.CommClause)(nil),
		(*ast.FuncDecl)(nil),
	) {
		switch node := cursor.Node().(type) {
		case *ast.CommClause:
			if assignment, ok := node.Comm.(*ast.AssignStmt); ok {
				f.selectReceiveAssignments[assignment] = true
			}
		case *ast.FuncDecl:
			if function, ok := f.pass.TypesInfo.Defs[node.Name].(*types.Func); ok {
				f.functions[function] = node
			}
		}
	}

	f.computeFunctionSummaries(make(implicitFMAState))

	packageState := make(implicitFMAState)
	for _, initializer := range f.pass.TypesInfo.InitOrder {
		value := f.evaluate(initializer.Rhs, packageState)
		for _, variable := range initializer.Lhs {
			f.setObjectState(variable, len(initializer.Lhs) == 1 && value, packageState)
		}
	}
	f.computeFunctionSummaries(packageState)
	for function, summary := range f.functionSummaries {
		if function.Exported() {
			fact := implicitFMAFunctionFact{
				ReturnsMultiply:          summary.returnsMultiply,
				ReceiverReturnsMultiply:  summary.receiverReturnsMultiply,
				ReceiverCausesFMA:        summary.receiverCausesFMA,
				ParameterReturnsMultiply: summary.parameterReturnsMultiply,
				ParameterCausesFMA:       summary.parameterCausesFMA,
			}
			f.pass.ExportObjectFact(function, &fact)
		}
	}

	for cursor := range f.inspect.Root().Preorder(
		(*ast.FuncDecl)(nil),
		(*ast.FuncLit)(nil),
	) {
		switch node := cursor.Node().(type) {
		case *ast.FuncDecl:
			if node.Body != nil {
				f.analyze(f.cfgs.FuncDecl(node), packageState)
			}
		case *ast.FuncLit:
			f.analyze(f.cfgs.FuncLit(node), packageState)
		}
	}

	return nil, nil
}

func (f *implicitFMAPass) computeFunctionSummaries(initialState implicitFMAState) {
	previousSuppressReports := f.suppressReports
	f.suppressReports = true
	defer func() {
		f.suppressReports = previousSuppressReports
	}()

	changed := true
	for changed {
		changed = false
		for function, declaration := range f.functions {
			if declaration.Body == nil {
				continue
			}
			summary := f.summarizeFunction(function, declaration, initialState)
			if !equalImplicitFMAFunctionSummary(summary, f.functionSummaries[function]) {
				f.functionSummaries[function] = summary
				changed = true
			}
		}
	}
}

func (f *implicitFMAPass) summarizeFunction(function *types.Func, declaration *ast.FuncDecl, initialState implicitFMAState) implicitFMAFunctionSummary {
	graph := f.cfgs.FuncDecl(declaration)
	returnsMultiply, foundFMA := f.analyze(graph, initialState)
	signature := function.Type().(*types.Signature)
	parameterCount := signature.Params().Len()
	summary := implicitFMAFunctionSummary{
		returnsMultiply:          returnsMultiply,
		parameterReturnsMultiply: make([]bool, parameterCount),
		parameterCausesFMA:       make([]bool, parameterCount),
	}
	if receiver := signature.Recv(); receiver != nil {
		state := cloneImplicitFMAState(initialState)
		f.setObjectState(receiver, true, state)
		receiverReturnsMultiply, receiverFoundFMA := f.analyze(graph, state)
		summary.receiverReturnsMultiply = receiverReturnsMultiply
		summary.receiverCausesFMA = receiverFoundFMA && !foundFMA
	}
	for i := range parameterCount {
		state := cloneImplicitFMAState(initialState)
		f.setObjectState(signature.Params().At(i), true, state)
		parameterReturnsMultiply, parameterFoundFMA := f.analyze(graph, state)
		summary.parameterReturnsMultiply[i] = parameterReturnsMultiply
		summary.parameterCausesFMA[i] = parameterFoundFMA && !foundFMA
	}
	return summary
}

func equalImplicitFMAFunctionSummary(left, right implicitFMAFunctionSummary) bool {
	return left.returnsMultiply == right.returnsMultiply &&
		left.receiverReturnsMultiply == right.receiverReturnsMultiply &&
		left.receiverCausesFMA == right.receiverCausesFMA &&
		slices.Equal(left.parameterReturnsMultiply, right.parameterReturnsMultiply) &&
		slices.Equal(left.parameterCausesFMA, right.parameterCausesFMA)
}

func (f *implicitFMAPass) analyze(graph *cfg.CFG, initialState implicitFMAState) (returnedMultiply bool, foundFMA bool) {
	if graph == nil {
		return false, false
	}

	previousReturnedMultiply := f.returnedMultiply
	previousFoundFMA := f.foundFMA
	f.returnedMultiply = false
	f.foundFMA = false
	defer func() {
		f.returnedMultiply = previousReturnedMultiply
		f.foundFMA = previousFoundFMA
	}()

	in := make([]implicitFMAState, len(graph.Blocks))
	initialized := make([]bool, len(graph.Blocks))
	queued := make([]bool, len(graph.Blocks))
	queue := []*cfg.Block{graph.Blocks[0]}
	in[0] = cloneImplicitFMAState(initialState)
	initialized[0] = true
	queued[0] = true

	for len(queue) > 0 {
		block := queue[0]
		queue = queue[1:]
		queued[block.Index] = false

		state := cloneImplicitFMAState(in[block.Index])
		f.applySelectedReceive(block, state)
		for _, node := range block.Nodes {
			f.transfer(node, state)
		}

		for successorIndex, successor := range block.Succs {
			successorState := state
			if block.Kind == cfg.KindRangeLoop && successorIndex == 0 {
				successorState = cloneImplicitFMAState(state)
				f.applyRangeAssignment(block, successorState)
			}

			changed := false
			if !initialized[successor.Index] {
				in[successor.Index] = cloneImplicitFMAState(successorState)
				initialized[successor.Index] = true
				changed = true
			} else {
				changed = mergeImplicitFMAState(in[successor.Index], successorState)
			}
			if changed && !queued[successor.Index] {
				queue = append(queue, successor)
				queued[successor.Index] = true
			}
		}
	}
	return f.returnedMultiply, f.foundFMA
}

func (f *implicitFMAPass) applyRangeAssignment(block *cfg.Block, state implicitFMAState) {
	statement := block.Stmt.(*ast.RangeStmt)
	if statement.Key != nil {
		f.setExpressionState(statement.Key, false, state)
	}
	if statement.Value != nil {
		f.setExpressionState(statement.Value, false, state)
	}
}

func (f *implicitFMAPass) applySelectedReceive(block *cfg.Block, state implicitFMAState) {
	if block.Kind != cfg.KindSelectCaseBody {
		return
	}
	clause := block.Stmt.(*ast.CommClause)
	assignment, ok := clause.Comm.(*ast.AssignStmt)
	if !ok {
		return
	}
	for _, left := range assignment.Lhs {
		if _, ok := left.(*ast.Ident); !ok {
			f.evaluate(left, state)
		}
		f.setExpressionState(left, false, state)
	}
}

func (f *implicitFMAPass) transfer(node ast.Node, state implicitFMAState) {
	switch node := node.(type) {
	case *ast.AssignStmt:
		f.transferAssignment(node, state)
	case *ast.DeferStmt:
		f.evaluate(node.Call, state)
	case ast.Expr:
		f.evaluate(node, state)
	case *ast.ExprStmt:
		f.evaluate(node.X, state)
	case *ast.GoStmt:
		f.evaluate(node.Call, state)
	case *ast.IncDecStmt:
		if f.evaluate(node.X, state) && isFloatingPointType(f.pass.TypesInfo.TypeOf(node.X)) {
			f.report(node)
		}
		f.setExpressionState(node.X, false, state)
	case *ast.ReturnStmt:
		for _, result := range node.Results {
			f.returnedMultiply = f.evaluate(result, state) || f.returnedMultiply
		}
	case *ast.SendStmt:
		f.evaluate(node.Chan, state)
		f.evaluate(node.Value, state)
	case *ast.ValueSpec:
		values := make([]bool, len(node.Values))
		for i, value := range node.Values {
			values[i] = f.evaluate(value, state)
		}
		for i, name := range node.Names {
			value := len(values) == len(node.Names) && values[i]
			f.setObjectState(f.pass.TypesInfo.Defs[name], value, state)
		}
	}
}

func (f *implicitFMAPass) transferAssignment(statement *ast.AssignStmt, state implicitFMAState) {
	right := make([]bool, len(statement.Rhs))
	for i, expression := range statement.Rhs {
		right[i] = f.evaluate(expression, state)
	}
	if f.selectReceiveAssignments[statement] {
		return
	}
	for _, expression := range statement.Lhs {
		if _, ok := expression.(*ast.Ident); !ok {
			f.evaluate(expression, state)
		}
	}

	if len(statement.Lhs) == 1 && len(right) == 1 {
		left := statement.Lhs[0]
		switch statement.Tok {
		case token.ADD_ASSIGN, token.SUB_ASSIGN:
			if isFloatingPointType(f.pass.TypesInfo.TypeOf(left)) && (f.evaluate(left, state) || right[0]) {
				f.report(statement)
			}
			f.setExpressionState(left, false, state)
			return
		case token.MUL_ASSIGN:
			f.setExpressionState(left, isFloatingPointType(f.pass.TypesInfo.TypeOf(left)), state)
			return
		case token.ASSIGN, token.DEFINE:
			f.setExpressionState(left, right[0], state)
			return
		default:
			f.setExpressionState(left, false, state)
			return
		}
	}

	for _, left := range statement.Lhs {
		f.setExpressionState(left, false, state)
	}
	if len(statement.Lhs) == len(right) {
		for i, left := range statement.Lhs {
			f.setExpressionState(left, right[i], state)
		}
	}
}

func (f *implicitFMAPass) evaluate(expression ast.Expr, state implicitFMAState) bool {
	switch expression := expression.(type) {
	case *ast.BinaryExpr:
		left := f.evaluate(expression.X, state)
		right := f.evaluate(expression.Y, state)
		typeAndValue := f.pass.TypesInfo.Types[expression]
		switch expression.Op {
		case token.ADD, token.SUB:
			if typeAndValue.Value == nil && isFloatingPointType(typeAndValue.Type) && (left || right) {
				f.report(expression)
			}
			return false
		case token.MUL:
			return typeAndValue.Value == nil && isFloatingPointType(typeAndValue.Type)
		default:
			return false
		}

	case *ast.CallExpr:
		receiver := f.evaluate(expression.Fun, state)
		arguments := make([]bool, len(expression.Args))
		for i, argument := range expression.Args {
			arguments[i] = f.evaluate(argument, state)
		}
		if functionLiteral, ok := expression.Fun.(*ast.FuncLit); ok {
			returnedMultiply, foundFMA := f.analyze(f.cfgs.FuncLit(functionLiteral), state)
			f.foundFMA = f.foundFMA || foundFMA
			return returnedMultiply
		}
		if function := typeutil.StaticCallee(f.pass.TypesInfo, expression); function != nil {
			summary, ok := f.functionSummaries[function]
			if !ok && sameModuleFamily(f.pass.Pkg, function.Pkg()) {
				var fact implicitFMAFunctionFact
				if f.pass.ImportObjectFact(function, &fact) {
					summary = implicitFMAFunctionSummary{
						returnsMultiply:          fact.ReturnsMultiply,
						receiverReturnsMultiply:  fact.ReceiverReturnsMultiply,
						receiverCausesFMA:        fact.ReceiverCausesFMA,
						parameterReturnsMultiply: fact.ParameterReturnsMultiply,
						parameterCausesFMA:       fact.ParameterCausesFMA,
					}
					ok = true
				}
			}
			if ok {
				returnsMultiply := summary.returnsMultiply
				if receiver && summary.receiverCausesFMA {
					f.report(expression)
				}
				if receiver && summary.receiverReturnsMultiply {
					returnsMultiply = true
				}
				for i, argument := range arguments {
					if i < len(summary.parameterCausesFMA) && argument && summary.parameterCausesFMA[i] {
						f.report(expression)
					}
					if i < len(summary.parameterReturnsMultiply) && argument && summary.parameterReturnsMultiply[i] {
						returnsMultiply = true
					}
				}
				return returnsMultiply
			}
		}
		return false

	case *ast.CompositeLit:
		unrounded := false
		for _, element := range expression.Elts {
			switch element := element.(type) {
			case *ast.KeyValueExpr:
				f.evaluate(element.Key, state)
				unrounded = f.evaluate(element.Value, state) || unrounded
			case ast.Expr:
				unrounded = f.evaluate(element, state) || unrounded
			}
		}
		return unrounded

	case *ast.Ident:
		location, ok := f.location(expression)
		return ok && state[location]

	case *ast.IndexExpr:
		container := f.evaluate(expression.X, state)
		f.evaluate(expression.Index, state)
		location, ok := f.location(expression)
		return container || ok && state[location]

	case *ast.ParenExpr:
		return f.evaluate(expression.X, state)

	case *ast.SelectorExpr:
		container := f.evaluate(expression.X, state)
		location, ok := f.location(expression)
		return container || ok && state[location]

	case *ast.StarExpr:
		container := f.evaluate(expression.X, state)
		location, ok := f.location(expression)
		return container || ok && state[location]

	case *ast.UnaryExpr:
		value := f.evaluate(expression.X, state)
		return value && (expression.Op == token.ADD || expression.Op == token.SUB)

	case *ast.FuncLit:
		return false

	default:
		ast.Inspect(expression, func(node ast.Node) bool {
			if node == expression {
				return true
			}
			if child, ok := node.(ast.Expr); ok {
				f.evaluate(child, state)
				return false
			}
			return true
		})
		return false
	}
}

func (f *implicitFMAPass) setExpressionState(expression ast.Expr, value bool, state implicitFMAState) {
	location, ok := f.location(expression)
	if !ok {
		return
	}
	f.setLocationState(location, value, state)
}

func (f *implicitFMAPass) setObjectState(object types.Object, value bool, state implicitFMAState) {
	if object == nil {
		return
	}
	f.setLocationState(implicitFMALocation{object: object}, value, state)
}

func (f *implicitFMAPass) setLocationState(location implicitFMALocation, value bool, state implicitFMAState) {
	if value {
		state[location] = true
	} else {
		delete(state, location)
	}
}

func (f *implicitFMAPass) location(expression ast.Expr) (implicitFMALocation, bool) {
	switch expression := expression.(type) {
	case *ast.Ident:
		object := f.pass.TypesInfo.Defs[expression]
		if object == nil {
			object = f.pass.TypesInfo.Uses[expression]
		}
		return implicitFMALocation{object: object}, object != nil

	case *ast.IndexExpr:
		location, ok := f.location(expression.X)
		if !ok {
			return implicitFMALocation{}, false
		}
		location.path += "[]"
		return location, true

	case *ast.ParenExpr:
		return f.location(expression.X)

	case *ast.SelectorExpr:
		selection := f.pass.TypesInfo.Selections[expression]
		if selection == nil {
			return implicitFMALocation{}, false
		}
		location, ok := f.location(expression.X)
		if !ok {
			return implicitFMALocation{}, false
		}
		field := selection.Obj()
		location.path += "." + field.Name() + ":" + strconv.Itoa(int(field.Pos()))
		return location, true

	case *ast.StarExpr:
		location, ok := f.location(expression.X)
		if !ok {
			return implicitFMALocation{}, false
		}
		location.path += "*"
		return location, true

	default:
		return implicitFMALocation{}, false
	}
}

func (f *implicitFMAPass) report(node ast.Node) {
	f.foundFMA = true
	if f.suppressReports {
		return
	}
	if f.reported[node.Pos()] {
		return
	}
	f.reported[node.Pos()] = true
	f.pass.ReportRangef(node, "explicitly round the floating-point multiplication result to prevent implicit FMA")
}

func cloneImplicitFMAState(state implicitFMAState) implicitFMAState {
	clone := make(implicitFMAState, len(state))
	maps.Copy(clone, state)
	return clone
}

func mergeImplicitFMAState(into implicitFMAState, from implicitFMAState) bool {
	changed := false
	for object := range from {
		if !into[object] {
			into[object] = true
			changed = true
		}
	}
	return changed
}

func sameModuleFamily(left, right *types.Package) bool {
	if left == nil || right == nil {
		return false
	}
	return moduleFamily(left.Path()) == moduleFamily(right.Path())
}

func moduleFamily(packagePath string) string {
	parts := strings.Split(packagePath, "/")
	if len(parts) >= 3 && strings.Contains(parts[0], ".") {
		return strings.Join(parts[:3], "/")
	}
	return parts[0]
}

func isFloatingPointType(t types.Type) bool {
	t = types.Unalias(t)
	if t == nil {
		return false
	}

	switch t := t.Underlying().(type) {
	case *types.Basic:
		return t.Info()&types.IsFloat != 0
	case *types.Interface:
		for embedded := range t.EmbeddedTypes() {
			if isFloatingPointType(embedded) {
				return true
			}
		}
		return false
	case *types.Union:
		for term := range t.Terms() {
			if isFloatingPointType(term.Type()) {
				return true
			}
		}
		return false
	default:
		return false
	}
}
