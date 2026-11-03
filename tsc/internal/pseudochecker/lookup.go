package pseudochecker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

func (ch *PseudoChecker) GetReturnTypeOfSignature(signatureNode *ast.Node) *PseudoType {
	switch signatureNode.Kind {
	case ast.KindGetAccessor:
		return ch.GetTypeOfAccessor(signatureNode)
	case ast.KindMethodDeclaration, ast.KindFunctionDeclaration, ast.KindConstructor,
		ast.KindMethodSignature, ast.KindCallSignature, ast.KindConstructSignature,
		ast.KindSetAccessor, ast.KindIndexSignature, ast.KindFunctionType, ast.KindConstructorType,
		ast.KindFunctionExpression, ast.KindArrowFunction, ast.KindJSDocSignature:
		return ch.createReturnFromSignature(signatureNode)
	default:
		debug.FailBadSyntaxKind(signatureNode, "Node needs to be an inferrable node")
		return nil
	}
}

func (ch *PseudoChecker) GetTypeOfAccessor(accessor *ast.Node) *PseudoType {
	return ch.typeFromAccessor(accessor)
}

func (ch *PseudoChecker) GetTypeOfExpression(node *ast.Node) *PseudoType {
	return ch.typeFromExpression(node)
}

func (ch *PseudoChecker) GetTypeOfDeclaration(node *ast.Node) *PseudoType {
	switch node.Kind {
	case ast.KindParameter:
		return ch.typeFromParameter(node.AsParameterDeclaration())
	case ast.KindVariableDeclaration:
		return ch.typeFromVariable(node.AsVariableDeclaration())
	case ast.KindPropertySignature, ast.KindPropertyDeclaration, ast.KindJSDocPropertyTag:
		return ch.typeFromProperty(node)
	case ast.KindBindingElement:
		return NewPseudoTypeNoResult(node)
	case ast.KindExportAssignment:
		return ch.typeFromExpression(node.AsExportAssignment().Expression)
	case ast.KindPropertyAccessExpression, ast.KindElementAccessExpression, ast.KindBinaryExpression:
		return ch.typeFromExpandoProperty(node)
	case ast.KindPropertyAssignment, ast.KindShorthandPropertyAssignment:
		return ch.typeFromPropertyAssignment(node)
	case ast.KindCallExpression:
		switch ast.GetAssignmentDeclarationKind(node) {

		case ast.JSDeclarationKindObjectDefinePropertyValue:
			{

			}
		case ast.JSDeclarationKindObjectDefinePropertyExports:
			{

			}
		}
		return NewPseudoTypeNoResult(node)
	default:
		debug.FailBadSyntaxKind(node, "node needs to be an inferrable node")
		return nil
	}
}

func (ch *PseudoChecker) typeFromPropertyAssignment(node *ast.Node) *PseudoType {
	annotation := node.Type()
	if annotation != nil {
		return NewPseudoTypeDirect(annotation)
	}
	if node.Kind == ast.KindPropertyAssignment {
		init := node.Initializer()
		if init != nil {
			expr := ch.typeFromExpression(init)
			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
				return expr
			}

		}
	}
	return NewPseudoTypeNoResult(node)
}

func (ch *PseudoChecker) typeFromExpandoProperty(node *ast.Node) *PseudoType {
	declaredType := node.Type()
	if declaredType != nil {
		return NewPseudoTypeDirect(declaredType)
	}

	return NewPseudoTypeNoResult(node)
}

func (ch *PseudoChecker) typeFromProperty(node *ast.Node) *PseudoType {
	t := node.Type()
	if t != nil {
		return NewPseudoTypeDirect(t)
	}
	if ast.IsPropertyDeclaration(node) {
		init := node.Initializer()
		if init != nil && !isContextuallyTyped(node) {

			if ast.HasModifier(node, ast.ModifierFlagsReadonly) && ast.IsTemplateExpression(init) {
				return NewPseudoTypeNoResult(node)
			}
			expr := ch.typeFromExpression(init)
			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
				if expr.Kind != PseudoTypeKindDirect && node.AsPropertyDeclaration().PostfixToken != nil && node.AsPropertyDeclaration().PostfixToken.Kind == ast.KindQuestionToken {

					return addUndefinedIfDefinitelyRequired(expr)
				}
				return expr
			}

		}
	}
	return NewPseudoTypeNoResult(node)
}

