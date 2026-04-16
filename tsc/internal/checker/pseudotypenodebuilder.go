package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/pseudochecker"
)

// pseudoTypeToNodeWithCheckerFallback is like pseudoTypeToNode but when the top-level pseudo type
// is PseudoTypeInferred, it reports any error nodes and then serializes from the checker's type.
// This avoids incorrect type output when PseudoTypeInferred would derive the type from the
// original declaration expression in an instantiated context.
func (b *NodeBuilderImpl) pseudoTypeToNodeWithCheckerFallback(t *pseudochecker.PseudoType, checkerType *Type) *ast.Node {
	if t.Kind == pseudochecker.PseudoTypeKindInferred {
		if !b.ctx.suppressReportInferenceFallback {
			if errorNodes := t.AsPseudoTypeInferred().ErrorNodes; len(errorNodes) > 0 {
				for _, n := range errorNodes {
					b.ctx.tracker.ReportInferenceFallback(n)
				}
			} else {
				b.ctx.tracker.ReportInferenceFallback(t.AsPseudoTypeInferred().Expression)
			}
		}
		oldSuppress := b.ctx.suppressReportInferenceFallback
		b.ctx.suppressReportInferenceFallback = true
		result := b.typeToTypeNode(checkerType)
		b.ctx.suppressReportInferenceFallback = oldSuppress
		return result
	}
	return b.pseudoTypeToNode(t)
}

