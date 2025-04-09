package checker

import (
	"math"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type JsxFlags uint32

const (
	JsxFlagsNone                    JsxFlags = 0
	JsxFlagsIntrinsicNamedElement   JsxFlags = 1 << 0 // An element from a named property of the JSX.IntrinsicElements interface
	JsxFlagsIntrinsicIndexedElement JsxFlags = 1 << 1 // An element inferred from the string index signature of the JSX.IntrinsicElements interface
	JsxFlagsIntrinsicElement        JsxFlags = JsxFlagsIntrinsicNamedElement | JsxFlagsIntrinsicIndexedElement
)

type JsxReferenceKind int32

const (
	JsxReferenceKindComponent JsxReferenceKind = iota
	JsxReferenceKindFunction
	JsxReferenceKindMixed
)

type JsxElementLinks struct {
	jsxFlags                         JsxFlags    // Flags for the JSX element
	resolvedJsxElementAttributesType *Type       // Resolved element attributes type of a JSX opening-like element
	jsxNamespace                     *ast.Symbol // Resolved JSX namespace symbol for this node
	jsxImplicitImportContainer       *ast.Symbol // Resolved module symbol the implicit JSX import of this file should refer to
}

var JsxNames = struct {
	JSX                                    string
	IntrinsicElements                      string
	ElementClass                           string
	ElementAttributesPropertyNameContainer string
	ElementChildrenAttributeNameContainer  string
	Element                                string
	ElementType                            string
	IntrinsicAttributes                    string
	IntrinsicClassAttributes               string
	LibraryManagedAttributes               string
}{
	JSX:                                    "JSX",
	IntrinsicElements:                      "IntrinsicElements",
	ElementClass:                           "ElementClass",
	ElementAttributesPropertyNameContainer: "ElementAttributesProperty",
	ElementChildrenAttributeNameContainer:  "ElementChildrenAttribute",
	Element:                                "Element",
	ElementType:                            "ElementType",
	IntrinsicAttributes:                    "IntrinsicAttributes",
	IntrinsicClassAttributes:               "IntrinsicClassAttributes",
	LibraryManagedAttributes:               "LibraryManagedAttributes",
}

func (c *Checker) checkJsxElement(node *ast.Node, checkMode CheckMode) *Type {
	c.checkNodeDeferred(node)
	return c.getJsxElementTypeAt(node)
}

func (c *Checker) checkJsxElementDeferred(node *ast.Node) {
	jsxElement := node.AsJsxElement()
	c.checkJsxOpeningLikeElementOrOpeningFragment(jsxElement.OpeningElement)
	// Perform resolution on the closing tag so that rename/go to definition/etc work
	if isJsxIntrinsicTagName(jsxElement.ClosingElement.TagName()) {
		c.getIntrinsicTagSymbol(jsxElement.ClosingElement)
	} else {
		c.checkExpression(jsxElement.ClosingElement.TagName())
	}
	c.checkJsxChildren(node, CheckModeNormal)
}

func (c *Checker) checkJsxExpression(node *ast.Node, checkMode CheckMode) *Type {
	c.checkGrammarJsxExpression(node.AsJsxExpression())
	if node.Expression() == nil {
		return c.errorType
	}
	t := c.checkExpressionEx(node.Expression(), checkMode)
	if node.AsJsxExpression().DotDotDotToken != nil && t != c.anyType && !c.isArrayType(t) {
		c.error(node, diagnostics.JSX_spread_child_must_be_an_array_type)
	}
	return t
}

func (c *Checker) checkJsxSelfClosingElement(node *ast.Node, checkMode CheckMode) *Type {
	c.checkNodeDeferred(node)
	return c.getJsxElementTypeAt(node)
}

func (c *Checker) checkJsxSelfClosingElementDeferred(node *ast.Node) {
	c.checkJsxOpeningLikeElementOrOpeningFragment(node)
}

func (c *Checker) checkJsxFragment(node *ast.Node) *Type {
	c.checkJsxOpeningLikeElementOrOpeningFragment(node.AsJsxFragment().OpeningFragment)
	// by default, jsx:'react' will use jsxFactory = React.createElement and jsxFragmentFactory = React.Fragment
	// if jsxFactory compiler option is provided, ensure jsxFragmentFactory compiler option or @jsxFrag pragma is provided too
	nodeSourceFile := ast.GetSourceFileOfNode(node)
	if c.compilerOptions.GetJSXTransformEnabled() && (c.compilerOptions.JsxFactory != "" || getPragmaFromSourceFile(nodeSourceFile, "jsx") != nil) && c.compilerOptions.JsxFragmentFactory == "" && getPragmaFromSourceFile(nodeSourceFile, "jsxfrag") == nil {
		message := core.IfElse(c.compilerOptions.JsxFactory != "",
			diagnostics.The_jsxFragmentFactory_compiler_option_must_be_provided_to_use_JSX_fragments_with_the_jsxFactory_compiler_option,
			diagnostics.An_jsxFrag_pragma_is_required_when_using_an_jsx_pragma_with_JSX_fragments)
		c.error(node, message)
	}
	c.checkJsxChildren(node, CheckModeNormal)
	return c.getJsxElementTypeAt(node)
}

func (c *Checker) checkJsxAttributes(node *ast.Node, checkMode CheckMode) *Type {
	return c.createJsxAttributesTypeFromAttributesProperty(node.Parent, checkMode)
}

func (c *Checker) checkJsxOpeningLikeElementOrOpeningFragment(node *ast.Node) {
	isNodeOpeningLikeElement := isJsxOpeningLikeElement(node)
	if isNodeOpeningLikeElement {
		c.checkGrammarJsxElement(node)
	}
	c.checkJsxPreconditions(node)
	c.markJsxAliasReferenced(node)
	if isNodeOpeningLikeElement {
		sig := c.getResolvedSignature(node, nil, CheckModeNormal)
		c.checkDeprecatedSignature(sig, node)
		elementTypeConstraint := c.getJsxElementTypeTypeAt(node)
		if elementTypeConstraint != nil {
			tagName := node.TagName()
			var tagType *Type
			if isJsxIntrinsicTagName(tagName) {
				tagType = c.getStringLiteralType(tagName.Text())
			} else {
				tagType = c.checkExpression(tagName)
			}
			var diags []*ast.Diagnostic
			if !c.checkTypeRelatedToEx(tagType, elementTypeConstraint, c.assignableRelation, tagName, diagnostics.Its_type_0_is_not_a_valid_JSX_element_type, &diags) {
				c.diagnostics.Add(ast.NewDiagnosticChain(diags[0], diagnostics.X_0_cannot_be_used_as_a_JSX_component, scanner.GetTextOfNode(tagName)))
			}
		} else {
			c.checkJsxReturnAssignableToAppropriateBound(c.getJsxReferenceKind(node), c.getReturnTypeOfSignature(sig), node)
		}
	}
}

func (c *Checker) checkJsxPreconditions(errorNode *ast.Node) {
	// Preconditions for using JSX
	if c.compilerOptions.Jsx == core.JsxEmitNone {
		c.error(errorNode, diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided)
	}
	if c.noImplicitAny && c.getJsxElementTypeAt(errorNode) == nil {
		c.error(errorNode, diagnostics.JSX_element_implicitly_has_type_any_because_the_global_type_JSX_Element_does_not_exist)
	}
}

func (c *Checker) checkJsxReturnAssignableToAppropriateBound(refKind JsxReferenceKind, elemInstanceType *Type, openingLikeElement *ast.Node) {
	var diags []*ast.Diagnostic
	switch refKind {
	case JsxReferenceKindFunction:
		sfcReturnConstraint := c.getJsxStatelessElementTypeAt(openingLikeElement)
		if sfcReturnConstraint != nil {
			c.checkTypeRelatedToEx(elemInstanceType, sfcReturnConstraint, c.assignableRelation, openingLikeElement.TagName(), diagnostics.Its_return_type_0_is_not_a_valid_JSX_element, &diags)
		}
	case JsxReferenceKindComponent:
		classConstraint := c.getJsxElementClassTypeAt(openingLikeElement)
		if classConstraint != nil {
			// Issue an error if this return type isn't assignable to JSX.ElementClass, failing that
			c.checkTypeRelatedToEx(elemInstanceType, classConstraint, c.assignableRelation, openingLikeElement.TagName(), diagnostics.Its_instance_type_0_is_not_a_valid_JSX_element, &diags)
		}
	default:
		sfcReturnConstraint := c.getJsxStatelessElementTypeAt(openingLikeElement)
		classConstraint := c.getJsxElementClassTypeAt(openingLikeElement)
		if sfcReturnConstraint == nil || classConstraint == nil {
			return
		}
		combined := c.getUnionType([]*Type{sfcReturnConstraint, classConstraint})
		c.checkTypeRelatedToEx(elemInstanceType, combined, c.assignableRelation, openingLikeElement.TagName(), diagnostics.Its_element_type_0_is_not_a_valid_JSX_element, &diags)
	}
	if len(diags) != 0 {
		c.diagnostics.Add(ast.NewDiagnosticChain(diags[0], diagnostics.X_0_cannot_be_used_as_a_JSX_component, scanner.GetTextOfNode(openingLikeElement.TagName())))
	}
}

func (c *Checker) inferJsxTypeArguments(node *ast.Node, signature *Signature, checkMode CheckMode, context *InferenceContext) []*Type {
	paramType := c.getEffectiveFirstArgumentForJsxSignature(signature, node)
	checkAttrType := c.checkExpressionWithContextualType(node.Attributes(), paramType, context, checkMode)
	c.inferTypes(context.inferences, checkAttrType, paramType, InferencePriorityNone, false)
	return c.getInferredTypes(context)
}

func (c *Checker) getContextualTypeForJsxExpression(node *ast.Node, contextFlags ContextFlags) *Type {
	switch {
	case ast.IsJsxAttributeLike(node.Parent):
		return c.getContextualType(node, contextFlags)
	case ast.IsJsxElement(node.Parent):
		return c.getContextualTypeForChildJsxExpression(node.Parent, node, contextFlags)
	}
	return nil
}

func (c *Checker) getContextualTypeForJsxAttribute(attribute *ast.Node, contextFlags ContextFlags) *Type {
	// When we trying to resolve JsxOpeningLikeElement as a stateless function element, we will already give its attributes a contextual type
	// which is a type of the parameter of the signature we are trying out.
	// If there is no contextual type (e.g. we are trying to resolve stateful component), get attributes type from resolving element's tagName
	if ast.IsJsxAttribute(attribute) {
		attributesType := c.getApparentTypeOfContextualType(attribute.Parent, contextFlags)
		if attributesType == nil || IsTypeAny(attributesType) {
			return nil
		}
		return c.getTypeOfPropertyOfContextualType(attributesType, attribute.Name().Text())
	}
	return c.getContextualType(attribute.Parent, contextFlags)
}

func (c *Checker) getContextualJsxElementAttributesType(node *ast.Node, contextFlags ContextFlags) *Type {
	if ast.IsJsxOpeningElement(node) && contextFlags != ContextFlagsCompletions {
		index := c.findContextualNode(node.Parent, contextFlags == ContextFlagsNone)
		if index >= 0 {
			// Contextually applied type is moved from attributes up to the outer jsx attributes so when walking up from the children they get hit
			// _However_ to hit them from the _attributes_ we must look for them here; otherwise we'll used the declared type
			// (as below) instead!
			return c.contextualInfos[index].t
		}
	}
	return c.getContextualTypeForArgumentAtIndex(node, 0)
}

func (c *Checker) getContextualTypeForChildJsxExpression(node *ast.Node, child *ast.JsxChild, contextFlags ContextFlags) *Type {
	attributesType := c.getApparentTypeOfContextualType(node.AsJsxElement().OpeningElement.Attributes(), contextFlags)
	// JSX expression is in children of JSX Element, we will look for an "children" attribute (we get the name from JSX.ElementAttributesProperty)
	jsxChildrenPropertyName := c.getJsxElementChildrenPropertyName(c.getJsxNamespaceAt(node))
	if !(attributesType != nil && !IsTypeAny(attributesType) && jsxChildrenPropertyName != ast.InternalSymbolNameMissing && jsxChildrenPropertyName != "") {
		return nil
	}
	realChildren := getSemanticJsxChildren(node.Children().Nodes)
	childIndex := slices.Index(realChildren, child)
	childFieldType := c.getTypeOfPropertyOfContextualType(attributesType, jsxChildrenPropertyName)
	if childFieldType == nil {
		return nil
	}
	if len(realChildren) == 1 {
		return childFieldType
	}
	return c.mapTypeEx(childFieldType, func(t *Type) *Type {
		if c.isArrayLikeType(t) {
			return c.getIndexedAccessType(t, c.getNumberLiteralType(jsnum.Number(childIndex)))
		}
		return t
	}, true /*noReductions*/)
}

func (c *Checker) discriminateContextualTypeByJSXAttributes(node *ast.Node, contextualType *Type) *Type {
	key := DiscriminatedContextualTypeKey{nodeId: ast.GetNodeId(node), typeId: contextualType.id}
	if discriminated := c.discriminatedContextualTypes[key]; discriminated != nil {
		return discriminated
	}
	jsxChildrenPropertyName := c.getJsxElementChildrenPropertyName(c.getJsxNamespaceAt(node))
	discriminantProperties := core.Filter(node.AsJsxAttributes().Properties.Nodes, func(p *ast.Node) bool {
		symbol := p.Symbol()
		if symbol == nil || !ast.IsJsxAttribute(p) {
			return false
		}
		initializer := p.Initializer()
		return (initializer == nil || c.isPossiblyDiscriminantValue(initializer)) && c.isDiscriminantProperty(contextualType, symbol.Name)
	})
	discriminantMembers := core.Filter(c.getPropertiesOfType(contextualType), func(s *ast.Symbol) bool {
		if s.Flags&ast.SymbolFlagsOptional == 0 || node.Symbol() == nil || len(node.Symbol().Members) == 0 {
			return false
		}
		element := node.Parent.Parent
		if s.Name == jsxChildrenPropertyName && ast.IsJsxElement(element) && len(getSemanticJsxChildren(element.Children().Nodes)) != 0 {
			return false
		}
		return node.Symbol().Members[s.Name] == nil && c.isDiscriminantProperty(contextualType, s.Name)
	})
	discriminator := &ObjectLiteralDiscriminator{c: c, props: discriminantProperties, members: discriminantMembers}
	discriminated := c.discriminateTypeByDiscriminableItems(contextualType, discriminator)
	c.discriminatedContextualTypes[key] = discriminated
	return discriminated
}

func (c *Checker) elaborateJsxComponents(node *ast.Node, source *Type, target *Type, relation *Relation, diagnosticOutput *[]*ast.Diagnostic) bool {
	reportedError := false
	for _, prop := range node.AsJsxAttributes().Properties.Nodes {
		if !ast.IsJsxSpreadAttribute(prop) && !isHyphenatedJsxName(prop.Name().Text()) {
			nameType := c.getStringLiteralType(prop.Name().Text())
			if nameType != nil && nameType.flags&TypeFlagsNever == 0 {
				reportedError = c.elaborateElement(source, target, relation, prop.Name(), prop.Initializer(), nameType, nil, diagnosticOutput) || reportedError
			}
		}
	}
	if ast.IsJsxOpeningElement(node.Parent) && ast.IsJsxElement(node.Parent.Parent) {
		// containingElement := node.Parent.Parent
		// childrenPropName := c.getJsxElementChildrenPropertyName(c.getJsxNamespaceAt(node))
		// if childrenPropName == ast.InternalSymbolNameMissing {
		// 	childrenPropName = "children"
		// }
		// childrenNameType := c.getStringLiteralType(childrenPropName)
		// childrenTargetType := c.getIndexedAccessType(target, childrenNameType)
		// validChildren := getSemanticJsxChildren(containingElement.Children().Nodes)
		// if len(validChildren) == 0 {
		// 	return reportedError
		// }
		// moreThanOneRealChildren := len(validChildren) > 1
		// var arrayLikeTargetParts *Type
		// var nonArrayLikeTargetParts *Type
		// iterableType := c.getGlobalIterableType()
		// if iterableType != c.emptyGenericType {
		// 	anyIterable := c.createIterableType(c.anyType)
		// 	arrayLikeTargetParts = c.filterType(childrenTargetType, func(t *Type) bool {
		// 		return c.isTypeAssignableTo(t, anyIterable)
		// 	})
		// 	nonArrayLikeTargetParts = c.filterType(childrenTargetType, func(t *Type) bool {
		// 		return !c.isTypeAssignableTo(t, anyIterable)
		// 	})
		// } else {
		// 	arrayLikeTargetParts = c.filterType(childrenTargetType, c.isArrayOrTupleLikeType)
		// 	nonArrayLikeTargetParts = c.filterType(childrenTargetType, func(t *Type) bool {
		// 		return !c.isArrayOrTupleLikeType(t)
		// 	})
		// }
		// if moreThanOneRealChildren {
		// 	if arrayLikeTargetParts != c.neverType {
		// 		realSource := c.createTupleType(c.checkJsxChildren(containingElement, CheckModeNormal))
		// 		children := c.generateJsxChildren(containingElement, getInvalidTextualChildDiagnostic)
		// 		result = c.elaborateIterableOrArrayLikeTargetElementwise(children, realSource, arrayLikeTargetParts, relation, containingMessageChain, errorOutputContainer) || result
		// 	} else if !c.isTypeRelatedTo(c.getIndexedAccessType(source, childrenNameType), childrenTargetType, relation) {
		// 		// arity mismatch
		// 		result = true
		// 		diag := c.error(containingElement.OpeningElement.TagName, Diagnostics.This_JSX_tag_s_0_prop_expects_a_single_child_of_type_1_but_multiple_children_were_provided, childrenPropName, c.typeToString(childrenTargetType))
		// 		if errorOutputContainer != nil && errorOutputContainer.skipLogging {
		// 			(errorOutputContainer.errors || ( /* TODO(TS-TO-GO) EqualsToken BinaryExpression: errorOutputContainer.errors = [] */ TODO)).push(diag)
		// 		}
		// 	}
		// } else {
		// 	if nonArrayLikeTargetParts != c.neverType {
		// 		child := validChildren[0]
		// 		elem := c.getElaborationElementForJsxChild(child, childrenNameType, getInvalidTextualChildDiagnostic)
		// 		if elem != nil {
		// 			result = c.elaborateElementwise((func /* generator */ () /* TODO(TS-TO-GO) inferred type Generator<{ errorNode: JsxExpression; innerExpression: Expression | undefined; nameType: LiteralType; errorMessage?: undefined; } | { errorNode: JsxText; innerExpression: undefined; nameType: LiteralType; errorMessage: DiagnosticMessage; } | { errorNode: JsxElement | JsxSelfClosingElement | JsxFragment; innerExpression: JsxElement | JsxSelfClosingElement | JsxFragment; nameType: LiteralType; errorMessage?: undefined; }, void, any> */ any {
		// 				yield(elem)
		// 			})(), source, target, relation, containingMessageChain, errorOutputContainer) || result
		// 		}
		// 	} else if !c.isTypeRelatedTo(c.getIndexedAccessType(source, childrenNameType), childrenTargetType, relation) {
		// 		// arity mismatch
		// 		result = true
		// 		diag := c.error(containingElement.OpeningElement.TagName, Diagnostics.This_JSX_tag_s_0_prop_expects_type_1_which_requires_multiple_children_but_only_a_single_child_was_provided, childrenPropName, c.typeToString(childrenTargetType))
		// 		if errorOutputContainer != nil && errorOutputContainer.skipLogging {
		// 			(errorOutputContainer.errors || ( /* TODO(TS-TO-GO) EqualsToken BinaryExpression: errorOutputContainer.errors = [] */ TODO)).push(diag)
		// 		}
		// 	}
		// }
	}
	return reportedError
}

func (c *Checker) getSuggestedSymbolForNonexistentJSXAttribute(name string, containingType *Type) *ast.Symbol {
	properties := c.getPropertiesOfType(containingType)
	var jsxSpecific *ast.Symbol
	switch name {
	case "for":
		jsxSpecific = core.Find(properties, func(x *ast.Symbol) bool { return ast.SymbolName(x) == "htmlFor" })
	case "class":
		jsxSpecific = core.Find(properties, func(x *ast.Symbol) bool { return ast.SymbolName(x) == "className" })
	}
	if jsxSpecific != nil {
		return jsxSpecific
	}
	return c.getSpellingSuggestionForName(name, properties, ast.SymbolFlagsValue)
}

func (c *Checker) resolveJsxOpeningLikeElement(node *ast.Node, candidatesOutArray *[]*Signature, checkMode CheckMode) *Signature {
	if isJsxIntrinsicTagName(node.TagName()) {
		result := c.getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node)
		fakeSignature := c.createSignatureForJSXIntrinsic(node, result)
		c.checkTypeAssignableToAndOptionallyElaborate(c.checkExpressionWithContextualType(node.Attributes(), c.getEffectiveFirstArgumentForJsxSignature(fakeSignature, node), nil /*inferenceContext*/, CheckModeNormal), result, node.TagName(), node.Attributes(), nil, nil)
		typeArgumentList := node.TypeArgumentList()
		if typeArgumentList != nil {
			c.checkSourceElements(typeArgumentList.Nodes)
			c.diagnostics.Add(ast.NewDiagnostic(ast.GetSourceFileOfNode(node), node.TypeArgumentList().Loc, diagnostics.Expected_0_type_arguments_but_got_1, 0, len(typeArgumentList.Nodes)))
		}
		return fakeSignature
	}
	exprTypes := c.checkExpression(node.TagName())
	apparentType := c.getApparentType(exprTypes)
	if c.isErrorType(apparentType) {
		return c.resolveErrorCall(node)
	}
	signatures := c.getUninstantiatedJsxSignaturesOfType(exprTypes, node)
	if c.isUntypedFunctionCall(exprTypes, apparentType, len(signatures), 0 /*constructSignatures*/) {
		return c.resolveUntypedCall(node)
	}
	if len(signatures) == 0 {
		// We found no signatures at all, which is an error
		c.error(node.TagName(), diagnostics.JSX_element_type_0_does_not_have_any_construct_or_call_signatures, scanner.GetTextOfNode(node.TagName()))
		return c.resolveErrorCall(node)
	}
	return c.resolveCall(node, signatures, candidatesOutArray, checkMode, SignatureFlagsNone, nil)
}

