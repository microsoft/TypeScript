package compiler

import (
	"slices"
	"strconv"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type FlowType struct {
	t          *Type
	incomplete bool
}

func (ft *FlowType) isNil() bool {
	return ft.t == nil
}

type SharedFlow struct {
	flow     *ast.FlowNode
	flowType FlowType
}

type FlowState struct {
	reference       *ast.Node
	declaredType    *Type
	initialType     *Type
	flowContainer   *ast.Node
	key             string
	depth           int
	sharedFlowStart int
}

func getFlowNodeOfNode(node *ast.Node) *ast.FlowNode {
	flowNodeData := node.FlowNodeData()
	if flowNodeData != nil {
		return flowNodeData.FlowNode
	}
	return nil
}

func (c *Checker) getFlowTypeOfReference(reference *ast.Node, declaredType *Type) *Type {
	return c.getFlowTypeOfReferenceEx(reference, declaredType, declaredType, nil /*flowContainer*/, getFlowNodeOfNode(reference))
}

func (c *Checker) getFlowTypeOfReferenceEx(reference *ast.Node, declaredType *Type, initialType *Type, flowContainer *ast.Node, flowNode *ast.FlowNode) *Type {
	if c.flowAnalysisDisabled {
		return c.errorType
	}
	if flowNode == nil {
		return declaredType
	}
	var f FlowState
	f.reference = reference
	f.declaredType = declaredType
	f.initialType = initialType
	f.flowContainer = flowContainer
	f.sharedFlowStart = len(c.sharedFlows)
	c.flowInvocationCount++
	evolvedType := c.getTypeAtFlowNode(&f, flowNode).t
	c.sharedFlows = c.sharedFlows[:f.sharedFlowStart]
	// When the reference is 'x' in an 'x.length', 'x.push(value)', 'x.unshift(value)' or x[n] = value' operation,
	// we give type 'any[]' to 'x' instead of using the type determined by control flow analysis such that operations
	// on empty arrays are possible without implicit any errors and new element types can be inferred without
	// type mismatch errors.
	var resultType *Type
	if evolvedType.objectFlags&ObjectFlagsEvolvingArray != 0 && c.isEvolvingArrayOperationTarget(reference) {
		resultType = c.autoArrayType
	} else {
		resultType = c.finalizeEvolvingArrayType(evolvedType)
	}
	if resultType == c.unreachableNeverType || reference.Parent != nil && ast.IsNonNullExpression(reference.Parent) && resultType.flags&TypeFlagsNever == 0 && c.getTypeWithFacts(resultType, TypeFactsNEUndefinedOrNull).flags&TypeFlagsNever != 0 {
		return declaredType
	}
	return resultType
}

func (c *Checker) getTypeAtFlowNode(f *FlowState, flow *ast.FlowNode) FlowType {
	if f.depth == 2000 {
		// We have made 2000 recursive invocations. To avoid overflowing the call stack we report an error
		// and disable further control flow analysis in the containing function or module body.
		c.flowAnalysisDisabled = true
		c.reportFlowControlError(f.reference)
		return FlowType{t: c.errorType}
	}
	f.depth++
	var sharedFlow *ast.FlowNode
	for {
		flags := flow.Flags
		if flags&ast.FlowFlagsShared != 0 {
			// We cache results of flow type resolution for shared nodes that were previously visited in
			// the same getFlowTypeOfReference invocation. A node is considered shared when it is the
			// antecedent of more than one node.
			for i := f.sharedFlowStart; i < len(c.sharedFlows); i++ {
				if c.sharedFlows[i].flow == flow {
					f.depth--
					return c.sharedFlows[i].flowType
				}
			}
			sharedFlow = flow
		}
		var t FlowType
		switch {
		case flags&ast.FlowFlagsAssignment != 0:
			t = c.getTypeAtFlowAssignment(f, flow)
			if t.isNil() {
				flow = flow.Antecedent
				continue
			}
		case flags&ast.FlowFlagsCall != 0:
			t = c.getTypeAtFlowCall(f, flow)
			if t.isNil() {
				flow = flow.Antecedent
				continue
			}
		case flags&ast.FlowFlagsCondition != 0:
			t = c.getTypeAtFlowCondition(f, flow)
		case flags&ast.FlowFlagsSwitchClause != 0:
			t = c.getTypeAtSwitchClause(f, flow)
		case flags&ast.FlowFlagsLabel != 0:
			if flow.Antecedents.Next == nil {
				flow = flow.Antecedents.Flow
				continue
			}
			if flags&ast.FlowFlagsBranchLabel != 0 {
				t = c.getTypeAtFlowBranchLabel(f, flow)
			} else {
				t = c.getTypeAtFlowLoopLabel(f, flow)
			}
		case flags&ast.FlowFlagsArrayMutation != 0:
			t = c.getTypeAtFlowArrayMutation(f, flow)
			if t.isNil() {
				flow = flow.Antecedent
				continue
			}
		case flags&ast.FlowFlagsReduceLabel != 0:
			data := flow.Node.AsFlowReduceLabelData()
			saveAntecedents := data.Target.Antecedents
			data.Target.Antecedents = data.Antecedents
			t = c.getTypeAtFlowNode(f, flow.Antecedent)
			data.Target.Antecedents = saveAntecedents
		case flags&ast.FlowFlagsStart != 0:
			// Check if we should continue with the control flow of the containing function.
			container := flow.Node
			if container != nil && container != f.flowContainer && !ast.IsPropertyAccessExpression(f.reference) && !ast.IsElementAccessExpression(f.reference) && !(f.reference.Kind == ast.KindThisKeyword && !ast.IsArrowFunction(container)) {
				flow = container.FlowNodeData().FlowNode
				continue
			}
			// At the top of the flow we have the initial type.
			t = FlowType{t: f.initialType}
		default:
			// Unreachable code errors are reported in the binding phase. Here we
			// simply return the non-auto declared type to reduce follow-on errors.
			t = FlowType{t: c.convertAutoToAny(f.declaredType)}
		}
		if sharedFlow != nil {
			// Record visited node and the associated type in the cache.
			c.sharedFlows = append(c.sharedFlows, SharedFlow{flow: sharedFlow, flowType: t})
		}
		f.depth--
		return t
	}
}

func (c *Checker) getTypeAtFlowAssignment(f *FlowState, flow *ast.FlowNode) FlowType {
	node := flow.Node
	// Assignments only narrow the computed type if the declared type is a union type. Thus, we
	// only need to evaluate the assigned type if the declared type is a union type.
	if c.isMatchingReference(f.reference, node) {
		if !c.isReachableFlowNode(flow) {
			return FlowType{t: c.unreachableNeverType}
		}
		if getAssignmentTargetKind(node) == AssignmentKindCompound {
			flowType := c.getTypeAtFlowNode(f, flow.Antecedent)
			return FlowType{t: c.getBaseTypeOfLiteralType(flowType.t), incomplete: flowType.incomplete}
		}
		if f.declaredType == c.autoType || f.declaredType == c.autoArrayType {
			if c.isEmptyArrayAssignment(node) {
				return FlowType{t: c.getEvolvingArrayType(c.neverType)}
			}
			assignedType := c.getWidenedLiteralType(c.getInitialOrAssignedType(f, flow))
			if c.isTypeAssignableTo(assignedType, f.declaredType) {
				return FlowType{t: assignedType}
			}
			return FlowType{t: c.anyArrayType}
		}
		t := f.declaredType
		if isInCompoundLikeAssignment(node) {
			t = c.getBaseTypeOfLiteralType(t)
		}
		if t.flags&TypeFlagsUnion != 0 {
			return FlowType{t: c.getAssignmentReducedType(t, c.getInitialOrAssignedType(f, flow))}
		}
		return FlowType{t: t}
	}
	// We didn't have a direct match. However, if the reference is a dotted name, this
	// may be an assignment to a left hand part of the reference. For example, for a
	// reference 'x.y.z', we may be at an assignment to 'x.y' or 'x'. In that case,
	// return the declared type.
	if c.containsMatchingReference(f.reference, node) {
		if !c.isReachableFlowNode(flow) {
			return FlowType{t: c.unreachableNeverType}
		}
		return FlowType{t: f.declaredType}
	}
	// for (const _ in ref) acts as a nonnull on ref
	if ast.IsVariableDeclaration(node) && ast.IsForInStatement(node.Parent.Parent) && (c.isMatchingReference(f.reference, node.Parent.Parent.Expression()) || c.optionalChainContainsReference(node.Parent.Parent.Expression(), f.reference)) {
		return FlowType{t: c.getNonNullableTypeIfNeeded(c.finalizeEvolvingArrayType(c.getTypeAtFlowNode(f, flow.Antecedent).t))}
	}
	// Assignment doesn't affect reference
	return FlowType{}
}

func (c *Checker) getInitialOrAssignedType(f *FlowState, flow *ast.FlowNode) *Type {
	if ast.IsVariableDeclaration(flow.Node) || ast.IsBindingElement(flow.Node) {
		return c.getNarrowableTypeForReference(c.getInitialType(flow.Node), f.reference, CheckModeNormal)
	}
	return c.getNarrowableTypeForReference(c.getAssignedType(flow.Node), f.reference, CheckModeNormal)
}

func (c *Checker) isEmptyArrayAssignment(node *ast.Node) bool {
	return ast.IsVariableDeclaration(node) && node.Initializer() != nil && isEmptyArrayLiteral(node.Initializer()) ||
		ast.IsBindingElement(node) && ast.IsBinaryExpression(node.Parent) && isEmptyArrayLiteral(node.Parent.AsBinaryExpression().Right)
}

func (c *Checker) getTypeAtFlowCall(f *FlowState, flow *ast.FlowNode) FlowType {
	return FlowType{} // !!!
}

func (c *Checker) getTypeAtFlowCondition(f *FlowState, flow *ast.FlowNode) FlowType {
	flowType := c.getTypeAtFlowNode(f, flow.Antecedent)
	if flowType.t.flags&TypeFlagsNever != 0 {
		return flowType
	}
	// If we have an antecedent type (meaning we're reachable in some way), we first
	// attempt to narrow the antecedent type. If that produces the never type, and if
	// the antecedent type is incomplete (i.e. a transient type in a loop), then we
	// take the type guard as an indication that control *could* reach here once we
	// have the complete type. We proceed by switching to the silent never type which
	// doesn't report errors when operators are applied to it. Note that this is the
	// *only* place a silent never type is ever generated.
	assumeTrue := flow.Flags&ast.FlowFlagsTrueCondition != 0
	nonEvolvingType := c.finalizeEvolvingArrayType(flowType.t)
	narrowedType := c.narrowType(f, nonEvolvingType, flow.Node, assumeTrue)
	return FlowType{t: narrowedType, incomplete: flowType.incomplete}
}

// Narrow the given type based on the given expression having the assumed boolean value. The returned type
// will be a subtype or the same type as the argument.
func (c *Checker) narrowType(f *FlowState, t *Type, expr *ast.Node, assumeTrue bool) *Type {
	// for `a?.b`, we emulate a synthetic `a !== null && a !== undefined` condition for `a`
	if ast.IsExpressionOfOptionalChainRoot(expr) || ast.IsBinaryExpression(expr.Parent) && (expr.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindQuestionQuestionToken || expr.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindQuestionQuestionEqualsToken) && expr.Parent.AsBinaryExpression().Left == expr {
		return c.narrowTypeByOptionality(f, t, expr, assumeTrue)
	}
	switch expr.Kind {
	case ast.KindIdentifier:
		// When narrowing a reference to a const variable, non-assigned parameter, or readonly property, we inline
		// up to five levels of aliased conditional expressions that are themselves declared as const variables.
		if !c.isMatchingReference(f.reference, expr) && c.inlineLevel < 5 {
			symbol := c.getResolvedSymbol(expr)
			if c.isConstantVariable(symbol) {
				declaration := symbol.ValueDeclaration
				if declaration != nil && ast.IsVariableDeclaration(declaration) && declaration.Type() == nil && declaration.Initializer() != nil && c.isConstantReference(f.reference) {
					c.inlineLevel++
					result := c.narrowType(f, t, declaration.Initializer(), assumeTrue)
					c.inlineLevel--
					return result
				}
			}
		}
		fallthrough
	case ast.KindThisKeyword, ast.KindSuperKeyword, ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		return c.narrowTypeByTruthiness(f, t, expr, assumeTrue)
	case ast.KindCallExpression:
		return c.narrowTypeByCallExpression(f, t, expr.AsCallExpression(), assumeTrue)
	case ast.KindParenthesizedExpression, ast.KindNonNullExpression:
		return c.narrowType(f, t, expr.Expression(), assumeTrue)
	case ast.KindBinaryExpression:
		return c.narrowTypeByBinaryExpression(f, t, expr.AsBinaryExpression(), assumeTrue)
	case ast.KindPrefixUnaryExpression:
		if expr.AsPrefixUnaryExpression().Operator == ast.KindExclamationToken {
			return c.narrowType(f, t, expr.AsPrefixUnaryExpression().Operand, !assumeTrue)
		}
	}
	return t
}

func (c *Checker) narrowTypeByOptionality(f *FlowState, t *Type, expr *ast.Node, assumePresent bool) *Type {
	return t // !!!
}

func (c *Checker) narrowTypeByTruthiness(f *FlowState, t *Type, expr *ast.Node, assumeTrue bool) *Type {
	return t // !!!
}

func (c *Checker) narrowTypeByCallExpression(f *FlowState, t *Type, callExpression *ast.CallExpression, assumeTrue bool) *Type {
	return t // !!!
}

func (c *Checker) narrowTypeByBinaryExpression(f *FlowState, t *Type, expr *ast.BinaryExpression, assumeTrue bool) *Type {
	switch expr.OperatorToken.Kind {
	case ast.KindEqualsToken, ast.KindBarBarEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindQuestionQuestionEqualsToken:
		return c.narrowTypeByTruthiness(f, c.narrowType(f, t, expr.Right, assumeTrue), expr.Left, assumeTrue)
	case ast.KindEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken:
		operator := expr.OperatorToken.Kind
		left := c.getReferenceCandidate(expr.Left)
		right := c.getReferenceCandidate(expr.Right)
		if left.Kind == ast.KindTypeOfExpression && isStringLiteralLike(right) {
			return c.narrowTypeByTypeof(f, t, left.AsTypeOfExpression(), operator, right, assumeTrue)
		}
		if right.Kind == ast.KindTypeOfExpression && isStringLiteralLike(left) {
			return c.narrowTypeByTypeof(f, t, right.AsTypeOfExpression(), operator, left, assumeTrue)
		}
		if c.isMatchingReference(f.reference, left) {
			return c.narrowTypeByEquality(t, operator, right, assumeTrue)
		}
		if c.isMatchingReference(f.reference, right) {
			return c.narrowTypeByEquality(t, operator, left, assumeTrue)
		}
		if c.strictNullChecks {
			if c.optionalChainContainsReference(left, f.reference) {
				t = c.narrowTypeByOptionalChainContainment(f, t, operator, right, assumeTrue)
			} else if c.optionalChainContainsReference(right, f.reference) {
				t = c.narrowTypeByOptionalChainContainment(f, t, operator, left, assumeTrue)
			}
		}
		leftAccess := c.getDiscriminantPropertyAccess(f, left, t)
		if leftAccess != nil {
			return c.narrowTypeByDiscriminantProperty(t, leftAccess, operator, right, assumeTrue)
		}
		rightAccess := c.getDiscriminantPropertyAccess(f, right, t)
		if rightAccess != nil {
			return c.narrowTypeByDiscriminantProperty(t, rightAccess, operator, left, assumeTrue)
		}
		if c.isMatchingConstructorReference(f, left) {
			return c.narrowTypeByConstructor(t, operator, right, assumeTrue)
		}
		if c.isMatchingConstructorReference(f, right) {
			return c.narrowTypeByConstructor(t, operator, left, assumeTrue)
		}
		if ast.IsBooleanLiteral(right) && !ast.IsAccessExpression(left) {
			return c.narrowTypeByBooleanComparison(f, t, left, right, operator, assumeTrue)
		}
		if ast.IsBooleanLiteral(left) && !ast.IsAccessExpression(right) {
			return c.narrowTypeByBooleanComparison(f, t, right, left, operator, assumeTrue)
		}
	case ast.KindInstanceOfKeyword:
		return c.narrowTypeByInstanceof(f, t, expr, assumeTrue)
	case ast.KindInKeyword:
		if ast.IsPrivateIdentifier(expr.Left) {
			return c.narrowTypeByPrivateIdentifierInInExpression(f, t, expr, assumeTrue)
		}
		target := c.getReferenceCandidate(expr.Right)
		if c.containsMissingType(t) && ast.IsAccessExpression(f.reference) && c.isMatchingReference(f.reference.Expression(), target) {
			leftType := c.getTypeOfExpression(expr.Left)
			if isTypeUsableAsPropertyName(leftType) {
				if accessedName, ok := c.getAccessedPropertyName(f.reference); ok && accessedName == getPropertyNameFromType(leftType) {
					return c.getTypeWithFacts(t, core.IfElse(assumeTrue, TypeFactsNEUndefined, TypeFactsEQUndefined))
				}
			}
		}
		if c.isMatchingReference(f.reference, target) {
			leftType := c.getTypeOfExpression(expr.Left)
			if isTypeUsableAsPropertyName(leftType) {
				return c.narrowTypeByInKeyword(f, t, leftType, assumeTrue)
			}
		}
	case ast.KindCommaToken:
		return c.narrowType(f, t, expr.Right, assumeTrue)
	case ast.KindAmpersandAmpersandToken:
		// Ordinarily we won't see && and || expressions in control flow analysis because the Binder breaks those
		// expressions down to individual conditional control flows. However, we may encounter them when analyzing
		// aliased conditional expressions.
		if assumeTrue {
			return c.narrowType(f, c.narrowType(f, t, expr.Left, true /*assumeTrue*/), expr.Right, true /*assumeTrue*/)
		}
		return c.getUnionType([]*Type{c.narrowType(f, t, expr.Left, false /*assumeTrue*/), c.narrowType(f, t, expr.Right, false /*assumeTrue*/)})
	case ast.KindBarBarToken:
		if assumeTrue {
			return c.getUnionType([]*Type{c.narrowType(f, t, expr.Left, true /*assumeTrue*/), c.narrowType(f, t, expr.Right, true /*assumeTrue*/)})
		}
		return c.narrowType(f, c.narrowType(f, t, expr.Left, false /*assumeTrue*/), expr.Right, false /*assumeTrue*/)
	}
	return t
}

func (c *Checker) narrowTypeByEquality(t *Type, operator ast.Kind, value *ast.Node, assumeTrue bool) *Type {
	if t.flags&TypeFlagsAny != 0 {
		return t
	}
	if operator == ast.KindExclamationEqualsToken || operator == ast.KindExclamationEqualsEqualsToken {
		assumeTrue = !assumeTrue
	}
	valueType := c.getTypeOfExpression(value)
	doubleEquals := operator == ast.KindEqualsEqualsToken || operator == ast.KindExclamationEqualsToken
	if valueType.flags&TypeFlagsNullable != 0 {
		if !c.strictNullChecks {
			return t
		}
		var facts TypeFacts
		switch {
		case doubleEquals:
			facts = core.IfElse(assumeTrue, TypeFactsEQUndefinedOrNull, TypeFactsNEUndefinedOrNull)
		case valueType.flags&TypeFlagsNull != 0:
			facts = core.IfElse(assumeTrue, TypeFactsEQNull, TypeFactsNENull)
		default:
			facts = core.IfElse(assumeTrue, TypeFactsEQUndefined, TypeFactsNEUndefined)
		}
		return c.getAdjustedTypeWithFacts(t, facts)
	}
	if assumeTrue {
		if !doubleEquals && (t.flags&TypeFlagsUnknown != 0 || someType(t, c.isEmptyAnonymousObjectType)) {
			if valueType.flags&(TypeFlagsPrimitive|TypeFlagsNonPrimitive) != 0 || c.isEmptyAnonymousObjectType(valueType) {
				return valueType
			}
			if valueType.flags&TypeFlagsObject != 0 {
				return c.nonPrimitiveType
			}
		}
		filteredType := c.filterType(t, func(t *Type) bool {
			return c.areTypesComparable(t, valueType) || doubleEquals && isCoercibleUnderDoubleEquals(t, valueType)
		})
		return c.replacePrimitivesWithLiterals(filteredType, valueType)
	}
	if isUnitType(valueType) {
		return c.filterType(t, func(t *Type) bool {
			return !(c.isUnitLikeType(t) && c.areTypesComparable(t, valueType))
		})
	}
	return t
}

func (c *Checker) narrowTypeByTypeof(f *FlowState, t *Type, typeOfExpr *ast.TypeOfExpression, operator ast.Kind, literal *ast.Node, assumeTrue bool) *Type {
	// We have '==', '!=', '===', or !==' operator with 'typeof xxx' and string literal operands
	if operator == ast.KindExclamationEqualsToken || operator == ast.KindExclamationEqualsEqualsToken {
		assumeTrue = !assumeTrue
	}
	target := c.getReferenceCandidate(typeOfExpr.Expression)
	if !c.isMatchingReference(f.reference, target) {
		if c.strictNullChecks && c.optionalChainContainsReference(target, f.reference) && assumeTrue == (literal.Text() != "undefined") {
			t = c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
		}
		propertyAccess := c.getDiscriminantPropertyAccess(f, target, t)
		if propertyAccess != nil {
			return c.narrowTypeByDiscriminant(t, propertyAccess, func(t *Type) *Type {
				return c.narrowTypeByLiteralExpression(t, literal, assumeTrue)
			})
		}
		return t
	}
	return c.narrowTypeByLiteralExpression(t, literal, assumeTrue)
}

var typeofNEFacts = map[string]TypeFacts{
	"string":    TypeFactsTypeofNEString,
	"number":    TypeFactsTypeofNENumber,
	"bigint":    TypeFactsTypeofNEBigInt,
	"boolean":   TypeFactsTypeofNEBoolean,
	"symbol":    TypeFactsTypeofNESymbol,
	"undefined": TypeFactsNEUndefined,
	"object":    TypeFactsTypeofNEObject,
	"function":  TypeFactsTypeofNEFunction,
}

func (c *Checker) narrowTypeByLiteralExpression(t *Type, literal *ast.LiteralExpression, assumeTrue bool) *Type {
	if assumeTrue {
		return c.narrowTypeByTypeName(t, literal.Text())
	}
	facts, ok := typeofNEFacts[literal.Text()]
	if !ok {
		facts = TypeFactsTypeofNEHostObject
	}
	return c.getAdjustedTypeWithFacts(t, facts)
}

func (c *Checker) narrowTypeByTypeName(t *Type, typeName string) *Type {
	switch typeName {
	case "string":
		return c.narrowTypeByTypeFacts(t, c.stringType, TypeFactsTypeofEQString)
	case "number":
		return c.narrowTypeByTypeFacts(t, c.numberType, TypeFactsTypeofEQNumber)
	case "bigint":
		return c.narrowTypeByTypeFacts(t, c.bigintType, TypeFactsTypeofEQBigInt)
	case "boolean":
		return c.narrowTypeByTypeFacts(t, c.booleanType, TypeFactsTypeofEQBoolean)
	case "symbol":
		return c.narrowTypeByTypeFacts(t, c.esSymbolType, TypeFactsTypeofEQSymbol)
	case "object":
		if t.flags&TypeFlagsAny != 0 {
			return t
		}
		return c.getUnionType([]*Type{c.narrowTypeByTypeFacts(t, c.nonPrimitiveType, TypeFactsTypeofEQObject), c.narrowTypeByTypeFacts(t, c.nullType, TypeFactsEQNull)})
	case "function":
		if t.flags&TypeFlagsAny != 0 {
			return t
		}
		return c.narrowTypeByTypeFacts(t, c.globalFunctionType, TypeFactsTypeofEQFunction)
	case "undefined":
		return c.narrowTypeByTypeFacts(t, c.undefinedType, TypeFactsEQUndefined)
	}
	return c.narrowTypeByTypeFacts(t, c.nonPrimitiveType, TypeFactsTypeofEQHostObject)
}

func (c *Checker) narrowTypeByTypeFacts(t *Type, impliedType *Type, facts TypeFacts) *Type {
	return c.mapType(t, func(t *Type) *Type {
		switch {
		case c.isTypeRelatedTo(t, impliedType, c.strictSubtypeRelation):
			if c.hasTypeFacts(t, facts) {
				return t
			}
			return c.neverType
		case c.isTypeSubtypeOf(impliedType, t):
			return impliedType
		case c.hasTypeFacts(t, facts):
			return c.getIntersectionType([]*Type{t, impliedType})
		}
		return c.neverType
	})
}

func (c *Checker) narrowTypeByDiscriminantProperty(t *Type, access *ast.Node, operator ast.Kind, value *ast.Node, assumeTrue bool) *Type {
	if (operator == ast.KindEqualsEqualsEqualsToken || operator == ast.KindExclamationEqualsEqualsToken) && t.flags&TypeFlagsUnion != 0 {
		keyPropertyName := c.getKeyPropertyName(t)
		if keyPropertyName != "" {
			if accessedName, ok := c.getAccessedPropertyName(access); ok && keyPropertyName == accessedName {
				candidate := c.getConstituentTypeForKeyType(t, c.getTypeOfExpression(value))
				if candidate != nil {
					if assumeTrue && operator == ast.KindEqualsEqualsEqualsToken || !assumeTrue && operator == ast.KindExclamationEqualsEqualsToken {
						return candidate
					}
					if propType := c.getTypeOfPropertyOfType(candidate, keyPropertyName); propType != nil && isUnitType(propType) {
						return c.removeType(t, candidate)
					}
					return t
				}
			}
		}
	}
	return c.narrowTypeByDiscriminant(t, access, func(t *Type) *Type {
		return c.narrowTypeByEquality(t, operator, value, assumeTrue)
	})
}

func (c *Checker) narrowTypeByDiscriminant(t *Type, access *ast.Node, narrowType func(t *Type) *Type) *Type {
	propName, ok := c.getAccessedPropertyName(access)
	if !ok {
		return t
	}
	optionalChain := ast.IsOptionalChain(access)
	removeNullable := c.strictNullChecks && (optionalChain || isNonNullAccess(access)) && c.maybeTypeOfKind(t, TypeFlagsNullable)
	nonNullType := t
	if removeNullable {
		nonNullType = c.getTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	}
	propType := c.getTypeOfPropertyOfType(nonNullType, propName)
	if propType == nil {
		return t
	}
	if removeNullable && optionalChain {
		propType = c.getOptionalType(propType, false)
	}
	narrowedPropType := narrowType(propType)
	return c.filterType(t, func(t *Type) bool {
		discriminantType := c.getTypeOfPropertyOrIndexSignatureOfType(t, propName)
		return discriminantType == nil || discriminantType.flags&TypeFlagsNever == 0 && narrowedPropType.flags&TypeFlagsNever == 0 && c.areTypesComparable(narrowedPropType, discriminantType)
	})
}

func (c *Checker) isMatchingConstructorReference(f *FlowState, expr *ast.Node) bool {
	if ast.IsAccessExpression(expr) {
		if accessedName, ok := c.getAccessedPropertyName(expr); ok && accessedName == "constructor" && c.isMatchingReference(f.reference, expr.Expression()) {
			return true
		}
	}
	return false
}

func (c *Checker) narrowTypeByConstructor(t *Type, operator ast.Kind, identifier *ast.Node, assumeTrue bool) *Type {
	// Do not narrow when checking inequality.
	if assumeTrue && operator != ast.KindEqualsEqualsToken && operator != ast.KindEqualsEqualsEqualsToken || !assumeTrue && operator != ast.KindExclamationEqualsToken && operator != ast.KindExclamationEqualsEqualsToken {
		return t
	}
	// Get the type of the constructor identifier expression, if it is not a function then do not narrow.
	identifierType := c.getTypeOfExpression(identifier)
	if !c.isFunctionType(identifierType) && !c.isConstructorType(identifierType) {
		return t
	}
	// Get the prototype property of the type identifier so we can find out its type.
	prototypeProperty := c.getPropertyOfType(identifierType, "prototype")
	if prototypeProperty == nil {
		return t
	}
	// Get the type of the prototype, if it is undefined, or the global `Object` or `Function` types then do not narrow.
	prototypeType := c.getTypeOfSymbol(prototypeProperty)
	var candidate *Type
	if !isTypeAny(prototypeType) {
		candidate = prototypeType
	}
	if candidate == nil || candidate == c.globalObjectType || candidate == c.globalFunctionType {
		return t
	}
	// If the type that is being narrowed is `any` then just return the `candidate` type since every type is a subtype of `any`.
	if isTypeAny(t) {
		return candidate
	}
	// Filter out types that are not considered to be "constructed by" the `candidate` type.
	return c.filterType(t, func(t *Type) bool {
		return c.isConstructedBy(t, candidate)
	})
}

func (c *Checker) isConstructedBy(source *Type, target *Type) bool {
	// If either the source or target type are a class type then we need to check that they are the same exact type.
	// This is because you may have a class `A` that defines some set of properties, and another class `B`
	// that defines the same set of properties as class `A`, in that case they are structurally the same
	// type, but when you do something like `instanceOfA.constructor === B` it will return false.
	if source.flags&TypeFlagsObject != 0 && source.objectFlags&ObjectFlagsClass != 0 || target.flags&TypeFlagsObject != 0 && target.objectFlags&ObjectFlagsClass != 0 {
		return source.symbol == target.symbol
	}
	// For all other types just check that the `source` type is a subtype of the `target` type.
	return c.isTypeSubtypeOf(source, target)
}

func (c *Checker) narrowTypeByBooleanComparison(f *FlowState, t *Type, expr *ast.Node, boolValue *ast.Node, operator ast.Kind, assumeTrue bool) *Type {
	assumeTrue = (assumeTrue != (boolValue.Kind == ast.KindTrueKeyword)) != (operator != ast.KindExclamationEqualsEqualsToken && operator != ast.KindExclamationEqualsToken)
	return c.narrowType(f, t, expr, assumeTrue)
}

func (c *Checker) narrowTypeByInstanceof(f *FlowState, t *Type, expr *ast.BinaryExpression, assumeTrue bool) *Type {
	left := c.getReferenceCandidate(expr.Left)
	if !c.isMatchingReference(f.reference, left) {
		if assumeTrue && c.strictNullChecks && c.optionalChainContainsReference(left, f.reference) {
			return c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
		}
		return t
	}
	right := expr.Right
	rightType := c.getTypeOfExpression(right)
	if !c.isTypeDerivedFrom(rightType, c.globalObjectType) {
		return t
	}
	// if the right-hand side has an object type with a custom `[Symbol.hasInstance]` method, and that method
	// has a type predicate, use the type predicate to perform narrowing. This allows normal `object` types to
	// participate in `instanceof`, as per Step 2 of https://tc39.es/ecma262/#sec-instanceofoperator.
	var predicate *TypePredicate
	if signature := c.getEffectsSignature(expr.AsNode()); signature != nil {
		predicate = c.getTypePredicateOfSignature(signature)
	}
	if predicate != nil && predicate.kind == TypePredicateKindIdentifier && predicate.parameterIndex == 0 {
		return c.getNarrowedType(t, predicate.t, assumeTrue, true /*checkDerived*/)
	}
	if !c.isTypeDerivedFrom(rightType, c.globalFunctionType) {
		return t
	}
	instanceType := c.mapType(rightType, c.getInstanceType)
	// Don't narrow from `any` if the target type is exactly `Object` or `Function`, and narrow
	// in the false branch only if the target is a non-empty object type.
	if isTypeAny(t) && (instanceType == c.globalObjectType || instanceType == c.globalFunctionType) || !assumeTrue && !(instanceType.flags&TypeFlagsObject != 0 && !c.isEmptyAnonymousObjectType(instanceType)) {
		return t
	}
	return c.getNarrowedType(t, instanceType, assumeTrue, true /*checkDerived*/)
}

func (c *Checker) getNarrowedType(t *Type, candidate *Type, assumeTrue bool, checkDerived bool) *Type {
	if t.flags&TypeFlagsUnion == 0 {
		return c.getNarrowedTypeWorker(t, candidate, assumeTrue, checkDerived)
	}
	key := NarrowedTypeKey{t, candidate, assumeTrue, checkDerived}
	if narrowedType, ok := c.narrowedTypes[key]; ok {
		return narrowedType
	}
	narrowedType := c.getNarrowedTypeWorker(t, candidate, assumeTrue, checkDerived)
	c.narrowedTypes[key] = narrowedType
	return narrowedType
}

func (c *Checker) getNarrowedTypeWorker(t *Type, candidate *Type, assumeTrue bool, checkDerived bool) *Type {
	if !assumeTrue {
		if t == candidate {
			return c.neverType
		}
		if checkDerived {
			return c.filterType(t, func(t *Type) bool {
				return !c.isTypeDerivedFrom(t, candidate)
			})
		}
		trueType := c.getNarrowedType(t, candidate, true /*assumeTrue*/, false /*checkDerived*/)
		return c.filterType(t, func(t *Type) bool {
			return !c.isTypeSubsetOf(t, trueType)
		})
	}
	if t.flags&TypeFlagsAnyOrUnknown != 0 {
		return candidate
	}
	if t == candidate {
		return candidate
	}
	// We first attempt to filter the current type, narrowing constituents as appropriate and removing
	// constituents that are unrelated to the candidate.
	var keyPropertyName string
	if t.flags&TypeFlagsUnion != 0 {
		keyPropertyName = c.getKeyPropertyName(t)
	}
	narrowedType := c.mapType(candidate, func(n *Type) *Type {
		// If a discriminant property is available, use that to reduce the type.
		matching := t
		if keyPropertyName != "" {
			discriminant := c.getTypeOfPropertyOfType(n, keyPropertyName)
			if discriminant != nil {
				matching = c.getConstituentTypeForKeyType(t, discriminant)
			}
		}
		// For each constituent t in the current type, if t and and c are directly related, pick the most
		// specific of the two. When t and c are related in both directions, we prefer c for type predicates
		// because that is the asserted type, but t for `instanceof` because generics aren't reflected in
		// prototype object types.
		var mapType func(*Type) *Type
		if checkDerived {
			mapType = func(t *Type) *Type {
				switch {
				case c.isTypeDerivedFrom(t, n):
					return t
				case c.isTypeDerivedFrom(n, t):
					return n
				}
				return c.neverType
			}
		} else {
			mapType = func(t *Type) *Type {
				switch {
				case c.isTypeStrictSubtypeOf(t, n):
					return t
				case c.isTypeStrictSubtypeOf(n, t):
					return n
				case c.isTypeSubtypeOf(t, n):
					return t
				case c.isTypeSubtypeOf(n, t):
					return n
				}
				return c.neverType
			}
		}
		directlyRelated := c.mapType(matching, mapType)
		if directlyRelated.flags&TypeFlagsNever == 0 {
			return directlyRelated
		}
		// If no constituents are directly related, create intersections for any generic constituents that
		// are related by constraint.
		var isRelated func(*Type, *Type) bool
		if checkDerived {
			isRelated = c.isTypeDerivedFrom
		} else {
			isRelated = c.isTypeSubtypeOf
		}
		return c.mapType(t, func(t *Type) *Type {
			if c.maybeTypeOfKind(t, TypeFlagsInstantiable) {
				constraint := c.getBaseConstraintOfType(t)
				if constraint == nil || isRelated(n, constraint) {
					return c.getIntersectionType([]*Type{t, n})
				}
			}
			return c.neverType
		})
	})
	// If filtering produced a non-empty type, return that. Otherwise, pick the most specific of the two
	// based on assignability, or as a last resort produce an intersection.
	switch {
	case narrowedType.flags&TypeFlagsNever == 0:
		return narrowedType
	case c.isTypeSubtypeOf(candidate, t):
		return candidate
	case c.isTypeAssignableTo(t, candidate):
		return t
	case c.isTypeAssignableTo(candidate, t):
		return candidate
	}
	return c.getIntersectionType([]*Type{t, candidate})
}

func (c *Checker) getInstanceType(constructorType *Type) *Type {
	prototypePropertyType := c.getTypeOfPropertyOfType(constructorType, "prototype")
	if prototypePropertyType != nil && !isTypeAny(prototypePropertyType) {
		return prototypePropertyType
	}
	constructSignatures := c.getSignaturesOfType(constructorType, SignatureKindConstruct)
	if len(constructSignatures) != 0 {
		return c.getUnionType(core.Map(constructSignatures, func(signature *Signature) *Type {
			return c.getReturnTypeOfSignature(c.getErasedSignature(signature))
		}))
	}
	// We use the empty object type to indicate we don't know the type of objects created by
	// this constructor function.
	return c.emptyObjectType
}

func (c *Checker) narrowTypeByPrivateIdentifierInInExpression(f *FlowState, t *Type, expr *ast.BinaryExpression, assumeTrue bool) *Type {
	return t // !!!
}

func (c *Checker) narrowTypeByInKeyword(f *FlowState, t *Type, nameType *Type, assumeTrue bool) *Type {
	return t // !!!
}

func (c *Checker) narrowTypeByOptionalChainContainment(f *FlowState, t *Type, operator ast.Kind, value *ast.Node, assumeTrue bool) *Type {
	return t // !!!
}

func (c *Checker) getTypeAtSwitchClause(f *FlowState, flow *ast.FlowNode) FlowType {
	return c.getTypeAtFlowNode(f, flow.Antecedent)
}

func (c *Checker) getTypeAtFlowBranchLabel(f *FlowState, flow *ast.FlowNode) FlowType {
	var antecedentTypes []*Type
	subtypeReduction := false
	seenIncomplete := false
	var bypassFlow *ast.FlowNode
	for list := flow.Antecedents; list != nil; list = list.Next {
		antecedent := list.Flow
		if bypassFlow == nil && antecedent.Flags&ast.FlowFlagsSwitchClause != 0 && antecedent.Node.AsFlowSwitchClauseData().IsEmpty() {
			// The antecedent is the bypass branch of a potentially exhaustive switch statement.
			bypassFlow = antecedent
			continue
		}
		flowType := c.getTypeAtFlowNode(f, antecedent)
		// If the type at a particular antecedent path is the declared type and the
		// reference is known to always be assigned (i.e. when declared and initial types
		// are the same), there is no reason to process more antecedents since the only
		// possible outcome is subtypes that will be removed in the final union type anyway.
		if flowType.t == f.declaredType && f.declaredType == f.initialType {
			return FlowType{t: flowType.t}
		}
		antecedentTypes = core.AppendIfUnique(antecedentTypes, flowType.t)
		// If an antecedent type is not a subset of the declared type, we need to perform
		// subtype reduction. This happens when a "foreign" type is injected into the control
		// flow using the instanceof operator or a user defined type predicate.
		if !c.isTypeSubsetOf(flowType.t, f.initialType) {
			subtypeReduction = true
		}
		if flowType.incomplete {
			seenIncomplete = true
		}
	}
	if bypassFlow != nil {
		flowType := c.getTypeAtFlowNode(f, bypassFlow)
		// If the bypass flow contributes a type we haven't seen yet and the switch statement
		// isn't exhaustive, process the bypass flow type. Since exhaustiveness checks increase
		// the risk of circularities, we only want to perform them when they make a difference.
		if flowType.t.flags&TypeFlagsNever == 0 && !slices.Contains(antecedentTypes, flowType.t) && !c.isExhaustiveSwitchStatement(bypassFlow.Node.AsFlowSwitchClauseData().SwitchStatement) {
			if flowType.t == f.declaredType && f.declaredType == f.initialType {
				return FlowType{t: flowType.t}
			}
			antecedentTypes = append(antecedentTypes, flowType.t)
			if !c.isTypeSubsetOf(flowType.t, f.initialType) {
				subtypeReduction = true
			}
			if flowType.incomplete {
				seenIncomplete = true
			}
		}
	}
	return FlowType{t: c.getUnionOrEvolvingArrayType(f, antecedentTypes, core.IfElse(subtypeReduction, UnionReductionSubtype, UnionReductionLiteral)), incomplete: seenIncomplete}
}

// At flow control branch or loop junctions, if the type along every antecedent code path
// is an evolving array type, we construct a combined evolving array type. Otherwise we
// finalize all evolving array types.
func (c *Checker) getUnionOrEvolvingArrayType(f *FlowState, types []*Type, subtypeReduction UnionReduction) *Type {
	if isEvolvingArrayTypeList(types) {
		// !!!
		// return c.getEvolvingArrayType(c.getUnionType(core.Map(types, c.getElementTypeOfEvolvingArrayType)))
		return c.errorType
	}
	result := c.recombineUnknownType(c.getUnionTypeEx(core.SameMap(types, c.finalizeEvolvingArrayType), subtypeReduction, nil, nil))
	if result != f.declaredType && result.flags&f.declaredType.flags&TypeFlagsUnion != 0 && slices.Equal(result.AsUnionType().types, f.declaredType.AsUnionType().types) {
		return f.declaredType
	}
	return result
}

func (c *Checker) getTypeAtFlowLoopLabel(f *FlowState, flow *ast.FlowNode) FlowType {
	return c.getTypeAtFlowNode(f, flow.Antecedents.Flow)
}

func (c *Checker) getTypeAtFlowArrayMutation(f *FlowState, flow *ast.FlowNode) FlowType {
	return FlowType{} // !!!
}

func (c *Checker) getDiscriminantPropertyAccess(f *FlowState, expr *ast.Node, computedType *Type) *ast.Node {
	// As long as the computed type is a subset of the declared type, we use the full declared type to detect
	// a discriminant property. In cases where the computed type isn't a subset, e.g because of a preceding type
	// predicate narrowing, we use the actual computed type.
	if f.declaredType.flags&TypeFlagsUnion != 0 || computedType.flags&TypeFlagsUnion != 0 {
		access := c.getCandidateDiscriminantPropertyAccess(f, expr)
		if access != nil {
			if name, ok := c.getAccessedPropertyName(access); ok {
				t := computedType
				if f.declaredType.flags&TypeFlagsUnion != 0 && c.isTypeSubsetOf(computedType, f.declaredType) {
					t = f.declaredType
				}
				if c.isDiscriminantProperty(t, name) {
					return access
				}
			}
		}
	}
	return nil
}

func (c *Checker) getCandidateDiscriminantPropertyAccess(f *FlowState, expr *ast.Node) *ast.Node {
	switch {
	case ast.IsBindingPattern(f.reference) || ast.IsFunctionExpressionOrArrowFunction(f.reference) || isObjectLiteralMethod(f.reference):
		// When the reference is a binding pattern or function or arrow expression, we are narrowing a pesudo-reference in
		// getNarrowedTypeOfSymbol. An identifier for a destructuring variable declared in the same binding pattern or
		// parameter declared in the same parameter list is a candidate.
		if ast.IsIdentifier(expr) {
			symbol := c.getResolvedSymbol(expr)
			declaration := symbol.ValueDeclaration
			if declaration != nil && (ast.IsBindingElement(declaration) || ast.IsParameter(declaration)) && f.reference == declaration.Parent && declaration.Initializer() == nil && !hasDotDotDotToken(declaration) {
				return declaration
			}
		}
	case ast.IsAccessExpression(expr):
		// An access expression is a candidate if the reference matches the left hand expression.
		if c.isMatchingReference(f.reference, expr.Expression()) {
			return expr
		}
	case ast.IsIdentifier(expr):
		symbol := c.getResolvedSymbol(expr)
		if c.isConstantVariable(symbol) {
			declaration := symbol.ValueDeclaration
			// Given 'const x = obj.kind', allow 'x' as an alias for 'obj.kind'
			if ast.IsVariableDeclaration(declaration) && declaration.Type() == nil {
				if initializer := declaration.Initializer(); initializer != nil && ast.IsAccessExpression(initializer) && c.isMatchingReference(f.reference, initializer.Expression()) {
					return initializer
				}
			}
			// Given 'const { kind: x } = obj', allow 'x' as an alias for 'obj.kind'
			if ast.IsBindingElement(declaration) && declaration.Initializer() == nil {
				parent := declaration.Parent.Parent
				if ast.IsVariableDeclaration(parent) && parent.Type() == nil {
					if initializer := parent.Initializer(); initializer != nil && (ast.IsIdentifier(initializer) || ast.IsAccessExpression(initializer)) && c.isMatchingReference(f.reference, initializer) {
						return declaration
					}
				}
			}
		}
	}
	return nil
}

// An evolving array type tracks the element types that have so far been seen in an
// 'x.push(value)' or 'x[n] = value' operation along the control flow graph. Evolving
// array types are ultimately converted into manifest array types (using getFinalArrayType)
// and never escape the getFlowTypeOfReference function.
func (c *Checker) getEvolvingArrayType(elementType *Type) *Type {
	key := CachedTypeKey{kind: CachedTypeKindEvolvingArrayType, typeId: elementType.id}
	result := c.cachedTypes[key]
	if result == nil {
		result := c.newObjectType(ObjectFlagsEvolvingArray, nil)
		result.AsEvolvingArrayType().elementType = elementType
		c.cachedTypes[key] = result
	}
	return result
}

func isEvolvingArrayTypeList(types []*Type) bool {
	hasEvolvingArrayType := false
	for _, t := range types {
		if t.flags&TypeFlagsNever == 0 {
			if t.objectFlags&ObjectFlagsEvolvingArray == 0 {
				return false
			}
			hasEvolvingArrayType = true
		}
	}
	return hasEvolvingArrayType
}

// Return true if the given node is 'x' in an 'x.length', x.push(value)', 'x.unshift(value)' or
// 'x[n] = value' operation, where 'n' is an expression of type any, undefined, or a number-like type.
func (c *Checker) isEvolvingArrayOperationTarget(node *ast.Node) bool {
	return false // !!!
	// root := c.getReferenceRoot(node)
	// parent := root.Parent
	// isLengthPushOrUnshift := isPropertyAccessExpression(parent) && (parent.Name.EscapedText == "length" || parent.Parent.Kind == ast.KindCallExpression && isIdentifier(parent.Name) && isPushOrUnshiftIdentifier(parent.Name))
	// isElementAssignment := parent.Kind == ast.KindElementAccessExpression && parent.AsElementAccessExpression().Expression == root && parent.Parent.Kind == ast.KindBinaryExpression && parent.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken && parent.Parent.AsBinaryExpression().Left == parent && !isAssignmentTarget(parent.Parent) && c.isTypeAssignableToKind(c.getTypeOfExpression(parent.AsElementAccessExpression().ArgumentExpression), TypeFlagsNumberLike)
	// return isLengthPushOrUnshift || isElementAssignment
}

func (c *Checker) finalizeEvolvingArrayType(t *Type) *Type {
	if t.objectFlags&ObjectFlagsEvolvingArray != 0 {
		return c.getFinalArrayType(t.AsEvolvingArrayType())
	}
	return t
}

func (c *Checker) getFinalArrayType(t *EvolvingArrayType) *Type {
	if t.finalArrayType == nil {
		t.finalArrayType = c.createFinalArrayType(t.elementType)
	}
	return t.finalArrayType
}

func (c *Checker) createFinalArrayType(elementType *Type) *Type {
	switch {
	case elementType.flags&TypeFlagsNever != 0:
		return c.autoArrayType
	case elementType.flags&TypeFlagsUnion != 0:
		return c.createArrayType(c.getUnionTypeEx(elementType.Types(), UnionReductionSubtype, nil, nil))
	}
	return c.createArrayType(elementType)
}

func (c *Checker) reportFlowControlError(node *ast.Node) {
	block := ast.FindAncestor(node, ast.IsFunctionOrModuleBlock)
	sourceFile := ast.GetSourceFileOfNode(node)
	span := scanner.GetRangeOfTokenAtPosition(sourceFile, getStatementsOfBlock(block).Pos())
	c.diagnostics.add(ast.NewDiagnostic(sourceFile, span, diagnostics.The_containing_function_or_module_body_is_too_large_for_control_flow_analysis))
}

func (c *Checker) isMatchingReference(source *ast.Node, target *ast.Node) bool {
	switch target.Kind {
	case ast.KindParenthesizedExpression, ast.KindNonNullExpression:
		return c.isMatchingReference(source, target.Expression())
	case ast.KindBinaryExpression:
		return isAssignmentExpression(target, false) && c.isMatchingReference(source, target.AsBinaryExpression().Left) ||
			ast.IsBinaryExpression(target) && target.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken &&
				c.isMatchingReference(source, target.AsBinaryExpression().Right)
	}
	switch source.Kind {
	case ast.KindMetaProperty:
		return ast.IsMetaProperty(target) && source.AsMetaProperty().KeywordToken == target.AsMetaProperty().KeywordToken && source.Name().Text() == target.Name().Text()
	case ast.KindIdentifier, ast.KindPrivateIdentifier:
		if isThisInTypeQuery(source) {
			return target.Kind == ast.KindThisKeyword
		}
		return ast.IsIdentifier(target) && c.getResolvedSymbol(source) == c.getResolvedSymbol(target) ||
			(ast.IsVariableDeclaration(target) || ast.IsBindingElement(target)) && c.getExportSymbolOfValueSymbolIfExported(c.getResolvedSymbol(source)) == c.getSymbolOfDeclaration(target)
	case ast.KindThisKeyword:
		return target.Kind == ast.KindThisKeyword
	case ast.KindSuperKeyword:
		return target.Kind == ast.KindSuperKeyword
	case ast.KindNonNullExpression, ast.KindParenthesizedExpression:
		return c.isMatchingReference(source.Expression(), target)
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		if sourcePropertyName, ok := c.getAccessedPropertyName(source); ok {
			if ast.IsAccessExpression(target) {
				if targetPropertyName, ok := c.getAccessedPropertyName(target); ok {
					return targetPropertyName == sourcePropertyName && c.isMatchingReference(source.Expression(), target.Expression())
				}
			}
		}
		if ast.IsElementAccessExpression(source) && ast.IsElementAccessExpression(target) {
			sourceArg := source.AsElementAccessExpression().ArgumentExpression
			targetArg := target.AsElementAccessExpression().ArgumentExpression
			if ast.IsIdentifier(sourceArg) && ast.IsIdentifier(targetArg) {
				symbol := c.getResolvedSymbol(sourceArg)
				if symbol == c.getResolvedSymbol(targetArg) && (c.isConstantVariable(symbol) || c.isParameterOrMutableLocalVariable(symbol) && !c.isSymbolAssigned(symbol)) {
					return c.isMatchingReference(source.Expression(), target.Expression())
				}
			}
		}
	case ast.KindQualifiedName:
		return ast.IsAccessExpression(target) && source.AsQualifiedName().Right.Text() == target.Name().Text() && c.isMatchingReference(source.AsQualifiedName().Left, target.Expression())
	case ast.KindBinaryExpression:
		return ast.IsBinaryExpression(source) && source.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken && c.isMatchingReference(source.AsBinaryExpression().Right, target)
	}
	return false
}

// Return the flow cache key for a "dotted name" (i.e. a sequence of identifiers
// separated by dots). The key consists of the id of the symbol referenced by the
// leftmost identifier followed by zero or more property names separated by dots.
// The result is an empty string if the reference isn't a dotted name.
func (c *Checker) getFlowCacheKey(node *ast.Node, declaredType *Type, initialType *Type, flowContainer *ast.Node) string {
	var b KeyBuilder
	if c.writeFlowCacheKey(&b, node, declaredType, initialType, flowContainer) {
		return b.String()
	}
	return ""
}

func (c *Checker) writeFlowCacheKey(b *KeyBuilder, node *ast.Node, declaredType *Type, initialType *Type, flowContainer *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier:
		if !isThisInTypeQuery(node) {
			symbol := c.getResolvedSymbol(node)
			if symbol == c.unknownSymbol {
				return false
			}
			b.WriteSymbol(symbol)
		}
		fallthrough
	case ast.KindThisKeyword:
		b.WriteByte(':')
		b.WriteType(declaredType)
		if initialType != declaredType {
			b.WriteByte('=')
			b.WriteType(initialType)
		}
		if flowContainer != nil {
			b.WriteByte('@')
			b.WriteInt(int(getNodeId(flowContainer)))
		}
		return true
	case ast.KindNonNullExpression, ast.KindParenthesizedExpression:
		return c.writeFlowCacheKey(b, node.Expression(), declaredType, initialType, flowContainer)
	case ast.KindQualifiedName:
		if !c.writeFlowCacheKey(b, node.AsQualifiedName().Left, declaredType, initialType, flowContainer) {
			return false
		}
		b.WriteByte('.')
		b.WriteString(node.AsQualifiedName().Right.Text())
		return true
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		if propName, ok := c.getAccessedPropertyName(node); ok {
			if !c.writeFlowCacheKey(b, node.Expression(), declaredType, initialType, flowContainer) {
				return false
			}
			b.WriteByte('.')
			b.WriteString(propName)
			return true
		}
		if ast.IsElementAccessExpression(node) && ast.IsIdentifier(node.AsElementAccessExpression().ArgumentExpression) {
			symbol := c.getResolvedSymbol(node.AsElementAccessExpression().ArgumentExpression)
			if c.isConstantVariable(symbol) || c.isParameterOrMutableLocalVariable(symbol) && !c.isSymbolAssigned(symbol) {
				if !c.writeFlowCacheKey(b, node.Expression(), declaredType, initialType, flowContainer) {
					return false
				}
				b.WriteString(".@")
				b.WriteSymbol(symbol)
				return true
			}
		}
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern, ast.KindFunctionDeclaration,
		ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindMethodDeclaration:
		b.WriteInt(int(getNodeId(node)))
		b.WriteByte('#')
		b.WriteType(declaredType)
		return true
	}
	return false
}

