package binder

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
)

type NameResolver struct {
	CompilerOptions                  *core.CompilerOptions
	GetSymbolOfDeclaration           func(node *ast.Node) *ast.Symbol
	Error                            func(location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic
	Globals                          ast.SymbolTable
	ArgumentsSymbol                  *ast.Symbol
	Lookup                           func(symbols ast.SymbolTable, name string, meaning ast.SymbolFlags) *ast.Symbol
	SymbolReferenced                 func(symbol *ast.Symbol, meaning ast.SymbolFlags)
	SetRequiresScopeChangeCache      func(node *ast.Node, value core.Tristate)
	GetRequiresScopeChangeCache      func(node *ast.Node) core.Tristate
	OnPropertyWithInvalidInitializer func(location *ast.Node, name string, declaration *ast.Node, result *ast.Symbol) bool
	OnFailedToResolveSymbol          func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message)
	OnSuccessfullyResolvedSymbol     func(location *ast.Node, result *ast.Symbol, meaning ast.SymbolFlags, lastLocation *ast.Node, associatedDeclarationForContainingInitializerOrBindingName *ast.Node, withinDeferredContext bool)
}

func (r *NameResolver) Resolve(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol {
	var result *ast.Symbol
	var lastLocation *ast.Node
	var lastSelfReferenceLocation *ast.Node
	var propertyWithInvalidInitializer *ast.Node
	var associatedDeclarationForContainingInitializerOrBindingName *ast.Node
	var withinDeferredContext bool
	var grandparent *ast.Node
	originalLocation := location // needed for did-you-mean error reporting, which gathers candidates starting from the original location
	nameIsConst := name == "const"
loop:
	for location != nil {
		if nameIsConst && ast.IsConstAssertion(location) {
			// `const` in an `as const` has no symbol, but issues no error because there is no *actual* lookup of the type
			// (it refers to the constant type of the expression instead)
			return nil
		}
		if isModuleOrEnumDeclaration(location) && lastLocation != nil && location.Name() == lastLocation {
			// If lastLocation is the name of a namespace or enum, skip the parent since it will have is own locals that could
			// conflict.
			lastLocation = location
			location = location.Parent
		}
		locals := location.Locals()
		// Locals of a source file are not in scope (because they get merged into the global symbol table)
		if locals != nil && !ast.IsGlobalSourceFile(location) {
			result = r.lookup(locals, name, meaning)
			if result != nil {
				useResult := true
				if ast.IsFunctionLike(location) && lastLocation != nil && lastLocation != location.Body() {
					// symbol lookup restrictions for function-like declarations
					// - Type parameters of a function are in scope in the entire function declaration, including the parameter
					//   list and return type. However, local types are only in scope in the function body.
					// - parameters are only in the scope of function body
					// This restriction does not apply to JSDoc comment types because they are parented
					// at a higher level than type parameters would normally be
					if meaning&result.Flags&ast.SymbolFlagsType != 0 && lastLocation.Kind != ast.KindJSDoc {
						useResult = result.Flags&ast.SymbolFlagsTypeParameter != 0 && (lastLocation.Flags&ast.NodeFlagsSynthesized != 0 ||
							lastLocation == location.Type() ||
							ast.IsParameterLikeOrReturnTag(lastLocation))
					}
					if meaning&result.Flags&ast.SymbolFlagsVariable != 0 {
						// expression inside parameter will lookup as normal variable scope when targeting es2015+
						if r.useOuterVariableScopeInParameter(result, location, lastLocation) {
							useResult = false
						} else if result.Flags&ast.SymbolFlagsFunctionScopedVariable != 0 {
							// parameters are visible only inside function body, parameter list and return type
							// technically for parameter list case here we might mix parameters and variables declared in function,
							// however it is detected separately when checking initializers of parameters
							// to make sure that they reference no variables declared after them.
							useResult = lastLocation.Kind == ast.KindParameter ||
								lastLocation.Flags&ast.NodeFlagsSynthesized != 0 ||
								lastLocation == location.Type() && ast.FindAncestor(result.ValueDeclaration, ast.IsParameter) != nil
						}
					}
				} else if location.Kind == ast.KindConditionalType {
					// A type parameter declared using 'infer T' in a conditional type is visible only in
					// the true branch of the conditional type.
					useResult = lastLocation == location.AsConditionalTypeNode().TrueType
				}
				if useResult {
					break loop
				}
				result = nil
			}
		}
		withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation)
		switch location.Kind {
		case ast.KindSourceFile:
			if !ast.IsExternalOrCommonJsModule(location.AsSourceFile()) {
				break
			}
			fallthrough
		case ast.KindModuleDeclaration:
			moduleExports := r.getSymbolOfDeclaration(location).Exports
			if ast.IsSourceFile(location) || (ast.IsModuleDeclaration(location) && location.Flags&ast.NodeFlagsAmbient != 0 && !ast.IsGlobalScopeAugmentation(location)) {
				// It's an external module. First see if the module has an export default and if the local
				// name of that export default matches.
				result = moduleExports[ast.InternalSymbolNameDefault]
				if result != nil {
					localSymbol := getLocalSymbolForExportDefault(result)
					if localSymbol != nil && result.Flags&meaning != 0 && localSymbol.Name == name {
						break loop
					}
					result = nil
				}
				// Because of module/namespace merging, a module's exports are in scope,
				// yet we never want to treat an export specifier as putting a member in scope.
				// Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
				// Two things to note about this:
				//     1. We have to check this without calling getSymbol. The problem with calling getSymbol
				//        on an export specifier is that it might find the export specifier itself, and try to
				//        resolve it as an alias. This will cause the checker to consider the export specifier
				//        a circular alias reference when it might not be.
				//     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
				//        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
				//        which is not the desired behavior.
				moduleExport := moduleExports[name]
				if moduleExport != nil && moduleExport.Flags == ast.SymbolFlagsAlias && (ast.GetDeclarationOfKind(moduleExport, ast.KindExportSpecifier) != nil || ast.GetDeclarationOfKind(moduleExport, ast.KindNamespaceExport) != nil) {
					break
				}
			}
			if name != ast.InternalSymbolNameDefault {
				result = r.lookup(moduleExports, name, meaning&ast.SymbolFlagsModuleMember)
				if result != nil {
					break loop
				}
			}
		case ast.KindEnumDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).Exports, name, meaning&ast.SymbolFlagsEnumMember)
			if result != nil {
				if nameNotFoundMessage != nil && r.CompilerOptions.GetIsolatedModules() && location.Flags&ast.NodeFlagsAmbient == 0 && ast.GetSourceFileOfNode(location) != ast.GetSourceFileOfNode(result.ValueDeclaration) {
					isolatedModulesLikeFlagName := core.IfElse(r.CompilerOptions.VerbatimModuleSyntax == core.TSTrue, "verbatimModuleSyntax", "isolatedModules")
					r.error(originalLocation, diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead,
						name, isolatedModulesLikeFlagName, r.getSymbolOfDeclaration(location).Name+"."+name)
				}
				break loop
			}
		case ast.KindPropertyDeclaration:
			if !ast.IsStatic(location) {
				ctor := ast.FindConstructorDeclaration(location.Parent)
				if ctor != nil && ctor.Locals() != nil {
					if r.lookup(ctor.Locals(), name, meaning&ast.SymbolFlagsValue) != nil {
						// Remember the property node, it will be used later to report appropriate error
						propertyWithInvalidInitializer = location
					}
				}
			}
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration:
			result = r.lookup(r.getSymbolOfDeclaration(location).Members, name, meaning&ast.SymbolFlagsType)
			if result != nil {
				if !isTypeParameterSymbolDeclaredInContainer(result, location) {
					// ignore type parameters not declared in this container
					result = nil
					break
				}
				if lastLocation != nil && ast.IsStatic(lastLocation) {
					// TypeScript 1.0 spec (April 2014): 3.4.1
					// The scope of a type parameter extends over the entire declaration with which the type
					// parameter list is associated, with the exception of static member declarations in classes.
					if nameNotFoundMessage != nil {
						r.error(originalLocation, diagnostics.Static_members_cannot_reference_class_type_parameters)
					}
					return nil
				}
				break loop
			}
			if ast.IsClassExpression(location) && meaning&ast.SymbolFlagsClass != 0 {
				className := location.Name()
				if className != nil && name == className.Text() {
					result = location.Symbol()
					break loop
				}
			}
		case ast.KindExpressionWithTypeArguments:
			if lastLocation == location.AsExpressionWithTypeArguments().Expression && ast.IsHeritageClause(location.Parent) && location.Parent.AsHeritageClause().Token == ast.KindExtendsKeyword {
				container := location.Parent.Parent
				if ast.IsClassLike(container) {
					result = r.lookup(r.getSymbolOfDeclaration(container).Members, name, meaning&ast.SymbolFlagsType)
					if result != nil {
						if nameNotFoundMessage != nil {
							r.error(originalLocation, diagnostics.Base_class_expressions_cannot_reference_class_type_parameters)
						}
						return nil
					}
				}
			}
		// It is not legal to reference a class's own type parameters from a computed property name that
		// belongs to the class. For example:
		//
		//   function foo<T>() { return '' }
		//   class C<T> { // <-- Class's own type parameter T
		//       [foo<T>()]() { } // <-- Reference to T from class's own computed property
		//   }
		case ast.KindComputedPropertyName:
			grandparent = location.Parent.Parent
			if ast.IsClassLike(grandparent) || ast.IsInterfaceDeclaration(grandparent) {
				// A reference to this grandparent's type parameters would be an error
				result = r.lookup(r.getSymbolOfDeclaration(grandparent).Members, name, meaning&ast.SymbolFlagsType)
				if result != nil {
					if nameNotFoundMessage != nil {
						r.error(originalLocation, diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type)
					}
					return nil
				}
			}
		case ast.KindArrowFunction:
			// when targeting ES6 or higher there is no 'arguments' in an arrow function
			// for lower compile targets the resolved symbol is used to emit an error
			if r.CompilerOptions.GetEmitScriptTarget() >= core.ScriptTargetES2015 {
				break
			}
			fallthrough
		case ast.KindMethodDeclaration, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindFunctionDeclaration:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol()
				break loop
			}
		case ast.KindFunctionExpression:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol()
				break loop
			}
			if meaning&ast.SymbolFlagsFunction != 0 {
				functionName := location.AsFunctionExpression().Name()
				if functionName != nil && name == functionName.AsIdentifier().Text {
					result = location.AsFunctionExpression().Symbol
					break loop
				}
			}
		case ast.KindDecorator:
			// Decorators are resolved at the class declaration. Resolving at the parameter
			// or member would result in looking up locals in the method.
			//
			//   function y() {}
			//   class C {
			//       method(@y x, y) {} // <-- decorator y should be resolved at the class declaration, not the parameter.
			//   }
			//
			if location.Parent != nil && location.Parent.Kind == ast.KindParameter {
				location = location.Parent
			}
			//   function y() {}
			//   class C {
			//       @y method(x, y) {} // <-- decorator y should be resolved at the class declaration, not the method.
			//   }
			//
			// class Decorators are resolved outside of the class to avoid referencing type parameters of that class.
			//
			//   type T = number;
			//   declare function y(x: T): any;
			//   @param(1 as T) // <-- T should resolve to the type alias outside of class C
			//   class C<T> {}
			if location.Parent != nil && (ast.IsClassElement(location.Parent) || location.Parent.Kind == ast.KindClassDeclaration) {
				location = location.Parent
			}
		case ast.KindParameter:
			parameterDeclaration := location.AsParameterDeclaration()
			if lastLocation != nil && (lastLocation == parameterDeclaration.Initializer ||
				lastLocation == parameterDeclaration.Name() && ast.IsBindingPattern(lastLocation)) {
				if associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case ast.KindBindingElement:
			bindingElement := location.AsBindingElement()
			if lastLocation != nil && (lastLocation == bindingElement.Initializer ||
				lastLocation == bindingElement.Name() && ast.IsBindingPattern(lastLocation)) {
				if ast.IsPartOfParameterDeclaration(location) && associatedDeclarationForContainingInitializerOrBindingName == nil {
					associatedDeclarationForContainingInitializerOrBindingName = location
				}
			}
		case ast.KindInferType:
			if meaning&ast.SymbolFlagsTypeParameter != 0 {
				parameterName := location.AsInferTypeNode().TypeParameter.AsTypeParameter().Name()
				if parameterName != nil && name == parameterName.AsIdentifier().Text {
					result = location.AsInferTypeNode().TypeParameter.AsTypeParameter().Symbol
					break loop
				}
			}
		case ast.KindExportSpecifier:
			exportSpecifier := location.AsExportSpecifier()
			if lastLocation != nil && lastLocation == exportSpecifier.PropertyName && location.Parent.Parent.AsExportDeclaration().ModuleSpecifier != nil {
				location = location.Parent.Parent.Parent
			}
		}
		if isSelfReferenceLocation(location, lastLocation) {
			lastSelfReferenceLocation = location
		}
		lastLocation = location
		switch {
		// case isJSDocTemplateTag(location):
		// 	location = getEffectiveContainerForJSDocTemplateTag(location.(*JSDocTemplateTag))
		// 	if location == nil {
		// 		location = location.parent
		// 	}
		// case isJSDocParameterTag(location) || isJSDocReturnTag(location):
		// 	location = getHostSignatureFromJSDoc(location)
		// 	if location == nil {
		// 		location = location.parent
		// 	}
		default:
			location = location.Parent
		}
	}
	// We just climbed up parents looking for the name, meaning that we started in a descendant node of `lastLocation`.
	// If `result === lastSelfReferenceLocation.symbol`, that means that we are somewhere inside `lastSelfReferenceLocation` looking up a name, and resolving to `lastLocation` itself.
	// That means that this is a self-reference of `lastLocation`, and shouldn't count this when considering whether `lastLocation` is used.
	if isUse && result != nil && (lastSelfReferenceLocation == nil || result != lastSelfReferenceLocation.Symbol()) {
		if r.SymbolReferenced != nil {
			r.SymbolReferenced(result, meaning)
		}
	}
	if result == nil {
		if !excludeGlobals {
			result = r.lookup(r.Globals, name, meaning|ast.SymbolFlagsGlobalLookup)
		}
	}
	if nameNotFoundMessage != nil {
		if propertyWithInvalidInitializer != nil && r.OnPropertyWithInvalidInitializer != nil && r.OnPropertyWithInvalidInitializer(originalLocation, name, propertyWithInvalidInitializer, result) {
			return nil
		}
		if result == nil {
			if r.OnFailedToResolveSymbol != nil {
				r.OnFailedToResolveSymbol(originalLocation, name, meaning, nameNotFoundMessage)
			}
		} else {
			if r.OnSuccessfullyResolvedSymbol != nil {
				r.OnSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext)
			}
		}
	}
	return result
}

