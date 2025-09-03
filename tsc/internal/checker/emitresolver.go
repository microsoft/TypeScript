package checker

import (
	"maps"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/binder"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/evaluator"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/nodebuilder"
	"github.com/microsoft/typescript-go/internal/printer"
)

var _ printer.EmitResolver = (*emitResolver)(nil)

// Links for jsx
type JSXLinks struct {
	importRef *ast.Node
}

// Links for declarations

type DeclarationLinks struct {
	isVisible core.Tristate // if declaration is depended upon by exported declarations
}

type DeclarationFileLinks struct {
	aliasesMarked bool // if file has had alias visibility marked
}

type emitResolver struct {
	checker                 *Checker
	checkerMu               sync.Mutex
	isValueAliasDeclaration func(node *ast.Node) bool
	aliasMarkingVisitor     func(node *ast.Node) bool
	referenceResolver       binder.ReferenceResolver
	jsxLinks                core.LinkStore[*ast.Node, JSXLinks]
	declarationLinks        core.LinkStore[*ast.Node, DeclarationLinks]
	declarationFileLinks    core.LinkStore[*ast.Node, DeclarationFileLinks]
}

func newEmitResolver(checker *Checker) *emitResolver {
	e := &emitResolver{checker: checker}
	e.isValueAliasDeclaration = e.isValueAliasDeclarationWorker
	e.aliasMarkingVisitor = e.aliasMarkingVisitorWorker
	return e
}

func (r *emitResolver) GetJsxFactoryEntity(location *ast.Node) *ast.Node {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.checker.getJsxFactoryEntity(location)
}

func (r *emitResolver) GetJsxFragmentFactoryEntity(location *ast.Node) *ast.Node {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.checker.getJsxFragmentFactoryEntity(location)
}

func (r *emitResolver) IsOptionalParameter(node *ast.Node) bool {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.isOptionalParameter(node)
}

func (r *emitResolver) IsLateBound(node *ast.Node) bool {
	// TODO: Require an emitContext to construct an EmitResolver, remove all emitContext arguments
	// node = r.emitContext.ParseNode(node)
	if node == nil {
		return false
	}
	if !ast.IsParseTreeNode(node) {
		return false
	}
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	symbol := r.checker.getSymbolOfDeclaration(node)
	if symbol == nil {
		return false
	}
	return symbol.CheckFlags&ast.CheckFlagsLate != 0
}

func (r *emitResolver) GetEnumMemberValue(node *ast.Node) evaluator.Result {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(node) {
		return evaluator.NewResult(nil, false, false, false)
	}
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	r.checker.computeEnumMemberValues(node.Parent)
	if !r.checker.enumMemberLinks.Has(node) {
		return evaluator.NewResult(nil, false, false, false)
	}
	return r.checker.enumMemberLinks.Get(node).value
}

func (r *emitResolver) IsDeclarationVisible(node *ast.Node) bool {
	// Only lock on external API func to prevent deadlocks
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.isDeclarationVisible(node)
}

func (r *emitResolver) isDeclarationVisible(node *ast.Node) bool {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(node) {
		return false
	}
	if node == nil {
		return false
	}

	links := r.declarationLinks.Get(node)
	if links.isVisible == core.TSUnknown {
		if r.determineIfDeclarationIsVisible(node) {
			links.isVisible = core.TSTrue
		} else {
			links.isVisible = core.TSFalse
		}
	}
	return links.isVisible == core.TSTrue
}

func (r *emitResolver) determineIfDeclarationIsVisible(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindJSDocCallbackTag,
		// ast.KindJSDocEnumTag, // !!! TODO: JSDoc @enum support?
		ast.KindJSDocTypedefTag:
		// Top-level jsdoc type aliases are considered exported
		// First parent is comment node, second is hosting declaration or token; we only care about those tokens or declarations whose parent is a source file
		return node.Parent != nil && node.Parent.Parent != nil && node.Parent.Parent.Parent != nil && ast.IsSourceFile(node.Parent.Parent.Parent)
	case ast.KindBindingElement:
		return r.isDeclarationVisible(node.Parent.Parent)
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
				len(node.Name().AsBindingPattern().Elements.Nodes) == 0 {
				// If the binding pattern is empty, this variable declaration is not visible
				return false
			}
			// falls through
		}
		// external module augmentation is always visible
		if ast.IsExternalModuleAugmentation(node) {
			return true
		}
		parent := ast.GetDeclarationContainer(node)
		// If the node is not exported or it is not ambient module element (except import declaration)
		if r.checker.getCombinedModifierFlagsCached(node)&ast.ModifierFlagsExport == 0 &&
			!(node.Kind != ast.KindImportEqualsDeclaration && parent.Kind != ast.KindSourceFile && parent.Flags&ast.NodeFlagsAmbient != 0) {
			return ast.IsGlobalSourceFile(parent)
		}
		// Exported members/ambient module elements (exception import declaration) are visible if parent is visible
		return r.isDeclarationVisible(parent)

	case ast.KindPropertyDeclaration,
		ast.KindPropertySignature,
		ast.KindGetAccessor,
		ast.KindSetAccessor,
		ast.KindMethodDeclaration,
		ast.KindMethodSignature:
		if r.checker.GetEffectiveDeclarationFlags(node, ast.ModifierFlagsPrivate|ast.ModifierFlagsProtected) != 0 {
			// Private/protected properties/methods are not visible
			return false
		}
		// Public properties/methods are visible if its parents are visible, so:
		return r.isDeclarationVisible(node.Parent)

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
		return r.isDeclarationVisible(node.Parent)

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
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		return false

	default:
		return false
	}
}

