package checker

import (
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/jsnum"
	"github.com/microsoft/TypeScript/tsc/internal/nodebuilder"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
)

func enterTypeParameterNameScope(context *NodeBuilderContext) func() {
	// Make type parameters created within this context not consume the name outside this context
	// The symbol serializer ends up creating many sibling scopes that all need "separate" contexts when
	// it comes to naming things - within a normal `typeToTypeNode` call, the node builder only ever descends
	// through the type tree, so the only cases where we could have used distinct sibling scopes was when there
	// were multiple generic overloads with similar generated type parameter names
	// The effect:
	// When we write out
	// export const x: <T>(x: T) => T
	// export const y: <T>(x: T) => T
	// we write it out like that, rather than as
	// export const x: <T>(x: T) => T
	// export const y: <T_1>(x: T_1) => T_1
	restoreNames := context.typeParameterNames.EnterScope()
	restoreNamesByText := context.typeParameterNamesByText.EnterScope()
	restoreNamesByTextNextNameCount := context.typeParameterNamesByTextNextNameCount.EnterScope()
	restoreSymbolList := context.typeParameterSymbolList.EnterScope()
	return func() {
		restoreNames()
		restoreNamesByText()
		restoreNamesByTextNextNameCount()
		restoreSymbolList()
	}
}

type localsRecord struct {
	name      string
	oldSymbol *ast.Symbol
}

func (b *NodeBuilderImpl) addSymbolTypeToContext(symbol *ast.Symbol, t *Type) func() {
	id := ast.GetSymbolId(symbol)
	oldType, oldTypeExists := b.ctx.enclosingSymbolTypes[id]
	b.ctx.enclosingSymbolTypes[id] = t
	return func() {
		if oldTypeExists {
			b.ctx.enclosingSymbolTypes[id] = oldType
		} else {
			delete(b.ctx.enclosingSymbolTypes, id)
		}
	}
}

func (b *NodeBuilderImpl) serializationTypeId(t *Type) TypeId {
	if b.ch.isArrayOrTupleType(t) {
		// Deferred and regular references share a serialization identity.
		return b.ch.createTypeReference(t.Target(), b.ch.getTypeArguments(t)).id
	}
	return t.id
}

func (b *NodeBuilderImpl) enterTypeBinding(t *Type, symbol *ast.Symbol) func() {
	bindings := b.ctx.bindings
	if symbol != nil {
		binding := serializationTypeBinding{t: t, typeId: b.serializationTypeId(t), symbol: symbol, depth: b.ctx.deferredTypeDepth}
		if len(bindings) != 0 && t.flags&TypeFlagsStructuredOrInstantiable != 0 &&
			symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod|ast.SymbolFlagsAccessor) != 0 {
			name := b.getTypeBindingName(t, binding)
			if name.symbol == nil || !b.isSerializationTypeNameAccessible(name) {
				index := b.getSerializationPropertyIndex(symbol)
				if isTypeUsableAsPropertyName(index) {
					for _, parent := range slices.Backward(bindings) {
						if b.ch.getPropertyOfType(parent.t, symbol.Name) != symbol {
							continue
						}
						parentName := b.getTypeBindingName(parent.t, parent)
						if parentName.symbol == nil || !b.isSerializationTypeNameAccessible(parentName) {
							continue
						}
						path := append(slices.Clone(parentName.path), index)
						if name := b.getValueTypeName(t, parentName.symbol, path); name.symbol != nil {
							binding.symbol, binding.path = name.symbol, name.path
							break
						}
					}
				}
			}
		}
		b.ctx.bindings = append(bindings, binding)
	}
	return func() { b.ctx.bindings = bindings }
}

func (b *NodeBuilderImpl) getSerializationPropertyIndex(symbol *ast.Symbol) *Type {
	name := ast.GetNameOfDeclaration(symbol.ValueDeclaration)
	if name != nil && !ast.IsPropertyName(name) && b.ch.valueSymbolLinks.Get(b.ch.getLateBoundSymbol(symbol)).nameType == nil {
		return b.ch.neverType
	}
	return b.ch.getLiteralTypeFromProperty(symbol, TypeFlagsStringOrNumberLiteralOrUnique, false /*includeNonPublic*/)
}