func (c *Checker) getAccessedPropertyName(access *ast.Node) (string, bool) {
	if ast.IsPropertyAccessExpression(access) {
		return access.Name().Text(), true
	}
	if ast.IsElementAccessExpression(access) {
		return c.tryGetElementAccessExpressionName(access.AsElementAccessExpression())
	}
	if ast.IsBindingElement(access) {
		return c.getDestructuringPropertyName(access)
	}
	if ast.IsParameter(access) {
		return strconv.Itoa(slices.Index(access.Parent.Parameters(), access)), true
	}
	return "", false
}

func (c *Checker) tryGetElementAccessExpressionName(node *ast.ElementAccessExpression) (string, bool) {
	switch {
	case isStringOrNumericLiteralLike(node.ArgumentExpression):
		return node.ArgumentExpression.Text(), true
	case isEntityNameExpression(node.ArgumentExpression):
		return c.tryGetNameFromEntityNameExpression(node.ArgumentExpression)
	}
	return "", false
}

func (c *Checker) tryGetNameFromEntityNameExpression(node *ast.Node) (string, bool) {
	symbol := c.resolveEntityName(node, ast.SymbolFlagsValue, true /*ignoreErrors*/, false, nil)
	if symbol == nil || !(c.isConstantVariable(symbol) || (symbol.Flags&ast.SymbolFlagsEnumMember != 0)) {
		return "", false
	}
	declaration := symbol.ValueDeclaration
	if declaration == nil {
		return "", false
	}
	t := c.tryGetTypeFromEffectiveTypeNode(declaration)
	if t != nil {
		if name, ok := tryGetNameFromType(t); ok {
			return name, true
		}
	}
	if hasOnlyExpressionInitializer(declaration) && c.isBlockScopedNameDeclaredBeforeUse(declaration, node) {
		initializer := c.getEffectiveInitializer(declaration)
		if initializer != nil {
			var initializerType *Type
			if ast.IsBindingPattern(declaration.Parent) {
				initializerType = c.getTypeForBindingElement(declaration)
			} else {
				initializerType = c.getTypeOfExpression(initializer)
			}
			if initializerType != nil {
				return tryGetNameFromType(initializerType)
			}
		} else if ast.IsEnumMember(declaration) {
			return tryGetTextOfPropertyName(declaration.Name())
		}
	}
	return "", false
}

