package checker

import (
	"cmp"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/tspath"
)

// Links store

type LinkStore[K comparable, V any] struct {
	entries map[K]*V
	pool    core.Pool[V]
}

func (s *LinkStore[K, V]) get(key K) *V {
	value := s.entries[key]
	if value != nil {
		return value
	}
	if s.entries == nil {
		s.entries = make(map[K]*V)
	}
	value = s.pool.New()
	s.entries[key] = value
	return value
}

func (s *LinkStore[K, V]) has(key K) bool {
	_, ok := s.entries[key]
	return ok
}

func NewDiagnosticForNode(node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	var file *ast.SourceFile
	var loc core.TextRange
	if node != nil {
		file = ast.GetSourceFileOfNode(node)
		loc = binder.GetErrorRangeForNode(file, node)
	}
	return ast.NewDiagnostic(file, loc, message, args...)
}

func NewDiagnosticChainForNode(chain *ast.Diagnostic, node *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic {
	if chain != nil {
		return ast.NewDiagnosticChain(chain, message, args...)
	}
	return NewDiagnosticForNode(node, message, args...)
}

func isIntrinsicJsxName(name string) bool {
	if len(name) == 0 {
		return false
	}

	ch := name[0]
	return (ch >= 'a' && ch <= 'z') || strings.ContainsRune(name, '-')
}

func findInMap[K comparable, V any](m map[K]V, predicate func(V) bool) V {
	for _, value := range m {
		if predicate(value) {
			return value
		}
	}
	return *new(V)
}

func boolToTristate(b bool) core.Tristate {
	if b {
		return core.TSTrue
	}
	return core.TSFalse
}

func isCompoundAssignment(token ast.Kind) bool {
	return token >= ast.KindFirstCompoundAssignment && token <= ast.KindLastCompoundAssignment
}

func tokenIsIdentifierOrKeyword(token ast.Kind) bool {
	return token >= ast.KindIdentifier
}

func tokenIsIdentifierOrKeywordOrGreaterThan(token ast.Kind) bool {
	return token == ast.KindGreaterThanToken || tokenIsIdentifierOrKeyword(token)
}

func isCommonJSContainingModuleKind(kind core.ModuleKind) bool {
	return kind == core.ModuleKindCommonJS || kind == core.ModuleKindNode16 || kind == core.ModuleKindNodeNext
}

/** @internal */
func isEffectiveExternalModule(node *ast.SourceFile, compilerOptions *core.CompilerOptions) bool {
	return ast.IsExternalModule(node) || (isCommonJSContainingModuleKind(compilerOptions.GetEmitModuleKind()) && node.CommonJsModuleIndicator != nil)
}

func hasOverrideModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsOverride)
}

func hasAbstractModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAbstract)
}

func hasAmbientModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAmbient)
}

func hasAsyncModifier(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync)
}

func hasDecorators(node *ast.Node) bool {
	return ast.HasSyntacticModifier(node, ast.ModifierFlagsDecorator)
}

func getEffectiveModifierFlags(node *ast.Node) ast.ModifierFlags {
	return node.ModifierFlags() // !!! Handle JSDoc
}

func getSelectedEffectiveModifierFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags {
	return getEffectiveModifierFlags(node) & flags
}

func hasEffectiveModifier(node *ast.Node, flags ast.ModifierFlags) bool {
	return getEffectiveModifierFlags(node)&flags != 0
}

func hasEffectiveReadonlyModifier(node *ast.Node) bool {
	return hasEffectiveModifier(node, ast.ModifierFlagsReadonly)
}

func isBindingElementOfBareOrAccessedRequire(node *ast.Node) bool {
	return ast.IsBindingElement(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(node.Parent.Parent)
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 */
func isVariableDeclarationInitializedToBareOrAccessedRequire(node *ast.Node) bool {
	return isVariableDeclarationInitializedWithRequireHelper(node, true /*allowAccessedRequire*/)
}

func isVariableDeclarationInitializedWithRequireHelper(node *ast.Node, allowAccessedRequire bool) bool {
	if node.Kind == ast.KindVariableDeclaration && node.AsVariableDeclaration().Initializer != nil {
		initializer := node.AsVariableDeclaration().Initializer
		if allowAccessedRequire {
			initializer = getLeftmostAccessExpression(initializer)
		}
		return isRequireCall(initializer, true /*requireStringLiteralLikeArgument*/)
	}
	return false
}

func getLeftmostAccessExpression(expr *ast.Node) *ast.Node {
	for ast.IsAccessExpression(expr) {
		expr = expr.Expression()
	}
	return expr
}

func isRequireCall(node *ast.Node, requireStringLiteralLikeArgument bool) bool {
	if ast.IsCallExpression(node) {
		callExpression := node.AsCallExpression()
		if len(callExpression.Arguments.Nodes) == 1 {
			if ast.IsIdentifier(callExpression.Expression) && callExpression.Expression.AsIdentifier().Text == "require" {
				return !requireStringLiteralLikeArgument || ast.IsStringLiteralLike(callExpression.Arguments.Nodes[0])
			}
		}
	}
	return false
}

func isStaticPrivateIdentifierProperty(s *ast.Symbol) bool {
	return s.ValueDeclaration != nil && ast.IsPrivateIdentifierClassElementDeclaration(s.ValueDeclaration) && ast.IsStatic(s.ValueDeclaration)
}

func isEmptyObjectLiteral(expression *ast.Node) bool {
	return expression.Kind == ast.KindObjectLiteralExpression && len(expression.AsObjectLiteralExpression().Properties.Nodes) == 0
}

type AssignmentKind int32

const (
	AssignmentKindNone AssignmentKind = iota
	AssignmentKindDefinite
	AssignmentKindCompound
)

type AssignmentTarget = ast.Node // BinaryExpression | PrefixUnaryExpression | PostfixUnaryExpression | ForInOrOfStatement

func getAssignmentTargetKind(node *ast.Node) AssignmentKind {
	target := ast.GetAssignmentTarget(node)
	if target == nil {
		return AssignmentKindNone
	}
	switch target.Kind {
	case ast.KindBinaryExpression:
		binaryOperator := target.AsBinaryExpression().OperatorToken.Kind
		if binaryOperator == ast.KindEqualsToken || ast.IsLogicalOrCoalescingAssignmentOperator(binaryOperator) {
			return AssignmentKindDefinite
		}
		return AssignmentKindCompound
	case ast.KindPrefixUnaryExpression, ast.KindPostfixUnaryExpression:
		return AssignmentKindCompound
	case ast.KindForInStatement, ast.KindForOfStatement:
		return AssignmentKindDefinite
	}
	panic("Unhandled case in getAssignmentTargetKind")
}

func isDeleteTarget(node *ast.Node) bool {
	if !ast.IsAccessExpression(node) {
		return false
	}
	node = ast.WalkUpParenthesizedExpressions(node.Parent)
	return node != nil && node.Kind == ast.KindDeleteExpression
}

func isInCompoundLikeAssignment(node *ast.Node) bool {
	target := ast.GetAssignmentTarget(node)
	return target != nil && ast.IsAssignmentExpression(target /*excludeCompoundAssignment*/, true) && isCompoundLikeAssignment(target)
}

func isCompoundLikeAssignment(assignment *ast.Node) bool {
	right := ast.SkipParentheses(assignment.AsBinaryExpression().Right)
	return right.Kind == ast.KindBinaryExpression && isShiftOperatorOrHigher(right.AsBinaryExpression().OperatorToken.Kind)
}

func getAssertedTypeNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindAsExpression:
		return node.AsAsExpression().Type
	case ast.KindSatisfiesExpression:
		return node.AsSatisfiesExpression().Type
	case ast.KindTypeAssertionExpression:
		return node.AsTypeAssertion().Type
	}
	panic("Unhandled case in getAssertedTypeNode")
}

func isConstAssertion(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindAsExpression, ast.KindTypeAssertionExpression:
		return isConstTypeReference(getAssertedTypeNode(node))
	}
	return false
}

func isConstTypeReference(node *ast.Node) bool {
	return ast.IsTypeReferenceNode(node) && len(node.TypeArguments()) == 0 && ast.IsIdentifier(node.AsTypeReferenceNode().TypeName) && node.AsTypeReferenceNode().TypeName.Text() == "const"
}

func isModuleOrEnumDeclaration(node *ast.Node) bool {
	return node.Kind == ast.KindModuleDeclaration || node.Kind == ast.KindEnumDeclaration
}

func isGlobalSourceFile(node *ast.Node) bool {
	return node.Kind == ast.KindSourceFile && !ast.IsExternalOrCommonJsModule(node.AsSourceFile())
}

func isParameterLikeOrReturnTag(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter, ast.KindTypeParameter, ast.KindJSDocParameterTag, ast.KindJSDocReturnTag:
		return true
	}
	return false
}