// Lexical scopes alone do not guard back-references; only lazy member boundaries do.
func (b *NodeBuilderImpl) enterDeferredTypeScope() func() {
	depth := b.ctx.deferredTypeDepth
	b.ctx.deferredTypeDepth++
	return func() { b.ctx.deferredTypeDepth = depth }
}

func (b *NodeBuilderImpl) enterInferTypeParameterScope(typeParameters []*Type) func() {
	inferTypeParameters := b.ctx.inferTypeParameters
	b.ctx.inferTypeParameters = typeParameters
	return func() { b.ctx.inferTypeParameters = inferTypeParameters }
}

func (b *NodeBuilderImpl) isSameSerializationType(t *Type, typeId TypeId, other *Type, otherTypeId TypeId) bool {
	if typeId == otherTypeId {
		return true
	}
	// Regular and widened objects may have different IDs without changing shape.
	// Do not collapse distinct generic instantiations.
	return t.objectFlags&(ObjectFlagsAnonymous|ObjectFlagsInstantiated) == ObjectFlagsAnonymous &&
		other.objectFlags&(ObjectFlagsAnonymous|ObjectFlagsInstantiated) == ObjectFlagsAnonymous &&
		t.symbol != nil && t.symbol == other.symbol && b.ch.isTypeIdenticalTo(t, other)
}

func (b *NodeBuilderImpl) getTypeBindingReference(t *Type) serializationTypeName {
	typeId := b.serializationTypeId(t)
	for _, binding := range b.ctx.bindings {
		if b.ctx.deferredTypeDepth <= binding.depth ||
			!b.isSameSerializationBindingType(t, typeId, binding.t, binding.typeId) {
			continue
		}
		name := b.getTypeBindingName(t, binding)
		if name.symbol != nil && b.isSerializationTypeNameAccessible(name) {
			return name
		}
	}
	return serializationTypeName{}
}

func (b *NodeBuilderImpl) isSameSerializationBindingType(t *Type, typeId TypeId, other *Type, otherTypeId TypeId) bool {
	// A proven name can denote equivalent specializations without merging their graph identities.
	return b.isSameSerializationType(t, typeId, other, otherTypeId) ||
		t.objectFlags&ObjectFlagsAnonymous != 0 && other.objectFlags&ObjectFlagsAnonymous != 0 &&
			t.symbol != nil && t.symbol == other.symbol && b.ch.isTypeIdenticalTo(t, other)
}

func (b *NodeBuilderImpl) getTypeBindingName(t *Type, binding serializationTypeBinding) serializationTypeName {
	if symbol := binding.symbol; symbol != nil {
		if len(binding.path) == 0 && symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod|ast.SymbolFlagsAccessor) != 0 {
			if name := b.getSerializationTypeNameFromDeclaration(t, symbol.ValueDeclaration); name.symbol != nil {
				return name
			}
		}
		return b.getValueTypeName(t, symbol, binding.path)
	}
	return b.getSerializationValueName(t)
}