func tryGetNameFromType(t *Type) (string, bool) {
	switch {
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name, true
	case t.flags&TypeFlagsStringOrNumberLiteral != 0:
		return anyToString(t.AsLiteralType().value), true
	}
	return "", false
}

func tryGetTextOfPropertyName(name *ast.Node) (string, bool) {
	switch name.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindStringLiteral, ast.KindNumericLiteral, ast.KindBigIntLiteral,
		ast.KindNoSubstitutionTemplateLiteral:
		return name.Text(), true
	case ast.KindComputedPropertyName:
		if isStringOrNumericLiteralLike(name.Expression()) {
			return name.Expression().Text(), true
		}
	case ast.KindJsxNamespacedName:
		return name.AsJsxNamespacedName().Namespace.Text() + ":" + name.Name().Text(), true
	}
	return "", false
}

func (c *Checker) getDestructuringPropertyName(node *ast.Node) (string, bool) {
	parent := node.Parent
	if ast.IsBindingElement(node) && ast.IsObjectBindingPattern(parent) {
		if name := node.AsBindingElement().PropertyName; name != nil {
			return c.getLiteralPropertyNameText(name)
		}
		return c.getLiteralPropertyNameText(node.Name())
	}
	if ast.IsPropertyAssignment(node) || ast.IsShorthandPropertyAssignment(node) {
		return c.getLiteralPropertyNameText(node.Name())
	}
	if ast.IsArrayBindingPattern(parent) {
		return strconv.Itoa(slices.Index(parent.AsBindingPattern().Elements.Nodes, node)), true
	}
	if ast.IsArrayLiteralExpression(parent) {
		return strconv.Itoa(slices.Index(parent.AsArrayLiteralExpression().Elements.Nodes, node)), true
	}
	return "", false
}