// Maps a pseudochecker's pseudotypes into ast nodes and reports any inference fallback errors the pseudotype structure implies
func (b *NodeBuilderImpl) pseudoTypeToNode(t *pseudochecker.PseudoType) *ast.Node {
	debug.Assert(t != nil, "Attempted to serialize nil pseudotype")
	switch t.Kind {
	case pseudochecker.PseudoTypeKindDirect:
		return b.reuseTypeNode(t.AsPseudoTypeDirect().TypeNode)
	case pseudochecker.PseudoTypeKindInferred:
		inferred := t.AsPseudoTypeInferred()
		node := inferred.Expression
		if errorNodes := inferred.ErrorNodes; len(errorNodes) > 0 {
			for _, n := range errorNodes {
				b.ctx.tracker.ReportInferenceFallback(n)
			}
		} else if ast.IsEntityNameExpression(node) && ast.IsDeclaration(node.Parent) {
			b.ctx.tracker.ReportInferenceFallback(node.Parent)
		} else {
			b.ctx.tracker.ReportInferenceFallback(node)
		}
		// use symbol type from parent declaration to automatically handle expression type widening without duplicating logic
		if ast.IsReturnStatement(node.Parent) {
			enclosing := ast.GetContainingFunction(node)
			if ast.IsAccessor(enclosing) {
				return b.serializeTypeForDeclaration(enclosing, nil, nil, false)
			}
			return b.serializeReturnTypeForSignature(b.ch.getSignatureFromDeclaration(enclosing), false)
		}
		if ast.IsArrowFunction(node.Parent) && node.Parent.AsArrowFunction().Body == node {
			return b.serializeReturnTypeForSignature(b.ch.getSignatureFromDeclaration(node.Parent), false)
		}
		if ast.IsDeclaration(node.Parent) {
			return b.serializeTypeForDeclaration(node.Parent, nil, nil, false)
		}
		// This might be effectively unreachable. If it's not, it may need more widening rules to mirror checker behavior for whatever expressions are serialized here
		ty := b.ch.getTypeOfExpression(node)
		return b.typeToTypeNode(ty)
	case pseudochecker.PseudoTypeKindNoResult:
		node := t.AsPseudoTypeNoResult().Declaration
		b.ctx.tracker.ReportInferenceFallback(node)
		if ast.IsFunctionLike(node) && !ast.IsAccessor(node) {
			return b.serializeReturnTypeForSignature(b.ch.getSignatureFromDeclaration(node), false)
		}
		return b.serializeTypeForDeclaration(node, nil, nil, false)
	case pseudochecker.PseudoTypeKindMaybeConstLocation:
		d := t.AsPseudoTypeMaybeConstLocation()
		// see checkExpressionWithContextualType for general literal widening rules which need to be emulated here, plus
		// checkTemplateLiteralExpression for template literal widening rules if the pseudochecker ever supports literalized templates
		isInConstContext := b.ch.isConstContext(d.Node)
		if !isInConstContext && pseudochecker.IsInConstContext(d.Node) {
			// Only consult the contextual type if the pseudochecker's syntactic check also puts us in a const context.
			// getContextualType returns post-inference results at node-printing time which may not have existed
			// during initial checking (e.g. when the contextual type depends on inference), causing incorrect
			// literal type preservation.
			contextualType := b.ch.getContextualType(d.Node, ContextFlagsNone)
			t := b.pseudoTypeToType(d.ConstType)
			if t != nil && b.ch.isLiteralOfContextualType(t, b.ch.instantiateContextualType(contextualType, d.Node, ContextFlagsNone)) {
				isInConstContext = true
			}
		}
		if isInConstContext {
			return b.pseudoTypeToNode(d.ConstType)
		} else {
			return b.pseudoTypeToNode(d.RegularType)
		}
	case pseudochecker.PseudoTypeKindUnion:
		var res []*ast.Node
		var hasElidedType bool
		members := t.AsPseudoTypeUnion().Types
		for _, m := range members {
			if !b.ch.strictNullChecks {
				if m.Kind == pseudochecker.PseudoTypeKindUndefined || m.Kind == pseudochecker.PseudoTypeKindNull {
					hasElidedType = true
					continue
				}
			}
			res = append(res, b.pseudoTypeToNode(m))
		}
		if len(res) == 1 {
			return res[0]
		}
		if len(res) == 0 {
			if hasElidedType {
				return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
			}
			return b.f.NewKeywordTypeNode(ast.KindNeverKeyword)
		}
		return b.f.NewUnionTypeNode(b.f.NewNodeList(res))
	case pseudochecker.PseudoTypeKindUndefined:
		if !b.ch.strictNullChecks {
			return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
		}
		return b.f.NewKeywordTypeNode(ast.KindUndefinedKeyword)
	case pseudochecker.PseudoTypeKindNull:
		if !b.ch.strictNullChecks {
			return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
		}
		return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindNullKeyword))
	case pseudochecker.PseudoTypeKindAny:
		return b.f.NewKeywordTypeNode(ast.KindAnyKeyword)
	case pseudochecker.PseudoTypeKindString:
		return b.f.NewKeywordTypeNode(ast.KindStringKeyword)
	case pseudochecker.PseudoTypeKindNumber:
		return b.f.NewKeywordTypeNode(ast.KindNumberKeyword)
	case pseudochecker.PseudoTypeKindBigInt:
		return b.f.NewKeywordTypeNode(ast.KindBigIntKeyword)
	case pseudochecker.PseudoTypeKindBoolean:
		return b.f.NewKeywordTypeNode(ast.KindBooleanKeyword)
	case pseudochecker.PseudoTypeKindFalse:
		return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindFalseKeyword))
	case pseudochecker.PseudoTypeKindTrue:
		return b.f.NewLiteralTypeNode(b.f.NewKeywordExpression(ast.KindTrueKeyword))
	case pseudochecker.PseudoTypeKindSingleCallSignature:
		d := t.AsPseudoTypeSingleCallSignature()
		signature := b.ch.getSignatureFromDeclaration(d.Signature)
		expandedParams := b.ch.getExpandedParameters(signature, true /*skipUnionExpanding*/)[0]
		cleanup := b.enterNewScope(d.Signature, expandedParams, signature.typeParameters, signature.parameters, signature.mapper)
		defer cleanup()
		var typeParams *ast.NodeList
		if len(d.TypeParameters) > 0 {
			res := make([]*ast.Node, 0, len(d.TypeParameters))
			for _, tp := range d.TypeParameters {
				res = append(res, b.reuseNode(tp.AsNode()))
			}
			typeParams = b.f.NewNodeList(res)
		}
		params := b.pseudoParametersToNodeList(d.Parameters)
		returnType := b.pseudoTypeToNode(d.ReturnType)
		return b.f.NewFunctionTypeNode(typeParams, params, returnType)
	case pseudochecker.PseudoTypeKindTuple:
		var res []*ast.Node
		elements := t.AsPseudoTypeTuple().Elements
		for _, e := range elements {
			res = append(res, b.pseudoTypeToNode(e))
		}
		// pseudo-tuples are implicitly `readonly` since they originate from `as const` contexts
		// but strada *sometimes* fails to add the `readonly` modifier to the generated node.
		result := b.f.NewTupleTypeNode(b.f.NewNodeList(res))
		b.e.AddEmitFlags(result, printer.EFSingleLine)
		return b.f.NewTypeOperatorNode(ast.KindReadonlyKeyword, result)
	case pseudochecker.PseudoTypeKindObjectLiteral:
		elements := t.AsPseudoTypeObjectLiteral().Elements
		if len(elements) == 0 {
			result := b.f.NewTypeLiteralNode(b.f.NewNodeList(nil))
			b.e.AddEmitFlags(result, printer.EFSingleLine)
			return result
		}
		// NOTE: using the checker's `isConstContext` instead of the pseudochecker's `isInConstContext`
		// results in different results here. The checker one is more "correct" but means we'll mark
		// objects in parameter positions contextually typed by const type parameters as readonly -
		// something a true syntactic ID emitter couldn't possibly know (since the signature could
		// be from across files). This can't *really* happen in any cases ID doesn't already error on, though.
		// Just something to keep in mind if the ID checker keeps growing.
		isConst := b.ch.isConstContext(elements[0].Name)
		newElements := make([]*ast.Node, 0, len(elements))

		for _, e := range elements {
			var modifiers *ast.ModifierList
			if isConst || (e.Kind == pseudochecker.PseudoObjectElementKindPropertyAssignment && e.AsPseudoPropertyAssignment().Readonly) {
				modifiers = b.f.NewModifierList([]*ast.Node{b.f.NewModifier(ast.KindReadonlyKeyword)})
			}
			if e.Kind != pseudochecker.PseudoObjectElementKindPropertyAssignment {
				signature := b.ch.getSignatureFromDeclaration(e.Signature())
				expandedParams := b.ch.getExpandedParameters(signature, true /*skipUnionExpanding*/)[0]
				cleanup := b.enterNewScope(e.Signature(), expandedParams, signature.typeParameters, signature.parameters, signature.mapper)
				defer cleanup()
			}
			var newProp *ast.Node
			switch e.Kind {
			case pseudochecker.PseudoObjectElementKindMethod:
				d := e.AsPseudoObjectMethod()
				var typeParams *ast.NodeList
				if len(d.TypeParameters) > 0 {
					res := make([]*ast.Node, 0, len(d.TypeParameters))
					for _, tp := range d.TypeParameters {
						res = append(res, b.reuseNode(tp.AsNode()))
					}
					typeParams = b.f.NewNodeList(res)
				}
				if isConst {
					newProp = b.f.NewPropertySignatureDeclaration(
						modifiers,
						b.reuseName(e.Name),
						nil,
						b.f.NewFunctionTypeNode(
							typeParams,
							b.pseudoParametersToNodeList(d.Parameters),
							b.pseudoTypeToNode(d.ReturnType),
						),
						nil,
					)
					break
				}
				newProp = b.f.NewMethodSignatureDeclaration(
					modifiers,
					b.reuseName(e.Name),
					nil,
					typeParams,
					b.pseudoParametersToNodeList(d.Parameters),
					b.pseudoTypeToNode(d.ReturnType),
				)
			case pseudochecker.PseudoObjectElementKindPropertyAssignment:
				d := e.AsPseudoPropertyAssignment()
				newProp = b.f.NewPropertySignatureDeclaration(
					modifiers,
					b.reuseName(e.Name),
					nil,
					b.pseudoTypeToNode(d.Type),
					nil,
				)
			case pseudochecker.PseudoObjectElementKindSetAccessor:
				d := e.AsPseudoSetAccessor()
				newProp = b.f.NewSetAccessorDeclaration(
					nil,
					b.reuseName(e.Name),
					nil,
					b.f.NewNodeList([]*ast.Node{b.pseudoParameterToNode(d.Parameter)}),
					nil,
					nil,
					nil,
				)
			case pseudochecker.PseudoObjectElementKindGetAccessor:
				d := e.AsPseudoGetAccessor()
				newProp = b.f.NewGetAccessorDeclaration(
					nil,
					b.reuseName(e.Name),
					nil,
					nil,
					b.pseudoTypeToNode(d.Type),
					nil,
					nil,
				)
			}
			if b.ctx.enclosingFile == ast.GetSourceFileOfNode(e.Name) {
				b.e.SetCommentRange(newProp, e.Name.Parent.Loc)
			}
			newElements = append(newElements, newProp)
		}
		result := b.f.NewTypeLiteralNode(b.f.NewNodeList(newElements))
		if b.ctx.flags&nodebuilder.FlagsMultilineObjectLiterals == 0 {
			b.e.AddEmitFlags(result, printer.EFSingleLine)
		}
		return result
	case pseudochecker.PseudoTypeKindStringLiteral, pseudochecker.PseudoTypeKindNumericLiteral, pseudochecker.PseudoTypeKindBigIntLiteral:
		source := t.AsPseudoTypeLiteral().Node
		return b.f.NewLiteralTypeNode(b.reuseNode(source))
	default:
		debug.AssertNever(t.Kind, "Unhandled pseudotype kind in pseudotype node construction")
		return nil
	}
}