// Check if the given signature can possibly be a signature called by the JSX opening-like element.
// @param node a JSX opening-like element we are trying to figure its call signature
// @param signature a candidate signature we are trying whether it is a call signature
// @param relation a relationship to check parameter and argument type
func (c *Checker) checkApplicableSignatureForJsxOpeningLikeElement(node *ast.Node, signature *Signature, relation *Relation, checkMode CheckMode, reportErrors bool, diagnosticOutput *[]*ast.Diagnostic) bool {
	// Stateless function components can have maximum of three arguments: "props", "context", and "updater".
	// However "context" and "updater" are implicit and can't be specify by users. Only the first parameter, props,
	// can be specified by users through attributes property.
	paramType := c.getEffectiveFirstArgumentForJsxSignature(signature, node)
	attributesType := c.checkExpressionWithContextualType(node.Attributes(), paramType, nil /*inferenceContext*/, checkMode)
	var checkAttributesType *Type
	checkTagNameDoesNotExpectTooManyArguments := func() bool {
		if c.getJsxNamespaceContainerForImplicitImport(node) != nil {
			return true // factory is implicitly jsx/jsxdev - assume it fits the bill, since we don't strongly look for the jsx/jsxs/jsxDEV factory APIs anywhere else (at least not yet)
		}
		var tagType *Type
		if (ast.IsJsxOpeningElement(node) || ast.IsJsxSelfClosingElement(node)) && !(isJsxIntrinsicTagName(node.TagName()) || ast.IsJsxNamespacedName(node.TagName())) {
			tagType = c.checkExpression(node.TagName())
		}
		if tagType == nil {
			return true
		}
		tagCallSignatures := c.getSignaturesOfType(tagType, SignatureKindCall)
		if len(tagCallSignatures) == 0 {
			return true
		}
		factory := c.getJsxFactoryEntity(node)
		if factory == nil {
			return true
		}
		factorySymbol := c.resolveEntityName(factory, ast.SymbolFlagsValue, true /*ignoreErrors*/, false /*dontResolveAlias*/, node)
		if factorySymbol == nil {
			return true
		}

		factoryType := c.getTypeOfSymbol(factorySymbol)
		callSignatures := c.getSignaturesOfType(factoryType, SignatureKindCall)
		if len(callSignatures) == 0 {
			return true
		}
		hasFirstParamSignatures := false
		maxParamCount := 0
		// Check that _some_ first parameter expects a FC-like thing, and that some overload of the SFC expects an acceptable number of arguments
		for _, sig := range callSignatures {
			firstparam := c.getTypeAtPosition(sig, 0)
			signaturesOfParam := c.getSignaturesOfType(firstparam, SignatureKindCall)
			if len(signaturesOfParam) == 0 {
				continue
			}
			for _, paramSig := range signaturesOfParam {
				hasFirstParamSignatures = true
				if c.hasEffectiveRestParameter(paramSig) {
					return true // some signature has a rest param, so function components can have an arbitrary number of arguments
				}
				paramCount := c.getParameterCount(paramSig)
				if paramCount > maxParamCount {
					maxParamCount = paramCount
				}
			}
		}
		if !hasFirstParamSignatures {
			// Not a single signature had a first parameter which expected a signature - for back compat, and
			// to guard against generic factories which won't have signatures directly, do not error
			return true
		}
		absoluteMinArgCount := math.MaxInt
		for _, tagSig := range tagCallSignatures {
			tagRequiredArgCount := c.getMinArgumentCount(tagSig)
			if tagRequiredArgCount < absoluteMinArgCount {
				absoluteMinArgCount = tagRequiredArgCount
			}
		}
		if absoluteMinArgCount <= maxParamCount {
			return true // some signature accepts the number of arguments the function component provides
		}
		if reportErrors {
			diag := NewDiagnosticForNode(node.TagName(), diagnostics.Tag_0_expects_at_least_1_arguments_but_the_JSX_factory_2_provides_at_most_3, entityNameToString(node.TagName()), absoluteMinArgCount, entityNameToString(factory), maxParamCount)
			tagNameSymbol := c.getSymbolAtLocation(node.TagName(), false)
			if tagNameSymbol != nil && tagNameSymbol.ValueDeclaration != nil {
				diag.AddRelatedInfo(NewDiagnosticForNode(tagNameSymbol.ValueDeclaration, diagnostics.X_0_is_declared_here, entityNameToString(node.TagName())))
			}
			c.reportDiagnostic(diag, diagnosticOutput)
		}
		return false
	}
	if checkMode&CheckModeSkipContextSensitive != 0 {
		checkAttributesType = c.getRegularTypeOfObjectLiteral(attributesType)
	} else {
		checkAttributesType = attributesType
	}
	if !checkTagNameDoesNotExpectTooManyArguments() {
		return false
	}
	var errorNode *ast.Node
	if reportErrors {
		errorNode = node.TagName()
	}
	return c.checkTypeRelatedToAndOptionallyElaborate(checkAttributesType, paramType, relation, errorNode, node.Attributes(), nil, diagnosticOutput)
}