func getEmitStandardClassFields(options *core.CompilerOptions) bool {
	return options.UseDefineForClassFields != core.TSFalse && options.GetEmitScriptTarget() >= core.ScriptTargetES2022
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

func getDeclarationOfKind(symbol *ast.Symbol, kind ast.Kind) *ast.Node {
	for _, declaration := range symbol.Declarations {
		if declaration.Kind == kind {
			return declaration
		}
	}
	return nil
}

func getIsolatedModules(options *core.CompilerOptions) bool {
	return options.IsolatedModules == core.TSTrue || options.VerbatimModuleSyntax == core.TSTrue
}

func findConstructorDeclaration(node *ast.Node) *ast.Node {
	for _, member := range node.ClassLikeData().Members.Nodes {
		if ast.IsConstructorDeclaration(member) && ast.NodeIsPresent(member.AsConstructorDeclaration().Body) {
			return member
		}
	}
	return nil
}

func getSingleVariableOfVariableStatement(node *ast.Node) *ast.Node {
	if !ast.IsVariableStatement(node) {
		return nil
	}
	return core.FirstOrNil(node.AsVariableStatement().DeclarationList.AsVariableDeclarationList().Declarations.Nodes)
}

type NameResolver struct {
	compilerOptions                  *core.CompilerOptions
	getSymbolOfDeclaration           func(node *ast.Node) *ast.Symbol
	error                            func(location *ast.Node, message *diagnostics.Message, args ...any) *ast.Diagnostic
	globals                          ast.SymbolTable
	argumentsSymbol                  *ast.Symbol
	requireSymbol                    *ast.Symbol
	lookup                           func(symbols ast.SymbolTable, name string, meaning ast.SymbolFlags) *ast.Symbol
	symbolReferenced                 func(symbol *ast.Symbol, meaning ast.SymbolFlags)
	setRequiresScopeChangeCache      func(node *ast.Node, value core.Tristate)
	getRequiresScopeChangeCache      func(node *ast.Node) core.Tristate
	onPropertyWithInvalidInitializer func(location *ast.Node, name string, declaration *ast.Node, result *ast.Symbol) bool
	onFailedToResolveSymbol          func(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message)
	onSuccessfullyResolvedSymbol     func(location *ast.Node, result *ast.Symbol, meaning ast.SymbolFlags, lastLocation *ast.Node, associatedDeclarationForContainingInitializerOrBindingName *ast.Node, withinDeferredContext bool)
}

func (r *NameResolver) resolve(location *ast.Node, name string, meaning ast.SymbolFlags, nameNotFoundMessage *diagnostics.Message, isUse bool, excludeGlobals bool) *ast.Symbol {
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
		if nameIsConst && isConstAssertion(location) {
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
		if locals != nil && !isGlobalSourceFile(location) {
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
							isParameterLikeOrReturnTag(lastLocation))
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
				if moduleExport != nil && moduleExport.Flags == ast.SymbolFlagsAlias && (getDeclarationOfKind(moduleExport, ast.KindExportSpecifier) != nil || getDeclarationOfKind(moduleExport, ast.KindNamespaceExport) != nil) {
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
				if nameNotFoundMessage != nil && getIsolatedModules(r.compilerOptions) && location.Flags&ast.NodeFlagsAmbient == 0 && ast.GetSourceFileOfNode(location) != ast.GetSourceFileOfNode(result.ValueDeclaration) {
					isolatedModulesLikeFlagName := core.IfElse(r.compilerOptions.VerbatimModuleSyntax == core.TSTrue, "verbatimModuleSyntax", "isolatedModules")
					r.error(originalLocation, diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead,
						name, isolatedModulesLikeFlagName, r.getSymbolOfDeclaration(location).Name+"."+name)
				}
				break loop
			}
		case ast.KindPropertyDeclaration:
			if !ast.IsStatic(location) {
				ctor := findConstructorDeclaration(location.Parent)
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
			if r.compilerOptions.GetEmitScriptTarget() >= core.ScriptTargetES2015 {
				break
			}
			fallthrough
		case ast.KindMethodDeclaration, ast.KindConstructor, ast.KindGetAccessor, ast.KindSetAccessor, ast.KindFunctionDeclaration:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
				break loop
			}
		case ast.KindFunctionExpression:
			if meaning&ast.SymbolFlagsVariable != 0 && name == "arguments" {
				result = r.argumentsSymbol
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
		r.symbolReferenced(result, meaning)
	}
	if result == nil {
		if !excludeGlobals {
			result = r.lookup(r.globals, name, meaning)
		}
	}
	if nameNotFoundMessage != nil {
		if propertyWithInvalidInitializer != nil && r.onPropertyWithInvalidInitializer(originalLocation, name, propertyWithInvalidInitializer, result) {
			return nil
		}
		if result == nil {
			r.onFailedToResolveSymbol(originalLocation, name, meaning, nameNotFoundMessage)
		} else {
			r.onSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext)
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
			target := r.compilerOptions.GetEmitScriptTarget()
			if target >= core.ScriptTargetES2015 {
				functionLocation := location
				declarationRequiresScopeChange := r.getRequiresScopeChangeCache(functionLocation)
				if declarationRequiresScopeChange == core.TSUnknown {
					declarationRequiresScopeChange = boolToTristate(core.Some(functionLocation.Parameters(), r.requiresScopeChange))
					r.setRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange)
				}
				return declarationRequiresScopeChange == core.TSTrue
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
			return !getEmitStandardClassFields(r.compilerOptions)
		}
		return r.requiresScopeChangeWorker(node.AsPropertyDeclaration().Name())
	default:
		if ast.IsNullishCoalesce(node) || ast.IsOptionalChain(node) {
			return r.compilerOptions.GetEmitScriptTarget() < core.ScriptTargetES2020
		}
		if ast.IsBindingElement(node) && node.AsBindingElement().DotDotDotToken != nil && ast.IsObjectBindingPattern(node.Parent) {
			return r.compilerOptions.GetEmitScriptTarget() < core.ScriptTargetES2017
		}
		if ast.IsTypeNode(node) {
			return false
		}
		return node.ForEachChild(r.requiresScopeChangeWorker)
	}
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
		return lastLocation != nil && lastLocation == node.AsParameterDeclaration().Name()
	case ast.KindFunctionDeclaration, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration,
		ast.KindTypeAliasDeclaration, ast.KindModuleDeclaration: // For `namespace N { N; }`
		return true
	}
	return false
}

func isTypeReferenceIdentifier(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindQualifiedName {
		node = node.Parent
	}
	return ast.IsTypeReferenceNode(node.Parent)
}

func isInTypeQuery(node *ast.Node) bool {
	// TypeScript 1.0 spec (April 2014): 3.6.3
	// A type query consists of the keyword typeof followed by an expression.
	// The expression is restricted to a single identifier or a sequence of identifiers separated by periods
	return ast.FindAncestorOrQuit(node, func(n *ast.Node) ast.FindAncestorResult {
		switch n.Kind {
		case ast.KindTypeQuery:
			return ast.FindAncestorTrue
		case ast.KindIdentifier, ast.KindQualifiedName:
			return ast.FindAncestorFalse
		}
		return ast.FindAncestorQuit
	}) != nil
}

func isTypeOnlyImportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().IsTypeOnly || node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindNamespaceImport:
		return node.Parent.AsImportClause().IsTypeOnly
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyExportDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindExportSpecifier:
		return node.AsExportSpecifier().IsTypeOnly || node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	case ast.KindExportDeclaration:
		d := node.AsExportDeclaration()
		return d.IsTypeOnly && d.ModuleSpecifier != nil && d.ExportClause == nil
	case ast.KindNamespaceExport:
		return node.Parent.AsExportDeclaration().IsTypeOnly
	}
	return false
}

func isTypeOnlyImportOrExportDeclaration(node *ast.Node) bool {
	return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node)
}

func getNameFromImportDeclaration(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportSpecifier:
		return node.AsImportSpecifier().Name()
	case ast.KindNamespaceImport:
		return node.AsNamespaceImport().Name()
	case ast.KindImportClause:
		return node.AsImportClause().Name()
	case ast.KindImportEqualsDeclaration:
		return node.AsImportEqualsDeclaration().Name()
	}
	return nil
}

func isValidTypeOnlyAliasUseSite(useSite *ast.Node) bool {
	return useSite.Flags&ast.NodeFlagsAmbient != 0 ||
		ast.IsPartOfTypeQuery(useSite) ||
		isIdentifierInNonEmittingHeritageClause(useSite) ||
		isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite) ||
		!(ast.IsExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite))
}

func isIdentifierInNonEmittingHeritageClause(node *ast.Node) bool {
	if !ast.IsIdentifier(node) {
		return false
	}
	parent := node.Parent
	for ast.IsPropertyAccessExpression(parent) || ast.IsExpressionWithTypeArguments(parent) {
		parent = parent.Parent
	}
	return ast.IsHeritageClause(parent) && (parent.AsHeritageClause().Token == ast.KindImplementsKeyword || ast.IsInterfaceDeclaration(parent.Parent))
}

func isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node *ast.Node) bool {
	for ast.NodeKindIs(node, ast.KindIdentifier, ast.KindPropertyAccessExpression) {
		node = node.Parent
	}
	if node.Kind != ast.KindComputedPropertyName {
		return false
	}
	if ast.HasSyntacticModifier(node.Parent, ast.ModifierFlagsAbstract) {
		return true
	}
	return ast.NodeKindIs(node.Parent.Parent, ast.KindInterfaceDeclaration, ast.KindTypeLiteral)
}

func nodeCanBeDecorated(useLegacyDecorators bool, node *ast.Node, parent *ast.Node, grandparent *ast.Node) bool {
	// private names cannot be used with decorators yet
	if useLegacyDecorators && node.Name() != nil && ast.IsPrivateIdentifier(node.Name()) {
		return false
	}

	switch node.Kind {
	case ast.KindClassDeclaration:
		// class declarations are valid targets
		return true
	case ast.KindClassExpression:
		// class expressions are valid targets for native decorators
		return !useLegacyDecorators
	case ast.KindPropertyDeclaration:
		// property declarations are valid if their parent is a class declaration.
		return parent != nil && (ast.IsClassDeclaration(parent) || !useLegacyDecorators && ast.IsClassExpression(parent) && !hasAbstractModifier(node) && !hasAmbientModifier(node))
	case ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindMethodDeclaration:
		// if this method has a body and its parent is a class declaration, this is a valid target.
		return node.BodyData() != nil && parent != nil && (ast.IsClassDeclaration(parent) || !useLegacyDecorators && ast.IsClassExpression(parent))
	case ast.KindParameter:
		// TODO(rbuckton): Parameter decorator support for ES decorators must wait until it is standardized
		if !useLegacyDecorators {
			return false
		}
		// if the parameter's parent has a body and its grandparent is a class declaration, this is a valid target.
		return parent != nil && parent.BodyData() != nil && (parent.BodyData()).Body != nil && (parent.Kind == ast.KindConstructor || parent.Kind == ast.KindMethodDeclaration || parent.Kind == ast.KindSetAccessor) && getThisParameter(parent) != node && grandparent != nil && grandparent.Kind == ast.KindClassDeclaration
	}

	return false
}

func isShorthandPropertyNameUseSite(useSite *ast.Node) bool {
	return ast.IsIdentifier(useSite) && ast.IsShorthandPropertyAssignment(useSite.Parent) && useSite.Parent.AsShorthandPropertyAssignment().Name() == useSite
}

func isTypeDeclaration(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindTypeParameter, ast.KindClassDeclaration, ast.KindInterfaceDeclaration, ast.KindTypeAliasDeclaration, ast.KindEnumDeclaration:
		return true
	case ast.KindImportClause:
		return node.AsImportClause().IsTypeOnly
	case ast.KindImportSpecifier:
		return node.Parent.Parent.AsImportClause().IsTypeOnly
	case ast.KindExportSpecifier:
		return node.Parent.Parent.AsExportDeclaration().IsTypeOnly
	default:
		return false
	}
}