func (ch *PseudoChecker) typeFromVariable(declaration *ast.VariableDeclaration) *PseudoType {
	t := declaration.Type
	if t != nil {
		return NewPseudoTypeDirect(t)
	}
	init := declaration.Initializer
	if init != nil && declaration.Symbol != nil && (len(declaration.Symbol.Declarations()) == 1 || core.CountWhere(declaration.Symbol.Declarations(), ast.IsVariableDeclaration) == 1) {
		if !isContextuallyTyped(declaration.AsNode()) {

			if ast.IsVarConst(declaration.AsNode()) && ast.IsTemplateExpression(init) {
				return NewPseudoTypeNoResult(declaration.AsNode())
			}
			expr := ch.typeFromExpression(init)
			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
				return expr
			}

		}
	}
	return NewPseudoTypeNoResult(declaration.AsNode())
}

func (ch *PseudoChecker) typeFromAccessor(accessor *ast.Node) *PseudoType {
	accessorDeclarations := ast.GetAllAccessorDeclarationsForDeclaration(accessor, accessor.DeclarationData().Symbol.Declarations())
	accessorType := ch.getTypeAnnotationFromAllAccessorDeclarations(accessor, accessorDeclarations)
	if accessorType != nil && !ast.IsTypePredicateNode(accessorType) {
		return NewPseudoTypeDirect(accessorType)
	}
	if accessorDeclarations.GetAccessor != nil {
		res := ch.createReturnFromSignature(accessorDeclarations.GetAccessor.AsNode())
		if res.Kind == PseudoTypeKindInferred && len(res.AsPseudoTypeInferred().ErrorNodes) == 0 {
			errorNodes := []*ast.Node{accessorDeclarations.GetAccessor.AsNode()}
			if accessorDeclarations.SetAccessor != nil {
				errorNodes = append(errorNodes, accessorDeclarations.SetAccessor.AsNode())
			}
			res = NewPseudoTypeInferredWithErrors(res.AsPseudoTypeInferred().Expression, res.AsPseudoTypeInferred().IsSignatureReturn, errorNodes)
		}
		return res
	}
	return NewPseudoTypeNoResult(accessor)
}

func (ch *PseudoChecker) getTypeAnnotationFromAllAccessorDeclarations(node *ast.Node, accessors ast.AllAccessorDeclarations) *ast.Node {
	accessorType := ch.getTypeAnnotationFromAccessor(node)
	if accessorType == nil && node != accessors.FirstAccessor {
		accessorType = ch.getTypeAnnotationFromAccessor(accessors.FirstAccessor)
	}
	if accessorType == nil && accessors.SecondAccessor != nil && node != accessors.SecondAccessor {
		accessorType = ch.getTypeAnnotationFromAccessor(accessors.SecondAccessor)
	}
	return accessorType
}

func (ch *PseudoChecker) getTypeAnnotationFromAccessor(node *ast.Node) *ast.Node {
	if node == nil {
		return nil
	}

	if node.Kind == ast.KindGetAccessor {
		return node.AsGetAccessorDeclaration().Type
	}
	set := node.AsSetAccessorDeclaration()
	if set.Parameters == nil || len(set.Parameters.Nodes) < 1 {
		return nil
	}
	p := set.Parameters.Nodes[0]
	if !ast.IsParameterDeclaration(p) {
		return nil
	}
	return p.AsParameterDeclaration().Type
}