func (r *NameResolver) useOuterVariableScopeInParameter(result *ast.Symbol, location *ast.Node, lastLocation *ast.Node) bool {
	if ast.IsParameter(lastLocation) {
		body := location.Body()
		if body != nil && result.ValueDeclaration != nil && result.ValueDeclaration.Pos() >= body.Pos() && result.ValueDeclaration.End() <= body.End() {
			// check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
			// - static field in a class expression
			// - optional chaining pre-es2020
			// - nullish coalesce pre-es2020
			// - spread assignment in binding pattern pre-es2017
			target := r.CompilerOptions.GetEmitScriptTarget()
			if target >= core.ScriptTargetES2015 {
				functionLocation := location
				declarationRequiresScopeChange := core.TSUnknown
				if r.GetRequiresScopeChangeCache != nil {
					declarationRequiresScopeChange = r.GetRequiresScopeChangeCache(functionLocation)
				}
				if declarationRequiresScopeChange == core.TSUnknown {
					declarationRequiresScopeChange = core.IfElse(core.Some(functionLocation.Parameters(), r.requiresScopeChange), core.TSTrue, core.TSFalse)
					if r.SetRequiresScopeChangeCache != nil {
						r.SetRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange)
					}
				}
				return declarationRequiresScopeChange != core.TSTrue
			}
		}
	}
	return false
}