func (c *Checker) getLiteralPropertyNameText(name *ast.Node) (string, bool) {
	t := c.getLiteralTypeFromPropertyName(name)
	if t.flags&(TypeFlagsStringLiteral|TypeFlagsNumberLiteral) != 0 {
		return anyToString(t.AsLiteralType().value), true
	}
	return "", false
}

func (c *Checker) isConstantReference(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindThisKeyword:
		return true
	case ast.KindIdentifier:
		if !isThisInTypeQuery(node) {
			symbol := c.getResolvedSymbol(node)
			return c.isConstantVariable(symbol) || c.isParameterOrMutableLocalVariable(symbol) && !c.isSymbolAssigned(symbol) || symbol.ValueDeclaration != nil && ast.IsFunctionExpression(symbol.ValueDeclaration)
		}
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression:
		// The resolvedSymbol property is initialized by checkPropertyAccess or checkElementAccess before we get here.
		if c.isConstantReference(node.Expression()) {
			symbol := c.typeNodeLinks.get(node).resolvedSymbol
			if symbol != nil {
				return c.isReadonlySymbol(symbol)
			}
		}
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		rootDeclaration := getRootDeclaration(node.Parent)
		if ast.IsParameter(rootDeclaration) || ast.IsVariableDeclaration(rootDeclaration) && ast.IsCatchClause(rootDeclaration.Parent) {
			return !c.isSomeSymbolAssigned(rootDeclaration)
		}
		return ast.IsVariableDeclaration(rootDeclaration) && c.isVarConstLike(rootDeclaration)
	}
	return false
}

