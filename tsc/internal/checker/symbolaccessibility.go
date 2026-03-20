package checker

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/printer"
)

func (c *Checker) IsTypeSymbolAccessible(typeSymbol *ast.Symbol, enclosingDeclaration *ast.Node) bool {
	access := c.isSymbolAccessibleWorker(typeSymbol, enclosingDeclaration, ast.SymbolFlagsType /*shouldComputeAliasesToMakeVisible*/, false /*allowModules*/, true)
	return access.Accessibility == printer.SymbolAccessibilityAccessible
}

func (c *Checker) IsValueSymbolAccessible(symbol *ast.Symbol, enclosingDeclaration *ast.Node) bool {
	access := c.isSymbolAccessibleWorker(symbol, enclosingDeclaration, ast.SymbolFlagsValue /*shouldComputeAliasesToMakeVisible*/, false /*allowModules*/, true)
	return access.Accessibility == printer.SymbolAccessibilityAccessible
}

func (c *Checker) IsSymbolAccessibleByFlags(symbol *ast.Symbol, enclosingDeclaration *ast.Node, flags ast.SymbolFlags) bool {
	access := c.isSymbolAccessibleWorker(symbol, enclosingDeclaration, flags /*shouldComputeAliasesToMakeVisible*/, false /*allowModules*/, false) // TODO: Strada bug? Why is this allowModules: false?
	return access.Accessibility == printer.SymbolAccessibilityAccessible
}

func (c *Checker) IsAnySymbolAccessible(symbols []*ast.Symbol, enclosingDeclaration *ast.Node, initialSymbol *ast.Symbol, meaning ast.SymbolFlags, shouldComputeAliasesToMakeVisible bool, allowModules bool) *printer.SymbolAccessibilityResult {
	if len(symbols) == 0 {
		return nil
	}

	var hadAccessibleChain *ast.Symbol
	earlyModuleBail := false
	for _, symbol := range symbols {
		// Symbol is accessible if it by itself is accessible
		accessibleSymbolChain := c.getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning /*useOnlyExternalAliasing*/, false)
		if len(accessibleSymbolChain) > 0 {
			hadAccessibleChain = symbol
			// TODO: going through emit resolver here is weird. Relayer these APIs.
			hasAccessibleDeclarations := c.GetEmitResolver().hasVisibleDeclarations(accessibleSymbolChain[0], shouldComputeAliasesToMakeVisible)
			if hasAccessibleDeclarations != nil {
				return hasAccessibleDeclarations
			}
		}
		if allowModules {
			if core.Some(symbol.Declarations, hasNonGlobalAugmentationExternalModuleSymbol) {
				if shouldComputeAliasesToMakeVisible {
					earlyModuleBail = true
					// Generally speaking, we want to use the aliases that already exist to refer to a module, if present
					// In order to do so, we need to find those aliases in order to retain them in declaration emit; so
					// if we are in declaration emit, we cannot use the fast path for module visibility until we've exhausted
					// all other visibility options (in order to capture the possible aliases used to reference the module)
					continue
				}
				// Any meaning of a module symbol is always accessible via an `import` type
				return &printer.SymbolAccessibilityResult{
					Accessibility: printer.SymbolAccessibilityAccessible,
				}
			}
		}

		// If we haven't got the accessible symbol, it doesn't mean the symbol is actually inaccessible.
		// It could be a qualified symbol and hence verify the path
		// e.g.:
		// module m {
		//     export class c {
		//     }
		// }
		// const x: typeof m.c
		// In the above example when we start with checking if typeof m.c symbol is accessible,
		// we are going to see if c can be accessed in scope directly.
		// But it can't, hence the accessible is going to be undefined, but that doesn't mean m.c is inaccessible
		// It is accessible if the parent m is accessible because then m.c can be accessed through qualification

		containers := c.getContainersOfSymbol(symbol, enclosingDeclaration, meaning)
		nextMeaning := meaning
		if initialSymbol == symbol {
			nextMeaning = getQualifiedLeftMeaning(meaning)
		}
		parentResult := c.IsAnySymbolAccessible(containers, enclosingDeclaration, initialSymbol, nextMeaning, shouldComputeAliasesToMakeVisible, allowModules)
		if parentResult != nil {
			return parentResult
		}
	}

	if earlyModuleBail {
		return &printer.SymbolAccessibilityResult{
			Accessibility: printer.SymbolAccessibilityAccessible,
		}
	}

	if hadAccessibleChain != nil {
		var moduleName string
		if hadAccessibleChain != initialSymbol {
			moduleName = c.symbolToStringEx(hadAccessibleChain, enclosingDeclaration, ast.SymbolFlagsNamespace, SymbolFormatFlagsAllowAnyNodeKind)
		}
		return &printer.SymbolAccessibilityResult{
			Accessibility:   printer.SymbolAccessibilityNotAccessible,
			ErrorSymbolName: c.symbolToStringEx(initialSymbol, enclosingDeclaration, meaning, SymbolFormatFlagsAllowAnyNodeKind),
			ErrorModuleName: moduleName,
		}
	}
	return nil
}