// Get attributes type of the JSX opening-like element. The result is from resolving "attributes" property of the opening-like element.
//
// @param openingLikeElement a JSX opening-like element
// @param filter a function to remove attributes that will not participate in checking whether attributes are assignable
// @return an anonymous type (similar to the one returned by checkObjectLiteral) in which its properties are attributes property.
// @remarks Because this function calls getSpreadType, it needs to use the same checks as checkObjectLiteral,
// which also calls getSpreadType.
func (c *Checker) createJsxAttributesTypeFromAttributesProperty(openingLikeElement *ast.Node, checkMode CheckMode) *Type {
	attributes := openingLikeElement.Attributes()
	contextualType := c.getContextualType(attributes, ContextFlagsNone)
	var allAttributesTable ast.SymbolTable
	if c.strictNullChecks {
		allAttributesTable = make(ast.SymbolTable)
	}
	attributesTable := make(ast.SymbolTable)
	spread := c.emptyJsxObjectType
	var hasSpreadAnyType bool
	var typeToIntersect *Type
	var explicitlySpecifyChildrenAttribute bool
	objectFlags := ObjectFlagsJsxAttributes
	createJsxAttributesType := func() *Type {
		objectFlags |= ObjectFlagsFreshLiteral
		result := c.newAnonymousType(attributes.Symbol(), attributesTable, nil, nil, nil)
		result.objectFlags |= objectFlags | ObjectFlagsObjectLiteral | ObjectFlagsContainsObjectOrArrayLiteral
		return result
	}
	jsxChildrenPropertyName := c.getJsxElementChildrenPropertyName(c.getJsxNamespaceAt(openingLikeElement))
	// Create anonymous type from given attributes symbol table.
	// @param symbol a symbol of JsxAttributes containing attributes corresponding to attributesTable
	// @param attributesTable a symbol table of attributes property
	for _, attributeDecl := range attributes.AsJsxAttributes().Properties.Nodes {
		member := attributeDecl.Symbol()
		if ast.IsJsxAttribute(attributeDecl) {
			exprType := c.checkJsxAttribute(attributeDecl, checkMode)
			objectFlags |= exprType.objectFlags & ObjectFlagsPropagatingFlags
			attributeSymbol := c.newSymbol(ast.SymbolFlagsProperty|member.Flags, member.Name)
			attributeSymbol.Declarations = member.Declarations
			attributeSymbol.Parent = member.Parent
			if member.ValueDeclaration != nil {
				attributeSymbol.ValueDeclaration = member.ValueDeclaration
			}
			links := c.valueSymbolLinks.Get(attributeSymbol)
			links.resolvedType = exprType
			links.target = member
			attributesTable[attributeSymbol.Name] = attributeSymbol
			if allAttributesTable != nil {
				allAttributesTable[attributeSymbol.Name] = attributeSymbol
			}
			if attributeDecl.Name().Text() == jsxChildrenPropertyName {
				explicitlySpecifyChildrenAttribute = true
			}
			if contextualType != nil {
				prop := c.getPropertyOfType(contextualType, member.Name)
				if prop != nil && prop.Declarations != nil && c.isDeprecatedSymbol(prop) && ast.IsIdentifier(attributeDecl.Name()) {
					c.addDeprecatedSuggestion(attributeDecl.Name(), prop.Declarations, attributeDecl.Name().Text())
				}
			}
			if contextualType != nil && checkMode&CheckModeInferential != 0 && checkMode&CheckModeSkipContextSensitive == 0 && c.isContextSensitive(attributeDecl) {
				inferenceContext := c.getInferenceContext(attributes)
				// Debug.assert(inferenceContext)
				// In CheckMode.Inferential we should always have an inference context
				inferenceNode := attributeDecl.Initializer().Expression()
				c.addIntraExpressionInferenceSite(inferenceContext, inferenceNode, exprType)
			}
		} else {
			// Debug.assert(attributeDecl.Kind == ast.KindJsxSpreadAttribute)
			if len(attributesTable) != 0 {
				spread = c.getSpreadType(spread, createJsxAttributesType(), attributes.Symbol(), objectFlags, false /*readonly*/)
				attributesTable = make(ast.SymbolTable)
			}
			exprType := c.getReducedType(c.checkExpressionEx(attributeDecl.Expression(), checkMode&CheckModeInferential))
			if IsTypeAny(exprType) {
				hasSpreadAnyType = true
			}
			if c.isValidSpreadType(exprType) {
				spread = c.getSpreadType(spread, exprType, attributes.Symbol(), objectFlags, false /*readonly*/)
				if allAttributesTable != nil {
					c.checkSpreadPropOverrides(exprType, allAttributesTable, attributeDecl)
				}
			} else {
				c.error(attributeDecl.Expression(), diagnostics.Spread_types_may_only_be_created_from_object_types)
				if typeToIntersect != nil {
					typeToIntersect = c.getIntersectionType([]*Type{typeToIntersect, exprType})
				} else {
					typeToIntersect = exprType
				}
			}
		}
	}
	if !hasSpreadAnyType {
		if len(attributesTable) != 0 {
			spread = c.getSpreadType(spread, createJsxAttributesType(), attributes.Symbol(), objectFlags, false /*readonly*/)
		}
	}
	// Handle children attribute
	var parent *ast.Node
	if ast.IsJsxElement(openingLikeElement.Parent) {
		parent = openingLikeElement.Parent
	}
	// We have to check that openingElement of the parent is the one we are visiting as this may not be true for selfClosingElement
	if parent != nil && parent.AsJsxElement().OpeningElement == openingLikeElement && len(getSemanticJsxChildren(parent.AsJsxElement().Children.Nodes)) != 0 {
		var childTypes []*Type = c.checkJsxChildren(parent, checkMode)
		if !hasSpreadAnyType && jsxChildrenPropertyName != ast.InternalSymbolNameMissing && jsxChildrenPropertyName != "" {
			// Error if there is a attribute named "children" explicitly specified and children element.
			// This is because children element will overwrite the value from attributes.
			// Note: we will not warn "children" attribute overwritten if "children" attribute is specified in object spread.
			if explicitlySpecifyChildrenAttribute {
				c.error(attributes, diagnostics.X_0_are_specified_twice_The_attribute_named_0_will_be_overwritten, jsxChildrenPropertyName)
			}
			var childrenContextualType *Type
			if contextualType := c.getApparentTypeOfContextualType(openingLikeElement.Attributes(), ContextFlagsNone); contextualType != nil {
				childrenContextualType = c.getTypeOfPropertyOfContextualType(contextualType, jsxChildrenPropertyName)
			}
			// If there are children in the body of JSX element, create dummy attribute "children" with the union of children types so that it will pass the attribute checking process
			childrenPropSymbol := c.newSymbol(ast.SymbolFlagsProperty, jsxChildrenPropertyName)
			links := c.valueSymbolLinks.Get(childrenPropSymbol)
			switch {
			case len(childTypes) == 1:
				links.resolvedType = childTypes[0]
			case childrenContextualType != nil && someType(childrenContextualType, c.isTupleLikeType):
				links.resolvedType = c.createTupleType(childTypes)
			default:
				links.resolvedType = c.createArrayType(c.getUnionType(childTypes))
			}
			// Fake up a property declaration for the children
			// childrenPropSymbol.ValueDeclaration = c.factory.NewPropertySignatureDeclaration(nil, jsxChildrenPropertyName, nil /*postfixToken*/, nil /*type*/, nil /*initializer*/)
			// setParent(childrenPropSymbol.ValueDeclaration, attributes)
			// childrenPropSymbol.ValueDeclaration.Symbol = childrenPropSymbol
			childPropMap := make(ast.SymbolTable)
			childPropMap[jsxChildrenPropertyName] = childrenPropSymbol
			spread = c.getSpreadType(spread, c.newAnonymousType(attributes.Symbol(), childPropMap, nil, nil, nil), attributes.Symbol(), objectFlags, false /*readonly*/)
		}
	}
	if hasSpreadAnyType {
		return c.anyType
	}
	if typeToIntersect != nil {
		if spread != c.emptyJsxObjectType {
			return c.getIntersectionType([]*Type{typeToIntersect, spread})
		}
		return typeToIntersect
	}
	if spread == c.emptyJsxObjectType {
		return createJsxAttributesType()
	}
	return spread
}