func isValueSignatureDeclaration(node *ast.Node) bool {
	return ast.IsFunctionExpression(node) || ast.IsArrowFunction(node) || ast.IsMethodDeclaration(node) || ast.IsAccessor(node) || ast.IsFunctionDeclaration(node) || ast.IsConstructorDeclaration(node)
}

func (ch *PseudoChecker) createReturnFromSignature(fn *ast.Node) *PseudoType {
	if ast.IsFunctionLike(fn) {
		d := fn.FunctionLikeData()

		r := d.Type
		if r != nil {
			return NewPseudoTypeDirect(r)
		}
	}
	if isValueSignatureDeclaration(fn) {
		return ch.typeFromSingleReturnExpression(fn)
	}
	return NewPseudoTypeNoResult(fn)
}

func (ch *PseudoChecker) typeFromSingleReturnExpression(fn *ast.Node) *PseudoType {
	var candidateExpr *ast.Node
	if fn != nil && !ast.NodeIsMissing(fn.Body()) {
		flags := ast.GetFunctionFlags(fn)
		if flags&ast.FunctionFlagsAsyncGenerator != 0 {
			return NewPseudoTypeInferred(fn, true)
		}

		body := fn.Body()
		if ast.IsBlock(body) {
			ast.ForEachReturnStatement(body, func(stmt *ast.Node) bool {
				if stmt.Parent != body {
					candidateExpr = nil
					return true
				}
				if candidateExpr == nil {
					candidateExpr = stmt.AsReturnStatement().Expression
				} else {
					candidateExpr = nil
					return true
				}
				return false
			})
		} else {
			candidateExpr = body
		}
	}
	if candidateExpr != nil {
		if isContextuallyTyped(candidateExpr) {
			var t *ast.Node
			if candidateExpr.Kind == ast.KindTypeAssertionExpression {
				t = candidateExpr.AsTypeAssertion().Type
			} else if candidateExpr.Kind == ast.KindAsExpression {
				t = candidateExpr.AsAsExpression().Type
			}
			if t != nil && !ast.IsConstTypeReference(t) {
				return NewPseudoTypeDirect(t)
			}
		} else {
			expr := ch.typeFromExpression(candidateExpr)
			if expr != nil && (expr.Kind != PseudoTypeKindInferred || len(expr.AsPseudoTypeInferred().ErrorNodes) > 0) {
				return expr
			}
		}
	}
	return NewPseudoTypeInferred(fn, true)
}

func (ch *PseudoChecker) typeFromExpression(node *ast.Node) *PseudoType {
	switch node.Kind {
	case ast.KindOmittedExpression:
		return PseudoTypeUndefined
	case ast.KindParenthesizedExpression:

		return ch.typeFromExpression(node.AsParenthesizedExpression().Expression)
	case ast.KindIdentifier:

		if node.AsIdentifier().Text == "undefined" {
			return PseudoTypeUndefined
		}
	case ast.KindNullKeyword:
		return PseudoTypeNull
	case ast.KindArrowFunction, ast.KindFunctionExpression:
		return ch.typeFromFunctionLikeExpression(node)
	case ast.KindTypeAssertionExpression:
		return ch.typeFromTypeAssertion(node.AsTypeAssertion().Expression, node.AsTypeAssertion().Type)
	case ast.KindAsExpression:
		return ch.typeFromTypeAssertion(node.AsAsExpression().Expression, node.AsAsExpression().Type)
	case ast.KindPrefixUnaryExpression:
		if ast.IsPrimitiveLiteralValue(node, true) {
			return ch.typeFromPrimitiveLiteralPrefix(node.AsPrefixUnaryExpression())
		}
	case ast.KindArrayLiteralExpression:
		return ch.typeFromArrayLiteral(node.AsArrayLiteralExpression())
	case ast.KindObjectLiteralExpression:
		return ch.typeFromObjectLiteral(node.AsObjectLiteralExpression())
	case ast.KindClassExpression:
		return NewPseudoTypeInferredWithErrors(node, false, []*ast.Node{node})
	case ast.KindTemplateExpression:

		if IsInConstContext(node) {
			return NewPseudoTypeInferred(node, false)
		}
		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeInferred(node, false), PseudoTypeString)
	case ast.KindNumericLiteral:
		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeNumericLiteral(node), PseudoTypeNumber)
	case ast.KindNoSubstitutionTemplateLiteral:
		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString)
	case ast.KindStringLiteral:
		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), PseudoTypeString)
	case ast.KindBigIntLiteral:
		return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeBigIntLiteral(node), PseudoTypeBigInt)
	case ast.KindTrueKeyword:
		return NewPseudoTypeMaybeConstLocation(node, PseudoTypeTrue, PseudoTypeBoolean)
	case ast.KindFalseKeyword:
		return NewPseudoTypeMaybeConstLocation(node, PseudoTypeFalse, PseudoTypeBoolean)
	}
	return NewPseudoTypeInferred(node, false)
}