func hasNonGlobalAugmentationExternalModuleSymbol(declaration *ast.Node) bool {
	return ast.IsModuleWithStringLiteralName(declaration) || (declaration.Kind == ast.KindSourceFile && ast.IsExternalOrCommonJSModule(declaration.AsSourceFile()))
}

func getQualifiedLeftMeaning(rightMeaning ast.SymbolFlags) ast.SymbolFlags {
	// If we are looking in value space, the parent meaning is value, other wise it is namespace
	if rightMeaning == ast.SymbolFlagsValue {
		return ast.SymbolFlagsValue
	}
	return ast.SymbolFlagsNamespace
}

func (c *Checker) getWithAlternativeContainers(container *ast.Symbol, symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) []*ast.Symbol {
	additionalContainers := core.MapNonNil(container.Declarations, func(d *ast.Node) *ast.Symbol {
		return c.getFileSymbolIfFileSymbolExportEqualsContainer(d, container)
	})
	var reexportContainers []*ast.Symbol
	if enclosingDeclaration != nil {
		reexportContainers = c.getAlternativeContainingModules(symbol, enclosingDeclaration)
	}
	objectLiteralContainer := c.getVariableDeclarationOfObjectLiteral(container, meaning)
	leftMeaning := getQualifiedLeftMeaning(meaning)
	if enclosingDeclaration != nil &&
		container.Flags&leftMeaning != 0 &&
		len(c.getAccessibleSymbolChain(container, enclosingDeclaration, ast.SymbolFlagsNamespace /*useOnlyExternalAliasing*/, false)) > 0 {
		// This order expresses a preference for the real container if it is in scope
		res := append(append([]*ast.Symbol{container}, additionalContainers...), reexportContainers...)
		if objectLiteralContainer != nil {
			res = append(res, objectLiteralContainer)
		}
		return res
	}
	// we potentially have a symbol which is a member of the instance side of something - look for a variable in scope with the container's type
	// which may be acting like a namespace (eg, `Symbol` acts like a namespace when looking up `Symbol.toStringTag`)
	var firstVariableMatch *ast.Symbol
	if (meaning == ast.SymbolFlagsValue &&
		container.Flags&leftMeaning == 0) &&
		container.Flags&ast.SymbolFlagsType != 0 &&
		c.getDeclaredTypeOfSymbol(container).flags&TypeFlagsObject != 0 {
		c.someSymbolTableInScope(enclosingDeclaration, func(t ast.SymbolTable, _ symbolTableID, _ bool, _ bool, _ *ast.Node) bool {
			for _, s := range t {
				if s.Flags&leftMeaning != 0 && c.getTypeOfSymbol(s) == c.getDeclaredTypeOfSymbol(container) {
					firstVariableMatch = s
					return true
				}
			}
			return false
		})
	}

	var res []*ast.Symbol
	if firstVariableMatch != nil {
		res = append(res, firstVariableMatch)
	}
	res = append(res, additionalContainers...)
	res = append(res, container)
	if objectLiteralContainer != nil {
		res = append(res, objectLiteralContainer)
	}
	res = append(res, reexportContainers...)
	return res
}

