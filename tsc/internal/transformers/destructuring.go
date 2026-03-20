package transformers

import (
	"slices"
	"strconv"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

// FlattenLevel controls how deeply binding/assignment patterns are decomposed.
type FlattenLevel int

const (
	FlattenLevelAll        FlattenLevel = iota // Fully decompose all patterns into individual assignments/bindings
	FlattenLevelObjectRest                     // Only decompose patterns containing object rest elements
)

// CreateAssignmentCallback is a callback used to create custom assignment expressions during destructuring flattening.
// When provided, the target will always be an Identifier, and the callback can wrap the assignment with additional logic
// (e.g., export expressions in CJS modules or namespace member assignments).
type CreateAssignmentCallback func(name *ast.IdentifierNode, value *ast.Expression, location *core.TextRange) *ast.Expression

// FlattenDestructuringAssignment flattens a destructuring assignment expression into a sequence of
// individual property/element access assignments. Supports custom assignment callbacks for module
// export or namespace member expressions.
func FlattenDestructuringAssignment(
	tx *Transformer,
	node *ast.Node, // VariableDeclaration | DestructuringAssignment
	needsValue bool,
	level FlattenLevel,
	createAssignmentCallback CreateAssignmentCallback,
) *ast.Expression {
	f := newFlattener(tx, level)
	f.createAssignmentCallback = createAssignmentCallback
	f.hoistTempVariables = true
	// Assignment mode callbacks
	f.emitBindingOrAssignment = (*flattener).emitAssignment
	f.createArrayBindingOrAssignmentPattern = (*flattener).createArrayAssignmentPattern
	f.createObjectBindingOrAssignmentPattern = (*flattener).createObjectAssignmentPattern
	f.createArrayBindingOrAssignmentElement = (*flattener).createArrayAssignmentElement
	return f.flattenDestructuringAssignment(node, needsValue)
}

// pendingDecl tracks a pending variable declaration during binding flattening.
type pendingDecl struct {
	pendingExpressions []*ast.Node
	name               *ast.Node
	value              *ast.Node
	location           core.TextRange
	original           *ast.Node
}

// FlattenDestructuringBinding flattens a binding pattern in a variable declaration or parameter
// into individual variable declarations. Returns a single VariableDeclaration, a SyntaxList of
// declarations, or nil.
func FlattenDestructuringBinding(
	tx *Transformer,
	node *ast.Node, // VariableDeclaration | ParameterDeclaration | BindingElement
	rval *ast.Node,
	level FlattenLevel,
	hoistTempVariables bool,
	skipInitializer bool,
) *ast.Node {
	f := newFlattener(tx, level)
	f.hoistTempVariables = hoistTempVariables
	// Binding mode callbacks
	f.emitBindingOrAssignment = (*flattener).emitBinding
	f.createArrayBindingOrAssignmentPattern = (*flattener).createArrayBindingPattern
	f.createObjectBindingOrAssignmentPattern = (*flattener).createObjectBindingPattern
	f.createArrayBindingOrAssignmentElement = (*flattener).createArrayBindingElement
	return f.flattenDestructuringBinding(node, rval, skipInitializer)
}

// flattener encapsulates the state and logic for flattening destructuring patterns.
// It is equivalent to TypeScript's FlattenContext in destructuring.ts.
type flattener struct {
	tx    *Transformer
	level FlattenLevel

	createAssignmentCallback CreateAssignmentCallback

	// State
	expressions                []*ast.Node
	declarations               []pendingDecl
	hasTransformedPriorElement bool
	hoistTempVariables         bool

	// Mode callbacks (set by FlattenDestructuringAssignment or FlattenDestructuringBinding)
	emitBindingOrAssignment                func(f *flattener, target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node)
	createArrayBindingOrAssignmentPattern  func(f *flattener, elements []*ast.Node) *ast.Node
	createObjectBindingOrAssignmentPattern func(f *flattener, elements []*ast.Node) *ast.Node
	createArrayBindingOrAssignmentElement  func(f *flattener, expr *ast.Node) *ast.Node
}

func newFlattener(tx *Transformer, level FlattenLevel) *flattener {
	return &flattener{
		tx:    tx,
		level: level,
	}
}

// --- Assignment mode callbacks ---

func (f *flattener) createArrayAssignmentPattern(elements []*ast.Node) *ast.Node {
	return f.tx.Factory().NewArrayLiteralExpression(f.tx.Factory().NewNodeList(elements), false)
}

func (f *flattener) createObjectAssignmentPattern(elements []*ast.Node) *ast.Node {
	return f.tx.Factory().NewObjectLiteralExpression(f.tx.Factory().NewNodeList(elements), false)
}

func (f *flattener) createArrayAssignmentElement(expr *ast.Node) *ast.Node {
	return expr
}

func (f *flattener) emitAssignment(target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node) {
	var expression *ast.Expression
	if f.createAssignmentCallback != nil && ast.IsIdentifier(target) {
		expression = f.createAssignmentCallback(target, value, &location)
	} else {
		expression = f.tx.Factory().NewAssignmentExpression(f.tx.Visitor().VisitNode(target), value)
		expression.Loc = location
	}
	f.tx.EmitContext().SetOriginal(expression, original)
	f.emitExpression(expression)
}

// --- Binding mode callbacks ---

func (f *flattener) createArrayBindingPattern(elements []*ast.Node) *ast.Node {
	return f.tx.Factory().NewBindingPattern(ast.KindArrayBindingPattern, f.tx.Factory().NewNodeList(elements))
}

func (f *flattener) createObjectBindingPattern(elements []*ast.Node) *ast.Node {
	return f.tx.Factory().NewBindingPattern(ast.KindObjectBindingPattern, f.tx.Factory().NewNodeList(elements))
}

func (f *flattener) createArrayBindingElement(expr *ast.Node) *ast.Node {
	return f.tx.Factory().NewBindingElement(nil, nil, expr, nil)
}

func (f *flattener) emitBinding(target *ast.Node, value *ast.Node, location core.TextRange, original *ast.Node) {
	if len(f.expressions) > 0 {
		value = f.tx.Factory().InlineExpressions(append(f.expressions, value))
		f.expressions = nil
	}
	f.declarations = append(f.declarations, pendingDecl{
		name:     target,
		value:    value,
		location: location,
		original: original,
	})
}

// --- Shared helpers ---

func (f *flattener) emitExpression(expr *ast.Node) {
	f.expressions = append(f.expressions, expr)
}

func (f *flattener) ensureIdentifier(value *ast.Node, reuseIdentifierExpressions bool, location core.TextRange) *ast.Node {
	if reuseIdentifierExpressions && ast.IsIdentifier(value) {
		return value
	}
	temp := f.tx.Factory().NewTempVariable()
	if f.hoistTempVariables {
		f.tx.EmitContext().AddVariableDeclaration(temp)
		assign := f.tx.Factory().NewAssignmentExpression(temp, value)
		assign.Loc = location
		f.emitExpression(assign)
	} else {
		f.emitBindingOrAssignment(f, temp, value, location, nil)
	}
	return temp
}

func (f *flattener) createDefaultValueCheck(value *ast.Expression, defaultValue *ast.Expression, location core.TextRange) *ast.Node {
	value = f.ensureIdentifier(value, true, location)
	return f.tx.Factory().NewConditionalExpression(
		f.tx.Factory().NewTypeCheck(value, "undefined"),
		f.tx.Factory().NewToken(ast.KindQuestionToken),
		defaultValue,
		f.tx.Factory().NewToken(ast.KindColonToken),
		value,
	)
}

func (f *flattener) createDestructuringPropertyAccess(value *ast.Node, propertyName *ast.Node) *ast.Node {
	if ast.IsComputedPropertyName(propertyName) {
		argumentExpression := f.ensureIdentifier(f.tx.Visitor().VisitNode(propertyName.Expression()), false, propertyName.Loc)
		return f.tx.Factory().NewElementAccessExpression(value, nil, argumentExpression, ast.NodeFlagsNone)
	} else if ast.IsStringOrNumericLiteralLike(propertyName) || ast.IsBigIntLiteral(propertyName) {
		argumentExpression := propertyName.Clone(f.tx.Factory())
		return f.tx.Factory().NewElementAccessExpression(value, nil, argumentExpression, ast.NodeFlagsNone)
	} else {
		name := f.tx.Factory().NewIdentifier(propertyName.Text())
		return f.tx.Factory().NewPropertyAccessExpression(value, nil, name, ast.NodeFlagsNone)
	}
}

// --- Entry points ---

func (f *flattener) flattenDestructuringAssignment(node *ast.Node, needsValue bool) *ast.Expression {
	location := node.Loc
	var value *ast.Node
	if ast.IsDestructuringAssignment(node) {
		value = node.AsBinaryExpression().Right
		for ast.IsEmptyArrayLiteral(node.AsBinaryExpression().Left) || ast.IsEmptyObjectLiteral(node.AsBinaryExpression().Left) {
			if ast.IsDestructuringAssignment(value) {
				node = value
				location = node.Loc
				value = node.AsBinaryExpression().Right
			} else {
				return f.tx.Visitor().VisitNode(value)
			}
		}
	}

	if value != nil {
		value = f.tx.Visitor().VisitNode(value)
		if ast.IsIdentifier(value) && BindingOrAssignmentElementAssignsToName(node, value.Text()) || BindingOrAssignmentElementContainsNonLiteralComputedName(node) {
			value = f.ensureIdentifier(value, false, location)
		} else if needsValue {
			value = f.ensureIdentifier(value, true, location)
		} else if ast.NodeIsSynthesized(node) {
			location = value.Loc
		}
	}

	f.flattenBindingOrAssignmentElement(node, value, location, ast.IsDestructuringAssignment(node))

	if value != nil && needsValue {
		if len(f.expressions) == 0 {
			return value
		}
		f.expressions = append(f.expressions, value)
	}

	res := f.tx.Factory().InlineExpressions(f.expressions)
	if res != nil {
		return res
	}
	return f.tx.Factory().NewOmittedExpression()
}

func (f *flattener) flattenDestructuringBinding(node *ast.Node, rval *ast.Node, skipInitializer bool) *ast.Node {
	if ast.IsVariableDeclaration(node) {
		initializer := GetInitializerOfBindingOrAssignmentElement(node)
		if initializer != nil && (ast.IsIdentifier(initializer) && BindingOrAssignmentElementAssignsToName(node, initializer.Text()) || BindingOrAssignmentElementContainsNonLiteralComputedName(node)) {
			initializer = f.ensureIdentifier(f.tx.Visitor().VisitNode(initializer), false, initializer.Loc)
			node = f.tx.Factory().UpdateVariableDeclaration(node.AsVariableDeclaration(), node.Name(), nil, nil, initializer)
		}
	}

	f.flattenBindingOrAssignmentElement(node, rval, node.Loc, skipInitializer)

	if len(f.expressions) > 0 {
		temp := f.tx.Factory().NewTempVariable()
		f.tx.EmitContext().AddVariableDeclaration(temp)
		last := &f.declarations[len(f.declarations)-1]
		last.pendingExpressions = append(last.pendingExpressions, f.tx.Factory().NewAssignmentExpression(temp, last.value))
		last.pendingExpressions = append(last.pendingExpressions, f.expressions...)
		last.value = temp
	}

	decls := make([]*ast.Node, 0, len(f.declarations))
	for _, pending := range f.declarations {
		expr := pending.value
		if len(pending.pendingExpressions) > 0 {
			expr = f.tx.Factory().InlineExpressions(append(pending.pendingExpressions, pending.value))
		}
		decl := f.tx.Factory().NewVariableDeclaration(pending.name, nil, nil, expr)
		decl.Loc = pending.location
		if pending.original != nil {
			f.tx.EmitContext().SetOriginal(decl, pending.original)
		}
		decls = append(decls, decl)
	}

	if len(decls) == 1 {
		return decls[0]
	}
	if len(decls) == 0 {
		return nil
	}
	return f.tx.Factory().NewSyntaxList(decls)
}

// --- Core flattening ---

func (f *flattener) flattenBindingOrAssignmentElement(element *ast.Node, value *ast.Node, location core.TextRange, skipInitializer bool) {
	bindingTarget := ast.GetTargetOfBindingOrAssignmentElement(element)
	if bindingTarget == nil {
		return
	}
	if !skipInitializer {
		initializer := f.tx.Visitor().VisitNode(GetInitializerOfBindingOrAssignmentElement(element))
		if initializer != nil {
			if value != nil {
				value = f.createDefaultValueCheck(value, initializer, location)
				if !IsSimpleCopiableExpression(initializer) && (ast.IsBindingPattern(bindingTarget) || ast.IsAssignmentPattern(bindingTarget)) {
					value = f.ensureIdentifier(value, true, location)
				}
			} else {
				value = initializer
			}
		} else if value == nil {
			value = f.tx.Factory().NewVoidZeroExpression()
		}
	}

	if isObjectBindingOrAssignmentPattern(bindingTarget) {
		f.flattenObjectBindingOrAssignmentPattern(element, bindingTarget, value, location)
	} else if isArrayBindingOrAssignmentPattern(bindingTarget) {
		f.flattenArrayBindingOrAssignmentPattern(element, bindingTarget, value, location)
	} else {
		f.emitBindingOrAssignment(f, bindingTarget, value, location, element)
	}
}

func (f *flattener) flattenObjectBindingOrAssignmentPattern(parent *ast.Node, pattern *ast.Node, value *ast.Node, location core.TextRange) {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	numElements := len(elements)
	if numElements != 1 {
		reuseIdentifierExpressions := !ast.IsDeclarationBindingElement(parent) || numElements != 0
		value = f.ensureIdentifier(value, reuseIdentifierExpressions, location)
	}
	var bindingElements []*ast.Node
	var computedTempVariables []*ast.Node
	for i, element := range elements {
		if ast.GetRestIndicatorOfBindingOrAssignmentElement(element) == nil {
			propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
			if f.level >= FlattenLevelObjectRest &&
				element.SubtreeFacts()&(ast.SubtreeContainsRestOrSpread|ast.SubtreeContainsObjectRestOrSpread) == 0 &&
				ast.GetTargetOfBindingOrAssignmentElement(element).SubtreeFacts()&(ast.SubtreeContainsRestOrSpread|ast.SubtreeContainsObjectRestOrSpread) == 0 &&
				!ast.IsComputedPropertyName(propertyName) {
				bindingElements = append(bindingElements, f.tx.Visitor().VisitNode(element))
			} else {
				if len(bindingElements) > 0 {
					f.emitBindingOrAssignment(f, f.createObjectBindingOrAssignmentPattern(f, bindingElements), value, location, pattern)
					bindingElements = nil
				}
				rhsValue := f.createDestructuringPropertyAccess(value, propertyName)
				if ast.IsComputedPropertyName(propertyName) {
					computedTempVariables = append(computedTempVariables, rhsValue.AsElementAccessExpression().ArgumentExpression)
				}
				f.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
			}
		} else if i == numElements-1 {
			if len(bindingElements) > 0 {
				f.emitBindingOrAssignment(f, f.createObjectBindingOrAssignmentPattern(f, bindingElements), value, location, pattern)
				bindingElements = nil
			}
			rhsValue := f.tx.Factory().NewRestHelper(value, elements, computedTempVariables, pattern.Loc)
			f.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		}
	}
	if len(bindingElements) > 0 {
		f.emitBindingOrAssignment(f, f.createObjectBindingOrAssignmentPattern(f, bindingElements), value, location, pattern)
	}
}

type restIdElemPair struct {
	id      *ast.Node
	element *ast.Node
}

func (f *flattener) flattenArrayBindingOrAssignmentPattern(parent *ast.Node, pattern *ast.Node, value *ast.Node, location core.TextRange) {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	numElements := len(elements)
	if numElements != 1 && (f.level < FlattenLevelObjectRest || numElements == 0) || core.Every(elements, ast.IsOmittedExpression) {
		reuseIdentifierExpressions := !ast.IsDeclarationBindingElement(parent) || numElements != 0
		value = f.ensureIdentifier(value, reuseIdentifierExpressions, location)
	}
	var bindingElements []*ast.Node
	var restContainingElements []restIdElemPair
	for i, element := range elements {
		if f.level >= FlattenLevelObjectRest {
			if element.SubtreeFacts()&ast.SubtreeContainsObjectRestOrSpread != 0 || f.hasTransformedPriorElement && !isSimpleBindingOrAssignmentElement(element) {
				f.hasTransformedPriorElement = true
				temp := f.tx.Factory().NewTempVariable()
				if f.hoistTempVariables {
					f.tx.EmitContext().AddVariableDeclaration(temp)
				}
				restContainingElements = append(restContainingElements, restIdElemPair{temp, element})
				bindingElements = append(bindingElements, f.createArrayBindingOrAssignmentElement(f, temp))
			} else {
				bindingElements = append(bindingElements, element)
			}
		} else if ast.IsOmittedExpression(element) {
			continue
		} else if ast.GetRestIndicatorOfBindingOrAssignmentElement(element) == nil {
			rhsValue := f.tx.Factory().NewElementAccessExpression(value, nil, f.tx.Factory().NewNumericLiteral(strconv.Itoa(i), ast.TokenFlagsNone), ast.NodeFlagsNone)
			f.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		} else if i == numElements-1 {
			rhsValue := f.tx.Factory().NewArraySliceCall(value, i)
			f.flattenBindingOrAssignmentElement(element, rhsValue, element.Loc, false)
		}
	}
	if len(bindingElements) > 0 {
		f.emitBindingOrAssignment(f, f.createArrayBindingOrAssignmentPattern(f, bindingElements), value, location, pattern)
	}
	if len(restContainingElements) > 0 {
		for _, pair := range restContainingElements {
			f.flattenBindingOrAssignmentElement(pair.element, pair.id, pair.element.Loc, false)
		}
	}
}

// --- Exported helper functions ---

// BindingOrAssignmentElementAssignsToName checks if any target in a binding/assignment pattern assigns to the given name.
func BindingOrAssignmentElementAssignsToName(element *ast.Node, name string) bool {
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	if target == nil {
		return false
	}
	if ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target) {
		return bindingOrAssignmentPatternAssignsToName(target, name)
	} else if ast.IsIdentifier(target) {
		return target.Text() == name
	}
	return false
}