func (c *Checker) containsMatchingReference(source *ast.Node, target *ast.Node) bool {
	for ast.IsAccessExpression(source) {
		source = source.Expression()
		if c.isMatchingReference(source, target) {
			return true
		}
	}
	return false
}

func (c *Checker) optionalChainContainsReference(source *ast.Node, target *ast.Node) bool {
	for ast.IsOptionalChain(source) {
		source = source.Expression()
		if c.isMatchingReference(source, target) {
			return true
		}
	}
	return false
}

func (c *Checker) getReferenceCandidate(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindParenthesizedExpression:
		return c.getReferenceCandidate(node.Expression())
	case ast.KindBinaryExpression:
		switch node.AsBinaryExpression().OperatorToken.Kind {
		case ast.KindEqualsToken, ast.KindBarBarEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindQuestionQuestionEqualsToken:
			return c.getReferenceCandidate(node.AsBinaryExpression().Left)
		case ast.KindCommaToken:
			return c.getReferenceCandidate(node.AsBinaryExpression().Right)
		}
	}
	return node
}

// Return a new type in which occurrences of the string, number and bigint primitives and placeholder template
// literal types in typeWithPrimitives have been replaced with occurrences of compatible and more specific types
// from typeWithLiterals. This is essentially a limited form of intersection between the two types. We avoid a
// true intersection because it is more costly and, when applied to union types, generates a large number of
// types we don't actually care about.
func (c *Checker) replacePrimitivesWithLiterals(typeWithPrimitives *Type, typeWithLiterals *Type) *Type {
	if c.maybeTypeOfKind(typeWithPrimitives, TypeFlagsString|TypeFlagsTemplateLiteral|TypeFlagsNumber|TypeFlagsBigInt) &&
		c.maybeTypeOfKind(typeWithLiterals, TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping|TypeFlagsNumberLiteral|TypeFlagsBigIntLiteral) {
		return c.mapType(typeWithPrimitives, func(t *Type) *Type {
			switch {
			case t.flags&TypeFlagsString != 0:
				return c.extractTypesOfKind(typeWithLiterals, TypeFlagsString|TypeFlagsStringLiteral|TypeFlagsTemplateLiteral|TypeFlagsStringMapping)
			case c.isPatternLiteralType(t) && !c.maybeTypeOfKind(typeWithLiterals, TypeFlagsString|TypeFlagsTemplateLiteral|TypeFlagsStringMapping):
				return c.extractTypesOfKind(typeWithLiterals, TypeFlagsStringLiteral)
			case t.flags&TypeFlagsNumber != 0:
				return c.extractTypesOfKind(typeWithLiterals, TypeFlagsNumber|TypeFlagsNumberLiteral)
			case t.flags&TypeFlagsBigInt != 0:
				return c.extractTypesOfKind(typeWithLiterals, TypeFlagsBigInt|TypeFlagsBigIntLiteral)
			default:
				return t
			}
		})
	}
	return typeWithPrimitives
}