func getSemanticJsxChildren(children []*ast.JsxChild) []*ast.JsxChild {
	return core.Filter(children, func(i *ast.JsxChild) bool {
		switch i.Kind {
		case ast.KindJsxExpression:
			return i.Expression() != nil
		case ast.KindJsxText:
			return !i.AsJsxText().ContainsOnlyTriviaWhiteSpaces
		default:
			return true
		}
	})
}

func (c *Checker) checkJsxAttribute(node *ast.Node, checkMode CheckMode) *Type {
	if node.Initializer() != nil {
		return c.checkExpressionForMutableLocation(node.Initializer(), checkMode)
	}
	// <Elem attr /> is sugar for <Elem attr={true} />
	return c.trueType
}

func (c *Checker) checkJsxChildren(node *ast.Node, checkMode CheckMode) []*Type {
	var childTypes []*Type
	for _, child := range node.Children().Nodes {
		// In React, JSX text that contains only whitespaces will be ignored so we don't want to type-check that
		// because then type of children property will have constituent of string type.
		if ast.IsJsxText(child) {
			if !child.AsJsxText().ContainsOnlyTriviaWhiteSpaces {
				childTypes = append(childTypes, c.stringType)
			}
		} else if ast.IsJsxExpression(child) && child.Expression() == nil {
			// empty jsx expressions don't *really* count as present children
			continue
		} else {
			childTypes = append(childTypes, c.checkExpressionForMutableLocation(child, checkMode))
		}
	}
	return childTypes
}

