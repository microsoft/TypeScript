package checker

import (
	"maps"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

func (c *Checker) GetSymbolsInScope(location *ast.Node, meaning ast.SymbolFlags) []*ast.Symbol {
	return c.getSymbolsInScope(location, meaning)
}

func (c *Checker) getSymbolsInScope(location *ast.Node, meaning ast.SymbolFlags) []*ast.Symbol {
	if location.Flags&ast.NodeFlagsInWithStatement != 0 {
		// We cannot answer semantic questions within a with block, do not proceed any further
		return nil
	}

	symbols := make(ast.SymbolTable)
	isStaticSymbol := false

	// Copy the given symbol into symbol tables if the symbol has the given meaning
	// and it doesn't already exists in the symbol table.
	copySymbol := func(symbol *ast.Symbol, meaning ast.SymbolFlags) {
		if GetCombinedLocalAndExportSymbolFlags(symbol)&meaning != 0 {
			id := symbol.Name
			// We will copy all symbol regardless of its reserved name because
			// symbolsToArray will check whether the key is a reserved name and
			// it will not copy symbol with reserved name to the array
			if _, ok := symbols[id]; !ok {
				symbols[id] = symbol
			}
		}
	}

	copySymbols := func(source ast.SymbolTable, meaning ast.SymbolFlags) {
		if meaning != 0 {
			for _, symbol := range source {
				copySymbol(symbol, meaning)
			}
		}
	}

	copyLocallyVisibleExportSymbols := func(source ast.SymbolTable, meaning ast.SymbolFlags) {
		if meaning != 0 {
			for _, symbol := range source {
				// Similar condition as in `resolveNameHelper`
				if ast.GetDeclarationOfKind(symbol, ast.KindExportSpecifier) == nil &&
					ast.GetDeclarationOfKind(symbol, ast.KindNamespaceExport) == nil &&
					symbol.Name != ast.InternalSymbolNameDefault {
					copySymbol(symbol, meaning)
				}
			}
		}
	}

	populateSymbols := func() {
		for location != nil {
			if canHaveLocals(location) && location.Locals() != nil && !ast.IsGlobalSourceFile(location) {
				copySymbols(location.Locals(), meaning)
			}

			switch location.Kind {
			case ast.KindSourceFile:
				if !ast.IsExternalModule(location.AsSourceFile()) {
					break
				}
				fallthrough
			case ast.KindModuleDeclaration:
				copyLocallyVisibleExportSymbols(c.getSymbolOfDeclaration(location).Exports, meaning&ast.SymbolFlagsModuleMember)
			case ast.KindEnumDeclaration:
				copySymbols(c.getSymbolOfDeclaration(location).Exports, meaning&ast.SymbolFlagsEnumMember)
			case ast.KindClassExpression:
				className := location.AsClassExpression().Name()
				if className != nil {
					copySymbol(location.Symbol(), meaning)
				}
				// this fall-through is necessary because we would like to handle
				// type parameter inside class expression similar to how we handle it in classDeclaration and interface Declaration.
				fallthrough
			case ast.KindClassDeclaration, ast.KindInterfaceDeclaration:
				// If we didn't come from static member of class or interface,
				// add the type parameters into the symbol table
				// (type parameters of classDeclaration/classExpression and interface are in member property of the symbol.
				// Note: that the memberFlags come from previous iteration.
				if !isStaticSymbol {
					copySymbols(c.getMembersOfSymbol(c.getSymbolOfDeclaration(location)), meaning&ast.SymbolFlagsType)
				}
			case ast.KindFunctionExpression:
				funcName := location.Name()
				if funcName != nil {
					copySymbol(location.Symbol(), meaning)
				}
			}

			if introducesArgumentsExoticObject(location) {
				copySymbol(c.argumentsSymbol, meaning)
			}

			isStaticSymbol = ast.IsStatic(location)
			location = location.Parent
		}

		copySymbols(c.globals, meaning)
	}

	populateSymbols()

	delete(symbols, ast.InternalSymbolNameThis) // Not a symbol, a keyword
	return symbolsToArray(symbols)
}

func (c *Checker) GetAliasedSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.resolveAlias(symbol)
}

func (c *Checker) GetExportsOfModule(symbol *ast.Symbol) []*ast.Symbol {
	return symbolsToArray(c.getExportsOfModule(symbol))
}

func (c *Checker) IsValidPropertyAccess(node *ast.Node, propertyName string) bool {
	return c.isValidPropertyAccess(node, propertyName)
}