func (b *NodeBuilderImpl) pseudoParametersToNodeList(params []*pseudochecker.PseudoParameter) *ast.NodeList {
	res := make([]*ast.Node, 0, len(params))
	for _, p := range params {
		res = append(res, b.pseudoParameterToNode(p))
	}
	return b.f.NewNodeList(res)
}

func (b *NodeBuilderImpl) pseudoParameterToNode(p *pseudochecker.PseudoParameter) *ast.Node {
	var dotDotDot *ast.Node
	var questionMark *ast.Node
	if p.Rest {
		dotDotDot = b.f.NewToken(ast.KindDotDotDotToken)
	}
	if p.Optional {
		questionMark = b.f.NewToken(ast.KindQuestionToken)
	}
	return b.f.NewParameterDeclaration(
		nil,
		dotDotDot,
		// matches strada behavior of always reserializing param names from scratch
		b.parameterToParameterDeclarationName(p.Name.Parent.Symbol(), p.Name.Parent),
		questionMark,
		b.pseudoTypeToNode(p.Type),
		nil,
	)
}

// see `typeNodeIsEquivalentToType` in strada, but applied more broadly here, so is setup to handle more equivalences - strada only used it via
// the `canReuseTypeNodeAnnotation` host hook and not the `canReuseTypeNode` hook, which meant locations using the later were reliant on
// over-invalidation by the ID inference engine to not emit incorrect types.
func (b *NodeBuilderImpl) pseudoTypeEquivalentToType(t *pseudochecker.PseudoType, type_ *Type, isOptionalAnnotated bool, reportErrors bool) bool {
	// if type_ resolves to an error, we charitably assume equality, since we might be in a single-file checking mode
	if type_ != nil && b.ch.isErrorType(type_) {
		return true
	}
	// If we can easily operate on just types, we should
	typeFromPseudo := b.pseudoTypeToType(t) // note: cannot convert complex types like objects, which must be validated separately
	if typeFromPseudo == type_ {
		return true
	}
	if typeFromPseudo != nil && type_ != nil {
		if isOptionalAnnotated {
			undefinedStripped := b.ch.getTypeWithFacts(type_, TypeFactsNEUndefined)
			if undefinedStripped == typeFromPseudo {
				return true
			}
			if typeFromPseudo.flags&TypeFlagsUnion != 0 && undefinedStripped.flags&TypeFlagsUnion != 0 {
				// does union comparison in general, since the unions may not be `==` identical due to aliasing and the like
				if b.ch.compareTypesIdentical(typeFromPseudo, undefinedStripped) == TernaryTrue {
					return true
				}
			}
		}
		// handles freshness mismatches (e.g., fresh true vs regular true in as const)
		if b.ch.getRegularTypeOfLiteralType(typeFromPseudo) == b.ch.getRegularTypeOfLiteralType(type_) {
			return true
		}
		if typeFromPseudo.flags&TypeFlagsUnion != 0 && type_.flags&TypeFlagsUnion != 0 {
			// handles union comparison in general, since unions may not be `==` identical due to aliasing
			if b.ch.compareTypesIdentical(typeFromPseudo, type_) == TernaryTrue {
				return true
			}
		}
	}
	// otherwise, fallback to actual pseudo/type cross-comparisons
	switch t.Kind {
	case pseudochecker.PseudoTypeKindInferred:
		// PseudoTypeInferred with error nodes identifies specific problematic children.
		// Report fine-grained errors on them, then return false so the parent falls back
		// to checker-based serialization (avoiding issues like reusing raw JSON string
		// literal property names from the pseudochecker's AST).
		if errorNodes := t.AsPseudoTypeInferred().ErrorNodes; len(errorNodes) > 0 {
			if reportErrors {
				for _, n := range errorNodes {
					b.ctx.tracker.ReportInferenceFallback(n)
				}
			}
			return false
		}
		if reportErrors {
			b.ctx.tracker.ReportInferenceFallback(t.AsPseudoTypeInferred().Expression)
		}
		return false
	case pseudochecker.PseudoTypeKindObjectLiteral:
		pt := t.AsPseudoTypeObjectLiteral()
		if type_ == nil {
			return false
		}
		targetProps := b.ch.getPropertiesOfType(type_)
		// Count total declarations across all target prop symbols to handle getter/setter pairs,
		// which are two elements in pt.Elements but only one symbol in targetProps.
		targetDeclCount := 0
		for _, prop := range targetProps {
			targetDeclCount += len(prop.Declarations)
		}
		if len(pt.Elements) != targetDeclCount {
			return false
		}
		for _, e := range pt.Elements {
			var targetProp *ast.Symbol
			elemSymbol := e.Name.Parent.Symbol()
			if elemSymbol != nil {
				targetProp = b.ch.getPropertyOfType(type_, elemSymbol.Name)
			}
			if targetProp == nil {
				// Name lookup failed or returned no result; search target properties
				// for one whose declaration name node matches the one we have
				for _, prop := range targetProps {
					if prop.ValueDeclaration != nil && prop.ValueDeclaration.Name() == e.Name {
						targetProp = prop
						break
					}
				}
				if targetProp == nil {
					if reportErrors {
						b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
					}
					return false
				}
			}
			targetIsOptional := targetProp.Flags&ast.SymbolFlagsOptional != 0
			if e.Optional != targetIsOptional {
				if reportErrors {
					b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
				}
				return false
			}
			propType := b.ch.getTypeOfSymbol(targetProp)
			propType = b.ch.removeMissingType(propType, targetIsOptional)
			switch e.Kind {
			case pseudochecker.PseudoObjectElementKindPropertyAssignment:
				d := e.AsPseudoPropertyAssignment()
				if !b.pseudoTypeEquivalentToType(d.Type, propType, e.Optional, false) {
					if reportErrors {
						if d.Type.Kind == pseudochecker.PseudoTypeKindInferred && len(d.Type.AsPseudoTypeInferred().ErrorNodes) > 0 {
							// Re-report the fine-grained error nodes; the recursive call used reportErrors=false
							for _, n := range d.Type.AsPseudoTypeInferred().ErrorNodes {
								b.ctx.tracker.ReportInferenceFallback(n)
							}
						} else if !isStructuralPseudoType(d.Type) {
							b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
						}
					}
					return false
				}
			case pseudochecker.PseudoObjectElementKindMethod:
				d := e.AsPseudoObjectMethod()
				targetSig := b.ch.getSingleCallSignature(propType)
				if targetSig == nil {
					// Target property type doesn't have a single call signature; can't validate
					continue
				}
				if len(targetSig.parameters) != len(d.Parameters) {
					if reportErrors {
						b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
					}
					return false
				}
				for i, p := range d.Parameters {
					targetParam := targetSig.parameters[i]
					paramType := b.ch.getTypeOfParameter(targetParam)
					if !b.pseudoTypeEquivalentToType(p.Type, paramType, p.Optional, false) {
						if reportErrors {
							b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
						}
						return false
					}
				}
				targetPredicate := b.ch.getTypePredicateOfSignature(targetSig)
				if targetPredicate != nil {
					if !b.pseudoReturnTypeMatchesPredicate(d.ReturnType, targetPredicate) {
						if reportErrors {
							b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
						}
						return false
					}
				} else if !b.pseudoTypeEquivalentToType(d.ReturnType, b.ch.getReturnTypeOfSignature(targetSig), false, false) {
					if reportErrors {
						b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
					}
					return false
				}
			case pseudochecker.PseudoObjectElementKindGetAccessor:
				d := e.AsPseudoGetAccessor()
				if !b.pseudoTypeEquivalentToType(d.Type, propType, false, false) {
					if reportErrors {
						b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
					}
					return false
				}
			case pseudochecker.PseudoObjectElementKindSetAccessor:
				d := e.AsPseudoSetAccessor()
				writeType := b.ch.getWriteTypeOfSymbol(targetProp)
				if !b.pseudoTypeEquivalentToType(d.Parameter.Type, writeType, false, false) {
					if reportErrors {
						b.ctx.tracker.ReportInferenceFallback(e.Name.Parent)
					}
					return false
				}
			}
		}
		return true
	case pseudochecker.PseudoTypeKindTuple:
		pt := t.AsPseudoTypeTuple()
		if type_ == nil || !isTupleType(type_) {
			return false
		}
		tupleTarget := type_.TargetTupleType()
		// Pseudo-tuples come from `as const` array literals, so they only ever have required elements.
		// If the target tuple has optional, rest, or variadic elements, the structures can't match.
		if tupleTarget.combinedFlags&ElementFlagsNonRequired != 0 {
			return false
		}
		elementTypes := b.ch.getTypeArguments(type_)
		if len(pt.Elements) != len(elementTypes) {
			return false
		}
		for i, elem := range pt.Elements {
			if !b.pseudoTypeEquivalentToType(elem, elementTypes[i], false, reportErrors) {
				return false
			}
		}
		return true
	case pseudochecker.PseudoTypeKindSingleCallSignature:
		targetSig := b.ch.getSingleCallSignature(type_)
		if targetSig == nil {
			return false
		}
		pt := t.AsPseudoTypeSingleCallSignature()
		if len(targetSig.typeParameters) != len(pt.TypeParameters) {
			if reportErrors {
				b.ctx.tracker.ReportInferenceFallback(pt.Signature)
			}
			return false
		}
		if len(targetSig.parameters) != len(pt.Parameters) {
			if reportErrors {
				b.ctx.tracker.ReportInferenceFallback(pt.Signature)
			}
			return false // TODO: spread tuple params may mess with this check
		}
		for i, p := range pt.Parameters {
			targetParam := targetSig.parameters[i]
			if p.Optional != b.ch.isOptionalParameter(targetParam.ValueDeclaration) {
				if reportErrors {
					b.ctx.tracker.ReportInferenceFallback(p.Name.Parent)
				}
				return false
			}
			paramType := b.ch.getTypeOfParameter(targetParam)
			if !b.pseudoTypeEquivalentToType(p.Type, paramType, p.Optional, false) {
				if reportErrors {
					b.ctx.tracker.ReportInferenceFallback(p.Name.Parent)
				}
				return false
			}
		}
		targetPredicate := b.ch.getTypePredicateOfSignature(targetSig)
		if targetPredicate != nil {
			if !b.pseudoReturnTypeMatchesPredicate(pt.ReturnType, targetPredicate) {
				if reportErrors {
					b.ctx.tracker.ReportInferenceFallback(pt.Signature)
				}
				return false
			}
		} else if !b.pseudoTypeEquivalentToType(pt.ReturnType, b.ch.getReturnTypeOfSignature(targetSig), false, reportErrors) {
			// error reported within the return type
			return false
		}
		return true
	case pseudochecker.PseudoTypeKindNoResult:
		if reportErrors {
			b.ctx.tracker.ReportInferenceFallback(t.AsPseudoTypeNoResult().Declaration)
		}
		return false
	default:
		return false
	}
}

