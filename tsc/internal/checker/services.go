package checker

import (
	"maps"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
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

func (c *Checker) GetExportsOfModule(symbol *ast.Symbol) []*ast.Symbol {
	return symbolsToArray(c.getExportsOfModule(symbol))
}

func (c *Checker) ForEachExportAndPropertyOfModule(moduleSymbol *ast.Symbol, cb func(*ast.Symbol, string)) {
	for key, exportedSymbol := range c.getExportsOfModule(moduleSymbol) {
		if !isReservedMemberName(key) {
			cb(exportedSymbol, key)
		}
	}

	exportEquals := c.resolveExternalModuleSymbol(moduleSymbol, false /*dontResolveAlias*/)
	if exportEquals == moduleSymbol {
		return
	}

	typeOfSymbol := c.getTypeOfSymbol(exportEquals)
	if !c.shouldTreatPropertiesOfExternalModuleAsExports(typeOfSymbol) {
		return
	}

	// forEachPropertyOfType
	reducedType := c.getReducedApparentType(typeOfSymbol)
	if reducedType.flags&TypeFlagsStructuredType == 0 {
		return
	}
	for name, symbol := range c.resolveStructuredTypeMembers(reducedType).members {
		if c.isNamedMember(symbol, name) {
			cb(symbol, name)
		}
	}
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

	props := make(ast.SymbolTable)
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

	if propsByName == nil {
		propsByName = make(ast.SymbolTable)
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

func GetResolvedSignatureForSignatureHelp(node *ast.Node, argumentCount int, c *Checker) (*Signature, []*Signature) {
	type result struct {
		signature  *Signature
		candidates []*Signature
	}
	res := runWithoutResolvedSignatureCaching(c, node, func() result {
		signature, candidates := c.getResolvedSignatureWorker(node, CheckModeIsForSignatureHelp, argumentCount)
		return result{signature, candidates}
	})
	return res.signature, res.candidates
}

func runWithoutResolvedSignatureCaching[T any](c *Checker, node *ast.Node, fn func() T) T {
	ancestorNode := ast.FindAncestor(node, ast.IsCallLikeOrFunctionLikeExpression)
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

func (c *Checker) SkipAlias(symbol *ast.Symbol) *ast.Symbol {
	if symbol.Flags&ast.SymbolFlagsAlias != 0 {
		return c.GetAliasedSymbol(symbol)
	}
	return symbol
}

func (c *Checker) GetRootSymbols(symbol *ast.Symbol) []*ast.Symbol {
	roots := c.getImmediateRootSymbols(symbol)
	if len(roots) == 0 {
		return []*ast.Symbol{symbol}
	}
	var result []*ast.Symbol
	for _, root := range roots {
		result = append(result, c.GetRootSymbols(root)...)
	}
	return result
}

func (c *Checker) getImmediateRootSymbols(symbol *ast.Symbol) []*ast.Symbol {
	if symbol.CheckFlags&ast.CheckFlagsSynthetic != 0 {
		return core.MapNonNil(
			c.valueSymbolLinks.Get(symbol).containingType.Types(),
			func(t *Type) *ast.Symbol {
				return c.getPropertyOfType(t, symbol.Name)
			})
	}
	if symbol.Flags&ast.SymbolFlagsTransient != 0 {
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

func (c *Checker) GetExportSpecifierLocalTargetSymbol(node *ast.Node) *ast.Symbol {
	// node should be ExportSpecifier | Identifier
	switch node.Kind {
	case ast.KindExportSpecifier:
		if node.Parent.Parent.AsExportDeclaration().ModuleSpecifier != nil {
			return c.getExternalModuleMember(node.Parent.Parent, node, false /*dontResolveAlias*/)
		}
		name := node.PropertyNameOrName()
		if name.Kind == ast.KindStringLiteral {
			// Skip for invalid syntax like this: export { "x" }
			return nil
		}
		return c.resolveEntityName(name, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias, true /*ignoreErrors*/, false, nil)
	case ast.KindIdentifier:
		return c.resolveEntityName(node, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias, true /*ignoreErrors*/, false, nil)
	}
	panic("Unhandled case in getExportSpecifierLocalTargetSymbol, node should be ExportSpecifier | Identifier")
}

func (c *Checker) GetShorthandAssignmentValueSymbol(location *ast.Node) *ast.Symbol {
	if location != nil && location.Kind == ast.KindShorthandPropertyAssignment {
		return c.resolveEntityName(location.Name(), ast.SymbolFlagsValue|ast.SymbolFlagsAlias, true /*ignoreErrors*/, false, nil)
	}
	return nil
}

/**
* Get symbols that represent parameter-property-declaration as parameter and as property declaration
* @param parameter a parameterDeclaration node
* @param parameterName a name of the parameter to get the symbols for.
* @return a tuple of two symbols
 */
func (c *Checker) GetSymbolsOfParameterPropertyDeclaration(parameter *ast.Node /*ParameterPropertyDeclaration*/, parameterName string) (*ast.Symbol, *ast.Symbol) {
	constructorDeclaration := parameter.Parent
	classDeclaration := parameter.Parent.Parent

	parameterSymbol := c.getSymbol(constructorDeclaration.Locals(), parameterName, ast.SymbolFlagsValue)
	propertySymbol := c.getSymbol(c.getMembersOfSymbol(classDeclaration.Symbol()), parameterName, ast.SymbolFlagsValue)

	if parameterSymbol != nil && propertySymbol != nil {
		return parameterSymbol, propertySymbol
	}

	panic("There should exist two symbols, one as property declaration and one as parameter declaration")
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

func (c *Checker) GetConstantValue(node *ast.Node) any {
	if node.Kind == ast.KindEnumMember {
		return c.getEnumMemberValue(node).Value
	}

	if c.symbolNodeLinks.Get(node).resolvedSymbol == nil {
		c.checkExpressionCached(node) // ensure cached resolved symbol is set
	}
	symbol := c.symbolNodeLinks.Get(node).resolvedSymbol
	if symbol == nil && ast.IsEntityNameExpression(node) {
		symbol = c.resolveEntityName(
			node,
			ast.SymbolFlagsValue,
			true,  /*ignoreErrors*/
			false, /*dontResolveAlias*/
			nil /*location*/)
	}
	if symbol != nil && symbol.Flags&ast.SymbolFlagsEnumMember != 0 {
		// inline property\index accesses only for const enums
		member := symbol.ValueDeclaration
		if ast.IsEnumConst(member.Parent) {
			return c.getEnumMemberValue(member).Value
		}
	}

	return nil
}

func (c *Checker) getResolvedSignatureWorker(node *ast.Node, checkMode CheckMode, argumentCount int) (*Signature, []*Signature) {
	parsedNode := printer.NewEmitContext().ParseNode(node)
	c.apparentArgumentCount = &argumentCount
	candidatesOutArray := &[]*Signature{}
	var res *Signature
	if parsedNode != nil {
		res = c.getResolvedSignature(parsedNode, candidatesOutArray, checkMode)
	}
	c.apparentArgumentCount = nil
	return res, *candidatesOutArray
}

func (c *Checker) GetCandidateSignaturesForStringLiteralCompletions(call *ast.CallLikeExpression, editingArgument *ast.Node) []*Signature {
	// first, get candidates when inference is blocked from the source node.
	candidates := runWithInferenceBlockedFromSourceNode(c, editingArgument, func() []*Signature {
		_, blockedInferenceCandidates := c.getResolvedSignatureWorker(call, CheckModeNormal, 0)
		return blockedInferenceCandidates
	})
	candidatesSet := collections.NewSetFromItems(candidates...)

	// next, get candidates where the source node is considered for inference.
	otherCandidates := runWithoutResolvedSignatureCaching(c, editingArgument, func() []*Signature {
		_, inferenceCandidates := c.getResolvedSignatureWorker(call, CheckModeNormal, 0)
		return inferenceCandidates
	})

	for _, candidate := range otherCandidates {
		if candidatesSet.Has(candidate) {
			continue
		}
		candidates = append(candidates, candidate)
	}

	return candidates
}

func (c *Checker) GetTypeParameterAtPosition(s *Signature, pos int) *Type {
	t := c.getTypeAtPosition(s, pos)
	if t.IsIndex() && isThisTypeParameter(t.AsIndexType().target) {
		constraint := c.getBaseConstraintOfType(t.AsIndexType().target)
		if constraint != nil {
			return c.getIndexType(constraint)
		}
	}
	return t
}

func (c *Checker) GetContextualDeclarationsForObjectLiteralElement(objectLiteral *ast.Node, name string) []*ast.Node {
	var result []*ast.Node
	if t := c.getApparentTypeOfContextualType(objectLiteral, ContextFlagsNone); t != nil {
		for _, t := range t.Distributed() {
			prop := c.getPropertyOfType(t, name)
			if prop != nil {
				for _, declaration := range prop.Declarations {
					result = core.AppendIfUnique(result, declaration)
				}
			} else {
				for _, info := range c.getApplicableIndexInfos(t, c.getStringLiteralType(name)) {
					if info.declaration != nil {
						result = core.AppendIfUnique(result, info.declaration)
					}
				}
			}
		}
	}
	return result
}

var knownGenericTypeNames = map[string]struct{}{
	"Array":            {},
	"ArrayLike":        {},
	"ReadonlyArray":    {},
	"Promise":          {},
	"PromiseLike":      {},
	"Iterable":         {},
	"IterableIterator": {},
	"AsyncIterable":    {},
	"Set":              {},
	"WeakSet":          {},
	"ReadonlySet":      {},
	"Map":              {},
	"WeakMap":          {},
	"ReadonlyMap":      {},
	"Partial":          {},
	"Required":         {},
	"Readonly":         {},
	"Pick":             {},
	"Omit":             {},
	"NonNullable":      {},
}

func isKnownGenericTypeName(name string) bool {
	_, exists := knownGenericTypeNames[name]
	return exists
}

func (c *Checker) GetFirstTypeArgumentFromKnownType(t *Type) *Type {
	if t.objectFlags&ObjectFlagsReference != 0 && isKnownGenericTypeName(t.symbol.Name) {
		symbol := c.getGlobalSymbol(t.symbol.Name, ast.SymbolFlagsType, nil)
		if symbol != nil && symbol == t.Target().symbol {
			return core.FirstOrNil(c.getTypeArguments(t))
		}
	}
	if t.alias != nil && isKnownGenericTypeName(t.alias.symbol.Name) {
		symbol := c.getGlobalSymbol(t.alias.symbol.Name, ast.SymbolFlagsType, nil)
		if symbol != nil && symbol == t.alias.symbol {
			return core.FirstOrNil(t.alias.typeArguments)
		}
	}
	return nil
}

// Gets all symbols for one property. Does not get symbols for every property.
func (c *Checker) GetPropertySymbolsFromContextualType(node *ast.Node, contextualType *Type, unionSymbolOk bool) []*ast.Symbol {
	name := ast.GetTextOfPropertyName(node.Name())
	if name == "" {
		return nil
	}
	if contextualType.flags&TypeFlagsUnion == 0 {
		if symbol := c.getPropertyOfType(contextualType, name); symbol != nil {
			return []*ast.Symbol{symbol}
		}
		return nil
	}
	filteredTypes := contextualType.Types()
	if ast.IsObjectLiteralExpression(node.Parent) || ast.IsJsxAttributes(node.Parent) {
		filteredTypes = core.Filter(filteredTypes, func(t *Type) bool {
			return !c.IsTypeInvalidDueToUnionDiscriminant(t, node.Parent)
		})
	}
	discriminatedPropertySymbols := core.MapNonNil(filteredTypes, func(t *Type) *ast.Symbol {
		return c.getPropertyOfType(t, name)
	})
	if unionSymbolOk && (len(discriminatedPropertySymbols) == 0 || len(discriminatedPropertySymbols) == len(contextualType.Types())) {
		if symbol := c.getPropertyOfType(contextualType, name); symbol != nil {
			return []*ast.Symbol{symbol}
		}
	}
	if len(filteredTypes) == 0 && len(discriminatedPropertySymbols) == 0 {
		// Bad discriminant -- do again without discriminating
		return core.MapNonNil(contextualType.Types(), func(t *Type) *ast.Symbol {
			return c.getPropertyOfType(t, name)
		})
	}
	// by eliminating duplicates we might even end up with a single symbol
	// that helps with displaying better quick infos on properties of union types
	return core.Deduplicate(discriminatedPropertySymbols)
}

// Gets the property symbol corresponding to the property in destructuring assignment
// 'property1' from
//
//	for ( { property1: a } of elems) {
//	}
//
// 'property1' at location 'a' from:
//
//	[a] = [ property1, property2 ]
func (c *Checker) GetPropertySymbolOfDestructuringAssignment(location *ast.Node) *ast.Symbol {
	if isArrayLiteralOrObjectLiteralDestructuringPattern(location.Parent.Parent) {
		// Get the type of the object or array literal and then look for property of given name in the type
		if typeOfObjectLiteral := c.getTypeOfAssignmentPattern(location.Parent.Parent); typeOfObjectLiteral != nil {
			return c.getPropertyOfType(typeOfObjectLiteral, location.Text())
		}
	}
	return nil
}

// Gets the type of object literal or array literal of destructuring assignment.
// { a } from
//
//	for ( { a } of elems) {
//	}
//
// [ a ] from
//
//	[a] = [ some array ...]
func (c *Checker) getTypeOfAssignmentPattern(expr *ast.Node) *Type {
	// If this is from "for of"
	//     for ( { a } of elems) {
	//     }
	if ast.IsForOfStatement(expr.Parent) {
		iteratedType := c.checkRightHandSideOfForOf(expr.Parent)
		return c.checkDestructuringAssignment(expr, core.OrElse(iteratedType, c.errorType), CheckModeNormal, false)
	}
	// If this is from "for" initializer
	//     for ({a } = elems[0];.....) { }
	if ast.IsBinaryExpression(expr.Parent) {
		iteratedType := c.getTypeOfExpression(expr.Parent.AsBinaryExpression().Right)
		return c.checkDestructuringAssignment(expr, core.OrElse(iteratedType, c.errorType), CheckModeNormal, false)
	}
	// If this is from nested object binding pattern
	//     for ({ skills: { primary, secondary } } = multiRobot, i = 0; i < 1; i++) {
	if ast.IsPropertyAssignment(expr.Parent) {
		node := expr.Parent.Parent
		typeOfParentObjectLiteral := core.OrElse(c.getTypeOfAssignmentPattern(node), c.errorType)
		propertyIndex := slices.Index(node.AsObjectLiteralExpression().Properties.Nodes, expr.Parent)
		return c.checkObjectLiteralDestructuringPropertyAssignment(node, typeOfParentObjectLiteral, propertyIndex, nil, false)
	}
	// Array literal assignment - array destructuring pattern
	node := expr.Parent
	//    [{ property1: p1, property2 }] = elems;
	typeOfArrayLiteral := core.OrElse(c.getTypeOfAssignmentPattern(node), c.errorType)
	elementType := core.OrElse(c.checkIteratedTypeOrElementType(IterationUseDestructuring, typeOfArrayLiteral, c.undefinedType, expr.Parent), c.errorType)
	return c.checkArrayLiteralDestructuringElementAssignment(node, typeOfArrayLiteral, slices.Index(node.AsArrayLiteralExpression().Elements.Nodes, expr), elementType, CheckModeNormal)
}

func isArrayLiteralOrObjectLiteralDestructuringPattern(node *ast.Node) bool {
	if !(ast.IsArrayLiteralExpression(node) || ast.IsObjectLiteralExpression(node)) {
		return false
	}
	parent := node.Parent
	// [a,b,c] from:
	// [a, b, c] = someExpression;
	if ast.IsBinaryExpression(parent) && parent.AsBinaryExpression().Left == node && parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken {
		return true
	}
	// [a, b, c] from:
	// for([a, b, c] of expression)
	if ast.IsForOfStatement(parent) && parent.Initializer() == node {
		return true
	}
	// {x, a: {a, b, c} } = someExpression
	if ast.IsPropertyAssignment(parent) {
		return isArrayLiteralOrObjectLiteralDestructuringPattern(parent.Parent)
	}
	// [a, b, c] of
	// [x, [a, b, c] ] = someExpression
	return isArrayLiteralOrObjectLiteralDestructuringPattern(parent)
}