func (c *Checker) isValidPropertyAccess(node *ast.Node, propertyName string) bool {
	switch node.Kind {
	case ast.KindPropertyAccessExpression:
		return c.isValidPropertyAccessWithType(node, node.Expression().Kind == ast.KindSuperKeyword, propertyName, c.getWidenedType(c.checkExpression(node.Expression())))
	case ast.KindQualifiedName:
		return c.isValidPropertyAccessWithType(node, false /*isSuper*/, propertyName, c.getWidenedType(c.checkExpression(node.AsQualifiedName().Left)))
	case ast.KindImportType:
		return c.isValidPropertyAccessWithType(node, false /*isSuper*/, propertyName, c.getTypeFromTypeNode(node))
	}
	panic("Unexpected node kind in isValidPropertyAccess: " + node.Kind.String())
}

func (c *Checker) isValidPropertyAccessWithType(node *ast.Node, isSuper bool, propertyName string, t *Type) bool {
	// Short-circuiting for improved performance.
	if IsTypeAny(t) {
		return true
	}

	prop := c.getPropertyOfType(t, propertyName)
	return prop != nil && c.isPropertyAccessible(node, isSuper, false /*isWrite*/, t, prop)
}

// Checks if an existing property access is valid for completions purposes.
// node: a property access-like node where we want to check if we can access a property.
// This node does not need to be an access of the property we are checking.
// e.g. in completions, this node will often be an incomplete property access node, as in `foo.`.
// Besides providing a location (i.e. scope) used to check property accessibility, we use this node for
// computing whether this is a `super` property access.
// type: the type whose property we are checking.
// property: the accessed property's symbol.
func (c *Checker) IsValidPropertyAccessForCompletions(node *ast.Node, t *Type, property *ast.Symbol) bool {
	return c.isPropertyAccessible(
		node,
		node.Kind == ast.KindPropertyAccessExpression && node.Expression().Kind == ast.KindSuperKeyword,
		false, /*isWrite*/
		t,
		property,
	)
	// Previously we validated the 'this' type of methods but this adversely affected performance. See #31377 for more context.
}

func (c *Checker) GetAllPossiblePropertiesOfTypes(types []*Type) []*ast.Symbol {
	unionType := c.getUnionType(types)
	if unionType.flags&TypeFlagsUnion == 0 {
		return c.getAugmentedPropertiesOfType(unionType)
	}

	props := createSymbolTable(nil)
	for _, memberType := range types {
		augmentedProps := c.getAugmentedPropertiesOfType(memberType)
		for _, p := range augmentedProps {
			if _, ok := props[p.Name]; !ok {
				prop := c.createUnionOrIntersectionProperty(unionType, p.Name, false /*skipObjectFunctionPropertyAugment*/)
				// May be undefined if the property is private
				if prop != nil {
					props[p.Name] = prop
				}
			}
		}
	}
	return slices.Collect(maps.Values(props))
}

func (c *Checker) IsUnknownSymbol(symbol *ast.Symbol) bool {
	return symbol == c.unknownSymbol
}

func (c *Checker) IsUndefinedSymbol(symbol *ast.Symbol) bool {
	return symbol == c.undefinedSymbol
}

func (c *Checker) IsArgumentsSymbol(symbol *ast.Symbol) bool {
	return symbol == c.argumentsSymbol
}

// Originally from services.ts
func (c *Checker) GetNonOptionalType(t *Type) *Type {
	return c.removeOptionalTypeMarker(t)
}

func (c *Checker) GetStringIndexType(t *Type) *Type {
	return c.getIndexTypeOfType(t, c.stringType)
}

func (c *Checker) GetNumberIndexType(t *Type) *Type {
	return c.getIndexTypeOfType(t, c.numberType)
}

func (c *Checker) GetCallSignatures(t *Type) []*Signature {
	return c.getSignaturesOfType(t, SignatureKindCall)
}

func (c *Checker) GetConstructSignatures(t *Type) []*Signature {
	return c.getSignaturesOfType(t, SignatureKindConstruct)
}

func (c *Checker) GetApparentProperties(t *Type) []*ast.Symbol {
	return c.getAugmentedPropertiesOfType(t)
}

func (c *Checker) getAugmentedPropertiesOfType(t *Type) []*ast.Symbol {
	t = c.getApparentType(t)
	propsByName := createSymbolTable(c.getPropertiesOfType(t))
	var functionType *Type
	if len(c.getSignaturesOfType(t, SignatureKindCall)) > 0 {
		functionType = c.globalCallableFunctionType
	} else if len(c.getSignaturesOfType(t, SignatureKindConstruct)) > 0 {
		functionType = c.globalNewableFunctionType
	}

	if functionType != nil {
		for _, p := range c.getPropertiesOfType(functionType) {
			if _, ok := propsByName[p.Name]; !ok {
				propsByName[p.Name] = p
			}
		}
	}
	return c.getNamedMembers(propsByName)
}

