package ls

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
)

type ScriptElementKind string

const (
	ScriptElementKindUnknown ScriptElementKind = ""
	ScriptElementKindWarning ScriptElementKind = "warning"
	// predefined type (void) or keyword (class)
	ScriptElementKindKeyword ScriptElementKind = "keyword"
	// top level script node
	ScriptElementKindScriptElement ScriptElementKind = "script"
	// module foo {}
	ScriptElementKindModuleElement ScriptElementKind = "module"
	// class X {}
	ScriptElementKindClassElement ScriptElementKind = "class"
	// var x = class X {}
	ScriptElementKindLocalClassElement ScriptElementKind = "local class"
	// interface Y {}
	ScriptElementKindInterfaceElement ScriptElementKind = "interface"
	// type T = ...
	ScriptElementKindTypeElement ScriptElementKind = "type"
	// enum E {}
	ScriptElementKindEnumElement       ScriptElementKind = "enum"
	ScriptElementKindEnumMemberElement ScriptElementKind = "enum member"
	// Inside module and script only.
	// const v = ...
	ScriptElementKindVariableElement ScriptElementKind = "var"
	// Inside function.
	ScriptElementKindLocalVariableElement ScriptElementKind = "local var"
	// using foo = ...
	ScriptElementKindVariableUsingElement ScriptElementKind = "using"
	// await using foo = ...
	ScriptElementKindVariableAwaitUsingElement ScriptElementKind = "await using"
	// Inside module and script only.
	// function f() {}
	ScriptElementKindFunctionElement ScriptElementKind = "function"
	// Inside function.
	ScriptElementKindLocalFunctionElement ScriptElementKind = "local function"
	// class X { [public|private]* foo() {} }
	ScriptElementKindMemberFunctionElement ScriptElementKind = "method"
	// class X { [public|private]* [get|set] foo:number; }
	ScriptElementKindMemberGetAccessorElement ScriptElementKind = "getter"
	ScriptElementKindMemberSetAccessorElement ScriptElementKind = "setter"
	// class X { [public|private]* foo:number; }
	// interface Y { foo:number; }
	ScriptElementKindMemberVariableElement ScriptElementKind = "property"
	// class X { [public|private]* accessor foo: number; }
	ScriptElementKindMemberAccessorVariableElement ScriptElementKind = "accessor"
	// class X { constructor() { } }
	// class X { static { } }
	ScriptElementKindConstructorImplementationElement ScriptElementKind = "constructor"
	// interface Y { ():number; }
	ScriptElementKindCallSignatureElement ScriptElementKind = "call"
	// interface Y { []:number; }
	ScriptElementKindIndexSignatureElement ScriptElementKind = "index"
	// interface Y { new():Y; }
	ScriptElementKindConstructSignatureElement ScriptElementKind = "construct"
	// function foo(*Y*: string)
	ScriptElementKindParameterElement     ScriptElementKind = "parameter"
	ScriptElementKindTypeParameterElement ScriptElementKind = "type parameter"
	ScriptElementKindPrimitiveType        ScriptElementKind = "primitive type"
	ScriptElementKindLabel                ScriptElementKind = "label"
	ScriptElementKindAlias                ScriptElementKind = "alias"
	ScriptElementKindConstElement         ScriptElementKind = "const"
	ScriptElementKindLetElement           ScriptElementKind = "let"
	ScriptElementKindDirectory            ScriptElementKind = "directory"
	ScriptElementKindExternalModuleName   ScriptElementKind = "external module name"
	// String literal
	ScriptElementKindString ScriptElementKind = "string"
	// Jsdoc @link: in `{@link C link text}`, the before and after text "{@link " and "}"
	ScriptElementKindLink ScriptElementKind = "link"
	// Jsdoc @link: in `{@link C link text}`, the entity name "C"
	ScriptElementKindLinkName ScriptElementKind = "link name"
	// Jsdoc @link: in `{@link C link text}`, the link text "link text"
	ScriptElementKindLinkText ScriptElementKind = "link text"
)

type ScriptElementKindModifier string