func (ch *PseudoChecker) typeFromObjectLiteral(node *ast.ObjectLiteralExpression) *PseudoType {
	if errorNodes := ch.canGetTypeFromObjectLiteral(node); errorNodes != nil {
		return NewPseudoTypeInferredWithErrors(node.AsNode(), false, errorNodes)
	}

	if node.Properties == nil || len(node.Properties.Nodes) == 0 {
		return NewPseudoTypeObjectLiteral(nil)
	}
	results := make([]*PseudoObjectElement, 0, len(node.Properties.Nodes))
	for _, e := range node.Properties.Nodes {
		switch e.Kind {
		case ast.KindMethodDeclaration:
			optional := e.AsMethodDeclaration().PostfixToken != nil && e.AsMethodDeclaration().PostfixToken.Kind == ast.KindQuestionToken
			if e.FunctionLikeData().FullSignature != nil {
				results = append(results, NewPseudoPropertyAssignment(
					false,
					e.Name(),
					optional,
					NewPseudoTypeDirect(e.FunctionLikeData().FullSignature),
				))
			} else {
				results = append(results, NewPseudoObjectMethod(
					e,
					e.Name(),
					optional,
					ch.cloneTypeParameters(e.AsMethodDeclaration().TypeParameters),
					ch.cloneParameters(e.ParameterList()),
					ch.createReturnFromSignature(e),
				))
			}
		case ast.KindPropertyAssignment:
			results = append(results, NewPseudoPropertyAssignment(
				false,
				e.Name(),
				e.AsPropertyAssignment().PostfixToken != nil && e.AsPropertyAssignment().PostfixToken.Kind == ast.KindQuestionToken,
				ch.typeFromExpression(e.Initializer()),
			))
		case ast.KindSetAccessor, ast.KindGetAccessor:
			member := ch.getAccessorMember(e, e.Name())
			if member != nil {
				results = append(results, member)
			}
		}
	}
	return NewPseudoTypeObjectLiteral(results)
}

func (ch *PseudoChecker) getAccessorMember(accessor *ast.Node, name *ast.Node) *PseudoObjectElement {
	allAccessors := ast.GetAllAccessorDeclarationsForDeclaration(accessor, accessor.Symbol().Declarations())

	if allAccessors.GetAccessor != nil && allAccessors.GetAccessor.Type != nil &&
		allAccessors.SetAccessor != nil && len(allAccessors.SetAccessor.Parameters.Nodes) > 0 && allAccessors.SetAccessor.Parameters.Nodes[0].AsParameterDeclaration().Type != nil {

		if ast.IsGetAccessorDeclaration(accessor) {
			return NewPseudoGetAccessor(
				accessor,
				name,
				false,
				ch.typeFromAccessor(accessor),
			)
		} else {
			return NewPseudoSetAccessor(
				accessor,
				name,
				false,
				ch.cloneParameters(accessor.AsSetAccessorDeclaration().Parameters)[0],
			)
		}
	}

	if accessor == allAccessors.FirstAccessor {

		accessorType := ch.typeFromAccessor(accessor)
		readonly := ast.IsGetAccessorDeclaration(accessor) && allAccessors.SecondAccessor == nil
		return NewPseudoPropertyAssignment(
			readonly,
			name,
			false,
			accessorType,
		)
	}
	return nil
}