func (c *Checker) TryGetMemberInModuleExportsAndProperties(memberName string, moduleSymbol *ast.Symbol) *ast.Symbol {
	symbol := c.TryGetMemberInModuleExports(memberName, moduleSymbol)
	if symbol != nil {
		return symbol
	}

	exportEquals := c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias*/)
	if exportEquals == moduleSymbol {
		return nil
	}

	t := c.getTypeOfSymbol(exportEquals)
	if c.shouldTreatPropertiesOfExternalModuleAsExports(t) {
		return c.getPropertyOfType(t, memberName)
	}
	return nil
}

func (c *Checker) TryGetMemberInModuleExports(memberName string, moduleSymbol *ast.Symbol) *ast.Symbol {
	symbolTable := c.getExportsOfModule(moduleSymbol)
	return symbolTable[memberName]
}

func (c *Checker) shouldTreatPropertiesOfExternalModuleAsExports(resolvedExternalModuleType *Type) bool {
	return resolvedExternalModuleType.flags&TypeFlagsPrimitive == 0 ||
		resolvedExternalModuleType.objectFlags&ObjectFlagsClass != 0 ||
		// `isArrayOrTupleLikeType` is too expensive to use in this auto-imports hot path.
		c.isArrayType(resolvedExternalModuleType) ||
		isTupleType(resolvedExternalModuleType)
}

func (c *Checker) GetContextualType(node *ast.Expression, contextFlags ContextFlags) *Type {
	if contextFlags&ContextFlagsCompletions != 0 {
		return runWithInferenceBlockedFromSourceNode(c, node, func() *Type { return c.getContextualType(node, contextFlags) })
	}
	return c.getContextualType(node, contextFlags)
}

func runWithInferenceBlockedFromSourceNode[T any](c *Checker, node *ast.Node, fn func() T) T {
	containingCall := ast.FindAncestor(node, ast.IsCallLikeExpression)
	if containingCall != nil {
		toMarkSkip := node
		for {
			c.skipDirectInferenceNodes.Add(toMarkSkip)
			toMarkSkip = toMarkSkip.Parent
			if toMarkSkip == nil || toMarkSkip == containingCall {
				break
			}
		}
	}

	c.isInferencePartiallyBlocked = true
	result := runWithoutResolvedSignatureCaching(c, node, fn)
	c.isInferencePartiallyBlocked = false

	c.skipDirectInferenceNodes.Clear()
	return result
}

func runWithoutResolvedSignatureCaching[T any](c *Checker, node *ast.Node, fn func() T) T {
	ancestorNode := ast.FindAncestor(node, func(n *ast.Node) bool {
		return ast.IsCallLikeOrFunctionLikeExpression(n)
	})
	if ancestorNode != nil {
		cachedResolvedSignatures := make(map[*SignatureLinks]*Signature)
		cachedTypes := make(map[*ValueSymbolLinks]*Type)
		for ancestorNode != nil {
			signatureLinks := c.signatureLinks.Get(ancestorNode)
			cachedResolvedSignatures[signatureLinks] = signatureLinks.resolvedSignature
			signatureLinks.resolvedSignature = nil
			if ast.IsFunctionExpressionOrArrowFunction(ancestorNode) {
				symbolLinks := c.valueSymbolLinks.Get(c.getSymbolOfDeclaration(ancestorNode))
				resolvedType := symbolLinks.resolvedType
				cachedTypes[symbolLinks] = resolvedType
				symbolLinks.resolvedType = nil
			}
			ancestorNode = ast.FindAncestor(ancestorNode.Parent, ast.IsCallLikeOrFunctionLikeExpression)
		}
		result := fn()
		for signatureLinks, resolvedSignature := range cachedResolvedSignatures {
			signatureLinks.resolvedSignature = resolvedSignature
		}
		for symbolLinks, resolvedType := range cachedTypes {
			symbolLinks.resolvedType = resolvedType
		}
		return result
	}
	return fn()
}

func (c *Checker) GetRootSymbols(symbol *ast.Symbol) []*ast.Symbol {
	roots := c.getImmediateRootSymbols(symbol)
	if roots != nil {
		var result []*ast.Symbol
		for _, root := range roots {
			result = append(result, c.GetRootSymbols(root)...)
		}
	}
	return []*ast.Symbol{symbol}
}

