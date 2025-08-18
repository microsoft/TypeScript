package checker

import (
	"maps"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
)

func cloneNodeBuilderContext(context *NodeBuilderContext) func() {
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
	oldMustCreateTypeParameterSymbolList := context.hasCreatedTypeParameterSymbolList
	oldMustCreateTypeParametersNamesLookups := context.hasCreatedTypeParametersNamesLookups
	context.hasCreatedTypeParameterSymbolList = false
	context.hasCreatedTypeParametersNamesLookups = false
	oldTypeParameterNames := context.typeParameterNames
	oldTypeParameterNamesByText := context.typeParameterNamesByText
	oldTypeParameterNamesByTextNextNameCount := context.typeParameterNamesByTextNextNameCount
	oldTypeParameterSymbolList := context.typeParameterSymbolList
	context.typeParameterNames = maps.Clone(context.typeParameterNames)
	context.typeParameterNamesByText = maps.Clone(context.typeParameterNamesByText)
	context.typeParameterNamesByTextNextNameCount = maps.Clone(context.typeParameterNamesByTextNextNameCount)
	context.typeParameterSymbolList = maps.Clone(context.typeParameterSymbolList)
	return func() {
		context.typeParameterNames = oldTypeParameterNames
		context.typeParameterNamesByText = oldTypeParameterNamesByText
		context.typeParameterNamesByTextNextNameCount = oldTypeParameterNamesByTextNextNameCount
		context.typeParameterSymbolList = oldTypeParameterSymbolList
		context.hasCreatedTypeParameterSymbolList = oldMustCreateTypeParameterSymbolList
		context.hasCreatedTypeParametersNamesLookups = oldMustCreateTypeParametersNamesLookups
	}
}

type localsRecord struct {
	name      string
	oldSymbol *ast.Symbol
}

func (b *nodeBuilderImpl) enterNewScope(declaration *ast.Node, expandedParams []*ast.Symbol, typeParameters []*Type, originalParameters []*ast.Symbol, mapper *TypeMapper) func() {
	cleanupContext := cloneNodeBuilderContext(b.ctx)
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
			debug.AssertIsDefined(b.ctx.enclosingDeclaration)
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
			debug.AssertOptionalNode(existingFakeScope, ast.IsBlock)

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
						originalParam = (originalParameters)[pIndex]
					}
					if originalParameters != nil && originalParam != param {
						// Can't reference parameters that come from an expansion
						add(param.Name, b.ch.unknownSymbol)
						// Can't reference the original expanded parameter either
						if originalParam != nil {
							add(originalParam.Name, b.ch.unknownSymbol)
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

						if ast.IsParameter(d) && d.Name() != nil && ast.IsBindingPattern(d.Name()) {
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
		cleanupContext()
		b.ctx.enclosingDeclaration = oldEnclosingDecl
		b.ctx.mapper = oldMapper
	}
}