func (ch *PseudoChecker) canGetTypeFromObjectLiteral(node *ast.ObjectLiteralExpression) []*ast.Node {
	if node.Properties == nil || len(node.Properties.Nodes) == 0 {
		return nil
	}
	var errorNodes []*ast.Node
	for _, e := range node.Properties.Nodes {
		if e.Flags&ast.NodeFlagsThisNodeHasError != 0 {
			errorNodes = append(errorNodes, e)
			continue
		}
		if e.Kind == ast.KindShorthandPropertyAssignment || e.Kind == ast.KindSpreadAssignment {
			errorNodes = append(errorNodes, e)
			continue
		}
		if e.Name().Flags&ast.NodeFlagsThisNodeHasError != 0 {
			errorNodes = append(errorNodes, e.Name())
			continue
		}
		if e.Name().Kind == ast.KindPrivateIdentifier {
			errorNodes = append(errorNodes, e)
			continue
		}
		if e.Name().Kind == ast.KindComputedPropertyName {
			expression := e.Name().Expression()
			if !ast.IsPrimitiveLiteralValue(expression, false) {
				errorNodes = append(errorNodes, e.Name())
			}
		}
	}
	return errorNodes
}

func (ch *PseudoChecker) typeFromArrayLiteral(node *ast.ArrayLiteralExpression) *PseudoType {
	if errorNodes := ch.canGetTypeFromArrayLiteral(node); errorNodes != nil {
		return NewPseudoTypeInferredWithErrors(node.AsNode(), false, errorNodes)
	}
	if IsInConstContext(node.AsNode()) && isContextuallyTyped(node.AsNode()) {
		return NewPseudoTypeInferred(node.AsNode(), false)
	}

	results := make([]*PseudoType, 0, len(node.Elements.Nodes))
	for _, e := range node.Elements.Nodes {
		results = append(results, ch.typeFromExpression(e))
	}
	return NewPseudoTypeTuple(results)
}

func (ch *PseudoChecker) canGetTypeFromArrayLiteral(node *ast.ArrayLiteralExpression) []*ast.Node {
	if !IsInConstContext(node.AsNode()) {
		return []*ast.Node{node.AsNode()}
	}
	for _, e := range node.Elements.Nodes {
		if e.Kind == ast.KindSpreadElement {
			return []*ast.Node{e}
		}
	}
	return nil
}

func isConstContextPropagatingKind(kind ast.Kind) bool {
	switch kind {
	case ast.KindArrayLiteralExpression, ast.KindObjectLiteralExpression,
		ast.KindParenthesizedExpression, ast.KindSpreadElement, ast.KindPropertyAssignment,
		ast.KindShorthandPropertyAssignment, ast.KindTemplateSpan, ast.KindPrefixUnaryExpression:
		return true
	}
	return false
}

func IsInConstContext(node *ast.Node) bool {

	maybeAssertion := ast.FindAncestor(
		node.Parent,
		func(n *ast.Node) bool {

			return ast.IsAssertionExpression(n) || !isConstContextPropagatingKind(n.Kind)
		},
	)
	return ast.IsConstAssertion(maybeAssertion)
}

func (ch *PseudoChecker) typeFromPrimitiveLiteralPrefix(node *ast.PrefixUnaryExpression) *PseudoType {
	expr := node.AsNode()
	if node.Operator == ast.KindPlusToken {
		expr = node.Operand
	}
	inner := node.Operand
	if inner.Kind == ast.KindBigIntLiteral {
		return NewPseudoTypeMaybeConstLocation(node.AsNode(), NewPseudoTypeBigIntLiteral(expr.AsNode()), PseudoTypeBigInt)
	}
	if inner.Kind == ast.KindNumericLiteral {
		return NewPseudoTypeMaybeConstLocation(node.AsNode(), NewPseudoTypeNumericLiteral(expr.AsNode()), PseudoTypeNumber)
	}
	debug.FailBadSyntaxKind(inner)
	return nil
}