func (c *Checker) getImmediateRootSymbols(symbol *ast.Symbol) []*ast.Symbol {
	if symbol.CheckFlags&ast.CheckFlagsSynthetic != 0 {
		return core.MapNonNil(
			c.valueSymbolLinks.Get(symbol).containingType.Types(),
			func(t *Type) *ast.Symbol {
				return c.getPropertyOfType(t, symbol.Name)
			})
	} else if symbol.Flags&ast.SymbolFlagsTransient != 0 {
		if c.spreadLinks.Has(symbol) {
			leftSpread := c.spreadLinks.Get(symbol).leftSpread
			rightSpread := c.spreadLinks.Get(symbol).rightSpread
			if leftSpread != nil {
				return []*ast.Symbol{leftSpread, rightSpread}
			}
		}
		if c.mappedSymbolLinks.Has(symbol) {
			syntheticOrigin := c.mappedSymbolLinks.Get(symbol).syntheticOrigin
			if syntheticOrigin != nil {
				return []*ast.Symbol{syntheticOrigin}
			}
		}
		target := c.tryGetTarget(symbol)
		if target != nil {
			return []*ast.Symbol{target}
		}
		return nil
	}

	return nil
}

func (c *Checker) tryGetTarget(symbol *ast.Symbol) *ast.Symbol {
	var target *ast.Symbol
	next := symbol
	for {
		if c.valueSymbolLinks.Has(next) {
			next = c.valueSymbolLinks.Get(next).target
		} else if c.exportTypeLinks.Has(next) {
			next = c.exportTypeLinks.Get(next).target
		} else {
			next = nil
		}
		if next == nil {
			break
		}
		target = next
	}
	return target
}

func (c *Checker) GetExportSymbolOfSymbol(symbol *ast.Symbol) *ast.Symbol {
	return c.getMergedSymbol(core.IfElse(symbol.ExportSymbol != nil, symbol.ExportSymbol, symbol))
}

func (c *Checker) GetTypeArgumentConstraint(node *ast.Node) *Type {
	if !ast.IsTypeNode(node) {
		return nil
	}
	return c.getTypeArgumentConstraint(node)
}

func (c *Checker) getTypeArgumentConstraint(node *ast.Node) *Type {
	typeReferenceNode := core.IfElse(ast.IsTypeReferenceType(node.Parent), node.Parent, nil)
	if typeReferenceNode == nil {
		return nil
	}
	typeParameters := c.getTypeParametersForTypeReferenceOrImport(typeReferenceNode)
	if len(typeParameters) == 0 {
		return nil
	}

	typeParamIndex := core.FindIndex(typeReferenceNode.TypeArguments(), func(n *ast.Node) bool {
		return n == node
	})
	constraint := c.getConstraintOfTypeParameter(typeParameters[typeParamIndex])
	if constraint != nil {
		return c.instantiateType(
			constraint,
			newTypeMapper(typeParameters, c.getEffectiveTypeArguments(typeReferenceNode, typeParameters)))
	}
	return nil
}

func (c *Checker) IsTypeInvalidDueToUnionDiscriminant(contextualType *Type, obj *ast.Node) bool {
	properties := obj.Properties()
	return core.Some(properties, func(property *ast.Node) bool {
		var nameType *Type
		propertyName := property.Name()
		if propertyName != nil {
			if ast.IsJsxNamespacedName(propertyName) {
				nameType = c.getStringLiteralType(propertyName.Text())
			} else {
				nameType = c.getLiteralTypeFromPropertyName(propertyName)
			}
		}
		var name string
		if nameType != nil && isTypeUsableAsPropertyName(nameType) {
			name = getPropertyNameFromType(nameType)
		}
		var expected *Type
		if name != "" {
			expected = c.getTypeOfPropertyOfType(contextualType, name)
		}
		return expected != nil && isLiteralType(expected) && !c.isTypeAssignableTo(c.getTypeOfNode(property), expected)
	})
}

// Unlike `getExportsOfModule`, this includes properties of an `export =` value.
func (c *Checker) GetExportsAndPropertiesOfModule(moduleSymbol *ast.Symbol) []*ast.Symbol {
	exports := c.getExportsOfModuleAsArray(moduleSymbol)
	exportEquals := c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias*/)
	if exportEquals != moduleSymbol {
		t := c.getTypeOfSymbol(exportEquals)
		if c.shouldTreatPropertiesOfExternalModuleAsExports(t) {
			exports = append(exports, c.getPropertiesOfType(t)...)
		}
	}
	return exports
}

func (c *Checker) getExportsOfModuleAsArray(moduleSymbol *ast.Symbol) []*ast.Symbol {
	return symbolsToArray(c.getExportsOfModule(moduleSymbol))
}

// Returns all the properties of the Jsx.IntrinsicElements interface.
func (c *Checker) GetJsxIntrinsicTagNamesAt(location *ast.Node) []*ast.Symbol {
	intrinsics := c.getJsxType(JsxNames.IntrinsicElements, location)
	if intrinsics == nil {
		return nil
	}
	return c.GetPropertiesOfType(intrinsics)
}

func (c *Checker) GetContextualTypeForJsxAttribute(attribute *ast.JsxAttributeLike) *Type {
	return c.getContextualTypeForJsxAttribute(attribute, ContextFlagsNone)
}