func (c *Checker) getAlternativeContainingModules(symbol *ast.Symbol, enclosingDeclaration *ast.Node) []*ast.Symbol {
	if enclosingDeclaration == nil {
		return nil
	}
	containingFile := ast.GetSourceFileOfNode(enclosingDeclaration)
	id := ast.GetNodeId(containingFile.AsNode())
	links := c.symbolContainerLinks.Get(symbol)
	if links.extendedContainersByFile == nil {
		links.extendedContainersByFile = make(map[ast.NodeId][]*ast.Symbol)
	}
	existing, ok := links.extendedContainersByFile[id]
	if ok && existing != nil {
		return existing
	}
	var results []*ast.Symbol
	if len(containingFile.Imports()) > 0 {
		// Try to make an import using an import already in the enclosing file, if possible
		for _, importRef := range containingFile.Imports() {
			if ast.NodeIsSynthesized(importRef) {
				// Synthetic names can't be resolved by `resolveExternalModuleName` - they'll cause a debug assert if they error
				continue
			}
			resolvedModule := c.resolveExternalModuleName(enclosingDeclaration, importRef /*ignoreErrors*/, true)
			if resolvedModule == nil {
				continue
			}
			ref := c.getAliasForSymbolInContainer(resolvedModule, symbol)
			if ref == nil {
				continue
			}
			results = append(results, resolvedModule)
		}
		if len(results) > 0 {
			links.extendedContainersByFile[id] = results
			return results
		}
	}

	if links.extendedContainers != nil {
		return *links.extendedContainers
	}
	// No results from files already being imported by this file - expand search (expensive, but not location-specific, so cached)
	otherFiles := c.program.SourceFiles()
	for _, file := range otherFiles {
		if !ast.IsExternalModule(file) {
			continue
		}
		sym := c.getSymbolOfDeclaration(file.AsNode())
		ref := c.getAliasForSymbolInContainer(sym, symbol)
		if ref == nil {
			continue
		}
		results = append(results, sym)
	}
	links.extendedContainers = &results
	return results
}

func (c *Checker) getVariableDeclarationOfObjectLiteral(symbol *ast.Symbol, meaning ast.SymbolFlags) *ast.Symbol {
	// If we're trying to reference some object literal in, eg `var a = { x: 1 }`, the symbol for the literal, `__object`, is distinct
	// from the symbol of the declaration it is being assigned to. Since we can use the declaration to refer to the literal, however,
	// we'd like to make that connection here - potentially causing us to paint the declaration's visibility, and therefore the literal.
	if meaning&ast.SymbolFlagsValue == 0 {
		return nil
	}
	if len(symbol.Declarations) == 0 {
		return nil
	}
	firstDecl := symbol.Declarations[0]
	if firstDecl.Parent == nil {
		return nil
	}
	if !ast.IsVariableDeclaration(firstDecl.Parent) {
		return nil
	}
	if ast.IsObjectLiteralExpression(firstDecl) && firstDecl == firstDecl.Parent.Initializer() || ast.IsTypeLiteralNode(firstDecl) && firstDecl == firstDecl.Parent.Type() {
		return c.getSymbolOfDeclaration(firstDecl.Parent)
	}
	return nil
}

func hasExternalModuleSymbol(declaration *ast.Node) bool {
	return ast.IsAmbientModule(declaration) || (declaration.Kind == ast.KindSourceFile && ast.IsExternalOrCommonJSModule(declaration.AsSourceFile()))
}

func (c *Checker) getExternalModuleContainer(declaration *ast.Node) *ast.Symbol {
	node := ast.FindAncestor(declaration, hasExternalModuleSymbol)
	if node == nil {
		return nil
	}
	return c.getSymbolOfDeclaration(node)
}

func (c *Checker) getFileSymbolIfFileSymbolExportEqualsContainer(d *ast.Node, container *ast.Symbol) *ast.Symbol {
	fileSymbol := c.getExternalModuleContainer(d)
	if fileSymbol == nil || fileSymbol.Exports == nil {
		return nil
	}
	exported, ok := fileSymbol.Exports[ast.InternalSymbolNameExportEquals]
	if !ok || exported == nil {
		return nil
	}
	if c.getSymbolIfSameReference(exported, container) != nil {
		return fileSymbol
	}
	return nil
}

/**
* Attempts to find the symbol corresponding to the container a symbol is in - usually this
* is just its' `.parent`, but for locals, this value is `undefined`
 */
