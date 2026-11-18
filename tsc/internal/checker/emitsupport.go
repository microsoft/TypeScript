package checker

import (
	"maps"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
)

func (c *Checker) isDeclarationVisible(node *ast.Node) bool {
	if !ast.IsParseTreeNode(node) {
		return false
	}
	if node == nil {
		return false
	}

	links := c.emitResolverLinks.declarationLinks.Get(node)
	if links.isVisible == core.TSUnknown {
		if c.determineIfDeclarationIsVisible(node) {
			links.isVisible = core.TSTrue
		} else {
			links.isVisible = core.TSFalse
		}
	}
	return links.isVisible == core.TSTrue
}

func (c *Checker) determineIfDeclarationIsVisible(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindJSDocCallbackTag,
		// ast.KindJSDocEnumTag, // !!! TODO: JSDoc @enum support?
		ast.KindJSDocTypedefTag:
		// Top-level jsdoc type aliases are considered exported
		// First parent is comment node, second is hosting declaration or token; we only care about those tokens or declarations whose parent is a source file
		return node.Parent != nil && node.Parent.Parent != nil && node.Parent.Parent.Parent != nil && ast.IsSourceFile(node.Parent.Parent.Parent)
	case ast.KindBindingElement:
		return c.isDeclarationVisible(node.Parent.Parent)
	case ast.KindVariableDeclaration,
		ast.KindModuleDeclaration,
		ast.KindClassDeclaration,
		ast.KindInterfaceDeclaration,
		ast.KindTypeAliasDeclaration,
		ast.KindJSTypeAliasDeclaration,
		ast.KindFunctionDeclaration,
		ast.KindEnumDeclaration,
		ast.KindImportEqualsDeclaration:
		if ast.IsVariableDeclaration(node) {
			if ast.IsBindingPattern(node.Name()) &&
				len(node.Name().Elements()) == 0 {
				// If the binding pattern is empty, this variable declaration is not visible
				return false
			}
			// falls through
		}
		// External module augmentation is always visible
		// A @typedef at top-level in an external module is always visible
		if ast.IsExternalModuleAugmentation(node) || ast.IsImplicitlyExportedJSDocDeclaration(node) {
			return true
		}
		parent := ast.GetDeclarationContainer(node)
		// If the node is not exported or it is not ambient module element (except import declaration)
		if c.getCombinedModifierFlagsCached(node)&ast.ModifierFlagsExport == 0 &&
			!(node.Kind != ast.KindImportEqualsDeclaration && parent.Kind != ast.KindSourceFile && parent.Flags&ast.NodeFlagsAmbient != 0) {
			return ast.IsGlobalSourceFile(parent)
		}
		// Exported members/ambient module elements (exception import declaration) are visible if parent is visible
		return c.isDeclarationVisible(parent)

	case ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature:
		if c.GetEffectiveDeclarationFlags(node, ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
			// Private/protected properties/methods are not visible
			return false
		}
		// Public properties/methods are visible if its parents are visible, so:
		return c.isDeclarationVisible(node.Parent)

	case ast.KindConstructor,
		ast.KindConstructSignature,
		ast.KindCallSignature,
		ast.KindIndexSignature,
		ast.KindParameter,
		ast.KindModuleBlock,
		ast.KindFunctionType,
		ast.KindConstructorType,
		ast.KindTypeLiteral,
		ast.KindTypeReference,
		ast.KindArrayType,
		ast.KindTupleType,
		ast.KindUnionType,
		ast.KindIntersectionType,
		ast.KindParenthesizedType,
		ast.KindNamedTupleMember:
		return c.isDeclarationVisible(node.Parent)

	// Default binding, import specifier and namespace import is visible
	// only on demand so by default it is not visible
	case ast.KindImportClause,
		ast.KindNamespaceImport,
		ast.KindImportSpecifier:
		return false

	// Type parameters are always visible
	case ast.KindTypeParameter:
		return true
	// Source file and namespace export are always visible
	case ast.KindSourceFile,
		ast.KindNamespaceExportDeclaration:
		return true

	// Export assignments do not create name bindings outside the module
	case ast.KindExportAssignment:
		return false

	// An `export {X}` (without a module specifier) is itself a visible re-export of
	// the named binding; it contributes to the symbol's external visibility.
	case ast.KindExportSpecifier:
		exportDecl := node.Parent.Parent
		if ast.IsExportDeclaration(exportDecl) && exportDecl.AsExportDeclaration().ModuleSpecifier == nil {
			return c.isDeclarationVisible(exportDecl.Parent)
		}
		return false

	default:
		return false
	}
}