func (c *Checker) getUninstantiatedJsxSignaturesOfType(elementType *Type, caller *ast.Node) []*Signature {
	if elementType.flags&TypeFlagsString != 0 {
		return []*Signature{c.anySignature}
	}
	if elementType.flags&TypeFlagsStringLiteral != 0 {
		intrinsicType := c.getIntrinsicAttributesTypeFromStringLiteralType(elementType, caller)
		if intrinsicType == nil {
			c.error(caller, diagnostics.Property_0_does_not_exist_on_type_1, getStringLiteralValue(elementType), "JSX."+JsxNames.IntrinsicElements)
			return nil
		}
		fakeSignature := c.createSignatureForJSXIntrinsic(caller, intrinsicType)
		return []*Signature{fakeSignature}
	}
	apparentElemType := c.getApparentType(elementType)
	// Resolve the signatures, preferring constructor
	signatures := c.getSignaturesOfType(apparentElemType, SignatureKindConstruct)
	if len(signatures) == 0 {
		// No construct signatures, try call signatures
		signatures = c.getSignaturesOfType(apparentElemType, SignatureKindCall)
	}
	if len(signatures) == 0 && apparentElemType.flags&TypeFlagsUnion != 0 {
		// If each member has some combination of new/call signatures; make a union signature list for those
		signatures = c.getUnionSignatures(core.Map(apparentElemType.Types(), func(t *Type) []*Signature {
			return c.getUninstantiatedJsxSignaturesOfType(t, caller)
		}))
	}
	return signatures
}

func (c *Checker) getEffectiveFirstArgumentForJsxSignature(signature *Signature, node *ast.Node) *Type {
	if c.getJsxReferenceKind(node) != JsxReferenceKindComponent {
		return c.getJsxPropsTypeFromCallSignature(signature, node)
	}
	return c.getJsxPropsTypeFromClassType(signature, node)
}

func (c *Checker) getJsxPropsTypeFromCallSignature(sig *Signature, context *ast.Node) *Type {
	propsType := c.getTypeOfFirstParameterOfSignatureWithFallback(sig, c.unknownType)
	propsType = c.getJsxManagedAttributesFromLocatedAttributes(context, c.getJsxNamespaceAt(context), propsType)
	intrinsicAttribs := c.getJsxType(JsxNames.IntrinsicAttributes, context)
	if !c.isErrorType(intrinsicAttribs) {
		propsType = c.intersectTypes(intrinsicAttribs, propsType)
	}
	return propsType
}