func isCoercibleUnderDoubleEquals(source *Type, target *Type) bool {
	return source.flags&(TypeFlagsNumber|TypeFlagsString|TypeFlagsBooleanLiteral) != 0 &&
		target.flags&(TypeFlagsNumber|TypeFlagsString|TypeFlagsBoolean) != 0
}

func (c *Checker) isExhaustiveSwitchStatement(node *ast.SwitchStatement) bool {
	return false // !!!
}

func (c *Checker) getEffectsSignature(node *ast.Node) *Signature {
	return nil // !!!
}

func (c *Checker) getInitialType(node *ast.Node) *Type {
	switch node.Kind {
	case ast.KindVariableDeclaration:
		return c.getInitialTypeOfVariableDeclaration(node)
	case ast.KindBindingElement:
		return c.getInitialTypeOfBindingElement(node)
	}
	panic("Unhandled case in getInitialType")
}

func (c *Checker) getInitialTypeOfVariableDeclaration(node *ast.Node) *Type {
	if node.Initializer() != nil {
		return c.getTypeOfInitializer(node.Initializer())
	}
	if ast.IsForInStatement(node.Parent.Parent) {
		return c.stringType
	}
	if ast.IsForOfStatement(node.Parent.Parent) {
		t := c.checkRightHandSideOfForOf(node.Parent.Parent)
		if t != nil {
			return t
		}
	}
	return c.errorType
}