func getMeaningOfEntityNameReference(entityName *ast.Node) ast.SymbolFlags {
	// get symbol of the first identifier of the entityName
	if entityName.Parent.Kind == ast.KindTypeQuery ||
		entityName.Parent.Kind == ast.KindExpressionWithTypeArguments && !ast.IsPartOfTypeNode(entityName.Parent) ||
		entityName.Parent.Kind == ast.KindComputedPropertyName ||
		entityName.Parent.Kind == ast.KindTypePredicate && entityName.Parent.AsTypePredicateNode().ParameterName == entityName ||
		entityName.Parent.Kind == ast.KindBinaryExpression {
		// Typeof value
		return ast.SymbolFlagsValue | ast.SymbolFlagsExportValue
	}
	if entityName.Kind == ast.KindQualifiedName || entityName.Kind == ast.KindPropertyAccessExpression ||
		entityName.Parent.Kind == ast.KindImportEqualsDeclaration ||
		(entityName.Parent.Kind == ast.KindQualifiedName && entityName.Parent.AsQualifiedName().Left == entityName) ||
		(entityName.Parent.Kind == ast.KindPropertyAccessExpression && entityName.Parent.Expression() == entityName) ||
		(entityName.Parent.Kind == ast.KindElementAccessExpression && entityName.Parent.Expression() == entityName) {
		// Left identifier from type reference or TypeAlias
		// Entity name of the import declaration
		return ast.SymbolFlagsNamespace
	}
	// Type Reference or TypeAlias entity = Identifier
	return ast.SymbolFlagsType
}

func (c *Checker) isEntityNameVisible(entityName *ast.Node, enclosingDeclaration *ast.Node, shouldComputeAliasToMakeVisible bool) printer.SymbolAccessibilityResult {
	if !ast.IsParseTreeNode(entityName) {
		return printer.SymbolAccessibilityResult{Accessibility: printer.SymbolAccessibilityNotAccessible}
	}

	meaning := getMeaningOfEntityNameReference(entityName)
	firstIdentifier := ast.GetFirstIdentifier(entityName)

	symbol := c.resolveName(enclosingDeclaration, firstIdentifier.Text(), meaning, nil, false, false)

	if symbol != nil && symbol.Flags()&ast.SymbolFlagsTypeParameter != 0 && meaning&ast.SymbolFlagsType != 0 {
		return printer.SymbolAccessibilityResult{Accessibility: printer.SymbolAccessibilityAccessible}
	}

	if symbol == nil && ast.IsThisIdentifier(firstIdentifier) {
		sym := c.getSymbolOfDeclaration(c.getThisContainer(firstIdentifier, false, false))
		if c.IsSymbolAccessible(sym, enclosingDeclaration, meaning, false).Accessibility == printer.SymbolAccessibilityAccessible {
			return printer.SymbolAccessibilityResult{Accessibility: printer.SymbolAccessibilityAccessible}
		}
	}

	if symbol == nil {
		return printer.SymbolAccessibilityResult{
			Accessibility:   printer.SymbolAccessibilityNotResolved,
			ErrorSymbolName: firstIdentifier.Text(),
			ErrorNode:       firstIdentifier,
		}
	}

	visible := c.hasVisibleDeclarations(symbol, shouldComputeAliasToMakeVisible)
	if visible != nil {
		return *visible
	}

	return printer.SymbolAccessibilityResult{
		Accessibility:   printer.SymbolAccessibilityNotAccessible,
		ErrorSymbolName: firstIdentifier.Text(),
		ErrorNode:       firstIdentifier,
	}
}