func (r *NameResolver) requiresScopeChange(node *ast.Node) bool {
	d := node.AsParameterDeclaration()
	return r.requiresScopeChangeWorker(d.Name()) || d.Initializer != nil && r.requiresScopeChangeWorker(d.Initializer)
}

func (r *NameResolver) requiresScopeChangeWorker(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindFunctionExpression, ast.KindFunctionDeclaration, ast.KindConstructor:
		return false
	case ast.KindMethodDeclaration, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindPropertyAssignment:
		return r.requiresScopeChangeWorker(node.Name())
	case ast.KindPropertyDeclaration:
		if ast.HasStaticModifier(node) {
			return !r.CompilerOptions.GetEmitStandardClassFields()
		}
		return r.requiresScopeChangeWorker(node.AsPropertyDeclaration().Name())
	default:
		if ast.IsNullishCoalesce(node) || ast.IsOptionalChain(node) {
			return r.CompilerOptions.GetEmitScriptTarget() < core.ScriptTargetES2020
		}
		if ast.IsBindingElement(node) && node.AsBindingElement().DotDotDotToken != nil && ast.IsObjectBindingPattern(node.Parent) {
			return r.CompilerOptions.GetEmitScriptTarget() < core.ScriptTargetES2017
		}
		if ast.IsTypeNode(node) {
			return false
		}
		return node.ForEachChild(r.requiresScopeChangeWorker)
	}
}