func canHaveSymbol(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBinaryExpression, ast.KindBindingElement, ast.KindCallExpression, ast.KindCallSignature,
		ast.KindClassDeclaration, ast.KindClassExpression, ast.KindClassStaticBlockDeclaration, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindElementAccessExpression, ast.KindEnumDeclaration, ast.KindEnumMember, ast.KindExportAssignment,
		ast.KindExportDeclaration, ast.KindExportSpecifier, ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindFunctionType,
		ast.KindGetAccessor, ast.KindIdentifier, ast.KindImportClause, ast.KindImportEqualsDeclaration, ast.KindImportSpecifier,
		ast.KindIndexSignature, ast.KindInterfaceDeclaration, ast.KindJSDocCallbackTag,
		ast.KindJSDocParameterTag, ast.KindJSDocPropertyTag, ast.KindJSDocSignature, ast.KindJSDocTypedefTag, ast.KindJSDocTypeLiteral,
		ast.KindJsxAttribute, ast.KindJsxAttributes, ast.KindJsxSpreadAttribute, ast.KindMappedType, ast.KindMethodDeclaration,
		ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindNamedTupleMember, ast.KindNamespaceExport, ast.KindNamespaceExportDeclaration,
		ast.KindNamespaceImport, ast.KindNewExpression, ast.KindNoSubstitutionTemplateLiteral, ast.KindNumericLiteral, ast.KindObjectLiteralExpression,
		ast.KindParameter, ast.KindPropertyAccessExpression, ast.KindPropertyAssignment, ast.KindPropertyDeclaration, ast.KindPropertySignature,
		ast.KindSetAccessor, ast.KindShorthandPropertyAssignment, ast.KindSourceFile, ast.KindSpreadAssignment, ast.KindStringLiteral,
		ast.KindTypeAliasDeclaration, ast.KindTypeLiteral, ast.KindTypeParameter, ast.KindVariableDeclaration:
		return true
	}
	return false
}

func canHaveLocals(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindArrowFunction, ast.KindBlock, ast.KindCallSignature, ast.KindCaseBlock, ast.KindCatchClause,
		ast.KindClassStaticBlockDeclaration, ast.KindConditionalType, ast.KindConstructor, ast.KindConstructorType,
		ast.KindConstructSignature, ast.KindForStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindFunctionDeclaration,
		ast.KindFunctionExpression, ast.KindFunctionType, ast.KindGetAccessor, ast.KindIndexSignature, ast.KindJSDocCallbackTag,
		ast.KindJSDocSignature, ast.KindJSDocTypedefTag, ast.KindMappedType,
		ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindModuleDeclaration, ast.KindSetAccessor, ast.KindSourceFile,
		ast.KindTypeAliasDeclaration:
		return true
	}
	return false
}

func isShorthandAmbientModuleSymbol(moduleSymbol *ast.Symbol) bool {
	return isShorthandAmbientModule(moduleSymbol.ValueDeclaration)
}

func isShorthandAmbientModule(node *ast.Node) bool {
	// The only kind of module that can be missing a body is a shorthand ambient module.
	return node != nil && node.Kind == ast.KindModuleDeclaration && node.AsModuleDeclaration().Body == nil
}

func getFirstIdentifier(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindIdentifier:
		return node
	case ast.KindQualifiedName:
		return getFirstIdentifier(node.AsQualifiedName().Left)
	case ast.KindPropertyAccessExpression:
		return getFirstIdentifier(node.AsPropertyAccessExpression().Expression)
	}
	panic("Unhandled case in getFirstIdentifier")
}

func getAliasDeclarationFromName(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportClause, ast.KindImportSpecifier, ast.KindNamespaceImport, ast.KindExportSpecifier, ast.KindExportAssignment,
		ast.KindImportEqualsDeclaration, ast.KindNamespaceExport:
		return node.Parent
	case ast.KindQualifiedName:
		return getAliasDeclarationFromName(node.Parent)
	}
	return nil
}

func entityNameToString(name *ast.Node) string {
	switch name.Kind {
	case ast.KindThisKeyword:
		return "this"
	case ast.KindIdentifier, ast.KindPrivateIdentifier:
		return scanner.GetTextOfNode(name)
	case ast.KindQualifiedName:
		return entityNameToString(name.AsQualifiedName().Left) + "." + entityNameToString(name.AsQualifiedName().Right)
	case ast.KindPropertyAccessExpression:
		return entityNameToString(name.AsPropertyAccessExpression().Expression) + "." + entityNameToString(name.AsPropertyAccessExpression().Name())
	case ast.KindJsxNamespacedName:
		return entityNameToString(name.AsJsxNamespacedName().Namespace) + ":" + entityNameToString(name.AsJsxNamespacedName().Name())
	}
	panic("Unhandled case in entityNameToString")
}

func getContainingQualifiedNameNode(node *ast.Node) *ast.Node {
	for ast.IsQualifiedName(node.Parent) {
		node = node.Parent
	}
	return node
}

func isSideEffectImport(node *ast.Node) bool {
	ancestor := ast.FindAncestor(node, ast.IsImportDeclaration)
	return ancestor != nil && ancestor.AsImportDeclaration().ImportClause == nil
}

func getExternalModuleRequireArgument(node *ast.Node) *ast.Node {
	if isVariableDeclarationInitializedToBareOrAccessedRequire(node) {
		return getLeftmostAccessExpression(node.AsVariableDeclaration().Initializer).AsCallExpression().Arguments.Nodes[0]
	}
	return nil
}

func getExternalModuleImportEqualsDeclarationExpression(node *ast.Node) *ast.Node {
	// Debug.assert(isExternalModuleImportEqualsDeclaration(node))
	return node.AsImportEqualsDeclaration().ModuleReference.AsExternalModuleReference().Expression
}

func isRightSideOfQualifiedNameOrPropertyAccess(node *ast.Node) bool {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindQualifiedName:
		return parent.AsQualifiedName().Right == node
	case ast.KindPropertyAccessExpression:
		return parent.AsPropertyAccessExpression().Name() == node
	case ast.KindMetaProperty:
		return parent.AsMetaProperty().Name() == node
	}
	return false
}

func getNamespaceDeclarationNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindImportDeclaration:
		importClause := node.AsImportDeclaration().ImportClause
		if importClause != nil && ast.IsNamespaceImport(importClause.AsImportClause().NamedBindings) {
			return importClause.AsImportClause().NamedBindings
		}
	case ast.KindImportEqualsDeclaration:
		return node
	case ast.KindExportDeclaration:
		exportClause := node.AsExportDeclaration().ExportClause
		if exportClause != nil && ast.IsNamespaceExport(exportClause) {
			return exportClause
		}
	default:
		panic("Unhandled case in getNamespaceDeclarationNode")
	}
	return nil
}

func getSourceFileOfModule(module *ast.Symbol) *ast.SourceFile {
	declaration := module.ValueDeclaration
	if declaration == nil {
		declaration = getNonAugmentationDeclaration(module)
	}
	return ast.GetSourceFileOfNode(declaration)
}

func getNonAugmentationDeclaration(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, func(d *ast.Node) bool {
		return !isExternalModuleAugmentation(d) && !(ast.IsModuleDeclaration(d) && ast.IsGlobalScopeAugmentation(d))
	})
}

func isExternalModuleAugmentation(node *ast.Node) bool {
	return ast.IsAmbientModule(node) && ast.IsModuleAugmentationExternal(node)
}

func isSyntacticDefault(node *ast.Node) bool {
	return (ast.IsExportAssignment(node) && !node.AsExportAssignment().IsExportEquals) ||
		ast.HasSyntacticModifier(node, ast.ModifierFlagsDefault) ||
		ast.IsExportSpecifier(node) ||
		ast.IsNamespaceExport(node)
}

func hasExportAssignmentSymbol(moduleSymbol *ast.Symbol) bool {
	return moduleSymbol.Exports[ast.InternalSymbolNameExportEquals] != nil
}

func parsePseudoBigInt(stringValue string) string {
	return stringValue // !!!
}

func isTypeAlias(node *ast.Node) bool {
	return ast.IsTypeAliasDeclaration(node)
}

func hasOnlyExpressionInitializer(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindVariableDeclaration, ast.KindParameter, ast.KindBindingElement, ast.KindPropertyDeclaration, ast.KindPropertyAssignment, ast.KindEnumMember:
		return true
	}
	return false
}

func hasDotDotDotToken(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindParameter:
		return node.AsParameterDeclaration().DotDotDotToken != nil
	case ast.KindBindingElement:
		return node.AsBindingElement().DotDotDotToken != nil
	case ast.KindNamedTupleMember:
		return node.AsNamedTupleMember().DotDotDotToken != nil
	case ast.KindJsxExpression:
		return node.AsJsxExpression().DotDotDotToken != nil
	}
	return false
}

func isTypeAny(t *Type) bool {
	return t != nil && t.flags&TypeFlagsAny != 0
}

func isJSDocOptionalParameter(node *ast.ParameterDeclaration) bool {
	return false // !!!
}

func isExclamationToken(node *ast.Node) bool {
	return node != nil && node.Kind == ast.KindExclamationToken
}

func isOptionalDeclaration(declaration *ast.Node) bool {
	switch declaration.Kind {
	case ast.KindParameter:
		return declaration.AsParameterDeclaration().QuestionToken != nil
	case ast.KindPropertyDeclaration:
		return ast.IsQuestionToken(declaration.AsPropertyDeclaration().PostfixToken)
	case ast.KindPropertySignature:
		return ast.IsQuestionToken(declaration.AsPropertySignatureDeclaration().PostfixToken)
	case ast.KindMethodDeclaration:
		return ast.IsQuestionToken(declaration.AsMethodDeclaration().PostfixToken)
	case ast.KindMethodSignature:
		return ast.IsQuestionToken(declaration.AsMethodSignatureDeclaration().PostfixToken)
	case ast.KindPropertyAssignment:
		return ast.IsQuestionToken(declaration.AsPropertyAssignment().PostfixToken)
	case ast.KindShorthandPropertyAssignment:
		return ast.IsQuestionToken(declaration.AsShorthandPropertyAssignment().PostfixToken)
	}
	return false
}

func isEmptyArrayLiteral(expression *ast.Node) bool {
	return ast.IsArrayLiteralExpression(expression) && len(expression.AsArrayLiteralExpression().Elements.Nodes) == 0
}

func declarationBelongsToPrivateAmbientMember(declaration *ast.Node) bool {
	root := ast.GetRootDeclaration(declaration)
	memberDeclaration := root
	if root.Kind == ast.KindParameter {
		memberDeclaration = root.Parent
	}
	return isPrivateWithinAmbient(memberDeclaration)
}

func isPrivateWithinAmbient(node *ast.Node) bool {
	return (hasEffectiveModifier(node, ast.ModifierFlagsPrivate) || ast.IsPrivateIdentifierClassElementDeclaration(node)) && node.Flags&ast.NodeFlagsAmbient != 0
}

func isTypeAssertion(node *ast.Node) bool {
	return ast.IsAssertionExpression(ast.SkipParentheses(node))
}