func noopAddVisibleAlias(declaration *ast.Node, aliasingStatement *ast.Node) {}

func (c *Checker) hasVisibleDeclarations(symbol *ast.Symbol, shouldComputeAliasToMakeVisible bool) *printer.SymbolAccessibilityResult {
	var aliasesToMakeVisibleSet map[ast.NodeId]*ast.Node

	var addVisibleAlias func(declaration *ast.Node, aliasingStatement *ast.Node)
	if shouldComputeAliasToMakeVisible {
		addVisibleAlias = func(declaration *ast.Node, aliasingStatement *ast.Node) {
			c.emitResolverLinks.declarationLinks.Get(declaration).isVisible = core.TSTrue
			if aliasesToMakeVisibleSet == nil {
				aliasesToMakeVisibleSet = make(map[ast.NodeId]*ast.Node)
			}
			aliasesToMakeVisibleSet[ast.GetNodeId(declaration)] = aliasingStatement
		}
	} else {
		addVisibleAlias = noopAddVisibleAlias
	}

	for _, declaration := range symbol.Declarations() {
		if ast.IsIdentifier(declaration) {
			continue
		}
		if !c.isDeclarationVisible(declaration) {
			// Mark the unexported alias as visible if its parent is visible
			// because these kind of aliases can be used to name types in declaration file
			anyImportSyntax := getAnyImportSyntax(declaration)
			if anyImportSyntax != nil &&
				!ast.HasSyntacticModifier(anyImportSyntax, ast.ModifierFlagsExport) && // import clause without export
				c.isDeclarationVisible(anyImportSyntax.Parent) {
				addVisibleAlias(declaration, anyImportSyntax)
				continue
			}
			if ast.IsVariableDeclaration(declaration) && ast.IsVariableStatement(declaration.Parent.Parent) &&
				!ast.HasSyntacticModifier(declaration.Parent.Parent, ast.ModifierFlagsExport) && // unexported variable statement
				c.isDeclarationVisible(declaration.Parent.Parent.Parent) {
				addVisibleAlias(declaration, declaration.Parent.Parent)
				continue
			}
			if ast.IsLateVisibilityPaintedStatement(declaration) && // unexported top-level statement
				!ast.HasSyntacticModifier(declaration, ast.ModifierFlagsExport) &&
				c.isDeclarationVisible(declaration.Parent) {
				addVisibleAlias(declaration, declaration)
				continue
			}
			if ast.IsBindingElement(declaration) {
				if symbol.Flags()&ast.SymbolFlagsAlias != 0 && ast.IsInJSFile(declaration) && declaration.Parent != nil && declaration.Parent.Parent != nil && // exported import-like top-level JS require statement
					ast.IsVariableDeclaration(declaration.Parent.Parent) &&
					declaration.Parent.Parent.Parent.Parent != nil && ast.IsVariableStatement(declaration.Parent.Parent.Parent.Parent) &&
					!ast.HasSyntacticModifier(declaration.Parent.Parent.Parent.Parent, ast.ModifierFlagsExport) &&
					declaration.Parent.Parent.Parent.Parent.Parent != nil && // check if the thing containing the variable statement is visible (ie, the file)
					c.isDeclarationVisible(declaration.Parent.Parent.Parent.Parent.Parent) {
					addVisibleAlias(declaration, declaration.Parent.Parent.Parent.Parent)
					continue
				}
				if symbol.Flags()&ast.SymbolFlagsBlockScopedVariable != 0 {
					rootDeclaration := ast.WalkUpBindingElementsAndPatterns(declaration)
					if ast.IsParameterDeclaration(rootDeclaration) {
						return nil
					}
					variableStatement := rootDeclaration.Parent.Parent
					if !ast.IsVariableStatement(variableStatement) {
						return nil
					}
					if ast.HasSyntacticModifier(variableStatement, ast.ModifierFlagsExport) {
						continue // no alias to add, already exported
					}
					if !c.isDeclarationVisible(variableStatement.Parent) {
						return nil // not visible
					}
					addVisibleAlias(declaration, variableStatement)
					continue
				}
			}

			// Declaration is not visible
			return nil
		}
	}

	return &printer.SymbolAccessibilityResult{
		Accessibility:        printer.SymbolAccessibilityAccessible,
		AliasesToMakeVisible: slices.Collect(maps.Values(aliasesToMakeVisibleSet)),
	}
}