func (ch *PseudoChecker) typeFromTypeAssertion(expression *ast.Node, typeNode *ast.Node) *PseudoType {
	if ast.IsConstTypeReference(typeNode) {
		return ch.typeFromExpression(expression)
	}
	return NewPseudoTypeDirect(typeNode)
}

func (ch *PseudoChecker) typeFromFunctionLikeExpression(node *ast.Node) *PseudoType {
	if node.FunctionLikeData().FullSignature != nil {
		return NewPseudoTypeDirect(node.FunctionLikeData().FullSignature)
	}
	returnType := ch.createReturnFromSignature(node)
	typeParameters := ch.cloneTypeParameters(node.FunctionLikeData().TypeParameters)
	parameters := ch.cloneParameters(node.FunctionLikeData().Parameters)
	return NewPseudoTypeSingleCallSignature(
		node,
		parameters,
		typeParameters,
		returnType,
	)
}

func (ch *PseudoChecker) cloneTypeParameters(nodes *ast.NodeList) []*ast.TypeParameterDeclaration {
	if nodes == nil {
		return nil
	}
	if len(nodes.Nodes) == 0 {
		return nil
	}
	result := make([]*ast.TypeParameterDeclaration, 0, len(nodes.Nodes))
	for _, e := range nodes.Nodes {
		result = append(result, e.AsTypeParameterDeclaration())
	}
	return result
}

func isUndefinedPseudoType(t *PseudoType) bool {
	return t.Kind == PseudoTypeKindUndefined || (t.Kind == PseudoTypeKindMaybeConstLocation && isUndefinedPseudoType(t.AsPseudoTypeMaybeConstLocation().ConstType))
}

func typeNodeCouldReferToUndefined(node *ast.Node) bool {
	for node.Kind == ast.KindParenthesizedType {
		node = node.AsParenthesizedTypeNode().Type
	}
	switch node.Kind {

	case ast.KindTypeReference, ast.KindIndexedAccessType, ast.KindTypeQuery, ast.KindOptionalType, ast.KindRestType, ast.KindImportType:
		return true
	case ast.KindIntersectionType:

		return core.Some(node.AsIntersectionTypeNode().Types.Nodes, typeNodeCouldReferToUndefined)
	case ast.KindUnionType:
		return core.Some(node.AsUnionTypeNode().Types.Nodes, typeNodeCouldReferToUndefined)
	case ast.KindConditionalType:
		return true
	case ast.KindTypeOperator:
		return true
	case ast.KindTypePredicate:
		return true
	case ast.KindUndefinedKeyword:
		return true
	default:
		return false
	}
}

func CouldAlreadyReferToUndefinedType(t *PseudoType) bool {
	if t.Kind == PseudoTypeKindNoResult || t.Kind == PseudoTypeKindInferred || isUndefinedPseudoType(t) {
		return true
	}
	if t.Kind == PseudoTypeKindMaybeConstLocation {
		mc := t.AsPseudoTypeMaybeConstLocation()
		return CouldAlreadyReferToUndefinedType(mc.RegularType)
	}
	if t.Kind == PseudoTypeKindDirect {

		node := t.AsPseudoTypeDirect().TypeNode
		return typeNodeCouldReferToUndefined(node)
	}
	if t.Kind == PseudoTypeKindUnion {
		return core.Some(t.AsPseudoTypeUnion().Types, CouldAlreadyReferToUndefinedType)
	}
	return false
}

func isOptionalInitializedOrRestParameter(node *ast.ParameterDeclarationNode) bool {
	p := node.AsParameterDeclaration()
	if p.DotDotDotToken != nil || p.Initializer != nil || p.QuestionToken != nil {
		return true
	}
	return false
}