func createSymbolTable(symbols []*ast.Symbol) ast.SymbolTable {
	if len(symbols) == 0 {
		return nil
	}
	result := make(ast.SymbolTable)
	for _, symbol := range symbols {
		result[symbol.Name] = symbol
	}
	return result
}

func (c *Checker) sortSymbols(symbols []*ast.Symbol) {
	slices.SortFunc(symbols, c.compareSymbols)
}

func (c *Checker) compareSymbolsWorker(s1, s2 *ast.Symbol) int {
	if s1 == s2 {
		return 0
	}
	if s1 == nil {
		return 1
	}
	if s2 == nil {
		return -1
	}
	if len(s1.Declarations) != 0 && len(s2.Declarations) != 0 {
		if r := c.compareNodes(s1.Declarations[0], s2.Declarations[0]); r != 0 {
			return r
		}
	} else if len(s1.Declarations) != 0 {
		return -1
	} else if len(s2.Declarations) != 0 {
		return 1
	}
	if r := strings.Compare(s1.Name, s2.Name); r != 0 {
		return r
	}
	// Fall back to symbol IDs. This is a last resort that should happen only when symbols have
	// no declaration and duplicate names.
	return int(ast.GetSymbolId(s1)) - int(ast.GetSymbolId(s2))
}

func (c *Checker) compareNodes(n1, n2 *ast.Node) int {
	if n1 == n2 {
		return 0
	}
	if n1 == nil {
		return 1
	}
	if n2 == nil {
		return -1
	}
	f1 := c.fileIndexMap[ast.GetSourceFileOfNode(n1)]
	f2 := c.fileIndexMap[ast.GetSourceFileOfNode(n2)]
	if f1 != f2 {
		// Order by index of file in the containing program
		return f1 - f2
	}
	// In the same file, order by source position
	return n1.Pos() - n2.Pos()
}

func compareTypes(t1, t2 *Type) int {
	if t1 == t2 {
		return 0
	}
	if t1 == nil {
		return -1
	}
	if t2 == nil {
		return 1
	}
	if t1.checker != t2.checker {
		panic("Cannot compare types from different checkers")
	}
	// First sort in order of increasing type flags values.
	if c := getSortOrderFlags(t1) - getSortOrderFlags(t2); c != 0 {
		return c
	}
	// Order named types by name and, in the case of aliased types, by alias type arguments.
	if c := compareTypeNames(t1, t2); c != 0 {
		return c
	}
	// We have unnamed types or types with identical names. Now sort by data specific to the type.
	switch {
	case t1.flags&(TypeFlagsAny|TypeFlagsUnknown|TypeFlagsString|TypeFlagsNumber|TypeFlagsBoolean|TypeFlagsBigInt|TypeFlagsESSymbol|TypeFlagsVoid|TypeFlagsUndefined|TypeFlagsNull|TypeFlagsNever|TypeFlagsNonPrimitive) != 0:
		// Only distinguished by type IDs, handled below.
	case t1.flags&TypeFlagsObject != 0:
		// Order unnamed or identically named object types by symbol.
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
		// When object types have the same or no symbol, order by kind. We order type references before other kinds.
		if t1.objectFlags&ObjectFlagsReference != 0 && t2.objectFlags&ObjectFlagsReference != 0 {
			r1 := t1.AsTypeReference()
			r2 := t2.AsTypeReference()
			if r1.target.objectFlags&ObjectFlagsTuple != 0 && r2.target.objectFlags&ObjectFlagsTuple != 0 {
				// Tuple types have no associated symbol, instead we order by tuple element information.
				if c := compareTupleTypes(r1.target.AsTupleType(), r2.target.AsTupleType()); c != 0 {
					return c
				}
			}
			// Here we know we have references to instantiations of the same type because we have matching targets.
			if r1.node == nil && r2.node == nil {
				// Non-deferred type references with the same target are sorted by their type argument lists.
				if c := compareTypeLists(t1.AsTypeReference().resolvedTypeArguments, t2.AsTypeReference().resolvedTypeArguments); c != 0 {
					return c
				}
			} else {
				// Deferred type references with the same target are ordered by the source location of the reference.
				if c := t1.checker.compareNodes(r1.node, r2.node); c != 0 {
					return c
				}
				// Instantiations of the same deferred type reference are ordered by their associated type mappers
				// (which reflect the mapping of in-scope type parameters to type arguments).
				if c := compareTypeMappers(t1.AsObjectType().mapper, t2.AsObjectType().mapper); c != 0 {
					return c
				}
			}
		} else if t1.objectFlags&ObjectFlagsReference != 0 {
			return -1
		} else if t2.objectFlags&ObjectFlagsReference != 0 {
			return 1
		} else {
			// Order unnamed non-reference object types by kind associated type mappers. Reverse mapped types have
			// neither symbols nor mappers so they're ultimately ordered by unstable type IDs, but given their rarity
			// this should be fine.
			if c := int(t1.objectFlags&ObjectFlagsObjectTypeKindMask) - int(t2.objectFlags&ObjectFlagsObjectTypeKindMask); c != 0 {
				return c
			}
			if c := compareTypeMappers(t1.AsObjectType().mapper, t2.AsObjectType().mapper); c != 0 {
				return c
			}
		}
	case t1.flags&TypeFlagsUnion != 0:
		// Unions are ordered by origin and then constituent type lists.
		o1 := t1.AsUnionType().origin
		o2 := t2.AsUnionType().origin
		if o1 == nil && o2 == nil {
			if c := compareTypeLists(t1.Types(), t2.Types()); c != 0 {
				return c
			}
		} else if o1 == nil {
			return 1
		} else if o2 == nil {
			return -1
		} else {
			if c := compareTypes(o1, o2); c != 0 {
				return c
			}
		}
	case t1.flags&TypeFlagsIntersection != 0:
		// Intersections are ordered by their constituent type lists.
		if c := compareTypeLists(t1.Types(), t2.Types()); c != 0 {
			return c
		}
	case t1.flags&(TypeFlagsEnumLiteral|TypeFlagsUniqueESSymbol) != 0:
		// Enum members are ordered by their symbol (and thus their declaration order).
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsStringLiteral != 0:
		// String literal types are ordered by their values.
		if c := strings.Compare(t1.AsLiteralType().value.(string), t2.AsLiteralType().value.(string)); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsNumberLiteral != 0:
		// Numeric literal types are ordered by their values.
		if c := cmp.Compare(t1.AsLiteralType().value.(jsnum.Number), t2.AsLiteralType().value.(jsnum.Number)); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsBooleanLiteral != 0:
		b1 := t1.AsLiteralType().value.(bool)
		b2 := t2.AsLiteralType().value.(bool)
		if b1 != b2 {
			if b1 {
				return 1
			}
			return -1
		}
	case t1.flags&TypeFlagsTypeParameter != 0:
		if c := t1.checker.compareSymbols(t1.symbol, t2.symbol); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsIndex != 0:
		if c := compareTypes(t1.AsIndexType().target, t2.AsIndexType().target); c != 0 {
			return c
		}
		if c := int(t1.AsIndexType().flags) - int(t2.AsIndexType().flags); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsIndexedAccess != 0:
		if c := compareTypes(t1.AsIndexedAccessType().objectType, t2.AsIndexedAccessType().objectType); c != 0 {
			return c
		}
		if c := compareTypes(t1.AsIndexedAccessType().indexType, t2.AsIndexedAccessType().indexType); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsConditional != 0:
		if c := t1.checker.compareNodes(t1.AsConditionalType().root.node.AsNode(), t2.AsConditionalType().root.node.AsNode()); c != 0 {
			return c
		}
		if c := compareTypeMappers(t1.AsConditionalType().mapper, t2.AsConditionalType().mapper); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsSubstitution != 0:
		if c := compareTypes(t1.AsSubstitutionType().baseType, t2.AsSubstitutionType().baseType); c != 0 {
			return c
		}
		if c := compareTypes(t1.AsSubstitutionType().constraint, t2.AsSubstitutionType().constraint); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsTemplateLiteral != 0:
		if c := slices.Compare(t1.AsTemplateLiteralType().texts, t2.AsTemplateLiteralType().texts); c != 0 {
			return c
		}
		if c := compareTypeLists(t1.AsTemplateLiteralType().types, t2.AsTemplateLiteralType().types); c != 0 {
			return c
		}
	case t1.flags&TypeFlagsStringMapping != 0:
		if c := compareTypes(t1.AsStringMappingType().target, t2.AsStringMappingType().target); c != 0 {
			return c
		}
	}
	// Fall back to type IDs. This results in type creation order for built-in types.
	return int(t1.id) - int(t2.id)
}

func getSortOrderFlags(t *Type) int {
	// We want enum literal and computed values to be ordered by their declarations, so we merge TypeFlagsEnum into
	// TypeFlagsEnumLiteral and clear TypeFlagsEnum.
	return int((t.flags&TypeFlagsEnum)>>1 | t.flags&^TypeFlagsEnum)
}

func compareTypeNames(t1, t2 *Type) int {
	s1 := getTypeNameSymbol(t1)
	s2 := getTypeNameSymbol(t2)
	if s1 == s2 {
		if t1.alias != nil {
			return compareTypeLists(t1.alias.typeArguments, t2.alias.typeArguments)
		}
		return 0
	}
	if s1 == nil {
		return 1
	}
	if s2 == nil {
		return -1
	}
	return strings.Compare(s1.Name, s2.Name)
}

func getTypeNameSymbol(t *Type) *ast.Symbol {
	if t.alias != nil {
		return t.alias.symbol
	}
	if t.flags&(TypeFlagsTypeParameter|TypeFlagsStringMapping) != 0 || t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return t.symbol
	}
	return nil
}

func getObjectTypeName(t *Type) *ast.Symbol {
	if t.objectFlags&(ObjectFlagsClassOrInterface|ObjectFlagsReference) != 0 {
		return t.symbol
	}
	return nil
}

func compareTupleTypes(t1, t2 *TupleType) int {
	if t1 == t2 {
		return 0
	}
	if t1.readonly != t2.readonly {
		return core.IfElse(t1.readonly, 1, -1)
	}
	if len(t1.elementInfos) != len(t2.elementInfos) {
		return len(t1.elementInfos) - len(t2.elementInfos)
	}
	for i := range t1.elementInfos {
		if c := int(t1.elementInfos[i].flags) - int(t2.elementInfos[i].flags); c != 0 {
			return c
		}
	}
	for i := range t1.elementInfos {
		if c := compareElementLabels(t1.elementInfos[i].labeledDeclaration, t2.elementInfos[i].labeledDeclaration); c != 0 {
			return c
		}
	}
	return 0
}