func (r *emitResolver) PrecalculateDeclarationEmitVisibility(file *ast.SourceFile) {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	if r.declarationFileLinks.Get(file.AsNode()).aliasesMarked {
		return
	}
	r.declarationFileLinks.Get(file.AsNode()).aliasesMarked = true
	// TODO: Does this even *have* to be an upfront walk? If it's not possible for a
	// import a = a.b.c statement to chain into exposing a statement in a sibling scope,
	// it could at least be pushed into scope entry -  then it wouldn't need to be recursive.
	file.AsNode().ForEachChild(r.aliasMarkingVisitor)
}

func (r *emitResolver) aliasMarkingVisitorWorker(node *ast.Node) bool {
	switch node.Kind {
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		if node.AsExportAssignment().Expression.Kind == ast.KindIdentifier {
			r.markLinkedAliases(node.Expression())
		}
	case ast.KindExportSpecifier:
		r.markLinkedAliases(node.PropertyNameOrName())
	}
	return node.ForEachChild(r.aliasMarkingVisitor)
}

// Sets the isVisible link on statements the Identifier or ExportName node points at
// Follows chains of import d = a.b.c
func (r *emitResolver) markLinkedAliases(node *ast.Node) {
	var exportSymbol *ast.Symbol
	if node.Kind != ast.KindStringLiteral && node.Parent != nil && node.Parent.Kind == ast.KindExportAssignment {
		exportSymbol = r.checker.resolveName(node, node.AsIdentifier().Text, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias /*nameNotFoundMessage*/, nil /*isUse*/, false, false)
	} else if node.Parent.Kind == ast.KindExportSpecifier {
		exportSymbol = r.checker.getTargetOfExportSpecifier(node.Parent, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias, false)
	}

	visited := make(map[ast.SymbolId]struct{}, 2) // guard against circular imports
	for exportSymbol != nil {
		_, seen := visited[ast.GetSymbolId(exportSymbol)]
		if seen {
			break
		}
		visited[ast.GetSymbolId(exportSymbol)] = struct{}{}

		var nextSymbol *ast.Symbol
		for _, declaration := range exportSymbol.Declarations {
			r.declarationLinks.Get(declaration).isVisible = core.TSTrue

			if ast.IsInternalModuleImportEqualsDeclaration(declaration) {
				// Add the referenced top container visible
				internalModuleReference := declaration.AsImportEqualsDeclaration().ModuleReference
				firstIdentifier := ast.GetFirstIdentifier(internalModuleReference)
				importSymbol := r.checker.resolveName(declaration, firstIdentifier.AsIdentifier().Text, ast.SymbolFlagsValue|ast.SymbolFlagsType|ast.SymbolFlagsNamespace|ast.SymbolFlagsAlias /*nameNotFoundMessage*/, nil /*isUse*/, false, false)
				nextSymbol = importSymbol
			}
		}

		exportSymbol = nextSymbol
	}
}

func getMeaningOfEntityNameReference(entityName *ast.Node) ast.SymbolFlags {
	// get symbol of the first identifier of the entityName
	if entityName.Parent.Kind == ast.KindTypeQuery ||
		entityName.Parent.Kind == ast.KindExpressionWithTypeArguments && !ast.IsPartOfTypeNode(entityName.Parent) ||
		entityName.Parent.Kind == ast.KindComputedPropertyName ||
		entityName.Parent.Kind == ast.KindTypePredicate && entityName.Parent.AsTypePredicateNode().ParameterName == entityName {
		// Typeof value
		return ast.SymbolFlagsValue | ast.SymbolFlagsExportValue
	}
	if entityName.Kind == ast.KindQualifiedName || entityName.Kind == ast.KindPropertyAccessExpression ||
		entityName.Parent.Kind == ast.KindImportEqualsDeclaration ||
		(entityName.Parent.Kind == ast.KindQualifiedName && entityName.Parent.AsQualifiedName().Left == entityName) ||
		(entityName.Parent.Kind == ast.KindPropertyAccessExpression && (entityName.Parent.AsPropertyAccessExpression()).Expression == entityName) ||
		(entityName.Parent.Kind == ast.KindElementAccessExpression && (entityName.Parent.AsElementAccessExpression()).Expression == entityName) {
		// Left identifier from type reference or TypeAlias
		// Entity name of the import declaration
		return ast.SymbolFlagsNamespace
	}
	// Type Reference or TypeAlias entity = Identifier
	return ast.SymbolFlagsType
}