func (r *NameResolver) error(location *ast.Node, message *diagnostics.Message, args ...any) {
	if r.Error != nil {
		r.Error(location, message, args...)
	}
	// Default implementation does not report errors
}

func (r *NameResolver) getSymbolOfDeclaration(node *ast.Node) *ast.Symbol {
	if r.GetSymbolOfDeclaration != nil {
		return r.GetSymbolOfDeclaration(node)
	}

	// Default implementation does not support merged symbols
	return node.Symbol()
}

func (r *NameResolver) lookup(symbols ast.SymbolTable, name string, meaning ast.SymbolFlags) *ast.Symbol {
	if r.Lookup != nil {
		return r.Lookup(symbols, name, meaning)
	}
	// Default implementation does not support following aliases or merged symbols
	if meaning != 0 {
		symbol := symbols[name]
		if symbol != nil {
			if symbol.Flags&meaning != 0 {
				return symbol
			}
		}
	}
	return nil
}

func (r *NameResolver) argumentsSymbol() *ast.Symbol {
	if r.ArgumentsSymbol == nil {
		// Default implementation synthesizes a transient symbol for `arguments`
		r.ArgumentsSymbol = &ast.Symbol{Name: "arguments", Flags: ast.SymbolFlagsProperty | ast.SymbolFlagsTransient}
	}
	return r.ArgumentsSymbol
}