func compareElementLabels(n1, n2 *ast.Node) int {
	if n1 == n2 {
		return 0
	}
	if n1 == nil {
		return -1
	}
	if n2 == nil {
		return 1
	}
	return strings.Compare(n1.Name().Text(), n2.Name().Text())
}

func compareTypeLists(s1, s2 []*Type) int {
	if len(s1) != len(s2) {
		return len(s1) - len(s2)
	}
	for i, t1 := range s1 {
		if c := compareTypes(t1, s2[i]); c != 0 {
			return c
		}
	}
	return 0
}

func compareTypeMappers(m1, m2 *TypeMapper) int {
	if m1 == m2 {
		return 0
	}
	if m1 == nil {
		return 1
	}
	if m2 == nil {
		return -1
	}
	kind1 := m1.Kind()
	kind2 := m2.Kind()
	if kind1 != kind2 {
		return int(kind1) - int(kind2)
	}
	switch kind1 {
	case TypeMapperKindSimple:
		m1 := m1.data.(*SimpleTypeMapper)
		m2 := m2.data.(*SimpleTypeMapper)
		if c := compareTypes(m1.source, m2.source); c != 0 {
			return c
		}
		return compareTypes(m1.target, m2.target)
	case TypeMapperKindArray:
		m1 := m1.data.(*ArrayTypeMapper)
		m2 := m2.data.(*ArrayTypeMapper)
		if c := compareTypeLists(m1.sources, m2.sources); c != 0 {
			return c
		}
		return compareTypeLists(m1.targets, m2.targets)
	case TypeMapperKindMerged:
		m1 := m1.data.(*MergedTypeMapper)
		m2 := m2.data.(*MergedTypeMapper)
		if c := compareTypeMappers(m1.m1, m2.m1); c != 0 {
			return c
		}
		return compareTypeMappers(m1.m2, m2.m2)
	}
	return 0
}

func getClassLikeDeclarationOfSymbol(symbol *ast.Symbol) *ast.Node {
	return core.Find(symbol.Declarations, ast.IsClassLike)
}

func isThisInTypeQuery(node *ast.Node) bool {
	if !ast.IsThisIdentifier(node) {
		return false
	}
	for ast.IsQualifiedName(node.Parent) && node.Parent.AsQualifiedName().Left == node {
		node = node.Parent
	}
	return node.Parent.Kind == ast.KindTypeQuery
}

func getDeclarationModifierFlagsFromSymbol(s *ast.Symbol) ast.ModifierFlags {
	return getDeclarationModifierFlagsFromSymbolEx(s, false /*isWrite*/)
}

func getDeclarationModifierFlagsFromSymbolEx(s *ast.Symbol, isWrite bool) ast.ModifierFlags {
	if s.ValueDeclaration != nil {
		var declaration *ast.Node
		if isWrite {
			declaration = core.Find(s.Declarations, ast.IsSetAccessorDeclaration)
		}
		if declaration == nil && s.Flags&ast.SymbolFlagsGetAccessor != 0 {
			declaration = core.Find(s.Declarations, ast.IsGetAccessorDeclaration)
		}
		if declaration == nil {
			declaration = s.ValueDeclaration
		}
		flags := ast.GetCombinedModifierFlags(declaration)
		if s.Parent != nil && s.Parent.Flags&ast.SymbolFlagsClass != 0 {
			return flags
		}
		return flags & ^ast.ModifierFlagsAccessibilityModifier
	}
	if s.CheckFlags&ast.CheckFlagsSynthetic != 0 {
		var accessModifier ast.ModifierFlags
		switch {
		case s.CheckFlags&ast.CheckFlagsContainsPrivate != 0:
			accessModifier = ast.ModifierFlagsPrivate
		case s.CheckFlags&ast.CheckFlagsContainsPublic != 0:
			accessModifier = ast.ModifierFlagsPublic
		default:
			accessModifier = ast.ModifierFlagsProtected
		}
		var staticModifier ast.ModifierFlags
		if s.CheckFlags&ast.CheckFlagsContainsStatic != 0 {
			staticModifier = ast.ModifierFlagsStatic
		}
		return accessModifier | staticModifier
	}
	if s.Flags&ast.SymbolFlagsPrototype != 0 {
		return ast.ModifierFlagsPublic | ast.ModifierFlagsStatic
	}
	return ast.ModifierFlagsNone
}

func isExponentiationOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskAsteriskToken
}

func isMultiplicativeOperator(kind ast.Kind) bool {
	return kind == ast.KindAsteriskToken || kind == ast.KindSlashToken || kind == ast.KindPercentToken
}

func isMultiplicativeOperatorOrHigher(kind ast.Kind) bool {
	return isExponentiationOperator(kind) || isMultiplicativeOperator(kind)
}

func isAdditiveOperator(kind ast.Kind) bool {
	return kind == ast.KindPlusToken || kind == ast.KindMinusToken
}

func isAdditiveOperatorOrHigher(kind ast.Kind) bool {
	return isAdditiveOperator(kind) || isMultiplicativeOperatorOrHigher(kind)
}

func isShiftOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanLessThanToken || kind == ast.KindGreaterThanGreaterThanToken ||
		kind == ast.KindGreaterThanGreaterThanGreaterThanToken
}

func isShiftOperatorOrHigher(kind ast.Kind) bool {
	return isShiftOperator(kind) || isAdditiveOperatorOrHigher(kind)
}

func isRelationalOperator(kind ast.Kind) bool {
	return kind == ast.KindLessThanToken || kind == ast.KindLessThanEqualsToken || kind == ast.KindGreaterThanToken ||
		kind == ast.KindGreaterThanEqualsToken || kind == ast.KindInstanceOfKeyword || kind == ast.KindInKeyword
}

func isRelationalOperatorOrHigher(kind ast.Kind) bool {
	return isRelationalOperator(kind) || isShiftOperatorOrHigher(kind)
}

func isEqualityOperator(kind ast.Kind) bool {
	return kind == ast.KindEqualsEqualsToken || kind == ast.KindEqualsEqualsEqualsToken ||
		kind == ast.KindExclamationEqualsToken || kind == ast.KindExclamationEqualsEqualsToken
}

func isEqualityOperatorOrHigher(kind ast.Kind) bool {
	return isEqualityOperator(kind) || isRelationalOperatorOrHigher(kind)
}

func isBitwiseOperator(kind ast.Kind) bool {
	return kind == ast.KindAmpersandToken || kind == ast.KindBarToken || kind == ast.KindCaretToken
}

func isBitwiseOperatorOrHigher(kind ast.Kind) bool {
	return isBitwiseOperator(kind) || isEqualityOperatorOrHigher(kind)
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
func isLogicalOperator(kind ast.Kind) bool {
	return kind == ast.KindAmpersandAmpersandToken || kind == ast.KindBarBarToken
}

func isLogicalOperatorOrHigher(kind ast.Kind) bool {
	return isLogicalOperator(kind) || isBitwiseOperatorOrHigher(kind)
}

func isAssignmentOperatorOrHigher(kind ast.Kind) bool {
	return kind == ast.KindQuestionQuestionToken || isLogicalOperatorOrHigher(kind) || ast.IsAssignmentOperator(kind)
}

func isBinaryOperator(kind ast.Kind) bool {
	return isAssignmentOperatorOrHigher(kind) || kind == ast.KindCommaToken
}

func isObjectLiteralType(t *Type) bool {
	return t.objectFlags&ObjectFlagsObjectLiteral != 0
}

func isDeclarationReadonly(declaration *ast.Node) bool {
	return ast.GetCombinedModifierFlags(declaration)&ast.ModifierFlagsReadonly != 0 && !ast.IsParameterPropertyDeclaration(declaration, declaration.Parent)
}

type orderedSet[T comparable] struct {
	valuesByKey map[T]struct{}
	values      []T
}

func (s *orderedSet[T]) contains(value T) bool {
	_, ok := s.valuesByKey[value]
	return ok
}

func (s *orderedSet[T]) add(value T) {
	if s.valuesByKey == nil {
		s.valuesByKey = make(map[T]struct{})
	}
	s.valuesByKey[value] = struct{}{}
	s.values = append(s.values, value)
}

func getContainingFunction(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsFunctionLike)
}

func getContainingFunctionOrClassStaticBlock(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, ast.IsFunctionLikeOrClassStaticBlockDeclaration)
}

func isTypeReferenceType(node *ast.Node) bool {
	return node.Kind == ast.KindTypeReference || node.Kind == ast.KindExpressionWithTypeArguments
}

func isNodeDescendantOf(node *ast.Node, ancestor *ast.Node) bool {
	for node != nil {
		if node == ancestor {
			return true
		}
		node = node.Parent
	}
	return false
}

func isTypeUsableAsPropertyName(t *Type) bool {
	return t.flags&TypeFlagsStringOrNumberLiteralOrUnique != 0
}

/**
 * Gets the symbolic name for a member from its type.
 */
func getPropertyNameFromType(t *Type) string {
	switch {
	case t.flags&TypeFlagsStringLiteral != 0:
		return t.AsLiteralType().value.(string)
	case t.flags&TypeFlagsNumberLiteral != 0:
		return t.AsLiteralType().value.(jsnum.Number).String()
	case t.flags&TypeFlagsUniqueESSymbol != 0:
		return t.AsUniqueESSymbolType().name
	}
	panic("Unhandled case in getPropertyNameFromType")
}

func isNumericLiteralName(name string) bool {
	// The intent of numeric names is that
	//     - they are names with text in a numeric form, and that
	//     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
	//         acquired by applying the abstract 'ToNumber' operation on the name's text.
	//
	// The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
	// In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
	//
	// Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
	// according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
	// Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
	// because their 'ToString' representation is not equal to their original text.
	// This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
	//
	// Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
	// The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
	// Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
	//
	// Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
	// This is desired behavior, because when indexing with them as numeric entities, you are indexing
	// with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
	return jsnum.FromString(name).String() == name
}

func getPropertyNameForPropertyNameNode(name *ast.Node) string {
	switch name.Kind {
	case ast.KindIdentifier, ast.KindPrivateIdentifier, ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral,
		ast.KindNumericLiteral, ast.KindBigIntLiteral, ast.KindJsxNamespacedName:
		return name.Text()
	case ast.KindComputedPropertyName:
		nameExpression := name.AsComputedPropertyName().Expression
		if ast.IsStringOrNumericLiteralLike(nameExpression) {
			return nameExpression.Text()
		}
		if ast.IsSignedNumericLiteral(nameExpression) {
			text := nameExpression.AsPrefixUnaryExpression().Operand.Text()
			if nameExpression.AsPrefixUnaryExpression().Operator == ast.KindMinusToken {
				text = "-" + text
			}
			return text
		}
		return ast.InternalSymbolNameMissing
	}
	panic("Unhandled case in getPropertyNameForPropertyNameNode")
}