const (
	ScriptElementKindModifierNone       ScriptElementKindModifier = ""
	ScriptElementKindModifierPublic     ScriptElementKindModifier = "public"
	ScriptElementKindModifierPrivate    ScriptElementKindModifier = "private"
	ScriptElementKindModifierProtected  ScriptElementKindModifier = "protected"
	ScriptElementKindModifierExported   ScriptElementKindModifier = "export"
	ScriptElementKindModifierAmbient    ScriptElementKindModifier = "declare"
	ScriptElementKindModifierStatic     ScriptElementKindModifier = "static"
	ScriptElementKindModifierAbstract   ScriptElementKindModifier = "abstract"
	ScriptElementKindModifierOptional   ScriptElementKindModifier = "optional"
	ScriptElementKindModifierDeprecated ScriptElementKindModifier = "deprecated"
	ScriptElementKindModifierDts        ScriptElementKindModifier = ".d.ts"
	ScriptElementKindModifierTs         ScriptElementKindModifier = ".ts"
	ScriptElementKindModifierTsx        ScriptElementKindModifier = ".tsx"
	ScriptElementKindModifierJs         ScriptElementKindModifier = ".js"
	ScriptElementKindModifierJsx        ScriptElementKindModifier = ".jsx"
	ScriptElementKindModifierJson       ScriptElementKindModifier = ".json"
	ScriptElementKindModifierDmts       ScriptElementKindModifier = ".d.mts"
	ScriptElementKindModifierMts        ScriptElementKindModifier = ".mts"
	ScriptElementKindModifierMjs        ScriptElementKindModifier = ".mjs"
	ScriptElementKindModifierDcts       ScriptElementKindModifier = ".d.cts"
	ScriptElementKindModifierCts        ScriptElementKindModifier = ".cts"
	ScriptElementKindModifierCjs        ScriptElementKindModifier = ".cjs"
)

var fileExtensionKindModifiers = []ScriptElementKindModifier{
	ScriptElementKindModifierDts,
	ScriptElementKindModifierTs,
	ScriptElementKindModifierTsx,
	ScriptElementKindModifierJs,
	ScriptElementKindModifierJsx,
	ScriptElementKindModifierJson,
	ScriptElementKindModifierDmts,
	ScriptElementKindModifierMts,
	ScriptElementKindModifierMjs,
	ScriptElementKindModifierDcts,
	ScriptElementKindModifierCts,
	ScriptElementKindModifierCjs,
}

func getSymbolKind(typeChecker *checker.Checker, symbol *ast.Symbol, location *ast.Node) ScriptElementKind {
	result := getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker, symbol, location)
	if result != ScriptElementKindUnknown {
		return result
	}

	flags := checker.GetCombinedLocalAndExportSymbolFlags(symbol)
	if flags&ast.SymbolFlagsClass != 0 {
		decl := ast.GetDeclarationOfKind(symbol, ast.KindClassExpression)
		if decl != nil {
			return ScriptElementKindLocalClassElement
		}
		return ScriptElementKindClassElement
	}
	if flags&ast.SymbolFlagsEnum != 0 {
		return ScriptElementKindEnumElement
	}
	if flags&ast.SymbolFlagsTypeAlias != 0 {
		return ScriptElementKindTypeElement
	}
	if flags&ast.SymbolFlagsInterface != 0 {
		return ScriptElementKindInterfaceElement
	}
	if flags&ast.SymbolFlagsTypeParameter != 0 {
		return ScriptElementKindTypeParameterElement
	}
	if flags&ast.SymbolFlagsEnumMember != 0 {
		return ScriptElementKindEnumMemberElement
	}
	if flags&ast.SymbolFlagsAlias != 0 {
		return ScriptElementKindAlias
	}
	if flags&ast.SymbolFlagsModule != 0 {
		return ScriptElementKindModuleElement
	}

	return ScriptElementKindUnknown
}

func getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(typeChecker *checker.Checker, symbol *ast.Symbol, location *ast.Node) ScriptElementKind {
	roots := typeChecker.GetRootSymbols(symbol)
	// If this is a method from a mapped type, leave as a method so long as it still has a call signature, as opposed to e.g.
	// `{ [K in keyof I]: number }`.
	if len(roots) == 1 &&
		roots[0].Flags&ast.SymbolFlagsMethod != 0 &&
		len(typeChecker.GetCallSignatures(typeChecker.GetNonNullableType(typeChecker.GetTypeOfSymbolAtLocation(symbol, location)))) > 0 {
		return ScriptElementKindMemberFunctionElement
	}

	if typeChecker.IsUndefinedSymbol(symbol) {
		return ScriptElementKindVariableElement
	}
	if typeChecker.IsArgumentsSymbol(symbol) {
		return ScriptElementKindLocalVariableElement
	}
	if location.Kind == ast.KindThisKeyword && ast.IsExpression(location) ||
		ast.IsThisInTypeQuery(location) {
		return ScriptElementKindParameterElement
	}

	flags := checker.GetCombinedLocalAndExportSymbolFlags(symbol)
	if flags&ast.SymbolFlagsVariable != 0 {
		if isFirstDeclarationOfSymbolParameter(symbol) {
			return ScriptElementKindParameterElement
		} else if symbol.ValueDeclaration != nil && ast.IsVarConst(symbol.ValueDeclaration) {
			return ScriptElementKindConstElement
		} else if symbol.ValueDeclaration != nil && ast.IsVarUsing(symbol.ValueDeclaration) {
			return ScriptElementKindVariableUsingElement
		} else if symbol.ValueDeclaration != nil && ast.IsVarAwaitUsing(symbol.ValueDeclaration) {
			return ScriptElementKindVariableAwaitUsingElement
		} else if core.Some(symbol.Declarations, ast.IsLet) {
			return ScriptElementKindLetElement
		}
		if isLocalVariableOrFunction(symbol) {
			return ScriptElementKindLocalVariableElement
		}
		return ScriptElementKindVariableElement
	}
	if flags&ast.SymbolFlagsFunction != 0 {
		if isLocalVariableOrFunction(symbol) {
			return ScriptElementKindLocalFunctionElement
		}
		return ScriptElementKindFunctionElement
	}
	// FIXME: getter and setter use the same symbol. And it is rare to use only setter without getter, so in most cases the symbol always has getter flag.
	// So, even when the location is just on the declaration of setter, this function returns getter.
	if flags&ast.SymbolFlagsGetAccessor != 0 {
		return ScriptElementKindMemberGetAccessorElement
	}
	if flags&ast.SymbolFlagsSetAccessor != 0 {
		return ScriptElementKindMemberSetAccessorElement
	}
	if flags&ast.SymbolFlagsMethod != 0 {
		return ScriptElementKindMemberFunctionElement
	}
	if flags&ast.SymbolFlagsConstructor != 0 {
		return ScriptElementKindConstructorImplementationElement
	}
	if flags&ast.SymbolFlagsSignature != 0 {
		return ScriptElementKindIndexSignatureElement
	}

	if flags&ast.SymbolFlagsProperty != 0 {
		if flags&ast.SymbolFlagsTransient != 0 &&
			symbol.CheckFlags&ast.CheckFlagsSynthetic != 0 {
			// If union property is result of union of non method (property/accessors/variables), it is labeled as property
			var unionPropertyKind ScriptElementKind
			for _, rootSymbol := range roots {
				if rootSymbol.Flags&(ast.SymbolFlagsPropertyOrAccessor|ast.SymbolFlagsVariable) != 0 {
					unionPropertyKind = ScriptElementKindMemberVariableElement
					break
				}
			}
			if unionPropertyKind == ScriptElementKindUnknown {
				// If this was union of all methods,
				// make sure it has call signatures before we can label it as method.
				typeOfUnionProperty := typeChecker.GetTypeOfSymbolAtLocation(symbol, location)
				if len(typeChecker.GetCallSignatures(typeOfUnionProperty)) > 0 {
					return ScriptElementKindMemberFunctionElement
				}
				return ScriptElementKindMemberVariableElement
			}
			return unionPropertyKind
		}

		return ScriptElementKindMemberVariableElement
	}

	return ScriptElementKindUnknown
}

func isFirstDeclarationOfSymbolParameter(symbol *ast.Symbol) bool {
	var declaration *ast.Node
	if len(symbol.Declarations) > 0 {
		declaration = symbol.Declarations[0]
	}
	result := ast.FindAncestorOrQuit(declaration, func(n *ast.Node) ast.FindAncestorResult {
		if ast.IsParameter(n) {
			return ast.FindAncestorTrue
		}
		if ast.IsBindingElement(n) || ast.IsObjectBindingPattern(n) || ast.IsArrayBindingPattern(n) {
			return ast.FindAncestorFalse
		}
		return ast.FindAncestorQuit
	})

	return result != nil
}