func (c *Checker) getJsxPropsTypeFromClassType(sig *Signature, context *ast.Node) *Type {
	ns := c.getJsxNamespaceAt(context)
	forcedLookupLocation := c.getJsxElementPropertiesName(ns)
	var attributesType *Type
	switch forcedLookupLocation {
	case ast.InternalSymbolNameMissing:
		attributesType = c.getTypeOfFirstParameterOfSignatureWithFallback(sig, c.unknownType)
	case "":
		attributesType = c.getReturnTypeOfSignature(sig)
	default:
		attributesType = c.getJsxPropsTypeForSignatureFromMember(sig, forcedLookupLocation)
		if attributesType == nil && len(context.Attributes().AsJsxAttributes().Properties.Nodes) != 0 {
			// There is no property named 'props' on this instance type
			c.error(context, diagnostics.JSX_element_class_does_not_support_attributes_because_it_does_not_have_a_0_property, forcedLookupLocation)
		}
	}
	if attributesType == nil {
		return c.unknownType
	}
	attributesType = c.getJsxManagedAttributesFromLocatedAttributes(context, ns, attributesType)
	if IsTypeAny(attributesType) {
		// Props is of type 'any' or unknown
		return attributesType
	}
	// Normal case -- add in IntrinsicClassElements<T> and IntrinsicElements
	apparentAttributesType := attributesType
	intrinsicClassAttribs := c.getJsxType(JsxNames.IntrinsicClassAttributes, context)
	if !c.isErrorType(intrinsicClassAttribs) {
		typeParams := c.getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(intrinsicClassAttribs.symbol)
		hostClassType := c.getReturnTypeOfSignature(sig)
		var libraryManagedAttributeType *Type
		if typeParams != nil {
			// apply JSX.IntrinsicClassElements<hostClassType, ...>
			inferredArgs := c.fillMissingTypeArguments([]*Type{hostClassType}, typeParams, c.getMinTypeArgumentCount(typeParams))
			libraryManagedAttributeType = c.instantiateType(intrinsicClassAttribs, newTypeMapper(typeParams, inferredArgs))
		} else {
			libraryManagedAttributeType = intrinsicClassAttribs
		}
		apparentAttributesType = c.intersectTypes(libraryManagedAttributeType, apparentAttributesType)
	}
	intrinsicAttribs := c.getJsxType(JsxNames.IntrinsicAttributes, context)
	if !c.isErrorType(intrinsicAttribs) {
		apparentAttributesType = c.intersectTypes(intrinsicAttribs, apparentAttributesType)
	}
	return apparentAttributesType
}

func (c *Checker) getJsxPropsTypeForSignatureFromMember(sig *Signature, forcedLookupLocation string) *Type {
	if sig.composite != nil {
		// JSX Elements using the legacy `props`-field based lookup (eg, react class components) need to treat the `props` member as an input
		// instead of an output position when resolving the signature. We need to go back to the input signatures of the composite signature,
		// get the type of `props` on each return type individually, and then _intersect them_, rather than union them (as would normally occur
		// for a union signature). It's an unfortunate quirk of looking in the output of the signature for the type we want to use for the input.
		// The default behavior of `getTypeOfFirstParameterOfSignatureWithFallback` when no `props` member name is defined is much more sane.
		var results []*Type
		for _, signature := range sig.composite.signatures {
			instance := c.getReturnTypeOfSignature(signature)
			if IsTypeAny(instance) {
				return instance
			}
			propType := c.getTypeOfPropertyOfType(instance, forcedLookupLocation)
			if propType == nil {
				return nil
			}
			results = append(results, propType)
		}
		return c.getIntersectionType(results)
		// Same result for both union and intersection signatures
	}
	instanceType := c.getReturnTypeOfSignature(sig)
	if IsTypeAny(instanceType) {
		return instanceType
	}
	return c.getTypeOfPropertyOfType(instanceType, forcedLookupLocation)
}

func (c *Checker) getJsxManagedAttributesFromLocatedAttributes(context *ast.Node, ns *ast.Symbol, attributesType *Type) *Type {
	managedSym := c.getJsxLibraryManagedAttributes(ns)
	if managedSym != nil {
		ctorType := c.getStaticTypeOfReferencedJsxConstructor(context)
		result := c.instantiateAliasOrInterfaceWithDefaults(managedSym, []*Type{ctorType, attributesType})
		if result != nil {
			return result
		}
	}
	return attributesType
}

func (c *Checker) instantiateAliasOrInterfaceWithDefaults(managedSym *ast.Symbol, typeArguments []*Type) *Type {
	declaredManagedType := c.getDeclaredTypeOfSymbol(managedSym)
	// fetches interface type, or initializes symbol links type parmaeters
	if managedSym.Flags&ast.SymbolFlagsTypeAlias != 0 {
		params := c.typeAliasLinks.Get(managedSym).typeParameters
		if len(params) >= len(typeArguments) {
			args := c.fillMissingTypeArguments(typeArguments, params, len(typeArguments))
			if len(args) == 0 {
				return declaredManagedType
			}
			return c.getTypeAliasInstantiation(managedSym, args, nil)
		}
	}
	if len(declaredManagedType.AsInterfaceType().TypeParameters()) >= len(typeArguments) {
		args := c.fillMissingTypeArguments(typeArguments, declaredManagedType.AsInterfaceType().TypeParameters(), len(typeArguments))
		return c.createTypeReference(declaredManagedType, args)
	}
	return nil
}

func (c *Checker) getJsxLibraryManagedAttributes(jsxNamespace *ast.Symbol) *ast.Symbol {
	if jsxNamespace != nil {
		return c.getSymbol(jsxNamespace.Exports, JsxNames.LibraryManagedAttributes, ast.SymbolFlagsType)
	}
	return nil
}

func (c *Checker) getJsxElementTypeSymbol(jsxNamespace *ast.Symbol) *ast.Symbol {
	// JSX.ElementType [symbol]
	if jsxNamespace != nil {
		return c.getSymbol(jsxNamespace.Exports, JsxNames.ElementType, ast.SymbolFlagsType)
	}
	return nil
}

// e.g. "props" for React.d.ts,
// or InternalSymbolNameMissing if ElementAttributesProperty doesn't exist (which means all
//
//	non-intrinsic elements' attributes type is 'any'),
//
// or "" if it has 0 properties (which means every
//
//	non-intrinsic elements' attributes type is the element instance type)
func (c *Checker) getJsxElementPropertiesName(jsxNamespace *ast.Symbol) string {
	return c.getNameFromJsxElementAttributesContainer(JsxNames.ElementAttributesPropertyNameContainer, jsxNamespace)
}

func (c *Checker) getJsxElementChildrenPropertyName(jsxNamespace *ast.Symbol) string {
	return c.getNameFromJsxElementAttributesContainer(JsxNames.ElementChildrenAttributeNameContainer, jsxNamespace)
}

// Look into JSX namespace and then look for container with matching name as nameOfAttribPropContainer.
// Get a single property from that container if existed. Report an error if there are more than one property.
//
// @param nameOfAttribPropContainer a string of value JsxNames.ElementAttributesPropertyNameContainer or JsxNames.ElementChildrenAttributeNameContainer
//
//	if other string is given or the container doesn't exist, return undefined.
func (c *Checker) getNameFromJsxElementAttributesContainer(nameOfAttribPropContainer string, jsxNamespace *ast.Symbol) string {
	// JSX.ElementAttributesProperty | JSX.ElementChildrenAttribute [symbol]
	if jsxNamespace != nil {
		jsxElementAttribPropInterfaceSym := c.getSymbol(jsxNamespace.Exports, nameOfAttribPropContainer, ast.SymbolFlagsType)
		if jsxElementAttribPropInterfaceSym != nil {
			jsxElementAttribPropInterfaceType := c.getDeclaredTypeOfSymbol(jsxElementAttribPropInterfaceSym)
			propertiesOfJsxElementAttribPropInterface := c.getPropertiesOfType(jsxElementAttribPropInterfaceType)
			// Element Attributes has zero properties, so the element attributes type will be the class instance type
			if len(propertiesOfJsxElementAttribPropInterface) == 0 {
				return ""
			}
			if len(propertiesOfJsxElementAttribPropInterface) == 1 {
				return propertiesOfJsxElementAttribPropInterface[0].Name
			}
			if len(propertiesOfJsxElementAttribPropInterface) > 1 && len(jsxElementAttribPropInterfaceSym.Declarations) != 0 {
				// More than one property on ElementAttributesProperty is an error
				c.error(jsxElementAttribPropInterfaceSym.Declarations[0], diagnostics.The_global_type_JSX_0_may_not_have_more_than_one_property, nameOfAttribPropContainer)
			}
		}
	}
	return ast.InternalSymbolNameMissing
}

func (c *Checker) getStaticTypeOfReferencedJsxConstructor(context *ast.Node) *Type {
	if isJsxIntrinsicTagName(context.TagName()) {
		result := c.getIntrinsicAttributesTypeFromJsxOpeningLikeElement(context)
		fakeSignature := c.createSignatureForJSXIntrinsic(context, result)
		return c.getOrCreateTypeFromSignature(fakeSignature, nil)
	}
	tagType := c.checkExpressionCached(context.TagName())
	if tagType.flags&TypeFlagsStringLiteral != 0 {
		result := c.getIntrinsicAttributesTypeFromStringLiteralType(tagType, context)
		if result == nil {
			return c.errorType
		}
		fakeSignature := c.createSignatureForJSXIntrinsic(context, result)
		return c.getOrCreateTypeFromSignature(fakeSignature, nil)
	}
	return tagType
}