func isThisProperty(node *ast.Node) bool {
	return (ast.IsPropertyAccessExpression(node) || ast.IsElementAccessExpression(node)) && node.Expression().Kind == ast.KindThisKeyword
}

func anyToString(v any) string {
	// !!! This function should behave identically to the expression `"" + v` in JS
	switch v := v.(type) {
	case string:
		return v
	case jsnum.Number:
		return v.String()
	case bool:
		return core.IfElse(v, "true", "false")
	case PseudoBigInt:
		return "(BigInt)" // !!!
	}
	panic("Unhandled case in anyToString")
}

func isValidNumberString(s string, roundTripOnly bool) bool {
	if s == "" {
		return false
	}
	n := jsnum.FromString(s)
	return !n.IsNaN() && !n.IsInf() && (!roundTripOnly || n.String() == s)
}

func isValidBigIntString(s string, roundTripOnly bool) bool {
	return false // !!!
}

func isValidESSymbolDeclaration(node *ast.Node) bool {
	if ast.IsVariableDeclaration(node) {
		return ast.IsVarConst(node) && ast.IsIdentifier(node.AsVariableDeclaration().Name()) && isVariableDeclarationInVariableStatement(node)
	}
	if ast.IsPropertyDeclaration(node) {
		return hasEffectiveReadonlyModifier(node) && ast.HasStaticModifier(node)
	}
	return ast.IsPropertySignatureDeclaration(node) && hasEffectiveReadonlyModifier(node)
}

func isVariableDeclarationInVariableStatement(node *ast.Node) bool {
	return ast.IsVariableDeclarationList(node.Parent) && ast.IsVariableStatement(node.Parent.Parent)
}

func isKnownSymbol(symbol *ast.Symbol) bool {
	return isLateBoundName(symbol.Name)
}

func isLateBoundName(name string) bool {
	return len(name) >= 2 && name[0] == '\xfe' && name[1] == '@'
}

func getThisParameter(signature *ast.Node) *ast.Node {
	// callback tags do not currently support this parameters
	if len(signature.Parameters()) != 0 {
		thisParameter := signature.Parameters()[0]
		if parameterIsThisKeyword(thisParameter) {
			return thisParameter
		}
	}
	return nil
}

// Deprecated: use ast.IsThisParameter
func parameterIsThisKeyword(parameter *ast.Node) bool {
	return ast.IsThisParameter(parameter)
}

func getExtendsTypeNode(node *ast.Node) *ast.Node {
	return core.FirstOrNil(getExtendsTypeNodes(node))
}

func getExtendsTypeNodes(node *ast.Node) []*ast.Node {
	return getHeritageTypeNodes(node, ast.KindExtendsKeyword)
}

func getImplementsTypeNodes(node *ast.Node) []*ast.Node {
	return getHeritageTypeNodes(node, ast.KindImplementsKeyword)
}

func getHeritageTypeNodes(node *ast.Node, kind ast.Kind) []*ast.Node {
	clause := getHeritageClause(node, kind)
	if clause != nil {
		return clause.AsHeritageClause().Types.Nodes
	}
	return nil
}

func getHeritageClause(node *ast.Node, kind ast.Kind) *ast.Node {
	clauses := getHeritageClauses(node)
	if clauses != nil {
		for _, clause := range clauses.Nodes {
			if clause.AsHeritageClause().Token == kind {
				return clause
			}
		}
	}
	return nil
}

func getHeritageClauses(node *ast.Node) *ast.NodeList {
	switch node.Kind {
	case ast.KindClassDeclaration:
		return node.AsClassDeclaration().HeritageClauses
	case ast.KindClassExpression:
		return node.AsClassExpression().HeritageClauses
	case ast.KindInterfaceDeclaration:
		return node.AsInterfaceDeclaration().HeritageClauses
	}
	return nil
}

func isObjectOrArrayLiteralType(t *Type) bool {
	return t.objectFlags&(ObjectFlagsObjectLiteral|ObjectFlagsArrayLiteral) != 0
}

func getContainingClassExcludingClassDecorators(node *ast.Node) *ast.ClassLikeDeclaration {
	decorator := ast.FindAncestorOrQuit(node.Parent, func(n *ast.Node) ast.FindAncestorResult {
		if ast.IsClassLike(n) {
			return ast.FindAncestorQuit
		}
		if ast.IsDecorator(n) {
			return ast.FindAncestorTrue
		}
		return ast.FindAncestorFalse
	})
	if decorator != nil && ast.IsClassLike(decorator.Parent) {
		return ast.GetContainingClass(decorator.Parent)
	}
	if decorator != nil {
		return ast.GetContainingClass(decorator)
	}
	return ast.GetContainingClass(node)
}

func isThisTypeParameter(t *Type) bool {
	return t.flags&TypeFlagsTypeParameter != 0 && t.AsTypeParameter().isThisType
}

func isCallLikeExpression(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindJsxOpeningElement, ast.KindJsxSelfClosingElement, ast.KindCallExpression, ast.KindNewExpression,
		ast.KindTaggedTemplateExpression, ast.KindDecorator:
		return true
	}
	return false
}

func isCallOrNewExpression(node *ast.Node) bool {
	return ast.IsCallExpression(node) || ast.IsNewExpression(node)
}

func isClassInstanceProperty(node *ast.Node) bool {
	return node.Parent != nil && ast.IsClassLike(node.Parent) && ast.IsPropertyDeclaration(node) && !ast.HasAccessorModifier(node)
}

func isThisInitializedObjectBindingExpression(node *ast.Node) bool {
	return node != nil && (ast.IsShorthandPropertyAssignment(node) || ast.IsPropertyAssignment(node)) && ast.IsBinaryExpression(node.Parent.Parent) &&
		node.Parent.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken &&
		node.Parent.Parent.AsBinaryExpression().Right.Kind == ast.KindThisKeyword
}

func isThisInitializedDeclaration(node *ast.Node) bool {
	return node != nil && ast.IsVariableDeclaration(node) && node.AsVariableDeclaration().Initializer != nil && node.AsVariableDeclaration().Initializer.Kind == ast.KindThisKeyword
}

func isWriteOnlyAccess(node *ast.Node) bool {
	return accessKind(node) == AccessKindWrite
}

func isWriteAccess(node *ast.Node) bool {
	return accessKind(node) != AccessKindRead
}

type AccessKind int32

const (
	AccessKindRead      AccessKind = iota // Only reads from a variable
	AccessKindWrite                       // Only writes to a variable without ever reading it. E.g.: `x=1;`.
	AccessKindReadWrite                   // Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`.
)

func accessKind(node *ast.Node) AccessKind {
	parent := node.Parent
	switch parent.Kind {
	case ast.KindParenthesizedExpression:
		return accessKind(parent)
	case ast.KindPrefixUnaryExpression:
		operator := parent.AsPrefixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindPostfixUnaryExpression:
		operator := parent.AsPostfixUnaryExpression().Operator
		if operator == ast.KindPlusPlusToken || operator == ast.KindMinusMinusToken {
			return AccessKindReadWrite
		}
		return AccessKindRead
	case ast.KindBinaryExpression:
		if parent.AsBinaryExpression().Left == node {
			operator := parent.AsBinaryExpression().OperatorToken
			if ast.IsAssignmentOperator(operator.Kind) {
				if operator.Kind == ast.KindEqualsToken {
					return AccessKindWrite
				}
				return AccessKindReadWrite
			}
		}
		return AccessKindRead
	case ast.KindPropertyAccessExpression:
		if parent.AsPropertyAccessExpression().Name() != node {
			return AccessKindRead
		}
		return accessKind(parent)
	case ast.KindPropertyAssignment:
		parentAccess := accessKind(parent.Parent)
		// In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
		if node == parent.AsPropertyAssignment().Name() {
			return reverseAccessKind(parentAccess)
		}
		return parentAccess
	case ast.KindShorthandPropertyAssignment:
		// Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
		if node == parent.AsShorthandPropertyAssignment().ObjectAssignmentInitializer {
			return AccessKindRead
		}
		return accessKind(parent.Parent)
	case ast.KindArrayLiteralExpression:
		return accessKind(parent)
	case ast.KindForInStatement, ast.KindForOfStatement:
		if node == parent.AsForInOrOfStatement().Initializer {
			return AccessKindWrite
		}
		return AccessKindRead
	}
	return AccessKindRead
}

func reverseAccessKind(a AccessKind) AccessKind {
	switch a {
	case AccessKindRead:
		return AccessKindWrite
	case AccessKindWrite:
		return AccessKindRead
	case AccessKindReadWrite:
		return AccessKindReadWrite
	}
	panic("Unhandled case in reverseAccessKind")
}

func isJsxOpeningLikeElement(node *ast.Node) bool {
	return ast.IsJsxOpeningElement(node) || ast.IsJsxSelfClosingElement(node)
}

// Deprecated in favor of `ast.IsObjectLiteralElement`
func isObjectLiteralElementLike(node *ast.Node) bool {
	return ast.IsObjectLiteralElement(node)
}

type EvaluatorResult struct {
	value                 any
	isSyntacticallyString bool
	resolvedOtherFiles    bool
	hasExternalReferences bool
}

func evaluatorResult(value any, isSyntacticallyString bool, resolvedOtherFiles bool, hasExternalReferences bool) EvaluatorResult {
	return EvaluatorResult{value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences}
}

type Evaluator func(expr *ast.Node, location *ast.Node) EvaluatorResult