func lastRequiredParamIndex(params []*ast.Node) int {
	for i, param := range slices.Backward(params) {
		if !isOptionalInitializedOrRestParameter(param) {
			return i + 1
		}
	}
	return 0
}

func addUndefinedIfDefinitelyRequired(expr *PseudoType) *PseudoType {

	if CouldAlreadyReferToUndefinedType(expr) {
		return expr
	}

	return NewPseudoTypeUnion([]*PseudoType{expr, PseudoTypeUndefined})
}

func (ch *PseudoChecker) typeFromParameter(node *ast.ParameterDeclaration) *PseudoType {
	parent := node.Parent
	if parent.Kind == ast.KindSetAccessor {
		return ch.GetTypeOfAccessor(parent)
	}

	if node.Initializer == nil {
		if node.Type != nil {
			return NewPseudoTypeDirect(node.Type)
		}
		return NewPseudoTypeNoResult(node.AsNode())
	}
	p := parent.Parameters()
	selfIdx := slices.Index(p, node.AsNode())
	lastRequired := lastRequiredParamIndex(p)
	return ch.typeFromParameterWorker(node, selfIdx, lastRequired)
}

func (ch *PseudoChecker) typeFromParameterWorker(node *ast.ParameterDeclaration, selfIdx int, lastRequired int) *PseudoType {
	parent := node.Parent
	if parent.Kind == ast.KindSetAccessor {
		return ch.GetTypeOfAccessor(parent)
	}
	hasRequiredAfter := selfIdx < lastRequired-1
	declaredType := node.Type
	if declaredType != nil {
		result := NewPseudoTypeDirect(declaredType)

		if ch.strictNullChecks && node.Initializer != nil && hasRequiredAfter {
			return addUndefinedIfDefinitelyRequired(result)
		}
		return result
	}
	if node.Initializer != nil && ast.IsIdentifier(node.Name()) && !isContextuallyTyped(node.AsNode()) {
		expr := ch.typeFromExpression(node.Initializer)
		if expr != nil && (expr.Kind == PseudoTypeKindInferred && len(expr.AsPseudoTypeInferred().ErrorNodes) == 0) {
			expr = NewPseudoTypeInferredWithErrors(expr.AsPseudoTypeInferred().Expression, false, []*ast.Node{node.AsNode()})
		}
		if !ch.strictNullChecks {
			return expr
		}
		if !hasRequiredAfter {
			return expr
		}

		return addUndefinedIfDefinitelyRequired(expr)
	}

	return NewPseudoTypeNoResult(node.AsNode())
}

func (ch *PseudoChecker) cloneParameters(nodes *ast.NodeList) []*PseudoParameter {
	if nodes == nil {
		return nil
	}
	if len(nodes.Nodes) == 0 {
		return nil
	}
	lastRequired := lastRequiredParamIndex(nodes.Nodes)
	result := make([]*PseudoParameter, 0, len(nodes.Nodes))
	for i, e := range nodes.Nodes {
		p := e.AsParameterDeclaration()
		optional := p.QuestionToken != nil
		if !optional && p.Initializer != nil {

			optional = i >= lastRequired-1
		}
		result = append(result, NewPseudoParameter(
			p.DotDotDotToken != nil,
			e.Name(),
			optional,
			ch.typeFromParameterWorker(p, i, lastRequired),
		))
	}
	return result
}

func isContextuallyTyped(node *ast.Node) bool {
	return ast.FindAncestor(node.Parent, func(n *ast.Node) bool {

		if ast.IsCallExpression(n) {
			return true
		}
		if ast.IsSatisfiesExpression(n) {
			return true
		}
		if (ast.IsVariableParameterOrProperty(n) || ast.IsAssertionExpression(n)) && n.Type() != nil && !ast.IsConstAssertion(n) {
			return true
		}
		return ast.IsJsxElement(n) || ast.IsJsxExpression(n)
	}) != nil
}
