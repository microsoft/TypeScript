package checker

import (
	"math"
	"slices"
	"strconv"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/evaluator"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type FlowType struct {
	t          *Type
	incomplete bool
}

func (ft *FlowType) isNil() bool {
	return ft.t == nil
}

func (c *Checker) newFlowType(t *Type, incomplete bool) FlowType {
	if incomplete && t.flags&TypeFlagsNever != 0 {
		t = c.silentNeverType
	}
	return FlowType{t: t, incomplete: incomplete}
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
	refKey          string
	depth           int
	sharedFlowStart int
	reduceLabels    []*ast.FlowReduceLabelData
	next            *FlowState
}

func (c *Checker) getFlowState() *FlowState {
	f := c.freeFlowState
	if f == nil {
		f = &FlowState{}
	}
	c.freeFlowState = f.next
	return f
}

func (c *Checker) putFlowState(f *FlowState) {
	*f = FlowState{
		reduceLabels: f.reduceLabels[:0],
		next:         c.freeFlowState,
	}
	c.freeFlowState = f
}

func getFlowNodeOfNode(node *ast.Node) *ast.FlowNode {
	flowNodeData := node.FlowNodeData()
	if flowNodeData != nil {
		return flowNodeData.FlowNode
	}
	return nil
}

func (c *Checker) getFlowTypeOfReference(reference *ast.Node, declaredType *Type) *Type {
	return c.getFlowTypeOfReferenceEx(reference, declaredType, declaredType, nil, nil)
}