func (c *Checker) getContainersOfSymbol(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) []*ast.Symbol {
	container := c.getParentOfSymbol(symbol)
	// Type parameters end up in the `members` lists but are not externally visible
	if container != nil && (symbol.Flags&ast.SymbolFlagsTypeParameter == 0) {
		return c.getWithAlternativeContainers(container, symbol, enclosingDeclaration, meaning)
	}
	var candidates []*ast.Symbol
	for _, d := range symbol.Declarations {
		if !ast.IsAmbientModule(d) && d.Parent != nil {
			// direct children of a module
			if hasNonGlobalAugmentationExternalModuleSymbol(d.Parent) {
				sym := c.getSymbolOfDeclaration(d.Parent)
				if sym != nil && !slices.Contains(candidates, sym) {
					candidates = append(candidates, sym)
				}
				continue
			}
			// export ='d member of an ambient module
			if ast.IsModuleBlock(d.Parent) && d.Parent.Parent != nil && c.resolveExternalModuleSymbol(c.getSymbolOfDeclaration(d.Parent.Parent), false) == symbol {
				sym := c.getSymbolOfDeclaration(d.Parent.Parent)
				if sym != nil && !slices.Contains(candidates, sym) {
					candidates = append(candidates, sym)
				}
				continue
			}
		}
		if ast.IsClassExpression(d) && ast.IsBinaryExpression(d.Parent) && d.Parent.AsBinaryExpression().OperatorToken.Kind == ast.KindEqualsToken && ast.IsAccessExpression(d.Parent.AsBinaryExpression().Left) && ast.IsEntityNameExpression(d.Parent.AsBinaryExpression().Left.Expression()) {
			if ast.IsModuleExportsAccessExpression(d.Parent.AsBinaryExpression().Left) || ast.IsExportsIdentifier(d.Parent.AsBinaryExpression().Left.Expression()) {
				sym := c.getSymbolOfDeclaration(ast.GetSourceFileOfNode(d).AsNode())
				if sym != nil && !slices.Contains(candidates, sym) {
					candidates = append(candidates, sym)
				}
				continue
			}
			c.checkExpressionCached(d.Parent.AsBinaryExpression().Left.Expression())
			sym := c.symbolNodeLinks.Get(d.Parent.AsBinaryExpression().Left.Expression()).resolvedSymbol
			if sym != nil && !slices.Contains(candidates, sym) {
				candidates = append(candidates, sym)
			}
			continue
		}
	}
	if len(candidates) == 0 {
		return nil
	}

	var bestContainers []*ast.Symbol
	var alternativeContainers []*ast.Symbol
	for _, container := range candidates {
		if c.getAliasForSymbolInContainer(container, symbol) == nil {
			continue
		}
		allAlts := c.getWithAlternativeContainers(container, symbol, enclosingDeclaration, meaning)
		if len(allAlts) == 0 {
			continue
		}
		bestContainers = append(bestContainers, allAlts[0])
		alternativeContainers = append(alternativeContainers, allAlts[1:]...)
	}
	return append(bestContainers, alternativeContainers...)
}

func (c *Checker) getAliasForSymbolInContainer(container *ast.Symbol, symbol *ast.Symbol) *ast.Symbol {
	if container == c.getParentOfSymbol(symbol) {
		// fast path, `symbol` is either already the alias or isn't aliased
		return symbol
	}
	// Check if container is a thing with an `export=` which points directly at `symbol`, and if so, return
	// the container itself as the alias for the symbol
	if container.Exports != nil {
		exportEquals, ok := container.Exports[ast.InternalSymbolNameExportEquals]
		if ok && exportEquals != nil && c.getSymbolIfSameReference(exportEquals, symbol) != nil {
			return container
		}
	}
	exports := c.getExportsOfSymbol(container)
	quick, ok := exports[symbol.Name]
	if ok && quick != nil && c.getSymbolIfSameReference(quick, symbol) != nil {
		return quick
	}
	var candidates []*ast.Symbol
	for _, exported := range exports {
		if c.getSymbolIfSameReference(exported, symbol) != nil {
			candidates = append(candidates, exported)
		}
	}
	if len(candidates) > 0 {
		c.sortSymbols(candidates) // _must_ sort exports for stable results - symbol table is randomly iterated
		return candidates[0]
	}
	return nil
}

func (c *Checker) getAccessibleSymbolChain(
	symbol *ast.Symbol,
	enclosingDeclaration *ast.Node,
	meaning ast.SymbolFlags,
	useOnlyExternalAliasing bool,
) []*ast.Symbol {
	return c.getAccessibleSymbolChainEx(accessibleSymbolChainContext{symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing, make(map[ast.SymbolId]map[symbolTableID]struct{})})
}

func (c *Checker) GetAccessibleSymbolChain(
	symbol *ast.Symbol,
	enclosingDeclaration *ast.Node,
	meaning ast.SymbolFlags,
	useOnlyExternalAliasing bool,
) []*ast.Symbol {
	return c.getAccessibleSymbolChain(symbol, enclosingDeclaration, meaning, useOnlyExternalAliasing)
}

type accessibleSymbolChainContext struct {
	symbol                  *ast.Symbol
	enclosingDeclaration    *ast.Node
	meaning                 ast.SymbolFlags
	useOnlyExternalAliasing bool
	visitedSymbolTablesMap  map[ast.SymbolId]map[symbolTableID]struct{}
}