func (r *emitResolver) IsEntityNameVisible(entityName *ast.Node, enclosingDeclaration *ast.Node) printer.SymbolAccessibilityResult {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.isEntityNameVisible(entityName, enclosingDeclaration, true)
}

func (r *emitResolver) isEntityNameVisible(entityName *ast.Node, enclosingDeclaration *ast.Node, shouldComputeAliasToMakeVisible bool) printer.SymbolAccessibilityResult {
	// node = r.emitContext.ParseNode(entityName)
	if !ast.IsParseTreeNode(entityName) {
		return printer.SymbolAccessibilityResult{Accessibility: printer.SymbolAccessibilityNotAccessible}
	}

	meaning := getMeaningOfEntityNameReference(entityName)
	firstIdentifier := ast.GetFirstIdentifier(entityName)

	symbol := r.checker.resolveName(enclosingDeclaration, firstIdentifier.Text(), meaning, nil, false, false)

	if symbol != nil && symbol.Flags&ast.SymbolFlagsTypeParameter != 0 && meaning&ast.SymbolFlagsType != 0 {
		return printer.SymbolAccessibilityResult{Accessibility: printer.SymbolAccessibilityAccessible}
	}

	if symbol == nil && ast.IsThisIdentifier(firstIdentifier) {
		sym := r.checker.getSymbolOfDeclaration(r.checker.getThisContainer(firstIdentifier, false, false))
		if r.isSymbolAccessible(sym, enclosingDeclaration, meaning, false).Accessibility == printer.SymbolAccessibilityAccessible {
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

	visible := r.hasVisibleDeclarations(symbol, shouldComputeAliasToMakeVisible)
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

func (r *emitResolver) hasVisibleDeclarations(symbol *ast.Symbol, shouldComputeAliasToMakeVisible bool) *printer.SymbolAccessibilityResult {
	var aliasesToMakeVisibleSet map[ast.NodeId]*ast.Node

	var addVisibleAlias func(declaration *ast.Node, aliasingStatement *ast.Node)
	if shouldComputeAliasToMakeVisible {
		addVisibleAlias = func(declaration *ast.Node, aliasingStatement *ast.Node) {
			r.declarationLinks.Get(declaration).isVisible = core.TSTrue
			if aliasesToMakeVisibleSet == nil {
				aliasesToMakeVisibleSet = make(map[ast.NodeId]*ast.Node)
			}
			aliasesToMakeVisibleSet[ast.GetNodeId(declaration)] = aliasingStatement
		}
	} else {
		addVisibleAlias = noopAddVisibleAlias
	}

	for _, declaration := range symbol.Declarations {
		if ast.IsIdentifier(declaration) {
			continue
		}

		if !r.isDeclarationVisible(declaration) {
			// Mark the unexported alias as visible if its parent is visible
			// because these kind of aliases can be used to name types in declaration file
			anyImportSyntax := getAnyImportSyntax(declaration)
			if anyImportSyntax != nil &&
				!ast.HasSyntacticModifier(anyImportSyntax, ast.ModifierFlagsExport) && // import clause without export
				r.isDeclarationVisible(anyImportSyntax.Parent) {
				addVisibleAlias(declaration, anyImportSyntax)
				continue
			}
			if ast.IsVariableDeclaration(declaration) && ast.IsVariableStatement(declaration.Parent.Parent) &&
				!ast.HasSyntacticModifier(declaration.Parent.Parent, ast.ModifierFlagsExport) && // unexported variable statement
				r.isDeclarationVisible(declaration.Parent.Parent.Parent) {
				addVisibleAlias(declaration, declaration.Parent.Parent)
				continue
			}
			if ast.IsLateVisibilityPaintedStatement(declaration) && // unexported top-level statement
				!ast.HasSyntacticModifier(declaration, ast.ModifierFlagsExport) &&
				r.isDeclarationVisible(declaration.Parent) {
				addVisibleAlias(declaration, declaration)
				continue
			}
			if ast.IsBindingElement(declaration) {
				if symbol.Flags&ast.SymbolFlagsAlias != 0 && ast.IsInJSFile(declaration) && declaration.Parent != nil && declaration.Parent.Parent != nil && // exported import-like top-level JS require statement
					ast.IsVariableDeclaration(declaration.Parent.Parent) &&
					declaration.Parent.Parent.Parent.Parent != nil && ast.IsVariableStatement(declaration.Parent.Parent.Parent.Parent) &&
					!ast.HasSyntacticModifier(declaration.Parent.Parent.Parent.Parent, ast.ModifierFlagsExport) &&
					declaration.Parent.Parent.Parent.Parent.Parent != nil && // check if the thing containing the variable statement is visible (ie, the file)
					r.isDeclarationVisible(declaration.Parent.Parent.Parent.Parent.Parent) {
					addVisibleAlias(declaration, declaration.Parent.Parent.Parent.Parent)
					continue
				}
				if symbol.Flags&ast.SymbolFlagsBlockScopedVariable != 0 {
					variableStatement := ast.FindAncestor(declaration, ast.IsVariableStatement)
					if ast.HasSyntacticModifier(variableStatement, ast.ModifierFlagsExport) {
						continue // no alias to add, already exported
					}
					if !r.isDeclarationVisible(variableStatement.Parent) {
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

func (r *emitResolver) IsImplementationOfOverload(node *ast.SignatureDeclaration) bool {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(node) {
		return false
	}
	if ast.NodeIsPresent(node.Body()) {
		if ast.IsGetAccessorDeclaration(node) || ast.IsSetAccessorDeclaration(node) {
			return false // Get or set accessors can never be overload implementations, but can have up to 2 signatures
		}
		r.checkerMu.Lock()
		defer r.checkerMu.Unlock()
		symbol := r.checker.getSymbolOfDeclaration(node)
		signaturesOfSymbol := r.checker.getSignaturesOfSymbol(symbol)
		// If this function body corresponds to function with multiple signature, it is implementation of overload
		// e.g.: function foo(a: string): string;
		//       function foo(a: number): number;
		//       function foo(a: any) { // This is implementation of the overloads
		//           return a;
		//       }
		return len(signaturesOfSymbol) > 1 ||
			// If there is single signature for the symbol, it is overload if that signature isn't coming from the node
			// e.g.: function foo(a: string): string;
			//       function foo(a: any) { // This is implementation of the overloads
			//           return a;
			//       }
			(len(signaturesOfSymbol) == 1 && signaturesOfSymbol[0].declaration != node)
	}
	return false
}

func (r *emitResolver) IsImportRequiredByAugmentation(decl *ast.ImportDeclaration) bool {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(decl.AsNode()) {
		return false
	}
	file := ast.GetSourceFileOfNode(decl.AsNode())
	if file.Symbol == nil {
		// script file
		return false
	}
	importTarget := r.GetExternalModuleFileFromDeclaration(decl.AsNode())
	if importTarget == nil {
		return false
	}
	if importTarget == file {
		return false
	}
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	exports := r.checker.getExportsOfModule(file.Symbol)
	for s := range maps.Values(exports) {
		merged := r.checker.getMergedSymbol(s)
		if merged != s {
			if len(merged.Declarations) > 0 {
				for _, d := range merged.Declarations {
					declFile := ast.GetSourceFileOfNode(d)
					if declFile == importTarget {
						return true
					}
				}
			}
		}
	}
	return false
}

func (r *emitResolver) RequiresAddingImplicitUndefined(declaration *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool {
	if !ast.IsParseTreeNode(declaration) {
		return false
	}
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.requiresAddingImplicitUndefined(declaration, symbol, enclosingDeclaration)
}

func (r *emitResolver) requiresAddingImplicitUndefined(declaration *ast.Node, symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(declaration) {
		return false
	}
	switch declaration.Kind {
	case ast.KindPropertyDeclaration, ast.KindPropertySignature, ast.KindJSDocPropertyTag:
		if symbol == nil {
			symbol = r.checker.getSymbolOfDeclaration(declaration)
		}
		t := r.checker.getTypeOfSymbol(symbol)
		r.checker.mappedSymbolLinks.Has(symbol)
		return (symbol.Flags&ast.SymbolFlagsProperty != 0) && (symbol.Flags&ast.SymbolFlagsOptional != 0) && isOptionalDeclaration(declaration) && r.checker.ReverseMappedSymbolLinks.Has(symbol) && r.checker.ReverseMappedSymbolLinks.Get(symbol).mappedType != nil && containsNonMissingUndefinedType(r.checker, t)
	case ast.KindParameter, ast.KindJSDocParameterTag:
		return r.requiresAddingImplicitUndefinedWorker(declaration, enclosingDeclaration)
	default:
		panic("Node cannot possibly require adding undefined")
	}
}

func (r *emitResolver) requiresAddingImplicitUndefinedWorker(parameter *ast.Node, enclosingDeclaration *ast.Node) bool {
	return (r.isRequiredInitializedParameter(parameter, enclosingDeclaration) || r.isOptionalUninitializedParameterProperty(parameter)) && !r.declaredParameterTypeContainsUndefined(parameter)
}

func (r *emitResolver) declaredParameterTypeContainsUndefined(parameter *ast.Node) bool {
	// typeNode := getNonlocalEffectiveTypeAnnotationNode(parameter); // !!! JSDoc Support
	typeNode := parameter.Type()
	if typeNode == nil {
		return false
	}
	t := r.checker.getTypeFromTypeNode(typeNode)
	// allow error type here to avoid confusing errors that the annotation has to contain undefined when it does in cases like this:
	//
	// export function fn(x?: Unresolved | undefined): void {}
	return r.checker.isErrorType(t) || r.checker.containsUndefinedType(t)
}

func (r *emitResolver) isOptionalUninitializedParameterProperty(parameter *ast.Node) bool {
	return r.checker.strictNullChecks &&
		r.isOptionalParameter(parameter) &&
		( /*isJSDocParameterTag(parameter) ||*/ parameter.Initializer() == nil) && // !!! TODO: JSDoc support
		ast.HasSyntacticModifier(parameter, ast.ModifierFlagsParameterPropertyModifier)
}

func (r *emitResolver) isRequiredInitializedParameter(parameter *ast.Node, enclosingDeclaration *ast.Node) bool {
	if !r.checker.strictNullChecks || r.isOptionalParameter(parameter) || /*isJSDocParameterTag(parameter) ||*/ parameter.Initializer() == nil { // !!! TODO: JSDoc Support
		return false
	}
	if ast.HasSyntacticModifier(parameter, ast.ModifierFlagsParameterPropertyModifier) {
		return enclosingDeclaration != nil && ast.IsFunctionLikeDeclaration(enclosingDeclaration)
	}
	return true
}

func (r *emitResolver) isOptionalParameter(node *ast.Node) bool {
	// !!! TODO: JSDoc support
	// if (hasEffectiveQuestionToken(node)) {
	// 	return true;
	// }
	if ast.IsParameter(node) && node.AsParameterDeclaration().QuestionToken != nil {
		return true
	}
	if !ast.IsParameter(node) {
		return false
	}
	if node.Initializer() != nil {
		signature := r.checker.getSignatureFromDeclaration(node.Parent)
		parameterIndex := core.FindIndex(node.Parent.Parameters(), func(p *ast.ParameterDeclarationNode) bool { return p == node })
		debug.Assert(parameterIndex >= 0)
		// Only consider syntactic or instantiated parameters as optional, not `void` parameters as this function is used
		// in grammar checks and checking for `void` too early results in parameter types widening too early
		// and causes some noImplicitAny errors to be lost.
		return parameterIndex >= r.checker.getMinArgumentCountEx(signature, MinArgumentCountFlagsStrongArityForUntypedJS|MinArgumentCountFlagsVoidIsNonOptional)
	}
	iife := ast.GetImmediatelyInvokedFunctionExpression(node.Parent)
	if iife != nil {
		parameterIndex := core.FindIndex(node.Parent.Parameters(), func(p *ast.ParameterDeclarationNode) bool { return p == node })
		return node.Type() == nil &&
			node.AsParameterDeclaration().DotDotDotToken == nil &&
			parameterIndex >= len(r.checker.getEffectiveCallArguments(iife))
	}

	return false
}

func (r *emitResolver) IsLiteralConstDeclaration(node *ast.Node) bool {
	// node = r.emitContext.ParseNode(node)
	if !ast.IsParseTreeNode(node) {
		return false
	}
	if isDeclarationReadonly(node) || ast.IsVariableDeclaration(node) && ast.IsVarConst(node) {
		r.checkerMu.Lock()
		defer r.checkerMu.Unlock()
		return isFreshLiteralType(r.checker.getTypeOfSymbol(r.checker.getSymbolOfDeclaration(node)))
	}
	return false
}

func (r *emitResolver) IsExpandoFunctionDeclaration(node *ast.Node) bool {
	// node = r.emitContext.ParseNode(node)
	// !!! TODO: expando function support
	return false
}

func (r *emitResolver) isSymbolAccessible(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, shouldComputeAliasToMarkVisible bool) printer.SymbolAccessibilityResult {
	return r.checker.IsSymbolAccessible(symbol, enclosingDeclaration, meaning, shouldComputeAliasToMarkVisible)
}

func (r *emitResolver) IsSymbolAccessible(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, shouldComputeAliasToMarkVisible bool) printer.SymbolAccessibilityResult {
	// TODO: Split into locking and non-locking API methods - only current usage is the symbol tracker, which is non-locking,
	// as all tracker calls happen within a CreateX call below, which already holds a lock
	// r.checkerMu.Lock()
	// defer r.checkerMu.Unlock()
	return r.isSymbolAccessible(symbol, enclosingDeclaration, meaning, shouldComputeAliasToMarkVisible)
}

func isConstEnumOrConstEnumOnlyModule(s *ast.Symbol) bool {
	return isConstEnumSymbol(s) || s.Flags&ast.SymbolFlagsConstEnumOnlyModule != 0
}

func (r *emitResolver) IsReferencedAliasDeclaration(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData || !ast.IsParseTreeNode(node) {
		return true
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	if ast.IsAliasSymbolDeclaration(node) {
		if symbol := c.getSymbolOfDeclaration(node); symbol != nil {
			aliasLinks := c.aliasSymbolLinks.Get(symbol)
			if aliasLinks.referenced {
				return true
			}
			target := aliasLinks.aliasTarget
			if target != nil && node.ModifierFlags()&ast.ModifierFlagsExport != 0 &&
				c.getSymbolFlags(target)&ast.SymbolFlagsValue != 0 &&
				(c.compilerOptions.ShouldPreserveConstEnums() || !isConstEnumOrConstEnumOnlyModule(target)) {
				return true
			}
		}
	}
	return false
}

func (r *emitResolver) IsValueAliasDeclaration(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData || !ast.IsParseTreeNode(node) {
		return true
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.isValueAliasDeclarationWorker(node)
}

func (r *emitResolver) isValueAliasDeclarationWorker(node *ast.Node) bool {
	c := r.checker

	switch node.Kind {
	case ast.KindImportEqualsDeclaration:
		return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), false /*excludeTypeOnlyValues*/)
	case ast.KindImportClause,
		ast.KindNamespaceImport,
		ast.KindImportSpecifier,
		ast.KindExportSpecifier:
		symbol := c.getSymbolOfDeclaration(node)
		return symbol != nil && r.isAliasResolvedToValue(symbol, true /*excludeTypeOnlyValues*/)
	case ast.KindExportDeclaration:
		exportClause := node.AsExportDeclaration().ExportClause
		return exportClause != nil && (ast.IsNamespaceExport(exportClause) ||
			core.Some(exportClause.AsNamedExports().Elements.Nodes, r.isValueAliasDeclaration))
	case ast.KindExportAssignment, ast.KindJSExportAssignment:
		if node.AsExportAssignment().Expression != nil && node.AsExportAssignment().Expression.Kind == ast.KindIdentifier {
			return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), true /*excludeTypeOnlyValues*/)
		}
		return true
	}
	return false
}

func (r *emitResolver) isAliasResolvedToValue(symbol *ast.Symbol, excludeTypeOnlyValues bool) bool {
	c := r.checker
	if symbol == nil {
		return false
	}
	if symbol.ValueDeclaration != nil {
		if container := ast.GetSourceFileOfNode(symbol.ValueDeclaration); container != nil {
			fileSymbol := c.getSymbolOfDeclaration(container.AsNode())
			// Ensures cjs export assignment is setup, since this symbol may point at, and merge with, the file itself.
			// If we don't, the merge may not have yet occurred, and the flags check below will be missing flags that
			// are added as a result of the merge.
			c.resolveExternalModuleSymbol(fileSymbol, false /*dontResolveAlias*/)
		}
	}
	target := c.getExportSymbolOfValueSymbolIfExported(c.resolveAlias(symbol))
	if target == c.unknownSymbol {
		return !excludeTypeOnlyValues || c.getTypeOnlyAliasDeclaration(symbol) == nil
	}
	// const enums and modules that contain only const enums are not considered values from the emit perspective
	// unless 'preserveConstEnums' option is set to true
	return c.getSymbolFlagsEx(symbol, excludeTypeOnlyValues, true /*excludeLocalMeanings*/)&ast.SymbolFlagsValue != 0 &&
		(c.compilerOptions.ShouldPreserveConstEnums() ||
			!isConstEnumOrConstEnumOnlyModule(target))
}

func (r *emitResolver) IsTopLevelValueImportEqualsWithEntityName(node *ast.Node) bool {
	c := r.checker
	if !c.canCollectSymbolAliasAccessibilityData {
		return true
	}
	if !ast.IsParseTreeNode(node) || node.Kind != ast.KindImportEqualsDeclaration || node.Parent.Kind != ast.KindSourceFile {
		return false
	}
	if ast.IsImportEqualsDeclaration(node) &&
		(ast.NodeIsMissing(node.AsImportEqualsDeclaration().ModuleReference) || node.AsImportEqualsDeclaration().ModuleReference.Kind != ast.KindExternalModuleReference) {
		return false
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.isAliasResolvedToValue(c.getSymbolOfDeclaration(node), false /*excludeTypeOnlyValues*/)
}

func (r *emitResolver) MarkLinkedReferencesRecursively(file *ast.SourceFile) {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	if file != nil {
		var visit ast.Visitor
		visit = func(n *ast.Node) bool {
			if ast.IsImportEqualsDeclaration(n) && n.ModifierFlags()&ast.ModifierFlagsExport == 0 {
				return false // These are deferred and marked in a chain when referenced
			}
			if ast.IsJSExportAssignment(n) {
				return false
			}
			if ast.IsImportDeclaration(n) {
				return false // likewise, these are ultimately what get marked by calls on other nodes - we want to skip them
			}
			r.checker.markLinkedReferences(n, ReferenceHintUnspecified, nil /*propSymbol*/, nil /*parentType*/)
			n.ForEachChild(visit)
			return false
		}
		file.ForEachChild(visit)
	}
}

func (r *emitResolver) GetExternalModuleFileFromDeclaration(declaration *ast.Node) *ast.SourceFile {
	if !ast.IsParseTreeNode(declaration) {
		return nil
	}

	var specifier *ast.Node
	if declaration.Kind == ast.KindModuleDeclaration {
		if ast.IsStringLiteral(declaration.Name()) {
			specifier = declaration.Name()
		}
	} else {
		specifier = ast.GetExternalModuleName(declaration)
	}
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	moduleSymbol := r.checker.resolveExternalModuleNameWorker(specifier, specifier /*moduleNotFoundError*/, nil, false, false) // TODO: GH#18217
	if moduleSymbol == nil {
		return nil
	}
	decl := ast.GetDeclarationOfKind(moduleSymbol, ast.KindSourceFile)
	if decl == nil {
		return nil
	}
	return decl.AsSourceFile()
}

func (r *emitResolver) getReferenceResolver() binder.ReferenceResolver {
	if r.referenceResolver == nil {
		r.referenceResolver = binder.NewReferenceResolver(r.checker.compilerOptions, binder.ReferenceResolverHooks{
			ResolveName:                            r.checker.resolveName,
			GetResolvedSymbol:                      r.checker.getResolvedSymbol,
			GetMergedSymbol:                        r.checker.getMergedSymbol,
			GetParentOfSymbol:                      r.checker.getParentOfSymbol,
			GetSymbolOfDeclaration:                 r.checker.getSymbolOfDeclaration,
			GetTypeOnlyAliasDeclaration:            r.checker.getTypeOnlyAliasDeclarationEx,
			GetExportSymbolOfValueSymbolIfExported: r.checker.getExportSymbolOfValueSymbolIfExported,
		})
	}
	return r.referenceResolver
}

func (r *emitResolver) GetReferencedExportContainer(node *ast.IdentifierNode, prefixLocals bool) *ast.Node /*SourceFile|ModuleDeclaration|EnumDeclaration*/ {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedExportContainer(node, prefixLocals)
}

func (r *emitResolver) SetReferencedImportDeclaration(node *ast.IdentifierNode, ref *ast.Declaration) {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	r.jsxLinks.Get(node).importRef = ref
}

func (r *emitResolver) GetReferencedImportDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	if !ast.IsParseTreeNode(node) {
		return r.jsxLinks.Get(node).importRef
	}

	return r.getReferenceResolver().GetReferencedImportDeclaration(node)
}

func (r *emitResolver) GetReferencedValueDeclaration(node *ast.IdentifierNode) *ast.Declaration {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedValueDeclaration(node)
}

func (r *emitResolver) GetReferencedValueDeclarations(node *ast.IdentifierNode) []*ast.Declaration {
	if !ast.IsParseTreeNode(node) {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	return r.getReferenceResolver().GetReferencedValueDeclarations(node)
}

// TODO: the emit resolver being responsible for some amount of node construction is a very leaky abstraction,
// and requires giving it access to a lot of context it's otherwise not required to have, which also further complicates the API
// and likely reduces performance. There's probably some refactoring that could be done here to simplify this.

func (r *emitResolver) CreateReturnTypeOfSignatureDeclaration(emitContext *printer.EmitContext, signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	original := emitContext.ParseNode(signatureDeclaration)
	if original == nil {
		return emitContext.Factory.NewKeywordTypeNode(ast.KindAnyKeyword)
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context
	return requestNodeBuilder.SerializeReturnTypeForSignature(original, enclosingDeclaration, flags, internalFlags, tracker)
}

func (r *emitResolver) CreateTypeParametersOfSignatureDeclaration(emitContext *printer.EmitContext, signatureDeclaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
	original := emitContext.ParseNode(signatureDeclaration)
	if original == nil {
		return nil
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context
	return requestNodeBuilder.SerializeTypeParametersForSignature(original, enclosingDeclaration, flags, internalFlags, tracker)
}

func (r *emitResolver) CreateTypeOfDeclaration(emitContext *printer.EmitContext, declaration *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	original := emitContext.ParseNode(declaration)
	if original == nil {
		return emitContext.Factory.NewKeywordTypeNode(ast.KindAnyKeyword)
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context
	// // Get type of the symbol if this is the valid symbol otherwise get type at location
	symbol := r.checker.getSymbolOfDeclaration(declaration)
	return requestNodeBuilder.SerializeTypeForDeclaration(declaration, symbol, enclosingDeclaration, flags|nodebuilder.FlagsMultilineObjectLiterals, internalFlags, tracker)
}

func (r *emitResolver) CreateLiteralConstValue(emitContext *printer.EmitContext, node *ast.Node, tracker nodebuilder.SymbolTracker) *ast.Node {
	node = emitContext.ParseNode(node)
	r.checkerMu.Lock()
	t := r.checker.getTypeOfSymbol(r.checker.getSymbolOfDeclaration(node))
	r.checkerMu.Unlock()
	if t == nil {
		return nil // TODO: How!? Maybe this should be a panic. All symbols should have a type.
	}

	var enumResult *ast.Node
	if t.flags&TypeFlagsEnumLike != 0 {
		r.checkerMu.Lock()
		defer r.checkerMu.Unlock()
		requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context
		enumResult = requestNodeBuilder.SymbolToExpression(t.symbol, ast.SymbolFlagsValue, node, nodebuilder.FlagsNone, nodebuilder.InternalFlagsNone, tracker)
		// What about regularTrueType/regularFalseType - since those aren't fresh, we never make initializers from them
		// TODO: handle those if this function is ever used for more than initializers in declaration emit
	} else if t == r.checker.trueType {
		enumResult = emitContext.Factory.NewKeywordExpression(ast.KindTrueKeyword)
	} else if t == r.checker.falseType {
		enumResult = emitContext.Factory.NewKeywordExpression(ast.KindFalseKeyword)
	}
	if enumResult != nil {
		return enumResult
	}
	if t.flags&TypeFlagsLiteral == 0 {
		return nil // non-literal type
	}
	switch value := t.AsLiteralType().value.(type) {
	case string:
		return emitContext.Factory.NewStringLiteral(value)
	case jsnum.Number:
		if value.Abs() != value {
			// negative
			return emitContext.Factory.NewPrefixUnaryExpression(
				ast.KindMinusToken,
				emitContext.Factory.NewNumericLiteral(value.String()[1:]),
			)
		}
		return emitContext.Factory.NewNumericLiteral(value.String())
	case jsnum.PseudoBigInt:
		return emitContext.Factory.NewBigIntLiteral(pseudoBigIntToString(value) + "n")
	case bool:
		kind := ast.KindFalseKeyword
		if value {
			kind = ast.KindTrueKeyword
		}
		return emitContext.Factory.NewKeywordExpression(kind)
	}
	panic("unhandled literal const value kind")
}

func (r *emitResolver) CreateTypeOfExpression(emitContext *printer.EmitContext, expression *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) *ast.Node {
	expression = emitContext.ParseNode(expression)
	if expression == nil {
		return emitContext.Factory.NewKeywordTypeNode(ast.KindAnyKeyword)
	}

	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context
	return requestNodeBuilder.SerializeTypeForExpression(expression, enclosingDeclaration, flags|nodebuilder.FlagsMultilineObjectLiterals, internalFlags, tracker)
}

func (r *emitResolver) CreateLateBoundIndexSignatures(emitContext *printer.EmitContext, container *ast.Node, enclosingDeclaration *ast.Node, flags nodebuilder.Flags, internalFlags nodebuilder.InternalFlags, tracker nodebuilder.SymbolTracker) []*ast.Node {
	container = emitContext.ParseNode(container)
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()

	sym := container.Symbol()
	staticInfos := r.checker.getIndexInfosOfType(r.checker.getTypeOfSymbol(sym))
	instanceIndexSymbol := r.checker.getIndexSymbol(sym)
	var instanceInfos []*IndexInfo
	if instanceIndexSymbol != nil {
		siblingSymbols := slices.Collect(maps.Values(r.checker.getMembersOfSymbol(sym)))
		instanceInfos = r.checker.getIndexInfosOfIndexSymbol(instanceIndexSymbol, siblingSymbols)
	}

	requestNodeBuilder := NewNodeBuilder(r.checker, emitContext) // TODO: cache per-context

	var result []*ast.Node
	for i, infoList := range [][]*IndexInfo{staticInfos, instanceInfos} {
		isStatic := true
		if i > 0 {
			isStatic = false
		}
		if len(infoList) == 0 {
			continue
		}
		for _, info := range infoList {
			if info.declaration != nil {
				continue
			}
			if info == r.checker.anyBaseTypeIndexInfo {
				continue // inherited, but looks like a late-bound signature because it has no declarations
			}
			// if info.components {
			// !!! TODO: Complete late-bound index info support - getObjectLiteralIndexInfo does not yet add late bound components to index signatures
			// }
			node := requestNodeBuilder.IndexInfoToIndexSignatureDeclaration(info, enclosingDeclaration, flags, internalFlags, tracker)
			if node != nil && isStatic {
				modNodes := []*ast.Node{emitContext.Factory.NewModifier(ast.KindStaticKeyword)}
				mods := node.Modifiers()
				if mods != nil {
					modNodes = append(modNodes, mods.Nodes...)
				}
				mods = emitContext.Factory.NewModifierList(modNodes)
				node = emitContext.Factory.UpdateIndexSignatureDeclaration(
					node.AsIndexSignatureDeclaration(),
					mods,
					node.ParameterList(),
					node.Type(),
				)
			}
			if node != nil {
				result = append(result, node)
			}
		}
	}
	return result
}

func (r *emitResolver) GetEffectiveDeclarationFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags {
	// node = emitContext.ParseNode(node)
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.checker.GetEffectiveDeclarationFlags(node, flags)
}

func (r *emitResolver) GetResolutionModeOverride(node *ast.Node) core.ResolutionMode {
	// node = emitContext.ParseNode(node)
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.checker.GetResolutionModeOverride(node.AsImportAttributes(), false)
}

func (r *emitResolver) GetConstantValue(node *ast.Node) any {
	// node = emitContext.ParseNode(node)
	r.checkerMu.Lock()
	defer r.checkerMu.Unlock()
	return r.checker.GetConstantValue(node)
}