func (c *Checker) getTypeOfInitializer(node *ast.Node) *Type {
	// Return the cached type if one is available. If the type of the variable was inferred
	// from its initializer, we'll already have cached the type. Otherwise we compute it now
	// without caching such that transient types are reflected.
	if c.typeNodeLinks.has(node) {
		t := c.typeNodeLinks.get(node).resolvedType
		if t != nil {
			return t
		}
	}
	return c.getTypeOfExpression(node)
}

func (c *Checker) getInitialTypeOfBindingElement(node *ast.Node) *Type {
	return c.errorType // !!!
}

func (c *Checker) getAssignedType(node *ast.Node) *Type {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindForInStatement:
		return c.stringType
	case ast.KindForOfStatement:
		t := c.checkRightHandSideOfForOf(parent)
		if t != nil {
			return t
		}
	case ast.KindBinaryExpression:
		return c.getAssignedTypeOfBinaryExpression(parent)
	case ast.KindDeleteExpression:
		return c.undefinedType
		// !!!
		// case ast.KindArrayLiteralExpression:
		// 	return c.getAssignedTypeOfArrayLiteralElement(parent.AsArrayLiteralExpression(), node)
		// case ast.KindSpreadElement:
		// 	return c.getAssignedTypeOfSpreadExpression(parent.AsSpreadElement())
		// case ast.KindPropertyAssignment:
		// 	return c.getAssignedTypeOfPropertyAssignment(parent.AsPropertyAssignment())
		// case ast.KindShorthandPropertyAssignment:
		// 	return c.getAssignedTypeOfShorthandPropertyAssignment(parent.AsShorthandPropertyAssignment())
	}
	return c.errorType
}