func createEvaluator(evaluateEntity Evaluator) Evaluator {
	var evaluate Evaluator
	evaluateTemplateExpression := func(expr *ast.Node, location *ast.Node) EvaluatorResult {
		var sb strings.Builder
		sb.WriteString(expr.AsTemplateExpression().Head.Text())
		resolvedOtherFiles := false
		hasExternalReferences := false
		for _, span := range expr.AsTemplateExpression().TemplateSpans.Nodes {
			spanResult := evaluate(span.Expression(), location)
			if spanResult.value == nil {
				return evaluatorResult(nil, true /*isSyntacticallyString*/, false, false)
			}
			sb.WriteString(anyToString(spanResult.value))
			sb.WriteString(span.AsTemplateSpan().Literal.Text())
			resolvedOtherFiles = resolvedOtherFiles || spanResult.resolvedOtherFiles
			hasExternalReferences = hasExternalReferences || spanResult.hasExternalReferences
		}
		return evaluatorResult(sb.String(), true, resolvedOtherFiles, hasExternalReferences)
	}
	evaluate = func(expr *ast.Node, location *ast.Node) EvaluatorResult {
		isSyntacticallyString := false
		resolvedOtherFiles := false
		hasExternalReferences := false
		// It's unclear when/whether we should consider skipping other kinds of outer expressions.
		// Type assertions intentionally break evaluation when evaluating literal types, such as:
		//     type T = `one ${"two" as any} three`; // string
		// But it's less clear whether such an assertion should break enum member evaluation:
		//     enum E {
		//       A = "one" as any
		//     }
		// SatisfiesExpressions and non-null assertions seem to have even less reason to break
		// emitting enum members as literals. However, these expressions also break Babel's
		// evaluation (but not esbuild's), and the isolatedModules errors we give depend on
		// our evaluation results, so we're currently being conservative so as to issue errors
		// on code that might break Babel.
		expr = ast.SkipParentheses(expr)
		switch expr.Kind {
		case ast.KindPrefixUnaryExpression:
			result := evaluate(expr.AsPrefixUnaryExpression().Operand, location)
			resolvedOtherFiles = result.resolvedOtherFiles
			hasExternalReferences = result.hasExternalReferences
			if value, ok := result.value.(jsnum.Number); ok {
				switch expr.AsPrefixUnaryExpression().Operator {
				case ast.KindPlusToken:
					return evaluatorResult(value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindMinusToken:
					return evaluatorResult(-value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindTildeToken:
					return evaluatorResult(value.BitwiseNOT(), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				}
			}
		case ast.KindBinaryExpression:
			left := evaluate(expr.AsBinaryExpression().Left, location)
			right := evaluate(expr.AsBinaryExpression().Right, location)
			operator := expr.AsBinaryExpression().OperatorToken.Kind
			isSyntacticallyString = (left.isSyntacticallyString || right.isSyntacticallyString) && expr.AsBinaryExpression().OperatorToken.Kind == ast.KindPlusToken
			resolvedOtherFiles = left.resolvedOtherFiles || right.resolvedOtherFiles
			hasExternalReferences = left.hasExternalReferences || right.hasExternalReferences
			leftNum, leftIsNum := left.value.(jsnum.Number)
			rightNum, rightIsNum := right.value.(jsnum.Number)
			if leftIsNum && rightIsNum {
				switch operator {
				case ast.KindBarToken:
					return evaluatorResult(leftNum.BitwiseOR(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAmpersandToken:
					return evaluatorResult(leftNum.BitwiseAND(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindGreaterThanGreaterThanToken:
					return evaluatorResult(leftNum.SignedRightShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindGreaterThanGreaterThanGreaterThanToken:
					return evaluatorResult(leftNum.UnsignedRightShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindLessThanLessThanToken:
					return evaluatorResult(leftNum.LeftShift(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindCaretToken:
					return evaluatorResult(leftNum.BitwiseXOR(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAsteriskToken:
					return evaluatorResult(leftNum*rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindSlashToken:
					return evaluatorResult(leftNum/rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindPlusToken:
					return evaluatorResult(leftNum+rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindMinusToken:
					return evaluatorResult(leftNum-rightNum, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindPercentToken:
					return evaluatorResult(leftNum.Remainder(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				case ast.KindAsteriskAsteriskToken:
					return evaluatorResult(leftNum.Exponentiate(rightNum), isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
				}
			}
			leftStr, leftIsStr := left.value.(string)
			rightStr, rightIsStr := right.value.(string)
			if (leftIsStr || leftIsNum) && (rightIsStr || rightIsNum) && operator == ast.KindPlusToken {
				if leftIsNum {
					leftStr = leftNum.String()
				}
				if rightIsNum {
					rightStr = rightNum.String()
				}
				return evaluatorResult(leftStr+rightStr, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
			}
		case ast.KindStringLiteral, ast.KindNoSubstitutionTemplateLiteral:
			return evaluatorResult(expr.Text(), true /*isSyntacticallyString*/, false, false)
		case ast.KindTemplateExpression:
			return evaluateTemplateExpression(expr, location)
		case ast.KindNumericLiteral:
			return evaluatorResult(jsnum.FromString(expr.Text()), false, false, false)
		case ast.KindIdentifier, ast.KindElementAccessExpression:
			return evaluateEntity(expr, location)
		case ast.KindPropertyAccessExpression:
			if ast.IsEntityNameExpression(expr) {
				return evaluateEntity(expr, location)
			}
		}
		return evaluatorResult(nil, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences)
	}
	return evaluate
}

func isInfinityOrNaNString(name string) bool {
	return name == "Infinity" || name == "-Infinity" || name == "NaN"
}

func (c *Checker) isConstantVariable(symbol *ast.Symbol) bool {
	return symbol.Flags&ast.SymbolFlagsVariable != 0 && (c.getDeclarationNodeFlagsFromSymbol(symbol)&ast.NodeFlagsConstant) != 0
}

func (c *Checker) isParameterOrMutableLocalVariable(symbol *ast.Symbol) bool {
	// Return true if symbol is a parameter, a catch clause variable, or a mutable local variable
	if symbol.ValueDeclaration != nil {
		declaration := ast.GetRootDeclaration(symbol.ValueDeclaration)
		return declaration != nil && (ast.IsParameter(declaration) || ast.IsVariableDeclaration(declaration) && (ast.IsCatchClause(declaration.Parent) || c.isMutableLocalVariableDeclaration(declaration)))
	}
	return false
}

func (c *Checker) isMutableLocalVariableDeclaration(declaration *ast.Node) bool {
	// Return true if symbol is a non-exported and non-global `let` variable
	return declaration.Parent.Flags&ast.NodeFlagsLet != 0 && !(ast.GetCombinedModifierFlags(declaration)&ast.ModifierFlagsExport != 0 || declaration.Parent.Parent.Kind == ast.KindVariableStatement && isGlobalSourceFile(declaration.Parent.Parent.Parent))
}

func isInAmbientOrTypeNode(node *ast.Node) bool {
	return node.Flags&ast.NodeFlagsAmbient != 0 || ast.FindAncestor(node, func(n *ast.Node) bool {
		return ast.IsInterfaceDeclaration(n) || ast.IsTypeAliasDeclaration(n) || ast.IsTypeLiteralNode(n)
	}) != nil
}

func isVariableLike(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindBindingElement, ast.KindEnumMember, ast.KindParameter, ast.KindPropertyAssignment, ast.KindPropertyDeclaration,
		ast.KindPropertySignature, ast.KindShorthandPropertyAssignment, ast.KindVariableDeclaration:
		return true
	}
	return false
}

func getAncestor(node *ast.Node, kind ast.Kind) *ast.Node {
	for node != nil {
		if node.Kind == kind {
			return node
		}
		node = node.Parent
	}
	return nil
}

func isLiteralExpressionOfObject(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindObjectLiteralExpression, ast.KindArrayLiteralExpression, ast.KindRegularExpressionLiteral,
		ast.KindFunctionExpression, ast.KindClassExpression:
		return true
	}
	return false
}

func canHaveFlowNode(node *ast.Node) bool {
	return node.FlowNodeData() != nil
}

func isNonNullAccess(node *ast.Node) bool {
	return ast.IsAccessExpression(node) && ast.IsNonNullExpression(node.Expression())
}

func getTagNameOfNode(node *ast.Node) *ast.Node {
	switch node.Kind {
	case ast.KindJsxOpeningElement:
		return node.AsJsxOpeningElement().TagName
	case ast.KindJsxClosingElement:
		return node.AsJsxClosingElement().TagName
	case ast.KindJsxSelfClosingElement:
		return node.AsJsxSelfClosingElement().TagName
	}
	panic("Unhandled case in getTagNameOfNode")
}

func getBindingElementPropertyName(node *ast.Node) *ast.Node {
	name := node.AsBindingElement().PropertyName
	if name != nil {
		return name
	}
	return node.Name()
}

func indexOfNode(nodes []*ast.Node, node *ast.Node) int {
	index, ok := slices.BinarySearchFunc(nodes, node, compareNodePositions)
	if ok {
		return index
	}
	return -1
}

func compareNodePositions(n1, n2 *ast.Node) int {
	return n1.Pos() - n2.Pos()
}

func hasContextSensitiveParameters(node *ast.Node) bool {
	// Functions with type parameters are not context sensitive.
	if node.TypeParameters() == nil {
		// Functions with any parameters that lack type annotations are context sensitive.
		if core.Some(node.Parameters(), func(p *ast.Node) bool { return p.Type() == nil }) {
			return true
		}
		if !ast.IsArrowFunction(node) {
			// If the first parameter is not an explicit 'this' parameter, then the function has
			// an implicit 'this' parameter which is subject to contextual typing.
			parameter := core.FirstOrNil(node.Parameters())
			if parameter == nil || !parameterIsThisKeyword(parameter) {
				return true
			}
		}
	}
	return false
}

func isCallChain(node *ast.Node) bool {
	return ast.IsCallExpression(node) && node.Flags&ast.NodeFlagsOptionalChain != 0
}

func (c *Checker) callLikeExpressionMayHaveTypeArguments(node *ast.Node) bool {
	return isCallOrNewExpression(node) || ast.IsTaggedTemplateExpression(node) || isJsxOpeningLikeElement(node)
}

func isSuperCall(n *ast.Node) bool {
	return ast.IsCallExpression(n) && n.Expression().Kind == ast.KindSuperKeyword
}

/**
 * Determines whether a node is a property or element access expression for `super`.
 *
 * @internal
 */
func isSuperProperty(node *ast.Node) bool {
	return ast.IsAccessExpression(node) && node.Expression().Kind == ast.KindSuperKeyword
}

func getMembersOfDeclaration(node *ast.Node) []*ast.Node {
	switch node.Kind {
	case ast.KindInterfaceDeclaration:
		return node.AsInterfaceDeclaration().Members.Nodes
	case ast.KindClassDeclaration:
		return node.AsClassDeclaration().Members.Nodes
	case ast.KindClassExpression:
		return node.AsClassExpression().Members.Nodes
	case ast.KindTypeLiteral:
		return node.AsTypeLiteralNode().Members.Nodes
	case ast.KindObjectLiteralExpression:
		return node.AsObjectLiteralExpression().Properties.Nodes
	}
	return nil
}

type FunctionFlags uint32

const (
	FunctionFlagsNormal         FunctionFlags = 0
	FunctionFlagsGenerator      FunctionFlags = 1 << 0
	FunctionFlagsAsync          FunctionFlags = 1 << 1
	FunctionFlagsInvalid        FunctionFlags = 1 << 2
	FunctionFlagsAsyncGenerator FunctionFlags = FunctionFlagsAsync | FunctionFlagsGenerator
)

func getFunctionFlags(node *ast.Node) FunctionFlags {
	if node == nil {
		return FunctionFlagsInvalid
	}
	data := node.BodyData()
	if data == nil {
		return FunctionFlagsInvalid
	}
	flags := FunctionFlagsNormal
	switch node.Kind {
	case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindMethodDeclaration:
		if data.AsteriskToken != nil {
			flags |= FunctionFlagsGenerator
		}
		fallthrough
	case ast.KindArrowFunction:
		if ast.HasSyntacticModifier(node, ast.ModifierFlagsAsync) {
			flags |= FunctionFlagsAsync
		}
	}
	if data.Body == nil {
		flags |= FunctionFlagsInvalid
	}
	return flags
}

func getLeftSideOfImportEqualsOrExportAssignment(nodeOnRightSide *ast.EntityName) *ast.Node {
	for nodeOnRightSide.Parent.Kind == ast.KindQualifiedName {
		nodeOnRightSide = nodeOnRightSide.Parent
	}

	if nodeOnRightSide.Parent.Kind == ast.KindImportEqualsDeclaration {
		if nodeOnRightSide.Parent.AsImportEqualsDeclaration().ModuleReference == nodeOnRightSide {
			return nodeOnRightSide.Parent
		}
		return nil
	}

	if nodeOnRightSide.Parent.Kind == ast.KindExportAssignment {
		if nodeOnRightSide.Parent.AsExportAssignment().Expression == nodeOnRightSide {
			return nodeOnRightSide.Parent
		}
		return nil
	}

	return nil
}

func isInRightSideOfImportOrExportAssignment(node *ast.EntityName) bool {
	return getLeftSideOfImportEqualsOrExportAssignment(node) != nil
}

func isJsxIntrinsicTagName(tagName *ast.Node) bool {
	return ast.IsIdentifier(tagName) && isIntrinsicJsxName(tagName.Text()) || ast.IsJsxNamespacedName(tagName)
}

func getContainingObjectLiteral(f *ast.SignatureDeclaration) *ast.Node {
	if (f.Kind == ast.KindMethodDeclaration ||
		f.Kind == ast.KindGetAccessor ||
		f.Kind == ast.KindSetAccessor) && f.Parent.Kind == ast.KindObjectLiteralExpression {
		return f.Parent
	} else if f.Kind == ast.KindFunctionExpression && f.Parent.Kind == ast.KindPropertyAssignment {
		return f.Parent.Parent
	}
	return nil
}

func isImportTypeQualifierPart(node *ast.Node) *ast.Node {
	parent := node.Parent
	for ast.IsQualifiedName(parent) {
		node = parent
		parent = parent.Parent
	}

	if parent != nil && parent.Kind == ast.KindImportType && parent.AsImportTypeNode().Qualifier == node {
		return parent
	}

	return nil
}

func isInNameOfExpressionWithTypeArguments(node *ast.Node) bool {
	for node.Parent.Kind == ast.KindPropertyAccessExpression {
		node = node.Parent
	}

	return node.Parent.Kind == ast.KindExpressionWithTypeArguments
}

func getTypeParameterFromJsDoc(node *ast.Node) *ast.Node {
	name := node.Name().Text()
	typeParameters := node.Parent.Parent.Parent.TypeParameters()
	return core.Find(typeParameters, func(p *ast.Node) bool { return p.Name().Text() == name })
}

func isTypeDeclarationName(name *ast.Node) bool {
	return name.Kind == ast.KindIdentifier &&
		isTypeDeclaration(name.Parent) &&
		ast.GetNameOfDeclaration(name.Parent) == name
}

func getIndexSymbolFromSymbolTable(symbolTable ast.SymbolTable) *ast.Symbol {
	return symbolTable[ast.InternalSymbolNameIndex]
}

// Indicates whether the result of an `Expression` will be unused.
// NOTE: This requires a node with a valid `parent` pointer.
func expressionResultIsUnused(node *ast.Node) bool {
	for {
		parent := node.Parent
		// walk up parenthesized expressions, but keep a pointer to the top-most parenthesized expression
		if ast.IsParenthesizedExpression(parent) {
			node = parent
			continue
		}
		// result is unused in an expression statement, `void` expression, or the initializer or incrementer of a `for` loop
		if ast.IsExpressionStatement(parent) || ast.IsVoidExpression(parent) || ast.IsForStatement(parent) && (parent.Initializer() == node || parent.AsForStatement().Incrementor == node) {
			return true
		}
		if ast.IsBinaryExpression(parent) && parent.AsBinaryExpression().OperatorToken.Kind == ast.KindCommaToken {
			// left side of comma is always unused
			if node == parent.AsBinaryExpression().Left {
				return true
			}
			// right side of comma is unused if parent is unused
			node = parent
			continue
		}
		return false
	}
}

func pseudoBigIntToString(value PseudoBigInt) string {
	if value.negative && value.base10Value != "0" {
		return "-" + value.base10Value
	}
	return value.base10Value
}

func getSuperContainer(node *ast.Node, stopOnFunctions bool) *ast.Node {
	for {
		node = node.Parent
		if node == nil {
			return nil
		}
		switch node.Kind {
		case ast.KindComputedPropertyName:
			node = node.Parent
		case ast.KindFunctionDeclaration, ast.KindFunctionExpression, ast.KindArrowFunction:
			if !stopOnFunctions {
				continue
			}
			fallthrough
		case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindMethodDeclaration, ast.KindMethodSignature, ast.KindConstructor,
			ast.KindGetAccessor, ast.KindSetAccessor, ast.KindClassStaticBlockDeclaration:
			return node
		case ast.KindDecorator:
			// Decorators are always applied outside of the body of a class or method.
			if ast.IsParameter(node.Parent) && ast.IsClassElement(node.Parent.Parent) {
				// If the decorator's parent is a Parameter, we resolve the this container from
				// the grandparent class declaration.
				node = node.Parent.Parent
			} else if ast.IsClassElement(node.Parent) {
				// If the decorator's parent is a class element, we resolve the 'this' container
				// from the parent class declaration.
				node = node.Parent
			}
		}
	}
}

func forEachYieldExpression(body *ast.Node, visitor func(expr *ast.Node)) {
	var traverse func(*ast.Node) bool
	traverse = func(node *ast.Node) bool {
		switch node.Kind {
		case ast.KindYieldExpression:
			visitor(node)
			operand := node.Expression()
			if operand != nil {
				traverse(operand)
			}
		case ast.KindEnumDeclaration, ast.KindInterfaceDeclaration, ast.KindModuleDeclaration, ast.KindTypeAliasDeclaration:
			// These are not allowed inside a generator now, but eventually they may be allowed
			// as local types. Regardless, skip them to avoid the work.
		default:
			if ast.IsFunctionLike(node) {
				if node.Name() != nil && ast.IsComputedPropertyName(node.Name()) {
					// Note that we will not include methods/accessors of a class because they would require
					// first descending into the class. This is by design.
					traverse(node.Name().Expression())
				}
			} else if !ast.IsPartOfTypeNode(node) {
				// This is the general case, which should include mostly expressions and statements.
				// Also includes NodeArrays.
				node.ForEachChild(traverse)
			}
		}
		return false
	}
	traverse(body)
}

func skipTypeChecking(sourceFile *ast.SourceFile, options *core.CompilerOptions) bool {
	return options.NoCheck == core.TSTrue ||
		options.SkipLibCheck == core.TSTrue && tspath.IsDeclarationFileName(sourceFile.FileName()) ||
		options.SkipDefaultLibCheck == core.TSTrue && sourceFile.HasNoDefaultLib ||
		!canIncludeBindAndCheckDiagnostics(sourceFile, options)
}

func canIncludeBindAndCheckDiagnostics(sourceFile *ast.SourceFile, options *core.CompilerOptions) bool {
	// !!!
	// if (!!sourceFile.checkJsDirective && sourceFile.checkJsDirective.enabled === false) return false;

	if sourceFile.ScriptKind == core.ScriptKindTS || sourceFile.ScriptKind == core.ScriptKindTSX || sourceFile.ScriptKind == core.ScriptKindExternal {
		return true
	}

	isJs := sourceFile.ScriptKind == core.ScriptKindJS || sourceFile.ScriptKind == core.ScriptKindJSX
	isCheckJs := isJs && isCheckJsEnabledForFile(sourceFile, options)
	isPlainJs := isPlainJsFile(sourceFile, options.CheckJs)

	// By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
	// - plain JS: .js files with no // ts-check and checkJs: undefined
	// - check JS: .js files with either // ts-check or checkJs: true
	// - external: files that are added by plugins
	return isPlainJs || isCheckJs || sourceFile.ScriptKind == core.ScriptKindDeferred
}

func isCheckJsEnabledForFile(sourceFile *ast.SourceFile, compilerOptions *core.CompilerOptions) bool {
	// !!!
	// if sourceFile.CheckJsDirective != nil {
	// 	return sourceFile.CheckJsDirective.Enabled
	// }
	return compilerOptions.CheckJs == core.TSTrue
}

func isPlainJsFile(file *ast.SourceFile, checkJs core.Tristate) bool {
	// !!!
	// return file != nil && (file.ScriptKind == core.ScriptKindJS || file.ScriptKind == core.ScriptKindJSX) && file.CheckJsDirective == nil && checkJs == core.TSUnknown
	return file != nil && (file.ScriptKind == core.ScriptKindJS || file.ScriptKind == core.ScriptKindJSX) && checkJs == core.TSUnknown
}

func getEnclosingContainer(node *ast.Node) *ast.Node {
	return ast.FindAncestor(node.Parent, func(n *ast.Node) bool {
		return binder.GetContainerFlags(n)&binder.ContainerFlagsIsContainer != 0
	})
}

func getDeclarationsOfKind(symbol *ast.Symbol, kind ast.Kind) []*ast.Node {
	return core.Filter(symbol.Declarations, func(d *ast.Node) bool { return d.Kind == kind })
}

func hasType(node *ast.Node) bool {
	return node.Type() != nil
}

func getNonRestParameterCount(sig *Signature) int {
	return len(sig.parameters) - core.IfElse(signatureHasRestParameter(sig), 1, 0)
}

func minAndMax[T any](slice []T, getValue func(value T) int) (int, int) {
	var minValue, maxValue int
	for i, element := range slice {
		value := getValue(element)
		if i == 0 {
			minValue = value
			maxValue = value
		} else {
			minValue = min(minValue, value)
			maxValue = max(maxValue, value)
		}
	}
	return minValue, maxValue
}