// symbolTableID uniquely identifies a symbol table by encoding its source.
// The high 2 bits encode the kind (locals, exports, members, globals),
// and the remaining bits encode the NodeId or SymbolId of the source.
type symbolTableID uint64

const (
	stKindLocals symbolTableID = iota << 62
	stKindExports
	stKindMembers
	stKindGlobals
)

func symbolTableIDFromLocals(node *ast.Node) symbolTableID {
	return stKindLocals | symbolTableID(ast.GetNodeId(node))
}

func symbolTableIDFromExports(sym *ast.Symbol) symbolTableID {
	return stKindExports | symbolTableID(ast.GetSymbolId(sym))
}

func symbolTableIDFromMembers(sym *ast.Symbol) symbolTableID {
	return stKindMembers | symbolTableID(ast.GetSymbolId(sym))
}

func symbolTableIDFromGlobals() symbolTableID {
	return stKindGlobals
}

func (c *Checker) getAccessibleSymbolChainEx(ctx accessibleSymbolChainContext) []*ast.Symbol {
	if ctx.symbol == nil {
		return nil
	}
	if isPropertyOrMethodDeclarationSymbol(ctx.symbol) {
		return nil
	}
	// Go from enclosingDeclaration to the first scope we check, so the cache is keyed off the scope and thus shared more
	var firstRelevantLocation *ast.Node
	c.someSymbolTableInScope(ctx.enclosingDeclaration, func(_ ast.SymbolTable, _ symbolTableID, _ bool, _ bool, node *ast.Node) bool {
		firstRelevantLocation = node
		return true
	})
	links := c.symbolContainerLinks.Get(ctx.symbol)
	linkKey := accessibleChainCacheKey{ctx.useOnlyExternalAliasing, firstRelevantLocation, ctx.meaning}
	if links.accessibleChainCache == nil {
		links.accessibleChainCache = make(map[accessibleChainCacheKey][]*ast.Symbol)
	}
	existing, ok := links.accessibleChainCache[linkKey]
	if ok {
		return existing
	}

	var result []*ast.Symbol

	c.someSymbolTableInScope(ctx.enclosingDeclaration, func(t ast.SymbolTable, tableId symbolTableID, ignoreQualification bool, isLocalNameLookup bool, _ *ast.Node) bool {
		res := c.getAccessibleSymbolChainFromSymbolTable(ctx, t, tableId, ignoreQualification, isLocalNameLookup)
		if len(res) > 0 {
			result = res
			return true
		}
		return false
	})
	links.accessibleChainCache[linkKey] = result
	return result
}

/**
* @param {ignoreQualification} boolean Set when a symbol is being looked for through the exports of another symbol (meaning we have a route to qualify it already)
 */
func (c *Checker) getAccessibleSymbolChainFromSymbolTable(ctx accessibleSymbolChainContext, t ast.SymbolTable, tableId symbolTableID, ignoreQualification bool, isLocalNameLookup bool) []*ast.Symbol {
	symId := ast.GetSymbolId(ctx.symbol)
	visitedSymbolTables, ok := ctx.visitedSymbolTablesMap[symId]
	if !ok {
		visitedSymbolTables = make(map[symbolTableID]struct{})
		ctx.visitedSymbolTablesMap[symId] = visitedSymbolTables
	}

	_, present := visitedSymbolTables[tableId]
	if present {
		return nil
	}
	visitedSymbolTables[tableId] = struct{}{}

	res := c.trySymbolTable(ctx, t, tableId == stKindGlobals, ignoreQualification, isLocalNameLookup)

	delete(visitedSymbolTables, tableId)
	return res
}