func isStructuralPseudoType(t *pseudochecker.PseudoType) bool {
	switch t.Kind {
	case pseudochecker.PseudoTypeKindObjectLiteral, pseudochecker.PseudoTypeKindTuple, pseudochecker.PseudoTypeKindSingleCallSignature:
		return true
	case pseudochecker.PseudoTypeKindMaybeConstLocation:
		d := t.AsPseudoTypeMaybeConstLocation()
		return isStructuralPseudoType(d.ConstType) || isStructuralPseudoType(d.RegularType)
	}
	return false
}

// pseudoReturnTypeMatchesPredicate checks if a pseudo return type (which should be a Direct type
// wrapping a TypePredicate) matches the given type predicate from the checker.
func (b *NodeBuilderImpl) pseudoReturnTypeMatchesPredicate(rt *pseudochecker.PseudoType, predicate *TypePredicate) bool {
	if rt.Kind != pseudochecker.PseudoTypeKindDirect {
		return false
	}
	node := rt.AsPseudoTypeDirect().TypeNode
	if !ast.IsTypePredicateNode(node) {
		return false
	}
	tp := node.AsTypePredicateNode()
	// Check asserts modifier matches
	isAsserts := tp.AssertsModifier != nil
	predicateIsAsserts := predicate.kind == TypePredicateKindAssertsThis || predicate.kind == TypePredicateKindAssertsIdentifier
	if isAsserts != predicateIsAsserts {
		return false
	}
	// Check this vs identifier matches
	isThis := ast.IsThisTypeNode(tp.ParameterName)
	predicateIsThis := predicate.kind == TypePredicateKindThis || predicate.kind == TypePredicateKindAssertsThis
	if isThis != predicateIsThis {
		return false
	}
	// For identifier predicates, check parameter name matches
	if !isThis {
		if tp.ParameterName.Text() != predicate.parameterName {
			return false
		}
	}
	// Check the narrowed type, if any
	if predicate.t != nil {
		if tp.Type == nil {
			return false
		}
		predicateTypeFromNode := b.ch.getTypeFromTypeNode(tp.Type)
		if predicateTypeFromNode != predicate.t {
			if b.ch.compareTypesIdentical(predicateTypeFromNode, predicate.t) != TernaryTrue {
				return false
			}
		}
	} else if tp.Type != nil {
		return false
	}
	return true
}