func bindingOrAssignmentPatternAssignsToName(pattern *ast.Node, name string) bool {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	for _, element := range elements {
		if BindingOrAssignmentElementAssignsToName(element, name) {
			return true
		}
	}
	return false
}

// BindingOrAssignmentElementContainsNonLiteralComputedName checks if any element has a non-literal computed property name.
func BindingOrAssignmentElementContainsNonLiteralComputedName(element *ast.Node) bool {
	propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
	if propertyName != nil && ast.IsComputedPropertyName(propertyName) && !ast.IsLiteralExpression(propertyName.Expression()) {
		return true
	}
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	return target != nil && (ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target)) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target)
}

func bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern *ast.Node) bool {
	elements := ast.GetElementsOfBindingOrAssignmentPattern(pattern)
	return slices.ContainsFunc(elements, BindingOrAssignmentElementContainsNonLiteralComputedName)
}

// GetInitializerOfBindingOrAssignmentElement returns the initializer/default value of a binding or assignment element.
func GetInitializerOfBindingOrAssignmentElement(bindingElement *ast.Node) *ast.Node {
	if bindingElement == nil {
		return nil
	}
	if ast.IsDeclarationBindingElement(bindingElement) {
		return bindingElement.Initializer()
	}
	if ast.IsPropertyAssignment(bindingElement) {
		initializer := bindingElement.Initializer()
		if ast.IsAssignmentExpression(initializer, true) {
			return initializer.AsBinaryExpression().Right
		}
		return nil
	}
	if ast.IsShorthandPropertyAssignment(bindingElement) {
		return bindingElement.AsShorthandPropertyAssignment().ObjectAssignmentInitializer
	}
	if ast.IsAssignmentExpression(bindingElement, true) {
		return bindingElement.AsBinaryExpression().Right
	}
	if ast.IsSpreadElement(bindingElement) {
		return GetInitializerOfBindingOrAssignmentElement(bindingElement.Expression())
	}
	return nil
}