func (c *Checker) trySymbolTable(
	ctx accessibleSymbolChainContext,
	symbols ast.SymbolTable,
	isGlobals bool,
	ignoreQualification bool,
	isLocalNameLookup bool,
) []*ast.Symbol {
	// If symbol is directly available by its name in the symbol table
	res, ok := symbols[ctx.symbol.Name]
	if ok && res != nil && c.isAccessible(ctx, res /*resolvedAliasSymbol*/, nil, ignoreQualification) {
		return []*ast.Symbol{ctx.symbol}
	}

	var candidateChains [][]*ast.Symbol
	// collect all possible chains to sort them and return the shortest/best
	for _, symbolFromSymbolTable := range symbols {
		// for every non-default, non-export= alias symbol in scope, check if it refers to or can chain to the target symbol
		if symbolFromSymbolTable.Flags&ast.SymbolFlagsAlias != 0 &&
			symbolFromSymbolTable.Name != ast.InternalSymbolNameExportEquals &&
			symbolFromSymbolTable.Name != ast.InternalSymbolNameDefault &&
			!(isUMDExportSymbol(symbolFromSymbolTable) && ctx.enclosingDeclaration != nil && ast.IsExternalModule(ast.GetSourceFileOfNode(ctx.enclosingDeclaration))) &&
			// If `!useOnlyExternalAliasing`, we can use any type of alias to get the name
			(!ctx.useOnlyExternalAliasing || core.Some(symbolFromSymbolTable.Declarations, ast.IsExternalModuleImportEqualsDeclaration)) &&
			// If we're looking up a local name to reference directly, omit namespace reexports, otherwise when we're trawling through an export list to make a dotted name, we can keep it
			(isLocalNameLookup && !core.Some(symbolFromSymbolTable.Declarations, isNamespaceReexportDeclaration) || !isLocalNameLookup) &&
			// While exports are generally considered to be in scope, export-specifier declared symbols are _not_
			// See similar comment in `resolveName` for details
			(ignoreQualification || len(getDeclarationsOfKind(symbolFromSymbolTable, ast.KindExportSpecifier)) == 0) {
			resolvedImportedSymbol := c.resolveAlias(symbolFromSymbolTable)
			candidate := c.getCandidateListForSymbol(ctx, symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification)
			if len(candidate) > 0 {
				candidateChains = append(candidateChains, candidate)
			}
		}
		if symbolFromSymbolTable.Name == ctx.symbol.Name && symbolFromSymbolTable.ExportSymbol != nil {
			if c.isAccessible(ctx, c.getMergedSymbol(symbolFromSymbolTable.ExportSymbol) /*resolvedAliasSymbol*/, nil, ignoreQualification) {
				candidateChains = append(candidateChains, []*ast.Symbol{ctx.symbol})
			}
		}
	}

	if len(candidateChains) > 0 {
		// pick first, shortest
		slices.SortStableFunc(candidateChains, c.compareSymbolChains)
		return candidateChains[0]
	}

	// If there's no result and we're looking at the global symbol table, treat `globalThis` like an alias and try to lookup thru that
	if isGlobals {
		return c.getCandidateListForSymbol(ctx, c.globalThisSymbol, c.globalThisSymbol, ignoreQualification)
	}
	return nil
}

func (c *Checker) compareSymbolChainsWorker(a []*ast.Symbol, b []*ast.Symbol) int {
	chainLen := len(a) - len(b)
	if chainLen != 0 {
		return chainLen
	}

	idx := 0
	for idx < len(a) {
		comparison := c.compareSymbols(a[idx], b[idx])
		if comparison != 0 {
			return comparison
		}
		idx++
	}
	return 0
}

func isUMDExportSymbol(symbol *ast.Symbol) bool {
	return symbol != nil && len(symbol.Declarations) > 0 && symbol.Declarations[0] != nil && ast.IsNamespaceExportDeclaration(symbol.Declarations[0])
}

func isNamespaceReexportDeclaration(node *ast.Node) bool {
	return ast.IsNamespaceExport(node) && node.Parent.ModuleSpecifier() != nil
}

func (c *Checker) getCandidateListForSymbol(
	ctx accessibleSymbolChainContext,
	symbolFromSymbolTable *ast.Symbol,
	resolvedImportedSymbol *ast.Symbol,
	ignoreQualification bool,
) []*ast.Symbol {
	if c.isAccessible(ctx, symbolFromSymbolTable, resolvedImportedSymbol, ignoreQualification) {
		return []*ast.Symbol{symbolFromSymbolTable}
	}

	// Look in the exported members, if we can find accessibleSymbolChain, symbol is accessible using this chain
	// but only if the symbolFromSymbolTable can be qualified
	candidateTable := c.getExportsOfSymbol(resolvedImportedSymbol)
	if candidateTable == nil {
		return nil
	}
	candidateTableId := symbolTableIDFromExports(resolvedImportedSymbol)
	accessibleSymbolsFromExports := c.getAccessibleSymbolChainFromSymbolTable(ctx, candidateTable, candidateTableId /*ignoreQualification*/, true, false)
	if len(accessibleSymbolsFromExports) == 0 {
		return nil
	}
	if !c.canQualifySymbol(ctx, symbolFromSymbolTable, getQualifiedLeftMeaning(ctx.meaning)) {
		return nil
	}
	return append([]*ast.Symbol{symbolFromSymbolTable}, accessibleSymbolsFromExports...)
}