func (c *Checker) requiresAddingImplicitUndefined(declaration *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool {
	if !ast.IsParseTreeNode(declaration) {
		return false
	}
	switch declaration.Kind {
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindJSDocPropertyTag:
		if symbol == nil {
			symbol = c.getSymbolOfDeclaration(declaration)
		}
		t := c.getTypeOfSymbol(symbol)
		c.mappedSymbolLinks.Has(symbol)
		return (symbol.Flags()&ast.SymbolFlagsProperty != 0) && (symbol.Flags()&ast.SymbolFlagsOptional != 0) && isOptionalDeclaration(declaration) && c.ReverseMappedSymbolLinks.Has(symbol) && c.ReverseMappedSymbolLinks.Get(symbol).mappedType != nil && containsNonMissingUndefinedType(c, t)
	case ast.KindParameter, ast.KindJSDocParameterTag:
		return c.requiresAddingImplicitUndefinedWorker(declaration, enclosingDeclaration)
	default:
		panic("Node cannot possibly require adding undefined")
	}
}

func (c *Checker) requiresAddingImplicitUndefinedWorker(parameter *ast.Node, enclosingDeclaration *ast.Node) bool {
	return (c.isRequiredInitializedParameter(parameter, enclosingDeclaration) || c.isOptionalUninitializedParameterProperty(parameter)) && !c.declaredParameterTypeContainsUndefined(parameter)
}

func (c *Checker) declaredParameterTypeContainsUndefined(parameter *ast.Node) bool {
	// typeNode := getNonlocalEffectiveTypeAnnotationNode(parameter); // !!! JSDoc Support
	typeNode := parameter.Type()
	if typeNode == nil {
		return false
	}
	t := c.getTypeFromTypeNode(typeNode)
	// allow error type here to avoid confusing errors that the annotation has to contain undefined when it does in cases like this:
	//
	// export function fn(x?: Unresolved | undefined): void {}
	return c.isErrorType(t) || c.containsUndefinedType(t)
}

func (c *Checker) isOptionalUninitializedParameterProperty(parameter *ast.Node) bool {
	return c.strictNullChecks &&
		c.isOptionalParameter(parameter) &&
		( /*isJSDocParameterTag(parameter) ||*/ parameter.Initializer() == nil) && // !!! TODO: JSDoc support
		ast.HasSyntacticModifier(parameter, ast.ModifierFlagsParameterPropertyModifier)
}

func (c *Checker) isRequiredInitializedParameter(parameter *ast.Node, enclosingDeclaration *ast.Node) bool {
	if !c.strictNullChecks || c.isOptionalParameter(parameter) || /*isJSDocParameterTag(parameter) ||*/ parameter.Initializer() == nil { // !!! TODO: JSDoc Support
		return false
	}
	if ast.HasSyntacticModifier(parameter, ast.ModifierFlagsParameterPropertyModifier) {
		return enclosingDeclaration != nil && ast.IsFunctionLikeDeclaration(enclosingDeclaration)
	}
	return true
}