func (b *NodeBuilderImpl) getValueTypeName(t *Type, symbol *ast.Symbol, path []*Type) serializationTypeName {
	if symbol == nil || symbol.Flags&ast.SymbolFlagsValue == 0 || symbol.Flags&ast.SymbolFlagsModuleExports != 0 || t.flags&TypeFlagsStructuredOrInstantiable == 0 ||
		IsPrivateIdentifierSymbol(symbol) || b.ctx.flags&nodebuilder.FlagsUseStructuralFallback != 0 && getDeclarationModifierFlagsFromSymbol(symbol)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 ||
		!scanner.IsIdentifierText(symbol.Name, core.LanguageVariantStandard) {
		return serializationTypeName{}
	}
	// Formatting a diagnostic must not restart inference for a declaration
	// whose type is still being resolved.
	namedType := b.ch.valueSymbolLinks.Get(symbol).resolvedType
	if namedType == nil {
		return serializationTypeName{}
	}
	for _, index := range path {
		property := b.ch.getPropertyOfType(namedType, getPropertyNameFromType(index))
		if property != nil {
			if IsPrivateIdentifierSymbol(property) || b.ctx.flags&nodebuilder.FlagsUseStructuralFallback != 0 && getDeclarationModifierFlagsFromSymbol(property)&(ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 ||
				b.ch.findResolutionCycleStartIndex(property, TypeSystemPropertyNameType) >= 0 {
				return serializationTypeName{}
			}
		}
		namedType = b.ch.getIndexedAccessType(namedType, index)
	}
	if !b.isSameSerializationBindingType(t, b.serializationTypeId(t), namedType, b.serializationTypeId(namedType)) {
		return serializationTypeName{}
	}
	return serializationTypeName{symbol: symbol, meaning: ast.SymbolFlagsValue, path: path}
}

func (b *NodeBuilderImpl) getSerializationValueName(t *Type) serializationTypeName {
	if t.objectFlags&ObjectFlagsAnonymous == 0 || t.symbol == nil {
		return serializationTypeName{}
	}
	node := t.symbol.ValueDeclaration
	if node != nil && (ast.IsExpression(node) || ast.IsClassElement(node) || ast.IsPropertyAssignment(node)) {
		if name := b.getSerializationTypeNameFromDeclaration(t, node); name.symbol != nil {
			return name
		}
	}
	return b.getValueTypeName(t, t.symbol, nil)
}

func (b *NodeBuilderImpl) isSerializationTypeNameAccessible(name serializationTypeName) bool {
	if b.ctx.flags&nodebuilder.FlagsForbidIndexedAccessSymbolReferences != 0 &&
		(len(name.path) != 0 || name.symbol.Flags&(ast.SymbolFlagsProperty|ast.SymbolFlagsMethod|ast.SymbolFlagsAccessor) != 0) {
		return false
	}
	// Displays may use lexical names whose declarations cannot be exposed in a .d.ts.
	if b.ctx.flags&nodebuilder.FlagsUseStructuralFallback == 0 && b.ctx.enclosingDeclaration != nil &&
		b.ch.resolveName(b.ctx.enclosingDeclaration, name.symbol.Name, name.meaning, nil /*nameNotFoundMessage*/, false /*isUse*/, false /*excludeGlobals*/) == name.symbol {
		return true
	}
	return b.ch.IsValueSymbolAccessible(name.symbol, b.ctx.enclosingDeclaration)
}

func (b *NodeBuilderImpl) serializationTypeNameToNode(name serializationTypeName) *ast.TypeNode {
	typeArguments := b.mapToTypeNodes(name.typeArguments, false /*isBareList*/)
	if name.meaning == ast.SymbolFlagsType {
		if isReservedMemberName(name.symbol.Name) && name.symbol.Flags&ast.SymbolFlagsClass == 0 {
			return b.f.NewTypeReferenceNode(b.f.NewIdentifier(""), typeArguments)
		}
		if typeArguments != nil && len(typeArguments.Nodes) == 1 && name.symbol == b.ch.globalArrayType.symbol {
			return b.f.NewArrayTypeNode(typeArguments.Nodes[0])
		}
	}
	node := b.symbolToTypeNode(name.symbol, name.meaning, typeArguments)
	restoreFlags := b.saveRestoreFlags()
	b.ctx.flags &^= nodebuilder.FlagsAllowUniqueESSymbolType
	for _, index := range name.path {
		b.ctx.approximateLength += 2
		node = b.f.NewIndexedAccessTypeNode(node, b.typeToTypeNode(index))
	}
	restoreFlags()
	return node
}

func (b *NodeBuilderImpl) prefersTypeOfFunction(t *Type, name serializationTypeName) bool {
	if name.symbol == nil || name.meaning != ast.SymbolFlagsValue || t.symbol == nil {
		return false
	}
	symbol := t.symbol
	if symbol.Flags&ast.SymbolFlagsMethod != 0 {
		return core.Some(symbol.Declarations, ast.IsStatic)
	}
	if symbol.Flags&ast.SymbolFlagsFunction == 0 || len(name.path) != 0 {
		return false
	}
	declaration := name.symbol.ValueDeclaration
	if declaration == nil || ast.IsVariableDeclaration(declaration) && declaration == b.ctx.enclosingDeclaration {
		return false
	}
	if ast.IsVariableDeclaration(declaration) {
		if declaration.Parent == nil || !ast.IsVariableDeclarationList(declaration.Parent) || declaration.Parent.Parent == nil {
			return false
		}
		declaration = declaration.Parent.Parent
	}
	return symbol.Parent != nil || declaration.Parent != nil &&
		(declaration.Parent.Kind == ast.KindSourceFile || declaration.Parent.Kind == ast.KindModuleBlock)
}

func (b *NodeBuilderImpl) getSerializationTypeNameFromDeclaration(t *Type, node *ast.Node) serializationTypeName {
	var path []*Type
	for node != nil {
		if declaration := getAssignedValueDeclaration(node); declaration != nil && !ast.IsStatic(declaration) {
			slices.Reverse(path)
			return b.getValueTypeName(t, b.ch.getSymbolOfDeclaration(declaration), path)
		}
		parent := walkUpOuterExpressions(node)
		if parent == nil {
			return serializationTypeName{}
		}
		switch {
		case ast.IsPropertyDeclaration(parent):
			node = parent
		case ast.IsPropertyAssignment(parent):
			index := b.ch.getLiteralTypeFromPropertyName(parent.Name())
			if !isTypeUsableAsPropertyName(index) {
				return serializationTypeName{}
			}
			path = append(path, index)
			node = parent.Parent
		case ast.IsObjectLiteralExpression(parent), ast.IsClassLike(parent):
			if node.Name() == nil {
				return serializationTypeName{}
			}
			index := b.ch.getLiteralTypeFromPropertyName(node.Name())
			if !isTypeUsableAsPropertyName(index) {
				return serializationTypeName{}
			}
			path = append(path, index)
			if ast.IsClassDeclaration(parent) {
				slices.Reverse(path)
				return b.getValueTypeName(t, b.ch.getSymbolOfDeclaration(parent), path)
			}
			node = parent
		case ast.IsArrayLiteralExpression(parent):
			elements := parent.AsArrayLiteralExpression().Elements.Nodes
			index := slices.IndexFunc(elements, func(element *ast.Node) bool {
				return ast.SkipOuterExpressions(element, ast.OEKAll) == node
			})
			if index < 0 || core.Some(elements[:index], ast.IsSpreadElement) {
				return serializationTypeName{}
			}
			path = append(path, b.ch.getNumberLiteralType(jsnum.Number(index)))
			node = parent
		default:
			return serializationTypeName{}
		}
	}
	return serializationTypeName{}
}

func (b *NodeBuilderImpl) enterSignatureScope(signature *Signature) (expandedParams []*ast.Symbol, cleanup func()) {
	bindings := b.ctx.bindings
	if signature.declaration != nil {
		var declarations []*ast.Node
		if assigned := getAssignedValueDeclaration(signature.declaration); assigned != nil {
			declarations = append(declarations, assigned)
		}
		declarations = append(declarations, signature.declaration)
		for _, declaration := range declarations {
			if symbol := b.ch.getSymbolOfDeclaration(declaration); symbol != nil {
				t := b.ch.valueSymbolLinks.Get(symbol).resolvedType
				if t == nil && symbol.Flags&(ast.SymbolFlagsFunction|ast.SymbolFlagsMethod) != 0 && symbol.CheckFlags&ast.CheckFlagsInstantiated == 0 {
					// Function type shells do not require resolving their signatures.
					t = b.ch.getTypeOfFuncClassEnumModule(symbol)
				}
				if t != nil {
					b.enterTypeBinding(t, symbol)
				}
			}
		}
	}
	restoreDeferredTypeScope := b.enterDeferredTypeScope()
	expandedParams = b.ch.getExpandedParameters(signature, true /*skipUnionExpanding*/)[0]
	restoreScope := b.enterNewScope(signature.declaration, expandedParams, signature.typeParameters, signature.parameters, signature.mapper)
	cleanup = func() {
		restoreScope()
		restoreDeferredTypeScope()
		b.ctx.bindings = bindings
	}
	return expandedParams, cleanup
}

func (b *NodeBuilderImpl) enterNewScope(declaration *ast.Node, expandedParams []*ast.Symbol, typeParameters []*Type, originalParameters []*ast.Symbol, mapper *TypeMapper) func() {
	oldTypeParameters := b.ctx.typeParameters
	b.ctx.typeParameters = append(slices.Clone(oldTypeParameters), typeParameters...)
	cleanupNames := enterTypeParameterNameScope(b.ctx)
	// For regular function/method declarations, the enclosing declaration will already be signature.declaration,
	// so this is a no-op, but for arrow functions and function expressions, the enclosing declaration will be
	// the declaration that the arrow function / function expression is assigned to.
	//
	// If the parameters or return type include "typeof globalThis.paramName", using the wrong scope will lead
	// us to believe that we can emit "typeof paramName" instead, even though that would refer to the parameter,
	// not the global. Make sure we are in the right scope by changing the enclosingDeclaration to the function.
	//
	// We can't use the declaration directly; it may be in another file and so we may lose access to symbols
	// accessible to the current enclosing declaration, or gain access to symbols not accessible to the current
	// enclosing declaration. To keep this chain accurate, insert a fake scope into the chain which makes the
	// function's parameters visible.
	var cleanupParams func()
	var cleanupTypeParams func()
	oldEnclosingDecl := b.ctx.enclosingDeclaration
	oldMapper := b.ctx.mapper
	if mapper != nil {
		b.ctx.mapper = mapper
	}
	if mapper := b.ctx.mapper; mapper != nil && len(typeParameters) != 0 {
		// Bound type parameters shadow inherited substitutions; captured parameters do not.
		b.ctx.mapper = newFunctionTypeMapper(func(t *Type) *Type {
			if slices.Contains(typeParameters, t) {
				return t
			}
			return mapper.Map(t)
		})
	}
	if b.ctx.enclosingDeclaration != nil && declaration != nil {
		// As a performance optimization, reuse the same fake scope within this chain.
		// This is especially needed when we are working on an excessively deep type;
		// if we don't do this, then we spend all of our time adding more and more
		// scopes that need to be searched in isSymbolAccessible later. Since all we
		// really want to do is to mark certain names as unavailable, we can just keep
		// all of the names we're introducing in one large table and push/pop from it as
		// needed; isSymbolAccessible will walk upward and find the closest "fake" scope,
		// which will conveniently report on any and all faked scopes in the chain.
		//
		// It'd likely be better to store this somewhere else for isSymbolAccessible, but
		// since that API _only_ uses the enclosing declaration (and its parents), this is
		// seems like the best way to inject names into that search process.
		//
		// Note that we only check the most immediate enclosingDeclaration; the only place we
		// could potentially add another fake scope into the chain is right here, so we don't
		// traverse all ancestors.
		pushFakeScope := func(kind string, addAll func(addSymbol func(name string, symbol *ast.Symbol))) func() {
			// We only ever need to look two declarations upward.
			debug.Assert(b.ctx.enclosingDeclaration != nil)
			var existingFakeScope *ast.Node
			if b.links.Has(b.ctx.enclosingDeclaration) {
				links := b.links.Get(b.ctx.enclosingDeclaration)
				if links.fakeScopeForSignatureDeclaration != nil && *links.fakeScopeForSignatureDeclaration == kind {
					existingFakeScope = b.ctx.enclosingDeclaration
				}
			}
			if existingFakeScope == nil && b.ctx.enclosingDeclaration.Parent != nil {
				if b.links.Has(b.ctx.enclosingDeclaration.Parent) {
					links := b.links.Get(b.ctx.enclosingDeclaration.Parent)
					if links.fakeScopeForSignatureDeclaration != nil && *links.fakeScopeForSignatureDeclaration == kind {
						existingFakeScope = b.ctx.enclosingDeclaration.Parent
					}
				}
			}
			debug.Assert(existingFakeScope == nil || ast.IsBlock(existingFakeScope))

			var locals ast.SymbolTable
			if existingFakeScope != nil {
				locals = existingFakeScope.Locals()
			}
			if locals == nil {
				locals = make(ast.SymbolTable)
			}
			newLocals := []string{}
			oldLocals := []localsRecord{}
			addAll(func(name string, symbol *ast.Symbol) {
				// Add cleanup information only if we don't own the fake scope
				if existingFakeScope != nil {
					oldSymbol, ok := locals[name]
					if !ok || oldSymbol == nil {
						newLocals = append(newLocals, name)
					} else {
						oldLocals = append(oldLocals, localsRecord{name, oldSymbol})
					}
				}
				locals[name] = symbol
			})

			if existingFakeScope == nil {
				// Use a Block for this; the type of the node doesn't matter so long as it
				// has locals, and this is cheaper/easier than using a function-ish Node.
				fakeScope := b.f.NewBlock(b.f.NewNodeList([]*ast.Node{}), false)
				b.links.Get(fakeScope).fakeScopeForSignatureDeclaration = &kind
				data := fakeScope.LocalsContainerData()
				data.Locals = locals
				fakeScope.Parent = b.ctx.enclosingDeclaration
				b.ctx.enclosingDeclaration = fakeScope
				return nil
			} else {
				// We did not create the current scope, so we have to clean it up
				undo := func() {
					for _, s := range newLocals {
						delete(locals, s)
					}
					for _, s := range oldLocals {
						locals[s.name] = s.oldSymbol
					}
				}
				return undo
			}
		}

		if expandedParams == nil || !core.Some(expandedParams, func(p *ast.Symbol) bool { return p != nil }) {
			cleanupParams = nil
		} else {
			cleanupParams = pushFakeScope("params", func(add func(name string, symbol *ast.Symbol)) {
				if expandedParams == nil {
					return
				}
				for pIndex, param := range expandedParams {
					var originalParam *ast.Symbol
					if pIndex < len(originalParameters) {
						originalParam = originalParameters[pIndex]
					}
					if originalParameters != nil && originalParam != param {
						// Can't reference the expanded parameter name, just the original, unless we've expanded the param list for some reason
						if originalParam != nil {
							add(originalParam.Name, originalParam)
						}
					} else if !core.Some(param.Declarations, func(d *ast.Node) bool {
						var bindElement func(e *ast.BindingElement)
						var bindPattern func(e *ast.BindingPattern)

						bindPatternWorker := func(p *ast.BindingPattern) {
							for _, e := range p.Elements.Nodes {
								switch e.Kind {
								case ast.KindOmittedExpression:
									return
								case ast.KindBindingElement:
									bindElement(e.AsBindingElement())
									return
								default:
									panic("Unhandled binding element kind")
								}
							}
						}

						bindElementWorker := func(e *ast.BindingElement) {
							if e.Name() != nil && ast.IsBindingPattern(e.Name()) {
								bindPattern(e.Name().AsBindingPattern())
								return
							}
							symbol := b.ch.getSymbolOfDeclaration(e.AsNode())
							if symbol != nil { // omitted expressions are now parsed as nameless binding patterns and also have no symbol
								add(symbol.Name, symbol)
							}
						}
						bindElement = bindElementWorker
						bindPattern = bindPatternWorker

						if ast.IsParameterDeclaration(d) && d.Name() != nil && ast.IsBindingPattern(d.Name()) {
							bindPattern(d.Name().AsBindingPattern())
							return true
						}
						return false
					}) {
						add(param.Name, param)
					}
				}
			})
		}

		if b.ctx.flags&nodebuilder.FlagsGenerateNamesForShadowedTypeParams != 0 && typeParameters != nil && core.Some(typeParameters, func(p *Type) bool { return p != nil }) {
			cleanupTypeParams = pushFakeScope("typeParams", func(add func(name string, symbol *ast.Symbol)) {
				if typeParameters == nil {
					return
				}
				for _, typeParam := range typeParameters {
					if typeParam == nil {
						continue
					}
					typeParamName := b.typeParameterToName(typeParam).Text
					add(typeParamName, typeParam.symbol)
				}
			})
		}

	}

	return func() {
		if cleanupParams != nil {
			cleanupParams()
		}
		if cleanupTypeParams != nil {
			cleanupTypeParams()
		}
		cleanupNames()
		b.ctx.enclosingDeclaration = oldEnclosingDecl
		b.ctx.mapper = oldMapper
		b.ctx.typeParameters = oldTypeParameters
	}
}