func (c *Checker) getAssignedTypeOfBinaryExpression(node *ast.Node) *Type {
	isDestructuringDefaultAssignment := ast.IsArrayLiteralExpression(node.Parent) && c.isDestructuringAssignmentTarget(node.Parent) ||
		ast.IsPropertyAssignment(node.Parent) && c.isDestructuringAssignmentTarget(node.Parent.Parent)
	if isDestructuringDefaultAssignment {
		return c.getTypeWithDefault(c.getAssignedType(node), node.AsBinaryExpression().Right)
	}
	return c.getTypeOfExpression(node.AsBinaryExpression().Right)
}

func (c *Checker) isDestructuringAssignmentTarget(parent *ast.Node) bool {
	return ast.IsBinaryExpression(parent.Parent) && parent.Parent.AsBinaryExpression().Left == parent ||
		ast.IsForOfStatement(parent.Parent) && parent.Parent.Initializer() == parent
}

func (c *Checker) getTypeWithDefault(t *Type, defaultExpression *ast.Node) *Type {
	if defaultExpression != nil {
		return c.getUnionType([]*Type{c.getNonUndefinedType(t), c.getTypeOfExpression(defaultExpression)})
	}
	return t
}

// Remove those constituent types of declaredType to which no constituent type of assignedType is assignable.
// For example, when a variable of type number | string | boolean is assigned a value of type number | boolean,
// we remove type string.
func (c *Checker) getAssignmentReducedType(declaredType *Type, assignedType *Type) *Type {
	if declaredType == assignedType {
		return declaredType
	}
	if assignedType.flags&TypeFlagsNever != 0 {
		return assignedType
	}
	key := AssignmentReducedKey{id1: declaredType.id, id2: assignedType.id}
	result := c.assignmentReducedTypes[key]
	if result == nil {
		result = c.getAssignmentReducedTypeWorker(declaredType, assignedType)
		c.assignmentReducedTypes[key] = result
	}
	return result
}

func (c *Checker) getAssignmentReducedTypeWorker(declaredType *Type, assignedType *Type) *Type {
	filteredType := c.filterType(declaredType, func(t *Type) bool {
		return c.typeMaybeAssignableTo(assignedType, t)
	})
	// Ensure that we narrow to fresh types if the assignment is a fresh boolean literal type.
	reducedType := filteredType
	if assignedType.flags&TypeFlagsBooleanLiteral != 0 && isFreshLiteralType(assignedType) {
		reducedType = c.mapType(filteredType, c.getFreshTypeOfLiteralType)
	}
	// Our crude heuristic produces an invalid result in some cases: see GH#26130.
	// For now, when that happens, we give up and don't narrow at all.  (This also
	// means we'll never narrow for erroneous assignments where the assigned type
	// is not assignable to the declared type.)
	if c.isTypeAssignableTo(assignedType, reducedType) {
		return reducedType
	}
	return declaredType
}

func (c *Checker) typeMaybeAssignableTo(source *Type, target *Type) bool {
	if source.flags&TypeFlagsUnion == 0 {
		return c.isTypeAssignableTo(source, target)
	}
	for _, t := range source.AsUnionType().types {
		if c.isTypeAssignableTo(t, target) {
			return true
		}
	}
	return false
}

// Return true if the given flow node is preceded by a 'super(...)' call in every possible code path
// leading to the node.
func (c *Checker) isPostSuperFlowNode(flow *ast.FlowNode, noCacheCheck bool) bool {
	for {
		flags := flow.Flags
		if flags&ast.FlowFlagsShared != 0 {
			if !noCacheCheck {
				if postSuper, ok := c.flowNodePostSuper[flow]; ok {
					return postSuper
				}
				postSuper := c.isPostSuperFlowNode(flow, true /*noCacheCheck*/)
				c.flowNodePostSuper[flow] = postSuper
			}
			noCacheCheck = false
		}
		switch {
		case flags&(ast.FlowFlagsAssignment|ast.FlowFlagsCondition|ast.FlowFlagsArrayMutation|ast.FlowFlagsSwitchClause) != 0:
			flow = flow.Antecedent
		case flags&ast.FlowFlagsCall != 0:
			if flow.Node.Expression().Kind == ast.KindSuperKeyword {
				return true
			}
			flow = flow.Antecedent
		case flags&ast.FlowFlagsBranchLabel != 0:
			for list := flow.Antecedents; list != nil; list = list.Next {
				if !c.isPostSuperFlowNode(list.Flow, false /*noCacheCheck*/) {
					return false
				}
			}
			return true
		case flags&ast.FlowFlagsLoopLabel != 0:
			// A loop is post-super if the control flow path that leads to the top is post-super.
			flow = flow.Antecedents.Flow
		case flags&ast.FlowFlagsReduceLabel != 0:
			data := flow.Node.AsFlowReduceLabelData()
			saveAntecedents := data.Target.Antecedents
			data.Target.Antecedents = data.Antecedents
			result := c.isPostSuperFlowNode(flow.Antecedent, false /*noCacheCheck*/)
			data.Target.Antecedents = saveAntecedents
			return result
		default:
			// Unreachable nodes are considered post-super to silence errors
			return flags&ast.FlowFlagsUnreachable != 0
		}
	}
}