func (c *Checker) getIntrinsicAttributesTypeFromStringLiteralType(t *Type, location *ast.Node) *Type {
	// If the elemType is a stringLiteral type, we can then provide a check to make sure that the string literal type is one of the Jsx intrinsic element type
	// For example:
	//      var CustomTag: "h1" = "h1";
	//      <CustomTag> Hello World </CustomTag>
	intrinsicElementsType := c.getJsxType(JsxNames.IntrinsicElements, location)
	if !c.isErrorType(intrinsicElementsType) {
		stringLiteralTypeName := getStringLiteralValue(t)
		intrinsicProp := c.getPropertyOfType(intrinsicElementsType, stringLiteralTypeName)
		if intrinsicProp != nil {
			return c.getTypeOfSymbol(intrinsicProp)
		}
		indexSignatureType := c.getIndexTypeOfType(intrinsicElementsType, c.stringType)
		if indexSignatureType != nil {
			return indexSignatureType
		}
		return nil
	}
	// If we need to report an error, we already done so here. So just return any to prevent any more error downstream
	return c.anyType
}

func (c *Checker) getJsxReferenceKind(node *ast.Node) JsxReferenceKind {
	if isJsxIntrinsicTagName(node.TagName()) {
		return JsxReferenceKindMixed
	}
	tagType := c.getApparentType(c.checkExpression(node.TagName()))
	if len(c.getSignaturesOfType(tagType, SignatureKindConstruct)) != 0 {
		return JsxReferenceKindComponent
	}
	if len(c.getSignaturesOfType(tagType, SignatureKindCall)) != 0 {
		return JsxReferenceKindFunction
	}
	return JsxReferenceKindMixed
}

func (c *Checker) createSignatureForJSXIntrinsic(node *ast.Node, result *Type) *Signature {
	elementType := c.errorType
	if namespace := c.getJsxNamespaceAt(node); namespace != nil {
		if typeSymbol := c.getSymbol(c.getExportsOfSymbol(namespace), JsxNames.Element, ast.SymbolFlagsType); typeSymbol != nil {
			elementType = c.getDeclaredTypeOfSymbol(typeSymbol)
		}
	}
	// returnNode := typeSymbol && c.nodeBuilder.symbolToEntityName(typeSymbol, ast.SymbolFlagsType, node)
	// declaration := factory.createFunctionTypeNode(nil, []ParameterDeclaration{factory.createParameterDeclaration(nil, nil /*dotDotDotToken*/, "props", nil /*questionToken*/, c.nodeBuilder.typeToTypeNode(result, node))}, ifElse(returnNode != nil, factory.createTypeReferenceNode(returnNode, nil /*typeArguments*/), factory.createKeywordTypeNode(ast.KindAnyKeyword)))
	parameterSymbol := c.newSymbol(ast.SymbolFlagsFunctionScopedVariable, "props")
	c.valueSymbolLinks.Get(parameterSymbol).resolvedType = result
	return c.newSignature(SignatureFlagsNone, nil, nil, nil, []*ast.Symbol{parameterSymbol}, elementType, nil, 1)
}

// Get attributes type of the given intrinsic opening-like Jsx element by resolving the tag name.
// The function is intended to be called from a function which has checked that the opening element is an intrinsic element.
// @param node an intrinsic JSX opening-like element
func (c *Checker) getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node *ast.Node) *Type {
	// Debug.assert(c.isJsxIntrinsicTagName(node.TagName()))
	links := c.jsxElementLinks.Get(node)
	if links.resolvedJsxElementAttributesType != nil {
		return links.resolvedJsxElementAttributesType
	}
	symbol := c.getIntrinsicTagSymbol(node)
	if links.jsxFlags&JsxFlagsIntrinsicNamedElement != 0 {
		links.resolvedJsxElementAttributesType = core.OrElse(c.getTypeOfSymbol(symbol), c.errorType)
		return links.resolvedJsxElementAttributesType
	}
	if links.jsxFlags&JsxFlagsIntrinsicIndexedElement != 0 {
		indexInfo := c.getApplicableIndexInfoForName(c.getJsxType(JsxNames.IntrinsicElements, node), node.TagName().Text())
		if indexInfo != nil {
			links.resolvedJsxElementAttributesType = indexInfo.valueType
			return links.resolvedJsxElementAttributesType
		}
	}
	links.resolvedJsxElementAttributesType = c.errorType
	return links.resolvedJsxElementAttributesType
}

// Looks up an intrinsic tag name and returns a symbol that either points to an intrinsic
// property (in which case nodeLinks.jsxFlags will be IntrinsicNamedElement) or an intrinsic
// string index signature (in which case nodeLinks.jsxFlags will be IntrinsicIndexedElement).
// May also return unknownSymbol if both of these lookups fail.
func (c *Checker) getIntrinsicTagSymbol(node *ast.Node) *ast.Symbol {
	links := c.symbolNodeLinks.Get(node)
	if links.resolvedSymbol != nil {
		return links.resolvedSymbol
	}
	intrinsicElementsType := c.getJsxType(JsxNames.IntrinsicElements, node)
	if !c.isErrorType(intrinsicElementsType) {
		// Property case
		tagName := node.TagName()
		if !ast.IsIdentifier(tagName) && !ast.IsJsxNamespacedName(tagName) {
			panic("Invalid tag name")
		}
		propName := tagName.Text()
		intrinsicProp := c.getPropertyOfType(intrinsicElementsType, propName)
		if intrinsicProp != nil {
			c.jsxElementLinks.Get(node).jsxFlags |= JsxFlagsIntrinsicNamedElement
			links.resolvedSymbol = intrinsicProp
			return links.resolvedSymbol
		}
		// Intrinsic string indexer case
		indexSymbol := c.getApplicableIndexSymbol(intrinsicElementsType, c.getStringLiteralType(propName))
		if indexSymbol != nil {
			c.jsxElementLinks.Get(node).jsxFlags |= JsxFlagsIntrinsicIndexedElement
			links.resolvedSymbol = indexSymbol
			return links.resolvedSymbol
		}
		if c.getTypeOfPropertyOrIndexSignatureOfType(intrinsicElementsType, propName) != nil {
			c.jsxElementLinks.Get(node).jsxFlags |= JsxFlagsIntrinsicIndexedElement
			links.resolvedSymbol = intrinsicElementsType.symbol
			return links.resolvedSymbol
		}
		// Wasn't found
		c.error(node, diagnostics.Property_0_does_not_exist_on_type_1, tagName.Text(), "JSX."+JsxNames.IntrinsicElements)
		links.resolvedSymbol = c.unknownSymbol
		return links.resolvedSymbol
	}
	if c.noImplicitAny {
		c.error(node, diagnostics.JSX_element_implicitly_has_type_any_because_no_interface_JSX_0_exists, JsxNames.IntrinsicElements)
	}
	links.resolvedSymbol = c.unknownSymbol
	return links.resolvedSymbol
}

func (c *Checker) getJsxStatelessElementTypeAt(location *ast.Node) *Type {
	jsxElementType := c.getJsxElementTypeAt(location)
	if jsxElementType == nil {
		return nil
	}
	return c.getUnionType([]*Type{jsxElementType, c.nullType})
}

func (c *Checker) getJsxElementClassTypeAt(location *ast.Node) *Type {
	t := c.getJsxType(JsxNames.ElementClass, location)
	if c.isErrorType(t) {
		return nil
	}
	return t
}

func (c *Checker) getJsxElementTypeAt(location *ast.Node) *Type {
	return c.getJsxType(JsxNames.Element, location)
}

func (c *Checker) getJsxElementTypeTypeAt(location *ast.Node) *Type {
	ns := c.getJsxNamespaceAt(location)
	if ns == nil {
		return nil
	}
	sym := c.getJsxElementTypeSymbol(ns)
	if sym == nil {
		return nil
	}
	t := c.instantiateAliasOrInterfaceWithDefaults(sym, nil)
	if t == nil || c.isErrorType(t) {
		return nil
	}
	return t
}