func isObjectBindingOrAssignmentPattern(node *ast.Node) bool {
	return node != nil && (node.Kind == ast.KindObjectBindingPattern || node.Kind == ast.KindObjectLiteralExpression)
}

func isArrayBindingOrAssignmentPattern(node *ast.Node) bool {
	return node != nil && (node.Kind == ast.KindArrayBindingPattern || node.Kind == ast.KindArrayLiteralExpression)
}

func isSimpleBindingOrAssignmentElement(element *ast.Node) bool {
	target := ast.GetTargetOfBindingOrAssignmentElement(element)
	if target == nil || ast.IsOmittedExpression(target) {
		return true
	}
	propertyName := ast.TryGetPropertyNameOfBindingOrAssignmentElement(element)
	if propertyName != nil && !ast.IsPropertyNameLiteral(propertyName) {
		return false
	}
	initializer := GetInitializerOfBindingOrAssignmentElement(element)
	if initializer != nil && !IsSimpleInlineableExpression(initializer) {
		return false
	}
	if ast.IsBindingPattern(target) || ast.IsAssignmentPattern(target) {
		return core.Every(ast.GetElementsOfBindingOrAssignmentPattern(target), isSimpleBindingOrAssignmentElement)
	}
	return ast.IsIdentifier(target)
}