func (c *Checker) getFlowTypeOfReferenceEx(reference *ast.Node, declaredType *Type, initialType *Type, flowContainer *ast.Node, flowNode *ast.FlowNode) *Type {
	if c.flowAnalysisDisabled {
		return c.errorType
	}
	if flowNode == nil {
		flowNode = getFlowNodeOfNode(reference)
		if flowNode == nil {
			return declaredType
		}
	}
	f := c.getFlowState()
	f.reference = reference
	f.declaredType = declaredType
	f.initialType = core.Coalesce(initialType, declaredType)
	f.flowContainer = flowContainer
	f.sharedFlowStart = len(c.sharedFlows)
	c.flowInvocationCount++
	evolvedType := c.getTypeAtFlowNode(f, flowNode).t
	c.sharedFlows = c.sharedFlows[:f.sharedFlowStart]
	c.putFlowState(f)
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
		case flags&ast.FlowFlagsBranchLabel != 0:
			antecedents := getBranchLabelAntecedents(flow, f.reduceLabels)
			if antecedents.Next == nil {
				flow = antecedents.Flow
				continue
			}
			t = c.getTypeAtFlowBranchLabel(f, flow, antecedents)
		case flags&ast.FlowFlagsLoopLabel != 0:
			if flow.Antecedents.Next == nil {
				flow = flow.Antecedents.Flow
				continue
			}
			t = c.getTypeAtFlowLoopLabel(f, flow)
		case flags&ast.FlowFlagsArrayMutation != 0:
			t = c.getTypeAtFlowArrayMutation(f, flow)
			if t.isNil() {
				flow = flow.Antecedent
				continue
			}
		case flags&ast.FlowFlagsReduceLabel != 0:
			f.reduceLabels = append(f.reduceLabels, flow.Node.AsFlowReduceLabelData())
			t = c.getTypeAtFlowNode(f, flow.Antecedent)
			f.reduceLabels = f.reduceLabels[:len(f.reduceLabels)-1]
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

func getBranchLabelAntecedents(flow *ast.FlowNode, reduceLabels []*ast.FlowReduceLabelData) *ast.FlowList {
	i := len(reduceLabels)
	for i != 0 {
		i--
		data := reduceLabels[i]
		if data.Target == flow {
			return data.Antecedents
		}
	}
	return flow.Antecedents
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
			return c.newFlowType(c.getBaseTypeOfLiteralType(flowType.t), flowType.incomplete)
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
		!ast.IsBindingElement(node) && ast.IsBinaryExpression(node.Parent) && isEmptyArrayLiteral(node.Parent.AsBinaryExpression().Right)
}

func (c *Checker) getTypeAtFlowCall(f *FlowState, flow *ast.FlowNode) FlowType {
	signature := c.getEffectsSignature(flow.Node)
	if signature != nil {
		predicate := c.getTypePredicateOfSignature(signature)
		if predicate != nil && (predicate.kind == TypePredicateKindAssertsThis || predicate.kind == TypePredicateKindAssertsIdentifier) {
			flowType := c.getTypeAtFlowNode(f, flow.Antecedent)
			t := c.finalizeEvolvingArrayType(flowType.t)
			var narrowedType *Type
			switch {
			case predicate.t != nil:
				narrowedType = c.narrowTypeByTypePredicate(f, t, predicate, flow.Node, true /*assumeTrue*/)
			case predicate.kind == TypePredicateKindAssertsIdentifier && predicate.parameterIndex >= 0 && int(predicate.parameterIndex) < len(flow.Node.Arguments()):
				narrowedType = c.narrowTypeByAssertion(f, t, flow.Node.Arguments()[predicate.parameterIndex])
			default:
				narrowedType = t
			}
			if narrowedType == t {
				return flowType
			}
			return c.newFlowType(narrowedType, flowType.incomplete)
		}
		if c.getReturnTypeOfSignature(signature).flags&TypeFlagsNever != 0 {
			return FlowType{t: c.unreachableNeverType}
		}
	}
	return FlowType{}
}

func (c *Checker) narrowTypeByTypePredicate(f *FlowState, t *Type, predicate *TypePredicate, callExpression *ast.Node, assumeTrue bool) *Type {
	// Don't narrow from 'any' if the predicate type is exactly 'Object' or 'Function'
	if predicate.t != nil && !(IsTypeAny(t) && (predicate.t == c.globalObjectType || predicate.t == c.globalFunctionType)) {
		predicateArgument := c.getTypePredicateArgument(predicate, callExpression)
		if predicateArgument != nil {
			if c.isMatchingReference(f.reference, predicateArgument) {
				return c.getNarrowedType(t, predicate.t, assumeTrue, false /*checkDerived*/)
			}
			if c.strictNullChecks && c.optionalChainContainsReference(predicateArgument, f.reference) && (assumeTrue && !(c.hasTypeFacts(predicate.t, TypeFactsEQUndefined)) || !assumeTrue && everyType(predicate.t, c.isNullableType)) {
				t = c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
			}
			access := c.getDiscriminantPropertyAccess(f, predicateArgument, t)
			if access != nil {
				return c.narrowTypeByDiscriminant(t, access, func(t *Type) *Type {
					return c.getNarrowedType(t, predicate.t, assumeTrue, false /*checkDerived*/)
				})
			}
		}
	}
	return t
}

func (c *Checker) narrowTypeByAssertion(f *FlowState, t *Type, expr *ast.Node) *Type {
	node := ast.SkipParentheses(expr)
	if node.Kind == ast.KindFalseKeyword {
		return c.unreachableNeverType
	}
	if node.Kind == ast.KindBinaryExpression {
		if node.AsBinaryExpression().OperatorToken.Kind == ast.KindAmpersandAmpersandToken {
			return c.narrowTypeByAssertion(f, c.narrowTypeByAssertion(f, t, node.AsBinaryExpression().Left), node.AsBinaryExpression().Right)
		}
		if node.AsBinaryExpression().OperatorToken.Kind == ast.KindBarBarToken {
			return c.getUnionType([]*Type{c.narrowTypeByAssertion(f, t, node.AsBinaryExpression().Left), c.narrowTypeByAssertion(f, t, node.AsBinaryExpression().Right)})
		}
	}
	return c.narrowType(f, t, node, true /*assumeTrue*/)
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
	if narrowedType == nonEvolvingType {
		return flowType
	}
	return c.newFlowType(narrowedType, flowType.incomplete)
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
		return c.narrowTypeByCallExpression(f, t, expr, assumeTrue)
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
	if c.isMatchingReference(f.reference, expr) {
		return c.getAdjustedTypeWithFacts(t, core.IfElse(assumePresent, TypeFactsNEUndefinedOrNull, TypeFactsEQUndefinedOrNull))
	}
	access := c.getDiscriminantPropertyAccess(f, expr, t)
	if access != nil {
		return c.narrowTypeByDiscriminant(t, access, func(t *Type) *Type {
			return c.getTypeWithFacts(t, core.IfElse(assumePresent, TypeFactsNEUndefinedOrNull, TypeFactsEQUndefinedOrNull))
		})
	}
	return t
}

func (c *Checker) narrowTypeByTruthiness(f *FlowState, t *Type, expr *ast.Node, assumeTrue bool) *Type {
	if c.isMatchingReference(f.reference, expr) {
		return c.getAdjustedTypeWithFacts(t, core.IfElse(assumeTrue, TypeFactsTruthy, TypeFactsFalsy))
	}
	if c.strictNullChecks && assumeTrue && c.optionalChainContainsReference(expr, f.reference) {
		t = c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	}
	access := c.getDiscriminantPropertyAccess(f, expr, t)
	if access != nil {
		return c.narrowTypeByDiscriminant(t, access, func(t *Type) *Type {
			return c.getTypeWithFacts(t, core.IfElse(assumeTrue, TypeFactsTruthy, TypeFactsFalsy))
		})
	}
	return t
}

func (c *Checker) narrowTypeByCallExpression(f *FlowState, t *Type, callExpression *ast.Node, assumeTrue bool) *Type {
	if c.hasMatchingArgument(callExpression, f.reference) {
		var predicate *TypePredicate
		if assumeTrue || !isCallChain(callExpression) {
			signature := c.getEffectsSignature(callExpression)
			if signature != nil {
				predicate = c.getTypePredicateOfSignature(signature)
			}
		}
		if predicate != nil && (predicate.kind == TypePredicateKindThis || predicate.kind == TypePredicateKindIdentifier) {
			return c.narrowTypeByTypePredicate(f, t, predicate, callExpression, assumeTrue)
		}
	}
	if c.containsMissingType(t) && ast.IsAccessExpression(f.reference) && ast.IsPropertyAccessExpression(callExpression.Expression()) {
		callAccess := callExpression.Expression()
		if c.isMatchingReference(f.reference.Expression(), c.getReferenceCandidate(callAccess.Expression())) && ast.IsIdentifier(callAccess.Name()) && callAccess.Name().Text() == "hasOwnProperty" && len(callExpression.Arguments()) == 1 {
			argument := callExpression.Arguments()[0]
			if accessedName, ok := c.getAccessedPropertyName(f.reference); ok && ast.IsStringLiteralLike(argument) && accessedName == argument.Text() {
				return c.getTypeWithFacts(t, core.IfElse(assumeTrue, TypeFactsNEUndefined, TypeFactsEQUndefined))
			}
		}
	}
	return t
}

func (c *Checker) narrowTypeByBinaryExpression(f *FlowState, t *Type, expr *ast.BinaryExpression, assumeTrue bool) *Type {
	switch expr.OperatorToken.Kind {
	case ast.KindEqualsToken, ast.KindBarBarEqualsToken, ast.KindAmpersandAmpersandEqualsToken, ast.KindQuestionQuestionEqualsToken:
		return c.narrowTypeByTruthiness(f, c.narrowType(f, t, expr.Right, assumeTrue), expr.Left, assumeTrue)
	case ast.KindEqualsEqualsToken, ast.KindExclamationEqualsToken, ast.KindEqualsEqualsEqualsToken, ast.KindExclamationEqualsEqualsToken:
		operator := expr.OperatorToken.Kind
		left := c.getReferenceCandidate(expr.Left)
		right := c.getReferenceCandidate(expr.Right)
		if left.Kind == ast.KindTypeOfExpression && ast.IsStringLiteralLike(right) {
			return c.narrowTypeByTypeof(f, t, left.AsTypeOfExpression(), operator, right, assumeTrue)
		}
		if right.Kind == ast.KindTypeOfExpression && ast.IsStringLiteralLike(left) {
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
	if !IsTypeAny(prototypeType) {
		candidate = prototypeType
	}
	if candidate == nil || candidate == c.globalObjectType || candidate == c.globalFunctionType {
		return t
	}
	// If the type that is being narrowed is `any` then just return the `candidate` type since every type is a subtype of `any`.
	if IsTypeAny(t) {
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
	if IsTypeAny(t) && (instanceType == c.globalObjectType || instanceType == c.globalFunctionType) || !assumeTrue && !(instanceType.flags&TypeFlagsObject != 0 && !c.isEmptyAnonymousObjectType(instanceType)) {
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
			if discriminant := c.getTypeOfPropertyOfType(n, keyPropertyName); discriminant != nil {
				if constituent := c.getConstituentTypeForKeyType(t, discriminant); constituent != nil {
					matching = constituent
				}
			}
		}
		// For each constituent t in the current type, if t and c are directly related, pick the most
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
	if prototypePropertyType != nil && !IsTypeAny(prototypePropertyType) {
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
	target := c.getReferenceCandidate(expr.Right)
	if !c.isMatchingReference(f.reference, target) {
		return t
	}
	symbol := c.getSymbolForPrivateIdentifierExpression(expr.Left)
	if symbol == nil {
		return t
	}
	classSymbol := symbol.Parent
	var targetType *Type
	if ast.HasStaticModifier(symbol.ValueDeclaration) {
		targetType = c.getTypeOfSymbol(classSymbol)
	} else {
		targetType = c.getDeclaredTypeOfSymbol(classSymbol)
	}
	return c.getNarrowedType(t, targetType, assumeTrue, true /*checkDerived*/)
}

func (c *Checker) narrowTypeByInKeyword(f *FlowState, t *Type, nameType *Type, assumeTrue bool) *Type {
	name := getPropertyNameFromType(nameType)
	isKnownProperty := someType(t, func(t *Type) bool {
		return c.isTypePresencePossible(t, name, true /*assumeTrue*/)
	})
	if isKnownProperty {
		// If the check is for a known property (i.e. a property declared in some constituent of
		// the target type), we filter the target type by presence of absence of the property.
		return c.filterType(t, func(t *Type) bool {
			return c.isTypePresencePossible(t, name, assumeTrue)
		})
	}
	if assumeTrue {
		// If the check is for an unknown property, we intersect the target type with `Record<X, unknown>`,
		// where X is the name of the property.
		recordSymbol := c.getGlobalRecordSymbol()
		if recordSymbol != nil {
			return c.getIntersectionType([]*Type{t, c.getTypeAliasInstantiation(recordSymbol, []*Type{nameType, c.unknownType}, nil)})
		}
	}
	return t
}

func (c *Checker) isTypePresencePossible(t *Type, propName string, assumeTrue bool) bool {
	prop := c.getPropertyOfType(t, propName)
	if prop != nil {
		return prop.Flags&ast.SymbolFlagsOptional != 0 || prop.CheckFlags&ast.CheckFlagsPartial != 0 || assumeTrue
	}
	return c.getApplicableIndexInfoForName(t, propName) != nil || !assumeTrue
}

func (c *Checker) narrowTypeByOptionalChainContainment(f *FlowState, t *Type, operator ast.Kind, value *ast.Node, assumeTrue bool) *Type {
	// We are in a branch of obj?.foo === value (or any one of the other equality operators). We narrow obj as follows:
	// When operator is === and type of value excludes undefined, null and undefined is removed from type of obj in true branch.
	// When operator is !== and type of value excludes undefined, null and undefined is removed from type of obj in false branch.
	// When operator is == and type of value excludes null and undefined, null and undefined is removed from type of obj in true branch.
	// When operator is != and type of value excludes null and undefined, null and undefined is removed from type of obj in false branch.
	// When operator is === and type of value is undefined, null and undefined is removed from type of obj in false branch.
	// When operator is !== and type of value is undefined, null and undefined is removed from type of obj in true branch.
	// When operator is == and type of value is null or undefined, null and undefined is removed from type of obj in false branch.
	// When operator is != and type of value is null or undefined, null and undefined is removed from type of obj in true branch.
	equalsOperator := operator == ast.KindEqualsEqualsToken || operator == ast.KindEqualsEqualsEqualsToken
	var nullableFlags TypeFlags
	if operator == ast.KindEqualsEqualsToken || operator == ast.KindExclamationEqualsToken {
		nullableFlags = TypeFlagsNullable
	} else {
		nullableFlags = TypeFlagsUndefined
	}
	valueType := c.getTypeOfExpression(value)
	// Note that we include any and unknown in the exclusion test because their domain includes null and undefined.
	removeNullable := equalsOperator != assumeTrue && everyType(valueType, func(t *Type) bool { return t.flags&nullableFlags != 0 }) ||
		equalsOperator == assumeTrue && everyType(valueType, func(t *Type) bool { return t.flags&(TypeFlagsAnyOrUnknown|nullableFlags) == 0 })
	if removeNullable {
		return c.getAdjustedTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	}
	return t
}

func (c *Checker) getTypeAtSwitchClause(f *FlowState, flow *ast.FlowNode) FlowType {
	data := flow.Node.AsFlowSwitchClauseData()
	expr := ast.SkipParentheses(data.SwitchStatement.Expression())
	flowType := c.getTypeAtFlowNode(f, flow.Antecedent)
	t := flowType.t
	switch {
	case c.isMatchingReference(f.reference, expr):
		t = c.narrowTypeBySwitchOnDiscriminant(t, data)
	case expr.Kind == ast.KindTypeOfExpression && c.isMatchingReference(f.reference, expr.Expression()):
		t = c.narrowTypeBySwitchOnTypeOf(t, data)
	case expr.Kind == ast.KindTrueKeyword:
		t = c.narrowTypeBySwitchOnTrue(f, t, data)
	default:
		if c.strictNullChecks {
			if c.optionalChainContainsReference(expr, f.reference) {
				t = c.narrowTypeBySwitchOptionalChainContainment(t, data, func(t *Type) bool {
					return t.flags&(TypeFlagsUndefined|TypeFlagsNever) == 0
				})
			} else if ast.IsTypeOfExpression(expr) && c.optionalChainContainsReference(expr.Expression(), f.reference) {
				t = c.narrowTypeBySwitchOptionalChainContainment(t, data, func(t *Type) bool {
					return !(t.flags&TypeFlagsNever != 0 || t.flags&TypeFlagsStringLiteral != 0 && getStringLiteralValue(t) == "undefined")
				})
			}
		}
		access := c.getDiscriminantPropertyAccess(f, expr, t)
		if access != nil {
			t = c.narrowTypeBySwitchOnDiscriminantProperty(t, access, data)
		}
	}
	return c.newFlowType(t, flowType.incomplete)
}

func (c *Checker) narrowTypeBySwitchOnDiscriminant(t *Type, data *ast.FlowSwitchClauseData) *Type {
	// We only narrow if all case expressions specify
	// values with unit types, except for the case where
	// `type` is unknown. In this instance we map object
	// types to the nonPrimitive type and narrow with that.
	switchTypes := c.getSwitchClauseTypes(data.SwitchStatement)
	if len(switchTypes) == 0 {
		return t
	}
	clauseTypes := switchTypes[data.ClauseStart:data.ClauseEnd]
	hasDefaultClause := data.ClauseStart == data.ClauseEnd || slices.Contains(clauseTypes, c.neverType)
	if (t.flags&TypeFlagsUnknown != 0) && !hasDefaultClause {
		var groundClauseTypes []*Type
		for i, s := range clauseTypes {
			if s.flags&(TypeFlagsPrimitive|TypeFlagsNonPrimitive) != 0 {
				if groundClauseTypes != nil {
					groundClauseTypes = append(groundClauseTypes, s)
				}
			} else if s.flags&TypeFlagsObject != 0 {
				if groundClauseTypes == nil {
					groundClauseTypes = clauseTypes[:i:i]
				}
				groundClauseTypes = append(groundClauseTypes, c.nonPrimitiveType)
			} else {
				return t
			}
		}
		return c.getUnionType(core.IfElse(groundClauseTypes == nil, clauseTypes, groundClauseTypes))
	}
	discriminantType := c.getUnionType(clauseTypes)
	var caseType *Type
	if discriminantType.flags&TypeFlagsNever != 0 {
		caseType = c.neverType
	} else {
		filtered := c.filterType(t, func(t *Type) bool { return c.areTypesComparable(discriminantType, t) })
		caseType = c.replacePrimitivesWithLiterals(filtered, discriminantType)
	}
	if !hasDefaultClause {
		return caseType
	}
	defaultType := c.filterType(t, func(t *Type) bool {
		if !c.isUnitLikeType(t) {
			return true
		}
		u := c.undefinedType
		if t.flags&TypeFlagsUndefined == 0 {
			u = c.getRegularTypeOfLiteralType(c.extractUnitType(t))
		}
		return !slices.Contains(switchTypes, u)
	})
	if caseType.flags&TypeFlagsNever != 0 {
		return defaultType
	}
	return c.getUnionType([]*Type{caseType, defaultType})
}

func (c *Checker) narrowTypeBySwitchOnTypeOf(t *Type, data *ast.FlowSwitchClauseData) *Type {
	witnesses := c.getSwitchClauseTypeOfWitnesses(data.SwitchStatement)
	if witnesses == nil {
		return t
	}
	clauses := data.SwitchStatement.AsSwitchStatement().CaseBlock.AsCaseBlock().Clauses.Nodes
	// Equal start and end denotes implicit fallthrough; undefined marks explicit default clause.
	defaultIndex := core.FindIndex(clauses, func(clause *ast.Node) bool {
		return clause.Kind == ast.KindDefaultClause
	})
	clauseStart := int(data.ClauseStart)
	clauseEnd := int(data.ClauseEnd)
	hasDefaultClause := clauseStart == clauseEnd || (defaultIndex >= clauseStart && defaultIndex < clauseEnd)
	if hasDefaultClause {
		// In the default clause we filter constituents down to those that are not-equal to all handled cases.
		notEqualFacts := c.getNotEqualFactsFromTypeofSwitch(clauseStart, clauseEnd, witnesses)
		return c.filterType(t, func(t *Type) bool {
			return c.getTypeFacts(t, notEqualFacts) == notEqualFacts
		})
	}
	// In the non-default cause we create a union of the type narrowed by each of the listed cases.
	clauseWitnesses := witnesses[clauseStart:clauseEnd]
	return c.getUnionType(core.Map(clauseWitnesses, func(text string) *Type {
		if text != "" {
			return c.narrowTypeByTypeName(t, text)
		}
		return c.neverType
	}))
}

func (c *Checker) narrowTypeBySwitchOnTrue(f *FlowState, t *Type, data *ast.FlowSwitchClauseData) *Type {
	clauses := data.SwitchStatement.AsSwitchStatement().CaseBlock.AsCaseBlock().Clauses.Nodes
	defaultIndex := core.FindIndex(clauses, func(clause *ast.Node) bool {
		return clause.Kind == ast.KindDefaultClause
	})
	clauseStart := int(data.ClauseStart)
	clauseEnd := int(data.ClauseEnd)
	hasDefaultClause := clauseStart == clauseEnd || (defaultIndex >= clauseStart && defaultIndex < clauseEnd)
	// First, narrow away all of the cases that preceded this set of cases.
	for i := range clauseStart {
		clause := clauses[i]
		if clause.Kind == ast.KindCaseClause {
			t = c.narrowType(f, t, clause.Expression(), false /*assumeTrue*/)
		}
	}
	// If our current set has a default, then none the other cases were hit either.
	// There's no point in narrowing by the other cases in the set, since we can
	// get here through other paths.
	if hasDefaultClause {
		for i := clauseEnd; i < len(clauses); i++ {
			clause := clauses[i]
			if clause.Kind == ast.KindCaseClause {
				t = c.narrowType(f, t, clause.Expression(), false /*assumeTrue*/)
			}
		}
		return t
	}
	// Now, narrow based on the cases in this set.
	return c.getUnionType(core.Map(clauses[clauseStart:clauseEnd], func(clause *ast.Node) *Type {
		if clause.Kind == ast.KindCaseClause {
			return c.narrowType(f, t, clause.Expression(), true /*assumeTrue*/)
		}
		return c.neverType
	}))
}

func (c *Checker) narrowTypeBySwitchOptionalChainContainment(t *Type, data *ast.FlowSwitchClauseData, clauseCheck func(t *Type) bool) *Type {
	everyClauseChecks := data.ClauseStart != data.ClauseEnd && core.Every(c.getSwitchClauseTypes(data.SwitchStatement)[data.ClauseStart:data.ClauseEnd], clauseCheck)
	if everyClauseChecks {
		return c.getTypeWithFacts(t, TypeFactsNEUndefinedOrNull)
	}
	return t
}

func (c *Checker) narrowTypeBySwitchOnDiscriminantProperty(t *Type, access *ast.Node, data *ast.FlowSwitchClauseData) *Type {
	if data.ClauseStart < data.ClauseEnd && t.flags&TypeFlagsUnion != 0 {
		accessedName, _ := c.getAccessedPropertyName(access)
		if accessedName != "" && c.getKeyPropertyName(t) == accessedName {
			clauseTypes := c.getSwitchClauseTypes(data.SwitchStatement)[data.ClauseStart:data.ClauseEnd]
			candidate := c.getUnionType(core.Map(clauseTypes, func(s *Type) *Type {
				result := c.getConstituentTypeForKeyType(t, s)
				if result != nil {
					return result
				}
				return c.unknownType
			}))
			if candidate != c.unknownType {
				return candidate
			}
		}
	}
	return c.narrowTypeByDiscriminant(t, access, func(t *Type) *Type {
		return c.narrowTypeBySwitchOnDiscriminant(t, data)
	})
}

func (c *Checker) getTypeAtFlowBranchLabel(f *FlowState, flow *ast.FlowNode, antecedents *ast.FlowList) FlowType {
	antecedentStart := len(c.antecedentTypes)
	subtypeReduction := false
	seenIncomplete := false
	var bypassFlow *ast.FlowNode
	for list := antecedents; list != nil; list = list.Next {
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
			c.antecedentTypes = c.antecedentTypes[:antecedentStart]
			return FlowType{t: flowType.t}
		}
		if !slices.Contains(c.antecedentTypes[antecedentStart:], flowType.t) {
			c.antecedentTypes = append(c.antecedentTypes, flowType.t)
		}
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
		if flowType.t.flags&TypeFlagsNever == 0 && !slices.Contains(c.antecedentTypes[antecedentStart:], flowType.t) && !c.isExhaustiveSwitchStatement(bypassFlow.Node.AsFlowSwitchClauseData().SwitchStatement) {
			if flowType.t == f.declaredType && f.declaredType == f.initialType {
				c.antecedentTypes = c.antecedentTypes[:antecedentStart]
				return FlowType{t: flowType.t}
			}
			c.antecedentTypes = append(c.antecedentTypes, flowType.t)
			if !c.isTypeSubsetOf(flowType.t, f.initialType) {
				subtypeReduction = true
			}
			if flowType.incomplete {
				seenIncomplete = true
			}
		}
	}
	result := c.newFlowType(c.getUnionOrEvolvingArrayType(f, c.antecedentTypes[antecedentStart:], core.IfElse(subtypeReduction, UnionReductionSubtype, UnionReductionLiteral)), seenIncomplete)
	c.antecedentTypes = c.antecedentTypes[:antecedentStart]
	return result
}

// At flow control branch or loop junctions, if the type along every antecedent code path
// is an evolving array type, we construct a combined evolving array type. Otherwise we
// finalize all evolving array types.
func (c *Checker) getUnionOrEvolvingArrayType(f *FlowState, types []*Type, subtypeReduction UnionReduction) *Type {
	if isEvolvingArrayTypeList(types) {
		return c.getEvolvingArrayType(c.getUnionType(core.Map(types, c.getElementTypeOfEvolvingArrayType)))
	}
	result := c.recombineUnknownType(c.getUnionTypeEx(core.SameMap(types, c.finalizeEvolvingArrayType), subtypeReduction, nil, nil))
	if result != f.declaredType && result.flags&f.declaredType.flags&TypeFlagsUnion != 0 && slices.Equal(result.AsUnionType().types, f.declaredType.AsUnionType().types) {
		return f.declaredType
	}
	return result
}

func (c *Checker) getTypeAtFlowLoopLabel(f *FlowState, flow *ast.FlowNode) FlowType {
	if f.refKey == "" {
		f.refKey = c.getFlowReferenceKey(f)
	}
	if f.refKey == "?" {
		// No cache key is generated when binding patterns are in unnarrowable situations
		return FlowType{t: f.declaredType}
	}
	key := FlowLoopKey{flowNode: flow, refKey: f.refKey}
	// If we have previously computed the control flow type for the reference at
	// this flow loop junction, return the cached type.
	if cached := c.flowLoopCache[key]; cached != nil {
		return FlowType{t: cached}
	}
	// If this flow loop junction and reference are already being processed, return
	// the union of the types computed for each branch so far, marked as incomplete.
	// It is possible to see an empty array in cases where loops are nested and the
	// back edge of the outer loop reaches an inner loop that is already being analyzed.
	// In such cases we restart the analysis of the inner loop, which will then see
	// a non-empty in-process array for the outer loop and eventually terminate because
	// the first antecedent of a loop junction is always the non-looping control flow
	// path that leads to the top.
	for _, loopInfo := range c.flowLoopStack {
		if loopInfo.key == key && len(loopInfo.types) != 0 {
			return c.newFlowType(c.getUnionOrEvolvingArrayType(f, loopInfo.types, UnionReductionLiteral), true /*incomplete*/)
		}
	}
	// Add the flow loop junction and reference to the in-process stack and analyze
	// each antecedent code path.
	antecedentTypes := make([]*Type, 0, 4)
	subtypeReduction := false
	var firstAntecedentType FlowType
	for list := flow.Antecedents; list != nil; list = list.Next {
		var flowType FlowType
		if firstAntecedentType.isNil() {
			// The first antecedent of a loop junction is always the non-looping control
			// flow path that leads to the top.
			firstAntecedentType = c.getTypeAtFlowNode(f, list.Flow)
			flowType = firstAntecedentType
		} else {
			// All but the first antecedent are the looping control flow paths that lead
			// back to the loop junction. We track these on the flow loop stack.
			c.flowLoopStack = append(c.flowLoopStack, FlowLoopInfo{key: key, types: antecedentTypes})
			saveFlowTypeCache := c.flowTypeCache
			c.flowTypeCache = nil
			flowType = c.getTypeAtFlowNode(f, list.Flow)
			c.flowTypeCache = saveFlowTypeCache
			c.flowLoopStack = c.flowLoopStack[:len(c.flowLoopStack)-1]
			// If we see a value appear in the cache it is a sign that control flow analysis
			// was restarted and completed by checkExpressionCached. We can simply pick up
			// the resulting type and bail out.
			if cached := c.flowLoopCache[key]; cached != nil {
				return FlowType{t: cached}
			}
		}
		antecedentTypes = core.AppendIfUnique(antecedentTypes, flowType.t)
		// If an antecedent type is not a subset of the declared type, we need to perform
		// subtype reduction. This happens when a "foreign" type is injected into the control
		// flow using the instanceof operator or a user defined type predicate.
		if !c.isTypeSubsetOf(flowType.t, f.initialType) {
			subtypeReduction = true
		}
		// If the type at a particular antecedent path is the declared type there is no
		// reason to process more antecedents since the only possible outcome is subtypes
		// that will be removed in the final union type anyway.
		if flowType.t == f.declaredType {
			break
		}
	}
	// The result is incomplete if the first antecedent (the non-looping control flow path)
	// is incomplete.
	result := c.getUnionOrEvolvingArrayType(f, antecedentTypes, core.IfElse(subtypeReduction, UnionReductionSubtype, UnionReductionLiteral))
	if firstAntecedentType.incomplete {
		return c.newFlowType(result, true /*incomplete*/)
	}
	c.flowLoopCache[key] = result
	return FlowType{t: result}
}

func (c *Checker) getTypeAtFlowArrayMutation(f *FlowState, flow *ast.FlowNode) FlowType {
	if f.declaredType == c.autoType || f.declaredType == c.autoArrayType {
		node := flow.Node
		var expr *ast.Node
		if ast.IsCallExpression(node) {
			expr = node.Expression().Expression()
		} else {
			expr = node.AsBinaryExpression().Left.Expression()
		}
		if c.isMatchingReference(f.reference, c.getReferenceCandidate(expr)) {
			flowType := c.getTypeAtFlowNode(f, flow.Antecedent)
			if flowType.t.objectFlags&ObjectFlagsEvolvingArray != 0 {
				evolvedType := flowType.t
				if ast.IsCallExpression(node) {
					for _, arg := range node.Arguments() {
						evolvedType = c.addEvolvingArrayElementType(evolvedType, arg)
					}
				} else {
					// We must get the context free expression type so as to not recur in an uncached fashion on the LHS (which causes exponential blowup in compile time)
					indexType := c.getContextFreeTypeOfExpression(node.AsBinaryExpression().Left.AsElementAccessExpression().ArgumentExpression)
					if c.isTypeAssignableToKind(indexType, TypeFlagsNumberLike) {
						evolvedType = c.addEvolvingArrayElementType(evolvedType, node.AsBinaryExpression().Right)
					}
				}
				return c.newFlowType(evolvedType, flowType.incomplete)
			}
			return flowType
		}
	}
	return FlowType{}
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
	case ast.IsBindingPattern(f.reference) || ast.IsFunctionExpressionOrArrowFunction(f.reference) || ast.IsObjectLiteralMethod(f.reference):
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
		result = c.newObjectType(ObjectFlagsEvolvingArray, nil)
		result.AsEvolvingArrayType().elementType = elementType
		c.cachedTypes[key] = result
	}
	return result
}

func (c *Checker) getElementTypeOfEvolvingArrayType(t *Type) *Type {
	if t.objectFlags&ObjectFlagsEvolvingArray != 0 {
		return t.AsEvolvingArrayType().elementType
	}
	return c.neverType
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
	root := c.getReferenceRoot(node)
	parent := root.Parent
	isLengthPushOrUnshift := ast.IsPropertyAccessExpression(parent) && (parent.Name().Text() == "length" ||
		ast.IsCallExpression(parent.Parent) && ast.IsIdentifier(parent.Name()) && ast.IsPushOrUnshiftIdentifier(parent.Name()))
	isElementAssignment := ast.IsElementAccessExpression(parent) && parent.Expression() == root &&
		ast.IsBinaryExpression(parent.Parent) && parent.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&
		parent.Parent.AsBinaryExpression().Left == parent && !ast.IsAssignmentTarget(parent.Parent) &&
		c.isTypeAssignableToKind(c.getTypeOfExpression(parent.AsElementAccessExpression().ArgumentExpression), TypeFlagsNumberLike)
	return isLengthPushOrUnshift || isElementAssignment
}

// When adding evolving array element types we do not perform subtype reduction. Instead,
// we defer subtype reduction until the evolving array type is finalized into a manifest
// array type.
func (c *Checker) addEvolvingArrayElementType(evolvingArrayType *Type, node *ast.Node) *Type {
	newElementType := c.getRegularTypeOfObjectLiteral(c.getBaseTypeOfLiteralType(c.getContextFreeTypeOfExpression(node)))
	elementType := evolvingArrayType.AsEvolvingArrayType().elementType
	if c.isTypeSubsetOf(newElementType, elementType) {
		return evolvingArrayType
	}
	return c.getEvolvingArrayType(c.getUnionType([]*Type{elementType, newElementType}))
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
	span := scanner.GetRangeOfTokenAtPosition(sourceFile, ast.GetStatementsOfBlock(block).Pos())
	c.diagnostics.Add(ast.NewDiagnostic(sourceFile, span, diagnostics.The_containing_function_or_module_body_is_too_large_for_control_flow_analysis))
}

func (c *Checker) isMatchingReference(source *ast.Node, target *ast.Node) bool {
	switch target.Kind {
	case ast.KindParenthesizedExpression, ast.KindNonNullExpression:
		return c.isMatchingReference(source, target.Expression())
	case ast.KindBinaryExpression:
		return ast.IsAssignmentExpression(target, false) && c.isMatchingReference(source, target.AsBinaryExpression().Left) ||
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
		if ast.IsAccessExpression(target) {
			if targetPropertyName, ok := c.getAccessedPropertyName(target); ok {
				return source.AsQualifiedName().Right.Text() == targetPropertyName && c.isMatchingReference(source.AsQualifiedName().Left, target.Expression())
			}
		}
	case ast.KindBinaryExpression:
		return ast.IsBinaryExpression(source) && source.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken && c.isMatchingReference(source.AsBinaryExpression().Right, target)
	}
	return false
}

// Return the flow cache key for a "dotted name" (i.e. a sequence of identifiers
// separated by dots). The key consists of the id of the symbol referenced by the
// leftmost identifier followed by zero or more property names separated by dots.
// The result is an empty string if the reference isn't a dotted name.
func (c *Checker) getFlowReferenceKey(f *FlowState) string {
	var b KeyBuilder
	if c.writeFlowCacheKey(&b, f.reference, f.declaredType, f.initialType, f.flowContainer) {
		return b.String()
	}
	return "?" // Reference isn't a dotted name
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
			b.WriteNode(flowContainer)
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
		b.WriteNode(node)
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
	case ast.IsStringOrNumericLiteralLike(node.ArgumentExpression):
		return node.ArgumentExpression.Text(), true
	case ast.IsEntityNameExpression(node.ArgumentExpression):
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
	t := c.tryGetTypeFromTypeNode(declaration)
	if t != nil {
		if name, ok := tryGetNameFromType(t); ok {
			return name, true
		}
	}
	if hasOnlyExpressionInitializer(declaration) && c.isBlockScopedNameDeclaredBeforeUse(declaration, node) {
		initializer := declaration.Initializer()
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
			return ast.TryGetTextOfPropertyName(declaration.Name())
		}
	}
	return "", false
}

func tryGetNameFromType(t *Type) (string, bool) {
	switch {
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name, true
	case t.flags&TypeFlagsStringOrNumberLiteral != 0:
		return evaluator.AnyToString(t.AsLiteralType().value), true
	}
	return "", false
}

func (c *Checker) getDestructuringPropertyName(node *ast.Node) (string, bool) {
	parent := node.Parent
	if ast.IsBindingElement(node) && ast.IsObjectBindingPattern(parent) {
		return c.getLiteralPropertyNameText(getBindingElementPropertyName(node))
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
		return evaluator.AnyToString(t.AsLiteralType().value), true
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
			symbol := c.getResolvedSymbolOrNil(node)
			if symbol != nil {
				return c.isReadonlySymbol(symbol)
			}
		}
	case ast.KindObjectBindingPattern, ast.KindArrayBindingPattern:
		rootDeclaration := ast.GetRootDeclaration(node.Parent)
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

func (c *Checker) getReferenceRoot(node *ast.Node) *ast.Node {
	parent := node.Parent
	if ast.IsParenthesizedExpression(parent) ||
		ast.IsBinaryExpression(parent) && parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken && parent.AsBinaryExpression().Left == node ||
		ast.IsBinaryExpression(parent) && parent.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken && parent.AsBinaryExpression().Right == node {
		return c.getReferenceRoot(parent)
	}
	return node
}

func (c *Checker) hasMatchingArgument(expression *ast.Node, reference *ast.Node) bool {
	for _, argument := range expression.Arguments() {
		if c.isOrContainsMatchingReference(reference, argument) || c.optionalChainContainsReference(argument, reference) {
			return true
		}
	}
	if ast.IsPropertyAccessExpression(expression.Expression()) && c.isOrContainsMatchingReference(reference, expression.Expression().Expression()) {
		return true
	}
	return false
}

func (c *Checker) isOrContainsMatchingReference(source *ast.Node, target *ast.Node) bool {
	return c.isMatchingReference(source, target) || c.containsMatchingReference(source, target)
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

func (c *Checker) isExhaustiveSwitchStatement(node *ast.Node) bool {
	links := c.switchStatementLinks.Get(node)
	if links.exhaustiveState == ExhaustiveStateUnknown {
		// Indicate resolution is in process
		links.exhaustiveState = ExhaustiveStateComputing
		isExhaustive := c.computeExhaustiveSwitchStatement(node)
		if links.exhaustiveState == ExhaustiveStateComputing {
			links.exhaustiveState = core.IfElse(isExhaustive, ExhaustiveStateTrue, ExhaustiveStateFalse)
		}
	} else if links.exhaustiveState == ExhaustiveStateComputing {
		// Resolve circularity to false
		links.exhaustiveState = ExhaustiveStateFalse
	}
	return links.exhaustiveState == ExhaustiveStateTrue
}

func (c *Checker) computeExhaustiveSwitchStatement(node *ast.Node) bool {
	if ast.IsTypeOfExpression(node.Expression()) {
		witnesses := c.getSwitchClauseTypeOfWitnesses(node)
		if witnesses == nil {
			return false
		}
		operandConstraint := c.getBaseConstraintOrType(c.checkExpressionCached(node.Expression().Expression()))
		// Get the not-equal flags for all handled cases.
		notEqualFacts := c.getNotEqualFactsFromTypeofSwitch(0, 0, witnesses)
		if operandConstraint.flags&TypeFlagsAnyOrUnknown != 0 {
			// We special case the top types to be exhaustive when all cases are handled.
			return TypeFactsAllTypeofNE&notEqualFacts == TypeFactsAllTypeofNE
		}
		// A missing not-equal flag indicates that the type wasn't handled by some case.
		return !someType(operandConstraint, func(t *Type) bool {
			return c.getTypeFacts(t, notEqualFacts) == notEqualFacts
		})
	}
	t := c.checkExpressionCached(node.Expression())
	if !isLiteralType(t) {
		return false
	}
	switchTypes := c.getSwitchClauseTypes(node)
	if len(switchTypes) == 0 || core.Some(switchTypes, isNeitherUnitTypeNorNever) {
		return false
	}
	return c.eachTypeContainedIn(c.mapType(t, c.getRegularTypeOfLiteralType), switchTypes)
}

func (c *Checker) eachTypeContainedIn(source *Type, types []*Type) bool {
	if source.flags&TypeFlagsUnion != 0 {
		return !core.Some(source.AsUnionType().types, func(t *Type) bool {
			return !slices.Contains(types, t)
		})
	}
	return slices.Contains(types, source)
}

// Get the type names from all cases in a switch on `typeof`. The default clause and/or duplicate type names are
// represented as empty strings. Return nil if one or more case clause expressions are not string literals.
func (c *Checker) getSwitchClauseTypeOfWitnesses(node *ast.Node) []string {
	links := c.switchStatementLinks.Get(node)
	if !links.witnessesComputed {
		clauses := node.AsSwitchStatement().CaseBlock.AsCaseBlock().Clauses.Nodes
		witnesses := make([]string, len(clauses))
		for i, clause := range clauses {
			if clause.Kind == ast.KindCaseClause {
				var text string
				if ast.IsStringLiteralLike(clause.Expression()) {
					text = clause.Expression().Text()
				}
				if text == "" {
					witnesses = nil
					break
				}
				if !slices.Contains(witnesses, text) {
					witnesses[i] = text
				}
			}
		}
		links.witnesses = witnesses
		links.witnessesComputed = true
	}
	return links.witnesses
}

// Return the combined not-equal type facts for all cases except those between the start and end indices.
func (c *Checker) getNotEqualFactsFromTypeofSwitch(start int, end int, witnesses []string) TypeFacts {
	var facts TypeFacts = TypeFactsNone
	for i, witness := range witnesses {
		if (i < start || i >= end) && witness != "" {
			f, ok := typeofNEFacts[witness]
			if !ok {
				f = TypeFactsTypeofNEHostObject
			}
			facts |= f
		}
	}
	return facts
}

func (c *Checker) getSwitchClauseTypes(node *ast.Node) []*Type {
	links := c.switchStatementLinks.Get(node)
	if !links.switchTypesComputed {
		clauses := node.AsSwitchStatement().CaseBlock.AsCaseBlock().Clauses.Nodes
		types := make([]*Type, len(clauses))
		for i, clause := range clauses {
			types[i] = c.getTypeOfSwitchClause(clause)
		}
		links.switchTypes = types
		links.switchTypesComputed = true
	}
	return links.switchTypes
}

func (c *Checker) getTypeOfSwitchClause(clause *ast.Node) *Type {
	if clause.Kind == ast.KindCaseClause {
		return c.getRegularTypeOfLiteralType(c.getTypeOfExpression(clause.Expression()))
	}
	return c.neverType
}

func (c *Checker) getEffectsSignature(node *ast.Node) *Signature {
	links := c.signatureLinks.Get(node)
	signature := links.effectsSignature
	if signature == nil {
		// A call expression parented by an expression statement is a potential assertion. Other call
		// expressions are potential type predicate function calls. In order to avoid triggering
		// circularities in control flow analysis, we use getTypeOfDottedName when resolving the call
		// target expression of an assertion.
		var funcType *Type
		if ast.IsBinaryExpression(node) {
			rightType := c.checkNonNullExpression(node.AsBinaryExpression().Right)
			funcType = c.getSymbolHasInstanceMethodOfObjectType(rightType)
		} else if ast.IsExpressionStatement(node.Parent) {
			funcType = c.getTypeOfDottedName(node.Expression(), nil /*diagnostic*/)
		} else if node.Expression().Kind != ast.KindSuperKeyword {
			if ast.IsOptionalChain(node) {
				funcType = c.checkNonNullType(c.getOptionalExpressionType(c.checkExpression(node.Expression()), node.Expression()), node.Expression())
			} else {
				funcType = c.checkNonNullExpression(node.Expression())
			}
		}
		var apparentType *Type
		if funcType != nil {
			apparentType = c.getApparentType(funcType)
		}
		signatures := c.getSignaturesOfType(core.OrElse(apparentType, c.unknownType), SignatureKindCall)
		switch {
		case len(signatures) == 1 && signatures[0].typeParameters == nil:
			signature = signatures[0]
		case core.Some(signatures, c.hasTypePredicateOrNeverReturnType):
			signature = c.getResolvedSignature(node, nil, CheckModeNormal)
		}
		if !(signature != nil && c.hasTypePredicateOrNeverReturnType(signature)) {
			signature = c.unknownSignature
		}
		links.effectsSignature = signature
	}
	if signature == c.unknownSignature {
		return nil
	}
	return signature
}

/**
 * Get the type of the `[Symbol.hasInstance]` method of an object type.
 */
func (c *Checker) getSymbolHasInstanceMethodOfObjectType(t *Type) *Type {
	hasInstancePropertyName := c.getPropertyNameForKnownSymbolName("hasInstance")
	if c.allTypesAssignableToKind(t, TypeFlagsNonPrimitive) {
		hasInstanceProperty := c.getPropertyOfType(t, hasInstancePropertyName)
		if hasInstanceProperty != nil {
			hasInstancePropertyType := c.getTypeOfSymbol(hasInstanceProperty)
			if hasInstancePropertyType != nil && len(c.getSignaturesOfType(hasInstancePropertyType, SignatureKindCall)) != 0 {
				return hasInstancePropertyType
			}
		}
	}
	return nil
}

func (c *Checker) getPropertyNameForKnownSymbolName(symbolName string) string {
	ctorType := c.getGlobalESSymbolConstructorSymbolOrNil()
	if ctorType != nil {
		uniqueType := c.getTypeOfPropertyOfType(c.getTypeOfSymbol(ctorType), symbolName)
		if uniqueType != nil && isTypeUsableAsPropertyName(uniqueType) {
			return getPropertyNameFromType(uniqueType)
		}
	}
	return ast.InternalSymbolNamePrefix + "@" + symbolName
}

// We require the dotted function name in an assertion expression to be comprised of identifiers
// that reference function, method, class or value module symbols; or variable, property or
// parameter symbols with declarations that have explicit type annotations. Such references are
// resolvable with no possibility of triggering circularities in control flow analysis.
func (c *Checker) getTypeOfDottedName(node *ast.Node, diagnostic *ast.Diagnostic) *Type {
	if node.Flags&ast.NodeFlagsInWithStatement == 0 {
		switch node.Kind {
		case ast.KindIdentifier:
			symbol := c.getExportSymbolOfValueSymbolIfExported(c.getResolvedSymbol(node))
			return c.getExplicitTypeOfSymbol(symbol, diagnostic)
		case ast.KindThisKeyword:
			return c.getExplicitThisType(node)
		case ast.KindSuperKeyword:
			return c.checkSuperExpression(node)
		case ast.KindPropertyAccessExpression:
			t := c.getTypeOfDottedName(node.AsPropertyAccessExpression().Expression, diagnostic)
			if t != nil {
				name := node.Name()
				var prop *ast.Symbol
				if ast.IsPrivateIdentifier(name) {
					if t.symbol != nil {
						prop = c.getPropertyOfType(t, binder.GetSymbolNameForPrivateIdentifier(t.symbol, name.Text()))
					}
				} else {
					prop = c.getPropertyOfType(t, name.Text())
				}
				if prop != nil {
					return c.getExplicitTypeOfSymbol(prop, diagnostic)
				}
			}
		case ast.KindParenthesizedExpression:
			return c.getTypeOfDottedName(node.AsParenthesizedExpression().Expression, diagnostic)
		}
	}
	return nil
}

func (c *Checker) getExplicitTypeOfSymbol(symbol *ast.Symbol, diagnostic *ast.Diagnostic) *Type {
	symbol = c.resolveSymbol(symbol)
	if symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod|ast.SymbolFlagsClass|ast.SymbolFlagsValueModule) != 0 {
		return c.getTypeOfSymbol(symbol)
	}
	if symbol.Flags&(ast.SymbolFlagsVariable|ast.SymbolFlagsProperty) != 0 {
		if symbol.CheckFlags&ast.CheckFlagsMapped != 0 {
			origin := c.mappedSymbolLinks.Get(symbol).syntheticOrigin
			if origin != nil && c.getExplicitTypeOfSymbol(origin, diagnostic) != nil {
				return c.getTypeOfSymbol(symbol)
			}
		}
		declaration := symbol.ValueDeclaration
		if declaration != nil {
			if c.isDeclarationWithExplicitTypeAnnotation(declaration) {
				return c.getTypeOfSymbol(symbol)
			}
			if ast.IsVariableDeclaration(declaration) && ast.IsForOfStatement(declaration.Parent.Parent) {
				statement := declaration.Parent.Parent
				expressionType := c.getTypeOfDottedName(statement.Expression(), nil /*diagnostic*/)
				if expressionType != nil {
					var use IterationUse
					if statement.AsForInOrOfStatement().AwaitModifier != nil {
						use = IterationUseForAwaitOf
					} else {
						use = IterationUseForOf
					}
					return c.checkIteratedTypeOrElementType(use, expressionType, c.undefinedType, nil /*errorNode*/)
				}
			}
			if diagnostic != nil {
				diagnostic.AddRelatedInfo(createDiagnosticForNode(declaration, diagnostics.X_0_needs_an_explicit_type_annotation, c.symbolToString(symbol)))
			}
		}
	}
	return nil
}

func (c *Checker) isDeclarationWithExplicitTypeAnnotation(node *ast.Node) bool {
	return (ast.IsVariableDeclaration(node) || ast.IsPropertyDeclaration(node) || ast.IsPropertySignatureDeclaration(node) || ast.IsParameter(node)) && node.Type() != nil
}

func (c *Checker) hasTypePredicateOrNeverReturnType(sig *Signature) bool {
	return c.getTypePredicateOfSignature(sig) != nil || sig.declaration != nil && core.OrElse(c.getReturnTypeFromAnnotation(sig.declaration), c.unknownType).flags&TypeFlagsNever != 0
}

func (c *Checker) getExplicitThisType(node *ast.Node) *Type {
	container := ast.GetThisContainer(node, false /*includeArrowFunctions*/, false /*includeClassComputedPropertyName*/)
	if ast.IsFunctionLike(container) {
		signature := c.getSignatureFromDeclaration(container)
		if signature.thisParameter != nil {
			return c.getExplicitTypeOfSymbol(signature.thisParameter, nil)
		}
	}
	if container.Parent != nil && ast.IsClassLike(container.Parent) {
		symbol := c.getSymbolOfDeclaration(container.Parent)
		if ast.IsStatic(container) {
			return c.getTypeOfSymbol(symbol)
		} else {
			return c.getDeclaredTypeOfSymbol(symbol).AsInterfaceType().thisType
		}
	}
	return nil
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
	if c.typeNodeLinks.Has(node) {
		t := c.typeNodeLinks.Get(node).resolvedType
		if t != nil {
			return t
		}
	}
	return c.getTypeOfExpression(node)
}

func (c *Checker) getInitialTypeOfBindingElement(node *ast.Node) *Type {
	pattern := node.Parent
	parentType := c.getInitialType(pattern.Parent)
	var t *Type
	switch {
	case ast.IsObjectBindingPattern(pattern):
		t = c.getTypeOfDestructuredProperty(parentType, getBindingElementPropertyName(node))
	case !hasDotDotDotToken(node):
		t = c.getTypeOfDestructuredArrayElement(parentType, slices.Index(pattern.AsBindingPattern().Elements.Nodes, node))
	default:
		t = c.getTypeOfDestructuredSpreadExpression(parentType)
	}
	return c.getTypeWithDefault(t, node.Initializer())
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
	case ast.KindArrayLiteralExpression:
		return c.getAssignedTypeOfArrayLiteralElement(parent, node)
	case ast.KindSpreadElement:
		return c.getAssignedTypeOfSpreadExpression(parent)
	case ast.KindPropertyAssignment:
		return c.getAssignedTypeOfPropertyAssignment(parent)
	case ast.KindShorthandPropertyAssignment:
		return c.getAssignedTypeOfShorthandPropertyAssignment(parent)
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

func (c *Checker) getAssignedTypeOfArrayLiteralElement(node *ast.Node, element *ast.Node) *Type {
	return c.getTypeOfDestructuredArrayElement(c.getAssignedType(node), slices.Index(node.AsArrayLiteralExpression().Elements.Nodes, element))
}

func (c *Checker) getTypeOfDestructuredArrayElement(t *Type, index int) *Type {
	if everyType(t, c.isTupleLikeType) {
		if elementType := c.getTupleElementType(t, index); elementType != nil {
			return elementType
		}
	}
	if elementType := c.checkIteratedTypeOrElementType(IterationUseDestructuring, t, c.undefinedType, nil /*errorNode*/); elementType != nil {
		return c.includeUndefinedInIndexSignature(elementType)
	}
	return c.errorType
}

func (c *Checker) includeUndefinedInIndexSignature(t *Type) *Type {
	if c.compilerOptions.NoUncheckedIndexedAccess == core.TSTrue {
		return c.getUnionType([]*Type{t, c.missingType})
	}
	return t
}

func (c *Checker) getAssignedTypeOfSpreadExpression(node *ast.Node) *Type {
	return c.getTypeOfDestructuredSpreadExpression(c.getAssignedType(node.Parent))
}

func (c *Checker) getTypeOfDestructuredSpreadExpression(t *Type) *Type {
	elementType := c.checkIteratedTypeOrElementType(IterationUseDestructuring, t, c.undefinedType, nil /*errorNode*/)
	if elementType == nil {
		elementType = c.errorType
	}
	return c.createArrayType(elementType)
}

func (c *Checker) getAssignedTypeOfPropertyAssignment(node *ast.Node) *Type {
	return c.getTypeOfDestructuredProperty(c.getAssignedType(node.Parent), node.Name())
}

func (c *Checker) getTypeOfDestructuredProperty(t *Type, name *ast.Node) *Type {
	nameType := c.getLiteralTypeFromPropertyName(name)
	if !isTypeUsableAsPropertyName(nameType) {
		return c.errorType
	}
	text := getPropertyNameFromType(nameType)
	if propType := c.getTypeOfPropertyOfType(t, text); propType != nil {
		return propType
	}
	if indexInfo := c.getApplicableIndexInfoForName(t, text); indexInfo != nil {
		return c.includeUndefinedInIndexSignature(indexInfo.valueType)
	}
	return c.errorType
}

func (c *Checker) getAssignedTypeOfShorthandPropertyAssignment(node *ast.Node) *Type {
	return c.getTypeWithDefault(c.getAssignedTypeOfPropertyAssignment(node), node.AsShorthandPropertyAssignment().ObjectAssignmentInitializer)
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

func (c *Checker) getTypePredicateArgument(predicate *TypePredicate, callExpression *ast.Node) *ast.Node {
	if predicate.kind == TypePredicateKindIdentifier || predicate.kind == TypePredicateKindAssertsIdentifier {
		arguments := callExpression.Arguments()
		if int(predicate.parameterIndex) < len(arguments) {
			return arguments[predicate.parameterIndex]
		}
	} else {
		invokedExpression := ast.SkipParentheses(callExpression.Expression())
		if ast.IsAccessExpression(invokedExpression) {
			return ast.SkipParentheses(invokedExpression.Expression())
		}
	}
	return nil
}

func (c *Checker) getFlowTypeInConstructor(symbol *ast.Symbol, constructor *ast.Node) *Type {
	var accessName *ast.Node
	if strings.HasPrefix(symbol.Name, ast.InternalSymbolNamePrefix+"#") {
		accessName = c.factory.NewPrivateIdentifier(symbol.Name[strings.Index(symbol.Name, "@")+1:])
	} else {
		accessName = c.factory.NewIdentifier(symbol.Name)
	}
	reference := c.factory.NewPropertyAccessExpression(c.factory.NewKeywordExpression(ast.KindThisKeyword), nil, accessName, ast.NodeFlagsNone)
	reference.Expression().Parent = reference
	reference.Parent = constructor
	reference.FlowNodeData().FlowNode = constructor.AsConstructorDeclaration().ReturnFlowNode
	flowType := c.getFlowTypeOfProperty(reference, symbol)
	if c.noImplicitAny && (flowType == c.autoType || flowType == c.autoArrayType) {
		c.error(symbol.ValueDeclaration, diagnostics.Member_0_implicitly_has_an_1_type, c.symbolToString(symbol), c.TypeToString(flowType))
	}
	// We don't infer a type if assignments are only null or undefined.
	if everyType(flowType, c.isNullableType) {
		return nil
	}
	return c.convertAutoToAny(flowType)
}

func (c *Checker) getFlowTypeInStaticBlocks(symbol *ast.Symbol, staticBlocks []*ast.Node) *Type {
	var accessName *ast.Node
	if strings.HasPrefix(symbol.Name, ast.InternalSymbolNamePrefix+"#") {
		accessName = c.factory.NewPrivateIdentifier(symbol.Name[strings.Index(symbol.Name, "@")+1:])
	} else {
		accessName = c.factory.NewIdentifier(symbol.Name)
	}
	for _, staticBlock := range staticBlocks {
		reference := c.factory.NewPropertyAccessExpression(c.factory.NewKeywordExpression(ast.KindThisKeyword), nil, accessName, ast.NodeFlagsNone)
		reference.Expression().Parent = reference
		reference.Parent = staticBlock
		reference.FlowNodeData().FlowNode = staticBlock.AsClassStaticBlockDeclaration().ReturnFlowNode
		flowType := c.getFlowTypeOfProperty(reference, symbol)
		if c.noImplicitAny && (flowType == c.autoType || flowType == c.autoArrayType) {
			c.error(symbol.ValueDeclaration, diagnostics.Member_0_implicitly_has_an_1_type, c.symbolToString(symbol), c.TypeToString(flowType))
		}
		// We don't infer a type if assignments are only null or undefined.
		if everyType(flowType, c.isNullableType) {
			continue
		}
		return c.convertAutoToAny(flowType)
	}
	return nil
}

func (c *Checker) isReachableFlowNode(flow *ast.FlowNode) bool {
	f := c.getFlowState()
	result := c.isReachableFlowNodeWorker(f, flow, false /*noCacheCheck*/)
	c.putFlowState(f)
	c.lastFlowNode = flow
	c.lastFlowNodeReachable = result
	return result
}

func (c *Checker) isReachableFlowNodeWorker(f *FlowState, flow *ast.FlowNode, noCacheCheck bool) bool {
	for {
		if flow == c.lastFlowNode {
			return c.lastFlowNodeReachable
		}
		flags := flow.Flags
		if flags&ast.FlowFlagsShared != 0 {
			if !noCacheCheck {
				if reachable, ok := c.flowNodeReachable[flow]; ok {
					return reachable
				}
				reachable := c.isReachableFlowNodeWorker(f, flow, true /*noCacheCheck*/)
				c.flowNodeReachable[flow] = reachable
				return reachable
			}
			noCacheCheck = false
		}
		switch {
		case flags&(ast.FlowFlagsAssignment|ast.FlowFlagsCondition|ast.FlowFlagsArrayMutation) != 0:
			flow = flow.Antecedent
		case flags&ast.FlowFlagsCall != 0:
			signature := c.getEffectsSignature(flow.Node)
			if signature != nil {
				predicate := c.getTypePredicateOfSignature(signature)
				if predicate != nil && predicate.kind == TypePredicateKindAssertsIdentifier && predicate.t == nil {
					predicateArgument := flow.Node.Arguments()[predicate.parameterIndex]
					if predicateArgument != nil && c.isFalseExpression(predicateArgument) {
						return false
					}
				}
				if c.getReturnTypeOfSignature(signature).flags&TypeFlagsNever != 0 {
					return false
				}
			}
			flow = flow.Antecedent
		case flags&ast.FlowFlagsBranchLabel != 0:
			// A branching point is reachable if any branch is reachable.
			for list := getBranchLabelAntecedents(flow, f.reduceLabels); list != nil; list = list.Next {
				if c.isReachableFlowNodeWorker(f, list.Flow, false /*noCacheCheck*/) {
					return true
				}
			}
			return false
		case flags&ast.FlowFlagsLoopLabel != 0:
			if flow.Antecedents == nil {
				return false
			}
			// A loop is reachable if the control flow path that leads to the top is reachable.
			flow = flow.Antecedents.Flow
		case flags&ast.FlowFlagsSwitchClause != 0:
			// The control flow path representing an unmatched value in a switch statement with
			// no default clause is unreachable if the switch statement is exhaustive.
			data := flow.Node.AsFlowSwitchClauseData()
			if data.ClauseStart == data.ClauseEnd && c.isExhaustiveSwitchStatement(data.SwitchStatement) {
				return false
			}
			flow = flow.Antecedent
		case flags&ast.FlowFlagsReduceLabel != 0:
			// Cache is unreliable once we start adjusting labels
			c.lastFlowNode = nil
			f.reduceLabels = append(f.reduceLabels, flow.Node.AsFlowReduceLabelData())
			result := c.isReachableFlowNodeWorker(f, flow.Antecedent, false /*noCacheCheck*/)
			f.reduceLabels = f.reduceLabels[:len(f.reduceLabels)-1]
			return result
		default:
			return flags&ast.FlowFlagsUnreachable == 0
		}
	}
}

func (c *Checker) isFalseExpression(expr *ast.Node) bool {
	node := ast.SkipParentheses(expr)
	if node.Kind == ast.KindFalseKeyword {
		return true
	}
	if ast.IsBinaryExpression(node) {
		binary := node.AsBinaryExpression()
		return binary.OperatorToken.Kind == ast.KindAmpersandAmpersandToken && (c.isFalseExpression(binary.Left) || c.isFalseExpression(binary.Right)) ||
			binary.OperatorToken.Kind == ast.KindBarBarToken && c.isFalseExpression(binary.Left) && c.isFalseExpression(binary.Right)
	}
	return false
}

// Return true if the given flow node is preceded by a 'super(...)' call in every possible code path
// leading to the node.
func (c *Checker) isPostSuperFlowNode(flow *ast.FlowNode, noCacheCheck bool) bool {
	f := c.getFlowState()
	result := c.isPostSuperFlowNodeWorker(f, flow, noCacheCheck)
	c.putFlowState(f)
	return result
}

func (c *Checker) isPostSuperFlowNodeWorker(f *FlowState, flow *ast.FlowNode, noCacheCheck bool) bool {
	for {
		flags := flow.Flags
		if flags&ast.FlowFlagsShared != 0 {
			if !noCacheCheck {
				if postSuper, ok := c.flowNodePostSuper[flow]; ok {
					return postSuper
				}
				postSuper := c.isPostSuperFlowNodeWorker(f, flow, true /*noCacheCheck*/)
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
			for list := getBranchLabelAntecedents(flow, f.reduceLabels); list != nil; list = list.Next {
				if !c.isPostSuperFlowNodeWorker(f, list.Flow, false /*noCacheCheck*/) {
					return false
				}
			}
			return true
		case flags&ast.FlowFlagsLoopLabel != 0:
			// A loop is post-super if the control flow path that leads to the top is post-super.
			flow = flow.Antecedents.Flow
		case flags&ast.FlowFlagsReduceLabel != 0:
			f.reduceLabels = append(f.reduceLabels, flow.Node.AsFlowReduceLabelData())
			result := c.isPostSuperFlowNodeWorker(f, flow.Antecedent, false /*noCacheCheck*/)
			f.reduceLabels = f.reduceLabels[:len(f.reduceLabels)-1]
			return result
		default:
			// Unreachable nodes are considered post-super to silence errors
			return flags&ast.FlowFlagsUnreachable != 0
		}
	}
}

// Check if a parameter, catch variable, or mutable local variable is definitely assigned anywhere
func (c *Checker) isSymbolAssignedDefinitely(symbol *ast.Symbol) bool {
	c.ensureAssignmentsMarked(symbol)
	return c.markedAssignmentSymbolLinks.Get(symbol).hasDefiniteAssignment
}

// Check if a parameter, catch variable, or mutable local variable is assigned anywhere
func (c *Checker) isSymbolAssigned(symbol *ast.Symbol) bool {
	c.ensureAssignmentsMarked(symbol)
	return c.markedAssignmentSymbolLinks.Get(symbol).lastAssignmentPos != 0
}

// Return true if there are no assignments to the given symbol or if the given location
// is past the last assignment to the symbol.
func (c *Checker) isPastLastAssignment(symbol *ast.Symbol, location *ast.Node) bool {
	c.ensureAssignmentsMarked(symbol)
	lastAssignmentPos := c.markedAssignmentSymbolLinks.Get(symbol).lastAssignmentPos
	return lastAssignmentPos == 0 || location != nil && int(lastAssignmentPos) < location.Pos()
}

func (c *Checker) ensureAssignmentsMarked(symbol *ast.Symbol) {
	if c.markedAssignmentSymbolLinks.Get(symbol).lastAssignmentPos != 0 {
		return
	}
	parent := ast.FindAncestor(symbol.ValueDeclaration, ast.IsFunctionOrSourceFile)
	if parent == nil {
		return
	}
	links := c.nodeLinks.Get(parent)
	if links.flags&NodeCheckFlagsAssignmentsMarked == 0 {
		links.flags |= NodeCheckFlagsAssignmentsMarked
		if !c.hasParentWithAssignmentsMarked(parent) {
			c.markNodeAssignments(parent)
		}
	}
}

func (c *Checker) hasParentWithAssignmentsMarked(node *ast.Node) bool {
	return ast.FindAncestor(node.Parent, func(node *ast.Node) bool {
		return ast.IsFunctionOrSourceFile(node) && c.nodeLinks.Get(node).flags&NodeCheckFlagsAssignmentsMarked != 0
	}) != nil
}

// For all assignments within the given root node, record the last assignment source position for all
// referenced parameters and mutable local variables. When assignments occur in nested functions  or
// references occur in export specifiers, record math.MaxInt32 as the assignment position. When
// assignments occur in compound statements, record the ending source position of the compound statement
// as the assignment position (this is more conservative than full control flow analysis, but requires
// only a single walk over the AST).
func (c *Checker) markNodeAssignmentsWorker(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindIdentifier:
		assignmentKind := getAssignmentTargetKind(node)
		if assignmentKind != AssignmentKindNone {
			symbol := c.getResolvedSymbol(node)
			if c.isParameterOrMutableLocalVariable(symbol) {
				links := c.markedAssignmentSymbolLinks.Get(symbol)
				if pos := links.lastAssignmentPos; pos == 0 || pos != math.MaxInt32 {
					referencingFunction := ast.FindAncestor(node, ast.IsFunctionOrSourceFile)
					declaringFunction := ast.FindAncestor(symbol.ValueDeclaration, ast.IsFunctionOrSourceFile)
					if referencingFunction == declaringFunction {
						links.lastAssignmentPos = int32(c.extendAssignmentPosition(node, symbol.ValueDeclaration))
					} else {
						links.lastAssignmentPos = math.MaxInt32
					}
				}
				if assignmentKind == AssignmentKindDefinite {
					links.hasDefiniteAssignment = true
				}
			}
		}
		return false
	case ast.KindExportSpecifier:
		exportDeclaration := node.AsExportSpecifier().Parent.Parent.AsExportDeclaration()
		name := node.AsExportSpecifier().PropertyName
		if name == nil {
			name = node.Name()
		}
		if !node.AsExportSpecifier().IsTypeOnly && !exportDeclaration.IsTypeOnly && exportDeclaration.ModuleSpecifier == nil && !ast.IsStringLiteral(name) {
			symbol := c.resolveEntityName(name, ast.SymbolFlagsValue, true /*ignoreErrors*/, true /*dontResolveAlias*/, nil)
			if symbol != nil && c.isParameterOrMutableLocalVariable(symbol) {
				links := c.markedAssignmentSymbolLinks.Get(symbol)
				links.lastAssignmentPos = math.MaxInt32
			}
		}
		return false
	case ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindJSTypeAliasDeclaration,
		ast.KindEnumDeclaration:
		return false
	}
	if ast.IsTypeNode(node) {
		return false
	}
	return node.ForEachChild(c.markNodeAssignments)
}

// Extend the position of the given assignment target node to the end of any intervening variable statement,
// expression statement, compound statement, or class declaration occurring between the node and the given
// declaration node.
func (c *Checker) extendAssignmentPosition(node *ast.Node, declaration *ast.Node) int {
	pos := node.Pos()
	for node != nil && node.Pos() > declaration.Pos() {
		switch node.Kind {
		case ast.KindVariableStatement, ast.KindExpressionStatement, ast.KindIfStatement, ast.KindDoStatement, ast.KindWhileStatement,
			ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindWithStatement, ast.KindSwitchStatement,
			ast.KindTryStatement, ast.KindClassDeclaration:
			pos = node.End()
		}
		node = node.Parent
	}
	return pos
}