func (c *Checker) getJsxType(name string, location *ast.Node) *Type {
	if namespace := c.getJsxNamespaceAt(location); namespace != nil {
		if exports := c.getExportsOfSymbol(namespace); exports != nil {
			if typeSymbol := c.getSymbol(exports, name, ast.SymbolFlagsType); typeSymbol != nil {
				return c.getDeclaredTypeOfSymbol(typeSymbol)
			}
		}
	}
	return c.errorType
}

func (c *Checker) getJsxNamespaceAt(location *ast.Node) *ast.Symbol {
	var links *JsxElementLinks
	if location != nil {
		links = c.jsxElementLinks.Get(location)
	}
	if links != nil && links.jsxNamespace != nil && links.jsxNamespace != c.unknownSymbol {
		return links.jsxNamespace
	}
	if links == nil || links.jsxNamespace != c.unknownSymbol {
		resolvedNamespace := c.getJsxNamespaceContainerForImplicitImport(location)
		if resolvedNamespace == nil || resolvedNamespace == c.unknownSymbol {
			namespaceName := c.getJsxNamespace(location)
			resolvedNamespace = c.resolveName(location, namespaceName, ast.SymbolFlagsNamespace, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/)
		}
		if resolvedNamespace != nil {
			candidate := c.resolveSymbol(c.getSymbol(c.getExportsOfSymbol(c.resolveSymbol(resolvedNamespace)), JsxNames.JSX, ast.SymbolFlagsNamespace))
			if candidate != nil && candidate != c.unknownSymbol {
				if links != nil {
					links.jsxNamespace = candidate
				}
				return candidate
			}
		}
		if links != nil {
			links.jsxNamespace = c.unknownSymbol
		}
	}
	// JSX global fallback
	s := c.resolveSymbol(c.getGlobalSymbol(JsxNames.JSX, ast.SymbolFlagsNamespace, nil /*diagnostic*/))
	if s == c.unknownSymbol {
		return nil
	}
	return s
}

func (c *Checker) getJsxNamespace(location *ast.Node) string {
	if location != nil {
		file := ast.GetSourceFileOfNode(location)
		if file != nil {
			links := c.sourceFileLinks.Get(file)
			if ast.IsJsxOpeningFragment(location) {
				if links.localJsxFragmentNamespace != "" {
					return links.localJsxFragmentNamespace
				}
				jsxFragmentPragma := getPragmaFromSourceFile(file, "jsxfrag")
				if jsxFragmentPragma != nil {
					links.localJsxFragmentFactory = c.parseIsolatedEntityName(jsxFragmentPragma.Args["factory"].Value)
					if links.localJsxFragmentFactory != nil {
						links.localJsxFragmentNamespace = ast.GetFirstIdentifier(links.localJsxFragmentFactory).Text()
						return links.localJsxFragmentNamespace
					}
				}
				entity := c.getJsxFragmentFactoryEntity(location)
				if entity != nil {
					links.localJsxFragmentFactory = entity
					links.localJsxFragmentNamespace = ast.GetFirstIdentifier(entity).Text()
					return links.localJsxFragmentNamespace
				}
			} else {
				localJsxNamespace := c.getLocalJsxNamespace(file)
				if localJsxNamespace != "" {
					links.localJsxNamespace = localJsxNamespace
					return links.localJsxNamespace
				}
			}
		}
	}
	if c._jsxNamespace == "" {
		c._jsxNamespace = "React"
		if c.compilerOptions.JsxFactory != "" {
			c._jsxFactoryEntity = c.parseIsolatedEntityName(c.compilerOptions.JsxFactory)
			if c._jsxFactoryEntity != nil {
				c._jsxNamespace = ast.GetFirstIdentifier(c._jsxFactoryEntity).Text()
			}
		} else if c.compilerOptions.ReactNamespace != "" {
			c._jsxNamespace = c.compilerOptions.ReactNamespace
		}
	}
	if c._jsxFactoryEntity == nil {
		c._jsxFactoryEntity = c.factory.NewQualifiedName(c.factory.NewIdentifier(c._jsxNamespace), c.factory.NewIdentifier("createElement"))
	}
	return c._jsxNamespace
}

func (c *Checker) getLocalJsxNamespace(file *ast.SourceFile) string {
	links := c.sourceFileLinks.Get(file)
	if links.localJsxNamespace != "" {
		return links.localJsxNamespace
	}
	jsxPragma := getPragmaFromSourceFile(file, "jsx")
	if jsxPragma != nil {
		links.localJsxFactory = c.parseIsolatedEntityName(jsxPragma.Args["factory"].Value)
		if links.localJsxFactory != nil {
			links.localJsxNamespace = ast.GetFirstIdentifier(links.localJsxFactory).Text()
			return links.localJsxNamespace
		}
	}
	return ""
}

func (c *Checker) getJsxFactoryEntity(location *ast.Node) *ast.Node {
	if location != nil {
		c.getJsxNamespace(location)
		if localJsxFactory := c.sourceFileLinks.Get(ast.GetSourceFileOfNode(location)).localJsxFactory; localJsxFactory != nil {
			return localJsxFactory
		}
	}
	return c._jsxFactoryEntity
}

func (c *Checker) getJsxFragmentFactoryEntity(location *ast.Node) *ast.EntityName {
	if location != nil {
		file := ast.GetSourceFileOfNode(location)
		if file != nil {
			links := c.sourceFileLinks.Get(file)
			if links.localJsxFragmentFactory != nil {
				return links.localJsxFragmentFactory
			}
			jsxFragPragma := getPragmaFromSourceFile(file, "jsxfrag")
			if jsxFragPragma != nil {
				links.localJsxFragmentFactory = c.parseIsolatedEntityName(jsxFragPragma.Args["factory"].Value)
				return links.localJsxFragmentFactory
			}
		}
	}
	if c.compilerOptions.JsxFragmentFactory != "" {
		return c.parseIsolatedEntityName(c.compilerOptions.JsxFragmentFactory)
	}
	return nil
}

func (c *Checker) parseIsolatedEntityName(name string) *ast.Node {
	result := parser.ParseIsolatedEntityName(name, c.languageVersion)
	if result != nil {
		markAsSynthetic(result)
	}
	return result
}

func markAsSynthetic(node *ast.Node) bool {
	node.Loc = core.NewTextRange(-1, -1)
	node.ForEachChild(markAsSynthetic)
	return false
}

func (c *Checker) getJsxNamespaceContainerForImplicitImport(location *ast.Node) *ast.Symbol {
	var file *ast.SourceFile
	var links *JsxElementLinks
	if location != nil {
		if file = ast.GetSourceFileOfNode(location); file != nil {
			links = c.jsxElementLinks.Get(file.AsNode())
		}
	}
	if links != nil && links.jsxImplicitImportContainer != nil {
		return core.IfElse(links.jsxImplicitImportContainer == c.unknownSymbol, nil, links.jsxImplicitImportContainer)
	}

	moduleReference, specifier := c.getJSXRuntimeImportSpecifier(file)
	if moduleReference == "" {
		return nil
	}
	errorMessage := diagnostics.This_JSX_tag_requires_the_module_path_0_to_exist_but_none_could_be_found_Make_sure_you_have_types_for_the_appropriate_package_installed
	mod := c.resolveExternalModule(core.OrElse(specifier, location), moduleReference, errorMessage, location, false)
	var result *ast.Symbol
	if mod != nil && mod != c.unknownSymbol {
		result = c.getMergedSymbol(c.resolveSymbol(mod))
	}
	if links != nil {
		links.jsxImplicitImportContainer = core.OrElse(result, c.unknownSymbol)
	}
	return result
}

func (c *Checker) getJSXRuntimeImportSpecifier(file *ast.SourceFile) (moduleReference string, specifier *ast.Node) {
	return c.program.GetJSXRuntimeImportSpecifier(file.Path())
}

func getPragmaFromSourceFile(file *ast.SourceFile, name string) *ast.Pragma {
	if file != nil {
		for i := range file.Pragmas {
			if file.Pragmas[i].Name == name {
				return &file.Pragmas[i]
			}
		}
	}
	return nil
}

func getPragmaArgument(pragma *ast.Pragma, name string) string {
	if pragma != nil {
		if arg, ok := pragma.Args[name]; ok {
			return arg.Value
		}
	}
	return ""
}