func (c *Checker) isAccessible(
	ctx accessibleSymbolChainContext,
	symbolFromSymbolTable *ast.Symbol,
	resolvedAliasSymbol *ast.Symbol,
	ignoreQualification bool,
) bool {
	likeSymbols := false
	if ctx.symbol == resolvedAliasSymbol {
		likeSymbols = true
	}
	if ctx.symbol == symbolFromSymbolTable {
		likeSymbols = true
	}
	symbol := c.getMergedSymbol(ctx.symbol)
	if symbol == c.getMergedSymbol(resolvedAliasSymbol) {
		likeSymbols = true
	}
	if symbol == c.getMergedSymbol(symbolFromSymbolTable) {
		likeSymbols = true
	}
	if !likeSymbols {
		return false
	}
	// if the symbolFromSymbolTable is not external module (it could be if it was determined as ambient external module and would be in globals table)
	// and if symbolFromSymbolTable or alias resolution matches the symbol,
	// check the symbol can be qualified, it is only then this symbol is accessible
	return !core.Some(symbolFromSymbolTable.Declarations, hasNonGlobalAugmentationExternalModuleSymbol) &&
		(ignoreQualification || c.canQualifySymbol(ctx, c.getMergedSymbol(symbolFromSymbolTable), ctx.meaning))
}

func (c *Checker) canQualifySymbol(
	ctx accessibleSymbolChainContext,
	symbolFromSymbolTable *ast.Symbol,
	meaning ast.SymbolFlags,
) bool {
	// If the symbol is equivalent and doesn't need further qualification, this symbol is accessible
	return !c.needsQualification(symbolFromSymbolTable, ctx.enclosingDeclaration, meaning) ||
		// If symbol needs qualification, make sure that parent is accessible, if it is then this symbol is accessible too
		len(c.getAccessibleSymbolChainEx(accessibleSymbolChainContext{symbolFromSymbolTable.Parent, ctx.enclosingDeclaration, getQualifiedLeftMeaning(meaning), ctx.useOnlyExternalAliasing, ctx.visitedSymbolTablesMap})) > 0
}

func (c *Checker) needsQualification(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags) bool {
	qualify := false
	c.someSymbolTableInScope(enclosingDeclaration, func(symbolTable ast.SymbolTable, _ symbolTableID, _ bool, _ bool, _ *ast.Node) bool {
		// If symbol of this name is not available in the symbol table we are ok
		res, ok := symbolTable[symbol.Name]
		if !ok || res == nil {
			return false
		}
		symbolFromSymbolTable := c.getMergedSymbol(res)
		if symbolFromSymbolTable == nil {
			// Continue to the next symbol table
			return false
		}
		// If the symbol with this name is present it should refer to the symbol
		if symbolFromSymbolTable == symbol {
			// No need to qualify
			return true
		}

		// Qualify if the symbol from symbol table has same meaning as expected
		shouldResolveAlias := symbolFromSymbolTable.Flags&ast.SymbolFlagsAlias != 0 && ast.GetDeclarationOfKind(symbolFromSymbolTable, ast.KindExportSpecifier) == nil
		if shouldResolveAlias {
			symbolFromSymbolTable = c.resolveAlias(symbolFromSymbolTable)
		}
		flags := symbolFromSymbolTable.Flags
		if shouldResolveAlias {
			flags = c.getSymbolFlags(symbolFromSymbolTable)
		}
		if flags&meaning != 0 {
			qualify = true
			return true
		}

		// Continue to the next symbol table
		return false
	})

	return qualify
}

func isPropertyOrMethodDeclarationSymbol(symbol *ast.Symbol) bool {
	if len(symbol.Declarations) > 0 {
		for _, declaration := range symbol.Declarations {
			switch declaration.Kind {
			case ast.KindPropertyDeclaration,
				ast.KindMethodDeclaration,
				ast.KindGetAccessor,
				ast.KindSetAccessor:
				continue
			default:
				return false
			}
		}
		return true
	}
	return false
}