func (b *NodeBuilderImpl) pseudoTypeToType(t *pseudochecker.PseudoType) *Type {
	// !!! TODO: only literal types currently mapped because this is only used to determine if literal contextual typing need apply to the pseudotype
	// If this is used more broadly, the implementation needs to be filled out more to handle the structural pseudotypes - signatures, objects, tuples, etc
	debug.Assert(t != nil, "Attempted to realize nil pseudotype")
	switch t.Kind {
	case pseudochecker.PseudoTypeKindDirect:
		return b.ch.getTypeFromTypeNode(t.AsPseudoTypeDirect().TypeNode)
	case pseudochecker.PseudoTypeKindInferred:
		node := t.AsPseudoTypeInferred().Expression
		ty := b.ch.getWidenedType(b.ch.getRegularTypeOfExpression(node))
		return ty
	case pseudochecker.PseudoTypeKindNoResult:
		return nil // TODO: extract type selection logic from `serializeTypeForDeclaration`, not needed for current usecases but needed if completeness becomes required
	case pseudochecker.PseudoTypeKindMaybeConstLocation:
		d := t.AsPseudoTypeMaybeConstLocation()
		if b.ch.isConstContext(d.Node) {
			return b.pseudoTypeToType(d.ConstType)
		}
		return b.pseudoTypeToType(d.RegularType)
	case pseudochecker.PseudoTypeKindUnion:
		var res []*Type
		var hasElidedType bool
		members := t.AsPseudoTypeUnion().Types
		for _, m := range members {
			if !b.ch.strictNullChecks {
				if m.Kind == pseudochecker.PseudoTypeKindUndefined || m.Kind == pseudochecker.PseudoTypeKindNull {
					hasElidedType = true
					continue
				}
			}
			t := b.pseudoTypeToType(m)
			if t == nil {
				return nil // propagate failure
			}
			res = append(res, t)
		}
		if len(res) == 1 {
			return res[0]
		}
		if len(res) == 0 {
			if hasElidedType {
				return b.ch.anyType
			}
			return b.ch.neverType
		}
		return b.ch.getUnionType(res)
	case pseudochecker.PseudoTypeKindUndefined:
		return b.ch.undefinedWideningType
	case pseudochecker.PseudoTypeKindNull:
		return b.ch.nullWideningType
	case pseudochecker.PseudoTypeKindAny:
		return b.ch.anyType
	case pseudochecker.PseudoTypeKindString:
		return b.ch.stringType
	case pseudochecker.PseudoTypeKindNumber:
		return b.ch.numberType
	case pseudochecker.PseudoTypeKindBigInt:
		return b.ch.bigintType
	case pseudochecker.PseudoTypeKindBoolean:
		return b.ch.booleanType
	case pseudochecker.PseudoTypeKindFalse:
		return b.ch.falseType
	case pseudochecker.PseudoTypeKindTrue:
		return b.ch.trueType
	case pseudochecker.PseudoTypeKindStringLiteral, pseudochecker.PseudoTypeKindNumericLiteral, pseudochecker.PseudoTypeKindBigIntLiteral:
		source := t.AsPseudoTypeLiteral().Node
		return b.ch.getRegularTypeOfExpression(source) // big shortcut, uses cached expression types where possible
	case pseudochecker.PseudoTypeKindObjectLiteral, pseudochecker.PseudoTypeKindSingleCallSignature, pseudochecker.PseudoTypeKindTuple:
		return nil // no simple mapping to a type, since these are structural types
	default:
		debug.Fail("Unhandled pseudochecker.PseudoTypeKind in pseudoTypeToType")
		return nil
	}
}