func isLocalVariableOrFunction(symbol *ast.Symbol) bool {
	if symbol.Parent != nil {
		return false // This is exported symbol
	}

	for _, decl := range symbol.Declarations {
		// Function expressions are local
		if decl.Kind == ast.KindFunctionExpression {
			return true
		}

		if decl.Kind != ast.KindVariableDeclaration && decl.Kind != ast.KindFunctionDeclaration {
			continue
		}

		// If the parent is not source file or module block, it is a local variable.
		for parent := decl.Parent; !ast.IsFunctionBlock(parent); parent = parent.Parent {
			// Reached source file or module block
			if parent.Kind == ast.KindSourceFile || parent.Kind == ast.KindModuleBlock {
				continue
			}
		}

		// Parent is in function block.
		return true
	}
	return false
}

func getSymbolModifiers(typeChecker *checker.Checker, symbol *ast.Symbol) core.Set[ScriptElementKindModifier] {
	if symbol == nil {
		return core.Set[ScriptElementKindModifier]{}
	}

	modifiers := getNormalizedSymbolModifiers(typeChecker, symbol)
	if symbol.Flags&ast.SymbolFlagsAlias != 0 {
		resolvedSymbol := typeChecker.GetAliasedSymbol(symbol)
		if resolvedSymbol != symbol {
			aliasModifiers := getNormalizedSymbolModifiers(typeChecker, resolvedSymbol)
			for modifier := range aliasModifiers.Keys() {
				modifiers.Add(modifier)
			}
		}
	}
	if symbol.Flags&ast.SymbolFlagsOptional != 0 {
		modifiers.Add(ScriptElementKindModifierOptional)
	}

	return modifiers
}

func getNormalizedSymbolModifiers(typeChecker *checker.Checker, symbol *ast.Symbol) core.Set[ScriptElementKindModifier] {
	var modifierSet core.Set[ScriptElementKindModifier]
	if len(symbol.Declarations) > 0 {
		declaration := symbol.Declarations[0]
		declarations := symbol.Declarations[1:]
		// omit deprecated flag if some declarations are not deprecated
		var excludeFlags ast.ModifierFlags
		if len(declarations) > 0 &&
			typeChecker.IsDeprecatedDeclaration(declaration) && // !!! include jsdoc node flags
			core.Some(declarations, func(d *ast.Node) bool { return !typeChecker.IsDeprecatedDeclaration(d) }) {
			excludeFlags = ast.ModifierFlagsDeprecated
		} else {
			excludeFlags = ast.ModifierFlagsNone
		}
		modifierSet = getNodeModifiers(declaration, excludeFlags)
	}

	return modifierSet
}

func getNodeModifiers(node *ast.Node, excludeFlags ast.ModifierFlags) core.Set[ScriptElementKindModifier] {
	var result core.Set[ScriptElementKindModifier]
	var flags ast.ModifierFlags
	if ast.IsDeclaration(node) {
		flags = ast.GetCombinedModifierFlags(node) & ^excludeFlags // !!! include jsdoc node flags
	}

	if flags&ast.ModifierFlagsPrivate != 0 {
		result.Add(ScriptElementKindModifierPrivate)
	}
	if flags&ast.ModifierFlagsProtected != 0 {
		result.Add(ScriptElementKindModifierProtected)
	}
	if flags&ast.ModifierFlagsPublic != 0 {
		result.Add(ScriptElementKindModifierPublic)
	}
	if flags&ast.ModifierFlagsStatic != 0 {
		result.Add(ScriptElementKindModifierStatic)
	}
	if flags&ast.ModifierFlagsAbstract != 0 {
		result.Add(ScriptElementKindModifierAbstract)
	}
	if flags&ast.ModifierFlagsExport != 0 {
		result.Add(ScriptElementKindModifierExported)
	}
	if flags&ast.ModifierFlagsDeprecated != 0 {
		result.Add(ScriptElementKindModifierDeprecated)
	}
	if flags&ast.ModifierFlagsAmbient != 0 {
		result.Add(ScriptElementKindModifierAmbient)
	}
	if node.Flags&ast.NodeFlagsAmbient != 0 {
		result.Add(ScriptElementKindModifierAmbient)
	}
	if node.Kind == ast.KindExportAssignment {
		result.Add(ScriptElementKindModifierExported)
	}

	return result
}