func isModuleOrEnumDeclaration(node *ast.Node) bool {
	return node.Kind == ast.KindModuleDeclaration || node.Kind == ast.KindEnumDeclaration
}

func getLocalSymbolForExportDefault(symbol *ast.Symbol) *ast.Symbol {
	if !isExportDefaultSymbol(symbol) || len(symbol.Declarations) == 0 {
		return nil
	}
	for _, decl := range symbol.Declarations {
		localSymbol := decl.LocalSymbol()
		if localSymbol != nil {
			return localSymbol
		}
	}
	return nil
}

func isExportDefaultSymbol(symbol *ast.Symbol) bool {
	return symbol != nil && len(symbol.Declarations) > 0 && ast.HasSyntacticModifier(symbol.Declarations[0], ast.ModifierFlagsDefault)
}

func getIsDeferredContext(location *ast.Node, lastLocation *ast.Node) bool {
	if location.Kind != ast.KindArrowFunction && location.Kind != ast.KindFunctionExpression {
		// initializers in instance property declaration of class like entities are executed in constructor and thus deferred
		// A name is evaluated within the enclosing scope - so it shouldn't count as deferred
		return ast.IsTypeQueryNode(location) ||
			(ast.IsFunctionLikeDeclaration(location) || location.Kind == ast.KindPropertyDeclaration && !ast.IsStatic(location)) &&
				(lastLocation == nil || lastLocation != location.Name())
	}
	if lastLocation != nil && lastLocation == location.Name() {
		return false
	}
	// generator functions and async functions are not inlined in control flow when immediately invoked
	if location.BodyData().AsteriskToken != nil || ast.HasSyntacticModifier(location, ast.ModifierFlagsAsync) {
		return true
	}
	return ast.GetImmediatelyInvokedFunctionExpression(location) == nil
}

func isTypeParameterSymbolDeclaredInContainer(symbol *ast.Symbol, container *ast.Node) bool {
	for _, decl := range symbol.Declarations {
		if decl.Kind == ast.KindTypeParameter {
			parent := decl.Parent
			if parent == container {
				return true
			}
		}
	}
	return false
}

func isSelfReferenceLocation(node *ast.Node, lastLocation *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter:
		return lastLocation != nil && lastLocation == node.Name()
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration,
		ast.KindTypeAliasDeclaration, ast.KindModuleDeclaration: // For `namespace N { N; }`
		return true
	}
	return false
}