func (c *Checker) someSymbolTableInScope(
	enclosingDeclaration *ast.Node,
	callback func(symbolTable ast.SymbolTable, tableId symbolTableID, ignoreQualification bool, isLocalNameLookup bool, scopeNode *ast.Node) bool,
) bool {
	for location := enclosingDeclaration; location != nil; location = location.Parent {
		// Locals of a source file are not in scope (because they get merged into the global symbol table)
		if canHaveLocals(location) && location.Locals() != nil && !ast.IsGlobalSourceFile(location) {
			if callback(location.Locals(), symbolTableIDFromLocals(location.AsNode()), false, true, location) {
				return true
			}
		}
		switch location.Kind {
		case ast.KindSourceFile, ast.KindModuleDeclaration:
			if ast.IsSourceFile(location) && !ast.IsExternalOrCommonJSModule(location.AsSourceFile()) {
				break
			}
			sym := c.getSymbolOfDeclaration(location)
			if callback(sym.Exports, symbolTableIDFromExports(sym), false, true, location) {
				return true
			}
		case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration:
			// Type parameters are bound into `members` lists so they can merge across declarations
			// This is troublesome, since in all other respects, they behave like locals :cries:
			// TODO: the below is shared with similar code in `resolveName` - in fact, rephrasing all this symbol
			// lookup logic in terms of `resolveName` would be nice
			// The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
			// These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
			// trigger resolving late-bound names, which we may already be in the process of doing while we're here!
			var table ast.SymbolTable
			sym := c.getSymbolOfDeclaration(location)
			// TODO: Should this filtered table be cached in some way?
			for key, memberSymbol := range sym.Members {
				if memberSymbol.Flags&(ast.SymbolFlagsType & ^ast.SymbolFlagsAssignment) != 0 {
					if table == nil {
						table = make(ast.SymbolTable)
					}
					table[key] = memberSymbol
				}
			}
			if table != nil && callback(table, symbolTableIDFromMembers(sym), false, false, location) {
				return true
			}
		}
	}

	return callback(c.globals, symbolTableIDFromGlobals(), false, true, nil)
}

/**
 * Check if the given symbol in given enclosing declaration is accessible and mark all associated alias to be visible if requested
 *
 * @param symbol a Symbol to check if accessible
 * @param enclosingDeclaration a Node containing reference to the symbol
 * @param meaning a SymbolFlags to check if such meaning of the symbol is accessible
 * @param shouldComputeAliasToMakeVisible a boolean value to indicate whether to return aliases to be mark visible in case the symbol is accessible
 */

func (c *Checker) IsSymbolAccessible(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, shouldComputeAliasesToMakeVisible bool) printer.SymbolAccessibilityResult {
	return c.isSymbolAccessibleWorker(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible, true /*allowModules*/)
}

func (c *Checker) isSymbolAccessibleWorker(symbol *ast.Symbol, enclosingDeclaration *ast.Node, meaning ast.SymbolFlags, shouldComputeAliasesToMakeVisible bool, allowModules bool) printer.SymbolAccessibilityResult {
	if symbol != nil && enclosingDeclaration != nil {
		result := c.IsAnySymbolAccessible([]*ast.Symbol{symbol}, enclosingDeclaration, symbol, meaning, shouldComputeAliasesToMakeVisible, allowModules)
		if result != nil {
			return *result
		}

		// This could be a symbol that is not exported in the external module
		// or it could be a symbol from different external module that is not aliased and hence cannot be named
		symbolExternalModule := core.FirstNonNil(symbol.Declarations, c.getExternalModuleContainer)
		if symbolExternalModule != nil {
			enclosingExternalModule := c.getExternalModuleContainer(enclosingDeclaration)
			if symbolExternalModule != enclosingExternalModule {
				// name from different external module that is not visible
				return printer.SymbolAccessibilityResult{
					Accessibility:   printer.SymbolAccessibilityCannotBeNamed,
					ErrorSymbolName: c.symbolToStringEx(symbol, enclosingDeclaration, meaning, SymbolFormatFlagsAllowAnyNodeKind),
					ErrorModuleName: c.symbolToString(symbolExternalModule),
					ErrorNode:       core.IfElse(ast.IsInJSFile(enclosingDeclaration), enclosingDeclaration, nil),
				}
			}
		}

		// Just a local name that is not accessible
		return printer.SymbolAccessibilityResult{
			Accessibility:   printer.SymbolAccessibilityNotAccessible,
			ErrorSymbolName: c.symbolToStringEx(symbol, enclosingDeclaration, meaning, SymbolFormatFlagsAllowAnyNodeKind),
		}
	}

	return printer.SymbolAccessibilityResult{
		Accessibility: printer.SymbolAccessibilityAccessible,
	}
}
